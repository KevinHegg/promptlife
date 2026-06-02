# How to Review Lesson Cards

## Route

Open:

```text
/review/lesson-cards
```

For print/export mode:

```text
/review/lesson-cards?print=1
```

The route renders one curriculum-review card per Journey lesson using current app data plus the inventory profile and rubric scores.

## Automated Export

Run:

```bash
npm run export:lesson-cards
```

Output:

```text
docs/content-inventory/prompt-life-lesson-cards-v0-6.pdf
```

This uses the existing Chrome-based PDF export script. No Playwright dependency was added.

## Manual Fallback

If Chrome is unavailable, run:

```bash
npm run dev
```

Then open the review route, use the browser print dialog, choose landscape orientation, and save as PDF. The print CSS is tuned for one cover page plus one page per lesson.

## QA Checklist

- The route loads without the mobile app shell or bottom navigation.
- One lesson begins per printed page.
- Each card includes stage, definition, explanation, relationship, metaphor, brain limit, prompt/response note, visual aid, current exercise, checkpoint, glossary terms, rewrite notes, and rubric scores.
- The PDF has a cover page plus one page for each Journey lesson.
