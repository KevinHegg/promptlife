# Prompt Life

An interactive field guide to language models for curious, serious readers. Eight connected chapters explain generation, training, transformers, context, retrieval, tools, and evaluation through readable explanations and inspectable experiments.

**Read the course:** https://kevinhegg.github.io/promptlife/

**Original version:** https://github.com/KevinHegg/promptlife-legacy — complete pre-redesign history, also preserved as `legacy-v0.28.12` in this repository.

## Run locally

Use Node.js 22.17 or newer within the Node 22 LTS line (the deployment workflow uses Node 22).

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. No API keys, accounts, or backend are required. Fonts are requested from Google Fonts with local serif/sans-serif fallbacks; model calculations and notebook data stay in the browser.

## Validate and build

```sh
npm run typecheck
npm test
npm run build:pages
```

`build:pages` sets `/promptlife/` explicitly and works across Windows, macOS, and Linux. `npm run build` makes a root-path build. Output goes to `dist/`.

Pushes to `main` run type checking, calculation/content/persistence tests, and the Pages build, then deploy through the existing GitHub Actions workflow. The repository identity, Pages settings, and public address are preserved.

## What is implemented

- Eight question-led chapters with deeper sections, sources, optional transfer questions, and reflection.
- Responsive reading layout, mobile contents, keyboard controls, and reduced-motion support.
- Direct chapter and experiment links using hash routes, compatible with GitHub Pages refreshes.
- Real cl100k_base tokenization, loaded separately from the main app.
- Calculated softmax/sampling, one-weight training, causal attention, and context packing.
- Authored evidence, tool-boundary, and diagnostic exercises with explicit limitations.
- Searchable glossary linked back to chapters.
- Local notebook with notes, bookmarks, reading progress, experiment observations, JSON import/export, and Markdown export.
- No badges, progression gates, live-model calls, or credential claims.

## Code map

| File | Responsibility |
|---|---|
| `src/book/content.ts` | Typed chapters, glossary, source links |
| `src/book/model.ts` | Pure calculations and illustrative records |
| `src/book/Labs.tsx` | Experiment interfaces |
| `src/book/Tokenizer.tsx` | Lazy-loaded tokenizer |
| `src/book/storage.ts` | Versioned notebook validation and merging |
| `src/book/main.tsx` | Routes, reading, reference, and notebook screens |
| `src/book/book.css` | Responsive visual system |
| `scripts/core.test.mjs` | Numerical, content, tokenizer, and persistence checks |

The old application source and decorative assets are preserved in the legacy repository and tag. Historical documents under `docs/` refer to that version; [the redesign release note](docs/REDESIGN_RELEASE.md) describes the active implementation and restoration approach.

## Learning and data boundaries

These experiments are transparent toy calculations or authored scenarios, not recorded outputs from a frontier model. Fictional archive records are explicitly labeled. The tokenizer is real; the one-weight model is deliberately much smaller than an LLM.

The new notebook uses `promptlife:book:v1`. Old progress keys remain untouched. Browser storage is device-local and may be cleared by browser settings; export a notebook backup to preserve or transfer it. Import merges supported notebooks and preserves existing notes.

The first edition needs learner testing and independent technical/editorial review. Passing software checks does not establish educational effectiveness or a complete accessibility audit.
