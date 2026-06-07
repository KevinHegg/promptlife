# Decision Room Tiny Interaction Plan v0.21.2

Date: 2026-06-06

## Interaction Discipline

Decision Room interactions should make the hidden state -> logits -> softmax -> probabilities -> sampling -> generated token chain easier to feel without becoming a math puzzle.

Avoid:

- decorative taps
- hidden-rule puzzles
- top-k/top-p complexity in the main path
- score, streak, leaderboard, or failure language

## Logits

- Interaction type: `logits-raw-toggle`
- Misconception targeted: logits are probabilities, truth scores, memories, or the sampled token.
- Expected action: toggle between `Raw scores` and `Probabilities?`.
- Correct feedback: `Insight strengthened. Logits are the before state: temporary raw scores for possible next tokens.`
- Wrong/redirect feedback: `Softmax comes next. Probabilities are easier to sample from, but still are not truth guarantees.`
- Status: implemented now.

## Softmax

- Interaction type: `softmax-convert`
- Misconception targeted: softmax checks truth, trains the model, or chooses the whole response.
- Expected action: tap `Apply softmax` to convert raw scores into probabilities.
- Correct feedback: `Insight strengthened. Softmax turns raw scores into probabilities that can be sampled. Probability is not truth.`
- Wrong/idle feedback: `Raw logits are not ready-to-sample probabilities yet.`
- Status: implemented now.

## Sampling

- Interaction type: `sampling-probability-pick`
- Misconception targeted: sampling writes the whole response or permanently teaches the model.
- Expected action: choose the most likely next token from `floor`, `room`, `counter`, and `quantum`.
- Correct feedback: `Insight strengthened. “floor” has the highest probability in this local context.`
- Plausible feedback: `Close. “room” is plausible, but “floor” is more likely in this sentence.`
- Wrong feedback: `Not quite. “quantum” is in the vocabulary, but it is very unlikely in this local context.`
- Status: implemented now.

## Deferred

- Top-k and top-p remain glossary/deep terms.
- Temperature is shown only as a simple focused/more-varied note in the Sampling interaction.
