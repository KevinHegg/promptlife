# Prompt Life Style Guide v0.10

## 1. Visual Philosophy

Working name: **ZenTron Origami**

Prompt Life uses calm paper-like surfaces, glowing computational edges, layered origami geometry, and sparse anime-inspired composition to make invisible model mechanics feel approachable. The app should feel like a calm AI dojo: a paper lantern glowing with computation, a neon zen garden, and an origami model of a transformer.

The visual system should reduce fear by making the machinery legible. It should feel serious but welcoming, beautiful but calm, playful but not childish, and future-facing without feeling like a generic SaaS dashboard or a neon casino.

## 2. Design Principles

- Calm before complexity.
- One focal object per screen.
- Negative space is instructional.
- Glow means active computation.
- Paper layers mean conceptual layers.
- Origami folds mean transformation.
- Neon paths mean information flow.
- Human metaphors must remain limited and humble.
- Visuals must breathe.
- No mini-posters inside lesson cards.

## 3. Visual Feng Shui Rules

- Every card has one visual center of gravity.
- Every screen needs quiet space.
- Important concepts get more space, not more text.
- Visual rhythm alternates dense and quiet moments.
- The learner should feel guided, not attacked by UI.
- Callouts sit beside or below visuals, not inside them.
- Motion should feel like a breath, not a slot machine.

## 4. Color System

Base variables:

```css
--pl-bg: #F7F5EF;
--pl-bg-mist: #EAF3F4;
--pl-surface: rgba(255, 255, 255, 0.82);
--pl-surface-paper: #FFFDF8;
--pl-ink: #07124A;
--pl-ink-soft: #243052;
--pl-indigo: #121E72;
```

Glow variables:

```css
--pl-cyan: #35E6E2;
--pl-teal: #0FA8A4;
--pl-violet: #7A5CFF;
--pl-amber: #F2B85B;
--pl-sakura: #F5A6C8;
```

Semantic variables:

```css
--pl-success: #179A74;
--pl-caution: #C07A24;
--pl-risk: #B94A5A;
--pl-context: #35E6E2;
--pl-durable: #7A5CFF;
--pl-retrieved: #0FA8A4;
--pl-generated: #F2B85B;
```

Semantic use:

- Insight/correct: `--pl-success`
- Caution/misconception: `--pl-caution`
- Temporary context: `--pl-context`
- Durable weight change: `--pl-durable`
- Retrieved context: `--pl-retrieved`
- Generated response: `--pl-generated`

Glow should mark motion, computation, or active information flow. It must not be the only thing that carries meaning.

## 5. Typography

Prompt Life uses the existing system font stack.

Roles:

- Display heading: elegant, spacious, high-contrast.
- Section eyebrow: compact uppercase, teal/indigo.
- Body: readable, generous line-height.
- Microcopy: calm, never cramped.
- Callout labels: small but not tiny.
- Glossary chips: legible, not shouty.

Rules:

- No all-caps body prose.
- No huge headings that crowd mobile.
- Use `clamp()` for large titles.
- Minimum readable sizes at 320px.
- Body line height should feel calm, about 1.45-1.65.
- Letter spacing stays at `0`.

## 6. Shape Language

- Cards: paper panels with soft shadow and slight translucency.
- Lesson cards: layered paper sheets.
- Visual aids: neon diagram inside a paper frame.
- Chips: folded paper tabs.
- Callouts: small numbered paper seals.
- Bottom nav: floating glass/paper dock with mist gradient.
- Brain Bridge: two-panel folded note: "Helpful comparison" and "Where it breaks."
- Checkpoints: dojo practice card.
- Badge: enamel seal / academic crest / origami stamp.

## 7. Motion Language

- Slow glow pulse for active computation.
- Fold/unfold for reveal.
- Slide like paper shifting on a desk.
- Token movement like beads sliding on a string.
- No bouncy cartoon motion.
- Respect `prefers-reduced-motion`.

Motion should clarify state changes. It should never make reading harder.

## 8. 2D, CSS 3D, And Image-Asset Policy

Rules:

- SVG/HTML for precise teaching diagrams.
- CSS 3D only when rotation reveals structure.
- Generated images only as textless atmosphere or props.
- No instructional text baked into generated images.
- Codex should not depend on image generation.
- Text and callouts remain HTML/SVG controlled by the app.

Good CSS 3D candidates:

- Tensor cube
- Layer stack
- Feature cloud
- Vocabulary cloud
- Context tray

Poor 3D candidates:

- Hallucination
- Alignment
- Ethics
- Privacy
- Energy use

Those need clean diagrams, not rotatable spectacle.
