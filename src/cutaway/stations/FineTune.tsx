import { useState, type ReactNode } from 'react'
import { academyRun, type AcademyRun } from '../../data/academy'
import { tick } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Term } from '../../ui/Term'

const pct = (p: number) => (p < 0.0001 ? 'under 0.01%' : `${Math.round(p * 100)}%`)

/** The last sentence of an answer, with a lead-in ellipsis when there's more before it. */
function conclusion(text: string) {
  const t = text.trim()
  const parts = t.split(/(?<=[.!?])\s+/)
  const last = parts[parts.length - 1] ?? t
  return parts.length > 1 ? `… ${last}` : last
}

function Card({ who, model, stat, statLabel, children }: { who: string; model: string; stat: string; statLabel: string; children: ReactNode }) {
  return (
    <div className="ft-card">
      <p className="kicker">{who}</p>
      <p className="ft-model">{model}</p>
      <div className="ft-stat">
        <b>{stat}</b>
        <span>{statLabel}</span>
      </div>
      {children}
    </div>
  )
}

/** Try it, part two: the same page, before and after fine-tuning, with and without the calculator. */
export function FineTune() {
  const [cond, setCond] = useState<AcademyRun['condition']>('tools')
  const base = academyRun('base', cond)
  const ft = academyRun('instruct', cond)
  if (!base || !ft) return <p className="muted">The before-and-after runs arrive with the next trace run.</p>
  const lines = base.text.split('\n')
  return (
    <div className="fine-tune">
      <Howto>Switch the calculator on and off, and compare the model before and after fine-tuning.</Howto>
      <div className="size-switch" role="group" aria-label="Calculator">
        {(['tools', 'plain'] as const).map((c) => (
          <button key={c} type="button" aria-pressed={cond === c} onClick={() => { setCond(c); tick() }}>
            {c === 'tools' ? 'With the calculator' : 'Without it'}
          </button>
        ))}
      </div>
      <div className="ft-pair">
        {cond === 'tools' ? (
          <>
            <Card who="Before: pretrained only" model={base.modelId} stat={pct(base.toolCallProb)} statLabel="chance it starts a calculator request">
              <blockquote className="ft-said">{lines.slice(0, 4).join('\n')}{'\n…'}</blockquote>
              <p className="ft-note">It copied the example sum from the instructions, then wrote “itant” over and over until we stopped it at {base.tokenCount} tokens.</p>
            </Card>
            <Card who="After: fine-tuned" model={`${ft.modelId}, our ride’s model`} stat={pct(ft.toolCallProb)} statLabel="chance it starts a calculator request">
              <blockquote className="ft-said">{ft.text.trim()}</blockquote>
              <p className="ft-note">A proper <Term id="tool-call">tool call</Term>, then it stopped and waited for the calculator. (It asked for the wrong sum, as the Workshop shows, but in the right format.)</p>
            </Card>
          </>
        ) : (
          <>
            <Card who="Before: pretrained only" model={base.modelId} stat={pct(base.stopProbAfterAnswer ?? 0)} statLabel="chance it stops after answering">
              <blockquote className="ft-said">{conclusion(base.text.slice(0, base.answerEnd))}</blockquote>
              <p className="ft-note">
                Then it kept going. It rewrote the app’s hidden instructions and your card, then wrote your next question for you: <b>“{base.inventedQuestion}”</b> and started answering that too.
              </p>
            </Card>
            <Card who="After: fine-tuned" model={`${ft.modelId}, our ride’s model`} stat={pct(ft.stopProbAfterAnswer ?? 0)} statLabel="chance it stops after answering">
              <blockquote className="ft-said">{conclusion(ft.text.slice(0, ft.answerEnd))}</blockquote>
              <p className="ft-note">Then it stopped: its turn was over. Without a calculator, both models get the math wrong; the right answer is about 8.4 cups.</p>
            </Card>
          </>
        )}
      </div>
      <p className="reveal">
        <b>Fine-tuning didn’t teach it the recipe or the arithmetic.</b> It taught the shape of a conversation: whose turn it is, when to stop, and how to ask for a tool. Same design, same size; only the numbers changed.
      </p>
    </div>
  )
}
