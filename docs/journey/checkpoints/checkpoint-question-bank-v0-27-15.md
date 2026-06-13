# Prompt Life v0.27.15 Checkpoint Bank

Version: 0.27.15-answer-giveaway-visual-nav
Active label: v0.27.15-answer-giveaway-repair

This bank preserves the v0.27.14 human-test bank and applies a focused answer-giveaway repair pass.

## What Is an LLM? (2)

Objective: Explain that an LLM uses learned weights plus current context to score and generate next tokens without implying awareness, search, or permanent learning.

### Q1. When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?

- Correct `v0279-what-is-llm-q1-correct`: It scores next tokens from context, appends one, and repeats.
  - Feedback: Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.
- Distractor `v0279-what-is-llm-q1-conscious-reader`: It reads with conscious understanding, then writes the whole answer at once.
  - Feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
- Distractor `v0279-what-is-llm-q1-hidden-search`: It searches a hidden database and copies the best matching passage.
  - Feedback: This choice reveals a common mix-up. Search can be added around a model, but a plain LLM generates from context and learned weights.
- Distractor `v0279-what-is-llm-q1-weight-change`: It changes its weights each time the user sends a new prompt.
  - Feedback: That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.

### Q2. An LLM gives a fluent explanation of a poem. What should a model-literate learner conclude?

- Correct `v0279-what-is-llm-q2-correct`: It generated tokens from context and learned patterns; fluency is not awareness.
  - Feedback: Insight strengthened. This is the fluent-behavior-without-awareness boundary Prompt Life wants learners to hold.
- Distractor `v0279-what-is-llm-q2-inner-awareness`: It must have inner awareness because the explanation sounds human.
  - Feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
- Distractor `v0279-what-is-llm-q2-hidden-source`: It must have found a hidden perfect source and copied the interpretation.
  - Feedback: Close, but this describes search or retrieval better than a plain LLM response. A fluent answer is not the same as cited evidence.
- Distractor `v0279-what-is-llm-q2-prompt-learning`: The poem prompt permanently taught the base model a new skill.
  - Feedback: That would require training. A normal prompt can shape temporary context without durably updating weights.

## Where LLMs Fit (3)

Objective: Use the AI family map to distinguish AI, ML, deep learning, generative AI, LLMs, diffusion models, multimodal systems, and AI products.

### Q1. A campus tool summarizes text with an LLM, while another creates images by denoising noisy patterns. What does that show?

- Correct `v0279-where-llms-fit-q1-correct`: Generative AI is a family; LLMs and denoising image models are different branches.
  - Feedback: Good distinction. Generative AI is a family, and different branches can use different mechanisms.
- Distractor `v0279-where-llms-fit-q1-all-llms`: All generative AI tools are LLMs because ChatGPT is generative AI.
  - Feedback: Not quite. An LLM is one kind of generative AI, not the whole category. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v0279-where-llms-fit-q1-text-only-ai`: The image tool is not AI unless it generates language tokens.
  - Feedback: Close, but image models can be AI without using the LLM text-token loop. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v0279-where-llms-fit-q1-ai-ml-same`: AI and machine learning are the same label, so the branches do not matter.
  - Feedback: This choice collapses useful categories. Machine learning is a major branch inside the broader AI field.

### Q2. A department uses the words AI, machine learning, generative AI, and LLM as if they mean the same thing. Which correction keeps the category map clear?

- Correct `v02712-where-llms-fit-q2-correct`: AI is broad; ML learns from data; LLMs generate language or code.
  - Feedback: Insight strengthened. The map matters because an LLM is one branch inside a wider AI landscape.
- Distractor `v02712-where-llms-fit-q2-2-llm`: All AI systems are LLMs if they use language.
  - Feedback: That collapses the broad AI family into one model type. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-where-llms-fit-q2-3-machine-learning`: Machine learning and AI are exact synonyms.
  - Feedback: That misses that machine learning is a major branch inside broader AI. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-where-llms-fit-q2-4-diffusion-model`: Diffusion models and LLMs use the same generation loop.
  - Feedback: That treats different generative methods as if they shared one mechanism. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.

### Q3. A chatbot product includes an LLM, a search tool, safety filters, and a user interface. What is the LLM?

- Correct `v0279-where-llms-fit-q3-correct`: The language-generating model inside the larger product.
  - Feedback: Good distinction. A product may wrap an LLM with tools, policies, and interface pieces.
- Distractor `v0279-where-llms-fit-q3-whole-app`: The whole app, including every tool and button.
  - Feedback: Not quite. The product can include an LLM, but the LLM is not every surrounding tool and screen.
- Distractor `v0279-where-llms-fit-q3-safety-policy`: The safety policy that blocks some outputs.
  - Feedback: Close, but a safety policy shapes behavior around the model; it is not the language model itself.
- Distractor `v0279-where-llms-fit-q3-search-index`: The database or search index the app may call.
  - Feedback: This describes a retrieval or search component. The LLM generates language from context and learned weights.

## Rationalists vs Empiricists (3)

Objective: Compare rules-first AI and learned-pattern AI while recognizing that modern systems can combine rules, retrieval, policies, tools, and learned models.

### Q1. If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?

- Correct `v0279-history-q1-correct`: The rule-based system follows written rules; the LLM uses weights shaped by examples.
  - Feedback: Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.
- Distractor `v0279-history-q1-loss-every-task`: The rule-based system measures loss and updates weights after every task.
  - Feedback: Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.
- Distractor `v0279-history-q1-conscious-llm`: The LLM has conscious reasoning, while the rule-based system has none.
  - Feedback: That gives the LLM too much mind. The key boundary here is learned weights versus explicit rules.
- Distractor `v0279-history-q1-all-rules`: There is no difference; both systems are just written rulebooks.
  - Feedback: Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.

### Q2. During deep-learning training, why does the system measure loss?

- Correct `v0279-history-q2-correct`: Loss measures prediction error so an optimizer can adjust weights.
  - Feedback: Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.
- Distractor `v0279-history-q2-moral-good`: Loss tells the model whether a generated answer is morally good.
  - Feedback: Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.
- Distractor `v0279-history-q2-confidence-score`: Loss is the model’s confidence score for the next token during generation.
  - Feedback: Close, but confidence or probability shapes generation. Loss measures training error so weights can be adjusted.
- Distractor `v0279-history-q2-final-answer`: Loss writes the final answer after the model has finished thinking.
  - Feedback: Not quite. Loss is used during training; it is not the model writing a response. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. A university AI app combines an LLM, hand-written policy checks, and a handbook lookup tool. What should a model-literate user infer?

- Correct `v02712-history-q3-correct`: The product is hybrid; the LLM remains learned-pattern AI.
  - Feedback: Good distinction. Modern AI products can mix traditions without making the model itself rule-based.
- Distractor `v02712-history-q3-2-symbolic-ai`: The hand-written checks turn the LLM into symbolic AI.
  - Feedback: That confuses a product wrapper with the model inside it. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-history-q3-3-rag`: The handbook lookup permanently rewrites the model weights.
  - Feedback: Retrieval can add context without becoming durable training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-history-q3-4-alignment`: The policy checks prove the model has moral understanding.
  - Feedback: Policy behavior is not the same as conscience or awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

## Training (4)

Objective: Trace training as example, prediction, loss, optimizer, weight update, repeat; separate durable training from inference, retrieval, sampling, and prompt changes.

### Q1. During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?

- Correct `v0279-training-q1-correct`: The training process uses the loss signal to update weights.
  - Feedback: Good distinction. The durable weight update is what makes this training.
- Distractor `v0279-training-q1-append-response`: The model appends the mistaken token to a normal live response.
  - Feedback: Not quite. Appending a response token is inference behavior; training uses loss to change weights.
- Distractor `v0279-training-q1-durable-memory`: The prompt becomes durable memory stored inside the model’s weights.
  - Feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
- Distractor `v0279-training-q1-likelihood-truth`: The model treats the most likely answer as automatically true.
  - Feedback: Not quite. Likelihood is not truth, and this training moment matters because loss can drive a weight update.

### Q2. A student asks a chatbot one question during ordinary use. Which statement is usually true?

- Correct `v0279-training-q2-correct`: It uses fixed weights and temporary context; the chat does not rewrite weights.
  - Feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
- Distractor `v0279-training-q2-permanent-update`: The chat permanently updates the base model’s weights.
  - Feedback: Not quite. That would require a training process, not ordinary inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v0279-training-q2-durable-memory`: The model stores the prompt as durable memory inside its weights.
  - Feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
- Distractor `v0279-training-q2-optimizer-after-response`: The optimizer trains the model after every response.
  - Feedback: Close, but optimizers update weights during training, not after every normal response.

### Q3. Why can training change how the model behaves tomorrow, while inference usually cannot?

- Correct `v0279-training-q3-correct`: Training changes reusable weights; inference uses temporary computation.
  - Feedback: Good distinction. Durable parameters carry forward; inference-time states usually do not.
- Distractor `v0279-training-q3-optimizer-inference`: Inference is where the optimizer changes weights for future runs.
  - Feedback: Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.
- Distractor `v0279-training-q3-prompt-only`: Training only changes the visible prompt text for one response.
  - Feedback: Close, but prompt changes are temporary input changes; training changes learned numbers.
- Distractor `v0279-training-q3-truth-guarantee`: Training guarantees that every future answer will be true.
  - Feedback: This choice overclaims. Training can improve behavior, but it does not guarantee truth.

### Q4. In a training loop, which sequence is the durable learning path?

- Correct `v0279-training-q4-correct`: Example -> prediction -> loss -> weight update.
  - Feedback: Insight strengthened. That is the weight-changing path.
- Distractor `v0279-training-q4-generation-loop`: Prompt -> response token -> append -> next response token.
  - Feedback: Close, but that sequence describes inference/generation, not training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v0279-training-q4-search-context`: Search -> outside passage -> current context -> answer.
  - Feedback: That describes a search or retrieval step. It can add temporary context; it does not by itself update weights.
- Distractor `v0279-training-q4-user-correction`: User correction -> better answer -> permanent learning inside the same chat.
  - Feedback: Not quite. A correction can steer the current conversation, but durable learning requires a training process.

## Pretraining (4)

Objective: Explain pretraining as broad durable pattern learning from many next-token targets, not perfect recall, live browsing, or a searchable archive.

### Q1. During pretraining, what signal teaches the model broad language patterns across many examples?

- Correct `v0279-pretraining-q1-correct`: Next-token loss changes weights over many training steps.
  - Feedback: Good distinction. Pretraining scales the training loop across many examples.
- Distractor `v0279-pretraining-q1-live-chat`: A user conversation at deployment permanently rewrites the model.
  - Feedback: Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.
- Distractor `v0279-pretraining-q1-written-rules`: A human writes every rule the model will follow.
  - Feedback: Close, but pretraining is learned from examples, not a complete rulebook written by hand.
- Distractor `v0279-pretraining-q1-perfect-copy`: The model stores a perfect copy of every source document.
  - Feedback: This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.

### Q2. Why can pretraining create broad capability without making the model a perfect library of its sources?

- Correct `v0279-pretraining-q2-correct`: It shapes patterns in weights; it is not a searchable copy of every source.
  - Feedback: Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.
- Distractor `v0279-pretraining-q2-private-files`: It gives the model direct access to every private file on demand.
  - Feedback: Not quite. Training data exposure is not the same as access to every private file. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v0279-pretraining-q2-search-context`: It inserts the original source into every future prompt context.
  - Feedback: Close, but adding source text to context is different from pretraining. Pretraining changes weights before use.
- Distractor `v0279-pretraining-q2-after-user-prompt`: It happens only after a user asks a specific question.
  - Feedback: Pretraining happens before deployment. The user prompt later uses the pretrained weights.

### Q3. If pretraining examples include many styles and task shapes, what can change inside the model?

- Correct `v0279-pretraining-q3-correct`: Weights shift so future prompts can activate useful language or code patterns.
  - Feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
- Distractor `v0279-pretraining-q3-current-context`: The model’s current chat context becomes permanently larger.
  - Feedback: Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.
- Distractor `v0279-pretraining-q3-interface`: Only the app’s buttons, labels, or interface change.
  - Feedback: This describes product UI changes, not the model’s learned parameters. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v0279-pretraining-q3-safety-policy`: Only a safety policy is added around the model.
  - Feedback: Close, but a policy can shape a product around the model; pretraining changes the model’s reusable weights.

### Q4. A base model gives fact-like text about a public topic before any live search or lookup tool is connected. Which pretraining explanation is strongest?

- Correct `v02712-pretraining-q4-correct`: Past training shaped weights; source-like text is not proof of live search.
  - Feedback: Good boundary. Pretraining can shape fact-like patterns without turning the model into a search engine.
- Distractor `v02712-pretraining-q4-2-retrieval`: The model must have used a live lookup tool during the prompt.
  - Feedback: Search is a system/tool action, not something pretraining proves. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-pretraining-q4-3-memory`: The model opened a stored copy of the original page.
  - Feedback: Pretraining does not make a perfect searchable library of every source. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-pretraining-q4-4-truth`: The model became certain because the text sounded factual.
  - Feedback: Fluent source-like text is not a truth guarantee. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Overfitting and Generalization (3)

Objective: Diagnose overfitting and explain that set-aside validation examples are kept out of training to test transfer beyond examples used to fit weights.

### Q1. A model gets every training example right but fails on new validation examples. What problem is showing up?

- Correct `v0279-overfitting-generalization-q1-correct`: Overfitting: the model fit training examples too narrowly to generalize well.
  - Feedback: Good diagnosis. Set-aside validation examples are saved for testing, not used to fit the model.
- Distractor `v0279-overfitting-generalization-q1-generalization`: Generalization: the model is working well on unseen cases.
  - Feedback: Not quite. Generalization means good performance on new examples; this scenario shows the opposite.
- Distractor `v0279-overfitting-generalization-q1-better-training`: Better training: the model has clearly learned the general rule.
  - Feedback: Not quite. If it fails on new validation examples, high training performance is not enough evidence of generalization.
- Distractor `v0279-overfitting-generalization-q1-inference`: Inference: the model is simply generating one token at a time.
  - Feedback: Close, but inference is normal model use; overfitting is a training/evaluation failure mode.

### Q2. Why do model builders test on set-aside validation examples instead of only training examples?

- Correct `v0279-overfitting-generalization-q2-correct`: They are kept out of training so they can test whether learned patterns transfer.
  - Feedback: Insight strengthened. Set-aside validation examples are saved for testing, not used to fit the model.
- Distractor `v0279-overfitting-generalization-q2-extra-training`: Validation data is just extra training data used to lower loss.
  - Feedback: Not quite. Validation examples are saved for testing, not used as extra examples to fit the model.
- Distractor `v0279-overfitting-generalization-q2-training-proves-all`: Training examples alone prove the model will work everywhere.
  - Feedback: This choice reveals the exact overfitting risk. Seen examples are not enough evidence.
- Distractor `v0279-overfitting-generalization-q2-loss-truth`: A lower loss always proves every future answer is true.
  - Feedback: Close, but lower loss is not a truth guarantee, especially outside the tested examples.

### Q3. A model trained heavily on one narrow answer template works on that template but struggles with varied new prompts. What should a model-literate learner suspect?

- Correct `v0279-overfitting-generalization-q3-correct`: It fit narrow examples too closely instead of generalizing.
  - Feedback: Good distinction. Targeted training can help, but narrow training can also make behavior brittle.
- Distractor `v0279-overfitting-generalization-q3-prompt-rewrite`: The prompts permanently rewrote the model during inference.
  - Feedback: Not quite. The issue is training behavior, not prompts rewriting weights during inference.
- Distractor `v0279-overfitting-generalization-q3-conscious-choice`: The model learned the narrow template so well that broader prompts no longer matter.
  - Feedback: That gives the model too much mind. The issue is brittle transfer, not intention. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v0279-overfitting-generalization-q3-rules-always-better`: Rule-based AI is always better than learned models.
  - Feedback: This overgeneralizes. The issue is narrow training behavior, not proof that rules always beat learned models.

## Fine-Tuning (3)

Objective: Distinguish fine-tuning or adapter training as durable post-pretraining adaptation from prompt, RAG, and sampling-time steering.

### Q1. A team wants a support assistant to follow corporate norms across future conversations. Which intervention would create a durable model-side change?

- Distractor `v02712-fine-tuning-q1-4-sampling`: Sample from a lower-temperature distribution.
  - Feedback: Not quite. Temperature changes how the next token is sampled during generation; it does not train future behavior.
- Distractor `v02712-fine-tuning-q1-3-rag`: Retrieve a policy page into the current context.
  - Feedback: Close, but retrieved material helps only when it enters the current context. It does not by itself adapt the model for later conversations.
- Correct `v02712-fine-tuning-q1-correct`: Run additional training or adapter training on relevant examples so future responses carry the pattern.
  - Feedback: Good distinction. This is the durable training-style move: future runs can carry the pattern, rather than only the current prompt or context.
- Distractor `v02712-fine-tuning-q1-2-prompt`: Paste the norms into one user prompt.
  - Feedback: A prompt can steer one current run, but it does not usually create a durable model-side change.

### Q2. A base model is adapted on thousands of institution-specific examples, then later answers new users in that style. What changed most directly?

- Correct `v02710-fine-tuning-q2-correct`: Adapted weights or adapters can carry the pattern into later runs.
  - Feedback: Insight strengthened. Fine-tuning makes a reusable model change, not just a one-chat hint.
- Distractor `v02710-fine-tuning-q2-context-only`: Only the current context window got larger.
  - Feedback: Not quite. A larger context window is temporary input space; fine-tuning changes reusable behavior.
- Distractor `v02710-fine-tuning-q2-memory`: The model became conscious of the institution’s norms.
  - Feedback: That gives the model too much mind. The behavior can be shaped without conscious commitment to norms.
- Distractor `v02710-fine-tuning-q2-rag-search`: The model must search the institution’s files every time.
  - Feedback: Close, but fine-tuning and retrieval are different. Retrieval may be added, but fine-tuned behavior can persist in weights or adapters.

### Q3. If fine-tuning is used for alignment, what does that mean about future model behavior?

- Correct `v02710-fine-tuning-q3-correct`: Training can make instruction-following patterns more likely later.
  - Feedback: Good distinction. Fine-tuning can support alignment by durably shaping output patterns.
- Distractor `v02710-fine-tuning-q3-perfect-safety`: Future answers will tend to be safer, so evaluation is no longer needed.
  - Feedback: Not quite. Fine-tuning can improve behavior, but it does not guarantee truth or safety.
- Distractor `v02710-fine-tuning-q3-system-prompt-only`: Only the visible system prompt changed for one session.
  - Feedback: Close, but a system prompt steers the current run. Fine-tuning is durable training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-fine-tuning-q3-inner-values`: The model acquired human values and moral agency.
  - Feedback: That gives the model too much mind. Fine-tuning changes output patterns; it does not create moral agency.

## Alignment (4)

Objective: Reason about alignment as behavior shaping through training, prompts, policies, filters, evaluation, and deployment controls without treating it as conscience or truth guarantee.

### Q1. An alignment-shaped assistant refuses a harmful request and follows a safer instruction instead. What should a model-literate learner conclude?

- Correct `v02710-alignment-q1-correct`: Behavior was shaped toward safety boundaries, not moral understanding.
  - Feedback: Good distinction. Alignment shapes behavior; it is not magic morality.
- Distractor `v02710-alignment-q1-conscious`: The model must understand morality the way a person does.
  - Feedback: That gives the model too much mind. Refusal behavior can be shaped without human moral understanding.
- Distractor `v02710-alignment-q1-truth`: Safer wording means the factual claims have already been verified.
  - Feedback: Not quite. Alignment can shape behavior, but it does not guarantee factual truth. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02710-alignment-q1-no-model`: The LLM stopped using learned weights and became a rulebook.
  - Feedback: Close, but an aligned product can still use a learned model plus rules, filters, or policies.

### Q2. A product uses instruction fine-tuning, a system prompt, and a policy filter around one LLM. Which alignment map is most useful?

- Correct `v02710-alignment-q2-correct`: Some alignment changes are durable training; others steer or filter the current run.
  - Feedback: Insight strengthened. Alignment can happen through several layers, not one magic switch.
- Distractor `v02710-alignment-q2-all-weights`: Every alignment layer permanently rewrites the model weights.
  - Feedback: Not quite. Fine-tuning may change weights, but system prompts and filters can steer behavior at runtime.
- Distractor `v02710-alignment-q2-only-prompt`: Alignment is only a better prompt typed by the user.
  - Feedback: Close, but alignment can include training, policies, evaluation, and runtime controls beyond the user prompt.
- Distractor `v02710-alignment-q2-sampling-only`: Alignment is the same thing as sampling the most probable token.
  - Feedback: Sampling chooses a next token from probabilities. Alignment shapes or constrains behavior around that process.

### Q3. Why do teams evaluate aligned models with tests and human feedback after training or deployment?

- Correct `v02710-alignment-q3-correct`: Shaped behavior can still fail or trade off in new situations.
  - Feedback: Good distinction. Alignment needs evaluation; it is not a one-time guarantee.
- Distractor `v02710-alignment-q3-conscious-test`: To check whether the model has developed a conscience.
  - Feedback: Not quite. Evaluation checks behavior and outcomes, not inner conscience. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02710-alignment-q3-no-need`: Because aligned models no longer need human review.
  - Feedback: This choice overclaims. Aligned systems can still need review, monitoring, and accountability.
- Distractor `v02710-alignment-q3-loss-only`: Because lower training loss alone proves the model is safe.
  - Feedback: Close, but loss alone is not a full safety or usefulness evaluation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q4. A guardrail blocks one unsafe response before the user sees it. What changed most directly?

- Correct `v02712-alignment-q4-correct`: A policy or filter layer changed visible output, not necessarily model weights.
  - Feedback: Good distinction. Product-level controls can affect what users see without being a weight update.
- Distractor `v02712-alignment-q4-2-alignment`: The model learned new moral values during that one response.
  - Feedback: A blocked output is not evidence of a new conscience or durable training. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-alignment-q4-3-prompt`: The user prompt permanently rewrote the safety behavior.
  - Feedback: Prompting can steer a run, but it usually does not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-alignment-q4-4-truth`: A filter approval means the answer no longer needs evidence review.
  - Feedback: A safety decision is not the same as fact verification. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Inference (4)

Objective: Explain inference as a forward pass using fixed weights and temporary context-shaped states, not durable learning.

### Q1. During ordinary inference, the current context enters the model. What changes temporarily, and what usually stays fixed?

- Correct `v02710-inference-q1-correct`: Temporary internal states change; learned weights usually stay fixed.
  - Feedback: Good distinction. Inference uses the map without redrawing it.
- Distractor `v02710-inference-q1-weights-change`: The learned weights change after every user prompt.
  - Feedback: Not quite. Ordinary inference can use context, but it usually does not rewrite weights.
- Distractor `v02710-inference-q1-dataset`: The training dataset changes to include the new prompt.
  - Feedback: This choice reveals a common mix-up. A prompt can be current context without joining the training dataset.
- Distractor `v02710-inference-q1-conscious`: The model’s conscious attention shifts to the user’s intent.
  - Feedback: That gives the model too much mind. Inference computes temporary vectors; it is not conscious attention.

### Q2. In one inference step, which trace best matches the model path before the next token appears?

- Correct `v02710-inference-q2-correct`: Context enters a forward pass, temporary states form, raw scores appear, and a token can be chosen.
  - Feedback: Insight strengthened. That is the live next-token path through inference.
- Distractor `v02710-inference-q2-training-loop`: Example enters training, loss updates weights, and a future model checkpoint is saved.
  - Feedback: Close, but that is a training path. Inference uses existing weights to produce the next-token scores.
- Distractor `v02710-inference-q2-rag-loop`: Retriever searches outside documents, then the model permanently learns the snippets.
  - Feedback: Retrieval can add context before inference, but it does not by itself make the model permanently learn snippets.
- Distractor `v02710-inference-q2-tokenizer-only`: Tokenizer splits text and the answer appears without model layers.
  - Feedback: Tokenization prepares input, but inference still runs model layers to produce scores. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q3. A chatbot remembers an earlier line in the same conversation and uses it in the next answer. What is the best model-level explanation?

- Correct `v02710-inference-q3-correct`: The earlier line is still in context, so inference can use it.
  - Feedback: Good distinction. Context can feel like memory while still being temporary input.
- Distractor `v02710-inference-q3-weight-memory`: The earlier line was written into the model’s weights.
  - Feedback: Not quite. Same-conversation context is temporary input, not necessarily a weight update.
- Distractor `v02710-inference-q3-training-now`: The chatbot fine-tuned itself on the earlier line.
  - Feedback: Close, but adaptation within a context window is not the same as fine-tuning. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-inference-q3-search-all`: The model searched every document it was pretrained on.
  - Feedback: This describes search better than ordinary inference. The model can use visible context without searching training sources.

### Q4. If ordinary inference normally does not update weights, what follows for future conversations?

- Correct `v02710-inference-q4-correct`: A useful answer now does not automatically teach the base model for tomorrow.
  - Feedback: Insight strengthened. Inference can be useful without being durable training.
- Distractor `v02710-inference-q4-auto-learn`: Every good answer automatically becomes permanent skill.
  - Feedback: Not quite. Durable skill changes require training or another model-update process. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-inference-q4-no-context`: The current prompt cannot affect the answer at all.
  - Feedback: Close, but fixed weights can still respond differently to different current contexts. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-inference-q4-no-risk`: There is no need to review outputs because inference is temporary.
  - Feedback: This choice overclaims. Temporary outputs can still affect people and decisions, so review can matter.

## Prompt vs Response (3)

Objective: Separate given prompt/context tokens from generated response tokens and explain that generated tokens are appended into the next inference context.

### Q1. A user gives a complete prompt, then the model begins writing response tokens. Which boundary matters most?

- Correct `v02710-prompt-response-q1-correct`: Prompt tokens are given; response tokens are generated and appended to context.
  - Feedback: Good distinction. Prompt is given; response is generated and appended.
- Distractor `v02710-prompt-response-q1-all-user`: Both prompt and response tokens were typed by the user.
  - Feedback: Not quite. The user provides the prompt; the model generates response tokens. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-prompt-response-q1-all-at-once`: The model writes the whole response at once after reading the prompt.
  - Feedback: Close, but the model generates response tokens step by step. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-prompt-response-q1-weight-update`: Each response token permanently updates the model’s weights.
  - Feedback: This choice reveals a common mix-up. Response tokens can shape the current run without updating weights.

### Q2. After the model chooses one next response token, what does the next inference step see?

- Correct `v02710-prompt-response-q2-correct`: The original prompt plus the response so far, including the new token.
  - Feedback: Insight strengthened. The context grows as generated response tokens are appended.
- Distractor `v02710-prompt-response-q2-only-new-token`: Only the newly chosen token, with the prompt removed.
  - Feedback: Not quite. The next step can use the prompt and response-so-far that remain in context.
- Distractor `v02710-prompt-response-q2-weight-memory`: A permanent memory of the token stored in model weights.
  - Feedback: Close, but using a token later in the run is context, not a weight update. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-prompt-response-q2-softmax-removed`: No context, because softmax disappears after one token.
  - Feedback: Softmax can help choose a token, but the chosen token can still be appended to the next context.

### Q3. A generated response improves after the user adds a clarifying sentence. What changed most directly?

- Correct `v02710-prompt-response-q3-correct`: Better current context helped the next response tokens come from better input.
  - Feedback: Good distinction. Better context can improve the current response without training the model.
- Distractor `v02710-prompt-response-q3-finetuned`: The model was fine-tuned by the clarifying sentence.
  - Feedback: Not quite. A clarifying sentence can steer the current run; fine-tuning is additional training.
- Distractor `v02710-prompt-response-q3-conscious`: The model understood its mistake like a person and decided to improve.
  - Feedback: That gives the model too much mind. Better output can come from better context. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02710-prompt-response-q3-no-effect`: Prompts cannot affect generated response tokens.
  - Feedback: Close, but fixed weights still process different prompts into different response probabilities.

## Tokenization (3)

Objective: Explain tokenization as turning text into model-readable chunks that may be words, word pieces, punctuation, or other units before ID lookup.

### Q1. A tokenizer splits “startled.” into pieces like “start”, “led”, and “.” What should that tell a learner?

- Correct `v02710-tokens-q1-correct`: Tokens can be uneven chunks: words, word pieces, or punctuation.
  - Feedback: Good distinction. Tokens are model-readable chunks, not always whole words.
- Distractor `v02710-tokens-q1-whole-word`: Every token must be a complete dictionary word.
  - Feedback: Not quite. Tokenizers can split words, punctuation, spaces, or other chunks. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02710-tokens-q1-memory`: Each token is a permanent memory stored in the model.
  - Feedback: This choice reveals a common mix-up. A token is a representation chunk, not memory by itself.
- Distractor `v02710-tokens-q1-concept`: Each token is exactly one human concept.
  - Feedback: Close, but token boundaries do not perfectly match human concepts or meanings. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q2. Before transformer layers process text, which tokens-to-IDs-to-embeddings path comes first?

- Correct `v02710-tokens-q2-correct`: Text is split into tokens, tokens map to token IDs, and IDs look up embeddings.
  - Feedback: Insight strengthened. Tokenization starts the bridge from text to numerical computation.
- Distractor `v02710-tokens-q2-raw-english`: Raw English sentences move through every layer without numerical representation.
  - Feedback: Not quite. The model needs numerical representations, starting with tokens and IDs. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02710-tokens-q2-weights-first`: Weights are rewritten before text becomes tokens.
  - Feedback: Close, but tokenization prepares the input; it does not rewrite weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-tokens-q2-response-first`: The model generates the finished response before tokenization happens.
  - Feedback: Generation also uses tokens. Text needs token representation before model layers can process it.

### Q3. Both the user prompt and the generated response eventually appear as text. How does tokenization treat them?

- Correct `v02710-tokens-q3-correct`: Prompt text and generated response text can both be represented as tokens.
  - Feedback: Good distinction. Tokenization applies to text entering and leaving the generation loop.
- Distractor `v02710-tokens-q3-prompt-only`: Only prompt text becomes tokens; response text skips token IDs.
  - Feedback: Not quite. Generated response tokens are token IDs before being displayed as text. This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.
- Distractor `v02710-tokens-q3-response-only`: Only response text becomes tokens; prompts stay as raw English.
  - Feedback: Close, but prompts also need token representation before model processing. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02710-tokens-q3-training`: Tokenizing either one permanently trains the model.
  - Feedback: This choice reveals a common mix-up. Tokenization represents text; it does not update weights.

## Token IDs (3)

Objective: Explain token IDs as lookup keys from token chunks to embedding rows, not meanings, memories, or source retrieval by themselves.

### Q1. After tokenization, the token “dog” maps to an integer ID. What does the model use that ID for next?

- Correct `v02710-token-ids-q1-correct`: To look up a learned starting vector in the embedding table.
  - Feedback: Good distinction. The ID is a lookup key for an embedding vector.
- Distractor `v02710-token-ids-q1-meaning`: To store the complete meaning of dog inside the number itself.
  - Feedback: Not quite. The number itself is not the meaning; it points to learned numerical patterns.
- Distractor `v02710-token-ids-q1-memory`: To permanently remember this user’s sentence.
  - Feedback: This choice reveals a common mix-up. Token IDs represent chunks; they do not store a user memory.
- Distractor `v02710-token-ids-q1-skip`: To skip embeddings and tensors entirely.
  - Feedback: Close, but the ID is a lookup key; embeddings and tensors still carry numerical representation forward.

### Q2. A learner says “982 means cat because the ID is the meaning.” What correction is most model-literate?

- Correct `v02710-token-ids-q2-correct`: 982 is a lookup number; meaning comes from embeddings, layers, and context.
  - Feedback: Insight strengthened. The ID points into the system; it is not understanding by itself.
- Distractor `v02710-token-ids-q2-conscious`: 982 means cat because the model consciously understands the number.
  - Feedback: That gives the model too much mind. A lookup number does not imply conscious understanding.
- Distractor `v02710-token-ids-q2-truth`: 982 guarantees every sentence about cats will be true.
  - Feedback: Not quite. Token IDs do not guarantee factual output. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02710-token-ids-q2-random-every-run`: 982 is randomly redefined every time the user sends a prompt.
  - Feedback: Close, but token ID mappings are fixed for a tokenizer/model setup; sampling randomness is a different step.

### Q3. During generation, the model chooses a next response token ID before the user sees text. What happens after that?

- Correct `v02710-token-ids-q3-correct`: The chosen ID can display as text and append as a response token.
  - Feedback: Good distinction. Generated tokens are IDs before they become visible text.
- Distractor `v02710-token-ids-q3-weight-update`: The chosen ID permanently updates the model weights.
  - Feedback: Not quite. The chosen token can affect the next context without changing weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02710-token-ids-q3-raw-word`: The model skips IDs and chooses only raw human words.
  - Feedback: Close, but the model works with token IDs before text is displayed. This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.
- Distractor `v02710-token-ids-q3-retrieve-source`: The ID retrieves the original training document for that word.
  - Feedback: This describes retrieval better than token ID lookup. Token IDs point to token representations, not original documents.

## Embeddings (2)

Objective: Distinguish an embedding as a learned starting vector retrieved from a durable embedding table from a temporary hidden state shaped by context.

### Q1. The token ID for "dog" looks up a vector before the sentence context is processed. What is that vector?

- Correct `v02712-embeddings-q1-correct`: A learned starting vector from the embedding table.
  - Feedback: Insight strengthened. The embedding is the token ID's learned numerical starting point.
- Distractor `v02712-embeddings-q1-2-hidden-state`: The temporary hidden state after attention has read the sentence.
  - Feedback: That describes a later context-shaped vector, not the starting lookup. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-embeddings-q1-3-token-id`: The integer ID itself, before any lookup happens.
  - Feedback: The ID is a lookup key, not the vector returned by the table. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-embeddings-q1-4-definition`: A human-readable dictionary definition stored in English.
  - Feedback: Embeddings are numerical vectors, not text definitions. This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.

### Q2. The same token starts with one embedding but appears in two different sentences. What can make its later internal vector differ during inference?

- Correct `v02712-embeddings-q2-correct`: Context and layers reshape the starting vector into a temporary internal state.
  - Feedback: Good distinction. Embeddings start the token; hidden states are shaped by context during inference.
- Distractor `v02712-embeddings-q2-2-weight-update`: The embedding table rewrites itself during ordinary inference.
  - Feedback: Ordinary inference usually uses fixed learned weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-embeddings-q2-3-token-id`: The token ID changes meaning by becoming a new integer.
  - Feedback: The ID remains a lookup key; later vectors carry contextual information. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-embeddings-q2-4-memory`: The model stores a permanent memory of each sentence.
  - Feedback: Temporary hidden states are not permanent memories. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Vectors (3)

Objective: Explain vectors as numerical representations with distributed features and distinguish vectors from scalar IDs, tensors, and human-readable labels.

### Q1. A learner sees a long row of numbers representing a token. What makes it a vector in the model trace?

- Correct `v02712-vectors-q1-correct`: It is an ordered numerical representation the model can compute with.
  - Feedback: Insight strengthened. Vectors let the model carry many numerical features at once.
- Distractor `v02712-vectors-q1-2-token-id`: It is a single integer lookup key.
  - Feedback: That describes a token ID, not a vector of many values. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-vectors-q1-3-tensor`: It is a shaped block with several axes such as tokens and features.
  - Feedback: That is closer to a tensor; a vector is one-dimensional. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-vectors-q1-4-token`: It is the visible word shown to the user.
  - Feedback: Visible text is converted before the model computes with vectors. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q2. A vector dimension feels tempting to label as "humor" or "truth." What should the learner remember?

- Correct `v02712-vectors-q2-correct`: Features are distributed across dimensions, not one label each.
  - Feedback: Good distinction. Vector meaning is spread out and computed, not stored as neat labels.
- Distractor `v02712-vectors-q2-2-feature`: Each dimension is a named English category.
  - Feedback: That makes distributed features too literal. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-vectors-q2-3-memory`: Each vector is a saved chat memory.
  - Feedback: A vector representation is not a stored conversation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-vectors-q2-4-citation`: Each vector is a complete citation to a source.
  - Feedback: Vectors do not carry source citations by themselves. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q3. An embedding row and a later internal state can both be vectors. Which boundary matters?

- Correct `v02712-vectors-q3-correct`: One vector can be learned; another can be temporary.
  - Feedback: Good boundary. Some vectors live in learned model data, while others are temporary activations.
- Distractor `v02712-vectors-q3-2-memory`: Both are permanent memories of the user conversation.
  - Feedback: Conversation memory is a different product feature, not what these vectors are. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-vectors-q3-3-token-id`: Both are token IDs before embedding lookup.
  - Feedback: A token ID is a scalar lookup key, not the vector itself. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-vectors-q3-4-response-token`: Both are visible words after generation.
  - Feedback: Visible text is the display side, not the internal vector state. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

## Tensors (2)

Objective: Explain tensors as shaped numerical blocks that organize many token vectors and features for layer operations.

### Q1. A model processes many token vectors arranged by token position and feature dimension. What makes that structure a tensor?

- Correct `v02712-tensors-q1-correct`: A tensor is a shaped block of numbers for model operations.
  - Feedback: Insight strengthened. Tensors organize numbers so layers can process positions, features, batches, or heads.
- Distractor `v02712-tensors-q1-2-token-id`: It is one token ID for one word piece.
  - Feedback: A token ID is a lookup key, not a shaped numerical block. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-tensors-q1-3-rule-based-ai`: It is a rule written by a programmer.
  - Feedback: A tensor is data the model computes over, not an if-then rule. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-tensors-q1-4-memory`: It is a permanent memory of every prompt.
  - Feedback: Tensors can be temporary activations or learned parameters, not conversation memory by default.

### Q2. During training, a weight tensor changes. During inference, an activation tensor appears briefly. Which distinction is most useful?

- Correct `v02712-tensors-q2-correct`: Weight tensors can persist; activation tensors are temporary.
  - Feedback: Good distinction. Tensor names can describe shape, while durability depends on whether the tensor is a parameter or an activation.
- Distractor `v02712-tensors-q2-2-activation`: All tensors are temporary and vanish after every token.
  - Feedback: That ignores learned parameter tensors. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-tensors-q2-3-memory`: All tensors are permanent and become model memory.
  - Feedback: That ignores temporary activation tensors. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-tensors-q2-4-token`: Tensors are only visible words arranged in rows.
  - Feedback: The model uses numerical arrays, not visible text tables. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Attention (4)

Objective: Explain attention as temporary weighted relevance between token positions that shapes hidden states, not human awareness or final token choice by itself.

### Q1. In "The dog chased the ball because it bounced," the model must relate "it" to earlier tokens. What is attention doing?

- Correct `v02712-attention-q1-correct`: Weighting relevance between token positions in the current context.
  - Feedback: Insight strengthened. Attention is weighted relevance between positions, not awareness.
- Distractor `v02712-attention-q1-2-awareness`: Giving the model conscious focus on the sentence.
  - Feedback: Attention here is a calculation, not human attention. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-attention-q1-3-sampling`: Choosing the final next token from probabilities.
  - Feedback: Sampling happens later after scores become probabilities. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-attention-q1-4-weight-update`: Rewriting the model weights to remember the sentence.
  - Feedback: The attention pattern is temporary during inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. A learner says attention is permanent memory because it links words. What is the better boundary?

- Correct `v02712-attention-q2-correct`: Learned attention weights persist; one prompt pattern is temporary.
  - Feedback: Good boundary. The current relevance pattern is made for this run and does not become stored memory by itself.
- Distractor `v02712-attention-q2-2-memory`: Every attention link becomes a saved user memory.
  - Feedback: Temporary relevance patterns are not saved memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-attention-q2-3-retrieval`: Attention is the same as a retrieval system searching documents.
  - Feedback: Retrieval can add text to context; attention works inside the model over positions. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-attention-q2-4-hidden-state`: Attention replaces the need for hidden states.
  - Feedback: Attention helps shape hidden states rather than replacing them. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. Attention and the MLP both appear inside transformer layers. Which contrast is most accurate?

- Correct `v02712-attention-q3-correct`: Attention mixes information across positions; the MLP reshapes features within each position.
  - Feedback: Good distinction. The two operations help in different ways inside a layer.
- Distractor `v02712-attention-q3-2-mlp`: Attention reshapes features within one position while the MLP searches documents.
  - Feedback: That swaps the roles and adds retrieval where it does not belong. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-attention-q3-3-sampling`: Attention chooses the next token while the MLP converts logits to probabilities.
  - Feedback: Next-token choice and softmax happen later in the Decision Room. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-attention-q3-4-awareness`: Attention is human awareness while the MLP is moral judgment.
  - Feedback: Both are computations, not mental or moral faculties. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q4. After tokens become vectors and tensors, where does attention fit in the workday stage?

- Correct `v02712-attention-q4-correct`: Inside transformer layers, shaping temporary hidden states.
  - Feedback: Insight strengthened. Attention is one layer operation in the forward pass.
- Distractor `v02712-attention-q4-2-tokenization`: Before tokenization, deciding how text should be split.
  - Feedback: Tokenization happens before vectors and layers. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-attention-q4-3-memory`: After sampling, permanently storing the answer.
  - Feedback: Attention is not post-response storage. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-attention-q4-4-rag`: Outside the model, searching every connected file.
  - Feedback: That describes retrieval, not attention inside layers. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## MLP (3)

Objective: Explain the MLP as per-token feature reshaping inside each layer, distinct from attention mixing across token positions.

### Q1. After attention has mixed information across token positions, a layer reshapes each position's feature vector. Which component is doing that work?

- Correct `v02712-mlp-q1-correct`: The MLP, using learned weights to transform features at each token position.
  - Feedback: Insight strengthened. The MLP is per-position feature reshaping inside the layer.
- Distractor `v02712-mlp-q1-2-attention`: Attention, because attention is the per-token feature reshaper.
  - Feedback: Attention mainly handles relevance across positions. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-mlp-q1-3-sampling`: Sampling, because sampling rewrites features before softmax.
  - Feedback: Sampling chooses a token later; it does not reshape layer features. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-mlp-q1-4-retrieval`: Retrieval, because retrieval searches private files for features.
  - Feedback: Retrieval is an outside-system step, not the MLP operation. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q2. The MLP has learned weights, but the feature values it produces during one answer are temporary. What does that mean?

- Correct `v02712-mlp-q2-correct`: The learned MLP parameters persist; this prompt's activations do not.
  - Feedback: Good boundary. Durable weights and temporary activations are different parts of the same operation.
- Distractor `v02712-mlp-q2-2-weight-update`: Every activation becomes a new model weight.
  - Feedback: Ordinary inference does not turn activations into weight updates. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-mlp-q2-3-parameter`: The MLP has no learned parameters at all.
  - Feedback: The MLP uses learned weights even during inference. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-mlp-q2-4-memory`: The MLP stores the user prompt as permanent memory.
  - Feedback: Temporary activations are not user memory. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q3. A learner says the MLP is what links pronouns to earlier nouns. What nearby concept are they probably mixing in?

- Correct `v02712-mlp-q3-correct`: Attention, because attention weights relevance between token positions.
  - Feedback: Good distinction. Pronoun-style cross-position relevance belongs to attention more than the MLP.
- Distractor `v02712-mlp-q3-2-softmax`: Softmax, because softmax links words across the context.
  - Feedback: Softmax converts scores to probabilities later. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-mlp-q3-3-token-id`: Token IDs, because IDs compare sentence positions.
  - Feedback: IDs are lookup numbers, not cross-position relevance. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-mlp-q3-4-fine-tuning`: Fine-tuning, because every pronoun link updates weights.
  - Feedback: Fine-tuning is training; this is an inference-time operation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Layers (4)

Objective: Explain transformer layers as repeated attention-plus-MLP transformations that refine temporary hidden states without implying human thought steps.

### Q1. A transformer block repeats attention and MLP operations. What is being refined as the prompt moves through layers?

- Correct `v02712-layers-q1-correct`: Temporary hidden states for each token position.
  - Feedback: Insight strengthened. Layers repeatedly transform internal states during the forward pass.
- Distractor `v02712-layers-q1-2-training-data`: The original training dataset.
  - Feedback: The dataset is not being edited during inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-layers-q1-3-interface`: The user interface around the model.
  - Feedback: The UI may wrap the model, but layers are internal model operations. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-layers-q1-4-memory`: A permanent memory of the conversation.
  - Feedback: Hidden states are temporary unless another system stores information separately. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. Layer weights are reused across many prompts, while hidden states appear for one run. Which boundary matters?

- Correct `v02712-layers-q2-correct`: Durable layer parameters differ from temporary layer activations.
  - Feedback: Good distinction. A layer contains learned weights, but each prompt creates temporary values.
- Distractor `v02712-layers-q2-2-weight-update`: Every layer activation becomes durable training.
  - Feedback: Activations during inference usually do not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-layers-q2-3-parameter`: Layer weights vanish after each response.
  - Feedback: Learned parameters are reused in future runs. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-layers-q2-4-response`: Layers are only visible paragraphs in the answer.
  - Feedback: Layers are internal computations, not the displayed response. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. A learner imagines each layer as a human-like thought step. What should replace that picture?

- Correct `v02712-layers-q3-correct`: Layers are repeated numerical transformations, not thought steps.
  - Feedback: Good myth repair. Layer depth can support complex computation without implying human thought.
- Distractor `v02712-layers-q3-2-consciousness`: Each layer is a separate conscious agent debating the answer.
  - Feedback: That adds minds where there are computations. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-layers-q3-3-retrieval`: Each layer performs a live web search.
  - Feedback: Retrieval is outside the layer stack unless a system adds it. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-layers-q3-4-alignment`: Each layer stores a moral rule chosen by the user.
  - Feedback: Policy behavior is not the same as each layer being a moral rule. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q4. Why do residual paths and normalization matter in a simplified layer map?

- Correct `v02712-layers-q4-correct`: They carry signal forward while attention and MLP transformations repeat.
  - Feedback: Insight strengthened. The layer stack is a pattern of transformations, not one single operation.
- Distractor `v02712-layers-q4-2-sampling`: They are the steps that sample the final token.
  - Feedback: Sampling happens after the layer stack produces next-token scores. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-layers-q4-3-rag`: They are retrieval indexes for outside documents.
  - Feedback: Retrieval indexes are outside the transformer layer operations. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-layers-q4-4-training`: They permanently add user corrections into weights.
  - Feedback: Training updates weights; ordinary layer flow does not. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Hidden States (4)

Objective: Distinguish hidden states as temporary context-shaped internal vectors created during inference from embeddings, weights, visible text, and memory.

### Q1. The same token "bank" appears in two different sentences. Why can its later hidden state differ even if its starting embedding is similar?

- Correct `v02712-hidden-states-q1-correct`: Layer operations shape a temporary vector for that token position.
  - Feedback: Insight strengthened. Hidden states are internal vectors shaped by the current context.
- Distractor `v02712-hidden-states-q1-2-token-id`: The token ID changes into a new permanent ID.
  - Feedback: The token ID is a lookup key; hidden states carry contextual information. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-hidden-states-q1-3-memory`: The model saves both sentences as memories.
  - Feedback: Temporary hidden states are not saved memories by themselves. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-hidden-states-q1-4-tokenization`: The tokenizer splits the word only after attention.
  - Feedback: Tokenization happens before embeddings and layers. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q2. A learner hears "hidden state" and imagines secret English thoughts. What does "hidden" actually mean here?

- Correct `v02712-hidden-states-q2-correct`: It is internal numerical data, not visible text.
  - Feedback: Good distinction. Hidden states are model-internal activations.
- Distractor `v02712-hidden-states-q2-2-thought`: The model is hiding secret English thoughts.
  - Feedback: Hidden states are numbers, not encrypted inner speech. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-hidden-states-q2-3-source`: The state is a private source document.
  - Feedback: A hidden state is not a stored document. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-hidden-states-q2-4-guardrail`: The state is a policy filter outside the model.
  - Feedback: Policy filters are product controls, not internal hidden states. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q3. During ordinary inference, how durable are hidden states?

- Correct `v02712-hidden-states-q3-correct`: They are temporary activations for the current run.
  - Feedback: Good boundary. Hidden states appear during the forward pass and are not durable weight changes.
- Distractor `v02712-hidden-states-q3-2-weight-update`: They permanently update the base model after each answer.
  - Feedback: That would be training, not ordinary inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-hidden-states-q3-3-memory`: They are the saved user profile for future chats.
  - Feedback: A product may store memory separately, but hidden states are temporary. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-hidden-states-q3-4-training-data`: They are the original examples used in pretraining.
  - Feedback: Training data is not the current hidden state. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q4. Where do hidden states sit in the prompt's Journey?

- Correct `v02712-hidden-states-q4-correct`: Hidden states carry context-shaped information toward next-token scores.
  - Feedback: Insight strengthened. Hidden states bridge the Workday layer processing and the Decision Room scores.
- Distractor `v02712-hidden-states-q4-2-token-id`: Before token IDs exist, hidden states choose vocabulary numbers.
  - Feedback: Token IDs come before embedding lookup and hidden states. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-hidden-states-q4-3-citation`: After the final answer, hidden states become citations.
  - Feedback: Citations are generated text or retrieved/source metadata, not hidden states. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-hidden-states-q4-4-context-window`: Outside the context window, hidden states preserve everything forever.
  - Feedback: They do not bypass context limits or become permanent memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Logits (3)

Objective: Explain logits as temporary raw next-token scores produced before softmax, not probabilities, truth scores, or complete answers.

### Q1. Before softmax, the model assigns raw scores to candidate next tokens. What are those scores called?

- Correct `v02712-logits-q1-correct`: Logits: temporary raw next-token scores.
  - Feedback: Insight strengthened. Logits are raw scores before probability conversion.
- Distractor `v02712-logits-q1-2-softmax`: Probabilities that already add up to one.
  - Feedback: That describes the output after softmax, not logits. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-logits-q1-3-truth`: Truth scores proving which token is factual.
  - Feedback: Logits score token likelihood under context, not truth. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-logits-q1-4-embedding`: Embeddings looked up from token IDs.
  - Feedback: Embeddings happen earlier; logits are near the next-token decision. This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.

### Q2. A logit is high for a token that would make a false sentence. What should the learner conclude?

- Correct `v02712-logits-q2-correct`: A high logit is not a truth guarantee.
  - Feedback: Good boundary. The model can strongly prefer a token that is unsupported or wrong.
- Distractor `v02712-logits-q2-2-truth`: The token must be true because the raw score is high.
  - Feedback: Likelihood under context is not fact verification. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-logits-q2-3-rag`: The model must have retrieved evidence for the token.
  - Feedback: Logits do not prove retrieval happened. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-logits-q2-4-weight-update`: The weight table updated to store the false claim.
  - Feedback: A temporary score is not durable learning. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. How do logits connect to the next steps in generation?

- Correct `v02712-logits-q3-correct`: Softmax converts logits to probabilities, and sampling can choose one token.
  - Feedback: Insight strengthened. Logits feed the probability-and-choice part of the loop.
- Distractor `v02712-logits-q3-2-tokenization`: Tokenization converts logits into word pieces.
  - Feedback: Tokenization happens at the input/output text boundary, not after logits. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-logits-q3-3-fine-tuning`: Fine-tuning converts logits into new weights every turn.
  - Feedback: Fine-tuning is training, not a normal generation step. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-logits-q3-4-grounding`: Grounding converts logits into verified citations automatically.
  - Feedback: Grounding requires evidence handling; logits alone do not verify claims. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Softmax (3)

Objective: Explain softmax as converting logits into a next-token probability distribution, not choosing the token or proving truth.

### Q1. The model has raw logits for several possible next tokens. What does softmax do next?

- Correct `v02712-softmax-q1-correct`: It converts the raw scores into a probability distribution.
  - Feedback: Insight strengthened. Softmax turns raw scores into probabilities that can be sampled from.
- Distractor `v02712-softmax-q1-2-sampling`: It chooses the token by itself and appends it.
  - Feedback: Sampling or decoding chooses from the distribution after softmax. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-softmax-q1-3-truth`: It checks whether the answer is true.
  - Feedback: Probability conversion is not fact verification. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-softmax-q1-4-training`: It updates the model weights using loss.
  - Feedback: That belongs to training, not inference-time softmax. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. A token gets the highest softmax probability, but the claim is unsupported. What does that reveal?

- Correct `v02712-softmax-q2-correct`: Probability is a model preference under context, not proof of truth.
  - Feedback: Good boundary. Softmax probabilities do not replace grounding or review.
- Distractor `v02712-softmax-q2-2-truth`: The highest probability token is always factual.
  - Feedback: That confuses likelihood with truth. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-softmax-q2-3-citation`: The model must have cited a source internally.
  - Feedback: Softmax does not create or check citations. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-softmax-q2-4-memory`: The context window permanently stored the fact.
  - Feedback: Softmax is temporary probability conversion, not storage. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

### Q3. Where does softmax sit between logits and sampling?

- Correct `v02712-softmax-q3-correct`: After logits and before the next-token choice.
  - Feedback: Insight strengthened. The sequence is raw scores, probabilities, then a selected token.
- Distractor `v02712-softmax-q3-2-tokenization`: Before tokenization, deciding how text becomes chunks.
  - Feedback: Tokenization is earlier in the pipeline. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-softmax-q3-3-response`: After the whole response is complete, judging style.
  - Feedback: Softmax is used during next-token generation. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-softmax-q3-4-rag`: During RAG, searching outside documents.
  - Feedback: Retrieval is outside this probability step. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Sampling (4)

Objective: Explain sampling as choosing one next token from probabilities during inference, after softmax and before append/repeat.

### Q1. Softmax creates probabilities for possible next tokens. What does sampling do next?

- Correct `v02712-sampling-q1-correct`: It selects one next token from that probability-shaped set.
  - Feedback: Insight strengthened. Sampling is the choosing step after probabilities exist.
- Distractor `v02712-sampling-q1-2-softmax`: It converts raw scores into probabilities.
  - Feedback: That is softmax, the step before sampling. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-sampling-q1-3-truth`: It checks whether the selected token is true.
  - Feedback: Sampling chooses; it does not verify. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-sampling-q1-4-training`: It retrains the model on the chosen token.
  - Feedback: Choosing a token during inference is not a weight update. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. After sampling selects one token, what does the autoregressive loop do with it?

- Correct `v02712-sampling-q2-correct`: It appends the token to the response-so-far so the next run can see it.
  - Feedback: Good trace. Generation grows one selected token at a time.
- Distractor `v02712-sampling-q2-2-context`: It erases the prompt and starts from only the new token.
  - Feedback: The next run sees the current context, including the response so far. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-sampling-q2-3-memory`: It stores the token as permanent model memory.
  - Feedback: Appending to context is temporary, not durable memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-sampling-q2-4-validation`: It converts the token into a validation example.
  - Feedback: Validation examples are for testing during development, not generation. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q3. Why can sampling make two runs with the same prompt produce different wording?

- Correct `v02712-sampling-q3-correct`: The decoder can choose among likely tokens instead of following one fixed path.
  - Feedback: Insight strengthened. Generation is probability-shaped, not a single scripted answer.
- Distractor `v02712-sampling-q3-2-training`: The model necessarily trained itself between the two runs.
  - Feedback: Different output does not imply a weight update. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-sampling-q3-3-token-id`: The tokenizer randomly changes every word into new IDs.
  - Feedback: Tokenization is usually deterministic for the same text and tokenizer. This confuses lookup handles with meaning; token IDs point to entries, while later vectors and layers do the contextual work.
- Distractor `v02712-sampling-q3-4-memory`: The context window stores secret alternatives forever.
  - Feedback: Variation does not require permanent hidden memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q4. A learner says sampling writes the whole answer at once. What boundary fixes that misconception?

- Correct `v02712-sampling-q4-correct`: Sampling chooses one next token; autoregression appends and repeats.
  - Feedback: Good distinction. The whole response emerges from many next-token choices.
- Distractor `v02712-sampling-q4-2-layer`: Sampling replaces the layer stack with a finished paragraph.
  - Feedback: Layers still produce scores before each token choice. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-sampling-q4-3-retrieval`: Sampling retrieves a complete answer from the web.
  - Feedback: Retrieval is separate from token choice. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-sampling-q4-4-weight-update`: Sampling updates weights after every word.
  - Feedback: Inference-time token choice is not training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Autoregression (3)

Objective: Explain autoregression as next token, append to context, run again, while weights usually remain unchanged and context grows.

### Q1. In autoregression, a model writes "The dog" and then generates "ran." What does the next model run see?

- Correct `v02712-autoregression-q1-correct`: The prompt plus the response so far, including the newly appended token.
  - Feedback: Insight strengthened. Autoregression grows the visible context one token at a time.
- Distractor `v02712-autoregression-q1-2-response-token`: Only the original prompt, because generated tokens are ignored.
  - Feedback: Generated tokens are appended into the next context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-autoregression-q1-3-weight-update`: A permanently changed set of model weights.
  - Feedback: Appending to context is temporary, not training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-autoregression-q1-4-rag`: A live search result for every new token.
  - Feedback: Autoregression does not imply retrieval. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Autoregression updates the response-so-far during inference. What usually does not change?

- Correct `v02712-autoregression-q2-correct`: The model weights.
  - Feedback: Good boundary. The context grows, but ordinary generation does not durably retrain the model.
- Distractor `v02712-autoregression-q2-2-context`: The temporary context visible to the next run.
  - Feedback: That does change as tokens are appended. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-autoregression-q2-3-response`: The visible response text.
  - Feedback: The visible response grows as tokens are generated. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-autoregression-q2-4-logits`: The next-token candidate scores.
  - Feedback: Logits change from step to step as context changes. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q3. A very long generated response can push older information out of view. Which earlier concept explains that limit?

- Correct `v02712-autoregression-q3-correct`: The context window.
  - Feedback: Insight strengthened. Autoregression can make context grow until older tokens no longer fit.
- Distractor `v02712-autoregression-q3-2-optimizer`: The optimizer, because it deletes old facts during training.
  - Feedback: The optimizer is part of training, not context overflow. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-autoregression-q3-3-embedding-table`: The embedding table, because it forgets old rows.
  - Feedback: The table is not what fills up during a long context. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-autoregression-q3-4-softmax`: Softmax, because probabilities erase source text.
  - Feedback: Softmax converts scores; it does not manage context length. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Context Window (4)

Objective: Explain the context window as temporary visible input space for the current run, not permanent memory, and show how autoregression and RAG compete for that space.

### Q1. A long chat exceeds the context window and early details fall out. What changed most directly?

- Correct `v02712-context-window-q1-correct`: The temporary visible input available to the current run.
  - Feedback: Insight strengthened. The context window is temporary working space, not permanent memory.
- Distractor `v02712-context-window-q1-2-weight-update`: The base model weights were overwritten.
  - Feedback: Losing context is not training or untraining. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q1-3-source`: The original source document was deleted.
  - Feedback: Context limits do not delete outside documents. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-context-window-q1-4-consciousness`: The model became conscious of what to forget.
  - Feedback: Context limits are a system constraint, not awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q2. Why is context not the same as memory?

- Correct `v02712-context-window-q2-correct`: Context is current input; memory needs a separate saved mechanism.
  - Feedback: Good boundary. Current tokens and durable storage are different ideas.
- Distractor `v02712-context-window-q2-2-training`: Anything in context permanently changes the model.
  - Feedback: Prompt/context tokens usually do not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q2-3-context-window`: Anything outside context can still be used directly.
  - Feedback: The model cannot directly attend to text outside the current context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q2-4-hidden-state`: Memory and hidden state are the same saved English text.
  - Feedback: Hidden states are temporary numerical activations. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. RAG retrieves three passages before the LLM answers. Where do those passages usually go?

- Correct `v02712-context-window-q3-correct`: Into the current context window as retrieved context.
  - Feedback: Insight strengthened. Retrieved text becomes input the model can attend to during inference.
- Distractor `v02712-context-window-q3-2-fine-tuning`: Into permanent model weights immediately.
  - Feedback: Retrieval is not fine-tuning. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q3-3-web-search`: Into a hidden web browser the model controls by itself.
  - Feedback: RAG uses a retrieval system; the model is not magically browsing all files. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-context-window-q3-4-softmax`: Into softmax as verified truth labels.
  - Feedback: Softmax is probability conversion, not evidence storage. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q4. Why does the response-so-far matter for the context window?

- Correct `v02712-context-window-q4-correct`: Generated tokens append, so later steps can attend to them.
  - Feedback: Good trace. Autoregression uses the growing response as part of the next input.
- Distractor `v02712-context-window-q4-2-response-token`: Generated tokens disappear before the next run.
  - Feedback: They are appended while they remain in context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q4-3-training`: Generated tokens become training targets for the base model.
  - Feedback: Ordinary generation is not durable training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-context-window-q4-4-grounding`: Generated tokens prove the answer is grounded.
  - Feedback: Generated text still needs evidence support. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## RAG and Retrieval (4)

Objective: Explain RAG as a retrieval system that places outside evidence into current context during inference, not training, omniscience, or permanent memory.

### Q1. A RAG system searches a course handbook, inserts two passages into the prompt, then the LLM answers. What changed most directly?

- Correct `v02712-rag-retrieval-q1-correct`: Outside text was retrieved and placed into the current context.
  - Feedback: Insight strengthened. RAG is retrieval plus context, not magical knowing.
- Distractor `v02712-rag-retrieval-q1-2-fine-tuning`: The handbook permanently updated the model weights.
  - Feedback: That would require training or adaptation, not ordinary RAG. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-rag-retrieval-q1-3-consciousness`: The model became conscious of all campus files.
  - Feedback: Retrieval is a system process, not awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-rag-retrieval-q1-4-truth-guarantee`: The answer became guaranteed true because retrieval happened.
  - Feedback: Retrieved text can help, but it can be poor or misused. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Which source can a RAG system use?

- Correct `v02712-rag-retrieval-q2-correct`: Sources connected to its retriever or index.
  - Feedback: Good boundary. RAG has scope; it does not automatically reach every file or website.
- Distractor `v02712-rag-retrieval-q2-2-privacy`: Every private file on the user's device by default.
  - Feedback: That would require permissions and connection to a retriever. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-rag-retrieval-q2-3-pretraining`: Only facts already stored in model weights.
  - Feedback: RAG is specifically about outside information entering context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-rag-retrieval-q2-4-hallucination`: Any web page the model imagines exists.
  - Feedback: Generated source-like text is not retrieval. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q3. Why is RAG not training?

- Correct `v02712-rag-retrieval-q3-correct`: RAG supplies temporary context; it does not change weights by itself.
  - Feedback: Insight strengthened. RAG can improve an answer without becoming permanent learning.
- Distractor `v02712-rag-retrieval-q3-2-training`: It measures loss and runs an optimizer.
  - Feedback: That describes training, not retrieval into context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-rag-retrieval-q3-3-memory`: It turns every retrieved passage into model memory.
  - Feedback: Retrieved passages are temporary unless another system stores them. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-rag-retrieval-q3-4-inference`: It replaces attention, logits, softmax, and sampling.
  - Feedback: The LLM still generates through its normal inference path. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q4. How can RAG reduce hallucinations without eliminating them?

- Correct `v02712-rag-retrieval-q4-correct`: RAG gives temporary evidence, but retrieval or generation can still fail.
  - Feedback: Good nuance. RAG improves support; it does not guarantee truth.
- Distractor `v02712-rag-retrieval-q4-2-citation`: It forces the model to quote sources with perfect accuracy.
  - Feedback: Citations can still be missing, stale, or misused. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-rag-retrieval-q4-3-hallucination`: It makes the model unable to generate unsupported text.
  - Feedback: Unsupported generation can still happen. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-rag-retrieval-q4-4-pretraining`: It makes pretraining unnecessary for language generation.
  - Feedback: The LLM still uses learned patterns and weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Grounding (4)

Objective: Explain grounding as connecting generated claims to available evidence while recognizing that citations or retrieval do not guarantee truth.

### Q1. A retrieved passage says one thing, but the answer claims another. Why can grounding still fail?

- Correct `v02712-grounding-q1-correct`: Evidence does not guarantee the answer stays connected.
  - Feedback: Insight strengthened. Grounding asks whether claims are actually supported by evidence.
- Distractor `v02712-grounding-q1-2-truth-guarantee`: Any retrieved passage automatically makes the answer true.
  - Feedback: Evidence must be relevant and used faithfully. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-grounding-q1-3-citation`: A citation-looking sentence proves the source was checked.
  - Feedback: A generated citation can look real without support. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-grounding-q1-4-softmax`: Softmax converts evidence into truth labels.
  - Feedback: Probability conversion is not evidence checking. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. A campus answer cites retrieved documents and data. What is grounding trying to connect?

- Correct `v02712-grounding-q2-correct`: Generated claims to available documents, data, or tool results.
  - Feedback: Good distinction. Grounding is about support, not style.
- Distractor `v02712-grounding-q2-2-confidence`: Model confidence to moral certainty.
  - Feedback: Grounding is not a feeling or moral signal. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-grounding-q2-3-training`: Prompt wording to permanent weight updates.
  - Feedback: Grounding usually concerns evidence in the current system/run. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-grounding-q2-4-token-id`: Token IDs to dictionary meanings only.
  - Feedback: That is not the evidence relationship grounding cares about. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q3. A response includes a polished citation that the source list does not contain. What should a learner suspect?

- Correct `v02712-grounding-q3-correct`: The citation may be generated text rather than grounded evidence.
  - Feedback: Insight strengthened. Citation format is not the same as source support.
- Distractor `v02712-grounding-q3-2-citation`: The answer is automatically grounded because it has a citation shape.
  - Feedback: Citation-looking output still needs verification. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-grounding-q3-3-intent`: The model must be lying on purpose.
  - Feedback: Unsupported output is not proof of intent. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-grounding-q3-4-embedding`: The source is inside the embedding vector.
  - Feedback: Embeddings do not contain human-readable source records by themselves. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q4. How does grounding connect to RAG in a well-designed system?

- Correct `v02712-grounding-q4-correct`: RAG supplies evidence; grounding checks whether the answer uses it.
  - Feedback: Good connection. Retrieval and faithful use are related but not identical.
- Distractor `v02712-grounding-q4-2-fine-tuning`: RAG and grounding are the same as fine-tuning.
  - Feedback: They usually happen during inference, not durable training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-grounding-q4-3-hallucination`: Grounding guarantees no hallucinations after retrieval.
  - Feedback: Grounding can fail when evidence is poor or misused. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-grounding-q4-4-human-review`: Grounding replaces human review in high-stakes cases.
  - Feedback: Evidence support still needs human judgment when stakes are high. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## Hallucinations (4)

Objective: Explain hallucination as fluent generated output that lacks adequate support, not intentional lying, consciousness, or proof of malice.

### Q1. The model invents a realistic article title and citation. What makes this a hallucination?

- Correct `v02712-hallucinations-q1-correct`: The fluent output lacks adequate support from available evidence.
  - Feedback: Insight strengthened. Hallucination is unsupported generation, not just awkward wording.
- Distractor `v02712-hallucinations-q1-2-intent`: The model intentionally lied because it wanted to deceive.
  - Feedback: Unsupported output is not evidence of intention or malice. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-hallucinations-q1-3-citation`: The answer is true because the citation looks formal.
  - Feedback: Citation style is not evidence support. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-hallucinations-q1-4-retrieval`: The model must have searched a hidden database.
  - Feedback: Source-like text does not prove retrieval happened. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Why can hallucinations happen in a next-token system?

- Correct `v02712-hallucinations-q2-correct`: Fluent token choices can outrun evidence or grounding.
  - Feedback: Good mechanism. The model can keep generating likely text even when support is thin.
- Distractor `v02712-hallucinations-q2-2-softmax`: Softmax is designed to verify facts before every token.
  - Feedback: Softmax converts scores to probabilities; it does not verify facts. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-hallucinations-q2-3-context-window`: The context window permanently stores all needed sources.
  - Feedback: Context is limited and temporary. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-hallucinations-q2-4-alignment`: Alignment gives the model a conscience that prevents mistakes.
  - Feedback: Alignment shaping is not a truth guarantee. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q3. A hallucination is often confused with lying. Which boundary matters?

- Correct `v02712-hallucinations-q3-correct`: Lying implies intent; hallucination describes unsupported output.
  - Feedback: Good myth repair. A model can produce unsupported text without human-like intent.
- Distractor `v02712-hallucinations-q3-2-moral-agency`: Every hallucination proves malicious agency.
  - Feedback: That adds intent the mechanism does not establish. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-hallucinations-q3-3-rag`: Every unsupported answer is a successful RAG lookup.
  - Feedback: Retrieval and support must be checked. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-hallucinations-q3-4-probability`: Every low-probability token is a hallucination.
  - Feedback: Hallucination is about support, not only token probability. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

### Q4. Which practice can reduce hallucination risk without pretending it disappears?

- Correct `v02712-hallucinations-q4-correct`: Use evidence, constraints, and human review for important claims.
  - Feedback: Insight strengthened. Risk can be reduced through system design and review, not wished away.
- Distractor `v02712-hallucinations-q4-2-confidence`: Trust the answer whenever the tone is confident.
  - Feedback: Confidence in wording is not support. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-hallucinations-q4-3-context`: Remove all context so the model relies only on weights.
  - Feedback: Relevant context can help; removing it is not a safeguard. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-hallucinations-q4-4-scale`: Assume larger models cannot hallucinate.
  - Feedback: Scale does not eliminate unsupported generation. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.

## How AI Learns (5)

Objective: Compare ways AI systems appear to learn and separate durable weight or adapter changes from temporary context use, retrieval, and in-context behavior.

### Q1. A team fine-tunes a support model on many reviewed examples. What usually changes?

- Correct `v02712-how-ai-learns-q1-correct`: Weights or adapter behavior that can affect future inference runs.
  - Feedback: Insight strengthened. Fine-tuning is durable learning compared with temporary prompting.
- Distractor `v02712-how-ai-learns-q1-2-prompt`: Only the current prompt context changes for one run.
  - Feedback: That describes prompting, not fine-tuning. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q1-3-rag`: Only a retrieved passage is inserted for one answer.
  - Feedback: Retrieval adds context; it does not by itself train. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q1-4-sampling`: Only sampling picks a different next token.
  - Feedback: Sampling is a generation-time choice, not durable adaptation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. A user pastes a policy into the prompt and the answer follows it. What kind of learning-like behavior is this?

- Correct `v02712-how-ai-learns-q2-correct`: Temporary context use, not durable weight change.
  - Feedback: Good boundary. The model can adapt within the current context without permanently learning the policy.
- Distractor `v02712-how-ai-learns-q2-2-pretraining`: Pretraining on the policy.
  - Feedback: Pretraining happens earlier across broad data. This gives the prompt too much permanence; current context can steer this response without becoming stored model knowledge.
- Distractor `v02712-how-ai-learns-q2-3-fine-tuning`: Fine-tuning the model weights.
  - Feedback: A pasted prompt alone usually does not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q2-4-model-checkpoint`: A saved model checkpoint after training.
  - Feedback: No checkpoint is saved by ordinary prompt use. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. A RAG system retrieves a PDF passage and the model uses it. What did the system add?

- Correct `v02712-how-ai-learns-q3-correct`: Outside information in the current context.
  - Feedback: Insight strengthened. Retrieval can make the answer better without becoming training.
- Distractor `v02712-how-ai-learns-q3-2-memory`: Permanent memory inside every future version of the model.
  - Feedback: Retrieved information is temporary unless a separate system saves it. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q3-3-loss`: Loss values for optimizer updates.
  - Feedback: That is training machinery, not ordinary RAG. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-how-ai-learns-q3-4-alignment`: Human moral judgment inside the model.
  - Feedback: Retrieved text is evidence, not conscience. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q4. In the learning-bucket sort, which action can durably change future model behavior?

- Correct `v02712-how-ai-learns-q4-correct`: Adapter training on task examples.
  - Feedback: Good classification. Adapter training can create a reusable learned behavior.
- Distractor `v02712-how-ai-learns-q4-2-system-prompt`: A one-time system instruction in the prompt.
  - Feedback: That steers the current run or product behavior, not necessarily weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q4-3-retrieval`: A citation retrieved into the context window.
  - Feedback: That is temporary input for inference. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-how-ai-learns-q4-4-response-token`: A sampled response token appended to the answer.
  - Feedback: That grows context; it does not train the model. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q5. Why is the word "learned" tricky in How AI Learns conversations?

- Correct `v02712-how-ai-learns-q5-correct`: People may use it as temporary context even when weights did not change.
  - Feedback: Insight strengthened. Model literacy separates durable learning from temporary use.
- Distractor `v02712-how-ai-learns-q5-2-learning`: Useful responses always prove permanent learning.
  - Feedback: Usefulness can come from context, retrieval, or existing weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q5-3-training`: Only humans can update behavior from examples.
  - Feedback: Models can be trained, but the mechanism differs from human learning. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-how-ai-learns-q5-4-validation`: Every answer creates a new validation set.
  - Feedback: Validation examples are for testing, not every response. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.

## Diffusion vs Autoregression (3)

Objective: Distinguish autoregressive text generation from diffusion-style denoising and show that generative AI methods do not all work like ChatGPT.

### Q1. In Diffusion vs Autoregression, one system appends text tokens and another denoises an image. Which boundary is most accurate?

- Correct `v02712-diffusion-q1-correct`: Autoregressive LLMs and diffusion models are different generative methods.
  - Feedback: Insight strengthened. Generative AI is a family, not one mechanism.
- Distractor `v02712-diffusion-q1-2-llm`: Diffusion models are just larger LLMs using the same token loop.
  - Feedback: Diffusion is a different generation process. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-diffusion-q1-3-diffusion-model`: LLMs generate images by denoising pixels in the same way.
  - Feedback: Text LLM generation is usually autoregressive. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.
- Distractor `v02712-diffusion-q1-4-consciousness`: Both methods prove the system understands like a human.
  - Feedback: Generation method does not imply human awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q2. What is the key diffusion idea in this simplified map?

- Correct `v02712-diffusion-q2-correct`: Start with noise and iteratively denoise toward an output.
  - Feedback: Good mechanism. Diffusion is a denoising process, not next-token append/repeat.
- Distractor `v02712-diffusion-q2-2-autoregression`: Choose one next text token, append, and rerun.
  - Feedback: That is the text LLM loop. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-diffusion-q2-3-rag`: Retrieve outside documents into context.
  - Feedback: Retrieval is separate from diffusion generation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-diffusion-q2-4-training`: Update weights after each image is shown to a user.
  - Feedback: Generation usually does not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. Why does this distinction help demystify generative AI?

- Correct `v02712-diffusion-q3-correct`: Text autoregression is not how all generative systems work.
  - Feedback: Insight strengthened. Different media and methods need different mental models.
- Distractor `v02712-diffusion-q3-2-ai`: It proves all AI systems are LLMs.
  - Feedback: LLMs are one branch, not all AI. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.
- Distractor `v02712-diffusion-q3-3-truth`: It means diffusion outputs are automatically true.
  - Feedback: Generated media can still mislead or need review. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-diffusion-q3-4-multimodal-ai`: It means multimodal systems have human senses.
  - Feedback: Processing media types is not human perception. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.

## Multimodal AI (3)

Objective: Explain multimodal AI as systems that represent or process more than one media type together without implying human-like perception.

### Q1. A model accepts an image and a text question, then answers in text. What makes the system multimodal?

- Correct `v02712-multimodal-q1-correct`: It represents or processes more than one media type together.
  - Feedback: Insight strengthened. Multimodal means multiple modalities in one system or workflow.
- Distractor `v02712-multimodal-q1-2-perception`: It has human-like vision and feelings.
  - Feedback: Processing images is not the same as human perception. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.
- Distractor `v02712-multimodal-q1-3-training`: It turns every file into permanent training data.
  - Feedback: Inputs during use usually enter context, not weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-multimodal-q1-4-llm`: It is only a text LLM with no media representation.
  - Feedback: A multimodal system adds media processing beyond plain text. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.

### Q2. Which boundary keeps multimodal AI from sounding magical?

- Correct `v02712-multimodal-q2-correct`: Media inputs become numerical representations, not human senses.
  - Feedback: Good boundary. The system can process media without seeing or feeling like a person.
- Distractor `v02712-multimodal-q2-2-consciousness`: The model literally experiences the image.
  - Feedback: That adds human experience the mechanism does not show. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.
- Distractor `v02712-multimodal-q2-3-retrieval`: The model searches every image on the web by itself.
  - Feedback: Web/image search requires a connected tool or index. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-multimodal-q2-4-grounding`: The model becomes perfectly grounded by seeing media.
  - Feedback: Media input can still be misread or misused. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q3. How can multimodal and diffusion systems relate?

- Correct `v02712-multimodal-q3-correct`: An AI product can combine different media models and methods.
  - Feedback: Insight strengthened. Products can mix components without making every component work the same way.
- Distractor `v02712-multimodal-q3-2-diffusion`: Diffusion and LLMs must be the same model internally.
  - Feedback: They can be combined in products while remaining different methods. This collapses different generative systems; text autoregression and denoising-style generation are related but not the same loop.
- Distractor `v02712-multimodal-q3-3-memory`: Multimodal always means the model has permanent memory.
  - Feedback: Multiple media types do not imply stored memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-multimodal-q3-4-truth`: Any image input automatically verifies the answer.
  - Feedback: Evidence and interpretation still need checking. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

## The Perfect Storm (4)

Objective: Explain modern LLM capability as convergence among data, compute, storage, methods, labor, and incentives, not one magic breakthrough.

### Q1. In the Perfect Storm story, which explanation best captures why modern LLM capability arrived when it did?

- Correct `v02712-perfect-storm-q1-correct`: Data, compute, storage, methods, labor, and incentives converged.
  - Feedback: Insight strengthened. Modern capability came from convergence, not one spark.
- Distractor `v02712-perfect-storm-q1-2-prompting`: One prompt trick suddenly made models intelligent.
  - Feedback: Prompting matters, but it did not create the whole infrastructure. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-perfect-storm-q1-3-compute`: Compute alone was enough without data or labor.
  - Feedback: Compute is one ingredient, not the whole storm. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-perfect-storm-q1-4-consciousness`: The model woke up once it crossed a magic size.
  - Feedback: Capability growth is not evidence of awakening. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Why do labor and incentives belong beside data and compute in the Perfect Storm?

- Correct `v02712-perfect-storm-q2-correct`: Human work and incentives helped turn methods into products.
  - Feedback: Good breadth. The story is technical and social, not only hardware.
- Distractor `v02712-perfect-storm-q2-2-labor`: Labor only matters after AI becomes conscious.
  - Feedback: Human work shaped data, evaluation, labeling, deployment, and review. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-perfect-storm-q2-3-incentives`: Incentives are irrelevant to product design.
  - Feedback: Markets and institutions affect what gets built and scaled. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-perfect-storm-q2-4-storage`: Storage alone explains model behavior.
  - Feedback: Storage supports the system but does not explain capability by itself. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.

### Q3. A learner says LLMs came from one magic invention. What does the storm-front metaphor correct?

- Correct `v02712-perfect-storm-q3-correct`: LLMs appeared because of convergence, not one magic breakthrough.
  - Feedback: Insight strengthened. The model is less mysterious when the ingredients are visible.
- Distractor `v02712-perfect-storm-q3-2-consciousness`: LLMs appeared because one model became conscious.
  - Feedback: Consciousness is not the mechanism described here. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-perfect-storm-q3-3-rag`: LLMs appeared because retrieval replaced training.
  - Feedback: Retrieval is useful, but large models still depend on training and infrastructure. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-perfect-storm-q3-4-prompting`: LLMs appeared because prompts trained themselves.
  - Feedback: Prompting did not create the learned base capability. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.

### Q4. How does the Perfect Storm widen the Journey after model mechanics?

- Correct `v02712-perfect-storm-q4-correct`: It asks whose data, labor, infrastructure, and choices made the mechanics useful.
  - Feedback: Good connection. Mechanism literacy opens into social and institutional questions.
- Distractor `v02712-perfect-storm-q4-2-mechanism`: It says mechanics no longer matter once costs appear.
  - Feedback: The wider landscape builds on the mechanics, not away from them. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-perfect-storm-q4-3-grounding`: It proves model outputs are grounded by infrastructure.
  - Feedback: Infrastructure enables systems; it does not verify every output. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-perfect-storm-q4-4-risk`: It means risk is only a sci-fi myth.
  - Feedback: Real-world costs and risks are part of the wider landscape. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.

## Collective Intelligence, Extracted (3)

Objective: Explain that much model usefulness comes from patterns in human-created data and labor, raising questions of provenance, consent, and compensation.

### Q1. In Collective Intelligence, Extracted, a model gives useful patterns learned from many people's writing. What should learners ask?

- Correct `v02712-collective-intelligence-q1-correct`: What human-created data and labor helped shape it.
  - Feedback: Insight strengthened. Model capability often reflects extracted collective work.
- Distractor `v02712-collective-intelligence-q1-2-consciousness`: Whether the model created its abilities alone.
  - Feedback: The system depends on data, labor, and training infrastructure. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-collective-intelligence-q1-3-prompt`: Whether the answer came only from the current prompt.
  - Feedback: The prompt matters, but learned patterns came from earlier data. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-collective-intelligence-q1-4-memory`: Whether every source was perfectly copied into memory.
  - Feedback: Training is not a perfect source archive. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q2. Why is "extracted" an important word here?

- Correct `v02712-collective-intelligence-q2-correct`: It points to provenance, consent, pay, and power around data/labor.
  - Feedback: Good distinction. This card adds social questions without turning the model into a mind.
- Distractor `v02712-collective-intelligence-q2-2-intent`: It means the model intentionally stole ideas like a person.
  - Feedback: The issue is real even without human-like intent. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-collective-intelligence-q2-3-memorization`: It means every output is a direct quote from one source.
  - Feedback: Outputs often reflect patterns, not direct retrieval. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-collective-intelligence-q2-4-context`: It means current context is irrelevant.
  - Feedback: Current context still shapes the answer during inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. How does collective intelligence connect back to pretraining?

- Correct `v02712-collective-intelligence-q3-correct`: Pretraining can shape weights from patterns in human-created data.
  - Feedback: Insight strengthened. The social source and the model mechanism meet in training.
- Distractor `v02712-collective-intelligence-q3-2-pretraining`: Pretraining is live web search during each answer.
  - Feedback: Pretraining happened before use; search is a separate system action. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-collective-intelligence-q3-3-truth`: Patterns from human-created data can be treated as verified facts.
  - Feedback: Training data can contain errors and biases. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-collective-intelligence-q3-4-moral-agency`: The model becomes morally accountable like a person.
  - Feedback: Humans and institutions remain accountable for deployment choices. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

## Costs We Must Count (4)

Objective: Identify costs across training, inference, infrastructure, data, labor, privacy, and institutional deployment rather than treating digital systems as cost-free.

### Q1. A campus wants AI tutoring at scale. Which cost mix should leaders count before deployment?

- Correct `v02712-costs-we-must-count-q1-correct`: Training, inference, infrastructure, privacy, labor, access, and governance costs.
  - Feedback: Insight strengthened. Costs are technical, human, and institutional.
- Distractor `v02712-costs-we-must-count-q1-2-inference-cost`: Only the price of each prompt typed by users.
  - Feedback: Per-use cost matters, but it is not the whole deployment cost. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-costs-we-must-count-q1-3-training-cost`: Only the one-time pretraining bill paid by a vendor.
  - Feedback: Repeated inference and institutional operations also cost money and labor. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-costs-we-must-count-q1-4-digital-cost`: No costs, because digital systems are weightless.
  - Feedback: Digital systems still use energy, infrastructure, data, and people. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.

### Q2. Why can repeated inference workloads matter even after training is done?

- Correct `v02712-costs-we-must-count-q2-correct`: Each use can consume compute, energy, money, monitoring, and support.
  - Feedback: Good distinction. Training is not the only place costs occur.
- Distractor `v02712-costs-we-must-count-q2-2-inference`: Inference is free because weights are already trained.
  - Feedback: Running the model still takes resources. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-costs-we-must-count-q2-3-weight-update`: Inference always updates weights, so it costs only training.
  - Feedback: Ordinary inference usually does not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-costs-we-must-count-q2-4-prompt-token`: Only visible response tokens have costs; prompts do not.
  - Feedback: Input and output processing both use resources. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. A product is called digital, so someone assumes it is weightless. What costs does that hide?

- Correct `v02712-costs-we-must-count-q3-correct`: It hides infrastructure, energy, labor, and policy costs.
  - Feedback: Insight strengthened. Digital services still have material and human footprints.
- Distractor `v02712-costs-we-must-count-q3-2-benefit`: It makes every AI benefit false.
  - Feedback: Benefits can be real while costs still need counting. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-costs-we-must-count-q3-3-energy`: It proves all costs are only environmental.
  - Feedback: Environmental costs matter, but labor, privacy, and governance matter too. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-costs-we-must-count-q3-4-governance`: It proves small pilots need no review.
  - Feedback: Scale and context affect the review needed. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q4. How should Costs We Must Count shape benefit claims?

- Correct `v02712-costs-we-must-count-q4-correct`: Pair useful AI possibilities with what must be protected, governed, or funded.
  - Feedback: Good judgment. Cost literacy makes benefit claims more responsible, not more fearful.
- Distractor `v02712-costs-we-must-count-q4-2-risk`: Reject every AI use because any cost is unacceptable.
  - Feedback: Responsible evaluation compares benefits, costs, and alternatives. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-costs-we-must-count-q4-3-hype`: Ignore costs whenever the demo looks impressive.
  - Feedback: Impressive demos still need deployment accounting. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-costs-we-must-count-q4-4-training`: Treat cost counting as a model-weight update.
  - Feedback: Cost counting is a human governance practice. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Risk vs Myth (4)

Objective: Separate practical institutional risks from myths, focusing on privacy, bias, unsupported claims, overreliance, governance, and non-conscious models.

### Q1. A staff member pastes student records into a third-party AI tool. Which risk is real?

- Correct `v02712-risk-myth-q1-correct`: Private data may be exposed, retained, or used outside the intended context.
  - Feedback: Insight strengthened. Privacy and data governance are real institutional risks.
- Distractor `v02712-risk-myth-q1-2-softmax`: Softmax will steal files from the laptop by itself.
  - Feedback: Softmax converts scores to probabilities; it is not file access. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-risk-myth-q1-3-consciousness`: The model became conscious of the student records.
  - Feedback: Risk does not require consciousness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-risk-myth-q1-4-truth`: The answer must be true because the data was private.
  - Feedback: Private input does not guarantee accurate output. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

### Q2. A tool has permission to search a campus drive. What should risk literacy ask first?

- Correct `v02712-risk-myth-q2-correct`: What data the tool can access, retain, log, and send into context.
  - Feedback: Good practice. Tool permissions and data flows are concrete risks.
- Distractor `v02712-risk-myth-q2-2-moral-agency`: Whether the LLM has secret moral agency.
  - Feedback: Risk assessment should start with system behavior and governance. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-risk-myth-q2-3-memory`: Whether every search result becomes permanent model memory.
  - Feedback: Retention depends on system design and policy, not magic memory. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-risk-myth-q2-4-myth`: Whether all risk is sci-fi doom.
  - Feedback: Practical risks can be immediate and ordinary. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q3. What boundary separates hallucination risk from lying?

- Correct `v02712-risk-myth-q3-correct`: Hallucination is unsupported output; lying implies intent.
  - Feedback: Good myth repair. Real risks do not require treating the model as a person.
- Distractor `v02712-risk-myth-q3-2-intent`: Every unsupported answer proves the model wanted to deceive.
  - Feedback: That imports human motives into the mechanism. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-risk-myth-q3-3-harm`: Every false answer is only harmless word choice.
  - Feedback: Unsupported output can still cause real harm. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-risk-myth-q3-4-grounding`: Every citation-looking answer is grounded.
  - Feedback: Citation format needs evidence checking. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q4. Which response is best when a risk is real but a myth is also circulating?

- Correct `v02712-risk-myth-q4-correct`: Name the concrete risk, reject the myth, and choose safeguards that match the system.
  - Feedback: Insight strengthened. Model literacy reduces both panic and complacency.
- Distractor `v02712-risk-myth-q4-2-myth`: Amplify the myth because it makes people cautious.
  - Feedback: Fearmongering can hide the real controls people need. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-risk-myth-q4-3-consciousness`: Dismiss the risk because the model is not conscious.
  - Feedback: Non-conscious systems can still create real harms. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-risk-myth-q4-4-scale`: Assume a larger model removes all governance needs.
  - Feedback: Better models still need policy, evaluation, and review. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.

## Benefits Worth Taking Seriously (3)

Objective: Name realistic AI benefits such as drafting, access, translation, summarization, and search while keeping limits, costs, and human review visible.

### Q1. Which Benefits Worth Taking Seriously claim is useful and bounded rather than hype?

- Correct `v02712-benefits-worth-taking-seriously-q1-correct`: AI can assist drafting, translation, search, and access when humans review important outputs.
  - Feedback: Insight strengthened. Benefits can be real without becoming utopian claims.
- Distractor `v02712-benefits-worth-taking-seriously-q1-2-automation`: AI should replace human judgment wherever it is faster.
  - Feedback: Speed does not remove accountability or context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-benefits-worth-taking-seriously-q1-3-accessibility`: AI guarantees access and accuracy for every learner.
  - Feedback: Access can improve, but quality and bias still need review. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-benefits-worth-taking-seriously-q1-4-consciousness`: AI benefits only count if the model is conscious.
  - Feedback: Usefulness does not require a mind. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q2. During use, where do many AI benefits come from?

- Correct `v02712-benefits-worth-taking-seriously-q2-correct`: Trained weights, temporary context, tools, retrieval, and human review working together.
  - Feedback: Good mechanism. Benefits are often system-level, not just the base model alone.
- Distractor `v02712-benefits-worth-taking-seriously-q2-2-prompt`: Only the prompt, with no learned model behavior.
  - Feedback: Prompts matter, but learned weights and tools also matter. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-benefits-worth-taking-seriously-q2-3-fine-tuning`: Only durable fine-tuning after every user message.
  - Feedback: Most use does not retrain after each prompt. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-benefits-worth-taking-seriously-q2-4-hallucination`: Only hallucinated confidence.
  - Feedback: Useful assistance should be checked and grounded when needed. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

### Q3. A team names real AI benefits while still checking limits and costs. Which misconception does that avoid?

- Correct `v02712-benefits-worth-taking-seriously-q3-correct`: Taking benefits seriously does not mean believing in utopia.
  - Feedback: Good distinction. The goal is balanced literacy, not hype.
- Distractor `v02712-benefits-worth-taking-seriously-q3-2-costs`: Any mention of benefit means ignoring cost.
  - Feedback: Benefits and costs should be considered together. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-benefits-worth-taking-seriously-q3-3-risk`: Only fearful claims can be responsible.
  - Feedback: Responsible judgment can include useful applications. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-benefits-worth-taking-seriously-q3-4-truth`: A benefit proves the answer is always true.
  - Feedback: Usefulness still needs evaluation and review. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

## Human-Centered AI (4)

Objective: Explain human-centered AI as keeping human judgment, accountability, oversight, appeal, and context at the center of AI-assisted decisions.

### Q1. In Human-Centered AI, what should remain central in a high-stakes advising workflow even if AI drafts options?

- Correct `v02712-human-centered-ai-q1-correct`: Human judgment, accountability, context, and an appeal path.
  - Feedback: Insight strengthened. Human-centered AI keeps people responsible for consequential decisions.
- Distractor `v02712-human-centered-ai-q1-2-automation`: The model should decide because it sounds confident.
  - Feedback: Confidence is not accountability. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.
- Distractor `v02712-human-centered-ai-q1-3-guardrail`: A guardrail should replace all human review.
  - Feedback: Guardrails can help, but they do not carry human responsibility. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-human-centered-ai-q1-4-prompt`: The prompt should give the model moral understanding.
  - Feedback: Prompting does not create conscience. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q2. A team writes a careful system prompt for advising support. Why does that alone not make the system human-centered?

- Correct `v02712-human-centered-ai-q2-correct`: Prompts steer current behavior; accountability, governance, and appeal need system design.
  - Feedback: Good boundary. Human-centered design is a system and institution choice.
- Distractor `v02712-human-centered-ai-q2-2-prompt`: Prompts always durably update the model weights.
  - Feedback: Prompting usually changes temporary context. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-human-centered-ai-q2-3-grounding`: Prompts automatically verify every source.
  - Feedback: Verification needs evidence and process. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-human-centered-ai-q2-4-human-centered-ai`: Prompts remove the need to understand users.
  - Feedback: That reverses the point of human-centered design. This gives the prompt too much permanence; current context can steer this response without becoming stored model knowledge.

### Q3. What misconception does human-centered AI correct?

- Correct `v02712-human-centered-ai-q3-correct`: Powerful AI should not automatically get decision authority.
  - Feedback: Insight strengthened. Capability does not settle accountability.
- Distractor `v02712-human-centered-ai-q3-2-automation`: If AI is powerful, it should decide alone.
  - Feedback: High stakes call for oversight, not blind delegation. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-human-centered-ai-q3-3-consciousness`: If AI is not conscious, there are no human responsibilities.
  - Feedback: People remain responsible for system design and use. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-human-centered-ai-q3-4-rag`: If AI uses RAG, every decision is grounded enough.
  - Feedback: Retrieval can help, but decisions still need judgment. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q4. How does human-centered AI connect to the prior costs and risks cards?

- Correct `v02712-human-centered-ai-q4-correct`: It names the values and oversight that should guide tradeoffs.
  - Feedback: Good connection. Counting costs should lead to better choices, not paralysis.
- Distractor `v02712-human-centered-ai-q4-2-risk`: It says risk literacy is unnecessary once benefits are visible.
  - Feedback: Human-centered work uses risk literacy. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-human-centered-ai-q4-3-scale`: It says all tradeoffs are solved by larger models.
  - Feedback: Model size does not replace governance. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-human-centered-ai-q4-4-benefit`: It says humans should never use AI tools.
  - Feedback: Human-centered use can include AI assistance with accountability. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.

## Better AI Is a Choice (4)

Objective: Show that better AI outcomes depend on design, governance, incentives, evaluation, data choices, and human review, not inevitability.

### Q1. A team wants fewer unsupported answers in a student-support bot. Which design choice helps without pretending risk disappears?

- Correct `v02712-better-ai-choice-q1-correct`: Use retrieval, evaluation, and human review when the task needs evidence.
  - Feedback: Insight strengthened. Better AI comes from design choices and review, not one magic fix.
- Distractor `v02712-better-ai-choice-q1-2-prompt`: Use only a longer prompt and skip evaluation.
  - Feedback: A prompt can help, but evaluation and review still matter. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-better-ai-choice-q1-3-scale`: Use a larger model and remove accountability.
  - Feedback: Scale does not replace governance. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-better-ai-choice-q1-4-rag`: Turn off retrieval so the model relies only on fluency.
  - Feedback: Evidence-sensitive tasks often need grounded context. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Which choices can durably shape future AI behavior?

- Correct `v02712-better-ai-choice-q2-correct`: Training data, fine-tuning, policies, evaluation standards, and incentives.
  - Feedback: Good breadth. Some choices affect models; others affect workflows and institutions.
- Distractor `v02712-better-ai-choice-q2-2-sampling`: Only the final sampled token in one response.
  - Feedback: That is a temporary generation outcome. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.
- Distractor `v02712-better-ai-choice-q2-3-prompt`: Only one user prompt in one chat.
  - Feedback: A prompt can steer one run but may not durably shape the system. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-better-ai-choice-q2-4-interface`: Only the color of the interface.
  - Feedback: Interface matters for use, but this answer asks about durable behavior shaping. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. What misconception does "better AI is a choice" avoid?

- Correct `v02712-better-ai-choice-q3-correct`: Harms are not inevitable just because the technology is useful.
  - Feedback: Insight strengthened. Institutions can make better or worse design and governance choices.
- Distractor `v02712-better-ai-choice-q3-2-risk`: Every harm is unavoidable, so review is pointless.
  - Feedback: Review and design can reduce harms. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-better-ai-choice-q3-3-benefit`: Every benefit proves the system is already responsible.
  - Feedback: Useful systems still need governance. This collapses distinct layers of the AI landscape; a product, an LLM, and the broader AI category are not interchangeable.
- Distractor `v02712-better-ai-choice-q3-4-softmax`: Every choice happens inside softmax.
  - Feedback: Many choices are human, institutional, and design-level. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

### Q4. How do human-centered values become practical choices?

- Correct `v02712-better-ai-choice-q4-correct`: Through design, policy, governance, evaluation, data choices, and incentives.
  - Feedback: Good connection. Values need implementation details.
- Distractor `v02712-better-ai-choice-q4-2-moral-agency`: By assuming the model will choose ethics on its own.
  - Feedback: Models do not carry human accountability. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-better-ai-choice-q4-3-interface`: By hiding limitations so users feel confident.
  - Feedback: Human-centered design should make limits legible. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-better-ai-choice-q4-4-fine-tuning`: By treating all feedback as automatic fine-tuning.
  - Feedback: Feedback needs process before it becomes training. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

## Effective Prompting from Model Literacy (4)

Objective: Use model literacy to prompt clearly: shape current context, provide evidence and constraints, and remember prompting is not magic, training, or truth guarantee.

### Q1. A prompt includes the task, audience, evidence, constraints, and output format. What does that improve?

- Correct `v02712-effective-prompting-literacy-q1-correct`: The current context the model uses for this run.
  - Feedback: Insight strengthened. Prompting is context design.
- Distractor `v02712-effective-prompting-literacy-q1-2-fine-tuning`: The model weights for all future users.
  - Feedback: Prompting usually does not update weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-effective-prompting-literacy-q1-3-truth`: The truth of missing evidence.
  - Feedback: A prompt cannot create evidence that is not available. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-effective-prompting-literacy-q1-4-rag`: The retriever's access to every private file.
  - Feedback: Access depends on connected tools and permissions. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. Why is prompting not magic wording?

- Correct `v02712-effective-prompting-literacy-q2-correct`: It shapes context, constraints, and examples for a probabilistic model.
  - Feedback: Good boundary. Better prompts help the model use context; they do not cast spells.
- Distractor `v02712-effective-prompting-literacy-q2-2-training`: The exact phrase permanently teaches the model.
  - Feedback: Durable teaching requires training or adaptation. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-effective-prompting-literacy-q2-3-truth`: A clever phrase guarantees a true answer.
  - Feedback: Truth still depends on evidence and review. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-effective-prompting-literacy-q2-4-consciousness`: A clever phrase gives the model consciousness.
  - Feedback: Prompt responsiveness is not awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.

### Q3. A user asks for a citation but provides no source and no retrieval tool is connected. What should model literacy suggest?

- Correct `v02712-effective-prompting-literacy-q3-correct`: Ask for sources or retrieval; do not trust citation-shaped output alone.
  - Feedback: Insight strengthened. Prompting can request evidence, but systems need actual evidence to ground claims.
- Distractor `v02712-effective-prompting-literacy-q3-2-web-search`: The model will always search the web by itself.
  - Feedback: Search requires a connected tool or retrieval system. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.
- Distractor `v02712-effective-prompting-literacy-q3-3-fine-tuning`: The model can fine-tune itself into knowing the source.
  - Feedback: Ordinary prompting is not self-training. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-effective-prompting-literacy-q3-4-citation`: A confident citation format proves grounding.
  - Feedback: Citation shape must be checked against real sources. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q4. How does effective prompting fit with human responsibility?

- Correct `v02712-effective-prompting-literacy-q4-correct`: It improves the current run while keeping review, evidence, and accountability visible.
  - Feedback: Good synthesis. Individual practice helps, but it does not replace governance or judgment.
- Distractor `v02712-effective-prompting-literacy-q4-2-accountability`: It moves all responsibility from humans to the model.
  - Feedback: Humans remain responsible for use and decisions. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-effective-prompting-literacy-q4-3-risk`: It removes the need for risk and cost review.
  - Feedback: Better prompts do not erase deployment questions. This choice points to a nearby idea, but the checkpoint is asking for a more exact model boundary.
- Distractor `v02712-effective-prompting-literacy-q4-4-response-token`: It makes generated tokens permanent training data.
  - Feedback: Generated tokens are appended in context, not automatically trained into weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

## Model Literate Synthesis (5)

Objective: Synthesize the full prompt-to-response path and use it to make better human judgments about evidence, limits, risks, benefits, and accountability.

### Q1. A learner traces one answer from prompt to output. Which trace keeps the mechanism clear?

- Correct `v02712-model-literate-synthesis-q1-correct`: Prompt tokens become IDs and embeddings; layers shape states; scores become probabilities; sampling appends tokens.
  - Feedback: Insight strengthened. The synthesis follows the model path without turning it into magic.
- Distractor `v02712-model-literate-synthesis-q1-2-consciousness`: The model reads the prompt consciously and writes the whole answer at once.
  - Feedback: That skips the next-token mechanism and adds awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-model-literate-synthesis-q1-3-training`: The prompt immediately updates weights, then the answer is retrieved from memory.
  - Feedback: Prompting usually changes context, not durable weights. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-model-literate-synthesis-q1-4-grounding`: RAG, softmax, and grounding are all the same truth-checking step.
  - Feedback: Those are different parts of a system and generation process. This treats lookup or citation as learning or truth; retrieved evidence can help only when the system uses and checks it well.

### Q2. A model-literate explanation separates durable, temporary, retrieved, and generated pieces. Which separation is strongest?

- Correct `v02712-model-literate-synthesis-q2-correct`: Weights persist; context and states are temporary; retrieval adds context.
  - Feedback: Good boundary. Keeping these buckets separate prevents many myths.
- Distractor `v02712-model-literate-synthesis-q2-2-memory`: Everything useful becomes permanent memory after one answer.
  - Feedback: Usefulness during a run does not imply durable storage. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-model-literate-synthesis-q2-3-rag`: Retrieved evidence is the same as fine-tuning.
  - Feedback: Retrieval supplies context; fine-tuning changes learned behavior. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-model-literate-synthesis-q2-4-truth`: Generated response tokens prove the answer is true.
  - Feedback: Generated text still needs evidence and review. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.

### Q3. In Model Literate Synthesis, what should learners do when fluency outruns support?

- Correct `v02712-model-literate-synthesis-q3-correct`: Look for grounding, sources, uncertainty, and human review.
  - Feedback: Insight strengthened. Model literacy turns demystification into better judgment.
- Distractor `v02712-model-literate-synthesis-q3-2-understanding`: Assume fluent output equals understanding.
  - Feedback: Fluency is not wisdom or awareness. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-model-literate-synthesis-q3-3-intent`: Assume hallucinations are always intentional lies.
  - Feedback: Unsupported output does not prove intent. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-model-literate-synthesis-q3-4-probability`: Assume probability is the same as truth.
  - Feedback: High-probability tokens can still be unsupported. This treats fluency, confidence, or probability as proof; likely text still needs evidence when accuracy matters.

### Q4. Why does following one prompt across the whole day help final synthesis?

- Correct `v02712-model-literate-synthesis-q4-correct`: It connects training history, inference mechanics, evidence, risks, costs, and human use.
  - Feedback: Good connection. The Journey ties mechanism to responsible decisions.
- Distractor `v02712-model-literate-synthesis-q4-2-training`: It says training and inference are the same step.
  - Feedback: The Journey separates durable learning from temporary inference. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-model-literate-synthesis-q4-3-risk`: It says risks are all myths once mechanics are visible.
  - Feedback: Mechanics clarify real risks as well as myths. This gives the prompt too much permanence; current context can steer this response without becoming stored model knowledge.
- Distractor `v02712-model-literate-synthesis-q4-4-human-review`: It says human judgment matters only before tokenization.
  - Feedback: Judgment matters throughout use and deployment. This gives the prompt too much permanence; current context can steer this response without becoming stored model knowledge.

### Q5. What is the badge-level mental model Prompt Life wants to leave behind?

- Correct `v02712-model-literate-synthesis-q5-correct`: LLMs are powerful pattern systems whose outputs need evidence, context awareness, and responsibility.
  - Feedback: Insight strengthened. The badge marks durable model literacy, not trivia.
- Distractor `v02712-model-literate-synthesis-q5-2-consciousness`: LLMs are minds whose intentions explain every answer.
  - Feedback: Mind language can mislead when it hides the mechanism. This gives the system human-like awareness or intent; shaped behavior is still not a mind, motive, or conscience.
- Distractor `v02712-model-literate-synthesis-q5-3-database`: LLMs are databases that always return stored facts.
  - Feedback: They generate tokens from weights and context, sometimes with retrieval. This makes a current-use step permanent; ordinary prompts, retrieval, and inference do not automatically rewrite weights.
- Distractor `v02712-model-literate-synthesis-q5-4-risk`: LLMs are harmless toys because myths are exaggerated.
  - Feedback: Reducing myths should sharpen attention to real risks. This moves the job to a neighboring model step; tokenization, embeddings, layers, scores, and sampling do different work.

