# Glossary Dojo Term Question Repair v0.24.3

Date: 2026-06-07

## Scope

This pass repairs Glossary Dojo term-question wording and distractor quality without changing Journey cards, Journey progress, badge logic, games, generated assets, dependencies, or checkpoint randomization.

## Question Templates

- `term_to_definition`
  - Type label: `TERM TO DESCRIPTION`
  - Prompt: `What is [TERM]?`
  - Helper: `Choose the best description.`
  - Choices: descriptions only.
- `definition_to_term`
  - Type label: `DESCRIPTION TO TERM`
  - Prompt: `Which term matches this description?`
  - Prompt body: one description appears above the choices.
  - Choices: term labels only.
- `closest_concept`
  - Type label: `RELATED IDEAS`
  - Prompt still asks for the closest related term.

The source scan checked the seven retired learner-facing phrases named in the repair prompt. No current Dojo source hits remain.

## Feedback Patterns

Correct term questions:

`Insight strengthened. [TERM] is [short description].`

Wrong `term_to_definition`:

`Not quite. That description is for [selected term]. [correct term] is [short description].`

Wrong `definition_to_term`:

`Not quite. [selected term] is [selected description]. The correct match is [correct term]. [correct term] is [short description].`

The feedback helper uses glossary definitions as source text, strips repeated `Term is` / `Term means` openings, and lowers ordinary sentence starts so feedback avoids constructions like `AI means AI is...` or `Hidden state is A...`.

## Distractor Strategy

Term-to-description choices now prefer closer conceptual neighbors before distant fallback choices:

1. `confusable`
2. `related`
3. `cluster`
4. `same-stage`
5. `near`
6. `medium`
7. `far`
8. `global`

The repair adds shared concept clusters for:

- context
- tokenization
- representations
- decoding
- training
- evidence
- costs/governance

These clusters help terms such as Input context, Tokenization, Hidden state, RAG, Softmax, and Water use get plausible distractors that teach distinctions instead of random glossary recognition.

## QA Examples Checked

Forced engine QA checked six term-to-description cases:

| Target | Prompt | Close distractors |
| --- | --- | --- |
| Input context | `What is Input context?` | Memory, Prompt, Context window |
| Tokenization | `What is Tokenization?` | Tokenizer, Token ID, Token |
| Hidden state | `What is Hidden state?` | Memory, Weight, Embedding |
| RAG | `What is RAG?` | Retrieval, Grounding, Training |
| Softmax | `What is Softmax?` | Logits, Sampling, Probability |
| Water use | `What is Water use?` | Data center, Energy use, Governance |

The automated QA confirmed:

- term questions use the new prompt and helper text.
- choices are descriptions only for `term_to_definition`.
- each forced case includes at least two close/confusable/related/cluster/same-stage distractors.
- correct feedback starts with `Insight strengthened.`
- wrong feedback starts with `Not quite. That description is for...`
- no horizontal overflow was detected in captured 320px and 390px screenshots.

QA manifest:

- `docs/play/screenshots/v0-24-3-glossary-dojo-term-question-repair-qa.json`
- `docs/play/screenshots/v0-24-3-glossary-dojo-term-question-repair-screenshots.json`
- `docs/play/screenshots/v0-24-3-glossary-dojo-feedback-scroll-screenshots.json`

PDF report:

- `docs/play/prompt-life-v0-24-3-glossary-dojo-term-question-repair-report.pdf`

## Screenshots

- `docs/play/screenshots/v0-24-3-dojo-input-context-question-390.png`
- `docs/play/screenshots/v0-24-3-dojo-input-context-question-320.png`
- `docs/play/screenshots/v0-24-3-dojo-input-context-wrong-feedback-scrolled-390.png`
- `docs/play/screenshots/v0-24-3-dojo-input-context-correct-feedback-scrolled-390.png`
- `docs/play/screenshots/v0-24-3-dojo-tokenization-question-390.png`
- `docs/play/screenshots/v0-24-3-dojo-hidden-state-question-390.png`
- `docs/play/screenshots/v0-24-3-dojo-rag-question-390.png`

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Known Limitations

- Historical v0.22/v0.19 documentation and screenshots may still show older Dojo wording as archival evidence; current Dojo source and current design docs use the repaired wording.
- Some glossary definitions remain intentionally concise, so feedback inherits the glossary's compact style.
- Relationship and stage-location question families still depend on available metadata and can fall back to simpler question types when metadata is thin.
