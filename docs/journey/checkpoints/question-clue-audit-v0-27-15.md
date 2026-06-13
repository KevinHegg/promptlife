# Prompt Life v0.27.15 Question Clue Audit

Generated: 2026-06-13T17:13:15.673Z

This audit is informational. It flags correct answers that repeat mechanism terms from the stem, plus length and vague-stem warnings. The v0.27.15 repair log records which candidates were changed or intentionally retained.

## Summary

- Term-echo candidates: 36
- Repair-log candidates reviewed: 38
- Answer-length warnings: 43
- Vague-stem warnings: 0

## Term-Echo Candidates

- Where LLMs Fit / v0279-where-llms-fit-q1: `denoising`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Rationalists vs Empiricists / v0279-history-q2: `loss`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Training / v0279-training-q1: `training`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Training / v0279-training-q3: `training`, `inference`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Alignment / v02710-alignment-q2: `alignment`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Prompt vs Response / v02710-prompt-response-q1: `prompt`, `response tokens`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Prompt vs Response / v02710-prompt-response-q3: `response`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Tokenization / v02710-tokens-q2: `text`, `tokens`, `embeddings`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Token IDs / v02710-token-ids-q2: `meaning`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Embeddings / v02712-embeddings-q1: `vector`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Embeddings / v02712-embeddings-q2: `vector`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Tensors / v02712-tensors-q1: `tensor`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Tensors / v02712-tensors-q2: `weight`, `activation`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Attention / v02712-attention-q2: `attention`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Attention / v02712-attention-q3: `attention`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Layers / v02712-layers-q2: `layer`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Hidden States / v02712-hidden-states-q4: `hidden states`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Logits / v02712-logits-q2: `logit`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Logits / v02712-logits-q3: `logits`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Softmax / v02712-softmax-q2: `probability`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Softmax / v02712-softmax-q3: `logits`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Sampling / v02712-sampling-q4: `sampling`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Context Window / v02712-context-window-q2: `memory`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Grounding / v02712-grounding-q3: `citation`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Grounding / v02712-grounding-q4: `grounding`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Hallucinations / v02712-hallucinations-q3: `hallucination`, `lying`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Diffusion vs Autoregression / v02712-diffusion-q1: `diffusion`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- The Perfect Storm / v02712-perfect-storm-q2: `incentives`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Collective Intelligence, Extracted / v02712-collective-intelligence-q3: `pretraining`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Costs We Must Count / v02712-costs-we-must-count-q3: `costs`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Risk vs Myth / v02712-risk-myth-q2: `tool`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Risk vs Myth / v02712-risk-myth-q3: `hallucination`, `lying`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Risk vs Myth / v02712-risk-myth-q4: `risk`, `myth`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Benefits Worth Taking Seriously / v02712-benefits-worth-taking-seriously-q3: `benefits`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Effective Prompting from Model Literacy / v02712-effective-prompting-literacy-q3: `citation`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.
- Model Literate Synthesis / v02712-model-literate-synthesis-q1: `prompt`; retained; Retained because the term is necessary for a fair mechanism or boundary distinction, or distractors use the same nearby vocabulary.

## Answer-Length Warnings

- Training / v0279-training-q2: correct 79 chars; wrong-choice average 57 chars.
- Pretraining / v0279-pretraining-q3: correct 78 chars; wrong-choice average 53 chars.
- Overfitting and Generalization / v0279-overfitting-generalization-q2: correct 81 chars; wrong-choice average 60 chars.
- Fine-Tuning / v02712-fine-tuning-q1: correct 103 chars; wrong-choice average 43 chars.
- Alignment / v02710-alignment-q2: correct 84 chars; wrong-choice average 59 chars.
- Prompt vs Response / v02710-prompt-response-q3: correct 78 chars; wrong-choice average 57 chars.
- Embeddings / v02712-embeddings-q2: correct 79 chars; wrong-choice average 57 chars.
- Vectors / v02712-vectors-q1: correct 69 chars; wrong-choice average 47 chars.
- Vectors / v02712-vectors-q2: correct 63 chars; wrong-choice average 42 chars.
- Tensors / v02712-tensors-q1: correct 59 chars; wrong-choice average 39 chars.
- MLP / v02712-mlp-q2: correct 69 chars; wrong-choice average 45 chars.
- Layers / v02712-layers-q2: correct 65 chars; wrong-choice average 46 chars.
- Layers / v02712-layers-q4: correct 73 chars; wrong-choice average 49 chars.
- Hidden States / v02712-hidden-states-q1: correct 66 chars; wrong-choice average 46 chars.
- Logits / v02712-logits-q3: correct 76 chars; wrong-choice average 55 chars.
- Softmax / v02712-softmax-q2: correct 68 chars; wrong-choice average 47 chars.
- Sampling / v02712-sampling-q2: correct 71 chars; wrong-choice average 50 chars.
- Sampling / v02712-sampling-q3: correct 79 chars; wrong-choice average 56 chars.
- Autoregression / v02712-autoregression-q1: correct 72 chars; wrong-choice average 49 chars.
- RAG and Retrieval / v02712-rag-retrieval-q3: correct 69 chars; wrong-choice average 48 chars.
- Grounding / v02712-grounding-q2: correct 63 chars; wrong-choice average 39 chars.
- How AI Learns / v02712-how-ai-learns-q5: correct 72 chars; wrong-choice average 46 chars.
- The Perfect Storm / v02712-perfect-storm-q4: correct 81 chars; wrong-choice average 48 chars.
- Costs We Must Count / v02712-costs-we-must-count-q1: correct 82 chars; wrong-choice average 49 chars.
- Costs We Must Count / v02712-costs-we-must-count-q3: correct 57 chars; wrong-choice average 38 chars.
- Costs We Must Count / v02712-costs-we-must-count-q4: correct 78 chars; wrong-choice average 49 chars.
- Risk vs Myth / v02712-risk-myth-q1: correct 76 chars; wrong-choice average 51 chars.
- Risk vs Myth / v02712-risk-myth-q2: correct 66 chars; wrong-choice average 44 chars.
- Risk vs Myth / v02712-risk-myth-q4: correct 85 chars; wrong-choice average 51 chars.
- Benefits Worth Taking Seriously / v02712-benefits-worth-taking-seriously-q1: correct 93 chars; wrong-choice average 52 chars.
- Benefits Worth Taking Seriously / v02712-benefits-worth-taking-seriously-q2: correct 88 chars; wrong-choice average 42 chars.
- Benefits Worth Taking Seriously / v02712-benefits-worth-taking-seriously-q3: correct 60 chars; wrong-choice average 42 chars.
- Human-Centered AI / v02712-human-centered-ai-q2: correct 90 chars; wrong-choice average 45 chars.
- Better AI Is a Choice / v02712-better-ai-choice-q1: correct 73 chars; wrong-choice average 48 chars.
- Better AI Is a Choice / v02712-better-ai-choice-q2: correct 75 chars; wrong-choice average 37 chars.
- Better AI Is a Choice / v02712-better-ai-choice-q4: correct 77 chars; wrong-choice average 49 chars.
- Effective Prompting from Model Literacy / v02712-effective-prompting-literacy-q2: correct 71 chars; wrong-choice average 45 chars.
- Effective Prompting from Model Literacy / v02712-effective-prompting-literacy-q3: correct 72 chars; wrong-choice average 49 chars.
- Effective Prompting from Model Literacy / v02712-effective-prompting-literacy-q4: correct 87 chars; wrong-choice average 49 chars.
- Model Literate Synthesis / v02712-model-literate-synthesis-q1: correct 115 chars; wrong-choice average 74 chars.
- Model Literate Synthesis / v02712-model-literate-synthesis-q2: correct 74 chars; wrong-choice average 52 chars.
- Model Literate Synthesis / v02712-model-literate-synthesis-q4: correct 89 chars; wrong-choice average 53 chars.
- Model Literate Synthesis / v02712-model-literate-synthesis-q5: correct 101 chars; wrong-choice average 52 chars.

## Vague-Stem Warnings

None.

