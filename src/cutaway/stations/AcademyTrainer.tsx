import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { library } from '../../data/library'
import { tick, yes } from '../../lib/sound'
import { TinyLM, rng } from '../../lib/tinyLM'
import { Howto } from '../../ui/Howto'
import { Dial } from '../../stations/parts'

/** Grandma's recipe box, the tiny model's whole training text. */
export const BOX = (library?.chunks ?? []).map((c) => c.text.toLowerCase()).join('\n')
export const START = 'recipe card: '
/** How long the Try it run trains, and how long each Break it run trains. */
const GOAL = 1500
const BREAK_ROUNDS = 800
/** About ten seconds from noise to recipe lines. */
const ROUNDS_PER_SECOND = 150

const pct = (p: number) => `${Math.round(p * 100)}%`
const fmt = (n: number) => n.toLocaleString('en-US')

/** Some of the model's numbers drawn as colored cells, warm for positive and cool for negative. */
function WeightStrip({ model, version }: { model: TinyLM; version: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const w = model.outputWeights
    const cols = 96
    const rows = Math.ceil(w.length / cols)
    c.width = cols
    c.height = rows
    const css = getComputedStyle(c)
    const warm = css.getPropertyValue('--doing').trim() || '#e8b45a'
    const cool = css.getPropertyValue('--l-library').trim() || '#3a8f8a'
    ctx.clearRect(0, 0, cols, rows)
    for (let i = 0; i < w.length; i++) {
      ctx.globalAlpha = Math.min(1, Math.abs(w[i]) * 0.9)
      ctx.fillStyle = w[i] >= 0 ? warm : cool
      ctx.fillRect(i % cols, Math.floor(i / cols), 1, 1)
    }
  }, [model, version])
  return <canvas ref={ref} className="weight-strip" role="img" aria-label="Some of the tiny model’s numbers, drawn as colored cells" />
}

/** The chance curve so far, as a small line. */
function Curve({ points, goal }: { points: { r: number; c: number }[]; goal: number }) {
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${((p.r / goal) * 300).toFixed(1)},${(80 - p.c * 76).toFixed(1)}`).join(' ')
  return (
    <svg className="train-curve" viewBox="-4 0 308 84" role="img" aria-label="The chance it gives the right next letter, rising as it trains">
      <line x1="0" y1="80" x2="300" y2="80" className="tc-axis" />
      {points.length > 1 && <path d={d} className="tc-line" />}
    </svg>
  )
}

type Snap = { rounds: number; chance: number; text: string; curve: { r: number; c: number }[] }

/**
 * Try it: a tiny letter-level model learns Grandma's recipe box, live. Every few rounds it writes
 * a line from “recipe card: ”, so you can watch noise turn into near-words.
 */
export function Trainer() {
  const model = useRef<TinyLM | null>(null)
  if (!model.current) model.current = new TinyLM(BOX)
  const first = (): Snap => {
    const m = model.current!
    return { rounds: 0, chance: m.chance(), text: m.write(START, 90), curve: [{ r: 0, c: m.chance() }] }
  }
  const [snap, setSnap] = useState<Snap>(first)
  const [running, setRunning] = useState(false)
  const frame = useRef(0)
  const lastTick = useRef(0)
  useEffect(() => {
    if (!running) return
    let raf = 0
    // Paced by the clock, not by frames, so a slow or throttled screen still trains at the same speed.
    const t0 = performance.now()
    const base = model.current!.rounds
    const loop = () => {
      const m = model.current!
      const now = performance.now()
      const due = Math.min(GOAL, base + Math.floor(((now - t0) / 1000) * ROUNDS_PER_SECOND))
      while (m.rounds < due && performance.now() - now < 14) m.step()
      frame.current++
      const done = m.rounds >= GOAL
      if (done || frame.current % 5 === 0) {
        const c = m.chance()
        if (Math.floor(m.rounds / 300) > Math.floor(lastTick.current / 300)) tick()
        lastTick.current = m.rounds
        setSnap((s) => ({ rounds: m.rounds, chance: c, text: m.write(START, 90), curve: [...s.curve, { r: m.rounds, c }] }))
      }
      if (done) {
        setRunning(false)
        yes()
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running])
  const m = model.current
  const done = snap.rounds >= GOAL
  const label = running ? 'Pause' : done ? 'Train again' : snap.rounds ? 'Keep training' : 'Start training'
  const press = () => {
    if (done) {
      model.current = new TinyLM(BOX)
      frame.current = 0
      lastTick.current = 0
      setSnap(first())
      setRunning(true)
      return
    }
    setRunning(!running)
  }
  return (
    <div className="trainer">
      <Howto>Tap “Start training” and watch what it writes.</Howto>
      <div className="trainer-said">
        <p className="kicker">What it writes now</p>
        <p className="trainer-text"><span className="muted">{START}</span>{snap.text}</p>
      </div>
      <div className="break-tiles">
        <div className="break-tile">
          <span className="kicker">Rounds of practice</span>
          <b>{fmt(snap.rounds)}</b>
          <small>of {fmt(GOAL)}</small>
        </div>
        <div className="break-tile">
          <span className="kicker">Right next letter</span>
          <b>{pct(snap.chance)}</b>
          <small>its average chance for the real next letter</small>
        </div>
      </div>
      <Curve points={snap.curve} goal={GOAL} />
      <div className="trainer-controls">
        <button type="button" className={`btn${running ? '' : ' primary'}`} onClick={press}>{label}</button>
      </div>
      <figure className="weight-fig">
        <WeightStrip model={m} version={snap.rounds} />
        <figcaption className="muted small">{fmt(m.outputWeights.length)} of its {fmt(m.size)} numbers. Each round nudges every one of them a little.</figcaption>
      </figure>
    </div>
  )
}

/** A few lines this exact model really writes at round 0, 100 and 1,500 (checked in tinyLM.test.ts). */
export const ARC = [
  { rounds: 0, text: "dfihtc'ehbbtall0159:f0gfauro8f4 p°6/p9fkt" },
  { rounds: 100, text: "grandma's cupe card: grandma's butter, 1 1gle cup bregs" },
  { rounds: 1500, text: "grandma's cornbread. serves 9. 1 cup butter, 1 cup flour" }
]

export function ArcPanel() {
  return (
    <figure className="arc-fig">
      <div className="arc-panel" role="img" aria-label="A tiny model’s writing at three points in training: noise, near-words, then recipe lines.">
        {ARC.map((a) => (
          <div key={a.rounds} className="arc-row">
            <span className="kicker">Round {fmt(a.rounds)}</span>
            <span className="arc-text">{a.text}</span>
          </div>
        ))}
      </div>
      <figcaption className="muted small">A tiny model learning to write Grandma’s recipe cards. You’ll train it yourself in a moment.</figcaption>
    </figure>
  )
}

type Page = { id: string; label: string; explain: string; text: () => string }

/** Shuffle every letter of a text, the same way every time. */
function scramble(t: string) {
  const r = rng(3)
  const a = [...t]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.join('')
}

export const PAGES: Page[] = [
  { id: 'box', label: 'Grandma’s cards', explain: 'Nothing. It practices on all 13 of Grandma’s recipe cards.', text: () => BOX },
  { id: 'typo', label: 'A typo everywhere', explain: 'Every “flour” on the cards now says “flower.” Nothing else changes.', text: () => BOX.replace(/flour/g, 'flower') },
  { id: 'one', label: 'Just one card', explain: 'It practices on the biscuit card alone, 150 letters instead of 1,612.', text: () => (library?.chunks[0]?.text ?? '').toLowerCase() },
  { id: 'scrambled', label: 'Scrambled letters', explain: 'The same 1,612 letters, shuffled into random order. No words survive.', text: () => scramble(BOX) }
]

const count = (t: string, w: string) => t.split(w).length - 1

/** What happened, said from the live result. */
function verdict(id: string, write: string, chance: number): ReactNode {
  if (id === 'typo') {
    const fl = count(write, 'flower')
    const fo = count(write.replace(/flower/g, ''), 'flour')
    return <>It wrote “flower” {fl} {fl === 1 ? 'time' : 'times'} and “flour” {fo} {fo === 1 ? 'time' : 'times'}. It copies its pages, mistakes and all.</>
  }
  if (id === 'one') return <>It gets {pct(chance)} of that card’s next letters right: it has nearly memorized it, and keeps repeating its words.</>
  if (id === 'scrambled') return <>It memorizes some of the shuffled sequence ({pct(chance)} right on those pages), but there are no words to learn, so it writes noise.</>
  return <>Recipe-shaped lines: quantities, ingredients, “serves.” {pct(chance)} of next letters right.</>
}

type Result = { write: string; chance: number; letters: number }

/** Break it: train the same tiny model on different pages, then read what it writes. */
export function TrainBreak({ takeaway }: { takeaway: ReactNode }) {
  const [id, setId] = useState(PAGES[0].id)
  const [results, setResults] = useState<Record<string, Result>>({})
  const [progress, setProgress] = useState(0)
  const [tried, setTried] = useState(false)
  const page = useMemo(() => PAGES.find((p) => p.id === id) ?? PAGES[0], [id])
  useEffect(() => {
    if (results[page.id]) return
    const text = page.text()
    const m = new TinyLM(text)
    let raf = 0
    const loop = () => {
      const now = performance.now()
      while (m.rounds < BREAK_ROUNDS && performance.now() - now < 14) m.step()
      setProgress(m.rounds / BREAK_ROUNDS)
      if (m.rounds >= BREAK_ROUNDS) {
        setResults((r) => ({ ...r, [page.id]: { write: m.write(START, 220), chance: m.chance(), letters: text.length } }))
        tick()
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [page, results])
  const res = results[page.id]
  const first = page.id === PAGES[0].id
  return (
    <div className="break-body">
      <Howto>Pick the pages it practices on. Each one trains a fresh copy for {fmt(BREAK_ROUNDS)} rounds.</Howto>
      <Dial<string>
        stops={PAGES.map((p) => p.id)}
        value={page.id}
        onChange={(v) => {
          setId(v)
          setProgress(0)
          if (v !== PAGES[0].id) setTried(true)
        }}
        label="Pages"
        format={(v) => PAGES.find((p) => p.id === v)?.label ?? v}
      />
      <div className={`sabotage-what${first ? '' : ' on'}`}>
        <p className="kicker">What we changed</p>
        <div>{page.explain}</div>
      </div>
      <div className={`break-result${first ? '' : ' broken'}`}>
        {res ? (
          <>
            <div className="said">
              <p className="kicker">What it writes</p>
              <blockquote className="trainer-text"><span className="muted">{START}</span>{res.write}</blockquote>
              <p className="break-stat">{verdict(page.id, res.write, res.chance)}</p>
            </div>
            <div className="break-tiles">
              <div className="break-tile">
                <span className="kicker">Right next letter</span>
                <b>{pct(res.chance)}</b>
                <small>on its own pages</small>
              </div>
              <div className="break-tile">
                <span className="kicker">Practice text</span>
                <b>{fmt(res.letters)}</b>
                <small>letters</small>
              </div>
            </div>
          </>
        ) : (
          <div className="train-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Training">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
            <p className="muted small">Training a fresh copy… {fmt(Math.round(progress * BREAK_ROUNDS))} rounds</p>
          </div>
        )}
        <p className="muted small">Trained live on your device. Same seed every time, so everyone gets the same model.</p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}

export type RaterPair = { id: string; ask: string; a: string; b: string; note: (pick: 'a' | 'b') => ReactNode }

/** Try it, part two: you are the rater. Pick the better reply of each real pair. */
export function Rater({ pairs, outro }: { pairs: RaterPair[]; outro: ReactNode }) {
  const [picks, setPicks] = useState<Record<string, 'a' | 'b'>>({})
  const done = pairs.every((p) => picks[p.id])
  return (
    <div className="rater">
      <Howto>For each pair, tap the reply you’d want the model to give more often.</Howto>
      {pairs.map((p, i) => {
        const pick = picks[p.id]
        return (
          <div key={p.id} className="rater-pair">
            <p className="kicker">Pair {i + 1} of {pairs.length}</p>
            <p className="rater-ask">{p.ask}</p>
            <div className="rater-options">
              {(['a', 'b'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`rater-reply${pick === k ? ' picked' : ''}`}
                  aria-pressed={pick === k}
                  onClick={() => {
                    setPicks((s) => ({ ...s, [p.id]: k }))
                    tick()
                  }}
                >
                  {k === 'a' ? p.a : p.b}
                </button>
              ))}
            </div>
            {pick && <p className="reveal">{p.note(pick)}</p>}
          </div>
        )
      })}
      {done && <div className="rater-outro">{outro}</div>}
    </div>
  )
}
