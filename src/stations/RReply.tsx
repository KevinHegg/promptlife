import { AgentCases, BalancePanel, BigQuestions, CostView, Horizon, Ledger, WorthIt } from '../cutaway/stations/EndOfLine'
import { useState } from 'react'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'
import { Reveal } from './parts'

function TryIt() {
  const [step, setStep] = useState<'cost' | 'worth'>('cost')
  if (step === 'cost') {
    return (
      <div className="substep">
        <p className="substep-label">1 of 2 · What one answer costs</p>
        <CostView />
        <Reveal label="See every receipt from the line, sorted">
          <Ledger />
        </Reveal>
        <div className="substep-next">
          <button type="button" className="btn primary" onClick={() => setStep('worth')}>Next: is it worth it? →</button>
        </div>
      </div>
    )
  }
  return (
    <div className="substep">
      <p className="substep-label">2 of 2 · Is it worth it?</p>
      <WorthIt />
      <div className="substep-next">
        <button type="button" className="link-btn" onClick={() => setStep('cost')}>← Back to the costs</button>
      </div>
    </div>
  )
}

export const LINE_R_SPEC: LoopSpec = {
  code: 'R',
  hideTicketOn: ['break'],
  arrive: {
    caption: 'End of the line. You followed one question all the way through. Now step back: what did the answer cost, who paid, and what comes next?',
    panel: <BalancePanel />,
    guess: {
      q: 'Google measured the electricity for one short chatbot answer. About how much was it?',
      options: [{ text: 'A few seconds of TV', correct: true }, { text: 'A full phone charge' }, { text: 'A home’s electricity for a day' }],
      reveal: 'About 0.24 Wh: under nine seconds of TV, by Google’s own measurement. Tiny for one answer. But there are billions of answers, and some kinds of requests use thousands of times more.'
    }
  },
  poke: {
    title: 'Weigh one answer',
    intro: 'Every answer is a trade. First see what requests cost, then weigh four uses of AI yourself.',
    body: <TryIt />
  },
  name: {
    definition: (
      <>
        A cost-benefit analysis sets what you get against what it costs: electricity, people’s work and words, and trust. Some costs, like dignity or truth, don’t fit in a column. That’s where ethics comes in, along with the big open questions: <Term id="alignment">alignment</Term>, making AI do what we intend, and <Term id="recursive-self-improvement">recursive self-improvement</Term>, AI that helps build better AI.
      </>
    ),
    terms: ['alignment', 'recursive self-improvement', 'agent'],
    picture: <BigQuestions />,
    metaphor: 'A receipt and a conscience: one adds up the costs, the other asks whether you should buy at all.',
    breaks: 'A receipt has a total. Many of these costs fall on other people, and nobody can add them up exactly.'
  },
  break: {
    title: 'When agents go wrong',
    intro: 'Our ride made one calculator request. An agent makes thousands, with real access. Here’s what happened when agents were tested, and once for real.',
    body: (
      <AgentCases
        takeaway={
          <p>
            <b>An agent can do whatever its tools allow.</b> The Gatehouse’s lessons apply at a larger scale: give it the least access it needs, have a person approve risky steps, and keep records someone actually reads. Tests help, but models increasingly notice when they’re being tested.
          </p>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'One short answer takes about 0.24 Wh. Why can AI’s electricity still be a big deal?',
        options: [
          { text: 'It isn’t: each answer is tiny', why: 'Tiny times billions adds up, and reasoning and agents use far more per request.' },
          { text: 'Billions of requests, and reasoning and agent tasks that use far more', correct: true, why: 'Data centers used about 485 TWh in 2025, and the IEA projects about twice that by 2030.' },
          { text: 'Each answer retrains the model', why: 'Answering changes 0 numbers. Training is a separate, earlier cost.' }
        ]
      },
      {
        q: 'An AI agent can read your email and send messages for you. Which safeguard matters most?',
        options: [
          { text: 'Firm instructions to behave', why: 'In the Gatehouse, stronger wording helped, but a poem still got the secret out every time.' },
          { text: 'Least access, and asking you before it sends anything', correct: true, why: 'Limits outside the model hold even when its words don’t.' },
          { text: 'The most capable model available', why: 'More capable isn’t safer: the agents that broke out in 2026 were frontier models.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Data centers used about 485 TWh of electricity in 2025. The IEA projects about 950 TWh by 2030, roughly 3% of the world’s electricity.',
      column: 'energy',
      source: { label: 'IEA, April 2026', href: 'https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf' }
    }
  },
  bonus: { label: 'Next stops: what’s on the horizon', body: <Horizon /> }
}
