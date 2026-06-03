# Journey Architecture v0.7

This order keeps the day-in-the-life through-line while making missing academic concepts explicit. The Essential Path is the core mobile Journey; Deep Path cards can be expanded or toggled; Optional Side Tours widen literacy without interrupting the main prompt path.

| # | Lesson | Lesson id | Section | Path | Why here |
|---:|---|---|---|---|---|
| 1 | What Is an LLM? | what-is-llm | Before Morning | Essential Path | Opening frame. |
| 2 | Rationalists vs Empiricists | rationalists-empiricists | Before Morning | Optional Side Tour | Extends the opening definition into a history-of-ideas frame. |
| 3 | Symbolic AI vs Deep Learning | symbolic-vs-deep-learning | Before Morning | Essential Path | Grounds the rationalist/empiricist contrast in AI systems. |
| 4 | Training | training | Before Morning | Essential Path | Explains how deep learning gets learned patterns. |
| 5 | Pretraining | pretraining | Before Morning | Essential Path | A large-scale version of the training loop. |
| 6 | Overfitting and Generalization | overfitting-generalization | Before Morning | Deep Path | Adds nuance to pretraining. |
| 7 | Fine-Tuning | fine-tuning | Before Morning | Essential Path | Uses the pretrained base while managing generalization. |
| 8 | Alignment | alignment | Before Morning | Deep Path | A targeted use of fine-tuning and system design. |
| 9 | Inference | inference | Prompt Arrives | Essential Path | Uses the trained/fine-tuned/aligned model. |
| 10 | Prompt vs Response | prompt-response | Prompt Arrives | Essential Path | Makes the inference path concrete. |
| 11 | Tokenization | tokenization | Morning Commute | Essential Path | Applies the prompt/response distinction to text chunks. |
| 12 | Token IDs | token-ids | Morning Commute | Essential Path | Tokenization produced chunks. |
| 13 | Embeddings | embeddings | Morning Commute | Essential Path | Token IDs point to embedding rows. |
| 14 | Vectors | vectors | Morning Commute | Essential Path | Embeddings are vectors. |
| 15 | Tensors | tensors | Morning Commute | Essential Path | Vectors are individual rows or points. |
| 16 | Context Window | context-window | The Day Repeats | Essential Path | Tensors carry current token positions and features. |
| 17 | Attention | attention | Workday | Essential Path | The context window defines what positions attention can see. |
| 18 | MLP | mlp | Workday | Essential Path | Attention mixes relevant information. |
| 19 | Layers | layers | Workday | Essential Path | MLP and attention are pieces inside a layer. |
| 20 | Hidden States | hidden-states | Workday | Essential Path | Layers refine hidden states. |
| 21 | Logits | logits | Decision Room | Essential Path | Hidden states carry context-shaped information. |
| 22 | Softmax | softmax | Decision Room | Essential Path | Logits are raw scores. |
| 23 | Sampling | sampling | Decision Room | Essential Path | Softmax produced probabilities. |
| 24 | Autoregression | autoregression | The Day Repeats | Essential Path | Sampling selected one token. |
| 25 | RAG and Retrieval | rag-retrieval | The Day Repeats | Essential Path | Autoregression explains how response tokens are produced. |
| 26 | Grounding | grounding | The Day Repeats | Deep Path | RAG supplies retrieved context. |
| 27 | Hallucinations | hallucinations | Wider AI Literacy | Essential Path | Grounding shows how evidence can help. |
| 28 | Prompt Injection and Tool Risk | prompt-injection-tool-risk | Wider AI Literacy | Deep Path | Hallucinations are reliability failures; prompt injection is an adversarial context failure. |
| 29 | Diffusion vs Autoregression | diffusion | Wider AI Literacy | Optional Side Tour | After text-specific risks, this widens the landscape. |
| 30 | Multimodal AI | multimodal | Wider AI Literacy | Optional Side Tour | Diffusion showed a different media generation mechanism. |
| 31 | Effective Prompting From Model Literacy | effective-prompting | Wider AI Literacy | Essential Path | Multimodal systems still depend on context and representation. |
| 32 | Energy, Water, and Compute | energy-water-compute | Wider AI Literacy | Deep Path | Effective prompting focuses on current use; this lesson widens to infrastructure cost. |
| 33 | Human-Centered AI Ethics | human-centered-ai-ethics | Wider AI Literacy | Deep Path | Infrastructure costs raise stewardship questions. |
| 34 | Risk vs Myth | risk-myth | Final Stop | Essential Path | Human-centered ethics frames what institutions should protect. |
| 35 | Model Literate Synthesis | model-literate-synthesis | Final Stop | Essential Path | Risk vs Myth gives the practical stakes. |

## Path Summary

- Essential Path: 26 lessons.
- Deep Path: 6 lessons.
- Optional Side Tour: 3 lessons.

Recommended implementation strategy: first ship the Essential Path refinements, then add Deep Path cards as expandable academic depth, then decide which Optional Side Tours belong in Journey versus Play/Tours.

## Current App Lesson Mapping

| Current app id | Current title | v0.7 destination |
|---|---|---|
| what-is-llm | What Is an LLM? | what-is-llm |
| history | Symbolic AI vs Deep Learning | symbolic-vs-deep-learning |
| training | Training | training |
| pretraining | Pretraining | pretraining |
| fine-tuning | Fine-Tuning | fine-tuning |
| inference | Inference | inference |
| prompt-response | Prompt vs Response | prompt-response |
| tokens | Tokenization | tokenization |
| token-ids | Token IDs | token-ids |
| embeddings | Embeddings | embeddings |
| vectors | Vectors | vectors |
| tensors | Tensors | tensors |
| attention | Attention | attention |
| mlp | MLP | mlp |
| layers | Layers | layers |
| hidden-states | Hidden States | hidden-states |
| logits | Logits | logits |
| softmax | Softmax | softmax |
| sampling | Sampling | sampling |
| autoregression | Autoregression | autoregression |
| context-window | Context Window | context-window |
| rag-retrieval | RAG and Retrieval | rag-retrieval |
| how-ai-learns | How AI Learns | Split across training, fine-tuning, alignment, RAG, grounding, and effective prompting |
| diffusion | Diffusion vs Autoregression | diffusion |
| multimodal | Multimodal AI | multimodal |
| risk-myth | Risk vs Myth | risk-myth |
