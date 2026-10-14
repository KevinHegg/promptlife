import { useMemo } from 'react'
import { LINES, STATIONS, type LineId } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { LiveRun } from '../map/LiveRun'
import { readVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { Roundel } from '../ui/Roundel'

const BRANCHES: LineId[] = ['L', 'W', 'G', 'A', 'S', 'D', 'R']

export function Home() {
  const visited = useMemo(readVisited, [])
  return (
    <>
      <header className="masthead">
        <p className="kicker">Prompt Life · a living map of how language models work</p>
        <h1>Ride along with one question.</h1>
        <p className="lede">A student asks an AI for help with a grade. Follow that question through a real model, station by station, then open any station to see the machinery inside.</p>
      </header>

      <LiveRun />

      <section className="stations" aria-labelledby="stations-title">
        <div className="section-head">
          <h2 id="stations-title">Stations</h2>
          <p className="muted">Open windows are lit. The rest open as the rebuild continues.</p>
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
                  </span>
                  <span className={`sc-lamp${visited.has(s.code) ? ' on' : ''}`} aria-label={visited.has(s.code) ? 'visited' : 'not visited yet'} />
                </a>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="branch-list" aria-labelledby="lines-title">
        <div className="section-head">
          <h2 id="lines-title">Branch lines</h2>
          <p className="muted">Side quests that leave the Prompt line where their question comes up.</p>
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
