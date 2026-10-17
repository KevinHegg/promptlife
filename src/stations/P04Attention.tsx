import { AttentionLevels, Arcs } from '../cutaway/stations/AttentionLevels'
import { cutawayData } from '../data/cutawayData'
import { stationByCode } from '../data/network'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'
import { RunBreak } from './RunBreak'

const station = stationByCode('P04')!
const heads = cutawayData.attention
const card = heads.find((h) => h.name === 'Looks at the card') ?? heads[0]
const copier = heads.find((h) => h.name === 'Copier') ?? heads[heads.length - 1]

/** Real arcs from one recorded head, drawn on paper. */
function PaperArcs({ which, caption }: { which: typeof card; caption?: string }) {
  if (!which) return null
  return (
    <figure className="paper-attn">
      <Arcs view={which} />
      {caption && <figcaption className="muted small">{caption}</figcaption>}
    </figure>
  )
}

export const P04_SPEC: LoopSpec = {
  code: 'P04',
  arrive: {
    caption: 'Here every token looks back at the tokens before it and borrows from them.',
    panel: <PaperArcs which={card} caption="One part of the model that looks back: “flour” in your question looks back at “flour” on Grandma’s recipe card, the card you uploaded." />,
    guess: {
      q: 'Can “flour” in your question look at “people,” which comes after it?',
      options: [{ text: 'Yes, it sees the whole question' }, { text: 'Only if the words are related' }, { text: 'No, only tokens before it', correct: true }],
      reveal: 'Only backward. That’s what lets the model write one token at a time: no token ever needs one that doesn’t exist yet.'
    }
  },
  poke: {
    title: 'Follow the arcs',
    intro: <>The model looks back in many separate ways at once. Each one is called an attention <Term id="attention-head">head</Term>. Pick one and see where a token borrows from.</>,
    body: <AttentionLevels station={station} views={heads} />
  },
  name: {
    definition: 'Attention lets each token borrow a mix of information from the tokens before it, in shares that add up to 100%. The model has many attention heads, each looking back in its own way.',
    terms: ['attention', 'attention head'],
    picture: <PaperArcs which={copier} caption="The “Copier” head, just before the reply writes 8: nearly all its attention goes to the 8 in the calculator’s answer." />,
    metaphor: 'A highlighter run over earlier text, darker where more is borrowed.',
    breaks: 'A highlighter suggests a reader. Nobody is reading; the weights come from multiplying numbers.'
  },
  break: {
    title: 'Blindfold the heads',
    intro: 'Why look back at all? Hide part of the context from every head and see what the reply can still do.',
    body: (
      <RunBreak
        station="P04"
        ids={['hide-card', 'hide-result', 'self-only']}
        labels={{ 'hide-card': 'Hide the card', 'hide-result': 'Hide the answer', 'self-only': 'Only itself' }}
        explains={{
          normal: 'Nothing. Every token may look back at every token before it.',
          'hide-card': 'No token may look back at the recipe card. Its tokens are blacked out for every head, everywhere in the model.',
          'hide-result': 'No token may look back at the calculator’s answer, 8.4375. It’s blacked out for every head, everywhere in the model.',
          'self-only': 'Each token may look only at itself, so nothing else in the context gets in.'
        }}
        verdicts={{
          normal: 'Right: it copies 8.4375 from the calculator’s answer.',
          'hide-card': 'No change. By now the answer comes from the calculator, so the card isn’t needed.',
          'hide-result': 'Fluent and wrong: with the calculator’s answer hidden, it copied 2.25 from the card instead.',
          'self-only': 'Each token sees only itself. No context gets in, and it writes nothing but spaces.'
        }}
        takeaway={<p><b>That’s why attention matters.</b> A token knows only what it can look back at. Hide the right tokens and the reply still sounds fluent, but it can no longer use what they said.</p>}
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'In “Do not add sugar,” a head puts heavy weight on “not.” Does that show the model understood?',
        options: [
          { text: 'Yes: attention is focus', why: 'Nobody is there to focus. The weights describe how numbers were mixed.' },
          { text: 'No: it shows how numbers were mixed; only the reply shows whether the instruction was followed', correct: true, why: 'Weights show where information came from, not understanding.' },
          { text: 'Yes: heavy weight means high confidence', why: 'Attention weights describe mixing, not certainty.' }
        ]
      },
      {
        q: 'How can the 40th token of a reply still use a fact from the first line of the context?',
        options: [
          { text: 'The fact was trained in during the chat', why: 'The model doesn’t change while it answers.' },
          { text: 'It can’t; only the last few tokens matter', why: 'It can, as long as the fact is still in the context.' },
          { text: 'Every new token can look back at every earlier token in the context', correct: true, why: 'That’s attention: any earlier token is in reach.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Every token looks back at every earlier one, so long chats cost more per reply.',
      column: 'compute',
      source: { label: 'Vaswani et al., 2017', href: 'https://arxiv.org/abs/1706.03762' }
    }
  }
}
