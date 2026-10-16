import { useState } from 'react'
import type { Station } from '../../data/network'
import { contextBeforePos, trace } from '../../data/trace'
import { isClean } from '../../lib/safeText'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Term } from '../../ui/Term'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

/** The moments you can ride, in the order they happen. */
const MOMENTS: { id: string; name: string }[] = [
  { id: 'answer-digit', name: 'The 8 in 8.4' },
  { id: 'reply-word', name: '“flour” in the reply' },
  { id: 'turn-start', name: 'Calculator or words?' }
]

type Lens = NonNullable<typeof trace>['logitLens'][number]

/** The first floor from which the final top guess stays on top all the way up. */
export function leadFloor(lens: Lens) {
  const floors = lens.layers.filter((l) => l.layer > 0)
  const final = floors[floors.length - 1]?.top[0]?.text
  let k = floors.length - 1
  while (k > 0 && floors[k - 1].top[0]?.text === final) k--
  return { floor: floors[k]?.layer ?? 0, final: final ?? '', prob: floors[k]?.top[0]?.prob ?? 0 }
}

const pctOf = (p: number) => (p >= 0.995 ? `${(p * 100).toFixed(1)}%` : p < 0.01 ? '<1%' : `${Math.round(p * 100)}%`)

/** Ride the elevator: pick a moment, then any floor, and read the top guesses there. */
export function Elevator() {
  const lenses = MOMENTS.map((m) => ({ ...m, lens: trace?.logitLens.find((l) => l.id === m.id) })).filter((m) => m.lens)
  const [mid, setMid] = useState(lenses[0]?.id ?? '')
  const [floor, setFloor] = useState(12)
  const [found, setFound] = useState(false)
  const m = lenses.find((x) => x.id === mid) ?? lenses[0]
  if (!m?.lens) return <p className="v-cap">The floor-by-floor guesses arrive with the next trace run.</p>
  const lens = m.lens
  const floors = lens.layers.filter((l) => l.layer > 0)
  const top = floors.length
  const lead = leadFloor(lens)
  const here = floors.find((l) => l.layer === floor) ?? floors[floors.length - 1]
  const go = (f: number) => {
    const next = Math.max(1, Math.min(top, f))
    setFloor(next)
    tick()
    if (m.id === 'answer-digit' && next === lead.floor && !found) {
      setFound(true)
      yes()
    }
  }
  const context = trace ? contextBeforePos(trace, lens.pos) : ''
  return (
    <div className="v-col elevator">
      <Howto>Pick a moment, then tap a floor or use ▲ ▼.</Howto>
      <div className="v-examples" role="group" aria-label="Moment">
        {lenses.map((x) => (
          <button key={x.id} type="button" className="chip-btn" aria-pressed={x.id === m.id} onClick={() => { setMid(x.id); tick() }}>{x.name}</button>
        ))}
      </div>
      {m.id === 'answer-digit' && (
        <p className={`challenge${found ? ' done' : ''}`}>{found ? `✓ Found: floor ${lead.floor}, where “8” takes the lead` : 'Challenge: find the floor where “8” takes the lead.'}</p>
      )}
      <p className="v-cap">After “{context}”</p>
      <div className="lift">
        <ol className="shaft" aria-label="Floors">
          {floors.slice().reverse().map((l) => {
            const leads = l.layer >= lead.floor
            return (
              <li key={l.layer}>
                <button
                  type="button"
                  className={`fl${l.layer === here.layer ? ' on' : ''}${leads ? ' lead' : ''}`}
                  aria-label={`Floor ${l.layer}`}
                  aria-pressed={l.layer === here.layer}
                  onClick={() => go(l.layer)}
                />
              </li>
            )
          })}
        </ol>
        <div className="lift-panel">
          <div className="lift-buttons">
            <button type="button" className="btn small" onClick={() => go(here.layer + 1)} disabled={here.layer >= top} aria-label="Up one floor">▲</button>
            <span className="lift-floor">Floor {here.layer}<small> of {top}</small></span>
            <button type="button" className="btn small" onClick={() => go(here.layer - 1)} disabled={here.layer <= 1} aria-label="Down one floor">▼</button>
          </div>
          <ol className="lift-guesses">
            {here.top.map((g, i) => (
              <li key={i} className={g.text === lead.final ? 'is-final' : ''}>
                <span className="lg-tok">{isClean(g.text) ? <TokenText text={g.text} /> : '…'}</span>
                <span className="lg-bar"><span style={{ width: `${Math.max(2, g.prob * 100)}%` }} /></span>
                <span className="lg-p">{pctOf(g.prob)}</span>
              </li>
            ))}
          </ol>
          <p className="v-cap">{here.layer < lead.floor - 2 ? 'Scraps: this floor’s guess is not the answer yet.' : here.layer >= lead.floor ? `“${lead.final.trim() || lead.final}” leads from floor ${lead.floor} up.` : 'Getting close.'}</p>
        </div>
      </div>
      <p className="v-below">Reading a floor’s guess is a measurement trick called the <Term id="logit-lens">logit lens</Term>. The middle floors weren’t built to be read.</p>
    </div>
  )
}

export function ElevatorLevels({ station }: { station: Station }) {
  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText level={2} title="Ride the elevator">
            <p>Each floor edits the token’s numbers. Read the guess you’d get at any floor.</p>
          </LevelText>
          <Vis>
            <Elevator />
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="The residual stream">
            <p>Each token carries one list of 896 numbers up the building. Every floor adds an edit instead of replacing it, which is why a guess can be read at any floor.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">
                h ← h + Attention(norm(h))
                <br />h ← h + FeedForward(norm(h))
                <br />repeat for all 24 floors
              </div>
              <div className="worked">
                h is the token’s 896 numbers; ← means “replace with”; norm rescales them
                <br />the feed-forward step widens <b>896</b> numbers to <b>4,864</b> and back
                <br />read a floor: guess = W<sub>out</sub> · norm(h), where W<sub>out</sub> is the final scoring table
                <br />this trick is called the <b>logit lens</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
