# Prompt Life v0.14 Change Log

Date: 2026-06-05

## Summary

v0.14 is the Glossary + Journey Path Clarity pass. It adds Glossary A-Z and Learning path sorting, first-introduced lesson metadata, glossary drawer lesson links, Journey path filters, and path-label cleanup from the v0.13 content-freeze candidate.

## App Changes

- Bumped the visible app version to `v0.14.0`.
- Added Glossary sort modes:
  - `A-Z`
  - `Learning path`
- Made `A-Z` the default Glossary mode.
- Added helper text for each Glossary sort mode.
- Added search reset behavior.
- Added learning-path grouping by Journey section.
- Added first-introduced lesson metadata for glossary cards and drawer content.
- Added `Open lesson` from glossary drawer.
- Preserved progress behavior:
  - completed lessons open from the drawer in Review mode
  - incomplete/future lessons open from the drawer in Preview mode
  - glossary navigation does not complete lessons
- Added Journey filters:
  - All
  - Essential
  - Deep
  - Ethics
- Updated path labels so Essential is a shorter 27-card path.
- Kept Preview/Review copy unchanged because it already matched the acceptance criteria:
  - Preview: `Previewing this card. Progress will not change.`
  - Review: `Reviewing a completed card.`
  - Bottom action: `Return to Journey`

## Files Changed

- `src/main.tsx`
- `src/data/content.ts`
- `src/styles/global.css`
- `README.md`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/GLOSSARY_ORDERING_V0_14.md`
- `docs/curriculum/JOURNEY_PATH_FILTERS_V0_14.md`
- `docs/curriculum/V0_14_CHANGE_LOG.md`
- `docs/curriculum/prompt-life-v0-14-glossary-journey-report.html`
- `docs/curriculum/prompt-life-v0-14-glossary-journey-report.pdf`
- `docs/screenshots/v0-14-*.png`

## Verification

- `npm install`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 320, 390, and 430px found no horizontal overflow in Glossary A-Z, Glossary Learning path, Glossary search with Learning path active, and all Journey filters.
- Browser QA verified glossary drawer metadata, Preview mode from a glossary link, Review mode from a glossary link after completing one lesson, Journey All/Essential/Deep/Ethics filters, and the Return to Journey control.

## Constraints Kept

- No new games added.
- No generated PNG assets added.
- No heavy 3D libraries added.
- No learner-facing PDF feature added.

## Known Issues

- The Glossary sort preference intentionally resets to `A-Z`; it is not stored.
- The app still has a single Vite JavaScript chunk above 500 kB after minification.
- Ethics/Society cards still need source review before v1 publication language.
