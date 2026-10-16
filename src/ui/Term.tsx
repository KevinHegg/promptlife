import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { GLOSSARY } from '../data/glossary'
import { glossaryHref } from '../lib/glossaryLink'
import { tick } from '../lib/sound'
import { TERM_PICTURES } from './TermPictures'

const BY_ID = new Map(GLOSSARY.map((e) => [e.id, e]))
const CARD_W = 300

/**
 * A word worth learning, said where it's used. Tap it for a small card: the plain one-line meaning
 * from the glossary, a tiny picture for the key terms, a short example from our run, and a link to
 * the full entry. The card floats above everything, so a cutaway box can't clip it.
 */
export function Term({ id, children }: { id: string; children: ReactNode }) {
  const entry = BY_ID.get(id)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; above: boolean } | null>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const card = useRef<HTMLDivElement>(null)

  // Place the card under the word, or above it when there's no room, kept inside the screen.
  const place = () => {
    if (!btn.current) return
    const r = btn.current.getBoundingClientRect()
    if (r.bottom < 0 || r.top > window.innerHeight) {
      setOpen(false)
      return
    }
    const w = Math.min(CARD_W, window.innerWidth - 24)
    const h = card.current?.offsetHeight ?? 220
    const above = r.bottom + h + 12 > window.innerHeight && r.top - h - 12 > 0
    setPos({
      top: above ? r.top - h - 8 : r.bottom + 8,
      left: Math.max(12, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 12)),
      above
    })
  }
  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  // Close on a tap elsewhere or Escape. On scroll the card follows its word, and closes once the word leaves the screen.
  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => {
      if (!card.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node)) setOpen(false)
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    const scroll = () => place()
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', key)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', key)
      window.removeEventListener('scroll', scroll)
    }
  }, [open])

  if (!entry) return <>{children}</>
  const picture = TERM_PICTURES[id]
  const example = entry.example && entry.example.length <= 190 ? entry.example : null
  return (
    <>
      <button
        ref={btn}
        type="button"
        className="term"
        aria-expanded={open}
        aria-label={`${typeof children === 'string' ? children : entry.term}: what does it mean?`}
        onClick={() => {
          tick()
          setOpen(!open)
        }}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div
            ref={card}
            className={`term-card${pos?.above ? ' above' : ''}`}
            role="dialog"
            aria-label={entry.term}
            style={{ top: pos?.top ?? -9999, left: pos?.left ?? 0, width: Math.min(CARD_W, window.innerWidth - 24) }}
          >
            <p className="tc-term">{entry.term}</p>
            {picture && <div className="tc-picture" aria-hidden="true">{picture}</div>}
            <p className="tc-short">{entry.short}</p>
            {example && <p className="tc-example"><b>On our ride:</b> {example}</p>}
            <a className="tc-more" href={glossaryHref(id)} onClick={() => setOpen(false)}>More in the glossary →</a>
          </div>,
          document.body
        )}
    </>
  )
}
