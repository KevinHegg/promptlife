import { describe, expect, it } from 'vitest'
import { diffusionRun, flourRight, patchSizes } from './darkroom'

// The Darkroom quotes these; keep them true to the recording.
describe('Darkroom recording', () => {
  const by = (w: number) => patchSizes().find((s) => s.width === w)!
  it('a picture costs far more tokens than its words, and shrinking it blurs the reading', () => {
    expect(patchSizes().map((s) => s.tokens)).toEqual([860, 210, 55, 10])
    expect(flourRight(by(1200))).toBe(true)
    expect(by(600).answers.flour.text).toContain('2.14 cups')
    expect(flourRight(by(300))).toBe(true)
    expect(by(150).answers.flour.text).toContain('2 cups')
    expect(by(150).answers.read.text).toContain('Butterly')
    expect(by(150).answers.read.text).toMatch(/brown sugar/)
    for (const w of [1200, 300]) expect(by(w).answers.read.text).toMatch(/Instructions:/)
    expect(by(600).answers.read.text).toContain('Bake at 425°F')
  })
  it('has every diffusion frame', () => {
    for (const id of ['prompt', 'prompt-seed2', 'no-steering']) expect(diffusionRun(id)?.frames).toHaveLength(31)
  })
})
