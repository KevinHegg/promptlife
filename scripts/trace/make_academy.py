#!/usr/bin/env python3
"""
Prompt Life trace pipeline, side line "Academy" (A2, fine-tuning) -> src/data/traces/academy.json

The hero first turn (system prompt + card + question, rendered by the chat template with the
generation prompt) goes to two models with the same design and size:

  base      Qwen/Qwen2.5-0.5B            pretrained only
  instruct  Qwen/Qwen2.5-0.5B-Instruct   the same, then fine-tuned to be an assistant (our ride)

Two conditions each, both pure greedy over the real vocabulary rows:

  tools     the calculator in tools= (exactly the hero context). firstTop = the top 5 first tokens,
            toolCallProb = P(<tool_call>) as the first token.
  plain     no tools. The model answers in words. text = up to MAX_NEW tokens; the base model never
            emits a stop token here, so the script also finds where its answer ends and where it
            starts rewriting the page (answerEnd, rewroteFrom) and the user question it invents
            (inventedQuestion), and measures P(<|im_end|>) right after the answer's last sentence
            (stopProbAfterAnswer). For the instruct model that is the point where it really stopped.

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_academy.py
"""

import argparse
import datetime as _dt
import json
import os
import re
import sys
import warnings

warnings.filterwarnings("ignore")

import torch  # noqa: E402
from transformers import AutoModelForCausalLM, AutoTokenizer  # noqa: E402
from transformers.utils import logging as hf_logging  # noqa: E402

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_trace import RAG_HEADER, SCENARIO, TOOLS  # noqa: E402
from screen import hits as screen_hits  # noqa: E402

hf_logging.set_verbosity_error()

MODELS = [("base", "Qwen/Qwen2.5-0.5B"), ("instruct", "Qwen/Qwen2.5-0.5B-Instruct")]
MAX_NEW = 260


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "academy.json")

    system = SCENARIO["system"] + RAG_HEADER + "\n".join(SCENARIO["passages"])
    msgs = [{"role": "system", "content": system}, {"role": "user", "content": SCENARIO["user"]}]
    runs, notes = [], []
    for key, mid in MODELS:
        tok = AutoTokenizer.from_pretrained(mid)
        model = AutoModelForCausalLM.from_pretrained(mid, torch_dtype=torch.float32).eval()
        n_real = len(tok)
        eot = tok.convert_tokens_to_ids("<|endoftext|>")
        im_end = tok.convert_tokens_to_ids("<|im_end|>")
        tool_call = tok.convert_tokens_to_ids("<tool_call>")

        def ids_for(tools):
            text = tok.apply_chat_template(msgs, tools=tools, tokenize=False, add_generation_prompt=True)
            return tok(text, add_special_tokens=False)["input_ids"]

        def probs(ids):
            with torch.no_grad():
                row = model(torch.tensor([ids])).logits[0, -1, :n_real].double()
            return torch.softmax(row, -1)

        def greedy(ids):
            """Argmax with a KV cache; stops only at <|endoftext|> or <|im_end|>."""
            past, out, inp = None, [], torch.tensor([ids])
            with torch.no_grad():
                for _ in range(MAX_NEW):
                    o = model(inp, past_key_values=past, use_cache=True)
                    past = o.past_key_values
                    nxt = int(torch.argmax(o.logits[0, -1, :n_real]))
                    out.append(nxt)
                    if nxt in (eot, im_end):
                        break
                    inp = torch.tensor([[nxt]])
            return out

        def top(p, k=5):
            v, ix = torch.topk(p, k)
            return [{"text": tok.decode([int(i)]), "prob": round(float(x), 4)} for x, i in zip(v, ix)]

        for cond, tools in (("tools", TOOLS), ("plain", None)):
            ids = ids_for(tools)
            p0 = probs(ids)
            gen = greedy(ids)
            stopped = bool(gen) and gen[-1] in (eot, im_end)
            body = gen[:-1] if stopped else gen
            text = tok.decode(body, skip_special_tokens=False)
            rec = {"model": key, "modelId": mid, "condition": cond, "firstTop": top(p0),
                   "toolCallProb": round(float(p0[tool_call]), 6), "text": text,
                   "stoppedNaturally": stopped, "tokenCount": len(body)}
            if cond == "plain":
                # Where the answer ends: the end of its last sentence before the model starts
                # writing anything that isn't the answer (the page's own words, or junk).
                rewrite = text.find(SCENARIO["system"])
                answer = text if rewrite < 0 else text[:rewrite]
                m = list(re.finditer(r"[.!?](?=\s|$)", answer))
                end = m[-1].end() if m else len(answer)
                rec["answerEnd"] = end
                rec["rewroteFrom"] = rewrite if rewrite >= 0 else None
                q = re.search(r"user\n(.+?\?)", text[rewrite:]) if rewrite >= 0 else None
                rec["inventedQuestion"] = q.group(1) if q else None
                # P(<|im_end|>) right after the answer's last sentence.
                prefix = tok(text[:end], add_special_tokens=False)["input_ids"]
                rec["stopProbAfterAnswer"] = round(float(probs(ids + prefix)[im_end]), 6)
            if screen_hits(text):
                rec["flagged"] = True
            runs.append(rec)
            print("%-8s %-5s P(<tool_call>)=%.4f stop=%s n=%d %r" % (
                key, cond, rec["toolCallProb"], stopped, len(body), text[:120]))
            if cond == "plain":
                print("         answerEnd=%d rewroteFrom=%s invented=%r P(<|im_end|>)=%.6f" % (
                    rec["answerEnd"], rec["rewroteFrom"], rec["inventedQuestion"], rec["stopProbAfterAnswer"]))
        del model

    notes.append(
        "Both models get the identical hero first turn (system message %r + %r + both passages; the "
        "question), rendered by each model's own chat template with the generation prompt (the two "
        "templates are the same). tools: the calculator in tools=. plain: no tools=. Pure greedy over "
        "the real vocabulary rows, at most %d new tokens, stopping only at <|endoftext|> or "
        "<|im_end|>. text keeps special tokens as the tokenizer decodes them. answerEnd: the end of "
        "the last sentence before rewroteFrom (the index where the model starts writing the system "
        "prompt again), or before the end of text. stopProbAfterAnswer: P(<|im_end|>) as the next "
        "token after the context plus text[:answerEnd], re-tokenized." % (SCENARIO["system"], RAG_HEADER, MAX_NEW))
    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "models": [{"key": k, "id": m} for k, m in MODELS],
        "runs": runs,
        "notes": notes,
    }
    with open(out_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print("wrote %s (%.1f KB)" % (out_path, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    main()
