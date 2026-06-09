import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const reportDir = path.join(root, 'docs/journey')
const sourcePath = path.join(root, 'src/data/checkpointBankV0279.ts')
const previousPilotPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-8-model-thinking-pilot.json')
const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-9-first-six-revised.json')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-9-first-six-revised.md')
const outputHtmlPath = path.join(reportDir, 'prompt-life-v0-27-9-first-six-checkpoint-revision-report.html')

const VERSION = '0.27.9-first-six-revised'
const ACTIVE_BANK_LABEL = 'v0.27.9-first-six'

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

function q(cardId, index, type, category, terms, question, choices, authoringNotes, humanReviewNotesApplied) {
  const correct = choices.find((choice) => choice.isCorrect)
  return {
    questionId: `v0279-${cardId}-q${index}`,
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

const revisedQuestions = {
  'what-is-llm': [
    q('what-is-llm', 1, 'mechanism in action', 'mechanism', ['LLM', 'token', 'current context', 'appends', 'repeats'], 'When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?', [
      c('v0279-what-is-llm-q1-correct', 'It scores possible next tokens from the current context, selects one, appends it, and repeats.', 'Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.'),
      w('v0279-what-is-llm-q1-conscious-reader', 'It reads with conscious understanding, then writes the whole answer at once.', 'conscious mind vs fluent model behavior', 'llm', 'same-card', 'Tempting because fluent text can sound like a human explanation.', 'Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.'),
      w('v0279-what-is-llm-q1-hidden-search', 'It searches a hidden database and copies the best matching passage.', 'search engine/database vs generative model', 'retrieval', 'author-created misconception', 'Tempting because broad model knowledge can feel like search.', 'This choice reveals a common mix-up. Search can be added around a model, but a plain LLM generates from context and learned weights.'),
      w('v0279-what-is-llm-q1-weight-change', 'It changes its weights each time the user sends a new prompt.', 'training vs inference', 'training', 'same-card', 'Tempting because the model may seem to adapt within a conversation.', 'That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.')
    ], {
      whyItHelpsModelThinking: 'The learner traces the next-token loop rather than recalling the card definition.',
      badgeMasterySupport: 'Supports the core model-literacy distinction among context, response tokens, and fixed weights.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the v0.27.8 stem.',
      'Shortened the correct answer and used selects one because sampling has not yet been introduced.',
      'Kept conscious-reader, search/database, and changing-weights distractors.'
    ]),
    q('what-is-llm', 2, 'misconception diagnosis', 'human-use-judgment', ['LLM', 'fluent explanation', 'response tokens', 'awareness'], 'An LLM gives a fluent explanation of a poem. What should a model-literate learner conclude?', [
      c('v0279-what-is-llm-q2-correct', 'It generated response tokens from context and learned patterns; fluency does not prove awareness.', 'Insight strengthened. This is the fluent-behavior-without-awareness boundary Prompt Life wants learners to hold.'),
      w('v0279-what-is-llm-q2-inner-awareness', 'It must have inner awareness because the explanation sounds human.', 'conscious mind vs fluent model behavior', 'llm', 'same-card', 'Tempting because human-like language invites human-like interpretation.', 'Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.'),
      w('v0279-what-is-llm-q2-hidden-source', 'It must have found a hidden perfect source and copied the interpretation.', 'database lookup vs learned generation', 'retrieval', 'author-created misconception', 'Tempting because polished answers can feel copied from a source.', 'Close, but this describes search or retrieval better than a plain LLM response. A fluent answer is not the same as cited evidence.'),
      w('v0279-what-is-llm-q2-prompt-learning', 'The poem prompt permanently taught the base model a new skill.', 'prompt/context change vs durable weight update', 'weight-update', 'same-card', 'Tempting because earlier context can shape later replies in a chat.', 'That would require training. A normal prompt can shape temporary context without durably updating weights.')
    ], {
      whyItHelpsModelThinking: 'The learner diagnoses a real interpretive trap: fluent explanation without inner awareness.',
      badgeMasterySupport: 'Demystifies model fluency without implying consciousness.',
      reviewStatus: 'human review edits applied'
    }, [
      'Revised the stem exactly toward model-literate learner judgment.',
      'Kept fluent-without-awareness framing in plain language.'
    ])
  ],
  'where-llms-fit': [
    q('where-llms-fit', 1, 'applied scenario', 'application', ['LLM', 'diffusion', 'generative AI', 'denoising'], 'A campus tool summarizes text with an LLM, while another creates images by denoising a noisy pattern. What does that show?', [
      c('v0279-where-llms-fit-q1-correct', 'Generative AI is a family; LLMs and diffusion models are different branches.', 'Good distinction. Generative AI is a family, and different branches can use different mechanisms.'),
      w('v0279-where-llms-fit-q1-all-llms', 'All generative AI tools are LLMs because ChatGPT is generative AI.', 'LLM vs generative AI family', 'generative-ai', 'same-card', 'Tempting because ChatGPT is many learners’ first generative AI example.', 'Not quite. An LLM is one kind of generative AI, not the whole category.'),
      w('v0279-where-llms-fit-q1-text-only-ai', 'The image tool is not AI unless it generates language tokens.', 'LLM output vs broader generative outputs', 'diffusion', 'same-card', 'Tempting because this app starts with language models.', 'Close, but image models can be AI without using the LLM text-token loop.'),
      w('v0279-where-llms-fit-q1-ai-ml-same', 'AI and machine learning are the same label, so the branches do not matter.', 'AI vs machine learning category boundary', 'machine-learning', 'same-card', 'Tempting because public language often blurs these words.', 'This choice collapses useful categories. Machine learning is a major branch inside the broader AI field.')
    ], {
      whyItHelpsModelThinking: 'The learner compares two generative model families by mechanism and output type.',
      badgeMasterySupport: 'Prevents overgeneralizing LLM lessons to every AI system.',
      reviewStatus: 'human review edits applied'
    }, [
      'Changed denoising noise to denoising a noisy pattern.',
      'Kept the generative-family versus LLM/diffusion branch distinction.'
    ]),
    q('where-llms-fit', 2, 'boundary distinction', 'boundary', ['AI', 'machine learning', 'deep learning', 'generative AI', 'LLM'], 'When people say an LLM sits inside the broader AI family, which category map is most useful?', [
      c('v0279-where-llms-fit-q2-correct', 'AI is broad; machine learning learns from data; deep learning uses layers; generative AI creates outputs; LLMs focus on language/code.', 'Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.'),
      w('v0279-where-llms-fit-q2-all-ai-llm', 'AI means LLM; machine learning, deep learning, and generative AI are just extra names.', 'all AI is an LLM', 'ai', 'same-card', 'Tempting because LLMs currently dominate public attention.', 'Not quite. LLMs are an important branch, not the root of the AI tree.'),
      w('v0279-where-llms-fit-q2-rules-learned-same', 'Rule-based AI, machine learning, and LLMs all work by following the same written rules.', 'symbolic AI vs learned model boundary', 'symbolic-ai', 'same-card', 'Tempting because all software runs instructions somewhere.', 'Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.'),
      w('v0279-where-llms-fit-q2-diffusion-same-loop', 'Diffusion models, LLMs, and search engines all use the same language-token loop.', 'diffusion vs autoregressive language generation', 'diffusion', 'same-card', 'Tempting because all can appear inside AI products.', 'This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation usually appends response tokens.')
    ], {
      whyItHelpsModelThinking: 'The learner uses a category map to avoid treating AI, app, and model mechanisms as interchangeable.',
      badgeMasterySupport: 'Supports precise institutional conversations about AI systems.',
      reviewStatus: 'human review edits applied'
    }, [
      'Shortened the correct answer while preserving the category map.',
      'Made distractors closer in length and structure.'
    ]),
    q('where-llms-fit', 3, 'model vs product distinction', 'boundary', ['chatbot product', 'LLM', 'search tool', 'safety filters', 'user interface'], 'A chatbot product includes an LLM, a search tool, safety filters, and a user interface. What is the LLM?', [
      c('v0279-where-llms-fit-q3-correct', 'The language-generating model inside the larger product.', 'Good distinction. A product may wrap an LLM with tools, policies, and interface pieces.'),
      w('v0279-where-llms-fit-q3-whole-app', 'The whole app, including every tool and button.', 'model vs product/app wrapper', 'ai', 'author-created misconception', 'Tempting because users experience the whole product as one AI thing.', 'Not quite. The product can include an LLM, but the LLM is not every surrounding tool and screen.'),
      w('v0279-where-llms-fit-q3-safety-policy', 'The safety policy that blocks some outputs.', 'policy/guardrail vs model', 'policy', 'nearby-stage', 'Tempting because safety behavior is visible in the product.', 'Close, but a safety policy shapes behavior around the model; it is not the language model itself.'),
      w('v0279-where-llms-fit-q3-search-index', 'The database or search index the app may call.', 'retrieval/search component vs language model', 'retrieval', 'author-created misconception', 'Tempting because some chatbot products include search.', 'This describes a retrieval or search component. The LLM generates language from context and learned weights.')
    ], {
      whyItHelpsModelThinking: 'The learner separates the model from the product stack around it.',
      badgeMasterySupport: 'Prevents treating ChatGPT, LLM, app, search, guardrail, and interface as the same thing.',
      reviewStatus: 'added from human review'
    }, [
      'Added the requested model-vs-product checkpoint question.',
      'Used the requested correct answer and wrong-answer feedback boundaries.'
    ])
  ],
  history: [
    q('history', 1, 'boundary distinction', 'boundary', ['rule-based system', 'LLM', 'explicit rules', 'learned weights'], 'If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?', [
      c('v0279-history-q1-correct', 'The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples.', 'Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.'),
      w('v0279-history-q1-loss-every-task', 'The rule-based system measures loss and updates weights after every task.', 'symbolic rules vs training loop', 'loss', 'same-card', 'Tempting because loss is nearby in the deep-learning explanation.', 'Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.'),
      w('v0279-history-q1-conscious-llm', 'The LLM has conscious reasoning, while the rule-based system has none.', 'conscious reasoning vs learned behavior', 'llm', 'explicit-confusable', 'Tempting because LLM language can sound like reasoning from the inside.', 'That gives the LLM too much mind. The key boundary here is learned weights versus explicit rules.'),
      w('v0279-history-q1-all-rules', 'There is no difference; both systems are just written rulebooks.', 'LLM as hand-coded rulebook', 'symbolic-ai', 'same-card', 'Tempting because both systems can produce predictable outputs.', 'Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.')
    ], {
      whyItHelpsModelThinking: 'The learner compares two system designs rather than reciting intellectual history.',
      badgeMasterySupport: 'Builds the architecture boundary needed for training/inference distinctions.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the question mostly as-is.',
      'Tightened the correct answer to emphasize explicit rules versus learned weights.'
    ]),
    q('history', 2, 'mechanism in action', 'mechanism', ['deep-learning training', 'loss', 'weights'], 'During deep-learning training, why does the system measure loss?', [
      c('v0279-history-q2-correct', 'Loss measures prediction error so an optimizer can adjust weights.', 'Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.'),
      w('v0279-history-q2-moral-good', 'Loss tells the model whether a generated answer is morally good.', 'loss vs human value judgment', 'loss', 'same-card', 'Tempting because loss sounds like a judgment word.', 'Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.'),
      w('v0279-history-q2-confidence-score', 'Loss is the model’s confidence score for the next token during generation.', 'loss vs confidence/probability during generation', 'probability', 'nearby-stage', 'Tempting because both are numerical signals related to prediction.', 'Close, but confidence or probability shapes generation. Loss measures training error so weights can be adjusted.'),
      w('v0279-history-q2-final-answer', 'Loss writes the final answer after the model has finished thinking.', 'training signal vs response generation', 'response', 'nearby-stage', 'Tempting because learners may treat every internal step as answer writing.', 'Not quite. Loss is used during training; it is not the model writing a response.')
    ], {
      whyItHelpsModelThinking: 'The learner identifies the causal role of loss inside training.',
      badgeMasterySupport: 'Loss is needed for badge-worthy understanding of how weights change.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the stem.',
      'Replaced the weak retrieval distractor with the requested confidence/probability distractor.'
    ]),
    q('history', 3, 'human-use judgment', 'human-use-judgment', ['AI product', 'learned model', 'rules', 'tools', 'policies'], 'A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?', [
      c('v0279-history-q3-correct', 'Modern AI products can combine learned models, rules, tools, and policies; the LLM inside is still a learned-pattern model.', 'Good distinction. The product can be hybrid even when the LLM itself is learned from data.'),
      w('v0279-history-q3-no-learning-if-rules', 'Any rule in the app means the LLM is no longer trained from data.', 'hybrid system vs pure symbolic replacement', 'rule-based-ai', 'same-card', 'Tempting because rule-based pieces can be visible in product behavior.', 'Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.'),
      w('v0279-history-q3-conscious-product', 'Any fluent answer means the app is consciously reasoning.', 'fluent behavior vs awareness', 'llm', 'explicit-confusable', 'Tempting because the whole app may feel conversational.', 'That gives the model too much mind. The app can combine tools and still lack conscious understanding.'),
      w('v0279-history-q3-permanent-finetune', 'Retrieval or filters permanently fine-tune the model on every use.', 'retrieval/filtering vs durable training', 'fine-tuning', 'nearby-stage', 'Tempting because the app appears to adapt to local material.', 'Close, but retrieval and filters can shape the current response without durably changing model weights.')
    ], {
      whyItHelpsModelThinking: 'The learner reasons about real product stacks, not just model families.',
      badgeMasterySupport: 'Supports institutional AI literacy: model, wrapper, tool, and policy are not the same thing.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the university app scenario.',
      'Revised the correct answer and feedback to emphasize hybrid products and learned-pattern LLMs.'
    ])
  ],
  training: [
    q('training', 1, 'mechanism in action', 'mechanism', ['training', 'target token', 'loss', 'weights'], 'During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?', [
      c('v0279-training-q1-correct', 'The training process uses the loss signal to update weights.', 'Good distinction. The durable weight update is what makes this training.'),
      w('v0279-training-q1-append-response', 'The model appends the mistaken token to a normal live response.', 'training vs autoregressive inference', 'inference', 'same-card', 'Tempting because generation also chooses and appends tokens.', 'Not quite. Appending a response token is inference behavior; training uses loss to change weights.'),
      w('v0279-training-q1-durable-memory', 'The prompt becomes durable memory stored inside the model’s weights.', 'context vs durable weight update', 'memory', 'author-created misconception', 'Tempting because chat context can feel remembered.', 'This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.'),
      w('v0279-training-q1-likelihood-truth', 'The model treats the most likely answer as automatically true.', 'likelihood vs truth', 'probability', 'nearby-stage', 'Tempting because likely answers can sound authoritative.', 'Not quite. Likelihood is not truth, and this training moment matters because loss can drive a weight update.')
    ], {
      whyItHelpsModelThinking: 'The learner locates the precise causal step that changes the model.',
      badgeMasterySupport: 'Core badge distinction: training changes weights; inference uses them.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the stem and correct answer.',
      'Replaced the premature softmax-truth distractor with the requested likelihood-vs-truth distractor.'
    ]),
    q('training', 2, 'boundary distinction', 'boundary', ['ordinary use', 'fixed weights', 'temporary context', 'chat'], 'A student asks a chatbot one question during ordinary use. Which statement is usually true?', [
      c('v0279-training-q2-correct', 'The model uses fixed weights and temporary context; the chat usually does not rewrite the weights.', 'Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.'),
      w('v0279-training-q2-permanent-update', 'The chat permanently updates the base model’s weights.', 'ordinary inference vs training update', 'training', 'same-card', 'Tempting because the model appears to adapt to the user.', 'Not quite. That would require a training process, not ordinary inference.'),
      w('v0279-training-q2-durable-memory', 'The model stores the prompt as durable memory inside its weights.', 'context vs durable memory/weights', 'memory', 'author-created misconception', 'Tempting because the model can refer to earlier chat context.', 'This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.'),
      w('v0279-training-q2-optimizer-after-response', 'The optimizer trains the model after every response.', 'optimizer/weight update vs normal response', 'weight-update', 'same-card', 'Tempting because training and inference both involve model computation.', 'Close, but optimizers update weights during training, not after every normal response.')
    ], {
      whyItHelpsModelThinking: 'The learner reasons from a familiar chat scenario to the durable/temporary boundary.',
      badgeMasterySupport: 'Reduces the myth that every user chat trains the base model.',
      reviewStatus: 'human review edits applied'
    }, [
      'Rewrote the negative stem as the requested positive stem.',
      'Used the requested correct answer and distractor set.'
    ]),
    q('training', 3, 'causal consequence', 'causal-consequence', ['training', 'parameters', 'future runs', 'inference'], 'Why can training change how the model behaves tomorrow, while inference usually cannot?', [
      c('v0279-training-q3-correct', 'Training changes parameters that future runs reuse; inference uses temporary computations for the current run.', 'Good distinction. Durable parameters carry forward; inference-time states usually do not.'),
      w('v0279-training-q3-optimizer-inference', 'Inference is where the optimizer changes weights for future runs.', 'optimizer/weight update vs inference', 'weight-update', 'same-card', 'Tempting because both training and inference run model computations.', 'Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.'),
      w('v0279-training-q3-prompt-only', 'Training only changes the visible prompt text for one response.', 'prompt/context vs weights', 'prompt', 'nearby-stage', 'Tempting because prompt text clearly changes a response.', 'Close, but prompt changes are temporary input changes; training changes learned numbers.'),
      w('v0279-training-q3-truth-guarantee', 'Training guarantees that every future answer will be true.', 'training improvement vs truth guarantee', 'probability', 'author-created misconception', 'Tempting because training sounds like making the model better.', 'This choice overclaims. Training can improve behavior, but it does not guarantee truth.')
    ], {
      whyItHelpsModelThinking: 'The learner connects durability to parameters reused by future inference.',
      badgeMasterySupport: 'Strengthens durable-versus-temporary literacy.',
      reviewStatus: 'kept from v0.27.8 with light wording cleanup'
    }, [
      'Kept the v0.27.8 stem and correct answer.'
    ]),
    q('training', 4, 'model trace', 'model-trace', ['training loop', 'example', 'prediction', 'loss', 'weight update'], 'In a training loop, which sequence is the durable learning path?', [
      c('v0279-training-q4-correct', 'Example -> prediction -> loss -> weight update.', 'Insight strengthened. That is the weight-changing path.'),
      w('v0279-training-q4-generation-loop', 'Prompt -> response token -> append -> next response token.', 'training loop vs autoregressive generation', 'autoregression', 'nearby-stage', 'Tempting because this is the model’s generation loop.', 'Close, but that sequence describes inference/generation, not training.'),
      w('v0279-training-q4-search-context', 'Search -> outside passage -> current context -> answer.', 'training vs retrieval/context', 'retrieval', 'author-created misconception', 'Tempting because outside text can improve an answer.', 'That describes a search or retrieval step. It can add temporary context; it does not by itself update weights.'),
      w('v0279-training-q4-user-correction', 'User correction -> better answer -> permanent learning inside the same chat.', 'conversation steering vs durable training', 'training', 'same-card', 'Tempting because a correction can improve the current conversation.', 'Not quite. A correction can steer the current conversation, but durable learning requires a training process.')
    ], {
      whyItHelpsModelThinking: 'The learner chooses the path with the durable update, not another plausible AI sequence.',
      badgeMasterySupport: 'Prepares learners to distinguish training, context, and generation later.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the sequence idea and correct answer.',
      'Removed the premature diffusion distractor.',
      'Added the requested user-correction distractor.'
    ])
  ],
  pretraining: [
    q('pretraining', 1, 'mechanism in action', 'mechanism', ['pretraining', 'prediction error', 'loss', 'next-token targets', 'weights'], 'During pretraining, what signal teaches the model broad language patterns across many examples?', [
      c('v0279-pretraining-q1-correct', 'Repeated prediction error/loss from next-token targets changes weights over many training steps.', 'Good distinction. Pretraining scales the training loop across many examples.'),
      w('v0279-pretraining-q1-live-chat', 'A user conversation at deployment permanently rewrites the model.', 'pretraining vs inference', 'inference', 'same-card', 'Tempting because the model can seem to adapt inside a chat.', 'Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.'),
      w('v0279-pretraining-q1-written-rules', 'A human writes every rule the model will follow.', 'learned patterns vs symbolic rules', 'symbolic-ai', 'nearby-stage', 'Tempting because software often has hand-written rules.', 'Close, but pretraining is learned from examples, not a complete rulebook written by hand.'),
      w('v0279-pretraining-q1-perfect-copy', 'The model stores a perfect copy of every source document.', 'pattern learning vs perfect source recall', 'training-data', 'same-card', 'Tempting because source data influences the model.', 'This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.')
    ], {
      whyItHelpsModelThinking: 'The learner identifies the training signal that builds broad capability.',
      badgeMasterySupport: 'Connects next-token prediction to durable weight learning.',
      reviewStatus: 'kept mostly as-is'
    }, [
      'Kept the v0.27.8 stem and correct answer mostly as-is.'
    ]),
    q('pretraining', 2, 'boundary distinction', 'boundary', ['pretraining', 'weights', 'source library'], 'Why can pretraining create broad capability without making the model a perfect library of its sources?', [
      c('v0279-pretraining-q2-correct', 'It shapes statistical patterns in weights; it does not create a searchable copy of every source.', 'Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.'),
      w('v0279-pretraining-q2-private-files', 'It gives the model direct access to every private file on demand.', 'training data vs universal file access', 'training-data', 'same-card', 'Tempting because broad training data can sound like broad access.', 'Not quite. Training data exposure is not the same as access to every private file.'),
      w('v0279-pretraining-q2-search-context', 'It inserts the original source into every future prompt context.', 'pretraining vs retrieval/context', 'retrieval', 'author-created misconception', 'Tempting because source material can sometimes be added to a prompt.', 'Close, but adding source text to context is different from pretraining. Pretraining changes weights before use.'),
      w('v0279-pretraining-q2-after-user-prompt', 'It happens only after a user asks a specific question.', 'pretraining vs deployment-time inference', 'inference', 'same-card', 'Tempting because learners meet the model only during use.', 'Pretraining happens before deployment. The user prompt later uses the pretrained weights.')
    ], {
      whyItHelpsModelThinking: 'The learner reasons about what weights can and cannot contain.',
      badgeMasterySupport: 'Supports nuanced memory, privacy, and retrieval literacy.',
      reviewStatus: 'human review edits applied'
    }, [
      'Revised the correct answer to avoid conscious-recall framing.',
      'Used searchable copy of every source wording.'
    ]),
    q('pretraining', 3, 'causal consequence', 'causal-consequence', ['pretraining examples', 'weights', 'future prompts'], 'If pretraining examples include many styles and task shapes, what can change inside the model?', [
      c('v0279-pretraining-q3-correct', 'Weights can shift so future prompts activate more useful language/code patterns.', 'Good distinction. Pretraining changes reusable model structure before later prompts arrive.'),
      w('v0279-pretraining-q3-current-context', 'The model’s current chat context becomes permanently larger.', 'pretraining weights vs temporary context', 'context window', 'nearby-stage', 'Tempting because context also affects output.', 'Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.'),
      w('v0279-pretraining-q3-interface', 'Only the app’s buttons, labels, or interface change.', 'model weights vs product interface', 'foundation-model', 'nearby-stage', 'Tempting because users meet models through apps.', 'This describes product UI changes, not the model’s learned parameters.'),
      w('v0279-pretraining-q3-safety-policy', 'Only a safety policy is added around the model.', 'pretraining vs product policy wrapper', 'policy', 'nearby-stage', 'Tempting because products often include safety behavior.', 'Close, but a policy can shape a product around the model; pretraining changes the model’s reusable weights.')
    ], {
      whyItHelpsModelThinking: 'The learner connects broad examples to future behavior through weights.',
      badgeMasterySupport: 'Builds a model-centered explanation for broad capability.',
      reviewStatus: 'human review edits applied'
    }, [
      'Replaced the citation-list distractor with current chat context becomes permanently larger.'
    ]),
    q('pretraining', 4, 'misconception diagnosis', 'misconception-check', ['base model', 'fact-like text', 'pretraining', 'retrieving'], 'A base model produces fact-like text about public topics. What is the model-literate explanation?', [
      c('v0279-pretraining-q4-correct', 'Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page.', 'Insight strengthened. Source-like output can come from pretrained patterns, but it is not the same as cited evidence.'),
      w('v0279-pretraining-q4-web-every-time', 'It must be browsing the web by itself for every answer.', 'pretraining vs web retrieval', 'retrieval', 'nearby-stage', 'Tempting because web search is a familiar way to find facts.', 'Not quite. Some systems browse or retrieve, but a base model can also generate fact-like text from pretrained weights.'),
      w('v0279-pretraining-q4-conscious-memory', 'It must consciously remember reading those pages.', 'fluent fact-like output vs awareness', 'llm', 'author-created misconception', 'Tempting because the output can sound like human memory.', 'That gives the model too much mind. It has learned weights, not conscious recollection.'),
      w('v0279-pretraining-q4-finetuning-alone', 'Fine-tuning alone explains all broad model knowledge.', 'pretraining vs fine-tuning', 'fine-tuning', 'nearby-stage', 'Tempting because fine-tuning is another training phase.', 'Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.')
    ], {
      whyItHelpsModelThinking: 'The learner diagnoses fact-like generation without treating it as live source lookup.',
      badgeMasterySupport: 'Supports source literacy without implying omniscience.',
      reviewStatus: 'human review edits applied'
    }, [
      'Changed the stem to avoid seems to know.',
      'Kept web browsing, conscious memory, and fine-tuning distractors.',
      'Clarified that source-like output is not cited evidence.'
    ])
  ],
  'overfitting-generalization': [
    q('overfitting-generalization', 1, 'applied scenario', 'application', ['training examples', 'validation examples', 'overfitting', 'generalize'], 'A model gets every training example right but fails on new validation examples. What problem is showing up?', [
      c('v0279-overfitting-generalization-q1-correct', 'Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize.', 'Good diagnosis. The held-out examples reveal whether the pattern transfers.'),
      w('v0279-overfitting-generalization-q1-generalization', 'Generalization: the model is working well on unseen cases.', 'overfitting vs generalization', 'generalization', 'same-card', 'Tempting because both terms describe training performance.', 'Not quite. Generalization means good performance on new examples; this scenario shows the opposite.'),
      w('v0279-overfitting-generalization-q1-better-training', 'Better training: the model has clearly learned the general rule.', 'training performance vs validation failure', 'training-data', 'same-card', 'Tempting because perfect training performance feels reassuring.', 'Not quite. If it fails on new validation examples, high training performance is not enough evidence of generalization.'),
      w('v0279-overfitting-generalization-q1-inference', 'Inference: the model is simply generating one token at a time.', 'training/evaluation failure vs inference process', 'inference', 'nearby-stage', 'Tempting because all later model use involves inference.', 'Close, but inference is normal model use; overfitting is a training/evaluation failure mode.')
    ], {
      whyItHelpsModelThinking: 'The learner diagnoses overfitting from train/validation behavior.',
      badgeMasterySupport: 'Builds evaluation literacy: success on seen examples is not enough.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the stem and correct answer.',
      'Replaced the RAG distractor with better training.'
    ]),
    q('overfitting-generalization', 2, 'human-use judgment', 'human-use-judgment', ['held-out validation data', 'training examples', 'generalization'], 'Why do model builders test on held-out validation data instead of only training examples?', [
      c('v0279-overfitting-generalization-q2-correct', 'Held-out data checks whether learned patterns work on examples the model did not train on.', 'Insight strengthened. Validation is about transfer, not memorized training performance.'),
      w('v0279-overfitting-generalization-q2-extra-training', 'Validation data is just extra training data used to lower loss.', 'validation data vs training data', 'validation-data', 'same-card', 'Tempting because validation examples can look like more examples.', 'Not quite. Validation data is held out to check transfer; it should not simply be another set of examples used to fit weights.'),
      w('v0279-overfitting-generalization-q2-training-proves-all', 'Training examples alone prove the model will work everywhere.', 'training performance vs generalization', 'training-data', 'same-card', 'Tempting because high training accuracy feels reassuring.', 'This choice reveals the exact overfitting risk. Seen examples are not enough evidence.'),
      w('v0279-overfitting-generalization-q2-loss-truth', 'A lower loss always proves every future answer is true.', 'loss/probability vs truth guarantee', 'loss', 'nearby-stage', 'Tempting because lower loss often signals improvement.', 'Close, but lower loss is not a truth guarantee, especially outside the tested examples.')
    ], {
      whyItHelpsModelThinking: 'The learner connects evaluation design to model behavior on new cases.',
      badgeMasterySupport: 'Supports responsible interpretation of AI benchmarks and claims.',
      reviewStatus: 'human review edits applied'
    }, [
      'Kept the stem and correct answer.',
      'Replaced the context-window distractor with validation-as-extra-training.'
    ]),
    q('overfitting-generalization', 3, 'causal consequence', 'causal-consequence', ['trained heavily', 'narrow answer template', 'varied new prompts', 'generalizes'], 'A model trained heavily on one narrow answer template works on that template but struggles with varied new prompts. What should a model-literate learner suspect?', [
      c('v0279-overfitting-generalization-q3-correct', 'It may have fit the narrow examples too closely instead of learning a pattern that generalizes.', 'Good distinction. Targeted training can help, but narrow training can also make behavior brittle.'),
      w('v0279-overfitting-generalization-q3-prompt-rewrite', 'The prompts permanently rewrote the model during inference.', 'prompt/context vs training weight changes', 'prompt', 'nearby-stage', 'Tempting because prompts can change output behavior.', 'Not quite. The issue is training behavior, not prompts rewriting weights during inference.'),
      w('v0279-overfitting-generalization-q3-conscious-choice', 'The model is definitely conscious but choosing not to answer.', 'brittle transfer vs intention/conscious choice', 'llm', 'author-created misconception', 'Tempting because poor behavior can seem intentional.', 'That gives the model too much mind. The issue is brittle transfer, not intention.'),
      w('v0279-overfitting-generalization-q3-rules-always-better', 'Rule-based AI is always better than learned models.', 'overfitting diagnosis vs symbolic superiority claim', 'symbolic-ai', 'nearby-stage', 'Tempting because brittleness can make rules feel safer.', 'This overgeneralizes. The issue is narrow training behavior, not proof that rules always beat learned models.')
    ], {
      whyItHelpsModelThinking: 'The learner applies overfitting/generalization without relying on fine-tuning as the main frame.',
      badgeMasterySupport: 'Connects training choices to trustworthy human use.',
      reviewStatus: 'human review edits applied'
    }, [
      'Rewrote the stem without fine-tuning as the main frame.',
      'Used the requested distractors and feedback boundaries.'
    ])
  ]
}

const reviewSummaries = {
  'what-is-llm': {
    kept: ['Q1 mechanism stem and core distractor set.'],
    revised: ['Q1 correct answer shortened.', 'Q2 stem and correct answer revised for model-literate judgment.'],
    added: [],
    removed: []
  },
  'where-llms-fit': {
    kept: ['Q1 family/branch distinction.', 'Q2 category-map purpose.'],
    revised: ['Q1 denoising wording.', 'Q2 shorter correct answer and length-balanced distractors.'],
    added: ['Q3 model-vs-product distinction.'],
    removed: []
  },
  history: {
    kept: ['Q1 rule-based versus learned weights scenario.', 'Q2 loss mechanism stem.', 'Q3 university AI app scenario.'],
    revised: ['Q2 replaced weak retrieval distractor with confidence/probability distractor.', 'Q3 correct answer and feedback tightened.'],
    added: [],
    removed: []
  },
  training: {
    kept: ['Q1 stem and correct answer.', 'Q3 durability question.', 'Q4 training-loop sequence.'],
    revised: ['Q1 replaced softmax-truth distractor.', 'Q2 rewritten as a positive stem.', 'Q4 replaced diffusion distractor with user-correction misconception.'],
    added: [],
    removed: []
  },
  pretraining: {
    kept: ['Q1 signal/next-token-loss question.', 'Q4 core fact-like-output scenario.'],
    revised: ['Q2 avoids conscious-recall wording.', 'Q3 replaced citation-list distractor.', 'Q4 avoids seems-to-know stem and clarifies source-like output is not evidence.'],
    added: [],
    removed: []
  },
  'overfitting-generalization': {
    kept: ['Q1 and Q2 core stems and correct answers.'],
    revised: ['Q1 replaced RAG distractor.', 'Q2 replaced context-window distractor.', 'Q3 rewritten without fine-tuning as the main frame.'],
    added: [],
    removed: []
  }
}

function makeBank() {
  const previous = readJson(previousPilotPath)
  const previousById = new Map(previous.cards.map((card) => [card.learningCardId, card]))
  const cards = Object.entries(revisedQuestions).map(([lessonId, questions]) => {
    const previousCard = previousById.get(lessonId)
    return {
      stageNumber: previousCard.stageNumber,
      stageTitle: previousCard.stageTitle,
      learningCardNumberWithinStage: previousCard.learningCardNumberWithinStage,
      learningCardId: previousCard.learningCardId,
      learningCardTitle: previousCard.learningCardTitle,
      previousPilotQuestionCount: previousCard.proposedQuestionCount,
      revisedQuestionCount: questions.length,
      status: 'active-development-pilot',
      learningObjectiveReview: previousCard.learningObjectiveReview,
      humanReviewSummary: reviewSummaries[lessonId],
      questions
    }
  })
  const totalQuestions = cards.reduce((sum, card) => sum + card.questions.length, 0)
  const totalChoices = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.length, 0), 0)
  const totalDistractors = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.filter((choice) => !choice.isCorrect).length, 0), 0)
  return {
    version: VERSION,
    status: 'active-development-pilot',
    activeByDefault: true,
    activeBankLabel: ACTIVE_BANK_LABEL,
    legacyFallback: {
      queryParameters: ['?legacyCheckpoints=1', '?checkpointBank=legacy'],
      description: 'Add either query parameter to the app URL to restore the previous single-question checkpoints for development testing.'
    },
    generatedAt: new Date().toISOString(),
    sourcePilot: 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-8-model-thinking-pilot.json',
    preservedArtifacts: [
      'docs/journey/checkpoints/checkpoint-question-bank-v0-27-7-draft.json',
      'docs/journey/checkpoints/checkpoint-question-bank-v0-27-8-model-thinking-pilot.json'
    ],
    summary: {
      learningCardsRevised: cards.length,
      totalQuestions,
      totalChoices,
      totalDistractors,
      appStatus: 'development-only live pilot',
      activeLessonIds: cards.map((card) => card.learningCardId),
      activeLessonTitles: cards.map((card) => card.learningCardTitle)
    },
    qualityChecklist: {
      modelThinkingNotCurriculumRecall: true,
      eachQuestionNamesMechanismOrScenario: true,
      answerChoicesSimilarLengthWherePractical: true,
      wrongAnswerNoRevealPreservedByRenderer: true,
      feedbackMapsByStableChoiceId: true,
      everyWrongAnswerHasFeedback: true,
      noBestDefinitionStemsRemain: true,
      futureStageJargonReducedOrExplained: true
    },
    cards
  }
}

function toRuntimeBank(bank) {
  return Object.fromEntries(bank.cards.map((card) => [
    card.learningCardId,
    {
      questions: card.questions.map((question) => {
        const correct = question.choices.find((choice) => choice.isCorrect)
        return {
          id: question.questionId,
          question: question.question,
          choices: question.choices.map((choice) => ({
            choiceId: choice.choiceId,
            text: choice.text
          })),
          answer: correct.text,
          correctChoiceId: correct.choiceId,
          explain: correct.feedback,
          feedback: Object.fromEntries(question.choices.map((choice) => [choice.choiceId, choice.feedback]))
        }
      })
    }
  ]))
}

function renderMarkdown(bank) {
  const lines = [
    `# Prompt Life ${VERSION}`,
    '',
    'Status: active-development-pilot for the first six Journey learning cards.',
    '',
    '## Executive Summary',
    '',
    `- Six learning cards revised: ${bank.summary.learningCardsRevised}`,
    `- Total questions: ${bank.summary.totalQuestions}`,
    `- Total choices: ${bank.summary.totalChoices}`,
    `- Wrong-answer distractors: ${bank.summary.totalDistractors}`,
    `- App status: ${bank.summary.appStatus}`,
    `- Active by default: ${bank.activeByDefault}`,
    `- Legacy fallback: ${bank.legacyFallback.queryParameters.join(' or ')}`,
    '',
    '## Active Learning Cards',
    '',
    ...bank.summary.activeLessonTitles.map((title) => `- ${title}`),
    ''
  ]

  bank.cards.forEach((card) => {
    lines.push(`## ${card.learningCardTitle}`, '')
    lines.push('### Human-review edits applied', '')
    ;['kept', 'revised', 'added', 'removed'].forEach((key) => {
      const values = card.humanReviewSummary[key]
      lines.push(`- ${key}: ${values.length ? values.join('; ') : 'None'}`)
    })
    lines.push('', '### Final checkpoint questions', '')
    card.questions.forEach((question) => {
      lines.push(`#### ${question.questionId}`, '')
      lines.push(`- Type: ${question.type}`)
      lines.push(`- Stem: ${question.question}`)
      lines.push(`- Correct choice ID: ${question.correctChoiceId}`)
      lines.push('')
      question.choices.forEach((choice) => {
        lines.push(`- ${choice.choiceId}${choice.isCorrect ? ' (correct)' : ''}: ${choice.text}`)
        lines.push(`  - feedback: ${choice.feedback}`)
        if (!choice.isCorrect) {
          lines.push(`  - represented misconception: ${choice.representedMisconception}`)
          lines.push(`  - represented glossary term: ${choice.representedGlossaryTerm}`)
          lines.push(`  - distractor source: ${choice.distractorSource}`)
          lines.push(`  - distractor rationale: ${choice.distractorRationale}`)
        }
      })
      lines.push('')
      lines.push('Human review notes applied:')
      question.humanReviewNotesApplied.forEach((note) => lines.push(`- ${note}`))
      lines.push('')
    })
  })

  return `${lines.join('\n')}\n`
}

function renderHtml(bank) {
  const cardsHtml = bank.cards.map((card) => `
    <section class="card">
      <h2>${escapeHtml(card.learningCardTitle)}</h2>
      <p class="muted">Stage ${card.stageNumber}. ${escapeHtml(card.stageTitle)} · ${card.revisedQuestionCount} checkpoint questions</p>
      <h3>Human-review edits applied</h3>
      <ul>
        <li><strong>Kept:</strong> ${escapeHtml(card.humanReviewSummary.kept.join('; ') || 'None')}</li>
        <li><strong>Revised:</strong> ${escapeHtml(card.humanReviewSummary.revised.join('; ') || 'None')}</li>
        <li><strong>Added:</strong> ${escapeHtml(card.humanReviewSummary.added.join('; ') || 'None')}</li>
        <li><strong>Removed:</strong> ${escapeHtml(card.humanReviewSummary.removed.join('; ') || 'None')}</li>
      </ul>
      <h3>Learning objectives</h3>
      <p><strong>Primary:</strong> ${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</p>
      <p><strong>Mechanism/boundary:</strong> ${escapeHtml(card.learningObjectiveReview.modelMechanismOrBoundary)}</p>
      <p><strong>Glossary-near distractors:</strong> ${escapeHtml(card.learningObjectiveReview.nearbyGlossaryTermsUsefulAsDistractors.join(', '))}</p>
      <h3>Final revised checkpoint questions</h3>
      ${card.questions.map((question) => `
        <article class="question">
          <h4>${escapeHtml(question.questionId)}</h4>
          <p><strong>${escapeHtml(question.type)}</strong> · ${escapeHtml(question.authoringCategory)} · mechanism/scenario terms: ${escapeHtml(question.explicitMechanismTerms.join(', '))}</p>
          <p class="stem">${escapeHtml(question.question)}</p>
          <ol>
            ${question.choices.map((choice) => `<li class="${choice.isCorrect ? 'correct' : 'wrong'}"><strong>${escapeHtml(choice.choiceId)}</strong>: ${escapeHtml(choice.text)}${choice.isCorrect ? ' <em>Correct</em>' : ''}<br><span>Feedback: ${escapeHtml(choice.feedback)}</span>${choice.isCorrect ? '' : `<br><span>Misconception: ${escapeHtml(choice.representedMisconception)} · Term: ${escapeHtml(choice.representedGlossaryTerm)} · Source: ${escapeHtml(choice.distractorSource)}</span><br><span>Rationale: ${escapeHtml(choice.distractorRationale)}</span>`}</li>`).join('')}
          </ol>
          <p><strong>Human review notes:</strong> ${escapeHtml(question.humanReviewNotesApplied.join('; '))}</p>
        </article>
      `).join('')}
    </section>
  `).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Prompt Life v0.27.9 First-Six Checkpoint Revision Report</title>
  <style>
    :root { color-scheme: light; --ink: #111a72; --soft: #f6f8ff; --line: #cdd7f2; --teal: #008f95; --warn: #8a5a00; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111a44; background: #f4fbfb; line-height: 1.45; }
    main { width: min(1040px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 56px; }
    h1, h2, h3, h4 { color: var(--ink); line-height: 1.1; }
    h1 { font-size: clamp(2rem, 7vw, 4rem); margin-bottom: 0.3rem; }
    .hero, .card, .question, .summary { background: rgba(255,255,255,0.93); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 14px 40px rgba(17,26,114,0.08); padding: 18px; margin: 16px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
    .metric { background: var(--soft); border: 1px solid var(--line); border-radius: 10px; padding: 12px; }
    .metric strong { display: block; font-size: 1.7rem; color: var(--ink); }
    .muted, span { color: #4c5579; }
    .stem { border-left: 4px solid var(--teal); padding-left: 12px; font-weight: 750; }
    li { margin: 0.45rem 0; }
    .correct { border-left: 4px solid var(--teal); padding-left: 10px; }
    .wrong { border-left: 4px solid var(--warn); padding-left: 10px; }
    @media print { body { background: white; } .card, .question, .hero, .summary { break-inside: avoid; box-shadow: none; } }
  </style>
</head>
<body>
<main>
  <section class="hero">
    <p class="muted">Prompt Life v0.27.9 · development-only live pilot</p>
    <h1>First-Six Checkpoint Revision Report</h1>
    <p>The revised model-thinking checkpoint bank is active by default for development testing on the first six Journey learning cards. Add <code>?legacyCheckpoints=1</code> or <code>?checkpointBank=legacy</code> to restore the previous single-question checkpoints.</p>
  </section>
  <section class="summary">
    <h2>Executive Summary</h2>
    <div class="grid">
      <div class="metric"><strong>${bank.summary.learningCardsRevised}</strong>learning cards</div>
      <div class="metric"><strong>${bank.summary.totalQuestions}</strong>questions</div>
      <div class="metric"><strong>${bank.summary.totalChoices}</strong>choices</div>
      <div class="metric"><strong>${bank.summary.totalDistractors}</strong>distractors</div>
      <div class="metric"><strong>${bank.activeByDefault ? 'Yes' : 'No'}</strong>active by default</div>
      <div class="metric"><strong>Legacy</strong>${escapeHtml(bank.legacyFallback.queryParameters.join(' or '))}</div>
    </div>
    <p><strong>Active learning cards:</strong> ${escapeHtml(bank.summary.activeLessonTitles.join(', '))}</p>
  </section>
  <section class="summary">
    <h2>Quality Checklist</h2>
    <ul>${Object.entries(bank.qualityChecklist).map(([key, value]) => `<li>${escapeHtml(key)}: ${value ? 'confirmed' : 'not confirmed'}</li>`).join('')}</ul>
  </section>
  ${cardsHtml}
</main>
</body>
</html>
`
}

function renderSource(bank) {
  const runtimeBank = toRuntimeBank(bank)
  return `// Generated by scripts/generate-checkpoint-live-pilot-v0279.mjs.
// This development pilot overrides only the first six Journey checkpoints.

export const ACTIVE_CHECKPOINT_BANK = '${ACTIVE_BANK_LABEL}'

export const FIRST_SIX_CHECKPOINT_BANK_V0279 = ${JSON.stringify(runtimeBank, null, 2)} as const

export type CheckpointBankLessonId = keyof typeof FIRST_SIX_CHECKPOINT_BANK_V0279

export function hasV0279CheckpointBank(lessonId: string): lessonId is CheckpointBankLessonId {
  return Object.prototype.hasOwnProperty.call(FIRST_SIX_CHECKPOINT_BANK_V0279, lessonId)
}
`
}

function writeOutputs() {
  fs.mkdirSync(checkpointDir, { recursive: true })
  const bank = makeBank()
  fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)
  fs.writeFileSync(outputMdPath, renderMarkdown(bank))
  fs.writeFileSync(outputHtmlPath, renderHtml(bank))
  fs.writeFileSync(sourcePath, renderSource(bank))
  console.log(`Generated ${bank.summary.learningCardsRevised} revised card entries.`)
  console.log(`Questions: ${bank.summary.totalQuestions}`)
  console.log(`Choices: ${bank.summary.totalChoices}`)
  console.log(`Distractors: ${bank.summary.totalDistractors}`)
  console.log(`Source: ${path.relative(root, sourcePath)}`)
}

writeOutputs()
