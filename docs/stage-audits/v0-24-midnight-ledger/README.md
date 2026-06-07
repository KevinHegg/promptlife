# Midnight Ledger Stage Audit v0.24

Date: 2026-06-07

## Scope

This is a documentation-only audit of Journey stage 7, `Midnight Ledger`. It captures the current app state and recommends a later implementation pass. No live curriculum copy, Journey order, progress rules, checkpoint randomization, badge logic, games, generated PNG assets, dependencies, or Glossary Dojo code were changed.

## Stage Audited

Midnight Ledger currently contains three Journey cards:

1. `collective-intelligence` - Collective Intelligence, Extracted
2. `costs-we-must-count` - Costs We Must Count
3. `risk-myth` - Risk vs Myth

Prompt Injection / Tool Risk is not a standalone Journey card in the current app. It appears inside Risk vs Myth and the glossary.

## Audit Question

What costs, risks, debts, and power relationships must be counted when using AI?

## Stage Learning Objective

Learners should understand that AI outputs can feel weightless, but AI systems depend on human-created data, data centers, electricity, cooling, hardware, labor, governance, and institutional choices. They should distinguish real risks from myths, avoid treating the model as conscious or magical, and understand why accountability remains human.

## Files

- `README.md` - this overview.
- `card-inventory.md` - per-card current-state inventory.
- `recommendations.md` - stage-level findings and next-pass recommendations.
- `source-review.md` - source discipline review by card and claim.
- `stage-audit.json` - machine-readable audit summary.
- `screenshot-index.md` - screenshot manifest and QA notes.
- `screenshots/` - captured mobile screenshots and QA JSON.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

