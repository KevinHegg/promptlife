/**
 * Recorded data for the Academy's fine-tuning step (scripts/trace/make_academy.py writes
 * src/data/traces/academy.json): the hero first turn sent to the base model (pretrained only) and
 * to the fine-tuned model on our ride, with and without the calculator.
 */
import { isClean } from '../lib/safeText'

export type Guess = { text: string; prob: number }
export type AcademyRun = {
  model: 'base' | 'instruct'
  modelId: string
  condition: 'tools' | 'plain'
  firstTop: Guess[]
  toolCallProb: number
  text: string
  stoppedNaturally: boolean
  tokenCount: number
  answerEnd?: number
  rewroteFrom?: number | null
  inventedQuestion?: string | null
  stopProbAfterAnswer?: number
  flagged?: boolean
}

const files = import.meta.glob('./traces/academy.json', { eager: true, import: 'default' }) as Record<string, { runs: AcademyRun[] }>
const raw = Object.values(files)[0]

export const academyRuns: AcademyRun[] = (raw?.runs ?? []).filter((r) => !r.flagged && isClean(r.text))

export const academyRun = (model: AcademyRun['model'], condition: AcademyRun['condition']) =>
  academyRuns.find((r) => r.model === model && r.condition === condition)
