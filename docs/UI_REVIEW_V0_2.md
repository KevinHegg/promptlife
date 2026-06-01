# UI Review v0.2

Date: 2026-05-31

## Scope

This review focused on making the existing MVP feel like a polished mobile-first learning app at 390px width. The pass did not rebuild the app or add new games.

## Screens Reviewed

- Home at 390px
- Journey map at 390px
- First lesson at 390px
- First lesson wrong and correct checkpoint states
- Glossary search and drawer
- Play screen
- Context Stack
- Attention Weave
- Token Pipeline Relay
- Badge progress screen

## Screenshot Evidence

- `docs/screenshots/v0-2-home-mobile.png`
- `docs/screenshots/v0-2-journey-mobile.png`
- `docs/screenshots/v0-2-lesson-checkpoint-mobile.png`
- `docs/screenshots/v0-2-glossary-drawer-mobile.png`
- `docs/screenshots/v0-2-play-mobile.png`
- `docs/screenshots/v0-2-context-stack-mobile.png`
- `docs/screenshots/v0-2-attention-weave-mobile.png`
- `docs/screenshots/v0-2-token-relay-mobile.png`
- `docs/screenshots/v0-2-badge-mobile.png`

## Mobile Layout Findings

- Bottom navigation now has the requested five destinations: Home, Journey, Play, Glossary, Badge.
- Navigation has safe-area-aware bottom spacing and all nav buttons remain at least 56px tall.
- The lesson continue action is sticky above the nav so it does not get trapped behind the bottom bar.
- Lesson pages now use progressive sections instead of a worksheet stack: hero, core idea, relationship, try it, checkpoint, reflection, continue.
- Repeated term chips were removed from every concept card and kept as one compact related-term row in the lesson hero.
- Touch targets were enlarged across chips, checkpoint answers, mini-game cards, game controls, and drawer controls.

## Lesson Polish

- Checkpoints use a reusable `Checkpoint` component.
- Wrong answers show specific corrective feedback and allow retry.
- The first lesson keeps the exact distinction between learned prediction systems and rule-based AI.
- Correct checkpoint state changes the action to `Next lesson` or `Finish and view badge`.
- Tiny interactions now include visible state changes and an `Insight unlocked` sentence.
- The first lesson feature cloud exposes syntax, style, facts, tone, math, risk, and meaning as tappable patterns and explains the distributed activation metaphor.

## Mini-Game Polish

- Context Stack now explains what fell out and why, then asks what the model lost when the older card left the window.
- Attention Weave now shows source-selection status and teaches that attention is relevance weighting, not consciousness.
- Token Pipeline Relay now makes operator modes visually distinct and states: `Same seed + same choices = same run.`

## Known Limitations

- The bottom nav is fixed, so long pages can visually pass behind it while scrolling. Final controls can still be scrolled fully above the nav.
- The mini-games are intentionally simple simulations, not exact transformer visualizations.
- Progress is local to the browser because the app uses `localStorage`.
