# Tiny Interaction Plan v0.22.1

Date: 2026-06-07

## Scope

This plan covers the five Journey cards in The Day Repeats:

1. Autoregression
2. Context Window
3. RAG and Retrieval
4. Grounding
5. Hallucinations

No new games were added. These are short lesson interactions only.

## Interaction Matrix

| Card | Interaction type | Misconception targeted | Expected action | Correct feedback | Wrong feedback | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Autoregression | `autoregression-loop` | The model writes the whole response at once. | Tap through response-so-far, chosen token, appended token, and run again. | Insight strengthened. Autoregression means the response grows by choose, append, and repeat. | Not applicable; progressive interaction only. | Implemented |
| Context Window | `context-window-tray` | Context is permanent memory. | Push five cards into a four-slot tray and watch the old message fall out. | Insight strengthened. The model can only use what remains visible in the current context. | Not applicable; progressive interaction only. | Implemented |
| RAG and Retrieval | `rag-lane-highlight` | RAG trains the model or magically knows documents. | Tap Prompt, Retriever, Notes, Context tray, and Response. | Insight strengthened. RAG adds temporary evidence to context; it does not rewrite model weights. | Not applicable; lane reveal only. | Implemented |
| Grounding | `grounding-claim-match` | Citation-looking output is automatically grounded. | Tap claims and inspect whether each has matching evidence. | Insight strengthened. Grounding ties claims to evidence, but the evidence still needs review. | Not quite. A citation-looking answer is not automatically grounded; the evidence must actually support the claim. | Implemented |
| Hallucinations | `hallucination-support-check` | Hallucinations are usually lies or malice. | Tap the fluent claim with missing support. | Insight strengthened. A fluent claim can still need grounding or review. | Not quite. Hallucinations are not usually lies; they are unsupported or fabricated outputs from generation. | Implemented |

## Design Notes

- Interactions avoid scores, streaks, timers, and leaderboards.
- The progressive interactions are intentionally low-friction because the concept, not puzzle difficulty, is the teaching goal.
- The support-check interactions make evidence visibility concrete without requiring learners to master source evaluation yet.
- All interaction copy stays in HTML/CSS/React, not baked into images.

## Deferred

- No richer Play game was added for Grounding or Hallucinations.
- No generated Image 2 bridge asset was added for Hallucinations.
- No checkpoint-randomization or Journey-progress behavior was changed.

