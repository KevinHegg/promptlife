import { describe, expect, it } from 'vitest'
import { thinkRuns, thinkStats } from './scratchpad'

// The Scratchpad quotes these; keep them true to the recording.
describe('Scratchpad recording', () => {
  it('thinking helps a little, at many more tokens', () => {
    expect(thinkStats('off')).toMatchObject({ runs: 10, correct: 0 })
    expect(thinkStats('budget-64')).toMatchObject({ correct: 1, cutOff: 5 })
    expect(thinkStats('budget-256')).toMatchObject({ correct: 1 })
    expect(thinkRuns('budget-256').filter((r) => r.cutShort)).toHaveLength(9)
    expect(thinkStats('on')).toMatchObject({ runs: 10, correct: 3 })
    expect(thinkStats('off').meanTokens).toBe(75)
    expect(thinkStats('on').meanTokens).toBe(966)
  })
  it('a right answer can carry wrong working', () => {
    const r = thinkRuns('on').find((x) => x.seed === 6)!
    expect(r.correct).toBe(true)
    expect(r.answer).toContain('8 15/16')
    expect(r.answer).toContain('8.4375')
  })
})
