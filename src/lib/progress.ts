/**
 * Progress kept on this device only: stations visited, the beat you reached, stamps earned
 * and receipt lines collected. Storage can be unavailable, so every access is guarded.
 */
const VISITED = 'promptlife.v1.visited'
const STATIONS = 'promptlife.v1.stations'

/** beat: the furthest step reached. at: the step last on screen, for resuming. */
export type StationProgress = { beat: number; at?: number; stampedAt?: string }

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

/**
 * Start over: forget everything this app stored on this device (stamps, steps, hints and the sound
 * setting), so the next person on a shared phone starts fresh.
 */
export function resetProgress() {
  try {
    const keys: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k?.startsWith('promptlife.')) keys.push(k)
    }
    keys.forEach((k) => window.localStorage.removeItem(k))
  } catch {
    /* nothing to reset */
  }
}
