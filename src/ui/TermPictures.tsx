import type { ReactElement } from 'react'

/** Small chips in a row, for pictures made of tokens. */
function Chips({ words, y = 30, hot = -1, x0 = 10, gap = 6 }: { words: string[]; y?: number; hot?: number; x0?: number; gap?: number }) {
  let x = x0
  return (
    <>
      {words.map((w, i) => {
        const wd = Math.max(22, w.length * 7 + 12)
        const el = (
          <g key={i}>
            <rect x={x} y={y} width={wd} height="20" rx="4" className={i === hot ? 'tp-chip hot' : 'tp-chip'} />
            <text x={x + wd / 2} y={y + 14} textAnchor="middle" className="tp-text">{w}</text>
          </g>
        )
        x += wd + gap
        return el
      })}
    </>
  )
}

/** One arc from one chip center back to an earlier one. */
const arc = (x1: number, x0: number, y: number, h: number, w = 2.5, faint = false) => (
  <path d={`M${x1},${y} C${x1},${y - h} ${x0},${y - h} ${x0},${y}`} className={faint ? 'tp-arc faint' : 'tp-arc'} strokeWidth={w} />
)

/** A lane of five small dots with one head's way of looking back from the last dot. */
function Lane({ y, label, targets }: { y: number; label: string; targets: [number, number][] }) {
  const xs = [70, 110, 150, 190, 230]
  return (
    <g>
      <text x="8" y={y + 4} className="tp-label">{label}</text>
      {xs.map((x, i) => <circle key={i} cx={x} cy={y} r="5" className={i === 4 ? 'tp-dot hot' : 'tp-dot'} />)}
      {targets.map(([i, w], k) => <g key={k}>{arc(230, xs[i], y - 6, 10 + (230 - xs[i]) * 0.1, w)}</g>)}
    </g>
  )
}

export const TERM_PICTURES: Record<string, ReactElement> = {
  // Three heads, three different ways of looking back from the same token.
  'attention-head': (
    <svg viewBox="0 0 250 104">
      <Lane y={28} label="head 1" targets={[[3, 3.5]]} />
      <Lane y={60} label="head 2" targets={[[0, 3.5], [3, 1]]} />
      <Lane y={92} label="head 3" targets={[[1, 2], [2, 2], [3, 2]]} />
    </svg>
  ),
  attention: (
    <svg viewBox="0 0 250 64">
      <Chips words={['card', 'flour', '…', 'how', 'flour']} y={38} hot={4} />
      {arc(220, 63, 36, 30, 4)}
      {arc(220, 176, 36, 14, 1.2, true)}
    </svg>
  ),
  token: (
    <svg viewBox="0 0 250 56">
      <text x="10" y="20" className="tp-label">strawberry →</text>
      <Chips words={['st', 'raw', 'berry']} y={28} x0={10} />
    </svg>
  ),
  'token-id': (
    <svg viewBox="0 0 250 56">
      <Chips words={['st', 'raw', 'berry']} y={8} />
      <text x="10" y="48" className="tp-label">302 · 1618 · 19772</text>
      <path d="M150,18 H178 M172,12 L179,18 L172,24" className="tp-line" />
      <text x="186" y="22" className="tp-label">numbers</text>
    </svg>
  ),
  vocabulary: (
    <svg viewBox="0 0 250 56">
      <Chips words={['the', ' flour', 'st', 'raw', '面', '…']} y={18} gap={4} />
      <text x="10" y="54" className="tp-label">a fixed list of ~150,000 tokens</text>
    </svg>
  ),
  embedding: (
    <svg viewBox="0 0 250 56">
      <Chips words={['flour']} y={18} />
      <path d="M62,28 H82 M76,22 L83,28 L76,34" className="tp-line" />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={90 + i * 5} y={18} width="3.6" height="20" rx="0.8" className={(i * 7) % 5 < 2 ? 'tp-bar cool' : 'tp-bar'} style={{ opacity: 0.3 + ((i * 13) % 7) / 10 }} />
      ))}
      <text x="90" y="52" className="tp-label">896 numbers</text>
    </svg>
  ),
  vector: (
    <svg viewBox="0 0 250 64">
      <path d="M40,54 H220 M40,54 V6" className="tp-axis" />
      <path d="M40,54 L170,16" className="tp-line hot" />
      <path d="M40,54 L190,40" className="tp-line" />
      <text x="174" y="14" className="tp-label">flour</text>
      <text x="194" y="40" className="tp-label">Tokyo</text>
    </svg>
  ),
  layer: (
    <svg viewBox="0 0 250 72">
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x="20" y={8 + i * 10} width="90" height="8" rx="2" className={i === 0 ? 'tp-chip hot' : 'tp-chip'} />
      ))}
      <path d="M126,66 V10 M120,16 L126,9 L132,16" className="tp-line" />
      <text x="140" y="20" className="tp-label">24 layers</text>
      <text x="140" y="38" className="tp-label">each edits</text>
      <text x="140" y="54" className="tp-label">the numbers</text>
    </svg>
  ),
  'logit-lens': (
    <svg viewBox="0 0 250 72">
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x="20" y={8 + i * 10} width="90" height="8" rx="2" className="tp-chip" />
      ))}
      <circle cx="65" cy="42" r="9" className="tp-peek" />
      <text x="124" y="34" className="tp-label">peek at a floor:</text>
      <text x="124" y="50" className="tp-label">what would it guess?</text>
    </svg>
  ),
  probability: (
    <svg viewBox="0 0 250 64">
      {[
        ['8', 0.92],
        ['3', 0.05],
        ['9', 0.03]
      ].map(([t, p], i) => (
        <g key={i}>
          <text x="10" y={16 + i * 18} className="tp-text left">{t}</text>
          <rect x="30" y={6 + i * 18} width={Math.max(3, (p as number) * 180)} height="12" rx="3" className={i === 0 ? 'tp-bar' : 'tp-bar cool'} />
        </g>
      ))}
      <text x="216" y="16" className="tp-label">adds to</text>
      <text x="216" y="30" className="tp-label">100%</text>
    </svg>
  ),
  temperature: (
    <svg viewBox="0 0 250 64">
      <text x="10" y="12" className="tp-label">low</text>
      {[44, 6, 3].map((h, i) => <rect key={i} x={12 + i * 18} y={56 - h} width="12" height={h} rx="2" className="tp-bar" />)}
      <text x="140" y="12" className="tp-label">high</text>
      {[22, 17, 13].map((h, i) => <rect key={i} x={142 + i * 18} y={56 - h} width="12" height={h} rx="2" className="tp-bar cool" />)}
    </svg>
  ),
  context: (
    <svg viewBox="0 0 250 50">
      <rect x="10" y="12" width="40" height="16" rx="3" className="tp-chip" />
      <rect x="52" y="12" width="110" height="16" rx="3" className="tp-chip cool" />
      <rect x="164" y="12" width="40" height="16" rx="3" className="tp-chip hot" />
      <text x="10" y="44" className="tp-label">instructions · your upload · question</text>
    </svg>
  ),
  'context-window': (
    <svg viewBox="0 0 250 50">
      <rect x="10" y="12" width="230" height="14" rx="7" className="tp-track" />
      <rect x="10" y="12" width="6" height="14" rx="3" className="tp-bar" />
      <text x="10" y="44" className="tp-label">346 used of 32,768 it can hold</text>
    </svg>
  ),
  'stop-token': (
    <svg viewBox="0 0 250 50">
      <Chips words={['30', ' people', '.']} y={12} />
      <rect x="150" y="12" width="20" height="20" rx="3" className="tp-stop" />
      <text x="178" y="26" className="tp-label">stop</text>
    </svg>
  ),
  'autoregressive-generation': (
    <svg viewBox="0 0 250 60">
      <Chips words={['You', ' need', ' about']} y={30} />
      <path d="M190,40 C230,40 230,8 150,8 C110,8 104,24 104,28" className="tp-line" />
      <text x="196" y="56" className="tp-label">one token per trip</text>
    </svg>
  ),
  'kv-cache': (
    <svg viewBox="0 0 250 56">
      {Array.from({ length: 5 }, (_, i) => <rect key={i} x={10 + i * 4} y={10 + i * 4} width="60" height="30" rx="4" className="tp-chip" />)}
      <rect x="110" y="18" width="34" height="26" rx="4" className="tp-chip hot" />
      <text x="152" y="28" className="tp-label">work saved;</text>
      <text x="152" y="44" className="tp-label">only the new token</text>
    </svg>
  ),
  'tool-call': (
    <svg viewBox="0 0 250 56">
      <rect x="8" y="14" width="78" height="24" rx="5" className="tp-chip" />
      <text x="47" y="30" textAnchor="middle" className="tp-text">2.25*30/8</text>
      <path d="M90,26 H108 M102,20 L109,26 L102,32" className="tp-line" />
      <rect x="114" y="10" width="34" height="32" rx="4" className="tp-chip cool" />
      <text x="131" y="31" textAnchor="middle" className="tp-text">=</text>
      <path d="M152,26 H170 M164,20 L171,26 L164,32" className="tp-line" />
      <rect x="176" y="14" width="64" height="24" rx="5" className="tp-chip hot" />
      <text x="208" y="30" textAnchor="middle" className="tp-text">8.4375</text>
    </svg>
  ),
  retrieval: (
    <svg viewBox="0 0 250 60">
      {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 46} y={12} width="40" height="30" rx="3" className={i === 1 ? 'tp-chip hot' : 'tp-chip'} />)}
      <path d="M76,46 C90,58 150,58 170,40" className="tp-line" />
      <rect x="176" y="18" width="64" height="22" rx="5" className="tp-chip cool" />
      <text x="208" y="33" textAnchor="middle" className="tp-text">context</text>
    </svg>
  ),
  'system-prompt': (
    <svg viewBox="0 0 250 56">
      <rect x="10" y="6" width="150" height="18" rx="4" className="tp-chip faint" />
      <text x="16" y="19" className="tp-text left">“You are a helpful…”</text>
      <rect x="10" y="30" width="200" height="18" rx="4" className="tp-chip hot" />
      <text x="16" y="43" className="tp-text left">your question</text>
      <text x="170" y="19" className="tp-label">hidden</text>
    </svg>
  ),
  weights: (
    <svg viewBox="0 0 250 56">
      {Array.from({ length: 24 }, (_, i) => (
        <text key={i} x={10 + (i % 8) * 22} y={16 + Math.floor(i / 8) * 16} className="tp-label mono">{['.02', '-.4', '.13', '.7', '-.1', '.05', '.3', '-.6'][i % 8]}</text>
      ))}
      <text x="190" y="32" className="tp-label">494 million</text>
    </svg>
  )
}
