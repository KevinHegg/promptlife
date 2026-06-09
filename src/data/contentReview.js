export const reviewRubricCategories = [
  { key: 'accuracy', label: 'Accuracy', description: 'Technically correct and avoids overclaiming.' },
  { key: 'placement', label: 'Placement', description: 'Clear about where this concept happens in the model path.' },
  { key: 'relationship', label: 'Relationship', description: 'Connects to the previous and next concept.' },
  { key: 'promptResponse', label: 'Prompt/response', description: 'Separates prompt processing, response generation, or both.' },
  { key: 'durableTemporary', label: 'Durable/temp', description: 'Separates durable weight changes from temporary context or hidden states.' },
  { key: 'metaphor', label: 'Metaphor', description: 'Uses a clear, useful nontechnical analogy.' },
  { key: 'brain', label: 'Brain/cognition', description: 'Uses brain language carefully and states where it breaks.' },
  { key: 'visual', label: 'Visual', description: 'Visual aid teaches the concept and remains mobile-readable.' },
  { key: 'exercise', label: 'Exercise', description: 'Learner action and feedback address a real misconception.' },
  { key: 'mobile', label: 'Mobile', description: 'Concise enough for a small screen while still academically useful.' }
]

const stageByLessonId = {
  'what-is-llm': 'architecture',
  'where-llms-fit': 'architecture',
  history: 'architecture',
  training: 'pretraining',
  pretraining: 'pretraining',
  'overfitting-generalization': 'pretraining',
  'fine-tuning': 'fine-tuning',
  alignment: 'alignment',
  inference: 'inference',
  'prompt-response': 'prompt processing',
  tokens: 'prompt processing',
  'token-ids': 'prompt processing',
  embeddings: 'prompt processing',
  vectors: 'architecture',
  tensors: 'architecture',
  attention: 'architecture',
  mlp: 'architecture',
  layers: 'architecture',
  'hidden-states': 'inference',
  logits: 'response generation',
  softmax: 'response generation',
  sampling: 'response generation',
  autoregression: 'response generation',
  'context-window': 'current context',
  'rag-retrieval': 'current context',
  'how-ai-learns': 'risk/policy',
  diffusion: 'architecture',
  multimodal: 'architecture',
  'risk-myth': 'risk/policy'
}

const promptResponseNotesByStage = {
  pretraining: 'This happens before ordinary prompting; it can change future behavior by updating weights rather than producing one live response.',
  alignment: 'Alignment affects response behavior, but it does not mean the model understands morality or that one prompt permanently teaches it.',
  'fine-tuning': 'This happens before or between deployments; it changes future response patterns, not the current response token by token.',
  inference: 'This is the live prompt-to-response path: fixed weights process current context and generate response tokens.',
  'prompt processing': 'This card should stay explicit that prompt tokens and response-so-far tokens enter the same current context before the next token is chosen.',
  'response generation': 'This card belongs to decoding: the model is choosing one next response token, appending it, then repeating.',
  'current context': 'This card should separate the temporary visible context from durable memory or weight updates.',
  architecture: 'This card explains model machinery; it needs a visible bridge back to how a prompt becomes response tokens.',
  'risk/policy': 'This card uses the prompt/response path to separate practical risk from myths about secret learning or agency.'
}

const promptResponseNoteByLessonId = {
  'rag-retrieval': 'Retrieved documents become prompt/context tokens. The answer is still generated as response tokens one at a time.'
}

const confusionRiskByLessonId = {
  'what-is-llm': 'Next-token prediction can sound trivial unless the role of learned weights and repeated inference is made concrete.',
  'where-llms-fit': 'Learners may treat AI, machine learning, generative AI, and LLM as interchangeable labels.',
  history: 'Learners may read rules versus learned patterns as a total replacement story instead of two still-useful traditions.',
  training: 'Ordinary chat can be mistaken for training unless durable weight updates are foregrounded.',
  pretraining: 'Broad exposure can be misread as verbatim memorization of every source document.',
  'overfitting-generalization': 'Memorization can be mistaken for understanding unless new-example performance is foregrounded.',
  'fine-tuning': 'Fine-tuning may be confused with prompting, system messages, or one-off personalization.',
  alignment: 'Alignment can be mistaken for moral understanding, full trustworthiness, or a perfect safety guarantee.',
  inference: 'Temporary hidden states may be mistaken for new memories or weight changes.',
  'prompt-response': 'Learners may think the whole answer appears at once instead of being generated token by token.',
  tokens: 'Tokens may be mistaken for whole words or human concepts.',
  'token-ids': 'The ID can be mistaken for meaning rather than a lookup key.',
  embeddings: 'Embeddings can be confused with definitions, memories, or hidden states.',
  vectors: 'Feature dimensions may be treated as literal labeled meanings rather than learned numerical patterns.',
  tensors: 'Tensor language can become jargon unless shapes and positions are made tangible.',
  attention: 'The term attention invites human-focus and awareness metaphors.',
  mlp: 'The MLP can blur into attention unless cross-position mixing and per-position reshaping are contrasted.',
  layers: 'Layer stacks can be mistaken for a human chain of thought.',
  'hidden-states': 'Hidden states can be mistaken for secret English text or permanent memory.',
  logits: 'Raw scores can be confused with probabilities or truth confidence.',
  softmax: 'Probabilities can be mistaken for correctness or factual confidence.',
  sampling: 'Randomness can sound arbitrary unless tied to weighted probabilities.',
  autoregression: 'Learners may still imagine the model drafting a full paragraph internally before showing it.',
  'context-window': 'Current context can be confused with saved memory or training data.',
  'rag-retrieval': 'RAG can be mistaken for permanent learning, full file access, web search by itself, fine-tuning, or a guarantee that answers are true.',
  'how-ai-learns': 'Calling every behavior change learning can blur training, retrieval, and in-context steering.',
  diffusion: 'Learners may overgeneralize diffusion mechanics to text LLM generation.',
  multimodal: 'Human sensory metaphors can make engineered media representations sound more human-like than they are.',
  'risk-myth': 'Fluent outputs can invite myths about consciousness, intent, or secret self-training.'
}

const missingExplanationByLessonId = {
  'what-is-llm': 'Add a concrete one-prompt trace that shows context, weights, logits, sampling, and append-repeat at a glance.',
  'where-llms-fit': 'Keep the topology sparse: AI, rule-based AI, machine learning, deep learning, generative AI, LLMs, diffusion, multimodal, and other deep-learning systems.',
  history: 'Name one place rules still matter, such as policies, tool routing, or validation around learned models.',
  training: 'Show the loss signal and backprop update as the step that ordinary inference lacks.',
  pretraining: 'Clarify that broad datasets shape statistical patterns without guaranteeing source recall or truth.',
  'overfitting-generalization': 'Show training examples and validation examples together so the learner can see why set-aside evaluation matters.',
  'fine-tuning': 'Distinguish full fine-tuning, adapter-style updates, and instruction/policy tuning without adding too much detail.',
  alignment: 'Keep alignment framed as behavior shaping through training, policy, evaluation, and system design rather than moral agency.',
  inference: 'Make the forward pass tangible: fixed weights plus temporary activations produce one set of next-token scores.',
  'prompt-response': 'Add the response-so-far as a visible part of the next input context.',
  tokens: 'Show that token boundaries can be word pieces, punctuation, or spaces, not necessarily words.',
  'token-ids': 'Make the tokenizer and embedding table two separate pieces in the diagram.',
  embeddings: 'Contrast embedding as starting vector with hidden state as later context-shaped vector.',
  vectors: 'Explain that dimensions are learned and distributed; one feature is rarely a neat English label.',
  tensors: 'Show tensor axes: token position by feature, optionally across batches or heads only as a footnote.',
  attention: 'Show attention weights as arrows between positions, not as a mind selecting ideas.',
  mlp: 'Put MLP beside attention in the same layer so their complementary roles are visible.',
  layers: 'Add residual paths and normalization as optional advanced labels or a split target lesson.',
  'hidden-states': 'Show hidden state changing layer by layer for the same token in two contexts.',
  logits: 'Make vocabulary projection explicit: final hidden state to one score per candidate token.',
  softmax: 'Show that softmax normalizes scores into a distribution that sums to one.',
  sampling: 'Add temperature/top-p as knobs that shape selection without overexplaining math.',
  autoregression: 'Use the canonical pet-conflict response to show next token, append, repeat.',
  'context-window': 'Show what falls out and that retrieval adds text to context rather than training weights.',
  'rag-retrieval': 'Name the retrieval step, the context insertion step, and the fact that weights remain unchanged unless training also happens.',
  'how-ai-learns': 'Separate durable training, retrieval, temporary instructions, and deployed online learning in one table.',
  diffusion: 'Show a side-by-side: denoise image representation versus append text tokens.',
  multimodal: 'Add an example of image input, text output, and the representation bridge between them.',
  'risk-myth': 'Tie each risk to a mechanism: context exposure, tool access, hallucination, bias, or over-trust.'
}

const illustrationNeedByLessonId = {
  'what-is-llm': 'One-page prompt lifecycle: prompt enters, fixed weights process, next token sampled, response grows.',
  'where-llms-fit': 'Coded ZenTron Origami family tree: AI splits into rule-based AI and machine learning; deep learning contains generative AI with LLMs, diffusion, and multimodal models.',
  history: 'Split-panel rulebook versus learned landscape, with a small note that systems can combine them.',
  training: 'Training loop with predict, compare, loss, update weights, repeat.',
  pretraining: 'Broad data rain carving durable pathways into a model landscape.',
  'overfitting-generalization': 'Two curves: an overfit curve that traces training dots too tightly and a smoother curve that predicts new dots.',
  'fine-tuning': 'Targeted trail added onto an existing pretrained terrain.',
  alignment: 'Response landscape with preferred paths, warning zones, guardrails, policy checkpoint, and human feedback marker.',
  inference: 'Forward-pass pipeline with fixed weights underneath and temporary states above.',
  'prompt-response': 'Given prompt cards and newly generated response cards entering the next context together.',
  tokens: 'Tokenizer conveyor splitting a short sentence into uneven chunks.',
  'token-ids': 'Token chunks mapped to numeric IDs, then to rows in an embedding table.',
  embeddings: 'Lookup table pulling a learned starting vector for one token ID.',
  vectors: 'Many-dimensional feature bars with a warning that labels are simplified.',
  tensors: 'Mobile-readable tensor block with token-position and feature axes.',
  attention: 'Token nodes with weighted relevance arcs and a plain-language caption.',
  mlp: 'Per-token vector forge or feature mixer after attention.',
  layers: 'Transparent layer stack with attention and MLP blocks repeated.',
  'hidden-states': 'Same token glowing differently across contexts and layers.',
  logits: 'Raw candidate scoreboard before softmax.',
  softmax: 'Funnel converting raw scores into probabilities that sum to one.',
  sampling: 'Weighted vocabulary cloud with one selected token.',
  autoregression: 'Loop diagram: score, sample, append, run again.',
  'context-window': 'Limited stack of cards where older cards fall out.',
  'rag-retrieval': 'Gold-standard open-book retrieval scene: Prompt, Retriever, Notes, Context, Response, and fixed weights with numbered HTML callouts.',
  'how-ai-learns': 'Matrix of durable weight change, temporary context steering, and retrieval.',
  diffusion: 'Denoising sequence beside a next-token text loop.',
  multimodal: 'Text, image, audio, and video paths meeting in a shared representation hub.',
  'risk-myth': 'Risk sorting cards linked to mechanisms rather than fear language.'
}

const priorityByLessonId = {
  'where-llms-fit': 'medium',
  history: 'medium',
  'overfitting-generalization': 'high',
  alignment: 'high',
  tokens: 'medium',
  vectors: 'high',
  tensors: 'high',
  attention: 'high',
  mlp: 'high',
  layers: 'medium',
  'hidden-states': 'high',
  'rag-retrieval': 'high',
  logits: 'medium',
  softmax: 'medium',
  sampling: 'medium',
  'context-window': 'high',
  'how-ai-learns': 'high',
  diffusion: 'medium',
  multimodal: 'medium',
  'risk-myth': 'high'
}

const baselineRubric = {
  accuracy: 5,
  placement: 4,
  relationship: 4,
  promptResponse: 4,
  durableTemporary: 4,
  metaphor: 4,
  brain: 4,
  visual: 4,
  exercise: 3,
  mobile: 4
}

const rubricOverridesByLessonId = {
  'what-is-llm': { relationship: 5, promptResponse: 5, durableTemporary: 5, exercise: 4 },
  'where-llms-fit': { accuracy: 5, placement: 5, relationship: 5, durableTemporary: 5, visual: 5, exercise: 4 },
  history: { promptResponse: 3, durableTemporary: 3, visual: 3, exercise: 2 },
  training: { placement: 5, durableTemporary: 5, exercise: 4 },
  pretraining: { placement: 5, durableTemporary: 5, exercise: 2 },
  'overfitting-generalization': { placement: 5, durableTemporary: 5, promptResponse: 4, visual: 5, exercise: 4 },
  'fine-tuning': { placement: 5, durableTemporary: 5, exercise: 2 },
  alignment: { placement: 5, durableTemporary: 5, promptResponse: 4, brain: 5, visual: 5, exercise: 4 },
  inference: { placement: 5, promptResponse: 5, durableTemporary: 5, exercise: 4 },
  'prompt-response': { placement: 5, relationship: 5, promptResponse: 5, exercise: 4 },
  tokens: { placement: 5, promptResponse: 5, durableTemporary: 3, exercise: 4 },
  'token-ids': { placement: 5, promptResponse: 4, durableTemporary: 3, exercise: 4 },
  embeddings: { placement: 5, durableTemporary: 5, exercise: 4 },
  vectors: { placement: 4, promptResponse: 3, durableTemporary: 5, visual: 3, exercise: 2 },
  tensors: { placement: 4, promptResponse: 3, durableTemporary: 3, visual: 4, exercise: 2 },
  attention: { placement: 5, promptResponse: 5, brain: 5, exercise: 4 },
  mlp: { placement: 5, relationship: 5, exercise: 4 },
  layers: { placement: 5, promptResponse: 3, visual: 4, exercise: 2 },
  'hidden-states': { placement: 5, promptResponse: 5, durableTemporary: 5, exercise: 4 },
  logits: { placement: 5, relationship: 5, promptResponse: 5, exercise: 4 },
  softmax: { placement: 5, relationship: 5, promptResponse: 5, exercise: 4 },
  sampling: { placement: 5, promptResponse: 5, exercise: 4 },
  autoregression: { placement: 5, relationship: 5, promptResponse: 5, exercise: 4 },
  'context-window': { placement: 5, relationship: 5, promptResponse: 5, durableTemporary: 5, exercise: 4 },
  'rag-retrieval': { accuracy: 5, placement: 5, relationship: 5, promptResponse: 5, durableTemporary: 5, visual: 5, exercise: 4 },
  'how-ai-learns': { accuracy: 4, placement: 4, promptResponse: 3, durableTemporary: 5, visual: 4, exercise: 4, mobile: 3 },
  diffusion: { promptResponse: 2, durableTemporary: 3, exercise: 2 },
  multimodal: { promptResponse: 3, durableTemporary: 3, exercise: 2 },
  'risk-myth': { relationship: 5, promptResponse: 4, durableTemporary: 5, exercise: 4 }
}

export function getLessonRubric(lessonId) {
  return {
    ...baselineRubric,
    ...(rubricOverridesByLessonId[lessonId] ?? {})
  }
}

export function getRubricAverage(lessonId) {
  const rubric = getLessonRubric(lessonId)
  const values = reviewRubricCategories.map((category) => rubric[category.key] ?? 0)
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1))
}

export function buildLessonReviewProfile(lesson) {
  const lessonId = typeof lesson === 'string' ? lesson : lesson.id
  const stage = typeof lesson === 'object' && lesson.stageType ? lesson.stageType : stageByLessonId[lessonId] ?? 'architecture'

  return {
    stage,
    promptResponseNote: typeof lesson === 'object' && lesson.promptVsResponseNote ? lesson.promptVsResponseNote : promptResponseNoteByLessonId[lessonId] ?? promptResponseNotesByStage[stage],
    confusionRisk: typeof lesson === 'object' && lesson.misconception ? lesson.misconception : confusionRiskByLessonId[lessonId] ?? 'No major confusion risk identified beyond normal vocabulary load.',
    missingExplanation: typeof lesson === 'object' && lesson.coreExplanation ? lesson.coreExplanation : missingExplanationByLessonId[lessonId] ?? 'No urgent missing explanation identified.',
    illustrationNeeded: typeof lesson === 'object' && lesson.visualAidId ? `Current visual aid: ${lesson.visualAidId}. ${illustrationNeedByLessonId[lessonId] ?? 'Keep labels explicit and mobile-readable.'}` : illustrationNeedByLessonId[lessonId] ?? 'Keep the current visual aid and make labels more explicit if space allows.',
    rewritePriority: priorityByLessonId[lessonId] ?? 'low',
    rubric: getLessonRubric(lessonId),
    rubricAverage: getRubricAverage(lessonId)
  }
}
