/** Visited stations, kept on this device only. Storage can be unavailable, so every access is guarded. */
const KEY = 'promptlife.v1.visited'

export function readVisited(): Set<string> {
  try {
    const raw = window.localStorage.getItem(KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function markVisited(code: string) {
  try {
    const v = readVisited()
    v.add(code)
    window.localStorage.setItem(KEY, JSON.stringify([...v]))
  } catch {
    /* storage unavailable: progress simply isn't remembered */
  }
}
