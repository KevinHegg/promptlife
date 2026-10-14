import { useState, type ReactNode } from 'react'

type Props = {
  stationName: string
  map: ReactNode
  cutaway: ReactNode
  bedrock: ReactNode
  /** Taller boxes for stations with more to show. */
  size?: 'regular' | 'tall'
}

const LEVELS = ['Map', 'Cutaway', 'Bedrock'] as const

/**
 * Three stacked paper levels. Die-cut circular windows (CSS masks) open from the map
 * down to the machine (Cutaway) and then to the math (Bedrock).
 */
export function Cutaway({ stationName, map, cutaway, bedrock, size = 'regular' }: Props) {
  const [depth, setDepth] = useState(0)
  return (
    <div className="cutaway">
      <figure className={`cut-fig ${size}`} data-depth={depth} aria-label={`${stationName}, level ${depth + 1} of 3: ${LEVELS[depth]}`}>
        <div className="lv lv3" inert={depth < 2}>{bedrock}</div>
        <div className="lv lv2" inert={depth !== 1}>{cutaway}</div>
        <button className="rim rim2" type="button" aria-label="Dig to the math" tabIndex={depth === 1 ? 0 : -1} onClick={() => setDepth(2)} />
        <div className="lv lv1" inert={depth !== 0} onClick={() => depth === 0 && setDepth(1)}>{map}</div>
        <button className="rim rim1" type="button" aria-label="Open the window" tabIndex={depth === 0 ? 0 : -1} onClick={() => setDepth(1)} />
      </figure>
      <div className="depth" role="group" aria-label="Level">
        {LEVELS.map((name, i) => (
          <button key={name} className="btn" type="button" aria-pressed={depth === i} onClick={() => setDepth(i)}>
            {i + 1} · {name}
          </button>
        ))}
        <span className="hint">{depth === 0 ? 'Or tap the window itself.' : depth === 1 ? 'Tap the small window to dig to the math.' : 'This level is optional.'}</span>
      </div>
    </div>
  )
}

export function LevelText({ level, title, children, note }: { level: 1 | 2 | 3; title: string; children: ReactNode; note?: string }) {
  return (
    <div className="lv-text">
      <p className="lvtag">Level {level} · {LEVELS[level - 1]}</p>
      <h3>{title}</h3>
      <div className="lv-body">{children}</div>
      {note && <p className="note">{note}</p>}
    </div>
  )
}

export function Level({ children }: { children: ReactNode }) {
  return <div className="lv-in">{children}</div>
}

export function Vis({ children }: { children: ReactNode }) {
  return <div className="lv-vis">{children}</div>
}
