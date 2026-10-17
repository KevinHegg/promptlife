import { useState } from 'react'
import { SCENARIO, TOOL_IN_WORDS } from '../../data/heroRun'
import { trace } from '../../data/trace'
import { open, tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Term } from '../../ui/Term'
import { TokenText } from '../../ui/TokenText'

/** The request the model wrote, exactly as it wrote it. */
const requestText = () => (trace ? trace.tokens.filter((t) => t.src === 'tool').map((t) => t.text).join('') : '')
/** The result as the model reads it back: tokens, like any other text. */
const resultTokens = () => (trace ? trace.tokens.filter((t) => t.src === 'res').map((t) => t.text) : SCENARIO.toolResult.split(''))

/** Evaluate the request's arithmetic, the way the app's calculator would. Only digits and + − × ÷. */
function calculate(expr: string): string {
  if (!/^[\d\s.+\-*/()]+$/.test(expr)) return '?'
  const value = Function(`"use strict"; return (${expr})`)() as number
  return Number.isFinite(value) ? String(Math.round(value * 1e6) / 1e6) : '?'
}

/**
 * The workbench: three steps that match the Workshop's stops on the map. Read the request the model
 * wrote, run the calculator (the app does the math, not the model), and paste the result back in as
 * tokens, which the reply then copies.
 */
export function WorkshopBench() {
  const [step, setStep] = useState(0)
  const request = requestText()
  const result = calculate(SCENARIO.toolExpression)
  const tokens = resultTokens()
  const go = (n: number) => {
    setStep(n)
    if (n === 2) open()
    else if (n === 3) yes()
    else tick()
  }
  return (
    <div className="bench">
      <Howto>Tap each button in turn, top to bottom.</Howto>
      <ol className="bench-steps">
        <li className={step >= 1 ? 'done' : 'now'}>
          <p className="bench-label">W1 · Read the request</p>
          {step >= 1 ? (
            <>
              <pre className="bench-raw">{request || SCENARIO.toolExpression}</pre>
              <p>In plain words: use the calculator on <b>{SCENARIO.toolExpression}</b>, that is, {TOOL_IN_WORDS}. The model wrote this as text, in a format it learned. It can’t run anything itself.</p>
            </>
          ) : (
            <button type="button" className="btn small primary" onClick={() => go(1)}>Read the model’s request</button>
          )}
        </li>
        <li className={step >= 2 ? 'done' : step === 1 ? 'now' : 'later'}>
          <p className="bench-label">W2 · Run the calculator</p>
          {step >= 2 ? (
            <p className="bench-result"><span className="bench-calc" aria-hidden="true">=</span> <b>{result}</b> <span className="muted small">The app ran it: exact, every time.</span></p>
          ) : (
            <button type="button" className="btn small primary" disabled={step < 1} onClick={() => go(2)}>Run the calculator</button>
          )}
        </li>
        <li className={step >= 3 ? 'done' : step === 2 ? 'now' : 'later'}>
          <p className="bench-label">W3 · Paste the result</p>
          {step >= 3 ? (
            <>
              <div className="chips-row bench-tokens">
                {tokens.map((t, i) => <span key={i} className="chip-tk"><b><TokenText text={t} /></b></span>)}
              </div>
              <p>The answer goes back in as {tokens.length} <Term id="token">tokens</Term>, like any text, and the model runs again. The reply copies it: “{SCENARIO.reply}”</p>
            </>
          ) : (
            <button type="button" className="btn small primary" disabled={step < 2} onClick={() => go(3)}>Paste it into the chat</button>
          )}
        </li>
      </ol>
      {step >= 3 && (
        <button type="button" className="link-btn" onClick={() => go(0)}>Start over</button>
      )}
    </div>
  )
}
