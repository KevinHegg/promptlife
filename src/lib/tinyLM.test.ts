import { describe, expect, it } from 'vitest'
import { TinyLM } from './tinyLM'
import { ARC, BOX, PAGES, START } from '../cutaway/stations/AcademyTrainer'

const trained = (text: string, rounds: number) => {
  const m = new TinyLM(text)
  for (let i = 0; i < rounds; i++) m.step()
  return m
}

describe('TinyLM, the Academy’s tiny model', () => {
  it('writes the exact lines the Academy shows at each round', () => {
    const m = new TinyLM(BOX)
    let done = 0
    for (const a of ARC) {
      while (done < a.rounds) {
        m.step()
        done++
      }
      expect(m.write(START, 90).startsWith(a.text)).toBe(true)
    }
  })

  it('learns: the chance of the right next letter rises from about 3% to over 80%', () => {
    const m = new TinyLM(BOX)
    const before = m.chance()
    for (let i = 0; i < 1500; i++) m.step()
    expect(before).toBeLessThan(0.05)
    expect(m.chance()).toBeGreaterThan(0.8)
  })

  it('Break it: each set of pages does what its verdict says (800 rounds)', () => {
    const page = (id: string) => PAGES.find((p) => p.id === id)!.text()
    const typo = trained(page('typo'), 800).write(START, 220)
    expect(typo.split('flower').length - 1).toBeGreaterThan(0)
    expect(typo.replace(/flower/g, '').includes('flour')).toBe(false)
    expect(trained(page('one'), 800).chance()).toBeGreaterThan(0.85)
    const scrambled = trained(page('scrambled'), 800)
    expect(scrambled.write(START, 220)).not.toMatch(/grandma|cup|flour|butter/)
  })
})
