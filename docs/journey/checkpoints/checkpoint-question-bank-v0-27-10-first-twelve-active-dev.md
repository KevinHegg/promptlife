# Prompt Life v0.27.10 First-Twelve Active Development Checkpoint Bank



Version: 0.27.10-first-twelve-active-dev

Active bank: v0.27.10-first-twelve

Cards active: 12

Questions: 39

Choices: 156

Wrong-answer distractors: 117



Legacy fallback remains available with `?legacyCheckpoints=1` or `?checkpointBank=legacy`.



## What Is an LLM?

Lesson ID: what-is-llm

Stage: Before Morning

Questions: 2

Question-count rationale: What Is an LLM? keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Reason that an LLM generates response tokens by using learned weights and current context, without implying awareness or perfect search.

Key boundary: Inference uses fixed learned weights and temporary context to score, sample, append, and repeat next tokens.

### Q1: v0279-what-is-llm-q1

Type: mechanism in action / mechanism

Stem: When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?

Correct choice: v0279-what-is-llm-q1-correct

  - v0279-what-is-llm-q1-correct: It scores possible next tokens from the current context, selects one, appends it, and repeats. (correct)
    - feedback: Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.
  - v0279-what-is-llm-q1-conscious-reader: It reads with conscious understanding, then writes the whole answer at once.
    - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
    - misconception: conscious mind vs fluent model behavior
    - term: llm
    - source: same-card; rationale: Tempting because fluent text can sound like a human explanation.
  - v0279-what-is-llm-q1-hidden-search: It searches a hidden database and copies the best matching passage.
    - feedback: This choice reveals a common mix-up. Search can be added around a model, but a plain LLM generates from context and learned weights.
    - misconception: search engine/database vs generative model
    - term: retrieval
    - source: author-created misconception; rationale: Tempting because broad model knowledge can feel like search.
  - v0279-what-is-llm-q1-weight-change: It changes its weights each time the user sends a new prompt.
    - feedback: That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.
    - misconception: training vs inference
    - term: training
    - source: same-card; rationale: Tempting because the model may seem to adapt within a conversation.

### Q2: v0279-what-is-llm-q2

Type: misconception diagnosis / human-use-judgment

Stem: An LLM gives a fluent explanation of a poem. What should a model-literate learner conclude?

Correct choice: v0279-what-is-llm-q2-correct

  - v0279-what-is-llm-q2-correct: It generated response tokens from context and learned patterns; fluency does not prove awareness. (correct)
    - feedback: Insight strengthened. This is the fluent-behavior-without-awareness boundary Prompt Life wants learners to hold.
  - v0279-what-is-llm-q2-inner-awareness: It must have inner awareness because the explanation sounds human.
    - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
    - misconception: conscious mind vs fluent model behavior
    - term: llm
    - source: same-card; rationale: Tempting because human-like language invites human-like interpretation.
  - v0279-what-is-llm-q2-hidden-source: It must have found a hidden perfect source and copied the interpretation.
    - feedback: Close, but this describes search or retrieval better than a plain LLM response. A fluent answer is not the same as cited evidence.
    - misconception: database lookup vs learned generation
    - term: retrieval
    - source: author-created misconception; rationale: Tempting because polished answers can feel copied from a source.
  - v0279-what-is-llm-q2-prompt-learning: The poem prompt permanently taught the base model a new skill.
    - feedback: That would require training. A normal prompt can shape temporary context without durably updating weights.
    - misconception: prompt/context change vs durable weight update
    - term: weight-update
    - source: same-card; rationale: Tempting because earlier context can shape later replies in a chat.

## Where LLMs Fit

Lesson ID: where-llms-fit

Stage: Before Morning

Questions: 3

Question-count rationale: Where LLMs Fit keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Use the AI family map to reason about what kind of generative system an LLM is and what it is not.

Key boundary: LLMs are deep-learning generative AI systems focused on language/code; diffusion is a different generative family.

### Q1: v0279-where-llms-fit-q1

Type: applied scenario / application

Stem: A campus tool summarizes text with an LLM, while another creates images by denoising a noisy pattern. What does that show?

Correct choice: v0279-where-llms-fit-q1-correct

  - v0279-where-llms-fit-q1-correct: Generative AI is a family; LLMs and diffusion models are different branches. (correct)
    - feedback: Good distinction. Generative AI is a family, and different branches can use different mechanisms.
  - v0279-where-llms-fit-q1-all-llms: All generative AI tools are LLMs because ChatGPT is generative AI.
    - feedback: Not quite. An LLM is one kind of generative AI, not the whole category.
    - misconception: LLM vs generative AI family
    - term: generative-ai
    - source: same-card; rationale: Tempting because ChatGPT is many learners’ first generative AI example.
  - v0279-where-llms-fit-q1-text-only-ai: The image tool is not AI unless it generates language tokens.
    - feedback: Close, but image models can be AI without using the LLM text-token loop.
    - misconception: LLM output vs broader generative outputs
    - term: diffusion
    - source: same-card; rationale: Tempting because this app starts with language models.
  - v0279-where-llms-fit-q1-ai-ml-same: AI and machine learning are the same label, so the branches do not matter.
    - feedback: This choice collapses useful categories. Machine learning is a major branch inside the broader AI field.
    - misconception: AI vs machine learning category boundary
    - term: machine-learning
    - source: same-card; rationale: Tempting because public language often blurs these words.

### Q2: v0279-where-llms-fit-q2

Type: boundary distinction / boundary

Stem: When people say an LLM sits inside the broader AI family, which category map is most useful?

Correct choice: v0279-where-llms-fit-q2-correct

  - v0279-where-llms-fit-q2-correct: AI is broad; machine learning learns from data; deep learning uses layers; generative AI creates outputs; LLMs focus on language/code. (correct)
    - feedback: Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.
  - v0279-where-llms-fit-q2-all-ai-llm: AI means LLM; machine learning, deep learning, and generative AI are just extra names.
    - feedback: Not quite. LLMs are an important branch, not the root of the AI tree.
    - misconception: all AI is an LLM
    - term: ai
    - source: same-card; rationale: Tempting because LLMs currently dominate public attention.
  - v0279-where-llms-fit-q2-rules-learned-same: Rule-based AI, machine learning, and LLMs all work by following the same written rules.
    - feedback: Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.
    - misconception: symbolic AI vs learned model boundary
    - term: symbolic-ai
    - source: same-card; rationale: Tempting because all software runs instructions somewhere.
  - v0279-where-llms-fit-q2-diffusion-same-loop: Diffusion models, LLMs, and search engines all use the same language-token loop.
    - feedback: This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation usually appends response tokens.
    - misconception: diffusion vs autoregressive language generation
    - term: diffusion
    - source: same-card; rationale: Tempting because all can appear inside AI products.

### Q3: v0279-where-llms-fit-q3

Type: model vs product distinction / boundary

Stem: A chatbot product includes an LLM, a search tool, safety filters, and a user interface. What is the LLM?

Correct choice: v0279-where-llms-fit-q3-correct

  - v0279-where-llms-fit-q3-correct: The language-generating model inside the larger product. (correct)
    - feedback: Good distinction. A product may wrap an LLM with tools, policies, and interface pieces.
  - v0279-where-llms-fit-q3-whole-app: The whole app, including every tool and button.
    - feedback: Not quite. The product can include an LLM, but the LLM is not every surrounding tool and screen.
    - misconception: model vs product/app wrapper
    - term: ai
    - source: author-created misconception; rationale: Tempting because users experience the whole product as one AI thing.
  - v0279-where-llms-fit-q3-safety-policy: The safety policy that blocks some outputs.
    - feedback: Close, but a safety policy shapes behavior around the model; it is not the language model itself.
    - misconception: policy/guardrail vs model
    - term: policy
    - source: nearby-stage; rationale: Tempting because safety behavior is visible in the product.
  - v0279-where-llms-fit-q3-search-index: The database or search index the app may call.
    - feedback: This describes a retrieval or search component. The LLM generates language from context and learned weights.
    - misconception: retrieval/search component vs language model
    - term: retrieval
    - source: author-created misconception; rationale: Tempting because some chatbot products include search.

## Rationalists vs Empiricists

Lesson ID: history

Stage: Before Morning

Questions: 3

Question-count rationale: Rationalists vs Empiricists keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Reason through the difference between explicit rules and learned weights, while recognizing that real AI products may combine both.

Key boundary: Deep learning learns from examples by predicting, measuring loss, and adjusting weights; symbolic AI relies on explicit rules.

### Q1: v0279-history-q1

Type: boundary distinction / boundary

Stem: If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?

Correct choice: v0279-history-q1-correct

  - v0279-history-q1-correct: The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples. (correct)
    - feedback: Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.
  - v0279-history-q1-loss-every-task: The rule-based system measures loss and updates weights after every task.
    - feedback: Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.
    - misconception: symbolic rules vs training loop
    - term: loss
    - source: same-card; rationale: Tempting because loss is nearby in the deep-learning explanation.
  - v0279-history-q1-conscious-llm: The LLM has conscious reasoning, while the rule-based system has none.
    - feedback: That gives the LLM too much mind. The key boundary here is learned weights versus explicit rules.
    - misconception: conscious reasoning vs learned behavior
    - term: llm
    - source: explicit-confusable; rationale: Tempting because LLM language can sound like reasoning from the inside.
  - v0279-history-q1-all-rules: There is no difference; both systems are just written rulebooks.
    - feedback: Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.
    - misconception: LLM as hand-coded rulebook
    - term: symbolic-ai
    - source: same-card; rationale: Tempting because both systems can produce predictable outputs.

### Q2: v0279-history-q2

Type: mechanism in action / mechanism

Stem: During deep-learning training, why does the system measure loss?

Correct choice: v0279-history-q2-correct

  - v0279-history-q2-correct: Loss measures prediction error so an optimizer can adjust weights. (correct)
    - feedback: Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.
  - v0279-history-q2-moral-good: Loss tells the model whether a generated answer is morally good.
    - feedback: Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.
    - misconception: loss vs human value judgment
    - term: loss
    - source: same-card; rationale: Tempting because loss sounds like a judgment word.
  - v0279-history-q2-confidence-score: Loss is the model’s confidence score for the next token during generation.
    - feedback: Close, but confidence or probability shapes generation. Loss measures training error so weights can be adjusted.
    - misconception: loss vs confidence/probability during generation
    - term: probability
    - source: nearby-stage; rationale: Tempting because both are numerical signals related to prediction.
  - v0279-history-q2-final-answer: Loss writes the final answer after the model has finished thinking.
    - feedback: Not quite. Loss is used during training; it is not the model writing a response.
    - misconception: training signal vs response generation
    - term: response
    - source: nearby-stage; rationale: Tempting because learners may treat every internal step as answer writing.

### Q3: v0279-history-q3

Type: human-use judgment / human-use-judgment

Stem: A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?

Correct choice: v0279-history-q3-correct

  - v0279-history-q3-correct: Modern AI products can combine learned models, rules, tools, and policies; the LLM inside is still a learned-pattern model. (correct)
    - feedback: Good distinction. The product can be hybrid even when the LLM itself is learned from data.
  - v0279-history-q3-no-learning-if-rules: Any rule in the app means the LLM is no longer trained from data.
    - feedback: Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.
    - misconception: hybrid system vs pure symbolic replacement
    - term: rule-based-ai
    - source: same-card; rationale: Tempting because rule-based pieces can be visible in product behavior.
  - v0279-history-q3-conscious-product: Any fluent answer means the app is consciously reasoning.
    - feedback: That gives the model too much mind. The app can combine tools and still lack conscious understanding.
    - misconception: fluent behavior vs awareness
    - term: llm
    - source: explicit-confusable; rationale: Tempting because the whole app may feel conversational.
  - v0279-history-q3-permanent-finetune: Retrieval or filters permanently fine-tune the model on every use.
    - feedback: Close, but retrieval and filters can shape the current response without durably changing model weights.
    - misconception: retrieval/filtering vs durable training
    - term: fine-tuning
    - source: nearby-stage; rationale: Tempting because the app appears to adapt to local material.

## Training

Lesson ID: training

Stage: Before Morning

Questions: 4

Question-count rationale: Training keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Trace training as the durable weight-changing loop and separate it from ordinary inference, sampling, retrieval, and context changes.

Key boundary: Training uses examples and loss to update parameters; inference uses fixed weights and temporary activations.

### Q1: v0279-training-q1

Type: mechanism in action / mechanism

Stem: During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?

Correct choice: v0279-training-q1-correct

  - v0279-training-q1-correct: The training process uses the loss signal to update weights. (correct)
    - feedback: Good distinction. The durable weight update is what makes this training.
  - v0279-training-q1-append-response: The model appends the mistaken token to a normal live response.
    - feedback: Not quite. Appending a response token is inference behavior; training uses loss to change weights.
    - misconception: training vs autoregressive inference
    - term: inference
    - source: same-card; rationale: Tempting because generation also chooses and appends tokens.
  - v0279-training-q1-durable-memory: The prompt becomes durable memory stored inside the model’s weights.
    - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
    - misconception: context vs durable weight update
    - term: memory
    - source: author-created misconception; rationale: Tempting because chat context can feel remembered.
  - v0279-training-q1-likelihood-truth: The model treats the most likely answer as automatically true.
    - feedback: Not quite. Likelihood is not truth, and this training moment matters because loss can drive a weight update.
    - misconception: likelihood vs truth
    - term: probability
    - source: nearby-stage; rationale: Tempting because likely answers can sound authoritative.

### Q2: v0279-training-q2

Type: boundary distinction / boundary

Stem: A student asks a chatbot one question during ordinary use. Which statement is usually true?

Correct choice: v0279-training-q2-correct

  - v0279-training-q2-correct: The model uses fixed weights and temporary context; the chat usually does not rewrite the weights. (correct)
    - feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
  - v0279-training-q2-permanent-update: The chat permanently updates the base model’s weights.
    - feedback: Not quite. That would require a training process, not ordinary inference.
    - misconception: ordinary inference vs training update
    - term: training
    - source: same-card; rationale: Tempting because the model appears to adapt to the user.
  - v0279-training-q2-durable-memory: The model stores the prompt as durable memory inside its weights.
    - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
    - misconception: context vs durable memory/weights
    - term: memory
    - source: author-created misconception; rationale: Tempting because the model can refer to earlier chat context.
  - v0279-training-q2-optimizer-after-response: The optimizer trains the model after every response.
    - feedback: Close, but optimizers update weights during training, not after every normal response.
    - misconception: optimizer/weight update vs normal response
    - term: weight-update
    - source: same-card; rationale: Tempting because training and inference both involve model computation.

### Q3: v0279-training-q3

Type: causal consequence / causal-consequence

Stem: Why can training change how the model behaves tomorrow, while inference usually cannot?

Correct choice: v0279-training-q3-correct

  - v0279-training-q3-correct: Training changes parameters that future runs reuse; inference uses temporary computations for the current run. (correct)
    - feedback: Good distinction. Durable parameters carry forward; inference-time states usually do not.
  - v0279-training-q3-optimizer-inference: Inference is where the optimizer changes weights for future runs.
    - feedback: Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.
    - misconception: optimizer/weight update vs inference
    - term: weight-update
    - source: same-card; rationale: Tempting because both training and inference run model computations.
  - v0279-training-q3-prompt-only: Training only changes the visible prompt text for one response.
    - feedback: Close, but prompt changes are temporary input changes; training changes learned numbers.
    - misconception: prompt/context vs weights
    - term: prompt
    - source: nearby-stage; rationale: Tempting because prompt text clearly changes a response.
  - v0279-training-q3-truth-guarantee: Training guarantees that every future answer will be true.
    - feedback: This choice overclaims. Training can improve behavior, but it does not guarantee truth.
    - misconception: training improvement vs truth guarantee
    - term: probability
    - source: author-created misconception; rationale: Tempting because training sounds like making the model better.

### Q4: v0279-training-q4

Type: model trace / model-trace

Stem: In a training loop, which sequence is the durable learning path?

Correct choice: v0279-training-q4-correct

  - v0279-training-q4-correct: Example -> prediction -> loss -> weight update. (correct)
    - feedback: Insight strengthened. That is the weight-changing path.
  - v0279-training-q4-generation-loop: Prompt -> response token -> append -> next response token.
    - feedback: Close, but that sequence describes inference/generation, not training.
    - misconception: training loop vs autoregressive generation
    - term: autoregression
    - source: nearby-stage; rationale: Tempting because this is the model’s generation loop.
  - v0279-training-q4-search-context: Search -> outside passage -> current context -> answer.
    - feedback: That describes a search or retrieval step. It can add temporary context; it does not by itself update weights.
    - misconception: training vs retrieval/context
    - term: retrieval
    - source: author-created misconception; rationale: Tempting because outside text can improve an answer.
  - v0279-training-q4-user-correction: User correction -> better answer -> permanent learning inside the same chat.
    - feedback: Not quite. A correction can steer the current conversation, but durable learning requires a training process.
    - misconception: conversation steering vs durable training
    - term: training
    - source: same-card; rationale: Tempting because a correction can improve the current conversation.

## Pretraining

Lesson ID: pretraining

Stage: Before Morning

Questions: 4

Question-count rationale: Pretraining keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Reason that pretraining is broad durable pattern learning from next-token prediction over large datasets, not perfect recall or live browsing.

Key boundary: Pretraining repeats the training loop at large scale, changing weights before normal use.

### Q1: v0279-pretraining-q1

Type: mechanism in action / mechanism

Stem: During pretraining, what signal teaches the model broad language patterns across many examples?

Correct choice: v0279-pretraining-q1-correct

  - v0279-pretraining-q1-correct: Repeated prediction error/loss from next-token targets changes weights over many training steps. (correct)
    - feedback: Good distinction. Pretraining scales the training loop across many examples.
  - v0279-pretraining-q1-live-chat: A user conversation at deployment permanently rewrites the model.
    - feedback: Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.
    - misconception: pretraining vs inference
    - term: inference
    - source: same-card; rationale: Tempting because the model can seem to adapt inside a chat.
  - v0279-pretraining-q1-written-rules: A human writes every rule the model will follow.
    - feedback: Close, but pretraining is learned from examples, not a complete rulebook written by hand.
    - misconception: learned patterns vs symbolic rules
    - term: symbolic-ai
    - source: nearby-stage; rationale: Tempting because software often has hand-written rules.
  - v0279-pretraining-q1-perfect-copy: The model stores a perfect copy of every source document.
    - feedback: This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.
    - misconception: pattern learning vs perfect source recall
    - term: training-data
    - source: same-card; rationale: Tempting because source data influences the model.

### Q2: v0279-pretraining-q2

Type: boundary distinction / boundary

Stem: Why can pretraining create broad capability without making the model a perfect library of its sources?

Correct choice: v0279-pretraining-q2-correct

  - v0279-pretraining-q2-correct: It shapes statistical patterns in weights; it does not create a searchable copy of every source. (correct)
    - feedback: Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.
  - v0279-pretraining-q2-private-files: It gives the model direct access to every private file on demand.
    - feedback: Not quite. Training data exposure is not the same as access to every private file.
    - misconception: training data vs universal file access
    - term: training-data
    - source: same-card; rationale: Tempting because broad training data can sound like broad access.
  - v0279-pretraining-q2-search-context: It inserts the original source into every future prompt context.
    - feedback: Close, but adding source text to context is different from pretraining. Pretraining changes weights before use.
    - misconception: pretraining vs retrieval/context
    - term: retrieval
    - source: author-created misconception; rationale: Tempting because source material can sometimes be added to a prompt.
  - v0279-pretraining-q2-after-user-prompt: It happens only after a user asks a specific question.
    - feedback: Pretraining happens before deployment. The user prompt later uses the pretrained weights.
    - misconception: pretraining vs deployment-time inference
    - term: inference
    - source: same-card; rationale: Tempting because learners meet the model only during use.

### Q3: v0279-pretraining-q3

Type: causal consequence / causal-consequence

Stem: If pretraining examples include many styles and task shapes, what can change inside the model?

Correct choice: v0279-pretraining-q3-correct

  - v0279-pretraining-q3-correct: Weights can shift so future prompts activate more useful language/code patterns. (correct)
    - feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
  - v0279-pretraining-q3-current-context: The model’s current chat context becomes permanently larger.
    - feedback: Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.
    - misconception: pretraining weights vs temporary context
    - term: context window
    - source: nearby-stage; rationale: Tempting because context also affects output.
  - v0279-pretraining-q3-interface: Only the app’s buttons, labels, or interface change.
    - feedback: This describes product UI changes, not the model’s learned parameters.
    - misconception: model weights vs product interface
    - term: foundation-model
    - source: nearby-stage; rationale: Tempting because users meet models through apps.
  - v0279-pretraining-q3-safety-policy: Only a safety policy is added around the model.
    - feedback: Close, but a policy can shape a product around the model; pretraining changes the model’s reusable weights.
    - misconception: pretraining vs product policy wrapper
    - term: policy
    - source: nearby-stage; rationale: Tempting because products often include safety behavior.

### Q4: v0279-pretraining-q4

Type: misconception diagnosis / misconception-check

Stem: A base model produces fact-like text about public topics. What is the model-literate explanation?

Correct choice: v0279-pretraining-q4-correct

  - v0279-pretraining-q4-correct: Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page. (correct)
    - feedback: Insight strengthened. Source-like output can come from pretrained patterns, but it is not the same as cited evidence.
  - v0279-pretraining-q4-web-every-time: It must be browsing the web by itself for every answer.
    - feedback: Not quite. Some systems browse or retrieve, but a base model can also generate fact-like text from pretrained weights.
    - misconception: pretraining vs web retrieval
    - term: retrieval
    - source: nearby-stage; rationale: Tempting because web search is a familiar way to find facts.
  - v0279-pretraining-q4-conscious-memory: It must consciously remember reading those pages.
    - feedback: That gives the model too much mind. It has learned weights, not conscious recollection.
    - misconception: fluent fact-like output vs awareness
    - term: llm
    - source: author-created misconception; rationale: Tempting because the output can sound like human memory.
  - v0279-pretraining-q4-finetuning-alone: Fine-tuning alone explains all broad model knowledge.
    - feedback: Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.
    - misconception: pretraining vs fine-tuning
    - term: fine-tuning
    - source: nearby-stage; rationale: Tempting because fine-tuning is another training phase.

## Overfitting and Generalization

Lesson ID: overfitting-generalization

Stage: Before Morning

Questions: 3

Question-count rationale: Overfitting and Generalization keeps the reviewed v0.27.9 model-thinking question count for this first-twelve activation pass.

Primary objective: Diagnose when a model has fit training examples too narrowly and explain why set-aside validation checks generalization.

Key boundary: Overfitting installs brittle patterns into weights; generalization means learned patterns transfer to unseen examples.

### Q1: v0279-overfitting-generalization-q1

Type: applied scenario / application

Stem: A model gets every training example right but fails on new validation examples. What problem is showing up?

Correct choice: v0279-overfitting-generalization-q1-correct

  - v0279-overfitting-generalization-q1-correct: Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize. (correct)
    - feedback: Good diagnosis. The set-aside validation examples reveal whether the pattern transfers.
  - v0279-overfitting-generalization-q1-generalization: Generalization: the model is working well on unseen cases.
    - feedback: Not quite. Generalization means good performance on new examples; this scenario shows the opposite.
    - misconception: overfitting vs generalization
    - term: generalization
    - source: same-card; rationale: Tempting because both terms describe training performance.
  - v0279-overfitting-generalization-q1-better-training: Better training: the model has clearly learned the general rule.
    - feedback: Not quite. If it fails on new validation examples, high training performance is not enough evidence of generalization.
    - misconception: training performance vs validation failure
    - term: training-data
    - source: same-card; rationale: Tempting because perfect training performance feels reassuring.
  - v0279-overfitting-generalization-q1-inference: Inference: the model is simply generating one token at a time.
    - feedback: Close, but inference is normal model use; overfitting is a training/evaluation failure mode.
    - misconception: training/evaluation failure vs inference process
    - term: inference
    - source: nearby-stage; rationale: Tempting because all later model use involves inference.

### Q2: v0279-overfitting-generalization-q2

Type: human-use judgment / human-use-judgment

Stem: Why do model builders test on set-aside validation examples instead of only training examples?

Correct choice: v0279-overfitting-generalization-q2-correct

  - v0279-overfitting-generalization-q2-correct: Set-aside validation examples checks whether learned patterns work on examples the model did not train on. (correct)
    - feedback: Insight strengthened. Validation is about transfer, not memorized training performance.
  - v0279-overfitting-generalization-q2-extra-training: Validation data is just extra training data used to lower loss.
    - feedback: Not quite. Validation data is saved for testing to check transfer; it should not simply be another set of examples used to fit weights.
    - misconception: validation data vs training data
    - term: validation-data
    - source: same-card; rationale: Tempting because validation examples can look like more examples.
  - v0279-overfitting-generalization-q2-training-proves-all: Training examples alone prove the model will work everywhere.
    - feedback: This choice reveals the exact overfitting risk. Seen examples are not enough evidence.
    - misconception: training performance vs generalization
    - term: training-data
    - source: same-card; rationale: Tempting because high training accuracy feels reassuring.
  - v0279-overfitting-generalization-q2-loss-truth: A lower loss always proves every future answer is true.
    - feedback: Close, but lower loss is not a truth guarantee, especially outside the tested examples.
    - misconception: loss/probability vs truth guarantee
    - term: loss
    - source: nearby-stage; rationale: Tempting because lower loss often signals improvement.

### Q3: v0279-overfitting-generalization-q3

Type: causal consequence / causal-consequence

Stem: A model trained heavily on one narrow answer template works on that template but struggles with varied new prompts. What should a model-literate learner suspect?

Correct choice: v0279-overfitting-generalization-q3-correct

  - v0279-overfitting-generalization-q3-correct: It may have fit the narrow examples too closely instead of learning a pattern that generalizes. (correct)
    - feedback: Good distinction. Targeted training can help, but narrow training can also make behavior brittle.
  - v0279-overfitting-generalization-q3-prompt-rewrite: The prompts permanently rewrote the model during inference.
    - feedback: Not quite. The issue is training behavior, not prompts rewriting weights during inference.
    - misconception: prompt/context vs training weight changes
    - term: prompt
    - source: nearby-stage; rationale: Tempting because prompts can change output behavior.
  - v0279-overfitting-generalization-q3-conscious-choice: The model is definitely conscious but choosing not to answer.
    - feedback: That gives the model too much mind. The issue is brittle transfer, not intention.
    - misconception: brittle transfer vs intention/conscious choice
    - term: llm
    - source: author-created misconception; rationale: Tempting because poor behavior can seem intentional.
  - v0279-overfitting-generalization-q3-rules-always-better: Rule-based AI is always better than learned models.
    - feedback: This overgeneralizes. The issue is narrow training behavior, not proof that rules always beat learned models.
    - misconception: overfitting diagnosis vs symbolic superiority claim
    - term: symbolic-ai
    - source: nearby-stage; rationale: Tempting because brittleness can make rules feel safer.

## Fine-Tuning

Lesson ID: fine-tuning

Stage: Before Morning

Questions: 3

Question-count rationale: Three questions cover the durable/temporary boundary, a product scenario, and the relationship to alignment without overloading a focused card.

Primary objective: Distinguish durable fine-tuning from temporary prompt, RAG, and sampling-time steering.

Key boundary: Fine-tuning changes weights or adapter behavior for future runs; prompting and RAG shape the current context; sampling chooses a token during generation.

### Q1: v02710-fine-tuning-q1

Type: boundary distinction / boundary

Stem: A team wants a support assistant to answer in a durable house style across future conversations. Which move is closest to fine-tuning?

Correct choice: v02710-fine-tuning-q1-correct

  - v02710-fine-tuning-q1-correct: Run additional training that changes weights or adapter behavior for future responses. (correct)
    - feedback: Good distinction. Fine-tuning is durable shaping after pretraining.
  - v02710-fine-tuning-q1-better-prompt: Write one clearer prompt for the current chat.
    - feedback: Not quite. A prompt can steer the current run, but fine-tuning changes future behavior through training.
    - misconception: prompting vs durable fine-tuning
    - term: prompt
    - source: same-card; rationale: Tempting because prompts can strongly steer one answer.
  - v02710-fine-tuning-q1-rag: Retrieve one policy PDF into the current context.
    - feedback: Close, but RAG adds temporary context. Fine-tuning is a training process that durably shapes behavior.
    - misconception: retrieval/context vs training
    - term: RAG
    - source: same-card; rationale: Tempting because retrieved text can improve one answer.
  - v02710-fine-tuning-q1-sampling: Sample the next token from the current probability cloud.
    - feedback: That describes decoding during inference. It chooses a token; it does not adapt the model for future runs.
    - misconception: decoding vs training
    - term: sampling
    - source: same-card; rationale: Tempting because sampling is part of response generation.

### Q2: v02710-fine-tuning-q2

Type: applied scenario / application

Stem: A base model is adapted on thousands of institution-specific examples, then later answers new users in that style. What changed most directly?

Correct choice: v02710-fine-tuning-q2-correct

  - v02710-fine-tuning-q2-correct: The adapted model’s weights or adapter behavior can carry that pattern into later inference runs. (correct)
    - feedback: Insight strengthened. Fine-tuning makes a reusable model change, not just a one-chat hint.
  - v02710-fine-tuning-q2-context-only: Only the current context window got larger.
    - feedback: Not quite. A larger context window is temporary input space; fine-tuning changes reusable behavior.
    - misconception: context window vs fine-tuned behavior
    - term: context window
    - source: nearby-stage; rationale: Tempting because context can also carry institution-specific text.
  - v02710-fine-tuning-q2-memory: The model became conscious of the institution’s norms.
    - feedback: That gives the model too much mind. The behavior can be shaped without conscious commitment to norms.
    - misconception: mind/metaphor overreach
    - term: alignment
    - source: explicit-confusable; rationale: Tempting because the assistant may sound norm-aware.
  - v02710-fine-tuning-q2-rag-search: The model must search the institution’s files every time.
    - feedback: Close, but fine-tuning and retrieval are different. Retrieval may be added, but fine-tuned behavior can persist in weights or adapters.
    - misconception: retrieval vs fine-tuning
    - term: retrieval
    - source: same-stage; rationale: Tempting because many institutional assistants also use search.

### Q3: v02710-fine-tuning-q3

Type: causal consequence / causal-consequence

Stem: If fine-tuning is used for alignment, what does that mean about future model behavior?

Correct choice: v02710-fine-tuning-q3-correct

  - v02710-fine-tuning-q3-correct: Training can make some instruction-following or preference patterns more likely in later responses. (correct)
    - feedback: Good distinction. Fine-tuning can support alignment by durably shaping output patterns.
  - v02710-fine-tuning-q3-perfect-safety: Every future answer is guaranteed safe and true.
    - feedback: Not quite. Fine-tuning can improve behavior, but it does not guarantee truth or safety.
    - misconception: alignment/fine-tuning as guarantee
    - term: alignment
    - source: nearby-stage; rationale: Tempting because alignment sounds like solving behavior.
  - v02710-fine-tuning-q3-system-prompt-only: Only the visible system prompt changed for one session.
    - feedback: Close, but a system prompt steers the current run. Fine-tuning is durable training.
    - misconception: runtime steering vs durable training
    - term: system prompt
    - source: same-card; rationale: Tempting because system prompts can steer behavior strongly.
  - v02710-fine-tuning-q3-inner-values: The model acquired human values and moral agency.
    - feedback: That gives the model too much mind. Fine-tuning changes output patterns; it does not create moral agency.
    - misconception: behavior shaping vs moral agency
    - term: alignment
    - source: explicit-confusable; rationale: Tempting because aligned behavior can sound value-driven.

## Alignment

Lesson ID: alignment

Stage: Before Morning

Questions: 4

Question-count rationale: Four questions are warranted because alignment mixes durable training, runtime controls, evaluation, and human-use boundaries.

Primary objective: Reason about alignment as behavior shaping across training, system design, evaluation, and runtime controls without mistaking it for conscience or guaranteed truth.

Key boundary: Alignment can use fine-tuning, preference optimization, system prompts, policies, filters, and evaluation; it shapes behavior but does not make the model morally aware.

### Q1: v02710-alignment-q1

Type: boundary distinction / boundary

Stem: An alignment-shaped assistant refuses a harmful request and follows a safer instruction instead. What should a model-literate learner conclude?

Correct choice: v02710-alignment-q1-correct

  - v02710-alignment-q1-correct: Its behavior was shaped toward instructions and safety boundaries, but that does not prove moral understanding. (correct)
    - feedback: Good distinction. Alignment shapes behavior; it is not magic morality.
  - v02710-alignment-q1-conscious: The model must understand morality the way a person does.
    - feedback: That gives the model too much mind. Refusal behavior can be shaped without human moral understanding.
    - misconception: aligned behavior vs moral agency
    - term: alignment
    - source: same-card; rationale: Tempting because refusals can sound principled.
  - v02710-alignment-q1-truth: Every answer from the assistant is now guaranteed true.
    - feedback: Not quite. Alignment can shape behavior, but it does not guarantee factual truth.
    - misconception: alignment vs truth guarantee
    - term: truth
    - source: nearby-stage; rationale: Tempting because safer behavior can feel more trustworthy.
  - v02710-alignment-q1-no-model: The LLM stopped using learned weights and became a rulebook.
    - feedback: Close, but an aligned product can still use a learned model plus rules, filters, or policies.
    - misconception: alignment controls vs learned model
    - term: rule-based AI
    - source: explicit-confusable; rationale: Tempting because aligned products may use rules or filters.

### Q2: v02710-alignment-q2

Type: model trace / model-trace

Stem: A product uses instruction fine-tuning, a system prompt, and a policy filter around one LLM. Which alignment map is most useful?

Correct choice: v02710-alignment-q2-correct

  - v02710-alignment-q2-correct: Some alignment changes can be durable training changes, while other controls steer or filter the current run. (correct)
    - feedback: Insight strengthened. Alignment can happen through several layers, not one magic switch.
  - v02710-alignment-q2-all-weights: Every alignment layer permanently rewrites the model weights.
    - feedback: Not quite. Fine-tuning may change weights, but system prompts and filters can steer behavior at runtime.
    - misconception: runtime control vs durable weight update
    - term: weight update
    - source: same-card; rationale: Tempting because all layers affect visible behavior.
  - v02710-alignment-q2-only-prompt: Alignment is only a better prompt typed by the user.
    - feedback: Close, but alignment can include training, policies, evaluation, and runtime controls beyond the user prompt.
    - misconception: alignment vs user prompting only
    - term: prompt
    - source: nearby-stage; rationale: Tempting because prompts are visible and powerful.
  - v02710-alignment-q2-sampling-only: Alignment is the same thing as sampling the most probable token.
    - feedback: Sampling chooses a next token from probabilities. Alignment shapes or constrains behavior around that process.
    - misconception: alignment vs decoding
    - term: sampling
    - source: nearby-stage; rationale: Tempting because both affect the final response.

### Q3: v02710-alignment-q3

Type: human-use judgment / human-use-judgment

Stem: Why do teams evaluate aligned models with tests and human feedback after training or deployment?

Correct choice: v02710-alignment-q3-correct

  - v02710-alignment-q3-correct: Because shaped behavior can still fail, drift, or create unexpected tradeoffs in new situations. (correct)
    - feedback: Good distinction. Alignment needs evaluation; it is not a one-time guarantee.
  - v02710-alignment-q3-conscious-test: To check whether the model has developed a conscience.
    - feedback: Not quite. Evaluation checks behavior and outcomes, not inner conscience.
    - misconception: evaluation vs consciousness
    - term: evaluation
    - source: same-card; rationale: Tempting because evaluations judge behavior.
  - v02710-alignment-q3-no-need: Because aligned models no longer need human review.
    - feedback: This choice overclaims. Aligned systems can still need review, monitoring, and accountability.
    - misconception: alignment vs human review
    - term: human review
    - source: nearby-stage; rationale: Tempting because alignment sounds like completion.
  - v02710-alignment-q3-loss-only: Because lower training loss alone proves the model is safe.
    - feedback: Close, but loss alone is not a full safety or usefulness evaluation.
    - misconception: loss vs safety/behavior evaluation
    - term: loss
    - source: nearby-stage; rationale: Tempting because loss is an important training signal.

### Q4: v02710-alignment-q4

Type: misconception diagnosis / misconception-check

Stem: A guardrail blocks one unsafe response from reaching the user. What changed most directly?

Correct choice: v02710-alignment-q4-correct

  - v02710-alignment-q4-correct: A policy or filter layer affected the visible response; that does not necessarily mean the model weights changed. (correct)
    - feedback: Good distinction. Guardrails can be runtime controls around a model.
  - v02710-alignment-q4-finetune: The base model was definitely fine-tuned at that moment.
    - feedback: Not quite. A filter can block output during runtime without retraining the model.
    - misconception: filtering vs fine-tuning
    - term: fine-tuning
    - source: same-card; rationale: Tempting because both can change visible behavior.
  - v02710-alignment-q4-truth: The response became guaranteed factual because it passed a guardrail.
    - feedback: Passing a guardrail is not the same as being true. Evidence and review can still matter.
    - misconception: policy compliance vs truth
    - term: truth
    - source: author-created misconception; rationale: Tempting because allowed output may feel approved.
  - v02710-alignment-q4-awareness: The model realized the request was wrong.
    - feedback: That gives the model too much mind. The visible behavior can come from shaped model behavior or surrounding controls.
    - misconception: guardrail behavior vs awareness
    - term: llm
    - source: explicit-confusable; rationale: Tempting because the refusal may sound reflective.

## Inference

Lesson ID: inference

Stage: Morning Commute

Questions: 4

Question-count rationale: Four questions fit because inference is a dense gateway concept connecting fixed weights, temporary states, context, and generation.

Primary objective: Explain ordinary inference as fixed weights plus temporary context-shaped computation, not durable learning.

Key boundary: Inference uses learned weights to compute temporary internal states and next-token scores; it normally does not update weights or training data.

### Q1: v02710-inference-q1

Type: mechanism in action / mechanism

Stem: During ordinary inference, the current context enters the model. What changes temporarily, and what usually stays fixed?

Correct choice: v02710-inference-q1-correct

  - v02710-inference-q1-correct: Temporary activations and hidden states change; learned weights usually stay fixed. (correct)
    - feedback: Good distinction. Inference uses the map without redrawing it.
  - v02710-inference-q1-weights-change: The learned weights change after every user prompt.
    - feedback: Not quite. Ordinary inference can use context, but it usually does not rewrite weights.
    - misconception: inference vs training update
    - term: training
    - source: same-card; rationale: Tempting because the model may adapt within a conversation.
  - v02710-inference-q1-dataset: The training dataset changes to include the new prompt.
    - feedback: This choice reveals a common mix-up. A prompt can be current context without joining the training dataset.
    - misconception: prompt/context vs training data
    - term: training data
    - source: same-card; rationale: Tempting because prompts feel like new information.
  - v02710-inference-q1-conscious: The model’s conscious attention shifts to the user’s intent.
    - feedback: That gives the model too much mind. Inference computes temporary vectors; it is not conscious attention.
    - misconception: attention/activation vs awareness
    - term: attention
    - source: nearby-stage; rationale: Tempting because the response may seem attentive.

### Q2: v02710-inference-q2

Type: model trace / model-trace

Stem: In one inference step, which trace best matches the model’s next-token path?

Correct choice: v02710-inference-q2-correct

  - v02710-inference-q2-correct: Context enters a forward pass, temporary states form, logits are produced, and sampling can choose a token. (correct)
    - feedback: Insight strengthened. That is the live next-token path through inference.
  - v02710-inference-q2-training-loop: Example enters training, loss updates weights, and a future model checkpoint is saved.
    - feedback: Close, but that is a training path. Inference uses existing weights to produce the next-token scores.
    - misconception: training loop vs inference trace
    - term: training
    - source: nearby-stage; rationale: Tempting because it is also a model computation path.
  - v02710-inference-q2-rag-loop: Retriever searches outside documents, then the model permanently learns the snippets.
    - feedback: Retrieval can add context before inference, but it does not by itself make the model permanently learn snippets.
    - misconception: retrieval/context vs durable learning
    - term: RAG
    - source: nearby-stage; rationale: Tempting because retrieval may happen before generation.
  - v02710-inference-q2-tokenizer-only: Tokenizer splits text and the answer appears without model layers.
    - feedback: Tokenization prepares input, but inference still runs model layers to produce scores.
    - misconception: tokenization vs model forward pass
    - term: tokenization
    - source: same-stage; rationale: Tempting because tokenization is an early required step.

### Q3: v02710-inference-q3

Type: applied scenario / application

Stem: A chatbot remembers an earlier line in the same conversation and uses it in the next answer. What is the best model-level explanation?

Correct choice: v02710-inference-q3-correct

  - v02710-inference-q3-correct: The earlier line is still in the current context, so fixed weights can use it during inference. (correct)
    - feedback: Good distinction. Context can feel like memory while still being temporary input.
  - v02710-inference-q3-weight-memory: The earlier line was written into the model’s weights.
    - feedback: Not quite. Same-conversation context is temporary input, not necessarily a weight update.
    - misconception: context vs durable memory
    - term: memory
    - source: explicit-confusable; rationale: Tempting because the model appears to remember.
  - v02710-inference-q3-training-now: The chatbot fine-tuned itself on the earlier line.
    - feedback: Close, but adaptation within a context window is not the same as fine-tuning.
    - misconception: ordinary inference vs fine-tuning
    - term: fine-tuning
    - source: same-stage; rationale: Tempting because the answer adapts to the conversation.
  - v02710-inference-q3-search-all: The model searched every document it was pretrained on.
    - feedback: This describes search better than ordinary inference. The model can use visible context without searching training sources.
    - misconception: inference vs search/retrieval
    - term: retrieval
    - source: nearby-stage; rationale: Tempting because the answer may include earlier information.

### Q4: v02710-inference-q4

Type: causal consequence / causal-consequence

Stem: If ordinary inference normally does not update weights, what follows for future conversations?

Correct choice: v02710-inference-q4-correct

  - v02710-inference-q4-correct: A useful answer now does not automatically teach the base model to behave differently tomorrow. (correct)
    - feedback: Insight strengthened. Inference can be useful without being durable training.
  - v02710-inference-q4-auto-learn: Every good answer automatically becomes permanent skill.
    - feedback: Not quite. Durable skill changes require training or another model-update process.
    - misconception: inference vs durable learning
    - term: training
    - source: same-card; rationale: Tempting because the response looks like successful practice.
  - v02710-inference-q4-no-context: The current prompt cannot affect the answer at all.
    - feedback: Close, but fixed weights can still respond differently to different current contexts.
    - misconception: context influence vs weight update
    - term: prompt
    - source: same-card; rationale: Tempting because weights stay fixed.
  - v02710-inference-q4-no-risk: There is no need to review outputs because inference is temporary.
    - feedback: This choice overclaims. Temporary outputs can still affect people and decisions, so review can matter.
    - misconception: temporary computation vs output risk
    - term: human review
    - source: nearby-stage; rationale: Tempting because temporary sounds harmless.

## Prompt vs Response

Lesson ID: prompt-response

Stage: Morning Commute

Questions: 3

Question-count rationale: Three questions cover the given/generated boundary, append-and-repeat trace, and a common permanent-learning misconception.

Primary objective: Separate given prompt/context tokens from generated response tokens and explain append-and-repeat generation.

Key boundary: Prompt tokens are given; response tokens are generated one at a time, appended, and used as context for the next inference step.

### Q1: v02710-prompt-response-q1

Type: boundary distinction / boundary

Stem: A user gives a complete prompt, then the model begins writing response tokens. Which boundary matters most?

Correct choice: v02710-prompt-response-q1-correct

  - v02710-prompt-response-q1-correct: Prompt tokens are given to the model; response tokens are generated and then appended to context. (correct)
    - feedback: Good distinction. Prompt is given; response is generated and appended.
  - v02710-prompt-response-q1-all-user: Both prompt and response tokens were typed by the user.
    - feedback: Not quite. The user provides the prompt; the model generates response tokens.
    - misconception: prompt vs generated response
    - term: response
    - source: same-card; rationale: Tempting because both can appear together in the conversation transcript.
  - v02710-prompt-response-q1-all-at-once: The model writes the whole response at once after reading the prompt.
    - feedback: Close, but the model generates response tokens step by step.
    - misconception: autoregressive generation vs full answer at once
    - term: autoregression
    - source: same-card; rationale: Tempting because the interface may show a smooth answer.
  - v02710-prompt-response-q1-weight-update: Each response token permanently updates the model’s weights.
    - feedback: This choice reveals a common mix-up. Response tokens can shape the current run without updating weights.
    - misconception: generated context vs durable training
    - term: training
    - source: nearby-stage; rationale: Tempting because response-so-far shapes later tokens.

### Q2: v02710-prompt-response-q2

Type: model trace / model-trace

Stem: After the model chooses one next response token, what does the next inference step see?

Correct choice: v02710-prompt-response-q2-correct

  - v02710-prompt-response-q2-correct: The original prompt plus the response so far, including the newly appended token. (correct)
    - feedback: Insight strengthened. The context grows as generated response tokens are appended.
  - v02710-prompt-response-q2-only-new-token: Only the newly chosen token, with the prompt removed.
    - feedback: Not quite. The next step can use the prompt and response-so-far that remain in context.
    - misconception: context accumulation vs isolated token
    - term: context window
    - source: same-card; rationale: Tempting because the new token is the most recent event.
  - v02710-prompt-response-q2-weight-memory: A permanent memory of the token stored in model weights.
    - feedback: Close, but using a token later in the run is context, not a weight update.
    - misconception: response-so-far vs weight memory
    - term: weight
    - source: nearby-stage; rationale: Tempting because the model uses the new token later.
  - v02710-prompt-response-q2-softmax-removed: No context, because softmax disappears after one token.
    - feedback: Softmax can help choose a token, but the chosen token can still be appended to the next context.
    - misconception: decoding step vs context persistence
    - term: softmax
    - source: nearby-stage; rationale: Tempting because softmax is a later token-choice mechanism.

### Q3: v02710-prompt-response-q3

Type: misconception diagnosis / misconception-check

Stem: A generated response improves after the user adds a clarifying sentence. What changed most directly?

Correct choice: v02710-prompt-response-q3-correct

  - v02710-prompt-response-q3-correct: The current prompt/context changed, so the next response tokens were generated from better input. (correct)
    - feedback: Good distinction. Better context can improve the current response without training the model.
  - v02710-prompt-response-q3-finetuned: The model was fine-tuned by the clarifying sentence.
    - feedback: Not quite. A clarifying sentence can steer the current run; fine-tuning is additional training.
    - misconception: prompt steering vs fine-tuning
    - term: fine-tuning
    - source: same-stage; rationale: Tempting because the answer improves after feedback.
  - v02710-prompt-response-q3-conscious: The model understood its mistake like a person and decided to improve.
    - feedback: That gives the model too much mind. Better output can come from better context.
    - misconception: human revision vs generated behavior
    - term: llm
    - source: explicit-confusable; rationale: Tempting because the interaction resembles human revision.
  - v02710-prompt-response-q3-no-effect: Prompts cannot affect generated response tokens.
    - feedback: Close, but fixed weights still process different prompts into different response probabilities.
    - misconception: prompt influence vs fixed weights
    - term: prompt
    - source: same-card; rationale: Tempting because weights stay fixed during inference.

## Tokenization

Lesson ID: tokens

Stage: Morning Commute

Questions: 3

Question-count rationale: Three questions cover chunk shape, representation sequence, and the token-versus-meaning misconception.

Primary objective: Explain tokenization as the split from text into model-readable chunks that may not match human words.

Key boundary: Tokenization is a representation step before token IDs and embedding lookup; it does not update model weights or guarantee meaning.

### Q1: v02710-tokens-q1

Type: applied scenario / application

Stem: A tokenizer splits “startled.” into pieces like “start”, “led”, and “.” What should that tell a learner?

Correct choice: v02710-tokens-q1-correct

  - v02710-tokens-q1-correct: Tokens can be uneven text chunks, including word pieces and punctuation. (correct)
    - feedback: Good distinction. Tokens are model-readable chunks, not always whole words.
  - v02710-tokens-q1-whole-word: Every token must be a complete dictionary word.
    - feedback: Not quite. Tokenizers can split words, punctuation, spaces, or other chunks.
    - misconception: token vs word
    - term: token
    - source: same-card; rationale: Tempting because many displayed tokens look word-like.
  - v02710-tokens-q1-memory: Each token is a permanent memory stored in the model.
    - feedback: This choice reveals a common mix-up. A token is a representation chunk, not memory by itself.
    - misconception: token vs memory
    - term: memory
    - source: author-created misconception; rationale: Tempting because tokens are reused in later processing.
  - v02710-tokens-q1-concept: Each token is exactly one human concept.
    - feedback: Close, but token boundaries do not perfectly match human concepts or meanings.
    - misconception: token chunk vs meaning/concept
    - term: embedding
    - source: nearby-stage; rationale: Tempting because tokens often carry meaning clues.

### Q2: v02710-tokens-q2

Type: model trace / model-trace

Stem: Before transformer layers process text, which tokens-to-IDs-to-embeddings path comes first?

Correct choice: v02710-tokens-q2-correct

  - v02710-tokens-q2-correct: Text is split into tokens, tokens map to token IDs, and IDs look up embeddings. (correct)
    - feedback: Insight strengthened. Tokenization starts the bridge from text to numerical computation.
  - v02710-tokens-q2-raw-english: Raw English sentences move through every layer without numerical representation.
    - feedback: Not quite. The model needs numerical representations, starting with tokens and IDs.
    - misconception: raw text vs numerical representation
    - term: tokenization
    - source: same-card; rationale: Tempting because users see text at the interface.
  - v02710-tokens-q2-weights-first: Weights are rewritten before text becomes tokens.
    - feedback: Close, but tokenization prepares the input; it does not rewrite weights.
    - misconception: tokenization vs training update
    - term: weight
    - source: nearby-stage; rationale: Tempting because weights are central to the model.
  - v02710-tokens-q2-response-first: The model generates the finished response before tokenization happens.
    - feedback: Generation also uses tokens. Text needs token representation before model layers can process it.
    - misconception: generation order vs tokenization
    - term: response
    - source: same-stage; rationale: Tempting because users notice the final text first.

### Q3: v02710-tokens-q3

Type: boundary distinction / boundary

Stem: Both the user prompt and the generated response eventually appear as text. How does tokenization treat them?

Correct choice: v02710-tokens-q3-correct

  - v02710-tokens-q3-correct: Prompt text and generated response text can both be represented as tokens. (correct)
    - feedback: Good distinction. Tokenization applies to text entering and leaving the generation loop.
  - v02710-tokens-q3-prompt-only: Only prompt text becomes tokens; response text skips token IDs.
    - feedback: Not quite. Generated response tokens are token IDs before being displayed as text.
    - misconception: prompt token vs response token
    - term: response token
    - source: same-card; rationale: Tempting because the user sees the response as text.
  - v02710-tokens-q3-response-only: Only response text becomes tokens; prompts stay as raw English.
    - feedback: Close, but prompts also need token representation before model processing.
    - misconception: prompt token vs raw prompt
    - term: prompt token
    - source: same-card; rationale: Tempting because prompts feel natural to humans.
  - v02710-tokens-q3-training: Tokenizing either one permanently trains the model.
    - feedback: This choice reveals a common mix-up. Tokenization represents text; it does not update weights.
    - misconception: tokenization vs training
    - term: training
    - source: nearby-stage; rationale: Tempting because tokenization is a required model step.

## Token IDs

Lesson ID: token-ids

Stage: Morning Commute

Questions: 3

Question-count rationale: Three questions cover lookup-key mechanics, meaning misconception, and generated-token flow.

Primary objective: Explain token IDs as lookup numbers that point from token chunks to learned embedding vectors, not meanings by themselves.

Key boundary: A token ID is a stable lookup key in a tokenizer/model setup; using it retrieves embeddings but does not guarantee truth or update weights.

### Q1: v02710-token-ids-q1

Type: mechanism in action / mechanism

Stem: After tokenization, the token “dog” maps to an integer ID. What does the model use that ID for next?

Correct choice: v02710-token-ids-q1-correct

  - v02710-token-ids-q1-correct: To look up a learned starting vector in the embedding table. (correct)
    - feedback: Good distinction. The ID is a lookup key for an embedding vector.
  - v02710-token-ids-q1-meaning: To store the complete meaning of dog inside the number itself.
    - feedback: Not quite. The number itself is not the meaning; it points to learned numerical patterns.
    - misconception: ID number vs learned meaning pattern
    - term: token ID
    - source: same-card; rationale: Tempting because the ID consistently points to that token.
  - v02710-token-ids-q1-memory: To permanently remember this user’s sentence.
    - feedback: This choice reveals a common mix-up. Token IDs represent chunks; they do not store a user memory.
    - misconception: representation vs durable memory
    - term: memory
    - source: author-created misconception; rationale: Tempting because IDs are reusable in model processing.
  - v02710-token-ids-q1-skip: To skip embeddings and tensors entirely.
    - feedback: Close, but the ID is a lookup key; embeddings and tensors still carry numerical representation forward.
    - misconception: token ID vs embedding/tensor pipeline
    - term: embedding
    - source: same-card; rationale: Tempting because the ID is already numeric.

### Q2: v02710-token-ids-q2

Type: boundary distinction / boundary

Stem: A learner says “982 means cat because the ID is the meaning.” What correction is most model-literate?

Correct choice: v02710-token-ids-q2-correct

  - v02710-token-ids-q2-correct: 982 is a lookup number for a token; meaning comes from learned patterns around embeddings and model layers. (correct)
    - feedback: Insight strengthened. The ID points into the system; it is not understanding by itself.
  - v02710-token-ids-q2-conscious: 982 means cat because the model consciously understands the number.
    - feedback: That gives the model too much mind. A lookup number does not imply conscious understanding.
    - misconception: ID/meaning vs consciousness
    - term: llm
    - source: explicit-confusable; rationale: Tempting because the model uses the ID fluently.
  - v02710-token-ids-q2-truth: 982 guarantees every sentence about cats will be true.
    - feedback: Not quite. Token IDs do not guarantee factual output.
    - misconception: token ID vs truth
    - term: truth
    - source: nearby-stage; rationale: Tempting because the token has a stable identity.
  - v02710-token-ids-q2-random-every-run: 982 is randomly redefined every time the user sends a prompt.
    - feedback: Close, but token ID mappings are fixed for a tokenizer/model setup; sampling randomness is a different step.
    - misconception: stable tokenizer mapping vs per-run randomness
    - term: tokenizer
    - source: same-card; rationale: Tempting because sampling can be random later.

### Q3: v02710-token-ids-q3

Type: model trace / model-trace

Stem: During generation, the model chooses a next response token ID before the user sees text. What happens after that?

Correct choice: v02710-token-ids-q3-correct

  - v02710-token-ids-q3-correct: The chosen ID can be displayed as text and appended as a response token in the current context. (correct)
    - feedback: Good distinction. Generated tokens are IDs before they become visible text.
  - v02710-token-ids-q3-weight-update: The chosen ID permanently updates the model weights.
    - feedback: Not quite. The chosen token can affect the next context without changing weights.
    - misconception: generated token vs training update
    - term: weight
    - source: nearby-stage; rationale: Tempting because the token affects the next step.
  - v02710-token-ids-q3-raw-word: The model skips IDs and chooses only raw human words.
    - feedback: Close, but the model works with token IDs before text is displayed.
    - misconception: token IDs vs raw text generation
    - term: token
    - source: same-card; rationale: Tempting because users see words on screen.
  - v02710-token-ids-q3-retrieve-source: The ID retrieves the original training document for that word.
    - feedback: This describes retrieval better than token ID lookup. Token IDs point to token representations, not original documents.
    - misconception: token ID lookup vs retrieval/source
    - term: retrieval
    - source: nearby-stage; rationale: Tempting because lookup sounds like fetching a source.
