import { useState } from 'react'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { RecipeCard } from '../../ui/RecipeCard'
import type { Station } from '../../data/network'
import type { AttentionView } from '../../data/placeholders'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

const SRC_LABEL: Record<string, string> = { sys: 'system', rag: 'passage', user: 'question', tool: 'tool call', res: 'tool result', rep: 'reply' }

function chipLabel(text: string) {
  if (/^ +$/.test(text)) return '␣'
  if (text === '\n') return '↵'
  return text.trim() || text
}

/** Chips laid out left to right in reading order, arcs from the query (last chip) back to earlier ones. */
/** A share of attention as a percentage; tiny shares read “<1%”, not a misleading 0%. */
const share = (w: number) => (w < 0.005 ? '<1%' : `${Math.round(w * 100)}%`)

export function Arcs({ view }: { view: AttentionView }) {
  const q = view.tokens.length - 1
  const widths = view.tokens.map((t) => chipLabel(t.text).length * 7.4 + 18)
  const xs: number[] = []
  let x = 10
  view.tokens.forEach((t, i) => {
    const prev = view.tokens[i - 1]
    if (i > 0) x += prev && t.pos !== undefined && prev.pos !== undefined && t.pos - prev.pos > 1 ? 30 : 12 // room for "…" between distant tokens
    xs.push(x + widths[i] / 2)
    x += widths[i]
  })
  const width = Math.max(300, x + 10)
  const max = Math.max(...view.tokens.slice(0, q).map((t) => t.w), 0.01)
  const strongest = [...view.tokens.slice(0, q)].sort((a, b) => b.w - a.w)[0]
  return (
    <svg className="v-attn" viewBox={`0 0 ${width} 196`} role="img" aria-label={`“${chipLabel(view.query)}” puts the most attention on “${chipLabel(strongest?.text ?? '')}”`}>
      {view.tokens.slice(0, q).map((t, i) => {
        const x0 = xs[q]
        const x1 = xs[i]
        const h = Math.min(126, 28 + (x0 - x1) * 0.45)
        return (
          <path
            key={i}
            className="arc"
            d={`M${x0},140 C${x0},${140 - h} ${x1},${140 - h} ${x1},140`}
            strokeWidth={(1 + (t.w / max) * 9).toFixed(1)}
            opacity={(0.25 + 0.75 * (t.w / max)).toFixed(2)}
          />
        )
      })}
      {view.tokens.map((t, i) => {
        const prev = view.tokens[i - 1]
        const gap = i > 0 && prev && t.pos !== undefined && prev.pos !== undefined && t.pos - prev.pos > 1
        return (
          <g key={i}>
            {gap && <text className="w" x={xs[i] - widths[i] / 2 - 15} y={157} textAnchor="middle">…</text>}
            <rect className={`chipbox${i === q ? ' hot' : ''}`} x={xs[i] - widths[i] / 2} y={142} width={widths[i]} height={22} rx={5}>
              {t.src && SRC_LABEL[t.src] && <title>{`from the ${SRC_LABEL[t.src]}`}</title>}
            </rect>
            <text x={xs[i]} y={157} textAnchor="middle">{chipLabel(t.text)}</text>
            <text className="w" x={xs[i]} y={180} textAnchor="middle">{i === q ? `itself ${share(t.w)}` : share(t.w)}</text>
          </g>
        )
      })}
    </svg>
  )
}

const WHERE: Record<string, string> = {
  rag: 'on the recipe card',
  user: 'in your question',
  sys: 'in the hidden instructions',
  tool: 'in the calculator request',
  res: 'in the calculator’s answer',
  rep: 'in the reply so far'
}
const pctW = (w: number) => `${Math.round(w * 100)}%`

/**
 * Where the arcs land, in words: which token is looking, and which earlier tokens get its weight,
 * each with where it sits. When a head looks at the recipe card, the card itself appears with
 * those words marked.
 */
function ArcSources({ view }: { view: AttentionView }) {
  const query = view.tokens[view.tokens.length - 1]
  const targets = view.tokens.slice(0, -1).filter((t) => t.w >= 0.01).sort((a, b) => b.w - a.w).slice(0, 3)
  const onCard = view.tokens.slice(0, -1).filter((t) => t.src === 'rag' && t.w >= 0.05)
  const max = Math.max(...onCard.map((t) => t.w), 0.01)
  return (
    <div className="arc-sources">
      <p>
        <b>“{chipLabel(query.text)}”</b>{query.src && WHERE[query.src] ? `, ${WHERE[query.src]},` : ''} looks back at{' '}
        {targets.length
          ? targets.map((t, i) => (
              <span key={i}>
                {i ? (i === targets.length - 1 ? ' and ' : ', ') : ''}
                <b>“{chipLabel(t.text)}”</b> {t.src && WHERE[t.src] ? WHERE[t.src] : ''} ({pctW(t.w)})
              </span>
            ))
          : 'many tokens a little each'}
        .
      </p>
      {onCard.length > 0 && (
        <RecipeCard
          highlight={Object.fromEntries(onCard.map((t) => [t.pos ?? -1, t.w / max]))}
          caption="The recipe card you uploaded, with the words this head looks at marked."
        />
      )}
    </div>
  )
}

/** The head a student is asked to find: the one linking “flour” in the question to the card. */
const TARGET = 'Looks at the card'

export function AttentionLevels({ station, views }: { station: Station; views: AttentionView[] }) {
  // Start on a different head, so the challenge isn't solved before it begins.
  const [pick, setPick] = useState(() => Math.max(0, views.findIndex((v) => v.name !== TARGET)))
  const [found, setFound] = useState(false)
  const view = views[pick] ?? views[0]
  const hasTarget = views.some((v) => v.name === TARGET)
  const choose = (i: number) => {
    setPick(i)
    tick()
    if (views[i]?.name === TARGET && !found) {
      setFound(true)
      yes()
    }
  }
  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText
            level={2}
            title={view.real ? 'Who looks where' : `Where “${chipLabel(view.query)}” looks`}
            note={view.real ? undefined : 'Placeholder weights. The trace pipeline will supply real ones from a chosen head.'}
          >
            <p>This model has 336 heads. We picked four with clear patterns and gave them nicknames. Thicker arcs mean more is borrowed from there.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              {hasTarget && (
                <p className={`challenge${found ? ' done' : ''}`}>{found ? '✓ Found: the head that links “flour” in your question to the card' : 'Challenge: find the head that links “flour” in your question to “flour” on the card.'}</p>
              )}
              {views.length > 1 && <Howto>Tap a head, one of the model’s ways of looking back. Its arcs show where one token borrows from.</Howto>}
              {views.length > 1 && (
                <div className="v-examples" role="group" aria-label="Attention heads">
                  {views.map((v, i) => (
                    <button key={v.name + i} type="button" className="chip-btn" aria-pressed={i === pick} onClick={() => choose(i)}>
                      {v.name}
                    </button>
                  ))}
                </div>
              )}
              {view.real && <p className="head-label">{view.label}</p>}
              <Arcs view={view} />
              {view.real && <ArcSources view={view} />}
              {view.real && view.source && <p className="v-below">{view.source}</p>}
            </div>
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="Queries, keys and values">
            <p>Every token makes three vectors: a query (what am I looking for?), a key (what do I offer?) and a value (what do I pass on?). Each query is compared with the keys of earlier tokens.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">
                score<sub>ij</sub> = q<sub>i</sub> · k<sub>j</sub> / √d
                <br />a<sub>ij</sub> = softmax<sub>j</sub>(score<sub>ij</sub>)
                <br />out<sub>i</sub> = Σ<sub>j</sub> a<sub>ij</sub> v<sub>j</sub>
              </div>
              <div className="worked">
                q, k, v: the query, key and value lists each token makes, <b>64</b> numbers each here (d)
                <br />softmax turns the scores into shares that add up to <b>1</b>; Σ means add them all up
                <br />the causal mask is the no-looking-ahead rule: later tokens are hidden
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
