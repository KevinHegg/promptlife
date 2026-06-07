# Twilight Card Inventory v0.23

Date: 2026-06-07

## Stage Inventory

Twilight currently contains four Journey cards:

1. `how-ai-learns` - How AI Learns
2. `diffusion` - Diffusion vs Autoregression
3. `multimodal` - Multimodal AI
4. `perfect-storm` - The Perfect Storm

The global Journey numbers are 28-31.

## Card 28: How AI Learns

### Current Content

- Title: How AI Learns
- Subtitle: Durable learning versus temporary steering
- One-sentence definition: AI systems can improve or behave differently through durable training, targeted fine-tuning, retrieval, or temporary in-context steering.
- Relationship line: Pretraining and fine-tuning can durably change weights; retrieval and examples in the prompt change only what the model can see during inference.
- Metaphor: Revising the textbook versus bringing notes into an open-book exam.
- Brain bridge: Useful because learning can mean prior experience changes later behavior; limited because in-context examples steer the current run without normally updating weights.

### Current Architecture

This card is accurate but still slim. It uses `definition`, `where`, `why`, `relationship`, `metaphor`, `brainBridge`, and a simple quiz. It does not yet use the richer fields present on stronger cards, such as `coreExplanation`, `durableVsTemporary`, `promptVsResponseNote`, `misconception`, and richer feedback.

### Visual Aid

- Current visual id: `ai-learns`
- Current visual: three boxes labeled weights/durable, context/temporary, retrieval/open book.
- Finding: readable, but too thin for the card's teaching burden. It does not show pretraining, fine-tuning, RAG, in-context examples, or continual learning as separate cases.

### Tiny Interaction

- Current interaction type: `training`
- Current interaction: generic training loop with predict, compare, update weights, repeat.
- Finding: it reinforces durable training, but it does not match the card title "Sort the learning modes." The next pass should use a sort-buckets interaction.

### Checkpoint

- Question: Which process normally changes only the current context, not weights?
- Correct answer: Retrieval-augmented generation
- Finding: strong. It directly protects the training/RAG/context distinction.

### Glossary And Related Terms

- Current terms: training, pretraining, fine-tuning, inference, RAG, in-context learning.
- Finding: strong coverage, but the card would benefit from clearer on-card grouping: durable weight change, temporary context steering, retrieval, and exceptional online learning.

### Recommendation

Revise. Keep the core distinction, but convert to richer architecture and replace the generic training-loop interaction with a learning-modes sort.

## Card 29: Diffusion vs Autoregression

### Current Content

- Title: Diffusion vs Autoregression
- Subtitle: Denoising is a different generation pattern
- One-sentence definition: Diffusion generation usually starts from noise and denoises step by step.
- Relationship line: Autoregressive LLMs build text token by token; diffusion models refine noise into an image or other output.
- Metaphor: Writing the next word versus developing a photograph out of static.
- Brain bridge: Both systems can feel imaginative, but diffusion denoises a representation while autoregressive text predicts and appends tokens.

### Current Architecture

The distinction is correct and well timed. Like How AI Learns, this card still uses the slimmer schema rather than the richer lesson architecture.

### Visual Aid

- Current visual id: `diffusion`
- Current visual: three denoising grid states with arrows.
- Finding: readable at mobile widths, but it only shows diffusion. It does not visibly contrast denoising with the autoregressive append loop.

### Tiny Interaction

- Current interaction type: `diffusion`
- Current interaction: tap to denoise a grid.
- Finding: useful and calm, but it should eventually include a comparison toggle so learners see "denoise" versus "append one token."

### Checkpoint

- Question: What does a diffusion model usually start with?
- Correct answer: Noise
- Finding: clear and appropriately simple.

### Glossary And Related Terms

- Current terms: diffusion, autoregression.
- Finding: add or surface `generative AI`, `diffusion model`, `denoising`, and `sampling` if the card is expanded. Avoid turning it into an image-model engineering lesson.

### Recommendation

Revise lightly. The copy is correct, but the visual and interaction should show the contrast with autoregression more explicitly.

## Card 30: Multimodal AI

### Current Content

- Title: Multimodal AI
- Subtitle: Multiple media types together
- One-sentence definition: Multimodal AI can represent or process multiple media types, such as text, images, audio, or video.
- Relationship line: Different modalities may use connected encoders, shared vector spaces, or coordinated model components.
- Metaphor: A transit hub where different kinds of information can transfer lines.
- Brain bridge: The human comparison helps because people combine sight, speech, and text; it breaks because machine modalities are engineered representations, not human sensory experience.

### Current Architecture

The distinction is accurate and concise, but still slim. The card should eventually spell out input mode, output mode, representation, and system boundary more clearly.

### Visual Aid

- Current visual id: `multimodal`
- Current visual: text, image, audio, and video nodes connected to a central shared circle.
- Finding: good mental model, but the central `shared` label is tight at mobile size and can read as partially obscured. It also risks implying every multimodal system uses one simple shared vector space.

### Tiny Interaction

- Current interaction type: `multimodal`
- Current interaction: text, image, and audio chips move into a shared representation space.
- Finding: good start, but it omits video/code and does not show input/output combinations.

### Checkpoint

- Question: What does multimodal mean?
- Correct answer: Multiple media types
- Finding: clear and appropriately simple.

### Glossary And Related Terms

- Current terms: multimodal, embedding, vector.
- Finding: add or surface `modality`, `encoder`, `decoder`, `representation`, and `generative AI` if the card is expanded.

### Recommendation

Revise lightly. Preserve the transit-hub metaphor, but make the visual and interaction more precise about multiple media types and engineered representations.

## Card 31: The Perfect Storm

### Current Content

- Title: The Perfect Storm
- Subtitle: Why LLMs arrived now
- One-sentence definition: Modern LLMs became possible when human-created digital data, powerful compute and storage, deep-learning methods, human labor, and economic incentives converged.
- Core explanation: strong. It avoids the "one magic breakthrough" story and names data, GPUs/storage, transformer and deep-learning advances, annotation/evaluation labor, and economic incentives.
- Durable vs temporary note: strong. The storm made durable training possible; ordinary inference still uses trained weights without normally updating them.
- Prompt vs response note: strong. A prompt reaches a system built from the larger storm; the response is still generated one token at a time.
- Misconception: LLMs appeared because of one magic breakthrough.

### Current Architecture

This is the strongest Twilight card. It already uses the richer lesson architecture and is a good bridge from technical mechanics into Midnight Ledger.

### Visual Aid

- Current visual id: `perfect-storm`
- Current visual: Data, Compute, Methods, Labor, and Incentives streams converge into an LLM core.
- Finding: the coded visual is readable and instructionally aligned. It is also the best candidate for a future textless Image 2 scene if the next pass wants stronger atmosphere.

### Tiny Interaction

- Current interaction type: `cloud`
- Current interaction: generic feature cloud with syntax, style, facts, tone, math, risk, meaning.
- Finding: mismatch. The lesson copy says "Spot the storm ingredients," but the interaction does not show data, compute, methods, labor, or incentives.

### Checkpoint

- Question: Which answer best explains why modern LLMs arrived now?
- Correct answer: Data, compute, methods, labor, and incentives converged
- Finding: strong. The distractors avoid hype and myth.

### Glossary And Related Terms

- Current terms: perfect storm, training data, compute, data center, human feedback labor, deep learning, training.
- Finding: strong. Consider surfacing `GPU`, `storage`, `annotation`, `incentives`, and `transformer` only if glossary coverage already supports them.

### Recommendation

Keep and polish. Replace the generic feature-cloud tiny interaction with a storm-ingredient interaction. Add source-review discipline for any v1 historical or infrastructure claims.

## Cross-Stage Notes

- How AI Learns overlaps with earlier training/fine-tuning/RAG lessons. That is acceptable if the card is framed as a map of ways systems are adapted or steered, not as new mechanics.
- Diffusion and Multimodal should stay concise. Their job is to prevent learners from treating all generative AI as ChatGPT-like LLM generation.
- The Perfect Storm should remain a bridge, not a full history chapter.
- No card should add a second checkpoint in Journey.

