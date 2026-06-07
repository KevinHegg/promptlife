# Learner-Facing Copy Guardrails v0.21.1

Date: 2026-06-06

## Purpose

Prompt Life visual copy should teach the model concept, not describe how the visual was produced.

## Guardrails

- Internal asset-generation notes do not belong in Journey cards.
- Generated images are conceptual scenes. Learners only need the concept explanation.
- Terms like PNG, Image 2, generated asset, HTML callouts, Codex, file paths, metadata, overlays, and fallback illustrations belong in docs or internal review routes.
- Visual captions should explain the model mechanism, distinction, or misconception.
- Alt text and accessible descriptions should describe the visual and the concept, not the production process.
- Key takeaways should state the mental model learners should keep.

## Good Pattern

Use:

> Many examples flow through the training loop. Repeated updates shape weights into broad patterns the model can use later.

Avoid:

> A textless generated PNG is paired with HTML callouts.

## Review Route Exception

Internal review routes may show filenames, asset paths, visual type, text-handling notes, and print/PDF notes when the page is clearly for review or QA. That metadata should not appear in the normal learner Journey.
