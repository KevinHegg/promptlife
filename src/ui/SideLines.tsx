import { LINES, SIDE_LINES } from '../data/network'
import type { StationProgress } from '../lib/progress'
import { StampArt } from '../loop/StampArt'
import { LINE_LOOPS } from '../stations/lines'

/**
 * The side lines as a list: each with its color, what it's about, and whether it's ready, started
 * or stamped. `onlyReady` keeps a short list (the Stations sheet); home shows them all.
 */
export function SideLineList({ progress, onlyReady = false, onPick }: { progress: Record<string, StationProgress>; onlyReady?: boolean; onPick?: () => void }) {
  const lines = SIDE_LINES.filter((l) => !onlyReady || LINE_LOOPS[l.code])
  return (
    <ol className="station-list side-list">
      {lines.map((l) => {
        const ready = !!LINE_LOOPS[l.code]
        const stamped = progress[l.code]?.stampedAt
        return (
          <li key={l.code}>
            <a className={`station-row${ready ? ' ready' : ''}`} href={`#/${l.code}`} style={{ ['--c' as string]: LINES[l.code].color }} onClick={onPick}>
              <span className="line-roundel" aria-hidden="true">{l.code}</span>
              <span className="sr-body">
                <span className="sr-name">{LINES[l.code].name}</span>
                <span className="sr-line">{l.oneLiner}</span>
              </span>
              {stamped ? <StampArt code={l.code} size={40} /> : <span className="sr-tag">{ready ? (progress[l.code] ? 'started' : 'ready') : 'soon'}</span>}
            </a>
          </li>
        )
      })}
    </ol>
  )
}
