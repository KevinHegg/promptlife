import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { canonicalPromptResponse } from '../data/canonicalExamples'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

function AnimationFrame({ className = '', title, caption, ariaLabel, interactive = false, children }) {
  const reduced = usePrefersReducedMotion()
  const Tag = interactive ? 'section' : 'figure'
  const props = interactive
    ? { role: 'group', 'aria-label': ariaLabel }
    : { role: 'img', 'aria-label': ariaLabel }

  return (
    <Tag className={`concept-animation ${className} ${reduced ? 'is-reduced-motion' : ''}`} {...props}>
      <div className="animation-title">{title}</div>
      <div className="animation-stage" aria-hidden={!interactive}>
        {children}
      </div>
      {interactive ? <p className="animation-caption">{caption}</p> : <figcaption>{caption}</figcaption>}
    </Tag>
  )
}

export function TokenCardsAnimation() {
  const [split, setSplit] = useState(false)
  const tokens = canonicalPromptResponse.responseTokens

  return (
    <AnimationFrame
      className="token-cards-animation"
      title="Tokenizer"
      caption={split ? 'Text becomes token cards before the model sees IDs or vectors.' : 'Tap once to split the generated response into model-readable chunks.'}
      ariaLabel="A generated response splitting into token cards"
      interactive
    >
      <button className="animation-control" onClick={() => setSplit(!split)}>{split ? 'Join response' : 'Split response'}</button>
      <div className="token-card-row">
        {split ? tokens.map((token, index) => <span className="response-token" key={`${token}-${index}`}>Response: {token}</span>) : <strong>{canonicalPromptResponse.generatedResponse}</strong>}
      </div>
    </AnimationFrame>
  )
}

export function EmbeddingLookupAnimation() {
  const [token, setToken] = useState('attention')
  const table = {
    Explain: { id: 4821, bars: [38, 72, 48, 84] },
    attention: { id: 1987, bars: [84, 42, 66, 52] },
    simply: { id: 7110, bars: [46, 62, 30, 78] }
  }
  const current = table[token]

  return (
    <AnimationFrame
      className="embedding-lookup-animation"
      title="Embedding lookup"
      caption="A token ID retrieves a learned starting vector from the embedding table."
      ariaLabel={`Token ${token} with ID ${current.id} looking up an embedding vector`}
      interactive
    >
      <div className="segmented-control mini" aria-label="Choose token for embedding lookup">
        {Object.keys(table).map((item) => (
          <button key={item} className={token === item ? 'active' : ''} onClick={() => setToken(item)}>{item}</button>
        ))}
      </div>
      <div className="lookup-flow">
        <span className="lookup-token">{token}</span>
        <span className="lookup-id">ID {current.id}</span>
        <div className="vector-bars" aria-hidden="true">
          {current.bars.map((bar, index) => <span key={index} style={{ height: `${bar}%` }} />)}
        </div>
      </div>
    </AnimationFrame>
  )
}

export function TensorBlockAnimation() {
  return (
    <AnimationFrame
      className="tensor-block-animation"
      title="Tensor block"
      caption="Vectors stack into an organized block shaped by token positions and features."
      ariaLabel="Several token vectors stacked into a tensor block"
    >
      <div className="tensor-cube">
        {[0, 1, 2, 3].map((sheet) => (
          <span key={sheet} style={{ '--sheet': sheet } as CSSProperties}>
            {['t1', 't2', 't3'].map((token) => <i key={token}>{token}</i>)}
          </span>
        ))}
      </div>
    </AnimationFrame>
  )
}

export function AttentionArcsAnimation() {
  const tokens = ['Explain', 'attention', 'simply']
  const [target, setTarget] = useState(1)
  const arcs = target === 1 ? [[0, 1], [2, 1]] : [[1, target]]

  return (
    <AnimationFrame
      className="attention-arcs-animation"
      title="Attention arcs"
      caption={`Selected token: ${tokens[target]}. Attention is learned relevance between token positions.`}
      ariaLabel="Token positions connected by relevance arcs"
      interactive
    >
      <svg viewBox="0 0 280 110" aria-hidden="true">
        {arcs.map(([a, b], index) => {
          const ax = 45 + a * 94
          const bx = 45 + b * 94
          return <path key={`${a}-${b}`} d={`M${ax} 72 Q${(ax + bx) / 2} ${16 + index * 10} ${bx} 72`} />
        })}
      </svg>
      <div className="attention-token-row">
        {tokens.map((token, index) => (
          <button key={token} className={target === index ? 'active' : ''} onClick={() => setTarget(index)}>{token}</button>
        ))}
      </div>
    </AnimationFrame>
  )
}

export function MlpGearsAnimation() {
  const [feature, setFeature] = useState('tone')
  const features = {
    syntax: 'sentence role',
    tone: 'clear voice',
    task: 'explain simply'
  }

  return (
    <AnimationFrame
      className="mlp-gears-animation"
      title="MLP reshape"
      caption={`The per-token vector is reshaped toward: ${features[feature]}.`}
      ariaLabel="Gears and sliders reshaping token features"
      interactive
    >
      <div className="segmented-control mini" aria-label="Choose feature to reshape">
        {Object.keys(features).map((item) => (
          <button key={item} className={feature === item ? 'active' : ''} onClick={() => setFeature(item)}>{item}</button>
        ))}
      </div>
      <div className={`gear-field feature-${feature}`}>
        <span className="gear one" />
        <span className="gear two" />
        <div className="feature-sliders">
          {[62, 38, 78].map((width, index) => <i key={index} style={{ width: `${width}%` }} />)}
        </div>
      </div>
    </AnimationFrame>
  )
}

export function HiddenStateGlowAnimation() {
  const [context, setContext] = useState('river')
  const label = context === 'river' ? 'bank near water' : 'bank with money'

  return (
    <AnimationFrame
      className="hidden-state-glow-animation"
      title="Hidden state"
      caption={`The same starting token becomes a temporary context-shaped vector: ${label}.`}
      ariaLabel="A token hidden state changing with context"
      interactive
    >
      <button className="animation-control" onClick={() => setContext(context === 'river' ? 'money' : 'river')}>
        Switch context
      </button>
      <div className={`hidden-state-card ${context}`}>
        <span>The</span>
        <strong>bank</strong>
        <span>{context === 'river' ? 'had reeds.' : 'approved a loan.'}</span>
      </div>
    </AnimationFrame>
  )
}

export function SoftmaxFunnelAnimation() {
  const [converted, setConverted] = useState(false)
  const raw = [
    ['floor', 88],
    ['room', 54],
    ['quantum', 12]
  ]
  const probs = [
    ['floor', 64],
    ['room', 26],
    ['quantum', 10]
  ]
  const rows = converted ? probs : raw

  return (
    <AnimationFrame
      className="softmax-funnel-animation"
      title={converted ? 'Probabilities' : 'Logits'}
      caption={converted ? 'Softmax turns raw scores into probabilities that add up to one.' : 'Logits are raw next-token scores before probability conversion.'}
      ariaLabel="Raw token scores entering a softmax funnel and becoming probabilities"
      interactive
    >
      <button className="animation-control" onClick={() => setConverted(!converted)}>{converted ? 'Show logits' : 'Apply softmax'}</button>
      <div className="funnel-bars">
        {rows.map(([word, value]) => (
          <span key={word}>
            <strong>{word}</strong>
            <i style={{ width: `${value}%` }} />
            <em>{value}{converted ? '%' : ''}</em>
          </span>
        ))}
      </div>
    </AnimationFrame>
  )
}

export function SamplingPickAnimation() {
  const [pick, setPick] = useState<string>(canonicalPromptResponse.chosenNextToken)
  const candidates = canonicalPromptResponse.nextTokenCandidates

  return (
    <AnimationFrame
      className="sampling-pick-animation"
      title="Sample one token"
      caption={`Sampling chooses one next token. Current pick: ${pick}.`}
      ariaLabel="One next token selected from a probability cloud"
      interactive
    >
      <div className="sample-cloud">
        {candidates.map((candidate) => (
          <button key={candidate} className={pick === candidate ? 'active' : ''} onClick={() => setPick(candidate)}>{candidate}</button>
        ))}
      </div>
    </AnimationFrame>
  )
}

export function AutoregressiveLoopAnimation() {
  const [count, setCount] = useState(0)
  const generated = [canonicalPromptResponse.chosenNextToken, '.']
  const visible = generated.slice(0, count)

  return (
    <AnimationFrame
      className="autoregressive-loop-animation"
      title="Next, append, repeat"
      caption={count ? 'The sampled token is appended, then the model predicts again.' : 'Generation starts from a complete user prompt and a response-so-far.'}
      ariaLabel="Autoregressive generation appending one token at a time"
      interactive
    >
      <button className="animation-control" onClick={() => setCount((count + 1) % 3)}>Predict next</button>
      <div className="loop-token-row">
        <span className="prompt-token">Prompt: user request</span>
        {canonicalPromptResponse.responseSoFarTokens.slice(-3).map((token, index) => <span className="response-token" key={`loop-${index}-${token}`}>Response: {token}</span>)}
        {visible.map((token, index) => <strong className="response-token" key={`${token}-${index}`}>Response: {token}</strong>)}
      </div>
      <div className="loop-arrow">next token {'->'} append {'->'} repeat</div>
    </AnimationFrame>
  )
}

export function ContextWindowSlideAnimation() {
  const cards = ['system', 'task', 'example', 'tone', 'latest']
  const [count, setCount] = useState(3)
  const visible = cards.slice(Math.max(0, count - 3), count)
  const fallen = cards.slice(0, Math.max(0, count - 3))

  return (
    <AnimationFrame
      className="context-window-slide-animation"
      title="Context window"
      caption={fallen.length ? `${fallen.join(', ')} fell out of the temporary window.` : 'Everything still fits inside the temporary context.'}
      ariaLabel="Context cards sliding through a limited window"
      interactive
    >
      <button className="animation-control" onClick={() => setCount(count === cards.length ? 3 : count + 1)}>Slide window</button>
      <div className="window-track">
        {visible.map((card) => <span key={card}>{card}</span>)}
      </div>
    </AnimationFrame>
  )
}

export function DiffusionDenoiseAnimation() {
  const [step, setStep] = useState(0)
  const labels = ['noise', 'rough shape', 'clearer', 'final']
  const cells = useMemo(() => Array.from({ length: 16 }, (_, index) => index), [])

  return (
    <AnimationFrame
      className={`diffusion-denoise-animation denoise-${step}`}
      title="Denoise"
      caption={step === 3 ? 'Diffusion refines noise step by step instead of appending text tokens.' : 'Each step removes a little noise.'}
      ariaLabel="A diffusion grid denoising from random noise toward an image-like pattern"
      interactive
    >
      <button className="animation-control" onClick={() => setStep((step + 1) % 4)}>Denoise step</button>
      <div className="denoise-grid">
        {cells.map((cell) => <span key={cell} />)}
      </div>
      <strong>{labels[step]}</strong>
    </AnimationFrame>
  )
}

export function MultimodalMixerAnimation() {
  const [mixed, setMixed] = useState(false)
  const modes = ['text', 'image', 'audio']

  return (
    <AnimationFrame
      className="multimodal-mixer-animation"
      title="Multimodal mixer"
      caption={mixed ? 'Multiple media types can be represented or processed together.' : 'Tap to move modes into a shared representation space.'}
      ariaLabel="Text, image, and audio chips entering a shared representation space"
      interactive
    >
      <button className="animation-control" onClick={() => setMixed(!mixed)}>{mixed ? 'Separate modes' : 'Mix modes'}</button>
      <div className={mixed ? 'mode-mixer mixed' : 'mode-mixer'}>
        {modes.map((mode) => <span key={mode}>{mode}</span>)}
        <strong>shared vectors</strong>
      </div>
    </AnimationFrame>
  )
}

export function FeatureCloudAnimation() {
  const [active, setActive] = useState(['syntax'])
  const nodes = ['syntax', 'style', 'facts', 'tone', 'math', 'risk', 'meaning']

  function toggle(node) {
    setActive((prev) => prev.includes(node) ? prev.filter((item) => item !== node) : [...prev, node])
  }

  return (
    <AnimationFrame
      className="feature-cloud-animation"
      title="Feature cloud"
      caption={active.length >= 3 ? `${active.length} learned patterns are active at once.` : 'Tap chips to light up distributed patterns.'}
      ariaLabel="A prompt activating many learned feature patterns"
      interactive
    >
      <div className="cloud-core" aria-hidden="true">
        {active.map((node, index) => <span key={node} style={{ '--i': index } as CSSProperties} />)}
      </div>
      <div className="cloud-chip-grid">
        {nodes.map((node) => (
          <button key={node} className={active.includes(node) ? 'active' : ''} onClick={() => toggle(node)} aria-pressed={active.includes(node)}>
            {node}
          </button>
        ))}
      </div>
    </AnimationFrame>
  )
}

export function FineTuningPathAnimation() {
  const [step, setStep] = useState(0)
  const labels = ['broad model', 'examples', 'preferred path']

  return (
    <AnimationFrame
      className={`fine-tuning-path-animation path-${step}`}
      title="Fine-tuning path"
      caption="Fine-tuning adds targeted training that nudges behavior without starting over."
      ariaLabel="A path being carved through a pretrained landscape"
      interactive
    >
      <button className="animation-control" onClick={() => setStep((step + 1) % labels.length)}>Nudge path</button>
      <div className="path-landscape">
        <span />
        <i />
      </div>
      <strong>{labels[step]}</strong>
    </AnimationFrame>
  )
}

export function TrainingLoopAnimation() {
  const [step, setStep] = useState(0)
  const labels = ['predict', 'compare', 'update weights', 'repeat']

  return (
    <AnimationFrame
      className="training-loop-animation"
      title="Training loop"
      caption={labels[step] === 'update weights' ? 'Training is the durable weight-changing step.' : `Current step: ${labels[step]}.`}
      ariaLabel="Training loop showing prediction, comparison, weight update, and repetition"
      interactive
    >
      <button className="animation-control" onClick={() => setStep((step + 1) % labels.length)}>Advance loop</button>
      <div className="training-cycle">
        {labels.map((label, index) => <span key={label} className={index === step ? 'active' : ''}>{label}</span>)}
      </div>
    </AnimationFrame>
  )
}

export function InferenceFlowAnimation() {
  const [step, setStep] = useState(0)
  const labels = ['input', 'forward pass', 'logits', 'sample']

  return (
    <AnimationFrame
      className="inference-flow-animation"
      title="Inference flow"
      caption="Inference computes temporary states and probabilities without durably updating weights."
      ariaLabel="A prompt moving through inference without changing model weights"
      interactive
    >
      <button className="animation-control" onClick={() => setStep((step + 1) % labels.length)}>Advance pass</button>
      <div className="inference-track">
        {labels.map((label, index) => <span key={label} className={index === step ? 'active' : ''}>{label}</span>)}
      </div>
    </AnimationFrame>
  )
}

export function TraceStepAnimation({ step }) {
  const compactSteps = [
    <PromptAppear key="prompt" />,
    <TokenCardsStatic key="tokens" />,
    <TokenIdStatic key="ids" />,
    <VectorStatic key="vectors" />,
    <TensorBlockAnimation key="tensor" />,
    <AttentionArcsStatic key="attention" />,
    <MlpStatic key="mlp" />,
    <HiddenStateStatic key="hidden" />,
    <VocabCloudStatic key="vocab" />,
    <SoftmaxStatic key="softmax" />,
    <SampleStatic key="sample" />,
    <AutoregressiveStatic key="loop" />
  ]

  return compactSteps[step] ?? compactSteps[0]
}

function PromptAppear() {
  return (
    <AnimationFrame className="trace-mini prompt-mini" title="Prompt" caption="The typed prompt is temporary context." ariaLabel={`The prompt ${canonicalPromptResponse.userPrompt}`}>
      <strong>"{canonicalPromptResponse.userPrompt}"</strong>
    </AnimationFrame>
  )
}

function TokenCardsStatic() {
  return (
    <AnimationFrame className="trace-mini" title="Tokens" caption="The tokenizer turns response text into chunks." ariaLabel="Response split into token cards">
      <div className="token-card-row">{canonicalPromptResponse.responseTokens.slice(0, 5).map((token, index) => <span className="response-token" key={`${token}-${index}`}>Response: {token}</span>)}</div>
    </AnimationFrame>
  )
}

function TokenIdStatic() {
  return (
    <AnimationFrame className="trace-mini" title="Token IDs" caption="Token chunks become lookup numbers." ariaLabel="Token cards paired with token IDs">
      <div className="id-row">{canonicalPromptResponse.tokenIds.map((item) => <span key={item.id}>{item.token} ID {item.id}</span>)}</div>
    </AnimationFrame>
  )
}

function VectorStatic() {
  return (
    <AnimationFrame className="trace-mini" title="Vectors" caption="IDs retrieve learned embedding vectors." ariaLabel="Token IDs becoming vector bars">
      <div className="vector-row">{[44, 72, 52, 84].map((bar, index) => <span key={index} style={{ height: `${bar}%` }} />)}</div>
    </AnimationFrame>
  )
}

function AttentionArcsStatic() {
  return (
    <AnimationFrame className="trace-mini attention-arcs-animation" title="Attention" caption="Positions exchange weighted relevance." ariaLabel="Attention arcs between token positions">
      <svg viewBox="0 0 280 110" aria-hidden="true">
        <path d="M45 72 Q92 18 139 72" />
        <path d="M233 72 Q186 24 139 72" />
      </svg>
      <div className="attention-token-row"><span className="prompt-token">Prompt: Explain</span><span className="prompt-token">Prompt: attention</span><span className="prompt-token">Prompt: simply</span></div>
    </AnimationFrame>
  )
}

function MlpStatic() {
  return (
    <AnimationFrame className="trace-mini mlp-gears-animation" title="MLP" caption="Per-token features are reshaped." ariaLabel="MLP reshaping token features">
      <div className="gear-field"><span className="gear one" /><span className="gear two" /><div className="feature-sliders"><i /><i /><i /></div></div>
    </AnimationFrame>
  )
}

function HiddenStateStatic() {
  return (
    <AnimationFrame className="trace-mini hidden-state-glow-animation" title="Hidden states" caption="Context-shaped vectors exist for this run." ariaLabel="Temporary hidden states glowing">
      <div className="hidden-state-card river"><span>Prompt: Explain</span><strong>Prompt: attention</strong><span>Prompt: simply</span></div>
    </AnimationFrame>
  )
}

function VocabCloudStatic() {
  return (
    <AnimationFrame className="trace-mini sample-static" title="Vocabulary cloud" caption="The final state points toward candidate next tokens." ariaLabel="Vocabulary cloud of candidate tokens">
      <div className="sample-cloud"><span>floor</span><span>room</span><span>tiles</span><span>quantum</span></div>
    </AnimationFrame>
  )
}

function SoftmaxStatic() {
  return (
    <AnimationFrame className="trace-mini softmax-funnel-animation" title="Softmax" caption="Raw logits become probabilities." ariaLabel="Logit bars converted to probability bars">
      <div className="funnel-bars">
        {['floor', 'room', 'tiles'].map((word, index) => <span key={word}><strong>{word}</strong><i style={{ width: `${72 - index * 22}%` }} /><em>{62 - index * 20}%</em></span>)}
      </div>
    </AnimationFrame>
  )
}

function SampleStatic() {
  return (
    <AnimationFrame className="trace-mini sample-static" title="Sample" caption="One token is chosen from the distribution." ariaLabel="The token floor selected from candidates">
      <div className="sample-cloud"><span className="active">floor</span><span>room</span><span>tiles</span></div>
    </AnimationFrame>
  )
}

function AutoregressiveStatic() {
  return (
    <AnimationFrame className="trace-mini autoregressive-loop-animation" title="Repeat" caption="The chosen token is appended and the loop runs again." ariaLabel="A sampled token appended to the response">
      <div className="loop-token-row"><span className="prompt-token">Prompt: user request</span><span className="response-token">Response: kitchen</span><strong className="response-token">Response: floor</strong></div>
      <div className="loop-arrow">append {'->'} predict again</div>
    </AnimationFrame>
  )
}

export function LearningModeAnimation({ mode }) {
  const label = mode?.label ?? 'learning'
  const key = mode?.key ?? 'supervised'

  return (
    <AnimationFrame
      className={`learning-mode-animation mode-${key}`}
      title={label}
      caption={mode?.metaphor ? `Metaphor: ${mode.metaphor}` : 'A learning mode in AI systems.'}
      ariaLabel={`${label}: ${mode?.plain ?? ''}`}
    >
      <div className="learning-mode-stage">
        <span>data</span>
        <i />
        <strong>{key === 'rag' ? 'retrieved context' : key === 'in-context' ? 'temporary context' : key === 'online' ? 'updated weights' : 'training signal'}</strong>
      </div>
    </AnimationFrame>
  )
}
