# Where LLMs Fit Visual Repair v0.18.1

Date: 2026-06-06

## What Was Wrong With the Old Visual

The v0.18 `ai-family-tree` visual used folded nodes, curved neon paths, and numbered seals. It was readable as a diagram, but it did not teach the category relationship clearly enough.

Main issues:

- The hierarchy felt like a network map rather than a taxonomy.
- Curved connectors made parent-child relationships harder to see.
- Numbered seals implied a sequence, even though the lesson is not a process.
- Labels such as `ML`, `Gen AI`, `Multi`, and `Other` were too compressed for beginners.
- Rule-based AI did not clearly appear as a different branch inside the wider AI family.

## New Visual Approach

The repair replaces the freeform topology with a clean coded SVG taxonomy tree:

- `AI` is the root.
- `Rule-based AI` is one AI branch.
- `Machine learning` is the AI branch that leads toward LLMs.
- `Machine learning` splits into `Classical ML` and `Deep learning`.
- `Deep learning` splits into `Other deep learning` and `Generative AI`.
- `Generative AI` splits into `LLMs`, `Diffusion`, and `Multimodal`.

This remains a coded SVG/HTML visual. No generated PNG asset was added.

## Why the Taxonomy Tree Is Clearer

A clean tree makes the key idea visible without tangled arrows:

- Parent-child lines point in one direction: broad category to subcategory.
- LLMs sit under Generative AI, not beside all of AI.
- Diffusion and Multimodal sit beside LLMs as neighboring Generative AI branches.
- Rule-based AI appears as a different AI branch outside the machine-learning path.

The visual now teaches category hierarchy rather than movement.

## Interaction Behavior

The `ai-topology` tiny interaction remains, but its branch picker is now a compact taxonomy tree rather than a flat grid.

Behavior:

- Learners tap a category node.
- The selected node is highlighted.
- A short explanation appears below the tree.
- The hierarchy stays visible while the explanation changes.
- The interaction remains reflective rather than quiz-like.

## Mobile QA Notes

Required screenshots were captured at 390px and 320px:

- `screenshots/v0-18-1-where-llms-fit-top.png`
- `screenshots/v0-18-1-ai-family-tree-390.png`
- `screenshots/v0-18-1-ai-family-tree-320.png`
- `screenshots/v0-18-1-ai-family-tree-interaction.png`
- `screenshots/v0-18-1-review-visual-aids-ai-family-tree.png`

Manual checks:

- The visual shows hierarchy without tangled arrows.
- Diagram labels use beginner-friendly terms.
- No unexplained abbreviations appear except `Classical ML`, which is allowed by the repair brief.
- No sequence numbers appear inside the AI taxonomy visual.
- The branch-tap interaction highlights the selected node and keeps the hierarchy visible.
- The visual and interaction were checked at 320px and 390px.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; checkpoint randomization remains intact.
- Browser QA: passed for Journey, Where LLMs Fit, interaction, review visual-aid route, Badge version, and console errors.

## Known Issues

- The existing Vite large-chunk warning remains.
- The three Generative AI child labels are intentionally compact to preserve the whole taxonomy at 320px.
- `Classical ML` remains abbreviated in the diagram because the brief allowed that label and the full term appears in glossary and lesson text.
