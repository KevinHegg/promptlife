import { useState, type ReactNode } from 'react'
import { asset, darkroom, diffusionRun, flourRight, patchSizes, type PatchSize } from '../../data/darkroom'
import { tick } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Dial } from '../../stations/parts'

/** The card as text, on our ride (the Gatehouse's count of the uploaded card). */
const CARD_TEXT_TOKENS = 72
const fmt = (n: number) => n.toLocaleString('en-US')

/** What happened at each size, said from the recorded answers (checked in darkroom.test.ts). */
const NOTES: Record<number, string> = {
  1200: 'It read every ingredient right, then added baking steps that aren’t on the card.',
  600: 'Read word for word, every line is right, the back of the card too. Asked about the flour, it said 2.14 cups.',
  300: 'It still read the ingredients right, missed the back of the card, and invented baking steps.',
  150: 'Ten tokens isn’t enough. It read “Butterly” Biscuits and invented a recipe full of sugar.'
}

/** The card at one size, drawn at full width so blur shows, with one square per token on top. */
export function PatchCard({ s, showGrid = true }: { s: PatchSize; showGrid?: boolean }) {
  const cols = s.grid.w / 2
  const rows = s.grid.h / 2
  return (
    <div className="patch-card" style={{ aspectRatio: `${s.resizedTo[0]} / ${s.resizedTo[1]}` }}>
      <img src={asset(s.file)} alt={`Grandma’s recipe card, ${s.width} pixels wide`} className={s.width < 600 ? 'pixelated' : ''} />
      {showGrid && <span className="patch-grid" aria-hidden="true" style={{ backgroundSize: `${100 / cols}% ${100 / rows}%` }} />}
    </div>
  )
}

/** Try it, part one: the same card at four sizes. Each square is one token the model reads. */
export function PatchView() {
  const sizes = patchSizes()
  const [w, setW] = useState(sizes[0]?.width ?? 1200)
  const s = sizes.find((x) => x.width === w) ?? sizes[0]
  if (!s) return <p className="muted">The pictures arrive with the next trace run.</p>
  const right = flourRight(s)
  return (
    <div className="patch-view">
      <Howto>Pick a size. Each square is one token the model reads.</Howto>
      <Dial<number> stops={sizes.map((x) => x.width)} value={s.width} onChange={(v) => { setW(v); tick() }} label="Width" format={(v) => `${v} px`} />
      <PatchCard s={s} />
      <div className="break-tiles">
        <div className="break-tile">
          <span className="kicker">This picture</span>
          <b>{fmt(s.tokens)}</b>
          <small>tokens: {s.grid.w / 2} across, {s.grid.h / 2} down</small>
        </div>
        <div className="break-tile">
          <span className="kicker">The card as text</span>
          <b>{CARD_TEXT_TOKENS}</b>
          <small>tokens on our ride</small>
        </div>
      </div>
      <div className="said">
        <p className="kicker">Asked how much flour, and how many it serves</p>
        <blockquote>{s.answers.flour.text}</blockquote>
        <p className="break-stat">{right ? '✓ Right: 2 1/4 cups, serves 8.' : '✗ Not quite: the card says 2 1/4 cups.'} {NOTES[s.width] ?? ''}</p>
      </div>
      <details className="read-all">
        <summary>Read what it wrote, word for word</summary>
        <div className="think-text">{s.answers.read.text}</div>
      </details>
      <p className="muted small">Real answers from {darkroom?.patches.model.split('/').pop()}, a small open model that reads pictures. It cuts each picture into 14-pixel squares and merges every 2 × 2 block into one token.</p>
    </div>
  )
}

/** Try it, part two: scrub through all 30 steps of a picture developing out of noise. */
export function DiffusionView() {
  const run = diffusionRun('prompt')
  const [step, setStep] = useState(0)
  if (!run) return <p className="muted">The diffusion frames arrive with the next trace run.</p>
  const last = run.frames.length - 1
  return (
    <div className="diffusion-view">
      <Howto>Drag the slider to watch the picture develop, step by step.</Howto>
      <p className="rt-q">“{run.prompt}”</p>
      <figure className="frame">
        <img src={asset(run.frames[step])} alt={step === 0 ? 'Pure noise, before the first step' : `The picture after step ${step} of ${last}`} />
        <figcaption>{step === 0 ? 'Step 0: pure noise' : `Step ${step} of ${last}`}</figcaption>
      </figure>
      <label className="v-slider" htmlFor="dstep">
        <span>Step</span>
        <input id="dstep" type="range" min={0} max={last} step={1} value={step} onChange={(e) => { setStep(parseInt(e.target.value, 10)); tick() }} />
        <span>{step}</span>
      </label>
      {step === last && (
        <p className="reveal">
          <b>Biscuits, but not an ink drawing.</b> It took “black ink” as something to put in the picture: a little dish of something black. The words steer the noise; they don’t command it.
        </p>
      )}
      <p className="muted small">Real frames from {darkroom?.diffusion.model.split('/').pop()}, an open image generator, run on a laptop. Each step removes a little noise, steered by the words.</p>
    </div>
  )
}

const BREAKS: { id: string; label: string; explain: string; frame: (runs: ReturnType<typeof diffusionRun>[]) => string | undefined; verdict: ReactNode }[] = [
  { id: 'normal', label: 'Normal', explain: 'Nothing. The words steer all 30 steps.', frame: ([p]) => p?.frames[30], verdict: 'Biscuits on plates, from noise in 30 steps.' },
  { id: 'early', label: 'Stop at step 10', explain: 'We stopped after 10 of the 30 steps and kept that picture.', frame: ([p]) => p?.frames[10], verdict: 'Still mostly noise: faint circles where the plates will be. The picture only appears in the later steps.' },
  { id: 'seed', label: 'Different noise', explain: 'The same words, starting from different random noise.', frame: ([, s]) => s?.frames[30], verdict: 'A different picture: other biscuits on a black-and-white plate. Nothing is stored and pasted in; every picture is made fresh from its noise.' },
  { id: 'nowords', label: 'No words', explain: 'The same starting noise as Normal, with the words taken away.', frame: ([, , n]) => n?.frames[30], verdict: 'Abstract silver swirls, nothing to do with biscuits. Without words, it develops whatever the noise suggests.' }
]

/** Break it: take the steering away, or stop early. */
export function DiffusionBreak({ takeaway }: { takeaway: ReactNode }) {
  const [id, setId] = useState(BREAKS[0].id)
  const [tried, setTried] = useState(false)
  const runs = [diffusionRun('prompt'), diffusionRun('prompt-seed2'), diffusionRun('no-steering')]
  const b = BREAKS.find((x) => x.id === id) ?? BREAKS[0]
  const src = b.frame(runs)
  const first = b.id === BREAKS[0].id
  return (
    <div className="break-body">
      <Howto>Pick one. Then read what we changed, and see what came out.</Howto>
      <Dial<string>
        stops={BREAKS.map((x) => x.id)}
        value={b.id}
        onChange={(v) => {
          setId(v)
          if (v !== BREAKS[0].id) setTried(true)
        }}
        label="Try"
        format={(v) => BREAKS.find((x) => x.id === v)?.label ?? v}
      />
      <div className={`sabotage-what${first ? '' : ' on'}`}>
        <p className="kicker">What we changed</p>
        <p>{b.explain}</p>
      </div>
      <div className={`break-result${first ? '' : ' broken'}`}>
        {src && (
          <figure className="frame">
            <img src={asset(src)} alt={b.label} />
          </figure>
        )}
        <p className="break-stat">{b.verdict}</p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}

/** Learn it: four frames of the same run, noise to picture. */
export function DevelopStrip() {
  const run = diffusionRun('prompt')
  if (!run) return null
  return (
    <figure className="develop-strip">
      <div>
        {[0, 10, 20, 30].map((k) => (
          <span key={k}>
            <img src={asset(run.frames[k])} alt={`Step ${k}`} />
            <small>step {k}</small>
          </span>
        ))}
      </div>
      <figcaption className="muted small">One picture developing out of noise, 30 steps.</figcaption>
    </figure>
  )
}
