# Review Notes

Date: 2026-06-04

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
