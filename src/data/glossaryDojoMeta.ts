export type GlossaryDojoTermMeta = {
  familyTags?: string[]
  conceptClusters?: string[]
  lifecycleStage?: string
  curriculumStage?: string
  confusableWith?: string[]
  relationships?: string[]
  shortExplanation?: string
}

export const glossaryDojoConceptClusters: Record<string, string[]> = {
  context: [
    'input-context',
    'context window',
    'prompt',
    'prompt-tokens',
    'response-tokens',
    'response-so-far',
    'retrieval',
    'system-prompt',
    'memory',
    'rag',
    'forward-pass',
    'in-context learning'
  ],
  tokenization: [
    'token',
    'tokenizer',
    'tokenization',
    'token-id',
    'prompt-tokens',
    'response-tokens',
    'next-token',
    'generated-token'
  ],
  representations: [
    'embedding',
    'embedding-table',
    'vector',
    'tensor',
    'hidden state',
    'activation',
    'temporary-activation',
    'feature',
    'distributed-representation',
    'representation',
    'layer'
  ],
  decoding: [
    'logits',
    'softmax',
    'probability',
    'sampling',
    'temperature',
    'top-k',
    'top-p',
    'generated-token',
    'next-token',
    'decoding-step'
  ],
  training: [
    'training',
    'pretraining',
    'fine-tuning',
    'loss',
    'weight-update',
    'validation-data',
    'overfitting',
    'generalization',
    'training-data'
  ],
  evidence: [
    'rag',
    'retrieval',
    'grounding',
    'citation',
    'hallucination',
    'uncertainty',
    'human-review',
    'source-review'
  ],
  'costs-governance': [
    'environmental-footprint',
    'energy-use',
    'water-use',
    'carbon-emissions',
    'data-center',
    'e-waste',
    'privacy',
    'governance',
    'accountability',
    'labor-disruption',
    'deskilling',
    'responsible-ai'
  ]
}

export const glossaryDojoMeta: Record<string, GlossaryDojoTermMeta> = {
  llm: {
    familyTags: ['ai-family', 'generation'],
    lifecycleStage: 'model family',
    curriculumStage: 'Before Morning',
    confusableWith: ['ai', 'generative-ai', 'rag'],
    relationships: ['generative-ai', 'deep-learning', 'autoregression'],
    shortExplanation: 'An LLM is a generative AI system focused on language and code.'
  },
  ai: {
    familyTags: ['ai-family'],
    lifecycleStage: 'model family',
    curriculumStage: 'Before Morning',
    confusableWith: ['llm', 'machine-learning', 'generative-ai'],
    relationships: ['machine-learning', 'symbolic-ai', 'generative-ai'],
    shortExplanation: 'AI is the broad field, not just chatbots or LLMs.'
  },
  'machine-learning': {
    familyTags: ['ai-family', 'learning'],
    lifecycleStage: 'model family',
    curriculumStage: 'Before Morning',
    confusableWith: ['ai', 'deep-learning'],
    relationships: ['deep-learning', 'training'],
    shortExplanation: 'Machine learning systems learn patterns from data.'
  },
  'deep-learning': {
    familyTags: ['ai-family', 'learning'],
    lifecycleStage: 'model family',
    curriculumStage: 'Before Morning',
    confusableWith: ['machine-learning', 'symbolic-ai'],
    relationships: ['neural network', 'training', 'generative-ai'],
    shortExplanation: 'Deep learning uses many learned layers to transform representations.'
  },
  'symbolic-ai': {
    familyTags: ['ai-family', 'rules'],
    lifecycleStage: 'model family',
    curriculumStage: 'Before Morning',
    confusableWith: ['rule-based-ai', 'deep-learning'],
    relationships: ['rationalism', 'rule-based-ai'],
    shortExplanation: 'Symbolic AI relies on explicit symbols, logic, and hand-written rules.'
  },
  training: {
    familyTags: ['durable-learning'],
    conceptClusters: ['training'],
    lifecycleStage: 'training',
    curriculumStage: 'Before Morning',
    confusableWith: ['inference', 'fine-tuning', 'rag'],
    relationships: ['loss', 'weight-update', 'training-data'],
    shortExplanation: 'Training durably changes model weights using an optimization signal.'
  },
  loss: {
    familyTags: ['durable-learning'],
    conceptClusters: ['training'],
    lifecycleStage: 'training',
    curriculumStage: 'Before Morning',
    confusableWith: ['probability', 'confidence', 'evaluation'],
    relationships: ['training', 'weight-update', 'optimizer'],
    shortExplanation: 'Loss is the numerical training signal that measures prediction error.'
  },
  weight: {
    familyTags: ['durable-learning', 'model-internals'],
    conceptClusters: ['training', 'representations'],
    lifecycleStage: 'training and inference',
    curriculumStage: 'Before Morning',
    confusableWith: ['hidden state', 'memory', 'parameter'],
    relationships: ['parameter', 'weight-update', 'training'],
    shortExplanation: 'A weight is a learned number that shapes how signals transform.'
  },
  'weight-update': {
    familyTags: ['durable-learning'],
    conceptClusters: ['training'],
    lifecycleStage: 'training',
    curriculumStage: 'Before Morning',
    confusableWith: ['prompt', 'context window', 'inference'],
    relationships: ['weight', 'loss', 'training'],
    shortExplanation: 'A weight update is the durable training step that changes parameters.'
  },
  pretraining: {
    familyTags: ['durable-learning'],
    conceptClusters: ['training'],
    lifecycleStage: 'training',
    curriculumStage: 'Before Morning',
    confusableWith: ['fine-tuning', 'inference'],
    relationships: ['training', 'training-data', 'next-token'],
    shortExplanation: 'Pretraining is the broad first training phase that builds general capability.'
  },
  'fine-tuning': {
    familyTags: ['durable-learning'],
    conceptClusters: ['training'],
    lifecycleStage: 'training',
    curriculumStage: 'Before Morning',
    confusableWith: ['prompt', 'rag', 'pretraining'],
    relationships: ['adapter', 'alignment', 'training'],
    shortExplanation: 'Fine-tuning is targeted training after pretraining.'
  },
  inference: {
    familyTags: ['runtime'],
    conceptClusters: ['context'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['training', 'pretraining', 'fine-tuning'],
    relationships: ['forward-pass', 'input-context', 'logits'],
    shortExplanation: 'Inference uses fixed learned weights to process the current context.'
  },
  prompt: {
    familyTags: ['runtime', 'context'],
    conceptClusters: ['context'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['response', 'system-prompt', 'context window'],
    relationships: ['prompt-tokens', 'input-context'],
    shortExplanation: 'A prompt is input context given to the model for the current run.'
  },
  response: {
    familyTags: ['runtime', 'generation'],
    conceptClusters: ['context'],
    lifecycleStage: 'response generation',
    curriculumStage: 'Morning Commute',
    confusableWith: ['prompt', 'completion'],
    relationships: ['response-tokens', 'generated-token', 'autoregression'],
    shortExplanation: 'A response is generated token by token after the prompt is processed.'
  },
  'input-context': {
    familyTags: ['runtime', 'context'],
    conceptClusters: ['context'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['context window', 'prompt', 'memory', 'system-prompt'],
    relationships: ['prompt-tokens', 'response-tokens', 'response-so-far', 'retrieval', 'rag', 'forward-pass'],
    shortExplanation: 'Input context is everything currently visible to the model.'
  },
  token: {
    familyTags: ['tokens'],
    conceptClusters: ['tokenization'],
    lifecycleStage: 'prompt processing',
    curriculumStage: 'Morning Commute',
    confusableWith: ['token-id', 'word'],
    relationships: ['tokenization', 'tokenizer', 'token-id'],
    shortExplanation: 'A token is a model-readable chunk of text.'
  },
  'token-id': {
    familyTags: ['tokens'],
    conceptClusters: ['tokenization'],
    lifecycleStage: 'prompt processing',
    curriculumStage: 'Morning Commute',
    confusableWith: ['token', 'embedding'],
    relationships: ['token', 'embedding-table'],
    shortExplanation: 'A token ID is a number used to look up a token embedding.'
  },
  embedding: {
    familyTags: ['vectors', 'model-internals'],
    conceptClusters: ['representations'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['hidden state', 'definition', 'memory'],
    relationships: ['embedding-table', 'token-id', 'vector'],
    shortExplanation: 'An embedding is a token ID\'s learned starting vector.'
  },
  vector: {
    familyTags: ['vectors', 'model-internals'],
    conceptClusters: ['representations'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['tensor', 'embedding'],
    relationships: ['feature', 'tensor', 'hidden state'],
    shortExplanation: 'A vector is a list of numbers that can represent learned features.'
  },
  tensor: {
    familyTags: ['vectors', 'model-internals'],
    conceptClusters: ['representations'],
    lifecycleStage: 'inference',
    curriculumStage: 'Morning Commute',
    confusableWith: ['vector', 'weight-tensor'],
    relationships: ['vector', 'activation', 'weight-tensor'],
    shortExplanation: 'A tensor is an organized block of numbers, often many token vectors at once.'
  },
  attention: {
    familyTags: ['transformer-layer'],
    conceptClusters: ['representations'],
    lifecycleStage: 'forward pass',
    curriculumStage: 'Workday',
    confusableWith: ['human attention', 'MLP', 'hidden state'],
    relationships: ['hidden state', 'layer', 'MLP'],
    shortExplanation: 'Attention assigns relevance weights between token positions.'
  },
  MLP: {
    familyTags: ['transformer-layer'],
    conceptClusters: ['representations'],
    lifecycleStage: 'forward pass',
    curriculumStage: 'Workday',
    confusableWith: ['attention', 'neural network'],
    relationships: ['attention', 'feature', 'hidden state'],
    shortExplanation: 'An MLP reshapes each token position\'s feature vector.'
  },
  'hidden state': {
    familyTags: ['transformer-layer', 'runtime'],
    conceptClusters: ['representations'],
    lifecycleStage: 'forward pass',
    curriculumStage: 'Workday',
    confusableWith: ['embedding', 'memory', 'activation'],
    relationships: ['embedding', 'activation', 'vector', 'tensor', 'layer', 'forward-pass'],
    shortExplanation: 'A hidden state is a temporary context-shaped vector inside a layer.'
  },
  logits: {
    familyTags: ['decoding'],
    conceptClusters: ['decoding'],
    lifecycleStage: 'response generation',
    curriculumStage: 'Workday',
    confusableWith: ['probability', 'softmax'],
    relationships: ['softmax', 'sampling', 'next-token'],
    shortExplanation: 'Logits are raw next-token scores before probabilities.'
  },
  softmax: {
    familyTags: ['decoding'],
    conceptClusters: ['decoding'],
    lifecycleStage: 'response generation',
    curriculumStage: 'Workday',
    confusableWith: ['logits', 'sampling'],
    relationships: ['logits', 'probability', 'sampling'],
    shortExplanation: 'Softmax converts raw scores into probabilities.'
  },
  sampling: {
    familyTags: ['decoding'],
    conceptClusters: ['decoding'],
    lifecycleStage: 'response generation',
    curriculumStage: 'Workday',
    confusableWith: ['softmax', 'temperature'],
    relationships: ['probability', 'generated-token', 'autoregression'],
    shortExplanation: 'Sampling chooses one next token from probabilities.'
  },
  autoregression: {
    familyTags: ['generation'],
    conceptClusters: ['decoding'],
    lifecycleStage: 'response generation',
    curriculumStage: 'Workday',
    confusableWith: ['completion', 'diffusion'],
    relationships: ['generated-token', 'sampling', 'response-tokens'],
    shortExplanation: 'Autoregression means choose a token, append it, and repeat.'
  },
  'context window': {
    familyTags: ['context', 'runtime'],
    conceptClusters: ['context'],
    lifecycleStage: 'inference',
    curriculumStage: 'Workday',
    confusableWith: ['memory', 'training-data', 'rag'],
    relationships: ['input-context', 'prompt-tokens', 'response-tokens'],
    shortExplanation: 'The context window is the temporary limit of what the model can consider.'
  },
  rag: {
    familyTags: ['context', 'retrieval'],
    conceptClusters: ['context', 'evidence'],
    lifecycleStage: 'inference',
    curriculumStage: 'Workday',
    confusableWith: ['retrieval', 'grounding', 'fine-tuning', 'training'],
    relationships: ['input-context', 'context window', 'prompt', 'retrieval', 'grounding'],
    shortExplanation: 'RAG retrieves outside information and places it into current context.'
  },
  retrieval: {
    familyTags: ['context', 'retrieval'],
    conceptClusters: ['context', 'evidence'],
    lifecycleStage: 'inference',
    curriculumStage: 'Workday',
    confusableWith: ['training', 'memory'],
    relationships: ['rag', 'grounding', 'citation'],
    shortExplanation: 'Retrieval finds outside material for the model to use as context.'
  },
  grounding: {
    familyTags: ['context', 'risk-literacy'],
    conceptClusters: ['evidence'],
    lifecycleStage: 'inference and review',
    curriculumStage: 'Decision Room',
    confusableWith: ['citation', 'truth', 'rag'],
    relationships: ['rag', 'retrieval', 'citation'],
    shortExplanation: 'Grounding connects a response to available evidence.'
  },
  hallucination: {
    familyTags: ['risk-literacy'],
    conceptClusters: ['evidence'],
    lifecycleStage: 'response generation and review',
    curriculumStage: 'Decision Room',
    confusableWith: ['lying', 'uncertainty'],
    relationships: ['grounding', 'sampling', 'human-review'],
    shortExplanation: 'A hallucination is unsupported or fabricated model output.'
  },
  diffusion: {
    familyTags: ['ai-family', 'generation'],
    lifecycleStage: 'model family',
    curriculumStage: 'Twilight: The Wider Landscape',
    confusableWith: ['llm', 'autoregression', 'multimodal'],
    relationships: ['generative-ai', 'multimodal'],
    shortExplanation: 'A diffusion model generates by iterative denoising, not next-token text prediction.'
  },
  multimodal: {
    familyTags: ['ai-family', 'generation'],
    lifecycleStage: 'model family',
    curriculumStage: 'Twilight: The Wider Landscape',
    confusableWith: ['llm', 'diffusion'],
    relationships: ['generative-ai', 'embedding', 'vector'],
    shortExplanation: 'Multimodal AI works across more than one media type.'
  },
  'human-review': {
    familyTags: ['responsible-use'],
    conceptClusters: ['evidence', 'costs-governance'],
    lifecycleStage: 'review',
    curriculumStage: 'New Dawn',
    confusableWith: ['evaluation', 'responsible-ai'],
    relationships: ['uncertainty', 'governance', 'human-centered-ai-term'],
    shortExplanation: 'Human review means a person checks AI output before it matters.'
  }
}
