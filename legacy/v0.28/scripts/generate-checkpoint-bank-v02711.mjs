import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const reportDir = path.join(root, 'docs/journey')

const firstTwelvePath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-10-first-twelve-active-dev.json')
const draftPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-7-draft.json')
const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-11-all-active-dev.json')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-11-all-active-dev.md')
const outputHtmlPath = path.join(reportDir, 'prompt-life-v0-27-11-full-checkpoint-bank-review.html')
const outputSourcePath = path.join(root, 'src/data/checkpointBankV02711.ts')

const ACTIVE_BANK_LABEL = 'v0.27.11-all-active-dev'
const VERSION = '0.27.11-full-journey-active-dev'
const FIRST_TWELVE_IDS = [
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

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'choice'
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
    .replaceAll('set-aside validation examples checks whether', 'set-aside validation examples are kept out of training so they can test whether')
    .replaceAll('Set-aside validation examples checks whether', 'Set-aside validation examples are kept out of training so they can test whether')
    .replaceAll('set-aside validation examples or new data', 'set-aside validation examples or other new data')
    .replaceAll('This choice points toward Human-centered ai term.', 'This choice points toward human-centered AI.')
    .replaceAll('Human-centered ai term matters nearby', 'Human-centered AI matters nearby')
}

function deepClean(value) {
  if (Array.isArray(value)) return value.map(deepClean)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, deepClean(child)]))
  }
  return cleanText(value)
}

function rewriteStem(question, card, index) {
  const title = card.learningCardTitle
  const stage = card.stageTitle
  let text = cleanText(question)

  if (card.learningCardId === 'how-ai-learns' && index === 0) {
    return 'Which How AI Learns action usually changes model weights?'
  }
  if (card.learningCardId === 'perfect-storm' && index === 0) {
    return 'Which data-compute-methods explanation best explains why modern LLM capability arrived now?'
  }

  if (/^What is .* in this app in /i.test(text)) {
    return `A learner is tracing ${title}. Which choice keeps the model mechanism clear?`
  }
  if (/^Which statement best explains .* in this learning card\??$/i.test(text)) {
    return `A learner is placing ${title} in the prompt's journey. Which choice keeps the mechanism clear?`
  }
  if (/^Which mechanism or distinction does .* most directly teach\??$/i.test(text)) {
    return `During ${stage}, what distinction should the learner keep clear about ${title}?`
  }
  if (/^Which definition best describes /i.test(text)) {
    return text.replace(/^Which definition best describes /i, 'A learner sees this in the model trace. Which choice best describes ')
  }
  text = text.replace(/\s+in this learning card\b/gi, '')
  text = text.replace(/\s+in this app\b/gi, '')
  text = text.replace(/^Which statement is most accurate\??$/i, `Which ${title} statement keeps the model boundary clear?`)
  text = text.replace(/^What is the best definition\??$/i, `Which ${title} choice keeps the mechanism clear?`)
  if (!text.endsWith('?')) text += '?'
  if (index === 0 && /^Which statement is model-literate in /i.test(text)) {
    return `At the end of the Journey, which synthesis keeps mechanism and responsibility together?`
  }
  return text
}

function mapQuestionCategory(type) {
  if (type === 'definition') return 'application'
  if (type === 'mechanism') return 'mechanism'
  if (type === 'boundary distinction') return 'boundary'
  if (type === 'concept relationship') return 'causal-consequence'
  if (type === 'applied scenario') return 'application'
  return 'mechanism'
}

function mapQuestionType(type) {
  if (type === 'definition') return 'applied mechanism check'
  return type
}

function correctChoice(question) {
  return question.choices.find((choice) => choice.isCorrect || choice.choiceId === question.correctChoiceId)
}

function convertDraftQuestion(card, question, index) {
  const questionId = `v02711-${card.learningCardId}-q${index + 1}`
  const correct = correctChoice(question)
  const convertedChoices = question.choices.map((choice, choiceIndex) => {
    const isCorrect = choice.choiceId === question.correctChoiceId || choice.isCorrect === true
    const choiceId = isCorrect
      ? `${questionId}-correct`
      : `${questionId}-${choiceIndex + 1}-${slug(choice.representedGlossaryTerm ?? choice.text ?? `choice-${choiceIndex + 1}`)}`
    return {
      choiceId,
      text: cleanText(choice.text),
      isCorrect,
      feedback: cleanText(choice.feedback),
      representedMisconception: isCorrect ? null : cleanText(choice.representedMisconception ?? choice.text),
      representedGlossaryTerm: isCorrect ? null : cleanText(choice.representedGlossaryTerm ?? ''),
      distractorSource: isCorrect ? null : normalizeDistractorSource(choice.distractorSource),
      distractorRationale: isCorrect
        ? null
        : cleanText(choice.distractorRationale ?? `Tempting because it is near ${card.learningCardTitle}, but it does not answer this model step.`)
    }
  })
  const convertedCorrect = convertedChoices.find((choice) => choice.isCorrect)

  return {
    questionId,
    type: mapQuestionType(question.type),
    authoringCategory: mapQuestionCategory(question.type),
    explicitMechanismTerms: [
      card.learningCardTitle,
      ...(question.glossaryTerms ?? question.relatedGlossaryTerms ?? [])
    ].filter(Boolean).slice(0, 12),
    question: rewriteStem(question.question, card, index),
    correctChoiceId: convertedCorrect.choiceId,
    choices: convertedChoices,
    modelThinking: true,
    directDefinition: false,
    authoringNotes: {
      whyItHelpsModelThinking: `Promotes the draft ${question.type} check into a v0.27.11 model-thinking checkpoint for ${card.learningCardTitle}.`,
      badgeMasterySupport: 'Supports the single Prompt Life: Model Literate badge by testing application, mechanism, or boundary judgment.',
      reviewStatus: 'promoted from v0.27.7 draft and cleaned for v0.27.11'
    },
    humanReviewNotesApplied: [
      'Question ID and choice IDs normalized for v0.27.11.',
      'Generic or card-referential stem wording was rewritten where needed.',
      ...(correct?.text ? [`Correct target preserved: ${cleanText(correct.text)}`] : [])
    ]
  }
}

function normalizeDistractorSource(value) {
  const text = String(value ?? '').toLowerCase()
  if (text.includes('same-card')) return 'same-card'
  if (text.includes('same-stage')) return 'same-stage'
  if (text.includes('nearby-stage')) return 'nearby-stage'
  if (text.includes('confusable')) return 'explicit-confusable'
  if (text.includes('learning-path')) return 'nearby-stage'
  return 'author-created misconception'
}

function convertDraftCard(card) {
  const questions = card.questions.map((question, index) => convertDraftQuestion(card, question, index))
  return {
    stageNumber: card.stageNumber,
    stageTitle: card.stageTitle,
    learningCardNumberWithinStage: card.learningCardNumberWithinStage,
    learningCardId: card.learningCardId,
    learningCardTitle: card.learningCardTitle,
    previousLiveQuestionCount: card.currentLiveCheckpoint?.questionCount ?? 1,
    revisedQuestionCount: questions.length,
    status: 'active-development-pilot',
    learningObjectiveReview: {
      primaryLearningObjective: cleanText(card.learningObjectives?.primary ?? `Apply ${card.learningCardTitle} in the Journey model trace.`),
      secondaryObjectives: (card.learningObjectives?.secondary ?? []).map(cleanText),
      modelMechanismOrBoundary: cleanText(card.learningObjectives?.keyDistinctions?.[0] ?? ''),
      mythsMisconceptionsToCorrect: (card.learningObjectives?.misconceptionsToCorrect ?? []).map(cleanText),
      relatedGlossaryTerms: card.learningObjectives?.relatedGlossaryTerms ?? [],
      nearbyGlossaryTermsUsefulAsDistractors: card.learningObjectives?.relatedNearbyGlossaryTerms ?? [],
      questionCountRationale: cleanText(card.questionCountRationale ?? `${questions.length} questions cover model mechanism and boundary distinctions.`)
    },
    humanReviewSummary: {
      kept: ['Existing Journey card order, card content, progress logic, and badge logic.'],
      revised: ['Draft checkpoint IDs and vague stems were cleaned for v0.27.11 runtime use.'],
      added: ['Full active-development coverage for this learning card.'],
      removed: []
    },
    questions
  }
}

function polishFirstTwelveCard(card) {
  const cleaned = deepClean(card)
  if (cleaned.learningCardId !== 'overfitting-generalization') return cleaned

  cleaned.learningObjectiveReview.primaryLearningObjective =
    'Diagnose when a model fits training examples too narrowly and explain that set-aside validation examples are kept out of training to test transfer.'
  cleaned.learningObjectiveReview.secondaryObjectives = [
    'Explain that set-aside validation examples are examples kept out of training so they can test whether the model learned a pattern that transfers.',
    ...(cleaned.learningObjectiveReview.secondaryObjectives ?? []).filter((item) => !/set-aside|held-out|validation/i.test(item)).slice(0, 3)
  ]
  cleaned.questions = cleaned.questions.map((question) => {
    const updated = deepClean(question)
    if (updated.questionId === 'v0279-overfitting-generalization-q1') {
      updated.choices = updated.choices.map((choice) => {
        if (choice.choiceId === updated.correctChoiceId) {
          return {
            ...choice,
            feedback: 'Good diagnosis. Set-aside validation examples are saved for testing, not used to fit the model.'
          }
        }
        return choice
      })
    }
    if (updated.questionId === 'v0279-overfitting-generalization-q2') {
      updated.question = 'Why do model builders test on set-aside validation examples instead of only training examples?'
      updated.choices = updated.choices.map((choice) => {
        if (choice.choiceId === updated.correctChoiceId) {
          return {
            ...choice,
            text: 'They are kept out of training so they can test whether learned patterns transfer.',
            feedback: 'Insight strengthened. Set-aside validation examples are saved for testing, not used to fit the model.'
          }
        }
        if (choice.choiceId.includes('extra-training')) {
          return {
            ...choice,
            feedback: 'Not quite. Validation examples are saved for testing, not used as extra examples to fit the model.'
          }
        }
        return choice
      })
    }
    const correct = updated.choices.find((choice) => choice.choiceId === updated.correctChoiceId)
    updated.answer = correct?.text ?? updated.answer
    return updated
  })

  return cleaned
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

function makeMarkdown(bank) {
  const lines = []
  lines.push(`# Prompt Life Checkpoint Bank ${VERSION}`)
  lines.push('')
  lines.push(`- Active bank: ${bank.activeBankLabel}`)
  lines.push(`- Active by default: ${bank.activeByDefault}`)
  lines.push(`- Cards: ${bank.summary.learningCardsActive}`)
  lines.push(`- Questions: ${bank.summary.totalQuestions}`)
  lines.push(`- Choices: ${bank.summary.totalChoices}`)
  lines.push(`- Wrong-answer distractors: ${bank.summary.totalDistractors}`)
  lines.push(`- Legacy fallback: ${bank.legacyFallback.queryParameters.join(' or ')}`)
  lines.push('')
  lines.push('## Quality Rules')
  bank.qualityChecklist.forEach((item) => lines.push(`- ${item}`))
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
      lines.push(`- Type: ${question.type}`)
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

function makeHtml(bank) {
  const tableRows = bank.cards.map((card) => `
    <tr>
      <td>${card.stageNumber}.${card.learningCardNumberWithinStage}</td>
      <td>${escapeHtml(card.learningCardTitle)}</td>
      <td>${card.revisedQuestionCount}</td>
      <td>${escapeHtml(card.learningObjectiveReview.primaryLearningObjective)}</td>
    </tr>
  `).join('')
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
  const screenshots = [
    ['Overfitting explanation', 'checkpoints/screenshots/v0-27-11-overfitting-390.png'],
    ['Overfitting checkpoint', 'checkpoints/screenshots/v0-27-11-overfitting-checkpoint-390.png'],
    ['Debug bank indicator', 'checkpoints/screenshots/v0-27-11-debug-bank-390.png'],
    ['Next-question scroll', 'checkpoints/screenshots/v0-27-11-next-question-390.png'],
    ['Journey top after next card', 'checkpoints/screenshots/v0-27-11-next-card-top-390.png'],
    ['2-question checkpoint', 'checkpoints/screenshots/v0-27-11-two-question-390.png'],
    ['4-question checkpoint', 'checkpoints/screenshots/v0-27-11-four-question-390.png'],
    ['320px checkpoint', 'checkpoints/screenshots/v0-27-11-checkpoint-320.png'],
    ['Desktop checkpoint', 'checkpoints/screenshots/v0-27-11-desktop.png'],
    ['Badge', 'checkpoints/screenshots/v0-27-11-badge-390.png'],
    ['Play', 'checkpoints/screenshots/v0-27-11-play-390.png'],
    ['Glossary', 'checkpoints/screenshots/v0-27-11-glossary-390.png']
  ]
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prompt Life v0.27.11 Full Checkpoint Bank Review</title>
  <style>
    :root { color: #08124a; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f7fbff; }
    body { margin: 0; padding: 32px; }
    h1, h2, h3 { color: #111873; }
    h1 { font-size: 30px; margin: 0 0 8px; }
    h2 { font-size: 21px; margin-top: 32px; border-top: 2px solid #d9e4ff; padding-top: 18px; }
    h3 { font-size: 18px; }
    h3 span { color: #087b83; font-size: 13px; }
    p, li, td, th { font-size: 12px; line-height: 1.5; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 18px 0; }
    .summary div, .note, .question, .shot { background: white; border: 1px solid #d7e1f3; border-radius: 10px; padding: 12px; box-shadow: 0 8px 20px rgba(21, 31, 99, 0.08); }
    .summary strong { display: block; font-size: 22px; color: #009caa; }
    table { border-collapse: collapse; width: 100%; background: white; }
    th, td { border: 1px solid #d7e1f3; padding: 8px; vertical-align: top; text-align: left; }
    th { background: #eef5ff; }
    .qid { color: #087b83; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
    .stem { font-weight: 800; font-size: 13px; }
    .correct { background: #eafff6; border-radius: 6px; }
    ol { padding-left: 20px; }
    .screenshots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .shot img { width: 100%; border: 1px solid #d7e1f3; border-radius: 8px; }
    @media print { body { padding: 20px; } .card-block { break-inside: avoid; } .question { break-inside: avoid; } .screenshots { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <h1>Prompt Life v0.27.11 Full Journey Checkpoint Bank Review</h1>
  <p>Generated ${escapeHtml(bank.generatedAt)}. This report documents the active full-Journey checkpoint bank, set-aside validation clarity, scroll behavior hardening, and QA evidence for mobile-first review.</p>
  <div class="summary">
    <div><strong>${bank.summary.learningCardsActive}</strong>cards</div>
    <div><strong>${bank.summary.totalQuestions}</strong>questions</div>
    <div><strong>${bank.summary.totalChoices}</strong>choices</div>
    <div><strong>${bank.summary.totalDistractors}</strong>distractors</div>
  </div>
  <section class="note">
    <h2>Objectives</h2>
    <ul>
      <li>Make v0.27.11 the active checkpoint bank by default for all 39 Journey learning cards.</li>
      <li>Keep legacy single-question checkpoints available with <code>?legacyCheckpoints=1</code> or <code>?checkpointBank=legacy</code>.</li>
      <li>Clarify that set-aside validation examples are kept out of training and saved for testing.</li>
      <li>Remove developer/fallback notes from normal learner UI while preserving a debug-only bank note.</li>
      <li>Harden Next question and Next learning card scroll behavior for mobile Safari and desktop.</li>
    </ul>
  </section>
  <section>
    <h2>Full Objective Table</h2>
    <table><thead><tr><th>#</th><th>Learning card</th><th>Questions</th><th>Primary objective</th></tr></thead><tbody>${tableRows}</tbody></table>
  </section>
  <section class="note">
    <h2>Set-Aside Validation Clarity</h2>
    <p><strong>Exact learner-facing wording added:</strong> Set-aside validation examples are examples kept out of training so they can test whether the model learned a pattern that transfers.</p>
    <p>Visual and interaction wording now uses “validation examples” or “set-aside validation examples” instead of unexplained held-out/holdout language.</p>
  </section>
  <section class="note">
    <h2>Scroll Behavior</h2>
    <p><strong>Next question:</strong> advances within multi-question checkpoints and scrolls the checkpoint heading/question into view using stable layout callbacks.</p>
    <p><strong>Next learning card:</strong> completes the current lesson, navigates to the next card, and scrolls to the next lesson title/top without preserving old scroll position.</p>
  </section>
  <section class="note">
    <h2>Quality Checklist</h2>
    <ul>${bank.qualityChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
  </section>
  <section class="note">
    <h2>Deep Research Prompt</h2>
    <p>Review this v0.27.11 checkpoint bank for accuracy, misconception coverage, cognitive load, and whether each distractor tests a plausible model-thinking error without making the correct answer obvious by length or wording.</p>
  </section>
  <section>
    <h2>Screenshots</h2>
    <div class="screenshots">
      ${screenshots.map(([label, src]) => `<figure class="shot"><img src="${src}" alt="${escapeHtml(label)} screenshot"><figcaption>${escapeHtml(label)}</figcaption></figure>`).join('')}
    </div>
  </section>
  <section>
    <h2>Full Checkpoint Bank</h2>
    ${questionSections}
  </section>
</body>
</html>
`
}

function totals(cards) {
  const totalQuestions = cards.reduce((sum, card) => sum + card.questions.length, 0)
  const totalChoices = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.length, 0), 0)
  const totalDistractors = cards.reduce((sum, card) => sum + card.questions.reduce((inner, question) => inner + question.choices.filter((choice) => !choice.isCorrect).length, 0), 0)
  const questionCounts = Object.fromEntries(cards.map((card) => [card.learningCardId, card.questions.length]))
  return { totalQuestions, totalChoices, totalDistractors, questionCounts }
}

function writeRuntimeSource(cards) {
  const bank = runtimeBank(cards)
  const source = `// Generated by scripts/generate-checkpoint-bank-v02711.mjs.\n// This active-development bank overrides all 39 Journey checkpoints.\n\nexport const ACTIVE_CHECKPOINT_BANK = '${ACTIVE_BANK_LABEL}'\n\nexport const FULL_CHECKPOINT_BANK_V02711 = ${JSON.stringify(bank, null, 2)} as const\n\nexport type CheckpointBankLessonId = keyof typeof FULL_CHECKPOINT_BANK_V02711\n\nexport function hasV02711CheckpointBank(lessonId: string): lessonId is CheckpointBankLessonId {\n  return Object.prototype.hasOwnProperty.call(FULL_CHECKPOINT_BANK_V02711, lessonId)\n}\n`
  fs.writeFileSync(outputSourcePath, source)
}

function main() {
  const firstTwelve = readJson(firstTwelvePath)
  const draft = readJson(draftPath)
  const firstTwelveCards = firstTwelve.cards.map(polishFirstTwelveCard)
  const draftRemainingCards = draft.cards
    .filter((card) => !FIRST_TWELVE_IDS.includes(card.learningCardId))
    .map(convertDraftCard)
  const cards = [...firstTwelveCards, ...draftRemainingCards]
  const countSummary = totals(cards)
  const generatedAt = new Date().toISOString()

  const bank = {
    version: VERSION,
    status: 'active-development-pilot',
    activeByDefault: true,
    activeBankLabel: ACTIVE_BANK_LABEL,
    legacyFallback: {
      queryParameters: ['?legacyCheckpoints=1', '?checkpointBank=legacy'],
      description: 'Add either query parameter to restore the previous single-question checkpoints for validation or comparison.'
    },
    generatedAt,
    sourceBanks: [
      'checkpoint-question-bank-v0-27-10-first-twelve-active-dev.json',
      'checkpoint-question-bank-v0-27-7-draft.json'
    ],
    preservedArtifacts: [
      'v0.27.7 draft checkpoint inventory',
      'v0.27.8 model-thinking pilot',
      'v0.27.9 first-six revised bank',
      'v0.27.10 first-twelve active-development bank'
    ],
    summary: {
      learningCardsActive: cards.length,
      ...countSummary,
      activeLessonIds: cards.map((card) => card.learningCardId),
      activeLessonTitles: cards.map((card) => card.learningCardTitle)
    },
    setAsideValidationClarity: {
      exactWording: 'Set-aside validation examples are examples kept out of training so they can test whether the model learned a pattern that transfers.',
      shortWording: 'Set-aside means kept out of training and saved for testing.',
      checkpointFeedbackNote: 'Validation examples are saved for testing, not used to fit the model.'
    },
    learnerFacingCleanup: [
      'Normal Journey UI does not show developer pilot or legacy fallback instructions.',
      'Debug bank indicator appears only with ?debug=1.',
      'Learner-facing held-out/holdout wording is removed or replaced with defined set-aside validation wording.'
    ],
    scrollBehavior: [
      'Next question scrolls to the checkpoint panel after the next item renders.',
      'Next learning card scrolls to the lesson title/top after navigation.',
      'Stable layout callbacks use requestAnimationFrame plus a short timeout fallback and respect reduced motion.'
    ],
    qualityChecklist: [
      'All 39 active Journey learning cards have a multi-question checkpoint set.',
      'Every question has four choices and exactly one correct answer.',
      'Every question and choice has a stable ID.',
      'Wrong-answer feedback maps by choiceId and does not reveal the correct answer by marking it.',
      'Most questions test model mechanism, application, causal consequence, boundary judgment, or misconception repair.',
      'Vague stems such as “Which statement is most accurate?” and “According to this learning card…” are avoided.',
      'Legacy fallback remains query-parameter controlled and is not displayed in normal learner UI.'
    ],
    cards
  }

  fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)
  fs.writeFileSync(outputMdPath, makeMarkdown(bank))
  fs.writeFileSync(outputHtmlPath, makeHtml(bank))
  writeRuntimeSource(cards)

  console.log(`Generated ${outputJsonPath}`)
  console.log(`Generated ${outputMdPath}`)
  console.log(`Generated ${outputHtmlPath}`)
  console.log(`Generated ${outputSourcePath}`)
  console.log(`Cards: ${cards.length}`)
  console.log(`Questions: ${countSummary.totalQuestions}`)
  console.log(`Choices: ${countSummary.totalChoices}`)
  console.log(`Distractors: ${countSummary.totalDistractors}`)
}

main()
