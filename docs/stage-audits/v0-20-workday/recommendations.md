# Workday Recommendations v0.20

Date: 2026-06-06

## Top Five Content Problems

1. The Workday cards still use the older slim lesson schema. They lack explicit `coreExplanation`, `durableVsTemporary`, `promptVsResponseNote`, `stageType`, and `misconception` fields that the newer Morning Commute cards now use.
2. MLP needs the strongest definition repair. "Multi-layer perceptron" is not expanded, and the card does not clearly separate per-token feature reshaping from attention's cross-token mixing.
3. Hidden States is the most abstract card. It says "temporary contextual vectors," but it needs a clearer comparison with embeddings, weights, visible response text, and memory.
4. Layers introduces residual paths and normalization without scaffolding. That may be too graduate-level unless the next pass uses brief labels and callouts.
5. Prompt/current-context continuity needs reinforcement. The stage should say that prompt tokens, retrieved context, prior conversation, and response-so-far can all be inside the current context when layers run.

## Top Five Visual/UI Problems

1. Attention is visually attractive but too generic. `t1`-`t6` nodes do not show a learner why one token relates to another.
2. MLP looks like gears in a black box. It needs to show same token position, before/after features, and no cross-token mixing.
3. Layers is a stack, but the current visual does not show repeated attention-plus-MLP blocks or hidden-state refinement.
4. Hidden States shows an embedding becoming a temporary shape, but not how context changes the vector over layers.
5. The visual aids do not use DiagramKit callouts yet for Workday, so the explanation is thinner than the newer Morning Commute visuals.

## Which Cards Need More Explanation

- Attention: more explanation of current-context scope and temporary relevance weights.
- MLP: more explanation of the acronym, feed-forward network, and per-token operation.
- Layers: more explanation of repeated blocks, fixed weights, temporary updates, and why residual/normalization detail should stay secondary.
- Hidden States: more explanation of embedding versus hidden state versus memory.

## Which Cards Need Less Explanation

- None need less explanation overall. The next pass should keep the prose concise, but all four need clearer mechanism scaffolding.

## Which Cards Need Better Visuals

- Highest priority: MLP and Hidden States.
- Next priority: Attention.
- Medium priority: Layers.

## Which Cards Need Tiny Interactions

- Attention: replace or supplement the current animation with a `connect-nodes` interaction using a real sentence. Learner identifies which token `it` depends on.
- MLP: use a `toggle-state` interaction showing the same token vector before and after MLP in two contexts, with a note that MLP does not mix positions.
- Layers: use a stack/step or light `rotate / inspect 3D object` interaction to inspect repeated transformer blocks.
- Hidden States: use `sort-buckets` for embedding, hidden state, memory, and weight; or a `toggle-state` view that compares starting vector versus context-shaped vector.

## More Than One Checkpoint Or Exercise

- Hidden States is the only card that may justify more than one practice surface: one tiny interaction for embedding-vs-hidden-state, plus the checkpoint for hidden-not-visible/memory misconception.
- Attention already has a Play/Exercise system mapping (`attention-relevance`), but the Journey card itself should make the same idea visible.
- Layers should remain simple; one interaction plus one checkpoint is enough.

## Which Cards Should Remain Simple

- Layers should remain simple. Do not turn it into a full transformer architecture course.
- Attention should keep the core idea "weighted relevance between token positions" and avoid math-heavy attention-score formulas.

## Redundancies To Remove

- Hidden States currently reuses the `mlp-feature-reshape` exercise mapping, which can make it feel redundant with MLP. Give Hidden States its own sort/toggle interaction in the later implementation pass.
- The current Workday visuals all use the same "What to picture" shell with thin captions. Keep the shell, but make each diagram's teaching job more distinct.

## Image 2 Textless PNG Assets

No Workday card needs an Image 2 asset for the next implementation pass. Labels and relationships matter too much here.

Optional later candidates:

- Hidden States could use a textless atmospheric generated image showing a temporary glowing vector changing shape across layered paper, but only if labels, callouts, alt text, and captions remain in HTML/SVG.
- Layers could use a textless folded-paper stack as atmosphere, but CSS/SVG is better for the instructional version.

## Coded SVG Recommendations

- Attention: coded SVG. It needs precise token labels, arcs, and weights.
- MLP: coded SVG. It needs before/after feature labels and an explicit "same token position" structure.
- Hidden States: coded SVG or hybrid. It needs labels distinguishing embedding, hidden state, weight, and memory.

## CSS 3D Recommendations

- Layers: best CSS 3D candidate. A lightweight, dependency-free stack could let learners inspect repeated transformer blocks without adding a heavy 3D library.

## Current Visuals To Keep

- Keep the general ZenTron Origami frame and short SVG labels.
- Keep Attention's arcs as a motif, but replace generic node labels with a concrete sentence.
- Keep MLP's transformation direction, but replace decorative gears with a clearer feature-reshaping diagram.
- Keep Layers as a stack concept, but show repeated block structure.
- Keep Hidden States' embedding-to-temporary-state direction, but add context/layer shaping.

## Specific Workday Questions

1. Is Attention clear without anthropomorphism? Mostly. The copy says attention is relevance, not awareness. The visual should reinforce that by showing weights/relationships rather than a human spotlight metaphor alone.
2. Does MLP need a stronger definition of "multi-layer perceptron"? Yes. This is the highest-priority definition repair.
3. Should Layers come before or after Hidden States? Before Hidden States. Current order is correct because Layers explains the repeated process that creates/refines hidden states.
4. Is Hidden States too abstract for this point in the Journey? It is abstract but belongs here. It needs better scaffolding, not removal.
5. Are Attention and Hidden States overlapping too much? Slightly. Attention explains one operation over positions; Hidden States should explain the temporary vector result after layer processing. The next pass should make that boundary explicit.
6. Which card most needs a better visual? MLP, followed closely by Hidden States.
7. Which card most needs a better tiny interaction? Hidden States, because the current exercise mapping points to MLP Feature Reshape.
8. Which visuals must stay coded because labels matter? Attention, MLP, and Hidden States. Layers can be coded or CSS 3D.
9. Is any Image 2 asset justified in this stage? Not for the next pass. Hidden States is an optional later atmosphere candidate only.
10. Are any Workday cards out of order? No.

## Card-Level Strategy

| Card | Recommendation | Priority | Suggested visual | Suggested interaction |
| --- | --- | --- | --- | --- |
| Attention | Revise. Keep concept, strengthen concrete token relationships. | Medium-high | Coded SVG | `connect-nodes` |
| MLP | Revise strongly. Expand acronym and show per-token feature reshaping. | High | Coded SVG | `toggle-state` |
| Layers | Revise lightly to moderately. Keep order and simplicity. | Medium | CSS 3D or coded SVG | stack/inspect |
| Hidden States | Revise strongly. Separate from embeddings, weights, memory, and visible text. | High | Coded SVG / hybrid | `sort-buckets` or `toggle-state` |

## Recommended Next Implementation Prompt

Implement a v0.20.1 Workday visual/interaction repair pass. Do not add new Journey cards, games, generated PNGs, heavy 3D libraries, progress-rule changes, checkpoint-randomization changes, or extra badges. Keep the Workday order: Attention, MLP, Layers, Hidden States. Convert these four cards from the older slim schema to the richer lesson architecture by adding explicit core explanation, model lifecycle, durable-vs-temporary, prompt-vs-response/current-context notes, misconceptions, and clearer feedback. Update coded visuals so Attention uses a concrete token relationship, MLP shows per-token feature reshaping after attention, Layers shows repeated attention-plus-MLP blocks, and Hidden States contrasts embedding with temporary context-shaped hidden state. Add or revise tiny interactions using connect-nodes for Attention, toggle-state for MLP, lightweight stack inspect for Layers, and sort-buckets or toggle-state for Hidden States. Run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.
