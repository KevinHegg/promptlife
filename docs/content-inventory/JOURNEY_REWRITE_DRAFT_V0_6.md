# Journey Rewrite Draft v0.6

Scope: first five lessons plus the RAG addendum draft requested during this pass. These are draft content blocks for later refinement.

## 1. What Is an LLM?

- Title: What Is an LLM?
- One-sentence definition: A large language model is a learned system that predicts likely next tokens from the context it can see.
- Where it happens: At ordinary use time, it sits between the current context and the next generated response token.
- Core explanation: When you send a prompt, the model does not look up a finished answer. It turns the visible context into numbers, runs those numbers through fixed learned weights, scores possible next tokens, selects one, appends it, and repeats.
- Why it matters: This lowers the mystery without shrinking the power: the system is not magic, but it is the result of enormous training that shaped many useful patterns.
- How it connects: Before the prompt arrives, training shapes the weights. Once the prompt arrives, inference uses those weights without normally changing them.
- Metaphor: A very large autocomplete engine with learned structure, not a mind or a database.
- Brain metaphor: Like a brain, many small signals can combine into useful patterns.
- Where the brain metaphor breaks: Unlike a brain, an LLM has no lived body, feelings, awareness, personal goals, or human understanding.
- Visual aid description: A single prompt card enters a model cloud. Arrows show fixed weights producing logits, softmax probabilities, one sampled token, and a loop back into context.
- Checkpoint question: Which statement best describes an LLM during ordinary use?
- Correct answer: It uses learned weights to predict and generate next tokens.
- Two incorrect answers: It becomes conscious while reading; It searches a private database for a complete answer
- Misconception addressed: Fluent text does not imply consciousness or database lookup.
- Glossary terms: prompt, response, token, weight, inference

## 2. Two AI Traditions

- Title: Two AI Traditions
- One-sentence definition: Symbolic AI uses explicit rules and symbols; deep learning learns patterns by adjusting many numerical weights.
- Where it happens: This distinction sits before the model path so learners know what kind of system an LLM mostly is.
- Core explanation: Some AI systems follow rules written by people. LLMs mostly come from deep learning: examples shape weights so the model can produce flexible language behavior without a hand-written rule for every sentence.
- Why it matters: It explains why LLMs can be fluent and adaptable but also hard to inspect with simple if-then rules.
- How it connects: The next lessons show how training creates the learned weights that replace many explicit rules.
- Metaphor: A rulebook beside a weather system of learned relationships.
- Brain metaphor: It is loosely like practice shaping future performance.
- Where the brain metaphor breaks: The model is not practicing with intention; optimization changes weights from data.
- Visual aid description: A split screen: one path follows rule cards, the other shows many small updates shaping a landscape.
- Checkpoint question: Which tradition best describes modern LLMs?
- Correct answer: Deep learning with learned weights.
- Two incorrect answers: A fixed handwritten rulebook; A spreadsheet macro
- Misconception addressed: LLMs are not programmed with one explicit rule for every answer.
- Glossary terms: symbolic AI, deep learning, training, weight

## 3. Training

- Title: Training
- One-sentence definition: Training is the durable process of updating weights from prediction error or another training signal.
- Where it happens: It happens before or outside ordinary prompting, usually on specialized infrastructure.
- Core explanation: During training, the model predicts a target, gets compared with the target, receives an error signal, and updates weights. Repeating this many times installs durable patterns into the model.
- Why it matters: Training is where capability gets built. It is different from a normal chat because the model itself changes.
- How it connects: Pretraining is broad training; fine-tuning is targeted training; inference uses the trained weights.
- Metaphor: Tuning an instrument before a performance.
- Brain metaphor: Repeated experience can shape later behavior.
- Where the brain metaphor breaks: The model is not reflecting on lessons; weights are adjusted by math.
- Visual aid description: A loop labeled predict, compare, loss, update weights, repeat, with the weight update highlighted.
- Checkpoint question: What makes training different from ordinary inference?
- Correct answer: Training can durably update model weights.
- Two incorrect answers: Training only reads the current context window; Training samples the final response token
- Misconception addressed: Normal inference is not the same as training.
- Glossary terms: training, weight, parameter, loss, inference

## 4. Pretraining

- Title: Pretraining
- One-sentence definition: Pretraining is broad early training that durably shapes a model across large datasets.
- Where it happens: It happens before a general model is released for everyday prompting.
- Core explanation: A pretrained language model has practiced next-token prediction across massive text mixtures. The point is not to save a perfect copy of every source; it is to adjust weights so useful language, factual, stylistic, and task patterns become available later.
- Why it matters: Pretraining explains why a model can respond across many topics before any specific campus or course customization.
- How it connects: Fine-tuning can later adapt this broad base toward particular response styles or domains.
- Metaphor: Billions of tiny nudges carving roads through a vast landscape.
- Brain metaphor: Like broad education only in the loose sense that earlier exposure affects later performance.
- Where the brain metaphor breaks: The model does not understand lessons like a person and does not reliably remember sources verbatim.
- Visual aid description: Data rain falls over a landscape, slowly carving durable paths labeled grammar, facts, style, tasks.
- Checkpoint question: During pretraining, what changes?
- Correct answer: Model weights change durably.
- Two incorrect answers: Only one chat context changes; The model writes a final response
- Misconception addressed: Pretraining is durable model shaping, not a live response.
- Glossary terms: pretraining, training, weight, inference

## 5. Fine-Tuning

- Title: Fine-Tuning
- One-sentence definition: Fine-tuning is targeted additional training after broad pretraining.
- Where it happens: It happens after pretraining and before or between deployment cycles.
- Core explanation: Fine-tuning uses examples, preferences, or domain data to make future responses more helpful, specialized, or aligned with a task. It may update many weights or add smaller adapter weights, but either way it is more durable than a prompt.
- Why it matters: This distinction helps institutions separate model customization from one-time prompting or retrieval.
- How it connects: After fine-tuning, ordinary inference uses the resulting model to process prompts without normally updating weights.
- Metaphor: Adding useful trails through an already huge terrain.
- Brain metaphor: A bit like coaching someone toward a style of performance.
- Where the brain metaphor breaks: The model is not adopting values or intentions; output patterns are being optimized.
- Visual aid description: A pretrained landscape with a highlighted trail labeled policy examples, domain examples, preference data.
- Checkpoint question: Which action is most like fine-tuning?
- Correct answer: Additional targeted training that changes future model behavior.
- Two incorrect answers: Adding one example to a prompt; Retrieving a PDF into context
- Misconception addressed: Fine-tuning is not the same as prompting or RAG.
- Glossary terms: fine-tuning, pretraining, weight, prompt, response

## Addendum. RAG and Retrieval

- Title: RAG and Retrieval
- One-sentence definition: Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model context before generating a response.
- Where it happens: During inference, before or during response generation. RAG usually does not change model weights.
- Core explanation: A plain LLM answers from learned weights and current context. A RAG system adds a retrieval step: it looks up relevant documents, passages, or database records, then gives those snippets to the model as part of the prompt/context. The response is still generated token by token.
- Why it matters: RAG helps explain many institutional AI systems without making the model sound magical. It can improve grounding, but it does not guarantee truth.
- How it connects: RAG depends on the context window. Retrieved text becomes input context, and the model still uses attention, hidden states, logits, softmax, sampling, and autoregression.
- Metaphor: Open-book exam. The model gets notes before answering.
- Brain metaphor: Like looking something up in a book or notes before answering a question.
- Where the brain metaphor breaks: A human can judge sources, remember what was read, and understand trust in richer ways. The model still generates likely response tokens from retrieved context and learned weights.
- Visual aid description: Three lanes: User prompt, retriever searches a document shelf, retrieved context cards enter a transparent context tray, and generated response tokens leave the model.
- Checkpoint question: What does RAG usually do?
- Correct answer: Retrieves outside information and places it into the current context.
- Two incorrect answers: Permanently updates the model weights.; Makes the model conscious of documents.
- Additional incorrect answer: Guarantees that every answer is true.
- Misconception addressed: RAG is retrieval plus context. It is not training, fine-tuning, permanent memory, omniscient file access, or a hallucination cure.
- Glossary terms: RAG, retrieval, context window, input context, prompt token, response token, grounding, citation, hallucination, inference, fine-tuning, training

