import { useState, type ReactNode } from 'react'
import { breaksFor, pct, phase2, type BreakRun } from '../data/phase2'
import { modelName, trace } from '../data/trace'
import { Howto } from '../ui/Howto'
import { TokenText } from '../ui/TokenText'
import { Dial } from './parts'

type Props = {
  station: string
  /** Which recorded runs to offer, in dial order. "normal" is always first. */
  ids: string[]
  /** One plain sentence per run: what we changed, said before any result. */
  explains: Record<string, string>
  /** One plain line per run saying what went wrong (or didn't). */
  verdicts: Record<string, string>
  /** Shown once a sabotage has been tried: the answer to the step's "why" question. */
  takeaway: ReactNode
  /** For runs measured on a word instead of the digit (e.g. “flour”): its name, the words before it, and normal odds. */
  word?: { label: string; after: string; normal: number }
  /** Shorter dial labels than the recorded ones, by run id. */
  labels?: Record<string, string>
}

/** The stations a sabotage can sit at, in ride order. */
const LINE = [
  { code: 'P02', name: 'Tokenizer' },
  { code: 'P03', name: 'Embedding' },
  { code: 'P04', name: 'Attention' },
  { code: 'P05', name: 'The Stack' },
  { code: 'P06', name: 'The Vote' }
]

/** A tiny main line with the sabotaged station marked, so “where” is a place on the map. */
function MiniLine({ at }: { at: string | null }) {
  return (
    <svg className="mini-line" viewBox="0 0 320 46" role="img" aria-label={at ? `The sabotage happens at ${LINE.find((s) => s.code === at)?.name}.` : 'Nothing is sabotaged.'}>
      <path d="M20,14 H300" className="ml-track" />
      {LINE.map((s, i) => {
        const x = 32 + i * 64
        const hit = s.code === at
        return (
          <g key={s.code} className={hit ? 'ml-hit' : ''}>
            <circle cx={x} cy="14" r={hit ? 9 : 6} className="ml-stop" />
            {hit && <path d={`M${x - 3.5},10.5 L${x + 3.5},17.5 M${x + 3.5},10.5 L${x - 3.5},17.5`} className="ml-x" />}
            <text x={x} y="38" textAnchor="middle" className="ml-name">{s.name}</text>
          </g>
        )
      })}
    </svg>
  )
}

const SRC_CLASS: Record<string, string> = { special: 'cs-special', sys: 'cs-sys', rag: 'cs-rag', user: 'cs-user', tool: 'cs-tool', res: 'cs-res' }
const BLOCKS: { src: string[]; label: string }[] = [
  { src: ['sys'], label: 'hidden instructions' },
  { src: ['rag'], label: 'your upload' },
  { src: ['user'], label: 'question' },
  { src: ['tool', 'res'], label: 'calculator' }
]

/** Every token the model read before the reply, colored by where it came from, with the changed ones in red. */
function ContextStrip({ changed }: { changed: NonNullable<BreakRun['changed']> }) {
  const n = phase2?.contextLength ?? 0
  if (!trace || !n) return null
  const toks = trace.tokens.slice(0, n)
  const hit = new Set(changed.positions ?? [])
  const isHit = (p: number) => !!changed.all || hit.has(p)
  // Label each kind of block once, at its widest run of tokens.
  const labels = BLOCKS.map((b) => {
    let best = { start: 0, len: 0 }
    let start = -1
    toks.forEach((t, p) => {
      const inside = b.src.includes(t.src)
      if (inside && start < 0) start = p
      if ((!inside || p === n - 1) && start >= 0) {
        const end = inside ? p + 1 : p
        if (end - start > best.len) best = { start, len: end - start }
        start = -1
      }
    })
    return { ...b, mid: best.start + best.len / 2, len: best.len, row: 0 }
  })
    .filter((b) => b.len > 0)
    .sort((a, b) => a.mid - b.mid)
  // Labels that would collide drop to a second row (widths estimated for a phone-width strip).
  const pctPerChar = 100 / 52
  labels.forEach((b, i) => {
    const prev = labels[i - 1]
    if (prev && prev.row === 0 && ((b.mid - prev.mid) / n) * 100 < ((b.label.length + prev.label.length) / 2 + 1) * pctPerChar) b.row = 1
  })
  const named = hit.size > 0 && hit.size <= 6 ? [...hit].map((p) => toks[p]?.text ?? '').join('') : ''
  return (
    <figure className="ctx-strip">
      <svg viewBox={`0 0 ${n} 24`} preserveAspectRatio="none" role="img" aria-label={`${changed.all ? n : hit.size} of the ${n} tokens the model read were changed.`}>
        {toks.map((t, p) => (
          <rect key={p} x={p} y={isHit(p) ? 1 : 7} width="1.02" height={isHit(p) ? 22 : 10} className={isHit(p) ? 'cs-hit' : SRC_CLASS[t.src] ?? 'cs-special'} />
        ))}
      </svg>
      <div className={`cs-labels${labels.some((b) => b.row) ? ' two' : ''}`} aria-hidden="true">
        {labels.map((b) => (
          <span key={b.label} style={{ left: `${(b.mid / n) * 100}%`, top: b.row ? '13px' : 0 }}>{b.label}</span>
        ))}
      </div>
      <figcaption>
        {changed.all
          ? `All ${n} tokens the model read: each one sees only itself.`
          : `${hit.size} of the ${n} tokens the model read, in red${named.trim() ? `: “${named.trim()}”` : ''}.`}
      </figcaption>
    </figure>
  )
}

/** The floors, with the removed ones in red. */
function FloorStrip({ removed }: { removed: number[] }) {
  const total = trace?.model.layers ?? 24
  const gone = new Set(removed)
  const range = removed.length > 1 ? `Floors ${removed[0]}–${removed[removed.length - 1]} removed` : `Floor ${removed[0]} removed`
  return (
    <figure className="ctx-strip">
      <svg viewBox={`0 0 ${total * 13} 18`} role="img" aria-label={`${range}, of ${total}.`}>
        {Array.from({ length: total }, (_, i) => (
          <rect key={i} x={i * 13 + 1} y="2" width="11" height="14" rx="2" className={gone.has(i + 1) ? 'cs-hit' : 'cs-floor'} />
        ))}
      </svg>
      <figcaption>{range}, of {total}. Floor 1 is on the left.</figcaption>
    </figure>
  )
}

/**
 * Break it, from recorded runs. Pick a sabotage; see what we changed and where (a mini line and a
 * strip of the context or the floors), then two tests: what it wrote on its own, and its odds at one
 * spot given the right words up to there.
 */
export function RunBreak({ station, ids, explains, verdicts, takeaway, word, labels = {} }: Props) {
  const all = breaksFor(station)
  const runs = ['normal', ...ids].map((id) => all.find((b) => b.id === id)).filter((b): b is BreakRun => !!b)
  const [id, setId] = useState('normal')
  const [tried, setTried] = useState(false)
  if (runs.length < 2) return <p className="muted">The recorded sabotage runs arrive with the next trace run.</p>
  const run = runs.find((r) => r.id === id) ?? runs[0]
  const normal = runs[0]
  const broken = run.id !== 'normal'
  // A run measured on a word shows that word's odds; every other run shows the digit's.
  const onWord = !!(run.wordProb && word)
  const measure = onWord && run.wordProb ? run.wordProb : run.rightDigit
  const top = measure.top[0]
  const changed = run.changed
  return (
    <div className="break-body">
      <Howto>Pick a sabotage. Then read what we changed, and what happened.</Howto>
      <Dial<string>
        stops={runs.map((r) => r.id)}
        value={run.id}
        onChange={(v) => {
          setId(v)
          if (v !== 'normal') setTried(true)
        }}
        label="Sabotage"
        format={(v) => labels[v] ?? runs.find((r) => r.id === v)?.label ?? v}
      />
      <div className={`sabotage-what${broken ? ' on' : ''}`}>
        <p className="kicker">What we changed</p>
        <p>{explains[run.id] ?? ''}</p>
        <MiniLine at={broken ? station : null} />
        {broken && changed?.floorsRemoved && <FloorStrip removed={changed.floorsRemoved} />}
        {broken && (changed?.positions || changed?.all) && <ContextStrip changed={changed} />}
      </div>
      <div className={`break-result${broken ? ' broken' : ''}`}>
        <div className="said">
          <p className="kicker">What it wrote on its own</p>
          <blockquote>{run.text.trim() ? <>{run.text.trim()}{run.stoppedNaturally ? '' : ' …'}</> : '(nothing readable)'}</blockquote>
          {verdicts[run.id] && <p className="break-stat">{verdicts[run.id]}</p>}
        </div>
        <div className="break-tiles">
          <div className="break-tile">
            <span className="kicker">{onWord && word ? `Odds of “${word.label}” after “${word.after}”` : 'Odds of “8” after “You need about”'}</span>
            <b>{pct(measure.prob)}</b>
            <small>{onWord && word ? `normally ${pct(word.normal)}` : broken ? `normally ${pct(normal.rightDigit.prob)}` : 'given the right words up to there'}</small>
          </div>
          {top && (
            <div className="break-tile">
              <span className="kicker">Its top pick there</span>
              <b className="tile-token"><TokenText text={top.text} /></b>
              <small>{pct(top.prob)}</small>
            </div>
          )}
        </div>
        <p className="muted small">
          Two tests, both real runs of {trace ? modelName(trace) : 'the recorded model'}: it writes the reply on its own, always taking its top token; and we check its odds at one spot, after feeding it the right words up to there.
        </p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}
