import { useEffect, useMemo, useRef, useState } from 'react'
import { GLOSSARY, type GlossaryEntry } from '../data/glossary'
import { LINES, STATIONS, stationByCode, type LineId } from '../data/network'
import { glossaryHref, matches } from '../lib/glossaryLink'
import { hrefFor } from '../lib/router'
import { tick } from '../lib/sound'
import { Roundel } from '../ui/Roundel'

/** Groups in journey order: the eight stations, then the side lines. */
const GROUPS: { key: string; title: string; blurb: string; station?: string }[] = [
  ...STATIONS.map((s) => ({ key: s.code, title: s.name, blurb: s.oneLiner, station: s.code })),
  ...(['L', 'W', 'G', 'A', 'S', 'D', 'R'] as LineId[]).map((id) => ({ key: id, title: LINES[id].name, blurb: LINES[id].blurb }))
]
const BY_ID = new Map(GLOSSARY.map((e) => [e.id, e]))

/**
 * The glossary: every term from the ride in the order you meet it. Each entry gives the one-line
 * answer up front; opening it goes into the depth the stations skip.
 */
export function GlossaryPage({ term }: { term?: string }) {
  const [query, setQuery] = useState('')
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(term ? [term] : []))
  const inputRef = useRef<HTMLInputElement>(null)

  // A link to one term opens it and brings it into view.
  useEffect(() => {
    if (!term || !BY_ID.has(term)) return
    setQuery('')
    setOpenIds((s) => new Set(s).add(term))
    const t = window.setTimeout(() => document.getElementById(`g-${term}`)?.scrollIntoView({ block: 'start' }), 60)
    return () => window.clearTimeout(t)
  }, [term])

  const groups = useMemo(
    () => GROUPS.map((g) => ({ ...g, entries: GLOSSARY.filter((e) => e.station === g.key && matches(e, query)) })).filter((g) => g.entries.length),
    [query]
  )
  const count = groups.reduce((n, g) => n + g.entries.length, 0)

  const toggle = (id: string, isOpen: boolean) =>
    setOpenIds((s) => {
      const next = new Set(s)
      if (isOpen) next.add(id)
      else next.delete(id)
      return next
    })

  return (
    <article className="glossary">
      <header className="glossary-head">
        <h1>Glossary</h1>
        <p className="lede">Every term from the ride, in the order you meet it. Open one to go deeper.</p>
        <div className="g-search">
          <label className="visually-hidden" htmlFor="g-q">Search the glossary</label>
          <input
            id="g-q"
            ref={inputRef}
            type="search"
            placeholder="Search terms"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="g-clear"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
            >
              Clear
            </button>
          )}
        </div>
        {query && <p className="muted small" aria-live="polite">{count === 1 ? '1 term' : `${count} terms`}</p>}
      </header>

      {groups.map((g) => (
        <section key={g.key} className="g-group" aria-labelledby={`gg-${g.key}`}>
          <h2 id={`gg-${g.key}`} className="g-group-head">
            {g.station ? <Roundel code={g.station} small /> : <span className="g-line" style={{ ['--c' as string]: LINES[g.key as LineId].color }} aria-hidden="true" />}
            <span>
              {g.station ? <a href={hrefFor(g.station)}>{g.title}</a> : g.title}
              <small>{g.blurb}</small>
            </span>
          </h2>
          {g.entries.map((e) => (
            <Entry key={e.id} e={e} open={openIds.has(e.id)} onToggle={(o) => toggle(e.id, o)} />
          ))}
        </section>
      ))}
      {count === 0 && <p className="muted">No term matches “{query}”.</p>}
    </article>
  )
}

function Entry({ e, open, onToggle }: { e: GlossaryEntry; open: boolean; onToggle: (open: boolean) => void }) {
  const meet = stationByCode(e.station)
  return (
    <details
      id={`g-${e.id}`}
      className="g-entry"
      open={open}
      onToggle={(ev) => {
        const isOpen = (ev.currentTarget as HTMLDetailsElement).open
        if (isOpen !== open) {
          tick()
          onToggle(isOpen)
        }
      }}
    >
      <summary>
        <span className="g-term">{e.term}</span>
        <span className="g-short">{e.short}</span>
      </summary>
      <div className="g-body">
        {e.aka?.length ? <p className="g-aka">Also called {e.aka.map((a, i) => <span key={a}>{i ? ', ' : ''}<b>{a}</b></span>)}</p> : null}
        <p className="kicker">Go deeper</p>
        {e.deeper.map((para, i) => <p key={i}>{para}</p>)}
        {e.example && (
          <div className="g-example">
            <p className="kicker">On our ride</p>
            <p>{e.example}</p>
          </div>
        )}
        <div className="g-links">
          {e.related?.length ? (
            <span className="g-related">
              Related:{' '}
              {e.related.map((id) => {
                const r = BY_ID.get(id)
                return r ? <a key={id} href={glossaryHref(id)} className="g-chip">{r.term}</a> : null
              })}
            </span>
          ) : null}
          {meet && <a className="g-meet" href={hrefFor(meet.code)}>Meet it at {meet.name} →</a>}
        </div>
      </div>
    </details>
  )
}
