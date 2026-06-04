# Visual System Reset v0.9.3

Date: 2026-06-03

## Summary

This pass creates a stricter reusable visual-aid pattern and rebuilds RAG and Retrieval as the gold-standard example. It also lightly applies the pattern to the worst existing visuals without starting Batch 3.

## Is RAG Stale Or Unrepaired?

RAG is current in the repo, but visually unrepaired. The lesson exists as `rag-retrieval`, appears in the Journey after Context Window, and uses the current review route data. The issue is not a stale deployed card in source; it is that v0.9.2 focused mainly on Batch 1 and Batch 2 visuals, while RAG still used the older mini-infographic visual style.

Before v0.9.3, the RAG lesson also had thinner app fields than the repaired Batch 1 and Batch 2 lessons. It had a definition, where/why/relationship copy, Brain Bridge, and quiz, but was missing explicit `durableVsTemporary`, `promptVsResponseNote`, `coreExplanation`, and related review fields.

## Visual Aid System Changes

- Added a reusable `VisualAidCard` structure with `DiagramScene`, `CalloutList`, and `KeyTakeaway`.
- Added visual metadata fields for learning objective, accessible description, and print/PDF notes.
- Kept SVG scenes short and structural while moving explanations to HTML callouts.
- Improved `/review/visual-aids` so each card shows visual id, lesson, scene, callouts, accessible description, mobile preview note, and print/PDF notes.

## RAG Repair Details

Title: Open-Book Retrieval.

Learning objective: show that RAG retrieves information and places it into context; it does not train the model.

Diagram zones:

1. Prompt
2. Retriever
3. Notes
4. Context
5. Response

Callouts:

1. Ask: The user prompt starts the run.
2. Retrieve: A search system finds relevant outside material.
3. Add to context: Retrieved notes become temporary context tokens.
4. Generate: The model still generates response tokens one at a time.
5. Weights stay fixed: RAG does not normally update model weights.

Key takeaway: RAG is retrieval plus context, not training.

## RAG Lesson Content Changes

- Added the full one-sentence definition, core explanation, where-it-happens field, durable-vs-temporary field, prompt-vs-response note, why-it-matters field, how-it-connects field, metaphor, Brain Bridge, misconception, checkpoint aliases, and feedback aliases.
- Clarified that RAG happens during inference before or during response generation.
- Clarified that retrieved material becomes prompt/context tokens.
- Clarified that the answer is still generated as response tokens one at a time.
- Clarified that RAG is not training, permanent memory, consciousness, or a truth guarantee.

## Exercise Update

The `Open Book or Learned?` exercise now uses:

- Learned in weights: Pretraining on many documents; Fine-tuning a support assistant.
- Placed in context: Retrieved policy PDF; Search result snippet; System instruction; User prompt.
- Generated response: Generated answer paragraph; Generated citation.

Insight: RAG is like an open-book exam. The book enters context; it is not permanently inside the model.

## Screens And PDFs

Final screenshot and PDF outputs are generated in:

- `docs/screenshots/v0-9-3-rag-gold-standard.png`
- `docs/screenshots/v0-9-3-visual-gallery.png`
- `docs/screenshots/v0-9-3-training-loop-repaired.png`
- `docs/screenshots/v0-9-3-prompt-response-repaired.png`
- `docs/screenshots/v0-9-3-pdf-sample-rag.png`
- `docs/content-inventory/prompt-life-lesson-cards-v0-9-3-visual-system.pdf`
- `docs/review/prompt-life-lesson-cards-v0-9-3.pdf`

## Verification

- `npm install`: passed; dependencies already up to date, 0 vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- `npm run export:lesson-pdf`: passed and wrote `docs/review/prompt-life-lesson-cards-v0-9-3.pdf`.
- `npm run export:lesson-cards`: passed and wrote `docs/content-inventory/prompt-life-lesson-cards-v0-9-3-visual-system.pdf`.
- In-app browser QA: `/review/visual-aids#rag-retrieval` shows the gold-standard RAG visual, five callouts, accessible description, and no horizontal overflow.
- In-app browser QA: `/review/lesson-cards?print=1#rag-retrieval` shows durable-vs-temporary and prompt-vs-response fields, with no missing durable field fallback.
- Mobile width QA: 320px, 390px, and 430px passed for RAG, Training Loop, Prompt vs Response, visual gallery, and the RAG lesson-card sample.
- Screenshot QA: captured the requested v0.9.3 screenshots in `docs/screenshots/`.
- Visual human spot-check: RAG, Training Loop, and Prompt vs Response screenshots were inspected after capture.

## Ready For Batch 3?

Not yet by default. The visual system is now a stronger foundation for Batch 3, but the v0.9.3 acceptance check should pass first: build, export, mobile screenshots, RAG visual review, and main-branch deploy.

## Next Three Recommended Steps

1. Use the RAG pattern as the model for Attention, MLP, Layers, and Hidden States in Batch 3.
2. Add source citations before publication-final transformer and RAG claims.
3. Convert the remaining older visuals to the strict card/scene/callout/takeaway pattern over time.
