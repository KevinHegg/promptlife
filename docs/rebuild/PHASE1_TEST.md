# Phase 1 test: the vertical slice

Five 20-minute think-aloud sessions with first- or second-year college students, one at a time.
Use phones for at least two of the five. This decides whether Phase 2 builds the remaining stations the same way.

## Setup

- Run the rebuild app (`npm run dev` on the `rebuild` branch) and open it on the student's device, or use the same-Wi-Fi address Vite prints.
- Start from a clean device: a private window, or clear the site's storage.
- Ask the student to think aloud. Don't explain or demo anything until the debrief.

## Script

1. **Home (2 min).** "This app is about how chatbots answer questions. Look around."
2. **P01 Send (5 min).** "Start at the first station and go as far as you like." Let them run the whole loop: Arrive, Bet, Poke (find your part of the platform), Name it, Stamp.
3. **P02 Tokenizer (6 min).** "Ride on to the next station." Watch whether they open the die-cut window, try the examples and flip the Break it lever.
4. **P06 The Vote (6 min).** Send them straight there from the map. Watch whether they try the temperature slider and Draw 20, and whether they play Beat the Model.
5. **Debrief (1 min of questions, below).**

## Questions to ask at the end

1. "In your own words, what's a token?" (target: a piece of text the model turns into a number; not a word or a letter)
2. "What does temperature change?" (target: how spread out the odds are when the next token is drawn; low is predictable, high is random)
3. "Why didn't this model use the calculator on its own, and what happened when the app made it?" (target: its top choice was to start writing prose; with the tool it got 93.75)
4. "Would you keep going if the other stations were open?" (yes / no / why)
5. "What was the most confusing moment?" and "What felt good to be in?"

## Pass criteria (from the plan)

- At least 4 of 5 explain tokens and temperature correctly in their own words (questions 1 and 2).
- At least 3 of 5 say they'd keep going (question 4).

## Also note

- Time spent in each station, and where they stalled or scrolled past.
- Whether anyone confused the die-cut levels (Map, Cutaway, Bedrock) with the model's layers.
- Whether the honest "the model preferred …" messages on the board helped or confused.
- Phone vs laptop differences.

Record each session in `docs/rebuild/test-notes/` as one file named by date and device.
