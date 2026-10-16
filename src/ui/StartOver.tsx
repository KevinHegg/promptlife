import { useState } from 'react'
import { resetProgress } from '../lib/progress'

/**
 * Start over, with one confirming tap: clears this device's progress and opens the start, fresh.
 * For a fresh run, or before handing a phone to someone else.
 */
export function StartOver({ className = '' }: { className?: string }) {
  const [asking, setAsking] = useState(false)
  if (!asking) {
    return (
      <button type="button" className={`link-btn start-over ${className}`} onClick={() => setAsking(true)}>
        Start over
      </button>
    )
  }
  return (
    <span className={`start-over-ask ${className}`} role="group" aria-label="Start over?">
      <span>Clear all progress on this device?</span>
      <button
        type="button"
        className="btn small danger"
        onClick={() => {
          resetProgress()
          window.location.hash = '#/'
          window.location.reload()
        }}
      >
        Yes, start over
      </button>
      <button type="button" className="btn small" onClick={() => setAsking(false)}>Cancel</button>
    </span>
  )
}
