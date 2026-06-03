# New Lesson Drafts v0.7

These drafts are complete cards for concepts requested in the v0.7 curriculum pass. They are not yet implemented in app data.

## Overfitting and Generalization

- Lesson id: overfitting-generalization
- Learner-facing subtitle: Learning patterns that travel
- One-sentence definition: Generalization means learned patterns work on new examples; overfitting means the model clings too closely to training examples or brittle patterns.
- Where it happens: pretraining
- Core idea: A model can learn patterns that help on new examples, or it can overfit too closely to seen examples and fail on nearby unseen cases.
- Why it matters: This explains why more data and bigger models are not automatically the same as understanding.
- Durable vs temporary: Both are outcomes of training dynamics and affect future behavior.
- Prompt vs response: They shape what the model can do before any particular inference prompt arrives.
- How it connects: Previous: Adds nuance to pretraining. Next: Fine-tuning must adapt the model without making it too narrow or brittle.
- Metaphor: Studying only the answer key versus understanding the subject.
- Brain metaphor: Like memorizing practice questions instead of learning the principle.
- Where it breaks: The model is not consciously memorizing; optimization can make it rely on brittle patterns.
- Visual: A path that perfectly traces old dots but misses new dots.
- Misconception: Bigger training always means better understanding.
- Exercise/checkpoint: Checkpoint: pick which curve generalizes to new dots.
- Glossary terms: training, generalization, overfitting, evaluation
- Source-grounded review: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## Alignment

- Lesson id: alignment
- Learner-facing subtitle: Shaping behavior toward human intent
- One-sentence definition: Alignment is the effort to shape model behavior toward human goals, instructions, safety boundaries, and preferences.
- Where it happens: fine-tuning
- Core idea: Alignment combines training signals, system design, policy layers, evaluation, and human feedback to make model behavior more helpful and less harmful.
- Why it matters: It gives learners a mechanism-based way to discuss safety without implying the model has morals.
- Durable vs temporary: Some alignment work changes weights through fine-tuning or preference optimization; some uses policies, system prompts, evaluation, or product design.
- Prompt vs response: Alignment affects how future responses behave but does not mean one prompt permanently teaches the model.
- How it connects: Previous: A targeted use of fine-tuning and system design. Next: Inference shows how the aligned model is used during ordinary prompting.
- Metaphor: Guardrails and coaching.
- Brain metaphor: Like learning social norms or professional expectations.
- Where it breaks: The model does not acquire human values or moral agency.
- Visual: Response landscape with preferred paths, warning zones, and policy rails.
- Misconception: Alignment means the model is morally good or understands ethics.
- Exercise/checkpoint: Checkpoint: distinguish behavioral shaping from moral understanding.
- Glossary terms: alignment, fine-tuning, human feedback, policy
- Source-grounded review: SOURCE NEEDED: pretraining, next-token prediction, generalization, instruction tuning, and fine-tuning references.

## Hallucinations

- Lesson id: hallucinations
- Learner-facing subtitle: Fluent does not mean grounded
- One-sentence definition: A hallucination is a fluent model output that is unsupported, false, or fabricated.
- Where it happens: risk/ethics
- Core idea: LLMs optimize likely text patterns, not guaranteed truth, so they can produce polished answers without evidence anchors.
- Why it matters: This is one of the most practical model-literacy distinctions for schools and institutions.
- Durable vs temporary: Hallucinations are output behavior during inference; reducing them may involve retrieval, tools, evaluation, prompting, fine-tuning, or product design.
- Prompt vs response: The hallucinated claim appears in generated response tokens.
- How it connects: Previous: Grounding shows how evidence can help. Next: Prompt injection and tool risk show how context and integrations can be attacked.
- Metaphor: A confident bridge built from patterns without evidence underneath.
- Brain metaphor: Like a person confabulating a plausible memory.
- Where it breaks: The model is not lying or remembering; it generates likely tokens without reliable grounding.
- Visual: Polished answer from vocabulary cloud with missing evidence anchors.
- Misconception: Hallucination means lying or simple brokenness.
- Exercise/checkpoint: Sort supported, unsupported, and needs-check claims.
- Glossary terms: hallucination, grounding, evidence, inference
- Source-grounded review: SOURCE NEEDED: hallucination, prompt injection, privacy/data governance, tool risk, and institutional AI risk references.

## Grounding

- Lesson id: grounding
- Learner-facing subtitle: Connecting answers to evidence
- One-sentence definition: Grounding connects a model response to available evidence, such as retrieved documents, tool results, data, or citations.
- Where it happens: retrieval
- Core idea: Grounding can improve reliability when retrieval, citation, tool calls, and verification are designed well, but it can fail if sources are poor or misused.
- Why it matters: It separates evidence-backed responses from citation-shaped fluency.
- Durable vs temporary: Grounding usually constrains or enriches current context and output; it does not by itself update weights.
- Prompt vs response: Evidence enters as context or tool result; the grounded answer is still generated as response tokens.
- How it connects: Previous: RAG supplies retrieved context. Next: Hallucinations show what can happen when fluency outruns evidence.
- Metaphor: Tying the balloon to the ground.
- Brain metaphor: Checking notes before answering.
- Where it breaks: The model is not automatically verifying truth unless the system is designed to check evidence.
- Visual: Answer balloon tethered to evidence cards.
- Misconception: A citation-looking answer is automatically grounded.
- Exercise/checkpoint: Sort grounded, ungrounded, and citation-looking examples.
- Glossary terms: grounding, RAG, retrieval, citation, hallucination
- Source-grounded review: SOURCE NEEDED: retrieval-augmented generation, retrieval quality, grounding, citations, and hallucination mitigation references.

## Effective Prompting From Model Literacy

- Lesson id: effective-prompting
- Learner-facing subtitle: Shaping the current context
- One-sentence definition: Better prompts work because they shape the current context: task, constraints, examples, data, and output format.
- Where it happens: prompt processing
- Core idea: Effective prompting is not magic wording. It works by giving the model clearer context and constraints for the current run.
- Why it matters: This keeps practical prompting inside model literacy rather than prompt-engineering folklore.
- Durable vs temporary: Prompting usually changes only temporary context, not model weights.
- Prompt vs response: The prompt sets up context; the response is still generated token by token.
- How it connects: Previous: Multimodal systems still depend on context and representation. Next: Energy, Water, and Compute reminds learners that inference has physical infrastructure.
- Metaphor: Setting the stage before the performance.
- Brain metaphor: Giving a person clear instructions, examples, and constraints before asking for work.
- Where it breaks: Prompting normally does not train the model or permanently teach it.
- Visual: Prompt components entering a context tray: task, role, constraints, examples, data, output format.
- Misconception: Prompting is magic wording or permanent teaching.
- Exercise/checkpoint: Sort prompt components by what they change.
- Glossary terms: prompt, context window, in-context learning, response
- Source-grounded review: SOURCE NEEDED: source final prompting guidance to reputable model/provider documentation and education practice if published.

## Energy, Water, and Compute

- Lesson id: energy-water-compute
- Learner-facing subtitle: The physical infrastructure behind AI
- One-sentence definition: AI responses depend on physical infrastructure: chips, data centers, electricity, cooling, networks, and sometimes water in cooling systems.
- Where it happens: risk/ethics
- Core idea: Digital outputs feel weightless, but training and inference run on industrial systems with material costs.
- Why it matters: Model literacy includes stewardship, procurement, and sustainability questions.
- Durable vs temporary: Training and inference both consume compute; exact costs depend on model, hardware, data center, and workload.
- Prompt vs response: Even a short prompt/response may use remote infrastructure.
- How it connects: Previous: Effective prompting focuses on current use; this lesson widens to infrastructure cost. Next: Human-centered ethics asks what these systems should serve.
- Metaphor: The invisible factory behind the instant answer.
- Brain metaphor: Human thinking also has bodily energy costs.
- Where it breaks: Machine compute infrastructure is industrial and measurable in a different way.
- Visual: Prompt on phone connected to data center, power grid, cooling loop, and network.
- Misconception: Digital AI is cost-free.
- Exercise/checkpoint: Evidence/causality diagram: match AI use to infrastructure components.
- Glossary terms: compute, inference, training, data center
- Source-grounded review: SOURCE NEEDED: current estimates vary by model, hardware, data center, and measurement method. Do not publish precise energy or water numbers without source-grounded review.

## Human-Centered AI Ethics

- Lesson id: human-centered-ai-ethics
- Learner-facing subtitle: Tools should serve human dignity
- One-sentence definition: Human-centered AI ethics asks whether AI systems serve human dignity, learning, responsibility, community, and the common good.
- Where it happens: risk/ethics
- Core idea: AI should be treated as a tool within human purposes, not as an authority that replaces judgment.
- Why it matters: Academic audiences need a vocabulary for responsibility that is neither hype nor fear.
- Durable vs temporary: Ethical governance shapes design, deployment, policies, evaluation, and institutional choices rather than one temporary prompt.
- Prompt vs response: Ethical questions concern how prompts, outputs, data, tools, and decisions affect people.
- How it connects: Previous: Infrastructure costs raise stewardship questions. Next: Risk vs Myth pulls mechanism and ethics into practical literacy.
- Metaphor: Tools should fit human hands, not replace human purpose.
- Brain metaphor: Wisdom is more than fluency.
- Where it breaks: Models can simulate moral language without moral understanding or agency.
- Visual: Human at center, AI tools orbiting as instruments, not masters.
- Misconception: If AI is powerful, it should decide.
- Exercise/checkpoint: Reflection: identify human decision points in an AI workflow.
- Glossary terms: ethics, alignment, risk, responsibility
- Source-grounded review: SOURCE NEEDED: human-centered AI ethics sources, papal/Vatican AI ethics references, and broader education/human dignity frameworks.
