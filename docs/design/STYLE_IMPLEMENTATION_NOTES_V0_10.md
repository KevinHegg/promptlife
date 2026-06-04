# Style Implementation Notes v0.10

Date: 2026-06-04

## Scope

This pass establishes the Prompt Life visual identity foundation without rewriting Journey content, adding games, adding heavy 3D libraries, or creating learner-facing PDF features.

## Token Foundation

`src/styles/promptlife.tokens.css` now defines:

- Color tokens for rice paper, mist, indigo ink, cyan/teal/violet/amber glow, and semantic learning states.
- Spacing tokens for the mobile-first rhythm.
- Radius tokens with the existing restrained `8px` card language preserved.
- Paper depth tokens for soft card layering.
- Glow tokens for active computation.
- Typography tokens for display, section, body, and microcopy roles.
- Z-index tokens for app chrome and drawers.
- Motion tokens for slow glow, paper slide, and fold/unfold patterns.
- Bottom dock sizing tokens for safe-area-aware navigation.
- Backwards-compatible aliases for the older v0.9 variables.

## Motif Classes

The token file includes lightweight motif classes:

- `.pl-paper-layer`
- `.pl-origami-fold`
- `.pl-neon-path`
- `.pl-zen-rings`
- `.pl-glow-node`
- `.pl-paper-seal`
- `.pl-folded-chip`

These are intentionally small CSS primitives. They should be used sparingly so the interface stays calm.

## Hidden Style Playground

The internal review route `/review/style-guide` shows:

1. Color swatches
2. Typography examples
3. Card examples
4. Chip examples
5. Callout examples
6. Brain Bridge card
7. Checkpoint card
8. VisualAidCard shell
9. Bottom nav mock
10. Lesson hero mock
11. Glossary drawer mock
12. Badge mock

The route is for project review only and does not include learner app navigation.

## App Shell Changes

The base shell now leans into the visual identity through:

- Rice-paper/mist page background with faint fold lines and zen-ring contours.
- Translucent paper app shell with subtle side borders.
- Paper cards with inset highlights and soft layered shadow.
- Folded-tab chips.
- Floating paper-glass bottom dock with clipped mist blur.
- Visual aid frames that separate neon computational scenes from HTML callouts.
- Brain Bridge styling as a folded comparison note.

## Visual Aid Style Variants

`src/components/VisualAids.tsx` now tags visual aids with style variants:

- `paper-diagram`: exact, calm diagrams.
- `neon-flow`: prompt-to-model-to-token flows.
- `origami-object`: tensors, layers, and transformations.
- `zen-garden-map`: alignment, risk, hallucination, and ethics.
- `retrieval-shelf`: RAG and grounding.

The classes are available as `variant-paper-diagram`, `variant-neon-flow`, `variant-origami-object`, `variant-zen-garden-map`, and `variant-retrieval-shelf`.

## RAG Pilot

`rag-retrieval` is the v0.10 pilot visual. It keeps the existing lesson concept but changes the presentation:

- Softer paper nodes.
- Numbered paper seals.
- A subtle cyan neon retrieval path.
- Document cards entering the context tray.
- Weights shown as a separate fixed note.
- HTML callouts and key takeaway remain below the diagram.

The content distinction remains: RAG is retrieval plus context, not training.

## Accessibility Notes

- Text remains HTML/SVG, not baked into images.
- Focus states remain visible.
- Glow is decorative support, not the only carrier of meaning.
- Visuals use labels, shapes, and callouts in addition to color.
- `prefers-reduced-motion` removes animations and transitions.
- The bottom nav reserves scroll padding so content is not hidden behind the dock.

## Known Style Issues

- Older concept animation surfaces still use the previous deep-blue panel language; they should be migrated in a later animation-focused pass.
- Some existing PNG art still carries the earlier mobile MVP illustration style.
- The visual aid variants are tagged and styled globally, but only RAG is redesigned as a pilot in this pass.
- Print styling remains optimized for internal review PDFs rather than learner-facing export.

## Next Recommended Prompt

Apply the v0.10 visual identity lesson-by-lesson to the next priority cluster: Context Window, Attention, MLP, Hidden States, Logits/Softmax/Sampling, and Autoregression. Keep each visual sparse, mobile-first, and anchored in one focal object.
