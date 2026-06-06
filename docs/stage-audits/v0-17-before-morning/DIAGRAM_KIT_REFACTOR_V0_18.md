# DiagramKit Refactor v0.18

Date: 2026-06-05

## What Changed

- Added `src/components/DiagramKit.tsx` with reusable coded SVG and HTML primitives.
- Added DiagramKit CSS to `src/styles/global.css`.
- Added a DiagramKit primitive gallery to `/review/visual-aids`.
- Refactored four coded Before Morning visuals to use DiagramKit examples:
  - `ai-family-tree`
  - `traditions`
  - `training-loop`
  - `overfitting-generalization`
- Bumped the visible app version to `v0.18.0`.
- Added visual grammar and tiny-interaction triage docs.

## Visuals Refactored

### Where LLMs Fit

`ai-family-tree` originally used a folded paper-tree motif with short labels:

- AI
- Rules
- ML
- Classical
- Deep
- Gen AI
- LLM
- Diffusion
- Multi

Longer distinctions remain in HTML callouts.

v0.18.1 supersedes this with a clearer vertical taxonomy tree. The repair removes sequence-like numbered seals and makes category containment visible directly.

### Rationalists vs Empiricists

`traditions` now uses two paper panels:

- Rules: symbols, if-then, logic
- Patterns: examples, loss, weights

A neon bridge and bottom paper node show that modern systems can combine both traditions.

### Training

`training-loop` now uses a five-node loop:

- Predict
- Compare
- Loss
- Update weights
- Repeat

`Update weights` is highlighted in amber as durable change.

### Overfitting and Generalization

`overfitting-generalization` now uses a cleaner plot:

- Cyan dots for training examples.
- Amber squares for held-out examples.
- Violet curve for overfitting.
- Green line for smoother generalization.
- Compact legend below the plot.

## Preserved

- Generated PNG-backed visuals were not changed.
- No generated PNG assets were added.
- No Journey cards were added.
- No games were added.
- No heavy 3D libraries were added.
- Checkpoint randomization was not changed.
- Progress rules were not changed.
- The one badge model remains.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser smoke checks: main app, lesson review, visual-aid review, and Badge version render with no console errors.

## Bundle Impact

Baseline from the previous local build:

- CSS: 68.76 kB raw, 15.00 kB gzip.
- JS: 630.81 kB raw, 170.95 kB gzip.

v0.18 local production build:

- CSS: 73.47 kB raw, 15.97 kB gzip.
- JS: 638.93 kB raw, 173.88 kB gzip.

Approximate increase:

- CSS: +4.71 kB raw, +0.97 kB gzip.
- JS: +8.12 kB raw, +2.93 kB gzip.

## Known Issues

- The existing Vite large-chunk warning remains.
- DiagramKit examples should be revisited after future generated Image 2 assets so coded and image-backed visuals feel like one family.

## Image 2 Readiness

Before Morning is ready for the next Image 2 asset-generation pass from a visual-system standpoint. v0.18 gives the coded diagrams a stable grammar while leaving the generated PNG-backed scenes untouched.
