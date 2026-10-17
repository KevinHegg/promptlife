import { useState } from 'react'
import { HERO_TOKENS, SCENARIO, USER_IDS } from '../data/heroRun'
import { stationByCode } from '../data/network'
import { phase1 } from '../data/phase1'
import { RUN, runCounts } from '../data/run'
import { modelName, trace } from '../data/trace'
import { TokenizerLevels } from '../cutaway/stations/TokenizerLevels'
import { splitByCharacter } from '../lib/tokenizer'
import type { LoopSpec } from '../loop/types'
import { Howto } from '../ui/Howto'
import { Term } from '../ui/Term'
import { Chips, Lever, Reveal } from './parts'

const station = stationByCode('P02')!
const frontier = HERO_TOKENS.user.map((text, i) => ({ text, id: USER_IDS[i] }))
const recorded = trace ? RUN.question.map((i) => ({ text: trace!.tokens[i].text, id: trace!.tokens[i].id })) : []
const letters = splitByCharacter(SCENARIO.user)

/**
 * Break it: send the question one letter at a time. Two numbers flip with the lever (tokens, and
 * the chance the model asks for the calculator), then one line on why tokenizers use word parts.
 */
function LettersBreak() {
  const [on, setOn] = useState(false)
  const L = phase1.letters
  const n = L?.questionTokenCountLetters ?? letters.length
  const normal = L?.questionTokenCountNormal ?? runCounts.question
  const pNormal = phase1.freeFirstTurn?.pToolCallStart
  const pLetters = L?.firstTurnGreedy.pToolCallStart
  const pct = (p: number) => `${Math.round(p * 100)}%`
  const wrote = L?.firstTurnGreedy.text.trim() ?? ''
  const drifted = /biscuit/i.test(wrote)
  const pieces = on ? letters : recorded.length ? recorded : frontier
  return (
    <div className="break-body">
      <Howto>Flip the lever, then compare the two numbers.</Howto>
      <Lever on={on} onChange={setOn} label="Send it letter by letter" />
      <div className={`break-result${on ? ' broken' : ''}`}>
        <Chips pieces={pieces.map((p) => ({ text: p.text }))} small={on} />
        <div className="break-tiles">
          <div className="break-tile">
            <span className="kicker">Tokens</span>
            <b>{on ? n : normal}</b>
            <small>{on ? `about ${Math.round(n / normal)}× the work at every station` : 'word parts'}</small>
          </div>
          {pNormal !== undefined && pLetters !== undefined && (
            <div className="break-tile">
              <span className="kicker">Asks for the calculator</span>
              <b>{pct(on ? pLetters : pNormal)}</b>
              <small>{on ? 'it lost the thread' : 'of the time'}</small>
            </div>
          )}
        </div>
        {on ? (
          L ? (
            <>
              <p className="break-stat">
                {drifted ? 'It drifted off: it started counting biscuits instead of flour, and never asked for the calculator.' : 'It lost track of the question and never asked for the calculator.'}
              </p>
              <Reveal label="Read what it wrote">
                <div className="said">
                  <blockquote>{wrote} …</blockquote>
                  <p className="muted small">Real, unedited output of <Term id="recorded-model">this model</Term>. It almost never saw text spelled out letter by letter in training.</p>
                </div>
              </Reveal>
            </>
          ) : (
            <p className="muted">The recorded model's answer to the spelled-out question arrives with the next trace run.</p>
          )
        ) : (
          <p className="break-stat">This is how the model normally gets your question. Flip the lever to send the same text one letter at a time.</p>
        )}
      </div>
      {on && (
        <p className="break-why">
          <b>That's why tokens are word parts.</b> Letters make too many tokens, in a form the model rarely saw. Whole words would fail on any word missing from the list, like a typo or a new name.
        </p>
      )}
    </div>
  )
}

function CutterPanel() {
  return (
    <svg className="arrive-art" viewBox="0 32 320 136" role="img" aria-label="The question feeds into a cutter and leaves as chips with numbered tickets">
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
    intro: 'Type anything, or tap an example. Try “strawberry”, then change one letter.',
    body: <TokenizerLevels station={station} />
  },
  name: {
    definition: 'A tokenizer cuts text into tokens, word parts from a fixed list called its vocabulary, and swaps each token for its number, its token ID. “strawberry” becomes st · raw · berry, then 302 · 1618 · 19772. From here on, the model sees only the numbers.',
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
    note: recorded.length ? `Different models cut differently: this model cuts your question into ${recorded.length} tokens, a big chatbot’s tokenizer into ${frontier.length}.` : undefined
  },
  break: {
    title: 'Feed it letters',
    intro: 'Why cut text into word parts at all? Send your question one letter at a time and see what breaks.',
    body: <LettersBreak />
  },
  stamp: {
    questions: [
      {
        q: 'Why have chatbots often miscounted the r’s in “strawberry”?',
        options: [
          { text: 'Double letters confuse its spelling rules', why: 'It has no spelling rules. It never sees the letters at all.' },
          { text: 'It gets “ strawberry” as one ID, not ten letters', correct: true, why: 'The model sees ID 101830, not s-t-r-a-w-b-e-r-r-y.' },
          { text: 'It isn’t in the vocabulary', why: 'It is, as one token. That’s the problem.' }
        ]
      },
      {
        q: 'Two people send the same question, one with the typo “flouur.” What’s guaranteed to differ?',
        options: [
          { text: 'The model’s numbers', why: 'Nothing about the model changes between users.' },
          { text: 'The tokens and their count, 19 versus 21', correct: true, why: '“ flouur” splits into “ fl” + “ou” + “ur”: two extra tokens.' },
          { text: 'Whether the answer is right', why: 'Models cope with most typos. Only the IDs are sure to differ.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'You pay in tokens, and the limit on how much a model can read is counted in tokens too. The same text can take many times more tokens in some languages than in English.',
      column: 'compute',
      source: { label: 'Petrov et al., NeurIPS 2023', href: 'https://arxiv.org/abs/2305.15425' }
    }
  }
}
