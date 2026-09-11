import { useEffect, useId, useState } from "react";
import "./diagrams.css";

// Motion is opt-in. Manual navigation and leaving the tab stop playback.
export function useDiagramPlayback(
  step: number,
  setStep: (step: number) => void,
  count: number,
) {
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReducedMotion(media.matches);
      setPlaying(false);
    };
    const hide = () => {
      if (document.hidden) setPlaying(false);
    };
    media.addEventListener("change", change);
    document.addEventListener("visibilitychange", hide);
    return () => {
      media.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (step === count - 1) setPlaying(false);
      else setStep(step + 1);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [playing, reducedMotion, step, count, setStep]);
  return {
    playing,
    reducedMotion,
    choose: (next: number) => {
      setPlaying(false);
      setStep(next);
    },
    toggle: () => {
      if (reducedMotion) return;
      if (!playing && step === count - 1) setStep(0);
      setPlaying(!playing);
    },
  };
}

const transformerStages = [
  {
    title: "Tokens",
    detail:
      "The tokenizer turns text into IDs. Each position enters the network separately. These word-like pieces are a teaching example; actual token boundaries depend on the tokenizer.",
    key: "Separate positions, shared model.",
  },
  {
    title: "Embeddings & position",
    detail:
      "Each ID looks up a learned vector: a list of numbers. The network also receives information about order. Some models add position vectors; others encode relative position inside attention. The colored cells stand for numbers, not individual concepts.",
    key: "Text becomes vectors with position information.",
  },
  {
    title: "Masked attention",
    detail:
      "Each head forms queries, keys, and values from the vectors. Query–key scores become weights after masking and softmax. Weighted values mix information from permitted positions; the head outputs are combined and projected. The bypass adds the incoming vector back to the result.",
    key: "Mix information across positions, without looking ahead.",
  },
  {
    title: "Feed-forward network",
    detail:
      "A learned network transforms each position’s vector separately, using the same parameters at every position. Its nonlinear transformation adds another update through a residual connection. Normalization controls the scale of the inputs to each sublayer in this example.",
    key: "Transform the features within each position.",
  },
  {
    title: "Repeat the block",
    detail:
      "The updated vectors pass into the next block. The pattern repeats, usually with different learned parameters in each block. Information can be recombined many times. The moving highlight represents computation, not weights changing during the answer.",
    key: "Many blocks build on the previous block’s work.",
  },
  {
    title: "Next-token probabilities",
    detail:
      "After the final block and normalization, a vocabulary projection turns the last position’s vector into logits. Softmax turns these scores into probabilities. A decoding procedure then selects one token. During training, predictions can be computed at all positions in parallel.",
    key: "The last position supplies the next-token prediction.",
  },
];

export function TransformerExplorer() {
  const [step, setStep] = useState(0);
  const playback = useDiagramPlayback(step, setStep, transformerStages.length);
  const id = useId();
  const current = transformerStages[step];
  const state = (index: number) =>
    `diagram-stage ${step === index ? "is-active" : ""}`;
  return (
    <section
      className="experiment transformer-explorer"
      aria-labelledby={`${id}-heading`}
    >
      <div className="experiment-heading">
        <span className="eyebrow">VISUAL WALKTHROUGH</span>
        <span className="mode-tag">Simplified architecture</span>
      </div>
      <h2 id={`${id}-heading`}>Follow the information through a transformer</h2>
      <p>
        Choose a stage or play the walkthrough. Then use the attention bench
        below to change the numbers yourself.
      </p>
      <div
        className={`transformer-layout ${playback.playing ? "diagram-playing" : ""}`}
      >
        <svg
          className="transformer-svg"
          viewBox="0 0 360 580"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>
            A decoder-only transformer, stage {step + 1}: {current.title}
          </title>
          <desc id={`${id}-desc`}>
            Token IDs become vectors. Repeated blocks contain normalization,
            causal self-attention and a feed-forward network, with a residual
            bypass around each sublayer. Final normalization and vocabulary
            projection produce probabilities.
          </desc>
          <defs>
            <marker
              id={`${id}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10z" fill="currentColor" />
            </marker>
          </defs>
          <path
            className="diagram-wire"
            d="M180 50V538"
            markerEnd={`url(#${id}-arrow)`}
          />
          <g className={state(0)}>
            {["Maya", "opened", "the"].map((token, i) => (
              <g key={token}>
                <rect x={35 + i * 100} y="12" width="90" height="38" rx="6" />
                <text x={80 + i * 100} y="36">
                  {token}
                </text>
              </g>
            ))}
          </g>
          <g className={state(1)}>
            <rect x="35" y="72" width="290" height="68" rx="8" />
            <text x="180" y="96">
              Embeddings + position information
            </text>
            {Array.from({ length: 24 }, (_, i) => (
              <rect
                className="vector-cell"
                key={i}
                x={59 + (i % 12) * 20}
                y={107 + Math.floor(i / 12) * 12}
                width="15"
                height="8"
                style={{ opacity: 0.25 + ((i * 7) % 9) / 12 }}
              />
            ))}
          </g>
          <rect
            className="block-boundary"
            x="15"
            y="154"
            width="330"
            height="252"
            rx="12"
          />
          <text className="diagram-small" x="180" y="174">
            ONE TRANSFORMER BLOCK
          </text>
          <g className={state(2)}>
            <path
              className="residual-wire"
              d="M180 183H42V276H163"
              markerEnd={`url(#${id}-arrow)`}
            />
            <rect x="75" y="189" width="225" height="24" rx="5" />
            <text className="diagram-small" x="187" y="206">
              Normalize
            </text>
            <rect x="75" y="223" width="225" height="35" rx="5" />
            <text x="187" y="246">
              Causal multi-head attention
            </text>
            <circle cx="180" cy="276" r="13" />
            <text x="180" y="281">
              +
            </text>
            <text className="diagram-small" x="258" y="281">
              Add input
            </text>
          </g>
          <g className={state(3)}>
            <path
              className="residual-wire"
              d="M180 294H42V383H163"
              markerEnd={`url(#${id}-arrow)`}
            />
            <rect x="75" y="301" width="225" height="24" rx="5" />
            <text className="diagram-small" x="187" y="318">
              Normalize
            </text>
            <rect x="75" y="335" width="225" height="30" rx="5" />
            <text x="187" y="356">
              Feed-forward network
            </text>
            <circle cx="180" cy="383" r="13" />
            <text x="180" y="388">
              +
            </text>
            <text className="diagram-small" x="258" y="388">
              Add input
            </text>
          </g>
          <g className={state(4)}>
            <rect x="45" y="417" width="280" height="35" rx="6" />
            <rect x="35" y="412" width="280" height="35" rx="6" />
            <text x="175" y="435">
              More blocks, new parameters
            </text>
          </g>
          <g className={state(5)}>
            <rect x="35" y="468" width="290" height="53" rx="8" />
            <text x="180" y="490">
              Final norm → vocabulary scores
            </text>
            <text className="diagram-small" x="180" y="509">
              Last position → softmax
            </text>
            {[20, 40, 13, 7, 3, 10, 5].map((height, i) => (
              <rect
                className="vector-cell"
                key={i}
                x={91 + i * 27}
                y={572 - height}
                width="19"
                height={height}
                rx="2"
              />
            ))}
          </g>
        </svg>
        <div className="diagram-narration">
          <ol className="diagram-stage-list">
            {transformerStages.map((stage, index) => (
              <li key={stage.title}>
                <button
                  aria-pressed={step === index}
                  onClick={() => playback.choose(index)}
                >
                  <span>{index + 1}</span>
                  {stage.title}
                </button>
              </li>
            ))}
          </ol>
          <div
            className="diagram-explanation"
            aria-live={playback.playing ? "off" : "polite"}
            aria-atomic="true"
          >
            <span className="eyebrow">STAGE {step + 1} / 6</span>
            <h3>{current.key}</h3>
            <p>{current.detail}</p>
          </div>
          <div className="button-row">
            <button
              className="primary"
              onClick={playback.toggle}
              disabled={playback.reducedMotion}
            >
              {playback.playing
                ? "Pause walkthrough"
                : step === 5
                  ? "Replay walkthrough"
                  : "Play walkthrough"}
            </button>
            <button
              className="subtle"
              onClick={() => playback.choose((step + 1) % 6)}
            >
              {step === 5 ? "Back to start" : "Next stage"}
            </button>
          </div>
          {playback.reducedMotion && (
            <p className="lab-caption">
              Reduced motion is on. Explore at your own pace with the stage
              buttons.
            </p>
          )}
        </div>
      </div>
      <p className="lab-caption">
        A common pre-normalization decoder layout, with dropout and
        implementation details omitted. Position methods and block designs vary.
        Cell colors and output bars are illustrative, not a trained model’s
        activations.{" "}
        <a
          href="https://github.com/karpathy/nanoGPT/blob/master/model.py"
          target="_blank"
          rel="noreferrer"
        >
          See a compact implementation of these blocks ↗
        </a>
      </p>
    </section>
  );
}

export function AttentionDiagram({
  tokens,
  position,
  weights,
  values,
}: {
  tokens: string[];
  position: number;
  weights: number[];
  values: number[];
}) {
  const id = useId();
  const mixed = weights.reduce((sum, weight, i) => sum + weight * values[i], 0);
  return (
    <figure className="attention-figure">
      <svg
        viewBox="0 0 360 280"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>
          Information flowing into position {position + 1}: {tokens[position]}
        </title>
        <desc id={`${id}-desc`}>
          {tokens
            .map(
              (token, i) =>
                `${token}: ${i > position ? "future position, blocked" : `${(weights[i] * 100).toFixed(1)} percent weight, value ${values[i]}`}`,
            )
            .join(". ")}
          . Weighted sum: {mixed.toFixed(3)}. Wider lines represent larger
          attention weights.
        </desc>
        <defs>
          <pattern
            id={`${id}-mask`}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="7" height="7" fill="#f2f4f7" />
            <line
              x1="0"
              x2="0"
              y1="0"
              y2="7"
              stroke="#aab4c3"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        {tokens.map((token, i) => {
          const x = 45 + i * 90;
          return (
            <g key={token}>
              {i <= position && (
                <path
                  className="attention-flow"
                  d={`M${x} 89 C${x} 154 180 154 180 200`}
                  style={{
                    strokeWidth: Math.max(0.8, weights[i] * 18),
                    opacity: 0.35 + weights[i] * 0.65,
                  }}
                />
              )}
              <rect
                x={x - 39}
                y="13"
                width="78"
                height="76"
                rx="7"
                fill={i > position ? `url(#${id}-mask)` : "#eaf0ff"}
                stroke={i === position ? "#bd451f" : "#aab4c3"}
                strokeWidth={i === position ? 2.5 : 1}
              />
              <text x={x} y="36">
                {token}
              </text>
              <text className="diagram-small" x={x} y="58">
                {i > position ? "Blocked" : `value ${values[i]}`}
              </text>
              <text className="diagram-small" x={x} y="78">
                {(weights[i] * 100).toFixed(1)}%
              </text>
            </g>
          );
        })}
        <rect x="79" y="200" width="202" height="67" rx="8" fill="#17283e" />
        <text className="diagram-inverse" x="180" y="224">
          Update for “{tokens[position]}”
        </text>
        <text className="diagram-inverse" x="180" y="249">
          Weighted sum = {mixed.toFixed(3)}
        </text>
      </svg>
      <figcaption>
        Read downward: permitted values flow into the selected position. Wider
        lines mean larger weights. Hatched positions contribute zero. Change the
        position or scores to reshape the flow.
      </figcaption>
    </figure>
  );
}

export function GenerationDiagram({
  step,
  playing,
}: {
  step: number;
  playing: boolean;
}) {
  const id = useId();
  const labels = [
    "Your message",
    "Assemble context",
    "Model: score candidates",
    "Decode: select one token",
    "Append token to context",
  ];
  return (
    <figure className={`generation-figure ${playing ? "diagram-playing" : ""}`}>
      <svg
        viewBox="0 0 360 355"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>The generation loop: {labels[step]}</title>
        <desc id={`${id}-desc`}>
          Your message is assembled into context. The model scores candidates,
          decoding selects a token, and that token is appended. The updated
          context is used to score the next token. Current stage: {labels[step]}
          .
        </desc>
        <defs>
          <marker
            id={`${id}-arrow`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0 10 5 0 10z" fill="currentColor" />
          </marker>
        </defs>
        <path
          className="diagram-wire"
          d="M165 42V287"
          markerEnd={`url(#${id}-arrow)`}
        />
        <path
          className={`generation-return ${step === 4 ? "is-active" : ""}`}
          d="M295 274H326V89H297"
          markerEnd={`url(#${id}-arrow)`}
        />
        {labels.map((label, i) => (
          <g
            className={`diagram-stage ${step === i ? "is-active" : ""}`}
            key={label}
          >
            <rect x="15" y={8 + i * 61} width="280" height="41" rx="7" />
            <text x="155" y={34 + i * 61}>
              {label}
            </text>
          </g>
        ))}
        <text className="diagram-small" x="180" y="321">
          Repeat scoring → selection → appending
        </text>
        <text className="diagram-small" x="180" y="342">
          until a stop condition or output limit.
        </text>
      </svg>
      <figcaption>
        {step === 4
          ? "The arrow returns the updated context to the next prediction. Model weights stay fixed during this ordinary generation loop."
          : "Follow the highlighted stage. The model computes scores; a decoding procedure selects the next token."}{" "}
        Implementations can cache earlier attention keys and values instead of
        recomputing the whole context.
      </figcaption>
    </figure>
  );
}
