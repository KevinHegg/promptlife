# Storage and Reset

Date: 2026-05-31

## What Is Stored

Prompt Life stores only local learning progress:

- Last app location
- Current lesson ID
- Completed lesson checkpoints
- Completed exercise IDs, attempt counts, last selected answers, and insight unlocks
- Completed Prompt Run steps, revealed steps, final challenge state, attempts, and insight unlocks
- Lesson reflections
- Mini-game insight unlocks
- Prompt Run save/completion compatibility flag
- How AI Learns completion

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

Reset clears Prompt Life progress only, including exercise progress and Prompt Run progress. It does not clear unrelated `localStorage` values from the same browser.

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

The debug clear action removes the Prompt Life namespaced keys and legacy `pl.*` keys, including exercise progress and Prompt Run progress. It does not touch unrelated browser storage.

## Known Limitations

- Progress is per browser and per device.
- Clearing browser site data outside the app will remove progress.
- Debug tools are intentionally simple and are exposed by URL query, not authentication.
- Resetting in memory and clearing raw localStorage are separate developer concerns; the user-facing reset both clears storage and returns the app to a clean start state.
