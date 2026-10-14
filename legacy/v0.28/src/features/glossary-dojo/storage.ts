import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoCompletedRound,
  GlossaryDojoMistake,
  GlossaryDojoProgress,
  GlossaryDojoQuestion,
  GlossaryDojoRoundHistoryRecord,
  GlossaryDojoRoundRecord,
  GlossaryDojoRound,
  GlossaryDojoTermProgress
} from './types'
import { fingerprintTargetTermIds, modeFromSourceMode, sourceRoundIdFromRound } from './rounds'

export const GLOSSARY_DOJO_STORAGE_KEY = 'promptlife.glossaryDojo.v1'

const RECENT_MISTAKE_LIMIT = 10
const ROUND_HISTORY_LIMIT = 120
const NORMAL_FINGERPRINT_LIMIT = 180

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
    roundHistory: [],
    normalRoundFingerprints: [],
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

function sanitizeSourceMode(value?: GlossaryDojoRound['sourceMode']): GlossaryDojoRound['sourceMode'] {
  if (value === 'repeat_round' || value === 'review_missed') return value
  return 'new_round'
}

function targetIdsFromRoundLike(value: Partial<GlossaryDojoRound | GlossaryDojoCompletedRound | GlossaryDojoRoundRecord>) {
  if (Array.isArray(value.targetTermIds) && value.targetTermIds.length) return value.targetTermIds.map(String)
  if ('questions' in value && Array.isArray(value.questions)) {
    return value.questions.map((question) => question.targetTermId).filter(Boolean)
  }
  if ('answers' in value && Array.isArray(value.answers)) {
    return [...new Set(value.answers.map((answer) => answer.targetTermId).filter(Boolean))]
  }
  return []
}

function roundModeFromValue(value: Partial<GlossaryDojoRound | GlossaryDojoCompletedRound | GlossaryDojoRoundRecord>) {
  const sourceMode = sanitizeSourceMode(value.sourceMode)
  return value.mode ?? modeFromSourceMode(sourceMode)
}

function sanitizeRoundRecord(value: Partial<GlossaryDojoRoundRecord> = {}): GlossaryDojoRoundRecord {
  const roundNumber = Number(value.roundNumber ?? 0)
  const id = String(value.id ?? value.roundNumber ?? `round-${roundNumber}`)
  const sourceMode = sanitizeSourceMode(value.sourceMode)
  const targetTermIds = targetIdsFromRoundLike(value)
  const targetFingerprint = value.targetFingerprint || fingerprintTargetTermIds(targetTermIds)
  const startedAt = String(value.startedAt ?? value.completedAt ?? new Date().toISOString())
  return {
    id,
    roundNumber,
    startedAt,
    completedAt: String(value.completedAt ?? new Date().toISOString()),
    correctCount: Number(value.correctCount ?? 0),
    missedCount: Number(value.missedCount ?? 0),
    sourceMode,
    mode: roundModeFromValue(value),
    sourceRoundId: value.sourceRoundId ??
      (sourceMode === 'repeat_round' ? value.repeatedFromRoundId : sourceMode === 'review_missed' ? value.reviewFromRoundId : undefined),
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    targetFingerprint,
    targetTermIds
  }
}

function sanitizeRoundHistoryRecord(value: Partial<GlossaryDojoRoundHistoryRecord> = {}): GlossaryDojoRoundHistoryRecord {
  const roundNumber = Number(value.roundNumber ?? 0)
  const id = String(value.id ?? value.roundId ?? value.roundNumber ?? `round-${roundNumber}`)
  const roundId = String(value.roundId ?? id)
  const sourceMode = sanitizeSourceMode(value.sourceMode)
  const targetTermIds = targetIdsFromRoundLike(value)
  const targetFingerprint = value.targetFingerprint || fingerprintTargetTermIds(targetTermIds)
  const startedAt = String(value.startedAt ?? value.completedAt ?? new Date().toISOString())
  return {
    id,
    roundNumber,
    roundId,
    startedAt,
    completedAt: value.completedAt ? String(value.completedAt) : undefined,
    correctCount: typeof value.correctCount === 'number' ? Number(value.correctCount) : undefined,
    missedCount: typeof value.missedCount === 'number' ? Number(value.missedCount) : undefined,
    sourceMode,
    mode: value.mode ?? modeFromSourceMode(sourceMode),
    sourceRoundId: value.sourceRoundId ??
      (sourceMode === 'repeat_round' ? value.repeatedFromRoundId : sourceMode === 'review_missed' ? value.reviewFromRoundId : undefined),
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    targetFingerprint,
    targetTermIds
  }
}

function sanitizeCurrentRound(value: Partial<GlossaryDojoRound> | null | undefined): GlossaryDojoRound | null {
  if (!value) return null
  const sourceMode = sanitizeSourceMode(value.sourceMode)
  const id = String(value.id ?? value.roundId ?? `round-${Number(value.roundNumber ?? 0)}`)
  const roundId = String(value.roundId ?? id)
  const targetTermIds = targetIdsFromRoundLike(value)
  const startedAt = String(value.startedAt ?? value.createdAt ?? new Date().toISOString())
  return {
    id,
    roundId,
    roundNumber: Number(value.roundNumber ?? 0),
    createdAt: String(value.createdAt ?? startedAt),
    startedAt,
    completedAt: value.completedAt,
    currentIndex: Number(value.currentIndex ?? 0),
    targetTermIds,
    targetFingerprint: value.targetFingerprint || fingerprintTargetTermIds(targetTermIds),
    sourceMode,
    mode: value.mode ?? modeFromSourceMode(sourceMode),
    sourceRoundId: value.sourceRoundId ??
      (sourceMode === 'repeat_round' ? value.repeatedFromRoundId : sourceMode === 'review_missed' ? value.reviewFromRoundId : undefined),
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    questions: Array.isArray(value.questions) ? value.questions : [],
    answers: Array.isArray(value.answers) ? value.answers : []
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
  const sourceMode = sanitizeSourceMode(value.sourceMode)
  const targetTermIds = targetIdsFromRoundLike({ ...value, questions, answers })
  const startedAt = String(value.startedAt ?? value.completedAt ?? new Date().toISOString())
  return {
    id,
    roundNumber,
    roundId: String(value.roundId ?? id),
    startedAt,
    completedAt: String(value.completedAt ?? new Date().toISOString()),
    correctCount,
    missedCount,
    sourceMode,
    mode: value.mode ?? modeFromSourceMode(sourceMode),
    sourceRoundId: value.sourceRoundId ??
      (sourceMode === 'repeat_round' ? value.repeatedFromRoundId : sourceMode === 'review_missed' ? value.reviewFromRoundId : undefined),
    repeatCount: Number(value.repeatCount ?? 0),
    repeatedFromRoundId: value.repeatedFromRoundId,
    reviewFromRoundId: value.reviewFromRoundId,
    targetFingerprint: value.targetFingerprint || fingerprintTargetTermIds(targetTermIds),
    targetTermIds,
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
  const perRound = Array.isArray(value.perRound)
    ? value.perRound.map((round) => sanitizeRoundRecord(round)).slice(-25)
    : []
  const currentRound = sanitizeCurrentRound(value.currentRound)
  const lastCompletedRound = sanitizeCompletedRound(value.lastCompletedRound)
  const roundHistory = Array.isArray(value.roundHistory)
    ? value.roundHistory.map((round) => sanitizeRoundHistoryRecord(round)).slice(-ROUND_HISTORY_LIMIT)
    : perRound.map((round) => sanitizeRoundHistoryRecord(round)).slice(-ROUND_HISTORY_LIMIT)
  const normalRoundFingerprints = [
    ...(Array.isArray(value.normalRoundFingerprints) ? value.normalRoundFingerprints.map(String) : []),
    ...roundHistory
      .filter((round) => round.sourceMode === 'new_round')
      .map((round) => round.targetFingerprint),
    ...perRound
      .filter((round) => round.sourceMode === 'new_round')
      .map((round) => round.targetFingerprint),
    lastCompletedRound?.sourceMode === 'new_round' ? lastCompletedRound.targetFingerprint : '',
    currentRound?.sourceMode === 'new_round' ? currentRound.targetFingerprint : ''
  ].filter(Boolean)

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
    perRound,
    roundHistory,
    normalRoundFingerprints: [...new Set(normalRoundFingerprints)].slice(-NORMAL_FINGERPRINT_LIMIT),
    terms,
    currentRound,
    lastCompletedRound,
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

function historyRecordFromRound(round: GlossaryDojoRound): GlossaryDojoRoundHistoryRecord {
  return {
    id: round.id,
    roundId: round.roundId,
    roundNumber: round.roundNumber,
    startedAt: round.startedAt ?? round.createdAt,
    completedAt: round.completedAt,
    sourceMode: round.sourceMode,
    mode: round.mode ?? modeFromSourceMode(round.sourceMode),
    sourceRoundId: round.sourceRoundId ?? sourceRoundIdFromRound(round),
    repeatCount: round.repeatCount,
    repeatedFromRoundId: round.repeatedFromRoundId,
    reviewFromRoundId: round.reviewFromRoundId,
    targetFingerprint: round.targetFingerprint || fingerprintTargetTermIds(round.targetTermIds),
    targetTermIds: round.targetTermIds
  }
}

export function startGlossaryDojoRound(progress: GlossaryDojoProgress, round: GlossaryDojoRound) {
  const historyRecord = historyRecordFromRound(round)
  const roundHistory = [
    ...(progress.roundHistory ?? []).filter((record) => record.id !== round.id),
    historyRecord
  ].slice(-ROUND_HISTORY_LIMIT)
  const normalRoundFingerprints = round.sourceMode === 'new_round'
    ? [...new Set([...(progress.normalRoundFingerprints ?? []), historyRecord.targetFingerprint].filter(Boolean))]
        .slice(-NORMAL_FINGERPRINT_LIMIT)
    : progress.normalRoundFingerprints ?? []

  return saveGlossaryDojoProgress({
    ...progress,
    currentRound: round,
    roundHistory,
    normalRoundFingerprints
  })
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
    startedAt: round.startedAt ?? round.createdAt,
    completedAt,
    correctCount,
    missedCount,
    sourceMode: round.sourceMode,
    mode: round.mode ?? modeFromSourceMode(round.sourceMode),
    sourceRoundId: round.sourceRoundId ?? sourceRoundIdFromRound(round),
    repeatCount: round.repeatCount,
    repeatedFromRoundId: round.repeatedFromRoundId,
    reviewFromRoundId: round.reviewFromRoundId,
    targetFingerprint: round.targetFingerprint || fingerprintTargetTermIds(round.targetTermIds),
    targetTermIds: round.targetTermIds
  }
  const completedHistoryRecord: GlossaryDojoRoundHistoryRecord = {
    ...historyRecordFromRound(round),
    completedAt,
    correctCount,
    missedCount
  }
  const roundHistory = [
    ...(progress.roundHistory ?? []).filter((historyRound) => historyRound.id !== round.id),
    completedHistoryRecord
  ].slice(-ROUND_HISTORY_LIMIT)
  const normalRoundFingerprints = round.sourceMode === 'new_round'
    ? [...new Set([...(progress.normalRoundFingerprints ?? []), record.targetFingerprint].filter(Boolean))]
        .slice(-NORMAL_FINGERPRINT_LIMIT)
    : progress.normalRoundFingerprints ?? []

  return saveGlossaryDojoProgress({
    ...progress,
    roundsCompleted: Math.max(progress.roundsCompleted, round.roundNumber),
    roundsAttempted: Math.max(progress.roundsAttempted + 1, round.roundNumber),
    perRound: [...(progress.perRound ?? []), record].slice(-25),
    roundHistory,
    normalRoundFingerprints,
    currentRound: null,
    lastCompletedRound: {
      id: round.id,
      roundNumber: round.roundNumber,
      roundId: round.roundId,
      startedAt: round.startedAt ?? round.createdAt,
      completedAt,
      correctCount,
      missedCount,
      sourceMode: round.sourceMode,
      mode: round.mode ?? modeFromSourceMode(round.sourceMode),
      sourceRoundId: round.sourceRoundId ?? sourceRoundIdFromRound(round),
      repeatCount: round.repeatCount,
      repeatedFromRoundId: round.repeatedFromRoundId,
      reviewFromRoundId: round.reviewFromRoundId,
      targetFingerprint: record.targetFingerprint,
      targetTermIds: round.targetTermIds,
      questions: round.questions,
      answers: round.answers
    }
  })
}
