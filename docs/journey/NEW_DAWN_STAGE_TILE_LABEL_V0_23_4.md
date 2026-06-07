# New Dawn Stage Tile Label v0.23.4

Date: 2026-06-07

## Summary

Updated the Journey stage-grid subtitle for stage 8, New Dawn, from `Better human use` to `Human centered AI`.

## What Changed

- Changed the New Dawn grid subtitle to `Human centered AI`.
- Aligned the New Dawn fallback nav hint and aria label with the new subtitle.
- Bumped the visible app version to `v0.23.4`.

## Files Changed

- `src/data/content.ts`
- `src/main.tsx`
- `docs/REVIEW_NOTES.md`
- `docs/journey/NEW_DAWN_STAGE_TILE_LABEL_V0_23_4.md`
- `docs/journey/prompt-life-v0-23-4-new-dawn-stage-tile-label-report.html`
- `docs/journey/prompt-life-v0-23-4-new-dawn-stage-tile-label-report.pdf`
- `docs/journey/screenshots/v0-23-4-new-dawn-label-390.jpg`
- `docs/journey/screenshots/v0-23-4-new-dawn-label-320.jpg`

## Mobile QA

- 390px: New Dawn tile shows `Human centered AI`; no horizontal overflow.
- 320px: New Dawn tile shows `Human centered AI`; no subtitle overflow.
- Stage links remain buttons with accessible labels.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Known Issues

- The existing Vite large-chunk warning remains.
