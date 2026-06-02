# Content Repair v0.6

Date: 2026-06-02

## Scope

v0.6 is a repair pass, not a new-game pass. It improves the existing Prompt Life app around content clarity, mobile ergonomics, review/export routes, and visual explanation.

## Main Changes

- Rebuilt the Journey lesson set around the requested 25 concepts: LLM basics, AI traditions, training, pretraining, fine-tuning, inference, prompt versus response, tokenization, token IDs, embeddings, vectors, tensors, attention, MLP, layers, hidden states, logits, softmax, sampling, autoregression, context window, how AI learns, diffusion, multimodal AI, and risk versus myth.
- Removed Alignment, Vocabulary Cloud, and Brain Metaphor Limits as standalone Journey lessons so the required concept list stays at 25 lessons.
- Preserved those ideas inside lessons:
  - Alignment remains in glossary context and fine-tuning behavior.
  - Vocabulary cloud remains inside logits, softmax, and sampling.
  - Brain metaphor limits now appear in every lesson through Brain Bridge.
- Standardized each lesson around:
  - concept title
  - one-sentence definition
  - where it happens
  - why it matters
  - relationship line
  - metaphor
  - Brain Bridge with explicit limit
  - visual aid
  - tiny interaction
  - checkpoint/reflection
- Simplified Journey lessons so they teach first. Reusable exercises remain in Play, Prompt Run, and How AI Learns.

## Copy Repairs

- Removed ordinary user-facing references to leaderboards, localStorage internals, old feature names, and internal product language.
- Kept diagnostics copy behind `?debug=1`.
- Changed Badge copy to emphasize model literacy progress and remaining learning criteria.
- Kept tone concise, warm, and mechanism-first.

## Mobile Shell Repairs

- Moved the app to a fixed-height mobile shell with internal scrolling.
- Added safe-area-aware bottom padding and a frosted bottom nav gradient.
- Added scroll-to-top behavior when changing main tabs, lessons, Prompt Run steps, and How AI Learns cards.
- Documented browser limitations for true iPhone testing in the QA checklist.

## Source Notes

- `docs/HOW_AI_LEARNS_SIDE_TOUR.md` was referenced in the brief but is not present in the repo. The pass used the existing `learningModes` content, `docs/PRODUCT_BLUEPRINT.md`, `docs/PLAY_MODE_V0_5.md`, and `docs/ANIMATION_SYSTEM.md` as the source context.

## Verification Targets

- `npm run typecheck`
- `npm run build`
- `npm run export:lesson-pdf`
- 320px, 390px, 430px, and desktop screenshots
- Mobile Safari/Chrome manual test from the deployed `main` branch
