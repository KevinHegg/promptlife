# The Day Repeats Recommendations v0.22

Date: 2026-06-07

## Top Five Content Problems

1. Autoregression and Context Window still use the older slim lesson schema. They need explicit `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, `misconception`, and richer feedback fields.
2. Autoregression does not yet make the stage loop visible enough: one token is chosen, appended, then the model runs again.
3. Context Window does not sufficiently show that prompt, prior conversation, retrieved material, and response-so-far are all temporary input context.
4. RAG, Grounding, and Hallucinations have strong copy, but their tiny interactions are generic and do not directly teach retrieval, grounding, or evidence support.
5. The full stage arc is present but not explicit enough as a single chain: sampling -> append -> rerun -> context grows -> context expires -> RAG adds evidence -> grounding helps -> hallucinations remain possible.

## Top Five Visual/UI Problems

1. Autoregression visual is readable but too generic. It should show the response-so-far growing and becoming input for the next pass.
2. Context Window visual is readable at 320px, but it does not show an old card falling out, nor does it clearly separate retrieved context from user/system/response context.
3. RAG visual is strong and should be preserved, but its tiny interaction should match the visual lanes.
4. Grounding visual is strong, but it should eventually show claim-to-evidence support rather than only evidence flowing into context.
5. Hallucination visual is clear, but the interaction should let the learner identify unsupported claims instead of using generic risk sorting.

## Which Cards Need More Explanation

- Autoregression: needs the richer lesson architecture and a clearer bridge from Sampling. The learner should see that Sampling chooses; Autoregression repeats.
- Context Window: needs more explanation of prompt tokens, prior conversation, retrieved snippets, and response-so-far as temporary context.
- Grounding: needs one extra sentence or interaction state distinguishing "evidence is present" from "the claim is actually supported."
- Hallucinations: needs no large explanation increase, but the implementation should keep tying hallucinations to weak support rather than intent.

## Which Cards Need Less Explanation

- RAG should stay concise. It is already strong; avoid turning it into a full vector-search lesson in Journey.
- Grounding should avoid becoming a citation taxonomy. Keep detailed citation/source-checking ideas in glossary, review routes, or later risk literacy material.
- Hallucinations should not become fear-heavy. Keep it practical: fluent output can outrun evidence.

## Which Cards Need Better Visuals

- Highest priority: Autoregression.
- Next priority: Context Window.
- Medium priority: Grounding and Hallucinations.
- Lowest priority: RAG, because the current Open-Book Retrieval visual is already strong.

## Which Cards Need Tiny Interactions

- Autoregression: a tap-step loop where the learner advances through choose token -> append -> run again -> context grows.
- Context Window: a small push-card window where cards enter, the newest cards remain visible, and the oldest card falls out.
- RAG and Retrieval: a three-lane tap reveal: User question, Retriever, Retrieved cards into context, Generated response.
- Grounding: match or tap claims to evidence cards; unsupported claims should remain unanchored.
- Hallucinations: inspect the bridge and mark which fluent claims lack support.

## More Than One Checkpoint Or Exercise

- No Day Repeats card needs more than one Journey checkpoint.
- Context Window already connects naturally to the Context Stack game.
- RAG already has the `open-book-or-learned` exercise; keep that as the richer practice surface.
- Grounding and Hallucinations could use Play or review exercises later, but not in this v0.22.1 implementation pass unless the user explicitly asks.

## Which Cards Should Remain Simple

- RAG should stay an open-book exam mental model: retrieval plus context, not training.
- Grounding should stay "tie the answer to evidence," not an assurance that evidence was verified perfectly.
- Hallucinations should stay "fluency is not evidence," not a long risk framework.
- Context Window should stay temporary visible input, not a deep architecture discussion of memory systems.

## Redundancies To Remove

- Autoregression and Context Window both use train/sequence imagery. Give Autoregression the loop job and Context Window the capacity/visibility job.
- RAG and Grounding both use note-checking metaphors. Keep RAG as "open-book exam" and Grounding as "anchor to evidence."
- Grounding and Hallucinations both warn that answers can be unsupported. Grounding should teach the remedy; Hallucinations should teach the failure mode.

## Image 2 Textless PNG Assets

No required Image 2 asset is recommended before the coded implementation pass.

Optional later candidate:

- Hallucinations: a textless ZenTron Origami bridge with missing supports could add emotional clarity if all learner-facing labels, callouts, captions, and alt text remain in HTML. This is low priority because the current coded visual already teaches the mechanism.

Not recommended as Image 2 assets:

- Autoregression: needs precise step labels and token/context mechanics.
- Context Window: needs exact card movement, capacity, and truncation labels.
- RAG and Retrieval: current coded/HTML visual already provides the needed lane labels.
- Grounding: needs claim/evidence relationships that are better expressed in coded SVG/HTML.

## Coded SVG Recommendations

- Autoregression: coded SVG/HTML loop with four states: selected token, appended response-so-far, model runs again, next-token candidates refresh.
- Context Window: coded SVG/HTML tray with explicit card types: system/user, conversation history, retrieved passage, response-so-far, and old context falling out.
- RAG and Retrieval: keep the current coded visual; add interaction states to highlight each lane.
- Grounding: coded SVG/HTML claim-to-evidence map with anchored and unsupported claims.
- Hallucinations: keep the coded bridge, but add an evidence-support layer and concise unsupported-claim labels.

## CSS 3D Recommendations

- No heavy 3D library is needed.
- A light CSS "transparent tray" for Context Window could be useful, but it should remain CSS/SVG only.
- Avoid CSS 3D for Autoregression, RAG, Grounding, and Hallucinations in the next pass; simple labeled mechanisms will teach better.

## Current Visuals To Keep

- Keep the ZenTron Origami frame and paper-card language.
- Keep the RAG visual as the stage's gold-standard open-book retrieval visual.
- Keep Grounding's evidence-to-context-to-answer structure.
- Keep Hallucinations' unsupported bridge metaphor and HTML callouts.
- Keep bottom-nav behavior and key-term chip collapse support.

## Specific Day Repeats Questions

1. Is Autoregression distinct enough from Sampling? Partly. Sampling is now clearly the chosen-token step, while Autoregression states next token, append, repeat. The next pass should make that boundary visual: Sampling chooses; Autoregression loops.
2. Is Context Window clear enough that it does not imply permanent memory? Mostly. The card says context is temporary and the checkpoint targets truncation, but the main lesson body needs an explicit durable-vs-temporary field.
3. Is RAG clearly retrieval plus context, not training? Yes. This is one of the strongest current distinctions in the stage.
4. Is Grounding clearly evidence support, not a truth guarantee? Yes. It says grounding helps tie answers to evidence and can still fail.
5. Is Hallucination framed as unsupported fluent output, not lying or consciousness? Yes. The current copy avoids malice, intent, and spooky agency.
6. Which visual most needs repair? Autoregression, because it carries the stage hinge but does not yet show response-so-far becoming next-pass context.
7. Which card most needs a tiny interaction? Autoregression first, Context Window second. Both need learner action that proves the loop and temporary context limit.
8. Are any cards too technical for the audience? No. The risk is the opposite for Autoregression and Context Window: they are accurate but a little too thin.
9. Are any cards out of order? No. Autoregression -> Context Window -> RAG and Retrieval -> Grounding -> Hallucinations is the right sequence.
10. Is any Image 2 asset justified in this stage? No required asset now. Hallucinations is only an optional later textless bridge-scene candidate if the coded visual still feels too abstract after the repair pass.
11. Does this stage prepare learners for Twilight, Midnight Ledger, and New Dawn? Yes, conceptually. It gives the needed bridge from mechanics to risk literacy: context is temporary, retrieval can help, grounding is evidence support, and fluent output still needs human judgment.

## Card-Level Strategy

| Card | Recommendation | Priority | Suggested visual | Suggested interaction |
| --- | --- | --- | --- | --- |
| Autoregression | Revise. Convert to richer schema and show the loop. | High | Coded SVG/HTML loop | Tap-step append loop |
| Context Window | Revise. Convert to richer schema and show temporary capacity. | High | Coded SVG/HTML tray | Push cards into limited window |
| RAG and Retrieval | Keep and polish. Preserve core copy and visual. | Medium | Existing coded visual plus states | Tap retrieval lanes |
| Grounding | Keep and polish. Add support-check clarity. | Medium | Coded claim/evidence map | Match claim to evidence |
| Hallucinations | Keep and polish. Add unsupported-claim interaction. | Medium | Coded bridge, optional later Image 2 | Mark missing supports |

## Recommended Next Implementation Prompt

Implement a v0.22.1 The Day Repeats repair pass. Do not add new Journey cards, games, generated PNG assets, heavy 3D libraries, dependencies, badge changes, progress-rule changes, checkpoint-randomization changes, Glossary Dojo changes, or Journey order changes. Keep the order: Autoregression, Context Window, RAG and Retrieval, Grounding, Hallucinations. Convert Autoregression and Context Window from the older slim schema to the richer lesson architecture with explicit core explanation, model lifecycle, durable-vs-temporary notes, prompt-vs-response/current-context notes, misconceptions, and clearer feedback. Preserve the strong RAG, Grounding, and Hallucinations distinctions while giving them more specific tiny interactions. Update coded SVG/HTML visuals so Autoregression shows choose-token -> append -> rerun, Context Window shows prompt/conversation/retrieved/response-so-far cards plus old context falling out, RAG keeps retrieval-plus-context-not-training, Grounding shows claim-to-evidence support, and Hallucinations shows fluent output outrunning support. Keep all text in HTML, keep visuals readable at 320px and 390px, and run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.
