const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const A = `${BASE}/assets/promptlife`

export const acts = [
  { id: 'before-morning', number: 1, name: 'Before Morning', summary: 'Symbolic AI, training, pretraining, fine-tuning, alignment, and inference before the day begins.' },
  { id: 'morning', number: 2, name: 'Morning Commute', summary: 'Text becomes tokens, embeddings, vectors, and tensors.' },
  { id: 'workday', number: 3, name: 'Workday', summary: 'Tokens move through attention, MLPs, layers, and hidden states.' },
  { id: 'decision-room', number: 4, name: 'Decision Room', summary: 'The vocabulary cloud turns raw scores into the next token.' },
  { id: 'after-hours', number: 5, name: 'After Hours', summary: 'Context windows, mini-games, side tours, risks, and the badge.' }
]

export const lessons = [
  {
    id: 'what-is-llm', act: 'before-morning', actLabel: 'Before Morning', title: 'What Is an LLM?', subtitle: 'A learned next-token prediction system', icon: `${A}/icons/png/icon-seed-run@48.png`, image: `${A}/illustrations/scene-hero-feature-cloud@mobile.png`, alt: 'A prompt traveling through a glowing feature cloud', terms: ['token', 'weight', 'inference'],
    definition: 'A large language model is a learned system that predicts likely next tokens from the context it can see.',
    relationship: 'The model’s weights are shaped during training, then used during inference to turn your prompt into a sequence of next-token choices.',
    metaphor: 'A very large autocomplete engine with learned structure, not a mind or a database.',
    interaction: { type: 'cloud', title: 'Activate the prompt patterns', copy: 'A single prompt can light up grammar, task, tone, facts, and risk patterns at once.' },
    quiz: { question: 'Which description is most accurate?', choices: ['A learned prediction system', 'A conscious reader', 'A hand-written rulebook'], answer: 'A learned prediction system', explain: 'LLMs use learned weights to predict and sample tokens. That is powerful, but it is not consciousness.' }
  },
  {
    id: 'history', act: 'before-morning', actLabel: 'Before Morning', title: 'Two AI Traditions', subtitle: 'Rules versus learned patterns', icon: `${A}/icons/png/icon-training@48.png`, image: `${A}/illustrations/scene-training-rainstorm@mobile.png`, alt: 'A learning landscape shaped by many tiny updates', terms: ['pretraining', 'training'],
    definition: 'Symbolic AI manipulates explicit rules and symbols. Deep learning adjusts many weights until useful patterns are captured.',
    relationship: 'LLMs come mainly from the deep-learning tradition, but they can imitate some symbolic behavior because they learned patterns in language.',
    metaphor: 'A rulebook versus a weather system of learned relationships.',
    interaction: { type: 'cloud', title: 'Light up the feature cloud', copy: 'The same prompt can activate syntax, facts, tone, examples, and task patterns all at once.' },
    quiz: { question: 'Which phrase best describes an LLM?', choices: ['A fixed rulebook', 'A learned prediction machine', 'A spreadsheet macro'], answer: 'A learned prediction machine', explain: 'The model was not hand-coded rule by rule; training shaped its weights from examples.' }
  },
  {
    id: 'training', act: 'before-morning', actLabel: 'Before Morning', title: 'Training', subtitle: 'Prediction error updates weights', icon: `${A}/icons/png/icon-training@48.png`, image: `${A}/illustrations/scene-training-rainstorm@mobile.png`, alt: 'Training rainstorm carving paths through a landscape', terms: ['training', 'weight', 'parameter', 'inference'],
    definition: 'Training predicts a next token, measures error, and durably updates model weights to reduce future error.',
    relationship: 'Training changes parameters; inference uses those parameters without normally rewriting them.',
    metaphor: 'Practicing a piece until the instrument’s settings are tuned before the performance.',
    interaction: { type: 'training', title: 'Tap through the training loop', copy: 'Prediction, comparison, weight update, repeat: that is how learned parameters emerge.' },
    quiz: { question: 'What makes training different from inference?', choices: ['Training durably updates weights', 'Training reads only the context window', 'Training samples the final token'], answer: 'Training durably updates weights', explain: 'The durable update is the key distinction. Inference is a forward pass using existing weights.' }
  },
  {
    id: 'pretraining', act: 'before-morning', actLabel: 'Before Morning', title: 'Pretraining', subtitle: 'Durable learning before normal use', icon: `${A}/icons/png/icon-training@48.png`, image: `${A}/illustrations/scene-training-rainstorm@mobile.png`, alt: 'Training rainstorm carving paths through a landscape', terms: ['pretraining', 'training', 'inference'],
    definition: 'Pretraining repeatedly predicts the next token across vast text collections and updates model weights.',
    relationship: 'Pretraining changes the model durably; inference only uses the weights that already exist.',
    metaphor: 'Billions of tiny nudges carving paths through a vast landscape.',
    interaction: { type: 'training', title: 'Tap through the training loop', copy: 'Prediction, comparison, update, repeat: that is how learned weights emerge.' },
    quiz: { question: 'During training, do model weights change?', choices: ['Yes', 'No', 'Only inside one chat'], answer: 'Yes', explain: 'Training is the durable weight-changing process.' }
  },
  {
    id: 'fine-tuning', act: 'before-morning', actLabel: 'Still Before Morning', title: 'Fine-Tuning', subtitle: 'Alignment and task shaping', icon: `${A}/icons/png/icon-fine-tuning@48.png`, image: `${A}/illustrations/scene-fine-tuning-path@mobile.png`, alt: 'A bright path carved through a mountain landscape', terms: ['fine-tuning', 'pretraining', 'inference'],
    definition: 'Fine-tuning is additional training on targeted examples, preferences, or domain data.',
    relationship: 'Pretraining builds broad capability; fine-tuning nudges behavior toward helpfulness, safety, style, or a domain.',
    metaphor: 'Carving useful trails through an already huge terrain.',
    interaction: { type: 'training', title: 'Nudge the trail', copy: 'Fine-tuning does not usually start from scratch. It adapts a model that already knows a lot.' },
    quiz: { question: 'During ordinary inference, do model weights durably update?', choices: ['Yes', 'No', 'Always after every prompt'], answer: 'No', explain: 'Inference computes hidden states and next-token probabilities, but does not change weights.' }
  },
  {
    id: 'alignment', act: 'before-morning', actLabel: 'Still Before Morning', title: 'Alignment', subtitle: 'Steering behavior toward useful norms', icon: `${A}/icons/png/icon-fine-tuning@48.png`, image: `${A}/illustrations/scene-fine-tuning-path@mobile.png`, alt: 'A guided path showing model behavior being shaped toward safer responses', terms: ['fine-tuning', 'training', 'inference'],
    definition: 'Alignment is the work of steering a model toward helpful, honest, safe, and context-appropriate behavior.',
    relationship: 'Alignment often uses fine-tuning, preference data, evaluations, and system instructions; it does not make the model conscious.',
    metaphor: 'Campus norms for a very fast assistant: clear expectations, examples, and guardrails.',
    interaction: { type: 'risk', title: 'Sort behavior from belief', copy: 'Aligned behavior can be useful without implying human values or awareness inside the model.' },
    quiz: { question: 'What does alignment mainly shape?', choices: ['Model behavior', 'A permanent user memory', 'Human consciousness'], answer: 'Model behavior', explain: 'Alignment steers outputs and behavior. It is not evidence that the model has beliefs or awareness.' }
  },
  {
    id: 'inference', act: 'before-morning', actLabel: 'Prompt Arrives', title: 'Inference', subtitle: 'A forward pass, not a memory update', icon: `${A}/icons/png/icon-seed-run@48.png`, image: `${A}/illustrations/scene-token-pipeline-relay@mobile.png`, alt: 'A prompt moving through a model pipeline without changing the model weights', terms: ['inference', 'hidden state', 'logits'],
    definition: 'Inference is normal model use: a forward pass that computes temporary states and next-token probabilities without durably changing weights.',
    relationship: 'Training and fine-tuning can rewrite weights; inference reads those weights to produce an output.',
    metaphor: 'Using a map to choose a route, not redrawing the map.',
    interaction: { type: 'inference', title: 'Walk the forward pass', copy: 'The prompt moves through the model. Temporary activations change, but the durable weights do not.' },
    quiz: { question: 'What changes during ordinary inference?', choices: ['Temporary hidden states', 'The model weights permanently', 'The training dataset'], answer: 'Temporary hidden states', explain: 'Inference creates temporary internal vectors for this run, then discards them.' }
  },
  {
    id: 'tokens', act: 'morning', actLabel: 'Morning Commute', title: 'Tokenization', subtitle: 'Text becomes chunks', icon: `${A}/icons/png/icon-tokens@48.png`, image: `${A}/illustrations/scene-tokens-to-tensors@mobile.png`, alt: 'Text broken into token blocks on a conveyor belt', terms: ['token', 'token-id', 'embedding'],
    definition: 'A token is a chunk of text: sometimes a word, word part, punctuation mark, or space.',
    relationship: 'The chain begins as text → tokens → token IDs → embeddings → tensors.',
    metaphor: 'Parcels on a conveyor belt entering the model.',
    interaction: { type: 'tokens', title: 'Tap to split the prompt', copy: 'The model does not read words directly. It starts with token IDs.' },
    quiz: { question: 'What comes right after text is split into tokens?', choices: ['Token IDs and embedding lookup', 'Softmax', 'A finished answer'], answer: 'Token IDs and embedding lookup', explain: 'Tokens map to IDs, and IDs retrieve learned embedding vectors.' }
  },
  {
    id: 'embeddings', act: 'morning', actLabel: 'Morning Commute', title: 'Embeddings', subtitle: 'Token IDs look up learned vectors', icon: `${A}/icons/png/icon-vocabulary-cloud@48.png`, image: `${A}/illustrations/scene-tokens-to-tensors@mobile.png`, alt: 'Embedding vectors stacked into a tensor block', terms: ['embedding', 'token-id', 'vector', 'hidden state'],
    definition: 'An embedding is a token ID’s learned starting vector.',
    relationship: 'Embedding vectors are the model’s starting positions; hidden states are what those vectors become after context reshapes them.',
    metaphor: 'A token gets a starting address in a giant meaning cloud.',
    interaction: { type: 'embeddings', title: 'Look up a starting vector', copy: 'The first vector is not a definition. It is a useful starting pattern learned during training.' },
    quiz: { question: 'What is an embedding in this app?', choices: ['A learned starting vector', 'A finished sentence', 'A human memory'], answer: 'A learned starting vector', explain: 'A token ID retrieves an embedding vector before context reshapes it into hidden states.' }
  },
  {
    id: 'tensors', act: 'morning', actLabel: 'Morning Commute', title: 'Tensors', subtitle: 'Organized blocks of vectors', icon: `${A}/icons/png/icon-layers@48.png`, image: `${A}/illustrations/scene-tokens-to-tensors@mobile.png`, alt: 'Vectors arranged into a structured tensor block', terms: ['tensor', 'vector', 'layer'],
    definition: 'A tensor is an organized block of numbers, often holding many token vectors at once.',
    relationship: 'Embeddings become tensors so the transformer can process many token positions and features together.',
    metaphor: 'A stack of spreadsheets carrying token features through the model.',
    interaction: { type: 'cloud', title: 'Stack the vectors', copy: 'The model moves organized numerical blocks, not English sentences, through its layers.' },
    quiz: { question: 'Which is the better definition of tensor here?', choices: ['An organized block of numbers', 'A word in a dictionary', 'A rule written by a programmer'], answer: 'An organized block of numbers', explain: 'In transformers, tensors carry batches of token vectors through layers.' }
  },
  {
    id: 'attention', act: 'workday', actLabel: 'Workday', title: 'Attention', subtitle: 'Weighted relevance between positions', icon: `${A}/icons/png/icon-attention@48.png`, image: `${A}/illustrations/scene-attention-weave@mobile.png`, alt: 'Token nodes connected by glowing attention arcs', terms: ['attention', 'hidden state', 'layer'],
    definition: 'Attention assigns relevance weights between token positions.',
    relationship: 'Attention mixes information across tokens before the MLP reshapes each token’s features.',
    metaphor: 'Spotlights showing which earlier tokens are useful right now.',
    interaction: { type: 'attention', title: 'Move the spotlight', copy: 'Attention is not human awareness. It is weighted relevance in a computation.' },
    quiz: { question: 'Does attention mean the model is conscious of a word?', choices: ['Yes', 'No — it is relevance weighting'], answer: 'No — it is relevance weighting', explain: 'The word attention is metaphorical. It names a math mechanism.' }
  },
  {
    id: 'mlp', act: 'workday', actLabel: 'Workday', title: 'MLP', subtitle: 'Feature reshaping per token', icon: `${A}/icons/png/icon-mlp@48.png`, image: `${A}/illustrations/scene-mlp-forge@mobile.png`, alt: 'Gears reshaping token features', terms: ['MLP', 'hidden state', 'attention'],
    definition: 'An MLP is a feed-forward network that reshapes each token position’s feature vector.',
    relationship: 'Attention mixes information across token positions; the MLP reshapes features within each position.',
    metaphor: 'A forge that bends each token vector into a more useful shape.',
    interaction: { type: 'mlp', title: 'Reshape the token features', copy: 'The same token can become food-ish, animal-ish, or idiom-ish depending on context.' },
    quiz: { question: 'What does the MLP mainly do here?', choices: ['Reshapes per-token features', 'Reads private files', 'Chooses the final answer directly'], answer: 'Reshapes per-token features', explain: 'MLPs transform token feature vectors after attention has mixed contextual information.' }
  },
  {
    id: 'hidden-states', act: 'workday', actLabel: 'Workday', title: 'Hidden States', subtitle: 'Temporary contextual vectors', icon: `${A}/icons/png/icon-layers@48.png`, image: `${A}/illustrations/scene-mlp-forge@mobile.png`, alt: 'Layered vectors changing as context moves through a transformer', terms: ['hidden state', 'embedding', 'layer', 'inference'],
    definition: 'A hidden state is the model’s temporary internal contextual vector for a token at a given layer.',
    relationship: 'Hidden states begin from embeddings and are updated by attention, MLPs, and layers during a forward pass.',
    metaphor: 'A scratchpad of numbers that changes while the prompt is being processed.',
    interaction: { type: 'inference', title: 'Watch temporary state move', copy: 'Hidden states exist for this run. They are not permanent memory.' },
    quiz: { question: 'Why is it called hidden state?', choices: ['It is internal numbers, not visible text', 'It is encrypted English', 'It is a secret memory file'], answer: 'It is internal numbers, not visible text', explain: 'Hidden means inside the model’s working representation.' }
  },
  {
    id: 'layers', act: 'workday', actLabel: 'Workday', title: 'Layers and Residual Paths', subtitle: 'Repeated refinement', icon: `${A}/icons/png/icon-layers@48.png`, image: `${A}/illustrations/scene-context-stack@mobile.png`, alt: 'Stacked model layers refining token representations', terms: ['layer', 'attention', 'MLP', 'hidden state'],
    definition: 'A transformer layer is a repeated block that usually combines attention, MLP feature reshaping, and add-plus-normalize paths.',
    relationship: 'Each layer refines hidden states while residual paths help useful information carry forward.',
    metaphor: 'A series of editing passes where each pass can revise but also preserve the draft.',
    interaction: { type: 'cloud', title: 'Pass through the stack', copy: 'Layer after layer, temporary vectors become more context-shaped.' },
    quiz: { question: 'What do layers repeatedly refine?', choices: ['Hidden states', 'Permanent user memory', 'The app interface'], answer: 'Hidden states', explain: 'Layers update temporary internal vectors during inference.' }
  },
  {
    id: 'vocab-cloud', act: 'decision-room', actLabel: 'Decision Room', title: 'Vocabulary Cloud', subtitle: 'One next token is chosen', icon: `${A}/icons/png/icon-vocabulary-cloud@48.png`, image: `${A}/illustrations/scene-vocabulary-cloud@mobile.png`, alt: 'A cloud of possible next tokens with probabilities', terms: ['logits', 'softmax', 'sampling', 'temperature', 'top-p'],
    definition: 'The final hidden state is projected into raw scores over possible next tokens. Softmax turns those scores into probabilities.',
    relationship: 'Logits become probabilities; sampling chooses one token; that token is appended; the process repeats.',
    metaphor: 'A giant scoreboard lighting up likely next tokens.',
    interaction: { type: 'softmax', title: 'Change the candidate pool', copy: 'Decoding controls make the next token more focused or more adventurous.' },
    quiz: { question: 'Does the model output the whole response at once?', choices: ['Yes', 'No — one token at a time'], answer: 'No — one token at a time', explain: 'LLM text generation is autoregressive: next token, append, repeat.' }
  },
  {
    id: 'autoregression', act: 'after-hours', actLabel: 'The Day Repeats', title: 'Autoregression', subtitle: 'One token, append, repeat', icon: `${A}/icons/png/icon-context-window@48.png`, image: `${A}/illustrations/scene-autoregression-window@mobile.png`, alt: 'Tokens added one at a time during autoregressive generation', terms: ['autoregression', 'sampling', 'inference'],
    definition: 'Autoregression means generating one token, appending it to the context, and repeating.',
    relationship: 'The vocabulary cloud is consulted again after every sampled token, so the answer grows step by step.',
    metaphor: 'A train adding one car at a time.',
    interaction: { type: 'context', title: 'Append the next token', copy: 'The model does not write a whole paragraph in one move. It repeats next-token prediction.' },
    quiz: { question: 'How does an LLM normally generate text?', choices: ['One token at a time', 'All words at once', 'By rewriting its weights'], answer: 'One token at a time', explain: 'LLM generation is autoregressive: next token, append, repeat.' }
  },
  {
    id: 'context-window', act: 'after-hours', actLabel: 'The Day Repeats', title: 'Context Window', subtitle: 'Temporary working context', icon: `${A}/icons/png/icon-context-window@48.png`, image: `${A}/illustrations/scene-context-stack@mobile.png`, alt: 'Cards moving through a limited context window', terms: ['context window', 'autoregression', 'inference'],
    definition: 'A context window is the limited amount of text or media the model can currently use.',
    relationship: 'Autoregression appends new tokens while the context window limits what remains visible to the model.',
    metaphor: 'A train adding one car at a time while a moving spotlight sees only part of the train.',
    interaction: { type: 'context', title: 'Slide the window', copy: 'What fits inside the window can influence the next token. What falls out cannot directly be attended to.' },
    quiz: { question: 'What can happen when the context window is full?', choices: ['Older tokens may be truncated', 'The model permanently learns them', 'Softmax disappears'], answer: 'Older tokens may be truncated', explain: 'Context is temporary input, not durable training.' }
  },
  {
    id: 'diffusion', act: 'after-hours', actLabel: 'Side Tour', title: 'Diffusion vs Autoregression', subtitle: 'Other model species', icon: `${A}/icons/png/icon-diffusion@48.png`, image: `${A}/illustrations/scene-diffusion-multimodal@mobile.png`, alt: 'A denoising process shown beside text generation', terms: ['diffusion', 'autoregression'],
    definition: 'Diffusion generation usually starts from noise and denoises step by step.',
    relationship: 'Autoregressive LLMs build text token by token; diffusion models refine noise into an image or other output.',
    metaphor: 'Writing the next word versus developing a photograph out of static.',
    interaction: { type: 'diffusion', title: 'Denoise the picture', copy: 'Different media can still be represented with vectors and learned relationships.' },
    quiz: { question: 'What does a diffusion model usually start with?', choices: ['Noise', 'A completed paragraph', 'A spreadsheet'], answer: 'Noise', explain: 'Diffusion models learn to denoise toward useful outputs.' }
  },
  {
    id: 'multimodal', act: 'after-hours', actLabel: 'Side Tour', title: 'Multimodal AI', subtitle: 'Multiple media types together', icon: `${A}/icons/png/icon-multimodal@48.png`, image: `${A}/illustrations/scene-diffusion-multimodal@mobile.png`, alt: 'Text, image, and audio modes represented together', terms: ['multimodal', 'embedding', 'vector'],
    definition: 'Multimodal AI can represent or process multiple media types, such as text, images, audio, or video.',
    relationship: 'Different modalities may use connected encoders, shared vector spaces, or coordinated model components.',
    metaphor: 'A transit hub where different kinds of information can transfer lines.',
    interaction: { type: 'cloud', title: 'Connect the modes', copy: 'Text, images, audio, and video can each become model-readable representations.' },
    quiz: { question: 'What does multimodal mean?', choices: ['Multiple media types', 'A larger context window only', 'A model with feelings'], answer: 'Multiple media types', explain: 'Multimodal systems work across media types, often through learned representations.' }
  },
  {
    id: 'brain-metaphor', act: 'after-hours', actLabel: 'Final Stop', title: 'Brain Metaphor Limits', subtitle: 'Useful, but limited', icon: `${A}/icons/png/icon-risk@48.png`, image: `${A}/illustrations/scene-brain-metaphor-limits@mobile.png`, alt: 'A brain metaphor shown beside artificial model layers', terms: ['attention', 'inference'],
    definition: 'The brain metaphor helps only if we also teach where it breaks: no feelings, agency, lived body, or human understanding.',
    relationship: 'Words like attention and neuron are metaphors for computation, not proof of consciousness.',
    metaphor: 'A flight simulator: useful resemblance, not the same thing as the sky.',
    interaction: { type: 'cloud', title: 'Name the metaphor limit', copy: 'A good metaphor helps you reason. A bad one makes the model feel magical.' },
    quiz: { question: 'What is the safest way to use brain metaphors?', choices: ['Explain their limits', 'Treat the model as conscious', 'Avoid all details'], answer: 'Explain their limits', explain: 'Metaphors are useful when their boundaries are explicit.' }
  },
  {
    id: 'risk-myth', act: 'after-hours', actLabel: 'Final Stop', title: 'Risk vs Myth', subtitle: 'Practical institutional literacy', icon: `${A}/icons/png/icon-risk@48.png`, image: `${A}/illustrations/scene-brain-metaphor-limits@mobile.png`, alt: 'Risk and myth cards being sorted', terms: ['inference', 'training', 'context window'],
    definition: 'Risk literacy separates practical harms from magical stories about what models are.',
    relationship: 'Clear mental models help institutions manage real risks without inventing magical ones.',
    metaphor: 'A campus safety map: useful because it marks real hazards, not imaginary monsters.',
    interaction: { type: 'risk', title: 'Sort risk from myth', copy: 'Real: private data leakage, hallucination, copyright/IP, over-trust. Myth: the model secretly trains itself during ordinary chat.' },
    quiz: { question: 'Which is a real institutional risk?', choices: ['Uploading private data', 'The model becoming conscious in the chat', 'Softmax stealing files'], answer: 'Uploading private data', explain: 'Risk literacy is part of model literacy.' }
  }
]

export const glossary = [
  { id: 'pretraining', term: 'Pretraining', definition: 'The broad first stage of training that updates model weights by learning next-token patterns from large datasets.', relationship: 'Pretraining creates general capability before fine-tuning or inference.', metaphor: 'Laying down the main roads before a city gets neighborhood signs.' },
  { id: 'token', term: 'Token', definition: 'A chunk of text the model processes.', relationship: 'Text is split into tokens before token IDs retrieve embeddings.', metaphor: 'A parcel on a conveyor belt.' },
  { id: 'token-id', term: 'Token ID', definition: 'The number assigned to a token by the tokenizer.', relationship: 'Token IDs are used to look up embedding vectors.', metaphor: 'A library call number for a token.' },
  { id: 'embedding', term: 'Embedding', definition: 'A learned starting vector for a token.', relationship: 'Embeddings are durable learned rows in an embedding table; hidden states are temporary contextual vectors.', metaphor: 'A starting address in meaning-space.' },
  { id: 'vector', term: 'Vector', definition: 'A list of numbers that represents features of something, such as a token.', relationship: 'Embeddings and hidden states are vectors; tensors organize many vectors.', metaphor: 'A coordinate in a many-dimensional map.' },
  { id: 'tensor', term: 'Tensor', definition: 'An organized block of numbers, often shaped like batch × tokens × features.', relationship: 'Tensors carry many token vectors through the transformer at once.', metaphor: 'A spreadsheet stack or cube of vectors.' },
  { id: 'weight', term: 'Weight', definition: 'A learned number inside the model that shapes how signals are transformed.', relationship: 'Training and fine-tuning can update weights; inference normally does not.', metaphor: 'A dial set by learning.' },
  { id: 'parameter', term: 'Parameter', definition: 'A model value learned during training, often a weight or bias.', relationship: 'A model’s parameters store learned behavior used during inference.', metaphor: 'Settings baked into an instrument before a performance.' },
  { id: 'attention', term: 'Attention', definition: 'A mechanism that assigns relevance weights between token positions.', relationship: 'Attention mixes information across tokens before each token is reshaped by an MLP.', metaphor: 'A spotlight, not a human mind.' },
  { id: 'MLP', term: 'MLP', definition: 'A feed-forward network that transforms each token’s feature vector.', relationship: 'Attention mixes across tokens; MLP reshapes within each token position.', metaphor: 'A forge or gear machine for features.' },
  { id: 'hidden state', term: 'Hidden state', definition: 'The model’s temporary internal contextual vector for a token.', relationship: 'A hidden state begins from an embedding and is updated by transformer layers.', metaphor: 'A private scratchpad of numbers.' },
  { id: 'layer', term: 'Layer', definition: 'A repeated transformer block that refines hidden states.', relationship: 'Layers usually combine attention, MLPs, residual paths, and normalization.', metaphor: 'One editing pass in a stack of revisions.' },
  { id: 'logits', term: 'Logits', definition: 'Raw next-token scores before probabilities.', relationship: 'Softmax converts logits into probabilities over the vocabulary.', metaphor: 'Raw scoreboard points.' },
  { id: 'softmax', term: 'Softmax', definition: 'A function that turns raw scores into probabilities that sum to one.', relationship: 'Softmax sits between logits and sampling.', metaphor: 'A funnel turning scores into a probability cloud.' },
  { id: 'sampling', term: 'Sampling', definition: 'The rule used to choose the next token from probabilities.', relationship: 'Sampling explains why the same prompt can produce varied answers.', metaphor: 'Choosing from a weighted bowl of candidate tokens.' },
  { id: 'temperature', term: 'Temperature', definition: 'A decoding setting that changes how sharp or spread out next-token probabilities feel.', relationship: 'Temperature affects sampling after logits are converted toward probabilities.', metaphor: 'A focus knob for the vocabulary cloud.' },
  { id: 'top-p', term: 'Top-p', definition: 'A sampling setting that keeps the smallest set of likely tokens whose probabilities add up to a chosen threshold.', relationship: 'Top-p narrows or widens the candidate pool before sampling.', metaphor: 'Choosing from the most likely slice of the bowl.' },
  { id: 'training', term: 'Training', definition: 'The durable process of updating weights from prediction error.', relationship: 'Pretraining and fine-tuning are training phases; inference uses fixed weights.', metaphor: 'Carving paths through a landscape.' },
  { id: 'fine-tuning', term: 'Fine-tuning', definition: 'Additional targeted training after broad pretraining.', relationship: 'Fine-tuning can update model weights or add adapter weights.', metaphor: 'Adding helpful trails to an existing terrain.' },
  { id: 'inference', term: 'Inference', definition: 'Normal model use: a forward pass that generates outputs without durable weight updates.', relationship: 'Inference computes hidden states and next-token probabilities.', metaphor: 'Using the map, not redrawing the map.' },
  { id: 'context window', term: 'Context window', definition: 'The limited amount of text or media the model can consider at once.', relationship: 'Autoregression appends tokens while the window limits what remains visible.', metaphor: 'A moving spotlight over a growing train.' },
  { id: 'autoregression', term: 'Autoregression', definition: 'Generating one token, appending it, and repeating.', relationship: 'The vocabulary cloud is consulted again after each new token.', metaphor: 'Adding train cars one at a time.' },
  { id: 'diffusion', term: 'Diffusion', definition: 'A generation method that starts with noise and iteratively denoises.', relationship: 'Diffusion differs from autoregressive text prediction.', metaphor: 'Developing an image from static.' },
  { id: 'multimodal', term: 'Multimodal', definition: 'Able to work across multiple media types, such as text, images, audio, or video.', relationship: 'Different modalities can be represented in compatible vector spaces or processed by connected model components.', metaphor: 'A shared transit hub for different kinds of information.' }
]

export const games = [
  { id: 'context-stack', title: 'Context Stack', summary: 'Fit the right cards into a limited context window.', image: `${A}/illustrations/scene-context-stack@mobile.png` },
  { id: 'attention-weave', title: 'Attention Weave', summary: 'Draw relevance arcs between token nodes.', image: `${A}/illustrations/scene-attention-weave@mobile.png` },
  { id: 'token-relay', title: 'Token Pipeline Relay', summary: 'Explore pass, transform, and hold operators.', image: `${A}/illustrations/scene-token-pipeline-relay@mobile.png` }
]
