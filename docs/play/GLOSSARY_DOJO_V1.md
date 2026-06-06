# Glossary Dojo V1

Date: 2026-06-06

## Feature Summary

Glossary Dojo is a mobile-first Play activity that gives learners a 12-question practice round using real Prompt Life glossary terms. It is non-competitive: no timers, scores, streaks, leaderboards, or failure states.

The activity asks learners to connect:

- terms to definitions
- definitions to terms
- commonly confused terms
- related terms
- terms that live near each other in the learning path

## Source Of Truth

The glossary source of truth is `src/data/content.ts`, which exports `glossary`. The Dojo normalizes that existing data into `id`, `label`, `shortDefinition`, `longDefinition`, and `relatedTermIds`.

The implementation does not duplicate glossary definitions unless a term needs optional practice metadata.

## Metadata Overlay

Optional metadata lives in `src/data/glossaryDojoMeta.ts`.

The overlay can provide:

- `familyTags`
- `lifecycleStage`
- `curriculumStage`
- `confusableWith`
- `relationships`
- `shortExplanation`

The overlay starts with high-confusion terms such as training, inference, prompt, response, context window, RAG, embedding, hidden state, attention, logits, softmax, sampling, diffusion, and multimodal AI.

## Mastery Rule

A term is marked mastered when either condition is true:

- it is answered correctly in 2 distinct rounds
- it was previously missed and then answered correctly in a later round

A later miss can still mark the term as needing review, even if it has historical mastery evidence.

## Storage

Storage key:

`promptlife.glossaryDojo.v1`

Stored fields:

- `roundsCompleted`
- `questionsAnswered`
- `recentMistakes`
- `terms`
- `currentRound`
- `lastCompletedRound`
- `storageAvailable`

Per-term progress:

- `practiced`
- `correct`
- `incorrect`
- `correctRoundNumbers`
- `mastered`
- `needsReview`
- `lastMissedRoundNumber`

If localStorage is unavailable or throws, the Dojo uses in-memory state and shows a storage notice instead of crashing.

The key is also included in the app-wide Prompt Life Start over/debug clear path so a full app reset clears Dojo practice too.

## Question Types

Implemented question types:

- `term_to_definition`
- `definition_to_term`
- `confusable_pair`
- `relationship`
- `stage_location`

Every option maps to a real glossary term. When an option displays a definition, that definition comes from the corresponding real glossary term.

Answer order is randomized with the existing seeded choice-order helper, then stored in the built round so it does not reshuffle on re-render.

## Route Integration

Play integration:

- Adds a `Glossary Dojo` card under `Glossary practice`.
- Uses the existing Play subview pattern through `gameId === 'glossary-dojo'`.
- Does not add the Dojo to the `games` array, so badge insight denominator stays unchanged.

Glossary integration:

- Adds a `Practice 12 terms` secondary entry point above search and sorting.

## Accessibility

The Dojo uses native buttons for choices and actions, visible focus states from the app shell, logical DOM order, and a polite `role="status"` feedback region. Correct and incorrect states use both color and text labels such as `Correct match` and `Your choice`.

The feedback region is not auto-focused, so keyboard users can continue from the current control flow.

## Mobile QA Notes

Targets:

- 320px
- 390px
- 430px

Checks:

- no horizontal overflow
- answer buttons stay readable and tappable
- feedback remains visible after an answer
- Next/Finish controls are not hidden by the bottom dock
- Play and Glossary entry points are visible and usable

Results:

- 390px: Play entry, question view, incorrect feedback, correct feedback, resume, summary, Glossary entry, and reset/start screen captured.
- 320px: active question captured; feedback and Next action were scrolled into view and confirmed above the dock.
- 430px: active question and summary passed overflow checks.
- Hard reload during a round returns to the Play home with `Round in progress` and `Resume round`; tapping the Dojo card resumes the saved question.
- Dojo reset returns to `0 rounds`, `0 terms practiced`, and `0 mastered`.
- Badge stats remained unchanged by Dojo practice because Dojo is not added to the badge `games` array.
- Blocked-storage fallback is implemented; browser simulation was not practical in this environment because the in-app browser read-only scope does not expose storage mutation and the repo does not include standalone Playwright.

## Known Issues

- The first V1 metadata overlay is intentionally partial. Terms without metadata can still appear in direct definition practice, but richer relationship/confusable/stage questions depend on the overlay and glossary related-term data.
- The production bundle still shows the existing Vite large-chunk warning. This pass did not add dependencies or heavy assets.
- The in-app browser automation focused the Start button but did not fire native button activation with its keypress command. The implementation uses native buttons and visible focus states; a human keyboard spot check is still recommended before v1.
- Blocked-storage fallback should get a dedicated browser test if a test runner is added later.
