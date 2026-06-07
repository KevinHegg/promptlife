# Glossary Dojo V2 Question Design

Date: 2026-06-07

## Summary

This document describes the current Glossary Dojo question shape after the v0.24.3 term-question repair. Dojo preserves the existing non-competitive practice model: 12-question rounds, four choices, no timer, no score, no leaderboard, no failure state, localStorage mastery tracking, Play and Glossary entry points, Journey progress separation, reset integration, and precise wrong-answer feedback.

## Question Design Rules

- `term_to_definition`: type label is `TERM TO DESCRIPTION`; prompt is `What is [TERM]?`; choices are descriptions only; helper text is `Choose the best description.`
- `definition_to_term`: type label is `DESCRIPTION TO TERM`; prompt is `Which term matches this description?`; the description appears once above the choices; choices are term labels only.
- `confusable_pair` asks for the closest related term; choices are term labels only.
- `closest_concept`: type label is `RELATED IDEAS`; prompt asks for the closest related term; choices are term labels only.
- `stage_location`: prompt asks where a term fits in the model story; choices are short stage labels only.
- `relationship`: prompt asks what statement best connects to the target term; choices are short relationship statements only.

Current source removes the retired learner-facing wording named in the v0.24.3 repair prompt.

## Round Mix

New 12-question rounds are built from this preferred pattern:

- 5 term-to-definition questions
- 5 definition-to-term questions
- 1 confusable or closest-concept question
- 1 relationship or stage-location question when metadata supports it

If a richer metadata question cannot be built safely, the engine falls back to a simpler nearby question type instead of forcing awkward wording.

## Distractor Strategy

Term-to-description distractors prefer conceptually close ideas before farther glossary terms:

- `confusable`
- `related`
- `cluster`
- `same-stage`
- `near`
- `medium`
- `far`
- `global`

Concept clusters now support closer distractors for terms that learners often mix up, especially context, tokenization, representations, decoding, training, evidence, and costs/governance. The engine still uses glossary learning-path distance and stage metadata as fallbacks. New-round target selection still prioritizes the current learning-path frontier, recent missed terms, practiced-but-not-mastered terms, and then the next unpracticed learning-path window before global fallback.

## Stored Round Model

Each stored round now keeps the exact question set so repeat/review flows are stable:

- `roundId`
- `sourceMode`: `new_round`, `repeat_round`, or `review_missed`
- `repeatCount`
- `targetTermIds`
- `questions`
- `answers`
- timestamps and completed-round counts

This means repeat rounds reuse the same question specs, while review-missed rounds use only the missed specs from the last completed round.

## Results Repair

The results panel now says `Results from this round` and reports:

- 12 questions
- X correct
- Y to review
- rounds attempted
- repeated count
- mastered over time

It avoids score-like zero-mastery wording and explains: `Mastery grows across rounds. One round is practice, not a final judgment.`

Actions available from results:

- Review missed questions
- Repeat this round
- Start next round
- Back to Play
- Reset Dojo practice

## Feedback Patterns

Correct feedback:

`Insight strengthened. [TERM] is [short description].`

Wrong term-to-definition feedback:

`Not quite. That description is for [WRONG TERM]. [CORRECT TERM] is [short description].`

Wrong definition-to-term feedback:

`Not quite. [WRONG TERM] is [wrong description]. The correct match is [CORRECT TERM]. [CORRECT TERM] is [short description].`

Closest/confusable feedback:

`Not quite. [WRONG TERM] is related, but [CORRECT TERM] is closer here because [short reason].`

Stage-location fallback:

`Not quite. That answer belongs to a different part of the model story. The correct match is [CORRECT TERM]. [CORRECT TERM] fits in [stage].`

## QA Results

Automated browser QA used an isolated Chrome context with `promptlife:v1:progress` set to `[]` and Dojo storage reset before the run.

- Captured screenshots: 10
- Horizontal overflow findings: 0
- Journey progress mutations: 0
- Question families seen in the run: `confusable_pair`, `definition_to_term`, `term_to_definition`, `stage_location`
- Term-to-definition choices were definitions only.
- Definition-to-term choices were term labels only.
- Correct feedback started with `Insight strengthened.`
- Wrong feedback identified the represented wrong term.
- Review missed started a missed-question round.
- Repeat this round started a stored repeat with `repeatCount: 1`.

QA manifest:

- `docs/play/screenshots/v0-22-dojo-v2-qa.json`

PDF report:

- `docs/play/prompt-life-v0-22-glossary-dojo-v2-report.pdf`

Screenshots:

- `docs/play/screenshots/v0-22-dojo-v2-term-to-definition-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-definition-to-term-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-wrong-feedback-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-correct-feedback-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-results-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-repeat-review-actions-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-review-missed-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-repeat-round-390.png`
- `docs/play/screenshots/v0-22-dojo-v2-question-320.png`
- `docs/play/screenshots/v0-22-dojo-v2-results-320.png`

## Known Limitations

- Feedback still uses glossary definitions as its source of truth, so a few descriptions may keep domain-specific phrasing from the glossary.
- Relationship and stage-location questions depend on existing metadata; when metadata is thin, the engine falls back to simpler question types.
- The production bundle still has the existing Vite large-chunk warning. No dependency or generated asset was added in this pass.
