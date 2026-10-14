#!/usr/bin/env python3
"""
Prompt Life trace pipeline, phase 1 extras -> src/data/traces/phase1.json

Same model, same scenario and same token positions as make_trace.py (hero-trace.json).
It adds the data for the phase 1 interactions:

  votePositions    3 generated positions with the exact top-500 logits plus a binned tail
                   of every other real vocab row, so the app can compute softmax at any
                   temperature
  temperatureRuns  the reply turn sampled freely at T = 0 / 0.7 / 1.0 / 1.5 / 2.0
  freeFirstTurn    what the model writes for the first assistant turn when NOT forced
                   (with and without a "use the calculator" system-prompt nudge)
  letters          the hero question fed one character per token: what breaks
  beat             "Beat the Model": 5 hero positions + 10 public-domain sentence blanks

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_phase1.py
  ... --out /tmp/phase1.json
"""

import argparse
import datetime as _dt
import json
import os
import re
import sys
import time
import warnings

warnings.filterwarnings("ignore")

import torch  # noqa: E402
from transformers import AutoModelForCausalLM, AutoTokenizer  # noqa: E402
from transformers.utils import logging as hf_logging  # noqa: E402

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_trace import SCENARIO, TOOLS, build_hero, build_messages, dec, r4  # noqa: E402

hf_logging.set_verbosity_error()

# --------------------------------------------------------------------------------------
# Curated choices
# --------------------------------------------------------------------------------------
VOTE_FIXED = [
    (249, "First token of the assistant's turn: answer in prose, or call the calculator?"),
    (313, "After 'You need at least': a space before the number, or ' a' / ' an'?"),
]
# 5 hero positions for "think like the model": two easy, one medium, one open, and one
# where the model is confidently wrong.
THINK_LIKE = [
    (312, "easy"),     # ' least' after 'You need at' (p~1)
    (322, "easy"),     # ' final' in 'on the final'
    (255, "medium"),   # tool name 'calculator' (vs 'calculate')
    (264, "open"),     # first digit of the expression: '9' vs '8' ...
    (270, "wrong"),    # '0.6' in the expression: the model expects '0.5'
]
FREE_NUDGE = " Use the calculator tool for any arithmetic."

# Public-domain lines, quoted exactly. The prefix runs up to (not including) the truth
# word; the truth keeps its leading space. Five where the model wins, five where it loses.
SENTENCES = [
    ("Jane Austen, Pride and Prejudice (1813)",
     "It is a truth universally acknowledged, that a single man in possession of a good",
     " fortune"),
    ("Frederick Douglass, Narrative of the Life of Frederick Douglass (1845)",
     "You have seen how a man was made a slave; you shall see how a slave was made a",
     " man"),
    ("James Madison, The Federalist No. 51 (1788)",
     "If men were angels, no government would be",
     " necessary"),
    ("Abraham Lincoln, Gettysburg Address, Bliss copy (1863)",
     "Four score and seven years ago our fathers brought forth on this continent, a new "
     "nation, conceived in",
     " Liberty"),
    ("Charles Dickens, A Tale of Two Cities (1859)",
     "It was the best of times, it was the worst of",
     " times"),
    ("Charles Darwin, On the Origin of Species (1859)",
     "from so simple a beginning endless forms most beautiful and most",
     " wonderful"),
    ("Mary Shelley, Frankenstein (1818)",
     "It was on a dreary night of",
     " November"),
    ("Mary Wollstonecraft, A Vindication of the Rights of Woman (1792)",
     "I do not wish them to have power over men; but over",
     " themselves"),
    ("W. E. B. Du Bois, The Souls of Black Folk (1903)",
     "The problem of the twentieth century is the problem of the",
     " color-line"),
    ("Henry David Thoreau, Walden (1854)",
     "I went to the woods because I wished to live",
     " deliberately"),
]

TEMPS = [(0.0, [None]), (0.7, [1, 2, 3]), (1.0, [1, 2, 3]), (1.5, [1, 2, 3]), (2.0, [1, 2, 3])]
MARKERS = {"<tool_call>", "</tool_call>"}


# --------------------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------------------
def visible_context(tokens, pos, min_chars):
    """
    Visible text before `pos`: special/template tokens (and the <tool_call> tags) are
    dropped, and a turn boundary becomes a single '\\n'. We take the last `min_chars`
    characters, extended back to the start of a word.
    """
    parts, broke = [], False
    for t in tokens[:pos]:
        if t["src"] == "special" or t["text"] in MARKERS:
            broke = True
            continue
        if broke and parts:
            parts.append("\n")
        broke = False
        parts.append(t["text"])
    s = re.sub(r"\s*\n\s*", "\n", "".join(parts))
    if len(s) <= min_chars:
        return s.strip()
    i = len(s) - min_chars
    while i > 0 and not s[i - 1].isspace():
        i -= 1
    return s[i:].lstrip()


def entropy(row):
    lp = torch.log_softmax(row.double(), -1)
    return float(-(lp.exp() * lp).sum())


def rank_of(row, tid):
    return int((row > row[tid]).sum().item()) + 1


def sample(model, prefix_ids, temp, seed, max_new, stop_ids, n_real):
    """
    Pure-temperature sampling with a KV cache (no top-k / top-p). temp == 0 is greedy.
    Padding rows (>= n_real) are excluded: they are not real tokens.
    Returns (generated ids without the stop token, stopped_naturally).
    """
    gen = torch.Generator().manual_seed(seed) if seed is not None else None
    past, out = None, []
    inp = torch.tensor([prefix_ids])
    with torch.no_grad():
        for _ in range(max_new):
            o = model(inp, past_key_values=past, use_cache=True)
            past = o.past_key_values
            row = o.logits[0, -1, :n_real].double()
            if temp == 0:
                nxt = int(row.argmax())
            else:
                nxt = int(torch.multinomial(torch.softmax(row / temp, -1), 1, generator=gen))
            if nxt in stop_ids:
                return out, True
            out.append(nxt)
            inp = torch.tensor([[nxt]])
    return out, False


def top_text_prob(tok, row, k):
    p = torch.softmax(row.double(), -1)
    v, ix = torch.topk(p, k)
    return [{"text": dec(tok, i), "prob": r4(pv)} for pv, i in zip(v.tolist(), ix.tolist())]


# --------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--model", default="Qwen/Qwen2.5-0.5B-Instruct")
    ap.add_argument("--out", default=None,
                    help="default: <repo>/src/data/traces/phase1.json")
    ap.add_argument("--hero", default=None,
                    help="hero-trace.json to check token alignment against "
                         "(default: <repo>/src/data/traces/hero-trace.json if present)")
    ap.add_argument("--vote-top", type=int, default=500)
    ap.add_argument("--beat-top", type=int, default=200)
    args = ap.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "phase1.json")
    hero_path = args.hero or os.path.join(repo_root, "src", "data", "traces", "hero-trace.json")
    notes = []
    t_start = time.time()

    tok = AutoTokenizer.from_pretrained(args.model)
    model = AutoModelForCausalLM.from_pretrained(
        args.model, torch_dtype=torch.float32, attn_implementation="eager").eval()
    n_real = len(tok)                                   # real vocab (incl. added tokens)
    n_rows = model.get_output_embeddings().weight.shape[0]
    n_pad = n_rows - n_real
    im_end = tok.convert_tokens_to_ids("<|im_end|>")
    eot = tok.convert_tokens_to_ids("<|endoftext|>")
    stop_ids = {im_end, eot}

    hero = build_hero(tok, SCENARIO)
    ids, tokens = hero["ids"], hero["tokens"]
    if os.path.exists(hero_path):
        with open(hero_path) as f:
            hero_json = json.load(f)
        if [t["id"] for t in hero_json["tokens"]] != ids:
            sys.exit("Token ids differ from %s; positions would not line up." % hero_path)
        notes.append("Token positions (pos) are the same as in hero-trace.json "
                     "(checked against its token ids).")

    with torch.no_grad():
        logits = model(torch.tensor([ids])).logits[0].float()   # [T, rows]
    real = logits[:, :n_real]

    # ---- 1. votePositions --------------------------------------------------------------
    gen_rep = [p for p in hero["gen_positions"] if tokens[p]["src"] == "rep"]
    ent = {p: entropy(real[p - 1]) for p in hero["gen_positions"]}
    fixed = {p for p, _ in VOTE_FIXED}
    best_rep = max((p for p in gen_rep if p not in fixed), key=lambda p: ent[p])
    top2 = torch.topk(real[best_rep - 1], 2).indices.tolist()
    vote_specs = VOTE_FIXED + [
        (best_rep, "Highest-entropy word in the reply (H=%.2f nats): %r or %r?"
         % (ent[best_rep], dec(tok, top2[0]), dec(tok, top2[1])))]
    end_turn = [p for p in hero["gen_positions"] if p > best_rep and ids[p] == im_end]
    if end_turn and ent[end_turn[0]] > ent[best_rep]:
        notes.append("votePositions: pos %d is the highest-entropy WORD in the reply. The "
                     "closing <|im_end|> at pos %d is higher overall (H=%.2f: stop p=%.2f vs "
                     "%r p=%.2f); it was not used because it is a stop-or-continue choice, "
                     "not a word choice." % (
                         best_rep, end_turn[0], ent[end_turn[0]],
                         float(torch.softmax(real[end_turn[0] - 1].double(), -1)[im_end]),
                         dec(tok, torch.topk(real[end_turn[0] - 1], 2).indices[1].item()),
                         float(torch.topk(torch.softmax(real[end_turn[0] - 1].double(), -1),
                                          2).values[1])))

    vote_positions, approx_err = [], []
    for pos, label in vote_specs:
        row = real[pos - 1]
        p_exact = torch.softmax(row.double(), -1)
        tid = ids[pos]
        v, ix = torch.topk(row, args.vote_top)
        top = [{"id": int(i), "text": dec(tok, i), "logit": r4(lv)}
               for lv, i in zip(v.tolist(), ix.tolist())]
        mask = torch.ones(n_real, dtype=torch.bool)
        mask[ix] = False
        rest = row[mask].double()
        width = 0.5
        bidx = torch.floor(rest / width).long()
        uniq, counts = torch.unique(bidx, return_counts=True)
        bins = [{"logit": r4((b + 0.5) * width), "count": int(c)}
                for b, c in zip(uniq.tolist(), counts.tolist())]
        vote_positions.append({
            "pos": pos, "label": label,
            "context": visible_context(tokens, pos, 40),
            "chosen": {"text": dec(tok, tid), "rank": rank_of(row, tid),
                       "prob": r4(p_exact[tid])},
            "top": top,
            "tail": {"binWidth": width, "bins": bins},
        })
        # How close is "exact top-500 + binned tail" to the true softmax?
        for T in (0.7, 1.0, 1.5, 2.0):
            lt = torch.tensor([e["logit"] for e in top], dtype=torch.float64) / T
            lb = torch.tensor([b["logit"] for b in bins], dtype=torch.float64) / T
            cb = torch.tensor([b["count"] for b in bins], dtype=torch.float64)
            m = max(lt.max().item(), lb.max().item())
            z = torch.exp(lt - m).sum() + (cb * torch.exp(lb - m)).sum()
            approx = torch.exp(lt - m) / z
            exact = torch.softmax(row.double() / T, -1)[ix]
            tail_mass = 1 - float(torch.softmax(row.double() / T, -1)[ix].sum())
            approx_err.append((pos, T, float((approx - exact).abs().max()), tail_mass))
    worst = max(approx_err, key=lambda e: e[2])
    tails = {T: max(e[3] for e in approx_err if e[1] == T) for T in (0.7, 1.0, 1.5, 2.0)}
    notes.append("votePositions: 'top' holds the exact top-%d logits; 'tail' bins every other "
                 "real vocab row (%d rows) by logit, width 0.5, bin center in 'logit'. %d unused "
                 "padding rows (ids >= %d, the tokenizer's real size) were dropped; at these "
                 "positions they hold < 3e-6 of the probability at T=1. Top-%d + binned tail "
                 "reproduces the exact softmax of the top-%d entries to within %.1e (worst: pos %d "
                 "at T=%.1f). Tail mass outside the top-%d at worst position: %s."
                 % (args.vote_top, n_real, n_pad, n_real, args.vote_top, args.vote_top,
                    worst[2], worst[0], worst[1], args.vote_top,
                    ", ".join("T=%.1f %.3f" % (T, m) for T, m in tails.items())))
    notes.append("votePositions.chosen.prob and all other probabilities in this file are "
                 "softmax at T=1 over the %d real vocab rows (padding rows excluded)." % n_real)
    notes.append("context strings: visible text before the position with template markers "
                 "(special tokens, role names, <tool_call> tags, <tool_response> wrappers) "
                 "removed; a turn boundary becomes one '\\n'. Cut to ~N characters at a word start.")

    # ---- 2. temperatureRuns -------------------------------------------------------------
    reply_start = min(gen_rep)                       # first reply token; prefix = 0..start-1
    prefix = ids[:reply_start]
    t0 = time.time()
    temperature_runs = []
    for T, seeds in TEMPS:
        for seed in seeds:
            g, natural = sample(model, prefix, T, seed, 40, stop_ids, n_real)
            temperature_runs.append({"T": T, "seed": seed, "text": tok.decode(g),
                                     "tokens": [dec(tok, i) for i in g],
                                     "stoppedNaturally": natural})
    t_temp = time.time() - t0
    notes.append("temperatureRuns: context = hero tokens 0..%d (through the generation prompt "
                 "'<|im_start|>assistant\\n' after </tool_response>). Pure temperature sampling "
                 "(no top-k, no top-p) over the %d real vocab rows, torch.multinomial with "
                 "torch.Generator().manual_seed(seed); T=0 is greedy and has seed null. Max 40 new "
                 "tokens; stops at <|im_end|> or <|endoftext|> (Qwen's two EOS ids), and the stop "
                 "token is not included in text/tokens. A token that is part of a multi-byte "
                 "character decodes to '\\ufffd' on its own; 'text' is decoded as a whole."
                 % (reply_start - 1, n_real))

    # ---- 3. freeFirstTurn ----------------------------------------------------------------
    first_tool = min(p for p in hero["gen_positions"] if tokens[p]["src"] == "tool")
    tc_id = tok.convert_tokens_to_ids("<tool_call>")

    def first_turn(prefix_ids, max_new):
        g, natural = sample(model, prefix_ids, 0.0, None, max_new, stop_ids, n_real)
        with torch.no_grad():
            row = model(torch.tensor([prefix_ids])).logits[0, -1, :n_real].double()
        text = tok.decode(g)
        return {"text": text, "tokenCount": len(g), "usedTool": "<tool_call>" in text,
                "mentionsCalculator": "calculator" in text.lower(),
                "stoppedNaturally": natural,
                "pToolCallStart": r4(torch.softmax(row, -1)[tc_id]),
                "toolCallStartRank": rank_of(row, tc_id)}

    def final_number(text):
        nums = re.findall(r"\d+(?:\.\d+)?%?", text)
        return nums[-1] if nums else None

    free = first_turn(ids[:first_tool], 260)
    free["finalNumberMentioned"] = final_number(free["text"])
    sc_n = dict(SCENARIO)
    sc_n["system"] = SCENARIO["system"] + FREE_NUDGE
    msgs_n = build_messages(sc_n)
    ids_n = tok.apply_chat_template(msgs_n[:2], tools=TOOLS, tokenize=True,
                                    add_generation_prompt=True)
    nudged = first_turn(list(ids_n), 260)
    nudged["finalNumberMentioned"] = final_number(nudged["text"])
    free_first_turn = dict(free)
    free_first_turn["withCalculatorInstruction"] = dict(
        nudged, systemPrompt=sc_n["system"])
    notes.append("freeFirstTurn: greedy, context = hero tokens 0..%d (tools available), max 260 "
                 "new tokens, stop at <|im_end|>. usedTool = the text contains a real "
                 "'<tool_call>' token; mentionsCalculator = the word 'calculator' appears at all "
                 "(the model may describe or fake a call in the wrong syntax). "
                 "finalNumberMentioned = the last number in the "
                 "generated text (null if none). pToolCallStart / toolCallStartRank = the model's "
                 "probability and rank for '<tool_call>' as the first token. "
                 "withCalculatorInstruction appends %r to the system prompt (its context is %d "
                 "tokens)." % (first_tool - 1, FREE_NUDGE, len(ids_n)))

    notes.append("All generation in this file is PURE greedy/temperature sampling: no "
                 "repetition penalty, top-k or top-p. Qwen's generation_config.json defaults to "
                 "repetition_penalty=1.1, temperature=0.7, top_p=0.8, top_k=20, and HF generate() "
                 "applies the repetition penalty even when do_sample=False. That is why the "
                 "greedy reply quoted in hero-trace.json's notes says 'To achieve' while pure "
                 "greedy says 'To get' (p=0.440 vs 0.426 after 'To').")

    # ---- 4. letters ----------------------------------------------------------------------
    q = SCENARIO["user"]
    q_pos = [t["i"] for t in tokens if t["src"] == "user"]
    q0, q1 = q_pos[0], q_pos[-1] + 1
    assert tok.decode(ids[q0:q1]) == q
    letter_ids = []
    for ch in q:
        e = tok.encode(ch, add_special_tokens=False)
        if len(e) != 1:
            sys.exit("Character %r is not a single token" % ch)
        letter_ids.append(e[0])
    assert tok.decode(letter_ids) == q
    ids_letters = ids[:q0] + letter_ids + ids[q1:first_tool]
    lt = first_turn(ids_letters, 120)
    letters = {
        "questionTokenCountNormal": q1 - q0,
        "questionTokenCountLetters": len(letter_ids),
        "method": "Same hero context through the generation prompt, but the %d question tokens "
                  "are replaced by %d single-character tokens: each character's own id "
                  "(tokenizer.encode(ch)), e.g. 'U'=%d, 's'=%d, and the space is the byte-level "
                  "space token ' '=%d. The ids decode to exactly the same text; only the split "
                  "differs." % (q1 - q0, len(letter_ids), letter_ids[0], letter_ids[1],
                                tok.encode(" ")[0]),
        "firstTurnGreedy": lt,
    }

    # ---- 5. beat ---------------------------------------------------------------------------
    think_like = []
    for pos, kind in THINK_LIKE:
        row = real[pos - 1]
        p = torch.softmax(row.double(), -1)
        think_like.append({"pos": pos, "kind": kind,
                           "context": visible_context(tokens, pos, 60),
                           "truth": dec(tok, ids[pos]),
                           "truthProb": r4(p[ids[pos]]), "truthRank": rank_of(row, ids[pos]),
                           "top": top_text_prob(tok, row, args.beat_top)})
    sentences = []
    for source, prefix_text, truth in SENTENCES:
        pid = tok.encode(prefix_text, add_special_tokens=False)
        full = tok.encode(prefix_text + truth, add_special_tokens=False)
        if full[:len(pid)] != pid:
            sys.exit("Prefix tokenization changes when the truth is appended: %r" % prefix_text)
        tid = full[len(pid):]
        with torch.no_grad():
            lg = model(torch.tensor([full])).logits[0, :, :n_real].double()
        prob = 1.0
        for k, t in enumerate(tid):
            prob *= float(torch.softmax(lg[len(pid) - 1 + k], -1)[t])
        row = lg[len(pid) - 1]
        sentences.append({"source": source, "prefix": prefix_text, "truth": truth,
                          "truthTokens": [dec(tok, t) for t in tid],
                          "truthProb": r4(prob), "truthRank": rank_of(row, tid[0]),
                          "top": top_text_prob(tok, row, args.beat_top)})
    notes.append("beat.sentences: computed on the plain prefix text with NO chat template and "
                 "no BOS token (Qwen adds none). truthProb multiplies the probabilities of all "
                 "of the truth word's tokens (teacher-forced); truthRank is the rank of its first "
                 "token. All lines are verbatim from public-domain texts. The Darwin prefix "
                 "starts mid-sentence, as in the original's final sentence.")
    notes.append("beat.thinkLike: 'kind' is the curation intent (easy / medium / open / wrong). "
                 "truthProb and truthRank are extra fields beyond the request.")

    model_info = {"id": args.model, "layers": model.config.num_hidden_layers,
                  "heads": model.config.num_attention_heads,
                  "dModel": model.config.hidden_size, "vocabSize": n_rows,
                  "realVocabSize": n_real, "license": "apache-2.0"
                  if "Qwen2.5" in args.model else "see model card"}
    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "model": model_info,
        "votePositions": vote_positions,
        "temperatureRuns": temperature_runs,
        "freeFirstTurn": free_first_turn,
        "letters": letters,
        "beat": {"thinkLike": think_like, "sentences": sentences},
        "notes": notes,
    }
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")

    # ---- console summary ------------------------------------------------------------------
    print("votes      " + ", ".join("%d (%r, H=%.2f)" % (v["pos"], v["chosen"]["text"],
                                                       ent[v["pos"]]) for v in vote_positions))
    print("approx     worst |err| %.2e at pos %d T=%.1f; tail mass %s" % (
        worst[2], worst[0], worst[1], tails))
    for r in temperature_runs:
        print("T=%.1f s=%s %s %r" % (r["T"], r["seed"], "stop" if r["stoppedNaturally"] else "cut ",
                                     r["text"]))
    print("free       tool=%s n=%d final=%s p(tc)=%.3g: %r" % (
        free["usedTool"], free["tokenCount"], free["finalNumberMentioned"],
        free["pToolCallStart"], free["text"][:200]))
    print("nudged     tool=%s n=%d p(tc)=%.3g: %r" % (
        nudged["usedTool"], nudged["tokenCount"], nudged["pToolCallStart"], nudged["text"][:200]))
    print("letters    %d->%d tool=%s p(tc)=%.3g: %r" % (
        letters["questionTokenCountNormal"], letters["questionTokenCountLetters"],
        lt["usedTool"], lt["pToolCallStart"], lt["text"][:200]))
    for s in sentences:
        print("sentence   rank %3d p=%.3g %-14r top1 %r  [%s]" % (
            s["truthRank"], s["truthProb"], s["truth"], s["top"][0]["text"], s["source"]))
    for t in think_like:
        print("think      %d %-7s %r rank %d p=%.3g  ctx=%r" % (
            t["pos"], t["kind"], t["truth"], t["truthRank"], t["truthProb"], t["context"]))
    print("timing     sampling %.1fs, total %.1fs" % (t_temp, time.time() - t_start))
    print("wrote      %s (%.1f KB)" % (out_path, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    main()
