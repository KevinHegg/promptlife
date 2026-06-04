# Visual Aid System v0.9.3

Date: 2026-06-03

This system reset makes visual aids simpler, more reviewable, and safer for mobile and PDF export. The diagram should show structure; HTML callouts should teach meaning.

## Component Pattern

Visual aids now follow this reusable pattern:

1. `VisualAidCard`: learner-facing title, optional subtitle, diagram, callouts, key takeaway, and accessible description.
2. `DiagramScene`: simple SVG/CSS scene with shapes, arrows, icons, and short labels only.
3. `CalloutList`: numbered items with a short heading and one-sentence explanation.
4. `KeyTakeaway`: one learner-facing sentence that names the mental model.

## Design Rules

1. No prose inside diagrams.
2. SVG text is limited to one to three words.
3. Long explanations belong in HTML callouts.
4. Every visual has one learning objective.
5. Every visual has an accessible text description.
6. Every visual must fit at 320px width.
7. Every visual must be readable in PDF export.
8. No label should collide with an arrow, node, or border.
9. No visual should require the learner to decode a dense infographic.
10. 3D is used only when rotation reveals structure.
11. RAG, alignment, hallucination, ethics, and privacy usually do not need 3D.
12. Tensors, layer stacks, feature clouds, and vocabulary clouds may benefit from light 3D if they have print-safe fallbacks.

## Gold-Standard Example

`rag-retrieval` is the v0.9.3 gold-standard visual:

- One objective: show that RAG is retrieval plus context, not training.
- Five short in-diagram labels: Prompt, Retriever, Notes, Context, Response.
- Five numbered callouts: Ask, Retrieve, Add to context, Generate, Weights stay fixed.
- One key takeaway: RAG is retrieval plus context, not training.
- Accessible description included in the visual-aid metadata.

## Mobile And PDF QA

- Review at 320px, 390px, and 430px.
- Check both Journey lesson views and `/review/visual-aids`.
- Export the lesson-card PDF after visual changes.
- Use screenshots for human review because automated overflow checks do not catch awkward composition.
- If a label feels cramped, shorten the label or move explanation into the callout list.

## Not In Scope For v0.9.3

- No new games.
- No Three.js or heavy 3D libraries.
- No Batch 3 lessons.
- No dense poster-style visual pages.
