/** Probabilities from raw scores (logits) at a given temperature. Numerically stable. */
export function softmax(logits: number[], temperature = 1): number[] {
  if (logits.length === 0) return []
  if (temperature <= 0) {
    // Temperature 0 means "always take the top score".
    const best = logits.indexOf(Math.max(...logits))
    return logits.map((_, i) => (i === best ? 1 : 0))
  }
  const scaled = logits.map((z) => z / temperature)
  const max = Math.max(...scaled)
  const exps = scaled.map((z) => Math.exp(z - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / sum)
}

/**
 * Top-p (nucleus) filter: keep the smallest set of highest-probability options whose
 * total reaches p, then renormalize. Returns probabilities in the original order.
 */
export function topP(probs: number[], p: number): number[] {
  if (p >= 1) return probs.slice()
  const order = probs.map((v, i) => [v, i] as const).sort((a, b) => b[0] - a[0])
  const keep = new Set<number>()
  let total = 0
  for (const [v, i] of order) {
    keep.add(i)
    total += v
    if (total >= p) break
  }
  const kept = probs.map((v, i) => (keep.has(i) ? v : 0))
  const sum = kept.reduce((a, b) => a + b, 0)
  return kept.map((v) => v / sum)
}

/** Draw an index from a probability list using a random number in [0, 1). */
export function sample(probs: number[], r: number): number {
  let acc = 0
  for (let i = 0; i < probs.length; i++) {
    acc += probs[i]
    if (r < acc) return i
  }
  return probs.length - 1
}
