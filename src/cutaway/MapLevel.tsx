import type { Station } from '../data/network'
import { Level, Vis } from './Cutaway'

/** Level 1: the station sign beside a fragment of map, with the die-cut window over the lines. */
export function MapLevel({ station, children }: { station: Station; children?: React.ReactNode }) {
  return (
    <Level>
      <div className="lv-text">
        <span className="roundel" style={{ ['--c' as string]: 'var(--main)' }}>
          <b>{station.code.charAt(0)}</b>
          <b>{station.code.slice(1)}</b>
        </span>
        <h3>{station.name}</h3>
        <p>{station.oneLiner}</p>
        {children}
        <p className="lvtag">On the map</p>
      </div>
      <Vis>
        <svg className="lv1-map" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M0,40 H400 M0,90 H400 M0,170 H400 M0,220 H400 M60,0 V260 M140,0 V260 M260,0 V260 M340,0 V260" style={{ fill: 'none', stroke: 'var(--rule)', strokeWidth: 1 }} />
          <path d="M-20,30 H120 Q150,30 165,55 L235,175 Q250,200 280,200 H420" style={{ fill: 'none', stroke: 'var(--l-library)', strokeWidth: 9, strokeLinecap: 'round' }} />
          <path d="M90,290 V215 Q90,190 115,190 H160 L250,80 Q262,64 285,64 H420" style={{ fill: 'none', stroke: 'var(--l-workshop)', strokeWidth: 9, strokeLinecap: 'round' }} />
          <path d="M330,-20 V300" style={{ fill: 'none', stroke: 'var(--l-academy)', strokeWidth: 9, opacity: 0.3 }} />
          <path d="M-20,130 H420" style={{ fill: 'none', stroke: 'var(--main)', strokeWidth: 13 }} />
          <rect x="20" y="114" width="58" height="32" rx="16" style={{ fill: 'var(--sheet)', stroke: 'var(--main)', strokeWidth: 3 }} />
          <rect x="322" y="114" width="58" height="32" rx="16" style={{ fill: 'var(--sheet)', stroke: 'var(--main)', strokeWidth: 3 }} />
        </svg>
      </Vis>
    </Level>
  )
}
