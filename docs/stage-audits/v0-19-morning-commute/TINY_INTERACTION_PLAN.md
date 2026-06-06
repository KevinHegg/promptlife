# Morning Commute Tiny Interaction Plan v0.19.1

Date: 2026-06-06

Status: implemented.

## Interaction Inventory

| Card | Keep/revise/add | Misconception addressed | Expected action | Feedback target |
| --- | --- | --- | --- | --- |
| Inference | Revised from generic forward-pass animation | Ordinary chat permanently updates the model | Choose the temporary part of ordinary inference | Fixed weights create temporary activations/internal states for the current run. |
| Prompt vs Response | Revised from autoregression animation | The model writes a full answer at once, or prompt/response roles blur | Tap rows for Prompt, Response so far, Next token, and Current context | Prompt is given; response tokens are generated and appended. |
| Tokenization | Revised from generic split animation | Tokens are always whole words | Tap to reveal simplified tokens, then uneven chunks | Tokens are model-readable chunks, not always human words. |
| Token IDs | Added specific matcher | Token ID number is the meaning | Match dog/cat/floor to ID and embedding row | The ID is a lookup key; meaning comes from learned numerical patterns. |
| Embeddings | Revised lookup interaction | Embedding is a definition or memory | Tap token IDs to retrieve a row and vector | Embedding starts the token in numerical space before context reshapes it. |
| Vectors | Revised strongly | Vector dimensions have neat English labels | Toggle teaching sliders versus distributed unlabeled pattern | Vectors let the model compute with many fuzzy numerical features at once. |
| Tensors | Revised strongly | Tensor is a mysterious object or one word/number | Tap token axis, feature axis, and batch note | Tensors organize many vectors so model layers can process them. |

## Implementation Notes

- Interactions are native HTML buttons, not div controls.
- All instructional copy is HTML text, not image text.
- The interactions live inside the existing lesson `Tiny interaction` panel, so Journey progress and checkpoint behavior are unchanged.
- The controls are designed for 320px and 390px widths with wrapping chips and compact grids.
- Reduced-motion requirements are preserved because these interactions are state changes, not continuous animation.

## No Changes

- No new Play games.
- No checkpoint randomization changes.
- No progress or badge denominator changes.
- No generated image assets.
- No Glossary Dojo module changes.
