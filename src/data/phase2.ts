/**
 * Recorded data for the Embedding, Attention and Stack lessons (scripts/trace/make_phase2.py writes
 * src/data/traces/phase2.json): a recipe-themed map of meaning, and real sabotage runs, each a
 * greedy reply plus the odds of the right digit under the same sabotage. Every consumer has a
 * fallback, so the app works before the file exists.
 */
import { isClean } from '../lib/safeText'

export type MapWord = {
  text: string
  id: number
  group: string
  x: number
  y: number
  neighbors: { text: string; cos: number }[]
  /** base64 of 896 int8 values: the raw embedding row, scaled so the largest is ±127 */
  strip: string
}
export type TableRow = { id: number; text: string; first: number[]; strip: string }
export type WordMap = {
  /** The embedding table's size, and the real rows on either side of “ flour”. */
  table?: { rows: number; cols: number; around: TableRow[] }
  method: string
  groups: { id: string; label: string }[]
  words: MapWord[]
  sameGroupNearest: { full: number; map: number }
  flourNeighbors: { text: string; cos: number }[]
}
export type Guess = { text: string; prob: number }
export type BreakRun = {
  id: string
  station: string
  label: string
  text: string
  stoppedNaturally: boolean
  tokenCount: number
  rightDigit: { prob: number; top: Guess[] }
  wordProb?: { prob: number; top: Guess[] }
  flagged?: boolean
}
export type Phase2 = {
  wordMap?: WordMap
  breaks: BreakRun[]
  skipEach?: { floor: number; prob: number }[]
  notes?: string[]
}

const files = import.meta.glob('./traces/phase2.json', { eager: true, import: 'default' }) as Record<string, Partial<Phase2>>
const raw = Object.values(files)[0] ?? null

export const phase2: Phase2 | null = raw ? { breaks: [], ...raw } as Phase2 : null

/** The runs one station's Break it compares, normal first. Flagged or unclean text never shows. */
export function breaksFor(station: string): BreakRun[] {
  if (!phase2) return []
  const runs = phase2.breaks.filter((b) => b.id === 'normal' || b.station === station)
  return runs.map((b) => (b.flagged || !isClean(b.text) ? { ...b, text: '' } : b))
}

export const breakById = (id: string) => phase2?.breaks.find((b) => b.id === id)

/** Decode a stored strip into 896 numbers from -1 to 1. */
export function decodeStrip(b64: string): number[] {
  if (typeof atob === 'undefined') return []
  const bin = atob(b64)
  const out: number[] = new Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
    const byte = bin.charCodeAt(i)
    out[i] = (byte > 127 ? byte - 256 : byte) / 127
  }
  return out
}

/** Cosine similarity of two strips (approximate: strips are rounded to 255 levels). */
export function cosine(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0
}

export const pct = (p: number) => (p >= 0.995 ? `${(p * 100).toFixed(1)}%` : p < 0.001 ? '<0.1%' : p < 0.1 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)
