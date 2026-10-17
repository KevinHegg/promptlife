import { ElevatorLevels, leadFloor } from '../cutaway/stations/ElevatorLevels'
import { stationByCode } from '../data/network'
import { phase2 } from '../data/phase2'
import { trace } from '../data/trace'
import type { LoopSpec } from '../loop/types'
import { TokenText } from '../ui/TokenText'
import { RunBreak } from './RunBreak'

const station = stationByCode('P05')!
const lens = trace?.logitLens.find((l) => l.id === 'answer-digit')
const lead = lens ? leadFloor(lens) : null
const floorsTotal = trace?.model.layers ?? 24
const top = lens?.layers[lens.layers.length - 1]?.top[0]

/** A cutaway building: 24 floors, the elevator near the top, the guess sharpening as it rises. */
function BuildingPanel() {
  const n = floorsTotal
  const h = 6
  const y0 = 32
  const yOf = (floor: number) => y0 + (n - floor) * h
  const leadAt = lead?.floor ?? n - 3
  return (
    <svg className="arrive-art" viewBox="0 20 320 172" role="img" aria-label={`A building with ${n} floors. The token rides up; “8” becomes the top guess only near the top.`}>
      <rect x="34" y={y0 - 4} width="56" height={n * h + 8} rx="3" className="art-line" fill="none" />
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M38,${y0 + i * h + h} H86`} className="art-line dim" strokeWidth="1" />
      ))}
      <rect x="42" y={yOf(n)} width="40" height={(n - leadAt + 1) * h} className="art-accent" opacity="0.25" />
      <rect x="48" y={yOf(n) + 1} width="28" height={h * 2 - 2} rx="2" className="art-accent" />
      <text x="62" y={y0 + n * h + 18} textAnchor="middle" className="art-text sm">your token rides up</text>
      <path d={`M94,${yOf(n) + h} H108`} className="art-line" />
      <text x="112" y={yOf(n) + h + 3.5} className="art-text">floor {n}: “8” at {top ? `${(top.prob * 100).toFixed(1)}%` : ''}</text>
      <path d={`M94,${yOf(leadAt) + h} H108`} className="art-line" />
      <text x="112" y={yOf(leadAt) + h + 3.5} className="art-text">floor {leadAt}: “8” takes the lead</text>
      <path d={`M94,${yOf(Math.max(1, leadAt - 9)) + h} H108`} className="art-line dim" />
      <text x="112" y={yOf(Math.max(1, leadAt - 9)) + h + 3.5} className="art-text" opacity="0.65">floors 1–{leadAt - 1}: scraps</text>
    </svg>
  )
}

/** The last few floors for “8”, top first, on paper. */
function FloorList() {
  if (!lens || !lead) return <BuildingPanel />
  const rows = lens.layers.filter((l) => l.layer >= lead.floor - 2).reverse()
  return (
    <div className="floor-list">
      {rows.map((l) => (
        <div key={l.layer} className={`fl-row${l.layer >= lead.floor ? ' lead' : ''}`}>
          <span className="fl-n">floor {l.layer}</span>
          <span className="fl-g"><TokenText text={l.top[0]?.text ?? ''} /></span>
          <span className="fl-bar"><span style={{ width: `${Math.max(2, (l.top[0]?.prob ?? 0) * 100)}%` }} /></span>
        </div>
      ))}
      <p className="muted small">At “You need about ___”: below floor {lead.floor - 2} the top guesses are scraps of code and other languages.</p>
    </div>
  )
}

/** Skip one floor at a time: the odds of the right “8” with each floor removed. */
function SkipChart() {
  const rows = phase2?.skipEach ?? []
  if (!rows.length) return null
  const breaks = rows.filter((r) => r.prob < 0.05).map((r) => r.floor)
  const hurt = rows.filter((r) => r.prob >= 0.05 && r.prob < 0.5).map((r) => r.floor)
  const W = 24 * 13
  return (
    <figure className="skip-chart">
      <svg viewBox={`0 0 ${W} 86`} role="img" aria-label={`Odds of the right 8 with one floor skipped. Floors that matter most: ${[...breaks, ...hurt].join(', ')}.`}>
        {rows.map((r, i) => {
          const h = Math.max(1.5, r.prob * 60)
          return (
            <g key={r.floor}>
              <rect x={i * 13 + 2} y={64 - h} width="9" height={h} rx="1.5" className={r.prob < 0.5 ? 'hurt' : 'ok'} />
              {(r.floor === 1 || r.floor % 6 === 0) && <text x={i * 13 + 6.5} y="80" textAnchor="middle">{r.floor}</text>}
            </g>
          )
        })}
      </svg>
      <figcaption>
        Skip one floor at a time: odds of the right “8.”{breaks.length ? ` Losing floor ${breaks.join(' or ')} breaks it.` : ''}
        {hurt.length ? ` Floors ${hurt.join(', ')} hurt.` : ''} Most others barely matter.
      </figcaption>
    </figure>
  )
}

export const P05_SPEC: LoopSpec = {
  code: 'P05',
  arrive: {
    caption: `The numbers ride up ${floorsTotal} floors. Each floor makes an edit, and its guess for the next token gets sharper.`,
    panel: <BuildingPanel />,
    guess: {
      q: 'As the reply writes the 8 in “8.4,” on which floor does “8” first take the lead?',
      options: [{ text: 'Floor 1' }, { text: 'Around floor 12' }, { text: 'Near the top', correct: true }],
      reveal: lead
        ? `Floor ${lead.floor} of ${floorsTotal}. Below that, the floors guess scraps; the answer shows up only in the last few floors.`
        : 'Near the top. Lower floors guess scraps; the answer shows up only in the last few floors.'
    }
  },
  poke: {
    title: 'Ride the elevator',
    intro: 'Pick a moment, then ride up floor by floor.',
    body: <ElevatorLevels station={station} />
  },
  name: {
    definition: `A transformer is a stack of layers, the floors you rode: ${floorsTotal} in this model. Each layer looks back (attention), then reworks each token’s numbers on their own, adding its edit to what was already there. That running list of numbers is the residual stream.`,
    terms: ['layer', 'transformer', 'residual stream'],
    picture: <FloorList />,
    metaphor: 'One draft passed up a building, each floor adding edits without erasing anything.',
    breaks: 'The draft is 896 numbers, not words. The words we show are only a peek.'
  },
  break: {
    title: 'Skip floors',
    intro: 'Why so many floors? Take some out and see what still works.',
    body: (
      <RunBreak
        station="P05"
        ids={['skip-mid', 'skip-first', 'top-half-gone']}
        labels={{ 'skip-mid': 'Skip floor 12', 'skip-first': 'Skip floor 1', 'top-half-gone': 'Stop at 12' }}
        explains={{
          normal: 'Nothing. Every token rides all 24 floors.',
          'skip-mid': 'We took out floor 12. The numbers go straight from floor 11 to floor 13.',
          'skip-first': 'We took out floor 1. The numbers go straight to floor 2.',
          'top-half-gone': 'We took out floors 13 to 24. The guess is read straight off floor 12.'
        }}
        verdicts={{
          normal: 'Right: 8.4375 cups of flour.',
          'skip-mid': 'Still right, a little shakier: the grammar slips (“to make 30 people”).',
          'skip-first': 'Broken: without floor 1 it repeats “mm” over and over.',
          'top-half-gone': 'Stopped halfway up: scraps of code and many languages. The answer forms higher.'
        }}
        takeaway={
          <>
            <p><b>That’s why it’s a stack.</b> Each floor builds on the edits below it. Take out any one of floors 13 to 24 and the reply barely changes. Take out the top six at once, floors 19 to 24, and it turns to junk. No single top floor matters much on its own; together, they finish the answer.</p>
            <SkipChart />
          </>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'A bigger model has more layers. What does that give it, most directly?',
        options: [
          { text: 'More rounds of looking back and reworking for every token', correct: true, why: 'Each layer is one more round of looking back and reworking.' },
          { text: 'Room to read more text', why: 'That’s a separate design limit.' },
          { text: 'Extra floors only when a question is hard', why: 'Every trip runs every floor once, easy or hard.' }
        ]
      },
      {
        q: 'A guess read halfway up is wrong, and the top floor gets it right. What’s the best description?',
        options: [
          { text: 'The model changed its mind', why: 'There’s no mind. One list of numbers kept being edited.' },
          { text: 'The model lied, then fixed it', why: 'Lying needs intent. This is arithmetic.' },
          { text: 'An unfinished draft, read with a trick, before later floors added their edits', correct: true, why: 'Reading a floor’s guess peeks at a half-finished calculation.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Every trip runs every floor: about a billion arithmetic steps per token for this small model, and far more for big ones.',
      column: 'energy',
      source: { label: 'Kaplan et al., 2020', href: 'https://arxiv.org/abs/2001.08361' }
    }
  }
}
