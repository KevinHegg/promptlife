# Prompt Life

Prompt Life is a mobile-first learning app about large language models for smart non-technical but academic audiences: advanced high-school students, first-year college students, faculty, higher-ed IT leaders, and PhDs outside computer science.

The through-line is a day in the life of a prompt. The app follows one prompt from pretraining and fine-tuning through inference, tokenization, embeddings, tensors, attention, MLPs, hidden states, logits, softmax, sampling, autoregression, context windows, diffusion, multimodal AI, and risk literacy.

## Run Locally

From this project folder:

```bash
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

## MVP Features

- Vite + React app shell.
- Mobile-first layout tuned for 390px width.
- Simple navigation: Home, Journey, Play, Glossary, Badge.
- Consistent lesson pattern: definition, relationship, metaphor, tiny interaction, checkpoint, reflection.
- LocalStorage progress for completed lessons, game insights, reflections, and the current location.
- Glossary screen plus accessible glossary drawer.
- Three non-competitive mini-games:
  - Context Stack
  - Attention Weave
  - Token Pipeline Relay
- Model Literate badge screen focused on progress and reflection rather than scores.
- Accessibility basics: semantic HTML, visible focus states, image alt text, real buttons, and reduced-motion support.

## Product Principle

One screen, one idea. One interaction, one relationship. Keep text in HTML for accessibility. Use visual assets to reduce mystery, not to hide the explanation.

See [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) for the learning architecture and v0.2 direction.
