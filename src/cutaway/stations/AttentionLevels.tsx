import type { Station } from '../../data/network'
import type { AttentionView } from '../../data/placeholders'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

function Arcs({ view }: { view: AttentionView }) {
  const n = view.tokens.length
  const width = 440
  const gap = (width - 60) / Math.max(1, n - 1)
  const xs = view.tokens.map((_, i) => 30 + i * gap)
  const q = n - 1
  const max = Math.max(...view.tokens.slice(0, q).map((t) => t.w), 0.01)
  return (
    <svg className="v-attn" viewBox={`0 0 ${width} 196`} role="img" aria-label={`The token ${view.query.trim()} puts the most attention on ${view.tokens.slice(0, q).sort((a, b) => b.w - a.w)[0]?.text.trim()}`}>
      {view.tokens.slice(0, q).map((t, i) => {
        const x0 = xs[q]
        const x1 = xs[i]
        const h = 30 + (x0 - x1) * 0.42
        return (
          <path
            key={i}
            className="arc"
            d={`M${x0},140 C${x0},${140 - h} ${x1},${140 - h} ${x1},140`}
            strokeWidth={(1 + (t.w / max) * 9).toFixed(1)}
            opacity={(0.3 + 0.7 * (t.w / max)).toFixed(2)}
          />
        )
      })}
      {view.tokens.map((t, i) => {
        const label = t.text.trim() || '·'
        const wd = label.length * 7.6 + 16
        return (
          <g key={i}>
            <rect className={`chipbox${i === q ? ' hot' : ''}`} x={xs[i] - wd / 2} y={142} width={wd} height={22} rx={5} />
            <text x={xs[i]} y={157} textAnchor="middle">{label}</text>
            <text className="w" x={xs[i]} y={182} textAnchor="middle">{i === q ? `self ${t.w.toFixed(2)}` : t.w.toFixed(2)}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function AttentionLevels({ station, view }: { station: Station; view: AttentionView }) {
  return (
    <Cutaway
      stationName={station.name}
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText
            level={2}
            title={`Where “${view.query.trim()}” looks`}
            note={view.real ? view.source : 'Placeholder weights. The trace pipeline will supply real ones from a chosen head.'}
          >
            <p>Each token splits its attention across itself and the tokens before it, and the shares add up to 1. Thicker arcs carry more.</p>
          </LevelText>
          <Vis>
            <Arcs view={view} />
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
                d = vector length per head, often <b>64</b> or <b>128</b>
                <br />each row of weights adds up to <b>1</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
