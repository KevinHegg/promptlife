# v0.24.1 Midnight Ledger Implementation Report

Date: 2026-06-07

## Scope

Implemented a small Midnight Ledger pass for three existing Journey cards:

- `collective-intelligence` - Collective Intelligence, Extracted
- `costs-we-must-count` - Costs We Must Count
- `risk-myth` - Risk vs Myth

No Journey cards, games, generated PNG assets, dependencies, badge rules, progress rules, checkpoint randomization, or Glossary Dojo logic were added or changed.

## What Changed

- Reworked Collective's coded visual into `Borrowed Flames`: human-created source traces flow into training data while rights questions remain human and institutional.
- Reworked Costs' coded visual into `Cost Ledger`: an AI answer points into infrastructure, human systems, and governance accounting.
- Reworked Risk's coded visual into `Risk Ledger`: real mechanism risks are separated from myths/magical stories.
- Replaced the Collective generic feature-cloud interaction with a sort:
  - Human question: provenance, consent, copyright, compensation.
  - Model mechanics: model weights, prompt tokens.
- Replaced the Costs generic risk interaction with a tap ledger:
  - Energy, Water, Hardware, Labor, Privacy, Governance.
- Replaced the Risk single-claim interaction with a six-item real-risk/myth sort.
- Converted Risk vs Myth into the richer Journey lesson schema with where/why/durable/prompt-response/brain-bridge/checkpoint fields.
- Added glossary entries for risk literacy, tool use, overreliance, vendor lock-in, concentration of power, bias, and information pollution.
- Updated the Learning Path glossary mapping and key-term priorities for the Midnight cards.
- Bumped visible app version to `v0.24.1`.

## Card Notes

### Collective Intelligence, Extracted

The card now foregrounds provenance, consent, copyright, attribution, compensation, and accountability without claiming all data was stolen or that the model understands human culture.

Checkpoint correct answer:

> Patterns from human-created data.

### Costs We Must Count

The visual and interaction now use the ledger frame rather than a hidden-factory frame. Copy remains cautious: costs vary by model, workload, hardware, cooling, region, electricity source, and deployment choices.

Checkpoint correct answer:

> AI costs vary and should be counted before decisions

### Risk vs Myth

The card now teaches mechanism-based risk literacy: privacy exposure, hallucination, prompt injection, insecure tools, overreliance, vendor lock-in, concentration of power, labor disruption, and deskilling are practical concerns; consciousness, omniscience, softmax stealing files, and secret self-training in ordinary chat are myths.

Checkpoint correct answer:

> Uploading private data.

## QA Summary

- 390px QA: Midnight overview, Collective visual, Collective interaction, Costs visual, Costs interaction, Risk visual, Risk sort, and Risk checkpoint feedback captured.
- 320px QA: Costs and Risk visuals captured/checked.
- No horizontal overflow detected at 320px or 390px in captured states.
- Preview mode stayed active for the three cards, so progress did not change during QA.
- Home generated assets loaded successfully.
- Play still exposes Glossary Dojo.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Screenshot Artifacts

- `screenshots/v0-24-1-midnight-ledger-overview-390.png`
- `screenshots/v0-24-1-collective-visual-390.png`
- `screenshots/v0-24-1-collective-interaction-390.png`
- `screenshots/v0-24-1-costs-ledger-visual-390.png`
- `screenshots/v0-24-1-costs-ledger-visual-320.png`
- `screenshots/v0-24-1-costs-ledger-interaction-390.png`
- `screenshots/v0-24-1-risk-visual-390.png`
- `screenshots/v0-24-1-risk-sort-interaction-390.png`
- `screenshots/v0-24-1-risk-checkpoint-feedback-390.png`
- `screenshots/v0-24-1-midnight-implementation-qa.json`

## Known Issues

- The existing Vite large-chunk warning remains.
- The Risk sort screenshot captures the completed multi-item state; the QA JSON records the success feedback text.
- No generated Image 2 assets were added in this pass by design.

## Image 2 Readiness

Before Morning is already ready for Image 2 asset generation from earlier passes. For Midnight Ledger, the next best Image 2 candidate is Costs We Must Count, but only as a textless supporting asset with all instructional labels kept in HTML.
