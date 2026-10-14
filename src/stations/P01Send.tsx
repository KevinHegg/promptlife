import { useState } from 'react'
import type { Src } from '../data/heroRun'
import { runCounts } from '../data/run'
import { SCENARIO } from '../data/heroRun'
import type { LoopSpec } from '../loop/types'
import { LiveRun } from '../map/LiveRun'
import type { PlatformToken } from '../map/runEngine'
import { ContextBar } from './parts'

const SRC_NAMES: Record<Src, string> = {
  special: 'a role marker the app adds',
  sys: 'part of the system prompt or the calculator’s description, which the app adds',
  rag: 'a passage the app fetched from your course files',
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
          <p>Watch the ride. Then tap the part of the platform that you typed.</p>
          {found ? (
            <p className="reveal"><b>That's you.</b> {runCounts.question} of {runCounts.total} tokens. Everything else came from the app or from the model.</p>
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
      <rect x="112" y="34" width="96" height="58" rx="10" className="art-fill-soft" />
      <text x="118" y="52" className="art-text">Using my syllabus,</text>
      <text x="118" y="65" className="art-text">what do I need on</text>
      <text x="118" y="78" className="art-text">the final to get an A-?</text>
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
    caption: 'This is your question about your grade. Tap Next and ride along with it, all the way to the answer.',
    panel: <SendPanel />
  },
  bet: {
    question: 'To write its answer, how many times does the model run?',
    options: [{ text: 'Once, for the whole answer' }, { text: 'Once per sentence' }, { text: 'Once per word-sized piece', correct: true }],
    reveal: `Once per piece. This answer took ${runCounts.trips} trips, including ${runCounts.toolTrips} for a calculator request you never see in a chat window.`
  },
  poke: {
    title: 'Ride along',
    intro: `The question is “${SCENARIO.user}” Watch which lines light up and what piles onto the platform.`,
    body: <FindYourself />
  },
  name: {
    definition: 'A large language model (LLM) scores every possible next piece of text given its context, picks one, and repeats. Your prompt is what you typed; the context is everything it reads, including what the app added.',
    terms: ['large language model', 'prompt', 'context'],
    picture: <ContextBar />,
    metaphor: 'The train is the whole context, riding the line once for every new piece of the answer.',
    breaks: 'Nothing travels. It’s one calculation, run again for each new piece.'
  },
  stamp: {
    questions: [
      {
        q: 'A friend says the chatbot “remembered your syllabus.” What actually put it in front of the model?',
        options: [
          { text: 'It memorized it in training', why: 'Your syllabus was never in its training text.' },
          { text: 'The app searched your files and pasted passages into the context', correct: true, why: 'Retrieval happens in the app, before the model reads anything.' },
          { text: 'The model searched your files itself', why: 'The model only writes text. The app does the searching.' }
        ]
      },
      {
        q: 'You type “Summarize this” and attach a 30-page reading. What fills most of the context?',
        options: [
          { text: 'Your two words', why: `They're a sliver, like your ${runCounts.question} of ${runCounts.total} here.` },
          { text: 'The reading’s text', correct: true, why: 'Attached and fetched text usually dwarfs what you type.' },
          { text: 'A summary prepared in advance', why: 'Nothing is prepared. The summary is written one piece per trip.' }
        ]
      }
    ],
    art: null,
    receipt: { text: 'Your question, syllabus and gradebook left your device. The provider’s policy decides who keeps them, and for how long.', column: 'data' }
  }
}
