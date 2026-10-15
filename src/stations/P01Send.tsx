import { useState } from 'react'
import type { Src } from '../data/heroRun'
import { runCounts } from '../data/run'
import type { LoopSpec } from '../loop/types'
import { LiveRun } from '../map/LiveRun'
import { ContextBar, ContextBlocks, type ContextBlock } from './parts'

const SRC_NAMES: Record<Src, string> = {
  special: 'a hidden marker the app adds to show who is speaking',
  sys: 'something the app adds: hidden instructions, or a description of its calculator',
  rag: 'part of the recipe card the app found in your files',
  user: 'your question',
  tool: 'the tool call the model wrote',
  res: 'the calculator’s result, pasted in by the app',
  rep: 'the reply the model wrote'
}

/**
 * Two small steps instead of one busy screen: first watch the ride (one map, one button),
 * then find your own words among everything the model read.
 */
function RideThenFind() {
  const [step, setStep] = useState<'watch' | 'find'>('watch')
  const [rideDone, setRideDone] = useState(false)
  const [chosen, setChosen] = useState<ContextBlock | null>(null)
  const right = chosen?.src === 'user'

  if (step === 'watch') {
    return (
      <div className="substep">
        <p className="substep-label">1 of 2 · Watch the ride</p>
        <LiveRun compact onDone={() => setRideDone(true)} />
        <div className="substep-next">
          <button type="button" className={`btn${rideDone ? ' primary' : ''}`} onClick={() => setStep('find')}>
            {rideDone ? 'Now find your words →' : 'Skip to finding your words →'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="substep">
      <p className="substep-label">2 of 2 · Find your words</p>
      <p>This is everything the model read, grouped by where it came from. Which part did <b>you</b> type?</p>
      <ContextBlocks onPick={right ? undefined : setChosen} chosen={chosen?.key} />
      <p className="reveal" aria-live="polite">
        {right ? (
          <><b>That's you:</b> {runCounts.question} of {runCounts.total} tokens. Everything else came from the app or the model.</>
        ) : chosen ? (
          <><b>Not that one.</b> That's {SRC_NAMES[chosen.src]}.</>
        ) : null}
      </p>
      <div className="substep-next">
        <button type="button" className="link-btn" onClick={() => setStep('watch')}>← Watch the ride again</button>
      </div>
    </div>
  )
}

function SendPanel() {
  return (
    <svg className="arrive-art" viewBox="0 0 320 220" role="img" aria-label="A phone with the question typed and a thumb over Send">
      <rect x="100" y="10" width="120" height="200" rx="18" className="art-line" fill="none" />
      <rect x="110" y="32" width="100" height="74" rx="10" className="art-fill-soft" />
      <text x="117" y="49" className="art-text sm">Using my grandma's</text>
      <text x="117" y="62" className="art-text sm">recipe card, how</text>
      <text x="117" y="75" className="art-text sm">much flour do I need</text>
      <text x="117" y="88" className="art-text sm">to feed 30 people?</text>
      <circle cx="192" cy="176" r="14" className="art-accent" />
      <path d="M186,176 L198,176 M193,171 L198,176 L193,181" className="art-line-light" fill="none" />
      <path d="M232,150 Q260,138 300,120 M232,176 L304,176 M232,202 Q260,214 300,232" className="art-line dim" fill="none" />
      <path d="M88,150 Q60,138 20,120 M88,176 L16,176 M88,202 Q60,214 20,232" className="art-line dim" fill="none" />
    </svg>
  )
}

export const P01_SPEC: LoopSpec = {
  code: 'P01',
  // Try it shows the full ride map; one map on screen at a time.
  hideLocatorOn: ['poke'],
  arrive: {
    caption: 'This is your question. Ride along with it, all the way to the answer.',
    panel: <SendPanel />,
    guess: {
      q: 'How many times does the model run to write its answer?',
      options: [{ text: 'Once' }, { text: 'Once per sentence' }, { text: 'Once per token', correct: true }],
      reveal: `Once per token, a word part. This answer takes ${runCounts.trips} runs.`
    }
  },
  poke: {
    title: 'Ride along',
    intro: 'Press play and watch which lines light up. Then find your own words.',
    body: <RideThenFind />
  },
  name: {
    definition: 'A large language model (LLM) guesses the next token, adds it, and guesses again. A token is a word part: “strawberry” is st · raw · berry. Your prompt is what you typed. The context is everything it reads, including what the app added.',
    terms: ['large language model', 'token', 'prompt', 'context'],
    picture: <ContextBar />,
    metaphor: 'The train is the whole context, riding the line once for every new token of the answer.',
    breaks: 'Nothing travels. It’s one calculation, run again for each new token.'
  },
  stamp: {
    questions: [
      {
        q: 'A friend says the chatbot “remembered” Grandma’s recipe card. What actually put it in front of the model?',
        options: [
          { text: 'It memorized it in training', why: 'That card was never in its training text.' },
          { text: 'The app found the card in your files and added it to what the model reads', correct: true, why: 'The app does the searching, before the model reads anything.' },
          { text: 'The model searched your files itself', why: 'The model only writes text. The app does the searching.' }
        ]
      },
      {
        q: 'You type “Summarize this” and attach a 30-page reading. What fills most of the context?',
        options: [
          { text: 'Your two words', why: `They're a sliver, like your ${runCounts.question} of ${runCounts.total} tokens here.` },
          { text: 'The reading’s text', correct: true, why: 'Attached and fetched text usually dwarfs what you type.' },
          { text: 'A summary prepared in advance', why: 'Nothing is prepared. The summary is written one token per trip.' }
        ]
      }
    ],
    art: null,
    receipt: { text: 'Your question and your recipe card left your device. The provider’s policy decides who keeps them, and for how long.', column: 'data' }
  }
}
