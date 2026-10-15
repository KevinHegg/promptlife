/**
 * Drives the living map: moves the train along motion paths, lights lamps and lines,
 * and reports board/platform state through onChange. Framework-free on purpose:
 * the train moves every frame, so it touches the SVG directly instead of re-rendering React.
 *
 * Calm by design: the camera pans only between areas of the map (never chasing the train),
 * the first trips are animated slowly, and repeated trips become a quick chase of lamps
 * while the train waits at The Loop.
 */
import { MAIN_Y, STOPS, STOP_NAMES, stationByCode, type MotionKey } from '../data/network'
import type { Src } from '../data/heroRun'
import { runCounts, type RunScript, type RunStep } from '../data/run'
import { STORY } from '../data/story'
import { trace } from '../data/trace'

export type PlatformToken = { i: number; src: Src; text: string; fresh: boolean }

export type RunSnapshot = {
  trip: number
  totalTrips: number
  station: string
  caption: string
  toolText: string
  replyText: string
  tokens: PlatformToken[]
  playing: boolean
  done: boolean
  /** How far through the ride, 0 to 1. */
  progress: number
}

type Step = {
  kind: 'pause' | 'move'
  dur: number
  enter?: () => void
  update?: (t: number) => void
  started?: boolean
  elapsed?: number
}

type Pass = { f: number; fn: () => void; done?: boolean }

const isMarker = (text: string) => /^<\|.*\|>$/.test(text)

/** Where the camera rests for each part of the trip (map x). */
const FRAME = { send: 200, line: 690 }

export class RunEngine {
  private svg: SVGSVGElement
  private scroller: HTMLElement | null
  private run: RunScript
  private onChange: (s: RunSnapshot) => void
  private reduce: boolean
  private paths: Record<string, SVGPathElement> = {}
  private lens: Record<string, number> = {}
  private train: SVGGElement | null
  private steps: Step[] = []
  private idx = 0
  private lastTs = 0
  private raf = 0
  private lastSetLeft = -1
  private userScrollAt = 0
  /** Camera: a fixed map x to rest on, or follow the train. Eased every frame, never jumped. */
  private camX: number | null = null
  private camFollow = false
  private trainX = 70
  private sinceEmit = 0
  private fracs: Record<string, number> = {}
  private timers: number[] = []
  private present = new Set<number>()
  private fresh = new Set<number>()
  private state: RunSnapshot

  constructor(opts: { svg: SVGSVGElement; scroller?: HTMLElement | null; run: RunScript; onChange: (s: RunSnapshot) => void }) {
    this.svg = opts.svg
    this.scroller = opts.scroller ?? null
    this.run = opts.run
    this.onChange = opts.onChange
    this.reduce = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    this.train = this.svg.querySelector('[data-train]')
    this.svg.querySelectorAll<SVGPathElement>('[data-motion]').forEach((p) => {
      const key = p.dataset.motion as string
      this.paths[key] = p
      this.lens[key] = p.getTotalLength()
    })
    for (const stop of STOPS) {
      if (stop.line === 'L') this.fracs[stop.code] = this.fracOf('lib', stop.x, stop.y)
      if (stop.line === 'W') this.fracs[stop.code] = this.fracOf('work', stop.x, stop.y)
    }
    this.scroller?.addEventListener('scroll', this.onScroll, { passive: true })
    this.state = this.blankState()
    this.reset()
  }

  get reducedMotion() {
    return this.reduce
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    this.timers.forEach((t) => window.clearTimeout(t))
    this.scroller?.removeEventListener('scroll', this.onScroll)
  }

  /* ---------------- public controls ---------------- */

  play() {
    if (this.state.done) this.reset()
    this.state.playing = true
    this.lastTs = 0
    this.emit()
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(this.tick)
  }

  pause() {
    this.state.playing = false
    cancelAnimationFrame(this.raf)
    this.emit()
  }

  restart() {
    this.reset()
    this.play()
  }

  /** Finish the current step, then fast-forward to the next narrated stop. */
  next() {
    if (this.state.done) this.reset()
    this.pause()
    let guard = 0
    do {
      const s = this.steps[this.idx]
      if (!s) break
      this.startStep(s)
      s.elapsed = this.dur(s)
      s.update?.(1)
      this.idx++
      guard++
    } while (this.idx < this.steps.length && (this.steps[this.idx].kind !== 'pause' || this.steps[this.idx].dur < 1200) && guard < 2000)
    if (this.idx < this.steps.length) this.startStep(this.steps[this.idx])
    else this.finish()
    this.updateCamera(5000)
    this.emit()
  }

  /* ---------------- state ---------------- */

  private blankState(): RunSnapshot {
    return {
      trip: 0,
      totalTrips: this.run.trips,
      station: 'P01 · SEND',
      caption: STORY.waiting,
      toolText: '',
      replyText: '',
      tokens: [],
      playing: false,
      done: false,
      progress: 0
    }
  }

  private emit() {
    const tokens: PlatformToken[] = [...this.present]
      .sort((a, b) => a - b)
      .map((i) => ({ i, src: this.run.tokens[i].src, text: this.run.tokens[i].text, fresh: this.fresh.has(i) }))
    this.onChange({ ...this.state, tokens, progress: this.progress() })
  }

  private add(positions: number[]) {
    this.fresh = new Set(positions)
    positions.forEach((i) => this.present.add(i))
  }

  private caption(text: string) {
    this.state.caption = text
  }

  private pick(kind: 'tool' | 'reply', step: RunStep) {
    if (isMarker(step.text)) return
    if (kind === 'tool') this.state.toolText += step.text
    else this.state.replyText += step.text
  }

  /* ---------------- camera ---------------- */

  private onScroll = () => {
    const sc = this.scroller
    if (sc && Math.abs(sc.scrollLeft - this.lastSetLeft) > 2) this.userScrollAt = performance.now()
  }

  /** Rest the camera on an area of the map. */
  private frame(x: number) {
    this.camX = x
    this.camFollow = false
  }

  /** Let the camera trail the train (used on long, one-way stretches). */
  private follow() {
    this.camFollow = true
  }

  /**
   * Ease the map's scroll toward the camera target with a slow, steady time constant, so motion
   * never jumps or reverses abruptly. Does nothing when the whole map fits, or for 4 s after the
   * student scrolls it by hand.
   */
  private updateCamera(dt: number) {
    const sc = this.scroller
    if (!sc || sc.scrollWidth <= sc.clientWidth + 2) return
    if (performance.now() - this.userScrollAt < 4000) return
    const x = this.camFollow ? this.trainX : this.camX
    if (x === null) return
    const vb = this.svg.viewBox.baseVal
    const scale = this.svg.getBoundingClientRect().width / (vb?.width || 1120)
    const target = Math.max(0, Math.min(sc.scrollWidth - sc.clientWidth, x * scale - sc.clientWidth / 2))
    const k = this.reduce ? 1 : 1 - Math.exp(-dt / 700)
    const next = sc.scrollLeft + (target - sc.scrollLeft) * k
    if (Math.abs(next - sc.scrollLeft) < 0.3) return
    sc.scrollLeft = next
    this.lastSetLeft = sc.scrollLeft
  }

  private fracOf(key: string, x: number, y: number) {
    const p = this.paths[key]
    const L = this.lens[key]
    if (!p) return 0
    let best = 0
    let bd = Infinity
    for (let i = 0; i <= 400; i++) {
      const pt = p.getPointAtLength((L * i) / 400)
      const d = (pt.x - x) ** 2 + (pt.y - y) ** 2
      if (d < bd) {
        bd = d
        best = i / 400
      }
    }
    return best
  }

  private parkAtSend() {
    this.trainX = 70
    this.train?.setAttribute('transform', `translate(70,${MAIN_Y})`)
  }

  private placeTrain(key: MotionKey, f: number) {
    const p = this.paths[key]
    const L = this.lens[key]
    if (!p || !this.train) return
    f = Math.max(0, Math.min(1, f))
    const a = p.getPointAtLength(L * f)
    const ahead = f < 0.995
    const b = p.getPointAtLength(L * (ahead ? f + 0.005 : f - 0.005))
    const dx = ahead ? b.x - a.x : a.x - b.x
    const dy = ahead ? b.y - a.y : a.y - b.y
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI
    this.trainX = a.x
    this.train.setAttribute('transform', `translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`)
  }

  /* ---------------- lamps ---------------- */

  private lamp(code: string) {
    return this.svg.querySelector<SVGElement>(`[data-lamp="${code}"]`)
  }

  private stationLabel(code: string) {
    const main = stationByCode(code)
    const name = main ? main.name : STOP_NAMES[code] ?? ''
    return `${code} · ${name.toUpperCase()}`
  }

  private here(code: string) {
    this.svg.querySelectorAll('.lamp.here').forEach((el) => {
      el.classList.remove('here')
      el.classList.add('on')
    })
    this.lamp(code)?.classList.add('on', 'here')
    this.state.station = this.stationLabel(code)
  }

  private flash(code: string, label = true) {
    const el = this.lamp(code)
    if (!el) return
    el.classList.add('on')
    if (label) this.state.station = this.stationLabel(code)
    if (this.reduce) return
    el.classList.add('flash')
    this.timers.push(window.setTimeout(() => el.classList.remove('flash'), 220))
  }

  private lightLine(id: string) {
    this.svg.querySelector(`[data-line="${id}"]`)?.classList.add('lit')
  }

  /* ---------------- steps ---------------- */

  private pauseStep(dur: number, enter?: () => void): Step {
    return { kind: 'pause', dur, enter: () => { enter?.(); this.emit() } }
  }

  /** A timed step that fires passes along t in [0, 1]; with a path it also moves the train. */
  private timed(dur: number, passes: Pass[], key?: MotionKey, f0 = 0, f1 = 1): Step {
    const ps = passes.map((p) => ({ ...p, done: false }))
    return {
      kind: 'move',
      dur,
      update: (t: number) => {
        const f = f0 + (f1 - f0) * t
        if (key) this.placeTrain(key, f)
        const pos = key ? f : t
        let changed = false
        for (const p of ps) {
          if (!p.done && (f1 >= f0 ? pos >= p.f - 1e-6 : pos <= p.f + 1e-6)) {
            p.done = true
            p.fn()
            changed = true
          }
        }
        if (changed) this.emit()
      }
    }
  }

  private move(key: MotionKey, f0: number, f1: number, dur: number, passes: Pass[] = []): Step {
    return this.timed(dur, passes, key, f0, f1)
  }

  private vote(kind: 'tool' | 'reply', step: RunStep, label: boolean, captionDiffs: boolean) {
    return () => {
      this.flash('P06', label)
      this.state.trip += 1
      this.pick(kind, step)
      if (isMarker(step.text)) this.caption(STORY.stopMarker)
      else if (captionDiffs && step.rank !== null && step.rank > 1 && step.favorite) this.caption(STORY.differs(step.favorite, step.text))
    }
  }

  /** A full animated trip: back round the inner loop to Embedding, up through the stack, a vote, onto the platform. */
  private animatedTrip(kind: 'tool' | 'reply', step: RunStep, from: 'loop' | 'tokenizer'): Step[] {
    const steps: Step[] = []
    if (from === 'loop') steps.push(this.move('ar', 0, 1, 1100))
    steps.push(
      this.move('main', from === 'loop' ? 0.2 : 0, 1, from === 'loop' ? 1500 : 1900, [
        { f: 0.2, fn: () => this.flash('P03') },
        { f: 0.4, fn: () => this.flash('P04') },
        { f: 0.6, fn: () => this.flash('P05') },
        { f: 0.8, fn: this.vote(kind, step, true, true) },
        { f: 1, fn: () => this.flash('P07') }
      ])
    )
    steps.push(this.pauseStep(500, () => this.add([step.i])))
    return steps
  }

  /** A repeated trip, shown as a quick chase of lamps while the train waits at The Loop. */
  private expressTrip(kind: 'tool' | 'reply', step: RunStep, dur: number): Step[] {
    return [
      this.timed(dur, [
        { f: 0.05, fn: () => this.flash('P03', false) },
        { f: 0.25, fn: () => this.flash('P04', false) },
        { f: 0.45, fn: () => this.flash('P05', false) },
        { f: 0.65, fn: this.vote(kind, step, false, false) },
        { f: 0.9, fn: () => { this.flash('P07', false); this.add([step.i]) } }
      ])
    ]
  }

  private build(): Step[] {
    const R = this.run
    const C = runCounts
    const S: Step[] = []
    const [toolTurn, ...laterTurns] = R.turns
    const firstStep = toolTurn?.steps[0]

    S.push(this.pauseStep(2600, () => {
      this.present = new Set()
      this.add(R.question)
      this.here('P01')
      this.parkAtSend()
      this.frame(FRAME.send)
      this.caption(STORY.send(C.question))
    }))
    S.push(this.pauseStep(3200, () => {
      this.lightLine('G')
      this.lamp('G1')?.classList.add('on')
      this.add(R.wrapper)
      this.state.station = this.stationLabel('G1')
      this.caption(STORY.gate)
    }))
    S.push(this.pauseStep(2000, () => {
      this.lightLine('L')
      this.follow()
      this.caption(STORY.toLibrary)
    }))
    S.push(this.move('lib', 0, 1, 6000, [
      { f: this.fracs.L1, fn: () => { this.flash('L1'); this.caption(STORY.L1) } },
      { f: this.fracs.L2, fn: () => { this.flash('L2'); this.caption(STORY.L2) } },
      { f: this.fracs.L3, fn: () => { this.flash('L3'); this.caption(STORY.L3); this.add(R.passages) } }
    ]))
    S.push(this.pauseStep(3200, () => {
      this.here('P02')
      this.add(R.genPrompt)
      this.follow()
      this.caption(STORY.tokenizer(this.present.size, C.question))
    }))

    const slow: [string, number, string][] = [
      ['P03', 0.2, STORY.embedding],
      ['P04', 0.4, STORY.attention],
      ['P05', 0.6, STORY.stack(trace?.model.layers ?? null)]
    ]
    let f = 0
    for (const [code, to, text] of slow) {
      S.push(this.move('main', f, to, 1400))
      S.push(this.pauseStep(3200, () => { this.here(code); this.caption(text) }))
      f = to
    }
    if (firstStep) {
      S.push(this.move('main', 0.6, 0.8, 1100))
      S.push(this.pauseStep(firstStep.rank && firstStep.rank > 1 ? 6500 : 3400, () => {
        this.here('P06')
        this.state.trip = 1
        this.pick('tool', firstStep)
        this.caption(STORY.firstVote(firstStep.text, firstStep.prob, firstStep.favorite, firstStep.favoriteProb, firstStep.rank))
      }))
      S.push(this.move('main', 0.8, 1, 1100))
      S.push(this.pauseStep(3600, () => {
        this.here('P07')
        this.frame(FRAME.line)
        this.add([firstStep.i])
        this.caption(STORY.loop(R.trips))
      }))
      const rest = toolTurn.steps.slice(1)
      rest.forEach((st, k) => {
        if (k === 0) S.push(...this.animatedTrip('tool', st, 'loop'))
        else {
          if (k === 1) S.push(this.pauseStep(1800, () => { this.here('P07'); this.caption(STORY.writingRequest) }))
          S.push(...this.expressTrip('tool', st, 260))
        }
      })
    }

    laterTurns.forEach((turn, t) => {
      const bridge = R.bridges[t] ?? []
      const resultTokens = bridge.filter((i) => R.tokens[i].src === 'res')
      S.push(this.pauseStep(2600, () => {
        this.here('P07')
        this.lightLine('W')
        this.follow()
        this.caption(STORY.requestDone)
      }))
      S.push(this.move('work', 0, 1, 7000, [
        { f: this.fracs.W1, fn: () => { this.flash('W1'); this.caption(STORY.W1) } },
        { f: this.fracs.W2, fn: () => { this.flash('W2'); this.caption(STORY.W2) } },
        { f: this.fracs.W3, fn: () => { this.flash('W3'); this.caption(STORY.W3); this.add(bridge) } }
      ]))
      S.push(this.pauseStep(3000, () => {
        this.here('P02')
        this.follow()
        this.caption(STORY.resultCut(resultTokens.length))
      }))
      turn.steps.forEach((st, k) => {
        if (k === 0) {
          S.push(...this.animatedTrip(turn.kind, st, 'tokenizer'))
          S.push(this.pauseStep(2400, () => { this.here('P07'); this.frame(FRAME.line); this.caption(STORY.replying) }))
        } else {
          S.push(...this.expressTrip(turn.kind, st, 420))
        }
      })
    })

    S.push(this.pauseStep(600, () => this.follow()))
    S.push(this.move('reply', 0, 1, 1600))
    S.push(this.pauseStep(1, () => {
      this.here('P08')
      this.lightLine('R')
      this.lamp('R1')?.classList.add('on')
      this.caption(STORY.done(R.trips))
    }))
    return S
  }

  /* ---------------- player ---------------- */

  private reset() {
    cancelAnimationFrame(this.raf)
    this.svg.querySelectorAll('.lamp').forEach((el) => el.classList.remove('on', 'here', 'flash'))
    this.svg.querySelectorAll('.branch').forEach((el) => el.classList.remove('lit'))
    this.state = this.blankState()
    this.present = new Set(this.run.question)
    this.fresh = new Set()
    this.here('P01')
    this.parkAtSend()
    this.camX = FRAME.send
    this.camFollow = false
    this.steps = this.build()
    this.idx = 0
    this.emit()
  }

  /** Share of the ride's running time already played, so the board's progress line moves steadily. */
  private progress() {
    if (this.state.done) return 1
    let total = 0
    let played = 0
    this.steps.forEach((s, i) => {
      const d = this.dur(s)
      total += d
      if (i < this.idx) played += d
      else if (i === this.idx) played += Math.min(d, s.elapsed ?? 0)
    })
    return total ? played / total : 0
  }

  private dur(s: Step) {
    return this.reduce && s.kind === 'move' ? 0 : s.dur
  }

  private startStep(s: Step) {
    if (!s.started) {
      s.started = true
      s.elapsed = 0
      s.enter?.()
    }
  }

  private finish() {
    this.state.playing = false
    this.state.done = true
    this.emit()
  }

  private advance(dt: number) {
    while (this.idx < this.steps.length) {
      const s = this.steps[this.idx]
      this.startStep(s)
      const D = this.dur(s)
      const remain = D - (s.elapsed ?? 0)
      if (dt < remain) {
        s.elapsed = (s.elapsed ?? 0) + dt
        s.update?.(D ? s.elapsed / D : 1)
        return
      }
      s.elapsed = D
      s.update?.(1)
      dt -= Math.max(0, remain)
      this.idx++
      if (dt <= 0 && this.idx < this.steps.length) return
    }
    this.finish()
  }

  private tick = (ts: number) => {
    if (!this.state.playing) return
    const dt = this.lastTs ? Math.min(100, ts - this.lastTs) : 0
    this.lastTs = ts
    this.advance(dt)
    this.updateCamera(dt)
    this.sinceEmit += dt
    if (this.sinceEmit > 250 && this.state.playing) {
      this.sinceEmit = 0
      this.emit()
    }
    if (this.state.playing) this.raf = requestAnimationFrame(this.tick)
  }
}
