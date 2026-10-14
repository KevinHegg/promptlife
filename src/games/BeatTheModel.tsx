import { useMemo, useState } from 'react'
import { phase1, type Guess } from '../data/phase1'
import { modelName, trace } from '../data/trace'
import { TokenText } from '../ui/TokenText'

type Round =
  | { kind: 'think'; context: string; truth: string; top: Guess[] }
  | { kind: 'beat'; context: string; truth: string; truthProb: number; truthRank: number; top: Guess[]; source: string }

const pct = (p: number) => (p >= 0.995 ? '99%+' : p < 0.001 ? '<0.1%' : `${(p * 100).toFixed(p < 0.1 ? 1 : 0)}%`)
const norm = (s: string) => s.trim().toLowerCase()

/** Four choices: the model's favorite, the true token, and two plausible others, shuffled. */
function choicesFor(r: Round): string[] {
  const pool = r.top.map((g) => g.text).filter((t) => /\w/.test(t))
  const picks = new Set<string>([pool[0], r.truth])
  for (const t of pool.slice(1, 25)) {
    if (picks.size >= 4) break
    if (![...picks].some((p) => norm(p) === norm(t))) picks.add(t)
  }
  return [...picks].sort(() => Math.random() - 0.5)
}

function buildRounds(): Round[] {
  const think: Round[] = phase1.beat.thinkLike.slice(0, 2).map((t) => ({ kind: 'think', context: t.context, truth: t.truth, top: t.top }))
  const beat: Round[] = [...phase1.beat.sentences]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((s) => ({ kind: 'beat', context: s.prefix, truth: s.truth, truthProb: s.truthProb, truthRank: s.truthRank, top: s.top, source: s.source }))
  return [...think, ...beat]
}

/**
 * Two kinds of round. "Think like the model": score the odds the model gave your guess.
 * "Beat the model": real human sentences; you win when you name the true word and the
 * model gave it under 20%.
 */
export function BeatTheModel({ onClose }: { onClose: () => void }) {
  const [rounds] = useState(buildRounds)
  const [k, setK] = useState(0)
  const [guess, setGuess] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [score, setScore] = useState(0)
  const r = rounds[k]
  const choices = useMemo(() => (r ? choicesFor(r) : []), [r])

  if (!rounds.length) {
    return <p className="muted">The game needs the recorded sentences from the trace pipeline.</p>
  }
  if (!r) {
    return (
      <div className="game done">
        <h3>Final score: {score}</h3>
        <p>Predictable text scores high, and the model is very good at predictable text. But likely isn't the same as true, or as what a person actually wrote.</p>
        <button type="button" className="btn primary" onClick={onClose}>Back to the station</button>
      </div>
    )
  }

  const probOf = (t: string) => r.top.find((g) => g.text === t)?.prob ?? r.top.find((g) => norm(g.text) === norm(t))?.prob ?? null
  const favorite = r.top[0]
  const submit = (t: string) => {
    if (guess !== null) return
    setGuess(t)
    if (r.kind === 'think') {
      setScore((s) => s + Math.round((probOf(t) ?? 0) * 100))
    } else if (norm(t) === norm(r.truth)) {
      setScore((s) => s + (r.truthProb < 0.2 ? 100 : 50))
    }
  }
  const p = guess !== null ? probOf(guess) : null
  const hit = guess !== null && norm(guess) === norm(r.truth)

  return (
    <div className="game">
      <div className="game-head">
        <p className="kicker">{r.kind === 'think' ? 'Think like the model' : 'Beat the model'} · round {k + 1} of {rounds.length}</p>
        <span className="mono">score {score}</span>
      </div>
      <p className="game-context">
        {r.context}
        <span className="blank">{guess !== null ? <TokenText text={r.truth} /> : '___'}</span>
      </p>
      {r.kind === 'beat' && <p className="game-src">{r.source}</p>}
      <div className="options" role="group" aria-label="Your guess">
        {choices.map((c) => (
          <button
            key={c}
            type="button"
            className={`option${guess === c ? ' picked' : ''}${guess !== null && norm(c) === norm(r.truth) ? ' correct' : ''}`}
            disabled={guess !== null}
            onClick={() => submit(c)}
          >
            <TokenText text={c} />
          </button>
        ))}
      </div>
      {guess === null && (
        <form className="type-own" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) submit(` ${typed.trim()}`) }}>
          <label htmlFor="own-guess">Or type your own</label>
          <input id="own-guess" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" maxLength={24} />
          <button type="submit" className="btn small">Guess</button>
        </form>
      )}
      {guess !== null && (
        <div className="game-result" aria-live="polite">
          {r.kind === 'think' ? (
            <p>
              The model gave your guess <b>{p === null ? 'less than its top 200 (below the cutoff)' : pct(p)}</b>, so you score {Math.round((p ?? 0) * 100)}. Its favorite was <b><TokenText text={favorite.text} /></b> at {pct(favorite.prob)}.
            </p>
          ) : hit ? (
            <p>
              <b>{r.truthProb < 0.2 ? 'You beat the model.' : 'You tied the model.'}</b> The writer used <b><TokenText text={r.truth} /></b>, and the model gave it {pct(r.truthProb)} (its favorite was <TokenText text={favorite.text} />).
            </p>
          ) : (
            <p>
              The writer used <b><TokenText text={r.truth} /></b>. The model gave that {pct(r.truthProb)}; its favorite was <b><TokenText text={favorite.text} /></b> at {pct(favorite.prob)}.
            </p>
          )}
          <button type="button" className="btn primary" onClick={() => { setK(k + 1); setGuess(null); setTyped('') }}>
            {k + 1 < rounds.length ? 'Next round →' : 'See your score →'}
          </button>
        </div>
      )}
      <p className="game-note">Odds from {trace ? modelName(trace) : 'the recorded model'}. Scores stay on this device.</p>
    </div>
  )
}
