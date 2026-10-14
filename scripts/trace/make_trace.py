#!/usr/bin/env python3
"""
Prompt Life trace pipeline (spike).

Runs a small open instruct model over ONE scripted conversation with forced decoding
(teacher forcing): the whole conversation -- system prompt, retrieved passages, user
question, the assistant's tool call, the tool result and the assistant's reply -- is
rendered with the model's own chat template and pushed through the model in a single
forward pass. Because a causal LM predicts every next token in parallel, that one pass
gives us, for every assistant-generated token, what the model *would* have predicted at
that point if it had been generating the conversation itself.

From that pass we export the real numbers the app displays (see the Trace type in
docs/rebuild/TRACE_SPIKE.md / the task spec):

  tokens      every token, its id, decoded text and source label (special/sys/rag/...)
  steps       for each assistant-generated token: top-10 next-token candidates and the
              rank/probability of the scripted token
  logitLens   per-layer guesses (final norm + unembedding applied to each layer's
              residual stream) at a few interesting positions
  attention   a few hand-picked attention rows, found by searching every layer/head
  embeddings  a 2-D PCA map of input-embedding rows for ~40 curated words

Usage (see scripts/trace/README.md for venv setup):

  python scripts/trace/make_trace.py                       # Qwen2.5-0.5B-Instruct -> src/data/traces/hero-trace.json
  python scripts/trace/make_trace.py --model HuggingFaceTB/SmolLM2-360M-Instruct --out /tmp/smol.json
"""

import argparse
import datetime as _dt
import json
import os
import sys
import time
import warnings

warnings.filterwarnings("ignore")  # urllib3/LibreSSL noise on macOS system Python

import numpy as np  # noqa: E402
import torch  # noqa: E402
from transformers import AutoModelForCausalLM, AutoTokenizer  # noqa: E402
from transformers.utils import logging as hf_logging  # noqa: E402

hf_logging.set_verbosity_error()

# --------------------------------------------------------------------------------------
# Scenario (must match src/data/heroRun.ts SCENARIO exactly)
# --------------------------------------------------------------------------------------
SCENARIO = {
    "system": "You are a helpful study assistant.",
    "passages": [
        "Syllabus: The final exam is 40% of your course grade. An A- starts at 90%.",
        "Gradebook: Your coursework average is 87.5% (60% of the grade).",
    ],
    "user": "Using my syllabus, what do I need on the final to get an A-?",
    "toolExpression": "(90 - 0.6 * 87.5) / 0.4",
    "toolResult": "93.75",
    "reply": "You need at least 93.75% on the final to get an A-.",
}

# How the app frames the retrieved passages inside the system message.
RAG_HEADER = "\n\nCourse files:\n"

# The calculator tool, as an OpenAI-style JSON schema (what HF chat templates expect).
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "calculator",
            "description": "Evaluate an arithmetic expression and return the numeric result.",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "Arithmetic expression to evaluate, e.g. \"2 * (3 + 4)\"",
                    }
                },
                "required": ["expression"],
            },
        },
    }
]

# Curated words for the embedding map. All are tried WITH a leading space; words that
# are not a single token for the chosen tokenizer are skipped and reported in notes.
# Qwen splits every digit into its own token, so " 40" / " 90" can never be single
# tokens; number WORDS stand in for the numbers group.
EMBED_WORDS = {
    "school": ["exam", "final", "grade", "course", "quiz", "professor", "homework",
               "semester", "lecture"],
    "numbers": ["one", "two", "three", "ten", "forty", "ninety", "hundred"],
    "animals": ["dog", "cat", "horse", "bird", "fish", "cow"],
    "food": ["pizza", "apple", "bread", "rice", "cheese", "soup"],
    "places": ["Paris", "Tokyo", "London", "library", "station", "city"],
    "verbs": ["run", "need", "get", "study", "walk", "eat"],
}

SRC_PRIORITY = ["special", "sys", "rag", "user", "tool", "res", "rep"]


def r4(x):
    """Round to 4 significant digits (keeps the JSON small)."""
    x = float(x)
    if not np.isfinite(x):
        return 0.0
    return float(f"{x:.4g}")


# --------------------------------------------------------------------------------------
# 1. Render the conversation and label every character with its source
# --------------------------------------------------------------------------------------
# Fallback for templates WITHOUT native tool calling (e.g. SmolLM2-360M): describe the tool
# in the system message ourselves and write the call as Hermes/Qwen-style text.
FALLBACK_TOOL_PROMPT = (
    "\n\nYou can use a calculator. To call it, reply with exactly:\n"
    "<tool_call>\n{\"name\": \"calculator\", \"arguments\": {\"expression\": \"...\"}}\n</tool_call>")


def build_messages(sc, native_tools=True):
    system_content = sc["system"] + RAG_HEADER + "\n".join(sc["passages"])
    call_args = {"expression": sc["toolExpression"]}
    if native_tools:
        call_msg = {"role": "assistant", "content": "",
                    "tool_calls": [{"type": "function",
                                    "function": {"name": "calculator", "arguments": call_args}}]}
    else:
        system_content += FALLBACK_TOOL_PROMPT
        call_msg = {"role": "assistant", "_tool_call": True,
                    "content": "<tool_call>\n" + json.dumps(
                        {"name": "calculator", "arguments": call_args}) + "\n</tool_call>"}
    return [
        {"role": "system", "content": system_content},
        {"role": "user", "content": sc["user"]},
        call_msg,
        {"role": "tool", "name": "calculator", "content": sc["toolResult"]},
        {"role": "assistant", "content": sc["reply"]},
    ]


def render(tok, msgs, add_generation_prompt=False):
    return tok.apply_chat_template(msgs, tools=TOOLS, tokenize=False,
                                   add_generation_prompt=add_generation_prompt)


def label_characters(tok, sc, msgs):
    """
    Returns (text, char_labels, generated_char_ranges, template_note_bits).

    We render the conversation incrementally (messages[:1], [:2], ...) so we know which
    character range each turn occupies, then label characters inside each turn:
      - role headers, end-of-turn markers, <tool_response> wrappers ... -> 'special'
      - system prompt -> 'sys'; tool-definition block the template appends -> 'sys'
      - "Course files:" header + passages -> 'rag'
      - user question -> 'user'
      - assistant tool-call text -> 'tool'; tool result -> 'res'; reply -> 'rep'
    Assistant-generated ranges start right after the generation prompt
    ("<|im_start|>assistant\\n" for Qwen) and end after the EOS token (<|im_end|>).
    """
    full = render(tok, msgs)
    bounds = [0]
    for k in range(1, len(msgs) + 1):
        part = render(tok, msgs[:k])
        if not full.startswith(part):
            raise RuntimeError(
                "Chat template is not prefix-consistent at message %d; labeling needs a "
                "per-template special case." % k)
        bounds.append(len(part))

    labels = ["special"] * len(full)
    special_strings = sorted(set(tok.all_special_tokens), key=len, reverse=True)

    def set_range(a, b, lab):
        for c in range(a, b):
            labels[c] = lab

    def mask_specials(a, b):
        # Inside a labeled range, any registered special token text stays 'special'.
        seg = full[a:b]
        for s in special_strings:
            start = 0
            while True:
                j = seg.find(s, start)
                if j < 0:
                    break
                set_range(a + j, a + j + len(s), "special")
                start = j + len(s)

    eos = tok.eos_token
    generated = []
    note_bits = []

    for k, m in enumerate(msgs):
        a, b = bounds[k], bounds[k + 1]
        turn = full[a:b]
        if m["role"] == "system":
            c0 = full.find(m["content"], a, b)
            if c0 < 0:
                raise RuntimeError("system content not found in rendered text")
            c1 = c0 + len(m["content"])
            # Everything the template adds to the system turn after our content (Qwen:
            # the "# Tools" block with the calculator JSON schema) up to end-of-turn.
            e = full.find(eos, c1, b)
            tail_end = e if e >= 0 else b
            set_range(c0, tail_end, "sys")
            r0 = c0 + len(sc["system"])
            r1 = r0 + len(RAG_HEADER + "\n".join(sc["passages"]))
            set_range(r0, r1, "rag")
            mask_specials(c0, tail_end)
            if tail_end > r1:
                note_bits.append("tool definitions after the passages (labeled 'sys')")
        elif m["role"] == "user":
            c0 = full.find(m["content"], a, b)
            set_range(c0, c0 + len(m["content"]), "user")
        elif m["role"] == "tool":
            c0 = full.find(m["content"], a, b)
            set_range(c0, c0 + len(m["content"]), "res")
        elif m["role"] == "assistant":
            gen_prompt = render(tok, msgs[:k], add_generation_prompt=True)[bounds[k]:]
            if not turn.startswith(gen_prompt):
                raise RuntimeError("assistant turn does not start with the generation prompt")
            g0 = a + len(gen_prompt)
            e = full.find(eos, g0, b)
            if e < 0:
                raise RuntimeError("no EOS token found in assistant turn")
            lab = "tool" if (m.get("tool_calls") or m.get("_tool_call")) else "rep"
            set_range(g0, e, lab)
            mask_specials(g0, e)
            generated.append((g0, e + len(eos), lab))
    return full, labels, generated, note_bits


def token_src(labels, text, s, e):
    """Majority label over the token's non-whitespace characters (else first char)."""
    if e <= s:
        return "special"
    chars = [(labels[c], text[c]) for c in range(s, e)]
    nonws = [lab for lab, ch in chars if not ch.isspace()]
    if not nonws:
        return chars[0][0]
    counts = {}
    for lab in nonws:
        counts[lab] = counts.get(lab, 0) + 1
    return max(counts, key=lambda lab: (counts[lab], -SRC_PRIORITY.index(lab)))


def build_hero(tok, sc=SCENARIO):
    """
    Render the hero conversation with the model's chat template, tokenize it, and label
    every token's source. Shared by make_trace.py and make_phase1.py so token positions
    are identical in both outputs.
    """
    notes = []
    # Prefer the template's native tool calling; if the template silently drops the tool
    # call (no tool support), fall back to describing the tool ourselves.
    native_tools = True
    msgs = build_messages(sc, native_tools=True)
    if sc["toolExpression"] not in render(tok, msgs):
        native_tools = False
        msgs = build_messages(sc, native_tools=False)
        notes.append("This chat template has no native tool calling: the calculator is "
                     "described in the system message by the script and the call is written as "
                     "'<tool_call>{json}</tool_call>' text in the assistant turn (fallback mode).")
    text, char_labels, gen_ranges, note_bits = label_characters(tok, sc, msgs)
    gen_prompt_str = render(tok, msgs[:2], add_generation_prompt=True)[len(render(tok, msgs[:2])):]
    if sc["toolExpression"] not in text or sc["toolResult"] not in text:
        sys.exit("The rendered conversation is missing the tool call or tool result.")
    enc = tok(text, add_special_tokens=False, return_offsets_mapping=True)
    ids = enc["input_ids"]
    offsets = enc["offset_mapping"]
    templ_ids = tok.apply_chat_template(msgs, tools=TOOLS, tokenize=True)
    if list(templ_ids) != list(ids):
        notes.append("WARNING: re-tokenizing the rendered text differs from "
                     "apply_chat_template(tokenize=True); using the re-tokenized ids.")
    tokens = []
    gen_positions = []
    for i, (tid, (s, e)) in enumerate(zip(ids, offsets)):
        src = token_src(char_labels, text, s, e)
        tokens.append({"i": i, "id": int(tid), "text": dec(tok, tid), "src": src})
        if any(g0 <= s < g1 for g0, g1, _ in gen_ranges):
            gen_positions.append(i)
    return {"msgs": msgs, "text": text, "ids": list(ids), "tokens": tokens,
            "gen_positions": gen_positions, "note_bits": note_bits, "notes": notes,
            "native_tools": native_tools, "gen_prompt_str": gen_prompt_str}


# --------------------------------------------------------------------------------------
# 2. Analysis helpers
# --------------------------------------------------------------------------------------
def dec(tok, i):
    # Decode a single id to its real text (byte-level 'Ġ' -> ' ', 'Ċ' -> '\n').
    return tok.decode([int(i)], clean_up_tokenization_spaces=False)


def candidates(tok, logits_row, k):
    """Top-k candidates by logit, with probability = softmax over the FULL vocab."""
    logp = torch.log_softmax(logits_row.double(), dim=-1)
    vals, idx = torch.topk(logits_row, k)
    out = []
    for v, i in zip(vals.tolist(), idx.tolist()):
        out.append({"id": int(i), "text": dec(tok, i), "logit": r4(v),
                    "prob": r4(float(torch.exp(logp[i])))})
    return out


def find_token(tokens, text, src=None, start=0, nth=0):
    """Index of the nth token with exactly this decoded text (and optional src)."""
    hits = [t["i"] for t in tokens[start:]
            if t["text"] == text and (src is None or t["src"] == src)]
    return hits[nth] if len(hits) > nth else None


def find_token_seq(tokens, texts, src=None):
    """Indices of the first run of consecutive tokens whose texts equal `texts`."""
    n = len(texts)
    for i in range(len(tokens) - n + 1):
        if all(tokens[i + j]["text"] == texts[j] and
               (src is None or tokens[i + j]["src"] == src) for j in range(n)):
            return list(range(i, i + n))
    return None


def attn_row(A, layer, head, q, extra_positions, top_n=12):
    row = A[layer][head, q, : q + 1]
    order = np.argsort(-row)[:top_n].tolist()
    for p in extra_positions:
        if p is not None and p <= q and p not in order:
            order.append(int(p))
    return [{"pos": int(p), "w": r4(row[p])} for p in order]


# --------------------------------------------------------------------------------------
# 3. Main
# --------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--model", default="Qwen/Qwen2.5-0.5B-Instruct")
    ap.add_argument("--out", default=None,
                    help="output JSON path (default: <repo>/src/data/traces/hero-trace.json)")
    ap.add_argument("--device", default="cpu", choices=["cpu", "mps"])
    ap.add_argument("--license", default=None,
                    help="license string; default: read from the Hub model card")
    ap.add_argument("--top-k", type=int, default=10)
    ap.add_argument("--no-greedy-check", action="store_true",
                    help="skip the free (unforced) greedy generation used for notes")
    args = ap.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "hero-trace.json")
    sc = SCENARIO
    timings = {}
    notes = []

    # ---- load -------------------------------------------------------------------------
    t0 = time.time()
    tok = AutoTokenizer.from_pretrained(args.model)
    if not tok.is_fast:
        sys.exit("A fast tokenizer is required (offset_mapping).")
    model = AutoModelForCausalLM.from_pretrained(
        args.model, torch_dtype=torch.float32, attn_implementation="eager")
    model.to(args.device).eval()
    timings["load_s"] = time.time() - t0
    cfg = model.config
    L, H = cfg.num_hidden_layers, cfg.num_attention_heads
    n_kv = getattr(cfg, "num_key_value_heads", H)

    license_str = args.license
    if license_str is None:
        try:
            from huggingface_hub import model_info
            license_str = (model_info(args.model).card_data or {}).get("license") or "unknown"
        except Exception:
            license_str = "unknown (check the model card)"

    # ---- render + label ----------------------------------------------------------------
    hero = build_hero(tok, sc)
    notes += hero["notes"]
    msgs, ids, tokens = hero["msgs"], hero["ids"], hero["tokens"]
    gen_positions, note_bits = hero["gen_positions"], hero["note_bits"]
    native_tools, gen_prompt_str = hero["native_tools"], hero["gen_prompt_str"]
    T = len(ids)

    # ---- one forward pass --------------------------------------------------------------
    input_ids = torch.tensor([ids], device=args.device)
    t0 = time.time()
    with torch.no_grad():
        out = model(input_ids, output_hidden_states=True, output_attentions=True)
    timings["forward_s"] = time.time() - t0
    logits = out.logits[0].float().cpu()                       # [T, V]
    hs = [h[0].float() for h in out.hidden_states]             # L+1 x [T, d]
    A = [a[0].float().cpu().numpy() for a in out.attentions]   # L x [H, T, T]
    assert len(hs) == L + 1 and len(A) == L

    # ---- steps: forced-decoding predictions at assistant-generated positions ----------
    steps = []
    for p in gen_positions:
        row = logits[p - 1]
        logp = torch.log_softmax(row.double(), dim=-1)
        chosen_id = ids[p]
        rank = int((row > row[chosen_id]).sum().item()) + 1
        steps.append({
            "pos": p,
            "chosen": {"id": int(chosen_id), "text": dec(tok, chosen_id),
                       "logit": r4(row[chosen_id]), "prob": r4(float(torch.exp(logp[chosen_id]))),
                       "rank": rank},
            "top": candidates(tok, row, args.top_k),
        })

    # ---- logit lens --------------------------------------------------------------------
    # hidden_states[0] = token embeddings, hidden_states[k] = residual stream after block k.
    # In HF the LAST entry already has the final RMSNorm applied; detect that numerically
    # so we never normalize twice.
    norm = model.model.norm
    lm_head = model.get_output_embeddings()
    with torch.no_grad():
        last_already_normed = torch.allclose(
            lm_head(hs[L][-1:]).float().cpu(), logits[-1:], atol=1e-3, rtol=1e-3)

    def lens_at(pred_pos, label):
        q = pred_pos - 1
        layers = []
        with torch.no_grad():
            for k in range(L + 1):
                h = hs[k][q:q + 1]
                if not (k == L and last_already_normed):
                    h = norm(h)
                probs = torch.softmax(lm_head(h).double()[0], dim=-1)
                v, ix = torch.topk(probs, 3)
                layers.append({"layer": k, "top": [{"text": dec(tok, j), "prob": r4(pv)}
                                                   for pv, j in zip(v.tolist(), ix.tolist())]})
        return {"pos": pred_pos, "label": label, "layers": layers}

    gen_tool = [p for p in gen_positions if tokens[p]["src"] == "tool"]
    gen_rep = [p for p in gen_positions if tokens[p]["src"] == "rep"]
    rep_digits = [p for p in gen_rep if tokens[p]["text"].strip().isdigit()]
    rep_final = next((p for p in gen_rep if tokens[p]["text"] == " final"), None)
    tool_name = next((p for p in gen_tool if "calc" in tokens[p]["text"]), None)

    lens_targets = []
    if gen_tool:
        lens_targets.append((gen_tool[0], "Start of the tool call: predicting %r right after "
                             "'assistant'" % tokens[gen_tool[0]]["text"]))
    if tool_name is not None:
        lens_targets.append((tool_name, "Choosing which tool: predicting %r inside the tool "
                             "call" % tokens[tool_name]["text"]))
    if rep_digits:
        lens_targets.append((rep_digits[0], "First digit of the answer: predicting %r of "
                             "93.75 in the reply" % tokens[rep_digits[0]]["text"]))
    if rep_final is not None:
        lens_targets.append((rep_final, "Predicting ' final' in 'on the final' in the reply"))
    t0 = time.time()
    logit_lens = [lens_at(p, lab) for p, lab in lens_targets]
    timings["lens_s"] = time.time() - t0

    # ---- attention search ---------------------------------------------------------------
    attention = []
    user_final = find_token(tokens, " final", src="user")
    syll_user = [t["i"] for t in tokens if t["src"] == "user" and
                 t["text"].strip().lower() in ("syll", "abus", "syllabus")]
    rag_syll = find_token_seq(tokens, ["S", "yll", "abus"], src="rag") or \
        [t["i"] for t in tokens if t["src"] == "rag" and "yll" in t["text"]]
    rag_exam = find_token(tokens, " exam", src="rag")
    rag_final = find_token(tokens, " final", src="rag")

    def best_head(q, targets, exclude_sink=False):
        best = None
        for l in range(L):
            for h in range(H):
                s = float(A[l][h, q, targets].sum())
                if best is None or s > best[0]:
                    best = (s, l, h)
        return best

    attn_notes = []
    if user_final is not None:
        # (a1) user ' final' -> user ' syllabus' (2 tokens: ' syll' + 'abus').
        if syll_user:
            s, l, h = best_head(user_final, syll_user)
            attention.append({"layer": l, "head": h, "queryPos": user_final,
                              "label": "' final' in the question looks back at ' syllabus' "
                                       "(%.0f%% on ' syll'+'abus')" % (100 * s),
                              "weights": attn_row(A, l, h, user_final, syll_user)})
        # (a2) user ' final' -> passage ' exam'. The winner is typically an INDUCTION head:
        # it finds the earlier ' final' (in "The final exam") and attends to the token
        # that followed it, ' exam'.
        if rag_exam is not None:
            s, l, h = best_head(user_final, [rag_exam])
            ind = rag_final is not None and rag_exam == rag_final + 1
            # Inserted FIRST: it is the clearest row, and the app shows the first
            # ' final' row (src/data/trace.ts attentionFromTrace).
            attention.insert(0, {"layer": l, "head": h, "queryPos": user_final,
                              "label": ("Induction head: ' final' in the question finds ' final' "
                                        "in the syllabus and attends to the word after it, ' exam' "
                                        "(%.0f%%)" if ind else
                                        "' final' in the question looks at ' exam' in the "
                                        "syllabus (%.0f%%)") % (100 * s),
                              "weights": attn_row(A, l, h, user_final, [rag_exam, rag_final])})
            # Only the syllabus-passage token for "Syllabus" is split into 'S'+'yll'+'abus'.
            if rag_syll:
                s3, l3, h3 = best_head(user_final, rag_syll)
                attn_notes.append("Best head for question ' final' -> passage 'Syllabus' tokens "
                                  "is only L%dH%d at %.1f%% (not exported)." % (l3, h3, 100 * s3))

    # (b) Previous-token head: highest mean weight on position i-1 over all positions.
    idx = np.arange(1, T)
    prev_scores = np.array([[A[l][h, idx, idx - 1].mean() for h in range(H)] for l in range(L)])
    pl, ph = (int(v) for v in np.unravel_index(int(prev_scores.argmax()), prev_scores.shape))
    # Example query: the reply token whose i-1 weight is closest to the head's median
    # (a representative row, not a cherry-picked one).
    med = float(np.median(A[pl][ph, idx, idx - 1]))
    q_prev = min(gen_rep or [T - 2], key=lambda i: abs(A[pl][ph, i, i - 1] - med))
    attention.append({"layer": pl, "head": ph, "queryPos": q_prev,
                      "label": "Previous-token head: each token looks mostly at the one just "
                               "before it (mean %.2f across all %d tokens)" % (prev_scores[pl, ph], T),
                      "weights": attn_row(A, pl, ph, q_prev, [q_prev - 1])})

    # (c) Copy head: reply digits <- tool-result digits. For every reply slot that has to
    # produce a digit of 93.75 (the slot BEFORE the digit), score each head by the weight
    # it puts on the matching token of the tool result; average over the digits.
    res_pos = [t["i"] for t in tokens if t["src"] == "res"]
    if res_pos and rep_digits:
        first = rep_digits[0]
        n = len(res_pos)
        q_slots = list(range(first - 1, first - 1 + n))      # ' ', '9', '3', '.', '7'
        if all(tokens[q + 1]["id"] == tokens[r]["id"] for q, r in zip(q_slots, res_pos)):
            copy = np.zeros((L, H))
            for q, r in zip(q_slots, res_pos):
                copy += np.stack([A[l][:, q, r] for l in range(L)])
            copy /= n
            cl, ch = (int(v) for v in np.unravel_index(int(copy.argmax()), copy.shape))
            per = ", ".join("%r->%.2f" % (tokens[r]["text"], A[cl][ch, q, r])
                            for q, r in zip(q_slots, res_pos))
            attn_notes.append("Copy head L%dH%d: weight on the matching result digit when "
                              "producing each reply digit: %s (mean %.2f)." % (cl, ch, per, copy[cl, ch]))
            for q, r in zip(q_slots[:2], res_pos[:2]):
                attention.append({"layer": cl, "head": ch, "queryPos": q,
                                  "label": "Copy head: %s, about to write %r, looks at the "
                                           "%r in the tool result (%.0f%%)"
                                           % ("the space before the answer"
                                              if not tokens[q]["text"].strip() else
                                              "reply %r" % tokens[q]["text"],
                                              tokens[q + 1]["text"],
                                              tokens[r]["text"], 100 * A[cl][ch, q, r]),
                                  "weights": attn_row(A, cl, ch, q, res_pos)})
        else:
            attn_notes.append("Reply digits do not match the tool-result tokens 1:1; copy-head "
                              "search skipped.")

    # ---- embeddings map ----------------------------------------------------------------
    emb = model.get_input_embeddings().weight.detach().float().cpu().numpy()
    pts_meta, skipped = [], []
    for group, words in EMBED_WORDS.items():
        for w in words:
            wid = tok.encode(" " + w, add_special_tokens=False)
            if len(wid) == 1:
                pts_meta.append((" " + w, wid[0], group))
            else:
                skipped.append(" " + w)
    X = emb[[m[1] for m in pts_meta]]
    groups = np.array([m[2] for m in pts_meta])
    # Cosine geometry: L2-normalize rows so token frequency (row norm) doesn't matter.
    X = X / np.linalg.norm(X, axis=1, keepdims=True)
    X = X - X.mean(axis=0, keepdims=True)

    def nn_agreement(Y):
        # fraction of words whose nearest neighbour (in Y) is from the same group
        D = ((Y[:, None, :] - Y[None, :, :]) ** 2).sum(-1)
        np.fill_diagonal(D, np.inf)
        return float((groups[D.argmin(1)] == groups).mean())

    # Plain PCA of 40 words is dominated by "number word vs. everything else" and piles
    # the other groups on top of each other. Instead we run PCA on the GROUP CENTROIDS
    # (each group weighted equally) and project every word onto two of those principal
    # axes -- still a linear projection of the real vectors, but onto the plane where the
    # groups differ most. Among the top-3 centroid axes we keep the pair that best
    # preserves nearest-neighbour groups. Both scores are reported in notes.
    C = np.stack([X[groups == g].mean(0) for g in EMBED_WORDS if (groups == g).any()])
    _, _, Vc = np.linalg.svd(C - C.mean(0), full_matrices=False)
    pairs = [(0, 1), (0, 2), (1, 2)]
    pair = max(pairs, key=lambda ij: nn_agreement(X @ Vc[list(ij)].T))
    P = X @ Vc[list(pair)].T
    _, _, Vt = np.linalg.svd(X, full_matrices=False)
    emb_scores = {"fullD": nn_agreement(X), "plainPca": nn_agreement(X @ Vt[:2].T),
                  "centroidPca": nn_agreement(P), "pair": pair}
    P = 2 * (P - P.min(axis=0)) / (P.max(axis=0) - P.min(axis=0)) - 1
    points = [{"text": m[0], "x": r4(P[k, 0]), "y": r4(P[k, 1]), "group": m[2]}
              for k, m in enumerate(pts_meta)]

    # ---- free greedy generation (diagnostic only) --------------------------------------
    greedy = {}
    if not args.no_greedy_check:
        t0 = time.time()
        for name, upto in (("tool-call turn", 2), ("reply turn", 4)):
            prompt_ids = tok.apply_chat_template(msgs[:upto], tools=TOOLS, tokenize=True,
                                                 add_generation_prompt=True)
            pid = torch.tensor([prompt_ids], device=args.device)
            with torch.no_grad():
                # Pure greedy: override Qwen's generation_config.json, which sets
                # repetition_penalty=1.1 and would otherwise apply even with do_sample=False.
                g = model.generate(pid, attention_mask=torch.ones_like(pid),
                                   max_new_tokens=60, do_sample=False, repetition_penalty=1.0,
                                   temperature=None, top_p=None, top_k=None)
            greedy[name] = tok.decode(g[0][len(prompt_ids):], skip_special_tokens=False)
        timings["greedy_s"] = time.time() - t0

    # ---- notes -------------------------------------------------------------------------
    rep_steps = [s for s in steps if tokens[s["pos"]]["src"] == "rep"]
    tool_steps = [s for s in steps if tokens[s["pos"]]["src"] == "tool"]

    def summarize(ss):
        if not ss:
            return "n/a"
        top1 = sum(1 for s in ss if s["chosen"]["rank"] == 1)
        mean_p = sum(s["chosen"]["prob"] for s in ss) / len(ss)
        worst = max(ss, key=lambda s: s["chosen"]["rank"])
        return ("%d/%d scripted tokens were the model's top-1; mean p(scripted)=%.2f; worst "
                "rank %d at %r" % (top1, len(ss), mean_p, worst["chosen"]["rank"],
                                   worst["chosen"]["text"]))

    sys_idx = [t["i"] for t in tokens if t["src"] == "sys"]
    notes += [
        "Forced decoding (teacher forcing): one forward pass over %d tokens; steps[k] reads "
        "the logits at pos-1, i.e. what the model predicted for token pos having seen "
        "everything before it." % T,
        "Probabilities are softmax at temperature 1 over the full %d-row unembedding "
        "(includes Qwen's unused padding rows, which carry ~0 mass)." % logits.shape[-1],
        "Token text is the decoded string with real spaces/newlines (no 'Ġ'/'Ċ'). Qwen "
        "splits every digit into its own token, so ' 93.75' is ' ', '9', '3', '.', '7', '5'.",
        "Tool-call turn: " + summarize(tool_steps) + ".",
        "Reply turn: " + summarize(rep_steps) + ".",
        "Source labels come from character offsets; a token spanning two sources takes the "
        "majority label of its non-whitespace characters. '<tool_call>'/'</tool_call>' are "
        "not registered special tokens (in Qwen they are added-but-not-special), so they are "
        "labeled 'tool' when the assistant emits them. <|im_end|> after each assistant turn is labeled 'special' but has a step.",
    ]
    rag_idx = [t["i"] for t in tokens if t["src"] == "rag"]
    if sys_idx and rag_idx and note_bits:
        pre = [i for i in sys_idx if i < rag_idx[0]]
        post = [i for i in sys_idx if i > rag_idx[-1]]
        notes.append("The system message also carries the tool definitions (%s). Those tokens "
                     "are labeled 'sys' too: the system prompt itself is tokens %d-%d, the tool "
                     "block is tokens %d-%d (after the passages)."
                     % ("the template's '# Tools' block with the calculator JSON schema"
                        if native_tools else "written by this script, fallback mode",
                        pre[0], pre[-1], post[0], post[-1]))
    # Forced tokenization can merge characters the model would have emitted as two tokens
    # (e.g. ' "(' vs ' "' then '('), which makes the scripted token look unlikely.
    for s in steps:
        c, top1 = s["chosen"], s["top"][0]
        if c["rank"] > 1 and len(top1["text"]) < len(c["text"]) and \
                c["text"].startswith(top1["text"]):
            notes.append("Tokenization artifact at pos %d: scripted token %r is rank %d "
                         "(p=%.2g) because the model prefers to write it in pieces; its top-1 "
                         "is the prefix %r (p=%.2g). Re-tokenizing a whole string picks the "
                         "longest merges, which a sampling model need not produce."
                         % (s["pos"], c["text"], c["rank"], c["prob"], top1["text"], top1["prob"]))
    for lens in logit_lens:
        final_top = lens["layers"][-1]["top"][0]["text"]
        first = next((ly["layer"] for ly in lens["layers"][1:]
                      if ly["top"][0]["text"] == final_top), None)
        notes.append("logitLens pos %d (%s): the final top-1 %r first becomes the lens top-1 at "
                     "layer %s of %d; the scripted token is %r."
                     % (lens["pos"], lens["label"], final_top, first, L,
                        tokens[lens["pos"]]["text"]))
    notes.append("logitLens: pos is the token being predicted (hidden state read at pos-1, "
                 "same convention as steps). Layer 0 is the raw token embedding (with tied "
                 "embeddings it mostly 'predicts' the input token itself); layer %d is the real "
                 "output. Final RMSNorm + unembedding applied at every layer." % L)
    notes.append("attention: weights are per query head after softmax, top 12 by weight "
                 "(descending) followed by the specifically targeted positions if they were "
                 "not already included. The model uses grouped-query attention: %d query heads "
                 "share %d key/value heads (%d query heads per KV head); head index is the "
                 "query head. Most heads park a large share of attention on position 0 (an "
                 "'attention sink'); heads were chosen by raw weight on the target tokens."
                 % (H, n_kv, H // max(n_kv, 1)))
    notes.append("Previous-token head chosen by highest mean A[i, i-1] over all positions "
                 "(%.2f); runner-up heads: %s." % (
                     prev_scores.max(),
                     ", ".join("L%dH%d=%.2f" % (l, h, prev_scores[l, h]) for l, h in
                               [np.unravel_index(j, prev_scores.shape)
                                for j in np.argsort(-prev_scores, axis=None)[1:4]])))
    notes += attn_notes
    notes.append("embeddings: %d words, input-embedding rows L2-normalized and centered, then "
                 "projected onto principal axes %d and %d of the 6 group centroids (PCA of the "
                 "centroids, not of the raw words); each axis min-max scaled to [-1, 1]. "
                 "Nearest-neighbour-in-same-group rate: %.0f%% in the full %d-D space, %.0f%% "
                 "with plain 2-D PCA, %.0f%% in this map. Skipped (not one token with a leading "
                 "space): %s. Qwen splits every digit, so number WORDS stand in for numbers."
                 % (len(points), emb_scores["pair"][0] + 1, emb_scores["pair"][1] + 1,
                    100 * emb_scores["fullD"], cfg.hidden_size, 100 * emb_scores["plainPca"],
                    100 * emb_scores["centroidPca"],
                    ", ".join(repr(s) for s in skipped) or "none"))
    for name, g in greedy.items():
        notes.append("Unforced greedy generation for the %s: %r" % (name, g))

    trace = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "model": {"id": args.model, "layers": L, "heads": H, "dModel": cfg.hidden_size,
                  "vocabSize": int(logits.shape[-1]), "license": license_str},
        "template": {"note": (
            "Rendered with the model's own chat template (tokenizer.apply_chat_template) and "
            "its native tool calling (tools=[calculator JSON schema]). The system message is "
            "the system prompt + '\\n\\nCourse files:\\n' + the two passages joined by '\\n'; "
            "the template then appends a '# Tools' block describing the calculator. The "
            "assistant's first turn is '<tool_call>\\n{\"name\": \"calculator\", \"arguments\": "
            "{\"expression\": ...}}\\n</tool_call>'; the tool result comes back as a user turn "
            "wrapped in <tool_response>...</tool_response>; then the assistant replies. "
            "Assistant tokens start after the generation prompt %r and include the closing %s."
            % (gen_prompt_str, tok.eos_token)) if native_tools else (
            "Rendered with the model's own chat template, which has NO native tool calling. "
            "System message = system prompt + '\\n\\nCourse files:\\n' + passages + a "
            "script-written calculator description; the assistant's first turn is the text "
            "'<tool_call>\\n{json}\\n</tool_call>'; the tool result is a role 'tool' message as "
            "the template renders it. Assistant tokens start after the generation prompt %r "
            "and include the closing %s." % (gen_prompt_str, tok.eos_token))},
        "scenario": sc,
        "tokens": tokens,
        "steps": steps,
        "logitLens": logit_lens,
        "attention": attention,
        "embeddings": {"method": "pca", "points": points},
        "notes": notes,
    }

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(trace, f, indent=1, ensure_ascii=False)
        f.write("\n")

    # ---- console summary ---------------------------------------------------------------
    print("model      %s  (L=%d, H=%d, kv=%d, d=%d)" % (args.model, L, H, n_kv, cfg.hidden_size))
    print("tokens     %d  (assistant-generated: %d)" % (T, len(gen_positions)))
    print("timings    " + "  ".join("%s=%.2fs" % kv for kv in timings.items()))
    print("tool turn  " + summarize(tool_steps))
    print("reply turn " + summarize(rep_steps))
    for a in attention:
        print("attn       L%dH%d q=%d %r: %s" % (a["layer"], a["head"], a["queryPos"],
                                                 tokens[a["queryPos"]]["text"], a["label"]))
    for name, g in greedy.items():
        print("greedy     %s: %r" % (name, g))
    print("wrote      %s (%.1f KB)" % (out_path, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    main()
