import type { ReactElement } from 'react'
import { stationByCode } from '../data/network'

/** Station stamps in the spirit of Japanese eki stamps: one ink color, a ring, a small scene. */
export function StampArt({ code, date, size = 150, faded = false }: { code: string; date?: string; size?: number; faded?: boolean }) {
  const station = stationByCode(code)
  const name = station?.name ?? code
  return (
    <svg className={`stamp-art${faded ? ' faded' : ''}`} viewBox="0 0 160 160" width={size} height={size} role="img" aria-label={`${code} ${name} stamp${date ? `, ${date}` : ''}`}>
      <defs>
        <path id={`ring-${code}`} d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
      </defs>
      <circle cx="80" cy="80" r="74" className="st-ink" fill="none" strokeWidth="4" />
      <circle cx="80" cy="80" r="66" className="st-ink" fill="none" strokeWidth="1.5" />
      <text className="st-ring-text">
        <textPath href={`#ring-${code}`} startOffset="50%" textAnchor="middle">
          {`PROMPT LIFE · ${name.toUpperCase()} · ${code}`}
        </textPath>
      </text>
      <g transform="translate(80 84)">{SCENES[code] ?? <text className="st-big" y="8" textAnchor="middle">{code}</text>}</g>
      {date && <text className="st-date" x="80" y="128" textAnchor="middle">{date}</text>}
    </svg>
  )
}

const SCENES: Record<string, ReactElement> = {
  // A round Send button with lines fanning out from it.
  P01: (
    <g className="st-ink" fill="none" strokeWidth="3" strokeLinecap="round">
      <circle r="13" />
      <path d="M-5,0 L6,0 M2,-5 L7,0 L2,5" />
      <path d="M14,-8 Q30,-18 40,-30 M15,0 L42,0 M14,8 Q30,18 40,30" />
      <path d="M-14,-8 Q-30,-18 -40,-30 M-15,0 L-42,0 M-14,8 Q-30,18 -40,30" opacity="0.5" />
    </g>
  ),
  // A paper strip cut into chips, each with a tiny ticket number.
  P02: (
    <g className="st-ink" fill="none" strokeWidth="2.5">
      <rect x="-44" y="-22" width="24" height="16" rx="3" />
      <rect x="-16" y="-22" width="30" height="16" rx="3" />
      <rect x="18" y="-22" width="26" height="16" rx="3" />
      <path d="M-32,-6 V4 M-1,-6 V4 M31,-6 V4" strokeDasharray="2 2" />
      <text className="st-small" x="-32" y="16" textAnchor="middle">922</text>
      <text className="st-small" x="-1" y="16" textAnchor="middle">28420</text>
      <text className="st-small" x="31" y="16" textAnchor="middle">30</text>
      <path d="M-46,26 L46,26" strokeDasharray="4 3" />
    </g>
  ),
  // A departure board with one lit row.
  P06: (
    <g className="st-ink" strokeWidth="2.5">
      <rect x="-44" y="-28" width="88" height="56" rx="5" fill="none" />
      <rect x="-36" y="-19" width="58" height="8" rx="2" className="st-fill" />
      <rect x="-36" y="-5" width="34" height="8" rx="2" fill="none" />
      <rect x="-36" y="9" width="18" height="8" rx="2" fill="none" />
      <circle cx="32" cy="-15" r="4" className="st-fill" />
    </g>
  )
}
