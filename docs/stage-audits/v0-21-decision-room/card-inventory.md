# Decision Room Card Inventory v0.21

Date: 2026-06-06

## Stage

- Stage number: 4
- Stage name: Decision Room
- Nav hint: One token is chosen
- Summary: The model scores and chooses one next token.
- Prompt moment: The model has processed the context and is choosing the next response token.
- Focus: How one next token is chosen.
- Key distinction: Probabilities are not truth guarantees.

## Current Order

The current app order matches the expected Decision Room set:

1. Logits
2. Softmax
3. Sampling

The cards are numbered 20-22 in the full Journey.

## Card 20: Logits

- Card id: `logits`
- Title: Logits
- Subtitle: Raw next-token scores
- Section/stage name: Decision Room
- One-sentence definition: Logits are raw scores for the next token before they become probabilities.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include richer fields such as `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, or `misconception`.
- Where it happens: They appear near the end of a forward pass, after the final hidden state is projected toward the vocabulary.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit as a dedicated field. Relationship says a forward pass produces logits for one next generated token.
- Why it matters: Logits show that the model has not chosen a token yet; it has scored candidates.
- How it connects: A forward pass over the current context produces logits for one next generated token.
- Metaphor: A scoreboard before the points are converted into odds.
- Brain Bridge: It can feel like considering options.
- Where the Brain Bridge breaks: The model is not weighing options with intent; logits are raw numerical scores.
- Misconception: Not explicit, but the card should target "logits are probabilities" and "logits are truth scores."
- Glossary chips / key terms: `logits`, `generated token`, `forward pass`, `hidden state`, `softmax`
- Visual aid id: `logits`
- Generated asset or coded visual type: coded SVG, current `LogitsSvg`
- Tiny interaction id or description: `softmax`; title "Compare raw candidates"; currently reuses the softmax funnel animation.
- Checkpoint question: Where do probabilities come from in this path?
- Correct answer: Softmax converts logits
- Incorrect answers: Training rewrites the weights; The model asks a database
- Feedback: Logits are raw scores; softmax turns them into probabilities.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Accurate but thin. It says raw scores before probabilities, but it does not show output head, vocabulary candidates, or "not truth."
- Conceptual sequence: Correct first card in Decision Room. It connects well to hidden states but needs a clearer bridge from the Workday stage.
- Mechanism clarity: Needs explicit "raw score bars, not probabilities yet." The current quiz tests softmax more than logits.
- Durable vs temporary clarity: Needs an explicit note that logits are temporary outputs of inference and do not update weights.
- Prompt vs response clarity: Should say logits are scores for the next response token, not for the whole answer.
- Probability/truth clarity: Should say raw score is not truth, confidence, or evidence.
- Metaphor quality: Scoreboard is useful. Limitation is good but should become more visible.
- Visual quality: Readable at 390px and 320px, but generic. It should show raw numerical scores, hidden state to output head, and candidate vocabulary.
- Tiny interaction quality: Weak. It reuses the softmax animation instead of letting learners identify raw scores.
- Checkpoint quality: Randomized and functional, but should ask what logits are or what they are not.
- UI polish: No duplicate Core idea heading. Key terms fit with collapse support. Bottom nav can cover the bottom of long screenshots, but controls remain reachable.

## Card 21: Softmax

- Card id: `softmax`
- Title: Softmax
- Subtitle: Scores become probabilities
- Section/stage name: Decision Room
- One-sentence definition: Softmax turns next-token raw scores into probabilities that sum to one.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include richer fields such as `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, or `misconception`.
- Where it happens: It sits between logits and sampling during a decoding step.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit as a dedicated field.
- Why it matters: Softmax makes scores comparable as a probability cloud over candidate tokens.
- How it connects: Softmax converts logits into probabilities; sampling then chooses one token from those probabilities.
- Metaphor: A funnel turning scoreboard points into odds.
- Brain Bridge: It resembles turning vague preferences into relative chances.
- Where the Brain Bridge breaks: The probabilities are mathematical outputs, not confidence, desire, or truth.
- Misconception: Not explicit, but the card should target "probability equals truth" and "softmax verifies facts."
- Glossary chips / key terms: `softmax`, `logits`, `decoding step`, `sampling`, `probability`
- Visual aid id: `softmax`
- Generated asset or coded visual type: coded SVG, current `SoftmaxSvg`
- Tiny interaction id or description: `softmax`; title "Shape the probability cloud"; segmented control shows focused, balanced, and wider candidate pools.
- Checkpoint question: What does softmax produce?
- Correct answer: Next-token probabilities
- Incorrect answers: Permanent memory; A whole essay
- Feedback: Softmax turns raw next-token scores into a probability distribution.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Good short definition, but not enough for a smart non-specialist to see the transformation.
- Conceptual sequence: Correctly follows Logits and precedes Sampling.
- Mechanism clarity: Needs before/after values and an explicit "probabilities sum to one." The current funnel does not show normalization.
- Durable vs temporary clarity: Needs to say softmax is temporary inference math, not training.
- Prompt vs response clarity: Should say these probabilities are for candidate next response tokens.
- Probability/truth clarity: Brain Bridge limit says this well, but the core copy should also say likely under the model is not necessarily true.
- Metaphor quality: Funnel is understandable but risks feeling magical unless values are shown.
- Visual quality: Readable and calm. At 320px, labels remain legible, but the diagram is too generic.
- Tiny interaction quality: Better than Logits, but still a little decorative. It changes distribution shape without asking the learner to prove what softmax did.
- Checkpoint quality: Clear and randomized. Incorrect options are plausible enough, though "confidence/truth" would be a stronger misconception target.
- UI polish: No chip overflow at 320px in spot check.

## Card 22: Sampling

- Card id: `sampling`
- Title: Sampling
- Subtitle: One next token is chosen
- Section/stage name: Decision Room
- One-sentence definition: Sampling chooses one next token for the response from the probability cloud.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include richer fields such as `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, or `misconception`.
- Where it happens: It happens after softmax in the decoding step.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit as a dedicated field. The quiz explains that the selected response token is appended to context.
- Why it matters: Sampling explains why the same prompt can sometimes produce different good responses.
- How it connects: Temperature, top-k, and top-p shape the candidate pool before the chosen response token is appended to the context.
- Metaphor: Choosing from a weighted bowl of possible next tokens.
- Brain Bridge: It can resemble choosing a word while speaking.
- Where the Brain Bridge breaks: The model is not choosing with intention; a decoding rule selects from probabilities.
- Misconception: Not explicit, but the card should target "the whole answer is chosen at once" and "sampling is learning."
- Glossary chips / key terms: `sampling`, `generated token`, `decoding step`, `response tokens`, `temperature`, `top-k`, `top-p`
- Visual aid id: `sampling`
- Generated asset or coded visual type: coded SVG, current `SamplingSvg`
- Tiny interaction id or description: `sampling`; title "Choose from the cloud"; token chips show a current pick.
- Checkpoint question: When the model chooses one token, what happens next?
- Correct answer: The token is appended and the model runs again
- Incorrect answers: The model writes the whole response at once; The model permanently learns the token
- Feedback: The selected response token becomes part of the context for the next forward pass.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Stronger than the first two cards because it connects to append-and-repeat.
- Conceptual sequence: Correct final card in Decision Room. It prepares for The Day Repeats, but should make the boundary clearer: Sampling chooses; Autoregression repeats.
- Mechanism clarity: Needs visible probabilities and a selected token. Temperature can be introduced only as a simple focus/variety control.
- Durable vs temporary clarity: Needs an explicit no-weight-update note.
- Prompt vs response clarity: Good in the checkpoint. Add it to core copy.
- Probability/truth clarity: Should say a sampled likely token can still be unsupported or wrong.
- Metaphor quality: Weighted bowl works. Brain Bridge limitation is helpful.
- Visual quality: Calm and readable, but the selection path is abstract and does not show probabilities.
- Tiny interaction quality: Most appropriate interaction in the stage, but it is still too easy and does not show why one token is more likely than another.
- Checkpoint quality: Good misconception target and randomized. Feedback is specific.
- UI polish: Seven key terms collapse correctly. Top-k and top-p may be too much this early unless glossary/drawer support remains strong.
