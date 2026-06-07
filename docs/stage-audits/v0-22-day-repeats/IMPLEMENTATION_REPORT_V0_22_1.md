# Implementation Report v0.22.1

Date: 2026-06-07

## Summary

The Day Repeats stage is now implemented as a coherent generation-and-evidence chain:

sampling chooses one token -> token is appended -> the model runs again -> response-so-far grows -> the context window limits what remains visible -> RAG can add retrieved evidence -> grounding connects claims to evidence -> hallucinations happen when fluent output outruns support.

## What Changed

- Upgraded Autoregression and Context Window into the richer lesson architecture already used by stronger cards.
- Added explicit durable-vs-temporary, prompt-vs-response, misconception, feedback, and connection fields for Autoregression and Context Window.
- Preserved the Journey order: Autoregression, Context Window, RAG and Retrieval, Grounding, Hallucinations.
- Retargeted all five cards to specific lesson micro-interactions.
- Replaced generic coded visuals for Autoregression and Context Window with concrete coded SVG/HTML visuals.
- Refined Grounding and Hallucinations visuals into claim/evidence and support-check maps.
- Added the `Response-so-far` glossary term and placed it in the Glossary learning path at Prompt vs Response.
- Bumped the visible app version to `v0.22.1`.

## Card Content

### Autoregression

- Defines generation as repeatedly choosing one next token, appending it to context, and running again.
- Uses the canonical example: prompt about household pets, response-so-far ending with `kitchen`, chosen token `floor`.
- Checkpoint: after a token is generated, it is appended to context and the model can run again.

### Context Window

- Defines context window as the limited amount of tokens or media the model can consider at one time.
- Makes system instruction, user prompt, retrieved note, response-so-far, and old message visible as context cards.
- Checkpoint: information outside the context window cannot be directly used in the current run.

### RAG and Retrieval

- Keeps the open-book AI mental model.
- Adds lane highlighting for Prompt -> Retriever -> Notes -> Context tray -> Response.
- Reinforces that RAG adds temporary evidence to context and does not rewrite weights.

### Grounding

- Makes grounding a claim-to-evidence support map.
- Includes a supported claim, a data-backed claim, and an unsupported claim.
- Reinforces that evidence still needs review.

### Hallucinations

- Makes fluent unsupported output visible without implying intent or lying.
- Adds a support-check interaction where the learner marks a claim with missing evidence.
- Keeps the practical message: fluency is not evidence.

## Visual Aid Behavior

- Autoregression: coded loop shows user prompt, response-so-far, chosen token `floor`, next context, and choose/append/run-again sequence.
- Context Window: coded tray shows four visible slots and an old card outside the tray.
- RAG: existing coded retrieval lanes are preserved; the interaction now mirrors the lane order.
- Grounding: coded claim/evidence support map replaces the more generic evidence-flow emphasis.
- Hallucinations: coded bridge/support map distinguishes supported, uncertain, and missing-support claims.

## Glossary Updates

- Added `Response-so-far`.
- Learning path now places `Response-so-far` with Prompt vs Response, where it is first introduced.
- Existing relevant terms remain in place: Autoregression, Context Window, Input context/current context, RAG, Retrieval/retrieved context, Grounding, Citation, Hallucination, Uncertainty, Human review, and Memory.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Mobile screenshot QA: zero horizontal overflow at 320px and 390px.
- Preview-mode screenshot QA: `promptlife:v1:progress` stayed `[]`.

## Screenshots

- `screenshots/v0-22-1-day-repeats-overview-390.png`
- `screenshots/v0-22-1-autoregression-visual-390.png`
- `screenshots/v0-22-1-autoregression-interaction-final-390.png`
- `screenshots/v0-22-1-context-window-visual-390.png`
- `screenshots/v0-22-1-context-window-interaction-final-390.png`
- `screenshots/v0-22-1-rag-lane-response-390.png`
- `screenshots/v0-22-1-grounding-unsupported-claim-390.png`
- `screenshots/v0-22-1-hallucinations-support-check-390.png`
- `screenshots/v0-22-1-hallucinations-checkpoint-feedback-390.png`
- `screenshots/v0-22-1-autoregression-320.png`
- `screenshots/v0-22-1-context-window-320.png`
- `screenshots/v0-22-1-hallucinations-320.png`
- `screenshots/v0-22-1-day-repeats-qa.json`

## Known Issues

- The existing Vite large-chunk warning remains.
- Correct checkpoint feedback still includes the app's global `Insight unlocked.` prefix before lesson-specific feedback. This was left unchanged to avoid a global checkpoint behavior change.
- The Autoregression coded visual is intentionally label-dense because the token/context mechanics are exact; the HTML callouts carry the full explanation.

## Readiness

Before Morning is not directly affected by this pass. The Day Repeats stage is ready to move on to Twilight content repair. It is not yet asking for broad Image 2 generation; Hallucinations remains an optional future textless bridge-scene candidate only.

