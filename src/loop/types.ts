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

export type Receipt = { text: string; column: 'compute' | 'energy' | 'data' | 'labor' | 'accountability'; source?: { label: string; href: string } }

/** Everything one station's five-minute loop needs. */
export type LoopSpec = {
  code: string
  arrive: { caption: string; panel: ReactNode; flashback?: { q: string; a: string } }
  poke: { title: string; intro: string; body: ReactNode }
  name: { definition: string; terms: string[]; picture: ReactNode; metaphor: string; breaks: string }
  break?: { title: string; intro: string; body: ReactNode }
  stamp: { questions: QuizQuestion[]; art: ReactNode; receipt: Receipt }
}
