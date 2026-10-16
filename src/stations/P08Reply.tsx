import { ReplayLevels } from '../cutaway/stations/ReplayLevels'
import { SCENARIO } from '../data/heroRun'
import { STATIONS, stationByCode } from '../data/network'
import { pct, phase2 } from '../data/phase2'
import { runCounts } from '../data/run'
import { trace } from '../data/trace'
import type { LoopSpec } from '../loop/types'
import { allLoops } from './registry'
import { RunBreak } from './RunBreak'

const station = stationByCode('P08')!
const total = trace?.steps.length ?? runCounts.trips
const read = trace?.tokens.length ?? runCounts.total

/** The stop marker's normal odds right after the recorded reply. */
function stopOdds(): number {
  const recorded = (phase2 as unknown as { stopProb?: { prob: number } } | null)?.stopProb?.prob
  return recorded ?? trace?.steps[trace.steps.length - 1]?.chosen.prob ?? 0.97
}

/** The reply lands on the phone, and a receipt starts printing below it. */
function ReplyPanel() {
  return (
    <div className="reply-panel" role="img" aria-label={`The reply on a phone: ${SCENARIO.reply} A receipt starts printing below it.`}>
      <div className="rp-phone">
        <p className="rp-q">{SCENARIO.user}</p>
        <p className="rp-a">{SCENARIO.reply}</p>
      </div>
      <div className="rp-receipt cut-chip" style={{ animationDelay: '0.4s' }}>
        <span>{read} tokens read</span>
        <span>{total} trips</span>
        <span>0 weights changed</span>
      </div>
    </div>
  )
}

/** Every station's receipt line, printed together, with the run's totals. */
function Receipt() {
  const loops = allLoops()
  const rows = STATIONS.map((s) => ({ s, r: loops[s.code]?.stamp.receipt })).filter((x) => x.r)
  return (
    <figure className="receipt-paper">
      <p className="rcp-head">PROMPT LIFE · ONE ANSWER</p>
      <div className="rcp-counts">
        <span>tokens read <b>{read}</b></span>
        <span>trips <b>{total}</b></span>
        <span>weights changed <b>0</b></span>
      </div>
      <ol className="rcp-lines">
        {rows.map(({ s, r }) => (
          <li key={s.code}>
            <span className="rcp-col">{r!.column}</span>
            <span><b>{s.name}.</b> {r!.text}</span>
          </li>
        ))}
      </ol>
      <p className="rcp-foot">Thank you for riding.</p>
    </figure>
  )
}

export const P08_SPEC: LoopSpec = {
  code: 'P08',
  arrive: {
    caption: 'A stop token wins the vote, the loop ends, and you get your answer. Here’s what it took.',
    panel: <ReplyPanel />,
    guess: {
      q: 'Did answering your question change the model?',
      options: [{ text: 'Yes: it learned Grandma’s recipe' }, { text: 'A little: every chat trains it' }, { text: 'No: its numbers are exactly the same', correct: true }],
      reveal: 'Not one number changed. The Academy line, where training happens, stayed dark the whole ride. Some companies save chats to train future models, but that happens later, separately.'
    }
  },
  poke: {
    title: 'Replay the run',
    intro: 'Every trip, from the first token of the calculator request to the stop token.',
    body: <ReplayLevels station={station} />
  },
  name: {
    definition: 'Inference is using a trained model: fixed numbers, one token per trip, until a stop token. Fluent text comes out whether or not anything supports it, and false or unsupported text is a hallucination.',
    terms: ['inference', 'stop token', 'hallucination'],
    picture: <Receipt />,
    metaphor: 'A receipt for one answer: what it read, how many trips, and what it cost.',
    breaks: 'A receipt lists costs. It can’t tell you whether the answer was right.'
  },
  break: {
    title: 'Ban the stop token',
    intro: 'How does the model know when it’s done? It doesn’t, exactly: ending is one more token it learned to predict. Ban that token and see.',
    body: (
      <RunBreak
        station="P08"
        where="P06"
        ids={['no-stop']}
        labels={{ 'no-stop': 'Ban the stop token' }}
        explains={{
          normal: 'Nothing. The stop token can win the vote like any other token.',
          'no-stop': 'At The Vote, the stop token may never be picked, so the loop can’t end on its own. We let it run for 80 more tokens.'
        }}
        tiles={(run) => [
          {
            label: 'Chance of the stop token once the answer is done',
            value: run.id === 'no-stop' ? 'banned' : pct(stopOdds()),
            note: run.id === 'no-stop' ? `normally ${pct(stopOdds())}` : 'so the loop ends there'
          },
          {
            label: 'Tokens it wrote',
            value: String(run.tokenCount),
            note: run.stoppedNaturally ? 'then it stopped' : 'and it was still going when we cut it off'
          }
        ]}
        verdicts={{
          normal: 'It stops as soon as the answer is done: the stop token wins the vote.',
          'no-stop': 'It writes the same answer, then keeps going with an explanation, and the explanation is wrong: it treats 2.25 cups as per person, when the card says 2 1/4 cups serves 8. It was still writing when we cut it off.'
        }}
        takeaway={<p><b>That’s why replies end.</b> The model has no sense of being finished. Ending is one more prediction, and when it can’t pick the stop token it keeps writing.</p>}
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'The reply said about 8.4 cups. What makes the arithmetic trustworthy?',
        options: [
          { text: 'The Vote picked the most likely digits', why: 'Likely isn’t the same as correct.' },
          { text: 'The calculator the app ran; the model copied its answer', correct: true, why: 'The exact math happened outside the model.' },
          { text: 'The Stack does exact math', why: 'Models can do some arithmetic, with no guarantee.' }
        ]
      },
      {
        q: 'A friend says, “I told the bot about my nut allergy last week, so now it knows.” What’s true?',
        options: [
          { text: 'Yes: models learn from every chat', why: 'Answering never changes the model.' },
          { text: 'Only if the app saved it and pasted it into this conversation', correct: true, why: 'The model can use only what’s in its context.' },
          { text: 'No: models can’t use personal information', why: 'They can use anything in the context.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'The reply has no author in the usual sense. Responsibility for errors rests with the people who build it, offer it and rely on it.',
      column: 'accountability'
    }
  }
}
