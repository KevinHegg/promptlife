import { attentionWeights, softmax, trainWeight } from "./model";
type WorkedStep = { title: string; formula: string; explanation: string };
export default function MathGuide({ chapter }: { chapter: string }) {
  const p = softmax([3, 2, 1, -1]),
    weights = attentionWeights([2, 1, 0, 3], 2),
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
      title: "Read attention as a weighted mixture",
      intro:
        "Keep the attention weights and the learned parameters separate. Attention weights are temporary shares computed for this input. Learned parameters are the numbers training changes to produce queries, keys, values, and other transformations.",
      steps: [
        {
          title: "Start from scores, then apply the mask",
          formula: "2, 1, 0, 3 → 2, 1, 0, blocked",
          explanation:
            "A query–key comparison produces a score for each position. We start after that comparison, with invented scaled scores. The causal mask removes the future position before normalization. Setting its score to zero would not be enough: softmax gives a zero score a positive share.",
        },
        {
          title: "Normalize only the permitted scores",
          formula: `softmax(2, 1, 0) ≈ ${weights
            .slice(0, 3)
            .map((w) => w.toFixed(3))
            .join(", ")}`,
          explanation:
            "The permitted shares add to one. Garden’s share is zero because it is blocked. These shares tell the calculation how much of each value to combine; they do not measure a word’s importance in every context.",
        },
        {
          title: "Multiply each value by its share",
          formula: "0.665 × 1 + 0.245 × 3 + 0.090 × 2 ≈ 1.579",
          explanation:
            "The three products are about 0.665, 0.734, and 0.180 using unrounded weights. Add them to obtain the mixture. A weighted average can differ from every value that went into it. Real attention uses vectors: the multiplication and addition apply to their components.",
        },
        {
          title: "Connect the mixture to the full formula",
          formula: "Attention(Q, K, V) = softmax(QKᵀ / √dₖ + mask)V",
          explanation:
            "Q contains queries, K keys, and V values. The superscript T transposes K so queries can be compared with keys. The square-root factor scales scores by the key-vector dimension. The mask blocks forbidden positions; softmax makes shares; multiplication by V forms the mixtures. Multiple heads, projections, residual paths, and feed-forward networks surround this calculation.",
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
