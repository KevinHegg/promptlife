import type { ReactNode } from 'react'

/** One line at a control saying what to do, in the same style everywhere. */
export function Howto({ children }: { children: ReactNode }) {
  return (
    <p className="howto">
      <span className="howto-mark" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
