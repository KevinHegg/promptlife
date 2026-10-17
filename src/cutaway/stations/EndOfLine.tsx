import { useState, type ReactNode } from 'react'
import { AGENT_PACE, CASES, ENERGY, ENERGY_SOURCE, HORIZON, MEASURED, QUESTIONS, SCALE, WORTH_IT, type Fact, type Source } from '../../data/endOfLine'
import { readStations } from '../../lib/progress'
import { tick } from '../../lib/sound'
import type { Receipt } from '../../loop/types'
import { allLineLoops, allLoops } from '../../stations/registry'
import { placeName } from '../../data/network'
import { Howto } from '../../ui/Howto'
import { Dial } from '../../stations/parts'

const Src = ({ s, self }: { s: Source; self?: boolean }) => (
  <a className="src-link" href={s.href} target="_blank" rel="noreferrer">{s.label}{self ? ', self-reported' : ''}</a>
)

const FactLine = ({ f, bare = false }: { f: Fact; bare?: boolean }) => (
  <li>
    {f.text}
    {!bare && <> <Src s={f.source} self={f.self} /></>}
  </li>
)

/** Arrive: a balance, what you got against what it cost. */
export function BalancePanel() {
  return (
    <svg className="arrive-art" viewBox="0 0 320 190" role="img" aria-label="A balance: on one side, what you got; on the other, what it cost.">
      <path d="M160,30 V160 M120,170 H200" className="art-line" fill="none" />
      <path d="M60,55 L260,55" className="art-line" fill="none" />
      <circle cx="160" cy="55" r="6" className="art-accent" />
      <path d="M60,55 L35,105 H85 Z M260,55 L235,105 H285 Z" className="art-line dim" fill="none" />
      <path d="M30,105 Q60,125 90,105 Z" className="art-fill-soft" stroke="var(--ink)" strokeWidth="2" />
      <path d="M230,105 Q260,125 290,105 Z" className="art-fill-soft" stroke="var(--ink)" strokeWidth="2" />
      <text x="60" y="142" textAnchor="middle" className="art-text sm">what you got</text>
      <text x="260" y="142" textAnchor="middle" className="art-text sm">what it cost</text>
    </svg>
  )
}

/** Try it, part one: electricity per request, on a log scale, then the receipts from every stop. */
export function CostView() {
  const [pick, setPick] = useState(ENERGY[1].id)
  const e = ENERGY.find((x) => x.id === pick) ?? ENERGY[1]
  const lo = Math.log10(0.02)
  const hi = Math.log10(80)
  const width = (wh: number) => `${Math.max(4, ((Math.log10(wh) - lo) / (hi - lo)) * 100)}%`
  return (
    <div className="cost-view">
      <Howto>Tap a kind of request to compare the electricity it takes.</Howto>
      <ul className="energy-bars">
        {ENERGY.map((x) => (
          <li key={x.id}>
            <button type="button" className={`eb${x.id === pick ? ' on' : ''}`} aria-pressed={x.id === pick} onClick={() => { setPick(x.id); tick() }}>
              <span className="eb-label">{x.label}</span>
              <span className="eb-track"><span style={{ width: width(x.wh) }} /></span>
              <span className="eb-wh">{x.wh < 1 ? x.wh : x.wh.toLocaleString('en-US')} Wh</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="reveal"><b>{e.label}: about {e.wh} Wh.</b> {e.note} {e.wh / ENERGY[0].wh >= 2 ? `That’s about ${Math.round(e.wh / ENERGY[0].wh).toLocaleString('en-US')} times the first bar.` : ''}</p>
      <p className="muted small">Each step on this scale is ten times the last. Electricity for the AI chips only, as estimated by <Src s={ENERGY_SOURCE} />.</p>
      <ul className="fact-list">
        {[MEASURED[0], SCALE[0]].map((f) => <FactLine key={f.text} f={f} />)}
      </ul>
    </div>
  )
}

const COLUMNS: { id: Receipt['column']; label: string }[] = [
  { id: 'compute', label: 'Compute' },
  { id: 'energy', label: 'Energy' },
  { id: 'data', label: 'Data' },
  { id: 'labor', label: 'Labor' },
  { id: 'accountability', label: 'Accountability' }
]

/** Every stop's receipt line, sorted into the five columns, with the stops you stamped marked. */
export function Ledger() {
  const loops = { ...allLoops(), ...allLineLoops() }
  const stamped = readStations()
  return (
    <div className="ledger">
      {COLUMNS.map((c) => {
        const lines = Object.values(loops).filter((l) => l.stamp.receipt.column === c.id && l.code !== 'R')
        if (!lines.length) return null
        return (
          <section key={c.id} className="ledger-col">
            <h4>{c.label}</h4>
            <ul>
              {lines.map((l) => (
                <li key={l.code} className={stamped[l.code]?.stampedAt ? 'stamped' : ''}>
                  <b>{placeName(l.code)}.</b> {l.stamp.receipt.text}
                  {l.stamp.receipt.source && <> <Src s={l.stamp.receipt.source} /></>}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

type Weigh = 'yes' | 'depends' | 'no'
const WEIGH_LABEL: Record<Weigh, string> = { yes: 'Worth it', depends: 'It depends', no: 'Not worth it' }

/** Try it, part two: four uses of AI. Weigh each one; there’s no answer key, only what to weigh. */
export function WorthIt() {
  const [picks, setPicks] = useState<Record<string, Weigh>>({})
  const done = WORTH_IT.every((w) => picks[w.id])
  return (
    <div className="worth-it">
      <Howto>For each one, pick how you’d weigh it. Then see what goes on each side.</Howto>
      {WORTH_IT.map((w) => (
        <div key={w.id} className="worth-card">
          <p className="worth-ask">{w.ask}</p>
          <div className="worth-options" role="group" aria-label="Your call">
            {(Object.keys(WEIGH_LABEL) as Weigh[]).map((k) => (
              <button key={k} type="button" className="chip-btn" aria-pressed={picks[w.id] === k} onClick={() => { setPicks((p) => ({ ...p, [w.id]: k })); tick() }}>
                {WEIGH_LABEL[k]}
              </button>
            ))}
          </div>
          {picks[w.id] && (
            <div className="worth-sides">
              <div><p className="kicker">You get</p><ul>{w.plus.map((t) => <li key={t}>{t}</li>)}</ul></div>
              <div><p className="kicker">It costs</p><ul>{w.minus.map((t) => <li key={t}>{t}</li>)}</ul></div>
            </div>
          )}
        </div>
      ))}
      {done && (
        <p className="reveal">
          <b>There’s no answer key here.</b> A cost-benefit analysis is a habit: name what you get, name what it costs, and ask who pays. The same tool can be worth it for one job and not for another.
        </p>
      )}
    </div>
  )
}

/** Learn it: the big questions, one open at a time. */
export function BigQuestions() {
  const [open, setOpen] = useState<string | null>(QUESTIONS[0].id)
  return (
    <div className="big-questions">
      {QUESTIONS.map((q) => (
        <section key={q.id} className={`bq${open === q.id ? ' open' : ''}`}>
          <button type="button" className="bq-head" aria-expanded={open === q.id} onClick={() => { setOpen(open === q.id ? null : q.id); tick() }}>
            {q.title}
          </button>
          {open === q.id && (
            <div className="bq-body">
              <p>{q.who}</p>
              {/* One source for the whole card when every fact shares it. */}
              {q.facts.every((f) => f.source.href === q.facts[0].source.href) ? (
                <>
                  <ul className="fact-list">{q.facts.map((f) => <FactLine key={f.text} f={f} bare />)}</ul>
                  <p className="muted small">Source: <Src s={q.facts[0].source} /></p>
                </>
              ) : (
                <ul className="fact-list">{q.facts.map((f) => <FactLine key={f.text} f={f} />)}</ul>
              )}
              <p className="bq-ride"><b>On our ride:</b> {q.ride}</p>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

/** Break it: when agents go wrong. Two tests and one real incident, each with its catch. */
export function AgentCases({ takeaway }: { takeaway: ReactNode }) {
  const [id, setId] = useState(CASES[0].id)
  const [tried, setTried] = useState(false)
  const c = CASES.find((x) => x.id === id) ?? CASES[0]
  return (
    <div className="break-body">
      <Howto>Pick a case. Read what the agents were given, what they did, and the catch.</Howto>
      <Dial<string>
        stops={CASES.map((x) => x.id)}
        value={c.id}
        onChange={(v) => {
          setId(v)
          if (v !== CASES[0].id) setTried(true)
        }}
        label="Case"
        format={(v) => CASES.find((x) => x.id === v)?.label ?? v}
      />
      <div className="sabotage-what on">
        <p className="kicker">The setup</p>
        <p>{c.setup}</p>
      </div>
      <div className="break-result broken">
        <div className="said">
          <p className="kicker">What happened</p>
          <p>{c.happened}</p>
          <p className="kicker">The catch</p>
          <p>{c.caveat}</p>
          {c.changed && (
            <>
              <p className="kicker">What changed</p>
              <p>{c.changed}</p>
            </>
          )}
        </div>
        <p className="muted small">Source: {c.sources.map((s, i) => <span key={s.href}>{i ? '; ' : ''}<Src s={s} /></span>)}</p>
      </div>
      <div className="break-tiles">
        <div className="break-tile">
          <span className="kicker">How fast agents are growing</span>
          <b>×2</b>
          <small>{AGENT_PACE.text} <Src s={AGENT_PACE.source} /></small>
        </div>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}

/** After the last stamp: next stops on the horizon. */
export function Horizon() {
  return (
    <div className="horizon">
      <p className="kicker">Next stops, as of October 2026</p>
      <ul className="fact-list">{HORIZON.map((f) => <FactLine key={f.text} f={f} />)}</ul>
      <p className="reveal">
        <b>You rode the whole line.</b> Every one of these runs on the same loop you followed: tokens in, one guess per trip, an app around it deciding what the model reads and what it may do.
      </p>
    </div>
  )
}
