import { useEffect, useRef, useState } from 'react'
import { AttentionLevels } from '../cutaway/stations/AttentionLevels'
import { StackLevels } from '../cutaway/stations/StackLevels'
import { TokenizerLevels } from '../cutaway/stations/TokenizerLevels'
import { VoteLevels } from '../cutaway/stations/VoteLevels'
import { LINES, STATIONS, stationByCode } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { cutawayData } from '../data/cutawayData'
import { MetroMap } from '../map/MetroMap'
import { markVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { Roundel } from '../ui/Roundel'

/** A slim band of map around the station, drawn at roughly 1:1 so labels stay legible at any width. */
function stripViewBox(x: number, pixelWidth: number) {
  const w = Math.max(380, Math.min(1120, pixelWidth))
  const left = Math.max(0, Math.min(1120 - w, x - w / 2))
  return `${left} 178 ${w} 150`
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(720)
  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

export function StationPage({ code }: { code: string }) {
  const station = stationByCode(code)
  const content = STATION_CONTENT[code]
  const [stripRef, stripWidth] = useWidth<HTMLDivElement>()
  useEffect(() => {
    if (station) markVisited(station.code)
  }, [station])
  if (!station || !content) return null

  const i = STATIONS.findIndex((s) => s.code === code)
  const prev = STATIONS[i - 1]
  const next = STATIONS[i + 1]

  return (
    <article className="station-page">
      <nav className="crumbs" aria-label="Back">
        <a href="#/">← Map</a>
      </nav>

      <div className="strip" ref={stripRef}>
        <MetroMap
          viewBox={stripViewBox(station.x, stripWidth)}
          focus={station.code}
          litLines={content.transfers}
          showTrain={false}
          label={`Map strip around ${station.code} ${station.name}`}
        />
      </div>

      <header className="station-head">
        <Roundel code={station.code} />
        <div>
          <p className="kicker">{station.code} · Prompt line</p>
          <h1>{station.name}</h1>
          <p className="lede">{station.oneLiner}</p>
        </div>
      </header>

      {content.cutaway === 'tokenizer' && <TokenizerLevels station={station} />}
      {content.cutaway === 'attention' && <AttentionLevels station={station} views={cutawayData.attention} />}
      {content.cutaway === 'stack' && <StackLevels station={station} view={cutawayData.floors} />}
      {content.cutaway === 'vote' && <VoteLevels station={station} view={cutawayData.vote} />}
      {!content.cutaway && (
        <div className="closed-window">
          <span className="closed-hole" aria-hidden="true" />
          <div>
            <h2>This window opens soon</h2>
            <p>{content.coming}</p>
          </div>
        </div>
      )}

      {content.cutaway && (
        <p className="coming"><b>Coming next here:</b> {content.coming}</p>
      )}

      {content.transfers.length > 0 && (
        <section className="transfers" aria-labelledby="transfers-title">
          <h2 id="transfers-title">Transfers here</h2>
          <ul className="lines">
            {content.transfers.map((id) => (
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
      )}

      <nav className="next-prev" aria-label="Along the line">
        {prev ? <a href={hrefFor(prev.code)}>← {prev.code} {prev.name}</a> : <span />}
        {next ? <a href={hrefFor(next.code)}>{next.code} {next.name} →</a> : <a href="#/">Back to the map →</a>}
      </nav>
    </article>
  )
}
