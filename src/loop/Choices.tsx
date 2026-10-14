import { useState } from 'react'
import type { Option } from './types'

/**
 * A one-tap prediction. Any pick reveals the answer; wrong picks are "usefully wrong",
 * never scolded.
 */
export function BetCard({ question, options, reveal, onDone }: { question: string; options: Option[]; reveal: string; onDone: () => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const right = picked !== null && options[picked].correct
  return (
    <div className="bet">
      <p className="bet-q">{question}</p>
      <div className="options" role="group" aria-label="Your bet">
        {options.map((o, i) => (
          <button
            key={o.text}
            type="button"
            className={`option${picked === i ? ' picked' : ''}${picked !== null && o.correct ? ' correct' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(i)
              onDone()
            }}
          >
            {o.text}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="reveal" aria-live="polite">
          <b>{right ? 'Good bet.' : 'Usefully wrong. Most people bet the same way.'}</b> {reveal}
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
