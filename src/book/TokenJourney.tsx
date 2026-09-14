import {
  attendedState,
  attentionUpdate,
  bankToken,
  finalRiverState,
  finalSavingsState,
  formatCoordinate,
  journeyCandidates,
  journeyVocabulary,
  mlpUpdate,
  positionedState,
  positionUpdate,
  transformedState,
  type JourneyStage,
} from "./tokenJourneyModel";
import { softmax } from "./model";

function VectorRow({
  label,
  values,
  changed = false,
}: {
  label: string;
  values: readonly number[];
  changed?: boolean;
}) {
  return (
    <div className={`journey-vector${changed ? " updated" : ""}`}>
      <span className="journey-label">{label}</span>
      <ol aria-label={label}>
        {values.map((value, i) => (
          <li key={i}>{formatCoordinate(value)}</li>
        ))}
      </ol>
    </div>
  );
}

function Addition({
  before,
  update,
  after,
  label,
}: {
  before: readonly number[];
  update: readonly number[];
  after: readonly number[];
  label: string;
}) {
  return (
    <table className="journey-addition">
      <caption>{label} · add down each column</caption>
      <tbody>
        {[
          ["Start", before],
          ["+ Update", update],
          ["= State", after],
        ].map(([name, values], i) => (
          <tr key={name as string} className={i === 2 ? "updated" : ""}>
            <th scope="row">{name as string}</th>
            {(values as readonly number[]).map((value, j) => (
              <td key={j}>{formatCoordinate(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ContextFlow() {
  return (
    <svg
      className="journey-attention"
      viewBox="0 0 360 135"
      role="img"
      aria-label="Information from The, river, and bank contributes to an attention update at bank. All three positions are permitted."
    >
      {["The", "·river", "·bank"].map((word, i) => (
        <g key={word}>
          <rect
            x={10 + i * 120}
            y="5"
            width="100"
            height="35"
            rx="6"
            fill={i === 2 ? "#e7efff" : "#fff"}
            stroke={i === 2 ? "#2254cf" : "#9cabc0"}
          />
          <text x={60 + i * 120} y="28" textAnchor="middle" fontSize="17">
            {word}
          </text>
          <path
            d={`M${60 + i * 120} 43 Q${60 + i * 120} 70 180 87`}
            fill="none"
            stroke="#2254cf"
            strokeWidth="2"
          />
        </g>
      ))}
      <path d="m175 80 5 7 5-7" fill="none" stroke="#2254cf" strokeWidth="2" />
      <rect
        x="55"
        y="89"
        width="250"
        height="36"
        rx="6"
        fill="#e7efff"
        stroke="#2254cf"
      />
      <text x="180" y="113" textAnchor="middle" fontSize="16">
        Attention update for ·bank
      </text>
    </svg>
  );
}

export default function TokenJourney({ stage }: { stage: JourneyStage }) {
  const part = ["text", "tokens", "id"].includes(stage)
    ? 0
    : ["lookup", "vector", "state"].includes(stage)
      ? 1
      : ["scores", "probabilities", "append"].includes(stage)
        ? 3
        : 2;
  let visual;
  switch (stage) {
    case "text":
      visual = (
        <div className="journey-prompt">
          <span className="journey-label">The prompt so far</span>
          <p>
            The river <mark>bank</mark>
          </p>
          <span>We will follow this word.</span>
        </div>
      );
      break;
    case "tokens":
    case "id":
      visual = (
        <div>
          <ol className="journey-tokens" aria-label="Toy token sequence">
            {journeyVocabulary.map((token, i) => (
              <li key={token.id} className={i === 2 ? "focus" : ""}>
                <small>Position {i + 1}</small>
                <strong>{token.text.replace(" ", "·")}</strong>
                {stage === "id" && <span>ID {token.id}</span>}
              </li>
            ))}
          </ol>
          <p className="journey-foot">· = a space carried with the token</p>
        </div>
      );
      break;
    case "lookup":
      visual = (
        <table className="journey-lookup">
          <caption>A few rows of the embedding table</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Stored vector</th>
            </tr>
          </thead>
          <tbody>
            {journeyVocabulary.map((token) => (
              <tr key={token.id} className={token.id === 42 ? "focus" : ""}>
                <th scope="row">
                  {token.id === 42 && <span aria-hidden="true">→ </span>}
                  {token.id}
                </th>
                <td>
                  {token.embedding.map((value, i) => (
                    <span key={i}>{formatCoordinate(value)}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      break;
    case "vector":
      visual = (
        <div>
          <VectorRow
            label="bank’s embedding vector"
            values={bankToken.embedding}
          />
          <div className="journey-coordinates" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span key={i}>#{i}</span>
            ))}
          </div>
          <p className="journey-foot">Four coordinates = four dimensions</p>
        </div>
      );
      break;
    case "state":
      visual = (
        <div className="journey-pair">
          <VectorRow
            label="Stored embedding · stays fixed"
            values={bankToken.embedding}
          />
          <VectorRow
            label="Initial hidden state · starts here"
            values={bankToken.embedding}
            changed
          />
        </div>
      );
      break;
    case "position":
      visual = (
        <Addition
          before={bankToken.embedding}
          update={positionUpdate}
          after={positionedState}
          label="Position 3"
        />
      );
      break;
    case "attention":
      visual = (
        <div>
          <ContextFlow />
          <p className="journey-foot">
            Earlier positions + this position; no future tokens
          </p>
        </div>
      );
      break;
    case "add":
      visual = (
        <Addition
          before={positionedState}
          update={attentionUpdate}
          after={attendedState}
          label="Attention update"
        />
      );
      break;
    case "mlp":
      visual = (
        <Addition
          before={attendedState}
          update={mlpUpdate}
          after={transformedState}
          label="Feed-forward update"
        />
      );
      break;
    case "layers":
      visual = (
        <div className="journey-pair">
          <VectorRow
            label="Hidden state · after our first block"
            values={transformedState}
          />
          <span className="journey-between">↓ More transformer blocks</span>
          <VectorRow
            label="Hidden state · final example"
            values={finalRiverState}
            changed
          />
        </div>
      );
      break;
    case "context":
      visual = (
        <div className="journey-pair">
          <VectorRow
            label="Final state · The river bank"
            values={finalRiverState}
          />
          <VectorRow
            label="Final state · The savings bank"
            values={finalSavingsState}
            changed
          />
          <p className="journey-foot">
            Same ID 42 and starting embedding in both
          </p>
        </div>
      );
      break;
    case "scores":
    case "probabilities": {
      const probabilities = softmax(
        journeyCandidates.map((candidate) => candidate.score),
      );
      visual = (
        <div className="journey-output">
          {stage === "scores" ? (
            <VectorRow
              label="Final hidden state · bank’s position"
              values={finalRiverState}
            />
          ) : (
            <span className="journey-label">
              Softmax · three-candidate toy output
            </span>
          )}
          {stage === "scores" && (
            <p className="journey-foot">
              ↓ Output weights give each candidate a score
            </p>
          )}
          <div
            className="journey-candidates"
            aria-label={
              stage === "scores"
                ? "Next-token scores"
                : "Next-token probabilities"
            }
          >
            {journeyCandidates.map((candidate, i) => (
              <div key={candidate.text} className={i === 0 ? "focus" : ""}>
                <span>{candidate.text.replace(" ", "·")}</span>
                <strong>
                  {stage === "scores"
                    ? candidate.score.toFixed(1)
                    : `${(probabilities[i] * 100).toFixed(1)}%`}
                </strong>
                <small>
                  {stage === "scores"
                    ? "score"
                    : i === 0
                      ? "← choose"
                      : "share"}
                </small>
              </div>
            ))}
          </div>
        </div>
      );
      break;
    }
    case "append":
      visual = (
        <div className="journey-prompt">
          <span className="journey-label">The sequence grows by one token</span>
          <p>
            The river <mark>bank</mark> <ins>was</ins>
          </p>
          <span>bank stays · was gets a new position</span>
        </div>
      );
      break;
  }
  return (
    <div className={`token-journey journey-${stage}`}>
      <div
        className="journey-route"
        aria-label={`Journey phase: ${["Text and IDs", "Embedding", "Context", "Prediction"][part]}`}
      >
        {["Text & IDs", "Embedding", "Context", "Prediction"].map(
          (label, i) => (
            <span key={label} className={i === part ? "current" : ""}>
              {label}
            </span>
          ),
        )}
      </div>
      {part > 0 && (
        <div className="journey-identity">
          Following <strong>·bank</strong>
          <span>ID 42</span>
        </div>
      )}
      <div className="journey-body">{visual}</div>
    </div>
  );
}
