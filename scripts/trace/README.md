# Trace pipeline

`make_trace.py` runs a small open instruct model over the Prompt Life hero conversation
(system prompt + two retrieved passages + student question + calculator tool call + tool
result + reply) in one forced-decoding forward pass. It writes the real numbers the app
shows to `src/data/traces/hero-trace.json`: tokens and sources, top-10 next-token candidates
at every assistant-generated token, logit-lens guesses per layer, selected attention rows,
and a 2-D embedding map. Spike write-up: `docs/rebuild/TRACE_SPIKE.md`.

## One-time setup

The venv lives outside the repo so Vite and git never see it.

```sh
python3 -m venv ~/.cache/promptlife/trace-venv
~/.cache/promptlife/trace-venv/bin/pip install --upgrade pip
~/.cache/promptlife/trace-venv/bin/pip install -r scripts/trace/requirements.txt
```

The pins work on the macOS system Python 3.9.6. torch 2.8 and transformers 4.57 are the
last releases that support 3.9. If you have Python 3.10 or newer, newer versions should
work too, but they are untested. On macOS you will see a harmless urllib3 `NotOpenSSLWarning`
because the system Python is built against LibreSSL.

## Run

From the repo root:

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_trace.py
```

Flags:

| flag | default | meaning |
|---|---|---|
| `--model` | `Qwen/Qwen2.5-0.5B-Instruct` | any HF causal LM with a chat template and a fast tokenizer |
| `--out` | `src/data/traces/hero-trace.json` | output path |
| `--device` | `cpu` | `mps` also works; CPU in float32 is the reference |
| `--top-k` | `10` | candidates per step |
| `--license` | read from the Hub | override the license string |
| `--no-greedy-check` | off | skip the free greedy generation that is quoted in `notes` |

Try the fallback model: `--model HuggingFaceTB/SmolLM2-360M-Instruct --out /tmp/smol.json`.
Its chat template has no tool support, so the script describes the calculator itself and
writes the call as `<tool_call>{json}</tool_call>` text. `notes` says when this fallback is used.

The scenario text lives in `SCENARIO` at the top of `make_trace.py` and must match
`src/data/heroRun.ts`.

## Cost (Apple M4, 24 GB, CPU, float32)

| | Qwen2.5-0.5B-Instruct (default) | SmolLM2-360M-Instruct | Qwen2.5-1.5B-Instruct |
|---|---|---|---|
| first-run download (HF cache, `~/.cache/huggingface`) | 0.95 GB, ~1 min | 0.69 GB, ~45 s | 2.9 GB, ~3.5 min |
| model load (cached) | ~1 s | ~1 s | ~1.5 s |
| forward pass (all hidden states + attentions) | 0.3-0.9 s (330 tokens) | 0.25 s (221 tokens) | 1.9 s (330 tokens) |
| whole script incl. greedy check (cached) | ~7 s wall | ~6 s wall | ~17 s wall |
| peak RAM (float32) | 3.3 GB | 2.5 GB | 9.6 GB |

- venv: ~500 MB on disk. Install takes ~2 min the first time and ~50 s from the pip cache.
- Output JSON: ~125 KB.

## Phase 1 extras: `make_phase1.py`

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_phase1.py   # -> src/data/traces/phase1.json
```

It uses the same model, scenario and token positions; it imports `build_hero` from
`make_trace.py` and checks the token ids against `hero-trace.json`. It never rewrites
`hero-trace.json`. It takes about 50 s on CPU (about 24 s of that is sampling) and writes about
320 KB:

- **`votePositions`**: pos 249 (tool-call start), pos 313 (`' a'` / `' '` / `' an'`), and the
  highest-entropy word in the reply (pos 324, `' achieve'` vs `' get'`). Each has the exact
  top-500 `{id, text, logit}` and a `tail` that bins every other real vocab row by logit
  (width 0.5, bin centers). The app's softmax at any temperature is the top-500 terms plus
  `count * exp(center / T)` per bin; at T in [0.7, 2] the error is at most 1.5e-3. Qwen's 271
  padding rows (ids >= 151665) are dropped.
- **`temperatureRuns`**: the reply turn is sampled from tokens 0..308 at T = 0 (greedy, `seed:
  null`), 0.7, 1.0, 1.5 and 2.0 (seeds 1-3). It uses pure temperature (no top-k, top-p or
  repetition penalty), up to 40 tokens, and stops at `<|im_end|>` / `<|endoftext|>`.
- **`freeFirstTurn`**: unforced greedy first turn (up to 260 tokens), plus a variant with
  " Use the calculator tool for any arithmetic." added to the system prompt.
- **`letters`**: the question re-fed as 60 single-character tokens instead of 18 normal ones.
- **`beat`**: `thinkLike` (5 hero positions, top-200) and `sentences` (10 verbatim
  public-domain lines, scored without a chat template, top-200).

Pure greedy is not HF's default here. Qwen's `generation_config.json` sets
`repetition_penalty=1.1`, which `generate()` applies even with `do_sample=False`. Both scripts
now turn it off. The two "Unforced greedy" notes in the current `hero-trace.json` predate that
fix.

## What the script does

1. Renders the conversation with `tokenizer.apply_chat_template(..., tools=[calculator])`.
   It renders incrementally so each character can be tied to a turn, and it labels every
   character as `special / sys / rag / user / tool / res / rep`. Each token takes the
   majority label of its non-whitespace characters, using fast-tokenizer `offset_mapping`.
2. Runs one forward pass with `attn_implementation="eager"`, `output_hidden_states=True`
   and `output_attentions=True`.
3. `steps`: for each assistant-generated token at `pos`, it records the top-10 of the logits
   at `pos-1`, softmaxed over the full vocabulary, plus the scripted token's rank.
4. `logitLens`: at four positions it applies the final RMSNorm and the unembedding to
   `hidden_states[0..L]`. HF's last hidden state is already normed; the script detects that,
   so the norm is never applied twice.
5. `attention`: it searches all layers and heads for (a) the question's ` final` attending
   to ` syllabus`, and to ` exam` in the passage, (b) the best previous-token head, and
   (c) a copy head from reply digits to tool-result digits.
6. `embeddings`: it L2-normalizes the input-embedding rows of 40 single-token words, then
   projects them onto the PCA plane of the group centroids (see notes in the JSON for why).
