# Before Morning Topology Card Report v0.17.2

Date: 2026-06-05

## Summary

v0.17.2 adds one early topology card, `Where LLMs Fit`, between `What Is an LLM?` and `Rationalists vs Empiricists`. The pass gives learners a simple AI family map before they meet the rules-first versus learned-patterns history card.

## Files Changed

- `src/data/content.ts`
- `src/main.tsx`
- `src/components/VisualAids.tsx`
- `src/styles/global.css`
- `src/data/contentReview.js`
- `docs/REVIEW_NOTES.md`
- `docs/stage-audits/v0-17-before-morning/IMPLEMENTATION_REPORT_V0_17_2.md`
- `docs/stage-audits/v0-17-before-morning/screenshot-index.md`
- `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-2-where-llms-fit-report.html`
- `docs/stage-audits/v0-17-before-morning/prompt-life-v0-17-2-where-llms-fit-report.pdf`
- v0.17.2 screenshots in `docs/stage-audits/v0-17-before-morning/screenshots/`

## New Card Content

- Title: `Where LLMs Fit`
- Subtitle: `AI → machine learning → generative AI → LLMs`
- One-sentence definition: A large language model is one kind of generative AI system, built with deep-learning methods inside the broader field of artificial intelligence.
- Core distinction: AI, machine learning, generative AI, and LLM are related but not interchangeable.
- Placement: after `What Is an LLM?`, before `Rationalists vs Empiricists`.
- Checkpoint: asks which statement is most accurate; the correct answer is that an LLM is one kind of generative AI inside the broader AI family.

## Visual Aid Behavior

- Added coded visual aid `ai-family-tree`.
- Diagram structure: AI branches into rule-based AI and machine learning; machine learning branches into classical ML and deep learning; deep learning branches into generative AI and other deep-learning systems; generative AI branches into LLMs, diffusion, and multimodal models.
- The visual uses short SVG labels and HTML callouts for definitions so it stays readable on narrow mobile screens.
- Tiny interaction `ai-topology` lets learners tap branches to reveal one-sentence explanations.

## Glossary Updates

Added or updated:

- `AI`
- `machine learning`
- `classical machine learning`
- `deep learning`
- `generative AI`
- `LLM`
- `diffusion model`
- `multimodal AI`
- `symbolic AI`
- `rule-based AI`
- `foundation model`

The glossary learning path now introduces topology terms with `Where LLMs Fit` while keeping `LLM` anchored to the first lesson.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run build:pages`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed; 68 total audited surfaces, 46 randomized, 22 fixed-order exclusions.
- Browser QA: passed for Journey order, 390px lesson view, 390px visual aid view, branch interaction, randomized checkpoint display, 320px review route, glossary learning path, Badge version, and Learn-mode smoke test.
- Browser console errors: none observed.
- PDF report: generated successfully.

## Known Issues

- The existing Vite large-chunk warning may still appear during build.
- The new card raises the Essential lesson count, so the dynamic badge threshold can require one additional Essential completion for some local progress states.

## Before Morning Image 2 Readiness

Before Morning remains ready for Image 2 asset generation after this topology pass. The new topology card should stay coded SVG/HTML for now; the next Image 2 candidates remain the already-planned textless assets for `What Is an LLM?`, `Pretraining`, `Fine-Tuning`, and `Alignment`.
