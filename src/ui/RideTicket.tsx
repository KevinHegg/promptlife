import { useState } from 'react'
import { SCENARIO } from '../data/heroRun'
import { modelName, trace } from '../data/trace'
import { CardJourney, RecipeCard } from './RecipeCard'
import { Term } from './Term'

/**
 * A slim ticket at the top of the hands-on steps, so nobody has to remember: the question this
 * ride follows, the model that read it, and the card that came with it.
 */
export function RideTicket() {
  const [showCard, setShowCard] = useState(false)
  const model = trace ? modelName(trace) : 'Qwen2.5-0.5B-Instruct'
  return (
    <aside className="ride-ticket" aria-label="The question on this ride">
      <span className="kicker">On this ride</span>
      <p className="tk-q">“{SCENARIO.user}”</p>
      <p className="tk-by">
        Read by <Term id="recorded-model">{model}</Term>, a small model anyone can download, along with the recipe card you uploaded.{' '}
        <button type="button" className="link-btn" aria-expanded={showCard} onClick={() => setShowCard(!showCard)}>
          {showCard ? 'Hide the card' : 'Show the card'}
        </button>
      </p>
      {showCard && (
        <>
          <RecipeCard />
          <CardJourney />
        </>
      )}
    </aside>
  )
}
