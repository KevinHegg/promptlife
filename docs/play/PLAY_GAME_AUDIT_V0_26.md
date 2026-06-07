# Play/Game Audit v0.26

Date: 2026-06-07

## Scope

This is an audit-only pass. No games, Journey cards, progress rules, badge logic, generated assets, dependencies, checkpoint randomization, or Glossary Dojo behavior were changed.

The current Play surface has six activities:

- Prompt Run
- Context Stack
- Attention Weave
- Token Pipeline Relay
- Glossary Dojo
- How AI Learns

## Scoring Notes

Most scores use 1 to 5 where 5 is strongest. `Maintenance burden` is reversed: 1 means low burden and 5 means high burden.

## Inventory And Evaluation

| Activity | Current role | Core learner action | Recommendation | Why |
|---|---|---|---|---|
| Prompt Run | Featured activity and badge-relevant capstone | Label, connect, choose, append, and order the inference loop | Revise | Highest instructional value, but long and closer to an interactive worksheet than a focused game. Keep as the capstone and tighten flow. |
| Context Stack | Practice challenge | Push cards into a limited window and observe old cards falling out | Keep with polish | Clear, tactile, mobile-friendly, and strongly targets the context-is-not-memory misconception. |
| Attention Weave | Practice challenge | Tap token nodes to draw relevance arcs | Revise | Good misconception target, but the current free-arc action is thin after one solved example. Turn it into a clearer Attention Match challenge. |
| Token Pipeline Relay | Practice challenge | Cycle operators through pass, transform, and hold | Cut or merge | Pleasant but abstract. It teaches deterministic paths more than the prompt-to-token model and has weak badge relevance. |
| Glossary Dojo | Glossary practice | Answer 12 calm term, definition, relationship, and mix-up questions | Keep | Strongest current replay loop. It supports durable vocabulary, precise feedback, no scores, and independent mastery tracking. |
| How AI Learns | Guided comparison | Step through learning modes and sort durable versus temporary changes | Merge | Content is important, but this behaves more like a Journey companion than a Play activity. Merge its strongest distinction into Prompt Run/Journey support. |

## Score Matrix

| Activity | Clarity | Instructional value | Misconception targeting | Fun flow | Mobile fit | Replay value | Maintenance burden | Badge relevance |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Prompt Run | 4 | 5 | 5 | 3 | 4 | 3 | 4 | 5 |
| Context Stack | 5 | 5 | 5 | 4 | 4 | 3 | 2 | 3 |
| Attention Weave | 4 | 4 | 5 | 3 | 4 | 2 | 2 | 2 |
| Token Pipeline Relay | 2 | 2 | 2 | 3 | 4 | 2 | 2 | 1 |
| Glossary Dojo | 5 | 5 | 5 | 4 | 4 | 5 | 4 | 2 |
| How AI Learns | 4 | 4 | 5 | 2 | 4 | 2 | 3 | 2 |

## Strongest Current Games

1. Glossary Dojo
   The best current practice loop. It is replayable, non-competitive, grounded in real glossary terms, and already has precise wrong-answer feedback.

2. Context Stack
   The clearest simple mechanic. The learner directly sees the temporary nature of a context window.

3. Prompt Run
   The most important capstone. It carries the core "day in the life of a prompt" story and supports the badge requirement, even though it needs flow polish.

## Weakest Current Games

1. Token Pipeline Relay
   The action is understandable, but the concept lands as generic system determinism instead of a necessary LLM literacy idea.

2. How AI Learns
   Valuable content, but the current Play placement makes it feel like a second lesson path rather than a game.

3. Attention Weave
   The core idea is strong, but one pronoun-link example does not yet have enough replay depth.

## Keep / Revise / Merge / Cut Table

| Activity | Recommendation | Best next action |
|---|---|---|
| Prompt Run | Revise | Keep as the featured capstone. Shorten copy, strengthen step transitions, and make each action feel more like tracing one visible prompt. |
| Context Stack | Keep | Keep in final slate. Add optional RAG/evidence cards later so retrieved text can enter context and fall out. |
| Attention Weave | Revise | Rename or reshape as Attention Match. Use small sentence cards where the learner connects a target token to the evidence token and gets immediate explanation. |
| Token Pipeline Relay | Cut | Remove from final slate, or merge any useful "same seed, same choices" idea into Prompt Run sampling. |
| Glossary Dojo | Keep | Keep as the durable vocabulary practice engine. Continue QA for wording and mobile feedback scroll. |
| How AI Learns | Merge | Move its durable-versus-temporary distinction into Prompt Run/Journey review or a short Glossary/Practice prompt. |

## Recommended Final Slate

| Slate activity | Source | Learning objective | Counts as Play insight? |
|---|---|---|---|
| Prompt Run | Current, revised | Trace one prompt through tokenization, embeddings, layers, logits, softmax, sampling, append, and repeat. | Yes, and remains badge-relevant. |
| Context Stack | Current, kept | Understand context as temporary visible input, not permanent memory. | Yes. |
| Attention Match | Revised from Attention Weave | Understand attention as weighted relevance between token positions, not human awareness. | Yes. |
| Probability Picker | Future activity, not implemented in v0.26 | Understand logits, softmax, sampling, uncertainty, and why the next token is chosen from probabilities. | Yes. |
| Glossary Dojo | Current, kept | Build durable vocabulary through term, definition, relationship, and mix-up practice. | Not required for the badge, but valuable independent practice. |

This final slate has five activities. It covers the major learner actions Prompt Life needs: trace, place, connect, choose, and name.

## Activity Notes

### Prompt Run

Keep it. The capstone should remain the featured Play activity because it is the only current activity that walks the whole inference loop. Its risk is length: 13 steps can feel like a lesson sequence rather than a playful trace. The next pass should keep the structure but reduce friction, make the visual "prompt moving through the model" more continuous, and clarify completion.

### Context Stack

Keep it. This is the strongest small game. The push-card mechanic maps cleanly to context window limits and old context falling out. A future revision could add RAG cards: retrieved PDF passage, search snippet, system instruction, user question, and generated answer. That would strengthen the bridge from context window to grounding.

### Attention Weave

Revise it. The current version is accurate and accessible, but it has one target relation. A stronger version would present 3 to 5 tiny sentence situations and ask the learner to connect the target token to the most relevant source token. The feedback should say why the relation matters and repeat that attention is relevance weighting, not consciousness.

### Token Pipeline Relay

Cut it from the eventual slate. It is compact and mobile-friendly, but its pass/transform/hold operators are too abstract for this product. The useful bit - same seed plus same choices can replay the same run - belongs inside Prompt Run or a future Probability Picker.

### Glossary Dojo

Keep it. It is the most complete game system: 12-question rounds, glossary-based distractors, no score/timer/leaderboard, precise feedback, localStorage mastery, and Play plus Glossary entry points. It should remain independent from Journey progress.

### How AI Learns

Merge it. The distinction between training, fine-tuning, RAG, prompting, inference, and human feedback is essential, but the current activity reads like a guided comparison tour. Its best value should reinforce Journey cards and Prompt Run checkpoints rather than occupy a full Play slot in the final small slate.

## Mobile QA

Screenshots were captured in a temporary Chrome profile so user progress was not changed.

- 390px Play top: no horizontal overflow.
- 390px Play activity cards: no horizontal overflow.
- 320px Play top and activity cards: no horizontal overflow.
- First screen captured for all six current activities.
- Active/feedback states captured for Prompt Run, Context Stack, Attention Weave, Token Pipeline Relay, and Glossary Dojo.
- Bottom nav remained visible and did not produce horizontal layout issues in captured states.

Screenshot manifest:

- `docs/play/screenshots/v0-26-play-audit-screenshots.json`

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed.

## Known Issues

- The production bundle still has the existing Vite large-chunk warning.
- Prompt Run is instructionally rich but long for a Play activity.
- Token Pipeline Relay has weak conceptual fit.
- How AI Learns duplicates Journey-style teaching.
- Attention Weave needs more diagnostic replay value.

## Recommended Next Implementation Prompt

```text
/goal

You are working inside my local Git checkout for:

https://github.com/KevinHegg/promptlife

Project: Prompt Life

This is a v0.26.1 Play Slate Simplification pass.

Use docs/play/PLAY_GAME_AUDIT_V0_26.md and docs/play/PLAY_DESIGN_PRINCIPLES_V0_26.md as source guidance.

Do not change Journey card order, badge logic, checkpoint randomization, generated assets, or dependencies.

Main goals:

1. Keep Glossary Dojo unchanged except for small QA notes if needed.
2. Keep Context Stack and polish copy/feedback only if necessary.
3. Keep Prompt Run as the featured capstone, but reduce friction and make the prompt trace feel more continuous.
4. Revise Attention Weave into a clearer Attention Match activity with 3 to 5 tiny sentence examples.
5. Remove Token Pipeline Relay from the Play page or merge its useful determinism idea into Prompt Run sampling.
6. Move How AI Learns out of the final Play slate by linking its durable-versus-temporary distinction from Journey/Prompt Run support instead.
7. Preserve existing localStorage safely. Do not break users who already have token-relay or learning-tour completion stored.

Run npm run typecheck, npm run build, npm run build:pages, and npm run audit:answers.

At the end, report files changed, Play slate before/after, progress compatibility, mobile QA, and known issues.
```
