# Tiny Interaction Plan v0.20.1

Date: 2026-06-06

## Goal

Give each Workday card one small, non-competitive action that targets the most likely misconception. The interactions reinforce the Journey card without changing Journey progress rules, badge logic, checkpoint randomization, or Play games.

## Implemented Interactions

| Card | Interaction | Learner action | Misconception targeted | Feedback pattern |
| --- | --- | --- | --- | --- |
| Attention | Connect the pronoun | Tap the earlier token that helps interpret "it" in "The dog chased the cat because it hissed." | Attention is human awareness or a general spotlight. | Correct feedback says attention weights "cat" as more relevant in this context. Wrong feedback says "dog" could matter elsewhere, but "hissed" points to "cat." |
| MLP | Before and after MLP | Toggle the same token position before and after MLP feature reshaping, then answer what changed. | MLP mixes token positions or directly chooses the answer. | Correct feedback says the same token position's features were reshaped. Wrong feedback says attention did the cross-token mixing first. |
| Layers | Inspect the stack | Tap layer steps to inspect repeated attention-plus-MLP refinement. | Layers are human thought steps or permanent memory updates. | Feedback says each layer refines temporary hidden states with fixed learned weights. |
| Hidden States | Durable or temporary? | Sort model parts into Durable, Temporary, or Not in this forward pass. | Hidden states are stored memories, encrypted text, or durable weights. | Correct feedback says hidden states are temporary internal vectors shaped by current context. Wrong feedback points back to the durable vs temporary distinction. |

## Deferred Ideas

- Attention could later add a two-sentence contrast where the same pronoun points to a different token in a new context.
- MLP could later show two contexts for the same token, but the current toggle is enough for v0.20.1.
- Layers could later become a lightweight CSS 3D inspectable stack. No heavy 3D library is justified.
- Hidden States could later add a comparison between embedding vector and final hidden state, but the current sort already repairs the biggest misconception.
