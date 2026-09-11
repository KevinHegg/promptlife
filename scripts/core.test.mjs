import test from "node:test";
import assert from "node:assert/strict";
import {
  softmax,
  sampleCounts,
  attentionWeights,
  trainWeight,
  packContext,
} from "../src/book/model.ts";
import {
  emptyNotebook,
  parseNotebook,
  mergeNotebook,
} from "../src/book/storage.ts";
import { chapters, glossary } from "../src/book/content.ts";
import { encode, decode } from "gpt-tokenizer/encoding/cl100k_base";

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
test("real tokenization round-trips punctuation, whitespace, Unicode, and literal special text", () => {
  for (const text of ["A  dog.", "こんにちは世界", "🧠 café", "<|endoftext|>"])
    assert.equal(decode(encode(text, { disallowedSpecial: new Set() })), text);
  assert.ok(encode("A dog").length > 0);
});
test("notebook export is readable and imports preserve existing work", () => {
  const original = {
    ...emptyNotebook(),
    notes: { answer: "My first explanation" },
    bookmarks: ["answer"],
  };
  const incoming = {
    ...emptyNotebook(),
    notes: { answer: "Another explanation", evidence: "Check the source" },
    bookmarks: ["evidence"],
  };
  const merged = mergeNotebook(
    original,
    parseNotebook(JSON.stringify(incoming)),
  );
  assert.ok(merged.notes.answer.includes("My first explanation"));
  assert.ok(merged.notes.answer.includes("Another explanation"));
  assert.equal(merged.notes.evidence, "Check the source");
  assert.deepEqual(merged.bookmarks, ["answer", "evidence"]);
  assert.deepEqual(parseNotebook(JSON.stringify(merged)), merged);
  assert.deepEqual(mergeNotebook(merged, incoming), merged);
  assert.throws(() =>
    mergeNotebook(
      { ...original, notes: { answer: "a".repeat(20000) } },
      incoming,
    ),
  );
  assert.throws(() => parseNotebook('{"version":2}'));
  assert.throws(() =>
    parseNotebook(JSON.stringify({ ...original, notes: { answer: 42 } })),
  );
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
    assert.ok(
      ids.has(id),
      `Existing links and notebook entries still resolve: ${id}`,
    );
  assert.equal(new Set(chapters.map((c) => c.lab)).size, chapters.length);
  for (const c of chapters) {
    assert.ok(c.before.length && c.after.length && c.deeper.paragraphs.length);
    assert.equal(c.challenge.options.filter((o) => o.correct).length, 1);
    assert.ok(c.sources.every((s) => s.url.startsWith("https://")));
  }
  assert.ok(glossary.every((t) => ids.has(t.chapter)));
});
