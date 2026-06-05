# Prompt Life Journey Review v0.13

Date: 2026-06-04

## Purpose

This is the whole-Journey curriculum review for Prompt Life v0.13. It checks the current app sequence after adding dedicated Grounding and Hallucinations cards. The goal is to identify what is essential for v1, what can stay as depth or ethics material, and what still needs source review before public-facing citation language.

## Review Rubric

- Essential: keep in the required learner path for v1.
- Deep: useful, but can be optional or deferred from the required path.
- Ethics: important wider-literacy material, but source review and careful framing are required before v1 publication.
- Keep: content is coherent enough for v1 candidate.
- Revise: keep the topic, but tighten or merge before v1.
- Defer: move out of the required v1 path unless there is room.
- Source needed: external source review needed before treating claims as publication-ready.
- Visual needed: current visual is placeholder or needs a dedicated polish pass before v1.

## Card Review

| # | Card | Section | Path | Core objective | Misconception target | Necessary for v1? | Recommendation | Source needed | Visual needed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | What Is an LLM? | Before Morning | Essential | Define an LLM as learned next-token prediction using context and weights. | LLM as conscious reader or database. | Yes | Keep | No | No | Strong opener. Keep concise and mechanism-first. |
| 2 | Rationalists vs Empiricists | Before Morning | Deep | Explain the rules-vs-learned-patterns background. | LLMs are hand-written rulebooks, or symbolic AI is obsolete. | Optional | Defer | No | No | Useful history, but not required for the day-in-the-life spine. |
| 3 | Training | Before Morning | Essential | Show durable weight updates from prediction error. | Ordinary chat automatically trains the model. | Yes | Keep | No | No | Core distinction is clear and foundational. |
| 4 | Pretraining | Before Morning | Essential | Explain broad first training that shapes general capability. | Pretraining means perfect recall of sources. | Yes | Keep | No | No | Keep, but avoid dataset-stat claims until source review. |
| 5 | Overfitting and Generalization | Before Morning | Deep | Separate memorization from transferable learned patterns. | Training performance equals real learning. | Optional | Defer | No | No | Valuable for academic audiences; may fit Deep path. |
| 6 | Fine-Tuning | Still Before Morning | Essential | Show targeted durable adaptation after pretraining. | Prompting once equals fine-tuning. | Yes | Keep | No | No | Essential for privacy and institutional-risk literacy. |
| 7 | Alignment | Still Before Morning | Deep | Explain behavior shaping without moral agency. | Aligned means morally good or fully trustworthy. | Yes, but compact | Keep | Yes | No | Keep in v1 candidate, with source review for method claims. |
| 8 | Inference | Prompt Arrives | Essential | Define ordinary use as a forward pass with fixed weights. | Normal chat trains the model. | Yes | Keep | No | No | Crucial bridge from training to live use. |
| 9 | Prompt vs Response | Prompt Arrives | Essential | Separate given prompt/context tokens from generated response tokens. | The model writes the whole response at once. | Yes | Keep | No | No | Strong canonical example. |
| 10 | Tokenization | Morning Commute | Essential | Show text becoming model-readable token chunks. | Tokens are always words or human concepts. | Yes | Keep | No | No | Keep before token IDs and embeddings. |
| 11 | Token IDs | Morning Commute | Essential | Show IDs as lookup keys into the embedding table. | The ID is the meaning. | Yes | Keep | No | No | Clean relationship to embedding. |
| 12 | Embeddings | Morning Commute | Essential | Define embedding as a learned starting vector. | Embedding as dictionary definition or memory. | Yes | Keep | No | No | Core distinction remains clear. |
| 13 | Vectors | Morning Commute | Essential | Make numerical feature lists legible. | Each dimension has a simple English label. | Yes | Keep | No | No | Keep simplified labels with caveat. |
| 14 | Tensors | Morning Commute | Essential | Show organized blocks of many vectors. | Tensor as mysterious object. | Yes | Keep | No | No | Keep mobile visual sparse. |
| 15 | Attention | Workday | Essential | Define weighted relevance between token positions. | Attention means human attention or caring. | Yes | Keep | No | No | Important core distinction; no hype language. |
| 16 | MLP | Workday | Essential | Explain per-token feature reshaping. | MLP reads across positions like attention. | Yes | Keep | No | No | Good companion to Attention. |
| 17 | Layers | Workday | Essential | Show repeated transformer blocks refining hidden states. | More layers means human-like thinking. | Optional | Defer | No | No | Can be compacted or folded into Hidden States for v1. |
| 18 | Hidden States | Workday | Essential | Define temporary context-shaped internal vectors. | Hidden states are permanent memory or thoughts. | Yes | Keep | No | No | Essential for embedding-vs-hidden-state distinction. |
| 19 | Logits | Decision Room | Essential | Define raw next-token scores. | Scores are already probabilities or truths. | Yes | Keep | No | No | Keep before Softmax. |
| 20 | Softmax | Decision Room | Essential | Show raw scores becoming probabilities. | Softmax guarantees truth. | Yes | Keep | No | No | Key for hallucination literacy. |
| 21 | Sampling | Decision Room | Essential | Explain choosing one next token from probabilities. | The model always picks the single best token. | Yes | Keep | No | No | Keep as noncompetitive probability insight. |
| 22 | Autoregression | The Day Repeats | Essential | Show next token, append, repeat. | The model generates the answer all at once. | Yes | Keep | No | No | Central day-in-the-life mechanism. |
| 23 | Context Window | The Day Repeats | Essential | Define temporary visible input, not memory. | Context window equals permanent memory. | Yes | Keep | No | No | Prepares learners for RAG. |
| 24 | RAG and Retrieval | The Day Repeats | Essential | Explain retrieval plus context, not training. | RAG is training, permanent memory, guaranteed truth, or consciousness. | Yes | Keep | Yes | No | Dedicated card is now correctly placed after Context Window. |
| 25 | Grounding | The Day Repeats | Essential | Explain tying responses to evidence. | Citation-looking text is automatically grounded. | Yes | Keep | Yes | No | New concise card. Good bridge from RAG to hallucination risk. |
| 26 | Hallucinations | The Day Repeats | Essential | Explain fluent unsupported output without implying intent. | Hallucination means lying or malice. | Yes | Keep | Yes | No | New concise card. Move before broader Risk vs Myth works well. |
| 27 | How AI Learns | Wider AI Literacy | Essential | Compare durable training, fine-tuning, retrieval, and temporary steering. | All behavior change is the same kind of learning. | Yes, but compact | Revise | Yes | No | With RAG/Grounding/Hallucinations split out, this can become a shorter recap. |
| 28 | Diffusion vs Autoregression | Wider AI Literacy | Essential | Separate denoising image-style generation from text autoregression. | All generative AI works the same way. | Optional | Defer | No | No | Important wider-literacy topic; can sit in Deep path for v1. |
| 29 | Multimodal AI | Wider AI Literacy | Essential | Explain multiple media types represented or processed together. | Multimodal means the model experiences media like a person. | Optional | Defer | No | No | Useful, but could be optional after the LLM spine. |
| 30 | The Perfect Storm | Wider AI Literacy | Essential | Explain why modern LLMs emerged from convergence. | One magic breakthrough created LLMs. | Optional | Defer | Yes | Yes | Keep as ethics/society expansion after source review. |
| 31 | Collective Intelligence, Extracted | Wider AI Literacy | Ethics | Name human-created source traces behind model capability. | The model created its abilities alone. | Optional | Keep in Ethics | Yes | Yes | Needs careful language around provenance, consent, and copyright. |
| 32 | Benefits Worth Taking Seriously | Wider AI Literacy | Essential | Separate bounded benefits from utopian hype. | Benefits require believing in utopia. | Optional | Keep in Ethics | Yes | Yes | Source tiers needed for demonstrated vs plausible benefits. |
| 33 | Costs We Must Count | Wider AI Literacy | Ethics | Count physical, social, cultural, and ethical costs. | Digital means weightless or cost-free. | Optional | Keep in Ethics | Yes | Yes | Source review required; avoid universal numbers. |
| 34 | Human-Centered AI | Wider AI Literacy | Ethics | Center dignity, learning, responsibility, relationships, and common good. | If AI is powerful, it should decide. | Optional | Keep in Ethics | Yes | Yes | Needs secular and faith-adjacent source plan before v1. |
| 35 | Better AI Is a Choice | Wider AI Literacy | Deep | Show design, governance, and institutional choices. | Harms are inevitable if the technology is useful. | Optional | Keep in Ethics | Yes | Yes | Good synthesis, but needs governance sources. |
| 36 | Effective Prompting from Model Literacy | Wider AI Literacy | Essential | Explain prompting as current-context design. | Prompting is magic wording or permanent teaching. | Yes | Keep | No | Yes | Good practical capstone. Could move closer to Context/RAG in v1. |
| 37 | Risk vs Myth | Final Stop | Essential | Separate practical harms from magical stories. | Fluency, privacy, and autonomy myths blur together. | Yes | Revise | Yes | No | With Hallucinations split out, tighten this into a broader sorting card. |
| 38 | Model Literate Synthesis | Final Stop | Essential | Synthesize mechanics with human consequences. | Fluency equals understanding or wisdom. | Yes | Keep | No | Yes | Strong final teach-back. Visual can get one more polish pass. |

## Whole-Journey Findings

1. The essential mechanism spine is strong: training changes weights, inference uses fixed weights, context is temporary, and generation is autoregressive.
2. RAG now has its own card and the follow-on Grounding/Hallucinations distinction is clearer.
3. The Journey is long at 38 cards. v1 should avoid making all cards feel equally required.
4. The Deep and Ethics/Society material is valuable for academic audiences, but it needs clear path labeling and source review.
5. How AI Learns should become a recap now that RAG, Grounding, and Hallucinations are dedicated cards.
6. Risk vs Myth should shift from covering hallucination basics to sorting practical risk from magical fear.

## v1 Candidate Structure

Recommended v1: keep the required path around 24 to 28 cards, keep all current material available, and label Deep/Ethics cards as optional paths rather than cutting them from the app.

