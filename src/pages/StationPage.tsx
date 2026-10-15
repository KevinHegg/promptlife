import { useEffect, useState } from 'react'
import { AttentionLevels } from '../cutaway/stations/AttentionLevels'
import { StackLevels } from '../cutaway/stations/StackLevels'
import { TokenizerLevels } from '../cutaway/stations/TokenizerLevels'
import { VoteLevels } from '../cutaway/stations/VoteLevels'
import { stationByCode } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { cutawayData } from '../data/cutawayData'
import { phase1 } from '../data/phase1'
import { StationLoop } from '../loop/StationLoop'
import type { BeatId } from '../loop/types'
import { LOOPS } from '../stations'
import { markVisited } from '../lib/progress'
import { StationLocator, rideOn } from '../map/StationLocator'

/** One station: a window onto the map showing where you are, then one thing at a time. */
export function StationPage({ code }: { code: string }) {
  const station = stationByCode(code)
  const content = STATION_CONTENT[code]
  const [leavingTo, setLeavingTo] = useState<string | null>(null)
  const [beat, setBeat] = useState<BeatId>('arrive')
  useEffect(() => {
    if (station) markVisited(station.code)
  }, [station])
  if (!station || !content) return null

  const loop = LOOPS[code]
  const go = (next: string) => rideOn(next, setLeavingTo)
  const showLocator = !loop?.hideLocatorOn?.includes(beat)

  return (
    <article className="station-page">
      <header className="station-bar">
        <h1>{station.name}</h1>
        <p className="muted small">{station.oneLiner}</p>
      </header>

      {showLocator && <StationLocator code={code} leavingTo={leavingTo} onGo={go} />}

      {loop ? (
        <StationLoop key={code} spec={loop} onRideOn={go} onBeatChange={setBeat} />
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
        </>
      )}
    </article>
  )
}
