# Twilight Tiny Interaction Plan v0.23.1

Date: 2026-06-07

## Principles

- Keep interactions concept-shaped, not competitive.
- Avoid hidden-rule puzzles.
- Avoid decorative-only motion.
- Preserve Journey progress, checkpoint randomization, badge logic, games, and Glossary Dojo behavior.

## Interaction Matrix

| Card | Interaction type | Misconception targeted | Expected action | Correct feedback | Wrong feedback | Status |
| --- | --- | --- | --- | --- | --- | --- |
| How AI Learns | `learning-modes-sort` | Any useful response means the model permanently learned something. | Tap each method until it lands in durable weight change, temporary context steering, retrieval/context, or evaluation/feedback. | Insight unlocked: not all useful AI behavior is durable learning; some of it is current-context steering. | The chip stays in the selected bucket until the learner cycles it again. | Implemented now. |
| Diffusion vs Autoregression | `diffusion-contrast` | All generative AI works like ChatGPT. | Choose Token path or Denoise path, then step through the loop. | Insight strengthened: autoregression adds tokens; diffusion refines from noise. | Intermediate feedback names the current step until the path is complete. | Implemented now. |
| Multimodal AI | `multimodal-map` | Multimodal AI has human-like perception or feelings. | Tap an input-output pair, such as image -> caption or chart + question -> answer. | Insight strengthened: the system connects media through representations or linked components. | Each tap shows a valid pairing rather than a failure state. | Implemented now. |
| The Perfect Storm | `perfect-storm-ingredients` | Modern LLMs arrived because of one magic breakthrough. | Tap Data, Compute, Storage, Algorithms, Human labor, and Incentives to light streams. | Insight strengthened: modern LLMs came from convergence, not one magic breakthrough. | Each ingredient explains why that condition mattered; no failure language. | Implemented now. |

## Deferred

- No new games.
- No generated asset-backed interaction.
- No additional Journey checkpoints.
- No learner-facing PDF feature.

