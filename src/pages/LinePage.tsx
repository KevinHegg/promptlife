import { useEffect } from 'react'
import { LINES, SIDE_LINES, stationByCode, type LineId } from '../data/network'
import { markVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { StationLoop } from '../loop/StationLoop'
import { MetroMap } from '../map/MetroMap'
import { LINE_LOOPS } from '../stations/lines'

/** A side line: its name in its color, a window onto the map with the line lit, then its lesson. */
export function LinePage({ code }: { code: Exclude<LineId, 'P'> }) {
  const line = LINES[code]
  const meta = SIDE_LINES.find((l) => l.code === code)
  const from = meta ? stationByCode(meta.from) : undefined
  const spec = LINE_LOOPS[code]
  useEffect(() => {
    markVisited(code)
  }, [code])
  return (
    <article className="station-page line-page" style={{ ['--c' as string]: line.color }}>
      <header className="station-bar">
        <p className="kicker line-kicker"><span className="line-dot" aria-hidden="true" />Side line</p>
        <h1>{line.name}</h1>
        <p className="muted small">{meta?.oneLiner ?? line.blurb}</p>
      </header>
      <div className="locator">
        <div className="locator-window">
          <MetroMap viewBox="0 70 1120 400" minimal linked={false} showTrain={false} litLines={[code]} className="locator-map" label={`The map, with the ${line.name} line lit.`} />
        </div>
        <nav className="locator-nav" aria-label="Where this line goes">
          {from ? <a href={hrefFor(from.code)}>← Back to {from.name}</a> : <a href="#/">← Map</a>}
          <a href="#/">The whole map</a>
        </nav>
      </div>
      {spec ? (
        <StationLoop key={code} spec={spec} />
      ) : (
        <div className="closed-window">
          <span className="closed-hole" aria-hidden="true" />
          <div>
            <h2>This line opens soon</h2>
            <p>{line.blurb}</p>
          </div>
        </div>
      )}
    </article>
  )
}
