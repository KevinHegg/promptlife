# DiagramKit v0.18

Date: 2026-06-05

## Purpose

DiagramKit is a small local SVG/HTML primitive set for Prompt Life teaching diagrams. It gives coded visuals a shared ZenTron Origami grammar without adding generated PNG assets, heavy 3D libraries, or new runtime dependencies.

The goal is not to make dense infographics. The goal is to make mobile-first, readable diagrams whose SVG labels stay short while definitions, limits, and nuance stay in accessible HTML callouts.

## Dependency Decision

No new dependencies were added in v0.18.

Rationale:

- The requested visuals are sparse diagrams, not force-directed graphs or data charts.
- Local SVG components are easier to keep readable at 320px and 390px.
- Avoiding D3 and new icon packages keeps the v0.18 bundle increase modest and preserves the current app stack.

## Primitive Inventory

Implemented in `src/components/DiagramKit.tsx`:

- `DiagramFrame`
- `DiagramScene`
- `PaperNode`
- `PaperPanel`
- `NeonPath`
- `NeonArrow`
- `CalloutSeal`
- `TokenChip`
- `ContextTray`
- `VectorBar`
- `ProbabilityBar`
- `LayerSheet`
- `TensorGrid`
- `EvidenceCard`
- `GuardrailPath`
- `WarningZone`
- `GlowNode`
- `LegendRow`
- `DiagramCaption`
- `DiagramCallouts`

The review gallery also includes:

- Primitive Sampler
- Example Training Loop
- Example AI Family Tree
- Example Overfitting Plot

## Visual Grammar

- Paper shapes represent concepts, categories, examples, or evidence.
- Neon paths represent relationships, flow, or influence.
- Amber is reserved for durable or chosen steps when possible.
- Mint/cyan suggests live computation or active connection.
- Violet marks alternate traditions, category branches, or contrast.
- Callout seals point to HTML explanations below the diagram.
- Glow nodes represent transient computation or attention-worthy points.
- Dashed trays, rails, and paths represent temporary context, boundaries, or softer relationships.

## Mobile Rules

- Keep SVG labels to one to three words.
- Put long explanations in HTML callouts, not inside the image.
- Use a stable `viewBox="0 0 320 210"` for lesson diagrams.
- Avoid labels near the very top or bottom edges.
- Use vector-effect strokes so thin lines remain stable when scaled.
- Verify at 320px and 390px before treating a diagram as final.

## Refactored v0.18 Visuals

- `ai-family-tree`: repaired in v0.18.1 as a clean vertical taxonomy tree so category containment is clearer than a folded branch map.
- `traditions`: two paper panels with rules-first and learned-pattern ingredients plus a bridge.
- `training-loop`: five-step loop with `Update weights` highlighted as the durable-change step.
- `overfitting-generalization`: plot with training dots, held-out examples, overfit curve, smoother generalizing curve, and a compact legend.

## Preserved Visuals

Generated PNG-backed visuals were intentionally left unchanged:

- `before-morning-llm-cloud`
- `before-morning-pretraining-landscape`
- `before-morning-finetuning-path`
- `before-morning-alignment-garden`

## Accessibility Notes

- Diagram labels remain short and paired with HTML captions and callouts.
- Generated visual alt text remains in the visual asset registry.
- Visual-aid review pages expose accessible descriptions for each aid.
- No motion was added in this pass, so `prefers-reduced-motion` behavior is unchanged.

## Known Limits

- DiagramKit is intentionally small; it is not a general charting library.
- The current examples are optimized for Prompt Life visual aids, not arbitrary data visualization.
- The existing Vite large-chunk warning remains and should be addressed by app-level code splitting in a later pass.
