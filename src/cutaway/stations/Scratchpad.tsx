import { useState } from 'react'
import { scratchModel, thinkRuns, thinkStats } from '../../data/scratchpad'
import { tick } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Term } from '../../ui/Term'

const fmt = (n: number) => n.toLocaleString('en-US')
const modelName = scratchModel.split('/').pop()

/** Average tokens written, thinking off and on, as two bars with the thinking shown in gray. */
export function TokenBars() {
  const off = thinkStats('off')
  const on = thinkStats('on')
  const max = Math.max(on.meanTokens, 1)
  const rows = [
    { label: 'Thinking off', think: 0, answer: off.meanAnswer, right: off.correct, n: off.runs },
    { label: 'Thinking on', think: on.meanThinking, answer: on.meanAnswer, right: on.correct, n: on.runs }
  ]
  return (
    <figure className="token-bars">
      {rows.map((r) => (
        <div key={r.label} className="tb-row">
          <span className="tb-label">{r.label}</span>
          <span className="tb-track">
            {r.think > 0 && <span className="tb-think" style={{ width: `${(r.think / max) * 100}%` }} />}
            <span className="tb-answer" style={{ width: `${Math.max(1.5, (r.answer / max) * 100)}%` }} />
          </span>
          <span className="tb-n">{fmt(r.think + r.answer)} tokens · {r.right} of {r.n} right</span>
        </div>
      ))}
      <figcaption className="muted small">
        Average per answer, {modelName} on our question, 10 runs each. <span className="tb-key tb-think" aria-hidden="true" /> thinking <span className="tb-key tb-answer" aria-hidden="true" /> answer
      </figcaption>
    </figure>
  )
}

/** Try it: switch thinking off and on, then read any of the ten real runs, working and all. */
export function ThinkView() {
  const [cond, setCond] = useState<'off' | 'on'>('off')
  const [seed, setSeed] = useState(0)
  const runs = thinkRuns(cond)
  const stats = thinkStats(cond)
  const r = runs.find((x) => x.seed === seed) ?? runs[0]
  if (!r) return <p className="muted">The thinking runs arrive with the next trace run.</p>
  return (
    <div className="think-view">
      <Howto>Switch thinking off and on, then tap a run to read it. ✓ marks the right answers.</Howto>
      <div className="size-switch" role="group" aria-label="Thinking">
        {(['off', 'on'] as const).map((c) => (
          <button key={c} type="button" aria-pressed={cond === c} onClick={() => { setCond(c); tick() }}>
            Thinking {c}
          </button>
        ))}
      </div>
      <div className="break-tiles">
        <div className="break-tile">
          <span className="kicker">Right answers</span>
          <b>{stats.correct} of {stats.runs}</b>
          <small>the right answer is 8.4375 cups</small>
        </div>
        <div className="break-tile">
          <span className="kicker">Tokens per answer</span>
          <b>{fmt(stats.meanTokens)}</b>
          <small>on average: one trip each</small>
        </div>
      </div>
      <div className="run-chips" role="group" aria-label="Runs">
        {runs.map((x) => (
          <button key={x.seed} type="button" className={`run-chip${x.correct ? ' right' : ''}`} aria-pressed={x.seed === r.seed} onClick={() => { setSeed(x.seed); tick() }}>
            {runs.indexOf(x) + 1}{x.correct ? ' ✓' : ''}
          </button>
        ))}
      </div>
      {r.thinking && (
        <div className="think-box">
          <p className="kicker">Its working: {fmt(r.thinkingTokens)} thinking tokens</p>
          <div className="think-text">{r.thinking}</div>
        </div>
      )}
      <div className="said">
        <p className="kicker">Its answer: {fmt(r.answerTokens)} tokens</p>
        <blockquote>{r.answer}{r.stoppedNaturally ? '' : ' …'}</blockquote>
        <p className="break-stat">{r.correct ? '✓ Right.' : `✗ Not quite: it ended at ${r.finalNumber ?? 'no number'}.`}</p>
      </div>
      <p className="muted small">
        Real runs of {modelName}, a newer small model with a thinking switch; the model on our ride doesn’t have one. Same page as our ride, no calculator, so it does the math itself. Thinking runs like this one are a <Term id="reasoning-model">reasoning model</Term> at work.
      </p>
    </div>
  )
}
