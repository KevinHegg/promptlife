export type PlayChallengeId =
  | 'glossary-dojo'
  | 'context-stack'
  | 'probability-picker'
  | 'prompt-run'
  | 'attention-match'
  | 'attention-weave'
  | 'token-relay'
  | 'how-ai-learns'

export type PlayChallengeStatus =
  | 'not-started'
  | 'in-progress'
  | 'completed'
  | 'review-suggested'
  | 'coming-soon'
  | 'retired'

export type PlayChallengeAvailability = 'available' | 'foundation-ready' | 'coming-soon' | 'deprecated'

export type PlayChallengeOutcome = {
  status?: PlayChallengeStatus
  progressPct?: number
  outcome?: string
  completed?: boolean
  reviewSuggested?: boolean
  misconceptionTags?: string[]
}

export type PlayChallengeAttempt = {
  attempts: number
  completions: number
  bestProgressPct: number
  status: PlayChallengeStatus
  lastPlayedAt?: string
  completedAt?: string
  lastOutcome?: string
  misconceptionTags?: string[]
  journeyStageRelationship?: string[]
  glossaryTermIds?: string[]
}

export type PlayChallengeProgress = {
  version: 1
  challenges: Partial<Record<PlayChallengeId, PlayChallengeAttempt>>
  storageAvailable: boolean
}

export type PlayChallengeMeta = {
  id: PlayChallengeId
  title: string
  shortDescription: string
  tenSecondExplanation: string
  primaryActionLabel: string
  estimatedTime: string
  relatedJourneyStages: string[]
  recommendedAfter: string
  stageChips: string[]
  relatedLearningCards?: string[]
  statusLabel?: string
  availability: PlayChallengeAvailability
  routeId?: string
  image?: string
  action?: string
  modelMove?: string
  misconceptionTags?: string[]
  journeyStageRelationship?: string[]
  glossaryTermIds?: string[]
  legacyProgressIds?: PlayChallengeId[]
  recordAttemptOnOpen?: boolean
}

export type PlayChallengeSummary = PlayChallengeMeta & {
  progress: PlayChallengeAttempt
  status: PlayChallengeStatus
  statusText: string
  progressText: string
  attemptsText: string
  completionText: string
  progressStats: string[]
  actionLabel: string
  disabled: boolean
}
