import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const AUDIT_SEED = 'promptlife:v0.16.1:audit-seed'

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

function shuffleChoicesForQuestion(questionId, choices, seed) {
  const shuffled = [...choices]
  const random = seededRandom(seed, questionId)

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
  if (!node) return null
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isIdentifier(node) && node.text === 'PROMPT_RUN_FINAL_ID') return 'prompt-run-final-order'
  return null
}

function getBoolean(node) {
  if (!node) return false
  return node.kind === ts.SyntaxKind.TrueKeyword
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

function extractItems(itemsNode) {
  if (!itemsNode || !ts.isArrayLiteralExpression(itemsNode)) return []

  return itemsNode.elements.flatMap((element) => {
    if (!ts.isObjectLiteralExpression(element)) return []
    const id = getString(getProp(element, 'id'))
    return [{
      id,
      label: getString(getProp(element, 'label')) ?? id,
      correct: getBoolean(getProp(element, 'correct'))
    }].filter((item) => item.id && item.label)
  })
}

function correctIdsForExercise(exerciseNode, items) {
  const correctAnswer = getProp(exerciseNode, 'correctAnswer')
  const explicitCorrect = items.filter((item) => item.correct).map((item) => item.id)

  if (correctAnswer && ts.isStringLiteral(correctAnswer)) return [correctAnswer.text]
  if (correctAnswer && ts.isArrayLiteralExpression(correctAnswer)) {
    const ids = correctAnswer.elements.map(getString).filter(Boolean)
    return ids.length ? ids : explicitCorrect
  }

  return explicitCorrect
}

function getCurrentPositions(items, correctIds) {
  return items
    .map((item, index) => correctIds.includes(item.id) ? index + 1 : null)
    .filter(Boolean)
}

function getLessonQuizNodes(quizNode) {
  if (!quizNode || !ts.isObjectLiteralExpression(quizNode)) return []
  const questions = getProp(quizNode, 'questions')
  if (questions && ts.isArrayLiteralExpression(questions)) {
    return questions.elements.filter(ts.isObjectLiteralExpression)
  }
  return [quizNode]
}

function getLessonSurfaces() {
  const source = readSource('src/data/content.ts')
  const lessons = getVariable(source, 'lessons')
  if (!lessons || !ts.isArrayLiteralExpression(lessons)) return []

  return lessons.elements.flatMap((lessonNode) => {
    if (!ts.isObjectLiteralExpression(lessonNode)) return []
    const id = getString(getProp(lessonNode, 'id'))
    const title = getString(getProp(lessonNode, 'title'))
    const quiz = getProp(lessonNode, 'quiz')
    if (!id || !title || !quiz || !ts.isObjectLiteralExpression(quiz)) return []
    const quizNodes = getLessonQuizNodes(quiz)
    return quizNodes.flatMap((questionNode, questionIndex) => {
      const choices = getStringArray(getProp(questionNode, 'choices'))
      const answer = getString(getProp(questionNode, 'answer'))
      if (!choices.length || !answer) return []
      const questionKey = getString(getProp(questionNode, 'id')) ?? `${questionIndex}`
      const choiceOrderKey = quizNodes.length === 1
        ? `lesson:${id}:checkpoint`
        : `lesson:${id}:checkpoint:${questionKey}`
      const surfaceId = quizNodes.length === 1
        ? `lesson:${id}`
        : `lesson:${id}:checkpoint:${questionKey}`
      const currentPosition = choices.indexOf(answer) + 1
      const shuffled = shuffleChoicesForQuestion(choiceOrderKey, choices.map((label, index) => ({
        id: `${index}:${label}`,
        label,
        correct: label === answer
      })), AUDIT_SEED)
      const shuffledPositions = shuffled.map((choice, index) => choice.correct ? index + 1 : null).filter(Boolean)
      return [{
        id: surfaceId,
        activity: quizNodes.length === 1 ? title : `${title} checkpoint ${questionIndex + 1}`,
        inputType: 'Journey checkpoint',
        choiceCount: choices.length,
        currentCorrectPositions: currentPosition ? [currentPosition] : [],
        randomized: true,
        shuffledCorrectPositions: shuffledPositions,
        notes: 'Randomized. Correctness follows answer identity, not A/B/C/D position.'
      }]
    })
  })
}

function surfaceFromExercise(exerciseNode, scope) {
  const id = getString(getProp(exerciseNode, 'id'))
  const title = getString(getProp(exerciseNode, 'title'))
  const inputType = getString(getProp(exerciseNode, 'inputType'))
  const items = extractItems(getProp(exerciseNode, 'items'))
  if (!id || !title || !inputType || !items.length) return null
  const correctIds = correctIdsForExercise(exerciseNode, items)
  const randomized = inputType === 'tap-choice' || inputType === 'next-token-pick'
  const shuffled = randomized ? shuffleChoicesForQuestion(`exercise:${id}`, items, AUDIT_SEED) : items
  const shuffledCorrectPositions = randomized ? getCurrentPositions(shuffled, correctIds) : []
  const fixedReason = randomized
    ? 'Randomized. Correctness follows item id.'
    : inputType === 'drag-order'
      ? 'Fixed. Order is the learning objective.'
      : inputType === 'sort-buckets'
        ? 'Fixed. Learner sorts into buckets.'
        : inputType === 'drag-match'
          ? 'Fixed. Learner matches paired items.'
          : inputType === 'label-tokens'
            ? 'Fixed. Token sequence/context order is meaningful.'
            : inputType === 'tap-multiple'
              ? 'Fixed. Multi-select grouping is clearer in authored order.'
              : 'Fixed. Not a single-choice answer list.'

  return {
    id: `${scope}:${id}`,
    activity: title,
    inputType,
    choiceCount: items.length,
    currentCorrectPositions: getCurrentPositions(items, correctIds),
    randomized,
    shuffledCorrectPositions,
    notes: fixedReason
  }
}

function getExerciseSurfaces() {
  const source = readSource('src/data/exercises.ts')
  const exercises = getVariable(source, 'exercises')
  if (!exercises || !ts.isArrayLiteralExpression(exercises)) return []
  return exercises.elements
    .filter(ts.isObjectLiteralExpression)
    .map((exerciseNode) => surfaceFromExercise(exerciseNode, 'exercise'))
    .filter(Boolean)
}

function getPromptRunSurfaces() {
  const source = readSource('src/data/promptRun.ts')
  const steps = getVariable(source, 'promptRunSteps')
  const finalChallenge = getVariable(source, 'promptRunFinalChallenge')
  const surfaces = []

  if (steps && ts.isArrayLiteralExpression(steps)) {
    steps.elements.forEach((stepNode) => {
      if (!ts.isObjectLiteralExpression(stepNode)) return
      const stepId = getString(getProp(stepNode, 'id'))
      const exercise = getProp(stepNode, 'exercise')
      if (!stepId || !exercise || !ts.isObjectLiteralExpression(exercise)) return
      const surface = surfaceFromExercise(exercise, 'prompt-run')
      if (surface) surfaces.push({ ...surface, id: `prompt-run:${stepId}` })
    })
  }

  if (finalChallenge && ts.isObjectLiteralExpression(finalChallenge)) {
    const surface = surfaceFromExercise(finalChallenge, 'prompt-run')
    if (surface) surfaces.push(surface)
  }

  return surfaces
}

const surfaces = [
  ...getLessonSurfaces(),
  ...getExerciseSurfaces(),
  ...getPromptRunSurfaces()
]

const randomized = surfaces.filter((surface) => surface.randomized)
const positionCounts = [1, 2, 3, 4, 5, 6].map((position) => ({
  position,
  count: randomized.filter((surface) => surface.shuffledCorrectPositions[0] === position).length
}))
const excluded = surfaces.filter((surface) => !surface.randomized)

console.log(`# Answer Randomization Audit`)
console.log(`Seed: ${AUDIT_SEED}`)
console.log(`Total surfaces: ${surfaces.length}`)
console.log(`Randomized surfaces: ${randomized.length}`)
console.log(`Excluded fixed-order surfaces: ${excluded.length}`)
console.log('')
console.log(`## First Correct Answer Position After Shuffle`)
positionCounts.forEach(({ position, count }) => {
  if (count > 0 || position <= 4) console.log(`- Position ${position}: ${count}`)
})
console.log('')
console.log(`## Surfaces`)
console.log(`| id | activity | type | choices | original correct position(s) | randomized | shuffled correct position(s) | notes |`)
console.log(`|---|---|---|---:|---|---|---|---|`)
surfaces.forEach((surface) => {
  console.log(`| ${surface.id} | ${surface.activity} | ${surface.inputType} | ${surface.choiceCount} | ${surface.currentCorrectPositions.join(', ') || 'n/a'} | ${surface.randomized ? 'yes' : 'no'} | ${surface.shuffledCorrectPositions.join(', ') || 'n/a'} | ${surface.notes} |`)
})

const { auditCheckpointBank } = await import('./audit-checkpoints.mjs')
const checkpointAudit = auditCheckpointBank()
if (checkpointAudit.issues.length) process.exitCode = 1
