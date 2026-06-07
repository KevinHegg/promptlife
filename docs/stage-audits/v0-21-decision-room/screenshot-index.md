# Decision Room Screenshot Index v0.21

Date: 2026-06-06

Screenshots were captured from the local dev server at `http://127.0.0.1:5173/?debug=1&v=021-decision-audit`.

Primary viewport: 390 x 844.

Spot-check viewports: 320 x 844 and 430 x 844 for visual-aid areas.

Progress safety: screenshots used a temporary Chrome profile and Preview mode for lesson cards. `promptlife:v1:progress` stayed `[]`.

Manifest: `screenshots/_screenshot-manifest.json`

## Journey / Stage

- `screenshots/journey-top.png`
- `screenshots/decision-room-stage-link.png`
- `screenshots/decision-room-overview.png`

## Logits

- `screenshots/logits-hero.png`
- `screenshots/logits-visual-aid.png`
- `screenshots/logits-core-idea.png`
- `screenshots/logits-model-lifecycle.png`
- `screenshots/logits-brain-bridge.png`
- `screenshots/logits-tiny-interaction.png`
- `screenshots/logits-checkpoint.png`
- `screenshots/logits-wrong-feedback.png`
- `screenshots/logits-correct-feedback.png`
- `screenshots/logits-bottom-action.png`
- `screenshots/logits-visual-aid-320.png`
- `screenshots/logits-visual-aid-430.png`

## Softmax

- `screenshots/softmax-hero.png`
- `screenshots/softmax-visual-aid.png`
- `screenshots/softmax-core-idea.png`
- `screenshots/softmax-model-lifecycle.png`
- `screenshots/softmax-brain-bridge.png`
- `screenshots/softmax-tiny-interaction.png`
- `screenshots/softmax-checkpoint.png`
- `screenshots/softmax-wrong-feedback.png`
- `screenshots/softmax-correct-feedback.png`
- `screenshots/softmax-bottom-action.png`
- `screenshots/softmax-visual-aid-320.png`
- `screenshots/softmax-visual-aid-430.png`

## Sampling

- `screenshots/sampling-hero.png`
- `screenshots/sampling-visual-aid.png`
- `screenshots/sampling-core-idea.png`
- `screenshots/sampling-model-lifecycle.png`
- `screenshots/sampling-brain-bridge.png`
- `screenshots/sampling-tiny-interaction.png`
- `screenshots/sampling-checkpoint.png`
- `screenshots/sampling-wrong-feedback.png`
- `screenshots/sampling-correct-feedback.png`
- `screenshots/sampling-bottom-action.png`
- `screenshots/sampling-visual-aid-320.png`
- `screenshots/sampling-visual-aid-430.png`

## QA Notes

- Decision Room stage link and overview were captured from Journey with Logits set as the current lesson in a temporary profile.
- Lesson cards were captured in Preview mode, so checkpoint interactions did not update Journey progress.
- Checkpoint answers were randomized by existing seeded answer logic.
- No horizontal overflow was detected at the final 430px spot check.
- Bottom nav can appear over the bottom edge of tall screenshots, but required controls remained reachable.
