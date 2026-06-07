# Stage Grid Labels v0.23.1

Date: 2026-06-07

## Summary

This small polish pass shortens only the display labels used in the tappable Journey stage grid. Full stage names remain available in section headers, lesson context, and accessible labels.

No Journey card content, Journey order, progress logic, badge logic, games, generated assets, dependencies, or checkpoint randomization changed.

## Final Stage Grid Labels

| Number | Tile title | Tile subtitle | Full stage name preserved elsewhere |
| --- | --- | --- | --- |
| 1 | Before Morning | Model shaped before use | Before Morning |
| 2 | Morning Commute | Text becomes numbers | Morning Commute |
| 3 | Workday | Layers process context | Workday |
| 4 | Decision Room | One token is chosen | Decision Room |
| 5 | Day Repeats | Context grows + expires | The Day Repeats |
| 6 | Twilight | Wider AI landscape | Twilight: The Wider Landscape |
| 7 | Midnight Ledger | Costs and shadows | Midnight Ledger |
| 8 | New Dawn | Better human use | New Dawn |

## Implementation Notes

- Added `shortTitle`, `gridSubtitle`, and `ariaLabel` fields to stage metadata in `src/data/content.ts`.
- Updated `StageTimeline` so compact labels are used only when the component renders tappable Journey jump tiles.
- Preserved full `act.name` labels in non-jump stage context, including section headings and lesson context.
- Kept button semantics, `aria-current="step"`, and existing scroll behavior.
- Bumped the visible app version to `v0.23.1`.

## Accessibility

The visible tile label for stage 6 is now `Twilight`, but the accessible label remains meaningful:

`Jump to Twilight: The Wider Landscape. Wider AI landscape`

Each tile remains a real `button`.

## Mobile QA

Screenshots:

- `docs/journey/screenshots/v0-23-1-stage-grid-320.png`
- `docs/journey/screenshots/v0-23-1-stage-grid-390.png`

Machine-readable QA:

- `docs/journey/stage-grid-labels-v0-23-1-qa.json`

Results:

- 320px: 4 columns, 8 tiles, no horizontal overflow, no clipped tile text, all tile taps scrolled to the correct section, Journey bottom nav returned to top.
- 390px: 4 columns, 8 tiles, no horizontal overflow, no clipped tile text, all tile taps scrolled to the correct section, Journey bottom nav returned to top.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Known Issues

- The existing Vite large-chunk warning remains.
- The compact grid intentionally uses short subtitles in the tiles; fuller stage language remains in section headers and surrounding copy.

