import { useState } from 'react'
import type { Option } from './types'

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
