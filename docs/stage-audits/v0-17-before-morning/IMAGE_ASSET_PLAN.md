# Before Morning Image Asset Plan v0.17.1

Date: 2026-06-05

Purpose: define future textless Image 2 assets for the Before Morning stage without generating or adding PNG assets in this pass. Current app visuals remain coded SVG plus HTML callouts for accessibility.

## Asset Rules

- Do not put lesson text inside generated images.
- Do not make dense poster pages.
- Keep all explanatory copy in HTML callouts and lesson content.
- Use calm, academic, visually rich scenes that feel smart rather than childish.
- Keep coded overlays lightweight and readable at 320px, 390px, and PDF export sizes.

## `before-morning-llm-cloud.png`

- Lesson: What Is an LLM?
- Purpose: Make next-token prediction concrete and visually rich by showing a prompt trace entering a learned model cloud and producing one chosen token.
- Image prompt draft: Textless mobile-first illustration of a ribbon-like prompt entering an abstract learned model cloud made of paper-neon layers, small probability lights gathering around one glowing token card, warm academic palette, clean depth, no readable text, no robots, no human brain.
- Forbidden elements: readable text, poster labels, robot face, biological brain, magic sparkles, database/file cabinet, scary imagery, leaderboard/game UI.
- Codex overlay plan: Add HTML/SVG callouts for Current context, Learned weights, Token cloud, and Append. If overlaid token chips are needed, render them in app code rather than in the image.
- Alt text draft: A prompt ribbon enters a layered model cloud and one glowing token card emerges to be appended.
- Callout plan: HTML callouts explain score, choose, append, repeat using the canonical pet-conflict prompt and `floor` token.

## `before-morning-pretraining-landscape.png`

- Lesson: Pretraining
- Purpose: Separate pretraining from generic training by emphasizing enormous scale and broad pattern learning without implying perfect recall.
- Image prompt draft: Textless landscape of many quiet data streams carving broad paths through a folded paper terrain, durable paths glowing softly, academic and calm, no text, no source documents with readable content, no brain, no library archive.
- Forbidden elements: readable text, exact documents, memorization/file cabinet imagery, scary storm, dense data poster, childlike cartoon style.
- Codex overlay plan: Add coded callout numbers and HTML callouts for Huge scale, Broad patterns, and Limit. Keep the current coded SVG until this asset exists.
- Alt text draft: Many streams carve broad durable paths through a calm abstract landscape.
- Callout plan: HTML callouts state that pretraining repeats the training loop at scale, changes weights, and does not create perfect recall.

## `before-morning-finetuning-path.png`

- Lesson: Fine-Tuning
- Purpose: Show fine-tuning as targeted durable adaptation after pretraining, distinct from prompting, RAG, and sampling.
- Image prompt draft: Textless folded-paper terrain with an existing broad path and a smaller highlighted path being gently refined by incoming example cards, sophisticated mobile illustration, no readable text, no tool UI, no brain, no robot.
- Forbidden elements: readable text, one-prompt-as-training implication, web search imagery as if it trained the model, sampling wheel, heavy 3D spectacle, dense labels.
- Codex overlay plan: Use coded overlays for Pretrained base, Targeted data, and Future responses shaped. Keep contrast with temporary context steering in HTML.
- Alt text draft: Example cards refine a highlighted path across an already formed model landscape.
- Callout plan: HTML callouts contrast durable training/adapters with prompts, retrieved context, and decoding choices.

## `before-morning-alignment-garden.png`

- Lesson: Alignment
- Purpose: Reduce Alignment density by grouping durable shaping, runtime steering, and evaluation in one calm landscape while making the brain metaphor limit explicit.
- Image prompt draft: Textless neon-paper zen garden with a preferred path, subtle guardrail, compass-like marker, evaluation stones, and warning zone, calm academic palette, no readable text, no judge/robot/brain, no moral halo.
- Forbidden elements: readable text, moral purity halo, robot judge, human brain, police imagery, fearmongering, dense policy poster.
- Codex overlay plan: Add coded numbered callouts outside the art for Durable shaping, Runtime steering, Evaluation, and Limit. Lesson HTML carries all method names and nuance.
- Alt text draft: A calm abstract garden shows a preferred path, guardrail, and evaluation markers around a model behavior landscape.
- Callout plan: HTML callouts explain instruction tuning/human feedback/preference optimization, system prompts/filters/tool rules, safety tests/red-team review, and the limit: not conscience or truth guarantee.

## Implementation Note

No generated PNG assets were created for v0.17.1. These filenames are reserved for a future visual-asset pass.
