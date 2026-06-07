import type { GlossaryDojoTermMeta } from '../../data/glossaryDojoMeta'

export type GlossarySourceTerm = {
  id: string
  term: string
  aliases?: string[]
  definition: string
  relationship?: string
  metaphor?: string
  brainMetaphor?: string
  brainLimit?: string
  confused?: string
  related?: string[]
}

export type GlossaryDojoTerm = {
  id: string
  label: string
  aliases: string[]
  learningPathIndex: number
  shortDefinition: string
  longDefinition: string
  relationship: string
  metaphor: string
  relatedTermIds: string[]
} & GlossaryDojoTermMeta

export type GlossaryDojoQuestionType =
  | 'term_to_definition'
  | 'definition_to_term'
  | 'closest_concept'
  | 'confusable_pair'
  | 'relationship'
  | 'stage_location'

export type GlossaryDojoOptionKind = 'term' | 'definition' | 'statement' | 'stage'

export type GlossaryDojoOption = {
  id: string
  termId: string
  representedTermId: string
  label: string
  displayedLabel: string
  displayedDefinition: string
  detail?: string
  kind: GlossaryDojoOptionKind
  isCorrect: boolean
  feedbackTermId?: string
}

export type GlossaryDojoQuestion = {
  id: string
  type: GlossaryDojoQuestionType
  typeLabel: string
  prompt: string
  helperText: string
  definitionText?: string
  targetTermId: string
  correctTermId: string
  correctOptionId: string
  optionKind: GlossaryDojoOptionKind
  options: GlossaryDojoOption[]
  explanation: string
  contrast?: string
  stageLabel?: string
}

export type GlossaryDojoAnswer = {
  questionId: string
  selectedOptionId: string
  selectedTermId: string
  correctTermId: string
  targetTermId: string
  isCorrect: boolean
  answeredAt: string
}

export type GlossaryDojoAnswerResult = {
  answer: GlossaryDojoAnswer
  selectedOption: GlossaryDojoOption
  correctOption: GlossaryDojoOption
}

export type GlossaryDojoRound = {
  id: string
  roundNumber: number
  roundId: string
  createdAt: string
  completedAt?: string
  currentIndex: number
  targetTermIds: string[]
  sourceMode: 'new_round' | 'repeat_round' | 'review_missed'
  repeatCount: number
  repeatedFromRoundId?: string
  reviewFromRoundId?: string
  questions: GlossaryDojoQuestion[]
  answers: GlossaryDojoAnswer[]
}

export type GlossaryDojoTermProgress = {
  practiced: number
  attempts: number
  correct: number
  incorrect: number
  missed: number
  correctRoundNumbers: number[]
  mastered: boolean
  masteredAt?: string
  needsReview: boolean
  lastMissedRoundNumber?: number
  lastSeen?: string
}

export type GlossaryDojoMistake = {
  termId: string
  selectedTermId: string
  questionId: string
  roundNumber: number
  at: string
}

export type GlossaryDojoCompletedRound = {
  id: string
  roundNumber: number
  roundId: string
  completedAt: string
  correctCount: number
  missedCount: number
  sourceMode: GlossaryDojoRound['sourceMode']
  repeatCount: number
  repeatedFromRoundId?: string
  reviewFromRoundId?: string
  targetTermIds: string[]
  questions: GlossaryDojoQuestion[]
  answers: GlossaryDojoAnswer[]
}

export type GlossaryDojoRoundRecord = {
  id: string
  roundNumber: number
  completedAt: string
  correctCount: number
  missedCount: number
  sourceMode: GlossaryDojoRound['sourceMode']
  repeatCount: number
  repeatedFromRoundId?: string
  reviewFromRoundId?: string
  targetTermIds: string[]
}

export type GlossaryDojoProgress = {
  roundsCompleted: number
  roundsAttempted: number
  questionsAnswered: number
  totalQuestionsAnswered: number
  totalCorrect: number
  totalMissed: number
  recentMistakes: GlossaryDojoMistake[]
  perRound: GlossaryDojoRoundRecord[]
  terms: Record<string, GlossaryDojoTermProgress>
  currentRound: GlossaryDojoRound | null
  lastCompletedRound: GlossaryDojoCompletedRound | null
  storageAvailable: boolean
}
