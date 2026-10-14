import { describe, expect, it } from 'vitest'
import { sample, softmax, topP } from './softmax'

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

describe('softmax', () => {
  it('turns scores into probabilities that add up to 1', () => {
    const p = softmax([6.1, 3.2, 2.9, 1.4, 0.6])
    expect(sum(p)).toBeCloseTo(1, 10)
    expect(p[0]).toBeGreaterThan(p[1])
  })

  it('matches hand-computed values (the old app showed 72/18/6/4% for these scores)', () => {
    const p = softmax([5.8, 2.1, -1.2, -2.0]).map((v) => Math.round(v * 10000) / 100)
    expect(p).toEqual([97.46, 2.41, 0.09, 0.04])
  })

  it('sharpens at low temperature and flattens at high temperature', () => {
    const z = [6.1, 3.2, 2.9]
    const cold = softmax(z, 0.3)[0]
    const warm = softmax(z, 1)[0]
    const hot = softmax(z, 2)[0]
    expect(cold).toBeGreaterThan(warm)
    expect(warm).toBeGreaterThan(hot)
  })

  it('treats temperature 0 as always picking the top score', () => {
    expect(softmax([1, 5, 3], 0)).toEqual([0, 1, 0])
  })

  it('stays finite for very large scores', () => {
    const p = softmax([1000, 999], 0.1)
    expect(p.every(Number.isFinite)).toBe(true)
    expect(sum(p)).toBeCloseTo(1, 10)
  })
})

describe('topP', () => {
  it('keeps the smallest top set reaching p and renormalizes', () => {
    const p = topP([0.5, 0.3, 0.15, 0.05], 0.75)
    expect(p[2]).toBe(0)
    expect(p[3]).toBe(0)
    expect(p[0]).toBeCloseTo(0.625)
    expect(sum(p)).toBeCloseTo(1)
  })
})

describe('sample', () => {
  it('maps a random number onto the cumulative distribution', () => {
    const p = [0.2, 0.5, 0.3]
    expect(sample(p, 0.1)).toBe(0)
    expect(sample(p, 0.69)).toBe(1)
    expect(sample(p, 0.99)).toBe(2)
  })
})
