import { useEffect, useMemo, useRef, useState } from 'react'
import type { Station } from '../../data/network'
import { cosine, decodeStrip, phase2, type MapWord } from '../../data/phase2'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
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
      <Howto>Tap a dot to see the words closest to it.</Howto>
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
        <p className="v-cap">Colors are groups. Lines will point to the closest rows.</p>
      )}
      <p className="v-below">A flat map can’t hold 896 directions. Trust the neighbor list, not the distance on screen.</p>
    </div>
  )
}

/** Two arrows from one point, with the angle between them: what cosine similarity measures. */
function Angle({ c, word }: { c: number; word: string }) {
  const theta = Math.acos(Math.max(-1, Math.min(1, c)))
  const deg = Math.round((theta * 180) / Math.PI)
  const O = { x: 116, y: 118 }
  const R = 92
  const tip = { x: O.x + R * Math.cos(theta), y: O.y - R * Math.sin(theta) }
  const arc = { x: O.x + 30 * Math.cos(theta), y: O.y - 30 * Math.sin(theta) }
  const mid = { x: O.x + 46 * Math.cos(theta / 2), y: O.y - 46 * Math.sin(theta / 2) }
  return (
    <svg className="cos-angle" viewBox="0 0 256 132" role="img" aria-label={`The arrows for flour and ${word} are ${deg} degrees apart.`}>
      <defs>
        <marker id="ca-head-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" className="ca-head-a" /></marker>
        <marker id="ca-head-b" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" className="ca-head-b" /></marker>
      </defs>
      <path d={`M${O.x + 30},${O.y} A30,30 0 0 0 ${arc.x.toFixed(1)},${arc.y.toFixed(1)}`} className="ca-arc" />
      <text x={mid.x} y={mid.y + 4} textAnchor="middle" className="ca-deg">{deg}°</text>
      <line x1={O.x} y1={O.y} x2={O.x + R} y2={O.y} className="ca-a" markerEnd="url(#ca-head-a)" />
      <line x1={O.x} y1={O.y} x2={tip.x.toFixed(1)} y2={tip.y.toFixed(1)} className="ca-b" markerEnd="url(#ca-head-b)" />
      <circle cx={O.x} cy={O.y} r="3" className="ca-o" />
      <text x={O.x + R + 4} y={O.y + 4} className="ca-label">flour</text>
      <text x={tip.x} y={tip.y - 7} textAnchor="middle" className="ca-label b">{word}</text>
    </svg>
  )
}

function CosineWorked() {
  const map = phase2?.wordMap
  const options = [' dough', ' sugar', ' cups', ' grandmother', ' eight', ' Tokyo'].filter((t) => map?.words.some((w) => w.text === t))
  const [b, setB] = useState(options[0] ?? ' sugar')
  if (!map) return null
  const flour = map.words.find((w) => w.text === ' flour')
  const other = map.words.find((w) => w.text === b)
  if (!flour || !other) return null
  // The recorded value when it's one of flour's listed neighbors; otherwise measured from the stored rows.
  const c = flour.neighbors.find((n) => n.text === b)?.cos ?? cosine(decodeStrip(flour.strip), decodeStrip(other.strip))
  const deg = Math.round((Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI)
  return (
    <div className="v-col cosine">
      <Howto>Pick a word to compare with flour.</Howto>
      <div className="v-examples wrap" role="group" aria-label="Compare flour with">
        {options.map((t) => (
          <button key={t} type="button" className="chip-btn" aria-pressed={t === b} onClick={() => { setB(t); tick() }}>{t.trim()}</button>
        ))}
      </div>
      <Angle c={c} word={b.trim()} />
      <p className="cos-read">cos(flour, {b.trim()}) ≈ <b>{c.toFixed(2)}</b>, an angle of {deg}°</p>
      <div className="formula">cos(a, b) = (a · b) / (|a| |b|)</div>
      <dl className="cos-key">
        <dt>a · b</dt>
        <dd>Multiply the 896 matching pairs of numbers, then add them up.</dd>
        <dt>|a|</dt>
        <dd>The length of arrow a: square each number, add them up, take the square root. Not absolute value, though for a single number the two match.</dd>
        <dt>result</dt>
        <dd>1 = same direction, 0 = a right angle (unrelated), −1 = opposite.</dd>
      </dl>
      <p className="v-below">Any two rows lie flat on one page, even with 896 numbers each, so the angle drawn is the real one. Here even close words sit at wide angles; what matters is which are less far apart.</p>
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
            <p>Picture each row as an arrow. Two rows are close when their arrows point the same way, and cosine similarity measures that angle.</p>
          </LevelText>
          <Vis>
            <CosineWorked />
          </Vis>
        </Level>
      }
    />
  )
}
