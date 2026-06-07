# Workday Stage Audit v0.20

Date: 2026-06-06

## Scope

This is a documentation-only audit of Journey stage 3, Workday. It captures the current state of the existing cards and recommends a later implementation pass. No live curriculum, Journey order, progress rules, checkpoint randomization, generated PNG assets, games, dependencies, or badge logic were changed.

## Stage Audited

Workday asks: what happens inside transformer layers after text has become tensors?

Current Workday cards:

1. Attention
2. MLP
3. Layers
4. Hidden States

## Files In This Package

- `stage-audit.json`: machine-readable card-level recommendation summary.
- `card-inventory.md`: extracted current card content and audit notes.
- `recommendations.md`: stage-level findings, visual strategy, tiny-interaction plan, and next implementation prompt.
- `screenshot-index.md`: screenshot manifest and QA notes.
- `screenshots/`: 390px required screenshots plus 320px and 430px visual spot checks.
- `prompt-life-v0-20-workday-audit-report.pdf`: internal review report with representative screenshots.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning. An earlier parallel run collided with `build:pages` while both tried to clean `dist`; rerunning `npm run build` by itself passed.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Key Finding

The Workday cards are in the right order and teach the right concepts, but they still use the older slim lesson schema. Compared with the polished Morning Commute cards, they need stronger explicit lifecycle placement, durable-versus-temporary language, prompt/context/response notes, and more instructional visuals.
