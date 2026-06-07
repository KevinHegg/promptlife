# Midnight Ledger Card Inventory v0.24

Date: 2026-06-07

## Stage Inventory

Current Journey stage: `Midnight Ledger`

Stage number: 7

Stage grid label: `Midnight Ledger`

Grid subtitle: `Costs and shadows`

Stage focus: What costs and debts must be counted.

Stage distinction: The answer feels weightless; the infrastructure is not.

Current cards:

1. `collective-intelligence` - Journey card 32
2. `costs-we-must-count` - Journey card 33
3. `risk-myth` - Journey card 34

No dedicated Prompt Injection / Tool Risk Journey card is present.

## Card 32: Collective Intelligence, Extracted

### Current Content

- Card id: `collective-intelligence`
- Title: Collective Intelligence, Extracted
- Subtitle: No creators, no model
- Stage: Midnight Ledger
- One-sentence definition: Generative AI depends on patterns learned from human-created language, art, code, documents, research, and culture.
- Core explanation: Human-created digital culture supplies traces used in training; consent, transparency, attribution, and compensation remain disputed in many cases; the model is not humanity's mind.
- Where it happens: During data collection and training, before ordinary use.
- Durable vs temporary: Training on data can durably shape weights; a single prompt or retrieved document does not automatically become durable learning.
- Prompt vs response: A response may feel original, but fluency depends partly on patterns learned from human-created prompt-like and document-like data.
- Why it matters: Provenance, consent, compensation, attribution, and accountability are part of model literacy.
- How it connects: Follows The Perfect Storm by asking whose culture, work, and expression powered the data side of that storm.
- Metaphor: A lantern lit by millions of borrowed flames.
- Brain Bridge: Like a person shaped by culture, teachers, books, and conversation.
- Where it breaks: A person participates consciously in culture; a model statistically absorbs patterns without gratitude, responsibility, legal judgment, or understanding.
- Misconception: The model created its abilities alone.

### Key Terms

Collective intelligence, training data, data provenance, consent, compensation, copyright, human feedback labor.

### Source Status

- Source review status: intentionally cautious.
- Source ids: `usco-ai-copyright`, `source-needed-data-provenance`.
- Source-needed flag: yes.
- Current wording is careful enough for draft use because it says disputes exist rather than claiming all data was stolen.

### Visual

- Visual aid id: `collective-intelligence-lantern`.
- Current visual type: coded SVG.
- Current visual title: Borrowed Flames.
- Finding: Conceptually aligned, but the central `Lantern` label is cramped/clipped at mobile size in the screenshot. The visual is attractive and on-theme, but it could teach provenance/consent/compensation more explicitly with HTML callouts or a revised interaction.

### Tiny Interaction

- Interaction id/type: `cloud`.
- Current title: Follow the borrowed flames.
- Current behavior: Generic feature-cloud chips: syntax, style, facts, tone, math, risk, meaning.
- Finding: Mismatched. The copy is about human-created traces, consent, attribution, and training data, but the interaction is a generic feature-cloud demo. It does not test the learner's understanding of provenance, consent, compensation, copyright, or uncertainty.

### Checkpoint

- Question: What powers much of a model's usefulness?
- Correct answer: Patterns learned from human-created expression.
- Incorrect answers: A private mind inside the model; Only hand-written rules; A permanent memory of every creator.
- Feedback: Strong, specific, and non-shaming.
- Finding: Good misconception target. Answers are randomized by the app audit.

### UI Notes

- No horizontal overflow in 390px QA.
- Key terms appear after the visual and collapse when needed.
- No duplicate `Core idea` heading after the pill.
- Bottom action remains reachable in Preview mode.

### Recommendation

Revise. Keep the content and checkpoint. Repair the visual label and replace the tiny interaction with a provenance/rights/value sort.

## Card 33: Costs We Must Count

### Current Content

- Card id: `costs-we-must-count`
- Title: Costs We Must Count
- Subtitle: The answer feels weightless. The infrastructure is not.
- Stage: Midnight Ledger
- One-sentence definition: Generative AI has physical, social, cultural, and ethical costs that must be counted honestly.
- Core explanation: AI systems depend on data centers, electricity, cooling, chips, networks, data pipelines, and human labor. Costs include energy, water, carbon, land/siting, hardware supply chains, e-waste, privacy, bias, information pollution, labor disruption, deskilling, and concentration of power. Impacts vary by model, workload, hardware, cooling, region, electricity source, and deployment choices.
- Where it happens: Across training, inference, infrastructure, procurement, workplace use, education, and media ecosystems.
- Durable vs temporary: Some costs come from durable training infrastructure; others from repeated inference workloads, deployment choices, and institutional use.
- Prompt vs response: A short response may hide a long supply chain of compute, data, labor, and policy choices.
- Why it matters: Model literacy includes stewardship.
- How it connects: Pairs with benefits by asking what must be protected, redesigned, or governed.
- Metaphor: The invisible factory behind the instant answer.
- Brain Bridge: Human thought has bodily costs too, but AI costs are industrial and infrastructural.
- Where it breaks: Human metabolism and data-center infrastructure are not the same kind of cost.
- Misconception: Digital means weightless or cost-free.

### Key Terms

Environmental footprint, energy use, water use, carbon emissions, data center, e-waste, copyright, labor disruption, deskilling, privacy, governance.

### Source Status

- Source review status: reviewed.
- Source ids: `iea-energy-and-ai`, `unu-ai-environmental-cost`, `ap-unu-environment-report`.
- Current wording avoids precise universal statistics and repeatedly says impacts vary by context.

### Visual

- Visual aid id: `costs-invisible-factory`.
- Current visual type: coded SVG.
- Current visual title: Invisible Factory.
- Finding: The visual concept is aligned, but the SVG currently repeats `Power`, omits some named cost categories, and has label crowding around the answer node. At 320px it remains usable but cramped. This card most needs a stronger visual.

### Tiny Interaction

- Interaction id/type: `risk`.
- Current title: Map the hidden factory.
- Current behavior: The same real-risk/myth toggle used by Risk vs Myth, with a privacy claim.
- Finding: Mismatched. The interaction does not map energy, water, land, hardware, labor, data, privacy, and power. It is instructional in general, but not for this card.

### Checkpoint

- Question: Which statement is most responsible?
- Correct answer: AI costs vary and should be counted before decisions.
- Incorrect answers: Digital systems have no physical costs; All AI costs are identical everywhere; Costs prove benefits are impossible.
- Feedback: Strong. It avoids denial and doom.

### UI Notes

- No horizontal overflow in 390px or 320px QA.
- Key term volume is high, but terms are after the visual and the row collapses.
- The visual appears before terms, so key terms do not push the visual too low.
- Bottom action remains reachable in Preview mode.

### Recommendation

Revise. Keep the cautious copy and checkpoint. Replace the visual with a clearer ledger/data-center footprint diagram and replace the interaction with a cost-entry tap or sort.

## Card 34: Risk vs Myth

### Current Content

- Card id: `risk-myth`
- Title: Risk vs Myth
- Subtitle: Practical institutional literacy
- Stage: Midnight Ledger
- One-sentence definition field: not present; current `definition` says risk literacy separates practical harms from magical stories about what models are.
- Core explanation field: not present; current `why` covers practical risks and magical threats.
- Where it matters: Whenever people use AI in classrooms, research, administration, health, advising, or IT systems.
- Durable vs temporary note: not present as a rich-schema field.
- Prompt vs response note: not present as a rich-schema field.
- Why it matters: Clear mental models help institutions manage privacy exposure, hallucinations, bias, overreliance, tool security, vendor lock-in, and concentration of power without inventing magical threats.
- Relationship: Most real risks come from data, outputs, integrations, incentives, and human overreliance; ordinary inference does not make the model secretly train itself.
- Metaphor: A campus safety map that marks real hazards clearly.
- Brain Bridge: Brain metaphors can make risks feel urgent and memorable.
- Where it breaks: Do not infer consciousness, intent, or secret self-training from fluent text.
- Misconception field: not present as a rich-schema field, though the relationship and quiz target myths.

### Key Terms

Inference, training, context window, privacy, hallucination, Prompt Injection.

### Source Status

- Source review status: reviewed.
- Source ids: `nist-ai-rmf-1-0`, `nist-genai-profile`, `eu-ai-act`.
- Caveat: Risk language should stay mechanism-based and should not imply model literacy alone solves governance, privacy, or security.

### Visual

- Visual aid id: `risk`.
- Current visual type: coded SVG.
- Current visual title: Risk or Myth.
- Finding: Readable and calm, but thin. It shows real risk vs myth with three chips, but does not connect risks to mechanisms such as context exposure, hallucination, insecure tools, or overreliance. It should remain coded SVG rather than generated PNG.

### Tiny Interaction

- Interaction id/type: `risk`.
- Current title: Sort risk from myth.
- Current behavior: One scenario asks whether uploading private student records is a real risk or myth.
- Finding: Aligned but too small. It checks one real risk only and does not let learners sort multiple risks and myths.

### Checkpoint

- Question: Which is a real institutional risk?
- Correct answer: Uploading private data.
- Incorrect answers: The model becoming conscious in the chat; Softmax stealing files.
- Feedback: Too generic. Correct feedback says risk literacy is part of model literacy, but wrong feedback does not explain the represented myth specifically.

### UI Notes

- No horizontal overflow in 390px or 430px QA.
- Because this card uses a slimmer schema, the core panel is thinner than the preceding two cards.
- Visual appears early and key terms collapse as expected.
- Bottom action remains reachable in Preview mode.

### Recommendation

Revise. Convert to richer schema, keep it in Midnight Ledger, make the visual mechanism-based, expand the tiny interaction into a multi-item real-risk/myth sort, and improve checkpoint feedback.

## Prompt Injection / Tool Risk

### Current Status

No standalone Journey card exists. Prompt Injection appears:

- As a glossary term.
- In Risk vs Myth key terms.
- In Risk vs Myth interaction copy as a real risk example.

### Recommendation

Do not add a new card automatically. For v0.24 implementation, either:

- Keep it inside Risk vs Myth but make the Risk vs Myth interaction include prompt injection and insecure tool use; or
- Add a future card only if the product later introduces tools, external actions, or security-specific workflows.

