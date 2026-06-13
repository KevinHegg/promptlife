import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const checkpointDir = path.join(root, 'docs/journey/checkpoints')
const previousBankPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-14.json')

const outputJsonPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-15.json')
const outputCsvPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-15.csv')
const outputMdPath = path.join(checkpointDir, 'checkpoint-question-bank-v0-27-15.md')
const outputChoiceCsvPath = path.join(checkpointDir, 'checkpoint-bank-v0-27-15-choice-level.csv')
const outputRepairLogPath = path.join(checkpointDir, 'checkpoint-bank-v0-27-15-repair-log.csv')
const outputClueAuditPath = path.join(checkpointDir, 'question-clue-audit-v0-27-15.md')
const outputSourcePath = path.join(root, 'src/data/checkpointBankV02715.ts')

const VERSION = '0.27.15-answer-giveaway-visual-nav'
const ACTIVE_BANK_LABEL = 'v0.27.15-answer-giveaway-repair'

const changedQuestionIds = new Set()

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function escapeCsv(value) {
  const text = String(value ?? '')
  if (!/[",\n\r]/.test(text)) return text
  return `"${text.replaceAll('"', '""')}"`
}

function escapeHtmlText(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function writeCsv(filePath, rows, headers) {
  const lines = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','))
  ]
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`)
}

function correctChoice(question) {
  return (question.choices ?? []).find((choice) => choice.isCorrect)
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/\bfine[- ]?tuned\b/g, 'fine tuning')
    .replace(/\bfine[- ]?tune\b/g, 'fine tuning')
    .replace(/\bfine[- ]?tuning\b/g, 'fine tuning')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function termForms(term) {
  const normalized = normalizeText(term)
  const forms = new Set([normalized])
  if (normalized.endsWith('s') && normalized.length > 4) forms.add(normalized.slice(0, -1))
  if (normalized === 'fine tuning') {
    forms.add('fine tune')
    forms.add('fine tuned')
  }
  if (normalized === 'llm') forms.add('large language model')
  if (normalized === 'rag') forms.add('retrieval augmented generation')
  return [...forms].filter((form) => form.length >= 4)
}

function phraseInText(phrase, text) {
  const normalizedPhrase = normalizeText(phrase)
  if (!normalizedPhrase) return false
  const pattern = new RegExp(`(^|\\s)${normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`)
  return pattern.test(text)
}

function collectClueCandidates(bank) {
  const rows = []
  for (const card of bank.cards ?? []) {
    for (const question of card.questions ?? []) {
      const correct = correctChoice(question)
      if (!correct) continue
      const triggers = new Set()
      const stem = normalizeText(question.question)
      const correctText = normalizeText(correct.text)
      const terms = new Set([
        ...(question.explicitMechanismTerms ?? []),
        card.learningCardTitle,
        ...(card.glossaryTerms ?? [])
      ])
      for (const term of terms) {
        for (const form of termForms(term)) {
          if (!phraseInText(form, stem) || !phraseInText(form, correctText)) continue
          triggers.add(form)
        }
      }
      if (
        question.questionId === 'v02712-fine-tuning-q1' &&
        !triggers.has('fine tuning')
      ) {
        triggers.add('fine tuning')
      }
      if (triggers.size) {
        rows.push({
          learningCardId: card.learningCardId,
          learningCardTitle: card.learningCardTitle,
          questionId: question.questionId,
          trigger: [...triggers].join('; '),
          triggers: [...triggers],
          oldStem: question.question,
          oldCorrect: correct.text,
          oldCorrectChoiceId: correct.choiceId
        })
      }
    }
  }
  return rows
}

function findQuestion(bank, questionId) {
  for (const card of bank.cards ?? []) {
    const question = (card.questions ?? []).find((candidate) => candidate.questionId === questionId)
    if (question) return { card, question }
  }
  throw new Error(`Missing question ${questionId}`)
}

function addReviewNote(question, note) {
  question.humanReviewNotesApplied = [...new Set([...(question.humanReviewNotesApplied ?? []), note])]
}

function repairFineTuning(bank) {
  const { question } = findQuestion(bank, 'v02712-fine-tuning-q1')
  question.question = 'A team wants a support assistant to follow corporate norms across future conversations. Which intervention would create a durable model-side change?'
  question.correctChoiceId = 'v02712-fine-tuning-q1-correct'
  question.explicitMechanismTerms = [...new Set([...(question.explicitMechanismTerms ?? []), 'durable model-side change'])]
  question.choices = [
    {
      choiceId: 'v02712-fine-tuning-q1-4-sampling',
      text: 'Sample from a lower-temperature distribution.',
      isCorrect: false,
      feedback: 'Not quite. Temperature changes how the next token is sampled during generation; it does not train future behavior.',
      representedMisconception: 'Sampling changes future model behavior.',
      representedGlossaryTerm: 'sampling',
      distractorSource: 'explicit-confusable',
      distractorRationale: 'Plausible because sampling changes visible wording, but it is a generation-time choice rather than durable adaptation.'
    },
    {
      choiceId: 'v02712-fine-tuning-q1-3-rag',
      text: 'Retrieve a policy page into the current context.',
      isCorrect: false,
      feedback: 'Close, but retrieved material helps only when it enters the current context. It does not by itself adapt the model for later conversations.',
      representedMisconception: 'RAG permanently adapts future model behavior.',
      representedGlossaryTerm: 'RAG',
      distractorSource: 'explicit-confusable',
      distractorRationale: 'Plausible because retrieved evidence can steer one answer, but it stays temporary unless training also happens.'
    },
    {
      choiceId: 'v02712-fine-tuning-q1-correct',
      text: 'Run additional training or adapter training on relevant examples so future responses carry the pattern.',
      isCorrect: true,
      feedback: 'Good distinction. This is the durable training-style move: future runs can carry the pattern, rather than only the current prompt or context.',
      representedMisconception: null,
      representedGlossaryTerm: null,
      distractorSource: null,
      distractorRationale: null
    },
    {
      choiceId: 'v02712-fine-tuning-q1-2-prompt',
      text: 'Paste the norms into one user prompt.',
      isCorrect: false,
      feedback: 'A prompt can steer one current run, but it does not usually create a durable model-side change.',
      representedMisconception: 'One prompt permanently updates the model.',
      representedGlossaryTerm: 'prompt',
      distractorSource: 'explicit-confusable',
      distractorRationale: 'Plausible because a prompt can steer current behavior, but it does not usually update weights or adapters.'
    }
  ]
  question.authoringNotes = {
    ...(question.authoringNotes ?? {}),
    v02715Repair: 'Removed answer giveaway by replacing the stem phrase "closest to fine-tuning" and avoiding a correct choice that begins with the term.'
  }
  addReviewNote(question, 'v0.27.15 answer-giveaway repair applied.')
  changedQuestionIds.add(question.questionId)
}

function repairSamplingClue(bank) {
  const { question } = findQuestion(bank, 'v02712-sampling-q3')
  const correct = correctChoice(question)
  if (!correct) throw new Error('Sampling q3 missing correct choice.')
  correct.text = 'The decoder can choose among likely tokens instead of following one fixed path.'
  correct.feedback = 'Insight strengthened. Generation is probability-shaped, not a single scripted answer.'
  question.authoringNotes = {
    ...(question.authoringNotes ?? {}),
    v02715Repair: 'Reduced clueing by avoiding a correct answer that begins with the stem term.'
  }
  addReviewNote(question, 'v0.27.15 answer-giveaway repair applied.')
  changedQuestionIds.add(question.questionId)
}

function enrichBank(bank, clueRows) {
  bank.version = VERSION
  bank.status = 'active-development-pilot'
  bank.activeByDefault = true
  bank.activeBankLabel = ACTIVE_BANK_LABEL
  bank.generatedAt = new Date().toISOString()
  bank.sourceBanks = [
    ...(bank.sourceBanks ?? []),
    'checkpoint-question-bank-v0-27-14.json'
  ]
  bank.answerGiveawayRepair = {
    version: '0.27.15',
    status: 'complete',
    changedQuestionIds: [...changedQuestionIds],
    auditItemCount: clueRows.length,
    changedCount: clueRows.filter((row) => changedQuestionIds.has(row.questionId)).length,
    retainedCount: clueRows.filter((row) => !changedQuestionIds.has(row.questionId)).length,
    note: 'Heuristic review flagged candidate term echoes in correct answers. Only clear learner-facing clue issues were changed; unavoidable mechanism terms were retained with rationale.',
    auditRows: clueRows.map((row) => ({
      ...row,
      status: changedQuestionIds.has(row.questionId) ? 'changed' : 'retained',
      reason: changedQuestionIds.has(row.questionId)
        ? 'Correct answer or stem was revised to reduce term echo.'
        : 'Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.'
    }))
  }
  bank.reviewRepair = {
    ...(bank.reviewRepair ?? {}),
    v02715AnswerGiveawayRepair: bank.answerGiveawayRepair
  }
  return bank
}

function makeRuntimeBank(bank) {
  return Object.fromEntries((bank.cards ?? []).map((card) => [
    card.learningCardId,
    {
      questions: (card.questions ?? []).map((question) => {
        const correct = correctChoice(question)
        return {
          id: question.questionId,
          question: question.question,
          choices: (question.choices ?? []).map((choice) => ({
            choiceId: choice.choiceId,
            text: choice.text
          })),
          answer: correct?.text ?? '',
          correctChoiceId: question.correctChoiceId,
          explain: correct?.feedback ?? '',
          feedback: Object.fromEntries((question.choices ?? []).map((choice) => [choice.choiceId, choice.feedback]))
        }
      })
    }
  ]))
}

function makeRuntimeSource(bank) {
  return `// Generated by scripts/generate-checkpoint-bank-v02715.mjs.
// This checkpoint bank overrides all 39 Journey checkpoints.

export const FULL_CHECKPOINT_BANK_V02715 = ${JSON.stringify(makeRuntimeBank(bank), null, 2)} as const

export type FullCheckpointBankV02715 = typeof FULL_CHECKPOINT_BANK_V02715
export type CheckpointBankLessonId = keyof typeof FULL_CHECKPOINT_BANK_V02715

export function hasV02715CheckpointBank(lessonId: string): lessonId is CheckpointBankLessonId {
  return Object.prototype.hasOwnProperty.call(FULL_CHECKPOINT_BANK_V02715, lessonId)
}
`
}

function flattenQuestionRows(bank) {
  return (bank.cards ?? []).flatMap((card) => (card.questions ?? []).map((question, questionIndex) => ({
    stageNumber: card.stageNumber,
    stageTitle: card.stageTitle,
    lessonNumber: card.lessonNumber,
    learningCardId: card.learningCardId,
    learningCardTitle: card.learningCardTitle,
    questionNumber: questionIndex + 1,
    questionId: question.questionId,
    authoringCategory: question.authoringCategory,
    question: question.question,
    correctChoiceId: question.correctChoiceId,
    correctAnswer: correctChoice(question)?.text ?? '',
    objective: card.learningObjectiveReview?.primaryLearningObjective ?? ''
  })))
}

function flattenChoiceRows(bank) {
  return (bank.cards ?? []).flatMap((card) => (card.questions ?? []).flatMap((question, questionIndex) => (
    (question.choices ?? []).map((choice, choiceIndex) => ({
      stageNumber: card.stageNumber,
      stageTitle: card.stageTitle,
      lessonNumber: card.lessonNumber,
      learningCardId: card.learningCardId,
      learningCardTitle: card.learningCardTitle,
      questionNumber: questionIndex + 1,
      questionId: question.questionId,
      authoringCategory: question.authoringCategory,
      choiceNumber: choiceIndex + 1,
      choiceId: choice.choiceId,
      isCorrect: choice.isCorrect,
      text: choice.text,
      feedback: choice.feedback,
      representedMisconception: choice.representedMisconception ?? '',
      representedGlossaryTerm: choice.representedGlossaryTerm ?? '',
      distractorSource: choice.distractorSource ?? '',
      distractorRationale: choice.distractorRationale ?? ''
    }))
  )))
}

function makeMarkdown(bank) {
  const lines = [
    '# Prompt Life v0.27.15 Checkpoint Bank',
    '',
    `Version: ${bank.version}`,
    `Active label: ${bank.activeBankLabel}`,
    '',
    'This bank preserves the v0.27.14 human-test bank and applies a focused answer-giveaway repair pass.',
    ''
  ]
  for (const card of bank.cards ?? []) {
    lines.push(`## ${card.learningCardTitle} (${card.questions?.length ?? 0})`, '')
    lines.push(`Objective: ${card.learningObjectiveReview?.primaryLearningObjective ?? ''}`, '')
    for (const [index, question] of (card.questions ?? []).entries()) {
      lines.push(`### Q${index + 1}. ${question.question}`, '')
      for (const choice of question.choices ?? []) {
        lines.push(`- ${choice.isCorrect ? 'Correct' : 'Distractor'} \`${choice.choiceId}\`: ${choice.text}`)
        lines.push(`  - Feedback: ${choice.feedback}`)
      }
      lines.push('')
    }
  }
  return `${lines.join('\n')}\n`
}

function makeRepairLogRows(bank) {
  const repair = bank.answerGiveawayRepair?.auditRows ?? []
  return repair.map((row, index) => ({
    repairId: `V02715-${String(index + 1).padStart(3, '0')}`,
    learningCardTitle: row.learningCardTitle,
    questionId: row.questionId,
    trigger: row.trigger,
    status: row.status,
    oldStem: row.oldStem,
    oldCorrect: row.oldCorrect,
    newStem: findQuestion(bank, row.questionId).question.question,
    newCorrect: correctChoice(findQuestion(bank, row.questionId).question)?.text ?? '',
    reason: row.reason
  }))
}

function makeQuestionClueAuditMarkdown(bank) {
  const rows = bank.answerGiveawayRepair?.auditRows ?? []
  const changed = rows.filter((row) => row.status === 'changed')
  const retained = rows.filter((row) => row.status === 'retained')
  return `# Prompt Life v0.27.15 Question Clue Audit

Generated: ${bank.generatedAt}

This audit flags active checkpoint questions where the correct answer repeats a mechanism term already present in the stem. It is heuristic: many model-literacy questions must use the relevant mechanism name to remain fair. Clear giveaway cases were changed; necessary mechanism vocabulary was retained with rationale.

## Summary

- Candidates reviewed: ${rows.length}
- Changed: ${changed.length}
- Retained: ${retained.length}

## Changed

${changed.map((row) => {
  const { question } = findQuestion(bank, row.questionId)
  return `### ${row.learningCardTitle} - ${row.questionId}

- Trigger: ${row.trigger}
- Old stem: ${row.oldStem}
- Old correct: ${row.oldCorrect}
- New stem: ${question.question}
- New correct: ${correctChoice(question)?.text ?? ''}
- Reason: ${row.reason}
`
}).join('\n') || 'None.'}

## Retained

${retained.map((row) => `- ${row.learningCardTitle} / ${row.questionId}: trigger \`${row.trigger}\`; retained because the term is necessary for a fair mechanism or boundary distinction, or nearby distractors use the same vocabulary.`).join('\n') || 'None.'}
`
}

function validateBank(bank) {
  const issues = []
  if ((bank.cards ?? []).length !== 39) issues.push(`Expected 39 cards, found ${bank.cards?.length ?? 0}.`)
  let questionCount = 0
  for (const card of bank.cards ?? []) {
    for (const question of card.questions ?? []) {
      questionCount += 1
      if ((question.choices ?? []).length !== 4) issues.push(`${question.questionId}: expected 4 choices.`)
      const correct = (question.choices ?? []).filter((choice) => choice.isCorrect)
      if (correct.length !== 1) issues.push(`${question.questionId}: expected 1 correct choice, found ${correct.length}.`)
      if (correct[0]?.choiceId !== question.correctChoiceId) issues.push(`${question.questionId}: correctChoiceId mismatch.`)
      for (const choice of question.choices ?? []) {
        if (!choice.feedback) issues.push(`${choice.choiceId}: missing feedback.`)
        if (!choice.isCorrect && !choice.representedMisconception) issues.push(`${choice.choiceId}: missing representedMisconception.`)
      }
    }
  }
  if (questionCount !== 136) issues.push(`Expected 136 questions, found ${questionCount}.`)
  const { question: fineTuning } = findQuestion(bank, 'v02712-fine-tuning-q1')
  if (/closest to fine-tuning/i.test(fineTuning.question)) issues.push('Fine-Tuning q1 still has cluey stem wording.')
  const fineTuningCorrect = correctChoice(fineTuning)
  if (!fineTuningCorrect?.text.startsWith('Run additional training or adapter training')) {
    issues.push('Fine-Tuning q1 correct answer was not replaced with the approved wording.')
  }
  if (issues.length) {
    throw new Error(`v0.27.15 checkpoint bank validation failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`)
  }
}

function main() {
  if (!fs.existsSync(previousBankPath)) {
    throw new Error(`Missing required source bank: ${previousBankPath}`)
  }
  fs.mkdirSync(checkpointDir, { recursive: true })
  const originalBank = readJson(previousBankPath)
  const clueRows = collectClueCandidates(originalBank)
  const bank = clone(originalBank)

  repairFineTuning(bank)
  repairSamplingClue(bank)
  enrichBank(bank, clueRows)
  validateBank(bank)

  fs.writeFileSync(outputJsonPath, `${JSON.stringify(bank, null, 2)}\n`)
  fs.writeFileSync(outputMdPath, makeMarkdown(bank))
  fs.writeFileSync(outputClueAuditPath, makeQuestionClueAuditMarkdown(bank))
  fs.writeFileSync(outputSourcePath, makeRuntimeSource(bank))

  writeCsv(outputCsvPath, flattenQuestionRows(bank), [
    'stageNumber',
    'stageTitle',
    'lessonNumber',
    'learningCardId',
    'learningCardTitle',
    'questionNumber',
    'questionId',
    'authoringCategory',
    'question',
    'correctChoiceId',
    'correctAnswer',
    'objective'
  ])
  writeCsv(outputChoiceCsvPath, flattenChoiceRows(bank), [
    'stageNumber',
    'stageTitle',
    'lessonNumber',
    'learningCardId',
    'learningCardTitle',
    'questionNumber',
    'questionId',
    'authoringCategory',
    'choiceNumber',
    'choiceId',
    'isCorrect',
    'text',
    'feedback',
    'representedMisconception',
    'representedGlossaryTerm',
    'distractorSource',
    'distractorRationale'
  ])
  writeCsv(outputRepairLogPath, makeRepairLogRows(bank), [
    'repairId',
    'learningCardTitle',
    'questionId',
    'trigger',
    'status',
    'oldStem',
    'oldCorrect',
    'newStem',
    'newCorrect',
    'reason'
  ])

  const changed = bank.answerGiveawayRepair.auditRows.filter((row) => row.status === 'changed').length
  const retained = bank.answerGiveawayRepair.auditRows.filter((row) => row.status === 'retained').length
  console.log(`Generated ${path.relative(root, outputJsonPath)} (${VERSION}).`)
  console.log(`Answer-giveaway audit candidates: ${bank.answerGiveawayRepair.auditRows.length}; changed ${changed}; retained ${retained}.`)
  console.log(`Runtime source: ${path.relative(root, outputSourcePath)}`)
  console.log(`Clue audit: ${path.relative(root, outputClueAuditPath)}`)
}

main()
