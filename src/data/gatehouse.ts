/**
 * Recorded data for the Gatehouse side line (scripts/trace/make_gatehouse.py writes
 * src/data/traces/gatehouse.json): everything the model reads before it answers, cut into
 * who-wrote-it blocks, and the secret-ingredient heist, every attack and defense run several
 * times with the model's own sampling settings. Every consumer has a fallback.
 */
import { isClean } from '../lib/safeText'

export type Who = 'makers' | 'app' | 'you'
export type PageBlock = { who: Who; what: string; text: string; tokens: number }
export type HeistRun = { attack: string; defense: string; seed: number; text: string; leaked: boolean; stoppedNaturally: boolean; tokenCount: number }
export type Gatehouse = {
  model: { id: string }
  page: { blocks: PageBlock[]; total: number }
  heist: {
    secret: string
    samples: number
    plantedNote: string
    attacks: { id: string; label: string; text: string }[]
    defenses: { id: string; label: string; system: string }[]
    runs: HeistRun[]
  }
}

const files = import.meta.glob('./traces/gatehouse.json', { eager: true, import: 'default' }) as Record<string, Gatehouse>
const raw = Object.values(files)[0] ?? null

export const gatehouse: Gatehouse | null = raw && raw.page?.blocks?.length ? raw : null

/** The runs for one attack against one defense, unclean text hidden. */
export function heistRuns(defense: string, attack: string): HeistRun[] {
  return (gatehouse?.heist.runs ?? [])
    .filter((r) => r.defense === defense && r.attack === attack)
    .map((r) => (isClean(r.text) ? r : { ...r, text: '' }))
}

/** One short, finished reply for an attack and defense that did, or didn't, leak the secret. */
export function gatehouseSample(defense: string, attack: string, leaked: boolean): string | undefined {
  const runs = heistRuns(defense, attack).filter((r) => r.leaked === leaked && r.stoppedNaturally && r.text)
  return runs.sort((a, b) => a.text.length - b.text.length)[0]?.text
}
