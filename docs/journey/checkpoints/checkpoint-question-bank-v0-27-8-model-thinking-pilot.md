# Prompt Life 0.27.8-model-thinking-pilot

Status: pilot-only, not live.

## Executive Summary

- pilotScope: First six Journey learning cards only.
- pilotLearningCards: 6
- totalPilotQuestions: 18
- totalChoices: 72
- totalDistractors: 54
- modelThinkingQuestions: 18
- directDefinitionQuestions: 0
- modelThinkingPercent: 100
- directDefinitionPercent: 0
- draftStatus: pilot-only, not live
- glossaryTermsAvailable: 134

## Authoring Standard

From questions about the curriculum to questions that make the learner think through what the model is doing.

## Deep Research Review

No Deep Research review file was present in docs/journey/checkpoints at generation time.

## Before / After Examples
- What Is an LLM?: "Which description best fits What Is an LLM in this learning card?" -> "When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?"
- Where LLMs Fit: "Which statement best explains Where LLMs Fit in this learning card?" -> "A campus tool summarizes text with an LLM and another tool creates images by denoising noise. What does that comparison show?"
- Rationalists vs Empiricists: "Which phrase best describes how LLMs use learned patterns rather than only hand-written rules?" -> "If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?"
- Training: "What makes training different from inference?" -> "During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?"
- Pretraining: "During pretraining, what changes?" -> "During pretraining, what signal teaches the model broad language patterns across many examples?"
- Overfitting and Generalization: "Which is a sign of overfitting in Overfitting and Generalization?" -> "A model gets every training example right but fails on new validation examples. What problem is showing up?"

## What Is an LLM?

Stage: 1. Before Morning

### Learning Objective Review

Primary: Reason that an LLM generates response tokens by using learned weights and current context, without implying awareness or perfect search.

Secondary:
- Distinguish fluent generated behavior from conscious understanding.
- Separate inference from training and search/database retrieval.
- Connect prompt, response, token, weight, and inference in one model-centered trace.

Model mechanism/boundary: Inference uses fixed learned weights and temporary context to score, sample, append, and repeat next tokens.

Myths/misconceptions:
- A fluent LLM must be conscious.
- An LLM is a database or search engine that knows every file.
- A normal prompt durably teaches the model new weights.

Related glossary terms: llm, prompt, response, token, weight, inference
Nearby distractor terms: training, retrieval, memory, context window, probability

### Existing v0.27.7 Draft Questions

- draft-what-is-llm-q1: Which description best fits What Is an LLM in this learning card?
  - classification: revise
  - rationale: The v0.27.7 stem is too curriculum-centered or definition-like; it should make the learner reason through model behavior.
- draft-what-is-llm-q2: Which mechanism or distinction does What Is an LLM? most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.

### Rewritten v0.27.8 Pilot Questions

#### pilot-what-is-llm-q1

Type: mechanism in action
Authoring category: mechanism
Stem: When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?
Correct choice ID: pilot-what-is-llm-q1-correct

- pilot-what-is-llm-q1-correct (correct): Using learned weights and current context to score possible next tokens, choose one, append it, and run again.
  - feedback: Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.
- pilot-what-is-llm-q1-conscious-reader: Reading the prompt with conscious understanding before writing a complete answer.
  - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
  - represented misconception: conscious mind vs fluent model behavior
  - represented glossary term: llm
  - distractor source: same-card
  - rationale: Tempting because fluent text can sound like a human explanation.
- pilot-what-is-llm-q1-search-database: Searching all documents it has ever seen and copying the best passage.
  - feedback: This choice reveals a common mix-up. A plain LLM generates from learned patterns and current context; retrieval is an added system step.
  - represented misconception: search engine/database vs generative model
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - rationale: Tempting because people often equate broad model knowledge with search.
- pilot-what-is-llm-q1-training-chat: Changing its weights every time the user sends a prompt.
  - feedback: That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.
  - represented misconception: training vs inference
  - represented glossary term: training
  - distractor source: same-card
  - rationale: Tempting because the model appears to adapt within a conversation.

Authoring notes:
- why it helps: Learners trace the actual score-sample-append loop instead of naming the card.
- badge mastery: Supports the core badge distinction between inference, training, context, and next-token generation.
- review status: remain after human review

#### pilot-what-is-llm-q2

Type: misconception diagnosis
Authoring category: human-use-judgment
Stem: A model gives a fluent explanation of a poem. What is the safest model-centered interpretation?
Correct choice ID: pilot-what-is-llm-q2-correct

- pilot-what-is-llm-q2-correct (correct): It generated likely response tokens from context and learned patterns; fluency does not prove awareness.
  - feedback: Insight strengthened. This is the fluent-without-awareness boundary Prompt Life wants learners to hold.
- pilot-what-is-llm-q2-inner-experience: It must have inner experience because the explanation sounds human.
  - feedback: Not quite. The model can imitate explanation without being a human reasoner.
  - represented misconception: conscious mind vs fluent model behavior
  - represented glossary term: llm
  - distractor source: same-card
  - rationale: Tempting because human-like language invites human-like interpretation.
- pilot-what-is-llm-q2-hidden-database: It looked up a hidden database record that contains the perfect interpretation.
  - feedback: Close, but this describes retrieval or search better than a plain LLM forward pass.
  - represented misconception: database lookup vs learned generation
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - rationale: Tempting because polished answers can feel copied from a stored source.
- pilot-what-is-llm-q2-permanent-learning: The prompt permanently taught the model a new literary skill during that chat.
  - feedback: That would require training. In a normal chat, the prompt can shape temporary context without durably updating weights.
  - represented misconception: prompt/context change vs durable weight update
  - represented glossary term: weight-update
  - distractor source: same-card
  - rationale: Tempting because the model may use earlier context in the same conversation.

Authoring notes:
- why it helps: Learners evaluate a real human interpretation trap: fluent output without inner awareness.
- badge mastery: Supports demystification without hype or fear.
- review status: remain after human review

## Where LLMs Fit

Stage: 1. Before Morning

### Learning Objective Review

Primary: Use the AI family map to reason about what kind of generative system an LLM is and what it is not.

Secondary:
- Distinguish AI, machine learning, deep learning, generative AI, LLMs, diffusion models, and symbolic AI.
- Avoid treating all AI or all generative AI as ChatGPT-like LLMs.
- Recognize that different generative systems can produce different media through different mechanisms.

Model mechanism/boundary: LLMs are deep-learning generative AI systems focused on language/code; diffusion is a different generative family.

Myths/misconceptions:
- All AI systems are LLMs.
- All generative AI works like ChatGPT.
- AI and machine learning are interchangeable labels.

Related glossary terms: ai, machine-learning, deep-learning, generative-ai, llm, diffusion, multimodal, symbolic-ai, rule-based-ai, foundation-model
Nearby distractor terms: rationalism, empiricism, loss, training

### Existing v0.27.7 Draft Questions

- draft-where-llms-fit-q1: Which statement best explains Where LLMs Fit in this learning card?
  - classification: revise
  - rationale: The v0.27.7 stem is too curriculum-centered or definition-like; it should make the learner reason through model behavior.
- draft-where-llms-fit-q2: Which mechanism or distinction does Where LLMs Fit most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.

### Rewritten v0.27.8 Pilot Questions

#### pilot-where-llms-fit-q1

Type: applied scenario
Authoring category: application
Stem: A campus tool summarizes text with an LLM and another tool creates images by denoising noise. What does that comparison show?
Correct choice ID: pilot-where-llms-fit-q1-correct

- pilot-where-llms-fit-q1-correct (correct): Both can be generative AI, but the LLM focuses on language/code while diffusion often generates by denoising media.
  - feedback: Good distinction. Generative AI is a family; LLMs and diffusion models are different branches.
- pilot-where-llms-fit-q1-all-chatgpt: Both tools are LLMs because all generative AI works like ChatGPT.
  - feedback: Not quite. An LLM is one kind of generative AI, not the whole category.
  - represented misconception: LLM vs generative AI family
  - represented glossary term: generative-ai
  - distractor source: same-card
  - rationale: Tempting because ChatGPT is many learners’ first example of generative AI.
- pilot-where-llms-fit-q1-text-only-ai: The image tool is not AI unless it generates text tokens.
  - feedback: Close, but diffusion models can be AI without using the LLM next-token text loop.
  - represented misconception: LLM output vs broader generative outputs
  - represented glossary term: diffusion
  - distractor source: same-card
  - rationale: Tempting because this app starts with language models.
- pilot-where-llms-fit-q1-ai-ml-same: Machine learning and AI mean exactly the same thing, so the categories do not matter.
  - feedback: This choice collapses useful categories. Machine learning is a major branch inside the broader AI landscape.
  - represented misconception: AI vs machine learning category boundary
  - represented glossary term: machine-learning
  - distractor source: same-card
  - rationale: Tempting because the terms are often used loosely in public discussion.

Authoring notes:
- why it helps: Learners compare two model families by mechanism and output type.
- badge mastery: Prevents overgeneralizing LLM lessons to all AI systems.
- review status: remain after human review

#### pilot-where-llms-fit-q2

Type: boundary distinction
Authoring category: boundary
Stem: When people say an LLM sits inside the broader AI family, which category map is most useful?
Correct choice ID: pilot-where-llms-fit-q2-correct

- pilot-where-llms-fit-q2-correct (correct): AI is broad; machine learning learns from data; deep learning uses layered networks; generative AI creates outputs; LLMs generate language/code.
  - feedback: Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.
- pilot-where-llms-fit-q2-llm-parent: LLMs are the parent category that contains all AI systems.
  - feedback: Not quite. LLMs are an important branch, not the root of the AI tree.
  - represented misconception: all AI is an LLM
  - represented glossary term: ai
  - distractor source: same-card
  - rationale: Tempting because LLMs currently dominate public attention.
- pilot-where-llms-fit-q2-rules-same: Symbolic/rule-based AI and learned models are identical because both run on computers.
  - feedback: Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.
  - represented misconception: symbolic AI vs learned model boundary
  - represented glossary term: symbolic-ai
  - distractor source: same-card
  - rationale: Tempting because both can be packaged inside the same software product.
- pilot-where-llms-fit-q2-diffusion-token-loop: Diffusion models and LLMs use the same next-token loop.
  - feedback: This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation is usually autoregressive.
  - represented misconception: diffusion vs autoregressive language generation
  - represented glossary term: diffusion
  - distractor source: same-card
  - rationale: Tempting because both are generative AI.

Authoring notes:
- why it helps: Learners build a category map they can use later when mechanisms diverge.
- badge mastery: Supports risk literacy by avoiding one-size-fits-all AI claims.
- review status: remain after human review

## Rationalists vs Empiricists

Stage: 1. Before Morning

### Learning Objective Review

Primary: Reason through the difference between explicit rules and learned weights, while recognizing that real AI products may combine both.

Secondary:
- Distinguish symbolic/rule-based systems from deep-learning systems.
- Explain loss as the training signal that guides weight adjustment.
- Avoid treating LLM fluency as consciousness or treating hybrid apps as pure learned models.

Model mechanism/boundary: Deep learning learns from examples by predicting, measuring loss, and adjusting weights; symbolic AI relies on explicit rules.

Myths/misconceptions:
- LLMs are only hand-coded rulebooks.
- Fluent model output proves conscious reasoning.
- Any rule, filter, or retrieval step means there is no learned model.

Related glossary terms: rationalism, empiricism, symbolic-ai, deep-learning, training, loss, weight
Nearby distractor terms: rule-based-ai, foundation-model, retrieval, fine-tuning, policy

### Existing v0.27.7 Draft Questions

- draft-history-q1: Which phrase best describes how LLMs use learned patterns rather than only hand-written rules?
  - classification: revise
  - rationale: The boundary is right, but the stem should ask the learner to compare actual system behavior.
- draft-history-q2: Which mechanism or distinction does Rationalists vs Empiricists most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.
- draft-history-q3: Which common confusion does Rationalists vs Empiricists help learners avoid?
  - classification: revise
  - rationale: The misconception target is useful, but the stem should become an applied model-thinking scenario.

### Rewritten v0.27.8 Pilot Questions

#### pilot-history-q1

Type: boundary distinction
Authoring category: boundary
Stem: If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?
Correct choice ID: pilot-history-q1-correct

- pilot-history-q1-correct (correct): The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples.
  - feedback: Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.
- pilot-history-q1-loss-every-task: The rule-based system updates weights from loss during every task.
  - feedback: Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.
  - represented misconception: symbolic rules vs training loop
  - represented glossary term: loss
  - distractor source: same-card
  - rationale: Tempting because loss is nearby in the deep-learning explanation.
- pilot-history-q1-conscious-llm: The LLM has conscious reasoning, while the rule-based system has none.
  - feedback: That gives the LLM too much inner life. The key boundary here is learned weights versus explicit rules.
  - represented misconception: conscious reasoning vs learned behavior
  - represented glossary term: llm
  - distractor source: explicit-confusable
  - rationale: Tempting because LLM language can sound like reasoning from the inside.
- pilot-history-q1-all-rulebooks: There is no difference; both are just fixed rulebooks.
  - feedback: Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.
  - represented misconception: LLM as hand-coded rulebook
  - represented glossary term: symbolic-ai
  - distractor source: same-card
  - rationale: Tempting because both systems can produce predictable outputs.

Authoring notes:
- why it helps: Learners compare two system designs rather than reciting intellectual history.
- badge mastery: Builds the architecture boundary needed for later training/inference distinctions.
- review status: remain after human review

#### pilot-history-q2

Type: mechanism in action
Authoring category: mechanism
Stem: During deep-learning training, why does the system measure loss?
Correct choice ID: pilot-history-q2-correct

- pilot-history-q2-correct (correct): Loss measures prediction error so an optimizer can adjust weights.
  - feedback: Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.
- pilot-history-q2-moral-good: Loss tells the model whether a generated answer is morally good.
  - feedback: Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.
  - represented misconception: loss vs human value judgment
  - represented glossary term: loss
  - distractor source: same-card
  - rationale: Tempting because loss sounds like a judgment word.
- pilot-history-q2-softmax-probability: Loss is the probability distribution used during sampling.
  - feedback: Close, but probability helps choose outputs during generation; loss guides weight updates during training.
  - represented misconception: loss vs probability/softmax
  - represented glossary term: probability
  - distractor source: nearby-stage
  - rationale: Tempting because both involve numbers during model work.
- pilot-history-q2-retrieved-source: Loss is a retrieved source that gets added to context.
  - feedback: That describes retrieval better. Loss belongs to training, not context insertion.
  - represented misconception: training signal vs retrieval/context
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - rationale: Tempting because later systems can add outside text before generation.

Authoring notes:
- why it helps: Learners identify the causal role of loss inside training.
- badge mastery: Loss is needed for badge-worthy understanding of how weights change.
- review status: remain after human review

#### pilot-history-q3

Type: human-use judgment
Authoring category: human-use-judgment
Stem: A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?
Correct choice ID: pilot-history-q3-correct

- pilot-history-q3-correct (correct): Modern systems can combine learned models with rules/tools; the LLM itself is still a learned pattern system.
  - feedback: Good distinction. Products can be hybrid even when the central model is learned from data.
- pilot-history-q3-no-learning-if-rules: Any rule in the app means the LLM is no longer trained from data.
  - feedback: Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.
  - represented misconception: hybrid system vs pure symbolic replacement
  - represented glossary term: rule-based-ai
  - distractor source: same-card
  - rationale: Tempting because rule-based pieces can be visible in product behavior.
- pilot-history-q3-conscious-product: Any fluent answer means the app is consciously reasoning.
  - feedback: This choice gives fluency too much mind. The app can combine tools and still lack conscious understanding.
  - represented misconception: fluent behavior vs awareness
  - represented glossary term: llm
  - distractor source: explicit-confusable
  - rationale: Tempting because the whole app may feel conversational.
- pilot-history-q3-use-finetunes: Retrieval or filters permanently fine-tune the model on every use.
  - feedback: Close, but retrieval and filters can shape the current response without durably changing model weights.
  - represented misconception: retrieval/filtering vs durable training
  - represented glossary term: fine-tuning
  - distractor source: nearby-stage
  - rationale: Tempting because the app appears to adapt to local material.

Authoring notes:
- why it helps: Learners reason about real product stacks, not just model families.
- badge mastery: Supports institutional AI literacy: model, wrapper, tool, and policy are not the same thing.
- review status: remain after human review

## Training

Stage: 1. Before Morning

### Learning Objective Review

Primary: Trace training as the durable weight-changing loop and separate it from ordinary inference, sampling, retrieval, and context changes.

Secondary:
- Identify loss and weight update as the learning step.
- Explain why a normal chat does not usually update model weights.
- Trace example, prediction, loss, and update as the durable training path.

Model mechanism/boundary: Training uses examples and loss to update parameters; inference uses fixed weights and temporary activations.

Myths/misconceptions:
- Every prompt trains the model.
- Training is the same as sampling or generation.
- Weight updates, context changes, and retrieved text are interchangeable.

Related glossary terms: training, loss, weight, weight-update, parameter, training-data, inference, forward-pass
Nearby distractor terms: pretraining, next-token, context window, rag, diffusion, softmax

### Existing v0.27.7 Draft Questions

- draft-training-q1: What makes training different from inference?
  - classification: keep-core-revise-stem
  - rationale: The training/inference boundary is essential, but the pilot should ask about a concrete training moment.
- draft-training-q2: Which mechanism or distinction does Training most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.
- draft-training-q3: Which common confusion does Training help learners avoid?
  - classification: revise
  - rationale: The misconception target is useful, but the stem should become an applied model-thinking scenario.
- draft-training-q4: How does Training connect to the prompt's Journey?
  - classification: revise
  - rationale: The relationship target is useful, but the stem should ask the learner to trace a concrete process.

### Rewritten v0.27.8 Pilot Questions

#### pilot-training-q1

Type: mechanism in action
Authoring category: mechanism
Stem: During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?
Correct choice ID: pilot-training-q1-correct

- pilot-training-q1-correct (correct): The training process uses the loss signal to update weights.
  - feedback: Good distinction. The durable weight update is what makes this training.
- pilot-training-q1-append-wrong-token: The model merely appends the wrong token to a live response.
  - feedback: Not quite. Appending a response token is inference behavior; training uses loss to change weights.
  - represented misconception: training vs autoregressive inference
  - represented glossary term: inference
  - distractor source: same-card
  - rationale: Tempting because generation also chooses and appends tokens.
- pilot-training-q1-store-memory: The user prompt is stored as permanent memory.
  - feedback: This choice reveals a common mix-up. Training updates weights; a prompt in context is temporary unless stored elsewhere.
  - represented misconception: context vs permanent memory
  - represented glossary term: memory
  - distractor source: author-created misconception
  - rationale: Tempting because chat context can feel remembered.
- pilot-training-q1-softmax-truth: Softmax turns the wrong answer into truth.
  - feedback: Close, but softmax turns scores into probabilities; it does not make an answer true or update weights.
  - represented misconception: probability vs truth
  - represented glossary term: softmax
  - distractor source: nearby-stage
  - rationale: Tempting because softmax appears in the later probability step.

Authoring notes:
- why it helps: Learners locate the precise causal step that changes the model.
- badge mastery: Core badge distinction: training changes weights; inference uses them.
- review status: remain after human review

#### pilot-training-q2

Type: boundary distinction
Authoring category: boundary
Stem: A student asks a chatbot one question. Unless a separate training process runs, what usually does not happen?
Correct choice ID: pilot-training-q2-correct

- pilot-training-q2-correct (correct): The model’s weights are durably updated by that chat.
  - feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
- pilot-training-q2-fixed-weights: The model uses its fixed weights to process the context.
  - feedback: Not quite. That usually does happen during inference; the question asks what does not usually happen.
  - represented misconception: confusing what does happen during inference with what does not
  - represented glossary term: inference
  - distractor source: same-card
  - rationale: Tempting because this is part of ordinary model use.
- pilot-training-q2-hidden-states: Temporary hidden states form during the forward pass.
  - feedback: Close, but temporary hidden states can form during inference. They are not durable weight updates.
  - represented misconception: temporary activation vs durable learning
  - represented glossary term: hidden state
  - distractor source: nearby-stage
  - rationale: Tempting because hidden states are internal model numbers.
- pilot-training-q2-score-tokens: The model scores possible next response tokens.
  - feedback: That is ordinary generation behavior. It is not the durable training step.
  - represented misconception: logits/sampling vs weight update
  - represented glossary term: logits
  - distractor source: nearby-stage
  - rationale: Tempting because token scoring is also internal model work.

Authoring notes:
- why it helps: Learners reason from a familiar chat scenario to the durable/temporary boundary.
- badge mastery: Reduces the myth that every user chat trains the base model.
- review status: remain after human review

#### pilot-training-q3

Type: causal consequence
Authoring category: causal-consequence
Stem: Why can training change how the model behaves tomorrow, while inference usually cannot?
Correct choice ID: pilot-training-q3-correct

- pilot-training-q3-correct (correct): Training changes parameters that future runs reuse; inference uses temporary computations for the current run.
  - feedback: Good distinction. Durable parameters carry forward; inference-time states usually do not.
- pilot-training-q3-inference-optimizer: Inference is where the optimizer changes weights.
  - feedback: Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.
  - represented misconception: optimizer/weight update vs inference
  - represented glossary term: weight-update
  - distractor source: same-card
  - rationale: Tempting because both training and inference run model computations.
- pilot-training-q3-visible-prompt: Training only changes the visible prompt text.
  - feedback: Close, but prompt changes are temporary input changes; training changes the model’s learned numbers.
  - represented misconception: prompt/context vs weights
  - represented glossary term: prompt
  - distractor source: nearby-stage
  - rationale: Tempting because prompt text clearly changes a response.
- pilot-training-q3-guarantee-truth: Training guarantees every future answer is true.
  - feedback: This choice overclaims. Training can improve behavior, but it does not guarantee truth.
  - represented misconception: training improvement vs truth guarantee
  - represented glossary term: probability
  - distractor source: author-created misconception
  - rationale: Tempting because training sounds like making the model better.

Authoring notes:
- why it helps: Learners connect durability to parameters reused by future inference.
- badge mastery: Strengthens durable-versus-temporary literacy.
- review status: remain after human review

#### pilot-training-q4

Type: model trace
Authoring category: model-trace
Stem: In a training loop, which sequence is the durable learning path?
Correct choice ID: pilot-training-q4-correct

- pilot-training-q4-correct (correct): Example -> prediction -> loss -> weight update.
  - feedback: Insight strengthened. That is the weight-changing path.
- pilot-training-q4-generation-loop: Prompt -> response -> append -> next response token.
  - feedback: Close, but that sequence describes inference/generation, not training.
  - represented misconception: training loop vs autoregressive generation
  - represented glossary term: autoregression
  - distractor source: nearby-stage
  - rationale: Tempting because this is the model’s generation loop.
- pilot-training-q4-rag-loop: Search -> retrieved passage -> context -> answer.
  - feedback: That describes RAG. It adds temporary context; it does not by itself update weights.
  - represented misconception: training vs retrieval-augmented context
  - represented glossary term: rag
  - distractor source: nearby-stage
  - rationale: Tempting because retrieval can improve answers.
- pilot-training-q4-diffusion-loop: Noise -> denoise -> image/video sample.
  - feedback: Not quite. That is a diffusion-style generation story, not the training loop for weight updates.
  - represented misconception: training vs diffusion generation
  - represented glossary term: diffusion
  - distractor source: nearby-stage
  - rationale: Tempting because diffusion is another generative process.

Authoring notes:
- why it helps: Learners choose the path with the durable update, not another plausible AI sequence.
- badge mastery: Prepares learners to distinguish training, RAG, diffusion, and autoregression later.
- review status: remain after human review

## Pretraining

Stage: 1. Before Morning

### Learning Objective Review

Primary: Reason that pretraining is broad durable pattern learning from next-token prediction over large datasets, not perfect recall or live browsing.

Secondary:
- Connect next-token targets, loss, weight updates, and broad model capability.
- Separate pretraining from RAG, fine-tuning, inference, and database lookup.
- Explain how broad data can shape weights without installing conscious understanding.

Model mechanism/boundary: Pretraining repeats the training loop at large scale, changing weights before normal use.

Myths/misconceptions:
- Pretraining gives perfect recall of every source.
- Pretraining happens during each user chat.
- Fine-tuning or RAG explains all broad model knowledge.

Related glossary terms: pretraining, training, training-data, weight, loss, next-token, inference
Nearby distractor terms: weight-update, parameter, overfitting, generalization, validation-data, rag, fine-tuning

### Existing v0.27.7 Draft Questions

- draft-pretraining-q1: During pretraining, what changes?
  - classification: keep-core-revise-stem
  - rationale: The durable weight-change idea is correct, but the pilot should name the pretraining signal and model mechanism.
- draft-pretraining-q2: Which mechanism or distinction does Pretraining most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.
- draft-pretraining-q3: Which common confusion does Pretraining help learners avoid?
  - classification: revise
  - rationale: The misconception target is useful, but the stem should become an applied model-thinking scenario.
- draft-pretraining-q4: How does Pretraining connect to the prompt's Journey?
  - classification: revise
  - rationale: The relationship target is useful, but the stem should ask the learner to trace a concrete process.

### Rewritten v0.27.8 Pilot Questions

#### pilot-pretraining-q1

Type: mechanism in action
Authoring category: mechanism
Stem: During pretraining, what signal teaches the model broad language patterns across many examples?
Correct choice ID: pilot-pretraining-q1-correct

- pilot-pretraining-q1-correct (correct): Repeated prediction error/loss from next-token targets changes weights over many training steps.
  - feedback: Good distinction. Pretraining scales the training loop across many examples.
- pilot-pretraining-q1-live-chat: A user conversation at deployment permanently rewrites the model.
  - feedback: Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.
  - represented misconception: pretraining vs inference
  - represented glossary term: inference
  - distractor source: same-card
  - rationale: Tempting because the model can seem to adapt inside a chat.
- pilot-pretraining-q1-hand-rules: A human writes every rule the model will follow.
  - feedback: Close, but pretraining is learned from examples, not a complete rulebook written by hand.
  - represented misconception: learned patterns vs symbolic rules
  - represented glossary term: symbolic-ai
  - distractor source: nearby-stage
  - rationale: Tempting because software often has hand-written rules.
- pilot-pretraining-q1-perfect-storage: The model perfectly stores each source document for later copying.
  - feedback: This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.
  - represented misconception: pattern learning vs perfect source recall
  - represented glossary term: training-data
  - distractor source: same-card
  - rationale: Tempting because source data influences the model.

Authoring notes:
- why it helps: Learners identify the training signal that builds broad capability.
- badge mastery: Connects next-token prediction to durable weight learning.
- review status: remain after human review

#### pilot-pretraining-q2

Type: boundary distinction
Authoring category: boundary
Stem: Why can pretraining create broad capability without making the model a perfect library of its sources?
Correct choice ID: pilot-pretraining-q2-correct

- pilot-pretraining-q2-correct (correct): It installs statistical patterns in weights, not exact conscious recall of every document.
  - feedback: Insight strengthened. Pretraining can shape useful patterns without becoming a perfect library.
- pilot-pretraining-q2-private-files: Pretraining gives the model access to every private file on demand.
  - feedback: Not quite. Training data exposure is not the same as access to every private file.
  - represented misconception: training data vs universal file access
  - represented glossary term: training-data
  - distractor source: same-card
  - rationale: Tempting because broad training data can sound like broad access.
- pilot-pretraining-q2-rag-same: Pretraining is the same as RAG inserting a document into context.
  - feedback: Close, but RAG supplies temporary context during inference; pretraining durably changes weights before use.
  - represented misconception: pretraining vs retrieval/context
  - represented glossary term: rag
  - distractor source: nearby-stage
  - rationale: Tempting because both can bring outside information into answers.
- pilot-pretraining-q2-after-prompt: Pretraining happens only after a user asks a question.
  - feedback: Pretraining happens before deployment. The user prompt later uses the pretrained weights.
  - represented misconception: pretraining vs deployment-time inference
  - represented glossary term: inference
  - distractor source: same-card
  - rationale: Tempting because learners see the model only during use.

Authoring notes:
- why it helps: Learners reason about what weights can and cannot contain.
- badge mastery: Supports nuanced memory, privacy, and retrieval literacy.
- review status: remain after human review

#### pilot-pretraining-q3

Type: causal consequence
Authoring category: causal-consequence
Stem: If pretraining examples include many styles and task shapes, what can change inside the model?
Correct choice ID: pilot-pretraining-q3-correct

- pilot-pretraining-q3-correct (correct): Weights can shift so future prompts activate more useful language/code patterns.
  - feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
- pilot-pretraining-q3-context-window: Only the current context window grows larger.
  - feedback: Not quite. Context is temporary input; pretraining changes weights.
  - represented misconception: pretraining weights vs context window
  - represented glossary term: context window
  - distractor source: nearby-stage
  - rationale: Tempting because context also affects output.
- pilot-pretraining-q3-interface: Only the app’s button labels or interface change.
  - feedback: This describes product UI changes, not the model’s learned parameters.
  - represented misconception: model weights vs product interface
  - represented glossary term: foundation-model
  - distractor source: nearby-stage
  - rationale: Tempting because users meet models through apps.
- pilot-pretraining-q3-citation-list: Only a citation list is attached to answers.
  - feedback: Close, but citations are response/support features; pretraining changes learned model weights.
  - represented misconception: pretraining vs citation/grounding
  - represented glossary term: citation
  - distractor source: nearby-stage
  - rationale: Tempting because citations can make answers look knowledgeable.

Authoring notes:
- why it helps: Learners connect broad examples to future behavior through weights.
- badge mastery: Builds a model-centered explanation for broad capability.
- review status: remain after human review

#### pilot-pretraining-q4

Type: misconception diagnosis
Authoring category: misconception-check
Stem: A base model seems to know facts from public text. What is the model-literate explanation?
Correct choice ID: pilot-pretraining-q4-correct

- pilot-pretraining-q4-correct (correct): Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page.
  - feedback: Insight strengthened. Pretraining can support fact-like generation without live source lookup.
- pilot-pretraining-q4-web-browsing: It must be browsing the web by itself for every answer.
  - feedback: Not quite. Some systems browse or retrieve, but a base model can also generate from pretrained weights.
  - represented misconception: pretraining vs web retrieval
  - represented glossary term: retrieval
  - distractor source: nearby-stage
  - rationale: Tempting because web search is a familiar way to know facts.
- pilot-pretraining-q4-conscious-memory: It must consciously remember reading those pages.
  - feedback: That gives the model too much mind. It has learned weights, not conscious recollection.
  - represented misconception: fluent fact-like output vs awareness
  - represented glossary term: llm
  - distractor source: author-created misconception
  - rationale: Tempting because the output can sound like human memory.
- pilot-pretraining-q4-finetuning-all: Fine-tuning alone explains all broad knowledge.
  - feedback: Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.
  - represented misconception: pretraining vs fine-tuning
  - represented glossary term: fine-tuning
  - distractor source: nearby-stage
  - rationale: Tempting because fine-tuning is another training phase.

Authoring notes:
- why it helps: Learners diagnose the common fact/source/retrieval confusion.
- badge mastery: Supports source literacy without implying omniscience.
- review status: remain after human review

## Overfitting and Generalization

Stage: 1. Before Morning

### Learning Objective Review

Primary: Diagnose when a model has fit training examples too narrowly and explain why held-out validation checks generalization.

Secondary:
- Separate training performance from performance on new examples.
- Explain why validation data matters.
- Recognize when targeted training can become too narrow.

Model mechanism/boundary: Overfitting installs brittle patterns into weights; generalization means learned patterns transfer to unseen examples.

Myths/misconceptions:
- Perfect training performance proves a model learned well.
- Validation data is just more context.
- Lower loss or memorization automatically guarantees truthful future answers.

Related glossary terms: overfitting, generalization, validation-data, training-data, evaluation, training
Nearby distractor terms: pretraining, fine-tuning, loss, context window, rag, inference

### Existing v0.27.7 Draft Questions

- draft-overfitting-generalization-q1: Which is a sign of overfitting in Overfitting and Generalization?
  - classification: keep-core-revise-stem
  - rationale: The overfitting sign is correct, but the pilot should use an applied train/validation scenario.
- draft-overfitting-generalization-q2: Which mechanism or distinction does Overfitting and Generalization most directly teach?
  - classification: revise
  - rationale: The v0.27.7 stem asks for the card mechanism generically; it should name a concrete model action or boundary.
- draft-overfitting-generalization-q3: Which common confusion does Overfitting and Generalization help learners avoid?
  - classification: revise
  - rationale: The misconception target is useful, but the stem should become an applied model-thinking scenario.

### Rewritten v0.27.8 Pilot Questions

#### pilot-overfitting-generalization-q1

Type: applied scenario
Authoring category: application
Stem: A model gets every training example right but fails on new validation examples. What problem is showing up?
Correct choice ID: pilot-overfitting-generalization-q1-correct

- pilot-overfitting-generalization-q1-correct (correct): Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize.
  - feedback: Good diagnosis. The held-out examples reveal whether the pattern transfers.
- pilot-overfitting-generalization-q1-generalization: Generalization: the model is working well on unseen cases.
  - feedback: Not quite. Generalization means good performance on new examples; this scenario shows the opposite.
  - represented misconception: overfitting vs generalization
  - represented glossary term: generalization
  - distractor source: same-card
  - rationale: Tempting because both terms describe training performance.
- pilot-overfitting-generalization-q1-rag: RAG: the model retrieved too many documents.
  - feedback: This is not a retrieval problem. The issue is poor transfer from training examples to validation examples.
  - represented misconception: evaluation failure vs retrieval system
  - represented glossary term: rag
  - distractor source: nearby-stage
  - rationale: Tempting because retrieval can affect answer quality.
- pilot-overfitting-generalization-q1-inference: Inference: the model is simply generating one token at a time.
  - feedback: Close, but inference is normal model use; overfitting is a training/evaluation failure mode.
  - represented misconception: training/evaluation failure vs inference process
  - represented glossary term: inference
  - distractor source: nearby-stage
  - rationale: Tempting because all later model use involves inference.

Authoring notes:
- why it helps: Learners diagnose overfitting from train/validation behavior.
- badge mastery: Builds evaluation literacy: success on seen examples is not enough.
- review status: remain after human review

#### pilot-overfitting-generalization-q2

Type: human-use judgment
Authoring category: human-use-judgment
Stem: Why do model builders test on held-out validation data instead of only training examples?
Correct choice ID: pilot-overfitting-generalization-q2-correct

- pilot-overfitting-generalization-q2-correct (correct): Held-out data checks whether learned patterns work on examples the model did not train on.
  - feedback: Insight strengthened. Validation is about transfer, not memorized training performance.
- pilot-overfitting-generalization-q2-context: Validation data is used only to expand the current context window.
  - feedback: Not quite. Validation examples test the model; they are not just temporary prompt context.
  - represented misconception: validation data vs context window
  - represented glossary term: context window
  - distractor source: nearby-stage
  - rationale: Tempting because both involve examples supplied to a system.
- pilot-overfitting-generalization-q2-training-proves-all: Training examples alone prove the model will work everywhere.
  - feedback: This choice reveals the exact overfitting risk. Seen examples are not enough evidence.
  - represented misconception: training performance vs generalization
  - represented glossary term: training-data
  - distractor source: same-card
  - rationale: Tempting because high training accuracy feels reassuring.
- pilot-overfitting-generalization-q2-loss-truth: A lower loss always proves every future answer is true.
  - feedback: Close, but lower loss is not a truth guarantee, especially outside the tested distribution.
  - represented misconception: loss/probability vs truth guarantee
  - represented glossary term: loss
  - distractor source: nearby-stage
  - rationale: Tempting because lower loss often signals improvement.

Authoring notes:
- why it helps: Learners connect evaluation design to model behavior on new cases.
- badge mastery: Supports responsible interpretation of AI benchmarks and claims.
- review status: remain after human review

#### pilot-overfitting-generalization-q3

Type: causal consequence
Authoring category: causal-consequence
Stem: If fine-tuning makes a model excellent at one narrow template but worse on varied prompts, which boundary matters?
Correct choice ID: pilot-overfitting-generalization-q3-correct

- pilot-overfitting-generalization-q3-correct (correct): The model may have become too narrow; useful training should preserve generalization beyond the examples.
  - feedback: Good distinction. Targeted training can help, but it can also make behavior brittle if it overfits.
- pilot-overfitting-generalization-q3-prompt-weights: This proves prompts permanently change weights during inference.
  - feedback: Not quite. The scenario is about fine-tuning/training effects, not prompts rewriting weights during inference.
  - represented misconception: prompt/context vs training weight changes
  - represented glossary term: prompt
  - distractor source: nearby-stage
  - rationale: Tempting because prompts can change output behavior.
- pilot-overfitting-generalization-q3-symbolic-better: This proves a rule-based AI is always better than a learned model.
  - feedback: This overgeneralizes. The issue is narrow training behavior, not proof that rules are always better.
  - represented misconception: overfitting diagnosis vs symbolic superiority claim
  - represented glossary term: symbolic-ai
  - distractor source: nearby-stage
  - rationale: Tempting because brittleness can make rules feel safer.
- pilot-overfitting-generalization-q3-refusal: This proves overfitting is just the model refusing to answer.
  - feedback: Close, but overfitting is about brittle transfer from training examples, not simply a refusal behavior.
  - represented misconception: overfitting vs refusal/guardrail behavior
  - represented glossary term: guardrail
  - distractor source: author-created misconception
  - rationale: Tempting because poor behavior can show up as frustrating outputs.

Authoring notes:
- why it helps: Learners apply overfitting/generalization to targeted adaptation.
- badge mastery: Connects training choices to trustworthy human use.
- review status: review by Deep Research for whether fine-tuning belongs here or later

## Deep Research Handoff

Review this v0.27.8 Prompt Life model-thinking checkpoint pilot. For each of the first six Journey learning cards, evaluate whether the questions make the learner reason about the model rather than recall the curriculum. Check clarity, factual accuracy, distractor quality, misconception feedback, reading level, and badge-worthiness. Recommend edits, removals, and additions.

