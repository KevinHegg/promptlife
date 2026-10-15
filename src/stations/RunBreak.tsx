import { useState, type ReactNode } from 'react'
import { breaksFor, pct, type BreakRun } from '../data/phase2'
import { modelName, trace } from '../data/trace'
import { TokenText } from '../ui/TokenText'
import { Dial } from './parts'

type Props = {
  station: string
  /** Which recorded runs to offer, in dial order. "normal" is always first. */
  ids: string[]
  /** One plain line per run saying what went wrong (or didn't). */
  verdicts: Record<string, string>
  /** Shown once a sabotage has been tried: the answer to the step's "why" question. */
  takeaway: ReactNode
  /** For runs measured on a word instead of the digit (e.g. “flour”): its name and normal odds. */
  word?: { label: string; normal: number }
  /** Shorter dial labels than the recorded ones, by run id. */
  labels?: Record<string, string>
}

/**
 * Break it, from recorded runs: a dial of sabotages, two numbers that change with it (the odds of
 * the right digit and the model's top pick there), what the model actually wrote, then the takeaway.
 */
export function RunBreak({ station, ids, verdicts, takeaway, word, labels = {} }: Props) {
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
  return (
    <div className="break-body">
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
      <div className={`break-result${broken ? ' broken' : ''}`}>
        <div className="break-tiles">
          <div className="break-tile">
            <span className="kicker">{onWord && word ? `Odds of “${word.label}”` : 'Odds of the right “8”'}</span>
            <b>{pct(measure.prob)}</b>
            <small>{onWord && word ? `normally ${pct(word.normal)}` : broken ? `normally ${pct(normal.rightDigit.prob)}` : 'the first digit of 8.4'}</small>
          </div>
          {top && (
            <div className="break-tile">
              <span className="kicker">Its top pick there</span>
              <b className="tile-token"><TokenText text={top.text} /></b>
              <small>{pct(top.prob)}</small>
            </div>
          )}
        </div>
        <div className="said">
          <p className="kicker">What it wrote</p>
          <blockquote>{run.text.trim() ? <>{run.text.trim()}{run.stoppedNaturally ? '' : ' …'}</> : '(nothing readable)'}</blockquote>
          {verdicts[run.id] && <p className="break-stat">{verdicts[run.id]}</p>}
        </div>
        <p className="muted small">Real runs of {trace ? modelName(trace) : 'the recorded model'}, always picking its top token, from the moment the reply begins.</p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}
