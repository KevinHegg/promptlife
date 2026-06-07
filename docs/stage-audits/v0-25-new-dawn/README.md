# New Dawn Stage Audit v0.25

Date: 2026-06-07

## Scope

This audit covers the eighth Journey stage, `New Dawn`.

Cards audited:

1. Benefits Worth Taking Seriously
2. Human-Centered AI
3. Better AI Is a Choice
4. Effective Prompting from Model Literacy
5. Model Literate Synthesis

This was an audit-only pass. No live Journey cards, games, generated PNG assets, dependencies, progress rules, checkpoint randomization, badge logic, or Glossary Dojo logic were changed.

## Core Question

How can model literacy help people use, govern, and improve AI responsibly?

## Stage Objective

Learners should leave the Journey understanding that AI benefits are real but uneven, costs and risks are real but not destiny, and better AI depends on human choices: design, governance, evidence, privacy, labor practices, sustainability, accountability, and review. The final card should help learners explain what an LLM is, what it is not, and how a prompt becomes a response without treating the model as magic.

## Artifacts

- `card-inventory.md` - Current state and card-by-card audit.
- `recommendations.md` - Stage-level recommendations and next implementation prompt.
- `source-review.md` - Source discipline review by claim.
- `stage-audit.json` - Machine-readable audit summary.
- `screenshot-index.md` - Screenshot index and QA notes.
- `screenshots/` - 59 mobile screenshot captures.
- `screenshots/new-dawn-v0-25-screenshot-manifest.json` - Combined screenshot manifest.
- `prompt-life-v0-25-new-dawn-stage-audit-report.html` - Internal review report.
- `prompt-life-v0-25-new-dawn-stage-audit-report.pdf` - Internal review PDF.

## Capture Method

Screenshots were captured against `http://127.0.0.1:5173/` with temporary headless Chrome profiles and CDP. LocalStorage was isolated from the user's browser. Earlier lessons were marked complete only inside the temporary profile so New Dawn appeared as the current Journey stage. Lesson screenshots used Review mode where possible, so Journey progress was not changed.

The optional review-route source/caveat screenshot pass was skipped after the first capture run hung at that route. Source status is documented from `src/data/sourceRegistry.ts` and `docs/curriculum/SOURCE_REVIEW_V0_16.md` instead. The learner-facing lesson cards do not currently show a source/caveat panel.

## Major Findings

New Dawn is conceptually correct and broadly well sequenced. The stage is hopeful without hype, ethical without scolding, and it preserves the one-badge model: `Prompt Life: Model Literate`.

The main weakness is not the copy. It is that the final stage still relies on decorative or generic coded visuals and tiny interactions. Benefits, Human-Centered AI, Better AI, Effective Prompting, and Synthesis all need interactions that ask learners to do small acts of judgment rather than simply witness a metaphor.

The source posture is mostly good. Benefits and Better AI remain intentionally cautious, while Human-Centered AI and Effective Prompting have stronger review support. Claims about benefit domains, labor transition, energy/water mitigation, dignity frameworks, institutional governance, and human review should remain carefully scoped.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Next Step

Run a small New Dawn implementation pass that keeps the five existing cards and one badge, then upgrades visual clarity, tiny interactions, and source-aware wording without expanding the Journey.
