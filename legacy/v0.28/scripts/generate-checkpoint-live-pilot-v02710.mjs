import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const reportDir = path.join(root, 'docs/journey')
const previousBankPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-9-first-six-revised.json')
const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-10-first-twelve-active-dev.json')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-10-first-twelve-active-dev.md')
const outputHtmlPath = path.join(reportDir, 'prompt-life-v0-27-10-first-twelve-checkpoint-authoring-report.html')
const sourcePath = path.join(root, 'src/data/checkpointBankV02710.ts')

const VERSION = '0.27.10-first-twelve-active-dev'
const ACTIVE_BANK_LABEL = 'v0.27.10-first-twelve'
const ACTIVE_LESSON_IDS = [
  'what-is-llm',
  'where-llms-fit',
  'history',
  'training',
  'pretraining',
  'overfitting-generalization',
  'fine-tuning',
  'alignment',
  'inference',
  'prompt-response',
  'tokens',
  'token-ids'
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function cleanHeldOutText(value) {
  if (typeof value !== 'string') return value
  return value
    .replaceAll('held-out validation data', 'set-aside validation examples')
    .replaceAll('Held-out validation data', 'Set-aside validation examples')
    .replaceAll('held-out data', 'set-aside validation examples')
    .replaceAll('Held-out data', 'Set-aside validation examples')
    .replaceAll('held-out examples', 'set-aside validation examples')
    .replaceAll('Held-out examples', 'Set-aside validation examples')
    .replaceAll('held out to check transfer', 'saved for testing to check transfer')
    .replaceAll('held-out validation checks', 'set-aside validation checks')
    .replaceAll('held-out', 'set-aside')
    .replaceAll('Held-out', 'Set-aside')
}

function deepCleanHeldOut(value) {
  if (Array.isArray(value)) return value.map(deepCleanHeldOut)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, deepCleanHeldOut(child)]))
  }
  return cleanHeldOutText(value)
}

function c(choiceId, text, feedback) {
  return {
    choiceId,
    text,
    isCorrect: true,
    feedback,
    representedMisconception: null,
    representedGlossaryTerm: null,
    distractorSource: null,
    distractorRationale: null
  }
}

function w(choiceId, text, representedMisconception, representedGlossaryTerm, distractorSource, distractorRationale, feedback) {
  return {
    choiceId,
    text,
    isCorrect: false,
    feedback,
    representedMisconception,
    representedGlossaryTerm,
    distractorSource,
    distractorRationale
  }
}

function q(cardId, index, type, category, terms, question, choices, authoringNotes, humanReviewNotesApplied = []) {
  const correct = choices.find((choice) => choice.isCorrect)
  return {
    questionId: `v02710-${cardId}-q${index}`,
    type,
    authoringCategory: category,
    explicitMechanismTerms: terms,
    question,
    correctChoiceId: correct.choiceId,
    choices,
    modelThinking: true,
    directDefinition: false,
    authoringNotes,
    humanReviewNotesApplied
  }
}

const nextSixCards = [
  {
    stageNumber: 1,
    stageTitle: 'Before Morning',
    learningCardNumberWithinStage: 7,
    learningCardId: 'fine-tuning',
    learningCardTitle: 'Fine-Tuning',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 3,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Distinguish durable fine-tuning from temporary prompt, RAG, and sampling-time steering.',
      secondaryObjectives: [
        'Identify fine-tuning as additional training after pretraining.',
        'Separate model-weight or adapter changes from current-context changes.',
        'Explain why one base model can become many specialized assistants.'
      ],
      modelMechanismOrBoundary: 'Fine-tuning changes weights or adapter behavior for future runs; prompting and RAG shape the current context; sampling chooses a token during generation.',
      mythsMisconceptionsToCorrect: [
        'A better prompt is fine-tuning.',
        'RAG permanently teaches the model.',
        'Sampling is a durable adaptation step.'
      ],
      relatedGlossaryTerms: ['fine-tuning', 'adapter', 'pretraining', 'training', 'prompt', 'RAG', 'sampling', 'alignment'],
      nearbyGlossaryTermsUsefulAsDistractors: ['context window', 'retrieval', 'weight update', 'inference', 'system prompt'],
      questionCountRationale: 'Three questions cover the durable/temporary boundary, a product scenario, and the relationship to alignment without overloading a focused card.'
    },
    humanReviewSummary: {
      kept: ['Fine-tuning remains a durable post-pretraining shaping concept.'],
      revised: ['Expanded checkpoint coverage beyond one definition-like question.'],
      added: ['Boundary, applied scenario, and alignment-relationship questions.'],
      removed: []
    },
    questions: [
      q('fine-tuning', 1, 'boundary distinction', 'boundary', ['fine-tuning', 'prompt', 'RAG', 'sampling', 'future responses'], 'A team wants a support assistant to answer in a durable house style across future conversations. Which move is closest to fine-tuning?', [
        c('v02710-fine-tuning-q1-correct', 'Run additional training that changes weights or adapter behavior for future responses.', 'Good distinction. Fine-tuning is durable shaping after pretraining.'),
        w('v02710-fine-tuning-q1-better-prompt', 'Write one clearer prompt for the current chat.', 'prompting vs durable fine-tuning', 'prompt', 'same-card', 'Tempting because prompts can strongly steer one answer.', 'Not quite. A prompt can steer the current run, but fine-tuning changes future behavior through training.'),
        w('v02710-fine-tuning-q1-rag', 'Retrieve one policy PDF into the current context.', 'retrieval/context vs training', 'RAG', 'same-card', 'Tempting because retrieved text can improve one answer.', 'Close, but RAG adds temporary context. Fine-tuning is a training process that durably shapes behavior.'),
        w('v02710-fine-tuning-q1-sampling', 'Sample the next token from the current probability cloud.', 'decoding vs training', 'sampling', 'same-card', 'Tempting because sampling is part of response generation.', 'That describes decoding during inference. It chooses a token; it does not adapt the model for future runs.')
      ], {
        whyItHelpsModelThinking: 'The learner chooses the durable weight/adaptation path instead of temporary steering.',
        badgeMasterySupport: 'Supports the durable-versus-temporary model literacy boundary.',
        reviewStatus: 'new v0.27.10 authoring'
      }),
      q('fine-tuning', 2, 'applied scenario', 'application', ['fine-tuning', 'base model', 'specialized assistant', 'weights'], 'A base model is adapted on thousands of institution-specific examples, then later answers new users in that style. What changed most directly?', [
        c('v02710-fine-tuning-q2-correct', 'The adapted model’s weights or adapter behavior can carry that pattern into later inference runs.', 'Insight strengthened. Fine-tuning makes a reusable model change, not just a one-chat hint.'),
        w('v02710-fine-tuning-q2-context-only', 'Only the current context window got larger.', 'context window vs fine-tuned behavior', 'context window', 'nearby-stage', 'Tempting because context can also carry institution-specific text.', 'Not quite. A larger context window is temporary input space; fine-tuning changes reusable behavior.'),
        w('v02710-fine-tuning-q2-memory', 'The model became conscious of the institution’s norms.', 'mind/metaphor overreach', 'alignment', 'explicit-confusable', 'Tempting because the assistant may sound norm-aware.', 'That gives the model too much mind. The behavior can be shaped without conscious commitment to norms.'),
        w('v02710-fine-tuning-q2-rag-search', 'The model must search the institution’s files every time.', 'retrieval vs fine-tuning', 'retrieval', 'same-stage', 'Tempting because many institutional assistants also use search.', 'Close, but fine-tuning and retrieval are different. Retrieval may be added, but fine-tuned behavior can persist in weights or adapters.')
      ], {
        whyItHelpsModelThinking: 'The learner explains a specialized assistant as durable model adaptation rather than product magic.',
        badgeMasterySupport: 'Separates base model, fine-tuned model, and runtime retrieval.'
      }),
      q('fine-tuning', 3, 'causal consequence', 'causal-consequence', ['fine-tuning', 'alignment', 'future behavior', 'system prompt'], 'If fine-tuning is used for alignment, what does that mean about future model behavior?', [
        c('v02710-fine-tuning-q3-correct', 'Training can make some instruction-following or preference patterns more likely in later responses.', 'Good distinction. Fine-tuning can support alignment by durably shaping output patterns.'),
        w('v02710-fine-tuning-q3-perfect-safety', 'Every future answer is guaranteed safe and true.', 'alignment/fine-tuning as guarantee', 'alignment', 'nearby-stage', 'Tempting because alignment sounds like solving behavior.', 'Not quite. Fine-tuning can improve behavior, but it does not guarantee truth or safety.'),
        w('v02710-fine-tuning-q3-system-prompt-only', 'Only the visible system prompt changed for one session.', 'runtime steering vs durable training', 'system prompt', 'same-card', 'Tempting because system prompts can steer behavior strongly.', 'Close, but a system prompt steers the current run. Fine-tuning is durable training.'),
        w('v02710-fine-tuning-q3-inner-values', 'The model acquired human values and moral agency.', 'behavior shaping vs moral agency', 'alignment', 'explicit-confusable', 'Tempting because aligned behavior can sound value-driven.', 'That gives the model too much mind. Fine-tuning changes output patterns; it does not create moral agency.')
      ], {
        whyItHelpsModelThinking: 'The learner connects fine-tuning to alignment without overclaiming morality or guarantees.',
        badgeMasterySupport: 'Prepares the next card’s alignment distinction.'
      })
    ]
  },
  {
    stageNumber: 1,
    stageTitle: 'Before Morning',
    learningCardNumberWithinStage: 8,
    learningCardId: 'alignment',
    learningCardTitle: 'Alignment',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 4,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Reason about alignment as behavior shaping across training, system design, evaluation, and runtime controls without mistaking it for conscience or guaranteed truth.',
      secondaryObjectives: [
        'Separate durable alignment methods from runtime steering.',
        'Distinguish model behavior from moral agency.',
        'Recognize policy filters and guardrails as product/system layers around model output.'
      ],
      modelMechanismOrBoundary: 'Alignment can use fine-tuning, preference optimization, system prompts, policies, filters, and evaluation; it shapes behavior but does not make the model morally aware.',
      mythsMisconceptionsToCorrect: [
        'Alignment makes a model conscious or morally good.',
        'A policy filter is the same as retraining weights.',
        'Aligned output guarantees truth.'
      ],
      relatedGlossaryTerms: ['alignment', 'instruction tuning', 'human feedback learning', 'RLHF', 'policy', 'guardrail', 'evaluation', 'fine-tuning'],
      nearbyGlossaryTermsUsefulAsDistractors: ['truth', 'sampling', 'system prompt', 'human review', 'probability'],
      questionCountRationale: 'Four questions are warranted because alignment mixes durable training, runtime controls, evaluation, and human-use boundaries.'
    },
    humanReviewSummary: {
      kept: ['Alignment remains behavior shaping toward instructions, preferences, and safety boundaries.'],
      revised: ['Moved from one definition question to mechanism-rich scenarios.'],
      added: ['Durable/runtime distinction, policy-filter scenario, evaluation scenario, and moral-agency misconception check.'],
      removed: []
    },
    questions: [
      q('alignment', 1, 'boundary distinction', 'boundary', ['alignment', 'behavior', 'instructions', 'safety boundaries'], 'An alignment-shaped assistant refuses a harmful request and follows a safer instruction instead. What should a model-literate learner conclude?', [
        c('v02710-alignment-q1-correct', 'Its behavior was shaped toward instructions and safety boundaries, but that does not prove moral understanding.', 'Good distinction. Alignment shapes behavior; it is not magic morality.'),
        w('v02710-alignment-q1-conscious', 'The model must understand morality the way a person does.', 'aligned behavior vs moral agency', 'alignment', 'same-card', 'Tempting because refusals can sound principled.', 'That gives the model too much mind. Refusal behavior can be shaped without human moral understanding.'),
        w('v02710-alignment-q1-truth', 'Every answer from the assistant is now guaranteed true.', 'alignment vs truth guarantee', 'truth', 'nearby-stage', 'Tempting because safer behavior can feel more trustworthy.', 'Not quite. Alignment can shape behavior, but it does not guarantee factual truth.'),
        w('v02710-alignment-q1-no-model', 'The LLM stopped using learned weights and became a rulebook.', 'alignment controls vs learned model', 'rule-based AI', 'explicit-confusable', 'Tempting because aligned products may use rules or filters.', 'Close, but an aligned product can still use a learned model plus rules, filters, or policies.')
      ], {
        whyItHelpsModelThinking: 'The learner avoids turning behavior shaping into claims about conscience.',
        badgeMasterySupport: 'Supports risk literacy without fear or hype.'
      }),
      q('alignment', 2, 'model trace', 'model-trace', ['alignment', 'fine-tuning', 'system prompt', 'policy filter'], 'A product uses instruction fine-tuning, a system prompt, and a policy filter around one LLM. Which alignment map is most useful?', [
        c('v02710-alignment-q2-correct', 'Some alignment changes can be durable training changes, while other controls steer or filter the current run.', 'Insight strengthened. Alignment can happen through several layers, not one magic switch.'),
        w('v02710-alignment-q2-all-weights', 'Every alignment layer permanently rewrites the model weights.', 'runtime control vs durable weight update', 'weight update', 'same-card', 'Tempting because all layers affect visible behavior.', 'Not quite. Fine-tuning may change weights, but system prompts and filters can steer behavior at runtime.'),
        w('v02710-alignment-q2-only-prompt', 'Alignment is only a better prompt typed by the user.', 'alignment vs user prompting only', 'prompt', 'nearby-stage', 'Tempting because prompts are visible and powerful.', 'Close, but alignment can include training, policies, evaluation, and runtime controls beyond the user prompt.'),
        w('v02710-alignment-q2-sampling-only', 'Alignment is the same thing as sampling the most probable token.', 'alignment vs decoding', 'sampling', 'nearby-stage', 'Tempting because both affect the final response.', 'Sampling chooses a next token from probabilities. Alignment shapes or constrains behavior around that process.')
      ], {
        whyItHelpsModelThinking: 'The learner reasons through a layered product stack.',
        badgeMasterySupport: 'Clarifies model, policy, prompt, and filter boundaries.'
      }),
      q('alignment', 3, 'human-use judgment', 'human-use-judgment', ['alignment', 'evaluation', 'human feedback', 'behavior'], 'Why do teams evaluate aligned models with tests and human feedback after training or deployment?', [
        c('v02710-alignment-q3-correct', 'Because shaped behavior can still fail, drift, or create unexpected tradeoffs in new situations.', 'Good distinction. Alignment needs evaluation; it is not a one-time guarantee.'),
        w('v02710-alignment-q3-conscious-test', 'To check whether the model has developed a conscience.', 'evaluation vs consciousness', 'evaluation', 'same-card', 'Tempting because evaluations judge behavior.', 'Not quite. Evaluation checks behavior and outcomes, not inner conscience.'),
        w('v02710-alignment-q3-no-need', 'Because aligned models no longer need human review.', 'alignment vs human review', 'human review', 'nearby-stage', 'Tempting because alignment sounds like completion.', 'This choice overclaims. Aligned systems can still need review, monitoring, and accountability.'),
        w('v02710-alignment-q3-loss-only', 'Because lower training loss alone proves the model is safe.', 'loss vs safety/behavior evaluation', 'loss', 'nearby-stage', 'Tempting because loss is an important training signal.', 'Close, but loss alone is not a full safety or usefulness evaluation.')
      ], {
        whyItHelpsModelThinking: 'The learner sees evaluation as necessary because behavior shaping can fail in context.',
        badgeMasterySupport: 'Connects mechanics to responsible human oversight.'
      }),
      q('alignment', 4, 'misconception diagnosis', 'misconception-check', ['guardrail', 'policy', 'alignment', 'response'], 'A guardrail blocks one unsafe response from reaching the user. What changed most directly?', [
        c('v02710-alignment-q4-correct', 'A policy or filter layer affected the visible response; that does not necessarily mean the model weights changed.', 'Good distinction. Guardrails can be runtime controls around a model.'),
        w('v02710-alignment-q4-finetune', 'The base model was definitely fine-tuned at that moment.', 'filtering vs fine-tuning', 'fine-tuning', 'same-card', 'Tempting because both can change visible behavior.', 'Not quite. A filter can block output during runtime without retraining the model.'),
        w('v02710-alignment-q4-truth', 'The response became guaranteed factual because it passed a guardrail.', 'policy compliance vs truth', 'truth', 'author-created misconception', 'Tempting because allowed output may feel approved.', 'Passing a guardrail is not the same as being true. Evidence and review can still matter.'),
        w('v02710-alignment-q4-awareness', 'The model realized the request was wrong.', 'guardrail behavior vs awareness', 'llm', 'explicit-confusable', 'Tempting because the refusal may sound reflective.', 'That gives the model too much mind. The visible behavior can come from shaped model behavior or surrounding controls.')
      ], {
        whyItHelpsModelThinking: 'The learner separates runtime product controls from durable model training.',
        badgeMasterySupport: 'Builds model-vs-product literacy.'
      })
    ]
  },
  {
    stageNumber: 2,
    stageTitle: 'Morning Commute',
    learningCardNumberWithinStage: 1,
    learningCardId: 'inference',
    learningCardTitle: 'Inference',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 4,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Explain ordinary inference as fixed weights plus temporary context-shaped computation, not durable learning.',
      secondaryObjectives: [
        'Trace current context through temporary activations and hidden states.',
        'Separate forward passes from weight updates.',
        'Connect inference to prompt/response and next-token generation.'
      ],
      modelMechanismOrBoundary: 'Inference uses learned weights to compute temporary internal states and next-token scores; it normally does not update weights or training data.',
      mythsMisconceptionsToCorrect: [
        'Normal chat trains the model.',
        'Inference searches every document the model has seen.',
        'Temporary activations are durable memory.'
      ],
      relatedGlossaryTerms: ['inference', 'forward pass', 'input context', 'weight', 'activation', 'hidden state', 'logits', 'sampling'],
      nearbyGlossaryTermsUsefulAsDistractors: ['training', 'fine-tuning', 'memory', 'retrieval', 'context window'],
      questionCountRationale: 'Four questions fit because inference is a dense gateway concept connecting fixed weights, temporary states, context, and generation.'
    },
    humanReviewSummary: {
      kept: ['Inference remains the line between using a model and training it.'],
      revised: ['Expanded beyond the temporary-activations question.'],
      added: ['Forward-pass trace, current-context boundary, and ordinary-chat scenario.'],
      removed: []
    },
    questions: [
      q('inference', 1, 'mechanism in action', 'mechanism', ['inference', 'current context', 'fixed weights', 'temporary activations'], 'During ordinary inference, the current context enters the model. What changes temporarily, and what usually stays fixed?', [
        c('v02710-inference-q1-correct', 'Temporary activations and hidden states change; learned weights usually stay fixed.', 'Good distinction. Inference uses the map without redrawing it.'),
        w('v02710-inference-q1-weights-change', 'The learned weights change after every user prompt.', 'inference vs training update', 'training', 'same-card', 'Tempting because the model may adapt within a conversation.', 'Not quite. Ordinary inference can use context, but it usually does not rewrite weights.'),
        w('v02710-inference-q1-dataset', 'The training dataset changes to include the new prompt.', 'prompt/context vs training data', 'training data', 'same-card', 'Tempting because prompts feel like new information.', 'This choice reveals a common mix-up. A prompt can be current context without joining the training dataset.'),
        w('v02710-inference-q1-conscious', 'The model’s conscious attention shifts to the user’s intent.', 'attention/activation vs awareness', 'attention', 'nearby-stage', 'Tempting because the response may seem attentive.', 'That gives the model too much mind. Inference computes temporary vectors; it is not conscious attention.')
      ], {
        whyItHelpsModelThinking: 'The learner identifies temporary internal state versus durable parameters.',
        badgeMasterySupport: 'Core boundary for later context, attention, and hidden-state lessons.'
      }),
      q('inference', 2, 'model trace', 'model-trace', ['inference', 'forward pass', 'hidden state', 'logits', 'sampling'], 'In one inference step, which trace best matches the model’s next-token path?', [
        c('v02710-inference-q2-correct', 'Context enters a forward pass, temporary states form, logits are produced, and sampling can choose a token.', 'Insight strengthened. That is the live next-token path through inference.'),
        w('v02710-inference-q2-training-loop', 'Example enters training, loss updates weights, and a future model checkpoint is saved.', 'training loop vs inference trace', 'training', 'nearby-stage', 'Tempting because it is also a model computation path.', 'Close, but that is a training path. Inference uses existing weights to produce the next-token scores.'),
        w('v02710-inference-q2-rag-loop', 'Retriever searches outside documents, then the model permanently learns the snippets.', 'retrieval/context vs durable learning', 'RAG', 'nearby-stage', 'Tempting because retrieval may happen before generation.', 'Retrieval can add context before inference, but it does not by itself make the model permanently learn snippets.'),
        w('v02710-inference-q2-tokenizer-only', 'Tokenizer splits text and the answer appears without model layers.', 'tokenization vs model forward pass', 'tokenization', 'same-stage', 'Tempting because tokenization is an early required step.', 'Tokenization prepares input, but inference still runs model layers to produce scores.')
      ], {
        whyItHelpsModelThinking: 'The learner orders the live generation mechanism rather than recalling a label.',
        badgeMasterySupport: 'Connects inference to hidden states, logits, sampling, and autoregression.'
      }),
      q('inference', 3, 'applied scenario', 'application', ['inference', 'conversation history', 'current context', 'weights'], 'A chatbot remembers an earlier line in the same conversation and uses it in the next answer. What is the best model-level explanation?', [
        c('v02710-inference-q3-correct', 'The earlier line is still in the current context, so fixed weights can use it during inference.', 'Good distinction. Context can feel like memory while still being temporary input.'),
        w('v02710-inference-q3-weight-memory', 'The earlier line was written into the model’s weights.', 'context vs durable memory', 'memory', 'explicit-confusable', 'Tempting because the model appears to remember.', 'Not quite. Same-conversation context is temporary input, not necessarily a weight update.'),
        w('v02710-inference-q3-training-now', 'The chatbot fine-tuned itself on the earlier line.', 'ordinary inference vs fine-tuning', 'fine-tuning', 'same-stage', 'Tempting because the answer adapts to the conversation.', 'Close, but adaptation within a context window is not the same as fine-tuning.'),
        w('v02710-inference-q3-search-all', 'The model searched every document it was pretrained on.', 'inference vs search/retrieval', 'retrieval', 'nearby-stage', 'Tempting because the answer may include earlier information.', 'This describes search better than ordinary inference. The model can use visible context without searching training sources.')
      ], {
        whyItHelpsModelThinking: 'The learner distinguishes context-shaped inference from durable memory.',
        badgeMasterySupport: 'Reduces fear that every chat writes into the base model.'
      }),
      q('inference', 4, 'causal consequence', 'causal-consequence', ['inference', 'weights', 'future behavior', 'current run'], 'If ordinary inference normally does not update weights, what follows for future conversations?', [
        c('v02710-inference-q4-correct', 'A useful answer now does not automatically teach the base model to behave differently tomorrow.', 'Insight strengthened. Inference can be useful without being durable training.'),
        w('v02710-inference-q4-auto-learn', 'Every good answer automatically becomes permanent skill.', 'inference vs durable learning', 'training', 'same-card', 'Tempting because the response looks like successful practice.', 'Not quite. Durable skill changes require training or another model-update process.'),
        w('v02710-inference-q4-no-context', 'The current prompt cannot affect the answer at all.', 'context influence vs weight update', 'prompt', 'same-card', 'Tempting because weights stay fixed.', 'Close, but fixed weights can still respond differently to different current contexts.'),
        w('v02710-inference-q4-no-risk', 'There is no need to review outputs because inference is temporary.', 'temporary computation vs output risk', 'human review', 'nearby-stage', 'Tempting because temporary sounds harmless.', 'This choice overclaims. Temporary outputs can still affect people and decisions, so review can matter.')
      ], {
        whyItHelpsModelThinking: 'The learner reasons from the no-weight-update boundary to future behavior.',
        badgeMasterySupport: 'Connects mechanics to practical use and review.'
      })
    ]
  },
  {
    stageNumber: 2,
    stageTitle: 'Morning Commute',
    learningCardNumberWithinStage: 2,
    learningCardId: 'prompt-response',
    learningCardTitle: 'Prompt vs Response',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 3,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Separate given prompt/context tokens from generated response tokens and explain append-and-repeat generation.',
      secondaryObjectives: [
        'Identify prompt tokens as provided context.',
        'Identify response-so-far as generated tokens now included in context.',
        'Explain why the model does not generate a full answer all at once.'
      ],
      modelMechanismOrBoundary: 'Prompt tokens are given; response tokens are generated one at a time, appended, and used as context for the next inference step.',
      mythsMisconceptionsToCorrect: [
        'The whole response appears at once.',
        'Generated response tokens permanently train the model.',
        'Prompt and response are the same kind of user-provided input.'
      ],
      relatedGlossaryTerms: ['prompt', 'response', 'prompt token', 'response token', 'generated token', 'input context', 'completion'],
      nearbyGlossaryTermsUsefulAsDistractors: ['context window', 'autoregression', 'training', 'softmax', 'tokenization'],
      questionCountRationale: 'Three questions cover the given/generated boundary, append-and-repeat trace, and a common permanent-learning misconception.'
    },
    humanReviewSummary: {
      kept: ['Prompt vs response remains the given-context versus generated-token distinction.'],
      revised: ['Expanded beyond one append question.'],
      added: ['Model trace and boundary questions.'],
      removed: []
    },
    questions: [
      q('prompt-response', 1, 'boundary distinction', 'boundary', ['prompt', 'response tokens', 'current context'], 'A user gives a complete prompt, then the model begins writing response tokens. Which boundary matters most?', [
        c('v02710-prompt-response-q1-correct', 'Prompt tokens are given to the model; response tokens are generated and then appended to context.', 'Good distinction. Prompt is given; response is generated and appended.'),
        w('v02710-prompt-response-q1-all-user', 'Both prompt and response tokens were typed by the user.', 'prompt vs generated response', 'response', 'same-card', 'Tempting because both can appear together in the conversation transcript.', 'Not quite. The user provides the prompt; the model generates response tokens.'),
        w('v02710-prompt-response-q1-all-at-once', 'The model writes the whole response at once after reading the prompt.', 'autoregressive generation vs full answer at once', 'autoregression', 'same-card', 'Tempting because the interface may show a smooth answer.', 'Close, but the model generates response tokens step by step.'),
        w('v02710-prompt-response-q1-weight-update', 'Each response token permanently updates the model’s weights.', 'generated context vs durable training', 'training', 'nearby-stage', 'Tempting because response-so-far shapes later tokens.', 'This choice reveals a common mix-up. Response tokens can shape the current run without updating weights.')
      ], {
        whyItHelpsModelThinking: 'The learner separates given input from generated output in the same context.',
        badgeMasterySupport: 'Supports later tokenization and autoregression lessons.'
      }),
      q('prompt-response', 2, 'model trace', 'model-trace', ['next token', 'append', 'context', 'runs again'], 'After the model chooses one next response token, what does the next inference step see?', [
        c('v02710-prompt-response-q2-correct', 'The original prompt plus the response so far, including the newly appended token.', 'Insight strengthened. The context grows as generated response tokens are appended.'),
        w('v02710-prompt-response-q2-only-new-token', 'Only the newly chosen token, with the prompt removed.', 'context accumulation vs isolated token', 'context window', 'same-card', 'Tempting because the new token is the most recent event.', 'Not quite. The next step can use the prompt and response-so-far that remain in context.'),
        w('v02710-prompt-response-q2-weight-memory', 'A permanent memory of the token stored in model weights.', 'response-so-far vs weight memory', 'weight', 'nearby-stage', 'Tempting because the model uses the new token later.', 'Close, but using a token later in the run is context, not a weight update.'),
        w('v02710-prompt-response-q2-softmax-removed', 'No context, because softmax disappears after one token.', 'decoding step vs context persistence', 'softmax', 'nearby-stage', 'Tempting because softmax is a later token-choice mechanism.', 'Softmax can help choose a token, but the chosen token can still be appended to the next context.')
      ], {
        whyItHelpsModelThinking: 'The learner traces append-and-repeat rather than reading a definition.',
        badgeMasterySupport: 'Prepares context window and autoregression.'
      }),
      q('prompt-response', 3, 'misconception diagnosis', 'misconception-check', ['response', 'prompt', 'training', 'current run'], 'A generated response improves after the user adds a clarifying sentence. What changed most directly?', [
        c('v02710-prompt-response-q3-correct', 'The current prompt/context changed, so the next response tokens were generated from better input.', 'Good distinction. Better context can improve the current response without training the model.'),
        w('v02710-prompt-response-q3-finetuned', 'The model was fine-tuned by the clarifying sentence.', 'prompt steering vs fine-tuning', 'fine-tuning', 'same-stage', 'Tempting because the answer improves after feedback.', 'Not quite. A clarifying sentence can steer the current run; fine-tuning is additional training.'),
        w('v02710-prompt-response-q3-conscious', 'The model understood its mistake like a person and decided to improve.', 'human revision vs generated behavior', 'llm', 'explicit-confusable', 'Tempting because the interaction resembles human revision.', 'That gives the model too much mind. Better output can come from better context.'),
        w('v02710-prompt-response-q3-no-effect', 'Prompts cannot affect generated response tokens.', 'prompt influence vs fixed weights', 'prompt', 'same-card', 'Tempting because weights stay fixed during inference.', 'Close, but fixed weights still process different prompts into different response probabilities.')
      ], {
        whyItHelpsModelThinking: 'The learner distinguishes current-context improvement from durable model learning.',
        badgeMasterySupport: 'Connects prompt literacy to model mechanics.'
      })
    ]
  },
  {
    stageNumber: 2,
    stageTitle: 'Morning Commute',
    learningCardNumberWithinStage: 3,
    learningCardId: 'tokens',
    learningCardTitle: 'Tokenization',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 3,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Explain tokenization as the split from text into model-readable chunks that may not match human words.',
      secondaryObjectives: [
        'Recognize tokens as words, word pieces, punctuation, spaces, or other chunks.',
        'Avoid treating tokens as permanent memories or concepts.',
        'Connect tokens to token IDs and embeddings.'
      ],
      modelMechanismOrBoundary: 'Tokenization is a representation step before token IDs and embedding lookup; it does not update model weights or guarantee meaning.',
      mythsMisconceptionsToCorrect: [
        'Tokens are always whole words.',
        'Tokens are the same as concepts.',
        'Tokenization stores memory.'
      ],
      relatedGlossaryTerms: ['tokenization', 'tokenizer', 'token', 'prompt token', 'response token', 'token ID', 'embedding'],
      nearbyGlossaryTermsUsefulAsDistractors: ['word', 'memory', 'embedding', 'context window', 'completion'],
      questionCountRationale: 'Three questions cover chunk shape, representation sequence, and the token-versus-meaning misconception.'
    },
    humanReviewSummary: {
      kept: ['Tokens remain model-readable chunks.'],
      revised: ['Expanded beyond one “what can a token be” item.'],
      added: ['Uneven split scenario and token-to-ID bridge.'],
      removed: []
    },
    questions: [
      q('tokens', 1, 'applied scenario', 'application', ['tokenizer', 'token', 'word piece', 'punctuation'], 'A tokenizer splits “startled.” into pieces like “start”, “led”, and “.” What should that tell a learner?', [
        c('v02710-tokens-q1-correct', 'Tokens can be uneven text chunks, including word pieces and punctuation.', 'Good distinction. Tokens are model-readable chunks, not always whole words.'),
        w('v02710-tokens-q1-whole-word', 'Every token must be a complete dictionary word.', 'token vs word', 'token', 'same-card', 'Tempting because many displayed tokens look word-like.', 'Not quite. Tokenizers can split words, punctuation, spaces, or other chunks.'),
        w('v02710-tokens-q1-memory', 'Each token is a permanent memory stored in the model.', 'token vs memory', 'memory', 'author-created misconception', 'Tempting because tokens are reused in later processing.', 'This choice reveals a common mix-up. A token is a representation chunk, not memory by itself.'),
        w('v02710-tokens-q1-concept', 'Each token is exactly one human concept.', 'token chunk vs meaning/concept', 'embedding', 'nearby-stage', 'Tempting because tokens often carry meaning clues.', 'Close, but token boundaries do not perfectly match human concepts or meanings.')
      ], {
        whyItHelpsModelThinking: 'The learner interprets a concrete tokenizer split.',
        badgeMasterySupport: 'Prepares token ID and embedding distinctions.'
      }),
      q('tokens', 2, 'model trace', 'model-trace', ['text', 'tokens', 'token IDs', 'embeddings'], 'Before transformer layers process text, which tokens-to-IDs-to-embeddings path comes first?', [
        c('v02710-tokens-q2-correct', 'Text is split into tokens, tokens map to token IDs, and IDs look up embeddings.', 'Insight strengthened. Tokenization starts the bridge from text to numerical computation.'),
        w('v02710-tokens-q2-raw-english', 'Raw English sentences move through every layer without numerical representation.', 'raw text vs numerical representation', 'tokenization', 'same-card', 'Tempting because users see text at the interface.', 'Not quite. The model needs numerical representations, starting with tokens and IDs.'),
        w('v02710-tokens-q2-weights-first', 'Weights are rewritten before text becomes tokens.', 'tokenization vs training update', 'weight', 'nearby-stage', 'Tempting because weights are central to the model.', 'Close, but tokenization prepares the input; it does not rewrite weights.'),
        w('v02710-tokens-q2-response-first', 'The model generates the finished response before tokenization happens.', 'generation order vs tokenization', 'response', 'same-stage', 'Tempting because users notice the final text first.', 'Generation also uses tokens. Text needs token representation before model layers can process it.')
      ], {
        whyItHelpsModelThinking: 'The learner orders the representation pipeline.',
        badgeMasterySupport: 'Connects tokenization to token IDs and embeddings.'
      }),
      q('tokens', 3, 'boundary distinction', 'boundary', ['prompt tokens', 'response tokens', 'tokenization'], 'Both the user prompt and the generated response eventually appear as text. How does tokenization treat them?', [
        c('v02710-tokens-q3-correct', 'Prompt text and generated response text can both be represented as tokens.', 'Good distinction. Tokenization applies to text entering and leaving the generation loop.'),
        w('v02710-tokens-q3-prompt-only', 'Only prompt text becomes tokens; response text skips token IDs.', 'prompt token vs response token', 'response token', 'same-card', 'Tempting because the user sees the response as text.', 'Not quite. Generated response tokens are token IDs before being displayed as text.'),
        w('v02710-tokens-q3-response-only', 'Only response text becomes tokens; prompts stay as raw English.', 'prompt token vs raw prompt', 'prompt token', 'same-card', 'Tempting because prompts feel natural to humans.', 'Close, but prompts also need token representation before model processing.'),
        w('v02710-tokens-q3-training', 'Tokenizing either one permanently trains the model.', 'tokenization vs training', 'training', 'nearby-stage', 'Tempting because tokenization is a required model step.', 'This choice reveals a common mix-up. Tokenization represents text; it does not update weights.')
      ], {
        whyItHelpsModelThinking: 'The learner connects tokenization to prompt/response distinction.',
        badgeMasterySupport: 'Supports the full day-in-the-life trace.'
      })
    ]
  },
  {
    stageNumber: 2,
    stageTitle: 'Morning Commute',
    learningCardNumberWithinStage: 4,
    learningCardId: 'token-ids',
    learningCardTitle: 'Token IDs',
    previousLiveQuestionCount: 1,
    revisedQuestionCount: 3,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: 'Explain token IDs as lookup numbers that point from token chunks to learned embedding vectors, not meanings by themselves.',
      secondaryObjectives: [
        'Separate token ID from token text and meaning.',
        'Connect token IDs to embedding table lookup.',
        'Recognize generated response tokens as token IDs before display.'
      ],
      modelMechanismOrBoundary: 'A token ID is a stable lookup key in a tokenizer/model setup; using it retrieves embeddings but does not guarantee truth or update weights.',
      mythsMisconceptionsToCorrect: [
        'The ID number is the meaning.',
        'Token IDs store permanent memory.',
        'Token IDs skip embeddings or tensors.'
      ],
      relatedGlossaryTerms: ['token ID', 'token', 'tokenizer', 'embedding table', 'embedding'],
      nearbyGlossaryTermsUsefulAsDistractors: ['memory', 'truth', 'tensor', 'response token', 'vocabulary'],
      questionCountRationale: 'Three questions cover lookup-key mechanics, meaning misconception, and generated-token flow.'
    },
    humanReviewSummary: {
      kept: ['Token IDs remain lookup numbers.'],
      revised: ['Expanded beyond a single embedding lookup question.'],
      added: ['Meaning boundary and response-token ID scenario.'],
      removed: []
    },
    questions: [
      q('token-ids', 1, 'mechanism in action', 'mechanism', ['token ID', 'embedding table', 'lookup'], 'After tokenization, the token “dog” maps to an integer ID. What does the model use that ID for next?', [
        c('v02710-token-ids-q1-correct', 'To look up a learned starting vector in the embedding table.', 'Good distinction. The ID is a lookup key for an embedding vector.'),
        w('v02710-token-ids-q1-meaning', 'To store the complete meaning of dog inside the number itself.', 'ID number vs learned meaning pattern', 'token ID', 'same-card', 'Tempting because the ID consistently points to that token.', 'Not quite. The number itself is not the meaning; it points to learned numerical patterns.'),
        w('v02710-token-ids-q1-memory', 'To permanently remember this user’s sentence.', 'representation vs durable memory', 'memory', 'author-created misconception', 'Tempting because IDs are reusable in model processing.', 'This choice reveals a common mix-up. Token IDs represent chunks; they do not store a user memory.'),
        w('v02710-token-ids-q1-skip', 'To skip embeddings and tensors entirely.', 'token ID vs embedding/tensor pipeline', 'embedding', 'same-card', 'Tempting because the ID is already numeric.', 'Close, but the ID is a lookup key; embeddings and tensors still carry numerical representation forward.')
      ], {
        whyItHelpsModelThinking: 'The learner links token ID to embedding lookup instead of meaning or memory.',
        badgeMasterySupport: 'Prepares embeddings and tensors.'
      }),
      q('token-ids', 2, 'boundary distinction', 'boundary', ['token ID', 'meaning', 'embedding', 'number'], 'A learner says “982 means cat because the ID is the meaning.” What correction is most model-literate?', [
        c('v02710-token-ids-q2-correct', '982 is a lookup number for a token; meaning comes from learned patterns around embeddings and model layers.', 'Insight strengthened. The ID points into the system; it is not understanding by itself.'),
        w('v02710-token-ids-q2-conscious', '982 means cat because the model consciously understands the number.', 'ID/meaning vs consciousness', 'llm', 'explicit-confusable', 'Tempting because the model uses the ID fluently.', 'That gives the model too much mind. A lookup number does not imply conscious understanding.'),
        w('v02710-token-ids-q2-truth', '982 guarantees every sentence about cats will be true.', 'token ID vs truth', 'truth', 'nearby-stage', 'Tempting because the token has a stable identity.', 'Not quite. Token IDs do not guarantee factual output.'),
        w('v02710-token-ids-q2-random-every-run', '982 is randomly redefined every time the user sends a prompt.', 'stable tokenizer mapping vs per-run randomness', 'tokenizer', 'same-card', 'Tempting because sampling can be random later.', 'Close, but token ID mappings are fixed for a tokenizer/model setup; sampling randomness is a different step.')
      ], {
        whyItHelpsModelThinking: 'The learner corrects the ID-is-meaning misconception.',
        badgeMasterySupport: 'Clarifies representation before embeddings.'
      }),
      q('token-ids', 3, 'model trace', 'model-trace', ['generated response token', 'token ID', 'displayed text', 'context'], 'During generation, the model chooses a next response token ID before the user sees text. What happens after that?', [
        c('v02710-token-ids-q3-correct', 'The chosen ID can be displayed as text and appended as a response token in the current context.', 'Good distinction. Generated tokens are IDs before they become visible text.'),
        w('v02710-token-ids-q3-weight-update', 'The chosen ID permanently updates the model weights.', 'generated token vs training update', 'weight', 'nearby-stage', 'Tempting because the token affects the next step.', 'Not quite. The chosen token can affect the next context without changing weights.'),
        w('v02710-token-ids-q3-raw-word', 'The model skips IDs and chooses only raw human words.', 'token IDs vs raw text generation', 'token', 'same-card', 'Tempting because users see words on screen.', 'Close, but the model works with token IDs before text is displayed.'),
        w('v02710-token-ids-q3-retrieve-source', 'The ID retrieves the original training document for that word.', 'token ID lookup vs retrieval/source', 'retrieval', 'nearby-stage', 'Tempting because lookup sounds like fetching a source.', 'This describes retrieval better than token ID lookup. Token IDs point to token representations, not original documents.')
      ], {
        whyItHelpsModelThinking: 'The learner connects token IDs back to response-token generation.',
        badgeMasterySupport: 'Completes the early representation chain.'
      })
    ]
  }
]

function runtimeQuiz(question) {
  const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
  return {
    id: question.questionId,
    question: question.question,
    choices: question.choices.map((choice) => ({ choiceId: choice.choiceId, text: choice.text })),
    answer: correct.text,
    correctChoiceId: question.correctChoiceId,
    explain: correct.feedback,
    feedback: Object.fromEntries(question.choices.map((choice) => [choice.choiceId, choice.feedback]))
  }
}

function runtimeCard(card) {
  return {
    questions: card.questions.map(runtimeQuiz)
  }
}

function cardToMarkdown(card) {
  const questions = card.questions.map((question, index) => {
    const choices = question.choices.map((choice) => [
      `  - ${choice.choiceId}: ${choice.text}${choice.isCorrect ? ' (correct)' : ''}`,
      `    - feedback: ${choice.feedback}`,
      !choice.isCorrect ? `    - misconception: ${choice.representedMisconception}` : '',
      !choice.isCorrect ? `    - term: ${choice.representedGlossaryTerm ?? 'n/a'}` : '',
      !choice.isCorrect ? `    - source: ${choice.distractorSource}; rationale: ${choice.distractorRationale}` : ''
    ].filter(Boolean).join('\n')).join('\n')
    return [
      `### Q${index + 1}: ${question.questionId}`,
      `Type: ${question.type} / ${question.authoringCategory}`,
      `Stem: ${question.question}`,
      `Correct choice: ${question.correctChoiceId}`,
      choices
    ].join('\n\n')
  }).join('\n\n')

  return [
    `## ${card.learningCardTitle}`,
    `Lesson ID: ${card.learningCardId}`,
    `Stage: ${card.stageTitle}`,
    `Questions: ${card.revisedQuestionCount}`,
    `Question-count rationale: ${card.learningObjectiveReview.questionCountRationale}`,
    `Primary objective: ${card.learningObjectiveReview.primaryLearningObjective}`,
    `Key boundary: ${card.learningObjectiveReview.modelMechanismOrBoundary}`,
    questions
  ].join('\n\n')
}

function cardToHtml(card) {
  const questions = card.questions.map((question) => {
    const choices = question.choices.map((choice) => `
      <li class="${choice.isCorrect ? 'correct' : 'wrong'}"><strong>${escapeHtml(choice.choiceId)}</strong>: ${escapeHtml(choice.text)}${choice.isCorrect ? ' <em>Correct</em>' : ''}
        <br><span>Feedback: ${escapeHtml(choice.feedback)}</span>
        ${choice.isCorrect ? '' : `<br><span>Misconception: ${escapeHtml(choice.representedMisconception)} · Term: ${escapeHtml(choice.representedGlossaryTerm ?? 'n/a')} · Source: ${escapeHtml(choice.distractorSource)}</span><br><span>Rationale: ${escapeHtml(choice.distractorRationale)}</span>`}
      </li>`).join('')
    return `
      <article class="question">
        <h4>${escapeHtml(question.questionId)}</h4>
        <p><strong>${escapeHtml(question.type)}</strong> · ${escapeHtml(question.authoringCategory)} · mechanism terms: ${escapeHtml(question.explicitMechanismTerms.join(', '))}</p>
        <p class="stem">${escapeHtml(question.question)}</p>
        <ol>${choices}</ol>
      </article>`
  }).join('')

  return `
    <section class="card">
      <h3>${escapeHtml(card.learningCardTitle)}</h3>
      <p><strong>Lesson ID:</strong> ${escapeHtml(card.learningCardId)} · <strong>Stage:</strong> ${escapeHtml(card.stageTitle)} · <strong>Questions:</strong> ${card.revisedQuestionCount}</p>
      <p><strong>Primary:</strong> ${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</p>
      <p><strong>Boundary:</strong> ${escapeHtml(card.learningObjectiveReview.modelMechanismOrBoundary)}</p>
      <p><strong>Question-count rationale:</strong> ${escapeHtml(card.learningObjectiveReview.questionCountRationale)}</p>
      ${questions}
    </section>`
}

const previousBank = readJson(previousBankPath)
const firstSixCards = previousBank.cards.map((card) => {
  const cleaned = deepCleanHeldOut(card)
  const questionCountRationale = `${cleaned.learningCardTitle} keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.`
  return {
    ...cleaned,
    learningObjectiveReview: {
      ...cleaned.learningObjectiveReview,
      questionCountRationale
    },
    status: 'active-development-pilot',
    cleanupFromV0279: card.learningCardId === 'overfitting-generalization'
      ? [
          'Replaced learner-facing held-out wording with set-aside validation examples / validation examples the model did not train on.',
          'Preserved the approved question logic and distractor structure.'
        ]
      : ['No learner-facing checkpoint logic changes from v0.27.9.']
  }
})

const cards = [...firstSixCards, ...nextSixCards]
const questionCount = cards.reduce((sum, card) => sum + card.questions.length, 0)
const choiceCount = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.length, 0), 0)
const distractorCount = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.filter((choice) => !choice.isCorrect).length, 0), 0)

const bank = {
  version: VERSION,
  status: 'active-development-pilot',
  activeByDefault: true,
  activeBankLabel: ACTIVE_BANK_LABEL,
  legacyFallback: {
    queryParameters: ['?legacyCheckpoints=1', '?checkpointBank=legacy'],
    description: 'Add either query parameter to the app URL to restore the previous single-question checkpoints for development testing.'
  },
  generatedAt: new Date().toISOString(),
  sourceBanks: [
    'docs/journey/checkpoints/checkpoint-question-bank-v0-27-9-first-six-revised.json'
  ],
  preservedArtifacts: [
    'docs/journey/checkpoints/checkpoint-question-bank-v0-27-7-draft.json',
    'docs/journey/checkpoints/checkpoint-question-bank-v0-27-8-model-thinking-pilot.json',
    'docs/journey/checkpoints/checkpoint-question-bank-v0-27-9-first-six-revised.json',
    'src/data/checkpointBankV0279.ts'
  ],
  summary: {
    learningCardsActive: cards.length,
    totalQuestions: questionCount,
    totalChoices: choiceCount,
    totalDistractors: distractorCount,
    firstSixQuestions: firstSixCards.reduce((sum, card) => sum + card.questions.length, 0),
    nextSixQuestions: nextSixCards.reduce((sum, card) => sum + card.questions.length, 0),
    remainingLegacySingleQuestionCards: 27,
    activeLessonIds: ACTIVE_LESSON_IDS,
    activeLessonTitles: cards.map((card) => card.learningCardTitle)
  },
  learnerFacingCleanup: {
    developerNoteRemovedFromNormalUi: true,
    debugOnlyIndicatorAllowed: true,
    heldOutHandling: [
      'Runtime learner-facing copy replaces unexplained held-out with set-aside validation examples, new validation examples, or validation examples the model did not train on.',
      'Identifier-level strings may preserve heldout/held-out only for CSS/storage compatibility and are not learner-facing.'
    ]
  },
  qualityChecklist: {
    noVagueBestDefinitionStems: true,
    questionsNameMechanismOrScenario: true,
    everyQuestionHasFourChoices: true,
    everyQuestionHasExactlyOneCorrectAnswer: true,
    everyWrongAnswerHasFeedback: true,
    feedbackMapsByStableChoiceId: true,
    choiceOrderRandomizedInRuntime: true,
    wrongAnswersDoNotRevealCorrectAnswer: true,
    normalUiHasNoDeveloperFallbackNotes: true,
    learnerFacingHeldOutRemovedOrDefined: true
  },
  cards
}

fs.mkdirSync(checkpointDir, { recursive: true })
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)

const markdown = [
  '# Prompt Life v0.27.10 First-Twelve Active Development Checkpoint Bank',
  '',
  `Version: ${VERSION}`,
  `Active bank: ${ACTIVE_BANK_LABEL}`,
  `Cards active: ${cards.length}`,
  `Questions: ${questionCount}`,
  `Choices: ${choiceCount}`,
  `Wrong-answer distractors: ${distractorCount}`,
  '',
  'Legacy fallback remains available with `?legacyCheckpoints=1` or `?checkpointBank=legacy`.',
  '',
  ...cards.map(cardToMarkdown)
].join('\n\n')
fs.writeFileSync(outputMdPath, `${markdown}\n`)

const runtimeObject = Object.fromEntries(cards.map((card) => [card.learningCardId, runtimeCard(card)]))
const source = `// Generated by scripts/generate-checkpoint-live-pilot-v02710.mjs.\n// This active-development bank overrides only the first twelve Journey checkpoints.\n\nexport const ACTIVE_CHECKPOINT_BANK = '${ACTIVE_BANK_LABEL}'\n\nexport const FIRST_TWELVE_CHECKPOINT_BANK_V02710 = ${JSON.stringify(runtimeObject, null, 2)} as const\n\nexport type CheckpointBankLessonId = keyof typeof FIRST_TWELVE_CHECKPOINT_BANK_V02710\n\nexport function hasV02710CheckpointBank(lessonId: string): lessonId is CheckpointBankLessonId {\n  return Object.prototype.hasOwnProperty.call(FIRST_TWELVE_CHECKPOINT_BANK_V02710, lessonId)\n}\n`
fs.writeFileSync(sourcePath, source)

const cardCountRows = cards.map((card) => `<tr><td>${escapeHtml(card.learningCardTitle)}</td><td>${card.revisedQuestionCount}</td><td>${escapeHtml(card.learningObjectiveReview.questionCountRationale)}</td></tr>`).join('')
const reportHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.27.10 First-Twelve Checkpoint Authoring Report</title>
  <style>
    body { font-family: Inter, system-ui, sans-serif; margin: 2rem; color: #07124a; line-height: 1.5; }
    h1, h2, h3, h4 { color: #101a78; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #d9e2f3; padding: 0.55rem; vertical-align: top; }
    th { background: #eef7f8; text-align: left; }
    .card, .question { border: 1px solid #d9e2f3; border-radius: 8px; padding: 1rem; margin: 1rem 0; background: #fff; }
    .correct { background: #effffd; }
    .wrong { background: #fff8ef; }
    li { margin: 0.45rem 0; padding: 0.4rem; border-radius: 6px; }
    code { background: #eef3ff; padding: 0.1rem 0.25rem; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.27.10 First-Twelve Checkpoint Authoring Report</h1>
  <h2>Executive summary</h2>
  <ul>
    <li>Version: ${VERSION}</li>
    <li>Active bank: ${ACTIVE_BANK_LABEL}</li>
    <li>First 12 Journey learning cards active by default; remaining 27 keep legacy single-question checkpoints.</li>
    <li>Total active-development questions: ${questionCount}; choices: ${choiceCount}; distractors: ${distractorCount}.</li>
    <li>Normal learner UI must not show developer/fallback notes.</li>
    <li>Held-out wording is replaced in active learner-facing copy.</li>
    <li>Scroll behavior is repaired in runtime code for Next question and Next learning card.</li>
  </ul>
  <h2>Learner-facing copy cleanup</h2>
  <ul>
    <li>Removed normal learner UI note that mentioned development testing and legacy fallback parameters.</li>
    <li>Replaced active-bank held-out wording with set-aside validation examples, new validation examples, or validation examples the model did not train on.</li>
    <li>Legacy fallback instructions remain in README/docs/report only.</li>
  </ul>
  <h2>Scroll behavior implementation</h2>
  <p>Runtime uses refs and requestAnimationFrame-timed scrolling. New learning cards scroll the app shell to the top/title area. Next question sets a pending scroll target and scrolls the checkpoint panel after the DOM updates. Reduced motion uses instant scrolling.</p>
  <h2>First-six cleanup from v0.27.9</h2>
  <p>The first-six logic is preserved. Overfitting and Generalization replaces unexplained held-out wording. Normal learner UI no longer shows a development-pilot note.</p>
  <h2>Question counts</h2>
  <table><thead><tr><th>Learning card</th><th>Questions</th><th>Rationale</th></tr></thead><tbody>${cardCountRows}</tbody></table>
  <h2>Next-six authoring details</h2>
  ${nextSixCards.map(cardToHtml).join('')}
  <h2>Quality checklist</h2>
  <ul>
    <li>No vague “best definition” stems.</li>
    <li>Questions name the mechanism/scenario explicitly.</li>
    <li>Every question has 4 choices and exactly 1 correct answer.</li>
    <li>Every wrong answer has feedback, misconception, source, and rationale.</li>
    <li>Feedback maps by stable choiceId.</li>
    <li>Runtime randomizes choice order and preserves no-reveal wrong answers.</li>
    <li>Normal UI has no developer/fallback notes.</li>
    <li>Learner-facing held-out wording is replaced or defined.</li>
  </ul>
  <h2>Deep Research handoff</h2>
  <blockquote>Review the Prompt Life v0.27.10 first-twelve checkpoint bank. Focus especially on the newly authored next-six learning cards. Evaluate whether each question makes the learner reason about the model rather than recall the curriculum. Check clarity, factual accuracy, distractor quality, misconception feedback, reading level, jargon, and badge-worthiness. Recommend edits, removals, and additions.</blockquote>
</body>
</html>`
fs.writeFileSync(outputHtmlPath, reportHtml)

console.log(`Generated ${cards.length} active card entries.`)
console.log(`Questions: ${questionCount}`)
console.log(`Choices: ${choiceCount}`)
console.log(`Distractors: ${distractorCount}`)
console.log(`JSON: ${outputJsonPath}`)
console.log(`Runtime: ${sourcePath}`)
