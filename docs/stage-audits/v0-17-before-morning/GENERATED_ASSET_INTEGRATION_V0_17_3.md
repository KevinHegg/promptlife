# Before Morning Generated Asset Integration v0.17.3

Date: 2026-06-05

## Summary

v0.17.3 integrates the four provided textless generated PNG assets for the Before Morning stage. The pass keeps the Journey structure, games, progress rules, checkpoint randomization, and single badge model intact while upgrading four existing visual aids with image-backed scenes and HTML callouts.

## Files Changed

- `src/data/visualAssets.ts`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `public/assets/generated/before-morning/before-morning-llm-cloud.png`
- `public/assets/generated/before-morning/before-morning-pretraining-landscape.png`
- `public/assets/generated/before-morning/before-morning-finetuning-path.png`
- `public/assets/generated/before-morning/before-morning-alignment-garden.png`
- `docs/REVIEW_NOTES.md`
- `docs/stage-audits/v0-17-before-morning/README.md`
- `docs/stage-audits/v0-17-before-morning/card-inventory.md`
- `docs/stage-audits/v0-17-before-morning/recommendations.md`
- `docs/stage-audits/v0-17-before-morning/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-17-before-morning/screenshot-index.md`
- `docs/stage-audits/v0-17-before-morning/GENERATED_ASSET_INTEGRATION_V0_17_3.md`

## Assets Integrated

| Asset | Lesson | Visual aid ID | Purpose |
|---|---|---|---|
| `before-morning-llm-cloud.png` | What Is an LLM? | `before-morning-llm-cloud` | Show context flowing through learned weights into one generated token. |
| `before-morning-pretraining-landscape.png` | Pretraining | `before-morning-pretraining-landscape` | Show broad data exposure shaping durable weights before ordinary use. |
| `before-morning-finetuning-path.png` | Fine-Tuning | `before-morning-finetuning-path` | Show targeted training carving a more specific path through a pretrained model landscape. |
| `before-morning-alignment-garden.png` | Alignment | `before-morning-alignment-garden` | Show alignment as guided behavior shaping, not moral understanding. |

## Visual Aid IDs Updated

- `what-is-llm`: `llm-overview` to `before-morning-llm-cloud`
- `pretraining`: `pretraining-rain` to `before-morning-pretraining-landscape`
- `fine-tuning`: `fine-tune-path` to `before-morning-finetuning-path`
- `alignment`: `alignment` to `before-morning-alignment-garden`

The `Where LLMs Fit` card remains `ai-family-tree`, a coded SVG/HTML visual aid.

## Accessibility Handling

- Each generated image has dedicated `alt` text in `src/data/visualAssets.ts`.
- Each visual aid keeps explanatory text in HTML callouts, not inside the PNG.
- Each generated visual has an accessible description and review-gallery metadata.
- The image frame has a visible fallback note if an asset fails to load.
- The mobile visual frame uses the provided 4:3 image ratio so screenshots and review PDFs stay stable.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 audited answer surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser QA: passed for generated visual aids at 390px, Alignment at 320px, the visual-aid review gallery, Learn-mode smoke test, Badge version, and console errors.

## Constraints Preserved

- No images were generated in this pass.
- No new Journey cards were added.
- No games were added or changed.
- No heavy 3D libraries were added.
- Checkpoint randomization was not changed.
- Progress rules were not changed.
- The single badge remains `Prompt Life: Model Literate`.

## Screenshots

- `screenshots/v0-17-3-llm-cloud.png`
- `screenshots/v0-17-3-pretraining-landscape.png`
- `screenshots/v0-17-3-finetuning-path.png`
- `screenshots/v0-17-3-alignment-garden.png`
- `screenshots/v0-17-3-visual-gallery-before-morning.png`
- `screenshots/v0-17-3-320px-alignment.png`
- `screenshots/v0-17-3-badge-version.png`

## Known Issues

- The existing Vite large-chunk warning remains.
- The generated PNGs are 4:3 assets; the visual frame intentionally preserves that ratio for stable mobile/PDF layout.

## Next Three Recommended Steps

1. Add a lightweight visual regression script for the four generated visual-aid IDs at 320px and 390px.
2. User-test whether learners understand that image-backed visuals are conceptual scenes and that all formal teaching text lives in HTML.
3. Decide whether the older coded Before Morning visuals should remain as archived documentation examples or be removed from stale v0.6 docs in a later cleanup pass.
