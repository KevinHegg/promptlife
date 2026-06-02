# UI Copy Cleanup List v0.6

Scope: learner-visible copy that exposes implementation or design decisions. Debug-only copy behind ?debug=1 is inventoried but should remain available for diagnostics.

| Location | Current copy or pattern | Issue | Replacement direction |
|---|---|---|---|
| Badge > Start over | "Progress is stored only on this device." | Accurate, but implementation-facing if repeated too often. | "Your progress stays on this device." |
| Badge > Debug mode | "Visible in diagnostics mode. These tools only touch Prompt Life saved progress keys." | Debug-only. Keep behind ?debug=1. | No learner-facing replacement needed. |
| README | "localStorage" | Developer documentation, not learner UI. | Keep in docs; use "this browser" in app copy. |
| Docs and reports | "MVP" | Product-process language, not learner language. | Use "current version" or "first release." |
| Docs and reports | "noncompetitive" / "no leaderboard" / "no scores" | Design rationale, not a needed learner instruction. | Use "insight-based practice" or "progress and reflection." |
| Docs and reports | "exercise system" | Internal architecture language. | Use "practice activities." |
| Review routes | "rubric" and "rewrite priority" | Acceptable because review routes are authoring/audit tools, not learner screens. | Keep on /review routes only. |
| Mini-game insight language | "Insight unlocked" | Learner-facing and aligned with product tone. | Keep. |

Search result: the production learner UI does not currently show leaderboard, score, MVP, or no-score language. The main cleanup item is to keep implementation terms confined to README, docs, review routes, and ?debug=1 diagnostics.
