import test from "node:test";
import { existsSync } from "node:fs";
import { lessons } from "../src/book/lessons.ts";
import {
  loadProgress,
  parseProgress,
  PROGRESS_KEY,
} from "../src/book/progress.ts";
import assert from "node:assert/strict";
import {
  softmax,
  sampleCounts,
  attentionWeights,
  trainWeight,
  packContext,
} from "../src/book/model.ts";
import { chapters, glossary } from "../src/book/content.ts";
import {
  attendedState,
  bankToken,
  journeyCandidates,
  journeyVocabulary,
  positionedState,
  transformedState,
  vectorText,
} from "../src/book/tokenJourneyModel.ts";

test("the token journey keeps its embedding fixed while calculating states and output scores", () => {
  const close = (actual, expected) => {
    assert.equal(actual.length, expected.length);
    actual.forEach((value, i) =>
      assert.ok(Math.abs(value - expected[i]) < 1e-12),
    );
  };
  assert.equal(
    journeyVocabulary.map((token) => token.text).join(""),
    "The river bank",
  );
  assert.equal(bankToken.id, 42);
  close(bankToken.embedding, [0.2, -0.4, 0.7, 0.1]);
  close(positionedState, [0.2, -0.3, 0.7, 0.3]);
  close(attendedState, [0.3, -0.1, 0.6, 0.6]);
  close(transformedState, [0.2, 0, 0.8, 0.6]);
  assert.equal(vectorText(transformedState), "[0.2, 0.0, 0.8, 0.6]");
  assert.notEqual(positionedState, bankToken.embedding);
  assert.notEqual(attendedState, positionedState);
  const logits = journeyCandidates.map((candidate) => candidate.score);
  close(logits, [1.8, 0.5, -0.6]);
  const chosen = journeyCandidates[logits.indexOf(Math.max(...logits))].text;
  assert.equal(
    journeyVocabulary.map((token) => token.text).join("") + chosen,
    "The river bank was",
  );
});

test("visual lessons have complete scenes, illustrations, and working glossary links", () => {
  const terms = new Set(glossary.map((t) => t.term));
  assert.equal(terms.size, glossary.length);
  assert.deepEqual(
    Object.keys(lessons),
    chapters.map((c) => c.id),
  );
  for (const chapter of chapters) {
    const lesson = lessons[chapter.id];
    assert.ok(lesson.intro && lesson.caption && lesson.note);
    assert.ok(lesson.scenes.length >= 6);
    assert.ok(
      lesson.paragraphs.length >= 2 && lesson.observe && lesson.connection,
    );
    assert.ok(lesson.scenes.every((s) => s.title && s.text && s.visual));
    for (const { visual } of lesson.scenes) {
      if (visual.kind === "flow")
        assert.ok(visual.active >= 0 && visual.active < visual.items.length);
      if (visual.kind === "generation")
        assert.ok(
          Number.isInteger(visual.beat) && visual.beat >= 0 && visual.beat <= 6,
        );
      if (visual.kind === "capacity")
        assert.ok(
          Number.isInteger(visual.stage) &&
            visual.stage >= 0 &&
            visual.stage <= 6,
        );
    }
    assert.ok(
      lesson.terms.every((t) => terms.has(t)),
      chapter.id,
    );
    assert.ok(
      existsSync(
        new URL(`../public/illustrations/${chapter.id}.svg`, import.meta.url),
      ),
    );
  }
});

test("device progress loads, deduplicates, and handles unavailable storage", () => {
  const data = new Map();
  const storage = { getItem: (key) => data.get(key) ?? null };
  assert.deepEqual(loadProgress(storage), {
    progress: { read: [], lastChapter: "landscape" },
    available: true,
  });
  data.set(
    PROGRESS_KEY,
    JSON.stringify({ read: ["answer", "answer"], lastChapter: "answer" }),
  );
  assert.deepEqual(loadProgress(storage).progress, {
    read: ["answer"],
    lastChapter: "answer",
  });
  data.set(PROGRESS_KEY, "broken");
  assert.equal(loadProgress(storage).available, false);
  assert.equal(
    loadProgress({
      getItem() {
        throw new Error("denied");
      },
    }).available,
    false,
  );
  assert.throws(() => parseProgress('{"read":[42],"lastChapter":"answer"}'));
});

test("softmax is normalized, stable, and matches the formerly incorrect example", () => {
  const p = softmax([5.8, 2.1, -1.2, -2]);
  assert.ok(Math.abs(p[0] - 0.9746159868481124) < 1e-12);
  assert.ok(Math.abs(p.reduce((s, x) => s + x, 0) - 1) < 1e-12);
  const shifted = softmax([1005.8, 1002.1, 998.8, 998]);
  p.forEach((v, i) => assert.ok(Math.abs(v - shifted[i]) < 1e-12));
  assert.ok(softmax([3, 2, 1], 0.2)[0] > softmax([3, 2, 1], 2)[0]);
  assert.throws(() => softmax([1, 2], 0));
  assert.throws(() => softmax([NaN]));
});
test("seeded sampling is reproducible and conserves the number of draws", () => {
  const a = sampleCounts([0.7, 0.3], 10000, 42);
  assert.deepEqual(a, sampleCounts([0.7, 0.3], 10000, 42));
  assert.equal(a[0] + a[1], 10000);
  assert.ok(Math.abs(a[0] / 10000 - 0.7) < 0.03);
  assert.deepEqual(sampleCounts([1, 0], 100, 42), [100, 0]);
});
test("future positions cannot affect a causal row", () => {
  const weights = attentionWeights([1, 2, 1000], 1);
  assert.equal(weights[2], 0);
  assert.deepEqual(weights, attentionWeights([1, 2, -1000], 1));
  assert.deepEqual(attentionWeights([1, 2, 3], 0), [1, 0, 0]);
  assert.throws(() => attentionWeights([1], 1));
});
test("training improves its own objective, not the deliberately shifted held-out set", () => {
  const initial = trainWeight(0),
    trained = trainWeight(100);
  assert.equal(initial.probability, 0.5);
  assert.ok(trained.trainingLoss < initial.trainingLoss);
  assert.ok(trained.heldOutLoss > initial.heldOutLoss);
  assert.ok(Math.abs(trained.probability - 0.75) < 0.001);
});
test("packing distinguishes selected from included and never exceeds budget", () => {
  const selected = ["instructions", "question", "source", "history", "note"];
  const packed = packContext(selected, 7);
  assert.equal(packed.find((x) => x.id === "source").selected, true);
  assert.equal(packed.find((x) => x.id === "source").included, false);
  assert.ok(
    packed.filter((x) => x.included).reduce((s, x) => s + x.cost, 0) <= 7,
  );
  assert.equal(
    packContext(selected, 8).find((x) => x.id === "source").included,
    true,
  );
  assert.ok(packContext([], 8).every((x) => !x.included));
});
test("all chapters, references, labs, and transfer questions form a complete course", () => {
  assert.equal(chapters.length, 9);
  assert.equal(chapters[0].id, "landscape");
  const ids = new Set(chapters.map((c) => c.id));
  assert.equal(ids.size, chapters.length);
  for (const id of [
    "answer",
    "prediction",
    "training",
    "transformer",
    "assistant",
    "evidence",
    "tools",
    "judgment",
  ])
    assert.ok(ids.has(id), `Existing chapter links still resolve: ${id}`);
  assert.equal(new Set(chapters.map((c) => c.lab)).size, chapters.length);
  for (const c of chapters) {
    assert.ok(c.before.length && c.after.length && c.deeper.paragraphs.length);
    assert.equal(c.challenge.options.filter((o) => o.correct).length, 1);
    assert.ok(c.sources.every((s) => s.url.startsWith("https://")));
  }
  assert.ok(glossary.every((t) => ids.has(t.chapter)));
});
