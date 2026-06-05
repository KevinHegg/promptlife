# Prompt Life v0.13 Change Log

Date: 2026-06-04

## Summary

v0.13 is the Whole Journey Review and Content Freeze Candidate pass. It adds dedicated Grounding and Hallucinations Journey cards after RAG, improves the review route metadata, creates the required curriculum review documents, and bumps the visible app version to `v0.13.0`.

## App Changes

- Added Journey card 25, `Grounding`, after `RAG and Retrieval`.
- Added Journey card 26, `Hallucinations`, after `Grounding`.
- Added coded SVG visual aid `grounding-evidence`.
- Added coded SVG visual aid `hallucination-bridge`.
- Added glossary term `Citation`.
- Bumped `APP_VERSION` to `0.13.0`.
- Expanded `/review/lesson-cards` metadata with:
  - path label
  - keep/revise/defer recommendation
  - source-needed flag
  - visual-needed flag
  - core objective
  - explicit review recommendation detail
- Fixed standalone review route scrolling on mobile-height browser windows so `/review/lesson-cards` and `/review/visual-aids` are usable beyond the first viewport.
- Kept implementation lightweight: no new games, no generated PNG assets, no heavy 3D libraries, and no learner-facing PDF feature.

## Curriculum Documents Added

- `docs/curriculum/JOURNEY_REVIEW_V0_13.md`
- `docs/curriculum/CONTENT_FREEZE_CANDIDATE_V0_13.md`
- `docs/curriculum/SOURCE_REVIEW_PLAN_V0_13.md`
- `docs/curriculum/V0_13_CHANGE_LOG.md`

## Review Documents Updated

- `docs/REVIEW_NOTES.md`
- `README.md`

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- Browser QA at 390px verified Journey placement, Grounding preview mode, glossary term presence, Badge version placement, review-route metadata, and review-route scrolling.
- Build warning: Vite still reports a single JS chunk over 500 kB. This warning existed before v0.13 and no heavy dependency was added.

## Follow-Up

1. Add path filtering or a lighter required-core progression before v1, so 38 cards do not feel mandatory.
2. Run the source review plan for ethics/society and environmental/labor/legal claims.
3. Tighten How AI Learns and Risk vs Myth now that RAG, Grounding, and Hallucinations are dedicated cards.
