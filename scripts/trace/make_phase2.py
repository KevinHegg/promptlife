#!/usr/bin/env python3
"""
Prompt Life trace pipeline, phase 2 extras -> src/data/traces/phase2.json

Same model, same scenario and same token positions as make_trace.py (hero-trace.json).
It adds the data for the P03 Embedding / P04 Attention / P05 The Stack / P07 The Loop /
P08 Reply lessons:

  wordMap   ~40 recipe-themed single-token words: a 2-D map of their input-embedding rows,
            each word's 5 nearest map words, a "barcode" strip of the raw row, and the 10
            nearest readable words to ' flour' in the whole vocabulary
  breaks    sabotage experiments on the reply turn: scramble the embedding table, swap
            flour's row for sugar's, hide tokens from attention, skip or cut floors of the
            stack, trim the context the way a chat app does (whole tokens deleted, positions
            renumbered), ban the stop token. Each records the greedy reply and the
            teacher-forced probability of the answer's first digit '8'.
  stopProb  normal run: the teacher-forced P('<|im_end|>') right after the recorded reply
  skipEach  for every single floor k = 1..24: P('8') with only that floor skipped

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_phase2.py
  ... --out /tmp/phase2.json
"""

import argparse
import base64
import contextlib
import datetime as _dt
import itertools
import json
import os
import re
import sys
import time
import warnings

warnings.filterwarnings("ignore")

import numpy as np  # noqa: E402
import torch  # noqa: E402
from transformers import AutoModelForCausalLM, AutoTokenizer  # noqa: E402
from transformers.utils import logging as hf_logging  # noqa: E402

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_trace import SCENARIO, build_hero, dec, r4  # noqa: E402
from screen import app_hits, hits as screen_hits  # noqa: E402

hf_logging.set_verbosity_error()

# --------------------------------------------------------------------------------------
# Curated choices
# --------------------------------------------------------------------------------------
# Word map: (group id, label, words). Every word is tried WITH a leading space and must be
# a single Qwen token; a word that is not falls back to ALTERNATES[word] (reported in notes).
# Qwen splits every digit into its own token, so number WORDS stand in for numbers.
WORD_GROUPS = [
    ("baking", "Baking", ["flour", "sugar", "butter", "salt", "yeast", "dough", "milk"]),
    ("measures", "Measures", ["cup", "cups", "ounce", "gram", "pound", "pinch", "spoon"]),
    ("people", "People", ["grandmother", "mother", "aunt", "family", "friends", "people",
                          "guests"]),
    ("numbers", "Number words", ["one", "two", "three", "eight", "ten", "thirty", "hundred"]),
    ("places", "Places", ["Paris", "Tokyo", "London", "city", "kitchen", "station"]),
    ("actions", "Actions", ["bake", "cook", "feed", "mix", "stir", "serve", "eat"]),
]
ALTERNATES = {"grandmother": "grandma", "yeast": "honey", "ounce": "ounces", "gram": "grams",
              "pinch": "teaspoon", "spoon": "tablespoon", "guests": "children",
              "thirty": "twenty", "stir": "pour", "kitchen": "home"}
MAP_NEIGHBORS = 5
FLOUR_NEIGHBORS = 10
READABLE = re.compile(r"^ [A-Za-z]+$")

MAX_NEW = 40
NO_STOP_MAX_NEW = 80                                   # P08 no-stop: the EOS ids are banned
SCRAMBLE_SEED = 20261015
SCRAMBLES = [("scramble-10", 0.10, "10% of rows"), ("scramble-50", 0.50, "Half the rows"),
             ("scramble-100", 1.00, "Every row")]


def top_text_prob(tok, row, k):
    p = torch.softmax(row.double(), -1)
    v, ix = torch.topk(p, k)
    return [{"text": dec(tok, i), "prob": r4(pv)} for pv, i in zip(v.tolist(), ix.tolist())]


# --------------------------------------------------------------------------------------
# 1. Word map
# --------------------------------------------------------------------------------------
def word_map(tok, emb, n_real):
    """Returns (wordMap dict, notes, console lines)."""
    notes, subs, skipped = [], [], []
    meta = []                                           # (text, id, group)
    for gid, _label, words in WORD_GROUPS:
        for w in words:
            e = tok.encode(" " + w, add_special_tokens=False)
            if len(e) != 1 and w in ALTERNATES:
                alt = ALTERNATES[w]
                e2 = tok.encode(" " + alt, add_special_tokens=False)
                if len(e2) == 1:
                    subs.append((w, alt))
                    w, e = alt, e2
            if len(e) != 1:
                skipped.append(w)
                continue
            meta.append((" " + w, e[0], gid))
    if [m[0] for m in meta].count(" flour") != 1 or [m[0] for m in meta].count(" feed") != 1:
        sys.exit("' flour' and ' feed' must be on the word map")
    wid = [m[1] for m in meta]
    groups = np.array([m[2] for m in meta])
    raw = emb[wid]                                      # [N, d] raw input-embedding rows
    unit = raw / np.linalg.norm(raw, axis=1, keepdims=True)
    cos = unit @ unit.T

    # Same projection as make_trace.py's embedding map: L2-normalize, center, PCA of the
    # GROUP CENTROIDS (each group weighted equally), project every word onto two of those
    # axes, min-max scale each axis to [-1, 1]. Here every pair of the (n_groups - 1)
    # centroid axes is tried; the pair whose DISPLAYED (scaled) map best keeps each word's
    # nearest neighbour in its own group wins (ties: higher between/within-group variance).
    X = unit - unit.mean(axis=0, keepdims=True)
    gids = [g for g, _, _ in WORD_GROUPS]

    def nn_rate(Y):
        D = ((Y[:, None, :] - Y[None, :, :]) ** 2).sum(-1)
        np.fill_diagonal(D, np.inf)
        return float((groups[D.argmin(1)] == groups).mean())

    def scale(P):
        return 2 * (P - P.min(axis=0)) / (P.max(axis=0) - P.min(axis=0)) - 1

    def separation(Y):
        mu = Y.mean(0)
        between = sum((groups == g).sum() * ((Y[groups == g].mean(0) - mu) ** 2).sum()
                      for g in gids)
        within = sum(((Y[groups == g] - Y[groups == g].mean(0)) ** 2).sum() for g in gids)
        return float(between / within)

    C = np.stack([X[groups == g].mean(0) for g in gids])
    _, sv, Vc = np.linalg.svd(C - C.mean(0), full_matrices=False)
    n_axes = len(gids) - 1
    scored = []
    for ij in itertools.combinations(range(n_axes), 2):
        Pij = scale(X @ Vc[list(ij)].T)
        scored.append((nn_rate(Pij), separation(Pij), ij))
    scored.sort(reverse=True)
    best_rate, best_sep, pair = scored[0]
    P = scale(X @ Vc[list(pair)].T)
    _, _, Vt = np.linalg.svd(X, full_matrices=False)
    full_rate = nn_rate(X)                              # = nearest by cosine on full rows
    plain_rate = nn_rate(scale(X @ Vt[:2].T))
    first_pair = next(s for s in scored if s[2] == (0, 1))

    words = []
    for k, (text, tid, g) in enumerate(meta):
        order = [j for j in np.argsort(-cos[k]) if j != k][:MAP_NEIGHBORS]
        row = raw[k]
        q = np.round(row / np.abs(row).max() * 127).astype(np.int8)
        words.append({
            "text": text, "id": int(tid), "group": g, "x": r4(P[k, 0]), "y": r4(P[k, 1]),
            "neighbors": [{"text": meta[j][0], "cos": round(float(cos[k, j]), 3)} for j in order],
            "strip": base64.b64encode(q.tobytes()).decode("ascii"),
        })

    # ' flour' against the whole real vocabulary (padding rows excluded), cosine on raw rows.
    flour_id = tok.encode(" flour", add_special_tokens=False)[0]
    V = emb[:n_real]
    vn = V / np.maximum(np.linalg.norm(V, axis=1, keepdims=True), 1e-12)
    fc = vn @ vn[flour_id]
    flour_nb, n_seen = [], 0
    for j in np.argsort(-fc):
        n_seen += 1
        if j == flour_id:
            continue
        t = dec(tok, j)
        if READABLE.match(t):
            flour_nb.append({"text": t, "cos": round(float(fc[j]), 3)})
            if len(flour_nb) == FLOUR_NEIGHBORS:
                break

    # The rows on either side of ' flour' in the embedding table, for the Arrive picture: an ID
    # is only an address, so neighbouring IDs hold unrelated tokens. Raw rows, no normalization.
    table_rows = []
    for tid in range(flour_id - 2, flour_id + 3):
        row = emb[tid]
        q = np.round(row / np.abs(row).max() * 127).astype(np.int8)
        table_rows.append({
            "id": int(tid), "text": dec(tok, tid),
            "first": [round(float(v), 3) for v in row[:4]],
            "strip": base64.b64encode(q.tobytes()).decode("ascii"),
        })

    wm = {
        "table": {"rows": int(emb.shape[0]), "cols": int(emb.shape[1]), "around": table_rows},
        "method": "Input-embedding rows (%d numbers each) L2-normalized, centered, projected onto "
                  "principal axes %d and %d of the %d group centroids, each axis scaled to [-1, 1]."
                  % (raw.shape[1], pair[0] + 1, pair[1] + 1, len(gids)),
        "groups": [{"id": g, "label": lab} for g, lab, _ in WORD_GROUPS],
        "words": words,
        "sameGroupNearest": {"full": round(full_rate, 3), "map": round(best_rate, 3)},
        "flourNeighbors": flour_nb,
    }
    notes.append(
        "wordMap: %d words in %d groups, each ONE Qwen token with its leading space (tokenizer."
        "encode(' ' + word)). %s%sNumber words stand in for numbers because Qwen splits every "
        "digit into its own token." % (
            len(words), len(gids),
            ("Substituted (not a single token): %s. " % ", ".join(
                "%r -> %r" % (" " + a, " " + b) for a, b in subs)) if subs else
            "No substitutions were needed: every suggested word is a single token. ",
            ("Skipped: %s. " % ", ".join(repr(" " + s) for s in skipped)) if skipped else ""))
    notes.append(
        "wordMap x/y: the raw input-embedding rows are L2-normalized and centered; PCA is run on "
        "the %d group CENTROIDS (each group weighted equally, not the words), giving %d axes "
        "(centroid singular values %s). Every pair of those axes was tried; each word is "
        "projected onto the pair and each axis min-max scaled to [-1, 1]. The pair kept, axes %d "
        "and %d, has the highest same-group-nearest rate on the scaled map (%.0f%%; ties broken by "
        "the between/within-group variance ratio, %.2f). Axes 1 and 2 would give %.0f%%; plain "
        "2-D PCA of the words %.0f%%. It is a linear projection of the real vectors."
        % (len(gids), n_axes, ", ".join("%.3f" % s for s in sv[:n_axes]), pair[0] + 1,
           pair[1] + 1, 100 * best_rate, best_sep, 100 * first_pair[0], 100 * plain_rate))
    notes.append(
        "wordMap.sameGroupNearest: the fraction of the %d words whose single nearest OTHER map "
        "word is in the same group. 'full' uses cosine similarity on the full %d-number rows "
        "(%.3f); 'map' uses straight-line distance on the displayed 2-D x/y (%.3f)."
        % (len(words), raw.shape[1], full_rate, best_rate))
    notes.append(
        "wordMap.words[].neighbors: the %d nearest OTHER map words by cosine similarity of the "
        "raw %d-number input-embedding rows, rounded to 3 decimals. strip: base64 of %d signed "
        "bytes (int8): the raw row divided by its largest |value| and multiplied by 127, rounded "
        "(decode with Int8Array; the scale is not stored)."
        % (MAP_NEIGHBORS, raw.shape[1], raw.shape[1]))
    notes.append(
        "wordMap.table: the embedding table's shape, and the raw rows for the five ids centered on "
        "' flour' (id %d): each with its decoded token, its first four numbers rounded to 3 decimals, "
        "and a strip scaled so the largest |value| is 127. Neighbouring ids are unrelated tokens."
        % flour_id)
    notes.append(
        "wordMap.flourNeighbors: cosine similarity of ' flour' (id %d) against all %d real vocab "
        "rows (the unused padding rows beyond the tokenizer are excluded), highest first, keeping "
        "only tokens whose text is a leading space + ASCII letters (regex '^ [A-Za-z]+$') and "
        "dropping ' flour' itself. The %d kept are the readable ones among the top %d rows."
        % (flour_id, n_real, len(flour_nb), n_seen))
    lines = ["wordmap    pair %s  sameGroupNearest full=%.3f map=%.3f (axes 1,2: %.3f; plain "
             "PCA %.3f)  subs=%s" % (tuple(a + 1 for a in pair), full_rate, best_rate,
                                       first_pair[0], plain_rate, subs or "none")]
    for gid, _, _ in WORD_GROUPS:
        lines.append("  %-9s %s" % (gid, " ".join(w["text"].strip() for w in words
                                                 if w["group"] == gid)))
    lines.append("flour nn   " + ", ".join("%s %.3f" % (n["text"].strip(), n["cos"])
                                          for n in flour_nb))
    return wm, notes, lines


# --------------------------------------------------------------------------------------
# 2. Sabotaged forward passes
# --------------------------------------------------------------------------------------
class Runner:
    """
    One forward pass over a whole sequence (no KV cache), with optional sabotage:
      embed(seq, x)  -> edits the input-embedding rows x [T, d] in place
      mask           -> name of an attention rule, built into an additive 4D mask
      keep           -> list of decoder-layer indices to run (others skipped)
      ban            -> token ids whose scores are set to -inf (greedy and teacher-forced)
    A variant may also bring its own shorter context ("prefix"); the sequence is then simply
    shorter, with ordinary position ids 0..T-1.
    """

    def __init__(self, model, tok, hero_src, n_real):
        self.model, self.tok, self.n_real = model, tok, n_real
        self.hero_src = hero_src                       # src label per hero position
        self.W = model.get_input_embeddings().weight.detach()
        self.layers = model.model.layers
        self.neg = torch.finfo(torch.float32).min

    def srcs(self, seq):
        """Hero labels for positions inside the hero prefix; 'gen' after it."""
        return [self.hero_src[p] if p < len(self.hero_src) else "gen" for p in range(len(seq))]

    def mask(self, rule, src):
        T = len(src)
        allow = torch.tril(torch.ones(T, T, dtype=torch.bool))
        s = np.array(src)
        if rule == "hide-card":
            rag = torch.tensor(s == "rag")
            allow &= ~((~rag)[:, None] & rag[None, :])
        elif rule == "hide-result":
            res = torch.tensor(s == "res")
            after = torch.arange(T) > int(np.nonzero(s == "res")[0].max())
            allow &= ~(after[:, None] & res[None, :])
        elif rule == "self-only":
            allow = torch.eye(T, dtype=torch.bool)
        elif rule != "causal":
            raise ValueError(rule)
        m = torch.zeros(T, T)
        m[~allow] = self.neg
        return m[None, None]

    @contextlib.contextmanager
    def floors(self, keep):
        if keep is None:
            yield
            return
        self.model.model.layers = torch.nn.ModuleList([self.layers[i] for i in keep])
        try:
            yield
        finally:
            self.model.model.layers = self.layers

    def hidden(self, seq, v):
        """Final (normed) hidden states [T, d] under variant v."""
        x = self.W[torch.tensor(seq)].clone()
        if v.get("embed"):
            v["embed"](seq, x)
        mask = self.mask(v["mask"], self.srcs(seq)) if v.get("mask") else None
        with torch.no_grad(), self.floors(v.get("keep")):
            out = self.model.model(inputs_embeds=x[None], attention_mask=mask, use_cache=False)
        return out.last_hidden_state[0]

    def logits(self, h, rows, ban=()):
        """Scores over the real vocab rows; ids in `ban` get -inf (never chosen, prob 0)."""
        with torch.no_grad():
            out = self.model.lm_head(h[rows]).double()[:, :self.n_real]
        if ban:
            out[:, list(ban)] = float("-inf")
        return out

    def greedy(self, prefix, v, stop_ids, max_new=None):
        """Pure argmax, recomputing the whole sequence each step so the sabotage applies
        to every position, including generated tokens as they are fed back."""
        seq, out = list(prefix), []
        ban = v.get("ban", ())
        for _ in range(max_new or MAX_NEW):
            nxt = int(self.logits(self.hidden(seq, v), [len(seq) - 1], ban)[0].argmax())
            if nxt in stop_ids:
                return out, True
            out.append(nxt)
            seq.append(nxt)
        return out, False


# --------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--model", default="Qwen/Qwen2.5-0.5B-Instruct")
    ap.add_argument("--out", default=None, help="default: <repo>/src/data/traces/phase2.json")
    ap.add_argument("--hero", default=None,
                    help="hero-trace.json to check token alignment and positions against "
                         "(default: <repo>/src/data/traces/hero-trace.json)")
    ap.add_argument("--phase1", default=None,
                    help="phase1.json whose T=0 reply is compared with the 'normal' run "
                         "(default: <repo>/src/data/traces/phase1.json if present)")
    args = ap.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_path = args.out or os.path.join(repo_root, "src", "data", "traces", "phase2.json")
    hero_path = args.hero or os.path.join(repo_root, "src", "data", "traces", "hero-trace.json")
    p1_path = args.phase1 or os.path.join(repo_root, "src", "data", "traces", "phase1.json")
    notes = []
    t_start = time.time()

    tok = AutoTokenizer.from_pretrained(args.model)
    model = AutoModelForCausalLM.from_pretrained(
        args.model, torch_dtype=torch.float32, attn_implementation="eager").eval()
    cfg = model.config
    L = cfg.num_hidden_layers
    n_real = len(tok)
    first_added = min(tok.added_tokens_decoder)          # 151643 '<|endoftext|>' for Qwen
    stop_ids = {tok.convert_tokens_to_ids("<|im_end|>"), tok.convert_tokens_to_ids("<|endoftext|>")}
    W_in = model.get_input_embeddings().weight
    tied = (cfg.tie_word_embeddings and
            model.get_output_embeddings().weight.data_ptr() == W_in.data_ptr())

    # ---- hero positions ------------------------------------------------------------------
    hero = build_hero(tok, SCENARIO)
    ids, tokens = hero["ids"], hero["tokens"]
    with open(hero_path) as f:
        hero_json = json.load(f)
    if [t["id"] for t in hero_json["tokens"]] != ids:
        sys.exit("Token ids differ from %s; positions would not line up." % hero_path)
    lens = {e["id"]: e["pos"] for e in hero_json["logitLens"]}
    gen_rep = [p for p in hero["gen_positions"] if tokens[p]["src"] == "rep"]
    reply_start, reply_end = min(gen_rep), max(gen_rep) + 1
    digit_pos, word_pos = lens["answer-digit"], lens["reply-word"]
    first_digit = next(p for p in gen_rep if tokens[p]["text"].strip().isdigit())
    if digit_pos != first_digit or tokens[digit_pos]["text"] != "8":
        sys.exit("answer-digit is pos %d (%r); expected the reply's first digit '8' at %d"
                 % (digit_pos, tokens[digit_pos]["text"], first_digit))
    if tokens[word_pos]["text"] != " flour" or tokens[word_pos]["src"] != "rep":
        sys.exit("reply-word pos %d is %r, not the reply's ' flour'" % (word_pos,
                                                                       tokens[word_pos]["text"]))
    prefix = ids[:reply_start]                          # through '<|im_start|>assistant\n'
    forced = ids[:reply_end]                            # prefix + recorded reply (no <|im_end|>)
    digit_id, word_id = ids[digit_pos], ids[word_pos]
    src = [t["src"] for t in tokens]
    notes.append("Token positions (pos) are the same as in hero-trace.json (checked against its "
                 "token ids). The answer's first digit %r is pos %d (logitLens 'answer-digit') "
                 "and the reply's ' flour' is pos %d (logitLens 'reply-word')."
                 % (tokens[digit_pos]["text"], digit_pos, word_pos))

    # ---- wordMap ------------------------------------------------------------------------
    t0 = time.time()
    emb = W_in.detach().float().cpu().numpy()
    wm, wm_notes, wm_lines = word_map(tok, emb, n_real)
    notes += wm_notes
    t_map = time.time() - t0

    # ---- variants -----------------------------------------------------------------------
    run = Runner(model, tok, src, n_real)
    n_regular = first_added                             # ids 0..n_regular-1 are ordinary BPE
    rng = np.random.default_rng(SCRAMBLE_SEED)
    span = len(prefix) + MAX_NEW + len(forced)          # covers prefix + generated + recorded
    u = rng.random(span)                                # one uniform draw per position
    repl = rng.integers(0, n_regular, span)             # one replacement id per position

    def is_marker(p, tid):
        return (p < len(src) and p < reply_start and src[p] == "special") or tid >= first_added

    content_prefix = [p for p in range(len(prefix)) if not is_marker(p, prefix[p])]
    ranked = sorted(content_prefix, key=lambda p: u[p])

    def scramble(frac):
        chosen = set(ranked[:int(round(frac * len(content_prefix)))])

        def embed(seq, x):
            for p, tid in enumerate(seq):
                if is_marker(p, tid):
                    continue
                if (p < reply_start and p in chosen) or (p >= reply_start and u[p] < frac):
                    r = int(repl[p])
                    if r == tid:
                        r = (r + 1) % n_regular
                    x[p] = run.W[r]
        return embed, sorted(chosen)

    flour_id = tok.encode(" flour", add_special_tokens=False)[0]
    sugar_id = tok.encode(" sugar", add_special_tokens=False)[0]

    def swap_flour(seq, x):
        for p, tid in enumerate(seq):
            if tid == flour_id:
                x[p] = run.W[sugar_id]

    variants = [{"id": "normal", "station": "all", "label": "Normal"}]
    scr_counts = {}
    for vid, frac, label in SCRAMBLES:
        fn, chosen = scramble(frac)
        scr_counts[vid] = (frac, chosen)
        variants.append({"id": vid, "station": "P03", "label": label, "embed": fn,
                         "changed": {"positions": [int(q) for q in chosen]}})
    # What each sabotage touched, for the app's "where" picture: context positions (0-based,
    # within the shared prefix) or the floors removed (1-based).
    at = lambda label: [p for p in range(len(prefix)) if p < len(src) and src[p] == label]
    variants += [
        {"id": "swap-flour-sugar", "station": "P03", "label": "Flour’s row → sugar’s row",
         "embed": swap_flour, "wordProb": True,
         "changed": {"positions": [p for p in range(len(prefix)) if prefix[p] == flour_id]}},
        {"id": "hide-card", "station": "P04", "label": "Hide the recipe card", "mask": "hide-card",
         "changed": {"positions": at("rag")}},
        {"id": "hide-result", "station": "P04", "label": "Hide the calculator’s answer",
         "mask": "hide-result", "changed": {"positions": at("res")}},
        {"id": "self-only", "station": "P04", "label": "Each token sees only itself",
         "mask": "self-only", "changed": {"all": True}},
        {"id": "skip-mid", "station": "P05", "label": "Skip floor 12",
         "keep": [i for i in range(L) if i != 11]},
        {"id": "skip-first", "station": "P05", "label": "Skip floor 1", "keep": list(range(1, L))},
        {"id": "top-half-gone", "station": "P05", "label": "Stop at floor 12",
         "keep": list(range(12))},
        {"id": "stop-18", "station": "P05", "label": "Stop at floor 18", "keep": list(range(18))},
    ]
    for v in variants:
        if "keep" in v:
            v["changed"] = {"floorsRemoved": [k + 1 for k in range(L) if k not in v["keep"]]}

    # P07 The Loop: the app trims the context. Whole tokens are DELETED from the hero ids (no
    # masking, no edits); the rest keep their order and are renumbered 0..n-1.
    im_start = tok.convert_tokens_to_ids("<|im_start|>")
    im_end = tok.convert_tokens_to_ids("<|im_end|>")
    eot = tok.convert_tokens_to_ids("<|endoftext|>")

    def message_span(label):
        """Hero positions of the one chat message holding the `label` tokens: from its
        <|im_start|> through the '\\n' after its <|im_end|>."""
        where = [p for p in range(len(prefix)) if src[p] == label]
        a = max(p for p in range(where[0]) if ids[p] == im_start)
        b = min(p for p in range(where[-1], len(prefix)) if ids[p] == im_end)
        if (where != list(range(where[0], where[-1] + 1)) or dec(tok, ids[b + 1]) != "\n"
                or ids[a:b + 1].count(im_start) != 1 or ids[a:b + 1].count(im_end) != 1):
            sys.exit("The %r tokens are not one whole chat message." % label)
        return list(range(a, b + 2))

    sys_end = ids.index(im_end)                         # the system message's own <|im_end|>
    first_rag = src.index("rag")                        # 'Your' of the 'Your files:' header
    kept_sys = [p for p in range(first_rag) if src[p] == "sys"]
    drop_card = list(range(first_rag, sys_end))         # header + passages + '# Tools' block
    if (tok.decode([ids[p] for p in kept_sys]).rstrip() != SCENARIO["system"]
            or any(src[p] not in ("rag", "sys") for p in drop_card)
            or any(src[p] == "rag" for p in range(len(src)) if p not in drop_card)
            or dec(tok, ids[drop_card[-1]]) != "</tool_call>"):
        sys.exit("Unexpected system message layout; the trim positions would be wrong.")
    drop_question = drop_card + message_span("user")
    drop_result = drop_question + message_span("tool")
    trims = [("trim-card", "Cut the card", drop_card),
             ("trim-question", "Cut the question too", drop_question),
             ("trim-to-result", "Only the answer left", drop_result)]
    for vid, label, drop in trims:
        gone = set(drop)
        kp = [ids[p] for p in range(len(prefix)) if p not in gone]
        variants.append({"id": vid, "station": "P07", "label": label, "prefix": kp,
                         "wordProb": True, "changed": {"positions": sorted(gone)},
                         "keptTokens": len(kp)})

    # P08 Reply: ban the stop token. Both EOS ids get -inf before every argmax (and before the
    # softmax of the teacher-forced pass), so the reply cannot end by itself.
    variants.append({"id": "no-stop", "station": "P08", "label": "Ban the stop token",
                     "ban": [im_end, eot], "maxNew": NO_STOP_MAX_NEW, "wordProb": True,
                     "changed": {"banned": [dec(tok, im_end), dec(tok, eot)]}})

    # ---- sanity checks ------------------------------------------------------------------
    with torch.no_grad():
        ref = model(torch.tensor([forced]), use_cache=False).logits[0, :, :n_real].double()
    h_plain = run.hidden(forced, {})
    h_causal = run.hidden(forced, {"mask": "causal"})
    d_embeds = float((run.logits(h_plain, list(range(len(forced)))) - ref).abs().max())
    d_mask = float((run.logits(h_causal, list(range(len(forced)))) - ref).abs().max())
    with run.floors(list(range(L))):
        h_all = run.hidden(forced, {})
    d_floors = float((h_all - h_plain).abs().max())
    hero_p8 = next(s["chosen"]["prob"] for s in hero_json["steps"] if s["pos"] == digit_pos)

    # stopProb: in the normal teacher-forced pass, P(<|im_end|>) right after the recorded reply.
    if ids[reply_end] != im_end:
        sys.exit("The recorded reply is not followed by <|im_end|> (pos %d)." % reply_end)
    stop_row = run.logits(h_plain, [reply_end - 1])[0]
    stop_prob = {"text": dec(tok, im_end), "prob": r4(torch.softmax(stop_row, -1)[im_end]),
                 "top": top_text_prob(tok, stop_row, 3)}
    hero_stop = next(s["chosen"]["prob"] for s in hero_json["steps"] if s["pos"] == reply_end)

    # Trim checks. (1) Each trimmed context must be token for token what the chat template
    # renders for the shortened conversation, with no tools= list (the '# Tools' block is cut)
    # and the kept system text. (2) Sensitivity: the same, but with the system text exactly
    # SCENARIO['system'] (pos 8 is the merged token '.\n\n'; a fresh render ends in '.').
    msgs = hero["msgs"]
    if [m["role"] for m in msgs[:4]] != ["system", "user", "assistant", "tool"]:
        sys.exit("Unexpected message order in the hero conversation.")
    trim_keep = {"trim-card": [1, 2, 3], "trim-question": [2, 3], "trim-to-result": [3]}
    kept_sys_text = tok.decode([ids[p] for p in kept_sys])
    reply_ids = ids[reply_start:reply_end]

    def render_ids(system_text, keep_msgs):
        conv = [{"role": "system", "content": system_text}] + [msgs[i] for i in keep_msgs]
        return [int(t) for t in tok.apply_chat_template(conv, tokenize=True,
                                                         add_generation_prompt=True)]

    trim_check = {}
    for v in variants:
        if v["id"] not in trim_keep:
            continue
        kp = v["prefix"]
        alt = render_ids(SCENARIO["system"], trim_keep[v["id"]])
        p_alt = None
        if len(alt) == len(kp):
            h = run.hidden(alt + reply_ids, {})
            row = run.logits(h, [len(alt) + digit_pos - reply_start - 1])[0]
            p_alt = r4(torch.softmax(row, -1)[digit_id])
        trim_check[v["id"]] = {
            "template": render_ids(kept_sys_text, trim_keep[v["id"]]) == kp,
            "altDiff": [(i, a, b) for i, (a, b) in enumerate(zip(kp, alt))
                        if a != b] if len(alt) == len(kp) else "length %d" % len(alt),
            "altP8": p_alt}

    # ---- run every variant ----------------------------------------------------------------
    breaks, flagged, timings, gen_ids = [], [], {}, {}
    for v in variants:
        t0 = time.time()
        vp = v.get("prefix", prefix)                   # a trim brings its own shorter context
        shift = len(prefix) - len(vp)                  # tokens deleted before the reply
        ban = v.get("ban", ())
        g, natural = run.greedy(vp, v, stop_ids, v.get("maxNew"))
        gen_ids[v["id"]] = g
        text = tok.decode(g, skip_special_tokens=True)
        h = run.hidden(forced if shift == 0 else vp + reply_ids, v)
        rows = run.logits(h, [digit_pos - 1 - shift, word_pos - 1 - shift], ban)
        p = torch.softmax(rows[0], -1)
        rec = {"id": v["id"], "station": v["station"], "label": v["label"], "text": text,
               "stoppedNaturally": natural, "tokenCount": len(g),
               "rightDigit": {"prob": r4(p[digit_id]), "top": top_text_prob(tok, rows[0], 3)}}
        if v.get("changed"):
            rec["changed"] = v["changed"]
        if "keptTokens" in v:
            rec["keptTokens"] = v["keptTokens"]
        if v.get("wordProb"):
            pw = torch.softmax(rows[1], -1)
            rec["wordProb"] = {"text": dec(tok, word_id), "prob": r4(pw[word_id]),
                               "top": top_text_prob(tok, rows[1], 3)}
        shown = [text] + [c["text"] for c in rec["rightDigit"]["top"]] + \
                [c["text"] for c in rec.get("wordProb", {}).get("top", [])]
        bad = sorted({b for s in shown for b in screen_hits(s)})
        if bad:
            rec["flagged"] = True
            flagged.append((v["id"], bad, sorted({b for s in shown for b in app_hits(s)}), text))
        breaks.append(rec)
        timings[v["id"]] = time.time() - t0
        print("  ran %-17s %5.1fs  p8=%.4g  %r" % (v["id"], timings[v["id"]],
                                                  rec["rightDigit"]["prob"], text[:70]),
              flush=True)

    t0 = time.time()
    skip_each = []
    for k in range(1, L + 1):
        h = run.hidden(forced, {"keep": [i for i in range(L) if i != k - 1]})
        p = torch.softmax(run.logits(h, [digit_pos - 1])[0], -1)
        skip_each.append({"floor": k, "prob": r4(p[digit_id])})
    t_skip = time.time() - t0

    for c in wm["flourNeighbors"]:
        if screen_hits(c["text"]):
            flagged.append(("wordMap.flourNeighbors", screen_hits(c["text"]),
                            app_hits(c["text"]), c["text"]))
    for c in stop_prob["top"]:
        if screen_hits(c["text"]):
            flagged.append(("stopProb", screen_hits(c["text"]), app_hits(c["text"]), c["text"]))

    # ---- notes --------------------------------------------------------------------------
    normal = breaks[0]
    p1_note = ""
    if os.path.exists(p1_path):
        with open(p1_path) as f:
            p1 = json.load(f)
        t0_run = next((r for r in p1.get("temperatureRuns", []) if r["T"] == 0), None)
        if t0_run:
            p1_note = (" The 'normal' text %s phase1.json's T=0 reply (which used a KV cache)."
                       % ("matches" if t0_run["text"] == normal["text"] else
                          "DIFFERS from (%r)" % t0_run["text"]))
    notes.append(
        "breaks: every run starts from the same context, hero tokens 0..%d: everything through "
        "the generation prompt '<|im_start|>assistant\\n' after </tool_response>, where the "
        "model's second turn (the reply) begins. text = PURE greedy generation: argmax over the "
        "%d real vocab rows (padding rows excluded) with no repetition penalty, top-k, top-p or "
        "temperature; at most %d new tokens; stops at <|im_end|> or <|endoftext|> (Qwen's two "
        "EOS ids; stoppedNaturally = true), and the stop token is not counted in tokenCount. "
        "text is decoded with skip_special_tokens=True. Every step recomputes the whole sequence "
        "(no KV cache), so the sabotage applies to every position, including generated tokens as "
        "they are fed back.%s" % (reply_start - 1, n_real, MAX_NEW, p1_note))
    notes.append(
        "breaks[].rightDigit: one teacher-forced pass over hero tokens 0..%d (the context plus "
        "the %d RECORDED reply tokens %r, not the variant's own reply) under the same sabotage. "
        "prob = P(%r) for pos %d, read from the hidden state at pos %d, softmax at T=1 over the "
        "%d real vocab rows; top = the 3 most likely tokens there. Normal run: %.4g (hero-trace."
        "json, softmax over all %d rows incl. padding: %.4g)."
        % (reply_end - 1, reply_end - reply_start,
           tok.decode(ids[reply_start:reply_end]), tokens[digit_pos]["text"], digit_pos,
           digit_pos - 1, n_real, normal["rightDigit"]["prob"], model.lm_head.weight.shape[0],
           hero_p8))
    n_content = len(content_prefix)
    notes.append(
        "Embedding sabotage (P03) feeds inputs_embeds: the token ids are unchanged, but the "
        "input-embedding rows looked up for some positions are replaced before floor 1. The "
        "model has tied embeddings (tie_word_embeddings=%s; the output head IS the same %d x %d "
        "matrix), and only the INPUT lookup is changed: the output head that turns the last "
        "hidden state into scores is untouched." % (cfg.tie_word_embeddings and tied,
                                                    W_in.shape[0], W_in.shape[1]))
    notes.append(
        "scramble-*: chat markers stay intact: positions labeled 'special' (<|im_start|>, role "
        "names, the newline after them, <|im_end|>, the <tool_response> wrappers) and every added "
        "token (ids >= %d, e.g. <tool_call>, </tool_call>) are never scrambled. That leaves %d of "
        "the %d context positions. numpy default_rng(%d) draws one uniform u[pos] and one "
        "replacement id repl[pos] in 0..%d (ordinary tokens only, so no chat marker is injected) "
        "for every position. In the context, the round(f x %d) content positions with the "
        "smallest u are scrambled: %s. From pos %d on (generated tokens fed back during greedy, "
        "or the recorded reply in the teacher-forced pass) a content position is scrambled when "
        "u[pos] < f. A scrambled position gets the row of repl[pos] (or repl[pos] + 1 if that is "
        "the token itself). The sets are nested: every position scrambled at 10%% is also "
        "scrambled at 50%% and 100%%, with the same replacement."
        % (first_added, n_content, len(prefix), SCRAMBLE_SEED, n_regular - 1, n_content,
           ", ".join("%s %d (f=%.2f)" % (k, len(c), f) for k, (f, c) in scr_counts.items()),
           reply_start))
    (f10, c10), (f50, c50) = scr_counts["scramble-10"], scr_counts["scramble-50"]
    gen_span = range(reply_start, reply_start + MAX_NEW)
    notes.append(
        "scramble-* positions. Context, scramble-10: %s. scramble-50 adds: %s. scramble-100: all "
        "%d content positions. From pos %d on, the positions scrambled (unless the token there is "
        "an added token) are, for 10%%: %s; for 50%%: %s (the recorded reply occupies pos %d-%d, "
        "greedy output pos %d-%d)."
        % (c10, sorted(set(c50) - set(c10)), n_content, reply_start,
           [p for p in gen_span if u[p] < f10], [p for p in gen_span if u[p] < f50],
           reply_start, reply_end - 1, reply_start, reply_start + MAX_NEW - 1))
    n_flour = sum(1 for t in prefix if t == flour_id)
    notes.append(
        "swap-flour-sugar: every position whose token is ' flour' (id %d; %d in the context: %s, "
        "plus any generated or recorded ' flour' fed back) gets the input row of ' sugar' (id %d). "
        "Token ids are unchanged. wordProb is the teacher-forced P(' flour') for the recorded "
        "reply's pos %d (hidden state at pos %d, after '... cups of'), softmax over the %d real "
        "rows, with the top 3 there."
        % (flour_id, n_flour, ", ".join("pos %d (%s)" % (p, src[p]) for p, t in
                                       enumerate(prefix) if t == flour_id), sugar_id, word_pos,
           word_pos - 1, n_real))
    rag = [p for p in range(len(src)) if src[p] == "rag"]
    res = [p for p in range(len(src)) if src[p] == "res"]
    notes.append(
        "Attention sabotage (P04): an additive 4D mask [1, 1, T, T] (0 = may look, float32 min = "
        "blocked) is passed to the model with attn_implementation='eager'; transformers uses a 4D "
        "mask as-is and adds it to the scores before the softmax, in all %d floors and all %d "
        "heads. The mask includes the causal rule (no looking ahead). hide-card: a query that is "
        "not a 'rag' token (everything outside the two passages and their 'Your files:' header: "
        "the rest of the system message, the tool definitions, the question, the tool call, the "
        "result, the reply) may not look at any 'rag' token (pos %d-%d, %d tokens); the passages "
        "still see each other. hide-result: every query after the last 'res' token (pos > %d) may "
        "not look at the 'res' tokens pos %d-%d (the calculator's %s); the wrappers around them "
        "stay visible. self-only: every token looks only at itself (the diagonal), so attention "
        "mixes in nothing from other tokens. Check: the plain causal rule as a 4D mask reproduces "
        "the unmasked run to max |logit difference| %.1e."
        % (L, cfg.num_attention_heads, rag[0], rag[-1], len(rag), res[-1], res[0], res[-1],
           SCENARIO["toolResult"], d_mask))
    notes.append(
        "Stack sabotage (P05): use_cache=False; model.model.layers is temporarily replaced with a "
        "ModuleList of the kept floors, so a skipped floor's residual stream passes through "
        "unchanged. The final RMSNorm and the (tied) output head still run after the last kept "
        "floor; token positions and rotary embeddings are unchanged. Floors are numbered 1..%d "
        "(floor k = model.model.layers[k-1]). skip-mid drops floor 12, skip-first drops floor 1, "
        "top-half-gone keeps floors 1-12, stop-18 keeps floors 1-18. skipEach[k-1].prob is the "
        "teacher-forced P(%r) at pos %d with only floor k skipped. Check: running with all %d "
        "floors through the same swap gives max |hidden difference| %.1e."
        % (L, tokens[digit_pos]["text"], digit_pos, L, d_floors))
    notes.append(
        "Check: feeding inputs_embeds (the plain lookup) instead of input_ids changes no logit "
        "by more than %.1e." % d_embeds)

    def spans(ps):
        """[9, 10, 11, 20] -> '9-11, 20'"""
        out, ps = [], sorted(ps)
        for k, grp in itertools.groupby(enumerate(ps), lambda e: e[1] - e[0]):
            run_ = [q for _, q in grp]
            out.append("%d-%d" % (run_[0], run_[-1]) if len(run_) > 1 else "%d" % run_[0])
        return ", ".join(out)

    by_id = {b["id"]: b for b in breaks}
    rag_tok = [p for p in drop_card if src[p] == "rag"]
    tools_tok = [p for p in drop_card if src[p] == "sys"]
    res_msg = message_span("res")
    merged = kept_sys[-1]
    notes.append(
        "Context trimming (P07): trim-card, trim-question and trim-to-result are the only runs "
        "that do NOT start from the shared %d-token context. Each is a SHORTER token sequence: "
        "whole tokens are deleted from the hero ids (nothing is masked or edited), the rest keep "
        "their order and are renumbered 0..keptTokens-1, and the model gets ordinary position ids "
        "0..T-1, so everything after a cut sits at a lower position. changed.positions lists the "
        "ORIGINAL hero positions deleted. trim-card deletes pos %s (%d tokens): the 'Your files:' "
        "header and both recipe passages (the 'rag' tokens, pos %s) and the '# Tools' block the "
        "chat template adds for the calculator (pos %s: its function signature with the tool's "
        "description, and the <tool_call> instructions, ending '</tool_call>'). It keeps "
        "'<|im_start|>system\\n' (pos 0-%d), %r (pos %s) and the system message's own "
        "'<|im_end|>\\n' (pos %d-%d), plus every later message. Pos %d is the single token %r "
        "(id %d), so the kept system text ends in a blank line before <|im_end|>. trim-question "
        "also deletes the whole question message, pos %s (<|im_start|>user ... <|im_end|>\\n). "
        "trim-to-result also deletes the assistant's tool-call message, pos %s "
        "(<|im_start|>assistant\\n<tool_call>...</tool_call><|im_end|>\\n), leaving only the "
        "system message, the tool-response message (pos %s, the calculator's %s inside "
        "<tool_response>) and the generation prompt '<|im_start|>assistant\\n' (pos %d-%d). "
        "keptTokens: %s."
        % (len(prefix), spans(drop_card), len(drop_card), spans(rag_tok), spans(tools_tok),
           kept_sys[0] - 1, SCENARIO["system"], spans(kept_sys), sys_end, sys_end + 1, merged,
           dec(tok, ids[merged]), ids[merged], spans(message_span("user")),
           spans(message_span("tool")), spans(res_msg), SCENARIO["toolResult"],
           reply_start - 3, reply_start - 1,
           ", ".join("%s %d" % (vid, by_id[vid]["keptTokens"]) for vid, _, _ in trims)))
    notes.append(
        "trim-* text is pure greedy from the trimmed context, exactly as for the other runs (at "
        "most %d new tokens, the same two stop ids, no KV cache). rightDigit and wordProb are "
        "teacher-forced on the trimmed context plus the same %d recorded reply tokens, read at "
        "the recorded reply's %r and ' flour' (hero pos %d and %d, minus the d tokens deleted: "
        "%s), softmax over the %d real vocab rows, with the top 3 there."
        % (MAX_NEW, reply_end - reply_start, tokens[digit_pos]["text"], digit_pos, word_pos,
           "; ".join("%s pos %d and %d" % (vid, digit_pos - len(d), word_pos - len(d))
                     for vid, _, d in trims), n_real))
    alt_diffs = [", ".join("pos %d is %r (id %d) instead of %r (id %d)"
                           % (i, dec(tok, kp_i), kp_i, dec(tok, alt_i), alt_i)
                           for i, kp_i, alt_i in c["altDiff"])
                 if isinstance(c["altDiff"], list) else c["altDiff"]
                 for c in trim_check.values()]
    notes.append(
        "Check: each trimmed context is token for token what tokenizer.apply_chat_template("
        "conversation, add_generation_prompt=True) renders with no tools= list (so no '# Tools' "
        "block) for the shortened conversation, with the system text %r: %s. A fresh render "
        "with the system text exactly %r differs only at that merged token (%s) and would give "
        "P(%r) = %s."
        % (kept_sys_text, "; ".join("%s %s" % (k, "matches" if c["template"] else "DIFFERS")
                                    for k, c in trim_check.items()),
           SCENARIO["system"], ("in each: " + alt_diffs[0]) if len(set(alt_diffs)) == 1 else
           "; ".join("%s: %s" % (k, d) for k, d in zip(trim_check, alt_diffs)),
           tokens[digit_pos]["text"],
           ", ".join("%s %s" % (k, c["altP8"]) for k, c in trim_check.items())))
    ns = by_id["no-stop"]
    ns_ids, normal_ids = gen_ids["no-stop"], gen_ids["normal"]
    ns_marks = [t for t in ns_ids if t >= first_added]
    same = next((i for i, (a, b) in enumerate(zip(ns_ids, normal_ids)) if a != b),
                min(len(ns_ids), len(normal_ids)))
    notes.append(
        "Stop token (P08): no-stop starts from the shared context with nothing else changed, but "
        "at every greedy step the scores of both EOS ids, <|im_end|> (id %d) and <|endoftext|> "
        "(id %d), are set to -inf before the argmax, so the reply cannot end by itself and runs "
        "for the full %d new tokens (stoppedNaturally = false; every other run is capped at %d). "
        "%s rightDigit and wordProb come from the usual teacher-forced pass over the recorded "
        "reply with the same two ids set to -inf before the softmax; the recorded %r and ' flour' "
        "are not EOS, so this only renormalizes (P(%r): normal %.4g, no-stop %.4g). %s"
        % (im_end, eot, NO_STOP_MAX_NEW, MAX_NEW,
           ("Its first %d new tokens are the normal run's whole reply, token for token; where "
            "the normal run then stopped, no-stop carries on with its best token that is not a "
            "stop token."
            % len(normal_ids)) if same == len(normal_ids) else
           ("It matches the normal run's reply for its first %d new tokens." % same),
           tokens[digit_pos]["text"], tokens[digit_pos]["text"],
           normal["rightDigit"]["prob"], ns["rightDigit"]["prob"],
           ("Its %d new tokens include %d other special or added token(s) (%s), which "
            "skip_special_tokens=True drops from text, as for every run."
            % (len(ns_ids), len(ns_marks),
               ", ".join("%s at new token %d" % (dec(tok, t), i + 1)
                         for i, t in enumerate(ns_ids) if t >= first_added)))
           if ns_marks else "Its %d new tokens contain no other special or added token."
           % len(ns_ids)))
    notes.append(
        "stopProb: in the normal (unsabotaged) teacher-forced pass over hero tokens 0..%d, "
        "P(%r) for pos %d, read from the hidden state at pos %d (the recorded reply's final %r), "
        "softmax at T=1 over the %d real vocab rows, with the top 3 there: %.4g (hero-trace.json, "
        "softmax over all %d rows incl. padding: %.4g). It is the model's own chance of ending "
        "the reply right there; no-stop takes that choice away."
        % (reply_end - 1, dec(tok, im_end), reply_end, reply_end - 1,
           tokens[reply_end - 1]["text"], n_real, stop_prob["prob"],
           model.lm_head.weight.shape[0], hero_stop))
    notes.append(
        "Content screen: every greedy text, every top-3 token and every flourNeighbors word was "
        "checked with scripts/trace/screen.py (a superset of src/lib/safeText.ts). Greedy cannot "
        "be redrawn, so a hit keeps its record and sets \"flagged\": true. %s"
        % ("Flagged: " + "; ".join("%s (%s)" % (w, ",".join(b)) for w, b, _a, _t in flagged)
           if flagged else "Nothing was flagged."))

    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "model": {"id": args.model, "layers": L, "hidden": cfg.hidden_size},
        "wordMap": wm,
        "contextLength": len(prefix),
        "breaks": breaks,
        "stopProb": stop_prob,
        "skipEach": skip_each,
        "notes": notes,
    }
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")

    # ---- console summary ------------------------------------------------------------------
    print()
    for line in wm_lines:
        print(line)
    print("checks     inputs_embeds %.1e, causal 4D mask %.1e, all-floors swap %.1e"
          % (d_embeds, d_mask, d_floors))
    print("%-17s %-4s %3s %8s  %-12s %-4s %s" % ("id", "stop", "n", "P('8')", "top1", "flag",
                                                "text"))
    for b in breaks:
        print("%-17s %-4s %3d %8.4g  %-12r %-4s %r" % (
            b["id"], "stop" if b["stoppedNaturally"] else "cut", b["tokenCount"],
            b["rightDigit"]["prob"], b["rightDigit"]["top"][0]["text"],
            "YES" if b.get("flagged") else "", b["text"][:80]))
        if "wordProb" in b:
            print("%-17s P(' flour')=%.4g top %s" % ("", b["wordProb"]["prob"], [
                (c["text"], c["prob"]) for c in b["wordProb"]["top"]]))
    print("stopProb   P(%r)=%.4g (hero %.4g) top %s" % (
        stop_prob["text"], stop_prob["prob"], hero_stop,
        [(c["text"], c["prob"]) for c in stop_prob["top"]]))
    for v in variants:
        if v["id"] in trim_check:
            c = trim_check[v["id"]]
            print("%-17s keptTokens=%d  template %s  alt '.' P('8')=%s  removed %s" % (
                v["id"], v["keptTokens"], "matches" if c["template"] else "DIFFERS",
                c["altP8"], spans(v["changed"]["positions"])))
            print("  decoded: %r" % tok.decode(v["prefix"], skip_special_tokens=False))
    print("no-stop    new tokens: %r" % tok.decode(gen_ids["no-stop"], skip_special_tokens=False))
    print("skipEach   " + " ".join("%d:%.3g" % (s["floor"], s["prob"]) for s in skip_each))
    for w, b, a, t in flagged:
        print("FLAGGED    %s %s%s %r" % (w, ",".join(b), " [app: %s]" % ",".join(a) if a else "",
                                         t[:90]))
    print("timing     map %.1fs, skipEach %.1fs, total %.1fs" % (t_map, t_skip,
                                                                 time.time() - t_start))
    print("wrote      %s (%.1f KB)" % (out_path, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    main()
