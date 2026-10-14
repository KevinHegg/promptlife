# Prompt Life Storyboards: the Prompt line

Phase 0. One storyboard per main-line station, P01 Send to P08 Reply, then the branch lines. Follows `STORY_BIBLE.md` for voice, metaphors, vocabulary and accuracy.

**Conventions**

- Quoted text is on-screen copy. Arrive captions are ≤ 25 words; every on-screen block is ≤ 80 words.
- **†** marks a number from o200k_base or the plan's scripted run; replace it with the trace model's number. The trace model's tokenizer won't match o200k (Qwen-family tokenizers cut numbers into single digits), so totals like 37 trips and 106 tokens will change.
- **V-…** names a precomputed alternate run from the trace pipeline, stored as a full run file so the map can replay it. R2 Debug the Bot reuses them.
- Where a reveal depends on data we don't have yet, the copy is a template, finished after the trace.
- If the model can't produce the hero run on its own, the pipeline teacher-forces the scripted tokens and the on-screen note says: "We fed the model this exact reply and recorded its odds at each step."
- Stamp options are in display order. "(correct)" marks the answer; each distractor's one-line rationale follows the dash.

---

## P01 Send (prologue)

#### Arrive
Panel: a phone, the question typed, a thumb over Send. Behind it the whole map, every line dark, the train parked at P01.
Caption: "This is your question about your grade. Tap Send and ride along with it, all the way to the answer."

#### Bet
"To write its answer, how many times does the model run?"
- Once, for the whole answer
- Once per sentence
- Once per word-sized piece (correct)

Reveal: "Once per piece. Your answer took 37† trips, including 20† for a calculator request you never saw."

#### Poke
The 60-second ride on the living map (Play/Pause, Next stop; tap a lamp for its caption) while the platform fills by source. Then: "Tap the part of the platform you typed." The right tap outlines 17 of 106† chips and unlocks every station.
Data: the run file (route events; each token's source, position and trip; lines lit), with the app's wrapper (chat template, tool description) as a gray segment.

#### Name it
"A large language model (LLM) scores every possible next piece of text given its context, picks one, and repeats. Your prompt is what you typed; the context is everything it reads, including what the app added."
Terms: LLM, prompt, context. Picture: the platform in six colors, your part outlined.
Metaphor: the train is the whole context, riding once per new piece. Where it breaks: "Nothing travels. It's one calculation, run again for each new piece."

#### Break it
None; the prologue unlocks the map instead.

#### Stamp
1. "A friend says the chatbot 'remembered your syllabus.' What actually put it in front of the model?"
   - It memorized it in training — your syllabus was never in its training text.
   - The app searched your files and pasted passages into the context (correct)
   - The model searched your files itself — the model only writes text; the app searches.
2. "You type 'Summarize this' and attach a 30-page reading. What fills most of the context?"
   - Your two words — a sliver, like your 17 of 106†.
   - The reading's text (correct)
   - A summary prepared in advance — nothing is prepared; the summary comes one token per trip.

Stamp: a thumb on a round Send button, colored lines fanning out from it.

#### Level 3 Bedrock
One line: p(next token | context) = softmax(W_out · Stack(Embed(IDs))). Then the loop as pseudocode: tokenize; repeat { score, draw, append } until a stop token. Trips = tokens generated.

#### Receipt line
"Your question, syllabus and gradebook left your device. The provider's policy decides who keeps them, and for how long." (data)

#### Flashback into P02
"On the ride, how many tokens did your question make?" 17†, of 106† on the platform.

---

## P02 Tokenizer

#### Arrive
Panel: the question feeds into a cutter and leaves as chips, each with a numbered ticket.
Caption: "The model can't read letters. Here your question is cut into pieces, and each piece trades its text for a number."

#### Bet
"Which of these is a single token?"
- "syllabus" (no space)
- " syllabus" (a space in front) (correct)
- "Syllabus" (capital S)

Reveal: "Only the one with the space: ID 127031. 'Syllabus' is two pieces, S + yllabus. Plain 'syllabus' is three: sy + ll + abus."

#### Poke
A live tokenizer (o200k_base, in the browser) preloaded with the question; typing updates chips, IDs and "17 tokens, 60 characters." Challenges: raise the count by changing one letter ("sylabus" makes 18); find a word that's one token after a space and three without (strawberry); give ' final' a new ID without changing the word (1721 becomes 12625 or 17196). A toggle shows the trace model's cut: "Different models cut text differently."
Data: gpt-tokenizer (already a dependency); the trace model's tokens for the hero texts and challenge words.

#### Name it
"A tokenizer cuts text into tokens from a fixed vocabulary and swaps each for its token ID. From here on, the model sees only the IDs."
Terms: token, token ID, vocabulary. Picture: "syllabus" three ways, as chips with ID tags.
Metaphor: a coat check: hand over text, get a numbered ticket. Where it breaks: "A coat check returns your own coat. Every ' syllabus' gets the same ticket, and what it fetches at P03 was set in training."

#### Break it
Lever: "Cut by letters": 60 one-character tokens instead of 17. The platform fills 3.5 times faster, trips and cost rise, and the reply should degrade, since the model rarely saw text spelled out that way. Caption finished after the variant runs.
Data: V-P02-letters, the question force-split into single-character IDs. Precomputed: yes.

#### Stamp
1. "Why have chatbots often miscounted the r's in 'strawberry'?"
   - They can't count to three — counting isn't the issue; the letters aren't in what it sees.
   - ' strawberry' reaches the model as one ID, not ten letters (correct)
   - It isn't in the vocabulary — it is, as one piece, which is the problem.
2. "Two classmates send the same question, one with the typo 'sylabus.' What's guaranteed to differ?"
   - The model's weights — nothing about the model changes between users.
   - The tokens and their count, 17 versus 18 (correct)
   - Whether the answer is right — models cope with most typos; only the IDs are sure to differ.

Stamp: a paper strip cut into chips, each with a tiny ticket number.

#### Level 3 Bedrock
Byte-pair encoding, animated: " syllabus" starts as 9 bytes, and the lowest-ranked adjacent pair merges, step by step, until one ID remains. Vocabulary = 256 bytes + an ordered merge list learned once from a large text sample. Special tokens (G1) sit outside the list.

#### Receipt line
"You pay in tokens, and windows are measured in them. Many languages need more tokens than English for the same meaning. [cite]" (compute)

#### Flashback into P03
"Does ID 1721† (' final') carry the meaning of 'final'?" No. It's a row number.

---

## P03 Embedding

#### Arrive
Panel: a ticket slides into a wall of numbered drawers; one opens, and a striped strip of numbers rolls out.
Caption: "An ID is only a row number. Here each one pulls its row from a table: a long list of numbers learned in training."

#### Bet
"' final' appears in 'final exam' and in 'World Cup final.' Does it pull the same row in both?"
- No: it reads the sentence first, then picks a row
- Yes: the same row every time (correct)
- No: rows are random

Reveal: "Same ID, same row, every time. The starting numbers can't tell which final you mean. Context mixes in at P04."

#### Poke
A map of meaning: ~2,000 tokens from the trace model's embedding table, squashed to 2D. Tap one to light its 8 nearest neighbors (measured in the full table) and see its vector strip. Challenges: find the neighbors of ' final'; find two lookalikes that live far apart. Expect spelling neighbors (' Final', ' finals') too: "Starting rows group spelling and use." Note: "Two dimensions can't hold 896†. Trust the neighbor list, not the screen."
Data: rows for ~2,000 tokens, a named 2D projection, precomputed neighbors.

#### Name it
"An embedding is the vector, a list of numbers, stored for each token ID in a table that's part of the model's weights. Training pushed tokens used in similar ways toward similar vectors."
Terms: embedding, vector, weights. Picture: ticket, drawer, vector strip.
Metaphor: a city where tokens used alike share a block. Where it breaks: "This city has 896† directions, not 2, and none of them means anything you could name."

#### Break it
Lever: "Scramble the table": 10%, 50% or 100% of rows swapped among tokens. A light scramble may change a word; a full one should turn the reply to noise. The model depends on these exact numbers.
Data: V-P03-scramble-10, -50, -100. Precomputed: yes.

#### Stamp
1. "A new slang word takes off next month. While you chat, can the model add a row for it?"
   - Yes, it learns words as you use them — using a model never changes its weights.
   - Yes, if you define it in your prompt — the definition helps from the context; no row is added.
   - No: the table is fixed, and the word is split into existing tokens (correct)
2. "Two tokens have very similar vectors. Best guess about them?"
   - They mean exactly the same thing — similar use isn't identical meaning; ' hot' and ' cold' are often neighbors.
   - They appeared in similar places in the training text (correct)
   - Someone grouped them by hand — training placed them; nobody labeled the directions.

Stamp: a chest of drawers, one open, a striped strip falling out.

#### Level 3 Bedrock
E: one row per vocabulary entry, 896† columns; for Qwen2.5-0.5B, about 136 million numbers, a quarter of its weights†. Lookup: x = E[id]. Cosine similarity, a·b / (|a| |b|), live for any two tokens. This model reuses E at P06 to score tokens†.

#### Receipt line
"These numbers were learned from human writing and carry its patterns, stereotypes included. Consent and credit for that writing are disputed. [cite]" (data)

#### Flashback into P04
"Leaving P03, is your ' final' identical to the one in 'World Cup final'?" Yes. Your sentence hasn't touched it yet.

---

## P04 Attention

#### Arrive
Panel: the platform's chips in a row; arcs reach back from ' final' in your question, drawn from the head chosen for Poke.
Caption: "Here every token looks back at the tokens before it and takes a weighted mix of what they carry."

#### Bet
"Can ' final' in your question look at 'A-', which comes after it?"
- Yes: it sees the whole question at once
- Only if the two words are related
- No: only tokens before it (correct)

Reveal: "Only backward. That rule lets the same machine write one token at a time: no token ever needs one that doesn't exist yet."

#### Poke
Tap any chip: arcs fan back to every earlier token, width by weight, summing to 1. A dial switches among 6† curated heads, nicknamed after studying the trace ("looks one back," "copies numbers"). Challenges: find a head linking ' final' to the syllabus passage; find the head reading the tool result as the reply writes 93.75. Note: "Many heads park weight on the first token when nothing else fits. A known habit."
Data: attention rows for ~10 query positions, all layers and heads. If no head cleanly links ' final' to the syllabus, lead with the copying challenge.

#### Name it
"Attention lets each token take a weighted mix of information from earlier tokens, with weights that add up to 1. Each layer has several attention heads, each scoring a different kind of relevance."
Terms: attention, attention head. Picture: arcs from ' final', widths labeled.
Metaphor: a highlighter over the earlier text, darker where more is borrowed. Where it breaks: "A highlighter implies a reader. Nobody is reading; the weights come from multiplying vectors."

#### Break it
Lever: Normal / "Hide the passages" (nothing may look at the syllabus or gradebook) / "Self only." Hiding the passages should leave a fluent reply with invented or missing numbers; self-only should give noise.
Data: V-P04-hide-passages, V-P04-self-only (masks changed in every layer). Precomputed: yes.

#### Stamp
1. "In 'Do not include citations,' a head weights 'not' heavily. Does that show the model understood?"
   - Yes: attention is focus — nobody is there to focus.
   - No: it shows how numbers were mixed; only the output shows if the instruction was followed (correct)
   - Yes: high weight means high confidence — weights describe mixing, not certainty.
2. "How can the 40th token of a reply still use a fact from the first line of the context?"
   - The fact was trained in during the chat — weights don't change while answering.
   - It can't; only the last few tokens matter — it can, while the fact is on the platform.
   - Every new token can look back at every earlier token on the platform (correct)

Stamp: arcs bridging over a row of chips, like a footbridge.

#### Level 3 Bedrock
score_ij = q_i · k_j / √d, masked so j ≤ i; a_ij = softmax over j; out_i = Σ_j a_ij v_j, with one real row worked live. Trace model†: 14 query heads sharing 2 key-value groups, 64 numbers per head.

#### Receipt line
"Every token looks back at every earlier one, so long contexts cost more per reply." (compute)

#### Flashback into P05
"When ' final' borrowed from earlier tokens, did that happen once or many times?" Many. Every layer runs its own attention.

---

## P05 The Stack

#### Arrive
Panel: a cutaway building above P05. Each token's vector rides an elevator up 24† floors; every floor has an attention room, then a rework room.
Caption: "Here the numbers ride up a stack of layers. Each floor adds an edit, and the next-token guess gets sharper."

#### Bet
"As the model writes the first digit of 93.75, at which floor does the right digit first lead?"
- Floor 1
- Around the middle
- Near the top (expected correct; confirm with the trace)

Reveal template: "Floor [k] of 24†. Low floors guess [what the trace shows]; the answer arrives late, after enough borrowing."

#### Poke
Ride the elevator: drag the car and read the top 5 guesses per floor at three moments: the run's first token (where the tool call begins), the first digit of 93.75, and ' final' in the reply. Challenge: "Find the floor where the tool call takes the lead." Note: "Reading a guess mid-building is a research trick. Middle floors weren't trained to be read."
Data: top-10 guesses per layer for every generated position.

#### Name it
"A transformer is a stack of layers; each runs attention, then reworks every token's numbers separately. The result is added to the token's hidden state, the vector it carries up the stack."
Terms: layer, transformer, hidden state. Picture: the elevator shaft, a guess on each floor.
Metaphor: one draft passed up a building, each floor adding tracked changes without erasing anything. Where it breaks: "The draft is 896† numbers, not words. The words we show are only a peek."

#### Break it
Lever: Normal / "Skip one middle floor" / "Skip the top half." Skipping one floor often barely changes the reply; skipping the top half should leave fluent-looking text with wrong or missing numbers.
Data: V-P05-skip-mid, V-P05-skip-top (exit after floor 12†, then final norm and output table). Precomputed: yes.

#### Stamp
1. "A bigger model has more layers. What does that give it, most directly?"
   - More rounds of mixing and reworking for every token (correct)
   - A longer context window — that's a separate design limit.
   - Extra floors when a question is hard — every trip runs every floor once, easy or hard.
2. "A mid-stack guess shows a wrong answer; the top floor gets it right. Best description?"
   - The model changed its mind — no mind; one vector kept being edited.
   - The model lied, then corrected itself — lying needs intent.
   - An unfinished hidden state, read with a trick, before later floors added their edits (correct)

Stamp: an elevator floor dial, its needle near the top.

#### Level 3 Bedrock
The residual stream: h ← h + Attention(norm(h)); h ← h + MLP(norm(h)); repeat 24† times. The MLP widens 896† numbers to 4,864† and back. The logit lens: guess = W_out · norm(h_layer).

#### Receipt line
"Every trip runs every floor: about a billion arithmetic operations per token here, far more in frontier models. [cite]" (energy)

#### Flashback into P06
"At the top floor, what comes out: one word, or a score for every token in the vocabulary?" A score for every token.

---

## P06 The Vote

#### Arrive
Panel: a departure board above P06; candidate tokens flip into rows with odds; one row lights.
Caption: "Here every token in the vocabulary gets a score. Scores become odds, and one token is drawn."

#### Bet
"The model scores about 150,000† possible next tokens. How many get a probability above zero?"
- Only the winner
- The top 10
- All of them, most with tiny odds (correct)

Reveal: "All of them get a share, most of them microscopic. Sampling settings can cut off the long shots."

#### Poke
A temperature slider from 0 to 2 over the real scores at one moment, with an "everything else" bar so shares sum to 100%. "Draw 20" (the prototype's Spin) samples 20 tokens and tallies them. Then Beat the Model (spec under Branch lines).
Data: full score vectors at 3 curated positions, so every slider setting is exact; top-10 scores plus log-sum-exp at every other generated position; top-200 at Beat the Model positions.

#### Name it
"The model turns its scores into probabilities that add up to 100%, and sampling draws the next token from them. Temperature reshapes the odds: low makes the favorite near-certain, high gives long shots a chance."
Terms: probability, temperature, sampling. Picture: departure-board bars at temperature 1.
Metaphor: an election with every token as a candidate. Where it breaks: "No one votes, and the favorite can lose: the winner is drawn in proportion to its odds, unless the temperature is 0."

#### Break it
Lever: temperature 0 / 1 / 2. At 0 the reply is identical every time; at 1, expect small wording changes; at 2, it drifts into nonsense within a few tokens, and the number may change.
Data: V-P06-T0, -T1, -T2, three seeded samples each. Precomputed: yes.

#### Stamp
1. "A chatbot writes 'I'm 95% sure.' Is that the model's probability that the claim is true?"
   - Yes: it reads its own probabilities — it doesn't see its odds unless an app adds them to the context.
   - Yes, if the temperature is low — temperature changes the draw, not what the odds mean.
   - No: it's text the model wrote; its odds are about the next token, not truth (correct)
2. "You ask the same question twice and get different answers. Nothing else changed. Most likely reason?"
   - Sampling drew different tokens (correct)
   - It learned from your first question — weights don't change between answers.
   - It searched differently the second time — possible in apps that search again, but here the context was identical.

Stamp: a departure board with one lit row.

#### Level 3 Bedrock
Softmax with temperature: p_i = e^(z_i / T) / Σ_j e^(z_j / T), with the real scores (logits) on screen and the arithmetic recomputed as the slider moves. Temperature 0 means "always take the top score." A note on top-p, which drops the long tail before drawing.

#### Receipt line
"The provider sets the temperature. Different answers to the same question are a design choice." (accountability)

#### Flashback into P07
"The vote drew one token. Where does it go?" To your screen, and onto the platform for the next trip.

---

## P07 The Loop

#### Arrive
Panel: the new chip boards the train; the train loops from P07 back to P03, skipping the Tokenizer; the trip counter flips 07 to 08.
Caption: "Here the new token joins the platform, and the whole trip runs again for the next one, until a stop token wins."

#### Bet
"When the new token loops back, where does it re-enter?"
- P02 Tokenizer: it's text again
- P03 Embedding: it's already an ID (correct)
- P06 The Vote: just vote again

Reveal: "Straight to P03. The model wrote an ID, so there's nothing to cut. Text from outside, like a tool result, goes back through P02."

#### Poke
Step the reply one token per tap. The platform fills, the trip counter climbs, and two bars compare work per trip: recomputing everything versus saved work for the new token only. Then shrink the platform: chips that no longer fit fade out, oldest first, system prompt kept, the policy labeled as the app's choice.
Data: the ordered sequence with sources; per trip, the drawn token, its probability and the top 10.

#### Name it
"The model is autoregressive: each new token is appended to the context and fed back in to predict the next. The context window is the most tokens the model can take in at once."
Terms: autoregressive, context window. Picture: the loop above the platform, with a gauge reading 106† of 32,768†.
Metaphor: writing a sentence where you reread everything so far before each word. Where it breaks: "Real systems save each earlier token's work, so later trips process only the new token."

#### Break it
Lever: platform size: fits all / drops the syllabus / drops both passages. Without the syllabus the model can't see 40% or 90%; expect a confident reply built on an invented requirement, or a request for the syllabus. The tone doesn't change. That's the lesson.
Data: V-P07-no-syllabus, V-P07-no-passages (trimmed before generation). Precomputed: yes.

#### Stamp
1. "300 messages into a chat, the bot ignores a rule you set at the start. The app trims old messages. What's most likely to help?"
   - Tell it to remember harder — words can't restore tokens that were cut.
   - Wait a day for it to learn the rule — it never learns from chats.
   - Restate the rule in a recent message (correct)
2. "A reply is 200 tokens long. How many trips did it take?"
   - 1: replies come out whole — one token per trip.
   - 200: one per new token (correct)
   - 200 plus your prompt's length — the prompt rides in all at once on the first trip.

Stamp: a loop of track with an arrow and a trip counter.

#### Level 3 Bedrock
p(reply | context) = Π_t p(token_t | context, earlier tokens). The first trip (prefill) handles every context token in parallel; each later trip (decode) handles one, reusing saved keys and values: the KV cache, shown growing each trip.

#### Receipt line
"37† trips. Long replies, thinking tokens and tool loops multiply trips, and each draws electricity. Per-answer estimates vary widely. [cite: range]" (energy)

#### Flashback into P08
"What makes the loop stop?" The vote draws a special stop token, or the app hits a length limit.

---

## P08 Reply

#### Arrive
Panel: the reply appears on the phone. Behind it, the map: Gatehouse, Library and Workshop lit; Academy, Scratchpad and Darkroom dark. A receipt starts printing.
Caption: "A stop token wins the vote, the loop ends, and the app shows you the reply. Here's what it took."

#### Bet
"Did answering your question change the model?"
- Yes: it learned your grades
- A little: every chat trains it
- No: its weights are exactly the same (correct)

Reveal: "Not one weight changed. The Academy line stayed dark the whole ride. Some companies save chats to train future models, but that happens later, separately."

#### Poke
Replay the run on a scrubber, trip 1 to 37†: each trip shows the drawn token, its odds and the lit stations. Find the trip where the tool call began, the least sure trip, and where the reply copied 93.75 from the tool result. Then read the receipt: tokens in by source, tokens out, trips, lines lit and dark.
Data: the complete run file, plus each drawn token's probability.

#### Name it
"Inference is running a trained model on new context: fixed weights, one token per trip, until a stop token. Fluent text comes out whether or not anything supports it, and false or unsupported output is a hallucination."
Terms: inference, stop token, hallucination. Picture: the receipt.
Metaphor: none. The receipt is literal.

#### Break it
Lever: "Ban the stop token." The model keeps writing past its answer. Expect rambling, repetition or an invented next turn, since turn markers are tokens it learned to predict.
Data: V-P08-no-stop (the stop token's score set to minus infinity; 80 extra tokens). Precomputed: yes. Then the spur opens: R1 The Ledger and R2 Debug the Bot.

#### Stamp
1. "Your reply said 93.75%. What makes the arithmetic trustworthy?"
   - The vote picked the most probable digits — probable isn't the same as correct.
   - The calculator the app ran at W2; the model copied its result (correct)
   - The Stack does exact math — models can do some arithmetic, with no guarantee.
2. "A classmate says, 'I told the bot my grade last week, so now it knows.' What's true?"
   - Yes: models learn from every chat — inference never changes weights.
   - Only if the app saved it and put it back into this context (correct)
   - No: models can't use personal information — they can use anything on the platform.

Stamp: a speech bubble with a receipt tearing off its bottom edge.

#### Level 3 Bedrock
The run's total log-probability, Σ_t log p(token_t), summed live from the trace's per-trip numbers, beside the counts: tokens in, tokens out, trips, weights changed: 0.

#### Receipt line
"The reply has no author in the usual sense. Responsibility for errors rests with the people who build, deploy and rely on it." (accountability)

#### Flashback into R1
"Your run used 106† tokens. If you paid per token, which would you pay for?" All of them: the app's wrapper, the passages, the tool call and the reply, not only your 17.

---

## Branch lines

### L Library (Send to Tokenizer): L1 Search by meaning, L2 Fetch passages, L3 Add to context
The model has never seen your syllabus. Before it reads anything, the app compares your question with chunks of your course files using a separate, smaller embedding model, fetches the closest chunks and pastes them into the context, where they enter at P02.
**Interaction: the Reading Room.** About 15 chunks of a fictional course folder are ranked by similarity to your question. Drag a cutoff to choose how many board, then see the reply change.
**Game: Wrong Page.** Retrieval returns last year's syllabus, where an A- starts at 92%. The calculator does its job, and the reply says "98.75%" with full confidence. Use the reply's citation to find the bad passage, then fix the retrieval.
**Fixes:** "the model knows my files," and "a cited answer is a correct answer."
**Terms:** RAG, semantic search, grounding.
**Needs:** the fictional corpus; precomputed similarity scores; V-L-wrong-syllabus, V-L-none, V-L-gradebook-only.

### W Workshop (The Loop to Tokenizer): W1 Read the call, W2 Run the tool, W3 Paste the result
The model can't run anything. The app pasted a description of the calculator into the context earlier; the model writes a tool call as text, in a format it was fine-tuned to produce, and ends its turn. The app reads the call, runs the calculator and pastes 93.75 back as text, which enters at P02.
**Interaction: the Tool Bench.** Read the raw call, special tokens included, before the app tidies it. Then "Unplug the calculator": the model has to write the digits itself.
**Game: Agent Loop.** A three-tool task (search course files, calculate, add a study block to your calendar) runs as repeated loops. You approve or deny each permission request; one fetched page tries to invite a stranger to your calendar.
**Fixes:** "the model runs code or browses the web," and "an agent is a different kind of AI."
**Terms:** tool call, agent, permission.
**Needs:** raw call and tool-description tokens from the trace; V-W-no-tool; a scripted agent run, labeled as scripted.

### G Gatehouse (from Send): G1 Hidden system prompt, G2 Injection Heist
**G1.** See the raw context: the chat template's special tokens marking who's speaking, the system prompt, the tool description, then your 17†. A counter shows how much of the platform you never saw.
**G2 Injection Heist.** Locker Bot keeps a fictional locker code in its system prompt and has been told never to share it. Three attack rounds: ask directly; disguise the ask (role-play, translation, formatting); plant an instruction in a course file the Library will fetch. Then switch sides and choose defense cards: firmer wording, marking fetched text as data, an app-side filter on replies, keeping the secret out of the context, removing tools the bot doesn't need. Each card replays against the attack library with honest hit rates. The lesson: wording helps a little; the reliable fixes keep secrets out of the context and limit what a hijacked model can do.
**Fixes:** "the system prompt is a locked rulebook," and "the model can tell instructions from data."
**Terms:** system prompt, chat template, special token; prompt injection.
**Needs:** the full templated sequence from the trace; an attack-card library with replies precomputed from a real small model, each run several times.

### A Academy (from The Stack): A1 Pretraining, A2 Fine-tuning, A3 Human feedback
The only line that never lights during an answer.
**A1.** The guessing game at scale: predict the next token of real text, measure the miss (the loss), nudge every weight slightly, and repeat across trillions of tokens. Interaction: train a tiny character-level model in the browser on a public-domain text. The lamp lights here, and only here, as its samples go from noise to near-words.
**A2.** The hero question sent to the base model, which continues the page (perhaps by writing more questions), beside the fine-tuned model, which answers and calls the tool.
**A3.** Rank pairs of replies, then see how many such choices become a training signal.
**Fixes:** "chatting trains it," and "fine-tuning installs values or facts reliably."
**Terms:** pretraining, loss; base model, fine-tuning; human feedback (RLHF).
**Needs:** V-A-base (the base model on the hero prompt); the in-browser trainer; 6 curated preference pairs.

### S Scratchpad (from The Loop): S1 Thinking tokens
Reasoning models write working before the answer. Thinking tokens ride the same loop, cost the same per trip and fill the same platform; products may hide or summarize them.
**Interaction: Show your work.** A harder version of the hero question (two exams, one dropped quiz) runs with thinking off and on. Thinking tokens fill the platform in gray, the trip counter climbs well past 37†, and you check which run got the right number.
**Fixes:** "it's thinking like a person," and "the written reasoning shows exactly how it got the answer." The steps can help, but they aren't guaranteed to be a faithful account. [cite]
**Terms:** reasoning model, thinking tokens.
**Needs:** a small open model with a thinking switch, run both ways (V-S-think-off, V-S-think-on), with trip counts.

### D Darkroom (from Tokenizer): D1 Image patches, D2 Diffusion
**D1.** A photo of the syllabus page is cut into a grid of patches; a vision encoder turns each patch into a vector that rides the platform like a token. Slide the image's resolution and watch the token count change.
**D2.** A different machine. Diffusion starts from noise and removes a little at each step, steered by the text prompt. Scrub a 30-step timeline for "a subway map drawn in ink." Break it: remove the text steering, or stop at step 10. A note says some newer image generators work token by token instead.
**Fixes:** "image generators collage stored pictures," "the model sees like I do," and "all generative AI writes one token at a time."
**Terms:** multimodal, image patch; diffusion.
**Needs:** one vision-language model's patch grid and token counts for the photo; seeded frames from a small open diffusion model, with and without text steering.

### R Reply spur (from Reply): R1 The Ledger, R2 Debug the Bot
**R1 The Ledger.** The receipt lines from every stamped station, totaled in five columns: compute, energy, data, labor, accountability. The first line is what you got. Tap any line for its source and range. "Change one choice" toggles (smaller model, shorter reply, thinking on, no retrieval) show which lines move and in which direction, never a falsely precise total.
**R2 Debug the Bot.** The capstone, played on the map. Six broken runs replay, and a station lamp flashes red. Tap where it went wrong, then pick the fix. Cases reuse variants: wrong syllabus (L2), unplugged calculator (W2), injected passage (G2 via L3), trimmed window (P07), temperature 2 (P06), banned stop token (P08). No score; each case ends with "Which station failed?" and one line of why. Finish at 5 of 6, retries unlimited.
**Needs:** cited ranges for the Ledger; every variant as a replayable run file.

### Beat the Model (P06, replayable from the map)
Two round types, five rounds each. Scores stay on the device; no leaderboard.
- **Think like the model.** See the hero run up to a point and pick or type the next token. You score the probability the model gave your guess, 0 to 100; then its favorite and odds appear. It teaches that predictable text scores high.
- **Beat the model.** Real human-written sentences from public-domain course readings. You both guess the next word; then the true word appears with the model's odds for it. You beat the model when you guessed the true word and it gave that word under 20%. It teaches that probable isn't the same as what's true or what was actually written.

Free-typed guesses outside the stored top 200 show "below the cutoff." Multi-token guesses score as the product of their tokens' odds, precomputed for offered options only.
**Needs:** top-200 probabilities at ~20 curated positions; 10 human sentences with the model's odds at each blank.

---

## Trace pipeline requests

**Hero run:** every token with source and ID, chat template and tool description included; per trip, top-10 scores plus log-sum-exp; full score vectors at 3 curated positions; top-200 at Beat the Model positions; per-layer top-10 guesses for generated positions; attention rows for ~10 queries across all layers and heads; embedding rows for ~2,000 tokens with a 2D projection and neighbors.

**Variants:** V-P02-letters; V-P03-scramble-10/50/100; V-P04-hide-passages, V-P04-self-only; V-P05-skip-mid, V-P05-skip-top; V-P06-T0/T1/T2 (3 seeds each); V-P07-no-syllabus, V-P07-no-passages; V-P08-no-stop; V-L-wrong-syllabus, V-L-none, V-L-gradebook-only; V-W-no-tool; V-A-base; V-S-think-off, V-S-think-on; the G2 attack library.

---

## Open questions for the owner

- **Trace model.** Qwen2.5-0.5B-Instruct, or a small Qwen3-family model whose thinking switch would let S1 use the same machine as the main line? Either way its tokenizer splits numbers into single digits, so 37 trips and 106 tokens will change. Should the main line show the trace model's counts, keeping o200k for the playground under a "different models cut differently" note?
- **If the small model can't produce the hero run by itself** (a clean tool call, a correct copy of 93.75), do we teacher-force and label it, trace a larger model, or simplify the hero?
- **Injection Heist:** curated attack cards with precomputed replies (recommended for v1), or live typing against a model, which means a browser download of several hundred MB or a hosted API with cost and privacy review?
- **The guide** as a white-gloved, pointing-and-calling hand borrowed from Japanese rail practice: right tone, or too cute? Named or unnamed?
- **Ledger sources:** who owns the cited ranges (energy per answer, training labor, tokenizer language costs), and does the institution's values language from the old source registry belong in the Ledger or only in the instructor guide?
- **Sound:** commission short original station chimes now, or ship silent through Phase 1?
