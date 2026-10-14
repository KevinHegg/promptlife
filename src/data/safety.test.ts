import { describe, expect, it } from 'vitest'
import { isClean } from '../lib/safeText'
import { phase1 } from './phase1'
import { trace } from './trace'

/** Every piece of model-written text the app can put on screen. */
function shownTexts(): string[] {
  const texts: string[] = []
  for (const r of phase1.temperatureRuns) texts.push(r.text)
  if (phase1.freeFirstTurn) texts.push(phase1.freeFirstTurn.text)
  if (phase1.freeFirstTurnNudged) texts.push(phase1.freeFirstTurnNudged.text)
  if (phase1.letters) texts.push(phase1.letters.firstTurnGreedy.text)
  for (const v of phase1.votePositions) texts.push(...v.top.slice(0, 6).map((c) => c.text))
  for (const t of phase1.beat.thinkLike) texts.push(...t.top.slice(0, 25).map((g) => g.text))
  for (const s of phase1.beat.sentences) texts.push(...s.top.slice(0, 25).map((g) => g.text))
  if (trace) for (const s of trace.steps) texts.push(s.top[0]?.text ?? '')
  return texts
}

describe('content safety', () => {
  it('the filter catches what it should and spares ordinary words', () => {
    expect(isClean('analysis of the flour')).toBe(true)
    expect(isClean('Middlesex dickens')).toBe(true)
    expect(isClean('a masturbating method')).toBe(false)
  })

  it('no recorded model text shown on screen contains blocked words', () => {
    const bad = shownTexts().filter((t) => !isClean(t))
    expect(bad).toEqual([])
  })
})
