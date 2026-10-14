import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'curriculum')
const generatedDate = '2026-06-02'

const pathLabels = {
  essential: 'Essential Path',
  deep: 'Deep Path',
  optional: 'Optional Side Tour'
}

const sourceBuckets = {
  architecture: 'SOURCE NEEDED: transformer architecture, attention/MLP/layer descriptions, and current plain-language transformer references.',
  training: 'SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.',
  retrieval: 'SOURCE NEEDED: retrieval-augmented generation, retrieval quality, grounding, citations, and hallucination mitigation references.',
  risk: 'SOURCE NEEDED: hallucination, prompt injection, privacy/data governance, tool risk, and institutional AI risk references.',
  energy: 'SOURCE NEEDED: current estimates vary by model, hardware, data center, and measurement method. Do not publish precise energy or water numbers without source-grounded review.',
  ethics: 'SOURCE NEEDED: human-centered AI ethics sources, papal/Vatican AI ethics references, and broader education/human dignity frameworks.',
  none: 'No external citation needed for draft metaphor; cite mechanism claims before publication.'
}

const currentLessonIds = new Set([
  'what-is-llm',
  'symbolic-vs-deep-learning',
  'training',
  'pretraining',
  'fine-tuning',
  'inference',
  'prompt-response',
  'tokenization',
  'token-ids',
  'embeddings',
  'vectors',
  'tensors',
  'context-window',
  'attention',
  'mlp',
  'layers',
  'hidden-states',
  'logits',
  'softmax',
  'sampling',
  'autoregression',
  'rag-retrieval',
  'diffusion',
  'multimodal',
  'risk-myth'
])

const currentAppLessonMap = [
  ['what-is-llm', 'What Is an LLM?', 'what-is-llm'],
  ['history', 'Symbolic AI vs Deep Learning', 'symbolic-vs-deep-learning'],
  ['training', 'Training', 'training'],
  ['pretraining', 'Pretraining', 'pretraining'],
  ['fine-tuning', 'Fine-Tuning', 'fine-tuning'],
  ['inference', 'Inference', 'inference'],
  ['prompt-response', 'Prompt vs Response', 'prompt-response'],
  ['tokens', 'Tokenization', 'tokenization'],
  ['token-ids', 'Token IDs', 'token-ids'],
  ['embeddings', 'Embeddings', 'embeddings'],
  ['vectors', 'Vectors', 'vectors'],
  ['tensors', 'Tensors', 'tensors'],
  ['attention', 'Attention', 'attention'],
  ['mlp', 'MLP', 'mlp'],
  ['layers', 'Layers', 'layers'],
  ['hidden-states', 'Hidden States', 'hidden-states'],
  ['logits', 'Logits', 'logits'],
  ['softmax', 'Softmax', 'softmax'],
  ['sampling', 'Sampling', 'sampling'],
  ['autoregression', 'Autoregression', 'autoregression'],
  ['context-window', 'Context Window', 'context-window'],
  ['rag-retrieval', 'RAG and Retrieval', 'rag-retrieval'],
  ['how-ai-learns', 'How AI Learns', 'Split across training, fine-tuning, alignment, RAG, grounding, and effective prompting'],
  ['diffusion', 'Diffusion vs Autoregression', 'diffusion'],
  ['multimodal', 'Multimodal AI', 'multimodal'],
  ['risk-myth', 'Risk vs Myth', 'risk-myth']
]

const lessons = [
  lesson({
    id: 'what-is-llm',
    section: 'Before Morning',
    title: 'What Is an LLM?',
    subtitle: 'A learned next-token prediction system',
    stage: 'architecture',
    path: 'essential',
    definition: 'A large language model is a learned system that predicts likely next tokens from the context it can see.',
    durable: 'Training created durable weights before use; ordinary use relies on those weights rather than rewriting them.',
    promptResponse: 'A prompt supplies visible context; the response is generated one token at a time from that context.',
    core: 'Start with the full path in miniature: context enters, fixed learned weights compute raw next-token scores, decoding chooses one token, and the token is appended before the next pass.',
    why: 'This lowers fear by making fluency mechanistic without making it trivial.',
    prev: 'Opening frame.',
    next: 'Prepares the learner to ask what kind of intellectual tradition produced this system.',
    metaphor: 'A very large autocomplete engine with learned structure, not a mind or a database.',
    brain: 'Many small signals can combine into useful patterns.',
    breaks: 'The model has no lived body, feelings, awareness, personal goals, or human understanding.',
    misconception: 'Fluent output means consciousness or database lookup.',
    visual: 'Prompt lifecycle overview with context, fixed weights, logits, sampling, and append-repeat.',
    exercise: 'Checkpoint: identify the learned prediction system rather than a mind or rulebook.',
    terms: ['prompt', 'response', 'token', 'weight', 'inference'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'rationalists-empiricists',
    section: 'Before Morning',
    title: 'Rationalists vs Empiricists',
    subtitle: 'Reason-first and experience-first ways of knowing',
    stage: 'architecture',
    path: 'optional',
    definition: 'Rationalist approaches emphasize rules and reasoning from principles; empiricist approaches emphasize learning from experience and evidence.',
    durable: 'This is conceptual background, not a model operation.',
    promptResponse: 'It frames why modern systems lean toward learned patterns before any prompt is processed.',
    core: 'Use this short intellectual-history bridge to make symbolic AI and deep learning feel less arbitrary: one tradition trusts explicit structures; another learns from examples.',
    why: 'Academic audiences often benefit from seeing LLMs as part of a longer argument about knowledge, not as a sudden magic trick.',
    prev: 'Extends the opening definition into a history-of-ideas frame.',
    next: 'Sets up Symbolic AI vs Deep Learning as the computer-science version of the contrast.',
    metaphor: 'A map drawn from first principles versus a map adjusted after many journeys.',
    brain: 'People use both abstract reasoning and experience.',
    breaks: 'The model is not a philosopher and does not choose an epistemology.',
    misconception: 'Deep learning is anti-reason or pure magic.',
    visual: 'Split-screen contrast of principle path and experience path feeding into AI history.',
    exercise: 'Checkpoint: sort rule-first and example-first descriptions.',
    terms: ['symbolic AI', 'deep learning', 'training'],
    sources: 'SOURCE NEEDED: concise history/philosophy framing if published as more than metaphor.'
  }),
  lesson({
    id: 'symbolic-vs-deep-learning',
    section: 'Before Morning',
    title: 'Symbolic AI vs Deep Learning',
    subtitle: 'Rules versus learned patterns',
    stage: 'architecture',
    path: 'essential',
    definition: 'Symbolic AI manipulates explicit symbols and rules; deep learning adjusts many weights until useful patterns are captured.',
    durable: 'Deep learning stores learned behavior in parameters; symbolic systems store explicit rules and structures.',
    promptResponse: 'An LLM prompt is processed by learned parameters, not matched against one hand-written rule for every response.',
    core: 'Modern LLMs mainly come from deep learning, though useful systems still wrap learned models with rules, policies, validation, and tools.',
    why: 'This prevents the false choice that rules are obsolete or learned systems are inexplicable.',
    prev: 'Grounds the rationalist/empiricist contrast in AI systems.',
    next: 'Leads into training as the process that shapes learned parameters.',
    metaphor: 'A rulebook beside a weather system of learned relationships.',
    brain: 'Practice can shape future behavior.',
    breaks: 'The model is optimized mathematically, not practicing with intention.',
    misconception: 'Symbolic AI is obsolete, or deep learning is magic.',
    visual: 'Rule cards on one side, learned landscape on the other, with a hybrid product layer above both.',
    exercise: 'Checkpoint: identify what gets learned versus what is explicitly written.',
    terms: ['symbolic AI', 'deep learning', 'parameter', 'training'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'training',
    section: 'Before Morning',
    title: 'Training',
    subtitle: 'Prediction error updates weights',
    stage: 'pretraining',
    path: 'essential',
    definition: 'Training updates model weights by comparing predictions with targets or preferences and adjusting parameters.',
    durable: 'Training is durable: it changes weights or training-time adapters used by future inference.',
    promptResponse: 'Training is not a live response to one user prompt; it prepares the model before ordinary use.',
    core: 'The training loop predicts, compares, measures loss or preference signal, updates weights, and repeats many times.',
    why: 'Training is where durable capability is installed.',
    prev: 'Explains how deep learning gets learned patterns.',
    next: 'Pretraining is the broad version of this weight-changing process.',
    metaphor: 'Tuning an instrument before a performance.',
    brain: 'Repeated experience can shape later behavior.',
    breaks: 'The model has no reflection, intention, or memory of lessons; optimization changes numbers.',
    misconception: 'Every chat message trains the model.',
    visual: 'Predict, compare, loss, update weights, repeat.',
    exercise: 'Training Nudge: choose when update weights belongs.',
    terms: ['training', 'weight', 'parameter', 'loss', 'inference'],
    sources: sourceBuckets.training
  }),
  lesson({
    id: 'pretraining',
    section: 'Before Morning',
    title: 'Pretraining',
    subtitle: 'Broad durable learning before normal use',
    stage: 'pretraining',
    path: 'essential',
    definition: 'Pretraining is broad early training that builds general capability through many durable weight updates.',
    durable: 'Pretraining durably changes weights.',
    promptResponse: 'It happens before everyday prompts; no single response is being generated for a user.',
    core: 'The model predicts tokens across broad data mixtures so many small updates create language patterns, associations, styles, and task structures.',
    why: 'Pretraining explains why a general model can answer across many domains before campus or course customization.',
    prev: 'A large-scale version of the training loop.',
    next: 'Overfitting and generalization explain when learned patterns transfer well or too narrowly.',
    metaphor: 'Many tiny nudges carving roads through a vast landscape.',
    brain: 'Broad education can shape later performance.',
    breaks: 'The model does not understand lessons like a person and does not reliably store every source verbatim.',
    misconception: 'Pretraining stores a perfect copy of every document.',
    visual: 'Data rain shaping a terrain with broad paths.',
    exercise: 'Checkpoint: identify durable weight change.',
    terms: ['pretraining', 'training', 'weight', 'next token'],
    sources: sourceBuckets.training
  }),
  lesson({
    id: 'overfitting-generalization',
    section: 'Before Morning',
    title: 'Overfitting and Generalization',
    subtitle: 'Learning patterns that travel',
    stage: 'pretraining',
    path: 'deep',
    definition: 'Generalization means learned patterns work on new examples; overfitting means the model clings too closely to training examples or brittle patterns.',
    durable: 'Both are outcomes of training dynamics and affect future behavior.',
    promptResponse: 'They shape what the model can do before any particular inference prompt arrives.',
    core: 'A model can learn patterns that help on new examples, or it can overfit too closely to seen examples and fail on nearby unseen cases.',
    why: 'This explains why more data and bigger models are not automatically the same as understanding.',
    prev: 'Adds nuance to pretraining.',
    next: 'Fine-tuning must adapt the model without making it too narrow or brittle.',
    metaphor: 'Studying only the answer key versus understanding the subject.',
    brain: 'Like memorizing practice questions instead of learning the principle.',
    breaks: 'The model is not consciously memorizing; optimization can make it rely on brittle patterns.',
    misconception: 'Bigger training always means better understanding.',
    visual: 'A path that perfectly traces old dots but misses new dots.',
    exercise: 'Checkpoint: pick which curve generalizes to new dots.',
    terms: ['training', 'generalization', 'overfitting', 'evaluation'],
    sources: sourceBuckets.training
  }),
  lesson({
    id: 'fine-tuning',
    section: 'Before Morning',
    title: 'Fine-Tuning',
    subtitle: 'Targeted durable shaping',
    stage: 'fine-tuning',
    path: 'essential',
    definition: 'Fine-tuning is targeted additional training after broad pretraining.',
    durable: 'Fine-tuning can durably change weights or add durable adapter-style parameters.',
    promptResponse: 'It changes future response patterns; it is not the same as one prompt or retrieved context.',
    core: 'Examples, preferences, or domain data nudge future behavior toward a task, tone, policy, or domain.',
    why: 'Institutions need to distinguish durable customization from temporary prompting and retrieval.',
    prev: 'Uses the pretrained base while managing generalization.',
    next: 'Alignment is one family of efforts that shapes helpful and safe behavior.',
    metaphor: 'Adding trails through an already huge terrain.',
    brain: 'Coaching a person toward a style of performance.',
    breaks: 'The model is not adopting values or intentions; output patterns are optimized.',
    misconception: 'Fine-tuning is just a better prompt.',
    visual: 'Targeted trail over a pretrained landscape.',
    exercise: 'Durable or Temporary sorting.',
    terms: ['fine-tuning', 'pretraining', 'training', 'prompt'],
    sources: sourceBuckets.training
  }),
  lesson({
    id: 'alignment',
    section: 'Before Morning',
    title: 'Alignment',
    subtitle: 'Shaping behavior toward human intent',
    stage: 'fine-tuning',
    path: 'deep',
    definition: 'Alignment is the effort to shape model behavior toward human goals, instructions, safety boundaries, and preferences.',
    durable: 'Some alignment work changes weights through fine-tuning or preference optimization; some uses policies, system prompts, evaluation, or product design.',
    promptResponse: 'Alignment affects how future responses behave but does not mean one prompt permanently teaches the model.',
    core: 'Alignment combines training signals, system design, policy layers, evaluation, and human feedback to make model behavior more helpful and less harmful.',
    why: 'It gives learners a mechanism-based way to discuss safety without implying the model has morals.',
    prev: 'A targeted use of fine-tuning and system design.',
    next: 'Inference shows how the aligned model is used during ordinary prompting.',
    metaphor: 'Guardrails and coaching.',
    brain: 'Like learning social norms or professional expectations.',
    breaks: 'The model does not acquire human values or moral agency.',
    misconception: 'Alignment means the model is morally good or understands ethics.',
    visual: 'Response landscape with preferred paths, warning zones, and policy rails.',
    exercise: 'Checkpoint: distinguish behavioral shaping from moral understanding.',
    terms: ['alignment', 'fine-tuning', 'human feedback', 'policy'],
    sources: sourceBuckets.training
  }),
  lesson({
    id: 'inference',
    section: 'Prompt Arrives',
    title: 'Inference',
    subtitle: 'A forward pass, not a memory update',
    stage: 'inference',
    path: 'essential',
    definition: 'Inference is normal model use: fixed weights process the current context to generate response tokens.',
    durable: 'Inference creates temporary activations and hidden states; it does not normally durably update weights.',
    promptResponse: 'The prompt and response-so-far enter the forward pass; a next response token is scored and chosen.',
    core: 'Inference uses the trained model: current context moves through layers, logits are produced, decoding chooses a token, and the loop repeats.',
    why: 'This is the line between using a model and training a model.',
    prev: 'Uses the trained/fine-tuned/aligned model.',
    next: 'Prompt vs Response names what is given and what is generated.',
    metaphor: 'Using a map, not redrawing the map.',
    brain: 'Internal states can change temporarily, like working through a problem.',
    breaks: 'Those states are temporary computations, not memories or beliefs.',
    misconception: 'Inference trains the model.',
    visual: 'Forward-pass pipeline with fixed weights below temporary activations.',
    exercise: 'Training Nudge.',
    terms: ['inference', 'forward pass', 'hidden state', 'logits'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'prompt-response',
    section: 'Prompt Arrives',
    title: 'Prompt vs Response',
    subtitle: 'Given context versus generated tokens',
    stage: 'prompt processing',
    path: 'essential',
    definition: 'The prompt is supplied input context; the response is generated tokens added after the model reads the context.',
    durable: 'Neither prompt nor response normally changes weights during ordinary inference.',
    promptResponse: 'This lesson is the explicit distinction: prompt tokens are given; response tokens are generated one at a time.',
    core: 'Response-so-far becomes part of the next input context, so the boundary moves as generation proceeds.',
    why: 'It prevents the common myth that the model writes a complete answer all at once.',
    prev: 'Makes the inference path concrete.',
    next: 'Tokenization shows how both prompt and response-so-far become model-readable chunks.',
    metaphor: 'Given cards on a table, then new cards added one by one.',
    brain: 'Like continuing a sentence after reading a prompt.',
    breaks: 'The model samples from probabilities rather than deciding what it means to say.',
    misconception: 'The model writes the whole answer at once.',
    visual: 'Prompt cards and generated response cards entering the current context together.',
    exercise: 'Prompt or Response label exercise.',
    terms: ['prompt', 'response', 'prompt tokens', 'response tokens', 'context window'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'tokenization',
    section: 'Morning Commute',
    title: 'Tokenization',
    subtitle: 'Text becomes chunks',
    stage: 'prompt processing',
    path: 'essential',
    definition: 'Tokenization splits text into chunks the model can represent as token IDs.',
    durable: 'Tokenization is a deterministic or tokenizer-defined preprocessing step during inference; it does not change weights.',
    promptResponse: 'Prompt tokens and response-so-far tokens both pass through tokenization when they are in current context.',
    core: 'Models do not carry raw English strings through transformer layers; they carry token IDs and vectors.',
    why: 'Tokenization makes the text-to-number transition visible.',
    prev: 'Applies the prompt/response distinction to text chunks.',
    next: 'Token IDs are the lookup numbers for those chunks.',
    metaphor: 'Parcels on a conveyor belt.',
    brain: 'Like hearing a sentence in parts before interpretation.',
    breaks: 'Tokenizer chunks are not human phonemes or concepts.',
    misconception: 'A token is always a whole word.',
    visual: 'Dog/cat sentence split into uneven token chunks.',
    exercise: 'Label token chunks versus raw-English misconception.',
    terms: ['token', 'tokenization', 'prompt tokens', 'response tokens'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'token-ids',
    section: 'Morning Commute',
    title: 'Token IDs',
    subtitle: 'Chunks become lookup numbers',
    stage: 'prompt processing',
    path: 'essential',
    definition: 'A token ID is the number assigned to a token so the model can look up its learned starting vector.',
    durable: 'The tokenizer vocabulary and embedding table are learned/configured before inference; looking up an ID is temporary use.',
    promptResponse: 'Prompt and response-so-far tokens use IDs when they are inside the current context.',
    core: 'The ID is a key into a learned table, not the meaning of the token.',
    why: 'It bridges human-visible text chunks and model-readable vector rows.',
    prev: 'Tokenization produced chunks.',
    next: 'Embeddings are the vector rows those IDs retrieve.',
    metaphor: 'A library call number.',
    brain: 'Like recognizing a familiar symbol only very loosely.',
    breaks: 'The number itself is not understanding.',
    misconception: 'Token IDs are meanings or definitions.',
    visual: 'Token chunk to ID to embedding row.',
    exercise: 'Match tokens to numeric IDs.',
    terms: ['token-id', 'token', 'embedding'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'embeddings',
    section: 'Morning Commute',
    title: 'Embeddings',
    subtitle: 'Token IDs look up learned vectors',
    stage: 'prompt processing',
    path: 'essential',
    definition: 'An embedding is a token ID’s learned starting vector.',
    durable: 'The embedding table is learned during training; retrieving one row during inference is temporary use.',
    promptResponse: 'Prompt tokens and response-so-far tokens get embeddings when they are in the context.',
    core: 'Embeddings give each token a learned numerical starting point before context reshapes it into hidden states.',
    why: 'This distinction separates durable learned representation from temporary context-shaped representation.',
    prev: 'Token IDs point to embedding rows.',
    next: 'Vectors explain the numerical form embeddings use.',
    metaphor: 'A starting address in a meaning cloud.',
    brain: 'A starting association with a word.',
    breaks: 'An embedding is not a definition, memory, or thought.',
    misconception: 'Embeddings are definitions.',
    visual: 'Embedding lookup table pulling a learned vector row.',
    exercise: 'Embedding lookup matching.',
    terms: ['embedding', 'token-id', 'vector', 'hidden state'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'vectors',
    section: 'Morning Commute',
    title: 'Vectors',
    subtitle: 'Lists of numbers carrying features',
    stage: 'architecture',
    path: 'essential',
    definition: 'A vector is a list of numbers that represents learned features of something, such as a token.',
    durable: 'Embedding vectors are learned and stored; hidden-state vectors are temporary during inference.',
    promptResponse: 'Vectors represent the prompt and response-so-far internally while the next response token is being computed.',
    core: 'A vector lets the model compute with many fuzzy features at once rather than one plain-English label.',
    why: 'Vectors are the basic representational form connecting embeddings, hidden states, multimodal representations, and retrieval.',
    prev: 'Embeddings are vectors.',
    next: 'Tensors organize many vectors.',
    metaphor: 'A coordinate in a many-dimensional map.',
    brain: 'A bundle of associations around a word.',
    breaks: 'A vector is a numerical representation, not a conscious concept.',
    misconception: 'Each vector dimension has a neat English meaning.',
    visual: 'Feature bars with simplified labels and a warning that labels are approximations.',
    exercise: 'Toggle same token in different contexts.',
    terms: ['vector', 'embedding', 'hidden state', 'feature'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'tensors',
    section: 'Morning Commute',
    title: 'Tensors',
    subtitle: 'Organized blocks of vectors',
    stage: 'architecture',
    path: 'essential',
    definition: 'A tensor is an organized block of numbers, often holding many token vectors at once.',
    durable: 'Tensors are temporary data structures during inference, even though weights that transform them are durable.',
    promptResponse: 'The current context becomes tensor-shaped data for layer processing.',
    core: 'Tensors organize token positions and features so many tokens can be processed together.',
    why: 'Tensor shape makes the hidden machinery less vague.',
    prev: 'Vectors are individual rows or points.',
    next: 'The context window tells which token positions are available in the tensor.',
    metaphor: 'A stack of spreadsheets.',
    brain: 'Organizing many signals at once.',
    breaks: 'The tensor is not a mental image or private thought.',
    misconception: 'A tensor is just scary jargon for one number.',
    visual: 'Token-by-feature block, with optional batch dimension as a deep note.',
    exercise: 'Order token-feature tensor shapes.',
    terms: ['tensor', 'vector', 'input context', 'layer'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'context-window',
    section: 'The Day Repeats',
    title: 'Context Window',
    subtitle: 'Temporary working context',
    stage: 'context window',
    path: 'essential',
    definition: 'The context window is the limited amount of tokens or media the model can currently use.',
    durable: 'Context is temporary visible input, not permanent memory or weight change.',
    promptResponse: 'It can contain prompt tokens, retrieved material, prior conversation, and response-so-far.',
    core: 'The model can only directly attend to what remains in the current context window.',
    why: 'Context-window literacy prevents privacy, memory, and retrieval myths.',
    prev: 'Tensors carry current token positions and features.',
    next: 'Attention operates over positions inside the current context.',
    metaphor: 'A moving spotlight over a growing train.',
    brain: 'Loosely like working memory.',
    breaks: 'What falls out is not directly available unless supplied again or saved by another system.',
    misconception: 'Context window equals permanent memory.',
    visual: 'Transparent context tray with prompt, response-so-far, and retrieved cards; older cards fall out.',
    exercise: 'Context Window: What Fell Out?',
    terms: ['context window', 'input context', 'prompt tokens', 'response tokens', 'memory'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'attention',
    section: 'Workday',
    title: 'Attention',
    subtitle: 'Weighted relevance between positions',
    stage: 'architecture',
    path: 'essential',
    definition: 'Attention assigns weighted relevance between token positions.',
    durable: 'Attention weights for a pass are temporary computations; learned parameters that produce them are durable.',
    promptResponse: 'Attention looks across positions currently visible in context, including prompt and response-so-far tokens.',
    core: 'Each token position can use information from other visible positions in the current context.',
    why: 'Attention explains how local token representations use surrounding context.',
    prev: 'The context window defines what positions attention can see.',
    next: 'MLPs reshape each token position after attention has mixed information.',
    metaphor: 'Spotlights showing which earlier tokens are useful right now.',
    brain: 'Some parts of the current context matter more than others.',
    breaks: 'Attention is not human awareness, desire, or focus.',
    misconception: 'Attention means consciousness.',
    visual: 'Weighted arcs between dog/cat sentence tokens.',
    exercise: 'Attention Is Relevance.',
    terms: ['attention', 'input context', 'hidden state', 'layer'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'mlp',
    section: 'Workday',
    title: 'MLP',
    subtitle: 'Feature reshaping per token',
    stage: 'architecture',
    path: 'essential',
    definition: 'An MLP is a feed-forward network that reshapes each token position’s feature vector.',
    durable: 'MLP parameters are durable learned weights; the reshaped vectors are temporary hidden states.',
    promptResponse: 'The MLP transforms each position in the current prompt/response context during the forward pass.',
    core: 'Attention mixes across positions; the MLP reshapes features within each position.',
    why: 'This prevents attention from becoming a catch-all explanation.',
    prev: 'Attention mixes relevant information.',
    next: 'Layers repeat attention and MLP blocks.',
    metaphor: 'A forge that bends each token vector into a more useful shape.',
    brain: 'A processing step after using relevant context.',
    breaks: 'It is not a believing neuron; it is a learned function over vectors.',
    misconception: 'The MLP does the same thing as attention.',
    visual: 'Attention arrows feeding a per-token feature forge.',
    exercise: 'MLP Feature Reshape.',
    terms: ['MLP', 'hidden state', 'attention', 'feature'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'layers',
    section: 'Workday',
    title: 'Layers',
    subtitle: 'Repeated refinement',
    stage: 'architecture',
    path: 'essential',
    definition: 'Transformer layers are repeated blocks that refine hidden states, usually combining attention, MLPs, residual paths, and normalization.',
    durable: 'Layer weights are durable; hidden states moving through layers are temporary.',
    promptResponse: 'The current context passes through repeated layers during each forward pass.',
    core: 'Repeated layers let simple starting vectors become richer, context-shaped hidden states.',
    why: 'Layer depth explains how many small transformations compound without implying a human reasoning transcript.',
    prev: 'MLP and attention are pieces inside a layer.',
    next: 'Hidden states are the temporary vectors refined by those layers.',
    metaphor: 'A series of editing passes.',
    brain: 'Stages of processing.',
    breaks: 'Layers are not a human chain of thought.',
    misconception: 'Layers reveal a human-like reasoning trace.',
    visual: 'Transparent layer stack with attention and MLP blocks repeated.',
    exercise: 'Checkpoint: identify hidden states as what layers refine.',
    terms: ['layer', 'attention', 'MLP', 'hidden state'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'hidden-states',
    section: 'Workday',
    title: 'Hidden States',
    subtitle: 'Temporary contextual vectors',
    stage: 'inference',
    path: 'essential',
    definition: 'A hidden state is the model’s temporary context-shaped vector for a token at a given layer.',
    durable: 'Hidden states are temporary and discarded or replaced after the forward pass; weights remain durable.',
    promptResponse: 'Hidden states represent prompt and response-so-far tokens internally while scoring the next response token.',
    core: 'A token starts as an embedding and becomes increasingly context-shaped as layers process it.',
    why: 'Hidden state is the key distinction between learned starting vector and temporary internal representation.',
    prev: 'Layers refine hidden states.',
    next: 'Final hidden states project to logits.',
    metaphor: 'A scratchpad of numbers that changes while the prompt is processed.',
    brain: 'Temporary working memory.',
    breaks: 'Not permanent memory, consciousness, or secret English.',
    misconception: 'Hidden states are secret English or saved memories.',
    visual: 'Same token glowing differently across contexts and layers.',
    exercise: 'MLP Feature Reshape.',
    terms: ['hidden state', 'embedding', 'layer', 'inference'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'logits',
    section: 'Decision Room',
    title: 'Logits',
    subtitle: 'Raw next-token scores',
    stage: 'response generation',
    path: 'essential',
    definition: 'Logits are raw scores for candidate next tokens before probabilities.',
    durable: 'Logits are temporary outputs of a forward pass.',
    promptResponse: 'They score the next response token after processing the current prompt/response context.',
    core: 'The final hidden state is projected toward the vocabulary, producing one raw score per candidate token.',
    why: 'Logits show that the model has scored candidates before choosing one.',
    prev: 'Hidden states carry context-shaped information.',
    next: 'Softmax turns raw scores into probabilities.',
    metaphor: 'A scoreboard before odds.',
    brain: 'Considering options only as a loose analogy.',
    breaks: 'The model is not weighing options with intention.',
    misconception: 'Logits are probabilities or truth confidence.',
    visual: 'Raw candidate scoreboard.',
    exercise: 'Softmax Funnel.',
    terms: ['logits', 'hidden state', 'softmax', 'vocabulary'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'softmax',
    section: 'Decision Room',
    title: 'Softmax',
    subtitle: 'Scores become probabilities',
    stage: 'response generation',
    path: 'essential',
    definition: 'Softmax converts raw next-token scores into probabilities that sum to one.',
    durable: 'Softmax output is temporary for the current decoding step.',
    promptResponse: 'It creates probabilities for the next response token.',
    core: 'Softmax normalizes logits into a distribution so sampling can choose among candidate tokens.',
    why: 'It separates raw score, probability, and chosen token.',
    prev: 'Logits are raw scores.',
    next: 'Sampling chooses one token from the distribution.',
    metaphor: 'A funnel turning scoreboard points into odds.',
    brain: 'Turning preferences into relative chances.',
    breaks: 'The probabilities are not truth, desire, or moral confidence.',
    misconception: 'Softmax probabilities are truth confidence.',
    visual: 'Score funnel into probability bars.',
    exercise: 'Softmax Funnel.',
    terms: ['softmax', 'logits', 'probability', 'sampling'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'sampling',
    section: 'Decision Room',
    title: 'Sampling',
    subtitle: 'One next token is chosen',
    stage: 'response generation',
    path: 'essential',
    definition: 'Sampling chooses one next response token from the probability distribution.',
    durable: 'Sampling is a temporary decoding step; it does not update weights.',
    promptResponse: 'The sampled token is a response token and will be appended to context.',
    core: 'Decoding settings such as temperature and top-p shape how narrow or varied the candidate pool is.',
    why: 'Sampling explains why the same prompt can sometimes produce different plausible outputs.',
    prev: 'Softmax produced probabilities.',
    next: 'Autoregression appends the sampled token and repeats.',
    metaphor: 'Choosing from a weighted bowl of token tiles.',
    brain: 'Like choosing a word while speaking only loosely.',
    breaks: 'The model follows decoding rules, not intention.',
    misconception: 'Sampling is meaningless randomness or deliberate choice.',
    visual: 'Vocabulary cloud with candidate probability height and one selected token.',
    exercise: 'Pick the Next Token.',
    terms: ['sampling', 'temperature', 'top-p', 'response tokens'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'autoregression',
    section: 'The Day Repeats',
    title: 'Autoregression',
    subtitle: 'One token, append, repeat',
    stage: 'response generation',
    path: 'essential',
    definition: 'Autoregression generates text by repeatedly predicting the next token, appending it, and running again.',
    durable: 'The loop uses fixed weights during ordinary inference.',
    promptResponse: 'Each generated response token becomes part of the next input context.',
    core: 'The response grows because the model keeps running the next-token loop until stopping conditions end generation.',
    why: 'This is the day-in-the-life through-line in motion.',
    prev: 'Sampling selected one token.',
    next: 'RAG and Retrieval can add external material into context before this generation loop.',
    metaphor: 'A train adding one car at a time.',
    brain: 'Continuing a thought step by step.',
    breaks: 'The model does not need a hidden full paragraph plan.',
    misconception: 'The model writes the whole answer at once.',
    visual: 'Loop: score, sample, append, run again.',
    exercise: 'Full Run Challenge ordering.',
    terms: ['autoregression', 'generated token', 'response tokens', 'inference'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'rag-retrieval',
    section: 'The Day Repeats',
    title: 'RAG and Retrieval',
    subtitle: 'Open-book AI',
    stage: 'retrieval',
    path: 'essential',
    definition: 'Retrieval-augmented generation retrieves outside information and places it into the model context before generating a response.',
    durable: 'RAG usually changes context temporarily; it does not train or fine-tune model weights.',
    promptResponse: 'Retrieved documents become prompt/context tokens; the answer is still generated as response tokens one at a time.',
    core: 'A retriever searches documents, passages, or records, inserts relevant snippets into context, and the LLM generates using learned weights plus that retrieved context.',
    why: 'RAG explains many institutional AI systems without implying private-document omniscience.',
    prev: 'Autoregression explains how response tokens are produced.',
    next: 'Grounding asks whether the response is connected to evidence.',
    metaphor: 'Open-book exam.',
    brain: 'Looking something up in notes before answering.',
    breaks: 'Humans can judge sources and remember in richer ways; the model still generates likely tokens from context and weights.',
    misconception: 'RAG means the model learned the document.',
    visual: 'User question, retriever shelf, retrieved cards in context tray, generated response.',
    exercise: 'Open Book or Learned?',
    terms: ['RAG', 'retrieval', 'context window', 'grounding', 'citation'],
    sources: sourceBuckets.retrieval
  }),
  lesson({
    id: 'grounding',
    section: 'The Day Repeats',
    title: 'Grounding',
    subtitle: 'Connecting answers to evidence',
    stage: 'retrieval',
    path: 'deep',
    definition: 'Grounding connects a model response to available evidence, such as retrieved documents, tool results, data, or citations.',
    durable: 'Grounding usually constrains or enriches current context and output; it does not by itself update weights.',
    promptResponse: 'Evidence enters as context or tool result; the grounded answer is still generated as response tokens.',
    core: 'Grounding can improve reliability when retrieval, citation, tool calls, and verification are designed well, but it can fail if sources are poor or misused.',
    why: 'It separates evidence-backed responses from citation-shaped fluency.',
    prev: 'RAG supplies retrieved context.',
    next: 'Hallucinations show what can happen when fluency outruns evidence.',
    metaphor: 'Tying the balloon to the ground.',
    brain: 'Checking notes before answering.',
    breaks: 'The model is not automatically verifying truth unless the system is designed to check evidence.',
    misconception: 'A citation-looking answer is automatically grounded.',
    visual: 'Answer balloon tethered to evidence cards.',
    exercise: 'Sort grounded, ungrounded, and citation-looking examples.',
    terms: ['grounding', 'RAG', 'retrieval', 'citation', 'hallucination'],
    sources: sourceBuckets.retrieval
  }),
  lesson({
    id: 'hallucinations',
    section: 'Wider AI Literacy',
    title: 'Hallucinations',
    subtitle: 'Fluent does not mean grounded',
    stage: 'risk/ethics',
    path: 'essential',
    definition: 'A hallucination is a fluent model output that is unsupported, false, or fabricated.',
    durable: 'Hallucinations are output behavior during inference; reducing them may involve retrieval, tools, evaluation, prompting, fine-tuning, or product design.',
    promptResponse: 'The hallucinated claim appears in generated response tokens.',
    core: 'LLMs optimize likely text patterns, not guaranteed truth, so they can produce polished answers without evidence anchors.',
    why: 'This is one of the most practical model-literacy distinctions for schools and institutions.',
    prev: 'Grounding shows how evidence can help.',
    next: 'Prompt injection and tool risk show how context and integrations can be attacked.',
    metaphor: 'A confident bridge built from patterns without evidence underneath.',
    brain: 'Like a person confabulating a plausible memory.',
    breaks: 'The model is not lying or remembering; it generates likely tokens without reliable grounding.',
    misconception: 'Hallucination means lying or simple brokenness.',
    visual: 'Polished answer from vocabulary cloud with missing evidence anchors.',
    exercise: 'Sort supported, unsupported, and needs-check claims.',
    terms: ['hallucination', 'grounding', 'evidence', 'inference'],
    sources: sourceBuckets.risk
  }),
  lesson({
    id: 'prompt-injection-tool-risk',
    section: 'Wider AI Literacy',
    title: 'Prompt Injection and Tool Risk',
    subtitle: 'Context can carry hostile instructions',
    stage: 'risk/ethics',
    path: 'deep',
    definition: 'Prompt injection is when malicious or conflicting text in context tries to override intended instructions, especially dangerous when tools can act.',
    durable: 'Prompt injection usually exploits temporary context and tool permissions, not weight changes.',
    promptResponse: 'Attack text enters prompt/context tokens; risky outputs or tool calls can follow in response behavior.',
    core: 'When a model reads untrusted text, it may treat that text as instruction-like unless the surrounding system constrains and validates behavior.',
    why: 'Higher-ed IT leaders need this distinction for AI systems connected to files, email, databases, or actions.',
    prev: 'Hallucinations are reliability failures; prompt injection is an adversarial context failure.',
    next: 'Diffusion shows a different generative mechanism outside text LLMs.',
    metaphor: 'A fake instruction slipped into the packet.',
    brain: 'Like being handed a note that says to ignore the real task.',
    breaks: 'The model is not malicious; the system may be vulnerable to context confusion.',
    misconception: 'Prompt injection is just a bad prompt or user error.',
    visual: 'Trusted instruction lane, untrusted document lane, tool-permission gate.',
    exercise: 'Sort trusted instruction, untrusted content, and allowed tool action.',
    terms: ['prompt-injection', 'privacy', 'tool use', 'context window'],
    sources: sourceBuckets.risk
  }),
  lesson({
    id: 'diffusion',
    section: 'Wider AI Literacy',
    title: 'Diffusion vs Autoregression',
    subtitle: 'Denoising is a different generation pattern',
    stage: 'architecture',
    path: 'optional',
    definition: 'Diffusion generation usually starts from noise and denoises step by step, unlike autoregressive text generation.',
    durable: 'The denoising model has learned weights; each generated sample is temporary inference.',
    promptResponse: 'Text LLMs append response tokens; diffusion systems refine a representation toward an output.',
    core: 'Both can be generative AI, but the mechanics differ.',
    why: 'Learners should not overgeneralize one mechanism to all AI.',
    prev: 'After text-specific risks, this widens the landscape.',
    next: 'Multimodal AI shows media types represented together.',
    metaphor: 'Developing a photograph out of static versus writing the next word.',
    brain: 'Both can feel imaginative because they produce new outputs.',
    breaks: 'The mechanisms are different mathematical processes, not human imagination.',
    misconception: 'All generative AI works like text LLMs.',
    visual: 'Side-by-side denoise sequence and next-token loop.',
    exercise: 'Checkpoint: identify noise-to-image versus token append.',
    terms: ['diffusion', 'autoregression', 'generation'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'multimodal',
    section: 'Wider AI Literacy',
    title: 'Multimodal AI',
    subtitle: 'Multiple media types together',
    stage: 'architecture',
    path: 'optional',
    definition: 'Multimodal AI can represent or process multiple media types such as text, images, audio, and video.',
    durable: 'Representation and model weights are learned; a specific multimodal input is temporary context or inference data.',
    promptResponse: 'Media can enter as prompt/context; the output may be text, image, audio, or another modality.',
    core: 'Systems may connect encoders, decoders, shared vector spaces, or coordinated model components across media.',
    why: 'It explains image-in/text-out systems without implying human perception.',
    prev: 'Diffusion showed a different media generation mechanism.',
    next: 'Effective prompting returns to model literacy as practical use.',
    metaphor: 'A transit hub where different information types transfer lines.',
    brain: 'People combine sight, speech, and text naturally.',
    breaks: 'Machine modalities are engineered representations, not human sensory experience.',
    misconception: 'Multimodal means human-like perception.',
    visual: 'Text, image, audio, video lanes meeting in a representation hub.',
    exercise: 'Checkpoint: identify media types versus human senses.',
    terms: ['multimodal', 'embedding', 'vector'],
    sources: sourceBuckets.architecture
  }),
  lesson({
    id: 'effective-prompting',
    section: 'Wider AI Literacy',
    title: 'Effective Prompting From Model Literacy',
    subtitle: 'Shaping the current context',
    stage: 'prompt processing',
    path: 'essential',
    definition: 'Better prompts work because they shape the current context: task, constraints, examples, data, and output format.',
    durable: 'Prompting usually changes only temporary context, not model weights.',
    promptResponse: 'The prompt sets up context; the response is still generated token by token.',
    core: 'Effective prompting is not magic wording. It works by giving the model clearer context and constraints for the current run.',
    why: 'This keeps practical prompting inside model literacy rather than prompt-engineering folklore.',
    prev: 'Multimodal systems still depend on context and representation.',
    next: 'Energy, Water, and Compute reminds learners that inference has physical infrastructure.',
    metaphor: 'Setting the stage before the performance.',
    brain: 'Giving a person clear instructions, examples, and constraints before asking for work.',
    breaks: 'Prompting normally does not train the model or permanently teach it.',
    misconception: 'Prompting is magic wording or permanent teaching.',
    visual: 'Prompt components entering a context tray: task, role, constraints, examples, data, output format.',
    exercise: 'Sort prompt components by what they change.',
    terms: ['prompt', 'context window', 'in-context learning', 'response'],
    sources: 'SOURCE NEEDED: source final prompting guidance to reputable model/provider documentation and education practice if published.'
  }),
  lesson({
    id: 'energy-water-compute',
    section: 'Wider AI Literacy',
    title: 'Energy, Water, and Compute',
    subtitle: 'The physical infrastructure behind AI',
    stage: 'risk/ethics',
    path: 'deep',
    definition: 'AI responses depend on physical infrastructure: chips, data centers, electricity, cooling, networks, and sometimes water in cooling systems.',
    durable: 'Training and inference both consume compute; exact costs depend on model, hardware, data center, and workload.',
    promptResponse: 'Even a short prompt/response may use remote infrastructure.',
    core: 'Digital outputs feel weightless, but training and inference run on industrial systems with material costs.',
    why: 'Model literacy includes stewardship, procurement, and sustainability questions.',
    prev: 'Effective prompting focuses on current use; this lesson widens to infrastructure cost.',
    next: 'Human-centered ethics asks what these systems should serve.',
    metaphor: 'The invisible factory behind the instant answer.',
    brain: 'Human thinking also has bodily energy costs.',
    breaks: 'Machine compute infrastructure is industrial and measurable in a different way.',
    misconception: 'Digital AI is cost-free.',
    visual: 'Prompt on phone connected to data center, power grid, cooling loop, and network.',
    exercise: 'Evidence/causality diagram: match AI use to infrastructure components.',
    terms: ['compute', 'inference', 'training', 'data center'],
    sources: sourceBuckets.energy
  }),
  lesson({
    id: 'human-centered-ai-ethics',
    section: 'Wider AI Literacy',
    title: 'Human-Centered AI Ethics',
    subtitle: 'Tools should serve human dignity',
    stage: 'risk/ethics',
    path: 'deep',
    definition: 'Human-centered AI ethics asks whether AI systems serve human dignity, learning, responsibility, community, and the common good.',
    durable: 'Ethical governance shapes design, deployment, policies, evaluation, and institutional choices rather than one temporary prompt.',
    promptResponse: 'Ethical questions concern how prompts, outputs, data, tools, and decisions affect people.',
    core: 'AI should be treated as a tool within human purposes, not as an authority that replaces judgment.',
    why: 'Academic audiences need a vocabulary for responsibility that is neither hype nor fear.',
    prev: 'Infrastructure costs raise stewardship questions.',
    next: 'Risk vs Myth pulls mechanism and ethics into practical literacy.',
    metaphor: 'Tools should fit human hands, not replace human purpose.',
    brain: 'Wisdom is more than fluency.',
    breaks: 'Models can simulate moral language without moral understanding or agency.',
    misconception: 'If AI is powerful, it should decide.',
    visual: 'Human at center, AI tools orbiting as instruments, not masters.',
    exercise: 'Reflection: identify human decision points in an AI workflow.',
    terms: ['ethics', 'alignment', 'risk', 'responsibility'],
    sources: sourceBuckets.ethics
  }),
  lesson({
    id: 'risk-myth',
    section: 'Final Stop',
    title: 'Risk vs Myth',
    subtitle: 'Practical institutional literacy',
    stage: 'risk/ethics',
    path: 'essential',
    definition: 'Risk literacy separates practical harms from magical stories about what models are.',
    durable: 'Some risks come from training/data; others from temporary context, outputs, integrations, incentives, and human over-reliance.',
    promptResponse: 'Risk can enter through prompts/context and appear through generated responses or tool actions.',
    core: 'Real risks include privacy exposure, hallucination, bias, prompt injection, tool misuse, over-trust, and governance failures; ordinary inference does not make the model secretly train itself.',
    why: 'Mechanism-based literacy reduces fear and hype at the same time.',
    prev: 'Human-centered ethics frames what institutions should protect.',
    next: 'Model Literate Synthesis asks the learner to explain the whole system.',
    metaphor: 'A campus safety map that marks real hazards clearly.',
    brain: 'Brain metaphors can make risks memorable.',
    breaks: 'Do not infer consciousness, intent, moral agency, or secret self-training from fluent text.',
    misconception: 'The main risk is that the chat model becomes conscious.',
    visual: 'Risk and myth sorting board linked to mechanisms.',
    exercise: 'Risk or Myth sorting/checking exercise.',
    terms: ['privacy', 'hallucination', 'prompt-injection', 'inference', 'training'],
    sources: sourceBuckets.risk
  }),
  lesson({
    id: 'model-literate-synthesis',
    section: 'Final Stop',
    title: 'Model Literate Synthesis',
    subtitle: 'Explain what the model is and is not',
    stage: 'risk/ethics',
    path: 'essential',
    definition: 'Model literacy means explaining what an AI system does, what it does not do, and where practical risks live.',
    durable: 'Synthesis separates durable training/fine-tuning from temporary inference/context/retrieval.',
    promptResponse: 'Learners should be able to trace a prompt into context and a response out token by token.',
    core: 'The final card asks learners to teach back the full path from weights shaped before use to context-shaped generation and responsible use.',
    why: 'The goal is durable mental model, not trivia.',
    prev: 'Risk vs Myth gives the practical stakes.',
    next: 'End of Journey; points to revision and practice.',
    metaphor: 'A field guide for the AI era.',
    brain: 'People use mental models to act wisely.',
    breaks: 'Understanding mechanisms does not make the model human.',
    misconception: 'Either fear or hype is enough to understand AI.',
    visual: 'Full prompt-life map with durable/temporary and real/myth overlays.',
    exercise: 'Reflection: explain LLMs to a peer in five sentences.',
    terms: ['inference', 'training', 'context window', 'RAG', 'risk'],
    sources: 'No new mechanism source beyond prior cards; use cited synthesis references when finalizing.'
  })
]

const newDraftIds = [
  'overfitting-generalization',
  'alignment',
  'hallucinations',
  'grounding',
  'effective-prompting',
  'energy-water-compute',
  'human-centered-ai-ethics'
]

const misconceptions = [
  ['The model writes the whole answer at once.', 'LLM text generation is next token, append, repeat.', 'Autoregression', 'Append-and-repeat loop', 'Full Run ordering challenge'],
  ['Inference trains the model.', 'Ordinary inference uses fixed weights and temporary hidden states.', 'Inference', 'Forward pass with fixed weights', 'Training Nudge'],
  ['RAG means the model learned the document.', 'RAG retrieves outside material into temporary context.', 'RAG and Retrieval', 'Retriever shelf into context tray', 'Open Book or Learned?'],
  ['Context window equals permanent memory.', 'Context is temporary visible input unless another system saves it.', 'Context Window', 'Cards falling out of tray', 'Context Window: What Fell Out?'],
  ['Attention means consciousness.', 'Attention is weighted relevance between token positions.', 'Attention', 'Weighted arcs between tokens', 'Attention Is Relevance'],
  ['Embeddings are definitions.', 'Embeddings are learned starting vectors.', 'Embeddings', 'Embedding lookup table', 'Embedding lookup match'],
  ['Hidden states are secret English.', 'Hidden states are temporary internal vectors.', 'Hidden States', 'Token vector changing across layers', 'MLP Feature Reshape'],
  ['Softmax probabilities are truth confidence.', 'Softmax probabilities are next-token likelihoods, not truth guarantees.', 'Softmax', 'Score funnel into probabilities', 'Softmax Funnel'],
  ['Hallucination means lying.', 'Lying implies intent; hallucination is unsupported generated output.', 'Hallucinations', 'Missing evidence anchors', 'Supported or unsupported sorting'],
  ['Alignment means moral understanding.', 'Alignment shapes behavior; it does not give moral agency.', 'Alignment', 'Policy rails over response landscape', 'Alignment checkpoint'],
  ['Prompting permanently teaches the model.', 'Prompting shapes the current context unless training also occurs.', 'Effective Prompting From Model Literacy', 'Prompt components in context tray', 'Prompt component sorting'],
  ['Multimodal means human-like perception.', 'Multimodal systems use engineered representations across media.', 'Multimodal AI', 'Media lanes to representation hub', 'Media type checkpoint'],
  ['Digital AI is cost-free.', 'AI depends on physical compute, power, cooling, networks, and human systems.', 'Energy, Water, and Compute', 'Phone to data-center infrastructure', 'Evidence/causality diagram'],
  ['Symbolic AI is obsolete.', 'Rules and learned systems can coexist in products and governance.', 'Symbolic AI vs Deep Learning', 'Rulebook plus learned landscape', 'Rule/learned sorting'],
  ['Deep learning is magic.', 'Deep learning is optimization over examples and parameters.', 'Training', 'Training loop', 'Training checkpoint']
]

await main()

async function main() {
  await mkdir(outDir, { recursive: true })
  await write('PROMPT_LIFE_CURRICULUM_BIBLE_V0_7.md', renderBible())
  await write('JOURNEY_ARCHITECTURE_V0_7.md', renderArchitecture())
  await write('NEW_LESSON_DRAFTS_V0_7.md', renderNewLessonDrafts())
  await write('VISUAL_LEARNING_FRAMEWORK_V0_7.md', renderVisualFramework())
  await write('VISUAL_AID_SPECS_V0_7.md', renderVisualAidSpecs())
  await write('METAPHOR_AND_BRAIN_BRIDGE_MATRIX_V0_7.md', renderMetaphorMatrix())
  await write('MISCONCEPTION_MAP_V0_7.md', renderMisconceptionMap())
  await write('SOURCE_NEEDS_V0_7.md', renderSourceNeeds())
  console.log(`Curriculum v0.7 docs written to ${path.relative(root, outDir)}`)
}

async function write(file, content) {
  await writeFile(path.join(outDir, file), `${content.trim()}\n`)
}

function lesson(input) {
  return {
    status: currentLessonIds.has(input.id) ? 'Current Journey card' : 'Proposed v0.7 card',
    ...input
  }
}

function renderBible() {
  const parts = [
    '# Prompt Life Curriculum Bible v0.7',
    '',
    `Generated: ${generatedDate}`,
    '',
    'Purpose: guide the next implementation pass for model literacy, not prompt-engineering tricks. This Bible includes current Journey cards plus proposed v0.7 additions and restructures.',
    '',
    'Audience: smart high-schoolers, first-year college students, faculty, higher-ed IT leaders, and PhDs outside computer science.',
    '',
    'Current app mapping: the existing app has 26 Journey cards. Most map directly to the proposed v0.7 lesson IDs below; the current How AI Learns umbrella card should be split across more precise durable/temporary lessons rather than carried forward unchanged.',
    '',
    '| Current app id | Current title | v0.7 destination |',
    '|---|---|---|',
    ...currentAppLessonMap.map(([id, title, destination]) => `| ${id} | ${cell(title)} | ${cell(destination)} |`),
    ''
  ]

  lessons.forEach((item, index) => {
    parts.push(
      `## ${index + 1}. ${item.title}`,
      '',
      `- Lesson id: ${item.id}`,
      `- Status: ${item.status}`,
      `- Section: ${item.section}`,
      `- Path: ${pathLabels[item.path]}`,
      `- Learner-facing subtitle: ${item.subtitle}`,
      `- One-sentence definition: ${item.definition}`,
      `- Where it happens: ${item.stage}`,
      `- Durable vs temporary distinction: ${item.durable}`,
      `- Prompt vs response distinction: ${item.promptResponse}`,
      `- Core explanation: ${item.core}`,
      `- Why it matters: ${item.why}`,
      `- How it connects to previous lesson: ${item.prev}`,
      `- How it connects to next lesson: ${item.next}`,
      `- General metaphor: ${item.metaphor}`,
      `- Brain/cognition metaphor: ${item.brain}`,
      `- Where the brain metaphor breaks: ${item.breaks}`,
      `- Misconception addressed: ${item.misconception}`,
      `- Visual aid concept: ${item.visual}`,
      `- Exercise/checkpoint concept: ${item.exercise}`,
      `- Glossary terms: ${item.terms.join(', ')}`,
      `- Source needs / citation needs: ${item.sources}`,
      ''
    )
  })

  return parts.join('\n')
}

function renderArchitecture() {
  const parts = [
    '# Journey Architecture v0.7',
    '',
    'This order keeps the day-in-the-life through-line while making missing academic concepts explicit. The Essential Path is the core mobile Journey; Deep Path cards can be expanded or toggled; Optional Side Tours widen literacy without interrupting the main prompt path.',
    '',
    '| # | Lesson | Lesson id | Section | Path | Why here |',
    '|---:|---|---|---|---|---|'
  ]

  lessons.forEach((item, index) => {
    parts.push(`| ${index + 1} | ${cell(item.title)} | ${item.id} | ${cell(item.section)} | ${pathLabels[item.path]} | ${cell(item.prev)} |`)
  })

  parts.push(
    '',
    '## Path Summary',
    '',
    `- Essential Path: ${lessons.filter((item) => item.path === 'essential').length} lessons.`,
    `- Deep Path: ${lessons.filter((item) => item.path === 'deep').length} lessons.`,
    `- Optional Side Tour: ${lessons.filter((item) => item.path === 'optional').length} lessons.`,
    '',
    'Recommended implementation strategy: first ship the Essential Path refinements, then add Deep Path cards as expandable academic depth, then decide which Optional Side Tours belong in Journey versus Play/Tours.'
  )

  parts.push(
    '',
    '## Current App Lesson Mapping',
    '',
    '| Current app id | Current title | v0.7 destination |',
    '|---|---|---|',
    ...currentAppLessonMap.map(([id, title, destination]) => `| ${id} | ${cell(title)} | ${cell(destination)} |`)
  )

  return parts.join('\n')
}

function renderNewLessonDrafts() {
  const parts = [
    '# New Lesson Drafts v0.7',
    '',
    'These drafts are complete cards for concepts requested in the v0.7 curriculum pass. They are not yet implemented in app data.',
    ''
  ]

  newDraftIds.map((id) => lessons.find((item) => item.id === id)).filter(Boolean).forEach((item) => {
    parts.push(
      `## ${item.title}`,
      '',
      `- Lesson id: ${item.id}`,
      `- Learner-facing subtitle: ${item.subtitle}`,
      `- One-sentence definition: ${item.definition}`,
      `- Where it happens: ${item.stage}`,
      `- Core idea: ${item.core}`,
      `- Why it matters: ${item.why}`,
      `- Durable vs temporary: ${item.durable}`,
      `- Prompt vs response: ${item.promptResponse}`,
      `- How it connects: Previous: ${item.prev} Next: ${item.next}`,
      `- Metaphor: ${item.metaphor}`,
      `- Brain metaphor: ${item.brain}`,
      `- Where it breaks: ${item.breaks}`,
      `- Visual: ${item.visual}`,
      `- Misconception: ${item.misconception}`,
      `- Exercise/checkpoint: ${item.exercise}`,
      `- Glossary terms: ${item.terms.join(', ')}`,
      `- Source-grounded review: ${item.sources}`,
      ''
    )
  })

  return parts.join('\n')
}

function renderVisualFramework() {
  return `# Visual Learning Framework v0.7

## Visual Types

1. Static SVG diagram: use for stable mechanisms, concept maps, and mobile-first labels.
2. Step animation: use when sequence matters, such as training loop, token pipeline, or autoregression.
3. Interactive 2D diagram: use when a learner should tap, toggle, connect, or reveal relationships.
4. CSS 3D object: use when shallow depth clarifies structure without adding a heavy dependency.
5. Rotatable 3D object: use only when rotation reveals structure that a flat image hides.
6. Sorting/checking exercise: use for durable/temporary, risk/myth, evidence/unsupported, and open-book/learned distinctions.
7. Split-screen contrast: use for symbolic/deep learning, diffusion/autoregression, and myth/risk.
8. Evidence/causality diagram: use for grounding, hallucination, prompt injection, energy/compute, and ethics workflows.

## When 3D Is Justified

Use 3D only when rotation reveals structure that a flat image hides.

Good 3D cases:

- Tensor cube: rotation shows batch x tokens x features.
- Layer stack: rotation shows repeated sheets and flow through depth.
- Feature cloud: rotation shows high-dimensional metaphor and neighboring concepts.
- Vocabulary cloud: rotation shows many candidate tokens, with probability height/depth.
- Context tray: rotation shows prompt tokens, response tokens, retrieved context, and window limits.

Poor 3D cases:

- Hallucination
- Alignment
- Ethics
- Privacy
- Prompt injection
- Energy use

For those, prefer diagrams, flows, and sorting boards.

## Design Rules

- Keep text in HTML where possible; SVG labels must be large and redundant with captions.
- Use reduced-motion fallbacks that show the final state and numbered arrows.
- Prefer 2D first on mobile; add CSS 3D only after the 2D learning objective is clear.
- Avoid dense poster images as pages.
- No visual should imply consciousness, intention, feelings, human memory, human understanding, or moral agency.
`
}

function renderVisualAidSpecs() {
  const parts = [
    '# Visual Aid Specs v0.7',
    '',
    '| # | visualAidId | Lesson | Learning objective | What learner sees | Touch/rotate/toggle | 2D version | 3D version if justified | Reduced-motion fallback | Accessibility description | Complexity | Decision |',
    '|---:|---|---|---|---|---|---|---|---|---|---|---|'
  ]

  lessons.forEach((item, index) => {
    const spec = visualSpec(item)
    parts.push(`| ${index + 1} | ${spec.id} | ${cell(item.title)} | ${cell(spec.objective)} | ${cell(spec.see)} | ${cell(spec.touch)} | ${cell(spec.twoD)} | ${cell(spec.threeD)} | ${cell(spec.reduced)} | ${cell(spec.access)} | ${spec.complexity} | ${spec.decision} |`)
  })

  return parts.join('\n')
}

function renderMetaphorMatrix() {
  const parts = [
    '# Metaphor and Brain Bridge Matrix v0.7',
    '',
    'Brain metaphors are present everywhere, but restrained. Each card must explicitly show where the comparison breaks.',
    '',
    '| Lesson | General metaphor | Brain/cognition metaphor | Where it breaks | Risk of misleading learner | Better wording if needed |',
    '|---|---|---|---|---|---|'
  ]

  lessons.forEach((item) => {
    parts.push(`| ${cell(item.title)} | ${cell(item.metaphor)} | ${cell(item.brain)} | ${cell(item.breaks)} | ${cell(metaphorRisk(item))} | ${cell(betterWording(item))} |`)
  })

  return parts.join('\n')
}

function renderMisconceptionMap() {
  const parts = [
    '# Misconception Map v0.7',
    '',
    '| Misconception | Correction | Lesson where addressed | Visual aid | Exercise/checkpoint |',
    '|---|---|---|---|---|'
  ]

  misconceptions.forEach(([misconception, correction, lessonName, visual, exercise]) => {
    parts.push(`| ${cell(misconception)} | ${cell(correction)} | ${cell(lessonName)} | ${cell(visual)} | ${cell(exercise)} |`)
  })

  return parts.join('\n')
}

function renderSourceNeeds() {
  return `# Source Needs v0.7

Mark these before final publication. Do not invent precise numbers for energy, water, compute, or environmental claims.

## Mechanism Sources

- Transformer architecture: SOURCE NEEDED.
- Attention mechanism: SOURCE NEEDED.
- MLP/feed-forward layer role in transformers: SOURCE NEEDED.
- Pretraining / next-token prediction: SOURCE NEEDED.
- Overfitting and generalization: SOURCE NEEDED.
- Instruction tuning / RLHF / preference optimization: SOURCE NEEDED.
- Fine-tuning and adapter-style tuning: SOURCE NEEDED.

## Retrieval and Reliability Sources

- RAG: SOURCE NEEDED.
- Grounding and citations: SOURCE NEEDED.
- Hallucination definitions and failure modes: SOURCE NEEDED.
- Prompt injection: SOURCE NEEDED.
- Privacy / data governance: SOURCE NEEDED.
- Tool risk and agentic integrations: SOURCE NEEDED.

## Wider AI Sources

- Diffusion: SOURCE NEEDED.
- Multimodal AI: SOURCE NEEDED.
- Alignment: SOURCE NEEDED.
- Energy and water use: SOURCE NEEDED: current estimates vary by model, hardware, data center, and measurement method.
- Human-centered AI ethics: SOURCE NEEDED.
- Papal encyclical / Vatican AI ethics references: SOURCE NEEDED.
- Broader human-centered AI sources: SOURCE NEEDED.

## Publication Rule

Use source placeholders in draft copy until exact claims are reviewed. Especially avoid precise infrastructure numbers unless tied to model, hardware, data center, measurement method, and date.
`
}

function visualSpec(item) {
  const threeDGood = ['tensors', 'layers', 'vectors', 'sampling', 'context-window', 'rag-retrieval'].includes(item.id)
  const decision = item.path === 'essential' ? 'build now' : item.path === 'deep' ? 'later' : 'later'
  const complexity = threeDGood ? 'medium' : item.path === 'deep' ? 'medium' : 'low'
  return {
    id: `v07-${item.id}`,
    objective: item.misconception,
    see: item.visual,
    touch: touchFor(item),
    twoD: `Mobile SVG or HTML/SVG hybrid: ${item.visual}`,
    threeD: threeDGood ? `CSS 3D candidate: ${item.visual}` : 'Not justified; use 2D diagram, split screen, or sorting board.',
    reduced: 'Show final static state with numbered arrows and a concise caption.',
    access: `Alt/caption should state: ${item.definition}`,
    complexity,
    decision
  }
}

function touchFor(item) {
  if (item.id.includes('risk') || item.id.includes('hallucination') || item.id.includes('alignment')) return 'Sort/check cards by misconception and correction.'
  if (item.id === 'attention') return 'Tap token nodes to reveal relevance arcs.'
  if (item.id === 'context-window' || item.id === 'rag-retrieval') return 'Push cards into the context tray and observe what is visible.'
  if (item.id === 'sampling') return 'Toggle temperature/top-p and see the candidate cloud change.'
  if (item.id === 'tensors' || item.id === 'layers') return 'Rotate lightly only if 3D clarifies axes or depth.'
  return 'Tap through numbered steps or reveal labels.'
}

function metaphorRisk(item) {
  if (['attention', 'hidden-states', 'alignment', 'human-centered-ai-ethics', 'multimodal'].includes(item.id)) return 'High: anthropomorphic wording can imply awareness, memory, moral agency, or human perception.'
  if (['sampling', 'hallucinations', 'grounding'].includes(item.id)) return 'Medium: familiar cognition terms can imply intention or truth judgment.'
  return 'Low to medium: keep mechanism boundary visible.'
}

function betterWording(item) {
  if (item.id === 'attention') return 'Say weighted relevance, not focus or awareness.'
  if (item.id === 'hidden-states') return 'Say temporary internal vector, not memory.'
  if (item.id === 'alignment') return 'Say behavior shaping, not values acquired.'
  if (item.id === 'human-centered-ai-ethics') return 'Say simulated moral language is not moral understanding.'
  if (item.id === 'multimodal') return 'Say engineered representations, not senses.'
  return 'Keep the existing metaphor and immediately name the limit.'
}

function cell(value) {
  return String(value ?? '').replace(/\n/g, ' ').replace(/\|/g, '\\|')
}
