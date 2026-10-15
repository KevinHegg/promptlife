import { useState } from 'react'
import { HERO_TOKENS, SCENARIO, USER_IDS } from '../data/heroRun'
import { stationByCode } from '../data/network'
import { phase1 } from '../data/phase1'
import { RUN, runCounts } from '../data/run'
import { modelName, trace } from '../data/trace'
import { TokenizerLevels } from '../cutaway/stations/TokenizerLevels'
import { splitByCharacter } from '../lib/tokenizer'
import type { LoopSpec } from '../loop/types'
import { Chips, Lever } from './parts'

const station = stationByCode('P02')!
const frontier = HERO_TOKENS.user.map((text, i) => ({ text, id: USER_IDS[i] }))
const recorded = trace ? RUN.question.map((i) => ({ text: trace!.tokens[i].text, id: trace!.tokens[i].id })) : []
const letters = splitByCharacter(SCENARIO.user)

function LettersBreak() {
  const [on, setOn] = useState(false)
  const L = phase1.letters
  const n = L?.questionTokenCountLetters ?? letters.length
  const normal = L?.questionTokenCountNormal ?? runCounts.question
  return (
    <div className="break-body">
      <Lever on={on} onChange={setOn} label="Cut by letters" />
      <div className={`break-result${on ? ' broken' : ''}`}>
        {on ? (
          <>
            <Chips pieces={letters.map((p) => ({ text: p.text }))} />
            <p className="break-stat"><b>{n}</b> tokens instead of <b>{normal}</b>. Every later station works token by token, so your question now costs about {(n / normal).toFixed(1)} times as much to process.</p>
            {L ? (
              <div className="said">
                <p className="kicker">What the model wrote, given the question spelled out letter by letter</p>
                <blockquote>{L.firstTurnGreedy.text.trim() || '(nothing)'}</blockquote>
                <p>
                  For comparison, with the normal {normal} tokens and the calculator, the answer was “{SCENARIO.reply}”
                  {L.firstTurnGreedy.pToolCallStart !== undefined && phase1.freeFirstTurn?.pToolCallStart !== undefined && (
                    <> Spelled out, its chance of asking for the calculator went from {(phase1.freeFirstTurn.pToolCallStart * 100).toFixed(1)}% to {(L.firstTurnGreedy.pToolCallStart * 100).toFixed(2)}%.</>
                  )}
                </p>
                <p className="muted">A real, unedited output of {trace ? modelName(trace) : 'the recorded model'}. It rarely saw text spelled out this way in training.</p>
              </div>
            ) : (
              <p className="muted">The recorded model's answer to the spelled-out question arrives with the next trace run.</p>
            )}
          </>
        ) : (
          <>
            <Chips pieces={recorded.length ? recorded : frontier} />
            <p className="break-stat">The question as the model normally gets it: <b>{normal}</b> tokens. Flip the lever.</p>
          </>
        )}
      </div>
    </div>
  )
}

function CutterPanel() {
  return (
    <svg className="arrive-art" viewBox="0 0 320 220" role="img" aria-label="The question feeds into a cutter and leaves as chips with numbered tickets">
      <rect x="10" y="60" width="120" height="26" rx="6" className="art-fill-soft" />
      <text x="18" y="77" className="art-text">Using my grandmoth…</text>
      <path d="M134,52 L150,73 L134,94" className="art-line" fill="none" />
      <path d="M150,40 V106" className="art-line" strokeDasharray="4 4" fill="none" />
      {[['Using', '24849'], ['·my', '922'], ['·grandmother', '57468'], ["'s", '885']].map(([t, id], i) => (
        <g key={t} transform={`translate(${162 + (i % 2) * 74} ${54 + Math.floor(i / 2) * 64})`}>
          <g className="cut-chip" style={{ animationDelay: `${i * 0.25}s` }}>
            <rect width="66" height="24" rx="5" className="art-line" fill="none" />
            <text x="33" y="16" textAnchor="middle" className="art-text">{t}</text>
            <rect x="12" y="28" width="42" height="14" rx="3" className="art-accent" />
            <text x="33" y="39" textAnchor="middle" className="art-tag">{id}</text>
          </g>
        </g>
      ))}
    </svg>
  )
}

export const P02_SPEC: LoopSpec = {
  code: 'P02',
  arrive: {
    caption: 'The model can’t read letters. Your question is cut into tokens, and each token becomes a number.',
    panel: <CutterPanel />,
    guess: {
      q: 'How many tokens is “strawberry”?',
      options: [{ text: '1' }, { text: '3', correct: true }, { text: '10' }],
      reveal: 'Three: st · raw · berry. The model never sees the letters.'
    },
    flashback: { q: 'On the ride, how many tokens did your question make?', a: `${runCounts.question} for the recorded model, out of ${runCounts.total} on the platform. Most came from the app.` }
  },
  poke: {
    title: 'Make the tokenizer stumble',
    intro: 'Type anything and watch it split into tokens. Try “strawberry”, then change one letter, then try another language.',
    body: <TokenizerLevels station={station} />
  },
  name: {
    definition: 'A tokenizer cuts text into tokens, word parts from a fixed list, and swaps each token for its number, its token ID. “strawberry” becomes st · raw · berry, then 302 · 1618 · 19772. From here on, the model sees only the numbers.',
    terms: ['token', 'token ID', 'vocabulary'],
    picture: (
      <div className="three-ways">
        <div><p className="kicker">“ flour”</p><Chips pieces={[{ text: ' flour', id: 28420 }]} /></div>
        <div><p className="kicker">“Flour”</p><Chips pieces={[{ text: 'Fl', id: 4245 }, { text: 'our', id: 401 }]} /></div>
        <div><p className="kicker">“buttermilk”</p><Chips pieces={[{ text: 'but', id: 8293 }, { text: 'term', id: 8044 }, { text: 'ilk', id: 74313 }]} /></div>
      </div>
    ),
    metaphor: 'A coat check: hand over text, get a numbered ticket.',
    breaks: 'A coat check returns your own coat. Every “ flour” gets the same ticket, and what that ticket stands for was set in training.',
    note: recorded.length ? `Different models cut differently: the recorded model cuts your question into ${recorded.length} tokens, a frontier model into ${frontier.length}.` : undefined
  },
  break: {
    title: 'Cut by letters',
    intro: 'What if the tokenizer cut every character on its own?',
    body: <LettersBreak />
  },
  stamp: {
    questions: [
      {
        q: 'Why have chatbots often miscounted the r’s in “strawberry”?',
        options: [
          { text: 'They can’t count to three', why: 'Counting isn’t the issue. The letters aren’t in what it sees.' },
          { text: '“ strawberry” reaches the model as one ID, not ten letters', correct: true, why: 'The model sees ID 101830, not s-t-r-a-w-b-e-r-r-y.' },
          { text: 'It isn’t in the vocabulary', why: 'It is, as one token. That’s the problem.' }
        ]
      },
      {
        q: 'Two people send the same question, one with the typo “flouur.” What’s guaranteed to differ?',
        options: [
          { text: 'The model’s weights', why: 'Nothing about the model changes between users.' },
          { text: 'The tokens and their count, 19 versus 21', correct: true, why: '“ flouur” splits into “ fl” + “ou” + “ur”: two extra tokens.' },
          { text: 'Whether the answer is right', why: 'Models cope with most typos. Only the IDs are sure to differ.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'You pay in tokens, and context windows are measured in them. The same text can take many times more tokens in some languages than in English.',
      column: 'compute',
      source: { label: 'Petrov et al., NeurIPS 2023', href: 'https://arxiv.org/abs/2305.15425' }
    }
  }
}
