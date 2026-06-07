import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoCompletedRound,
  GlossaryDojoMistake,
  GlossaryDojoProgress,
  GlossaryDojoQuestion,
  GlossaryDojoRoundRecord,
  GlossaryDojoRound,
  GlossaryDojoTermProgress
} from './types'

export const GLOSSARY_DOJO_STORAGE_KEY = 'promptlife.glossaryDojo.v1'

const RECENT_MISTAKE_LIMIT = 10

let memoryProgress: GlossaryDojoProgress | null = null

export function emptyGlossaryDojoProgress(storageAvailable = true): GlossaryDojoProgress {
  return {
    roundsCompleted: 0,
    roundsAttempted: 0,
    questionsAnswered: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    totalMissed: 0,
    recentMistakes: [],
    perRound: [],
    terms: {},
    currentRound: null,
    lastCompletedRound: null,
    storageAvailable
  }
}

function getStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

function sanitizeTermProgress(value: Partial<GlossaryDojoTermProgress> = {}): GlossaryDojoTermProgress {
  const practiced = Number(value.practiced ?? value.attempts ?? 0)
  const incorrect = Number(value.incorrect ?? value.missed ?? 0)
  return {
    practiced,
    attempts: Number(value.attempts ?? practiced),
    correct: Number(value.correct ?? 0),
    incorrect,
    missed: Number(value.missed ?? incorrect),
    correctRoundNumbers: Array.isArray(value.correctRoundNumbers)
      ? [...new Set(value.correctRoundNumbers.map(Number).filter(Boolean))]
      : [],
    mastered: Boolean(value.mastered),
    masteredAt: value.masteredAt,
    needsReview: Boolean(value.needsReview),
    lastMissedRoundNumber: value.lastMissedRoundNumber ? Number(value.lastMissedRoundNumber) : undefined,
    lastSeen: value.lastSeen
  }
}

function sanitizeRoundRecord(value: Partial<GlossaryDojoRoundRecord> = {}): GlossaryDojoRoundRecord {
  const roundNumber = Number(value.roundNumber ?? 0)
  const id = String(value.id ?? value.roundNumber ?? `round-${roundNumber}`)
  return {
    id,
    roundNumber,
    completedAt: String(value.completedAt ?? new Date().toISOString()),
    correctCount: Number(value.correctCount ?? 0),
    missedCount: Number(value.missedCount ?? 0),
    sourceMode: value.sourceMode ?? 'new_round',
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    targetTermIds: Array.isArray(value.targetTermIds) ? value.targetTermIds.map(String) : []
  }
}

function sanitizeCompletedRound(value: Partial<GlossaryDojoCompletedRound> | null | undefined): GlossaryDojoCompletedRound | null {
  if (!value) return null
  const answers = Array.isArray(value.answers) ? value.answers : []
  const questions = Array.isArray(value.questions) ? value.questions : []
  const correctCount = Number(value.correctCount ?? answers.filter((answer) => answer.isCorrect).length)
  const missedCount = Number(value.missedCount ?? answers.filter((answer) => !answer.isCorrect).length)
  const roundNumber = Number(value.roundNumber ?? 0)
  const id = String(value.id ?? value.roundId ?? `round-${roundNumber}`)
  return {
    id,
    roundNumber,
    roundId: String(value.roundId ?? id),
    completedAt: String(value.completedAt ?? new Date().toISOString()),
    correctCount,
    missedCount,
    sourceMode: value.sourceMode ?? 'new_round',
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    targetTermIds: Array.isArray(value.targetTermIds)
      ? value.targetTermIds.map(String)
      : [...new Set(answers.map((answer) => answer.targetTermId))],
    questions,
    answers
  }
}

function sanitizeProgress(value: Partial<GlossaryDojoProgress>, storageAvailable = true): GlossaryDojoProgress {
  const terms = Object.fromEntries(
    Object.entries(value.terms ?? {}).map(([termId, progress]) => [
      termId,
      sanitizeTermProgress(progress)
    ])
  )
  const roundsCompleted = Number(value.roundsCompleted ?? 0)
  const questionsAnswered = Number(value.questionsAnswered ?? value.totalQuestionsAnswered ?? 0)

  return {
    roundsCompleted,
    roundsAttempted: Number(value.roundsAttempted ?? roundsCompleted),
    questionsAnswered,
    totalQuestionsAnswered: Number(value.totalQuestionsAnswered ?? questionsAnswered),
    totalCorrect: Number(value.totalCorrect ?? 0),
    totalMissed: Number(value.totalMissed ?? 0),
    recentMistakes: Array.isArray(value.recentMistakes)
      ? (value.recentMistakes as GlossaryDojoMistake[]).slice(0, RECENT_MISTAKE_LIMIT)
      : [],
    perRound: Array.isArray(value.perRound)
      ? value.perRound.map((round) => sanitizeRoundRecord(round)).slice(-25)
      : [],
    terms,
    currentRound: value.currentRound ?? null,
    lastCompletedRound: sanitizeCompletedRound(value.lastCompletedRound),
    storageAvailable
  }
}

export function loadGlossaryDojoProgress(): GlossaryDojoProgress {
  const storage = getStorage()
  if (!storage) {
    memoryProgress ??= emptyGlossaryDojoProgress(false)
    return memoryProgress
  }

  try {
    const raw = storage.getItem(GLOSSARY_DOJO_STORAGE_KEY)
    if (!raw) return emptyGlossaryDojoProgress(true)
    return sanitizeProgress(JSON.parse(raw), true)
  } catch {
    memoryProgress ??= emptyGlossaryDojoProgress(false)
    return memoryProgress
  }
}

export function saveGlossaryDojoProgress(progress: GlossaryDojoProgress): GlossaryDojoProgress {
  const storage = getStorage()
  const next = sanitizeProgress(progress, Boolean(storage))
  memoryProgress = next
  if (!storage) return { ...next, storageAvailable: false }

  try {
    storage.setItem(GLOSSARY_DOJO_STORAGE_KEY, JSON.stringify(next))
    return { ...next, storageAvailable: true }
  } catch {
    return { ...next, storageAvailable: false }
  }
}

export function clearGlossaryDojoProgress() {
  memoryProgress = emptyGlossaryDojoProgress(Boolean(getStorage()))
  try {
    getStorage()?.removeItem(GLOSSARY_DOJO_STORAGE_KEY)
  } catch {
    // The in-memory fallback above is enough if storage is blocked.
  }
  return memoryProgress
}

export function recordGlossaryDojoAnswer(
  progress: GlossaryDojoProgress,
  round: GlossaryDojoRound,
  question: GlossaryDojoQuestion,
  result: GlossaryDojoAnswerResult
) {
  const previous = sanitizeTermProgress(progress.terms[question.targetTermId])
  const correctRoundNumbers = result.answer.isCorrect
    ? [...new Set([...previous.correctRoundNumbers, round.roundNumber])].sort((a, b) => a - b)
    : previous.correctRoundNumbers
  const recoveredAfterMiss = result.answer.isCorrect &&
    typeof previous.lastMissedRoundNumber === 'number' &&
    previous.lastMissedRoundNumber < round.roundNumber
  const mastered = correctRoundNumbers.length >= 2 || recoveredAfterMiss
  const now = result.answer.answeredAt

  const termProgress: GlossaryDojoTermProgress = {
    ...previous,
    practiced: previous.practiced + 1,
    attempts: previous.attempts + 1,
    correct: previous.correct + (result.answer.isCorrect ? 1 : 0),
    incorrect: previous.incorrect + (result.answer.isCorrect ? 0 : 1),
    missed: previous.missed + (result.answer.isCorrect ? 0 : 1),
    correctRoundNumbers,
    mastered,
    masteredAt: mastered && !previous.mastered ? now : previous.masteredAt,
    needsReview: !result.answer.isCorrect,
    lastMissedRoundNumber: result.answer.isCorrect
      ? previous.lastMissedRoundNumber
      : round.roundNumber,
    lastSeen: now
  }

  const recentMistakes = result.answer.isCorrect
    ? progress.recentMistakes
    : [
        {
          termId: question.targetTermId,
          selectedTermId: result.answer.selectedTermId,
          questionId: question.id,
          roundNumber: round.roundNumber,
          at: result.answer.answeredAt
        },
        ...progress.recentMistakes.filter((mistake) => mistake.termId !== question.targetTermId)
      ].slice(0, RECENT_MISTAKE_LIMIT)

  return saveGlossaryDojoProgress({
    ...progress,
    questionsAnswered: progress.questionsAnswered + 1,
    totalQuestionsAnswered: progress.totalQuestionsAnswered + 1,
    totalCorrect: progress.totalCorrect + (result.answer.isCorrect ? 1 : 0),
    totalMissed: progress.totalMissed + (result.answer.isCorrect ? 0 : 1),
    recentMistakes,
    terms: {
      ...progress.terms,
      [question.targetTermId]: termProgress
    },
    currentRound: round
  })
}

export function completeGlossaryDojoRound(progress: GlossaryDojoProgress, round: GlossaryDojoRound) {
  const completedAt = new Date().toISOString()
  const correctCount = round.answers.filter((answer) => answer.isCorrect).length
  const missedCount = round.answers.filter((answer) => !answer.isCorrect).length
  const record: GlossaryDojoRoundRecord = {
    id: round.id,
    roundNumber: round.roundNumber,
    completedAt,
    correctCount,
    missedCount,
    sourceMode: round.sourceMode,
    repeatCount: round.repeatCount,
    repeatedFromRoundId: round.repeatedFromRoundId,
    reviewFromRoundId: round.reviewFromRoundId,
    targetTermIds: round.targetTermIds
  }

  return saveGlossaryDojoProgress({
    ...progress,
    roundsCompleted: Math.max(progress.roundsCompleted, round.roundNumber),
    roundsAttempted: Math.max(progress.roundsAttempted + 1, round.roundNumber),
    perRound: [...(progress.perRound ?? []), record].slice(-25),
    currentRound: null,
    lastCompletedRound: {
      id: round.id,
      roundNumber: round.roundNumber,
      roundId: round.roundId,
      completedAt,
      correctCount,
      missedCount,
      sourceMode: round.sourceMode,
      repeatCount: round.repeatCount,
      repeatedFromRoundId: round.repeatedFromRoundId,
      reviewFromRoundId: round.reviewFromRoundId,
      targetTermIds: round.targetTermIds,
      questions: round.questions,
      answers: round.answers
    }
  })
}
