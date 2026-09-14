# Prompt Life

An interactive field guide to language models for curious, serious readers. Nine connected chapters place generative models in AI's broader landscape and history, then explain generation, training, transformers, context, retrieval, tools, and evaluation through readable explanations and illustrations and step-through simulations.

**Read the course:** https://kevinhegg.github.io/promptlife/

**Original version:** https://github.com/KevinHegg/promptlife-legacy — complete pre-redesign history, also preserved as `legacy-v0.28.12` in this repository.

## Run locally

Use Node.js 22.17 or newer within the Node 22 LTS line (the deployment workflow uses Node 22).

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. No API keys, accounts, or backend are required. Fonts are requested from Google Fonts with local serif/sans-serif fallbacks; model calculations and reading progress stay in the browser.

## Validate and build

```sh
npm run typecheck
npm test
npm run build:pages
```

`build:pages` sets `/promptlife/` explicitly and works across Windows, macOS, and Linux. `npm run build` makes a root-path build. Output goes to `dist/`.

Pushes to `main` run type checking, calculation/content/persistence tests, and the Pages build, then deploy through the existing GitHub Actions workflow. The repository identity, Pages settings, and public address are preserved.

## What is implemented

- Nine illustrated chapters with developed introductions, examples, connections between chapters, optional fuller explanations, and primary sources.
- Nine simulations with 66 steps in total. Only Back, Next, and Restart control the simulations; numbers, tables, and visual states share one compact frame.
- An eleven-milestone AI/ML timeline and a seven-step comparison of autoregressive generation and text denoising, with six positions in each track.
- Worked math guides explain softmax, temperature, sampling, loss, gradients, attention mixtures, and context budgets in words and numbers.
- Calculated probabilities, one-weight training, causal attention, and context packing; authored evidence, tool, and evaluation scenarios.
- A searchable, alphabetical glossary, with term links in lessons and links back to their chapters.
- Mobile contents, keyboard controls, direct chapter/simulation links, and device-local reading progress.
- No notebook, login, badges, progression gates, or live-model calls.

## Code map

| File | Responsibility |
|---|---|
| `src/book/content.ts` | Fuller explanations, glossary, source links |
| `src/book/lessons.ts` | Lesson introductions, connections, and typed visual scene data |
| `src/book/model.ts` | Pure calculations and illustrative records |
| `src/book/Simulation.tsx` | Shared step controls, SVG attention, token canvases, and calculated tables |
| `src/book/MathGuide.tsx` | Worked examples and plain-language explanations of notation |
| `src/book/Timeline.tsx` | Detailed historical milestones with source links |
| `public/illustrations/` | Nine lesson SVG files |
| `scripts/generate-lesson-illustrations.mjs` | Reproducible SVG source |
| `src/book/progress.ts` | Device-local progress validation |
| `src/book/main.tsx` | Routes, lessons, course, simulations, glossary |
| `src/book/guide.css` | Responsive visual system |
| `scripts/core.test.mjs` | Numerical, content, and progress checks |

The old application source and decorative assets are preserved in the legacy repository and tag. Historical documents under `docs/` refer to that version; [the redesign release note](docs/REDESIGN_RELEASE.md) describes the active implementation and restoration approach.

## Learning and data boundaries

The simulations use transparent toy calculations or authored scenarios. They are not recorded outputs from a frontier model. Fictional archive records are explicitly labeled. The one-weight model is deliberately much smaller than an LLM.

Reading progress uses `promptlife:progress:v1` in browser storage. It is device-local and may be cleared by browser settings. The notebook and its import/export and migration code have been removed; no accounts or synchronization are needed.

The first edition needs learner testing and independent technical/editorial review. Passing software checks does not establish educational effectiveness or a complete accessibility audit.
