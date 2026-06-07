# Workday Card Inventory v0.20

Date: 2026-06-06

## Stage

- Stage number: 3
- Stage name: Workday
- Nav hint: Layers process context
- Summary: Transformer layers process the current context.
- Prompt moment: The prompt is inside the model, being reshaped by repeated transformer layers.
- Focus: How transformer layers process the current context.
- Key distinction: Attention is relevance, not awareness.

## Current Order

The current app order matches the expected Workday set:

1. Attention
2. MLP
3. Layers
4. Hidden States

The cards are numbered 16-19 in the full Journey.

## Card 16: Attention

- Card id: `attention`
- Title: Attention
- Subtitle: Weighted relevance between positions
- Section/stage name: Workday
- One-sentence definition: Attention assigns weighted relevance between token positions.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include the richer Morning Commute-style `coreExplanation` field.
- Where it happens: It happens inside transformer layers during a forward pass.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: During inference, attention operates over token positions in the current context, including prompt tokens and earlier generated response tokens.
- Why it matters: Attention lets one token position use information from other visible token positions in the current context.
- How it connects: During inference, attention operates over token positions in the current context, including prompt tokens and earlier generated response tokens.
- Metaphor: Spotlights showing which earlier tokens are useful right now.
- Brain Bridge: The word attention is useful because some parts of the context matter more than others.
- Where the Brain Bridge breaks: It is not human attention, awareness, desire, or focus. It is weighted relevance in a computation.
- Misconception: Not explicit in current card data, but the content targets "attention is awareness."
- Glossary chips / key terms: `attention`, `input context`, `prompt tokens`, `response tokens`, `hidden state`, `layer`
- Visual aid id: `attention`
- Generated asset or coded visual type: coded SVG, current `AttentionSvg`
- Tiny interaction id or description: `attention`; title "Move the spotlight"; copy says attention is not human awareness and is weighted relevance between token positions.
- Exercise mapping: `attention-relevance`, connect-nodes exercise in Play/Exercise system.
- Checkpoint question: Which tokens can attention look across during inference?
- Correct answer: Tokens currently in the context window
- Incorrect answers: All text the model has ever seen; Only the newest generated token
- Feedback: Attention operates over the current context. It does not browse all training data.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Good non-anthropomorphic definition, but too thin for the first inside-layer mechanism after tensors.
- Mechanism clarity: Needs to show actual token-to-token relationships. The current coded visual uses generic `t1`-`t6` nodes and two arcs; it communicates "arcs exist" more than "this token uses that token."
- Durable vs temporary clarity: Needs an explicit note that attention uses learned weights but creates temporary relevance patterns/activations during the forward pass.
- Prompt vs response clarity: Present in the relationship line, but should also mention retrieved context and response-so-far as part of current context.
- Metaphor quality: Spotlight is useful but should keep the limit visible.
- UI polish: Key terms collapse works; six chips can require "Show all terms" at 390px. No white text on light background observed.
- Awkward/repeated text: No duplicate "Core idea" heading issue. The visual title "Attention Weave" is attractive but does not yet teach exact relevance weights.

## Card 17: MLP

- Card id: `mlp`
- Title: MLP
- Subtitle: Feature reshaping per token
- Section/stage name: Workday
- One-sentence definition: An MLP is a feed-forward network that reshapes each token position's feature vector.
- Core explanation: The current card uses the definition as the core explanation. It does not yet explain "multi-layer perceptron" in learner-facing terms.
- Where it happens: It appears inside transformer layers, usually after attention has mixed information across positions.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit in current card data.
- Why it matters: The MLP helps turn mixed context into more useful per-token features for later layers.
- How it connects: During a forward pass over the current context, attention mixes information across positions and the MLP reshapes features within each position.
- Metaphor: A forge that bends each token vector into a more useful shape.
- Brain Bridge: It is somewhat like a small processing step after noticing relevant context.
- Where the Brain Bridge breaks: The MLP is not a neuron with feelings or beliefs; it is a learned function applied to vectors.
- Misconception: Not explicit in current card data, but the content targets "MLP chooses the answer" or "MLP reads files."
- Glossary chips / key terms: `MLP`, `input context`, `hidden state`, `attention`
- Visual aid id: `mlp`
- Generated asset or coded visual type: coded SVG, current `MlpSvg`
- Tiny interaction id or description: `mlp`; title "Reshape the token features"; copy says the same token can become food-ish, animal-ish, or command-ish depending on context.
- Exercise mapping: `mlp-feature-reshape`, toggle-state exercise.
- Checkpoint question: What does the MLP mainly do here?
- Correct answer: Reshapes per-token features
- Incorrect answers: Reads private files; Chooses the final answer directly
- Feedback: MLPs transform token feature vectors after attention has mixed contextual information.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Needs a stronger definition of MLP as "multi-layer perceptron" and feed-forward/per-token feature reshaping.
- Mechanism clarity: Current visual uses gears between "token" and "features"; this can look like a decorative mystery machine. It does not show no cross-token mixing.
- Durable vs temporary clarity: Needs to distinguish durable MLP weights from temporary hidden-state activations.
- Prompt vs response clarity: Needs to say the same operation applies over current-context positions, whether they came from prompt, retrieved text, or response-so-far.
- Metaphor quality: Forge is useful but can imply intention or craft; keep the function/vector limit explicit.
- UI polish: Four chips fit well at 320px. No chip overflow observed.
- Awkward/repeated text: The acronym appears before the expansion. The visual does not currently explain "multi-layer perceptron."

## Card 18: Layers

- Card id: `layers`
- Title: Layers
- Subtitle: Repeated refinement
- Section/stage name: Workday
- One-sentence definition: A transformer layer is a repeated block that usually combines attention, MLP feature reshaping, residual paths, and normalization.
- Core explanation: The current card uses the definition as the core explanation.
- Where it happens: Layers are stacked inside the model between embeddings and next-token scores.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit in current card data.
- Why it matters: Repeated layers let simple starting vectors become richer, context-shaped hidden states.
- How it connects: Each layer refines hidden states while residual paths help useful information carry forward.
- Metaphor: A series of editing passes where each pass can revise but also preserve the draft.
- Brain Bridge: The stack can feel like stages of processing.
- Where the Brain Bridge breaks: The layers do not form a human-like chain of thought; they update numerical states.
- Misconception: Not explicit in current card data, but the content targets "layers are human thought steps."
- Glossary chips / key terms: `layer`, `attention`, `MLP`, `hidden state`
- Visual aid id: `layers`
- Generated asset or coded visual type: coded SVG, current `LayersSvg`
- Tiny interaction id or description: `cloud`; title "Pass through the stack"; copy says layer after layer, temporary vectors become more context-shaped.
- Exercise mapping: no dedicated lesson exercise; no `lessonExerciseIds.layers` entry exists.
- Checkpoint question: What do layers repeatedly refine?
- Correct answer: Hidden states
- Incorrect answers: Permanent user memory; The app interface
- Feedback: Layers update temporary internal vectors during inference.
- Current recommendation status if review metadata exists: `defer` by current `getReviewAction`.

### Audit Notes

- Content clarity: The card is accurate but compressed. Residual paths and normalization appear before they are explained; that may be too graduate-level unless the visual keeps them secondary.
- Mechanism clarity: Needs to show repeated attention-plus-MLP blocks refining hidden states, not just a stack of rectangles.
- Durable vs temporary clarity: Needs explicit fixed-weights versus temporary hidden-state updates during inference.
- Prompt vs response clarity: Needs to connect layers to the whole current context and one next-token scoring path.
- Metaphor quality: Editing passes are helpful. The limitation correctly avoids chain-of-thought anthropomorphism.
- UI polish: Four chips fit well. Current tiny interaction falls back to the generic feature cloud because `cloud` is not a Workday-specific interaction type.
- Awkward/repeated text: The current visual label "carry forward" is useful but too vague without callouts.

## Card 19: Hidden States

- Card id: `hidden-states`
- Title: Hidden States
- Subtitle: Temporary contextual vectors
- Section/stage name: Workday
- One-sentence definition: A hidden state is the model's temporary internal context-shaped vector for a token at a given layer.
- Core explanation: The current card uses the definition as the core explanation.
- Where it happens: Hidden states appear during the forward pass after embeddings enter the layer stack.
- Durable vs temporary note: Not explicit as a dedicated row, though the definition and Brain Bridge say temporary.
- Prompt vs response note: Not explicit in current card data.
- Why it matters: They are where the prompt's context changes the token representation before the model scores possible next tokens.
- How it connects: Hidden states are created while processing the current context during a forward pass; they are not the visible response.
- Metaphor: A scratchpad of numbers that changes while the prompt is being processed.
- Brain Bridge: Hidden state can resemble temporary working memory.
- Where the Brain Bridge breaks: It is not permanent memory, consciousness, or private English text; it is a temporary vector.
- Misconception: Not explicit in current card data, but the content targets "hidden state is secret memory or encrypted English."
- Glossary chips / key terms: `hidden state`, `input context`, `forward pass`, `embedding`, `layer`, `inference`
- Visual aid id: `hidden-states`
- Generated asset or coded visual type: coded SVG, current `HiddenSvg`
- Tiny interaction id or description: `hidden`; title "Watch temporary state move"; copy says hidden states exist for this run and are not permanent memory.
- Exercise mapping: currently maps to `mlp-feature-reshape`, which is more MLP-focused than hidden-state-specific.
- Checkpoint question: Why is it called hidden state?
- Correct answer: It is internal numbers, not visible text
- Incorrect answers: It is encrypted English; It is a secret memory file
- Feedback: Hidden means inside the model's working representation.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: This is the most abstract card in Workday. It needs more explanation, especially the difference between embedding and hidden state.
- Mechanism clarity: Current visual shows embedding to temp shape, but does not show context shaping over layers.
- Durable vs temporary clarity: The word temporary is strong in title/definition, but should become a dedicated detail row.
- Prompt vs response clarity: Needs to say hidden states are created for every token position in current context, including prompt, retrieved context, and response-so-far.
- Metaphor quality: Scratchpad and working memory are useful if the limitation stays prominent.
- UI polish: Six chips collapse at 390px. No chip overflow at 320px in spot checks.
- Awkward/repeated text: The current exercise mapping reuses `mlp-feature-reshape`, which could make Hidden States feel like a repeat of MLP.
