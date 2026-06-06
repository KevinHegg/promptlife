# Morning Commute Image Asset Plan v0.19.1

Date: 2026-06-06

Status: implementation pass complete in coded SVG/HTML; no generated PNG assets added.

## Decision

Morning Commute stays coded for v0.19.1. The seven cards need precise labels, token chips, IDs, axes, and accessible HTML callouts, so generated images would be less useful than clean SVG/HTML diagrams.

## Card Plan

| Card | Current visual | Future image asset? | Reason |
| --- | --- | --- | --- |
| Inference | Coded SVG | Optional later | A textless forward-pass atmosphere image could help, but fixed weights and temporary activations need exact labels. |
| Prompt vs Response | Coded SVG/HTML only | No | The role labels and canonical example must remain in accessible app text. |
| Tokenization | Coded SVG/HTML only | No | Uneven chunks and punctuation require exact labels. |
| Token IDs | Coded SVG/HTML only | No | The lookup-key distinction depends on readable token, ID, and table-row labels. |
| Embeddings | Coded SVG now | Best future Image 2 candidate | A textless lookup-table or meaning-cloud image could add atmosphere while HTML callouts carry the teaching text. |
| Vectors | Coded SVG/HTML only | No | The simplified-versus-distributed warning must stay controlled in text. |
| Tensors | Coded SVG/HTML/CSS only | No | Axis inspection is clearer as a lightweight coded object than a static PNG. |

## Future Image 2 Candidate

Embeddings is the strongest Morning Commute candidate for a future textless generated asset. The image should show a token/key entering a luminous table or numerical space, with no baked-in text. HTML labels should remain responsible for:

- Durable embedding table
- Temporary retrieved vector
- Starting vector, not definition
- Hidden state comes later

## Non-Goals For v0.19.1

- No generated PNG assets.
- No heavy 3D libraries.
- No new games.
- No new Journey cards.
- No checkpoint, progress, or badge changes.
