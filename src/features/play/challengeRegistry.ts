import type {
  PlayChallengeAttempt,
  PlayChallengeId,
  PlayChallengeMeta,
  PlayChallengeProgress,
  PlayChallengeStatus,
  PlayChallengeSummary
} from './types'
import { emptyPlayChallengeAttempt, sanitizePlayChallengeAttempt } from './storage'

export const finalPlayChallengeRegistry: PlayChallengeMeta[] = [
  {
    id: 'glossary-dojo',
    title: 'Glossary Dojo',
    shortDescription: 'Practice concept discrimination.',
    tenSecondExplanation: 'A calm twelve-question round helps the vocabulary map settle without scores.',
    primaryActionLabel: 'Practice terms',
    estimatedTime: '4 min',
    practiceMove: 'Name concepts',
    shortMoveLabel: 'Name',
    recommendedAfter: 'Anytime',
    relatedJourneyStages: ['All stages', 'Glossary'],
    stageChips: ['Anytime', 'Glossary'],
    relatedLearningCards: ['All learning cards'],
    availability: 'available',
    routeId: 'glossary-dojo',
    image: '/assets/promptlife/icons/png/icon-glossary@48.png',
    action: 'Choose, compare, review.',
    modelMove: 'Name the concepts behind the prompt-to-response path.',
    misconceptionTags: ['term-confusion', 'relationship-mix-up'],
    journeyStageRelationship: ['Vocabulary support across the full Journey'],
    glossaryTermIds: ['token', 'attention', 'logits', 'softmax', 'rag', 'grounding'],
    recordAttemptOnOpen: false
  },
  {
    id: 'attention-match',
    title: 'Attention Match',
    shortDescription: 'Connect a token to what it depends on.',
    tenSecondExplanation: 'Match a token to the earlier token position it depends on in the current context.',
    primaryActionLabel: 'Open match',
    estimatedTime: '3 min',
    practiceMove: 'Connect token clues',
    shortMoveLabel: 'Connect',
    recommendedAfter: 'After Stage 3 · Workday',
    relatedJourneyStages: ['Workday', 'Decision Room'],
    stageChips: ['Stage 3', 'Workday'],
    relatedLearningCards: ['Attention'],
    availability: 'available',
    routeId: 'attention-match',
    image: '/assets/promptlife/icons/png/icon-attention@48.png',
    action: 'Connect relevant tokens.',
    modelMove: 'Attention weights relate token positions in the current context.',
    misconceptionTags: ['attention-is-not-awareness', 'nearest-token-is-not-always-source', 'pronoun-reference-needs-context'],
    journeyStageRelationship: ['Attention'],
    glossaryTermIds: ['attention', 'relevance-weight', 'context', 'hidden state'],
    legacyProgressIds: ['attention-weave']
  },
  {
    id: 'probability-picker',
    title: 'Probability Picker',
    shortDescription: 'Explore probability-shaped next-token choices.',
    tenSecondExplanation: 'Choose next tokens from shaped probabilities while keeping likely separate from true.',
    primaryActionLabel: 'Open picker',
    estimatedTime: '3 min',
    practiceMove: 'Choose likely next tokens',
    shortMoveLabel: 'Choose',
    recommendedAfter: 'After Stage 4 · Decision Room',
    relatedJourneyStages: ['Decision Room'],
    stageChips: ['Stage 4', 'Decision Room'],
    relatedLearningCards: ['Logits', 'Softmax', 'Sampling'],
    availability: 'available',
    routeId: 'probability-picker',
    image: '/assets/promptlife/icons/png/icon-softmax@48.png',
    action: 'Choose one likely token.',
    modelMove: 'Raw scores become probabilities, then sampling chooses one token.',
    misconceptionTags: ['probability-is-not-truth', 'highest-is-not-always-best', 'sampling-can-vary'],
    journeyStageRelationship: ['Logits', 'Softmax', 'Sampling'],
    glossaryTermIds: ['logits', 'softmax', 'probability', 'sampling', 'temperature']
  },
  {
    id: 'context-stack',
    title: 'Context Stack',
    shortDescription: 'See what fits in context.',
    tenSecondExplanation: 'Push cards into a small tray and notice which older context falls out.',
    primaryActionLabel: 'Open stack',
    estimatedTime: '3 min',
    practiceMove: 'Place context cards',
    shortMoveLabel: 'Place',
    recommendedAfter: 'After Stage 5 · The Day Repeats',
    relatedJourneyStages: ['The Day Repeats', 'RAG and Retrieval', 'Grounding'],
    stageChips: ['Stage 5', 'Day Repeats'],
    relatedLearningCards: ['Context Window', 'RAG and Retrieval', 'Grounding'],
    availability: 'available',
    routeId: 'context-stack',
    image: '/assets/promptlife/illustrations/scene-context-stack@mobile.png',
    action: 'Place, observe, reset.',
    modelMove: 'Temporary context stays visible only while it fits.',
    misconceptionTags: ['context-is-memory'],
    journeyStageRelationship: ['Context window', 'RAG and Retrieval'],
    glossaryTermIds: ['context window', 'input-context', 'memory', 'rag']
  },
  {
    id: 'prompt-run',
    title: 'Prompt Run',
    shortDescription: 'Trace one prompt through the whole loop.',
    tenSecondExplanation: 'Trace the full inference loop from prompt pieces to one selected and appended token.',
    primaryActionLabel: 'Start capstone',
    estimatedTime: '5-7 min',
    practiceMove: 'Trace the loop',
    shortMoveLabel: 'Trace',
    recommendedAfter: 'After Stage 5 · The Day Repeats',
    relatedJourneyStages: ['Morning Commute', 'Workday', 'Decision Room', 'The Day Repeats'],
    stageChips: ['Stage 2-5', 'Capstone'],
    relatedLearningCards: ['Prompt vs Response', 'Tokenization', 'Token IDs', 'Embeddings', 'Hidden States', 'Logits', 'Softmax', 'Sampling', 'Autoregression'],
    availability: 'available',
    routeId: 'trace-one-prompt',
    image: '/assets/promptlife/illustrations/scene-token-pipeline-relay@mobile.png',
    action: 'Trace the loop.',
    modelMove: 'Prompt, tokens, IDs, embeddings, hidden states, logits, probabilities, sampling, append, repeat.',
    misconceptionTags: ['token-id-is-not-meaning', 'embedding-is-representation', 'probability-is-not-truth', 'one-token-at-a-time', 'context-grows-and-expires', 'model-does-not-remember-forever'],
    journeyStageRelationship: ['Prompt vs Response', 'Tokenization', 'Autoregression'],
    glossaryTermIds: ['prompt', 'token', 'embedding', 'hidden state', 'logits', 'softmax', 'sampling', 'autoregression']
  }
]

export const retiredPlayChallenges: PlayChallengeMeta[] = [
  {
    id: 'token-relay',
    title: 'Token Pipeline Relay',
    shortDescription: 'Retired from the main Play set.',
    tenSecondExplanation: 'Its useful determinism idea belongs inside Prompt Run or Probability Picker later.',
    primaryActionLabel: 'Back to Play',
    estimatedTime: '3 min',
    practiceMove: 'Retired activity',
    shortMoveLabel: 'Retired',
    recommendedAfter: 'Compatibility only',
    relatedJourneyStages: ['Decision Room'],
    stageChips: ['Retired'],
    availability: 'deprecated',
    routeId: 'token-relay',
    action: 'Retired',
    modelMove: 'Preserved only for storage compatibility.',
    misconceptionTags: ['abstract-pipeline'],
    journeyStageRelationship: ['Legacy Play activity'],
    glossaryTermIds: ['inference']
  },
  {
    id: 'how-ai-learns',
    title: 'How AI Learns',
    shortDescription: 'Retired from the main Play set.',
    tenSecondExplanation: 'This content now belongs with Journey and review support instead of the main Play challenge list.',
    primaryActionLabel: 'Back to Play',
    estimatedTime: '5 min',
    practiceMove: 'Retired activity',
    shortMoveLabel: 'Retired',
    recommendedAfter: 'Compatibility only',
    relatedJourneyStages: ['Before Morning', 'The Day Repeats'],
    stageChips: ['Retired'],
    availability: 'deprecated',
    routeId: 'how-ai-learns',
    action: 'Retired',
    modelMove: 'Preserved only for storage compatibility.',
    misconceptionTags: ['all-learning-is-training'],
    journeyStageRelationship: ['Journey support'],
    glossaryTermIds: ['training', 'fine-tuning', 'inference', 'rag', 'in-context learning']
  },
  {
    id: 'attention-weave',
    title: 'Attention Weave',
    shortDescription: 'Renamed toward Attention Match.',
    tenSecondExplanation: 'Old progress is bridged to the Attention Match Play challenge.',
    primaryActionLabel: 'Open Attention Match',
    estimatedTime: '3 min',
    practiceMove: 'Connect token clues',
    shortMoveLabel: 'Connect',
    recommendedAfter: 'After Stage 3 · Workday',
    relatedJourneyStages: ['Workday'],
    stageChips: ['Stage 3', 'Workday'],
    availability: 'deprecated',
    routeId: 'attention-match',
    action: 'Renamed',
    modelMove: 'Preserved only for storage compatibility.',
    misconceptionTags: ['attention-is-not-awareness'],
    journeyStageRelationship: ['Attention'],
    glossaryTermIds: ['attention', 'relevance-weight']
  }
]

export const FINAL_PLAY_CHALLENGE_COUNT = finalPlayChallengeRegistry.length

type LegacyPlaySignals = {
  gameInsights?: string[]
  traceComplete?: boolean
  promptRunProgress?: {
    completedSteps?: string[]
    finalChallengeComplete?: boolean
    attempts?: Record<string, number>
  }
  learningTourComplete?: boolean
  glossaryDojoProgress?: {
    currentRound?: { startedAt?: string; answers?: Array<{ isCorrect?: boolean }> } | null
    roundsAttempted?: number
    roundsCompleted?: number
    totalQuestionsAnswered?: number
    questionsAnswered?: number
    totalCorrect?: number
    terms?: Record<string, { mastered?: boolean }>
    lastCompletedRound?: { correctCount?: number; missedCount?: number; completedAt?: string } | null
  }
}

function statusText(status: PlayChallengeStatus) {
  if (status === 'completed') return 'Completed'
  if (status === 'review-suggested') return 'Review suggested'
  if (status === 'in-progress') return 'In progress'
  if (status === 'coming-soon') return 'Coming soon'
  if (status === 'retired') return 'Retired'
  return 'Ready'
}

function formatCountLabel(label: string, count: number) {
  return `${label}: ${Math.max(0, count)}`
}

function formatLastPlayed(value?: string) {
  if (!value) return 'Last played: Not yet'
  const then = new Date(value)
  if (Number.isNaN(then.getTime())) return 'Last played: Saved'
  const now = new Date()
  const sameDay = then.getFullYear() === now.getFullYear() && then.getMonth() === now.getMonth() && then.getDate() === now.getDate()
  if (sameDay) return 'Last played: Today'
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 1) return 'Last played: Yesterday'
  if (diffDays > 1 && diffDays < 7) return `Last played: ${diffDays} days ago`
  return `Last played: ${then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
}

function formatCompletions(count: number) {
  if (count <= 0) return 'Completed: 0'
  if (count === 1) return 'Completed once'
  return `Completed: ${count}`
}

function formatBestLabel(meta: PlayChallengeMeta, attempt: PlayChallengeAttempt, legacy: LegacyPlaySignals = {}) {
  if (meta.availability === 'coming-soon') return 'Progress: Coming soon'

  if (meta.id === 'glossary-dojo') {
    const dojo = legacy.glossaryDojoProgress
    if (dojo?.currentRound) {
      const currentCorrect = (dojo.currentRound.answers ?? []).filter((answer) => answer.isCorrect).length
      return `Current: ${currentCorrect} correct`
    }
    const correct = dojo?.lastCompletedRound?.correctCount
    const missed = dojo?.lastCompletedRound?.missedCount
    if (typeof correct === 'number') return `Best: ${Math.max(0, correct)} of 12`
    if (typeof missed === 'number') return `Best: ${Math.max(0, 12 - missed)} of 12`
    if ((dojo?.totalCorrect ?? 0) > 0) return `Best: ${dojo?.totalCorrect} correct`
  }

  if (meta.id === 'prompt-run') {
    if (attempt.status === 'completed' || attempt.status === 'review-suggested' || attempt.bestProgressPct >= 100) {
      return 'Best result: Full loop traced'
    }
    const promptRun = legacy.promptRunProgress
    const finalDone = Boolean(promptRun?.finalChallengeComplete || legacy.traceComplete)
    const completedSteps = finalDone ? 13 : Math.min(13, promptRun?.completedSteps?.length ?? 0)
    if (finalDone || completedSteps > 0) return `Best result: ${completedSteps} of 13 steps`
  }

  if (meta.id === 'context-stack' && (attempt.status === 'completed' || attempt.status === 'review-suggested' || attempt.bestProgressPct >= 100)) {
    return 'Best result: Main idea found'
  }

  if (meta.id === 'probability-picker' && (attempt.status === 'completed' || attempt.status === 'review-suggested' || attempt.bestProgressPct >= 100)) {
    return 'Best result: Likely is not true'
  }

  if (meta.id === 'attention-match' && (attempt.status === 'completed' || attempt.bestProgressPct >= 100)) {
    return 'Best result: Relations found'
  }

  if (attempt.status === 'in-progress' && attempt.attempts > 0 && attempt.bestProgressPct === 0) {
    return 'Current: Started'
  }

  if (attempt.bestProgressPct > 0) return `Progress: ${attempt.bestProgressPct}% explored`
  return 'Progress: Not started'
}

function buildProgressStats(meta: PlayChallengeMeta, attempt: PlayChallengeAttempt, legacy: LegacyPlaySignals = {}) {
  if (meta.availability === 'coming-soon') return ['Coming soon']

  const stats = [
    formatCountLabel('Played', attempt.attempts),
    formatBestLabel(meta, attempt, legacy)
  ]

  if (attempt.lastPlayedAt) {
    stats.push(formatLastPlayed(attempt.lastPlayedAt))
  }

  if (meta.id === 'glossary-dojo') {
    const mastered = Object.values(legacy.glossaryDojoProgress?.terms ?? {}).filter((term) => term.mastered).length
    if (mastered > 0) stats.push(`Mastered: ${mastered} terms`)
    const missed = legacy.glossaryDojoProgress?.lastCompletedRound?.missedCount ?? 0
    if (!legacy.glossaryDojoProgress?.currentRound && missed > 0) {
      stats.push(`Review: ${missed} term${missed === 1 ? '' : 's'}`)
    }
  } else if (attempt.completions > 0) {
    stats.push(formatCompletions(attempt.completions))
  }

  return stats
}

function bridgeLegacyProgress(meta: PlayChallengeMeta, base: PlayChallengeAttempt, legacy: LegacyPlaySignals = {}): PlayChallengeAttempt {
  const gameInsights = legacy.gameInsights ?? []
  const oldIds = [meta.id, ...(meta.legacyProgressIds ?? [])]
  const oldInsightComplete = oldIds.some((id) => gameInsights.includes(id))
  const hasSharedProgress = base.attempts > 0 || base.completions > 0 || base.bestProgressPct > 0 || base.status !== 'not-started'

  if (meta.id === 'prompt-run') {
    const completedSteps = legacy.promptRunProgress?.completedSteps?.length ?? 0
    const finalDone = Boolean(legacy.promptRunProgress?.finalChallengeComplete || legacy.traceComplete)
    const totalSteps = 13
    const bestProgressPct = finalDone ? 100 : Math.round((completedSteps / totalSteps) * 100)
    const attempts = Object.values(legacy.promptRunProgress?.attempts ?? {}).reduce((sum, count) => sum + Number(count || 0), 0)
    if ((finalDone || completedSteps > 0 || attempts > 0) && !hasSharedProgress) {
      return sanitizePlayChallengeAttempt({
        ...base,
        attempts: Math.max(base.attempts, attempts || 1),
        completions: Math.max(base.completions, finalDone ? 1 : 0),
        bestProgressPct: Math.max(base.bestProgressPct, bestProgressPct),
        status: finalDone ? 'completed' : 'in-progress',
        lastOutcome: finalDone ? 'Completed through legacy Prompt Run progress.' : `${completedSteps} Prompt Run steps saved.`
      })
    }
  }

  if (meta.id === 'glossary-dojo') {
    const dojo = legacy.glossaryDojoProgress
    const attempted = dojo?.roundsAttempted ?? 0
    const completed = dojo?.roundsCompleted ?? 0
    const answered = dojo?.totalQuestionsAnswered ?? dojo?.questionsAnswered ?? 0
    const mastered = Object.values(dojo?.terms ?? {}).filter((term) => term.mastered).length
    const reviewSuggested = Boolean(dojo?.lastCompletedRound?.missedCount && dojo.lastCompletedRound.missedCount > 0)
    if (dojo?.currentRound || attempted || completed || answered || mastered) {
      return sanitizePlayChallengeAttempt({
        ...base,
        attempts: Math.max(base.attempts, attempted || (dojo?.currentRound ? 1 : 0)),
        completions: Math.max(base.completions, completed),
        bestProgressPct: Math.max(base.bestProgressPct, completed ? 100 : dojo?.currentRound ? 50 : answered ? 25 : 0),
        status: reviewSuggested ? 'review-suggested' : completed ? 'completed' : dojo?.currentRound ? 'in-progress' : 'not-started',
        lastPlayedAt: base.lastPlayedAt ?? dojo?.currentRound?.startedAt ?? dojo?.lastCompletedRound?.completedAt,
        lastOutcome: completed
          ? reviewSuggested
            ? 'Completed a calm round; review suggested.'
            : 'Completed a calm practice round.'
          : dojo?.currentRound
            ? 'Round in progress.'
            : undefined
      })
    }
  }

  if (oldInsightComplete && !hasSharedProgress) {
    return sanitizePlayChallengeAttempt({
      ...base,
      attempts: Math.max(base.attempts, 1),
      completions: Math.max(base.completions, 1),
      bestProgressPct: Math.max(base.bestProgressPct, 100),
      status: 'completed',
      lastOutcome: 'Completed through earlier Play progress.'
    })
  }

  if (meta.id === 'how-ai-learns' && legacy.learningTourComplete) {
    return sanitizePlayChallengeAttempt({
      ...base,
      attempts: Math.max(base.attempts, 1),
      completions: Math.max(base.completions, 1),
      bestProgressPct: Math.max(base.bestProgressPct, 100),
      status: 'completed',
      lastOutcome: 'Legacy learning tour preserved.'
    })
  }

  return base
}

export function buildPlayChallengeSummaries(
  progress: PlayChallengeProgress,
  legacy: LegacyPlaySignals = {},
  registry: PlayChallengeMeta[] = finalPlayChallengeRegistry
): PlayChallengeSummary[] {
  return registry.map((meta) => {
    const stored = sanitizePlayChallengeAttempt(progress.challenges[meta.id])
    const bridged = bridgeLegacyProgress(meta, stored, legacy)
    const status: PlayChallengeStatus = meta.availability === 'coming-soon'
      ? 'coming-soon'
      : meta.availability === 'deprecated'
        ? 'retired'
        : bridged.status
    const progressText = status === 'coming-soon'
      ? 'Coming soon'
      : status === 'retired'
        ? 'Preserved'
        : bridged.bestProgressPct > 0
          ? `${bridged.bestProgressPct}%`
          : '0%'
    const attemptsText = bridged.attempts
      ? `Played ${bridged.attempts} time${bridged.attempts === 1 ? '' : 's'}`
      : 'Played 0 times'
    const completionText = bridged.completions
      ? formatCompletions(bridged.completions)
      : 'Not completed'
    const disabled = meta.availability === 'coming-soon' || meta.availability === 'deprecated'
    const actionLabel = disabled
      ? meta.primaryActionLabel
      : status === 'completed' || status === 'review-suggested'
        ? 'Try another round'
        : status === 'in-progress'
          ? 'Continue'
          : meta.primaryActionLabel

    return {
      ...meta,
      progress: bridged,
      status,
      statusText: meta.statusLabel ?? statusText(status),
      progressText,
      attemptsText,
      completionText,
      progressStats: buildProgressStats(meta, bridged, legacy),
      actionLabel,
      disabled
    }
  })
}

export function getCompletedFinalPlayCount(summaries: PlayChallengeSummary[]) {
  return summaries.filter((summary) => summary.status === 'completed' || summary.status === 'review-suggested').length
}

export function findRetiredPlayChallenge(id: string | null | undefined) {
  return retiredPlayChallenges.find((challenge) => challenge.routeId === id || challenge.id === id)
}
