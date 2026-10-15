import { describe, it, expect } from 'vitest'
import { isClean } from '../lib/safeText'
import { GLOSSARY, type GlossaryEntry } from './glossary'

const STATIONS = ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08', 'L', 'W', 'G', 'A', 'S', 'D', 'R']
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

/** Every piece of text a student can read in an entry. */
function texts(e: GlossaryEntry): string[] {
  return [e.term, ...(e.aka ?? []), e.short, ...e.deeper, ...(e.example ? [e.example] : [])]
}

describe('glossary structure', () => {
  it('has unique kebab-case ids', () => {
    const ids = GLOSSARY.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('links only to entries that exist, never to itself', () => {
    const ids = new Set(GLOSSARY.map((e) => e.id))
    for (const e of GLOSSARY) {
      for (const r of e.related ?? []) {
        expect(ids.has(r), `${e.id} → ${r}`).toBe(true)
        expect(r, `${e.id} links to itself`).not.toBe(e.id)
      }
    }
  })

  it('places every term at a station or side line', () => {
    for (const e of GLOSSARY) expect(STATIONS, e.id).toContain(e.station)
  })

  it('runs in journey order: P01 to P08, then the side lines', () => {
    const order = GLOSSARY.map((e) => STATIONS.indexOf(e.station))
    for (let i = 1; i < order.length; i++) expect(order[i], GLOSSARY[i].id).toBeGreaterThanOrEqual(order[i - 1])
  })
})

describe('glossary length limits', () => {
  it('keeps each short answer to 30 words or fewer', () => {
    for (const e of GLOSSARY) expect(words(e.short), e.id).toBeLessThanOrEqual(30)
  })

  it('goes deeper in 2 to 4 paragraphs of 70 words or fewer', () => {
    for (const e of GLOSSARY) {
      expect(e.deeper.length, e.id).toBeGreaterThanOrEqual(2)
      expect(e.deeper.length, e.id).toBeLessThanOrEqual(4)
      e.deeper.forEach((p, i) => expect(words(p), `${e.id} paragraph ${i + 1}`).toBeLessThanOrEqual(70))
    }
  })
})

describe('glossary voice', () => {
  it('passes the content filter everywhere', () => {
    for (const e of GLOSSARY) for (const t of texts(e)) expect(isClean(t), `${e.id}: ${t}`).toBe(true)
  })

  it('follows the story bible: curly quotes, no exclamation points, no “simply/just/obviously/magic”', () => {
    for (const e of GLOSSARY) {
      for (const t of texts(e)) {
        expect(t, e.id).not.toMatch(/["'!]/)
        expect(t, e.id).not.toMatch(/\b(simply|just|obviously|magic)\b/i)
      }
    }
  })
})
