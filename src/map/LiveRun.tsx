import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Src } from '../data/heroRun'
import { phase1 } from '../data/phase1'
import { RUN, runCounts } from '../data/run'
import { MetroMap } from './MetroMap'
import { MODEL_OWN_SUM, MODEL_USED_TOOL_ITSELF } from '../data/story'
import { RunEngine, type PlatformToken, type RunSnapshot } from './runEngine'
import { DepartureBoard } from './DepartureBoard'
import { Platform } from './Platform'

type Props = {
  /** Start playing when the map scrolls into view. Off by default: the student holds the clock. */
  autoplay?: boolean
  /** Let the student tap platform tokens (P01's Poke task). */
  onPick?: (t: PlatformToken) => void
  outline?: Src
  /** Replaces the "What to notice" column. */
  aside?: ReactNode
  /** Hide the platform and notes (a lighter view for the home page). */
  compact?: boolean
  id?: string
  onDone?: () => void
}

/** The living map with its board and controls, playing the recorded run. */
export function LiveRun({ autoplay = false, onPick, outline, aside, compact = false, id, onDone }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<RunEngine | null>(null)
  const [snap, setSnap] = useState<RunSnapshot | null>(null)
  const [reduced, setReduced] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (!svgRef.current) return
    const engine = new RunEngine({
      svg: svgRef.current,
      scroller: boxRef.current,
      run: RUN,
      onChange: (s) => {
        setSnap(s)
        if (s.done) doneRef.current?.()
      }
    })
    engineRef.current = engine
    setReduced(engine.reducedMotion)
    let io: IntersectionObserver | null = null
    let timer = 0
    if (autoplay && !engine.reducedMotion && boxRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            io?.disconnect()
            timer = window.setTimeout(() => engine.play(), 700)
          }
        },
        { threshold: 0.5 }
      )
      io.observe(boxRef.current)
    }
    return () => {
      io?.disconnect()
      window.clearTimeout(timer)
      engine.destroy()
    }
  }, [autoplay])

  const engine = engineRef.current
  const started = !!snap && (snap.playing || snap.trip > 0 || snap.done || snap.tokens.length > runCounts.question)
  const playLabel = snap?.done ? 'Ride again' : snap?.playing ? 'Pause' : started ? 'Continue' : 'Play the ride'
  const hint = snap?.done
    ? 'That’s the whole trip.'
    : reduced
      ? 'Reduced motion is on, so the train jumps between stations.'
      : started
        ? 'Pause anytime.'
        : 'About a minute. Nothing moves until you press play.'

  return (
    <section className="live" aria-label="The ride" id={id}>
      <div className="mapbox" ref={boxRef}>
        <MetroMap
          svgRef={svgRef}
          label="Transit map. The Prompt line runs from Send through Tokenizer, Embedding, Attention, The Stack, The Vote and The Loop to Reply. Branch lines: Library and Gatehouse from Send, Darkroom from Tokenizer, Academy from The Stack, Workshop and Scratchpad from The Loop, and the Reply spur."
        />
      </div>
      <DepartureBoard snap={snap} />
      <div className="controls">
        <button className="btn primary" type="button" onClick={() => (snap?.playing ? engine?.pause() : engine?.play())}>
          {playLabel}
        </button>
        {!compact && started && <button className="btn" type="button" onClick={() => engine?.next()}>Next stop</button>}
        {!compact && started && <button className="btn" type="button" onClick={() => engine?.restart()}>Restart</button>}
        <span className="hint">{hint}</span>
      </div>
      {!compact && (
        <>
          <div className="legend">
            <span><i className="lg-line dim" />line not used</span>
            <span><i className="lg-line" />line used</span>
            <span><i className="lg-lamp here" />train is here</span>
          </div>
          <div className="under-map">
            <Platform tokens={snap?.tokens ?? []} onPick={onPick} outline={outline} />
            {aside ?? (
              <div className="notice">
                <h3>What to notice</h3>
                <ul>
                  <li>The model writes one token per trip around the loop: {runCounts.trips} trips for this answer.</li>
                  <li>Most of what the model reads came from the app, not from you. You typed {runCounts.question} of {runCounts.total} tokens.</li>
                  <li>The Academy line, where models are trained, stays dark. Answering doesn’t change the model.</li>
                  {phase1.freeFirstTurn && !phase1.freeFirstTurn.usedTool && (
                    <li>Left to itself, this small model skipped the calculator and did the math in words. This ride follows the path where the app required the calculator.</li>
                  )}
                  {MODEL_USED_TOOL_ITSELF && MODEL_OWN_SUM && (
                    <li>Left to itself, this small model did ask for the calculator, but with the wrong sum ({MODEL_OWN_SUM}). The ride follows a corrected request. Small models need checking.</li>
                  )}
                </ul>
                <p className="src">{RUN.model ? `A recorded run of ${RUN.model}, a small open model. The numbers are real.` : 'Token splits are real; the route is scripted.'}</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
