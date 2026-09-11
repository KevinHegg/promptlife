import { useId, useState } from "react";
import { useDiagramPlayback } from "./Diagrams";
import "./landscape.css";

const milestones = [
  {
    date: "1955–1956",
    title: "A field gets a name",
    text: "The Dartmouth proposal names artificial intelligence and plans the 1956 research project. It already considers language, abstraction, and learning—not just conversation.",
    url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
  },
  {
    date: "1959",
    title: "Programs learn from experience",
    text: "Arthur Samuel’s checkers work demonstrates a machine-learning approach. Improving a game-playing program is a different task from generating text.",
    url: "https://research.ibm.com/topics/machine-learning",
  },
  {
    date: "1986 → 2012",
    title: "Learning representations at scale",
    text: "Backpropagation research develops methods for learning internal representations. Later, AlexNet demonstrates the impact of deep networks, data, and GPUs on image classification—not image generation.",
    url: "https://www.cs.toronto.edu/~kriz/imagenet_classification_with_deep_convolutional.pdf",
    extra: "https://www.cs.toronto.edu/~hinton/backprop.html",
  },
  {
    date: "2013–2014",
    title: "Different routes to generation",
    text: "VAEs and GANs become influential neural generative approaches. Generative modeling is already a research area before today’s chat assistants.",
    url: "https://arxiv.org/abs/1312.6114",
    extra: "https://arxiv.org/abs/1406.2661",
  },
  {
    date: "2017",
    title: "The transformer",
    text: "Attention Is All You Need introduces the transformer for machine translation. It becomes a foundation for many later language and multimodal systems.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    date: "2020 → 2022",
    title: "Denoising for images—and language",
    text: "DDPM demonstrates strong image synthesis with diffusion. Diffusion-LM later explores controllable text generation by denoising continuous vectors.",
    url: "https://arxiv.org/abs/2006.11239",
    extra: "https://arxiv.org/abs/2205.14217",
  },
  {
    date: "2025–2026",
    title: "Google explores text diffusion",
    text: "Gemini Diffusion demonstrates text and code generation. DiffusionGemma subsequently documents parallel denoising inside blocks, with blocks generated in sequence.",
    url: "https://deepmind.google/models/gemini-diffusion/",
    extra: "https://ai.google.dev/gemma/docs/diffusiongemma",
  },
];

const finalWords = ["A", "jealous", "dog", "chased", "the", "cat."];
const canvases: (string | null)[][] = [
  [null, null, null, null, null, null],
  ["A", null, null, null, null, "cat."],
  ["A", null, "cat", null, "the", "cat."],
  ["A", "small", "cat", "chased", "the", "cat."],
  ["A", "small", "dog", "chased", "the", "cat."],
  ["A", "jealous", "dog", "chased", "the", "cat."],
  finalWords,
];
const explanations = [
  "Both procedures receive the same prompt. Autoregression starts with no response tokens. This illustrative diffusion canvas starts with masked positions.",
  "Autoregression commits the first token. The denoising example proposes two positions at once, including one near the end.",
  "The left-to-right sequence grows by one token. Denoising fills more positions while others are still unknown. A visible word is provisional here.",
  "The denoising canvas has a readable draft, but readability does not mean it is final. Notice the cat where our eventual sentence will have a dog.",
  "Autoregression adds “chased” to its existing prefix. Denoising revises “cat” to “dog” inside the canvas. The orange outlines identify changed positions.",
  "Denoising changes “small” to “jealous.” This sampler illustration permits revisions; not every text-diffusion method revises filled positions this way.",
  "Both authored examples end with the same sentence. The paths differ. Equal display beats do not mean equal computation, speed, or output quality.",
];

function TokenCanvas({
  words,
  previous,
  name,
  caption,
}: {
  words: (string | null)[];
  previous: (string | null)[];
  name: string;
  caption: string;
}) {
  const id = useId();
  return (
    <figure className="token-canvas">
      <h3>{name}</h3>
      <svg
        viewBox="0 0 330 140"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{name}</title>
        <desc id={`${id}-desc`}>
          {words
            .map(
              (word, i) =>
                `Position ${i + 1}: ${word ?? "unfilled"}${word !== previous[i] ? ", changed this beat" : ""}`,
            )
            .join(". ")}
        </desc>
        {words.map((word, i) => {
          const x = 5 + (i % 3) * 110,
            y = 5 + Math.floor(i / 3) * 68;
          return (
            <g key={i} className={word !== previous[i] ? "canvas-changed" : ""}>
              <rect
                x={x}
                y={y}
                width="100"
                height="57"
                rx="7"
                fill={word ? "#eaf0ff" : "#f3f5f8"}
                stroke={word !== previous[i] ? "#bd451f" : "#bdc8d7"}
                strokeWidth={word !== previous[i] ? 2.5 : 1}
              />
              <text x={x + 50} y={y + 23} className="canvas-position">
                {i + 1}
              </text>
              <text x={x + 50} y={y + 45}>
                {word ?? "—"}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function LandscapeLab({
  save,
}: {
  save: (title: string, text: string) => void;
}) {
  const [step, setStep] = useState(0);
  const playback = useDiagramPlayback(step, setStep, canvases.length);
  const [timelineOpen, setTimelineOpen] = useState(true);
  const prefix = finalWords.map((word, i) => (i < step ? word : null));
  const previousPrefix = finalWords.map((word, i) =>
    i < step - 1 ? word : null,
  );
  return (
    <>
      <section className="landscape-history" aria-labelledby="history-heading">
        <span className="eyebrow">A SHORT HISTORY</span>
        <h2 id="history-heading">Several ideas, developing together</h2>
        <p>
          These are selected milestones, not a complete history or a ladder of
          replacements. Rules, search, statistical methods, and neural networks
          continue to coexist.
        </p>
        <button
          className="text-button"
          aria-expanded={timelineOpen}
          aria-controls="history-milestones"
          onClick={() => setTimelineOpen(!timelineOpen)}
        >
          {timelineOpen ? "Collapse timeline" : "Explore the timeline"}
        </button>
        <ol
          id="history-milestones"
          className="ai-timeline"
          hidden={!timelineOpen}
        >
          {milestones.map((m) => (
            <li key={m.date}>
              <span className="eyebrow">{m.date}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <a href={m.url} target="_blank" rel="noreferrer">
                Source ↗
              </a>
              {m.extra && (
                <>
                  {" "}
                  ·{" "}
                  <a href={m.extra} target="_blank" rel="noreferrer">
                    Further source ↗
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </section>
      <section
        className="experiment"
        aria-labelledby="generation-comparison-heading"
      >
        <div className="experiment-heading">
          <span className="eyebrow">EXPERIMENT 01</span>
          <span className="mode-tag">Authored comparison</span>
        </div>
        <h2 id="generation-comparison-heading">
          One next token—or a canvas that changes?
        </h2>
        <p className="experiment-question">
          Prompt: “Write a sentence about two pets in conflict.”
        </p>
        <p>
          Predict which positions can change next. Step through both procedures
          and compare the orange outlines.
        </p>
        <div className="button-row">
          <button
            className="primary"
            onClick={() => playback.choose((step + 1) % canvases.length)}
          >
            {step === 6 ? "Start again" : "Next beat"}
          </button>
          <button
            className="subtle"
            disabled={step === 0}
            onClick={() => playback.choose(step - 1)}
          >
            Previous beat
          </button>
          <button
            className="subtle"
            disabled={playback.reducedMotion}
            onClick={playback.toggle}
          >
            {playback.playing
              ? "Pause comparison"
              : step === 6
                ? "Replay comparison"
                : "Play comparison"}
          </button>
        </div>
        <label className="comparison-slider" htmlFor="generation-beat">
          Display beat <output>{step} / 6</output>
          <input
            id="generation-beat"
            type="range"
            min="0"
            max="6"
            step="1"
            value={step}
            onChange={(e) => playback.choose(Number(e.target.value))}
          />
        </label>
        <div className="generation-comparison">
          <TokenCanvas
            words={prefix}
            previous={previousPrefix}
            name="Autoregressive generation"
            caption="Commit the next token, then extend the prefix. Dashes mark positions not generated yet."
          />
          <TokenCanvas
            words={canvases[step]}
            previous={canvases[Math.max(0, step - 1)]}
            name="Illustrative text denoising"
            caption="Refine several positions in a fixed canvas. Dashes mark masks; visible words can still be provisional."
          />
        </div>
        <div
          className="feedback"
          aria-live={playback.playing ? "off" : "polite"}
          aria-atomic="true"
        >
          <strong>What changed at beat {step}?</strong>
          <p>{explanations[step]}</p>
        </div>
        {playback.reducedMotion && (
          <p className="lab-caption">
            Reduced motion is on. Use the beat buttons or slider to explore.
          </p>
        )}
        <button
          className="subtle save-button"
          onClick={() =>
            save(
              "Comparing generation procedures",
              `Display beat ${step}: ${explanations[step]}`,
            )
          }
        >
          Save observation to notebook
        </button>
        <p className="lab-caption">
          Scripted word-like positions, not real tokenization, model
          predictions, or a recording of Gemini Diffusion. The controls
          synchronize display beats, not time or compute. This is one revisable
          denoising illustration; corruption and sampling procedures vary. A
          block-based model would repeat refinement for subsequent blocks.
        </p>
      </section>
    </>
  );
}
