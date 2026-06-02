# Curriculum Gaps v0.6

## 1. Which lessons are confusing?

Highest risk: Vectors, Tensors, Attention, MLP, Hidden States, Context Window, RAG and Retrieval, How AI Learns, and Risk vs Myth. These concepts are abstract, easy to anthropomorphize, or central to the durable-versus-temporary distinction.

## 2. Which lessons are redundant?

Tokenization, Token IDs, Embeddings, Vectors, and Tensors are all necessary, but they need cleaner handoffs so they feel like one pipeline rather than repeated "numbers" lessons. Logits, Softmax, and Sampling also belong together as a tight decoding sequence.

## 3. Which lessons are missing brain metaphors?

None in the current Journey. Every lesson includes a Brain Bridge.

## 4. Which lessons are missing metaphor limitations?

None in the current Journey. Every Brain Bridge includes an explicit limitation.

## 5. Which lessons lack visual aids?

None. Every current Journey lesson points to a visualAidId in the catalog.

## 6. Which exercises are embedded in Journey but should move to Play?

No reusable ExerciseShell exercises are currently embedded in Journey. Journey uses tiny interactions and checkpoints; reusable exercises belong in Play/Prompt Run/How AI Learns. Lessons without direct Play mappings today: Two AI Traditions, Pretraining, Fine-Tuning, Prompt vs Response, Vectors, Tensors, Layers, How AI Learns, Diffusion vs Autoregression, and Multimodal AI.

## 7. Where does the app confuse prompt processing with response generation?

The app mostly separates them, but the architecture lessons need stronger return lines to the prompt lifecycle. Weakest prompt/response scores: Two AI Traditions, Vectors, Tensors, Layers, How AI Learns, Diffusion vs Autoregression, and Multimodal AI.

## 8. Where does the app confuse inference with training?

The core distinction is stated well in Training, Pretraining, Fine-Tuning, Inference, Context Window, and How AI Learns. Weaker durable/temporary scores are mainly in mechanism or side-tour lessons where the distinction is not the focus: Two AI Traditions, Tokenization, Token IDs, Tensors, Diffusion vs Autoregression, and Multimodal AI.

## 9. Where does the app imply too much human-like cognition?

Attention, Hidden States, Sampling, Multimodal AI, and Risk vs Myth are the main places to watch. They already include limits, but the rewrite should keep "attention," "choosing," "working memory," and "sensory" language visibly bounded.

## 10. Which glossary terms are missing or weak?

Add or strengthen terms for vocabulary projection, vocabulary cloud, residual connection, normalization, adapter, policy layer, tool use, retrieval corpus, online learning, and evaluation. Existing terms for embedding, hidden state, inference, context window, RAG, and in-context learning are strong.

## 11. Which section order changes would improve learning?

Move Context Window before Attention in the proposed architecture so learners know the visible working set before learning cross-token relevance. RAG and Retrieval is now a current Journey lesson after Context Window; add Brain Metaphor and Its Limits and Model Literate Synthesis as future explicit lessons.

## 12. Which lessons should be split?

Layers should eventually split into Layers and Residuals/Normalization. RAG and Retrieval has now been split out of How AI Learns; keep How AI Learns focused on durable training, temporary steering, retrieval, and online learning. Risk vs Myth may benefit from a short synthesis after the risk card.

## 13. Which lessons should be merged?

Do not merge the current token pipeline lessons yet. Instead, tighten transitions. Diffusion vs Autoregression and Multimodal AI should remain side tours, not replacements for core LLM mechanics.

## 14. Which lessons need better illustrations?

Highest illustration need: Vectors, Tensors, Attention, MLP, Hidden States, Context Window, RAG and Retrieval, How AI Learns, and Risk vs Myth. Tensors, hidden states, context windows, RAG, and How AI Learns especially need visual systems that teach, not just decorate.

## 15. Which lessons should use the dog/cat example?

Use the dog/cat sentence across: Prompt vs Response, Tokenization, Attention, Logits, Softmax, Sampling, Autoregression, and Context Window. It gives one shared sentence for prompt tokens, generated response token, attention reference, logits, softmax, sampling, autoregression, and what falls out of context.
