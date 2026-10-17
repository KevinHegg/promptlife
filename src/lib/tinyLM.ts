/**
 * A tiny letter-level language model that really trains, in the browser, for the Academy.
 *
 * It reads the last CTX letters, looks up a short list of numbers for each (an embedding),
 * mixes them in one hidden layer, and scores every letter it knows for what comes next: the
 * same shape of job as the big model, at about one sixty-thousandth of the size. Training is
 * the real thing too: guess the next letter of the pages, measure the miss (cross-entropy),
 * work out how each number should move to miss less (backpropagation), and nudge every number
 * a little (the Adam optimizer). Everything is seeded, so a run is the same on every device.
 */

/** A small seeded random number generator (mulberry32), so every run is reproducible. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CTX = 4
const EMB = 10
const HIDDEN = 96
const BATCH = 32
const LR = 0.01
const B1 = 0.9
const B2 = 0.999
/** Positions used to measure how well it guesses, the same ones every time. */
const EVAL_N = 400

type Tensor = { w: Float64Array; g: Float64Array; m: Float64Array; v: Float64Array }
const tensor = (n: number, init: (i: number) => number): Tensor => {
  const w = new Float64Array(n)
  for (let i = 0; i < n; i++) w[i] = init(i)
  return { w, g: new Float64Array(n), m: new Float64Array(n), v: new Float64Array(n) }
}

export class TinyLM {
  readonly vocab: string[]
  readonly V: number
  private readonly ix: Map<string, number>
  private readonly data: Int32Array
  private readonly E: Tensor
  private readonly W1: Tensor
  private readonly b1: Tensor
  private readonly W2: Tensor
  private readonly b2: Tensor
  private readonly rand: () => number
  private readonly evalPos: Int32Array
  private t = 0

  constructor(text: string, seed = 7) {
    this.vocab = [...new Set(text)].sort()
    this.V = this.vocab.length
    this.ix = new Map(this.vocab.map((c, i) => [c, i]))
    // Pad the start with newlines so the first letters have something to read.
    const pad = this.ix.get('\n') ?? 0
    this.data = Int32Array.from([...Array(CTX).fill(pad), ...[...text].map((c) => this.ix.get(c) ?? 0)])
    this.rand = rng(seed)
    const normal = () => {
      const u = Math.max(1e-12, this.rand())
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * this.rand())
    }
    this.E = tensor(this.V * EMB, () => normal() * 0.5)
    this.W1 = tensor(CTX * EMB * HIDDEN, () => normal() / Math.sqrt(CTX * EMB))
    this.b1 = tensor(HIDDEN, () => 0)
    this.W2 = tensor(HIDDEN * this.V, () => (normal() / Math.sqrt(HIDDEN)) * 0.5)
    this.b2 = tensor(this.V, () => 0)
    const er = rng(seed + 1)
    const span = this.data.length - CTX
    this.evalPos = Int32Array.from({ length: Math.min(EVAL_N, span) }, () => CTX + Math.floor(er() * span))
  }

  /** How many numbers the model has: its parameters. */
  get size() {
    return this.E.w.length + this.W1.w.length + this.b1.w.length + this.W2.w.length + this.b2.w.length
  }

  /** How many rounds of nudging it has had. */
  get rounds() {
    return this.t
  }

  /** The output scores' weights, for drawing as a strip of colors. */
  get outputWeights() {
    return this.W2.w
  }

  /** Scores for the letter after position pos - 1 of src, as chances in p. */
  private forward(src: Int32Array, pos: number, x: Float64Array, h: Float64Array, p: Float64Array) {
    const { V } = this
    for (let k = 0; k < CTX; k++) {
      const c = src[pos - CTX + k]
      for (let e = 0; e < EMB; e++) x[k * EMB + e] = this.E.w[c * EMB + e]
    }
    const W1 = this.W1.w
    for (let j = 0; j < HIDDEN; j++) {
      let s = this.b1.w[j]
      for (let i = 0; i < CTX * EMB; i++) s += x[i] * W1[i * HIDDEN + j]
      h[j] = Math.tanh(s)
    }
    const W2 = this.W2.w
    let max = -Infinity
    for (let o = 0; o < V; o++) {
      let s = this.b2.w[o]
      for (let j = 0; j < HIDDEN; j++) s += h[j] * W2[j * V + o]
      p[o] = s
      if (s > max) max = s
    }
    let z = 0
    for (let o = 0; o < V; o++) {
      p[o] = Math.exp(p[o] - max)
      z += p[o]
    }
    for (let o = 0; o < V; o++) p[o] /= z
  }

  /** One round: guess the next letter at BATCH random spots, measure the miss, nudge every number. Returns the average miss. */
  step(): number {
    const { V } = this
    const x = new Float64Array(CTX * EMB)
    const h = new Float64Array(HIDDEN)
    const p = new Float64Array(V)
    const dh = new Float64Array(HIDDEN)
    const dx = new Float64Array(CTX * EMB)
    const all = [this.E, this.W1, this.b1, this.W2, this.b2]
    for (const T of all) T.g.fill(0)
    let loss = 0
    const span = this.data.length - CTX
    for (let b = 0; b < BATCH; b++) {
      const pos = CTX + Math.floor(this.rand() * span)
      const y = this.data[pos]
      this.forward(this.data, pos, x, h, p)
      loss -= Math.log(Math.max(p[y], 1e-12))
      p[y] -= 1 // now the gradient of the miss with respect to each score
      const W2 = this.W2.w
      const gW2 = this.W2.g
      dh.fill(0)
      for (let j = 0; j < HIDDEN; j++) {
        const hj = h[j]
        let s = 0
        for (let o = 0; o < V; o++) {
          gW2[j * V + o] += hj * p[o]
          s += W2[j * V + o] * p[o]
        }
        dh[j] = s * (1 - hj * hj)
      }
      for (let o = 0; o < V; o++) this.b2.g[o] += p[o]
      const W1 = this.W1.w
      const gW1 = this.W1.g
      dx.fill(0)
      for (let i = 0; i < CTX * EMB; i++) {
        const xi = x[i]
        let s = 0
        for (let j = 0; j < HIDDEN; j++) {
          gW1[i * HIDDEN + j] += xi * dh[j]
          s += W1[i * HIDDEN + j] * dh[j]
        }
        dx[i] = s
      }
      for (let j = 0; j < HIDDEN; j++) this.b1.g[j] += dh[j]
      for (let k = 0; k < CTX; k++) {
        const c = this.data[pos - CTX + k]
        for (let e = 0; e < EMB; e++) this.E.g[c * EMB + e] += dx[k * EMB + e]
      }
    }
    // Adam: nudge each number against its gradient, scaled by how steady that gradient has been.
    this.t++
    const c1 = 1 - Math.pow(B1, this.t)
    const c2 = 1 - Math.pow(B2, this.t)
    for (const T of all) {
      for (let i = 0; i < T.w.length; i++) {
        const g = T.g[i] / BATCH
        T.m[i] = B1 * T.m[i] + (1 - B1) * g
        T.v[i] = B2 * T.v[i] + (1 - B2) * g * g
        T.w[i] -= (LR * (T.m[i] / c1)) / (Math.sqrt(T.v[i] / c2) + 1e-8)
      }
    }
    return loss / BATCH
  }

  /** The average chance it gives the real next letter, over the same 400 spots every time. */
  chance(): number {
    const x = new Float64Array(CTX * EMB)
    const h = new Float64Array(HIDDEN)
    const p = new Float64Array(this.V)
    let s = 0
    for (const pos of this.evalPos) {
      this.forward(this.data, pos, x, h, p)
      s += p[this.data[pos]]
    }
    return s / this.evalPos.length
  }

  /** Let it write: start from `start`, then draw each next letter from its chances. */
  write(start: string, n: number, seed = 11, temperature = 0.7): string {
    const r = rng(seed)
    const pad = this.ix.get('\n') ?? 0
    const ctx = [...Array(CTX).fill(pad), ...[...start].map((c) => this.ix.get(c) ?? pad)]
    const x = new Float64Array(CTX * EMB)
    const h = new Float64Array(HIDDEN)
    const p = new Float64Array(this.V)
    let out = ''
    for (let k = 0; k < n; k++) {
      this.forward(Int32Array.from(ctx.slice(-CTX)), CTX, x, h, p)
      let z = 0
      for (let o = 0; o < this.V; o++) {
        p[o] = Math.pow(p[o], 1 / temperature)
        z += p[o]
      }
      let u = r() * z
      let pick = this.V - 1
      for (let o = 0; o < this.V; o++) {
        u -= p[o]
        if (u <= 0) {
          pick = o
          break
        }
      }
      ctx.push(pick)
      out += this.vocab[pick]
    }
    return out
  }
}
