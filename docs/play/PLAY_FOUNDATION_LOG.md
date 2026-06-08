# Play Foundation Log

## 2026-06-08 - v0.26.8 Play Landing Microcopy And Practice Move Cleanup

### Summary

- Removed the unlabeled top progress-panel chips:
  - `name`
  - `place`
  - `choose`
  - `connect`
  - `trace`
- Added a short replacement sentence: `Each challenge practices one model-literacy move.`
- Removed the decorative `Practice set` pill from the Play challenges heading.
- Added explicit learner-facing practice moves to each Play challenge card:
  - Glossary Dojo: `Practice move: Name concepts`
  - Attention Match: `Practice move: Connect token clues`
  - Probability Picker: `Practice move: Choose likely next tokens`
  - Context Stack: `Practice move: Place context cards`
  - Prompt Run: `Practice move: Trace the loop`
- Cleaned stat language:
  - active Glossary Dojo now shows `Current: N correct`
  - date labels now say `Last played: Today`, `Last played: Yesterday`, or a compact date
  - started-but-unscored challenges show `Current: Started`
  - coming-soon challenges still show no fake attempts or fake best result
- Kept Journey stage mapping, related learning cards, challenge order, badge rules, Journey progress, and Play storage behavior unchanged.
- Bumped the visible app version to `v0.26.8`.

### Recommendations For The Next Pass

- Implement Probability Picker as the next complete challenge.
- Replace the Attention Match compatibility interaction with a purpose-built final activity.
- Consider shortening or hiding repeated `Practice started. Progress saved on this device.` outcomes on landing cards if they begin to feel noisy after more Play passes.

### Challenges And Risks

- Existing local QA progress can show some cards as `In progress`; this pass improves how that state reads but does not wipe or migrate progress.
- Reset progress asks for confirmation. Automated reset QA needed to accept the confirm dialog before verifying key removal.
- The existing Vite large-chunk warning remains.

### UI Cards, Screens, Scenes, And Routes Changed

- Play landing top progress panel: removed verb chips and added one calm explanatory sentence.
- Play challenges heading: removed the `Practice set` pill.
- Glossary Dojo challenge card: added `Practice move: Name concepts` and active-progress wording.
- Attention Match challenge card: added `Practice move: Connect token clues`.
- Probability Picker challenge card: added `Practice move: Choose likely next tokens`; coming-soon handling unchanged.
- Context Stack challenge card: added `Practice move: Place context cards`.
- Prompt Run challenge card: added `Practice move: Trace the loop`.
- Badge page: QA only; no copy or badge logic changed in this pass.
- Reset progress flow: QA only; no reset logic changed.

### Learner-Facing Copy Changes

- Removed unlabeled top chips: `name`, `place`, `choose`, `connect`, `trace`.
- Added: `Each challenge practices one model-literacy move.`
- Added `Practice move:` lines to all visible Play challenge cards.
- Removed `Practice set` from the Play challenges heading area.
- Changed `Last:` stat language to `Last played:`.
- Changed active Glossary Dojo progress from best-style wording to `Current: N correct`.
- Changed started-unscored progress to `Current: Started`.

### LocalStorage Keys Created, Read, Migrated, Written, Or Preserved

- Read/displayed through shared Play summaries: `promptlife.playChallenges.v1`.
- Preserved/read for legacy Context Stack insight compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for legacy Context Stack insight compatibility: `pl.gameInsights`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for Prompt Run bridge compatibility: `pl.traceComplete`.
- Preserved/read for learning-tour bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for learning-tour bridge compatibility: `pl.learningTourComplete`.
- Preserved/read independently by Dojo: `promptlife.glossaryDojo.v1`.
- Reset QA verified that `promptlife.playChallenges.v1` and `promptlife.glossaryDojo.v1` clear after confirmation.
- No storage migration, new storage key, Journey progress change, or badge logic change was added.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Play loaded, top chips were removed, the progress panel was shorter, each challenge card showed a practice move, Glossary Dojo active stats were clear, Probability Picker remained coming soon, route smoke checks passed, Badge loaded with `v0.26.8`, and no horizontal overflow was detected.
- Browser QA at 320px: passed. Top panel, challenge cards, stage chips, practice move lines, stat rows, vertical scrolling, and bottom nav remained usable with no horizontal overflow.
- Isolated reset QA: passed after accepting the confirmation dialog; shared Play progress and Glossary Dojo progress were cleared.

### Screenshots And Report

- `docs/play/screenshots/v0-26-8-play-landing-390.png`
- `docs/play/screenshots/v0-26-8-play-landing-320.png`
- `docs/play/screenshots/v0-26-8-play-active-progress-card-390.png`
- `docs/play/screenshots/v0-26-8-probability-coming-soon-390.png`
- `docs/play/screenshots/v0-26-8-badge-390.png`
- `docs/play/screenshots/v0-26-8-play-landing-microcopy-screenshots.json`
- `docs/play/prompt-life-v0-26-8-play-landing-microcopy-report.html`
- `docs/play/prompt-life-v0-26-8-play-landing-microcopy-report.pdf`

### Files Changed

- `README.md`
- `package.json`
- `package-lock.json`
- `src/features/play/PlayChallengeComponents.tsx`
- `src/features/play/challengeRegistry.ts`
- `src/features/play/types.ts`
- `src/main.tsx`
- `docs/REVIEW_NOTES.md`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/screenshots/v0-26-8-play-landing-390.png`
- `docs/play/screenshots/v0-26-8-play-landing-320.png`
- `docs/play/screenshots/v0-26-8-play-active-progress-card-390.png`
- `docs/play/screenshots/v0-26-8-probability-coming-soon-390.png`
- `docs/play/screenshots/v0-26-8-badge-390.png`
- `docs/play/screenshots/v0-26-8-play-landing-microcopy-screenshots.json`
- `docs/play/prompt-life-v0-26-8-play-landing-microcopy-report.html`
- `docs/play/prompt-life-v0-26-8-play-landing-microcopy-report.pdf`

## 2026-06-08 - v0.26.7 Play Landing Polish And Stage Mapping

### Summary

- Updated the Play landing header to `PLAY LAB`, `Play to learn`, and `Short, calm challenges that make model mechanics visible.`
- Confirmed the Play landing has one unified `Play challenges` list and no Featured Activity section.
- Reordered the visible Play challenge cards by recommended Journey readiness:
  - Glossary Dojo
  - Attention Match
  - Probability Picker
  - Context Stack
  - Prompt Run
- Added learner-facing stage mapping to each Play challenge card:
  - recommended point in Journey
  - compact stage chips
  - related learning cards
- Added compact saved-practice stats from shared Play progress and bridged legacy progress:
  - `Played`
  - `Best`
  - `Last`
  - `Mastered` or `Completed` where available
- Kept Probability Picker as a disabled `Coming soon` Play challenge with no fake attempts or progress.
- Added the existing softmax icon to Probability Picker so the card keeps the same two-column layout as the other Play challenge cards.
- Removed learner-visible developer phrasing such as `final slate`, `Foundation pass`, and `Foundation ready` from app source.
- Updated learner-facing Journey references from generic `card` to `learning card` where appropriate.
- Updated Badge copy so Play progress is practice history and the single badge remains one coherent model-literacy journey.
- Bumped the visible app version to `v0.26.7`.

### Recommendations For The Next Pass

- Implement Probability Picker as the next complete challenge using logits, softmax, sampling, and probability-is-not-truth feedback.
- Build the purpose-made Attention Match activity so the route no longer depends on the older Attention Weave interaction.
- Consider a compact Play progress debug panel after the remaining Play activities settle.

### Challenges And Risks

- The attached prompt requested `v0.26.4`, but the app was already at `v0.26.6`; this pass is recorded as `v0.26.7` to keep versioning monotonic.
- Existing saved local progress can make status pills show `In progress` during QA. That is expected because Play progress is device-local.
- The existing Vite large-chunk warning remains.

### UI Cards, Screens, Scenes, And Routes Changed

- Play landing page: title, subtitle, progress panel chips, section heading/helper, challenge order, challenge card metadata, and progress stats.
- Glossary Dojo Play challenge card: now shows `Anytime`, `Glossary`, related learning cards, and Dojo-derived practice stats.
- Attention Match Play challenge card: now appears second, maps to Stage 3 Workday, and keeps the compatibility route.
- Probability Picker Play challenge card: now appears third, maps to Stage 4 Decision Room, remains disabled/coming soon, and uses the softmax icon.
- Context Stack Play challenge card: now appears fourth and maps to Stage 5 Day Repeats plus RAG/Grounding learning cards.
- Prompt Run Play challenge card: now appears last as the capstone and maps to Stages 2-5.
- Retired Token Pipeline Relay and How AI Learns routes: compatibility copy now says the activity was retired from the main Play set.
- Badge page: copy clarifies that Play progress is practice history and the badge is still one coherent model-literacy journey.
- Review lesson-card route: visible title/copy now uses `Learning Cards`.

### Learner-Facing Card Wording Changes

- `Previewing this card. Progress will not change.` -> `Previewing this learning card. Progress will not change.`
- `Reviewing a completed card.` -> `Reviewing a completed learning card.`
- `synthesis card` -> `synthesis learning card`
- `Lesson Cards` -> `Learning Cards`
- `One accessible curriculum-review card per lesson` -> `One accessible curriculum-review learning card per lesson`
- Play landing now uses `Play challenges` and `Play challenge card` metadata rather than final/foundation slate language.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Read/displayed through shared Play summaries: `promptlife.playChallenges.v1`.
- Preserved/read for legacy Context Stack insight compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for legacy Context Stack insight compatibility: `pl.gameInsights`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for Prompt Run bridge compatibility: `pl.traceComplete`.
- Preserved/read for learning-tour bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for learning-tour bridge compatibility: `pl.learningTourComplete`.
- Preserved/read independently by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved: existing Journey, exercise, reflection, choice-order, and Prompt Run keys. No storage migration or progress reset was added.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Play loaded, title read `Play to learn`, no Featured Activity section appeared, one unified list appeared, cards were sorted Glossary Dojo / Attention Match / Probability Picker / Context Stack / Prompt Run, stage mappings and stats were visible, Probability Picker was disabled as coming soon, retired cards were hidden, Glossary Dojo/Attention Match/Context Stack/Prompt Run opened, Badge loaded with `v0.26.7`, and no horizontal overflow was detected.
- Browser QA at 320px: passed. Title, chips, stats, card text, bottom nav, and vertical scrolling remained usable with no horizontal overflow.
- Reduced-motion support remains covered by existing `prefers-reduced-motion` CSS; this pass added no motion-dependent behavior.

### Screenshots And Report

- `docs/play/screenshots/v0-26-7-play-landing-390.png`
- `docs/play/screenshots/v0-26-7-play-landing-320.png`
- `docs/play/screenshots/v0-26-7-play-progress-card-390.png`
- `docs/play/screenshots/v0-26-7-probability-coming-soon-390.png`
- `docs/play/screenshots/v0-26-7-badge-390.png`
- `docs/play/screenshots/v0-26-7-play-landing-polish-screenshots.json`
- `docs/play/prompt-life-v0-26-7-play-landing-polish-report.html`
- `docs/play/prompt-life-v0-26-7-play-landing-polish-report.pdf`

### Files Changed

- `README.md`
- `package.json`
- `package-lock.json`
- `src/features/play/PlayChallengeComponents.tsx`
- `src/features/play/challengeRegistry.ts`
- `src/features/play/types.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/screenshots/v0-26-7-play-landing-390.png`
- `docs/play/screenshots/v0-26-7-play-landing-320.png`
- `docs/play/screenshots/v0-26-7-play-progress-card-390.png`
- `docs/play/screenshots/v0-26-7-probability-coming-soon-390.png`
- `docs/play/screenshots/v0-26-7-badge-390.png`
- `docs/play/screenshots/v0-26-7-play-landing-polish-screenshots.json`
- `docs/play/prompt-life-v0-26-7-play-landing-polish-report.html`
- `docs/play/prompt-life-v0-26-7-play-landing-polish-report.pdf`

## 2026-06-08 - v0.26.6 Context Stack v2

### Summary

- Refactored Context Stack onto the shared Play Challenge Foundation shell and board components.
- Added a short three-round challenge:
  - Round 1: Basic context window.
  - Round 2: Important detail falls out.
  - Round 3: Retrieved evidence enters context.
- Added tap-to-move cards, a four-slot current context window, fell-out state, retrieved-evidence tray, calm feedback, review-suggested completion, and completion panel.
- Tracked attempt start, per-round progress, completion, review suggestion, best progress, last outcome, and misconception tags through `promptlife.playChallenges.v1`.
- Preserved legacy Context Stack insight/progress compatibility and did not make Context Stack required for Journey progress or the single badge.
- Cleaned Play/Badge copy:
  - `Final challenge slate` -> `Practice challenges` / `Play practice challenges`.
  - `Foundation pass` -> `Practice set`.
  - `Foundation ready` -> `Coming soon`.
  - Badge copy now clarifies that Prompt Run and the required Journey path matter for the badge; other Play challenges are practice support.
- Bumped the visible app version to `v0.26.6`.

### Recommendations For The Next Pass

- Build Probability Picker as the next complete Play challenge using logits, softmax, sampling, and probability-is-not-truth feedback.
- Replace the Attention Match compatibility screen with a purpose-built token dependency matching activity.
- Add a debug-only shared Play progress inspector once the remaining Play activities settle.

### Challenges And Risks

- The prompt requested `v0.26.4`, but the app was already at `v0.26.5`; this pass is recorded as `v0.26.6` to avoid a backward version step.
- Context Stack now writes richer shared Play progress, while older insight keys remain preserved for compatibility.
- The production bundle still has the existing Vite large-chunk warning.

### UI Cards, Screens, Scenes, And Routes Changed

- Play page: copy now presents the board as practice challenges, not a final/foundation slate.
- Context Stack route/screen: replaced the earlier mini-game with the new three-round shared Play challenge.
- Context Stack board scene: added incoming cards, current context window, fell-out/no-longer-visible cards, retrieved evidence tray for round 3, feedback, and completion states.
- Probability Picker route/card: user-visible status now says `Coming soon`.
- Attention Match route/card: removed `foundation version` learner-facing wording.
- Badge page: copy no longer implies all five Play challenges are required for the single badge.
- Reset progress: QA confirmed shared Play progress clears through the existing reset path.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Read/written/updated: `promptlife.playChallenges.v1`.
- Preserved/read/written for legacy Context Stack insight compatibility: `promptlife:v1:gameInsights`.
- Preserved/read/written for legacy Context Stack insight compatibility: `pl.gameInsights`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for Prompt Run bridge compatibility: `pl.traceComplete`.
- Preserved/read for learning-tour bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for learning-tour bridge compatibility: `pl.learningTourComplete`.
- Preserved independently by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved: existing Journey, exercise, reflection, choice-order, and Prompt Run keys. No old progress was wiped except through the existing explicit reset/debug-clear flows.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: passed. Play loaded, Context Stack opened, Round 1/2/3 completed, review-suggested and completed outcomes were possible, attempts and completion updated in `promptlife.playChallenges.v1`, Badge loaded, reset cleared shared Play progress, Glossary Dojo still worked, Prompt Run opened, Probability Picker stayed safe, Attention Match opened, deprecated Token Pipeline Relay and How AI Learns stayed hidden, reduced-motion emulation worked, and no horizontal overflow was detected.
- Browser QA at 320px: passed. Context Stack remained readable, touch targets were usable, the board scrolled vertically without horizontal overflow, and the bottom nav remained usable.

### Screenshots And Report

- `docs/play/screenshots/v0-26-6-play-page-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-start-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-active-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-completion-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-320.png`
- `docs/play/screenshots/v0-26-6-badge-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-v2-screenshots.json`
- `docs/play/prompt-life-v0-26-6-context-stack-v2-report.html`
- `docs/play/prompt-life-v0-26-6-context-stack-v2-report.pdf`

### Files Changed

- `README.md`
- `package.json`
- `package-lock.json`
- `src/features/play/PlayChallengeComponents.tsx`
- `src/features/play/challengeRegistry.ts`
- `src/features/play/storage.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/screenshots/v0-26-6-play-page-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-start-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-active-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-completion-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-320.png`
- `docs/play/screenshots/v0-26-6-badge-390.png`
- `docs/play/screenshots/v0-26-6-context-stack-v2-screenshots.json`
- `docs/play/prompt-life-v0-26-6-context-stack-v2-report.html`
- `docs/play/prompt-life-v0-26-6-context-stack-v2-report.pdf`

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
# 2026-06-08 - v0.26.8 Play Games UX + Mechanics Audit

## Summary

- Ran an audit/report pass on the current five visible Play challenges: Glossary Dojo, Attention Match, Probability Picker, Context Stack, and Prompt Run.
- Did not change app source, game mechanics, Journey progress, badge rules, checkpoint randomization, dependencies, or generated assets.
- Confirmed the current normal Play slate is exactly: Glossary Dojo, Attention Match, Probability Picker, Context Stack, Prompt Run.
- Confirmed Token Pipeline Relay and How AI Learns remain hidden from the normal Play slate and preserved only through compatibility metadata.

## Findings

- Glossary Dojo is the strongest current loop: mature shared shell, 12-question rounds, precise feedback, replay/review paths, and independent Dojo mastery.
- Context Stack is now a strong v2 challenge: shared shell, three-round context-window loop, retrieved-evidence round, shared Play storage writes, and clear misconception coverage.
- Probability Picker is the largest functional gap: it is a coherent disabled coming-soon card but not a playable challenge.
- Attention Match still runs on the old Attention Weave component and should be rebuilt as a purpose-built shared-shell token dependency match.
- Prompt Run is still the correct capstone, but it should get a v2 flow pass because 13 steps can feel more like a long guided worksheet than a replayable challenge.

## Recommended Next Passes

1. Probability Picker v1: build the logits, softmax, probability, sampling, and uncertainty loop.
2. Attention Match v1: replace the compatibility Attention Weave screen with a multi-example token relevance challenge.
3. Prompt Run v2: make the capstone feel more continuous, lighter, and aligned with shared Play language.

## UI Inspected

- Play landing at 390px and 320px.
- Glossary Dojo active round state.
- Attention Match compatibility screen.
- Probability Picker coming-soon card.
- Context Stack first screen and lower board/actions state.
- Prompt Run first screen and lower exercise/control state.
- Badge page Play progress language.
- Retired challenge handling in source for Token Pipeline Relay and How AI Learns.

## Copy Issues Found

- `Best:` stat wording remains mildly score-like in shared Play summaries.
- Prompt Run and Attention Match still use `Back to games` while the current landing says Play challenges.
- Attention Match still introduces `source token` and `target token` with minimal screen-level scaffolding.
- Badge stats still say `0 of 5 play challenges`; the criterion copy clarifies Play is practice history, but the stat could be made less requirement-like later.
- No punitive language, leaderboards, streaks, timers, or score emphasis were found in the normal Play surface.

## Storage Keys

- Read/displayed/written by Play foundation: `promptlife.playChallenges.v1`.
- Preserved/read/written by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved/read by Prompt Run: `promptlife:v1:promptRunProgress` and legacy `pl.promptRunProgress`.
- Preserved/read for old game insights: `promptlife:v1:gameInsights` and legacy `pl.gameInsights`.
- Preserved/read for old flags: `promptlife:v1:traceComplete`, `promptlife:v1:learningTourComplete`, and their legacy `pl.*` counterparts.
- Reset source confirms Start over/debug clear remove shared Play progress and Glossary Dojo practice.

## Mobile QA

- Browser QA at 390px: passed for Play landing, Glossary Dojo, Attention Match, Probability Picker card, Context Stack, Prompt Run, and Badge, with no horizontal overflow in captured states.
- Browser QA at 320px: passed for Play landing, with no horizontal overflow. Cards are tall but vertically scrollable.
- Route screenshots for Context Stack and Prompt Run were recaptured after the app settled at `scrollTop: 0`; initial mid-board captures were timing artifacts, not persistent route-scroll failures.
- Reduced-motion support was source-inspected through `prefers-reduced-motion` CSS and shared animation utilities.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed. Total surfaces: 69; randomized surfaces: 46; excluded fixed-order surfaces: 23.

## Reports And Screenshots

- `docs/play/prompt-life-v0-26-8-play-games-audit-report.html`
- `docs/play/prompt-life-v0-26-8-play-games-audit-report.pdf`
- `docs/play/screenshots/v0-26-8-play-games-audit-screenshots.json`
- `docs/play/screenshots/v0-26-8-play-games-audit-play-landing-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-play-landing-320.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-glossary-dojo-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-attention-match-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-probability-picker-card-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-context-stack-top-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-context-stack-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-prompt-run-top-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-prompt-run-390.png`
- `docs/play/screenshots/v0-26-8-play-games-audit-badge-390.png`

# 2026-06-08 - v0.27.0 Probability Picker v1

## Summary

- Promoted Probability Picker from a foundation-ready placeholder to an available four-round Play challenge.
- Kept the visible Play slate intact: Glossary Dojo, Attention Match, Probability Picker, Context Stack, and Prompt Run.
- Kept Journey progress, badge criteria, checkpoint randomization, dependencies, generated assets, and existing games unchanged.
- Bumped the app/package version to `0.27.0`.

## What Changed

- Updated the Probability Picker Play card to `Ready` with the primary action `Open picker`.
- Added a shared Play challenge route for Probability Picker.
- Added four calm rounds: From scores to probabilities, Sampling can vary, Probability is not truth, and Temperature shapes choice.
- Added completion and review-suggested states that save through shared Play progress.
- Added mobile-first Probability Picker styling for candidate bars, evidence choices, temperature controls, feedback, and completion.
- Added report screenshots, screenshot manifest, HTML report, and PDF report.

## Learner-Facing Copy Changes

- Play card purpose: `Explore probability-shaped next-token choices.`
- Challenge subtitle: `Choose from probabilities without treating likely as true.`
- Success outcome: `Completed. You saw why likely is not the same as true.`
- Review outcome: `Completed. Review suggested. Likely and true were mixed at least once.`
- Completion panel language avoids score, streak, timer, leaderboard, failure, or shaming language.

## UI Cards, Screens, Scenes, And Routes Changed

- Play landing Probability Picker card.
- Probability Picker route.
- Probability Picker round board.
- Probability Picker feedback panel.
- Probability Picker completion panel.
- Badge page Play progress display, through existing shared Play progress summaries.

## LocalStorage Keys

- Created/read/written: `promptlife.playChallenges.v1`.
- Preserved/read independently by Glossary Dojo: `promptlife.glossaryDojo.v1`.
- Preserved/read for bridge compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for bridge compatibility: `pl.gameInsights`.
- Preserved/read for bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read for bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for bridge compatibility: `pl.learningTourComplete`.
- Reset QA confirmed the existing Start over flow clears shared Play progress and Glossary Dojo storage.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed. Total surfaces: 69; randomized surfaces: 46; excluded fixed-order surfaces: 23.
- Playwright QA at 390px: passed. Completed a happy path with status `completed`, then a review path with status `review-suggested`; no horizontal overflow.
- Playwright QA at 320px: passed. Active Probability Picker start state measured `scrollWidth 320` and `clientWidth 320`.
- Smoke routes opened at 390px: Glossary Dojo, Context Stack, Attention Match, Prompt Run, and Probability Picker.
- Badge QA: passed. Badge page displayed `1 of 5 play challenges` after Probability Picker completion.
- Reset QA: passed. Start over cleared `promptlife.playChallenges.v1` and `promptlife.glossaryDojo.v1`.

## Known Issues And Risks

- Probability Picker v1 uses fixed teaching examples, not a real sampling engine.
- The temperature round demonstrates distribution shape with fixed bars; a future pass can add a richer logits-to-softmax transition.
- Attention Match and Prompt Run remain good candidates for the next shared Play-shell refinement pass.

## Recommended Next Passes

1. Probability Picker v2: add a clearer logits-to-softmax transformation and replayable temperature comparisons.
2. Attention Match v1: rebuild the older Attention Weave compatibility screen as a purpose-built shared-shell challenge.
3. Prompt Run v2: streamline the capstone so the full loop feels more continuous and replayable.

## Reports And Screenshots

- `docs/play/prompt-life-v0-27-0-probability-picker-v1-report.html`
- `docs/play/prompt-life-v0-27-0-probability-picker-v1-report.pdf`
- `docs/play/screenshots/v0-27-0-probability-picker-v1-screenshots.json`
- `docs/play/screenshots/v0-27-0-play-probability-card-start-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-start-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-bars-round-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-evidence-feedback-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-temperature-round-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-review-completion-390.png`
- `docs/play/screenshots/v0-27-0-probability-picker-start-320.png`
- `docs/play/screenshots/v0-27-0-badge-probability-picker-390.png`

## Files Changed

- `package.json`
- `package-lock.json`
- `src/features/play/challengeRegistry.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/prompt-life-v0-27-0-probability-picker-v1-report.html`
- `docs/play/prompt-life-v0-27-0-probability-picker-v1-report.pdf`
- `docs/play/screenshots/v0-27-0-probability-picker-v1-screenshots.json`
- `docs/play/screenshots/v0-27-0-*.png`

# 2026-06-08 - v0.27.1 Attention Match v1

## Summary

- Replaced the old Attention Weave compatibility interaction with a purpose-built five-round Attention Match challenge.
- Kept the visible Play slate intact: Glossary Dojo, Attention Match, Probability Picker, Context Stack, and Prompt Run.
- Kept Journey progress, badge criteria, checkpoint randomization, dependencies, generated assets, and existing games unchanged.
- Bumped the app/package version to `0.27.1`.

## What Changed

- Updated the Attention Match route to render a shared Play challenge shell.
- Added five tiny token-relevance rounds with highlighted target tokens and source candidates.
- Added simple SVG relevance arcs after source selection.
- Added simplified weight rows for strong match, possible but weaker, and nearby but not enough.
- Added completion and review-suggested states that save through shared Play progress.
- Updated legacy bridge behavior so old Attention Weave insight only fills empty shared progress and no longer overwrites newer Attention Match review status.
- Added report screenshots, screenshot manifest, HTML report, and PDF report.

## Learner-Facing Copy Changes

- Challenge subtitle: `Connect a target token to the earlier context it depends on.`
- Main prompt: `Choose the earlier token or phrase that best explains the highlighted target.`
- Success copy includes: `Good connection.`
- Review copy includes: `This choice reveals a common mix-up.` and `A closer word is not always the best match.`
- Completion outcome: `Completed. You matched target tokens to context clues.`
- Review outcome: `Completed. Review suggested. Closeness and relevance were mixed at least twice.`
- Completion panel language avoids score, streak, timer, leaderboard, failure, or shaming language.

## UI Cards, Screens, Scenes, And Routes Changed

- Play landing Attention Match card metadata and icon.
- Attention Match route.
- Attention Match round board.
- Attention Match source-candidate choices.
- Attention Match SVG arc and weight feedback.
- Attention Match completion panel.
- Badge page Play progress display, through existing shared Play progress summaries.
- Legacy Attention Weave compatibility path now opens the current Attention Match challenge.

## LocalStorage Keys

- Created/read/written: `promptlife.playChallenges.v1`.
- Preserved/read independently by Glossary Dojo: `promptlife.glossaryDojo.v1`.
- Preserved/read for bridge compatibility: `promptlife:v1:gameInsights`.
- Preserved/read for bridge compatibility: `pl.gameInsights`.
- Preserved/read for bridge compatibility: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read for bridge compatibility: `promptlife:v1:promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `promptlife:v1:learningTourComplete`.
- Preserved/read for bridge compatibility: `pl.learningTourComplete`.
- Reset QA confirmed the existing Start over flow clears shared Play progress and Glossary Dojo storage.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed. Total surfaces: 69; randomized surfaces: 46; excluded fixed-order surfaces: 23.
- In-app Browser spot check: passed. Attention Match opened into the new shared-shell route and showed source candidates, arc feedback, and weight rows.
- Playwright QA at 390px: passed. Completed a happy path with status `completed`, then a review path with status `review-suggested`; no horizontal overflow.
- Playwright QA at 320px: passed. Active Attention Match start state measured `scrollWidth 320` and `clientWidth 320`.
- Smoke routes opened at 390px: Glossary Dojo, Context Stack, Probability Picker, Prompt Run, and Attention Match.
- Badge QA: passed. Badge page displayed `1 of 5 play challenges` after Attention Match progress.
- Reset QA: passed. Start over cleared `promptlife.playChallenges.v1` and `promptlife.glossaryDojo.v1`.

## Known Issues And Risks

- Attention Match v1 uses fixed examples and simplified arcs/weights; it is a learning picture, not a literal attention-head visualization.
- The old Attention Weave component remains in source for compatibility context but is no longer the normal Play route.
- Prompt Run and Probability Picker remain good candidates for the next shared-shell refinement passes.

## Recommended Next Passes

1. Attention Match v2: add another small example set after phone testing.
2. Prompt Run v2: streamline the capstone into a more continuous shared-shell experience.
3. Probability Picker v2: add a clearer logits-to-softmax transformation view.

## Reports And Screenshots

- `docs/play/prompt-life-v0-27-1-attention-match-v1-report.html`
- `docs/play/prompt-life-v0-27-1-attention-match-v1-report.pdf`
- `docs/play/screenshots/v0-27-1-attention-match-v1-screenshots.json`
- `docs/play/screenshots/v0-27-1-attention-match-start-390.png`
- `docs/play/screenshots/v0-27-1-attention-match-source-selection-390.png`
- `docs/play/screenshots/v0-27-1-attention-match-arc-feedback-390.png`
- `docs/play/screenshots/v0-27-1-attention-match-completion-390.png`
- `docs/play/screenshots/v0-27-1-attention-match-review-suggested-390.png`
- `docs/play/screenshots/v0-27-1-attention-match-start-320.png`
- `docs/play/screenshots/v0-27-1-play-landing-attention-progress-390.png`
- `docs/play/screenshots/v0-27-1-badge-attention-match-390.png`

## Files Changed

- `package.json`
- `package-lock.json`
- `src/features/play/challengeRegistry.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/prompt-life-v0-27-1-attention-match-v1-report.html`
- `docs/play/prompt-life-v0-27-1-attention-match-v1-report.pdf`
- `docs/play/screenshots/v0-27-1-attention-match-v1-screenshots.json`
- `docs/play/screenshots/v0-27-1-*.png`

# 2026-06-08 - v0.27.2 Prompt Run v2 Capstone Redesign

## Summary

- Rebuilt Prompt Run as a compact six-station capstone challenge using the shared Play foundation.
- Kept the visible Play slate intact: Glossary Dojo, Attention Match, Probability Picker, Context Stack, and Prompt Run.
- Kept Journey progress, badge criteria, checkpoint randomization, dependencies, generated assets, and other games unchanged.
- Bumped the app/package version to `0.27.2`.

## What Changed

- Replaced the legacy 12-step Prompt Run route with six active stations:
  Prompt, Tokens, IDs, Hidden, Probs, and Repeat.
- Added shared-shell status, progress rail, feedback, action row, completion panel, and scroll hint.
- Added station-specific interactions for prompt/response separation, simplified token order, token ID lookup, hidden-state carry, next-token probabilities, and append/repeat.
- Added completion and review-suggested outcomes that save through shared Play progress.
- Updated the Play card to show `5-7 min`, `Capstone`, `Trace the loop`, related stages 2-5, and expanded related learning cards.
- Updated the Prompt Run legacy bridge so old completion can fill empty shared progress while newer shared progress stays authoritative.
- Updated the Badge display so a completed Prompt Run shows `13 of 13 Prompt Run` even when v2 writes six station steps plus the legacy final-complete flag.
- Added a game-launch scroll fix so opening a lower Play card snaps the challenge route to the top.

## Learner-Facing Copy Changes

- Challenge subtitle: `Trace one prompt through the full inference loop.`
- Station labels: `Prompt`, `Tokens`, `IDs`, `Hidden`, `Probs`, `Repeat`.
- Feedback includes: `Good trace.`, `This is the current context.`, `The text has become token pieces.`, `Token IDs are lookup numbers, not meanings by themselves.`, `Hidden states carry context-shaped information forward.`, `Probabilities shape the next choice.`, and `One token is appended, then the day repeats.`
- Completion outcome: `Completed. You traced the full inference loop.`
- Review outcome: `Completed. Review suggested. Revisit the loop pieces that felt slippery.`

## UI Cards, Screens, Scenes, And Routes Changed

- Play landing Prompt Run card.
- Prompt Run route at `trace-one-prompt` / `prompt-run`.
- Prompt Run station board.
- Prompt Run completion and review-suggested panels.
- Badge Prompt Run progress stat display.
- Shared Play route-launch scroll behavior.

## LocalStorage Keys

- Created/read/written: `promptlife.playChallenges.v1`.
- Read/written/preserved: `promptlife:v1:promptRunProgress`.
- Read/written/preserved: `promptlife:v1:traceComplete`.
- Preserved/read for bridge compatibility: `pl.promptRunProgress`.
- Preserved/read for bridge compatibility: `pl.traceComplete`.
- Preserved/read independently by Glossary Dojo: `promptlife.glossaryDojo.v1`.
- Reset QA confirmed shared Play progress is removed, Prompt Run legacy progress is rewritten to an empty progress object, and trace completion resets to `false`.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- 390px QA: happy path completed with shared status `completed`, attempts `1`, completions `1`, and best progress `100`.
- 390px QA: review path completed with shared status `review-suggested`.
- 390px QA: Play landing showed Prompt Run as completed with `Best result: Full loop traced`.
- 390px QA: Badge loaded and displayed `13 of 13 Prompt Run`.
- 390px smoke routes opened: Glossary Dojo, Context Stack, Probability Picker, and Attention Match.
- 320px QA: Prompt Run opened with `scrollWidth 320` and `clientWidth 320`.
- Reduced-motion emulation returned `true`.

## Known Issues And Risks

- Prompt Run v2 uses simplified token boundaries, token IDs, probabilities, and hidden-state language for learning clarity; it is not a real model debugger.
- The previous legacy 12-step exercise data remains in source for compatibility and historical progress shape.
- The existing Vite large-chunk warning remains.

## Recommended Next Passes

1. Prompt Run v2.1: add one optional glossary drawer shortcut per station without adding length.
2. Probability Picker v2: show a clearer logits-to-softmax transition.
3. Play analytics QA: add a small automated regression script for shared Play progress keys.

## Reports And Screenshots

- `docs/play/prompt-life-v0-27-2-prompt-run-v2-report.html`
- `docs/play/prompt-life-v0-27-2-prompt-run-v2-report.pdf`
- `docs/play/screenshots/v0-27-2-prompt-run-v2-screenshots.json`
- `docs/play/screenshots/v0-27-2-prompt-run-start-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-tokenization-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-layer-station-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-probability-station-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-append-repeat-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-completion-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-review-suggested-390.png`
- `docs/play/screenshots/v0-27-2-prompt-run-start-320.png`
- `docs/play/screenshots/v0-27-2-play-landing-prompt-run-completed-390.png`
- `docs/play/screenshots/v0-27-2-badge-prompt-run-390.png`

## Files Changed

- `package.json`
- `package-lock.json`
- `src/features/play/challengeRegistry.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/prompt-life-v0-27-2-prompt-run-v2-report.html`
- `docs/play/prompt-life-v0-27-2-prompt-run-v2-report.pdf`
- `docs/play/screenshots/v0-27-2-prompt-run-v2-screenshots.json`
- `docs/play/screenshots/v0-27-2-*.png`

## 2026-06-08 - v0.27.3 Play Set Stabilization + Full-Slate QA

### Summary

- Bumped the app/package version to `0.27.3`.
- Kept the visible Play set to exactly five challenges: Glossary Dojo, Attention Match, Probability Picker, Context Stack, and Prompt Run.
- Added a debug-only Play progress inspector that appears only when `?debug=1` is present.
- Cleaned progress-stat language so fresh challenges show `Progress: Not started`; meaningful completed/in-progress stats remain where available.
- Replaced remaining learner-facing Play copy that named competitive or failure framing with calmer practice/review language.
- Updated README, storage/reset docs, and Play mode docs so old Play items are not described as current.
- Verified the previous v0.27.2 report exists and its PDF contains embedded image objects.

### Recommendations For The Next Pass

1. Add a small automated Play registry test that asserts the five visible challenge ids and order.
2. Consider a focused accessibility pass on Play challenge table/rail labels now that the set is stable.
3. Plan a bundle/code-splitting pass before v1 so the existing Vite large-chunk warning does not become background noise.

### Challenges And Risks

- Reset QA clears shared Play and Glossary Dojo keys, then the app immediately rewrites normal empty app state keys as it reloads. That is expected and was documented.
- The debug inspector is compact by design; it is useful for diagnosis but not intended as a learner surface.
- The existing Vite large-chunk warning remains.

### UI Cards, Screens, Scenes, And Routes Changed

- Play landing: progress panel copy and saved-practice stat wording.
- Play landing: debug-only progress inspector under the challenge list when `?debug=1`.
- Glossary Dojo start panel: calmer intro and saved-progress copy.
- Badge screen: version now displays `v0.27.3`; badge logic unchanged.
- README: current Play set, cache-busting version, reset language.
- Storage/reset docs: shared Play and Glossary Dojo keys plus debug inspector behavior.
- Play mode docs: current five-challenge Play set and retired compatibility handling.
- Report artifacts: v0.27.3 HTML/PDF report with screenshots.

### LocalStorage Keys Created, Read, Migrated, Or Preserved

- Created/written/read by shared Play progress: `promptlife.playChallenges.v1`.
- Read/bridged independently by Dojo: `promptlife.glossaryDojo.v1`.
- Preserved/read for Journey and app state: `promptlife:v1:lastLocation`, `promptlife:v1:lessonId`, `promptlife:v1:progress`, `promptlife:v1:reflections`, `promptlife:v1:exerciseProgress`, `promptlife.choiceOrderSeed.v1`.
- Preserved/read for legacy Play insight compatibility: `promptlife:v1:gameInsights`, `pl.gameInsights`.
- Preserved/read for Prompt Run bridge compatibility: `promptlife:v1:promptRunProgress`, `pl.promptRunProgress`, `promptlife:v1:traceComplete`, `pl.traceComplete`.
- Preserved/read for learning-tour compatibility: `promptlife:v1:learningTourComplete`, `pl.learningTourComplete`.
- Reset QA confirmed `promptlife.playChallenges.v1` and `promptlife.glossaryDojo.v1` are removed.
- No Journey progress rules, badge rules, or checkpoint randomization storage behavior changed.

### Verification Commands Run

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- In-app browser check: passed. Play showed exactly Glossary Dojo, Attention Match, Probability Picker, Context Stack, Prompt Run; debug inspector appeared under `?debug=1`; no horizontal overflow.
- Scripted browser QA: passed. Captured 11 screenshot states, opened all five Play challenges, checked Badge seeded Play completion, checked reset/fresh Play, and verified no horizontal overflow at 320px/390px.

### Screenshots And Report

- `docs/play/prompt-life-v0-27-3-play-set-stabilization-report.html`
- `docs/play/prompt-life-v0-27-3-play-set-stabilization-report.pdf`
- `docs/play/screenshots/v0-27-3-play-stabilization-screenshots.json`
- `docs/play/screenshots/v0-27-3-play-landing-fresh-390.png`
- `docs/play/screenshots/v0-27-3-play-landing-progress-390.png`
- `docs/play/screenshots/v0-27-3-play-landing-fresh-320.png`
- `docs/play/screenshots/v0-27-3-play-debug-inspector-390.png`
- `docs/play/screenshots/v0-27-3-badge-play-completions-390.png`
- `docs/play/screenshots/v0-27-3-play-after-reset-fresh-390.png`
- `docs/play/screenshots/v0-27-3-active-glossary-dojo-390.png`
- `docs/play/screenshots/v0-27-3-active-attention-match-390.png`
- `docs/play/screenshots/v0-27-3-active-probability-picker-390.png`
- `docs/play/screenshots/v0-27-3-active-context-stack-390.png`
- `docs/play/screenshots/v0-27-3-active-prompt-run-390.png`

### Files Changed

- `README.md`
- `docs/PLAY_MODE_V0_5.md`
- `docs/REVIEW_NOTES.md`
- `docs/STORAGE_AND_RESET.md`
- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/prompt-life-v0-27-3-play-set-stabilization-report.html`
- `docs/play/prompt-life-v0-27-3-play-set-stabilization-report.pdf`
- `docs/play/screenshots/v0-27-3-play-stabilization-screenshots.json`
- `docs/play/screenshots/v0-27-3-play-landing-fresh-390.png`
- `docs/play/screenshots/v0-27-3-play-landing-progress-390.png`
- `docs/play/screenshots/v0-27-3-play-landing-fresh-320.png`
- `docs/play/screenshots/v0-27-3-play-debug-inspector-390.png`
- `docs/play/screenshots/v0-27-3-badge-play-completions-390.png`
- `docs/play/screenshots/v0-27-3-play-after-reset-fresh-390.png`
- `docs/play/screenshots/v0-27-3-active-glossary-dojo-390.png`
- `docs/play/screenshots/v0-27-3-active-attention-match-390.png`
- `docs/play/screenshots/v0-27-3-active-probability-picker-390.png`
- `docs/play/screenshots/v0-27-3-active-context-stack-390.png`
- `docs/play/screenshots/v0-27-3-active-prompt-run-390.png`
- `package.json`
- `package-lock.json`
- `src/features/glossary-dojo/GlossaryDojoGame.tsx`
- `src/features/play/challengeRegistry.ts`
- `src/features/play/storage.ts`
- `src/main.tsx`
- `src/styles/global.css`
