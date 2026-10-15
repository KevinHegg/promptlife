import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MAIN_Y, STATIONS, stationByCode } from '../data/network'
import { readStations, readVisited } from '../lib/progress'
import { hrefFor } from '../lib/router'
import { depart } from '../lib/sound'
import { MetroMap } from './MetroMap'

/** Set just before riding on, so the next page starts with the train already in place. */
let arrivedByRide: string | null = null
/** The station the locator last showed, so the train glides in from where you really were. */
let lastAt: string | null = null

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Glide the train along the main line from one x to another. */
function glide(train: SVGGElement, from: number, to: number, ms: number, done?: () => void) {
  if (reduced() || ms <= 0) {
    train.setAttribute('transform', `translate(${to},${MAIN_Y})`)
    done?.()
    return () => {}
  }
  let raf = 0
  const t0 = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / ms)
    train.setAttribute('transform', `translate(${(from + (to - from) * ease(t)).toFixed(1)},${MAIN_Y})`)
    if (t < 1) raf = requestAnimationFrame(step)
    else done?.()
  }
  raf = requestAnimationFrame(step)
  return () => cancelAnimationFrame(raf)
}

type Props = {
  code: string
  /** When set, the train glides forward to this station (the page then navigates). */
  leavingTo: string | null
  onGo: (code: string) => void
}

/**
 * A die-cut window onto the whole map: where you are, where you've been, and the stations either
 * side. On arrival the train glides in from the previous station; riding on, it glides forward.
 */
export function StationLocator({ code, leavingTo, onGo }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const i = STATIONS.findIndex((s) => s.code === code)
  const here = STATIONS[i]
  const prev = STATIONS[i - 1]
  const next = STATIONS[i + 1]
  const lit = useMemo(() => {
    const stamped = readStations()
    const visited = readVisited()
    return STATIONS.filter((s) => visited.has(s.code) || stamped[s.code]?.stampedAt).map((s) => s.code)
  }, [])

  // Decided once per window, before any effect runs: glide in from where you were, or not at all
  // when a ride already brought you here or the window is reappearing on the same station.
  const [startX] = useState<number | null>(() => {
    if (arrivedByRide === code || lastAt === code) return null
    const from = lastAt ? stationByCode(lastAt) : prev
    return from ? from.x : (here?.x ?? 0) - 160
  })

  // A layout effect, so the train is in place before the first paint (never a flash at Send).
  useLayoutEffect(() => {
    lastAt = code
    if (arrivedByRide === code) arrivedByRide = null
    const train = svgRef.current?.querySelector<SVGGElement>('[data-train]')
    if (!train || !here) return
    train.setAttribute('transform', `translate(${startX ?? here.x},${MAIN_Y})`)
    if (startX === null) return
    return glide(train, startX, here.x, 1500)
  }, [code, here, startX])

  useEffect(() => {
    const train = svgRef.current?.querySelector<SVGGElement>('[data-train]')
    const to = leavingTo ? stationByCode(leavingTo) : null
    if (!train || !to || !here) return
    return glide(train, here.x, to.x, 1000)
  }, [leavingTo, here])

  if (!here) return null
  return (
    <div className="locator">
      <div className="locator-window">
        <MetroMap
          svgRef={svgRef}
          viewBox="0 70 1120 400"
          minimal
          linked={false}
          focus={code}
          litStations={lit}
          label={`Where you are: station ${i + 1} of ${STATIONS.length}, ${here.name}.`}
          className="locator-map"
        />
      </div>
      <nav className="locator-nav" aria-label="Stations">
        {prev ? (
          <a href={hrefFor(prev.code)}>← {prev.name}</a>
        ) : (
          <a href="#/">← Map</a>
        )}
        <span className="locator-here">{i + 1} of {STATIONS.length}</span>
        {next ? (
          <button type="button" className="link-btn strong" onClick={() => onGo(next.code)}>{next.name} →</button>
        ) : (
          <a href="#/">Map →</a>
        )}
      </nav>
    </div>
  )
}

/** Ride on: let the locator's train glide forward, then open the next station. */
export function rideOn(code: string, setLeaving: (c: string) => void) {
  depart()
  setLeaving(code)
  arrivedByRide = code
  window.setTimeout(() => {
    window.location.hash = `#/${code}`
  }, reduced() ? 0 : 1050)
}
