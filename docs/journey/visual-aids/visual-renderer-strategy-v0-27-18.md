# Prompt Life Visual Renderer Strategy v0.27.18

This inventory records how Journey visual aids are rendered after the v0.27.18 readability repair. The preferred long-term strategy is a shared visual-aid frame with exact coded SVG/HTML for mechanisms and textless generated PNGs only for atmosphere.

## Generated PNG image asset with HTML callouts

- Status: keep-with-limits
- Used by: Prompt to Prediction, Broad Pretraining, Fine-Tuning Path, Alignment Landscape
- Strengths: Good for atmosphere, concept setting, and fear-reducing metaphor where exact labels are not required.
- Weaknesses: Cannot safely carry exact instructional text, token positions, or mechanism boundaries.
- Recommendation: Keep for atmospheric aids only. Do not use for exact mechanism diagrams.

## Inline coded SVG

- Status: preferred-for-mechanisms
- Used by: Forward Pass, Token IDs, Embeddings, Vectors, Tensors, Relevance Between Tokens, MLP, Layers, Hidden States, Logits, Softmax, Sampling, Autoregression, Context Window, RAG, Grounding, Hallucination, Diffusion, Multimodal, Perfect Storm, Twilight ethics/risk visuals
- Strengths: Best for exact relationships, arrows, token order, bars, boundaries, and accessibility-controlled labels.
- Weaknesses: Can become cluttered quickly if too many labels are placed inside the SVG.
- Recommendation: Preferred for model-mechanism diagrams, with strict label limits and HTML callouts for nuance.

## HTML/CSS diagram card

- Status: keep
- Used by: Prompt vs Response, Text to Tokens
- Strengths: Handles wrapping token chips and multi-row mobile layouts better than cramped SVG text.
- Weaknesses: Needs careful fixed dimensions so rows do not drift or overflow.
- Recommendation: Keep for text-heavy token/card layouts. Consider for future token-stream visuals.

## DiagramKit React SVG examples

- Status: keep
- Used by: AI Family Tree, Rules and Learned Patterns, Training Loop, Overfitting vs Generalization
- Strengths: Reusable coded primitives for taxonomy, loop, and comparison diagrams.
- Weaknesses: Some early labels were smaller than the new readability standard and need continued mobile checks.
- Recommendation: Keep, but follow the v0.27.18 minimum label-size rules.

## Shared visual aid frame with HTML caption, callouts, key takeaway, and accessible description

- Status: preferred-wrapper
- Used by: All 39 Journey visual aids
- Strengths: Strong shared grammar; keeps nuanced explanation accessible and readable below the diagram.
- Weaknesses: Can feel repetitive if visual titles/captions are not specific.
- Recommendation: Preferred wrapper for all Journey visual aids.

## Renderer metadata chip wrapper

- Status: deprecated-for-ui
- Used by: Former review-route visual aid cards
- Strengths: Useful for developers during audits.
- Weaknesses: Clutters learner review and exposes implementation details like pattern, variant, callouts, and marker counts.
- Recommendation: Deprecated from learner-facing UI. Keep renderer metadata in docs, JSON, and reports only.

## Custom SVG primitives

- Status: keep-and-standardize
- Used by: Label, Arrow, Callout, TokenChip, StepNode, diagram-specific bars/arcs/cards
- Strengths: Lightweight, dependency-free, and easy to tune for mobile.
- Weaknesses: Inconsistent use can produce tiny text or unclear endpoint geometry.
- Recommendation: Keep and consolidate into shared styles; avoid new one-off tiny labels.

## Third-party visualization helper

- Status: not-used
- Used by: None
- Strengths: None currently needed.
- Weaknesses: Would add dependency weight and may reduce design control.
- Recommendation: Do not introduce for current Journey visual aids.

