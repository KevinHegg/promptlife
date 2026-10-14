# Phase 0 prototype test: does the subway help?

A 15-minute session with one student at a time. Run it with three students before Phase 1 starts.
The question we're answering is whether the transit map makes the model easier to follow or just looks nice.

## Setup

- Run the rebuild app (`npm run dev` on the `rebuild` branch). Use a phone for one student and a laptop for the others.
- Clear progress first: open the browser's dev tools and remove the `promptlife.v1.visited` key, or use a private window.
- Ask the student to think aloud. Don't explain anything until the debrief.

## Tasks

1. **Home, no help (3 min).** "This app is about how AI chatbots answer questions. Watch it, then tell me what you think happened."
   - Note: Do they watch the whole run? Do they read the board? Do they look at the platform?
2. **Explain back (2 min).** Ask, in this order:
   - "What is the little train?" (target: the question plus everything else the model is working with)
   - "Why did it go around the loop so many times?" (target: one trip per new word piece)
   - "What's on the platform?" (target: everything the model can see right now)
   - "Why did the Library and Workshop lines light up?" (target: the app fetched pages and ran a calculator)
   - "One line stayed dark. Any guess why?" (target: answering doesn't train the model)
3. **Open a window (4 min).** "Tap the Tokenizer station." Let them find the die-cut window on their own.
   - Note: Do they find the window without help? Do they try the examples? Do they flip the Break it switch?
4. **The Vote (4 min).** "Go to The Vote and make the model pick something surprising."
   - Note: Do they discover the temperature slider and Spin? Can they say what temperature does afterward?
5. **Levels vs layers (1 min).** "You saw Map, Cutaway and Bedrock. You also saw a station about layers. Are those the same thing?"

## Pass criteria for Phase 0

- At least 3 of 3 can say what the train and the platform stand for after one run.
- None confuse the levels (Map, Cutaway, Bedrock) with the model's layers.
- At least 2 of 3 open a die-cut window without being told how.
- At least 2 of 3 say they'd keep going if more stations were open.

## Debrief questions

- "What was the most confusing moment?"
- "What would you tell a friend this is?"
- "Was anything on screen distracting?" (feng shui check: motion, color, density)
- "Rate it 1 to 5: how much did you want to keep exploring?"

## What to record

For each student: phone or laptop, minutes spent, answers to task 2 (verbatim if possible), the pass criteria above, and the debrief answers. Put notes in `docs/rebuild/test-notes/` as one file per session.
