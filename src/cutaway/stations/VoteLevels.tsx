import { useState } from 'react'
import type { Station } from '../../data/network'
import type { VoteView } from '../../data/placeholders'
import { sample, softmax } from '../../lib/softmax'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

const pct = (v: number) => {
  const x = v * 100
  return `${x < 0.1 ? x.toFixed(2) : x.toFixed(1)}%`
}
const big = (v: number) => (v >= 1e6 ? v.toExponential(2) : v.toFixed(1))

export function VoteLevels({ station, view }: { station: Station; view: VoteView }) {
  const [temp, setTemp] = useState(1)
  const [spins, setSpins] = useState<string[]>([])
  const logits = view.candidates.map((c) => c.logit)
  const probs = softmax(logits, temp)
  const top = view.candidates[0]
  const scaled = logits.map((z) => z / temp)
  const expTop = Math.exp(scaled[0])
  const expSum = scaled.reduce((a, z) => a + Math.exp(z), 0)

  const spin = () => {
    const i = sample(probs, Math.random())
    setSpins((s) => [view.candidates[i].text, ...s].slice(0, 10))
  }

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
            note={view.real ? view.source : 'Placeholder scores. The softmax math is live; real scores arrive with the trace pipeline.'}
          >
            <p>The next token after “{view.context}”. Low temperature makes the favorite almost certain. High temperature gives long shots a real chance. Spin to draw one.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="v-bars">
                {view.candidates.map((c, i) => (
                  <div className="v-bar" key={c.text + i}>
                    <span className="lab"><TokenText text={c.text} /></span>
                    <span className="track"><span className={`fill${i ? ' alt' : ''}`} style={{ width: `${(probs[i] * 100).toFixed(1)}%` }} /></span>
                    <span className="val">{pct(probs[i])}</span>
                  </div>
                ))}
              </div>
              <label className="v-slider" htmlFor="temp">
                <span>T</span>
                <input id="temp" type="range" min={0.1} max={2} step={0.1} value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} />
                <span>{temp.toFixed(1)}</span>
              </label>
              <div className="v-spin">
                <button type="button" className="btn small" onClick={spin}>Spin</button>
                <span className="v-cap" aria-live="polite">
                  {spins.length ? spins.map((s, i) => <span key={i} className="spin-chip"><TokenText text={s} /></span>) : 'Draw ten times at different temperatures.'}
                </span>
              </div>
            </div>
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="Softmax with temperature">
            <p>Divide every score by the temperature, raise e to each result, then divide by the total so the odds add up to 1.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">
                p<sub>i</sub> = e<sup>z<sub>i</sub> / T</sup> ⁄ Σ<sub>j</sub> e<sup>z<sub>j</sub> / T</sup>
              </div>
              <div className="worked">
                T = <b>{temp.toFixed(1)}</b>
                <br />e<sup>{top.logit} / {temp.toFixed(1)}</sup> = {big(expTop)}
                <br />sum over all {view.candidates.length} = {big(expSum)}
                <br />p(“{top.text.trim()}”) = <b>{pct(probs[0])}</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
