# Prompt Life Developer Notes

## v0.27.12 Badge and Learner-Copy Boundary

The normal learner UI must stay free of implementation labels, developer checkpoint bank notes, active-bank indicators, and query-parameter instructions. The active Journey checkpoint bank remains available in code as `src/data/checkpointBankV02712.ts`, and the legacy checkpoint comparison switch remains available for developer validation, but those details belong here, in review notes, generated reports, console diagnostics, or an unlinked diagnostic route.

Current developer-only checkpoint comparison routes:

- `?legacyCheckpoints=1`
- `?checkpointBank=legacy`

Do not surface those strings in Home, Journey, lesson, Play, Glossary, or Badge learner flows.

The Badge page is intentionally not issuing a credential yet. It should say the badge is under construction, pending human review, and not yet issued. Progress shown there is practice evidence saved on the current device.

Badge issuance status: not yet issued.

Human review status: pending.

Recommended checks before shipping learner UI changes:

- `npm run typecheck`
- `npm run build`
- `npm run build:pages`
- `npm run audit:answers`
- `npm run audit:checkpoints`
- `npm run audit:learner-copy`

Run `npm run audit:learner-copy` before shipping UI changes that might touch learner-facing copy.

## v0.27.13 Badge PNG Integration

The Badge page now uses `public/assets/promptlife/brand/model-literate-badge-v0-27-13.png` as the visible Prompt Life: Model Literate artwork. The image is decorative/supporting; status, issuance, evidence, and review language must remain in HTML so the page remains accessible and clear.

Badge issuance status remains not yet issued.

Human review status remains pending.
