# Prompt Life

Prompt Life is a mobile-first learning app about large language models for smart non-technical but academic audiences: advanced high-school students, first-year college students, faculty, higher-ed IT leaders, and PhDs outside computer science.

The through-line is a day in the life of a prompt. The app follows one prompt from pretraining and fine-tuning through inference, tokenization, embeddings, tensors, attention, MLPs, hidden states, logits, softmax, sampling, autoregression, context windows, diffusion, multimodal AI, and risk literacy.

## Run Locally

From this project folder:

```bash
cd ~/Desktop/promptlife
npm install
npm run dev
```

Open the local URL printed by Vite. In this workspace it is usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run typecheck
npm run build
```

The production build is written to `dist/`.

## Export Lesson Review PDF

```bash
npm run export:lesson-pdf
```

This writes the default review deck to:

```text
docs/review/prompt-life-lesson-cards-v0-9-3.pdf
```

For the curriculum inventory pass, run:

```bash
npm run export:lesson-cards
```

This writes the inventory review deck to:

```text
docs/content-inventory/prompt-life-lesson-cards-v0-9-3-visual-system.pdf
```

## Test On A Phone

For a same-Wi-Fi phone test without deploying, run Vite on your local network:

```bash
cd ~/Desktop/promptlife
npm run dev -- --host 0.0.0.0
```

Then open the Network URL Vite prints, usually in this shape:

```text
http://YOUR-MAC-LAN-IP:5173/
```

The repo also includes a GitHub Pages workflow. Pushes to `main` build the app with the `/promptlife/` base path and deploy it to:

```text
https://kevinhegg.github.io/promptlife/
```

Developer cache note for iPhone testing: after a `main` deploy, use a hard refresh, clear site data, add a cache-busting query such as `?v=013`, or confirm the visible app version on the Badge page.

## Reset Progress

Progress is stored in this browser's `localStorage`, not cookies. Use the Badge screen's `Reset progress` button to start over on this device. Reset clears lessons, exercises, Prompt Run progress, reflections, mini-game insights, tours, and last location.

For local debugging, add `?debug=1` to the app URL and open the Badge screen to reveal progress tools. See [docs/STORAGE_AND_RESET.md](docs/STORAGE_AND_RESET.md) for the exact keys and reset behavior.

## Current Features

- Vite + React app shell.
- Mobile-first layout tuned for 390px width.
- Simple navigation: Home, Journey, Play, Glossary, Badge.
- Consistent lesson pattern: definition, where it happens, why it matters, relationship, metaphor, Brain Bridge, visual aid, tiny interaction, checkpoint, and reflection.
- Reusable exercise system in Play, Prompt Run, and How AI Learns.
- LocalStorage progress for completed lessons, exercises, game insights, reflections, and the current location.
- Lightweight React/SVG/CSS concept animations with reduced-motion support.
- Lightweight lesson visual aids plus review routes at `/review/lesson-cards` and `/review/visual-aids`.
- Lesson-card PDF export through `npm run export:lesson-pdf` and inventory review export through `npm run export:lesson-cards`.
- v0.9 Batch 2 lessons for Inference, Prompt vs Response, Tokenization, Token IDs, Embeddings, Vectors, and Tensors.
- v0.9.2 canonical pet-conflict example used across Prompt vs Response, tokenization, token IDs, embeddings, vectors, tensors, exercises, Prompt Run, glossary examples, and review PDFs.
- v0.9.3 visual-aid system reset with RAG and Retrieval rebuilt as the gold-standard open-book retrieval visual.
- v0.13 dedicated Journey cards for RAG, Grounding, and Hallucinations, plus a content-freeze candidate review.
- HTML legend/callout visual aid system designed to stay readable in mobile and PDF review.
- Play mode centered on Prompt Run, an interactive 12-step inference loop plus final ordering challenge.
- Guided comparisons:
  - Prompt Run
  - How AI Learns
- Glossary screen plus accessible glossary drawer.
- Three reflection-centered mini-games:
  - Context Stack
  - Attention Weave
  - Token Pipeline Relay
- Model Literate badge screen focused on progress and reflection rather than scores.
- Accessibility basics: semantic HTML, visible focus states, image alt text, real buttons, and reduced-motion support.

## Product Principle

One screen, one idea. One interaction, one relationship. Keep text in HTML for accessibility. Use visual assets to reduce mystery, not to hide the explanation.

See [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) for the learning architecture, [docs/CONTENT_REPAIR_V0_6.md](docs/CONTENT_REPAIR_V0_6.md) for the v0.6 repair pass, [docs/content-inventory/CONTENT_INVENTORY_V0_6.md](docs/content-inventory/CONTENT_INVENTORY_V0_6.md) for the current curriculum inventory, [docs/VISUAL_AIDS_V0_6.md](docs/VISUAL_AIDS_V0_6.md) for visual aids, [docs/PLAY_MODE_V0_5.md](docs/PLAY_MODE_V0_5.md) for Prompt Run, [docs/ANIMATION_SYSTEM.md](docs/ANIMATION_SYSTEM.md) for the concept animation approach, [docs/EXERCISE_SYSTEM.md](docs/EXERCISE_SYSTEM.md) for reusable exercises, and [docs/STORAGE_AND_RESET.md](docs/STORAGE_AND_RESET.md) for local progress storage.
