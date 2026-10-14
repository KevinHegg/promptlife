# Prompt Life

A living transit map of how language models work. One student question ("Using my syllabus, what do I need on the final to get an A-?") rides through a real model, station by station. At each station you bet, poke at real numbers, break something on purpose, and earn a stamp.

Live: https://kevinhegg.github.io/promptlife/

## Run it

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173/).

```bash
npm run typecheck
npm test
npm run build
```

## How it's organized

- `src/map/`: the living map, its run engine, the departure board and the context "platform".
- `src/loop/`: the five-minute station loop (Arrive, Bet, Poke, Name it, Break it, Stamp), stamps.
- `src/stations/`: the content for each station with a full loop (Send, Tokenizer, The Vote so far).
- `src/cutaway/`: the die-cut levels (Map, Cutaway, Bedrock) for each station.
- `src/games/`: Beat the Model.
- `src/data/`: the network, the hero scenario, and adapters for the recorded model runs.
- `src/data/traces/`: real numbers from a small open model (Qwen2.5-0.5B-Instruct), made by `scripts/trace/`.
- `docs/rebuild/`: the story bible, storyboards, trace report and student test scripts.

## Real numbers

Everything the app shows about the model comes from recorded runs (`scripts/trace/README.md` explains how to regenerate them) or from a real tokenizer in the browser. Anything illustrative is labeled on screen.

## Deploying

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which tests and builds the app for https://kevinhegg.github.io/promptlife/. The same workflow also publishes the archive.

## Earlier versions

- The interactive field guide (September 2026, v1.0.0): tag `legacy-field-guide-v1.0.0`, still online at https://kevinhegg.github.io/promptlife/archive/field-guide/
- The card-based journey (June 2026, v0.28.12): tag `legacy-v0.28.12`. Its sources are also kept in `legacy/v0.28/`, and unfinished v0.28.13 work is on the branch `archive/v0.28.13-wip`.

Progress in the app is stored only in the browser on each device.
