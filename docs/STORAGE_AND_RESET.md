# Storage and Reset

Date: 2026-06-08

## What Is Stored

Prompt Life stores only local learning progress:

- Last app location
- Current lesson ID
- Completed lesson checkpoints
- Completed exercise IDs, attempt counts, last selected answers, and insight unlocks
- Shared Play challenge attempts, completions, review states, and last outcomes
- Glossary Dojo rounds, term practice, current round, missed terms, and mastery markers
- Completed Prompt Run steps, revealed steps, final challenge state, attempts, and insight unlocks
- Lesson reflections
- Legacy mini-game insight unlocks
- Prompt Run save/completion compatibility flag
- How AI Learns compatibility completion flag

## Where It Is Stored

Progress is stored in the browser's `localStorage` on the learner's device.

Prompt Life does not require cookies, a backend, or user accounts for progress.

## Current localStorage Keys

- `promptlife:v1:lastLocation`
- `promptlife:v1:lessonId`
- `promptlife:v1:progress`
- `promptlife:v1:reflections`
- `promptlife:v1:gameInsights`
- `promptlife:v1:exerciseProgress`
- `promptlife:v1:promptRunProgress`
- `promptlife:v1:traceComplete`
- `promptlife:v1:learningTourComplete`
- `promptlife.playChallenges.v1`
- `promptlife.glossaryDojo.v1`
- `promptlife.choiceOrderSeed.v1`

## Legacy Keys

Earlier local builds used these keys:

- `pl.tab`
- `pl.lessonId`
- `pl.completed`
- `pl.reflections`
- `pl.gameInsights`
- `pl.exerciseProgress`
- `pl.promptRunProgress`
- `pl.traceComplete`
- `pl.learningTourComplete`

The app reads legacy keys as a migration fallback, then writes the new namespaced keys. Reset controls remove both the current and legacy keys.

## User Reset

The Badge screen includes a visible `Reset progress` button.

Before clearing progress, the app asks:

`Start over? This will clear your Prompt Life progress on this device.`

After reset, the app returns to Home and shows:

`Progress reset. You can begin again.`

Reset clears Prompt Life progress only, including exercise progress, shared Play challenge progress, Glossary Dojo progress, Prompt Run progress, reflections, legacy mini-game insights, tour state, last location, and checkpoint answer-order seed. It does not clear unrelated `localStorage` values from the same browser.

## Shared Play Challenge Progress

`promptlife.playChallenges.v1` stores local practice state for the current Play set:

- Glossary Dojo
- Attention Match
- Probability Picker
- Context Stack
- Prompt Run

For each challenge it can store attempts, completions, best progress percent, status, last played time, completion time, last outcome, misconception tags, Journey relationships, and glossary term ids.

Retired Play activities such as Token Pipeline Relay, earlier Attention Weave, and How AI Learns are preserved through compatibility metadata and legacy keys. They are not part of the current visible Play challenge list.

## Glossary Dojo Progress

`promptlife.glossaryDojo.v1` stores local practice for Glossary Dojo:

- rounds attempted and completed
- current round
- recent mistakes
- per-term practice and mastery markers
- round history
- normal-round fingerprints to reduce repeats

Glossary Dojo progress is bridged into the shared Play challenge summary without making Play completion required for Journey progress.

## Prompt Run Progress

`promptlife:v1:promptRunProgress` stores only local learning state:

- `completedSteps`
- `finalChallengeComplete`
- `insights`
- `revealedSteps`
- `attempts`
- `lastAnswers`

Revealed steps can count as completed so a learner can continue after using Show me. Correct steps are also tracked as insights.

## Developer Debug Reset

Add `?debug=1` to the app URL to reveal Badge-screen progress tools:

- Mark first lesson complete
- Mark all lessons incomplete
- Unlock badge for visual testing
- Clear all Prompt Life localStorage keys

The debug clear action removes the Prompt Life namespaced keys and legacy `pl.*` keys, including exercise progress, Play challenge progress, Glossary Dojo progress, and Prompt Run progress. It does not touch unrelated browser storage.

Debug mode also reveals a Play progress inspector on the Play screen. It summarizes `promptlife.playChallenges.v1`, visible challenge statuses, Glossary Dojo bridge signals, Prompt Run bridge signals, and key presence/size. The inspector reads storage only; it does not change progress.

## Known Limitations

- Progress is per browser and per device.
- Clearing browser site data outside the app will remove progress.
- Debug tools are intentionally simple and are exposed by URL query, not authentication.
- Resetting in memory and clearing raw localStorage are separate developer concerns; the user-facing reset both clears storage and returns the app to a clean start state.
