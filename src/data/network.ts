/**
 * The transit network. Coordinates live in one 1120 × 490 map space shared by the
 * full map, the station strips, and the run engine's motion paths.
 */
export type LineId = 'P' | 'L' | 'W' | 'G' | 'A' | 'S' | 'D' | 'R'

export type Line = { id: LineId; name: string; color: string; blurb: string }

export const LINES: Record<LineId, Line> = {
  P: { id: 'P', name: 'Prompt line', color: 'var(--main)', blurb: 'One run of the model, from your question to its reply.' },
  L: { id: 'L', name: 'Library', color: 'var(--l-library)', blurb: 'How apps find your documents and hand them to the model.' },
  W: { id: 'W', name: 'Workshop', color: 'var(--l-workshop)', blurb: 'How a model “uses” a calculator or other tools: it writes a request, and the app runs it.' },
  G: { id: 'G', name: 'Gatehouse', color: 'var(--l-gate)', blurb: 'The hidden instructions every app adds, and how people trick models into ignoring them.' },
  A: { id: 'A', name: 'Academy', color: 'var(--l-academy)', blurb: 'Training: where the model’s numbers came from.' },
  S: { id: 'S', name: 'Scratchpad', color: 'var(--l-scratch)', blurb: 'Reasoning models write their working before answering.' },
  D: { id: 'D', name: 'Darkroom', color: 'var(--l-dark)', blurb: 'Images become tokens; diffusion develops pictures from noise.' },
  R: { id: 'R', name: 'Reply spur', color: 'var(--l-reply)', blurb: 'The Ledger of costs, and the Debug the Bot capstone.' }
}

export type Station = {
  code: string
  name: string
  x: number
  oneLiner: string
}

export const MAIN_Y = 255

export const STATIONS: Station[] = [
  { code: 'P01', name: 'Send', x: 70, oneLiner: 'Your question boards the train.' },
  { code: 'P02', name: 'Tokenizer', x: 330, oneLiner: 'Text becomes tokens, and tokens become numbers.' },
  { code: 'P03', name: 'Embedding', x: 450, oneLiner: 'Each token’s number pulls out a long list of numbers.' },
  { code: 'P04', name: 'Attention', x: 570, oneLiner: 'Tokens look back at each other.' },
  { code: 'P05', name: 'The Stack', x: 690, oneLiner: 'Floor after floor sharpens its guess for the next token.' },
  { code: 'P06', name: 'The Vote', x: 810, oneLiner: 'Scores become odds, and one token wins.' },
  { code: 'P07', name: 'The Loop', x: 930, oneLiner: 'The new token joins, and the train goes again.' },
  { code: 'P08', name: 'Reply', x: 1040, oneLiner: 'The answer arrives.' }
]

export const stationByCode = (code: string) => STATIONS.find((s) => s.code === code)

export type Stop = {
  code: string
  line: LineId
  x: number
  y: number
  terminus?: boolean
}

export const STOPS: Stop[] = [
  { code: 'L1', line: 'L', x: 70, y: 190 },
  { code: 'L2', line: 'L', x: 200, y: 110 },
  { code: 'L3', line: 'L', x: 330, y: 190 },
  { code: 'G1', line: 'G', x: 70, y: 330 },
  { code: 'G2', line: 'G', x: 70, y: 400, terminus: true },
  { code: 'D1', line: 'D', x: 400, y: 165 },
  { code: 'D2', line: 'D', x: 400, y: 110, terminus: true },
  { code: 'A1', line: 'A', x: 690, y: 200 },
  { code: 'A2', line: 'A', x: 690, y: 155 },
  { code: 'A3', line: 'A', x: 690, y: 110, terminus: true },
  { code: 'S1', line: 'S', x: 930, y: 150, terminus: true },
  { code: 'R1', line: 'R', x: 1040, y: 190 },
  { code: 'R2', line: 'R', x: 1040, y: 100, terminus: true },
  { code: 'W1', line: 'W', x: 810, y: 440 },
  { code: 'W2', line: 'W', x: 640, y: 440 },
  { code: 'W3', line: 'W', x: 470, y: 440 }
]

/** Visible branch geometry. L and W double as motion paths for the train. */
export const BRANCH_PATHS: Record<Exclude<LineId, 'P'>, string> = {
  L: 'M70,255 V130 Q70,110 90,110 H310 Q330,110 330,130 V255',
  G: 'M70,255 V400',
  D: 'M362,240 L400,202 V110',
  A: 'M690,240 V110',
  S: 'M930,240 V150',
  R: 'M1040,240 V100',
  W: 'M930,255 V420 Q930,440 910,440 H350 Q330,440 330,420 V255'
}

/** Invisible paths the train rides on. */
export const MOTION_PATHS = {
  lib: BRANCH_PATHS.L,
  work: BRANCH_PATHS.W,
  main: 'M330,255 H930',
  ar: 'M930,255 C900,345 480,345 450,255',
  reply: 'M930,255 H1040'
} as const

export type MotionKey = keyof typeof MOTION_PATHS

export const STOP_NAMES: Record<string, string> = {
  L1: 'Search your uploads',
  L2: 'Find matches',
  L3: 'Add to context',
  G1: 'Hidden instructions',
  G2: 'Injection heist',
  D1: 'Image patches',
  D2: 'Diffusion',
  A1: 'Pretraining',
  A2: 'Fine-tuning',
  A3: 'Human feedback',
  S1: 'Thinking tokens',
  R1: 'The Ledger',
  R2: 'Debug the Bot',
  W1: 'Read the request',
  W2: 'Run the calculator',
  W3: 'Paste the result'
}
