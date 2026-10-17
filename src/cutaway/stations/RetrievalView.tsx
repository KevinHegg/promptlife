import { useState } from 'react'
import { chunkById, libraryRun, question, recordedKs, type Question } from '../../data/library'
import { pct } from '../../data/phase2'
import { tick } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Term } from '../../ui/Term'
import { Dial } from '../../stations/parts'

/**
 * Every card ranked by how well it matches the question, with a cut line under the top K. Cards that
 * really hold the answer get a check, so you can see which made the cut and which didn't.
 */
export function RankedCards({ q, k, compact = false, answerIds = [] }: { q: Question; k: number; compact?: boolean; answerIds?: string[] }) {
  const max = Math.max(...q.scores.map((s) => s.cos), 0.01)
  return (
    <ol className={`ranked${compact ? ' compact' : ''}`} aria-label={`Every card ranked by match; the top ${k} are pasted in.`}>
      {q.scores.map((s, i) => {
        const c = chunkById(s.chunk)
        const inside = i < k
        const holds = answerIds.includes(s.chunk)
        return (
          <li key={s.chunk} className={`${inside ? 'in' : 'out'}${holds ? ' holds' : ''}`}>
            <span className="rk-rank">{i + 1}</span>
            <span className="rk-card">{holds && <span className="rk-check" aria-label="holds part of the answer">✓</span>}{c?.card ?? s.chunk}</span>
            <span className="rk-bar"><span style={{ width: `${Math.max(3, (s.cos / max) * 100)}%` }} /></span>
            <span className="rk-cos">{s.cos.toFixed(2)}</span>
            {i === k - 1 && i < q.scores.length - 1 && <span className="rk-cut" aria-hidden="true">top {k} pasted in · the rest left out</span>}
          </li>
        )
      })}
    </ol>
  )
}

/** What happened at each K, said plainly from the recorded answers. */
const LOOKUP_NOTES: Record<number, string> = {
  1: 'The right amount, 2 1/4 cups, though it misreads “Serves 8” as “for every 8 biscuits.”',
  13: 'With all 13 cards, it quotes the right line, then concludes “6 tablespoons of flour,” the butter amount. More cards, more to mix up.'
}

type Mode = 'lookup' | 'all'

/**
 * Choose K, for two kinds of question. When one card holds the answer, top K works at almost any K.
 * When the answer is spread across many cards, small K misses some and large K muddles the answer
 * with wrong ones: the model lists whatever it was given.
 */
export function RetrievalView() {
  const [mode, setMode] = useState<Mode>('lookup')
  const q = question(mode === 'lookup' ? 'lookup' : 'all-buttermilk')
  const ks = recordedKs(mode)
  const [k, setK] = useState(3)
  if (!q || !ks.length) return <p className="v-cap">The recipe box arrives with the next trace run.</p>
  const kk = ks.includes(k) ? k : ks[Math.min(2, ks.length - 1)]
  const run = libraryRun(mode === 'lookup' ? `lookup-k${kk}` : `buttermilk-k${kk}`)
  const answerIds = mode === 'lookup' ? ['biscuits-front'] : q.scores.map((s) => s.chunk).filter((id) => chunkById(id)?.buttermilk)
  const total = mode === 'all' ? q.truth.recipes?.length ?? 6 : 1
  const series = ks.map((x) => {
    const r = libraryRun(mode === 'lookup' ? `lookup-k${x}` : `buttermilk-k${x}`)
    return { k: x, p: r?.rightAmount?.prob ?? 0, right: r?.correct ?? 0, wrong: r?.wrong ?? 0 }
  })
  const pick = (v: number) => {
    setK(v)
    tick()
  }
  return (
    <div className="v-col retrieval">
      <div className="v-examples wrap" role="group" aria-label="Question">
        <button type="button" className="chip-btn" aria-pressed={mode === 'lookup'} onClick={() => { setMode('lookup'); tick() }}>One card has the answer</button>
        <button type="button" className="chip-btn" aria-pressed={mode === 'all'} onClick={() => { setMode('all'); tick() }}>The answer is spread out</button>
      </div>
      <p className="rt-q">“{q.text}”</p>
      <Howto>Choose K: how many of the best-matching cards the app pastes in. Cards marked ✓ hold part of the answer.</Howto>
      <Dial<number> stops={ks} value={kk} onChange={pick} label="K" format={(v) => (v === ks[ks.length - 1] ? `${v} (all)` : String(v))} />
      <RankedCards q={q} k={kk} answerIds={answerIds} />
      <p className="v-cap">Scores from MiniLM, a small separate model that only measures how alike two texts are: 1 = alike, 0 = unrelated.</p>
      <div className="said">
        <p className="kicker">What it wrote with the top {kk}</p>
        <blockquote>{run?.text.trim() || '(nothing readable)'}</blockquote>
        {mode === 'lookup' ? (
          <p className="break-stat">{LOOKUP_NOTES[kk] ?? 'Right: 2 1/4 cups.'}</p>
        ) : (
          <p className="break-stat">
            It named {run?.correct ?? 0} of the {total} buttermilk recipes, missed {run?.missed ?? 0}
            {run?.wrong ? `, and wrongly named ${run.wrong} that don’t use buttermilk` : ''}. It lists whatever it was given.
          </p>
        )}
      </div>
      <figure className="k-chart">
        {mode === 'lookup' ? (
          <figcaption>Chance it starts the amount with “2” (as in 2 1/4 cups), at each K</figcaption>
        ) : (
          <figcaption>Buttermilk recipes named correctly (teal) and wrongly (red), at each K</figcaption>
        )}
        <div className="kc-bars">
          {series.map((s) => (
            <button key={s.k} type="button" className={`kc-bar${s.k === kk ? ' on' : ''}`} onClick={() => pick(s.k)} aria-label={mode === 'lookup' ? `K ${s.k}: ${pct(s.p)}` : `K ${s.k}: ${s.right} right, ${s.wrong} wrong`}>
              {mode === 'lookup' ? (
                <>
                  <span className="kc-fill" style={{ height: `${Math.max(3, s.p * 100)}%` }} />
                  <span className="kc-p">{pct(s.p)}</span>
                </>
              ) : (
                <>
                  <span className="kc-stack">
                    <span className="kc-wrong" style={{ height: `${(s.wrong / 13) * 100}%` }} />
                    <span className="kc-fill" style={{ height: `${(s.right / 13) * 100}%` }} />
                  </span>
                  <span className="kc-p">{s.right}/{s.wrong}</span>
                </>
              )}
              <span className="kc-k">K {s.k}</span>
            </button>
          ))}
        </div>
      </figure>
      <p className="v-below">This is <Term id="top-k-retrieval">top-K retrieval</Term>. The model only ever sees the cards above the cut, and it rarely says so.</p>
    </div>
  )
}
