/**
 * Optional sound, off until the student turns it on. The palette is the Cozy pack from Kevin Hegg's
 * Hungry Wolf: sine and triangle only, every pitch from C major pentatonic between C4 and A5, soft
 * attacks, highs rolled off at 4 kHz, and one warm room shared by every sound. All synthesized with
 * Web Audio, so there are no files to load.
 *
 * Each station has its own singing-bowl note, rising as the train travels (Send is C4, Reply is E5),
 * in the spirit of Tokyo's platform melodies.
 */
const KEY = 'promptlife.v1.sound'
const listeners = new Set<(on: boolean) => void>()
let context: AudioContext | null = null
let room: { audio: AudioContext; input: GainNode } | null = null

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
  listeners.forEach((fn) => fn(on))
  if (on) play(GATE)
  else reset()
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// ---------- the Cozy palette ----------

const NOTE = { C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880 } as const
type Note = keyof typeof NOTE
type Part = { note: Note; ratio: number; detune: number; type: OscillatorType; level: number; at: number; attack: number; decay: number }

const part = (note: Note, o: Partial<Part> = {}): Part => ({ note, ratio: 1, detune: 0, type: 'sine', level: 1, at: 0, attack: 0.014, decay: 0.25, ...o })
/** A mini singing bowl: inharmonic partials, each as two oscillators 1 Hz apart so they beat, highs fading first. */
const BOWL: [number, number, number][] = [[1, 1, 0.7], [2.8, 0.45, 0.38], [5.2, 0.25, 0.2], [8.1, 0.12, 0.1]]
const bowl = (note: Note, at = 0, level = 1): Part[] => BOWL.flatMap(([ratio, share, decay]) => [-1, 1].map((detune) => part(note, { ratio, detune, level: (share * level) / 2, at, decay })))
/** A soft wooden tick: a short high tone over a quieter body an octave below. */
const woodTick = (high: Note, low: Note): Part[] => [part(high, { attack: 0.01, decay: 0.05 }), part(low, { type: 'triangle', level: 0.4, attack: 0.01, decay: 0.035 })]
const notes = (list: Note[], o: Partial<Part> & { step?: number }): Part[] => list.map((note, i) => part(note, { ...o, at: i * (o.step ?? 0) }))
/** A soft wooden flute: a gently rising sine with a faint triangle for the wood. */
const flute = (note: Note): Part[] => [part(note, { attack: 0.04, decay: 0.2 }), part(note, { type: 'triangle', level: 0.12, attack: 0.04, decay: 0.12 })]

/** One bowl note per station, rising along the line. */
const STATION_NOTES: Note[] = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5']
const GATE = [...bowl('C4'), part('G4', { at: 0.09, level: 0.5, decay: 0.5 })]
const TICK = woodTick('C5', 'C4')
const DEPART = [part('C4', { attack: 0.3, decay: 0.9 }), part('G4', { at: 0.25, level: 0.7, attack: 0.3, decay: 0.8 }), part('E5', { at: 0.5, level: 0.4, attack: 0.3, decay: 0.6 })]
const YES = [part('E4', { decay: 0.25, attack: 0.02 }), part('A4', { at: 0.12, decay: 0.35, attack: 0.02 })]
const NOT_QUITE = [part('D4', { type: 'triangle', level: 0.6, attack: 0.02, decay: 0.22 })]
const STAMP = [...notes(['C4', 'E4', 'G4', 'C5'], { step: 0.12, attack: 0.015, decay: 0.45, level: 0.7 }), ...bowl('C4', 0.36)]
const LEVER = [part('C4', { type: 'triangle', level: 0.7, attack: 0.03, decay: 0.5 }), part('D4', { level: 0.5, attack: 0.03, decay: 0.5 })]
const OPEN = flute('G4')
const PIP = woodTick('G5', 'G4')
const STOP_TICK = woodTick('E5', 'E4')

// ---------- playback ----------

/** Every sound is scaled to the same peak, measured once from its recipe. */
const PEAK = 0.22
const peaks = new Map<Part[], number>()
function peakOf(recipe: Part[], rate = 22050) {
  const length = Math.ceil(rate * Math.max(...recipe.map((p) => p.at + p.attack + p.decay + 0.03)))
  let peak = 0
  for (let i = 0; i < length; i++) {
    const t = i / rate
    let value = 0
    for (const p of recipe) {
      const local = t - p.at
      if (local < 0) continue
      const phase = 2 * Math.PI * (NOTE[p.note] * p.ratio + p.detune) * local
      const wave = p.type === 'sine' ? Math.sin(phase) : (2 / Math.PI) * Math.asin(Math.sin(phase))
      const env = local < p.attack ? local / p.attack : local < p.attack + p.decay ? 0.001 ** ((local - p.attack) / p.decay) : Math.max(0, 0.001 * (1 - (local - p.attack - p.decay) / 0.03))
      value += p.level * wave * env
    }
    peak = Math.max(peak, Math.abs(value))
  }
  return peak || 1
}

/** A short, dark room from a fixed seed, so it sounds the same on every visit. */
function roomFor(audio: AudioContext) {
  if (room?.audio === audio) return room.input
  const input = audio.createGain()
  const warm = audio.createBiquadFilter()
  const dry = audio.createGain()
  const wet = audio.createGain()
  const reverb = audio.createConvolver()
  warm.type = 'lowpass'
  warm.frequency.value = 4000
  warm.Q.value = 0.5
  dry.gain.value = 0.8
  wet.gain.value = 0.2
  const length = Math.floor(audio.sampleRate * 1.6)
  const impulse = audio.createBuffer(2, length, audio.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    let seed = 97 + channel * 31
    let low = 0
    for (let i = 0; i < length; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0
      low += 0.35 * ((seed / 4294967296) * 2 - 1 - low)
      data[i] = low * Math.exp((-4.2 * i) / length)
    }
  }
  reverb.buffer = impulse
  input.connect(warm)
  warm.connect(dry)
  dry.connect(audio.destination)
  warm.connect(reverb)
  reverb.connect(wet)
  wet.connect(audio.destination)
  room = { audio, input }
  return input
}

function reset() {
  const old = context
  context = null
  room = null
  if (old && old.state !== 'closed') old.close().catch(() => {})
}

/**
 * Get a running AudioContext, created or resumed inside a real tap. On iPhone, sound you turned on
 * plays through the media route, like Hungry Wolf, so it is heard even with the ringer switch off.
 */
function wake(): Promise<AudioContext | null> {
  if (typeof window === 'undefined' || !soundOn()) return Promise.resolve(null)
  try {
    const session = (navigator as unknown as { audioSession?: { type: string } }).audioSession
    if (session) session.type = 'playback'
    if (!context || context.state === 'closed' || (context.state as string) === 'interrupted') {
      reset()
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return Promise.resolve(null)
      context = new AC()
      // Prime the output while still inside the gesture.
      const source = context.createBufferSource()
      source.buffer = context.createBuffer(1, 1, context.sampleRate)
      source.connect(context.destination)
      source.start(0)
    }
    const current = context
    const ready = current.state === 'running' ? Promise.resolve() : current.resume()
    return ready.then(() => (current === context && current.state === 'running' ? current : null)).catch(() => null)
  } catch {
    return Promise.resolve(null)
  }
}

const lastAt = new Map<Part[], number>()
/** gain scales a sound below the shared peak, for quiet background cues. */
function play(recipe: Part[], delay = 0, gain = 1) {
  if (!soundOn()) return
  // Taps and pips in quick succession don't stack into a clatter.
  const now = performance.now()
  if ((recipe === TICK || recipe === PIP) && now - (lastAt.get(recipe) ?? 0) < 90) return
  lastAt.set(recipe, now)
  void wake().then((audio) => {
    if (!audio) return
    if (!peaks.has(recipe)) peaks.set(recipe, peakOf(recipe))
    const input = roomFor(audio)
    const start = audio.currentTime + 0.012 + delay
    const scale = (PEAK * gain) / (peaks.get(recipe) ?? 1)
    for (const p of recipe) {
      // Gain always ramps from silence and back; it never jumps, so there are no clicks.
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      const at = start + p.at
      const top = p.level * scale
      const end = at + p.attack + p.decay
      osc.type = p.type
      osc.frequency.setValueAtTime(NOTE[p.note] * p.ratio + p.detune, at)
      gain.gain.setValueAtTime(0, at)
      gain.gain.linearRampToValueAtTime(top, at + p.attack)
      gain.gain.exponentialRampToValueAtTime(top * 0.001, end)
      gain.gain.linearRampToValueAtTime(0, end + 0.03)
      osc.connect(gain)
      gain.connect(input)
      osc.start(at)
      osc.stop(end + 0.04)
      osc.onended = () => {
        osc.disconnect()
        gain.disconnect()
      }
    }
  })
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Back from a call, the lock screen or another tab: start a fresh output on the next tap.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) reset()
  })
  window.addEventListener('pagehide', reset)
  const unlock = () => {
    if (soundOn()) void wake()
  }
  document.addEventListener('pointerup', unlock, { passive: true })
  document.addEventListener('touchend', unlock, { passive: true })
}

// ---------- what the app plays ----------

/** Arriving at a station: its own bowl note. Quieter (gain < 1) when the train only passes through. */
export function chime(code: string, gain = 1) {
  if (!/^P0[1-8]$/.test(code)) return
  const n = parseInt(code.slice(1), 10)
  play(STATION_BOWLS[n - 1], 0, gain)
}
const STATION_BOWLS = STATION_NOTES.map((n) => bowl(n))

/** A step forward or back, a choice, a tab. */
export const tick = () => play(TICK)
/** The train pulls out toward the next station. */
export const depart = () => play(DEPART)
/** A right answer. */
export const yes = () => play(YES)
/** Not that one: a single soft low note, never a buzzer. */
export const notQuite = () => play(NOT_QUITE)
/** A stamp lands. */
export const stampSound = () => play(STAMP)
/** A Break it lever thrown. */
export const lever = () => play(LEVER)
/** A die-cut window opens onto the level below. */
export const open = () => play(OPEN)
/** On the map ride: a side-line stop goes by. */
export const passStop = () => play(STOP_TICK, 0, 0.6)
/** On the map ride: one more token joins during the quick repeat trips. */
export const pip = () => play(PIP, 0, 0.3)
/** On the map ride: the answer arrives. */
export const rideEnd = () => play(STAMP, 0, 0.85)
