import { useEffect, useRef, useState } from 'react'
import { STATIONS } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { readStations, readVisited } from '../lib/progress'
import { resumePoint } from '../lib/resume'
import { hrefFor } from '../lib/router'
import { tick } from '../lib/sound'
import { StampArt } from '../loop/StampArt'
import { LOOPS } from '../stations'
import { Roundel } from './Roundel'
import { SoundToggle } from './SoundToggle'

/**
 * One slim bar on every page: home, the glossary, and a Stations sheet for jumping anywhere.
 * When you've jumped back for a refresher, a quiet banner offers the way back to where you were.
 */
export function TopBar({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  const here = /^P0[1-8]$/.test(route) ? route : null
  const resume = resumePoint()
  const reviewing = here !== null && resume.started && resume.code !== here
  return (
    <>
      <header className="topbar">
        <a className="wordmark" href="#/">Prompt Life</a>
        <nav className="topbar-nav" aria-label="Site">
          <a href="#/glossary" aria-current={route.startsWith('glossary') ? 'page' : undefined}>Glossary</a>
          <button
            type="button"
            className="stations-btn"
            aria-haspopup="dialog"
            onClick={() => {
              tick()
              setOpen(true)
            }}
          >
            <span className="stations-icon" aria-hidden="true" />
            Stations
          </button>
        </nav>
      </header>
      {reviewing && (
        <a className="resume-bar" href={hrefFor(resume.code)}>
          <span>Reviewing.</span> Resume {resume.name} · {resume.step} →
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
          <div className="sheet-head">
            <h2 id="sheet-title">Stations</h2>
            <button type="button" className="sheet-x" aria-label="Close" onClick={onClose}>×</button>
          </div>
          {resume && resume.started && resume.code !== here && (
            <a className="btn primary sheet-resume" href={hrefFor(resume.code)} onClick={onClose}>
              Resume: {resume.name} · {resume.step} →
            </a>
          )}
          <ol className="station-list sheet-list">
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
          <div className="sheet-foot">
            <a href="#/" onClick={onClose}>The whole map</a>
            <a href="#/glossary" onClick={onClose}>Glossary</a>
            <SoundToggle />
          </div>
        </div>
      )}
    </dialog>
  )
}
