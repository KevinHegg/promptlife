import { useState } from 'react'
import type { Station } from '../../data/network'
import { trace } from '../../data/trace'
import { isClean } from '../../lib/safeText'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

/** The recorded model's context window (from its published settings). */
export const WINDOW = 32768

type Step = NonNullable<typeof trace>['steps'][number]

/** The reply's trips, in order: every recorded step from the reply's first token through the stop marker. */
export function replySteps(): Step[] {
  if (!trace) return []
  const first = trace.tokens.find((t) => t.src === 'rep')?.i ?? Infinity
  return trace.steps.filter((s) => s.pos >= first)
}

const pctOf = (p: number) => (p >= 0.995 ? `${(p * 100).toFixed(1)}%` : p < 0.01 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)
const isStop = (t: string) => /<\|im_end\|>|<\|endoftext\|>/.test(t)
const show = (t: string) => (isStop(t) ? 'stop token' : t)

/**
 * Step the reply: one trip per tap. Each trip shows the token it drew, the odds, the runners-up, and
 * an honest note when the recording steered the pick. The context gauge climbs, and the last trip
 * draws the stop marker.
 */
export function LoopStepper() {
  const steps = replySteps()
  const [k, setK] = useState(0) // trips taken so far (0 = none)
  const [done, setDone] = useState(false)
  if (!trace || !steps.length) return <p className="v-cap">The recorded trips arrive with the next trace run.</p>
  const tripsBefore = trace.steps.length - steps.length // the calculator request's trips
  const step = k > 0 ? steps[k - 1] : null
  const written = steps.slice(0, k).filter((s) => !isStop(s.chosen.text))
  const reading = step ? step.pos : steps[0].pos // tokens the model reads on this trip
  const steered = step && step.chosen.rank > 1 ? step.top[0] : null
  const go = (n: number) => {
    const next = Math.max(0, Math.min(steps.length, n))
    setK(next)
    tick()
    if (next === steps.length && !done) {
      setDone(true)
      yes()
    }
  }
  return (
    <div className="v-col stepper">
      <Howto>Tap Next token to run one trip.</Howto>
      <div className="st-reply" aria-live="polite">
        {written.length ? (
          written.map((s, i) => (
            <span key={s.pos} className={`st-tok${i === written.length - 1 && step && !isStop(step.chosen.text) ? ' new' : ''}`}>
              <TokenText text={s.chosen.text} />
            </span>
          ))
        ) : (
          <span className="v-cap">The reply hasn’t started.</span>
        )}
        {step && isStop(step.chosen.text) && <span className="st-stop">■ stop</span>}
      </div>
      <div className="st-buttons">
        <button type="button" className="btn small" onClick={() => go(k - 1)} disabled={k === 0}>← Back</button>
        <span className="st-trip">Trip {tripsBefore + Math.max(k, 1)}<small> of {trace.steps.length}</small></span>
        <button type="button" className="btn small primary" onClick={() => go(k + 1)} disabled={k === steps.length}>Next token →</button>
      </div>
      {step ? (
        <div className="st-trip-card">
          <p className="st-drawn">
            {isStop(step.chosen.text) ? 'Drew the stop token' : <>Drew <b><TokenText text={step.chosen.text} /></b></>} at {pctOf(step.chosen.prob)}
          </p>
          <ol className="lift-guesses">
            {step.top.slice(0, 3).map((g, i) => (
              <li key={i} className={g.text === step.chosen.text ? 'is-final' : ''}>
                <span className="lg-tok">{isClean(g.text) ? <TokenText text={show(g.text)} /> : '…'}</span>
                <span className="lg-bar"><span style={{ width: `${Math.max(2, g.prob * 100)}%` }} /></span>
                <span className="lg-p">{pctOf(g.prob)}</span>
              </li>
            ))}
          </ol>
          {steered && (
            <p className="st-steered">Not its first choice: it liked <b><TokenText text={show(steered.text)} /></b> more ({pctOf(steered.prob)}). This replay keeps one fixed answer.</p>
          )}
          {isStop(step.chosen.text) && <p className="st-end">The stop token won, so the loop ends and the app shows the reply.</p>}
        </div>
      ) : (
        <p className="v-cap">
          Before the reply, {tripsBefore} trips wrote the calculator request. This replays one fixed answer; where a token wasn’t the model’s own first choice, a red line says so.
        </p>
      )}
      <div className="st-gauge">
        <p>Reading <b>{reading.toLocaleString()}</b> tokens, of the {WINDOW.toLocaleString()} it can hold.</p>
        <span className="sg-track"><span style={{ width: `${Math.max(0.6, (reading / WINDOW) * 100)}%` }} /></span>
        <p className="v-cap">Each trip handles 1 new token and reuses saved work for the {(reading - 1).toLocaleString()} before it.</p>
      </div>
    </div>
  )
}

export function LoopLevels({ station }: { station: Station }) {
  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText level={2} title="Step the reply">
            <p>One trip writes one token. Then the new token joins the context and the trip runs again.</p>
          </LevelText>
          <Vis>
            <LoopStepper />
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="One token at a time">
            <p>The reply’s odds are a chain: each token’s odds depend on everything before it, including the tokens the model just wrote.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">p(reply) = p(t<sub>1</sub>) · p(t<sub>2</sub> | t<sub>1</sub>) · p(t<sub>3</sub> | t<sub>1</sub>, t<sub>2</sub>) · …</div>
              <div className="worked">
                p(a | b) means the chance of a, given b; t<sub>1</sub>, t<sub>2</sub> are the reply’s tokens
                <br />
                the first trip, <b>prefill</b>, reads every token in the context at once
                <br />each later trip, <b>decode</b>, adds one token and reuses saved keys and values
                <br />that saved work is the <b>KV cache</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
