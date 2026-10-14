/**
 * Optional sound, off until the student turns it on: a short two-note chime per station
 * (in the spirit of Tokyo's platform melodies) and a soft thunk when a stamp lands.
 * Synthesized with Web Audio, so there are no audio files to load.
 */
const KEY = 'promptlife.v1.sound'
let ctx: AudioContext | null = null
const listeners = new Set<(on: boolean) => void>()

export function soundOn(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

export function setSound(on: boolean) {
  try {
    window.localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* remembered for this page only */
  }
  if (on) audio()
  listeners.forEach((fn) => fn(on))
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, length: number, gain = 0.12) {
  const a = audio()
  if (!a) return
  const osc = a.createOscillator()
  const g = a.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  g.gain.setValueAtTime(0, a.currentTime + start)
  g.gain.linearRampToValueAtTime(gain, a.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + length)
  osc.connect(g).connect(a.destination)
  osc.start(a.currentTime + start)
  osc.stop(a.currentTime + start + length + 0.05)
}

/** Pentatonic steps so every station's chime sounds pleasant next to the others. */
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51]

export function chime(code: string) {
  if (!soundOn()) return
  const n = Math.max(1, parseInt(code.slice(1), 10) || 1)
  tone(SCALE[(n - 1) % SCALE.length], 0, 0.5)
  tone(SCALE[(n + 1) % SCALE.length], 0.18, 0.7, 0.1)
}

export function thunk() {
  if (!soundOn()) return
  tone(110, 0, 0.18, 0.25)
  tone(220, 0, 0.08, 0.08)
}
