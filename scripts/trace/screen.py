#!/usr/bin/env python3
"""
Content screen for model-written text in the trace JSON files.

Small models sampled at high temperature produce random strings from the whole vocabulary,
which can include sexual, profane, slur or violent words. make_phase1.py uses `hits()` to
reject and redraw temperature samples; running this file scans every model-written text in
hero-trace.json and phase1.json and reports what matches (it never edits the files).

The rules are a SUPERSET of src/lib/safeText.ts (the app's last-line filter), so anything
this screen accepts also passes the app's safety test. Matching is on lowercased text:
  APP_SUBSTRINGS / STEMS  match anywhere (distinctive stems such as 'masturbat')
  APP_WHOLE / WORDS       match only as a whole word (short words that hide inside ordinary
                          words: 'anal' in 'analysis', 'cum' in 'document')
English only: CJK and other scripts are not screened.

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/screen.py
"""

import json
import os
import re
import sys

# --- mirror of src/lib/safeText.ts -------------------------------------------------------
APP_BLOCKED = [
    "fuck", "shit", "cunt", "bitch", "bastard", "cock", "dick", "pussy", "penis", "vagina",
    "masturbat", "orgasm", "porn", "nude", "naked", "boob", "tits", "anal", "rape", "whore",
    "slut", "nigg", "fag", "retard", "kike", "spic", "chink", "tranny", "kill yourself",
    "suicide", "nazi", "hitler",
]
APP_WHOLE = {"anal", "dick", "cock", "spic", "nude", "tits"}

# --- broader screen used for redraws -----------------------------------------------------
# STRONG: sexual, slurs, hard profanity. MILD: violence/death words and mild profanity.
# Temperature samples are redrawn on ANY hit; the scan report marks each hit strong or mild.
STRONG_STEMS = [
    "sexual", "erotic", "horny", "dildo", "blowjob", "handjob", "cumshot", "ejaculat",
    "genital", "clitor", "nipple", "erection", "sperm", "hentai", "fetish", "incest",
    "pedophil", "paedophil", "molest", "prostitut", "hooker", "stripper", "bestiality",
    "lingerie", "xxx", "nsfw", "milf", "bdsm", "motherf", "asshole", "arsehole", "bullshit",
    "wank", "bollock", "twat", "piss", "faggot", "dyke", "wetback", "beaner", "towelhead",
    "raghead",
]
MILD_STEMS = ["murder", "suicid", "tortur", "behead", "massacre", "genocide", "terroris",
              "slaughter", "strangl", "mutilat", "dismember", "decapitat", "kill"]
STRONG_WORDS = {"sex", "sexy", "cum", "semen", "anus", "orgy", "rapist", "raping", "raped",
                "rapes", "pedo", "nudes", "tit", "boobs", "ass", "arse", "gook", "coon",
                "wop", "kyke", "jap"}
MILD_WORDS = {"butt", "breasts", "homo", "damn", "crap", "hell", "bloody", "gun", "guns",
              "shoot", "shooting", "stab", "stabbed", "stabbing", "bomb", "bombs", "bombing",
              "abuse", "abused", "blood", "corpse", "dead", "die", "dies", "died", "death",
              "weapon", "weapons", "war"}
# Ordinary words that contain a stem; a stem found only inside these does not count.
SAFE_WORDS = {"skill", "skills", "skilled", "skillet", "skillful", "skillfully", "unskilled",
              "killdeer", "pissarro", "congenital", "swank", "swanky"}


def classify(text):
    """{'strong': [...], 'mild': [...]} of blocked terms found in `text`."""
    low = text.lower()
    words = re.findall(r"[a-z]+", low)
    strong, mild = set(app_hits(text)), set()
    for stems, bucket in ((STRONG_STEMS, strong), (MILD_STEMS, mild)):
        for st in stems:
            if any(st in w and w not in SAFE_WORDS for w in words):
                bucket.add(st)
    for w in words:
        if w in STRONG_WORDS:
            strong.add(w)
        elif w in MILD_WORDS:
            mild.add(w)
    return {"strong": sorted(strong), "mild": sorted(mild - strong)}


def hits(text):
    """All blocked terms found in `text` (empty list = clean)."""
    c = classify(text)
    return c["strong"] + c["mild"]


def app_hits(text):
    """Only the src/lib/safeText.ts rules (what the app's safety test checks)."""
    low = text.lower()
    out = []
    for w in APP_BLOCKED:
        if w not in low:
            continue
        if w in APP_WHOLE and not re.search(r"(^|[^a-z])%s([^a-z]|$)" % re.escape(w), low):
            continue
        out.append(w)
    return out


def model_texts(hero, phase1):
    """(where, text) for every model-written text in both files."""
    out = []
    if hero:
        for s in hero["steps"]:
            for k, c in enumerate(s["top"]):
                out.append(("hero.steps[pos=%d].top[%d]" % (s["pos"], k), c["text"]))
        for e in hero["logitLens"]:
            for ly in e["layers"]:
                for k, c in enumerate(ly["top"]):
                    out.append(("hero.logitLens[%s].layer%d.top[%d]" % (e.get("id", e["pos"]),
                                                                      ly["layer"], k), c["text"]))
        for k, n in enumerate(hero.get("notes", [])):
            if n.startswith("Unforced greedy"):
                out.append(("hero.notes[%d]" % k, n))
    if phase1:
        for r in phase1["temperatureRuns"]:
            out.append(("temperatureRuns[T=%s,seed=%s]" % (r["T"], r["seed"]), r["text"]))
        ft = phase1.get("freeFirstTurn", {})
        if ft:
            out.append(("freeFirstTurn", ft["text"]))
        if phase1.get("freeFirstTurnNudged"):
            out.append(("freeFirstTurnNudged", phase1["freeFirstTurnNudged"]["text"]))
        if phase1.get("letters"):
            out.append(("letters.firstTurnGreedy", phase1["letters"]["firstTurnGreedy"]["text"]))
        for v in phase1["votePositions"]:
            for k, c in enumerate(v["top"]):
                out.append(("votePositions[pos=%d].top[%d]" % (v["pos"], k), c["text"]))
        for t in phase1["beat"]["thinkLike"]:
            for k, c in enumerate(t["top"]):
                out.append(("beat.thinkLike[pos=%d].top[%d]" % (t["pos"], k), c["text"]))
        for i, s in enumerate(phase1["beat"]["sentences"]):
            for k, c in enumerate(s["top"]):
                out.append(("beat.sentences[%d].top[%d]" % (i, k), c["text"]))
    return out


def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    paths = sys.argv[1:] or [os.path.join(root, "src", "data", "traces", f)
                             for f in ("hero-trace.json", "phase1.json")]
    hero = phase1 = None
    for p in paths:
        with open(p) as f:
            d = json.load(f)
        if "votePositions" in d:
            phase1 = d
        else:
            hero = d
    counts = {"strong": 0, "mild": 0}
    for where, text in model_texts(hero, phase1):
        c = classify(text)
        if c["strong"] or c["mild"]:
            sev = "strong" if c["strong"] else "mild"
            counts[sev] += 1
            a = app_hits(text)
            print("%-6s %-42s %-24s %r%s" % (sev.upper(), where, ",".join(c["strong"] + c["mild"]),
                                            text[:70], "  [app filter: %s]" % ",".join(a) if a else ""))
    print("%d strong, %d mild hit(s)" % (counts["strong"], counts["mild"]))


if __name__ == "__main__":
    main()
