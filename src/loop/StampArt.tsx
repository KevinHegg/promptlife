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
  // A chest of drawers, one pulled open, a striped strip of numbers falling out.
  P03: (
    <g className="st-ink" strokeWidth="2.5">
      <rect x="-40" y="-30" width="56" height="52" rx="3" fill="none" />
      <path d="M-40,-13 H16 M-40,4 H16 M-12,-30 V22" fill="none" />
      <rect x="-12" y="4" width="40" height="17" rx="2" fill="none" />
      <circle cx="-26" cy="-21" r="1.8" className="st-fill" />
      <circle cx="2" cy="-21" r="1.8" className="st-fill" />
      <circle cx="-26" cy="-4" r="1.8" className="st-fill" />
      <path d="M28,12 C36,14 40,20 42,30" fill="none" strokeWidth="7" strokeDasharray="2 2.4" />
    </g>
  ),
  // Arcs bridging over a row of chips, like a footbridge.
  P04: (
    <g className="st-ink" fill="none" strokeWidth="2.5" strokeLinecap="round">
      <rect x="-46" y="8" width="18" height="12" rx="3" />
      <rect x="-24" y="8" width="18" height="12" rx="3" />
      <rect x="-2" y="8" width="18" height="12" rx="3" />
      <rect x="20" y="8" width="26" height="12" rx="3" className="st-fill" />
      <path d="M33,6 C33,-34 -37,-34 -37,6" strokeWidth="4" />
      <path d="M33,6 C33,-18 -15,-18 -15,6" />
      <path d="M33,6 C33,-6 7,-6 7,6" opacity="0.6" />
    </g>
  ),
  // An elevator floor dial, needle near the top floor.
  P05: (
    <g className="st-ink" fill="none" strokeWidth="2.5" strokeLinecap="round">
      <path d="M-40,14 A40,40 0 0,1 40,14" />
      <path d="M-34,-6 L-29,-3 M-20,-22 L-17,-17 M0,-28 L0,-22 M20,-22 L17,-17 M34,-6 L29,-3" />
      <path d="M0,14 L27,-13" strokeWidth="3.5" />
      <circle cy="14" r="5" className="st-fill" />
      <rect x="-14" y="22" width="28" height="10" rx="2" />
    </g>
  ),
  // A loop of track with an arrow, and a trip counter.
  P07: (
    <g className="st-ink" fill="none" strokeWidth="2.5" strokeLinecap="round">
      <path d="M-30,6 C-30,-28 30,-28 30,6 C30,26 -30,26 -30,6" strokeWidth="4" />
      <path d="M24,-6 L30,6 L36,-6" />
      <rect x="-16" y="-2" width="32" height="14" rx="2" />
      <text className="st-small" x="0" y="9" textAnchor="middle" fill="currentColor" stroke="none">47</text>
    </g>
  ),
  // A speech bubble with a receipt tearing off its bottom edge.
  P08: (
    <g className="st-ink" fill="none" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M-38,-26 H38 V2 H-6 L-16,12 V2 H-38 Z" />
      <path d="M-26,-14 H26 M-26,-6 H12" />
      <path d="M-22,16 H22 V34 L16,30 L10,34 L4,30 L-2,34 L-8,30 L-14,34 L-22,30 Z" />
      <path d="M-14,21 H14 M-14,26 H6" strokeWidth="1.5" />
    </g>
  ),
  // Index cards with a magnifier over the top few: the app fetches only the top K.
  L: (
    <g className="st-ink" fill="none" strokeWidth="2.5">
      <rect x="-40" y="-14" width="34" height="24" rx="2" />
      <rect x="-30" y="-6" width="34" height="24" rx="2" />
      <rect x="-20" y="2" width="34" height="24" rx="2" />
      <circle cx="22" cy="-10" r="13" strokeWidth="3" />
      <path d="M31,-1 L42,10" strokeWidth="4" strokeLinecap="round" />
      <path d="M15,-12 H29 M15,-7 H25" strokeWidth="1.5" />
    </g>
  ),
  // A calculator: the model writes the request, the app does the math.
  W: (
    <g className="st-ink" fill="none" strokeWidth="2.5">
      <rect x="-24" y="-30" width="48" height="60" rx="5" />
      <rect x="-17" y="-23" width="34" height="12" rx="2" className="st-fill" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-17 + c * 12} y={-4 + r * 11} width="9" height="8" rx="1.5" />))}
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
