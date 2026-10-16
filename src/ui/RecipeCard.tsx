import { RUN } from '../data/run'

type Tok = { pos: number; text: string }

/** The recipe card's text exactly as the app pasted it into the context, split into its lines. */
function cardLines(): Tok[][] {
  const lines: Tok[][] = [[]]
  for (const i of RUN.passages) {
    const parts = RUN.tokens[i].text.split('\n')
    parts.forEach((part, k) => {
      if (k > 0) lines.push([])
      if (part) lines[lines.length - 1].push({ pos: i, text: part })
    })
  }
  // Drop the "Your files:" heading the app adds, and blank lines.
  return lines.filter((l) => l.length && !/^Your files:?$/.test(l.map((t) => t.text).join('').trim()))
}

/**
 * Grandma's recipe card, drawn as an index card. The words are the exact text the app found in
 * your files and pasted in ahead of your question. Positions in `highlight` are marked, darker for
 * a higher weight (0 to 1), so a lesson can show where the model looked.
 */
export function RecipeCard({ highlight = {}, caption }: { highlight?: Record<number, number>; caption?: string }) {
  const lines = cardLines()
  if (!lines.length) return null
  return (
    <figure className="recipe-card">
      {lines.map((line, k) => (
        <p key={k} className={k === 0 ? 'rc-front' : 'rc-back'}>
          {line.map((t, j) => {
            const w = highlight[t.pos]
            return w !== undefined ? (
              <mark key={j} style={{ ['--w' as string]: String(Math.max(0.25, Math.min(1, w))) }}>{t.text}</mark>
            ) : (
              <span key={j}>{t.text}</span>
            )
          })}
        </p>
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** How the card got into the context, in one plain line. */
export const HOW_THE_CARD_GOT_THERE =
  'The model never opens your files. When you ask, the app searches them, finds this card, and pastes its text in ahead of your question.'
