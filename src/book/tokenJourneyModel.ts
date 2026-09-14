// Authored four-dimensional example, not the output of a trained transformer.
// Lookup, residual additions, and output projections are calculated; the
// positional vector, sublayer updates, and later states are supplied examples.
export const journeyVocabulary = [
  { text: "The", id: 17, embedding: [0.5, 0.1, -0.2, 0.4] },
  { text: " river", id: 208, embedding: [-0.1, 0.8, 0.3, 0.2] },
  { text: " bank", id: 42, embedding: [0.2, -0.4, 0.7, 0.1] },
] as const;
export const bankToken = journeyVocabulary[2];
const add = (a: readonly number[], b: readonly number[]) =>
  a.map((value, i) => value + b[i]);
export const positionUpdate = [0, 0.1, 0, 0.2];
export const attentionUpdate = [0.1, 0.2, -0.1, 0.3];
export const mlpUpdate = [-0.1, 0.1, 0.2, 0];
export const positionedState = add(bankToken.embedding, positionUpdate);
export const attendedState = add(positionedState, attentionUpdate);
export const transformedState = add(attendedState, mlpUpdate);
export const finalRiverState = [0.6, -0.3, 1.2, 0.8];
export const finalSavingsState = [-0.2, 0.9, 0.4, -0.1];
export const journeyCandidates = [
  { text: " was", weights: [1, 0, 1, 0] },
  { text: " is", weights: [0, 1, 0, 1] },
  { text: " closed", weights: [-1, 0, 0, 0] },
].map((candidate) => ({
  ...candidate,
  score: candidate.weights.reduce(
    (sum, weight, i) => sum + weight * finalRiverState[i],
    0,
  ),
}));
export const formatCoordinate = (value: number) =>
  (Math.abs(value) < 0.05 ? 0 : value).toFixed(1);
export const vectorText = (values: readonly number[]) =>
  `[${values.map(formatCoordinate).join(", ")}]`;

export type JourneyStage =
  | "text"
  | "tokens"
  | "id"
  | "lookup"
  | "vector"
  | "state"
  | "position"
  | "attention"
  | "add"
  | "mlp"
  | "layers"
  | "context"
  | "scores"
  | "probabilities"
  | "append";
