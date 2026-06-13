# Prompt Life Visual Aid Readiness Rubric v0.28.1

Generated: 2026-06-13T18:48:56.791Z

This rubric classifies all 39 Journey visual aids for small human testing. It does not claim final visual polish; it asks whether each visual is testable, readable, non-misleading, and aligned with the model-literacy objective.

## Seven Human-Readability Scores

- Five-second clarity
- Mobile readability
- Single-idea focus
- Mechanism accuracy
- Caption/callout support
- Style consistency
- Misconception repair

## Priority Scale

- P0: unusable or misleading; must fix before human testing
- P1: hard to read or unclear; fix before human testing if feasible
- P2: acceptable but improvable
- P3: keep

## Summary

- Visual aids scored: 39
- P0/P1 before: 18
- P0/P1 after: 0
- Human testing recommendation: ready for small human testing

## Template Distribution

- Atmospheric Scene: 3
- Taxonomy Map: 11
- Comparison Board: 9
- Mechanism Flow: 9
- Probability Bars: 3
- Context Tray / Stack: 4

## Card-by-Card Rubric

| # | Stage | Card | Visual | Template | Score | Before | After | Status | Watch note |
| ---: | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | Before Morning | What Is an LLM? | Prompt to Prediction | Atmospheric Scene | 34/35 | P3 | P3 | keep | Keep the PNG textless; all mechanism language must stay in HTML. |
| 2 | Before Morning | Where LLMs Fit | AI Family Tree | Taxonomy Map | 34/35 | P3 | P3 | keep | Do not add more branch definitions inside the tree. |
| 3 | Before Morning | Rationalists vs Empiricists | Rules and Learned Patterns | Comparison Board | 33/35 | P3 | P3 | keep | Keep loss explanation in callout, not as a paragraph inside the board. |
| 4 | Before Morning | Training | Training Loop | Mechanism Flow | 34/35 | P3 | P3 | keep | Five is the maximum; do not add side notes inside the loop. |
| 5 | Before Morning | Pretraining | Broad Pretraining | Atmospheric Scene | 32/35 | P3 | P3 | keep | Avoid implying source documents are individually retrieved from weights. |
| 6 | Before Morning | Overfitting and Generalization | Overfitting vs Generalization | Comparison Board | 28/35 | P1 | P2 | temporary | Validation markers must remain readable at 320px. |
| 7 | Before Morning | Fine-Tuning | Fine-Tuning Path | Comparison Board | 32/35 | P1 | P3 | fixed | Keep current-run details in callouts rather than adding more labels. |
| 8 | Before Morning | Alignment | Alignment Landscape | Atmospheric Scene | 31/35 | P3 | P3 | keep | Avoid morality imagery that makes the model seem conscious. |
| 9 | Morning Commute | Inference | Forward Pass | Mechanism Flow | 33/35 | P3 | P3 | keep | Do not add more state names inside the diagram. |
| 10 | Morning Commute | Prompt vs Response | Prompt vs Response | Mechanism Flow | 33/35 | P2 | P3 | fixed | Keep panel padding compact and tokens wrapped. |
| 11 | Morning Commute | Tokenization | Text to Tokens | Mechanism Flow | 30/35 | P1 | P2 | fixed | Long token rows must wrap without horizontal overflow. |
| 12 | Morning Commute | Token IDs | Token IDs | Mechanism Flow | 32/35 | P3 | P3 | keep | Keep numeric labels large enough. |
| 13 | Morning Commute | Embeddings | Embedding Lookup | Mechanism Flow | 32/35 | P3 | P3 | keep | Avoid making the table look like searchable source memory. |
| 14 | Morning Commute | Vectors | Feature Vector | Comparison Board | 27/35 | P1 | P2 | temporary | Distributed side may feel abstract; tester feedback should guide simplification. |
| 15 | Morning Commute | Tensors | Tensor Block | Taxonomy Map | 27/35 | P1 | P2 | temporary | Axis labels must stay outside crowded cells. |
| 16 | Workday | Attention | Relevance Between Tokens | Comparison Board | 34/35 | P1 | P3 | fixed | Arc endpoints must remain visually attached to chips. |
| 17 | Workday | MLP | MLP Feature Workshop | Comparison Board | 30/35 | P1 | P2 | fixed | Avoid adding feature names to the bars. |
| 18 | Workday | Layers | Transformer Stack | Mechanism Flow | 30/35 | P1 | P2 | fixed | Keep block text short; no layer-by-layer story. |
| 19 | Workday | Hidden States | Hidden State Flow | Mechanism Flow | 30/35 | P1 | P2 | fixed | Keep embedding and hidden-state labels visibly distinct. |
| 20 | Decision Room | Logits | Raw Scoreboard | Probability Bars | 34/35 | P2 | P3 | fixed | Do not add decimals too small to read. |
| 21 | Decision Room | Softmax | Score to Probability | Probability Bars | 34/35 | P2 | P3 | fixed | Keep percentages readable and avoid truth-meter styling. |
| 22 | Decision Room | Sampling | Weighted Token Choice | Probability Bars | 34/35 | P1 | P3 | fixed | Selected token must not collide with bars. |
| 23 | The Day Repeats | Autoregression | Append and Repeat | Mechanism Flow | 33/35 | P3 | P3 | keep | Keep loop arrow obvious without crossing text. |
| 24 | The Day Repeats | Context Window | Temporary Context Window | Context Tray / Stack | 34/35 | P3 | P3 | keep | Cards must remain readable without many words. |
| 25 | The Day Repeats | RAG and Retrieval | Open-Book Retrieval | Context Tray / Stack | 34/35 | P3 | P3 | keep | Keep retriever and model visually separate. |
| 26 | The Day Repeats | Grounding | Claim Support Map | Context Tray / Stack | 32/35 | P2 | P3 | keep | Avoid too many source-card labels. |
| 27 | The Day Repeats | Hallucinations | Unsupported Bridge | Comparison Board | 32/35 | P2 | P3 | keep | Keep bridge metaphor from looking like a guarantee. |
| 28 | Twilight: The Wider Landscape | How AI Learns | Learning Modes Matrix | Comparison Board | 32/35 | P1 | P3 | fixed | Watch whether learners distinguish evaluation from the four visual modes using callouts. |
| 29 | Twilight: The Wider Landscape | Diffusion vs Autoregression | Append Or Denoise | Comparison Board | 32/35 | P3 | P3 | keep | Avoid image-like details that distract from mechanism contrast. |
| 30 | Twilight: The Wider Landscape | Multimodal AI | Media Lane Map | Taxonomy Map | 32/35 | P1 | P3 | fixed | Video and code are explained in callouts rather than added as extra labels. |
| 31 | Twilight: The Wider Landscape | The Perfect Storm | Storm Front | Taxonomy Map | 32/35 | P2 | P3 | fixed | Do not put the convergence caption inside the diagram. |
| 32 | Midnight Ledger | Collective Intelligence, Extracted | Borrowed Flames | Taxonomy Map | 31/35 | P1 | P3 | fixed | Later atmospheric image could improve warmth, but current coded flow is readable. |
| 33 | Midnight Ledger | Costs We Must Count | Cost Ledger | Taxonomy Map | 31/35 | P1 | P3 | fixed | Later atmospheric image could improve tone; no numbers should be added. |
| 34 | Midnight Ledger | Risk vs Myth | Risk Ledger | Taxonomy Map | 31/35 | P2 | P3 | keep | Avoid listing too many risks inside the visual. |
| 35 | New Dawn | Benefits Worth Taking Seriously | Benefit Tiers | Taxonomy Map | 31/35 | P1 | P3 | fixed | Later atmospheric image could add warmth, but current coded visual is readable. |
| 36 | New Dawn | Human-Centered AI | Accountability Flow | Taxonomy Map | 31/35 | P1 | P3 | fixed | Later atmospheric image could improve warmth, but current coded flow keeps accountability clear. |
| 37 | New Dawn | Better AI Is a Choice | Better-AI Control Panel | Taxonomy Map | 32/35 | P1 | P3 | fixed | Keep mitigation details in callouts, not inside the lever panel. |
| 38 | New Dawn | Effective Prompting from Model Literacy | Context Tray | Context Tray / Stack | 33/35 | P2 | P3 | keep | Keep card labels short and avoid overpacking the tray. |
| 39 | New Dawn | Model Literate Synthesis | Full Chain Map | Taxonomy Map | 31/35 | P1 | P3 | fixed | Ask testers if the capstone feels too abstract after simplification. |

## Top 10 Visuals To Watch During Human Testing

- Feature Vector (Vectors, 27/35): Distributed side may feel abstract; tester feedback should guide simplification.
- Tensor Block (Tensors, 27/35): Axis labels must stay outside crowded cells.
- Overfitting vs Generalization (Overfitting and Generalization, 28/35): Validation markers must remain readable at 320px.
- Text to Tokens (Tokenization, 30/35): Long token rows must wrap without horizontal overflow.
- MLP Feature Workshop (MLP, 30/35): Avoid adding feature names to the bars.
- Transformer Stack (Layers, 30/35): Keep block text short; no layer-by-layer story.
- Hidden State Flow (Hidden States, 30/35): Keep embedding and hidden-state labels visibly distinct.
- Alignment Landscape (Alignment, 31/35): Avoid morality imagery that makes the model seem conscious.
- Borrowed Flames (Collective Intelligence, Extracted, 31/35): Later atmospheric image could improve warmth, but current coded flow is readable.
- Cost Ledger (Costs We Must Count, 31/35): Later atmospheric image could improve tone; no numbers should be added.
