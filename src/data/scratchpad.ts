/**
 * Recorded data for the Scratchpad side line (scripts/trace/make_scratchpad.py writes
 * src/data/traces/scratchpad.json): Qwen3-0.6B answering our question with thinking off, cut
 * short, and on, ten times each. The true answer is 8.4375 cups.
 */
import { isClean } from '../lib/safeText'

export type ThinkRun = {
  condition: string
  seed: number
  thinking: string
  thinkingTokens: number
  answer: string
  answerTokens: number
  stoppedNaturally: boolean
  cutShort: boolean
  finalNumber: string | null
  correct: boolean
}

const files = import.meta.glob('./traces/scratchpad.json', { eager: true, import: 'default' }) as Record<string, { model: { id: string }; runs: ThinkRun[] }>
const raw = Object.values(files)[0]

export const scratchModel = raw?.model.id ?? 'Qwen/Qwen3-0.6B'

/** The runs for one condition ('off', 'budget-64', 'budget-256', 'on'), unclean text hidden. */
export function thinkRuns(condition: string): ThinkRun[] {
  return (raw?.runs ?? [])
    .filter((r) => r.condition === condition)
    .map((r) => (isClean(r.thinking) && isClean(r.answer) ? r : { ...r, thinking: '', answer: '' }))
}

export function thinkStats(condition: string) {
  const rs = thinkRuns(condition)
  const n = rs.length || 1
  return {
    runs: rs.length,
    correct: rs.filter((r) => r.correct).length,
    meanTokens: Math.round(rs.reduce((s, r) => s + r.thinkingTokens + r.answerTokens, 0) / n),
    meanThinking: Math.round(rs.reduce((s, r) => s + r.thinkingTokens, 0) / n),
    meanAnswer: Math.round(rs.reduce((s, r) => s + r.answerTokens, 0) / n),
    cutOff: rs.filter((r) => !r.stoppedNaturally).length
  }
}
