# Glossary Dojo Round Strategy V0.22.1

Date: 2026-06-07

## Summary

This pass makes Glossary Dojo normal rounds more varied while preserving the existing practice model: 12-question normal rounds, exact repeat rounds, focused missed-question review, no scores, no timers, no leaderboards, localStorage mastery, Play and Glossary entry points, Journey progress separation, and the one-badge model.

## Term Counts

- Total glossary terms counted from `src/data/content.ts`: 122
- Available Dojo terms after normalization: 122
- Normal round size: 12 terms
- Approximate full-coverage rounds before a practical cycle: 10 full normal rounds, with 2 terms left over

This is not a promise that a learner will never see an individual term again. The intended learner-facing behavior is: new rounds avoid repeating recent term sets when possible.

## Round Modes

- Normal round: generates a new 12-term target set, prioritizing unpracticed terms, then practiced-but-not-mastered terms, then missed terms, then mastered terms when needed.
- Repeat this round: reuses the stored target terms and question specs from the last completed round. It does not count as a new unique normal-round fingerprint and increments `repeatCount`.
- Review missed questions: uses only missed question specs from the last completed round. It may be shorter than 12 questions and keeps the supportive review framing.

## Target Fingerprints

Normal rounds store a `targetFingerprint` made by sorting target term IDs alphabetically and joining them with pipes:

`activation|attention|embedding|hidden-state|logits`

Each started/completed round keeps:

- `roundId`
- `roundNumber`
- `targetTermIds`
- `targetFingerprint`
- `mode`
- `sourceRoundId` when repeat/review comes from another round
- `repeatCount`
- `startedAt`
- `completedAt` when finished

Normal fingerprints are stored separately in `normalRoundFingerprints` and also recoverable from `roundHistory`/`perRound` during migration.

## Normal Round Selection

The normal selector uses a frontier-and-review blend:

- Up to 8 terms from the unpracticed/frontier region when review terms exist
- Up to 10 terms from the unpracticed/frontier region when there are no review terms
- Up to 2 earlier practiced-but-not-mastered terms
- Up to 2 recently missed or review-needed terms
- Fill from practiced-but-not-mastered, next unpracticed, all unpracticed, mastered, then the whole glossary as needed

If the generated 12-term fingerprint matches a previous normal round, the engine retries with new seeded attempts up to 20 times. If it still collides, it tries one replacement pass. If the practical cycle is exhausted, repeats are allowed, with missed and not-yet-mastered terms still preferred.

## Distractor Strategy

For each non-stage question, the engine aims for three distractor slots:

- Near: learning-path distance 2-5
- Medium: learning-path distance 6-12
- Far: outside the near/medium ranges

Each slot uses this fallback order:

1. Explicit confusable terms from metadata
2. Related terms from metadata
3. Learning-path proximity for the slot
4. Global glossary fallback

Rules kept in place:

- Never include the correct term as a distractor
- No duplicate choices
- Avoid identical definitions
- Avoid definition choices that reveal the correct answer by repeating the term
- Term-to-definition choices remain definitions only
- Definition-to-term choices remain terms only
- Relationship choices remain short relationship statements only

Distractor metadata is stored on options as developer-only QA data:

- `distractorSource`
- `distractorDistance`
- `learningPathDistance`

The app does not show this debug data to learners.

## Debug Hooks

`buildGlossaryDojoDebugReport` returns:

- total glossary term count
- available term count
- round size
- approximate unique full rounds
- last five normal round fingerprints
- whether the current normal round appears to duplicate history
- distractor distance/source metadata for a sample question

## Storage And Reset

Reset clears:

- current in-progress round
- last completed round
- round history
- normal round fingerprints
- repeat counts
- mastery state
- missed-term state

Existing Dojo resume behavior is preserved because `currentRound` is still stored as the resumable active round.

## QA Checklist

- Start a new normal round; record the fingerprint.
- Complete the round.
- Start next round; confirm the fingerprint differs while enough terms remain.
- Repeat the previous round; confirm the target terms match and `repeatCount` increments.
- Review missed questions; confirm only missed terms appear.
- Start several normal rounds; confirm fingerprints differ.
- Reset Dojo practice; confirm history, fingerprints, missed state, mastery, and current round clear.

## QA Results

Browser QA at 390px and 320px confirmed:

- First normal round fingerprint: `completion|deep-learning|embedding|generated-token|generative-ai|input-context|llm|machine-learning|model-output|response-so-far|tensor|weight`
- Second normal round fingerprint: `classical-machine-learning|distributed-representation|embedding|embedding-table|empiricism|llm|next-token|pretraining|prompt-tokens|response-so-far|symbolic-ai|weight`
- Second normal round differed from the first.
- Repeat round used `sourceMode: repeat_round`, `repeatCount: 1`, `targetCount: 12`, and the same fingerprint as the previous normal round.
- Review missed used `sourceMode: review_missed`, `targetCount: 1`, and `total: 1`.
- Reset returned Dojo to 0 rounds, 0 questions, no active round, and no summary.
- 320px summary check had no horizontal overflow.

QA manifest:

- `docs/play/screenshots/v0-22-1-dojo-round-strategy-qa.json`

Screenshots:

- `docs/play/screenshots/v0-22-1-dojo-round-strategy-review-missed-390.jpg`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-results-390.jpg`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-results-320.jpg`

PDF report:

- `docs/play/prompt-life-v0-22-1-glossary-dojo-round-strategy-report.pdf`

## Known Limitations

- The uniqueness guarantee is intentionally practical, not infinite. Once the learner has cycled through the glossary, repeats can return.
- Relationship and stage-location questions still depend on metadata coverage and fall back gracefully when metadata is thin.
- Metadata confusable/related terms are used only when they fit the near/medium/far slot; this keeps the distance strategy inspectable.
- The production bundle still has the existing Vite large-chunk warning.
