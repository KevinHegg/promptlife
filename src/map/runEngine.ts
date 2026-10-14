/**
 * Drives the living map: moves the train along motion paths, lights lamps and lines,
 * and reports board/platform state through onChange. Framework-free on purpose:
 * the train moves every frame, so it touches the SVG directly instead of re-rendering React.
 */
import { MAIN_Y, STOPS, STOP_NAMES, stationByCode, type MotionKey } from '../data/network'
import type { Src } from '../data/heroRun'
import { runCounts, type RunScript, type RunStep } from '../data/run'

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

const pct = (p: number | null) => (p === null ? '' : p >= 0.995 ? '99%+' : p < 0.01 ? `${(p * 100).toFixed(1)}%` : `${Math.round(p * 100)}%`)
const isMarker = (text: string) => /^<\|.*\|>$/.test(text)
const show = (text: string) => (/^\s+$/.test(text) ? 'a space' : `“${text.trim()}”`)

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
    } while (this.idx < this.steps.length && (this.steps[this.idx].kind !== 'pause' || this.steps[this.idx].dur < 400) && guard < 2000)
    if (this.idx < this.steps.length) this.startStep(this.steps[this.idx])
    else this.finish()
    this.emit()
  }

  /* ---------------- state ---------------- */

  private blankState(): RunSnapshot {
    return {
      trip: 0,
      totalTrips: this.run.trips,
      station: 'P01 · SEND',
      caption: `“Using my syllabus, what do I need on the final to get an A-?” is waiting at Send.`,
      toolText: '',
      replyText: '',
      tokens: [],
      playing: false,
      done: false
    }
  }

  private emit() {
    const tokens: PlatformToken[] = [...this.present]
      .sort((a, b) => a - b)
      .map((i) => ({ i, src: this.run.tokens[i].src, text: this.run.tokens[i].text, fresh: this.fresh.has(i) }))
    this.onChange({ ...this.state, tokens })
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

  /** What the board says about one trip's vote. */
  private voteLine(step: RunStep) {
    if (step.prob === null) return `The winner is ${show(step.text)}.`
    if (step.rank === 1) return `The winner is ${show(step.text)} at ${pct(step.prob)}.`
    return `The model preferred ${show(step.favorite ?? '')} (${pct(step.favoriteProb)}). This recorded run used ${show(step.text)} (${pct(step.prob)}, rank ${step.rank}).`
  }

  /* ---------------- map helpers ---------------- */

  private onScroll = () => {
    if (!this.scroller) return
    if (Math.abs(this.scroller.scrollLeft - this.lastSetLeft) > 3) this.userScrollAt = performance.now()
  }

  private follow(x: number) {
    const sc = this.scroller
    if (!sc || sc.scrollWidth <= sc.clientWidth + 2) return
    if (performance.now() - this.userScrollAt < 2500) return
    const vb = this.svg.viewBox.baseVal
    const scale = this.svg.getBoundingClientRect().width / (vb?.width || 1120)
    const target = Math.max(0, Math.min(sc.scrollWidth - sc.clientWidth, x * scale - sc.clientWidth / 2))
    if (Math.abs(target - sc.scrollLeft) < 4) return
    this.lastSetLeft = Math.round(target)
    sc.scrollLeft = target
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
    this.train?.setAttribute('transform', `translate(70,${MAIN_Y})`)
    this.follow(70)
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
    this.train.setAttribute('transform', `translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`)
    this.follow(a.x)
  }

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

  private flash(code: string) {
    const el = this.lamp(code)
    if (!el) return
    el.classList.add('on')
    this.state.station = this.stationLabel(code)
    if (this.reduce) return
    el.classList.add('flash')
    this.timers.push(window.setTimeout(() => el.classList.remove('flash'), 260))
  }

  private lightLine(id: string) {
    this.svg.querySelector(`[data-line="${id}"]`)?.classList.add('lit')
  }

  /* ---------------- steps ---------------- */

  private pauseStep(dur: number, enter?: () => void): Step {
    return { kind: 'pause', dur, enter: () => { enter?.(); this.emit() } }
  }

  private move(key: MotionKey, f0: number, f1: number, dur: number, passes: Pass[] = []): Step {
    const ps = passes.map((p) => ({ ...p, done: false }))
    return {
      kind: 'move',
      dur,
      update: (t: number) => {
        const f = f0 + (f1 - f0) * t
        this.placeTrain(key, f)
        let changed = false
        for (const p of ps) {
          if (!p.done && (f1 >= f0 ? f >= p.f - 1e-6 : f <= p.f + 1e-6)) {
            p.done = true
            p.fn()
            changed = true
          }
        }
        if (changed) this.emit()
      }
    }
  }

  private mainPasses(): Pass[] {
    return ([['P03', 0.2], ['P04', 0.4], ['P05', 0.6]] as const).map(([code, f]) => ({ f, fn: () => this.flash(code) }))
  }

  /** One autoregressive trip: back to Embedding, through the stack, a vote, and onto the platform. */
  private trip(kind: 'tool' | 'reply', step: RunStep, pace: 'fast' | 'med', from: 'loop' | 'tokenizer' = 'loop'): Step[] {
    const d = pace === 'fast' ? [200, 290, 30] : [320, 460, 100]
    const vote: Pass = {
      f: 0.8,
      fn: () => {
        this.flash('P06')
        this.state.trip += 1
        this.pick(kind, step)
        if (isMarker(step.text)) this.caption(`Trip ${this.state.trip}: the model wrote its stop marker, ${step.text}, so this turn ends.`)
        else if (step.rank !== null && step.rank > 1) this.caption(`Trip ${this.state.trip}: ${this.voteLine(step)}`)
      }
    }
    const steps: Step[] = []
    if (from === 'loop') steps.push(this.move('ar', 0, 1, d[0]))
    steps.push(this.move('main', from === 'loop' ? 0.2 : 0, 1, from === 'loop' ? d[1] : d[1] + 500, [...this.mainPasses(), vote, { f: 1, fn: () => this.flash('P07') }]))
    steps.push(this.pauseStep(d[2], () => this.add([step.i])))
    return steps
  }

  private build(): Step[] {
    const R = this.run
    const C = runCounts
    const S: Step[] = []
    const [toolTurn, ...laterTurns] = R.turns
    const firstStep = toolTurn?.steps[0]

    S.push(this.pauseStep(2000, () => {
      this.present = new Set()
      this.add(R.question)
      this.here('P01')
      this.parkAtSend()
      this.caption(`P01 · Send: your question boards. It's ${C.question} tokens, though nothing has counted them yet.`)
    }))
    S.push(this.pauseStep(2600, () => {
      this.lightLine('G')
      this.lamp('G1')?.classList.add('on')
      this.add(R.wrapper)
      this.state.station = this.stationLabel('G1')
      this.caption(
        C.toolDescription
          ? `G1 · Gatehouse: the app adds a system prompt, a ${C.toolDescription}-token description of the calculator, and role markers. That's ${C.wrapper} tokens you never see.`
          : 'G1 · Gatehouse: the app quietly puts a system prompt in front of your question.'
      )
    }))
    S.push(this.pauseStep(900, () => {
      this.lightLine('L')
      this.caption('Transfer to the Library line. The app searches your course files before the model reads anything.')
    }))
    S.push(this.move('lib', 0, 1, 4200, [
      { f: this.fracs.L1, fn: () => { this.flash('L1'); this.caption('L1 · Search by meaning: the question is compared with every passage in your course files.') } },
      { f: this.fracs.L2, fn: () => { this.flash('L2'); this.caption('L2 · Fetch passages: the two closest matches come from the syllabus and the gradebook.') } },
      { f: this.fracs.L3, fn: () => { this.flash('L3'); this.caption(`L3 · Add to context: both passages board the train, ${C.passages} tokens.`); this.add(R.passages) } }
    ]))
    S.push(this.pauseStep(2400, () => {
      this.here('P02')
      this.add(R.genPrompt)
      const n = this.present.size
      this.caption(`P02 · Tokenizer: everything on board is now ${n} tokens, each with an ID number. You typed ${C.question} of them.`)
    }))

    const slow: [string, number, string][] = [
      ['P03', 0.2, 'P03 · Embedding: each ID looks up its own long list of numbers.'],
      ['P04', 0.4, R.model
        ? 'P04 · Attention: every token looks back at the ones before it. “final” in your question finds “final” in the syllabus and looks at the word after it: “exam”.'
        : 'P04 · Attention: every token looks back at the others, all at the same time.'],
      ['P05', 0.6, `P05 · The Stack: ${R.model ? '24' : 'dozens of'} layers rework those numbers, one floor after another.`]
    ]
    let f = 0
    for (const [code, to, text] of slow) {
      S.push(this.move('main', f, to, 950))
      S.push(this.pauseStep(2400, () => { this.here(code); this.caption(text) }))
      f = to
    }
    if (firstStep) {
      S.push(this.move('main', 0.6, 0.8, 700))
      S.push(this.pauseStep(firstStep.rank && firstStep.rank > 1 ? 5200 : 2600, () => {
        this.here('P06')
        this.state.trip = 1
        this.pick('tool', firstStep)
        this.caption(`P06 · The Vote: every token in the vocabulary gets a score. ${this.voteLine(firstStep)}${firstStep.rank && firstStep.rank > 1 ? ' Apps can require a tool call this way.' : ''}`)
      }))
      S.push(this.move('main', 0.8, 1, 700))
      S.push(this.pauseStep(2500, () => {
        this.here('P07')
        this.add([firstStep.i])
        this.caption(`P07 · The Loop: the new token joins the platform. Trip 1 of ${R.trips} is done, and the train heads back for the next token.`)
      }))
      toolTurn.steps.slice(1).forEach((st, k) => {
        S.push(...this.trip('tool', st, 'fast'))
        if (k === 0) S.push(this.pauseStep(1500, () => this.caption('Each new token is one more trip around the loop. The model is spelling out a calculator call.')))
      })
    }

    laterTurns.forEach((turn, t) => {
      const bridge = R.bridges[t] ?? []
      const resultTokens = bridge.filter((i) => R.tokens[i].src === 'res')
      S.push(this.pauseStep(2000, () => {
        this.here('P07')
        this.lightLine('W')
        this.caption('The call is complete. Transfer to the Workshop line, where the app takes over from the model.')
      }))
      S.push(this.move('work', 0, 1, 5200, [
        { f: this.fracs.W1, fn: () => { this.flash('W1'); this.caption('W1 · Read the call: the model ended its turn with a tool call. The app reads it.') } },
        { f: this.fracs.W2, fn: () => { this.flash('W2'); this.caption('W2 · Run the tool: (90 − 0.6 × 87.5) ÷ 0.4 = 93.75. Exact, because a calculator did it.') } },
        { f: this.fracs.W3, fn: () => { this.flash('W3'); this.caption('W3 · Paste the result: 93.75 goes back as plain text, wrapped in more role markers.'); this.add(bridge) } }
      ]))
      S.push(this.pauseStep(2300, () => {
        this.here('P02')
        this.caption(`P02 · Tokenizer: the result is ${resultTokens.length} tokens${R.model ? ', one for each digit and one for the point' : ''}.`)
      }))
      turn.steps.forEach((st, k) => {
        if (k === 0) {
          S.push(...this.trip(turn.kind, st, 'med', 'tokenizer'))
          S.push(this.pauseStep(1600, () => this.caption(`With the result on board, the model starts the reply. ${this.voteLine(st)}`)))
        } else {
          S.push(...this.trip(turn.kind, st, 'med'))
        }
      })
    })

    S.push(this.move('reply', 0, 1, 1100))
    S.push(this.pauseStep(1, () => {
      this.here('P08')
      this.lightLine('R')
      this.lamp('R1')?.classList.add('on')
      this.caption(`P08 · Reply after ${R.trips} trips. Lit: Gatehouse, Library, Workshop. Dark: Academy, Scratchpad, Darkroom. The Academy stays dark because answering never changes the model.`)
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
    this.steps = this.build()
    this.idx = 0
    this.emit()
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
    if (this.state.playing) this.raf = requestAnimationFrame(this.tick)
  }
}
