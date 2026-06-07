# Midnight Ledger Source Review v0.24

Date: 2026-06-07

## Source Discipline Rule

Use cautious general language unless a claim is already source-reviewed. Do not add precise environmental, labor, copyright, water, energy, or governance statistics to learner-facing copy without scoped source review.

## Collective Intelligence, Extracted

| Claim | Current wording | Source status | Recommended wording | Suggested source categories | Source ids |
| --- | --- | --- | --- | --- | --- |
| GenAI depends on human-created expression | "Generative AI depends on patterns learned from human-created language, art, code, documents, research, and culture." | Cautious enough | Keep. | Data documentation, model training reports, copyright/provenance reviews | `usco-ai-copyright`, `source-needed-data-provenance` |
| Training data came from human-created digital culture | "Much training data came from human-created digital culture." | Cautious enough | Keep "much"; avoid "all." | Data provenance, training data transparency | `source-needed-data-provenance` |
| Consent/transparency/attribution/compensation remain disputed | "In many cases, consent, transparency, attribution, and compensation remain disputed." | Source needed / intentionally cautious | Keep contested wording; do not state legal conclusion. | Copyright Office, licensing, court records, provenance standards | `usco-ai-copyright`, `source-needed-data-provenance` |
| The model is not humanity's mind | "The model is not humanity's mind; it is trained on human-made traces." | Cautious enough | Keep. | AI mechanism literacy, ethics frameworks | Internal mechanism path |

Recommendation: keep current learner-facing copy for now. Future implementation should better separate provenance, consent, copyright, compensation, and uncertainty without making legal claims.

## Costs We Must Count

| Claim | Current wording | Source status | Recommended wording | Suggested source categories | Source ids |
| --- | --- | --- | --- | --- | --- |
| AI depends on physical infrastructure | "AI systems depend on data centers, electricity, cooling, chips, networks, data pipelines, and human labor." | Reviewed | Keep. | IEA, DOE/data-center reports, infrastructure reports | `iea-energy-and-ai`, `unu-ai-environmental-cost` |
| Costs include energy, water, carbon, land, hardware, e-waste | Listed in core explanation | Reviewed but keep broad | Keep broad categories; avoid precise numbers. | IEA, UNU-INWEH, DOE, lifecycle/hardware reports | `iea-energy-and-ai`, `unu-ai-environmental-cost`, `ap-unu-environment-report` |
| Costs vary by model/workload/hardware/region/cooling/source | Explicit current wording | Reviewed | Keep. This is the strongest source-discipline line. | IEA and environmental impact reports | `iea-energy-and-ai`, `unu-ai-environmental-cost` |
| Labor disruption and deskilling matter | Listed in core explanation and glossary | Source needed if expanded | Keep as broad risk; source before stronger education/workplace claims. | ILO, OECD, education studies | `ilo-genai-jobs-2025`, `oecd-local-jobs-genai`, `source-needed-deskilling-education` |
| Costs prove benefits are impossible | Rejected by checkpoint | Cautious enough | Keep rejection. | Responsible AI frameworks | `oecd-ai-principles`, `nist-ai-rmf-1-0` |

Recommendation: source status is strong for cautious draft copy. The next pass should improve structure and visuals, not add statistics.

## Risk vs Myth

| Claim | Current wording | Source status | Recommended wording | Suggested source categories | Source ids |
| --- | --- | --- | --- | --- | --- |
| Practical risks include privacy exposure, hallucination, bias, overreliance, tool security, vendor lock-in, and concentration of power | Current `why` line | Reviewed as broad risk framing | Keep but tie each risk to a mechanism in the card. | NIST AI RMF, NIST GenAI Profile, EU AI Act, OECD | `nist-ai-rmf-1-0`, `nist-genai-profile`, `eu-ai-act` |
| Ordinary inference does not secretly train the model | Current relationship line | Cautious enough | Keep; connects to mechanics path. | Internal mechanics path | Internal source path |
| Model becoming conscious is a myth in this context | Quiz distractor and Brain Bridge limit | Cautious enough | Keep as myth framing; avoid metaphysical overreach. | Mechanism explanations, ethics sources | Internal mechanism path |
| Prompt injection and insecure tools are real risks | Interaction copy | Reviewed broadly, source needed if expanded | Keep as example; cite GenAI risk profile if expanded. | NIST GenAI Profile, security guidance | `nist-genai-profile` |

Recommendation: convert Risk vs Myth to rich schema and add mechanism-specific feedback. Do not make it a full cybersecurity lesson.

## Prompt Injection / Tool Risk

Current status: no dedicated Journey card.

| Claim | Current wording | Source status | Recommended wording | Suggested source categories | Source ids |
| --- | --- | --- | --- | --- | --- |
| Prompt injection is a real risk | Mentioned in Risk vs Myth and glossary | Source needed if expanded | "Malicious or conflicting text can try to override intended instructions, especially when tools are connected." | NIST GenAI Profile, OWASP-style app security sources if added later | `nist-genai-profile` |
| Tool access raises stakes | Implied by "insecure tools" | Source needed if expanded | "Tool access can raise stakes because a model output may trigger external actions." | Security frameworks, tool-use safety docs | `nist-genai-profile` |

Recommendation: keep inside Risk vs Myth for now. Add a standalone card only if the product introduces tools as a larger topic.

## Source Priorities For Next Pass

1. Add stronger, current sources for data provenance, consent, licensing, attribution, and compensation.
2. Keep Costs We Must Count source-reviewed but avoid numeric claims.
3. Add prompt-injection/tool-risk source categories if the risk interaction expands.
4. Add labor/deskilling education sources before making stronger higher-ed impact claims.
5. Keep governance and human accountability framed through NIST, UNESCO/OECD/EU, and human-centered ethics sources.

