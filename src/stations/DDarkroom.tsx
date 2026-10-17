import { useState } from 'react'
import { DevelopStrip, DiffusionBreak, DiffusionView, PatchCard, PatchView } from '../cutaway/stations/Darkroom'
import { patchSizes } from '../data/darkroom'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'

function CardPanel() {
  const s = patchSizes().find((x) => x.width === 300)
  return s ? (
    <figure className="arc-fig">
      <PatchCard s={s} />
      <figcaption className="muted small">Grandma’s card as a picture, cut into the squares a vision model reads.</figcaption>
    </figure>
  ) : null
}

function TryIt() {
  const [step, setStep] = useState<'patches' | 'noise'>('patches')
  if (step === 'patches') {
    return (
      <div className="substep">
        <p className="substep-label">1 of 2 · A picture becomes tokens</p>
        <PatchView />
        <div className="substep-next">
          <button type="button" className="btn primary" onClick={() => setStep('noise')}>Next: a picture from noise →</button>
        </div>
      </div>
    )
  }
  return (
    <div className="substep">
      <p className="substep-label">2 of 2 · A picture from noise</p>
      <p>Making pictures is often a different machine. A <Term id="diffusion">diffusion</Term> model starts from random noise and removes a little at each step, steered by your words.</p>
      <DiffusionView />
      <div className="substep-next">
        <button type="button" className="link-btn" onClick={() => setStep('patches')}>← Back to the card</button>
      </div>
    </div>
  )
}

export const LINE_D_SPEC: LoopSpec = {
  code: 'D',
  // Different models answer here, so the ride's ticket would name the wrong one.
  hideTicketOn: ['poke', 'break'],
  arrive: {
    caption: 'Chatbots can read pictures too. A photo becomes tokens, square by square, and rides the same line as your words.',
    panel: <CardPanel />,
    guess: {
      q: 'Grandma’s card, typed out, is 72 tokens. As a clear picture, about how many tokens does a vision model read?',
      options: [{ text: 'About the same' }, { text: 'Fewer: a picture is one token' }, { text: 'Over ten times as many', correct: true }],
      reveal: 'Over ten times: 860 tokens for a clear picture of the card. Shrink the picture and it costs fewer tokens, but the model starts misreading it.'
    }
  },
  poke: {
    title: 'Read a picture, make a picture',
    intro: 'First, see how a small vision model reads Grandma’s card at four sizes. Then watch an image generator turn noise into biscuits.',
    body: <TryIt />
  },
  name: {
    definition: (
      <>
        A <Term id="multimodal">multimodal</Term> model reads more than text: it cuts a picture into small squares and turns each into a list of numbers, like a token. Making pictures is often a different machine: <Term id="diffusion">diffusion</Term> starts from noise and removes it step by step, steered by words.
      </>
    ),
    terms: ['multimodal', 'diffusion'],
    picture: <DevelopStrip />,
    metaphor: 'A darkroom: the picture develops out of blank paper, a little more each moment.',
    breaks: 'In a darkroom the photo was already taken. Here nothing was there: the picture is invented from noise, steered by words.'
  },
  break: {
    title: 'Take away the words',
    intro: 'What does the steering do? Stop early, change the noise, or take the words away.',
    body: (
      <DiffusionBreak
        takeaway={
          <p>
            <b>The noise decides the details; the words steer.</b> Same words with different noise made a different picture, and no words made something unrelated. Nothing is copied from a stored photo, though a model can still reproduce images it saw many times in training.
          </p>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'You attach a photo of a page instead of typing its words. What changes?',
        options: [
          { text: 'It’s cheaper: a picture is one token', why: 'The clear card was 860 tokens, against 72 as text.' },
          { text: 'It usually costs many more tokens, and fine print can be misread', correct: true, why: 'Shrunk to 10 tokens, “Buttermilk” became “Butterly.”' },
          { text: 'The model sees it exactly as you do', why: 'It reads squares turned into numbers, and can invent what it can’t make out.' }
        ]
      },
      {
        q: 'An image generator makes a picture of biscuits. Where did the picture come from?',
        options: [
          { text: 'A stored photo of biscuits, pasted in', why: 'Same words with different noise made a different picture.' },
          { text: 'Random noise, cleaned up step by step, steered by the words', correct: true, why: 'Step 0 is pure noise; the biscuits appear in the later steps.' },
          { text: 'A web search for biscuit photos', why: 'Nothing is searched. It starts from noise.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Stable Diffusion 1.5 learned from LAION-2B, about two billion captioned images gathered from the web. Its makers note it can reproduce images that appear many times in that data.',
      column: 'data',
      source: { label: 'Stable Diffusion v1.5 model card', href: 'https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5' }
    }
  }
}
