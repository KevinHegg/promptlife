# Prompt Life Product Blueprint

## Purpose

Prompt Life is a mobile-first learning app that makes large language models understandable for a non-technical but academically serious audience. It should reduce mystery without hype: learners leave with a usable mental model of what LLMs are, what they are not, and where real risks live.

## Audience

- Smart high-school students
- First-year college students
- Faculty and academic staff
- Higher-ed IT and administrative leaders
- PhDs outside computer science

## Through-Line

The core metaphor is a day in the life of a prompt. A learner follows one prompt through the system:

1. Before Morning: AI traditions, training, pretraining, fine-tuning, alignment, inference.
2. Morning Commute: text becomes tokens, token IDs, embeddings, vectors, and tensors.
3. Workday: transformer layers refine hidden states through attention, MLPs, residual paths, and normalization.
4. Decision Room: hidden states become logits, softmax probabilities, and sampled next tokens.
5. The Day Repeats: autoregressive generation appends one token at a time inside a context window.
6. Side Tours: context-window demos, attention demos, token pipeline demos, diffusion, multimodal AI, brain-metaphor limits, risk vs myth.
7. Badge: the learner earns a Model Literate confidence badge.

## Lesson Pattern

Each lesson follows the same structure:

- Concept title
- One-sentence definition
- Relationship line explaining how it connects to neighboring concepts
- Metaphor with explicit limits when needed
- Tiny interaction
- Checkpoint question
- Reflection prompt

## Core Distinctions

- Training and fine-tuning can durably update weights.
- Inference normally does not update weights.
- Embedding means a token ID's learned starting vector.
- Hidden state means a temporary context-shaped vector during a forward pass.
- Attention means weighted relevance between token positions, not consciousness.
- MLP means per-token feature reshaping after attention.
- Logits are raw scores; softmax turns scores into probabilities; sampling chooses a next token.
- LLM text generation is autoregressive: next token, append, repeat.
- Context window means current working context, not permanent memory.
- Diffusion is iterative denoising, different from autoregressive text generation.
- Multimodal means multiple media types represented or processed together.
- Brain and neuron metaphors are useful only when their limits are explicit.

## Mini-Games

### Context Stack

Cards represent pieces of context. The learner pushes cards into a limited window; old cards fall out. This teaches context windows, truncation, recency, and instruction ordering.

### Attention Weave

Token nodes appear in a field. The learner taps source and target nodes to draw arcs. This teaches attention as weighted relevance, not human awareness.

### Token Pipeline Relay

Tokens move through pass, transform, and hold operators. The learner cycles operators to see state changes. This teaches sequence, determinism, and pipeline intuition.

## UX Principles

- Design at 390px width first.
- One screen, one idea.
- One interaction, one relationship.
- Keep all instructional text in accessible HTML.
- Use reference art as mood-board material, not as unreadable app pages.
- Avoid leaderboards and scores; use progress, reflection, insight unlocked, and badge completion.
- Respect keyboard navigation, touch targets, semantic structure, focus visibility, and reduced-motion settings.

## v0.2 Direction

1. Add an instructor mode with discussion prompts and classroom handouts.
2. Add a guided trace of one prompt through tokens, hidden states, logits, and sampled output.
3. Add automated accessibility checks and a keyboard-only QA walkthrough.
