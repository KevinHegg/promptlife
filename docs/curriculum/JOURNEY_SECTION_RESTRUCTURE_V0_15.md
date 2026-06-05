# Journey Section Restructure v0.15

Date: 2026-06-05

## Purpose

v0.15 strengthens the "day in the life of a prompt" through-line. The previous ending was too broad: one final Wider AI Literacy section held technical side tours, risk literacy, social costs, benefits, ethics, prompting, and synthesis. This pass keeps the same 38 Journey cards but gives the late day a clearer narrative arc.

## Old Six-Section Structure

| # | Old section | Role |
|---|---|---|
| 1 | Before Morning | Model shaping before ordinary use |
| 2 | Morning Commute | Prompt arrival plus token/vector/tensor pipeline |
| 3 | Workday | Attention, MLPs, layers, hidden states |
| 4 | Decision Room | Logits, softmax, sampling |
| 5 | The Day Repeats | Autoregression, context, RAG, grounding, hallucinations |
| 6 | Wider AI Literacy | All remaining side tours, risks, costs, benefits, ethics, prompting, and synthesis |

## New Eight-Section Structure

| # | New section | Description | Focus | Keep clear |
|---|---|---|---|---|
| 1 | Before Morning | The model is shaped before your prompt arrives. | How weights are shaped before ordinary use. | Training changes weights; inference uses them. |
| 2 | Morning Commute | Text becomes tokens, IDs, vectors, and tensors. | How text becomes numbers. | Tokens are chunks; IDs are lookup numbers. |
| 3 | Workday | Transformer layers process the current context. | How transformer layers process the current context. | Attention is relevance, not awareness. |
| 4 | Decision Room | The model scores and chooses one next token. | How one next token is chosen. | Probabilities are not truth guarantees. |
| 5 | The Day Repeats | Response tokens accumulate; context expands and expires. | How responses grow and context changes. | Context is temporary, not permanent memory. |
| 6 | Twilight: The Wider Landscape | The day widens into other AI systems and why LLMs arrived now. | How LLMs fit into the larger AI landscape. | Not all generative AI works the same way. |
| 7 | Midnight Ledger | Count the costs, shadows, and debts honestly. | What costs and debts must be counted. | The answer feels weightless; the infrastructure is not. |
| 8 | New Dawn | Use model literacy to choose better human-centered futures. | How humans choose better uses. | Fluency is not wisdom; humans remain responsible. |

## Why Wider AI Literacy Was Split

The old final section did too many jobs. It mixed mechanism comparisons, social origin stories, infrastructure costs, institutional risks, human-centered values, prompting practice, and synthesis. The new structure keeps the day metaphor active:

- Twilight handles the wider technical landscape and historical arrival of LLMs.
- Midnight Ledger handles extraction, costs, practical risk, and institutional shadows without doom language.
- New Dawn handles benefits, human-centered choices, responsible design, prompting practice, and synthesis without hype.

## Card Reassignment Table

| New section | Cards |
|---|---|
| Before Morning | What Is an LLM?; Rationalists vs Empiricists; Training; Pretraining; Overfitting and Generalization; Fine-Tuning; Alignment |
| Morning Commute | Inference; Prompt vs Response; Tokenization; Token IDs; Embeddings; Vectors; Tensors |
| Workday | Attention; MLP; Layers; Hidden States |
| Decision Room | Logits; Softmax; Sampling |
| The Day Repeats | Autoregression; Context Window; RAG and Retrieval; Grounding; Hallucinations |
| Twilight: The Wider Landscape | How AI Learns; Diffusion vs Autoregression; Multimodal AI; The Perfect Storm |
| Midnight Ledger | Collective Intelligence, Extracted; Costs We Must Count; Risk vs Myth |
| New Dawn | Benefits Worth Taking Seriously; Human-Centered AI; Better AI Is a Choice; Effective Prompting from Model Literacy; Model Literate Synthesis |

No new Journey cards were added in this pass. A dedicated Prompt Injection / Tool Risk card remains a possible future card because it did not already exist as a standalone card.

## Section Link Behavior

- The Journey timeline is now a set of real buttons.
- Each button shows a section number, section name, and short hint.
- Tapping a section scrolls inside the app's scroll container to that Journey section.
- The active stage state updates when a section link is tapped.
- Reduced-motion preferences are respected.
- Empty sections are hidden under filters, and their stage links are hidden too.
- The Return to Journey action from Preview/Review mode returns near the current lesson's section when practical.

Learner-facing hint:

> Jump to a stage of the prompt's day.

## Glossary Grouping Update

Glossary Learning path grouping now uses:

- Before Morning
- Morning Commute
- Workday
- Decision Room
- The Day Repeats
- Twilight: The Wider Landscape
- Midnight Ledger
- New Dawn
- Related AI literacy terms

The grouping is still derived from the first lesson where a term is introduced. Terms that do not map clearly to a Journey card fall back to Related AI literacy terms.

## Known Open Questions

- A future source-review pass should strengthen Midnight Ledger and New Dawn claims before v1 publication.
- A future security pass may add a dedicated Prompt Injection / Tool Risk card rather than keeping those ideas inside Risk vs Myth.
- Badge progress could eventually show Essential, Deep, and Ethics progress separately.
