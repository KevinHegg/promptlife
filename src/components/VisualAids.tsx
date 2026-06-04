import React from 'react'
import { canonicalPromptResponse } from '../data/canonicalExamples'
import { lessons } from '../data/content'

export const visualAidCatalog = [
  { id: 'llm-overview', title: 'Prompt to Prediction', caption: 'Prompt/context flows through learned weights into next-token probabilities; one generated response token is appended.', pattern: 'llmOverview', legend: ['Prompt/context is given input.', 'Learned weights are used during inference.', 'The selected response token is appended.'] },
  { id: 'traditions', title: 'Rules and Learned Patterns', subtitle: 'Two traditions, one modern toolkit', caption: 'Symbolic/rationalist systems use explicit rules; deep-learning/empiricist systems learn useful patterns from examples.', pattern: 'traditions', objective: 'Contrast explicit rules with learned patterns without turning the diagram into a poster.', callouts: [{ heading: 'Rules', body: 'Symbolic systems use explicit if/then logic and symbols.' }, { heading: 'Examples', body: 'Deep-learning systems use data, loss, and weight updates.' }, { heading: 'Bridge', body: 'Modern AI products can combine learned models with rules and tools.' }], keyTakeaway: 'Modern AI often blends learned patterns with hand-built rules and tools.', accessibleDescription: 'Two side-by-side panels compare rules and symbols with examples, loss, and weights, joined by a small bridge.', printNote: 'Short panel labels only; explanatory comparison stays in HTML callouts.' },
  { id: 'training-loop', title: 'Training Loop', subtitle: 'Durable change happens at weight update', caption: 'Predict, compare, loss, update weights, repeat. Training changes weights.', pattern: 'training', objective: 'Show the sequence of training and make the durable weight-update step visually distinct.', callouts: [{ heading: 'Predict', body: 'The model predicts a target.' }, { heading: 'Compare', body: 'The prediction is compared with the target.' }, { heading: 'Loss', body: 'Loss measures error.' }, { heading: 'Update weights', body: 'Weight updates are the durable-change step.' }, { heading: 'Repeat', body: 'The loop repeats many times.' }], keyTakeaway: 'Training changes weights; ordinary inference does not.', accessibleDescription: 'A five-step loop moves from Predict to Compare to Loss to Update weights to Repeat, with Update weights highlighted.', printNote: 'Five nodes stay aligned at 320px and in exported review PDFs.' },
  { id: 'pretraining-rain', title: 'Broad Pretraining', caption: 'A wide stream of data shapes broad durable learning before normal use.', pattern: 'pretraining', legend: ['Many examples flow through the training loop.', 'Repeated updates shape broad model capability.'] },
  { id: 'overfitting-generalization', title: 'Overfitting vs Generalization', caption: 'Memorizing examples is not the same as learning transferable patterns.', pattern: 'overfitting', legend: ['Overfit curve traces old dots too tightly.', 'Generalizing curve is smoother and reaches new examples.', 'Held-out examples test whether learning transfers.'] },
  { id: 'fine-tune-path', title: 'Fine-Tuning Path', caption: 'Targeted examples nudge an already-trained model toward a desired pattern.', pattern: 'fine', legend: ['Fine-tuning starts from a pretrained base.', 'Targeted examples shape future responses.'] },
  { id: 'alignment', title: 'Alignment Landscape', caption: 'Alignment shapes behavior with preferred paths, guardrails, feedback, and policies; it does not create moral agency.', pattern: 'alignment', legend: ['Preferred path: behavior the system encourages.', 'Guardrail: boundary around risky terrain.', 'Warning zone: outputs to avoid or handle carefully.', 'Policy check and feedback are system signals, not conscience.'] },
  { id: 'inference-pass', title: 'Forward Pass', caption: 'Inference creates temporary states while durable weights stay fixed.', pattern: 'inference', legend: ['Current context enters the model.', 'Fixed weights are used, not updated.', 'Temporary hidden states lead to next-token scores.'] },
  { id: 'prompt-response', title: 'Prompt vs Response', subtitle: 'Given context versus generated tokens', caption: 'A complete user prompt is given; response tokens are generated and appended.', pattern: 'promptResponse', objective: 'Separate the complete user prompt from the incomplete response-so-far and next generated token.', callouts: [{ heading: 'User prompt', body: `The complete request is: ${canonicalPromptResponse.userPrompt}` }, { heading: 'Response so far', body: `The model has already generated: ${canonicalPromptResponse.responseSoFar}.` }, { heading: 'Next token', body: `${canonicalPromptResponse.chosenNextToken} is appended, so the next context combines prompt plus response so far plus floor.` }], keyTakeaway: 'The response grows one token at a time inside the current context.', accessibleDescription: 'The visual separates a complete user prompt, response-so-far token chips, the next token floor, and the next context row.', printNote: 'Token chips wrap inside the visual frame; full example text stays in HTML callouts.' },
  { id: 'tokenization', title: 'Text to Tokens', caption: 'Generated response text is split into model-readable chunks before embedding lookup.', pattern: 'token', legend: [`Generated response: ${canonicalPromptResponse.generatedResponse}`, 'Simplified for learning. Real tokenizers may split differently.'] },
  { id: 'token-ids', title: 'Token IDs', caption: 'Each token gets a lookup number that points to an embedding row.', pattern: 'ids', legend: ['dog -> 421, cat -> 982, floor -> 1576.', 'The ID is a lookup key, not the meaning.', 'The ID points to an embedding row.'] },
  { id: 'embeddings', title: 'Embedding Lookup', caption: 'A token ID retrieves a learned starting vector.', pattern: 'vector', legend: ['The embedding table was learned during training.', 'Inference retrieves one row temporarily for the current context.', 'The retrieved embedding is a starting vector, not a definition.'] },
  { id: 'vectors', title: 'Feature Vector', caption: 'A vector is a list of numerical features, not a sentence.', pattern: 'bars', legend: ['Labels such as animal-ish, grammar role, tone, position, and context clue are simplified.', 'Real features are distributed across many dimensions.'] },
  { id: 'tensors', title: 'Tensor Block', caption: 'Tensors organize many token vectors for layer-by-layer processing.', pattern: 'tensor', legend: ['Token positions run down one axis.', 'Feature dimensions run across another axis.', 'Batch x tokens x features is an advanced shape note.'] },
  { id: 'attention', title: 'Attention Weave', caption: 'Attention is weighted relevance between token positions.', pattern: 'attention' },
  { id: 'mlp', title: 'MLP Reshape', caption: 'The MLP reshapes each token position feature vector.', pattern: 'mlp' },
  { id: 'layers', title: 'Layer Stack', caption: 'Repeated blocks refine hidden states while carrying useful signal forward.', pattern: 'layers' },
  { id: 'hidden-states', title: 'Temporary Hidden State', caption: 'Hidden states are context-shaped vectors created during a forward pass.', pattern: 'hidden' },
  { id: 'logits', title: 'Raw Scores', caption: 'Logits are raw next-token scores before probabilities.', pattern: 'logits' },
  { id: 'softmax', title: 'Softmax Funnel', caption: 'Softmax converts raw scores into probabilities that sum to one.', pattern: 'softmax' },
  { id: 'sampling', title: 'Sample One Token', caption: 'Sampling chooses one token from the probability cloud.', pattern: 'sampling' },
  { id: 'autoregression', title: 'Append and Repeat', caption: 'The chosen token is appended, then the model runs again.', pattern: 'loop' },
  { id: 'context-window', title: 'Temporary Context Window', caption: 'Only visible context can influence the next token.', pattern: 'window' },
  { id: 'rag-retrieval', title: 'Open-Book Retrieval', subtitle: 'Retrieval plus context, not training', caption: 'Retrieved notes enter the context before response tokens are generated.', pattern: 'rag', objective: 'Show that RAG retrieves outside information and places it into context; it does not train the model.', callouts: [{ heading: 'Ask', body: 'The user prompt starts the run.' }, { heading: 'Retrieve', body: 'A search system finds relevant outside material.' }, { heading: 'Add to context', body: 'Retrieved notes become temporary context tokens.' }, { heading: 'Generate', body: 'The model still generates response tokens one at a time.' }, { heading: 'Weights stay fixed', body: 'RAG does not normally update model weights.' }], keyTakeaway: 'RAG is retrieval plus context, not training.', accessibleDescription: 'The RAG diagram moves from Prompt to Retriever to Notes, then into a Context tray and Generated response, with a separate fixed-weights note.', printNote: 'Gold-standard v0.9.3 visual: short diagram labels, five HTML callouts, and a one-sentence takeaway.' },
  { id: 'ai-learns', title: 'Learning Modes', caption: 'Durable training, retrieval, and temporary steering change different things.', pattern: 'learns' },
  { id: 'diffusion', title: 'Denoise, Not Append', caption: 'Diffusion refines noise step by step instead of generating text token by token.', pattern: 'diffusion' },
  { id: 'multimodal', title: 'Shared Media Hub', caption: 'Different media types can connect through learned representations.', pattern: 'multimodal' },
  { id: 'risk', title: 'Risk or Myth', caption: 'Clear mechanisms help separate practical risk from magical stories.', pattern: 'risk' }
]

const aidById = Object.fromEntries(visualAidCatalog.map((aid) => [aid.id, aid]))
const lessonByVisualAidId = Object.fromEntries(lessons.map((lesson) => [lesson.visualAidId, lesson]))

function getCallouts(aid) {
  if (aid.callouts?.length) {
    return aid.callouts.map((callout, index) => ({
      number: callout.number ?? index + 1,
      heading: callout.heading ?? `Step ${index + 1}`,
      body: callout.body
    }))
  }

  return (aid.legend ?? []).map((body, index) => ({
    number: index + 1,
    heading: `Point ${index + 1}`,
    body
  }))
}

// Visual aids must use short in-diagram labels plus HTML callouts because mobile
// screens and PDF export cannot reliably preserve dense SVG text layouts.
export function VisualAid({ id, headingId = undefined, compact = false }) {
  const aid = aidById[id] ?? aidById['llm-overview']
  return <VisualAidCard aid={aid} headingId={headingId} compact={compact} />
}

function VisualAidCard({ aid, headingId = undefined, compact = false }) {
  const callouts = getCallouts(aid)
  return (
    <figure className={compact ? 'visual-aid visual-aid-card compact' : 'visual-aid visual-aid-card'} aria-labelledby={headingId}>
      <DiagramScene aid={aid} />
      <figcaption>
        <div className="aid-caption-copy">
          <strong>{aid.title}</strong>
          {aid.subtitle && <em>{aid.subtitle}</em>}
          <span>{aid.caption}</span>
        </div>
        <CalloutList callouts={callouts} />
        {aid.keyTakeaway && <KeyTakeaway text={aid.keyTakeaway} />}
        {aid.accessibleDescription && <p className="sr-only">Accessible description: {aid.accessibleDescription}</p>}
      </figcaption>
    </figure>
  )
}

function DiagramScene({ aid }) {
  return (
    <div className={`aid-canvas aid-${aid.pattern}`} aria-hidden="true">
      <svg viewBox="0 0 320 210" preserveAspectRatio="xMidYMid meet" focusable="false">
        <VisualPattern aid={aid} />
      </svg>
    </div>
  )
}

function CalloutList({ callouts }) {
  if (!callouts?.length) return null

  return (
    <ol className="aid-callout-list aid-legend">
      {callouts.map((callout) => (
        <li key={`${callout.number}-${callout.heading}`}>
          <span aria-hidden="true">{callout.number}</span>
          <p><strong>{callout.heading}</strong> {callout.body}</p>
        </li>
      ))}
    </ol>
  )
}

function KeyTakeaway({ text }) {
  return <p className="aid-key-takeaway"><strong>Key takeaway:</strong> {text}</p>
}

export function VisualAidGallery() {
  return (
    <div className="visual-aid-gallery">
      {visualAidCatalog.map((aid) => {
        const lesson = lessonByVisualAidId[aid.id]
        return (
          <section id={aid.id} className="review-card aid-review-card" key={aid.id} aria-labelledby={`${aid.id}-review-title`}>
            <p className="eyebrow">{aid.id}</p>
            <h2 id={`${aid.id}-review-title`}>{aid.title}</h2>
            <div className="aid-review-meta" aria-label={`Review metadata for ${aid.title}`}>
              <span>Lesson: {lesson?.title ?? 'Shared/support visual'}</span>
              <span>Pattern: {aid.pattern}</span>
            </div>
            <VisualAid id={aid.id} compact />
            <dl className="aid-review-details">
              <div><dt>Learning objective</dt><dd>{aid.objective ?? aid.caption}</dd></div>
              <div><dt>Accessible description</dt><dd>{aid.accessibleDescription ?? aid.caption}</dd></div>
              <div><dt>Mobile preview</dt><dd>Review at 320px, 390px, and 430px; diagram labels must stay inside the canvas.</dd></div>
              <div><dt>Print/PDF notes</dt><dd>{aid.printNote ?? 'Use the same scene and HTML callouts in exported lesson-card PDFs.'}</dd></div>
            </dl>
          </section>
        )
      })}
    </div>
  )
}

function VisualPattern({ aid }) {
  switch (aid.pattern) {
    case 'llmOverview':
      return <LlmOverviewSvg />
    case 'traditions':
      return <TraditionsSvg />
    case 'training':
      return <TrainingSvg />
    case 'pretraining':
      return <PretrainingSvg />
    case 'overfitting':
      return <OverfittingSvg />
    case 'fine':
      return <FineTuneSvg />
    case 'alignment':
      return <AlignmentSvg />
    case 'inference':
      return <InferenceSvg />
    case 'promptResponse':
      return <PromptResponseSvg />
    case 'token':
      return <TokenSvg />
    case 'ids':
      return <IdsSvg />
    case 'vector':
      return <EmbeddingSvg />
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

function Callout({ x, y, children }) {
  return (
    <g>
      <circle className="aid-callout" cx={x} cy={y} r="12" />
      <Label x={Number(x) - 4} y={Number(y) + 5} className="tiny dark">{children}</Label>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }) {
  const startX = Number(x1)
  const startY = Number(y1)
  const endX = Number(x2)
  const endY = Number(y2)
  const midX = (startX + endX) / 2
  return <path className="aid-arrow" d={`M${startX} ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`} />
}

function StepNode({ number, label, x, y, width = 76, output = false }: { number: string | number, label: string | number, x: string | number, y: string | number, width?: string | number, output?: boolean }) {
  return (
    <g>
      <rect className={output ? 'aid-box output' : 'aid-box'} x={x} y={y} width={width} height="38" rx="8" />
      <circle className="aid-callout" cx={Number(x) + 15} cy={Number(y) + 19} r="10" />
      <Label x={Number(x) + 11} y={Number(y) + 24} className="tiny dark">{number}</Label>
      <Label x={Number(x) + 28} y={Number(y) + 24} className={output ? 'tiny dark' : 'tiny'}>{label}</Label>
    </g>
  )
}

function TokenChip({ token, x, y, width = 34, kind = 'output' }: { token: string | number, x: string | number, y: string | number, width?: string | number, kind?: string }) {
  return (
    <g>
      <rect className={kind === 'prompt' ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width={width} height="24" rx="6" />
      <Label x={Number(x) + 6} y={Number(y) + 17} className="tiny dark">{token}</Label>
    </g>
  )
}

function LlmOverviewSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="66" width="74" height="48" rx="8" />
      <circle className="aid-core" cx="142" cy="90" r="36" />
      {[0, 1, 2, 3].map((index) => (
        <circle key={index} className={index === 1 ? 'aid-dot alt' : 'aid-dot'} cx={216 + index * 22} cy={70 + (index % 2) * 34} r={9 + index * 2} />
      ))}
      <rect className="aid-box output" x="246" y="140" width="58" height="34" rx="8" />
      <Arrow x1={90} y1={90} x2={106} y2={90} />
      <Arrow x1={178} y1={90} x2={204} y2={90} />
      <Arrow x1={248} y1={112} x2={266} y2={140} />
      <Label x="25" y="87" className="tiny dark">prompt/</Label>
      <Label x="25" y="103" className="tiny dark">context</Label>
      <Label x="112" y="84" className="tiny">learned</Label>
      <Label x="114" y="101" className="tiny">weights</Label>
      <Label x="202" y="42" className="tiny">next-token</Label>
      <Label x="202" y="57" className="tiny">probabilities</Label>
      <Label x="255" y="161" className="tiny dark">token</Label>
      <Label x="128" y="190" className="tiny">append</Label>
    </>
  )
}

function TraditionsSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="18" y="28" width="126" height="126" rx="10" />
      <rect className="aid-box" x="176" y="28" width="126" height="126" rx="10" />
      <Label x="56" y="52" className="tiny dark">Rules</Label>
      <Label x="206" y="52" className="tiny">Examples</Label>
      {['Rules', 'Symbols', 'If-then'].map((label, index) => (
        <g key={label}>
          <rect className="aid-chip prompt" x="34" y={72 + index * 25} width="94" height="18" rx="5" />
          <Label x="46" y={86 + index * 25} className="tiny dark">{label}</Label>
        </g>
      ))}
      {['Examples', 'Loss', 'Weights'].map((label, index) => (
        <g key={label}>
          <rect className={index === 2 ? 'aid-chip output' : 'aid-chip'} x="192" y={72 + index * 25} width="94" height="18" rx="5" />
          <Label x="204" y={86 + index * 25} className={index === 2 ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}
      <path className="aid-line" d="M144 91 H176" />
      <rect className="aid-box muted" x="82" y="170" width="156" height="24" rx="8" />
      <Label x="132" y="187" className="tiny">bridge</Label>
    </>
  )
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
    ['1', 'Predict', 22, 38, 78],
    ['2', 'Compare', 120, 38, 88],
    ['3', 'Loss', 230, 38, 68],
    ['4', 'Update weights', 154, 132, 144],
    ['5', 'Repeat', 56, 132, 82]
  ]
  return (
    <>
      {steps.map(([number, label, x, y, width]) => (
        <StepNode key={label} number={number} label={label} x={x} y={y} width={width} output={String(label).startsWith('Update')} />
      ))}
      <path className="aid-line" d="M100 57 H120" />
      <path className="aid-line" d="M208 57 H230" />
      <path className="aid-line" d="M264 76 C264 100, 242 114, 220 132" />
      <path className="aid-line" d="M154 151 H138" />
      <path className="aid-line" d="M56 132 C32 110, 34 76, 54 76" />
      <rect className="aid-box prompt" x="106" y="92" width="108" height="24" rx="8" />
      <Label x="124" y="109" className="tiny dark">durable step</Label>
    </>
  )
}

function PretrainingSvg() {
  return (
    <>
      <path className="aid-land" d="M18 166 L76 102 L126 134 L178 78 L232 118 L302 58 L302 166 Z" />
      {[0, 1, 2, 3, 4, 5, 6].map((drop) => (
        <path key={drop} className="aid-line" d={`M${46 + drop * 34} 28 L${34 + drop * 32} ${80 + (drop % 2) * 18}`} />
      ))}
      <path className="aid-path" d="M34 154 C76 138, 110 128, 140 112 S206 84, 276 74" />
      <path className="aid-path thin" d="M54 168 C106 150, 146 150, 180 130 S238 106, 288 104" />
      <Label x="48" y="50" className="tiny">text/data stream</Label>
      <Label x="112" y="192" className="tiny">broad learning</Label>
    </>
  )
}

function OverfittingSvg() {
  const trainDots = [[42, 142], [84, 78], [126, 116], [168, 62], [210, 132]]
  const newDots = [[246, 96], [282, 82]]
  return (
    <>
      <path className="aid-line" d="M30 164 H300" />
      <path className="aid-line" d="M34 166 V34" />
      <path className="aid-arc alt" d="M40 142 C62 52, 92 50, 126 116 S156 24, 210 132 S250 182, 292 150" />
      <path className="aid-path thin" d="M40 148 C92 122, 150 102, 212 90 S260 82, 296 76" />
      {trainDots.map(([x, y]) => <circle key={`${x}-${y}`} className="aid-dot" cx={x} cy={y} r="7" />)}
      {newDots.map(([x, y]) => <rect key={`${x}-${y}`} className="aid-chip output" x={x - 8} y={y - 8} width="16" height="16" rx="4" />)}
      <circle className="aid-dot alt" cx="48" cy="34" r="5" />
      <path className="aid-line" d="M64 34 H98" />
      <path className="aid-path thin" d="M120 34 H154" />
      <rect className="aid-chip output" x="180" y="28" width="12" height="12" rx="3" />
    </>
  )
}

function FineTuneSvg() {
  return (
    <>
      <path className="aid-land" d="M20 162 L98 78 L145 126 L210 58 L300 162 Z" />
      <path className="aid-path" d="M42 154 C80 128, 105 122, 137 113 S201 83, 266 73" />
      <rect className="aid-chip prompt" x="92" y="32" width="74" height="28" rx="8" />
      <Label x="101" y="51" className="tiny dark">examples</Label>
      <circle className="aid-dot" cx="137" cy="113" r="10" />
      <circle className="aid-dot alt" cx="266" cy="73" r="10" />
      <Arrow x1="128" y1="60" x2="137" y2="103" />
      <Label x="36" y="184" className="tiny">pretrained base</Label>
      <Label x="174" y="39" className="tiny">fine-tuned path</Label>
      <Label x="190" y="184" className="tiny">future responses shaped</Label>
    </>
  )
}

function AlignmentSvg() {
  return (
    <>
      <path className="aid-land" d="M20 164 L82 96 L132 126 L196 60 L300 164 Z" />
      <rect className="aid-chip output" x="62" y="48" width="92" height="40" rx="10" opacity="0.82" />
      <path className="aid-path" d="M42 154 C84 128, 122 118, 154 106 S210 78, 272 68" />
      <path className="aid-line" d="M48 128 C98 104, 152 96, 230 92" />
      <rect className="aid-chip prompt" x="220" y="34" width="70" height="30" rx="8" />
      <circle className="aid-dot alt" cx="170" cy="104" r="10" />
      <Callout x="268" y="68">1</Callout>
      <Callout x="70" y="126">2</Callout>
      <Callout x="96" y="66">3</Callout>
      <Callout x="170" y="104">4</Callout>
    </>
  )
}

function InferenceSvg() {
  const steps = [
    ['context', 16, 66],
    ['states', 100, 66],
    ['scores', 184, 66],
    ['next', 252, 66]
  ]
  return (
    <>
      {steps.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={label === 'next' ? 'aid-box output' : 'aid-box'} x={Number(x)} y={Number(y)} width={label === 'next' ? 52 : 64} height="42" rx="8" />
          <Label x={Number(x) + 9} y={Number(y) + 26} className={label === 'next' ? 'tiny dark' : 'tiny'}>{label}</Label>
          {index < 3 && <path className="aid-line" d={`M${Number(x) + 64} ${Number(y) + 21} H${Number(steps[index + 1][1])}`} />}
        </g>
      ))}
      <rect className="aid-box prompt" x="86" y="146" width="142" height="32" rx="8" />
      <Label x="116" y="167" className="tiny dark">weights fixed</Label>
      <Callout x="42" y="48">1</Callout>
      <Callout x="160" y="132">2</Callout>
      <Callout x="220" y="46">3</Callout>
    </>
  )
}

function PromptResponseSvg() {
  const rowOne = [
    ['A', 22, 22],
    ['jealous', 46, 50],
    ['dog', 100, 34],
    ['chased', 138, 54],
    ['a', 196, 22],
    ['startled', 222, 60]
  ]
  const rowTwo = [
    ['cat', 46, 34],
    ['across', 84, 54],
    ['the', 142, 34],
    ['kitchen', 180, 60]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="16" y="14" width="288" height="40" rx="8" />
      <Label x="34" y="39" className="tiny dark">User prompt</Label>
      <Callout x="292" y="24">1</Callout>

      <rect className="aid-box muted" x="16" y="68" width="288" height="76" rx="8" />
      <Label x="24" y="88" className="tiny">response so far</Label>
      {rowOne.map(([token, x, width]) => <TokenChip key={`${token}-${x}`} token={token} x={x} y="98" width={width} />)}
      {rowTwo.map(([token, x, width]) => <TokenChip key={`${token}-${x}`} token={token} x={x} y="126" width={width} />)}
      <Callout x="292" y="80">2</Callout>

      <Label x="82" y="167" className="tiny">next token</Label>
      <TokenChip token="floor" x="158" y="150" width="48" />
      <Callout x="220" y="158">3</Callout>

      <rect className="aid-box prompt" x="38" y="182" width="244" height="22" rx="8" />
      <Label x="78" y="198" className="tiny dark">prompt + response + floor</Label>
    </>
  )
}

function TokenSvg() {
  const row1 = [
    ['A', 18, 22],
    ['jealous', 44, 52],
    ['dog', 100, 36],
    ['chased', 140, 56],
    ['a', 200, 22],
    ['startled', 226, 64]
  ]
  const row2 = [
    ['cat', 34, 34],
    ['across', 72, 56],
    ['the', 132, 34],
    ['kitchen', 170, 62],
    ['floor', 236, 46],
    ['.', 286, 20]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="26" y="34" width="260" height="34" rx="8" />
      <Label x="110" y="56" className="tiny dark">response text</Label>
      {[...row1, ...row2].map(([token, x, width], index) => (
        <g key={`${token}-${index}`}>
          <rect className={token === '.' ? 'aid-chip output' : 'aid-chip'} x={Number(x)} y={index < row1.length ? 104 : 142} width={Number(width)} height="26" rx="7" />
          <Label x={Number(x) + 6} y={index < row1.length ? 122 : 160} className={token === '.' ? 'tiny dark' : 'tiny'}>{token}</Label>
        </g>
      ))}
      <Arrow x1="160" y1="68" x2="160" y2="104" />
      <Callout x="286" y="86">1</Callout>
      <Callout x="286" y="184">2</Callout>
    </>
  )
}

function IdsSvg() {
  const rows = canonicalPromptResponse.tokenIds
  return (
    <>
      {rows.map((row, index) => (
        <g key={row.token}>
          <rect className="aid-chip prompt" x="28" y={38 + index * 44} width="62" height="28" rx="8" />
          <Label x="42" y={57 + index * 44} className="tiny dark">{row.token}</Label>
          <rect className="aid-box" x="128" y={36 + index * 44} width="66" height="32" rx="8" />
          <Label x="142" y={57 + index * 44} className="tiny">ID {row.id}</Label>
          <Arrow x1="90" y1={52 + index * 44} x2="128" y2={52 + index * 44} />
          <Arrow x1="194" y1={52 + index * 44} x2="232" y2={52 + index * 44} />
        </g>
      ))}
      <rect className="aid-box output" x="232" y="56" width="62" height="90" rx="8" />
      {[0, 1, 2, 3].map((bar) => (
        <rect key={bar} className="aid-bar dark-bar" x={244 + bar * 11} y={126 - bar * 10} width="7" height={18 + bar * 10} rx="3" />
      ))}
      <Label x="250" y="78" className="tiny dark">row</Label>
      <rect className="aid-box muted" x="76" y="170" width="170" height="26" rx="8" />
      <Label x="98" y="188" className="tiny">lookup key</Label>
    </>
  )
}

function EmbeddingSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="22" y="42" width="70" height="38" rx="8" />
      <Label x="36" y="66" className="tiny dark">ID 1576</Label>
      <rect className="aid-box muted" x="122" y="24" width="86" height="132" rx="8" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect className={row === 2 ? 'aid-chip output' : 'aid-chip'} x="136" y={42 + row * 26} width="58" height="18" rx="5" />
          <Label x="144" y={56 + row * 26} className={row === 2 ? 'tiny dark' : 'tiny'}>row {row + 1}</Label>
        </g>
      ))}
      <rect className="aid-box" x="236" y="72" width="78" height="54" rx="8" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} className="aid-bar" x={248 + bar * 12} y={112 - bar * 6} width="8" height={14 + bar * 6} rx="3" />
      ))}
      <Arrow x1="92" y1="61" x2="122" y2="94" />
      <Arrow x1="194" y1="94" x2="236" y2="98" />
      <Callout x="60" y="96">1</Callout>
      <Callout x="168" y="168">2</Callout>
      <Callout x="278" y="144">3</Callout>
    </>
  )
}

function VectorSvg() {
  const rows = [
    ['animal-ish', 78],
    ['grammar role', 48],
    ['tone', 36],
    ['position', 66],
    ['context clue', 88]
  ]
  return (
    <>
      <rect className="aid-box muted" x="28" y="24" width="264" height="158" rx="10" />
      <Label x="40" y="48" className="tiny">simplified</Label>
      {rows.map(([label, width], index) => (
        <g key={label}>
          <Label x="42" y={72 + index * 24} className="tiny">{label}</Label>
          <rect className="aid-box" x="132" y={58 + index * 24} width="132" height="14" rx="6" />
          <rect className="aid-bar horizontal" x="132" y={58 + index * 24} width={Number(width)} height="14" rx="6" />
        </g>
      ))}
      <Label x="82" y="198" className="tiny">distributed features</Label>
      <Callout x="278" y="44">1</Callout>
      <Callout x="278" y="158">2</Callout>
    </>
  )
}

function TensorSvg() {
  const tokens = ['dog', 'cat', 'floor']
  const features = [0, 1, 2, 3, 4]
  return (
    <>
      <rect className="aid-sheet" x="64" y="38" width="216" height="124" rx="10" />
      {tokens.map((token, row) => (
        <g key={token}>
          <Label x="22" y={72 + row * 34} className="tiny">{token}</Label>
          {features.map((feature) => (
            <rect key={`${token}-${feature}`} className="aid-cell" x={78 + feature * 38} y={56 + row * 34} width="24" height="22" rx="5" />
          ))}
        </g>
      ))}
      <path className="aid-line" d="M60 38 V162" />
      <path className="aid-line" d="M64 168 H280" />
      <Label x="12" y="32" className="tiny">tokens</Label>
      <Label x="138" y="194" className="tiny">features</Label>
      <rect className="aid-box muted" x="188" y="18" width="94" height="24" rx="8" />
      <Label x="200" y="35" className="tiny">batch note</Label>
      <Callout x="54" y="52">1</Callout>
      <Callout x="256" y="174">2</Callout>
      <Callout x="284" y="28">3</Callout>
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
      <Label x="104" y="190" className="tiny">relevance weights</Label>
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
      <Label x="112" y="192" className="tiny">carry forward</Label>
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
      <Label x="116" y="192" className="tiny">temp shape</Label>
    </>
  )
}

function LogitsSvg() {
  return (
    <>
      {[
        ['floor', 114],
        ['room', 72],
        ['quantum', 28]
      ].map(([label, width], index) => (
        <g key={label}>
          <Label x="38" y={64 + index * 42} className="tiny">{label}</Label>
          <rect className="aid-bar horizontal" x="106" y={48 + index * 42} width={width} height="22" rx="6" />
        </g>
      ))}
      <Label x="118" y="178" className="tiny">raw scores</Label>
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
        ['floor', 52, 70, 32],
        ['room', 138, 58, 24],
        ['tiles', 220, 78, 20],
        ['quantum', 172, 132, 16]
      ].map(([label, x, y, r]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r={Number(r)} />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-select" d="M52 70 L100 172 L140 108" />
      <Label x="118" y="190" className="tiny">one token</Label>
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
      <Label x="112" y="160" className="tiny">append repeat</Label>
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
      <Label x="112" y="178" className="tiny">visible input</Label>
    </>
  )
}

function RagSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="32" width="70" height="38" rx="8" />
      <Label x="31" y="56" className="tiny dark">Prompt</Label>
      <Callout x="22" y="32">1</Callout>

      <rect className="aid-box" x="122" y="26" width="82" height="50" rx="8" />
      <Label x="138" y="56" className="tiny">Retriever</Label>
      <Callout x="198" y="28">2</Callout>

      <g>
        <rect className="aid-chip prompt" x="238" y="24" width="58" height="28" rx="7" />
        <rect className="aid-chip prompt" x="246" y="40" width="58" height="28" rx="7" />
        <Label x="258" y="59" className="tiny dark">Notes</Label>
      </g>
      <Callout x="300" y="44">3</Callout>

      <rect className="aid-box muted" x="80" y="116" width="154" height="42" rx="10" />
      <Label x="128" y="142" className="tiny">Context</Label>
      <path className="aid-line" d="M96 158 H222" />

      <rect className="aid-box output" x="244" y="122" width="62" height="38" rx="8" />
      <Label x="254" y="146" className="tiny dark">Response</Label>
      <Callout x="302" y="128">4</Callout>

      <rect className="aid-box prompt" x="24" y="168" width="98" height="26" rx="8" />
      <Label x="38" y="186" className="tiny dark">weights fixed</Label>
      <Callout x="140" y="180">5</Callout>

      <path className="aid-line" d="M86 51 H122" />
      <path className="aid-line" d="M204 51 H238" />
      <path className="aid-line" d="M270 68 C270 96, 212 100, 186 116" />
      <path className="aid-line" d="M234 137 H244" />
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
      <Label x="98" y="178" className="tiny">change types</Label>
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
      <Label x="112" y="166" className="tiny">denoise steps</Label>
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
