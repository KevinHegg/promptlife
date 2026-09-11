export function softmax(scores: number[], temperature = 1): number[] {
  if (
    !Number.isFinite(temperature) ||
    temperature <= 0 ||
    !scores.length ||
    scores.some((x) => !Number.isFinite(x))
  )
    throw new Error("Use finite scores and a positive temperature.");
  const largest = Math.max(...scores);
  const values = scores.map((x) => Math.exp((x - largest) / temperature));
  const total = values.reduce((a, b) => a + b, 0);
  return values.map((x) => x / total);
}
export function sampleCounts(
  probabilities: number[],
  count: number,
  seed: number,
): number[] {
  const counts = probabilities.map(() => 0);
  let state = seed >>> 0;
  for (let i = 0; i < count; i++) {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    const draw = state / 4294967296;
    let cumulative = 0;
    const index = probabilities.findIndex((p) => {
      cumulative += p;
      return draw < cumulative;
    });
    counts[index < 0 ? counts.length - 1 : index]++;
  }
  return counts;
}
export function attentionWeights(scores: number[], position: number): number[] {
  if (!Number.isInteger(position) || position < 0 || position >= scores.length)
    throw new Error("Position outside sequence.");
  return [
    ...softmax(scores.slice(0, position + 1)),
    ...scores.slice(position + 1).map(() => 0),
  ];
}
export function trainWeight(steps: number) {
  let weight = 0;
  for (let i = 0; i < steps; i++)
    weight -= 0.5 * (1 / (1 + Math.exp(-weight)) - 0.75);
  const probability = 1 / (1 + Math.exp(-weight));
  const loss = (target: number) =>
    -target * Math.log(probability) - (1 - target) * Math.log(1 - probability);
  return {
    weight,
    probability,
    trainingLoss: loss(0.75),
    heldOutLoss: loss(0.5),
  };
}
export const contextItems = [
  {
    id: "instructions",
    label: "Application instructions",
    cost: 2,
    text: "Answer only from the supplied archive. Say when the evidence is insufficient.",
  },
  {
    id: "question",
    label: "Current question",
    cost: 2,
    text: "When did Maya Chen open the Riverside community garden?",
  },
  {
    id: "source",
    label: "Relevant archive passage",
    cost: 4,
    text: "Maya Chen opened the Riverside community garden on 12 April 2016.",
  },
  {
    id: "history",
    label: "Earlier conversation",
    cost: 3,
    text: "The user previously asked about public gardens in the district.",
  },
  {
    id: "note",
    label: "Saved preference",
    cost: 1,
    text: "The user prefers answers with exact dates when available.",
  },
];
export function packContext(selected: string[], budget: number) {
  let used = 0;
  return contextItems.map((item) => {
    const included = selected.includes(item.id) && used + item.cost <= budget;
    if (included) used += item.cost;
    return { ...item, included, selected: selected.includes(item.id) };
  });
}
export type EvidenceId = "wrong" | "right" | "missing" | "conflict";
export const evidenceRecords: Record<
  EvidenceId,
  { title: string; passage: string; answer: string; explanation: string }
> = {
  wrong: {
    title: "Riverside newsletter · 2008",
    passage:
      "Daniel Chen opened the Riverside plant nursery in May 2008. The nursery supplies plants to gardens across the district.",
    answer: "Maya Chen opened the Riverside community garden in May 2008. [1]",
    explanation:
      "The source concerns Daniel, not Maya, and a nursery, not the community garden. The supplied evidence is wrong for the question, and the generated claim is unsupported.",
  },
  right: {
    title: "Community garden minutes · 2016",
    passage:
      "Maya Chen welcomed residents to the opening of the Riverside community garden on 12 April 2016.",
    answer:
      "Maya Chen opened the Riverside community garden on 12 April 2016. [1]",
    explanation:
      "The person, event, and date match. This source supports the answer within the fictional collection. That does not independently establish the source’s reliability.",
  },
  missing: {
    title: "Library bulletin · 2016",
    passage:
      "The Riverside library will extend its Saturday opening hours from September.",
    answer:
      "The supplied passage does not establish when Maya Chen’s community garden opened.",
    explanation:
      "Library opening hours do not establish a garden’s opening date. A useful response can make this limit explicit instead of supplying an unsupported date.",
  },
  conflict: {
    title: "Minutes + anniversary newsletter",
    passage:
      "[1] The minutes record the garden’s opening on 12 April 2016. [2] An anniversary newsletter states that Maya Chen opened the same garden on 19 April 2016.",
    answer:
      "The records give two different dates: 12 April [1] and 19 April 2016 [2]. The supplied evidence does not resolve the discrepancy.",
    explanation:
      "Both records concern the same event but disagree. A grounded answer can preserve the conflict. Resolving it requires more evidence, not just picking a date.",
  },
};
