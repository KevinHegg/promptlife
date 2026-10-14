import { useState, type ReactNode } from 'react'
import type { Src } from '../data/heroRun'
import { RUN, runCounts } from '../data/run'
import { TokenText } from '../ui/TokenText'

/** A red-handled sabotage switch. Red is reserved for Break it. */
export function Lever({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className={`lever${on ? ' on' : ''}`}>
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span className="lever-track" aria-hidden="true"><span className="lever-handle" /></span>
      <span className="lever-label">{label}</span>
    </label>
  )
}

/** A multi-position sabotage dial (e.g. temperature stops). */
export function Dial<T extends number | string>({ stops, value, onChange, label, format }: { stops: T[]; value: T; onChange: (v: T) => void; label: string; format?: (v: T) => ReactNode }) {
  return (
    <div className="dial" role="radiogroup" aria-label={label}>
      <span className="dial-label">{label}</span>
      {stops.map((s) => (
        <button key={String(s)} type="button" role="radio" aria-checked={s === value} className={`dial-stop${s === value ? ' on' : ''}`} onClick={() => onChange(s)}>
          {format ? format(s) : String(s)}
        </button>
      ))}
    </div>
  )
}

export function Chips({ pieces, hot }: { pieces: { text: string; id?: number }[]; hot?: (i: number) => boolean }) {
  return (
    <div className="chips-row">
      {pieces.map((p, i) => (
        <span key={i} className={`chip-tk${hot?.(i) ? ' hot' : ''}`}>
          <b><TokenText text={p.text} /></b>
          {p.id !== undefined && <small>{p.id}</small>}
        </span>
      ))}
    </div>
  )
}

const SRC_ORDER: { src: Src; label: string }[] = [
  { src: 'special', label: 'role markers' },
  { src: 'sys', label: 'system prompt and tool description' },
  { src: 'rag', label: 'fetched passages' },
  { src: 'user', label: 'your question' },
  { src: 'tool', label: 'tool call' },
  { src: 'res', label: 'tool result' },
  { src: 'rep', label: 'reply' }
]

/** The whole context as one bar, drawn to scale by source, with your part outlined. */
export function ContextBar() {
  const counts = RUN.tokens.reduce<Record<string, number>>((a, t) => ({ ...a, [t.src]: (a[t.src] ?? 0) + 1 }), {})
  const total = RUN.tokens.length
  return (
    <figure className="ctx-bar">
      <div className="ctx-track" role="img" aria-label={`Of ${total} tokens in context, ${runCounts.question} are your question.`}>
        {SRC_ORDER.filter((s) => counts[s.src]).map((s) => (
          <span key={s.src} className={`ctx-seg tk-bg-${s.src}${s.src === 'user' ? ' you' : ''}`} style={{ flexGrow: counts[s.src] }} title={`${s.label}: ${counts[s.src]}`} />
        ))}
      </div>
      <figcaption>
        {SRC_ORDER.filter((s) => counts[s.src]).map((s) => (
          <span key={s.src}><i className={`tk-bg-${s.src}`} />{s.label} {counts[s.src]}</span>
        ))}
      </figcaption>
    </figure>
  )
}

export function Reveal({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return open ? <>{children}</> : <button type="button" className="btn small" onClick={() => setOpen(true)}>{label}</button>
}
