# Exercise System

Date: 2026-05-31

## Purpose

Prompt Life exercises make invisible LLM mechanics assessable without turning the app into a competitive game. Each exercise should teach one model-literacy distinction through a clear learner action, specific feedback, and one concise insight.

Every exercise must show:

- Goal: what concept is being practiced.
- Do this: the learner action.
- Try area: the interactive work surface.
- Feedback: correct, incorrect, retry, or reveal.
- Why this matters: the LLM mechanic the action represents.

## Schema

The exercise library lives in `src/data/exercises.ts`.

Each exercise supports:

- `id`
- `title`
- `concept`
- `prompt`
- `goal`
- `actionVerb`
- `actionInstruction`
- `inputType`
- `items`
- `buckets`
- `context`
- `sequence`
- `windowSize`
- `targetId`
- `correctAnswer`
- `correctActions`
- `incorrectActions`
- `feedbackCorrect`
- `feedbackIncorrect`
- `insight`
- `glossaryTerms`
- `brainMetaphor`
- `brainLimit`
- `completionKey`

Lesson mapping also lives in `src/data/exercises.ts` as `lessonExerciseIds`.

## Supported Input Types

- `tap-choice`
- `tap-multiple`
- `drag-order`
- `drag-match`
- `sort-buckets`
- `connect-nodes`
- `toggle-state`
- `type-reflection`
- `label-tokens`
- `next-token-pick`

The first implementation uses accessible tap and button patterns for drag-like interactions. That keeps the mobile MVP usable at 390px and keyboard-reachable while leaving room for richer drag behavior later.

## Components

The reusable components live in `src/components/ExerciseSystem.tsx`.

- `ExerciseShell`
- `ExerciseHeader`
- `ActionCue`
- `TapChoiceExercise`
- `TapMultipleExercise`
- `DragOrderExercise`
- `DragMatchExercise`
- `SortBucketsExercise`
- `ConnectNodesExercise`
- `ToggleStateExercise`
- `TypeReflectionExercise`
- `LabelTokensExercise`
- `NextTokenPickExercise`
- `ExerciseFeedback`
- `InsightUnlocked`
- `ExerciseControls`

## Feedback Rules

- Correct feedback begins with `Insight unlocked.`
- Incorrect feedback begins with `Not quite.`
- Wrong feedback names the misconception or the missed distinction.
- `Try again` clears feedback without clearing the learner's work.
- `Show me` reveals the correct pattern but does not mark the exercise complete.
- No scores, timers, or leaderboards.

## Accessibility Rules

- Use real buttons, labels, and semantic regions.
- Keep touch targets near 44px or larger where practical.
- Do not rely on color alone; use labels, text states, and patterns.
- Maintain visible focus states.
- Keep text in HTML.
- Respect `prefers-reduced-motion`.

## Initial Exercises

- Prompt or Response?
- Pick the Next Token
- Durable or Temporary?
- Attention Is Relevance
- Context Window: What Fell Out?
- Training Nudge
- Softmax Funnel
- MLP Feature Reshape
- Open Book or Learned?
- Brain Metaphor Boundary

## How To Add A New Exercise

1. Add a new object to `exercises` in `src/data/exercises.ts`.
2. Choose one `inputType`.
3. Write the goal, action instruction, correct feedback, incorrect feedback, and insight before building the UI.
4. Add item-level `feedback` for common misconceptions when useful.
5. Map a lesson to the exercise in `lessonExerciseIds`, or render it directly where needed.
6. Run `npm run typecheck` and `npm run build`.
7. Review at 390px width.

## Progress Storage

Exercise progress is stored in browser `localStorage` under:

- `promptlife:v1:exerciseProgress`

The value tracks:

- completed exercise IDs,
- attempt counts,
- last selected answer,
- insight unlocked state.

No personal data, cookies, backend, or account is required. Reset controls remove this key along with the other Prompt Life progress keys.
