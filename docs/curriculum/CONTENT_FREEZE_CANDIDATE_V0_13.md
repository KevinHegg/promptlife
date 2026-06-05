# Prompt Life Content Freeze Candidate v0.13

Date: 2026-06-04

## Recommendation

Prompt Life is ready for a content-freeze candidate if v1 is treated as three paths rather than one required 38-card march:

1. Essential Mechanics
2. Deep Model Literacy
3. Ethics and Society

Grounding and Hallucinations should remain as dedicated Journey cards after RAG and before broader risk literacy. That placement is now implemented in v0.13.

## Essential Mechanics Path

Recommended required v1 sequence:

1. What Is an LLM?
2. Training
3. Pretraining
4. Fine-Tuning
5. Alignment
6. Inference
7. Prompt vs Response
8. Tokenization
9. Token IDs
10. Embeddings
11. Vectors
12. Tensors
13. Attention
14. MLP
15. Hidden States
16. Logits
17. Softmax
18. Sampling
19. Autoregression
20. Context Window
21. RAG and Retrieval
22. Grounding
23. Hallucinations
24. How AI Learns
25. Effective Prompting from Model Literacy
26. Risk vs Myth
27. Model Literate Synthesis

## Deep Model Literacy Path

Keep available as optional/deep cards:

- Rationalists vs Empiricists
- Overfitting and Generalization
- Layers
- Diffusion vs Autoregression
- Multimodal AI
- Better AI Is a Choice, if framed as design/governance depth rather than required mechanics

## Ethics and Society Path

Keep available, but do not freeze as fully publication-ready until source review is complete:

- The Perfect Storm
- Collective Intelligence, Extracted
- Benefits Worth Taking Seriously
- Costs We Must Count
- Human-Centered AI
- Better AI Is a Choice

## Freeze Criteria

Ready for v1 freeze:

- Core mechanism distinctions are clear and repeated consistently.
- RAG, Grounding, and Hallucinations are dedicated cards.
- The review route exposes card number, title, path label, objective, misconception, recommendation, source-needed flag, and visual-needed flag.
- The Badge page shows app version `v0.13.0`.
- Typecheck and build pass.

Still open before v1 publication:

- Source review for ethics/society claims and any claims about environmental footprint, data provenance, labor, copyright, governance, or benefit evidence.
- Shortening or path-filtering the required Journey so learners are not required to complete all 38 cards for the core badge.
- Polish pass for coded visuals marked as visual-needed.
- Possible copy tightening for How AI Learns and Risk vs Myth after the new Grounding and Hallucinations cards.

## Core Distinctions To Freeze

- Training and fine-tuning can durably change weights.
- Inference is a forward pass only; it does not durably update weights.
- Embedding equals a token's learned starting vector.
- Hidden state equals a temporary context-shaped internal vector.
- Attention is weighted relevance between token positions, not human attention.
- MLP is per-token feature reshaping.
- Logits are raw scores; softmax creates probabilities; sampling chooses one next token.
- LLM generation is autoregressive: next token, append, repeat.
- Context window is temporary visible input, not permanent memory.
- RAG retrieves outside information and places it into current context.
- Grounding connects responses to evidence, but does not guarantee truth.
- Hallucinations are fluent unsupported outputs, not necessarily lies.
- Diffusion is denoising, different from autoregressive text generation.
- Multimodal means multiple media types represented or processed together.
- Brain metaphors are useful only when their limits are explicit.

