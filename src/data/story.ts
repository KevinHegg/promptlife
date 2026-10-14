/**
 * Plain-language captions for the living map's run. Kept in one place so the voice stays
 * consistent: short sentences, "word pieces" before "tokens", no jargon on the board.
 */
import { SCENARIO, TOOL_IN_WORDS } from './heroRun'
import { trace } from './trace'

const q = (s: string) => `“${s}”`
const shown = (t: string) => (/^\s+$/.test(t) ? 'a space' : q(t.trim()))
const pct = (p: number) => (p >= 0.995 ? '99%' : p < 0.01 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)

type Attn = { id?: string; plain?: string; label: string }
const attention = (trace?.attention ?? []) as Attn[]
const lookBack = attention.find((a) => a.id === 'question-to-card') ?? attention.find((a) => a.id === 'induction')

export const STORY = {
  waiting: `${q(SCENARIO.user)} is waiting at Send.`,
  send: (pieces: number) => `Your question boards the train: ${pieces} word pieces, called tokens.`,
  gate: 'Before the model sees anything, the app adds hidden instructions and a description of its calculator.',
  toLibrary: 'Next, the Library line: the app searches your saved files.',
  L1: 'Searching: which of your files match the question?',
  L2: 'Found two matches: the recipe card, and the back of the card.',
  L3: 'Both are added to what the model will read.',
  tokenizer: (all: number, yours: number) => `Everything is cut into word pieces, and each becomes a number. ${all} pieces in all; you typed ${yours}.`,
  embedding: 'Each number is swapped for a long list of numbers that stands for its meaning.',
  attention: lookBack?.plain ?? 'Each piece looks back at earlier pieces for clues.',
  stack: (layers: number | null) => `${layers ?? 'Dozens of'} layers of math refine every piece, one floor at a time.`,
  firstVote: (chosen: string, prob: number | null, favorite: string | null, favoriteProb: number | null, rank: number | null) =>
    rank !== null && rank > 1 && favorite
      ? `The model scores every possible next piece. Its favorite was ${shown(favorite)} (${pct(favoriteProb ?? 0)}), to start explaining in words. This app requires its calculator, so the run starts a calculator request instead.`
      : `The model scores every possible next piece. Its pick: ${shown(chosen)}${prob !== null ? ` (${pct(prob)})` : ''}.`,
  loop: (trips: number) => `The new piece joins the platform. Then the whole trip runs again for the next piece. ${trips} trips in this answer.`,
  writingRequest: 'Writing a calculator request, one piece per trip.',
  requestDone: 'The request is done. The model stops, and the app takes over on the Workshop line.',
  W1: 'The app reads the request.',
  W2: `The calculator works it out: ${TOOL_IN_WORDS} = ${SCENARIO.toolResult}.`,
  W3: 'The result is pasted back in, as text.',
  resultCut: (n: number) => `The result is cut into word pieces too: ${n} of them.`,
  replying: 'Now the model writes the answer, one piece per trip.',
  stopMarker: 'The model writes its “stop” piece, so this part ends.',
  differs: (favorite: string, used: string) => `The model's favorite here was ${shown(favorite)}; the recorded answer used ${shown(used)}.`,
  done: (trips: number) => `Arrived after ${trips} trips. Lit lines were used. The Academy, where models are trained, stays dark: answering never changes the model.`
}

/** A tool call's raw text, shown plainly: calculator(2.25 * 30 / 8). */
export function friendlyRequest(raw: string): string {
  const expr = raw.match(/"expression"\s*:\s*"([^"]*)"?/)
  const name = raw.match(/"name"\s*:\s*"([^"]*)"/)
  if (expr) return `${name?.[1] ?? 'calculator'}(${expr[1]}${raw.includes('"}') ? ')' : ''}`
  return raw.replace(/<\/?tool_call>/g, '').replace(/\s+/g, ' ').trim()
}
