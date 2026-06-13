import React from 'react'

type Tone = 'paper' | 'mint' | 'amber' | 'sakura' | 'indigo' | 'muted' | 'risk' | 'success' | 'violet'
type Point = [number, number]

function toneClass(tone: Tone = 'paper') {
  return `dk-tone-${tone}`
}

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function DiagramFrame({ id, title, children, className = '' }: { id?: string, title?: string, children: React.ReactNode, className?: string }) {
  return (
    <article id={id} className={classNames('diagram-kit-frame', className)}>
      {title && <h3>{title}</h3>}
      {children}
    </article>
  )
}

export function DiagramScene({ label, children, viewBox = '0 0 320 210' }: { label: string, children: React.ReactNode, viewBox?: string }) {
  return (
    <div className="diagram-kit-scene" role="img" aria-label={label}>
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" focusable="false">
        {children}
      </svg>
    </div>
  )
}

export function PaperNode({
  x,
  y,
  width = 72,
  height = 30,
  label,
  tone = 'paper',
  className = ''
}: {
  x: number,
  y: number,
  width?: number,
  height?: number,
  label: string,
  tone?: Tone,
  className?: string
}) {
  const fold = Math.min(10, width * 0.18, height * 0.38)
  const darkLabel = !['indigo', 'muted'].includes(tone)
  return (
    <g className={classNames('dk-paper-node-group', className)}>
      <rect className={classNames('dk-paper-node', toneClass(tone))} x={x} y={y} width={width} height={height} rx="7" />
      <path className="dk-fold" d={`M${x + width - fold} ${y} L${x + width} ${y + fold} L${x + width - fold} ${y + fold} Z`} />
      <text className={classNames('dk-label', darkLabel && 'dk-label-dark')} x={x + width / 2} y={y + height / 2 + 4} textAnchor="middle">{label}</text>
    </g>
  )
}

export function PaperPanel({
  x,
  y,
  width,
  height,
  label,
  tone = 'paper',
  children
}: {
  x: number,
  y: number,
  width: number,
  height: number,
  label?: string,
  tone?: Tone,
  children?: React.ReactNode
}) {
  return (
    <g>
      <rect className={classNames('dk-paper-panel', toneClass(tone))} x={x} y={y} width={width} height={height} rx="10" />
      <path className="dk-panel-fold" d={`M${x + width - 20} ${y} L${x + width} ${y + 20} L${x + width - 20} ${y + 20} Z`} />
      {label && <text className="dk-label dk-label-strong" x={x + 14} y={y + 24}>{label}</text>}
      {children}
    </g>
  )
}

export function NeonPath({ d, tone = 'mint', dashed = false, width = 2.3 }: { d: string, tone?: Tone, dashed?: boolean, width?: number }) {
  return <path className={classNames('dk-neon-path', toneClass(tone), dashed && 'dk-dashed')} d={d} strokeWidth={width} />
}

export function NeonArrow({ d, tone = 'mint', dashed = false, width = 2.4 }: { d: string, tone?: Tone, dashed?: boolean, width?: number }) {
  const markerId = React.useId().replace(/:/g, '')
  return (
    <g>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path className={classNames('dk-arrow-head', toneClass(tone))} d="M0 0 L10 5 L0 10 Z" />
        </marker>
      </defs>
      <path className={classNames('dk-neon-arrow', toneClass(tone), dashed && 'dk-dashed')} d={d} strokeWidth={width} markerEnd={`url(#${markerId})`} />
    </g>
  )
}

export function CalloutSeal({ x, y, label, tone = 'amber' }: { x: number, y: number, label: string | number, tone?: Tone }) {
  return (
    <g>
      <circle className={classNames('dk-callout-seal', toneClass(tone))} cx={x} cy={y} r="11" />
      <text className="dk-label dk-label-dark dk-label-small" x={x} y={y + 4} textAnchor="middle">{label}</text>
    </g>
  )
}

export function TokenChip({ x, y, label, width = 44, tone = 'mint' }: { x: number, y: number, label: string, width?: number, tone?: Tone }) {
  return (
    <g>
      <rect className={classNames('dk-token-chip', toneClass(tone))} x={x} y={y} width={width} height="22" rx="6" />
      <text className="dk-label dk-label-dark dk-label-small" x={x + width / 2} y={y + 15} textAnchor="middle">{label}</text>
    </g>
  )
}

export function ContextTray({ x, y, width, height, label = 'context' }: { x: number, y: number, width: number, height: number, label?: string }) {
  return (
    <g>
      <rect className="dk-context-tray" x={x} y={y} width={width} height={height} rx="11" />
      <text className="dk-label dk-label-small dk-muted" x={x + 12} y={y + 18}>{label}</text>
    </g>
  )
}

export function VectorBar({ x, y, width = 76, values }: { x: number, y: number, width?: number, values: number[] }) {
  const barWidth = width / values.length - 2
  return (
    <g>
      {values.map((value, index) => (
        <rect
          key={`${index}-${value}`}
          className="dk-vector-bar"
          x={x + index * (barWidth + 2)}
          y={y + 34 - value * 28}
          width={barWidth}
          height={Math.max(4, value * 28)}
          rx="3"
        />
      ))}
    </g>
  )
}

export function ProbabilityBar({ x, y, label, value, width = 96 }: { x: number, y: number, label: string, value: number, width?: number }) {
  return (
    <g>
      <text className="dk-label dk-label-small" x={x} y={y + 10}>{label}</text>
      <rect className="dk-probability-track" x={x + 42} y={y} width={width} height="10" rx="5" />
      <rect className="dk-probability-bar" x={x + 42} y={y} width={width * value} height="10" rx="5" />
    </g>
  )
}

export function LayerSheet({ x, y, width = 70, height = 48, count = 3, label = 'layers' }: { x: number, y: number, width?: number, height?: number, count?: number, label?: string }) {
  return (
    <g>
      {Array.from({ length: count }).map((_, index) => (
        <rect key={index} className="dk-layer-sheet" x={x + index * 7} y={y - index * 6} width={width} height={height} rx="7" />
      ))}
      <text className="dk-label dk-label-small" x={x + 16} y={y + height + 18}>{label}</text>
    </g>
  )
}

export function TensorGrid({ x, y, rows = 4, cols = 6, active = [] }: { x: number, y: number, rows?: number, cols?: number, active?: Point[] }) {
  const activeSet = new Set(active.map(([row, col]) => `${row}-${col}`))
  return (
    <g>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((__, col) => (
          <rect
            key={`${row}-${col}`}
            className={classNames('dk-tensor-cell', activeSet.has(`${row}-${col}`) && 'active')}
            x={x + col * 12}
            y={y + row * 12}
            width="10"
            height="10"
            rx="2"
          />
        ))
      )}
    </g>
  )
}

export function EvidenceCard({ x, y, width = 68, label = 'evidence', tone = 'paper' }: { x: number, y: number, width?: number, label?: string, tone?: Tone }) {
  return (
    <g>
      <rect className={classNames('dk-evidence-card', toneClass(tone))} x={x} y={y} width={width} height="42" rx="7" />
      <text className="dk-label dk-label-small" x={x + 9} y={y + 16}>{label}</text>
      <path className="dk-card-line" d={`M${x + 9} ${y + 25} H${x + width - 10}`} />
      <path className="dk-card-line" d={`M${x + 9} ${y + 32} H${x + width - 24}`} />
    </g>
  )
}

export function GuardrailPath({ d, tone = 'success' }: { d: string, tone?: Tone }) {
  return <path className={classNames('dk-guardrail-path', toneClass(tone))} d={d} />
}

export function WarningZone({ x, y, width, height, label = 'watch' }: { x: number, y: number, width: number, height: number, label?: string }) {
  return (
    <g>
      <rect className="dk-warning-zone" x={x} y={y} width={width} height={height} rx="8" />
      <text className="dk-label dk-label-small dk-label-dark" x={x + 11} y={y + 19}>{label}</text>
    </g>
  )
}

export function GlowNode({ x, y, radius = 9, tone = 'mint', label }: { x: number, y: number, radius?: number, tone?: Tone, label?: string }) {
  return (
    <g>
      <circle className={classNames('dk-glow-node', toneClass(tone))} cx={x} cy={y} r={radius} />
      {label && <text className="dk-label dk-label-small" x={x + radius + 7} y={y + 4}>{label}</text>}
    </g>
  )
}

export function LegendRow({ x, y, items }: { x: number, y: number, items: Array<{ label: string, kind: 'dot' | 'square' | 'line' | 'curve', tone?: Tone }> }) {
  let cursor = x
  return (
    <g>
      {items.map((item) => {
        const current = cursor
        cursor += item.label.length * 5.9 + 32
        return (
          <g key={item.label}>
            {item.kind === 'dot' && <circle className={classNames('dk-legend-mark', toneClass(item.tone ?? 'mint'))} cx={current + 5} cy={y - 4} r="4" />}
            {item.kind === 'square' && <rect className={classNames('dk-legend-mark', toneClass(item.tone ?? 'amber'))} x={current + 1} y={y - 9} width="9" height="9" rx="2" />}
            {item.kind === 'line' && <path className={classNames('dk-legend-line', toneClass(item.tone ?? 'mint'))} d={`M${current} ${y - 4} H${current + 16}`} />}
            {item.kind === 'curve' && <path className={classNames('dk-legend-line', toneClass(item.tone ?? 'violet'))} d={`M${current} ${y - 3} C${current + 5} ${y - 11}, ${current + 11} ${y + 2}, ${current + 17} ${y - 5}`} />}
            <text className="dk-label dk-label-small" x={current + 20} y={y}>{item.label}</text>
          </g>
        )
      })}
    </g>
  )
}

export function DiagramCaption({ children }: { children: React.ReactNode }) {
  return <p className="diagram-kit-caption">{children}</p>
}

export function DiagramCallouts({ items }: { items: Array<{ heading: string, body: string }> }) {
  return (
    <div className="diagram-kit-callouts">
      {items.map((item) => (
        <p key={item.heading}><strong>{item.heading}</strong> {item.body}</p>
      ))}
    </div>
  )
}

function TaxonomyBox({
  x,
  y,
  width,
  height,
  label,
  tone = 'paper',
  emphasis = false
}: {
  x: number,
  y: number,
  width: number,
  height: number,
  label: string | string[],
  tone?: Tone,
  emphasis?: boolean
}) {
  const lines = Array.isArray(label) ? label : [label]
  const labelY = y + height / 2 - ((lines.length - 1) * 5) + 3.5
  return (
    <g>
      <rect className={classNames('dk-taxonomy-box', toneClass(tone), emphasis && 'is-emphasis')} x={x} y={y} width={width} height={height} rx="8" />
      <path className="dk-taxonomy-fold" d={`M${x + width - 14} ${y} L${x + width} ${y + 14} L${x + width - 14} ${y + 14} Z`} />
      <text className={classNames('dk-taxonomy-label', tone === 'indigo' && 'on-dark')} x={x + width / 2} y={labelY} textAnchor="middle">
        {lines.map((line, index) => (
          <tspan key={line} x={x + width / 2} dy={index === 0 ? 0 : 11}>{line}</tspan>
        ))}
      </text>
    </g>
  )
}

export function DiagramKitAiFamilyTreeExample() {
  return (
    <>
      <rect className="dk-taxonomy-outer" x="10" y="10" width="300" height="190" rx="12" />
      <TaxonomyBox x={110} y={18} width={100} height={24} label="AI" tone="indigo" emphasis />
      <TaxonomyBox x={20} y={55} width={118} height={24} label="Rule-based AI" tone="violet" />
      <TaxonomyBox x={158} y={55} width={142} height={24} label="Machine learning" tone="mint" emphasis />
      <TaxonomyBox x={40} y={92} width={106} height={24} label="Classical ML" tone="paper" />
      <TaxonomyBox x={176} y={92} width={118} height={24} label="Deep learning" tone="mint" emphasis />
      <TaxonomyBox x={28} y={129} width={132} height={24} label="Other deep learning" tone="muted" />
      <TaxonomyBox x={176} y={129} width={118} height={24} label="Generative AI" tone="amber" emphasis />
      <TaxonomyBox x={88} y={168} width={54} height={22} label="LLMs" tone="paper" />
      <TaxonomyBox x={150} y={168} width={70} height={22} label="Diffusion" tone="paper" />
      <TaxonomyBox x={228} y={168} width={76} height={22} label="Multimodal" tone="paper" />
      <path className="dk-taxonomy-guide" d="M160 42 V48 M79 48 H229 M79 48 V55 M229 48 V55" />
      <path className="dk-taxonomy-guide" d="M229 79 V86 M93 86 H235 M93 86 V92 M235 86 V92" />
      <path className="dk-taxonomy-guide" d="M235 116 V123 M94 123 H235 M94 123 V129 M235 123 V129" />
      <path className="dk-taxonomy-guide" d="M235 153 V160 M115 160 H266 M115 160 V168 M185 160 V168 M266 160 V168" />
    </>
  )
}

export function DiagramKitTraditionsExample() {
  return (
    <>
      <PaperPanel x={18} y={24} width={126} height={126} label="Rules" tone="violet">
        <TokenChip x={34} y={66} width={78} label="symbols" tone="violet" />
        <TokenChip x={34} y={92} width={78} label="if-then" tone="violet" />
        <TokenChip x={34} y={118} width={78} label="logic" tone="violet" />
      </PaperPanel>
      <PaperPanel x={176} y={24} width={126} height={126} label="Patterns" tone="mint">
        <TokenChip x={192} y={66} width={82} label="examples" tone="mint" />
        <TokenChip x={192} y={92} width={82} label="loss" tone="paper" />
        <TokenChip x={192} y={118} width={82} label="weights" tone="amber" />
      </PaperPanel>
      <NeonArrow d="M145 89 C154 84, 166 84, 176 89" tone="amber" />
      <PaperNode x={69} y={170} width={182} height={27} label="Combine both" tone="paper" />
      <NeonPath d="M103 150 C116 162, 134 168, 160 170 C187 168, 204 162, 218 150" tone="mint" />
    </>
  )
}

export function DiagramKitTrainingLoopExample() {
  return (
    <>
      <NeonArrow d="M86 60 H117" tone="mint" />
      <NeonArrow d="M204 60 H232" tone="mint" />
      <NeonArrow d="M266 78 C266 101, 245 118, 223 133" tone="amber" />
      <NeonArrow d="M155 148 H112" tone="amber" />
      <NeonArrow d="M63 132 C36 108, 36 80, 57 76" tone="mint" />
      <PaperNode x={20} y={43} width={68} label="Predict" tone="paper" />
      <PaperNode x={118} y={43} width={86} label="Compare" tone="paper" />
      <PaperNode x={232} y={43} width={66} label="Loss" tone="paper" />
      <PaperNode x={154} y={132} width={144} label="Update weights" tone="amber" />
      <PaperNode x={54} y={132} width={82} label="Repeat" tone="mint" />
      <CalloutSeal x={54} y={36} label="1" tone="paper" />
      <CalloutSeal x={162} y={36} label="2" tone="paper" />
      <CalloutSeal x={265} y={36} label="3" tone="paper" />
      <CalloutSeal x={222} y={123} label="4" tone="amber" />
      <CalloutSeal x={95} y={123} label="5" tone="mint" />
      <PaperPanel x={102} y={88} width={116} height={28} tone="amber">
        <text className="dk-label dk-label-dark dk-label-small" x="160" y="106" textAnchor="middle">durable change</text>
      </PaperPanel>
    </>
  )
}

export function DiagramKitOverfittingPlotExample() {
  const trainDots = [[42, 142], [84, 78], [126, 116], [168, 62], [210, 132]]
  const newDots = [[246, 96], [282, 82]]
  return (
    <>
      <rect className="dk-plot-paper" x="24" y="24" width="274" height="146" rx="10" />
      <path className="dk-axis" d="M38 158 H292" />
      <path className="dk-axis" d="M38 158 V38" />
      <path className="dk-overfit-curve" d="M42 142 C62 52, 92 50, 126 116 S156 24, 210 132 S250 182, 292 150" />
      <path className="dk-general-curve" d="M42 148 C92 122, 150 102, 212 90 S260 82, 292 76" />
      {trainDots.map(([x, y]) => <circle key={`${x}-${y}`} className="dk-data-dot" cx={x} cy={y} r="6" />)}
      {newDots.map(([x, y]) => <rect key={`${x}-${y}`} className="dk-heldout-dot" x={x - 7} y={y - 7} width="14" height="14" rx="3" />)}
      <WarningZone x={43} y={42} width={70} height={24} label="too fitted" />
      <CalloutSeal x={52} y={134} label="1" tone="paper" />
      <CalloutSeal x={282} y={82} label="2" tone="amber" />
      <CalloutSeal x={112} y={58} label="3" tone="violet" />
      <CalloutSeal x={244} y={92} label="4" tone="success" />
      <LegendRow
        x={34}
        y={194}
        items={[
          { label: 'train', kind: 'dot', tone: 'mint' },
          { label: 'validation', kind: 'square', tone: 'amber' },
          { label: 'overfit', kind: 'curve', tone: 'violet' },
          { label: 'smooth', kind: 'line', tone: 'success' }
        ]}
      />
    </>
  )
}

function PrimitiveSampler() {
  return (
    <DiagramScene label="DiagramKit primitive sampler">
      <PaperNode x={18} y={22} width={74} label="PaperNode" tone="paper" />
      <NeonArrow d="M96 36 C118 16, 138 16, 158 36" tone="mint" />
      <CalloutSeal x={176} y={36} label="1" />
      <TokenChip x={200} y={25} width={74} label="token" tone="mint" />
      <ContextTray x={18} y={76} width={112} height={56} label="ContextTray" />
      <TokenChip x={34} y={100} width={36} label="ask" tone="paper" />
      <TokenChip x={76} y={100} width={38} label="note" tone="amber" />
      <VectorBar x={150} y={82} values={[0.25, 0.8, 0.46, 0.62, 0.34, 0.9]} />
      <TensorGrid x={236} y={82} active={[[0, 1], [1, 3], [2, 4], [3, 2]]} />
      <GuardrailPath d="M28 174 C68 150, 116 150, 154 172 S242 194, 292 160" />
      <EvidenceCard x={196} y={148} width={84} label="EvidenceCard" tone="paper" />
      <LayerSheet x={122} y={160} width={54} height={28} count={3} label="LayerSheet" />
      <GlowNode x={292} y={38} radius={8} tone="violet" />
    </DiagramScene>
  )
}

export function DiagramKitGallery() {
  return (
    <section id="diagram-kit" className="review-card aid-review-card diagram-kit-gallery" aria-labelledby="diagram-kit-title">
      <p className="eyebrow">diagram-kit</p>
      <h2 id="diagram-kit-title">DiagramKit v0.18 Primitive Gallery</h2>
      <p className="lede small">Reusable coded SVG and HTML parts for sparse ZenTron Origami teaching visuals. No new image assets or dependencies are used.</p>
      <div className="diagram-kit-demo-grid">
        <DiagramFrame title="Primitive Sampler">
          <PrimitiveSampler />
          <DiagramCaption>PaperNode, NeonPath/NeonArrow, CalloutSeal, TokenChip, ContextTray, VectorBar, TensorGrid, GuardrailPath, EvidenceCard, and LayerSheet in one mobile-sized frame.</DiagramCaption>
        </DiagramFrame>
        <DiagramFrame title="Example Training Loop">
          <DiagramScene label="Training loop built from DiagramKit primitives">
            <DiagramKitTrainingLoopExample />
          </DiagramScene>
          <DiagramCaption>Durable weight updates are visually distinct from the temporary steps around them.</DiagramCaption>
        </DiagramFrame>
        <DiagramFrame title="Example AI Family Tree">
          <DiagramScene label="AI family tree built from DiagramKit primitives">
            <DiagramKitAiFamilyTreeExample />
          </DiagramScene>
          <DiagramCaption>A clean taxonomy tree shows which AI categories lead toward LLMs; longer distinctions remain in HTML callouts.</DiagramCaption>
        </DiagramFrame>
        <DiagramFrame title="Example Overfitting Plot">
          <DiagramScene label="Overfitting plot built from DiagramKit primitives">
            <DiagramKitOverfittingPlotExample />
          </DiagramScene>
          <DiagramCaption>Training dots, set-aside validation examples, and curves stay readable at 320px.</DiagramCaption>
        </DiagramFrame>
      </div>
      <DiagramCallouts
        items={[
          { heading: 'Visual grammar', body: 'Paper shapes carry concepts, neon lines carry relationships, seals point learners to HTML callouts, and glow marks transient computation.' },
          { heading: 'Mobile rule', body: 'Labels stay short inside SVG. Definitions, limits, and nuance live in accessible HTML below each scene.' },
          { heading: 'Scope', body: 'This pass refactors coded Before Morning diagrams only; generated PNG-backed scenes remain unchanged.' }
        ]}
      />
    </section>
  )
}
