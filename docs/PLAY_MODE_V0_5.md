# Play Mode

Date: 2026-06-08
Current app version: v0.27.3

This file started as the v0.5 Play plan. It now describes the current Play surface first, then keeps the older v0.5 structure as historical context only.

## Purpose

Play is the low-pressure practice area for Prompt Life. It helps learners rehearse model-literacy moves through calm choices, comparisons, saved practice, and review.

Journey progress remains separate. Play can reinforce the concepts, but completing Play challenges is not required to advance through Journey cards.

## Current Play Set

The visible Play landing shows one ordered list:

1. Glossary Dojo
   - Purpose: Practice concept discrimination.
   - Action: Choose, compare, review.
   - Time: 4 min.
   - Relationship: usable anytime across the full Journey.

2. Attention Match
   - Purpose: Connect a token to what it depends on.
   - Action: Connect relevant tokens.
   - Time: 3 min.
   - Relationship: after Workday / Attention.

3. Probability Picker
   - Purpose: Explore probability-shaped next-token choices.
   - Action: Choose one likely token.
   - Time: 3 min.
   - Relationship: after Decision Room / Logits, Softmax, Sampling.

4. Context Stack
   - Purpose: See what fits in context.
   - Action: Place, observe, reset.
   - Time: 3 min.
   - Relationship: after The Day Repeats / Context Window, RAG, Grounding.

5. Prompt Run
   - Purpose: Trace one prompt through the whole loop.
   - Action: Trace the loop.
   - Time: 5-7 min.
   - Relationship: capstone for Morning Commute through The Day Repeats.

## Current Progress Model

Shared Play progress is stored in:

- `promptlife.playChallenges.v1`

Glossary Dojo keeps its own detailed round history in:

- `promptlife.glossaryDojo.v1`

Legacy keys are still read where useful so older local progress can bridge into the current Play summary:

- `promptlife:v1:gameInsights`
- `pl.gameInsights`
- `promptlife:v1:promptRunProgress`
- `pl.promptRunProgress`
- `promptlife:v1:traceComplete`
- `pl.traceComplete`
- `promptlife:v1:learningTourComplete`
- `pl.learningTourComplete`

## Debug Inspector

With `?debug=1`, the Play screen shows a debug-only progress inspector below the challenge list. It displays visible challenge status, shared Play storage metadata, legacy bridge signals, and localStorage key presence.

The inspector is read-only.

## Retired Compatibility

These earlier Play items are no longer visible on the normal Play landing:

- Attention Weave
- Token Pipeline Relay
- How AI Learns

They remain in compatibility metadata or legacy source so older saved states and direct routes do not strand learners.

## Accessibility Notes

- Play challenges use semantic sections, real buttons, visible focus styles, and live feedback where appropriate.
- Tap/click interactions have mobile-friendly targets.
- Bottom-nav padding is included so final actions and feedback remain reachable.
- The app continues to respect `prefers-reduced-motion`.

## Historical v0.5 Notes

The original v0.5 Play hierarchy had a Featured Activity, Side Challenges, and Tours. Prompt Run was the featured activity; Context Stack, Attention Weave, and Token Pipeline Relay were side challenges; How AI Learns was a tour. That hierarchy has been replaced by the current five-challenge Play set listed above.
