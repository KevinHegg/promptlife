# Accessibility QA

Date: 2026-05-31

## Keyboard Walkthrough

- Primary navigation uses real `button` elements.
- Lesson checkpoint answers use real `button` elements and expose selected state with `aria-pressed`.
- Glossary drawer opens as a modal `dialog`, focuses the Close button, supports Escape to close, and restores previous focus.
- Search input is labeled by visible text.
- Reflection fields are labeled for screen readers.
- Focus states are visible with a high-contrast outline.

## Mobile Checklist

- Reviewed at 390px by 844px in the in-app browser.
- Bottom navigation labels fit: Home, Journey, Play, Glossary, Badge.
- Main touch targets are 44px or larger.
- Lesson continue action stays above the bottom nav.
- Glossary drawer is bottom-sheet style with safe-area-aware padding.
- Mini-game controls are reachable and readable at 390px.

## Reduced-Motion Checklist

- Global reduced-motion media query disables long animations and transitions.
- Lesson auto-scroll switches to `auto` behavior when `prefers-reduced-motion: reduce` is active.
- Visual understanding does not depend on animation.
- Concept animations are user-stepped or button-driven rather than autoplay-only.
- Animation captions remain visible as static explanations.
- CSS-only motion is scoped to `prefers-reduced-motion: no-preference`.

## Semantic HTML

- Pages use `main`, `section`, `header`, and `nav`.
- Screens are labeled with heading IDs.
- Images include meaningful alt text when they teach or orient the user; decorative icons use empty alt text and `aria-hidden`.
- Mini-games use buttons for actions instead of clickable divs.

## Screen-Reader Feedback

- Checkpoint feedback uses `role="status"`.
- Game insight notices use `role="status"`.
- Context Stack fallen-card status uses `aria-live="polite"`.
- Micro-interaction output regions use live text where state changes are explanatory.

## Animation Checks

- `Trace One Prompt` has Back and Next buttons and a text sentence for every visual step.
- Animation wrappers include `aria-label` or group labels.
- Interactive animation controls are keyboard-reachable buttons.
- Static captions describe what motion would otherwise imply.
- No animation relies on color alone; labels, captions, or state text also communicate the concept.

## Known Limitations

- No automated axe audit is wired into the project yet.
- Focus trapping inside the glossary drawer is basic; Escape and focus restore work, but Tab can still reach browser chrome after the drawer controls.
- The app does not yet offer a full high-contrast theme toggle beyond the existing contrast improvements.
