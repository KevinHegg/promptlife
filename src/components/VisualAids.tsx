import React from 'react'

export const visualAidCatalog = [
  { id: 'llm-overview', title: 'Prompt to Prediction', caption: 'A prompt enters the current context; learned weights shape next-token probabilities.', pattern: 'cloud' },
  { id: 'traditions', title: 'Rules and Learned Patterns', caption: 'Symbolic AI follows explicit rules; deep learning uses learned parameters.', pattern: 'compare' },
  { id: 'training-loop', title: 'Training Loop', caption: 'Predict, compare, update weights, repeat.', pattern: 'training' },
  { id: 'pretraining-rain', title: 'Broad Pretraining', caption: 'Many prediction updates carve broad capability into model weights.', pattern: 'training' },
  { id: 'fine-tune-path', title: 'Fine-Tuning Path', caption: 'Targeted examples nudge an already-trained model toward a desired pattern.', pattern: 'fine' },
  { id: 'inference-pass', title: 'Forward Pass', caption: 'Inference creates temporary states while durable weights stay fixed.', pattern: 'inference' },
  { id: 'prompt-response', title: 'Prompt vs Response', caption: 'Prompt tokens are given; response tokens are generated and appended.', pattern: 'promptResponse' },
  { id: 'tokenization', title: 'Text to Tokens', caption: 'Text is split into model-readable chunks before embedding lookup.', pattern: 'token' },
  { id: 'token-ids', title: 'Token IDs', caption: 'Each token gets a lookup number that points to an embedding row.', pattern: 'ids' },
  { id: 'embeddings', title: 'Embedding Lookup', caption: 'A token ID retrieves a learned starting vector.', pattern: 'vector' },
  { id: 'vectors', title: 'Feature Vector', caption: 'A vector is a list of numerical features, not a sentence.', pattern: 'bars' },
  { id: 'tensors', title: 'Tensor Block', caption: 'Tensors organize many token vectors for layer-by-layer processing.', pattern: 'tensor' },
  { id: 'attention', title: 'Attention Weave', caption: 'Attention is weighted relevance between token positions.', pattern: 'attention' },
  { id: 'mlp', title: 'MLP Reshape', caption: 'The MLP reshapes each token position feature vector.', pattern: 'mlp' },
  { id: 'layers', title: 'Layer Stack', caption: 'Repeated blocks refine hidden states while carrying useful signal forward.', pattern: 'layers' },
  { id: 'hidden-states', title: 'Temporary Hidden State', caption: 'Hidden states are context-shaped vectors created during a forward pass.', pattern: 'hidden' },
  { id: 'logits', title: 'Raw Scores', caption: 'Logits are raw next-token scores before probabilities.', pattern: 'logits' },
  { id: 'softmax', title: 'Softmax Funnel', caption: 'Softmax converts raw scores into probabilities that sum to one.', pattern: 'softmax' },
  { id: 'sampling', title: 'Sample One Token', caption: 'Sampling chooses one token from the probability cloud.', pattern: 'sampling' },
  { id: 'autoregression', title: 'Append and Repeat', caption: 'The chosen token is appended, then the model runs again.', pattern: 'loop' },
  { id: 'context-window', title: 'Temporary Context Window', caption: 'Only visible context can influence the next token.', pattern: 'window' },
  { id: 'rag-retrieval', title: 'Open-Book Retrieval', caption: 'Retrieved document cards enter the context before response tokens are generated.', pattern: 'rag' },
  { id: 'ai-learns', title: 'Learning Modes', caption: 'Durable training, retrieval, and temporary steering change different things.', pattern: 'learns' },
  { id: 'diffusion', title: 'Denoise, Not Append', caption: 'Diffusion refines noise step by step instead of generating text token by token.', pattern: 'diffusion' },
  { id: 'multimodal', title: 'Shared Media Hub', caption: 'Different media types can connect through learned representations.', pattern: 'multimodal' },
  { id: 'risk', title: 'Risk or Myth', caption: 'Clear mechanisms help separate practical risk from magical stories.', pattern: 'risk' }
]

const aidById = Object.fromEntries(visualAidCatalog.map((aid) => [aid.id, aid]))

export function VisualAid({ id, headingId = undefined, compact = false }) {
  const aid = aidById[id] ?? aidById['llm-overview']
  return (
    <figure className={compact ? 'visual-aid compact' : 'visual-aid'} aria-labelledby={headingId}>
      <div className={`aid-canvas aid-${aid.pattern}`} aria-hidden="true">
        <svg viewBox="0 0 320 210" role="img" focusable="false">
          <VisualPattern aid={aid} />
        </svg>
      </div>
      <figcaption>
        <strong>{aid.title}</strong>
        <span>{aid.caption}</span>
      </figcaption>
    </figure>
  )
}

export function VisualAidGallery() {
  return (
    <div className="visual-aid-gallery">
      {visualAidCatalog.map((aid) => (
        <section className="review-card aid-review-card" key={aid.id} aria-labelledby={`${aid.id}-review-title`}>
          <p className="eyebrow">{aid.id}</p>
          <h2 id={`${aid.id}-review-title`}>{aid.title}</h2>
          <VisualAid id={aid.id} compact />
        </section>
      ))}
    </div>
  )
}

function VisualPattern({ aid }) {
  switch (aid.pattern) {
    case 'training':
      return <TrainingSvg />
    case 'fine':
      return <FineTuneSvg />
    case 'inference':
      return <InferenceSvg />
    case 'promptResponse':
      return <PromptResponseSvg />
    case 'token':
      return <TokenSvg />
    case 'ids':
      return <IdsSvg />
    case 'vector':
    case 'bars':
      return <VectorSvg />
    case 'tensor':
      return <TensorSvg />
    case 'attention':
      return <AttentionSvg />
    case 'mlp':
      return <MlpSvg />
    case 'layers':
      return <LayersSvg />
    case 'hidden':
      return <HiddenSvg />
    case 'logits':
      return <LogitsSvg />
    case 'softmax':
      return <SoftmaxSvg />
    case 'sampling':
      return <SamplingSvg />
    case 'loop':
      return <LoopSvg />
    case 'window':
      return <WindowSvg />
    case 'rag':
      return <RagSvg />
    case 'learns':
    case 'compare':
      return <LearnsSvg />
    case 'diffusion':
      return <DiffusionSvg />
    case 'multimodal':
      return <MultimodalSvg />
    case 'risk':
      return <RiskSvg />
    default:
      return <CloudSvg />
  }
}

function Label({ x, y, children, className = '' }) {
  return <text x={x} y={y} className={className}>{children}</text>
}

function Arrow({ x1, y1, x2, y2 }) {
  return <path className="aid-arrow" d={`M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} />
}

function CloudSvg() {
  return (
    <>
      <circle className="aid-core" cx="160" cy="98" r="42" />
      <rect className="aid-box prompt" x="22" y="72" width="76" height="42" rx="8" />
      <rect className="aid-box output" x="226" y="72" width="72" height="42" rx="8" />
      <Arrow x1={98} y1={93} x2={122} y2={93} />
      <Arrow x1={202} y1={93} x2={226} y2={93} />
      {[
        ['grammar', 92, 154, 63],
        ['facts', 136, 170, 124],
        ['tone', 180, 154, 168],
        ['task', 224, 170, 214]
      ].map(([label, dotX, dotY, labelX]) => (
        <g key={label}>
          <circle className="aid-dot" cx={Number(dotX)} cy={Number(dotY)} r="9" />
          <Label x={Number(labelX)} y={194} className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="41" y="98" className="dark">prompt</Label>
      <Label x="242" y="98" className="dark">next</Label>
      <Label x="135" y="102">weights</Label>
    </>
  )
}

function TrainingSvg() {
  const steps = [
    ['predict', 26, 42],
    ['compare', 180, 42],
    ['update', 180, 132],
    ['repeat', 26, 132]
  ]
  return (
    <>
      {steps.map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-box" x={Number(x)} y={Number(y)} width="96" height="44" rx="8" />
          <Label x={Number(x) + 22} y={Number(y) + 28}>{label}</Label>
        </g>
      ))}
      <Arrow x1={122} y1={64} x2={180} y2={64} />
      <Arrow x1={228} y1={86} x2={228} y2={132} />
      <Arrow x1={180} y1={154} x2={122} y2={154} />
      <Arrow x1={74} y1={132} x2={74} y2={86} />
      <Label x="86" y="112" className="tiny">durable weight update</Label>
    </>
  )
}

function FineTuneSvg() {
  return (
    <>
      <path className="aid-land" d="M20 162 L98 78 L145 126 L210 58 L300 162 Z" />
      <path className="aid-path" d="M42 154 C80 128, 105 122, 137 113 S201 83, 266 73" />
      <circle className="aid-dot" cx="137" cy="113" r="10" />
      <circle className="aid-dot alt" cx="266" cy="73" r="10" />
      <Label x="54" y="184" className="tiny">pretrained terrain</Label>
      <Label x="183" y="40" className="tiny">targeted trail</Label>
    </>
  )
}

function InferenceSvg() {
  return (
    <>
      {['context', 'layers', 'logits', 'token'].map((label, index) => (
        <g key={label}>
          <rect className="aid-box" x={18 + index * 76} y="78" width="62" height="44" rx="8" />
          <Label x={26 + index * 76} y="104" className="tiny">{label}</Label>
          {index < 3 && <Arrow x1={80 + index * 76} y1="100" x2={94 + index * 76} y2="100" />}
        </g>
      ))}
      <rect className="aid-box muted" x="92" y="145" width="136" height="32" rx="8" />
      <Label x="116" y="166" className="tiny">weights stay fixed</Label>
    </>
  )
}

function PromptResponseSvg() {
  return (
    <>
      {['The', 'dog', 'chased'].map((token, index) => (
        <rect key={token} className="aid-chip prompt" x={28 + index * 64} y="54" width="54" height="34" rx="8" />
      ))}
      {['yard', 'and'].map((token, index) => (
        <rect key={token} className="aid-chip output" x={220 + index * 58} y="54" width="50" height="34" rx="8" />
      ))}
      <Label x="36" y="76" className="tiny dark">The</Label>
      <Label x="99" y="76" className="tiny dark">dog</Label>
      <Label x="156" y="76" className="tiny dark">chased</Label>
      <Label x="227" y="76" className="tiny dark">yard</Label>
      <Label x="283" y="76" className="tiny dark">and</Label>
      <rect className="aid-box" x="42" y="130" width="236" height="38" rx="8" />
      <Label x="82" y="154">current context grows</Label>
      <Arrow x1="245" y1="88" x2="245" y2="130" />
    </>
  )
}

function TokenSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="26" y="38" width="260" height="38" rx="8" />
      <Label x="70" y="62">Explain attention simply</Label>
      {['Explain', 'attention', 'simply'].map((token, index) => (
        <g key={token}>
          <rect className="aid-chip" x={38 + index * 94} y="122" width="78" height="36" rx="8" />
          <Label x={47 + index * 94} y="145" className="tiny">{token}</Label>
        </g>
      ))}
      <Arrow x1="160" y1="76" x2="160" y2="122" />
    </>
  )
}

function IdsSvg() {
  return (
    <>
      {['token', 'ID', 'row'].map((label, index) => (
        <g key={label}>
          <rect className="aid-box" x={38 + index * 86} y="76" width="68" height="44" rx="8" />
          <Label x={54 + index * 86} y="104">{label}</Label>
          {index < 2 && <Arrow x1={106 + index * 86} y1="98" x2={124 + index * 86} y2="98" />}
        </g>
      ))}
      <Label x="78" y="155" className="tiny">lookup key, not meaning</Label>
    </>
  )
}

function VectorSvg() {
  const heights = [42, 82, 58, 104, 72, 36, 92]
  return (
    <>
      <rect className="aid-box muted" x="34" y="36" width="252" height="144" rx="10" />
      {heights.map((height, index) => (
        <rect key={index} className="aid-bar" x={62 + index * 31} y={154 - height} width="18" height={height} rx="5" />
      ))}
      <Label x="86" y="190" className="tiny">many numerical features</Label>
    </>
  )
}

function TensorSvg() {
  return (
    <>
      {[0, 1, 2].map((sheet) => (
        <g key={sheet} transform={`translate(${48 + sheet * 34}, ${44 + sheet * 20})`}>
          <rect className="aid-sheet" width="152" height="86" rx="8" />
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <rect key={cell} className="aid-cell" x={18 + (cell % 3) * 38} y={18 + Math.floor(cell / 3) * 30} width="24" height="18" rx="4" />
          ))}
        </g>
      ))}
      <Label x="74" y="190" className="tiny">tokens by features by layers</Label>
    </>
  )
}

function AttentionSvg() {
  const points = [[52, 64], [122, 64], [192, 64], [262, 64], [122, 148], [222, 148]]
  return (
    <>
      <path className="aid-arc" d="M122 148 Q160 30 262 64" />
      <path className="aid-arc alt" d="M222 148 Q164 96 52 64" />
      {points.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle className="aid-node" cx={x} cy={y} r="22" />
          <Label x={x - 10} y={y + 5} className="tiny">t{index + 1}</Label>
        </g>
      ))}
      <Label x="86" y="190" className="tiny">weighted relevance, not awareness</Label>
    </>
  )
}

function MlpSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="28" y="82" width="70" height="44" rx="8" />
      <Gear x={134} y={72} r={30} />
      <Gear x={176} y={112} r={24} alt />
      <rect className="aid-box output" x="228" y="82" width="70" height="44" rx="8" />
      <Arrow x1="98" y1="104" x2="128" y2="104" />
      <Arrow x1="200" y1="104" x2="228" y2="104" />
      <Label x="38" y="108" className="tiny dark">token</Label>
      <Label x="236" y="108" className="tiny dark">features</Label>
    </>
  )
}

function Gear({ x, y, r, alt = false }) {
  return <circle className={alt ? 'aid-gear alt' : 'aid-gear'} cx={x} cy={y} r={r} />
}

function LayersSvg() {
  return (
    <>
      {[0, 1, 2, 3].map((layer) => (
        <g key={layer}>
          <rect className="aid-box" x={34 + layer * 62} y={56 + layer * 14} width="70" height="94" rx="8" />
          <Label x={53 + layer * 62} y={102 + layer * 14} className="tiny">layer</Label>
        </g>
      ))}
      <path className="aid-path thin" d="M22 170 C86 136, 136 138, 184 122 S260 90, 304 92" />
      <Label x="84" y="192" className="tiny">refine and carry forward</Label>
    </>
  )
}

function HiddenSvg() {
  return (
    <>
      <rect className="aid-chip prompt" x="42" y="42" width="94" height="38" rx="8" />
      <rect className="aid-box muted" x="72" y="106" width="176" height="70" rx="10" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} className="aid-bar" x={96 + bar * 26} y={150 - bar * 8} width="16" height={26 + bar * 8} rx="4" />
      ))}
      <Arrow x1="89" y1="80" x2="120" y2="106" />
      <Label x="54" y="66" className="tiny">embedding</Label>
      <Label x="104" y="192" className="tiny">temporary context shape</Label>
    </>
  )
}

function LogitsSvg() {
  return (
    <>
      {[
        ['yard', 114],
        ['street', 92],
        ['banana', 36]
      ].map(([label, width], index) => (
        <g key={label}>
          <Label x="38" y={64 + index * 42} className="tiny">{label}</Label>
          <rect className="aid-bar horizontal" x="106" y={48 + index * 42} width={width} height="22" rx="6" />
        </g>
      ))}
      <Label x="92" y="178" className="tiny">raw scores, not probabilities</Label>
    </>
  )
}

function SoftmaxSvg() {
  return (
    <>
      <path className="aid-funnel" d="M52 42 H268 L198 116 V166 H122 V116 Z" />
      <Label x="78" y="72" className="tiny">raw scores</Label>
      <Label x="128" y="148" className="tiny">probabilities</Label>
      <circle className="aid-dot" cx="104" cy="94" r="9" />
      <circle className="aid-dot alt" cx="168" cy="94" r="9" />
      <circle className="aid-dot" cx="230" cy="94" r="9" />
    </>
  )
}

function SamplingSvg() {
  return (
    <>
      {[
        ['yard', 52, 70, 32],
        ['street', 138, 58, 26],
        ['room', 220, 78, 20],
        ['moon', 172, 132, 16]
      ].map(([label, x, y, r]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r={Number(r)} />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-select" d="M52 70 L100 172 L140 108" />
      <Label x="94" y="190" className="tiny">one token selected</Label>
    </>
  )
}

function LoopSvg() {
  return (
    <>
      {['next', 'append', 'run again'].map((label, index) => (
        <g key={label}>
          <rect className="aid-box" x={34 + index * 88} y="74" width="72" height="42" rx="8" />
          <Label x={43 + index * 88} y="99" className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-arc" d="M258 74 C298 28, 34 28, 34 74" />
      <Label x="84" y="160" className="tiny">next token, append, repeat</Label>
    </>
  )
}

function WindowSvg() {
  return (
    <>
      <rect className="aid-box muted" x="74" y="42" width="174" height="116" rx="10" />
      {['old', 'prompt', 'example', 'tone', 'next'].map((label, index) => (
        <g key={label}>
          <rect className={index === 0 ? 'aid-chip faded' : 'aid-chip'} x={22 + index * 58} y={86} width="48" height="34" rx="8" />
          <Label x={29 + index * 58} y="108" className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="96" y="178" className="tiny">temporary visible input</Label>
    </>
  )
}

function RagSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="22" y="42" width="76" height="42" rx="8" />
      <Label x="34" y="67" className="tiny dark">prompt</Label>
      <rect className="aid-box" x="124" y="34" width="88" height="56" rx="8" />
      <Label x="139" y="57" className="tiny">retriever</Label>
      <path className="aid-line" d="M140 71 H196 M140 80 H190" />
      <rect className="aid-box muted" x="82" y="126" width="154" height="54" rx="8" />
      <Label x="110" y="158" className="tiny">context window</Label>
      <rect className="aid-chip" x="104" y="104" width="68" height="30" rx="8" />
      <Label x="113" y="124" className="tiny">retrieved</Label>
      <rect className="aid-chip" x="178" y="104" width="52" height="30" rx="8" />
      <Label x="189" y="124" className="tiny">notes</Label>
      <rect className="aid-box output" x="254" y="130" width="62" height="42" rx="8" />
      <Label x="262" y="155" className="tiny dark">answer</Label>
      <Arrow x1={98} y1={63} x2={124} y2={63} />
      <Arrow x1={168} y1={90} x2={138} y2={104} />
      <Arrow x1={236} y1={153} x2={254} y2={153} />
      <Label x="64" y="198" className="tiny">retrieval plus context, not training</Label>
    </>
  )
}

function LearnsSvg() {
  return (
    <>
      {[
        ['weights', 'durable', 26],
        ['context', 'temporary', 118],
        ['retrieval', 'open book', 210]
      ].map(([top, bottom, x]) => (
        <g key={top}>
          <rect className="aid-box" x={x} y="62" width="78" height="74" rx="8" />
          <Label x={Number(x) + 11} y="91" className="tiny">{top}</Label>
          <Label x={Number(x) + 8} y="115" className="tiny muted-text">{bottom}</Label>
        </g>
      ))}
      <Label x="55" y="178" className="tiny">different changes, different risks</Label>
    </>
  )
}

function DiffusionSvg() {
  return (
    <>
      {[0, 1, 2].map((step) => (
        <g key={step} transform={`translate(${38 + step * 92}, 58)`}>
          <rect className="aid-box muted" width="62" height="62" rx="8" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
            <rect key={cell} className={`aid-noise n-${step}`} x={9 + (cell % 3) * 17} y={9 + Math.floor(cell / 3) * 17} width="11" height="11" rx="3" />
          ))}
        </g>
      ))}
      <Arrow x1="100" y1="89" x2="130" y2="89" />
      <Arrow x1="192" y1="89" x2="222" y2="89" />
      <Label x="78" y="166" className="tiny">noise to clearer output</Label>
    </>
  )
}

function MultimodalSvg() {
  const modes = [
    ['text', 70, 62],
    ['image', 232, 62],
    ['audio', 70, 150],
    ['video', 232, 150]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="106" r="32" />
      <Label x="137" y="111" className="tiny">shared</Label>
      {modes.map(([label, x, y]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r="24" />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
          <path className="aid-line" d={`M${x} ${y} L160 106`} />
        </g>
      ))}
    </>
  )
}

function RiskSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="30" y="52" width="122" height="52" rx="8" />
      <rect className="aid-box output" x="168" y="52" width="122" height="52" rx="8" />
      <Label x="58" y="82">real risk</Label>
      <Label x="204" y="82">myth</Label>
      {['privacy', 'over-trust', 'self-aware'].map((label, index) => (
        <g key={label}>
          <rect className={index === 2 ? 'aid-chip faded' : 'aid-chip'} x={44 + index * 82} y="138" width="72" height="34" rx="8" />
          <Label x={51 + index * 82} y="160" className="tiny">{label}</Label>
        </g>
      ))}
    </>
  )
}
