import { LoopLevels, replySteps, WINDOW } from '../cutaway/stations/LoopLevels'
import { stationByCode } from '../data/network'
import { pct, phase2 } from '../data/phase2'
import { runCounts } from '../data/run'
import { trace } from '../data/trace'
import type { LoopSpec } from '../loop/types'
import { RunBreak } from './RunBreak'

const station = stationByCode('P07')!
const total = trace?.steps.length ?? runCounts.trips
const read = trace?.tokens.length ?? runCounts.total
const flourOdds = trace?.steps.find((s) => s.chosen.text === ' flour')?.chosen.prob ?? 0.999

/** The new token boards at The Vote and loops back to Embedding, skipping the Tokenizer; the trip counter flips. */
function LoopPanel() {
  const stops = [
    { x: 30, name: 'Tokenizer' },
    { x: 92, name: 'Embedding' },
    { x: 154, name: 'Attention' },
    { x: 216, name: 'The Stack' },
    { x: 278, name: 'The Vote' }
  ]
  const steps = replySteps()
  const n = trace ? trace.steps.length - steps.length + 1 : 30
  return (
    <svg className="arrive-art" viewBox="0 10 320 150" role="img" aria-label="A new token boards at The Vote and loops back to Embedding, skipping the Tokenizer, while the trip counter goes up by one.">
      <path d="M30,100 H290" className="art-line" strokeWidth="5" opacity="0.5" />
      <path d="M278,90 C278,38 92,38 92,88" className="art-line" fill="none" strokeWidth="2.5" strokeDasharray="5 4" />
      <path d="M86,80 L92,90 L98,80" className="art-line" fill="none" strokeWidth="2.5" />
      {stops.map((s, i) => (
        <g key={s.name} opacity={i === 0 ? 0.4 : 1}>
          <circle cx={s.x} cy="100" r="7" className="art-fill-soft" stroke="var(--ink)" strokeWidth="2" />
          <text x={s.x} y="124" textAnchor="middle" className="art-text sm">{s.name}</text>
        </g>
      ))}
      <g className="cut-chip" style={{ animationDelay: '0.3s' }}>
        <rect x="160" y="26" width="40" height="22" rx="5" className="art-accent" />
        <text x="180" y="41" textAnchor="middle" className="art-tag big">8</text>
      </g>
      <rect x="236" y="134" width="78" height="22" rx="4" className="art-fill-soft" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="275" y="149" textAnchor="middle" className="art-text">TRIP {n}→{n + 1}</text>
      <text x="8" y="149" className="art-text sm" opacity="0.7">skipped: it’s already a number</text>
    </svg>
  )
}

/** How much of the window this run used: a long gauge with a sliver filled. */
function WindowGauge() {
  return (
    <div className="window-gauge">
      <p><b>{read.toLocaleString()}</b> of {WINDOW.toLocaleString()} tokens</p>
      <span className="sg-track"><span style={{ width: `${Math.max(0.8, (read / WINDOW) * 100)}%` }} /></span>
      <p className="muted small">This whole run, card and calculator included, used about {Math.round((read / WINDOW) * 1000) / 10}% of the recorded model’s window, in {total} trips.</p>
    </div>
  )
}

export const P07_SPEC: LoopSpec = {
  code: 'P07',
  arrive: {
    caption: 'The new token joins the context, and the whole trip runs again for the next one.',
    panel: <LoopPanel />,
    guess: {
      q: 'When the new token loops back, where does it get back on?',
      options: [{ text: 'The Tokenizer: it’s text again' }, { text: 'Embedding: it’s already a number', correct: true }, { text: 'The Vote: just vote again' }],
      reveal: 'At Embedding. The model wrote a token ID, so there’s nothing to cut. Text from outside, like the calculator’s answer, still goes through the Tokenizer.'
    }
  },
  poke: {
    title: 'Step the reply',
    intro: 'Run the reply one trip at a time and watch the context grow.',
    body: <LoopLevels station={station} />
  },
  name: {
    definition: `The model writes one token, adds it to what it reads, and runs again for the next. The context window is the most it can read at once: ${WINDOW.toLocaleString()} tokens for the recorded model.`,
    terms: ['autoregressive generation', 'context window', 'stop token', 'KV cache'],
    picture: <WindowGauge />,
    metaphor: 'Writing a sentence where you reread everything so far before each new word.',
    breaks: 'Real systems save each earlier token’s work, so later trips handle only the new token.'
  },
  break: {
    title: 'Shrink the window',
    intro: 'Why does the window matter? When a chat outgrows it, the app cuts the oldest parts. Cut more and more, and see what the reply can still use.',
    body: (
      <RunBreak
        station="P07"
        ids={['trim-card', 'trim-question', 'trim-to-result']}
        labels={{ 'trim-card': 'Cut the card', 'trim-question': 'Cut the question too', 'trim-to-result': 'Only the answer left' }}
        tiles={(run) => [
          {
            label: 'Odds of “flour” after “cups of”',
            value: pct(run.wordProb?.prob ?? flourOdds),
            note: run.id === 'normal' ? 'it knows what the number is for' : `normally ${pct(flourOdds)}; top pick “${(run.wordProb?.top[0]?.text ?? '').trim()}”`
          },
          {
            label: 'Tokens it could still see',
            value: String(run.keptTokens ?? phase2?.contextLength ?? read),
            note: run.id === 'normal' ? 'the whole conversation' : `of ${phase2?.contextLength ?? read}`
          }
        ]}
        explains={{
          normal: 'Nothing. The whole conversation fits in the window.',
          'trim-card': 'The app cut the recipe card and the calculator’s instructions. The hidden instructions stay pinned, as most apps do.',
          'trim-question': 'The card and your question are cut. The model still sees its own calculator request and the answer.',
          'trim-to-result': 'Everything is cut except the hidden instructions and the calculator’s answer, 8.4375.'
        }}
        verdicts={{
          normal: 'Right: 8.4375 cups of flour.',
          'trim-card': 'No change. The calculator’s answer is still there, so by now the card isn’t needed.',
          'trim-question': 'Still smooth and sure, but now it’s about an expression, not flour: without your question it doesn’t know what the number is for.',
          'trim-to-result': 'It sees only a number and calls it “a decimal number.” Everything that gave 8.4375 its meaning is gone.'
        }}
        takeaway={<p><b>That’s why the window matters.</b> The model can only use what’s still in its context. Cut your question and it still answers fluently, about something it can no longer see, and sounds just as sure.</p>}
      />
    )
  },
  stamp: {
    questions: [
      {
        q: '300 messages into a chat, the bot forgets you said you’re vegetarian. The app trims old messages. What helps most?',
        options: [
          { text: 'Tell it to try harder to remember', why: 'Words can’t bring back tokens that were cut from the context.' },
          { text: 'Wait a day for it to learn', why: 'It never learns from your chats.' },
          { text: 'Say it again in a recent message', correct: true, why: 'Then it’s back in the context, where the model can use it.' }
        ]
      },
      {
        q: 'A reply is 200 tokens long. How many trips did it take?',
        options: [
          { text: '1: replies come out whole', why: 'One token per trip.' },
          { text: '200: one per new token', correct: true, why: 'Each trip writes exactly one token.' },
          { text: '200 plus the length of your question', why: 'Your question rides along, all at once, on the first trip.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: `${total} trips for one answer. Long replies, thinking and tool use multiply trips, and each trip uses electricity.`,
      column: 'energy',
      source: { label: 'Luccioni, Jernite & Strubell, 2024', href: 'https://arxiv.org/abs/2311.16863' }
    }
  }
}

