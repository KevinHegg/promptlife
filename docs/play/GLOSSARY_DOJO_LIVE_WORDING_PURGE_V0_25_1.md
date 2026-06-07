# Glossary Dojo Live Wording Purge v0.25.1

Date: 2026-06-07

## Scope

This pass removes stale learner-facing Glossary Dojo wording around neighbor/neighborhood language. It does not change Journey cards, Journey progress, badge logic, games, generated assets, dependencies, or checkpoint randomization.

## Phrases Removed From Live Dojo UI

- `learning neighborhood`
- `neighborhood`
- `neighbor of`
- `same learning neighborhood`
- `map the term`
- `nearby ideas as interchangeable`
- `term to meaning`
- `meaning to term`
- `What does`
- `Choose the best definition`

Historical docs and screenshots may still contain older wording as archival evidence. Current Dojo source, render logic, and the new bundle are guarded against the stale learner-facing phrasing.

## Question Families Checked

- `term_to_definition`
  - Label: `TERM TO DESCRIPTION`
  - Question: `What is [TERM]?`
  - Helper: `Choose the best description.`
  - Choices: descriptions only.
- `definition_to_term`
  - Label: `DESCRIPTION TO TERM`
  - Question: `Which term matches this description?`
  - Helper: `Choose the matching term.`
  - Choices: terms only.
- `closest_concept`
  - Label: `RELATED IDEAS`
  - Question: `Which idea is closest to [TERM]?`
  - Helper: `Choose the closest related term.`
  - Choices: terms only.
- `relationship`
  - Label: `RELATIONSHIP`
  - Question: `How are [TERM A] and [TERM B] related?`
  - Helper: `Choose the best relationship.`
  - Choices: short relationship statements only.
- `stage_location`
  - Label: `WHERE IT FITS`
  - Question: `Where does [TERM] fit in the model story?`
  - Helper: `Choose the best location.`
  - Choices: short stage/location descriptions only.

## closest_concept Status

`closest_concept` remains enabled for explicit clean specs, stored clean repeat/review specs, and deterministic QA. It is not part of the normal new-round pattern in this pass. Normal rounds now use only:

- `term_to_definition`
- `definition_to_term`

This is a temporary quality choice while Dojo wording is being purged from live sessions and stale localStorage states.

## Runtime Guard

Dojo now checks displayed question labels, prompts, and helpers at question creation and at render time. If stale wording is found in development, debug, or review mode, the app logs a console warning and displays a safe prompt/helper instead.

This render-time guard matters because users can have old Dojo rounds saved in `localStorage`.

## Exact Hidden State QA Case

Forced target:

- Target: `Hidden state`
- Forced correct term: `Embedding`
- Stale saved prompt injected: `Which term is a neighbor of Hidden state in the same learning neighborhood?`

Expected live display:

- Label: `RELATED IDEAS`
- Question: `Which idea is closest to Hidden state?`
- Helper: `Choose the closest related term.`
- Choices: terms only.

QA result:

- Passed.
- Displayed options: Embedding, Layer, Memory, Activation.
- No learning-neighborhood wording appeared.
- No neighbor-of wording appeared.
- No map-the-term wording appeared.
- No `What does` wording appeared.
- No unrelated cost/governance distractors appeared.
- No horizontal overflow at 390px.

QA artifacts:

- `docs/play/screenshots/v0-25-1-glossary-dojo-hidden-state-wording-qa.json`
- `docs/play/screenshots/v0-25-1-dojo-hidden-state-stale-guard-390.json`
- `docs/play/screenshots/v0-25-1-dojo-hidden-state-stale-guard-390.png`
- `docs/play/prompt-life-v0-25-1-glossary-dojo-live-wording-purge-report.pdf`

## Cache And Deployment Note

When checking Dojo wording after this pass on GitHub Pages or iPhone Safari, use a cache-busting URL such as `?v=0251` or clear site data. The live app has a render-time guard for saved rounds, but a browser may still serve an older JavaScript bundle until cache refresh.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Built-output search for `learning neighborhood`: 0 hits.
- Built-output search for `neighbor of`: 0 hits.
- Built-output search for `same learning neighborhood`, `nearby ideas as interchangeable`, `map the term`, `term to meaning`, `meaning to term`, and `Choose the best definition`: 0 hits.

## Known Issues

- Older archival reports and screenshots still preserve the previous wording.
- Some non-Dojo Journey checkpoint questions still begin with `What does`; those were not changed because this pass explicitly avoids Journey card changes.
- The existing Vite large-chunk warning remains.
