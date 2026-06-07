# Workday Implementation Report v0.20.1

Date: 2026-06-06

## Summary

The v0.20.1 pass upgrades the Workday Journey cards: Attention, MLP, Layers, and Hidden States. The implementation keeps the existing Journey order and progress model while making each card clearer, more concrete, and easier to test at mobile widths.

No new Journey cards, new games, generated PNG assets, heavy 3D libraries, badge changes, progress changes, or checkpoint-randomization changes were added.

## Files Changed For This Pass

- `src/data/content.ts`
- `src/data/exercises.ts`
- `src/components/VisualAids.tsx`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/stage-audits/v0-20-workday/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-20-workday/TINY_INTERACTION_PLAN.md`
- `docs/stage-audits/v0-20-workday/IMPLEMENTATION_REPORT_V0_20_1.md`
- `docs/stage-audits/v0-20-workday/screenshot-index.md`
- `docs/stage-audits/v0-20-workday/prompt-life-v0-20-1-workday-implementation-report.html`
- `docs/stage-audits/v0-20-workday/prompt-life-v0-20-1-workday-implementation-report.pdf`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-*.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-screenshot-manifest.json`

The repository also currently contains pre-existing uncommitted v0.19.3 Glossary Dojo feedback files. Those were not modified as part of this Workday repair pass.

## Card By Card

### Attention

- Added richer lesson fields for lifecycle, durable vs temporary state, prompt/current-context role, misconception, and checkpoint feedback.
- Updated the visual from abstract token nodes to a concrete sentence with dog/cat/pronoun relevance arcs.
- Added the `attention-relevance-connect` tiny interaction so learners choose which prior token helps interpret "it."
- Added/connected the glossary term `Relevance weight`.

### MLP

- Expanded MLP as multi-layer perceptron and clarified it as a feed-forward, per-token feature-reshaping operation.
- Updated the visual to show attention mixing first, then the same token position before and after MLP feature reshaping.
- Added the `mlp-feature-toggle` tiny interaction with feature bars and a short concept check.
- Added/connected glossary support for `Multi-layer perceptron` and `Feed-forward network`.

### Layers

- Clarified transformer layers as repeated blocks that combine attention, MLP, residual paths, and normalization.
- Updated the visual to show a vertical stack from input states through repeated attention-plus-MLP layers to output states.
- Added the `layers-stack-inspect` tiny interaction.
- Added/connected glossary support for `Transformer layer`, `Residual path`, and `Normalization`.

### Hidden States

- Clarified hidden states as temporary, context-shaped internal vectors for token positions during a forward pass.
- Updated the visual to show token ID, embedding, layer states, final state, and next-token scores.
- Replaced the old MLP exercise mapping with a dedicated `hidden-state-sort` exercise/interaction.
- Added/connected glossary support for `Temporary activation`.

## Visual Aid Behavior

- All four Workday visuals remain coded SVG/HTML, not generated PNGs.
- Attention emphasizes relevance weights rather than human awareness.
- MLP emphasizes same-token feature reshaping rather than cross-token mixing.
- Layers emphasizes repeated attention-plus-MLP refinement.
- Hidden States emphasizes temporary state flow, not memory.
- 320px spot checks passed for MLP, Layers, and Hidden States after label tightening.

## Glossary Updates

Added or improved:

- `Attention`
- `Relevance weight`
- `MLP`
- `Multi-layer perceptron`
- `Feed-forward network`
- `Layer`
- `Transformer layer`
- `Residual path`
- `Normalization`
- `Hidden state`
- `Temporary activation`

Learning-path grouping now introduces the new Workday terms alongside the card where they first matter.

## Verification

- Browser QA used the local dev server at `http://127.0.0.1:5173/?debug=1`.
- Screenshot QA used Preview mode and a temporary profile. The manifest records `promptlife:v1:progress` as `[]`.
- 390px screenshots were captured for Workday overview, Attention visual/interaction, MLP interaction, Layers interaction, Hidden States visual/sort/checkpoint.
- 320px screenshots were captured for the MLP, Layers, and Hidden States visual aids.
- No horizontal overflow was detected in the browser QA manifest.

Final command results:

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- `git diff --check`: passed.

## Known Issues

- Long Workday cards still require scrolling, and the bottom nav can overlap the very bottom of tall screenshots. Required controls remain reachable above the nav when scrolled.
- The repository has pre-existing uncommitted v0.19.3 Glossary Dojo feedback files in the same worktree.
- The Vite production build emits the existing large-chunk warning.

## Image 2 Readiness

Before Morning is ready for Image 2 asset generation from previous passes, but Workday is not a strong Image 2 target yet. For Workday, coded visuals are still the better teaching surface because labels and relationships carry the concept.
