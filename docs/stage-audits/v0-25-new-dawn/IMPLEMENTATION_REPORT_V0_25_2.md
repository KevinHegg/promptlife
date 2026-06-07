# New Dawn Implementation Report v0.25.2

Date: 2026-06-07

## Summary

The v0.25.2 pass polishes the five existing New Dawn cards without adding cards, games, generated PNGs, dependencies, progress changes, checkpoint-randomization changes, or badge changes. The stage now closes with practical model literacy: benefits can be real and bounded, human-centered use requires accountability, better AI depends on design and governance choices, prompting shapes current context, and the final synthesis proves the full prompt-to-response chain.

## Card-by-Card Changes

### Benefits Worth Taking Seriously

- Replaced the generic visual with a coded three-bucket benefit-tier diagram: useful now with review, plausible with safeguards, and speculative/hype.
- Added a `benefit-tier-sort` tiny interaction.
- Added the concise `Benefits` glossary term.
- Kept cautious wording around demonstrated/common, plausible, and speculative claims.

### Human-Centered AI

- Replaced the generic human-center visual with an accountability flow: AI summary, decision context, affected people, human review, governance, and accountable action.
- Added a `human-centered-scenario` tiny interaction about student support notes.
- Added `Accountability` to the card's related terms.
- Kept the model-limit distinction: moral language is not moral understanding.

### Better AI Is a Choice

- Replaced the forked-path visual with a coded better-AI control panel.
- Added a `better-ai-levers` tiny interaction for an internal policy assistant scenario.
- Kept mitigation language scoped: choices can reduce some risks but do not erase every tradeoff.

### Effective Prompting from Model Literacy

- Expanded the coded prompt/context tray to show task, context, limits, example, evidence, uncertainty, format, and review.
- Added a `prompt-builder` tiny interaction that turns "Summarize this." into a more reviewable prompt with audience/context, constraints, examples, evidence, uncertainty, format, and review cues.
- Kept the core distinction: prompting shapes the current context for this run and does not rewrite model weights.

### Model Literate Synthesis

- Replaced the map/compass/lantern visual with a full-chain coded map.
- Added a `synthesis-chain` tiny interaction.
- Expanded the core explanation to trace: prompt, tokens, token IDs, embeddings, hidden states, logits, softmax probabilities, sampling, append-and-repeat generation, RAG/grounding, review, and accountability.
- Kept the single badge model: Prompt Life: Model Literate.

## Visual Changes

- All five visuals remain coded SVG/HTML.
- No generated PNGs were added.
- Labels are short in the visual; longer explanations remain in HTML captions and callouts.
- The final synthesis visual is coded because the exact order and labels matter.

## Glossary Updates

- Added `Benefits`.
- Added `Benefits` to the New Dawn learning path order.
- Added `Uncertainty`, `Source review`, and `Human review` to the Effective Prompting learning-path grouping.
- Added richer priority ordering for New Dawn key-term chips so chip collapse remains useful on mobile.

## Source Discipline

- No precise statistics were added.
- Wording continues to use cautious verbs such as can, may, depends on, with review, and when appropriate.
- Mitigation language remains scoped and does not promise guarantees.

## Badge and Synthesis Handling

- The app still has one badge: Prompt Life: Model Literate.
- Badge denominator and progress logic were not changed.
- The synthesis card now better prepares the learner for the existing badge by requiring the model story plus human accountability.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- `npm run audit:answers`: passed.

Build note: Vite still reports the existing large-chunk warning after production builds. This pass did not add dependencies or new chunking behavior.

## Screenshot QA

- Screenshot folder: `docs/stage-audits/v0-25-new-dawn/implementation-screenshots/`
- Manifest: `docs/stage-audits/v0-25-new-dawn/implementation-screenshots/v0-25-2-screenshot-manifest.json`
- Screenshots captured: 16
- Widths checked: 390px and 320px
- Manifest horizontal overflow result: false
- Final action clearance: the synthesis "Finish and view badge" action was recaptured with the button fully clear of the bottom nav.
- Preview behavior: New Dawn card screenshots were captured without completing checkpoints except the dedicated final-action screenshot.

## Known Issues

- New Dawn remains source-aware but not learner-cited. A future bibliography/source mode could make the internal source registry visible.
- The benefit-tier interaction uses tap/cycle sorting rather than drag and drop to preserve mobile and keyboard accessibility.
- The full-chain synthesis visual is intentionally compact; whole-app QA should confirm it remains readable across the most common iPhone sizes.

## Readiness

New Dawn is ready for whole-app QA and game review. It is not yet ready for Image 2 asset generation beyond planning; the coded relationships should be reviewed first.
