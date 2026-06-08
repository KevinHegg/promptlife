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
    relatedJourneyStages: ['All stages'],
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
    id: 'context-stack',
    title: 'Context Stack',
    shortDescription: 'See what fits in context.',
    tenSecondExplanation: 'Push cards into a small tray and notice which older context falls out.',
    primaryActionLabel: 'Open stack',
    estimatedTime: '3 min',
    relatedJourneyStages: ['The Day Repeats'],
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
    id: 'probability-picker',
    title: 'Probability Picker',
    shortDescription: 'Explore probability-shaped next-token choices.',
    tenSecondExplanation: 'This slot is reserved for choosing one next token from probabilities without treating probability as truth.',
    primaryActionLabel: 'Coming soon',
    estimatedTime: '3 min',
    relatedJourneyStages: ['Decision Room'],
    availability: 'coming-soon',
    action: 'Choose one likely token.',
    modelMove: 'Raw scores become probabilities, then sampling chooses one token.',
    misconceptionTags: ['probability-is-truth', 'sampling-is-certainty'],
    journeyStageRelationship: ['Logits', 'Softmax', 'Sampling'],
    glossaryTermIds: ['logits', 'softmax', 'probability', 'sampling']
  },
  {
    id: 'prompt-run',
    title: 'Prompt Run',
    shortDescription: 'Capstone challenge: trace one prompt through the whole loop.',
    tenSecondExplanation: 'Trace the full inference loop from visible context to one selected and appended token.',
    primaryActionLabel: 'Start capstone',
    estimatedTime: '8-10 min',
    relatedJourneyStages: ['Morning Commute', 'Workday', 'Decision Room', 'Day Repeats'],
    availability: 'available',
    routeId: 'trace-one-prompt',
    image: '/assets/promptlife/illustrations/scene-token-pipeline-relay@mobile.png',
    action: 'Label, connect, choose, append.',
    modelMove: 'Follow the prompt through tokenization, hidden states, probabilities, sampling, and append-repeat.',
    misconceptionTags: ['inference-is-training', 'context-is-memory', 'next-token-magic'],
    journeyStageRelationship: ['Prompt vs Response', 'Tokenization', 'Autoregression'],
    glossaryTermIds: ['prompt', 'token', 'embedding', 'hidden state', 'logits', 'softmax', 'sampling', 'autoregression']
  },
  {
    id: 'attention-match',
    title: 'Attention Match',
    shortDescription: 'Connect a token to what it depends on.',
    tenSecondExplanation: 'This foundation version reuses the current weave task while framing the final challenge as token relevance matching.',
    primaryActionLabel: 'Preview match',
    estimatedTime: '3 min',
    relatedJourneyStages: ['Workday'],
    availability: 'foundation-ready',
    routeId: 'attention-match',
    image: '/assets/promptlife/illustrations/scene-attention-weave@mobile.png',
    action: 'Connect relevant tokens.',
    modelMove: 'Attention weights relate token positions in the current context.',
    misconceptionTags: ['attention-is-awareness'],
    journeyStageRelationship: ['Attention'],
    glossaryTermIds: ['attention', 'relevance-weight'],
    legacyProgressIds: ['attention-weave']
  }
]

export const retiredPlayChallenges: PlayChallengeMeta[] = [
  {
    id: 'token-relay',
    title: 'Token Pipeline Relay',
    shortDescription: 'Retired from the final Play slate.',
    tenSecondExplanation: 'Its useful determinism idea belongs inside Prompt Run or Probability Picker later.',
    primaryActionLabel: 'Back to Play',
    estimatedTime: '3 min',
    relatedJourneyStages: ['Decision Room'],
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
    shortDescription: 'Retired from the final Play slate.',
    tenSecondExplanation: 'This content now belongs with Journey and review support instead of a final Play card.',
    primaryActionLabel: 'Back to Play',
    estimatedTime: '5 min',
    relatedJourneyStages: ['Before Morning', 'The Day Repeats'],
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
    tenSecondExplanation: 'Old progress is bridged to the Attention Match foundation card.',
    primaryActionLabel: 'Open Attention Match',
    estimatedTime: '3 min',
    relatedJourneyStages: ['Workday'],
    availability: 'deprecated',
    routeId: 'attention-match',
    action: 'Renamed',
    modelMove: 'Preserved only for storage compatibility.',
    misconceptionTags: ['attention-is-awareness'],
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
    currentRound?: unknown
    roundsAttempted?: number
    roundsCompleted?: number
    totalQuestionsAnswered?: number
    questionsAnswered?: number
    terms?: Record<string, { mastered?: boolean }>
    lastCompletedRound?: { missedCount?: number } | null
  }
}

function statusText(status: PlayChallengeStatus) {
  if (status === 'completed') return 'Completed'
  if (status === 'review-suggested') return 'Review suggested'
  if (status === 'in-progress') return 'In progress'
  if (status === 'coming-soon') return 'Foundation ready'
  if (status === 'retired') return 'Retired'
  return 'Ready'
}

function bridgeLegacyProgress(meta: PlayChallengeMeta, base: PlayChallengeAttempt, legacy: LegacyPlaySignals = {}): PlayChallengeAttempt {
  const gameInsights = legacy.gameInsights ?? []
  const oldIds = [meta.id, ...(meta.legacyProgressIds ?? [])]
  const oldInsightComplete = oldIds.some((id) => gameInsights.includes(id))

  if (meta.id === 'prompt-run') {
    const completedSteps = legacy.promptRunProgress?.completedSteps?.length ?? 0
    const finalDone = Boolean(legacy.promptRunProgress?.finalChallengeComplete || legacy.traceComplete)
    const totalSteps = 13
    const bestProgressPct = finalDone ? 100 : Math.round((completedSteps / totalSteps) * 100)
    const attempts = Object.values(legacy.promptRunProgress?.attempts ?? {}).reduce((sum, count) => sum + Number(count || 0), 0)
    if (finalDone || completedSteps > 0 || attempts > 0) {
      return sanitizePlayChallengeAttempt({
        ...base,
        attempts: Math.max(base.attempts, attempts || 1),
        completions: Math.max(base.completions, finalDone ? 1 : 0),
        bestProgressPct: Math.max(base.bestProgressPct, bestProgressPct),
        status: finalDone ? 'completed' : 'in-progress',
        lastOutcome: finalDone ? 'Completed without needing a score.' : `${completedSteps} Prompt Run steps saved.`
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

  if (oldInsightComplete) {
    return sanitizePlayChallengeAttempt({
      ...base,
      attempts: Math.max(base.attempts, 1),
      completions: Math.max(base.completions, 1),
      bestProgressPct: Math.max(base.bestProgressPct, 100),
      status: 'completed',
      lastOutcome: 'Completed without needing a score.'
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
      ? 'Foundation ready'
      : status === 'retired'
        ? 'Preserved'
        : bridged.bestProgressPct > 0
          ? `${bridged.bestProgressPct}%`
          : '0%'
    const attemptsText = bridged.attempts
      ? `${bridged.attempts} attempt${bridged.attempts === 1 ? '' : 's'}`
      : 'No attempts yet'
    const completionText = bridged.completions
      ? `${bridged.completions} completion${bridged.completions === 1 ? '' : 's'}`
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
