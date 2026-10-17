import type { ReactNode } from 'react'

export type BeatId = 'arrive' | 'poke' | 'name' | 'break' | 'stamp'

export const BEAT_LABELS: Record<BeatId, string> = {
  arrive: 'Arrive',
  poke: 'Try it',
  name: 'Learn it',
  break: 'Break it',
  stamp: 'Stamp'
}

export type Option = { text: string; correct?: boolean; why?: string }

export type QuizQuestion = { q: string; options: Option[] }

/** A quick, optional guess before the lesson. Never blocks Next. */
export type Guess = { q: string; options: Option[]; reveal: ReactNode }

export type Receipt = { text: string; column: 'compute' | 'energy' | 'data' | 'labor' | 'accountability'; source?: { label: string; href: string } }

/** Everything one station's five-minute loop needs. */
export type LoopSpec = {
  code: string
  arrive: { caption: ReactNode; panel: ReactNode; flashback?: { q: string; a: string }; guess?: Guess }
  poke: { title: string; intro: ReactNode; body: ReactNode }
  name: { definition: ReactNode; terms: string[]; picture: ReactNode; metaphor: ReactNode; breaks: ReactNode; note?: ReactNode }
  break?: { title: string; intro: ReactNode; body: ReactNode }
  stamp: { questions: QuizQuestion[]; art: ReactNode; receipt: Receipt }
  /** Steps during which the page's small map window hides (e.g. while a full map is on screen). */
  hideLocatorOn?: BeatId[]
  /** Steps that skip the ride ticket (the question and model), shown on Try it and Break it by default. */
  hideTicketOn?: BeatId[]
  /** Optional extra offered after the stamp lands, never in the way of the loop. */
  bonus?: { label: string; body: ReactNode }
}

/** The steps one station's loop walks through, in order. */
export const beatsFor = (spec: LoopSpec): BeatId[] => ['arrive', 'poke', 'name', ...(spec.break ? (['break'] as BeatId[]) : []), 'stamp']
