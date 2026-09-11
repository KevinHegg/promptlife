# Interactive book release

## Preservation

- The original repository remains `KevinHegg/promptlife`.
- GitHub Pages remains `https://kevinhegg.github.io/promptlife/`.
- Pages continues to deploy via `.github/workflows/deploy-pages.yml` on pushes to `main`.
- The original app is preserved with its 62-commit history at `https://github.com/KevinHegg/promptlife-legacy`.
- The original main commit is `35dfd5892cfb64798fea38cd895dac0dabdfde40`.
- An annotated `legacy-v0.28.12` tag exists in both repositories.
- The backup is a separate repository with the full Git history, not a GitHub fork-network relationship. Its Actions are disabled so the copied Pages workflow does not try to deploy.

The repository owning the existing Pages URL was not renamed, transferred, deleted, or recreated. Git history was not rewritten. The old browser-storage keys are untouched; the new notebook uses `promptlife:book:v1`.

## This release

Eight connected chapters replace the 39-card journey. Each includes prose, an experiment, deeper mechanics, a transfer question, reflection, and source links. The new layout supports wide desktop reading and single-column mobile use. Hash-based chapter and experiment URLs work directly on GitHub Pages without server rewrite rules.

The experiments are a scripted request trace, real cl100k_base tokenization, calculated softmax and repeated sampling, a one-weight gradient-training example, causal attention with a weighted sum, context packing, four document-evidence scenarios, tool-boundary decisions, and cross-topic diagnosis cases.

The tokenizer is loaded separately. Toy calculations and authored scenarios explicitly describe their limitations. No response is presented as a recorded or live model run. The archive examples are fictional and do not use Ask the Record data. No provider credentials, accounts, live model billing, or external document upload service are needed.

The notebook stores chapter notes, bookmarks, reading progress, and experiment observations on the current device. It exports JSON for moving between machines and Markdown for reading. JSON import validates the format and merges it with existing work. Read indicators are not mastery claims. Badges and gated progression are removed.

## Code boundaries

- `src/book/content.ts`: typed chapters, source links, glossary.
- `src/book/model.ts`: pure numerical operations and experiment records.
- `src/book/Labs.tsx`: experiment UI.
- `src/book/Tokenizer.tsx`: real tokenizer, dynamically loaded.
- `src/book/storage.ts`: notebook schema, parsing, merging.
- `src/book/main.tsx`: routes, course and reference screens, notebook, chapter renderer.
- `src/book/book.css`: responsive visual system.
- `scripts/core.test.mjs`: calculation, tokenizer, content, and persistence checks.

Historical curriculum and audit documents in `docs/` describe the original version. The active app no longer depends on the old UI, checkpoint banks, audit scripts, or decorative assets; these are preserved in the legacy repository and tag.

## Validation and limits

Strict TypeScript checking, Node tests, and the GitHub Pages production build are required locally and in deployment CI. Tests cover normalized and stable probabilities, causal exclusion, seeded sampling, training and held-out behavior, context budgets, Unicode token round-trips, notebook import/export, and the chapter/reference structure.

This is an implemented first edition, not a completed learner study. Human comprehension testing, technical editorial review, and a full browser accessibility/responsive review remain necessary before describing it as a validated learning experience. No live-model experiments or recorded-model datasets are claimed.

## Rollback without losing Pages

Revert the redesign release commit on `main` with a new Git commit, then push normally. The existing Pages workflow will redeploy the previous app. Do not delete or rename the repository, reset shared history, or change the Pages URL.

For inspecting the original app separately, clone `KevinHegg/promptlife-legacy` and check out `legacy-v0.28.12`. The tag also allows comparing or restoring selected files. It is not necessary to change the original repository’s Pages settings.
