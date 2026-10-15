# Prompt Life Storyboards: the Prompt line

Phase 0. This document has one storyboard for each main-line station, P01 Send to P08 Reply, followed by the branch lines. It follows `STORY_BIBLE.md` for voice, metaphors, vocabulary and accuracy. Revised October 14 for the recipe-card hero question and plainer copy.

**The hero run.**

| Step | Content |
|---|---|
| Hidden instructions | "You are a helpful assistant." |
| Passages the app finds | "Recipe card: Grandma's buttermilk biscuits. Serves 8. 2 1/4 cups flour, 1 tablespoon baking powder, 1/2 teaspoon salt, 6 tablespoons butter, 1 cup buttermilk." and "Back of the card: Two biscuits per person. Bake at 425°F for 12 minutes." |
| Question | "Using my grandmother's recipe card, how much flour do I need to feed 30 people?" |
| Calculator request | `2.25 * 30 / 8` |
| Result | `8.4375` |
| Reply | About 8.4 cups of flour† |

**Conventions**

- **Screen copy.** Quoted text is on-screen copy. Arrive captions are 18 words or fewer. Every other on-screen block is 50 words or fewer. Screen copy says "token" until P02 gives it the name "token."
- **The † mark.** It flags a count from o200k_base or wording that must come from the recorded run.
  - The verified o200k counts are: question 19 pieces and 79 characters, hidden instructions 6, passages 69, calculator request 12, result 4, reply 16. That makes 126 on the platform and 28 trips.
  - The recorded model (Qwen2.5-0.5B-Instruct, per `TRACE_SPIKE.md`) cuts every number into single digits, so its counts will differ.
  - The current recorded trace is still the old scenario. It must be re-recorded.
- **Precomputed runs (V-…).** These are alternate runs from the trace pipeline, each saved as a full run file the map can replay. R2 Debug the Bot reuses them.
- **Templates.** Where a reveal depends on data we don't have yet, the copy is a template, finished after the recording.
- **Steering.** When the recording steered the model, the screen says so. In the spike, the small model's first choice was to answer in prose, not to call the calculator. That steering line appears at W and P08, not during the first ride.
- **Stamp options.** They're listed in display order. "(correct)" marks the answer; each wrong option's one-line reason follows the dash.

---

## P01 Send (prologue)

#### Arrive
Panel: a phone with the question in a chat bubble and a thumb over Send. Behind it is the dark map, with the train waiting at P01.
Caption: "Here's a question about Grandma's biscuits. Tap Send and follow it all the way to the answer."

#### Bet
"To write its answer, how many times does the model run?"
- Once, for the whole answer
- Once per sentence
- Once per token (correct)

Reveal: "Once per token. This answer took 28† trips, including 12† for a calculator request you never saw."

#### Poke
This is the ride from the home page, with one job: "Tap the part of the platform you typed." The right tap outlines 19 of the 126† chips. Visitors who skipped the ride on the home page take it here first. They get Play/Pause and Next stop, and can tap a lamp for its caption.
Data: the run file, covering route events, each piece's source, position and trip, and which lines are lit. The pieces the app added appear as one gray segment.

#### Name it
"A large language model (LLM) scores every possible next token, picks one and repeats. Your prompt is what you typed; the context is everything it reads, including what the app added."
Terms: LLM, prompt, context.
Picture: the platform in six colors, with your part outlined.
Metaphor: the train is everything the model reads, and it rides once per new piece. Where it breaks: "Nothing actually travels. It's one calculation, run again for each new piece."

#### Break it
None. The prologue opens the map instead.

#### Stamp
1. "A friend says the chatbot 'remembered Grandma's recipe.' What actually put the recipe in front of the model?"
   - It memorized it in training — Grandma's card was never in its training text.
   - The app found the card in your files and pasted it in (correct)
   - The model searched your files itself — the model only writes text; the app does the searching.
2. "You type 'Summarize this' and attach a 30-page apartment lease. What fills most of the context?"
   - Your two words — they're a sliver, like your 19 of 126†.
   - The lease (correct)
   - A summary the model made in advance — nothing is made in advance; the summary comes one piece per trip.

Stamp design: a thumb on a round Send button, with colored lines fanning out from it.

#### Level 3 Bedrock
The whole machine in one line: p(next piece | context) = softmax(W_out · Stack(Embed(IDs))). Below it, the loop as pseudocode: cut into pieces; repeat { score, draw, add } until a stop piece. Trips = pieces written.

#### Receipt line
"Your question and your recipe files left your device. The provider's policy decides who keeps them, and for how long." (data)

#### Flashback into P02
"On the ride, how many tokens did your question make?" Answer: 19†, out of 126† on the platform.

---

## P02 Tokenizer

#### Arrive
Panel: the question slides into a cutter and comes out as chips, each with a numbered ticket.
Caption: "The model can't read letters. Your question gets cut into tokens, and each piece gets a number."

#### Bet
"Which of these is a single token?"
- "flour"
- "·flour" (with a space in front) (correct)
- "Flour"

Reveal: "Only the one with a space in front. It's piece number 28420. Without the space it's two pieces, fl + our. With a capital, it's Fl + our."

#### Poke
A live tokenizer (o200k_base, in the browser) opens on the question: "19 tokens, 79 characters." Type anything; chips and numbers update. Challenges:
1. "Add one letter and watch the count jump." ("flouur" makes 21.)
2. "Find a word that's one piece after a space and two without." (grandmother, biscuits)
3. "Find the strangest cut." (buttermilk: but + term + ilk)
4. "Try another language." ("How much flour do I need to feed 30 people?" is 12 pieces; "¿Cuánta harina necesito para 30 personas?" is 10.)

A toggle shows the recorded model's cuts, where every digit is its own piece: "Different models cut text differently."
Data: gpt-tokenizer (a dependency already) and the recorded model's pieces for these texts.

#### Name it
"The tokenizer cuts text into tokens, called tokens, and swaps each one for its number, the token ID. From here on, the model sees only numbers."
Terms: token (token), token ID.
Picture: "flour" three ways, as chips with numbered tickets.
Metaphor: a coat check, where you hand over a piece of text and get a numbered ticket. Where it breaks: "A coat check gives back your own coat. Here every ' flour' gets the same ticket, and what that ticket fetches was set in training."

#### Break it
"Feed it letters." The intro asks the question first: why cut text into word parts at all? Lever: "Send it letter by letter." Two tiles flip with it. Tokens go from 20 to 79, about 4× the work at every station. The chance of asking for the calculator drops from 75% to 9%. One line says what the recorded model did: it drifted to counting biscuits instead of flour. Its full output sits behind "Read what it wrote." The step closes with the answer: letters make too many tokens, in a form the model rarely saw, and whole words fail on typos and new names, so tokens are word parts. Every Break it opens with its "why" question.
Data: V-P02-letters. Precomputed: yes.

#### Stamp
1. "Why have chatbots often miscounted the r's in 'strawberry'?"
   - They can't count to three — counting isn't the problem; the letters aren't in what it sees.
   - ' strawberry' reaches the model as one numbered piece, not ten letters (correct)
   - The word isn't in its list — it is, as one piece, and that's the problem.
2. "Two people send the same question, one with the typo 'flouur.' What's sure to be different?"
   - The model itself — nothing about the model changes between users.
   - The tokens and their count: 19 versus 21 (correct)
   - Whether the answer is right — models cope with most typos; only the pieces are sure to differ.

Stamp design: a paper strip cut into chips, each with a tiny ticket number.

#### Level 3 Bedrock
Byte-pair encoding, animated: " flour" starts as 6 bytes. Pairs merge step by step, the pair learned earliest first, until one ID remains. The vocabulary is 256 bytes plus an ordered list of merges, built once from a large sample of text. The special tokens of the chat template (G1) sit outside that list.

#### Receipt line
"You pay by the token. The same meaning takes more pieces in some languages than others, and some pay far more. [cite]" (compute)

#### Flashback into P03
"Does piece number 28420† (' flour') carry the meaning of 'flour'?" Answer: No. It's only a row number.

---

## P03 Embedding

#### Arrive
Panel: a ticket slides into a wall of numbered drawers. One drawer opens, and a long striped strip of numbers rolls out.
Caption: "An ID is only a row number. Each one pulls out its row: a long list of numbers."

#### Bet
"' feed' appears in 'feed 30 people' and in 'my news feed.' Does it pull the same row both times?"
- No: it reads the sentence first, then picks a row
- Yes: the same row every time (correct)
- No: rows are random

Reveal: "Same number, same row, every time. At this stop the model can't tell which 'feed' you mean. The sentence starts to matter at P04."

#### Poke
A map of meaning: about 40 words from the recorded model's table, in groups (baking, people, places, number words, which stand in for numbers because this model splits digits). Tap a word to light its nearest neighbors, measured across all 896 numbers, and see its strip. Challenges: "Find the neighbors of ' flour'." "Find two lookalikes that live far apart."
Note: "A flat map can't hold 896 directions. Trust the neighbor list, not the distance on screen."
Data: rows and neighbors for the chosen words; a projection onto the group centers (the spike: 92% of groups kept, versus 42% for plain PCA).

#### Name it
"An embedding is the list of numbers stored for each token ID. Those lists are part of the model's weights, the numbers set in training, and words used in similar ways ended up with similar lists."
Terms: embedding, weights.
Picture: ticket, drawer, strip of numbers.
Metaphor: a city where words used alike live on the same block. Where it breaks: "This city has 896 directions, not 2, and none of them means anything you could name."

#### Break it
Lever: "Scramble the table," which swaps 10%, 50% or 100% of the rows. A light scramble may change a word; a full one should turn the reply to noise. The point is that the model depends on these exact numbers.
Data: V-P03-scramble-10, -50 and -100. Precomputed: yes.

#### Stamp
1. "A new slang word takes off next month. While you chat, can the model add a row for it?"
   - Yes, it learns words as you use them — using a model never changes its weights.
   - Yes, if you explain it in your message — the explanation helps this one answer; no row is added.
   - No: the table is fixed, so the word gets cut into pieces it already has (correct)
2. "Two words have very similar lists of numbers. What's the best guess?"
   - They mean exactly the same thing — similar use isn't the same meaning; 'hot' and 'cold' are often neighbors.
   - They showed up in similar places in the training text (correct)
   - Someone grouped them by hand — training placed them; nobody labeled anything.

Stamp design: a chest of drawers, one open, with a striped strip falling out.

#### Level 3 Bedrock
The embedding matrix E has one row per vocabulary entry and 896 columns. For Qwen2.5-0.5B, that's about 136 million numbers, a quarter of its weights. Lookup is x = E[id]. Cosine similarity, a·b / (|a| |b|), is computed live for any two words. This model reuses E at P06 to score every piece.

#### Receipt line
"These numbers were learned from human writing and carry its patterns, stereotypes included. Consent and credit for that writing are disputed. [cite]" (data)

#### Flashback into P04
"Leaving P03, is ' feed' in your question the same as ' feed' in 'my news feed'?" Answer: Yes. Your sentence hasn't touched it yet.

---

## P04 Attention

#### Arrive
Panel: the chips in a row. Curved arcs reach back from ' flour' in your question to earlier chips, drawn from one real head in the recording.
Caption: "Here every token looks back at the pieces before it and borrows from them."

#### Bet
"Can ' flour' in your question look at 'people', which comes after it?"
- Yes: it sees the whole question at once
- Only if the words are related
- No: only pieces before it (correct)

Reveal: "Only backward. That's what lets the same machine write one piece at a time: no piece ever needs one that doesn't exist yet."

#### Poke
Tap any chip: arcs fan back to every earlier piece, thicker where it borrows more, each fan adding up to 100%. A dial switches among 6† chosen heads, nicknamed after studying the recording ("looks one back," "copies numbers"). Challenges: "Find a head that links ' flour' in your question to ' flour' on the card." "While the reply writes 8.4, find the head looking at the calculator's answer."
The first piece is faded, with a note: "Many heads park extra weight on the very first piece. Many models do this."
Data: attention rows for about 10 positions, all layers and heads. The old run had a look-one-back head, a copy head and a first-piece habit in 71% of heads; re-check here.

#### Name it
"Attention lets each token take a weighted mix of information from earlier pieces; the weights add up to 100%. Each layer has several attention heads, each looking for a different kind of link."
Terms: attention, attention head.
Picture: arcs from ' flour', with widths labeled.
Metaphor: a highlighter run over earlier text, darker where more is borrowed. Where it breaks: "A highlighter suggests a reader. Nobody is reading; the weights come from multiplying numbers."

#### Break it
Lever: Normal / "Hide the recipe card" / "Self only." "Hide the recipe card" means nothing may look at the passages; it should leave a fluent reply with made-up amounts. "Self only" should give noise.
Data: V-P04-hide-passages and V-P04-self-only. Precomputed: yes.

#### Stamp
1. "In 'Do not add sugar,' a head puts heavy weight on 'not.' Does that show the model understood?"
   - Yes: attention is focus — nobody is there to focus.
   - No: it shows how numbers were mixed; only the reply shows whether the instruction was followed (correct)
   - Yes: heavy weight means high confidence — weights describe mixing, not certainty.
2. "How can the 40th piece of a reply still use a fact from the first line of the context?"
   - The fact was trained in during the chat — the model doesn't change while answering.
   - It can't; only the last few pieces matter — it can, as long as the fact is still on the platform.
   - Every new piece can look back at every earlier piece on the platform (correct)

Stamp design: arcs bridging over a row of chips, like a footbridge.

#### Level 3 Bedrock
Attention as math: score_ij = q_i · k_j / √d, masked so j ≤ i (the causal mask). Then a_ij = softmax over j, and out_i = Σ_j a_ij v_j. One real row is worked live. Qwen2.5-0.5B has 14 query heads sharing 2 key-value groups, with 64 numbers per head.

#### Receipt line
"Every token looks back at every earlier one, so long chats cost more per reply." (compute)

#### Flashback into P05
"When ' flour' borrowed from earlier pieces, did that happen once or many times?" Answer: Many. Every layer does its own looking back.

---

## P05 The Stack

#### Arrive
Panel: a cutaway building above P05. Each piece's numbers ride an elevator up 24 floors, passing a looking-back room and a reworking room on every floor.
Caption: "The numbers ride up 24 floors. Each floor makes an edit, and the guess gets sharper."

#### Bet
"As the reply writes the 8 in '8.4,' on which floor does '8' first become the top guess?"
- Floor 1
- Around floor 12
- Near the top (expected correct; confirm in the recording)

Reveal template: "Floor [k] of 24. Below about floor 18 the guesses are junk, and the answer shows up only in the last few floors." In the spike, the old run's answer appeared at floors 21 to 23.

#### Poke
Ride the elevator: drag the car and read the top 5 guesses on each floor. Choose among three moments: the 8 in the answer, ' cups', and ' flour' in the reply. Floors 1 to 17 are grouped under "no word yet," as the spike recommends; floors 18 to 24 are shown one at a time.
Challenge: "Find the floor where '8' takes the lead."
Note: "Reading a guess partway up is a research trick. The middle floors weren't built to be read."
Data: the top 10 guesses on every layer for each piece the model writes.

#### Name it
"A transformer is a stack of layers. Each layer looks back (attention), then reworks each piece's numbers, adding its edit to what was already there."
Terms: layer, transformer.
Picture: the elevator shaft, with a guess on each floor.
Metaphor: one draft passed up a building, each floor adding edits without erasing anything. Where it breaks: "The draft is 896 numbers, not words. The words we show are only a peek."

#### Break it
Lever: Normal / "Skip one middle floor" / "Skip the top half." Skipping one floor often barely matters. Skipping the top half should give fluent-looking text with wrong or missing amounts.
Data: V-P05-skip-mid and V-P05-skip-top, which exits after floor 12. Precomputed: yes.

#### Stamp
1. "A bigger model has more layers. What does that give it, most directly?"
   - More rounds of looking back and reworking for every piece (correct)
   - A bigger context window — that's a separate design limit.
   - Extra floors when a question is hard — every trip runs every floor once, easy or hard.
2. "A guess read halfway up is wrong, and the top floor gets it right. What's the best description?"
   - The model changed its mind — there's no mind; one list of numbers kept being edited.
   - The model lied, then fixed it — lying needs intent.
   - An unfinished draft, read with a trick, before later floors added their edits (correct)

Stamp design: an elevator floor dial with its needle near the top.

#### Level 3 Bedrock
The residual stream: h ← h + Attention(norm(h)), then h ← h + MLP(norm(h)), repeated for 24 layers. The MLP widens 896 numbers to 4,864 and back. The logit lens reads a guess at any floor: guess = W_out · norm(h_layer). Floor 0 echoes the input piece, because this model scores with its own embedding table.

#### Receipt line
"Every trip runs every floor: about a billion arithmetic steps per token here, far more in big models. [cite]" (energy)

#### Flashback into P06
"At the top floor, what comes out: one word, or a score for every token the model knows?" Answer: A score for every piece.

---

## P06 The Vote

#### Arrive
Panel: a departure board above P06. Candidate pieces flip into rows with their chances, and one row lights.
Caption: "Every token the model knows gets a score. Scores become chances, and one piece is drawn."

#### Bet
"The model knows about 150,000 tokens. How many have some chance of being picked next?"
- Only the winner
- The top 10
- All of them, most with tiny chances (correct)

Reveal: "All of them, but most chances are microscopic. Some chatbots also cut off the long shots before drawing."

#### Poke
A temperature slider (0 to 2) over the real scores at a moment where the race is close; the spike found the answer's digits near-certain, so pick from the recording. An "everything else" bar keeps the total at 100%. "Draw 20" (the prototype's Spin) draws 20 times and tallies the results. Then Beat the Model.
Data: full score lists at 3 chosen positions (so every slider setting is exact); top 10 plus the total elsewhere; top 200 at Beat the Model positions.

#### Name it
"The model turns scores into probabilities that add up to 100%, and sampling draws the next piece. Temperature changes the spread: low makes the favorite nearly certain, and high gives long shots a chance."
Terms: probability, temperature, sampling.
Picture: departure-board bars at temperature 1.
Metaphor: an election with every token on the ballot. Where it breaks: "Nobody votes, and the favorite can lose. The winner is drawn by chance, in proportion to its odds, unless the temperature is 0."

#### Break it
Lever: temperature 0, 1 or 2. At 0 the reply is the same every time. At 1 the wording changes a little. At 2 it turns to nonsense within a few pieces, and the amount may change.
Data: V-P06-T0, -T1 and -T2, with three seeded samples each. Precomputed: yes.

#### Stamp
1. "A chatbot writes 'I'm 95% sure.' Is that its probability that the claim is true?"
   - Yes: it reads its own chances — it doesn't see them unless an app adds them to what it reads.
   - Yes, if the temperature is low — temperature changes the draw, not what the chances mean.
   - No: those are words it wrote; its chances are about the next piece, not the truth (correct)
2. "You ask the same question twice and get different answers. Nothing else changed. Why?"
   - The draw came out differently (correct)
   - It learned from your first question — it doesn't change between answers.
   - It searched your files differently — possible in apps that search again, but here it read exactly the same thing.

Stamp design: a departure board with one lit row.

#### Level 3 Bedrock
Softmax with temperature: p_i = e^(z_i / T) / Σ_j e^(z_j / T). The real scores (logits) are on screen, and the arithmetic is redone as the slider moves. Temperature 0 means "always take the top score." A note explains top-p, which drops the long tail before drawing.

#### Receipt line
"The company running the chatbot sets the temperature. Different answers to the same question are a design choice." (accountability)

#### Flashback into P07
"The Vote drew one piece. Where does it go?" Answer: To your screen, and onto the platform for the next trip.

---

## P07 The Loop

#### Arrive
Panel: the new chip boards the train, and the train loops back to P03, skipping the Tokenizer. The trip counter flips from 07 to 08.
Caption: "The new piece joins the platform, and the whole trip runs again for the next one."

#### Bet
"When the new piece loops back, where does it get back on?"
- P02 Tokenizer: it's text again
- P03 Embedding: it already has its number (correct)
- P06 The Vote: just vote again

Reveal: "Straight to P03. The model wrote a number, so there's nothing to cut. Text from outside, like the calculator's answer, goes back through P02."

#### Poke
Step through the reply one piece per tap. The platform fills and the trip counter climbs. Two bars compare the work per trip: redoing everything versus reusing saved work.
Then shrink the platform. Pieces that no longer fit fade out, oldest first, while the hidden instructions stay. The rule is labeled as the app's choice.
Data: the ordered pieces with their sources, plus each trip's drawn piece, its chance and the top 10.

#### Name it
"The model writes one piece, adds it to what it reads, and runs again for the next. The context window is the most it can read at once."
Terms: context window.
Picture: the loop above the platform, with a gauge reading 126† of 32,768.
Metaphor: writing a sentence where you reread everything so far before each new word. Where it breaks: "Real systems save each earlier piece's work, so later trips handle only the new piece."

#### Break it
Lever: platform size, set to fits everything, drops the recipe card, or drops both passages. Without the card the model can't see "Serves 8" or "2 1/4 cups." Expect a confident reply with a made-up amount, or a request for the recipe. The tone doesn't change, and that's the lesson.
Data: V-P07-no-card and V-P07-no-passages. Precomputed: yes.

#### Stamp
1. "300 messages into a chat, the bot forgets you said you're vegetarian. The app trims old messages. What helps most?"
   - Tell it to try harder to remember — words can't bring back pieces that were cut.
   - Wait a day for it to learn — it never learns from chats.
   - Say it again in a recent message (correct)
2. "A reply is 200 pieces long. How many trips did it take?"
   - 1: replies come out whole — one piece per trip.
   - 200: one per new piece (correct)
   - 200 plus the length of your question — your question rides along, all at once, on the first trip.

Stamp design: a loop of track with an arrow and a trip counter.

#### Level 3 Bedrock
Generation is autoregressive: p(reply | context) = Π_t p(piece_t | context, earlier pieces). The first trip (prefill) handles every piece at once. Each later trip (decode) handles one piece, reusing saved keys and values: the KV cache.

#### Receipt line
"28† trips. Long replies, thinking and tool use multiply trips, and each trip uses electricity. Estimates per answer vary widely. [cite: range]" (energy)

#### Flashback into P08
"What makes the loop stop?" Answer: The Vote draws a special stop piece, or the app hits a length limit.

---

## P08 Reply

#### Arrive
Panel: the reply appears on the phone: about 8.4 cups†. Behind it, the map shows Gatehouse, Library and Workshop lit, and Academy, Scratchpad and Darkroom dark. A receipt starts printing.
Caption: "A stop piece wins the vote, the loop ends, and you get your answer. Here's what it took."

#### Bet
"Did answering your question change the model?"
- Yes: it learned Grandma's recipe
- A little: every chat trains it
- No: its numbers are exactly the same (correct)

Reveal: "Not one number changed. The Academy line stayed dark the whole ride. Some companies save chats to train future models, but that happens later, separately."

#### Poke
Replay the run on a scrubber, trip 1 to 28†; each trip shows the drawn piece, its chance and the lit stations. Find where the calculator request began, the least sure trip, and where the reply copied 8.4 from 8.4375. If the recording steered the model, the board says so here: "Its first choice was to start writing. We sent it to the calculator." Then read the receipt.
Data: the full run file, each drawn piece's chance and, where steered, the model's own first choice.

#### Name it
"Inference is using a trained model: fixed numbers, one piece per trip, until a stop token. Fluent text comes out whether or not anything supports it, and false or unsupported text is a hallucination."
Terms: inference, stop token, hallucination.
Picture: the receipt.
Metaphor: none. The receipt is literal.

#### Break it
Lever: "Ban the stop token." The model keeps writing past its answer. Expect rambling, repetition or a made-up next message, because the end of a turn is one more piece it learned to predict.
Data: V-P08-no-stop, with 80 extra pieces. Precomputed: yes. After Break it, the spur opens: R1 The Ledger and R2 Debug the Bot.

#### Stamp
1. "The reply said about 8.4 cups. What makes the arithmetic trustworthy?"
   - The Vote picked the most likely digits — likely isn't the same as correct.
   - The calculator the app ran at W2; the model copied its answer (correct)
   - The Stack does exact math — models can do some arithmetic, with no guarantee.
2. "A friend says, 'I told the bot about my nut allergy last week, so now it knows.' What's true?"
   - Yes: models learn from every chat — answering never changes the model.
   - Only if the app saved it and pasted it into this conversation (correct)
   - No: models can't use personal information — they can use anything on the platform.

Stamp design: a speech bubble with a receipt tearing off its bottom edge.

#### Level 3 Bedrock
The run's total log-probability, Σ_t log p(piece_t), summed live from the recorded trips. Beside it are the counts: pieces in, pieces out, trips, and weights changed: 0.

#### Receipt line
"The reply has no author in the usual sense. Responsibility for errors rests with the people who build it, offer it and rely on it." (accountability)

#### Flashback into R1
"Your run used 126† tokens. If you paid by the piece, which would you pay for?" Answer: All of them. That means the app's additions, the recipe card, the calculator request and the reply, not only your 19.

---

## Branch lines

### L Library (Send to Tokenizer): L1 Search by meaning, L2 Fetch passages, L3 Add to context
The model has never seen Grandma's card. Before the model reads anything, the app compares your question with chunks of your files, using a separate search model. It takes the closest chunks and pastes them in, and they enter the line at P02.
- **Interaction: the Recipe Box.** About 15 chunks from a made-up folder (recipes, a grocery list, party plans) are ranked by closeness to your question. Drag a cutoff to choose how many get pasted in, and watch the reply change.
- **Game: Wrong Card.** Search returns Grandma's drop-biscuit card, which serves 12. The calculator does its job (2.25 × 30 / 12 = 5.625), and the reply says "about 5.6 cups" with full confidence. Use the reply's citation to find the wrong card, then fix the search.
- **Misconceptions fixed:** "The model knows my files." "A cited answer is a correct answer."
- **Terms:** RAG, search by meaning.
- **Needs:** the made-up folder, precomputed closeness scores, and the precomputed runs V-L-wrong-card, V-L-none and V-L-back-only.

### W Workshop (The Loop to Tokenizer): W1 Read the request, W2 Run the tool, W3 Paste the result
The model can't run anything.
1. Earlier, the app pasted a short description of the calculator into what the model reads.
2. The model writes a calculator request as text, in a format it was trained on, and ends its turn.
3. The app reads the request, runs the calculator and pastes 8.4375 back as text, which enters at P02.

If the recording needed steering, this is where the board says so.
- **Interaction: the Tool Bench.** See the raw request before the app tidies it. Then "Unplug the calculator": the model has to write the digits itself.
- **Game: Agent Loop.** A task with three tools (search your recipes, calculate, add items to a shopping list) runs as repeated loops. You approve or deny each permission, and one fetched web page tries to send your list to a stranger.
- **Misconceptions fixed:** "The model runs code or browses the web." "An agent is a different kind of AI."
- **Terms:** tool call, agent, permission.
- **Needs:** the raw request and the calculator description from the recording, plus V-W-no-tool and a scripted agent run labeled "scripted."

### G Gatehouse (from Send): G1 Hidden instructions, G2 Injection Heist
**G1.** See everything the model actually reads: the hidden labels marking who's talking, the hidden instructions, the calculator description, then your 19† pieces. A counter shows how much you never saw.

**G2 Injection Heist.** Pantry Bot keeps Grandma's secret ingredient in its hidden instructions and has been told never to share it. It works in three steps.
1. **Attack.** Three rounds:
   - ask directly
   - disguise the ask (role-play, translation, "write a poem about it")
   - plant an instruction in a recipe page the Library will fetch
2. **Defend.** Switch sides and choose defense cards:
   - firmer wording
   - marking fetched text as data
   - an app-side filter on replies
   - keeping the secret out of what the bot reads
   - removing tools it doesn't need
3. **Replay.** Each card replays against the attack library, with honest hit rates.

The lesson is that wording helps a little. The reliable fixes keep secrets out of what the model reads and limit what a hijacked bot can do.
- **Misconceptions fixed:** "Hidden instructions are locked rules." "The model can tell instructions from data."
- **Terms:** system prompt, prompt injection.
- **Needs:** everything the model reads, from the recording, plus an attack-card library with replies precomputed from a real small model, each attack run several times.

### A Academy (from The Stack): A1 Pretraining, A2 Fine-tuning, A3 Human feedback
The only line that never lights during an answer.
- **A1.** The fill-in-the-blank game at scale: guess the next piece of real text, measure the miss, nudge every number slightly, and repeat across trillions of pieces. To try it, train a tiny letter-level model in the browser on a public-domain text. The lamp lights here, and only here, as its output goes from noise to near-words.
- **A2.** The hero question goes to the base model, which carries on the page (perhaps by writing more recipe questions). Beside it, the fine-tuned model answers.
- **A3.** Rank pairs of replies, then see how many such choices become training data.
- **Misconceptions fixed:** "Chatting trains it." "Fine-tuning reliably installs facts or values."
- **Terms:** pretraining, base model, fine-tuning, human feedback.
- **Needs:** V-A-base (the base model on the hero question), the in-browser trainer, and 6 chosen pairs of replies.

### S Scratchpad (from The Loop): S1 Thinking tokens
Reasoning models write out working before the answer. Those thinking tokens ride the same loop, cost the same per trip and fill the same platform. Some products hide them or show a summary.
- **Interaction: Show your work.** A harder question: "Half my 30 guests will eat three biscuits instead of two. How much flour now?" That's 75 biscuits at 16 per batch, so about 10.5 cups. It runs with thinking off and then on. Thinking tokens fill the platform in gray, the trip counter climbs well past 28†, and you check which run got it right.
- **Misconceptions fixed:** "It's thinking like a person." "The written thinking shows exactly how it got the answer." The steps can help, but they aren't guaranteed to be a faithful account. [cite]
- **Terms:** reasoning model, thinking tokens.
- **Needs:** a small open model with a thinking switch, run both ways (V-S-think-off and V-S-think-on), with trip counts.

### D Darkroom (from Tokenizer): D1 Image patches, D2 Diffusion
- **D1.** A photo of Grandma's handwritten card is cut into a grid of patches. A vision encoder turns each patch into numbers that ride the platform like tokens. Resize the photo and watch the piece count change.
- **D2.** A different machine. Diffusion starts from noise and removes a little at each step, steered by the text request. Scrub a 30-step timeline for "a plate of biscuits, drawn in ink." For Break it, remove the text steering or stop at step 10. A note says some newer image generators work piece by piece instead.
- **Misconceptions fixed:** "Image generators collage stored pictures." "The model sees like I do." "All AI writes one piece at a time."
- **Terms:** multimodal, diffusion.
- **Needs:** one vision-language model's patch grid and piece count for the photo, plus seeded frames from a small open diffusion model, with and without text steering.

### R Reply spur (from Reply): R1 The Ledger, R2 Debug the Bot
- **R1 The Ledger.** The receipt lines from every stamped station, totaled in five columns: compute, energy, data, labor and accountability. The first line is what you got. Tap any line to see its source and range. "Change one choice" toggles (smaller model, shorter reply, thinking on, no file search) show which lines move and in which direction. The Ledger never shows a falsely precise total.
- **R2 Debug the Bot.** The capstone, played on the map. Six broken runs replay, and a station lamp flashes red. Tap where it went wrong, then pick the fix. The cases reuse precomputed runs:
  - wrong card (L2)
  - unplugged calculator (W2)
  - planted instruction in a recipe page (G2 via L3)
  - trimmed platform (P07)
  - temperature 2 (P06)
  - banned stop token (P08)

  There's no score. Each case ends with "Which station failed?" and one line of why. You finish at 5 of 6, with unlimited retries.
- **Needs:** cited ranges for the Ledger, and every precomputed run as a replayable run file.

### Beat the Model (P06, replayable from the map)
There are two kinds of round, five rounds each. Scores stay on the device; there's no leaderboard.
- **Think like the model.** See the hero run up to a point, then pick or type the next piece. You score the chance the model gave your guess, from 0 to 100. Then its favorite and its chances appear. This teaches that predictable text scores high.
- **Beat the model.** These rounds use real sentences from public-domain cookbooks and other texts. You and the model both guess the next word. Then the true word appears with the model's chance for it. You beat the model when you guessed the true word and the model gave it under 20%. This teaches that "likely" isn't the same as "true" or "what was actually written."

Typed guesses outside the stored top 200 show "below the cutoff." Guesses of more than one piece score as the product of their pieces' chances, precomputed only for the offered options.
**Needs:** the top 200 chances at about 20 chosen positions, and 10 human sentences with the model's chances at each blank.

---

## Trace pipeline requests

**Hero run.** First, re-record it for the recipe-card scenario. Then capture:
- every piece with its source and ID, including everything the app adds
- for each trip, the top 10 scores plus the total
- the full list of scores at 3 chosen positions
- the top 200 at the Beat the Model positions
- the top 10 guesses on every layer for each piece the model writes
- attention rows for about 10 positions, across all layers and heads
- embedding rows for about 40 chosen words, with neighbors and a projection that keeps groups apart
- the model's own first choice wherever we steer it

**Precomputed runs:**
- main line: V-P02-letters; V-P03-scramble-10, -50 and -100; V-P04-hide-passages and V-P04-self-only; V-P05-skip-mid and V-P05-skip-top; V-P06-T0, -T1 and -T2 (3 seeds each); V-P07-no-card and V-P07-no-passages; V-P08-no-stop
- branch lines: V-L-wrong-card, V-L-none and V-L-back-only; V-W-no-tool; V-A-base; V-S-think-off and V-S-think-on; the G2 attack library

---

## Open questions for the owner

- **Steering honesty.** The spike found the small model would rather answer in prose than call the calculator. I've put the line "Its first choice was to start writing. We sent it to the calculator" at W and P08 only, so the first ride stays simple. Is that the right place?
- **First visit for faculty.** Is "skip to the first stop" enough, or should the station list also show on the very first screen? That would cost the single focal point.
- **Injection Heist.** Should it use attack cards with precomputed replies (recommended for v1), or live typing against a model? Live typing means a browser download of several hundred MB, or a hosted service that needs a cost and privacy review.
- **The guide.** Is a white-gloved, pointing-and-calling hand the right tone, or too cute? Should it have a name?
- **Ledger sources.** Who supplies the cited ranges (energy per answer, training labor, language costs)? Does the values language in the old source registry belong in the Ledger, or only in the instructor guide?
- **Sound.** Commission short original station chimes now, or stay silent through Phase 1?
