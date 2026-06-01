# Review Notes

Date: 2026-05-31

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
