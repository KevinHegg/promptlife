/**
 * Extra recorded data for the Phase 1 stations (scripts/trace/make_phase1.py writes
 * src/data/traces/phase1.json). Every consumer has a fallback built from the hero trace,
 * so the app works before the file exists.
 */
import { trace } from './trace'

export type VoteCandidate = { id?: number; text: string; logit: number }
export type VotePosition = {
  pos: number
  label: string
  /** A plain one-line description from the trace pipeline, if present. */
  plain?: string
  context: string
  chosen: { text: string; rank: number; prob: number }
  top: VoteCandidate[]
  /** Everything outside `top`, binned by score. Lets "everything else" be exact at any temperature. */
  tail?: { binWidth: number; bins: { logit: number; count: number }[] }
}
export type TempRun = { T: number; seed: number; text: string; tokens: string[]; stoppedNaturally: boolean }
export type Guess = { text: string; prob: number }
export type ThinkLike = { pos: number; context: string; truth: string; top: Guess[] }
export type Sentence = { source: string; prefix: string; truth: string; truthProb: number; truthRank: number; top: Guess[] }

export type Phase1 = {
  votePositions: VotePosition[]
  temperatureRuns: TempRun[]
  freeFirstTurn?: { text: string; tokenCount: number; usedTool: boolean; finalNumberMentioned: string | null; pToolCallStart?: number; toolCallStartRank?: number }
  freeFirstTurnNudged?: { text: string; tokenCount: number; usedTool: boolean }
  letters?: { questionTokenCountNormal: number; questionTokenCountLetters: number; firstTurnGreedy: { text: string; usedTool: boolean; pToolCallStart?: number; toolCallStartRank?: number } }
  beat: { thinkLike: ThinkLike[]; sentences: Sentence[] }
}

const files = import.meta.glob('./traces/phase1.json', { eager: true, import: 'default' }) as Record<string, Partial<Phase1> & Record<string, unknown>>
const raw = Object.values(files)[0] ?? null

const strip = (s: string) => s.replace(/<\|[^|]*\|>/g, '').replace(/\s+/g, ' ')

function contextText(pos: number, chars = 40) {
  if (!trace) return ''
  const text = strip(trace.tokens.slice(Math.max(0, pos - 30), pos).map((t) => t.text).join(''))
  const tail = text.slice(-chars)
  const cut = tail.indexOf(' ')
  return text.length > chars ? `…${(cut >= 0 ? tail.slice(cut + 1) : tail).trim()}` : text.trim()
}

/**
 * With only the top 10 stored, model the rest of the vocabulary as one lump whose share at
 * temperature 1 matches the real leftover probability. Exact at T = 1, approximate elsewhere.
 */
function approxTail(top: { logit: number; prob: number }[]): VotePosition['tail'] {
  const rest = 1 - top.reduce((a, c) => a + c.prob, 0)
  if (rest <= 1e-6 || !top[0]) return undefined
  return { binWidth: 0, bins: [{ logit: top[0].logit - Math.log(top[0].prob) + Math.log(rest), count: 1 }] }
}

/** Fallback vote positions from the hero trace (top 10 only, so "everything else" is approximate). */
function heroVotes(): VotePosition[] {
  if (!trace) return []
  const entropy = (ps: number[]) => -ps.reduce((a, p) => (p > 0 ? a + p * Math.log(p) : a), 0)
  const reply = trace.steps.filter((s) => trace!.tokens[s.pos]?.src === 'rep')
  const lively = [...reply].sort((a, b) => entropy(b.top.map((c) => c.prob)) - entropy(a.top.map((c) => c.prob)))[0]
  const wanted = [249, 313, lively?.pos].filter((p): p is number => typeof p === 'number')
  return [...new Set(wanted)]
    .map((pos) => trace!.steps.find((s) => s.pos === pos))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .map((s) => ({
      pos: s.pos,
      label: s.pos === 249 ? 'Start of the first turn' : `Reply: ${contextText(s.pos, 24)}`,
      context: contextText(s.pos),
      chosen: { text: s.chosen.text, rank: s.chosen.rank, prob: s.chosen.prob },
      top: s.top.map((c) => ({ id: c.id, text: c.text, logit: c.logit })),
      tail: approxTail(s.top)
    }))
}

function heroThinkLike(): ThinkLike[] {
  if (!trace) return []
  return trace.steps
    .filter((s) => trace!.tokens[s.pos]?.src === 'rep' && /\w/.test(s.chosen.text))
    .slice(0, 5)
    .map((s) => ({ pos: s.pos, context: contextText(s.pos, 60), truth: s.chosen.text, top: s.top.map((c) => ({ text: c.text, prob: c.prob })) }))
}

/** The recorded contexts can include tool-call JSON; on screen we show the last line of text. */
function lastLine(ctx: string) {
  const lines = ctx.split('\n').map((l) => l.trim()).filter(Boolean)
  const last = lines[lines.length - 1] ?? ''
  return last.length >= 8 || lines.length < 2 ? last : `${lines[lines.length - 2]} ${last}`
}

function shortLabel(v: VotePosition, firstGenerated: number) {
  if (v.plain && v.plain.includes(':')) return v.plain.split(':')[0]
  if (v.pos === firstGenerated) return 'Start of the answer'
  const words = lastLine(v.context).split(' ').slice(-3).join(' ')
  return `“…${words} ___”`
}

function tidyVotes(list: VotePosition[]): VotePosition[] {
  const firstGenerated = trace?.steps[0]?.pos ?? -1
  return list.map((v) => ({ ...v, label: shortLabel(v, firstGenerated), context: lastLine(v.context) }))
}

export const phase1: Phase1 & { real: boolean } = {
  real: !!raw,
  votePositions: tidyVotes((raw?.votePositions as VotePosition[] | undefined)?.length ? (raw!.votePositions as VotePosition[]) : heroVotes()),
  temperatureRuns: (raw?.temperatureRuns as TempRun[] | undefined) ?? [],
  freeFirstTurn: raw?.freeFirstTurn as Phase1['freeFirstTurn'],
  freeFirstTurnNudged: raw?.freeFirstTurnNudged as Phase1['freeFirstTurnNudged'],
  letters: raw?.letters as Phase1['letters'],
  beat: {
    thinkLike: ((raw?.beat as Phase1['beat'] | undefined)?.thinkLike ?? heroThinkLike()).map((t) => ({ ...t, context: lastLine(t.context) })),
    sentences: (raw?.beat as Phase1['beat'] | undefined)?.sentences ?? []
  }
}

/** Softmax at temperature T over the stored top scores plus the binned tail. Index top.length is "everything else". */
export function voteProbs(v: VotePosition, T: number): { top: number[]; rest: number } {
  const z = v.top.map((c) => c.logit)
  const max = Math.max(...z)
  if (T <= 0) {
    const best = z.indexOf(max)
    return { top: z.map((_, i) => (i === best ? 1 : 0)), rest: 0 }
  }
  const e = z.map((x) => Math.exp((x - max) / T))
  const tail = v.tail?.bins.reduce((a, b) => a + b.count * Math.exp((b.logit - max) / T), 0) ?? 0
  const sum = e.reduce((a, b) => a + b, 0) + tail
  return { top: e.map((x) => x / sum), rest: tail / sum }
}
