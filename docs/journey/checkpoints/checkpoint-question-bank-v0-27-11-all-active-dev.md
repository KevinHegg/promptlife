# Prompt Life Checkpoint Bank 0.27.11-full-journey-active-dev

- Active bank: v0.27.11-all-active-dev
- Active by default: true
- Cards: 39
- Questions: 136
- Choices: 544
- Wrong-answer distractors: 408
- Legacy fallback: ?legacyCheckpoints=1 or ?checkpointBank=legacy

## Quality Rules
- All 39 active Journey learning cards have a multi-question checkpoint set.
- Every question has four choices and exactly one correct answer.
- Every question and choice has a stable ID.
- Wrong-answer feedback maps by choiceId and does not reveal the correct answer by marking it.
- Most questions test model mechanism, application, causal consequence, boundary judgment, or misconception repair.
- Vague stems such as “Which statement is most accurate?” and “According to this learning card…” are avoided.
- Legacy fallback remains query-parameter controlled and is not displayed in normal learner UI.

## What Is an LLM? (2)

Stage: 1. Before Morning

Objective: Reason that an LLM generates response tokens by using learned weights and current context, without implying awareness or perfect search.

### Q1. v0279-what-is-llm-q1

- Type: mechanism in action
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

- Type: misconception diagnosis
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

Objective: Use the AI family map to reason about what kind of generative system an LLM is and what it is not.

### Q1. v0279-where-llms-fit-q1

- Type: applied scenario
- Category: application
- Stem: A campus tool summarizes text with an LLM, while another creates images by denoising a noisy pattern. What does that show?
- Correct choice: v0279-where-llms-fit-q1-correct
- Choices:
  - v0279-where-llms-fit-q1-correct: Generative AI is a family; LLMs and diffusion models are different branches. (correct)
    - feedback: Good distinction. Generative AI is a family, and different branches can use different mechanisms.
  - v0279-where-llms-fit-q1-all-llms: All generative AI tools are LLMs because ChatGPT is generative AI.
    - feedback: Not quite. An LLM is one kind of generative AI, not the whole category.
    - misconception: LLM vs generative AI family
    - represented term: generative-ai
    - source: same-card
    - rationale: Tempting because ChatGPT is many learners’ first generative AI example.
  - v0279-where-llms-fit-q1-text-only-ai: The image tool is not AI unless it generates language tokens.
    - feedback: Close, but image models can be AI without using the LLM text-token loop.
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

### Q2. v0279-where-llms-fit-q2

- Type: boundary distinction
- Category: boundary
- Stem: When people say an LLM sits inside the broader AI family, which category map is most useful?
- Correct choice: v0279-where-llms-fit-q2-correct
- Choices:
  - v0279-where-llms-fit-q2-correct: AI is broad; machine learning learns from data; deep learning uses layers; generative AI creates outputs; LLMs focus on language/code. (correct)
    - feedback: Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.
  - v0279-where-llms-fit-q2-all-ai-llm: AI means LLM; machine learning, deep learning, and generative AI are just extra names.
    - feedback: Not quite. LLMs are an important branch, not the root of the AI tree.
    - misconception: all AI is an LLM
    - represented term: ai
    - source: same-card
    - rationale: Tempting because LLMs currently dominate public attention.
  - v0279-where-llms-fit-q2-rules-learned-same: Rule-based AI, machine learning, and LLMs all work by following the same written rules.
    - feedback: Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.
    - misconception: symbolic AI vs learned model boundary
    - represented term: symbolic-ai
    - source: same-card
    - rationale: Tempting because all software runs instructions somewhere.
  - v0279-where-llms-fit-q2-diffusion-same-loop: Diffusion models, LLMs, and search engines all use the same language-token loop.
    - feedback: This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation usually appends response tokens.
    - misconception: diffusion vs autoregressive language generation
    - represented term: diffusion
    - source: same-card
    - rationale: Tempting because all can appear inside AI products.

### Q3. v0279-where-llms-fit-q3

- Type: model vs product distinction
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

Objective: Reason through the difference between explicit rules and learned weights, while recognizing that real AI products may combine both.

### Q1. v0279-history-q1

- Type: boundary distinction
- Category: boundary
- Stem: If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?
- Correct choice: v0279-history-q1-correct
- Choices:
  - v0279-history-q1-correct: The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples. (correct)
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

- Type: mechanism in action
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
    - feedback: Not quite. Loss is used during training; it is not the model writing a response.
    - misconception: training signal vs response generation
    - represented term: response
    - source: nearby-stage
    - rationale: Tempting because learners may treat every internal step as answer writing.

### Q3. v0279-history-q3

- Type: human-use judgment
- Category: human-use-judgment
- Stem: A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?
- Correct choice: v0279-history-q3-correct
- Choices:
  - v0279-history-q3-correct: Modern AI products can combine learned models, rules, tools, and policies; the LLM inside is still a learned-pattern model. (correct)
    - feedback: Good distinction. The product can be hybrid even when the LLM itself is learned from data.
  - v0279-history-q3-no-learning-if-rules: Any rule in the app means the LLM is no longer trained from data.
    - feedback: Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.
    - misconception: hybrid system vs pure symbolic replacement
    - represented term: rule-based-ai
    - source: same-card
    - rationale: Tempting because rule-based pieces can be visible in product behavior.
  - v0279-history-q3-conscious-product: Any fluent answer means the app is consciously reasoning.
    - feedback: That gives the model too much mind. The app can combine tools and still lack conscious understanding.
    - misconception: fluent behavior vs awareness
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because the whole app may feel conversational.
  - v0279-history-q3-permanent-finetune: Retrieval or filters permanently fine-tune the model on every use.
    - feedback: Close, but retrieval and filters can shape the current response without durably changing model weights.
    - misconception: retrieval/filtering vs durable training
    - represented term: fine-tuning
    - source: nearby-stage
    - rationale: Tempting because the app appears to adapt to local material.

## Training (4)

Stage: 1. Before Morning

Objective: Trace training as the durable weight-changing loop and separate it from ordinary inference, sampling, retrieval, and context changes.

### Q1. v0279-training-q1

- Type: mechanism in action
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

- Type: boundary distinction
- Category: boundary
- Stem: A student asks a chatbot one question during ordinary use. Which statement is usually true?
- Correct choice: v0279-training-q2-correct
- Choices:
  - v0279-training-q2-correct: The model uses fixed weights and temporary context; the chat usually does not rewrite the weights. (correct)
    - feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
  - v0279-training-q2-permanent-update: The chat permanently updates the base model’s weights.
    - feedback: Not quite. That would require a training process, not ordinary inference.
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

- Type: causal consequence
- Category: causal-consequence
- Stem: Why can training change how the model behaves tomorrow, while inference usually cannot?
- Correct choice: v0279-training-q3-correct
- Choices:
  - v0279-training-q3-correct: Training changes parameters that future runs reuse; inference uses temporary computations for the current run. (correct)
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

- Type: model trace
- Category: model-trace
- Stem: In a training loop, which sequence is the durable learning path?
- Correct choice: v0279-training-q4-correct
- Choices:
  - v0279-training-q4-correct: Example -> prediction -> loss -> weight update. (correct)
    - feedback: Insight strengthened. That is the weight-changing path.
  - v0279-training-q4-generation-loop: Prompt -> response token -> append -> next response token.
    - feedback: Close, but that sequence describes inference/generation, not training.
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

Objective: Reason that pretraining is broad durable pattern learning from next-token prediction over large datasets, not perfect recall or live browsing.

### Q1. v0279-pretraining-q1

- Type: mechanism in action
- Category: mechanism
- Stem: During pretraining, what signal teaches the model broad language patterns across many examples?
- Correct choice: v0279-pretraining-q1-correct
- Choices:
  - v0279-pretraining-q1-correct: Repeated prediction error/loss from next-token targets changes weights over many training steps. (correct)
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

- Type: boundary distinction
- Category: boundary
- Stem: Why can pretraining create broad capability without making the model a perfect library of its sources?
- Correct choice: v0279-pretraining-q2-correct
- Choices:
  - v0279-pretraining-q2-correct: It shapes statistical patterns in weights; it does not create a searchable copy of every source. (correct)
    - feedback: Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.
  - v0279-pretraining-q2-private-files: It gives the model direct access to every private file on demand.
    - feedback: Not quite. Training data exposure is not the same as access to every private file.
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

- Type: causal consequence
- Category: causal-consequence
- Stem: If pretraining examples include many styles and task shapes, what can change inside the model?
- Correct choice: v0279-pretraining-q3-correct
- Choices:
  - v0279-pretraining-q3-correct: Weights can shift so future prompts activate more useful language/code patterns. (correct)
    - feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
  - v0279-pretraining-q3-current-context: The model’s current chat context becomes permanently larger.
    - feedback: Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.
    - misconception: pretraining weights vs temporary context
    - represented term: context window
    - source: nearby-stage
    - rationale: Tempting because context also affects output.
  - v0279-pretraining-q3-interface: Only the app’s buttons, labels, or interface change.
    - feedback: This describes product UI changes, not the model’s learned parameters.
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

### Q4. v0279-pretraining-q4

- Type: misconception diagnosis
- Category: misconception-check
- Stem: A base model produces fact-like text about public topics. What is the model-literate explanation?
- Correct choice: v0279-pretraining-q4-correct
- Choices:
  - v0279-pretraining-q4-correct: Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page. (correct)
    - feedback: Insight strengthened. Source-like output can come from pretrained patterns, but it is not the same as cited evidence.
  - v0279-pretraining-q4-web-every-time: It must be browsing the web by itself for every answer.
    - feedback: Not quite. Some systems browse or retrieve, but a base model can also generate fact-like text from pretrained weights.
    - misconception: pretraining vs web retrieval
    - represented term: retrieval
    - source: nearby-stage
    - rationale: Tempting because web search is a familiar way to find facts.
  - v0279-pretraining-q4-conscious-memory: It must consciously remember reading those pages.
    - feedback: That gives the model too much mind. It has learned weights, not conscious recollection.
    - misconception: fluent fact-like output vs awareness
    - represented term: llm
    - source: author-created misconception
    - rationale: Tempting because the output can sound like human memory.
  - v0279-pretraining-q4-finetuning-alone: Fine-tuning alone explains all broad model knowledge.
    - feedback: Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.
    - misconception: pretraining vs fine-tuning
    - represented term: fine-tuning
    - source: nearby-stage
    - rationale: Tempting because fine-tuning is another training phase.

## Overfitting and Generalization (3)

Stage: 1. Before Morning

Objective: Diagnose when a model fits training examples too narrowly and explain that set-aside validation examples are kept out of training to test transfer.

### Q1. v0279-overfitting-generalization-q1

- Type: applied scenario
- Category: application
- Stem: A model gets every training example right but fails on new validation examples. What problem is showing up?
- Correct choice: v0279-overfitting-generalization-q1-correct
- Choices:
  - v0279-overfitting-generalization-q1-correct: Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize. (correct)
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

- Type: human-use judgment
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

- Type: causal consequence
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
  - v0279-overfitting-generalization-q3-conscious-choice: The model is definitely conscious but choosing not to answer.
    - feedback: That gives the model too much mind. The issue is brittle transfer, not intention.
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

Objective: Distinguish durable fine-tuning from temporary prompt, RAG, and sampling-time steering.

### Q1. v02710-fine-tuning-q1

- Type: boundary distinction
- Category: boundary
- Stem: A team wants a support assistant to answer in a durable house style across future conversations. Which move is closest to fine-tuning?
- Correct choice: v02710-fine-tuning-q1-correct
- Choices:
  - v02710-fine-tuning-q1-correct: Run additional training that changes weights or adapter behavior for future responses. (correct)
    - feedback: Good distinction. Fine-tuning is durable shaping after pretraining.
  - v02710-fine-tuning-q1-better-prompt: Write one clearer prompt for the current chat.
    - feedback: Not quite. A prompt can steer the current run, but fine-tuning changes future behavior through training.
    - misconception: prompting vs durable fine-tuning
    - represented term: prompt
    - source: same-card
    - rationale: Tempting because prompts can strongly steer one answer.
  - v02710-fine-tuning-q1-rag: Retrieve one policy PDF into the current context.
    - feedback: Close, but RAG adds temporary context. Fine-tuning is a training process that durably shapes behavior.
    - misconception: retrieval/context vs training
    - represented term: RAG
    - source: same-card
    - rationale: Tempting because retrieved text can improve one answer.
  - v02710-fine-tuning-q1-sampling: Sample the next token from the current probability cloud.
    - feedback: That describes decoding during inference. It chooses a token; it does not adapt the model for future runs.
    - misconception: decoding vs training
    - represented term: sampling
    - source: same-card
    - rationale: Tempting because sampling is part of response generation.

### Q2. v02710-fine-tuning-q2

- Type: applied scenario
- Category: application
- Stem: A base model is adapted on thousands of institution-specific examples, then later answers new users in that style. What changed most directly?
- Correct choice: v02710-fine-tuning-q2-correct
- Choices:
  - v02710-fine-tuning-q2-correct: The adapted model’s weights or adapter behavior can carry that pattern into later inference runs. (correct)
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

- Type: causal consequence
- Category: causal-consequence
- Stem: If fine-tuning is used for alignment, what does that mean about future model behavior?
- Correct choice: v02710-fine-tuning-q3-correct
- Choices:
  - v02710-fine-tuning-q3-correct: Training can make some instruction-following or preference patterns more likely in later responses. (correct)
    - feedback: Good distinction. Fine-tuning can support alignment by durably shaping output patterns.
  - v02710-fine-tuning-q3-perfect-safety: Every future answer is guaranteed safe and true.
    - feedback: Not quite. Fine-tuning can improve behavior, but it does not guarantee truth or safety.
    - misconception: alignment/fine-tuning as guarantee
    - represented term: alignment
    - source: nearby-stage
    - rationale: Tempting because alignment sounds like solving behavior.
  - v02710-fine-tuning-q3-system-prompt-only: Only the visible system prompt changed for one session.
    - feedback: Close, but a system prompt steers the current run. Fine-tuning is durable training.
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

Objective: Reason about alignment as behavior shaping across training, system design, evaluation, and runtime controls without mistaking it for conscience or guaranteed truth.

### Q1. v02710-alignment-q1

- Type: boundary distinction
- Category: boundary
- Stem: An alignment-shaped assistant refuses a harmful request and follows a safer instruction instead. What should a model-literate learner conclude?
- Correct choice: v02710-alignment-q1-correct
- Choices:
  - v02710-alignment-q1-correct: Its behavior was shaped toward instructions and safety boundaries, but that does not prove moral understanding. (correct)
    - feedback: Good distinction. Alignment shapes behavior; it is not magic morality.
  - v02710-alignment-q1-conscious: The model must understand morality the way a person does.
    - feedback: That gives the model too much mind. Refusal behavior can be shaped without human moral understanding.
    - misconception: aligned behavior vs moral agency
    - represented term: alignment
    - source: same-card
    - rationale: Tempting because refusals can sound principled.
  - v02710-alignment-q1-truth: Every answer from the assistant is now guaranteed true.
    - feedback: Not quite. Alignment can shape behavior, but it does not guarantee factual truth.
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

- Type: model trace
- Category: model-trace
- Stem: A product uses instruction fine-tuning, a system prompt, and a policy filter around one LLM. Which alignment map is most useful?
- Correct choice: v02710-alignment-q2-correct
- Choices:
  - v02710-alignment-q2-correct: Some alignment changes can be durable training changes, while other controls steer or filter the current run. (correct)
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

- Type: human-use judgment
- Category: human-use-judgment
- Stem: Why do teams evaluate aligned models with tests and human feedback after training or deployment?
- Correct choice: v02710-alignment-q3-correct
- Choices:
  - v02710-alignment-q3-correct: Because shaped behavior can still fail, drift, or create unexpected tradeoffs in new situations. (correct)
    - feedback: Good distinction. Alignment needs evaluation; it is not a one-time guarantee.
  - v02710-alignment-q3-conscious-test: To check whether the model has developed a conscience.
    - feedback: Not quite. Evaluation checks behavior and outcomes, not inner conscience.
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
    - feedback: Close, but loss alone is not a full safety or usefulness evaluation.
    - misconception: loss vs safety/behavior evaluation
    - represented term: loss
    - source: nearby-stage
    - rationale: Tempting because loss is an important training signal.

### Q4. v02710-alignment-q4

- Type: misconception diagnosis
- Category: misconception-check
- Stem: A guardrail blocks one unsafe response from reaching the user. What changed most directly?
- Correct choice: v02710-alignment-q4-correct
- Choices:
  - v02710-alignment-q4-correct: A policy or filter layer affected the visible response; that does not necessarily mean the model weights changed. (correct)
    - feedback: Good distinction. Guardrails can be runtime controls around a model.
  - v02710-alignment-q4-finetune: The base model was definitely fine-tuned at that moment.
    - feedback: Not quite. A filter can block output during runtime without retraining the model.
    - misconception: filtering vs fine-tuning
    - represented term: fine-tuning
    - source: same-card
    - rationale: Tempting because both can change visible behavior.
  - v02710-alignment-q4-truth: The response became guaranteed factual because it passed a guardrail.
    - feedback: Passing a guardrail is not the same as being true. Evidence and review can still matter.
    - misconception: policy compliance vs truth
    - represented term: truth
    - source: author-created misconception
    - rationale: Tempting because allowed output may feel approved.
  - v02710-alignment-q4-awareness: The model realized the request was wrong.
    - feedback: That gives the model too much mind. The visible behavior can come from shaped model behavior or surrounding controls.
    - misconception: guardrail behavior vs awareness
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because the refusal may sound reflective.

## Inference (4)

Stage: 2. Morning Commute

Objective: Explain ordinary inference as fixed weights plus temporary context-shaped computation, not durable learning.

### Q1. v02710-inference-q1

- Type: mechanism in action
- Category: mechanism
- Stem: During ordinary inference, the current context enters the model. What changes temporarily, and what usually stays fixed?
- Correct choice: v02710-inference-q1-correct
- Choices:
  - v02710-inference-q1-correct: Temporary activations and hidden states change; learned weights usually stay fixed. (correct)
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

- Type: model trace
- Category: model-trace
- Stem: In one inference step, which trace best matches the model’s next-token path?
- Correct choice: v02710-inference-q2-correct
- Choices:
  - v02710-inference-q2-correct: Context enters a forward pass, temporary states form, logits are produced, and sampling can choose a token. (correct)
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
    - feedback: Tokenization prepares input, but inference still runs model layers to produce scores.
    - misconception: tokenization vs model forward pass
    - represented term: tokenization
    - source: same-stage
    - rationale: Tempting because tokenization is an early required step.

### Q3. v02710-inference-q3

- Type: applied scenario
- Category: application
- Stem: A chatbot remembers an earlier line in the same conversation and uses it in the next answer. What is the best model-level explanation?
- Correct choice: v02710-inference-q3-correct
- Choices:
  - v02710-inference-q3-correct: The earlier line is still in the current context, so fixed weights can use it during inference. (correct)
    - feedback: Good distinction. Context can feel like memory while still being temporary input.
  - v02710-inference-q3-weight-memory: The earlier line was written into the model’s weights.
    - feedback: Not quite. Same-conversation context is temporary input, not necessarily a weight update.
    - misconception: context vs durable memory
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because the model appears to remember.
  - v02710-inference-q3-training-now: The chatbot fine-tuned itself on the earlier line.
    - feedback: Close, but adaptation within a context window is not the same as fine-tuning.
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

- Type: causal consequence
- Category: causal-consequence
- Stem: If ordinary inference normally does not update weights, what follows for future conversations?
- Correct choice: v02710-inference-q4-correct
- Choices:
  - v02710-inference-q4-correct: A useful answer now does not automatically teach the base model to behave differently tomorrow. (correct)
    - feedback: Insight strengthened. Inference can be useful without being durable training.
  - v02710-inference-q4-auto-learn: Every good answer automatically becomes permanent skill.
    - feedback: Not quite. Durable skill changes require training or another model-update process.
    - misconception: inference vs durable learning
    - represented term: training
    - source: same-card
    - rationale: Tempting because the response looks like successful practice.
  - v02710-inference-q4-no-context: The current prompt cannot affect the answer at all.
    - feedback: Close, but fixed weights can still respond differently to different current contexts.
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

Objective: Separate given prompt/context tokens from generated response tokens and explain append-and-repeat generation.

### Q1. v02710-prompt-response-q1

- Type: boundary distinction
- Category: boundary
- Stem: A user gives a complete prompt, then the model begins writing response tokens. Which boundary matters most?
- Correct choice: v02710-prompt-response-q1-correct
- Choices:
  - v02710-prompt-response-q1-correct: Prompt tokens are given to the model; response tokens are generated and then appended to context. (correct)
    - feedback: Good distinction. Prompt is given; response is generated and appended.
  - v02710-prompt-response-q1-all-user: Both prompt and response tokens were typed by the user.
    - feedback: Not quite. The user provides the prompt; the model generates response tokens.
    - misconception: prompt vs generated response
    - represented term: response
    - source: same-card
    - rationale: Tempting because both can appear together in the conversation transcript.
  - v02710-prompt-response-q1-all-at-once: The model writes the whole response at once after reading the prompt.
    - feedback: Close, but the model generates response tokens step by step.
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

- Type: model trace
- Category: model-trace
- Stem: After the model chooses one next response token, what does the next inference step see?
- Correct choice: v02710-prompt-response-q2-correct
- Choices:
  - v02710-prompt-response-q2-correct: The original prompt plus the response so far, including the newly appended token. (correct)
    - feedback: Insight strengthened. The context grows as generated response tokens are appended.
  - v02710-prompt-response-q2-only-new-token: Only the newly chosen token, with the prompt removed.
    - feedback: Not quite. The next step can use the prompt and response-so-far that remain in context.
    - misconception: context accumulation vs isolated token
    - represented term: context window
    - source: same-card
    - rationale: Tempting because the new token is the most recent event.
  - v02710-prompt-response-q2-weight-memory: A permanent memory of the token stored in model weights.
    - feedback: Close, but using a token later in the run is context, not a weight update.
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

- Type: misconception diagnosis
- Category: misconception-check
- Stem: A generated response improves after the user adds a clarifying sentence. What changed most directly?
- Correct choice: v02710-prompt-response-q3-correct
- Choices:
  - v02710-prompt-response-q3-correct: The current prompt/context changed, so the next response tokens were generated from better input. (correct)
    - feedback: Good distinction. Better context can improve the current response without training the model.
  - v02710-prompt-response-q3-finetuned: The model was fine-tuned by the clarifying sentence.
    - feedback: Not quite. A clarifying sentence can steer the current run; fine-tuning is additional training.
    - misconception: prompt steering vs fine-tuning
    - represented term: fine-tuning
    - source: same-stage
    - rationale: Tempting because the answer improves after feedback.
  - v02710-prompt-response-q3-conscious: The model understood its mistake like a person and decided to improve.
    - feedback: That gives the model too much mind. Better output can come from better context.
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

Objective: Explain tokenization as the split from text into model-readable chunks that may not match human words.

### Q1. v02710-tokens-q1

- Type: applied scenario
- Category: application
- Stem: A tokenizer splits “startled.” into pieces like “start”, “led”, and “.” What should that tell a learner?
- Correct choice: v02710-tokens-q1-correct
- Choices:
  - v02710-tokens-q1-correct: Tokens can be uneven text chunks, including word pieces and punctuation. (correct)
    - feedback: Good distinction. Tokens are model-readable chunks, not always whole words.
  - v02710-tokens-q1-whole-word: Every token must be a complete dictionary word.
    - feedback: Not quite. Tokenizers can split words, punctuation, spaces, or other chunks.
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
    - feedback: Close, but token boundaries do not perfectly match human concepts or meanings.
    - misconception: token chunk vs meaning/concept
    - represented term: embedding
    - source: nearby-stage
    - rationale: Tempting because tokens often carry meaning clues.

### Q2. v02710-tokens-q2

- Type: model trace
- Category: model-trace
- Stem: Before transformer layers process text, which tokens-to-IDs-to-embeddings path comes first?
- Correct choice: v02710-tokens-q2-correct
- Choices:
  - v02710-tokens-q2-correct: Text is split into tokens, tokens map to token IDs, and IDs look up embeddings. (correct)
    - feedback: Insight strengthened. Tokenization starts the bridge from text to numerical computation.
  - v02710-tokens-q2-raw-english: Raw English sentences move through every layer without numerical representation.
    - feedback: Not quite. The model needs numerical representations, starting with tokens and IDs.
    - misconception: raw text vs numerical representation
    - represented term: tokenization
    - source: same-card
    - rationale: Tempting because users see text at the interface.
  - v02710-tokens-q2-weights-first: Weights are rewritten before text becomes tokens.
    - feedback: Close, but tokenization prepares the input; it does not rewrite weights.
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

- Type: boundary distinction
- Category: boundary
- Stem: Both the user prompt and the generated response eventually appear as text. How does tokenization treat them?
- Correct choice: v02710-tokens-q3-correct
- Choices:
  - v02710-tokens-q3-correct: Prompt text and generated response text can both be represented as tokens. (correct)
    - feedback: Good distinction. Tokenization applies to text entering and leaving the generation loop.
  - v02710-tokens-q3-prompt-only: Only prompt text becomes tokens; response text skips token IDs.
    - feedback: Not quite. Generated response tokens are token IDs before being displayed as text.
    - misconception: prompt token vs response token
    - represented term: response token
    - source: same-card
    - rationale: Tempting because the user sees the response as text.
  - v02710-tokens-q3-response-only: Only response text becomes tokens; prompts stay as raw English.
    - feedback: Close, but prompts also need token representation before model processing.
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

Objective: Explain token IDs as lookup numbers that point from token chunks to learned embedding vectors, not meanings by themselves.

### Q1. v02710-token-ids-q1

- Type: mechanism in action
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

- Type: boundary distinction
- Category: boundary
- Stem: A learner says “982 means cat because the ID is the meaning.” What correction is most model-literate?
- Correct choice: v02710-token-ids-q2-correct
- Choices:
  - v02710-token-ids-q2-correct: 982 is a lookup number for a token; meaning comes from learned patterns around embeddings and model layers. (correct)
    - feedback: Insight strengthened. The ID points into the system; it is not understanding by itself.
  - v02710-token-ids-q2-conscious: 982 means cat because the model consciously understands the number.
    - feedback: That gives the model too much mind. A lookup number does not imply conscious understanding.
    - misconception: ID/meaning vs consciousness
    - represented term: llm
    - source: explicit-confusable
    - rationale: Tempting because the model uses the ID fluently.
  - v02710-token-ids-q2-truth: 982 guarantees every sentence about cats will be true.
    - feedback: Not quite. Token IDs do not guarantee factual output.
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

- Type: model trace
- Category: model-trace
- Stem: During generation, the model chooses a next response token ID before the user sees text. What happens after that?
- Correct choice: v02710-token-ids-q3-correct
- Choices:
  - v02710-token-ids-q3-correct: The chosen ID can be displayed as text and appended as a response token in the current context. (correct)
    - feedback: Good distinction. Generated tokens are IDs before they become visible text.
  - v02710-token-ids-q3-weight-update: The chosen ID permanently updates the model weights.
    - feedback: Not quite. The chosen token can affect the next context without changing weights.
    - misconception: generated token vs training update
    - represented term: weight
    - source: nearby-stage
    - rationale: Tempting because the token affects the next step.
  - v02710-token-ids-q3-raw-word: The model skips IDs and chooses only raw human words.
    - feedback: Close, but the model works with token IDs before text is displayed.
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

Objective: Explain Embeddings as part of the day in the life of a prompt.

### Q1. v02711-embeddings-q1

- Type: applied mechanism check
- Category: application
- Stem: A learner is tracing Embeddings. Which choice keeps the model mechanism clear?
- Correct choice: v02711-embeddings-q1-correct
- Choices:
  - v02711-embeddings-q1-correct: A learned starting vector for a token ID (correct)
    - feedback: Insight strengthened. An embedding starts the token in numerical space before context reshapes it.
  - v02711-embeddings-q1-2-memory: A finished sentence
    - feedback: Not quite. Embeddings are numerical vectors, not definitions, memories, or hidden English text.
    - misconception: A finished sentence
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-embeddings-q1-3-memory: A human memory
    - feedback: Not quite. Embeddings are numerical vectors, not definitions, memories, or hidden English text.
    - misconception: A human memory
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-embeddings-q1-4-token-id: A secret English definition
    - feedback: Not quite. Embeddings are numerical vectors, not definitions, memories, or hidden English text.
    - misconception: A secret English definition
    - represented term: token-id
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-embeddings-q2

- Type: mechanism
- Category: mechanism
- Stem: During Morning Commute, what distinction should the learner keep clear about Embeddings?
- Correct choice: v02711-embeddings-q2-correct
- Choices:
  - v02711-embeddings-q2-correct: The embedding table is durable learned model data. (correct)
    - feedback: Good distinction. The embedding table is durable learned model data.
  - v02711-embeddings-q2-2-tokenizer: It is mainly about Tokenizer, not the mechanism named in Embeddings.
    - feedback: This choice points toward Tokenizer. Tokenizer matters nearby, but this question is asking about Embeddings.
    - misconception: Not the model weights and not the embedding table.
    - represented term: tokenizer
    - source: explicit-confusable
    - rationale: Tempting because Tokenizer is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Embeddings mechanism or distinction.
  - v02711-embeddings-q2-3-tensor: It is a single word rather than an organized block of numbers.
    - feedback: This choice points toward Tensor. Tensor matters nearby, but this question is asking about Embeddings.
    - misconception: Not one word, one number, or a mysterious object by default.
    - represented term: tensor
    - source: explicit-confusable
    - rationale: Tempting because Tensor is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Embeddings mechanism or distinction.
  - v02711-embeddings-q2-4-feature: It is mainly about Feature, not the mechanism named in Embeddings.
    - feedback: This choice points toward Feature. Feature matters nearby, but this question is asking about Embeddings.
    - misconception: Not necessarily a single obvious trait like dogness or grammar.
    - represented term: feature
    - source: explicit-confusable
    - rationale: Tempting because Feature is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Embeddings mechanism or distinction.

## Vectors (3)

Stage: 2. Morning Commute

Objective: Explain Vectors as part of the day in the life of a prompt.

### Q1. v02711-vectors-q1

- Type: applied mechanism check
- Category: application
- Stem: A learner is placing Vectors in the prompt's journey. Which choice keeps the mechanism clear?
- Correct choice: v02711-vectors-q1-correct
- Choices:
  - v02711-vectors-q1-correct: Embeddings and hidden states are both vectors (correct)
    - feedback: Insight strengthened. Vectors let the model compute with many fuzzy numerical features at once.
  - v02711-vectors-q1-2-embedding: Vectors are whole paragraphs
    - feedback: Not quite. Vectors are numerical representations; their features are distributed and not usually human-labeled.
    - misconception: Vectors are whole paragraphs
    - represented term: embedding
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-vectors-q1-3-feature: Vectors are permanent chats
    - feedback: Not quite. Vectors are numerical representations; their features are distributed and not usually human-labeled.
    - misconception: Vectors are permanent chats
    - represented term: feature
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-vectors-q1-4-hidden-state: Every vector dimension is a neat English meaning
    - feedback: Not quite. Vectors are numerical representations; their features are distributed and not usually human-labeled.
    - misconception: Every vector dimension is a neat English meaning
    - represented term: hidden state
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-vectors-q2

- Type: mechanism
- Category: mechanism
- Stem: During Morning Commute, what distinction should the learner keep clear about Vectors?
- Correct choice: v02711-vectors-q2-correct
- Choices:
  - v02711-vectors-q2-correct: Some vectors are durable learned parameters, such as embedding rows. (correct)
    - feedback: Good distinction. Some vectors are durable learned parameters, such as embedding rows.
  - v02711-vectors-q2-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Vectors.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.
  - v02711-vectors-q2-3-embedding-table: It is mainly about Embedding table, not the mechanism named in Vectors.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Vectors.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.
  - v02711-vectors-q2-4-token-id: It is the meaning of the word itself.
    - feedback: This choice points toward Token ID. Token ID matters nearby, but this question is asking about Vectors.
    - misconception: The ID is not the meaning, not a memory, and not a truth score.
    - represented term: token-id
    - source: explicit-confusable
    - rationale: Tempting because Token ID is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.

### Q3. v02711-vectors-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Vectors help learners avoid?
- Correct choice: v02711-vectors-q3-correct
- Choices:
  - v02711-vectors-q3-correct: It corrects the misconception: Each vector dimension has a simple human-readable label. (correct)
    - feedback: Good distinction. Vectors is clearer when that misconception is separated from the mechanism.
  - v02711-vectors-q3-2-embedding-table: It is mainly about Embedding table, not the mechanism named in Vectors.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Vectors.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.
  - v02711-vectors-q3-3-token-id: It is the meaning of the word itself.
    - feedback: This choice points toward Token ID. Token ID matters nearby, but this question is asking about Vectors.
    - misconception: The ID is not the meaning, not a memory, and not a truth score.
    - represented term: token-id
    - source: explicit-confusable
    - rationale: Tempting because Token ID is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.
  - v02711-vectors-q3-4-layer: It is a permanent memory store for the conversation.
    - feedback: This choice points toward Layer. Layer matters nearby, but this question is asking about Vectors.
    - misconception: Not a conscious stage of thought.
    - represented term: layer
    - source: explicit-confusable
    - rationale: Tempting because Layer is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Vectors mechanism or distinction.

## Tensors (2)

Stage: 2. Morning Commute

Objective: Explain Tensors as part of the day in the life of a prompt.

### Q1. v02711-tensors-q1

- Type: applied mechanism check
- Category: application
- Stem: A learner sees this in the model trace. Which choice best describes a tensor in the model processing path?
- Correct choice: v02711-tensors-q1-correct
- Choices:
  - v02711-tensors-q1-correct: An organized block of numbers (correct)
    - feedback: Insight strengthened. Tensors organize many vectors so model layers can process them.
  - v02711-tensors-q1-2-token: A word in a dictionary
    - feedback: Not quite. In this app, tensor means a shaped numerical block, not a word, rule, or memory.
    - misconception: A word in a dictionary
    - represented term: token
    - source: same-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-tensors-q1-3-activation: A rule written by a programmer
    - feedback: Not quite. In this app, tensor means a shaped numerical block, not a word, rule, or memory.
    - misconception: A rule written by a programmer
    - represented term: activation
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-tensors-q1-4-memory: A permanent memory of the prompt
    - feedback: Not quite. In this app, tensor means a shaped numerical block, not a word, rule, or memory.
    - misconception: A permanent memory of the prompt
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-tensors-q2

- Type: mechanism
- Category: mechanism
- Stem: During Morning Commute, what distinction should the learner keep clear about Tensors?
- Correct choice: v02711-tensors-q2-correct
- Choices:
  - v02711-tensors-q2-correct: Weight tensors are durable learned parameters. (correct)
    - feedback: Good distinction. Weight tensors are durable learned parameters.
  - v02711-tensors-q2-2-hidden-state: It is the token’s fixed starting vector before context matters.
    - feedback: This choice points toward Hidden state. Hidden state matters nearby, but this question is asking about Tensors.
    - misconception: Often confused with embeddings, weights, saved memory, or visible response text.
    - represented term: hidden state
    - source: explicit-confusable
    - rationale: Tempting because Hidden state is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Tensors mechanism or distinction.
  - v02711-tensors-q2-3-distributed-representation: It is mainly about Distributed representation, not the mechanism named in Tensors.
    - feedback: This choice points toward Distributed representation. Distributed representation matters nearby, but this question is asking about Tensors.
    - misconception: Not one dimension per English concept.
    - represented term: distributed-representation
    - source: explicit-confusable
    - rationale: Tempting because Distributed representation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Tensors mechanism or distinction.
  - v02711-tensors-q2-4-inference: It durably trains the model on the current prompt.
    - feedback: This choice points toward Inference. Inference matters nearby, but this question is asking about Tensors.
    - misconception: Inference can use context during one run, but it does not normally train the model.
    - represented term: inference
    - source: explicit-confusable
    - rationale: Tempting because Inference is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Tensors mechanism or distinction.

## Attention (4)

Stage: 3. Workday

Objective: Explain Attention as part of the day in the life of a prompt.

### Q1. v02711-attention-q1

- Type: applied mechanism check
- Category: application
- Stem: What does attention do in a transformer?
- Correct choice: v02711-attention-q1-correct
- Choices:
  - v02711-attention-q1-correct: It weights relevance between token positions. (correct)
    - feedback: Attention weights relevance between token positions in the current context.
  - v02711-attention-q1-2-llm: It gives the model consciousness.
    - feedback: Not quite. Attention is not awareness. It is temporary relevance weighting inside the forward pass.
    - misconception: It gives the model consciousness.
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-attention-q1-3-layer: It permanently stores memories.
    - feedback: Not quite. Attention patterns are temporary during inference; they do not store permanent memories.
    - misconception: It permanently stores memories.
    - represented term: layer
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-attention-q1-4-sampling: It chooses the final answer by itself.
    - feedback: Not quite. Attention helps shape hidden states; logits, softmax, and sampling come later.
    - misconception: It chooses the final answer by itself.
    - represented term: sampling
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-attention-q2

- Type: mechanism
- Category: mechanism
- Stem: During Workday, what distinction should the learner keep clear about Attention?
- Correct choice: v02711-attention-q2-correct
- Choices:
  - v02711-attention-q2-correct: Attention uses learned weights, but the attention pattern for a prompt is temporary during inference. (correct)
    - feedback: Good distinction. Attention uses learned weights, but the attention pattern for a prompt is temporary during inference.
  - v02711-attention-q2-2-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about Attention.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q2-3-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Attention.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q2-4-system-prompt: It is mainly about System prompt, not the mechanism named in Attention.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about Attention.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.

### Q3. v02711-attention-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Attention help learners avoid?
- Correct choice: v02711-attention-q3-correct
- Choices:
  - v02711-attention-q3-correct: It corrects the misconception: Attention means consciousness or awareness. (correct)
    - feedback: Good distinction. Attention is clearer when that misconception is separated from the mechanism.
  - v02711-attention-q3-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Attention.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q3-3-system-prompt: It is mainly about System prompt, not the mechanism named in Attention.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about Attention.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q3-4-response-so-far: It is mainly about Response-so-far, not the mechanism named in Attention.
    - feedback: This choice points toward Response-so-far. Response-so-far matters nearby, but this question is asking about Attention.
    - misconception: Not the whole final answer, permanent memory, or training data.
    - represented term: response-so-far
    - source: explicit-confusable
    - rationale: Tempting because Response-so-far is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.

### Q4. v02711-attention-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Attention connect to the prompt's Journey?
- Correct choice: v02711-attention-q4-correct
- Choices:
  - v02711-attention-q4-correct: After tokens become vectors and tensors, attention is one main operation inside transformer layers. (correct)
    - feedback: Good connection. After tokens become vectors and tensors, attention is one main operation inside transformer layers.
  - v02711-attention-q4-2-system-prompt: It is mainly about System prompt, not the mechanism named in Attention.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about Attention.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q4-3-response-so-far: It is mainly about Response-so-far, not the mechanism named in Attention.
    - feedback: This choice points toward Response-so-far. Response-so-far matters nearby, but this question is asking about Attention.
    - misconception: Not the whole final answer, permanent memory, or training data.
    - represented term: response-so-far
    - source: explicit-confusable
    - rationale: Tempting because Response-so-far is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.
  - v02711-attention-q4-4-retrieval: It is the same as fine-tuning the model on new data.
    - feedback: This choice points toward Retrieval. Retrieval matters nearby, but this question is asking about Attention.
    - misconception: Retrieval is being treated as the same idea as Attention.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Tempting because Retrieval is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Attention mechanism or distinction.

## MLP (3)

Stage: 3. Workday

Objective: Explain MLP as part of the day in the life of a prompt.

### Q1. v02711-mlp-q1

- Type: applied mechanism check
- Category: application
- Stem: What does the MLP mainly do here?
- Correct choice: v02711-mlp-q1-correct
- Choices:
  - v02711-mlp-q1-correct: Reshapes each token position's feature vector (correct)
    - feedback: The MLP reshapes features for a token position during the forward pass.
  - v02711-mlp-q1-2-token: Mixes information between different token positions
    - feedback: Not quite. Attention mixes across token positions. The MLP reshapes within each token position.
    - misconception: Mixes information between different token positions
    - represented term: token
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-mlp-q1-3-feature: Reads private files
    - feedback: Not quite. The MLP transforms current-context vectors; it does not retrieve private files.
    - misconception: Reads private files
    - represented term: feature
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-mlp-q1-4-hidden-state: Permanently stores the prompt
    - feedback: Not quite. The MLP has durable weights, but its inference activations are temporary.
    - misconception: Permanently stores the prompt
    - represented term: hidden state
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-mlp-q2

- Type: mechanism
- Category: mechanism
- Stem: During Workday, what distinction should the learner keep clear about MLP?
- Correct choice: v02711-mlp-q2-correct
- Choices:
  - v02711-mlp-q2-correct: The MLP has learned weights, but the feature values it produces during inference are temporary activations. (correct)
    - feedback: Good distinction. The MLP has learned weights, but the feature values it produces during inference are temporary activations.
  - v02711-mlp-q2-2-distributed-representation: It is mainly about Distributed representation, not the mechanism named in MLP.
    - feedback: This choice points toward Distributed representation. Distributed representation matters nearby, but this question is asking about MLP.
    - misconception: Not one dimension per English concept.
    - represented term: distributed-representation
    - source: explicit-confusable
    - rationale: Tempting because Distributed representation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.
  - v02711-mlp-q2-3-context-window: It is permanent model memory.
    - feedback: This choice points toward Context window. Context window matters nearby, but this question is asking about MLP.
    - misconception: Not permanent memory; it is temporary working context.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Tempting because Context window is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.
  - v02711-mlp-q2-4-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about MLP.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.

### Q3. v02711-mlp-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does MLP help learners avoid?
- Correct choice: v02711-mlp-q3-correct
- Choices:
  - v02711-mlp-q3-correct: It corrects the misconception: The MLP mixes information between different token positions. (correct)
    - feedback: Good distinction. MLP is clearer when that misconception is separated from the mechanism.
  - v02711-mlp-q3-2-context-window: It is permanent model memory.
    - feedback: This choice points toward Context window. Context window matters nearby, but this question is asking about MLP.
    - misconception: Not permanent memory; it is temporary working context.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Tempting because Context window is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.
  - v02711-mlp-q3-3-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about MLP.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.
  - v02711-mlp-q3-4-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about MLP.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific MLP mechanism or distinction.

## Layers (4)

Stage: 3. Workday

Objective: Explain Layers as part of the day in the life of a prompt.

### Q1. v02711-layers-q1

- Type: applied mechanism check
- Category: application
- Stem: What do layers repeatedly refine?
- Correct choice: v02711-layers-q1-correct
- Choices:
  - v02711-layers-q1-correct: Temporary hidden states (correct)
    - feedback: Layers repeat attention and MLP transformations to refine temporary hidden states.
  - v02711-layers-q1-2-memory: Permanent user memory
    - feedback: Not quite. Layers process temporary activations during a forward pass; they do not save user memory.
    - misconception: Permanent user memory
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-layers-q1-3-mlp: The app interface
    - feedback: Not quite. Layers are inside the model, not the app chrome.
    - misconception: The app interface
    - represented term: MLP
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-layers-q1-4-training: The training dataset
    - feedback: Not quite. The training dataset shaped weights earlier; layers process the current context now.
    - misconception: The training dataset
    - represented term: training
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-layers-q2

- Type: mechanism
- Category: mechanism
- Stem: During Workday, what distinction should the learner keep clear about Layers?
- Correct choice: v02711-layers-q2-correct
- Choices:
  - v02711-layers-q2-correct: Layer weights are durable learned parameters. (correct)
    - feedback: Good distinction. Layer weights are durable learned parameters.
  - v02711-layers-q2-2-feature: It is mainly about Feature, not the mechanism named in Layers.
    - feedback: This choice points toward Feature. Feature matters nearby, but this question is asking about Layers.
    - misconception: Not necessarily a single obvious trait like dogness or grammar.
    - represented term: feature
    - source: explicit-confusable
    - rationale: Tempting because Feature is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q2-3-multi-layer-perceptron: It is mainly about Multi-layer perceptron, not the mechanism named in Layers.
    - feedback: This choice points toward Multi-layer perceptron. Multi-layer perceptron matters nearby, but this question is asking about Layers.
    - misconception: Not a biological neuron or a separate chat agent.
    - represented term: multi-layer-perceptron
    - source: explicit-confusable
    - rationale: Tempting because Multi-layer perceptron is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q2-4-feed-forward-network: It is mainly about Feed-forward network, not the mechanism named in Layers.
    - feedback: This choice points toward Feed-forward network. Feed-forward network matters nearby, but this question is asking about Layers.
    - misconception: Not retrieval, memory, or cross-token attention.
    - represented term: feed-forward-network
    - source: explicit-confusable
    - rationale: Tempting because Feed-forward network is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.

### Q3. v02711-layers-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Layers help learners avoid?
- Correct choice: v02711-layers-q3-correct
- Choices:
  - v02711-layers-q3-correct: It corrects the misconception: Each layer is a human-like thought or reasoning step. (correct)
    - feedback: Good distinction. Layers is clearer when that misconception is separated from the mechanism.
  - v02711-layers-q3-2-multi-layer-perceptron: It is mainly about Multi-layer perceptron, not the mechanism named in Layers.
    - feedback: This choice points toward Multi-layer perceptron. Multi-layer perceptron matters nearby, but this question is asking about Layers.
    - misconception: Not a biological neuron or a separate chat agent.
    - represented term: multi-layer-perceptron
    - source: explicit-confusable
    - rationale: Tempting because Multi-layer perceptron is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q3-3-feed-forward-network: It is mainly about Feed-forward network, not the mechanism named in Layers.
    - feedback: This choice points toward Feed-forward network. Feed-forward network matters nearby, but this question is asking about Layers.
    - misconception: Not retrieval, memory, or cross-token attention.
    - represented term: feed-forward-network
    - source: explicit-confusable
    - rationale: Tempting because Feed-forward network is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q3-4-embedding: It is the temporary context-shaped hidden state.
    - feedback: This choice points toward Embedding. Embedding matters nearby, but this question is asking about Layers.
    - misconception: Often confused with a dictionary definition, a human memory, or a hidden state.
    - represented term: embedding
    - source: explicit-confusable
    - rationale: Tempting because Embedding is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.

### Q4. v02711-layers-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Layers connect to the prompt's Journey?
- Correct choice: v02711-layers-q4-correct
- Choices:
  - v02711-layers-q4-correct: Each layer repeats attention and MLP transformations, while residual paths and normalization help useful signal carry forward. (correct)
    - feedback: Good connection. Each layer repeats attention and MLP transformations, while residual paths and normalization help useful signal carry forward.
  - v02711-layers-q4-2-feed-forward-network: It is mainly about Feed-forward network, not the mechanism named in Layers.
    - feedback: This choice points toward Feed-forward network. Feed-forward network matters nearby, but this question is asking about Layers.
    - misconception: Not retrieval, memory, or cross-token attention.
    - represented term: feed-forward-network
    - source: explicit-confusable
    - rationale: Tempting because Feed-forward network is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q4-3-embedding: It is the temporary context-shaped hidden state.
    - feedback: This choice points toward Embedding. Embedding matters nearby, but this question is asking about Layers.
    - misconception: Often confused with a dictionary definition, a human memory, or a hidden state.
    - represented term: embedding
    - source: explicit-confusable
    - rationale: Tempting because Embedding is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.
  - v02711-layers-q4-4-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Layers.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Layers mechanism or distinction.

## Hidden States (4)

Stage: 3. Workday

Objective: Explain Hidden States as part of the day in the life of a prompt.

### Q1. v02711-hidden-states-q1

- Type: applied mechanism check
- Category: application
- Stem: Why is it called hidden state in Hidden States?
- Correct choice: v02711-hidden-states-q1-correct
- Choices:
  - v02711-hidden-states-q1-correct: It is internal numbers, not visible text (correct)
    - feedback: Insight unlocked. Hidden means inside the model's working representation, not secret memory.
  - v02711-hidden-states-q1-2-memory: It is encrypted English
    - feedback: Not quite. Hidden states are numerical activations, not a hidden English sentence.
    - misconception: It is encrypted English
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-hidden-states-q1-3-memory: It is a secret memory file
    - feedback: Not quite. Hidden states are temporary during the forward pass, not saved user memory.
    - misconception: It is a secret memory file
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-hidden-states-q1-4-training: It is the training data
    - feedback: Not quite. Training data shaped weights earlier; hidden states are created for the current context.
    - misconception: It is the training data
    - represented term: training
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-hidden-states-q2

- Type: mechanism
- Category: mechanism
- Stem: During Workday, what distinction should the learner keep clear about Hidden States?
- Correct choice: v02711-hidden-states-q2-correct
- Choices:
  - v02711-hidden-states-q2-correct: Hidden states are temporary activations. (correct)
    - feedback: Good distinction. Hidden states are temporary activations.
  - v02711-hidden-states-q2-2-tensor: It is a single word rather than an organized block of numbers.
    - feedback: This choice points toward Tensor. Tensor matters nearby, but this question is asking about Hidden States.
    - misconception: Not one word, one number, or a mysterious object by default.
    - represented term: tensor
    - source: explicit-confusable
    - rationale: Tempting because Tensor is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q2-3-attention: It means the model is paying human-like attention.
    - feedback: This choice points toward Attention. Attention matters nearby, but this question is asking about Hidden States.
    - misconception: Attention is not consciousness, awareness, desire, or human focus.
    - represented term: attention
    - source: explicit-confusable
    - rationale: Tempting because Attention is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q2-4-embedding-table: It is mainly about Embedding table, not the mechanism named in Hidden States.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Hidden States.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.

### Q3. v02711-hidden-states-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Hidden States help learners avoid?
- Correct choice: v02711-hidden-states-q3-correct
- Choices:
  - v02711-hidden-states-q3-correct: It corrects the misconception: Hidden states are secret memories, encrypted English, or stored thoughts. (correct)
    - feedback: Good distinction. Hidden States is clearer when that misconception is separated from the mechanism.
  - v02711-hidden-states-q3-2-attention: It means the model is paying human-like attention.
    - feedback: This choice points toward Attention. Attention matters nearby, but this question is asking about Hidden States.
    - misconception: Attention is not consciousness, awareness, desire, or human focus.
    - represented term: attention
    - source: explicit-confusable
    - rationale: Tempting because Attention is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q3-3-embedding-table: It is mainly about Embedding table, not the mechanism named in Hidden States.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Hidden States.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q3-4-token-id: It is the meaning of the word itself.
    - feedback: This choice points toward Token ID. Token ID matters nearby, but this question is asking about Hidden States.
    - misconception: The ID is not the meaning, not a memory, and not a truth score.
    - represented term: token-id
    - source: explicit-confusable
    - rationale: Tempting because Token ID is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.

### Q4. v02711-hidden-states-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Hidden States connect to the prompt's Journey?
- Correct choice: v02711-hidden-states-q4-correct
- Choices:
  - v02711-hidden-states-q4-correct: Embeddings start token vectors. (correct)
    - feedback: Good connection. Embeddings start token vectors.
  - v02711-hidden-states-q4-2-embedding-table: It is mainly about Embedding table, not the mechanism named in Hidden States.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Hidden States.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q4-3-token-id: It is the meaning of the word itself.
    - feedback: This choice points toward Token ID. Token ID matters nearby, but this question is asking about Hidden States.
    - misconception: The ID is not the meaning, not a memory, and not a truth score.
    - represented term: token-id
    - source: explicit-confusable
    - rationale: Tempting because Token ID is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.
  - v02711-hidden-states-q4-4-parameter: It is mainly about Parameter, not the mechanism named in Hidden States.
    - feedback: This choice points toward Parameter. Parameter matters nearby, but this question is asking about Hidden States.
    - misconception: Often used interchangeably with weights in casual explanations.
    - represented term: parameter
    - source: explicit-confusable
    - rationale: Tempting because Parameter is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hidden States mechanism or distinction.

## Logits (3)

Stage: 4. Decision Room

Objective: Explain Logits as part of the day in the life of a prompt.

### Q1. v02711-logits-q1

- Type: applied mechanism check
- Category: application
- Stem: What are logits?
- Correct choice: v02711-logits-q1-correct
- Choices:
  - v02711-logits-q1-correct: Raw scores before probabilities. (correct)
    - feedback: Insight strengthened. Logits are temporary raw scores for possible next tokens.
  - v02711-logits-q1-2-softmax: Probabilities that sum to one.
    - feedback: Not quite. Softmax comes next and turns logits into probabilities.
    - misconception: Probabilities that sum to one.
    - represented term: softmax
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-logits-q1-3-sampling: Permanent model memories.
    - feedback: Not quite. Logits are temporary scores during this forward pass, not stored memories.
    - misconception: Permanent model memories.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-logits-q1-4-next-token: The whole generated answer.
    - feedback: Not quite. Logits score candidate next tokens; they do not contain the full response.
    - misconception: The whole generated answer.
    - represented term: next-token
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-logits-q2

- Type: mechanism
- Category: mechanism
- Stem: During Decision Room, what distinction should the learner keep clear about Logits?
- Correct choice: v02711-logits-q2-correct
- Choices:
  - v02711-logits-q2-correct: Logits are temporary scores for this forward pass. (correct)
    - feedback: Good distinction. Logits are temporary scores for this forward pass.
  - v02711-logits-q2-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Logits.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.
  - v02711-logits-q2-3-activation: It is mainly about Activation, not the mechanism named in Logits.
    - feedback: This choice points toward Activation. Activation matters nearby, but this question is asking about Logits.
    - misconception: Not a learned weight, though weights help produce activations.
    - represented term: activation
    - source: explicit-confusable
    - rationale: Tempting because Activation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.
  - v02711-logits-q2-4-vector: It is a written sentence rather than a numerical representation.
    - feedback: This choice points toward Vector. Vector matters nearby, but this question is asking about Logits.
    - misconception: Not a paragraph, chat memory, or simple English definition.
    - represented term: vector
    - source: explicit-confusable
    - rationale: Tempting because Vector is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.

### Q3. v02711-logits-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Logits help learners avoid?
- Correct choice: v02711-logits-q3-correct
- Choices:
  - v02711-logits-q3-correct: It corrects the misconception: Logits are probabilities or truth scores. (correct)
    - feedback: Good distinction. Logits is clearer when that misconception is separated from the mechanism.
  - v02711-logits-q3-2-activation: It is mainly about Activation, not the mechanism named in Logits.
    - feedback: This choice points toward Activation. Activation matters nearby, but this question is asking about Logits.
    - misconception: Not a learned weight, though weights help produce activations.
    - represented term: activation
    - source: explicit-confusable
    - rationale: Tempting because Activation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.
  - v02711-logits-q3-3-vector: It is a written sentence rather than a numerical representation.
    - feedback: This choice points toward Vector. Vector matters nearby, but this question is asking about Logits.
    - misconception: Not a paragraph, chat memory, or simple English definition.
    - represented term: vector
    - source: explicit-confusable
    - rationale: Tempting because Vector is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.
  - v02711-logits-q3-4-tensor: It is a single word rather than an organized block of numbers.
    - feedback: This choice points toward Tensor. Tensor matters nearby, but this question is asking about Logits.
    - misconception: Not one word, one number, or a mysterious object by default.
    - represented term: tensor
    - source: explicit-confusable
    - rationale: Tempting because Tensor is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Logits mechanism or distinction.

## Softmax (3)

Stage: 4. Decision Room

Objective: Explain Softmax as part of the day in the life of a prompt.

### Q1. v02711-softmax-q1

- Type: applied mechanism check
- Category: application
- Stem: What does softmax do?
- Correct choice: v02711-softmax-q1-correct
- Choices:
  - v02711-softmax-q1-correct: Turns raw scores into probabilities. (correct)
    - feedback: Insight strengthened. Softmax turns raw scores into probabilities that can be sampled.
  - v02711-softmax-q1-2-probability: Checks whether an answer is true.
    - feedback: Not quite. Softmax normalizes scores into probabilities, but it does not verify truth.
    - misconception: Checks whether an answer is true.
    - represented term: probability
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-softmax-q1-3-training: Permanently updates weights.
    - feedback: Not quite. Softmax is temporary inference math, not training.
    - misconception: Permanently updates weights.
    - represented term: training
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-softmax-q1-4-sampling: Chooses the whole response at once.
    - feedback: Not quite. Softmax prepares probabilities for one next-token choice.
    - misconception: Chooses the whole response at once.
    - represented term: sampling
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-softmax-q2

- Type: mechanism
- Category: mechanism
- Stem: During Decision Room, what distinction should the learner keep clear about Softmax?
- Correct choice: v02711-softmax-q2-correct
- Choices:
  - v02711-softmax-q2-correct: Softmax creates temporary probabilities for the current next-token decision. (correct)
    - feedback: Good distinction. Softmax creates temporary probabilities for the current next-token decision.
  - v02711-softmax-q2-2-temperature: It is mainly about Temperature, not the mechanism named in Softmax.
    - feedback: This choice points toward Temperature. Temperature matters nearby, but this question is asking about Softmax.
    - misconception: Not creativity, truth, or intelligence by itself.
    - represented term: temperature
    - source: explicit-confusable
    - rationale: Tempting because Temperature is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.
  - v02711-softmax-q2-3-generated-token: It is mainly about Generated token, not the mechanism named in Softmax.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Softmax.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.
  - v02711-softmax-q2-4-autoregression: It denoises a whole image from noise.
    - feedback: This choice points toward Autoregression. Autoregression matters nearby, but this question is asking about Softmax.
    - misconception: Autoregression is being treated as the same idea as Softmax.
    - represented term: autoregression
    - source: explicit-confusable
    - rationale: Tempting because Autoregression is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.

### Q3. v02711-softmax-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Softmax help learners avoid?
- Correct choice: v02711-softmax-q3-correct
- Choices:
  - v02711-softmax-q3-correct: It corrects the misconception: Softmax guarantees truth or certainty. (correct)
    - feedback: Good distinction. Softmax is clearer when that misconception is separated from the mechanism.
  - v02711-softmax-q3-2-generated-token: It is mainly about Generated token, not the mechanism named in Softmax.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Softmax.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.
  - v02711-softmax-q3-3-autoregression: It denoises a whole image from noise.
    - feedback: This choice points toward Autoregression. Autoregression matters nearby, but this question is asking about Softmax.
    - misconception: Autoregression is being treated as the same idea as Softmax.
    - represented term: autoregression
    - source: explicit-confusable
    - rationale: Tempting because Autoregression is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.
  - v02711-softmax-q3-4-hallucination: It means the model intentionally lied.
    - feedback: This choice points toward Hallucination. Hallucination matters nearby, but this question is asking about Softmax.
    - misconception: Not lying; lying implies intent.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Tempting because Hallucination is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Softmax mechanism or distinction.

## Sampling (4)

Stage: 4. Decision Room

Objective: Explain Sampling as part of the day in the life of a prompt.

### Q1. v02711-sampling-q1

- Type: applied mechanism check
- Category: application
- Stem: When the model chooses one token, what happens next in Sampling?
- Correct choice: v02711-sampling-q1-correct
- Choices:
  - v02711-sampling-q1-correct: The token is appended to the response-so-far. (correct)
    - feedback: Insight strengthened. The selected response token becomes part of the context for the next forward pass.
  - v02711-sampling-q1-2-temperature: The model permanently learns it.
    - feedback: Not quite. Sampling is temporary inference behavior, not a durable weight update.
    - misconception: The model permanently learns it.
    - represented term: temperature
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-sampling-q1-3-probability: The whole response appears at once.
    - feedback: Not quite. Sampling chooses one token; autoregression repeats that process.
    - misconception: The whole response appears at once.
    - represented term: probability
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-sampling-q1-4-softmax: Softmax proves it is true.
    - feedback: Not quite. Probability is not truth. A likely token can still be unsupported.
    - misconception: Softmax proves it is true.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-sampling-q2

- Type: mechanism
- Category: mechanism
- Stem: During Decision Room, what distinction should the learner keep clear about Sampling?
- Correct choice: v02711-sampling-q2-correct
- Choices:
  - v02711-sampling-q2-correct: Sampling is a temporary choice during inference. (correct)
    - feedback: Good distinction. Sampling is a temporary choice during inference.
  - v02711-sampling-q2-2-hallucination: It means the model intentionally lied.
    - feedback: This choice points toward Hallucination. Hallucination matters nearby, but this question is asking about Sampling.
    - misconception: Not lying; lying implies intent.
    - represented term: hallucination
    - source: explicit-confusable
    - rationale: Tempting because Hallucination is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q2-3-logits: It is already a probability distribution that sums to one.
    - feedback: This choice points toward Logits. Logits matters nearby, but this question is asking about Sampling.
    - misconception: Not probabilities, truth scores, permanent memories, or the sampled token.
    - represented term: logits
    - source: explicit-confusable
    - rationale: Tempting because Logits is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q2-4-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Sampling.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.

### Q3. v02711-sampling-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Sampling help learners avoid?
- Correct choice: v02711-sampling-q3-correct
- Choices:
  - v02711-sampling-q3-correct: It corrects the misconception: Sampling writes the whole response or permanently teaches the model. (correct)
    - feedback: Good distinction. Sampling is clearer when that misconception is separated from the mechanism.
  - v02711-sampling-q3-2-logits: It is already a probability distribution that sums to one.
    - feedback: This choice points toward Logits. Logits matters nearby, but this question is asking about Sampling.
    - misconception: Not probabilities, truth scores, permanent memories, or the sampled token.
    - represented term: logits
    - source: explicit-confusable
    - rationale: Tempting because Logits is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q3-3-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Sampling.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q3-4-hidden-state: It is the token’s fixed starting vector before context matters.
    - feedback: This choice points toward Hidden state. Hidden state matters nearby, but this question is asking about Sampling.
    - misconception: Often confused with embeddings, weights, saved memory, or visible response text.
    - represented term: hidden state
    - source: same-stage
    - rationale: Tempting because Hidden state is same-stage for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.

### Q4. v02711-sampling-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Sampling connect to the prompt's Journey?
- Correct choice: v02711-sampling-q4-correct
- Choices:
  - v02711-sampling-q4-correct: Softmax provides probabilities. (correct)
    - feedback: Good connection. Softmax provides probabilities.
  - v02711-sampling-q4-2-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Sampling.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q4-3-hidden-state: It is the token’s fixed starting vector before context matters.
    - feedback: This choice points toward Hidden state. Hidden state matters nearby, but this question is asking about Sampling.
    - misconception: Often confused with embeddings, weights, saved memory, or visible response text.
    - represented term: hidden state
    - source: same-stage
    - rationale: Tempting because Hidden state is same-stage for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.
  - v02711-sampling-q4-4-relevance-weight: It is awareness rather than a numerical relevance weight.
    - feedback: This choice points toward Relevance weight. Relevance weight matters nearby, but this question is asking about Sampling.
    - misconception: Not truth, confidence, or human attention.
    - represented term: relevance-weight
    - source: nearby-stage
    - rationale: Tempting because Relevance weight is nearby-stage for this part of the Journey. It is not correct because the question asks for the specific Sampling mechanism or distinction.

## Autoregression (3)

Stage: 5. The Day Repeats

Objective: Explain Autoregression as part of the day in the life of a prompt.

### Q1. v02711-autoregression-q1

- Type: applied mechanism check
- Category: application
- Stem: What happens after a token is generated in Autoregression?
- Correct choice: v02711-autoregression-q1-correct
- Choices:
  - v02711-autoregression-q1-correct: It is appended to the context and the model can run again. (correct)
    - feedback: Insight strengthened. Autoregression means the response grows by choose, append, and repeat.
  - v02711-autoregression-q1-2-diffusion: The model permanently learns it.
    - feedback: Not quite. Autoregression updates temporary context, not durable weights.
    - misconception: The model permanently learns it.
    - represented term: diffusion
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-autoregression-q1-3-generated-token: The whole answer appears at once.
    - feedback: Not quite. The response grows one token at a time.
    - misconception: The whole answer appears at once.
    - represented term: generated-token
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-autoregression-q1-4-training: The token becomes a training example.
    - feedback: Not quite. Ordinary generation is inference, not training.
    - misconception: The token becomes a training example.
    - represented term: training
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-autoregression-q2

- Type: mechanism
- Category: mechanism
- Stem: During The Day Repeats, what distinction should the learner keep clear about Autoregression?
- Correct choice: v02711-autoregression-q2-correct
- Choices:
  - v02711-autoregression-q2-correct: Autoregression updates the temporary context, not the model weights. (correct)
    - feedback: Good distinction. Autoregression updates the temporary context, not the model weights.
  - v02711-autoregression-q2-2-context-window: It is permanent model memory.
    - feedback: This choice points toward Context window. Context window matters nearby, but this question is asking about Autoregression.
    - misconception: Not permanent memory; it is temporary working context.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Tempting because Context window is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.
  - v02711-autoregression-q2-3-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about Autoregression.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.
  - v02711-autoregression-q2-4-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Autoregression.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.

### Q3. v02711-autoregression-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Autoregression help learners avoid?
- Correct choice: v02711-autoregression-q3-correct
- Choices:
  - v02711-autoregression-q3-correct: It corrects the misconception: The model writes the whole response at once. (correct)
    - feedback: Good distinction. Autoregression is clearer when that misconception is separated from the mechanism.
  - v02711-autoregression-q3-2-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about Autoregression.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.
  - v02711-autoregression-q3-3-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Autoregression.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.
  - v02711-autoregression-q3-4-system-prompt: It is mainly about System prompt, not the mechanism named in Autoregression.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about Autoregression.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Autoregression mechanism or distinction.

## Context Window (4)

Stage: 5. The Day Repeats

Objective: Explain Context Window as part of the day in the life of a prompt.

### Q1. v02711-context-window-q1

- Type: applied mechanism check
- Category: application
- Stem: What happens to information outside the context window?
- Correct choice: v02711-context-window-q1-correct
- Choices:
  - v02711-context-window-q1-correct: The model cannot directly use it in the current run. (correct)
    - feedback: Insight strengthened. The model can only use what remains visible in the current context.
  - v02711-context-window-q1-2-memory: It becomes permanent memory.
    - feedback: Not quite. Context can feel like memory, but it is temporary input unless a separate system saves it.
    - misconception: It becomes permanent memory.
    - represented term: memory
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-context-window-q1-3-training: It updates the weights.
    - feedback: Not quite. Ordinary context does not train or rewrite weights.
    - misconception: It updates the weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-context-window-q1-4-rag: It is always retrieved automatically.
    - feedback: Not quite. Retrieval is a separate system step, not a guarantee.
    - misconception: It is always retrieved automatically.
    - represented term: rag
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-context-window-q2

- Type: mechanism
- Category: mechanism
- Stem: During The Day Repeats, what distinction should the learner keep clear about Context Window?
- Correct choice: v02711-context-window-q2-correct
- Choices:
  - v02711-context-window-q2-correct: The context window is temporary. (correct)
    - feedback: Good distinction. The context window is temporary.
  - v02711-context-window-q2-2-system-prompt: It is mainly about System prompt, not the mechanism named in Context Window.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about Context Window.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q2-3-forward-pass: It is mainly about Forward pass, not the mechanism named in Context Window.
    - feedback: This choice points toward Forward pass. Forward pass matters nearby, but this question is asking about Context Window.
    - misconception: Not backpropagation or a training update.
    - represented term: forward-pass
    - source: explicit-confusable
    - rationale: Tempting because Forward pass is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q2-4-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Context Window.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.

### Q3. v02711-context-window-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Context Window help learners avoid?
- Correct choice: v02711-context-window-q3-correct
- Choices:
  - v02711-context-window-q3-correct: It corrects the misconception: The context window is permanent memory. (correct)
    - feedback: Good distinction. Context Window is clearer when that misconception is separated from the mechanism.
  - v02711-context-window-q3-2-forward-pass: It is mainly about Forward pass, not the mechanism named in Context Window.
    - feedback: This choice points toward Forward pass. Forward pass matters nearby, but this question is asking about Context Window.
    - misconception: Not backpropagation or a training update.
    - represented term: forward-pass
    - source: explicit-confusable
    - rationale: Tempting because Forward pass is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q3-3-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Context Window.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q3-4-generated-token: It is mainly about Generated token, not the mechanism named in Context Window.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Context Window.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.

### Q4. v02711-context-window-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Context Window connect to the prompt's Journey?
- Correct choice: v02711-context-window-q4-correct
- Choices:
  - v02711-context-window-q4-correct: Autoregression makes response-so-far grow. (correct)
    - feedback: Good connection. Autoregression makes response-so-far grow.
  - v02711-context-window-q4-2-response: It is the complete input given to the model before generation.
    - feedback: This choice points toward Response. Response matters nearby, but this question is asking about Context Window.
    - misconception: Not all at once; response tokens are appended step by step.
    - represented term: response
    - source: explicit-confusable
    - rationale: Tempting because Response is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q4-3-generated-token: It is mainly about Generated token, not the mechanism named in Context Window.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Context Window.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.
  - v02711-context-window-q4-4-training: It permanently updates model weights during this ordinary response.
    - feedback: This choice points toward Training. Training matters nearby, but this question is asking about Context Window.
    - misconception: Ordinary chat inference is not training unless a separate training process updates weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Tempting because Training is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Context Window mechanism or distinction.

## RAG and Retrieval (4)

Stage: 5. The Day Repeats

Objective: Explain RAG and Retrieval as part of the day in the life of a prompt.

### Q1. v02711-rag-retrieval-q1

- Type: applied mechanism check
- Category: application
- Stem: What does RAG usually do in RAG and Retrieval?
- Correct choice: v02711-rag-retrieval-q1-correct
- Choices:
  - v02711-rag-retrieval-q1-correct: Retrieves outside information and places it into the current context (correct)
    - feedback: Insight strengthened. RAG adds temporary evidence to context; it does not rewrite model weights.
  - v02711-rag-retrieval-q1-2-training: Permanently updates model weights
    - feedback: Not quite. RAG is retrieval plus context. It is not training, permanent memory, consciousness, or a truth guarantee.
    - misconception: Permanently updates model weights
    - represented term: training
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-rag-retrieval-q1-3-probability: Guarantees every answer is true
    - feedback: Not quite. RAG can improve grounding, but retrieved context can still be incomplete, stale, or misused.
    - misconception: Guarantees every answer is true
    - represented term: probability
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-rag-retrieval-q1-4-rag: Makes the model aware of documents
    - feedback: Not quite. Retrieved documents become temporary context tokens, not consciousness.
    - misconception: Makes the model aware of documents
    - represented term: rag
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-rag-retrieval-q2

- Type: mechanism
- Category: mechanism
- Stem: During The Day Repeats, what distinction should the learner keep clear about RAG and Retrieval?
- Correct choice: v02711-rag-retrieval-q2-correct
- Choices:
  - v02711-rag-retrieval-q2-correct: RAG usually does not change model weights. (correct)
    - feedback: Good distinction. RAG usually does not change model weights.
  - v02711-rag-retrieval-q2-2-citation: It automatically proves the cited claim.
    - feedback: This choice points toward Citation. Citation matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not proof by itself and not the same as training data.
    - represented term: citation
    - source: explicit-confusable
    - rationale: Tempting because Citation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q2-3-training-data: It is mainly about Training data, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q2-4-system-prompt: It is mainly about System prompt, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.

### Q3. v02711-rag-retrieval-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does RAG and Retrieval help learners avoid?
- Correct choice: v02711-rag-retrieval-q3-correct
- Choices:
  - v02711-rag-retrieval-q3-correct: It corrects the misconception: RAG is training, permanent memory, guaranteed truth, or consciousness. (correct)
    - feedback: Good distinction. RAG and Retrieval is clearer when that misconception is separated from the mechanism.
  - v02711-rag-retrieval-q3-2-training-data: It is mainly about Training data, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q3-3-system-prompt: It is mainly about System prompt, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q3-4-response-so-far: It is mainly about Response-so-far, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward Response-so-far. Response-so-far matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not the whole final answer, permanent memory, or training data.
    - represented term: response-so-far
    - source: explicit-confusable
    - rationale: Tempting because Response-so-far is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.

### Q4. v02711-rag-retrieval-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does RAG and Retrieval connect to the prompt's Journey?
- Correct choice: v02711-rag-retrieval-q4-correct
- Choices:
  - v02711-rag-retrieval-q4-correct: RAG depends on the context window. (correct)
    - feedback: Good connection. RAG depends on the context window.
  - v02711-rag-retrieval-q4-2-system-prompt: It is mainly about System prompt, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward System prompt. System prompt matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not fine-tuning, training, permanent memory, or conscience.
    - represented term: system-prompt
    - source: explicit-confusable
    - rationale: Tempting because System prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q4-3-response-so-far: It is mainly about Response-so-far, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward Response-so-far. Response-so-far matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not the whole final answer, permanent memory, or training data.
    - represented term: response-so-far
    - source: explicit-confusable
    - rationale: Tempting because Response-so-far is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.
  - v02711-rag-retrieval-q4-4-forward-pass: It is mainly about Forward pass, not the mechanism named in RAG and Retrieval.
    - feedback: This choice points toward Forward pass. Forward pass matters nearby, but this question is asking about RAG and Retrieval.
    - misconception: Not backpropagation or a training update.
    - represented term: forward-pass
    - source: explicit-confusable
    - rationale: Tempting because Forward pass is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific RAG and Retrieval mechanism or distinction.

## Grounding (4)

Stage: 5. The Day Repeats

Objective: Explain Grounding as part of the day in the life of a prompt.

### Q1. v02711-grounding-q1

- Type: applied mechanism check
- Category: application
- Stem: What does grounding try to do?
- Correct choice: v02711-grounding-q1-correct
- Choices:
  - v02711-grounding-q1-correct: Connect an answer to available evidence (correct)
    - feedback: Insight strengthened. Grounding ties claims to evidence, but the evidence still needs review.
  - v02711-grounding-q1-2-probability: Make every answer true
    - feedback: Not quite. Grounding can reduce unsupported answers, but it is not a guarantee.
    - misconception: Make every answer true
    - represented term: probability
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-grounding-q1-3-training: Permanently train the model
    - feedback: Not quite. Grounding usually supplies temporary evidence in context.
    - misconception: Permanently train the model
    - represented term: training
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-grounding-q1-4-llm: Make the model conscious
    - feedback: Not quite. Grounding is a system design pattern, not awareness.
    - misconception: Make the model conscious
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-grounding-q2

- Type: mechanism
- Category: mechanism
- Stem: During The Day Repeats, what distinction should the learner keep clear about Grounding?
- Correct choice: v02711-grounding-q2-correct
- Choices:
  - v02711-grounding-q2-correct: Grounding usually supplies temporary evidence in the current context. (correct)
    - feedback: Good distinction. Grounding usually supplies temporary evidence in the current context.
  - v02711-grounding-q2-2-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about Grounding.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q2-3-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Grounding.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q2-4-training-data: It is mainly about Training data, not the mechanism named in Grounding.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Grounding.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.

### Q3. v02711-grounding-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Grounding help learners avoid?
- Correct choice: v02711-grounding-q3-correct
- Choices:
  - v02711-grounding-q3-correct: It corrects the misconception: A citation-looking answer is automatically grounded. (correct)
    - feedback: Good distinction. Grounding is clearer when that misconception is separated from the mechanism.
  - v02711-grounding-q3-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Grounding.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q3-3-training-data: It is mainly about Training data, not the mechanism named in Grounding.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Grounding.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q3-4-prompt-tokens: It is a response token the model generated during this answer.
    - feedback: This choice points toward Prompt token. Prompt token matters nearby, but this question is asking about Grounding.
    - misconception: Not generated by the model during this response step.
    - represented term: prompt-tokens
    - source: explicit-confusable
    - rationale: Tempting because Prompt token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.

### Q4. v02711-grounding-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Grounding connect to the prompt's Journey?
- Correct choice: v02711-grounding-q4-correct
- Choices:
  - v02711-grounding-q4-correct: RAG can place evidence into context; grounding asks whether the generated answer actually stays connected to that evidence. (correct)
    - feedback: Good connection. RAG can place evidence into context; grounding asks whether the generated answer actually stays connected to that evidence.
  - v02711-grounding-q4-2-training-data: It is mainly about Training data, not the mechanism named in Grounding.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Grounding.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q4-3-prompt-tokens: It is a response token the model generated during this answer.
    - feedback: This choice points toward Prompt token. Prompt token matters nearby, but this question is asking about Grounding.
    - misconception: Not generated by the model during this response step.
    - represented term: prompt-tokens
    - source: explicit-confusable
    - rationale: Tempting because Prompt token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.
  - v02711-grounding-q4-4-response-tokens: It is input text that existed before generation began.
    - feedback: This choice points toward Response token. Response token matters nearby, but this question is asking about Grounding.
    - misconception: Not a durable weight update or saved memory.
    - represented term: response-tokens
    - source: explicit-confusable
    - rationale: Tempting because Response token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Grounding mechanism or distinction.

## Hallucinations (4)

Stage: 5. The Day Repeats

Objective: Explain Hallucinations as part of the day in the life of a prompt.

### Q1. v02711-hallucinations-q1

- Type: applied mechanism check
- Category: application
- Stem: Why can hallucinations happen?
- Correct choice: v02711-hallucinations-q1-correct
- Choices:
  - v02711-hallucinations-q1-correct: The model can generate plausible text without enough grounding (correct)
    - feedback: Insight strengthened. A fluent claim can still need grounding or review.
  - v02711-hallucinations-q1-2-grounding: The model is always trying to deceive
    - feedback: Not quite. Lying implies intent; the model is generating likely text.
    - misconception: The model is always trying to deceive
    - represented term: grounding
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-hallucinations-q1-3-softmax: Softmax guarantees truth
    - feedback: Not quite. Softmax turns scores into probabilities, not truth.
    - misconception: Softmax guarantees truth
    - represented term: softmax
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-hallucinations-q1-4-human-review: RAG permanently teaches the model
    - feedback: Not quite. RAG usually changes temporary context, not weights.
    - misconception: RAG permanently teaches the model
    - represented term: human-review
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-hallucinations-q2

- Type: mechanism
- Category: mechanism
- Stem: During The Day Repeats, what distinction should the learner keep clear about Hallucinations?
- Correct choice: v02711-hallucinations-q2-correct
- Choices:
  - v02711-hallucinations-q2-correct: A hallucination is an output event during inference. (correct)
    - feedback: Good distinction. A hallucination is an output event during inference.
  - v02711-hallucinations-q2-2-fine-tuning: It is the same as adding outside text into the current prompt.
    - feedback: This choice points toward Fine-tuning. Fine-tuning matters nearby, but this question is asking about Hallucinations.
    - misconception: Different from prompting; prompting changes temporary context, not durable weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Tempting because Fine-tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q2-3-training: It permanently updates model weights during this ordinary response.
    - feedback: This choice points toward Training. Training matters nearby, but this question is asking about Hallucinations.
    - misconception: Ordinary chat inference is not training unless a separate training process updates weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Tempting because Training is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q2-4-input-context: It is mainly about Input context, not the mechanism named in Hallucinations.
    - feedback: This choice points toward Input context. Input context matters nearby, but this question is asking about Hallucinations.
    - misconception: Not the training dataset or durable model weights.
    - represented term: input-context
    - source: explicit-confusable
    - rationale: Tempting because Input context is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.

### Q3. v02711-hallucinations-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Hallucinations help learners avoid?
- Correct choice: v02711-hallucinations-q3-correct
- Choices:
  - v02711-hallucinations-q3-correct: It corrects the misconception: A hallucination means the model is lying or malicious. (correct)
    - feedback: Good distinction. Hallucinations is clearer when that misconception is separated from the mechanism.
  - v02711-hallucinations-q3-2-training: It permanently updates model weights during this ordinary response.
    - feedback: This choice points toward Training. Training matters nearby, but this question is asking about Hallucinations.
    - misconception: Ordinary chat inference is not training unless a separate training process updates weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Tempting because Training is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q3-3-input-context: It is mainly about Input context, not the mechanism named in Hallucinations.
    - feedback: This choice points toward Input context. Input context matters nearby, but this question is asking about Hallucinations.
    - misconception: Not the training dataset or durable model weights.
    - represented term: input-context
    - source: explicit-confusable
    - rationale: Tempting because Input context is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q3-4-context-window: It is permanent model memory.
    - feedback: This choice points toward Context window. Context window matters nearby, but this question is asking about Hallucinations.
    - misconception: Not permanent memory; it is temporary working context.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Tempting because Context window is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.

### Q4. v02711-hallucinations-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Hallucinations connect to the prompt's Journey?
- Correct choice: v02711-hallucinations-q4-correct
- Choices:
  - v02711-hallucinations-q4-correct: Grounding tries to reduce unsupported answers. (correct)
    - feedback: Good connection. Grounding tries to reduce unsupported answers.
  - v02711-hallucinations-q4-2-input-context: It is mainly about Input context, not the mechanism named in Hallucinations.
    - feedback: This choice points toward Input context. Input context matters nearby, but this question is asking about Hallucinations.
    - misconception: Not the training dataset or durable model weights.
    - represented term: input-context
    - source: explicit-confusable
    - rationale: Tempting because Input context is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q4-3-context-window: It is permanent model memory.
    - feedback: This choice points toward Context window. Context window matters nearby, but this question is asking about Hallucinations.
    - misconception: Not permanent memory; it is temporary working context.
    - represented term: context window
    - source: explicit-confusable
    - rationale: Tempting because Context window is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.
  - v02711-hallucinations-q4-4-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about Hallucinations.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Hallucinations mechanism or distinction.

## How AI Learns (5)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain How AI Learns as part of the day in the life of a prompt.

### Q1. v02711-how-ai-learns-q1

- Type: applied mechanism check
- Category: application
- Stem: Which How AI Learns action usually changes model weights?
- Correct choice: v02711-how-ai-learns-q1-correct
- Choices:
  - v02711-how-ai-learns-q1-correct: Fine-tuning on examples. (correct)
    - feedback: Insight strengthened. Fine-tuning is a training process that can durably adjust weights or adapter weights.
  - v02711-how-ai-learns-q1-2-fine-tuning: Adding a prompt instruction.
    - feedback: Not quite. Prompting steers the current context; it does not normally update weights.
    - misconception: Adding a prompt instruction.
    - represented term: fine-tuning
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-how-ai-learns-q1-3-rag: Retrieving a document into context.
    - feedback: Not quite. Retrieval adds temporary context, not durable model memory.
    - misconception: Retrieving a document into context.
    - represented term: rag
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-how-ai-learns-q1-4-token: Choosing a sampled token.
    - feedback: Not quite. Sampling chooses a response token during inference.
    - misconception: Choosing a sampled token.
    - represented term: token
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-how-ai-learns-q2

- Type: mechanism
- Category: mechanism
- Stem: During Twilight: The Wider Landscape, what distinction should the learner keep clear about How AI Learns?
- Correct choice: v02711-how-ai-learns-q2-correct
- Choices:
  - v02711-how-ai-learns-q2-correct: Training, fine-tuning, and adapter training are durable. (correct)
    - feedback: Good distinction. Training, fine-tuning, and adapter training are durable.
  - v02711-how-ai-learns-q2-2-training-data: It is mainly about Training data, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q2-3-next-token: It is mainly about Next token, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Next token. Next token matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the whole answer, a permanent memory, or a guarantee of truth.
    - represented term: next-token
    - source: explicit-confusable
    - rationale: Tempting because Next token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q2-4-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.

### Q3. v02711-how-ai-learns-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does How AI Learns help learners avoid?
- Correct choice: v02711-how-ai-learns-q3-correct
- Choices:
  - v02711-how-ai-learns-q3-correct: It corrects the misconception: Any useful response means the model permanently learned something. (correct)
    - feedback: Good distinction. How AI Learns is clearer when that misconception is separated from the mechanism.
  - v02711-how-ai-learns-q3-2-next-token: It is mainly about Next token, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Next token. Next token matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the whole answer, a permanent memory, or a guarantee of truth.
    - represented term: next-token
    - source: explicit-confusable
    - rationale: Tempting because Next token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q3-3-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q3-4-alignment: It is mainly about Alignment, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Alignment. Alignment matters nearby, but this question is asking about How AI Learns.
    - misconception: Aligned behavior does not guarantee truth or mean the model understands morality.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because Alignment is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.

### Q4. v02711-how-ai-learns-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does How AI Learns connect to the prompt's Journey?
- Correct choice: v02711-how-ai-learns-q4-correct
- Choices:
  - v02711-how-ai-learns-q4-correct: Earlier cards taught training, fine-tuning, inference, RAG, and context. (correct)
    - feedback: Good connection. Earlier cards taught training, fine-tuning, inference, RAG, and context.
  - v02711-how-ai-learns-q4-2-prompt: It is text generated by the model after the answer begins.
    - feedback: This choice points toward Prompt. Prompt matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as the generated response or durable model memory.
    - represented term: prompt
    - source: explicit-confusable
    - rationale: Tempting because Prompt is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q4-3-alignment: It is mainly about Alignment, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Alignment. Alignment matters nearby, but this question is asking about How AI Learns.
    - misconception: Aligned behavior does not guarantee truth or mean the model understands morality.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because Alignment is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q4-4-instruction-tuning: It is mainly about Instruction tuning, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Instruction tuning. Instruction tuning matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as one instruction inside a prompt.
    - represented term: instruction-tuning
    - source: explicit-confusable
    - rationale: Tempting because Instruction tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.

### Q5. v02711-how-ai-learns-q5

- Type: applied scenario
- Category: application
- Stem: A learner uses How AI Learns to explain an AI answer. What should they say?
- Correct choice: v02711-how-ai-learns-q5-correct
- Choices:
  - v02711-how-ai-learns-q5-correct: People often say a model "learned" something when it may only be using temporary context. (correct)
    - feedback: Good model-literacy move. People often say a model "learned" something when it may only be using temporary context.
  - v02711-how-ai-learns-q5-2-alignment: It is mainly about Alignment, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Alignment. Alignment matters nearby, but this question is asking about How AI Learns.
    - misconception: Aligned behavior does not guarantee truth or mean the model understands morality.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because Alignment is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q5-3-instruction-tuning: It is mainly about Instruction tuning, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Instruction tuning. Instruction tuning matters nearby, but this question is asking about How AI Learns.
    - misconception: Not the same as one instruction inside a prompt.
    - represented term: instruction-tuning
    - source: explicit-confusable
    - rationale: Tempting because Instruction tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.
  - v02711-how-ai-learns-q5-4-parameter: It is mainly about Parameter, not the mechanism named in How AI Learns.
    - feedback: This choice points toward Parameter. Parameter matters nearby, but this question is asking about How AI Learns.
    - misconception: Often used interchangeably with weights in casual explanations.
    - represented term: parameter
    - source: explicit-confusable
    - rationale: Tempting because Parameter is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific How AI Learns mechanism or distinction.

## Diffusion vs Autoregression (3)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain Diffusion vs Autoregression as part of the day in the life of a prompt.

### Q1. v02711-diffusion-q1

- Type: applied mechanism check
- Category: application
- Stem: A learner is placing Diffusion vs Autoregression in the prompt's journey. Which choice keeps the mechanism clear?
- Correct choice: v02711-diffusion-q1-correct
- Choices:
  - v02711-diffusion-q1-correct: LLMs often generate text one token at a time; diffusion models often refine from noise. (correct)
    - feedback: Insight strengthened. Autoregression adds tokens; diffusion refines from noise.
  - v02711-diffusion-q1-2-token: All generative AI uses token-by-token prediction.
    - feedback: Not quite. Diffusion-style generation often refines a noisy representation instead.
    - misconception: All generative AI uses token-by-token prediction.
    - represented term: token
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-diffusion-q1-3-diffusion: Diffusion models are just larger LLMs.
    - feedback: Not quite. They are neighboring generative AI families with different generation patterns.
    - misconception: Diffusion models are just larger LLMs.
    - represented term: diffusion
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-diffusion-q1-4-softmax: Softmax proves image outputs are true.
    - feedback: Not quite. Decoding mechanics do not guarantee truth.
    - misconception: Softmax proves image outputs are true.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-diffusion-q2

- Type: mechanism
- Category: mechanism
- Stem: During Twilight: The Wider Landscape, what distinction should the learner keep clear about Diffusion vs Autoregression?
- Correct choice: v02711-diffusion-q2-correct
- Choices:
  - v02711-diffusion-q2-correct: Both are generation-time processes. (correct)
    - feedback: Good distinction. Both are generation-time processes.
  - v02711-diffusion-q2-2-completion: It is mainly about Completion, not the mechanism named in Diffusion vs Autoregression.
    - feedback: This choice points toward Completion. Completion matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not a training update.
    - represented term: completion
    - source: explicit-confusable
    - rationale: Tempting because Completion is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.
  - v02711-diffusion-q2-3-generated-token: It is mainly about Generated token, not the mechanism named in Diffusion vs Autoregression.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.
  - v02711-diffusion-q2-4-response-tokens: It is input text that existed before generation began.
    - feedback: This choice points toward Response token. Response token matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not a durable weight update or saved memory.
    - represented term: response-tokens
    - source: explicit-confusable
    - rationale: Tempting because Response token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.

### Q3. v02711-diffusion-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Diffusion vs Autoregression help learners avoid?
- Correct choice: v02711-diffusion-q3-correct
- Choices:
  - v02711-diffusion-q3-correct: It corrects the misconception: All generative AI works like ChatGPT. (correct)
    - feedback: Good distinction. Diffusion vs Autoregression is clearer when that misconception is separated from the mechanism.
  - v02711-diffusion-q3-2-generated-token: It is mainly about Generated token, not the mechanism named in Diffusion vs Autoregression.
    - feedback: This choice points toward Generated token. Generated token matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not a permanent memory or training example by itself.
    - represented term: generated-token
    - source: explicit-confusable
    - rationale: Tempting because Generated token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.
  - v02711-diffusion-q3-3-response-tokens: It is input text that existed before generation began.
    - feedback: This choice points toward Response token. Response token matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not a durable weight update or saved memory.
    - represented term: response-tokens
    - source: explicit-confusable
    - rationale: Tempting because Response token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.
  - v02711-diffusion-q3-4-softmax: It proves the answer is true.
    - feedback: This choice points toward Softmax. Softmax matters nearby, but this question is asking about Diffusion vs Autoregression.
    - misconception: Not truth-checking, certainty, training, or choosing the whole response.
    - represented term: softmax
    - source: explicit-confusable
    - rationale: Tempting because Softmax is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Diffusion vs Autoregression mechanism or distinction.

## Multimodal AI (3)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain Multimodal AI as part of the day in the life of a prompt.

### Q1. v02711-multimodal-q1

- Type: applied mechanism check
- Category: application
- Stem: What does multimodal mean in Multimodal AI?
- Correct choice: v02711-multimodal-q1-correct
- Choices:
  - v02711-multimodal-q1-correct: The system can work with more than one media type. (correct)
    - feedback: Insight strengthened. Multimodal systems connect more than one media type through learned representations or linked components.
  - v02711-multimodal-q1-2-diffusion: The model has feelings.
    - feedback: Not quite. Multimodal systems process media representations; they do not gain feelings.
    - misconception: The model has feelings.
    - represented term: diffusion
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-multimodal-q1-3-context-window: The context window is larger.
    - feedback: Not quite. Multimodal means media types, not window size.
    - misconception: The context window is larger.
    - represented term: context window
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-multimodal-q1-4-memory: The model permanently remembers images.
    - feedback: Not quite. A specific image prompt is usually temporary input context.
    - misconception: The model permanently remembers images.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-multimodal-q2

- Type: mechanism
- Category: mechanism
- Stem: During Twilight: The Wider Landscape, what distinction should the learner keep clear about Multimodal AI?
- Correct choice: v02711-multimodal-q2-correct
- Choices:
  - v02711-multimodal-q2-correct: The ability comes from training and architecture. (correct)
    - feedback: Good distinction. The ability comes from training and architecture.
  - v02711-multimodal-q2-2-hidden-state: It is the token’s fixed starting vector before context matters.
    - feedback: This choice points toward Hidden state. Hidden state matters nearby, but this question is asking about Multimodal AI.
    - misconception: Often confused with embeddings, weights, saved memory, or visible response text.
    - represented term: hidden state
    - source: explicit-confusable
    - rationale: Tempting because Hidden state is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.
  - v02711-multimodal-q2-3-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Multimodal AI.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.
  - v02711-multimodal-q2-4-embedding-table: It is mainly about Embedding table, not the mechanism named in Multimodal AI.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Multimodal AI.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.

### Q3. v02711-multimodal-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Multimodal AI help learners avoid?
- Correct choice: v02711-multimodal-q3-correct
- Choices:
  - v02711-multimodal-q3-correct: It corrects the misconception: Multimodal AI has human-like perception or feelings. (correct)
    - feedback: Good distinction. Multimodal AI is clearer when that misconception is separated from the mechanism.
  - v02711-multimodal-q3-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Multimodal AI.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.
  - v02711-multimodal-q3-3-embedding-table: It is mainly about Embedding table, not the mechanism named in Multimodal AI.
    - feedback: This choice points toward Embedding table. Embedding table matters nearby, but this question is asking about Multimodal AI.
    - misconception: Not the tokenizer and not temporary context.
    - represented term: embedding-table
    - source: explicit-confusable
    - rationale: Tempting because Embedding table is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.
  - v02711-multimodal-q3-4-token-id: It is the meaning of the word itself.
    - feedback: This choice points toward Token ID. Token ID matters nearby, but this question is asking about Multimodal AI.
    - misconception: The ID is not the meaning, not a memory, and not a truth score.
    - represented term: token-id
    - source: explicit-confusable
    - rationale: Tempting because Token ID is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Multimodal AI mechanism or distinction.

## The Perfect Storm (4)

Stage: 6. Twilight: The Wider Landscape

Objective: Explain The Perfect Storm as part of the day in the life of a prompt.

### Q1. v02711-perfect-storm-q1

- Type: applied mechanism check
- Category: application
- Stem: Which data-compute-methods explanation best explains why modern LLM capability arrived now?
- Correct choice: v02711-perfect-storm-q1-correct
- Choices:
  - v02711-perfect-storm-q1-correct: Data, compute, methods, labor, and incentives converged (correct)
    - feedback: Insight unlocked: LLMs came from a convergence, not a single magic moment.
  - v02711-perfect-storm-q1-2-compute: One magic breakthrough happened
    - feedback: Not quite. The transformer mattered, but the larger storm included data, compute, methods, labor, and incentives.
    - misconception: One magic breakthrough happened
    - represented term: compute
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-perfect-storm-q1-3-llm: Softmax became conscious
    - feedback: Not quite. LLMs are trained systems, not conscious softmax machines.
    - misconception: Softmax became conscious
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-perfect-storm-q1-4-training: Prompts started training themselves
    - feedback: Not quite. Prompting shapes current context; it does not explain why LLMs became possible.
    - misconception: Prompts started training themselves
    - represented term: training
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-perfect-storm-q2

- Type: mechanism
- Category: mechanism
- Stem: During Twilight: The Wider Landscape, what distinction should the learner keep clear about The Perfect Storm?
- Correct choice: v02711-perfect-storm-q2-correct
- Choices:
  - v02711-perfect-storm-q2-correct: The storm made durable training possible. (correct)
    - feedback: Good distinction. The storm made durable training possible.
  - v02711-perfect-storm-q2-2-validation-data: It is mainly about Validation data, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Validation data. Validation data matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not training data if it is kept out of weight updates.
    - represented term: validation-data
    - source: explicit-confusable
    - rationale: Tempting because Validation data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q2-3-energy-use: It is mainly about Energy use, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Energy use. Energy use matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not identical for every model or every response.
    - represented term: energy-use
    - source: explicit-confusable
    - rationale: Tempting because Energy use is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q2-4-efficient-inference: It is mainly about Efficient inference, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Efficient inference. Efficient inference matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not automatically worse or automatically safe.
    - represented term: efficient-inference
    - source: explicit-confusable
    - rationale: Tempting because Efficient inference is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.

### Q3. v02711-perfect-storm-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does The Perfect Storm help learners avoid?
- Correct choice: v02711-perfect-storm-q3-correct
- Choices:
  - v02711-perfect-storm-q3-correct: It corrects the misconception: LLMs appeared because of one magic breakthrough. (correct)
    - feedback: Good distinction. The Perfect Storm is clearer when that misconception is separated from the mechanism.
  - v02711-perfect-storm-q3-2-energy-use: It is mainly about Energy use, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Energy use. Energy use matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not identical for every model or every response.
    - represented term: energy-use
    - source: explicit-confusable
    - rationale: Tempting because Energy use is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q3-3-efficient-inference: It is mainly about Efficient inference, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Efficient inference. Efficient inference matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not automatically worse or automatically safe.
    - represented term: efficient-inference
    - source: explicit-confusable
    - rationale: Tempting because Efficient inference is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q3-4-model-checkpoint: It is mainly about Model Checkpoint, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Model Checkpoint. Model Checkpoint matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Different from a checkpoint quiz in this app.
    - represented term: model-checkpoint
    - source: explicit-confusable
    - rationale: Tempting because Model Checkpoint is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.

### Q4. v02711-perfect-storm-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does The Perfect Storm connect to the prompt's Journey?
- Correct choice: v02711-perfect-storm-q4-correct
- Choices:
  - v02711-perfect-storm-q4-correct: Now that the mechanics are visible, the Journey widens to ask whose data, labor, infrastructure, and choices made those mechanics useful. (correct)
    - feedback: Good connection. Now that the mechanics are visible, the Journey widens to ask whose data, labor, infrastructure, and choices made those mechanics useful.
  - v02711-perfect-storm-q4-2-efficient-inference: It is mainly about Efficient inference, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Efficient inference. Efficient inference matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not automatically worse or automatically safe.
    - represented term: efficient-inference
    - source: explicit-confusable
    - rationale: Tempting because Efficient inference is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q4-3-model-checkpoint: It is mainly about Model Checkpoint, not the mechanism named in The Perfect Storm.
    - feedback: This choice points toward Model Checkpoint. Model Checkpoint matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Different from a checkpoint quiz in this app.
    - represented term: model-checkpoint
    - source: explicit-confusable
    - rationale: Tempting because Model Checkpoint is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.
  - v02711-perfect-storm-q4-4-machine-learning: It means all AI and machine learning are exactly the same thing.
    - feedback: This choice points toward Machine learning. Machine learning matters nearby, but this question is asking about The Perfect Storm.
    - misconception: Not exactly the same thing as all AI.
    - represented term: machine-learning
    - source: explicit-confusable
    - rationale: Tempting because Machine learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific The Perfect Storm mechanism or distinction.

## Collective Intelligence, Extracted (3)

Stage: 7. Midnight Ledger

Objective: Explain Collective Intelligence, Extracted as part of the day in the life of a prompt.

### Q1. v02711-collective-intelligence-q1

- Type: applied mechanism check
- Category: application
- Stem: What powers much of a model's usefulness in Collective Intelligence, Extracted?
- Correct choice: v02711-collective-intelligence-q1-correct
- Choices:
  - v02711-collective-intelligence-q1-correct: Patterns from human-created data. (correct)
    - feedback: Human-created data can shape model patterns without giving the model a mind.
  - v02711-collective-intelligence-q1-2-llm: The model's consciousness.
    - feedback: This choice is tempting, but Collective Intelligence, Extracted asks for Generative AI depends on patterns learned from human-created language, art, code, documents, research, and culture.
    - misconception: The model's consciousness.
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-collective-intelligence-q1-3-memory: A secret live internet memory.
    - feedback: Not quite. Training can durably shape weights, but ordinary use is not a live memory of every source.
    - misconception: A secret live internet memory.
    - represented term: memory
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-collective-intelligence-q1-4-compensation: The model inventing language from nothing.
    - feedback: Not quite. Model fluency depends on patterns learned from human-created language and culture.
    - misconception: The model inventing language from nothing.
    - represented term: compensation
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-collective-intelligence-q2

- Type: mechanism
- Category: mechanism
- Stem: During Midnight Ledger, what distinction should the learner keep clear about Collective Intelligence, Extracted?
- Correct choice: v02711-collective-intelligence-q2-correct
- Choices:
  - v02711-collective-intelligence-q2-correct: Training on data can durably shape weights. (correct)
    - feedback: Good distinction. Training on data can durably shape weights.
  - v02711-collective-intelligence-q2-2-validation-data: It is mainly about Validation data, not the mechanism named in Collective Intelligence, Extracted.
    - feedback: This choice points toward Validation data. Validation data matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Not training data if it is kept out of weight updates.
    - represented term: validation-data
    - source: explicit-confusable
    - rationale: Tempting because Validation data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.
  - v02711-collective-intelligence-q2-3-governance: It is only a technical parameter inside the model.
    - feedback: This choice points toward Governance. Governance matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Not the same as one prompt or one safety filter.
    - represented term: governance
    - source: explicit-confusable
    - rationale: Tempting because Governance is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.
  - v02711-collective-intelligence-q2-4-human-feedback-learning: It is mainly about Human feedback learning, not the mechanism named in Collective Intelligence, Extracted.
    - feedback: This choice points toward Human feedback learning. Human feedback learning matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Not moral understanding or guaranteed correctness.
    - represented term: human-feedback-learning
    - source: explicit-confusable
    - rationale: Tempting because Human feedback learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.

### Q3. v02711-collective-intelligence-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Collective Intelligence, Extracted help learners avoid?
- Correct choice: v02711-collective-intelligence-q3-correct
- Choices:
  - v02711-collective-intelligence-q3-correct: It corrects the misconception: The model created its abilities alone. (correct)
    - feedback: Good distinction. Collective Intelligence, Extracted is clearer when that misconception is separated from the mechanism.
  - v02711-collective-intelligence-q3-2-governance: It is only a technical parameter inside the model.
    - feedback: This choice points toward Governance. Governance matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Not the same as one prompt or one safety filter.
    - represented term: governance
    - source: explicit-confusable
    - rationale: Tempting because Governance is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.
  - v02711-collective-intelligence-q3-3-human-feedback-learning: It is mainly about Human feedback learning, not the mechanism named in Collective Intelligence, Extracted.
    - feedback: This choice points toward Human feedback learning. Human feedback learning matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Not moral understanding or guaranteed correctness.
    - represented term: human-feedback-learning
    - source: explicit-confusable
    - rationale: Tempting because Human feedback learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.
  - v02711-collective-intelligence-q3-4-alignment: It is mainly about Alignment, not the mechanism named in Collective Intelligence, Extracted.
    - feedback: This choice points toward Alignment. Alignment matters nearby, but this question is asking about Collective Intelligence, Extracted.
    - misconception: Aligned behavior does not guarantee truth or mean the model understands morality.
    - represented term: alignment
    - source: explicit-confusable
    - rationale: Tempting because Alignment is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Collective Intelligence, Extracted mechanism or distinction.

## Costs We Must Count (4)

Stage: 7. Midnight Ledger

Objective: Explain Costs We Must Count as part of the day in the life of a prompt.

### Q1. v02711-costs-we-must-count-q1

- Type: applied mechanism check
- Category: application
- Stem: Which statement is most responsible in Costs We Must Count?
- Correct choice: v02711-costs-we-must-count-q1-correct
- Choices:
  - v02711-costs-we-must-count-q1-correct: AI costs vary and should be counted before decisions (correct)
    - feedback: Insight unlocked: counting costs supports wiser choices.
  - v02711-costs-we-must-count-q1-2-energy-use: Digital systems have no physical costs
    - feedback: Not quite. Digital services still run on material infrastructure.
    - misconception: Digital systems have no physical costs
    - represented term: energy-use
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-costs-we-must-count-q1-3-ai: All AI costs are identical everywhere
    - feedback: Not quite. Costs vary by model, workload, hardware, cooling, region, and electricity source.
    - misconception: All AI costs are identical everywhere
    - represented term: ai
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-costs-we-must-count-q1-4-carbon-emissions: One prompt always has the same footprint
    - feedback: Not quite. The footprint depends on model, workload, hardware, data center, electricity source, and deployment.
    - misconception: One prompt always has the same footprint
    - represented term: carbon-emissions
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-costs-we-must-count-q2

- Type: mechanism
- Category: mechanism
- Stem: During Midnight Ledger, what distinction should the learner keep clear about Costs We Must Count?
- Correct choice: v02711-costs-we-must-count-q2-correct
- Choices:
  - v02711-costs-we-must-count-q2-correct: Some costs come from durable training infrastructure; others come from repeated inference workloads, deployment choices, and institutional use. (correct)
    - feedback: Good distinction. Some costs come from durable training infrastructure; others come from repeated inference workloads, deployment choices, and institutional use.
  - v02711-costs-we-must-count-q2-2-data-provenance: It is mainly about Data provenance, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Data provenance. Data provenance matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not the same as model accuracy or output citation.
    - represented term: data-provenance
    - source: explicit-confusable
    - rationale: Tempting because Data provenance is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q2-3-consent: It is mainly about Consent, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Consent. Consent matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not the same as public availability.
    - represented term: consent
    - source: explicit-confusable
    - rationale: Tempting because Consent is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q2-4-compensation: It is mainly about Compensation, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Compensation. Compensation matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not guaranteed by model usefulness or by public access to a work.
    - represented term: compensation
    - source: explicit-confusable
    - rationale: Tempting because Compensation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.

### Q3. v02711-costs-we-must-count-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Costs We Must Count help learners avoid?
- Correct choice: v02711-costs-we-must-count-q3-correct
- Choices:
  - v02711-costs-we-must-count-q3-correct: It corrects the misconception: Digital means weightless or cost-free. (correct)
    - feedback: Good distinction. Costs We Must Count is clearer when that misconception is separated from the mechanism.
  - v02711-costs-we-must-count-q3-2-consent: It is mainly about Consent, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Consent. Consent matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not the same as public availability.
    - represented term: consent
    - source: explicit-confusable
    - rationale: Tempting because Consent is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q3-3-compensation: It is mainly about Compensation, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Compensation. Compensation matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not guaranteed by model usefulness or by public access to a work.
    - represented term: compensation
    - source: explicit-confusable
    - rationale: Tempting because Compensation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q3-4-human-centered-ai-term: It is mainly about Human-centered AI, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Human-centered AI. Human-centered AI matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not AI deciding human values for us.
    - represented term: human-centered-ai-term
    - source: explicit-confusable
    - rationale: Tempting because Human-centered AI is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.

### Q4. v02711-costs-we-must-count-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Costs We Must Count connect to the prompt's Journey?
- Correct choice: v02711-costs-we-must-count-q4-correct
- Choices:
  - v02711-costs-we-must-count-q4-correct: Benefits can be real; this paired card asks what must be protected, redesigned, or governed while pursuing those benefits. (correct)
    - feedback: Good connection. Benefits can be real; this paired card asks what must be protected, redesigned, or governed while pursuing those benefits.
  - v02711-costs-we-must-count-q4-2-compensation: It is mainly about Compensation, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Compensation. Compensation matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not guaranteed by model usefulness or by public access to a work.
    - represented term: compensation
    - source: explicit-confusable
    - rationale: Tempting because Compensation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q4-3-human-centered-ai-term: It is mainly about Human-centered AI, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Human-centered AI. Human-centered AI matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not AI deciding human values for us.
    - represented term: human-centered-ai-term
    - source: explicit-confusable
    - rationale: Tempting because Human-centered AI is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.
  - v02711-costs-we-must-count-q4-4-human-review: It is mainly about Human review, not the mechanism named in Costs We Must Count.
    - feedback: This choice points toward Human review. Human review matters nearby, but this question is asking about Costs We Must Count.
    - misconception: Not rubber-stamping fluent output.
    - represented term: human-review
    - source: explicit-confusable
    - rationale: Tempting because Human review is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Costs We Must Count mechanism or distinction.

## Risk vs Myth (4)

Stage: 7. Midnight Ledger

Objective: Explain Risk vs Myth as part of the day in the life of a prompt.

### Q1. v02711-risk-myth-q1

- Type: applied mechanism check
- Category: application
- Stem: Which is a real institutional risk in Risk vs Myth?
- Correct choice: v02711-risk-myth-q1-correct
- Choices:
  - v02711-risk-myth-q1-correct: Uploading private data. (correct)
    - feedback: Privacy exposure is a practical risk caused by data, context, tools, and institutions.
  - v02711-risk-myth-q1-2-softmax: Softmax stealing files.
    - feedback: Not quite. Softmax converts scores to probabilities; file exposure comes from data handling, tools, permissions, and integrations.
    - misconception: Softmax stealing files.
    - represented term: softmax
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-risk-myth-q1-3-llm: The model becoming conscious in the chat.
    - feedback: Not quite. Fluent output does not imply consciousness.
    - misconception: The model becoming conscious in the chat.
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-risk-myth-q1-4-training: The model secretly training itself during every ordinary chat.
    - feedback: Not quite. Ordinary inference does not durably update weights unless a separate training process happens.
    - misconception: The model secretly training itself during every ordinary chat.
    - represented term: training
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-risk-myth-q2

- Type: mechanism
- Category: mechanism
- Stem: During Midnight Ledger, what distinction should the learner keep clear about Risk vs Myth?
- Correct choice: v02711-risk-myth-q2-correct
- Choices:
  - v02711-risk-myth-q2-correct: Risk literacy is a human practice. (correct)
    - feedback: Good distinction. Risk literacy is a human practice.
  - v02711-risk-myth-q2-2-sampling: It writes the whole answer at once.
    - feedback: This choice points toward Sampling. Sampling matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not writing the whole response, permanently teaching the model, or proving truth.
    - represented term: sampling
    - source: explicit-confusable
    - rationale: Tempting because Sampling is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q2-3-human-review: It is mainly about Human review, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Human review. Human review matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not rubber-stamping fluent output.
    - represented term: human-review
    - source: explicit-confusable
    - rationale: Tempting because Human review is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q2-4-responsible-ai: It is mainly about Responsible AI, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Responsible AI. Responsible AI matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not a guarantee that every output is true or safe.
    - represented term: responsible-ai
    - source: explicit-confusable
    - rationale: Tempting because Responsible AI is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.

### Q3. v02711-risk-myth-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Risk vs Myth help learners avoid?
- Correct choice: v02711-risk-myth-q3-correct
- Choices:
  - v02711-risk-myth-q3-correct: It corrects the misconception: Risk only means sci-fi doom, or every fluent model has a mind. (correct)
    - feedback: Good distinction. Risk vs Myth is clearer when that misconception is separated from the mechanism.
  - v02711-risk-myth-q3-2-human-review: It is mainly about Human review, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Human review. Human review matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not rubber-stamping fluent output.
    - represented term: human-review
    - source: explicit-confusable
    - rationale: Tempting because Human review is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q3-3-responsible-ai: It is mainly about Responsible AI, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Responsible AI. Responsible AI matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not a guarantee that every output is true or safe.
    - represented term: responsible-ai
    - source: explicit-confusable
    - rationale: Tempting because Responsible AI is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q3-4-data-center: It is mainly about Data center, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Data center. Data center matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not a weightless cloud or a single laptop.
    - represented term: data-center
    - source: explicit-confusable
    - rationale: Tempting because Data center is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.

### Q4. v02711-risk-myth-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Risk vs Myth connect to the prompt's Journey?
- Correct choice: v02711-risk-myth-q4-correct
- Choices:
  - v02711-risk-myth-q4-correct: Costs showed what must be counted. (correct)
    - feedback: Good connection. Costs showed what must be counted.
  - v02711-risk-myth-q4-2-responsible-ai: It is mainly about Responsible AI, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Responsible AI. Responsible AI matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not a guarantee that every output is true or safe.
    - represented term: responsible-ai
    - source: explicit-confusable
    - rationale: Tempting because Responsible AI is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q4-3-data-center: It is mainly about Data center, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Data center. Data center matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not a weightless cloud or a single laptop.
    - represented term: data-center
    - source: explicit-confusable
    - rationale: Tempting because Data center is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.
  - v02711-risk-myth-q4-4-policy: It is mainly about Policy, not the mechanism named in Risk vs Myth.
    - feedback: This choice points toward Policy. Policy matters nearby, but this question is asking about Risk vs Myth.
    - misconception: Not the same as moral understanding.
    - represented term: policy
    - source: explicit-confusable
    - rationale: Tempting because Policy is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Risk vs Myth mechanism or distinction.

## Benefits Worth Taking Seriously (3)

Stage: 8. New Dawn

Objective: Explain Benefits Worth Taking Seriously as part of the day in the life of a prompt.

### Q1. v02711-benefits-worth-taking-seriously-q1

- Type: applied mechanism check
- Category: application
- Stem: Which benefit claim is the safest kind to make without hype in Benefits Worth Taking Seriously?
- Correct choice: v02711-benefits-worth-taking-seriously-q1-correct
- Choices:
  - v02711-benefits-worth-taking-seriously-q1-correct: AI can assist drafts, search, translation, and access under human review. (correct)
    - feedback: Insight unlocked: benefits can be real and bounded.
  - v02711-benefits-worth-taking-seriously-q1-2-translation: AI will automatically solve education
    - feedback: Not quite. Broad utopian claims need strong evidence and careful limits.
    - misconception: AI will automatically solve education
    - represented term: translation
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-benefits-worth-taking-seriously-q1-3-summarization: AI has human judgment now
    - feedback: Not quite. A model can assist, but humans remain responsible.
    - misconception: AI has human judgment now
    - represented term: summarization
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-benefits-worth-taking-seriously-q1-4-human-review: AI benefits mean no costs matter
    - feedback: Not quite. Benefits and costs both need honest accounting.
    - misconception: AI benefits mean no costs matter
    - represented term: human-review
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-benefits-worth-taking-seriously-q2

- Type: mechanism
- Category: mechanism
- Stem: During New Dawn, what distinction should the learner keep clear about Benefits Worth Taking Seriously?
- Correct choice: v02711-benefits-worth-taking-seriously-q2-correct
- Choices:
  - v02711-benefits-worth-taking-seriously-q2-correct: Benefits during use usually come from trained weights plus temporary context, tools, retrieval, and human review. (correct)
    - feedback: Good distinction. Benefits during use usually come from trained weights plus temporary context, tools, retrieval, and human review.
  - v02711-benefits-worth-taking-seriously-q2-2-retrieval: It is the same as fine-tuning the model on new data.
    - feedback: This choice points toward Retrieval. Retrieval matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Retrieval is being treated as the same idea as Benefits Worth Taking Seriously.
    - represented term: retrieval
    - source: explicit-confusable
    - rationale: Tempting because Retrieval is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.
  - v02711-benefits-worth-taking-seriously-q2-3-fine-tuning: It is the same as adding outside text into the current prompt.
    - feedback: This choice points toward Fine-tuning. Fine-tuning matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Different from prompting; prompting changes temporary context, not durable weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Tempting because Fine-tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.
  - v02711-benefits-worth-taking-seriously-q2-4-training: It permanently updates model weights during this ordinary response.
    - feedback: This choice points toward Training. Training matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Ordinary chat inference is not training unless a separate training process updates weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Tempting because Training is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.

### Q3. v02711-benefits-worth-taking-seriously-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Benefits Worth Taking Seriously help learners avoid?
- Correct choice: v02711-benefits-worth-taking-seriously-q3-correct
- Choices:
  - v02711-benefits-worth-taking-seriously-q3-correct: It corrects the misconception: AI benefits require believing in imminent utopia. (correct)
    - feedback: Good distinction. Benefits Worth Taking Seriously is clearer when that misconception is separated from the mechanism.
  - v02711-benefits-worth-taking-seriously-q3-2-fine-tuning: It is the same as adding outside text into the current prompt.
    - feedback: This choice points toward Fine-tuning. Fine-tuning matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Different from prompting; prompting changes temporary context, not durable weights.
    - represented term: fine-tuning
    - source: explicit-confusable
    - rationale: Tempting because Fine-tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.
  - v02711-benefits-worth-taking-seriously-q3-3-training: It permanently updates model weights during this ordinary response.
    - feedback: This choice points toward Training. Training matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Ordinary chat inference is not training unless a separate training process updates weights.
    - represented term: training
    - source: explicit-confusable
    - rationale: Tempting because Training is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.
  - v02711-benefits-worth-taking-seriously-q3-4-input-context: It is mainly about Input context, not the mechanism named in Benefits Worth Taking Seriously.
    - feedback: This choice points toward Input context. Input context matters nearby, but this question is asking about Benefits Worth Taking Seriously.
    - misconception: Not the training dataset or durable model weights.
    - represented term: input-context
    - source: explicit-confusable
    - rationale: Tempting because Input context is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Benefits Worth Taking Seriously mechanism or distinction.

## Human-Centered AI (4)

Stage: 8. New Dawn

Objective: Explain Human-Centered AI as part of the day in the life of a prompt.

### Q1. v02711-human-centered-ai-q1

- Type: applied mechanism check
- Category: application
- Stem: What should remain central in high-stakes AI use in Human-Centered AI?
- Correct choice: v02711-human-centered-ai-q1-correct
- Choices:
  - v02711-human-centered-ai-q1-correct: Human judgment and accountability (correct)
    - feedback: Insight unlocked: human-centered AI keeps responsibility with people.
  - v02711-human-centered-ai-q1-2-common-good: The fastest automated answer
    - feedback: Not quite. Speed is not the same as dignity, learning, or responsibility.
    - misconception: The fastest automated answer
    - represented term: common-good
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-human-centered-ai-q1-3-human-review: The model's moral feelings
    - feedback: This choice is tempting, but Human-Centered AI asks for Human-centered AI asks whether a system supports dignity, learning, responsibility, creativity, relationships, and the common good.
    - misconception: The model's moral feelings
    - represented term: human-review
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-human-centered-ai-q1-4-governance: No review once the output is fluent
    - feedback: Not quite. Fluency does not replace human accountability.
    - misconception: No review once the output is fluent
    - represented term: governance
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-human-centered-ai-q2

- Type: mechanism
- Category: mechanism
- Stem: During New Dawn, what distinction should the learner keep clear about Human-Centered AI?
- Correct choice: v02711-human-centered-ai-q2-correct
- Choices:
  - v02711-human-centered-ai-q2-correct: Human-centered choices can shape durable systems, policies, and training; prompts alone cannot give the model moral understanding. (correct)
    - feedback: Good distinction. Human-centered choices can shape durable systems, policies, and training; prompts alone cannot give the model moral understanding.
  - v02711-human-centered-ai-q2-2-policy: It is mainly about Policy, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Policy. Policy matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not the same as moral understanding.
    - represented term: policy
    - source: explicit-confusable
    - rationale: Tempting because Policy is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q2-3-instruction-tuning: It is mainly about Instruction tuning, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Instruction tuning. Instruction tuning matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not the same as one instruction inside a prompt.
    - represented term: instruction-tuning
    - source: explicit-confusable
    - rationale: Tempting because Instruction tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q2-4-human-feedback-learning: It is mainly about Human feedback learning, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Human feedback learning. Human feedback learning matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not moral understanding or guaranteed correctness.
    - represented term: human-feedback-learning
    - source: explicit-confusable
    - rationale: Tempting because Human feedback learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.

### Q3. v02711-human-centered-ai-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Human-Centered AI help learners avoid?
- Correct choice: v02711-human-centered-ai-q3-correct
- Choices:
  - v02711-human-centered-ai-q3-correct: It corrects the misconception: If AI is powerful, it should decide. (correct)
    - feedback: Good distinction. Human-Centered AI is clearer when that misconception is separated from the mechanism.
  - v02711-human-centered-ai-q3-2-instruction-tuning: It is mainly about Instruction tuning, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Instruction tuning. Instruction tuning matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not the same as one instruction inside a prompt.
    - represented term: instruction-tuning
    - source: explicit-confusable
    - rationale: Tempting because Instruction tuning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q3-3-human-feedback-learning: It is mainly about Human feedback learning, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Human feedback learning. Human feedback learning matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not moral understanding or guaranteed correctness.
    - represented term: human-feedback-learning
    - source: explicit-confusable
    - rationale: Tempting because Human feedback learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q3-4-rlhf: It is mainly about RLHF, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward RLHF. RLHF matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not a guarantee that every answer is true or safe.
    - represented term: rlhf
    - source: explicit-confusable
    - rationale: Tempting because RLHF is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.

### Q4. v02711-human-centered-ai-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Human-Centered AI connect to the prompt's Journey?
- Correct choice: v02711-human-centered-ai-q4-correct
- Choices:
  - v02711-human-centered-ai-q4-correct: After counting costs, this card names the values that should guide tradeoffs. (correct)
    - feedback: Good connection. After counting costs, this card names the values that should guide tradeoffs.
  - v02711-human-centered-ai-q4-2-human-feedback-learning: It is mainly about Human feedback learning, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Human feedback learning. Human feedback learning matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not moral understanding or guaranteed correctness.
    - represented term: human-feedback-learning
    - source: explicit-confusable
    - rationale: Tempting because Human feedback learning is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q4-3-rlhf: It is mainly about RLHF, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward RLHF. RLHF matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not a guarantee that every answer is true or safe.
    - represented term: rlhf
    - source: explicit-confusable
    - rationale: Tempting because RLHF is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.
  - v02711-human-centered-ai-q4-4-guardrail: It is mainly about Guardrail, not the mechanism named in Human-Centered AI.
    - feedback: This choice points toward Guardrail. Guardrail matters nearby, but this question is asking about Human-Centered AI.
    - misconception: Not a perfect safety guarantee.
    - represented term: guardrail
    - source: explicit-confusable
    - rationale: Tempting because Guardrail is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Human-Centered AI mechanism or distinction.

## Better AI Is a Choice (4)

Stage: 8. New Dawn

Objective: Explain Better AI Is a Choice as part of the day in the life of a prompt.

### Q1. v02711-better-ai-choice-q1

- Type: applied mechanism check
- Category: application
- Stem: Which choice can reduce some AI risks in Better AI Is a Choice?
- Correct choice: v02711-better-ai-choice-q1-correct
- Choices:
  - v02711-better-ai-choice-q1-correct: Use retrieval and human review when they fit the task (correct)
    - feedback: Insight unlocked: better AI is shaped by design and governance choices.
  - v02711-better-ai-choice-q1-2-human-centered-ai-term: Assume bigger is always better
    - feedback: Not quite. Smaller task-specific systems may be better for some goals.
    - misconception: Assume bigger is always better
    - represented term: human-centered-ai-term
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-better-ai-choice-q1-3-human-review: Remove all human accountability
    - feedback: Not quite. High-stakes use needs human responsibility.
    - misconception: Remove all human accountability
    - represented term: human-review
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-better-ai-choice-q1-4-probability: Ignore data provenance
    - feedback: Not quite. Provenance, consent, and licensing matter.
    - misconception: Ignore data provenance
    - represented term: probability
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-better-ai-choice-q2

- Type: mechanism
- Category: mechanism
- Stem: During New Dawn, what distinction should the learner keep clear about Better AI Is a Choice?
- Correct choice: v02711-better-ai-choice-q2-correct
- Choices:
  - v02711-better-ai-choice-q2-correct: Some choices durably shape models and institutions; others shape a particular workflow or inference run. (correct)
    - feedback: Good distinction. Some choices durably shape models and institutions; others shape a particular workflow or inference run.
  - v02711-better-ai-choice-q2-2-compute: It means compute by itself is intelligence.
    - feedback: This choice points toward Compute. Compute matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not intelligence by itself.
    - represented term: compute
    - source: explicit-confusable
    - rationale: Tempting because Compute is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q2-3-training-data: It is mainly about Training data, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q2-4-copyright: It is mainly about Copyright, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Copyright. Copyright matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as consent, compensation, or public availability.
    - represented term: copyright
    - source: explicit-confusable
    - rationale: Tempting because Copyright is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.

### Q3. v02711-better-ai-choice-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Better AI Is a Choice help learners avoid?
- Correct choice: v02711-better-ai-choice-q3-correct
- Choices:
  - v02711-better-ai-choice-q3-correct: It corrects the misconception: The harms are inevitable if the technology is useful. (correct)
    - feedback: Good distinction. Better AI Is a Choice is clearer when that misconception is separated from the mechanism.
  - v02711-better-ai-choice-q3-2-training-data: It is mainly about Training data, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q3-3-copyright: It is mainly about Copyright, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Copyright. Copyright matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as consent, compensation, or public availability.
    - represented term: copyright
    - source: explicit-confusable
    - rationale: Tempting because Copyright is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q3-4-evaluation: It is mainly about Evaluation, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Evaluation. Evaluation matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as training unless results feed a training process.
    - represented term: evaluation
    - source: explicit-confusable
    - rationale: Tempting because Evaluation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.

### Q4. v02711-better-ai-choice-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Better AI Is a Choice connect to the prompt's Journey?
- Correct choice: v02711-better-ai-choice-q4-correct
- Choices:
  - v02711-better-ai-choice-q4-correct: Human-centered values become design, policy, governance, and incentive choices. (correct)
    - feedback: Good connection. Human-centered values become design, policy, governance, and incentive choices.
  - v02711-better-ai-choice-q4-2-copyright: It is mainly about Copyright, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Copyright. Copyright matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as consent, compensation, or public availability.
    - represented term: copyright
    - source: explicit-confusable
    - rationale: Tempting because Copyright is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q4-3-evaluation: It is mainly about Evaluation, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Evaluation. Evaluation matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not the same as training unless results feed a training process.
    - represented term: evaluation
    - source: explicit-confusable
    - rationale: Tempting because Evaluation is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.
  - v02711-better-ai-choice-q4-4-uncertainty: It is mainly about Uncertainty, not the mechanism named in Better AI Is a Choice.
    - feedback: This choice points toward Uncertainty. Uncertainty matters nearby, but this question is asking about Better AI Is a Choice.
    - misconception: Not weakness; it is often part of responsible use.
    - represented term: uncertainty
    - source: explicit-confusable
    - rationale: Tempting because Uncertainty is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Better AI Is a Choice mechanism or distinction.

## Effective Prompting from Model Literacy (4)

Stage: 8. New Dawn

Objective: Explain Effective Prompting from Model Literacy as part of the day in the life of a prompt.

### Q1. v02711-effective-prompting-literacy-q1

- Type: applied mechanism check
- Category: application
- Stem: What does a good prompt usually shape in Effective Prompting from Model Literacy?
- Correct choice: v02711-effective-prompting-literacy-q1-correct
- Choices:
  - v02711-effective-prompting-literacy-q1-correct: The current context for this run (correct)
    - feedback: Insight unlocked: prompting is context design.
  - v02711-effective-prompting-literacy-q1-2-training: The model's permanent weights
    - feedback: This choice is tempting, but Effective Prompting from Model Literacy asks for Good prompts work because they shape the current context: task, constraints, examples, data, audience, evidence needs, uncertainty, and output format.
    - misconception: The model's permanent weights
    - represented term: training
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-effective-prompting-literacy-q1-3-llm: The model's consciousness
    - feedback: This choice is tempting, but Effective Prompting from Model Literacy asks for Good prompts work because they shape the current context: task, constraints, examples, data, audience, evidence needs, uncertainty, and output format.
    - misconception: The model's consciousness
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-effective-prompting-literacy-q1-4-probability: A guarantee that every answer is true
    - feedback: Not quite. Better context can help, but answers still need review.
    - misconception: A guarantee that every answer is true
    - represented term: probability
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-effective-prompting-literacy-q2

- Type: mechanism
- Category: mechanism
- Stem: During New Dawn, what distinction should the learner keep clear about Effective Prompting from Model Literacy?
- Correct choice: v02711-effective-prompting-literacy-q2-correct
- Choices:
  - v02711-effective-prompting-literacy-q2-correct: Prompting usually changes temporary context, not durable weights. (correct)
    - feedback: Good distinction. Prompting usually changes temporary context, not durable weights.
  - v02711-effective-prompting-literacy-q2-2-prompt-tokens: It is a response token the model generated during this answer.
    - feedback: This choice points toward Prompt token. Prompt token matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not generated by the model during this response step.
    - represented term: prompt-tokens
    - source: explicit-confusable
    - rationale: Tempting because Prompt token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q2-3-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q2-4-training-data: It is mainly about Training data, not the mechanism named in Effective Prompting from Model Literacy.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.

### Q3. v02711-effective-prompting-literacy-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Effective Prompting from Model Literacy help learners avoid?
- Correct choice: v02711-effective-prompting-literacy-q3-correct
- Choices:
  - v02711-effective-prompting-literacy-q3-correct: It corrects the misconception: Prompting is magic wording or permanent teaching. (correct)
    - feedback: Good distinction. Effective Prompting from Model Literacy is clearer when that misconception is separated from the mechanism.
  - v02711-effective-prompting-literacy-q3-2-memory: It is only the temporary visible input context.
    - feedback: This choice points toward Memory. Memory matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Do not confuse context with model weights or saved user memory.
    - represented term: memory
    - source: explicit-confusable
    - rationale: Tempting because Memory is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q3-3-training-data: It is mainly about Training data, not the mechanism named in Effective Prompting from Model Literacy.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q3-4-response-tokens: It is input text that existed before generation began.
    - feedback: This choice points toward Response token. Response token matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not a durable weight update or saved memory.
    - represented term: response-tokens
    - source: explicit-confusable
    - rationale: Tempting because Response token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.

### Q4. v02711-effective-prompting-literacy-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Effective Prompting from Model Literacy connect to the prompt's Journey?
- Correct choice: v02711-effective-prompting-literacy-q4-correct
- Choices:
  - v02711-effective-prompting-literacy-q4-correct: After system-level choices, this card gives an individual practice while keeping responsibility visible. (correct)
    - feedback: Good connection. After system-level choices, this card gives an individual practice while keeping responsibility visible.
  - v02711-effective-prompting-literacy-q4-2-training-data: It is mainly about Training data, not the mechanism named in Effective Prompting from Model Literacy.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q4-3-response-tokens: It is input text that existed before generation began.
    - feedback: This choice points toward Response token. Response token matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not a durable weight update or saved memory.
    - represented term: response-tokens
    - source: explicit-confusable
    - rationale: Tempting because Response token is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.
  - v02711-effective-prompting-literacy-q4-4-response-so-far: It is mainly about Response-so-far, not the mechanism named in Effective Prompting from Model Literacy.
    - feedback: This choice points toward Response-so-far. Response-so-far matters nearby, but this question is asking about Effective Prompting from Model Literacy.
    - misconception: Not the whole final answer, permanent memory, or training data.
    - represented term: response-so-far
    - source: explicit-confusable
    - rationale: Tempting because Response-so-far is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Effective Prompting from Model Literacy mechanism or distinction.

## Model Literate Synthesis (5)

Stage: 8. New Dawn

Objective: Explain Model Literate Synthesis as part of the day in the life of a prompt.

### Q1. v02711-model-literate-synthesis-q1

- Type: applied mechanism check
- Category: application
- Stem: At the end of the Journey, which synthesis keeps mechanism and responsibility together?
- Correct choice: v02711-model-literate-synthesis-q1-correct
- Choices:
  - v02711-model-literate-synthesis-q1-correct: Mechanics matter, and humans remain responsible (correct)
    - feedback: Insight unlocked: model literacy joins mechanism with judgment.
  - v02711-model-literate-synthesis-q1-2-llm: Fluent output proves wisdom
    - feedback: Not quite. Fluency is not wisdom.
    - misconception: Fluent output proves wisdom
    - represented term: llm
    - source: nearby-stage
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-model-literate-synthesis-q1-3-context-window: Ethics replaces learning the mechanics
    - feedback: Not quite. Good judgment needs a clear mechanism.
    - misconception: Ethics replaces learning the mechanics
    - represented term: context window
    - source: same-card
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.
  - v02711-model-literate-synthesis-q1-4-responsible-ai: Mechanics alone settle every use decision
    - feedback: Not quite. Mechanisms inform human choices; they do not replace judgment.
    - misconception: Mechanics alone settle every use decision
    - represented term: responsible-ai
    - source: explicit-confusable
    - rationale: Existing live checkpoint distractor retained for review because it captures a plausible misunderstanding.

### Q2. v02711-model-literate-synthesis-q2

- Type: mechanism
- Category: mechanism
- Stem: During New Dawn, what distinction should the learner keep clear about Model Literate Synthesis?
- Correct choice: v02711-model-literate-synthesis-q2-correct
- Choices:
  - v02711-model-literate-synthesis-q2-correct: The synthesis keeps durable weight changes, temporary context, retrieved evidence, and generated response tokens separate. (correct)
    - feedback: Good distinction. The synthesis keeps durable weight changes, temporary context, retrieved evidence, and generated response tokens separate.
  - v02711-model-literate-synthesis-q2-2-loss: It is mainly about Loss, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Loss. Loss matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Truth, confidence, punishment, or a human sense of failure.
    - represented term: loss
    - source: explicit-confusable
    - rationale: Tempting because Loss is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q2-3-weight-update: It is mainly about Weight update, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Weight update. Weight update matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the same as adding a prompt to context.
    - represented term: weight-update
    - source: explicit-confusable
    - rationale: Tempting because Weight update is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q2-4-training-data: It is mainly about Training data, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.

### Q3. v02711-model-literate-synthesis-q3

- Type: boundary distinction
- Category: boundary
- Stem: Which common confusion does Model Literate Synthesis help learners avoid?
- Correct choice: v02711-model-literate-synthesis-q3-correct
- Choices:
  - v02711-model-literate-synthesis-q3-correct: It corrects the misconception: Fluency equals understanding or wisdom. (correct)
    - feedback: Good distinction. Model Literate Synthesis is clearer when that misconception is separated from the mechanism.
  - v02711-model-literate-synthesis-q3-2-weight-update: It is mainly about Weight update, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Weight update. Weight update matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the same as adding a prompt to context.
    - represented term: weight-update
    - source: explicit-confusable
    - rationale: Tempting because Weight update is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q3-3-training-data: It is mainly about Training data, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q3-4-pretraining: It happens again from scratch during every user prompt.
    - feedback: This choice points toward Pretraining. Pretraining matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Often confused with fine-tuning or perfect source recall.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Tempting because Pretraining is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.

### Q4. v02711-model-literate-synthesis-q4

- Type: concept relationship
- Category: causal-consequence
- Stem: How does Model Literate Synthesis connect to the prompt's Journey?
- Correct choice: v02711-model-literate-synthesis-q4-correct
- Choices:
  - v02711-model-literate-synthesis-q4-correct: This final card ties the day in the life of a prompt to the wider human choices around AI. (correct)
    - feedback: Good connection. This final card ties the day in the life of a prompt to the wider human choices around AI.
  - v02711-model-literate-synthesis-q4-2-training-data: It is mainly about Training data, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Training data. Training data matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the same as the current prompt or context window.
    - represented term: training-data
    - source: explicit-confusable
    - rationale: Tempting because Training data is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q4-3-pretraining: It happens again from scratch during every user prompt.
    - feedback: This choice points toward Pretraining. Pretraining matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Often confused with fine-tuning or perfect source recall.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Tempting because Pretraining is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q4-4-forward-pass: It is mainly about Forward pass, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Forward pass. Forward pass matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not backpropagation or a training update.
    - represented term: forward-pass
    - source: explicit-confusable
    - rationale: Tempting because Forward pass is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.

### Q5. v02711-model-literate-synthesis-q5

- Type: applied scenario
- Category: application
- Stem: A learner uses Model Literate Synthesis to explain an AI answer. What should they say?
- Correct choice: v02711-model-literate-synthesis-q5-correct
- Choices:
  - v02711-model-literate-synthesis-q5-correct: The goal is not trivia. It is a durable mental model for wise use, institutional judgment, and better questions. (correct)
    - feedback: Good model-literacy move. The goal is not trivia. It is a durable mental model for wise use, institutional judgment, and better questions.
  - v02711-model-literate-synthesis-q5-2-pretraining: It happens again from scratch during every user prompt.
    - feedback: This choice points toward Pretraining. Pretraining matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Often confused with fine-tuning or perfect source recall.
    - represented term: pretraining
    - source: explicit-confusable
    - rationale: Tempting because Pretraining is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q5-3-forward-pass: It is mainly about Forward pass, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Forward pass. Forward pass matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not backpropagation or a training update.
    - represented term: forward-pass
    - source: explicit-confusable
    - rationale: Tempting because Forward pass is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.
  - v02711-model-literate-synthesis-q5-4-input-context: It is mainly about Input context, not the mechanism named in Model Literate Synthesis.
    - feedback: This choice points toward Input context. Input context matters nearby, but this question is asking about Model Literate Synthesis.
    - misconception: Not the training dataset or durable model weights.
    - represented term: input-context
    - source: explicit-confusable
    - rationale: Tempting because Input context is explicitly confusable glossary metadata for this part of the Journey. It is not correct because the question asks for the specific Model Literate Synthesis mechanism or distinction.

