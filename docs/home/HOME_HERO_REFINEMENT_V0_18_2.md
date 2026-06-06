# Home Hero Refinement v0.18.2

Date: 2026-06-06

## What Changed

- Revised the Home hero hierarchy around the mission phrase `Demystifying LLMs`.
- Replaced the old Home tagline phrase `clear mechanics` with `clear explanations`.
- Added a more intentional square logo frame around the current Prompt Life mark.
- Wrapped the current prompt-cloud Home illustration in a stable, deeper visual slot to better match the generated Before Morning assets.
- Added planned Home asset metadata for the future generated hero visual and logo mark.
- Added a standard favicon link to the current square Prompt Life mark.

## Revised Home Copy

- Eyebrow: `A DAY IN THE LIFE OF A PROMPT`
- Main title: `Prompt Life`
- Prominent subhead: `Demystifying LLMs`
- Supporting tagline: `Demystifying LLMs in the AI era through clear explanations, useful metaphors, and a little play.`
- Big idea: `An LLM is not a mind, a database, or magic. It is a learned prediction system that turns context into likely next tokens.`

## Layout Changes

- The logo and eyebrow now sit in a compact brand row.
- The subhead gets its own visual weight between the title and supporting tagline.
- The hero image sits inside a dark indigo/cyan/violet frame so the existing fallback image feels closer to the stronger generated asset language.
- Home spacing now uses a simple grid gap, making the Continue Learning and Big Idea panels secondary to the hero.
- The current progress ring, CTA, quick actions, and bottom dock behavior remain unchanged.

## Asset Readiness

The Home page is ready for two future generated assets:

- Hero visual: `public/assets/generated/home/home-hero-prompt-cloud.png`
- Logo mark: `public/assets/generated/home/promptlife-mark.png`

Current fallback assets:

- Hero: `public/assets/promptlife/illustrations/scene-hero-feature-cloud@mobile.png`
- Desktop hero: `public/assets/promptlife/illustrations/scene-hero-feature-cloud.png`
- Logo: `public/assets/promptlife/brand/promptlife-mark.svg`

The planned Home assets are also recorded in `src/data/visualAssets.ts` as `plannedHomeVisualAssets`.

## Mobile QA Notes

Required screenshots:

- `docs/home/screenshots/home-v0-18-2-390.png`
- `docs/home/screenshots/home-v0-18-2-320.png`
- `docs/home/screenshots/home-v0-18-2-with-scroll.png`

Manual checks:

- Home copy hierarchy is readable at 390px and 320px.
- `Demystifying LLMs` is prominent and wraps cleanly.
- The hero image frame remains stable on mobile.
- The square logo area is readable and ready for a future mark swap.
- Continue Learning remains secondary to the hero.
- Big Idea remains visible without overwhelming the landing experience.
- The bottom dock overlay still reads as intentional app chrome.
- No horizontal overflow was detected at 390px or 320px.
- Clean browser-tab console check reported no errors.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.

## Constraints Preserved

- No Journey progress rules changed.
- No badge logic changed.
- No lesson order changed.
- No checkpoint randomization changed.
- No dependencies were added.
- No generated Home PNG asset was added in this pass.

## Known Issues

- The current Home hero image is still the existing fallback illustration; the stronger generated Home hero has not been added yet.
- The existing Vite large-chunk warning remains.

## Next Recommended Step

Integrate the generated Home hero visual and square logo mark once those textless assets are available, then re-check the Home page at 320px, 390px, and on iPhone.
