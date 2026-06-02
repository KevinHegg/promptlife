# Accessibility QA

Date: 2026-06-02

## Keyboard Walkthrough

- Primary navigation uses real `button` elements.
- Lesson checkpoint answers use real `button` elements and expose selected state with `aria-pressed`.
- Prompt Run uses the reusable exercise shell with button-based tap, match, order, label, connect, and reveal controls.
- Drag-like Prompt Run tasks have tap/button fallbacks through Up/Down and tap-to-match controls.
- Glossary drawer opens as a modal `dialog`, focuses the Close button, supports Escape to close, and restores previous focus.
- Search input is labeled by visible text.
- Reflection fields are labeled for screen readers.
- Focus states are visible with a high-contrast outline.

## Mobile Checklist

- Reviewed at 390px by 844px in the in-app browser.
- Bottom navigation labels fit: Home, Journey, Play, Glossary, Badge.
- Main touch targets are 44px or larger.
- App content now scrolls inside a fixed mobile shell, so browser chrome changes are less likely to trap the bottom nav.
- Lesson continue action can scroll above the bottom nav.
- Glossary drawer is bottom-sheet style with safe-area-aware padding.
- Mini-game controls are reachable and readable at 390px.
- Prompt Run and Play screens have extra safe-area-aware bottom padding so feedback, hints, and final controls can scroll above the fixed bottom nav.
- v0.6 needs real iPhone Safari and Chrome confirmation after deployment; the in-app browser is useful but not a full Mobile Safari substitute.

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
- Game screens now pass IDs to their visible `h1` headings so `aria-labelledby` targets exist.
- Review routes use a standalone `main` without app chrome for cleaner printing.

## Screen-Reader Feedback

- Checkpoint feedback uses `role="status"`.
- Exercise feedback uses `aria-live="polite"` and scrolls into view after Check or Show me.
- Game insight notices use `role="status"`.
- Context Stack fallen-card status uses `aria-live="polite"`.
- Micro-interaction output regions use live text where state changes are explanatory.

## Animation Checks

- `Prompt Run` has Back and Continue buttons, visible hints, reveal, feedback, and a text explanation for every visual step.
- Animation wrappers include `aria-label` or group labels.
- Interactive animation controls are keyboard-reachable buttons.
- Static captions describe what motion would otherwise imply.
- No animation relies on color alone; labels, captions, or state text also communicate the concept.
- v0.6 visual aids are static SVG/CSS diagrams with surrounding HTML captions.

## v0.5 Prompt Run Checks

- Continue is disabled until a correct action or reveal.
- Hints are optional and do not penalize progress.
- Wrong feedback names the misconception when practical.
- Attention and connect tasks use real buttons and text readouts.
- The final order challenge uses Up/Down buttons rather than pointer-only drag.

## Known Limitations

- No automated axe audit is wired into the project yet.
- Focus trapping inside the glossary drawer is basic; Escape and focus restore work, but Tab can still reach browser chrome after the drawer controls.
- The app does not yet offer a full high-contrast theme toggle beyond the existing contrast improvements.
- Real iPhone Safari QA remains a manual deployment follow-up.
