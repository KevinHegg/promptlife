# Wider AI Literacy Implementation Report v0.12

Date: 2026-06-04

## Summary

v0.12 implements the v0.11 Wider AI Literacy planning pass as draft Journey cards, adds Preview/Review behavior, repairs scroll-to-top behavior for lesson navigation, improves contrast on key learner-facing controls, expands the glossary, and adds coded placeholder visual aids. No generated PNG assets, new games, learner-facing PDF features, or heavy 3D libraries were added.

## New Journey Cards

Added eight draft cards in the Wider AI Literacy section:

1. The Perfect Storm
2. Collective Intelligence, Extracted
3. Benefits Worth Taking Seriously
4. Costs We Must Count
5. Human-Centered AI
6. Better AI Is a Choice
7. Effective Prompting from Model Literacy
8. Model Literate Synthesis

Placement: after How AI Learns, Diffusion, and Multimodal AI, with Risk vs Myth retained before the final Model Literate Synthesis card. RAG and Retrieval remains a dedicated Journey card earlier in The Day Repeats.

## Preview And Review Mode

- Learn mode is used for the current active lesson. Checkpoint completion can update saved progress.
- Preview mode is used for future incomplete cards. It shows: "Previewing this card. Progress will not change."
- Review mode is used for completed cards. It shows: "Reviewing a completed card."
- Preview/Review mode uses a "Return to Journey" action.
- Preview/Review mode does not call lesson completion or reflection persistence paths.
- Stale saved lesson IDs are normalized so future incomplete cards reopen as Preview, not accidental Learn.

## Scroll And Focus

- Lesson, tab, mode, and game changes scroll the app's internal `.pl-shell` container to top.
- Focus moves to the lesson or screen heading after navigation where practical.
- Smooth scrolling respects `prefers-reduced-motion`.
- Manual QA verified Preview, Review, and Learn → Next Lesson open at the top after motion settles.

## Contrast And Style Fixes

- Added utility classes: `.pl-on-dark`, `.pl-on-paper`, `.pl-muted-on-paper`, and `.pl-callout-text`.
- Changed the primary button gradient to a dark indigo/teal range so white text stays on dark surfaces.
- Changed stage active badges and completed dots to use dark ink instead of white on bright teal.
- Added readable Journey row number/action/path chips.
- Added readable Preview/Review mode notes.
- Patched visual labels where light diagram boxes previously inherited white labels.

Known remaining contrast follow-up: older concept animation panels still use the previous deep-blue animation surface language. They are readable, but a future animation-focused pass should migrate them into the v0.10 visual identity system.

## Coded Visual Aids

Added placeholder coded visual aids:

- `perfect-storm`
- `collective-intelligence-lantern`
- `benefits-tool-garden`
- `costs-invisible-factory`
- `human-centered-ai-garden`
- `responsible-ai-forked-path`
- `prompting-context-tray`
- `synthesis-map-compass-lantern`

These use short SVG labels with explanatory HTML callouts. No generated PNG assets were added.

## Glossary Additions

Added or improved concise terms for the wider literacy section, including perfect storm, collective intelligence, data provenance, consent, compensation, human feedback labor, compute, data center, energy use, water use, carbon emissions, copyright, labor disruption, deskilling, human-centered AI, dignity, common good, governance, responsible AI, model distillation, efficient inference, effective prompting, human review, uncertainty, accessibility, translation, summarization, and model literacy.

## Badge Update

The Badge threshold now focuses on:

- enough Essential lesson checkpoints,
- Prompt Run completion,
- Model Literate Synthesis completion.

Mini-game insights are still tracked but no longer block the badge.

## Verification

- `npm install`: passed before implementation.
- `npm run typecheck`: passed before and after implementation.
- `npm run build`: passed before and after implementation.
- Browser QA on `http://localhost:5174/`: Preview, Review, Learn completion, Next Lesson, Return to Journey, focus, and top-scroll behavior verified.

Build note: Vite reports the single app chunk is over 500 kB after minification. This is a warning, not a failure, and no new heavy dependency was added.

## Screenshots

Saved screenshots:

- `docs/screenshots/v0-12-journey-wider-ai-section.png`
- `docs/screenshots/v0-12-review-mode.png`
- `docs/screenshots/v0-12-perfect-storm-preview.png`
- `docs/screenshots/v0-12-collective-intelligence-preview.png`
- `docs/screenshots/v0-12-costs-we-must-count-preview.png`
- `docs/screenshots/v0-12-human-centered-ai-preview.png`
- `docs/screenshots/v0-12-better-ai-choice-preview.png`
- `docs/screenshots/v0-12-model-literate-synthesis-preview.png`
- `docs/screenshots/v0-12-visual-aid-perfect-storm-gallery.png`

## Known Issues

- Grounding and Hallucinations are glossary concepts and RAG callouts, but not yet dedicated Journey cards. TODO: decide whether they deserve Journey cards before or near Risk vs Myth.
- Wider AI cards are draft curriculum copy and need source review before being treated as cited publication material.
- Generated PNG assets remain planned only.
- Chunk-size warning suggests future code-splitting or route-splitting work.

## Next Three Recommended Steps

1. Source-review the Wider AI cards and replace cautious placeholders with dated, scoped citations where appropriate.
2. Add dedicated Grounding and Hallucinations Journey cards if the curriculum architecture still calls for them.
3. Do a visual refinement pass on the eight new coded aids after reviewing screenshots on iPhone.
