import { beforeEach, describe, expect, it } from 'vitest'

// A tiny in-memory localStorage, so progress can be read and written under Node.
const store = new Map<string, string>()
;(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k)
  }
}

const { saveStation } = await import('./progress')
const { resumePoint } = await import('./resume')

describe('resumePoint', () => {
  beforeEach(() => store.clear())

  it('starts at Send before anything is done', () => {
    expect(resumePoint()).toMatchObject({ code: 'P01', started: false })
  })

  it('returns to the step last on screen', () => {
    saveStation('P02', { beat: 3, at: 2 })
    expect(resumePoint()).toMatchObject({ code: 'P02', step: 'Learn it', started: true })
  })

  it('ignores a refresher visit to an earlier station', () => {
    saveStation('P02', { beat: 1, at: 1 })
    saveStation('P01', { beat: 4, at: 0, stampedAt: 'today' })
    expect(resumePoint()).toMatchObject({ code: 'P02', step: 'Try it' })
  })

  it('moves on to the next lesson once the furthest one is stamped', () => {
    saveStation('P01', { beat: 4, at: 4, stampedAt: 'today' })
    expect(resumePoint()).toMatchObject({ code: 'P02', step: 'Arrive' })
  })

  it('keeps going forward even when an earlier stamp was skipped', () => {
    saveStation('P01', { beat: 4, at: 4 })
    saveStation('P02', { beat: 2, at: 2 })
    expect(resumePoint().code).toBe('P02')
  })
})
