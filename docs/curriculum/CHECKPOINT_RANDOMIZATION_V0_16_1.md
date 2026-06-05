# Checkpoint Randomization v0.16.1

Date: 2026-06-05

## Why This Changed

Most Journey checkpoints were authored with the correct answer first. That made the assessment predictable: a learner could start choosing answer A instead of thinking through the distinction.

v0.16.1 randomizes answer order for single-choice checkpoint surfaces while preserving stable learning behavior, feedback quality, and progress rules.

## What Gets Randomized

- Journey lesson checkpoints.
- `tap-choice` exercises.
- `next-token-pick` exercises.
- Prompt Run single-choice steps that use `tap-choice` or `next-token-pick`.

The correct answer can now appear in any displayed A/B/C/D position. Correctness follows the answer identity, not display position.

## What Stays Fixed

These remain in authored order:

- `drag-order`
- `sort-buckets`
- `drag-match`
- `label-tokens`
- `connect-nodes`
- `toggle-state`
- `tap-multiple`

Reason: these surfaces use sequence, grouping, matching, token position, or a non-choice interaction as part of the learning objective.

## Stable Shuffle Strategy

The app stores one local per-device seed:

```text
promptlife:v1:choiceOrderSeed
```

The shuffle combines that seed with the question identity:

- `lesson:{lessonId}:checkpoint`
- `exercise:{exerciseId}`

Then it applies a deterministic Fisher-Yates shuffle. This means:

- Re-rendering does not reshuffle.
- Selecting an answer does not reshuffle.
- Showing feedback does not reshuffle.
- Preview, Review, and Learn mode changes keep the same order for the same user/device seed.
- If localStorage is unavailable, the app falls back to a deterministic seed so it still works.

Resetting Prompt Life progress now clears the choice-order seed along with progress, attempts, Prompt Run progress, reflections, game insights, tour progress, and last location.

## Choice Modeling

Journey checkpoints now normalize display choices into:

```ts
{
  id: string,
  label: string,
  isCorrect: boolean,
  feedback?: string
}
```

The selected answer is stored by choice ID, not by visible A/B/C/D position.

Exercise choices continue to use item IDs. Single-choice exercise item order is shuffled before rendering, while correctness still uses `correctAnswer` or item-level `correct`.

## Feedback And Accessibility

- Buttons remain real buttons.
- A/B/C/D labels are assigned after shuffle.
- Button accessible labels include the displayed answer text.
- Correctness is not announced before a learner checks an answer.
- After checking, the selected wrong answer and correct answer are both visually clear.
- Feedback remains in existing status/aria-live patterns.
- Wrong feedback still starts with `Not quite` when applicable.
- Correct feedback still uses `Insight unlocked`.
- Keyboard/focus behavior remains button-based and unchanged.

## QA Results

Automated verification:

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

Audit result:

- Total audited surfaces: 61.
- Randomized surfaces: 45.
- Fixed-order exclusions: 16.
- First correct answer positions after audit-seed shuffle:
  - Position 1: 9
  - Position 2: 19
  - Position 3: 9
  - Position 4: 8

Manual browser QA at 390px:

- Learn mode:
  - Rationalists vs Empiricists: wrong answer produced `Not quite` feedback, correct answer unlocked Next lesson.
  - Training: correct answer appeared in B; wrong answer revealed the correct answer and allowed retry; correct answer unlocked Next lesson.
- Preview mode:
  - Prompt vs Response: correct answer appeared in C; answering produced feedback but sticky action stayed `Return to Journey`; Journey row remained Preview afterward.
- Review mode:
  - What Is an LLM?: correct answer appeared in D; wrong answer produced `Not quite` feedback; sticky action stayed `Return to Journey`; Journey row remained Review.
- Prompt Run:
  - Hidden State exercise: correct answer appeared in C; wrong answer left Continue disabled and showed targeted feedback; correct answer enabled Continue.
- Badge:
  - Visible version is `v0.16.1`.
  - Start over copy now documents that reset clears the checkpoint answer order seed.

Screenshots:

- `docs/screenshots/v0-16-1-training-shuffled-checkpoint.png`
- `docs/screenshots/v0-16-1-training-correct-feedback.png`
- `docs/screenshots/v0-16-1-prompt-run-hidden-state-shuffled.png`
- `docs/screenshots/v0-16-1-prompt-run-hidden-state-feedback.png`
- `docs/screenshots/v0-16-1-badge-reset-seed.png`

## Known Limitations

- The randomization is not cryptographic. It is intentionally simple, deterministic, and stable for learning.
- Some correct answers can still land in position A. The goal is to break the global pattern, not ban A.
- The audit script statically reads authored data; it is for internal QA, not a learner-facing feature.
- The app still has the existing Vite large-chunk warning.

## Next Recommended Steps

- Add a tiny regression test around `shuffleChoicesForQuestion()`.
- Add an optional internal review route filter for answer-position checks if reviewers want to inspect this visually later.
- Revisit multi-select exercises only if future user testing shows authored grouping creates answer-position bias.
