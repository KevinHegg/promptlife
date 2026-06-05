# Glossary Ordering v0.14

Date: 2026-06-05

## Purpose

v0.14 makes the Glossary easier to navigate by adding two learner-facing sort modes:

- `A-Z`
- `Learning path`

`A-Z` is the default because it matches the way people usually approach a reference list: they arrive with a term in mind and want to find it quickly.

## Sort Modes

### A-Z

Learner-facing helper text:

> Find terms alphabetically.

Behavior:

- Terms are sorted alphabetically by display term.
- Search works within the current sort mode.
- Cards stay compact: term, definition, and relationship.
- The sort preference is not stored. Leaving/reloading/resetting returns the Glossary to `A-Z` intentionally.

### Learning Path

Learner-facing helper text:

> Learning path shows how the vocabulary builds from prompt to response.

Behavior:

- Terms are grouped by Journey section:
  - Before Morning
  - Prompt Arrives
  - Morning Commute
  - Workday
  - Decision Room
  - The Day Repeats
  - Wider AI Literacy
  - Related AI literacy terms
- Cards show `Introduced in: [lesson title]` when a first lesson is known.
- Terms are ordered by a curated learning sequence, then safely fall back to the first Journey lesson where the term appears.

## Metadata Strategy

The app derives glossary metadata at runtime from the Journey and a curated learning-order hint list:

- `firstLessonId`
- `firstLessonTitle`
- `journeyOrder`
- `pathLabel`

This keeps the glossary less fragile than hard-coding every field directly into every glossary object. If a lesson ID changes or a term cannot be mapped clearly, the term does not crash the app. It falls back to the end section:

> Related AI literacy terms

## Drawer Lesson Links

The glossary drawer now shows:

- definition
- relationship
- metaphor
- Brain Bridge, when present
- where it breaks, when present
- often confused with, when present
- related terms
- first introduced lesson, when available

If a lesson exists, the drawer shows:

> Open lesson

Behavior:

- Completed lessons open in Review mode.
- Incomplete or future lessons open in Preview mode.
- Opening from the glossary does not complete the lesson or alter progress.

## Search Behavior

- Search works in both sort modes.
- The selected sort mode remains active during search.
- The clear button resets the search query.
- Empty results show:

> No glossary terms match that search.

## Known Limitations

- Some terms are intentionally placed in `Related AI literacy terms` when they are useful references but do not clearly belong to one Journey card.
- Learning path order is curriculum-guided, not a claim that learners must memorize terms in that exact order.
- The Glossary sort preference is intentionally not stored in localStorage.
