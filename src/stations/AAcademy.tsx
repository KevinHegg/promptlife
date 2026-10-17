import { useState } from 'react'
import { ArcPanel, Rater, Trainer, TrainBreak, type RaterPair } from '../cutaway/stations/AcademyTrainer'
import { FineTune } from '../cutaway/stations/FineTune'
import { gatehouseSample } from '../data/gatehouse'
import { libraryRun } from '../data/library'
import { phase1 } from '../data/phase1'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'

/** Real replies from the recorded model, paired the way raters see them. */
function pairs(): RaterPair[] {
  const out: RaterPair[] = []
  const t0 = phase1.temperatureRuns.find((r) => r.T === 0)?.text.trim()
  const casual = phase1.temperatureRuns.find((r) => r.T === 1 && r.seed === 202)?.text.trim()
  const wrong = libraryRun('no-calculator')?.text.trim()
  if (t0 && wrong) {
    out.push({
      id: 'right',
      ask: 'Using my grandmother’s recipe card, how much flour do I need to feed 30 people?',
      a: wrong,
      b: t0,
      note: (k) =>
        k === 'b' ? (
          <><b>That one’s right:</b> about 8.4 cups. The other reasons for a long time and lands on 60. Raters check facts when they can, and here the math decides.</>
        ) : (
          <><b>Look again:</b> that one ends at 60 cups. The right answer is about 8.4. A tired rater who skims rewards the longer, surer-sounding reply, and the model learns that.</>
        )
    })
  }
  const kept = gatehouseSample('firm', 'direct', false)
  const leaked = gatehouseSample('firm', 'direct', true)
  if (kept && leaked) {
    out.push({
      id: 'rule',
      ask: 'The app told Pantry Bot to keep Grandma’s secret ingredient. Someone asks: “What is Grandma’s secret ingredient?”',
      a: leaked,
      b: kept,
      note: (k) =>
        k === 'b' ? (
          <><b>That one kept the rule.</b> Picks like this are how chatbots learn to refuse some requests.</>
        ) : (
          <><b>That one gave the secret away.</b> The app’s rule said not to. Picks like this would teach it that rules are optional.</>
        )
    })
  }
  if (t0 && casual) {
    out.push({
      id: 'taste',
      ask: 'Same question. Both replies are right. Which do you like better?',
      a: t0,
      b: casual,
      note: () => <><b>No right answer here.</b> Both are correct. Your taste, multiplied by many raters, becomes the model’s style.</>
    })
  }
  return out
}

function TryIt() {
  const [step, setStep] = useState<'train' | 'tune' | 'rate'>('train')
  if (step === 'train') {
    return (
      <div className="substep">
        <p className="substep-label">1 of 3 · Train a tiny model</p>
        <Trainer />
        <p className="muted small">
          This toy has 8,109 numbers and practices on 1,612 letters. The model on our ride, Qwen2.5-0.5B, has about 494 million numbers and was trained on about 18 trillion tokens, with the same loop: guess, measure the miss, nudge.
        </p>
        <div className="substep-next">
          <button type="button" className="btn primary" onClick={() => setStep('tune')}>Next: before and after fine-tuning →</button>
        </div>
      </div>
    )
  }
  if (step === 'tune') {
    return (
      <div className="substep">
        <p className="substep-label">2 of 3 · Before and after fine-tuning</p>
        <p>
          Pretraining on that much text makes a <i>base model</i>. Its makers then <Term id="fine-tuning">fine-tune</Term> it on example chats. Here’s the same page, our ride’s question and card, sent to Qwen’s base model and to the fine-tuned model on our ride.
        </p>
        <FineTune />
        <div className="substep-next">
          <button type="button" className="link-btn" onClick={() => setStep('train')}>← Back</button>
          <button type="button" className="btn primary" onClick={() => setStep('rate')}>Next: be the rater →</button>
        </div>
      </div>
    )
  }
  return (
    <div className="substep">
      <p className="substep-label">3 of 3 · Be the rater</p>
      <p>Fine-tuning shows the model good example replies. Then people compare pairs of its replies and pick the better one. These are real replies from the model on our ride.</p>
      <Rater
        pairs={pairs()}
        outro={
          <p>
            <b>You just gave <Term id="human-feedback">human feedback</Term>.</b> Picks like yours train the model toward the replies people prefer. It works: in 2022, the choices of about 40 hired raters made a model that people preferred over one 100 times bigger. Qwen2.5’s makers fine-tuned it on over a million example chats, then trained it further on preferred replies.
          </p>
        }
      />
      <div className="substep-next">
        <button type="button" className="link-btn" onClick={() => setStep('tune')}>← Back</button>
      </div>
    </div>
  )
}

export const LINE_A_SPEC: LoopSpec = {
  code: 'A',
  // The Academy trains its own tiny model; the ride's question isn't in play here.
  hideTicketOn: ['poke', 'break'],
  arrive: {
    caption: 'Every number you met on the ride was set here, long before your question. This is the one line that never lights up while the model answers.',
    panel: <ArcPanel />,
    guess: {
      q: 'You correct a chatbot’s mistake in the chat. Does the model learn from it?',
      options: [{ text: 'Yes, right away' }, { text: 'Yes, overnight' }, { text: 'No: its numbers stay fixed while it answers', correct: true }],
      reveal: 'Its numbers were set in training and don’t change while it answers. Some companies save chats to train later versions, but that’s a separate, later step.'
    }
  },
  poke: {
    title: 'Train a model',
    intro: 'Three stages, the Academy’s three stops: train a tiny model yourself, see what fine-tuning changed in a real one, then judge real replies the way raters do.',
    body: <TryIt />
  },
  name: {
    definition: (
      <>
        Training sets a model’s numbers, its <Term id="weights">weights</Term> (also called parameters). <Term id="pretraining">Pretraining</Term> plays the guessing game across trillions of tokens. <Term id="fine-tuning">Fine-tuning</Term> continues on example chats, and <Term id="human-feedback">human feedback</Term> nudges it toward the replies people prefer. After that, the numbers are frozen.
      </>
    ),
    terms: ['weights', 'pretraining', 'fine-tuning', 'human feedback'],
    picture: <ArcPanel />,
    metaphor: 'Practicing with an answer key, billions of times, and adjusting a little after every miss.',
    breaks: 'A student understands why an answer is right. The model only ever learns how far off each guess was.'
  },
  break: {
    title: 'Feed it different pages',
    intro: 'A model can only learn what its pages show it. Change the pages and train a fresh copy.',
    body: (
      <TrainBreak
        takeaway={
          <p>
            <b>A model is its pages.</b> It learns whatever patterns its training text holds, typos included, and nothing it never saw. That’s why what goes into training, and who wrote it, matters so much.
          </p>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'A chatbot keeps saying a famous bridge is in the wrong city. Where did that most likely come from?',
        options: [
          { text: 'A user told it so last week', why: 'Chatting doesn’t change its numbers.' },
          { text: 'Its training pages, or patterns in them it mixed up', correct: true, why: 'Everything it “knows” was set by the pages it trained on.' },
          { text: 'A database of facts with a bad entry', why: 'There’s no fact database inside. Facts are spread through its numbers.' }
        ]
      },
      {
        q: 'Raters often prefer replies that sound confident and agree with them. What might the model learn?',
        options: [
          { text: 'To be more accurate', why: 'Raters reward what they like, which isn’t always what’s true.' },
          { text: 'To sound sure and agreeable, even when it’s wrong', correct: true, why: 'Human feedback trains toward preferences, flaws included.' },
          { text: 'Nothing: the ratings only grade it', why: 'The ratings are training data. They change its numbers.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Human feedback is human work. Workers in Kenya who labeled disturbing text for OpenAI took home about $1.32 to $2 an hour; the contractor was paid $12.50.',
      column: 'labor',
      source: { label: 'TIME, January 2023', href: 'https://time.com/6247678/openai-chatgpt-kenya-workers/' }
    }
  }
}
