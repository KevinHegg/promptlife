# Checkpoint Randomization Audit v0.16.1

Date: 2026-06-05

Purpose: audit every learner-facing answer-choice surface and confirm which ones should be randomized. Default rule: randomize single-choice answer lists unless order, sequence, grouping, matching, or token position is part of the learning objective.

Audit command:

```bash
npm run audit:answers
```

Audit seed: `promptlife:v0.16.1:audit-seed`

## Summary

- Total audited surfaces: 61
- Randomized surfaces: 45
- Excluded fixed-order surfaces: 16
- First correct answer position after audit-seed shuffle:
  - Position 1: 9
  - Position 2: 19
  - Position 3: 9
  - Position 4: 8

For multiple-correct token-pick exercises, `shuffled correct position(s)` lists all correct choices. The summary count uses the first correct position for each randomized surface.

## Representative Requirement

The required representative Journey checkpoints are covered below:

| Required checkpoint | Audit row | Shuffled correct position |
|---|---|---:|
| What Is an LLM? | `lesson:what-is-llm` | 2 |
| Training | `lesson:training` | 2 |
| Prompt vs Response | `lesson:prompt-response` | 2 |
| Tokenization | `lesson:tokens` | 2 |
| Attention | `lesson:attention` | 2 |
| Softmax | `lesson:softmax` | 2 |
| RAG and Retrieval | `lesson:rag-retrieval` | 3 |
| Grounding | `lesson:grounding` | 4 |
| Hallucinations | `lesson:hallucinations` | 4 |
| Costs We Must Count | `lesson:costs-we-must-count` | 1 |
| Human-Centered AI | `lesson:human-centered-ai` | 2 |
| Model Literate Synthesis | `lesson:model-literate-synthesis` | 2 |

Manual browser QA additionally checked:

- Learn mode: Rationalists vs Empiricists and Training.
- Preview mode: Prompt vs Response.
- Review mode: What Is an LLM?
- Prompt Run exercise: Hidden State.

## Full Audit Table

| id | activity | type | choices | original correct position(s) | randomized | shuffled correct position(s) | notes |
|---|---|---|---:|---|---|---|---|
| `lesson:what-is-llm` | What Is an LLM? | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:history` | Rationalists vs Empiricists | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:training` | Training | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:pretraining` | Pretraining | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:overfitting-generalization` | Overfitting and Generalization | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:fine-tuning` | Fine-Tuning | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:alignment` | Alignment | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:inference` | Inference | Journey checkpoint | 4 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:prompt-response` | Prompt vs Response | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:tokens` | Tokenization | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:token-ids` | Token IDs | Journey checkpoint | 4 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:embeddings` | Embeddings | Journey checkpoint | 4 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:vectors` | Vectors | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:tensors` | Tensors | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:attention` | Attention | Journey checkpoint | 3 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:mlp` | MLP | Journey checkpoint | 3 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:layers` | Layers | Journey checkpoint | 3 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:hidden-states` | Hidden States | Journey checkpoint | 3 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:logits` | Logits | Journey checkpoint | 3 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:softmax` | Softmax | Journey checkpoint | 3 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:sampling` | Sampling | Journey checkpoint | 3 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:autoregression` | Autoregression | Journey checkpoint | 3 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:context-window` | Context Window | Journey checkpoint | 3 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:rag-retrieval` | RAG and Retrieval | Journey checkpoint | 4 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:grounding` | Grounding | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:hallucinations` | Hallucinations | Journey checkpoint | 4 | 1 | yes | 4 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:how-ai-learns` | How AI Learns | Journey checkpoint | 3 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:diffusion` | Diffusion vs Autoregression | Journey checkpoint | 3 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:multimodal` | Multimodal AI | Journey checkpoint | 3 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:perfect-storm` | The Perfect Storm | Journey checkpoint | 4 | 1 | yes | 3 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:collective-intelligence` | Collective Intelligence, Extracted | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:costs-we-must-count` | Costs We Must Count | Journey checkpoint | 4 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:risk-myth` | Risk vs Myth | Journey checkpoint | 3 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:benefits-worth-taking-seriously` | Benefits Worth Taking Seriously | Journey checkpoint | 4 | 1 | yes | 1 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:human-centered-ai` | Human-Centered AI | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:better-ai-choice` | Better AI Is a Choice | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:effective-prompting-literacy` | Effective Prompting from Model Literacy | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `lesson:model-literate-synthesis` | Model Literate Synthesis | Journey checkpoint | 4 | 1 | yes | 2 | Correctness follows answer identity, not A/B/C/D position. |
| `exercise:prompt-or-response-label` | Prompt or Response? | label-tokens | 2 | n/a | no | n/a | Fixed. Token sequence/context order is meaningful. |
| `exercise:pick-next-token` | Pick the Next Token | next-token-pick | 6 | 1, 2, 3 | yes | 1, 4, 5 | Correctness follows item id. |
| `exercise:durable-or-temporary` | Durable or Temporary? | sort-buckets | 9 | n/a | no | n/a | Fixed. Learner sorts into buckets. |
| `exercise:attention-relevance` | Attention Is Relevance | connect-nodes | 10 | 7 | no | n/a | Fixed. Not a single-choice answer list. |
| `exercise:context-window-fell-out` | Context Window: What Fell Out? | tap-choice | 4 | 1, 2 | yes | 2, 3 | Correctness follows item id. |
| `exercise:training-nudge` | Training Nudge | toggle-state | 2 | 1 | no | n/a | Fixed. Not a single-choice answer list. |
| `exercise:softmax-funnel` | Softmax Funnel | tap-choice | 4 | 1 | yes | 4 | Correctness follows item id. |
| `exercise:mlp-feature-reshape` | MLP Feature Reshape | toggle-state | 2 | 2 | no | n/a | Fixed. Not a single-choice answer list. |
| `exercise:open-book-or-learned` | Open Book or Learned? | sort-buckets | 8 | n/a | no | n/a | Fixed. Learner sorts into buckets. |
| `exercise:brain-metaphor-boundary` | Brain Metaphor Boundary | tap-multiple | 7 | n/a | no | n/a | Fixed. Multi-select grouping is clearer in authored order. |
| `prompt-run:prompt-run-prompt-response` | Prompt or Response? | label-tokens | 1 | n/a | no | n/a | Fixed. Token sequence/context order is meaningful. |
| `prompt-run:prompt-run-tokenizer` | Tokenizer | label-tokens | 1 | n/a | no | n/a | Fixed. Token sequence/context order is meaningful. |
| `prompt-run:prompt-run-token-ids` | Token IDs | drag-match | 7 | n/a | no | n/a | Fixed. Learner matches paired items. |
| `prompt-run:prompt-run-embedding` | Embedding Lookup | drag-match | 7 | n/a | no | n/a | Fixed. Learner matches paired items. |
| `prompt-run:prompt-run-tensor` | Tensor Stack | drag-order | 3 | n/a | no | n/a | Fixed. Order is the learning objective. |
| `prompt-run:prompt-run-attention` | Attention | connect-nodes | 10 | 7 | no | n/a | Fixed. Not a single-choice answer list. |
| `prompt-run:prompt-run-mlp` | MLP Feature Reshape | drag-match | 5 | n/a | no | n/a | Fixed. Learner matches paired items. |
| `prompt-run:prompt-run-hidden-state` | Hidden State | tap-choice | 3 | 1 | yes | 2 | Correctness follows item id. |
| `prompt-run:prompt-run-logits` | Logits | tap-choice | 4 | 1 | yes | 4 | Correctness follows item id. |
| `prompt-run:prompt-run-softmax` | Softmax Funnel | tap-choice | 4 | 1 | yes | 3 | Correctness follows item id. |
| `prompt-run:prompt-run-sampling` | Sampling | next-token-pick | 6 | 1, 2, 3 | yes | 3, 4, 5 | Correctness follows item id. |
| `prompt-run:prompt-run-append-repeat` | Append and Repeat | drag-order | 4 | n/a | no | n/a | Fixed. Order is the learning objective. |
| `prompt-run:prompt-run-final-order` | Put the Run in Order | drag-order | 12 | n/a | no | n/a | Fixed. Order is the learning objective. |
