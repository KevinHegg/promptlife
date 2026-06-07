# Workday Screenshot Index v0.20

Date: 2026-06-06

Screenshots were captured from the local dev server at `http://127.0.0.1:5173/?debug=1&v=020-workday-audit`.

Primary viewport: 390 x 844.

Spot-check viewports: 320 x 844 and 430 x 844 for visual-aid areas.

Progress safety: screenshots used a temporary browser profile, Preview mode, and `promptlife:v1:progress` stayed `[]` in the screenshot manifest.

Manifest: `screenshots/_screenshot-manifest.json`

v0.20.1 implementation manifest: `screenshots/v0-20-1-screenshot-manifest.json`

## v0.20.1 Implementation Screenshots

Captured from `http://127.0.0.1:5173/?debug=1` after the Workday visual and interaction repair pass.

Primary viewport: 390 x 844.

Spot-check viewport: 320 x 844 for dense visual aids.

Progress safety: screenshots used Preview mode and a temporary profile. The manifest records `promptlife:v1:progress` as `[]`.

- `screenshots/v0-20-1-workday-overview-390.png`
- `screenshots/v0-20-1-attention-visual-390.png`
- `screenshots/v0-20-1-attention-interaction-feedback-390.png`
- `screenshots/v0-20-1-mlp-toggle-390.png`
- `screenshots/v0-20-1-layers-stack-inspector-390.png`
- `screenshots/v0-20-1-hidden-states-flow-390.png`
- `screenshots/v0-20-1-hidden-states-sort-390.png`
- `screenshots/v0-20-1-hidden-states-checkpoint-feedback-390.png`
- `screenshots/v0-20-1-mlp-visual-320.png`
- `screenshots/v0-20-1-layers-visual-320.png`
- `screenshots/v0-20-1-hidden-states-visual-320.png`

## Journey / Stage

- `screenshots/journey-top.png`
- `screenshots/workday-stage-link.png`
- `screenshots/workday-overview.png`

## Attention

- `screenshots/attention-hero.png`
- `screenshots/attention-visual-aid.png`
- `screenshots/attention-core-idea.png`
- `screenshots/attention-model-lifecycle.png`
- `screenshots/attention-brain-bridge.png`
- `screenshots/attention-tiny-interaction.png`
- `screenshots/attention-checkpoint.png`
- `screenshots/attention-wrong-feedback.png`
- `screenshots/attention-correct-feedback.png`
- `screenshots/attention-bottom-action.png`
- `screenshots/attention-visual-aid-320.png`
- `screenshots/attention-visual-aid-430.png`

## MLP

- `screenshots/mlp-hero.png`
- `screenshots/mlp-visual-aid.png`
- `screenshots/mlp-core-idea.png`
- `screenshots/mlp-model-lifecycle.png`
- `screenshots/mlp-brain-bridge.png`
- `screenshots/mlp-tiny-interaction.png`
- `screenshots/mlp-checkpoint.png`
- `screenshots/mlp-wrong-feedback.png`
- `screenshots/mlp-correct-feedback.png`
- `screenshots/mlp-bottom-action.png`
- `screenshots/mlp-visual-aid-320.png`
- `screenshots/mlp-visual-aid-430.png`

## Layers

- `screenshots/layers-hero.png`
- `screenshots/layers-visual-aid.png`
- `screenshots/layers-core-idea.png`
- `screenshots/layers-model-lifecycle.png`
- `screenshots/layers-brain-bridge.png`
- `screenshots/layers-tiny-interaction.png`
- `screenshots/layers-checkpoint.png`
- `screenshots/layers-wrong-feedback.png`
- `screenshots/layers-correct-feedback.png`
- `screenshots/layers-bottom-action.png`
- `screenshots/layers-visual-aid-320.png`
- `screenshots/layers-visual-aid-430.png`

## Hidden States

- `screenshots/hidden-states-hero.png`
- `screenshots/hidden-states-visual-aid.png`
- `screenshots/hidden-states-core-idea.png`
- `screenshots/hidden-states-model-lifecycle.png`
- `screenshots/hidden-states-brain-bridge.png`
- `screenshots/hidden-states-tiny-interaction.png`
- `screenshots/hidden-states-checkpoint.png`
- `screenshots/hidden-states-wrong-feedback.png`
- `screenshots/hidden-states-correct-feedback.png`
- `screenshots/hidden-states-bottom-action.png`
- `screenshots/hidden-states-visual-aid-320.png`
- `screenshots/hidden-states-visual-aid-430.png`

## QA Notes

- Workday stage link scroll worked in the temporary browser capture.
- Journey bottom navigation remained visible; no progress mutation was recorded.
- Checkpoint answer order was randomized by existing seeded answer logic.
- Bottom nav can cover the very bottom of long screenshots, but it did not hide required action controls when scrolled into view.
- The Workday cards do not yet show explicit model-lifecycle rows because the live lesson data does not include `stageType` for these cards.
