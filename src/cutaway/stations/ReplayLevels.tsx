import { useMemo, useState } from 'react'
import type { Station } from '../../data/network'
import { SCENARIO } from '../../data/heroRun'
import { trace } from '../../data/trace'
import { isClean } from '../../lib/safeText'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

const pctOf = (p: number) => (p >= 0.995 ? `${(p * 100).toFixed(1)}%` : p < 0.01 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)
const isStop = (t: string) => /<\|im_end\|>|<\|endoftext\|>/.test(t)
const show = (t: string) => (isStop(t) ? 'stop token' : t)

/**
 * Replay the whole run, trip by trip. A strip shows every trip as a bar as tall as the model's
 * odds for the token it drew (steered trips outlined in red). Three things to find: where the
 * recording overrode the model's math, where the reply copies the 8, and the trip the model was
 * least sure of among its own picks.
 */
export function Replay() {
  const steps = trace?.steps ?? []
  const [k, setK] = useState(0)
  const [found, setFound] = useState<Set<string>>(() => new Set())
  const firstReply = trace?.tokens.find((t) => t.src === 'rep')?.i ?? Infinity
  const targets = useMemo(() => {
    const own = steps.filter((s) => s.chosen.rank === 1)
    const leastSure = own.reduce((m, s) => (s.chosen.prob < m.chosen.prob ? s : m), own[0])
    const eight = steps.find((s) => s.pos >= firstReply && s.chosen.text === '8')
    const overrode = steps.find((s) => s.pos < firstReply && s.chosen.rank > 1)
    return [
      { id: 'overrode', label: 'Where we swapped in the right sum', at: overrode ? steps.indexOf(overrode) : -1 },
      { id: 'eight', label: 'Where the reply copies the 8', at: eight ? steps.indexOf(eight) : -1 },
      { id: 'unsure', label: 'Where it was least sure of its own choice', at: leastSure ? steps.indexOf(leastSure) : -1 }
    ].filter((t) => t.at >= 0)
  }, [steps, firstReply])
  if (!trace || !steps.length) return <p className="v-cap">The recorded run arrives with the next trace run.</p>
  const step = steps[k]
  const inReply = step.pos >= firstReply
  const steered = step.chosen.rank > 1 ? step.top[0] : null
  const go = (n: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, n))
    setK(next)
    tick()
    const hit = targets.find((t) => t.at === next && !found.has(t.id))
    if (hit) {
      setFound((f) => new Set(f).add(hit.id))
      yes()
    }
  }
  // The text so far: the request, the calculator's answer once the request is done, then the reply.
  const request = steps.filter((s, i) => i <= k && s.pos < firstReply && !isStop(s.chosen.text)).map((s) => s.chosen.text).join('')
  const reply = steps.filter((s, i) => i <= k && s.pos >= firstReply && !isStop(s.chosen.text)).map((s) => s.chosen.text).join('')
  const W = steps.length * 7
  return (
    <div className="v-col replay">
      <Howto>Drag along the strip, or use ◀ ▶, to replay one trip at a time.</Howto>
      <ul className="rp-targets">
        {targets.map((t) => (
          <li key={t.id} className={found.has(t.id) ? 'done' : ''}>{found.has(t.id) ? '✓ ' : ''}{t.label}</li>
        ))}
      </ul>
      <svg
        className="rp-strip"
        viewBox={`0 0 ${W} 60`}
        role="slider"
        tabIndex={0}
        aria-label="Trips"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={k + 1}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(k + 1)
          if (e.key === 'ArrowLeft') go(k - 1)
        }}
        onPointerDown={(e) => {
          const pick = (x: number) => {
            const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
            go(Math.floor(((x - r.left) / r.width) * steps.length))
          }
          pick(e.clientX)
          const el = e.currentTarget
          el.setPointerCapture(e.pointerId)
          const move = (ev: PointerEvent) => pick(ev.clientX)
          const up = () => {
            el.removeEventListener('pointermove', move)
            el.removeEventListener('pointerup', up)
          }
          el.addEventListener('pointermove', move)
          el.addEventListener('pointerup', up)
        }}
      >
        {steps.map((s, i) => {
          const h = Math.max(2, s.chosen.prob * 44)
          return (
            <rect
              key={s.pos}
              x={i * 7 + 1}
              y={48 - h}
              width="5"
              height={h}
              rx="1"
              className={`rp-bar${s.pos >= firstReply ? ' reply' : ''}${s.chosen.rank > 1 ? ' steered' : ''}${i === k ? ' on' : ''}`}
            />
          )
        })}
        <rect x={k * 7} y="50" width="7" height="4" className="rp-cursor" />
      </svg>
      <div className="rp-legend"><span>calculator request</span><span>reply</span></div>
      <div className="st-buttons">
        <button type="button" className="btn small" onClick={() => go(k - 1)} disabled={k === 0} aria-label="Previous trip">◀</button>
        <span className="st-trip">Trip {k + 1}<small> of {steps.length}</small></span>
        <button type="button" className="btn small" onClick={() => go(k + 1)} disabled={k === steps.length - 1} aria-label="Next trip">▶</button>
      </div>
      <div className="st-trip-card">
        <p className="st-drawn">
          {inReply ? 'Writing the reply. ' : 'Writing the calculator request. '}
          {isStop(step.chosen.text) ? 'Drew the stop token' : <>Drew <b>{isClean(step.chosen.text) ? <TokenText text={step.chosen.text} /> : '…'}</b></>} at {pctOf(step.chosen.prob)}.
        </p>
        {steered && (
          <p className="st-steered">Not its first choice: it liked <b><TokenText text={show(steered.text)} /></b> more ({pctOf(steered.prob)}). This replay keeps one fixed answer.</p>
        )}
      </div>
      <div className="rp-text">
        <p><span className="kicker">Request</span> <code>{request || '…'}</code></p>
        {k >= steps.findIndex((s) => s.pos >= firstReply) && steps.some((s) => s.pos >= firstReply) && (
          <p><span className="kicker">Calculator</span> <code>{SCENARIO.toolResult}</code></p>
        )}
        {reply && <p><span className="kicker">Reply</span> {reply}</p>}
      </div>
    </div>
  )
}

export function ReplayLevels({ station }: { station: Station }) {
  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText level={2} title="Replay the run">
            <p>Every trip, start to finish. Taller bars mean the model was surer of the token it drew.</p>
          </LevelText>
          <Vis>
            <Replay />
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="The run’s odds, added up">
            <p>Multiply the odds of every token drawn and you get the odds of the whole run. A logarithm turns multiplying into adding, so the tiny numbers stay readable.</p>
          </LevelText>
          <Vis>
            <RunOdds />
          </Vis>
        </Level>
      }
    />
  )
}

/** The whole run's log-probability, summed live from the recorded trips. */
function RunOdds() {
  const steps = trace?.steps ?? []
  if (!steps.length) return null
  const logp = steps.reduce((a, s) => a + Math.log(Math.max(s.chosen.prob, 1e-12)), 0)
  const own = steps.filter((s) => s.chosen.rank === 1).length
  return (
    <div className="v-col">
      <div className="formula">log p(run) = Σ<sub>t</sub> log p(token<sub>t</sub>)</div>
      <div className="worked">
        {steps.length} trips: <b>{logp.toFixed(1)}</b> (natural log)
        <br />{own} of {steps.length} tokens were the model’s own first choice
        <br />weights changed by this run: <b>0</b>
      </div>
    </div>
  )
}
