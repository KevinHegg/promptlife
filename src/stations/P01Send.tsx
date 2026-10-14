import { useState } from 'react'
import type { Src } from '../data/heroRun'
import { runCounts } from '../data/run'
import { SCENARIO } from '../data/heroRun'
import type { LoopSpec } from '../loop/types'
import { LiveRun } from '../map/LiveRun'
import type { PlatformToken } from '../map/runEngine'
import { ContextBar } from './parts'

const SRC_NAMES: Record<Src, string> = {
  special: 'a hidden marker the app adds to show who is speaking',
  sys: 'part of the app’s hidden instructions or its description of the calculator',
  rag: 'part of the recipe card the app found in your files',
  user: 'your question',
  tool: 'the tool call the model wrote',
  res: 'the calculator’s result, pasted in by the app',
  rep: 'the reply the model wrote'
}

function FindYourself() {
  const [found, setFound] = useState(false)
  const [miss, setMiss] = useState<Src | null>(null)
  const pick = (t: PlatformToken) => {
    if (t.src === 'user') {
      setFound(true)
      setMiss(null)
    } else setMiss(t.src)
  }
  return (
    <LiveRun
      onPick={found ? undefined : pick}
      outline={found ? 'user' : undefined}
      aside={
        <div className="notice task">
          <h3>Your task</h3>
          <p>Press play and watch the ride. Then tap the part of the platform that you typed.</p>
          {found ? (
            <p className="reveal"><b>That's you.</b> {runCounts.question} of {runCounts.total} word pieces. Everything else came from the app or from the model.</p>
          ) : miss ? (
            <p className="reveal"><b>Not that one.</b> That's {SRC_NAMES[miss]}.</p>
          ) : (
            <p className="muted">Tip: long gray stretches fold up. Tap “+ more” to open them.</p>
          )}
        </div>
      }
    />
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
  arrive: {
    caption: 'This is your question. Ride along with it, all the way to the answer.',
    panel: <SendPanel />
  },
  poke: {
    title: 'Ride along',
    intro: `The question is “${SCENARIO.user}” Watch which lines light up, and what piles onto the platform.`,
    body: <FindYourself />
  },
  name: {
    definition: 'A large language model (LLM) guesses the next word piece, adds it, and guesses again. Your prompt is what you typed. The context is everything it reads, including what the app added.',
    terms: ['large language model', 'prompt', 'context'],
    picture: <ContextBar />,
    metaphor: 'The train is the whole context, riding the line once for every new piece of the answer.',
    breaks: 'Nothing travels. It’s one calculation, run again for each new piece.'
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
          { text: 'Your two words', why: `They're a sliver, like your ${runCounts.question} of ${runCounts.total} pieces here.` },
          { text: 'The reading’s text', correct: true, why: 'Attached and fetched text usually dwarfs what you type.' },
          { text: 'A summary prepared in advance', why: 'Nothing is prepared. The summary is written one piece per trip.' }
        ]
      }
    ],
    art: null,
    receipt: { text: 'Your question and your recipe card left your device. The provider’s policy decides who keeps them, and for how long.', column: 'data' }
  }
}
