import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { open } from '../lib/sound'

type Props = {
  stationName: string
  map: ReactNode
  cutaway: ReactNode
  bedrock: ReactNode
  /** Taller boxes for stations with more to show. */
  size?: 'regular' | 'tall'
}

/** Plain names for the three levels: no app-internal words like “cutaway” or “bedrock” on screen. */
const LEVELS = ['On the map', 'Up close', 'The math (optional)'] as const

/**
 * Three stacked paper levels. Die-cut circular windows (CSS masks) open from the map
 * down to the machine (Cutaway) and then to the math (Bedrock). The window opens on its own
 * a moment after arrival, so the student lands on the part they can play with; one toggle
 * leads down to the math and back.
 */
export function Cutaway({ stationName, map, cutaway, bedrock, size = 'regular' }: Props) {
  const [depth, setDepth] = useState(0)
  const figRef = useRef<HTMLElement>(null)
  // On phones the box takes the height of the level you're looking at (CSS reads --fit-h),
  // so there's no empty band and no scrolling inside the box.
  const [fitH, setFitH] = useState<number | null>(null)
  // Height changes animate only after the first fit, so arriving doesn't wobble.
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setDepth((d) => (d === 0 ? 1 : d)), 450)
    const s = window.setTimeout(() => setSettled(true), 120)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(s)
    }
  }, [])
  // A soft flute each time a window opens onto a deeper level.
  const lastDepth = useRef(0)
  useEffect(() => {
    if (depth > lastDepth.current) open()
    lastDepth.current = depth
  }, [depth])
  useLayoutEffect(() => {
    const fig = figRef.current
    const level = fig?.querySelector<HTMLElement>(`.lv${depth === 2 ? 3 : 2} > .lv-in`)
    if (!level) return
    const measure = () => setFitH(Math.ceil(level.offsetHeight))
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(level)
    return () => ro.disconnect()
  }, [depth])
  return (
    <div className="cutaway">
      <figure
        ref={figRef}
        className={`cut-fig ${size}${settled ? ' settled' : ''}`}
        data-depth={depth}
        style={fitH ? { ['--fit-h' as string]: `${fitH}px` } : undefined}
        aria-label={`${stationName}: ${LEVELS[depth]}`}
      >
        <div className="lv lv3" inert={depth < 2}>{bedrock}</div>
        <div className="lv lv2" inert={depth !== 1}>{cutaway}</div>
        <button className="rim rim2" type="button" aria-label="Dig to the math" tabIndex={depth === 1 ? 0 : -1} onClick={() => setDepth(2)} />
        <div className="lv lv1" inert={depth !== 0} onClick={() => depth === 0 && setDepth(1)}>{map}</div>
        <button className="rim rim1" type="button" aria-label="Open the window" tabIndex={depth === 0 ? 0 : -1} onClick={() => setDepth(1)} />
      </figure>
      <div className="depth">
        {depth < 2 ? (
          <button className="btn small" type="button" onClick={() => setDepth(depth === 0 ? 1 : 2)}>
            {depth === 0 ? 'Open the window' : 'Show the math ↓'}
          </button>
        ) : (
          <button className="btn small" type="button" onClick={() => setDepth(1)}>Back to the machine ↑</button>
        )}
        <span className="hint">{depth === 2 ? 'The math is optional.' : ''}</span>
      </div>
    </div>
  )
}

export function LevelText({ level, title, children, note }: { level: 1 | 2 | 3; title: string; children: ReactNode; note?: string }) {
  return (
    <div className="lv-text">
      <p className="lvtag">{LEVELS[level - 1]}</p>
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
