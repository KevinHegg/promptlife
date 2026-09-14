import { useId, useLayoutEffect, useRef, useState } from "react";
import { lessons, type VisualSpec } from "./lessons";
import {
  attentionWeights,
  contextItems,
  packContext,
  softmax,
  trainWeight,
} from "./model";

const words = ["floor", "room", "tiles", "elephant"];
const scores = [3, 2, 1, -1];
const attentionValues = [1, 3, 2];
const percent = (p: number) => `${(100 * p).toFixed(1)}%`;
function Formula({
  label,
  children,
  result,
}: {
  label: string;
  children: React.ReactNode;
  result?: string;
}) {
  return (
    <div className="formula-scene">
      <span className="visual-label">{label}</span>
      <div className="formula-value">{children}</div>
      {result && <p className="visual-result">{result}</p>}
    </div>
  );
}
function Bars({
  values,
  selected,
  label,
}: {
  values: number[];
  selected?: number;
  label: string;
}) {
  return (
    <div className="bars-scene">
      <p className="visual-label">{label}</p>
      {values.map((p, i) => (
        <div
          className={`probability-row${i === selected ? " selected" : ""}`}
          key={words[i]}
        >
          <span>{words[i]}</span>
          <span className="probability-track" aria-hidden="true">
            <i style={{ width: `${p * 100}%` }} />
          </span>
          <strong>{percent(p)}</strong>
        </div>
      ))}
    </div>
  );
}
function Generation({ beat }: { beat: number }) {
  const final = ["Cats", "quietly", "chase", "small", "gray", "mice."];
  const drafts = [
    ["—", "—", "—", "—", "—", "—"],
    ["Cats", "—", "—", "—", "—", "birds."],
    ["Cats", "—", "watch", "—", "—", "birds."],
    ["Cats", "quietly", "watch", "small", "gray", "birds."],
    ["Cats", "quietly", "chase", "small", "gray", "birds."],
    final,
    final,
  ];
  const rows = [final.map((w, i) => (i < beat ? w : "—")), drafts[beat]];
  return (
    <div className="generation-scene">
      {rows.map((row, r) => (
        <div className="generation-track" key={r}>
          <p className="visual-label">
            {r === 0 ? "Autoregression · extend" : "Text denoising · refine"}
          </p>
          <ol
            className="token-slots"
            aria-label={
              r === 0 ? "Autoregressive response" : "Denoising canvas"
            }
          >
            {row.map((word, i) => {
              const changed =
                beat > 0 &&
                (r === 0 ? i === beat - 1 : word !== drafts[beat - 1][i]);
              return (
                <li
                  key={i}
                  className={`${word !== "—" ? "filled" : ""}${changed ? " changed" : ""}`}
                  aria-label={`Position ${i + 1}: ${word === "—" ? "unfilled" : word}${changed ? ", changed this step" : ""}`}
                >
                  <small aria-hidden="true">{i + 1}</small>
                  <span aria-hidden="true">{word}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
function Probability({
  mode,
}: {
  mode: Extract<VisualSpec, { kind: "probability" }>["mode"];
}) {
  const exp = scores.map((s) => Math.exp(s)),
    total = exp.reduce((a, b) => a + b, 0);
  const p = softmax(scores, mode === "temperature" ? 2 : 1);
  if (mode === "scores" || mode === "exp" || mode === "sum")
    return (
      <div className="number-table-scene">
        <table>
          <caption>
            {mode === "scores" ? "Four candidate tokens" : "Temperature = 1"}
          </caption>
          <thead>
            <tr>
              <th>Token</th>
              <th>Logit</th>
              {mode !== "scores" && (
                <th>
                  e<sup>logit</sup>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {words.map((word, i) => (
              <tr key={word}>
                <th>{word}</th>
                <td>{scores[i]}</td>
                {mode !== "scores" && <td>{exp[i].toFixed(3)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="visual-result">
          {mode === "scores"
            ? "Scores can be positive or negative."
            : mode === "sum"
              ? `Total = ${total.toFixed(3)}`
              : "e ≈ 2.718; exponentiation makes each value positive."}
        </p>
      </div>
    );
  if (mode === "divide")
    return (
      <Formula
        label="The share for “floor”"
        result={`= ${p[0].toFixed(4)} ≈ ${percent(p[0])}`}
      >
        <span className="fraction">
          <span>{exp[0].toFixed(3)}</span>
          <span>{total.toFixed(3)}</span>
        </span>
        <span className="formula-equals">=</span>
        <span className="fraction words">
          <span>this candidate</span>
          <span>all candidates</span>
        </span>
      </Formula>
    );
  if (mode === "sample") {
    const cumulative = p.map((_, i) =>
      p.slice(0, i + 1).reduce((a, b) => a + b, 0),
    );
    const draw = 0.8,
      selected = cumulative.findIndex((c) => draw < c);
    return (
      <div className="sample-scene">
        <p className="visual-label">A fixed draw of {draw.toFixed(2)}</p>
        <div
          className="sample-strip"
          role="img"
          aria-label={`Draw 0.80 lands in ${words[selected]}'s interval`}
        >
          <div className="sample-segments">
            {p.map((v, i) => (
              <span
                key={i}
                style={{
                  width: `${100 * v}%`,
                  background: ["#2254cf", "#b34c23", "#6976b3", "#7c899b"][i],
                }}
              />
            ))}
          </div>
          <i style={{ left: `${draw * 100}%` }} />
        </div>
        <div className="sample-scale">
          <span>0</span>
          <span>1</span>
        </div>
        <dl className="mini-values">
          <div>
            <dt>floor</dt>
            <dd>0 to {cumulative[0].toFixed(3)}</dd>
          </div>
          <div className="selected">
            <dt>room ← draw</dt>
            <dd>
              {cumulative[0].toFixed(3)} to {cumulative[1].toFixed(3)}
            </dd>
          </div>
        </dl>
        <p className="visual-result">Selected: {words[selected]}</p>
      </div>
    );
  }
  return (
    <>
      <Bars
        values={p}
        selected={mode === "greedy" ? 0 : undefined}
        label={
          mode === "temperature"
            ? "Temperature 2 · more even shares"
            : "Temperature 1"
        }
      />
      <p className="visual-result">
        {mode === "greedy"
          ? "Greedy choice: floor"
          : "Probabilities total 100% before rounding."}
      </p>
    </>
  );
}
function Training({
  mode,
}: {
  mode: Extract<VisualSpec, { kind: "training" }>["mode"];
}) {
  const updates =
    mode === "update"
      ? 1
      : mode === "ten"
        ? 10
        : mode === "hundred" || mode === "heldout"
          ? 100
          : 0;
  const model = trainWeight(updates);
  if (mode === "data")
    return (
      <div className="training-examples">
        <p className="visual-label">One representative group</p>
        <div>
          {["tea", "tea", "tea", "coffee"].map((word, i) => (
            <span key={i} className={i < 3 ? "tea-example" : ""}>
              {word}
            </span>
          ))}
        </div>
        <p className="visual-result">3 of 4 = 0.75 = 75% tea</p>
      </div>
    );
  if (mode === "loss")
    return (
      <Formula
        label="Loss for an outcome with probability 0.5"
        result={`−ln(0.5) ≈ ${model.trainingLoss.toFixed(3)}`}
      >
        <span>Low probability</span>
        <span className="formula-equals">→</span>
        <span>Larger penalty</span>
      </Formula>
    );
  if (mode === "gradient")
    return (
      <Formula
        label="Gradient = prediction − target"
        result="Negative gradient → increase the weight"
      >
        <span>0.50 − 0.75</span>
        <span>= −0.25</span>
      </Formula>
    );
  if (mode === "heldout")
    return (
      <div className="number-table-scene">
        <table>
          <caption>Same trained weight, different data</caption>
          <thead>
            <tr>
              <th>Loss</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Training</th>
              <td>{trainWeight(0).trainingLoss.toFixed(3)}</td>
              <td>{model.trainingLoss.toFixed(3)} ↓</td>
            </tr>
            <tr>
              <th>Held-out</th>
              <td>{trainWeight(0).heldOutLoss.toFixed(3)}</td>
              <td>{model.heldOutLoss.toFixed(3)} ↑</td>
            </tr>
          </tbody>
        </table>
        <p className="visual-result">
          Training target: 75% tea
          <br />
          Held-out target: 50% tea
        </p>
      </div>
    );
  return (
    <div className="training-state">
      <p className="visual-label">
        {updates} {updates === 1 ? "update" : "updates"} · weight{" "}
        {model.weight.toFixed(3)}
      </p>
      {mode === "update" && (
        <p className="small-equation">0 − 0.5 × (−0.25) = 0.125</p>
      )}
      <div
        className="training-meter"
        role="img"
        aria-label={`Tea ${percent(model.probability)}, coffee ${percent(1 - model.probability)}`}
      >
        <i style={{ width: percent(model.probability) }} />
      </div>
      <div className="split-values">
        <span>
          Tea <strong>{percent(model.probability)}</strong>
        </span>
        <span>
          Coffee <strong>{percent(1 - model.probability)}</strong>
        </span>
      </div>
      <p className="visual-result">
        Training loss: {model.trainingLoss.toFixed(3)}
        <br />
        <small>Lower is better.</small>
      </p>
    </div>
  );
}
function Attention({
  mode,
}: {
  mode: Extract<VisualSpec, { kind: "attention" }>["mode"];
}) {
  const weights = attentionWeights([2, 1, 0, 3], 2);
  if (mode === "mix")
    return (
      <div className="number-table-scene">
        <table>
          <caption>Each share multiplies its value</caption>
          <thead>
            <tr>
              <th>Position</th>
              <th>Share × value</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {["Maya", "opened", "the"].map((token, i) => (
              <tr key={token}>
                <th>{token}</th>
                <td>
                  {weights[i].toFixed(3)} × {attentionValues[i]}
                </td>
                <td>{(weights[i] * attentionValues[i]).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="visual-result">
          Sum ≈{" "}
          {weights
            .slice(0, 3)
            .reduce((n, w, i) => n + w * attentionValues[i], 0)
            .toFixed(3)}
          <br />
          <small>Computed using unrounded shares.</small>
        </p>
      </div>
    );
  const masked = mode === "mask" || mode === "weights";
  return (
    <svg
      className="attention-visual"
      viewBox="0 0 360 190"
      role="img"
      aria-label={`Computing “the”. ${mode === "scores" ? "Illustrative scores: Maya 2, opened 1, the 0, garden 3." : masked ? `Garden is blocked. ${mode === "weights" ? "Allowed shares: 66.5%, 24.5%, 9.0%." : "Maya, opened, and the are allowed."}` : "This position can use itself and earlier positions."}`}
    >
      {["Maya", "opened", "the", "garden"].map((token, i) => (
        <g key={token}>
          <rect
            x={5 + i * 90}
            y="14"
            width="80"
            height="36"
            rx="6"
            fill={i === 2 ? "#e7efff" : "#fff"}
            stroke={i === 2 ? "#2254cf" : "#a8bad4"}
          />
          <text x={45 + i * 90} y="37" textAnchor="middle" fontSize="16">
            {token}
          </text>
          <text
            x={45 + i * 90}
            y="75"
            textAnchor="middle"
            fontSize="15"
            fill={masked && i === 3 ? "#b34c23" : "#17283e"}
          >
            {mode === "scores"
              ? `Score ${[2, 1, 0, 3][i]}`
              : masked
                ? i === 3
                  ? "Blocked"
                  : mode === "weights"
                    ? percent(weights[i])
                    : "Allowed"
                : i === 2
                  ? "Focus"
                  : `Position ${i + 1}`}
          </text>
          {masked && i < 3 && (
            <path
              d={`M${45 + i * 90} 83Q${45 + i * 90} 117 180 143`}
              stroke="#2254cf"
              strokeWidth={mode === "weights" ? 1 + weights[i] * 9 : 2}
              fill="none"
            />
          )}
          {masked && i === 3 && (
            <path d="M290 18l50 28m0-28-50 28" stroke="#b34c23" />
          )}
        </g>
      ))}
      <rect
        x="35"
        y="144"
        width="290"
        height="35"
        rx="6"
        fill="#e7efff"
        stroke="#2254cf"
      />
      <text x="180" y="167" textAnchor="middle" fontSize="16">
        {mode === "weights"
          ? "Mix values using these shares"
          : "Computing the position “the”"}
      </text>
    </svg>
  );
}
function Capacity({ stage }: { stage: number }) {
  const budget = stage >= 5 ? 8 : 7;
  const selected = contextItems.slice(0, Math.min(stage, 4)).map((x) => x.id);
  const packed = packContext(selected, budget).slice(0, 4);
  const used = packed.filter((x) => x.included).reduce((n, x) => n + x.cost, 0);
  return (
    <div className="capacity-scene">
      <p className="visual-label">
        {used} of {budget} units used · {budget - used} left
      </p>
      <div className="capacity-meter" aria-hidden="true">
        {Array.from({ length: budget }, (_, i) => (
          <i key={i} className={i < used ? "used" : ""} />
        ))}
      </div>
      <dl className="mini-values">
        {packed.map((item, i) => (
          <div
            key={item.id}
            className={
              item.included ? "included" : item.selected ? "excluded" : ""
            }
          >
            <dt>
              {["Instructions", "Question", "Source", "History"][i]}{" "}
              <small>({item.cost})</small>
            </dt>
            <dd>
              {item.included
                ? "Included"
                : item.selected
                  ? "Doesn’t fit"
                  : "Waiting"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
function Visual({ spec }: { spec: VisualSpec }) {
  switch (spec.kind) {
    case "flow":
      return (
        <ol className="flow-scene">
          {spec.items.map(([label, detail], i) => (
            <li key={i} className={i === spec.active ? "active" : ""}>
              <span className="flow-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
            </li>
          ))}
        </ol>
      );
    case "generation":
      return <Generation beat={spec.beat} />;
    case "probability":
      return <Probability mode={spec.mode} />;
    case "training":
      return <Training mode={spec.mode} />;
    case "attention":
      return <Attention mode={spec.mode} />;
    case "capacity":
      return <Capacity stage={spec.stage} />;
  }
}
export default function Simulation({ chapter }: { chapter: string }) {
  const [step, setStep] = useState(0);
  const frame = useRef<HTMLElement>(null),
    stepped = useRef(false);
  const id = useId(),
    lesson = lessons[chapter],
    scene = lesson.scenes[step];
  function changeStep(next: number) {
    stepped.current = true;
    setStep(next);
  }
  useLayoutEffect(() => {
    if (stepped.current) frame.current?.scrollIntoView({ block: "start" });
  }, [step]);
  useLayoutEffect(() => {
    if (/\/(simulation|experiment)$/.test(location.hash))
      frame.current?.scrollIntoView({ block: "start" });
  }, []);
  return (
    <section
      ref={frame}
      className="simulation"
      aria-labelledby={`${id}-heading`}
    >
      <header className="simulation-header">
        <span className="eyebrow">GUIDED SIMULATION</span>
        <span>
          Step {step + 1} of {lesson.scenes.length}
        </span>
      </header>
      <div className="simulation-scene" aria-live="polite" aria-atomic="true">
        <h2 id={`${id}-heading`}>{scene.title}</h2>
        <div className={`scene-visual visual-${scene.visual.kind}`}>
          <Visual spec={scene.visual} />
        </div>
        <p>{scene.text}</p>
      </div>
      <nav className="simulation-controls" aria-label="Simulation steps">
        <button
          className="subtle"
          disabled={step === 0}
          onClick={() => changeStep(step - 1)}
        >
          ← Back
        </button>
        <div className="step-track" aria-hidden="true">
          <i
            style={{ width: `${(100 * (step + 1)) / lesson.scenes.length}%` }}
          />
        </div>
        <button
          className="primary"
          onClick={() =>
            changeStep(step === lesson.scenes.length - 1 ? 0 : step + 1)
          }
        >
          {step === lesson.scenes.length - 1 ? "Restart ↺" : "Next →"}
        </button>
      </nav>
      <p className="simulation-note">{lesson.note}</p>
    </section>
  );
}
