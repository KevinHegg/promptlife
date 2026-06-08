import type {
  PlayChallengeAttempt,
  PlayChallengeId,
  PlayChallengeOutcome,
  PlayChallengeProgress,
  PlayChallengeStatus
} from './types'

export const PLAY_CHALLENGE_STORAGE_KEY = 'promptlife.playChallenges.v1'

let memoryProgress: PlayChallengeProgress | null = null

function nowIso() {
  return new Date().toISOString()
}

function clampProgress(value: unknown) {
  const numeric = Number(value ?? 0)
  if (!Number.isFinite(numeric)) return 0
  return Math.max(0, Math.min(100, Math.round(numeric)))
}

function getStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

export function emptyPlayChallengeProgress(storageAvailable = true): PlayChallengeProgress {
  return {
    version: 1,
    challenges: {},
    storageAvailable
  }
}

function sanitizeStatus(value: unknown): PlayChallengeStatus {
  if (
    value === 'not-started' ||
    value === 'in-progress' ||
    value === 'completed' ||
    value === 'review-suggested' ||
    value === 'coming-soon' ||
    value === 'retired'
  ) {
    return value
  }
  return 'not-started'
}

export function emptyPlayChallengeAttempt(): PlayChallengeAttempt {
  return {
    attempts: 0,
    completions: 0,
    bestProgressPct: 0,
    status: 'not-started',
    misconceptionTags: [],
    journeyStageRelationship: [],
    glossaryTermIds: []
  }
}

function sanitizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? [...new Set(value.map(String).filter(Boolean))] : []
}

export function sanitizePlayChallengeAttempt(value: Partial<PlayChallengeAttempt> = {}): PlayChallengeAttempt {
  const attempts = Math.max(0, Number(value.attempts ?? 0))
  const completions = Math.max(0, Number(value.completions ?? 0))
  const bestProgressPct = clampProgress(value.bestProgressPct)
  const status = sanitizeStatus(value.status ?? (completions > 0 ? 'completed' : attempts > 0 ? 'in-progress' : 'not-started'))

  return {
    attempts,
    completions,
    bestProgressPct,
    status,
    lastPlayedAt: value.lastPlayedAt ? String(value.lastPlayedAt) : undefined,
    completedAt: value.completedAt ? String(value.completedAt) : undefined,
    lastOutcome: value.lastOutcome ? String(value.lastOutcome) : undefined,
    misconceptionTags: sanitizeStringArray(value.misconceptionTags),
    journeyStageRelationship: sanitizeStringArray(value.journeyStageRelationship),
    glossaryTermIds: sanitizeStringArray(value.glossaryTermIds)
  }
}

function sanitizeProgress(value: Partial<PlayChallengeProgress>, storageAvailable = true): PlayChallengeProgress {
  const entries = Object.entries(value.challenges ?? {}).map(([id, attempt]) => [
    id as PlayChallengeId,
    sanitizePlayChallengeAttempt(attempt as Partial<PlayChallengeAttempt>)
  ])

  return {
    version: 1,
    challenges: Object.fromEntries(entries),
    storageAvailable
  }
}

export function loadPlayChallengeProgress(): PlayChallengeProgress {
  const storage = getStorage()
  if (!storage) {
    memoryProgress ??= emptyPlayChallengeProgress(false)
    return memoryProgress
  }

  try {
    const raw = storage.getItem(PLAY_CHALLENGE_STORAGE_KEY)
    if (!raw) return emptyPlayChallengeProgress(true)
    return sanitizeProgress(JSON.parse(raw), true)
  } catch {
    memoryProgress ??= emptyPlayChallengeProgress(false)
    return memoryProgress
  }
}

export function savePlayChallengeProgress(progress: PlayChallengeProgress): PlayChallengeProgress {
  const storage = getStorage()
  const next = sanitizeProgress(progress, Boolean(storage))
  memoryProgress = next
  if (!storage) return { ...next, storageAvailable: false }

  try {
    storage.setItem(PLAY_CHALLENGE_STORAGE_KEY, JSON.stringify(next))
    return { ...next, storageAvailable: true }
  } catch {
    return { ...next, storageAvailable: false }
  }
}

function mergeTags(previous: string[] = [], next: string[] = []) {
  return [...new Set([...previous, ...next].filter(Boolean))]
}

export function recordPlayChallengeAttempt(
  challengeId: PlayChallengeId,
  outcome: PlayChallengeOutcome = {}
): PlayChallengeProgress {
  const progress = loadPlayChallengeProgress()
  const previous = sanitizePlayChallengeAttempt(progress.challenges[challengeId])
  const progressPct = clampProgress(outcome.progressPct ?? previous.bestProgressPct)
  const status = outcome.status ?? (outcome.completed ? 'completed' : previous.status === 'completed' ? 'completed' : 'in-progress')

  return savePlayChallengeProgress({
    ...progress,
    challenges: {
      ...progress.challenges,
      [challengeId]: {
        ...previous,
        attempts: previous.attempts + 1,
        bestProgressPct: Math.max(previous.bestProgressPct, progressPct),
        status,
        lastPlayedAt: nowIso(),
        lastOutcome: outcome.outcome ?? 'Practice started. Progress saved on this device.',
        misconceptionTags: mergeTags(previous.misconceptionTags, outcome.misconceptionTags)
      }
    }
  })
}

export function updatePlayChallengeProgress(
  challengeId: PlayChallengeId,
  outcome: PlayChallengeOutcome = {}
): PlayChallengeProgress {
  const progress = loadPlayChallengeProgress()
  const previous = sanitizePlayChallengeAttempt(progress.challenges[challengeId])
  const progressPct = clampProgress(outcome.progressPct ?? previous.bestProgressPct)
  const status = outcome.status ?? (outcome.completed ? 'completed' : previous.status === 'not-started' ? 'in-progress' : previous.status)

  return savePlayChallengeProgress({
    ...progress,
    challenges: {
      ...progress.challenges,
      [challengeId]: {
        ...previous,
        bestProgressPct: Math.max(previous.bestProgressPct, progressPct),
        status,
        lastPlayedAt: nowIso(),
        lastOutcome: outcome.outcome ?? previous.lastOutcome,
        misconceptionTags: mergeTags(previous.misconceptionTags, outcome.misconceptionTags)
      }
    }
  })
}

export function markPlayChallengeCompleted(
  challengeId: PlayChallengeId,
  outcome: PlayChallengeOutcome = {}
): PlayChallengeProgress {
  const progress = loadPlayChallengeProgress()
  const previous = sanitizePlayChallengeAttempt(progress.challenges[challengeId])
  const completedAt = nowIso()
  const status: PlayChallengeStatus = outcome.reviewSuggested ? 'review-suggested' : outcome.status ?? 'completed'

  return savePlayChallengeProgress({
    ...progress,
    challenges: {
      ...progress.challenges,
      [challengeId]: {
        ...previous,
        completions: previous.completions + 1,
        attempts: Math.max(previous.attempts, 1),
        bestProgressPct: Math.max(previous.bestProgressPct, clampProgress(outcome.progressPct ?? 100)),
        status,
        lastPlayedAt: completedAt,
        completedAt,
        lastOutcome: outcome.outcome ?? (outcome.reviewSuggested ? 'Completed a calm round; review suggested.' : 'Practice completed. Progress saved on this device.'),
        misconceptionTags: mergeTags(previous.misconceptionTags, outcome.misconceptionTags)
      }
    }
  })
}

export function getPlayChallengeSummary(): PlayChallengeProgress {
  return loadPlayChallengeProgress()
}

export function clearPlayChallengeProgress() {
  memoryProgress = emptyPlayChallengeProgress(Boolean(getStorage()))
  try {
    getStorage()?.removeItem(PLAY_CHALLENGE_STORAGE_KEY)
  } catch {
    // The in-memory fallback above is enough if storage is blocked.
  }
  return memoryProgress
}
