# Play Mode v0.5

Date: 2026-06-01

## Purpose

v0.5 makes Play the interactive heart of Prompt Life. The goal is still model literacy, not competition: learners unlock insight through low-pressure actions, hints, retry, reveal, and reflection.

## Play Hierarchy

### Featured Activity

Prompt Run

- Subtitle: Guide one prompt through the model.
- Action: Label, connect, choose, append.
- Teaches: the full inference loop.
- Estimated time: 8-10 min.
- State: Not started, step count, or Complete.

### Side Challenges

- Context Stack: Push and observe what falls out. Teaches context windows.
- Attention Weave: Connect relevant tokens. Teaches attention as relevance.
- Token Pipeline Relay: Toggle operators. Teaches sequence, state, and determinism.

### Tours

- How AI Learns: Sort learning types. Teaches durable training vs temporary steering.

## Prompt Run

Prompt Run replaces the old Trace One Prompt lecture flow. The sample prompt is:

`The dog chased the cat across the ...`

The activity has 12 interactive steps plus a final synthesis challenge:

1. Prompt or Response?
2. Tokenizer
3. Token IDs
4. Embedding Lookup
5. Tensor Stack
6. Attention
7. MLP Feature Reshape
8. Hidden State
9. Logits
10. Softmax Funnel
11. Sampling
12. Append and Repeat
13. Full Run Challenge: Put the run in order

Each step uses the existing `ExerciseShell` pattern:

- Goal
- Do this
- Try area
- Feedback
- Why this matters
- Hint
- Show me

Continue stays disabled until the learner answers correctly or uses Show me. Reveals allow progress without shame, while correct answers unlock insight.

## Progress

Prompt Run progress is stored in:

- `promptlife:v1:promptRunProgress`

It tracks completed steps, the final challenge, correct insights, revealed steps, attempts, and last answers. The older `promptlife:v1:traceComplete` flag remains as a compatibility/save marker.

## Mini-Game Updates

Context Stack now asks learners to keep the request, example, and tone visible when the output card arrives. If an important card falls out, feedback names what was lost.

Attention Weave now uses the sentence `The dog chased the cat because it ran.` The correct challenge is connecting `it` to `cat`.

Token Pipeline Relay now has a target path: `pass to transform to hold to pass`. The insight unlocks only when the operator path matches.

## Accessibility Notes

- Prompt Run steps use real buttons and the reusable exercise components.
- Drag-like tasks keep the tap/button fallback.
- Feedback is announced with live regions.
- The exercise shell scrolls feedback into view after checking.
- Extra bottom padding protects feedback and final controls from the fixed bottom nav.
- Hints do not penalize the learner.
- The implementation continues to respect `prefers-reduced-motion`.

## Future Modes

Watch and Challenge modes are documented as future v0.6 work. v0.5 ships Practice first so every step is reviewable, accessible, and clear at 390px before adding alternate mode rules.
