/**
 * Reads the recorded run from scripts/trace (src/data/traces/hero-trace.json) when it exists.
 * import.meta.glob returns an empty object when the file is missing, so the app still builds
 * and the cutaways fall back to labeled placeholders.
 */
import type { AttentionView, FloorView, VoteView } from './placeholders'

type Src = 'special' | 'sys' | 'rag' | 'user' | 'tool' | 'res' | 'rep'
type Candidate = { id: number; text: string; logit: number; prob: number }

export type Trace = {
  version: 1
  model: { id: string; layers: number; heads: number; dModel: number; vocabSize: number; license: string }
  tokens: { i: number; id: number; text: string; src: Src }[]
  steps: { pos: number; chosen: Candidate & { rank: number }; top: Candidate[] }[]
  logitLens: { id?: string; plain?: string; pos: number; label: string; layers: { layer: number; top: { text: string; prob: number }[] }[] }[]
  attention: { id?: string; plain?: string; layer: number; head: number; label: string; queryPos: number; weights: { pos: number; w: number }[] }[]
  embeddings?: { method: string; points: { text: string; x: number; y: number; group: string }[] }
  notes?: string[]
}

const files = import.meta.glob('./traces/hero-trace.json', { eager: true, import: 'default' }) as Record<string, Trace>
export const trace: Trace | null = Object.values(files)[0] ?? null

export const modelName = (t: Trace) => t.model.id.split('/').pop() ?? t.model.id

/**
 * The text just before a position, within the current turn (so a tool result never runs into the
 * reply), cut back to a word boundary (models split numbers into digits).
 */
function contextBefore(t: Trace, pos: number, maxChars = 30) {
  const start = Math.max(0, pos - 24)
  let from = start
  for (let i = pos - 1; i >= start; i--) {
    if (t.tokens[i]?.src === 'special') {
      from = i + 1
      break
    }
  }
  const joined = (a: number) =>
    t.tokens
      .slice(a, pos)
      .filter((tok) => tok.src !== 'special')
      .map((tok) => tok.text)
      .join('')
  // At the very start of a turn, show the end of the turn before instead.
  const text = joined(from).trim() ? joined(from) : joined(start)
  if (text.length <= maxChars) return text.trim()
  const tail = text.slice(-maxChars)
  const cut = tail.indexOf(' ')
  return `…${(cut >= 0 ? tail.slice(cut + 1) : tail).trim()}`
}

const HEAD_NAMES: Record<string, string> = {
  'question-to-card': 'Looks at the card',
  induction: 'Pattern finder',
  'previous-token': 'Looks one back',
  copy: 'Copier'
}

function headName(id: string | undefined, label: string) {
  if (id && HEAD_NAMES[id]) return HEAD_NAMES[id]
  if (/induction/i.test(label)) return 'Pattern finder'
  if (/previous/i.test(label)) return 'Looks one back'
  if (/copy/i.test(label)) return 'Copier'
  return 'Attention head'
}

/**
 * One view per recorded head (the second row of the same head is skipped). Template markers
 * and the first position, which soaks up spare attention in most heads, are left out of the arcs.
 */
export function attentionViewsFromTrace(t: Trace): AttentionView[] {
  const seen = new Set<string>()
  const views: AttentionView[] = []
  for (const row of t.attention) {
    const key = `${row.layer}.${row.head}`
    if (seen.has(key)) continue
    seen.add(key)
    const query = t.tokens[row.queryPos]
    const earlier = row.weights
      .filter((w) => w.pos !== row.queryPos && w.pos !== 0 && t.tokens[w.pos]?.src !== 'special')
      .sort((a, b) => b.w - a.w)
      .slice(0, 5)
      .sort((a, b) => a.pos - b.pos)
    const self = row.weights.find((w) => w.pos === row.queryPos)?.w ?? 0
    views.push({
      name: headName(row.id, row.label),
      label: row.plain ?? row.label,
      query: query?.text ?? '',
      tokens: [
        ...earlier.map((w) => ({ text: t.tokens[w.pos]?.text ?? '?', w: w.w, pos: w.pos, src: t.tokens[w.pos]?.src })),
        { text: query?.text ?? '', w: self, pos: row.queryPos, src: query?.src }
      ],
      real: true,
      source: `Real weights from ${modelName(t)}, layer ${row.layer}, head ${row.head}. Template markers and the first token, which soaks up spare attention, are hidden.`
    })
  }
  return views
}

/** Show the floors where the final guess has formed; summarize the noisy floors below. */
export function floorsFromTrace(t: Trace): FloorView | null {
  const lens =
    t.logitLens.find((l) => l.id === 'answer-digit') ??
    t.logitLens.find((l) => l.id === 'reply-word') ??
    t.logitLens.find((l) => /digit|'\d'/i.test(l.label)) ??
    t.logitLens[0]
  if (!lens || lens.layers.length === 0) return null
  const layers = lens.layers.filter((l) => l.layer > 0)
  const finalGuess = layers[layers.length - 1].top[0]?.text
  let start = layers.length - 1
  while (start > 0 && layers[start - 1].top[0]?.text === finalGuess) start--
  start = Math.max(0, Math.min(start, layers.length - 4)) // always show at least four floors
  const shown = layers.slice(start).reverse()
  const firstShown = layers[start].layer
  return {
    context: contextBefore(t, lens.pos),
    floors: shown.map((l) => ({ layer: l.layer, guess: l.top[0]?.text ?? '', prob: l.top[0]?.prob ?? 0 })),
    below: firstShown > 1 ? `Layers 1–${firstShown - 1}: no clear guess yet. Reading them gives scraps of code and other languages.` : undefined,
    real: true,
    source: `Real per-layer guesses from ${modelName(t)} (${t.model.layers} layers), read with the logit lens.`
  }
}

function entropy(ps: number[]) {
  return -ps.reduce((a, p) => (p > 0 ? a + p * Math.log(p) : a), 0)
}

/** The most undecided moment in the reply makes the best temperature demo. */
export function voteFromTrace(t: Trace): VoteView | null {
  const replySteps = t.steps.filter((s) => t.tokens[s.pos]?.src === 'rep')
  const step = [...replySteps].sort((a, b) => entropy(b.top.map((c) => c.prob)) - entropy(a.top.map((c) => c.prob)))[0] ?? t.steps[0]
  if (!step) return null
  const chosen = step.chosen.text.trim() ? `“${step.chosen.text.trim()}”` : 'a space, the start of the number'
  return {
    context: contextBefore(t, step.pos),
    candidates: step.top.slice(0, 6).map((c) => ({ text: c.text, logit: c.logit })),
    real: true,
    source: `Real scores from ${modelName(t)}. In the recorded reply it took ${chosen} (rank ${step.chosen.rank}).`
  }
}
