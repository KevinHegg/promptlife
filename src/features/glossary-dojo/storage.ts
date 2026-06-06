import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoMistake,
  GlossaryDojoProgress,
  GlossaryDojoQuestion,
  GlossaryDojoRound,
  GlossaryDojoTermProgress
} from './types'

export const GLOSSARY_DOJO_STORAGE_KEY = 'promptlife.glossaryDojo.v1'

const RECENT_MISTAKE_LIMIT = 10

let memoryProgress: GlossaryDojoProgress | null = null

export function emptyGlossaryDojoProgress(storageAvailable = true): GlossaryDojoProgress {
  return {
    roundsCompleted: 0,
    questionsAnswered: 0,
    recentMistakes: [],
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
  return {
    practiced: Number(value.practiced ?? 0),
    correct: Number(value.correct ?? 0),
    incorrect: Number(value.incorrect ?? 0),
    correctRoundNumbers: Array.isArray(value.correctRoundNumbers)
      ? [...new Set(value.correctRoundNumbers.map(Number).filter(Boolean))]
      : [],
    mastered: Boolean(value.mastered),
    needsReview: Boolean(value.needsReview),
    lastMissedRoundNumber: value.lastMissedRoundNumber ? Number(value.lastMissedRoundNumber) : undefined
  }
}

function sanitizeProgress(value: Partial<GlossaryDojoProgress>, storageAvailable = true): GlossaryDojoProgress {
  const terms = Object.fromEntries(
    Object.entries(value.terms ?? {}).map(([termId, progress]) => [
      termId,
      sanitizeTermProgress(progress)
    ])
  )

  return {
    roundsCompleted: Number(value.roundsCompleted ?? 0),
    questionsAnswered: Number(value.questionsAnswered ?? 0),
    recentMistakes: Array.isArray(value.recentMistakes)
      ? (value.recentMistakes as GlossaryDojoMistake[]).slice(0, RECENT_MISTAKE_LIMIT)
      : [],
    terms,
    currentRound: value.currentRound ?? null,
    lastCompletedRound: value.lastCompletedRound ?? null,
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

  const termProgress: GlossaryDojoTermProgress = {
    ...previous,
    practiced: previous.practiced + 1,
    correct: previous.correct + (result.answer.isCorrect ? 1 : 0),
    incorrect: previous.incorrect + (result.answer.isCorrect ? 0 : 1),
    correctRoundNumbers,
    mastered: correctRoundNumbers.length >= 2 || recoveredAfterMiss,
    needsReview: !result.answer.isCorrect,
    lastMissedRoundNumber: result.answer.isCorrect
      ? previous.lastMissedRoundNumber
      : round.roundNumber
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
    recentMistakes,
    terms: {
      ...progress.terms,
      [question.targetTermId]: termProgress
    },
    currentRound: round
  })
}

export function completeGlossaryDojoRound(progress: GlossaryDojoProgress, round: GlossaryDojoRound) {
  return saveGlossaryDojoProgress({
    ...progress,
    roundsCompleted: Math.max(progress.roundsCompleted, round.roundNumber),
    currentRound: null,
    lastCompletedRound: {
      roundNumber: round.roundNumber,
      completedAt: new Date().toISOString(),
      answers: round.answers
    }
  })
}
