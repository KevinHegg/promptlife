/**
 * Recorded data for the Library and Workshop side lines (scripts/trace/make_library.py writes
 * src/data/traces/library.json): Grandma's recipe box, MiniLM similarity scores for two questions,
 * the model's real answers with the top K cards pasted in, a search tool that reads the whole box,
 * and two calculator experiments. Every consumer has a fallback, so the app works without it.
 */
import { isClean } from '../lib/safeText'

export type Chunk = { id: string; card: string; text: string; buttermilk: boolean; flour: string | null }
export type Score = { chunk: string; cos: number }
export type Question = { id: string; text: string; truth: { amount?: string; recipes?: string[] }; scores: Score[] }
export type Guess = { text: string; prob: number }
export type LibraryRun = {
  id: string
  kind: 'lookup' | 'all' | 'tool' | 'workshop'
  k?: number
  included?: string[]
  text: string
  stoppedNaturally: boolean
  tokenCount: number
  rightAmount?: { prob: number; top: Guess[] }
  named?: string[]
  correct?: number
  missed?: number
  wrong?: number
  toolChoice?: { prob: number; top: Guess[] }
  toolRequest?: string
  toolResult?: string
  finalNumber?: string | null
  flagged?: boolean
  /** The same greedy run continued to a natural stop, when the recorded text hit its length cap. */
  untilStop?: { text: string; stoppedNaturally: boolean; tokenCount: number }
}
export type Library = {
  retriever: { id: string; dims: number; pooling: string }
  chunks: Chunk[]
  questions: Question[]
  runs: LibraryRun[]
  notes?: string[]
}

const files = import.meta.glob('./traces/library.json', { eager: true, import: 'default' }) as Record<string, Library>
const raw = Object.values(files)[0] ?? null

export const library: Library | null = raw && raw.chunks?.length ? raw : null

/** Show math the way people write it: the model sometimes answers in LaTeX and markdown. */
const tidy = (t: string) =>
  t
    .replace(/\\\(|\\\)|\\\[|\\\]/g, '')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\*\*/g, '')
    .replace(/ {2,}/g, ' ')
    .replace(/[ \t]+\n/g, '\n')

/**
 * A run by id, showing the whole answer: when the recorded text was cut at its length cap, the same
 * greedy run continued to its natural stop. Flagged or unclean text is hidden.
 */
export function libraryRun(id: string): LibraryRun | undefined {
  const r = library?.runs.find((x) => x.id === id)
  if (!r) return undefined
  const full = r.untilStop && !r.stoppedNaturally ? { ...r, text: r.untilStop.text, stoppedNaturally: r.untilStop.stoppedNaturally, tokenCount: r.untilStop.tokenCount } : r
  return full.flagged || !isClean(full.text) ? { ...full, text: '' } : { ...full, text: tidy(full.text) }
}

export const chunkById = (id: string) => library?.chunks.find((c) => c.id === id)
export const question = (id: string) => library?.questions.find((q) => q.id === id)
/** The K values recorded for a kind of run, in order. */
export const recordedKs = (kind: LibraryRun['kind']) =>
  [...new Set((library?.runs ?? []).filter((r) => r.kind === kind && r.k).map((r) => r.k as number))].sort((a, b) => a - b)
