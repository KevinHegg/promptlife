/**
 * Recorded data for the Darkroom side line (scripts/trace/make_darkroom.py writes
 * src/data/traces/darkroom.json and the pictures in public/darkroom/): Grandma's card read by a
 * small vision model at four sizes, and three Stable Diffusion runs saved step by step.
 */
import { isClean } from '../lib/safeText'

export type PatchSize = {
  width: number
  height: number
  file: string
  grid: { t: number; h: number; w: number }
  patches: number
  tokens: number
  resizedTo: [number, number]
  answers: Record<'read' | 'flour', { text: string; flagged: boolean }>
}
export type DiffusionRun = { id: string; prompt: string; guidance: number; seed: number; frames: string[] }
type Darkroom = {
  card: { file: string; width: number; height: number }
  patches: { model: string; patchSize: number; merge: number; sizes: PatchSize[] }
  diffusion: { model: string; steps: number; runs: DiffusionRun[] }
}

const files = import.meta.glob('./traces/darkroom.json', { eager: true, import: 'default' }) as Record<string, Darkroom>
export const darkroom: Darkroom | null = Object.values(files)[0] ?? null

/** A recorded picture's URL, under the site's base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const patchSizes = (): PatchSize[] =>
  (darkroom?.patches.sizes ?? []).map((s) => ({
    ...s,
    answers: {
      read: s.answers.read.flagged || !isClean(s.answers.read.text) ? { ...s.answers.read, text: '' } : s.answers.read,
      flour: s.answers.flour.flagged || !isClean(s.answers.flour.text) ? { ...s.answers.flour, text: '' } : s.answers.flour
    }
  }))

export const diffusionRun = (id: string) => darkroom?.diffusion.runs.find((r) => r.id === id)

/** Right about the flour: 2 1/4 cups, and serves 8. */
export const flourRight = (s: PatchSize) => /2 1\/4 cups/.test(s.answers.flour.text) && /\b8\b/.test(s.answers.flour.text)
