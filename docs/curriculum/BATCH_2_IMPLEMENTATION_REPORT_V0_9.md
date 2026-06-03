# Batch 2 Implementation Report v0.9

Date: 2026-06-03

## Summary

Implemented Batch 2 of the Prompt Life curriculum: Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors. This pass also fixed the Batch 1 visual/PDF layout problems by moving long explanations out of SVG labels and into HTML legends with numbered callouts.

## Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/BATCH_2_IMPLEMENTATION_REPORT_V0_9.md`
- `docs/curriculum/BATCH_2_REVIEW_MATRIX_V0_9.md`
- `docs/curriculum/SOURCE_NEEDS_V0_9_BATCH_2.md`
- `docs/curriculum/VISUAL_AID_LAYOUT_RULES_V0_9_BATCH_2.md`
- `docs/curriculum/prompt-life-v0-9-batch-2-report.html`
- `docs/curriculum/prompt-life-v0-9-batch-2-report.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-9-batch-2.pdf`
- `docs/review/prompt-life-lesson-cards-v0-9.pdf`
- `docs/screenshots/v0-9-batch-2-*.png`

## Batch 1 Visual/PDF Problems Fixed

- Rebuilt `traditions` so Rules, If/then, Symbols, Examples, Loss, and Updates are readable and not layered over shapes.
- Rebuilt `training-loop` so Predict, Compare, Loss, Update, and Repeat remain readable at mobile width and in PDF export.
- Rebuilt `overfitting-generalization` with callouts and legend text instead of labels on curves.
- Rebuilt `alignment` with callouts for preferred path, warning zone, policy check, and feedback.
- Added print-specific rules so visual captions and legends stay horizontal, separated, and contained.

## Batch 2 Lessons Implemented

1. Inference
2. Prompt vs Response
3. Tokenization
4. Token IDs
5. Embeddings
6. Vectors
7. Tensors

Each lesson now includes the full app fields where supported: one-sentence definition, core explanation, where it happens, durable versus temporary note, prompt/response note, why it matters, relationship, metaphor, Brain Bridge, misconception, visual aid, glossary terms, checkpoint, and targeted feedback.

## Visual Aids Added Or Changed

- `inference-pass`: current context, fixed weights, temporary states, next-token scores.
- `prompt-response`: canonical dog/cat prompt, generated `yard`, and next-context row.
- `tokenization`: simplified token cards plus real-tokenizer warning.
- `token-ids`: token card to numeric ID to embedding row.
- `embeddings`: embedding table lookup and learned-versus-temporary distinction.
- `vectors`: simplified sliders with distributed-feature warning.
- `tensors`: static tokens x features tensor block for PDF stability.

## Glossary Terms Added Or Improved

- inference
- forward pass
- prompt
- response
- prompt token
- response token
- generated token
- completion
- input context
- token
- tokenizer
- tokenization
- token ID
- embedding
- embedding table
- vector
- feature
- distributed representation
- tensor
- activation
- hidden state
- weight tensor

## Verification

- `npm install`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run export:lesson-pdf`: passed and wrote `docs/review/prompt-life-lesson-cards-v0-9.pdf`.
- `npm run export:lesson-cards`: passed and wrote `docs/content-inventory/prompt-life-lesson-cards-v0-9-batch-2.pdf`.
- In-app browser check: loaded local app and `/review/lesson-cards`; review route showed 28 cards and all seven Batch 2 lessons.
- Mobile overflow audit: passed at 320px, 390px, and 430px for Batch 1 fixed visuals and all Batch 2 lesson visuals.
- PDF visual QA: inspected page 10, `Prompt vs Response`; no clipped visual, vertical captions, or unreadable labels found.
- Screenshots captured for Journey, Batch 1 fixed visuals, Batch 2 lesson visuals, review route, and PDF sample.

## Known Issues

- Tensor remains a static 2D visual in this pass. CSS 3D was deferred because the static diagram is clearer and more reliable in exported PDFs.
- Source review is still needed before publication-final claims about transformer internals, tokenization, embeddings, tensors, and autoregressive generation.

## Next Three Recommended Steps

1. Implement Batch 3 for Attention, MLP, Layers, and Hidden States as a tightly paired transformer-workday section.
2. Add source citations or a bibliography layer for Batch 1 and Batch 2 before broader publication.
3. Add an automated screenshot/overflow script to the repo so future visual-aid changes can be checked without ad hoc CDP scripts.
