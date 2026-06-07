# The Day Repeats Card Inventory v0.22

Date: 2026-06-07

## Stage

- Stage number: 5
- Stage name: The Day Repeats
- Nav hint: Context grows and expires
- Summary: Response tokens accumulate; context expands and expires.
- Prompt moment: The selected token is appended, retrieved context may be visible, then the model runs again.
- Focus: How responses grow and context changes.
- Key distinction: Context is temporary, not permanent memory.

## Current Order

The current app order matches the intended Day Repeats set:

1. Autoregression
2. Context Window
3. RAG and Retrieval
4. Grounding
5. Hallucinations

The cards are numbered 23-27 in the full Journey.

## Card 23: Autoregression

- Card id: `autoregression`
- Title: Autoregression
- Subtitle: One token, append, repeat
- Section/stage name: The Day Repeats
- One-sentence definition: Autoregression means response generation by repeated next-token prediction: choose one token, append it, and run again.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include richer fields such as `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, or `misconception`.
- Where it happens: It is the loop that builds text during inference.
- Durable vs temporary note: Not explicit in current card data.
- Prompt vs response note: Not explicit as a dedicated field. The relationship explains that each generated response token becomes part of the input context for the next decoding step.
- Why it matters: Autoregression explains why earlier generated tokens become part of what the model can use next.
- How it connects: Each generated response token becomes part of the input context for the next decoding step.
- Metaphor: A train adding one car at a time.
- Brain Bridge: It resembles continuing a thought step by step.
- Where the Brain Bridge breaks: The model is not holding a plan in mind; it repeatedly predicts the next token from visible context.
- Misconception: Not explicit, but the card should target "the model writes the whole paragraph at once" and "generated tokens are durable learning."
- Glossary chips / key terms: `autoregression`, `completion`, `generated token`, `response tokens`, `sampling`, `inference`
- Visual aid id: `autoregression`
- Generated asset or coded visual type: coded SVG, current `LoopSvg`
- Tiny interaction id or description: `autoregressive`; title "Append the next token."
- Checkpoint question: How does an LLM normally generate text?
- Correct answer: One token at a time
- Incorrect answers: All words at once; By rewriting its weights
- Feedback: LLM generation is autoregressive: next token, append, repeat.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`, but audit recommends `revise`.

### Audit Notes

- Content clarity: Accurate and concise, but too thin for the stage's hinge concept.
- Conceptual sequence: Correct first card after Sampling. It should explicitly say Sampling chooses one token; Autoregression repeats the run.
- Mechanism clarity: Needs a visible loop with next token, appended response-so-far, model runs again, and context grows.
- Durable vs temporary clarity: Needs an explicit note that ordinary autoregressive inference does not update weights.
- Prompt vs response clarity: Should say the newly generated response token becomes visible input context on the next pass.
- Context clarity: Should preview that growing context can eventually push older context out.
- Metaphor quality: Train-car metaphor is useful, but the limitation should be visible.
- Visual quality: Readable at 320px, but generic. It shows `next`, `append`, and `run again`; it does not show response-so-far, context growth, or the boundary with Sampling.
- Tiny interaction quality: Needs more learner action. A stepper is acceptable, but the learner should tap through choose token -> append -> run again.
- Checkpoint quality: Clear and randomized. Feedback is short but accurate.
- UI polish: Key terms collapse works; no horizontal overflow was detected.

## Card 24: Context Window

- Card id: `context-window`
- Title: Context Window
- Subtitle: Temporary working context
- Section/stage name: The Day Repeats
- One-sentence definition: A context window is the limited amount of tokens or media the model can currently use.
- Core explanation: The current card uses the definition as the core explanation. It does not yet include richer fields such as `coreExplanation`, `stageType`, `durableVsTemporary`, `promptVsResponseNote`, or `misconception`.
- Where it happens: It surrounds the prompt, conversation history, retrieved material, and response-so-far that remain visible.
- Durable vs temporary note: Not explicit as a dedicated field. The checkpoint explains that context is temporary input, not durable training.
- Prompt vs response note: Not explicit as a dedicated field. The relationship says visible tokens can come from prompt, prior conversation, retrieved documents, or response-so-far.
- Why it matters: It explains why models can use current context but do not automatically form permanent memory from every chat.
- How it connects: The model can only use tokens currently inside the context window, whether they came from the prompt, prior conversation, retrieved documents, or the response-so-far.
- Metaphor: A moving spotlight over a growing train.
- Brain Bridge: It is loosely like working memory: what is currently available matters.
- Where the Brain Bridge breaks: It is not durable memory. What falls out cannot be directly attended to in the next pass.
- Misconception: Not explicit, but the card should target "context is permanent memory" and "anything ever typed stays available forever."
- Glossary chips / key terms: `context window`, `input context`, `prompt tokens`, `response tokens`, `rag`, `autoregression`, `inference`
- Visual aid id: `context-window`
- Generated asset or coded visual type: coded SVG, current `WindowSvg`
- Tiny interaction id or description: `context`; title "Slide the window."
- Checkpoint question: What can happen when the context window is full?
- Correct answer: Older tokens may be truncated
- Incorrect answers: The model permanently learns them; Softmax disappears
- Feedback: Context is temporary input, not durable training.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`, but audit recommends `revise`.

### Audit Notes

- Content clarity: Correct and useful, but it needs richer fields because this card carries the stage's temporary-vs-permanent distinction.
- Conceptual sequence: Correctly follows Autoregression and prepares for RAG.
- Mechanism clarity: Needs to show prompt, conversation, retrieved snippets, and response-so-far as different kinds of visible context.
- Durable vs temporary clarity: Strong in checkpoint, but should be explicit in core copy and a dedicated note.
- Prompt vs response clarity: Should make response-so-far visible as input on the next pass.
- RAG bridge: Should preview that retrieval works by adding outside text into this same temporary window.
- Metaphor quality: Moving spotlight is good. The train image overlaps with Autoregression and could become redundant unless the visuals separate their jobs.
- Visual quality: Readable at 320px, but too abstract. `old`, `prompt`, `example`, `tone`, and `next` are useful labels, yet the diagram does not show a card falling out or the retrieved/context distinction.
- Tiny interaction quality: The slider demonstrates capacity, but a push-card interaction would better align with the existing Context Stack game.
- Checkpoint quality: Strong misconception target and randomized.
- UI polish: Key terms collapse works; no horizontal overflow was detected.

## Card 25: RAG and Retrieval

- Card id: `rag-retrieval`
- Title: RAG and Retrieval
- Subtitle / friendly title: Open-book AI
- Section/stage name: The Day Repeats
- One-sentence definition: Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model's current context before the model generates a response.
- Core explanation: A plain model answers from learned weights and the current context. A RAG system adds a retrieval step. It searches documents, passages, or records, then inserts relevant snippets into the current context. The model then generates a response using its learned weights plus the retrieved context.
- Where it happens: During inference, before or during response generation.
- Durable vs temporary note: RAG usually does not change model weights. Retrieved information is temporary context unless a separate training or storage process occurs.
- Prompt vs response note: Retrieved material becomes prompt/context tokens. The answer is still generated as response tokens one at a time.
- Why it matters: RAG explains many "chat with your documents" systems. The model is not magically knowing private files; the system is retrieving relevant material and showing it to the model.
- How it connects: RAG depends on the context window. Retrieved notes enter context; attention, hidden states, logits, softmax, and sampling still produce the response.
- Metaphor: Open-book exam.
- Brain Bridge: Like checking notes before answering.
- Where the Brain Bridge breaks: A human can evaluate sources, remember what was read, and reason about trust. The model uses retrieved text as context but does not become aware of it.
- Misconception: RAG is training, permanent memory, guaranteed truth, or consciousness.
- Glossary chips / key terms: `rag`, `retrieval`, `grounding`, `context window`, `input context`, `prompt tokens`, `response tokens`, `inference`, `fine-tuning`, `training`, `hallucination`
- Visual aid id: `rag-retrieval`
- Generated asset or coded visual type: coded SVG/HTML, current `RagSvg`
- Tiny interaction id or description: `context`; title "Place the notes in context."
- Checkpoint question: What does RAG usually do?
- Correct answer: Retrieves outside information and places it into the current context
- Incorrect answers: Permanently updates model weights; Guarantees every answer is true; Makes the model aware of documents
- Feedback: RAG is retrieval plus context. It is not training, permanent memory, consciousness, or a truth guarantee.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Strong. It clearly separates retrieval, context, inference, and weight updates.
- Conceptual sequence: Correctly follows Context Window and precedes Grounding.
- Mechanism clarity: Good enough for MVP. It names retrieval, context insertion, fixed weights, and token generation.
- Durable vs temporary clarity: Strong.
- Prompt vs response clarity: Strong.
- Grounding bridge: Good, but the implementation pass should show that retrieved text can improve grounding without guaranteeing truth.
- Metaphor quality: Open-book exam is excellent for this audience.
- Visual quality: Strongest current Day Repeats visual. It remains readable at 320px/390px with short labels and numbered callouts.
- Tiny interaction quality: Too generic. It reuses the Context Window animation instead of letting the learner tap through Prompt -> Retriever -> Notes -> Context -> Response.
- Checkpoint quality: Strong misconception coverage and randomized.
- UI polish: Many key terms collapse correctly; no horizontal overflow was detected.

## Card 26: Grounding

- Card id: `grounding`
- Title: Grounding
- Subtitle: Tying answers to evidence
- Section/stage name: The Day Repeats
- One-sentence definition: Grounding means connecting a model's response to available evidence, such as retrieved documents, citations, data, or tool results.
- Core explanation: An LLM can generate fluent text without knowing whether it is supported by evidence. Grounding gives the model or system evidence to work from, often through RAG, tools, citations, structured data, or verification steps. Grounding can reduce unsupported answers, but it is not a guarantee.
- Where it happens: During inference and response generation, usually through retrieved context, tools, data, or system design.
- Durable vs temporary note: Grounding usually supplies temporary evidence in the current context. It does not normally change model weights.
- Prompt vs response note: Evidence becomes prompt/context material. The answer is still generated as response tokens.
- Why it matters: Grounding helps learners ask whether a fluent answer is tied to evidence rather than merely sounding right.
- How it connects: RAG can place evidence into context; grounding asks whether the generated answer actually stays connected to that evidence.
- Metaphor: Tying a balloon to the ground.
- Brain Bridge: Like checking notes before answering.
- Where the Brain Bridge breaks: The model is not consciously verifying truth unless the system is designed to check evidence.
- Misconception: A citation-looking answer is automatically grounded.
- Glossary chips / key terms: `grounding`, `rag`, `retrieval`, `context window`, `input context`, `citation`, `hallucination`, `inference`
- Visual aid id: `grounding-evidence`
- Generated asset or coded visual type: coded SVG/HTML, current `GroundingEvidenceSvg`
- Tiny interaction id or description: `context`; title "Anchor the answer."
- Checkpoint question: What does grounding try to do?
- Correct answer: Connect an answer to available evidence
- Incorrect answers: Make every answer true; Permanently train the model; Make the model conscious
- Feedback: Grounding ties answers to evidence, but still needs review.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Strong. It directly counters "citation equals truth."
- Conceptual sequence: Correctly follows RAG and prepares for Hallucinations.
- Mechanism clarity: Good, but could better separate evidence being available from claims actually being supported by that evidence.
- Durable vs temporary clarity: Strong.
- Prompt vs response clarity: Strong.
- Trust clarity: Excellent. It avoids hype and does not promise automatic truth.
- Metaphor quality: The balloon anchor metaphor is simple and memorable.
- Visual quality: Readable at 320px/390px. The evidence cards, context tray, answer, and limit callout work well.
- Tiny interaction quality: Too generic. A claim-to-evidence matching interaction would teach grounding more directly.
- Checkpoint quality: Strong misconception target and randomized.
- UI polish: No horizontal overflow was detected.

## Card 27: Hallucinations

- Card id: `hallucinations`
- Title: Hallucinations
- Subtitle: Fluent does not always mean grounded
- Section/stage name: The Day Repeats
- One-sentence definition: A hallucination is a fluent model output that is unsupported, false, fabricated, or not grounded in the available evidence.
- Core explanation: LLMs generate likely tokens from context and learned weights. That can produce useful answers, but it can also produce confident-sounding claims that are not true or not supported. Hallucinations are not usually lies in the human sense. They are failures of grounding, retrieval, uncertainty handling, or verification.
- Where it happens: During response generation.
- Durable vs temporary note: A hallucination is an output event during inference. It does not necessarily mean the model's weights changed.
- Prompt vs response note: The hallucination appears in generated response tokens.
- Why it matters: Hallucinations are one of the most practical reasons model literacy matters: fluency is not the same as truth.
- How it connects: Grounding tries to reduce unsupported answers. Hallucinations show what can happen when the output outruns evidence.
- Metaphor: A beautiful bridge with no supports underneath.
- Brain Bridge: Like a person confabulating a plausible memory or answer.
- Where the Brain Bridge breaks: A human may intend, deceive, or misremember. The model is generating probable text without human memory or intention.
- Misconception: A hallucination means the model is lying or malicious.
- Glossary chips / key terms: `hallucination`, `grounding`, `rag`, `logits`, `softmax`, `sampling`, `inference`, `uncertainty`
- Visual aid id: `hallucination-bridge`
- Generated asset or coded visual type: coded SVG/HTML, current `HallucinationBridgeSvg`
- Tiny interaction id or description: `risk`; title "Look for missing supports."
- Checkpoint question: Why can hallucinations happen?
- Correct answer: The model can generate plausible text without enough grounding
- Incorrect answers: The model is always trying to deceive; Softmax guarantees truth; RAG permanently teaches the model
- Feedback: Hallucinations usually come from generation without enough evidence, not malice, truth-guaranteed softmax, or permanent RAG training.
- Current recommendation status if review metadata exists: `keep` by current `getReviewAction`.

### Audit Notes

- Content clarity: Strong and psychologically careful. It reduces fear without minimizing risk.
- Conceptual sequence: Correctly closes the stage and prepares the later risk literacy material.
- Mechanism clarity: Good. It should keep tying hallucinations to generation, weak retrieval, poor grounding, and uncertainty handling.
- Durable vs temporary clarity: Strong.
- Prompt vs response clarity: Strong.
- Risk clarity: Strong. It avoids "lying" as the learner's main model.
- Metaphor quality: Beautiful unsupported bridge is effective.
- Visual quality: Readable at 320px/390px. Labels are short and callouts explain the limits in HTML.
- Tiny interaction quality: Too generic. It reuses risk sorting rather than asking the learner to inspect supports under claims.
- Checkpoint quality: Strong misconception coverage and randomized.
- UI polish: No horizontal overflow was detected.
