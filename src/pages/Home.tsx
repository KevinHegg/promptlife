import { useMemo } from 'react'
import { SCENARIO } from '../data/heroRun'
import { LINES, STATIONS, type LineId } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { LiveRun } from '../map/LiveRun'
import { readStations, readVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { Roundel } from '../ui/Roundel'
import { LOOPS } from '../stations'
import { Pass } from './Pass'

const BRANCHES: LineId[] = ['L', 'W', 'G', 'A', 'S', 'D', 'R']

/** The first open station the visitor hasn't stamped yet. */
function nextStop() {
  const progress = readStations()
  return STATIONS.find((s) => LOOPS[s.code] && !progress[s.code]?.stampedAt) ?? STATIONS[0]
}

export function Home() {
  const visited = useMemo(readVisited, [])
  const resume = useMemo(nextStop, [])
  const fresh = visited.size === 0
  return (
    <>
      <header className="masthead">
        <p className="kicker">Prompt Life</p>
        <h1>What happens after you hit Send?</h1>
        <p className="lede">Follow one question through a real AI model, like a train through a subway map. Each station is one step. Stop at any of them to look inside.</p>
        <div className="question-card">
          <span className="kicker">Today's question</span>
          <p>“{SCENARIO.user}”</p>
        </div>
        <div className="cta">
          <a className="btn primary big" href={hrefFor(resume.code)}>
            {fresh ? 'Start the ride →' : `Continue at ${resume.code} ${resume.name} →`}
          </a>
          <a className="btn" href="#ride">Or watch the whole trip first</a>
        </div>
        <p className="muted small">Each station takes a few minutes: try it yourself, learn the word for it, break it, and earn a stamp.</p>
      </header>

      <LiveRun id="ride" compact />

      <section className="stations" aria-labelledby="stations-title">
        <div className="section-head">
          <h2 id="stations-title">Stations</h2>
          <p className="muted">Stations marked “full stop” are ready end to end. The others show one part or open soon.</p>
        </div>
        <ol className="station-grid">
          {STATIONS.map((s) => {
            const content = STATION_CONTENT[s.code]
            const open = !!content.cutaway
            return (
              <li key={s.code}>
                <a className={`station-card${open ? ' open' : ''}`} href={hrefFor(s.code)}>
                  <Roundel code={s.code} />
                  <span className="sc-body">
                    <span className="sc-name">{s.name}</span>
                    <span className="sc-line">{s.oneLiner}</span>
                    {LOOPS[s.code] ? <span className="sc-tag">full stop</span> : open ? <span className="sc-tag dim">preview</span> : null}
                  </span>
                  <span className={`sc-lamp${visited.has(s.code) ? ' on' : ''}`} aria-label={visited.has(s.code) ? 'visited' : 'not visited yet'} />
                </a>
              </li>
            )
          })}
        </ol>
      </section>

      <Pass />

      <section className="branch-list" aria-labelledby="lines-title">
        <div className="section-head">
          <h2 id="lines-title">Branch lines</h2>
          <p className="muted">Side trips that leave the main line where their question comes up. Coming later.</p>
        </div>
        <ul className="lines">
          {BRANCHES.map((id) => (
            <li key={id} className="line-item">
              <Roundel code={id} color={LINES[id].color} small />
              <span>
                <b>{LINES[id].name}</b>
                <span className="muted"> {LINES[id].blurb}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
