# Source Review v0.16

Date: 2026-06-05

Scope: Midnight Ledger and New Dawn. This pass reviews and tightens the existing late-day Journey cards. It does not add new Journey cards, games, generated assets, 3D libraries, learner-facing PDFs, or curriculum expansion.

## Review Standard

- Supported: claim is broadly backed by sources in `SOURCE_REGISTRY_V0_16.md`.
- Intentionally cautious: learner-facing copy is deliberately bounded because the evidence is contested, fast-moving, or context-specific.
- Needs source: keep as internal placeholder or soft claim until stronger evidence is added.
- Too strong: revise now.
- Remove or soften: avoid learner-facing claim unless supported and scoped.

## Midnight Ledger

### Collective Intelligence, Extracted

Current key claims:
- Generative AI depends on patterns learned from human-created language, art, code, documents, research, and culture.
- Training data often raises provenance, consent, transparency, attribution, compensation, and copyright questions.
- The model is not humanity's mind and does not understand consent.

Source status:
- Supported: human-created digital culture shaped model capability.
- Intentionally cautious: consent, transparency, attribution, and compensation remain disputed.
- Too strong before v0.16: "Data collection often lacked meaningful consent, transparency, or compensation" was broader than current source review should present.

Recommended learner-facing wording:
- "Much training data came from human-created digital culture. In many cases, consent, transparency, attribution, and compensation remain disputed."

Source ids:
- `usco-ai-copyright`
- `source-needed-data-provenance`

Caveats:
- Do not claim all data was stolen.
- Do not claim every creator was uncompensated.
- Avoid company-specific or legal conclusions unless sourced and jurisdiction-scoped.

Update app copy now:
- Yes. v0.16 softened the core explanation and interaction copy.

### Costs We Must Count

Current key claims:
- AI systems have material infrastructure costs.
- Data centers, electricity, cooling, chips, networks, data pipelines, and human labor matter.
- Energy, water, carbon, land, hardware, privacy, labor, deskilling, and power concentration should be counted.
- Impacts vary by model, workload, hardware, cooling, region, electricity source, and deployment.

Source status:
- Supported: AI/data-center energy and infrastructure demand deserves accounting.
- Supported: environmental impacts vary by region, electricity source, workload, and infrastructure.
- Intentionally cautious: learner-facing copy avoids precise numbers.

Recommended learner-facing wording:
- "The answer feels weightless. The infrastructure is not. AI systems depend on data centers, electricity, cooling, chips, networks, data pipelines, and human labor."

Source ids:
- `iea-energy-and-ai`
- `unu-ai-environmental-cost`
- `ap-unu-environment-report`

Caveats:
- Do not use universal per-prompt water or energy numbers.
- Do not present climate-collapse claims or reassurance claims as settled.
- The UNU-INWEH source is new and useful for review, but learner-facing numbers should stay out until scoped.

Update app copy now:
- Yes. v0.16 revised cost wording and added environmental footprint / e-waste glossary terms.

### Risk vs Myth

Current key claims:
- Practical risks include privacy exposure, hallucinations, bias, prompt injection, insecure tool use, vendor lock-in, overreliance, and concentration of power.
- Myths arise when people treat the model as conscious, omniscient, or secretly self-training during ordinary inference.
- Model literacy helps, but governance and review are still needed.

Source status:
- Supported: mechanism-based risk framing aligns with NIST AI RMF and NIST Generative AI Profile.
- Supported: EU AI Act and other frameworks confirm that governance, transparency, and role-specific obligations matter.
- Remove or soften: avoid implying literacy alone solves risk.

Recommended learner-facing wording:
- "Clear mental models help institutions manage privacy exposure, hallucinations, bias, overreliance, tool security, vendor lock-in, and concentration of power without inventing magical threats."

Source ids:
- `nist-ai-rmf-1-0`
- `nist-genai-profile`
- `eu-ai-act`

Caveats:
- This is not a full security curriculum.
- Prompt injection / tool risk remains inside Risk vs Myth; no standalone card was added.

Update app copy now:
- Yes. v0.16 added mechanism-specific risks to the card copy.

### Prompt Injection / Tool Risk

Current key claims:
- No dedicated Journey card exists.
- Prompt injection appears inside Risk vs Myth and the glossary.

Source status:
- Needs source if expanded into a future standalone card.

Recommended learner-facing wording:
- Keep within Risk vs Myth for now: "prompt injection and insecure tools are real system risks."

Source ids:
- `nist-genai-profile`

Caveats:
- A future security pass could create a dedicated card, but v0.16 does not expand the curriculum.

Update app copy now:
- No new card. Existing Risk vs Myth wording was strengthened.

## New Dawn

### Benefits Worth Taking Seriously

Current key claims:
- AI benefits are strongest when models amplify human judgment rather than replacing accountability.
- Demonstrated or commonly observed uses include accessibility support, translation, summarization, writing assistance, coding help, document search/RAG, and administrative drafting under human review.
- Plausible uses include supervised tutoring, research triage, brainstorming, and scientific workflow support in well-designed settings.
- Speculative claims need stronger evidence.

Source status:
- Intentionally cautious: benefits are tiered and bounded.
- Needs source: domain-specific benefit evidence before stronger claims.
- Remove or soften: utopian or inevitable-benefit language.

Recommended learner-facing wording:
- "The strongest benefits appear when AI amplifies human judgment rather than replacing accountability."

Source ids:
- `oecd-ai-principles`
- `rome-call-ai-ethics`
- `source-needed-benefit-evidence`

Caveats:
- Do not claim AI will solve education, medicine, science, poverty, or creativity.
- Do not present all benefits as equally demonstrated.

Update app copy now:
- Yes. v0.16 added evidence-tier copy.

### Human-Centered AI

Current key claims:
- Human-centered AI asks whether a system supports dignity, learning, responsibility, creativity, relationships, and the common good.
- Human judgment remains central.
- A model can produce moral language without moral understanding.

Source status:
- Supported: dignity and human-centered governance are supported by UNESCO, NIST, and verified Vatican/Catholic sources.
- Intentionally cautious: learner-facing copy remains broadly human-centered and not Catholic-only.

Recommended learner-facing wording:
- "Human-centered AI asks whether a system supports dignity, learning, responsibility, creativity, relationships, and the common good."

Source ids:
- `unesco-ai-ethics`
- `nist-ai-rmf-1-0`
- `laudato-si`
- `dignitas-infinita`
- `antiqua-et-nova`
- `rome-call-ai-ethics`
- `magnifica-humanitas`

Caveats:
- Do not say the model has moral understanding.
- Do not make the learner-facing card Catholic-only.
- `Antiqua et nova` is verified as an official Vatican note, not an encyclical.
- `Magnifica Humanitas` is officially verified, but v0.16 keeps it internal-only.

Update app copy now:
- Yes. v0.16 tightened the definition and responsibility line.

### Better AI Is a Choice

Current key claims:
- AI costs are shaped by design, deployment, governance, and incentives.
- Mitigations include smaller task-specific models, efficient inference, distillation, better hardware use, lower-carbon electricity, water-aware siting and cooling, provenance, licensing, consent, privacy-preserving deployment, RAG, human review, institutional policy, labor transition planning, and independent evaluation.
- These choices reduce some risks but do not erase every tradeoff.

Source status:
- Supported: governance and risk management sources support the "choice" frame.
- Intentionally cautious: specific mitigations vary by context and need technical review.
- Too strong if phrased as "these choices solve everything."

Recommended learner-facing wording:
- "The costs are shaped by design, deployment, governance, and incentives. Better AI is not automatic; it is chosen."

Source ids:
- `nist-genai-profile`
- `iea-energy-and-ai`
- `eu-ai-act`
- `coe-ai-framework-convention`
- `ilo-genai-jobs-2025`

Caveats:
- Do not imply the model chooses ethics.
- Do not imply any mitigation is universal.

Update app copy now:
- Yes. v0.16 added the non-guarantee sentence.

### Effective Prompting from Model Literacy

Current key claims:
- Prompting shapes current context, not durable weights.
- Useful prompts include task, context, constraints, examples, evidence requirements, uncertainty, output format, and human review.
- Prompt Life is not a prompt-engineering app.

Source status:
- Supported by the app's mechanism path and generative-AI risk framing.
- Reviewed: no broader external claims were added.

Recommended learner-facing wording:
- "Prompting is not magic wording and usually does not train the model."

Source ids:
- `nist-genai-profile`

Caveats:
- Do not turn this into prompt-engineering curriculum.
- Do not imply better prompts guarantee truth.

Update app copy now:
- Yes, minor ordering and clarity edits.

### Model Literate Synthesis

Current key claims:
- Model literacy joins mechanics and human consequences.
- Benefits can be real but are not magical.
- Costs are real and shaped by choices.
- Humans remain responsible.

Source status:
- Intentionally cautious: synthesis summarizes earlier reviewed claims.
- Needs source: no new empirical claim should be introduced here.

Recommended learner-facing wording:
- "Benefits can be real but are not magical; costs are real and shaped by choices; humans remain responsible."

Source ids:
- `nist-ai-rmf-1-0`
- `unesco-ai-ethics`
- `iea-energy-and-ai`
- `ilo-genai-jobs-2025`

Caveats:
- Keep as capstone synthesis, not a policy encyclopedia.
- Avoid adding new unsupported claims in the final card.

Update app copy now:
- Yes. v0.16 softened "costs are real but not inevitable" to "costs are real and shaped by choices."

## Source-Needed Items Remaining

- Stronger, current, jurisdiction-aware evidence for data provenance, consent, attribution, licensing, and compensation.
- Domain-specific benefit evidence for accessibility, translation, summarization, tutoring support, research triage, administrative drafting, and scientific workflow support.
- Education/workplace evidence for deskilling, authentic learning, and labor transition impacts.
- Any future Prompt Injection / Tool Risk standalone card.
- Precise environmental statistics, if ever added to learner-facing copy, must be scoped by model, workload, region, electricity source, cooling, and reporting boundary.

## App-Copy Decision

v0.16 updates learner-facing copy now for the eight reviewed cards. It does not add citations to the Journey cards. Source status appears only on the internal `/review/lesson-cards` route.
