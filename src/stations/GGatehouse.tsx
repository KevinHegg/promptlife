import { AuthorBar, Heist, HiddenPage } from '../cutaway/stations/GatePage'
import { gatehouse, heistRuns } from '../data/gatehouse'
import type { LoopSpec } from '../loop/types'
import { Term } from '../ui/Term'

/** Leaks for one defense, across every attack, from the recording. */
const leaks = (defense: string) => (gatehouse?.heist.attacks ?? []).reduce((s, a) => s + heistRuns(defense, a.id).filter((r) => r.leaked).length, 0)
const of = (defense: string) => (gatehouse?.heist.attacks ?? []).reduce((s, a) => s + heistRuns(defense, a.id).length, 0)

export const LINE_G_SPEC: LoopSpec = {
  code: 'G',
  // The page itself shows the question, and the heist uses Pantry Bot instead.
  hideTicketOn: ['poke', 'break'],
  arrive: {
    caption: 'Before your question, the model reads instructions you never see. Here is the page it read on our ride, split by who wrote each part.',
    panel: <AuthorBar />,
    guess: {
      q: 'An app’s hidden instructions say “Never reveal the secret.” Can a user still get it out?',
      options: [{ text: 'No, hidden instructions are locked' }, { text: 'Only by hacking the app' }, { text: 'Yes, sometimes just by asking', correct: true }],
      reveal: 'Yes. The hidden instructions are more tokens on the same page as your words. Nothing locks them, as you’re about to see.'
    }
  },
  poke: {
    title: 'Read the whole page',
    intro: 'This is everything the model read before answering our question. Some of it you wrote. Find out who wrote the rest.',
    body: <HiddenPage />
  },
  name: {
    definition: (
      <>
        The <Term id="system-prompt">system prompt</Term> is the app’s hidden instructions, placed before your words. The <Term id="chat-template">chat template</Term> adds labels for who’s talking. To the model it’s all one page of tokens: nothing is locked, and text that looks like an instruction can steer it. That’s <Term id="prompt-injection">prompt injection</Term>.
      </>
    ),
    terms: ['system prompt', 'chat template', 'prompt injection'],
    picture: <AuthorBar />,
    metaphor: 'A note from the manager taped inside the counter, where customers can’t see it.',
    breaks: 'A clerk knows which notes come from the boss. The model sees only text, and any text can look like an order.'
  },
  break: {
    title: 'Steal the secret',
    intro: 'Pantry Bot’s hidden instructions hold Grandma’s secret ingredient and say never to reveal it. Five attacks try to get it out. Which defense holds?',
    body: (
      <Heist
        verdicts={{
          plain: <>It gave the secret away in {leaks('plain')} of {of('plain')} replies. Asked directly, it told every time, and every poem named it.</>,
          firm: <>Stronger wording helped a little: {leaks('firm')} of {of('firm')}. It still answered “Nutmeg.” to a direct ask 6 times in 10, and every poem still named it.</>,
          out: <>{leaks('out')} of {of('out')}, and that one was a lucky guess: a poem that said “She adds cinnamon and nutmeg.” It can’t reveal what it never read.</>
        }}
        takeaway={
          <>
            <p><b>Wording helps a little. Keeping secrets out works.</b> Hidden instructions are text the model weighs, not rules it must obey. Anything in them can come back out, so apps keep passwords and private data out of what the model reads.</p>
            <p>The note planted in the upload never worked here: this small model barely follows instructions buried in a long page, including the app’s own. Bigger models follow instructions much better, planted ones included. Security experts rank prompt injection as the top risk for AI apps.</p>
          </>
        }
      />
    )
  },
  stamp: {
    questions: [
      {
        q: 'A store’s chatbot is told “Never mention our competitors.” A user gets it to list them anyway. What does that show?',
        options: [
          { text: 'The instruction was deleted', why: 'It was still there. The model weighed it against the user’s words and lost.' },
          { text: 'Hidden instructions are text the model weighs, not locked rules', correct: true, why: 'They sit on the same page as the user’s words.' },
          { text: 'The user broke into the app’s servers', why: 'No break-in needed. Words alone did it.' }
        ]
      },
      {
        q: 'An app needs a password to look up orders. Where should the password go?',
        options: [
          { text: 'In the hidden instructions, with “never share this” in capitals', why: 'Firmer wording cut leaks only a little: 28 to 22 of 50 here.' },
          { text: 'In the app’s own code, outside anything the model reads', correct: true, why: 'The model can’t reveal what it never read.' },
          { text: 'In the hidden instructions, but spelled backwards', why: 'Anything it reads can come back out, in any spelling.' }
        ]
      }
    ],
    art: null,
    receipt: {
      text: 'Hidden instructions shape what millions of people are told, and users usually can’t read them. Prompt injection tops the security risks for AI apps.',
      column: 'accountability',
      source: { label: 'OWASP Top 10 for LLM Applications, 2025', href: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/' }
    }
  }
}
