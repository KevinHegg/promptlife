import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const draftPath = path.join(root, 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-7-draft.json')
const pilotPath = path.join(root, 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-8-model-thinking-pilot.json')
const revisedPath = path.join(root, 'docs/journey/checkpoints/checkpoint-question-bank-v0-27-9-first-six-revised.json')
const revisedSourcePath = path.join(root, 'src/data/checkpointBankV0279.ts')
const vaguePatterns = [
  /^What is the best definition\??$/i,
  /^Which statement is most accurate\??$/i,
  /^Which phrase best describes the tradition\??$/i,
  /^What happens here\??$/i,
  /^Which is better\??$/i
]
const pilotBannedStemPatterns = [
  /^What is the best definition\??$/i,
  /^Which statement is most accurate\??$/i,
  /^Which phrase best describes the topic\??$/i,
  /^According to this learning card\b/i,
  /^In this learning card\b/i,
  /^What did this card say\??$/i,
  /^Which is better\??$/i
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
const allowedPilotSources = new Set([
  'same-card',
  'same-stage',
  'nearby-stage',
  'explicit-confusable',
  'author-created misconception'
])

function hashString(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededRandom(seed, questionId) {
  let state = hashString(`${seed}:${questionId}`) || 0x6d2b79f5
  return () => {
    state += 0x6d2b79f5
    let next = state
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function shuffledChoicesForAudit(question, seed) {
  const shuffled = [...(question.choices ?? [])]
  const random = seededRandom(seed, question.questionId)
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

function readSource(relativePath) {
  const filePath = path.join(root, relativePath)
  return ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function propName(prop) {
  if (!ts.isPropertyAssignment(prop)) return null
  const name = prop.name
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text
  return null
}

function getProp(objectNode, name) {
  if (!objectNode || !ts.isObjectLiteralExpression(objectNode)) return null
  return objectNode.properties.find((prop) => propName(prop) === name)?.initializer ?? null
}

function getString(node) {
  if (!node) return ''
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return ''
}

function getStringArray(node) {
  if (!node || !ts.isArrayLiteralExpression(node)) return []
  return node.elements.map(getString).filter(Boolean)
}

function getVariable(sourceFile, name) {
  let found = null
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    node.declarationList.declarations.forEach((declaration) => {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
        found = declaration.initializer
      }
    })
  })
  return found
}

function auditLiveCheckpoints() {
  const source = readSource('src/data/content.ts')
  const lessons = getVariable(source, 'lessons')
  const issues = []
  let lessonCount = 0
  let questionCount = 0

  if (!lessons || !ts.isArrayLiteralExpression(lessons)) {
    issues.push('Could not read lessons from src/data/content.ts.')
    return { lessonCount, questionCount, issues }
  }

  lessons.elements.filter(ts.isObjectLiteralExpression).forEach((lessonNode) => {
    lessonCount += 1
    const id = getString(getProp(lessonNode, 'id')) || `lesson-${lessonCount}`
    const quizNode = getProp(lessonNode, 'quiz')
    if (!quizNode || !ts.isObjectLiteralExpression(quizNode)) {
      issues.push(`${id}: missing quiz object.`)
      return
    }
    const questionNodes = getProp(quizNode, 'questions')
    const quizzes = questionNodes && ts.isArrayLiteralExpression(questionNodes)
      ? questionNodes.elements.filter(ts.isObjectLiteralExpression)
      : [quizNode]
    quizzes.forEach((questionNode, index) => {
      questionCount += 1
      const choices = getStringArray(getProp(questionNode, 'choices'))
      const answer = getString(getProp(questionNode, 'answer'))
      const question = getString(getProp(questionNode, 'question'))
      if (!question) issues.push(`${id} question ${index + 1}: missing question text.`)
      if (choices.length !== 4) issues.push(`${id} question ${index + 1}: expected 4 choices, found ${choices.length}.`)
      if (!answer) issues.push(`${id} question ${index + 1}: missing answer.`)
      if (answer && !choices.includes(answer)) issues.push(`${id} question ${index + 1}: answer is not one of the choices.`)
    })
  })

  return { lessonCount, questionCount, issues }
}

function auditDraftBank(filePath = draftPath) {
  const issues = []
  if (!fs.existsSync(filePath)) {
    return { filePath, cardCount: 0, questionCount: 0, choiceCount: 0, distractorCount: 0, distribution: {}, issues: [`Missing draft bank: ${filePath}`] }
  }
  const bank = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const questionIds = new Set()
  const choiceIds = new Set()
  const distribution = {}
  let questionCount = 0
  let choiceCount = 0
  let distractorCount = 0

  if (bank.status !== 'review-draft') issues.push(`Draft bank status should be review-draft, found ${bank.status}.`)
  if (!Array.isArray(bank.cards) || bank.cards.length !== 39) issues.push(`Expected 39 card entries, found ${bank.cards?.length ?? 0}.`)

  ;(bank.cards ?? []).forEach((card) => {
    const count = card.proposedQuestionCount
    distribution[count] = (distribution[count] ?? 0) + 1
    if (count < 2 || count > 5) issues.push(`${card.learningCardId}: proposedQuestionCount must be 2-5, found ${count}.`)
    if (!Array.isArray(card.questions) || card.questions.length !== count) {
      issues.push(`${card.learningCardId}: question count mismatch.`)
    }
    ;(card.questions ?? []).forEach((question) => {
      questionCount += 1
      if (!question.questionId) issues.push(`${card.learningCardId}: question missing stable questionId.`)
      if (questionIds.has(question.questionId)) issues.push(`${question.questionId}: duplicate questionId.`)
      questionIds.add(question.questionId)
      if (!question.question) issues.push(`${question.questionId}: missing question text.`)
      if (vaguePatterns.some((pattern) => pattern.test(question.question))) {
        issues.push(`${question.questionId}: vague question wording: "${question.question}".`)
      }
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        issues.push(`${question.questionId}: expected exactly 4 choices.`)
      }
      const correct = (question.choices ?? []).filter((choice) => choice.isCorrect)
      if (correct.length !== 1) issues.push(`${question.questionId}: expected exactly 1 correct choice, found ${correct.length}.`)
      if (correct[0]?.choiceId !== question.correctChoiceId) {
        issues.push(`${question.questionId}: correctChoiceId does not match the correct choice.`)
      }
      ;(question.choices ?? []).forEach((choice) => {
        choiceCount += 1
        if (!choice.choiceId) issues.push(`${question.questionId}: choice missing stable choiceId.`)
        if (choiceIds.has(choice.choiceId)) issues.push(`${choice.choiceId}: duplicate choiceId.`)
        choiceIds.add(choice.choiceId)
        if (!choice.text) issues.push(`${choice.choiceId}: missing choice text.`)
        if (!choice.feedback) issues.push(`${choice.choiceId}: missing feedback.`)
        if (!choice.isCorrect) {
          distractorCount += 1
          if (!choice.representedMisconception) issues.push(`${choice.choiceId}: wrong choice missing representedMisconception.`)
          if (!choice.distractorSource) issues.push(`${choice.choiceId}: wrong choice missing distractorSource.`)
          if (!choice.distractorRationale) issues.push(`${choice.choiceId}: wrong choice missing distractorRationale.`)
        }
      })
    })
  })

  return {
    filePath,
    cardCount: bank.cards?.length ?? 0,
    questionCount,
    choiceCount,
    distractorCount,
    distribution,
    issues
  }
}

function questionNamesMechanism(question) {
  const stem = String(question.question ?? '').toLowerCase()
  const terms = question.explicitMechanismTerms ?? []
  return terms.some((term) => {
    const tokens = String(term)
      .toLowerCase()
      .split(/[^a-z0-9]+/g)
      .filter((token) => token.length > 2 && !['the', 'and', 'model', 'system'].includes(token))
    return tokens.some((token) => stem.includes(token))
  })
}

function auditPilotBank(filePath = pilotPath) {
  const issues = []
  if (!fs.existsSync(filePath)) {
    return { filePath, cardCount: 0, questionCount: 0, choiceCount: 0, distractorCount: 0, modelThinkingPercent: 0, directDefinitionPercent: 0, issues: [`Missing pilot bank: ${filePath}`] }
  }
  const bank = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const questionIds = new Set()
  const choiceIds = new Set()
  let questionCount = 0
  let choiceCount = 0
  let distractorCount = 0
  let modelThinkingCount = 0
  let directDefinitionCount = 0

  if (bank.status !== 'pilot-draft') issues.push(`Pilot bank status should be pilot-draft, found ${bank.status}.`)
  if (bank.liveMode !== 'not-live') issues.push(`Pilot bank liveMode should be not-live, found ${bank.liveMode}.`)
  if (!Array.isArray(bank.cards) || bank.cards.length !== 6) issues.push(`Expected 6 pilot card entries, found ${bank.cards?.length ?? 0}.`)

  ;(bank.cards ?? []).forEach((card) => {
    if (!Array.isArray(card.questions) || card.questions.length !== card.proposedQuestionCount) {
      issues.push(`${card.learningCardId}: pilot question count mismatch.`)
    }
    ;(card.questions ?? []).forEach((question) => {
      questionCount += 1
      if (!question.questionId) issues.push(`${card.learningCardId}: pilot question missing stable questionId.`)
      if (questionIds.has(question.questionId)) issues.push(`${question.questionId}: duplicate pilot questionId.`)
      questionIds.add(question.questionId)
      if (!question.question) issues.push(`${question.questionId}: missing pilot question text.`)
      if (pilotBannedStemPatterns.some((pattern) => pattern.test(question.question))) {
        issues.push(`${question.questionId}: banned curriculum-centered stem: "${question.question}".`)
      }
      if (!questionNamesMechanism(question)) {
        issues.push(`${question.questionId}: question does not name an explicit topic or mechanism from explicitMechanismTerms.`)
      }
      if (modelThinkingCategories.has(question.authoringCategory)) modelThinkingCount += 1
      if (question.directDefinition || question.authoringCategory === 'definition') directDefinitionCount += 1
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        issues.push(`${question.questionId}: expected exactly 4 choices.`)
      }
      const correct = (question.choices ?? []).filter((choice) => choice.isCorrect)
      if (correct.length !== 1) issues.push(`${question.questionId}: expected exactly 1 correct choice, found ${correct.length}.`)
      if (correct[0]?.choiceId !== question.correctChoiceId) {
        issues.push(`${question.questionId}: correctChoiceId does not match the correct choice.`)
      }
      ;(question.choices ?? []).forEach((choice) => {
        choiceCount += 1
        if (!choice.choiceId) issues.push(`${question.questionId}: pilot choice missing stable choiceId.`)
        if (choiceIds.has(choice.choiceId)) issues.push(`${choice.choiceId}: duplicate pilot choiceId.`)
        choiceIds.add(choice.choiceId)
        if (!choice.text) issues.push(`${choice.choiceId}: missing pilot choice text.`)
        if (!choice.feedback) issues.push(`${choice.choiceId}: missing pilot feedback.`)
        if (!choice.isCorrect) {
          distractorCount += 1
          if (!choice.representedMisconception) issues.push(`${choice.choiceId}: wrong pilot choice missing representedMisconception.`)
          if (!choice.distractorSource) issues.push(`${choice.choiceId}: wrong pilot choice missing distractorSource.`)
          if (choice.distractorSource && !allowedPilotSources.has(choice.distractorSource)) {
            issues.push(`${choice.choiceId}: unsupported pilot distractorSource "${choice.distractorSource}".`)
          }
          if (!choice.distractorRationale) issues.push(`${choice.choiceId}: wrong pilot choice missing distractorRationale.`)
        }
      })
    })
  })

  const modelThinkingPercent = questionCount ? Math.round((modelThinkingCount / questionCount) * 100) : 0
  const directDefinitionPercent = questionCount ? Math.round((directDefinitionCount / questionCount) * 100) : 0
  if (modelThinkingPercent < 70) issues.push(`Pilot model-thinking/application/mechanism questions must be at least 70%, found ${modelThinkingPercent}%.`)

  return {
    filePath,
    cardCount: bank.cards?.length ?? 0,
    questionCount,
    choiceCount,
    distractorCount,
    modelThinkingPercent,
    directDefinitionPercent,
    issues
  }
}

function auditRevisedBank(filePath = revisedPath) {
  const issues = []
  if (!fs.existsSync(filePath)) {
    return { filePath, cardCount: 0, questionCount: 0, choiceCount: 0, distractorCount: 0, correctPositions: [], issues: [`Missing revised bank: ${filePath}`] }
  }
  const bank = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const questionIds = new Set()
  const choiceIds = new Set()
  const correctPositions = []
  let questionCount = 0
  let choiceCount = 0
  let distractorCount = 0

  if (bank.status !== 'active-development-pilot') issues.push(`Revised bank status should be active-development-pilot, found ${bank.status}.`)
  if (bank.activeByDefault !== true) issues.push('Revised bank should be activeByDefault: true for development testing.')
  if (!Array.isArray(bank.cards) || bank.cards.length !== 6) issues.push(`Expected 6 revised card entries, found ${bank.cards?.length ?? 0}.`)
  if (!fs.existsSync(revisedSourcePath)) issues.push(`Missing runtime source bank: ${revisedSourcePath}`)
  if (fs.existsSync(revisedSourcePath)) {
    const sourceText = fs.readFileSync(revisedSourcePath, 'utf8')
    if (!sourceText.includes('FIRST_SIX_CHECKPOINT_BANK_V0279')) issues.push('Runtime source bank does not export FIRST_SIX_CHECKPOINT_BANK_V0279.')
  }

  ;(bank.cards ?? []).forEach((card) => {
    if (!Array.isArray(card.questions) || card.questions.length !== card.revisedQuestionCount) {
      issues.push(`${card.learningCardId}: revised question count mismatch.`)
    }
    ;(card.questions ?? []).forEach((question) => {
      questionCount += 1
      if (!question.questionId) issues.push(`${card.learningCardId}: revised question missing stable questionId.`)
      if (questionIds.has(question.questionId)) issues.push(`${question.questionId}: duplicate revised questionId.`)
      questionIds.add(question.questionId)
      if (!question.question) issues.push(`${question.questionId}: missing revised question text.`)
      if (pilotBannedStemPatterns.some((pattern) => pattern.test(question.question))) {
        issues.push(`${question.questionId}: banned vague stem: "${question.question}".`)
      }
      if (!questionNamesMechanism(question)) {
        issues.push(`${question.questionId}: question does not name an explicit topic or mechanism from explicitMechanismTerms.`)
      }
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        issues.push(`${question.questionId}: expected exactly 4 choices.`)
      }
      const correct = (question.choices ?? []).filter((choice) => choice.isCorrect)
      if (correct.length !== 1) issues.push(`${question.questionId}: expected exactly 1 correct choice, found ${correct.length}.`)
      if (correct[0]?.choiceId !== question.correctChoiceId) {
        issues.push(`${question.questionId}: correctChoiceId does not match the correct choice.`)
      }
      if (!correct[0]?.feedback) issues.push(`${question.questionId}: correct choice missing success feedback.`)
      const shuffled = shuffledChoicesForAudit(question, 'promptlife:v0.27.9:audit')
      const correctPosition = shuffled.findIndex((choice) => choice.choiceId === question.correctChoiceId)
      if (correctPosition >= 0) correctPositions.push(correctPosition + 1)

      ;(question.choices ?? []).forEach((choice) => {
        choiceCount += 1
        if (!choice.choiceId) issues.push(`${question.questionId}: revised choice missing stable choiceId.`)
        if (choiceIds.has(choice.choiceId)) issues.push(`${choice.choiceId}: duplicate revised choiceId.`)
        choiceIds.add(choice.choiceId)
        if (!choice.text) issues.push(`${choice.choiceId}: missing revised choice text.`)
        if (!choice.feedback) issues.push(`${choice.choiceId}: missing revised feedback.`)
        if (!choice.isCorrect) {
          distractorCount += 1
          if (!choice.representedMisconception) issues.push(`${choice.choiceId}: wrong revised choice missing representedMisconception.`)
          if (!choice.distractorSource) issues.push(`${choice.choiceId}: wrong revised choice missing distractorSource.`)
          if (choice.distractorSource && !allowedPilotSources.has(choice.distractorSource)) {
            issues.push(`${choice.choiceId}: unsupported revised distractorSource "${choice.distractorSource}".`)
          }
          if (!choice.distractorRationale) issues.push(`${choice.choiceId}: wrong revised choice missing distractorRationale.`)
        }
      })
    })
  })

  if (questionCount !== 19) issues.push(`Expected 19 revised questions, found ${questionCount}.`)
  if (choiceCount !== 76) issues.push(`Expected 76 revised choices, found ${choiceCount}.`)
  if (distractorCount !== 57) issues.push(`Expected 57 revised distractors, found ${distractorCount}.`)
  if (new Set(correctPositions).size < 2) issues.push('Revised correct answers all land in the same shuffled position for the audit seed.')

  return {
    filePath,
    cardCount: bank.cards?.length ?? 0,
    questionCount,
    choiceCount,
    distractorCount,
    correctPositions,
    issues
  }
}

export function auditCheckpointBank({ write = true } = {}) {
  const live = auditLiveCheckpoints()
  const draft = auditDraftBank()
  const pilot = auditPilotBank()
  const revised = auditRevisedBank()
  const issues = [...live.issues, ...draft.issues, ...pilot.issues, ...revised.issues]

  if (write) {
    console.log('')
    console.log('## Checkpoint Bank Audit')
    console.log(`Live Journey cards: ${live.lessonCount}`)
    console.log(`Live checkpoint questions: ${live.questionCount}`)
    console.log(`Draft cards: ${draft.cardCount}`)
    console.log(`Draft questions: ${draft.questionCount}`)
    console.log(`Draft choices: ${draft.choiceCount}`)
    console.log(`Draft wrong-answer distractors: ${draft.distractorCount}`)
    console.log(`Draft question-count distribution: ${JSON.stringify(draft.distribution)}`)
    console.log(`Pilot cards: ${pilot.cardCount}`)
    console.log(`Pilot questions: ${pilot.questionCount}`)
    console.log(`Pilot choices: ${pilot.choiceCount}`)
    console.log(`Pilot wrong-answer distractors: ${pilot.distractorCount}`)
    console.log(`Pilot model-thinking/application/mechanism questions: ${pilot.modelThinkingPercent}%`)
    console.log(`Pilot direct-definition questions: ${pilot.directDefinitionPercent}%`)
    console.log(`Revised active-development cards: ${revised.cardCount}`)
    console.log(`Revised active-development questions: ${revised.questionCount}`)
    console.log(`Revised active-development choices: ${revised.choiceCount}`)
    console.log(`Revised active-development wrong-answer distractors: ${revised.distractorCount}`)
    console.log(`Revised audit-seed correct-answer positions: ${JSON.stringify(revised.correctPositions)}`)
    if (issues.length) {
      console.log('')
      console.log('### Issues')
      issues.forEach((issue) => console.log(`- ${issue}`))
    } else {
      console.log('Checkpoint audit passed.')
    }
  }

  return { live, draft, pilot, revised, issues }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = auditCheckpointBank()
  if (result.issues.length) process.exit(1)
}
