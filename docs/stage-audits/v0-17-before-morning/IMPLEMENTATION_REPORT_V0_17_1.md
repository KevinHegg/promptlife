# Before Morning Implementation Report v0.17.1

Date: 2026-06-05

## Summary

v0.17.1 implements the Before Morning polish pass from the v0.17 audit. The pass keeps the same Journey order, badge path, progress rules, and checkpoint randomization, while making the first seven Journey cards clearer at mobile width.

## Files Changed

- `src/main.tsx`
- `src/data/content.ts`
- `src/data/exercises.ts`
- `src/components/VisualAids.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/stage-audits/v0-17-before-morning/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-17-before-morning/IMPLEMENTATION_REPORT_V0_17_1.md`
- `docs/stage-audits/v0-17-before-morning/screenshot-index.md`
- New v0.17.1 screenshots in `docs/stage-audits/v0-17-before-morning/screenshots/`

## What Is Done

- Bumped the visible Badge version to `v0.17.1`.
- Removed the duplicate visible `Core idea` heading after the `CORE IDEA` pill across lesson cards.
- Removed repeated path labels from individual Journey card rows while keeping the Journey filters and stage explanation.
- Revised the first seven Before Morning cards:
  - What Is an LLM now includes a concrete prompt-to-next-token trace using the canonical pet-conflict example and `floor`.
  - Rationalists vs Empiricists now uses concrete rules / learned patterns / hybrid-system language.
  - Training now foregrounds predict, compare, loss, update weights, repeat.
  - Pretraining now distinguishes enormous-scale training from perfect recall.
  - Overfitting now makes held-out examples and generalization explicit.
  - Fine-Tuning now contrasts durable adaptation with prompting, RAG, and sampling.
  - Alignment now groups durable shaping, runtime steering, and evaluation while rejecting conscience/magic-morality myths.
- Added/refined tiny interactions for the seven cards without changing saved progress behavior.
- Added internal exercise metadata for the Before Morning cards so `/review/lesson-cards` reflects the revised lesson architecture.
- Preserved RAG and Grounding work already present from earlier passes.
- Added a text-only future asset plan for four Image 2 candidates; no generated PNG assets were created.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
  - Total audited surfaces: 67.
  - Randomized surfaces: 45.
  - Fixed-order exclusions: 22.
  - The six new Before Morning exercises are fixed-order toggle/sort surfaces and do not change the checkpoint randomization model.

## Browser QA

- Opened the local app at `http://localhost:5173/?debug=1`.
- Verified at 390px:
  - Journey row path-label chips are gone.
  - Lesson Core idea duplicate heading is gone.
  - Before Morning revised interactions render and respond.
  - Checkpoint answer order still renders from the randomized choice system.
  - Badge page still has one badge and shows `v0.17.1` under Start over.
  - No browser console errors were reported.
- Verified at 320px:
  - Alignment method chips and bucket labels wrap without horizontal overflow.
  - Text remains readable in the dense interaction state.

## Screenshots Captured

- `screenshots/v0-17-1-before-morning-overview.png`
- `screenshots/v0-17-1-01-what-is-llm-trace.png`
- `screenshots/v0-17-1-02-rationalists-visual.png`
- `screenshots/v0-17-1-03-training-update.png`
- `screenshots/v0-17-1-04-pretraining-myth.png`
- `screenshots/v0-17-1-05-overfitting-generalizing.png`
- `screenshots/v0-17-1-06-fine-tuning-sort.png`
- `screenshots/v0-17-1-07-alignment-groups.png`
- `screenshots/v0-17-1-checkpoint-randomized.png`
- `screenshots/v0-17-1-320-alignment-check.png`
- `screenshots/v0-17-1-badge-version.png`

## Constraints Preserved

- No new Journey cards.
- No new mini-games.
- No generated PNG assets.
- No heavy 3D libraries.
- No checkpoint randomization changes.
- No progress rule changes.
- Only one badge remains: `Prompt Life: Model Literate`.

## Next Three v0.2 Improvements

1. Create the four planned textless Image 2 assets and keep all instructional text in HTML callouts.
2. Add focused regression tests for the new tiny interactions and the answer randomization helper.
3. Add a lightweight mobile screenshot harness for 320px, 390px, and 430px so nav overlap and chip wrapping checks are repeatable.
