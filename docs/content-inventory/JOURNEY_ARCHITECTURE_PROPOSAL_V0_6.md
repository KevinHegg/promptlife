# Journey Architecture Proposal v0.6

Goal: keep the day-in-the-life through-line while making the curriculum more explicit about what changes weights, what happens during inference, and where prompt tokens become response tokens.

## 1. What Is an LLM?

- One-sentence definition: A large language model is a learned system that predicts likely next tokens from the context it can see.
- Core explanation: Start with the simplest full loop: context enters, fixed weights compute scores, one token is selected, and the response grows.
- How it connects: Sets up why training matters before the prompt arrives and why inference matters once it does.
- Metaphor: A very large autocomplete engine with learned structure, not a mind or a database.
- Brain metaphor: Many small signals combine into useful patterns.
- Where brain metaphor breaks: No lived body, feelings, awareness, or personal goals.
- Visual aid idea: Prompt lifecycle overview with weights, logits, sampling, and append-repeat.
- Checkpoint misconception: An LLM is conscious or simply a database lookup.
- Exercise placement: Journey checkpoint; Play can use Pick the Next Token.

## 2. Two AI Traditions

- One-sentence definition: Symbolic AI uses explicit rules; deep learning learns patterns by adjusting weights.
- Core explanation: LLMs mainly come from learned deep-learning systems, though useful products may still wrap them with rules.
- How it connects: Explains why the model can be flexible before showing how training shapes that flexibility.
- Metaphor: A rulebook beside a weather system of learned relationships.
- Brain metaphor: Practice can shape future behavior in a loose analogy.
- Where brain metaphor breaks: The model is optimized mathematically, not practicing with intention.
- Visual aid idea: Split panel: rule path and learned landscape.
- Checkpoint misconception: LLMs are hand-coded rulebooks.
- Exercise placement: Journey checkpoint only.

## 3. Training

- One-sentence definition: Training updates weights by predicting, measuring error, and adjusting parameters.
- Core explanation: A training loop uses many examples and a loss signal to make durable changes to the model.
- How it connects: Creates the durable weights that inference later uses without rewriting.
- Metaphor: Tuning an instrument before a performance.
- Brain metaphor: Repeated experience can shape later behavior.
- Where brain metaphor breaks: No reflection or personal memory; weights are changed by optimization.
- Visual aid idea: Predict, compare, loss, update weights, repeat.
- Checkpoint misconception: Every chat message trains the model.
- Exercise placement: Play exercise: Training Nudge.

## 4. Pretraining

- One-sentence definition: Pretraining is broad early training that builds general language capability through durable weight updates.
- Core explanation: The model predicts tokens across vast data, so many tiny updates carve broad patterns into its parameters.
- How it connects: Gives the base model its broad starting capability before targeted fine-tuning.
- Metaphor: Carving roads through a huge landscape.
- Brain metaphor: Like broad education only in the sense that earlier exposure affects later performance.
- Where brain metaphor breaks: Not human understanding and not a perfect memory of all sources.
- Visual aid idea: Broad data rain shaping a terrain.
- Checkpoint misconception: Pretraining stores an exact copy of every document.
- Exercise placement: Journey checkpoint; Play can reuse Durable or Temporary.

## 5. Fine-Tuning

- One-sentence definition: Fine-tuning is targeted additional training after pretraining.
- Core explanation: Examples, preferences, or domain data nudge future behavior toward a task or style.
- How it connects: Narrows or aligns broad pretrained capability before deployment or between releases.
- Metaphor: Adding trails to an existing terrain.
- Brain metaphor: A coach shaping performance style.
- Where brain metaphor breaks: The model is not adopting values or intentions.
- Visual aid idea: Targeted path over pretrained landscape.
- Checkpoint misconception: Fine-tuning is the same thing as a better prompt.
- Exercise placement: Journey checkpoint; Play can reuse Durable or Temporary.

## 6. Inference

- One-sentence definition: Inference is normal model use: fixed weights process current context without durable updates.
- Core explanation: The prompt enters a forward pass; temporary activations change, but model weights normally stay fixed.
- How it connects: Begins the live day in the life of a prompt.
- Metaphor: Using a map, not redrawing it.
- Brain metaphor: It can feel like thinking because internal states change temporarily.
- Where brain metaphor breaks: Temporary hidden states are not beliefs or memories.
- Visual aid idea: Forward pass with fixed weights underneath.
- Checkpoint misconception: Inference secretly trains the model.
- Exercise placement: Play exercise: Training Nudge.

## 7. Prompt vs Response

- One-sentence definition: The prompt is supplied context; the response is generated tokens added afterward.
- Core explanation: The response grows one token at a time, and the response-so-far becomes part of the next context.
- How it connects: Prepares learners to track prompt tokens and response tokens through tokenization and decoding.
- Metaphor: Given cards on a table, then new cards added one by one.
- Brain metaphor: Like continuing a sentence after reading a prompt.
- Where brain metaphor breaks: The model samples from probabilities rather than deciding what it means to say.
- Visual aid idea: Prompt cards plus generated response cards in one current context.
- Checkpoint misconception: The full response appears all at once.
- Exercise placement: Play exercise: Prompt or Response?

## 8. Tokenization

- One-sentence definition: Tokenization splits text into chunks the model can process.
- Core explanation: Both prompt text and response-so-far become token chunks before numerical lookup.
- How it connects: Turns visible language into token IDs.
- Metaphor: Parcels entering a conveyor.
- Brain metaphor: Like hearing parts of a sentence before interpretation.
- Where brain metaphor breaks: Tokenizer chunks are not human concepts or phonemes.
- Visual aid idea: Dog/cat sentence split into uneven token chunks.
- Checkpoint misconception: A token is always a whole word.
- Exercise placement: Play exercise: Prompt or Response?

## 9. Token IDs

- One-sentence definition: A token ID is a number used to look up a token starting vector.
- Core explanation: The ID is a key, not a meaning; it points to a row in the embedding table.
- How it connects: Bridges tokens to embeddings.
- Metaphor: A library call number.
- Brain metaphor: Like recognizing a familiar symbol only very loosely.
- Where brain metaphor breaks: The number itself is not understanding.
- Visual aid idea: Token chunk to ID to embedding row.
- Checkpoint misconception: The ID contains the token meaning.
- Exercise placement: Play exercise: Prompt or Response?

## 10. Embeddings

- One-sentence definition: An embedding is a token ID's learned starting vector.
- Core explanation: The token starts as a learned vector before the current context reshapes it.
- How it connects: Introduces vectors and hidden states as different moments in the same path.
- Metaphor: A starting address in a meaning cloud.
- Brain metaphor: Like a starting association with a word.
- Where brain metaphor breaks: Not a definition, memory, or thought.
- Visual aid idea: Embedding table row pulled into the current context tensor.
- Checkpoint misconception: Embeddings are the same as hidden states.
- Exercise placement: Play exercise: Prompt or Response?

## 11. Vectors

- One-sentence definition: A vector is a list of numbers carrying learned features.
- Core explanation: Vectors let many fuzzy features be computed at once.
- How it connects: Embeddings and hidden states are vectors; tensors organize many vectors.
- Metaphor: A coordinate in many-dimensional space.
- Brain metaphor: Like a bundle of associations.
- Where brain metaphor breaks: It is a numerical representation, not a conscious concept.
- Visual aid idea: Feature bars with simplified labels.
- Checkpoint misconception: Each vector dimension has a neat English meaning.
- Exercise placement: Play placement recommended.

## 12. Tensors

- One-sentence definition: A tensor is an organized block of numbers.
- Core explanation: The model carries many token vectors together through layers as shaped numerical arrays.
- How it connects: Sets up the transformer layer stack.
- Metaphor: A stack of spreadsheets.
- Brain metaphor: Like organizing many signals at once.
- Where brain metaphor breaks: Not a mental image or private thought.
- Visual aid idea: Token-by-feature tensor block.
- Checkpoint misconception: Tensors are just advanced vocabulary with no practical role.
- Exercise placement: Journey checkpoint; optional Play sorting later.

## 13. Context Window

- One-sentence definition: The context window is the limited visible input the model can currently use.
- Core explanation: Prompt, retrieved material, conversation history, and response-so-far matter only while they remain in context.
- How it connects: Before attention, learners need to know what positions attention can see.
- Metaphor: A moving spotlight over a growing train.
- Brain metaphor: Loosely like working memory.
- Where brain metaphor breaks: Not permanent memory; what falls out cannot be directly attended to.
- Visual aid idea: Bounded stack of cards with older cards falling out.
- Checkpoint misconception: Context is the same as durable memory.
- Exercise placement: Play exercise: Context Window: What Fell Out?

## 14. RAG and Retrieval

- One-sentence definition: Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model context before generating a response.
- Core explanation: A RAG system adds a search step: it looks up documents, passages, or records, then gives retrieved snippets to the model as part of the prompt/context. The model then generates using both learned weights and retrieved context.
- How it connects: RAG depends on the context window. Retrieved text becomes input context; attention, hidden states, logits, softmax, sampling, and autoregression still do the response generation.
- Metaphor: Open-book exam: the model gets notes before answering.
- Brain metaphor: Like looking something up in a book or notes before answering.
- Where brain metaphor breaks: A human can judge sources, remember what was read, and understand trust in richer ways. The model still generates likely tokens from retrieved context and learned weights.
- Visual aid idea: Three lanes: user question, retriever searches a document shelf, retrieved cards enter a transparent context tray, then the model generates response tokens.
- Checkpoint misconception: RAG permanently learned the document, has access to all files, searched the web by itself, is fine-tuning, eliminates hallucinations, or guarantees truth.
- Exercise placement: Play exercise: Open Book or Learned?

## 15. Attention

- One-sentence definition: Attention assigns weighted relevance between token positions.
- Core explanation: Each token position can use information from other visible positions in the current context.
- How it connects: Uses the context window and feeds reshaped information into layer computations.
- Metaphor: Spotlights over useful tokens.
- Brain metaphor: Some context matters more than other context.
- Where brain metaphor breaks: Not human attention, awareness, or desire.
- Visual aid idea: Weighted arcs between dog/cat sentence tokens.
- Checkpoint misconception: Attention means the model is conscious or focused like a person.
- Exercise placement: Play exercise: Attention Is Relevance.

## 16. MLP

- One-sentence definition: An MLP reshapes each token position's feature vector.
- Core explanation: After attention mixes information across positions, the MLP transforms features within each position.
- How it connects: Pairs with attention inside a transformer layer.
- Metaphor: A feature forge.
- Brain metaphor: Like a processing step after using relevant context.
- Where brain metaphor breaks: A learned function over vectors, not a believing neuron.
- Visual aid idea: Attention arrows feeding per-token feature forge.
- Checkpoint misconception: The MLP does the same job as attention.
- Exercise placement: Play exercise: MLP Feature Reshape.

## 17. Layers

- One-sentence definition: Layers are repeated blocks that refine hidden states.
- Core explanation: Layer after layer, attention and MLP operations update temporary token representations.
- How it connects: Shows how embeddings become richer hidden states.
- Metaphor: Editing passes over a draft.
- Brain metaphor: Like stages of processing.
- Where brain metaphor breaks: Not a human chain of thought.
- Visual aid idea: Transparent stack with repeated attention and MLP blocks.
- Checkpoint misconception: Layers are a visible reasoning transcript.
- Exercise placement: Journey checkpoint; Play placement later.

## 18. Hidden States

- One-sentence definition: A hidden state is a temporary context-shaped vector for a token at a layer.
- Core explanation: It begins from an embedding and changes as layers process the current context.
- How it connects: Final hidden states lead to logits.
- Metaphor: A scratchpad of numbers.
- Brain metaphor: Like temporary working memory.
- Where brain metaphor breaks: Not permanent memory or private English text.
- Visual aid idea: Same token changing across contexts and layers.
- Checkpoint misconception: Hidden states are secret saved memories.
- Exercise placement: Play exercise: MLP Feature Reshape.

## 19. Logits

- One-sentence definition: Logits are raw next-token scores.
- Core explanation: The final hidden state is projected into one raw score per candidate token.
- How it connects: Softmax turns these raw scores into probabilities.
- Metaphor: A scoreboard before odds.
- Brain metaphor: Like considering options only metaphorically.
- Where brain metaphor breaks: No intent; just numerical scores.
- Visual aid idea: Raw candidate score board.
- Checkpoint misconception: Logits are already probabilities.
- Exercise placement: Play exercise: Softmax Funnel.

## 20. Softmax

- One-sentence definition: Softmax converts raw scores into probabilities that sum to one.
- Core explanation: It makes the candidate token scores comparable as a distribution.
- How it connects: Sampling chooses one token from this distribution.
- Metaphor: A funnel from points to odds.
- Brain metaphor: Like relative chances, not confidence.
- Where brain metaphor breaks: Probabilities are not truth or desire.
- Visual aid idea: Score funnel into probability bars.
- Checkpoint misconception: High probability means factual truth.
- Exercise placement: Play exercise: Softmax Funnel.

## 21. Sampling

- One-sentence definition: Sampling chooses one next token from the probability distribution.
- Core explanation: Decoding settings shape how narrow or varied the choice can be.
- How it connects: The chosen token is appended for autoregression.
- Metaphor: A weighted bowl of token tiles.
- Brain metaphor: Like choosing a word only loosely.
- Where brain metaphor breaks: Selection follows a decoding rule, not intention.
- Visual aid idea: Vocabulary cloud with one token selected.
- Checkpoint misconception: Sampling is random in a meaningless way.
- Exercise placement: Play exercise: Pick the Next Token.

## 22. Autoregression

- One-sentence definition: Autoregression generates text by next token, append, repeat.
- Core explanation: Every generated token becomes part of the next input context.
- How it connects: Completes the response-generation loop.
- Metaphor: A train adding one car at a time.
- Brain metaphor: Like continuing a thought step by step.
- Where brain metaphor breaks: No hidden full plan is required.
- Visual aid idea: Loop: score, sample, append, run again.
- Checkpoint misconception: The model writes the whole answer internally all at once.
- Exercise placement: Play exercise: Prompt or Response?

## 23. How AI Learns

- One-sentence definition: AI behavior can change through durable training, retrieval, or temporary steering.
- Core explanation: Different mechanisms change weights, context, or instructions, and those differences matter for privacy and trust.
- How it connects: Reviews the durable-versus-temporary line after the full inference loop.
- Metaphor: Revising the textbook versus bringing notes to an open-book exam.
- Brain metaphor: Learning means prior experience changes later behavior.
- Where brain metaphor breaks: In-context examples are not personal learning.
- Visual aid idea: Three-column mechanism matrix.
- Checkpoint misconception: Any changed behavior means the model learned permanently.
- Exercise placement: Journey checkpoint plus Play sorting.

## 24. Diffusion vs Autoregression

- One-sentence definition: Diffusion denoises representations step by step instead of appending text tokens.
- Core explanation: Many image models start from noise and refine; text LLMs usually append next tokens.
- How it connects: Prevents overgeneralizing one generative mechanism to all AI.
- Metaphor: Developing a photo from static versus writing the next word.
- Brain metaphor: Both can produce new outputs.
- Where brain metaphor breaks: The mechanisms are different mathematical processes.
- Visual aid idea: Side-by-side denoise sequence and token loop.
- Checkpoint misconception: All generative AI works like ChatGPT text generation.
- Exercise placement: Journey checkpoint.

## 25. Multimodal AI

- One-sentence definition: Multimodal AI represents or processes multiple media types together.
- Core explanation: Text, images, audio, and video can be encoded into connected representations or coordinated model components.
- How it connects: Shows that the vector idea extends beyond text while mechanisms still differ.
- Metaphor: A transit hub for media types.
- Brain metaphor: People combine senses naturally.
- Where brain metaphor breaks: Machine modalities are engineered representations, not human sensory experience.
- Visual aid idea: Media paths meeting in a shared representation hub.
- Checkpoint misconception: Multimodal means the model has human senses.
- Exercise placement: Journey checkpoint.

## 26. Brain Metaphor and Its Limits

- One-sentence definition: Brain metaphors help only when the boundaries are explicit.
- Core explanation: Neurons, attention, learning, and memory are useful metaphors but can mislead when treated literally.
- How it connects: Prepares learners for risk literacy without fear or hype.
- Metaphor: A map with warning labels.
- Brain metaphor: The lesson is about using brain metaphors responsibly.
- Where brain metaphor breaks: No consciousness, feelings, lived body, or personal goals.
- Visual aid idea: Helpful comparison cards paired with break-point cards.
- Checkpoint misconception: Brain-like words imply human-like mind.
- Exercise placement: Play exercise: Brain Metaphor Boundary.

## 27. Risk vs Myth

- One-sentence definition: Risk literacy separates practical harms from magical stories about models.
- Core explanation: Real risks come from data exposure, unreliable outputs, bias, integrations, incentives, and over-reliance.
- How it connects: Applies the whole mechanism model to institutional choices.
- Metaphor: A campus safety map.
- Brain metaphor: Brain metaphors can make risks memorable.
- Where brain metaphor breaks: Do not infer intent or secret self-training from fluent text.
- Visual aid idea: Risk cards sorted by mechanism.
- Checkpoint misconception: The main risk is that the chat model becomes conscious.
- Exercise placement: Play exercise: Open Book or Learned?

## 28. Model Literate Synthesis

- One-sentence definition: Model literacy means explaining what the system does, what it does not do, and where risk actually lives.
- Core explanation: Learners practice the full path from durable training to temporary inference and real-world decision making.
- How it connects: Closes the day in the life of a prompt with a shareable mental model.
- Metaphor: A field guide for the AI era.
- Brain metaphor: People use models of systems to act wisely.
- Where brain metaphor breaks: Understanding mechanisms does not make the model human.
- Visual aid idea: Prompt lifecycle map with real-versus-myth overlays.
- Checkpoint misconception: Either fear or hype is enough to understand AI.
- Exercise placement: Journey synthesis reflection; no competitive game.

