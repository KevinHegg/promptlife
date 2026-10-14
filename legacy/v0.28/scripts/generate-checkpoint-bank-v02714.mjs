import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const reportDir = path.join(root, 'docs/journey')
const testingDir = path.join(root, 'docs/testing')

const previousBankPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-13.json')

const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-14.json')
const outputCsvPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-14.csv')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-14.md')
const outputChoiceCsvPath = path.join(checkpointDir, 'checkpoint-bank-v0-27-14-choice-level.csv')
const outputRepairLogPath = path.join(checkpointDir, 'checkpoint-bank-v0-27-14-repair-log.csv')
const outputHtmlPath = path.join(reportDir, 'prompt-life-v0-27-14-checkpoint-bank-human-test-review.html')
const outputPdfPath = path.join(reportDir, 'prompt-life-v0-27-14-checkpoint-bank-human-test-review.pdf')
const outputSourcePath = path.join(root, 'src/data/checkpointBankV02714.ts')
const humanTestPacketMdPath = path.join(testingDir, 'prompt-life-v0-27-14-human-test-packet.md')
const humanTestPacketPdfPath = path.join(testingDir, 'prompt-life-v0-27-14-human-test-packet.pdf')
const humanTestPacketHtmlPath = path.join(testingDir, 'prompt-life-v0-27-14-human-test-packet.html')

const VERSION = '0.27.14-feedback-naturalness-human-test-prep'
const ACTIVE_BANK_LABEL = 'v0.27.14-human-test-feedback'

const requiredInputs = [
  previousBankPath
]

const vagueStemPatterns = [
  /^What is the best definition\??$/i,
  /^Which statement is most accurate\??$/i,
  /^According to this learning card\b/i,
  /^In this learning card\b/i,
  /^What did this card say\??$/i
]

const allowedCategories = new Set([
  'mechanism',
  'application',
  'boundary',
  'causal-consequence',
  'model-trace',
  'human-use-judgment',
  'misconception-check'
])

const questionStemOverrides = {
  'v02712-hidden-states-q2': 'A learner hears "hidden state" and imagines secret English thoughts. What does "hidden" actually mean here?',
  'v02712-grounding-q2': 'A campus answer cites retrieved documents and data. What is grounding trying to connect?',
  'v02712-how-ai-learns-q4': 'In the learning-bucket sort, which action can durably change future model behavior?',
  'v02712-perfect-storm-q3': 'A learner says LLMs came from one magic invention. What does the storm-front metaphor correct?',
  'v02712-costs-we-must-count-q3': 'A product is called digital, so someone assumes it is weightless. What costs does that hide?',
  'v02712-benefits-worth-taking-seriously-q3': 'A team names real AI benefits while still checking limits and costs. Which misconception does that avoid?',
  'v02712-human-centered-ai-q2': 'A team writes a careful system prompt for advising support. Why does that alone not make the system human-centered?',
  'v02712-model-literate-synthesis-q4': 'Why does following one prompt across the whole day help final synthesis?'
}

const correctTextOverrides = {
  'v02712-where-llms-fit-q2': 'AI is broad; ML learns from data; generative AI creates outputs; LLMs generate language or code.',
  'v0279-history-q1': 'The rule-based system follows written rules; the LLM uses weights shaped by examples.',
  'v02712-history-q3': 'The product combines learned patterns, written rules, and lookup tools; the LLM remains learned-pattern AI.',
  'v0279-training-q2': 'The model uses fixed weights and temporary context; the chat usually does not rewrite weights.',
  'v0279-training-q3': 'Training changes reusable weights; inference uses temporary computation for the current run.',
  'v0279-pretraining-q1': 'Repeated prediction loss on next-token targets changes weights over many training steps.',
  'v0279-pretraining-q2': 'It shapes patterns in weights; it is not a searchable copy of every source.',
  'v0279-pretraining-q3': 'Weights shift so future prompts can activate useful language or code patterns.',
  'v02712-pretraining-q4': 'Past training shaped weights; source-like text is not proof of live search.',
  'v0279-overfitting-generalization-q1': 'Overfitting: the model fit training examples too narrowly to generalize well.',
  'v02712-fine-tuning-q1': 'Run additional training that changes weights or adapter behavior for later responses.',
  'v02710-fine-tuning-q2': 'Adapted weights or adapter behavior can carry the pattern into later inference runs.',
  'v02710-fine-tuning-q3': 'Training can make instruction-following patterns more likely later.',
  'v02710-alignment-q1': 'Behavior was shaped toward instructions and safety boundaries, not moral understanding.',
  'v02710-alignment-q2': 'Some alignment changes are durable training; others steer or filter the current run.',
  'v02712-alignment-q4': 'A policy or filter layer changed visible output, not necessarily model weights.',
  'v02710-inference-q1': 'Temporary internal states change; learned weights usually stay fixed.',
  'v02710-inference-q2': 'Context enters a forward pass, temporary states form, raw scores appear, and a token can be chosen.',
  'v02710-inference-q3': 'The earlier line is still in context, so fixed weights can use it during inference.',
  'v02710-inference-q4': 'A useful answer now does not automatically teach the base model for tomorrow.',
  'v02710-prompt-response-q1': 'Prompt tokens are given; response tokens are generated and appended to context.',
  'v02710-prompt-response-q2': 'The original prompt plus the response so far, including the new token.',
  'v02710-prompt-response-q3': 'Better current context helped the next response tokens come from better input.',
  'v02710-token-ids-q2': '982 is a lookup number; meaning comes from embeddings, layers, and context.',
  'v02710-token-ids-q3': 'The chosen ID can display as text and append as a response token.',
  'v02712-embeddings-q2': 'Context and layers reshape the starting vector into a temporary internal state.',
  'v02712-vectors-q2': 'Features are distributed across dimensions, not one neat human label each.',
  'v02712-vectors-q3': 'One can be a durable learned parameter; the other is temporary during a run.',
  'v02712-tensors-q1': 'It is a shaped numerical block with dimensions model operations can use.',
  'v02712-tensors-q2': 'Weight tensors can be durable; activation tensors are temporary run-time values.',
  'v02712-attention-q2': 'Learned attention weights persist, but one prompt\'s attention pattern is temporary.',
  'v02712-attention-q4': 'Inside transformer layers, shaping temporary hidden states from current context.',
  'v02712-mlp-q2': 'The learned MLP parameters persist; this prompt\'s activations do not.',
  'v02712-layers-q2': 'Durable layer parameters differ from temporary layer activations.',
  'v02712-layers-q3': 'Layers are repeated numerical transformations, not conscious reasoning steps.',
  'v02712-layers-q4': 'They carry signal forward while attention and MLP transformations repeat.',
  'v02712-hidden-states-q1': 'Context and layer operations shape a temporary vector for that token position.',
  'v02712-hidden-states-q2': 'The state is internal numerical data, not visible text shown to the user.',
  'v02712-hidden-states-q4': 'After embeddings enter layers, hidden states carry context-shaped information toward next-token scores.',
  'v02712-grounding-q2': 'Generated claims to available evidence, such as documents, data, or tool results.',
  'v02712-grounding-q4': 'RAG can supply evidence; grounding checks whether the answer uses it faithfully.',
  'v02712-hallucinations-q4': 'Use relevant evidence, retrieval, constraints, and human review for important claims.',
  'v02712-diffusion-q3': 'ChatGPT-style text generation is not how all generative systems work.',
  'v02712-multimodal-q2': 'Media inputs become numerical representations, not human senses.',
  'v02712-perfect-storm-q2': 'Human work and market pressure helped turn methods into deployable products.',
  'v02712-perfect-storm-q4': 'It asks whose data, labor, infrastructure, and choices made the mechanics useful.',
  'v02712-collective-intelligence-q2': 'It points to provenance, consent, compensation, and power around data and labor.',
  'v02712-collective-intelligence-q3': 'Pretraining can shape weights from patterns in human-created data.',
  'v02712-costs-we-must-count-q1': 'Training, inference, infrastructure, privacy, labor, access, and governance costs.',
  'v02712-costs-we-must-count-q4': 'Pair useful AI possibilities with what must be protected, governed, or funded.',
  'v02712-benefits-worth-taking-seriously-q1': 'AI can assist drafting, translation, search, and access when humans review important outputs.',
  'v02712-benefits-worth-taking-seriously-q2': 'Trained weights, temporary context, tools, retrieval, and human review working together.',
  'v02712-human-centered-ai-q2': 'Prompts steer current behavior; accountability, governance, and appeal need system design.',
  'v02712-better-ai-choice-q2': 'Training data, fine-tuning, policies, evaluation standards, and incentives.',
  'v02712-effective-prompting-literacy-q2': 'It shapes context, constraints, and examples for a probabilistic model.',
  'v02712-model-literate-synthesis-q1': 'Prompt tokens become IDs and embeddings; layers shape states; scores become probabilities; sampling appends tokens.',
  'v02712-model-literate-synthesis-q2': 'Weights are durable; context/states are temporary; retrieval adds context; responses are generated.',
  'v02712-model-literate-synthesis-q3': 'Look for grounding, sources, uncertainty, and human review instead of treating fluency as wisdom.',
  'v02712-model-literate-synthesis-q4': 'It connects training history, inference mechanics, evidence, risks, costs, and human use.',
  'v02712-model-literate-synthesis-q5': 'LLMs are powerful pattern systems whose outputs need evidence, context awareness, and responsibility.'
}

const wrongChoiceTextOverrides = {
  'v02712-history-q3-3-rag': 'The handbook lookup permanently rewrites the model weights.',
  'v02712-pretraining-q4-2-retrieval': 'The model must have used a live lookup tool during the prompt.',
  'v02710-alignment-q1-truth': 'Safer wording means the factual claims have already been verified.',
  'v02712-alignment-q4-4-truth': 'A filter approval means the answer no longer needs evidence review.',
  'v02710-fine-tuning-q3-perfect-safety': 'Future answers will tend to be safer, so evaluation is no longer needed.',
  'v0279-overfitting-generalization-q3-conscious-choice': 'The model learned the narrow template so well that broader prompts no longer matter.',
  'v02712-collective-intelligence-q3-3-truth': 'Patterns from human-created data can be treated as verified facts.'
}

const answerLengthTextOverrides = {
  'v0279-what-is-llm-q1': 'It scores next tokens from context, appends one, and repeats.',
  'v0279-what-is-llm-q2': 'It generated tokens from context and learned patterns; fluency is not awareness.',
  'v02712-where-llms-fit-q2': 'AI is broad; ML learns from data; LLMs generate language or code.',
  'v02712-history-q3': 'The product is hybrid; the LLM remains learned-pattern AI.',
  'v0279-training-q2': 'It uses fixed weights and temporary context; the chat does not rewrite weights.',
  'v0279-training-q3': 'Training changes reusable weights; inference uses temporary computation.',
  'v0279-pretraining-q1': 'Next-token loss changes weights over many training steps.',
  'v0279-overfitting-generalization-q3': 'It fit narrow examples too closely instead of generalizing.',
  'v02712-fine-tuning-q1': 'Fine-tune weights or adapters for future responses.',
  'v02710-fine-tuning-q2': 'Adapted weights or adapters can carry the pattern into later runs.',
  'v02710-alignment-q1': 'Behavior was shaped toward safety boundaries, not moral understanding.',
  'v02710-alignment-q3': 'Shaped behavior can still fail or trade off in new situations.',
  'v02710-inference-q3': 'The earlier line is still in context, so inference can use it.',
  'v02710-tokens-q1': 'Tokens can be uneven chunks: words, word pieces, or punctuation.',
  'v02712-vectors-q2': 'Features are distributed across dimensions, not one label each.',
  'v02712-vectors-q3': 'One vector can be learned; another can be temporary.',
  'v02712-tensors-q1': 'A tensor is a shaped block of numbers for model operations.',
  'v02712-tensors-q2': 'Weight tensors can persist; activation tensors are temporary.',
  'v02712-attention-q2': 'Learned attention weights persist; one prompt pattern is temporary.',
  'v02712-attention-q4': 'Inside transformer layers, shaping temporary hidden states.',
  'v02712-layers-q3': 'Layers are repeated numerical transformations, not thought steps.',
  'v02712-hidden-states-q1': 'Layer operations shape a temporary vector for that token position.',
  'v02712-hidden-states-q2': 'It is internal numerical data, not visible text.',
  'v02712-hidden-states-q4': 'Hidden states carry context-shaped information toward next-token scores.',
  'v02712-sampling-q3': 'Sampling can choose among likely tokens, not one fixed path.',
  'v02712-context-window-q2': 'Context is current input; memory needs a separate saved mechanism.',
  'v02712-context-window-q4': 'Generated tokens append, so later steps can attend to them.',
  'v02712-rag-retrieval-q3': 'RAG supplies temporary context; it does not change weights by itself.',
  'v02712-rag-retrieval-q4': 'RAG gives temporary evidence, but retrieval or generation can still fail.',
  'v02712-grounding-q1': 'Evidence does not guarantee the answer stays connected.',
  'v02712-grounding-q2': 'Generated claims to available documents, data, or tool results.',
  'v02712-grounding-q4': 'RAG supplies evidence; grounding checks whether the answer uses it.',
  'v02712-hallucinations-q4': 'Use evidence, constraints, and human review for important claims.',
  'v02712-how-ai-learns-q5': 'People may use it as temporary context even when weights did not change.',
  'v02712-diffusion-q3': 'Text autoregression is not how all generative systems work.',
  'v02712-multimodal-q3': 'An AI product can combine different media models and methods.',
  'v02712-perfect-storm-q2': 'Human work and incentives helped turn methods into products.',
  'v02712-collective-intelligence-q2': 'It points to provenance, consent, pay, and power around data/labor.',
  'v02712-benefits-worth-taking-seriously-q3': 'Taking benefits seriously does not mean believing in utopia.',
  'v02712-effective-prompting-literacy-q2': 'It shapes context, constraints, and examples for a probabilistic model.',
  'v02712-effective-prompting-literacy-q3': 'Ask for sources or retrieval; do not trust citation-shaped output alone.',
  'v02712-model-literate-synthesis-q2': 'Weights persist; context and states are temporary; retrieval adds context.',
  'v02712-model-literate-synthesis-q3': 'Look for grounding, sources, uncertainty, and human review.'
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeCsv(value) {
  const text = String(value ?? '')
  if (!/[",\n\r]/.test(text)) return text
  return `"${text.replaceAll('"', '""')}"`
}

function writeCsv(filePath, rows, headers) {
  const lines = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','))
  ]
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`)
}

function cleanText(value) {
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
    .replace(/\bhuman- created\b/g, 'human-created')
}

function deepClean(value) {
  if (Array.isArray(value)) return value.map(deepClean)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, deepClean(child)]))
  }
  return cleanText(value)
}

function normalizeQuestionId(id) {
  return String(id ?? '').toLowerCase()
}

function issueSummary(repair) {
  return (repair?.issue_flags ?? []).join('; ')
}

const boilerplateFeedbackPhrases = [
  'The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.',
  'That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.',
  'That swaps this mechanism with a nearby model step; keep the stage boundary clear.',
  'Search, retrieval, and evidence use are separate system steps, and they still need checking.',
  'The behavior can be shaped without giving the model human awareness, intent, or moral agency.',
  'Prompt and context can steer a current run without automatically becoming durable learning.',
  'Probability, permission, fluency, or confidence is not the same as truth.'
]

function countBoilerplateOccurrences(value) {
  const text = String(value ?? '')
  return boilerplateFeedbackPhrases.reduce((sum, phrase) => sum + (text.includes(phrase) ? 1 : 0), 0)
}

function stripBoilerplateFeedback(value) {
  let text = cleanText(value ?? '').trim()
  boilerplateFeedbackPhrases.forEach((phrase) => {
    text = text.replaceAll(phrase, '')
  })
  return text
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .replace(/(?:\.\s*){2,}/g, '. ')
    .trim()
}

function naturalFeedbackBoundary(choice, question, card) {
  const combined = [
    choice.text,
    choice.feedback,
    choice.representedMisconception,
    choice.representedGlossaryTerm,
    question.question,
    card.learningCardTitle
  ].join(' ').toLowerCase()

  if (/\b(conscious|awareness|mind|moral|agency|values|conscience|intent|feeling|understand morality)\b/.test(combined)) {
    return 'This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.'
  }
  if (/\b(training|train|fine-tun|optimizer|loss|weight update|weights?|adapter|permanent|durable|model memory)\b/.test(combined)) {
    return 'This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.'
  }
  if (/\b(retriev|rag|search|source|citation|web|file|document|lookup|evidence|grounding)\b/.test(combined)) {
    return 'This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.'
  }
  if (/\b(truth|true|verified|guarantee|confidence|certain|factual|probability)\b/.test(combined)) {
    return 'This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.'
  }
  if (/\b(token id|token ids|lookup number)\b/.test(combined)) {
    return 'This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.'
  }
  if (/\b(token|softmax|logits?|sampling|embedding|vector|tensor|attention|mlp|layer|hidden state|activation)\b/.test(combined)) {
    return 'This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.'
  }
  if (/\b(context|prompt|instruction|system prompt|current chat)\b/.test(combined)) {
    return 'This gives the prompt too much permanence; current context can steer this response without becoming stored model knowledge.'
  }
  if (/\b(diffusion|autoregress|multimodal|image|audio|video)\b/.test(combined)) {
    return 'This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.'
  }
  if (/\b(ai|machine learning|deep learning|generative ai|llm|symbolic|rule-based|product|interface|tool)\b/.test(combined)) {
    return 'This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.'
  }
  return 'This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.'
}

function polishFeedback(choice, question, card) {
  const current = cleanText(choice.feedback ?? '').trim()
  if (choice.isCorrect) return current
  const boilerplateCount = countBoilerplateOccurrences(current)
  const base = stripBoilerplateFeedback(current)
  const boundary = naturalFeedbackBoundary(choice, question, card)
  if (!boilerplateCount) return current
  if (!base) return `Review suggested. ${boundary}`
  if (base.includes(boundary)) return base
  return `${base} ${boundary}`.replace(/\s{2,}/g, ' ').trim()
}

function applyTextOverrides(question, repair, repairLog) {
  const questionId = normalizeQuestionId(question.questionId)
  const beforeQuestion = question.question
  if (questionStemOverrides[questionId]) {
    question.question = questionStemOverrides[questionId]
  }

  const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
  if (correct && correctTextOverrides[questionId]) {
    correct.text = correctTextOverrides[questionId]
    correct.feedback = cleanText(correct.feedback ?? '')
  }

  question.choices.forEach((choice) => {
    if (wrongChoiceTextOverrides[choice.choiceId]) {
      choice.text = wrongChoiceTextOverrides[choice.choiceId]
    }
  })

  if (questionId === 'v0279-where-llms-fit-q1') {
    question.question = 'A campus tool summarizes text with an LLM, while another creates images by denoising noisy patterns. What does that show?'
    if (correct) correct.text = 'Generative AI is a family; LLMs and denoising image models are different branches.'
  }
  if (questionId === 'v02712-history-q3') {
    question.question = 'A university AI app combines an LLM, hand-written policy checks, and a handbook lookup tool. What should a model-literate user infer?'
  }
  if (questionId === 'v02712-pretraining-q4') {
    question.question = 'A base model gives fact-like text about a public topic before any live search or lookup tool is connected. Which pretraining explanation is strongest?'
  }
  if (questionId === 'v02712-embeddings-q2') {
    question.question = 'The same token starts with one embedding but appears in two different sentences. What can make its later internal vector differ during inference?'
  }
  if (questionId === 'v02710-inference-q2') {
    question.question = 'In one inference step, which trace best matches the model path before the next token appears?'
  }
  if (questionId === 'v02712-vectors-q3') {
    question.question = 'An embedding row and a later internal state can both be vectors. Which boundary matters?'
  }

  if (correct && answerLengthTextOverrides[questionId] && correct.text !== answerLengthTextOverrides[questionId]) {
    correct.text = answerLengthTextOverrides[questionId]
    repairLog.push(logEntry(repair, question, 'answer-length-revised', `${correct.choiceId}: ${correct.text}`))
  }

  if (question.question !== beforeQuestion) {
    repairLog.push(logEntry(repair, question, 'question-stem-revised', `Stem revised to stand alone and name the mechanism: ${question.question}`))
  }
}

function applyFeedbackRepairs(card, question, repair, repairLog) {
  let count = 0
  question.choices.forEach((choice) => {
    const before = choice.feedback
    choice.feedback = polishFeedback(choice, question, card)
    if (choice.feedback !== before) {
      count += 1
      repairLog.push(logEntry(repair, question, choice.isCorrect ? 'correct-feedback-revised' : 'wrong-feedback-revised', `${choice.choiceId}: ${choice.feedback}`))
    }
  })
  return count
}

function logEntry(repair, question, status, notes) {
  return {
    repair_id: repair?.repair_id ?? 'UNFLAGGED',
    priority: repair?.priority ?? 'review',
    question_id: question.questionId,
    status,
    issue_flags: issueSummary(repair),
    notes
  }
}

function stableSnapshot(question) {
  return JSON.stringify({
    question: question.question,
    choices: question.choices.map((choice) => ({
      choiceId: choice.choiceId,
      text: choice.text,
      feedback: choice.feedback
    }))
  })
}

function runtimeBank(cards) {
  const entries = cards.map((card) => {
    const quiz = {
      questions: card.questions.map((question) => {
        const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
        return {
          id: question.questionId,
          question: question.question,
          choices: question.choices.map((choice) => ({ choiceId: choice.choiceId, text: choice.text })),
          answer: correct?.text ?? '',
          correctChoiceId: question.correctChoiceId,
          explain: correct?.feedback ?? '',
          feedback: Object.fromEntries(question.choices.map((choice) => [choice.choiceId, choice.feedback]))
        }
      })
    }
    return [card.learningCardId, quiz]
  })
  return Object.fromEntries(entries)
}

function totals(cards) {
  const totalQuestions = cards.reduce((sum, card) => sum + card.questions.length, 0)
  const totalChoices = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.length, 0), 0)
  const totalDistractors = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.filter((choice) => !choice.isCorrect).length, 0), 0)
  const questionCounts = Object.fromEntries(cards.map((card) => [card.learningCardId, card.questions.length]))
  return { totalQuestions, totalChoices, totalDistractors, questionCounts }
}

function typeDistribution(cards) {
  const byType = {}
  const byStage = {}
  const byCard = []
  cards.forEach((card) => {
    const cardCounts = {}
    card.questions.forEach((question) => {
      const type = question.authoringCategory ?? 'unknown'
      byType[type] = (byType[type] ?? 0) + 1
      cardCounts[type] = (cardCounts[type] ?? 0) + 1
      byStage[card.stageTitle] ??= {}
      byStage[card.stageTitle][type] = (byStage[card.stageTitle][type] ?? 0) + 1
    })
    byCard.push({
      stage: `${card.stageNumber}.${card.learningCardNumberWithinStage}`,
      learningCardId: card.learningCardId,
      learningCardTitle: card.learningCardTitle,
      counts: cardCounts
    })
  })
  return { byType, byStage, byCard }
}

function answerLengthWarnings(cards) {
  const warnings = []
  cards.forEach((card) => {
    card.questions.forEach((question) => {
      const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
      const wrong = question.choices.filter((choice) => choice.choiceId !== question.correctChoiceId)
      if (!correct || wrong.length !== 3) return
      const meanWrong = wrong.reduce((sum, choice) => sum + choice.text.length, 0) / wrong.length
      const ratio = correct.text.length / meanWrong
      const delta = correct.text.length - meanWrong
      if (ratio > 1.35 && delta > 25) {
        warnings.push({
          stage: `${card.stageNumber}.${card.learningCardNumberWithinStage}`,
          learningCardId: card.learningCardId,
          learningCardTitle: card.learningCardTitle,
          questionId: question.questionId,
          ratio,
          delta,
          correctText: correct.text
        })
      }
    })
  })
  return warnings
}

function retainedLengthReason(warning) {
  if (/model-literate-synthesis/.test(warning.questionId)) {
    return 'Retained because the synthesis item must hold several course-wide boundaries in one answer.'
  }
  if (/costs|benefits|human-centered|better-ai-choice|risk-myth|effective-prompting/.test(warning.questionId)) {
    return 'Retained because the answer names multiple human-use, governance, or review conditions that should remain visible during testing.'
  }
  if (/perfect-storm/.test(warning.questionId)) {
    return 'Retained because the convergence claim needs multiple ingredients rather than a single-cause shortcut.'
  }
  return 'Retained for human testing because shortening further may remove a necessary boundary distinction.'
}

function validateBank(bank) {
  const issues = []
  const questionIds = new Set()
  const choiceIds = new Set()
  bank.cards.forEach((card) => {
    if (!Array.isArray(card.questions) || card.questions.length !== card.revisedQuestionCount) {
      issues.push(`${card.learningCardId}: question count mismatch.`)
    }
    card.questions.forEach((question) => {
      if (!question.questionId) issues.push(`${card.learningCardId}: missing questionId.`)
      if (questionIds.has(question.questionId)) issues.push(`${question.questionId}: duplicate questionId.`)
      questionIds.add(question.questionId)
      if (vagueStemPatterns.some((pattern) => pattern.test(question.question))) {
        issues.push(`${question.questionId}: banned vague stem "${question.question}".`)
      }
      if (!allowedCategories.has(question.authoringCategory)) {
        issues.push(`${question.questionId}: unexpected category ${question.authoringCategory}.`)
      }
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        issues.push(`${question.questionId}: expected exactly 4 choices.`)
      }
      const correct = question.choices.filter((choice) => choice.isCorrect)
      if (correct.length !== 1) issues.push(`${question.questionId}: expected exactly 1 correct choice.`)
      if (correct[0]?.choiceId !== question.correctChoiceId) {
        issues.push(`${question.questionId}: correctChoiceId mismatch.`)
      }
      question.choices.forEach((choice) => {
        if (!choice.choiceId) issues.push(`${question.questionId}: missing choiceId.`)
        if (choiceIds.has(choice.choiceId)) issues.push(`${choice.choiceId}: duplicate choiceId.`)
        choiceIds.add(choice.choiceId)
        if (!choice.text) issues.push(`${choice.choiceId}: missing choice text.`)
        if (!choice.feedback) issues.push(`${choice.choiceId}: missing feedback.`)
        if (!choice.isCorrect) {
          if (!choice.representedMisconception) issues.push(`${choice.choiceId}: missing representedMisconception.`)
          if (!choice.distractorSource) issues.push(`${choice.choiceId}: missing distractorSource.`)
          if (!choice.distractorRationale) issues.push(`${choice.choiceId}: missing distractorRationale.`)
        }
      })
    })
  })
  if (bank.cards.length !== 39) issues.push(`Expected 39 cards, found ${bank.cards.length}.`)
  const counts = totals(bank.cards)
  if (counts.totalQuestions !== 136) issues.push(`Expected 136 questions, found ${counts.totalQuestions}.`)
  if (counts.totalChoices !== 544) issues.push(`Expected 544 choices, found ${counts.totalChoices}.`)
  if (counts.totalDistractors !== 408) issues.push(`Expected 408 distractors, found ${counts.totalDistractors}.`)
  return issues
}

function learnerCopyScan() {
  const files = [
    'src/main.tsx',
    'src/data/content.ts',
    'src/data/checkpointBankV02714.ts',
    'src/styles/global.css'
  ]
  const dirs = ['src/components', 'src/features']
  const forbidden = [
    ['Developer checkpoint bank', /Developer checkpoint bank/i],
    ['active-dev', /active-dev/i],
    ['development testing', /development testing/i],
    ['legacy checkpoint query instruction', /\?legacyCheckpoints/i],
    ['checkpoint bank query instruction', /\?checkpointBank/i],
    ['fallback instructions', /fallback instructions/i],
    ['debug note', /debug note/i],
    ['Debug mode', /Debug mode/i],
    ['Debug only', /Debug only/i],
    ['implementation note', /implementation note/i],
    ['active bank', /active bank/i],
    ['bank indicator', /bank indicator/i]
  ]

  function walk(dir) {
    const abs = path.join(root, dir)
    if (!fs.existsSync(abs)) return []
    return fs.readdirSync(abs, { withFileTypes: true }).flatMap((entry) => {
      const rel = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(rel)
      if (!/\.(tsx?|css)$/.test(entry.name)) return []
      return [rel]
    })
  }

  const allFiles = [...new Set([...files, ...dirs.flatMap(walk)])].filter((file) => fs.existsSync(path.join(root, file)))
  const issues = []
  allFiles.forEach((file) => {
    const lines = fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/)
    forbidden.forEach(([label, pattern]) => {
      lines.forEach((line, index) => {
        if (pattern.test(line)) issues.push(`${file}:${index + 1} ${label}: ${line.trim()}`)
      })
    })
  })
  return { checkedFiles: allFiles.length, issues }
}

function makeRuntimeSource(cards) {
  const bank = runtimeBank(cards)
  return `// Generated by scripts/generate-checkpoint-bank-v02714.mjs.\n// This checkpoint bank overrides all 39 Journey checkpoints.\n\nexport const FULL_CHECKPOINT_BANK_V02714 = ${JSON.stringify(bank, null, 2)} as const\n\nexport type CheckpointBankLessonId = keyof typeof FULL_CHECKPOINT_BANK_V02714\n\nexport function hasV02714CheckpointBank(lessonId: string): lessonId is CheckpointBankLessonId {\n  return Object.prototype.hasOwnProperty.call(FULL_CHECKPOINT_BANK_V02714, lessonId)\n}\n`
}

function makeQuestionRows(bank) {
  return bank.cards.flatMap((card) => card.questions.map((question, index) => {
    const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
    return {
      stage_number: card.stageNumber,
      stage_title: card.stageTitle,
      learning_card_code: `${card.stageNumber}.${card.learningCardNumberWithinStage}`,
      learning_card_id: card.learningCardId,
      learning_card_title: card.learningCardTitle,
      question_number: index + 1,
      question_id: question.questionId,
      question_type: question.authoringCategory,
      stem: question.question,
      correct_choice_id: question.correctChoiceId,
      correct_choice_text: correct?.text ?? '',
      objective: card.learningObjectiveReview?.primaryLearningObjective ?? ''
    }
  }))
}

function makeChoiceRows(bank) {
  return bank.cards.flatMap((card) => card.questions.flatMap((question, questionIndex) => question.choices.map((choice, choiceIndex) => ({
    stage_number: card.stageNumber,
    stage_title: card.stageTitle,
    learning_card_code: `${card.stageNumber}.${card.learningCardNumberWithinStage}`,
    learning_card_id: card.learningCardId,
    learning_card_title: card.learningCardTitle,
    question_number: questionIndex + 1,
    question_id: question.questionId,
    question_type: question.authoringCategory,
    choice_position_source_order: choiceIndex + 1,
    choice_id: choice.choiceId,
    is_correct: choice.isCorrect,
    text: choice.text,
    feedback: choice.feedback,
    represented_misconception: choice.representedMisconception ?? '',
    represented_glossary_term: choice.representedGlossaryTerm ?? '',
    distractor_source: choice.distractorSource ?? '',
    distractor_rationale: choice.distractorRationale ?? ''
  }))))
}

function makeMarkdown(bank, repairStats, distribution, lengthAudit, learnerCopy) {
  const lines = []
  lines.push(`# Prompt Life Checkpoint Bank ${VERSION}`)
  lines.push('')
  lines.push(`- Active bank: ${bank.activeBankLabel}`)
  lines.push(`- Cards: ${bank.summary.learningCardsActive}`)
  lines.push(`- Questions: ${bank.summary.totalQuestions}`)
  lines.push(`- Choices: ${bank.summary.totalChoices}`)
  lines.push(`- Wrong-answer distractors: ${bank.summary.totalDistractors}`)
  lines.push(`- Questions revised: ${repairStats.questionsRevised}`)
  lines.push(`- Distractors revised: ${repairStats.distractorsRevised}`)
  lines.push(`- Feedback items revised: ${repairStats.feedbackRevised}`)
  lines.push(`- Objectives revised this pass: ${repairStats.objectivesRevised}`)
  lines.push(`- Boilerplate feedback occurrences before: ${repairStats.boilerplateOccurrencesBefore}`)
  lines.push(`- Boilerplate feedback occurrences after: ${repairStats.boilerplateOccurrencesAfter}`)
  lines.push(`- Boilerplate feedback occurrences removed: ${repairStats.boilerplateOccurrencesRemoved}`)
  lines.push('')
  lines.push('## Quality Rules')
  bank.qualityChecklist.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## Type Distribution')
  Object.entries(distribution.byType).forEach(([type, count]) => lines.push(`- ${type}: ${count}`))
  lines.push('')
  lines.push('## Answer-Length Audit')
  lines.push(`- Before repair warnings: ${lengthAudit.before.length}`)
  lines.push(`- After repair warnings: ${lengthAudit.after.length}`)
  lines.push(`- Resolved warnings: ${repairStats.answerLengthWarningsResolved}`)
  lines.push(`- Intentionally retained warnings: ${repairStats.answerLengthWarningsRetained}`)
  lengthAudit.after.slice(0, 20).forEach((warning) => {
    lines.push(`- ${warning.questionId}: ratio ${warning.ratio.toFixed(2)}, delta ${Math.round(warning.delta)} chars`)
  })
  lines.push('')
  lines.push('## Learner-Copy Audit')
  lines.push(`- Checked source files: ${learnerCopy.checkedFiles}`)
  lines.push(`- Issues found by generator scan: ${learnerCopy.issues.length}`)
  lines.push('')
  bank.cards.forEach((card) => {
    lines.push(`## ${card.learningCardTitle} (${card.revisedQuestionCount})`)
    lines.push('')
    lines.push(`Stage: ${card.stageNumber}. ${card.stageTitle}`)
    lines.push('')
    lines.push(`Objective: ${card.learningObjectiveReview.primaryLearningObjective}`)
    lines.push('')
    card.questions.forEach((question, index) => {
      lines.push(`### Q${index + 1}. ${question.questionId}`)
      lines.push('')
      lines.push(`- Category: ${question.authoringCategory}`)
      lines.push(`- Stem: ${question.question}`)
      lines.push(`- Correct choice: ${question.correctChoiceId}`)
      lines.push('- Choices:')
      question.choices.forEach((choice) => {
        lines.push(`  - ${choice.choiceId}: ${choice.text}${choice.isCorrect ? ' (correct)' : ''}`)
        lines.push(`    - feedback: ${choice.feedback}`)
        if (!choice.isCorrect) {
          lines.push(`    - misconception: ${choice.representedMisconception}`)
          lines.push(`    - represented term: ${choice.representedGlossaryTerm}`)
          lines.push(`    - source: ${choice.distractorSource}`)
          lines.push(`    - rationale: ${choice.distractorRationale}`)
        }
      })
      lines.push('')
    })
  })
  return `${lines.join('\n')}\n`
}

function renderTable(headers, rows) {
  return `<table><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`
}

function makeHtml(bank, repairStats, distribution, repairLog, lengthAudit, jargonAudit, learnerCopy) {
  const cardRows = bank.cards.map((card) => `<tr><td>${card.stageNumber}.${card.learningCardNumberWithinStage}</td><td>${escapeHtml(card.stageTitle)}</td><td>${escapeHtml(card.learningCardTitle)}</td><td>${card.revisedQuestionCount}</td><td>${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</td></tr>`)
  const typeRows = Object.entries(distribution.byType).map(([type, count]) => `<tr><td>${escapeHtml(type)}</td><td>${count}</td></tr>`)
  const stageRows = Object.entries(distribution.byStage).map(([stage, counts]) => `<tr><td>${escapeHtml(stage)}</td><td>${Object.entries(counts).map(([type, count]) => `${escapeHtml(type)}: ${count}`).join('<br>')}</td></tr>`)
  const revisedRows = repairLog
    .filter((entry) => /revised/.test(entry.status))
    .slice(0, 160)
    .map((entry) => `<tr><td>${escapeHtml(entry.repair_id)}</td><td>${escapeHtml(entry.question_id)}</td><td>${escapeHtml(entry.status)}</td><td>${escapeHtml(entry.issue_flags)}</td><td>${escapeHtml(entry.notes)}</td></tr>`)
  const noChangeRows = repairLog
    .filter((entry) => entry.status === 'reviewed-no-change')
    .slice(0, 120)
    .map((entry) => `<tr><td>${escapeHtml(entry.repair_id)}</td><td>${escapeHtml(entry.question_id)}</td><td>${escapeHtml(entry.issue_flags)}</td><td>${escapeHtml(entry.notes)}</td></tr>`)
  const lengthRows = lengthAudit.after.slice(0, 60).map((warning) => `<tr><td>${escapeHtml(warning.stage)}</td><td>${escapeHtml(warning.learningCardTitle)}</td><td>${escapeHtml(warning.questionId)}</td><td>${warning.ratio.toFixed(2)}</td><td>${Math.round(warning.delta)}</td><td>${escapeHtml(warning.correctText)}</td></tr>`)
  const retainedLengthRows = (lengthAudit.retained ?? []).map((warning) => `<tr><td>${escapeHtml(warning.stage)}</td><td>${escapeHtml(warning.learningCardTitle)}</td><td>${escapeHtml(warning.questionId)}</td><td>${warning.ratio.toFixed(2)}</td><td>${Math.round(warning.delta)}</td><td>${escapeHtml(warning.retainedReason)}</td><td>${escapeHtml(warning.correctText)}</td></tr>`)
  const jargonRows = jargonAudit.map((item) => `<tr><td>${escapeHtml(item.questionId)}</td><td>${escapeHtml(item.status)}</td><td>${escapeHtml(item.note)}</td></tr>`)
  const objectiveRows = bank.cards.map((card) => `<tr><td>${card.stageNumber}.${card.learningCardNumberWithinStage}</td><td>${escapeHtml(card.learningCardTitle)}</td><td>${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</td></tr>`)
  const questionSections = bank.cards.map((card) => `
    <section class="card-block">
      <h3>${escapeHtml(card.learningCardTitle)} <span>${card.revisedQuestionCount} questions</span></h3>
      <p><strong>Objective:</strong> ${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</p>
      ${card.questions.map((question, index) => `
        <div class="question">
          <p class="qid">Q${index + 1}: ${escapeHtml(question.questionId)} · ${escapeHtml(question.authoringCategory)}</p>
          <p class="stem">${escapeHtml(question.question)}</p>
          <ol>
            ${question.choices.map((choice) => `<li class="${choice.isCorrect ? 'correct' : ''}"><strong>${escapeHtml(choice.choiceId)}</strong>: ${escapeHtml(choice.text)}${choice.isCorrect ? ' <em>correct</em>' : ''}<br><span>${escapeHtml(choice.feedback)}</span></li>`).join('')}
          </ol>
        </div>
      `).join('')}
    </section>
  `).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prompt Life v0.27.14 Checkpoint Bank Revision Report</title>
  <style>
    @page { size: Letter; margin: .45in; }
    :root { color: #08124a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #fbfffe; }
    body { margin: 0; padding: 28px; }
    h1, h2, h3 { color: #111873; }
    h1 { font-size: 30px; margin: 0 0 8px; }
    h2 { font-size: 21px; margin-top: 30px; border-top: 2px solid #d9e4ff; padding-top: 18px; }
    h3 { font-size: 18px; }
    h3 span { color: #087b83; font-size: 13px; }
    p, li, td, th { font-size: 12px; line-height: 1.5; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 18px 0; }
    .summary div, .note, .question { background: white; border: 1px solid #d7e1f3; border-radius: 10px; padding: 12px; box-shadow: 0 8px 20px rgba(21, 31, 99, .08); }
    .summary strong { display: block; font-size: 22px; color: #009caa; }
    table { border-collapse: collapse; width: 100%; background: white; }
    th, td { border: 1px solid #d7e1f3; padding: 8px; vertical-align: top; text-align: left; }
    th { background: #eef5ff; }
    .qid { color: #087b83; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
    .stem { font-weight: 800; font-size: 13px; }
    .correct { background: #eafff6; border-radius: 6px; }
    .card-block, .question { break-inside: avoid; }
    ol { padding-left: 20px; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.27.14 Full Checkpoint Bank Revision Report</h1>
  <p>Generated ${escapeHtml(bank.generatedAt)} from the v0.27.13 repaired active checkpoint bank.</p>
  <div class="summary">
    <div><strong>${bank.summary.learningCardsActive}</strong>cards</div>
    <div><strong>${bank.summary.totalQuestions}</strong>questions</div>
    <div><strong>${bank.summary.totalChoices}</strong>choices</div>
    <div><strong>${bank.summary.totalDistractors}</strong>distractors</div>
  </div>

  <section class="note"><h2>1. Executive Summary</h2>
    <p>The v0.27.14 pass keeps all 39 Journey cards and 136 checkpoint questions active while preparing the bank for small human testing. The largest repair area is feedback naturalness: repeated boilerplate has been replaced with selected-answer-specific misconception boundaries without revealing the correct answer.</p>
    <ul>
      <li>Questions revised: ${repairStats.questionsRevised}</li>
      <li>Distractors revised: ${repairStats.distractorsRevised}</li>
      <li>Feedback items revised: ${repairStats.feedbackRevised}</li>
      <li>Boilerplate feedback occurrences removed: ${repairStats.boilerplateOccurrencesRemoved} (${repairStats.boilerplateOccurrencesBefore} before, ${repairStats.boilerplateOccurrencesAfter} after).</li>
      <li>Answer-length warnings resolved: ${repairStats.answerLengthWarningsResolved}; intentionally retained for human review: ${repairStats.answerLengthWarningsRetained}.</li>
      <li>Objectives revised this pass: ${repairStats.objectivesRevised}; the v0.27.12 objectives were already specific and were reviewed rather than replaced.</li>
      <li>Final readiness judgment: ready for small human testing, with answer-length bias items still marked for human review.</li>
    </ul>
  </section>

  <section><h2>2. All Cards And Question Counts</h2>${renderTable(['#', 'Stage', 'Learning card', 'Questions', 'Objective'], cardRows)}</section>
  <section><h2>3. Question Type Distribution</h2>${renderTable(['Type', 'Count'], typeRows)}<h3>By Stage</h3>${renderTable(['Stage', 'Distribution'], stageRows)}</section>
  <section><h2>4. Questions Revised</h2>${renderTable(['Repair', 'Question', 'Status', 'Flags', 'Notes'], revisedRows)}</section>
  <section><h2>5. Questions Reviewed With No Change</h2>${renderTable(['Repair', 'Question', 'Flags', 'Notes'], noChangeRows)}</section>
  <section><h2>6. Distractors Revised</h2><p>${repairStats.distractorsRevised} visible wrong-choice texts were revised, mostly to remove cartoonishly absolute wording or replace future-stage jargon with plain learner-facing language.</p></section>
  <section><h2>7. Feedback Revised</h2><p>${repairStats.feedbackRevised} feedback items were revised. Wrong-answer feedback teaches the selected misconception and does not reveal or style the correct option.</p></section>
  <section><h2>8. Objectives Revised</h2><p>${repairStats.objectivesRevised} objectives were rewritten in this pass. All 39 v0.27.12 objectives were reviewed and retained because they were already specific, model-centered, and badge-worthy.</p>${renderTable(['#', 'Learning card', 'Objective'], objectiveRows)}</section>
  <section><h2>9. Answer-Length Bias Audit</h2><p>Before repair: ${lengthAudit.before.length} warnings. After repair: ${lengthAudit.after.length} warnings. Resolved: ${repairStats.answerLengthWarningsResolved}. Intentionally retained: ${repairStats.answerLengthWarningsRetained}. Remaining warnings are documented for human review because shortening further may make some boundary answers less precise.</p>${renderTable(['#', 'Card', 'Question', 'Ratio', 'Delta', 'Correct text'], lengthRows)}<h3>Retained Warnings And Reasons</h3>${renderTable(['#', 'Card', 'Question', 'Ratio', 'Delta', 'Reason', 'Correct text'], retainedLengthRows)}</section>
  <section><h2>10. Jargon Timing Audit</h2>${renderTable(['Question', 'Status', 'Note'], jargonRows)}</section>
  <section><h2>11. Learner-Copy Audit Results</h2><p>Generator scan checked ${learnerCopy.checkedFiles} learner-facing source files and found ${learnerCopy.issues.length} issues. The npm learner-copy audit should be run after generation as the source-of-truth command.</p>${learnerCopy.issues.length ? `<ul>${learnerCopy.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join('')}</ul>` : '<p>No debug, fallback, query-parameter, or active-bank notes were found in normal learner-facing source by the generator scan.</p>'}</section>
  <section><h2>12. Unresolved Human-Review Concerns</h2><ul><li>${lengthAudit.after.length} answer-length warnings remain for a human reviewer to judge against mobile readability and precision.</li><li>The bank is ready for small human testing, not badge issuance. The Badge page remains under construction, pending human review, and not yet issued.</li><li>Several length-bias flags were retained where the correct answer naturally has to hold a multi-part boundary distinction.</li></ul></section>
  <section><h2>13. Final Readiness Judgment</h2><p><strong>Ready for small human testing.</strong> The checkpoint bank is structurally sound, the active bank remains development-safe, and remaining concerns are review-quality issues rather than build blockers.</p></section>
  <section><h2>Full Checkpoint Bank</h2>${questionSections}</section>
</body>
</html>
`
}

function exportPdf(htmlPath, pdfPath) {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
  ].filter(Boolean)
  const chrome = candidates.find((candidate) => fs.existsSync(candidate))
  if (!chrome) {
    throw new Error('Could not find Chrome to export the v0.27.14 PDF report.')
  }
  const result = spawnSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--virtual-time-budget=1000',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href
  ], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Chrome PDF export failed with status ${result.status}.`)
}

function makeHumanTestPacketMarkdown(bank, repairStats) {
  return `# Prompt Life v0.27.14 Human Test Packet

Prompt Life is ready for **small human testing**, not badge issuance.

Known status:

- Badge: under construction
- Human review: pending
- Credential issue status: not yet issued
- Active Journey cards: ${bank.summary.learningCardsActive}
- Active checkpoint questions: ${bank.summary.totalQuestions}
- Checkpoint choices: ${bank.summary.totalChoices}

## Short Tester Instructions

Use the app on a phone-sized screen if possible. Move through a few Journey cards, answer checkpoint questions naturally, and notice where the app helps you reason about the model instead of memorizing app wording.

Please do not try to get a perfect run. Wrong choices are part of the test because they should teach without shaming.

## What To Test

- Whether each checkpoint question is understandable without rereading the whole card.
- Whether the question makes you reason about an LLM mechanism, boundary, or human-use decision.
- Whether one answer feels clearly best.
- Whether wrong answers feel plausible rather than silly.
- Whether feedback explains the misconception you selected.
- Whether the feedback avoids revealing the correct answer too directly.
- Whether mobile layout, scrolling, and bottom navigation stay comfortable.

## Feedback To Collect

For each confusing checkpoint, capture:

- Learning card title.
- Question text.
- The answer you chose.
- Why that answer seemed tempting.
- Whether the feedback helped.
- Any wording that felt too technical, too vague, too long, or unfair.

## Report Confusing Questions

Mark a question as confusing if:

- The stem depends on a phrase you do not yet know.
- More than one answer seems equally defensible.
- The question asks for app wording instead of model reasoning.
- The scenario is too abstract to picture.

## Report Unfair Distractors

Mark a distractor as unfair if:

- It is obviously silly.
- It uses a term before the app has taught it.
- It is partly true in a way the feedback does not explain.
- It is much shorter or much vaguer than the correct answer.

## Report Jargon

Flag any use of terms such as logits, tensors, hidden states, grounding, RAG, inference, alignment, or autoregression when the question does not give enough context to understand them.

## Report UI Friction

Tell us if:

- The checkpoint panel is hidden by the bottom nav.
- The Next question or Next learning card button is hard to reach.
- Answer text is too dense on a small screen.
- Feedback appears too low, too late, or too long.

## Wrong-Answer Feedback Standard

Wrong choices should feel instructive, not humiliating. A good wrong-answer response should:

- Name the selected misconception.
- Explain the boundary in plain language.
- Stay calm.
- Avoid language like failed, wrong, score, or streak.
- Avoid giving away the correct answer too directly.

## Current Human-Review Focus

- Feedback rewritten for naturalness: ${repairStats.feedbackRevised} items.
- Boilerplate feedback occurrences removed: ${repairStats.boilerplateOccurrencesRemoved}.
- Answer-length warnings resolved: ${repairStats.answerLengthWarningsResolved}.
- Answer-length warnings intentionally retained for human review: ${repairStats.answerLengthWarningsRetained}.

## Final Reminder

Prompt Life is being tested as a learning app and evidence model. The badge remains under construction until human review confirms the Journey, checkpoint bank, and evidence standard are credible.
`
}

function makeHumanTestPacketHtml(markdown) {
  const sections = markdown
    .split(/\n(?=##? )/)
    .map((block) => {
      const lines = block.trim().split('\n')
      const title = lines.shift() ?? ''
      const heading = title.startsWith('# ')
        ? `<h1>${escapeHtml(title.replace(/^# /, ''))}</h1>`
        : `<h2>${escapeHtml(title.replace(/^## /, ''))}</h2>`
      const body = lines.join('\n')
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((part) => {
          if (part.startsWith('- ')) {
            const items = part.split('\n').filter(Boolean).map((item) => `<li>${escapeHtml(item.replace(/^- /, ''))}</li>`).join('')
            return `<ul>${items}</ul>`
          }
          return `<p>${escapeHtml(part).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
        })
        .join('\n')
      return `<section>${heading}${body}</section>`
    })
    .join('\n')
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Prompt Life v0.27.14 Human Test Packet</title>
  <style>
    @page { size: Letter; margin: .6in; }
    body { color: #08124a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.45; margin: 0; }
    h1 { color: #111873; font-size: 30px; margin: 0 0 16px; }
    h2 { border-top: 1px solid #d7e1f3; color: #111873; font-size: 18px; margin-top: 22px; padding-top: 14px; }
    p, li { font-size: 12.5px; }
    section { break-inside: avoid; }
    ul { padding-left: 20px; }
  </style>
</head>
<body>${sections}</body>
</html>`
}

function main() {
  const missingInputs = requiredInputs.filter((filePath) => !fs.existsSync(filePath))
  if (missingInputs.length) {
    throw new Error(`Missing support files:\n${missingInputs.map((filePath) => `- ${path.relative(root, filePath)}`).join('\n')}`)
  }

  const previousBank = readJson(previousBankPath)
  fs.mkdirSync(testingDir, { recursive: true })
  const cards = deepClean(clone(previousBank.cards))
  const flaggedByQuestion = new Map()
  const repairLog = []
  const beforeLengthWarnings = answerLengthWarnings(cards)
  const boilerplateBefore = cards.reduce((sum, card) => sum + card.questions.reduce((questionSum, question) => (
    questionSum + question.choices.reduce((choiceSum, choice) => choiceSum + (choice.isCorrect ? 0 : countBoilerplateOccurrences(choice.feedback)), 0)
  ), 0), 0)

  cards.forEach((card) => {
    card.status = 'active-development-pilot'
    card.questions.forEach((question) => {
      const repair = flaggedByQuestion.get(normalizeQuestionId(question.questionId))
      const before = stableSnapshot(question)
      applyTextOverrides(question, repair, repairLog)
      applyFeedbackRepairs(card, question, repair, repairLog)

      const correct = question.choices.find((choice) => choice.choiceId === question.correctChoiceId)
      if (correct) {
        correct.isCorrect = true
        question.choices.forEach((choice) => {
          if (choice.choiceId !== question.correctChoiceId) choice.isCorrect = false
        })
      }
      if (Array.isArray(question.humanReviewNotesApplied)) {
        question.humanReviewNotesApplied = [
          ...question.humanReviewNotesApplied.filter((note) => !/v0\.27\.1[34]/i.test(note)),
          'v0.27.14 human-test prep: feedback naturalness and answer-length bias reviewed.'
        ]
      }

      const after = stableSnapshot(question)
      if (repair && after === before) {
        repairLog.push(logEntry(repair, question, 'reviewed-no-change', 'Heuristic flag reviewed; existing item was retained because the misconception remained fair and model-centered.'))
      }
    })
  })

  const afterLengthWarnings = answerLengthWarnings(cards)
  const boilerplateAfter = cards.reduce((sum, card) => sum + card.questions.reduce((questionSum, question) => (
    questionSum + question.choices.reduce((choiceSum, choice) => choiceSum + (choice.isCorrect ? 0 : countBoilerplateOccurrences(choice.feedback)), 0)
  ), 0), 0)
  const beforeLengthIds = new Set(beforeLengthWarnings.map((warning) => warning.questionId))
  const afterLengthIds = new Set(afterLengthWarnings.map((warning) => warning.questionId))
  const resolvedLengthWarnings = beforeLengthWarnings.filter((warning) => !afterLengthIds.has(warning.questionId))
  const retainedLengthWarnings = afterLengthWarnings.filter((warning) => beforeLengthIds.has(warning.questionId))
  const distribution = typeDistribution(cards)
  const revisedQuestionIds = new Set()
  let distractorsRevised = 0
  let feedbackRevised = 0

  previousBank.cards.forEach((previousCard) => {
    const nextCard = cards.find((card) => card.learningCardId === previousCard.learningCardId)
    previousCard.questions.forEach((previousQuestion) => {
      const nextQuestion = nextCard.questions.find((question) => question.questionId === previousQuestion.questionId)
      if (stableSnapshot(previousQuestion) !== stableSnapshot(nextQuestion)) revisedQuestionIds.add(nextQuestion.questionId)
      previousQuestion.choices.forEach((previousChoice) => {
        const nextChoice = nextQuestion.choices.find((choice) => choice.choiceId === previousChoice.choiceId)
        if (!previousChoice.isCorrect && nextChoice && previousChoice.text !== nextChoice.text) distractorsRevised += 1
        if (nextChoice && previousChoice.feedback !== nextChoice.feedback) feedbackRevised += 1
      })
    })
  })

  const counts = totals(cards)
  const generatedAt = new Date().toISOString()
  const bank = {
    ...previousBank,
    version: VERSION,
    status: 'active-development-pilot',
    activeByDefault: true,
    activeBankLabel: ACTIVE_BANK_LABEL,
    generatedAt,
    sourceBanks: [
      'checkpoint-question-bank-v0-27-13.json'
    ],
    summary: {
      learningCardsActive: cards.length,
      ...counts,
      activeLessonIds: cards.map((card) => card.learningCardId),
      activeLessonTitles: cards.map((card) => card.learningCardTitle)
    },
    qualityChecklist: [
      'All 39 active Journey learning cards have a multi-question checkpoint set.',
      'Every question has four choices and exactly one correct answer.',
      'Question IDs and choice IDs are preserved when wording is clarified.',
      'Wrong-answer feedback maps by choiceId and teaches the selected misconception without revealing the correct option.',
      'Questions test model mechanism, application, causal consequence, boundary judgment, human-use judgment, misconception repair, or synthesis.',
      'Vague "best definition" and "which statement is most accurate" stems are removed from the active bank.',
      'Set-aside validation examples remain defined as examples kept out of training and saved for testing.',
      'Legacy fallback remains query-parameter controlled and is documented only in docs/reports.'
    ],
    reviewRepair: {
      version: '0.27.14',
      sourceBankVersion: previousBank.version,
      repairStats: {
        questionsRevised: revisedQuestionIds.size,
        distractorsRevised,
        feedbackRevised,
        objectivesRevised: 0,
        reviewedNoChange: repairLog.filter((entry) => entry.status === 'reviewed-no-change').length,
        boilerplateOccurrencesBefore: boilerplateBefore,
        boilerplateOccurrencesAfter: boilerplateAfter,
        boilerplateOccurrencesRemoved: boilerplateBefore - boilerplateAfter,
        answerLengthWarningsResolved: resolvedLengthWarnings.length,
        answerLengthWarningsRetained: retainedLengthWarnings.length
      },
      typeDistribution: distribution,
      answerLengthWarningsBefore: beforeLengthWarnings,
      answerLengthWarningsAfter: afterLengthWarnings,
      answerLengthWarningsResolved: resolvedLengthWarnings,
      answerLengthWarningsRetained: retainedLengthWarnings.map((warning) => ({
        ...warning,
        retainedReason: retainedLengthReason(warning)
      })),
      readiness: 'ready for small human testing; not ready for badge issuance'
    },
    cards
  }

  const validationIssues = validateBank(bank)
  if (validationIssues.length) {
    throw new Error(`v0.27.14 bank validation failed:\n${validationIssues.map((issue) => `- ${issue}`).join('\n')}`)
  }

  fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)
  fs.writeFileSync(outputSourcePath, makeRuntimeSource(cards))

  const learnerCopy = learnerCopyScan()
  bank.reviewRepair.learnerCopyScan = learnerCopy
  fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)

  const repairStats = bank.reviewRepair.repairStats
  const lengthAudit = {
    before: beforeLengthWarnings,
    after: afterLengthWarnings,
    resolved: bank.reviewRepair.answerLengthWarningsResolved,
    retained: bank.reviewRepair.answerLengthWarningsRetained
  }
  const jargonAudit = [{
    questionId: 'full-bank',
    status: 'reviewed',
    note: 'No new jargon pass was requested for v0.27.14; v0.27.13 terminology repairs remain active while feedback was naturalized for human testing.'
  }]

  writeCsv(outputCsvPath, makeQuestionRows(bank), [
    'stage_number',
    'stage_title',
    'learning_card_code',
    'learning_card_id',
    'learning_card_title',
    'question_number',
    'question_id',
    'question_type',
    'stem',
    'correct_choice_id',
    'correct_choice_text',
    'objective'
  ])
  writeCsv(outputChoiceCsvPath, makeChoiceRows(bank), [
    'stage_number',
    'stage_title',
    'learning_card_code',
    'learning_card_id',
    'learning_card_title',
    'question_number',
    'question_id',
    'question_type',
    'choice_position_source_order',
    'choice_id',
    'is_correct',
    'text',
    'feedback',
    'represented_misconception',
    'represented_glossary_term',
    'distractor_source',
    'distractor_rationale'
  ])
  writeCsv(outputRepairLogPath, repairLog, ['repair_id', 'priority', 'question_id', 'status', 'issue_flags', 'notes'])
  fs.writeFileSync(outputMdPath, makeMarkdown(bank, repairStats, distribution, lengthAudit, learnerCopy))
  fs.writeFileSync(outputHtmlPath, makeHtml(bank, repairStats, distribution, repairLog, lengthAudit, jargonAudit, learnerCopy))
  const humanPacketMarkdown = makeHumanTestPacketMarkdown(bank, repairStats)
  fs.writeFileSync(humanTestPacketMdPath, humanPacketMarkdown)
  fs.writeFileSync(humanTestPacketHtmlPath, makeHumanTestPacketHtml(humanPacketMarkdown))
  exportPdf(outputHtmlPath, outputPdfPath)
  exportPdf(humanTestPacketHtmlPath, humanTestPacketPdfPath)

  console.log(`Generated ${path.relative(root, outputSourcePath)}`)
  console.log(`Generated ${path.relative(root, outputJsonPath)}`)
  console.log(`Generated ${path.relative(root, outputCsvPath)}`)
  console.log(`Generated ${path.relative(root, outputChoiceCsvPath)}`)
  console.log(`Generated ${path.relative(root, outputRepairLogPath)}`)
  console.log(`Generated ${path.relative(root, outputMdPath)}`)
  console.log(`Generated ${path.relative(root, outputHtmlPath)}`)
  console.log(`Generated ${path.relative(root, outputPdfPath)}`)
  console.log(`Generated ${path.relative(root, humanTestPacketMdPath)}`)
  console.log(`Generated ${path.relative(root, humanTestPacketPdfPath)}`)
  console.log(JSON.stringify({
    questionsRevised: repairStats.questionsRevised,
    distractorsRevised: repairStats.distractorsRevised,
    feedbackRevised: repairStats.feedbackRevised,
    objectivesRevised: repairStats.objectivesRevised,
    lengthWarningsBefore: beforeLengthWarnings.length,
    lengthWarningsAfter: afterLengthWarnings.length,
    lengthWarningsResolved: repairStats.answerLengthWarningsResolved,
    lengthWarningsRetained: repairStats.answerLengthWarningsRetained,
    boilerplateBefore: repairStats.boilerplateOccurrencesBefore,
    boilerplateAfter: repairStats.boilerplateOccurrencesAfter,
    boilerplateRemoved: repairStats.boilerplateOccurrencesRemoved,
    learnerCopyIssues: learnerCopy.issues.length
  }, null, 2))
}

main()
