import { useState } from 'react'
import { notQuite, yes } from '../lib/sound'
import type { Guess, Option } from './types'

/** A quick guess: one tap shows the answer. Optional; nothing waits on it. */
export function GuessCard({ q, options, reveal }: Guess) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div className="guess">
      <p className="kicker">Guess first</p>
      <p className="guess-q">{q}</p>
      <div className="guess-options" role="group" aria-label={q}>
        {options.map((o, i) => (
          <button
            key={o.text}
            type="button"
            className={`chip-choice${picked === i ? ' picked' : ''}${picked !== null && o.correct ? ' correct' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(i)
              if (o.correct) yes()
              else notQuite()
            }}
          >
            {o.text}
          </button>
        ))}
      </div>
      {picked !== null && <p className="guess-reveal" aria-live="polite">{reveal}</p>}
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
              {o.text}
            </button>
          )
        })}
      </div>
      {last !== undefined && options[last].why && (
        <p className="reveal" aria-live="polite">
          <b>{options[last].correct ? 'Yes.' : 'Not quite.'}</b> {options[last].why}
        </p>
      )}
    </div>
  )
}
