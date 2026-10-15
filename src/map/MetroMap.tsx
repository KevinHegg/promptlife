import { useId } from 'react'
import { BRANCH_PATHS, LINES, MAIN_Y, MOTION_PATHS, STATIONS, STOPS, type LineId } from '../data/network'
import { hrefFor } from '../lib/router'

type Props = {
  /** Crop to part of the map, e.g. a strip around one station. */
  viewBox?: string
  /** Station shown as "train is here" (static maps only). */
  focus?: string
  /** Lines drawn lit on a static map. */
  litLines?: LineId[]
  /** Whether stations link to their pages. */
  linked?: boolean
  showTrain?: boolean
  /** Static maps: a train that glides into the station at this x when the page opens. */
  arriveAt?: number
  label: string
  className?: string
  svgRef?: React.Ref<SVGSVGElement>
}

type Label = { x: number; y: number; text: string; anchor?: 'start' | 'middle' | 'end'; kind?: 'stop' | 'line' | 'sub' | 'note'; line?: LineId }

const LABELS: Label[] = [
  { x: 86, y: 194, text: 'L1 Search your files' },
  { x: 200, y: 96, text: 'L2 Find matches', anchor: 'middle' },
  { x: 314, y: 176, text: 'L3 Add to', anchor: 'end' },
  { x: 314, y: 191, text: 'context', anchor: 'end' },
  { x: 200, y: 150, text: 'Library', anchor: 'middle', kind: 'line', line: 'L' },
  { x: 200, y: 165, text: 'finds your files', anchor: 'middle', kind: 'sub' },
  { x: 86, y: 334, text: 'G1 Hidden instructions' },
  { x: 88, y: 397, text: 'Gatehouse', kind: 'line', line: 'G' },
  { x: 88, y: 412, text: 'G2 injection heist', kind: 'sub' },
  { x: 414, y: 169, text: 'D1 Image patches' },
  { x: 416, y: 107, text: 'Darkroom', kind: 'line', line: 'D' },
  { x: 416, y: 122, text: 'D2 diffusion', kind: 'sub' },
  { x: 705, y: 204, text: 'A1 Pretraining' },
  { x: 705, y: 159, text: 'A2 Fine-tuning' },
  { x: 707, y: 107, text: 'Academy', kind: 'line', line: 'A' },
  { x: 707, y: 122, text: 'A3 human feedback', kind: 'sub' },
  { x: 945, y: 147, text: 'Scratchpad', kind: 'line', line: 'S' },
  { x: 945, y: 162, text: 'S1 thinking', kind: 'sub' },
  { x: 1024, y: 194, text: 'R1 Ledger', anchor: 'end' },
  { x: 1022, y: 97, text: 'Debug the Bot', anchor: 'end', kind: 'line', line: 'R' },
  { x: 1022, y: 112, text: 'R2 capstone', anchor: 'end', kind: 'sub' },
  { x: 810, y: 464, text: 'W1 Read the request', anchor: 'middle' },
  { x: 640, y: 464, text: 'W2 Run the calculator', anchor: 'middle' },
  { x: 470, y: 464, text: 'W3 Paste the result', anchor: 'middle' },
  { x: 946, y: 350, text: 'Workshop', kind: 'line', line: 'W' },
  { x: 946, y: 365, text: 'tools · agents', kind: 'sub' },
  { x: 690, y: 358, text: 'each new token rides back to Embedding', anchor: 'middle', kind: 'note' }
]

const BRANCH_ORDER: Exclude<LineId, 'P'>[] = ['L', 'G', 'D', 'A', 'S', 'R', 'W']

export function MetroMap({ viewBox = '0 0 1120 490', focus, litLines = [], linked = true, showTrain = true, arriveAt, label, className, svgRef }: Props) {
  const uid = useId().replace(/:/g, '')
  const glow = `glow-${uid}`
  const arrow = `arrow-${uid}`
  const lit = new Set(litLines)

  return (
    <svg
      ref={svgRef}
      className={`metro ${className ?? ''}`}
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ ['--glow' as string]: `url(#${glow})` }}
    >
      <defs>
        <filter id={glow} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="m-arrow" />
        </marker>
      </defs>

      {BRANCH_ORDER.map((id) => (
        <g key={id} className={`branch${lit.has(id) ? ' lit' : ''}`} data-line={id}>
          <path className="m-line" style={{ stroke: LINES[id].color }} d={BRANCH_PATHS[id]} />
        </g>
      ))}

      <path className="m-loop" d="M918,277 C880,352 500,352 462,277" markerEnd={`url(#${arrow})`} />
      {/* The main line runs between stations, not through them, so a train inside a see-through station stays visible. */}
      {STATIONS.slice(1).map((s, k) => (
        <path key={s.code} className="m-line m-main" d={`M${STATIONS[k].x + 50},${MAIN_Y} H${s.x - 50}`} />
      ))}

      {Object.entries(MOTION_PATHS).map(([key, d]) => (
        <path key={key} className="m-motion" data-motion={key} d={d} />
      ))}

      {showTrain && (
        <g data-train="" transform={`translate(70,${MAIN_Y})`}>
          <rect className="train-body" x="-15" y="-8" width="30" height="16" rx="8" />
          <rect className="train-win" x="-8" y="-3.5" width="16" height="7" rx="3" />
        </g>
      )}

      {arriveAt !== undefined && (
        <g transform={`translate(${arriveAt},${MAIN_Y})`}>
          <g className="arriving">
            <rect className="train-body" x="-15" y="-8" width="30" height="16" rx="8" />
            <rect className="train-win" x="-8" y="-3.5" width="16" height="7" rx="3" />
          </g>
        </g>
      )}

      {STATIONS.map((s) => {
        const pill = (
          <>
            <rect className="pill" x={s.x - 52} y={MAIN_Y - 20} width="104" height="40" rx="20" />
            <text className="t-code" x={s.x - 8} y={MAIN_Y - 4} textAnchor="middle">{s.code}</text>
            <text className="t-st" x={s.x} y={MAIN_Y + 12} textAnchor="middle">{s.name}</text>
            <circle className={`lamp${focus === s.code ? ' on here' : ''}`} data-lamp={s.code} cx={s.x + 20} cy={MAIN_Y - 8} r="4" />
          </>
        )
        return linked ? (
          <a key={s.code} href={hrefFor(s.code)} className="station-link" aria-label={`${s.code} ${s.name}`}>{pill}</a>
        ) : (
          <g key={s.code}>{pill}</g>
        )
      })}

      {STOPS.map((stop) => (
        <circle
          key={stop.code}
          className={`stop lamp${stop.terminus ? ' term' : ''}`}
          data-lamp={stop.code}
          style={{ ['--c' as string]: LINES[stop.line].color }}
          cx={stop.x}
          cy={stop.y}
          r={stop.terminus ? 9 : 7}
        />
      ))}

      {LABELS.map((l, i) => (
        <text
          key={i}
          className={l.kind === 'line' ? 't-line' : l.kind === 'sub' ? 't-sub' : l.kind === 'note' ? 't-note' : 't-stop'}
          style={l.kind === 'line' && l.line ? { fill: LINES[l.line].color } : undefined}
          x={l.x}
          y={l.y}
          textAnchor={l.anchor ?? 'start'}
        >
          {l.text}
        </text>
      ))}
    </svg>
  )
}
