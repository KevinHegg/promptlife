# Journey Path Filters v0.14

Date: 2026-06-05

## Purpose

v0.14 adds Journey path filtering so learners can explore the curriculum without feeling that all 38 cards are equally required.

## Filter Labels

The Journey screen now shows:

- All
- Essential
- Deep
- Ethics

Learner-facing helper text:

> All cards build model literacy. Essential is the shortest path. Deep adds mechanics. Ethics connects AI to human consequences.

## Current Counts

- All: 38 cards
- Essential: 27 cards
- Deep: 5 cards
- Ethics: 6 cards

The row numbers remain global Journey numbers so learners can still tell where a card sits in the full sequence.

## Path Meaning

- Essential: the core prompt-to-response mental model and model-literacy synthesis.
- Deep: optional mechanics or background for learners who want more detail.
- Ethics: social, institutional, environmental, governance, and human-centered consequences.

## Completion And Progress

- Filtering does not change completed lessons.
- Filtering does not change the current open lesson.
- Filtering does not change badge progress.
- Opening a future filtered card still uses Preview mode.
- Opening a completed filtered card still uses Review mode.
- Learn mode remains the only mode that can complete a lesson.

## Path-Type Adjustments

This pass also aligned several existing cards with the v0.13 content-freeze candidate:

- `Alignment` moved into Essential.
- `Layers`, `Diffusion vs Autoregression`, and `Multimodal AI` moved into Deep.
- `The Perfect Storm`, `Benefits Worth Taking Seriously`, and `Better AI Is a Choice` moved into Ethics.

No new Journey content was added.

## Open Questions

- A future v1 pass may decide whether the Badge should require only the Essential path or keep the current blended completion criteria.
- A later source-review pass should revisit Ethics card labels after cited evidence is added.
