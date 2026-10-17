#!/usr/bin/env python3
"""
Prompt Life trace pipeline, side lines "Library" and "Workshop" -> src/data/traces/library.json

Library (retrieval): Grandma's recipe box is 13 short chunks (one per card front, plus the
biscuit card's back). A small sentence-embedding model (the "retriever",
sentence-transformers/all-MiniLM-L6-v2) scores every chunk against two questions:

  lookup          "How much flour do Grandma's biscuits need?"   one card holds the answer
  all-buttermilk  "Which of Grandma's recipes use buttermilk?"   the answer needs every card

The generator (Qwen2.5-0.5B-Instruct, the hero model) then answers with only the top-K chunks
pasted into its system message, for K in 1, 2, 3, 5, 8, 13:

  lookup-k{K}      greedy answer + teacher-forced P("2") after "Grandma's biscuits need "
  buttermilk-k{K}  greedy answer + which recipes it names (correct / missed / wrong)
  buttermilk-tool  no chunks pasted; a search_recipe_box tool instead (the call is forced,
                   the tool result is computed over all 13 chunks), then the greedy reply;
                   plus the model's own unforced P(<tool_call>) as its first token

Workshop (tools): two runs of the hero scenario
  own-request      the calculator gets the model's OWN greedy request (30 * 6), computes it
                   exactly (180), and the model replies
  no-calculator    the hero context with no calculator tool at all; the model must do the
                   arithmetic itself

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_library.py
  ... --out /tmp/library.json
"""

import argparse
import ast
import datetime as _dt
import json
import operator
import os
import re
import sys
import time
import warnings

warnings.filterwarnings("ignore")

import torch  # noqa: E402
import torch.nn.functional as F  # noqa: E402
from transformers import AutoModel, AutoModelForCausalLM, AutoTokenizer  # noqa: E402
from transformers.utils import logging as hf_logging  # noqa: E402

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_phase2 import top_text_prob  # noqa: E402
from make_trace import RAG_HEADER, SCENARIO, TOOLS, build_messages, dec, r4  # noqa: E402
from screen import app_hits, hits as screen_hits  # noqa: E402

hf_logging.set_verbosity_error()

GENERATOR = "Qwen/Qwen2.5-0.5B-Instruct"
RETRIEVER = "sentence-transformers/all-MiniLM-L6-v2"
RETRIEVER_MAX_LEN = 256          # sentence-transformers' max_seq_length for this model

# --------------------------------------------------------------------------------------
# The recipe box: (id, short card name, text). Chunks 1 and 2 must be byte-identical to the
# hero run's two passages (checked below).
# --------------------------------------------------------------------------------------
CHUNKS = [
    ("biscuits-front", "Buttermilk biscuits",
     "Recipe card: Grandma's buttermilk biscuits. Serves 8. 2 1/4 cups flour, 1 tablespoon "
     "baking powder, 1/2 teaspoon salt, 6 tablespoons butter, 1 cup buttermilk."),
    ("biscuits-back", "Biscuits (back)",
     "Back of the card: Two biscuits per person. Bake at 425°F for 12 minutes."),
    ("pancakes", "Buttermilk pancakes",
     "Recipe card: Grandma's buttermilk pancakes. Serves 4. 1 1/2 cups flour, 2 tablespoons "
     "sugar, 1 teaspoon baking soda, 1 1/4 cups buttermilk, 1 egg."),
    ("cornbread", "Cornbread",
     "Recipe card: Grandma's cornbread. Serves 9. 1 cup cornmeal, 1 cup flour, 1/4 cup sugar, "
     "1 cup buttermilk, 2 eggs."),
    ("pie-crust", "Pie crust",
     "Recipe card: Grandma's pie crust. Makes 2 crusts. 2 1/2 cups flour, 1 cup cold butter, "
     "1 teaspoon salt, 6 tablespoons ice water."),
    ("banana-bread", "Banana bread",
     "Recipe card: Grandma's banana bread. Serves 10. 1 3/4 cups flour, 3 ripe bananas, 1/2 cup "
     "butter, 3/4 cup sugar, 1 teaspoon baking soda."),
    ("buttermilk-pie", "Buttermilk pie",
     "Recipe card: Grandma's buttermilk pie. Serves 8. 1 cup buttermilk, 1 1/2 cups sugar, 3 "
     "eggs, 3 tablespoons flour, 1/2 cup butter."),
    ("fried-chicken", "Fried chicken",
     "Recipe card: Grandma's fried chicken. Serves 6. 8 chicken pieces soaked in 2 cups "
     "buttermilk, 2 cups flour, 2 teaspoons paprika, oil for frying."),
    ("coleslaw", "Coleslaw",
     "Recipe card: Grandma's coleslaw. Serves 8. 1 head cabbage, 2 carrots, 1/2 cup buttermilk, "
     "1/4 cup mayonnaise, 1 tablespoon vinegar."),
    ("sugar-cookies", "Sugar cookies",
     "Recipe card: Grandma's sugar cookies. Makes 36. 3 cups flour, 1 cup butter, 1 cup sugar, "
     "1 egg, 1 teaspoon vanilla."),
    ("gravy", "Chicken gravy",
     "Recipe card: Grandma's chicken gravy. Serves 6. 3 tablespoons flour, 3 tablespoons "
     "butter, 2 cups chicken broth, salt and pepper."),
    ("lemonade", "Lemonade",
     "Recipe card: Grandma's lemonade. Serves 8. 6 lemons, 1 cup sugar, 6 cups cold water."),
    ("pot-roast", "Pot roast",
     "Recipe card: Grandma's pot roast. Serves 6. 3 pounds beef chuck, 4 carrots, 3 potatoes, "
     "1 onion, 2 cups beef broth."),
]
# Chunks that are part of another chunk's recipe (the back of the biscuit card).
RECIPE_OF = {"biscuits-back": "biscuits-front"}

# Recipe names in a generated answer: recipe chunk id -> case-insensitive regex. A pattern
# names the dish (not an ingredient). 'pie' / 'chicken' / 'bread' / 'roast' alone are
# ambiguous between two cards, so each is only counted when nothing else claims it.
NAME_PATTERNS = [
    ("biscuits-front", r"\bbiscuits?\b"),
    ("pancakes", r"\bpancakes?\b"),
    ("cornbread", r"\bcorn ?bread\b"),
    ("pie-crust", r"\bpie ?crusts?\b|\bcrusts?\b"),
    ("banana-bread", r"\bbanana ?bread\b"),
    ("buttermilk-pie", r"\bbuttermilk pies?\b|\bpies?\b(?! ?crusts?\b)"),
    ("fried-chicken", r"\bfried chicken\b|\bchicken\b(?! (?:gravy|broth)\b)"),
    ("coleslaw", r"\bcole ?slaw\b"),
    ("sugar-cookies", r"\bcookies?\b"),
    ("gravy", r"\bgravy\b"),
    ("lemonade", r"\blemonade\b"),
    ("pot-roast", r"\bpot ?roast\b"),
]

FLOUR_RE = re.compile(r"(\d+ \d+/\d+|\d+/\d+|\d+) (cups?|tablespoons?|teaspoons?) flour\b")

QUESTIONS = [
    ("lookup", "How much flour do Grandma's biscuits need?"),
    ("all-buttermilk", "Which of Grandma's recipes use buttermilk?"),
]
KS = [1, 2, 3, 5, 8, 13]

LOOKUP_MAX_NEW = 60
ALL_MAX_NEW = 100
TOOL_MAX_NEW = 100
OWN_MAX_NEW = 60
NOCALC_MAX_NEW = 120
FREE_TOOL_TURN_MAX_NEW = 60      # diagnostic: the tool run's unforced first turn
UNTIL_STOP_MAX_NEW = 400         # diagnostic: a capped run, continued until it stops itself
NEAR_TIE = 0.01                  # top-1 minus top-2 logit gap that counts as a near-tie

ANSWER_PREFIX = "Grandma's biscuits need "
RIGHT_AMOUNT = "2 1/4"

SEARCH_TOOL_NAME = "search_recipe_box"
SEARCH_TOOLS = [{
    "type": "function",
    "function": {
        "name": SEARCH_TOOL_NAME,
        "description": "Searches every card in your recipe box for a word and returns the name "
                       "of each card that contains it.",
        "parameters": {
            "type": "object",
            "properties": {"word": {"type": "string"}},
            "required": ["word"],
        },
    },
}]
SEARCH_WORD = "buttermilk"


# --------------------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------------------
_OPS = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul,
        ast.Div: operator.truediv}


def calc(expr):
    """The calculator: + - * / and parentheses on plain numbers, evaluated by Python."""
    def ev(n):
        if isinstance(n, ast.Expression):
            return ev(n.body)
        if isinstance(n, ast.Constant) and isinstance(n.value, (int, float)):
            return n.value
        if isinstance(n, ast.BinOp) and type(n.op) in _OPS:
            return _OPS[type(n.op)](ev(n.left), ev(n.right))
        if isinstance(n, ast.UnaryOp) and isinstance(n.op, ast.USub):
            return -ev(n.operand)
        raise ValueError("unsupported expression: %r" % expr)
    return str(ev(ast.parse(expr, mode="eval")))


def search_box(word):
    """The search_recipe_box tool over ALL chunks: one name per matching recipe, box order."""
    names, seen = [], set()
    for cid, card, text in CHUNKS:
        sub = word.lower() in text.lower()
        whole = re.search(r"\b%s\b" % re.escape(word), text, re.I) is not None
        if sub != whole:
            sys.exit("substring and whole-word match disagree for %r on %s" % (word, cid))
        if sub:
            rid = RECIPE_OF.get(cid, cid)
            if rid not in seen:
                seen.add(rid)
                names.append(next(c for i, c, _ in CHUNKS if i == rid))
    return names


def named_recipes(text):
    """Recipe chunk ids named in `text`, in order of first mention (see NAME_PATTERNS)."""
    spans = []                                   # (start, end, id)
    for rid, pat in NAME_PATTERNS:
        for m in re.finditer(pat, text, re.I):
            spans.append((m.start(), m.end(), rid))
    # A shorter match inside a longer one (e.g. 'pie' inside 'pie crust') is dropped.
    keep = [s for s in spans if not any(o != s and o[0] <= s[0] and s[1] <= o[1] and
                                        (o[1] - o[0]) > (s[1] - s[0]) for o in spans)]
    out = []
    for _, _, rid in sorted(keep):
        if rid not in out:
            out.append(rid)
    return out


def final_number(text):
    nums = re.findall(r"\d+(?:\.\d+)?", text)
    return nums[-1] if nums else None


CUPS_RE = re.compile(r"(\d+(?:\.\d+)?(?: \d+/\d+)?|\d+/\d+)\s+cups?\b")


def stated_cups(text):
    """The last amount written directly before 'cup' / 'cups' (the amount of flour stated)."""
    nums = CUPS_RE.findall(text)
    return nums[-1] if nums else None


class Generator:
    def __init__(self, model, tok):
        self.model, self.tok = model, tok
        self.n_real = len(tok)
        self.stop_ids = {tok.convert_tokens_to_ids("<|im_end|>"),
                         tok.convert_tokens_to_ids("<|endoftext|>")}

    def ids(self, msgs, tools=None, add_generation_prompt=True):
        text = self.tok.apply_chat_template(msgs, tools=tools, tokenize=False,
                                            add_generation_prompt=add_generation_prompt)
        ids = self.tok(text, add_special_tokens=False)["input_ids"]
        templ = self.tok.apply_chat_template(msgs, tools=tools, tokenize=True,
                                             add_generation_prompt=add_generation_prompt)
        if list(templ) != list(ids):
            sys.exit("re-tokenizing the rendered text differs from apply_chat_template ids")
        return text, list(ids)

    def greedy(self, prefix_ids, max_new):
        """Pure argmax over the real vocab rows, with a KV cache. Returns (ids without the
        stop token, stopped naturally, top-1 minus top-2 score gap at every step)."""
        past, out, gap = None, [], []
        inp = torch.tensor([prefix_ids])
        with torch.no_grad():
            for _ in range(max_new):
                o = self.model(inp, past_key_values=past, use_cache=True)
                past = o.past_key_values
                row = o.logits[0, -1, :self.n_real].double()
                v, ix = torch.topk(row, 2)
                gap.append(float(v[0] - v[1]))
                nxt = int(ix[0])
                if nxt in self.stop_ids:
                    return out, True, gap
                out.append(nxt)
                inp = torch.tensor([[nxt]])
        return out, False, gap

    def last_row(self, ids):
        with torch.no_grad():
            return self.model(torch.tensor([ids]), use_cache=False).logits[0, -1, :self.n_real] \
                .double()


# --------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default=None, help="default: <repo>/src/data/traces/library.json")
    ap.add_argument("--phase1", default=None,
                    help="phase1.json holding the model's free first turn "
                         "(default: <repo>/src/data/traces/phase1.json)")
    args = ap.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "library.json")
    p1_path = args.phase1 or os.path.join(repo_root, "src", "data", "traces", "phase1.json")
    t_start = time.time()
    notes = []

    # ---- chunks -----------------------------------------------------------------------
    for k in range(2):
        if CHUNKS[k][2] != SCENARIO["passages"][k] or \
                CHUNKS[k][2].encode("utf-8") != SCENARIO["passages"][k].encode("utf-8"):
            sys.exit("chunk %s is not byte-identical to hero passage %d" % (CHUNKS[k][0], k + 1))
    chunks = []
    for cid, card, text in CHUNKS:
        m = FLOUR_RE.search(text)
        chunks.append({"id": cid, "card": card, "text": text,
                       "buttermilk": "buttermilk" in text.lower(),
                       "flour": "%s %s" % (m.group(1), m.group(2)) if m else None})
    by_id = {c["id"]: c for c in chunks}
    truth_names = search_box(SEARCH_WORD)
    truth_ids = []
    for c in chunks:
        if c["buttermilk"] and RECIPE_OF.get(c["id"], c["id"]) not in truth_ids:
            truth_ids.append(RECIPE_OF.get(c["id"], c["id"]))
    if [by_id[i]["card"] for i in truth_ids] != truth_names or len(truth_ids) != 6:
        sys.exit("buttermilk truth mismatch: %s vs %s" % (truth_ids, truth_names))
    if by_id["biscuits-front"]["flour"] != "2 1/4 cups":
        sys.exit("biscuit flour parse failed")
    # The parser must find exactly each card's own recipe in its own name.
    for cid, card, _ in CHUNKS:
        rid = RECIPE_OF.get(cid, cid)
        if cid not in RECIPE_OF and named_recipes(card) != [rid]:
            sys.exit("name parser: %r -> %s" % (card, named_recipes(card)))

    # ---- retriever --------------------------------------------------------------------
    t0 = time.time()
    rtok = AutoTokenizer.from_pretrained(RETRIEVER)
    rmod = AutoModel.from_pretrained(RETRIEVER, use_safetensors=True).eval()
    r_commit = getattr(rmod.config, "_commit_hash", None)
    texts = [c["text"] for c in chunks] + [q for _, q in QUESTIONS]
    enc = rtok(texts, padding=True, truncation=True, max_length=RETRIEVER_MAX_LEN,
               return_tensors="pt")
    lens = enc["attention_mask"].sum(1).tolist()
    if max(lens) >= RETRIEVER_MAX_LEN:
        sys.exit("a retriever input reached the truncation length")
    with torch.no_grad():
        tokvec = rmod(**enc).last_hidden_state                      # [N, T, 384]
    mask = enc["attention_mask"].unsqueeze(-1).float()
    pooled = (tokvec * mask).sum(1) / mask.sum(1).clamp(min=1e-9)
    unit = F.normalize(pooled, p=2, dim=1).double()
    dims = int(unit.shape[1])
    # Check: each text embedded on its own (no padding) gives the same vector.
    solo_diff = 0.0
    for i, t in enumerate(texts):
        e1 = rtok([t], truncation=True, max_length=RETRIEVER_MAX_LEN, return_tensors="pt")
        with torch.no_grad():
            h = rmod(**e1).last_hidden_state[0].mean(0, keepdim=True)
        solo_diff = max(solo_diff, float((F.normalize(h, dim=1).double()[0] - unit[i]).abs().max()))
    t_retr = time.time() - t0
    C = unit[:len(chunks)]
    questions, ranking = [], {}
    for qi, (qid, qtext) in enumerate(QUESTIONS):
        cos = (C @ unit[len(chunks) + qi]).tolist()
        order = sorted(range(len(chunks)), key=lambda j: (-cos[j], j))
        ranking[qid] = [chunks[j]["id"] for j in order]
        truth = ({"amount": by_id["biscuits-front"]["flour"]} if qid == "lookup"
                 else {"recipes": truth_names})
        questions.append({"id": qid, "text": qtext, "truth": truth,
                          "scores": [{"chunk": chunks[j]["id"], "cos": round(cos[j], 3)}
                                     for j in order]})
        rounded = [round(cos[j], 3) for j in order]
        if len(set(rounded)) != len(rounded):
            notes.append("%s: some cosines tie at 3 decimals; scores are sorted by the unrounded "
                         "value (then box order)." % qid)

    # ---- generator --------------------------------------------------------------------
    t0 = time.time()
    tok = AutoTokenizer.from_pretrained(GENERATOR)
    model = AutoModelForCausalLM.from_pretrained(GENERATOR, torch_dtype=torch.float32).eval()
    g_commit = getattr(model.config, "_commit_hash", None)
    gen = Generator(model, tok)
    n_real = gen.n_real
    t_load = time.time() - t0
    tc_id = tok.convert_tokens_to_ids("<tool_call>")
    runs, flagged, ctx_len = [], [], {}
    min_gap = [float("inf"), None]
    near_ties = []                  # (run id, new-token number, gap, chosen, runner-up)

    def check_steps(rid, ctx, g, natural, gap, cap):
        """Track the smallest gap; re-check every near-tie step without the KV cache."""
        for k, d in enumerate(gap):
            if d < min_gap[0]:
                min_gap[:] = [d, "%s new token %d" % (rid, k + 1)]
            if d >= NEAR_TIE or k < cap:
                continue
            row = gen.last_row(ctx + g[:k])
            v, ix = torch.topk(row, 2)
            want = g[k] if k < len(g) else None
            if (want is None and int(ix[0]) not in gen.stop_ids) or \
                    (want is not None and int(ix[0]) != want):
                sys.exit("%s step %d: recomputing without the KV cache picks another token"
                         % (rid, k))
            near_ties.append((rid, k + 1, float(v[0] - v[1]), dec(tok, ix[0]), dec(tok, ix[1])))

    def finish(rec, ctx, g, natural, gap, shown_extra=()):
        rec["text"] = tok.decode(g, skip_special_tokens=True)
        rec["stoppedNaturally"] = natural
        rec["tokenCount"] = len(g)
        check_steps(rec["id"], ctx, g, natural, gap, 0)
        shown = [rec["text"]] + list(shown_extra)
        if not natural:
            # Diagnostic: the same greedy run, allowed to continue until it stops by itself.
            g2, nat2, gap2 = gen.greedy(ctx, UNTIL_STOP_MAX_NEW)
            if g2[:len(g)] != g:
                sys.exit("%s: the longer greedy run does not start with the capped one" % rec["id"])
            check_steps(rec["id"] + " untilStop", ctx, g2, nat2, gap2, len(g))
            rec["untilStop"] = {"text": tok.decode(g2, skip_special_tokens=True),
                                "stoppedNaturally": nat2, "tokenCount": len(g2)}
            shown.append(rec["untilStop"]["text"])
        bad = sorted({b for s in shown for b in screen_hits(s)})
        if bad:
            rec["flagged"] = True
            flagged.append((rec["id"], bad, sorted({b for s in shown for b in app_hits(s)}),
                            rec["text"]))
        runs.append(rec)
        print("  ran %-17s n=%3d %s  %r" % (rec["id"], len(g), "stop" if natural else "cut ",
                                            rec["text"][:90]), flush=True)

    def library_msgs(qtext, ids_in):
        system = SCENARIO["system"] + RAG_HEADER + "\n".join(by_id[i]["text"] for i in ids_in)
        return [{"role": "system", "content": system}, {"role": "user", "content": qtext}]

    t0 = time.time()
    # (1) lookup-k{K}
    prefix_ids = tok.encode(ANSWER_PREFIX, add_special_tokens=False)
    full_ids = tok.encode(ANSWER_PREFIX + RIGHT_AMOUNT + " cups", add_special_tokens=False)
    two_id = full_ids[len(prefix_ids)]
    if full_ids[:len(prefix_ids)] != prefix_ids or dec(tok, two_id) != "2":
        sys.exit("forced prefix does not tokenize as a prefix of the right answer")
    hero_k2_same = None
    for K in KS:
        inc = ranking["lookup"][:K]
        msgs = library_msgs(QUESTIONS[0][1], inc)
        if K == 2:
            hero_k2_same = msgs[0]["content"] == build_messages(SCENARIO)[0]["content"]
        _, ids = gen.ids(msgs)
        ctx_len["lookup-k%d" % K] = len(ids)
        g, natural, gap = gen.greedy(ids, LOOKUP_MAX_NEW)
        forced_text = tok.decode(ids + prefix_ids)
        if tok(forced_text, add_special_tokens=False)["input_ids"] != ids + prefix_ids:
            sys.exit("forced context does not re-tokenize to itself")
        row = gen.last_row(ids + prefix_ids)
        p = torch.softmax(row, -1)
        ra = {"prob": r4(p[two_id]), "top": top_text_prob(tok, row, 3)}
        rec = {"id": "lookup-k%d" % K, "kind": "lookup", "k": K, "included": inc,
               "contextTokens": len(ids)}
        rec["rightAmount"] = ra
        finish(rec, ids, g, natural, gap, [c["text"] for c in ra["top"]])

    # (2) buttermilk-k{K}
    truth_set = set(truth_ids)
    for K in KS:
        inc = ranking["all-buttermilk"][:K]
        _, ids = gen.ids(library_msgs(QUESTIONS[1][1], inc))
        ctx_len["buttermilk-k%d" % K] = len(ids)
        g, natural, gap = gen.greedy(ids, ALL_MAX_NEW)
        rec = {"id": "buttermilk-k%d" % K, "kind": "all", "k": K, "included": inc,
               "contextTokens": len(ids)}
        finish(rec, ids, g, natural, gap)
        named = named_recipes(rec["text"])
        rec["named"] = named
        rec["correct"] = sum(1 for r in named if r in truth_set)
        rec["missed"] = len(truth_set) - rec["correct"]
        rec["wrong"] = sum(1 for r in named if r not in truth_set)

    # (3) buttermilk-tool
    sys_only = {"role": "system", "content": SCENARIO["system"]}
    user_q = {"role": "user", "content": QUESTIONS[1][1]}
    _, ids_q = gen.ids([sys_only, user_q], tools=SEARCH_TOOLS)
    row = gen.last_row(ids_q)
    tool_choice = {"prob": r4(torch.softmax(row, -1)[tc_id]), "top": top_text_prob(tok, row, 3)}
    tc_rank = int((row > row[tc_id]).sum()) + 1
    g_free, _, _ = gen.greedy(ids_q, FREE_TOOL_TURN_MAX_NEW)
    free_tool_turn = tok.decode(g_free, skip_special_tokens=False)
    tool_request = {"name": SEARCH_TOOL_NAME, "arguments": {"word": SEARCH_WORD}}
    tool_result = json.dumps(truth_names, ensure_ascii=False)
    tmsgs = [sys_only, user_q,
             {"role": "assistant", "content": "",
              "tool_calls": [{"type": "function", "function": tool_request}]},
             {"role": "tool", "name": SEARCH_TOOL_NAME, "content": tool_result}]
    ttext, tids = gen.ids(tmsgs, tools=SEARCH_TOOLS)
    if json.dumps(tool_request["arguments"]) not in ttext or tool_result not in ttext:
        sys.exit("the rendered tool conversation is missing the call or the result")
    ctx_len["buttermilk-tool"] = len(tids)
    g, natural, gap = gen.greedy(tids, TOOL_MAX_NEW)
    rec = {"id": "buttermilk-tool", "kind": "tool", "contextTokens": len(tids),
           "toolChoice": tool_choice, "toolRequest": SEARCH_WORD, "toolResult": tool_result}
    finish(rec, tids, g, natural, gap,
           [c["text"] for c in tool_choice["top"]] + [free_tool_turn])
    named = named_recipes(rec["text"])
    rec["named"] = named
    rec["correct"] = sum(1 for r in named if r in truth_set)
    rec["missed"] = len(truth_set) - rec["correct"]
    rec["wrong"] = sum(1 for r in named if r not in truth_set)

    # (4) own-request: the model's own greedy first turn, computed exactly
    with open(p1_path) as f:
        p1_free = json.load(f)["freeFirstTurn"]["text"]
    hero_msgs = build_messages(SCENARIO)
    _, ids_first = gen.ids(hero_msgs[:2], tools=TOOLS)
    g_first, nat_first, _ = gen.greedy(ids_first, 260)
    own_text = tok.decode(g_first, skip_special_tokens=False)
    if own_text != p1_free or not nat_first:
        sys.exit("the free first turn %r differs from phase1.json's %r" % (own_text, p1_free))
    m = re.fullmatch(r'<tool_call>\n(\{.*\})\n</tool_call>', own_text, re.S)
    call = json.loads(m.group(1))
    own_expr = call["arguments"]["expression"]
    if calc(SCENARIO["toolExpression"]) != SCENARIO["toolResult"]:
        sys.exit("calc() does not reproduce the hero's tool result")
    own_result = calc(own_expr)
    sc_own = dict(SCENARIO, toolExpression=own_expr, toolResult=own_result)
    own_msgs = build_messages(sc_own)[:4]
    _, oids = gen.ids(own_msgs, tools=TOOLS)
    # The rendered tool-call turn must be exactly the tokens the model wrote (+ <|im_end|>).
    a = len(ids_first)
    im_end = tok.convert_tokens_to_ids("<|im_end|>")
    if oids[:a] != ids_first or oids[a:a + len(g_first) + 1] != g_first + [im_end]:
        sys.exit("the rendered own-request conversation does not contain the model's own tokens")
    ctx_len["own-request"] = len(oids)
    g, natural, gap = gen.greedy(oids, OWN_MAX_NEW)
    rec = {"id": "own-request", "kind": "workshop", "contextTokens": len(oids),
           "toolRequest": own_expr,
           "toolResult": own_result}
    finish(rec, oids, g, natural, gap)
    rec["finalNumber"] = final_number(rec["text"])
    rec["statedCups"] = stated_cups(rec["text"])

    # (5) no-calculator: hero system + passages + question, no tools
    nmsgs = hero_msgs[:2]
    ntext, nids = gen.ids(nmsgs)
    if "calculator" in ntext or "# Tools" in ntext:
        sys.exit("no-calculator context still mentions a tool")
    ctx_len["no-calculator"] = len(nids)
    g, natural, gap = gen.greedy(nids, NOCALC_MAX_NEW)
    rec = {"id": "no-calculator", "kind": "workshop", "contextTokens": len(nids)}
    finish(rec, nids, g, natural, gap)

    def number_check(r):
        fn = final_number(r["text"])
        r["finalNumber"] = fn
        r["finalNumberCorrect"] = fn is not None and \
            abs(float(fn) - float(SCENARIO["toolResult"])) < 0.05
        r["statedCups"] = stated_cups(r["text"])
    number_check(rec)
    if "untilStop" in rec:
        number_check(rec["untilStop"])
    t_runs = time.time() - t0

    # ---- notes --------------------------------------------------------------------------
    notes.insert(0, (
        "chunks: the recipe box, %d chunks (one per card front, plus the back of the biscuit "
        "card). Chunks 'biscuits-front' and 'biscuits-back' are byte-identical to the hero run's "
        "two passages (make_trace.py SCENARIO['passages'], checked). buttermilk = the text "
        "contains 'buttermilk', case-insensitive (substring and whole-word agree on every "
        "chunk); flour = the amount before the first 'flour' matched by the regex %r, else null."
        % (len(chunks), FLOUR_RE.pattern)))
    notes.append(
        "retriever: %s (revision %s), loaded with transformers AutoModel + AutoTokenizer "
        "(safetensors, float32, CPU). Model-card recipe: tokenize (uncased WordPiece, padding, "
        "truncation at %d tokens; the longest of the 15 texts is %d tokens including [CLS] and "
        "[SEP], so nothing was cut), take last_hidden_state, mean-pool over the attention mask "
        "(padding excluded), L2-normalize to %d numbers. cos = dot product of the two unit "
        "vectors, i.e. cosine similarity. Each question is compared with all %d chunk texts "
        "(the chunk text exactly as pasted, nothing else). scores are sorted by the unrounded "
        "cosine, highest first, and rounded to 3 decimals. Check: embedding each text on its own "
        "(no padding) gives the same unit vectors to %.1e."
        % (RETRIEVER, r_commit, RETRIEVER_MAX_LEN, max(lens), dims, len(chunks), solo_diff))
    notes.append(
        "Context for lookup-k* and buttermilk-k*: Qwen's chat template (tokenizer."
        "apply_chat_template, add_generation_prompt=True, NO tools=, so no '# Tools' block). "
        "System message = %r + %r + the top-K chunk texts joined by '\\n', pasted in RANK ORDER "
        "(highest cosine first, the order in 'included'); then the user question; then the "
        "generation prompt '<|im_start|>assistant\\n'. This is the hero's 'Your files:' layout. "
        "lookup-k2 pastes %s, so its system message %s the hero's. contextTokens: %s."
        % (SCENARIO["system"], RAG_HEADER, ranking["lookup"][:2],
           "is byte-identical to" if hero_k2_same else "differs from",
           ", ".join("%s %d" % kv for kv in ctx_len.items())))
    notes.append(
        "Generation (every text): %s (revision %s), CPU float32, PURE greedy: argmax over the %d "
        "real vocab rows (padding rows excluded), no repetition penalty, top-k, top-p or "
        "temperature, with a KV cache. Stops at <|im_end|> or <|endoftext|> (stoppedNaturally = "
        "true; the stop token is not counted in tokenCount). Max new tokens: lookup %d, "
        "buttermilk-k* %d, buttermilk-tool %d, own-request %d, no-calculator %d; a run that hits "
        "its cap has stoppedNaturally = false and its text is cut there. Such a run also gets "
        "untilStop, a diagnostic beyond the cap: the same greedy run from the same context, "
        "continued to at most %d new tokens (its first tokenCount tokens are exactly the capped "
        "run's, checked). text is decoded with skip_special_tokens=True."
        % (GENERATOR, g_commit, n_real, LOOKUP_MAX_NEW, ALL_MAX_NEW, TOOL_MAX_NEW, OWN_MAX_NEW,
           NOCALC_MAX_NEW, UNTIL_STOP_MAX_NEW))
    notes.append(
        "Near-ties: at every greedy step the gap between the top two scores (logits) was "
        "recorded; the smallest is %.4f (%s). Steps with a gap under %.2f: %s. At each of those a "
        "full recompute WITHOUT the KV cache picks the same token (checked), but a gap this small "
        "could flip on other hardware or library versions, which would change the rest of that "
        "text." % (min_gap[0], min_gap[1], NEAR_TIE,
                   "; ".join("%s new token %d: %r over %r by %.4f" % (r, k, a, b, d)
                             for r, k, d, a, b in near_ties) or "none"))
    notes.append(
        "lookup-k*.rightAmount: a separate teacher-forced pass over the same context plus the "
        "assistant-turn prefix %r (tokens %s). prob = P(%r), the first token of %r (Qwen writes "
        "every digit as its own token and the space before it as a token of its own, so the "
        "prefix ends in ' '; tokenizing the prefix + '%s cups' gives the prefix tokens then %r, "
        "checked), softmax at T=1 over the %d real vocab rows; top = the 3 most likely tokens "
        "there. It does not depend on the run's own greedy text."
        % (ANSWER_PREFIX, [dec(tok, i) for i in prefix_ids], dec(tok, two_id), RIGHT_AMOUNT,
           RIGHT_AMOUNT, dec(tok, two_id), n_real))
    notes.append(
        "named / correct / missed / wrong (buttermilk-k* and buttermilk-tool): the recipes named "
        "anywhere in the text, found with case-insensitive regexes on dish names, not "
        "ingredients: %s. A match inside a longer match is dropped (so 'pie crust' is not also "
        "'pie'), 'chicken' counts as fried chicken unless followed by 'gravy' or 'broth', and "
        "the biscuit card's back counts as the biscuits recipe ('biscuits-front'). named is in "
        "order of first mention. correct = named recipes among the true %d (%s); missed = %d - "
        "correct; wrong = named recipes that do not use buttermilk. A name is counted wherever "
        "it appears, even in a sentence that says the recipe does NOT use buttermilk."
        % ("; ".join("%s %s" % (rid, pat) for rid, pat in NAME_PATTERNS), len(truth_ids),
           ", ".join(truth_ids), len(truth_ids)))
    notes.append(
        "buttermilk-tool: no chunks are pasted; the system message is %r and the template adds "
        "its '# Tools' block for one tool, %s (description %r; one required string parameter "
        "'word' with no description), passed as tools= in the same OpenAI-style JSON schema "
        "make_trace.py uses for the calculator. toolChoice: with only the system message and the "
        "question (plus the generation prompt), P(<tool_call>) as the assistant's first token, "
        "softmax over the %d real rows, rank %d, with the top 3. The model's own unforced greedy "
        "first turn there (diagnostic, max %d tokens): %r. The recorded run then FORCES the "
        "assistant turn as the tool call %s (rendered by the template as "
        "<tool_call>...</tool_call>); "
        "the tool response, rendered by the template inside <tool_response>, is the JSON list "
        "%s: every chunk among all %d whose text contains %r (case-insensitive), the biscuit "
        "card's front and back counted as one recipe, in box order. text is the greedy reply "
        "after that. toolRequest is the call's argument value (%r) and toolResult the exact "
        "string pasted as the tool response."
        % (SCENARIO["system"], SEARCH_TOOL_NAME, SEARCH_TOOLS[0]["function"]["description"],
           n_real, tc_rank, FREE_TOOL_TURN_MAX_NEW, free_tool_turn, json.dumps(tool_request),
           tool_result, len(chunks), SEARCH_WORD, SEARCH_WORD))
    notes.append(
        "own-request: the hero conversation (make_trace.build_messages, the calculator in tools=) "
        "with the model's OWN greedy first turn as the tool call. Regenerated here (pure greedy "
        "from the hero system message + passages + question, max 260 new tokens): %r, identical "
        "to phase1.json freeFirstTurn.text, and the rendered conversation contains exactly those "
        "tokens followed by <|im_end|> (checked). The calculator evaluates %r with Python "
        "(+ - * / on numbers via ast; the same function turns the hero's %r into %r, checked) = "
        "%r, pasted as the tool response exactly where the hero pastes %r (toolRequest = the "
        "expression, toolResult = the pasted string). text is the greedy reply after it. "
        "finalNumber = the last number in text (regex '\\d+(?:\\.\\d+)?'); "
        "statedCups = the last amount written directly before 'cup' or 'cups' (regex %r), the "
        "amount of flour the text states."
        % (own_text, own_expr, SCENARIO["toolExpression"], SCENARIO["toolResult"], own_result,
           SCENARIO["toolResult"], CUPS_RE.pattern))
    notes.append(
        "no-calculator: the hero's system message (system prompt + 'Your files:' + both "
        "passages, byte-identical) and question, rendered with NO tools= (no '# Tools' block, "
        "no calculator anywhere), then the generation prompt. text is the greedy answer. "
        "finalNumber = the last number in text (regex '\\d+(?:\\.\\d+)?'); finalNumberCorrect = "
        "it is within 0.05 of %s (so 8.4, 8.44 and 8.4375 count); statedCups as for "
        "own-request (the last number can be something else, e.g. the 30 people); untilStop "
        "has the same three fields for the uncapped text. The true answer is 2.25 x 30 / 8 = "
        "%s cups." % (SCENARIO["toolResult"], SCENARIO["toolResult"]))
    for q in questions:
        rank = {s["chunk"]: k + 1 for k, s in enumerate(q["scores"])}
        if q["id"] == "lookup":
            r_ans = rank["biscuits-front"]
            notes.append(
                "lookup ranking: the answer card 'biscuits-front' (the only chunk holding %r) is "
                "rank %d of %d (cos %.3f), so it is included from K = %d on."
                % (by_id["biscuits-front"]["flour"], r_ans, len(chunks),
                   q["scores"][r_ans - 1]["cos"], min(k for k in KS if k >= r_ans)))
        else:
            worst = max(rank[r] for r in truth_ids)
            notes.append(
                "all-buttermilk ranking: the %d buttermilk recipes (%s) are at ranks %s; the top "
                "%d hold %d of them, and all %d are included only from K = %d on."
                % (len(truth_ids), ", ".join(truth_ids),
                   ", ".join(str(rank[r]) for r in truth_ids), len(truth_ids),
                   sum(1 for r in truth_ids if rank[r] <= len(truth_ids)), len(truth_ids),
                   min(k for k in KS if k >= worst)))
    notes.append(
        "Content screen: every greedy text (untilStop included), every top-3 token (rightAmount, "
        "toolChoice) and the unforced tool-run first turn were checked with "
        "scripts/trace/screen.py (a superset of src/lib/safeText.ts). Greedy cannot be redrawn, "
        "so a hit keeps its record and sets \"flagged\": true. %s"
        % ("Flagged: " + "; ".join("%s (%s)" % (w, ",".join(b)) for w, b, _a, _t in flagged)
           if flagged else "Nothing was flagged."))

    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "retriever": {"id": RETRIEVER, "dims": dims, "pooling": "mean"},
        "model": {"id": GENERATOR},
        "chunks": chunks,
        "questions": questions,
        "runs": runs,
        "notes": notes,
    }
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")

    # ---- console summary ------------------------------------------------------------------
    print()
    for q in questions:
        print("%-15s %s" % (q["id"], "  ".join("%s %.3f" % (s["chunk"], s["cos"])
                                              for s in q["scores"])))
    print("toolChoice      P(<tool_call>)=%.4g rank %d top %s" % (
        tool_choice["prob"], tc_rank, [(c["text"], c["prob"]) for c in tool_choice["top"]]))
    print("free tool turn  %r" % free_tool_turn)
    for r in runs:
        extra = ""
        if "rightAmount" in r:
            extra = "P('2')=%.4g top %s" % (r["rightAmount"]["prob"], [
                (c["text"], c["prob"]) for c in r["rightAmount"]["top"]])
        elif "named" in r:
            extra = "c/m/w %d/%d/%d %s" % (r["correct"], r["missed"], r["wrong"], r["named"])
        elif "finalNumber" in r:
            extra = "final %s" % r["finalNumber"]
        print("%-16s ctx=%4d n=%3d %-4s %s%s\n    %r" % (
            r["id"], r["contextTokens"], r["tokenCount"],
            "stop" if r["stoppedNaturally"] else "cut", extra,
            "  FLAGGED" if r.get("flagged") else "", r["text"]))
        if "untilStop" in r:
            u = r["untilStop"]
            print("    untilStop n=%d %s%s: ...%r" % (
                u["tokenCount"], "stop" if u["stoppedNaturally"] else "cut",
                " final %s" % u["finalNumber"] if "finalNumber" in u else "", u["text"][-150:]))
    for w, b, a, t in flagged:
        print("FLAGGED    %s %s%s %r" % (w, ",".join(b), " [app: %s]" % ",".join(a) if a else "",
                                         t[:90]))
    print("timing     retriever %.1fs, load %.1fs, runs %.1fs, total %.1fs"
          % (t_retr, t_load, t_runs, time.time() - t_start))
    print("wrote      %s (%.1f KB)" % (out_path, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    main()
