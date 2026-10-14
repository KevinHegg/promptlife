# Prompt Life Story Bible

Phase 0 of the rebuild; companion to `STORYBOARDS.md`. The approved plan (v2, October 13, 2026) fixes the structure. This fixes the voice, look, metaphors, words and rules. Main-line codes run P01 Send to P08 Reply.

## 1. Premise and promise

Prompt Life is a subway map of what happens after you hit Send. You ride one real question through a real model, a stop at a time, and you can open a window under any stop to see the numbers. By the last stop you can explain why chatbots get things wrong, why they don't learn from you, and what each answer costs.

The hero question never changes: "Using my syllabus, what do I need on the final to get an A-?" Students bring their own text to the playgrounds (the live tokenizer, Beat the Model), never to the hero run, so every number on the main line can be real.

## 2. Audience and what they already believe

First- and second-year college students in any major. They use chatbots weekly, often for coursework, mostly on phones, and have heard both "it's magic" and "it's just autocomplete."

| They often believe | The ride shows instead | Where |
|---|---|---|
| It looks things up in its memory | The app fetches passages and pastes them in | P01, L |
| It writes the whole answer at once | One token per trip around the loop | P01, P07 |
| It reads letters and words like I do | It sees token IDs | P02 |
| Chatting trains it; it remembers me | Weights stay fixed; "memory" features paste notes back into the context | P08, A |
| If it sounds sure, it's right | Odds describe the next token, not the truth | P06, L |
| Attention means it understands | Attention is weighted mixing of numbers | P04 |
| It does math like a calculator | It writes likely digits; a calculator does the math | W, P08 |
| Its instructions are locked rules | Instructions and data share one stream of tokens | G |
| Hallucination means lying | No intent; fluent output that nothing supports | P08, L |
| AI is weightless | Every trip is electricity on hardware people built | Receipts, R1 |
| It's just autocomplete, so it's useless | The mechanism is next-token prediction; the capability comes from scale and training | P05, A |

## 3. Voice and tone

Second person, present tense, plain words, numerals. Curious, as if we're both a little surprised this works. Funny about situations, never about the student, never by giving the machine feelings.

- Arrive captions ≤ 25 words. Every on-screen block ≤ 80 words. Average sentence ≤ 18 words.
- No exclamation points. No "simply," "just," "obviously," "magic."
- The model is "it." It scores, computes, writes, predicts, picks (when sampling), copies and looks back. It never thinks, knows, wants, understands, decides, remembers or feels.
- State uncertainty once, precisely: "Researchers can't fully explain this head. Here's what we can measure."

| Do | Don't |
|---|---|
| "Your question is 17 tokens. The model never sees the letters." | "Our tokenization engine leverages byte-pair encoding to efficiently process input." |
| "The model scored ' 93' highest." | "The model thinks the answer is 93." |
| "Floor 3 guesses ' the'. Statistically defensible. Not helpful." | "Uh oh, the AI got confused!" |
| "Usefully wrong. Most people bet the same way." | "Incorrect. Try again." |

## 4. Feng shui principles

The owner's brief: this is somewhere people will want to be. Each rule has a test.

1. **One focal point.** One thing per screen at full contrast; the rest recedes. *Test:* blur a screenshot; one shape still stands out.
2. **Direction of travel is always clear.** Forward is rightward on the map and the strip. Next never moves (bottom right on laptop, thumb zone on phone). *Test:* a new user finds Next within 2 seconds.
3. **The same arrival every time.** Strip slides, roundel appears, doors open, Arrive panel. *Test:* all eight stations share one Arrive structure.
4. **Rest stops.** Every dense moment (Poke, Break it, Level 3) is followed by a quiet one (Name it, Stamp, the ride). Every two stations the map offers a bench: "Good place to stop. The train will wait." *Test:* no two interactive steps back to back.
5. **Light means used.** Lamps and lines light only when this run passed through; the Academy is dark during every answer. No decorative glow. *Test:* every lit element maps to an event in the run file.
6. **Motion only when a number changes.** The train moves because a trip happened; a bar grows because a probability changed. No idle loops, parallax or particles. *Test:* leave a screen alone 10 seconds; nothing moves unless the student started a run.
7. **Red means sabotage.** Only Break it levers and R2's failed lamps are red.
8. **Color never works alone.** *Test:* every screen works in grayscale.
9. **Generous space.** Gutters ≥ 16 px on phones, ≥ 32 px on laptops; lines of 45 to 70 characters; Arrive and Name it fit one phone screen. *Test:* screenshot at 375 px wide.
10. **Day and night.** Day is a printed pocket map: warm paper, ink lines, matte. Night is the backlit map board in a quiet station after the last train: deep blue-black, never pure black, where only lamps and the focal element glow. *Test:* at night the brightest thing on screen is never chrome.
11. **Sound follows a tap.** Silent until turned on; then a short original chime per station, in the spirit of Tokyo's platform melodies, and a soft stamp thunk. No loops; every sound has a visual twin.
12. **The student holds the clock.** No timers, countdowns or streaks. The five-minute loop is our budget, not theirs.
13. **Easy to leave and return.** The map is one tap away; the train parks where you left it; lit lamps stay lit.
14. **Quiet rewards.** No confetti. The stamp landing is the celebration.

## 5. The metaphor system

The subway carries flow and wayfinding. Each limit appears as one line where it matters, never in a caveat panel.

| On the map | In the model | Where it breaks |
|---|---|---|
| The Prompt line | The steps of one model run, in order | Nothing travels. On the first trip every token goes through each step together. |
| The train | The whole context: system prompt, passages, question, reply so far | No vehicle, no driver. Riding is shorthand for numbers being transformed. |
| One trip per new token | Autoregression | Saved work (the KV cache) makes later trips far cheaper than the first. |
| Inner loop skips the Tokenizer; outer loops don't | New tokens are already IDs; passages and tool results arrive as text | Literal, except that the app, not the model, fetches and runs tools. |
| Transfers to branch lines | Work the app does | The model isn't waiting; it isn't running until the app restarts the loop. |
| The platform | The context window | Frontier windows hold 100,000 tokens or more. When one fills, the app decides what to cut. |
| Lit and dark lines | What this answer used | Lit means the calculation passed through, not that anything was noticed. |
| The dark Academy | Answering doesn't change weights | Some products save chats to train future models, separately and later. |
| Levels: Map, Cutaway, Bedrock | Depths of explanation | Not the model's layers. Always "level." |

**At most one concept metaphor per station**, and some need none:

| Station | Metaphor | Where it breaks |
|---|---|---|
| P01 Send | The subway itself | See above |
| P02 Tokenizer | A coat check: hand over text, get a numbered ticket | What the ticket fetches was set in training, not brought by you |
| P03 Embedding | A city where tokens used alike share a block | 896 directions, none with a nameable meaning |
| P04 Attention | A highlighter over earlier text | Nobody is reading |
| P05 The Stack | One draft passed up a building, each floor adding tracked changes | The draft is numbers, not words |
| P06 The Vote | An election among tokens | No voters; the winner is drawn by chance |
| P07 The Loop | Rereading everything before each word | Saved work means no rereading |
| P08 Reply | None; the receipt is literal | |
| L | An open-book exam | The model can't tell which book is right |
| W | Passing a note to someone with a calculator | The model doesn't wait; the app restarts it |
| G | Stage directions in the same font as the dialogue | Special tokens mark roles; only training makes the model respect them |
| A | Millions of fill-in-the-blank quizzes | Nobody studies; an optimizer nudges numbers |
| S | Scratch paper | It may not show how the answer was computed |
| D | A print developing in a tray | Nothing was photographed |

**Don't use the subway** inside a station (attention isn't passengers chatting), at Level 3, for intent (no driver or conductor; nothing steers), for ethics (receipts aren't fares), or in Stamp questions beyond station codes. If a sentence needs "like a train" to make sense, rewrite it.

## 6. The cast

- **You.** The rider. The question is yours, and so is the pace.
- **The train.** Your question, then the whole context. An object: no eyes, no name. Its side shows a token count.
- **The guide.** A human voice in the captions, seen only as a white-gloved hand. It borrows Japanese rail staff's pointing-and-calling, where a worker points at a signal and names it aloud. The hand points at the one focal thing on a screen and names it. Dry, warm, never sarcastic, and it never speaks for the model.
- **The app.** Everything around the model: chat window, search (L), tool runner (W), system prompt and template (G), and decisions to trim or stop. Drawn as the station building and signage, gray with dashed outlines.
- **The model.** The Prompt line's track and machinery. Never a face, eyes, robot body, brain or glowing head.
- **People behind the run.** Writers whose text trained it, raters, engineers, data-center workers. Drawn plainly as people at work in the Academy and the Ledger, never as icons on a cost chart.
- **Locker Bot** (G2). A toy chatbot: a chat box with a label.

Machines never get faces, Locker Bot included.

## 7. The visual alphabet

Token sources have fixed fills app-wide, each with a text label: system, passages, your question, tool call, tool result, reply. The app's wrapper tokens (chat template, tool description) are gray.

| Element | Looks like | Means | Never for |
|---|---|---|---|
| Token chip | Rounded rectangle, monospace; a leading space shows as a middle dot (·syllabus) | One token | Words or ideas in general |
| ID tag | Ticket stub under the chip, tabular numerals | That token's ID | Any other number |
| Vector strip | Thin cells on a two-color diverging scale, first 32 shown, then "… 896" | One token's numbers at one point | Texture |
| Attention arc | Curve from a chip back to an earlier chip, width by weight | How much one token borrows | Anything pointing forward |
| Probability bar | Chip, bar, percent; drawn token solid, others outlined, plus "everything else" so the total is 100% | Odds for the next token | Truth or confidence |
| Platform | Strip of chips grouped by source, with a length gauge and a yellow platform-edge line at the window limit | The context window | "Memory" |
| Lamp | Hollow ring (off), soft-glow fill (on), fill plus ring (train here), red with × (failed, R2 only) | Whether this run passed through | Decoration |
| Roundel | Ring in the line color, letter over number (P / 04), always beside the name | A station | |
| Departure board | Dot-matrix board | Station, trip counter, one-line caption; candidates at The Vote | Paragraphs |
| Die-cut window | Rounded hole that opens onto the level below | One level deeper | Moving between stations |
| Sabotage lever | Red-handled switch | Break it | Normal controls |
| Receipt and stamp | Thermal-paper strip; single-ink circle in the line color | Ledger lines; a finished station | |

## 8. Vocabulary budget

At most three new terms per station. A term is introduced when Name it defines it, and Stamps test only introduced terms.

| Station | Terms |
|---|---|
| P01 Send | large language model (LLM), prompt, context |
| P02 Tokenizer | token, token ID, vocabulary |
| P03 Embedding | embedding, vector, weights |
| P04 Attention | attention, attention head |
| P05 The Stack | layer, transformer, hidden state |
| P06 The Vote | probability, temperature, sampling |
| P07 The Loop | autoregressive, context window |
| P08 Reply | inference, stop token, hallucination |

**Branch lines:** L: RAG, semantic search, grounding. W: tool call, agent, permission. G: system prompt, chat template, special token (G1); prompt injection (G2). A: pretraining, loss (A1); base model, fine-tuning (A2); human feedback, RLHF (A3). S: reasoning model, thinking tokens. D: multimodal, image patch (D1); diffusion (D2).

**Level 3 only** (named, never tested): byte-pair encoding, cosine similarity, query/key/value, causal mask, residual stream, MLP, logit lens, logits, softmax, top-p, KV cache, prefill and decode.

**Avoided** (say instead): "layer" for levels (level); neuron, brain, neural (weights, numbers); thinks, knows, understands, decides (scores, writes, picks); "memory" for context (context, platform); "learns" during an answer (uses what's in the context); tensor (table, list of numbers); parameters (weights; glossary notes the synonym); "the AI" as an actor (the model or the app, whichever did it); prompt engineering (writing context); black box, magic, emergent, AGI, sentient (what we can measure); self-attention (attention).

## 9. Ethics as receipt lines

Each station adds one line to a receipt printed after its Stamp; R1 The Ledger totals them in five columns: compute, energy, data, labor, accountability. Each line is ≤ 30 words, factual, without alarm or blame. Figures need a citation; otherwise use a range marked [cite]. The first line is what you got: "1 reply, correct, 37 trips."

| Station | Receipt line | Column |
|---|---|---|
| P01 | Your question, syllabus and gradebook left your device. The provider's policy decides who keeps them, and for how long. | data |
| P02 | You pay in tokens, and windows are measured in them. Many languages need more tokens than English for the same meaning. [cite] | compute |
| P03 | These numbers were learned from human writing and carry its patterns, stereotypes included. Consent and credit for that writing are disputed. [cite] | data |
| P04 | Every token looks back at every earlier one, so long contexts cost more per reply. | compute |
| P05 | Every trip runs every floor: about a billion arithmetic operations per token here, far more in frontier models. [cite] | energy |
| P06 | The provider sets the temperature. Different answers to the same question are a design choice. | accountability |
| P07 | 37 trips. Long replies, thinking tokens and tool loops multiply trips, and each draws electricity. Per-answer estimates vary widely. [cite: range] | energy |
| P08 | The reply has no author in the usual sense. Responsibility for errors rests with the people who build, deploy and rely on it. | accountability |
| L | Retrieval decides what the model sees; access rules decide what retrieval can reach, including your grades. | data |
| W | The calculator ran with the app's permissions. Agents can do whatever their permissions allow. | accountability |
| G | The provider writes the system prompt, and it's usually hidden from you. | accountability |
| A | Training took large amounts of electricity and the work of people who wrote, labeled and rated text, often for low pay. [cite] | labor |
| S | Thinking tokens are computed, and often billed, like any others, and can far outnumber the visible answer. | energy |
| D | Image models learned from images collected at scale; consent and credit are contested. [cite] | data |

## 10. Accuracy rules

Never imply, at any level:

1. **That weights change during an answer.** Saving chats for future training is separate and later.
2. **That attention is awareness or understanding.** It's weighted mixing.
3. **That probabilities measure truth.** A wrong answer can be the favorite.
4. **That context is memory.** "Memory" features are the app pasting saved notes back into the context.
5. **That the model searches, browses or runs tools.** It writes text. The app (the harness) parses tool calls, runs tools and pastes results back. An agent is that loop, repeated.
6. **That the reply is written at once, or that there's no lookahead at all.** Tokens come out one per trip, but hidden states can carry information about later words.
7. **That a mid-stack guess is a thought.** Reading a floor is a measurement trick.
8. **That fluent, confident or cited means correct.**
9. **That thinking tokens faithfully show** how the answer was computed.
10. **That a system prompt is enforced** by anything but the model's training, unless the app adds checks.
11. **That small-model numbers describe frontier models.** Trace numbers carry a note naming the model.
12. **That a number is real when it isn't.** Numbers come from the trace, the live tokenizer or live math, or are labeled illustrative. A teacher-forced trace says so.
13. **That "next-token prediction" means trivial.** The mechanism is simple to state; what training packed into the weights is not.
