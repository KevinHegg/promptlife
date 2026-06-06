# Generated Asset Loading Fix + Key Terms Collapse v0.17.4

Date: 2026-06-05

## Issue Summary

Human review flagged two mobile-first risks after v0.17.3:

- Generated PNGs could fail on GitHub Pages if public asset paths were root-based instead of deployment-base-aware.
- Lesson-top glossary chips could consume too much vertical space, especially on `Where LLMs Fit`, pushing the coded AI family tree too far down the card.

## Asset Path Strategy

Added `src/utils/assetPath.ts` with `publicAssetPath(path)`. It uses `import.meta.env.BASE_URL` so public assets resolve correctly as:

- Local dev: `/assets/generated/before-morning/...`
- GitHub Pages build: `/promptlife/assets/generated/before-morning/...`

The generated asset registry now calls this helper for all four Before Morning PNGs instead of assembling paths inline.

## Before / After Chip Behavior

Before:

- Glossary chips rendered near the lesson top as one unbounded wrapping row group.
- `Where LLMs Fit` could show many rows of terms before the visual aid.

After:

- Terms render through a reusable `KeyTermsChips` panel after the visual aid.
- Chips show at most two rows by default.
- Overflow is clipped cleanly with a calm fade.
- `Show all terms` / `Show fewer` toggles the overflow with `aria-expanded`.
- Expansion state is local UI state and does not touch lesson progress.
- `Where LLMs Fit` displays high-priority terms first: AI, machine learning, deep learning, generative AI, LLM, diffusion model, multimodal AI, and symbolic AI.
- The lesson-stage timeline is compacted under 340px so the first visual is not buried on the narrowest phone check.

## Cards Checked

- `What Is an LLM?`: generated PNG `before-morning-llm-cloud.png`.
- `Where LLMs Fit`: coded SVG/HTML visual `ai-family-tree`.
- `Pretraining`: generated PNG `before-morning-pretraining-landscape.png`.
- `Fine-Tuning`: generated PNG `before-morning-finetuning-path.png`.
- `Alignment`: generated PNG `before-morning-alignment-garden.png`.
- `/review/visual-aids`: all four generated assets plus the coded AI family tree remain listed.

## Accessibility Notes

- Generated images retain descriptive alt text.
- The fallback is user-facing and calm: `Visual asset unavailable. The callouts below still explain the concept.`
- The review route still displays generated asset paths for debugging.
- Key term expansion uses a real button, keyboard focus, and `aria-expanded`.
- Chips remain buttons that open the glossary drawer.

## Mobile QA Notes

- Checked at 320px, 390px, and 430px.
- Generated images fit inside the 4:3 paper frame.
- Collapsed key terms do not exceed two rows.
- `Show all terms` and `Show fewer` work without changing progress.
- The `Where LLMs Fit` coded tree appears before the Key terms panel and remains visible in the first mobile viewport.
- Bottom navigation does not hide the visual or callout area in the checked screenshots.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser QA: passed for local dev and mounted Pages-style preview.

## Screenshots

- `screenshots/v0-17-4-llm-image-loaded.png`
- `screenshots/v0-17-4-pretraining-image-loaded.png`
- `screenshots/v0-17-4-finetuning-image-loaded.png`
- `screenshots/v0-17-4-alignment-image-loaded.png`
- `screenshots/v0-17-4-where-llms-fit-collapsed-chips.png`
- `screenshots/v0-17-4-where-llms-fit-expanded-chips.png`
- `screenshots/v0-17-4-ai-family-tree-visible.png`
- `screenshots/v0-17-4-visual-gallery-assets.png`
- `screenshots/v0-17-4-320px-chip-collapse.png`

## Known Issues

- The existing Vite large-chunk warning remains.
- The browser screenshot bridge verifies the mounted Pages-style preview locally; it does not prove a remote CDN or phone browser cache has refreshed.
- During repeated local dev reload automation, Vite logged one React `createRoot` HMR message. No generated asset 404s appeared, and the mounted Pages build had no console errors.

## Next Three Recommended Steps

1. Add a small automated Pages-build asset-path check that fails if generated PNG paths resolve to root `/assets/...` in a GitHub Pages build.
2. Add a narrow visual regression capture for `Where LLMs Fit` collapsed/expanded terms at 320px and 390px.
3. After pushing, test the deployed iPhone URL with `?v=0174` to avoid stale cached bundles.
