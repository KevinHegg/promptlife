import { EmbeddingLevels, Strip } from '../cutaway/stations/EmbeddingLevels'
import { stationByCode } from '../data/network'
import { trace } from '../data/trace'
import { cosine, decodeStrip, phase2 } from '../data/phase2'
import type { LoopSpec } from '../loop/types'
import { RunBreak } from './RunBreak'

const station = stationByCode('P03')!
const words = phase2?.wordMap?.words ?? []
const flour = words.find((w) => w.text === ' flour')
/** The recorded odds of “ flour” where the reply wrote it. */
const flourOdds = trace?.steps.find((s) => s.chosen.text === ' flour')?.chosen.prob ?? 0.999

/** A ticket goes into a wall of drawers; one drawer opens and a striped strip of numbers rolls out. */
function DrawerPanel() {
  // The real first 40 numbers of flour's row when recorded; a fixed pattern otherwise.
  const v = flour ? decodeStrip(flour.strip).slice(0, 40) : Array.from({ length: 40 }, (_, i) => Math.sin(i * 1.7) * 0.8)
  return (
    <svg className="arrive-art" viewBox="0 20 320 160" role="img" aria-label="A ticket for “flour” goes into a wall of numbered drawers, and one drawer rolls out a long strip of numbers">
      <rect x="8" y="78" width="62" height="26" rx="6" className="art-fill-soft" />
      <text x="39" y="95" textAnchor="middle" className="art-text">flour</text>
      <path d="M74,91 H96 M90,85 L97,91 L90,97" className="art-line" fill="none" />
      {Array.from({ length: 12 }, (_, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        const open = i === 5
        return (
          <g key={i}>
            <rect x={106 + col * 34 + (open ? 10 : 0)} y={40 + row * 34} width="30" height="28" rx="3" className="art-line" fill="none" opacity={open ? 1 : 0.45} />
            <circle cx={121 + col * 34 + (open ? 10 : 0)} cy={54 + row * 34} r="2" className="art-accent" opacity={open ? 1 : 0.5} />
          </g>
        )
      })}
      <g className="cut-chip" style={{ animationDelay: '0.4s' }}>
        {v.map((x, i) => (
          <rect
            key={i}
            x={150 + i * 4}
            y={124}
            width="3.4"
            height="20"
            rx="0.8"
            style={{ fill: x >= 0 ? 'var(--doing)' : 'var(--accent)', opacity: Math.min(1, 0.25 + Math.abs(x) * 1.4) }}
          />
        ))}
        <text x="150" y="160" className="art-text sm">896 numbers, one row</text>
      </g>
    </svg>
  )
}

/** flour beside its nearest row and a far one: similar rows look alike, far ones don't. */
function StripCompare() {
  const near = flour ? words.find((w) => w.text === flour.neighbors[0]?.text) : undefined
  const far = words.find((w) => w.text === ' Tokyo') ?? words.find((w) => w.group === 'places')
  if (!flour || !near || !far) return <DrawerPanel />
  // Far words aren't in flour's top five, so measure from the stored rows (accurate to about 0.01).
  const farCos = cosine(decodeStrip(flour.strip), decodeStrip(far.strip))
  return (
    <div className="strip-compare">
      <Strip b64={flour.strip} label={flour.text} />
      <Strip b64={near.strip} label={`${near.text} · ${flour.neighbors[0].cos.toFixed(2)}`} />
      <Strip b64={far.strip} label={`${far.text} · ${farCos.toFixed(2)}`} />
      <p className="muted small">Each stripe is one of 896 numbers. The number after a word is its similarity to “flour”, from 1 (same direction) down to 0 (unrelated).</p>
    </div>
  )
}

export const P03_SPEC: LoopSpec = {
  code: 'P03',
  arrive: {
    caption: 'A token ID is only a row number. Each ID pulls out its row: a long list of numbers.',
    panel: <DrawerPanel />,
    guess: {
      q: 'Does “feed” pull out the same row in “feed 30 people” and in “my news feed”?',
      options: [{ text: 'Yes, every time', correct: true }, { text: 'No, it reads the sentence first' }, { text: 'It’s random' }],
      reveal: 'Same ID, same row, every time. At this stop the model can’t tell which “feed” you mean. The sentence starts to matter at Attention.'
    }
  },
  poke: {
    title: 'Find flour’s neighbors',
    intro: 'Tap “flour” and see which rows are most like it.',
    body: <EmbeddingLevels station={station} />
  },
  name: {
    definition: 'An embedding is the list of numbers stored for each token ID: 896 of them in the recorded model. They’re part of the model’s weights, set in training, and tokens used in similar ways ended up with similar lists.',
    terms: ['embedding', 'vector', 'weights'],
    picture: <StripCompare />,
    metaphor: 'A city where words used alike live on the same block.',
    breaks: 'This city has 896 directions, not 2, and none of them has a name you could read.'
  },
  break: {
    title: 'Scramble the table',
    intro: 'Why do these exact numbers matter? Swap rows for random ones and watch the reply.',
    body: (
      <RunBreak
        station="P03"
        ids={['swap-flour-sugar', 'scramble-10', 'scramble-100']}
        labels={{ 'swap-flour-sugar': 'Flour → sugar', 'scramble-10': '1 row in 10', 'scramble-100': 'Every row' }}
        word={{ label: 'flour', normal: flourOdds }}
        verdicts={{
          normal: 'Right: 8.4375 cups of flour.',
          'swap-flour-sugar': 'The token IDs still say flour, but the model got sugar’s row, so it wrote “cups of sugar.”',
          'scramble-10': 'One row in ten swapped, including the question’s “flour”: the odds of “8” barely move, yet the reply slides into Chinese and garbles the amount (“Grandma’s home cooking… you need 2.2.25s of flour”).',
          'scramble-100': 'Every row swapped: nothing readable is left.'
        }}
        takeaway={<p><b>That’s why the table matters.</b> The token IDs never changed, only the rows they pulled out. The model reads rows, not words, so a wrong row is a wrong word as far as it can tell.</p>}
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'A new slang word takes off next month. While you chat, can the model add a row for it?',
        options: [
          { text: 'Yes, it learns words as you use them', why: 'Using a model never changes its weights.' },
          { text: 'Yes, if you explain the word in your message', why: 'The explanation helps this one answer. No row is added.' },
          { text: 'No: the table is fixed, so the word is cut into tokens it already has', correct: true, why: 'Any word can be spelled from existing tokens, and each keeps its old row.' }
        ]
      },
      {
        q: 'Two tokens have very similar rows of numbers. What’s the best guess?',
        options: [
          { text: 'They mean exactly the same thing', why: 'Similar use isn’t the same meaning: “hot” and “cold” are often neighbors.' },
          { text: 'They showed up in similar places in the training text', correct: true, why: 'Training nudged the rows of tokens used in similar ways toward each other.' },
          { text: 'Someone grouped them by hand', why: 'Training placed them. Nobody labeled anything.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'These rows were learned from human writing and carry its patterns, stereotypes included.',
      column: 'data',
      source: { label: 'Caliskan, Bryson & Narayanan, Science 2017', href: 'https://www.science.org/doi/10.1126/science.aal4230' }
    }
  }
}
