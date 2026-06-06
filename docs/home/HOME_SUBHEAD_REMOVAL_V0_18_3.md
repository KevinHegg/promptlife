# Home Subhead Removal v0.18.3

Date: 2026-06-06

## What Changed

- Removed the standalone Home subhead line `Demystifying LLMs`.
- Kept the Home tagline: `Demystifying LLMs in the AI era through clear explanations, useful metaphors, and a little play.`
- Bumped the visible app version to `v0.18.3`.

## Reason

The standalone subhead repeated the mission phrase too heavily in the first viewport. Keeping the phrase in the tagline preserves the message while simplifying the visual hierarchy.

## Constraints Preserved

- No Journey progress rules changed.
- No badge logic changed.
- No lesson order changed.
- No dependencies added.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: Home checked at 390px and 320px; the standalone subhead is absent and no horizontal overflow was detected.

## Screenshots

- `docs/home/screenshots/home-v0-18-3-390.png`
- `docs/home/screenshots/home-v0-18-3-320.png`
