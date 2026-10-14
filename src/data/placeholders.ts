/**
 * Stand-in numbers for the cutaways until the trace pipeline supplies real ones.
 * Every screen that shows these says so.
 */
export type AttentionView = {
  label: string
  query: string
  tokens: { text: string; w: number }[] // earlier tokens (and the query itself, last)
  real: boolean
  source?: string
}

export type FloorView = {
  context: string
  floors: { layer: number; guess: string; prob: number }[] // top of the building first
  real: boolean
  source?: string
}

export type VoteView = {
  context: string
  candidates: { text: string; logit: number }[]
  real: boolean
  source?: string
}

export const PLACEHOLDER_ATTENTION: AttentionView = {
  label: 'where “final” looks',
  query: ' final',
  tokens: [
    { text: ' my', w: 0.08 },
    { text: ' syllabus', w: 0.46 },
    { text: ' what', w: 0.05 },
    { text: ' need', w: 0.12 },
    { text: ' the', w: 0.21 },
    { text: ' final', w: 0.08 }
  ],
  real: false
}

export const PLACEHOLDER_FLOORS: FloorView = {
  context: 'You need at least',
  floors: [
    { layer: 24, guess: ' 93', prob: 0.88 },
    { layer: 18, guess: ' 93', prob: 0.52 },
    { layer: 12, guess: ' 90', prob: 0.21 },
    { layer: 6, guess: ' a', prob: 0.09 },
    { layer: 1, guess: ' the', prob: 0.04 }
  ],
  real: false
}

export const PLACEHOLDER_VOTE: VoteView = {
  context: 'You need at least',
  candidates: [
    { text: ' 93', logit: 6.1 },
    { text: ' a', logit: 3.2 },
    { text: ' about', logit: 2.9 },
    { text: ' 94', logit: 1.4 },
    { text: ' an', logit: 0.6 }
  ],
  real: false
}
