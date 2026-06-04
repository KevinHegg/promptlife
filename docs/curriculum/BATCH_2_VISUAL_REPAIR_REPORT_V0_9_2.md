# Batch 2 Visual Repair Report v0.9.2

Date: 2026-06-03

## Summary

This pass repairs the Batch 1 and Batch 2 visual/text alignment issues found in human review. It also replaces the weak incomplete dog/cat example with a centralized canonical prompt/response pair that keeps the distinction between user prompt, response-so-far, next token, and next context clear.

No new games, heavy 3D libraries, or Journey architecture rebuilds were added.

## Canonical Example Changes

- Added `src/data/canonicalExamples.ts` as the shared source.
- User prompt: `Give me one sentence with two household pets in conflict.`
- Generated response: `A jealous dog chased a startled cat across the kitchen floor.`
- Response so far: `A jealous dog chased a startled cat across the kitchen`
- Next-token candidates: `floor`, `room`, `tiles`, `counter`, `quantum`, `elephant`
- Chosen token: `floor`
- Attention-only variant: `A jealous dog chased a startled cat because it hissed.`

## Visual Aid Fixes

- Rebuilt Training Loop as five clean steps: Predict, Compare, Loss, Update weights, Repeat.
- Rebuilt Rationalists vs Empiricists as two panels plus bridge copy.
- Simplified Overfitting and Generalization into a clean plot with legend text outside the SVG.
- Simplified Alignment into a response landscape with numbered callouts.
- Reworked Inference around `context -> temporary states -> scores -> next token` and `weights fixed`.
- Replaced Prompt vs Response with the canonical complete user prompt, response-so-far tokens, `floor`, and next context.
- Updated Tokenization, Token IDs, Embeddings, Vectors, and Tensors to use the canonical response and stable mobile/PDF-safe layouts.
- Added review-route anchors so screenshots can target specific lesson and visual-aid cards.

## Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `src/components/ConceptAnimations.tsx`
- `src/components/ExerciseSystem.tsx`
- `src/components/VisualAids.tsx`
- `src/data/canonicalExamples.ts`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/data/promptRun.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/CANONICAL_EXAMPLES_V0_9_2.md`
- `docs/curriculum/VISUAL_AID_QA_V0_9_2.md`
- `docs/curriculum/BATCH_2_VISUAL_REPAIR_REPORT_V0_9_2.md`
- `docs/curriculum/prompt-life-v0-9-2-visual-repair-report.html`
- `docs/curriculum/prompt-life-v0-9-2-visual-repair-report.pdf`
- `docs/review/prompt-life-lesson-cards-v0-9-2.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-9-2-visual-repair.pdf`
- `docs/screenshots/v0-9-2-*.png`

## Screenshots And PDFs To Review

- `docs/screenshots/v0-9-2-training-loop-fixed.png`
- `docs/screenshots/v0-9-2-prompt-response-fixed.png`
- `docs/screenshots/v0-9-2-tokenization-fixed.png`
- `docs/screenshots/v0-9-2-token-ids-fixed.png`
- `docs/screenshots/v0-9-2-embeddings-fixed.png`
- `docs/screenshots/v0-9-2-vectors-fixed.png`
- `docs/screenshots/v0-9-2-tensors-fixed.png`
- `docs/screenshots/v0-9-2-review-pdf-sample.png`
- `docs/review/prompt-life-lesson-cards-v0-9-2.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-9-2-visual-repair.pdf`

## Verification Results

- `npm install`: passed; dependencies already up to date, 0 vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- `npm run export:lesson-pdf`: passed and wrote `docs/review/prompt-life-lesson-cards-v0-9-2.pdf`.
- `npm run export:lesson-cards`: passed and wrote `docs/content-inventory/prompt-life-lesson-cards-v0-9-2-visual-repair.pdf`.
- In-app browser review route QA: found all repaired visual sections and confirmed the canonical prompt and generated response text appear.
- Mobile visual-card overflow QA: passed at 320px, 390px, and 430px for Training Loop, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- Screenshot QA: saved targeted 390px visual-card screenshots in `docs/screenshots/`.
- PDF sample QA: saved a 390px print-route sample of the Prompt vs Response lesson card, which is the route used for the exported lesson-card PDF.

## Known Remaining Issues

- Source review is still needed before publication-final claims about transformer internals.
- Tensor structure remains 2D for PDF reliability. A future 3D tensor can be added only if it has a clean print fallback.
- Real iPhone Safari testing remains the final check after the `main` branch deploys.

## Ready For Batch 3?

Yes, after final verification passes. Batch 3 should begin with Attention, MLPs, Layers, and Hidden States, using this canonical example as the shared thread where it still fits.

## Next Three Recommended Steps

1. Implement Batch 3 as a tightly paired transformer-workday section: Attention, MLP, Layers, and Hidden States.
2. Add source citations or bibliography notes for Batch 1 and Batch 2 concepts before broad publication.
3. Add a reusable screenshot/overflow script so future visual-aid repairs can be tested more consistently.
