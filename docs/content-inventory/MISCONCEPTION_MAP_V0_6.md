# Misconception Map v0.6

Use this map while rewriting checkpoints, feedback, glossary entries, and Play exercises. Each misconception should point back to the mechanism that resolves it.

| Lesson | Stage | Misconception risk | Correct mental model | Practice or checkpoint hook |
|---|---|---|---|---|
| What Is an LLM? | architecture | Next-token prediction can sound trivial unless the role of learned weights and repeated inference is made concrete. | Add a concrete one-prompt trace that shows context, weights, logits, sampling, and append-repeat at a glance. | Which description is most accurate? Play: Pick the Next Token. |
| Two AI Traditions | architecture | Learners may read rules versus learned patterns as a total replacement story instead of two still-useful traditions. | Name one place rules still matter, such as policies, tool routing, or validation around learned models. | Which phrase best describes the LLM tradition? |
| Training | pretraining | Ordinary chat can be mistaken for training unless durable weight updates are foregrounded. | Show the loss signal and backprop update as the step that ordinary inference lacks. | What makes training different from inference? Play: Training Nudge. |
| Pretraining | pretraining | Broad exposure can be misread as verbatim memorization of every source document. | Clarify that broad datasets shape statistical patterns without guaranteeing source recall or truth. | During pretraining, do model weights change? |
| Fine-Tuning | fine-tuning | Fine-tuning may be confused with prompting, system messages, or one-off personalization. | Distinguish full fine-tuning, adapter-style updates, and instruction/policy tuning without adding too much detail. | During ordinary inference, do model weights durably update? |
| Inference | inference | Temporary hidden states may be mistaken for new memories or weight changes. | Make the forward pass tangible: fixed weights plus temporary activations produce one set of next-token scores. | What changes during ordinary inference? Play: Training Nudge. |
| Prompt vs Response | prompt processing | Learners may think the whole answer appears at once instead of being generated token by token. | Add the response-so-far as a visible part of the next input context. | What happens after one response token is generated? |
| Tokenization | prompt processing | Tokens may be mistaken for whole words or human concepts. | Show that token boundaries can be word pieces, punctuation, or spaces, not necessarily words. | What comes right after text is split into tokens? Play: Prompt or Response?. |
| Token IDs | prompt processing | The ID can be mistaken for meaning rather than a lookup key. | Make the tokenizer and embedding table two separate pieces in the diagram. | Why does the model need token IDs? Play: Prompt or Response?. |
| Embeddings | prompt processing | Embeddings can be confused with definitions, memories, or hidden states. | Contrast embedding as starting vector with hidden state as later context-shaped vector. | What is an embedding in this app? Play: Prompt or Response?. |
| Vectors | architecture | Feature dimensions may be treated as literal labeled meanings rather than learned numerical patterns. | Explain that dimensions are learned and distributed; one feature is rarely a neat English label. | Which statement is most accurate? |
| Tensors | architecture | Tensor language can become jargon unless shapes and positions are made tangible. | Show tensor axes: token position by feature, optionally across batches or heads only as a footnote. | Which is the better definition of tensor here? |
| Attention | architecture | The term attention invites human-focus and awareness metaphors. | Show attention weights as arrows between positions, not as a mind selecting ideas. | Which tokens can attention look across during inference? Play: Attention Is Relevance. |
| MLP | architecture | The MLP can blur into attention unless cross-position mixing and per-position reshaping are contrasted. | Put MLP beside attention in the same layer so their complementary roles are visible. | What does the MLP mainly do here? Play: MLP Feature Reshape. |
| Layers | architecture | Layer stacks can be mistaken for a human chain of thought. | Add residual paths and normalization as optional advanced labels or a split target lesson. | What do layers repeatedly refine? |
| Hidden States | inference | Hidden states can be mistaken for secret English text or permanent memory. | Show hidden state changing layer by layer for the same token in two contexts. | Why is it called hidden state? Play: MLP Feature Reshape. |
| Logits | response generation | Raw scores can be confused with probabilities or truth confidence. | Make vocabulary projection explicit: final hidden state to one score per candidate token. | Where do probabilities come from in this path? Play: Softmax Funnel. |
| Softmax | response generation | Probabilities can be mistaken for correctness or factual confidence. | Show that softmax normalizes scores into a distribution that sums to one. | What does softmax produce? Play: Softmax Funnel. |
| Sampling | response generation | Randomness can sound arbitrary unless tied to weighted probabilities. | Add temperature/top-p as knobs that shape selection without overexplaining math. | When the model chooses one token, what happens next? Play: Pick the Next Token. |
| Autoregression | response generation | Learners may still imagine the model drafting a full paragraph internally before showing it. | Use one short dog/cat sentence to show next token, append, repeat. | How does an LLM normally generate text? Play: Prompt or Response?. |
| Context Window | current context | Current context can be confused with saved memory or training data. | Show what falls out and that retrieval adds text to context rather than training weights. | What can happen when the context window is full? Play: Context Window: What Fell Out?. |
| RAG and Retrieval | current context | RAG can be mistaken for permanent learning, full file access, web search by itself, fine-tuning, or a guarantee that answers are true. | RAG gives the model better temporary context. It does not make the model omniscient, trained on the document, or automatically truthful. | What does RAG usually do? Play: Open Book or Learned?. |
| How AI Learns | risk/policy | Calling every behavior change learning can blur training, retrieval, and in-context steering. | Separate durable training, retrieval, temporary instructions, and deployed online learning in one table. | Which process normally changes only the current context, not weights? |
| Diffusion vs Autoregression | architecture | Learners may overgeneralize diffusion mechanics to text LLM generation. | Show a side-by-side: denoise image representation versus append text tokens. | What does a diffusion model usually start with? |
| Multimodal AI | architecture | Human sensory metaphors can make engineered media representations sound more human-like than they are. | Add an example of image input, text output, and the representation bridge between them. | What does multimodal mean? |
| Risk vs Myth | risk/policy | Fluent outputs can invite myths about consciousness, intent, or secret self-training. | Tie each risk to a mechanism: context exposure, tool access, hallucination, bias, or over-trust. | Which is a real institutional risk? Play: Open Book or Learned?. |

## RAG-Specific Misconceptions

- RAG means the model permanently learned the document.
- RAG means the model has access to all files.
- RAG means answers are automatically true.
- RAG is the same as fine-tuning.
- RAG eliminates hallucinations.
- RAG means the model searched the web by itself.

Better mental model: RAG gives the model better temporary context. It does not make the model omniscient.

