# Decision Room Stage Audit v0.21

Date: 2026-06-06

## Scope

This is a documentation-only audit of Journey stage 4, Decision Room.

Cards audited:

1. Logits
2. Softmax
3. Sampling

The audit captures the current app honestly and recommends a later implementation pass. It does not change live curriculum, Journey order, progress rules, checkpoint randomization, games, badge logic, generated assets, dependencies, or Glossary Dojo code.

## Stage Objective

Learners should understand how the model turns processed hidden states into one chosen next response token:

1. Final hidden states are projected into raw vocabulary scores.
2. Those raw scores are logits.
3. Softmax converts logits into next-token probabilities.
4. Sampling or decoding chooses one token.
5. The chosen token is appended to the context and the process can repeat.

## Files

- `card-inventory.md`: current-state inventory for each card.
- `recommendations.md`: stage-level findings and next-pass recommendations.
- `stage-audit.json`: machine-readable audit summary.
- `screenshot-index.md`: screenshot list and QA notes.
- `screenshots/`: captured mobile screenshots.
- `prompt-life-v0-21-decision-room-audit-report.html`: internal review report source.
- `prompt-life-v0-21-decision-room-audit-report.pdf`: internal review PDF with screenshots.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Screenshot capture used a temporary Chrome profile. `promptlife:v1:progress` stayed `[]`.
