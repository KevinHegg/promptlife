# Decision Room Recommendations v0.21

Date: 2026-06-06

## Top Five Content Problems

1. The Decision Room cards still use the older slim lesson schema. They lack explicit `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, and `misconception` fields.
2. Logits does not sufficiently teach its own concept. Its checkpoint asks where probabilities come from, which shifts the focus to Softmax.
3. Probability versus truth is a stage objective, but it is mostly confined to the stage key distinction and Softmax Brain Bridge. It should appear directly in Logits, Softmax, and Sampling copy.
4. Sampling introduces `temperature`, `top-k`, and `top-p` in the key terms and relationship line before learners have much scaffolding for decoding settings.
5. The stage needs a clearer Workday-to-Decision-Room bridge: final hidden states feed an output head that creates vocabulary logits.

## Top Five Visual/UI Problems

1. Logits visual is readable but too generic. It shows bars, but not hidden state to output head to vocabulary scores.
2. Softmax visual is readable but too magical. It does not show raw scores being normalized into probabilities that sum to one.
3. Sampling visual does not show probability weights, so "weighted bowl" is more in the text than the diagram.
4. Logits and Softmax tiny interactions overlap because Logits reuses the `softmax` animation.
5. Current Decision Room visuals do not use the richer DiagramKit callout pattern used by newer cards, so nuance lives outside the diagram.

## Which Cards Need More Explanation

- Logits: needs more explanation of output head, raw scores, vocabulary candidates, and not-probability-yet.
- Softmax: needs more explanation of normalization, sum-to-one probabilities, and likely-under-the-model versus true.
- Sampling: needs a little more explanation of one response token, variability, and why the loop repeats.

## Which Cards Need Less Explanation

- Sampling should reduce or defer top-k and top-p in the main line. Keep them as glossary terms or an optional deep note.
- None of the cards should add formulas in the MVP implementation pass.

## Which Cards Need Better Visuals

- Highest priority: Softmax.
- Next priority: Logits.
- Medium priority: Sampling.

## Which Cards Need Tiny Interactions

- Logits: needs its own `tap-choice` or `toggle-state` interaction for raw scores versus probabilities.
- Softmax: needs a `toggle-state` interaction showing raw scores changing into probabilities that sum to one.
- Sampling: keep a simple `next-token-pick`, optionally with a very simple temperature toggle if it remains nontechnical.

## More Than One Checkpoint Or Exercise

- No Decision Room card needs more than one checkpoint in Journey.
- Sampling may connect to the existing `pick-next-token` exercise, but the Journey card only needs one tiny interaction plus one checkpoint.
- Softmax can reuse `softmax-funnel` as a Play/exercise surface if the Journey interaction is strengthened.

## Which Cards Should Remain Simple

- Softmax should remain formula-free. Teach input scores, output probabilities, and sum-to-one.
- Sampling should keep temperature as "more focused / more varied" if included, and defer top-k/top-p detail.
- Logits should not become a vocabulary-matrix lecture. One hidden-state to raw-score diagram is enough.

## Redundancies To Remove

- Remove Logits' reuse of the Softmax tiny interaction.
- Avoid repeating "probability cloud" in Softmax and Sampling without showing different roles. Softmax creates the cloud; Sampling chooses from it.
- Avoid making Sampling and Autoregression both teach "append and repeat" as the main concept. Sampling chooses one token; Autoregression repeats the run.

## Image 2 Textless PNG Assets

No Image 2 asset is recommended for the Decision Room implementation pass.

These concepts require exact labels, bars, probabilities, and token choices. Generated PNG assets would be decorative unless used only as atmosphere, and the current stage needs mechanism clarity first.

## Coded SVG Recommendations

- Logits: coded SVG. Show final hidden state, output head, vocabulary candidates, and raw score bars.
- Softmax: coded SVG. Show raw score bars flowing into probability bars that sum to 100%.
- Sampling: coded SVG/HTML. Show a weighted probability list, a selected token, and an append arrow.

## CSS 3D Recommendations

- No CSS 3D is needed for Decision Room v0.21 implementation.
- A rotatable object would not teach logits, softmax, or sampling better than simple coded diagrams.

## Current Visuals To Keep

- Keep the ZenTron Origami visual frame.
- Keep the basic bar idea for Logits, but add raw values and upstream/downstream labels.
- Keep the funnel motif for Softmax only if before/after numeric mapping is added.
- Keep Sampling's token cloud idea, but add probability weights and clearer selected-token behavior.

## Specific Decision Room Questions

1. Are Logits, Softmax, and Sampling clearly distinct? Mostly in text, but not enough in interactions. Logits and Softmax overlap because Logits reuses Softmax's interaction.
2. Does the stage make clear that probabilities are not truth? The stage key distinction does, and Softmax's Brain Bridge limit does, but the individual cards should repeat this in core copy and feedback.
3. Does Sampling overlap too much with Autoregression, or are their roles distinct? The order is correct. The implementation should keep Sampling as "choose one token" and Autoregression as "append and repeat."
4. Should temperature/top-k/top-p appear here, later, or only in glossary? Temperature can appear here as a simple focus/variety toggle. Top-k and top-p should stay in the glossary or an optional deep note until later.
5. Which visual most needs repair? Softmax, because the current funnel does not show normalization or sum-to-one probabilities.
6. Which card most needs a tiny interaction? Logits, because it currently borrows Softmax's interaction.
7. Are any Decision Room cards too technical for the audience? Not yet, but top-k/top-p can become too technical if expanded in the main card.
8. Are any cards out of order? No. Logits, Softmax, Sampling is the correct order.
9. Is any Image 2 asset justified, or should all visuals remain coded? All should remain coded for now.
10. Does the stage prepare learners for The Day Repeats? Partly. Sampling's checkpoint does; the next implementation should strengthen this bridge.

## Card-Level Strategy

| Card | Recommendation | Priority | Suggested visual | Suggested interaction |
| --- | --- | --- | --- | --- |
| Logits | Revise. Keep concept, strengthen raw-score identity. | High | Coded SVG | `tap-choice` or `toggle-state` |
| Softmax | Revise. Show normalization directly. | High | Coded SVG | `toggle-state` raw scores to probabilities |
| Sampling | Revise lightly. Keep simple and distinct from autoregression. | Medium | Coded SVG/HTML | `next-token-pick` with optional simple temperature toggle |

## Recommended Next Implementation Prompt

Implement a v0.21.1 Decision Room repair pass. Do not add new Journey cards, games, generated PNG assets, heavy 3D libraries, progress-rule changes, checkpoint-randomization changes, Glossary Dojo changes, or extra badges. Keep the Decision Room order: Logits, Softmax, Sampling. Convert these three cards from the older slim schema to the richer lesson architecture by adding explicit core explanation, model lifecycle, durable-vs-temporary, prompt-vs-response/current-context notes, misconceptions, and clearer feedback. Update coded visuals so Logits shows final hidden state to output head to raw vocabulary score bars, Softmax shows raw scores becoming probabilities that sum to one, and Sampling shows one token chosen from weighted probabilities. Give Logits its own raw-score interaction, make Softmax a raw-to-probability toggle, and keep Sampling as a simple next-token pick with at most one simple temperature/focus toggle. Make probability-not-truth explicit on all three cards. Run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.
