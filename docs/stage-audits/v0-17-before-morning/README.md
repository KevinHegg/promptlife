# Before Morning Stage Audit v0.17

Date: 2026-06-05

Stage audited: Before Morning

Core question: What had to happen before the user's prompt ever arrived?

Stage learning objective: Learners should understand that LLM behavior comes from learned weights shaped before ordinary use. Training and fine-tuning can durably change weights; inference later uses those weights. LLMs are not hand-written rulebooks, conscious readers, or magic databases.

## Scope

This is an internal review package for a later Deep Research and implementation pass. It does not change the live Journey curriculum, add cards, add games, add generated image assets, add heavy 3D libraries, alter progress rules, or change checkpoint randomization.

Cards audited:

1. What Is an LLM?
2. Rationalists vs Empiricists
3. Training
4. Pretraining
5. Overfitting and Generalization
6. Fine-Tuning
7. Alignment

## Files

- `card-inventory.md`: current-state inventory for all seven cards.
- `recommendations.md`: stage-level and card-level recommendations for future implementation.
- `stage-audit.json`: machine-readable audit summary.
- `screenshot-index.md`: index of all captured screenshots.
- `screenshots/`: mobile screenshots at 390px, plus 320px and 430px spot checks.

## Verification Snapshot

- `npm install`: up to date, no vulnerabilities.
- `npm run typecheck`: passed.
- `npm run build`: passed with the existing Vite large-chunk warning.
- `npm run audit:answers`: passed. Before Morning checkpoint correct positions after audit seed remain mixed: What Is an LLM position 2, Rationalists vs Empiricists position 4, Training position 2, Pretraining position 4, Overfitting position 2, Fine-Tuning position 4, Alignment position 2.
- Manual screenshot QA: captured Journey stage views, all seven cards at 390px, feedback states where easy, and dense-card spot checks at 320px and 430px.

## Current State Summary

The stage is conceptually correct and in a sensible order. It already makes the durable weight-change distinction clear. The main issues are depth balance, repeated panel headings, visual density, and interaction quality. Several cards have tiny interactions that are more illustrative than diagnostic. The stage should remain one badge path toward "Prompt Life: Model Literate"; no additional badges are recommended.

