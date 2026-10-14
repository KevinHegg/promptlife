/**
 * Drives the living map: moves the train along motion paths, lights lamps and lines,
 * and reports board/platform state through onChange. Framework-free on purpose:
 * the train moves every frame, so it touches the SVG directly instead of re-rendering React.
 */
import { MAIN_Y, STOPS, STOP_NAMES, stationByCode, type MotionKey } from '../data/network'
import type { RunTokens, Src } from '../data/heroRun'

export type PlatformToken = { src: Src; text: string; fresh: boolean }

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

const START_CAPTION = '“Using my syllabus, what do I need on the final to get an A-?” is waiting at Send.'

export class RunEngine {
  private svg: SVGSVGElement
  private scroller: HTMLElement | null
  private tokensIn: RunTokens
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
  private state: RunSnapshot

  constructor(opts: { svg: SVGSVGElement; scroller?: HTMLElement | null; tokens: RunTokens; onChange: (s: RunSnapshot) => void }) {
    this.svg = opts.svg
    this.scroller = opts.scroller ?? null
    this.tokensIn = opts.tokens
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

  get totalTrips() {
    return this.tokensIn.tool.length + this.tokensIn.rep.length
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
    } while (this.idx < this.steps.length && (this.steps[this.idx].kind !== 'pause' || this.steps[this.idx].dur < 400) && guard < 500)
    if (this.idx < this.steps.length) this.startStep(this.steps[this.idx])
    else this.finish()
    this.emit()
  }

  /* ---------------- internals ---------------- */

  private blankState(): RunSnapshot {
    return {
      trip: 0,
      totalTrips: this.totalTrips,
      station: 'P01 · SEND',
      caption: START_CAPTION,
      toolText: '',
      replyText: '',
      tokens: [],
      playing: false,
      done: false
    }
  }

  private emit() {
    this.onChange({ ...this.state, tokens: this.state.tokens.slice() })
  }

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
    const el = this.lamp(code)
    el?.classList.add('on', 'here')
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

  private caption(text: string) {
    this.state.caption = text
  }

  private add(src: Src, toks: string[]) {
    const tokens = this.state.tokens.map((t) => ({ ...t, fresh: false }))
    for (const text of toks) tokens.push({ src, text, fresh: true })
    this.state.tokens = tokens
  }

  private insertBefore(src: Src, toks: string[], beforeSrc: Src | null) {
    const tokens = this.state.tokens.map((t) => ({ ...t, fresh: false }))
    let at = beforeSrc ? tokens.findIndex((t) => t.src === beforeSrc) : 0
    if (at < 0) at = tokens.length
    tokens.splice(at, 0, ...toks.map((text) => ({ src, text, fresh: true })))
    this.state.tokens = tokens
  }

  private pick(src: 'tool' | 'rep', tok: string) {
    if (src === 'tool') this.state.toolText += tok
    else this.state.replyText += tok
  }

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

  private trip(src: 'tool' | 'rep', tok: string, pace: 'fast' | 'med', caption?: string): Step[] {
    const d = pace === 'fast' ? [210, 300, 30] : [330, 470, 110]
    return [
      this.move('ar', 0, 1, d[0]),
      this.move('main', 0.2, 1, d[1], [
        ...this.mainPasses(),
        {
          f: 0.8,
          fn: () => {
            this.flash('P06')
            this.state.trip += 1
            this.pick(src, tok)
            if (caption) this.caption(caption)
          }
        },
        { f: 1, fn: () => this.flash('P07') }
      ]),
      this.pauseStep(d[2], () => this.add(src, [tok]))
    ]
  }

  private build(): Step[] {
    const T = this.tokensIn
    const S: Step[] = []
    const userCount = T.user.length
    const contextCount = T.sys.length + T.rag.length + T.user.length

    S.push(this.pauseStep(1900, () => {
      this.state.tokens = []
      this.add('user', T.user)
      this.here('P01')
      this.parkAtSend()
      this.caption(`P01 · Send: your question boards. That is ${userCount} tokens, though nothing has counted them yet.`)
    }))
    S.push(this.pauseStep(2300, () => {
      this.lightLine('G')
      this.lamp('G1')?.classList.add('on')
      this.insertBefore('sys', T.sys, null)
      this.state.station = this.stationLabel('G1')
      this.caption('G1 · Gatehouse: the app quietly puts a system prompt in front of your question.')
    }))
    S.push(this.pauseStep(800, () => {
      this.lightLine('L')
      this.caption('Transfer to the Library line. The app searches your course files before the model reads anything.')
    }))
    S.push(this.move('lib', 0, 1, 4200, [
      { f: this.fracs.L1, fn: () => { this.flash('L1'); this.caption('L1 · Search by meaning: the question is compared with every passage in your course files.') } },
      { f: this.fracs.L2, fn: () => { this.flash('L2'); this.caption('L2 · Fetch passages: the two closest matches come from the syllabus and the gradebook.') } },
      { f: this.fracs.L3, fn: () => { this.flash('L3'); this.caption('L3 · Add to context: both passages board the train.'); this.insertBefore('rag', T.rag, 'user') } }
    ]))
    S.push(this.pauseStep(2100, () => {
      this.here('P02')
      this.caption(`P02 · Tokenizer: everything on board is now ${contextCount} tokens, each with an ID number.`)
    }))

    const slow: [string, number, string][] = [
      ['P03', 0.2, 'P03 · Embedding: each ID looks up its own long list of numbers.'],
      ['P04', 0.4, 'P04 · Attention: every token looks back at the others, all at the same time. “final” leans on “syllabus” and “exam”.'],
      ['P05', 0.6, 'P05 · The Stack: dozens of layers rework those numbers, one floor after another.'],
      ['P06', 0.8, `P06 · The Vote: every token in the vocabulary gets a score. The winner is “${T.tool[0]}”, so the model is asking for a tool.`]
    ]
    let f = 0
    for (const [code, to, text] of slow) {
      S.push(this.move('main', f, to, 950))
      S.push(this.pauseStep(2400, () => {
        this.here(code)
        this.caption(text)
        if (code === 'P06') {
          this.state.trip = 1
          this.pick('tool', T.tool[0])
        }
      }))
      f = to
    }
    S.push(this.move('main', 0.8, 1, 700))
    S.push(this.pauseStep(2400, () => {
      this.here('P07')
      this.add('tool', [T.tool[0]])
      this.caption(`P07 · The Loop: the new token joins the platform. Trip 1 of ${this.totalTrips} is done, and the train heads back for the next token.`)
    }))
    for (let k = 1; k < T.tool.length; k++) {
      S.push(...this.trip('tool', T.tool[k], 'fast', k === 1 ? 'Each new token is one more trip around the loop. The model is spelling out a calculator call.' : undefined))
    }
    S.push(this.pauseStep(1800, () => {
      this.here('P07')
      this.lightLine('W')
      this.caption('The call is complete. Transfer to the Workshop line, where the app takes over from the model.')
    }))
    S.push(this.move('work', 0, 1, 5200, [
      { f: this.fracs.W1, fn: () => { this.flash('W1'); this.caption('W1 · Read the call: the app spots calculator(…) and pauses the model.') } },
      { f: this.fracs.W2, fn: () => { this.flash('W2'); this.caption('W2 · Run the tool: (90 − 0.6 × 87.5) ÷ 0.4 = 93.75. Exact, because a calculator did it.') } },
      { f: this.fracs.W3, fn: () => { this.flash('W3'); this.caption('W3 · Paste the result: 93.75 goes back as plain text.') } }
    ]))
    S.push(this.pauseStep(2000, () => {
      this.here('P02')
      this.add('res', T.res)
      this.caption(`P02 · Tokenizer: the result becomes ${T.res.length} new tokens on the platform.`)
    }))
    S.push(this.move('main', 0, 1, 1500, [
      ...this.mainPasses(),
      {
        f: 0.8,
        fn: () => {
          this.flash('P06')
          this.state.trip += 1
          this.pick('rep', T.rep[0])
          this.caption('One full trip with the result on board, and the model starts the reply.')
        }
      },
      { f: 1, fn: () => this.flash('P07') }
    ]))
    S.push(this.pauseStep(150, () => this.add('rep', [T.rep[0]])))
    for (let r = 1; r < T.rep.length; r++) S.push(...this.trip('rep', T.rep[r], 'med'))
    S.push(this.move('reply', 0, 1, 1100))
    S.push(this.pauseStep(1, () => {
      this.here('P08')
      this.lightLine('R')
      this.lamp('R1')?.classList.add('on')
      this.caption(`P08 · Reply after ${this.totalTrips} trips. Lit: Gatehouse, Library, Workshop. Dark: Academy, Scratchpad, Darkroom. The Academy stays dark because answering never changes the model.`)
    }))
    return S
  }

  private reset() {
    cancelAnimationFrame(this.raf)
    this.svg.querySelectorAll('.lamp').forEach((el) => el.classList.remove('on', 'here', 'flash'))
    this.svg.querySelectorAll('.branch').forEach((el) => el.classList.remove('lit'))
    this.state = this.blankState()
    this.add('user', this.tokensIn.user)
    this.state.tokens = this.state.tokens.map((t) => ({ ...t, fresh: false }))
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
