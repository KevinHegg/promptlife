# Review Notes

Date: 2026-06-07

## v0.26.5 Prompt Response Panel Padding

### What Changed

- Reduced the vertical padding inside the four `Prompt vs Response` visual panels by about half.
- Kept the panel horizontal padding, four-row layout, Journey content, progress rules, and badge logic unchanged.
- Bumped the visible app version to `v0.26.5` and updated the README cache-busting example to `?v=0265`.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Report

- `docs/reports/prompt-life-v0-26-5-prompt-response-padding-report.html`
- `docs/reports/prompt-life-v0-26-5-prompt-response-padding-report.pdf`
- `docs/reports/screenshots/v0-26-5-prompt-response-padding-390.png`
- `docs/reports/screenshots/v0-26-5-prompt-response-padding-320.png`

## v0.26.4 Main Branch Cache-Bust Release

### What Changed

- Bumped the visible app version to `v0.26.4` for iPhone/Safari cache verification.
- Aligned `package.json` and `package-lock.json` metadata with the visible app version.
- Updated the README cache-busting example to `?v=0264`.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## v0.26.3 Glossary Dojo Shared Shell Wrap

### What Changed

- Wrapped Glossary Dojo start, question, feedback, and summary views in the shared Play Challenge Foundation presentation layer.
- Added shared `PlayChallengeShell`, `PlayChallengeHeader`, `PlayStatusPill`, `PlayProgressRail`, `PlayFeedbackPanel`, `PlayCompletionPanel`, and `PlayActionRow` usage around the existing Dojo loop.
- Preserved the existing 12-question rounds, engine, glossary data, close distractors, repeat rounds, review rounds, and Dojo progress store.
- Updated visible feedback leads to `Good distinction.` and `This choice reveals a common mix-up.`
- Updated summary language to `Round completed` / `Review suggested`.
- Updated summary actions to `Try another round` and `Review missed terms`.
- Kept shared Play attempt/completion tracking through `promptlife.playChallenges.v1`.
- Bumped the visible app version to `v0.26.3`.

### Preserved

- Journey progress, badge unlock criteria, checkpoint randomization, generated assets, dependencies, and the core Glossary Dojo learning engine were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px: Dojo started, advanced, showed common-mix-up and good-distinction feedback, completed a round, wrote shared Play progress, Badge loaded, and reset cleared shared Play/Dojo keys.
- Browser QA at 320px: Dojo question screen remained readable with no horizontal overflow.

### Screenshots And Report

- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.html`
- `docs/play/prompt-life-v0-26-3-glossary-dojo-shell-report.pdf`
- `docs/play/screenshots/v0-26-3-dojo-start-390.png`
- `docs/play/screenshots/v0-26-3-dojo-common-mixup-feedback-scrolled-390.png`
- `docs/play/screenshots/v0-26-3-dojo-good-distinction-feedback-390.png`
- `docs/play/screenshots/v0-26-3-dojo-summary-390.png`
- `docs/play/screenshots/v0-26-3-dojo-question-320.png`
- `docs/play/screenshots/v0-26-3-badge-dojo-shell-390.png`
- `docs/play/screenshots/v0-26-3-dojo-shell-screenshots.json`

### Known Issues

- The detailed Dojo engine feedback still produces older lead phrases internally; the visible UI strips those leads and adds the new calm feedback phrase.
- The existing Vite large-chunk warning remains.

## v0.26.2 Play Slate Simplification

### What Changed

- Confirmed the Play page uses the new Play Challenge Foundation registry and shows only five final or likely-final cards.
- Tightened final slate card copy:
  - Glossary Dojo: `Practice concept discrimination.`
  - Context Stack: `See what fits in context.`
  - Probability Picker: `Explore probability-shaped next-token choices.`
  - Prompt Run: `Capstone challenge: trace one prompt through the whole loop.`
  - Attention Match: `Connect a token to what it depends on.`
- Changed Prompt Run's primary action to `Start capstone`.
- Kept Token Pipeline Relay and How AI Learns out of the normal Play slate with retired compatibility handling preserved.
- Bumped the visible app version to `v0.26.2`.

### Preserved

- Journey progress, badge unlock rules, localStorage compatibility, checkpoint randomization, dependencies, generated assets, and existing Play challenge mechanics were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px and 320px: Play showed exactly the five-card simplified slate; Glossary Dojo, Context Stack, Prompt Run, and Attention Match opened; Probability Picker remained safely disabled; Badge loaded at `v0.26.2`; no horizontal overflow.

### Screenshots And Report

- `docs/play/prompt-life-v0-26-2-play-slate-simplification-report.html`
- `docs/play/prompt-life-v0-26-2-play-slate-simplification-report.pdf`
- `docs/play/screenshots/v0-26-2-play-slate-390.png`
- `docs/play/screenshots/v0-26-2-play-slate-320.png`
- `docs/play/screenshots/v0-26-2-badge-play-slate-390.png`
- `docs/play/screenshots/v0-26-2-play-slate-screenshots.json`

### Known Issues

- Probability Picker remains foundation-ready only.
- Attention Match still uses the current Attention Weave interaction underneath.
- The existing Vite large-chunk warning remains.

## v0.26.1 Play Challenge Foundation

### What Changed

- Added the shared Play challenge model, versioned progress helpers, and reusable Play UI chassis.
- Replaced the old Play page sections with the final slate: Glossary Dojo, Context Stack, Probability Picker, Prompt Run, and Attention Match.
- Hid Token Pipeline Relay and How AI Learns from the normal Play slate while preserving compatibility metadata.
- Reframed the current Attention Weave activity as the foundation version of Attention Match.
- Connected Glossary Dojo, Context Stack, Prompt Run, and Attention Match to shared Play attempt/completion progress without changing Journey progress or badge unlock rules.
- Updated Badge's Play stat to read final Play challenge completion slots and bumped the visible app version to `v0.26.1`.

### Preserved

- Journey order, Journey progress, badge unlock criteria, checkpoint randomization, generated assets, dependencies, and mature Glossary Dojo mastery storage were not changed.
- Legacy Prompt Run, mini-game, learning-tour, and Glossary Dojo progress keys are bridged or preserved rather than wiped.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning after a sequential rerun.
- `npm run audit:answers`: passed.
- Browser QA at 390px and 320px: Play, Badge, Glossary Dojo, and Prompt Run opened without horizontal overflow; deprecated Play items were absent from the final slate; reduced-motion emulation was respected.

### Screenshots And Report

- `docs/play/PLAY_FOUNDATION_LOG.md`
- `docs/play/prompt-life-v0-26-1-play-foundation-report.html`
- `docs/play/prompt-life-v0-26-1-play-foundation-report.pdf`
- `docs/play/screenshots/v0-26-1-play-foundation-390.png`
- `docs/play/screenshots/v0-26-1-play-foundation-320.png`
- `docs/play/screenshots/v0-26-1-badge-play-foundation-390.png`
- `docs/play/screenshots/v0-26-1-play-foundation-screenshots.json`

### Known Issues

- Probability Picker remains a disabled foundation-ready card until its full implementation pass.
- Attention Match still uses the current Attention Weave interaction underneath.
- The existing Vite large-chunk warning remains.
- The first `build:pages` attempt was run in parallel with another build and hit a temporary `dist/assets` cleanup race; the sequential rerun passed.

## v0.25.8 Tokenization Visual Crisp Diagram Repair

### What Changed

- Replaced the `Text to Tokens` SVG layout with a responsive coded HTML/CSS diagram.
- Removed in-diagram annotation bubbles that overlapped token chips.
- Reworked the visual into three readable sections:
  - source text,
  - token stream,
  - uneven examples.
- Split the messy `start | led floor | .` pill into two clear example rows: `startled` becomes `start` + `led`, and `floor.` becomes `floor` + `.`.
- Overrode the review-gallery compact 16:9 visual rule for this card so the uneven-example rows remain visible.
- Bumped the visible app version to `v0.25.8`.

### Preserved

- Journey order, badge logic, stage structure, generated assets, dependencies, checkpoint randomization, Glossary Dojo behavior, and lesson content were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px and 320px: token chips wrap inside their cards, uneven examples are readable, no SVG fallback, and no horizontal overflow.

### Screenshots And Report

- `docs/reports/prompt-life-v0-25-8-tokenization-crisp-diagram-report.html`
- `docs/reports/prompt-life-v0-25-8-tokenization-crisp-diagram-report.pdf`
- `docs/reports/screenshots/v0-25-8-tokenization-crisp-390.png`
- `docs/reports/screenshots/v0-25-8-tokenization-crisp-320.png`
- `docs/reports/screenshots/v0-25-8-tokenization-crisp-screenshots.json`

## v0.25.7 Prompt vs Response Crisp Diagram Repair

### What Changed

- Replaced the `Prompt vs Response` SVG layout with a responsive coded HTML/CSS diagram.
- Removed SVG-coordinate text and connector lines that caused alignment and overflow problems.
- Changed the visual to four full-width stacked cards so shapes cannot slip out of their containers.
- Overrode the review-gallery compact 16:9 visual rule for this card so the fourth `Updated context` row remains visible.
- Kept four crisp lanes:
  - given prompt,
  - response so far,
  - next token,
  - updated context.
- Token pills now wrap inside their own cards instead of slipping out of SVG containers.
- Bumped the visible app version to `v0.25.7`.

### Preserved

- Journey order, badge logic, stage structure, generated assets, dependencies, checkpoint randomization, and Glossary Dojo behavior were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA at 390px and 320px: four cards visible, `Updated context` fully inside the canvas, no SVG fallback, and no horizontal overflow.

### Screenshots And Report

- `docs/reports/prompt-life-v0-25-7-prompt-response-crisp-diagram-report.html`
- `docs/reports/prompt-life-v0-25-7-prompt-response-crisp-diagram-report.pdf`
- `docs/reports/screenshots/v0-25-7-prompt-response-crisp-390.png`
- `docs/reports/screenshots/v0-25-7-prompt-response-crisp-320.png`
- `docs/reports/screenshots/v0-25-7-prompt-response-crisp-screenshots.json`

## v0.25.5 Prompt vs Response Visual Clarity Repair

### What Changed

- Simplified the `Prompt vs Response` coded SVG again after browser review.
- Increased the prompt-response visual height and removed numbered overlay bubbles.
- Reduced long in-diagram wording and moved meaning into four clear lanes:
  - given prompt,
  - response so far,
  - next token,
  - updated context.
- Kept all explanatory text in HTML callouts below the SVG.
- Bumped the visible app version to `v0.25.5`.

### Preserved

- Journey order, badge logic, stage structure, generated assets, dependencies, checkpoint randomization, and Glossary Dojo behavior were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.

### Screenshots And Report

- `docs/reports/prompt-life-v0-25-5-prompt-response-visual-clarity-report.html`
- `docs/reports/prompt-life-v0-25-5-prompt-response-visual-clarity-report.pdf`
- `docs/reports/screenshots/v0-25-5-prompt-response-visual-390.png`
- `docs/reports/screenshots/v0-25-5-prompt-response-visual-320.png`

## v0.25.4 Prompt vs Response Visual And Checkpoint Paging

### What Changed

- Repaired the coded `Prompt vs Response` visual aid into a taller stacked diagram.
- The visual now separates:
  - given prompt tokens,
  - generated response-so-far tokens,
  - a newly selected next token,
  - and the updated context for the next run.
- Replaced the cramped formula-style line with clearer labels and HTML callouts.
- Added optional top-of-panel checkpoint paging support for multi-question lesson cards.
- Preserved the existing single-question checkpoint shuffle key and single-question UI behavior.
- Bumped the visible app version to `v0.25.4`.

### Preserved

- Badge logic, stage structure, Journey ordering, generated assets, dependencies, checkpoint answer randomization for current single-question cards, and Glossary Dojo behavior were not changed.

### QA Notes

- Source scan found no current production `quiz.questions` arrays; all current lesson cards use single-question `lesson.quiz` objects.
- The new paging UI appears only when a lesson card provides more than one checkpoint question.
- Existing single-question checkpoint rendering was regression-checked.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.

### Screenshots And Report

- `docs/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.md`
- `docs/reports/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.html`
- `docs/reports/prompt-life-v0-25-4-prompt-vs-response-and-checkpoint-paging-report.pdf`
- `docs/reports/screenshots/v0-25-4-prompt-response-paging-screenshots.json`

### Known Issues

- No current production lesson card contains multiple checkpoint questions, so the multi-question pager path still needs content-specific QA when the first multi-question card is added.
- The existing Vite large-chunk warning remains.

## v0.25.3 Fine-Tuning Brain Bridge Wording

### What Changed

- Changed the Fine-Tuning brain bridge wording from `house style` to `corporate norms`.
- Updated the matching current glossary phrasing for Adapter so current learner-facing app copy no longer uses `house style`.
- Bumped the visible app version to `v0.25.3`.

### Preserved

- Journey order, progress rules, badge logic, games, generated assets, dependencies, checkpoint randomization, and Glossary Dojo behavior were not changed.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.

### Screenshots And Report

- `docs/reports/prompt-life-v0-25-3-wording-house-style-report.html`
- `docs/reports/prompt-life-v0-25-3-wording-house-style-report.pdf`
- `docs/reports/screenshots/v0-25-3-fine-tuning-corporate-norms-390.png`

## v0.26 Play/Game Audit And Pruning Plan

### What Changed

- Created an audit-only Play/Game pruning package.
- Audited all six current Play activities: Prompt Run, Context Stack, Attention Weave, Token Pipeline Relay, Glossary Dojo, and How AI Learns.
- Added keep/revise/merge/cut recommendations and a recommended final 3 to 5 activity slate.
- Added reusable Play design principles for future implementation passes.
- Added a machine-readable audit JSON file.
- Captured 17 mobile screenshots in a temporary Chrome profile so user progress was not changed.

### Recommendations

- Keep Glossary Dojo.
- Keep Context Stack with small future polish.
- Revise Prompt Run as the featured capstone.
- Revise Attention Weave into a clearer Attention Match activity.
- Cut or merge Token Pipeline Relay.
- Merge How AI Learns into Journey/Prompt Run support rather than keeping it as a final Play card.

### Preserved

- No games, Journey cards, progress rules, badge logic, generated assets, dependencies, checkpoint randomization, or Glossary Dojo behavior were changed.
- The one-badge model remains unchanged.
- This pass did not bump the visible app version because it is documentation/audit only.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Report

- `docs/play/PLAY_GAME_AUDIT_V0_26.md`
- `docs/play/PLAY_DESIGN_PRINCIPLES_V0_26.md`
- `docs/play/play-game-audit-v0-26.json`
- `docs/play/screenshots/v0-26-play-audit-screenshots.json`
- `docs/play/prompt-life-v0-26-play-game-audit-report.html`
- `docs/play/prompt-life-v0-26-play-game-audit-report.pdf`

### Known Issues

- The existing Vite large-chunk warning remains.
- Prompt Run is still long for a Play activity.
- Token Pipeline Relay has weak conceptual fit.
- How AI Learns duplicates Journey-style teaching.
- Attention Weave needs more diagnostic replay value.

## v0.25.1 Glossary Dojo Live Wording Purge

### What Changed

- Removed the stale learner-facing Glossary Dojo neighbor/neighborhood wording from current question generation.
- Added a render-time Dojo copy guard so old saved rounds in `localStorage` fall back to safe wording.
- Changed new normal Dojo rounds to use only `term_to_definition` and `definition_to_term` during this purge pass.
- Kept `closest_concept` enabled only for explicit clean specs, stored clean specs, and deterministic QA.
- Updated final Dojo templates for related, relationship, and stage-location question families.
- Strengthened the Hidden state related-choice pool toward Embedding, Activation, Layer, Memory, and other representation terms.
- Bumped the visible app version to `v0.25.1`.

### Preserved

- Journey cards, Journey order, Journey progress, badge logic, games, generated assets, dependencies, and checkpoint randomization were not changed.
- Dojo remains independent from Journey progress.

### Hidden State QA

- Injected a stale saved `Hidden state` related question into localStorage.
- Live UI displayed `Which idea is closest to Hidden state?`
- Helper displayed `Choose the closest related term.`
- Choices were terms only: Embedding, Layer, Memory, Activation.
- No stale neighbor/neighborhood wording appeared.

### Cache Note

- When checking Dojo wording on GitHub Pages or iPhone Safari after this pass, use a cache-busting URL such as `?v=0251` or clear site data.
- This note is for development/review only and is not shown to learners.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Built-output searches for the exact stale Dojo failure phrases returned 0 hits.

### Screenshots And Report

- `docs/play/GLOSSARY_DOJO_LIVE_WORDING_PURGE_V0_25_1.md`
- `docs/play/prompt-life-v0-25-1-glossary-dojo-live-wording-purge-report.html`
- `docs/play/prompt-life-v0-25-1-glossary-dojo-live-wording-purge-report.pdf`
- `docs/play/screenshots/v0-25-1-glossary-dojo-hidden-state-wording-qa.json`
- `docs/play/screenshots/v0-25-1-dojo-hidden-state-stale-guard-390.json`
- `docs/play/screenshots/v0-25-1-dojo-hidden-state-stale-guard-390.png`

### Known Issues

- Historical Dojo docs and screenshots still preserve old wording as archival evidence.
- The existing Vite large-chunk warning remains.

## v0.24.3 Glossary Dojo Term Question Repair

### What Changed

- Repaired Glossary Dojo term-question wording so term prompts now use `What is [TERM]?` and `Choose the best description.`
- Renamed learner-facing question labels to `TERM TO DESCRIPTION`, `DESCRIPTION TO TERM`, and `RELATED IDEAS`.
- Added concept clusters and a closer distractor priority order so term questions prefer confusable, related, clustered, and same-stage terms before distant fallback terms.
- Reworked Dojo feedback grammar so correct answers start with `Insight strengthened.` and wrong term-description answers name the selected wrong term.
- Bumped the visible app version to `v0.24.3`.

### Preserved

- Journey cards, Journey order, Journey progress, badge logic, games, generated assets, dependencies, and checkpoint randomization were not changed.
- Glossary Dojo still uses 12-question rounds, four choices, localStorage mastery tracking, Play/Glossary entry points, and no score/timer/leaderboard.

### QA Examples

- Input context: close distractors included Memory, Prompt, and Context window.
- Tokenization: close distractors included Tokenizer, Token ID, and Token.
- Hidden state: close distractors included Memory, Weight, and Embedding.
- RAG: close distractors included Retrieval, Grounding, and Training.
- Softmax: close distractors included Logits, Sampling, and Probability.
- Water use: close distractors included Data center, Energy use, and Governance.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Report

- `docs/play/GLOSSARY_DOJO_TERM_QUESTION_REPAIR_V0_24_3.md`
- `docs/play/prompt-life-v0-24-3-glossary-dojo-term-question-repair-report.html`
- `docs/play/prompt-life-v0-24-3-glossary-dojo-term-question-repair-report.pdf`
- `docs/play/screenshots/v0-24-3-glossary-dojo-term-question-repair-qa.json`
- `docs/play/screenshots/v0-24-3-glossary-dojo-term-question-repair-screenshots.json`
- `docs/play/screenshots/v0-24-3-glossary-dojo-feedback-scroll-screenshots.json`

### Known Issues

- Historical v0.22/v0.19 Dojo docs and screenshots still contain old wording as archival records.
- The existing Vite large-chunk warning remains.

## v0.25 New Dawn Stage Audit

### What Changed

- Created an audit-only package for the `New Dawn` stage.
- Audited five current New Dawn Journey cards:
  - Benefits Worth Taking Seriously
  - Human-Centered AI
  - Better AI Is a Choice
  - Effective Prompting from Model Literacy
  - Model Literate Synthesis
- Added stage audit docs, source review, recommendations, machine-readable JSON, screenshot index, and mobile screenshots under `docs/stage-audits/v0-25-new-dawn/`.
- Captured 59 mobile screenshots using temporary headless Chrome profiles; user/browser progress was not changed.

### Preserved

- No live Journey card content, Journey order, games, generated PNG assets, dependencies, progress rules, checkpoint randomization, badge logic, or Glossary Dojo logic were changed.
- The one-badge model remains `Prompt Life: Model Literate`.

### Major Findings

- New Dawn is correctly ordered and closes the Journey with benefits, human-centered values, responsible choices, prompting practice, and synthesis.
- The copy is mostly strong and cautious; the next implementation pass should focus on clearer visuals and more diagnostic tiny interactions.
- Model Literate Synthesis most needs a full-chain capstone interaction.
- Better AI Is a Choice needs clearer lever categories so it does not feel list-heavy.
- Human-Centered AI needs a concrete accountability scenario so it feels substantive rather than slogan-like.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Report

- `docs/stage-audits/v0-25-new-dawn/README.md`
- `docs/stage-audits/v0-25-new-dawn/card-inventory.md`
- `docs/stage-audits/v0-25-new-dawn/recommendations.md`
- `docs/stage-audits/v0-25-new-dawn/source-review.md`
- `docs/stage-audits/v0-25-new-dawn/stage-audit.json`
- `docs/stage-audits/v0-25-new-dawn/screenshot-index.md`
- `docs/stage-audits/v0-25-new-dawn/screenshots/new-dawn-v0-25-screenshot-manifest.json`

## v0.24.1 Midnight Ledger Implementation Pass

### What Changed

- Implemented the three in-scope Midnight Ledger cards: `collective-intelligence`, `costs-we-must-count`, and `risk-myth`.
- Repaired the coded Collective visual into a source-trace and rights-question map.
- Replaced the Costs visual with a cautious ledger/infrastructure map.
- Converted Risk vs Myth into the richer lesson schema and a mechanism-vs-myth visual.
- Added the requested non-competitive tiny interactions:
  - Collective: human/institutional questions vs model mechanics sort.
  - Costs: tap ledger entries for energy, water, hardware, labor, privacy, and governance.
  - Risk: six-claim real-risk/myth sort.
- Added concise glossary support for risk literacy, tool use, overreliance, vendor lock-in, concentration of power, bias, and information pollution.
- Bumped the visible app version to `v0.24.1`.

### Preserved

- Journey order, progress rules, checkpoint randomization, badge logic, generated PNG assets, dependencies, games, and Glossary Dojo logic were not changed.
- Prompt Injection / Tool Risk remains inside Risk vs Myth and glossary support; no standalone Journey card was added.
- The one-badge model remains unchanged.

### Mobile QA

- 390px: Midnight overview, Collective visual, Collective interaction, Costs visual, Costs interaction, Risk visual, Risk sort, and Risk checkpoint feedback were captured.
- 320px: Costs and Risk visual spot checks showed no horizontal overflow.
- Preview mode stayed active for the three Midnight cards; progress did not change.
- Home generated assets still loaded.
- Play still exposes Glossary Dojo.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; Risk vs Myth now audits as a four-choice randomized checkpoint.

### Screenshots And Report

- `docs/stage-audits/v0-24-midnight-ledger/IMPLEMENTATION_REPORT_V0_24_1.md`
- `docs/stage-audits/v0-24-midnight-ledger/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-24-midnight-ledger/TINY_INTERACTION_PLAN.md`
- `docs/stage-audits/v0-24-midnight-ledger/prompt-life-v0-24-1-midnight-ledger-implementation-report.html`
- `docs/stage-audits/v0-24-midnight-ledger/prompt-life-v0-24-1-midnight-ledger-implementation-report.pdf`
- `docs/stage-audits/v0-24-midnight-ledger/screenshots/v0-24-1-midnight-implementation-qa.json`

### Known Issues

- The existing Vite large-chunk warning remains.
- Future Image 2 asset generation is ready for the Costs card only if the next pass wants a textless generated asset; this pass intentionally added no generated PNGs.

## v0.23.4 Perfect Storm Visual Layout Repair

### What Changed

- Repaired the coded `Storm Front` visual for The Perfect Storm.
- Replaced the cramped radial convergence SVG with a stacked two-column convergence layout.
- Moved `Convergence, not one spark.` out of the SVG and into HTML below the diagram.
- Kept the visual explanation as: data, compute, storage, methods, labor, and incentives converged into modern LLM capability.
- Bumped the visible app version to `v0.23.5` because `v0.23.4` was already used for the New Dawn stage-tile label change.

### Preserved

- Journey order, Journey card content, progress rules, checkpoint randomization, badge logic, generated assets, dependencies, games, and Glossary Dojo were not changed.
- The existing Perfect Storm tiny interaction remains a non-competitive tap-to-light ingredient activity.

### Layout Chosen

- Option B: stacked convergence.
- Six ingredient chips flow through connector lines into one centered `Modern LLM capability` node.
- The convergence takeaway appears as HTML caption text rather than as a label inside the SVG.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser/CDP QA at 390px: no SVG text overlaps, no horizontal overflow, old in-SVG convergence label removed, HTML caption present, key takeaway above bottom nav.
- Browser/CDP QA at 320px: no SVG text overlaps, no horizontal overflow, full `Incentives` label fits, HTML caption present.
- Interaction QA at 390px: all six ingredient buttons can be active, feedback shows the convergence insight, and controls remain above the bottom nav.

### Screenshots And Report

- `docs/stage-audits/v0-23-twilight/PERFECT_STORM_VISUAL_REPAIR_V0_23_4.md`
- `docs/stage-audits/v0-23-twilight/prompt-life-v0-23-4-perfect-storm-visual-repair-report.html`
- `docs/stage-audits/v0-23-twilight/prompt-life-v0-23-4-perfect-storm-visual-repair-report.pdf`
- `docs/stage-audits/v0-23-twilight/visual-repair-screenshots/perfect-storm-visual-repair-v0-23-4-qa.json`
- `docs/stage-audits/v0-23-twilight/visual-repair-screenshots/perfect-storm-visual-repair-cdp-390.jpg`
- `docs/stage-audits/v0-23-twilight/visual-repair-screenshots/perfect-storm-visual-repair-cdp-320.jpg`
- `docs/stage-audits/v0-23-twilight/visual-repair-screenshots/perfect-storm-interaction-repair-cdp-390.jpg`

### Known Issues

- The existing Vite large-chunk warning remains.

## v0.23.4 New Dawn Stage Tile Label

### What Changed

- Changed the New Dawn Journey stage-grid subtitle from `Better human use` to `Human centered AI`.
- Updated the New Dawn stage metadata so the grid subtitle, fallback nav hint, and accessible jump label stay aligned.
- Bumped the visible app version to `v0.23.4`.

### Preserved

- Journey card content, Journey order, progress logic, badge logic, checkpoint randomization, games, generated assets, and dependencies were not changed.
- The full stage name `New Dawn` and existing lesson titles remain unchanged.

### Mobile QA

- 390px: New Dawn tile shows `Human centered AI`; page width stayed at 390px; no horizontal overflow.
- 320px: New Dawn tile shows `Human centered AI`; subtitle scroll width matched client width; no subtitle overflow.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Report

- `docs/journey/NEW_DAWN_STAGE_TILE_LABEL_V0_23_4.md`
- `docs/journey/prompt-life-v0-23-4-new-dawn-stage-tile-label-report.html`
- `docs/journey/prompt-life-v0-23-4-new-dawn-stage-tile-label-report.pdf`
- `docs/journey/screenshots/v0-23-4-new-dawn-label-390.jpg`
- `docs/journey/screenshots/v0-23-4-new-dawn-label-320.jpg`

### Known Issues

- The existing Vite large-chunk warning remains.

## v0.24 Midnight Ledger Stage Audit

### What Changed

- Added a documentation-only audit package for Journey stage 7, Midnight Ledger.
- Audited the current live cards: Collective Intelligence, Extracted; Costs We Must Count; Risk vs Myth.
- Confirmed Prompt Injection / Tool Risk is not currently a standalone Journey card; it appears inside Risk vs Myth and the glossary.
- Captured 35 mobile screenshots across Journey/stage overview, lesson hero, visual aid, core idea, source-review caveat, Brain Bridge, tiny interaction, checkpoint, feedback, bottom action, and 320px/430px spot checks.
- Added `README.md`, `card-inventory.md`, `recommendations.md`, `source-review.md`, `screenshot-index.md`, `stage-audit.json`, screenshot artifacts, QA JSON, and an internal PDF report under `docs/stage-audits/v0-24-midnight-ledger/`.
- Left live curriculum behavior unchanged: no Journey cards, Journey order, progress rules, checkpoint randomization, games, generated assets, dependencies, badge logic, or Glossary Dojo logic changed.

### Major Findings

- The stage order is coherent: data/culture, infrastructure/cost, then risk literacy.
- Collective Intelligence is cautious and does not claim all data was stolen, but it still needs a better provenance/rights/value interaction.
- Costs We Must Count is source-aware and avoids unsourced precise statistics, but it most needs a better visual and tiny interaction.
- Risk vs Myth belongs in Midnight Ledger, but should be converted to the richer lesson schema and made more mechanism-specific.
- Prompt Injection / Tool Risk should stay inside Risk vs Myth for now unless a later tools/security pass warrants a standalone card.

### Visual Findings

- Costs We Must Count is the best future Image 2 candidate: a textless midnight ledger / data-center footprint scene with labels kept in HTML.
- Collective Intelligence is a possible later hybrid/Image 2 candidate, but a coded SVG repair may be enough.
- Risk vs Myth should remain coded SVG so the real-risk/myth mechanism labels stay precise.
- The current Costs visual is cramped at 320px and repeats `Power`.
- The current Collective visual has a cramped/clipped central `Lantern` label.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA confirmed Preview-mode progress stayed unchanged, Home generated assets loaded, Where LLMs Fit taxonomy still rendered, Midnight visual-aid review entries existed, and Glossary Dojo still appeared in Play.

### Screenshots And Report

- `docs/stage-audits/v0-24-midnight-ledger/README.md`
- `docs/stage-audits/v0-24-midnight-ledger/card-inventory.md`
- `docs/stage-audits/v0-24-midnight-ledger/recommendations.md`
- `docs/stage-audits/v0-24-midnight-ledger/source-review.md`
- `docs/stage-audits/v0-24-midnight-ledger/screenshot-index.md`
- `docs/stage-audits/v0-24-midnight-ledger/stage-audit.json`
- `docs/stage-audits/v0-24-midnight-ledger/prompt-life-v0-24-midnight-ledger-stage-audit-report.html`
- `docs/stage-audits/v0-24-midnight-ledger/prompt-life-v0-24-midnight-ledger-stage-audit-report.pdf`
- `docs/stage-audits/v0-24-midnight-ledger/screenshots/midnight-ledger-v0-24-qa.json`

### Known Issues

- The existing Vite large-chunk warning remains.
- Collective Intelligence and Costs We Must Count have mismatched tiny interactions in the current app.
- Risk vs Myth still uses a slimmer lesson schema.
- No live fixes were made because this was an audit-only pass.

## v0.23.3 Twilight Implementation (requested v0.23.1 pass)

### What Changed

- Upgraded the first three Twilight cards, How AI Learns, Diffusion vs Autoregression, and Multimodal AI, to the richer lesson schema.
- Kept the Twilight Journey order unchanged: How AI Learns, Diffusion vs Autoregression, Multimodal AI, The Perfect Storm.
- Reframed How AI Learns as a synthesis map of durable training, temporary context steering, retrieval/context, and evaluation/feedback.
- Reworked Diffusion vs Autoregression around the simple contrast between append-one-token generation and denoise/refine generation.
- Reworked Multimodal AI around media inputs, a bounded shared/connected representation space, and possible outputs.
- Replaced The Perfect Storm's generic feature-cloud interaction with a storm-ingredients interaction.
- Added glossary support for `Representation`, `Denoising`, `Storage`, and `Economic incentives`.
- Bumped the visible app version to `v0.23.3`.

### Visual And Interaction Changes

- How AI Learns now uses a coded learning-modes matrix plus a learning-modes sort interaction.
- Diffusion vs Autoregression now uses a coded split diagram plus a Token path / Denoise path stepper.
- Multimodal AI now uses a coded media lane map plus input-output pairing states.
- The Perfect Storm now uses coded convergence streams plus tappable Data, Compute, Storage, Algorithms, Human labor, and Incentives buttons.

### Constraints Preserved

- No Journey cards, Journey order, progress rules, badge logic, checkpoint randomization, games, generated PNG assets, heavy 3D libraries, dependencies, learner-facing PDF features, or Glossary Dojo behavior were changed.

### Mobile QA

- 390px screenshots confirmed the Twilight overview, all four updated visual/interaction areas, no horizontal overflow, and readable coded diagrams.
- 320px screenshots confirmed Diffusion and Perfect Storm remain readable.
- Preview-mode QA opened all four Twilight cards with `promptlife:v1:progress` staying `[]`.
- Home generated hero and mark still load, including in the in-app browser.
- Visual-aid review route detects Learning Modes Matrix, Append Or Denoise, Media Lane Map, and Storm Front.
- Play still exposes Glossary Dojo and Practice challenges.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots And Reports

- `docs/stage-audits/v0-23-twilight/IMPLEMENTATION_REPORT_V0_23_1.md`
- `docs/stage-audits/v0-23-twilight/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-23-twilight/TINY_INTERACTION_PLAN.md`
- `docs/stage-audits/v0-23-twilight/prompt-life-v0-23-1-twilight-implementation-report.html`
- `docs/stage-audits/v0-23-twilight/prompt-life-v0-23-1-twilight-implementation-report.pdf`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/twilight-implementation-v0-23-1-qa.json`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/twilight-overview-after-implementation-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/how-ai-learns-matrix-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/how-ai-learns-sort-interaction-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/diffusion-split-visual-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/diffusion-interaction-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/multimodal-media-map-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/multimodal-interaction-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/perfect-storm-convergence-visual-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/perfect-storm-ingredient-interaction-390.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/diffusion-320.png`
- `docs/stage-audits/v0-23-twilight/implementation-screenshots/perfect-storm-320.png`

### Known Issues

- The existing Vite large-chunk warning remains.
- The How AI Learns matrix is intentionally compact; a future iteration could make individual matrix rows expandable if learner testing calls for more space.
- The Perfect Storm Image 2 asset is planned but intentionally not generated in this pass.

## v0.23.2 Journey Simplification

### What Changed

- Removed the learner-facing Journey Path View block and its All, Essential, Deep, and Ethics filter buttons.
- Removed Guided Comparisons from the Journey screen so Journey presents one coherent card sequence.
- Kept the 8-stage jump grid with the compact v0.23.1 mobile labels and accessible stage labels.
- Added a short Journey helper line: "All stages follow one prompt through the full day: before training, through inference, generation, evidence, risks, costs, and better human use."
- Updated Badge copy to frame one confidence badge: `Prompt Life: Model Literate`.
- Bumped the visible app version to `v0.23.2`.

### What Remains

- Path metadata remains available internally for review/audit routes and future reporting.
- Guided comparison activities remain under Play, including Prompt Run and How AI Learns.
- Journey card content, Journey order, checkpoint randomization, progress storage, badge logic, Glossary Dojo behavior, generated assets, dependencies, and games were not changed.

### Mobile QA

- 390px: Path View absent, path filter buttons absent, Guided Comparisons absent from Journey, 8 stage buttons visible, no horizontal overflow, all stage buttons scrolled correctly, Journey bottom nav returned to top.
- 320px: Path View absent, path filter buttons absent, Guided Comparisons absent from Journey, 8 stage buttons visible, no horizontal overflow, no clipped tile text in screenshot review.
- Play still contains Prompt Run, Context Stack, Attention Weave, Token Pipeline Relay, Glossary Dojo, How AI Learns, and Guided Comparisons.
- Badge screen shows one-badge copy with no learner-facing path requirement language.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots and Report

- `docs/journey/JOURNEY_SIMPLIFICATION_V0_23_2.md`
- `docs/journey/screenshots/journey-simplification-v0-23-2-qa.json`
- `docs/journey/screenshots/journey-v0-23-2-top-390.png`
- `docs/journey/screenshots/journey-v0-23-2-top-320.png`
- `docs/journey/screenshots/journey-v0-23-2-stage-grid.png`
- `docs/journey/screenshots/badge-v0-23-2-single-badge-copy.png`

### Known Issues

- Badge copy is simplified, but the unlock threshold still uses the existing internal qualifying-lesson calculation. A future badge-logic pass should rename or simplify that internal threshold now that learner-facing paths are hidden.
- The existing Vite large-chunk warning remains.

## v0.23.1 Journey Stage Grid Label Polish

### What Changed

- Shortened display labels in the tappable 4x2 Journey stage grid while preserving full stage names elsewhere.
- Added stage metadata fields for grid-only labels: `shortTitle`, `gridSubtitle`, and `ariaLabel`.
- Updated `StageTimeline` so compact labels apply only to Journey jump tiles.
- Kept section headers, lesson context, stage scroll behavior, active styling, Journey order, progress logic, badge logic, games, generated assets, dependencies, and checkpoint randomization unchanged.
- Bumped the visible app version to `v0.23.1`.

### Final Stage Grid Labels

- 1 Before Morning - Model shaped before use
- 2 Morning Commute - Text becomes numbers
- 3 Workday - Layers process context
- 4 Decision Room - One token is chosen
- 5 Day Repeats - Context grows + expires
- 6 Twilight - Wider AI landscape
- 7 Midnight Ledger - Costs and shadows
- 8 New Dawn - Better human use

### Mobile QA

- 320px: 4 columns, 8 tiles, no horizontal overflow, no clipped tile text, all tile taps scrolled to the correct section, Journey bottom nav returned to top.
- 390px: 4 columns, 8 tiles, no horizontal overflow, no clipped tile text, all tile taps scrolled to the correct section, Journey bottom nav returned to top.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots and Report

- `docs/journey/STAGE_GRID_LABELS_V0_23_1.md`
- `docs/journey/stage-grid-labels-v0-23-1-qa.json`
- `docs/journey/screenshots/v0-23-1-stage-grid-320.png`
- `docs/journey/screenshots/v0-23-1-stage-grid-390.png`

### Known Issues

- The existing Vite large-chunk warning remains.

## v0.23 Twilight Stage Audit

### What Changed

- Added a documentation-only audit package for Journey stage 6, Twilight: The Wider Landscape.
- Audited the current live cards: How AI Learns, Diffusion vs Autoregression, Multimodal AI, and The Perfect Storm.
- Captured 51 mobile screenshots across Journey/stage overview, lesson hero, visual aid, core idea, brain bridge, tiny interaction, checkpoint, feedback, bottom action, and 320px/430px spot checks.
- Added `README.md`, `card-inventory.md`, `recommendations.md`, `screenshot-index.md`, `stage-audit.json`, screenshot artifacts, and an internal review report under `docs/stage-audits/v0-23-twilight/`.
- Left live curriculum behavior unchanged: no Journey cards, Journey order, progress rules, checkpoint randomization, games, generated assets, dependencies, badge logic, or Glossary Dojo logic changed.

### Major Findings

- The Twilight stage order is coherent and should remain unchanged.
- How AI Learns, Diffusion vs Autoregression, and Multimodal AI are accurate but still use the slimmer lesson architecture.
- The Perfect Storm is the strongest Twilight card, but its tiny interaction currently falls back to a generic feature cloud instead of storm ingredients.
- The next implementation pass should upgrade coded visuals and tiny interactions before adding generated assets.

### Visual Findings

- How AI Learns needs a learning-modes matrix.
- Diffusion needs a denoise-vs-append contrast.
- Multimodal needs a tighter media input/output representation map.
- The Perfect Storm is the only recommended Image 2 candidate for this stage: a textless convergence scene with labels and callouts kept in HTML.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots and Report

- `docs/stage-audits/v0-23-twilight/README.md`
- `docs/stage-audits/v0-23-twilight/card-inventory.md`
- `docs/stage-audits/v0-23-twilight/recommendations.md`
- `docs/stage-audits/v0-23-twilight/screenshot-index.md`
- `docs/stage-audits/v0-23-twilight/stage-audit.json`
- `docs/stage-audits/v0-23-twilight/prompt-life-v0-23-twilight-stage-audit-report.pdf`

### Known Issues

- The existing Vite large-chunk warning remains.
- Some long Journey-page screenshots required clean headless Chrome capture after the in-app browser timed out.
- The live app still contains the Perfect Storm generic feature-cloud interaction because this audit intentionally did not implement curriculum changes.

## v0.22.2 Glossary Dojo Round Variety Pass

### What Changed

- Added normal-round target fingerprints so Start next round avoids repeating exact 12-term sets when possible.
- Added Dojo `roundHistory` and `normalRoundFingerprints` storage, with migration fallback from older stored rounds.
- Kept Repeat this round exact by reusing stored target terms and question specs, and kept Review missed questions focused on the last round's missed specs.
- Reworked normal target selection into a frontier-and-review blend: mostly unpracticed/current-path terms with practiced-not-mastered and missed terms mixed in when available.
- Made the distractor strategy explicit: near, medium, and far learning-path slots with confusable/related metadata fallbacks.
- Added developer-only distractor metadata on answer options and `buildGlossaryDojoDebugReport` for QA/reporting.
- Added small results-screen action copy explaining fresh, repeat, and missed-review rounds without algorithm language.
- Bumped the visible app version to `v0.22.2`.
- Preserved Journey cards, Journey progress rules, badge criteria, games, generated assets, dependencies, and checkpoint randomization.

### Storage And Reset

- Dojo reset clears current round, last completed round, round history, normal fingerprints, repeat counts, mastery state, and missed-term state.
- Existing Dojo resume behavior remains based on `currentRound`.
- Normal fingerprints are stored only for normal rounds; repeat and review rounds are tracked in history but do not count as unique normal sets.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA confirmed normal-round fingerprint variety, exact repeat fingerprint reuse with `repeatCount: 1`, one-question review-missed behavior, Dojo reset clearing practice state, and no 320px horizontal overflow.

### Screenshots And Report

- `docs/play/GLOSSARY_DOJO_ROUND_STRATEGY_V0_22_1.md`
- `docs/play/prompt-life-v0-22-1-glossary-dojo-round-strategy-report.pdf`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-qa.json`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-review-missed-390.jpg`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-results-390.jpg`
- `docs/play/screenshots/v0-22-1-dojo-round-strategy-results-320.jpg`

### Known Issues

- New normal rounds avoid exact repeated term sets when possible, but repeats are allowed after the practical glossary cycle is exhausted.
- Relationship and stage-location question variety still depends on metadata coverage.
- The existing Vite large-chunk warning remains.

## v0.22.1 The Day Repeats Implementation Pass

### What Changed

- Implemented the Day Repeats repair pass for Autoregression, Context Window, RAG and Retrieval, Grounding, and Hallucinations.
- Kept Journey order unchanged: Autoregression -> Context Window -> RAG and Retrieval -> Grounding -> Hallucinations.
- Upgraded Autoregression and Context Window to richer lesson architecture with lifecycle, durable-vs-temporary, prompt-vs-response, misconception, and feedback fields.
- Replaced the generic Autoregression and Context Window coded visuals with concrete, mobile-readable SVG/HTML diagrams.
- Added specific lesson interactions: `autoregression-loop`, `context-window-tray`, `rag-lane-highlight`, `grounding-claim-match`, and `hallucination-support-check`.
- Added the `Response-so-far` glossary entry and placed it in the Glossary learning path at Prompt vs Response.
- Bumped the visible app version to `v0.22.1`.
- Preserved games, generated assets, dependencies, Journey progress rules, checkpoint randomization, Glossary Dojo logic, and the one-badge model.

### Visual and Interaction Notes

- Autoregression now shows the canonical `floor` token being chosen, appended, and used in the next context.
- Context Window now uses a four-slot tray where the old message falls out.
- RAG now highlights Prompt -> Retriever -> Notes -> Context tray -> Response.
- Grounding now inspects whether generated claims actually match evidence.
- Hallucinations now asks learners to mark a fluent claim that lacks support without implying intent or lying.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Mobile screenshot QA: zero horizontal overflow at 320px and 390px.
- Preview-mode screenshot QA: `promptlife:v1:progress` stayed `[]`.

### Screenshots and Report

- `docs/stage-audits/v0-22-day-repeats/IMPLEMENTATION_REPORT_V0_22_1.md`
- `docs/stage-audits/v0-22-day-repeats/IMAGE_ASSET_PLAN.md`
- `docs/stage-audits/v0-22-day-repeats/TINY_INTERACTION_PLAN.md`
- `docs/stage-audits/v0-22-day-repeats/prompt-life-v0-22-1-day-repeats-implementation-report.pdf`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-day-repeats-qa.json`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-autoregression-visual-390.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-context-window-320.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-rag-lane-response-390.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-grounding-unsupported-claim-390.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/v0-22-1-hallucinations-support-check-390.png`

### Known Issues

- The existing Vite large-chunk warning remains.
- Correct checkpoint feedback still includes the global `Insight unlocked.` prefix before lesson-specific feedback; this was not changed because it is global checkpoint behavior.
- No generated Image 2 assets were added. Hallucinations remains the only optional future textless candidate after the coded support map stabilizes.

## v0.22 Glossary Dojo V2 Question Design

### What Changed

- Repaired Glossary Dojo question formats so term-to-definition choices show definitions only and definition-to-term choices show term labels only.
- Replaced the specified learner-facing neighborhood/model-map wording with short, plain helpers such as `Choose the best definition.` and `Choose the closest related term.`
- Added learning-path-proximity distractor selection and frontier-aware round target selection so early rounds stay near the current glossary path before falling back to the full glossary.
- Expanded stored Dojo rounds with source mode, repeat count, target terms, full question specs, per-round records, and completed-round counts.
- Rebuilt the results panel around `Results from this round`, with calm mastery-over-time wording, Strengthened this round, Needs another look, Review missed questions, Repeat this round, Start next round, and Back to Play.
- Preserved Journey cards, Journey progress, checkpoint randomization, badge criteria, generated assets, dependencies, games, and the one-badge model.

### Question Type Fixes

- `term_to_definition`: `What does [TERM] mean?`; four definition choices.
- `definition_to_term`: `Which term matches this definition?`; the definition appears once above four term choices.
- `confusable_pair` / `closest_concept`: term choices only with `Choose the closest related term.`
- `stage_location`: short stage-label choices only when metadata supports it.
- `relationship`: short statement choices only when metadata supports it.

### Results and Practice Flow

- Repeat round reuses the exact stored question specs from the last completed round and increments `repeatCount`.
- Review missed creates a smaller round from only the missed question specs.
- Correct feedback starts with `Insight strengthened.`
- Wrong feedback identifies the represented wrong term when the selected choice maps to one.
- Mastery remains localStorage-based and separate from Journey progress.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- `git diff --check`: passed.
- Browser QA captured 10 screenshots with zero horizontal overflow and zero Journey progress mutation in an isolated profile.

### Screenshots and Report

- `docs/play/GLOSSARY_DOJO_V2_QUESTION_DESIGN.md`
- `docs/play/prompt-life-v0-22-glossary-dojo-v2-report.pdf`
- `docs/play/screenshots/v0-22-dojo-v2-qa.json`
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

### Known Issues

- Glossary definitions are reused directly, so some feedback still reads like `AI means AI is...`.
- Relationship and stage-location questions depend on existing metadata and gracefully fall back when metadata is thin.
- The existing Vite large-chunk warning remains.

## v0.22 The Day Repeats Stage Audit

### What Changed

- Added a documentation-only audit package for Journey stage 5, The Day Repeats.
- Audited the current live cards: Autoregression, Context Window, RAG and Retrieval, Grounding, and Hallucinations.
- Captured 63 mobile screenshots across Journey/stage overview, lesson hero, visual aid, core idea, model lifecycle/detail, brain bridge, tiny interaction, checkpoint, feedback, bottom action, and 320px/430px spot checks.
- Added `README.md`, `card-inventory.md`, `recommendations.md`, `screenshot-index.md`, `stage-audit.json`, screenshot artifacts, and an internal review PDF under `docs/stage-audits/v0-22-day-repeats/`.
- Left live curriculum behavior unchanged: no Journey cards, Journey order, progress rules, checkpoint randomization, games, generated assets, dependencies, badge logic, or Glossary Dojo logic changed.

### Major Findings

- The stage order is strong: Autoregression -> Context Window -> RAG and Retrieval -> Grounding -> Hallucinations.
- Autoregression and Context Window are accurate but still use the older slim lesson schema.
- RAG and Retrieval is the strongest current card in the stage; it clearly teaches retrieval plus context, not training or permanent memory.
- Grounding and Hallucinations handle evidence and risk carefully without fearmongering or hype.
- The next implementation pass should make the loop more visible: one token chosen, appended, model runs again, context grows, older context can fall out, RAG can add evidence, grounding helps, and hallucinations remain possible.

### Visual Findings

- RAG, Grounding, and Hallucinations coded visuals remain readable at 320px and 390px.
- Autoregression and Context Window visuals are readable but too generic for their teaching burden.
- The screenshot manifest reports zero horizontal overflow and zero lesson-preview progress mutations.
- No required Image 2 asset is recommended yet; Hallucinations is only an optional later textless bridge-scene candidate.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- `stage-audit.json`: valid JSON.

### Screenshots and Report

- `docs/stage-audits/v0-22-day-repeats/screenshots/day-repeats-overview.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/autoregression-visual-aid-320.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/context-window-visual-aid-320.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/rag-retrieval-visual-aid.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/grounding-visual-aid-320.png`
- `docs/stage-audits/v0-22-day-repeats/screenshots/hallucinations-visual-aid-320.png`
- `docs/stage-audits/v0-22-day-repeats/prompt-life-v0-22-day-repeats-audit-report.pdf`

### Known Issues

- The existing Vite large-chunk warning remains.
- Autoregression and Context Window still need live implementation repairs in a future v0.22.1 pass.
- RAG, Grounding, and Hallucinations tiny interactions remain generic until the next implementation pass.

## v0.21.2 Decision Room Implementation Pass

### What Changed

- Bumped the visible app version to `v0.21.2`.
- Upgraded the existing Decision Room Journey cards: Logits, Softmax, and Sampling.
- Kept the Journey order unchanged: Logits, Softmax, then Sampling.
- Added richer lesson architecture fields for lifecycle, durable vs temporary state, prompt/response notes, misconceptions, relationships, and checkpoint feedback.
- Replaced the older Decision Room visuals with coded SVG/HTML diagrams for raw scores, softmax probability conversion, and weighted token choice.
- Added dedicated tiny interactions: `logits-raw-toggle`, `softmax-convert`, and `sampling-probability-pick`.
- Improved Decision Room glossary support for Logits, Softmax, Probability, Sampling, Decoding step, Next token, Temperature, Top-k, and Top-p.
- Added `IMAGE_ASSET_PLAN.md`, `TINY_INTERACTION_PLAN.md`, `IMPLEMENTATION_REPORT_V0_21_2.md`, refreshed screenshots, and a single PDF implementation report under `docs/stage-audits/v0-21-decision-room/`.
- Left games, generated PNG assets, dependencies, Journey progress rules, badge criteria, checkpoint randomization, Journey order, and Glossary Dojo logic unchanged.

### Card Improvements

- Logits now teaches raw candidate next-token scores from the final hidden state, before probabilities and before choosing.
- Softmax now teaches raw-score normalization into probabilities that sum to one.
- Sampling now teaches the decoding choice, append boundary, and the distinction between probability and truth.
- All three cards use the same Decision Room chain: hidden state -> logits -> softmax -> probabilities -> sampling -> one generated token.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning after rerunning serially.
- `npm run audit:answers`: passed.
- Screenshot QA refreshed 320px and 390px captures; the manifest reports `overflowX: false`.

### Screenshots and Report

- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-decision-room-overview-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-logits-raw-score-visual-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-logits-interaction-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-softmax-before-after-visual-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-softmax-interaction-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-sampling-weighted-visual-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-sampling-interaction-390.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-softmax-visual-320.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-sampling-visual-320.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/v0-21-2-checkpoint-randomized-logits-390.png`
- `docs/stage-audits/v0-21-decision-room/prompt-life-v0-21-2-decision-room-implementation-report.pdf`

### Known Issues

- The existing Vite large-chunk warning remains.
- Top-k and top-p remain glossary-supported optional terms, not main-visual concepts.

## v0.21.1 Generated Visual Copy Cleanup

### What Changed

- Bumped the visible app version to `v0.21.1`.
- Removed internal asset-generation language from learner-facing generated visual captions and accessible descriptions.
- Rewrote the generated-image-backed visual copy for What Is an LLM?, Pretraining, Fine-Tuning, and Alignment so each caption teaches the model concept rather than how the image was produced.
- Updated the Pretraining callouts and key takeaway to emphasize broad durable pattern learning without implying perfect source recall.
- Changed the generated visual fallback heading from `Visual asset unavailable.` to `Visual unavailable.`.
- Added `docs/design/LEARNER_FACING_COPY_GUARDRAILS_V0_21_1.md` to keep future learner-facing copy free of production/process notes.
- Preserved internal implementation metadata on the visual-aid review route, including asset filename, type, asset path, text-handling notes, and print/PDF notes.
- Left Journey cards, Journey order, games, progress rules, checkpoint randomization, badge logic, dependencies, generated assets, and Decision Room implementation unchanged.

### Phrases Removed From Learner-Facing Copy

- `A textless model-cloud scene is paired with HTML callouts...`
- `A textless folded landscape is paired with HTML callouts...`
- `A textless targeted-path scene is paired with HTML callouts...`
- `A textless alignment garden is paired with HTML callouts...`
- `textless conceptual image`
- `surrounding HTML callouts`
- `Visual asset unavailable.`

### New Pretraining Visual Copy

Caption: `Many examples flow through the training loop. Repeated updates shape weights into broad patterns the model can use later. This does not make the model a perfect memory of its sources.`

Callouts:

- `Many examples flow`: Pretraining repeats the training loop across enormous collections of examples.
- `Updates shape weights`: Prediction errors drive repeated weight updates during training.
- `Broad patterns form`: The model learns statistical patterns that can help later prompts.
- `Not perfect recall`: Pretraining does not store every source as a searchable memory.

Key takeaway: `Pretraining builds broad capability, not perfect source recall.`

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- `git diff --check`: passed.
- Screenshot QA used temporary Chrome profiles; `promptlife:v1:progress` stayed `[]`.
- Learner visual screenshots reported `badLearnerCopy: false` and `overflowX: false`.

### Screenshots and Report

- `docs/design/screenshots/v0-21-1-what-is-llm-visual-390.png`
- `docs/design/screenshots/v0-21-1-pretraining-visual-390.png`
- `docs/design/screenshots/v0-21-1-pretraining-visual-320.png`
- `docs/design/screenshots/v0-21-1-fine-tuning-visual-390.png`
- `docs/design/screenshots/v0-21-1-alignment-visual-390.png`
- `docs/design/screenshots/v0-21-1-visual-gallery-metadata-390.png`
- `docs/design/screenshots/v0-21-1-visual-gallery-internal-metadata-390.png`
- `docs/design/prompt-life-v0-21-1-generated-visual-copy-cleanup-report.pdf`

### Known Issues

- The Vite bundle still triggers the existing large-chunk warning.
- The visual-aid review route intentionally still includes internal metadata; that route is for QA, not learner Journey use.

## v0.21 Decision Room Stage Audit

### What Changed

- Added a documentation-only audit package at `docs/stage-audits/v0-21-decision-room/`.
- Audited the current Decision Room cards: Logits, Softmax, and Sampling.
- Captured 39 screenshots: required 390px Journey/card states plus 320px and 430px visual-aid spot checks.
- Added `README.md`, `stage-audit.json`, `card-inventory.md`, `recommendations.md`, `screenshot-index.md`, screenshot manifest, and an internal PDF report source.
- Left live curriculum, Journey order, progress logic, checkpoint randomization, generated PNG assets, games, dependencies, Glossary Dojo, badge logic, and visible app version unchanged.

### Findings

- Decision Room order is correct: Logits, Softmax, then Sampling.
- All three cards still use older slim lesson fields and need richer lifecycle, durable/temporary, prompt/response, and misconception copy.
- Probability-not-truth is present as the stage key distinction, but should be repeated directly in each card.
- Logits needs the strongest interaction repair because it currently reuses the Softmax interaction.
- No Image 2 asset is recommended for the next Decision Room pass; all three visuals should remain coded SVG/HTML.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Screenshot QA used a temporary Chrome profile and Preview mode; `promptlife:v1:progress` stayed `[]`.

### Screenshots

- `docs/stage-audits/v0-21-decision-room/screenshots/decision-room-overview.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/logits-visual-aid.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/softmax-visual-aid.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/sampling-visual-aid.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/sampling-tiny-interaction.png`
- `docs/stage-audits/v0-21-decision-room/screenshots/softmax-visual-aid-320.png`

## v0.20.1 Workday Visual + Interaction Repair

### What Changed

- Bumped the visible app version to `v0.20.1`.
- Upgraded the existing Workday Journey cards: Attention, MLP, Layers, and Hidden States.
- Added richer lesson architecture fields for lifecycle, durable vs temporary state, prompt/current-context notes, misconceptions, and checkpoint feedback.
- Replaced the Workday coded visuals with clearer concept-specific diagrams: concrete attention relevance, MLP feature reshaping, repeated transformer layers, and hidden-state flow.
- Added dedicated tiny interactions: `attention-relevance-connect`, `mlp-feature-toggle`, `layers-stack-inspect`, and `hidden-state-sort`.
- Added a dedicated Hidden States sort exercise mapping so Hidden States no longer reuses the MLP exercise.
- Added or improved glossary support for Workday terms including Relevance weight, Multi-layer perceptron, Feed-forward network, Transformer layer, Residual path, Normalization, and Temporary activation.
- Added `IMAGE_ASSET_PLAN.md`, `TINY_INTERACTION_PLAN.md`, `IMPLEMENTATION_REPORT_V0_20_1.md`, screenshots, and a single PDF implementation report under `docs/stage-audits/v0-20-workday/`.
- Left Journey order, Journey progress, badge logic, checkpoint randomization, generated PNG assets, new games, heavy dependencies, and Glossary Dojo logic unchanged.

### Verification

- Browser QA passed for the revised Workday overview and interactions at 390px.
- 320px visual-aid spot checks passed for MLP, Layers, and Hidden States after label tightening.
- Screenshot QA used Preview mode; `promptlife:v1:progress` stayed `[]`.
- No horizontal overflow was detected in the screenshot manifest.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots

- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-workday-overview-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-attention-visual-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-attention-interaction-feedback-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-mlp-toggle-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-layers-stack-inspector-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-hidden-states-flow-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-hidden-states-sort-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-hidden-states-checkpoint-feedback-390.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-mlp-visual-320.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-layers-visual-320.png`
- `docs/stage-audits/v0-20-workday/screenshots/v0-20-1-hidden-states-visual-320.png`

## v0.19.3 Glossary Dojo Feedback Precision

### What Changed

- Bumped the visible app version to `v0.19.3`.
- Added represented-term feedback metadata to Glossary Dojo answer choices so wrong feedback can name the glossary term behind the selected wrong answer.
- Updated wrong-answer feedback to say `That definition is for [selected term]`, then name the correct term or correct match and give the short correct definition.
- Updated correct-answer feedback to begin with `Insight strengthened.`
- Added `data-testid="glossary-dojo-feedback"` and represented-term data attributes for QA.
- Left Journey cards, Journey progress, badge criteria, Dojo mastery logic, games, generated assets, dependencies, and checkpoint randomization unchanged.
- Added `docs/play/GLOSSARY_DOJO_FEEDBACK_V0_19_3.md` and a PDF report source.

### Verification

- Programmatic browser QA passed at 390px and 320px for `term_to_definition`, `definition_to_term`, `confusable_pair`, `relationship`, `stage_location`, and correct-answer feedback.
- QA confirmed represented-term metadata on choices, `Your choice` and `Correct match` labels, `Open [correct term]`, visible `Next question`, and unchanged Journey progress in a temporary profile.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

### Screenshots

- `docs/play/screenshots/v0-19-3-dojo-wrong-definition-feedback-390.png`
- `docs/play/screenshots/v0-19-3-dojo-correct-feedback-390.png`
- `docs/play/screenshots/v0-19-3-dojo-wrong-definition-feedback-320.png`

## v0.20 Workday Stage Audit

### What Changed

- Added a documentation-only audit package at `docs/stage-audits/v0-20-workday/`.
- Audited the current Workday cards: Attention, MLP, Layers, and Hidden States.
- Captured 51 screenshots: required 390px Journey/card states plus 320px and 430px visual-aid spot checks.
- Added `README.md`, `stage-audit.json`, `card-inventory.md`, `recommendations.md`, `screenshot-index.md`, screenshot manifest, and an internal PDF report source.
- Left live curriculum, Journey order, progress logic, checkpoint randomization, generated PNG assets, games, dependencies, Glossary Dojo, badge logic, and visible app version unchanged.

### Findings

- Workday order is correct: Attention, MLP, Layers, then Hidden States.
- All four cards still use older slim lesson fields and need richer lifecycle, durable/temporary, prompt/current-context, and misconception copy.
- MLP and Hidden States are the highest-priority visual/interaction repair targets.
- Attention must remain coded SVG because exact token relationships matter.
- Layers is the best Workday candidate for lightweight CSS 3D; no Image 2 asset is recommended for the next pass.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning. An earlier parallel run collided with `build:pages` while both tried to clean `dist`; rerunning `npm run build` by itself passed.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Screenshot QA used temporary Preview-mode browser profiles; `promptlife:v1:progress` stayed `[]`.

### Screenshots

- `docs/stage-audits/v0-20-workday/screenshots/journey-top.png`
- `docs/stage-audits/v0-20-workday/screenshots/workday-overview.png`
- `docs/stage-audits/v0-20-workday/screenshots/attention-visual-aid.png`
- `docs/stage-audits/v0-20-workday/screenshots/mlp-visual-aid-320.png`
- `docs/stage-audits/v0-20-workday/screenshots/layers-visual-aid.png`
- `docs/stage-audits/v0-20-workday/screenshots/hidden-states-core-idea.png`

## v0.19.2 Play Card Time Layout

### What Changed

- Bumped the visible app version to `v0.19.2`.
- Compact Play card time metadata so every card reads as a single inline line such as `Time: 3 min`.
- Left Play card content, games, progress logic, badge logic, checkpoint randomization, dependencies, and generated assets unchanged.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser/layout QA: passed at 390px and 320px. All six Play cards report one-line 18px time rows: Prompt Run, Context Stack, Attention Weave, Token Pipeline Relay, Glossary Dojo, and How AI Learns.

### Screenshots

- `docs/play/screenshots/v0-19-2-play-time-inline-390.png`
- `docs/play/screenshots/v0-19-2-play-time-inline-320.png`

## v0.19.1 Morning Commute Implementation Pass

### What Changed

- Bumped the visible app version to `v0.19.1`.
- Revised the seven existing Morning Commute cards without adding cards or changing order: Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- Updated card copy to clarify fixed weights versus temporary activations, prompt/response roles, uneven token chunks, ID-as-lookup-key, durable embedding table versus temporary retrieved vector, distributed vector features, and tensor axes.
- Replaced reused generic tiny interactions with specific Morning Commute interactions for temporary inference state, prompt/response labels, token splitting, token-ID matching, embedding lookup, vector-view toggling, and tensor-axis inspection.
- Refined the coded SVG/HTML visual aids for all seven cards; no generated PNG assets, new games, heavy 3D libraries, badge changes, progress changes, or checkpoint randomization changes were added.
- Added review-route hash scrolling so direct links such as `/review/visual-aids#tensors` land on the intended review card.
- Added `IMAGE_ASSET_PLAN.md`, `TINY_INTERACTION_PLAN.md`, and `IMPLEMENTATION_REPORT_V0_19_1.md` to the Morning Commute audit package.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; Morning Commute checkpoint answers still randomize by answer identity.
- Browser screenshot QA: passed for revised coded visuals at 390px and Tensor Block at 320px through the in-app browser review route. In-app automation could navigate and screenshot review routes, but did not activate bottom-nav buttons reliably, so live Journey interaction screenshots remain a manual follow-up.

### Screenshots

- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-inference-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-prompt-response-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-tokenization-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-token-ids-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-embeddings-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-vectors-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-tensors-390.png`
- `docs/stage-audits/v0-19-morning-commute/screenshots/v0-19-1-visual-tensors-320.png`

## v0.18.7 Glossary Dojo V1

### What Changed

- Bumped the visible app version to `v0.18.7`.
- Added Glossary Dojo, a mobile-first 12-question Play activity for practicing glossary terms, definitions, relationships, common mix-ups, and learning-neighborhood connections.
- Added a small metadata overlay in `src/data/glossaryDojoMeta.ts` while keeping `src/data/content.ts` as the glossary source of truth.
- Added Dojo-specific storage at `promptlife.glossaryDojo.v1` for rounds completed, questions answered, recent mistakes, per-term practice, and current-round resume.
- Included the Dojo storage key in the app-wide Start over/debug clear path so Prompt Life reset does not leave Dojo practice behind.
- Added entry points from Play (`Glossary Dojo`) and Glossary (`Practice 12 terms`) without adding a new badge insight, changing Journey progress, or modifying checkpoint randomization rules.
- Reused the existing seeded choice-order helper for stable randomized answer order per built question.
- Added `docs/play/GLOSSARY_DOJO_V1.md`.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA: passed for Play entry, Glossary entry, 12-question round start, incorrect feedback, correct feedback, hard-reload resume via the Play card, round summary, Dojo reset/restart, Badge stats unchanged, and 320px/390px/430px mobile overflow checks. At 320px, the feedback and Next action were scrolled into view and confirmed above the dock.
- Accessibility QA: native buttons, visible focus styles, logical order, status feedback, and non-color text labels were verified. The in-app browser automation focused the Start button, but its keypress command did not activate native button controls, so manual keyboard activation remains a human spot check before v1.
- Blocked-storage fallback is implemented in `storage.ts`; browser simulation was not practical in this environment because the in-app browser read-only scope does not expose storage mutation and the repo does not include standalone Playwright.

### Screenshots

- `docs/play/screenshots/v0-18-7-play-glossary-dojo-card-full-390.png`
- `docs/play/screenshots/v0-18-7-dojo-question-390.png`
- `docs/play/screenshots/v0-18-7-dojo-wrong-feedback-390.png`
- `docs/play/screenshots/v0-18-7-dojo-correct-feedback-390.png`
- `docs/play/screenshots/v0-18-7-dojo-resumed-from-play-390.png`
- `docs/play/screenshots/v0-18-7-dojo-feedback-action-320.png`
- `docs/play/screenshots/v0-18-7-dojo-summary-390.png`
- `docs/play/screenshots/v0-18-7-glossary-practice-entry-390.png`
- `docs/play/screenshots/v0-18-7-dojo-reset-start-390.png`

## v0.18.6 Loss Glossary Repair

### What Changed

- Bumped the visible app version to `v0.18.6`.
- Added `Loss` to the Rationalists vs Empiricists key-term chips because the Rules and Learned Patterns visual introduces the term there.
- Improved the Loss glossary entry with a learner-friendly definition, relationship, metaphor, Brain Bridge, limit, confusion warning, and related terms.
- Moved Loss earlier in Glossary Learning path sorting so it first appears with Rationalists vs Empiricists, where it is first introduced meaningfully.
- Updated the Rules and Learned Patterns visual caption/callout copy to explain loss as the training signal that measures prediction error.
- Left Journey order, progress logic, checkpoint randomization, generated images, dependencies, and badge logic unchanged.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA: passed at 390px and 320px. Loss appears in the collapsed Rationalists vs Empiricists key-term chips, the Loss drawer explains the term clearly, Glossary A-Z and Learning path both include Loss, Learning path introduces it at Rationalists vs Empiricists, no 320px chip overflow was detected, and two fresh sessions showed different checkpoint answer orders.

### Screenshots

- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-history-loss-chip-390.png`
- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-history-loss-chip-320.png`
- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-history-visual-loss-callout-390.png`
- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-loss-drawer-390.png`
- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-glossary-az-loss-390.png`
- `docs/stage-audits/v0-17-before-morning/screenshots/v0-18-6-glossary-learning-loss-390.png`

## v0.19 Morning Commute Stage Audit

### What Changed

- Added a documentation-only audit package at `docs/stage-audits/v0-19-morning-commute/`.
- Inventoried the current Morning Commute cards: Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- Captured 91 mobile screenshots, including 390px card sections and 320px/430px spot checks for dense Vectors/Tensors content.
- Added a machine-readable `stage-audit.json`, source-backed `card-inventory.md`, `recommendations.md`, `screenshot-index.md`, and an internal PDF report source.
- Left live curriculum, Journey ordering, progress rules, checkpoint randomization, generated PNG assets, dependencies, and badge logic unchanged.

### Findings

- Current order is sound: Inference should stay before Prompt vs Response, followed by Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- Vectors and Tensors are the highest-priority repair targets because they are accurate but abstract.
- Prompt vs Response is not redundant with Autoregression: this card teaches given-versus-generated roles; Autoregression should teach the repeated generation loop.
- Embeddings is the best future textless Image 2 candidate if Morning Commute gets a generated asset; Prompt vs Response, Tokenization, Token IDs, Vectors, and Tensors should remain coded SVG/HTML or CSS.
- Tensors is the strongest lightweight CSS 3D candidate; no heavy 3D library is recommended.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Browser QA: passed for Home generated assets, Before Morning generated assets in the review route, Where LLMs Fit taxonomy visual in the review route, and Morning Commute Preview/Review lesson screenshots.

## v0.18.5 Home Pillar Chip Alignment

### What Changed

- Bumped the visible app version to `v0.18.5`.
- Updated the Home `Prompt Life pillars` chips to use a fixed icon lane and flexible label lane.
- Kept each pill icon at the same left inset so `Definitions`, `Relationships`, and `Metaphors` align consistently.
- Allowed the Home pillar row to switch from two columns at 390px to stacked full-width chips at 320px.
- Left Home copy, generated Home assets, Journey cards, progress logic, badge logic, dependencies, and checkpoint behavior unchanged.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: passed at 390px and 320px. Each pillar icon measured `10.9px` from its pill left edge, `Relationships` did not overflow, there was no horizontal overflow, and no console errors were reported.

## v0.18.4 Home Generated Asset Integration

### What Changed

- Bumped the visible app version to `v0.18.4`.
- Replaced the Home hero fallback illustration with `public/assets/generated/home/home-hero-prompt-cloud.png`.
- Replaced the Home logo mark with `public/assets/generated/home/promptlife-mark.png`.
- Pointed the favicon, Apple touch icon, and web manifest icon at the generated mark.
- Kept Home labels, copy, alt text, and captions in app code; no text was added to the PNGs.
- Kept the previous Home art as image-load fallback behavior for the generated Home assets.
- Updated `src/data/visualAssets.ts` so the Home assets are marked as integrated.
- Left Journey cards, progress logic, badge logic, dependencies, and checkpoint behavior unchanged.

### Final Home Copy

- Eyebrow: `A DAY IN THE LIFE OF A PROMPT`
- Title: `Prompt Life`
- Tagline: `Demystifying LLMs in the AI era through clear explanations, useful metaphors, and a little play.`
- Big idea: `An LLM is not a mind, a database, or magic. It is a learned prediction system that turns context into likely next tokens.`

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: passed at 390px and 320px. The generated Home hero and mark loaded from `assets/generated/home/`, there was no horizontal overflow, the standalone Home subhead stayed absent, and no console errors were reported.

## v0.18.3 Home Subhead Removal

### What Changed

- Bumped the visible app version to `v0.18.3`.
- Removed the standalone Home subhead line `Demystifying LLMs` after browser review.
- Kept `Demystifying LLMs` in the Home tagline so the mission language remains present without repeating.
- Left Journey progress rules, badge logic, lesson order, dependencies, and checkpoint behavior unchanged.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: passed at 390px and 320px with the standalone subhead absent and no horizontal overflow.

## v0.18.2 Home Hero Refinement

### What Changed

- Bumped the visible app version to `v0.18.2`.
- Revised the Home hero copy to foreground `Demystifying LLMs`.
- Replaced the Home tagline phrase `clear mechanics` with `clear explanations`.
- Reframed the Home hero logo into a cleaner square mark container for future logo/fav icon asset swaps.
- Wrapped the existing prompt-cloud Home illustration in a deeper, stable visual slot so it better matches the generated Before Morning asset direction.
- Added planned Home asset references for `public/assets/generated/home/home-hero-prompt-cloud.png` and `public/assets/generated/home/promptlife-mark.png`.
- Added a standard favicon link to the existing square Prompt Life mark.
- Kept Journey progress rules, badge logic, lesson order, dependencies, and checkpoint behavior unchanged.

### Final Home Copy

- Eyebrow: `A DAY IN THE LIFE OF A PROMPT`
- Title: `Prompt Life`
- Prominent subhead: `Demystifying LLMs`
- Tagline: `Demystifying LLMs in the AI era through clear explanations, useful metaphors, and a little play.`
- Big idea: `An LLM is not a mind, a database, or magic. It is a learned prediction system that turns context into likely next tokens.`

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: passed at 390px and 320px with no horizontal overflow, no console errors, and the Big Idea panel visible as the first screen scrolls.

## v0.18.1 Where LLMs Fit Visual Repair

### What Changed

- Bumped the visible app version to `v0.18.1`.
- Replaced the `Where LLMs Fit` folded topology-map visual with a clean vertical taxonomy tree.
- Removed numbered seals and tangled/crossing connector paths from the `ai-family-tree` visual.
- Replaced compressed diagram labels such as `ML`, `Gen AI`, `Other`, and `Multi` with beginner-friendly labels.
- Kept the visual coded SVG/HTML; no generated PNG asset or dependency was added.
- Updated the `ai-topology` tiny interaction from a flat branch grid to a tap-through taxonomy tree with selected-node highlighting.
- Added `docs/stage-audits/v0-17-before-morning/WHERE_LLMS_FIT_VISUAL_REPAIR_V0_18_1.md`.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; checkpoint randomization remains intact.
- Browser QA: passed at 390px and 320px for the lesson visual, interaction, review visual-aid route, Badge version, and console errors.

### Constraints Preserved

- No new Journey cards, games, generated PNG assets, dependencies, checkpoint-randomization changes, progress-rule changes, or extra badges were added.
- One badge remains: `Prompt Life: Model Literate`.

## v0.18.0 DiagramKit + Illustration Clarity Foundation

### What Changed

- Bumped the visible app version to `v0.18.0`.
- Added `src/components/DiagramKit.tsx` with reusable coded SVG/HTML primitives for Prompt Life teaching diagrams.
- Added DiagramKit styles and a primitive gallery to `/review/visual-aids`.
- Refactored the coded Before Morning visuals for `Where LLMs Fit`, `Rationalists vs Empiricists`, `Training`, and `Overfitting and Generalization`.
- Kept the generated PNG-backed visuals for `What Is an LLM?`, `Pretraining`, `Fine-Tuning`, and `Alignment` unchanged.
- Added `docs/design/DIAGRAM_KIT_V0_18.md`, `docs/curriculum/TINY_INTERACTION_TRIAGE_V0_18.md`, and `docs/stage-audits/v0-17-before-morning/DIAGRAM_KIT_REFACTOR_V0_18.md`.

### Dependency Decision

- No dependencies were added. The diagrams use local React/SVG components rather than D3, icon packages, generated PNGs, or 3D libraries.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser smoke checks: main app, lesson review, visual-aid review, and Badge version render with no console errors.

### Bundle Impact

- Local production CSS increased from 68.76 kB to 73.47 kB raw, and from 15.00 kB to 15.97 kB gzip.
- Local production JS increased from 630.81 kB to 638.93 kB raw, and from 170.95 kB to 173.88 kB gzip.

### Constraints Preserved

- No new Journey cards, games, generated PNG assets, checkpoint-randomization changes, progress-rule changes, heavy 3D libraries, or extra badges were added.
- One badge remains: `Prompt Life: Model Literate`.

## v0.17.5 Bottom Nav Icon Legibility Pass

### What Changed

- Bumped the visible app version to `v0.17.5`.
- Increased the bottom navigation icons from `1.3rem` to `1.95rem`, a 50% size increase.
- Raised the bottom navigation button height so larger icons do not crowd the labels.
- Updated the internal style-guide bottom-nav mock to match the live navigation.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- Browser QA at 390px: bottom nav icons are visibly larger and labels remain readable.
- PDF report generated: `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-5-bottom-nav-icons-report.pdf`.

### GitHub Pages Cache Note

When testing deployed visual assets or navbar updates on iPhone/GitHub Pages, use a cache-busting query such as `?v=0175`, or clear site data if an old bundle is cached.

## v0.17.4 Visual Loading + Key Terms Collapse Pass

### What Changed

- Bumped the visible app version to `v0.17.4`.
- Added a base-aware public asset helper so generated Before Morning PNG paths work in local dev and GitHub Pages builds under `/promptlife/`.
- Updated the generated visual asset registry to use the helper for all four textless PNGs.
- Added a reusable `KeyTermsChips` lesson panel that appears after the visual aid, shows glossary chips in at most two rows by default, and supports `Show all terms` / `Show fewer` with `aria-expanded`.
- Prioritized the `Where LLMs Fit` chip display order so the highest-value terms appear first before overflow.
- Kept `Where LLMs Fit` on the coded SVG/HTML visual aid `ai-family-tree`; no generated PNG was added for it.
- Refined the generated-image fallback message to: `Visual asset unavailable. The callouts below still explain the concept.`
- Compacted the lesson-stage timeline under 340px so the visual aid appears in the first mobile viewport sooner.

### GitHub Pages Cache Note

When testing deployed visual assets on iPhone/GitHub Pages, use a cache-busting query such as `?v=0174`, or clear site data if an old bundle is cached.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser QA: passed for generated images, Key terms collapse/expand, the coded AI family tree, visual gallery, local dev, mounted Pages-style preview, and generated-asset 404 checks.
- PDF report generated: `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-4-visual-loading-key-terms-report.pdf`.

### Constraints Preserved

- No new Journey cards, games, generated assets, progress-rule changes, checkpoint-randomization changes, or extra badges were added.
- One badge remains: `Prompt Life: Model Literate`.

## v0.17.3 Before Morning Generated Asset Integration Pass

### What Changed

- Bumped the visible app version to `v0.17.3`.
- Added a generated visual-asset registry for the four provided textless Before Morning PNGs.
- Replaced the coded base visuals for `What Is an LLM?`, `Pretraining`, `Fine-Tuning`, and `Alignment` with the provided textless PNGs plus HTML callouts, captions, key takeaways, alt text, and accessible descriptions.
- Kept the `Where LLMs Fit` AI family tree as coded SVG/HTML; no new cards, games, badges, heavy 3D libraries, or checkpoint-randomization changes were added.
- Updated the visual-aid review gallery so each generated asset lists filename, path, visual type, alt text, text-handling note, and mobile/PDF review guidance.
- Updated Before Morning internal docs and screenshot index for the v0.17.3 asset pass.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser QA: passed for the four generated visual-aid lessons at 390px, Alignment at 320px, the visual-aid gallery, Learn-mode smoke test, Badge version, and console errors.
- PDF report generated: `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-3-generated-asset-integration-report.pdf`.

### Constraints Preserved

- No images were generated in this pass; only the four provided PNG files were integrated.
- No new Journey cards, games, checkpoint randomization changes, progress-rule changes, heavy 3D libraries, or extra badges were added.
- One badge remains: `Prompt Life: Model Literate`.

## v0.17.2 Before Morning Topology Card Pass

### What Changed

- Bumped the visible app version to `v0.17.2`.
- Added the new Essential Journey card `Where LLMs Fit` immediately after `What Is an LLM?` and before `Rationalists vs Empiricists`.
- Added a coded SVG / HTML visual aid, `ai-family-tree`, using a sparse AI family-tree structure with HTML callouts rather than a dense mini-infographic or generated PNG.
- Added the `ai-topology` tiny interaction so learners can tap branches such as AI, machine learning, deep learning, generative AI, LLM, diffusion, and multimodal AI.
- Updated the opening `What Is an LLM?` relationship line so it leads into the topology card before the history side-tour.
- Added or updated glossary terms for `AI`, `machine learning`, `classical machine learning`, `deep learning`, `generative AI`, `LLM`, `diffusion model`, `multimodal AI`, `symbolic AI`, `rule-based AI`, and `foundation model`.
- Updated glossary learning-path order so the topology terms appear with `Where LLMs Fit`.
- Updated internal lesson-review metadata for the new card.

### Verification

- `npm run typecheck`: passed.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions. The new `Where LLMs Fit` checkpoint is randomized.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA: passed for Journey order, Preview mode, Review visual-aid route, Learn-mode smoke test, glossary learning path, Badge version, and console errors.
- PDF report generated: `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-2-where-llms-fit-report.pdf`.

### Constraints Preserved

- No generated PNG assets were added.
- No new games, heavy 3D libraries, checkpoint-randomization changes, or additional badges were added.
- One badge remains: `Prompt Life: Model Literate`.

## v0.17.1 Before Morning Implementation Pass

### What Changed

- Bumped the visible app version to `v0.17.1`.
- Removed the duplicate visible `Core idea` heading after the `CORE IDEA` pill on lesson cards.
- Removed repeated path-label chips from individual Journey rows while keeping Journey filters and stage context.
- Revised the first seven Before Morning cards for clearer mobile-first teaching:
  - What Is an LLM now uses the canonical prompt trace and `floor` next-token example.
  - Rationalists vs Empiricists now sorts rules, learned patterns, and hybrid system pieces.
  - Training foregrounds predict, compare, loss, update weights, repeat.
  - Pretraining now separates large-scale pattern learning from perfect recall.
  - Overfitting now emphasizes held-out examples and generalization.
  - Fine-Tuning now contrasts durable training with prompting, RAG, and sampling.
  - Alignment now groups durable shaping, runtime steering, and evaluation.
- Added/refined Before Morning exercises in `src/data/exercises.ts` for internal lesson architecture review.
- Added `docs/stage-audits/v0-17-before-morning/IMAGE_ASSET_PLAN.md` for four future textless Image 2 assets without generating PNGs.
- Added `docs/stage-audits/v0-17-before-morning/IMPLEMENTATION_REPORT_V0_17_1.md` and v0.17.1 screenshots.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 67 total audited surfaces, 45 randomized, 22 fixed-order exclusions.
- Browser QA at 390px verified Journey cleanup, revised Before Morning interactions, checkpoint randomization behavior, Badge version placement, and no console errors.
- Browser QA at 320px verified Alignment interaction wrapping.

### Known Issues

- The existing Vite large-chunk warning remains.
- The planned Image 2 assets are still future work; v0.17.1 only adds the asset plan.

## v0.17 Before Morning Stage Audit

### What Changed

- Created the internal audit package at `docs/stage-audits/v0-17-before-morning/`.
- Audited all seven Before Morning cards without changing live curriculum, progress rules, games, or checkpoint randomization.
- Captured 390px screenshots for Journey stage views and every Before Morning card section, including checkpoint feedback where easy.
- Added 320px and 430px dense-card spot checks.
- Created a machine-readable `stage-audit.json` for later Deep Research and implementation planning.
- Added an internal PDF report wrapping the response summary and representative screenshots.

### Cards Audited

- What Is an LLM?
- Rationalists vs Empiricists
- Training
- Pretraining
- Overfitting and Generalization
- Fine-Tuning
- Alignment

### Key Findings

- The stage order is sound and should stay mostly intact.
- `CORE IDEA` plus `Core idea` is duplicated on every lesson and should be cleaned up in a later UI polish pass.
- Training and Pretraining should stay separate, but their visuals/interactions need clearer distinction.
- Fine-Tuning needs a stronger tiny interaction contrasting durable training with prompting, RAG, and sampling.
- Alignment needs the same nuance with less text density, likely through visual grouping and a misconception check.

### Verification

- `npm install`: up to date, no vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; checkpoint randomization remains intact.
- Browser QA: captured required mobile screenshots at 390px plus 320px and 430px spot checks.

### Known Issues

- The Vite large-chunk warning remains.
- Some correct checkpoint answers can still land in position A for a specific local seed; this is expected under stable randomization.
- Screenshots were captured from the current local progress state, with Pretraining as the current Learn card.

## v0.16.1 Checkpoint Randomization + Assessment Integrity

### What Changed

- Bumped visible app version to `v0.16.1`.
- Added stable per-device answer randomization for Journey checkpoints.
- Added stable per-device answer randomization for `tap-choice` and `next-token-pick` exercises, including Prompt Run single-choice steps.
- Added `src/utils/choiceOrder.ts` for deterministic seeded shuffling.
- Added `npm run audit:answers` for internal answer-position QA.
- Updated Badge Start over copy to note that reset clears the checkpoint answer order seed.

### Files Changed

- `package.json`
- `scripts/audit-answers.mjs`
- `src/components/ExerciseSystem.tsx`
- `src/main.tsx`
- `src/styles/global.css`
- `src/utils/choiceOrder.ts`
- `docs/curriculum/CHECKPOINT_RANDOMIZATION_AUDIT_V0_16_1.md`
- `docs/curriculum/CHECKPOINT_RANDOMIZATION_V0_16_1.md`

### Randomization Strategy

- Store a local seed at `promptlife:v1:choiceOrderSeed`.
- Combine seed plus question identity, then apply deterministic Fisher-Yates shuffle.
- Store selected Journey checkpoint answers by stable choice ID, not visible position.
- Keep order stable across re-renders, feedback reveal, Preview, Review, and Learn mode.

### Exclusions

- `drag-order`, `sort-buckets`, `drag-match`, `label-tokens`, `connect-nodes`, `toggle-state`, and `tap-multiple` stay fixed.
- Reason: authored order, sequence, grouping, matching, or token position supports the learning objective.

### QA Results

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.
- Audit result: 61 total surfaces, 45 randomized, 16 fixed-order exclusions. First correct answer positions after audit-seed shuffle: position 1 = 9, position 2 = 19, position 3 = 9, position 4 = 8.
- Browser QA at 390px: passed for Learn, Preview, Review, Prompt Run single-choice exercise behavior, and Badge reset/version copy.

### Known Issues

- The Vite bundle still emits the existing large-chunk warning.
- The shuffle is intentionally not cryptographic; it is for assessment integrity and stable learning behavior.

### Next Recommended Steps

- Add a small regression test around the shuffle helper.
- Consider an internal visual answer-order review route if future review passes need it.
- Revisit multi-select randomization only if user testing shows authored grouping creates bias.

## v0.16 Source Review + Late-Day Copy Discipline

### What Changed

- Added an internal source registry in `src/data/sourceRegistry.ts`.
- Added source status, source IDs, source titles, and caveat notes to the internal `/review/lesson-cards` route.
- Tightened Midnight Ledger and New Dawn learner-facing copy so claims are careful, humane, and source-aware.
- Added or improved glossary terms for source review, environmental footprint, e-waste, and accountability.
- Bumped visible Badge version to `v0.16.0`.
- Added docs:
  - `docs/curriculum/SOURCE_REGISTRY_V0_16.md`
  - `docs/curriculum/SOURCE_REVIEW_V0_16.md`
  - `docs/curriculum/V0_16_CHANGE_LOG.md`

### Files Changed

- `src/data/content.ts`
- `src/data/sourceRegistry.ts`
- `src/main.tsx`
- `docs/REVIEW_NOTES.md`
- `docs/curriculum/SOURCE_REGISTRY_V0_16.md`
- `docs/curriculum/SOURCE_REVIEW_V0_16.md`
- `docs/curriculum/V0_16_CHANGE_LOG.md`

### Cards Reviewed

- Collective Intelligence, Extracted
- Costs We Must Count
- Risk vs Myth
- Benefits Worth Taking Seriously
- Human-Centered AI
- Better AI Is a Choice
- Effective Prompting from Model Literacy
- Model Literate Synthesis

### Claims Softened Or Removed

- Replaced broad consent/compensation language with disputed provenance, consent, transparency, attribution, and compensation wording.
- Replaced broad infrastructure-cost language with scoped variation by model, workload, hardware, cooling, region, electricity source, and deployment.
- Reframed benefits into demonstrated or commonly observed, plausible, and speculative tiers.
- Replaced "costs are real but not inevitable" with "costs are real and shaped by choices."
- Added explicit non-guarantee language for mitigation choices.

### Source Registry Status

- Governance and risk sources reviewed: NIST AI RMF, NIST Generative AI Profile, UNESCO, OECD, EU AI Act, Council of Europe framework convention.
- Human-centered / Catholic sources reviewed: Laudato Si', Dignitas Infinita, Antiqua et nova, Rome Call for AI Ethics, and Pope Leo XIV's Magnifica Humanitas.
- Environmental sources reviewed: IEA Energy and AI and UNU-INWEH Environmental Cost of AI's Energy Use.
- Labor and copyright sources reviewed: U.S. Copyright Office AI initiative, ILO generative AI jobs update, and OECD regional GenAI jobs report.

### Learner-Facing Copy Changes

- No citations were added to ordinary Journey cards.
- No precise environmental statistics were added.
- No unverified papal encyclical claim was added.
- Source flags appear only in internal review places.

### Source-Needed Items

- Current, jurisdiction-aware sources for data provenance, consent, attribution, licensing, and compensation.
- Task-specific benefit evidence for accessibility, translation, summarization, tutoring, research triage, administrative drafting, and scientific workflows.
- Education/workplace evidence for deskilling and authentic-learning risks.
- Any future standalone Prompt Injection / Tool Risk card.

### Verification

- Baseline `npm install`: passed.
- Baseline `npm run typecheck`: passed.
- Baseline `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run typecheck`: passed.
- Final `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 390px: passed for Midnight Ledger, New Dawn, revised lesson previews, internal source-review fields, glossary drawer, Journey filters, Preview/Review/Learn modes, and Journey bottom-nav return-to-top.
- Source/copy scans: passed. No learner-facing precise energy/water statistics, unverified papal AI-encyclical claim, or internal source labels appear outside the review route.
- Screenshots and wrapped response PDF are tracked in `docs/curriculum/prompt-life-v0-16-source-review-report.pdf`.

### Next Recommended Steps

- Add source citations to a review-only source page if the internal review route becomes crowded.
- Do a focused source pass for the benefits card once target domains are chosen.
- Consider a separate security pass for Prompt Injection / Tool Risk.

## v0.15.1 Navigation Polish

### What Changed

- Journey bottom nav now always returns to the top of the Journey screen.
- The Home Journey action uses the same top-of-Journey path.
- Added a shared app-shell top scroll helper and a Journey-specific top helper.
- Bumped visible Badge version to `v0.15.1`.

### Behavior Notes

- Stage links still scroll to specific Journey sections.
- The lesson card Return to Journey action still returns near the lesson's section.
- Preview, Review, and Learn progress behavior is unchanged.
- Reduced-motion preference is still respected.

### Verification

- `npm install`: passed.
- Baseline `npm run typecheck`: passed.
- Baseline `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run typecheck`: passed.
- Final `npm run build`: passed with the existing Vite large-chunk warning.
- Browser QA at 390px verified Home, Journey, Play, Glossary, Badge, Preview, Review, Learn, and stage-link paths.
- 320px isolated browser capture verified Journey top, all eight stage buttons, and no document or stage overflow.
- Screenshots and the wrapped response PDF are tracked in `docs/curriculum/prompt-life-v0-15-1-navigation-polish-report.pdf`.

## v0.15 Journey Narrative Architecture

### What Changed

- Replaced the old six-section Journey architecture with eight time-of-day sections:
  - Before Morning
  - Morning Commute
  - Workday
  - Decision Room
  - The Day Repeats
  - Twilight: The Wider Landscape
  - Midnight Ledger
  - New Dawn
- Split the former broad Wider AI Literacy group into Twilight, Midnight Ledger, and New Dawn.
- Reordered the existing late-Journey lesson blocks so Learn mode and Next Lesson follow the new narrative sequence.
- Added clickable stage links on the Journey screen.
- Added the hint: `Jump to a stage of the prompt's day.`
- Updated Journey filter helper copy for the new full-day metaphor.
- Updated Glossary Learning path grouping to use the new eight section names.
- Bumped visible Badge version to `v0.15.0`.
- Added docs:
  - `docs/curriculum/JOURNEY_SECTION_RESTRUCTURE_V0_15.md`
  - `docs/curriculum/V0_15_CHANGE_LOG.md`

### Behavior Notes

- Stage links are real buttons and scroll inside the app shell to visible Journey sections.
- Under filters, empty sections and their stage links are hidden so jumps do not point to missing sections.
- Preview, Review, and Learn modes keep the v0.14 behavior.
- Returning from a Preview or Review lesson returns to Journey near that lesson's section when possible.
- No new lessons, games, generated image assets, or heavy libraries were added.

### Verification

- `npm install`: passed.
- Baseline `npm run typecheck`: passed.
- Baseline `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run typecheck`: passed.
- Final `npm run build`: passed with the existing Vite large-chunk warning.
- Final `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 320, 390, and 430px: passed with no horizontal overflow in Journey All, Essential, Deep, or Ethics filters.
- Browser QA verified section jumps to Twilight, Midnight Ledger, and New Dawn; Ethics filter hides empty section links; Glossary Learning path shows the new section groups; Preview mode from New Dawn returns near the originating section.
- Screenshots and the wrapped response PDF are tracked in `docs/curriculum/prompt-life-v0-15-journey-narrative-report.pdf`.

## v0.14 Glossary And Journey Path Clarity

### What Changed

- Added Glossary sorting:
  - `A-Z`
  - `Learning path`
- Made `A-Z` the default Glossary order.
- Added learning-path section grouping and first-introduced lesson metadata.
- Added `Open lesson` from the glossary drawer.
- Added Journey filters: All, Essential, Deep, Ethics.
- Re-labeled existing Journey path types so Essential is a shorter 27-card path, with 5 Deep cards and 6 Ethics cards.
- Bumped visible Badge version to `v0.14.0`.
- Added docs:
  - `docs/curriculum/GLOSSARY_ORDERING_V0_14.md`
  - `docs/curriculum/JOURNEY_PATH_FILTERS_V0_14.md`
  - `docs/curriculum/V0_14_CHANGE_LOG.md`

### Behavior Notes

- Glossary search works in both sort modes.
- Glossary sort preference is intentionally not stored; it resets to `A-Z`.
- Completed lessons opened from the drawer use Review mode.
- Incomplete/future lessons opened from the drawer use Preview mode.
- Journey filters do not change progress, completion, or badge state.

### Verification

- `npm install`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 320, 390, and 430px: passed with no horizontal overflow in the new Glossary and Journey filter states.
- Glossary drawer lesson links were verified in both Preview and Review modes.
- Screenshots and the wrapped response PDF are tracked in `docs/curriculum/prompt-life-v0-14-glossary-journey-report.pdf`.

## v0.13 Whole Journey Review And Content Freeze Candidate

### What Changed

- Added dedicated Journey cards for Grounding and Hallucinations after RAG and Retrieval.
- Added coded visual aids for `grounding-evidence` and `hallucination-bridge`.
- Added glossary term `Citation`.
- Bumped visible Badge version to `v0.13.0`.
- Expanded `/review/lesson-cards` with path labels, keep/revise/defer recommendations, source-needed flags, visual-needed flags, and core objective fields.
- Fixed mobile scrolling on standalone review routes so `/review/lesson-cards` and `/review/visual-aids` can be inspected beyond the first viewport.
- Created whole-Journey review and content-freeze candidate docs:
  - `docs/curriculum/JOURNEY_REVIEW_V0_13.md`
  - `docs/curriculum/CONTENT_FREEZE_CANDIDATE_V0_13.md`
  - `docs/curriculum/SOURCE_REVIEW_PLAN_V0_13.md`
  - `docs/curriculum/V0_13_CHANGE_LOG.md`

### Curriculum Decision

- RAG remains a dedicated Journey card after Context Window.
- Grounding and Hallucinations now appear as dedicated concise cards after RAG and before How AI Learns / wider risk literacy.
- v1 should use a three-path model: Essential Mechanics, Deep Model Literacy, and Ethics/Society.
- Ethics, environmental, labor, copyright, governance, and benefit claims need source review before publication-ready v1 language.

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- Browser QA at 390px verified Journey placement, Grounding preview mode, glossary term presence, Badge version placement, review-route metadata, and review-route scrolling.
- Screenshots are tracked in the v0.13 PDF implementation report.

## v0.12 Wider AI Literacy Implementation And UX Repair

### What Changed

- Implemented the v0.11 Wider AI Literacy plan as eight draft Journey cards:
  1. The Perfect Storm
  2. Collective Intelligence, Extracted
  3. Benefits Worth Taking Seriously
  4. Costs We Must Count
  5. Human-Centered AI
  6. Better AI Is a Choice
  7. Effective Prompting from Model Literacy
  8. Model Literate Synthesis
- Added Learn, Preview, and Review behavior to Journey cards.
- Journey now shows all cards in sequence with global numbering plus Start/Continue/Preview/Review actions and Essential/Deep/Ethics path labels.
- Preview mode shows "Previewing this card. Progress will not change." and never completes the card.
- Review mode shows "Reviewing a completed card." and never double-counts progress.
- Preview/Review actions say "Return to Journey."
- Improved scroll-to-top behavior by including lesson mode in the existing internal `.pl-shell` scroll/focus effect.
- Updated the Badge criterion to focus on enough Essential checkpoints, Prompt Run completion, and Model Literate Synthesis completion.
- Added coded placeholder visual aids for all eight Wider AI cards.
- Expanded glossary terms for Wider AI origins, benefits, costs, human-centered AI, governance, responsible AI, effective prompting, uncertainty, and model literacy.
- Bumped the visible Badge version to `v0.12.0`.

### Files Changed

- `src/main.tsx`
- `src/data/content.ts`
- `src/components/VisualAids.tsx`
- `src/styles/global.css`
- `docs/curriculum/WIDER_AI_IMPLEMENTATION_REPORT_V0_12.md`
- `docs/curriculum/WIDER_AI_SOURCE_NEEDS_V0_12.md`
- `docs/design/GENERATED_VISUAL_ASSET_PLAN_V0_11.md`
- `docs/REVIEW_NOTES.md`
- `docs/screenshots/v0-12-*.png`
- `docs/curriculum/prompt-life-v0-12-wider-ai-implementation-report.html`
- `docs/curriculum/prompt-life-v0-12-wider-ai-implementation-report.pdf`

### Contrast Notes

- Primary buttons now keep white text on a dark indigo/teal gradient instead of bright teal/amber.
- Active stage markers and completion dots now use dark ink on bright teal.
- Journey path/action chips use dark ink on paper surfaces.
- Preview/Review notices use dark text on light paper.
- Patched visual labels on light diagram boxes where inherited white text could reduce readability.
- Remaining follow-up: older concept animation panels are readable but still use the pre-v0.10 deep-blue animation style and should be migrated in a later animation-focused pass.

### Source Needs

- Added `docs/curriculum/WIDER_AI_SOURCE_NEEDS_V0_12.md`.
- No precise environmental, labor, copyright, governance, or benefit statistics were added to learner-facing UI.
- No learner-facing `SOURCE NEEDED` copy was added.

### Verification

- `npm install`: passed before implementation.
- `npm run typecheck`: passed before and after implementation.
- `npm run build`: passed before and after implementation.
- Browser QA verified Preview, Review, Learn completion, Next Lesson, Return to Journey, focus, and top-scroll behavior.
- Screenshots were captured for the new Wider AI Journey section, Review mode, representative Preview cards, and the visual-aid gallery.

### Known Issues / TODO

- Grounding and Hallucinations are still glossary/RAG concepts, not dedicated Journey cards. TODO: decide whether to add dedicated cards before or near Risk vs Myth.
- Wider AI cards are draft curriculum copy and need source review before being treated as cited publication material.
- Generated PNG assets remain planned only.
- Vite reports a single-chunk size warning after build; no heavy dependency was added, but route/code splitting may be useful later.

## v0.11 Wider AI Literacy Planning

### What Changed

- Planned a new Wider AI Literacy expansion that extends Prompt Life from model mechanics into AI origins, extracted collective intelligence, benefits, costs, human-centered judgment, responsible design choices, effective prompting, and synthesis.
- Created `docs/curriculum/WIDER_AI_LITERACY_EXPANSION_V0_11.md` with eight proposed cards:
  1. The Perfect Storm
  2. Collective Intelligence, Extracted
  3. Benefits Worth Taking Seriously
  4. Costs We Must Count
  5. Human-Centered AI
  6. Better AI Is a Choice
  7. Effective Prompting from Model Literacy
  8. Model Literate Synthesis
- Created `docs/curriculum/WIDER_AI_SOURCE_NEEDS_V0_11.md` with placeholder-based source needs for environmental footprint, energy, water, data provenance, copyright, labor disruption, deskilling, education impacts, benefits, human-centered AI, Vatican/Catholic sources, and secular governance sources.
- Created `docs/design/GENERATED_VISUAL_ASSET_PLAN_V0_11.md` for future textless generated image assets in the ZenTron Origami style.
- Created an internal PDF report at `docs/curriculum/prompt-life-v0-11-wider-ai-literacy-planning-report.pdf`.
- Kept this pass documentation-only: no Journey cards implemented, no games added, no generated PNG app assets added, no heavy 3D libraries added, and no learner-facing PDF features added.

### Files Changed

- `docs/curriculum/WIDER_AI_LITERACY_EXPANSION_V0_11.md`
- `docs/curriculum/WIDER_AI_SOURCE_NEEDS_V0_11.md`
- `docs/curriculum/prompt-life-v0-11-wider-ai-literacy-planning-report.html`
- `docs/curriculum/prompt-life-v0-11-wider-ai-literacy-planning-report.pdf`
- `docs/design/GENERATED_VISUAL_ASSET_PLAN_V0_11.md`
- `docs/REVIEW_NOTES.md`

### Proposed Cards

- `The Perfect Storm`: explains why LLMs arrived now through data, compute, algorithms, human labor, and incentives.
- `Collective Intelligence, Extracted`: names the human-created cultural and creative traces behind model capability.
- `Benefits Worth Taking Seriously`: separates demonstrated, plausible, and speculative benefits.
- `Costs We Must Count`: counts physical, social, cultural, and ethical costs without inventing statistics.
- `Human-Centered AI`: centers dignity, learning, responsibility, creativity, relationships, and common good.
- `Better AI Is a Choice`: frames design, policy, governance, and incentives as changeable.
- `Effective Prompting from Model Literacy`: shows prompting as context shaping, not magic wording or weight change.
- `Model Literate Synthesis`: ties mechanics and human consequences into a final teach-back.

### Proposed Visual Assets

- `perfect-storm`
- `collective-intelligence-lantern`
- `benefits-tool-garden`
- `costs-invisible-factory`
- `human-centered-ai-garden`
- `responsible-ai-forked-path`

All generated image assets are specified as textless conceptual art only. Instructional labels and callouts remain HTML/SVG.

### Source Needs

The source-needs document marks claims requiring review before publication, especially environmental footprint, energy/water, data provenance, copyright/compensation, labor, deskilling, education impacts, benefit evidence tiers, human-centered AI, Vatican/Catholic sources, and secular governance sources.

### Verification

- `npm install`: passed, 0 vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- No changes were made to `src/data/content.ts`.
- No Journey cards were implemented.
- No games were added.
- No generated PNG app assets were added.

### Next Recommended Prompt

Implement the v0.11 Wider AI Literacy cards in app data as a draft Journey expansion after RAG/Grounding/Hallucinations and before Risk vs Myth. Do not add games. Use existing `VisualAidCard` patterns first and wait for explicit approval before generating or committing image assets.

## v0.10 Visual Identity Reset

### What Changed

- Created the `ZenTron Origami` visual identity direction: rice-paper calm, neon computational paths, origami/fold cues, and sparse anime-inspired composition.
- Added a full style guide at `docs/design/PROMPT_LIFE_STYLE_GUIDE_V0_10.md`.
- Added implementation notes at `docs/design/STYLE_IMPLEMENTATION_NOTES_V0_10.md`.
- Expanded `src/styles/promptlife.tokens.css` with semantic tokens for color, spacing, radius, shadow, glow, typography, z-index, motion, card depth, paper layers, and backwards-compatible aliases.
- Added the hidden internal review route `/review/style-guide`.
- Updated the app shell with a rice-paper/mist background, faint fold/zen lines, layered paper cards, folded-tab chips, visual-aid paper frames, and a calmer floating paper-glass bottom dock.
- Added visual-aid style variants: `paper-diagram`, `neon-flow`, `origami-object`, `zen-garden-map`, and `retrieval-shelf`.
- Updated the `rag-retrieval` pilot visual to use paper-layer nodes, numbered paper seals, a subtle neon retrieval path, and a context tray.
- Bumped the visible Badge version to `v0.10.0`.
- Captured v0.10 screenshots for the style guide, Home shell, Journey card, RAG pilot, Brain Bridge, and bottom nav.

### Files Changed

- `src/styles/promptlife.tokens.css`
- `src/styles/global.css`
- `src/components/VisualAids.tsx`
- `src/main.tsx`
- `docs/design/PROMPT_LIFE_STYLE_GUIDE_V0_10.md`
- `docs/design/STYLE_IMPLEMENTATION_NOTES_V0_10.md`
- `docs/REVIEW_NOTES.md`
- `docs/screenshots/v0-10-style-guide.png`
- `docs/screenshots/v0-10-home-shell.png`
- `docs/screenshots/v0-10-journey-card.png`
- `docs/screenshots/v0-10-rag-pilot.png`
- `docs/screenshots/v0-10-brain-bridge.png`
- `docs/screenshots/v0-10-bottom-nav.png`

### Style Guide Created

The style guide defines the visual philosophy, design principles, visual feng shui rules, color system, typography roles, shape language, motion language, and policy for 2D/SVG, CSS 3D, and generated images.

### Design Tokens Added

The token file now provides reusable variables for the v0.10 system and keeps older token names such as `--pl-navy`, `--pl-purple`, and `--pl-mint` mapped so existing UI remains stable.

### Style Playground Route Added

`/review/style-guide` includes mobile-width preview sections for color, typography, cards, chips, callouts, Brain Bridge, checkpoint, VisualAid shell, bottom nav mock, lesson hero, glossary drawer, and badge.

### App Shell Changes

The base app now uses a calm paper/mist atmosphere, paper-surface card styling, folded chips, a clipped mist blur behind the bottom dock, and safer scroll padding so the nav does not hide content.

### Pilot RAG Visual Changes

The RAG visual remains conceptually unchanged: RAG is retrieval plus context, not training. The presentation now uses fewer hard rectangles, a retrieval-shelf variant, paper nodes, neon pathing, numbered seals, and HTML callouts below the diagram.

### Build And Typecheck Results

- `npm install`: passed, 0 vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Chrome mobile viewport audit at 320px, 390px, and 430px: no document/body overflow for Home, `/review/style-guide`, or `/review/visual-aids#rag-retrieval`.

### Known Style Issues

- Existing PNG illustration art still reflects earlier MVP style and should be refreshed later.
- Older concept animation panels still use the previous deep-blue animation surface language.
- Only RAG was redesigned as a pilot visual; the variant system is ready but the remaining visual aids still need dedicated art passes.
- Review PDFs remain internal review artifacts, not learner-facing product features.

### Next Recommended Prompt

Apply the v0.10 visual identity to the next high-priority visual cluster: Context Window, Attention, MLP, Hidden States, Logits, Softmax, Sampling, and Autoregression. Keep each visual sparse, mobile-first, and anchored to one focal object.

## v0.9.3 Visual System Reset And RAG Gold Standard

### What Changed

- Created a stricter visual-aid component pattern: `VisualAidCard`, `DiagramScene`, `CalloutList`, and `KeyTakeaway`.
- Added visual metadata for learning objective, accessible description, key takeaway, and print/PDF review notes.
- Rebuilt `rag-retrieval` as the gold-standard Open-Book Retrieval visual.
- Improved `/review/visual-aids` so each aid shows id, lesson, visual scene, callouts, accessible description, mobile preview note, and print/PDF note.
- Fully repaired the RAG and Retrieval lesson fields: one-sentence definition, core explanation, where it happens, durable vs temporary, prompt vs response, why it matters, how it connects, metaphor, Brain Bridge, misconception, checkpoint aliases, and feedback aliases.
- Updated `Open Book or Learned?` with the requested RAG sorting items and insight.
- Bumped the visible app version to `v0.9.3`.
- Updated the default lesson PDF export path to `docs/review/prompt-life-lesson-cards-v0-9-3.pdf`.
- Updated `npm run export:lesson-cards` to generate `docs/content-inventory/prompt-life-lesson-cards-v0-9-3-visual-system.pdf`.
- Added an iPhone GitHub Pages cache note to `README.md`.

### Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/curriculum/VISUAL_AID_SYSTEM_V0_9_3.md`
- `docs/curriculum/VISUAL_SYSTEM_RESET_V0_9_3.md`

### Was RAG Stale Or Unrepaired?

RAG was current in the repo but visually unrepaired. The v0.9.2 pass focused mostly on Batch 1 and Batch 2 visuals, while RAG still used the older mini-infographic visual style and thinner lesson fields.

### Verification

- Final screenshot, PDF, build, export, browser QA, and deployment results are recorded in `docs/curriculum/VISUAL_SYSTEM_RESET_V0_9_3.md` and the v0.9.3 PDF report.

## v0.9.2 Visual Repair And Canonical Example Pass

### What Changed

- Added a centralized canonical example in `src/data/canonicalExamples.ts`.
- Replaced the incomplete dog/cat prompt pattern with a complete user prompt: `Give me one sentence with two household pets in conflict.`
- Standardized the generated response: `A jealous dog chased a startled cat across the kitchen floor.`
- Updated Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, Tensors, Autoregression, Prompt Run, exercises, review route copy, and glossary examples to use the canonical pattern.
- Kept the attention-specific variant separate: `A jealous dog chased a startled cat because it hissed.`
- Repaired Batch 1 and Batch 2 visual aids so SVGs use short labels, numbered callouts, and HTML legends instead of dense in-canvas prose.
- Added review anchors to lesson and visual-aid cards so screenshots can target individual repaired visuals.
- Bumped the visible app version to `v0.9.2`.
- Updated the lesson PDF export path to `docs/review/prompt-life-lesson-cards-v0-9-2.pdf`.
- Updated `npm run export:lesson-cards` to generate `docs/content-inventory/prompt-life-lesson-cards-v0-9-2-visual-repair.pdf`.

### Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `src/components/ConceptAnimations.tsx`
- `src/components/ExerciseSystem.tsx`
- `src/components/VisualAids.tsx`
- `src/data/canonicalExamples.ts`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/data/promptRun.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/curriculum/CANONICAL_EXAMPLES_V0_9_2.md`
- `docs/curriculum/VISUAL_AID_QA_V0_9_2.md`
- `docs/curriculum/BATCH_2_VISUAL_REPAIR_REPORT_V0_9_2.md`

### Verification

- Final typecheck, build, PDF export, screenshot, and browser QA results are recorded in `docs/curriculum/BATCH_2_VISUAL_REPAIR_REPORT_V0_9_2.md`.

## v0.9 Batch 2 Inference-To-Tensors Implementation

### What Changed

- Implemented the second curriculum batch in app data: Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- Moved lessons 8-14 into the full lesson schema with lifecycle placement, durable versus temporary notes, prompt/response notes, misconception targets, Brain Bridge limits, and checkpoint feedback.
- Updated the Morning Commute act summary so it covers ordinary inference, prompt/response distinction, and numerical representation.
- Improved Batch 1 and Batch 2 visual aids with HTML legends and numbered SVG callouts so labels do not collide with shapes.
- Kept the tensor visual as a stable static tokens x features diagram for mobile and PDF reliability; no Three.js or new 3D library was added.
- Expanded the glossary for Batch 2 terms: tokenizer, tokenization, embedding table, distributed representation, activation, and weight tensor, plus improved inference/forward-pass/context entries.
- Bumped the visible app version to `v0.9.0`.
- Applied a follow-up polish bump to `v0.9.1` after fixing duplicate React keys in the Prompt vs Response token demo.
- Updated the default lesson PDF export path to `docs/review/prompt-life-lesson-cards-v0-9.pdf`.
- Updated `npm run export:lesson-cards` to generate `docs/content-inventory/prompt-life-lesson-cards-v0-9-batch-2.pdf`.

### Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/curriculum/BATCH_2_IMPLEMENTATION_REPORT_V0_9.md`
- `docs/curriculum/VISUAL_AID_LAYOUT_RULES_V0_9_BATCH_2.md`
- `docs/curriculum/BATCH_2_REVIEW_MATRIX_V0_9.md`
- `docs/curriculum/SOURCE_NEEDS_V0_9_BATCH_2.md`
- `docs/curriculum/prompt-life-v0-9-batch-2-report.html`
- `docs/curriculum/prompt-life-v0-9-batch-2-report.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-9-batch-2.pdf`
- `docs/review/prompt-life-lesson-cards-v0-9.pdf`
- `docs/screenshots/v0-9-batch-2-*.png`

### Batch 2 Lessons Implemented

1. Inference
2. Prompt vs Response
3. Tokenization
4. Token IDs
5. Embeddings
6. Vectors
7. Tensors

### Verification

- `npm install`: passed.
- `npm run typecheck`: passed before artifact generation.
- `npm run build`: passed before artifact generation.
- PDF export, screenshots, and final deployment checks are recorded in `docs/curriculum/BATCH_2_IMPLEMENTATION_REPORT_V0_9.md`.

## v0.8 Batch 1 Foundation Implementation

### What Changed

- Implemented the first v0.7 curriculum batch in actual app data and UI.
- Rewrote the foundation section around LLM lifecycle placement, durable versus temporary change, prompt versus response, misconception, metaphor, Brain Bridge, and visual aid.
- Renamed the learner-facing `Two AI Traditions` lesson to `Rationalists vs Empiricists` while preserving the existing `history` id for progress compatibility.
- Added `Overfitting and Generalization` and `Alignment` as new Journey lessons.
- Added Batch 1 fields to the lesson data where relevant: `pathType`, `stageType`, `oneSentenceDefinition`, `coreExplanation`, `whereItHappens`, `durableVsTemporary`, `promptVsResponseNote`, `whyItMatters`, `howItConnects`, `misconception`, checkpoint aliases, and feedback aliases.
- Updated the lesson UI and review route to show the new lifecycle fields.
- Added or improved lightweight SVG visual aids for the Batch 1 concepts.
- Expanded glossary terms for rationalism/empiricism, training, overfitting/generalization, fine-tuning/adapters, and alignment methods.
- Bumped the visible app version to `v0.8.0`.
- Updated `npm run export:lesson-cards` to generate `docs/content-inventory/prompt-life-lesson-cards-v0-8-batch-1.pdf`.
- No new games, gameplay polish, or heavy 3D libraries were added.

### Files Changed

- `package.json`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/main.tsx`
- `docs/curriculum/BATCH_1_IMPLEMENTATION_REPORT_V0_8.md`
- `docs/curriculum/BATCH_1_REVIEW_MATRIX_V0_8.md`
- `docs/curriculum/SOURCE_NEEDS_V0_8_BATCH_1.md`
- `docs/curriculum/prompt-life-v0-8-batch-1-report.html`
- `docs/curriculum/prompt-life-v0-8-batch-1-report.pdf`
- `docs/content-inventory/prompt-life-lesson-cards-v0-8-batch-1.pdf`
- `docs/screenshots/v0-8-batch-1-*.png`

### Batch 1 Lessons Implemented

1. What Is an LLM?
2. Rationalists vs Empiricists
3. Training
4. Pretraining
5. Overfitting and Generalization
6. Fine-Tuning
7. Alignment

### Verification

- `npm install`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run export:lesson-cards`: passed; wrote `docs/content-inventory/prompt-life-lesson-cards-v0-8-batch-1.pdf`.
- Mobile screenshot QA: passed at 390px for Journey top, Batch 1 lesson states, visual aids, Brain Bridge, checkpoint feedback, and review route.
- 390px and 320px overflow checks: passed for the first seven lessons.
- Reset QA: passed in an isolated browser session; progress reset to 0 and the app returned to Home.

## v0.7 Curriculum Bible and Visual Learning Plan

### What Changed

- Created a v0.7 curriculum architecture package for the next implementation pass.
- Proposed a 35-lesson model-literacy Journey that keeps the day-in-the-life-of-a-prompt through-line while adding missing academic concepts.
- Marked each proposed lesson as Essential Path, Deep Path, or Optional Side Tour.
- Added complete draft cards for Overfitting and Generalization, Alignment, Hallucinations, Grounding, Effective Prompting From Model Literacy, Energy/Water/Compute, and Human-Centered AI Ethics.
- Added a visual-learning framework that reserves 3D for cases where rotation reveals otherwise-hidden structure.
- Added lesson-by-lesson visual aid specs, including reduced-motion and accessibility notes.
- Added a metaphor and Brain Bridge matrix so cognition metaphors stay useful but bounded.
- Added a v0.7 misconception map and source-needs list for publication review.
- Added `scripts/generate-curriculum-v07.mjs` so the curriculum docs can be regenerated consistently.
- No new games or gameplay polish were added.

### Files Changed

- `scripts/generate-curriculum-v07.mjs`
- `docs/curriculum/PROMPT_LIFE_CURRICULUM_BIBLE_V0_7.md`
- `docs/curriculum/JOURNEY_ARCHITECTURE_V0_7.md`
- `docs/curriculum/NEW_LESSON_DRAFTS_V0_7.md`
- `docs/curriculum/VISUAL_LEARNING_FRAMEWORK_V0_7.md`
- `docs/curriculum/VISUAL_AID_SPECS_V0_7.md`
- `docs/curriculum/METAPHOR_AND_BRAIN_BRIDGE_MATRIX_V0_7.md`
- `docs/curriculum/MISCONCEPTION_MAP_V0_7.md`
- `docs/curriculum/SOURCE_NEEDS_V0_7.md`

### Proposed New Lesson Architecture

- Essential Path: 26 lessons covering LLM basics, training, inference, prompt/response, tokenization, embeddings, vectors, tensors, context, attention, MLPs, layers, hidden states, logits, softmax, sampling, autoregression, RAG, hallucinations, effective prompting, risk/myth, and synthesis.
- Deep Path: 6 lessons covering overfitting/generalization, alignment, grounding, prompt injection/tool risk, energy/water/compute, and human-centered AI ethics.
- Optional Side Tour: 3 lessons covering rationalists vs empiricists, diffusion vs autoregression, and multimodal AI.
- Current `How AI Learns` should be split across training, fine-tuning, alignment, RAG, grounding, and effective prompting instead of staying as a single umbrella card.

### New Cards Drafted

- Overfitting and Generalization
- Alignment
- Hallucinations
- Grounding
- Effective Prompting From Model Literacy
- Energy, Water, and Compute
- Human-Centered AI Ethics

### Visual Framework Summary

- Primary visual types: static SVG diagram, step animation, interactive 2D diagram, CSS 3D object, rotatable 3D object, sorting/checking exercise, split-screen contrast, and evidence/causality diagram.
- 3D is justified only when rotation reveals structure that a flat image hides.
- Good 3D candidates: tensor cube, layer stack, feature cloud, vocabulary cloud, and context tray.
- Poor 3D candidates: hallucination, alignment, ethics, privacy, prompt injection, and energy use.

### Missing Source Needs

- Transformer architecture, attention, MLP/feed-forward layers, pretraining/next-token prediction, instruction tuning/RLHF, fine-tuning, RAG, grounding, hallucinations, prompt injection, privacy/data governance, diffusion, multimodal AI, alignment, energy/water/compute, human-centered AI ethics, and papal/Vatican AI ethics references need external source review before final publication.
- Energy and water copy intentionally avoids precise numbers: `SOURCE NEEDED: current estimates vary by model, hardware, data center, and measurement method.`

### Recommendations for Next Implementation Pass

1. Implement the Essential Path refinements first, using the v0.7 Bible as the source of truth for card structure.
2. Replace the current `How AI Learns` umbrella card with more precise Deep Path cards where appropriate.
3. Build the 2D visual aids before adding any 3D; reserve 3D for tensors, layers, feature/vocabulary clouds, and context/RAG trays.
4. Add a lightweight source-review pass before publishing infrastructure, ethics, alignment, hallucination, and RAG claims as final copy.

### Build Result

- `npm run typecheck`: passed.
- `npm run build`: passed.

## v0.6.3 Content Inventory and RAG Addendum

### What Changed

- Added `RAG and Retrieval` as a dedicated Journey card after `Context Window`.
- Added `Grounding` to the glossary, including relationship, metaphor, Brain Bridge, and limitation copy.
- Added a dedicated `Open-Book Retrieval` visual aid and mapped RAG to the `Open Book or Learned?` practice activity.
- Enhanced `/review/lesson-cards` with stage, current exercise, prompt/response note, rewrite notes, illustration need, and rubric scores.
- Added `npm run export:lesson-cards` for the inventory review PDF.
- Generated the full content inventory, rubric, lesson matrix, misconception map, curriculum gaps, architecture proposal, visual aid inventory, first-five rewrite draft plus RAG addendum, UI copy cleanup list, and review-card instructions.
- Created `src/data/contentReview.js` so review route data and generated docs share the same audit metadata.

### Files Changed

- `README.md`
- `package.json`
- `scripts/export-lesson-pdf.mjs`
- `scripts/generate-content-inventory.mjs`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/data/contentReview.js`
- `src/data/exercises.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/content-inventory/*`
- `docs/screenshots/v0-6-3-*.png`

### Inventory Completeness

- Journey lessons reviewed: 26 of 26.
- Matrix rows: 26 of 26.
- Every current Journey lesson includes a definition, relationship line, metaphor, Brain Bridge, limitation, visual aid, checkpoint, glossary terms, review stage, confusion risk, missing-explanation note, illustration need, rewrite priority, and rubric scores.
- Existing source doc note: `docs/HOW_AI_LEARNS_SIDE_TOUR.md` was referenced by the prompt but does not exist in this checkout; this pass used `docs/PLAY_MODE_V0_5.md`, `docs/ANIMATION_SYSTEM.md`, `docs/EXERCISE_SYSTEM.md`, and current `learningModes` data as the authoritative side-tour context.

### Highest-Priority Content Problems

- Vectors, tensors, hidden states, and context windows still need stronger shared examples and clearer axis/temporary-state visuals.
- Attention and MLP should be rewritten as a tighter pair so learners can distinguish cross-position relevance from per-token feature reshaping.
- RAG now has a dedicated card, but the v0.7 curriculum should add stronger source-trust and citation examples.
- Risk literacy should eventually gain a synthesis lesson after the risk/myth card.

### Verification

- `npm install`: already up to date during this pass.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run export:lesson-cards`: passed.
- `/review/lesson-cards`: loaded in the in-app browser without app chrome or bottom navigation.
- RAG Journey lesson and Grounding glossary drawer: verified in the in-app browser at mobile width.
- `docs/content-inventory/prompt-life-lesson-cards-v0-6.pdf`: generated.
- Real iPhone Safari/Chrome test remains a post-deploy manual check.

### Next Three Recommended Improvements

1. Rewrite the highest-priority lessons in app data, starting with Vectors, Tensors, Attention, MLP, Hidden States, Context Window, RAG, and Risk vs Myth.
2. Add a shared dog/cat example path across tokenization, attention, logits, softmax, sampling, autoregression, context, and RAG.
3. Add automated review-route and mobile smoke tests that verify lesson count, RAG placement, PDF export, bottom-nav clipping, and glossary drawer fields.

## v0.6 Content Repair and Mobile Shell

### What Changed

- Normalized the Journey into the requested 25-lesson concept path.
- Added Prompt vs Response, Vectors, and How AI Learns as formal Journey lessons.
- Folded Alignment, Vocabulary Cloud, and Brain Metaphor Limits into surrounding lessons and glossary content instead of keeping them as standalone lessons.
- Added Brain Bridge to every lesson so brain metaphors are useful but explicitly bounded.
- Added reusable `VisualAid` diagrams and a `/review/visual-aids` gallery.
- Rebuilt the lesson page hierarchy around hero, visual aid, core idea, relationship, metaphor, Brain Bridge, tiny interaction, checkpoint, reflection, and continue.
- Moved reusable exercises out of Journey lessons so Journey teaches and Play practices.
- Added section intro cards and a stage timeline to the Journey map.
- Repaired the mobile shell with internal scrolling, safe-area bottom padding, and a frosted bottom navigation gradient.
- Added scroll-to-top/focus behavior for main navigation, lessons, Prompt Run steps, and How AI Learns steps.
- Added `/review/lesson-cards` plus `npm run export:lesson-pdf`.
- Added simple PWA metadata through `public/manifest.webmanifest` and mobile app meta tags.
- Cleaned ordinary UI copy to avoid internal product language and old names.

### Files Changed

- `README.md`
- `index.html`
- `package.json`
- `public/manifest.webmanifest`
- `scripts/export-lesson-pdf.mjs`
- `src/components/VisualAids.tsx`
- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/ACCESSIBILITY_QA.md`
- `docs/CONTENT_QA_CHECKLIST.md`
- `docs/CONTENT_REPAIR_V0_6.md`
- `docs/VISUAL_AIDS_V0_6.md`
- `docs/review/LESSON_CONTENT_MATRIX.md`

### Verification

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run export:lesson-pdf`: passed.
- Browser screenshots captured for Home, Journey section intro, lesson top, lesson visual aid, Brain Bridge, bottom nav gradient, 320px pill wrapping, review lesson cards, visual aid gallery, and Badge.
- Responsive smoke check passed at 320px, 390px, and 430px with no horizontal overflow. Desktop review route rendered 25 lesson cards.
- Real iPhone Safari/Chrome test remains a post-deploy manual check.

### Next Three Recommended Improvements

1. Add automated route checks for `/review/lesson-cards`, `/review/visual-aids`, lesson navigation, and progress reset.
2. Add a real axe or Playwright accessibility pass for focus order, modal focus trapping, and touch target regression checks.
3. Add a lightweight service worker only after the content shell is stable enough to benefit from offline caching.

## v0.4 Exercise System Update

### What Changed

- Added a reusable exercise schema and starter exercise library in `src/data/exercises.ts`.
- Added `ExerciseShell` and reusable input components in `src/components/ExerciseSystem.tsx`.
- Replaced unclear lesson "Try it" interactions with shared exercise patterns where an exercise is mapped.
- Added exercise progress to namespaced `localStorage`.
- Updated reset controls so user reset and debug key clearing remove exercise progress.
- Added an exercise-progress stat to the Badge screen.
- Added a Durable or Temporary sorting exercise inside the How AI Learns side tour.
- Created `docs/EXERCISE_SYSTEM.md`.

### Files Changed

- `README.md`
- `src/components/ExerciseSystem.tsx`
- `src/data/exercises.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/EXERCISE_SYSTEM.md`
- `docs/PRODUCT_BLUEPRINT.md`
- `docs/STORAGE_AND_RESET.md`
- `docs/REVIEW_NOTES.md`

### Exercise Components Added

- `ExerciseShell`
- `ExerciseHeader`
- `ActionCue`
- `TapChoiceExercise`
- `TapMultipleExercise`
- `DragOrderExercise`
- `DragMatchExercise`
- `SortBucketsExercise`
- `ConnectNodesExercise`
- `ToggleStateExercise`
- `TypeReflectionExercise`
- `LabelTokensExercise`
- `NextTokenPickExercise`
- `ExerciseFeedback`
- `InsightUnlocked`
- `ExerciseControls`

### Exercises Created

- Prompt or Response?
- Pick the Next Token
- Durable or Temporary?
- Attention Is Relevance
- Context Window: What Fell Out?
- Training Nudge
- Softmax Funnel
- MLP Feature Reshape
- Open Book or Learned?
- Brain Metaphor Boundary

### Lessons Updated

- What Is an LLM?
- Training
- Inference
- Tokenization
- Token IDs
- Embeddings
- Attention
- MLP
- Hidden States
- Logits
- Softmax
- Sampling
- Autoregression
- Context Window
- Brain Metaphor Limits
- Risk vs Myth

### Screens Reviewed

- Lesson with tap-choice exercise
- Prompt or Response label-token exercise
- Durable or Temporary sort-buckets exercise
- Attention connect-nodes exercise
- Wrong answer feedback
- Correct answer feedback
- Badge exercise-progress stat
- Badge reset/debug controls

Screenshot evidence:

- `docs/screenshots/v0-4-lesson-tap-choice-exercise-mobile.png`
- `docs/screenshots/v0-4-prompt-response-exercise-mobile.png`
- `docs/screenshots/v0-4-durable-temporary-exercise-mobile.png`
- `docs/screenshots/v0-4-attention-connect-exercise-mobile.png`
- `docs/screenshots/v0-4-exercise-wrong-feedback-mobile.png`
- `docs/screenshots/v0-4-exercise-correct-feedback-mobile.png`
- `docs/screenshots/v0-4-badge-exercise-progress-mobile.png`

### Build Result

- `npm install`: passed, no vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run build:pages`: passed.
- Reset verification: passed. User reset clears `promptlife:v1:promptRunProgress` back to an empty progress object, clears lesson progress, and leaves unrelated `localStorage` untouched.
- Reveal verification: passed. Show me unlocks Continue, records the step as completed/revealed, and advances to the next step.
- Reset verification: passed. User reset clears `promptlife:v1:exerciseProgress` back to an empty progress object, clears lesson progress, and leaves unrelated `localStorage` untouched.

### Known Issues

- Drag-style exercises currently use accessible button-based ordering/matching instead of pointer drag gestures.
- Exercise progress is local to one browser and device.
- `Show me` reveals a correct pattern but intentionally does not mark the exercise complete.

### Next Three Recommended Improvements

1. Add automated tests for each exercise input type and exercise progress reset.
2. Add Playwright or axe accessibility checks for focus order, touch targets, and feedback announcements.
3. Add richer drag-and-drop behavior while preserving the current keyboard-accessible fallback.

## What Changed

- Clarified prompt-vs-response language across the app so learners can tell prompt processing, response generation, training, and retrieval/context use apart.
- Added a reusable `Prompt vs Response` explanation box and a `Prompt or Response?` dog/cat mini-demo.
- Added scoped progress reset controls on the Badge screen plus `?debug=1` progress tools.
- Migrated progress storage to namespaced `promptlife:v1:*` localStorage keys while still reading legacy `pl.*` keys.
- Added a lightweight React/SVG/CSS animation system for core LLM concepts.
- Added `Trace One Prompt`, a guided walkthrough of "Explain attention simply." from text to sampled next token.
- Added `How AI Learns`, a side tour comparing durable learning, temporary steering, retrieval, feedback, and inference.
- Reorganized the learning journey into six sections: Before Morning, Morning Commute, Workday, Decision Room, The Day Repeats, and Side Tours.
- Added missing lessons for Token IDs, Logits, Softmax, and Sampling.
- Rebuilt the lesson page into a progressive mobile learning flow.
- Added reusable checkpoint behavior with retry, explicit wrong-answer feedback, and correct-answer progress.
- Improved tiny interactions with larger controls, clearer state changes, and insight language.
- Polished Context Stack, Attention Weave, and Token Pipeline Relay without adding competitive scoring.
- Expanded glossary search and drawer content with relationship, metaphor, often-confused-with, and related term chips.
- Updated the badge screen language to `Prompt Life: Model Literate` and added what remains before unlock.
- Updated README phone testing instructions for same-Wi-Fi local testing.

## Files Changed

- `README.md`
- `src/components/ConceptAnimations.tsx`
- `src/data/content.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/ANIMATION_SYSTEM.md`
- `docs/STORAGE_AND_RESET.md`
- `docs/UI_REVIEW_V0_2.md`
- `docs/ACCESSIBILITY_QA.md`
- `docs/REVIEW_NOTES.md`
- `docs/screenshots/v0-2-*.png`
- `docs/screenshots/v0-3-*.png`
- `docs/screenshots/v0-4-*.png`

## New Animation Components

- `TokenCardsAnimation`
- `EmbeddingLookupAnimation`
- `TensorBlockAnimation`
- `AttentionArcsAnimation`
- `MlpGearsAnimation`
- `HiddenStateGlowAnimation`
- `SoftmaxFunnelAnimation`
- `SamplingPickAnimation`
- `AutoregressiveLoopAnimation`
- `ContextWindowSlideAnimation`
- `DiffusionDenoiseAnimation`
- `MultimodalMixerAnimation`
- `FeatureCloudAnimation`
- `TrainingLoopAnimation`
- `FineTuningPathAnimation`
- `InferenceFlowAnimation`
- `TraceStepAnimation`
- `LearningModeAnimation`

## New How AI Learns Content

- Supervised learning
- Self-supervised learning
- Pretraining
- Instruction tuning
- Human feedback learning / RLHF
- Preference optimization
- In-context learning
- Retrieval-augmented generation / RAG
- Continual or online learning
- Self-play and self-training

## New Glossary Terms

- Prompt
- Response
- Prompt tokens
- Response tokens
- Input context
- Generated token
- Completion
- Forward pass
- Decoding step
- Model output

## Reset Controls Added

- Badge screen: `Reset progress`
- Debug mode via `?debug=1`:
  - Mark first lesson complete
  - Mark all lessons incomplete
  - Unlock badge for visual testing
  - Clear all Prompt Life localStorage keys

## localStorage Keys Documented

Current keys:

- `promptlife:v1:lastLocation`
- `promptlife:v1:lessonId`
- `promptlife:v1:progress`
- `promptlife:v1:reflections`
- `promptlife:v1:gameInsights`
- `promptlife:v1:traceComplete`
- `promptlife:v1:learningTourComplete`

Legacy keys are still read for migration and removed by reset:

- `pl.tab`
- `pl.lessonId`
- `pl.completed`
- `pl.reflections`
- `pl.gameInsights`
- `pl.traceComplete`
- `pl.learningTourComplete`

## Screens Reviewed

- Home
- Journey
- First lesson
- First lesson checkpoint wrong answer
- First lesson checkpoint correct answer
- Glossary search
- Glossary drawer
- Play
- Trace One Prompt
- How AI Learns
- Prompt vs Response demo
- Badge reset controls
- v0.4 prompt/response demo screenshot
- v0.4 reset/debug screenshot
- Context Stack
- Attention Weave
- Token Pipeline Relay
- Badge
- v0.3 lesson animation screenshot
- v0.3 Trace One Prompt screenshot
- v0.3 How AI Learns screenshot

## Bugs Fixed

- First lesson wrong answer no longer uses vague encouragement; it clearly distinguishes rule-based AI from LLMs.
- Correct answer changes the continue action to `Next lesson`.
- Continue no longer silently traps the user; it scrolls to the checkpoint and gives a status message.
- Lesson term chips are no longer duplicated throughout the page.
- Token Relay operator controls no longer require horizontal scrolling at 390px.
- Glossary drawer now includes often-confused-with guidance and related terms.

## Verification

- `npm install`: passed, no vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- Manual 390px browser QA: completed for lesson checkpoint, glossary drawer, Trace One Prompt, How AI Learns, Prompt vs Response demo, all three mini-games, badge progress, and reset behavior.

## Known Issues

- The fixed bottom nav can overlay scrolling content mid-page, but final controls can be scrolled above it.
- Glossary drawer focus handling is useful but not a complete focus trap.
- Mini-games are conceptual teaching aids rather than exact mathematical simulations.
- Animation primitives are intentionally lightweight and not exact mathematical visualizations.
- Debug tools are URL-query exposed for local testing and should remain documented as developer tools.

## Next Three Improvements

1. Add automated tests for storage migration and reset behavior.
2. Add an automated accessibility smoke test with axe or Playwright assertions.
3. Add a glossary relationship graph connecting prompt, response, context, decoding, and training terms.

## v0.5 Play Mode and Prompt Run Update

### What Changed

- Reframed Play as a learning arcade with a featured Prompt Run activity, three side challenges, and the How AI Learns tour.
- Replaced the mostly linear Trace One Prompt walkthrough with Prompt Run, an interactive 12-step spine activity plus a final ordering challenge.
- Added `src/data/promptRun.ts` for Prompt Run step data and progress defaults.
- Added Prompt Run progress under `promptlife:v1:promptRunProgress`.
- Added hints, reveal-friendly continuation, and a Continue gate that unlocks after a correct action or Show me.
- Improved exercise feedback behavior so feedback scrolls into view after Check or Show me.
- Improved Context Stack, Attention Weave, and Token Pipeline Relay with clearer target states and specific feedback.
- Updated Badge criteria and stats so Prompt Run counts as a major model-literacy milestone.
- Added extra safe-area-aware bottom padding on Play, Prompt Run, mini-games, tour, and Badge screens.
- Created `docs/PLAY_MODE_V0_5.md`.

### Files Changed

- `README.md`
- `src/components/ExerciseSystem.tsx`
- `src/data/promptRun.ts`
- `src/main.tsx`
- `src/styles/global.css`
- `docs/ACCESSIBILITY_QA.md`
- `docs/ANIMATION_SYSTEM.md`
- `docs/EXERCISE_SYSTEM.md`
- `docs/PLAY_MODE_V0_5.md`
- `docs/PRODUCT_BLUEPRINT.md`
- `docs/STORAGE_AND_RESET.md`
- `docs/REVIEW_NOTES.md`

### Prompt Run Steps Implemented

1. Prompt or Response?
2. Tokenizer
3. Token IDs
4. Embedding Lookup
5. Tensor Stack
6. Attention
7. MLP Feature Reshape
8. Hidden State
9. Logits
10. Softmax Funnel
11. Sampling
12. Append and Repeat
13. Full Run Challenge: Put the run in order

### Mini-Game Improvements

- Context Stack now asks learners to keep request, example, and tone visible when output arrives.
- Attention Weave now asks learners to connect `it` to `cat` in a short dog/cat pronoun sentence.
- Token Pipeline Relay now requires the target path `pass to transform to hold to pass`.

### Screens Reviewed

- Play home
- Prompt Run step 1
- Prompt Run wrong feedback
- Prompt Run correct feedback
- Prompt Run Softmax step
- Prompt Run final ordering challenge
- Context Stack challenge
- Attention Weave challenge
- Token Pipeline Relay challenge
- Badge progress

Screenshot evidence:

- `docs/screenshots/v0-5-play-home.png`
- `docs/screenshots/v0-5-prompt-run-step-1.png`
- `docs/screenshots/v0-5-prompt-run-wrong-feedback.png`
- `docs/screenshots/v0-5-prompt-run-correct-feedback.png`
- `docs/screenshots/v0-5-prompt-run-softmax.png`
- `docs/screenshots/v0-5-prompt-run-final-order.png`
- `docs/screenshots/v0-5-context-stack-challenge.png`
- `docs/screenshots/v0-5-attention-weave-challenge.png`
- `docs/screenshots/v0-5-token-relay-challenge.png`
- `docs/screenshots/v0-5-badge-progress.png`

### Build Result

- `npm install`: passed, no vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed.

### Known Issues

- Watch and Challenge modes are documented for a future pass; v0.5 ships Practice mode first.
- Drag-like activities use accessible button/tap fallbacks instead of pointer drag gestures.
- Prompt Run progress is local to one browser and device.
- The old `traceComplete` storage key is kept as a compatibility/save flag while Prompt Run uses the new detailed progress key.

### Next Three Recommended Improvements

1. Add automated tests for Prompt Run step progression, reveal behavior, and reset clearing `promptRunProgress`.
2. Add Watch and Challenge modes once the Practice spine is classroom-reviewed.
3. Add richer visual feedback for the final ordering challenge without removing the keyboard-accessible Up/Down fallback.

## v0.25.2 New Dawn Implementation Pass

Date: 2026-06-07

Updated the five existing New Dawn cards without adding cards, games, generated PNGs, dependencies, progress changes, checkpoint-randomization changes, Glossary Dojo changes, or badge changes.

Changed:

- Benefits Worth Taking Seriously now has a coded benefit-tier visual and a confidence-tier sorting interaction.
- Human-Centered AI now uses a concrete accountability-flow visual and a student-support-note scenario choice.
- Better AI Is a Choice now uses a coded control-panel visual and task-specific better-AI lever selection.
- Effective Prompting from Model Literacy now uses a richer prompt/context tray and a prompt-builder interaction.
- Model Literate Synthesis now uses a full-chain map and a tap-order synthesis interaction from prompt context to human accountability.
- Added a concise `Benefits` glossary term and New Dawn glossary learning-path ordering updates.
- Bumped the app version to `0.25.2`.

Verification:

- `npm run typecheck`: passed.
- `npm run build`: passed, with the existing Vite large-chunk warning.
- `npm run build:pages`: passed, with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; Journey checkpoints remain randomized by answer identity.
- Screenshot QA captured 16 implementation screenshots at 390px and 320px with no horizontal overflow in the manifest.
- The final synthesis action was checked clear of the bottom nav.

Known issues:

- New Dawn remains internally source-reviewed but not learner-cited.
- The benefit-tier interaction uses tap/cycle sorting rather than drag and drop for mobile accessibility.
