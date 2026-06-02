# Prompt Life Content Inventory v0.6

Generated: 2026-06-02

Scope: 26 Journey lessons. Stage options used: pretraining, fine-tuning, inference, prompt processing, response generation, current context, architecture, risk/policy.

Note: Journey currently renders tiny lesson interactions and checkpoint/reflection flows. Reusable exercises remain in Play, Prompt Run, and How AI Learns rather than being embedded in Journey cards.

## 1. What Is an LLM? (what-is-llm)

- Lesson id: what-is-llm
- Section: Before Morning
- Title: What Is an LLM?
- Current subtitle: A learned next-token prediction system
- Current definition: A large language model is a learned system that predicts likely next tokens from the context it can see.
- Current core explanation: Where: It sits between the current input context and the next response token. Why: This definition lowers the mystery: the model is powerful because training shaped many weights, not because it has a hidden mind.
- Current relationship/how-it-connects text: During inference, the current context enters a forward pass, one generated response token is chosen, and that token is appended before the next pass.
- Current metaphor: A very large autocomplete engine with learned structure, not a mind or a database.
- Current brain metaphor: Like a brain, many small signals can combine into useful patterns.
- Current brain metaphor limitation: Unlike a brain, an LLM has no lived body, feelings, personal goals, or awareness.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: llm-overview: Prompt to Prediction - A prompt enters the current context; learned weights shape next-token probabilities.
- Current exercise: Journey: none rendered. Play/legacy mapping: pick-next-token - Pick the Next Token. Goal: Choose a plausible next token from context.
- Current checkpoint question: Which description is most accurate?
- Correct answer: A learned prediction system
- Incorrect answers: A conscious reader; A hand-written rulebook
- Feedback text: Correct feedback: LLMs use learned weights to predict and sample tokens. That is powerful, but it is not consciousness. Incorrect feedback: A conscious reader: Not quite. An LLM processes patterns and probabilities; it does not have awareness. A hand-written rulebook: Not quite. That describes symbolic or rule-based AI. An LLM is a learned prediction system.
- Glossary terms used: prompt, response, token, weight, inference
- Stage of model process: architecture
- Known confusion risk: Next-token prediction can sound trivial unless the role of learned weights and repeated inference is made concrete.
- Missing explanation: Add a concrete one-prompt trace that shows context, weights, logits, sampling, and append-repeat at a glance.
- Illustration needed: One-page prompt lifecycle: prompt enters, fixed weights process, next token sampled, response grows.
- Rewrite priority: low

## 2. Two AI Traditions (history)

- Lesson id: history
- Section: Before Morning
- Title: Two AI Traditions
- Current subtitle: Rules versus learned patterns
- Current definition: Symbolic AI manipulates explicit rules and symbols; deep learning adjusts many weights until useful patterns are captured.
- Current core explanation: Where: LLMs mainly come from the deep-learning tradition, even when they imitate rule-like reasoning in language. Why: The distinction explains why LLMs can be flexible and fluent without being hand-programmed rule by rule.
- Current relationship/how-it-connects text: A prompt is not matched against one fixed rulebook; it is processed by learned parameters that were shaped across many examples.
- Current metaphor: A rulebook versus a weather system of learned relationships.
- Current brain metaphor: The learned-pattern tradition is loosely like practice shaping future behavior.
- Current brain metaphor limitation: The model is not practicing with intention; training is an optimization process over data.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: traditions: Rules and Learned Patterns - Symbolic AI follows explicit rules; deep learning uses learned parameters.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: Which phrase best describes the LLM tradition?
- Correct answer: A learned prediction machine
- Incorrect answers: A fixed rulebook; A spreadsheet macro
- Feedback text: Correct feedback: The model was not hand-coded rule by rule; training shaped its weights from examples. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: pretraining, training, symbolic AI, deep learning
- Stage of model process: architecture
- Known confusion risk: Learners may read rules versus learned patterns as a total replacement story instead of two still-useful traditions.
- Missing explanation: Name one place rules still matter, such as policies, tool routing, or validation around learned models.
- Illustration needed: Split-panel rulebook versus learned landscape, with a small note that systems can combine them.
- Rewrite priority: medium

## 3. Training (training)

- Lesson id: training
- Section: Before Morning
- Title: Training
- Current subtitle: Prediction error updates weights
- Current definition: Training uses examples, predicts targets such as next tokens, measures error, and durably updates model weights.
- Current core explanation: Where: It happens before or outside ordinary use, in a separate optimization process. Why: Training is where durable capability is installed into the model.
- Current relationship/how-it-connects text: Training changes parameters; inference uses those parameters to generate response tokens without normally rewriting them.
- Current metaphor: Practicing a piece until the instrument settings are tuned before the performance.
- Current brain metaphor: It is fair to say repeated experience shapes later behavior.
- Current brain metaphor limitation: The model has no intention or memory of a lesson; weights are adjusted by math, not reflection.
- Prompt/response clarity note: This happens before ordinary prompting; it can change future behavior by updating weights rather than producing one live response.
- Current visual aid: training-loop: Training Loop - Predict, compare, update weights, repeat.
- Current exercise: Journey: none rendered. Play/legacy mapping: training-nudge - Training Nudge. Goal: Choose when Update weights belongs.
- Current checkpoint question: What makes training different from inference?
- Correct answer: Training durably updates weights
- Incorrect answers: Training reads only the context window; Training samples the final token
- Feedback text: Correct feedback: The durable update is the key distinction. Inference is a forward pass using existing weights. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: training, weight, parameter, inference, forward pass
- Stage of model process: pretraining
- Known confusion risk: Ordinary chat can be mistaken for training unless durable weight updates are foregrounded.
- Missing explanation: Show the loss signal and backprop update as the step that ordinary inference lacks.
- Illustration needed: Training loop with predict, compare, loss, update weights, repeat.
- Rewrite priority: low

## 4. Pretraining (pretraining)

- Lesson id: pretraining
- Section: Before Morning
- Title: Pretraining
- Current subtitle: Broad durable learning before normal use
- Current definition: Pretraining is broad early training that repeatedly predicts tokens across large datasets and durably updates model weights.
- Current core explanation: Where: It happens before a general model is released for everyday prompting. Why: Pretraining gives the model broad language patterns, factual associations, styles, and task structures.
- Current relationship/how-it-connects text: Pretraining changes the model durably; inference only uses the weights that already exist.
- Current metaphor: Billions of tiny nudges carving paths through a vast landscape.
- Current brain metaphor: It resembles broad education in the loose sense that later performance depends on prior exposure.
- Current brain metaphor limitation: The model does not understand lessons the way a person does; it stores learned statistical structure in parameters.
- Prompt/response clarity note: This happens before ordinary prompting; it can change future behavior by updating weights rather than producing one live response.
- Current visual aid: pretraining-rain: Broad Pretraining - Many prediction updates carve broad capability into model weights.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: During pretraining, do model weights change?
- Correct answer: Yes
- Incorrect answers: No; Only inside one chat
- Feedback text: Correct feedback: Pretraining is a durable weight-changing process. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: pretraining, training, inference
- Stage of model process: pretraining
- Known confusion risk: Broad exposure can be misread as verbatim memorization of every source document.
- Missing explanation: Clarify that broad datasets shape statistical patterns without guaranteeing source recall or truth.
- Illustration needed: Broad data rain carving durable pathways into a model landscape.
- Rewrite priority: low

## 5. Fine-Tuning (fine-tuning)

- Lesson id: fine-tuning
- Section: Before Morning
- Title: Fine-Tuning
- Current subtitle: Targeted durable shaping
- Current definition: Fine-tuning is additional targeted training on examples, preferences, or domain data after broad pretraining.
- Current core explanation: Where: It happens after pretraining and before or between deployment cycles. Why: Fine-tuning can make future responses more helpful, specialized, or aligned with a task.
- Current relationship/how-it-connects text: Pretraining builds broad capability; fine-tuning can durably change weights or add adapter weights so future responses follow a desired pattern.
- Current metaphor: Carving useful trails through an already huge terrain.
- Current brain metaphor: It is a little like coaching a person toward a style of performance.
- Current brain metaphor limitation: The model is not adopting values or intentions; the output pattern is being optimized.
- Prompt/response clarity note: This happens before or between deployments; it changes future response patterns, not the current response token by token.
- Current visual aid: fine-tune-path: Fine-Tuning Path - Targeted examples nudge an already-trained model toward a desired pattern.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: During ordinary inference, do model weights durably update?
- Correct answer: No
- Incorrect answers: Yes; Always after every prompt
- Feedback text: Correct feedback: Inference computes hidden states and next-token probabilities, but it does not normally change weights. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: fine-tuning, pretraining, inference, prompt, response
- Stage of model process: fine-tuning
- Known confusion risk: Fine-tuning may be confused with prompting, system messages, or one-off personalization.
- Missing explanation: Distinguish full fine-tuning, adapter-style updates, and instruction/policy tuning without adding too much detail.
- Illustration needed: Targeted trail added onto an existing pretrained terrain.
- Rewrite priority: low

## 6. Inference (inference)

- Lesson id: inference
- Section: Before Morning
- Title: Inference
- Current subtitle: A forward pass, not a memory update
- Current definition: Inference is normal model use: fixed weights process the current context to generate response tokens without durable weight updates.
- Current core explanation: Where: It happens every time a deployed model answers a prompt. Why: This is the line between using a trained model and training a model.
- Current relationship/how-it-connects text: Each forward pass turns the current context into next-token scores; decoding chooses one generated token for the response.
- Current metaphor: Using a map to choose a route, not redrawing the map.
- Current brain metaphor: It can feel like thinking because internal representations change temporarily.
- Current brain metaphor limitation: Those hidden states are temporary computations, not memories, beliefs, or learning.
- Prompt/response clarity note: This is the live prompt-to-response path: fixed weights process current context and generate response tokens.
- Current visual aid: inference-pass: Forward Pass - Inference creates temporary states while durable weights stay fixed.
- Current exercise: Journey: none rendered. Play/legacy mapping: training-nudge - Training Nudge. Goal: Choose when Update weights belongs.
- Current checkpoint question: What changes during ordinary inference?
- Correct answer: Temporary hidden states
- Incorrect answers: The model weights permanently; The training dataset
- Feedback text: Correct feedback: Inference creates temporary internal vectors for this run, then discards or replaces them. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: inference, forward pass, prompt, response, hidden state, logits
- Stage of model process: inference
- Known confusion risk: Temporary hidden states may be mistaken for new memories or weight changes.
- Missing explanation: Make the forward pass tangible: fixed weights plus temporary activations produce one set of next-token scores.
- Illustration needed: Forward-pass pipeline with fixed weights underneath and temporary states above.
- Rewrite priority: low

## 7. Prompt vs Response (prompt-response)

- Lesson id: prompt-response
- Section: Before Morning
- Title: Prompt vs Response
- Current subtitle: Given context versus generated tokens
- Current definition: The prompt is the input context supplied to the model; the response is the sequence of tokens the model generates after reading it.
- Current core explanation: Where: Prompt tokens are present before the next token is chosen; response tokens are added one at a time as generation proceeds. Why: The distinction prevents a common myth that the model writes a full answer all at once.
- Current relationship/how-it-connects text: Each generated response token is appended to the context, so it can influence the next forward pass.
- Current metaphor: Given cards on a table, then new cards added one at a time.
- Current brain metaphor: It resembles a person continuing a sentence after reading a prompt.
- Current brain metaphor limitation: The model is not deciding what it means to say; it samples from learned next-token probabilities.
- Prompt/response clarity note: This card should stay explicit that prompt tokens and response-so-far tokens enter the same current context before the next token is chosen.
- Current visual aid: prompt-response: Prompt vs Response - Prompt tokens are given; response tokens are generated and appended.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: What happens after one response token is generated?
- Correct answer: It is appended to the context
- Incorrect answers: The whole answer appears at once; The model permanently learns it
- Feedback text: Correct feedback: The response grows by next token, append, repeat. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: prompt, response, prompt tokens, response tokens, generated token, context window
- Stage of model process: prompt processing
- Known confusion risk: Learners may think the whole answer appears at once instead of being generated token by token.
- Missing explanation: Add the response-so-far as a visible part of the next input context.
- Illustration needed: Given prompt cards and newly generated response cards entering the next context together.
- Rewrite priority: low

## 8. Tokenization (tokens)

- Lesson id: tokens
- Section: Morning Commute
- Title: Tokenization
- Current subtitle: Text becomes chunks
- Current definition: Tokenization splits prompts and generated responses into chunks the model can represent as token IDs.
- Current core explanation: Where: It happens before embedding lookup and before the transformer layers process the input. Why: Models do not carry raw English sentences through their layers; they carry token IDs and numerical vectors.
- Current relationship/how-it-connects text: Prompt tokens and earlier response tokens in the input context become token IDs, embeddings, tensors, and temporary hidden states.
- Current metaphor: Parcels on a conveyor belt entering the model.
- Current brain metaphor: It loosely resembles hearing a sentence as parts before interpreting it.
- Current brain metaphor limitation: The parts are tokenizer chunks, not human phonemes, concepts, or meanings.
- Prompt/response clarity note: This card should stay explicit that prompt tokens and response-so-far tokens enter the same current context before the next token is chosen.
- Current visual aid: tokenization: Text to Tokens - Text is split into model-readable chunks before embedding lookup.
- Current exercise: Journey: none rendered. Play/legacy mapping: prompt-or-response-label - Prompt or Response?. Goal: Practice telling given prompt tokens apart from a generated response token.
- Current checkpoint question: What comes right after text is split into tokens?
- Correct answer: Token IDs and embedding lookup
- Incorrect answers: Softmax; A finished answer
- Feedback text: Correct feedback: Prompt tokens and generated response tokens both map to IDs, and IDs retrieve learned embedding vectors. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: token, prompt tokens, response tokens, token-id, embedding
- Stage of model process: prompt processing
- Known confusion risk: Tokens may be mistaken for whole words or human concepts.
- Missing explanation: Show that token boundaries can be word pieces, punctuation, or spaces, not necessarily words.
- Illustration needed: Tokenizer conveyor splitting a short sentence into uneven chunks.
- Rewrite priority: medium

## 9. Token IDs (token-ids)

- Lesson id: token-ids
- Section: Morning Commute
- Title: Token IDs
- Current subtitle: Chunks become lookup numbers
- Current definition: A token ID is the number assigned to a token so the model can look up its learned starting vector.
- Current core explanation: Where: It sits between tokenization and the embedding table. Why: The ID is the bridge from text chunks to the learned numerical space the model uses.
- Current relationship/how-it-connects text: Prompt tokens and already-generated response tokens use token IDs when they are part of the current input context.
- Current metaphor: A library call number that points to the right shelf in the embedding table.
- Current brain metaphor: The lookup step is faintly like recognizing a familiar symbol.
- Current brain metaphor limitation: The number itself is not understanding; it is a key into a learned table.
- Prompt/response clarity note: This card should stay explicit that prompt tokens and response-so-far tokens enter the same current context before the next token is chosen.
- Current visual aid: token-ids: Token IDs - Each token gets a lookup number that points to an embedding row.
- Current exercise: Journey: none rendered. Play/legacy mapping: prompt-or-response-label - Prompt or Response?. Goal: Practice telling given prompt tokens apart from a generated response token.
- Current checkpoint question: Why does the model need token IDs?
- Correct answer: To look up embeddings
- Incorrect answers: To store a permanent memory; To skip tensors
- Feedback text: Correct feedback: Token IDs connect text chunks to learned embedding vectors. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: token-id, prompt tokens, response tokens, embedding
- Stage of model process: prompt processing
- Known confusion risk: The ID can be mistaken for meaning rather than a lookup key.
- Missing explanation: Make the tokenizer and embedding table two separate pieces in the diagram.
- Illustration needed: Token chunks mapped to numeric IDs, then to rows in an embedding table.
- Rewrite priority: low

## 10. Embeddings (embeddings)

- Lesson id: embeddings
- Section: Morning Commute
- Title: Embeddings
- Current subtitle: Token IDs look up learned vectors
- Current definition: An embedding is a token ID’s learned starting vector.
- Current core explanation: Where: It is retrieved from the embedding table at the start of model processing. Why: Embeddings give each token a learned numerical starting point before context reshapes it.
- Current relationship/how-it-connects text: Prompt tokens and already-generated response tokens are looked up as embeddings when they are inside the current context.
- Current metaphor: A token gets a starting address in a giant meaning cloud.
- Current brain metaphor: It loosely resembles a starting association a person might have with a word.
- Current brain metaphor limitation: An embedding is not a definition or memory; it is a learned vector row.
- Prompt/response clarity note: This card should stay explicit that prompt tokens and response-so-far tokens enter the same current context before the next token is chosen.
- Current visual aid: embeddings: Embedding Lookup - A token ID retrieves a learned starting vector.
- Current exercise: Journey: none rendered. Play/legacy mapping: prompt-or-response-label - Prompt or Response?. Goal: Practice telling given prompt tokens apart from a generated response token.
- Current checkpoint question: What is an embedding in this app?
- Correct answer: A learned starting vector
- Incorrect answers: A finished sentence; A human memory
- Feedback text: Correct feedback: A token ID retrieves an embedding vector before context reshapes it into hidden states. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: embedding, input context, token-id, vector, hidden state
- Stage of model process: prompt processing
- Known confusion risk: Embeddings can be confused with definitions, memories, or hidden states.
- Missing explanation: Contrast embedding as starting vector with hidden state as later context-shaped vector.
- Illustration needed: Lookup table pulling a learned starting vector for one token ID.
- Rewrite priority: low

## 11. Vectors (vectors)

- Lesson id: vectors
- Section: Morning Commute
- Title: Vectors
- Current subtitle: Lists of numbers carrying features
- Current definition: A vector is a list of numbers that represents learned features of something, such as a token.
- Current core explanation: Where: Embeddings and hidden states are both vectors at different moments in the model path. Why: Vectors let the model compute with many fuzzy features at once instead of using one plain-English label.
- Current relationship/how-it-connects text: An embedding vector starts the token; hidden-state vectors are later context-shaped versions of that token.
- Current metaphor: A coordinate in a many-dimensional map.
- Current brain metaphor: It can resemble a bundle of associations around a word.
- Current brain metaphor limitation: The vector is not a conscious concept; it is a numerical representation useful for computation.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: vectors: Feature Vector - A vector is a list of numerical features, not a sentence.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: Which statement is most accurate?
- Correct answer: Embeddings and hidden states are vectors
- Incorrect answers: Vectors are whole paragraphs; Vectors are permanent chats
- Feedback text: Correct feedback: Vectors are lists of numbers. Embeddings are starting vectors; hidden states are temporary context-shaped vectors. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: vector, embedding, hidden state, feature
- Stage of model process: architecture
- Known confusion risk: Feature dimensions may be treated as literal labeled meanings rather than learned numerical patterns.
- Missing explanation: Explain that dimensions are learned and distributed; one feature is rarely a neat English label.
- Illustration needed: Many-dimensional feature bars with a warning that labels are simplified.
- Rewrite priority: high

## 12. Tensors (tensors)

- Lesson id: tensors
- Section: Morning Commute
- Title: Tensors
- Current subtitle: Organized blocks of vectors
- Current definition: A tensor is an organized block of numbers, often holding many token vectors at once.
- Current core explanation: Where: Tensors carry the whole current context through transformer layers. Why: A tensor keeps the model’s data organized by positions and features, so many tokens can be processed together.
- Current relationship/how-it-connects text: Embeddings from the current context become tensors so the transformer can process prompt tokens and earlier response tokens together.
- Current metaphor: A stack of spreadsheets carrying token features through the model.
- Current brain metaphor: It loosely resembles organizing many signals at once.
- Current brain metaphor limitation: The tensor is not a mental image or thought; it is a shaped numerical array.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: tensors: Tensor Block - Tensors organize many token vectors for layer-by-layer processing.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: Which is the better definition of tensor here?
- Correct answer: An organized block of numbers
- Incorrect answers: A word in a dictionary; A rule written by a programmer
- Feedback text: Correct feedback: In transformers, tensors carry batches of token vectors through layers. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: tensor, vector, input context, layer
- Stage of model process: architecture
- Known confusion risk: Tensor language can become jargon unless shapes and positions are made tangible.
- Missing explanation: Show tensor axes: token position by feature, optionally across batches or heads only as a footnote.
- Illustration needed: Mobile-readable tensor block with token-position and feature axes.
- Rewrite priority: high

## 13. Attention (attention)

- Lesson id: attention
- Section: Workday
- Title: Attention
- Current subtitle: Weighted relevance between positions
- Current definition: Attention assigns weighted relevance between token positions.
- Current core explanation: Where: It happens inside transformer layers during a forward pass. Why: Attention lets one token position use information from other visible token positions in the current context.
- Current relationship/how-it-connects text: During inference, attention operates over token positions in the current context, including prompt tokens and earlier generated response tokens.
- Current metaphor: Spotlights showing which earlier tokens are useful right now.
- Current brain metaphor: The word attention is useful because some parts of the context matter more than others.
- Current brain metaphor limitation: It is not human attention, awareness, desire, or focus. It is weighted relevance in a computation.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: attention: Attention Weave - Attention is weighted relevance between token positions.
- Current exercise: Journey: none rendered. Play/legacy mapping: attention-relevance - Attention Is Relevance. Goal: Connect the pronoun to the token it most likely depends on.
- Current checkpoint question: Which tokens can attention look across during inference?
- Correct answer: Tokens currently in the context window
- Incorrect answers: All text the model has ever seen; Only the newest generated token
- Feedback text: Correct feedback: Attention operates over the current context. It does not browse all training data. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: attention, input context, prompt tokens, response tokens, hidden state, layer
- Stage of model process: architecture
- Known confusion risk: The term attention invites human-focus and awareness metaphors.
- Missing explanation: Show attention weights as arrows between positions, not as a mind selecting ideas.
- Illustration needed: Token nodes with weighted relevance arcs and a plain-language caption.
- Rewrite priority: high

## 14. MLP (mlp)

- Lesson id: mlp
- Section: Workday
- Title: MLP
- Current subtitle: Feature reshaping per token
- Current definition: An MLP is a feed-forward network that reshapes each token position’s feature vector.
- Current core explanation: Where: It appears inside transformer layers, usually after attention has mixed information across positions. Why: The MLP helps turn mixed context into more useful per-token features for later layers.
- Current relationship/how-it-connects text: During a forward pass over the current context, attention mixes information across positions and the MLP reshapes features within each position.
- Current metaphor: A forge that bends each token vector into a more useful shape.
- Current brain metaphor: It is somewhat like a small processing step after noticing relevant context.
- Current brain metaphor limitation: The MLP is not a neuron with feelings or beliefs; it is a learned function applied to vectors.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: mlp: MLP Reshape - The MLP reshapes each token position feature vector.
- Current exercise: Journey: none rendered. Play/legacy mapping: mlp-feature-reshape - MLP Feature Reshape. Goal: See that the same token can carry different temporary features in different contexts.
- Current checkpoint question: What does the MLP mainly do here?
- Correct answer: Reshapes per-token features
- Incorrect answers: Reads private files; Chooses the final answer directly
- Feedback text: Correct feedback: MLPs transform token feature vectors after attention has mixed contextual information. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: MLP, input context, hidden state, attention
- Stage of model process: architecture
- Known confusion risk: The MLP can blur into attention unless cross-position mixing and per-position reshaping are contrasted.
- Missing explanation: Put MLP beside attention in the same layer so their complementary roles are visible.
- Illustration needed: Per-token vector forge or feature mixer after attention.
- Rewrite priority: high

## 15. Layers (layers)

- Lesson id: layers
- Section: Workday
- Title: Layers
- Current subtitle: Repeated refinement
- Current definition: A transformer layer is a repeated block that usually combines attention, MLP feature reshaping, residual paths, and normalization.
- Current core explanation: Where: Layers are stacked inside the model between embeddings and next-token scores. Why: Repeated layers let simple starting vectors become richer, context-shaped hidden states.
- Current relationship/how-it-connects text: Each layer refines hidden states while residual paths help useful information carry forward.
- Current metaphor: A series of editing passes where each pass can revise but also preserve the draft.
- Current brain metaphor: The stack can feel like stages of processing.
- Current brain metaphor limitation: The layers do not form a human-like chain of thought; they update numerical states.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: layers: Layer Stack - Repeated blocks refine hidden states while carrying useful signal forward.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: What do layers repeatedly refine?
- Correct answer: Hidden states
- Incorrect answers: Permanent user memory; The app interface
- Feedback text: Correct feedback: Layers update temporary internal vectors during inference. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: layer, attention, MLP, hidden state
- Stage of model process: architecture
- Known confusion risk: Layer stacks can be mistaken for a human chain of thought.
- Missing explanation: Add residual paths and normalization as optional advanced labels or a split target lesson.
- Illustration needed: Transparent layer stack with attention and MLP blocks repeated.
- Rewrite priority: medium

## 16. Hidden States (hidden-states)

- Lesson id: hidden-states
- Section: Workday
- Title: Hidden States
- Current subtitle: Temporary contextual vectors
- Current definition: A hidden state is the model’s temporary internal context-shaped vector for a token at a given layer.
- Current core explanation: Where: Hidden states appear during the forward pass after embeddings enter the layer stack. Why: They are where the prompt’s context changes the token representation before the model scores possible next tokens.
- Current relationship/how-it-connects text: Hidden states are created while processing the current context during a forward pass; they are not the visible response.
- Current metaphor: A scratchpad of numbers that changes while the prompt is being processed.
- Current brain metaphor: Hidden state can resemble temporary working memory.
- Current brain metaphor limitation: It is not permanent memory, consciousness, or private English text; it is a temporary vector.
- Prompt/response clarity note: This is the live prompt-to-response path: fixed weights process current context and generate response tokens.
- Current visual aid: hidden-states: Temporary Hidden State - Hidden states are context-shaped vectors created during a forward pass.
- Current exercise: Journey: none rendered. Play/legacy mapping: mlp-feature-reshape - MLP Feature Reshape. Goal: See that the same token can carry different temporary features in different contexts.
- Current checkpoint question: Why is it called hidden state?
- Correct answer: It is internal numbers, not visible text
- Incorrect answers: It is encrypted English; It is a secret memory file
- Feedback text: Correct feedback: Hidden means inside the model’s working representation. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: hidden state, input context, forward pass, embedding, layer, inference
- Stage of model process: inference
- Known confusion risk: Hidden states can be mistaken for secret English text or permanent memory.
- Missing explanation: Show hidden state changing layer by layer for the same token in two contexts.
- Illustration needed: Same token glowing differently across contexts and layers.
- Rewrite priority: high

## 17. Logits (logits)

- Lesson id: logits
- Section: Decision Room
- Title: Logits
- Current subtitle: Raw next-token scores
- Current definition: Logits are raw scores for the next token before they become probabilities.
- Current core explanation: Where: They appear near the end of a forward pass, after the final hidden state is projected toward the vocabulary. Why: Logits show that the model has not chosen a token yet; it has scored candidates.
- Current relationship/how-it-connects text: A forward pass over the current context produces logits for one next generated token.
- Current metaphor: A scoreboard before the points are converted into odds.
- Current brain metaphor: It can feel like considering options.
- Current brain metaphor limitation: The model is not weighing options with intent; logits are raw numerical scores.
- Prompt/response clarity note: This card belongs to decoding: the model is choosing one next response token, appending it, then repeating.
- Current visual aid: logits: Raw Scores - Logits are raw next-token scores before probabilities.
- Current exercise: Journey: none rendered. Play/legacy mapping: softmax-funnel - Softmax Funnel. Goal: Identify what softmax produces.
- Current checkpoint question: Where do probabilities come from in this path?
- Correct answer: Softmax converts logits
- Incorrect answers: Training rewrites the weights; The model asks a database
- Feedback text: Correct feedback: Logits are raw scores; softmax turns them into probabilities. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: logits, generated token, forward pass, hidden state, softmax
- Stage of model process: response generation
- Known confusion risk: Raw scores can be confused with probabilities or truth confidence.
- Missing explanation: Make vocabulary projection explicit: final hidden state to one score per candidate token.
- Illustration needed: Raw candidate scoreboard before softmax.
- Rewrite priority: medium

## 18. Softmax (softmax)

- Lesson id: softmax
- Section: Decision Room
- Title: Softmax
- Current subtitle: Scores become probabilities
- Current definition: Softmax turns next-token raw scores into probabilities that sum to one.
- Current core explanation: Where: It sits between logits and sampling during a decoding step. Why: Softmax makes scores comparable as a probability cloud over candidate tokens.
- Current relationship/how-it-connects text: Softmax converts logits into probabilities; sampling then chooses one token from those probabilities.
- Current metaphor: A funnel turning scoreboard points into odds.
- Current brain metaphor: It resembles turning vague preferences into relative chances.
- Current brain metaphor limitation: The probabilities are mathematical outputs, not confidence, desire, or truth.
- Prompt/response clarity note: This card belongs to decoding: the model is choosing one next response token, appending it, then repeating.
- Current visual aid: softmax: Softmax Funnel - Softmax converts raw scores into probabilities that sum to one.
- Current exercise: Journey: none rendered. Play/legacy mapping: softmax-funnel - Softmax Funnel. Goal: Identify what softmax produces.
- Current checkpoint question: What does softmax produce?
- Correct answer: Next-token probabilities
- Incorrect answers: Permanent memory; A whole essay
- Feedback text: Correct feedback: Softmax turns raw next-token scores into a probability distribution. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: softmax, logits, decoding step, sampling, probability
- Stage of model process: response generation
- Known confusion risk: Probabilities can be mistaken for correctness or factual confidence.
- Missing explanation: Show that softmax normalizes scores into a distribution that sums to one.
- Illustration needed: Funnel converting raw scores into probabilities that sum to one.
- Rewrite priority: medium

## 19. Sampling (sampling)

- Lesson id: sampling
- Section: Decision Room
- Title: Sampling
- Current subtitle: One next token is chosen
- Current definition: Sampling chooses one next token for the response from the probability cloud.
- Current core explanation: Where: It happens after softmax in the decoding step. Why: Sampling explains why the same prompt can sometimes produce different good responses.
- Current relationship/how-it-connects text: Temperature, top-k, and top-p shape the candidate pool before the chosen response token is appended to the context.
- Current metaphor: Choosing from a weighted bowl of possible next tokens.
- Current brain metaphor: It can resemble choosing a word while speaking.
- Current brain metaphor limitation: The model is not choosing with intention; a decoding rule selects from probabilities.
- Prompt/response clarity note: This card belongs to decoding: the model is choosing one next response token, appending it, then repeating.
- Current visual aid: sampling: Sample One Token - Sampling chooses one token from the probability cloud.
- Current exercise: Journey: none rendered. Play/legacy mapping: pick-next-token - Pick the Next Token. Goal: Choose a plausible next token from context.
- Current checkpoint question: When the model chooses one token, what happens next?
- Correct answer: The token is appended and the model runs again
- Incorrect answers: The model writes the whole response at once; The model permanently learns the token
- Feedback text: Correct feedback: The selected response token becomes part of the context for the next forward pass. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: sampling, generated token, decoding step, response tokens, temperature, top-k, top-p
- Stage of model process: response generation
- Known confusion risk: Randomness can sound arbitrary unless tied to weighted probabilities.
- Missing explanation: Add temperature/top-p as knobs that shape selection without overexplaining math.
- Illustration needed: Weighted vocabulary cloud with one selected token.
- Rewrite priority: medium

## 20. Autoregression (autoregression)

- Lesson id: autoregression
- Section: The Day Repeats
- Title: Autoregression
- Current subtitle: One token, append, repeat
- Current definition: Autoregression means response generation by repeated next-token prediction: choose one token, append it, and run again.
- Current core explanation: Where: It is the loop that builds text during inference. Why: Autoregression explains why earlier generated tokens become part of what the model can use next.
- Current relationship/how-it-connects text: Each generated response token becomes part of the input context for the next decoding step.
- Current metaphor: A train adding one car at a time.
- Current brain metaphor: It resembles continuing a thought step by step.
- Current brain metaphor limitation: The model is not holding a plan in mind; it repeatedly predicts the next token from visible context.
- Prompt/response clarity note: This card belongs to decoding: the model is choosing one next response token, appending it, then repeating.
- Current visual aid: autoregression: Append and Repeat - The chosen token is appended, then the model runs again.
- Current exercise: Journey: none rendered. Play/legacy mapping: prompt-or-response-label - Prompt or Response?. Goal: Practice telling given prompt tokens apart from a generated response token.
- Current checkpoint question: How does an LLM normally generate text?
- Correct answer: One token at a time
- Incorrect answers: All words at once; By rewriting its weights
- Feedback text: Correct feedback: LLM generation is autoregressive: next token, append, repeat. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: autoregression, completion, generated token, response tokens, sampling, inference
- Stage of model process: response generation
- Known confusion risk: Learners may still imagine the model drafting a full paragraph internally before showing it.
- Missing explanation: Use one short dog/cat sentence to show next token, append, repeat.
- Illustration needed: Loop diagram: score, sample, append, run again.
- Rewrite priority: low

## 21. Context Window (context-window)

- Lesson id: context-window
- Section: The Day Repeats
- Title: Context Window
- Current subtitle: Temporary working context
- Current definition: A context window is the limited amount of tokens or media the model can currently use.
- Current core explanation: Where: It surrounds the prompt, conversation history, retrieved material, and response-so-far that remain visible. Why: It explains why models can use current context but do not automatically form permanent memory from every chat.
- Current relationship/how-it-connects text: The model can only use tokens currently inside the context window, whether they came from the prompt, prior conversation, retrieved documents, or the response-so-far.
- Current metaphor: A moving spotlight over a growing train.
- Current brain metaphor: It is loosely like working memory: what is currently available matters.
- Current brain metaphor limitation: It is not durable memory. What falls out cannot be directly attended to in the next pass.
- Prompt/response clarity note: This card should separate the temporary visible context from durable memory or weight updates.
- Current visual aid: context-window: Temporary Context Window - Only visible context can influence the next token.
- Current exercise: Journey: none rendered. Play/legacy mapping: context-window-fell-out - Context Window: What Fell Out?. Goal: Identify which older information the model can no longer use after the window fills.
- Current checkpoint question: What can happen when the context window is full?
- Correct answer: Older tokens may be truncated
- Incorrect answers: The model permanently learns them; Softmax disappears
- Feedback text: Correct feedback: Context is temporary input, not durable training. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: context window, input context, prompt tokens, response tokens, rag, autoregression, inference
- Stage of model process: current context
- Known confusion risk: Current context can be confused with saved memory or training data.
- Missing explanation: Show what falls out and that retrieval adds text to context rather than training weights.
- Illustration needed: Limited stack of cards where older cards fall out.
- Rewrite priority: high

## 22. RAG and Retrieval (rag-retrieval)

- Lesson id: rag-retrieval
- Section: The Day Repeats
- Title: RAG and Retrieval
- Current subtitle: Retrieved text joins the current context
- Current definition: Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model’s context before generating a response.
- Current core explanation: Where: It happens during inference, before or during response generation, and usually does not change model weights. Why: RAG helps learners see that the model is not magically knowing private documents; retrieved snippets become temporary context.
- Current relationship/how-it-connects text: RAG depends on the context window: retrieved text becomes prompt/context tokens, then the model still uses attention, hidden states, logits, softmax, and sampling to generate response tokens.
- Current metaphor: Open-book AI: the model gets notes before answering.
- Current brain metaphor: It is a little like looking something up in notes before answering a question.
- Current brain metaphor limitation: A human can judge sources, remember what was read, and reason about trust in richer ways. The model still generates likely response tokens from retrieved context and learned weights.
- Prompt/response clarity note: Retrieved documents become prompt/context tokens. The answer is still generated as response tokens one at a time.
- Current visual aid: rag-retrieval: Open-Book Retrieval - Retrieved document cards enter the context before response tokens are generated.
- Current exercise: Journey: none rendered. Play/legacy mapping: open-book-or-learned - Open Book or Learned?. Goal: Sort each item by whether it lives in weights, enters context, or is generated as response text.
- Current checkpoint question: What does RAG usually do?
- Correct answer: Retrieves outside information and places it into the current context
- Incorrect answers: Permanently updates the model’s weights; Makes the model conscious of documents; Guarantees that every answer is true
- Feedback text: Correct feedback: RAG is retrieval plus context. It can improve grounding, but it is not training, fine-tuning, permanent memory, or a truth guarantee. Incorrect feedback: Permanently updates the model’s weights: Not quite. Unless a separate training process happens, RAG does not durably update model weights. Makes the model conscious of documents: Not quite. Retrieved documents become visible context; the model does not become aware of them. Guarantees that every answer is true: Not quite. RAG can reduce hallucinations, but retrieval can be poor and the model can still misuse context.
- Glossary terms used: rag, retrieval, grounding, context window, input context, prompt tokens, response tokens, inference, fine-tuning, training, hallucination
- Stage of model process: current context
- Known confusion risk: RAG can be mistaken for permanent learning, full file access, web search by itself, fine-tuning, or a guarantee that answers are true.
- Missing explanation: Name the retrieval step, the context insertion step, and the fact that weights remain unchanged unless training also happens.
- Illustration needed: Three lanes: user question, retriever searches a document shelf, retrieved cards enter the context window, and the LLM generates response tokens.
- Rewrite priority: high

## 23. How AI Learns (how-ai-learns)

- Lesson id: how-ai-learns
- Section: Wider AI Literacy
- Title: How AI Learns
- Current subtitle: Durable learning versus temporary steering
- Current definition: AI systems can improve or behave differently through durable training, targeted fine-tuning, retrieval, or temporary in-context steering.
- Current core explanation: Where: These processes happen at different times: before deployment, between deployments, or inside one current run. Why: Calling every behavior change learning creates confusion about privacy, memory, and institutional risk.
- Current relationship/how-it-connects text: Pretraining and fine-tuning can durably change weights; retrieval and examples in the prompt change only what the model can see during inference.
- Current metaphor: Revising the textbook versus bringing notes into an open-book exam.
- Current brain metaphor: The word learning is useful when prior experience changes later behavior.
- Current brain metaphor limitation: In-context examples are not personal learning; they steer the current run without normally updating weights.
- Prompt/response clarity note: This card uses the prompt/response path to separate practical risk from myths about secret learning or agency.
- Current visual aid: ai-learns: Learning Modes - Durable training, retrieval, and temporary steering change different things.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: Which process normally changes only the current context, not weights?
- Correct answer: Retrieval-augmented generation
- Incorrect answers: Pretraining; Fine-tuning
- Feedback text: Correct feedback: RAG places retrieved material into the current context. It does not normally train the base model. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: training, pretraining, fine-tuning, inference, rag, in-context learning
- Stage of model process: risk/policy
- Known confusion risk: Calling every behavior change learning can blur training, retrieval, and in-context steering.
- Missing explanation: Separate durable training, retrieval, temporary instructions, and deployed online learning in one table.
- Illustration needed: Matrix of durable weight change, temporary context steering, and retrieval.
- Rewrite priority: high

## 24. Diffusion vs Autoregression (diffusion)

- Lesson id: diffusion
- Section: Wider AI Literacy
- Title: Diffusion vs Autoregression
- Current subtitle: Denoising is a different generation pattern
- Current definition: Diffusion generation usually starts from noise and denoises step by step.
- Current core explanation: Where: Diffusion is common in image generation and other media workflows, not the standard loop for text LLM generation. Why: The comparison prevents learners from treating all generative AI as the same mechanism.
- Current relationship/how-it-connects text: Autoregressive LLMs build text token by token; diffusion models refine noise into an image or other output.
- Current metaphor: Writing the next word versus developing a photograph out of static.
- Current brain metaphor: Both systems can feel imaginative because they produce new outputs.
- Current brain metaphor limitation: The mechanisms differ: diffusion denoises a representation; autoregressive text predicts and appends tokens.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: diffusion: Denoise, Not Append - Diffusion refines noise step by step instead of generating text token by token.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: What does a diffusion model usually start with?
- Correct answer: Noise
- Incorrect answers: A completed paragraph; A spreadsheet
- Feedback text: Correct feedback: Diffusion models learn to denoise toward useful outputs. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: diffusion, autoregression
- Stage of model process: architecture
- Known confusion risk: Learners may overgeneralize diffusion mechanics to text LLM generation.
- Missing explanation: Show a side-by-side: denoise image representation versus append text tokens.
- Illustration needed: Denoising sequence beside a next-token text loop.
- Rewrite priority: medium

## 25. Multimodal AI (multimodal)

- Lesson id: multimodal
- Section: Wider AI Literacy
- Title: Multimodal AI
- Current subtitle: Multiple media types together
- Current definition: Multimodal AI can represent or process multiple media types, such as text, images, audio, or video.
- Current core explanation: Where: It appears when systems connect encoders, decoders, or shared representations across media types. Why: It explains how a system can read an image, answer in text, or combine speech and documents.
- Current relationship/how-it-connects text: Different modalities may use connected encoders, shared vector spaces, or coordinated model components.
- Current metaphor: A transit hub where different kinds of information can transfer lines.
- Current brain metaphor: People combine sight, speech, and text naturally, so the metaphor helps.
- Current brain metaphor limitation: Machine modalities are engineered representations, not human sensory experience.
- Prompt/response clarity note: This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.
- Current visual aid: multimodal: Shared Media Hub - Different media types can connect through learned representations.
- Current exercise: Journey: none rendered. No direct Play/legacy mapping.
- Current checkpoint question: What does multimodal mean?
- Correct answer: Multiple media types
- Incorrect answers: A larger context window only; A model with feelings
- Feedback text: Correct feedback: Multimodal systems work across media types, often through learned representations. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: multimodal, embedding, vector
- Stage of model process: architecture
- Known confusion risk: Human sensory metaphors can make engineered media representations sound more human-like than they are.
- Missing explanation: Add an example of image input, text output, and the representation bridge between them.
- Illustration needed: Text, image, audio, and video paths meeting in a shared representation hub.
- Rewrite priority: medium

## 26. Risk vs Myth (risk-myth)

- Lesson id: risk-myth
- Section: Wider AI Literacy
- Title: Risk vs Myth
- Current subtitle: Practical institutional literacy
- Current definition: Risk literacy separates practical harms from magical stories about what models are.
- Current core explanation: Where: It matters whenever people use AI in classrooms, research, administration, health, advising, or IT systems. Why: Clear mental models help institutions manage privacy, accuracy, bias, over-trust, and security without inventing magical threats.
- Current relationship/how-it-connects text: Most real risks come from data, outputs, integrations, incentives, and human over-reliance; ordinary inference does not make the model secretly train itself.
- Current metaphor: A campus safety map that marks real hazards clearly.
- Current brain metaphor: Brain metaphors can make risks feel urgent and memorable.
- Current brain metaphor limitation: Do not infer consciousness, intent, or secret self-training from fluent text. Keep the mechanism visible.
- Prompt/response clarity note: This card uses the prompt/response path to separate practical risk from myths about secret learning or agency.
- Current visual aid: risk: Risk or Myth - Clear mechanisms help separate practical risk from magical stories.
- Current exercise: Journey: none rendered. Play/legacy mapping: open-book-or-learned - Open Book or Learned?. Goal: Sort each item by whether it lives in weights, enters context, or is generated as response text.
- Current checkpoint question: Which is a real institutional risk?
- Correct answer: Uploading private data
- Incorrect answers: The model becoming conscious in the chat; Softmax stealing files
- Feedback text: Correct feedback: Risk literacy is part of model literacy. Incorrect feedback: uses the general correct explanation only.
- Glossary terms used: inference, training, context window, privacy, hallucination, prompt-injection
- Stage of model process: risk/policy
- Known confusion risk: Fluent outputs can invite myths about consciousness, intent, or secret self-training.
- Missing explanation: Tie each risk to a mechanism: context exposure, tool access, hallucination, bias, or over-trust.
- Illustration needed: Risk sorting cards linked to mechanisms rather than fear language.
- Rewrite priority: high

