# Prompt Life v0.15.1 Navigation Fix

Date: 2026-06-05

## Issue

The Journey bottom-nav button could leave the learner at the current Journey scroll position if Journey was already active. That made the button feel unreliable as a return-to-overview action.

## Fix

- Added a one-shot Journey top request for primary navigation.
- Routed the Home Journey action and the bottom Journey nav item through that request.
- Added shared helpers:
  - `scrollAppToTop()`
  - `scrollJourneyToTop()`
- Kept section-stage buttons on their existing `scrollToJourneySection()` path.
- Kept lesson-card Return to Journey on its section-return path.
- Preserved reduced-motion behavior by using instant scrolling when the learner requests reduced motion.
- Moved focus to the Journey heading after Journey-nav scrolling.

## QA Steps

- Home to Journey opens Journey at the top.
- Journey scrolled down, then Journey bottom nav returns to top.
- Journey stage links still jump to Midnight Ledger and New Dawn.
- Journey bottom nav after a stage jump returns to top, not the previous section.
- Preview and Review cards return to Journey top through the bottom nav without changing progress.
- Learn mode returns to Journey top through the bottom nav without falsely completing a lesson.
- Play to Journey opens Journey at the top.
- Glossary drawer Open lesson to Preview or Review, then Journey bottom nav returns to top.
- 320px and 390px mobile widths retain the eight-stage layout without horizontal overflow.

## Known Limitations

- The lesson card's own Return to Journey button intentionally still returns near the lesson's section. That behavior is separate from the primary Journey nav action.
- The build still reports the existing single JavaScript chunk size warning.
