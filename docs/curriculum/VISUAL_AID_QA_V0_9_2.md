# Visual Aid QA v0.9.2

Date: 2026-06-03

This checklist supersedes the v0.9 Batch 2 visual layout notes for the repair pass. Human review showed that automated overflow checks were not enough, so the contract is stricter now.

## Layout Rules

1. Visual canvases should contain mostly shapes, arrows, icons, short labels, and numbered callouts.
2. SVG labels should be one to three words whenever possible.
3. Full explanations belong in HTML captions and ordered callout legends below the SVG.
4. Labels that sit near busy shapes need a solid backing or a simple callout marker.
5. No prose sentences, rotated text, tiny labels, or decorative 3D in lesson visuals.
6. Diagrams should fit at 320px without horizontal scrolling.
7. Chips and pills should wrap gracefully.
8. Visuals must remain meaningful when exported to PDF, with no animation-only state.
9. Do not use color alone; pair color with position, label, shape, or callout text.
10. If a visual is hard to read, simplify it.

## Mobile Rules

- Check 320px, 390px, and 430px widths.
- Long user prompts must wrap inside their containers.
- SVG text must not clip at the canvas edges.
- Captions, Brain Bridge copy, feedback, and Continue controls must not be hidden behind the bottom nav.
- Lesson navigation should land at the top of the selected lesson.

## PDF Rules

- Review PDFs should use the same repaired visuals shown in the app.
- Captions must remain normal horizontal text.
- No letter-by-letter wrapping.
- No massive empty whitespace caused by fixed-height screenshot containers.
- The review route should expose enough visual detail for human review.

## Examples Fixed

- Training Loop: rebuilt as a clean five-step loop with `Update weights` marked as the durable-change step.
- Rationalists vs Empiricists: rebuilt as two panels with a short bridge.
- Overfitting and Generalization: moved curve explanations into the legend.
- Alignment: simplified the landscape and moved explanation into numbered callouts.
- Inference: shows context -> temporary states -> scores -> next token, with `weights fixed`.
- Prompt vs Response: uses a complete user prompt, response-so-far tokens, and next token `floor`.
- Tokenization: uses the canonical generated response and a real-tokenizer caveat.
- Token IDs: uses `dog -> 421`, `cat -> 982`, and `floor -> 1576`.
- Embeddings: shows ID -> embedding-table row -> vector bar.
- Vectors: uses simplified slider labels and a distributed-feature note.
- Tensors: uses a stable 2D `tokens x features` grid for PDF reliability.

## Remaining Known Risks

- The diagrams are intentionally simplified for first-pass literacy; publication review should add source citations before making expert-level claims.
- Static screenshots are useful for layout review, but real device testing remains important for iPhone Safari address-bar behavior and safe-area differences.
- The tensor diagram stays 2D in v0.9.2. A future 3D version should have a print-safe fallback before shipping.

## Manual Review Checklist

- Training Loop visual is aligned and readable.
- Prompt vs Response never treats the incomplete response-so-far as the user prompt.
- Tokenization, Token IDs, Embeddings, Vectors, and Tensors fit at mobile widths.
- No SVG text collides with arrows, nodes, or chips.
- No chips overflow.
- Review route and exported lesson-card PDFs show the repaired visuals.
- Prompt Run sampling uses `floor`, `room`, `tiles`, `counter`, `quantum`, and `elephant`.
- The app version shown on Badge is `v0.9.2`.
