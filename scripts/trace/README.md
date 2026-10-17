# Trace pipeline

`make_trace.py` runs a small open instruct model over the Prompt Life hero conversation
(system prompt + two retrieved passages from Grandma's recipe card + the student's flour
question + calculator tool call + tool result + reply) in one forced-decoding forward pass. It writes the real numbers the app
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
`src/data/heroRun.ts`. The passages go in the system message after `"\n\nYour files:\n"`.

When the scenario changes, first check the model's own greedy reply after the tool result.
The `greedy reply turn` line in the console output and `notes` show it. If it is correct,
natural and short, script that reply instead, so most reply tokens are the model's top-1.
For the recipe scenario, the greedy reply was correct but 28 tokens long (over the 25-token
limit), so the shorter scripted reply was kept.

## Cost (Apple M4, 24 GB, CPU, float32)

| | Qwen2.5-0.5B-Instruct (default) | SmolLM2-360M-Instruct | Qwen2.5-1.5B-Instruct |
|---|---|---|---|
| first-run download (HF cache, `~/.cache/huggingface`) | 0.95 GB, ~1 min | 0.69 GB, ~45 s | 2.9 GB, ~3.5 min |
| model load (cached) | ~1 s | ~1 s | ~1.5 s |
| forward pass (all hidden states + attentions) | 0.3-0.9 s (~340 tokens) | 0.25 s (221 tokens) | 1.9 s (330 tokens) |
| whole script incl. greedy check (cached) | ~7 s wall | ~6 s wall | ~17 s wall |
| peak RAM (float32) | 3.3 GB | 2.5 GB | 9.6 GB |

- venv: ~500 MB on disk. Install takes ~2 min the first time and ~50 s from the pip cache.
- Output JSON: ~115-125 KB.

## Phase 1 extras: `make_phase1.py`

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_phase1.py   # -> src/data/traces/phase1.json
```

It uses the same model, scenario and token positions; it imports `build_hero` from
`make_trace.py` and checks the token ids against `hero-trace.json`. It never rewrites
`hero-trace.json`, so regenerate `hero-trace.json` first. It takes 30-50 s on CPU and writes
about 320 KB:

- **`votePositions`**: the first token of the assistant's turn, plus the 2 most undecided
  word choices in the reply (highest entropy among reply tokens that contain a letter). Each
  has a short `plain` label for students, a technical `label`, and the exact
  top-500 `{id, text, logit}` and a `tail` that bins every other real vocab row by logit
  (width 0.5, bin centers). The app's softmax at any temperature is the top-500 terms plus
  `count * exp(center / T)` per bin; at T in [0.7, 2] the error is at most 1.5e-3. Qwen's 271
  padding rows (ids >= 151665) are dropped.
- **`temperatureRuns`**: the reply turn is sampled from everything before the first reply
  token, at T = 0 (greedy, `seed: null`) and at 0.7, 1.0, 1.5 and 2.0 (3 samples each). It
  uses pure temperature (no top-k, top-p or repetition penalty), up to 40 tokens, and stops at
  `<|im_end|>` / `<|endoftext|>`. Each temperature draws from its own seeds: 100*i + k for
  the i-th temperature, so 0.7 uses 101-150, 1.0 uses 201-250, and so on. Every sample is
  checked by `screen.py`; one that hits is rejected and the next seed is drawn. The `seed` in
  each run is the seed actually used. To redo only these runs and leave every other byte of
  the file alone, run `make_phase1.py --only-temperature-runs`.
- **`freeFirstTurn`**: unforced greedy first turn (up to 260 tokens). The variant with
  " Use the calculator tool for any arithmetic." added to the system prompt is written twice:
  as top-level `freeFirstTurnNudged` (what `src/data/phase1.ts` reads) and nested as
  `freeFirstTurn.withCalculatorInstruction`.
- **`letters`**: the question re-fed as one token per character (79 instead of 20 for the
  recipe question).
- **`beat`**: `thinkLike` has 5 hero positions with their top-200 guesses. They are listed in
  `THINK_LIKE` as (source, token text, occurrence), and at least 3 come from the reply.
  `sentences` has 10 verbatim public-domain lines, scored without a chat template, top-200.
  They do not depend on the scenario.

Content screen: `screen.py` holds a blocklist of sexual, profane, slur and violent words. It
is a superset of the app's `src/lib/safeText.ts`, checks English only, and splits hits into
strong and mild. Run it on its own to scan every model-written text in both JSON files; it only
reports and never edits:

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/screen.py
```

## Phase 2 extras: `make_phase2.py`

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_phase2.py   # -> src/data/traces/phase2.json
```

Data for the P03 Embedding, P04 Attention, P05 The Stack, P07 The Loop and P08 Reply lessons.
Like phase 1, it imports `build_hero` from `make_trace.py`, checks the token ids against
`hero-trace.json`, and reads the `answer-digit` (pos 331) and `reply-word` (pos 336) positions
from its `logitLens`. It takes about 125 s on CPU (one forward pass is ~0.25 s) and writes
about 110 KB:

- **`wordMap`**: 41 recipe-themed words in 6 groups (`WORD_GROUPS`). Each must be one token with
  its leading space; a word that is not falls back to `ALTERNATES` and is named in `notes`.
  x/y use make_trace's centroid-PCA, but every pair of the 5 centroid axes is tried and the
  pair that best keeps each word's nearest neighbour in its own group on the scaled map is
  kept. Each word has its 5 nearest map words (cosine on the full 896-number rows) and a
  `strip`: base64 of the raw row as 896 int8 values scaled so max |value| = 127.
  `flourNeighbors` is the 10 nearest readable words (`^ [A-Za-z]+$`) to ` flour` in the
  whole real vocab.
- **`breaks`**: sabotage experiments. All start from hero tokens 0..326 (through the
  generation prompt of the reply turn). `text` is pure argmax (no repetition penalty, top-k
  or top-p), up to 40 tokens, stopping at `<|im_end|>` / `<|endoftext|>`. There is no KV
  cache: each step re-runs the whole sequence, so the sabotage also hits generated tokens as
  they are fed back. `rightDigit` is a teacher-forced pass over the recorded reply under the
  same sabotage: P("8") at pos 331 plus the top 3. The variants:
  - embedding: `scramble-10/50/100` (`inputs_embeds`; seeded, nested position sets; chat
    markers and added tokens are never scrambled) and `swap-flour-sugar` (adds `wordProb`
    at pos 336);
  - attention: `hide-card`, `hide-result`, `self-only` (additive 4D mask with eager
    attention; the mask includes the causal rule);
  - stack: `skip-mid`, `skip-first`, `top-half-gone`, `stop-18` (a `ModuleList` subset of
    `model.model.layers`; the final norm and output head still run);
  - context trimming (P07), the one exception to the shared context: `trim-card`,
    `trim-question`, `trim-to-result` build a shorter sequence by deleting whole tokens (no
    mask, no edits) and renumbering the rest 0..n-1, the way an app keeps the system prompt
    and drops older material. `trim-card` deletes pos 9-243 (the "Your files:" header, both
    passages and the template's `# Tools` block with the calculator's description) and keeps
    `<|im_start|>system\nYou are a helpful assistant.` and the system `<|im_end|>\n`. Pos 8 is
    the merged token `.\n\n`, so the kept system text ends in a blank line. `trim-question` also
    deletes the question message (pos 246-270); `trim-to-result` also deletes the tool-call
    message (pos 271-303), leaving the system message, the tool response (8.4375) and the
    generation prompt. Each adds `keptTokens` (92 / 67 / 34), `wordProb`, and
    `changed.positions` (the ORIGINAL hero positions deleted). `rightDigit`/`wordProb` are
    teacher-forced on the trimmed context plus the recorded reply, so their positions shift
    down by the number of tokens deleted. The script checks that each trimmed context is
    exactly what `apply_chat_template` (no `tools=`) renders for the shortened conversation, and
    prints each one decoded with its special tokens;
  - stop token (P08): `no-stop` bans both EOS ids (`<|im_end|>`, `<|endoftext|>`: -inf before
    every argmax, and before the softmax of the teacher-forced pass) and runs for 80 new
    tokens; `changed.banned` names them.
- **`stopProb`**: in the normal teacher-forced pass, P(`<|im_end|>`) at pos 344, right after the
  recorded reply's final token, plus the top 3 (0.9737, the same as `hero-trace.json`).
- **`skipEach`**: P("8") with only floor k skipped, for k = 1..24.

The script checks itself and writes the results to `notes`: feeding `inputs_embeds`, a plain
causal 4D mask and an all-floors `ModuleList` must each reproduce the normal run exactly, and
the `normal` text must equal phase 1's T=0 reply. Every greedy text, every top-3 token (including
`stopProb`'s) and every `flourNeighbors` word is checked with `screen.py`. Greedy output cannot
be redrawn, so a hit keeps its record with `"flagged": true` and is named in `notes` and on the
console.

New runs are appended after the existing records, and new top-level fields and notes are only
inserted, so a regeneration leaves every earlier byte of `phase2.json` unchanged apart from
`generatedAt` (the CPU float32 run is deterministic). Check that with a line diff against the
previous file before committing.

Pure greedy is not HF's default here. Qwen's `generation_config.json` sets
`repetition_penalty=1.1`, which `generate()` applies even with `do_sample=False`. Both scripts
now turn it off.

## Library and Workshop: `make_library.py`

```sh
~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_library.py   # -> src/data/traces/library.json
```

Data for the two side-line lessons. It needs one more model: the retriever
`sentence-transformers/all-MiniLM-L6-v2` (Apache-2.0, ~87 MB in the HF cache, downloaded on the
first run). It loads with plain `transformers` (`AutoModel` + `AutoTokenizer`, safetensors), so
no extra pip package is needed. The run takes about 65 s on CPU and writes about 27 KB.

- **`chunks`**: Grandma's recipe box, 13 chunks (`CHUNKS`): one per card front, plus the back of
  the biscuit card. The first two are byte-identical to the hero's passages (checked). Each has
  `buttermilk` (the text contains the word, case-insensitive) and `flour` (the amount before
  "flour", else null).
- **`questions`**: `lookup` ("How much flour do Grandma's biscuits need?", one card holds the
  answer) and `all-buttermilk` ("Which of Grandma's recipes use buttermilk?", the answer needs
  every card). `scores` holds the retriever's cosine for all 13 chunks, highest first: mean
  pooling over the attention mask, then L2 normalization (the model card's recipe), and cosine
  is the dot product of the unit vectors.
- **`runs`**, all on Qwen2.5-0.5B-Instruct with pure greedy decoding (argmax, KV cache, no
  repetition penalty), stopping at `<|im_end|>` / `<|endoftext|>`:
  - `lookup-k{K}` and `buttermilk-k{K}` for K = 1, 2, 3, 5, 8, 13. The top-K chunks go into
    the system message in rank order, in the hero's `"\n\nYour files:\n"` layout, with no tools.
    `lookup` adds `rightAmount`: a teacher-forced pass with the assistant prefix
    `"Grandma's biscuits need "`, P("2") and the top 3 there. `buttermilk` adds `named`,
    `correct`, `missed` and `wrong`, found by regexes on dish names (`NAME_PATTERNS`).
  - `buttermilk-tool`: no chunks; a `search_recipe_box` tool instead. The call
    `{"word": "buttermilk"}` is forced, and the tool result is the real list of matching cards
    over all 13 chunks. `toolChoice` is the model's own P(`<tool_call>`) as its first token.
  - `own-request` (Workshop): the hero conversation, but the calculator gets the model's own
    greedy request (`30 * 6`, the same as `phase1.json` `freeFirstTurn`, checked) and returns
    the exact result (180).
  - `no-calculator` (Workshop): the hero context with no tool, so the model must do the
    arithmetic itself. `finalNumber` is the last number in the text and `statedCups` is the
    last amount written before "cup(s)".

Caps are 60 new tokens for `lookup` and `own-request`, 100 for `buttermilk`, and 120 for
`no-calculator`. A run that hits its cap also gets `untilStop`: the same greedy run continued
to at most 400 tokens. It is a diagnostic. Some answers only go wrong after the cap (for
example, `lookup-k13`).
Every step's gap between the top two scores is recorded, and every near-tie (gap < 0.01) is
re-checked without the KV cache. Every text and every top-3 token is screened with
`screen.py`. A hit would set `"flagged": true`, since greedy output cannot be redrawn.

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
   so the norm is never applied twice. The four positions are `turn-start`, `tool-name`,
   `answer-digit` and `reply-word` (` flour` if present). Each entry has an `id` and a `plain`
   sentence written from the data, with no jargon.
5. `attention`: it searches all layers and heads and writes one row per id, in this order,
   using each head only once:
   - `question-to-card`: the question's ` flour` (or ` people`) attending to the same word on
     the card.
   - `induction`: the best head by the average weight on "the token after this token's
     previous occurrence", with its clearest example.
   - `previous-token`.
   - `copy`: the slot before the reply's number attending to the matching tool-result digit.

   Each row has an `id` and a `plain` sentence.
6. `embeddings`: it L2-normalizes the input-embedding rows of 40 single-token words, then
   projects them onto the PCA plane of the group centroids (see notes in the JSON for why).
