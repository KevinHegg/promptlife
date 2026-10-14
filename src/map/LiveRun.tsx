import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Src } from '../data/heroRun'
import { RUN, runCounts } from '../data/run'
import { phase1 } from '../data/phase1'
import { MetroMap } from './MetroMap'
import { RunEngine, type PlatformToken, type RunSnapshot } from './runEngine'
import { DepartureBoard } from './DepartureBoard'
import { Platform } from './Platform'

type Props = {
  /** Start playing when the map scrolls into view (default true). */
  autoplay?: boolean
  /** Let the student tap platform tokens (P01's Poke task). */
  onPick?: (t: PlatformToken) => void
  outline?: Src
  /** Replaces the "What to notice" column. */
  aside?: ReactNode
  onDone?: () => void
}

/** Board, controls, the living map and the platform, playing the recorded run. */
export function LiveRun({ autoplay = true, onPick, outline, aside, onDone }: Props) {
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
        { threshold: 0.2 }
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
  const playLabel = snap?.done ? 'Run again' : snap?.playing ? 'Pause' : 'Play'
  const hint = snap?.done
    ? `Run complete: ${snap.tokens.length} tokens on the platform.`
    : reduced
      ? 'Reduced motion is on, so the train jumps between stations.'
      : 'About a minute. Pause anytime.'

  return (
    <section className="live" aria-label="Live run">
      <DepartureBoard snap={snap} />
      <div className="controls">
        <button className="btn primary" type="button" onClick={() => (snap?.playing ? engine?.pause() : engine?.play())}>
          {playLabel}
        </button>
        <button className="btn" type="button" onClick={() => engine?.next()}>Next stop</button>
        <button className="btn" type="button" onClick={() => engine?.restart()}>Restart</button>
        <span className="hint">{hint}</span>
      </div>
      <div className="mapbox" ref={boxRef}>
        <MetroMap
          svgRef={svgRef}
          label="Transit map. The Prompt line runs from Send through Tokenizer, Embedding, Attention, The Stack, The Vote and The Loop to Reply. Branch lines: Library and Gatehouse from Send, Darkroom from Tokenizer, Academy from The Stack, Workshop and Scratchpad from The Loop, and the Reply spur."
        />
      </div>
      <div className="legend">
        <span><i className="lg-line dim" />line not used for this answer</span>
        <span><i className="lg-line" />line used</span>
        <span><i className="lg-lamp on" />station passed</span>
        <span><i className="lg-lamp here" />train is here</span>
      </div>
      <div className="under-map">
        <Platform tokens={snap?.tokens ?? []} onPick={onPick} outline={outline} />
        {aside ?? (
          <div className="notice">
            <h3>What to notice</h3>
            <ul>
              <li>One trip per new token: {runCounts.trips} trips, {runCounts.toolTrips} for the tool call and {runCounts.replyTrips} for the reply.</li>
              <li>New tokens loop straight back to Embedding, because they're already IDs. Fetched passages and the tool result go back through the Tokenizer, because they arrive as text.</li>
              <li>The Academy line never lights. Answering a question doesn't train the model.</li>
              {phase1.freeFirstTurn && !phase1.freeFirstTurn.usedTool && (
                <li>Left alone, this small model didn't call the calculator. It described a made-up one and concluded {phase1.freeFirstTurn.finalNumberMentioned ?? 'the wrong number'}%. This run follows the path where the app required the tool call.</li>
              )}
              <li>Only {runCounts.question} of the {runCounts.total} tokens on the platform are words the student typed.{runCounts.toolDescription ? ` The calculator's description alone is ${runCounts.toolDescription}.` : ''}</li>
            </ul>
            <p className="src">
              {RUN.model
                ? `A recorded run of ${RUN.model}, a small open model. Every token and every odds figure on the board is real. Where the model preferred a different token, the board says so.`
                : 'Token splits are real (o200k_base tokenizer). The route and timing are scripted.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
