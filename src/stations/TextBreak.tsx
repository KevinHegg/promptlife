import { useState, type ReactNode } from 'react'
import { Howto } from '../ui/Howto'
import { Term } from '../ui/Term'
import { Dial } from './parts'

export type TextBreakOption = {
  id: string
  label: string
  /** What we changed, said before any result. */
  explain: ReactNode
  /** What the model actually wrote (recorded). */
  text: string
  stoppedNaturally?: boolean
  /** One plain line on what happened. */
  verdict?: ReactNode
  /** Up to two numbers that change with the option. */
  tiles?: { label: string; value: ReactNode; note?: string }[]
  /** Anything else to show under what it wrote, e.g. the cards it was given. */
  extra?: ReactNode
}

/**
 * Break it for the side lines: the same rhythm as the main line (pick an option, read what we
 * changed, see what the model wrote and what that means), built from any recorded runs.
 */
export function TextBreak({ options, takeaway, howto = 'Pick one. Then read what we changed, and what happened.' }: { options: TextBreakOption[]; takeaway: ReactNode; howto?: string }) {
  const [id, setId] = useState(options[0]?.id ?? '')
  const [tried, setTried] = useState(false)
  if (options.length < 2) return <p className="muted">The recorded runs for this step arrive with the next trace run.</p>
  const o = options.find((x) => x.id === id) ?? options[0]
  const first = o.id === options[0].id
  return (
    <div className="break-body">
      <Howto>{howto}</Howto>
      <Dial<string>
        stops={options.map((x) => x.id)}
        value={o.id}
        onChange={(v) => {
          setId(v)
          if (v !== options[0].id) setTried(true)
        }}
        label="Try"
        format={(v) => options.find((x) => x.id === v)?.label ?? v}
      />
      <div className={`sabotage-what${first ? '' : ' on'}`}>
        <p className="kicker">What we changed</p>
        <div>{o.explain}</div>
      </div>
      <div className={`break-result${first ? '' : ' broken'}`}>
        <div className="said">
          <p className="kicker">What it wrote</p>
          <blockquote>{o.text.trim() ? <>{o.text.trim()}{o.stoppedNaturally === false ? ' …' : ''}</> : '(nothing readable)'}</blockquote>
          {o.verdict && <p className="break-stat">{o.verdict}</p>}
        </div>
        {o.tiles && o.tiles.length > 0 && (
          <div className="break-tiles">
            {o.tiles.map((t) => (
              <div key={t.label} className="break-tile">
                <span className="kicker">{t.label}</span>
                <b>{t.value}</b>
                {t.note && <small>{t.note}</small>}
              </div>
            ))}
          </div>
        )}
        {o.extra}
        <p className="muted small">Real runs of <Term id="recorded-model">this model</Term>, always taking its likeliest token.</p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}
