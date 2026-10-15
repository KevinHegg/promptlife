import { useEffect } from 'react'
import { AttentionLevels } from '../cutaway/stations/AttentionLevels'
import { StackLevels } from '../cutaway/stations/StackLevels'
import { TokenizerLevels } from '../cutaway/stations/TokenizerLevels'
import { VoteLevels } from '../cutaway/stations/VoteLevels'
import { STATIONS, stationByCode } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { cutawayData } from '../data/cutawayData'
import { phase1 } from '../data/phase1'
import { StationLoop } from '../loop/StationLoop'
import { LOOPS } from '../stations'
import { markVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { Roundel } from '../ui/Roundel'

/** One station: a slim header, then one thing at a time. */
export function StationPage({ code }: { code: string }) {
  const station = stationByCode(code)
  const content = STATION_CONTENT[code]
  useEffect(() => {
    if (station) markVisited(station.code)
  }, [station])
  if (!station || !content) return null

  const loop = LOOPS[code]
  const n = STATIONS.findIndex((s) => s.code === code) + 1
  const next = STATIONS[n]

  return (
    <article className="station-page">
      <header className="station-bar">
        <a className="back" href="#/">← Map</a>
        <div className="station-id">
          <Roundel code={station.code} small />
          <div>
            <h1>{station.name}</h1>
            <p className="muted small">Station {n} of {STATIONS.length} · {station.oneLiner}</p>
          </div>
        </div>
      </header>

      {loop ? (
        <StationLoop key={code} spec={loop} />
      ) : (
        <>
          {content.cutaway === 'tokenizer' && <TokenizerLevels station={station} />}
          {content.cutaway === 'attention' && <AttentionLevels station={station} views={cutawayData.attention} />}
          {content.cutaway === 'stack' && <StackLevels station={station} view={cutawayData.floors} />}
          {content.cutaway === 'vote' && <VoteLevels station={station} positions={phase1.votePositions} exactTail={phase1.real} />}
          {!content.cutaway && (
            <div className="closed-window">
              <span className="closed-hole" aria-hidden="true" />
              <div>
                <h2>This station opens soon</h2>
                <p>{content.coming}</p>
              </div>
            </div>
          )}
          <nav className="next-prev" aria-label="Along the line">
            <a href="#/">← Back to the map</a>
            {next && <a href={hrefFor(next.code)}>Next: {next.name} →</a>}
          </nav>
        </>
      )}
    </article>
  )
}
