# Source Review Plan v0.13

Date: 2026-06-04

## Purpose

This plan identifies claims that need source review before Prompt Life v1 should be treated as publication-ready curriculum. v0.13 does not add precise external statistics to learner-facing UI; it uses cautious, mechanism-first language.

## High Priority Source Areas

| Area | Why it matters | Candidate source types | Current app handling |
|---|---|---|---|
| Training vs inference | Core privacy and memory distinction. | ML textbooks, model documentation, technical explainers from primary labs. | Mechanism stated without external statistics. |
| Fine-tuning and alignment | Learners need durable vs temporary clarity. | RLHF/preference optimization papers, NIST/OECD guidance, model-system docs. | Alignment language avoids moral-agency claims. |
| RAG and retrieval | RAG can be misunderstood as training or omniscient access. | RAG papers, retrieval system documentation, vector search docs. | Dedicated card says retrieval plus context, usually no weight change. |
| Grounding | Needs careful definition because grounding can fail. | AI system evaluation literature, retrieval-augmented generation references, tool-use docs. | New card says evidence connection, not truth guarantee. |
| Hallucinations | Avoid overclaiming and avoid implying intent. | Survey papers and reliability/evaluation literature. | New card frames hallucination as unsupported/fluent output. |
| Environmental footprint | Risk of misleading universal numbers. | Peer-reviewed data-center/AI energy studies, institutional sustainability reports, IEA, EPA, DOE, Grid-aware sources. | Current copy says impacts vary by system and workload. |
| Water use | Highly location-dependent. | Data center water studies, utility/regional reports, company sustainability reports. | Current copy avoids single per-prompt water claims. |
| Carbon and supply chain | Depends on electricity mix, hardware, utilization, and workload. | Peer-reviewed LCA studies, company sustainability reports, IEA/DOE. | Current copy stays qualitative. |
| Data provenance and copyright | Important for higher-ed and creators. | Copyright Office reports, court summaries from primary legal sources, licensing guidance, provenance standards. | Current copy names issues without legal conclusions. |
| Consent and compensation | Ethically important and contested. | Creator organization statements, policy reports, licensing standards, academic literature. | Current copy frames as questions rather than settled facts. |
| Labor and deskilling | Needs evidence and nuance. | Labor economics, education research, workplace studies, annotation-labor reporting. | Current copy avoids inevitability claims. |
| Human-centered AI | Needs interdisciplinary grounding. | NIST AI RMF, UNESCO AI ethics, OECD AI Principles, EU AI Act summaries, Vatican/Rome Call materials if desired. | Current copy centers dignity and accountability without citations. |
| Benefits and accessibility | Benefits should be bounded by task and review quality. | Accessibility research, translation/summarization studies, education pilots, healthcare/legal cautions. | Current copy separates demonstrated, plausible, and speculative benefits. |

## Source Review Checklist

- Prefer primary sources and peer-reviewed reviews when possible.
- Avoid single universal per-prompt environmental numbers.
- Separate training, inference, retrieval, tool use, and saved memory.
- Flag when claims are system-dependent, deployment-dependent, or policy-dependent.
- Make legal statements descriptive unless reviewed by qualified counsel.
- Keep learner-facing text concise and use source notes in curriculum docs, not dense in-app citations.
- Check that brain metaphors include explicit limits.
- Check that grounding, citation, and RAG language does not imply truth guarantee.

## Terms Requiring Source-Aware Review

- RAG
- Retrieval
- Grounding
- Citation
- Hallucination
- Vector search
- Alignment
- RLHF
- Human feedback learning
- Data provenance
- Copyright
- Consent
- Compensation
- Energy use
- Water use
- Carbon emissions
- Data center
- Labor disruption
- Deskilling
- Governance
- Responsible AI
- Human-centered AI

## v0.13 Decision

The v0.13 app may be used as a draft curriculum prototype. The mechanics path is ready for learner testing. Wider social, environmental, labor, legal, and governance claims remain source-review candidates before v1 publication.

