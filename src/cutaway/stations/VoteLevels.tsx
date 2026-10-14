import { useMemo, useState } from 'react'
import type { Station } from '../../data/network'
import { voteProbs, type VotePosition } from '../../data/phase1'
import { modelName, trace } from '../../data/trace'
import { sample } from '../../lib/softmax'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

const SHOW = 6

const pct = (v: number) => {
  const x = v * 100
  if (x >= 99.95) return '100%'
  if (x > 0 && x < 0.1) return '<0.1%'
  return `${x.toFixed(1)}%`
}
const big = (v: number) => (v >= 1e6 ? v.toExponential(2) : v < 0.01 ? v.toExponential(1) : v.toFixed(1))

export function VoteLevels({ station, positions, exactTail }: { station: Station; positions: VotePosition[]; exactTail: boolean }) {
  const [pick, setPick] = useState(Math.min(2, positions.length - 1))
  const [temp, setTemp] = useState(1)
  const [draws, setDraws] = useState<string[]>([])
  const v = positions[pick]
  const { top, rest } = useMemo(() => voteProbs(v, temp), [v, temp])
  const shown = v.top.slice(0, SHOW)
  const hiddenTop = top.slice(SHOW).reduce((a, b) => a + b, 0)
  const elseShare = rest + hiddenTop

  const draw20 = () => {
    const labels = [...shown.map((c) => c.text), "something else"]
    const probs = [...top.slice(0, SHOW), elseShare]
    setDraws(Array.from({ length: 20 }, () => labels[sample(probs, Math.random())]))
  }
  const tally = draws.reduce<Record<string, number>>((acc, d) => ({ ...acc, [d]: (acc[d] ?? 0) + 1 }), {})

  const z0 = v.top[0].logit
  const scaledTop = temp > 0 ? Math.exp(0) : 1
  const ratio = temp > 0 ? 1 / (top[0] || 1) : 1

  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText
            level={2}
            title="Turn the temperature"
            note={trace ? `Real scores from ${modelName(trace)}.${exactTail ? '' : ' “Everything else” is estimated from the top 10.'}` : 'Placeholder scores; the math is live.'}
          >
            <p>Pick a moment from the recorded run. Low temperature makes the favorite near-certain. High temperature gives long shots a real chance.</p>
            <p className="ctx">After “{v.context}”, the run used <b><TokenText text={v.chosen.text} /></b> (rank {v.chosen.rank}).</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              {positions.length > 1 && (
                <div className="v-examples" role="group" aria-label="Moments in the run">
                  {positions.map((p, i) => (
                    <button key={p.pos} type="button" className="chip-btn" aria-pressed={i === pick} onClick={() => { setPick(i); setDraws([]) }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="v-bars">
                {shown.map((c, i) => (
                  <div className="v-bar" key={`${c.text}-${i}`}>
                    <span className="lab"><TokenText text={c.text} /></span>
                    <span className="track"><span className={`fill${c.text === v.chosen.text ? '' : ' alt'}`} style={{ width: `${(top[i] * 100).toFixed(1)}%` }} /></span>
                    <span className="val">{pct(top[i])}</span>
                  </div>
                ))}
                <div className="v-bar else">
                  <span className="lab">the rest</span>
                  <span className="track"><span className="fill dim" style={{ width: `${(elseShare * 100).toFixed(1)}%` }} /></span>
                  <span className="val">{pct(elseShare)}</span>
                </div>
              </div>
              <label className="v-slider" htmlFor="temp">
                <span>T</span>
                <input id="temp" type="range" min={0} max={2} step={0.1} value={temp} onChange={(e) => { setTemp(parseFloat(e.target.value)); setDraws([]) }} />
                <span>{temp.toFixed(1)}</span>
              </label>
              <div className="v-spin">
                <button type="button" className="btn small" onClick={draw20}>Draw 20</button>
                <span className="v-cap" aria-live="polite">
                  {draws.length
                    ? Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([t, n]) => (
                        <span key={t} className="spin-chip"><TokenText text={t} /> ×{n}</span>
                      ))
                    : 'Draw 20 tokens at this temperature and count what comes up.'}
                </span>
              </div>
            </div>
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="Softmax with temperature">
            <p>Divide every score by the temperature, raise e to each result, then divide by the total so the odds add up to 1. Temperature 0 means always take the top score. Top-p sampling drops the long tail before drawing.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">
                p<sub>i</sub> = e<sup>z<sub>i</sub> / T</sup> ⁄ Σ<sub>j</sub> e<sup>z<sub>j</sub> / T</sup>
              </div>
              <div className="worked">
                T = <b>{temp.toFixed(1)}</b>, top score z = <b>{z0.toFixed(2)}</b>
                <br />{temp > 0 ? <>measured from the top: e<sup>0</sup> = {big(scaledTop)}; the whole vocabulary sums to {big(ratio)}</> : 'T = 0: no division, just take the top score'}
                <br />p(“{v.top[0].text.trim() || '␣'}”) = <b>{pct(top[0])}</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
