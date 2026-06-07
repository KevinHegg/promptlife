# Prompt Life Play Design Principles v0.26

Date: 2026-06-07

## Purpose

Prompt Life Play activities should make the model story feel less mysterious through calm, tactile practice. They are not tests of speed, rank, or cleverness. A good activity lets a learner do a tiny version of the mechanism, then names what the action revealed.

The eventual Play slate should be small: 3 to 5 strong practice activities plus any embedded Journey interactions. More games would make the product feel scattered and harder to maintain.

## Core Principles

1. One mechanic, one misconception.
   Each activity should target one durable confusion: context is not memory, attention is not awareness, sampling is not certainty, RAG is not training, or inference is not a weight update.

2. Action creates insight.
   The learner should do something meaningful: sort, connect, retrieve, compare, choose, append, or place. Pure clicking through explanation belongs in Journey, not Play.

3. Feedback explains the model move.
   Feedback should say what happened, why it matters, and which mental model improved. It should avoid shame, scores, timers, streaks, failure states, and leaderboards.

4. Keep the prompt's day visible.
   Strong Play activities should reinforce the through-line: a prompt becomes tokens, vectors, hidden states, logits, probabilities, one chosen token, appended context, and a repeated run.

5. Mobile comes first.
   Activities must fit at 320px and 390px without horizontal overflow, tiny targets, dense instructions, or bottom-nav obstruction. One-thumb use is a meaningful design constraint.

6. Keep text accessible.
   Instructional text belongs in HTML, not baked into images. Buttons should be buttons. Focus states, semantic labels, and reduced-motion respect are part of the game design, not cleanup.

7. Glossary support is practice infrastructure.
   Glossary chips, drawer links, and Dojo feedback should support the activity, especially when the activity introduces terms that sound familiar but mean something precise.

8. Reward reflection, not winning.
   Use "Insight unlocked," reflection prompts, completion states, and replay invitations. Prompt Life should build confidence without making learners feel evaluated.

## Keep Criteria

Keep an activity when it:

- Directly supports a core Prompt Life distinction.
- Gives the learner an action they cannot get from reading a card.
- Produces useful feedback in under 5 minutes, or clearly earns a longer capstone slot.
- Works cleanly on small mobile screens.
- Can be maintained without fragile special-case logic.
- Has a natural place in the final 3 to 5 activity slate.

## Revise Criteria

Revise an activity when the concept is strong but the current action is too abstract, too thin, too long, or too close to reading a lesson. Revision should usually reduce text and make the interaction more diagnostic.

## Merge Criteria

Merge an activity when its best content duplicates a Journey card, Prompt Run step, or another stronger game. Merging is preferred over keeping a parallel tour that learners may not need.

## Cut Criteria

Cut an activity when it:

- Teaches a side concept more than a core Prompt Life idea.
- Requires explanation before the action makes sense.
- Has weak replay value and weak badge relevance.
- Adds maintenance burden without a clear learning payoff.
- Makes the Play page feel busier than the product needs.

## Recommended Final Slate Shape

The strongest v0.26 direction is:

1. Prompt Run - capstone trace of the full inference loop.
2. Context Stack - context window and temporary visibility.
3. Attention Match - revise Attention Weave into a clearer relevance challenge.
4. Probability Picker - future decoding activity for logits, softmax, sampling, and uncertainty.
5. Glossary Dojo - durable vocabulary practice.

This slate covers the main action verbs of model literacy: trace, place, connect, choose, and name.

## Activity Template

Each Play activity should have:

- Plain goal: one sentence.
- Model move: what the learner is simulating.
- Misconception target: what the activity prevents.
- Tiny action: one repeated gesture or decision.
- Feedback: one sentence that names the model concept.
- Reflection: optional, short, non-graded.
- Glossary hooks: 1 to 3 terms.
- Completion: "Insight unlocked" or "Practice saved," not a score.

## Maintenance Note

The final slate should bias toward shared interaction primitives already used in `ExerciseShell`: tap choice, sort, connect, label, and order. Custom one-off games are acceptable only when the mechanic is central and small.
