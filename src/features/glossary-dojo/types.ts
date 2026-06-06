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
  shortDefinition: string
  longDefinition: string
  relationship: string
  metaphor: string
  relatedTermIds: string[]
} & GlossaryDojoTermMeta

export type GlossaryDojoQuestionType =
  | 'term_to_definition'
  | 'definition_to_term'
  | 'confusable_pair'
  | 'relationship'
  | 'stage_location'

export type GlossaryDojoOptionKind = 'term' | 'definition'

export type GlossaryDojoOption = {
  id: string
  termId: string
  label: string
  detail?: string
  kind: GlossaryDojoOptionKind
}

export type GlossaryDojoQuestion = {
  id: string
  type: GlossaryDojoQuestionType
  typeLabel: string
  prompt: string
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
  createdAt: string
  currentIndex: number
  questions: GlossaryDojoQuestion[]
  answers: GlossaryDojoAnswer[]
}

export type GlossaryDojoTermProgress = {
  practiced: number
  correct: number
  incorrect: number
  correctRoundNumbers: number[]
  mastered: boolean
  needsReview: boolean
  lastMissedRoundNumber?: number
}

export type GlossaryDojoMistake = {
  termId: string
  selectedTermId: string
  questionId: string
  roundNumber: number
  at: string
}

export type GlossaryDojoCompletedRound = {
  roundNumber: number
  completedAt: string
  answers: GlossaryDojoAnswer[]
}

export type GlossaryDojoProgress = {
  roundsCompleted: number
  questionsAnswered: number
  recentMistakes: GlossaryDojoMistake[]
  terms: Record<string, GlossaryDojoTermProgress>
  currentRound: GlossaryDojoRound | null
  lastCompletedRound: GlossaryDojoCompletedRound | null
  storageAvailable: boolean
}
