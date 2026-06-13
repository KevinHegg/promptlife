# Prompt Life Visual Aid Readiness Rubric v0.28.0

Generated: 2026-06-13T17:11:29.401Z

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

- Atmospheric Scene: 9
- Taxonomy Map: 6
- Comparison Board: 8
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
| 7 | Before Morning | Fine-Tuning | Fine-Tuning Path | Atmospheric Scene | 27/35 | P1 | P2 | temporary | Tester should check whether the metaphor needs a stronger coded comparison later. |
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
| 28 | Twilight: The Wider Landscape | How AI Learns | Learning Modes Matrix | Comparison Board | 26/35 | P1 | P2 | temporary | Watch whether matrix labels feel too small at 320px. |
| 29 | Twilight: The Wider Landscape | Diffusion vs Autoregression | Append Or Denoise | Comparison Board | 32/35 | P3 | P3 | keep | Avoid image-like details that distract from mechanism contrast. |
| 30 | Twilight: The Wider Landscape | Multimodal AI | Media Lane Map | Taxonomy Map | 26/35 | P1 | P2 | temporary | Reduce nodes later if testers call it busy. |
| 31 | Twilight: The Wider Landscape | The Perfect Storm | Storm Front | Atmospheric Scene | 29/35 | P2 | P2 | temporary | Do not put the convergence caption inside the diagram. |
| 32 | Midnight Ledger | Collective Intelligence, Extracted | Borrowed Flames | Atmospheric Scene | 25/35 | P1 | P2 | temporary | Avoid cramming source labels; social meaning belongs in callouts. |
| 33 | Midnight Ledger | Costs We Must Count | Cost Ledger | Atmospheric Scene | 25/35 | P1 | P2 | temporary | No fake statistics; keep categories in HTML. |
| 34 | Midnight Ledger | Risk vs Myth | Risk Ledger | Taxonomy Map | 31/35 | P2 | P3 | keep | Avoid listing too many risks inside the visual. |
| 35 | New Dawn | Benefits Worth Taking Seriously | Benefit Tiers | Atmospheric Scene | 25/35 | P1 | P2 | temporary | Avoid implying all benefits are proven or automatic. |
| 36 | New Dawn | Human-Centered AI | Accountability Flow | Atmospheric Scene | 25/35 | P1 | P2 | temporary | Avoid generic AI-person imagery that implies the model has agency. |
| 37 | New Dawn | Better AI Is a Choice | Better-AI Control Panel | Taxonomy Map | 26/35 | P1 | P2 | temporary | Panel may feel dense; testers should flag unreadable lever labels. |
| 38 | New Dawn | Effective Prompting from Model Literacy | Context Tray | Context Tray / Stack | 33/35 | P2 | P3 | keep | Keep card labels short and avoid overpacking the tray. |
| 39 | New Dawn | Model Literate Synthesis | Full Chain Map | Taxonomy Map | 24/35 | P1 | P2 | temporary | This is the top later-coded redesign candidate; testers should flag overload. |

## Top 10 Visuals To Watch During Human Testing

- Full Chain Map (Model Literate Synthesis, 24/35): This is the top later-coded redesign candidate; testers should flag overload.
- Borrowed Flames (Collective Intelligence, Extracted, 25/35): Avoid cramming source labels; social meaning belongs in callouts.
- Cost Ledger (Costs We Must Count, 25/35): No fake statistics; keep categories in HTML.
- Benefit Tiers (Benefits Worth Taking Seriously, 25/35): Avoid implying all benefits are proven or automatic.
- Accountability Flow (Human-Centered AI, 25/35): Avoid generic AI-person imagery that implies the model has agency.
- Learning Modes Matrix (How AI Learns, 26/35): Watch whether matrix labels feel too small at 320px.
- Media Lane Map (Multimodal AI, 26/35): Reduce nodes later if testers call it busy.
- Better-AI Control Panel (Better AI Is a Choice, 26/35): Panel may feel dense; testers should flag unreadable lever labels.
- Fine-Tuning Path (Fine-Tuning, 27/35): Tester should check whether the metaphor needs a stronger coded comparison later.
- Feature Vector (Vectors, 27/35): Distributed side may feel abstract; tester feedback should guide simplification.
