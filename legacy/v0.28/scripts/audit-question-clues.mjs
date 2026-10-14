import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const bankPath = path.join(root, 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-15.json')
const auditPath = path.join(root, 'docs/journey/checkpoints/question-clue-audit-v0-27-15.md')

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
  return [...forms].filter((form) => form.length >= 4)
}

function phraseInText(phrase, text) {
  const normalizedPhrase = normalizeText(phrase)
  if (!normalizedPhrase) return false
  const pattern = new RegExp(`(^|\\s)${normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`)
  return pattern.test(text)
}

function correctChoice(question) {
  return (question.choices ?? []).find((choice) => choice.isCorrect)
}

function collectCandidates(bank) {
  const rows = []
  for (const card of bank.cards ?? []) {
    for (const question of card.questions ?? []) {
      const correct = correctChoice(question)
      if (!correct) continue
      const triggers = new Set()
      const stem = normalizeText(question.question)
      const correctText = normalizeText(correct.text)
      for (const term of new Set([...(question.explicitMechanismTerms ?? []), card.learningCardTitle])) {
        for (const form of termForms(term)) {
          if (phraseInText(form, stem) && phraseInText(form, correctText)) triggers.add(form)
        }
      }
      if (triggers.size) {
        rows.push({
          learningCardTitle: card.learningCardTitle,
          questionId: question.questionId,
          triggers: [...triggers],
          stem: question.question,
          correct: correct.text
        })
      }
    }
  }
  return rows
}

function lengthWarnings(bank) {
  const warnings = []
  for (const card of bank.cards ?? []) {
    for (const question of card.questions ?? []) {
      const correct = correctChoice(question)
      if (!correct) continue
      const wrongLengths = (question.choices ?? [])
        .filter((choice) => !choice.isCorrect)
        .map((choice) => choice.text.length)
      const averageWrong = wrongLengths.reduce((sum, length) => sum + length, 0) / wrongLengths.length
      if (correct.text.length >= averageWrong * 1.35 && correct.text.length - averageWrong > 18) {
        warnings.push({
          learningCardTitle: card.learningCardTitle,
          questionId: question.questionId,
          correctLength: correct.text.length,
          averageWrongLength: Math.round(averageWrong)
        })
      }
    }
  }
  return warnings
}

function vagueStemWarnings(bank) {
  const patterns = [
    /^What is the best definition\??$/i,
    /^Which statement is most accurate\??$/i,
    /^According to this learning card\b/i,
    /^In this learning card\b/i,
    /^What did this card say\??$/i
  ]
  return (bank.cards ?? []).flatMap((card) => (card.questions ?? [])
    .filter((question) => patterns.some((pattern) => pattern.test(question.question)))
    .map((question) => ({
      learningCardTitle: card.learningCardTitle,
      questionId: question.questionId,
      stem: question.question
    })))
}

if (!fs.existsSync(bankPath)) {
  console.error(`Missing v0.27.15 checkpoint bank: ${bankPath}`)
  process.exit(1)
}

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const candidates = collectCandidates(bank)
const retainedReview = bank.answerGiveawayRepair?.auditRows ?? []
const warnings = lengthWarnings(bank)
const vague = vagueStemWarnings(bank)

const lines = [
  '# Prompt Life v0.27.15 Question Clue Audit',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  'This audit is informational. It flags correct answers that repeat mechanism terms from the stem, plus length and vague-stem warnings. The v0.27.15 repair log records which candidates were changed or intentionally retained.',
  '',
  '## Summary',
  '',
  `- Term-echo candidates: ${candidates.length}`,
  `- Repair-log candidates reviewed: ${retainedReview.length}`,
  `- Answer-length warnings: ${warnings.length}`,
  `- Vague-stem warnings: ${vague.length}`,
  '',
  '## Term-Echo Candidates',
  '',
  ...candidates.map((row) => {
    const repair = retainedReview.find((item) => item.questionId === row.questionId)
    return `- ${row.learningCardTitle} / ${row.questionId}: ${row.triggers.map((trigger) => `\`${trigger}\``).join(', ')}; ${repair?.status ?? 'not in repair log'}${repair?.reason ? `; ${repair.reason}` : ''}`
  }),
  '',
  '## Answer-Length Warnings',
  '',
  ...(warnings.length ? warnings.map((row) => `- ${row.learningCardTitle} / ${row.questionId}: correct ${row.correctLength} chars; wrong-choice average ${row.averageWrongLength} chars.`) : ['None.']),
  '',
  '## Vague-Stem Warnings',
  '',
  ...(vague.length ? vague.map((row) => `- ${row.learningCardTitle} / ${row.questionId}: ${row.stem}`) : ['None.']),
  ''
]

fs.writeFileSync(auditPath, `${lines.join('\n')}\n`)

console.log('Question-clue audit completed.')
console.log(`Term-echo candidates: ${candidates.length}`)
console.log(`Answer-length warnings: ${warnings.length}`)
console.log(`Vague-stem warnings: ${vague.length}`)
console.log(`Wrote ${path.relative(root, auditPath)}`)
