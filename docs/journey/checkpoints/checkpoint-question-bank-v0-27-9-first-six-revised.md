# Prompt Life 0.27.9-first-six-revised

Status: active-development-pilot for the first six Journey learning cards.

## Executive Summary

- Six learning cards revised: 6
- Total questions: 19
- Total choices: 76
- Wrong-answer distractors: 57
- App status: development-only live pilot
- Active by default: true
- Legacy fallback: ?legacyCheckpoints=1 or ?checkpointBank=legacy

## Active Learning Cards

- What Is an LLM?
- Where LLMs Fit
- Rationalists vs Empiricists
- Training
- Pretraining
- Overfitting and Generalization

## What Is an LLM?

### Human-review edits applied

- kept: Q1 mechanism stem and core distractor set.
- revised: Q1 correct answer shortened.; Q2 stem and correct answer revised for model-literate judgment.
- added: None
- removed: None

### Final checkpoint questions

#### v0279-what-is-llm-q1

- Type: mechanism in action
- Stem: When an LLM answers a prompt by generating one token at a time, what is the model doing at each step?
- Correct choice ID: v0279-what-is-llm-q1-correct

- v0279-what-is-llm-q1-correct (correct): It scores possible next tokens from the current context, selects one, appends it, and repeats.
  - feedback: Good distinction. The model is using fixed learned weights and temporary context to make the next-token step.
- v0279-what-is-llm-q1-conscious-reader: It reads with conscious understanding, then writes the whole answer at once.
  - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
  - represented misconception: conscious mind vs fluent model behavior
  - represented glossary term: llm
  - distractor source: same-card
  - distractor rationale: Tempting because fluent text can sound like a human explanation.
- v0279-what-is-llm-q1-hidden-search: It searches a hidden database and copies the best matching passage.
  - feedback: This choice reveals a common mix-up. Search can be added around a model, but a plain LLM generates from context and learned weights.
  - represented misconception: search engine/database vs generative model
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - distractor rationale: Tempting because broad model knowledge can feel like search.
- v0279-what-is-llm-q1-weight-change: It changes its weights each time the user sends a new prompt.
  - feedback: That would be true only if a separate training process updated weights. Ordinary inference usually leaves weights fixed.
  - represented misconception: training vs inference
  - represented glossary term: training
  - distractor source: same-card
  - distractor rationale: Tempting because the model may seem to adapt within a conversation.

Human review notes applied:
- Kept the v0.27.8 stem.
- Shortened the correct answer and used selects one because sampling has not yet been introduced.
- Kept conscious-reader, search/database, and changing-weights distractors.

#### v0279-what-is-llm-q2

- Type: misconception diagnosis
- Stem: An LLM gives a fluent explanation of a poem. What should a model-literate learner conclude?
- Correct choice ID: v0279-what-is-llm-q2-correct

- v0279-what-is-llm-q2-correct (correct): It generated response tokens from context and learned patterns; fluency does not prove awareness.
  - feedback: Insight strengthened. This is the fluent-behavior-without-awareness boundary Prompt Life wants learners to hold.
- v0279-what-is-llm-q2-inner-awareness: It must have inner awareness because the explanation sounds human.
  - feedback: Not quite. That gives the model too much mind. Fluent behavior can happen without awareness.
  - represented misconception: conscious mind vs fluent model behavior
  - represented glossary term: llm
  - distractor source: same-card
  - distractor rationale: Tempting because human-like language invites human-like interpretation.
- v0279-what-is-llm-q2-hidden-source: It must have found a hidden perfect source and copied the interpretation.
  - feedback: Close, but this describes search or retrieval better than a plain LLM response. A fluent answer is not the same as cited evidence.
  - represented misconception: database lookup vs learned generation
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - distractor rationale: Tempting because polished answers can feel copied from a source.
- v0279-what-is-llm-q2-prompt-learning: The poem prompt permanently taught the base model a new skill.
  - feedback: That would require training. A normal prompt can shape temporary context without durably updating weights.
  - represented misconception: prompt/context change vs durable weight update
  - represented glossary term: weight-update
  - distractor source: same-card
  - distractor rationale: Tempting because earlier context can shape later replies in a chat.

Human review notes applied:
- Revised the stem exactly toward model-literate learner judgment.
- Kept fluent-without-awareness framing in plain language.

## Where LLMs Fit

### Human-review edits applied

- kept: Q1 family/branch distinction.; Q2 category-map purpose.
- revised: Q1 denoising wording.; Q2 shorter correct answer and length-balanced distractors.
- added: Q3 model-vs-product distinction.
- removed: None

### Final checkpoint questions

#### v0279-where-llms-fit-q1

- Type: applied scenario
- Stem: A campus tool summarizes text with an LLM, while another creates images by denoising a noisy pattern. What does that show?
- Correct choice ID: v0279-where-llms-fit-q1-correct

- v0279-where-llms-fit-q1-correct (correct): Generative AI is a family; LLMs and diffusion models are different branches.
  - feedback: Good distinction. Generative AI is a family, and different branches can use different mechanisms.
- v0279-where-llms-fit-q1-all-llms: All generative AI tools are LLMs because ChatGPT is generative AI.
  - feedback: Not quite. An LLM is one kind of generative AI, not the whole category.
  - represented misconception: LLM vs generative AI family
  - represented glossary term: generative-ai
  - distractor source: same-card
  - distractor rationale: Tempting because ChatGPT is many learners’ first generative AI example.
- v0279-where-llms-fit-q1-text-only-ai: The image tool is not AI unless it generates language tokens.
  - feedback: Close, but image models can be AI without using the LLM text-token loop.
  - represented misconception: LLM output vs broader generative outputs
  - represented glossary term: diffusion
  - distractor source: same-card
  - distractor rationale: Tempting because this app starts with language models.
- v0279-where-llms-fit-q1-ai-ml-same: AI and machine learning are the same label, so the branches do not matter.
  - feedback: This choice collapses useful categories. Machine learning is a major branch inside the broader AI field.
  - represented misconception: AI vs machine learning category boundary
  - represented glossary term: machine-learning
  - distractor source: same-card
  - distractor rationale: Tempting because public language often blurs these words.

Human review notes applied:
- Changed denoising noise to denoising a noisy pattern.
- Kept the generative-family versus LLM/diffusion branch distinction.

#### v0279-where-llms-fit-q2

- Type: boundary distinction
- Stem: When people say an LLM sits inside the broader AI family, which category map is most useful?
- Correct choice ID: v0279-where-llms-fit-q2-correct

- v0279-where-llms-fit-q2-correct (correct): AI is broad; machine learning learns from data; deep learning uses layers; generative AI creates outputs; LLMs focus on language/code.
  - feedback: Insight strengthened. The map keeps overlapping terms useful without making them interchangeable.
- v0279-where-llms-fit-q2-all-ai-llm: AI means LLM; machine learning, deep learning, and generative AI are just extra names.
  - feedback: Not quite. LLMs are an important branch, not the root of the AI tree.
  - represented misconception: all AI is an LLM
  - represented glossary term: ai
  - distractor source: same-card
  - distractor rationale: Tempting because LLMs currently dominate public attention.
- v0279-where-llms-fit-q2-rules-learned-same: Rule-based AI, machine learning, and LLMs all work by following the same written rules.
  - feedback: Close, but rule-based systems rely on explicit rules while learned models use patterns shaped from data.
  - represented misconception: symbolic AI vs learned model boundary
  - represented glossary term: symbolic-ai
  - distractor source: same-card
  - distractor rationale: Tempting because all software runs instructions somewhere.
- v0279-where-llms-fit-q2-diffusion-same-loop: Diffusion models, LLMs, and search engines all use the same language-token loop.
  - feedback: This choice reveals a common mix-up. Diffusion often denoises patterns; LLM text generation usually appends response tokens.
  - represented misconception: diffusion vs autoregressive language generation
  - represented glossary term: diffusion
  - distractor source: same-card
  - distractor rationale: Tempting because all can appear inside AI products.

Human review notes applied:
- Shortened the correct answer while preserving the category map.
- Made distractors closer in length and structure.

#### v0279-where-llms-fit-q3

- Type: model vs product distinction
- Stem: A chatbot product includes an LLM, a search tool, safety filters, and a user interface. What is the LLM?
- Correct choice ID: v0279-where-llms-fit-q3-correct

- v0279-where-llms-fit-q3-correct (correct): The language-generating model inside the larger product.
  - feedback: Good distinction. A product may wrap an LLM with tools, policies, and interface pieces.
- v0279-where-llms-fit-q3-whole-app: The whole app, including every tool and button.
  - feedback: Not quite. The product can include an LLM, but the LLM is not every surrounding tool and screen.
  - represented misconception: model vs product/app wrapper
  - represented glossary term: ai
  - distractor source: author-created misconception
  - distractor rationale: Tempting because users experience the whole product as one AI thing.
- v0279-where-llms-fit-q3-safety-policy: The safety policy that blocks some outputs.
  - feedback: Close, but a safety policy shapes behavior around the model; it is not the language model itself.
  - represented misconception: policy/guardrail vs model
  - represented glossary term: policy
  - distractor source: nearby-stage
  - distractor rationale: Tempting because safety behavior is visible in the product.
- v0279-where-llms-fit-q3-search-index: The database or search index the app may call.
  - feedback: This describes a retrieval or search component. The LLM generates language from context and learned weights.
  - represented misconception: retrieval/search component vs language model
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - distractor rationale: Tempting because some chatbot products include search.

Human review notes applied:
- Added the requested model-vs-product checkpoint question.
- Used the requested correct answer and wrong-answer feedback boundaries.

## Rationalists vs Empiricists

### Human-review edits applied

- kept: Q1 rule-based versus learned weights scenario.; Q2 loss mechanism stem.; Q3 university AI app scenario.
- revised: Q2 replaced weak retrieval distractor with confidence/probability distractor.; Q3 correct answer and feedback tightened.
- added: None
- removed: None

### Final checkpoint questions

#### v0279-history-q1

- Type: boundary distinction
- Stem: If a system solves a task only by following hand-written if-then rules, how is it different from an LLM?
- Correct choice ID: v0279-history-q1-correct

- v0279-history-q1-correct (correct): The rule-based system applies explicit rules; an LLM’s fluency mostly comes from learned weights shaped by examples.
  - feedback: Good distinction. LLMs mostly belong to the learned-patterns tradition, even when products around them use rules.
- v0279-history-q1-loss-every-task: The rule-based system measures loss and updates weights after every task.
  - feedback: Not quite. Loss and weight updates belong to training learned models, not to a pure if-then rule system.
  - represented misconception: symbolic rules vs training loop
  - represented glossary term: loss
  - distractor source: same-card
  - distractor rationale: Tempting because loss is nearby in the deep-learning explanation.
- v0279-history-q1-conscious-llm: The LLM has conscious reasoning, while the rule-based system has none.
  - feedback: That gives the LLM too much mind. The key boundary here is learned weights versus explicit rules.
  - represented misconception: conscious reasoning vs learned behavior
  - represented glossary term: llm
  - distractor source: explicit-confusable
  - distractor rationale: Tempting because LLM language can sound like reasoning from the inside.
- v0279-history-q1-all-rules: There is no difference; both systems are just written rulebooks.
  - feedback: Close, but LLM behavior is not mainly written as explicit if-then rules; it is shaped by training.
  - represented misconception: LLM as hand-coded rulebook
  - represented glossary term: symbolic-ai
  - distractor source: same-card
  - distractor rationale: Tempting because both systems can produce predictable outputs.

Human review notes applied:
- Kept the question mostly as-is.
- Tightened the correct answer to emphasize explicit rules versus learned weights.

#### v0279-history-q2

- Type: mechanism in action
- Stem: During deep-learning training, why does the system measure loss?
- Correct choice ID: v0279-history-q2-correct

- v0279-history-q2-correct (correct): Loss measures prediction error so an optimizer can adjust weights.
  - feedback: Insight strengthened. Loss is the numerical training signal, not a feeling or truth meter.
- v0279-history-q2-moral-good: Loss tells the model whether a generated answer is morally good.
  - feedback: Not quite. Loss is a numerical error signal; alignment and policy questions need additional methods.
  - represented misconception: loss vs human value judgment
  - represented glossary term: loss
  - distractor source: same-card
  - distractor rationale: Tempting because loss sounds like a judgment word.
- v0279-history-q2-confidence-score: Loss is the model’s confidence score for the next token during generation.
  - feedback: Close, but confidence or probability shapes generation. Loss measures training error so weights can be adjusted.
  - represented misconception: loss vs confidence/probability during generation
  - represented glossary term: probability
  - distractor source: nearby-stage
  - distractor rationale: Tempting because both are numerical signals related to prediction.
- v0279-history-q2-final-answer: Loss writes the final answer after the model has finished thinking.
  - feedback: Not quite. Loss is used during training; it is not the model writing a response.
  - represented misconception: training signal vs response generation
  - represented glossary term: response
  - distractor source: nearby-stage
  - distractor rationale: Tempting because learners may treat every internal step as answer writing.

Human review notes applied:
- Kept the stem.
- Replaced the weak retrieval distractor with the requested confidence/probability distractor.

#### v0279-history-q3

- Type: human-use judgment
- Stem: A university AI app uses an LLM plus policy filters, retrieval, and hand-written rules. What should a model-literate user conclude?
- Correct choice ID: v0279-history-q3-correct

- v0279-history-q3-correct (correct): Modern AI products can combine learned models, rules, tools, and policies; the LLM inside is still a learned-pattern model.
  - feedback: Good distinction. The product can be hybrid even when the LLM itself is learned from data.
- v0279-history-q3-no-learning-if-rules: Any rule in the app means the LLM is no longer trained from data.
  - feedback: Not quite. Rules can wrap or guide a learned model without erasing the learned weights inside it.
  - represented misconception: hybrid system vs pure symbolic replacement
  - represented glossary term: rule-based-ai
  - distractor source: same-card
  - distractor rationale: Tempting because rule-based pieces can be visible in product behavior.
- v0279-history-q3-conscious-product: Any fluent answer means the app is consciously reasoning.
  - feedback: That gives the model too much mind. The app can combine tools and still lack conscious understanding.
  - represented misconception: fluent behavior vs awareness
  - represented glossary term: llm
  - distractor source: explicit-confusable
  - distractor rationale: Tempting because the whole app may feel conversational.
- v0279-history-q3-permanent-finetune: Retrieval or filters permanently fine-tune the model on every use.
  - feedback: Close, but retrieval and filters can shape the current response without durably changing model weights.
  - represented misconception: retrieval/filtering vs durable training
  - represented glossary term: fine-tuning
  - distractor source: nearby-stage
  - distractor rationale: Tempting because the app appears to adapt to local material.

Human review notes applied:
- Kept the university app scenario.
- Revised the correct answer and feedback to emphasize hybrid products and learned-pattern LLMs.

## Training

### Human-review edits applied

- kept: Q1 stem and correct answer.; Q3 durability question.; Q4 training-loop sequence.
- revised: Q1 replaced softmax-truth distractor.; Q2 rewritten as a positive stem.; Q4 replaced diffusion distractor with user-correction misconception.
- added: None
- removed: None

### Final checkpoint questions

#### v0279-training-q1

- Type: mechanism in action
- Stem: During training, the model predicts a target token and gets it wrong. What makes that moment learning rather than ordinary inference?
- Correct choice ID: v0279-training-q1-correct

- v0279-training-q1-correct (correct): The training process uses the loss signal to update weights.
  - feedback: Good distinction. The durable weight update is what makes this training.
- v0279-training-q1-append-response: The model appends the mistaken token to a normal live response.
  - feedback: Not quite. Appending a response token is inference behavior; training uses loss to change weights.
  - represented misconception: training vs autoregressive inference
  - represented glossary term: inference
  - distractor source: same-card
  - distractor rationale: Tempting because generation also chooses and appends tokens.
- v0279-training-q1-durable-memory: The prompt becomes durable memory stored inside the model’s weights.
  - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
  - represented misconception: context vs durable weight update
  - represented glossary term: memory
  - distractor source: author-created misconception
  - distractor rationale: Tempting because chat context can feel remembered.
- v0279-training-q1-likelihood-truth: The model treats the most likely answer as automatically true.
  - feedback: Not quite. Likelihood is not truth, and this training moment matters because loss can drive a weight update.
  - represented misconception: likelihood vs truth
  - represented glossary term: probability
  - distractor source: nearby-stage
  - distractor rationale: Tempting because likely answers can sound authoritative.

Human review notes applied:
- Kept the stem and correct answer.
- Replaced the premature softmax-truth distractor with the requested likelihood-vs-truth distractor.

#### v0279-training-q2

- Type: boundary distinction
- Stem: A student asks a chatbot one question during ordinary use. Which statement is usually true?
- Correct choice ID: v0279-training-q2-correct

- v0279-training-q2-correct (correct): The model uses fixed weights and temporary context; the chat usually does not rewrite the weights.
  - feedback: Insight strengthened. Normal chat inference can use context, but it usually does not rewrite weights.
- v0279-training-q2-permanent-update: The chat permanently updates the base model’s weights.
  - feedback: Not quite. That would require a training process, not ordinary inference.
  - represented misconception: ordinary inference vs training update
  - represented glossary term: training
  - distractor source: same-card
  - distractor rationale: Tempting because the model appears to adapt to the user.
- v0279-training-q2-durable-memory: The model stores the prompt as durable memory inside its weights.
  - feedback: This choice reveals a common mix-up. Context can shape the current chat without becoming a weight update.
  - represented misconception: context vs durable memory/weights
  - represented glossary term: memory
  - distractor source: author-created misconception
  - distractor rationale: Tempting because the model can refer to earlier chat context.
- v0279-training-q2-optimizer-after-response: The optimizer trains the model after every response.
  - feedback: Close, but optimizers update weights during training, not after every normal response.
  - represented misconception: optimizer/weight update vs normal response
  - represented glossary term: weight-update
  - distractor source: same-card
  - distractor rationale: Tempting because training and inference both involve model computation.

Human review notes applied:
- Rewrote the negative stem as the requested positive stem.
- Used the requested correct answer and distractor set.

#### v0279-training-q3

- Type: causal consequence
- Stem: Why can training change how the model behaves tomorrow, while inference usually cannot?
- Correct choice ID: v0279-training-q3-correct

- v0279-training-q3-correct (correct): Training changes parameters that future runs reuse; inference uses temporary computations for the current run.
  - feedback: Good distinction. Durable parameters carry forward; inference-time states usually do not.
- v0279-training-q3-optimizer-inference: Inference is where the optimizer changes weights for future runs.
  - feedback: Not quite. Optimizer-driven weight updates belong to training, not ordinary inference.
  - represented misconception: optimizer/weight update vs inference
  - represented glossary term: weight-update
  - distractor source: same-card
  - distractor rationale: Tempting because both training and inference run model computations.
- v0279-training-q3-prompt-only: Training only changes the visible prompt text for one response.
  - feedback: Close, but prompt changes are temporary input changes; training changes learned numbers.
  - represented misconception: prompt/context vs weights
  - represented glossary term: prompt
  - distractor source: nearby-stage
  - distractor rationale: Tempting because prompt text clearly changes a response.
- v0279-training-q3-truth-guarantee: Training guarantees that every future answer will be true.
  - feedback: This choice overclaims. Training can improve behavior, but it does not guarantee truth.
  - represented misconception: training improvement vs truth guarantee
  - represented glossary term: probability
  - distractor source: author-created misconception
  - distractor rationale: Tempting because training sounds like making the model better.

Human review notes applied:
- Kept the v0.27.8 stem and correct answer.

#### v0279-training-q4

- Type: model trace
- Stem: In a training loop, which sequence is the durable learning path?
- Correct choice ID: v0279-training-q4-correct

- v0279-training-q4-correct (correct): Example -> prediction -> loss -> weight update.
  - feedback: Insight strengthened. That is the weight-changing path.
- v0279-training-q4-generation-loop: Prompt -> response token -> append -> next response token.
  - feedback: Close, but that sequence describes inference/generation, not training.
  - represented misconception: training loop vs autoregressive generation
  - represented glossary term: autoregression
  - distractor source: nearby-stage
  - distractor rationale: Tempting because this is the model’s generation loop.
- v0279-training-q4-search-context: Search -> outside passage -> current context -> answer.
  - feedback: That describes a search or retrieval step. It can add temporary context; it does not by itself update weights.
  - represented misconception: training vs retrieval/context
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - distractor rationale: Tempting because outside text can improve an answer.
- v0279-training-q4-user-correction: User correction -> better answer -> permanent learning inside the same chat.
  - feedback: Not quite. A correction can steer the current conversation, but durable learning requires a training process.
  - represented misconception: conversation steering vs durable training
  - represented glossary term: training
  - distractor source: same-card
  - distractor rationale: Tempting because a correction can improve the current conversation.

Human review notes applied:
- Kept the sequence idea and correct answer.
- Removed the premature diffusion distractor.
- Added the requested user-correction distractor.

## Pretraining

### Human-review edits applied

- kept: Q1 signal/next-token-loss question.; Q4 core fact-like-output scenario.
- revised: Q2 avoids conscious-recall wording.; Q3 replaced citation-list distractor.; Q4 avoids seems-to-know stem and clarifies source-like output is not evidence.
- added: None
- removed: None

### Final checkpoint questions

#### v0279-pretraining-q1

- Type: mechanism in action
- Stem: During pretraining, what signal teaches the model broad language patterns across many examples?
- Correct choice ID: v0279-pretraining-q1-correct

- v0279-pretraining-q1-correct (correct): Repeated prediction error/loss from next-token targets changes weights over many training steps.
  - feedback: Good distinction. Pretraining scales the training loop across many examples.
- v0279-pretraining-q1-live-chat: A user conversation at deployment permanently rewrites the model.
  - feedback: Not quite. Pretraining happens before normal use; an ordinary chat usually does not rewrite weights.
  - represented misconception: pretraining vs inference
  - represented glossary term: inference
  - distractor source: same-card
  - distractor rationale: Tempting because the model can seem to adapt inside a chat.
- v0279-pretraining-q1-written-rules: A human writes every rule the model will follow.
  - feedback: Close, but pretraining is learned from examples, not a complete rulebook written by hand.
  - represented misconception: learned patterns vs symbolic rules
  - represented glossary term: symbolic-ai
  - distractor source: nearby-stage
  - distractor rationale: Tempting because software often has hand-written rules.
- v0279-pretraining-q1-perfect-copy: The model stores a perfect copy of every source document.
  - feedback: This choice reveals a common mix-up. Pretraining shapes weights; it is not perfect document storage.
  - represented misconception: pattern learning vs perfect source recall
  - represented glossary term: training-data
  - distractor source: same-card
  - distractor rationale: Tempting because source data influences the model.

Human review notes applied:
- Kept the v0.27.8 stem and correct answer mostly as-is.

#### v0279-pretraining-q2

- Type: boundary distinction
- Stem: Why can pretraining create broad capability without making the model a perfect library of its sources?
- Correct choice ID: v0279-pretraining-q2-correct

- v0279-pretraining-q2-correct (correct): It shapes statistical patterns in weights; it does not create a searchable copy of every source.
  - feedback: Good distinction. Pretraining can shape broad ability without turning the model into a perfect source library.
- v0279-pretraining-q2-private-files: It gives the model direct access to every private file on demand.
  - feedback: Not quite. Training data exposure is not the same as access to every private file.
  - represented misconception: training data vs universal file access
  - represented glossary term: training-data
  - distractor source: same-card
  - distractor rationale: Tempting because broad training data can sound like broad access.
- v0279-pretraining-q2-search-context: It inserts the original source into every future prompt context.
  - feedback: Close, but adding source text to context is different from pretraining. Pretraining changes weights before use.
  - represented misconception: pretraining vs retrieval/context
  - represented glossary term: retrieval
  - distractor source: author-created misconception
  - distractor rationale: Tempting because source material can sometimes be added to a prompt.
- v0279-pretraining-q2-after-user-prompt: It happens only after a user asks a specific question.
  - feedback: Pretraining happens before deployment. The user prompt later uses the pretrained weights.
  - represented misconception: pretraining vs deployment-time inference
  - represented glossary term: inference
  - distractor source: same-card
  - distractor rationale: Tempting because learners meet the model only during use.

Human review notes applied:
- Revised the correct answer to avoid conscious-recall framing.
- Used searchable copy of every source wording.

#### v0279-pretraining-q3

- Type: causal consequence
- Stem: If pretraining examples include many styles and task shapes, what can change inside the model?
- Correct choice ID: v0279-pretraining-q3-correct

- v0279-pretraining-q3-correct (correct): Weights can shift so future prompts activate more useful language/code patterns.
  - feedback: Good distinction. Pretraining changes reusable model structure before later prompts arrive.
- v0279-pretraining-q3-current-context: The model’s current chat context becomes permanently larger.
  - feedback: Not quite. Context is temporary input; pretraining changes reusable weights before later prompts arrive.
  - represented misconception: pretraining weights vs temporary context
  - represented glossary term: context window
  - distractor source: nearby-stage
  - distractor rationale: Tempting because context also affects output.
- v0279-pretraining-q3-interface: Only the app’s buttons, labels, or interface change.
  - feedback: This describes product UI changes, not the model’s learned parameters.
  - represented misconception: model weights vs product interface
  - represented glossary term: foundation-model
  - distractor source: nearby-stage
  - distractor rationale: Tempting because users meet models through apps.
- v0279-pretraining-q3-safety-policy: Only a safety policy is added around the model.
  - feedback: Close, but a policy can shape a product around the model; pretraining changes the model’s reusable weights.
  - represented misconception: pretraining vs product policy wrapper
  - represented glossary term: policy
  - distractor source: nearby-stage
  - distractor rationale: Tempting because products often include safety behavior.

Human review notes applied:
- Replaced the citation-list distractor with current chat context becomes permanently larger.

#### v0279-pretraining-q4

- Type: misconception diagnosis
- Stem: A base model produces fact-like text about public topics. What is the model-literate explanation?
- Correct choice ID: v0279-pretraining-q4-correct

- v0279-pretraining-q4-correct (correct): Pretraining shaped weights with patterns from data, so the model may generate fact-like text without retrieving the original page.
  - feedback: Insight strengthened. Source-like output can come from pretrained patterns, but it is not the same as cited evidence.
- v0279-pretraining-q4-web-every-time: It must be browsing the web by itself for every answer.
  - feedback: Not quite. Some systems browse or retrieve, but a base model can also generate fact-like text from pretrained weights.
  - represented misconception: pretraining vs web retrieval
  - represented glossary term: retrieval
  - distractor source: nearby-stage
  - distractor rationale: Tempting because web search is a familiar way to find facts.
- v0279-pretraining-q4-conscious-memory: It must consciously remember reading those pages.
  - feedback: That gives the model too much mind. It has learned weights, not conscious recollection.
  - represented misconception: fluent fact-like output vs awareness
  - represented glossary term: llm
  - distractor source: author-created misconception
  - distractor rationale: Tempting because the output can sound like human memory.
- v0279-pretraining-q4-finetuning-alone: Fine-tuning alone explains all broad model knowledge.
  - feedback: Close, but fine-tuning is targeted shaping after broad pretraining; it does not usually explain the whole foundation.
  - represented misconception: pretraining vs fine-tuning
  - represented glossary term: fine-tuning
  - distractor source: nearby-stage
  - distractor rationale: Tempting because fine-tuning is another training phase.

Human review notes applied:
- Changed the stem to avoid seems to know.
- Kept web browsing, conscious memory, and fine-tuning distractors.
- Clarified that source-like output is not cited evidence.

## Overfitting and Generalization

### Human-review edits applied

- kept: Q1 and Q2 core stems and correct answers.
- revised: Q1 replaced RAG distractor.; Q2 replaced context-window distractor.; Q3 rewritten without fine-tuning as the main frame.
- added: None
- removed: None

### Final checkpoint questions

#### v0279-overfitting-generalization-q1

- Type: applied scenario
- Stem: A model gets every training example right but fails on new validation examples. What problem is showing up?
- Correct choice ID: v0279-overfitting-generalization-q1-correct

- v0279-overfitting-generalization-q1-correct (correct): Overfitting: the model fit training examples too narrowly instead of learning patterns that generalize.
  - feedback: Good diagnosis. The held-out examples reveal whether the pattern transfers.
- v0279-overfitting-generalization-q1-generalization: Generalization: the model is working well on unseen cases.
  - feedback: Not quite. Generalization means good performance on new examples; this scenario shows the opposite.
  - represented misconception: overfitting vs generalization
  - represented glossary term: generalization
  - distractor source: same-card
  - distractor rationale: Tempting because both terms describe training performance.
- v0279-overfitting-generalization-q1-better-training: Better training: the model has clearly learned the general rule.
  - feedback: Not quite. If it fails on new validation examples, high training performance is not enough evidence of generalization.
  - represented misconception: training performance vs validation failure
  - represented glossary term: training-data
  - distractor source: same-card
  - distractor rationale: Tempting because perfect training performance feels reassuring.
- v0279-overfitting-generalization-q1-inference: Inference: the model is simply generating one token at a time.
  - feedback: Close, but inference is normal model use; overfitting is a training/evaluation failure mode.
  - represented misconception: training/evaluation failure vs inference process
  - represented glossary term: inference
  - distractor source: nearby-stage
  - distractor rationale: Tempting because all later model use involves inference.

Human review notes applied:
- Kept the stem and correct answer.
- Replaced the RAG distractor with better training.

#### v0279-overfitting-generalization-q2

- Type: human-use judgment
- Stem: Why do model builders test on held-out validation data instead of only training examples?
- Correct choice ID: v0279-overfitting-generalization-q2-correct

- v0279-overfitting-generalization-q2-correct (correct): Held-out data checks whether learned patterns work on examples the model did not train on.
  - feedback: Insight strengthened. Validation is about transfer, not memorized training performance.
- v0279-overfitting-generalization-q2-extra-training: Validation data is just extra training data used to lower loss.
  - feedback: Not quite. Validation data is held out to check transfer; it should not simply be another set of examples used to fit weights.
  - represented misconception: validation data vs training data
  - represented glossary term: validation-data
  - distractor source: same-card
  - distractor rationale: Tempting because validation examples can look like more examples.
- v0279-overfitting-generalization-q2-training-proves-all: Training examples alone prove the model will work everywhere.
  - feedback: This choice reveals the exact overfitting risk. Seen examples are not enough evidence.
  - represented misconception: training performance vs generalization
  - represented glossary term: training-data
  - distractor source: same-card
  - distractor rationale: Tempting because high training accuracy feels reassuring.
- v0279-overfitting-generalization-q2-loss-truth: A lower loss always proves every future answer is true.
  - feedback: Close, but lower loss is not a truth guarantee, especially outside the tested examples.
  - represented misconception: loss/probability vs truth guarantee
  - represented glossary term: loss
  - distractor source: nearby-stage
  - distractor rationale: Tempting because lower loss often signals improvement.

Human review notes applied:
- Kept the stem and correct answer.
- Replaced the context-window distractor with validation-as-extra-training.

#### v0279-overfitting-generalization-q3

- Type: causal consequence
- Stem: A model trained heavily on one narrow answer template works on that template but struggles with varied new prompts. What should a model-literate learner suspect?
- Correct choice ID: v0279-overfitting-generalization-q3-correct

- v0279-overfitting-generalization-q3-correct (correct): It may have fit the narrow examples too closely instead of learning a pattern that generalizes.
  - feedback: Good distinction. Targeted training can help, but narrow training can also make behavior brittle.
- v0279-overfitting-generalization-q3-prompt-rewrite: The prompts permanently rewrote the model during inference.
  - feedback: Not quite. The issue is training behavior, not prompts rewriting weights during inference.
  - represented misconception: prompt/context vs training weight changes
  - represented glossary term: prompt
  - distractor source: nearby-stage
  - distractor rationale: Tempting because prompts can change output behavior.
- v0279-overfitting-generalization-q3-conscious-choice: The model is definitely conscious but choosing not to answer.
  - feedback: That gives the model too much mind. The issue is brittle transfer, not intention.
  - represented misconception: brittle transfer vs intention/conscious choice
  - represented glossary term: llm
  - distractor source: author-created misconception
  - distractor rationale: Tempting because poor behavior can seem intentional.
- v0279-overfitting-generalization-q3-rules-always-better: Rule-based AI is always better than learned models.
  - feedback: This overgeneralizes. The issue is narrow training behavior, not proof that rules always beat learned models.
  - represented misconception: overfitting diagnosis vs symbolic superiority claim
  - represented glossary term: symbolic-ai
  - distractor source: nearby-stage
  - distractor rationale: Tempting because brittleness can make rules feel safer.

Human review notes applied:
- Rewrote the stem without fine-tuning as the main frame.
- Used the requested distractors and feedback boundaries.

