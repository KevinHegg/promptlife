import { RankedCards, RetrievalView } from '../cutaway/stations/RetrievalView'
import { chunkById, libraryRun, question, type LibraryRun } from '../data/library'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'
import { TextBreak, type TextBreakOption } from './TextBreak'

/** A recipe box of index cards; a magnifier lifts out the top three. */
function BoxPanel() {
  return (
    <svg className="arrive-art" viewBox="0 10 320 150" role="img" aria-label="Grandma’s recipe box holds twelve cards. The app lifts out only the three that best match your question.">
      <rect x="20" y="70" width="150" height="70" rx="6" className="art-fill-soft" stroke="var(--ink)" strokeWidth="2.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={28 + i * 15} y={52 - (i % 3) * 3} width="13" height="30" rx="2" fill="var(--sheet)" stroke="var(--ink)" strokeWidth="1.5" opacity={0.75} />
      ))}
      <text x="95" y="128" textAnchor="middle" className="art-text">12 cards</text>
      <g className="cut-chip" style={{ animationDelay: '0.3s' }}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={200 + i * 8} y={30 + i * 22} width="86" height="30" rx="3" fill="var(--sheet)" stroke="var(--l-library)" strokeWidth="2.5" />
        ))}
        <text x="252" y="140" textAnchor="middle" className="art-text">top K = 3</text>
      </g>
      <path d="M172,92 C188,92 186,62 198,58" className="art-line" fill="none" />
      <circle cx="292" cy="30" r="14" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <path d="M302,40 L312,50" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/** The cards a run was given, as small chips. */
const Included = ({ run }: { run?: LibraryRun }) =>
  run?.included?.length ? (
    <p className="muted small">Cards it was given: {run.included.map((id) => chunkById(id)?.card ?? id).join(' · ')}</p>
  ) : null

const all = (k: number) => libraryRun(`buttermilk-k${k}`)
const tool = () => libraryRun('buttermilk-tool')

function allOptions(verdicts: Record<string, string>): TextBreakOption[] {
  const truth = question('all-buttermilk')?.truth.recipes?.length ?? 6
  const opts: TextBreakOption[] = []
  for (const k of [3, 8, 13]) {
    const r = all(k)
    if (!r) continue
    opts.push({
      id: `k${k}`,
      label: k === 13 ? 'Paste all 13' : `Top ${k}`,
      explain: k === 13 ? 'The app pastes in every card. Fine for a box of 13, but real uploads can run to thousands of chunks.' : `The app scores every card against the question and pastes in the top ${k}. The model sees only those.`,
      text: r.text,
      stoppedNaturally: r.stoppedNaturally,
      verdict: verdicts[`k${k}`],
      tiles: [
        { label: 'Recipes it got right', value: `${r.correct ?? 0} of ${truth}` },
        { label: 'Missed / wrongly named', value: `${r.missed ?? 0} / ${r.wrong ?? 0}` }
      ],
      extra: <Included run={r} />
    })
  }
  const t = tool()
  if (t) {
    opts.push({
      id: 'tool',
      label: 'Search the whole box',
      explain: (
        <>
          No cards pasted in. Instead the app gives the model a search tool. The model asks it for every card with “buttermilk”, the app checks all {13} cards, and pastes back the full list. This is a <Term id="tool-call">tool call</Term>.
        </>
      ),
      text: t.text,
      stoppedNaturally: t.stoppedNaturally,
      verdict: verdicts.tool,
      tiles: [
        { label: 'Recipes it got right', value: `${t.correct ?? truth} of ${truth}` },
        { label: 'Chose the tool on its own', value: t.toolChoice ? `${Math.round(t.toolChoice.prob * 100)}%` : '—', note: 'its first move, before any search' }
      ]
    })
  }
  return opts
}

export const LINE_L_SPEC: LoopSpec = {
  code: 'L',
  // The Library asks its own questions about the whole recipe box.
  hideTicketOn: ['poke', 'break'],
  arrive: {
    caption: 'On the ride you uploaded one card. Now picture Grandma’s whole recipe box. The app can’t paste in every card, so it picks the top K.',
    panel: <BoxPanel />,
    guess: {
      q: 'The app pastes in only the 3 cards that best match your question. Can the model list every recipe that uses buttermilk?',
      options: [{ text: 'Yes, it searches the whole box' }, { text: 'Only the ones on those 3 cards', correct: true }, { text: 'Yes, it remembers the box' }],
      reveal: 'Only those 3. The model reads what the app pasted in, nothing more. Six of Grandma’s recipes use buttermilk.'
    }
  },
  poke: {
    title: 'Choose K',
    intro: <>The app scores every card against your question and pastes in the best K. Try a few values of K.</>,
    body: <RetrievalView />
  },
  name: {
    definition: 'Retrieval is the app searching your uploads, scoring each chunk against your question, and pasting the top K into the context. K is a setting: too small and the answer can miss the cut; too large and lookalike chunks crowd in and can muddle the answer.',
    terms: ['retrieval', 'top-K retrieval', 'embedding'],
    picture: (() => {
      const q = question('lookup')
      return q ? <RankedCards q={q} k={3} compact /> : <BoxPanel />
    })(),
    metaphor: 'A librarian who brings you the K books that look most like your question.',
    breaks: 'A real librarian could count every book for you. This one brings K and never mentions the rest.'
  },
  break: {
    title: 'Ask about all of them',
    intro: 'Why can’t top K answer everything? Ask a question that needs every card: which of Grandma’s recipes use buttermilk? Six of them do.',
    body: <TextBreak options={allOptions({
      k3: 'Three right, three missed. It lists exactly the cards it was given and never hints there might be more.',
      k8: 'Five right, but three wrong: it lists every pasted card as a buttermilk recipe, sugar cookies and gravy included.',
      k13: 'Even with every card in front of it, it names ten recipes, five of them wrong, and still misses the coleslaw.',
      tool: 'All six, none wrong. The tool checked every card; the model only had to report the list.'
    })} takeaway={<p><b>Retrieval finds; tools count.</b> Top K hands the model a few cards, and it answers from those as if they were all. Questions about everything need something that reads everything, like a search tool.</p>} />
  },
  stamp: {
    questions: [
      {
        q: 'You upload a year of receipts and ask “How much did I spend on coffee?” The app pastes in the top 5 receipts. What’s the risk?',
        options: [
          { text: 'None: it reads all your receipts', why: 'It reads only the 5 the app pasted in.' },
          { text: 'The total covers only the receipts it was given, so it’s probably too low', correct: true, why: 'Top K can’t add up what it never saw.' },
          { text: 'It refuses to answer', why: 'Usually it answers anyway, and sounds sure.' }
        ]
      },
      {
        q: 'An app raises K from 3 to 50. What’s the most likely effect?',
        options: [
          { text: 'Every answer gets better', why: 'Lookalike chunks crowd in and can muddle the answer.' },
          { text: 'More of the right chunks, but more noise too, and a fuller context window', correct: true, why: 'Bigger K is a trade, not a fix.' },
          { text: 'Nothing: K doesn’t matter', why: 'K decides everything the model gets to see.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Your uploads were split and scored, and only the top K reached the model. Nothing in the reply says which were left out.',
      column: 'data'
    }
  }
}
