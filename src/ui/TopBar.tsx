import { useEffect, useRef, useState } from 'react'
import { STATIONS } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { readStations, readVisited } from '../lib/progress'
import { resumePoint } from '../lib/resume'
import { hrefFor } from '../lib/router'
import { tick } from '../lib/sound'
import { StampArt } from '../loop/StampArt'
import { LOOPS } from '../stations'
import { MetroMap } from '../map/MetroMap'
import { Roundel } from './Roundel'
import { SoundToggle } from './SoundToggle'
import { StartOver } from './StartOver'
import { SideLineList } from './SideLines'
import { LINE_LOOPS } from '../stations/lines'

/**
 * One slim bar on every page: home, the glossary, and a Stations sheet for jumping anywhere.
 * When you've jumped back for a refresher, a quiet banner offers the way back to where you were.
 */
/** How many visits the Stations button is highlighted for, until someone has opened it. */
const HINT_KEY = 'promptlife.v1.stationsHint'
const HINT_VISITS = 3

/** Decided once per page load, so a visit is counted once however often React sets up. */
let hintDecision: boolean | null = null

function hintThisVisit(): boolean {
  if (hintDecision !== null) return hintDecision
  try {
    const n = Number(window.localStorage.getItem(HINT_KEY) ?? '0')
    hintDecision = n < HINT_VISITS
    if (hintDecision) window.localStorage.setItem(HINT_KEY, String(n + 1))
  } catch {
    hintDecision = false
  }
  return hintDecision
}

function stopHint() {
  hintDecision = false
  try {
    window.localStorage.setItem(HINT_KEY, String(HINT_VISITS))
  } catch {
    /* nothing to remember */
  }
}

export function TopBar({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  // Any change of page closes the sheet, including the browser's back button.
  useEffect(() => setOpen(false), [route])
  // On someone's first few visits, the Stations button pulses gently a few times: it holds their progress.
  const [hint, setHint] = useState(hintThisVisit)
  const here = /^P0[1-8]$/.test(route) ? route : null
  const resume = resumePoint()
  const reviewing = here !== null && resume.started && !resume.complete && resume.code !== here
  return (
    <>
      <header className="topbar">
        <a className="wordmark" href="#/">Prompt Life</a>
        <nav className="topbar-nav" aria-label="Site">
          <a href="#/glossary" aria-current={route.startsWith('glossary') ? 'page' : undefined}>Glossary</a>
          <button
            type="button"
            className={`stations-btn${hint ? ' hint' : ''}`}
            aria-haspopup="dialog"
            onClick={() => {
              tick()
              setOpen(true)
              setHint(false)
              stopHint()
            }}
          >
            <span className="stations-icon" aria-hidden="true" />
            Stations
          </button>
        </nav>
      </header>
      {reviewing && (
        <a className="resume-bar" href={hrefFor(resume.code)}>
          <span>Reviewing.</span> Resume {resume.name}, {resume.step} →
        </a>
      )}
      <StationsSheet open={open} onClose={() => setOpen(false)} here={here} />
    </>
  )
}

function StationsSheet({ open, onClose, here }: { open: boolean; onClose: () => void; here: string | null }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  // While the sheet is open, the page behind it stays put, so a swipe scrolls only the station list.
  useEffect(() => {
    if (!open) return
    const y = window.scrollY
    const hash = window.location.hash
    const b = document.body.style
    const prev = { position: b.position, top: b.top, left: b.left, right: b.right }
    Object.assign(b, { position: 'fixed', top: `-${y}px`, left: '0', right: '0' })
    return () => {
      Object.assign(b, prev)
      // Closed in place: back to the same spot. Closed by going to another page: start at its top.
      window.scrollTo(0, y)
      window.setTimeout(() => {
        if (window.location.hash !== hash) window.scrollTo(0, 0)
      }, 0)
    }
  }, [open])
  // Read fresh each time the sheet opens, so it reflects steps taken since the page loaded.
  const progress = open ? readStations() : {}
  const visited = open ? readVisited() : new Set<string>()
  const resume = open ? resumePoint() : null
  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {open && (
        <div className="sheet-in">
          {/* The top bar stays where it was, and the Stations button becomes an open tab joined to the card below. */}
          <div className="sheet-bar">
            <a className="wordmark" href="#/" onClick={onClose}>Prompt Life</a>
            <nav className="topbar-nav" aria-label="Site">
              <a href="#/glossary" onClick={onClose}>Glossary</a>
              <button type="button" className="stations-btn tab" aria-expanded="true" aria-label="Close stations" onClick={onClose}>
                <span className="stations-icon" aria-hidden="true" />
                Stations
              </button>
            </nav>
          </div>
          <div className="sheet-card">
          <h2 id="sheet-title" className="visually-hidden">Stations</h2>
          <div className="sheet-window" aria-hidden="true">
            <MetroMap
              viewBox="0 70 1120 400"
              minimal
              linked={false}
              showTrain={false}
              focus={here ?? resume?.code}
              litStations={STATIONS.filter((s) => visited.has(s.code) || progress[s.code]).map((s) => s.code)}
              className="locator-map"
              label="The map, with the stations you have visited lit."
            />
          </div>
          {resume && resume.started && !resume.complete && resume.code !== here && (
            <a className="btn primary sheet-resume" href={hrefFor(resume.code)} onClick={onClose}>
              Resume: {resume.name}, {resume.step} →
            </a>
          )}
          <div className="sheet-list">
          <ol className="station-list">
            {STATIONS.map((s) => {
              const ready = !!LOOPS[s.code]
              const preview = !ready && !!STATION_CONTENT[s.code]?.cutaway
              const stamped = progress[s.code]?.stampedAt
              const isHere = s.code === here
              return (
                <li key={s.code}>
                  <a
                    className={`station-row${ready ? ' ready' : ''}${isHere ? ' here' : ''}`}
                    href={hrefFor(s.code)}
                    aria-current={isHere ? 'page' : undefined}
                    onClick={onClose}
                  >
                    <Roundel code={s.code} small />
                    <span className="sr-body">
                      <span className="sr-name">{s.name}</span>
                      <span className="sr-line">{isHere ? 'You are here' : s.oneLiner}</span>
                    </span>
                    {stamped ? (
                      <StampArt code={s.code} size={34} />
                    ) : (
                      <span className="sr-tag">{ready ? (visited.has(s.code) ? 'started' : 'ready') : preview ? 'preview' : 'soon'}</span>
                    )}
                  </a>
                </li>
              )
            })}
          </ol>
          {Object.keys(LINE_LOOPS).length > 0 && (
            <>
              <p className="kicker sheet-sub">Side lines</p>
              <SideLineList progress={progress} onlyReady onPick={onClose} />
            </>
          )}
          </div>
          <div className="sheet-foot">
            <a href="#/" onClick={onClose}>The whole map</a>
            <a href="#/glossary" onClick={onClose}>Glossary</a>
            <SoundToggle />
            <StartOver />
          </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
