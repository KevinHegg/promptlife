import { WorkshopBench } from '../cutaway/stations/WorkshopBench'
import { SCENARIO } from '../data/heroRun'
import { libraryRun } from '../data/library'
import { phase2 } from '../data/phase2'
import type { LoopSpec } from '../loop/types'
import { TERM_PICTURES } from '../ui/TermPictures'
import { TextBreak, type TextBreakOption } from './TextBreak'

/** The request leaves the model, the app's calculator runs it, the answer comes back. */
function BenchPanel() {
  return <div className="bench-panel" role="img" aria-label="The model writes a request; the app’s calculator runs it; the answer comes back.">{TERM_PICTURES['tool-call']}</div>
}

function workshopOptions(verdicts: Record<string, string>): TextBreakOption[] {
  const normal = phase2?.breaks.find((b) => b.id === 'normal')
  const own = libraryRun('own-request')
  const none = libraryRun('no-calculator')
  const opts: TextBreakOption[] = []
  if (normal) {
    opts.push({
      id: 'normal',
      label: 'Normal',
      explain: <>The app runs the right request, {SCENARIO.toolExpression}, and pastes back {SCENARIO.toolResult}.</>,
      text: normal.text,
      stoppedNaturally: normal.stoppedNaturally,
      verdict: verdicts.normal
    })
  }
  if (own) {
    opts.push({
      id: 'own',
      label: 'Run its own request',
      explain: <>Left alone, this model asked the calculator for {own.toolRequest ?? '30 * 6'}. The app runs exactly that and pastes back {own.toolResult ?? '180'}.</>,
      text: own.text,
      stoppedNaturally: own.stoppedNaturally,
      verdict: verdicts.own
    })
  }
  if (none) {
    opts.push({
      id: 'none',
      label: 'No calculator',
      explain: 'The app offers no calculator. The model has to do the arithmetic itself, in words.',
      text: none.text,
      stoppedNaturally: none.stoppedNaturally,
      verdict: verdicts.none
    })
  }
  return opts
}

export const LINE_W_SPEC: LoopSpec = {
  code: 'W',
  arrive: {
    caption: 'The model can’t run a calculator. It writes a request, the app runs it, and the answer is pasted back in.',
    panel: <BenchPanel />,
    guess: {
      q: `Who actually works out ${SCENARIO.toolExpression}?`,
      options: [{ text: 'The model, in its head' }, { text: 'The app’s calculator', correct: true }, { text: 'The tokenizer' }],
      reveal: 'The app’s calculator. The model only writes the request, as text, and then copies the answer.'
    }
  },
  poke: {
    title: 'Run the calculator',
    intro: 'Follow the request from the model to the calculator and back.',
    body: <WorkshopBench />
  },
  name: {
    definition: 'A tool call is text the model writes, in a format it learned, asking the app to run a tool. The app runs it and pastes the result back in as text; the model never runs anything itself.',
    terms: ['tool call', 'context'],
    picture: <BenchPanel />,
    metaphor: 'Passing a note to a clerk: you write the request, and the clerk does the work.',
    breaks: 'A clerk might question a strange request. The app runs whatever the model writes.'
  },
  break: {
    title: 'Trust the calculator?',
    intro: 'The calculator is always right. Is the answer? Change who writes the sum, or take the calculator away.',
    body: <TextBreak options={workshopOptions({
      normal: 'Right: 8.4375 cups of flour, copied from the calculator.',
      own: 'Perfect math on the wrong problem: 30 × 6 is 180, so the reply says 180 cups of flour, just as sure as before.',
      none: 'Without a calculator it reasons in words and goes wrong: it misreads the card, then concludes 60 cups. The right answer is about 8.4.'
    })} takeaway={<p><b>A tool is only as good as the request.</b> The calculator never makes a mistake, but it computes whatever the model asks, right question or not.</p>} />
  },
  stamp: {
    questions: [
      {
        q: 'A chatbot says “I used the calculator: you need 22.5 cups.” What should you check first?',
        options: [
          { text: 'The calculator’s arithmetic', why: 'The calculator is exact. The question it was asked may not be.' },
          { text: 'Whether it asked the calculator the right question', correct: true, why: 'A perfect calculator can solve the wrong problem.' },
          { text: 'Nothing: tools make answers correct', why: 'Tools do exactly what they’re asked, right or wrong.' }
        ]
      },
      {
        q: 'Which job is a tool better at than pasting in the top K chunks?',
        options: [
          { text: 'Finding the one passage that answers a question', why: 'Retrieval does that well.' },
          { text: 'Counting or adding across every one of your files', correct: true, why: 'A tool can read everything; top K sees a few chunks.' },
          { text: 'Writing a friendly reply', why: 'That’s the model’s job.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'A tool runs with the app’s permissions. What it may read, change or send is decided by the people who built the app.',
      column: 'accountability'
    }
  }
}
