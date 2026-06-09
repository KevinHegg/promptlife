import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const reportDir = path.join(root, 'docs/journey')
const v0277Path = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-7-draft.json')
const glossaryPath = path.join(checkpointDir, 'glossary-learning-path-order-v0-27-7.json')
const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-8-model-thinking-pilot.json')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-8-model-thinking-pilot.md')
const outputHtmlPath = path.join(reportDir, 'prompt-life-v0-27-8-model-thinking-checkpoint-pilot-report.html')

const pilotIds = [
  'what-is-llm',
  'where-llms-fit',
  'history',
  'training',
  'pretraining',
  'overfitting-generalization'
]

const modelThinkingCategories = new Set([
  'mechanism',
  'application',
  'boundary',
  'misconception-check',
  'model-trace',
  'human-use-judgment',
  'causal-consequence'
])

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function correct(choiceId, text, feedback) {
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

function wrong(choiceId, text, representedMisconception, representedGlossaryTerm, distractorSource, distractorRationale, feedback) {
  return {
    choiceId,
    text,
    isCorrect: false,
    feedback,
    representedMisconception,
    representedGlossaryTerm,
    distractorSource,
    distractorRationale,
    temptingBecause: distractorRationale
  }
}

function question(cardId, number, type, authoringCategory, explicitMechanismTerms, questionText, choices, authoringNotes) {
  const questionId = `pilot-${cardId}-q${number}`
  const correctChoice = choices.find((choice) => choice.isCorrect)
  return {
    questionId,
    type,
    authoringCategory,
    explicitMechanismTerms,
    question: questionText,
    correctChoiceId: correctChoice.choiceId,
    choices,
    modelThinking: modelThinkingCategories.has(authoringCategory),
    directDefinition: authoringCategory === 'definition',
    authoringNotes
  }
}

const reviewDefaults = {
  q1: { classification: 'revise', rationale: 'The v0.27.7 stem is too curriculum-centered or definition-like; it should make the learner reason through model behavior.' },
  q2: { classification: 'revise', rationale: 'The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.' },
  q3: { classification: 'revise', rationale: 'The misconception target is useful, but the stem should become an applied model-thinking scenario.' },
  q4: { classification: 'revise', rationale: 'The relationship target is useful, but the stem should ask the learner to trace a concrete process.' }
}

const cardObjectives = {
  'what-is-llm': {
    primaryLearningObjective: 'Reason that an LLM generates response tokens by using learned weights and current context, without implying awareness or perfect search.',
    secondaryObjectives: [
      'Distinguish fluent generated behavior from conscious understanding.',
      'Separate inference from training and search/database retrieval.',
      'Connect prompt, response, token, weight, and inference in one model-centered trace.'
    ],
    modelMechanismOrBoundary: 'Inference uses fixed learned weights and temporary context to score, sample, append, and repeat next tokens.',
    mythsMisconceptionsToCorrect: [
      'A fluent LLM must be conscious.',
      'An LLM is a database or search engine that knows every file.',
      'A normal prompt durably teaches the model new weights.'
    ],
    relatedGlossaryTerms: ['llm', 'prompt', 'response', 'token', 'weight', 'inference'],
    nearbyGlossaryTermsUsefulAsDistractors: ['training', 'retrieval', 'memory', 'context window', 'probability'],
    oldReview: {
      'draft-what-is-llm-q1': reviewDefaults.q1,
      'draft-what-is-llm-q2': reviewDefaults.q2
    }
  },
  'where-llms-fit': {
    primaryLearningObjective: 'Use the AI family map to reason about what kind of generative system an LLM is and what it is not.',
    secondaryObjectives: [
      'Distinguish AI, machine learning, deep learning, generative AI, LLMs, diffusion models, and symbolic AI.',
      'Avoid treating all AI or all generative AI as ChatGPT-like LLMs.',
      'Recognize that different generative systems can produce different media through different mechanisms.'
    ],
    modelMechanismOrBoundary: 'LLMs are deep-learning generative AI systems focused on language/code; diffusion is a different generative family.',
    mythsMisconceptionsToCorrect: [
      'All AI systems are LLMs.',
      'All generative AI works like ChatGPT.',
      'AI and machine learning are interchangeable labels.'
    ],
    relatedGlossaryTerms: ['ai', 'machine-learning', 'deep-learning', 'generative-ai', 'llm', 'diffusion', 'multimodal', 'symbolic-ai', 'rule-based-ai', 'foundation-model'],
    nearbyGlossaryTermsUsefulAsDistractors: ['rationalism', 'empiricism', 'loss', 'training'],
    oldReview: {
      'draft-where-llms-fit-q1': reviewDefaults.q1,
      'draft-where-llms-fit-q2': reviewDefaults.q2
    }
  },
  history: {
    primaryLearningObjective: 'Reason through the difference between explicit rules and learned weights, while recognizing that real AI products may combine both.',
    secondaryObjectives: [
      'Distinguish symbolic/rule-based systems from deep-learning systems.',
      'Explain loss as the training signal that guides weight adjustment.',
      'Avoid treating LLM fluency as consciousness or treating hybrid apps as pure learned models.'
    ],
    modelMechanismOrBoundary: 'Deep learning learns from examples by predicting, measuring loss, and adjusting weights; symbolic AI relies on explicit rules.',
    mythsMisconceptionsToCorrect: [
      'LLMs are only hand-coded rulebooks.',
      'Fluent model output proves conscious reasoning.',
      'Any rule, filter, or retrieval step means there is no learned model.'
    ],
    relatedGlossaryTerms: ['rationalism', 'empiricism', 'symbolic-ai', 'deep-learning', 'training', 'loss', 'weight'],
    nearbyGlossaryTermsUsefulAsDistractors: ['rule-based-ai', 'foundation-model', 'retrieval', 'fine-tuning', 'policy'],
    oldReview: {
      'draft-history-q1': { classification: 'revise', rationale: 'The boundary is right, but the stem should ask the learner to compare actual system behavior.' },
      'draft-history-q2': reviewDefaults.q2,
      'draft-history-q3': reviewDefaults.q3
    }
  },
  training: {
    primaryLearningObjective: 'Trace training as the durable weight-changing loop and separate it from ordinary inference, sampling, retrieval, and context changes.',
    secondaryObjectives: [
      'Identify loss and weight update as the learning step.',
      'Explain why a normal chat does not usually update model weights.',
      'Trace example, prediction, loss, and update as the durable training path.'
    ],
    modelMechanismOrBoundary: 'Training uses examples and loss to update parameters; inference uses fixed weights and temporary activations.',
    mythsMisconceptionsToCorrect: [
      'Every prompt trains the model.',
      'Training is the same as sampling or generation.',
      'Weight updates, context changes, and retrieved text are interchangeable.'
    ],
    relatedGlossaryTerms: ['training', 'loss', 'weight', 'weight-update', 'parameter', 'training-data', 'inference', 'forward-pass'],
    nearbyGlossaryTermsUsefulAsDistractors: ['pretraining', 'next-token', 'context window', 'rag', 'diffusion', 'softmax'],
    oldReview: {
      'draft-training-q1': { classification: 'keep-core-revise-stem', rationale: 'The training/inference boundary is essential, but the pilot should ask about a concrete training moment.' },
      'draft-training-q2': reviewDefaults.q2,
      'draft-training-q3': reviewDefaults.q3,
      'draft-training-q4': reviewDefaults.q4
    }
  },
  pretraining: {
    primaryLearningObjective: 'Reason that pretraining is broad durable pattern learning from next-token prediction over large datasets, not perfect recall or live browsing.',
    secondaryObjectives: [
      'Connect next-token targets, loss, weight updates, and broad model capability.',
      'Separate pretraining from RAG, fine-tuning, inference, and database lookup.',
      'Explain how broad data can shape weights without installing conscious understanding.'
    ],
    modelMechanismOrBoundary: 'Pretraining repeats the training loop at large scale, changing weights before normal use.',
    mythsMisconceptionsToCorrect: [
      'Pretraining gives perfect recall of every source.',
      'Pretraining happens during each user chat.',
      'Fine-tuning or RAG explains all broad model knowledge.'
    ],
    relatedGlossaryTerms: ['pretraining', 'training', 'training-data', 'weight', 'loss', 'next-token', 'inference'],
    nearbyGlossaryTermsUsefulAsDistractors: ['weight-update', 'parameter', 'overfitting', 'generalization', 'validation-data', 'rag', 'fine-tuning'],
    oldReview: {
      'draft-pretraining-q1': { classification: 'keep-core-revise-stem', rationale: 'The durable weight-change idea is correct, but the pilot should name the pretraining signal and model mechanism.' },
      'draft-pretraining-q2': reviewDefaults.q2,
      'draft-pretraining-q3': reviewDefaults.q3,
      'draft-pretraining-q4': reviewDefaults.q4
    }
  },
  'overfitting-generalization': {
    primaryLearningObjective: 'Diagnose when a model has fit training examples too narrowly and explain why held-out validation checks generalization.',
    secondaryObjectives: [
      'Separate training performance from performance on new examples.',
      'Explain why validation data matters.',
      'Recognize when targeted training can become too narrow.'
    ],
    modelMechanismOrBoundary: 'Overfitting installs brittle patterns into weights; generalization means learned patterns transfer to unseen examples.',
    mythsMisconceptionsToCorrect: [
      'Perfect training performance proves a model learned well.',
      'Validation data is just more context.',
      'Lower loss or memorization automatically guarantees truthful future answers.'
    ],
    relatedGlossaryTerms: ['overfitting', 'generalization', 'validation-data', 'training-data', 'evaluation', 'training'],
    nearbyGlossaryTermsUsefulAsDistractors: ['pretraining', 'fine-tuning', 'loss', 'context window', 'rag', 'inference'],
    oldReview: {
      'draft-overfitting-generalization-q1': { classification: 'keep-core-revise-stem', rationale: 'The overfitting sign is correct, but the pilot should use an applied train/validation scenario.' },
      'draft-overfitting-generalization-q2': reviewDefaults.q2,
      'draft-overfitting-generalization-q3': reviewDefaults.q3
    }
  }
}

const pilotQuestions = {
  'what-is-llm': [
    question('what-is-llm', 1, 'mechanism in action', 'mechanism', ['LLM', 'next token', 'context', 'learned weights'], 'When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?', [
      correct('pilot-what-is-llm-q1-correct', 'Using learned weights and current context to score possible next tokens, choose one, append it, and run again.', 'Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.'),
      wrong('pilot-what-is-llm-q1-conscious-reader', 'Reading the prompt with conscious understanding before writing a complete answer.', 'conscious mind vs fluent model behavior', 'llm', 'same-card', 'Tempting because fluent text can sound like a human explanation.', 'Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.'),
      wrong('pilot-what-is-llm-q1-search-database', 'Searching all documents it has ever seen and copying the best passage.', 'search engine/database vs generative model', 'retrieval', 'author-created misconception', 'Tempting because people often equate broad model knowledge with search.', 'This choice reveals a common mix-up. A plain LLM generates from learned patterns and current context; retrieval is an added system step.'),
      wrong('pilot-what-is-llm-q1-training-chat', 'Changing its weights every time the user sends a prompt.', 'training vs inference', 'training', 'same-card', 'Tempting because the model appears to adapt within a conversation.', 'That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.')
    ], {
      whyItHelpsModelThinking: 'Learners trace the actual score-sample-append loop instead of naming the card.',
      badgeMasterySupport: 'Supports the core badge distinction between inference, training, context, and next-token generation.',
      reviewStatus: 'remain after human review'
    }),
    question('what-is-llm', 2, 'misconception diagnosis', 'human-use-judgment', ['LLM', 'fluent behavior', 'awareness', 'response tokens'], 'A model gives a fluent explanation of a poem. What is the safest model-centered interpretation?', [
      correct('pilot-what-is-llm-q2-correct', 'It generated likely response tokens from context and learned patterns; fluency does not prove awareness.', 'Insight strengthened. This is the fluent-without-awareness boundary Prompt Life wants learners to hold.'),
      wrong('pilot-what-is-llm-q2-inner-experience', 'It must have inner experience because the explanation sounds human.', 'conscious mind vs fluent model behavior', 'llm', 'same-card', 'Tempting because human-like language invites human-like interpretation.', 'Not quite. The model can imitate explanation without being a human reasoner.'),
      wrong('pilot-what-is-llm-q2-hidden-database', 'It looked up a hidden database record that contains the perfect interpretation.', 'database lookup vs learned generation', 'retrieval', 'author-created misconception', 'Tempting because polished answers can feel copied from a stored source.', 'Close, but this describes retrieval or search better than a plain LLM forward pass.'),
      wrong('pilot-what-is-llm-q2-permanent-learning', 'The prompt permanently taught the model a new literary skill during that chat.', 'prompt/context change vs durable weight update', 'weight-update', 'same-card', 'Tempting because the model may use earlier context in the same conversation.', 'That would require training. In a normal chat, the prompt can shape temporary context without durably updating weights.')
    ], {
      whyItHelpsModelThinking: 'Learners evaluate a real human interpretation trap: fluent output without inner awareness.',
      badgeMasterySupport: 'Supports demystification without hype or fear.',
      reviewStatus: 'remain after human review'
    })
  ],
  'where-llms-fit': [
    question('where-llms-fit', 1, 'applied scenario', 'application', ['generative AI', 'LLM', 'diffusion'], 'A campus tool summarizes text with an LLM and another tool creates images by denoising noise. What does that comparison show?', [
      correct('pilot-where-llms-fit-q1-correct', 'Both can be generative AI, but the LLM focuses on language/code while diffusion often generates by denoising media.', 'Good distinction. Generative AI is a family; LLMs and diffusion models are different branches.'),
      wrong('pilot-where-llms-fit-q1-all-chatgpt', 'Both tools are LLMs because all generative AI works like ChatGPT.', 'LLM vs generative AI family', 'generative-ai', 'same-card', 'Tempting because ChatGPT is many learners’ first example of generative AI.', 'Not quite. An LLM is one kind of generative AI, not the whole category.'),
      wrong('pilot-where-llms-fit-q1-text-only-ai', 'The image tool is not AI unless it generates text tokens.', 'LLM output vs broader generative outputs', 'diffusion', 'same-card', 'Tempting because this app starts with language models.', 'Close, but diffusion models can be AI without using the LLM next-token text loop.'),
      wrong('pilot-where-llms-fit-q1-ai-ml-same', 'Machine learning and AI mean exactly the same thing, so the categories do not matter.', 'AI vs machine learning category boundary', 'machine-learning', 'same-card', 'Tempting because the terms are often used loosely in public discussion.', 'This choice collapses useful categories. Machine learning is a major branch inside the broader AI landscape.')
    ], {
      whyItHelpsModelThinking: 'Learners compare two model families by mechanism and output type.',
      badgeMasterySupport: 'Prevents overgeneralizing LLM lessons to all AI systems.',
      reviewStatus: 'remain after human review'
    }),
    question('where-llms-fit', 2, 'boundary distinction', 'boundary', ['AI', 'machine learning', 'deep learning', 'generative AI', 'LLM'], 'When people say an LLM sits inside the broader AI family, which category map is most useful?', [
      correct('pilot-where-llms-fit-q2-correct', 'AI is broad; machine learning learns from data; deep learning uses layered networks; generative AI creates outputs; LLMs generate language/code.', 'Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.'),
      wrong('pilot-where-llms-fit-q2-llm-parent', 'LLMs are the parent category that contains all AI systems.', 'all AI is an LLM', 'ai', 'same-card', 'Tempting because LLMs currently dominate public attention.', 'Not quite. LLMs are an important branch, not the root of the AI tree.'),
      wrong('pilot-where-llms-fit-q2-rules-same', 'Symbolic/rule-based AI and learned models are identical because both run on computers.', 'symbolic AI vs learned model boundary', 'symbolic-ai', 'same-card', 'Tempting because both can be packaged inside the same software product.', 'Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.'),
      wrong('pilot-where-llms-fit-q2-diffusion-token-loop', 'Diffusion models and LLMs use the same next-token loop.', 'diffusion vs autoregressive language generation', 'diffusion', 'same-card', 'Tempting because both are generative AI.', 'This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation is usually autoregressive.')
    ], {
      whyItHelpsModelThinking: 'Learners build a category map they can use later when mechanisms diverge.',
      badgeMasterySupport: 'Supports risk literacy by avoiding one-size-fits-all AI claims.',
      reviewStatus: 'remain after human review'
    })
  ],
  history: [
    question('history', 1, 'boundary distinction', 'boundary', ['rule-based AI', 'learned weights', 'LLM'], 'If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?', [
      correct('pilot-history-q1-correct', 'The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples.', 'Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.'),
      wrong('pilot-history-q1-loss-every-task', 'The rule-based system updates weights from loss during every task.', 'symbolic rules vs training loop', 'loss', 'same-card', 'Tempting because loss is nearby in the deep-learning explanation.', 'Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.'),
      wrong('pilot-history-q1-conscious-llm', 'The LLM has conscious reasoning, while the rule-based system has none.', 'conscious reasoning vs learned behavior', 'llm', 'explicit-confusable', 'Tempting because LLM language can sound like reasoning from the inside.', 'That gives the LLM too much inner life. The key boundary here is learned weights versus explicit rules.'),
      wrong('pilot-history-q1-all-rulebooks', 'There is no difference; both are just fixed rulebooks.', 'LLM as hand-coded rulebook', 'symbolic-ai', 'same-card', 'Tempting because both systems can produce predictable outputs.', 'Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.')
    ], {
      whyItHelpsModelThinking: 'Learners compare two system designs rather than reciting intellectual history.',
      badgeMasterySupport: 'Builds the architecture boundary needed for later training/inference distinctions.',
      reviewStatus: 'remain after human review'
    }),
    question('history', 2, 'mechanism in action', 'mechanism', ['deep learning', 'loss', 'weights'], 'During deep-learning training, why does the system measure loss?', [
      correct('pilot-history-q2-correct', 'Loss measures prediction error so an optimizer can adjust weights.', 'Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.'),
      wrong('pilot-history-q2-moral-good', 'Loss tells the model whether a generated answer is morally good.', 'loss vs human value judgment', 'loss', 'same-card', 'Tempting because loss sounds like a judgment word.', 'Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.'),
      wrong('pilot-history-q2-softmax-probability', 'Loss is the probability distribution used during sampling.', 'loss vs probability/softmax', 'probability', 'nearby-stage', 'Tempting because both involve numbers during model work.', 'Close, but probability helps choose outputs during generation; loss guides weight updates during training.'),
      wrong('pilot-history-q2-retrieved-source', 'Loss is a retrieved source that gets added to context.', 'training signal vs retrieval/context', 'retrieval', 'author-created misconception', 'Tempting because later systems can add outside text before generation.', 'That describes retrieval better. Loss belongs to training, not context insertion.')
    ], {
      whyItHelpsModelThinking: 'Learners identify the causal role of loss inside training.',
      badgeMasterySupport: 'Loss is needed for badge-worthy understanding of how weights change.',
      reviewStatus: 'remain after human review'
    }),
    question('history', 3, 'human-use judgment', 'human-use-judgment', ['LLM', 'rules', 'retrieval', 'filters'], 'A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?', [
      correct('pilot-history-q3-correct', 'Modern systems can combine learned models with rules/tools; the LLM itself is still a learned pattern system.', 'Good distinction. Products can be hybrid even when the central model is learned from data.'),
      wrong('pilot-history-q3-no-learning-if-rules', 'Any rule in the app means the LLM is no longer trained from data.', 'hybrid system vs pure symbolic replacement', 'rule-based-ai', 'same-card', 'Tempting because rule-based pieces can be visible in product behavior.', 'Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.'),
      wrong('pilot-history-q3-conscious-product', 'Any fluent answer means the app is consciously reasoning.', 'fluent behavior vs awareness', 'llm', 'explicit-confusable', 'Tempting because the whole app may feel conversational.', 'This choice gives fluency too much mind. The app can combine tools and still lack conscious understanding.'),
      wrong('pilot-history-q3-use-finetunes', 'Retrieval or filters permanently fine-tune the model on every use.', 'retrieval/filtering vs durable training', 'fine-tuning', 'nearby-stage', 'Tempting because the app appears to adapt to local material.', 'Close, but retrieval and filters can shape the current response without durably changing model weights.')
    ], {
      whyItHelpsModelThinking: 'Learners reason about real product stacks, not just model families.',
      badgeMasterySupport: 'Supports institutional AI literacy: model, wrapper, tool, and policy are not the same thing.',
      reviewStatus: 'remain after human review'
    })
  ],
  training: [
    question('training', 1, 'mechanism in action', 'mechanism', ['training', 'loss', 'weight update'], 'During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?', [
      correct('pilot-training-q1-correct', 'The training process uses the loss signal to update weights.', 'Good distinction. The durable weight update is what makes this training.'),
      wrong('pilot-training-q1-append-wrong-token', 'The model merely appends the wrong token to a live response.', 'training vs autoregressive inference', 'inference', 'same-card', 'Tempting because generation also chooses and appends tokens.', 'Not quite. Appending a response token is inference behavior; training uses loss to change weights.'),
      wrong('pilot-training-q1-store-memory', 'The user prompt is stored as permanent memory.', 'context vs permanent memory', 'memory', 'author-created misconception', 'Tempting because chat context can feel remembered.', 'This choice reveals a common mix-up. Training updates weights; a prompt in context is temporary unless stored elsewhere.'),
      wrong('pilot-training-q1-softmax-truth', 'Softmax turns the wrong answer into truth.', 'probability vs truth', 'softmax', 'nearby-stage', 'Tempting because softmax appears in the later probability step.', 'Close, but softmax turns scores into probabilities; it does not make an answer true or update weights.')
    ], {
      whyItHelpsModelThinking: 'Learners locate the precise causal step that changes the model.',
      badgeMasterySupport: 'Core badge distinction: training changes weights; inference uses them.',
      reviewStatus: 'remain after human review'
    }),
    question('training', 2, 'boundary distinction', 'boundary', ['chat inference', 'model weights', 'training'], 'A student asks a chatbot one question. Unless a separate training process runs, what usually does not happen?', [
      correct('pilot-training-q2-correct', 'The model’s weights are durably updated by that chat.', 'Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.'),
      wrong('pilot-training-q2-fixed-weights', 'The model uses its fixed weights to process the context.', 'confusing what does happen during inference with what does not', 'inference', 'same-card', 'Tempting because this is part of ordinary model use.', 'Not quite. That usually does happen during inference; the question asks what does not usually happen.'),
      wrong('pilot-training-q2-hidden-states', 'Temporary hidden states form during the forward pass.', 'temporary activation vs durable learning', 'hidden state', 'nearby-stage', 'Tempting because hidden states are internal model numbers.', 'Close, but temporary hidden states can form during inference. They are not durable weight updates.'),
      wrong('pilot-training-q2-score-tokens', 'The model scores possible next response tokens.', 'logits/sampling vs weight update', 'logits', 'nearby-stage', 'Tempting because token scoring is also internal model work.', 'That is ordinary generation behavior. It is not the durable training step.')
    ], {
      whyItHelpsModelThinking: 'Learners reason from a familiar chat scenario to the durable/temporary boundary.',
      badgeMasterySupport: 'Reduces the myth that every user chat trains the base model.',
      reviewStatus: 'remain after human review'
    }),
    question('training', 3, 'causal consequence', 'causal-consequence', ['training', 'parameters', 'inference'], 'Why can training change how the model behaves tomorrow, while inference usually cannot?', [
      correct('pilot-training-q3-correct', 'Training changes parameters that future runs reuse; inference uses temporary computations for the current run.', 'Good distinction. Durable parameters carry forward; inference-time states usually do not.'),
      wrong('pilot-training-q3-inference-optimizer', 'Inference is where the optimizer changes weights.', 'optimizer/weight update vs inference', 'weight-update', 'same-card', 'Tempting because both training and inference run model computations.', 'Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.'),
      wrong('pilot-training-q3-visible-prompt', 'Training only changes the visible prompt text.', 'prompt/context vs weights', 'prompt', 'nearby-stage', 'Tempting because prompt text clearly changes a response.', 'Close, but prompt changes are temporary input changes; training changes the model’s learned numbers.'),
      wrong('pilot-training-q3-guarantee-truth', 'Training guarantees every future answer is true.', 'training improvement vs truth guarantee', 'probability', 'author-created misconception', 'Tempting because training sounds like making the model better.', 'This choice overclaims. Training can improve behavior, but it does not guarantee truth.')
    ], {
      whyItHelpsModelThinking: 'Learners connect durability to parameters reused by future inference.',
      badgeMasterySupport: 'Strengthens durable-versus-temporary literacy.',
      reviewStatus: 'remain after human review'
    }),
    question('training', 4, 'model trace', 'model-trace', ['training loop', 'prediction', 'loss', 'weight update'], 'In a training loop, which sequence is the durable learning path?', [
      correct('pilot-training-q4-correct', 'Example -> prediction -> loss -> weight update.', 'Insight strengthened. That is the weight-changing path.'),
      wrong('pilot-training-q4-generation-loop', 'Prompt -> response -> append -> next response token.', 'training loop vs autoregressive generation', 'autoregression', 'nearby-stage', 'Tempting because this is the model’s generation loop.', 'Close, but that sequence describes inference/generation, not training.'),
      wrong('pilot-training-q4-rag-loop', 'Search -> retrieved passage -> context -> answer.', 'training vs retrieval-augmented context', 'rag', 'nearby-stage', 'Tempting because retrieval can improve answers.', 'That describes RAG. It adds temporary context; it does not by itself update weights.'),
      wrong('pilot-training-q4-diffusion-loop', 'Noise -> denoise -> image/video sample.', 'training vs diffusion generation', 'diffusion', 'nearby-stage', 'Tempting because diffusion is another generative process.', 'Not quite. That is a diffusion-style generation story, not the training loop for weight updates.')
    ], {
      whyItHelpsModelThinking: 'Learners choose the path with the durable update, not another plausible AI sequence.',
      badgeMasterySupport: 'Prepares learners to distinguish training, RAG, diffusion, and autoregression later.',
      reviewStatus: 'remain after human review'
    })
  ],
  pretraining: [
    question('pretraining', 1, 'mechanism in action', 'mechanism', ['pretraining', 'next-token targets', 'loss', 'weights'], 'During pretraining, what signal teaches the model broad language patterns across many examples?', [
      correct('pilot-pretraining-q1-correct', 'Repeated prediction error/loss from next-token targets changes weights over many training steps.', 'Good distinction. Pretraining scales the training loop across many examples.'),
      wrong('pilot-pretraining-q1-live-chat', 'A user conversation at deployment permanently rewrites the model.', 'pretraining vs inference', 'inference', 'same-card', 'Tempting because the model can seem to adapt inside a chat.', 'Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.'),
      wrong('pilot-pretraining-q1-hand-rules', 'A human writes every rule the model will follow.', 'learned patterns vs symbolic rules', 'symbolic-ai', 'nearby-stage', 'Tempting because software often has hand-written rules.', 'Close, but pretraining is learned from examples, not a complete rulebook written by hand.'),
      wrong('pilot-pretraining-q1-perfect-storage', 'The model perfectly stores each source document for later copying.', 'pattern learning vs perfect source recall', 'training-data', 'same-card', 'Tempting because source data influences the model.', 'This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.')
    ], {
      whyItHelpsModelThinking: 'Learners identify the training signal that builds broad capability.',
      badgeMasterySupport: 'Connects next-token prediction to durable weight learning.',
      reviewStatus: 'remain after human review'
    }),
    question('pretraining', 2, 'boundary distinction', 'boundary', ['pretraining', 'weights', 'source recall'], 'Why can pretraining create broad capability without making the model a perfect library of its sources?', [
      correct('pilot-pretraining-q2-correct', 'It installs statistical patterns in weights, not exact conscious recall of every document.', 'Insight strengthened. Pretraining can shape useful patterns without becoming a perfect library.'),
      wrong('pilot-pretraining-q2-private-files', 'Pretraining gives the model access to every private file on demand.', 'training data vs universal file access', 'training-data', 'same-card', 'Tempting because broad training data can sound like broad access.', 'Not quite. Training data exposure is not the same as access to every private file.'),
      wrong('pilot-pretraining-q2-rag-same', 'Pretraining is the same as RAG inserting a document into context.', 'pretraining vs retrieval/context', 'rag', 'nearby-stage', 'Tempting because both can bring outside information into answers.', 'Close, but RAG supplies temporary context during inference; pretraining durably changes weights before use.'),
      wrong('pilot-pretraining-q2-after-prompt', 'Pretraining happens only after a user asks a question.', 'pretraining vs deployment-time inference', 'inference', 'same-card', 'Tempting because learners see the model only during use.', 'Pretraining happens before deployment. The user prompt later uses the pretrained weights.')
    ], {
      whyItHelpsModelThinking: 'Learners reason about what weights can and cannot contain.',
      badgeMasterySupport: 'Supports nuanced memory, privacy, and retrieval literacy.',
      reviewStatus: 'remain after human review'
    }),
    question('pretraining', 3, 'causal consequence', 'causal-consequence', ['pretraining examples', 'weights', 'future prompts'], 'If pretraining examples include many styles and task shapes, what can change inside the model?', [
      correct('pilot-pretraining-q3-correct', 'Weights can shift so future prompts activate more useful language/code patterns.', 'Good distinction. Pretraining changes reusable model structure before later prompts arrive.'),
      wrong('pilot-pretraining-q3-context-window', 'Only the current context window grows larger.', 'pretraining weights vs context window', 'context window', 'nearby-stage', 'Tempting because context also affects output.', 'Not quite. Context is temporary input; pretraining changes weights.'),
      wrong('pilot-pretraining-q3-interface', 'Only the app’s button labels or interface change.', 'model weights vs product interface', 'foundation-model', 'nearby-stage', 'Tempting because users meet models through apps.', 'This describes product UI changes, not the model’s learned parameters.'),
      wrong('pilot-pretraining-q3-citation-list', 'Only a citation list is attached to answers.', 'pretraining vs citation/grounding', 'citation', 'nearby-stage', 'Tempting because citations can make answers look knowledgeable.', 'Close, but citations are response/support features; pretraining changes learned model weights.')
    ], {
      whyItHelpsModelThinking: 'Learners connect broad examples to future behavior through weights.',
      badgeMasterySupport: 'Builds a model-centered explanation for broad capability.',
      reviewStatus: 'remain after human review'
    }),
    question('pretraining', 4, 'misconception diagnosis', 'misconception-check', ['pretraining', 'weights', 'retrieval', 'facts'], 'A base model seems to know facts from public text. What is the model-literate explanation?', [
      correct('pilot-pretraining-q4-correct', 'Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page.', 'Insight strengthened. Pretraining can support fact-like generation without live source lookup.'),
      wrong('pilot-pretraining-q4-web-browsing', 'It must be browsing the web by itself for every answer.', 'pretraining vs web retrieval', 'retrieval', 'nearby-stage', 'Tempting because web search is a familiar way to know facts.', 'Not quite. Some systems browse or retrieve, but a base model can also generate from pretrained weights.'),
      wrong('pilot-pretraining-q4-conscious-memory', 'It must consciously remember reading those pages.', 'fluent fact-like output vs awareness', 'llm', 'author-created misconception', 'Tempting because the output can sound like human memory.', 'That gives the model too much mind. It has learned weights, not conscious recollection.'),
      wrong('pilot-pretraining-q4-finetuning-all', 'Fine-tuning alone explains all broad knowledge.', 'pretraining vs fine-tuning', 'fine-tuning', 'nearby-stage', 'Tempting because fine-tuning is another training phase.', 'Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.')
    ], {
      whyItHelpsModelThinking: 'Learners diagnose the common fact/source/retrieval confusion.',
      badgeMasterySupport: 'Supports source literacy without implying omniscience.',
      reviewStatus: 'remain after human review'
    })
  ],
  'overfitting-generalization': [
    question('overfitting-generalization', 1, 'applied scenario', 'application', ['training examples', 'validation examples', 'overfitting'], 'A model gets every training example right but fails on new validation examples. What problem is showing up?', [
      correct('pilot-overfitting-generalization-q1-correct', 'Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize.', 'Good diagnosis. The held-out examples reveal whether the pattern transfers.'),
      wrong('pilot-overfitting-generalization-q1-generalization', 'Generalization: the model is working well on unseen cases.', 'overfitting vs generalization', 'generalization', 'same-card', 'Tempting because both terms describe training performance.', 'Not quite. Generalization means good performance on new examples; this scenario shows the opposite.'),
      wrong('pilot-overfitting-generalization-q1-rag', 'RAG: the model retrieved too many documents.', 'evaluation failure vs retrieval system', 'rag', 'nearby-stage', 'Tempting because retrieval can affect answer quality.', 'This is not a retrieval problem. The issue is poor transfer from training examples to validation examples.'),
      wrong('pilot-overfitting-generalization-q1-inference', 'Inference: the model is simply generating one token at a time.', 'training/evaluation failure vs inference process', 'inference', 'nearby-stage', 'Tempting because all later model use involves inference.', 'Close, but inference is normal model use; overfitting is a training/evaluation failure mode.')
    ], {
      whyItHelpsModelThinking: 'Learners diagnose overfitting from train/validation behavior.',
      badgeMasterySupport: 'Builds evaluation literacy: success on seen examples is not enough.',
      reviewStatus: 'remain after human review'
    }),
    question('overfitting-generalization', 2, 'human-use judgment', 'human-use-judgment', ['held-out validation data', 'generalization'], 'Why do model builders test on held-out validation data instead of only training examples?', [
      correct('pilot-overfitting-generalization-q2-correct', 'Held-out data checks whether learned patterns work on examples the model did not train on.', 'Insight strengthened. Validation is about transfer, not memorized training performance.'),
      wrong('pilot-overfitting-generalization-q2-context', 'Validation data is used only to expand the current context window.', 'validation data vs context window', 'context window', 'nearby-stage', 'Tempting because both involve examples supplied to a system.', 'Not quite. Validation examples test the model; they are not just temporary prompt context.'),
      wrong('pilot-overfitting-generalization-q2-training-proves-all', 'Training examples alone prove the model will work everywhere.', 'training performance vs generalization', 'training-data', 'same-card', 'Tempting because high training accuracy feels reassuring.', 'This choice reveals the exact overfitting risk. Seen examples are not enough evidence.'),
      wrong('pilot-overfitting-generalization-q2-loss-truth', 'A lower loss always proves every future answer is true.', 'loss/probability vs truth guarantee', 'loss', 'nearby-stage', 'Tempting because lower loss often signals improvement.', 'Close, but lower loss is not a truth guarantee, especially outside the tested distribution.')
    ], {
      whyItHelpsModelThinking: 'Learners connect evaluation design to model behavior on new cases.',
      badgeMasterySupport: 'Supports responsible interpretation of AI benchmarks and claims.',
      reviewStatus: 'remain after human review'
    }),
    question('overfitting-generalization', 3, 'causal consequence', 'causal-consequence', ['fine-tuning', 'generalization', 'overfitting'], 'If fine-tuning makes a model excellent at one narrow template but worse on varied prompts, which boundary matters?', [
      correct('pilot-overfitting-generalization-q3-correct', 'The model may have become too narrow; useful training should preserve generalization beyond the examples.', 'Good distinction. Targeted training can help, but it can also make behavior brittle if it overfits.'),
      wrong('pilot-overfitting-generalization-q3-prompt-weights', 'This proves prompts permanently change weights during inference.', 'prompt/context vs training weight changes', 'prompt', 'nearby-stage', 'Tempting because prompts can change output behavior.', 'Not quite. The scenario is about fine-tuning/training effects, not prompts rewriting weights during inference.'),
      wrong('pilot-overfitting-generalization-q3-symbolic-better', 'This proves a rule-based AI is always better than a learned model.', 'overfitting diagnosis vs symbolic superiority claim', 'symbolic-ai', 'nearby-stage', 'Tempting because brittleness can make rules feel safer.', 'This overgeneralizes. The issue is narrow training behavior, not proof that rules are always better.'),
      wrong('pilot-overfitting-generalization-q3-refusal', 'This proves overfitting is just the model refusing to answer.', 'overfitting vs refusal/guardrail behavior', 'guardrail', 'author-created misconception', 'Tempting because poor behavior can show up as frustrating outputs.', 'Close, but overfitting is about brittle transfer from training examples, not simply a refusal behavior.')
    ], {
      whyItHelpsModelThinking: 'Learners apply overfitting/generalization to targeted adaptation.',
      badgeMasterySupport: 'Connects training choices to trustworthy human use.',
      reviewStatus: 'review by Deep Research for whether fine-tuning belongs here or later'
    })
  ]
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function mdList(items) {
  return (items ?? []).map((item) => `- ${item}`).join('\n')
}

function getDeepResearchFiles() {
  if (!fs.existsSync(checkpointDir)) return []
  return fs.readdirSync(checkpointDir)
    .filter((name) => /deep.?research/i.test(name))
    .map((name) => path.join('docs/journey/checkpoints', name))
}

function enrichOldQuestions(card) {
  const review = cardObjectives[card.learningCardId].oldReview
  return card.questions.map((question) => ({
    questionId: question.questionId,
    type: question.type,
    question: question.question,
    classification: review[question.questionId]?.classification ?? 'revise',
    rationale: review[question.questionId]?.rationale ?? 'The old draft should be checked against the model-thinking authoring standard.'
  }))
}

function createPilot() {
  const v0277 = readJson(v0277Path)
  const glossary = readJson(glossaryPath)
  const oldCardsById = new Map(v0277.cards.map((card) => [card.learningCardId, card]))
  const pilotCards = pilotIds.map((id) => {
    const oldCard = oldCardsById.get(id)
    const objective = cardObjectives[id]
    const questions = pilotQuestions[id]
    return {
      stageNumber: oldCard.stageNumber,
      stageTitle: oldCard.stageTitle,
      learningCardNumberWithinStage: oldCard.learningCardNumberWithinStage,
      learningCardId: oldCard.learningCardId,
      learningCardTitle: oldCard.learningCardTitle,
      proposedQuestionCount: questions.length,
      previousDraftQuestionCount: oldCard.proposedQuestionCount,
      draftStatus: 'pilot-only-not-live',
      learningObjectiveReview: objective,
      existingV0277DraftQuestions: enrichOldQuestions(oldCard),
      questions
    }
  })
  const questionCount = pilotCards.reduce((sum, card) => sum + card.questions.length, 0)
  const choiceCount = pilotCards.reduce((sum, card) => sum + card.questions.reduce((qSum, q) => qSum + q.choices.length, 0), 0)
  const distractorCount = pilotCards.reduce((sum, card) => sum + card.questions.reduce((qSum, q) => qSum + q.choices.filter((choice) => !choice.isCorrect).length, 0), 0)
  const modelThinkingCount = pilotCards.reduce((sum, card) => sum + card.questions.filter((q) => q.modelThinking).length, 0)
  const directDefinitionCount = pilotCards.reduce((sum, card) => sum + card.questions.filter((q) => q.directDefinition).length, 0)
  const deepResearchFiles = getDeepResearchFiles()
  return {
    version: '0.27.8-model-thinking-pilot',
    status: 'pilot-draft',
    liveMode: 'not-live',
    generatedAt: new Date().toISOString(),
    sourceDraft: 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-7-draft.json',
    glossaryLearningPathSource: 'docs/journey/checkpoints/glossary-learning-path-order-v0-27-7.json',
    deepResearchReview: deepResearchFiles.length
      ? { status: 'available', files: deepResearchFiles }
      : { status: 'not-available', note: 'No Deep Research review file was present in docs/journey/checkpoints at generation time.' },
    authoringStandard: {
      shift: 'From questions about the curriculum to questions that make the learner think through what the model is doing.',
      bannedStems: [
        'What is the best definition?',
        'Which statement is most accurate?',
        'Which phrase best describes the topic?',
        'According to this learning card...',
        'In this learning card...',
        'What did this card say?',
        'Which is better?'
      ],
      allowedQuestionTypes: [
        'mechanism in action',
        'causal consequence',
        'boundary distinction',
        'misconception diagnosis',
        'model trace',
        'human-use judgment',
        'applied scenario'
      ],
      distractorStrategy: 'Misconception-first, glossary-near distractors with stable represented terms and choice IDs.'
    },
    summary: {
      pilotScope: 'First six Journey learning cards only.',
      pilotLearningCards: pilotCards.length,
      totalPilotQuestions: questionCount,
      totalChoices: choiceCount,
      totalDistractors: distractorCount,
      modelThinkingQuestions: modelThinkingCount,
      directDefinitionQuestions: directDefinitionCount,
      modelThinkingPercent: Math.round((modelThinkingCount / questionCount) * 100),
      directDefinitionPercent: Math.round((directDefinitionCount / questionCount) * 100),
      draftStatus: 'pilot-only, not live',
      glossaryTermsAvailable: glossary.terms.length
    },
    cards: pilotCards
  }
}

function renderMarkdown(pilot) {
  const lines = []
  lines.push(`# Prompt Life ${pilot.version}`)
  lines.push('')
  lines.push('Status: pilot-only, not live.')
  lines.push('')
  lines.push('## Executive Summary')
  lines.push('')
  Object.entries(pilot.summary).forEach(([key, value]) => lines.push(`- ${key}: ${value}`))
  lines.push('')
  lines.push('## Authoring Standard')
  lines.push('')
  lines.push(pilot.authoringStandard.shift)
  lines.push('')
  lines.push('## Deep Research Review')
  lines.push('')
  lines.push(pilot.deepResearchReview.status === 'available'
    ? `Available files: ${pilot.deepResearchReview.files.join(', ')}`
    : pilot.deepResearchReview.note)
  lines.push('')
  lines.push('## Before / After Examples')
  pilot.cards.forEach((card) => {
    const oldQuestion = card.existingV0277DraftQuestions[0]
    const newQuestion = card.questions[0]
    lines.push(`- ${card.learningCardTitle}: "${oldQuestion.question}" -> "${newQuestion.question}"`)
  })
  lines.push('')
  pilot.cards.forEach((card) => {
    lines.push(`## ${card.learningCardTitle}`)
    lines.push('')
    lines.push(`Stage: ${card.stageNumber}. ${card.stageTitle}`)
    lines.push('')
    lines.push('### Learning Objective Review')
    lines.push('')
    lines.push(`Primary: ${card.learningObjectiveReview.primaryLearningObjective}`)
    lines.push('')
    lines.push('Secondary:')
    lines.push(mdList(card.learningObjectiveReview.secondaryObjectives))
    lines.push('')
    lines.push(`Model mechanism/boundary: ${card.learningObjectiveReview.modelMechanismOrBoundary}`)
    lines.push('')
    lines.push('Myths/misconceptions:')
    lines.push(mdList(card.learningObjectiveReview.mythsMisconceptionsToCorrect))
    lines.push('')
    lines.push(`Related glossary terms: ${card.learningObjectiveReview.relatedGlossaryTerms.join(', ')}`)
    lines.push(`Nearby distractor terms: ${card.learningObjectiveReview.nearbyGlossaryTermsUsefulAsDistractors.join(', ')}`)
    lines.push('')
    lines.push('### Existing v0.27.7 Draft Questions')
    lines.push('')
    card.existingV0277DraftQuestions.forEach((oldQuestion) => {
      lines.push(`- ${oldQuestion.questionId}: ${oldQuestion.question}`)
      lines.push(`  - classification: ${oldQuestion.classification}`)
      lines.push(`  - rationale: ${oldQuestion.rationale}`)
    })
    lines.push('')
    lines.push('### Rewritten v0.27.8 Pilot Questions')
    lines.push('')
    card.questions.forEach((questionItem) => {
      lines.push(`#### ${questionItem.questionId}`)
      lines.push('')
      lines.push(`Type: ${questionItem.type}`)
      lines.push(`Authoring category: ${questionItem.authoringCategory}`)
      lines.push(`Stem: ${questionItem.question}`)
      lines.push(`Correct choice ID: ${questionItem.correctChoiceId}`)
      lines.push('')
      questionItem.choices.forEach((choice) => {
        lines.push(`- ${choice.choiceId}${choice.isCorrect ? ' (correct)' : ''}: ${choice.text}`)
        lines.push(`  - feedback: ${choice.feedback}`)
        if (!choice.isCorrect) {
          lines.push(`  - represented misconception: ${choice.representedMisconception}`)
          lines.push(`  - represented glossary term: ${choice.representedGlossaryTerm}`)
          lines.push(`  - distractor source: ${choice.distractorSource}`)
          lines.push(`  - rationale: ${choice.distractorRationale}`)
        }
      })
      lines.push('')
      lines.push('Authoring notes:')
      lines.push(`- why it helps: ${questionItem.authoringNotes.whyItHelpsModelThinking}`)
      lines.push(`- badge mastery: ${questionItem.authoringNotes.badgeMasterySupport}`)
      lines.push(`- review status: ${questionItem.authoringNotes.reviewStatus}`)
      lines.push('')
    })
  })
  lines.push('## Deep Research Handoff')
  lines.push('')
  lines.push('Review this v0.27.8 Prompt Life model-thinking checkpoint pilot. For each of the first six Journey learning cards, evaluate whether the questions make the learner reason about the model rather than recall the curriculum. Check clarity, factual accuracy, distractor quality, misconception feedback, reading level, and badge-worthiness. Recommend edits, removals, and additions.')
  lines.push('')
  return `${lines.join('\n')}\n`
}

function renderHtml(pilot) {
  const beforeAfter = pilot.cards.map((card) => {
    const oldQuestion = card.existingV0277DraftQuestions[0]
    const newQuestion = card.questions[0]
    return `<li><strong>${escapeHtml(card.learningCardTitle)}</strong><br><span>v0.27.7:</span> ${escapeHtml(oldQuestion.question)}<br><span>v0.27.8:</span> ${escapeHtml(newQuestion.question)}</li>`
  }).join('')
  const cards = pilot.cards.map((card) => `
    <section class="card">
      <h2>${escapeHtml(card.learningCardTitle)}</h2>
      <p class="muted">Stage ${card.stageNumber}. ${escapeHtml(card.stageTitle)} · ${card.questions.length} pilot questions</p>
      <h3>Learning-objective review</h3>
      <p><strong>Primary:</strong> ${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</p>
      <p><strong>Mechanism/boundary:</strong> ${escapeHtml(card.learningObjectiveReview.modelMechanismOrBoundary)}</p>
      <p><strong>Related glossary:</strong> ${escapeHtml(card.learningObjectiveReview.relatedGlossaryTerms.join(', '))}</p>
      <p><strong>Nearby distractors:</strong> ${escapeHtml(card.learningObjectiveReview.nearbyGlossaryTermsUsefulAsDistractors.join(', '))}</p>
      <h3>Existing v0.27.7 draft questions</h3>
      <ul>${card.existingV0277DraftQuestions.map((oldQuestion) => `<li><strong>${escapeHtml(oldQuestion.classification)}</strong>: ${escapeHtml(oldQuestion.question)}<br><span>${escapeHtml(oldQuestion.rationale)}</span></li>`).join('')}</ul>
      <h3>Rewritten v0.27.8 pilot questions</h3>
      ${card.questions.map((questionItem) => `
        <article class="question">
          <h4>${escapeHtml(questionItem.questionId)}</h4>
          <p><strong>${escapeHtml(questionItem.type)}</strong> · ${escapeHtml(questionItem.authoringCategory)} · mechanism terms: ${escapeHtml(questionItem.explicitMechanismTerms.join(', '))}</p>
          <p class="stem">${escapeHtml(questionItem.question)}</p>
          <ol>
            ${questionItem.choices.map((choice) => `<li class="${choice.isCorrect ? 'correct' : 'wrong'}"><strong>${escapeHtml(choice.choiceId)}</strong>: ${escapeHtml(choice.text)}${choice.isCorrect ? ' <em>Correct</em>' : ''}<br><span>Feedback: ${escapeHtml(choice.feedback)}</span>${choice.isCorrect ? '' : `<br><span>Misconception: ${escapeHtml(choice.representedMisconception)} · Term: ${escapeHtml(choice.representedGlossaryTerm)} · Source: ${escapeHtml(choice.distractorSource)}</span><br><span>Rationale: ${escapeHtml(choice.distractorRationale)}</span>`}</li>`).join('')}
          </ol>
          <p><strong>Authoring note:</strong> ${escapeHtml(questionItem.authoringNotes.whyItHelpsModelThinking)}</p>
          <p><strong>Badge mastery:</strong> ${escapeHtml(questionItem.authoringNotes.badgeMasterySupport)}</p>
          <p><strong>Reviewer note:</strong> ${escapeHtml(questionItem.authoringNotes.reviewStatus)}</p>
        </article>
      `).join('')}
    </section>
  `).join('')
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Prompt Life v0.27.8 Model-Thinking Checkpoint Pilot</title>
  <style>
    :root { color-scheme: light; --ink: #0f176d; --soft: #f6f8ff; --line: #cdd7f2; --teal: #008f95; --warn: #8a5a00; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111a44; background: #f4fbfb; line-height: 1.45; }
    main { width: min(980px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 56px; }
    h1, h2, h3, h4 { color: var(--ink); line-height: 1.1; }
    h1 { font-size: clamp(2rem, 7vw, 4rem); margin-bottom: 0.3rem; }
    h2 { margin-top: 2.25rem; }
    .hero, .card, .question, .summary { background: rgba(255,255,255,0.92); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 14px 40px rgba(17,26,114,0.08); padding: 18px; margin: 16px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
    .metric { background: var(--soft); border: 1px solid var(--line); border-radius: 10px; padding: 12px; }
    .metric strong { display: block; font-size: 1.7rem; color: var(--ink); }
    .muted, span { color: #4c5579; }
    .stem { border-left: 4px solid var(--teal); padding-left: 12px; font-weight: 750; }
    li { margin: 0.45rem 0; }
    .correct { border-left: 4px solid var(--teal); padding-left: 10px; }
    .wrong { border-left: 4px solid var(--warn); padding-left: 10px; }
    code { background: #eef3ff; padding: 0.1rem 0.25rem; border-radius: 4px; }
    @media print { body { background: white; } .card, .question, .hero, .summary { break-inside: avoid; box-shadow: none; } }
  </style>
</head>
<body>
<main>
  <section class="hero">
    <p class="muted">Prompt Life v0.27.8 · pilot-only, not live</p>
    <h1>Model-Thinking Checkpoint Pilot</h1>
    <p>Authoring shift: from questions about the curriculum to questions that make the learner think through what the model is doing.</p>
  </section>
  <section class="summary">
    <h2>Executive Summary</h2>
    <div class="grid">
      <div class="metric"><strong>${pilot.summary.pilotLearningCards}</strong>pilot cards</div>
      <div class="metric"><strong>${pilot.summary.totalPilotQuestions}</strong>pilot questions</div>
      <div class="metric"><strong>${pilot.summary.totalChoices}</strong>choices</div>
      <div class="metric"><strong>${pilot.summary.totalDistractors}</strong>distractors</div>
      <div class="metric"><strong>${pilot.summary.modelThinkingPercent}%</strong>model-thinking/applied</div>
      <div class="metric"><strong>${pilot.summary.directDefinitionPercent}%</strong>direct definition</div>
    </div>
    <p><strong>Status:</strong> ${escapeHtml(pilot.summary.draftStatus)}. No normal Journey learner mode changes.</p>
    <p><strong>Deep Research review file:</strong> ${escapeHtml(pilot.deepResearchReview.status === 'available' ? pilot.deepResearchReview.files.join(', ') : pilot.deepResearchReview.note)}</p>
  </section>
  <section class="summary">
    <h2>Authoring Standard</h2>
    <p>${escapeHtml(pilot.authoringStandard.shift)}</p>
    <p>Distractors are misconception-first and glossary-near; every wrong choice includes feedback, represented misconception, represented term when applicable, source, and rationale.</p>
  </section>
  <section class="summary">
    <h2>Before / After Examples</h2>
    <ul>${beforeAfter}</ul>
  </section>
  ${cards}
  <section class="summary">
    <h2>Deep Research Handoff</h2>
    <p>Review this v0.27.8 Prompt Life model-thinking checkpoint pilot. For each of the first six Journey learning cards, evaluate whether the questions make the learner reason about the model rather than recall the curriculum. Check clarity, factual accuracy, distractor quality, misconception feedback, reading level, and badge-worthiness. Recommend edits, removals, and additions.</p>
  </section>
</main>
</body>
</html>
`
}

function writeOutputs() {
  fs.mkdirSync(checkpointDir, { recursive: true })
  const pilot = createPilot()
  fs.writeFileSync(outputJsonPath, `${JSON.stringify(pilot, null, 2)}\n`)
  fs.writeFileSync(outputMdPath, renderMarkdown(pilot))
  fs.writeFileSync(outputHtmlPath, renderHtml(pilot))
  console.log(`Generated ${pilot.summary.pilotLearningCards} pilot card entries.`)
  console.log(`Pilot questions: ${pilot.summary.totalPilotQuestions}`)
  console.log(`Choices: ${pilot.summary.totalChoices}`)
  console.log(`Distractors: ${pilot.summary.totalDistractors}`)
  console.log(`Model-thinking/applied: ${pilot.summary.modelThinkingPercent}%`)
  console.log(`Direct definition: ${pilot.summary.directDefinitionPercent}%`)
}

writeOutputs()
