# Prompt Life: review and redesign proposal

Reviewed September 11, 2026. Repository: KevinHegg/promptlife, commit `35dfd58`, app version `0.28.12`.

## Recommendation

Rebuild Prompt Life as an interactive book with a laboratory: a sustained, approachable explanation of how language models work, followed through into the applications people actually use. Preserve the ambition and useful distinctions in the existing curriculum. Replace the phone-shaped presentation, repetitive lesson template, and completion-driven structure.

The intended reader is an interested adult with patience, curiosity, and no assumed programming or linear-algebra background. Respecting that reader means explaining difficult ideas carefully, not avoiding them or stretching short definitions across many cards.

The defining outcome should be: **“I can explain what happened, predict what will change, and investigate why an AI answer failed.”**

## What I reviewed and verified

- Cloned the repository into the previously empty local workspace and inspected the curriculum, application shell, exercise implementations, source registry, styling, build configuration, deployment workflow, and selected audit scripts.
- Viewed the deployed home page, all 39 lesson titles and their organization, the first lesson, RAG lesson, practice catalog, Probability Picker, and badge page. Inspected the desktop rendering and accessibility tree; this was not a complete mobile, keyboard, or screen-reader audit.
- Confirmed the deployed app reports version 0.28.12, matching the source.
- Installed locked dependencies with lifecycle scripts disabled. Type checking, production build, and the answer/checkpoint audit passed.
- The build emitted one JavaScript bundle of 1,078.42 kB minified / 262.25 kB gzip, and CSS of 151.39 kB / 29.10 kB gzip. Those figures exclude image downloads and are not measured load times.
- Dependency audit reported two high-severity vulnerable packages, `nanoid` and `postcss`, both transitive. This requires dependency maintenance and applicability review; it does not establish an exploitable flaw in the deployed static site.
- Ask the Record at `https://asktherecord.fly.dev` failed DNS resolution in the browser. Its implementation was not reviewed. The document-question-answering proposal below is inspired by the user's description of learning through building it, not a claim about that application's internals.

Application source was not changed as part of this review.

## What is worth keeping

The curriculum repeatedly makes several valuable distinctions: training changes weights while ordinary inference uses them; prompt context is different from generated output; retrieval adds information to context; probabilities do not guarantee truth; and metaphors have limits. These are foundations worth retaining.

The glossary, local progress, explanatory feedback, reusable exercise components, and explicit attention to accessible HTML and reduced motion are useful assets. Prompt Run supplies the beginnings of a cumulative model of generation. The source registry and review tooling show a concern for accuracy that should become a simpler, more systematic editorial process.

This is not a case where changing frameworks will solve the educational problem. The current React/Vite foundation can support the proposed experience.

## Where the current experience falls short

### 1. The structure teaches a vocabulary itinerary before giving the reader a compelling problem

The path has 39 lessons across eight metaphorical stages. “Rationalists vs Empiricists” appears third; practical prompting arrives thirty-eighth. A motivated newcomer has to wait a long time to connect the mechanics to the behavior that brought them here.

The day metaphor becomes strained as it expands to “Twilight,” “Midnight Ledger,” and “New Dawn.” Those labels require interpretation before they help navigation. A prompt also does not pass through pretraining: training happened earlier. The content acknowledges this, but the overarching journey language still adds avoidable ambiguity.

Open with an interesting failure and a useful overview of the complete system. Then revisit the same system at increasing depth. Keep historical and philosophical material as thoughtful essays or optional interludes.

### 2. The pages are long without offering enough sustained explanation

The first lesson contains a definition, visual aid and legend, glossary chips, core idea, lifecycle label, location, durability, prompt/response note, misconception, connection, metaphor, Brain Bridge, interaction, reflection, and checkpoints. Several restate closely related points.

The cognitive work becomes navigating the template. For a reader with a long attention span, a coherent explanation can be more satisfying than a series of small panels. Consistency should come from the learning rhythm and visual language, not mandatory fields on every page.

### 3. Many interactions reveal labels rather than expose causes

The RAG interaction advances through Prompt, Retriever, Notes, Context tray, and Response. That teaches sequence, but it cannot demonstrate retrieval failure, irrelevant evidence, conflicting documents, or a citation that fails to support a claim.

The probability activity has more potential, but much of its data is authored as fixed tables. The next version should ask learners to make a prediction, change a meaningful variable, inspect the consequence, and explain what happened.

### 4. Assessments can overestimate understanding

There are 136 active checkpoint questions. The automated audit describes them as application/mechanism questions, and some have useful scenarios. However, the visible RAG question contrasts the correct answer with options such as the model becoming conscious of campus files. A learner can reject those alternatives without understanding retrieval.

Use plausible competing explanations: missing retrieval, a bad passage boundary, stale evidence, an unsupported inference, or a mistaken instruction. Include unfamiliar cases and explanation prompts with model answers or rubrics. Distinguish completing an activity from independently demonstrating understanding.

Sequential progress also puts later lessons into preview mode. A reader can inspect RAG, but the app does not treat that as their current learning path. Allow adults to enter anywhere, with helpful prerequisite links and optional checks.

### 5. The visual presentation works against the subject

The shell is capped at 480 pixels even on desktop. The result is a narrow internal scrolling area with a floating bottom navigation bar. Large illustrations, stage buttons, and oversized headings can occupy most of the first viewport before the explanation starts.

The glowing cloud art suggests mystery without showing a mechanism. Repeated framed panels give secondary labels almost as much prominence as the actual idea. Desktop space should support comparisons, readable diagrams, and simultaneous access to explanation and experiment.

The Badge tab currently leads to an under-construction credential and human-review dashboard. Remove it from primary navigation. Preserve useful learning history in a notebook; a badge is not needed to give this audience purpose.

## Content accuracy and depth

Two concrete issues should be corrected before another learner test:

1. **Probability Picker does not calculate its displayed probabilities from its displayed logits.** In `src/main.tsx`, the first round pairs scores `5.8, 2.1, -1.2, -2.0` with probabilities `72%, 18%, 6%, 4%`. Softmax at temperature 1 over those four candidates produces approximately `97.46%, 2.41%, 0.09%, 0.04%`. No alternative transformation is explained. Compute the distribution from one source of truth and expose temperature explicitly.
2. **The attention lesson overstates mutual visibility.** `src/data/content.ts` says prompt tokens, retrieved context, and response-so-far tokens “can all attend to one another” if inside context. For the causal decoder being taught, a position can attend to itself and earlier permitted positions, not later positions. Teach this boundary with a mask or visible unavailable cells.

The tokenization lesson does explicitly label its word-like cards as simplified. Keep that honesty, but add a real tokenizer with a named model/tokenizer and examples involving whitespace, punctuation, unusual words, and non-English text. Hand-authored IDs should remain visibly illustrative.

Additional editorial priorities:

- Separate the **model** from the **application around the model**: instructions, conversation assembly, retrieval, external storage, tools, moderation, and interface behavior.
- Teach weights versus activations with one concrete numerical example. “Feature reshaping” needs an explanation of what changes, how, and why that matters.
- Give positional information, causal attention, query/key/value operations, and the role of the MLP a connected optional numerical treatment. Do not present an attention diagram as a complete explanation of why the model answered.
- Distinguish token embeddings from embeddings used to retrieve passages. This is especially valuable in document-based applications.
- Distinguish pretraining, supervised fine-tuning, preference/reward-based post-training, and in-context examples through tasks where their effects differ.
- Explain app memory, context assembly, truncation and summarization policies, and retrieval. A fixed context limit does not imply every product simply drops the oldest message.
- Add substantive treatment of tool use, agent loops, prompt injection through retrieved material, evaluation, and reasoning-model behavior. Tool use and injection already appear among the existing concepts; they need more than passing treatment.
- Scope the central story to typical autoregressive text generation. Avoid making every statement a universal claim about every LLM architecture or inference implementation. Caching and optimized decoding belong in a later technical note.
- Keep ethical and environmental discussion, while distinguishing observed evidence, uncertainty, and normative positions. Date variable claims and make citations visible to learners. The existing source mapping concentrates on later social/ethical lessons and appears in review tooling; mechanism lessons also need accessible sources.
- Reduce recurring assertions about consciousness as assessment distractors. Explain the observable computation and distinguish it from human capacities without requiring metaphysical conclusions to understand a mechanism.

## A proposed curriculum

Use eight question-led chapters, with multiple connected sections inside each. The 39 existing lessons become source material rather than mandatory units.

| Chapter | Central question | Experiment / evidence of learning |
|---|---|---|
| 1. An answer appears | What actually happened after I pressed Send? | Trace a question, context, model call, and output; identify what is still unexplained. |
| 2. Predicting the next piece | How can repeated prediction produce a paragraph? | Tokenize actual text; adjust logits and temperature; sample repeatedly and compare outcomes. |
| 3. Where the ability comes from | How does training create something useful? | Train a tiny, clearly labeled model; compare training and held-out errors, then freeze weights and change context. |
| 4. Inside a transformer | How do numbers acquire context? | Follow a token representation through positional information, masked attention, an MLP, and output scores. |
| 5. A model becomes an assistant | Why does it follow instructions, and why does conversation sometimes fail? | Compare base/instruction-tuned examples; inspect instructions, history, context limits, and app memory. |
| 6. Answers from evidence | How does an assistant answer about documents it was not trained on? | Inspect passage selection, retrieval embeddings, supplied context, claims, and citations; diagnose failures. |
| 7. From answers to actions | What changes when the model can use tools? | Trace a bounded tool loop, inspect a failed call or malicious document instruction, and choose the appropriate boundary. |
| 8. Judging the system | When is it useful, reliable enough, or inappropriate? | Evaluate an unseen set of tasks; weigh evidence, failure costs, privacy, labor, and resource tradeoffs. |

Each chapter offers a complete main explanation, optional deeper mechanics, and sources. “Optional” should mean additional depth, not facts required to understand the primary lesson. Historical context, diffusion, and the broader multimodal landscape can be linked essays until the core course is excellent.

Practical prompting should appear early, then become progressively better informed. Do not promise that a clever prompt solves missing evidence, access restrictions, or model limitations.

## The distinctive experience: an inspectable document assistant

Use a small, public or purpose-written document collection as a recurring case study inspired by the user's learning through Ask the Record. Keep a simpler sentence example for token mechanics; do not force archival questions into every diagram.

The document assistant should have an “Inspect this answer” view showing:

1. The exact user question and application instructions.
2. The passages retrieved, including their source and location.
3. The context actually supplied to the model, with omitted material visible separately.
4. The generated answer, broken into claims.
5. Which passage supports each claim, or that support is missing.
6. A reproducible change the learner can make and compare.

Start with a question whose answer is in a short document. Then remove the relevant passage, substitute a similarly named person, supply contradictory dates, or ask a question the collection cannot answer. Let the learner diagnose the failure before revealing the explanation.

This is a teaching proposal, not a requirement to connect Prompt Life to private Ask the Record data or reuse its production backend.

### Example chapter opening: Why did the assistant get this wrong?

Present two answers to the same question, each fluent and carrying a citation. Ask which one is supported by the supplied record. Open the passages side by side. One citation refers to the wrong person with the same surname.

Next, let the learner switch the retrieved passage and compare two recorded runs. Only then introduce the terms retrieval and grounding. Reveal the actual context and show that the model did not receive the entire archive.

Finish with an unfamiliar case where the right passage was retrieved but the answer changes a date. The learner must distinguish a retrieval failure from an unsupported generated claim. Success means explaining the difference, not recognizing the term RAG.

## Interaction and UI principles

Use the rhythm **question → prediction → experiment → explanation → transfer**. A section need not use all five stages, but each major concept needs a meaningful way to apply it.

- Desktop: compact contents sidebar, comfortable reading column, and a larger laboratory surface where comparison helps. Let wide diagrams span available space. Avoid permanently squeezing every page into three columns.
- Mobile: the same complete course in a natural document flow, with collapsible contents and experiments that fit or have an accessible alternative. Ordinary scrolling should not require a simulated phone frame.
- Typography: readable prose with a restrained heading hierarchy; roughly 65–75 characters per text line as a starting point to test.
- Navigation: Course, Experiments, Reference, Notebook. Make Resume the prominent returning action. Give every chapter, section, experiment, and important state a shareable URL.
- Visuals: use a consistent palette to distinguish text/context, learned parameters, temporary states, and probabilities. Prefer inspectable diagrams to decorative cloud imagery. Labels and shapes must carry meaning without relying only on color.
- Learning controls: Predict, Run, Compare, Reset, Explain. Avoid requiring interaction merely to reveal essential prose.
- Notebook: saved explanations, experiment settings, bookmarks, and “ideas to revisit,” with export/import and clear storage expectations.
- Accessibility: keyboard-operable labs, visible focus, reduced-motion behavior, readable contrast, and equivalent text/tables for diagrams. Inspect sticky elements and zoom rather than assuming a semantic DOM is sufficient.

## What to ship, what to defer

**Ship first:** strong chapters, embedded experiments, glossary in context, direct links, resume, useful feedback, and an exportable notebook.

**Develop after the core works:** cross-chapter challenges, spaced review based on actual misconceptions, instructor discussion notes, and optional downloadable reading material.

**Defer:** badges, certificates, streaks, leaderboards, accounts, social features, an open-ended AI tutor, arbitrary document uploads, and broad live-model comparisons. None is necessary to prove the educational proposition.

An eventual tutor should be optional and tied to authored material. It should not be the sole judge of correctness or a dependency for completing the course.

## Architecture and stack

Keep React, TypeScript, and Vite for the first redesign. A framework migration would consume attention before the learning design has been validated. Static hosting remains appropriate for authored lessons, client-side experiments, and recorded examples; Vite documents this deployment pattern for GitHub Pages.

Refactor along clear boundaries:

```text
content/       Chapters, glossary, source records, prerequisites
curriculum/    Content schema, validation, learning objectives
labs/          Pure calculations and simulations, plus their React views
components/    Reading, navigation, diagrams, feedback
progress/      Versioned local persistence and notebook import/export
routes/        Addressable chapters and experiments
review/        Author-only inspection and export tooling
```

Content can use Markdown/MDX with typed metadata and an approved set of interactive components. Keep calculations out of prose files. Validate chapter references, source references, experiment IDs, and prerequisite relationships at build time.

Use three explicitly identified experiment modes:

- **Calculated toy model:** small, transparent, mathematically consistent, runs locally. Good for softmax, masking, and a tiny training loop.
- **Recorded model run:** stable, inspectable examples with model identity, date, settings, inputs, outputs, and provenance. The controls must make clear when a learner is selecting a recording rather than running a model.
- **Live model run:** optional later extension with a server-held API key, bounded requests, rate limits, and cost controls. Never embed provider secrets in the static client.

The first release should work with the first two modes. A backend becomes justified by live inference or account synchronization, not by the existence of interactive diagrams. If long-form content publishing later dominates, evaluate a static content framework using a representative chapter rather than committing to a migration now.

### Specific engineering cleanup

- `src/main.tsx` is 6,427 lines and combines application navigation, screens, activities, storage, and review views. Extract by responsibility.
- `src/styles/global.css` is 9,884 lines. Replace accumulated overrides with a small, documented set of tokens and component styles.
- `src/data/content.ts` is 2,289 lines and duplicates fields such as definition/oneSentenceDefinition, where/whereItHappens, and relationship/howItConnects. Use one schema and migrate once.
- Seven versioned checkpoint-bank files remain in source. Consolidate the active bank after checking references; preserve historical versions in Git or a deliberate archive. Do not assume all seven are shipped to learners: only the current one is directly imported by the main app.
- Split large labs and review tools into separately loaded modules; measure results. Do not treat bundle size alone as a user-experience score.
- Replace broad `latest` dependency declarations with deliberate version ranges while retaining the lockfile. Enable strict TypeScript incrementally.
- Fix portability: `build:pages` and one export script use POSIX environment assignment, and some audit scripts reference macOS Chrome and a previous laptop's runtime path. Declare needed test dependencies and use portable commands.
- Keep stable content IDs, validate stored data, and migrate progress deliberately when lessons change. Browser storage is adequate initially, but export/import matters for moving between laptops.
- Extend CI beyond compilation: verify key calculations, content validity, direct navigation, state migration, keyboard access, and representative responsive layouts. Existing answer audits are useful, but they passed despite the probability mismatch.
- Move large generated review PDFs and screenshot archives out of routine active-source workflows where practical; first distinguish required source assets from reproducible outputs. Do not rewrite Git history as part of the redesign.

## Delivery sequence and acceptance criteria

### First: prove one excellent chapter

Build the complete document-evidence chapter above, including prose, diagrams, a recorded experiment, an unfamiliar transfer question, direct URLs, and notebook persistence. Add a small corrected probability lab to validate the numerical interaction pattern.

Test with approximately five to eight people resembling the actual audience. Observe whether they understand the problem, know what to try, can explain a failed answer, and want to continue. This is formative product testing, not a statistically conclusive study.

### Second: build the course spine

Write the complete question-led outline and prerequisite map. Refactor the shell and content schema enough to support it. Migrate only material that advances the new learning objectives, keeping the existing version available during development.

### Third: complete the mechanics and application chapters

Develop the remaining high-value labs. Have technically qualified reviewers check both explanations and actual calculations. Test comprehension on new examples, including plausible wrong explanations.

### Fourth: polish and optional services

Refine responsive layouts, keyboard access, motion, loading, sources, and notebook recovery. Add live services only if recorded and local experiments cannot meet a demonstrated learning need.

Judge success using transfer: can readers explain a novel result, distinguish the model from its surrounding software, choose an appropriate intervention, and recognize when evidence is insufficient? Completion percentage and self-reported confidence are secondary signals.

## External references consulted

- [3Blue1Brown: Transformers, the technology behind LLMs](https://www.3blue1brown.com/lessons/gpt/): a useful reference for sustained visual explanation and distinguishing parameters from data. Borrow explanatory discipline, not artwork or a presumed need for equivalent production scale.
- [Georgia Tech Polo Club: Transformer Explainer](https://poloclub.github.io/transformer-explainer/): a reference for connecting controls and visible computations. Its full interface is more technical than the proposed entry experience.
- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762): technical source for attention and the decoder's causal masking.
- [Jain and Wallace, Attention is not Explanation](https://arxiv.org/abs/1902.10186): supports caution about treating attention weights as a complete explanation of a prediction.
- [Vite: Deploying a Static Site](https://vite.dev/guide/static-deploy.html): confirms the existing static-hosting direction remains viable.

The strongest next step is one chapter that makes a difficult idea understandable through inspection and experimentation. Its quality should determine the rest of the redesign.
