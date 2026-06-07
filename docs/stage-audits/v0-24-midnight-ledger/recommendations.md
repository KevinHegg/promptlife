# Midnight Ledger Recommendations v0.24

Date: 2026-06-07

## Top Five Content Problems

1. Risk vs Myth still uses the slimmer lesson architecture. It lacks explicit `oneSentenceDefinition`, `coreExplanation`, `durableVsTemporary`, `promptVsResponseNote`, `misconception`, and richer feedback fields.
2. Prompt injection and tool risk are mentioned but not deeply taught. That is acceptable for now, but the Risk vs Myth interaction should make them concrete.
3. Collective Intelligence is cautious and humane, but it needs one more distinction among data provenance, consent, copyright, compensation, and uncertainty.
4. Costs We Must Count covers the right categories but risks feeling like a list unless the later implementation gives learners a clear ledger structure.
5. The stage does not yet explicitly bridge to New Dawn's responsibility frame at the end of Risk vs Myth.

## Top Five Visual/UI Problems

1. Costs We Must Count most needs a better visual. The current SVG repeats `Power`, crowds the answer node, and does not show enough ledger categories.
2. Collective Intelligence has a cramped/clipped central `Lantern` label at mobile width.
3. Risk vs Myth is readable but too generic; it does not tie risks to mechanisms.
4. Collective Intelligence and Costs We Must Count have mismatched tiny interactions.
5. Dense late-stage concepts need continued bottom-nav checks; current QA found no horizontal overflow, but the 320px Costs visual is cramped.

## Top Five Source-Review Problems

1. Collective Intelligence remains intentionally cautious and still needs stronger jurisdiction-aware sources before stronger claims about consent, licensing, attribution, or compensation.
2. Costs We Must Count is source-reviewed, but precise per-prompt environmental numbers should remain out of learner-facing copy.
3. Labor disruption and deskilling are mentioned in Costs but would need stronger labor/education sources before expansion.
4. Risk vs Myth has strong governance sources, but prompt injection/tool risk needs a more security-specific source path if expanded.
5. Claims about institutional governance should not imply that model literacy alone solves privacy, bias, procurement, or accountability.

## Cards Needing More Explanation

- Risk vs Myth: needs mechanism-specific explanations for privacy exposure, hallucination, bias, prompt injection, insecure tools, overreliance, vendor lock-in, and concentration of power.
- Collective Intelligence: needs a compact distinction between source, rights, return, and uncertainty.
- Costs We Must Count: needs a structured ledger so the list becomes memorable.

## Cards Needing Less Explanation

- Costs We Must Count should not become a policy encyclopedia or environmental statistics page.
- Collective Intelligence should not become a copyright law lesson.
- Risk vs Myth should not become a cybersecurity course.

## Cards Needing Better Visuals

- Costs We Must Count: highest priority.
- Risk vs Myth: medium priority.
- Collective Intelligence: medium priority for label repair and provenance/rights clarity.

## Cards Needing Tiny Interactions

- Collective Intelligence: replace generic feature cloud with a provenance/rights/value sort.
- Costs We Must Count: replace risk toggle with tappable ledger entries.
- Risk vs Myth: expand from one binary claim into a multi-item real-risk/myth sort.

## More Than One Checkpoint Or Exercise

Do not add more Journey checkpoints. The current single-checkpoint structure is enough. If more practice is needed, put it in Play or a later guided exercise, not in the Journey card.

## Cards That Should Remain Simple

- Risk vs Myth should remain short and practical.
- Collective Intelligence should stay morally serious but not legally exhaustive.
- Costs We Must Count should stay source-aware and should not include unsourced numbers.

## Redundancies To Remove

- Collective Intelligence should avoid repeating The Perfect Storm's whole convergence story. It should own data provenance, creators, rights, and attribution questions.
- Costs We Must Count should avoid repeating the benefits card. It should own accounting and stewardship.
- Risk vs Myth should avoid repeating Hallucinations and RAG; it should connect those earlier mechanics to institutional risk.

## Image 2 Textless PNG Candidates

1. Costs We Must Count: best Image 2 candidate. Use a textless midnight ledger / data-center footprint scene with energy, water, hardware, labor, land, and governance icons or forms. Keep all labels and claims in HTML.
2. Collective Intelligence, Extracted: possible later hybrid image candidate. Use textless human-created streams feeding a lantern/model scene, with provenance/consent/compensation tags overlaid in HTML.

Risk vs Myth should not use a generated PNG; it needs precise coded labels and mechanism sorting.

## Coded SVG Recommendations

- Risk vs Myth: coded split visual with two sides: real mechanism risks and myths/magic thinking. Add small mechanism tags such as context exposure, unsupported output, tool access, and over-trust.
- Prompt Injection / Tool Risk if expanded: coded SVG showing an untrusted document trying to override instructions, plus a tool-access gate.
- Collective Intelligence can remain coded SVG if the next pass prioritizes clarity over atmosphere.

## CSS 3D Recommendations

No CSS 3D is needed for v0.24. These concepts are civic/accountability concepts, not spatial structures. A 3D ledger or data center would risk spectacle over clarity.

## Current Visuals To Keep

- Keep Collective Intelligence's lantern metaphor, but repair the label and add provenance/rights affordances.
- Keep Risk vs Myth's split structure, but make it more mechanism-rich.
- Keep Costs We Must Count's "not weightless" idea, but rebuild the diagram.

## Specific Questions

1. Does Collective Intelligence, Extracted overclaim about data extraction?
   - Mostly no. The current copy is intentionally cautious. It says many cases are disputed, not that all data was stolen.
2. Does Costs We Must Count remain cautious and source-aware?
   - Yes. It avoids precise statistics and says impacts vary by model, workload, hardware, cooling, region, electricity source, and deployment.
3. Does Risk vs Myth distinguish mechanism risks from fantasy fears?
   - Partly. The copy does; the visual and interaction need to do more.
4. Does Prompt Injection / Tool Risk belong in Midnight Ledger or earlier near RAG/tools?
   - It belongs in Midnight Ledger as a risk example for now. A dedicated card should wait until the app teaches tool use more explicitly.
5. Which card most needs a better visual?
   - Costs We Must Count.
6. Which card most needs a tiny interaction?
   - Costs We Must Count, because the current interaction is not about hidden costs.
7. Are any cards too policy-heavy?
   - Not yet. Costs is close to becoming list-heavy but remains readable.
8. Are any cards out of order?
   - No. The current order is coherent: data/culture, infrastructure/cost, then risk literacy.
9. Which cards are Image 2 candidates?
   - Costs We Must Count first; Collective Intelligence second.
10. Does this stage prepare learners for New Dawn?
   - Yes, but Risk vs Myth should end with a clearer handoff: serious risks require human governance, not fear or magical thinking.

## Recommended Next Implementation Prompt

Implement a small v0.24.1 Midnight Ledger repair pass. Do not add Journey cards, games, generated PNG assets unless explicitly approved, heavy 3D libraries, dependencies, progress-rule changes, badge changes, Glossary Dojo changes, or checkpoint-randomization changes. Keep the Midnight Ledger order: Collective Intelligence, Extracted; Costs We Must Count; Risk vs Myth. Convert Risk vs Myth to the richer lesson schema. Repair the Collective Intelligence lantern label and replace its feature-cloud interaction with a provenance/rights/value sort. Rebuild Costs We Must Count as a clear ledger/infrastructure visual and replace its risk toggle with tappable cost entries. Upgrade Risk vs Myth to a mechanism-based coded split visual and a multi-item real-risk/myth sort. Keep all claims source-aware, avoid precise unsourced numbers, verify at 320px/390px/430px, and run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.

