import { useMemo, useState } from 'react'
import { SCENARIO } from '../data/heroRun'
import { STATIONS } from '../data/network'
import { STATION_CONTENT } from '../data/stationContent'
import { LiveRun } from '../map/LiveRun'
import { readStations } from '../lib/progress'
import { resumePoint } from '../lib/resume'
import { hrefFor } from '../lib/router'
import { StampArt } from '../loop/StampArt'
import { ProgressLine } from '../ui/ProgressLine'
import { HOW_THE_CARD_GOT_THERE, RecipeCard } from '../ui/RecipeCard'
import { Roundel } from '../ui/Roundel'
import { LOOPS } from '../stations'

/** Home: the question, one way in, your progress, the stations, then the optional ride. Nothing else. */
export function Home() {
  const progress = useMemo(readStations, [])
  const resume = useMemo(resumePoint, [])
  const [showCard, setShowCard] = useState(false)
  return (
    <>
      <header className="masthead">
        <h1>What happens after you hit Send?</h1>
        <p className="lede">Follow one question through a real AI model, like a train through a subway map.</p>
        <div className="question-card">
          <span className="kicker">The question</span>
          <p>“{SCENARIO.user}”</p>
          <div className="card-row">
            <span>+ Grandma’s recipe card, from your files</span>
            <button type="button" className="link-btn" aria-expanded={showCard} onClick={() => setShowCard(!showCard)}>
              {showCard ? 'Hide the card' : 'Show the card'}
            </button>
          </div>
          {showCard && (
            <>
              <RecipeCard />
              <p className="card-how">{HOW_THE_CARD_GOT_THERE}</p>
            </>
          )}
        </div>
        <div className="cta">
          <a className="btn primary big" href={hrefFor(resume.code)}>
            {resume.started ? `Continue: ${resume.name}, ${resume.step} →` : 'Start the ride →'}
          </a>
        </div>
        <ProgressLine progress={progress} resume={resume} />
      </header>

      <section className="stations" aria-labelledby="stations-title">
        <h2 id="stations-title">Stations</h2>
        <ol className="station-list">
          {STATIONS.map((s) => {
            const ready = !!LOOPS[s.code]
            const preview = !ready && !!STATION_CONTENT[s.code].cutaway
            const stamped = progress[s.code]?.stampedAt
            return (
              <li key={s.code}>
                <a className={`station-row${ready ? ' ready' : ''}`} href={hrefFor(s.code)}>
                  <Roundel code={s.code} small />
                  <span className="sr-body">
                    <span className="sr-name">{s.name}</span>
                    <span className="sr-line">{s.oneLiner}</span>
                  </span>
                  {stamped ? (
                    <StampArt code={s.code} size={40} />
                  ) : (
                    <span className="sr-tag">{ready ? (progress[s.code] ? 'started' : 'ready') : preview ? 'preview' : 'soon'}</span>
                  )}
                </a>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="home-ride" aria-labelledby="ride-title">
        <h2 id="ride-title">The whole trip</h2>
        <p className="muted">Optional: watch the question ride from start to finish, about a minute.</p>
        <LiveRun id="ride" compact />
      </section>
    </>
  )
}
