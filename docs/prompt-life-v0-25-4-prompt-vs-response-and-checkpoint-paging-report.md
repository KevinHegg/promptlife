# Prompt Life v0.25.4 Prompt vs Response And Checkpoint Paging Report

Date: 2026-06-07

## Summary

This was a targeted UI/content repair pass for two issues:

1. The `Prompt vs Response` visual aid was cramped and unclear.
2. The shared checkpoint component needed a top-of-panel paging header for lesson cards with more than one checkpoint question.

No badge logic, stage structure, Journey ordering, dependencies, generated assets, or unrelated cards were changed.

## Files Changed

- `src/components/VisualAids.tsx`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/REVIEW_NOTES.md`
- `docs/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.md`

Generated review artifacts:

- `docs/reports/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.html`
- `docs/reports/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.pdf`
- `docs/reports/screenshots/v0-25-4-prompt-response-visual-390.png`
- `docs/reports/screenshots/v0-25-4-prompt-response-visual-320.png`
- `docs/reports/screenshots/v0-25-4-prompt-response-checkpoint-390.png`
- `docs/reports/screenshots/v0-25-4-prompt-response-checkpoint-320.png`
- `docs/reports/screenshots/v0-25-4-prompt-response-paging-screenshots.json`

## Prompt vs Response Visual Repair

The `Prompt vs Response` coded visual aid now uses a taller, stacked layout:

1. Given prompt tokens
   - Shows `Describe two pets in conflict`.
   - Label states these tokens are already provided to the model.

2. Generated response so far
   - Shows `A jealous dog`.
   - Label states these tokens were generated one at a time.

3. Next token
   - Shows `chased` as a visually separate newly selected token.

4. Updated context
   - Shows `prompt + A + jealous + dog + chased`.
   - Label explains this becomes the context for the next run.

The cramped formula-style line was removed and replaced with clearer stacked bands and explanatory callouts below the visual.

## Checkpoint Paging UI

The shared `Checkpoint` component now accepts optional progress metadata:

- `current`
- `total`
- optional previous-question handler

When `total > 1`, the component renders a top-of-panel pager above the question:

- left label: `Checkpoint`
- right label: `Question X of Y`
- segmented dot progress
- `Final question` chip on the last question
- optional `Previous question` control when revisiting earlier questions

Existing single-question lesson checkpoints still render with the original calm `Checkpoint` label and no extra progress chrome.

## Current Content Note

A source scan found that current production lesson data uses single-question `lesson.quiz` objects. There are no current `quiz.questions` arrays to exercise in production content. This pass adds the multi-question checkpoint path safely for cards that use that shape later, while preserving the existing single-question shuffle key and UI behavior.

Remaining edge case: when the first production multi-question lesson is added, it should receive a final browser QA pass to verify exact authored content, paging state, and completion flow.

## Mobile QA

Browser screenshots were captured in a temporary Chrome profile so saved learner progress was not changed.

- `Prompt vs Response` visual at 390px: no horizontal overflow.
- `Prompt vs Response` visual at 320px: no horizontal overflow.
- Existing single-question checkpoint at 390px: no horizontal overflow.
- Existing single-question checkpoint at 320px: no horizontal overflow.
- No clipped visual tokens or label collisions were observed in the captured states.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.

## Remaining Issues

- No current production lesson card contains multiple checkpoint questions, so the multi-question pager path is implemented but awaits production-content QA.
- The existing Vite large-chunk warning remains.
