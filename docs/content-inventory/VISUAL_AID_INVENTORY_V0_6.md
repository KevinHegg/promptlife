# Visual Aid Inventory v0.6

Preferred style: mobile-readable SVG diagrams, CSS 3D only when it clarifies structure, text in HTML where possible, and reduced-motion fallbacks for all movement.

## 1. What Is an LLM?

- visualAidId: llm-overview
- Lesson: What Is an LLM?
- What it teaches: A prompt enters the current context; learned weights shape next-token probabilities.
- Static description: One-page prompt lifecycle: prompt enters, fixed weights process, next token sampled, response grows.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: Optional CSS feature cloud with shallow depth.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: A prompt enters the current context; learned weights shape next-token probabilities.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 2. Two AI Traditions

- visualAidId: traditions
- Lesson: Two AI Traditions
- What it teaches: Symbolic AI follows explicit rules; deep learning uses learned parameters.
- Static description: Split-panel rulebook versus learned landscape, with a small note that systems can combine them.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Symbolic AI follows explicit rules; deep learning uses learned parameters.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 3. Training

- visualAidId: training-loop
- Lesson: Training
- What it teaches: Predict, compare, update weights, repeat.
- Static description: Training loop with predict, compare, loss, update weights, repeat.
- Animation idea: Loop predict, compare, update; pause on the durable weight change.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Predict, compare, update weights, repeat.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 4. Pretraining

- visualAidId: pretraining-rain
- Lesson: Pretraining
- What it teaches: Many prediction updates carve broad capability into model weights.
- Static description: Broad data rain carving durable pathways into a model landscape.
- Animation idea: Loop predict, compare, update; pause on the durable weight change.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Many prediction updates carve broad capability into model weights.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 5. Fine-Tuning

- visualAidId: fine-tune-path
- Lesson: Fine-Tuning
- What it teaches: Targeted examples nudge an already-trained model toward a desired pattern.
- Static description: Targeted trail added onto an existing pretrained terrain.
- Animation idea: Animate a targeted trail over an existing model landscape.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Targeted examples nudge an already-trained model toward a desired pattern.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 6. Inference

- visualAidId: inference-pass
- Lesson: Inference
- What it teaches: Inference creates temporary states while durable weights stay fixed.
- Static description: Forward-pass pipeline with fixed weights underneath and temporary states above.
- Animation idea: Move context through fixed weights and show temporary states fading after the pass.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Inference creates temporary states while durable weights stay fixed.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 7. Prompt vs Response

- visualAidId: prompt-response
- Lesson: Prompt vs Response
- What it teaches: Prompt tokens are given; response tokens are generated and appended.
- Static description: Given prompt cards and newly generated response cards entering the next context together.
- Animation idea: Animate text becoming tokens, IDs, embeddings, then a tensor.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Prompt tokens are given; response tokens are generated and appended.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 8. Tokenization

- visualAidId: tokenization
- Lesson: Tokenization
- What it teaches: Text is split into model-readable chunks before embedding lookup.
- Static description: Tokenizer conveyor splitting a short sentence into uneven chunks.
- Animation idea: Animate text becoming tokens, IDs, embeddings, then a tensor.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Text is split into model-readable chunks before embedding lookup.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 9. Token IDs

- visualAidId: token-ids
- Lesson: Token IDs
- What it teaches: Each token gets a lookup number that points to an embedding row.
- Static description: Token chunks mapped to numeric IDs, then to rows in an embedding table.
- Animation idea: Animate text becoming tokens, IDs, embeddings, then a tensor.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Each token gets a lookup number that points to an embedding row.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 10. Embeddings

- visualAidId: embeddings
- Lesson: Embeddings
- What it teaches: A token ID retrieves a learned starting vector.
- Static description: Lookup table pulling a learned starting vector for one token ID.
- Animation idea: Animate text becoming tokens, IDs, embeddings, then a tensor.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: A token ID retrieves a learned starting vector.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 11. Vectors

- visualAidId: vectors
- Lesson: Vectors
- What it teaches: A vector is a list of numerical features, not a sentence.
- Static description: Many-dimensional feature bars with a warning that labels are simplified.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: Optional feature cloud or vector-space plane.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: A vector is a list of numerical features, not a sentence.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 12. Tensors

- visualAidId: tensors
- Lesson: Tensors
- What it teaches: Tensors organize many token vectors for layer-by-layer processing.
- Static description: Mobile-readable tensor block with token-position and feature axes.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: CSS 3D tensor cube with token and feature axes.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Tensors organize many token vectors for layer-by-layer processing.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 13. Attention

- visualAidId: attention
- Lesson: Attention
- What it teaches: Attention is weighted relevance between token positions.
- Static description: Token nodes with weighted relevance arcs and a plain-language caption.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Attention is weighted relevance between token positions.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 14. MLP

- visualAidId: mlp
- Lesson: MLP
- What it teaches: The MLP reshapes each token position feature vector.
- Static description: Per-token vector forge or feature mixer after attention.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: The MLP reshapes each token position feature vector.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 15. Layers

- visualAidId: layers
- Lesson: Layers
- What it teaches: Repeated blocks refine hidden states while carrying useful signal forward.
- Static description: Transparent layer stack with attention and MLP blocks repeated.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: Transparent layer stack with repeated blocks.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Repeated blocks refine hidden states while carrying useful signal forward.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 16. Hidden States

- visualAidId: hidden-states
- Lesson: Hidden States
- What it teaches: Hidden states are context-shaped vectors created during a forward pass.
- Static description: Same token glowing differently across contexts and layers.
- Animation idea: Move context through fixed weights and show temporary states fading after the pass.
- 3D idea: Layered vector stack showing temporary state changes.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Hidden states are context-shaped vectors created during a forward pass.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 17. Logits

- visualAidId: logits
- Lesson: Logits
- What it teaches: Logits are raw next-token scores before probabilities.
- Static description: Raw candidate scoreboard before softmax.
- Animation idea: Animate raw scores becoming probabilities, one token selected, then appended.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Logits are raw next-token scores before probabilities.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 18. Softmax

- visualAidId: softmax
- Lesson: Softmax
- What it teaches: Softmax converts raw scores into probabilities that sum to one.
- Static description: Funnel converting raw scores into probabilities that sum to one.
- Animation idea: Animate raw scores becoming probabilities, one token selected, then appended.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Softmax converts raw scores into probabilities that sum to one.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 19. Sampling

- visualAidId: sampling
- Lesson: Sampling
- What it teaches: Sampling chooses one token from the probability cloud.
- Static description: Weighted vocabulary cloud with one selected token.
- Animation idea: Animate raw scores becoming probabilities, one token selected, then appended.
- 3D idea: Vocabulary cloud with depth only if labels remain readable.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Sampling chooses one token from the probability cloud.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 20. Autoregression

- visualAidId: autoregression
- Lesson: Autoregression
- What it teaches: The chosen token is appended, then the model runs again.
- Static description: Loop diagram: score, sample, append, run again.
- Animation idea: Animate raw scores becoming probabilities, one token selected, then appended.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: The chosen token is appended, then the model runs again.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 21. Context Window

- visualAidId: context-window
- Lesson: Context Window
- What it teaches: Only visible context can influence the next token.
- Static description: Limited stack of cards where older cards fall out.
- Animation idea: Slide cards into a limited window and let older cards fall out.
- 3D idea: CSS 3D card stack showing bounded visible context.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Only visible context can influence the next token.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 22. RAG and Retrieval

- visualAidId: rag-retrieval
- Lesson: RAG and Retrieval
- What it teaches: Retrieved document cards enter the context before response tokens are generated.
- Static description: Three lanes: user question, retriever searches a document shelf, retrieved cards enter the context window, and the LLM generates response tokens.
- Animation idea: Slide cards into a limited window and let older cards fall out.
- 3D idea: Transparent context tray; search pulls document cards from a library shelf and drops them into the tray before the model runs.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Retrieved document cards enter the context before response tokens are generated.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 23. How AI Learns

- visualAidId: ai-learns
- Lesson: How AI Learns
- What it teaches: Durable training, retrieval, and temporary steering change different things.
- Static description: Matrix of durable weight change, temporary context steering, and retrieval.
- Animation idea: Sort cards into mechanism-backed risks and myths.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Durable training, retrieval, and temporary steering change different things.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 24. Diffusion vs Autoregression

- visualAidId: diffusion
- Lesson: Diffusion vs Autoregression
- What it teaches: Diffusion refines noise step by step instead of generating text token by token.
- Static description: Denoising sequence beside a next-token text loop.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Diffusion refines noise step by step instead of generating text token by token.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

## 25. Multimodal AI

- visualAidId: multimodal
- Lesson: Multimodal AI
- What it teaches: Different media types can connect through learned representations.
- Static description: Text, image, audio, and video paths meeting in a shared representation hub.
- Animation idea: Use gentle step highlighting across the mechanism without decorative motion.
- 3D idea: Shallow hub diagram; avoid complex 3D media objects.
- Why 3D helps or does not help: A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Different media types can connect through learned representations.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: medium

## 26. Risk vs Myth

- visualAidId: risk
- Lesson: Risk vs Myth
- What it teaches: Clear mechanisms help separate practical risk from magical stories.
- Static description: Risk sorting cards linked to mechanisms rather than fear language.
- Animation idea: Sort cards into mechanism-backed risks and myths.
- 3D idea: None recommended for v0.6.
- Why 3D helps or does not help: A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.
- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: Clear mechanisms help separate practical risk from magical stories.
- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.
- Implementation complexity: low

