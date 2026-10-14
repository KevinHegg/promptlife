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

function CompareCuts() {
  if (!recorded.length) return null
  return (
    <div className="compare-cuts">
      <h3>Different models cut differently</h3>
      <div>
        <p className="kicker">Frontier tokenizer (o200k) · {frontier.length} pieces</p>
        <Chips pieces={frontier} hot={(i) => frontier[i].text === ' syllabus'} />
      </div>
      <div>
        <p className="kicker">The recorded model ({trace ? modelName(trace) : ''}) · {recorded.length} pieces</p>
        <Chips pieces={recorded} hot={(i) => /syll|abus/.test(recorded[i].text)} />
      </div>
      <p className="muted">Same sentence, different vocabularies. The rest of the ride uses the recorded model's {recorded.length}.</p>
    </div>
  )
}

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
            <p className="break-stat"><b>{n}</b> tokens instead of <b>{normal}</b>. Every later station does its work per token, so your question now costs about {(n / normal).toFixed(1)} times as much to process.</p>
            {L ? (
              <div className="said">
                <p className="kicker">What the model wrote, given the question spelled out letter by letter</p>
                <blockquote>{L.firstTurnGreedy.text.trim() || '(nothing)'}</blockquote>
                <p>
                  Wrong: it never works out the final exam score.
                  {L.firstTurnGreedy.pToolCallStart !== undefined && phase1.freeFirstTurn?.pToolCallStart !== undefined && (
                    <> Its odds of starting a calculator call also fell from {(phase1.freeFirstTurn.pToolCallStart * 100).toFixed(1)}% to {(L.firstTurnGreedy.pToolCallStart * 100).toFixed(2)}%.</>
                  )}{' '}
                  With the normal {normal} tokens and the calculator's help, the recorded run answered 93.75%.
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
      <text x="18" y="77" className="art-text">Using my syllabus, wh…</text>
      <path d="M134,52 L150,73 L134,94" className="art-line" fill="none" />
      <path d="M150,40 V106" className="art-line" strokeDasharray="4 4" fill="none" />
      {[['Using', '24849'], ['·my', '922'], ['·syllabus', '127031'], [',', '11']].map(([t, id], i) => (
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
    caption: 'The model can’t read letters. Here your question is cut into pieces, and each piece trades its text for a number.',
    panel: <CutterPanel />,
    flashback: { q: 'On the ride, how many tokens did your question make?', a: `${runCounts.question} in the recorded model, out of ${runCounts.total} on the platform. Most of the context came from the app.` }
  },
  bet: {
    question: 'Which of these is a single token for a frontier tokenizer?',
    options: [{ text: '“syllabus” (no space)' }, { text: '“ syllabus” (a space in front)', correct: true }, { text: '“Syllabus” (capital S)' }],
    reveal: 'Only the one with the space: ID 127031. “Syllabus” is two pieces, S + yllabus. Plain “syllabus” is three: sy + ll + abus.'
  },
  poke: {
    title: 'Make the tokenizer stumble',
    intro: 'Open the window and type. Try three challenges: raise the count by changing one letter; find a word that’s one token after a space and three without; give “ final” a new ID without changing the word.',
    body: (
      <>
        <TokenizerLevels station={station} />
        <CompareCuts />
      </>
    )
  },
  name: {
    definition: 'A tokenizer cuts text into tokens from a fixed vocabulary and swaps each for its token ID. From here on, the model sees only the IDs.',
    terms: ['token', 'token ID', 'vocabulary'],
    picture: (
      <div className="three-ways">
        <div><p className="kicker">“ syllabus”</p><Chips pieces={[{ text: ' syllabus', id: 127031 }]} /></div>
        <div><p className="kicker">“Syllabus”</p><Chips pieces={[{ text: 'S', id: 50 }, { text: 'yllabus', id: 156066 }]} /></div>
        <div><p className="kicker">“syllabus”</p><Chips pieces={[{ text: 'sy', id: 5611 }, { text: 'll', id: 680 }, { text: 'abus', id: 67008 }]} /></div>
      </div>
    ),
    metaphor: 'A coat check: hand over text, get a numbered ticket.',
    breaks: 'A coat check returns your own coat. Every “ syllabus” gets the same ticket, and what that ticket fetches at P03 was set in training.'
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
          { text: 'It isn’t in the vocabulary', why: 'It is, as one piece. That’s the problem.' }
        ]
      },
      {
        q: 'Two classmates send the same question, one with the typo “sylabus.” What’s guaranteed to differ?',
        options: [
          { text: 'The model’s weights', why: 'Nothing about the model changes between users.' },
          { text: 'The tokens and their count, 17 versus 18', correct: true, why: '“ sylabus” splits into “ syl” + “abus”, one extra piece.' },
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
