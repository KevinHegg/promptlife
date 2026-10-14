import { describe, expect, it } from 'vitest'
import { phase1, voteProbs } from './phase1'
import { RUN, runCounts, textOf } from './run'
import { trace } from './trace'

describe.runIf(trace)('the recorded run the map plays', () => {
  it('accounts for every token exactly once', () => {
    const placed = [...RUN.wrapper, ...RUN.passages, ...RUN.question, ...RUN.genPrompt, ...RUN.turns.flatMap((t) => t.steps.map((s) => s.i)), ...RUN.bridges.flat()]
    const trailing = RUN.tokens.length - placed.length
    expect(new Set(placed).size).toBe(placed.length)
    expect(trailing).toBeGreaterThanOrEqual(0)
    expect(trailing).toBeLessThanOrEqual(2)
  })

  it('makes one trip per generated token, tool call first, reply last', () => {
    expect(RUN.trips).toBe(trace!.steps.length)
    expect(RUN.turns.map((t) => t.kind)).toEqual(['tool', 'reply'])
    expect(runCounts.toolTrips + runCounts.replyTrips).toBe(RUN.trips)
  })

  it('spells out the scripted reply', () => {
    expect(textOf(RUN.turns[1].steps)).toBe('You need at least 93.75% on the final to get an A-.')
  })

  it('records that the model did not choose the tool call on its own', () => {
    const first = RUN.turns[0].steps[0]
    expect(first.rank).toBeGreaterThan(1)
    expect(first.favorite).not.toBe(first.text)
  })
})

describe('vote odds with the vocabulary tail', () => {
  it('add up to 1 at every temperature', () => {
    for (const v of phase1.votePositions) {
      for (const T of [0, 0.5, 1, 2]) {
        const { top, rest } = voteProbs(v, T)
        expect(top.reduce((a, b) => a + b, 0) + rest).toBeCloseTo(1, 6)
      }
    }
  })

  it('match the recorded probability of the chosen token at temperature 1', () => {
    for (const v of phase1.votePositions) {
      const i = v.top.findIndex((c) => c.text === v.chosen.text)
      if (i < 0) continue
      expect(voteProbs(v, 1).top[i]).toBeCloseTo(v.chosen.prob, 2)
    }
  })

  it('give the favorite everything at temperature 0', () => {
    for (const v of phase1.votePositions) {
      const { top, rest } = voteProbs(v, 0)
      expect(Math.max(...top)).toBe(1)
      expect(rest).toBe(0)
    }
  })
})
