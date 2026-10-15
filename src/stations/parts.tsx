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

export type ContextBlock = { key: string; src: Src; label: string; count: number; preview: string }

/**
 * The whole context grouped into a few labeled blocks (template markers counted on their own),
 * so a student can see what the model read without wading through hundreds of tokens.
 */
export function contextBlocks(): ContextBlock[] {
  const lastPassage = RUN.passages[RUN.passages.length - 1] ?? -1
  const labelFor = (src: Src, i: number) => {
    if (src === 'sys') return i > lastPassage && lastPassage >= 0 ? 'The calculator’s instructions' : 'Hidden instructions'
    return ({ rag: 'Your files (the recipe card)', user: 'Your question', tool: 'The model’s calculator request', res: 'The calculator’s result', rep: 'The answer', special: 'Markers' } as Record<string, string>)[src]
  }
  const blocks: ContextBlock[] = []
  let markers = 0
  for (const t of RUN.tokens) {
    if (t.src === 'special') {
      markers++
      continue
    }
    const label = labelFor(t.src, t.i)
    const last = blocks[blocks.length - 1]
    if (last && last.label === label) {
      last.count++
      if (last.preview.length < 70) last.preview += t.text
    } else blocks.push({ key: `${t.src}-${t.i}`, src: t.src, label, count: 1, preview: t.text })
  }
  blocks.push({ key: 'markers', src: 'special', label: 'Hidden markers between the parts', count: markers, preview: '<|im_start|> user … <|im_end|>' })
  return blocks.map((b) => ({ ...b, preview: b.preview.replace(/\s+/g, ' ').trim() }))
}

export function ContextBlocks({ onPick, chosen }: { onPick?: (b: ContextBlock) => void; chosen?: string }) {
  const blocks = contextBlocks()
  const max = Math.max(...blocks.map((b) => b.count))
  return (
    <ol className="ctx-blocks">
      {blocks.map((b) => (
        <li key={b.key}>
          <button type="button" className={`ctx-block${chosen === b.key ? ' chosen' : ''}`} onClick={() => onPick?.(b)} disabled={!onPick}>
            <span className="cb-top">
              <span className="cb-label">{b.label}</span>
              <span className="cb-count">{b.count} tokens</span>
            </span>
            <span className="cb-bar"><span className={`cb-fill tk-bg-${b.src}`} style={{ width: `${Math.max(1.5, (b.count / max) * 100)}%` }} /></span>
            <span className="cb-preview">{b.preview.length > 64 ? `${b.preview.slice(0, 64)}…` : b.preview}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
