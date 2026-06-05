# Before Morning Card Inventory v0.17

Date: 2026-06-05

Source of truth: `src/data/content.ts`, `src/data/exercises.ts`, `src/data/contentReview.js`, `src/main.tsx`, and `src/components/VisualAids.tsx`.

Global UI text flag: every lesson currently renders a pill labeled `CORE IDEA` immediately followed by a heading `Core idea`. Recommendation for later implementation: keep the pill and replace or remove the duplicate heading.

Global path-label flag: Journey rows show `Essential` or `Deep`. These labels are useful in the map, but should not be repeated inside individual card summaries if they make the card feel like a separate track. Keep one eventual badge only: `Prompt Life: Model Literate`.

## 1. What Is an LLM?

- Card id: `what-is-llm`
- Title: What Is an LLM?
- Subtitle: A learned next-token prediction system
- Stage: Before Morning
- Path label: Essential
- Current review recommendation: keep
- One-sentence definition: A large language model is a learned system that turns current context into probabilities for the next token.
- Core explanation: An LLM does not read a prompt and write a whole answer at once. During inference, the current context enters the model, learned weights shape internal hidden states, the model scores possible next tokens, one token is chosen, and that token is appended before the next run. Training built the weights earlier; inference uses them.
- Where it happens: Whole model lifecycle, especially normal inference from current context to next-token probabilities to generated response token.
- Durable vs temporary note: Weights were changed during training or fine-tuning. During ordinary inference, hidden states are temporary and weights normally stay fixed.
- Prompt vs response note: Prompt tokens are given to the model. Response tokens are generated one at a time.
- Why it matters: Lowers mystery without treating the model as a mind, database, or hand-written rulebook.
- How it connects: Leads into the comparison between rule-based AI and learned systems.
- Metaphor: A vast autocomplete engine with learned structure.
- Brain Bridge: Like a person using context to anticipate what word might come next.
- Where Brain Bridge breaks: A person has a body, goals, lived experience, and awareness. The model has learned weights and temporary computations.
- Misconception: An LLM is a conscious reader or a database.
- Glossary chips: `llm`, `prompt`, `response`, `token`, `weight`, `inference`
- Visual aid id: `llm-overview`
- Tiny interaction: `cloud`, "Follow one prompt"
- Checkpoint question: Which description is most accurate?
- Correct answer: A learned prediction system
- Incorrect answers: A conscious reader; A hand-written rulebook; A search engine that knows every file
- Feedback: Correct explains learned weights turning context into next-token probabilities. Wrong answers explain that the model is not conscious, not a database, and not a hand-coded rulebook.
- Current recommendation status: keep, but expand the concrete trace just enough to prevent "next-token prediction" from sounding trivial.

## 2. Rationalists vs Empiricists

- Card id: `history`
- Title: Rationalists vs Empiricists
- Subtitle: Rules versus learned patterns
- Stage: Before Morning
- Path label: Deep
- Current review recommendation: defer
- One-sentence definition: Symbolic AI tries to reason with explicit rules and symbols; deep learning learns useful patterns from data by adjusting weights.
- Core explanation: Early AI often followed the rationalist dream of explicit rules, logic, symbols, and search. Deep learning follows a more empiricist path: expose a model to many examples, measure error, and let the system learn internal representations that work. LLMs mostly belong to the deep-learning tradition, although real systems often combine learned models with rules, tools, retrieval, filters, and policies.
- Where it happens: Historical and architectural background explaining what kind of system an LLM is.
- Durable vs temporary note: Deep learning changes weights during training. Symbolic rules are usually written or configured explicitly.
- Prompt vs response note: A prompt is not matched against one giant rulebook. It is processed through learned parameters that shape response-token probabilities.
- Why it matters: Helps learners stop expecting LLMs to behave like ordinary hand-written programs.
- How it connects: If LLMs are learned systems, the next question is how they are learned. That leads to Training.
- Metaphor: A rulebook versus a trained landscape.
- Brain Bridge: Humans use both explicit reasoning and learned intuition.
- Where Brain Bridge breaks: An LLM is not a full human mind combining logic, experience, emotion, and embodiment. It is a learned prediction system.
- Misconception: LLMs are hand-coded rulebooks, or symbolic AI is obsolete.
- Glossary chips: `rationalism`, `empiricism`, `symbolic-ai`, `deep-learning`, `training`, `weight`
- Visual aid id: `traditions`
- Tiny interaction: `cloud`, "Compare the traditions"
- Checkpoint question: Which phrase best describes the LLM tradition?
- Correct answer: Learned patterns from data
- Incorrect answers: Only fixed if-then rules; A spreadsheet macro; A conscious reasoning engine
- Feedback: Correct says LLMs are learned prediction systems shaped by data. Wrong answers preserve the point that rules still matter around software, but LLM fluency mostly comes from learned weights.
- Current recommendation status: defer. The card is useful but more abstract than the others and should be framed as a side-tour, not a bottleneck.

## 3. Training

- Card id: `training`
- Title: Training
- Subtitle: Prediction error updates weights
- Stage: Before Morning
- Path label: Essential
- Current review recommendation: keep
- One-sentence definition: Training is the process that adjusts model weights by comparing predictions with target answers, such as actual next tokens.
- Core explanation: During training, the model sees examples, predicts something, measures how wrong it was, and updates its weights to do slightly better next time. This happens over many examples and many updates. Training is where durable model capability is created.
- Where it happens: Before ordinary use, in a separate optimization process.
- Durable vs temporary note: Training durably changes weights. Ordinary inference does not.
- Prompt vs response note: Training examples may look like text prompts and completions, but the purpose is different: the system is updating weights, not merely producing a live response for a user.
- Why it matters: This is the line between learning and using.
- How it connects: Pretraining is the broad first version of this training loop.
- Metaphor: Practice that changes the instrument before the performance.
- Brain Bridge: Like practice shaping future habits or skill.
- Where Brain Bridge breaks: The model is not reflecting on mistakes. An optimizer changes numbers to reduce error.
- Misconception: When I chat with the model, it automatically trains itself.
- Glossary chips: `training`, `loss`, `weight`, `weight-update`, `parameter`, `training-data`, `inference`, `forward pass`
- Visual aid id: `training-loop`
- Tiny interaction: `training`, "Tap through the training loop"
- Checkpoint question: What makes training different from inference?
- Correct answer: Training durably updates weights
- Incorrect answers: Training only reads the current context window; Training is the same as sampling; Training writes the final answer
- Feedback: Correct distinguishes training changes from inference use. Wrong answers clarify training is a weight-changing process, not ordinary response generation.
- Current recommendation status: keep. Add a stronger visual emphasis on loss/backprop/update as the missing step from inference.

## 4. Pretraining

- Card id: `pretraining`
- Title: Pretraining
- Subtitle: Broad learning before normal use
- Stage: Before Morning
- Path label: Essential
- Current review recommendation: defer
- One-sentence definition: Pretraining is the broad first training phase where a model learns general patterns by repeatedly predicting tokens across large datasets.
- Core explanation: Before a model can be useful in ordinary conversation, it is pretrained on large collections of text and other data. The model repeatedly predicts tokens, measures error, and updates weights. Over time it learns grammar, styles, facts, associations, reasoning patterns, and task shapes. This does not mean it stores every source as a perfect memory.
- Where it happens: Before deployment, during the broad foundation-building stage.
- Durable vs temporary note: Pretraining durably changes weights.
- Prompt vs response note: Pretraining creates the weights later used to process prompts and generate responses.
- Why it matters: Pretraining is why next-token prediction can become surprisingly capable. It installs broad pattern knowledge into weights.
- How it connects: Pretraining builds broad capability. Overfitting explains a failure mode: learning examples too narrowly instead of patterns that generalize.
- Metaphor: Billions of tiny raindrops carving paths through a landscape.
- Brain Bridge: Like broad education shaping later intuition.
- Where Brain Bridge breaks: Humans connect learning to lived experience. A model stores statistical structure in parameters.
- Misconception: Pretraining means the model can perfectly recall everything it saw.
- Glossary chips: `pretraining`, `training`, `training-data`, `weight`, `loss`, `next-token`, `inference`
- Visual aid id: `pretraining-rain`
- Tiny interaction: `training`, "Run the broad loop"
- Checkpoint question: During pretraining, what changes?
- Correct answer: Model weights
- Incorrect answers: Only the current chat; Only the user interface; Nothing changes
- Feedback: Correct says pretraining changes weights before normal use. Wrong answers explain pretraining is durable, not a temporary chat event.
- Current recommendation status: defer. The card belongs here, but needs more concrete distinction from Training and stronger protection against "perfect recall" myths.

## 5. Overfitting and Generalization

- Card id: `overfitting-generalization`
- Title: Overfitting and Generalization
- Subtitle: Memorizing examples versus learning patterns
- Stage: Before Morning
- Path label: Deep
- Current review recommendation: defer
- One-sentence definition: Overfitting happens when a model learns training examples too narrowly and performs poorly on new examples; generalization means learned patterns work beyond the examples seen during training.
- Core explanation: A model can fit old examples very well but still fail on new cases. That is overfitting. Good learning captures patterns that transfer. For LLMs, generalization is why a model can answer prompts it has never seen exactly before. Overfitting is why evaluation needs unseen examples, not just training performance.
- Where it happens: During training, evaluation, and model selection.
- Durable vs temporary note: Overfitting is about what gets installed into weights during training. It is not a temporary inference effect.
- Prompt vs response note: A model that generalizes well can handle new prompts. A model that overfits may repeat brittle patterns from training.
- Why it matters: Helps learners see why more memorization is not the same as better intelligence.
- How it connects: Pretraining should build broad patterns. Fine-tuning must adapt behavior without making the model too narrow.
- Metaphor: Studying only the answer key versus learning the subject.
- Brain Bridge: Like memorizing practice questions without understanding the principle.
- Where Brain Bridge breaks: The model is not consciously memorizing. Optimization can make it rely on brittle numerical patterns.
- Misconception: If a model performs well on training data, it has learned well.
- Glossary chips: `overfitting`, `generalization`, `validation-data`, `training-data`, `evaluation`, `training`
- Visual aid id: `overfitting-generalization`
- Tiny interaction: `training`, "Compare the curves"
- Checkpoint question: Which is a sign of overfitting?
- Correct answer: Great performance on training examples but poor performance on new examples
- Incorrect answers: A model using a context window; A model retrieving documents with RAG; A model generating one token at a time
- Feedback: Correct emphasizes generalization. Wrong answers distinguish overfitting from context, retrieval, and autoregression.
- Current recommendation status: defer. Strong conceptual value, but probably deep-path unless the core badge path needs an explicit "memorization is not learning" moment.

## 6. Fine-Tuning

- Card id: `fine-tuning`
- Title: Fine-Tuning
- Subtitle: Targeted shaping after pretraining
- Stage: Before Morning
- Path label: Essential
- Current review recommendation: keep
- One-sentence definition: Fine-tuning is additional training that adapts a pretrained model toward a task, domain, style, or preference.
- Core explanation: A pretrained model knows broad language patterns, but it may not behave the way users need. Fine-tuning adds targeted examples or preference data so future responses are more helpful, specialized, safer, or better aligned with a task. Fine-tuning can update model weights directly or add smaller adapter weights.
- Where it happens: After pretraining and before or between deployment cycles.
- Durable vs temporary note: Fine-tuning can durably change weights or add durable adapter behavior. It is different from a prompt, which usually only steers the current run.
- Prompt vs response note: Fine-tuning shapes future response patterns. It does not generate the current response token by token.
- Why it matters: Explains how one base model can become many differently behaving assistants.
- How it connects: Fine-tuning adapts a model; alignment is one major reason to fine-tune or otherwise shape behavior.
- Metaphor: Carving useful trails through an already huge terrain.
- Brain Bridge: Like coaching someone to follow a house style or professional norm.
- Where Brain Bridge breaks: The model is not choosing a new identity or values. Training changes output patterns.
- Misconception: Prompting once is the same as fine-tuning.
- Glossary chips: `fine-tuning`, `adapter`, `pretraining`, `training`, `prompt`, `response`, `alignment`
- Visual aid id: `fine-tune-path`
- Tiny interaction: `fine-tune`, "Nudge the trail"
- Checkpoint question: Which action is closest to fine-tuning?
- Correct answer: Additional training that shapes future responses
- Incorrect answers: Typing one better prompt; Retrieving one PDF into context; Sampling the next token
- Feedback: Correct says fine-tuning changes future behavior more durably than a single prompt. Wrong answers contrast prompting/RAG with training.
- Current recommendation status: keep. Needs a stronger tiny interaction contrasting fine-tuning with prompting and RAG.

## 7. Alignment

- Card id: `alignment`
- Title: Alignment
- Subtitle: Shaping behavior toward human goals
- Stage: Before Morning
- Path label: Essential
- Current review recommendation: keep
- One-sentence definition: Alignment is the effort to shape AI behavior toward human instructions, preferences, safety boundaries, and values.
- Core explanation: A model trained only to predict likely text may produce outputs that are fluent but unhelpful, unsafe, biased, or misleading. Alignment uses methods such as instruction tuning, human feedback, preference optimization, policies, filters, evaluations, and system design to shape model behavior. Alignment is not one switch. It is an ongoing effort to make model behavior more useful, reliable, and compatible with human goals.
- Where it happens: During fine-tuning, human feedback learning, system design, evaluation, deployment, and policy enforcement.
- Durable vs temporary note: Some alignment work durably changes weights or adapter weights. Some alignment happens through system prompts, filters, retrieval, tool rules, or runtime safeguards that steer behavior temporarily.
- Prompt vs response note: Alignment affects how the model responds to prompts, but it does not mean the model understands morality like a person.
- Why it matters: Explains why a model may refuse harmful requests, follow instructions, or prefer clearer helpful answers over merely likely text.
- How it connects: Fine-tuning can shape model behavior. Alignment asks toward what goals and constraints that behavior should be shaped.
- Metaphor: Guardrails, coaching, and a compass.
- Brain Bridge: Like learning social norms or professional expectations.
- Where Brain Bridge breaks: The model does not acquire human values, moral agency, conscience, or care. Its behavior is shaped by training and system constraints.
- Misconception: Aligned means morally good or fully trustworthy.
- Glossary chips: `alignment`, `instruction-tuning`, `human-feedback-learning`, `rlhf`, `preference-optimization`, `policy`, `guardrail`, `evaluation`, `fine-tuning`
- Visual aid id: `alignment`
- Tiny interaction: `fine-tune`, "Trace the guardrails"
- Checkpoint question: What does alignment try to do?
- Correct answer: Shape model behavior toward human goals, instructions, and safety boundaries
- Incorrect answers: Make the model conscious; Guarantee every answer is true; Permanently solve all AI risk
- Feedback: Correct says alignment shapes behavior, but is not magic morality. Wrong answers reject consciousness, truth guarantees, and permanent risk-solving.
- Current recommendation status: keep. Needs more nuance, but probably less text per screen through better visual grouping rather than longer prose.

