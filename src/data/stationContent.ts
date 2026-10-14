import type { LineId } from './network'

/** What each station page offers today, and which lines transfer there. */
export type StationContent = {
  cutaway: 'loop' | 'tokenizer' | 'attention' | 'stack' | 'vote' | null
  transfers: LineId[]
  /** One sentence on what this station's full five-minute loop will let you do. */
  coming: string
}

export const STATION_CONTENT: Record<string, StationContent> = {
  P01: { cutaway: 'loop' as const, transfers: ['L', 'G'], coming: 'A 60-second ride through the whole map before you choose where to look first.' },
  P02: { cutaway: 'tokenizer', transfers: ['L', 'W', 'D'], coming: 'Bet on how many pieces a sentence becomes, then try to make the tokenizer stumble.' },
  P03: { cutaway: null, transfers: [], coming: 'Wander a map of meaning and find which words land near “final”.' },
  P04: { cutaway: 'attention', transfers: [], coming: 'Hunt for the attention head that links “final” to “syllabus”.' },
  P05: { cutaway: 'stack', transfers: ['A'], coming: 'Ride the elevator and watch the guess sharpen floor by floor.' },
  P06: { cutaway: 'vote', transfers: [], coming: 'Play Beat the Model: guess the next word and score by the model’s odds.' },
  P07: { cutaway: null, transfers: ['W', 'S'], coming: 'Step the reply out token by token and watch the platform fill up.' },
  P08: { cutaway: null, transfers: ['R'], coming: 'Replay the run, read the receipt, then take on Debug the Bot.' }
}
