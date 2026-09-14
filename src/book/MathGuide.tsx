import { softmax, trainWeight } from "./model";
import {
  attendedState,
  attentionUpdate,
  bankToken,
  journeyCandidates,
  mlpUpdate,
  positionedState,
  positionUpdate,
  transformedState,
  vectorText,
} from "./tokenJourneyModel";
type WorkedStep = { title: string; formula: string; explanation: string };
export default function MathGuide({ chapter }: { chapter: string }) {
  const p = softmax([3, 2, 1, -1]),
    trained = trainWeight(100);
  const guides: Record<
    string,
    { title: string; intro: string; steps: WorkedStep[] }
  > = {
    prediction: {
      title: "Read softmax as a share of a total",
      intro:
        "The notation is a compact recipe: make the scores positive, add them, then divide each value by the total. Here is that recipe with the same four candidates used above.",
      steps: [
        {
          title: "What does exp mean?",
          formula: "exp(3) = e³ ≈ 20.086",
          explanation:
            "The number e is approximately 2.718. exp(z) means e raised to the power z. Exponentiation produces a positive value even when z is negative: exp(−1) is about 0.368. A larger logit therefore gets a larger positive value.",
        },
        {
          title: "Where does the denominator come from?",
          formula: "20.086 + 7.389 + 2.718 + 0.368 ≈ 30.561",
          explanation:
            "A denominator is the value you divide by. Here it is the total across all candidates. That lets us express each candidate as a share of the same whole.",
        },
        {
          title: "How does a share become a percentage?",
          formula: `20.086 ÷ 30.561 ≈ ${p[0].toFixed(4)} ≈ ${(p[0] * 100).toFixed(1)}%`,
          explanation:
            "A probability of 0.657 is about 65.7 out of 100. The percentage describes selection among these four candidates. It does not mean the eventual answer has a 65.7% chance of being true. Calculations use unrounded values, so rounded displays may not sum exactly.",
        },
        {
          title: "Where does temperature enter?",
          formula: "probability(i) = exp(zᵢ / T) ÷ Σ exp(zⱼ / T)",
          explanation:
            "zᵢ is candidate i’s logit; T is a positive temperature. The Σ symbol means “add across every candidate.” At T = 2, logits 3, 2, 1, −1 become 1.5, 1, 0.5, −0.5 before exponentiation. Their differences shrink, so their shares become more even.",
        },
        {
          title: "How can a less likely candidate be sampled?",
          formula: "0.657 ≤ 0.80 < 0.899 → room",
          explanation:
            "Lay the candidates’ shares end to end on a line from 0 to 1. The interval for floor ends near 0.657; room’s ends near 0.899. A draw of 0.80 lands in room’s interval. A real sampler makes a random draw; our walkthrough fixes it so the outcome is inspectable.",
        },
      ],
    },
    training: {
      title: "Read a weight update one operation at a time",
      intro:
        "The tiny model has one adjustable weight, w. Its probability rule and loss function are chosen so that we can inspect a complete training update without a neural network’s many layers.",
      steps: [
        {
          title: "Turn a weight into a probability",
          formula: "p(tea) = 1 ÷ (1 + exp(−w))",
          explanation:
            "This rule is called a sigmoid. It maps any finite weight into a probability between zero and one. When w = 0, exp(0) = 1, so p = 1 ÷ 2 = 0.5. Increasing the weight raises tea’s probability; coffee receives the remaining share, 1 − p.",
        },
        {
          title: "Measure how surprising the examples are",
          formula: "loss = −q ln(p) − (1 − q) ln(1 − p)",
          explanation:
            "p is the predicted probability of tea; q is how often tea occurs in the examples. ln is the natural logarithm, the inverse of exp. The negative log penalizes giving little probability to an observed outcome. At p = 0.5, loss is about 0.693. This is a loss value, not 69.3% incorrect answers.",
        },
        {
          title: "Use the gradient to choose a direction",
          formula: "gradient = p − q = 0.50 − 0.75 = −0.25",
          explanation:
            "For this particular model and loss, the derivative with respect to w simplifies to p − q. It measures the local effect of increasing w on loss. A negative derivative means that increasing w slightly would lower loss. Other models require more involved gradient calculations.",
        },
        {
          title: "Choose how far to move",
          formula: "new w = old w − 0.5 × gradient = 0.125",
          explanation:
            "The learning rate, 0.5 here, scales the update. Subtracting a negative gradient increases the weight. The new sigmoid probability is about 0.531, or 53.1% tea. Each later update recalculates the gradient from the current prediction.",
        },
        {
          title: "Compare like with like",
          formula: `After 100 updates: training ${trained.trainingLoss.toFixed(3)}; held-out ${trained.heldOutLoss.toFixed(3)}`,
          explanation:
            "Both losses use the same formula, but training examples contain 75% tea and held-out examples contain 50%. A model that fits one balance can perform worse on the other. This demonstrates a distribution mismatch; it is not a full demonstration of overfitting in a large network.",
        },
      ],
    },
    transformer: {
      title: "Read the vector arithmetic, one coordinate at a time",
      intro:
        "Use the same four-number example as the simulation. Square brackets mean “keep these numbers together as a list.” The example updates are supplied; the additions and output scores below are calculated from them.",
      steps: [
        {
          title: "Use an ID to select a row",
          formula: `embedding[42] = ${vectorText(bankToken.embedding)}`,
          explanation:
            "Here [42] means select row 42 from the embedding table. It does not mean multiply by 42. The result is four numbers—a four-dimensional vector. Its four coordinates are not probabilities and need not add to one.",
        },
        {
          title: "Add the position information",
          formula: `${vectorText(bankToken.embedding)} + ${vectorText(positionUpdate)} = ${vectorText(positionedState)}`,
          explanation:
            "Add corresponding coordinates. The second coordinate is −0.4 + 0.1 = −0.3; the fourth is 0.1 + 0.2 = 0.3. The result is still a list of four numbers. We use additive position information here to make the calculation visible; other architectures handle position differently.",
        },
        {
          title: "Add the attention update",
          formula: `${vectorText(positionedState)} + ${vectorText(attentionUpdate)} = ${vectorText(attendedState)}`,
          explanation:
            "Again, add down each coordinate. For the third entry, 0.7 + (−0.1) = 0.6. This residual addition produces a new hidden state. It does not write the result back into embedding row 42. That distinction separates processing an input from training the model.",
        },
        {
          title: "Apply the next update the same way",
          formula: `${vectorText(attendedState)} + ${vectorText(mlpUpdate)} = ${vectorText(transformedState)}`,
          explanation:
            "The feed-forward network supplies this example update. Notice the second coordinate: −0.1 + 0.1 = 0.0. An update can increase, decrease, or leave a coordinate unchanged. Further blocks produce more hidden states; we supply the final example rather than calculate a full network.",
        },
        {
          title: "Turn a final state into one candidate’s score",
          formula: `“ was”: (0.6 × 1) + (−0.3 × 0) + (1.2 × 1) + (0.8 × 0) = ${journeyCandidates[0].score.toFixed(1)}`,
          explanation:
            "Multiply each coordinate of the final state [0.6, −0.3, 1.2, 0.8] by the corresponding output weight [1, 0, 1, 0], then add. This is a dot product. Every output candidate has its own weights. Our other two rows produce 0.5 for “ is” and −0.6 for “ closed.” These are logits, not probabilities.",
        },
        {
          title: "Connect back to softmax",
          formula: `softmax(1.8, 0.5, −0.6) ≈ ${softmax(
            journeyCandidates.map((c) => c.score),
          )
            .map((p) => (100 * p).toFixed(1) + "%")
            .join(", ")}`,
          explanation:
            "These probabilities sum to approximately 100% after rounding. We normalize over just three toy output candidates. A real model scores its full output vocabulary before decoding rules are applied. The selected token is appended at a new position; the input token is not replaced.",
        },
      ],
    },
    assistant: {
      title: "Read context packing as a budget",
      intro:
        "The arithmetic is simple; the consequence is easy to miss. An item can be available and selected, yet absent from the final input.",
      steps: [
        {
          title: "Calculate the space left",
          formula: "7 − 2 − 2 = 3 units remaining",
          explanation:
            "Instructions and question are included first. The four-unit source cannot fit into three units. The three-unit history can fit, so this first-fit rule includes it instead.",
        },
        {
          title: "Rebuild with a different budget",
          formula: "8 − 2 − 2 − 4 = 0 units remaining",
          explanation:
            "Now the source fits before the history is considered. Real systems may truncate, summarize, rerank, or reserve space for output; our made-up units isolate the inclusion decision. More capacity only helps if useful information is actually supplied and used.",
        },
      ],
    },
  };
  const guide = guides[chapter];
  if (!guide) return null;
  return (
    <details
      className="reading-detail math-guide"
      id="chapter-math"
      tabIndex={-1}
    >
      <summary>
        <span className="detail-title">Work through the math</span>
        <span className="summary-hint">
          Symbols, numbers, and what they mean
        </span>
      </summary>
      <h2>{guide.title}</h2>
      <p>{guide.intro}</p>
      <ol className="worked-steps">
        {guide.steps.map((step, i) => (
          <li key={step.title}>
            <span className="worked-number" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p className="worked-formula">{step.formula}</p>
              <p>{step.explanation}</p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}
