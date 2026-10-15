import { useEffect, useRef, useState, type ReactNode } from 'react'
import { stationByCode, STATIONS } from '../data/network'
import { glossaryHref, glossaryIdFor } from '../lib/glossaryLink'
import { readStation, saveStation } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { chime, stampSound, tick } from '../lib/sound'
import { GuessCard, QuizCard } from './Choices'
import { StampArt } from './StampArt'
import { BEAT_LABELS, beatsFor, type BeatId, type LoopSpec } from './types'

const today = () => new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

/**
 * One station's five-minute loop, one beat per screen: Arrive, Try it, Learn it, Break it, Stamp.
 * Next always sits in the same place. Every step is reachable from the rail, so a stamped
 * station works as a refresher: it reopens at Arrive with everything open.
 */
export function StationLoop({ spec, onRideOn, onBeatChange }: { spec: LoopSpec; onRideOn?: (code: string) => void; onBeatChange?: (beat: BeatId) => void }) {
  const beats = beatsFor(spec)
  const saved = useRef(readStation(spec.code))
  const [at, setAt] = useState(() => (saved.current.stampedAt ? 0 : Math.min(saved.current.at ?? saved.current.beat ?? 0, beats.length - 1)))
  const [reached, setReached] = useState(() => (saved.current.stampedAt ? beats.length - 1 : Math.max(saved.current.beat ?? 0, 0)))
  const [answered, setAnswered] = useState<boolean[]>(() => spec.stamp.questions.map(() => false))
  const [stampedAt, setStampedAt] = useState<string | undefined>(saved.current.stampedAt)
  const topRef = useRef<HTMLDivElement>(null)
  const beat = beats[at]
  const station = stationByCode(spec.code)
  const next = STATIONS[STATIONS.findIndex((s) => s.code === spec.code) + 1]

  useEffect(() => {
    saveStation(spec.code, { beat: Math.max(at, reached), at })
    if (beat === 'arrive') chime(spec.code)
    onBeatChange?.(beat)
  }, [at, reached, beat, spec.code])

  const go = (i: number) => {
    tick()
    setAt(i)
    setReached((r) => Math.max(r, i))
    topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }


  const onAnswer = (k: number) => {
    const done = answered.map((v, i) => (i === k ? true : v))
    setAnswered(done)
    if (done.every(Boolean) && !stampedAt) {
      const d = today()
      setStampedAt(d)
      saveStation(spec.code, { beat: beats.length - 1, stampedAt: d })
      window.setTimeout(stampSound, 350)
    }
  }

  return (
    <div className="loop" ref={topRef}>
      <ol className="beat-rail" aria-label="This station's loop">
        {beats.map((b, i) => (
          <li key={b} className={`${i === at ? 'now' : ''}${i < at || (i <= reached && i !== at) ? ' passed' : ''}`}>
            <button type="button" onClick={() => go(i)} aria-current={i === at ? 'step' : undefined}>
              <span className="dot" aria-hidden="true" />
              <span className="lbl">{BEAT_LABELS[b]}</span>
            </button>
          </li>
        ))}
      </ol>

      <section className={`beat beat-${beat}`} aria-live="polite">
        {beat === 'arrive' && (
          <div className="arrive">
            <div className="arrive-panel">{spec.arrive.panel}</div>
            <div className="arrive-text">
              <p className="kicker">Arrive · {spec.code}</p>
              <p className="arrive-caption">{spec.arrive.caption}</p>
              {spec.arrive.guess && <GuessCard {...spec.arrive.guess} />}
              {spec.arrive.flashback && !spec.arrive.guess && <Flashback {...spec.arrive.flashback} />}
            </div>
          </div>
        )}

        {beat === 'poke' && (
          <>
            <div className="beat-head">
              <p className="kicker">Try it</p>
              <h2>{spec.poke.title}</h2>
              <p>{spec.poke.intro}</p>
            </div>
            {spec.poke.body}
          </>
        )}

        {beat === 'name' && (
          <div className="name-it">
            <div className="name-text">
              <p className="kicker">Learn it</p>
              <p className="definition">{spec.name.definition}</p>
              <ul className="terms" aria-label="New terms">
                {spec.name.terms.map((t) => {
                  const id = glossaryIdFor(t)
                  return <li key={t}>{id ? <a href={glossaryHref(id)}>{t}</a> : t}</li>
                })}
              </ul>
              <div className="metaphor">
                <p><b>Picture it:</b> {spec.name.metaphor}</p>
                <p className="breaks"><b>Where that breaks:</b> {spec.name.breaks}</p>
              </div>
              {spec.name.note && <p className="muted small">{spec.name.note}</p>}
            </div>
            <div className="name-picture">{spec.name.picture}</div>
          </div>
        )}

        {beat === 'break' && spec.break && (
          <>
            <div className="beat-head">
              <p className="kicker sabotage">Break it · sabotage</p>
              <h2>{spec.break.title}</h2>
              <p>{spec.break.intro}</p>
            </div>
            {spec.break.body}
          </>
        )}

        {beat === 'stamp' && (
          <div className="stamp-beat">
            <div className="stamp-questions">
              <p className="kicker">Stamp · two questions</p>
              {spec.stamp.questions.map((q, k) => (
                <QuizCard key={q.q} q={q.q} options={q.options} onCorrect={() => onAnswer(k)} />
              ))}
            </div>
            <div className={`stamp-pad${stampedAt ? ' landed' : ''}`}>
              <StampArt code={spec.code} date={stampedAt} faded={!stampedAt} />
              {stampedAt ? (
                <>
                  <p className="stamp-msg">Stamped. {station?.name} is in your pass.</p>
                  {spec.bonus && <Bonus {...spec.bonus} />}
                  <div className="receipt">
                    <p className="kicker">Receipt</p>
                    <p>{spec.stamp.receipt.text}</p>
                    {spec.stamp.receipt.source && (
                      <p className="receipt-src">
                        Source: <a href={spec.stamp.receipt.source.href} target="_blank" rel="noreferrer">{spec.stamp.receipt.source.label}</a>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="stamp-msg muted">Answer both to earn the stamp.</p>
              )}
            </div>
          </div>
        )}
      </section>

      <nav className="beat-nav" aria-label="Loop navigation">
        <button type="button" className="btn" disabled={at === 0} onClick={() => go(at - 1)}>← Back</button>
        {beat === 'stamp' ? (
          stampedAt && next ? (
            onRideOn ? (
              <button type="button" className="btn primary" onClick={() => onRideOn(next.code)}>Ride on to {next.name} →</button>
            ) : (
              <a className="btn primary" href={hrefFor(next.code)}>Ride on to {next.name} →</a>
            )
          ) : stampedAt ? (
            <a className="btn primary" href="#/">Back to the map →</a>
          ) : (
            <span className="hint">Answer both questions</span>
          )
        ) : (
          <button type="button" className="btn primary" onClick={() => go(at + 1)}>
            Next: {BEAT_LABELS[beats[at + 1]]} →
          </button>
        )}
      </nav>
    </div>
  )
}

function Bonus({ label, body }: { label: string; body: ReactNode }) {
  const [open, setOpen] = useState(false)
  return open ? <div className="bonus-body">{body}</div> : <button type="button" className="btn" onClick={() => setOpen(true)}>{label}</button>
}

function Flashback({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flashback">
      <p className="kicker">Flashback</p>
      <p>{q}</p>
      {open ? <p className="flash-a">{a}</p> : <button type="button" className="btn small" onClick={() => setOpen(true)}>Show answer</button>}
    </div>
  )
}
