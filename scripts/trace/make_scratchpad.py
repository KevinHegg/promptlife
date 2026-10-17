#!/usr/bin/env python3
"""
Prompt Life trace pipeline, side line "Scratchpad" -> src/data/traces/scratchpad.json

A reasoning model writes out its working ("thinking tokens") before it answers. The hero model
has no thinking mode, so this uses Qwen/Qwen3-0.6B, a newer small open model with a switch for
it. Same page as our ride (system prompt + Grandma's card + the question), no calculator, so the
model has to do the arithmetic itself. The true answer is 2.25 x 30 / 8 = 8.4375 cups.

  off        thinking switched off (enable_thinking=False), Qwen's recommended sampling for that
             mode: temperature 0.7, top-p 0.8, top-k 20
  budget-N   thinking on, but cut off after N thinking tokens: the script writes "</think>" for
             the model and lets it answer (a "thinking budget"). N in BUDGETS.
  on         thinking on, unlimited (up to MAX_THINK): temperature 0.6, top-p 0.95, top-k 20

Each condition runs SAMPLES times, seeds 0..SAMPLES-1. correct = the answer's last number is
within 0.05 of 8.4375 (8.4, 8.44, 8.4375 all count), or it writes 8 7/16.

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_scratchpad.py
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
from make_trace import RAG_HEADER, SCENARIO  # noqa: E402
from screen import hits as screen_hits  # noqa: E402

hf_logging.set_verbosity_error()

MODEL = "Qwen/Qwen3-0.6B"
TRUTH = 8.4375
BUDGETS = [64, 256]
MAX_THINK = 3000
MAX_ANSWER = 400
SAMPLING_ON = {"temperature": 0.6, "top_p": 0.95, "top_k": 20}
SAMPLING_OFF = {"temperature": 0.7, "top_p": 0.8, "top_k": 20}
NUM = r"\d+(?:\.\d+)?"


def final_number(text):
    t = text.replace(",", "")
    if re.search(r"\b8\s+7/16\b", t):
        return "8 7/16"
    nums = re.findall(NUM, re.sub(r"\\frac\{(\d+)\}\{(\d+)\}", r"\1/\2", t))
    return nums[-1] if nums else None


def is_correct(text):
    n = final_number(text)
    if n == "8 7/16":
        return True
    try:
        return n is not None and abs(float(n) - TRUTH) <= 0.05
    except ValueError:
        return False


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default=None)
    ap.add_argument("--samples", type=int, default=10)
    args = ap.parse_args()
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "scratchpad.json")
    t0 = time.time()

    tok = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForCausalLM.from_pretrained(MODEL, torch_dtype=torch.float32).eval()
    im_end = tok.convert_tokens_to_ids("<|im_end|>")
    eot = tok.convert_tokens_to_ids("<|endoftext|>")
    end_think = tok.convert_tokens_to_ids("</think>")
    stops = [im_end, eot]

    system = SCENARIO["system"] + RAG_HEADER + "\n".join(SCENARIO["passages"])
    msgs = [{"role": "system", "content": system}, {"role": "user", "content": SCENARIO["user"]}]

    def prompt(think):
        text = tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True, enable_thinking=think)
        return tok(text, add_special_tokens=False, return_tensors="pt").input_ids

    def gen(ids, n, stop, sampling, seed):
        torch.manual_seed(seed)
        with torch.no_grad():
            out = model.generate(ids, max_new_tokens=n, do_sample=True, eos_token_id=stop, pad_token_id=eot, **sampling)
        return out[0, ids.shape[1]:].tolist()

    def run(cond, seed):
        if cond == "off":
            ids = prompt(False)
            new = gen(ids, MAX_ANSWER, stops, SAMPLING_OFF, seed)
            stopped = bool(new) and new[-1] in stops
            body = new[:-1] if stopped else new
            # The template opens an empty <think></think> block when thinking is off.
            answer = tok.decode(body, skip_special_tokens=True).strip()
            return {"thinking": "", "thinkingTokens": 0, "answer": answer, "answerTokens": len(body), "stoppedNaturally": stopped, "cutShort": False}
        ids = prompt(True)
        budget = MAX_THINK if cond == "on" else int(cond.split("-")[1])
        think = gen(ids, budget, [end_think] + stops, SAMPLING_ON, seed)
        finished = bool(think) and think[-1] == end_think
        think_body = think[:-1] if finished else think
        # Close the thinking ourselves if the budget ran out, then let it answer.
        tail = tok("</think>\n\n", add_special_tokens=False).input_ids
        follow = torch.cat([ids, torch.tensor([think_body + tail])], dim=1)
        ans = gen(follow, MAX_ANSWER, stops, SAMPLING_ON, seed + 7)
        stopped = bool(ans) and ans[-1] in stops
        body = ans[:-1] if stopped else ans
        thinking = tok.decode(think_body, skip_special_tokens=True).replace("<think>", "").strip()
        return {"thinking": thinking, "thinkingTokens": len(think_body), "answer": tok.decode(body, skip_special_tokens=True).strip(),
                "answerTokens": len(body), "stoppedNaturally": stopped, "cutShort": not finished}

    conds = ["off"] + ["budget-%d" % b for b in BUDGETS] + ["on"]
    runs, redraws = [], []
    for cond in conds:
        for k in range(args.samples):
            seed = k
            r = run(cond, seed)
            while screen_hits(r["thinking"] + " " + r["answer"]):
                redraws.append((cond, seed))
                seed += 1000
                r = run(cond, seed)
            r.update({"condition": cond, "seed": seed, "finalNumber": final_number(r["answer"]), "correct": is_correct(r["answer"])})
            runs.append(r)
            print("%-11s seed %4d think %4d answer %3d correct %-5s final %s" % (
                cond, seed, r["thinkingTokens"], r["answerTokens"], r["correct"], r["finalNumber"]), flush=True)

    notes = [
        "Same page as the hero run (system message %r + %r + both passages, the question), no tools, "
        "rendered by %s's chat template with enable_thinking as stated. off: sampled with %s, max %d "
        "tokens. on / budget-N: thinking sampled with %s until </think> or the budget (on: %d), then, if "
        "the budget ran out, the script appends '</think>\\n\\n' itself (cutShort); the answer is then "
        "sampled with the same settings, seed + 7, max %d tokens. thinkingTokens / answerTokens exclude "
        "the stop token. finalNumber = the last number in the answer (LaTeX \\frac{a}{b} read as a/b); "
        "correct = within 0.05 of %s, or '8 7/16'. Every text was screened with screen.py; %s"
        % (SCENARIO["system"], RAG_HEADER, MODEL, json.dumps(SAMPLING_OFF), MAX_ANSWER, json.dumps(SAMPLING_ON),
           MAX_THINK, MAX_ANSWER, TRUTH, ("redraws: %s" % redraws) if redraws else "nothing was redrawn."),
    ]
    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "model": {"id": MODEL},
        "truth": TRUTH,
        "conditions": conds,
        "runs": runs,
        "notes": notes,
    }
    with open(out_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    for cond in conds:
        rs = [r for r in runs if r["condition"] == cond]
        print("%-11s correct %d/%d  mean thinking %.0f  mean answer %.0f" % (
            cond, sum(r["correct"] for r in rs), len(rs), sum(r["thinkingTokens"] for r in rs) / len(rs),
            sum(r["answerTokens"] for r in rs) / len(rs)))
    print("wrote %s (%.1f KB) in %.0fs" % (out_path, os.path.getsize(out_path) / 1024, time.time() - t0))


if __name__ == "__main__":
    main()
