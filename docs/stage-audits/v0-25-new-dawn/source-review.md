# New Dawn Source Review v0.25

Date: 2026-06-07

This audit uses the existing source registry in `src/data/sourceRegistry.ts` and the v0.16 source review docs. It does not add new external sources or learner-facing citations.

## Benefits Worth Taking Seriously

Source review status: intentionally cautious.

Source ids:

- `oecd-ai-principles`
- `rome-call-ai-ethics`
- `source-needed-benefit-evidence`

| Claim | Current wording | Status | Recommended wording | Suggested source categories |
|---|---|---|---|---|
| Benefits are strongest with human judgment | "AI benefits are strongest when models amplify human judgment rather than replacing accountability." | Cautious enough | Keep. | OECD AI Principles; Rome Call; responsible AI frameworks |
| Demonstrated/common uses | "Demonstrated or commonly observed uses include accessibility support, translation, summarization, writing assistance, coding help, document search and RAG, and administrative drafting under human review." | Source needed before stronger claim | Keep the tier language. Avoid saying these benefits are universally proven. | Accessibility research; translation/summarization evaluations; coding assistance studies; RAG/document search studies |
| Plausible uses | "Plausible uses include supervised tutoring support, research triage, brainstorming, and scientific workflow support in well-designed settings." | Source needed | Keep "plausible" and "supervised/well-designed settings." | Education support with human review; research workflow support; evidence triage |
| Speculative claims | "Speculative claims need stronger evidence before they become promises." | Reviewed/cautious | Keep. | General evidence discipline |

## Human-Centered AI

Source review status: reviewed.

Source ids:

- `unesco-ai-ethics`
- `nist-ai-rmf-1-0`
- `laudato-si`
- `dignitas-infinita`
- `antiqua-et-nova`
- `rome-call-ai-ethics`
- `magnifica-humanitas`

| Claim | Current wording | Status | Recommended wording | Suggested source categories |
|---|---|---|---|---|
| Human-centered AI supports dignity and common good | "Human-centered AI asks whether a system supports dignity, learning, responsibility, creativity, relationships, and the common good." | Reviewed | Keep. | UNESCO ethics; NIST AI RMF; dignity/common-good sources |
| Technology should complement human intelligence | "Technology should complement, not replace, human intelligence." | Reviewed/cautious | Keep. Avoid implying every AI use threatens replacement. | UNESCO; Rome Call; Antiqua et nova |
| Model lacks moral understanding | "A model can produce moral language without moral understanding." | Reviewed | Keep. | AI ethics and model capability boundaries |
| Institutions remain responsible | "People, institutions, and communities remain responsible for AI decisions and deployments." | Reviewed | Keep. Add concrete examples only with source-aware framing. | NIST AI RMF; EU AI Act; UNESCO; institutional governance examples |

Notes:

- Keep Vatican/Catholic sources internal unless future learner-facing curriculum intentionally names them.
- Do not imply the model has wisdom, conscience, moral agency, or moral feeling.

## Better AI Is a Choice

Source review status: intentionally cautious.

Source ids:

- `nist-genai-profile`
- `iea-energy-and-ai`
- `eu-ai-act`
- `coe-ai-framework-convention`
- `ilo-genai-jobs-2025`

| Claim | Current wording | Status | Recommended wording | Suggested source categories |
|---|---|---|---|---|
| Costs are shaped by choices | "The costs are shaped by design, deployment, governance, and incentives." | Cautious enough | Keep. | NIST GenAI Profile; OECD; UNESCO |
| Technical mitigations | "smaller task-specific models, efficient inference, model distillation, better hardware use" | Source needed for specifics | Keep as examples; avoid guarantees. | Efficient inference; distillation; hardware utilization |
| Environmental mitigations | "lower-carbon electricity, water-aware siting and cooling" | Source needed for implementation claims | Keep cautious; do not quantify without sources. | IEA Energy and AI; data center energy/water reports |
| Data and creator practices | "transparent data provenance, licensing and creator compensation, opt-out and consent systems" | Source needed/jurisdiction-specific | Keep as choices; do not imply legal settlement. | Copyright office, data provenance, licensing, compensation, consent |
| Governance and labor | "human review for high-stakes use, institutional policy, labor transition planning, and independent evaluation" | Partly reviewed; labor needs care | Keep. Add context if expanded. | NIST; EU AI Act; ILO; institutional policy |
| Mitigations reduce but do not erase tradeoffs | "These choices can reduce some risks, but they do not erase every tradeoff." | Reviewed/cautious | Keep exactly or very close. | Risk management frameworks |

## Effective Prompting from Model Literacy

Source review status: reviewed.

Source ids:

- `nist-genai-profile`

| Claim | Current wording | Status | Recommended wording | Suggested source categories |
|---|---|---|---|---|
| Prompting shapes context | "Better prompts usually help by shaping the context window for the current run." | Reviewed/cautious | Keep. | Generative AI risk/profile docs; prompt/context mechanics |
| Prompting does not train weights | "Prompting is not magic wording and usually does not train the model." | Reviewed | Keep. | LLM inference/training distinction |
| Good prompt parts | "clear task, relevant context, constraints, examples, source or evidence requirements, uncertainty requests, output format, and human review" | Cautious enough | Keep. Consider adding "audience" only if space allows. | Prompting guidance; human review/evaluation frameworks |
| Prompting is not truth guarantee | Implied through feedback and review language | Reviewed/cautious | Keep explicit in feedback. | NIST GenAI Profile |

## Model Literate Synthesis

Source review status: intentionally cautious.

Source ids:

- `nist-ai-rmf-1-0`
- `unesco-ai-ethics`
- `iea-energy-and-ai`
- `ilo-genai-jobs-2025`

| Claim | Current wording | Status | Recommended wording | Suggested source categories |
|---|---|---|---|---|
| Training changes weights and inference uses weights | "training changes weights; inference uses weights" | Reviewed through curriculum mechanics | Keep. | Core model mechanics |
| RAG retrieves evidence into context | "RAG retrieves evidence into context" | Reviewed through Day Repeats/RAG work | Keep. | Retrieval/RAG mechanics |
| Hallucinations are plausible outputs without grounding | "hallucinations are plausible outputs without grounding" | Cautious enough | Keep with "can be" if expanded. | Risk and grounding sources |
| Benefits and costs are real and shaped by choices | "benefits can be real but are not magical; costs are real and shaped by choices" | Intentionally cautious | Keep. Avoid broad statistics or promises. | OECD; NIST; IEA; ILO |
| Humans remain responsible | "humans remain responsible" | Reviewed/cautious | Keep. | UNESCO; NIST; governance frameworks |

## Source Discipline Summary

- Do not add precise statistics in New Dawn without a scoped source.
- Keep benefits tiered: demonstrated/common, plausible with review, speculative.
- Keep mitigation language as "can reduce some risks," not "solves."
- Keep human-centered language broad and accessible.
- Keep source registry references internal unless a future learner-facing bibliography is intentionally designed.

## v0.25.2 Implementation Note

- The implementation pass did not add new external claims or precise statistics.
- Benefits wording now leans further into evidence tiers and human review.
- Human-Centered AI is made concrete through an accountability-flow scenario without implying model moral agency.
- Better AI remains framed as risk and cost reduction choices, not guaranteed solutions.
- Effective Prompting explicitly remains current-context design, not durable training.
- Model Literate Synthesis now names the mechanics chain and then returns to reviewed output and human accountability.
