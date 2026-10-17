import { ThinkView, TokenBars } from '../cutaway/stations/Scratchpad'
import { thinkRuns, thinkStats } from '../data/scratchpad'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'
import { TextBreak, type TextBreakOption } from './TextBreak'

/** A page of scratch work: many gray lines of working, one dark line of answer. */
function ScratchPanel() {
  return (
    <svg className="arrive-art" viewBox="0 0 320 190" role="img" aria-label="A page of scratch work: many lines of working, then one short answer.">
      <rect x="70" y="10" width="180" height="170" rx="8" className="art-fill-soft" stroke="var(--ink)" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M88,${30 + i * 13} H${150 + ((i * 37) % 80)}`} stroke="var(--ink-2)" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      ))}
      <path d="M88,160 H190" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
      <text x="262" y="80" className="art-text sm">working</text>
      <text x="262" y="164" className="art-text sm">answer</text>
    </svg>
  )
}

const LABELS: Record<string, string> = { on: 'Full thinking', 'budget-256': 'Cut at 256', 'budget-64': 'Cut at 64', off: 'No thinking' }
const EXPLAIN: Record<string, string> = {
  on: 'Nothing. It thinks as long as it likes before answering.',
  'budget-256': 'We stopped its thinking after 256 tokens, wrote “end of thinking” for it, and let it answer.',
  'budget-64': 'We stopped its thinking after 64 tokens, about two sentences, and let it answer.',
  off: 'Thinking switched off: it answers straight away.'
}

function options(verdicts: Record<string, string>): TextBreakOption[] {
  return ['on', 'budget-256', 'budget-64', 'off'].flatMap((c) => {
    const r = thinkRuns(c).find((x) => x.seed === 0)
    const s = thinkStats(c)
    if (!r) return []
    return [{
      id: c,
      label: LABELS[c],
      explain: EXPLAIN[c],
      text: r.answer,
      stoppedNaturally: r.stoppedNaturally,
      verdict: verdicts[c],
      tiles: [
        { label: 'Right answers', value: `${s.correct} of ${s.runs}` },
        { label: 'Tokens per answer', value: s.meanTokens.toLocaleString('en-US'), note: 'on average, working included' }
      ],
      extra: r.thinking ? <p className="muted small">The first of its 10 runs. It thought for {r.thinkingTokens} tokens first: “{r.thinking.slice(0, 220).trim()}…”</p> : <p className="muted small">The first of its 10 runs.</p>
    }]
  })
}

export const LINE_S_SPEC: LoopSpec = {
  code: 'S',
  // A different model answers here, so the ride's ticket would name the wrong one.
  hideTicketOn: ['poke', 'break'],
  arrive: {
    caption: 'Some newer models write out their working before they answer. Every word of that working rides the same loop as the answer, one trip per token.',
    panel: <ScratchPanel />,
    guess: {
      q: 'When a model “thinks” before answering, what is the thinking made of?',
      options: [{ text: 'A separate reasoning engine' }, { text: 'Silent math you never see' }, { text: 'More tokens, written one per trip', correct: true }],
      reveal: 'More tokens. Thinking is the model writing to itself, one token per trip, before it writes the answer. Every word costs a trip.'
    }
  },
  poke: {
    title: 'Thinking on, thinking off',
    intro: 'A small model with a thinking switch answered our question ten times each way. Compare how often it was right, and how much it wrote.',
    body: <ThinkView />
  },
  name: {
    definition: (
      <>
        A <Term id="reasoning-model">reasoning model</Term> is trained to write out its working, called thinking tokens, before the answer. The working lands in the context, so later trips can use it. It often helps, and it always costs: every thinking token is one more trip.
      </>
    ),
    terms: ['reasoning model', 'token cost'],
    picture: <TokenBars />,
    metaphor: 'Scratch paper: working the problem out on the page before writing the answer.',
    breaks: 'A person’s scratch paper shows how they got there. A model’s working isn’t guaranteed to: one run that ended at the right 8.4375 cups also wrote “8 15/16,” a wrong conversion, right beside it.'
  },
  break: {
    title: 'Cut the thinking short',
    intro: 'Thinking is expensive, so apps sometimes cap it. What happens to the answer when the working is cut off?',
    body: (
      <TextBreak
        options={options({
          on: `Its best: ${thinkStats('on').correct} of 10 right, after about ${thinkStats('on').meanThinking.toLocaleString('en-US')} tokens of working each time.`,
          'budget-256': `${thinkStats('budget-256').correct} of 10 right. In 9 of 10 runs its working was still going when we cut it.`,
          'budget-64': `${thinkStats('budget-64').correct} of 10 right, and the working moved into the answer: ${thinkStats('budget-64').cutOff} of 10 answers ran past our 400-token limit.`,
          off: `${thinkStats('off').correct} of 10 right, in about ${thinkStats('off').meanTokens} tokens each.`
        })}
        takeaway={
          <p>
            <b>Thinking buys accuracy with tokens.</b> This small model went from 0 to 3 right out of 10, at about 13 times the tokens. Cut the thinking short and most of the gain goes. Bigger reasoning models do much better, at the same kind of cost: every thinking token is a trip, and apps bill for them.
          </p>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'A reasoning model takes 30 seconds, then gives a great answer. What happened in those 30 seconds?',
        options: [
          { text: 'It ran a separate, more careful program', why: 'Same model, same loop. It wrote more tokens first.' },
          { text: 'It wrote hundreds or thousands of thinking tokens, one trip each', correct: true, why: 'Thinking is more tokens, each one a trip.' },
          { text: 'It learned more about your question', why: 'Its numbers never change while it answers.' }
        ]
      },
      {
        q: 'An app hides a model’s thinking and shows only the answer. Why might that matter to you?',
        options: [
          { text: 'It doesn’t: hidden tokens are free', why: 'Thinking tokens are usually billed like the answer.' },
          { text: 'You may pay for tokens you never see, and can’t check the working', correct: true, why: 'And even visible working isn’t guaranteed to be how it got the answer.' },
          { text: 'Hidden thinking is always wrong', why: 'It often helps. It just isn’t guaranteed to be faithful.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Reasoning mode can take about 7.6 Wh of electricity per request, against about 0.3 Wh for a plain answer from a large model (AI chips only).',
      column: 'energy',
      source: { label: 'IEA, April 2026', href: 'https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf' }
    }
  }
}
