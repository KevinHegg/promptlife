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
    "system": "You are a helpful assistant.",
    "passages": [
        "Recipe card: Grandma's buttermilk biscuits. Serves 8. 2 1/4 cups flour, 1 tablespoon "
        "baking powder, 1/2 teaspoon salt, 6 tablespoons butter, 1 cup buttermilk.",
        "Back of the card: Two biscuits per person. Bake at 425\u00b0F for 12 minutes.",
    ],
    "user": "Using my grandmother's recipe card, how much flour do I need to feed 30 people?",
    "toolExpression": "2.25 * 30 / 8",
    "toolResult": "8.4375",
    # Placeholder; replaced below once the model's own greedy reply has been checked.
    "reply": "You need about 8.4 cups of flour to feed 30 people.",
}

# How the app frames the retrieved passages inside the system message.
RAG_HEADER = "\n\nYour files:\n"

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
    tool_name = next((p for p in gen_tool if "calc" in tokens[p]["text"]), None)
    # A content word in the reply: ' flour' if present, else the first alphabetic word
    # longer than 3 letters that is not a function word.
    rep_word = next((p for p in gen_rep if tokens[p]["text"] == " flour"), None)
    if rep_word is None:
        rep_word = next((p for p in gen_rep if tokens[p]["text"].strip().isalpha() and
                         len(tokens[p]["text"].strip()) > 3 and
                         tokens[p]["text"].strip().lower() not in {"about", "need", "your"}), None)

    lens_targets = []   # (pos, id, technical label)
    if gen_tool:
        lens_targets.append((gen_tool[0], "turn-start", "Start of the assistant's turn: "
                             "predicting %r right after 'assistant'" % tokens[gen_tool[0]]["text"]))
    if tool_name is not None:
        lens_targets.append((tool_name, "tool-name", "Choosing which tool: predicting %r inside "
                             "the tool call" % tokens[tool_name]["text"]))
    if rep_digits:
        lens_targets.append((rep_digits[0], "answer-digit", "First digit of the answer: "
                             "predicting %r of %s in the reply" % (tokens[rep_digits[0]]["text"],
                                                                   sc["toolResult"])))
    if rep_word is not None:
        lens_targets.append((rep_word, "reply-word", "Predicting %r in the reply"
                             % tokens[rep_word]["text"]))

    def lens_plain(lid, entry):
        """One plain-English sentence for students (no 'logit', 'layer', 'rank')."""
        final = entry["layers"][-1]["top"][0]
        f_text, f_prob = final["text"], final["prob"]
        first = next((ly["layer"] for ly in entry["layers"][1:]
                      if ly["top"][0]["text"] == f_text), L)
        frac = first / float(L)
        when = ("only in the last few steps of the model's processing" if frac >= 0.8 else
                "in the later part of the model's processing" if frac >= 0.6 else
                "about halfway through the model's processing" if frac >= 0.4 else
                "early in the model's processing")
        sure = ("and by the end the model is almost certain" if f_prob >= 0.9 else
                "and by the end it is the favorite" if f_prob >= 0.5 else
                "and even at the end it is a close call")
        word = f_text.strip() or "a space"
        before = entry["layers"][L - 1]["top"][0]["text"].strip() if L >= 1 else ""
        if first == L and before.isalnum() and before != word:
            plan = ("calling the calculator" if f_text == "<tool_call>" else "'%s'" % word)
            return ("Until the very last step the model leans toward writing '%s'; only at the "
                    "end does %s win out." % (before, plan))
        what = {
            "turn-start": ("The plan to call the calculator shows up" if f_text == "<tool_call>"
                           else "The plan to start with '%s' shows up" % word),
            "tool-name": "The tool's name, '%s', shows up" % word,
            "answer-digit": "The first digit of the answer, '%s', shows up" % word,
            "reply-word": "The word '%s' shows up" % word,
        }[lid]
        tail = ""
        if f_text != tokens[entry["pos"]]["text"]:
            tail = " (the recorded answer uses '%s' here instead)" % (
                tokens[entry["pos"]]["text"].strip() or "a space")
        return "%s %s, %s%s." % (what, when, sure, tail)

    t0 = time.time()
    logit_lens = []
    for p, lid, lab in lens_targets:
        e = lens_at(p, lab)
        logit_lens.append({"id": lid, "pos": e["pos"], "label": lab,
                           "plain": lens_plain(lid, e), "layers": e["layers"]})
    timings["lens_s"] = time.time() - t0

    # ---- attention search ---------------------------------------------------------------
    # Rows, in this order and at most one per head: question-to-card, induction,
    # previous-token, copy. Each row gets an id and a plain-English sentence.
    attention = []
    attn_notes = []
    used_heads = set()

    def best_head(q, targets, exclude=()):
        best = None
        for l in range(L):
            for h in range(H):
                if (l, h) in exclude:
                    continue
                s = float(A[l][h, q, targets].sum())
                if best is None or s > best[0]:
                    best = (s, l, h)
        return best

    def word(p):
        """Plain text for a token; a digit or '.' is expanded to its whole number."""
        def num(i):
            return tokens[i]["text"] in ".0123456789" and tokens[i]["text"] != ""
        if num(p) and tokens[p]["text"] != ".":
            a, b = p, p
            while a - 1 >= 0 and num(a - 1) and tokens[a - 1]["src"] == tokens[p]["src"]:
                a -= 1
            while b + 1 < T and num(b + 1) and tokens[b + 1]["src"] == tokens[p]["src"]:
                b += 1
            return "".join(tokens[i]["text"] for i in range(a, b + 1)).strip(".")
        return tokens[p]["text"].strip() or "a space"

    where = {"rag": "the recipe card", "user": "the question", "sys": "the instructions",
             "res": "the calculator's result", "tool": "the calculator call",
             "rep": "the answer"}

    # (a) question-to-card: a question word looks back at the same word on the card.
    q2c = []
    for q_text, card_texts in ((" flour", [" flour"]), (" people", [" person", " people"])):
        qp = find_token(tokens, q_text, src="user")
        targets = [t["i"] for t in tokens if t["src"] == "rag" and t["text"] in card_texts]
        if qp is not None and targets:
            s, l, h = best_head(qp, targets)
            q2c.append((s, l, h, qp, targets))
    if q2c:
        for s, l, h, qp, targets in q2c[1:]:
            attn_notes.append("Also found: question %r -> card %s, L%dH%d at %.0f%% (not "
                              "exported, so each head appears once)."
                              % (tokens[qp]["text"], [tokens[t]["text"] for t in targets],
                                 l, h, 100 * s))
        s, l, h, qp, targets = q2c[0]
        used_heads.add((l, h))
        tgt = max(targets, key=lambda t: A[l][h, qp, t])
        attention.append({
            "id": "question-to-card", "layer": l, "head": h, "queryPos": qp,
            "label": "Question %r looks back at %r on the recipe card (%.0f%%)"
                     % (tokens[qp]["text"], tokens[tgt]["text"], 100 * s),
            "plain": "When the question says '%s', this part of the model looks back at '%s' "
                     "on the recipe card." % (word(qp), word(tgt)),
            "weights": attn_row(A, l, h, qp, targets)})

    # (b) induction: for every token that appeared earlier (same id), weight on the token
    # right AFTER its previous occurrence. Best head by the average over all repeats.
    repeats = []
    for q in range(T):
        if tokens[q]["src"] == "special" or not tokens[q]["text"].strip():
            continue
        prev = [j for j in range(q - 1) if ids[j] == ids[q]]
        if prev:
            repeats.append((q, prev[-1]))
    if repeats:
        ind = np.zeros((L, H))
        for q, j in repeats:
            ind += np.stack([A[l][:, q, j + 1] for l in range(L)])
        ind /= len(repeats)
        for flat in np.argsort(-ind, axis=None):
            il, ih = (int(v) for v in np.unravel_index(int(flat), ind.shape))
            if (il, ih) not in used_heads:
                break
        # Example: a question/answer token whose "next after previous occurrence" is a real
        # word, with the strongest weight in this head.
        ex = [(A[il][ih, q, j + 1], q, j) for q, j in repeats
              if tokens[q]["src"] in ("user", "rep", "tool") and tokens[j + 1]["src"] != "special"
              and tokens[j + 1]["text"].strip()]
        if ex:
            w, q, j = max(ex)
            if w >= 0.3:
                used_heads.add((il, ih))
                attention.append({
                    "id": "induction", "layer": il, "head": ih, "queryPos": q,
                    "label": "Induction head: %r in %s finds the earlier %r in %s and attends to "
                             "the token after it, %r (%.0f%%; mean %.2f over %d repeated tokens)"
                             % (tokens[q]["text"], where[tokens[q]["src"]], tokens[j]["text"],
                                where[tokens[j]["src"]], tokens[j + 1]["text"], 100 * w,
                                ind[il, ih], len(repeats)),
                    "plain": "When %s writes '%s', this part of the model finds the earlier '%s' "
                             "in %s and looks at what came right after it, '%s'."
                             % (where[tokens[q]["src"]], word(q), word(j),
                                where[tokens[j]["src"]], word(j + 1)),
                    "weights": attn_row(A, il, ih, q, [j, j + 1])})
            else:
                attn_notes.append("No convincing induction example (best %.2f); row skipped." % w)

    # (c) previous-token head: highest mean weight on position i-1 over all positions.
    idx = np.arange(1, T)
    prev_scores = np.array([[A[l][h, idx, idx - 1].mean() for h in range(H)] for l in range(L)])
    for flat in np.argsort(-prev_scores, axis=None):
        pl, ph = (int(v) for v in np.unravel_index(int(flat), prev_scores.shape))
        if (pl, ph) not in used_heads:
            break
    used_heads.add((pl, ph))
    # Example query: the reply WORD whose i-1 weight is closest to the head's median.
    med = float(np.median(A[pl][ph, idx, idx - 1]))
    pool = [i for i in gen_rep if tokens[i]["text"].strip().isalpha() and
            tokens[i - 1]["text"].strip().isalpha()] or gen_rep or [T - 2]
    q_prev = min(pool, key=lambda i: abs(A[pl][ph, i, i - 1] - med))
    attention.append({
        "id": "previous-token", "layer": pl, "head": ph, "queryPos": q_prev,
        "label": "Previous-token head: each token looks mostly at the one just before it "
                 "(mean %.2f across all %d tokens)" % (prev_scores[pl, ph], T),
        "plain": "This part of the model mostly looks at the word just before: at '%s', it "
                 "looks at '%s'." % (word(q_prev), word(q_prev - 1)),
        "weights": attn_row(A, pl, ph, q_prev, [q_prev - 1])})

    # (d) copy head: reply number <- tool-result digits. The k-th token of the reply's
    # number is paired with the k-th token of the result while the ids match; the query is
    # the slot BEFORE each reply token (the one that has to produce it).
    res_pos = [t["i"] for t in tokens if t["src"] == "res"]
    if res_pos and rep_digits:
        first = rep_digits[0]
        pairs = []
        for k, r in enumerate(res_pos):
            if first + k < T and tokens[first + k]["id"] == tokens[r]["id"]:
                pairs.append((first + k - 1, r))
            else:
                break
        if pairs:
            copy = np.zeros((L, H))
            for q, r in pairs:
                copy += np.stack([A[l][:, q, r] for l in range(L)])
            copy /= len(pairs)
            for flat in np.argsort(-copy, axis=None):
                cl, ch = (int(v) for v in np.unravel_index(int(flat), copy.shape))
                if (cl, ch) not in used_heads:
                    break
            used_heads.add((cl, ch))
            per = ", ".join("%r->%.2f" % (tokens[r]["text"], A[cl][ch, q, r]) for q, r in pairs)
            attn_notes.append("Copy head L%dH%d: weight on the matching result token when "
                              "producing each token of the reply's number: %s (mean %.2f)."
                              % (cl, ch, per, copy[cl, ch]))
            q, r = pairs[0]
            attention.append({
                "id": "copy", "layer": cl, "head": ch, "queryPos": q,
                "label": "Copy head: %s, about to write %r, looks at the %r in the tool result "
                         "(%.0f%%)" % ("the space before the number" if not tokens[q]["text"].strip()
                                        else "reply %r" % tokens[q]["text"],
                                        tokens[q + 1]["text"], tokens[r]["text"],
                                        100 * A[cl][ch, q, r]),
                "plain": "Just before writing the number, this part of the model looks straight "
                         "at the calculator's result, %s, and copies its first digit, '%s'."
                         % (sc["toolResult"], tokens[r]["text"].strip()),
                "weights": attn_row(A, cl, ch, q, res_pos)})
        else:
            attn_notes.append("The reply's number does not start like the tool result; copy-head "
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
        "Probabilities are softmax at temperature 1 over the full %d-row unembedding, "
        "including the %d unused padding rows beyond the tokenizer's %d real tokens; at the "
        "step positions those rows hold at most %.1g of the probability."
        % (logits.shape[-1], logits.shape[-1] - len(tok), len(tok), max(
            float(torch.softmax(logits[s["pos"] - 1].double(), -1)[len(tok):].sum())
            for s in steps)),
        "Token text is the decoded string with real spaces/newlines (no 'Ġ'/'Ċ'). Qwen "
        "splits every digit into its own token, so %r is %s."
        % (" " + sc["toolResult"], ", ".join(repr(dec(tok, i)) for i in
                                             tok.encode(" " + sc["toolResult"]))),
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
        if c["rank"] > 1 and top1["text"].strip() and len(top1["text"]) < len(c["text"]) and \
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
