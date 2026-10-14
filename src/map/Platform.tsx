import { useState } from 'react'
import type { Src } from '../data/heroRun'
import type { PlatformToken } from './runEngine'
import { TokenText } from '../ui/TokenText'

const LEGEND: { src: Src; chip: string; label: string }[] = [
  { src: 'special', chip: '<|…|>', label: 'role markers' },
  { src: 'sys', chip: 'sys', label: 'system prompt + tool description' },
  { src: 'rag', chip: 'rag', label: 'fetched passages' },
  { src: 'user', chip: 'you', label: 'your question' },
  { src: 'tool', chip: 'call', label: 'tool call' },
  { src: 'res', chip: '93', label: 'tool result' },
  { src: 'rep', chip: 'reply', label: 'reply' }
]

const COLLAPSE_OVER = 40
const KEEP = 14

type Run = { src: Src; tokens: PlatformToken[] }

function runsOf(tokens: PlatformToken[]): Run[] {
  const runs: Run[] = []
  for (const t of tokens) {
    const last = runs[runs.length - 1]
    if (last && last.src === t.src) last.tokens.push(t)
    else runs.push({ src: t.src, tokens: [t] })
  }
  return runs
}

/** The context window, drawn as a platform. Long app-added stretches fold up until opened. */
export function Platform({
  tokens,
  onPick,
  outline,
  title = 'The platform: everything in context'
}: {
  tokens: PlatformToken[]
  onPick?: (t: PlatformToken) => void
  outline?: Src
  title?: string
}) {
  const [open, setOpen] = useState<Set<number>>(new Set())
  const counts = tokens.reduce<Record<string, number>>((acc, t) => ({ ...acc, [t.src]: (acc[t.src] ?? 0) + 1 }), {})
  const runs = runsOf(tokens)
  return (
    <div className="platform-wrap">
      <div className="platform-head">
        <h3>{title}</h3>
        <span className="mono muted">{tokens.length} tokens</span>
      </div>
      <div className={`platform${onPick ? ' pickable' : ''}`} aria-label="Tokens currently in the context window">
        {runs.map((run) => {
          const first = run.tokens[0].i
          const folded = run.tokens.length > COLLAPSE_OVER && !open.has(first)
          const shown = folded ? run.tokens.slice(0, KEEP) : run.tokens
          return (
            <span key={first} className="run">
              {shown.map((t) => {
                const cls = `tk ${t.src}${t.fresh ? ' new' : ''}${outline === t.src ? ' outlined' : ''}`
                return onPick ? (
                  <button key={t.i} type="button" className={cls} onClick={() => onPick(t)}>
                    <TokenText text={t.text} />
                  </button>
                ) : (
                  <span key={t.i} className={cls}>
                    <TokenText text={t.text} />
                  </span>
                )
              })}
              {folded && (
                <button type="button" className={`tk fold ${run.src}`} onClick={() => setOpen((s) => new Set(s).add(first))}>
                  +{run.tokens.length - KEEP} more
                </button>
              )}
            </span>
          )
        })}
      </div>
      <div className="pf-legend">
        {LEGEND.filter((l) => counts[l.src]).map((l) => (
          <span key={l.src}>
            <i className={`tk ${l.src}`}>{l.chip}</i>
            {l.label} <b>{counts[l.src] ?? 0}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
