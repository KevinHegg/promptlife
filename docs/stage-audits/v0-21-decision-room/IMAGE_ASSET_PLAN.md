# Decision Room Image Asset Plan v0.21.2

Date: 2026-06-06

## Recommendation

No Image 2 asset is recommended for the Decision Room stage.

## Rationale

Logits, Softmax, and Sampling require exact labels, values, bars, percentages, and token choices. The learner needs to see:

- hidden state -> logits
- raw scores such as `8.2`, `5.1`, `2.0`, and `-1.0`
- softmax converting scores into probabilities
- probabilities that sum to `100%`
- one selected generated token

Generated PNG assets would be decorative for this stage unless used only as atmosphere, and atmosphere is not the teaching need here. Coded SVG/HTML keeps the mechanism precise, accessible, and easy to revise.

## Implemented Visual Strategy

- `logits`: coded SVG raw-score board with final hidden state, output scoring, candidate tokens, raw score bars, and `raw scores, not probabilities`.
- `softmax`: coded SVG before/after conversion with logits on the left, probabilities on the right, `sum = 100%`, and `probability != truth`.
- `sampling`: coded SVG weighted token cloud with probability-sized candidates and a selected `floor` token.

## Deferred

- No generated PNGs.
- No heavy 3D library.
- No top-k/top-p visual expansion in the main path.
- No learner-facing PDF feature.
