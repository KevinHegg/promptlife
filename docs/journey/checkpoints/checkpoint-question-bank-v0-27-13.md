# Prompt Life Checkpoint Bank 0.27.13-full-checkpoint-bank-repair

- Active bank: v0.27.13-checkpoint-repair
- Cards: 39
- Questions: 136
- Choices: 544
- Wrong-answer distractors: 408
- Questions revised: 130
- Distractors revised: 7
- Feedback items revised: 334
- Objectives revised this pass: 0

## Quality Rules
- All 39 active Journey learning cards have a multi-question checkpoint set.
- Every question has four choices and exactly one correct answer.
- Question IDs and choice IDs are preserved when wording is clarified.
- Wrong-answer feedback maps by choiceId and teaches the selected misconception without revealing the correct option.
- Questions test model mechanism, application, causal consequence, boundary judgment, human-use judgment, misconception repair, or synthesis.
- Vague "best definition" and "which statement is most accurate" stems are removed from the active bank.
- Set-aside validation examples remain defined as examples kept out of training and saved for testing.
- Legacy fallback remains query-parameter controlled and is documented only in docs/reports.

## Type Distribution
- mechanism: 17
- human-use-judgment: 16
- application: 16
- boundary: 37
- causal-consequence: 11
- model-trace: 25
- misconception-check: 14

## Answer-Length Audit
- Before repair warnings: 77
- After repair warnings: 56
- v0279-what-is-llm-q1: ratio 1.38, delta 26 chars
- v0279-what-is-llm-q2: ratio 1.45, delta 30 chars
- v02712-where-llms-fit-q2: ratio 2.01, delta 48 chars
- v02712-history-q3: ratio 1.88, delta 50 chars
- v0279-training-q2: ratio 1.65, delta 37 chars
- v0279-training-q3: ratio 1.48, delta 30 chars
- v0279-pretraining-q1: ratio 1.55, delta 31 chars
- v0279-overfitting-generalization-q3: ratio 1.47, delta 30 chars
- v02712-fine-tuning-q1: ratio 1.96, delta 42 chars
- v02710-fine-tuning-q2: ratio 1.64, delta 33 chars
- v02710-alignment-q1: ratio 1.43, delta 26 chars
- v02710-alignment-q3: ratio 1.76, delta 41 chars
- v02710-inference-q3: ratio 1.57, delta 30 chars
- v02710-tokens-q1: ratio 1.54, delta 25 chars
- v02712-vectors-q2: ratio 1.78, delta 32 chars
- v02712-vectors-q3: ratio 1.68, delta 31 chars
- v02712-tensors-q1: ratio 1.86, delta 33 chars
- v02712-tensors-q2: ratio 1.57, delta 29 chars
- v02712-attention-q2: ratio 1.57, delta 30 chars
- v02712-attention-q4: ratio 1.58, delta 29 chars

## Learner-Copy Audit
- Checked source files: 19
- Issues found by generator scan: 0

## What Is an LLM? (2)

Stage: 1. Before Morning

Objective: Explain that an LLM uses learned weights plus current context to score and generate next tokens without implying awareness, search, or permanent learning.

### Q1. v0279-what-is-llm-q1

- Category: mechanism
- Stem: When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?
- Correct choice: v0279-what-is-llm-q1-correct
- Choices:
  - v0279-what-is-llm-q1-correct: It scores possible next tokens from the current context, selects one, appends it, and repeats. (correct)
    - feedback: Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.
  - v0279-what-is-llm-q1-conscious-reader: It reads with conscious understanding, then writes the whole answer at once.
    - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
    - misconception: conscious mind vs fluent model behavior
    - represented term: llm
    - source: same-card
    - rationale: Tempting because fluent text can sound like a human explanation.
  - v0279-what-is-llm-q1-hidden-search: It searches a hidden database and copies the best matching passage.
    - feedback: This choice reveals a common mix-up. Search can be added around a model, but a plain LLM generates from context and learned weights.
    - misconception: search engine/database vs generative model
    - represented term: retrieval
    - source: author-created misconception
    - rationale: Tempting because broad model knowledge can feel like search.
  - v0279-what-is-llm-q1-weight-change: It changes its weights each time the user sends a new prompt.
    - feedback: That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.
    - misconception: training vs inference
    - represented term: training
    - source: same-card
    - rationale: Tempting because the model may seem to adapt within a conversation.

### Q2. v0279-what-is-llm-q2

- Category: human-use-judgment
- Stem: An LLM gives a fluent explanation of a poem. What should a model-literate learner conclude?
- Correct choice: v0279-what-is-llm-q2-correct
- Choices:
  - v0279-what-is-llm-q2-correct: It generated response tokens from context and learned patterns; fluency does not prove awareness. (correct)
    - feedback: Insight strengthened. This is the fluent-behavior-without-awareness boundary Prompt Life wants learners to hold.
  - v0279-what-is-llm-q2-inner-awareness: It must have inner awareness because the explanation sounds human.
    - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
    - misconception: conscious mind vs fluent model behavior
    - represented term: llm
    - source: same-card
    - rationale: Tempting because human-like language invites human-like interpretation.
  - v0279-what-is-llm-q2-hidden-source: It must have found a hidden perfect source and copied the interpretation.
    - feedback: Close, but this describes search or retrieval better than a plain LLM response. A fluent answer is not the same as cited evidence.
    - misconception: database lookup vs learned generation
    - represented term: retrieval
    - source: author-created misconception
    - rationale: Tempting because polished answers can feel copied from a source.
  - v0279-what-is-llm-q2-prompt-learning: The poem prompt permanently taught the base model a new skill.
    - feedback: That would require training. A normal prompt can shape temporary context without durably updating weights.
    - misconception: prompt/context change vs durable weight update
    - represented term: weight-update
    - source: same-card
    - rationale: Tempting because earlier context can shape later replies in a chat.

## Where LLMs Fit (3)

Stage: 1. Before Morning

Objective: Use the AI family map to distinguish AI, ML, deep learning, generative AI, LLMs, diffusion models, multimodal systems, and AI products.

### Q1. v0279-where-llms-fit-q1

- Category: application
- Stem: A campus tool summarizes text with an LLM, while another creates images by denoising noisy patterns. What does that show?
- Correct choice: v0279-where-llms-fit-q1-correct
- Choices:
  - v0279-where-llms-fit-q1-correct: Generative AI is a family; LLMs and denoising image models are different branches. (correct)
    - feedback: Good distinction. Generative AI is a family, and different branches can use different mechanisms.
  - v0279-where-llms-fit-q1-all-llms: All generative AI tools are LLMs because ChatGPT is generative AI.
    - feedback: Not quite. An LLM is one kind of generative AI, not the whole category. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: LLM vs generative AI family
    - represented term: generative-ai
    - source: same-card
    - rationale: Tempting because ChatGPT is many learners’ first generative AI example.
  - v0279-where-llms-fit-q1-text-only-ai: The image tool is not AI unless it generates language tokens.
    - feedback: Close, but image models can be AI without using the LLM text-token loop. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: LLM output vs broader generative outputs
    - represented term: diffusion
    - source: same-card
    - rationale: Tempting because this app starts with language models.
  - v0279-where-llms-fit-q1-ai-ml-same: AI and machine learning are the same label, so the branches do not matter.
    - feedback: This choice collapses useful categories. Machine learning is a major branch inside the broader AI field.
    - misconception: AI vs machine learning category boundary
    - represented term: machine-learning
    - source: same-card
    - rationale: Tempting because public language often blurs these words.

### Q2. v02712-where-llms-fit-q2

- Category: boundary
- Stem: A department uses the words AI, machine learning, generative AI, and LLM as if they mean the same thing. Which correction keeps the category map clear?
- Correct choice: v02712-where-llms-fit-q2-correct
- Choices:
  - v02712-where-llms-fit-q2-correct: AI is broad; ML learns from data; generative AI creates outputs; LLMs generate language or code. (correct)
    - feedback: Insight strengthened. The map matters because an LLM is one branch inside a wider AI landscape.
  - v02712-where-llms-fit-q2-2-llm: All AI systems are LLMs if they use language.
    - feedback: That collapses the broad AI family into one model type. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: All AI systems are LLMs if they use language.
    - represented term: LLM
    - source: explicit-confusable
    - rationale: Plausible because LLM is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-where-llms-fit-q2-3-machine-learning: Machine learning and AI are exact synonyms.
    - feedback: That misses that machine learning is a major branch inside broader AI. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Machine learning and AI are exact synonyms.
    - represented term: machine learning
    - source: explicit-confusable
    - rationale: Plausible because machine learning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-where-llms-fit-q2-4-diffusion-model: Diffusion models and LLMs use the same generation loop.
    - feedback: That treats different generative methods as if they shared one mechanism. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Diffusion models and LLMs use the same generation loop.
    - represented term: diffusion model
    - source: explicit-confusable
    - rationale: Plausible because diffusion model is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v0279-where-llms-fit-q3

- Category: boundary
- Stem: A chatbot product includes an LLM, a search tool, safety filters, and a user interface. What is the LLM?
- Correct choice: v0279-where-llms-fit-q3-correct
- Choices:
  - v0279-where-llms-fit-q3-correct: The language-generating model inside the larger product. (correct)
    - feedback: Good distinction. A product may wrap an LLM with tools, policies, and interface pieces.
  - v0279-where-llms-fit-q3-whole-app: The whole app, including every tool and button.
    - feedback: Not quite. The product can include an LLM, but the LLM is not every surrounding tool and screen.
    - misconception: model vs product/app wrapper
    - represented term: ai
    - source: author-created misconception
    - rationale: Tempting because users experience the whole product as one AI thing.
  - v0279-where-llms-fit-q3-safety-policy: The safety policy that blocks some outputs.
    - feedback: Close, but a safety policy shapes behavior around the model; it is not the language model itself.
    - misconception: policy/guardrail vs model
    - represented term: policy
    - source: nearby-stage
    - rationale: Tempting because safety behavior is visible in the product.
  - v0279-where-llms-fit-q3-search-index: The database or search index the app may call.
    - feedback: This describes a retrieval or search component. The LLM generates language from context and learned weights.
    - misconception: retrieval/search component vs language model
    - represented term: retrieval
    - source: author-created misconception
    - rationale: Tempting because some chatbot products include search.

## Rationalists vs Empiricists (3)

Stage: 1. Before Morning

Objective: Compare rules-first AI and learned-pattern AI while recognizing that modern systems can combine rules, retrieval, policies, tools, and learned models.

### Q1. v0279-history-q1

- Category: boundary
- Stem: If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?
- Correct choice: v0279-history-q1-correct
- Choices:
  - v0279-history-q1-correct: The rule-based system follows written rules; the LLM uses weights shaped by examples. (correct)
    - feedback: Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.
  - v0279-history-q1-loss-every-task: The rule-based system measures loss and updates weights after every task.
    - feedback: Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.
    - misconception: symbolic rules vs training loop
    - represented term: loss
    - source: same-card
    - rationale: Tempting because loss is nearby in the deep-learning explanation.
  - v0279-history-q1-conscious-llm: The LLM has conscious reasoning, while the rule-based system has none.
    - feedback: That gives the LLM too much mind. The key boundary here is learned weights versus explicit rules.
    - misconception: conscious reasoning vs learned behavior
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because LLM language can sound like reasoning from the inside.
  - v0279-history-q1-all-rules: There is no difference; both systems are just written rulebooks.
    - feedback: Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.
    - misconception: LLM as hand-coded rulebook
    - represented term: symbolic-ai
    - source: same-card
    - rationale: Tempting because both systems can produce predictable outputs.

### Q2. v0279-history-q2

- Category: mechanism
- Stem: During deep-learning training, why does the system measure loss?
- Correct choice: v0279-history-q2-correct
- Choices:
  - v0279-history-q2-correct: Loss measures prediction error so an optimizer can adjust weights. (correct)
    - feedback: Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.
  - v0279-history-q2-moral-good: Loss tells the model whether a generated answer is morally good.
    - feedback: Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.
    - misconception: loss vs human value judgment
    - represented term: loss
    - source: same-card
    - rationale: Tempting because loss sounds like a judgment word.
  - v0279-history-q2-confidence-score: Loss is the model’s confidence score for the next token during generation.
    - feedback: Close, but confidence or probability shapes generation. Loss measures training error so weights can be adjusted.
    - misconception: loss vs confidence/probability during generation
    - represented term: probability
    - source: nearby-stage
    - rationale: Tempting because both are numerical signals related to prediction.
  - v0279-history-q2-final-answer: Loss writes the final answer after the model has finished thinking.
    - feedback: Not quite. Loss is used during training; it is not the model writing a response. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: training signal vs response generation
    - represented term: response
    - source: nearby-stage
    - rationale: Tempting because learners may treat every internal step as answer writing.

### Q3. v02712-history-q3

- Category: boundary
- Stem: A university AI app combines an LLM, hand-written policy checks, and a handbook lookup tool. What should a model-literate user infer?
- Correct choice: v02712-history-q3-correct
- Choices:
  - v02712-history-q3-correct: The product combines learned patterns, written rules, and lookup tools; the LLM remains learned-pattern AI. (correct)
    - feedback: Good distinction. Modern AI products can mix traditions without making the model itself rule-based.
  - v02712-history-q3-2-symbolic-ai: The hand-written checks turn the LLM into symbolic AI.
    - feedback: That confuses a product wrapper with the model inside it. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The hand-written checks turn the LLM into symbolic AI.
    - represented term: symbolic AI
    - source: explicit-confusable
    - rationale: Plausible because symbolic AI is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-history-q3-3-rag: The handbook lookup permanently rewrites the model weights.
    - feedback: Retrieval can add context without becoming durable training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The retrieved handbook permanently rewrites the model weights.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-history-q3-4-alignment: The policy checks prove the model has moral understanding.
    - feedback: Policy behavior is not the same as conscience or awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The policy checks prove the model has moral understanding.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Plausible because alignment is nearby, but this choice preserves a misconception the card is designed to correct.

## Training (4)

Stage: 1. Before Morning

Objective: Trace training as example, prediction, loss, optimizer, weight update, repeat; separate durable training from inference, retrieval, sampling, and prompt changes.

### Q1. v0279-training-q1

- Category: mechanism
- Stem: During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?
- Correct choice: v0279-training-q1-correct
- Choices:
  - v0279-training-q1-correct: The training process uses the loss signal to update weights. (correct)
    - feedback: Good distinction. The durable weight update is what makes this training.
  - v0279-training-q1-append-response: The model appends the mistaken token to a normal live response.
    - feedback: Not quite. Appending a response token is inference behavior; training uses loss to change weights.
    - misconception: training vs autoregressive inference
    - represented term: inference
    - source: same-card
    - rationale: Tempting because generation also chooses and appends tokens.
  - v0279-training-q1-durable-memory: The prompt becomes durable memory stored inside the model’s weights.
    - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
    - misconception: context vs durable weight update
    - represented term: memory
    - source: author-created misconception
    - rationale: Tempting because chat context can feel remembered.
  - v0279-training-q1-likelihood-truth: The model treats the most likely answer as automatically true.
    - feedback: Not quite. Likelihood is not truth, and this training moment matters because loss can drive a weight update.
    - misconception: likelihood vs truth
    - represented term: probability
    - source: nearby-stage
    - rationale: Tempting because likely answers can sound authoritative.

### Q2. v0279-training-q2

- Category: boundary
- Stem: A student asks a chatbot one question during ordinary use. Which statement is usually true?
- Correct choice: v0279-training-q2-correct
- Choices:
  - v0279-training-q2-correct: The model uses fixed weights and temporary context; the chat usually does not rewrite weights. (correct)
    - feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
  - v0279-training-q2-permanent-update: The chat permanently updates the base model’s weights.
    - feedback: Not quite. That would require a training process, not ordinary inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: ordinary inference vs training update
    - represented term: training
    - source: same-card
    - rationale: Tempting because the model appears to adapt to the user.
  - v0279-training-q2-durable-memory: The model stores the prompt as durable memory inside its weights.
    - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
    - misconception: context vs durable memory/weights
    - represented term: memory
    - source: author-created misconception
    - rationale: Tempting because the model can refer to earlier chat context.
  - v0279-training-q2-optimizer-after-response: The optimizer trains the model after every response.
    - feedback: Close, but optimizers update weights during training, not after every normal response.
    - misconception: optimizer/weight update vs normal response
    - represented term: weight-update
    - source: same-card
    - rationale: Tempting because training and inference both involve model computation.

### Q3. v0279-training-q3

- Category: causal-consequence
- Stem: Why can training change how the model behaves tomorrow, while inference usually cannot?
- Correct choice: v0279-training-q3-correct
- Choices:
  - v0279-training-q3-correct: Training changes reusable weights; inference uses temporary computation for the current run. (correct)
    - feedback: Good distinction. Durable parameters carry forward; inference-time states usually do not.
  - v0279-training-q3-optimizer-inference: Inference is where the optimizer changes weights for future runs.
    - feedback: Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.
    - misconception: optimizer/weight update vs inference
    - represented term: weight-update
    - source: same-card
    - rationale: Tempting because both training and inference run model computations.
  - v0279-training-q3-prompt-only: Training only changes the visible prompt text for one response.
    - feedback: Close, but prompt changes are temporary input changes; training changes learned numbers.
    - misconception: prompt/context vs weights
    - represented term: prompt
    - source: nearby-stage
    - rationale: Tempting because prompt text clearly changes a response.
  - v0279-training-q3-truth-guarantee: Training guarantees that every future answer will be true.
    - feedback: This choice overclaims. Training can improve behavior, but it does not guarantee truth.
    - misconception: training improvement vs truth guarantee
    - represented term: probability
    - source: author-created misconception
    - rationale: Tempting because training sounds like making the model better.

### Q4. v0279-training-q4

- Category: model-trace
- Stem: In a training loop, which sequence is the durable learning path?
- Correct choice: v0279-training-q4-correct
- Choices:
  - v0279-training-q4-correct: Example -> prediction -> loss -> weight update. (correct)
    - feedback: Insight strengthened. That is the weight-changing path.
  - v0279-training-q4-generation-loop: Prompt -> response token -> append -> next response token.
    - feedback: Close, but that sequence describes inference/generation, not training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: training loop vs autoregressive generation
    - represented term: autoregression
    - source: nearby-stage
    - rationale: Tempting because this is the model’s generation loop.
  - v0279-training-q4-search-context: Search -> outside passage -> current context -> answer.
    - feedback: That describes a search or retrieval step. It can add temporary context; it does not by itself update weights.
    - misconception: training vs retrieval/context
    - represented term: retrieval
    - source: author-created misconception
    - rationale: Tempting because outside text can improve an answer.
  - v0279-training-q4-user-correction: User correction -> better answer -> permanent learning inside the same chat.
    - feedback: Not quite. A correction can steer the current conversation, but durable learning requires a training process.
    - misconception: conversation steering vs durable training
    - represented term: training
    - source: same-card
    - rationale: Tempting because a correction can improve the current conversation.

## Pretraining (4)

Stage: 1. Before Morning

Objective: Explain pretraining as broad durable pattern learning from many next-token targets, not perfect recall, live browsing, or a searchable archive.

### Q1. v0279-pretraining-q1

- Category: mechanism
- Stem: During pretraining, what signal teaches the model broad language patterns across many examples?
- Correct choice: v0279-pretraining-q1-correct
- Choices:
  - v0279-pretraining-q1-correct: Repeated prediction loss on next-token targets changes weights over many training steps. (correct)
    - feedback: Good distinction. Pretraining scales the training loop across many examples.
  - v0279-pretraining-q1-live-chat: A user conversation at deployment permanently rewrites the model.
    - feedback: Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.
    - misconception: pretraining vs inference
    - represented term: inference
    - source: same-card
    - rationale: Tempting because the model can seem to adapt inside a chat.
  - v0279-pretraining-q1-written-rules: A human writes every rule the model will follow.
    - feedback: Close, but pretraining is learned from examples, not a complete rulebook written by hand.
    - misconception: learned patterns vs symbolic rules
    - represented term: symbolic-ai
    - source: nearby-stage
    - rationale: Tempting because software often has hand-written rules.
  - v0279-pretraining-q1-perfect-copy: The model stores a perfect copy of every source document.
    - feedback: This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.
    - misconception: pattern learning vs perfect source recall
    - represented term: training-data
    - source: same-card
    - rationale: Tempting because source data influences the model.

### Q2. v0279-pretraining-q2

- Category: boundary
- Stem: Why can pretraining create broad capability without making the model a perfect library of its sources?
- Correct choice: v0279-pretraining-q2-correct
- Choices:
  - v0279-pretraining-q2-correct: It shapes patterns in weights; it is not a searchable copy of every source. (correct)
    - feedback: Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.
  - v0279-pretraining-q2-private-files: It gives the model direct access to every private file on demand.
    - feedback: Not quite. Training data exposure is not the same as access to every private file. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: training data vs universal file access
    - represented term: training-data
    - source: same-card
    - rationale: Tempting because broad training data can sound like broad access.
  - v0279-pretraining-q2-search-context: It inserts the original source into every future prompt context.
    - feedback: Close, but adding source text to context is different from pretraining. Pretraining changes weights before use.
    - misconception: pretraining vs retrieval/context
    - represented term: retrieval
    - source: author-created misconception
    - rationale: Tempting because source material can sometimes be added to a prompt.
  - v0279-pretraining-q2-after-user-prompt: It happens only after a user asks a specific question.
    - feedback: Pretraining happens before deployment. The user prompt later uses the pretrained weights.
    - misconception: pretraining vs deployment-time inference
    - represented term: inference
    - source: same-card
    - rationale: Tempting because learners meet the model only during use.

### Q3. v0279-pretraining-q3

- Category: causal-consequence
- Stem: If pretraining examples include many styles and task shapes, what can change inside the model?
- Correct choice: v0279-pretraining-q3-correct
- Choices:
  - v0279-pretraining-q3-correct: Weights shift so future prompts can activate useful language or code patterns. (correct)
    - feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
  - v0279-pretraining-q3-current-context: The model’s current chat context becomes permanently larger.
    - feedback: Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.
    - misconception: pretraining weights vs temporary context
    - represented term: context window
    - source: nearby-stage
    - rationale: Tempting because context also affects output.
  - v0279-pretraining-q3-interface: Only the app’s buttons, labels, or interface change.
    - feedback: This describes product UI changes, not the model’s learned parameters. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: model weights vs product interface
    - represented term: foundation-model
    - source: nearby-stage
    - rationale: Tempting because users meet models through apps.
  - v0279-pretraining-q3-safety-policy: Only a safety policy is added around the model.
    - feedback: Close, but a policy can shape a product around the model; pretraining changes the model’s reusable weights.
    - misconception: pretraining vs product policy wrapper
    - represented term: policy
    - source: nearby-stage
    - rationale: Tempting because products often include safety behavior.

### Q4. v02712-pretraining-q4

- Category: boundary
- Stem: A base model gives fact-like text about a public topic before any live search or lookup tool is connected. Which pretraining explanation is strongest?
- Correct choice: v02712-pretraining-q4-correct
- Choices:
  - v02712-pretraining-q4-correct: Past training shaped weights; source-like text is not proof of live search. (correct)
    - feedback: Good boundary. Pretraining can shape fact-like patterns without turning the model into a search engine.
  - v02712-pretraining-q4-2-retrieval: The model must have used a live lookup tool during the prompt.
    - feedback: Search is a system/tool action, not something pretraining proves. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model must have searched the web during the prompt.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-pretraining-q4-3-memory: The model opened a stored copy of the original page.
    - feedback: Pretraining does not make a perfect searchable library of every source. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model opened a stored copy of the original page.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-pretraining-q4-4-truth: The model became certain because the text sounded factual.
    - feedback: Fluent source-like text is not a truth guarantee. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model became certain because the text sounded factual.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

## Overfitting and Generalization (3)

Stage: 1. Before Morning

Objective: Diagnose overfitting and explain that set-aside validation examples are kept out of training to test transfer beyond examples used to fit weights.

### Q1. v0279-overfitting-generalization-q1

- Category: application
- Stem: A model gets every training example right but fails on new validation examples. What problem is showing up?
- Correct choice: v0279-overfitting-generalization-q1-correct
- Choices:
  - v0279-overfitting-generalization-q1-correct: Overfitting: the model fit training examples too narrowly to generalize well. (correct)
    - feedback: Good diagnosis. Set-aside validation examples are saved for testing, not used to fit the model.
  - v0279-overfitting-generalization-q1-generalization: Generalization: the model is working well on unseen cases.
    - feedback: Not quite. Generalization means good performance on new examples; this scenario shows the opposite.
    - misconception: overfitting vs generalization
    - represented term: generalization
    - source: same-card
    - rationale: Tempting because both terms describe training performance.
  - v0279-overfitting-generalization-q1-better-training: Better training: the model has clearly learned the general rule.
    - feedback: Not quite. If it fails on new validation examples, high training performance is not enough evidence of generalization.
    - misconception: training performance vs validation failure
    - represented term: training-data
    - source: same-card
    - rationale: Tempting because perfect training performance feels reassuring.
  - v0279-overfitting-generalization-q1-inference: Inference: the model is simply generating one token at a time.
    - feedback: Close, but inference is normal model use; overfitting is a training/evaluation failure mode.
    - misconception: training/evaluation failure vs inference process
    - represented term: inference
    - source: nearby-stage
    - rationale: Tempting because all later model use involves inference.

### Q2. v0279-overfitting-generalization-q2

- Category: human-use-judgment
- Stem: Why do model builders test on set-aside validation examples instead of only training examples?
- Correct choice: v0279-overfitting-generalization-q2-correct
- Choices:
  - v0279-overfitting-generalization-q2-correct: They are kept out of training so they can test whether learned patterns transfer. (correct)
    - feedback: Insight strengthened. Set-aside validation examples are saved for testing, not used to fit the model.
  - v0279-overfitting-generalization-q2-extra-training: Validation data is just extra training data used to lower loss.
    - feedback: Not quite. Validation examples are saved for testing, not used as extra examples to fit the model.
    - misconception: validation data vs training data
    - represented term: validation-data
    - source: same-card
    - rationale: Tempting because validation examples can look like more examples.
  - v0279-overfitting-generalization-q2-training-proves-all: Training examples alone prove the model will work everywhere.
    - feedback: This choice reveals the exact overfitting risk. Seen examples are not enough evidence.
    - misconception: training performance vs generalization
    - represented term: training-data
    - source: same-card
    - rationale: Tempting because high training accuracy feels reassuring.
  - v0279-overfitting-generalization-q2-loss-truth: A lower loss always proves every future answer is true.
    - feedback: Close, but lower loss is not a truth guarantee, especially outside the tested examples.
    - misconception: loss/probability vs truth guarantee
    - represented term: loss
    - source: nearby-stage
    - rationale: Tempting because lower loss often signals improvement.

### Q3. v0279-overfitting-generalization-q3

- Category: causal-consequence
- Stem: A model trained heavily on one narrow answer template works on that template but struggles with varied new prompts. What should a model-literate learner suspect?
- Correct choice: v0279-overfitting-generalization-q3-correct
- Choices:
  - v0279-overfitting-generalization-q3-correct: It may have fit the narrow examples too closely instead of learning a pattern that generalizes. (correct)
    - feedback: Good distinction. Targeted training can help, but narrow training can also make behavior brittle.
  - v0279-overfitting-generalization-q3-prompt-rewrite: The prompts permanently rewrote the model during inference.
    - feedback: Not quite. The issue is training behavior, not prompts rewriting weights during inference.
    - misconception: prompt/context vs training weight changes
    - represented term: prompt
    - source: nearby-stage
    - rationale: Tempting because prompts can change output behavior.
  - v0279-overfitting-generalization-q3-conscious-choice: The model learned the narrow template so well that broader prompts no longer matter.
    - feedback: That gives the model too much mind. The issue is brittle transfer, not intention. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: brittle transfer vs intention/conscious choice
    - represented term: llm
    - source: author-created misconception
    - rationale: Tempting because poor behavior can seem intentional.
  - v0279-overfitting-generalization-q3-rules-always-better: Rule-based AI is always better than learned models.
    - feedback: This overgeneralizes. The issue is narrow training behavior, not proof that rules always beat learned models.
    - misconception: overfitting diagnosis vs symbolic superiority claim
    - represented term: symbolic-ai
    - source: nearby-stage
    - rationale: Tempting because brittleness can make rules feel safer.

## Fine-Tuning (3)

Stage: 1. Before Morning

Objective: Distinguish fine-tuning or adapter training as durable post-pretraining adaptation from prompt, RAG, and sampling-time steering.

### Q1. v02712-fine-tuning-q1

- Category: application
- Stem: A team wants a support assistant to follow corporate norms across future conversations. Which move is closest to fine-tuning?
- Correct choice: v02712-fine-tuning-q1-correct
- Choices:
  - v02712-fine-tuning-q1-correct: Run additional training that changes weights or adapter behavior for later responses. (correct)
    - feedback: Insight strengthened. Fine-tuning is durable adaptation for future inference runs.
  - v02712-fine-tuning-q1-2-prompt: Paste the norms into one user prompt.
    - feedback: A prompt can steer the current run, but it is not durable training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Paste the norms into one user prompt.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-fine-tuning-q1-3-rag: Retrieve a policy page into the current context.
    - feedback: Retrieval adds temporary evidence; it does not by itself fine-tune weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Retrieve a policy page into the current context.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-fine-tuning-q1-4-sampling: Sample from a lower-temperature distribution.
    - feedback: Sampling changes a generation-time choice, not the model pattern carried forward. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Sample from a lower-temperature distribution.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02710-fine-tuning-q2

- Category: application
- Stem: A base model is adapted on thousands of institution-specific examples, then later answers new users in that style. What changed most directly?
- Correct choice: v02710-fine-tuning-q2-correct
- Choices:
  - v02710-fine-tuning-q2-correct: Adapted weights or adapter behavior can carry the pattern into later inference runs. (correct)
    - feedback: Insight strengthened. Fine-tuning makes a reusable model change, not just a one-chat hint.
  - v02710-fine-tuning-q2-context-only: Only the current context window got larger.
    - feedback: Not quite. A larger context window is temporary input space; fine-tuning changes reusable behavior.
    - misconception: context window vs fine-tuned behavior
    - represented term: context window
    - source: nearby-stage
    - rationale: Tempting because context can also carry institution-specific text.
  - v02710-fine-tuning-q2-memory: The model became conscious of the institution’s norms.
    - feedback: That gives the model too much mind. The behavior can be shaped without conscious commitment to norms.
    - misconception: mind/metaphor overreach
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because the assistant may sound norm-aware.
  - v02710-fine-tuning-q2-rag-search: The model must search the institution’s files every time.
    - feedback: Close, but fine-tuning and retrieval are different. Retrieval may be added, but fine-tuned behavior can persist in weights or adapters.
    - misconception: retrieval vs fine-tuning
    - represented term: retrieval
    - source: same-stage
    - rationale: Tempting because many institutional assistants also use search.

### Q3. v02710-fine-tuning-q3

- Category: causal-consequence
- Stem: If fine-tuning is used for alignment, what does that mean about future model behavior?
- Correct choice: v02710-fine-tuning-q3-correct
- Choices:
  - v02710-fine-tuning-q3-correct: Training can make instruction-following patterns more likely later. (correct)
    - feedback: Good distinction. Fine-tuning can support alignment by durably shaping output patterns.
  - v02710-fine-tuning-q3-perfect-safety: Future answers will tend to be safer, so evaluation is no longer needed.
    - feedback: Not quite. Fine-tuning can improve behavior, but it does not guarantee truth or safety.
    - misconception: alignment/fine-tuning as guarantee
    - represented term: alignment
    - source: nearby-stage
    - rationale: Tempting because alignment sounds like solving behavior.
  - v02710-fine-tuning-q3-system-prompt-only: Only the visible system prompt changed for one session.
    - feedback: Close, but a system prompt steers the current run. Fine-tuning is durable training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: runtime steering vs durable training
    - represented term: system prompt
    - source: same-card
    - rationale: Tempting because system prompts can steer behavior strongly.
  - v02710-fine-tuning-q3-inner-values: The model acquired human values and moral agency.
    - feedback: That gives the model too much mind. Fine-tuning changes output patterns; it does not create moral agency.
    - misconception: behavior shaping vs moral agency
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because aligned behavior can sound value-driven.

## Alignment (4)

Stage: 1. Before Morning

Objective: Reason about alignment as behavior shaping through training, prompts, policies, filters, evaluation, and deployment controls without treating it as conscience or truth guarantee.

### Q1. v02710-alignment-q1

- Category: boundary
- Stem: An alignment-shaped assistant refuses a harmful request and follows a safer instruction instead. What should a model-literate learner conclude?
- Correct choice: v02710-alignment-q1-correct
- Choices:
  - v02710-alignment-q1-correct: Behavior was shaped toward instructions and safety boundaries, not moral understanding. (correct)
    - feedback: Good distinction. Alignment shapes behavior; it is not magic morality.
  - v02710-alignment-q1-conscious: The model must understand morality the way a person does.
    - feedback: That gives the model too much mind. Refusal behavior can be shaped without human moral understanding.
    - misconception: aligned behavior vs moral agency
    - represented term: alignment
    - source: same-card
    - rationale: Tempting because refusals can sound principled.
  - v02710-alignment-q1-truth: Safer wording means the factual claims have already been verified.
    - feedback: Not quite. Alignment can shape behavior, but it does not guarantee factual truth. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: alignment vs truth guarantee
    - represented term: truth
    - source: nearby-stage
    - rationale: Tempting because safer behavior can feel more trustworthy.
  - v02710-alignment-q1-no-model: The LLM stopped using learned weights and became a rulebook.
    - feedback: Close, but an aligned product can still use a learned model plus rules, filters, or policies.
    - misconception: alignment controls vs learned model
    - represented term: rule-based AI
    - source: explicit-confusable
    - rationale: Tempting because aligned products may use rules or filters.

### Q2. v02710-alignment-q2

- Category: model-trace
- Stem: A product uses instruction fine-tuning, a system prompt, and a policy filter around one LLM. Which alignment map is most useful?
- Correct choice: v02710-alignment-q2-correct
- Choices:
  - v02710-alignment-q2-correct: Some alignment changes are durable training; others steer or filter the current run. (correct)
    - feedback: Insight strengthened. Alignment can happen through several layers, not one magic switch.
  - v02710-alignment-q2-all-weights: Every alignment layer permanently rewrites the model weights.
    - feedback: Not quite. Fine-tuning may change weights, but system prompts and filters can steer behavior at runtime.
    - misconception: runtime control vs durable weight update
    - represented term: weight update
    - source: same-card
    - rationale: Tempting because all layers affect visible behavior.
  - v02710-alignment-q2-only-prompt: Alignment is only a better prompt typed by the user.
    - feedback: Close, but alignment can include training, policies, evaluation, and runtime controls beyond the user prompt.
    - misconception: alignment vs user prompting only
    - represented term: prompt
    - source: nearby-stage
    - rationale: Tempting because prompts are visible and powerful.
  - v02710-alignment-q2-sampling-only: Alignment is the same thing as sampling the most probable token.
    - feedback: Sampling chooses a next token from probabilities. Alignment shapes or constrains behavior around that process.
    - misconception: alignment vs decoding
    - represented term: sampling
    - source: nearby-stage
    - rationale: Tempting because both affect the final response.

### Q3. v02710-alignment-q3

- Category: human-use-judgment
- Stem: Why do teams evaluate aligned models with tests and human feedback after training or deployment?
- Correct choice: v02710-alignment-q3-correct
- Choices:
  - v02710-alignment-q3-correct: Because shaped behavior can still fail, drift, or create unexpected tradeoffs in new situations. (correct)
    - feedback: Good distinction. Alignment needs evaluation; it is not a one-time guarantee.
  - v02710-alignment-q3-conscious-test: To check whether the model has developed a conscience.
    - feedback: Not quite. Evaluation checks behavior and outcomes, not inner conscience. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: evaluation vs consciousness
    - represented term: evaluation
    - source: same-card
    - rationale: Tempting because evaluations judge behavior.
  - v02710-alignment-q3-no-need: Because aligned models no longer need human review.
    - feedback: This choice overclaims. Aligned systems can still need review, monitoring, and accountability.
    - misconception: alignment vs human review
    - represented term: human review
    - source: nearby-stage
    - rationale: Tempting because alignment sounds like completion.
  - v02710-alignment-q3-loss-only: Because lower training loss alone proves the model is safe.
    - feedback: Close, but loss alone is not a full safety or usefulness evaluation. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: loss vs safety/behavior evaluation
    - represented term: loss
    - source: nearby-stage
    - rationale: Tempting because loss is an important training signal.

### Q4. v02712-alignment-q4

- Category: boundary
- Stem: A guardrail blocks one unsafe response before the user sees it. What changed most directly?
- Correct choice: v02712-alignment-q4-correct
- Choices:
  - v02712-alignment-q4-correct: A policy or filter layer changed visible output, not necessarily model weights. (correct)
    - feedback: Good distinction. Product-level controls can affect what users see without being a weight update.
  - v02712-alignment-q4-2-alignment: The model learned new moral values during that one response.
    - feedback: A blocked output is not evidence of a new conscience or durable training. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model learned new moral values during that one response.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Plausible because alignment is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-alignment-q4-3-prompt: The user prompt permanently rewrote the safety behavior.
    - feedback: Prompting can steer a run, but it usually does not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The user prompt permanently rewrote the safety behavior.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-alignment-q4-4-truth: A filter approval means the answer no longer needs evidence review.
    - feedback: A safety decision is not the same as fact verification. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The answer became guaranteed true because it was allowed through.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

## Inference (4)

Stage: 2. Morning Commute

Objective: Explain inference as a forward pass using fixed weights and temporary context-shaped states, not durable learning.

### Q1. v02710-inference-q1

- Category: mechanism
- Stem: During ordinary inference, the current context enters the model. What changes temporarily, and what usually stays fixed?
- Correct choice: v02710-inference-q1-correct
- Choices:
  - v02710-inference-q1-correct: Temporary internal states change; learned weights usually stay fixed. (correct)
    - feedback: Good distinction. Inference uses the map without redrawing it.
  - v02710-inference-q1-weights-change: The learned weights change after every user prompt.
    - feedback: Not quite. Ordinary inference can use context, but it usually does not rewrite weights.
    - misconception: inference vs training update
    - represented term: training
    - source: same-card
    - rationale: Tempting because the model may adapt within a conversation.
  - v02710-inference-q1-dataset: The training dataset changes to include the new prompt.
    - feedback: This choice reveals a common mix-up. A prompt can be current context without joining the training dataset.
    - misconception: prompt/context vs training data
    - represented term: training data
    - source: same-card
    - rationale: Tempting because prompts feel like new information.
  - v02710-inference-q1-conscious: The model’s conscious attention shifts to the user’s intent.
    - feedback: That gives the model too much mind. Inference computes temporary vectors; it is not conscious attention.
    - misconception: attention/activation vs awareness
    - represented term: attention
    - source: nearby-stage
    - rationale: Tempting because the response may seem attentive.

### Q2. v02710-inference-q2

- Category: model-trace
- Stem: In one inference step, which trace best matches the model path before the next token appears?
- Correct choice: v02710-inference-q2-correct
- Choices:
  - v02710-inference-q2-correct: Context enters a forward pass, temporary states form, raw scores appear, and a token can be chosen. (correct)
    - feedback: Insight strengthened. That is the live next-token path through inference.
  - v02710-inference-q2-training-loop: Example enters training, loss updates weights, and a future model checkpoint is saved.
    - feedback: Close, but that is a training path. Inference uses existing weights to produce the next-token scores.
    - misconception: training loop vs inference trace
    - represented term: training
    - source: nearby-stage
    - rationale: Tempting because it is also a model computation path.
  - v02710-inference-q2-rag-loop: Retriever searches outside documents, then the model permanently learns the snippets.
    - feedback: Retrieval can add context before inference, but it does not by itself make the model permanently learn snippets.
    - misconception: retrieval/context vs durable learning
    - represented term: RAG
    - source: nearby-stage
    - rationale: Tempting because retrieval may happen before generation.
  - v02710-inference-q2-tokenizer-only: Tokenizer splits text and the answer appears without model layers.
    - feedback: Tokenization prepares input, but inference still runs model layers to produce scores. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: tokenization vs model forward pass
    - represented term: tokenization
    - source: same-stage
    - rationale: Tempting because tokenization is an early required step.

### Q3. v02710-inference-q3

- Category: application
- Stem: A chatbot remembers an earlier line in the same conversation and uses it in the next answer. What is the best model-level explanation?
- Correct choice: v02710-inference-q3-correct
- Choices:
  - v02710-inference-q3-correct: The earlier line is still in context, so fixed weights can use it during inference. (correct)
    - feedback: Good distinction. Context can feel like memory while still being temporary input.
  - v02710-inference-q3-weight-memory: The earlier line was written into the model’s weights.
    - feedback: Not quite. Same-conversation context is temporary input, not necessarily a weight update.
    - misconception: context vs durable memory
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because the model appears to remember.
  - v02710-inference-q3-training-now: The chatbot fine-tuned itself on the earlier line.
    - feedback: Close, but adaptation within a context window is not the same as fine-tuning. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: ordinary inference vs fine-tuning
    - represented term: fine-tuning
    - source: same-stage
    - rationale: Tempting because the answer adapts to the conversation.
  - v02710-inference-q3-search-all: The model searched every document it was pretrained on.
    - feedback: This describes search better than ordinary inference. The model can use visible context without searching training sources.
    - misconception: inference vs search/retrieval
    - represented term: retrieval
    - source: nearby-stage
    - rationale: Tempting because the answer may include earlier information.

### Q4. v02710-inference-q4

- Category: causal-consequence
- Stem: If ordinary inference normally does not update weights, what follows for future conversations?
- Correct choice: v02710-inference-q4-correct
- Choices:
  - v02710-inference-q4-correct: A useful answer now does not automatically teach the base model for tomorrow. (correct)
    - feedback: Insight strengthened. Inference can be useful without being durable training.
  - v02710-inference-q4-auto-learn: Every good answer automatically becomes permanent skill.
    - feedback: Not quite. Durable skill changes require training or another model-update process. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: inference vs durable learning
    - represented term: training
    - source: same-card
    - rationale: Tempting because the response looks like successful practice.
  - v02710-inference-q4-no-context: The current prompt cannot affect the answer at all.
    - feedback: Close, but fixed weights can still respond differently to different current contexts. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: context influence vs weight update
    - represented term: prompt
    - source: same-card
    - rationale: Tempting because weights stay fixed.
  - v02710-inference-q4-no-risk: There is no need to review outputs because inference is temporary.
    - feedback: This choice overclaims. Temporary outputs can still affect people and decisions, so review can matter.
    - misconception: temporary computation vs output risk
    - represented term: human review
    - source: nearby-stage
    - rationale: Tempting because temporary sounds harmless.

## Prompt vs Response (3)

Stage: 2. Morning Commute

Objective: Separate given prompt/context tokens from generated response tokens and explain that generated tokens are appended into the next inference context.

### Q1. v02710-prompt-response-q1

- Category: boundary
- Stem: A user gives a complete prompt, then the model begins writing response tokens. Which boundary matters most?
- Correct choice: v02710-prompt-response-q1-correct
- Choices:
  - v02710-prompt-response-q1-correct: Prompt tokens are given; response tokens are generated and appended to context. (correct)
    - feedback: Good distinction. Prompt is given; response is generated and appended.
  - v02710-prompt-response-q1-all-user: Both prompt and response tokens were typed by the user.
    - feedback: Not quite. The user provides the prompt; the model generates response tokens. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: prompt vs generated response
    - represented term: response
    - source: same-card
    - rationale: Tempting because both can appear together in the conversation transcript.
  - v02710-prompt-response-q1-all-at-once: The model writes the whole response at once after reading the prompt.
    - feedback: Close, but the model generates response tokens step by step. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: autoregressive generation vs full answer at once
    - represented term: autoregression
    - source: same-card
    - rationale: Tempting because the interface may show a smooth answer.
  - v02710-prompt-response-q1-weight-update: Each response token permanently updates the model’s weights.
    - feedback: This choice reveals a common mix-up. Response tokens can shape the current run without updating weights.
    - misconception: generated context vs durable training
    - represented term: training
    - source: nearby-stage
    - rationale: Tempting because response-so-far shapes later tokens.

### Q2. v02710-prompt-response-q2

- Category: model-trace
- Stem: After the model chooses one next response token, what does the next inference step see?
- Correct choice: v02710-prompt-response-q2-correct
- Choices:
  - v02710-prompt-response-q2-correct: The original prompt plus the response so far, including the new token. (correct)
    - feedback: Insight strengthened. The context grows as generated response tokens are appended.
  - v02710-prompt-response-q2-only-new-token: Only the newly chosen token, with the prompt removed.
    - feedback: Not quite. The next step can use the prompt and response-so-far that remain in context.
    - misconception: context accumulation vs isolated token
    - represented term: context window
    - source: same-card
    - rationale: Tempting because the new token is the most recent event.
  - v02710-prompt-response-q2-weight-memory: A permanent memory of the token stored in model weights.
    - feedback: Close, but using a token later in the run is context, not a weight update. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: response-so-far vs weight memory
    - represented term: weight
    - source: nearby-stage
    - rationale: Tempting because the model uses the new token later.
  - v02710-prompt-response-q2-softmax-removed: No context, because softmax disappears after one token.
    - feedback: Softmax can help choose a token, but the chosen token can still be appended to the next context.
    - misconception: decoding step vs context persistence
    - represented term: softmax
    - source: nearby-stage
    - rationale: Tempting because softmax is a later token-choice mechanism.

### Q3. v02710-prompt-response-q3

- Category: misconception-check
- Stem: A generated response improves after the user adds a clarifying sentence. What changed most directly?
- Correct choice: v02710-prompt-response-q3-correct
- Choices:
  - v02710-prompt-response-q3-correct: Better current context helped the next response tokens come from better input. (correct)
    - feedback: Good distinction. Better context can improve the current response without training the model.
  - v02710-prompt-response-q3-finetuned: The model was fine-tuned by the clarifying sentence.
    - feedback: Not quite. A clarifying sentence can steer the current run; fine-tuning is additional training.
    - misconception: prompt steering vs fine-tuning
    - represented term: fine-tuning
    - source: same-stage
    - rationale: Tempting because the answer improves after feedback.
  - v02710-prompt-response-q3-conscious: The model understood its mistake like a person and decided to improve.
    - feedback: That gives the model too much mind. Better output can come from better context. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: human revision vs generated behavior
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because the interaction resembles human revision.
  - v02710-prompt-response-q3-no-effect: Prompts cannot affect generated response tokens.
    - feedback: Close, but fixed weights still process different prompts into different response probabilities.
    - misconception: prompt influence vs fixed weights
    - represented term: prompt
    - source: same-card
    - rationale: Tempting because weights stay fixed during inference.

## Tokenization (3)

Stage: 2. Morning Commute

Objective: Explain tokenization as turning text into model-readable chunks that may be words, word pieces, punctuation, or other units before ID lookup.

### Q1. v02710-tokens-q1

- Category: application
- Stem: A tokenizer splits “startled.” into pieces like “start”, “led”, and “.” What should that tell a learner?
- Correct choice: v02710-tokens-q1-correct
- Choices:
  - v02710-tokens-q1-correct: Tokens can be uneven text chunks, including word pieces and punctuation. (correct)
    - feedback: Good distinction. Tokens are model-readable chunks, not always whole words.
  - v02710-tokens-q1-whole-word: Every token must be a complete dictionary word.
    - feedback: Not quite. Tokenizers can split words, punctuation, spaces, or other chunks. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: token vs word
    - represented term: token
    - source: same-card
    - rationale: Tempting because many displayed tokens look word-like.
  - v02710-tokens-q1-memory: Each token is a permanent memory stored in the model.
    - feedback: This choice reveals a common mix-up. A token is a representation chunk, not memory by itself.
    - misconception: token vs memory
    - represented term: memory
    - source: author-created misconception
    - rationale: Tempting because tokens are reused in later processing.
  - v02710-tokens-q1-concept: Each token is exactly one human concept.
    - feedback: Close, but token boundaries do not perfectly match human concepts or meanings. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: token chunk vs meaning/concept
    - represented term: embedding
    - source: nearby-stage
    - rationale: Tempting because tokens often carry meaning clues.

### Q2. v02710-tokens-q2

- Category: model-trace
- Stem: Before transformer layers process text, which tokens-to-IDs-to-embeddings path comes first?
- Correct choice: v02710-tokens-q2-correct
- Choices:
  - v02710-tokens-q2-correct: Text is split into tokens, tokens map to token IDs, and IDs look up embeddings. (correct)
    - feedback: Insight strengthened. Tokenization starts the bridge from text to numerical computation.
  - v02710-tokens-q2-raw-english: Raw English sentences move through every layer without numerical representation.
    - feedback: Not quite. The model needs numerical representations, starting with tokens and IDs. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: raw text vs numerical representation
    - represented term: tokenization
    - source: same-card
    - rationale: Tempting because users see text at the interface.
  - v02710-tokens-q2-weights-first: Weights are rewritten before text becomes tokens.
    - feedback: Close, but tokenization prepares the input; it does not rewrite weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: tokenization vs training update
    - represented term: weight
    - source: nearby-stage
    - rationale: Tempting because weights are central to the model.
  - v02710-tokens-q2-response-first: The model generates the finished response before tokenization happens.
    - feedback: Generation also uses tokens. Text needs token representation before model layers can process it.
    - misconception: generation order vs tokenization
    - represented term: response
    - source: same-stage
    - rationale: Tempting because users notice the final text first.

### Q3. v02710-tokens-q3

- Category: boundary
- Stem: Both the user prompt and the generated response eventually appear as text. How does tokenization treat them?
- Correct choice: v02710-tokens-q3-correct
- Choices:
  - v02710-tokens-q3-correct: Prompt text and generated response text can both be represented as tokens. (correct)
    - feedback: Good distinction. Tokenization applies to text entering and leaving the generation loop.
  - v02710-tokens-q3-prompt-only: Only prompt text becomes tokens; response text skips token IDs.
    - feedback: Not quite. Generated response tokens are token IDs before being displayed as text. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: prompt token vs response token
    - represented term: response token
    - source: same-card
    - rationale: Tempting because the user sees the response as text.
  - v02710-tokens-q3-response-only: Only response text becomes tokens; prompts stay as raw English.
    - feedback: Close, but prompts also need token representation before model processing. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: prompt token vs raw prompt
    - represented term: prompt token
    - source: same-card
    - rationale: Tempting because prompts feel natural to humans.
  - v02710-tokens-q3-training: Tokenizing either one permanently trains the model.
    - feedback: This choice reveals a common mix-up. Tokenization represents text; it does not update weights.
    - misconception: tokenization vs training
    - represented term: training
    - source: nearby-stage
    - rationale: Tempting because tokenization is a required model step.

## Token IDs (3)

Stage: 2. Morning Commute

Objective: Explain token IDs as lookup keys from token chunks to embedding rows, not meanings, memories, or source retrieval by themselves.

### Q1. v02710-token-ids-q1

- Category: mechanism
- Stem: After tokenization, the token “dog” maps to an integer ID. What does the model use that ID for next?
- Correct choice: v02710-token-ids-q1-correct
- Choices:
  - v02710-token-ids-q1-correct: To look up a learned starting vector in the embedding table. (correct)
    - feedback: Good distinction. The ID is a lookup key for an embedding vector.
  - v02710-token-ids-q1-meaning: To store the complete meaning of dog inside the number itself.
    - feedback: Not quite. The number itself is not the meaning; it points to learned numerical patterns.
    - misconception: ID number vs learned meaning pattern
    - represented term: token ID
    - source: same-card
    - rationale: Tempting because the ID consistently points to that token.
  - v02710-token-ids-q1-memory: To permanently remember this user’s sentence.
    - feedback: This choice reveals a common mix-up. Token IDs represent chunks; they do not store a user memory.
    - misconception: representation vs durable memory
    - represented term: memory
    - source: author-created misconception
    - rationale: Tempting because IDs are reusable in model processing.
  - v02710-token-ids-q1-skip: To skip embeddings and tensors entirely.
    - feedback: Close, but the ID is a lookup key; embeddings and tensors still carry numerical representation forward.
    - misconception: token ID vs embedding/tensor pipeline
    - represented term: embedding
    - source: same-card
    - rationale: Tempting because the ID is already numeric.

### Q2. v02710-token-ids-q2

- Category: boundary
- Stem: A learner says “982 means cat because the ID is the meaning.” What correction is most model-literate?
- Correct choice: v02710-token-ids-q2-correct
- Choices:
  - v02710-token-ids-q2-correct: 982 is a lookup number; meaning comes from embeddings, layers, and context. (correct)
    - feedback: Insight strengthened. The ID points into the system; it is not understanding by itself.
  - v02710-token-ids-q2-conscious: 982 means cat because the model consciously understands the number.
    - feedback: That gives the model too much mind. A lookup number does not imply conscious understanding.
    - misconception: ID/meaning vs consciousness
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because the model uses the ID fluently.
  - v02710-token-ids-q2-truth: 982 guarantees every sentence about cats will be true.
    - feedback: Not quite. Token IDs do not guarantee factual output. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: token ID vs truth
    - represented term: truth
    - source: nearby-stage
    - rationale: Tempting because the token has a stable identity.
  - v02710-token-ids-q2-random-every-run: 982 is randomly redefined every time the user sends a prompt.
    - feedback: Close, but token ID mappings are fixed for a tokenizer/model setup; sampling randomness is a different step.
    - misconception: stable tokenizer mapping vs per-run randomness
    - represented term: tokenizer
    - source: same-card
    - rationale: Tempting because sampling can be random later.

### Q3. v02710-token-ids-q3

- Category: model-trace
- Stem: During generation, the model chooses a next response token ID before the user sees text. What happens after that?
- Correct choice: v02710-token-ids-q3-correct
- Choices:
  - v02710-token-ids-q3-correct: The chosen ID can display as text and append as a response token. (correct)
    - feedback: Good distinction. Generated tokens are IDs before they become visible text.
  - v02710-token-ids-q3-weight-update: The chosen ID permanently updates the model weights.
    - feedback: Not quite. The chosen token can affect the next context without changing weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: generated token vs training update
    - represented term: weight
    - source: nearby-stage
    - rationale: Tempting because the token affects the next step.
  - v02710-token-ids-q3-raw-word: The model skips IDs and chooses only raw human words.
    - feedback: Close, but the model works with token IDs before text is displayed. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: token IDs vs raw text generation
    - represented term: token
    - source: same-card
    - rationale: Tempting because users see words on screen.
  - v02710-token-ids-q3-retrieve-source: The ID retrieves the original training document for that word.
    - feedback: This describes retrieval better than token ID lookup. Token IDs point to token representations, not original documents.
    - misconception: token ID lookup vs retrieval/source
    - represented term: retrieval
    - source: nearby-stage
    - rationale: Tempting because lookup sounds like fetching a source.

## Embeddings (2)

Stage: 2. Morning Commute

Objective: Distinguish an embedding as a learned starting vector retrieved from a durable embedding table from a temporary hidden state shaped by context.

### Q1. v02712-embeddings-q1

- Category: mechanism
- Stem: The token ID for "dog" looks up a vector before the sentence context is processed. What is that vector?
- Correct choice: v02712-embeddings-q1-correct
- Choices:
  - v02712-embeddings-q1-correct: A learned starting vector from the embedding table. (correct)
    - feedback: Insight strengthened. The embedding is the token ID's learned numerical starting point.
  - v02712-embeddings-q1-2-hidden-state: The temporary hidden state after attention has read the sentence.
    - feedback: That describes a later context-shaped vector, not the starting lookup. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The temporary hidden state after attention has read the sentence.
    - represented term: hidden state
    - source: explicit-confusable
    - rationale: Plausible because hidden state is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-embeddings-q1-3-token-id: The integer ID itself, before any lookup happens.
    - feedback: The ID is a lookup key, not the vector returned by the table. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The integer ID itself, before any lookup happens.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-embeddings-q1-4-definition: A human-readable dictionary definition stored in English.
    - feedback: Embeddings are numerical vectors, not text definitions. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: A human-readable dictionary definition stored in English.
    - represented term: definition
    - source: explicit-confusable
    - rationale: Plausible because definition is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-embeddings-q2

- Category: boundary
- Stem: The same token starts with one embedding but appears in two different sentences. What can make its later internal vector differ during inference?
- Correct choice: v02712-embeddings-q2-correct
- Choices:
  - v02712-embeddings-q2-correct: Context and layers reshape the starting vector into a temporary internal state. (correct)
    - feedback: Good distinction. Embeddings start the token; hidden states are shaped by context during inference.
  - v02712-embeddings-q2-2-weight-update: The embedding table rewrites itself during ordinary inference.
    - feedback: Ordinary inference usually uses fixed learned weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The embedding table rewrites itself during ordinary inference.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-embeddings-q2-3-token-id: The token ID changes meaning by becoming a new integer.
    - feedback: The ID remains a lookup key; later vectors carry contextual information. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The token ID changes meaning by becoming a new integer.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-embeddings-q2-4-memory: The model stores a permanent memory of each sentence.
    - feedback: Temporary hidden states are not permanent memories. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The model stores a permanent memory of each sentence.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

## Vectors (3)

Stage: 2. Morning Commute

Objective: Explain vectors as numerical representations with distributed features and distinguish vectors from scalar IDs, tensors, and human-readable labels.

### Q1. v02712-vectors-q1

- Category: mechanism
- Stem: A learner sees a long row of numbers representing a token. What makes it a vector in the model trace?
- Correct choice: v02712-vectors-q1-correct
- Choices:
  - v02712-vectors-q1-correct: It is an ordered numerical representation the model can compute with. (correct)
    - feedback: Insight strengthened. Vectors let the model carry many numerical features at once.
  - v02712-vectors-q1-2-token-id: It is a single integer lookup key.
    - feedback: That describes a token ID, not a vector of many values. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: It is a single integer lookup key.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q1-3-tensor: It is a shaped block with several axes such as tokens and features.
    - feedback: That is closer to a tensor; a vector is one-dimensional. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It is a shaped block with several axes such as tokens and features.
    - represented term: tensor
    - source: explicit-confusable
    - rationale: Plausible because tensor is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q1-4-token: It is the visible word shown to the user.
    - feedback: Visible text is converted before the model computes with vectors. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It is the visible word shown to the user.
    - represented term: token
    - source: explicit-confusable
    - rationale: Plausible because token is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-vectors-q2

- Category: misconception-check
- Stem: A vector dimension feels tempting to label as "humor" or "truth." What should the learner remember?
- Correct choice: v02712-vectors-q2-correct
- Choices:
  - v02712-vectors-q2-correct: Features are distributed across dimensions, not one neat human label each. (correct)
    - feedback: Good distinction. Vector meaning is spread out and computed, not stored as neat labels.
  - v02712-vectors-q2-2-feature: Each dimension is a named English category.
    - feedback: That makes distributed features too literal. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Each dimension is a named English category.
    - represented term: feature
    - source: explicit-confusable
    - rationale: Plausible because feature is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q2-3-memory: Each vector is a saved chat memory.
    - feedback: A vector representation is not a stored conversation. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Each vector is a saved chat memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q2-4-citation: Each vector is a complete citation to a source.
    - feedback: Vectors do not carry source citations by themselves. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Each vector is a complete citation to a source.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-vectors-q3

- Category: boundary
- Stem: An embedding row and a later internal state can both be vectors. Which boundary matters?
- Correct choice: v02712-vectors-q3-correct
- Choices:
  - v02712-vectors-q3-correct: One can be a durable learned parameter; the other is temporary during a run. (correct)
    - feedback: Good boundary. Some vectors live in learned model data, while others are temporary activations.
  - v02712-vectors-q3-2-memory: Both are permanent memories of the user conversation.
    - feedback: Conversation memory is a different product feature, not what these vectors are. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Both are permanent memories of the user conversation.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q3-3-token-id: Both are token IDs before embedding lookup.
    - feedback: A token ID is a scalar lookup key, not the vector itself. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Both are token IDs before embedding lookup.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-vectors-q3-4-response-token: Both are visible words after generation.
    - feedback: Visible text is the display side, not the internal vector state. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Both are visible words after generation.
    - represented term: response token
    - source: explicit-confusable
    - rationale: Plausible because response token is nearby, but this choice preserves a misconception the card is designed to correct.

## Tensors (2)

Stage: 2. Morning Commute

Objective: Explain tensors as shaped numerical blocks that organize many token vectors and features for layer operations.

### Q1. v02712-tensors-q1

- Category: mechanism
- Stem: A model processes many token vectors arranged by token position and feature dimension. What makes that structure a tensor?
- Correct choice: v02712-tensors-q1-correct
- Choices:
  - v02712-tensors-q1-correct: It is a shaped numerical block with dimensions model operations can use. (correct)
    - feedback: Insight strengthened. Tensors organize numbers so layers can process positions, features, batches, or heads.
  - v02712-tensors-q1-2-token-id: It is one token ID for one word piece.
    - feedback: A token ID is a lookup key, not a shaped numerical block. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: It is one token ID for one word piece.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-tensors-q1-3-rule-based-ai: It is a rule written by a programmer.
    - feedback: A tensor is data the model computes over, not an if-then rule. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It is a rule written by a programmer.
    - represented term: rule-based AI
    - source: explicit-confusable
    - rationale: Plausible because rule-based AI is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-tensors-q1-4-memory: It is a permanent memory of every prompt.
    - feedback: Tensors can be temporary activations or learned parameters, not conversation memory by default.
    - misconception: It is a permanent memory of every prompt.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-tensors-q2

- Category: boundary
- Stem: During training, a weight tensor changes. During inference, an activation tensor appears briefly. Which distinction is most useful?
- Correct choice: v02712-tensors-q2-correct
- Choices:
  - v02712-tensors-q2-correct: Weight tensors can be durable; activation tensors are temporary run-time values. (correct)
    - feedback: Good distinction. Tensor names can describe shape, while durability depends on whether the tensor is a parameter or an activation.
  - v02712-tensors-q2-2-activation: All tensors are temporary and vanish after every token.
    - feedback: That ignores learned parameter tensors. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: All tensors are temporary and vanish after every token.
    - represented term: activation
    - source: explicit-confusable
    - rationale: Plausible because activation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-tensors-q2-3-memory: All tensors are permanent and become model memory.
    - feedback: That ignores temporary activation tensors. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: All tensors are permanent and become model memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-tensors-q2-4-token: Tensors are only visible words arranged in rows.
    - feedback: The model uses numerical arrays, not visible text tables. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Tensors are only visible words arranged in rows.
    - represented term: token
    - source: explicit-confusable
    - rationale: Plausible because token is nearby, but this choice preserves a misconception the card is designed to correct.

## Attention (4)

Stage: 3. Workday

Objective: Explain attention as temporary weighted relevance between token positions that shapes hidden states, not human awareness or final token choice by itself.

### Q1. v02712-attention-q1

- Category: application
- Stem: In "The dog chased the ball because it bounced," the model must relate "it" to earlier tokens. What is attention doing?
- Correct choice: v02712-attention-q1-correct
- Choices:
  - v02712-attention-q1-correct: Weighting relevance between token positions in the current context. (correct)
    - feedback: Insight strengthened. Attention is weighted relevance between positions, not awareness.
  - v02712-attention-q1-2-awareness: Giving the model conscious focus on the sentence.
    - feedback: Attention here is a calculation, not human attention. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Giving the model conscious focus on the sentence.
    - represented term: awareness
    - source: explicit-confusable
    - rationale: Plausible because awareness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q1-3-sampling: Choosing the final next token from probabilities.
    - feedback: Sampling happens later after scores become probabilities. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Choosing the final next token from probabilities.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q1-4-weight-update: Rewriting the model weights to remember the sentence.
    - feedback: The attention pattern is temporary during inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Rewriting the model weights to remember the sentence.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-attention-q2

- Category: boundary
- Stem: A learner says attention is permanent memory because it links words. What is the better boundary?
- Correct choice: v02712-attention-q2-correct
- Choices:
  - v02712-attention-q2-correct: Learned attention weights persist, but one prompt's attention pattern is temporary. (correct)
    - feedback: Good boundary. The current relevance pattern is made for this run and does not become stored memory by itself.
  - v02712-attention-q2-2-memory: Every attention link becomes a saved user memory.
    - feedback: Temporary relevance patterns are not saved memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Every attention link becomes a saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q2-3-retrieval: Attention is the same as a retrieval system searching documents.
    - feedback: Retrieval can add text to context; attention works inside the model over positions. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Attention is the same as a retrieval system searching documents.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q2-4-hidden-state: Attention replaces the need for hidden states.
    - feedback: Attention helps shape hidden states rather than replacing them. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Attention replaces the need for hidden states.
    - represented term: hidden state
    - source: explicit-confusable
    - rationale: Plausible because hidden state is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-attention-q3

- Category: boundary
- Stem: Attention and the MLP both appear inside transformer layers. Which contrast is most accurate?
- Correct choice: v02712-attention-q3-correct
- Choices:
  - v02712-attention-q3-correct: Attention mixes information across positions; the MLP reshapes features within each position. (correct)
    - feedback: Good distinction. The two operations help in different ways inside a layer.
  - v02712-attention-q3-2-mlp: Attention reshapes features within one position while the MLP searches documents.
    - feedback: That swaps the roles and adds retrieval where it does not belong. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Attention reshapes features within one position while the MLP searches documents.
    - represented term: MLP
    - source: explicit-confusable
    - rationale: Plausible because MLP is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q3-3-sampling: Attention chooses the next token while the MLP converts logits to probabilities.
    - feedback: Next-token choice and softmax happen later in the Decision Room. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Attention chooses the next token while the MLP converts logits to probabilities.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q3-4-awareness: Attention is human awareness while the MLP is moral judgment.
    - feedback: Both are computations, not mental or moral faculties. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Attention is human awareness while the MLP is moral judgment.
    - represented term: awareness
    - source: explicit-confusable
    - rationale: Plausible because awareness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-attention-q4

- Category: model-trace
- Stem: After tokens become vectors and tensors, where does attention fit in the workday stage?
- Correct choice: v02712-attention-q4-correct
- Choices:
  - v02712-attention-q4-correct: Inside transformer layers, shaping temporary hidden states from current context. (correct)
    - feedback: Insight strengthened. Attention is one layer operation in the forward pass.
  - v02712-attention-q4-2-tokenization: Before tokenization, deciding how text should be split.
    - feedback: Tokenization happens before vectors and layers. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Before tokenization, deciding how text should be split.
    - represented term: tokenization
    - source: explicit-confusable
    - rationale: Plausible because tokenization is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q4-3-memory: After sampling, permanently storing the answer.
    - feedback: Attention is not post-response storage. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: After sampling, permanently storing the answer.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-attention-q4-4-rag: Outside the model, searching every connected file.
    - feedback: That describes retrieval, not attention inside layers. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Outside the model, searching every connected file.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

## MLP (3)

Stage: 3. Workday

Objective: Explain the MLP as per-token feature reshaping inside each layer, distinct from attention mixing across token positions.

### Q1. v02712-mlp-q1

- Category: mechanism
- Stem: After attention has mixed information across token positions, a layer reshapes each position's feature vector. Which component is doing that work?
- Correct choice: v02712-mlp-q1-correct
- Choices:
  - v02712-mlp-q1-correct: The MLP, using learned weights to transform features at each token position. (correct)
    - feedback: Insight strengthened. The MLP is per-position feature reshaping inside the layer.
  - v02712-mlp-q1-2-attention: Attention, because attention is the per-token feature reshaper.
    - feedback: Attention mainly handles relevance across positions. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Attention, because attention is the per-token feature reshaper.
    - represented term: attention
    - source: explicit-confusable
    - rationale: Plausible because attention is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q1-3-sampling: Sampling, because sampling rewrites features before softmax.
    - feedback: Sampling chooses a token later; it does not reshape layer features. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Sampling, because sampling rewrites features before softmax.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q1-4-retrieval: Retrieval, because retrieval searches private files for features.
    - feedback: Retrieval is an outside-system step, not the MLP operation. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Retrieval, because retrieval searches private files for features.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-mlp-q2

- Category: boundary
- Stem: The MLP has learned weights, but the feature values it produces during one answer are temporary. What does that mean?
- Correct choice: v02712-mlp-q2-correct
- Choices:
  - v02712-mlp-q2-correct: The learned MLP parameters persist; this prompt's activations do not. (correct)
    - feedback: Good boundary. Durable weights and temporary activations are different parts of the same operation.
  - v02712-mlp-q2-2-weight-update: Every activation becomes a new model weight.
    - feedback: Ordinary inference does not turn activations into weight updates. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Every activation becomes a new model weight.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q2-3-parameter: The MLP has no learned parameters at all.
    - feedback: The MLP uses learned weights even during inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The MLP has no learned parameters at all.
    - represented term: parameter
    - source: explicit-confusable
    - rationale: Plausible because parameter is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q2-4-memory: The MLP stores the user prompt as permanent memory.
    - feedback: Temporary activations are not user memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The MLP stores the user prompt as permanent memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-mlp-q3

- Category: misconception-check
- Stem: A learner says the MLP is what links pronouns to earlier nouns. What nearby concept are they probably mixing in?
- Correct choice: v02712-mlp-q3-correct
- Choices:
  - v02712-mlp-q3-correct: Attention, because attention weights relevance between token positions. (correct)
    - feedback: Good distinction. Pronoun-style cross-position relevance belongs to attention more than the MLP.
  - v02712-mlp-q3-2-softmax: Softmax, because softmax links words across the context.
    - feedback: Softmax converts scores to probabilities later. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Softmax, because softmax links words across the context.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q3-3-token-id: Token IDs, because IDs compare sentence positions.
    - feedback: IDs are lookup numbers, not cross-position relevance. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Token IDs, because IDs compare sentence positions.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-mlp-q3-4-fine-tuning: Fine-tuning, because every pronoun link updates weights.
    - feedback: Fine-tuning is training; this is an inference-time operation. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Fine-tuning, because every pronoun link updates weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.

## Layers (4)

Stage: 3. Workday

Objective: Explain transformer layers as repeated attention-plus-MLP transformations that refine temporary hidden states without implying human thought steps.

### Q1. v02712-layers-q1

- Category: mechanism
- Stem: A transformer block repeats attention and MLP operations. What is being refined as the prompt moves through layers?
- Correct choice: v02712-layers-q1-correct
- Choices:
  - v02712-layers-q1-correct: Temporary hidden states for each token position. (correct)
    - feedback: Insight strengthened. Layers repeatedly transform internal states during the forward pass.
  - v02712-layers-q1-2-training-data: The original training dataset.
    - feedback: The dataset is not being edited during inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The original training dataset.
    - represented term: training data
    - source: explicit-confusable
    - rationale: Plausible because training data is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q1-3-interface: The user interface around the model.
    - feedback: The UI may wrap the model, but layers are internal model operations. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The user interface around the model.
    - represented term: interface
    - source: explicit-confusable
    - rationale: Plausible because interface is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q1-4-memory: A permanent memory of the conversation.
    - feedback: Hidden states are temporary unless another system stores information separately. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: A permanent memory of the conversation.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-layers-q2

- Category: boundary
- Stem: Layer weights are reused across many prompts, while hidden states appear for one run. Which boundary matters?
- Correct choice: v02712-layers-q2-correct
- Choices:
  - v02712-layers-q2-correct: Durable layer parameters differ from temporary layer activations. (correct)
    - feedback: Good distinction. A layer contains learned weights, but each prompt creates temporary values.
  - v02712-layers-q2-2-weight-update: Every layer activation becomes durable training.
    - feedback: Activations during inference usually do not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Every layer activation becomes durable training.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q2-3-parameter: Layer weights vanish after each response.
    - feedback: Learned parameters are reused in future runs. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Layer weights vanish after each response.
    - represented term: parameter
    - source: explicit-confusable
    - rationale: Plausible because parameter is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q2-4-response: Layers are only visible paragraphs in the answer.
    - feedback: Layers are internal computations, not the displayed response. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Layers are only visible paragraphs in the answer.
    - represented term: response
    - source: explicit-confusable
    - rationale: Plausible because response is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-layers-q3

- Category: misconception-check
- Stem: A learner imagines each layer as a human-like thought step. What should replace that picture?
- Correct choice: v02712-layers-q3-correct
- Choices:
  - v02712-layers-q3-correct: Layers are repeated numerical transformations, not conscious reasoning steps. (correct)
    - feedback: Good myth repair. Layer depth can support complex computation without implying human thought.
  - v02712-layers-q3-2-consciousness: Each layer is a separate conscious agent debating the answer.
    - feedback: That adds minds where there are computations. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Each layer is a separate conscious agent debating the answer.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q3-3-retrieval: Each layer performs a live web search.
    - feedback: Retrieval is outside the layer stack unless a system adds it. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Each layer performs a live web search.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q3-4-alignment: Each layer stores a moral rule chosen by the user.
    - feedback: Policy behavior is not the same as each layer being a moral rule. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Each layer stores a moral rule chosen by the user.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Plausible because alignment is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-layers-q4

- Category: model-trace
- Stem: Why do residual paths and normalization matter in a simplified layer map?
- Correct choice: v02712-layers-q4-correct
- Choices:
  - v02712-layers-q4-correct: They carry signal forward while attention and MLP transformations repeat. (correct)
    - feedback: Insight strengthened. The layer stack is a pattern of transformations, not one single operation.
  - v02712-layers-q4-2-sampling: They are the steps that sample the final token.
    - feedback: Sampling happens after the layer stack produces next-token scores. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: They are the steps that sample the final token.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q4-3-rag: They are retrieval indexes for outside documents.
    - feedback: Retrieval indexes are outside the transformer layer operations. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: They are retrieval indexes for outside documents.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-layers-q4-4-training: They permanently add user corrections into weights.
    - feedback: Training updates weights; ordinary layer flow does not. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: They permanently add user corrections into weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.

## Hidden States (4)

Stage: 3. Workday

Objective: Distinguish hidden states as temporary context-shaped internal vectors created during inference from embeddings, weights, visible text, and memory.

### Q1. v02712-hidden-states-q1

- Category: application
- Stem: The same token "bank" appears in two different sentences. Why can its later hidden state differ even if its starting embedding is similar?
- Correct choice: v02712-hidden-states-q1-correct
- Choices:
  - v02712-hidden-states-q1-correct: Context and layer operations shape a temporary vector for that token position. (correct)
    - feedback: Insight strengthened. Hidden states are internal vectors shaped by the current context.
  - v02712-hidden-states-q1-2-token-id: The token ID changes into a new permanent ID.
    - feedback: The token ID is a lookup key; hidden states carry contextual information. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The token ID changes into a new permanent ID.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q1-3-memory: The model saves both sentences as memories.
    - feedback: Temporary hidden states are not saved memories by themselves. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The model saves both sentences as memories.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q1-4-tokenization: The tokenizer splits the word only after attention.
    - feedback: Tokenization happens before embeddings and layers. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: The tokenizer splits the word only after attention.
    - represented term: tokenization
    - source: explicit-confusable
    - rationale: Plausible because tokenization is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-hidden-states-q2

- Category: mechanism
- Stem: A learner hears "hidden state" and imagines secret English thoughts. What does "hidden" actually mean here?
- Correct choice: v02712-hidden-states-q2-correct
- Choices:
  - v02712-hidden-states-q2-correct: The state is internal numerical data, not visible text shown to the user. (correct)
    - feedback: Good distinction. Hidden states are model-internal activations.
  - v02712-hidden-states-q2-2-thought: The model is hiding secret English thoughts.
    - feedback: Hidden states are numbers, not encrypted inner speech. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The model is hiding secret English thoughts.
    - represented term: thought
    - source: explicit-confusable
    - rationale: Plausible because thought is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q2-3-source: The state is a private source document.
    - feedback: A hidden state is not a stored document. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The state is a private source document.
    - represented term: source
    - source: explicit-confusable
    - rationale: Plausible because source is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q2-4-guardrail: The state is a policy filter outside the model.
    - feedback: Policy filters are product controls, not internal hidden states. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The state is a policy filter outside the model.
    - represented term: guardrail
    - source: explicit-confusable
    - rationale: Plausible because guardrail is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-hidden-states-q3

- Category: boundary
- Stem: During ordinary inference, how durable are hidden states?
- Correct choice: v02712-hidden-states-q3-correct
- Choices:
  - v02712-hidden-states-q3-correct: They are temporary activations for the current run. (correct)
    - feedback: Good boundary. Hidden states appear during the forward pass and are not durable weight changes.
  - v02712-hidden-states-q3-2-weight-update: They permanently update the base model after each answer.
    - feedback: That would be training, not ordinary inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: They permanently update the base model after each answer.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q3-3-memory: They are the saved user profile for future chats.
    - feedback: A product may store memory separately, but hidden states are temporary. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: They are the saved user profile for future chats.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q3-4-training-data: They are the original examples used in pretraining.
    - feedback: Training data is not the current hidden state. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: They are the original examples used in pretraining.
    - represented term: training data
    - source: explicit-confusable
    - rationale: Plausible because training data is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-hidden-states-q4

- Category: model-trace
- Stem: Where do hidden states sit in the prompt's Journey?
- Correct choice: v02712-hidden-states-q4-correct
- Choices:
  - v02712-hidden-states-q4-correct: After embeddings enter layers, hidden states carry context-shaped information toward next-token scores. (correct)
    - feedback: Insight strengthened. Hidden states bridge the Workday layer processing and the Decision Room scores.
  - v02712-hidden-states-q4-2-token-id: Before token IDs exist, hidden states choose vocabulary numbers.
    - feedback: Token IDs come before embedding lookup and hidden states. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Before token IDs exist, hidden states choose vocabulary numbers.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q4-3-citation: After the final answer, hidden states become citations.
    - feedback: Citations are generated text or retrieved/source metadata, not hidden states. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: After the final answer, hidden states become citations.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hidden-states-q4-4-context-window: Outside the context window, hidden states preserve everything forever.
    - feedback: They do not bypass context limits or become permanent memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Outside the context window, hidden states preserve everything forever.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Plausible because context window is nearby, but this choice preserves a misconception the card is designed to correct.

## Logits (3)

Stage: 4. Decision Room

Objective: Explain logits as temporary raw next-token scores produced before softmax, not probabilities, truth scores, or complete answers.

### Q1. v02712-logits-q1

- Category: mechanism
- Stem: Before softmax, the model assigns raw scores to candidate next tokens. What are those scores called?
- Correct choice: v02712-logits-q1-correct
- Choices:
  - v02712-logits-q1-correct: Logits: temporary raw next-token scores. (correct)
    - feedback: Insight strengthened. Logits are raw scores before probability conversion.
  - v02712-logits-q1-2-softmax: Probabilities that already add up to one.
    - feedback: That describes the output after softmax, not logits. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Probabilities that already add up to one.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q1-3-truth: Truth scores proving which token is factual.
    - feedback: Logits score token likelihood under context, not truth. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: Truth scores proving which token is factual.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q1-4-embedding: Embeddings looked up from token IDs.
    - feedback: Embeddings happen earlier; logits are near the next-token decision. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Embeddings looked up from token IDs.
    - represented term: embedding
    - source: explicit-confusable
    - rationale: Plausible because embedding is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-logits-q2

- Category: boundary
- Stem: A logit is high for a token that would make a false sentence. What should the learner conclude?
- Correct choice: v02712-logits-q2-correct
- Choices:
  - v02712-logits-q2-correct: A high logit is not a truth guarantee. (correct)
    - feedback: Good boundary. The model can strongly prefer a token that is unsupported or wrong.
  - v02712-logits-q2-2-truth: The token must be true because the raw score is high.
    - feedback: Likelihood under context is not fact verification. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The token must be true because the raw score is high.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q2-3-rag: The model must have retrieved evidence for the token.
    - feedback: Logits do not prove retrieval happened. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model must have retrieved evidence for the token.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q2-4-weight-update: The weight table updated to store the false claim.
    - feedback: A temporary score is not durable learning. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The weight table updated to store the false claim.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-logits-q3

- Category: model-trace
- Stem: How do logits connect to the next steps in generation?
- Correct choice: v02712-logits-q3-correct
- Choices:
  - v02712-logits-q3-correct: Softmax converts logits to probabilities, and sampling can choose one token. (correct)
    - feedback: Insight strengthened. Logits feed the probability-and-choice part of the loop.
  - v02712-logits-q3-2-tokenization: Tokenization converts logits into word pieces.
    - feedback: Tokenization happens at the input/output text boundary, not after logits. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Tokenization converts logits into word pieces.
    - represented term: tokenization
    - source: explicit-confusable
    - rationale: Plausible because tokenization is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q3-3-fine-tuning: Fine-tuning converts logits into new weights every turn.
    - feedback: Fine-tuning is training, not a normal generation step. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Fine-tuning converts logits into new weights every turn.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-logits-q3-4-grounding: Grounding converts logits into verified citations automatically.
    - feedback: Grounding requires evidence handling; logits alone do not verify claims. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Grounding converts logits into verified citations automatically.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.

## Softmax (3)

Stage: 4. Decision Room

Objective: Explain softmax as converting logits into a next-token probability distribution, not choosing the token or proving truth.

### Q1. v02712-softmax-q1

- Category: mechanism
- Stem: The model has raw logits for several possible next tokens. What does softmax do next?
- Correct choice: v02712-softmax-q1-correct
- Choices:
  - v02712-softmax-q1-correct: It converts the raw scores into a probability distribution. (correct)
    - feedback: Insight strengthened. Softmax turns raw scores into probabilities that can be sampled from.
  - v02712-softmax-q1-2-sampling: It chooses the token by itself and appends it.
    - feedback: Sampling or decoding chooses from the distribution after softmax. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It chooses the token by itself and appends it.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q1-3-truth: It checks whether the answer is true.
    - feedback: Probability conversion is not fact verification. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: It checks whether the answer is true.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q1-4-training: It updates the model weights using loss.
    - feedback: That belongs to training, not inference-time softmax. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It updates the model weights using loss.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-softmax-q2

- Category: boundary
- Stem: A token gets the highest softmax probability, but the claim is unsupported. What does that reveal?
- Correct choice: v02712-softmax-q2-correct
- Choices:
  - v02712-softmax-q2-correct: Probability is a model preference under context, not proof of truth. (correct)
    - feedback: Good boundary. Softmax probabilities do not replace grounding or review.
  - v02712-softmax-q2-2-truth: The highest probability token is always factual.
    - feedback: That confuses likelihood with truth. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The highest probability token is always factual.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q2-3-citation: The model must have cited a source internally.
    - feedback: Softmax does not create or check citations. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model must have cited a source internally.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q2-4-memory: The context window permanently stored the fact.
    - feedback: Softmax is temporary probability conversion, not storage. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The context window permanently stored the fact.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-softmax-q3

- Category: model-trace
- Stem: Where does softmax sit between logits and sampling?
- Correct choice: v02712-softmax-q3-correct
- Choices:
  - v02712-softmax-q3-correct: After logits and before the next-token choice. (correct)
    - feedback: Insight strengthened. The sequence is raw scores, probabilities, then a selected token.
  - v02712-softmax-q3-2-tokenization: Before tokenization, deciding how text becomes chunks.
    - feedback: Tokenization is earlier in the pipeline. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Before tokenization, deciding how text becomes chunks.
    - represented term: tokenization
    - source: explicit-confusable
    - rationale: Plausible because tokenization is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q3-3-response: After the whole response is complete, judging style.
    - feedback: Softmax is used during next-token generation. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: After the whole response is complete, judging style.
    - represented term: response
    - source: explicit-confusable
    - rationale: Plausible because response is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-softmax-q3-4-rag: During RAG, searching outside documents.
    - feedback: Retrieval is outside this probability step. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: During RAG, searching outside documents.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

## Sampling (4)

Stage: 4. Decision Room

Objective: Explain sampling as choosing one next token from probabilities during inference, after softmax and before append/repeat.

### Q1. v02712-sampling-q1

- Category: mechanism
- Stem: Softmax creates probabilities for possible next tokens. What does sampling do next?
- Correct choice: v02712-sampling-q1-correct
- Choices:
  - v02712-sampling-q1-correct: It selects one next token from that probability-shaped set. (correct)
    - feedback: Insight strengthened. Sampling is the choosing step after probabilities exist.
  - v02712-sampling-q1-2-softmax: It converts raw scores into probabilities.
    - feedback: That is softmax, the step before sampling. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It converts raw scores into probabilities.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q1-3-truth: It checks whether the selected token is true.
    - feedback: Sampling chooses; it does not verify. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: It checks whether the selected token is true.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q1-4-training: It retrains the model on the chosen token.
    - feedback: Choosing a token during inference is not a weight update. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It retrains the model on the chosen token.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-sampling-q2

- Category: model-trace
- Stem: After sampling selects one token, what does the autoregressive loop do with it?
- Correct choice: v02712-sampling-q2-correct
- Choices:
  - v02712-sampling-q2-correct: It appends the token to the response-so-far so the next run can see it. (correct)
    - feedback: Good trace. Generation grows one selected token at a time.
  - v02712-sampling-q2-2-context: It erases the prompt and starts from only the new token.
    - feedback: The next run sees the current context, including the response so far. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It erases the prompt and starts from only the new token.
    - represented term: context
    - source: explicit-confusable
    - rationale: Plausible because context is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q2-3-memory: It stores the token as permanent model memory.
    - feedback: Appending to context is temporary, not durable memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It stores the token as permanent model memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q2-4-validation: It converts the token into a validation example.
    - feedback: Validation examples are for testing during development, not generation. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It converts the token into a validation example.
    - represented term: validation
    - source: explicit-confusable
    - rationale: Plausible because validation is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-sampling-q3

- Category: causal-consequence
- Stem: Why can sampling make two runs with the same prompt produce different wording?
- Correct choice: v02712-sampling-q3-correct
- Choices:
  - v02712-sampling-q3-correct: Sampling can choose among probable tokens instead of always taking one fixed path. (correct)
    - feedback: Insight strengthened. Generation is probability-shaped, not a single scripted answer.
  - v02712-sampling-q3-2-training: The model necessarily trained itself between the two runs.
    - feedback: Different output does not imply a weight update. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The model necessarily trained itself between the two runs.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q3-3-token-id: The tokenizer randomly changes every word into new IDs.
    - feedback: Tokenization is usually deterministic for the same text and tokenizer. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The tokenizer randomly changes every word into new IDs.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q3-4-memory: The context window stores secret alternatives forever.
    - feedback: Variation does not require permanent hidden memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The context window stores secret alternatives forever.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-sampling-q4

- Category: misconception-check
- Stem: A learner says sampling writes the whole answer at once. What boundary fixes that misconception?
- Correct choice: v02712-sampling-q4-correct
- Choices:
  - v02712-sampling-q4-correct: Sampling chooses one next token; autoregression appends and repeats. (correct)
    - feedback: Good distinction. The whole response emerges from many next-token choices.
  - v02712-sampling-q4-2-layer: Sampling replaces the layer stack with a finished paragraph.
    - feedback: Layers still produce scores before each token choice. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Sampling replaces the layer stack with a finished paragraph.
    - represented term: layer
    - source: explicit-confusable
    - rationale: Plausible because layer is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q4-3-retrieval: Sampling retrieves a complete answer from the web.
    - feedback: Retrieval is separate from token choice. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Sampling retrieves a complete answer from the web.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-sampling-q4-4-weight-update: Sampling updates weights after every word.
    - feedback: Inference-time token choice is not training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Sampling updates weights after every word.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.

## Autoregression (3)

Stage: 5. The Day Repeats

Objective: Explain autoregression as next token, append to context, run again, while weights usually remain unchanged and context grows.

### Q1. v02712-autoregression-q1

- Category: model-trace
- Stem: In autoregression, a model writes "The dog" and then generates "ran." What does the next model run see?
- Correct choice: v02712-autoregression-q1-correct
- Choices:
  - v02712-autoregression-q1-correct: The prompt plus the response so far, including the newly appended token. (correct)
    - feedback: Insight strengthened. Autoregression grows the visible context one token at a time.
  - v02712-autoregression-q1-2-response-token: Only the original prompt, because generated tokens are ignored.
    - feedback: Generated tokens are appended into the next context. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Only the original prompt, because generated tokens are ignored.
    - represented term: response token
    - source: explicit-confusable
    - rationale: Plausible because response token is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q1-3-weight-update: A permanently changed set of model weights.
    - feedback: Appending to context is temporary, not training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: A permanently changed set of model weights.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q1-4-rag: A live search result for every new token.
    - feedback: Autoregression does not imply retrieval. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: A live search result for every new token.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-autoregression-q2

- Category: boundary
- Stem: Autoregression updates the response-so-far during inference. What usually does not change?
- Correct choice: v02712-autoregression-q2-correct
- Choices:
  - v02712-autoregression-q2-correct: The model weights. (correct)
    - feedback: Good boundary. The context grows, but ordinary generation does not durably retrain the model.
  - v02712-autoregression-q2-2-context: The temporary context visible to the next run.
    - feedback: That does change as tokens are appended. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: The temporary context visible to the next run.
    - represented term: context
    - source: explicit-confusable
    - rationale: Plausible because context is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q2-3-response: The visible response text.
    - feedback: The visible response grows as tokens are generated. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The visible response text.
    - represented term: response
    - source: explicit-confusable
    - rationale: Plausible because response is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q2-4-logits: The next-token candidate scores.
    - feedback: Logits change from step to step as context changes. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: The next-token candidate scores.
    - represented term: logits
    - source: explicit-confusable
    - rationale: Plausible because logits is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-autoregression-q3

- Category: causal-consequence
- Stem: A very long generated response can push older information out of view. Which earlier concept explains that limit?
- Correct choice: v02712-autoregression-q3-correct
- Choices:
  - v02712-autoregression-q3-correct: The context window. (correct)
    - feedback: Insight strengthened. Autoregression can make context grow until older tokens no longer fit.
  - v02712-autoregression-q3-2-optimizer: The optimizer, because it deletes old facts during training.
    - feedback: The optimizer is part of training, not context overflow. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The optimizer, because it deletes old facts during training.
    - represented term: optimizer
    - source: explicit-confusable
    - rationale: Plausible because optimizer is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q3-3-embedding-table: The embedding table, because it forgets old rows.
    - feedback: The table is not what fills up during a long context. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: The embedding table, because it forgets old rows.
    - represented term: embedding table
    - source: explicit-confusable
    - rationale: Plausible because embedding table is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-autoregression-q3-4-softmax: Softmax, because probabilities erase source text.
    - feedback: Softmax converts scores; it does not manage context length. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Softmax, because probabilities erase source text.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.

## Context Window (4)

Stage: 5. The Day Repeats

Objective: Explain the context window as temporary visible input space for the current run, not permanent memory, and show how autoregression and RAG compete for that space.

### Q1. v02712-context-window-q1

- Category: application
- Stem: A long chat exceeds the context window and early details fall out. What changed most directly?
- Correct choice: v02712-context-window-q1-correct
- Choices:
  - v02712-context-window-q1-correct: The temporary visible input available to the current run. (correct)
    - feedback: Insight strengthened. The context window is temporary working space, not permanent memory.
  - v02712-context-window-q1-2-weight-update: The base model weights were overwritten.
    - feedback: Losing context is not training or untraining. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The base model weights were overwritten.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q1-3-source: The original source document was deleted.
    - feedback: Context limits do not delete outside documents. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The original source document was deleted.
    - represented term: source
    - source: explicit-confusable
    - rationale: Plausible because source is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q1-4-consciousness: The model became conscious of what to forget.
    - feedback: Context limits are a system constraint, not awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model became conscious of what to forget.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-context-window-q2

- Category: boundary
- Stem: Why is context not the same as memory?
- Correct choice: v02712-context-window-q2-correct
- Choices:
  - v02712-context-window-q2-correct: Context is the current visible input; memory would require a separate saved mechanism. (correct)
    - feedback: Good boundary. Current tokens and durable storage are different ideas.
  - v02712-context-window-q2-2-training: Anything in context permanently changes the model.
    - feedback: Prompt/context tokens usually do not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Anything in context permanently changes the model.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q2-3-context-window: Anything outside context can still be used directly.
    - feedback: The model cannot directly attend to text outside the current context. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Anything outside context can still be used directly.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Plausible because context window is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q2-4-hidden-state: Memory and hidden state are the same saved English text.
    - feedback: Hidden states are temporary numerical activations. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Memory and hidden state are the same saved English text.
    - represented term: hidden state
    - source: explicit-confusable
    - rationale: Plausible because hidden state is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-context-window-q3

- Category: model-trace
- Stem: RAG retrieves three passages before the LLM answers. Where do those passages usually go?
- Correct choice: v02712-context-window-q3-correct
- Choices:
  - v02712-context-window-q3-correct: Into the current context window as retrieved context. (correct)
    - feedback: Insight strengthened. Retrieved text becomes input the model can attend to during inference.
  - v02712-context-window-q3-2-fine-tuning: Into permanent model weights immediately.
    - feedback: Retrieval is not fine-tuning. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Into permanent model weights immediately.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q3-3-web-search: Into a hidden web browser the model controls by itself.
    - feedback: RAG uses a retrieval system; the model is not magically browsing all files. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Into a hidden web browser the model controls by itself.
    - represented term: web search
    - source: explicit-confusable
    - rationale: Plausible because web search is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q3-4-softmax: Into softmax as verified truth labels.
    - feedback: Softmax is probability conversion, not evidence storage. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Into softmax as verified truth labels.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-context-window-q4

- Category: model-trace
- Stem: Why does the response-so-far matter for the context window?
- Correct choice: v02712-context-window-q4-correct
- Choices:
  - v02712-context-window-q4-correct: Generated tokens are appended, so later steps can attend to earlier generated text. (correct)
    - feedback: Good trace. Autoregression uses the growing response as part of the next input.
  - v02712-context-window-q4-2-response-token: Generated tokens disappear before the next run.
    - feedback: They are appended while they remain in context. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Generated tokens disappear before the next run.
    - represented term: response token
    - source: explicit-confusable
    - rationale: Plausible because response token is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q4-3-training: Generated tokens become training targets for the base model.
    - feedback: Ordinary generation is not durable training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Generated tokens become training targets for the base model.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-context-window-q4-4-grounding: Generated tokens prove the answer is grounded.
    - feedback: Generated text still needs evidence support. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Generated tokens prove the answer is grounded.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.

## RAG and Retrieval (4)

Stage: 5. The Day Repeats

Objective: Explain RAG as a retrieval system that places outside evidence into current context during inference, not training, omniscience, or permanent memory.

### Q1. v02712-rag-retrieval-q1

- Category: application
- Stem: A RAG system searches a course handbook, inserts two passages into the prompt, then the LLM answers. What changed most directly?
- Correct choice: v02712-rag-retrieval-q1-correct
- Choices:
  - v02712-rag-retrieval-q1-correct: Outside text was retrieved and placed into the current context. (correct)
    - feedback: Insight strengthened. RAG is retrieval plus context, not magical knowing.
  - v02712-rag-retrieval-q1-2-fine-tuning: The handbook permanently updated the model weights.
    - feedback: That would require training or adaptation, not ordinary RAG. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The handbook permanently updated the model weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q1-3-consciousness: The model became conscious of all campus files.
    - feedback: Retrieval is a system process, not awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model became conscious of all campus files.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q1-4-truth-guarantee: The answer became guaranteed true because retrieval happened.
    - feedback: Retrieved text can help, but it can be poor or misused. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The answer became guaranteed true because retrieval happened.
    - represented term: truth guarantee
    - source: explicit-confusable
    - rationale: Plausible because truth guarantee is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-rag-retrieval-q2

- Category: boundary
- Stem: Which source can a RAG system use?
- Correct choice: v02712-rag-retrieval-q2-correct
- Choices:
  - v02712-rag-retrieval-q2-correct: Sources connected to its retriever or index. (correct)
    - feedback: Good boundary. RAG has scope; it does not automatically reach every file or website.
  - v02712-rag-retrieval-q2-2-privacy: Every private file on the user's device by default.
    - feedback: That would require permissions and connection to a retriever. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Every private file on the user's device by default.
    - represented term: privacy
    - source: explicit-confusable
    - rationale: Plausible because privacy is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q2-3-pretraining: Only facts already stored in model weights.
    - feedback: RAG is specifically about outside information entering context. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only facts already stored in model weights.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Plausible because pretraining is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q2-4-hallucination: Any web page the model imagines exists.
    - feedback: Generated source-like text is not retrieval. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Any web page the model imagines exists.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Plausible because hallucination is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-rag-retrieval-q3

- Category: boundary
- Stem: Why is RAG not training?
- Correct choice: v02712-rag-retrieval-q3-correct
- Choices:
  - v02712-rag-retrieval-q3-correct: It supplies temporary context during inference rather than durably changing weights. (correct)
    - feedback: Insight strengthened. RAG can improve an answer without becoming permanent learning.
  - v02712-rag-retrieval-q3-2-training: It measures loss and runs an optimizer.
    - feedback: That describes training, not retrieval into context. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It measures loss and runs an optimizer.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q3-3-memory: It turns every retrieved passage into model memory.
    - feedback: Retrieved passages are temporary unless another system stores them. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It turns every retrieved passage into model memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q3-4-inference: It replaces attention, logits, softmax, and sampling.
    - feedback: The LLM still generates through its normal inference path. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: It replaces attention, logits, softmax, and sampling.
    - represented term: inference
    - source: explicit-confusable
    - rationale: Plausible because inference is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-rag-retrieval-q4

- Category: causal-consequence
- Stem: How can RAG reduce hallucinations without eliminating them?
- Correct choice: v02712-rag-retrieval-q4-correct
- Choices:
  - v02712-rag-retrieval-q4-correct: It gives the model better temporary evidence, but retrieval or generation can still fail. (correct)
    - feedback: Good nuance. RAG improves support; it does not guarantee truth.
  - v02712-rag-retrieval-q4-2-citation: It forces the model to quote sources with perfect accuracy.
    - feedback: Citations can still be missing, stale, or misused. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It forces the model to quote sources with perfect accuracy.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q4-3-hallucination: It makes the model unable to generate unsupported text.
    - feedback: Unsupported generation can still happen. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It makes the model unable to generate unsupported text.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Plausible because hallucination is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-rag-retrieval-q4-4-pretraining: It makes pretraining unnecessary for language generation.
    - feedback: The LLM still uses learned patterns and weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It makes pretraining unnecessary for language generation.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Plausible because pretraining is nearby, but this choice preserves a misconception the card is designed to correct.

## Grounding (4)

Stage: 5. The Day Repeats

Objective: Explain grounding as connecting generated claims to available evidence while recognizing that citations or retrieval do not guarantee truth.

### Q1. v02712-grounding-q1

- Category: application
- Stem: A retrieved passage says one thing, but the answer claims another. Why can grounding still fail?
- Correct choice: v02712-grounding-q1-correct
- Choices:
  - v02712-grounding-q1-correct: Available evidence does not guarantee the generated answer stays connected to it. (correct)
    - feedback: Insight strengthened. Grounding asks whether claims are actually supported by evidence.
  - v02712-grounding-q1-2-truth-guarantee: Any retrieved passage automatically makes the answer true.
    - feedback: Evidence must be relevant and used faithfully. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Any retrieved passage automatically makes the answer true.
    - represented term: truth guarantee
    - source: explicit-confusable
    - rationale: Plausible because truth guarantee is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q1-3-citation: A citation-looking sentence proves the source was checked.
    - feedback: A generated citation can look real without support. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: A citation-looking sentence proves the source was checked.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q1-4-softmax: Softmax converts evidence into truth labels.
    - feedback: Probability conversion is not evidence checking. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Softmax converts evidence into truth labels.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-grounding-q2

- Category: mechanism
- Stem: A campus answer cites retrieved documents and data. What is grounding trying to connect?
- Correct choice: v02712-grounding-q2-correct
- Choices:
  - v02712-grounding-q2-correct: Generated claims to available evidence, such as documents, data, or tool results. (correct)
    - feedback: Good distinction. Grounding is about support, not style.
  - v02712-grounding-q2-2-confidence: Model confidence to moral certainty.
    - feedback: Grounding is not a feeling or moral signal. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Model confidence to moral certainty.
    - represented term: confidence
    - source: explicit-confusable
    - rationale: Plausible because confidence is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q2-3-training: Prompt wording to permanent weight updates.
    - feedback: Grounding usually concerns evidence in the current system/run. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Prompt wording to permanent weight updates.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q2-4-token-id: Token IDs to dictionary meanings only.
    - feedback: That is not the evidence relationship grounding cares about. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Token IDs to dictionary meanings only.
    - represented term: token ID
    - source: explicit-confusable
    - rationale: Plausible because token ID is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-grounding-q3

- Category: misconception-check
- Stem: A response includes a polished citation that the source list does not contain. What should a learner suspect?
- Correct choice: v02712-grounding-q3-correct
- Choices:
  - v02712-grounding-q3-correct: The citation may be generated text rather than grounded evidence. (correct)
    - feedback: Insight strengthened. Citation format is not the same as source support.
  - v02712-grounding-q3-2-citation: The answer is automatically grounded because it has a citation shape.
    - feedback: Citation-looking output still needs verification. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The answer is automatically grounded because it has a citation shape.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q3-3-intent: The model must be lying on purpose.
    - feedback: Unsupported output is not proof of intent. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model must be lying on purpose.
    - represented term: intent
    - source: explicit-confusable
    - rationale: Plausible because intent is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q3-4-embedding: The source is inside the embedding vector.
    - feedback: Embeddings do not contain human-readable source records by themselves. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The source is inside the embedding vector.
    - represented term: embedding
    - source: explicit-confusable
    - rationale: Plausible because embedding is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-grounding-q4

- Category: boundary
- Stem: How does grounding connect to RAG in a well-designed system?
- Correct choice: v02712-grounding-q4-correct
- Choices:
  - v02712-grounding-q4-correct: RAG can supply evidence; grounding checks whether the answer uses it faithfully. (correct)
    - feedback: Good connection. Retrieval and faithful use are related but not identical.
  - v02712-grounding-q4-2-fine-tuning: RAG and grounding are the same as fine-tuning.
    - feedback: They usually happen during inference, not durable training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: RAG and grounding are the same as fine-tuning.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q4-3-hallucination: Grounding guarantees no hallucinations after retrieval.
    - feedback: Grounding can fail when evidence is poor or misused. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Grounding guarantees no hallucinations after retrieval.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Plausible because hallucination is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-grounding-q4-4-human-review: Grounding replaces human review in high-stakes cases.
    - feedback: Evidence support still needs human judgment when stakes are high. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Grounding replaces human review in high-stakes cases.
    - represented term: human review
    - source: explicit-confusable
    - rationale: Plausible because human review is nearby, but this choice preserves a misconception the card is designed to correct.

## Hallucinations (4)

Stage: 5. The Day Repeats

Objective: Explain hallucination as fluent generated output that lacks adequate support, not intentional lying, consciousness, or proof of malice.

### Q1. v02712-hallucinations-q1

- Category: application
- Stem: The model invents a realistic article title and citation. What makes this a hallucination?
- Correct choice: v02712-hallucinations-q1-correct
- Choices:
  - v02712-hallucinations-q1-correct: The fluent output lacks adequate support from available evidence. (correct)
    - feedback: Insight strengthened. Hallucination is unsupported generation, not just awkward wording.
  - v02712-hallucinations-q1-2-intent: The model intentionally lied because it wanted to deceive.
    - feedback: Unsupported output is not evidence of intention or malice. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model intentionally lied because it wanted to deceive.
    - represented term: intent
    - source: explicit-confusable
    - rationale: Plausible because intent is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q1-3-citation: The answer is true because the citation looks formal.
    - feedback: Citation style is not evidence support. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The answer is true because the citation looks formal.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q1-4-retrieval: The model must have searched a hidden database.
    - feedback: Source-like text does not prove retrieval happened. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model must have searched a hidden database.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-hallucinations-q2

- Category: causal-consequence
- Stem: Why can hallucinations happen in a next-token system?
- Correct choice: v02712-hallucinations-q2-correct
- Choices:
  - v02712-hallucinations-q2-correct: Fluent token choices can outrun evidence or grounding. (correct)
    - feedback: Good mechanism. The model can keep generating likely text even when support is thin.
  - v02712-hallucinations-q2-2-softmax: Softmax is designed to verify facts before every token.
    - feedback: Softmax converts scores to probabilities; it does not verify facts. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Softmax is designed to verify facts before every token.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q2-3-context-window: The context window permanently stores all needed sources.
    - feedback: Context is limited and temporary. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: The context window permanently stores all needed sources.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Plausible because context window is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q2-4-alignment: Alignment gives the model a conscience that prevents mistakes.
    - feedback: Alignment shaping is not a truth guarantee. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Alignment gives the model a conscience that prevents mistakes.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Plausible because alignment is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-hallucinations-q3

- Category: boundary
- Stem: A hallucination is often confused with lying. Which boundary matters?
- Correct choice: v02712-hallucinations-q3-correct
- Choices:
  - v02712-hallucinations-q3-correct: Lying implies intent; hallucination describes unsupported output. (correct)
    - feedback: Good myth repair. A model can produce unsupported text without human-like intent.
  - v02712-hallucinations-q3-2-moral-agency: Every hallucination proves malicious agency.
    - feedback: That adds intent the mechanism does not establish. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Every hallucination proves malicious agency.
    - represented term: moral agency
    - source: explicit-confusable
    - rationale: Plausible because moral agency is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q3-3-rag: Every unsupported answer is a successful RAG lookup.
    - feedback: Retrieval and support must be checked. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Every unsupported answer is a successful RAG lookup.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q3-4-probability: Every low-probability token is a hallucination.
    - feedback: Hallucination is about support, not only token probability. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: Every low-probability token is a hallucination.
    - represented term: probability
    - source: explicit-confusable
    - rationale: Plausible because probability is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-hallucinations-q4

- Category: human-use-judgment
- Stem: Which practice can reduce hallucination risk without pretending it disappears?
- Correct choice: v02712-hallucinations-q4-correct
- Choices:
  - v02712-hallucinations-q4-correct: Use relevant evidence, retrieval, constraints, and human review for important claims. (correct)
    - feedback: Insight strengthened. Risk can be reduced through system design and review, not wished away.
  - v02712-hallucinations-q4-2-confidence: Trust the answer whenever the tone is confident.
    - feedback: Confidence in wording is not support. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: Trust the answer whenever the tone is confident.
    - represented term: confidence
    - source: explicit-confusable
    - rationale: Plausible because confidence is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q4-3-context: Remove all context so the model relies only on weights.
    - feedback: Relevant context can help; removing it is not a safeguard. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Remove all context so the model relies only on weights.
    - represented term: context
    - source: explicit-confusable
    - rationale: Plausible because context is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-hallucinations-q4-4-scale: Assume larger models cannot hallucinate.
    - feedback: Scale does not eliminate unsupported generation. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Assume larger models cannot hallucinate.
    - represented term: scale
    - source: explicit-confusable
    - rationale: Plausible because scale is nearby, but this choice preserves a misconception the card is designed to correct.

## How AI Learns (5)

Stage: 6. Twilight: The Wider Landscape

Objective: Compare ways AI systems appear to learn and separate durable weight or adapter changes from temporary context use, retrieval, and in-context behavior.

### Q1. v02712-how-ai-learns-q1

- Category: application
- Stem: A team fine-tunes a support model on many reviewed examples. What usually changes?
- Correct choice: v02712-how-ai-learns-q1-correct
- Choices:
  - v02712-how-ai-learns-q1-correct: Weights or adapter behavior that can affect future inference runs. (correct)
    - feedback: Insight strengthened. Fine-tuning is durable learning compared with temporary prompting.
  - v02712-how-ai-learns-q1-2-prompt: Only the current prompt context changes for one run.
    - feedback: That describes prompting, not fine-tuning. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Only the current prompt context changes for one run.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q1-3-rag: Only a retrieved passage is inserted for one answer.
    - feedback: Retrieval adds context; it does not by itself train. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only a retrieved passage is inserted for one answer.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q1-4-sampling: Only sampling picks a different next token.
    - feedback: Sampling is a generation-time choice, not durable adaptation. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only sampling picks a different next token.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-how-ai-learns-q2

- Category: boundary
- Stem: A user pastes a policy into the prompt and the answer follows it. What kind of learning-like behavior is this?
- Correct choice: v02712-how-ai-learns-q2-correct
- Choices:
  - v02712-how-ai-learns-q2-correct: Temporary context use, not durable weight change. (correct)
    - feedback: Good boundary. The model can adapt within the current context without permanently learning the policy.
  - v02712-how-ai-learns-q2-2-pretraining: Pretraining on the policy.
    - feedback: Pretraining happens earlier across broad data. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Pretraining on the policy.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Plausible because pretraining is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q2-3-fine-tuning: Fine-tuning the model weights.
    - feedback: A pasted prompt alone usually does not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Fine-tuning the model weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q2-4-model-checkpoint: A saved model checkpoint after training.
    - feedback: No checkpoint is saved by ordinary prompt use. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: A saved model checkpoint after training.
    - represented term: model checkpoint
    - source: explicit-confusable
    - rationale: Plausible because model checkpoint is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-how-ai-learns-q3

- Category: model-trace
- Stem: A RAG system retrieves a PDF passage and the model uses it. What did the system add?
- Correct choice: v02712-how-ai-learns-q3-correct
- Choices:
  - v02712-how-ai-learns-q3-correct: Outside information in the current context. (correct)
    - feedback: Insight strengthened. Retrieval can make the answer better without becoming training.
  - v02712-how-ai-learns-q3-2-memory: Permanent memory inside every future version of the model.
    - feedback: Retrieved information is temporary unless a separate system saves it. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Permanent memory inside every future version of the model.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q3-3-loss: Loss values for optimizer updates.
    - feedback: That is training machinery, not ordinary RAG. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Loss values for optimizer updates.
    - represented term: loss
    - source: explicit-confusable
    - rationale: Plausible because loss is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q3-4-alignment: Human moral judgment inside the model.
    - feedback: Retrieved text is evidence, not conscience. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Human moral judgment inside the model.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Plausible because alignment is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-how-ai-learns-q4

- Category: boundary
- Stem: In the learning-bucket sort, which action can durably change future model behavior?
- Correct choice: v02712-how-ai-learns-q4-correct
- Choices:
  - v02712-how-ai-learns-q4-correct: Adapter training on task examples. (correct)
    - feedback: Good classification. Adapter training can create a reusable learned behavior.
  - v02712-how-ai-learns-q4-2-system-prompt: A one-time system instruction in the prompt.
    - feedback: That steers the current run or product behavior, not necessarily weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: A one-time system instruction in the prompt.
    - represented term: system prompt
    - source: explicit-confusable
    - rationale: Plausible because system prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q4-3-retrieval: A citation retrieved into the context window.
    - feedback: That is temporary input for inference. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: A citation retrieved into the context window.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q4-4-response-token: A sampled response token appended to the answer.
    - feedback: That grows context; it does not train the model. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: A sampled response token appended to the answer.
    - represented term: response token
    - source: explicit-confusable
    - rationale: Plausible because response token is nearby, but this choice preserves a misconception the card is designed to correct.

### Q5. v02712-how-ai-learns-q5

- Category: misconception-check
- Stem: Why is the word "learned" tricky in How AI Learns conversations?
- Correct choice: v02712-how-ai-learns-q5-correct
- Choices:
  - v02712-how-ai-learns-q5-correct: People may use it for temporary context behavior even when weights did not change. (correct)
    - feedback: Insight strengthened. Model literacy separates durable learning from temporary use.
  - v02712-how-ai-learns-q5-2-learning: Useful responses always prove permanent learning.
    - feedback: Usefulness can come from context, retrieval, or existing weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Useful responses always prove permanent learning.
    - represented term: learning
    - source: explicit-confusable
    - rationale: Plausible because learning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q5-3-training: Only humans can update behavior from examples.
    - feedback: Models can be trained, but the mechanism differs from human learning. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Only humans can update behavior from examples.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-how-ai-learns-q5-4-validation: Every answer creates a new validation set.
    - feedback: Validation examples are for testing, not every response. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Every answer creates a new validation set.
    - represented term: validation
    - source: explicit-confusable
    - rationale: Plausible because validation is nearby, but this choice preserves a misconception the card is designed to correct.

## Diffusion vs Autoregression (3)

Stage: 6. Twilight: The Wider Landscape

Objective: Distinguish autoregressive text generation from diffusion-style denoising and show that generative AI methods do not all work like ChatGPT.

### Q1. v02712-diffusion-q1

- Category: boundary
- Stem: In Diffusion vs Autoregression, one system appends text tokens and another denoises an image. Which boundary is most accurate?
- Correct choice: v02712-diffusion-q1-correct
- Choices:
  - v02712-diffusion-q1-correct: Autoregressive LLMs and diffusion models are different generative methods. (correct)
    - feedback: Insight strengthened. Generative AI is a family, not one mechanism.
  - v02712-diffusion-q1-2-llm: Diffusion models are just larger LLMs using the same token loop.
    - feedback: Diffusion is a different generation process. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Diffusion models are just larger LLMs using the same token loop.
    - represented term: LLM
    - source: explicit-confusable
    - rationale: Plausible because LLM is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q1-3-diffusion-model: LLMs generate images by denoising pixels in the same way.
    - feedback: Text LLM generation is usually autoregressive. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: LLMs generate images by denoising pixels in the same way.
    - represented term: diffusion model
    - source: explicit-confusable
    - rationale: Plausible because diffusion model is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q1-4-consciousness: Both methods prove the system understands like a human.
    - feedback: Generation method does not imply human awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Both methods prove the system understands like a human.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-diffusion-q2

- Category: mechanism
- Stem: What is the key diffusion idea in this simplified map?
- Correct choice: v02712-diffusion-q2-correct
- Choices:
  - v02712-diffusion-q2-correct: Start with noise and iteratively denoise toward an output. (correct)
    - feedback: Good mechanism. Diffusion is a denoising process, not next-token append/repeat.
  - v02712-diffusion-q2-2-autoregression: Choose one next text token, append, and rerun.
    - feedback: That is the text LLM loop. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Choose one next text token, append, and rerun.
    - represented term: autoregression
    - source: explicit-confusable
    - rationale: Plausible because autoregression is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q2-3-rag: Retrieve outside documents into context.
    - feedback: Retrieval is separate from diffusion generation. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Retrieve outside documents into context.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q2-4-training: Update weights after each image is shown to a user.
    - feedback: Generation usually does not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Update weights after each image is shown to a user.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-diffusion-q3

- Category: misconception-check
- Stem: Why does this distinction help demystify generative AI?
- Correct choice: v02712-diffusion-q3-correct
- Choices:
  - v02712-diffusion-q3-correct: ChatGPT-style text generation is not how all generative systems work. (correct)
    - feedback: Insight strengthened. Different media and methods need different mental models.
  - v02712-diffusion-q3-2-ai: It proves all AI systems are LLMs.
    - feedback: LLMs are one branch, not all AI. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It proves all AI systems are LLMs.
    - represented term: AI
    - source: explicit-confusable
    - rationale: Plausible because AI is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q3-3-truth: It means diffusion outputs are automatically true.
    - feedback: Generated media can still mislead or need review. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: It means diffusion outputs are automatically true.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-diffusion-q3-4-multimodal-ai: It means multimodal systems have human senses.
    - feedback: Processing media types is not human perception. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It means multimodal systems have human senses.
    - represented term: multimodal AI
    - source: explicit-confusable
    - rationale: Plausible because multimodal AI is nearby, but this choice preserves a misconception the card is designed to correct.

## Multimodal AI (3)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain multimodal AI as systems that represent or process more than one media type together without implying human-like perception.

### Q1. v02712-multimodal-q1

- Category: application
- Stem: A model accepts an image and a text question, then answers in text. What makes the system multimodal?
- Correct choice: v02712-multimodal-q1-correct
- Choices:
  - v02712-multimodal-q1-correct: It represents or processes more than one media type together. (correct)
    - feedback: Insight strengthened. Multimodal means multiple modalities in one system or workflow.
  - v02712-multimodal-q1-2-perception: It has human-like vision and feelings.
    - feedback: Processing images is not the same as human perception. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It has human-like vision and feelings.
    - represented term: perception
    - source: explicit-confusable
    - rationale: Plausible because perception is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q1-3-training: It turns every file into permanent training data.
    - feedback: Inputs during use usually enter context, not weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It turns every file into permanent training data.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q1-4-llm: It is only a text LLM with no media representation.
    - feedback: A multimodal system adds media processing beyond plain text. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It is only a text LLM with no media representation.
    - represented term: LLM
    - source: explicit-confusable
    - rationale: Plausible because LLM is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-multimodal-q2

- Category: boundary
- Stem: Which boundary keeps multimodal AI from sounding magical?
- Correct choice: v02712-multimodal-q2-correct
- Choices:
  - v02712-multimodal-q2-correct: Media inputs become numerical representations, not human senses. (correct)
    - feedback: Good boundary. The system can process media without seeing or feeling like a person.
  - v02712-multimodal-q2-2-consciousness: The model literally experiences the image.
    - feedback: That adds human experience the mechanism does not show. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The model literally experiences the image.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q2-3-retrieval: The model searches every image on the web by itself.
    - feedback: Web/image search requires a connected tool or index. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model searches every image on the web by itself.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Plausible because retrieval is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q2-4-grounding: The model becomes perfectly grounded by seeing media.
    - feedback: Media input can still be misread or misused. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The model becomes perfectly grounded by seeing media.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-multimodal-q3

- Category: model-trace
- Stem: How can multimodal and diffusion systems relate?
- Correct choice: v02712-multimodal-q3-correct
- Choices:
  - v02712-multimodal-q3-correct: A larger AI product can combine different media models and generation methods. (correct)
    - feedback: Insight strengthened. Products can mix components without making every component work the same way.
  - v02712-multimodal-q3-2-diffusion: Diffusion and LLMs must be the same model internally.
    - feedback: They can be combined in products while remaining different methods. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Diffusion and LLMs must be the same model internally.
    - represented term: diffusion
    - source: explicit-confusable
    - rationale: Plausible because diffusion is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q3-3-memory: Multimodal always means the model has permanent memory.
    - feedback: Multiple media types do not imply stored memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Multimodal always means the model has permanent memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-multimodal-q3-4-truth: Any image input automatically verifies the answer.
    - feedback: Evidence and interpretation still need checking. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Any image input automatically verifies the answer.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

## The Perfect Storm (4)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain modern LLM capability as convergence among data, compute, storage, methods, labor, and incentives, not one magic breakthrough.

### Q1. v02712-perfect-storm-q1

- Category: causal-consequence
- Stem: In the Perfect Storm story, which explanation best captures why modern LLM capability arrived when it did?
- Correct choice: v02712-perfect-storm-q1-correct
- Choices:
  - v02712-perfect-storm-q1-correct: Data, compute, storage, methods, labor, and incentives converged. (correct)
    - feedback: Insight strengthened. Modern capability came from convergence, not one spark.
  - v02712-perfect-storm-q1-2-prompting: One prompt trick suddenly made models intelligent.
    - feedback: Prompting matters, but it did not create the whole infrastructure. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: One prompt trick suddenly made models intelligent.
    - represented term: prompting
    - source: explicit-confusable
    - rationale: Plausible because prompting is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q1-3-compute: Compute alone was enough without data or labor.
    - feedback: Compute is one ingredient, not the whole storm. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Compute alone was enough without data or labor.
    - represented term: compute
    - source: explicit-confusable
    - rationale: Plausible because compute is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q1-4-consciousness: The model woke up once it crossed a magic size.
    - feedback: Capability growth is not evidence of awakening. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model woke up once it crossed a magic size.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-perfect-storm-q2

- Category: human-use-judgment
- Stem: Why do labor and incentives belong beside data and compute in the Perfect Storm?
- Correct choice: v02712-perfect-storm-q2-correct
- Choices:
  - v02712-perfect-storm-q2-correct: Human work and market pressure helped turn methods into deployable products. (correct)
    - feedback: Good breadth. The story is technical and social, not only hardware.
  - v02712-perfect-storm-q2-2-labor: Labor only matters after AI becomes conscious.
    - feedback: Human work shaped data, evaluation, labeling, deployment, and review. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Labor only matters after AI becomes conscious.
    - represented term: labor
    - source: explicit-confusable
    - rationale: Plausible because labor is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q2-3-incentives: Incentives are irrelevant to product design.
    - feedback: Markets and institutions affect what gets built and scaled. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Incentives are irrelevant to product design.
    - represented term: incentives
    - source: explicit-confusable
    - rationale: Plausible because incentives is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q2-4-storage: Storage alone explains model behavior.
    - feedback: Storage supports the system but does not explain capability by itself. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Storage alone explains model behavior.
    - represented term: storage
    - source: explicit-confusable
    - rationale: Plausible because storage is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-perfect-storm-q3

- Category: misconception-check
- Stem: A learner says LLMs came from one magic invention. What does the storm-front metaphor correct?
- Correct choice: v02712-perfect-storm-q3-correct
- Choices:
  - v02712-perfect-storm-q3-correct: LLMs appeared because of convergence, not one magic breakthrough. (correct)
    - feedback: Insight strengthened. The model is less mysterious when the ingredients are visible.
  - v02712-perfect-storm-q3-2-consciousness: LLMs appeared because one model became conscious.
    - feedback: Consciousness is not the mechanism described here. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: LLMs appeared because one model became conscious.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q3-3-rag: LLMs appeared because retrieval replaced training.
    - feedback: Retrieval is useful, but large models still depend on training and infrastructure. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: LLMs appeared because retrieval replaced training.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q3-4-prompting: LLMs appeared because prompts trained themselves.
    - feedback: Prompting did not create the learned base capability. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: LLMs appeared because prompts trained themselves.
    - represented term: prompting
    - source: explicit-confusable
    - rationale: Plausible because prompting is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-perfect-storm-q4

- Category: model-trace
- Stem: How does the Perfect Storm widen the Journey after model mechanics?
- Correct choice: v02712-perfect-storm-q4-correct
- Choices:
  - v02712-perfect-storm-q4-correct: It asks whose data, labor, infrastructure, and choices made the mechanics useful. (correct)
    - feedback: Good connection. Mechanism literacy opens into social and institutional questions.
  - v02712-perfect-storm-q4-2-mechanism: It says mechanics no longer matter once costs appear.
    - feedback: The wider landscape builds on the mechanics, not away from them. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says mechanics no longer matter once costs appear.
    - represented term: mechanism
    - source: explicit-confusable
    - rationale: Plausible because mechanism is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q4-3-grounding: It proves model outputs are grounded by infrastructure.
    - feedback: Infrastructure enables systems; it does not verify every output. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It proves model outputs are grounded by infrastructure.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-perfect-storm-q4-4-risk: It means risk is only a sci-fi myth.
    - feedback: Real-world costs and risks are part of the wider landscape. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It means risk is only a sci-fi myth.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.

## Collective Intelligence, Extracted (3)

Stage: 7. Midnight Ledger

Objective: Explain that much model usefulness comes from patterns in human-created data and labor, raising questions of provenance, consent, and compensation.

### Q1. v02712-collective-intelligence-q1

- Category: human-use-judgment
- Stem: In Collective Intelligence, Extracted, a model gives useful patterns learned from many people's writing. What should learners ask?
- Correct choice: v02712-collective-intelligence-q1-correct
- Choices:
  - v02712-collective-intelligence-q1-correct: What human-created data and labor helped shape it. (correct)
    - feedback: Insight strengthened. Model capability often reflects extracted collective work.
  - v02712-collective-intelligence-q1-2-consciousness: Whether the model created its abilities alone.
    - feedback: The system depends on data, labor, and training infrastructure. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Whether the model created its abilities alone.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q1-3-prompt: Whether the answer came only from the current prompt.
    - feedback: The prompt matters, but learned patterns came from earlier data. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Whether the answer came only from the current prompt.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q1-4-memory: Whether every source was perfectly copied into memory.
    - feedback: Training is not a perfect source archive. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Whether every source was perfectly copied into memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-collective-intelligence-q2

- Category: boundary
- Stem: Why is "extracted" an important word here?
- Correct choice: v02712-collective-intelligence-q2-correct
- Choices:
  - v02712-collective-intelligence-q2-correct: It points to provenance, consent, compensation, and power around data and labor. (correct)
    - feedback: Good distinction. This card adds social questions without turning the model into a mind.
  - v02712-collective-intelligence-q2-2-intent: It means the model intentionally stole ideas like a person.
    - feedback: The issue is real even without human-like intent. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: It means the model intentionally stole ideas like a person.
    - represented term: intent
    - source: explicit-confusable
    - rationale: Plausible because intent is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q2-3-memorization: It means every output is a direct quote from one source.
    - feedback: Outputs often reflect patterns, not direct retrieval. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: It means every output is a direct quote from one source.
    - represented term: memorization
    - source: explicit-confusable
    - rationale: Plausible because memorization is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q2-4-context: It means current context is irrelevant.
    - feedback: Current context still shapes the answer during inference. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: It means current context is irrelevant.
    - represented term: context
    - source: explicit-confusable
    - rationale: Plausible because context is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-collective-intelligence-q3

- Category: model-trace
- Stem: How does collective intelligence connect back to pretraining?
- Correct choice: v02712-collective-intelligence-q3-correct
- Choices:
  - v02712-collective-intelligence-q3-correct: Pretraining can shape weights from patterns in human-created data. (correct)
    - feedback: Insight strengthened. The social source and the model mechanism meet in training.
  - v02712-collective-intelligence-q3-2-pretraining: Pretraining is live web search during each answer.
    - feedback: Pretraining happened before use; search is a separate system action. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Pretraining is live web search during each answer.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Plausible because pretraining is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q3-3-truth: Patterns from human-created data can be treated as verified facts.
    - feedback: Training data can contain errors and biases. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Human-created data becomes guaranteed truth.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-collective-intelligence-q3-4-moral-agency: The model becomes morally accountable like a person.
    - feedback: Humans and institutions remain accountable for deployment choices. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: The model becomes morally accountable like a person.
    - represented term: moral agency
    - source: explicit-confusable
    - rationale: Plausible because moral agency is nearby, but this choice preserves a misconception the card is designed to correct.

## Costs We Must Count (4)

Stage: 7. Midnight Ledger

Objective: Identify costs across training, inference, infrastructure, data, labor, privacy, and institutional deployment rather than treating digital systems as cost-free.

### Q1. v02712-costs-we-must-count-q1

- Category: human-use-judgment
- Stem: A campus wants AI tutoring at scale. Which cost mix should leaders count before deployment?
- Correct choice: v02712-costs-we-must-count-q1-correct
- Choices:
  - v02712-costs-we-must-count-q1-correct: Training, inference, infrastructure, privacy, labor, access, and governance costs. (correct)
    - feedback: Insight strengthened. Costs are technical, human, and institutional.
  - v02712-costs-we-must-count-q1-2-inference-cost: Only the price of each prompt typed by users.
    - feedback: Per-use cost matters, but it is not the whole deployment cost. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Only the price of each prompt typed by users.
    - represented term: inference cost
    - source: explicit-confusable
    - rationale: Plausible because inference cost is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q1-3-training-cost: Only the one-time pretraining bill paid by a vendor.
    - feedback: Repeated inference and institutional operations also cost money and labor. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Only the one-time pretraining bill paid by a vendor.
    - represented term: training cost
    - source: explicit-confusable
    - rationale: Plausible because training cost is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q1-4-digital-cost: No costs, because digital systems are weightless.
    - feedback: Digital systems still use energy, infrastructure, data, and people. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: No costs, because digital systems are weightless.
    - represented term: digital cost
    - source: explicit-confusable
    - rationale: Plausible because digital cost is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-costs-we-must-count-q2

- Category: causal-consequence
- Stem: Why can repeated inference workloads matter even after training is done?
- Correct choice: v02712-costs-we-must-count-q2-correct
- Choices:
  - v02712-costs-we-must-count-q2-correct: Each use can consume compute, energy, money, monitoring, and support. (correct)
    - feedback: Good distinction. Training is not the only place costs occur.
  - v02712-costs-we-must-count-q2-2-inference: Inference is free because weights are already trained.
    - feedback: Running the model still takes resources. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Inference is free because weights are already trained.
    - represented term: inference
    - source: explicit-confusable
    - rationale: Plausible because inference is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q2-3-weight-update: Inference always updates weights, so it costs only training.
    - feedback: Ordinary inference usually does not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Inference always updates weights, so it costs only training.
    - represented term: weight update
    - source: explicit-confusable
    - rationale: Plausible because weight update is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q2-4-prompt-token: Only visible response tokens have costs; prompts do not.
    - feedback: Input and output processing both use resources. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Only visible response tokens have costs; prompts do not.
    - represented term: prompt token
    - source: explicit-confusable
    - rationale: Plausible because prompt token is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-costs-we-must-count-q3

- Category: misconception-check
- Stem: A product is called digital, so someone assumes it is weightless. What costs does that hide?
- Correct choice: v02712-costs-we-must-count-q3-correct
- Choices:
  - v02712-costs-we-must-count-q3-correct: It hides infrastructure, energy, labor, and policy costs. (correct)
    - feedback: Insight strengthened. Digital services still have material and human footprints.
  - v02712-costs-we-must-count-q3-2-benefit: It makes every AI benefit false.
    - feedback: Benefits can be real while costs still need counting. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It makes every AI benefit false.
    - represented term: benefit
    - source: explicit-confusable
    - rationale: Plausible because benefit is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q3-3-energy: It proves all costs are only environmental.
    - feedback: Environmental costs matter, but labor, privacy, and governance matter too. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It proves all costs are only environmental.
    - represented term: energy
    - source: explicit-confusable
    - rationale: Plausible because energy is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q3-4-governance: It proves small pilots need no review.
    - feedback: Scale and context affect the review needed. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: It proves small pilots need no review.
    - represented term: governance
    - source: explicit-confusable
    - rationale: Plausible because governance is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-costs-we-must-count-q4

- Category: human-use-judgment
- Stem: How should Costs We Must Count shape benefit claims?
- Correct choice: v02712-costs-we-must-count-q4-correct
- Choices:
  - v02712-costs-we-must-count-q4-correct: Pair useful AI possibilities with what must be protected, governed, or funded. (correct)
    - feedback: Good judgment. Cost literacy makes benefit claims more responsible, not more fearful.
  - v02712-costs-we-must-count-q4-2-risk: Reject every AI use because any cost is unacceptable.
    - feedback: Responsible evaluation compares benefits, costs, and alternatives. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Reject every AI use because any cost is unacceptable.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q4-3-hype: Ignore costs whenever the demo looks impressive.
    - feedback: Impressive demos still need deployment accounting. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Ignore costs whenever the demo looks impressive.
    - represented term: hype
    - source: explicit-confusable
    - rationale: Plausible because hype is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-costs-we-must-count-q4-4-training: Treat cost counting as a model-weight update.
    - feedback: Cost counting is a human governance practice. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Treat cost counting as a model-weight update.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.

## Risk vs Myth (4)

Stage: 7. Midnight Ledger

Objective: Separate practical institutional risks from myths, focusing on privacy, bias, unsupported claims, overreliance, governance, and non-conscious models.

### Q1. v02712-risk-myth-q1

- Category: application
- Stem: A staff member pastes student records into a third-party AI tool. Which risk is real?
- Correct choice: v02712-risk-myth-q1-correct
- Choices:
  - v02712-risk-myth-q1-correct: Private data may be exposed, retained, or used outside the intended context. (correct)
    - feedback: Insight strengthened. Privacy and data governance are real institutional risks.
  - v02712-risk-myth-q1-2-softmax: Softmax will steal files from the laptop by itself.
    - feedback: Softmax converts scores to probabilities; it is not file access. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Softmax will steal files from the laptop by itself.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q1-3-consciousness: The model became conscious of the student records.
    - feedback: Risk does not require consciousness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model became conscious of the student records.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q1-4-truth: The answer must be true because the data was private.
    - feedback: Private input does not guarantee accurate output. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The answer must be true because the data was private.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-risk-myth-q2

- Category: human-use-judgment
- Stem: A tool has permission to search a campus drive. What should risk literacy ask first?
- Correct choice: v02712-risk-myth-q2-correct
- Choices:
  - v02712-risk-myth-q2-correct: What data the tool can access, retain, log, and send into context. (correct)
    - feedback: Good practice. Tool permissions and data flows are concrete risks.
  - v02712-risk-myth-q2-2-moral-agency: Whether the LLM has secret moral agency.
    - feedback: Risk assessment should start with system behavior and governance. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Whether the LLM has secret moral agency.
    - represented term: moral agency
    - source: explicit-confusable
    - rationale: Plausible because moral agency is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q2-3-memory: Whether every search result becomes permanent model memory.
    - feedback: Retention depends on system design and policy, not magic memory. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Whether every search result becomes permanent model memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q2-4-myth: Whether all risk is sci-fi doom.
    - feedback: Practical risks can be immediate and ordinary. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Whether all risk is sci-fi doom.
    - represented term: myth
    - source: explicit-confusable
    - rationale: Plausible because myth is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-risk-myth-q3

- Category: boundary
- Stem: What boundary separates hallucination risk from lying?
- Correct choice: v02712-risk-myth-q3-correct
- Choices:
  - v02712-risk-myth-q3-correct: Hallucination is unsupported output; lying implies intent. (correct)
    - feedback: Good myth repair. Real risks do not require treating the model as a person.
  - v02712-risk-myth-q3-2-intent: Every unsupported answer proves the model wanted to deceive.
    - feedback: That imports human motives into the mechanism. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Every unsupported answer proves the model wanted to deceive.
    - represented term: intent
    - source: explicit-confusable
    - rationale: Plausible because intent is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q3-3-harm: Every false answer is only harmless word choice.
    - feedback: Unsupported output can still cause real harm. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Every false answer is only harmless word choice.
    - represented term: harm
    - source: explicit-confusable
    - rationale: Plausible because harm is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q3-4-grounding: Every citation-looking answer is grounded.
    - feedback: Citation format needs evidence checking. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Every citation-looking answer is grounded.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-risk-myth-q4

- Category: human-use-judgment
- Stem: Which response is best when a risk is real but a myth is also circulating?
- Correct choice: v02712-risk-myth-q4-correct
- Choices:
  - v02712-risk-myth-q4-correct: Name the concrete risk, reject the myth, and choose safeguards that match the system. (correct)
    - feedback: Insight strengthened. Model literacy reduces both panic and complacency.
  - v02712-risk-myth-q4-2-myth: Amplify the myth because it makes people cautious.
    - feedback: Fearmongering can hide the real controls people need. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Amplify the myth because it makes people cautious.
    - represented term: myth
    - source: explicit-confusable
    - rationale: Plausible because myth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q4-3-consciousness: Dismiss the risk because the model is not conscious.
    - feedback: Non-conscious systems can still create real harms. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Dismiss the risk because the model is not conscious.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-risk-myth-q4-4-scale: Assume a larger model removes all governance needs.
    - feedback: Better models still need policy, evaluation, and review. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Assume a larger model removes all governance needs.
    - represented term: scale
    - source: explicit-confusable
    - rationale: Plausible because scale is nearby, but this choice preserves a misconception the card is designed to correct.

## Benefits Worth Taking Seriously (3)

Stage: 8. New Dawn

Objective: Name realistic AI benefits such as drafting, access, translation, summarization, and search while keeping limits, costs, and human review visible.

### Q1. v02712-benefits-worth-taking-seriously-q1

- Category: human-use-judgment
- Stem: Which Benefits Worth Taking Seriously claim is useful and bounded rather than hype?
- Correct choice: v02712-benefits-worth-taking-seriously-q1-correct
- Choices:
  - v02712-benefits-worth-taking-seriously-q1-correct: AI can assist drafting, translation, search, and access when humans review important outputs. (correct)
    - feedback: Insight strengthened. Benefits can be real without becoming utopian claims.
  - v02712-benefits-worth-taking-seriously-q1-2-automation: AI should replace human judgment wherever it is faster.
    - feedback: Speed does not remove accountability or context. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: AI should replace human judgment wherever it is faster.
    - represented term: automation
    - source: explicit-confusable
    - rationale: Plausible because automation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q1-3-accessibility: AI guarantees access and accuracy for every learner.
    - feedback: Access can improve, but quality and bias still need review. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: AI guarantees access and accuracy for every learner.
    - represented term: accessibility
    - source: explicit-confusable
    - rationale: Plausible because accessibility is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q1-4-consciousness: AI benefits only count if the model is conscious.
    - feedback: Usefulness does not require a mind. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: AI benefits only count if the model is conscious.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-benefits-worth-taking-seriously-q2

- Category: model-trace
- Stem: During use, where do many AI benefits come from?
- Correct choice: v02712-benefits-worth-taking-seriously-q2-correct
- Choices:
  - v02712-benefits-worth-taking-seriously-q2-correct: Trained weights, temporary context, tools, retrieval, and human review working together. (correct)
    - feedback: Good mechanism. Benefits are often system-level, not just the base model alone.
  - v02712-benefits-worth-taking-seriously-q2-2-prompt: Only the prompt, with no learned model behavior.
    - feedback: Prompts matter, but learned weights and tools also matter. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only the prompt, with no learned model behavior.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q2-3-fine-tuning: Only durable fine-tuning after every user message.
    - feedback: Most use does not retrain after each prompt. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only durable fine-tuning after every user message.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q2-4-hallucination: Only hallucinated confidence.
    - feedback: Useful assistance should be checked and grounded when needed. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: Only hallucinated confidence.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Plausible because hallucination is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-benefits-worth-taking-seriously-q3

- Category: misconception-check
- Stem: A team names real AI benefits while still checking limits and costs. Which misconception does that avoid?
- Correct choice: v02712-benefits-worth-taking-seriously-q3-correct
- Choices:
  - v02712-benefits-worth-taking-seriously-q3-correct: Taking benefits seriously does not require believing in imminent utopia. (correct)
    - feedback: Good distinction. The goal is balanced literacy, not hype.
  - v02712-benefits-worth-taking-seriously-q3-2-costs: Any mention of benefit means ignoring cost.
    - feedback: Benefits and costs should be considered together. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Any mention of benefit means ignoring cost.
    - represented term: costs
    - source: explicit-confusable
    - rationale: Plausible because costs is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q3-3-risk: Only fearful claims can be responsible.
    - feedback: Responsible judgment can include useful applications. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Only fearful claims can be responsible.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-benefits-worth-taking-seriously-q3-4-truth: A benefit proves the answer is always true.
    - feedback: Usefulness still needs evaluation and review. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: A benefit proves the answer is always true.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

## Human-Centered AI (4)

Stage: 8. New Dawn

Objective: Explain human-centered AI as keeping human judgment, accountability, oversight, appeal, and context at the center of AI-assisted decisions.

### Q1. v02712-human-centered-ai-q1

- Category: human-use-judgment
- Stem: In Human-Centered AI, what should remain central in a high-stakes advising workflow even if AI drafts options?
- Correct choice: v02712-human-centered-ai-q1-correct
- Choices:
  - v02712-human-centered-ai-q1-correct: Human judgment, accountability, context, and an appeal path. (correct)
    - feedback: Insight strengthened. Human-centered AI keeps people responsible for consequential decisions.
  - v02712-human-centered-ai-q1-2-automation: The model should decide because it sounds confident.
    - feedback: Confidence is not accountability. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: The model should decide because it sounds confident.
    - represented term: automation
    - source: explicit-confusable
    - rationale: Plausible because automation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q1-3-guardrail: A guardrail should replace all human review.
    - feedback: Guardrails can help, but they do not carry human responsibility. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: A guardrail should replace all human review.
    - represented term: guardrail
    - source: explicit-confusable
    - rationale: Plausible because guardrail is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q1-4-prompt: The prompt should give the model moral understanding.
    - feedback: Prompting does not create conscience. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The prompt should give the model moral understanding.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-human-centered-ai-q2

- Category: boundary
- Stem: A team writes a careful system prompt for advising support. Why does that alone not make the system human-centered?
- Correct choice: v02712-human-centered-ai-q2-correct
- Choices:
  - v02712-human-centered-ai-q2-correct: Prompts steer current behavior; accountability, governance, and appeal need system design. (correct)
    - feedback: Good boundary. Human-centered design is a system and institution choice.
  - v02712-human-centered-ai-q2-2-prompt: Prompts always durably update the model weights.
    - feedback: Prompting usually changes temporary context. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Prompts always durably update the model weights.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q2-3-grounding: Prompts automatically verify every source.
    - feedback: Verification needs evidence and process. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Prompts automatically verify every source.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q2-4-human-centered-ai: Prompts remove the need to understand users.
    - feedback: That reverses the point of human-centered design. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Prompts remove the need to understand users.
    - represented term: human-centered AI
    - source: explicit-confusable
    - rationale: Plausible because human-centered AI is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-human-centered-ai-q3

- Category: misconception-check
- Stem: What misconception does human-centered AI correct?
- Correct choice: v02712-human-centered-ai-q3-correct
- Choices:
  - v02712-human-centered-ai-q3-correct: Powerful AI should not automatically get decision authority. (correct)
    - feedback: Insight strengthened. Capability does not settle accountability.
  - v02712-human-centered-ai-q3-2-automation: If AI is powerful, it should decide alone.
    - feedback: High stakes call for oversight, not blind delegation. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: If AI is powerful, it should decide alone.
    - represented term: automation
    - source: explicit-confusable
    - rationale: Plausible because automation is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q3-3-consciousness: If AI is not conscious, there are no human responsibilities.
    - feedback: People remain responsible for system design and use. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: If AI is not conscious, there are no human responsibilities.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q3-4-rag: If AI uses RAG, every decision is grounded enough.
    - feedback: Retrieval can help, but decisions still need judgment. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: If AI uses RAG, every decision is grounded enough.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-human-centered-ai-q4

- Category: model-trace
- Stem: How does human-centered AI connect to the prior costs and risks cards?
- Correct choice: v02712-human-centered-ai-q4-correct
- Choices:
  - v02712-human-centered-ai-q4-correct: It names the values and oversight that should guide tradeoffs. (correct)
    - feedback: Good connection. Counting costs should lead to better choices, not paralysis.
  - v02712-human-centered-ai-q4-2-risk: It says risk literacy is unnecessary once benefits are visible.
    - feedback: Human-centered work uses risk literacy. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says risk literacy is unnecessary once benefits are visible.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q4-3-scale: It says all tradeoffs are solved by larger models.
    - feedback: Model size does not replace governance. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says all tradeoffs are solved by larger models.
    - represented term: scale
    - source: explicit-confusable
    - rationale: Plausible because scale is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-human-centered-ai-q4-4-benefit: It says humans should never use AI tools.
    - feedback: Human-centered use can include AI assistance with accountability. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says humans should never use AI tools.
    - represented term: benefit
    - source: explicit-confusable
    - rationale: Plausible because benefit is nearby, but this choice preserves a misconception the card is designed to correct.

## Better AI Is a Choice (4)

Stage: 8. New Dawn

Objective: Show that better AI outcomes depend on design, governance, incentives, evaluation, data choices, and human review, not inevitability.

### Q1. v02712-better-ai-choice-q1

- Category: human-use-judgment
- Stem: A team wants fewer unsupported answers in a student-support bot. Which design choice helps without pretending risk disappears?
- Correct choice: v02712-better-ai-choice-q1-correct
- Choices:
  - v02712-better-ai-choice-q1-correct: Use retrieval, evaluation, and human review when the task needs evidence. (correct)
    - feedback: Insight strengthened. Better AI comes from design choices and review, not one magic fix.
  - v02712-better-ai-choice-q1-2-prompt: Use only a longer prompt and skip evaluation.
    - feedback: A prompt can help, but evaluation and review still matter. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Use only a longer prompt and skip evaluation.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q1-3-scale: Use a larger model and remove accountability.
    - feedback: Scale does not replace governance. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Use a larger model and remove accountability.
    - represented term: scale
    - source: explicit-confusable
    - rationale: Plausible because scale is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q1-4-rag: Turn off retrieval so the model relies only on fluency.
    - feedback: Evidence-sensitive tasks often need grounded context. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Turn off retrieval so the model relies only on fluency.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-better-ai-choice-q2

- Category: boundary
- Stem: Which choices can durably shape future AI behavior?
- Correct choice: v02712-better-ai-choice-q2-correct
- Choices:
  - v02712-better-ai-choice-q2-correct: Training data, fine-tuning, policies, evaluation standards, and incentives. (correct)
    - feedback: Good breadth. Some choices affect models; others affect workflows and institutions.
  - v02712-better-ai-choice-q2-2-sampling: Only the final sampled token in one response.
    - feedback: That is a temporary generation outcome. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Only the final sampled token in one response.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Plausible because sampling is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q2-3-prompt: Only one user prompt in one chat.
    - feedback: A prompt can steer one run but may not durably shape the system. Prompt and context can steer a current run without automatically becoming durable learning.
    - misconception: Only one user prompt in one chat.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Plausible because prompt is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q2-4-interface: Only the color of the interface.
    - feedback: Interface matters for use, but this answer asks about durable behavior shaping. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Only the color of the interface.
    - represented term: interface
    - source: explicit-confusable
    - rationale: Plausible because interface is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-better-ai-choice-q3

- Category: misconception-check
- Stem: What misconception does "better AI is a choice" avoid?
- Correct choice: v02712-better-ai-choice-q3-correct
- Choices:
  - v02712-better-ai-choice-q3-correct: Harms are not inevitable just because the technology is useful. (correct)
    - feedback: Insight strengthened. Institutions can make better or worse design and governance choices.
  - v02712-better-ai-choice-q3-2-risk: Every harm is unavoidable, so review is pointless.
    - feedback: Review and design can reduce harms. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Every harm is unavoidable, so review is pointless.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q3-3-benefit: Every benefit proves the system is already responsible.
    - feedback: Useful systems still need governance. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: Every benefit proves the system is already responsible.
    - represented term: benefit
    - source: explicit-confusable
    - rationale: Plausible because benefit is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q3-4-softmax: Every choice happens inside softmax.
    - feedback: Many choices are human, institutional, and design-level. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: Every choice happens inside softmax.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Plausible because softmax is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-better-ai-choice-q4

- Category: model-trace
- Stem: How do human-centered values become practical choices?
- Correct choice: v02712-better-ai-choice-q4-correct
- Choices:
  - v02712-better-ai-choice-q4-correct: Through design, policy, governance, evaluation, data choices, and incentives. (correct)
    - feedback: Good connection. Values need implementation details.
  - v02712-better-ai-choice-q4-2-moral-agency: By assuming the model will choose ethics on its own.
    - feedback: Models do not carry human accountability. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: By assuming the model will choose ethics on its own.
    - represented term: moral agency
    - source: explicit-confusable
    - rationale: Plausible because moral agency is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q4-3-interface: By hiding limitations so users feel confident.
    - feedback: Human-centered design should make limits legible. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: By hiding limitations so users feel confident.
    - represented term: interface
    - source: explicit-confusable
    - rationale: Plausible because interface is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-better-ai-choice-q4-4-fine-tuning: By treating all feedback as automatic fine-tuning.
    - feedback: Feedback needs process before it becomes training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: By treating all feedback as automatic fine-tuning.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.

## Effective Prompting from Model Literacy (4)

Stage: 8. New Dawn

Objective: Use model literacy to prompt clearly: shape current context, provide evidence and constraints, and remember prompting is not magic, training, or truth guarantee.

### Q1. v02712-effective-prompting-literacy-q1

- Category: application
- Stem: A prompt includes the task, audience, evidence, constraints, and output format. What does that improve?
- Correct choice: v02712-effective-prompting-literacy-q1-correct
- Choices:
  - v02712-effective-prompting-literacy-q1-correct: The current context the model uses for this run. (correct)
    - feedback: Insight strengthened. Prompting is context design.
  - v02712-effective-prompting-literacy-q1-2-fine-tuning: The model weights for all future users.
    - feedback: Prompting usually does not update weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The model weights for all future users.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q1-3-truth: The truth of missing evidence.
    - feedback: A prompt cannot create evidence that is not available. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The truth of missing evidence.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q1-4-rag: The retriever's access to every private file.
    - feedback: Access depends on connected tools and permissions. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The retriever's access to every private file.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-effective-prompting-literacy-q2

- Category: misconception-check
- Stem: Why is prompting not magic wording?
- Correct choice: v02712-effective-prompting-literacy-q2-correct
- Choices:
  - v02712-effective-prompting-literacy-q2-correct: It shapes context, constraints, and examples for a probabilistic model. (correct)
    - feedback: Good boundary. Better prompts help the model use context; they do not cast spells.
  - v02712-effective-prompting-literacy-q2-2-training: The exact phrase permanently teaches the model.
    - feedback: Durable teaching requires training or adaptation. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The exact phrase permanently teaches the model.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q2-3-truth: A clever phrase guarantees a true answer.
    - feedback: Truth still depends on evidence and review. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: A clever phrase guarantees a true answer.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q2-4-consciousness: A clever phrase gives the model consciousness.
    - feedback: Prompt responsiveness is not awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: A clever phrase gives the model consciousness.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-effective-prompting-literacy-q3

- Category: human-use-judgment
- Stem: A user asks for a citation but provides no source and no retrieval tool is connected. What should model literacy suggest?
- Correct choice: v02712-effective-prompting-literacy-q3-correct
- Choices:
  - v02712-effective-prompting-literacy-q3-correct: Ask for sources or connect retrieval; do not treat citation-shaped output as enough. (correct)
    - feedback: Insight strengthened. Prompting can request evidence, but systems need actual evidence to ground claims.
  - v02712-effective-prompting-literacy-q3-2-web-search: The model will always search the web by itself.
    - feedback: Search requires a connected tool or retrieval system. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: The model will always search the web by itself.
    - represented term: web search
    - source: explicit-confusable
    - rationale: Plausible because web search is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q3-3-fine-tuning: The model can fine-tune itself into knowing the source.
    - feedback: Ordinary prompting is not self-training. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The model can fine-tune itself into knowing the source.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Plausible because fine-tuning is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q3-4-citation: A confident citation format proves grounding.
    - feedback: Citation shape must be checked against real sources. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: A confident citation format proves grounding.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Plausible because citation is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-effective-prompting-literacy-q4

- Category: model-trace
- Stem: How does effective prompting fit with human responsibility?
- Correct choice: v02712-effective-prompting-literacy-q4-correct
- Choices:
  - v02712-effective-prompting-literacy-q4-correct: It improves the current run while keeping review, evidence, and accountability visible. (correct)
    - feedback: Good synthesis. Individual practice helps, but it does not replace governance or judgment.
  - v02712-effective-prompting-literacy-q4-2-accountability: It moves all responsibility from humans to the model.
    - feedback: Humans remain responsible for use and decisions. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It moves all responsibility from humans to the model.
    - represented term: accountability
    - source: explicit-confusable
    - rationale: Plausible because accountability is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q4-3-risk: It removes the need for risk and cost review.
    - feedback: Better prompts do not erase deployment questions. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It removes the need for risk and cost review.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-effective-prompting-literacy-q4-4-response-token: It makes generated tokens permanent training data.
    - feedback: Generated tokens are appended in context, not automatically trained into weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It makes generated tokens permanent training data.
    - represented term: response token
    - source: explicit-confusable
    - rationale: Plausible because response token is nearby, but this choice preserves a misconception the card is designed to correct.

## Model Literate Synthesis (5)

Stage: 8. New Dawn

Objective: Synthesize the full prompt-to-response path and use it to make better human judgments about evidence, limits, risks, benefits, and accountability.

### Q1. v02712-model-literate-synthesis-q1

- Category: model-trace
- Stem: A learner traces one answer from prompt to output. Which trace keeps the mechanism clear?
- Correct choice: v02712-model-literate-synthesis-q1-correct
- Choices:
  - v02712-model-literate-synthesis-q1-correct: Prompt tokens become IDs and embeddings; layers shape states; scores become probabilities; sampling appends tokens. (correct)
    - feedback: Insight strengthened. The synthesis follows the model path without turning it into magic.
  - v02712-model-literate-synthesis-q1-2-consciousness: The model reads the prompt consciously and writes the whole answer at once.
    - feedback: That skips the next-token mechanism and adds awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: The model reads the prompt consciously and writes the whole answer at once.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q1-3-training: The prompt immediately updates weights, then the answer is retrieved from memory.
    - feedback: Prompting usually changes context, not durable weights. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: The prompt immediately updates weights, then the answer is retrieved from memory.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q1-4-grounding: RAG, softmax, and grounding are all the same truth-checking step.
    - feedback: Those are different parts of a system and generation process. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: RAG, softmax, and grounding are all the same truth-checking step.
    - represented term: grounding
    - source: explicit-confusable
    - rationale: Plausible because grounding is nearby, but this choice preserves a misconception the card is designed to correct.

### Q2. v02712-model-literate-synthesis-q2

- Category: boundary
- Stem: A model-literate explanation separates durable, temporary, retrieved, and generated pieces. Which separation is strongest?
- Correct choice: v02712-model-literate-synthesis-q2-correct
- Choices:
  - v02712-model-literate-synthesis-q2-correct: Weights are durable; context/states are temporary; retrieval adds context; responses are generated. (correct)
    - feedback: Good boundary. Keeping these buckets separate prevents many myths.
  - v02712-model-literate-synthesis-q2-2-memory: Everything useful becomes permanent memory after one answer.
    - feedback: Usefulness during a run does not imply durable storage. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: Everything useful becomes permanent memory after one answer.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Plausible because memory is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q2-3-rag: Retrieved evidence is the same as fine-tuning.
    - feedback: Retrieval supplies context; fine-tuning changes learned behavior. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Retrieved evidence is the same as fine-tuning.
    - represented term: RAG
    - source: explicit-confusable
    - rationale: Plausible because RAG is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q2-4-truth: Generated response tokens prove the answer is true.
    - feedback: Generated text still needs evidence and review. Search, retrieval, and evidence use are separate system steps, and they still need checking.
    - misconception: Generated response tokens prove the answer is true.
    - represented term: truth
    - source: explicit-confusable
    - rationale: Plausible because truth is nearby, but this choice preserves a misconception the card is designed to correct.

### Q3. v02712-model-literate-synthesis-q3

- Category: human-use-judgment
- Stem: In Model Literate Synthesis, what should learners do when fluency outruns support?
- Correct choice: v02712-model-literate-synthesis-q3-correct
- Choices:
  - v02712-model-literate-synthesis-q3-correct: Look for grounding, sources, uncertainty, and human review instead of treating fluency as wisdom. (correct)
    - feedback: Insight strengthened. Model literacy turns demystification into better judgment.
  - v02712-model-literate-synthesis-q3-2-understanding: Assume fluent output equals understanding.
    - feedback: Fluency is not wisdom or awareness. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Assume fluent output equals understanding.
    - represented term: understanding
    - source: explicit-confusable
    - rationale: Plausible because understanding is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q3-3-intent: Assume hallucinations are always intentional lies.
    - feedback: Unsupported output does not prove intent. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: Assume hallucinations are always intentional lies.
    - represented term: intent
    - source: explicit-confusable
    - rationale: Plausible because intent is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q3-4-probability: Assume probability is the same as truth.
    - feedback: High-probability tokens can still be unsupported. Probability, permission, fluency, or confidence is not the same as truth.
    - misconception: Assume probability is the same as truth.
    - represented term: probability
    - source: explicit-confusable
    - rationale: Plausible because probability is nearby, but this choice preserves a misconception the card is designed to correct.

### Q4. v02712-model-literate-synthesis-q4

- Category: model-trace
- Stem: Why does following one prompt across the whole day help final synthesis?
- Correct choice: v02712-model-literate-synthesis-q4-correct
- Choices:
  - v02712-model-literate-synthesis-q4-correct: It connects training history, inference mechanics, evidence, risks, costs, and human use. (correct)
    - feedback: Good connection. The Journey ties mechanism to responsible decisions.
  - v02712-model-literate-synthesis-q4-2-training: It says training and inference are the same step.
    - feedback: The Journey separates durable learning from temporary inference. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: It says training and inference are the same step.
    - represented term: training
    - source: explicit-confusable
    - rationale: Plausible because training is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q4-3-risk: It says risks are all myths once mechanics are visible.
    - feedback: Mechanics clarify real risks as well as myths. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says risks are all myths once mechanics are visible.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q4-4-human-review: It says human judgment matters only before tokenization.
    - feedback: Judgment matters throughout use and deployment. The tempting idea is nearby, but it does not match the boundary this checkpoint is testing.
    - misconception: It says human judgment matters only before tokenization.
    - represented term: human review
    - source: explicit-confusable
    - rationale: Plausible because human review is nearby, but this choice preserves a misconception the card is designed to correct.

### Q5. v02712-model-literate-synthesis-q5

- Category: human-use-judgment
- Stem: What is the badge-level mental model Prompt Life wants to leave behind?
- Correct choice: v02712-model-literate-synthesis-q5-correct
- Choices:
  - v02712-model-literate-synthesis-q5-correct: LLMs are powerful pattern systems whose outputs need evidence, context awareness, and responsibility. (correct)
    - feedback: Insight strengthened. The badge marks durable model literacy, not trivia.
  - v02712-model-literate-synthesis-q5-2-consciousness: LLMs are minds whose intentions explain every answer.
    - feedback: Mind language can mislead when it hides the mechanism. The behavior can be shaped without giving the model human awareness, intent, or moral agency.
    - misconception: LLMs are minds whose intentions explain every answer.
    - represented term: consciousness
    - source: explicit-confusable
    - rationale: Plausible because consciousness is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q5-3-database: LLMs are databases that always return stored facts.
    - feedback: They generate tokens from weights and context, sometimes with retrieval. That would be a durable learning or storage claim; this checkpoint is separating it from temporary context or runtime behavior.
    - misconception: LLMs are databases that always return stored facts.
    - represented term: database
    - source: explicit-confusable
    - rationale: Plausible because database is nearby, but this choice preserves a misconception the card is designed to correct.
  - v02712-model-literate-synthesis-q5-4-risk: LLMs are harmless toys because myths are exaggerated.
    - feedback: Reducing myths should sharpen attention to real risks. That swaps this mechanism with a nearby model step; keep the stage boundary clear.
    - misconception: LLMs are harmless toys because myths are exaggerated.
    - represented term: risk
    - source: explicit-confusable
    - rationale: Plausible because risk is nearby, but this choice preserves a misconception the card is designed to correct.

