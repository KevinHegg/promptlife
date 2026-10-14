import { describe, expect, it } from 'vitest'
import { attentionViewsFromTrace, floorsFromTrace, trace, voteFromTrace } from './trace'

describe.runIf(trace)('recorded trace adapters', () => {
  const t = trace!

  it('labels every token with a source and has a step for every generated token', () => {
    expect(t.tokens.every((tok) => ['special', 'sys', 'rag', 'user', 'tool', 'res', 'rep'].includes(tok.src))).toBe(true)
    const generated = t.tokens.filter((tok) => tok.src === 'tool' || tok.src === 'rep').length
    expect(t.steps.length).toBeGreaterThanOrEqual(generated)
  })

  it('shows one view per head, real weights, query last', () => {
    const views = attentionViewsFromTrace(t)
    expect(views.length).toBeGreaterThanOrEqual(3)
    expect(new Set(views.map((v) => v.name)).size).toBe(views.length)
    for (const v of views) {
      expect(v.real).toBe(true)
      expect(v.tokens.at(-1)?.text).toBe(v.query)
      expect(v.tokens.every((tok) => tok.w >= 0 && tok.w <= 1)).toBe(true)
    }
  })

  it('reads floors top-first, ending on the model’s final guess', () => {
    const f = floorsFromTrace(t)!
    expect(f.floors.length).toBeGreaterThanOrEqual(4)
    expect(f.floors[0].layer).toBe(t.model.layers)
    expect(f.floors[0].layer).toBeGreaterThan(f.floors.at(-1)!.layer)
  })

  it('picks an undecided reply step for the vote, with descending scores', () => {
    const v = voteFromTrace(t)!
    const logits = v.candidates.map((c) => c.logit)
    expect(logits).toEqual([...logits].sort((a, b) => b - a))
    expect(v.candidates.length).toBeGreaterThanOrEqual(3)
  })
})
