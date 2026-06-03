# Visual Learning Framework v0.7

## Visual Types

1. Static SVG diagram: use for stable mechanisms, concept maps, and mobile-first labels.
2. Step animation: use when sequence matters, such as training loop, token pipeline, or autoregression.
3. Interactive 2D diagram: use when a learner should tap, toggle, connect, or reveal relationships.
4. CSS 3D object: use when shallow depth clarifies structure without adding a heavy dependency.
5. Rotatable 3D object: use only when rotation reveals structure that a flat image hides.
6. Sorting/checking exercise: use for durable/temporary, risk/myth, evidence/unsupported, and open-book/learned distinctions.
7. Split-screen contrast: use for symbolic/deep learning, diffusion/autoregression, and myth/risk.
8. Evidence/causality diagram: use for grounding, hallucination, prompt injection, energy/compute, and ethics workflows.

## When 3D Is Justified

Use 3D only when rotation reveals structure that a flat image hides.

Good 3D cases:

- Tensor cube: rotation shows batch x tokens x features.
- Layer stack: rotation shows repeated sheets and flow through depth.
- Feature cloud: rotation shows high-dimensional metaphor and neighboring concepts.
- Vocabulary cloud: rotation shows many candidate tokens, with probability height/depth.
- Context tray: rotation shows prompt tokens, response tokens, retrieved context, and window limits.

Poor 3D cases:

- Hallucination
- Alignment
- Ethics
- Privacy
- Prompt injection
- Energy use

For those, prefer diagrams, flows, and sorting boards.

## Design Rules

- Keep text in HTML where possible; SVG labels must be large and redundant with captions.
- Use reduced-motion fallbacks that show the final state and numbered arrows.
- Prefer 2D first on mobile; add CSS 3D only after the 2D learning objective is clear.
- Avoid dense poster images as pages.
- No visual should imply consciousness, intention, feelings, human memory, human understanding, or moral agency.
