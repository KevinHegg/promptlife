# Prompt Life Visual Aid Style Guide v0.28.0

Prompt Life visual aids should make model mechanics less mysterious without becoming dense posters. The core rule is simple: short labels live in the diagram; definitions, limits, and nuance live in accessible HTML callouts.

## Purpose

Visual aids exist to support the lesson objective, not to decorate the page. Each aid should help a learner answer one question:

- What is the mechanism?
- What boundary does this concept protect?
- What misconception should I stop carrying?
- What does this look like in the day in the life of a prompt?

## Aid Types

### Coded SVG/HTML

Use coded SVG/HTML when exact relationships matter:

- token flow
- training loops
- inference state
- context windows
- RAG/retrieval
- grounding and evidence
- logits, softmax, sampling
- embeddings, vectors, tensors
- taxonomy or matrix distinctions

Coded visuals may use numbered markers when the learner needs to map specific diagram parts to specific callouts.

### Generated PNG

Use generated PNGs only for atmospheric or concept-setting visuals:

- broad pretraining landscape
- model cloud / prompt cloud
- fine-tuning landscape
- alignment landscape
- future ethical or social concept scenes

Generated PNGs must not contain tiny instructional text. Keep labels, captions, alt text, and callouts in app code. If a PNG needs exact references, use coded overlays or HTML callouts, not baked-in text.

## Canonical Templates

Use these six templates going forward. New visual ideas should first choose one of these patterns before inventing a custom layout.

### 1. Atmospheric Scene

Purpose: big-picture, humane, social, ethical, or metaphorical concepts.

Use for:

- Collective Intelligence, Extracted
- Costs We Must Count
- Benefits Worth Taking Seriously
- Human-Centered AI
- The Perfect Storm, when the visual is about convergence rather than exact steps

Allowed:

- Image 2 atmospheric PNG
- no embedded text
- no tiny labels
- HTML caption and callouts outside the image

Not allowed:

- exact mechanics
- arrows with required meaning
- axes
- probabilities
- small labels

### 2. Mechanism Flow

Purpose: a process unfolding over steps.

Use for training, pretraining, inference, tokenization, token IDs, autoregression, and prompt-run-like traces.

Visual grammar:

- 3 to 5 numbered steps
- clear arrows or rails
- one action per step
- callouts below must match numbered markers

### 3. Comparison Board

Purpose: a boundary between nearby concepts.

Use for training vs inference, prompt vs response, attention vs MLP, embedding vs hidden state, context vs memory, RAG vs fine-tuning, and alignment vs conscience.

Visual grammar:

- two or three columns
- short labels
- no paragraph text inside visual
- callouts below explain the contrast

### 4. Context Tray / Stack

Purpose: what is visible now, what falls out, and what retrieval adds.

Use for context window, RAG, grounding, effective prompting, and autoregression when the active context is the main point.

Visual grammar:

- cards or chips entering a tray
- current context visibly bounded
- optional falls-out area
- no tiny text

### 5. Probability Bars

Purpose: scores, probabilities, sampling, and uncertainty.

Use for logits, softmax, sampling, and probability-picker-related visuals.

Visual grammar:

- same candidate token set across related cards where possible
- bars readable at 320px
- no truth-meter language
- caption explicitly says likely is not proof when relevant

### 6. Taxonomy Map

Purpose: relationships among families, layers, risks, benefits, or actors.

Use for Where LLMs Fit, Risk vs Myth, Better AI Is a Choice, Model Literate Synthesis, and AI ecosystem concepts.

Visual grammar:

- grouped nodes
- few lines
- short labels only
- no dense web

## Anatomy

Each Journey visual aid should include:

- concise title
- optional subtitle
- one-sentence caption
- visual body
- callout list
- key takeaway when useful
- accessible description
- print/PDF note for review packets

## Numbered Callout Rules

Use numbered callouts only when the diagram has matching visible markers.

Rules:

- Every numbered explanation must have a matching visual marker.
- Every visual marker must have a matching explanation.
- Marker numbers must not skip or duplicate.
- Prefer three to four markers; five is the practical maximum.
- Numbered callouts are best for mechanisms, traces, flows, and exact boundaries.

If the aid is atmospheric, metaphorical, or comparative, use unnumbered bullet callouts instead.

## Label Rules

Inside diagrams:

- keep labels short
- avoid full sentences
- use model terms only after the lesson has introduced them
- avoid dense paragraphs
- avoid tiny text in PNGs
- never rely on color alone
- no essential text smaller than 12px at a 390px viewport
- prefer 13px to 14px minimum for labels inside diagrams
- use no more than five labels inside a mechanism diagram
- if a label needs more than two words, move it to the caption or callout list
- diagram labels must not overlap
- arrows and arcs must have clear endpoints
- use one key idea per visual
- the visual title should name the mechanism or boundary
- metadata/debug chips never count as learning content

Outside diagrams:

- put definitions in HTML
- explain metaphor limits
- name the misconception directly
- include alt text or accessible description

## Mobile Rules

Design at 320px and 390px first.

- No horizontal overflow.
- No clipped pills or labels.
- No label crossing a connector line unless intentional and readable.
- Bottom navigation must not cover the key takeaway or main interaction.
- Long callout content should wrap in HTML, not inside SVG.
- A first-time learner should be able to explain the visual's main point in about five seconds.
- Remove renderer metadata from learner-facing views: no pattern names, variant names, marker counts, renderer labels, visual-aid IDs, or implementation notes.

## ZenTron Origami Grammar

Prompt Life uses a calm folded-paper / neon-line visual language:

- Paper shapes carry stable concepts.
- Neon lines carry relationships or flow.
- Glowing dots carry transient computation or selected values.
- Soft garden/ledger imagery carries ethics, risk, and human context.
- Folded cards carry documents, retrieved evidence, prompts, or response tokens.

The style should feel smart, warm, and non-childish: playful enough to reduce fear, precise enough for academic learners.

## Review Checklist

Before shipping a visual aid:

- Does the visual support the card objective?
- Are all diagram labels readable at 320px?
- If there are numbered callouts, do numbers match exactly?
- If there is no exact step mapping, are callouts unnumbered?
- Is all instructional text in HTML or accessible SVG text?
- Is there alt text or an accessible description?
- Does the visual reinforce core boundaries such as training vs inference, context vs memory, RAG vs training, or probability vs truth?
- Does the visual avoid consciousness, magic, or hidden-search implications unless it is explicitly correcting them?
