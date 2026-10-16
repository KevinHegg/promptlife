/**
 * Plain-language captions for the living map's run. Kept in one place so the voice stays
 * consistent: short sentences, "token" every time (defined once as a word part), no other jargon.
 */
import { SCENARIO, TOOL_IN_WORDS } from './heroRun'
import { trace } from './trace'
import { phase1 } from './phase1'

const q = (s: string) => `“${s}”`
const shown = (t: string) => (/^\s+$/.test(t) ? 'a space' : q(t.trim()))
const pct = (p: number) => (p >= 0.995 ? '99%' : p < 0.01 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)

type Attn = { id?: string; plain?: string; label: string }
const attention = (trace?.attention ?? []) as Attn[]
const lookBack = attention.find((a) => a.id === 'question-to-card') ?? attention.find((a) => a.id === 'induction')

/** The sum the model asked for when left to itself, if it differs from the recorded request. */
const ownExpression = (() => {
  const text = phase1.freeFirstTurn?.text ?? ''
  const m = text.match(/"expression"\s*:\s*"([^"]*)"/)
  return m && m[1].replace(/\s+/g, '') !== SCENARIO.toolExpression.replace(/\s+/g, '') ? m[1] : null
})()
const prettySum = (e: string) => e.replace(/\*/g, '×').replace(/\//g, '÷')
export const MODEL_OWN_SUM = ownExpression ? prettySum(ownExpression) : null
export const MODEL_USED_TOOL_ITSELF = !!phase1.freeFirstTurn?.usedTool

export const STORY = {
  waiting: `${q(SCENARIO.user)} is waiting at Send.`,
  send: (tokens: number) => `Your question boards as ${tokens} tokens. Tokens are word parts: “strawberry” is st · raw · berry.`,
  gate: 'First, the app quietly adds hidden instructions and a description of its calculator.',
  toLibrary: 'Next, the Library line: the app searches your saved files.',
  L1: 'Searching: which parts of your uploads match the question?',
  L2: 'Found two matches: the recipe card, and the back of the card.',
  L3: 'Both are added to what the model will read.',
  tokenizer: (all: number, yours: number) => `Everything is cut into tokens, and each token becomes a number: ${all} tokens. You typed ${yours}.`,
  embedding: 'Each token’s number is swapped for a long list of numbers that stands for its meaning.',
  attention: lookBack?.plain ?? 'Each token looks back at earlier tokens for clues.',
  stack: (layers: number | null) => `${layers ?? 'Dozens of'} layers of math refine every token, one floor at a time.`,
  firstVote: (chosen: string, prob: number | null, favorite: string | null, favoriteProb: number | null, rank: number | null) =>
    rank !== null && rank > 1 && favorite
      ? `Its favorite was ${shown(favorite)} (${pct(favoriteProb ?? 0)}), to answer in words. This app requires the calculator, so the ride starts a request.`
      : /tool_call/.test(chosen)
        ? `The model scores every possible next token. Its pick${prob !== null ? `, at ${pct(prob)}` : ''}: start a calculator request.`
        : `The model scores every possible next token. Its pick: ${shown(chosen)}${prob !== null ? ` (${pct(prob)})` : ''}.`,
  loop: (trips: number) => `The new token joins the platform, and the trip runs again for the next token: ${trips} trips in all.`,
  writingRequest: 'Writing a calculator request, one token per trip.',
  requestDone: MODEL_OWN_SUM
    ? `Request done. On its own, this model asked for ${MODEL_OWN_SUM}, the wrong sum; this ride uses the right one.`
    : 'The request is done. The model stops, and the app takes over.',
  W1: 'The app reads the request.',
  W2: `The calculator works it out: ${TOOL_IN_WORDS} = ${SCENARIO.toolResult}.`,
  W3: 'The result is pasted back in, as text.',
  resultCut: (n: number) => `The result is cut into tokens too: ${n} of them.`,
  replying: 'Now the model writes the answer, one token per trip.',
  stopMarker: 'The model writes its “stop” token, so this part ends.',
  differs: (favorite: string, used: string) => `The model's favorite here was ${shown(favorite)}; the recorded answer used ${shown(used)}.`,
  done: (trips: number) => `Arrived after ${trips} trips. The Academy, where models are trained, stays dark: answering never changes the model.`
}

/** A tool call's raw text, shown plainly: calculator(2.25 * 30 / 8). */
export function friendlyRequest(raw: string): string {
  const expr = raw.match(/"expression"\s*:\s*"([^"]*)"?/)
  const name = raw.match(/"name"\s*:\s*"([^"]*)"/)
  if (expr) return `${name?.[1] ?? 'calculator'}(${expr[1]}${raw.includes('"}') ? ')' : ''}`
  return raw.replace(/<\/?tool_call>/g, '').replace(/\s+/g, ' ').trim()
}
