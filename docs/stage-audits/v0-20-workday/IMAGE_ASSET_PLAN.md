# Image Asset Plan v0.20.1

Date: 2026-06-06

## Decision

Do not add generated PNG assets for the Workday implementation pass yet.

The Workday cards teach precise internal relationships: token-to-token relevance, per-token feature reshaping, repeated transformer blocks, and temporary hidden-state flow. These need accessible HTML text, coded SVG labels, and direct callouts more than atmospheric imagery.

## Card Recommendations

| Card | Asset decision | Reason |
| --- | --- | --- |
| Attention | Keep coded SVG. | Learners need exact token labels and relevance arcs. A generated image would make the relationship less inspectable. |
| MLP | Keep coded SVG. | The important contrast is same token position before and after feature reshaping. Labels and feature bars matter. |
| Layers | Keep coded SVG/CSS. | The stack needs readable repeated blocks, not a decorative stack image. |
| Hidden States | Keep coded SVG. | The visual must distinguish durable weights, embeddings, temporary states, and output scores. |

## Later Image 2 Candidates

- Hidden States could later use a textless atmospheric image as a page accent if the coded flow remains the primary teaching visual.
- Layers could later use a textless folded-paper stack as a decorative support image, but the instructional stack should remain coded.

## Accessibility Requirements

- Keep all teaching labels in app code, not inside generated images.
- Keep `alt` text tied to the concept, not decorative prompt text.
- Prefer coded diagrams when learners need to inspect exact relationships.
- Do not replace the coded Workday visuals with dense mini-infographics.
