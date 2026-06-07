# Decision Room Implementation Report v0.21.2

Date: 2026-06-06

## Summary

This pass upgrades the existing Decision Room Journey cards: Logits, Softmax, and Sampling. It keeps the Journey order unchanged, preserves progress and badge behavior, keeps checkpoints randomized, adds no games, adds no generated PNG assets, and adds no dependencies.

## What Changed

- Bumped the visible app version to `v0.21.2`.
- Converted Logits, Softmax, and Sampling to the richer lesson architecture used by newer stages.
- Added explicit lifecycle, durable-vs-temporary, prompt-vs-response, misconception, relationship, and checkpoint-feedback copy.
- Replaced generic Decision Room visuals with coded SVG/HTML diagrams for raw scores, probability conversion, and weighted token choice.
- Added dedicated tiny interactions:
  - `logits-raw-toggle`
  - `softmax-convert`
  - `sampling-probability-pick`
- Improved Decision Room glossary support and learning-path grouping for logits, softmax, probability, sampling, decoding step, next token, temperature, top-k, and top-p.

## Card Improvements

### Logits

- Defines logits as raw scores before probabilities.
- Connects final hidden state to candidate next-token scores.
- Makes clear that logits are temporary inference values, not memories, probabilities, or truth scores.
- Replaces the borrowed Softmax interaction with a raw-score toggle.

### Softmax

- Defines softmax as the function that turns raw scores into probabilities that sum to one.
- Shows logits going in and probabilities coming out.
- Repeats that high probability means likely under the model, not guaranteed true.
- Adds a conversion interaction that toggles from raw score to probability distribution.

### Sampling

- Defines sampling as the decoding step that chooses one generated token from probabilities.
- Keeps Sampling in the Decision Room, before Autoregression.
- States that the chosen token is appended to the response-so-far before the model runs again.
- Repeats the key warning: probability is not truth.

## Visual Changes

- Logits: hidden state feeds a raw score board for candidate tokens.
- Softmax: raw scores convert through a softmax funnel into probabilities that sum to 100%.
- Sampling: a weighted token cloud chooses one token, with low-probability options still visible.
- 320px and 390px screenshots show no horizontal overflow after the label-tightening pass.

## Tiny Interaction Behavior

- Logits asks learners to distinguish raw scores from probabilities.
- Softmax lets learners convert raw scores into probabilities.
- Sampling asks learners to pick the most likely next token from a local context and then reminds them that probability is not truth.

## Glossary Updates

- Updated or added related support for `Logits`, `Softmax`, `Probability`, `Sampling`, `Decoding step`, `Next token`, `Temperature`, `Top-k`, and `Top-p`.
- Learning path order now introduces Logits, then Softmax/Probability, then Sampling and optional decoding settings.

## Image Asset Plan

- No generated Image 2 asset is recommended for this stage.
- The three Decision Room visuals should remain coded SVG/HTML because the exact scores, percentages, labels, and "not truth" distinctions need to stay inspectable and accessible.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning after rerunning serially.
- `npm run audit:answers`: passed.
- Screenshot QA: refreshed 320px and 390px captures, with `overflowX: false` in the manifest.

## Screenshots

- `screenshots/v0-21-2-decision-room-overview-390.png`
- `screenshots/v0-21-2-logits-raw-score-visual-390.png`
- `screenshots/v0-21-2-logits-interaction-390.png`
- `screenshots/v0-21-2-softmax-before-after-visual-390.png`
- `screenshots/v0-21-2-softmax-interaction-390.png`
- `screenshots/v0-21-2-sampling-weighted-visual-390.png`
- `screenshots/v0-21-2-sampling-interaction-390.png`
- `screenshots/v0-21-2-softmax-visual-320.png`
- `screenshots/v0-21-2-sampling-visual-320.png`
- `screenshots/v0-21-2-checkpoint-randomized-logits-390.png`

## Known Issues

- The existing Vite large-chunk warning remains.
- Top-k and top-p are glossary-supported but intentionally not expanded into the main Sampling card visual.

## Readiness For The Day Repeats

Before Morning, Morning Commute, Workday, and Decision Room are ready enough for the next stage audit/implementation pass: The Day Repeats.
