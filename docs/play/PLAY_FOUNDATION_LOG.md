# Play Foundation Log

## 2026-06-07 - v0.26.3 Glossary Dojo Shared Shell Wrap

### Summary

- Wrapped Glossary Dojo in the shared Play Challenge Foundation shell while preserving the quiz engine and 12-question learning loop.
- Replaced the custom Dojo hero/meter with `PlayChallengeShell`, `PlayChallengeHeader`, `PlayStatusPill`, and `PlayProgressRail`.
- Replaced visible answer feedback panels with `PlayFeedbackPanel`.
- Added feedback lead language:
  - `Good distinction.`
  - `This choice reveals a common mix-up.`
- Reworked the round summary with `PlayCompletionPanel` and `PlayActionRow`.
- Changed the summary action from `Start next round` to `Try another round`.
- Changed the review action from `Review missed questions` to `Review missed terms`.
- Preserved existing Dojo storage, glossary data, distractor logic, round generation, repeat rounds, review rounds, and calm non-score design.
- Kept shared Play attempt/completion tracking through `promptlife.playChallenges.v1`.
- Bumped the visible app version to `v0.26.3`.

### Recommendations For The Next Pass

- Move Context Stack onto the same shared Play shell and completion-panel pattern.
- Add a compact debug-only Play progress viewer after the final Play storage shape stabilizes.
- Consider a purpose-built Attention Match challenge after Probability Picker.

### Challenges And Risks

- The Dojo engine still returns detailed feedback text that begins with older phrases internally; the visible UI now strips those leads and adds the new calm lead language.
- The Dojo round completion remains owned by `promptlife.glossaryDojo.v1`; the shared Play key records attempt/completion summary only.
- The existing Vite large-chunk warning remains.

### UI Cards, Screens, Scenes, And Routes Changed

- Glossary Dojo start screen: now uses shared Play shell/header/status/progress/feedback/action components.
- Glossary Dojo question screen: now uses shared Play shell/header/status/progress/feedback/action components.
- Glossary Dojo answer feedback: now starts with `Good distinction.` or `This choice reveals a common mix-up.`
- Glossary Dojo completion screen: now uses shared completion panel and clearer `Round completed` / `Review suggested` language.
- Glossary Dojo summary actions: `Try another round`, `Repeat this round`, `Review missed terms`.
- Badge page: QA checked with shared Play Dojo progress; no badge logic change.
- Reset progress: QA checked; shared Play and Dojo keys clear through the existing reset flow.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Preserved/read/written: `promptlife.playChallenges.v1`.
- Preserved/read/written by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved/read for bridge compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for bridge compatibility: `pl.gameInsights`.
- Preserved/read for bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read for bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for bridge compatibility: `pl.learningTourComplete`.
- Preserved: existing Journey, exercise, reflection, choice-order, and Prompt Run keys.
- Reset QA confirmed `promptlife.playChallenges.v1` and `promptlife.glossaryDojo.v1` are cleared by the existing reset flow.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Glossary Dojo opened from Play, started a 12-question round, advanced from question 1 to question 2, showed common-mix-up feedback, showed good-distinction feedback, completed a round, wrote shared Play progress as `review-suggested`, loaded Badge at `v0.26.3`, and reset cleared shared Play and Dojo keys.
- Browser QA at 320px: passed. Dojo question screen showed `Question 1 of 12`, four answer choices, and no horizontal overflow.

### Screenshots And Report

- `docs/play/screenshots/v0-26-3-dojo-start-390.png`
- `docs/play/screenshots/v0-26-3-dojo-common-mixup-feedback-scrolled-390.png`
- `docs/play/screenshots/v0-26-3-dojo-good-distinction-feedback-390.png`
- `docs/play/screenshots/v0-26-3-dojo-summary-390.png`
- `docs/play/screenshots/v0-26-3-dojo-question-320.png`
- `docs/play/screenshots/v0-26-3-badge-dojo-shell-390.png`
- `docs/play/screenshots/v0-26-3-dojo-shell-screenshots.json`
- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.html`
- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.pdf`

### Files Changed

- `src/features/play/PlayChallengeComponents.tsx`
- `src/features/glossary-dojo/GlossaryDojoGame.tsx`
- `src/features/glossary-dojo/GlossaryDojoSummary.tsx`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/REVIEW_NOTES.md`
- `docs/play/screenshots/v0-26-3-dojo-start-390.png`
- `docs/play/screenshots/v0-26-3-dojo-common-mixup-feedback-scrolled-390.png`
- `docs/play/screenshots/v0-26-3-dojo-good-distinction-feedback-390.png`
- `docs/play/screenshots/v0-26-3-dojo-summary-390.png`
- `docs/play/screenshots/v0-26-3-dojo-question-320.png`
- `docs/play/screenshots/v0-26-3-badge-dojo-shell-390.png`
- `docs/play/screenshots/v0-26-3-dojo-shell-screenshots.json`
- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.html`
- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.pdf`

## 2026-06-07 - v0.26.2 Play Slate Simplification

### Summary

- Confirmed the Play Challenge Foundation is in place and used it as the source for the visible Play slate.
- Kept only the final or likely-final visible Play challenges:
  - Glossary Dojo
  - Context Stack
  - Probability Picker
  - Prompt Run
  - Attention Match
- Tightened the five card descriptions to match the simplified slate language.
- Labeled Prompt Run as the capstone challenge.
- Kept Probability Picker as a disabled `Foundation ready` / `Coming soon` card so it does not create fake progress.
- Kept Attention Match as the visible final-slate card while safely reusing the current Attention Weave interaction.
- Confirmed Token Pipeline Relay and How AI Learns stay out of the normal Play slate and remain compatibility-only retired items.
- Bumped the visible app version to `v0.26.2`.

### Recommendations For The Next Pass

- Build Probability Picker as the next complete Play challenge.
- Replace the Attention Match foundation bridge with a purpose-built token dependency matching activity.
- Move Context Stack onto the shared Play challenge shell for tighter visual consistency.
- Consider a debug-only local progress viewer after the final Play storage shape settles.

### Challenges And Risks

- This pass intentionally preserves old routes and progress bridges rather than deleting legacy Play code.
- Probability Picker is not playable yet; it is present only as a foundation-ready final slate slot.
- Attention Match still relies on the old Attention Weave interaction underneath.
- The existing Vite large-chunk warning remains.

### UI Cards, Screens, Scenes, And Routes Changed

- Play page: visible slate confirmed as exactly five final/likely-final cards.
- Glossary Dojo card: simplified purpose line to `Practice concept discrimination.`
- Context Stack card: simplified purpose line to `See what fits in context.`
- Probability Picker card: simplified purpose line to `Explore probability-shaped next-token choices.`
- Prompt Run card: relabeled as `Capstone challenge: trace one prompt through the whole loop.` and action `Start capstone`.
- Attention Match card: simplified purpose line to `Connect a token to what it depends on.`
- Retired compatibility route: Token Pipeline Relay remains available only through retired handling if reached indirectly.
- Retired compatibility route: How AI Learns remains available only through retired handling if reached indirectly.
- Badge page: checked against the simplified Play count; badge logic was not changed.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Created/read/written by the foundation, preserved in this pass: `promptlife.playChallenges.v1`.
- Preserved/read for bridge compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for bridge compatibility: `pl.gameInsights`.
- Preserved/read for bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read for bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for bridge compatibility: `pl.learningTourComplete`.
- Preserved/read independently by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved: existing Journey, exercise, reflection, choice-order, and Prompt Run keys. No existing progress was wiped.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Play showed exactly Glossary Dojo, Context Stack, Probability Picker, Prompt Run, and Attention Match; Token Pipeline Relay and How AI Learns were absent; Glossary Dojo, Context Stack, Prompt Run, and Attention Match opened; Probability Picker stayed disabled as foundation-ready; Badge loaded at `v0.26.2`; no horizontal overflow.
- Browser QA at 320px: passed with the same five-card slate, working challenge opens, disabled Probability Picker, active Play bottom nav, reduced-motion emulation, and no horizontal overflow.

### Screenshots And Report

- `docs/play/screenshots/v0-26-2-play-slate-390.png`
- `docs/play/screenshots/v0-26-2-play-slate-320.png`
- `docs/play/screenshots/v0-26-2-badge-play-slate-390.png`
- `docs/play/screenshots/v0-26-2-play-slate-screenshots.json`
- `docs/play/prompt-life-v0-26-2-play-slate-simplification-report.html`
- `docs/play/prompt-life-v0-26-2-play-slate-simplification-report.pdf`

## 2026-06-07 - v0.26.1 Play Challenge Foundation

### Summary

- Added a shared Play challenge model for calm, non-competitive practice progress.
- Added versioned Play challenge localStorage under `promptlife.playChallenges.v1`.
- Added reusable Play UI chassis components for challenge shells, headers, boards, cards, status pills, progress rails, feedback panels, action rows, choice buttons, token chips, scroll hints, and completion panels.
- Added the final Play slate registry:
  - Glossary Dojo
  - Context Stack
  - Probability Picker
  - Prompt Run
  - Attention Match
- Hid Token Pipeline Relay and How AI Learns from the normal Play slate while preserving compatibility metadata.
- Reframed the current Attention Weave activity as the foundation version of Attention Match without rebuilding the game.
- Updated Badge's Play stat to use final-slate challenge progress without changing badge unlock rules.
- Bumped the visible app version to `v0.26.1`.

### Recommendations For The Next Pass

- Build Probability Picker as the next full challenge using logits, softmax, sampling, and probability-is-not-truth feedback.
- Convert the current Attention Match foundation screen into a 3-5 prompt set with clearer target/source token matching.
- Refactor Context Stack onto `PlayChallengeShell` so the live challenge UI uses the same board/action primitives as the Play page.
- Add a small migration report panel in debug mode if users need to inspect bridged legacy progress.

### Challenges And Risks

- Legacy Play progress is split across `gameInsights`, `traceComplete`, Prompt Run progress, Glossary Dojo progress, and the old learning-tour flag. The foundation bridges these rather than migrating or deleting them.
- Glossary Dojo has its own mature storage engine. The new Play key records starts/completions only; Dojo mastery remains in `promptlife.glossaryDojo.v1`.
- Probability Picker is intentionally not implemented yet, so its card is marked `Foundation ready` / `Coming soon` and does not create a fake completion state.
- The production bundle still has the existing Vite large-chunk warning.

### UI Cards, Screens, Scenes, And Routes Changed

- Play page: replaced old Featured/Practice/Glossary/Guided sections with a single final-slate challenge board.
- Play challenge cards: now show status, attempts, completion state, progress rail, ten-second idea, model move, time, and related Journey stages.
- Glossary Dojo: start/repeat/review actions now notify the shared Play progress foundation while preserving Dojo storage.
- Prompt Run: completion now marks the shared Play challenge complete while preserving existing Prompt Run progress.
- Context Stack: insight unlock now marks the shared Play challenge complete while preserving legacy `gameInsights`.
- Attention Match: visible title/copy reframed from Attention Weave; existing relevance mechanic preserved for the foundation pass.
- Probability Picker: added foundation-ready placeholder screen.
- Token Pipeline Relay: removed from the normal Play slate and preserved as retired compatibility metadata.
- How AI Learns: removed from the normal Play slate and preserved as retired compatibility metadata.
- Badge screen: Play stat now reports completed final Play challenge slots instead of old mini-game count.
- Badge reset copy: now names Play challenge progress.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Created/read/written: `promptlife.playChallenges.v1`.
- Preserved/read for bridge compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for bridge compatibility: `pl.gameInsights`.
- Preserved/read for bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read for bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for bridge compatibility: `pl.learningTourComplete`.
- Preserved/read independently by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved: existing Journey, exercise, reflection, choice-order, and Prompt Run keys. No old progress key is wiped except through the existing explicit reset/debug-clear flows.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning after a sequential rerun. The first attempt was run in parallel with another build and hit a temporary `dist/assets` cleanup race.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Play page loaded, bottom nav showed Play active, final slate showed Glossary Dojo, Context Stack, Probability Picker, Prompt Run, and Attention Match; deprecated Token Pipeline Relay and How AI Learns were absent; Glossary Dojo opened; Prompt Run opened; Badge page loaded with `0 of 5 play challenges`; no horizontal overflow.
- Browser QA at 320px: passed with the same final slate, no deprecated cards, Glossary Dojo and Prompt Run opening, Probability Picker disabled as foundation-ready, reduced-motion emulation respected, and no horizontal overflow.

### Screenshots And Report

- `docs/play/screenshots/v0-26-1-play-foundation-390.png`
- `docs/play/screenshots/v0-26-1-play-foundation-320.png`
- `docs/play/screenshots/v0-26-1-badge-play-foundation-390.png`
- `docs/play/screenshots/v0-26-1-play-foundation-screenshots.json`
- `docs/play/prompt-life-v0-26-1-play-foundation-report.html`
- `docs/play/prompt-life-v0-26-1-play-foundation-report.pdf`

### Files Changed

- `src/features/play/types.ts`
- `src/features/play/storage.ts`
- `src/features/play/challengeRegistry.ts`
- `src/features/play/PlayChallengeComponents.tsx`
- `src/features/glossary-dojo/GlossaryDojoGame.tsx`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/play/PLAY_FOUNDATION_LOG.md`
