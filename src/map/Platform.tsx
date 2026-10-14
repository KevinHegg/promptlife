import type { Src } from '../data/heroRun'
import type { PlatformToken } from './runEngine'
import { TokenText } from '../ui/TokenText'

const LEGEND: { src: Src; chip: string; label: string }[] = [
  { src: 'sys', chip: 'sys', label: 'system prompt' },
  { src: 'rag', chip: 'rag', label: 'fetched passages' },
  { src: 'user', chip: 'you', label: 'your question' },
  { src: 'tool', chip: 'call', label: 'tool call' },
  { src: 'res', chip: '93', label: 'tool result' },
  { src: 'rep', chip: 'reply', label: 'reply' }
]

/** The context window, drawn as a platform the train's tokens wait on. */
export function Platform({ tokens }: { tokens: PlatformToken[] }) {
  const counts = tokens.reduce<Record<string, number>>((acc, t) => ({ ...acc, [t.src]: (acc[t.src] ?? 0) + 1 }), {})
  return (
    <div className="platform-wrap">
      <div className="platform-head">
        <h3>The platform: everything in context</h3>
        <span className="mono muted">{tokens.length} tokens</span>
      </div>
      <div className="platform" aria-label="Tokens currently in the context window">
        {tokens.map((t, i) => (
          <span key={`${i}-${t.src}-${t.text}`} className={`tk ${t.src}${t.fresh ? ' new' : ''}`}>
            <TokenText text={t.text} />
          </span>
        ))}
      </div>
      <div className="pf-legend">
        {LEGEND.map((l) => (
          <span key={l.src}>
            <i className={`tk ${l.src}`}>{l.chip}</i>
            {l.label} <b>{counts[l.src] ?? 0}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
