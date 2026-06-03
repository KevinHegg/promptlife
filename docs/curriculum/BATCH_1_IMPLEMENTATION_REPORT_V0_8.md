# Batch 1 Implementation Report v0.8

Date: 2026-06-02

## What Changed

- Implemented Batch 1 of the v0.7 curriculum plan in the live Journey data.
- Rewrote the first foundation lessons around model lifecycle placement, durable versus temporary behavior, prompt versus response, metaphor, Brain Bridge, misconception, and visual aid.
- Renamed the existing `history` lesson to `Rationalists vs Empiricists` while preserving the id so existing progress remains intact.
- Added two new Journey lessons: `overfitting-generalization` and `alignment`.
- Added lightweight SVG visual aids for LLM overview, AI traditions, broad pretraining, overfitting/generalization, and alignment.
- Expanded the glossary for Batch 1 vocabulary, including rationalism, empiricism, loss, weight update, training data, validation data, generalization, overfitting, adapter, instruction tuning, human feedback learning, RLHF, preference optimization, policy, guardrail, and evaluation.
- Updated the lesson screen and review route so Batch 1 fields are visible in the app and PDF export.
- Bumped the visible app version to `v0.8.0`.

## Files Changed

- `package.json`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/main.tsx`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/BATCH_1_IMPLEMENTATION_REPORT_V0_8.md`
- `docs/curriculum/BATCH_1_REVIEW_MATRIX_V0_8.md`
- `docs/curriculum/SOURCE_NEEDS_V0_8_BATCH_1.md`
- `docs/curriculum/prompt-life-v0-8-batch-1-report.html`
- `docs/curriculum/prompt-life-v0-8-batch-1-report.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-8-batch-1.pdf`
- `docs/screenshots/v0-8-batch-1-*.png`

## Batch 1 Lessons Implemented

1. What Is an LLM?
2. Rationalists vs Empiricists
3. Training
4. Pretraining
5. Overfitting and Generalization
6. Fine-Tuning
7. Alignment

## New or Changed Visual Aids

- `llm-overview`: prompt/context to learned weights to next-token probabilities to generated response token.
- `traditions`: symbolic/rationalist rulebook side beside deep-learning/empiricist learned-pattern side.
- `training-loop`: predict, compare, loss, update weights, repeat.
- `pretraining-rain`: data stream shaping broad durable model landscape.
- `overfitting-generalization`: overfit curve versus generalized curve on new examples.
- `fine-tune-path`: targeted path through pretrained base with future responses shaped.
- `alignment`: response landscape with preferred path, warning zone, policy check, feedback, and no-moral-agency label.

## Glossary Terms Added or Improved

- LLM
- rationalism
- empiricism
- symbolic AI
- deep learning
- training
- pretraining
- loss
- weight update
- parameter
- training data
- validation data
- generalization
- overfitting
- fine-tuning
- adapter
- alignment
- instruction tuning
- human feedback learning
- RLHF
- preference optimization
- policy
- guardrail
- evaluation

## Verification

- `npm install`: passed, already up to date.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run export:lesson-cards`: passed; wrote `docs/content-inventory/prompt-life-lesson-cards-v0-8-batch-1.pdf`.
- Mobile screenshot QA: passed at 390px for requested screens.
- 390px and 320px overflow checks: passed for the first seven lessons.
- Reset QA: passed in an isolated browser session; progress reset to 0 and the app returned to Home.
- Review route QA: passed; first cards are What Is an LLM?, Rationalists vs Empiricists, Training, Pretraining, Overfitting and Generalization, Fine-Tuning, Alignment, and Inference.

## Screenshots Captured

- `docs/screenshots/v0-8-batch-1-journey-top.png`
- `docs/screenshots/v0-8-batch-1-what-is-llm-top.png`
- `docs/screenshots/v0-8-batch-1-rationalists.png`
- `docs/screenshots/v0-8-batch-1-training-visual.png`
- `docs/screenshots/v0-8-batch-1-overfitting-visual.png`
- `docs/screenshots/v0-8-batch-1-fine-tuning.png`
- `docs/screenshots/v0-8-batch-1-alignment.png`
- `docs/screenshots/v0-8-batch-1-brain-bridge.png`
- `docs/screenshots/v0-8-batch-1-checkpoint-correct.png`
- `docs/screenshots/v0-8-batch-1-checkpoint-wrong.png`
- `docs/screenshots/v0-8-batch-1-review-route.png`

## Known Issues

- The `history` id is intentionally preserved for progress compatibility even though the learner-facing title is now `Rationalists vs Empiricists`.
- Source review remains needed before treating the symbolic AI, optimization, pretraining, fine-tuning, and alignment language as publication-final.
- The Batch 1 Journey cards use existing micro-interactions rather than new custom exercise types.

## Next Three Recommended Steps

1. Implement Batch 2 for prompt arrival and numerical representation: Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
2. Add source citations or a bibliography layer for Batch 1 before wider publication.
3. Add a lightweight automated route check for the first seven lessons, review route, glossary drawer, and Badge denominator.
