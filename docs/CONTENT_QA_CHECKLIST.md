# Content QA Checklist

Date: 2026-06-02

## Lesson Pattern

- [x] Every lesson has a clear concept title.
- [x] Every lesson has a one-sentence definition.
- [x] Every lesson says where the concept appears in the model path.
- [x] Every lesson says why the concept matters.
- [x] Every lesson has a relationship line connecting it to nearby concepts.
- [x] Every lesson includes a metaphor.
- [x] Every lesson includes a Brain Bridge with an explicit metaphor limit.
- [x] Every lesson includes a tiny interaction.
- [x] Every lesson includes a checkpoint and reflection field.
- [x] Journey lessons do not embed the reusable exercise system.

## Core Distinctions

- [x] Training and fine-tuning can durably change weights.
- [x] Inference is a forward pass only and does not normally update weights.
- [x] Embedding means a token learned starting vector.
- [x] Hidden state means a temporary context-shaped internal vector.
- [x] Attention means weighted relevance between token positions, not human attention.
- [x] MLP means per-token feature reshaping.
- [x] Logits are raw scores.
- [x] Softmax turns scores into probabilities.
- [x] Sampling chooses one next token.
- [x] LLM text generation is autoregressive: next token, append, repeat.
- [x] Context window means temporary visible input, not permanent memory.
- [x] Diffusion is denoising and differs from autoregressive text generation.
- [x] Multimodal means multiple media types represented or processed together.
- [x] Brain/neuron metaphors include explicit limits.

## Mobile QA Targets

- [ ] Safari on iPhone: open the deployed GitHub Pages URL and check Home, Journey, first lesson, Play, Glossary drawer, and Badge.
- [ ] Chrome on iPhone: repeat the same path and verify the bottom nav does not cover final controls.
- [ ] Confirm browser back/refresh behavior on deployed Pages.
- [ ] Confirm Add to Home Screen uses the app name and icon.

## Local Responsive QA

- [x] 320px: check pill/chip wrapping and bottom nav labels.
- [x] 390px: primary target width; check lesson hierarchy and visual aids.
- [x] 430px: check wider iPhone layout.
- [x] Desktop: check centered app shell and review routes.

## Browser Limitation

The in-app browser can emulate mobile widths, but it is not a substitute for real Mobile Safari. Treat real iPhone Safari/Chrome testing as a required follow-up after the `main` branch deploys.
