# Visual Aid Layout Rules v0.9 Batch 2

Date: 2026-06-03

These rules were added after the Batch 1 PDF review exposed label collisions, tiny text, and clipped captions. They apply to app visuals and exported review PDFs.

1. Put explanatory copy in HTML captions or legends when it is longer than a short label.
2. Keep SVG labels short: one to three words where possible.
3. Use numbered callouts for visual explanations instead of placing sentences over shapes.
4. Never rotate text in lesson visuals or review-card PDFs.
5. Keep SVG text at 12px or larger; prefer 13px+ for mobile.
6. Give labels a plain background, box, or callout marker when they sit near busy shapes.
7. Use `preserveAspectRatio="xMidYMid meet"` and a stable viewBox so exports do not stretch diagrams.
8. Let chips, legends, and captions wrap with `overflow-wrap: anywhere`.
9. Do not use color alone; pair color with label style, location, callout number, or caption text.
10. Prefer stable static diagrams in PDF. Use 3D only when the structure is clearer and the print fallback remains readable.

## Batch 1 Fix Targets

- `traditions`: replaced crowded examples/loss/updates labels with clean rule and learned-pattern columns.
- `training-loop`: rebuilt loop as five readable steps with a clear weight-update point.
- `overfitting-generalization`: moved overfit/generalization explanations to callouts and legend.
- `alignment`: moved warning/preferred/policy/feedback explanations to callouts and legend.

## Batch 2 Application

- `inference-pass`: shows fixed weights, temporary states, and next-token scores.
- `prompt-response`: uses prompt-token styling, response-token styling, and the dog/cat `yard` append example.
- `tokenization`: shows simplified token cards and explicitly warns that real tokenizers may split differently.
- `token-ids`: separates token, ID, and embedding row.
- `embeddings`: separates learned embedding table from temporary inference lookup.
- `vectors`: labels feature sliders as simplified and distributed.
- `tensors`: uses a static tokens x features block for PDF stability; CSS 3D was deferred because clarity and print reliability matter more in this pass.
