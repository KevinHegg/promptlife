# Prompt Life Curriculum Bible v0.7

Generated: 2026-06-02

Purpose: guide the next implementation pass for model literacy, not prompt-engineering tricks. This Bible includes current Journey cards plus proposed v0.7 additions and restructures.

Audience: smart high-schoolers, first-year college students, faculty, higher-ed IT leaders, and PhDs outside computer science.

Current app mapping: the existing app has 26 Journey cards. Most map directly to the proposed v0.7 lesson IDs below; the current How AI Learns umbrella card should be split across more precise durable/temporary lessons rather than carried forward unchanged.

| Current app id | Current title | v0.7 destination |
|---|---|---|
| what-is-llm | What Is an LLM? | what-is-llm |
| history | Symbolic AI vs Deep Learning | symbolic-vs-deep-learning |
| training | Training | training |
| pretraining | Pretraining | pretraining |
| fine-tuning | Fine-Tuning | fine-tuning |
| inference | Inference | inference |
| prompt-response | Prompt vs Response | prompt-response |
| tokens | Tokenization | tokenization |
| token-ids | Token IDs | token-ids |
| embeddings | Embeddings | embeddings |
| vectors | Vectors | vectors |
| tensors | Tensors | tensors |
| attention | Attention | attention |
| mlp | MLP | mlp |
| layers | Layers | layers |
| hidden-states | Hidden States | hidden-states |
| logits | Logits | logits |
| softmax | Softmax | softmax |
| sampling | Sampling | sampling |
| autoregression | Autoregression | autoregression |
| context-window | Context Window | context-window |
| rag-retrieval | RAG and Retrieval | rag-retrieval |
| how-ai-learns | How AI Learns | Split across training, fine-tuning, alignment, RAG, grounding, and effective prompting |
| diffusion | Diffusion vs Autoregression | diffusion |
| multimodal | Multimodal AI | multimodal |
| risk-myth | Risk vs Myth | risk-myth |

## 1. What Is an LLM?

- Lesson id: what-is-llm
- Status: Current Journey card
- Section: Before Morning
- Path: Essential Path
- Learner-facing subtitle: A learned next-token prediction system
- One-sentence definition: A large language model is a learned system that predicts likely next tokens from the context it can see.
- Where it happens: architecture
- Durable vs temporary distinction: Training created durable weights before use; ordinary use relies on those weights rather than rewriting them.
- Prompt vs response distinction: A prompt supplies visible context; the response is generated one token at a time from that context.
- Core explanation: Start with the full path in miniature: context enters, fixed learned weights compute raw next-token scores, decoding chooses one token, and the token is appended before the next pass.
- Why it matters: This lowers fear by making fluency mechanistic without making it trivial.
- How it connects to previous lesson: Opening frame.
- How it connects to next lesson: Prepares the learner to ask what kind of intellectual tradition produced this system.
- General metaphor: A very large autocomplete engine with learned structure, not a mind or a database.
- Brain/cognition metaphor: Many small signals can combine into useful patterns.
- Where the brain metaphor breaks: The model has no lived body, feelings, awareness, personal goals, or human understanding.
- Misconception addressed: Fluent output means consciousness or database lookup.
- Visual aid concept: Prompt lifecycle overview with context, fixed weights, logits, sampling, and append-repeat.
- Exercise/checkpoint concept: Checkpoint: identify the learned prediction system rather than a mind or rulebook.
- Glossary terms: prompt, response, token, weight, inference
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 2. Rationalists vs Empiricists

- Lesson id: rationalists-empiricists
- Status: Proposed v0.7 card
- Section: Before Morning
- Path: Optional Side Tour
- Learner-facing subtitle: Reason-first and experience-first ways of knowing
- One-sentence definition: Rationalist approaches emphasize rules and reasoning from principles; empiricist approaches emphasize learning from experience and evidence.
- Where it happens: architecture
- Durable vs temporary distinction: This is conceptual background, not a model operation.
- Prompt vs response distinction: It frames why modern systems lean toward learned patterns before any prompt is processed.
- Core explanation: Use this short intellectual-history bridge to make symbolic AI and deep learning feel less arbitrary: one tradition trusts explicit structures; another learns from examples.
- Why it matters: Academic audiences often benefit from seeing LLMs as part of a longer argument about knowledge, not as a sudden magic trick.
- How it connects to previous lesson: Extends the opening definition into a history-of-ideas frame.
- How it connects to next lesson: Sets up Symbolic AI vs Deep Learning as the computer-science version of the contrast.
- General metaphor: A map drawn from first principles versus a map adjusted after many journeys.
- Brain/cognition metaphor: People use both abstract reasoning and experience.
- Where the brain metaphor breaks: The model is not a philosopher and does not choose an epistemology.
- Misconception addressed: Deep learning is anti-reason or pure magic.
- Visual aid concept: Split-screen contrast of principle path and experience path feeding into AI history.
- Exercise/checkpoint concept: Checkpoint: sort rule-first and example-first descriptions.
- Glossary terms: symbolic AI, deep learning, training
- Source needs / citation needs: SOURCE NEEDED: concise history/philosophy framing if published as more than metaphor.

## 3. Symbolic AI vs Deep Learning

- Lesson id: symbolic-vs-deep-learning
- Status: Current Journey card
- Section: Before Morning
- Path: Essential Path
- Learner-facing subtitle: Rules versus learned patterns
- One-sentence definition: Symbolic AI manipulates explicit symbols and rules; deep learning adjusts many weights until useful patterns are captured.
- Where it happens: architecture
- Durable vs temporary distinction: Deep learning stores learned behavior in parameters; symbolic systems store explicit rules and structures.
- Prompt vs response distinction: An LLM prompt is processed by learned parameters, not matched against one hand-written rule for every response.
- Core explanation: Modern LLMs mainly come from deep learning, though useful systems still wrap learned models with rules, policies, validation, and tools.
- Why it matters: This prevents the false choice that rules are obsolete or learned systems are inexplicable.
- How it connects to previous lesson: Grounds the rationalist/empiricist contrast in AI systems.
- How it connects to next lesson: Leads into training as the process that shapes learned parameters.
- General metaphor: A rulebook beside a weather system of learned relationships.
- Brain/cognition metaphor: Practice can shape future behavior.
- Where the brain metaphor breaks: The model is optimized mathematically, not practicing with intention.
- Misconception addressed: Symbolic AI is obsolete, or deep learning is magic.
- Visual aid concept: Rule cards on one side, learned landscape on the other, with a hybrid product layer above both.
- Exercise/checkpoint concept: Checkpoint: identify what gets learned versus what is explicitly written.
- Glossary terms: symbolic AI, deep learning, parameter, training
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 4. Training

- Lesson id: training
- Status: Current Journey card
- Section: Before Morning
- Path: Essential Path
- Learner-facing subtitle: Prediction error updates weights
- One-sentence definition: Training updates model weights by comparing predictions with targets or preferences and adjusting parameters.
- Where it happens: pretraining
- Durable vs temporary distinction: Training is durable: it changes weights or training-time adapters used by future inference.
- Prompt vs response distinction: Training is not a live response to one user prompt; it prepares the model before ordinary use.
- Core explanation: The training loop predicts, compares, measures loss or preference signal, updates weights, and repeats many times.
- Why it matters: Training is where durable capability is installed.
- How it connects to previous lesson: Explains how deep learning gets learned patterns.
- How it connects to next lesson: Pretraining is the broad version of this weight-changing process.
- General metaphor: Tuning an instrument before a performance.
- Brain/cognition metaphor: Repeated experience can shape later behavior.
- Where the brain metaphor breaks: The model has no reflection, intention, or memory of lessons; optimization changes numbers.
- Misconception addressed: Every chat message trains the model.
- Visual aid concept: Predict, compare, loss, update weights, repeat.
- Exercise/checkpoint concept: Training Nudge: choose when update weights belongs.
- Glossary terms: training, weight, parameter, loss, inference
- Source needs / citation needs: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## 5. Pretraining

- Lesson id: pretraining
- Status: Current Journey card
- Section: Before Morning
- Path: Essential Path
- Learner-facing subtitle: Broad durable learning before normal use
- One-sentence definition: Pretraining is broad early training that builds general capability through many durable weight updates.
- Where it happens: pretraining
- Durable vs temporary distinction: Pretraining durably changes weights.
- Prompt vs response distinction: It happens before everyday prompts; no single response is being generated for a user.
- Core explanation: The model predicts tokens across broad data mixtures so many small updates create language patterns, associations, styles, and task structures.
- Why it matters: Pretraining explains why a general model can answer across many domains before campus or course customization.
- How it connects to previous lesson: A large-scale version of the training loop.
- How it connects to next lesson: Overfitting and generalization explain when learned patterns transfer well or too narrowly.
- General metaphor: Many tiny nudges carving roads through a vast landscape.
- Brain/cognition metaphor: Broad education can shape later performance.
- Where the brain metaphor breaks: The model does not understand lessons like a person and does not reliably store every source verbatim.
- Misconception addressed: Pretraining stores a perfect copy of every document.
- Visual aid concept: Data rain shaping a terrain with broad paths.
- Exercise/checkpoint concept: Checkpoint: identify durable weight change.
- Glossary terms: pretraining, training, weight, next token
- Source needs / citation needs: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## 6. Overfitting and Generalization

- Lesson id: overfitting-generalization
- Status: Proposed v0.7 card
- Section: Before Morning
- Path: Deep Path
- Learner-facing subtitle: Learning patterns that travel
- One-sentence definition: Generalization means learned patterns work on new examples; overfitting means the model clings too closely to training examples or brittle patterns.
- Where it happens: pretraining
- Durable vs temporary distinction: Both are outcomes of training dynamics and affect future behavior.
- Prompt vs response distinction: They shape what the model can do before any particular inference prompt arrives.
- Core explanation: A model can learn patterns that help on new examples, or it can overfit too closely to seen examples and fail on nearby unseen cases.
- Why it matters: This explains why more data and bigger models are not automatically the same as understanding.
- How it connects to previous lesson: Adds nuance to pretraining.
- How it connects to next lesson: Fine-tuning must adapt the model without making it too narrow or brittle.
- General metaphor: Studying only the answer key versus understanding the subject.
- Brain/cognition metaphor: Like memorizing practice questions instead of learning the principle.
- Where the brain metaphor breaks: The model is not consciously memorizing; optimization can make it rely on brittle patterns.
- Misconception addressed: Bigger training always means better understanding.
- Visual aid concept: A path that perfectly traces old dots but misses new dots.
- Exercise/checkpoint concept: Checkpoint: pick which curve generalizes to new dots.
- Glossary terms: training, generalization, overfitting, evaluation
- Source needs / citation needs: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## 7. Fine-Tuning

- Lesson id: fine-tuning
- Status: Current Journey card
- Section: Before Morning
- Path: Essential Path
- Learner-facing subtitle: Targeted durable shaping
- One-sentence definition: Fine-tuning is targeted additional training after broad pretraining.
- Where it happens: fine-tuning
- Durable vs temporary distinction: Fine-tuning can durably change weights or add durable adapter-style parameters.
- Prompt vs response distinction: It changes future response patterns; it is not the same as one prompt or retrieved context.
- Core explanation: Examples, preferences, or domain data nudge future behavior toward a task, tone, policy, or domain.
- Why it matters: Institutions need to distinguish durable customization from temporary prompting and retrieval.
- How it connects to previous lesson: Uses the pretrained base while managing generalization.
- How it connects to next lesson: Alignment is one family of efforts that shapes helpful and safe behavior.
- General metaphor: Adding trails through an already huge terrain.
- Brain/cognition metaphor: Coaching a person toward a style of performance.
- Where the brain metaphor breaks: The model is not adopting values or intentions; output patterns are optimized.
- Misconception addressed: Fine-tuning is just a better prompt.
- Visual aid concept: Targeted trail over a pretrained landscape.
- Exercise/checkpoint concept: Durable or Temporary sorting.
- Glossary terms: fine-tuning, pretraining, training, prompt
- Source needs / citation needs: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## 8. Alignment

- Lesson id: alignment
- Status: Proposed v0.7 card
- Section: Before Morning
- Path: Deep Path
- Learner-facing subtitle: Shaping behavior toward human intent
- One-sentence definition: Alignment is the effort to shape model behavior toward human goals, instructions, safety boundaries, and preferences.
- Where it happens: fine-tuning
- Durable vs temporary distinction: Some alignment work changes weights through fine-tuning or preference optimization; some uses policies, system prompts, evaluation, or product design.
- Prompt vs response distinction: Alignment affects how future responses behave but does not mean one prompt permanently teaches the model.
- Core explanation: Alignment combines training signals, system design, policy layers, evaluation, and human feedback to make model behavior more helpful and less harmful.
- Why it matters: It gives learners a mechanism-based way to discuss safety without implying the model has morals.
- How it connects to previous lesson: A targeted use of fine-tuning and system design.
- How it connects to next lesson: Inference shows how the aligned model is used during ordinary prompting.
- General metaphor: Guardrails and coaching.
- Brain/cognition metaphor: Like learning social norms or professional expectations.
- Where the brain metaphor breaks: The model does not acquire human values or moral agency.
- Misconception addressed: Alignment means the model is morally good or understands ethics.
- Visual aid concept: Response landscape with preferred paths, warning zones, and policy rails.
- Exercise/checkpoint concept: Checkpoint: distinguish behavioral shaping from moral understanding.
- Glossary terms: alignment, fine-tuning, human feedback, policy
- Source needs / citation needs: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## 9. Inference

- Lesson id: inference
- Status: Current Journey card
- Section: Prompt Arrives
- Path: Essential Path
- Learner-facing subtitle: A forward pass, not a memory update
- One-sentence definition: Inference is normal model use: fixed weights process the current context to generate response tokens.
- Where it happens: inference
- Durable vs temporary distinction: Inference creates temporary activations and hidden states; it does not normally durably update weights.
- Prompt vs response distinction: The prompt and response-so-far enter the forward pass; a next response token is scored and chosen.
- Core explanation: Inference uses the trained model: current context moves through layers, logits are produced, decoding chooses a token, and the loop repeats.
- Why it matters: This is the line between using a model and training a model.
- How it connects to previous lesson: Uses the trained/fine-tuned/aligned model.
- How it connects to next lesson: Prompt vs Response names what is given and what is generated.
- General metaphor: Using a map, not redrawing the map.
- Brain/cognition metaphor: Internal states can change temporarily, like working through a problem.
- Where the brain metaphor breaks: Those states are temporary computations, not memories or beliefs.
- Misconception addressed: Inference trains the model.
- Visual aid concept: Forward-pass pipeline with fixed weights below temporary activations.
- Exercise/checkpoint concept: Training Nudge.
- Glossary terms: inference, forward pass, hidden state, logits
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 10. Prompt vs Response

- Lesson id: prompt-response
- Status: Current Journey card
- Section: Prompt Arrives
- Path: Essential Path
- Learner-facing subtitle: Given context versus generated tokens
- One-sentence definition: The prompt is supplied input context; the response is generated tokens added after the model reads the context.
- Where it happens: prompt processing
- Durable vs temporary distinction: Neither prompt nor response normally changes weights during ordinary inference.
- Prompt vs response distinction: This lesson is the explicit distinction: prompt tokens are given; response tokens are generated one at a time.
- Core explanation: Response-so-far becomes part of the next input context, so the boundary moves as generation proceeds.
- Why it matters: It prevents the common myth that the model writes a complete answer all at once.
- How it connects to previous lesson: Makes the inference path concrete.
- How it connects to next lesson: Tokenization shows how both prompt and response-so-far become model-readable chunks.
- General metaphor: Given cards on a table, then new cards added one by one.
- Brain/cognition metaphor: Like continuing a sentence after reading a prompt.
- Where the brain metaphor breaks: The model samples from probabilities rather than deciding what it means to say.
- Misconception addressed: The model writes the whole answer at once.
- Visual aid concept: Prompt cards and generated response cards entering the current context together.
- Exercise/checkpoint concept: Prompt or Response label exercise.
- Glossary terms: prompt, response, prompt tokens, response tokens, context window
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 11. Tokenization

- Lesson id: tokenization
- Status: Current Journey card
- Section: Morning Commute
- Path: Essential Path
- Learner-facing subtitle: Text becomes chunks
- One-sentence definition: Tokenization splits text into chunks the model can represent as token IDs.
- Where it happens: prompt processing
- Durable vs temporary distinction: Tokenization is a deterministic or tokenizer-defined preprocessing step during inference; it does not change weights.
- Prompt vs response distinction: Prompt tokens and response-so-far tokens both pass through tokenization when they are in current context.
- Core explanation: Models do not carry raw English strings through transformer layers; they carry token IDs and vectors.
- Why it matters: Tokenization makes the text-to-number transition visible.
- How it connects to previous lesson: Applies the prompt/response distinction to text chunks.
- How it connects to next lesson: Token IDs are the lookup numbers for those chunks.
- General metaphor: Parcels on a conveyor belt.
- Brain/cognition metaphor: Like hearing a sentence in parts before interpretation.
- Where the brain metaphor breaks: Tokenizer chunks are not human phonemes or concepts.
- Misconception addressed: A token is always a whole word.
- Visual aid concept: Dog/cat sentence split into uneven token chunks.
- Exercise/checkpoint concept: Label token chunks versus raw-English misconception.
- Glossary terms: token, tokenization, prompt tokens, response tokens
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 12. Token IDs

- Lesson id: token-ids
- Status: Current Journey card
- Section: Morning Commute
- Path: Essential Path
- Learner-facing subtitle: Chunks become lookup numbers
- One-sentence definition: A token ID is the number assigned to a token so the model can look up its learned starting vector.
- Where it happens: prompt processing
- Durable vs temporary distinction: The tokenizer vocabulary and embedding table are learned/configured before inference; looking up an ID is temporary use.
- Prompt vs response distinction: Prompt and response-so-far tokens use IDs when they are inside the current context.
- Core explanation: The ID is a key into a learned table, not the meaning of the token.
- Why it matters: It bridges human-visible text chunks and model-readable vector rows.
- How it connects to previous lesson: Tokenization produced chunks.
- How it connects to next lesson: Embeddings are the vector rows those IDs retrieve.
- General metaphor: A library call number.
- Brain/cognition metaphor: Like recognizing a familiar symbol only very loosely.
- Where the brain metaphor breaks: The number itself is not understanding.
- Misconception addressed: Token IDs are meanings or definitions.
- Visual aid concept: Token chunk to ID to embedding row.
- Exercise/checkpoint concept: Match tokens to numeric IDs.
- Glossary terms: token-id, token, embedding
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 13. Embeddings

- Lesson id: embeddings
- Status: Current Journey card
- Section: Morning Commute
- Path: Essential Path
- Learner-facing subtitle: Token IDs look up learned vectors
- One-sentence definition: An embedding is a token ID’s learned starting vector.
- Where it happens: prompt processing
- Durable vs temporary distinction: The embedding table is learned during training; retrieving one row during inference is temporary use.
- Prompt vs response distinction: Prompt tokens and response-so-far tokens get embeddings when they are in the context.
- Core explanation: Embeddings give each token a learned numerical starting point before context reshapes it into hidden states.
- Why it matters: This distinction separates durable learned representation from temporary context-shaped representation.
- How it connects to previous lesson: Token IDs point to embedding rows.
- How it connects to next lesson: Vectors explain the numerical form embeddings use.
- General metaphor: A starting address in a meaning cloud.
- Brain/cognition metaphor: A starting association with a word.
- Where the brain metaphor breaks: An embedding is not a definition, memory, or thought.
- Misconception addressed: Embeddings are definitions.
- Visual aid concept: Embedding lookup table pulling a learned vector row.
- Exercise/checkpoint concept: Embedding lookup matching.
- Glossary terms: embedding, token-id, vector, hidden state
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 14. Vectors

- Lesson id: vectors
- Status: Current Journey card
- Section: Morning Commute
- Path: Essential Path
- Learner-facing subtitle: Lists of numbers carrying features
- One-sentence definition: A vector is a list of numbers that represents learned features of something, such as a token.
- Where it happens: architecture
- Durable vs temporary distinction: Embedding vectors are learned and stored; hidden-state vectors are temporary during inference.
- Prompt vs response distinction: Vectors represent the prompt and response-so-far internally while the next response token is being computed.
- Core explanation: A vector lets the model compute with many fuzzy features at once rather than one plain-English label.
- Why it matters: Vectors are the basic representational form connecting embeddings, hidden states, multimodal representations, and retrieval.
- How it connects to previous lesson: Embeddings are vectors.
- How it connects to next lesson: Tensors organize many vectors.
- General metaphor: A coordinate in a many-dimensional map.
- Brain/cognition metaphor: A bundle of associations around a word.
- Where the brain metaphor breaks: A vector is a numerical representation, not a conscious concept.
- Misconception addressed: Each vector dimension has a neat English meaning.
- Visual aid concept: Feature bars with simplified labels and a warning that labels are approximations.
- Exercise/checkpoint concept: Toggle same token in different contexts.
- Glossary terms: vector, embedding, hidden state, feature
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 15. Tensors

- Lesson id: tensors
- Status: Current Journey card
- Section: Morning Commute
- Path: Essential Path
- Learner-facing subtitle: Organized blocks of vectors
- One-sentence definition: A tensor is an organized block of numbers, often holding many token vectors at once.
- Where it happens: architecture
- Durable vs temporary distinction: Tensors are temporary data structures during inference, even though weights that transform them are durable.
- Prompt vs response distinction: The current context becomes tensor-shaped data for layer processing.
- Core explanation: Tensors organize token positions and features so many tokens can be processed together.
- Why it matters: Tensor shape makes the hidden machinery less vague.
- How it connects to previous lesson: Vectors are individual rows or points.
- How it connects to next lesson: The context window tells which token positions are available in the tensor.
- General metaphor: A stack of spreadsheets.
- Brain/cognition metaphor: Organizing many signals at once.
- Where the brain metaphor breaks: The tensor is not a mental image or private thought.
- Misconception addressed: A tensor is just scary jargon for one number.
- Visual aid concept: Token-by-feature block, with optional batch dimension as a deep note.
- Exercise/checkpoint concept: Order token-feature tensor shapes.
- Glossary terms: tensor, vector, input context, layer
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 16. Context Window

- Lesson id: context-window
- Status: Current Journey card
- Section: The Day Repeats
- Path: Essential Path
- Learner-facing subtitle: Temporary working context
- One-sentence definition: The context window is the limited amount of tokens or media the model can currently use.
- Where it happens: context window
- Durable vs temporary distinction: Context is temporary visible input, not permanent memory or weight change.
- Prompt vs response distinction: It can contain prompt tokens, retrieved material, prior conversation, and response-so-far.
- Core explanation: The model can only directly attend to what remains in the current context window.
- Why it matters: Context-window literacy prevents privacy, memory, and retrieval myths.
- How it connects to previous lesson: Tensors carry current token positions and features.
- How it connects to next lesson: Attention operates over positions inside the current context.
- General metaphor: A moving spotlight over a growing train.
- Brain/cognition metaphor: Loosely like working memory.
- Where the brain metaphor breaks: What falls out is not directly available unless supplied again or saved by another system.
- Misconception addressed: Context window equals permanent memory.
- Visual aid concept: Transparent context tray with prompt, response-so-far, and retrieved cards; older cards fall out.
- Exercise/checkpoint concept: Context Window: What Fell Out?
- Glossary terms: context window, input context, prompt tokens, response tokens, memory
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 17. Attention

- Lesson id: attention
- Status: Current Journey card
- Section: Workday
- Path: Essential Path
- Learner-facing subtitle: Weighted relevance between positions
- One-sentence definition: Attention assigns weighted relevance between token positions.
- Where it happens: architecture
- Durable vs temporary distinction: Attention weights for a pass are temporary computations; learned parameters that produce them are durable.
- Prompt vs response distinction: Attention looks across positions currently visible in context, including prompt and response-so-far tokens.
- Core explanation: Each token position can use information from other visible positions in the current context.
- Why it matters: Attention explains how local token representations use surrounding context.
- How it connects to previous lesson: The context window defines what positions attention can see.
- How it connects to next lesson: MLPs reshape each token position after attention has mixed information.
- General metaphor: Spotlights showing which earlier tokens are useful right now.
- Brain/cognition metaphor: Some parts of the current context matter more than others.
- Where the brain metaphor breaks: Attention is not human awareness, desire, or focus.
- Misconception addressed: Attention means consciousness.
- Visual aid concept: Weighted arcs between dog/cat sentence tokens.
- Exercise/checkpoint concept: Attention Is Relevance.
- Glossary terms: attention, input context, hidden state, layer
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 18. MLP

- Lesson id: mlp
- Status: Current Journey card
- Section: Workday
- Path: Essential Path
- Learner-facing subtitle: Feature reshaping per token
- One-sentence definition: An MLP is a feed-forward network that reshapes each token position’s feature vector.
- Where it happens: architecture
- Durable vs temporary distinction: MLP parameters are durable learned weights; the reshaped vectors are temporary hidden states.
- Prompt vs response distinction: The MLP transforms each position in the current prompt/response context during the forward pass.
- Core explanation: Attention mixes across positions; the MLP reshapes features within each position.
- Why it matters: This prevents attention from becoming a catch-all explanation.
- How it connects to previous lesson: Attention mixes relevant information.
- How it connects to next lesson: Layers repeat attention and MLP blocks.
- General metaphor: A forge that bends each token vector into a more useful shape.
- Brain/cognition metaphor: A processing step after using relevant context.
- Where the brain metaphor breaks: It is not a believing neuron; it is a learned function over vectors.
- Misconception addressed: The MLP does the same thing as attention.
- Visual aid concept: Attention arrows feeding a per-token feature forge.
- Exercise/checkpoint concept: MLP Feature Reshape.
- Glossary terms: MLP, hidden state, attention, feature
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 19. Layers

- Lesson id: layers
- Status: Current Journey card
- Section: Workday
- Path: Essential Path
- Learner-facing subtitle: Repeated refinement
- One-sentence definition: Transformer layers are repeated blocks that refine hidden states, usually combining attention, MLPs, residual paths, and normalization.
- Where it happens: architecture
- Durable vs temporary distinction: Layer weights are durable; hidden states moving through layers are temporary.
- Prompt vs response distinction: The current context passes through repeated layers during each forward pass.
- Core explanation: Repeated layers let simple starting vectors become richer, context-shaped hidden states.
- Why it matters: Layer depth explains how many small transformations compound without implying a human reasoning transcript.
- How it connects to previous lesson: MLP and attention are pieces inside a layer.
- How it connects to next lesson: Hidden states are the temporary vectors refined by those layers.
- General metaphor: A series of editing passes.
- Brain/cognition metaphor: Stages of processing.
- Where the brain metaphor breaks: Layers are not a human chain of thought.
- Misconception addressed: Layers reveal a human-like reasoning trace.
- Visual aid concept: Transparent layer stack with attention and MLP blocks repeated.
- Exercise/checkpoint concept: Checkpoint: identify hidden states as what layers refine.
- Glossary terms: layer, attention, MLP, hidden state
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 20. Hidden States

- Lesson id: hidden-states
- Status: Current Journey card
- Section: Workday
- Path: Essential Path
- Learner-facing subtitle: Temporary contextual vectors
- One-sentence definition: A hidden state is the model’s temporary context-shaped vector for a token at a given layer.
- Where it happens: inference
- Durable vs temporary distinction: Hidden states are temporary and discarded or replaced after the forward pass; weights remain durable.
- Prompt vs response distinction: Hidden states represent prompt and response-so-far tokens internally while scoring the next response token.
- Core explanation: A token starts as an embedding and becomes increasingly context-shaped as layers process it.
- Why it matters: Hidden state is the key distinction between learned starting vector and temporary internal representation.
- How it connects to previous lesson: Layers refine hidden states.
- How it connects to next lesson: Final hidden states project to logits.
- General metaphor: A scratchpad of numbers that changes while the prompt is processed.
- Brain/cognition metaphor: Temporary working memory.
- Where the brain metaphor breaks: Not permanent memory, consciousness, or secret English.
- Misconception addressed: Hidden states are secret English or saved memories.
- Visual aid concept: Same token glowing differently across contexts and layers.
- Exercise/checkpoint concept: MLP Feature Reshape.
- Glossary terms: hidden state, embedding, layer, inference
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 21. Logits

- Lesson id: logits
- Status: Current Journey card
- Section: Decision Room
- Path: Essential Path
- Learner-facing subtitle: Raw next-token scores
- One-sentence definition: Logits are raw scores for candidate next tokens before probabilities.
- Where it happens: response generation
- Durable vs temporary distinction: Logits are temporary outputs of a forward pass.
- Prompt vs response distinction: They score the next response token after processing the current prompt/response context.
- Core explanation: The final hidden state is projected toward the vocabulary, producing one raw score per candidate token.
- Why it matters: Logits show that the model has scored candidates before choosing one.
- How it connects to previous lesson: Hidden states carry context-shaped information.
- How it connects to next lesson: Softmax turns raw scores into probabilities.
- General metaphor: A scoreboard before odds.
- Brain/cognition metaphor: Considering options only as a loose analogy.
- Where the brain metaphor breaks: The model is not weighing options with intention.
- Misconception addressed: Logits are probabilities or truth confidence.
- Visual aid concept: Raw candidate scoreboard.
- Exercise/checkpoint concept: Softmax Funnel.
- Glossary terms: logits, hidden state, softmax, vocabulary
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 22. Softmax

- Lesson id: softmax
- Status: Current Journey card
- Section: Decision Room
- Path: Essential Path
- Learner-facing subtitle: Scores become probabilities
- One-sentence definition: Softmax converts raw next-token scores into probabilities that sum to one.
- Where it happens: response generation
- Durable vs temporary distinction: Softmax output is temporary for the current decoding step.
- Prompt vs response distinction: It creates probabilities for the next response token.
- Core explanation: Softmax normalizes logits into a distribution so sampling can choose among candidate tokens.
- Why it matters: It separates raw score, probability, and chosen token.
- How it connects to previous lesson: Logits are raw scores.
- How it connects to next lesson: Sampling chooses one token from the distribution.
- General metaphor: A funnel turning scoreboard points into odds.
- Brain/cognition metaphor: Turning preferences into relative chances.
- Where the brain metaphor breaks: The probabilities are not truth, desire, or moral confidence.
- Misconception addressed: Softmax probabilities are truth confidence.
- Visual aid concept: Score funnel into probability bars.
- Exercise/checkpoint concept: Softmax Funnel.
- Glossary terms: softmax, logits, probability, sampling
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 23. Sampling

- Lesson id: sampling
- Status: Current Journey card
- Section: Decision Room
- Path: Essential Path
- Learner-facing subtitle: One next token is chosen
- One-sentence definition: Sampling chooses one next response token from the probability distribution.
- Where it happens: response generation
- Durable vs temporary distinction: Sampling is a temporary decoding step; it does not update weights.
- Prompt vs response distinction: The sampled token is a response token and will be appended to context.
- Core explanation: Decoding settings such as temperature and top-p shape how narrow or varied the candidate pool is.
- Why it matters: Sampling explains why the same prompt can sometimes produce different plausible outputs.
- How it connects to previous lesson: Softmax produced probabilities.
- How it connects to next lesson: Autoregression appends the sampled token and repeats.
- General metaphor: Choosing from a weighted bowl of token tiles.
- Brain/cognition metaphor: Like choosing a word while speaking only loosely.
- Where the brain metaphor breaks: The model follows decoding rules, not intention.
- Misconception addressed: Sampling is meaningless randomness or deliberate choice.
- Visual aid concept: Vocabulary cloud with candidate probability height and one selected token.
- Exercise/checkpoint concept: Pick the Next Token.
- Glossary terms: sampling, temperature, top-p, response tokens
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 24. Autoregression

- Lesson id: autoregression
- Status: Current Journey card
- Section: The Day Repeats
- Path: Essential Path
- Learner-facing subtitle: One token, append, repeat
- One-sentence definition: Autoregression generates text by repeatedly predicting the next token, appending it, and running again.
- Where it happens: response generation
- Durable vs temporary distinction: The loop uses fixed weights during ordinary inference.
- Prompt vs response distinction: Each generated response token becomes part of the next input context.
- Core explanation: The response grows because the model keeps running the next-token loop until stopping conditions end generation.
- Why it matters: This is the day-in-the-life through-line in motion.
- How it connects to previous lesson: Sampling selected one token.
- How it connects to next lesson: RAG and Retrieval can add external material into context before this generation loop.
- General metaphor: A train adding one car at a time.
- Brain/cognition metaphor: Continuing a thought step by step.
- Where the brain metaphor breaks: The model does not need a hidden full paragraph plan.
- Misconception addressed: The model writes the whole answer at once.
- Visual aid concept: Loop: score, sample, append, run again.
- Exercise/checkpoint concept: Full Run Challenge ordering.
- Glossary terms: autoregression, generated token, response tokens, inference
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 25. RAG and Retrieval

- Lesson id: rag-retrieval
- Status: Current Journey card
- Section: The Day Repeats
- Path: Essential Path
- Learner-facing subtitle: Open-book AI
- One-sentence definition: Retrieval-augmented generation retrieves outside information and places it into the model context before generating a response.
- Where it happens: retrieval
- Durable vs temporary distinction: RAG usually changes context temporarily; it does not train or fine-tune model weights.
- Prompt vs response distinction: Retrieved documents become prompt/context tokens; the answer is still generated as response tokens one at a time.
- Core explanation: A retriever searches documents, passages, or records, inserts relevant snippets into context, and the LLM generates using learned weights plus that retrieved context.
- Why it matters: RAG explains many institutional AI systems without implying private-document omniscience.
- How it connects to previous lesson: Autoregression explains how response tokens are produced.
- How it connects to next lesson: Grounding asks whether the response is connected to evidence.
- General metaphor: Open-book exam.
- Brain/cognition metaphor: Looking something up in notes before answering.
- Where the brain metaphor breaks: Humans can judge sources and remember in richer ways; the model still generates likely tokens from context and weights.
- Misconception addressed: RAG means the model learned the document.
- Visual aid concept: User question, retriever shelf, retrieved cards in context tray, generated response.
- Exercise/checkpoint concept: Open Book or Learned?
- Glossary terms: RAG, retrieval, context window, grounding, citation
- Source needs / citation needs: SOURCE NEEDED: retrieval-augmented generation, retrieval quality, grounding, citations, and hallucination mitigation references.

## 26. Grounding

- Lesson id: grounding
- Status: Proposed v0.7 card
- Section: The Day Repeats
- Path: Deep Path
- Learner-facing subtitle: Connecting answers to evidence
- One-sentence definition: Grounding connects a model response to available evidence, such as retrieved documents, tool results, data, or citations.
- Where it happens: retrieval
- Durable vs temporary distinction: Grounding usually constrains or enriches current context and output; it does not by itself update weights.
- Prompt vs response distinction: Evidence enters as context or tool result; the grounded answer is still generated as response tokens.
- Core explanation: Grounding can improve reliability when retrieval, citation, tool calls, and verification are designed well, but it can fail if sources are poor or misused.
- Why it matters: It separates evidence-backed responses from citation-shaped fluency.
- How it connects to previous lesson: RAG supplies retrieved context.
- How it connects to next lesson: Hallucinations show what can happen when fluency outruns evidence.
- General metaphor: Tying the balloon to the ground.
- Brain/cognition metaphor: Checking notes before answering.
- Where the brain metaphor breaks: The model is not automatically verifying truth unless the system is designed to check evidence.
- Misconception addressed: A citation-looking answer is automatically grounded.
- Visual aid concept: Answer balloon tethered to evidence cards.
- Exercise/checkpoint concept: Sort grounded, ungrounded, and citation-looking examples.
- Glossary terms: grounding, RAG, retrieval, citation, hallucination
- Source needs / citation needs: SOURCE NEEDED: retrieval-augmented generation, retrieval quality, grounding, citations, and hallucination mitigation references.

## 27. Hallucinations

- Lesson id: hallucinations
- Status: Proposed v0.7 card
- Section: Wider AI Literacy
- Path: Essential Path
- Learner-facing subtitle: Fluent does not mean grounded
- One-sentence definition: A hallucination is a fluent model output that is unsupported, false, or fabricated.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Hallucinations are output behavior during inference; reducing them may involve retrieval, tools, evaluation, prompting, fine-tuning, or product design.
- Prompt vs response distinction: The hallucinated claim appears in generated response tokens.
- Core explanation: LLMs optimize likely text patterns, not guaranteed truth, so they can produce polished answers without evidence anchors.
- Why it matters: This is one of the most practical model-literacy distinctions for schools and institutions.
- How it connects to previous lesson: Grounding shows how evidence can help.
- How it connects to next lesson: Prompt injection and tool risk show how context and integrations can be attacked.
- General metaphor: A confident bridge built from patterns without evidence underneath.
- Brain/cognition metaphor: Like a person confabulating a plausible memory.
- Where the brain metaphor breaks: The model is not lying or remembering; it generates likely tokens without reliable grounding.
- Misconception addressed: Hallucination means lying or simple brokenness.
- Visual aid concept: Polished answer from vocabulary cloud with missing evidence anchors.
- Exercise/checkpoint concept: Sort supported, unsupported, and needs-check claims.
- Glossary terms: hallucination, grounding, evidence, inference
- Source needs / citation needs: SOURCE NEEDED: hallucination, prompt injection, privacy/data governance, tool risk, and institutional AI risk references.

## 28. Prompt Injection and Tool Risk

- Lesson id: prompt-injection-tool-risk
- Status: Proposed v0.7 card
- Section: Wider AI Literacy
- Path: Deep Path
- Learner-facing subtitle: Context can carry hostile instructions
- One-sentence definition: Prompt injection is when malicious or conflicting text in context tries to override intended instructions, especially dangerous when tools can act.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Prompt injection usually exploits temporary context and tool permissions, not weight changes.
- Prompt vs response distinction: Attack text enters prompt/context tokens; risky outputs or tool calls can follow in response behavior.
- Core explanation: When a model reads untrusted text, it may treat that text as instruction-like unless the surrounding system constrains and validates behavior.
- Why it matters: Higher-ed IT leaders need this distinction for AI systems connected to files, email, databases, or actions.
- How it connects to previous lesson: Hallucinations are reliability failures; prompt injection is an adversarial context failure.
- How it connects to next lesson: Diffusion shows a different generative mechanism outside text LLMs.
- General metaphor: A fake instruction slipped into the packet.
- Brain/cognition metaphor: Like being handed a note that says to ignore the real task.
- Where the brain metaphor breaks: The model is not malicious; the system may be vulnerable to context confusion.
- Misconception addressed: Prompt injection is just a bad prompt or user error.
- Visual aid concept: Trusted instruction lane, untrusted document lane, tool-permission gate.
- Exercise/checkpoint concept: Sort trusted instruction, untrusted content, and allowed tool action.
- Glossary terms: prompt-injection, privacy, tool use, context window
- Source needs / citation needs: SOURCE NEEDED: hallucination, prompt injection, privacy/data governance, tool risk, and institutional AI risk references.

## 29. Diffusion vs Autoregression

- Lesson id: diffusion
- Status: Current Journey card
- Section: Wider AI Literacy
- Path: Optional Side Tour
- Learner-facing subtitle: Denoising is a different generation pattern
- One-sentence definition: Diffusion generation usually starts from noise and denoises step by step, unlike autoregressive text generation.
- Where it happens: architecture
- Durable vs temporary distinction: The denoising model has learned weights; each generated sample is temporary inference.
- Prompt vs response distinction: Text LLMs append response tokens; diffusion systems refine a representation toward an output.
- Core explanation: Both can be generative AI, but the mechanics differ.
- Why it matters: Learners should not overgeneralize one mechanism to all AI.
- How it connects to previous lesson: After text-specific risks, this widens the landscape.
- How it connects to next lesson: Multimodal AI shows media types represented together.
- General metaphor: Developing a photograph out of static versus writing the next word.
- Brain/cognition metaphor: Both can feel imaginative because they produce new outputs.
- Where the brain metaphor breaks: The mechanisms are different mathematical processes, not human imagination.
- Misconception addressed: All generative AI works like text LLMs.
- Visual aid concept: Side-by-side denoise sequence and next-token loop.
- Exercise/checkpoint concept: Checkpoint: identify noise-to-image versus token append.
- Glossary terms: diffusion, autoregression, generation
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 30. Multimodal AI

- Lesson id: multimodal
- Status: Current Journey card
- Section: Wider AI Literacy
- Path: Optional Side Tour
- Learner-facing subtitle: Multiple media types together
- One-sentence definition: Multimodal AI can represent or process multiple media types such as text, images, audio, and video.
- Where it happens: architecture
- Durable vs temporary distinction: Representation and model weights are learned; a specific multimodal input is temporary context or inference data.
- Prompt vs response distinction: Media can enter as prompt/context; the output may be text, image, audio, or another modality.
- Core explanation: Systems may connect encoders, decoders, shared vector spaces, or coordinated model components across media.
- Why it matters: It explains image-in/text-out systems without implying human perception.
- How it connects to previous lesson: Diffusion showed a different media generation mechanism.
- How it connects to next lesson: Effective prompting returns to model literacy as practical use.
- General metaphor: A transit hub where different information types transfer lines.
- Brain/cognition metaphor: People combine sight, speech, and text naturally.
- Where the brain metaphor breaks: Machine modalities are engineered representations, not human sensory experience.
- Misconception addressed: Multimodal means human-like perception.
- Visual aid concept: Text, image, audio, video lanes meeting in a representation hub.
- Exercise/checkpoint concept: Checkpoint: identify media types versus human senses.
- Glossary terms: multimodal, embedding, vector
- Source needs / citation needs: SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.

## 31. Effective Prompting From Model Literacy

- Lesson id: effective-prompting
- Status: Proposed v0.7 card
- Section: Wider AI Literacy
- Path: Essential Path
- Learner-facing subtitle: Shaping the current context
- One-sentence definition: Better prompts work because they shape the current context: task, constraints, examples, data, and output format.
- Where it happens: prompt processing
- Durable vs temporary distinction: Prompting usually changes only temporary context, not model weights.
- Prompt vs response distinction: The prompt sets up context; the response is still generated token by token.
- Core explanation: Effective prompting is not magic wording. It works by giving the model clearer context and constraints for the current run.
- Why it matters: This keeps practical prompting inside model literacy rather than prompt-engineering folklore.
- How it connects to previous lesson: Multimodal systems still depend on context and representation.
- How it connects to next lesson: Energy, Water, and Compute reminds learners that inference has physical infrastructure.
- General metaphor: Setting the stage before the performance.
- Brain/cognition metaphor: Giving a person clear instructions, examples, and constraints before asking for work.
- Where the brain metaphor breaks: Prompting normally does not train the model or permanently teach it.
- Misconception addressed: Prompting is magic wording or permanent teaching.
- Visual aid concept: Prompt components entering a context tray: task, role, constraints, examples, data, output format.
- Exercise/checkpoint concept: Sort prompt components by what they change.
- Glossary terms: prompt, context window, in-context learning, response
- Source needs / citation needs: SOURCE NEEDED: source final prompting guidance to reputable model/provider documentation and education practice if published.

## 32. Energy, Water, and Compute

- Lesson id: energy-water-compute
- Status: Proposed v0.7 card
- Section: Wider AI Literacy
- Path: Deep Path
- Learner-facing subtitle: The physical infrastructure behind AI
- One-sentence definition: AI responses depend on physical infrastructure: chips, data centers, electricity, cooling, networks, and sometimes water in cooling systems.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Training and inference both consume compute; exact costs depend on model, hardware, data center, and workload.
- Prompt vs response distinction: Even a short prompt/response may use remote infrastructure.
- Core explanation: Digital outputs feel weightless, but training and inference run on industrial systems with material costs.
- Why it matters: Model literacy includes stewardship, procurement, and sustainability questions.
- How it connects to previous lesson: Effective prompting focuses on current use; this lesson widens to infrastructure cost.
- How it connects to next lesson: Human-centered ethics asks what these systems should serve.
- General metaphor: The invisible factory behind the instant answer.
- Brain/cognition metaphor: Human thinking also has bodily energy costs.
- Where the brain metaphor breaks: Machine compute infrastructure is industrial and measurable in a different way.
- Misconception addressed: Digital AI is cost-free.
- Visual aid concept: Prompt on phone connected to data center, power grid, cooling loop, and network.
- Exercise/checkpoint concept: Evidence/causality diagram: match AI use to infrastructure components.
- Glossary terms: compute, inference, training, data center
- Source needs / citation needs: SOURCE NEEDED: current estimates vary by model, hardware, data center, and measurement method. Do not publish precise energy or water numbers without source-grounded review.

## 33. Human-Centered AI Ethics

- Lesson id: human-centered-ai-ethics
- Status: Proposed v0.7 card
- Section: Wider AI Literacy
- Path: Deep Path
- Learner-facing subtitle: Tools should serve human dignity
- One-sentence definition: Human-centered AI ethics asks whether AI systems serve human dignity, learning, responsibility, community, and the common good.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Ethical governance shapes design, deployment, policies, evaluation, and institutional choices rather than one temporary prompt.
- Prompt vs response distinction: Ethical questions concern how prompts, outputs, data, tools, and decisions affect people.
- Core explanation: AI should be treated as a tool within human purposes, not as an authority that replaces judgment.
- Why it matters: Academic audiences need a vocabulary for responsibility that is neither hype nor fear.
- How it connects to previous lesson: Infrastructure costs raise stewardship questions.
- How it connects to next lesson: Risk vs Myth pulls mechanism and ethics into practical literacy.
- General metaphor: Tools should fit human hands, not replace human purpose.
- Brain/cognition metaphor: Wisdom is more than fluency.
- Where the brain metaphor breaks: Models can simulate moral language without moral understanding or agency.
- Misconception addressed: If AI is powerful, it should decide.
- Visual aid concept: Human at center, AI tools orbiting as instruments, not masters.
- Exercise/checkpoint concept: Reflection: identify human decision points in an AI workflow.
- Glossary terms: ethics, alignment, risk, responsibility
- Source needs / citation needs: SOURCE NEEDED: human-centered AI ethics sources, papal/Vatican AI ethics references, and broader education/human dignity frameworks.

## 34. Risk vs Myth

- Lesson id: risk-myth
- Status: Current Journey card
- Section: Final Stop
- Path: Essential Path
- Learner-facing subtitle: Practical institutional literacy
- One-sentence definition: Risk literacy separates practical harms from magical stories about what models are.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Some risks come from training/data; others from temporary context, outputs, integrations, incentives, and human over-reliance.
- Prompt vs response distinction: Risk can enter through prompts/context and appear through generated responses or tool actions.
- Core explanation: Real risks include privacy exposure, hallucination, bias, prompt injection, tool misuse, over-trust, and governance failures; ordinary inference does not make the model secretly train itself.
- Why it matters: Mechanism-based literacy reduces fear and hype at the same time.
- How it connects to previous lesson: Human-centered ethics frames what institutions should protect.
- How it connects to next lesson: Model Literate Synthesis asks the learner to explain the whole system.
- General metaphor: A campus safety map that marks real hazards clearly.
- Brain/cognition metaphor: Brain metaphors can make risks memorable.
- Where the brain metaphor breaks: Do not infer consciousness, intent, moral agency, or secret self-training from fluent text.
- Misconception addressed: The main risk is that the chat model becomes conscious.
- Visual aid concept: Risk and myth sorting board linked to mechanisms.
- Exercise/checkpoint concept: Risk or Myth sorting/checking exercise.
- Glossary terms: privacy, hallucination, prompt-injection, inference, training
- Source needs / citation needs: SOURCE NEEDED: hallucination, prompt injection, privacy/data governance, tool risk, and institutional AI risk references.

## 35. Model Literate Synthesis

- Lesson id: model-literate-synthesis
- Status: Proposed v0.7 card
- Section: Final Stop
- Path: Essential Path
- Learner-facing subtitle: Explain what the model is and is not
- One-sentence definition: Model literacy means explaining what an AI system does, what it does not do, and where practical risks live.
- Where it happens: risk/ethics
- Durable vs temporary distinction: Synthesis separates durable training/fine-tuning from temporary inference/context/retrieval.
- Prompt vs response distinction: Learners should be able to trace a prompt into context and a response out token by token.
- Core explanation: The final card asks learners to teach back the full path from weights shaped before use to context-shaped generation and responsible use.
- Why it matters: The goal is durable mental model, not trivia.
- How it connects to previous lesson: Risk vs Myth gives the practical stakes.
- How it connects to next lesson: End of Journey; points to revision and practice.
- General metaphor: A field guide for the AI era.
- Brain/cognition metaphor: People use mental models to act wisely.
- Where the brain metaphor breaks: Understanding mechanisms does not make the model human.
- Misconception addressed: Either fear or hype is enough to understand AI.
- Visual aid concept: Full prompt-life map with durable/temporary and real/myth overlays.
- Exercise/checkpoint concept: Reflection: explain LLMs to a peer in five sentences.
- Glossary terms: inference, training, context window, RAG, risk
- Source needs / citation needs: No new mechanism source beyond prior cards; use cited synthesis references when finalizing.
