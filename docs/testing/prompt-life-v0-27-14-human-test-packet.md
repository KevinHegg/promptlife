# Prompt Life v0.27.14 Human Test Packet

Prompt Life is ready for **small human testing**, not badge issuance.

Known status:

- Badge: under construction
- Human review: pending
- Credential issue status: not yet issued
- Active Journey cards: 39
- Active checkpoint questions: 136
- Checkpoint choices: 544

## Short Tester Instructions

Use the app on a phone-sized screen if possible. Move through a few Journey cards, answer checkpoint questions naturally, and notice where the app helps you reason about the model instead of memorizing app wording.

Please do not try to get a perfect run. Wrong choices are part of the test because they should teach without shaming.

## What To Test

- Whether each checkpoint question is understandable without rereading the whole card.
- Whether the question makes you reason about an LLM mechanism, boundary, or human-use decision.
- Whether one answer feels clearly best.
- Whether wrong answers feel plausible rather than silly.
- Whether feedback explains the misconception you selected.
- Whether the feedback avoids revealing the correct answer too directly.
- Whether mobile layout, scrolling, and bottom navigation stay comfortable.

## Feedback To Collect

For each confusing checkpoint, capture:

- Learning card title.
- Question text.
- The answer you chose.
- Why that answer seemed tempting.
- Whether the feedback helped.
- Any wording that felt too technical, too vague, too long, or unfair.

## Report Confusing Questions

Mark a question as confusing if:

- The stem depends on a phrase you do not yet know.
- More than one answer seems equally defensible.
- The question asks for app wording instead of model reasoning.
- The scenario is too abstract to picture.

## Report Unfair Distractors

Mark a distractor as unfair if:

- It is obviously silly.
- It uses a term before the app has taught it.
- It is partly true in a way the feedback does not explain.
- It is much shorter or much vaguer than the correct answer.

## Report Jargon

Flag any use of terms such as logits, tensors, hidden states, grounding, RAG, inference, alignment, or autoregression when the question does not give enough context to understand them.

## Report UI Friction

Tell us if:

- The checkpoint panel is hidden by the bottom nav.
- The Next question or Next learning card button is hard to reach.
- Answer text is too dense on a small screen.
- Feedback appears too low, too late, or too long.

## Wrong-Answer Feedback Standard

Wrong choices should feel instructive, not humiliating. A good wrong-answer response should:

- Name the selected misconception.
- Explain the boundary in plain language.
- Stay calm.
- Avoid language like failed, wrong, score, or streak.
- Avoid giving away the correct answer too directly.

## Current Human-Review Focus

- Feedback rewritten for naturalness: 334 items.
- Boilerplate feedback occurrences removed: 334.
- Answer-length warnings resolved: 41.
- Answer-length warnings intentionally retained for human review: 15.

## Final Reminder

Prompt Life is being tested as a learning app and evidence model. The badge remains under construction until human review confirms the Journey, checkpoint bank, and evidence standard are credible.
