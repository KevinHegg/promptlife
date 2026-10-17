import { useState } from 'react'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { RecipeCard } from '../../ui/RecipeCard'
import type { Station } from '../../data/network'
import type { AttentionView } from '../../data/placeholders'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

function chipLabel(text: string) {
  if (/^ +$/.test(text)) return '␣'
  if (text === '\n') return '↵'
  return text.trim() || text
}

/** A share of attention as a percentage; tiny shares read “<1%”, not a misleading 0%. */
const share = (w: number) => (w < 0.005 ? '<1%' : `${Math.round(w * 100)}%`)

/** Where a token sits, in a few words, for the tag under its chip. */
const PLACE: Record<string, string> = {
  rag: 'recipe card',
  user: 'your question',
  sys: 'hidden instructions',
  tool: 'calculator request',
  res: 'calculator answer',
  rep: 'reply'
}

/** The earlier token a head gives the most attention to. */
const topOf = (view: AttentionView) => view.tokens.slice(0, -1).reduce<AttentionView['tokens'][number] | undefined>((a, b) => (!a || b.w > a.w ? b : a), undefined)

/**
 * One head, one arc: the token that is looking (right) and the earlier token it gives the most
 * attention to (left), with that share written on the arc. Each head we show puts nearly all its
 * attention on one token, so the small shares are summed into one line instead of drawn.
 */
export function Arcs({ view }: { view: AttentionView }) {
  const query = view.tokens[view.tokens.length - 1]
  const top = topOf(view)
  if (!query || !top) return null
  const adjacent = query.pos !== undefined && top.pos !== undefined && query.pos - top.pos === 1
  const xa = adjacent ? 95 : 62
  const xb = adjacent ? 165 : 198
  const y = 100
  const h = adjacent ? 56 : 84
  const chips = [
    { t: top, x: xa, hot: false },
    { t: query, x: xb, hot: true }
  ]
  return (
    <svg className="v-attn" viewBox="0 18 260 132" role="img" aria-label={`“${chipLabel(query.text)}” gives ${share(top.w)} of its attention to “${chipLabel(top.text)}”.`}>
      <path className="arc" d={`M${xb},${y} C${xb},${y - h} ${xa},${y - h} ${xa},${y - 10}`} strokeWidth={(2 + top.w * 6).toFixed(1)} />
      <path className="arc-tip" d={`M${xa - 7},${y - 12} L${xa + 7},${y - 12} L${xa},${y - 1} Z`} />
      <text className="arc-share" x={(xa + xb) / 2} y={y - h * 0.75 - 10} textAnchor="middle">{share(top.w)} of its attention</text>
      {!adjacent && <text className="w" x={(xa + xb) / 2} y={y + 16} textAnchor="middle">…</text>}
      {chips.map(({ t, x, hot }) => {
        const w = chipLabel(t.text).length * 7.4 + 22
        return (
          <g key={x}>
            <rect className={`chipbox${hot ? ' hot' : ''}`} x={x - w / 2} y={y} width={w} height={24} rx={5} />
            <text x={x} y={y + 16} textAnchor="middle">{chipLabel(t.text)}</text>
            {t.src && PLACE[t.src] && <text className="w" x={x} y={y + 42} textAnchor="middle">{PLACE[t.src]}</text>}
          </g>
        )
      })}
    </svg>
  )
}

/** A token named in a sentence: quoted, or “the space” when it is only a space. */
const said = (text: string, start = false) => {
  const l = chipLabel(text)
  if (l === '␣') return start ? 'The space' : 'the space'
  if (l === '↵') return start ? 'The line break' : 'the line break'
  return `“${l}”`
}

/**
 * Under the arc: what this head does, then what the percentage means. When a head looks at the
 * recipe card, the card itself appears with that word marked.
 */
function ArcSources({ view }: { view: AttentionView }) {
  const query = view.tokens[view.tokens.length - 1]
  const top = topOf(view)
  if (!query || !top) return null
  const onCard = view.tokens.slice(0, -1).filter((t) => t.src === 'rag' && t.w >= 0.05)
  const max = Math.max(...onCard.map((t) => t.w), 0.01)
  return (
    <div className="arc-sources">
      <p>{view.label}</p>
      <p className="arc-meaning">
        Every token has 100% of its attention to share out among itself and the tokens before it. {said(query.text, true)} gives {share(top.w)} to {said(top.text)}; the other {share(Math.max(0, 1 - top.w))} is spread thin over the rest.
      </p>
      {onCard.length > 0 && (
        <RecipeCard
          highlight={Object.fromEntries(onCard.map((t) => [t.pos ?? -1, t.w / max]))}
          caption="The card you uploaded, with the word this head looks at marked."
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
            <p>This model has 336 heads. Here are four, nicknamed for what they do.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              {hasTarget && (
                <p className={`challenge${found ? ' done' : ''}`}>{found ? '✓ Found: the head that links “flour” in your question to the card' : 'Challenge: find the head that links “flour” in your question to “flour” on the card.'}</p>
              )}
              {views.length > 1 && <Howto>Tap a head to see where it looks.</Howto>}
              {views.length > 1 && (
                <div className="v-examples" role="group" aria-label="Attention heads">
                  {views.map((v, i) => (
                    <button key={v.name + i} type="button" className="chip-btn" aria-pressed={i === pick} onClick={() => choose(i)}>
                      {v.name}
                    </button>
                  ))}
                </div>
              )}
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
