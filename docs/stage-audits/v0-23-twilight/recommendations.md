# Twilight Recommendations v0.23

Date: 2026-06-07

## Top Content Priorities

1. Convert How AI Learns, Diffusion vs Autoregression, and Multimodal AI to the richer lesson architecture used by stronger recent cards.
2. Reframe How AI Learns around "ways systems change or are steered" so retrieval and in-context examples do not sound like durable training.
3. Make Diffusion a side-by-side comparison: autoregressive text appends one token; diffusion denoises a representation.
4. Make Multimodal clearer about engineered representations, media types, and input/output combinations.
5. Preserve The Perfect Storm, but replace its generic interaction so the learner actually taps storm ingredients.

## Top Visual/UI Problems

1. How AI Learns visual is too compressed for its conceptual load.
2. Diffusion visual shows denoising but not the contrast with autoregression.
3. Multimodal visual is useful but the central label is tight and the "shared hub" can overstate how simple multimodal systems are.
4. Perfect Storm visual is aligned, but the tiny interaction is a mismatch.
5. The bottom nav is usable, but dense checkpoint states should continue to be checked so answers and feedback can scroll above it.

## Which Cards Need More Explanation

- How AI Learns: needs durable vs temporary, retrieval vs training, and "in-context learning" as a naming trap.
- Diffusion: needs one explicit contrast line tying back to Autoregression from The Day Repeats.
- Multimodal: needs one sentence separating "works across media" from "has human senses."

## Which Cards Need Less Explanation

- Perfect Storm should not become a long history chapter.
- Diffusion should not become a full image-generation technical primer.
- Multimodal should not become a taxonomy of every model architecture.

## Image 2 Textless PNG Recommendations

### Recommended Candidate

- The Perfect Storm: create a textless ZenTron Origami convergence scene. Suggested elements: data pages, compute/data-center glow, method/folded-transformer path, human-evaluation/labor markers, and incentive current converging toward a model cloud. Keep all labels, captions, alt text, and instructional copy in HTML.

### Optional Later Candidates

- Diffusion: a textless noise-to-form scene could support the emotional metaphor, but the main teaching visual should remain coded because the denoise-vs-append contrast needs exact labels.
- Multimodal: a textless media-hub scene could become a hero/support asset later, but the lesson needs a coded diagram first.

### Not Recommended

- How AI Learns: use coded SVG/HTML. The exact distinctions are too important for a generated image.

## Coded SVG Recommendations

- How AI Learns: learning-modes matrix with short labels: pretraining, fine-tuning, RAG, in-context examples, online learning. Columns: when, changes weights, changes context, retrieves evidence.
- Diffusion: split diagram with two lanes: autoregressive loop and diffusion denoise path.
- Multimodal: media hub with text, image, audio, video, and code inputs; show representation and output routes without implying one magical vector.
- Perfect Storm: keep the convergence visual, but prepare it to pair with either coded streams or a future textless PNG background.

## CSS/HTML Recommendations

- Use collapsible or tap-reveal callouts for the How AI Learns mode matrix.
- Use a segmented control for Diffusion: "append loop" versus "denoise path."
- Use mode chips for Multimodal and keep labels short enough for 320px.
- Use storm-stream buttons for Perfect Storm: Data, Compute, Methods, Labor, Incentives.

## Tiny Interaction Recommendations

| Card | Recommendation |
| --- | --- |
| How AI Learns | Sort cards into `changes weights`, `changes current context`, and `retrieves outside evidence`. |
| Diffusion vs Autoregression | Toggle between text append loop and denoise path; the learner advances each one. |
| Multimodal AI | Tap modes to show input, representation, and possible output. |
| The Perfect Storm | Tap each storm ingredient to light one stream into the central model. |

## More Than One Checkpoint Or Exercise

- Do not add more Journey checkpoints.
- How AI Learns can continue to rely on the Play guided comparison for richer practice.
- No new games are recommended for v0.23.
- Tiny interactions are enough for this stage.

## Redundancies To Remove

- How AI Learns currently repeats earlier training and RAG ideas. Keep it as a synthesis map rather than a re-teaching card.
- Diffusion and Multimodal both widen the landscape. Diffusion should own "different generation mechanism"; Multimodal should own "different media types."
- Perfect Storm and Midnight Ledger both address social context. Perfect Storm should explain why LLMs arrived now; Midnight Ledger should handle costs and accountability.

## Recommended Next Implementation Prompt

Implement a small v0.23 Twilight: The Wider Landscape repair pass. Do not add Journey cards, games, generated PNG assets except a single optional Perfect Storm Image 2 asset if explicitly approved, heavy 3D libraries, dependencies, progress-rule changes, badge changes, Glossary Dojo changes, or checkpoint-randomization changes. Keep the Twilight order: How AI Learns, Diffusion vs Autoregression, Multimodal AI, The Perfect Storm. Convert How AI Learns, Diffusion, and Multimodal to the richer lesson architecture with core explanation, where-it-happens, durable-vs-temporary, prompt-vs-response, misconception, and richer feedback fields. Replace How AI Learns with a learning-modes matrix and sort interaction, upgrade Diffusion to a denoise-vs-append comparison, upgrade Multimodal to a mode/input/output representation map, and replace Perfect Storm's generic feature-cloud interaction with tap-to-light storm ingredients. Keep all learner text in HTML, verify 320px and 390px, and run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.

