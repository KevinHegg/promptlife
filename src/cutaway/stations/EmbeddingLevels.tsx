import { useEffect, useMemo, useRef, useState } from 'react'
import type { Station } from '../../data/network'
import { cosine, decodeStrip, phase2, type MapWord } from '../../data/phase2'
import { yes } from '../../lib/sound'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

/** One color per group (bright line colors, set in CSS for the dark panel), so groups read at a glance. */
const GROUP_COLORS = ['var(--g1)', 'var(--g2)', 'var(--g3)', 'var(--g4)', 'var(--g5)', 'var(--g6)']
const W = 360
const H = 250
const px = (w: MapWord) => 26 + ((w.x + 1) / 2) * (W - 52)
const py = (w: MapWord) => 30 + (1 - (w.y + 1) / 2) * (H - 54)
const label = (t: string) => t.trim()

/** A token's 896 numbers drawn as a barcode: warm for positive, cool for negative, faint near zero. */
export function Strip({ b64, label: name, small = false }: { b64: string; label: string; small?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const v = decodeStrip(b64)
    const css = getComputedStyle(c)
    const warm = css.getPropertyValue('--strip-warm').trim() || '#E8A33D'
    const cool = css.getPropertyValue('--strip-cool').trim() || '#2A6FDB'
    c.width = v.length
    c.height = 1
    ctx.clearRect(0, 0, c.width, 1)
    v.forEach((x, i) => {
      ctx.globalAlpha = Math.min(1, Math.abs(x) * 1.6)
      ctx.fillStyle = x >= 0 ? warm : cool
      ctx.fillRect(i, 0, 1, 1)
    })
  }, [b64])
  return (
    <figure className={`row-strip${small ? ' small' : ''}`}>
      <canvas ref={ref} role="img" aria-label={`The 896 numbers for “${name}”, drawn as a barcode`} />
      <figcaption><TokenText text={name} /></figcaption>
    </figure>
  )
}

export function WordMapView() {
  const map = phase2?.wordMap
  const [chosen, setChosen] = useState<string | null>(null)
  const [found, setFound] = useState(false)
  const byText = useMemo(() => new Map((map?.words ?? []).map((w) => [w.text, w])), [map])
  if (!map) return <p className="v-cap">The map of meaning arrives with the next trace run.</p>
  const groupIndex = new Map(map.groups.map((g, i) => [g.id, i]))
  const word = chosen ? byText.get(chosen) : undefined
  const near = word ? word.neighbors.map((n) => byText.get(n.text)).filter((w): w is MapWord => !!w) : []
  const centroids = map.groups.map((g) => {
    const ws = map.words.filter((w) => w.group === g.id)
    return { ...g, x: ws.reduce((a, w) => a + px(w), 0) / ws.length, y: ws.reduce((a, w) => a + py(w), 0) / ws.length }
  })
  const pick = (w: MapWord) => {
    setChosen(w.text)
    if (w.text === ' flour' && !found) {
      setFound(true)
      yes()
    }
  }
  return (
    <div className="v-col wordmap">
      <p className={`challenge${found ? ' done' : ''}`}>{found ? '✓ Found: flour’s neighbors' : 'Challenge: find the neighbors of “flour.”'}</p>
      <svg className="wm" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="A map of meaning: tap a word to see its nearest neighbors">
        {centroids.map((g) => (
          <text key={g.id} className="wm-group" x={Math.min(W - 30, Math.max(30, g.x))} y={Math.max(12, g.y - 16)} textAnchor="middle" style={{ fill: GROUP_COLORS[groupIndex.get(g.id) ?? 0] }}>
            {g.label}
          </text>
        ))}
        {word && near.map((n) => <line key={n.text} className="wm-link" x1={px(word)} y1={py(word)} x2={px(n)} y2={py(n)} />)}
        {map.words.map((w) => {
          const isChosen = w.text === chosen
          const isNear = near.includes(w)
          return (
            <g
              key={w.text}
              className={`wm-dot${isChosen ? ' on' : ''}${isNear ? ' near' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={label(w.text)}
              aria-pressed={isChosen}
              onClick={() => pick(w)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  pick(w)
                }
              }}
              style={{ ['--c' as string]: GROUP_COLORS[groupIndex.get(w.group) ?? 0] }}
            >
              <circle className="hit" cx={px(w)} cy={py(w)} r={11} />
              <circle className="dot" cx={px(w)} cy={py(w)} r={isChosen ? 6.5 : 4.5} />
              {isChosen && (
                <text x={Math.min(W - 24, Math.max(24, px(w)))} y={py(w) > 40 ? py(w) - 10 : py(w) + 18} textAnchor="middle">{label(w.text)}</text>
              )}
            </g>
          )
        })}
      </svg>
      {word ? (
        <div className="wm-detail">
          <p className="wm-title">Closest to “{label(word.text)}”, using all 896 numbers</p>
          <ol className="wm-near">
            {word.neighbors.map((n, _i, all) => (
              <li key={n.text}>
                <button type="button" className="chip-btn" onClick={() => { const w = byText.get(n.text); if (w) pick(w) }}>{label(n.text)}</button>
                <span className="wm-bar"><span style={{ width: `${Math.max(4, (n.cos / Math.max(...all.map((a) => a.cos), 0.01)) * 100)}%` }} /></span>
                <span className="wm-cos">{n.cos.toFixed(2)}</span>
              </li>
            ))}
          </ol>
          {word.text === ' flour' && map.flourNeighbors.length > 0 && (
            <p className="wm-vocab">
              Across all 151,665 tokens, flour’s closest rows mix meaning and spelling:{' '}
              {map.flourNeighbors.map((n) => n.text.trim()).filter((t) => t.length >= 5).slice(0, 8).join(', ')}.
            </p>
          )}
          <Strip b64={word.strip} label={word.text} />
          {near[0] && <Strip b64={near[0].strip} label={near[0].text} />}
        </div>
      ) : (
        <p className="v-cap">Tap any dot. Colors are groups; lines will point to the closest rows.</p>
      )}
      <p className="v-below">A flat map can’t hold 896 directions. Trust the neighbor list, not the distance on screen.</p>
    </div>
  )
}

function CosineWorked() {
  const map = phase2?.wordMap
  const [b, setB] = useState(' sugar')
  if (!map) return null
  const flour = map.words.find((w) => w.text === ' flour')
  const other = map.words.find((w) => w.text === b) ?? map.words[1]
  if (!flour || !other) return null
  const options = [' sugar', ' butter', ' cups', ' grandmother', ' Tokyo', ' eight'].filter((t) => map.words.some((w) => w.text === t))
  const c = cosine(decodeStrip(flour.strip), decodeStrip(other.strip))
  return (
    <div className="v-col">
      <div className="formula">cos(a, b) = (a · b) / (|a| |b|)</div>
      <div className="v-examples" role="group" aria-label="Compare flour with">
        {options.map((t) => (
          <button key={t} type="button" className="chip-btn" aria-pressed={t === b} onClick={() => setB(t)}>{t.trim()}</button>
        ))}
      </div>
      <div className="worked">
        cos(flour, {other.text.trim()}) ≈ <b>{c.toFixed(2)}</b>
        <br />multiply 896 pairs of numbers, add them up, divide by both lengths
        <br />1 = same direction · 0 = unrelated · −1 = opposite
      </div>
    </div>
  )
}

export function EmbeddingLevels({ station }: { station: Station }) {
  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText level={2} title="A map of meaning">
            <p>Each dot is a token’s row of 896 numbers, squashed onto a flat map.</p>
          </LevelText>
          <Vis>
            <WordMapView />
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="Measuring closeness">
            <p>Two rows are “close” when they point the same way. The usual measure is cosine similarity.</p>
          </LevelText>
          <Vis>
            <CosineWorked />
          </Vis>
        </Level>
      }
    />
  )
}
