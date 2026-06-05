# Prompt Life v0.16 Change Log

Date: 2026-06-05

## Summary

v0.16 is the Source Review + Late-Day Copy Discipline pass. It tightens Midnight Ledger and New Dawn so the app remains honest about costs, benefits, human-centered AI, governance, data, labor, infrastructure, and responsible choices without becoming a policy encyclopedia.

## App Changes

- Bumped the visible app version to `v0.16.0`.
- Added `src/data/sourceRegistry.ts` with:
  - source registry entries,
  - source review status for late-day cards,
  - source IDs and caveat notes.
- Updated the internal `/review/lesson-cards` route to show:
  - source status,
  - source IDs,
  - source titles,
  - caveat notes.
- Tightened learner-facing copy for:
  - Collective Intelligence, Extracted
  - Costs We Must Count
  - Risk vs Myth
  - Benefits Worth Taking Seriously
  - Human-Centered AI
  - Better AI Is a Choice
  - Effective Prompting from Model Literacy
  - Model Literate Synthesis
- Added or improved glossary support for:
  - source review
  - environmental footprint
  - e-waste
  - accountability

## Source Discipline

- No precise energy or water statistics were added to learner-facing cards.
- No unverified papal encyclical claim was added.
- `Antiqua et nova` is treated as a verified Vatican note on AI and human intelligence, not an encyclical.
- Pope Leo XIV's `Magnifica Humanitas` is verified in the internal source registry but not added to learner-facing app copy.
- Benefits language now uses demonstrated / plausible / speculative tiers.
- Costs language now stresses variation by model, workload, hardware, cooling, region, electricity source, and deployment choices.

## Files Changed

- `src/data/content.ts`
- `src/data/sourceRegistry.ts`
- `src/main.tsx`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/SOURCE_REGISTRY_V0_16.md`
- `docs/curriculum/SOURCE_REVIEW_V0_16.md`
- `docs/curriculum/V0_16_CHANGE_LOG.md`
- `docs/curriculum/prompt-life-v0-16-source-review-report.html`
- `docs/curriculum/prompt-life-v0-16-source-review-report.pdf`
- `docs/screenshots/v0-16-midnight-ledger-section.png`
- `docs/screenshots/v0-16-collective-core-copy.png`
- `docs/screenshots/v0-16-new-dawn-section.png`
- `docs/screenshots/v0-16-benefits-core-copy.png`
- `docs/screenshots/v0-16-review-source-status.png`
- `docs/screenshots/v0-16-glossary-source-review.png`

## Constraints Kept

- No new Journey cards added.
- No new games added.
- No generated PNG assets added.
- No heavy 3D libraries added.
- No learner-facing PDF feature added.
- No curriculum expansion beyond source discipline, glossary support, and wording fixes.

## Verification

- Baseline `npm install`: passed.
- Baseline `npm run typecheck`: passed.
- Baseline `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run typecheck`: passed.
- Final `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 390px: passed for Midnight Ledger, New Dawn, revised lesson previews, internal source-review fields, glossary drawer, Journey filters, Preview/Review/Learn modes, and Journey bottom-nav return-to-top.
- Source/copy scans: passed. No learner-facing precise energy/water statistics, unverified papal AI-encyclical claim, or internal source labels appear outside the review route.
- Wrapped report PDF: `docs/curriculum/prompt-life-v0-16-source-review-report.pdf`.

## Known Issues

- The app still has a single Vite JavaScript chunk above 500 kB after minification.
- Source-needed placeholders remain for data provenance / consent / compensation, task-specific benefit evidence, and deskilling / authentic-learning evidence.
