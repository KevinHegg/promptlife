import { describe, expect, it } from 'vitest'
import { academyRun } from './academy'

// The Academy's fine-tuning step quotes these; keep them true to the recording.
describe('Academy recording: base versus fine-tuned', () => {
  it('only the fine-tuned model asks for the calculator', () => {
    expect(academyRun('base', 'tools')!.toolCallProb).toBeLessThan(0.0001)
    expect(academyRun('base', 'tools')!.text.startsWith('{"name": "calculator", "arguments": {"expression": "2 * (3 + 4)"}}')).toBe(true)
    expect(academyRun('base', 'tools')!.text.split('itant').length - 1).toBeGreaterThan(50)
    expect(academyRun('instruct', 'tools')!.toolCallProb).toBeCloseTo(0.75, 2)
    expect(academyRun('instruct', 'tools')!.stoppedNaturally).toBe(true)
  })
  it('only the fine-tuned model knows its turn is over', () => {
    const base = academyRun('base', 'plain')!
    expect(base.stoppedNaturally).toBe(false)
    expect(base.stopProbAfterAnswer).toBeLessThan(0.0001)
    expect(base.inventedQuestion).toBe('Using my grandmother\'s recipe card, how much butter do I need to make 30 biscuits?')
    expect(base.text.slice(0, base.answerEnd)).toContain('63 cups')
    const ft = academyRun('instruct', 'plain')!
    expect(ft.stoppedNaturally).toBe(true)
    expect(ft.stopProbAfterAnswer).toBeGreaterThan(0.9)
    expect(ft.text).toContain('60 cups')
  })
})
