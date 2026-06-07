# Glossary Dojo Feedback v0.19.3

Date: 2026-06-06

## Summary

This pass makes Glossary Dojo answer feedback more precise without changing Journey cards, Journey progress, badge criteria, Dojo mastery rules, games, dependencies, generated assets, or checkpoint randomization.

Each answer choice now carries the glossary term it represents, even when the displayed choice is a definition rather than a term label. Feedback can therefore explain which term the selected wrong definition or answer actually belongs to.

## Feedback Patterns

Correct answer:

`Insight strengthened. [Correct term] means [short correct definition].`

Wrong term choice:

`Not quite. That definition is for [selected term]. The correct term is [correct term]. [Correct term] means [short correct definition].`

Wrong definition choice:

`Not quite. That definition is for [term represented by the selected definition]. The correct match is [correct term]. [Correct term] means [short correct definition].`

Fallback when the represented term cannot be identified:

`Not quite. That answer describes a different glossary term. The correct term is [correct term]. [Correct term] means [short correct definition].`

## Metadata Model

Each Dojo option now includes:

- `id`
- `termId`
- `representedTermId`
- `label`
- `displayedLabel`
- `displayedDefinition`
- `kind`
- `isCorrect`
- optional `feedbackTermId`

This lets the engine keep the displayed UI and feedback target aligned across `term_to_definition`, `definition_to_term`, `confusable_pair`, `relationship`, and `stage_location` questions.

## QA Examples

Fresh QA trace: `docs/play/screenshots/v0-19-3-glossary-dojo-feedback-qa.json`

- `term_to_definition`: selected `Sampling`; correct match `Tokenizer`.
  Feedback: `Not quite. That definition is for Sampling. The correct match is Tokenizer. Tokenizer means The rules and vocabulary that split text into tokens and map those tokens to IDs.`
- `definition_to_term`: selected `Top-k`; correct term `Machine learning`.
  Feedback: `Not quite. That definition is for Top-k. The correct term is Machine learning. Machine learning means Machine learning systems learn patterns from data.`
- `confusable_pair`: selected `Privacy`; correct term `Memory`.
  Feedback: `Not quite. That definition is for Privacy. The correct term is Memory. Memory means A durable store of information available later.`
- `relationship`: selected `Autoregression`; correct term `Deep learning`.
  Feedback: `Not quite. That definition is for Autoregression. The correct term is Deep learning. Deep learning means Deep learning uses many learned layers to transform representations.`
- `stage_location`: selected `Memory`; correct term `RAG`.
  Feedback: `Not quite. That definition is for Memory. The correct term is RAG. RAG means RAG retrieves outside information and places it into current context.`
- Correct answer: `Temperature`.
  Feedback: `Insight strengthened. Temperature means A decoding setting that changes how sharp or spread out next-token probabilities feel.`

## Question Types Checked

- `term_to_definition`: passed.
- `definition_to_term`: passed.
- `confusable_pair`: passed.
- `relationship`: passed.
- `stage_location`: passed.
- Correct answer feedback: passed.

QA also checked that answer choices expose represented-term metadata, the selected wrong choice shows `Your choice`, the correct choice shows `Correct match`, `Open [correct term]` remains available, `Next question` remains visible above the bottom nav after scrolling, and Journey progress stayed unchanged in the temporary QA profile.

## Screenshots

- `docs/play/screenshots/v0-19-3-dojo-wrong-definition-feedback-390.png`
- `docs/play/screenshots/v0-19-3-dojo-correct-feedback-390.png`
- `docs/play/screenshots/v0-19-3-dojo-wrong-definition-feedback-320.png`

## Known Limitations

- Feedback still uses the glossary short definition as written. Some terms start with the term name or an uppercase article, so a sentence can read like `RAG means RAG retrieves...` or `Temperature means A decoding setting...`.
- Relationship, confusable, and stage-location questions depend on the existing glossary and Dojo metadata. This pass improves feedback attribution but does not expand the metadata set.
- The production bundle still has the existing Vite large-chunk warning. No new dependency or asset was added in this pass.
