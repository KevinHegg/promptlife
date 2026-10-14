/**
 * Progress kept on this device only: stations visited, the beat you reached, stamps earned
 * and receipt lines collected. Storage can be unavailable, so every access is guarded.
 */
const VISITED = 'promptlife.v1.visited'
const STATIONS = 'promptlife.v1.stations'

export type StationProgress = { beat: number; stampedAt?: string }

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: progress simply isn't remembered */
  }
}

export function readVisited(): Set<string> {
  return new Set(read<string[]>(VISITED, []))
}

export function markVisited(code: string) {
  const v = readVisited()
  v.add(code)
  write(VISITED, [...v])
}

export function readStations(): Record<string, StationProgress> {
  return read<Record<string, StationProgress>>(STATIONS, {})
}

export function readStation(code: string): StationProgress {
  return readStations()[code] ?? { beat: 0 }
}

export function saveStation(code: string, p: StationProgress) {
  const all = readStations()
  all[code] = { ...all[code], ...p }
  write(STATIONS, all)
}

export function resetProgress() {
  try {
    window.localStorage.removeItem(VISITED)
    window.localStorage.removeItem(STATIONS)
  } catch {
    /* nothing to reset */
  }
}
