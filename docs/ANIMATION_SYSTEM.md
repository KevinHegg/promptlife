# Animation System

Date: 2026-05-31

## Principles

- Motion teaches a concept or state change; it is not decoration.
- Each animation fits a 390px mobile viewport.
- Text stays in HTML and remains accessible.
- Controls use real buttons and visible focus states.
- Animations use React state, inline SVG, and CSS transforms.
- No backend and no heavy 3D dependency.
- Every animation has a static caption and remains understandable with reduced motion.

## Reusable Components

The animation primitives live in `src/components/ConceptAnimations.tsx`.

- `TokenCardsAnimation`: text splits into token cards.
- `EmbeddingLookupAnimation`: token IDs retrieve learned vector bars.
- `TensorBlockAnimation`: vectors stack into a 3D-ish tensor block with CSS.
- `AttentionArcsAnimation`: relevance arcs connect token positions.
- `MlpGearsAnimation`: gears and sliders reshape per-token features.
- `HiddenStateGlowAnimation`: context changes a temporary internal vector.
- `SoftmaxFunnelAnimation`: raw logits become probabilities.
- `SamplingPickAnimation`: one next token is selected from candidates.
- `AutoregressiveLoopAnimation`: sampled token is appended and generation repeats.
- `ContextWindowSlideAnimation`: old cards fall out of the temporary context window.
- `DiffusionDenoiseAnimation`: a grid denoises step by step.
- `MultimodalMixerAnimation`: text, image, and audio enter shared representation space.
- `FeatureCloudAnimation`: one prompt lights distributed learned patterns.
- `TrainingLoopAnimation`: prediction, comparison, durable weight update, repeat.
- `FineTuningPathAnimation`: targeted examples carve a preferred path.
- `InferenceFlowAnimation`: a forward pass uses existing weights.
- `TraceStepAnimation`: compact visuals for the Trace One Prompt walkthrough.
- `LearningModeAnimation`: compact visual for How AI Learns modes.

## Lesson Mapping

- What is an LLM? and symbolic/deep-learning context: `FeatureCloudAnimation`
- Training and pretraining: `TrainingLoopAnimation`
- Fine-tuning: `FineTuningPathAnimation`
- Inference: `InferenceFlowAnimation`
- Tokenization and token IDs: `TokenCardsAnimation`
- Embeddings: `EmbeddingLookupAnimation`
- Tensors: `TensorBlockAnimation`
- Attention: `AttentionArcsAnimation`
- MLP: `MlpGearsAnimation`
- Hidden states: `HiddenStateGlowAnimation`
- Logits and softmax: `SoftmaxFunnelAnimation`
- Sampling: `SamplingPickAnimation`
- Autoregression: `AutoregressiveLoopAnimation`
- Context window: `ContextWindowSlideAnimation`
- Diffusion: `DiffusionDenoiseAnimation`
- Multimodal AI: `MultimodalMixerAnimation`

## Guided Walkthrough

`Trace One Prompt` follows:

1. Text prompt appears.
2. Tokenizer splits text into token cards.
3. Token IDs appear.
4. Embedding lookup turns token IDs into vector bars.
5. Vectors stack into a tensor block.
6. Attention arcs connect token positions.
7. MLP/gears reshape features.
8. Hidden states glow as temporary context-shaped meaning.
9. Final hidden state points to a vocabulary cloud.
10. Logits become softmax probabilities.
11. One next token is sampled.
12. The token is appended and the loop repeats once.

Completion is stored in `localStorage` as `promptlife:v1:traceComplete`.

## Screenshot Evidence

- `docs/screenshots/v0-3-lesson-animation-mobile.png`
- `docs/screenshots/v0-3-trace-one-prompt-mobile.png`
- `docs/screenshots/v0-3-how-ai-learns-mobile.png`

## How AI Learns Side Tour

`How AI Learns` compares durable training, temporary in-context steering, retrieval, normal inference, human feedback, and self-supervised pretraining. Completion is stored in `localStorage` as `promptlife:v1:learningTourComplete`.

The mode content lives in `src/data/content.ts` as `learningModes`.

## Reduced Motion Strategy

- CSS motion is scoped inside `@media (prefers-reduced-motion: no-preference)`.
- The global reduced-motion rule disables animation and transition duration.
- React components are driven by user-controlled steps rather than autoplay.
- Captions and visible state changes provide a static fallback.

## Future Ideas

- Add a dedicated `LayerStackAnimation` for residual paths and normalization.
- Add an instructor-controlled pause/step mode for classroom demos.
- Consider a CSS-only parallax feature cloud before reaching for Three.js.
- Use Three.js only if a future concept truly needs inspectable spatial structure.
