import { STATIONS } from '../data/network'
import { BEAT_LABELS, beatsFor } from '../loop/types'
import { LOOPS } from '../stations'
import { readStations } from './progress'

/** complete: the last lesson is stamped, so there is nothing left to resume. */
export type ResumePoint = { code: string; name: string; step: string; started: boolean; complete: boolean }

/**
 * Where to pick up: your furthest lesson, at the step you last had on screen. If that lesson is
 * stamped, the next lesson. Going back for a refresher never moves this point.
 */
export function resumePoint(): ResumePoint {
  const progress = readStations()
  const lessons = STATIONS.filter((s) => LOOPS[s.code])
  let i = -1
  lessons.forEach((s, k) => {
    if (progress[s.code]) i = k
  })
  if (i === -1) return { code: lessons[0].code, name: lessons[0].name, step: BEAT_LABELS.arrive, started: false, complete: false }
  // The whole line is done: offer the start again rather than a stamp you already have.
  if (i === lessons.length - 1 && progress[lessons[i].code]?.stampedAt)
    return { code: lessons[0].code, name: lessons[0].name, step: BEAT_LABELS.arrive, started: true, complete: true }
  if (progress[lessons[i].code]?.stampedAt && lessons[i + 1]) i++
  const s = lessons[i]
  const p = progress[s.code]
  const beats = beatsFor(LOOPS[s.code])
  const at = p?.stampedAt ? beats.length - 1 : Math.min(p?.at ?? p?.beat ?? 0, beats.length - 1)
  return { code: s.code, name: s.name, step: BEAT_LABELS[beats[at]], started: true, complete: false }
}
