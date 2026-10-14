import { useState } from 'react'
import { VoteLevels } from '../cutaway/stations/VoteLevels'
import { stationByCode } from '../data/network'
import { phase1, voteProbs } from '../data/phase1'
import { modelName, trace } from '../data/trace'
import { SCENARIO } from '../data/heroRun'
import { isClean } from '../lib/safeText'
import { BeatTheModel } from '../games/BeatTheModel'
import type { LoopSpec } from '../loop/types'
import { TokenText } from '../ui/TokenText'
import { Dial } from './parts'

const station = stationByCode('P06')!
const vote = phase1.votePositions[2] ?? phase1.votePositions[phase1.votePositions.length - 1]
const vocab = trace ? Math.round(trace.model.vocabSize / 1000) * 1000 : 150000

function BoardPanel() {
  const rows = vote ? vote.top.slice(0, 4) : []
  const caption = vote?.plain ?? (vote ? `after “${vote.context}”` : '')
  const probs = vote ? voteProbs(vote, 1).top : []
  return (
    <div className="mini-board" role="img" aria-label="A departure board listing candidate tokens with their odds">
      <div className="mb-head"><span>P06 · THE VOTE</span><span>NEXT PIECE</span></div>
      {rows.map((c, i) => (
        <div key={i} className={`mb-row${i === 0 ? ' lit' : ''}`} style={{ animationDelay: `${0.15 * i}s` }}>
          <span className="mb-tok"><TokenText text={c.text} /></span>
          <span className="mb-p">{(probs[i] * 100).toFixed(0)}%</span>
        </div>
      ))}
      {caption && <p className="mb-ctx">{caption}</p>}
    </div>
  )
}

function PokeBody() {
  const [playing, setPlaying] = useState(false)
  return playing ? (
    <BeatTheModel onClose={() => setPlaying(false)} />
  ) : (
    <>
      <VoteLevels station={station} positions={phase1.votePositions} exactTail={phase1.real} />
      <div className="game-invite">
        <div>
          <h3>Beat the Model</h3>
          <p>Five rounds. Guess the next word, then see the odds the model gave your guess, and whether a real writer agreed.</p>
        </div>
        <button type="button" className="btn primary" onClick={() => setPlaying(true)} disabled={!phase1.beat.thinkLike.length}>Play</button>
      </div>
    </>
  )
}

const TEMPS = [0, 0.7, 1, 1.5, 2]

function TemperatureBreak() {
  const [T, setT] = useState(1)
  const runs = phase1.temperatureRuns.filter((r) => Math.abs(r.T - T) < 1e-6 && isClean(r.text))
  return (
    <div className="break-body">
      <Dial<number> stops={TEMPS} value={T} onChange={setT} label="Temperature" format={(t) => t.toFixed(1)} />
      {phase1.temperatureRuns.length ? (
        <div className="samples">
          {runs.map((r) => (
            <figure key={`${r.T}-${r.seed}`} className={`sample${T >= 1.5 ? ' hot' : ''}`}>
              <blockquote>{r.text.trim() || '(empty)'}{r.stoppedNaturally ? '' : ' …'}</blockquote>
              <figcaption>{T === 0 ? 'greedy: the same every time' : `seed ${r.seed}`}</figcaption>
            </figure>
          ))}
          <p className="muted">Real replies from {trace ? modelName(trace) : 'the recorded model'}, sampled at temperature {T.toFixed(1)} with the calculator's {SCENARIO.toolResult} already on the platform.</p>
        </div>
      ) : (
        <p className="muted">The sampled replies at each temperature arrive with the next trace run.</p>
      )}
    </div>
  )
}

export const P06_SPEC: LoopSpec = {
  code: 'P06',
  arrive: {
    caption: 'Every possible next word piece gets a score. Scores become odds, and one piece is drawn.',
    panel: <BoardPanel />,
    flashback: { q: 'At the top of The Stack, what comes out: one word, or a score for every possible next piece?', a: 'A score for every possible piece. This station turns scores into odds.' }
  },
  bet: {
    question: `The model can choose from about ${vocab.toLocaleString()} word pieces. How many get a chance above zero?`,
    options: [{ text: 'Only the winner' }, { text: 'The top 10' }, { text: 'All of them, most with tiny odds', correct: true }],
    reveal: 'All of them get a share, most of them microscopic. Settings like temperature decide how often long shots win.'
  },
  poke: {
    title: 'Turn the temperature',
    intro: 'Open the window, pick a moment from the ride, and slide the temperature. Then play Beat the Model.',
    body: <PokeBody />
  },
  name: {
    definition: 'The model turns its scores into odds that add up to 100%, then draws the next piece. Temperature reshapes the odds: low makes the favorite almost certain, high gives long shots a chance.',
    terms: ['probability', 'temperature', 'sampling'],
    picture: <BoardPanel />,
    metaphor: 'An election with every token as a candidate.',
    breaks: 'No one votes, and the favorite can lose: the winner is drawn in proportion to its odds, unless the temperature is 0.'
  },
  break: {
    title: 'Crank the temperature',
    intro: 'Same question, same calculator result. Only the temperature changes.',
    body: <TemperatureBreak />
  },
  stamp: {
    questions: [
      {
        q: 'A chatbot writes “I’m 95% sure.” Is that the model’s probability that the claim is true?',
        options: [
          { text: 'Yes, it reads its own probabilities', why: 'It doesn’t see its odds unless an app puts them in the context.' },
          { text: 'Yes, if the temperature is low', why: 'Temperature changes the draw, not what the odds mean.' },
          { text: 'No: it’s text the model wrote, and its odds are about the next token, not truth', correct: true, why: 'The 95% is just more tokens. The real odds describe what comes next, not whether it’s true.' }
        ]
      },
      {
        q: 'You ask the same question twice and get different answers. Nothing else changed. Most likely reason?',
        options: [
          { text: 'Sampling drew different tokens', correct: true, why: 'At temperature above 0, each draw can differ.' },
          { text: 'It learned from your first question', why: 'Weights don’t change between answers.' },
          { text: 'It searched differently the second time', why: 'Possible in apps that search again, but here the context was identical.' }
        ]
      }
    ],
    art: null,
    receipt: { text: 'The provider sets the temperature. Different answers to the same question are a design choice.', column: 'accountability' }
  }
}
