import { useEffect, useRef, useState } from 'react'
import { HERO_TOKENS } from '../data/heroRun'
import { MetroMap } from './MetroMap'
import { RunEngine, type RunSnapshot } from './runEngine'
import { DepartureBoard } from './DepartureBoard'
import { Platform } from './Platform'

/** The home-screen hero: board, controls, the living map, and the platform. */
export function LiveRun() {
  const svgRef = useRef<SVGSVGElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<RunEngine | null>(null)
  const [snap, setSnap] = useState<RunSnapshot | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return
    const engine = new RunEngine({ svg: svgRef.current, scroller: boxRef.current, tokens: HERO_TOKENS, onChange: setSnap })
    engineRef.current = engine
    setReduced(engine.reducedMotion)
    let io: IntersectionObserver | null = null
    let timer = 0
    if (!engine.reducedMotion && boxRef.current) {
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
  }, [])

  const engine = engineRef.current
  const playLabel = snap?.done ? 'Run again' : snap?.playing ? 'Pause' : 'Play'
  const hint = snap?.done
    ? `Run complete. All ${snap.tokens.length} tokens are on the platform below.`
    : reduced
      ? 'Reduced motion is on, so the train jumps between stations.'
      : 'About a minute. Pause anytime.'

  return (
    <section className="live" aria-labelledby="live-title">
      <h2 id="live-title" className="visually-hidden">Live run</h2>
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
        <Platform tokens={snap?.tokens ?? []} />
        <div className="notice">
          <h3>What to notice</h3>
          <ul>
            <li>One trip per new token. A {HERO_TOKENS.rep.length}-token answer plus a {HERO_TOKENS.tool.length}-token tool call takes {HERO_TOKENS.rep.length + HERO_TOKENS.tool.length} trips.</li>
            <li>New tokens loop straight back to Embedding, because they're already IDs. Fetched passages and the tool result go back through the Tokenizer, because they arrive as text.</li>
            <li>The Academy line never lights. Answering a question doesn't train the model.</li>
            <li>Only {HERO_TOKENS.user.length} of the tokens on the platform are words the student typed.</li>
          </ul>
          <p className="src">Token splits are real (o200k_base tokenizer). The route, the passages and the timing are scripted; the trace pipeline will replace them with a recorded run of a small open model.</p>
        </div>
      </div>
    </section>
  )
}
