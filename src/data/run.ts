/**
 * The run the living map plays, derived from the recorded trace: which tokens the app adds,
 * which the model generates (one trip each), and what the model preferred at every trip.
 * Falls back to the scripted o200k run when no trace file exists.
 */
import { HERO_TOKENS, type Src } from './heroRun'
import { trace } from './trace'

export type RunTok = { i: number; text: string; src: Src }
export type RunStep = { i: number; text: string; prob: number | null; rank: number | null; favorite: string | null; favoriteProb: number | null }
export type Turn = { kind: 'tool' | 'reply'; steps: RunStep[] }

export type RunScript = {
  model: string | null
  tokens: RunTok[]
  question: number[]
  wrapper: number[]
  passages: number[]
  genPrompt: number[]
  turns: Turn[]
  /** App-added tokens after each turn (bridges[k] follows turns[k]). */
  bridges: number[][]
  trips: number
}

function fromTrace(): RunScript | null {
  if (!trace) return null
  const steps = new Map(trace.steps.map((s) => [s.pos, s]))
  const tokens: RunTok[] = trace.tokens.map((t) => ({ i: t.i, text: t.text, src: t.src }))
  const firstUser = tokens.findIndex((t) => t.src === 'user')
  const lastUser = tokens.length - 1 - [...tokens].reverse().findIndex((t) => t.src === 'user')
  const script: RunScript = { model: trace.model.id.split('/').pop() ?? trace.model.id, tokens, question: [], wrapper: [], passages: [], genPrompt: [], turns: [], bridges: [], trips: steps.size }

  let turn: Turn | null = null
  let bridge: number[] | null = null
  for (const t of tokens) {
    const step = steps.get(t.i)
    if (t.i < firstUser) {
      ;(t.src === 'rag' ? script.passages : script.wrapper).push(t.i)
    } else if (t.i <= lastUser) {
      script.question.push(t.i)
    } else if (step) {
      if (!turn) {
        turn = { kind: 'tool', steps: [] }
        script.turns.push(turn)
        bridge = null
      }
      if (t.src === 'rep') turn.kind = 'reply'
      const fav = step.top[0]
      turn.steps.push({ i: t.i, text: t.text, prob: step.chosen.prob, rank: step.chosen.rank, favorite: fav?.text ?? null, favoriteProb: fav?.prob ?? null })
    } else if (script.turns.length === 0) {
      script.genPrompt.push(t.i)
    } else {
      turn = null
      if (!bridge) {
        bridge = []
        script.bridges.push(bridge)
      }
      bridge.push(t.i)
    }
  }
  return script
}

/** Scripted fallback: o200k tokens, no model odds. */
function fromScript(): RunScript {
  const tokens: RunTok[] = []
  const push = (src: Src, list: string[]) => list.map((text) => {
    const i = tokens.length
    tokens.push({ i, text, src })
    return i
  })
  const wrapper = push('sys', HERO_TOKENS.sys)
  const passages = push('rag', HERO_TOKENS.rag)
  const question = push('user', HERO_TOKENS.user)
  const plain = (i: number): RunStep => ({ i, text: tokens[i].text, prob: null, rank: null, favorite: null, favoriteProb: null })
  const tool = push('tool', HERO_TOKENS.tool).map(plain)
  const res = push('res', HERO_TOKENS.res)
  const rep = push('rep', HERO_TOKENS.rep).map(plain)
  return {
    model: null,
    tokens,
    question,
    wrapper,
    passages,
    genPrompt: [],
    turns: [{ kind: 'tool', steps: tool }, { kind: 'reply', steps: rep }],
    bridges: [res],
    trips: tool.length + rep.length
  }
}

export const RUN: RunScript = fromTrace() ?? fromScript()

export const runCounts = {
  total: RUN.tokens.length,
  question: RUN.question.length,
  wrapper: RUN.wrapper.length,
  passages: RUN.passages.length,
  trips: RUN.trips,
  toolTrips: RUN.turns.filter((t) => t.kind === 'tool').reduce((a, t) => a + t.steps.length, 0),
  replyTrips: RUN.turns.filter((t) => t.kind === 'reply').reduce((a, t) => a + t.steps.length, 0),
  result: RUN.tokens.filter((t) => t.src === 'res').length,
  systemPrompt: RUN.wrapper.filter((i) => RUN.tokens[i].src === 'sys' && (RUN.passages.length === 0 || i < RUN.passages[0])).length,
  toolDescription: RUN.wrapper.filter((i) => RUN.tokens[i].src === 'sys' && RUN.passages.length > 0 && i > RUN.passages[RUN.passages.length - 1]).length
}

/** The text a run of generated steps spells out, without template markers. */
export const textOf = (steps: RunStep[]) => steps.filter((s) => !/^<\|.*\|>$/.test(s.text)).map((s) => s.text).join('')
