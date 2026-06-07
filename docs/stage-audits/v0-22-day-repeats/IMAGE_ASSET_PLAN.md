# Image Asset Plan v0.22.1

Date: 2026-06-07

## Decision

No Image 2 asset is required for this implementation pass.

The Day Repeats stage now uses coded SVG and HTML/CSS visuals for:

- Autoregression
- Context Window
- RAG and Retrieval
- Grounding
- Hallucinations

This keeps labels, captions, alt text, callouts, and learner-facing explanations in app code where they remain accessible, searchable, and responsive.

## Why No Generated PNG Yet

- Autoregression needs exact token/context labels: response-so-far, `floor`, append, run again.
- Context Window needs exact capacity behavior: four visible cards and the old card falling out.
- RAG needs a precise retrieval-plus-context lane, not atmosphere.
- Grounding needs claim-to-evidence relationships that are clearer as coded lines and cards.
- Hallucinations needs a support-check structure before any atmospheric bridge scene.

## Future Candidate

Hallucinations remains the only optional future Image 2 candidate: a textless ZenTron Origami bridge scene with missing supports. It should only be added after the coded evidence/support structure stays stable and all text remains in HTML.

## Current Status

Ready for v0.22.1 without generated PNG assets.

