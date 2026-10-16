import { useState } from 'react'
import { notQuite, yes } from '../lib/sound'
import type { Guess, Option } from './types'

/** A quick guess: one tap says right or not, then shows the answer. Optional; nothing waits on it. */
export function GuessCard({ q, options, reveal }: Guess) {
  const [picked, setPicked] = useState<number | null>(null)
  const right = picked !== null && !!options[picked]?.correct
  return (
    <div className="guess">
      <p className="kicker">Guess first</p>
      <p className="guess-q">{q}</p>
      <div className="guess-options" role="group" aria-label={q}>
        {options.map((o, i) => (
          <button
            key={o.text}
            type="button"
            className={`chip-choice${picked === i ? ' picked' : ''}${picked !== null && o.correct ? ' correct' : ''}${picked === i && !o.correct ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(i)
              if (o.correct) yes()
              else notQuite()
            }}
          >
            {picked !== null && o.correct && <span className="mark" aria-hidden="true">✓</span>}
            {picked === i && !o.correct && <span className="mark" aria-hidden="true">✗</span>}
            {o.text}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="guess-reveal" aria-live="polite">
          <Verdict right={right} /> {reveal}
        </p>
      )}
    </div>
  )
}

/** One transfer question. A wrong pick explains itself and lets you try again. */
export function QuizCard({ q, options, onCorrect }: { q: string; options: Option[]; onCorrect: () => void }) {
  const [tried, setTried] = useState<number[]>([])
  const [solved, setSolved] = useState(false)
  const last = tried[tried.length - 1]
  return (
    <div className={`quiz${solved ? ' solved' : ''}`}>
      <p className="bet-q">{q}</p>
      <div className="options" role="group" aria-label={q}>
        {options.map((o, i) => {
          const was = tried.includes(i)
          return (
            <button
              key={o.text}
              type="button"
              className={`option${was ? (o.correct ? ' correct' : ' wrong') : ''}`}
              disabled={solved || was}
              onClick={() => {
                setTried((t) => [...t, i])
                if (o.correct) yes()
                else notQuite()
                if (o.correct) {
                  setSolved(true)
                  onCorrect()
                }
              }}
            >
              {was && <span className={`mark ${o.correct ? 'right' : 'wrong'}`} aria-hidden="true">{o.correct ? '✓' : '✗'}</span>}
              {o.text}
            </button>
          )
        })}
      </div>
      {last !== undefined && options[last].why && (
        <p className="reveal" aria-live="polite">
          <Verdict right={!!options[last].correct} /> {options[last].why}
        </p>
      )}
    </div>
  )
}

/** Right or wrong, said the same way everywhere: a green check and “Correct.”, or a red cross and “Not quite.” */
export function Verdict({ right }: { right: boolean }) {
  return <b className={`verdict ${right ? 'yes' : 'no'}`}>{right ? '✓ Correct.' : '✗ Not quite.'}</b>
}
