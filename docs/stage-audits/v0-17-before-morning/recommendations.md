# Before Morning Recommendations v0.17

Date: 2026-06-05

## Stage-Level Finding

Before Morning is the right opening stage. It answers the needed question: what had to happen before the user's prompt arrived? The stage already teaches the most important durable/temporary distinction: training and fine-tuning can change weights; ordinary inference later uses those weights. The next implementation pass should keep the order mostly intact, reduce duplicated UI text, strengthen a few visuals, and make tiny interactions more diagnostic.

Do not add additional badges. The only badge path should remain `Prompt Life: Model Literate`.

v0.17.2 update: add `Where LLMs Fit` after `What Is an LLM?` and before `Rationalists vs Empiricists`. Keep it coded SVG/HTML, not an Image 2 PNG candidate. This resolves part of the abstraction problem by giving learners a simple AI topology before the history side-tour.

v0.17.3 update: integrate the four provided textless generated PNGs for `What Is an LLM?`, `Pretraining`, `Fine-Tuning`, and `Alignment`. Keep all instructional labels, captions, callouts, key takeaways, and accessibility text in app code.

## Top Five Content Problems

1. "What Is an LLM?" is accurate but risks sounding too small if "next-token prediction" is not paired with a concrete prompt-to-token trace.
2. "Rationalists vs Empiricists" is useful but abstract; high-school and first-year users may need a clearer reason why this history matters before training.
3. "Training" and "Pretraining" are separate for good reasons, but their current tiny interactions both use the training loop and can feel repetitive.
4. "Fine-Tuning" needs a more active contrast with prompting and RAG so learners do not treat every customization as durable learning.
5. "Alignment" is conceptually important but dense. It names many mechanisms in one paragraph and may need visual grouping rather than more prose.

## Top Five Visual/UI Problems

1. All lesson cards repeat `CORE IDEA` as a pill and `Core idea` as the immediate heading. Keep the pill; remove or replace the duplicate heading later.
2. Some diagrams use too much in-diagram text for mobile. The style guide says no mini-posters; labels should be short and explanations should stay in HTML callouts.
3. The bottom nav can sit close to lower lesson panels, especially on dense core screenshots at 320px. The nav is improved, but dense sections still need extra bottom breathing room.
4. Training, Pretraining, and several interactions reuse similar loop visuals, making the first stage feel visually repetitive.
5. Alignment is readable but visually complex; the guardrail landscape needs stronger hierarchy between durable training, runtime safeguards, policy, and evaluation.

## Card-Level Recommendations

| Card | Recommendation | Content priority | Visual priority | Interaction priority | Notes |
|---|---|---:|---:|---:|---|
| What Is an LLM? | Revise lightly | High | High | Medium | Keep concise but add a one-prompt trace so next-token prediction feels powerful, not trivial. |
| Where LLMs Fit | Keep | Medium | Medium | Medium | New Essential topology card. Keep sparse and coded; do not turn it into a dense poster. |
| Rationalists vs Empiricists | Revise / optional side-tour | Medium | Medium | Low | Keep as Deep/side-tour after the topology card. It may be too abstract for the required path. |
| Training | Keep | Medium | Medium | Medium | Strong essential card. Emphasize loss and weight update as the durable step. |
| Pretraining | Revise | Medium | High | Medium | Keep separate from Training, but make the scale and "not perfect recall" distinction more concrete. |
| Overfitting and Generalization | Keep as Deep | Medium | Medium | Medium | Valuable, but not essential for the shortest path unless v1 wants a memorization checkpoint early. |
| Fine-Tuning | Revise lightly | High | High | High | Needs an interaction contrasting fine-tuning with prompting/RAG/current context. |
| Alignment | Revise lightly | High | High | High | Keep the nuance, but reduce text density through visual grouping and a targeted misconception check. |

## Explanation Balance

- Needs more explanation: What Is an LLM?, Pretraining, Fine-Tuning, Alignment.
- Needs less explanation: Alignment should not get longer; it should get better structured. Rationalists vs Empiricists may need less historical framing if kept in the main flow.
- Should remain simple: Training. It is one of the clearest cards and should stay focused on durable weight updates.
- Needs more than one checkpoint/exercise: Alignment can justify one tiny interaction plus one misconception check plus one checkpoint. Fine-Tuning may need one contrast interaction plus the existing checkpoint.
- Should not become a worksheet: What Is an LLM?, Training, Pretraining. One strong visual/tiny interaction plus one checkpoint is enough.

## Recommended Visual Strategies

| Card | Recommended visual type | Image 2 textless PNG? | Coded SVG? | CSS 3D? | Keep current? |
|---|---|---|---|---|---|
| What Is an LLM? | Hybrid | Yes | Optional overlay | Optional feature cloud later | Revise current |
| Rationalists vs Empiricists | Coded SVG split-screen | No | Yes | No | Keep/rework current |
| Training | Coded SVG loop | No | Yes | No | Keep current with polish |
| Pretraining | Generated PNG plus HTML callouts | Yes | Optional overlay | No | Revise current |
| Overfitting and Generalization | Coded SVG plot | No | Yes | No | Keep current with polish |
| Fine-Tuning | Hybrid | Yes | Yes overlays | No | Revise current |
| Alignment | Hybrid / generated PNG plus SVG overlays | Yes | Yes overlays | No | Revise current |

Integrated v0.17.3 generated assets:

- What Is an LLM?: `before-morning-llm-cloud.png`, a textless origami/neon model cloud turning a prompt ribbon into one outgoing token-like bead.
- Pretraining: `before-morning-pretraining-landscape.png`, a textless folded-paper landscape shaped by many abstract streams.
- Fine-Tuning: `before-morning-finetuning-path.png`, a textless highlighted path through a pretrained terrain.
- Alignment: `before-morning-alignment-garden.png`, a textless garden with guardrails, compass-like guidance, and warning zones.

Coded SVG candidates:

- Rationalists vs Empiricists: rulebook/flowchart versus learned landscape, with a small bridge.
- Training: prediction, compare, loss, update weights, repeat.
- Overfitting and Generalization: overfit curve versus smoother generalizing curve with held-out examples.
- Fine-Tuning: SVG overlays/callouts over a textless or hybrid terrain.
- Alignment: SVG overlays/callouts over a textless landscape.

CSS 3D recommendation:

- No Before Morning card urgently needs CSS 3D. A future What Is an LLM? feature-cloud object could use CSS 3D if it reveals structure, but it should not become spectacle.

Current visuals to keep:

- Training Loop: keep as coded SVG with minor hierarchy polish.
- Overfitting vs Generalization: keep as coded SVG; it teaches the concept directly.
- Rationalists vs Empiricists: keep as a coded split-screen, but simplify labels if possible.

## Recommended Tiny Interactions

| Card | Recommendation | Suggested interaction type |
|---|---|---|
| What Is an LLM? | One tiny visual interaction plus checkpoint | tap-choice or next-token-pick |
| Rationalists vs Empiricists | Optional; do not overwork | tap-choice |
| Training | Keep one tiny interaction plus checkpoint | toggle-state or tap-choice |
| Pretraining | One tiny interaction plus checkpoint | tap-choice or toggle-state |
| Overfitting and Generalization | One visual interaction plus checkpoint | tap-choice or simple curve compare |
| Fine-Tuning | Add contrast interaction | sort-buckets or tap-choice |
| Alignment | Add misconception check | tap-multiple or sort-buckets |

Specific future interaction ideas:

- What Is an LLM?: tap the next-token step in a prompt trace: context, weights, logits, probability, sampled token.
- Training: toggle Training versus Inference and show whether "Update weights" is allowed.
- Pretraining: tap broad data streams and see that they update weights, not chat memory.
- Fine-Tuning: sort "one prompt", "retrieved PDF", "adapter weights", "instruction-tuning examples" into temporary context versus durable behavior change.
- Alignment: tap-multiple: choose which statements are true. Correct options should include "shapes behavior" and "can use training plus runtime safeguards"; wrong options should include "creates conscience" and "guarantees truth."

## Explicit Questions

1. Should "What Is an LLM?" be expanded or kept concise?
   - Keep it concise, but expand the visual trace. Add one concrete prompt-to-next-token path, not more abstract prose.

2. Is "Rationalists vs Empiricists" too abstract for high school / undergrad users?
   - It is abstract for a required opening path. Keep it as Deep/side-tour unless the next pass adds a very concrete "rulebook versus learned landscape" example.

3. Should "Training" and "Pretraining" be merged, or kept separate?
   - Keep separate. Training teaches the mechanism; Pretraining teaches scale and broad capability. Reduce repetition by giving Pretraining its own scale-focused visual.

4. Is "Overfitting and Generalization" essential or deep-path only?
   - Deep-path only for the shortest badge path, but important enough to keep in the stage. It is the best early antidote to "memorization equals intelligence."

5. Does "Fine-Tuning" need a tiny interaction that contrasts it with prompting?
   - Yes. This is the clearest missing interaction in the stage.

6. Does "Alignment" need more nuance or less text?
   - It needs the same nuance with less text per screen. Use visual grouping and a misconception check instead of a longer paragraph.

7. Are any of these seven cards out of order?
   - No major reorder needed. The current order is sensible: definition, historical distinction, training, pretraining, overfitting, fine-tuning, alignment. If simplifying for Essential path, Rationalists and Overfitting can remain Deep/side-tour cards.

8. Are the Brain Bridges helping or overloading the cards?
   - Mostly helping. The limitation lines are explicit and good. Alignment's Brain Bridge is especially important because it prevents moral-agency confusion. The main risk is cumulative density, not bad metaphor quality.

9. Which visuals are worth custom Image 2 assets?
   - Implemented in v0.17.3: What Is an LLM?, Pretraining, Fine-Tuning, and Alignment now use the provided textless generated PNG assets plus HTML callouts.

10. Which visuals should remain coded SVG?
   - Rationalists vs Empiricists, Training, and Overfitting and Generalization. Fine-Tuning and Alignment should use coded overlays even if a textless image becomes the base.

## Redundancies To Remove Later

- Remove duplicate `CORE IDEA` plus `Core idea` heading.
- Avoid repeating path labels inside individual card content. Keep path labels in Journey rows and filters.
- Avoid repeating "training loop" visuals for both Training and Pretraining without a clear scale distinction.
- Avoid repeating "not conscious" in every nearby card unless tied to a specific misconception.

## Known Issues

- Vite still reports the existing large-chunk warning.
- Checkpoint randomization is intact, but some correct answers can still appear in A for a given local seed; this is expected.
- Screenshots were captured from the current local progress state. The first three cards were in Review, Pretraining was the current Learn card, and later cards were opened through the Journey flow. No lesson-advance button was pressed during feedback capture.

## Recommended Next Implementation Prompt

Implement the next Before Morning refinement pass from `docs/stage-audits/v0-17-before-morning/`. Do not add new cards or badges. Keep the stage order, preserve checkpoint randomization and progress rules, keep the four v0.17.3 generated assets textless with HTML callouts, and refine only targeted interaction or copy issues that user testing identifies. Run typecheck, build, build:pages, audit:answers, browser QA at 390px plus 320/430 spot checks, and update the internal report PDF with screenshots.
