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

/**
 * A token ID is a row number: “flour” becomes ID 19828, which points at one row of the embedding
 * table. The rows on either side hold unrelated tokens, because an ID is only an address. All
 * numbers are the recorded model's own.
 */
function TablePanel() {
  const table = phase2?.wordMap?.table
  const here = table?.around.find((r) => r.text === ' flour')
  if (!table || !here) return null
  const fmt = (v: number) => (v < 0 ? `−${Math.abs(v).toFixed(3)}` : v.toFixed(3))
  const rowY = (i: number) => 64 + i * 19
  const hi = table.around.indexOf(here)
  return (
    <svg className="arrive-art table-art" viewBox="0 0 320 236" role="img" aria-label={`“flour” is token ID ${here.id}. The ID points at row ${here.id} of a table with ${table.rows.toLocaleString()} rows; that row is a list of ${table.cols} numbers.`}>
      <rect x="8" y="8" width="60" height="24" rx="6" className="art-fill-soft" />
      <text x="38" y="24" textAnchor="middle" className="art-text">flour</text>
      <path d="M72,20 H92 M87,15 L93,20 L87,25" className="art-line" fill="none" />
      <rect x="98" y="8" width="84" height="24" rx="6" className="art-accent" />
      <text x="140" y="24" textAnchor="middle" className="art-tag big">ID {here.id}</text>
      {/* The ID's arrow runs down the left margin and into its row, clear of the other rows. */}
      <path d={`M106,33 V41 H2 V${rowY(hi) + 7} H6`} className="art-line" fill="none" strokeWidth="1.8" />
      <path d={`M3,${rowY(hi) + 3} L7,${rowY(hi) + 7} L3,${rowY(hi) + 11}`} className="art-line" fill="none" strokeWidth="1.8" />
      <text x="190" y="24" className="art-text sm">points at a row</text>
      <text x="8" y="52" className="art-text sm">The table: {table.rows.toLocaleString()} rows, {table.cols} numbers in each</text>
      {table.around.map((r, i) => {
        const v = decodeStrip(r.strip)
        const isHere = r === here
        return (
          <g key={r.id} opacity={isHere ? 1 : 0.42}>
            {isHere && <rect x="4" y={rowY(i) - 2} width="312" height="18" rx="4" className="table-hi" />}
            <text x="12" y={rowY(i) + 11} className="art-text">{r.id}</text>
            <text x="54" y={rowY(i) + 11} className="art-text sm">{r.text.trim()}</text>
            {Array.from({ length: 36 }, (_, k) => {
              const x = v[k * 24] ?? 0
              return <rect key={k} x={120 + k * 5.2} y={rowY(i)} width="4" height="14" rx="0.8" style={{ fill: x >= 0 ? 'var(--doing)' : 'var(--accent)', opacity: Math.min(1, 0.2 + Math.abs(x) * 1.6) }} />
            })}
          </g>
        )
      })}
      <g className="cut-chip" style={{ animationDelay: '0.5s' }}>
        <text x="8" y="182" className="art-text">flour’s row:</text>
        <text x="8" y="198" className="art-text">{here.first.map(fmt).join('  ')}  … {table.cols} numbers</text>
      </g>
      <text x="8" y="218" className="art-text sm" opacity="0.7">This is the recorded model’s ID.</text>
      <text x="8" y="232" className="art-text sm" opacity="0.7">Each model numbers its tokens its own way.</text>
    </svg>
  )
}

/** flour beside its nearest row and a far one: similar rows look alike, far ones don't. */
function StripCompare() {
  const near = flour ? words.find((w) => w.text === flour.neighbors[0]?.text) : undefined
  const far = words.find((w) => w.text === ' Tokyo') ?? words.find((w) => w.group === 'places')
  if (!flour || !near || !far) return <TablePanel />
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
    panel: <TablePanel />,
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
        word={{ label: 'flour', after: 'cups of', normal: flourOdds }}
        explains={{
          normal: 'Nothing. Each token ID pulls out its own row, as usual.',
          'swap-flour-sugar': 'Both times the model looked up “flour” (on the card and in your question), we handed it sugar’s row instead. The token IDs stayed the same.',
          'scramble-10': 'For 1 token in 10, picked at random, we swapped its row for a random token’s row. That happened to include “flour” in your question.',
          'scramble-100': 'We swapped every token’s row for a random token’s row. Only the hidden markers between messages were left alone.'
        }}
        verdicts={{
          normal: 'Right: 8.4375 cups of flour.',
          'swap-flour-sugar': 'It reads sugar’s row, so it writes “cups of sugar.”',
          'scramble-10': 'On its own, it slides into Chinese and garbles the amount (“Grandma’s home cooking… you need 2.2.25s of flour”). Fed the right words, it still finds the 8: small damage can derail the writing before it reaches the number.',
          'scramble-100': 'Nothing readable is left.'
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
