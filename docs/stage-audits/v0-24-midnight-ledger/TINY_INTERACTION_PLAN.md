# v0.24.1 Midnight Ledger Tiny Interaction Plan

Date: 2026-06-07

## Implemented Interactions

### Collective Intelligence, Extracted

Type: two-bucket sort.

Prompt: Which questions stay human?

Human question:

- provenance
- consent
- copyright
- compensation

Model mechanics:

- model weights
- prompt tokens

Success feedback:

> Insight strengthened. Human-created traces can shape models, but rights, attribution, consent, and compensation remain human and institutional questions.

### Costs We Must Count

Type: tap-to-reveal ledger entries.

Entries:

- Energy
- Water
- Hardware
- Labor
- Privacy
- Governance

The interaction teaches that costs vary and should be counted without offering unsupported precise statistics.

### Risk vs Myth

Type: two-bucket sort.

Real risk:

- Private student records in a public chatbot
- Malicious retrieved text overrides intended instructions
- Overreliance weakens human review

Myth:

- The model becomes conscious during the chat
- The model permanently trains itself on every ordinary prompt
- Softmax steals files

Success feedback:

> Insight strengthened. Real AI risks usually come from data, context, tools, institutions, and overreliance, not from model consciousness or magic.

## Preserved Behavior

- No competitive scoring.
- No timers, streaks, leaderboards, or failure states.
- Journey progress remains separate from preview interactions.
- Checkpoint randomization remains unchanged.
- Glossary Dojo logic is untouched.

## QA Notes

- Collective and Risk use the existing cycle-sort interaction with a custom success label.
- Costs uses the existing dark `morning-interaction` button pattern.
- Mobile QA at 390px and 320px found no horizontal overflow in captured visual states.
