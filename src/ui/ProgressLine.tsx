import { STATIONS } from '../data/network'
import type { StationProgress } from '../lib/progress'
import type { ResumePoint } from '../lib/resume'
import { hrefFor } from '../lib/router'
import { LOOPS } from '../stations'
import { StartOver } from './StartOver'

type Props = {
  progress: Record<string, StationProgress>
  resume: ResumePoint
}

/**
 * Your trip at a glance, near the top of home: the eight stations as stops on one line. Stamped
 * stops are filled, started ones half lit, the next one ringed, and the ones still being built faint.
 * Every stop is a link.
 */
export function ProgressLine({ progress, resume }: Props) {
  const stamped = STATIONS.filter((s) => progress[s.code]?.stampedAt).length
  return (
    <nav className="progress-line" aria-label="Your progress">
      <p className="pl-summary">
        <b>Your trip:</b> {stamped} of {STATIONS.length} stamped
        {resume.started ? <> · next, {resume.name}</> : null}
      </p>
      <ol className="pl-stops">
        {STATIONS.map((s, i) => {
          const p = progress[s.code]
          const state = p?.stampedAt ? 'stamped' : p ? 'started' : LOOPS[s.code] ? 'ready' : 'soon'
          const next = resume.code === s.code
          const said = { stamped: 'stamped', started: 'started', ready: 'not started', soon: 'coming soon' }[state]
          return (
            <li key={s.code}>
              <a className={`pl-stop ${state}${next ? ' next' : ''}`} href={hrefFor(s.code)} aria-label={`${s.name}, ${said}${next ? ', next' : ''}`}>
                <span className="pl-dot" aria-hidden="true">{state === 'stamped' ? '✓' : i + 1}</span>
              </a>
            </li>
          )
        })}
      </ol>
      <p className="pl-note">
        Your progress is always under <span className="pl-btn"><span className="stations-icon" aria-hidden="true" /> Stations</span>, top right, on every page.
      </p>
      {STATIONS.some((s) => progress[s.code]) && <StartOver />}
    </nav>
  )
}
