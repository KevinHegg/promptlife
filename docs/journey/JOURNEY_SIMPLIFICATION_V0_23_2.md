# Journey Simplification v0.23.2

Date: 2026-06-07

## Summary

This pass simplifies the learner-facing Journey screen so Prompt Life feels like one guided curriculum with one eventual badge: `Prompt Life: Model Literate`.

No Journey card content, Journey order, checkpoint randomization, progress storage, badge logic, Glossary Dojo behavior, generated assets, dependencies, or games changed.

## What Changed

- Removed the learner-facing Path View section from Journey.
- Removed the All, Essential, Deep, and Ethics Journey filter buttons.
- Removed Journey count copy such as filtered card totals.
- Removed Guided Comparisons from the Journey screen.
- Kept the 8-stage jump grid and compact v0.23.1 labels.
- Added one concise helper line below the stage grid:

`All stages follow one prompt through the full day: before training, through inference, generation, evidence, risks, costs, and better human use.`

- Updated Badge copy to emphasize one confidence badge:

`Complete the Journey checkpoints and practice activities to earn one confidence badge: Prompt Life: Model Literate.`

- Bumped the visible app version to `v0.23.2`.

## Why Path Filters Were Removed

The old Path View gave learners extra choices before they needed them. It also made the badge feel like it might be tied to competing routes. The simplified Journey now presents the curriculum as one coherent day-in-the-life sequence.

Path labels remain useful as internal curriculum metadata, but they no longer appear as a learner-facing filter system.

## What Remains Internally

- Lesson `pathType` metadata remains in the content data.
- `getPathLabel` remains available for review/audit surfaces and the existing badge threshold.
- Review/debug routes can still expose path labels when they are useful for curriculum work.

This preserves auditability without asking ordinary learners to choose Essential, Deep, or Ethics views.

## Why Guided Comparisons Moved Out Of Journey

Journey now focuses on the lesson-card sequence. Practice challenges, simulations, and comparison activities belong in Play, where learners expect action-based reinforcement.

Play still includes:

- Prompt Run
- Context Stack
- Attention Weave
- Token Pipeline Relay
- Glossary Dojo
- How AI Learns

## One-Badge Model

The Badge page now frames the outcome as one confidence badge:

`Prompt Life: Model Literate`

Learner-facing copy avoids path requirements, multiple badge language, leaderboard language, and competition framing.

## Mobile QA

Screenshots:

- `docs/journey/screenshots/journey-v0-23-2-top-390.png`
- `docs/journey/screenshots/journey-v0-23-2-top-320.png`
- `docs/journey/screenshots/journey-v0-23-2-stage-grid.png`
- `docs/journey/screenshots/badge-v0-23-2-single-badge-copy.png`

Machine-readable QA:

- `docs/journey/screenshots/journey-simplification-v0-23-2-qa.json`

Results:

- 390px: Journey title, intro, stage grid, helper, and first stage content render in order.
- 390px: no Path View, no path filter buttons, no Guided Comparisons section in Journey.
- 390px: all eight stage buttons scrolled to the correct section; Journey bottom nav returned to top.
- 320px: no Path View, no path filter buttons, no Guided Comparisons section in Journey.
- 320px: stage grid remained four columns with no tile box overflow and no horizontal page overflow.
- Badge screenshot shows the one-badge copy.
- Play retained the game/practice/comparison activities.
- Glossary Dojo was spot-checked from Play and still opened.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Known Issues

- Badge copy is now one-badge language, but the unlock threshold still uses the existing internal qualifying-lesson calculation. Because this pass explicitly avoided badge-logic changes, a future badge-logic pass should simplify or rename that internal threshold.
- The existing Vite large-chunk warning remains.
- The strict 320px DOM QA notes wrapped text-line width on several stage labels, but the tile boxes themselves did not overflow and screenshot review showed no clipped visible text.

## Next Recommended Steps

1. Simplify the internal badge threshold names so they match the one-Journey mental model.
2. Add a small internal-only review toggle for path metadata if future audits still need it.
3. Revisit the Journey stage-grid font/spacing after the next content change to keep 320px labels comfortably readable.
