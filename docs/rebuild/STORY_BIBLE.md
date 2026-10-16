# Prompt Life Story Bible

Phase 0 of the rebuild; companion to `STORYBOARDS.md`. The approved plan (v2, October 13, 2026) sets the structure; this sets the voice, look, metaphors, words and rules. Main-line stations run P01 Send to P08 Reply. Revised October 14 after the owner's phone test: new hero question, plainer copy, a designed first minute.

## 1. Premise and promise

Prompt Life is a subway map of what happens inside a chatbot after you hit Send. You follow one real question through a real model, one stop at a time. At any stop you can open a window and see the actual numbers. By the end you can explain why chatbots get things wrong, why they don't learn from you, and what each answer costs.

The hero question never changes:

> "Using my grandmother's recipe card, how much flour do I need to feed 30 people?"

Earlier, the student uploaded a copy of the recipe card to the chatbot. When they ask, the app searches their uploads and pastes the matching parts in, the card (serves 8, 2 1/4 cups flour) and its back, under the heading "Your files:". The model never opens a file. Say "the card you uploaded," never "your files" or anything that suggests an agent searching a computer: agents come late in the course, if at all. Then the model asks a calculator for 2.25 × 30 / 8, the calculator returns 8.4375, and the reply says about 8.4 cups† († = wording or count from the recorded run). It's everyday on purpose: no coursework, nothing anyone could hand in, yet every step is a real chatbot job. Visitors bring their own text to the playgrounds, never to the hero run, so every number on the main line can be real.

## 2. Audience and what they already believe

First- and second-year college students in any major, and the faculty who teach them. Students hear "it's magic" and "it's just autocomplete" in the same week. Faculty need the app to stay clear of anything that looks like help with graded work.

| They often believe | The ride shows instead | Where |
|---|---|---|
| It looks things up in its memory | The app finds passages and pastes them in | P01, L |
| It writes the whole answer at once | One token per trip around the loop | P01, P07 |
| It reads letters and words like I do | It sees numbered tokens | P02 |
| Chatting trains it; it remembers me | Its numbers stay fixed; "memory" features paste notes back in | P08, A |
| If it sounds sure, it's right | Its odds are about the next token, not the truth | P06, L |
| Attention means it understands | Attention is a weighted mix of numbers | P04 |
| It does math like a calculator | It writes likely digits; a calculator does the math | W, P08 |
| Its instructions are locked rules | Instructions and data arrive as one stream of text | G |
| Hallucination means lying | No intent: fluent text that nothing supports | P08, L |
| AI is weightless | Every trip uses electricity on hardware people built | Receipts, R1 |
| It's just autocomplete, so it's useless | It predicts the next piece, and training made that prediction very capable | P05, A |

## 3. The first minute

The owner stalled on the home page: too much at once, no clear first move. So a new visitor's first minute is designed.

1. **Arrive (0–10 s).** One focal point: the hero question in a chat bubble with a Send arrow, over a dimmed, still map. Above it: "What happens inside a chatbot after you hit Send?" One big button, **Start the ride**, and under it, small: "About a minute. Or skip to the first stop." Nothing moves or sounds; no station list, no jargon; 30 words or fewer on screen.
2. **The ride (optional, about 60 s).** It starts only on the tap. The train moves stop to stop while the board shows one plain caption at a time (12 words or fewer): "Your question is cut into tokens." "The model scores every possible next token." "It picks one, adds it and goes around again." Pause and Skip never move.
3. **The landing.** When the ride ends or is skipped, one card: "That was one answer: 28† trips around the loop. Now take it one stop at a time." One button, **Go to P01 Send**, and a quiet link, "See the whole map."
4. **After that.** The map is home, with the station list below it. Returning visitors skip steps 1–3 and see the train where they left it, with one button: "Continue at P03 Embedding."

*Test:* 5 of 5 first-time visitors tap Start or Skip within 10 seconds without help, and afterward can say something like "it writes one piece at a time."

## 4. Voice and tone

Plain second person, present tense, for a first-year in any major reading on a phone. Curious and a little funny about situations, never about the reader, never by giving the machine feelings.

- Arrive captions are 18 words or fewer. Every other on-screen block is 50 words or fewer. One idea per sentence.
- Say "token" every time, and define it once at first use: "A token is a word part: “strawberry” is st · raw · berry." Repetition builds the word; synonyms like "word piece" dilute it (owner's direction, 2026-10-14).
- Keep jargon off the screen. Rank, logit, vocabulary score, role markers, special tokens and residual stream appear only at Level 3.
- No exclamation points. Don't use "simply," "just," "obviously" or "magic."
- The model is "it." It scores, writes, picks, copies and looks back. It never thinks, knows, wants, understands, decides or remembers.
- State uncertainty once, plainly: "Nobody fully knows what this part does. Here's what we can measure."
- *Test:* read the copy aloud to someone outside the field. If they ask what something means, rewrite it.

| Do | Don't |
|---|---|
| "Your question is 19 tokens. The model never sees the letters." | "Tokenization leverages byte-pair encoding to process input efficiently." |
| "The model gave ' cups' the highest score." | "The model thinks the answer is in cups." |
| "Floors 1 to 18 guess junk. That's normal." | "Uh oh, the AI got confused!" |
| "Hidden labels mark who's talking." | "The chat template inserts role-marker special tokens." |
| "Most people bet that way. Here's what happened." | "Incorrect. Try again." |

## 5. Feng shui principles

The owner's brief is that this should be somewhere people want to be. Each rule below comes with a test.

1. **One focal point.** Each screen has one thing at full contrast, and the rest recedes. *Test:* blur a screenshot; one shape still stands out.
2. **The direction of travel is always clear.** Forward is rightward on the map and the strip. Next never moves: it stays bottom right on a laptop and in the thumb zone on a phone. *Test:* a new user finds Next within 2 seconds.
3. **The same arrival every time.** The strip slides, the roundel appears, the doors open and the Arrive panel shows. *Test:* all eight stations share one Arrive structure.
4. **Rest stops.** Every dense moment (Try it, Break it, Level 3) is followed by a quiet one (Learn it, Stamp, the ride). Every two stations, the map offers a bench: "Good place to stop. The train will wait." *Test:* no two interactive steps run back to back.
5. **Light means used.** Lamps and lines light only when this run passed through them. The Academy stays dark during every answer. Nothing glows for decoration. *Test:* every lit element maps to an event in the run file.
6. **Nothing moves on its own.** Motion starts with a tap and means a number changed: the train moves because a trip happened, and a bar grows because a chance changed. There are no idle loops, parallax or particles. *Test:* leave any screen alone for 10 seconds; nothing moves.
7. **Red means sabotage.** Only Break it levers and R2's failed lamps are red.
8. **Color never works alone.** *Test:* every screen works in grayscale.
9. **Generous space.** Gutters at least 16 px (phone) and 32 px (laptop); lines of 45 to 70 characters; Arrive and Name it fit one phone screen. *Test:* screenshot at 375 px wide.
10. **Day and night.** Day is a printed pocket map: warm paper, ink lines, matte. Night is the backlit map board in a quiet station after the last train: deep blue-black, never pure black, where only lamps and the focal element glow. *Test:* at night the brightest thing is never the app's frame or controls.
11. **Sound follows a tap.** The app is silent until the visitor turns sound on. Then each station gets a short original chime in the spirit of Tokyo's platform melodies, and the stamp gets a soft thunk. Nothing loops, and every sound has a visual twin.
12. **The student holds the clock.** There are no timers, countdowns or streaks. The five-minute loop is our budget, not theirs.
13. **Nothing blocks Next.** Each station runs Arrive, Try it, Learn it, Break it, Stamp. The separate Bet step was removed on 2026-10-14 (it cluttered navigation; "Place a bet" confused people). Predictions live on the Arrive screen as one short, optional "Guess first" question with one-tap choices.
14. **Easy to leave and return.** The map is one tap away. The train parks where you left it, and lit lamps stay lit.
15. **Quiet rewards.** No confetti. The stamp landing is the celebration.
16. **Say what to do at the control.** Every exercise has one "how to" line right above its controls, in the same style everywhere: a small amber marker and a short plain instruction, such as "Pick a word to compare with flour." The intro above the box isn't enough. Rows of choices wrap so no option is hidden; only the tokenizer's long example list scrolls sideways. Every guess and quiz answer says "✓ Correct." in green or "✗ Not quite." in red, and the options carry the same marks ("Yes." confused people when the right answer began with "No"). Every sabotage says, before any result, what we changed (one plain sentence) and where: a mini main line marks the station, and a strip of the context or the floors shows the exact tokens or floors touched. When two measures disagree (what it wrote on its own versus its odds at one spot when fed the right words), the labels name both tests.
17. **Explain a word before you lean on it.** Where a student first meets a technical word, explain it in the same sentence, or make it a tap-to-define term (`<Term id="…">`). That opens a small card with the glossary's one-line meaning, a tiny picture for the key terms, an example from our run, and a link to the full entry. The one-line meanings shown in those cards may only use words the student has already met. Specifics:
   - Say "floor" before The Stack, and "layer" only once The Stack has said a layer is a floor.
   - Never put research or app-internal words on screen: "recorded model" (say "this model"), "steered" or "scripted" (say "not its first choice; this replay keeps one fixed answer"), "top pick" (say "likeliest token"), "platform", "cutaway" or "bedrock".
   - "Weights" means the numbers set in training. Attention has "shares".
   - Every chip under Learn it names a word that its definition uses.

## 6. The metaphor system

The subway carries the flow of the run and helps with wayfinding. Each limit of the metaphor appears as one line where it matters, never in a panel of caveats.

| On the map | In the model | Where it breaks |
|---|---|---|
| The Prompt line | The steps of one model run, in order | Nothing travels. On the first trip, every token goes through each step together. |
| The train | Everything the model reads: hidden instructions, passages, question, reply so far | There's no vehicle and no driver. "Riding" is shorthand for numbers being changed. |
| One trip per new token | Writing one token at a time | Saved work makes later trips much cheaper than the first. |
| The inner loop skips the Tokenizer; the outer loops don't | New pieces are already numbered; passages and tool results arrive as text | Literal, except that the app, not the model, finds passages and runs tools. |
| Transfers to branch lines | Work the app does | The model isn't waiting. It isn't running until the app starts the loop again. |
| The platform | The context window | Big models hold 100,000 tokens or more. When the window fills, the app decides what to cut. |
| Lit and dark lines | What this answer used | Lit means the calculation passed through, not that anything was noticed. |
| The dark Academy | Answering doesn't change the model | Some companies save chats to train future models, separately and later. |
| Levels: Map, Cutaway, Bedrock | How deep the explanation goes | These aren't the model's layers. Always say "level." |

**Each station gets at most one metaphor of its own**, and some get none:

| Station | Metaphor | Where it breaks |
|---|---|---|
| P01 Send | The subway itself | See above |
| P02 Tokenizer | A coat check: hand over text, get a numbered ticket | What the ticket fetches was set in training, not brought by you |
| P03 Embedding | A city where words used alike live on the same block | The city has 896 directions, and none of them means anything nameable |
| P04 Attention | A highlighter over earlier text | Nobody is reading |
| P05 The Stack | One draft passed up a building, each floor adding edits | The draft is numbers, not words |
| P06 The Vote | An election among tokens | There are no voters; the winner is drawn by chance |
| P07 The Loop | Rereading everything before each word | Saved work means no rereading |
| P08 Reply | None; the receipt is literal | |
| L | An open-book exam | The model can't tell which book is right |
| W | Passing a note to someone with a calculator | The model doesn't wait; the app restarts it |
| G | Stage directions printed in the same font as the dialogue | Hidden labels mark who's talking, but only training makes the model respect them |
| A | Millions of fill-in-the-blank quizzes | Nobody studies; numbers get nudged |
| S | Scratch paper | It may not show how the answer was really produced |
| D | A print developing in a darkroom tray | Nothing was photographed |

**Don't use the subway** to explain what happens inside a station: attention isn't passengers chatting. Also keep it out of Level 3, out of intent (there's no driver; nothing steers), out of ethics (receipts aren't fares), and out of Stamp questions beyond station codes. If a sentence needs "like a train" to make sense, rewrite it.

## 7. The cast

- **You.** The rider. The question is yours, and so is the pace.
- **The train.** Your question, then everything the model reads. It's an object, with no eyes and no name. Its side shows a count of tokens.
- **The guide.** A human voice in the captions, seen only as a white-gloved hand. It borrows Japanese rail staff's pointing-and-calling (point at a signal, name it aloud): the hand points at the one focal thing on a screen and names it in plain words. Dry, warm, never sarcastic; never speaks for the model.
- **The app.** Everything around the model: chat window, file search (L), tool runner (W), hidden instructions (G), and decisions to trim or stop. Drawn as the station building and signs, gray with dashed outlines.
- **The model.** The Prompt line's track and machinery. It never gets a face, eyes, a robot body, a brain or a glowing head.
- **People behind the run.** The writers whose text trained it, the raters, the engineers and the data-center workers. In the Academy and the Ledger they're drawn plainly, as people at work.
- **Pantry Bot** (G2). A toy chatbot guarding Grandma's secret ingredient. It's a chat box with a label.

Machines never get faces, Pantry Bot included.

## 8. The visual alphabet

Each source of tokens has a fixed fill across the app, plus a text label: hidden instructions, passages, your question, tool call, tool result, reply. Wrapper pieces the app adds are gray.

| Element | Looks like | Means | Never used for |
|---|---|---|---|
| Token chip | Rounded rectangle in monospace; a leading space shows as a middle dot (·flour) | One token | Words or ideas in general |
| ID tag | A ticket stub under the chip, in tabular numerals | That piece's number | Any other number |
| Vector strip | Thin cells on a two-color scale; the first 32 are shown, then "… 896" | One piece's list of numbers | Texture |
| Attention arc | A curve from a chip back to an earlier chip, its width set by weight | How much one piece borrows | Anything pointing forward |
| Probability bar | Chip, bar and percent; the drawn piece is solid, others outlined, plus "everything else" so the total is 100% | Chances for the next piece | Truth or confidence |
| Platform | A strip of chips grouped by source, with a length gauge and a yellow edge line at the limit | What the model can read right now | "Memory" |
| Lamp | Hollow ring when off; soft-glow fill when on; fill plus ring where the train is; red with an × when failed (R2 only) | Whether this run passed through | Decoration |
| Roundel | A ring in the line color, letter over number (P / 04), always next to the name | A station | |
| Departure board | A dot-matrix board | Station, trip count, one short caption; the candidates at The Vote | Paragraphs |
| Die-cut window | A rounded hole that opens onto the level below | One level deeper | Moving between stations |
| Sabotage lever | A red-handled switch | Break it | Normal controls |
| Receipt and stamp | A thermal-paper strip; a single-ink circle in the line color | Ledger lines; a finished station | |

## 9. Vocabulary budget

Each station introduces at most three new terms, and fewer is better. A term counts as introduced when its station's Name it step defines it. Stamps test only terms that have been introduced.

| Station | Terms |
|---|---|
| P01 Send | large language model (LLM), prompt, context |
| P02 Tokenizer | token (token), token ID |
| P03 Embedding | embedding, weights |
| P04 Attention | attention, attention head |
| P05 The Stack | layer, transformer |
| P06 The Vote | probability, temperature, sampling |
| P07 The Loop | context window |
| P08 Reply | inference, stop token, hallucination |

**Branch-line terms:**
- L: RAG, search by meaning
- W: tool call, agent, permission
- G: system prompt (G1), prompt injection (G2)
- A: pretraining (A1), base model and fine-tuning (A2), human feedback (A3)
- S: reasoning model, thinking tokens
- D: multimodal (D1), diffusion (D2)

**Level 3 only:** these are named but never tested.
- Tokens and lookup: vocabulary, vector, byte-pair encoding, chat template, special tokens, role markers, cosine similarity
- Inside the stack: query/key/value, causal mask, hidden state, residual stream, MLP, logit lens
- Scoring and generating: logits, rank, softmax, top-p, autoregressive, KV cache, prefill and decode, loss

**Avoided, with what to say instead:**
- "layer" for a level → "level"
- neuron, brain, neural → numbers, weights
- thinks, knows, decides → scores, writes, picks
- "memory" for context → "what it can read," platform
- "learns" during an answer → "uses what's on the platform"
- tensor, parameters → table, numbers, weights
- "the AI" as the actor → "the model" or "the app," whichever did it
- prompt engineering → writing clear instructions
- black box, emergent, AGI, sentient → what we can measure

## 10. Ethics as receipt lines

Each station adds one line to a receipt printed after its Stamp; R1 The Ledger totals them in five columns: compute, energy, data, labor, accountability. Each line is 30 words or fewer, plain, factual, without alarm or blame. A figure needs a citation; otherwise use a range marked [cite]. The first line is what you got: "1 reply: about 8.4 cups, 28† trips."

| Station | Receipt line | Column |
|---|---|---|
| P01 | Your question and your recipe files left your device. The provider's policy decides who keeps them, and for how long. | data |
| P02 | You pay by the token. The same meaning takes more pieces in some languages than others, and some pay far more. [cite] | compute |
| P03 | These numbers were learned from human writing and carry its patterns, stereotypes included. Consent and credit for that writing are disputed. [cite] | data |
| P04 | Every token looks back at every earlier one, so long chats cost more per reply. | compute |
| P05 | Every trip runs every floor: about a billion arithmetic steps per token here, far more in big models. [cite] | energy |
| P06 | The company running the chatbot sets the temperature. Different answers to the same question are a design choice. | accountability |
| P07 | 28† trips. Long replies, thinking and tool use multiply trips, and each trip uses electricity. Estimates per answer vary widely. [cite: range] | energy |
| P08 | The reply has no author in the usual sense. Responsibility for errors rests with the people who build it, offer it and rely on it. | accountability |
| L | Search decides what the model sees. Access rules decide which of your files search can reach. | data |
| W | The calculator ran with the app's permissions. Agents can do whatever their permissions allow. | accountability |
| G | The company writes the hidden instructions, and you usually can't see them. | accountability |
| A | Training used large amounts of electricity and the work of people who wrote, labeled and rated text, often for low pay. [cite] | labor |
| S | Thinking costs tokens like any others, and there can be far more of them than of the visible answer. | energy |
| D | Image models learned from images collected at scale; consent and credit are contested. [cite] | data |

## 11. Accuracy rules

At any level, never imply any of the following.

1. **That the model changes while it answers.** Saving chats for future training is separate and happens later.
2. **That attention is awareness or understanding.** It's a weighted mix.
3. **That chances measure truth.** A wrong answer can be the favorite.
4. **That context is memory.** "Memory" features are the app pasting saved notes back in.
5. **That the model searches, browses or runs tools.** The model writes text. The app reads tool requests, runs the tools and pastes the results back. An agent is that loop, repeated.
6. **That the reply is written all at once, or that there's no planning at all.** Pieces come out one per trip, but the model's internal numbers can carry information about later words.
7. **That a mid-stack guess is a thought.** Reading a floor is a measurement trick.
8. **That fluent, confident or cited means correct.**
9. **That written-out thinking shows exactly** how the answer was produced.
10. **That hidden instructions are enforced** by anything but the model's training, unless the app adds checks.
11. **That small-model numbers describe big models.** Recorded numbers carry a note naming the model.
12. **That a number is real when it isn't.** Every number comes from the recorded run, the live tokenizer or live math, or else it's labeled "illustrative." If we steered the model, say so. Example: "Its first choice was to start writing. We sent it to the calculator."
13. **That "it only predicts the next piece" means it's trivial.** The mechanism is simple to state; what training packed into the numbers is not.
