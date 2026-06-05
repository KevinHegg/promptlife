# Prompt Life v0.15 Change Log

Date: 2026-06-05

## Summary

v0.15 is the Journey Narrative Architecture pass. It keeps the 38-card curriculum but replaces the old six-section map with an eight-section day structure, splits the broad final Wider AI Literacy section, adds clickable stage navigation, and updates Glossary Learning path grouping.

## App Changes

- Bumped the visible app version to `v0.15.0`.
- Replaced the six-section Journey architecture with eight sections.
- Split late Journey cards into:
  - Twilight: The Wider Landscape
  - Midnight Ledger
  - New Dawn
- Reordered existing late Journey cards so Learn mode and Next Lesson follow the new narrative.
- Added clickable stage links on the Journey screen.
- Added stage hints and two-row mobile layout for the eight section links.
- Hid empty sections and stage links under Journey filters.
- Updated Journey filter helper copy for the full-day metaphor.
- Updated Glossary Learning path grouping to the new section names.
- Added light CSS motifs for Twilight, Midnight Ledger, and New Dawn section intro cards.

## Files Changed

- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `README.md`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/JOURNEY_SECTION_RESTRUCTURE_V0_15.md`
- `docs/curriculum/V0_15_CHANGE_LOG.md`

## Verification

- `npm install`: passed.
- Baseline `npm run typecheck`: passed.
- Baseline `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run typecheck`: passed.
- Final `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 320, 390, and 430px found no horizontal overflow in Journey All, Essential, Deep, or Ethics filters.
- Browser QA verified stage jumps, late-section screenshots, Glossary Learning path grouping, and Preview/Return behavior from a New Dawn card.

## Constraints Kept

- No new games added.
- No generated PNG assets added.
- No heavy 3D libraries added.
- No learner-facing PDF feature added.
- No new Journey content added.

## Known Issues

- The app still has a single Vite JavaScript chunk above 500 kB after minification.
- Midnight Ledger and New Dawn cards remain careful draft language pending source review.
- Prompt Injection / Tool Risk remains inside Risk vs Myth rather than a dedicated card.
