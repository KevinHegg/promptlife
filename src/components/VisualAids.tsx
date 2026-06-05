import React from 'react'
import { canonicalPromptResponse } from '../data/canonicalExamples'
import { lessons } from '../data/content'

export const visualAidStyleVariants = [
  { id: 'paper-diagram', label: 'Paper diagram', use: 'Exact, calm diagrams.' },
  { id: 'neon-flow', label: 'Neon flow', use: 'Prompt to model to token flows.' },
  { id: 'origami-object', label: 'Origami object', use: 'Tensors, layers, and transformations.' },
  { id: 'zen-garden-map', label: 'Zen garden map', use: 'Alignment, risk, hallucination, and ethics.' },
  { id: 'retrieval-shelf', label: 'Retrieval shelf', use: 'RAG, grounding, and evidence entering context.' }
]

function getVisualAidVariant(aid) {
  if (aid.variant) return aid.variant
  if (['llmOverview', 'promptResponse', 'inference', 'softmax', 'sampling', 'loop'].includes(aid.pattern)) return 'neon-flow'
  if (['tensor', 'layers', 'mlp', 'bars', 'vector', 'hidden'].includes(aid.pattern)) return 'origami-object'
  if (['alignment', 'risk', 'overfitting', 'diffusion'].includes(aid.pattern)) return 'zen-garden-map'
  if (aid.pattern === 'rag') return 'retrieval-shelf'
  return 'paper-diagram'
}

export const visualAidCatalog = [
  { id: 'llm-overview', title: 'Prompt to Prediction', subtitle: 'Score, choose, append, repeat', caption: 'A concrete prompt trace flows through learned weights into next-token probabilities; floor is selected and appended.', pattern: 'llmOverview', objective: 'Make next-token prediction feel concrete and powerful without implying the model writes the whole answer at once.', callouts: [{ heading: 'Current context', body: `Prompt plus response so far: ${canonicalPromptResponse.responseSoFar}.` }, { heading: 'Learned weights', body: 'Inference uses weights shaped earlier during training.' }, { heading: 'Token cloud', body: 'The model scores candidate next tokens such as floor, room, and tiles.' }, { heading: 'Append', body: 'The chosen token becomes part of the next context.' }], keyTakeaway: 'LLM generation is score, choose, append, repeat.', accessibleDescription: 'Prompt context enters a learned-weight cloud, candidate next tokens appear, and the chosen token floor is appended to the response.', printNote: 'Future textless Image 2 asset: before-morning-llm-cloud.png. Keep explanatory text in HTML callouts.' },
  { id: 'traditions', title: 'Rules and Learned Patterns', subtitle: 'Two traditions, one modern toolkit', caption: 'Rules-first AI uses symbols and if-then logic; deep learning learns useful patterns from examples by adjusting weights.', pattern: 'traditions', objective: 'Contrast explicit rules with learned patterns without turning the diagram into a poster.', callouts: [{ heading: 'Rules', body: 'Symbolic systems use explicit if/then logic and symbols.' }, { heading: 'Examples', body: 'Deep-learning systems use examples, loss, and weight updates.' }, { heading: 'Bridge', body: 'Modern systems often combine learned models with rules, retrieval, tools, filters, and policies.' }], keyTakeaway: 'Modern AI often blends learned patterns with hand-built rules and tools.', accessibleDescription: 'Two side-by-side panels compare rules, symbols, and if-then logic with examples, loss, and weights, joined by a bridge labeled combine both.', printNote: 'Short panel labels only; explanatory comparison stays in HTML callouts.' },
  { id: 'training-loop', title: 'Training Loop', subtitle: 'Durable change happens at weight update', caption: 'Predict, compare, loss, update weights, repeat. Training changes weights.', pattern: 'training', objective: 'Show the sequence of training and make the durable weight-update step visually distinct.', callouts: [{ heading: 'Predict', body: 'The model predicts a target.' }, { heading: 'Compare', body: 'The prediction is compared with the target.' }, { heading: 'Loss', body: 'Loss measures error.' }, { heading: 'Update weights', body: 'Weight updates are the durable-change step.' }, { heading: 'Repeat', body: 'The loop repeats many times.' }], keyTakeaway: 'Training changes weights; ordinary inference does not.', accessibleDescription: 'A five-step loop moves from Predict to Compare to Loss to Update weights to Repeat, with Update weights highlighted.', printNote: 'Five nodes stay aligned at 320px and in exported review PDFs.' },
  { id: 'pretraining-rain', title: 'Broad Pretraining', subtitle: 'Scale, not perfect recall', caption: 'Enormous streams of examples repeat the training loop and shape broad durable patterns before normal use.', pattern: 'pretraining', callouts: [{ heading: 'Huge scale', body: 'Many examples flow through the same predict, loss, update loop.' }, { heading: 'Broad patterns', body: 'Weights pick up grammar, style, facts, associations, task shapes, and reasoning-like patterns.' }, { heading: 'Limit', body: 'Pretraining is not a perfect searchable memory of every source.' }], keyTakeaway: 'Pretraining changes weights broadly; it does not create perfect recall.', accessibleDescription: 'Data streams fall across a landscape, carving broad paths that represent durable pattern learning.', printNote: 'Future textless Image 2 asset: before-morning-pretraining-landscape.png. Keep labels in HTML callouts.' },
  { id: 'overfitting-generalization', title: 'Overfitting vs Generalization', caption: 'Memorizing training examples is not the same as learning patterns that transfer to held-out examples.', pattern: 'overfitting', legend: ['Training examples are old dots the model fit during training.', 'Held-out examples are new dots used to test transfer.', 'The overfit curve traces old dots too tightly.', 'The generalizing curve is smoother and reaches new examples.'] },
  { id: 'fine-tune-path', title: 'Fine-Tuning Path', subtitle: 'Durable adaptation after pretraining', caption: 'Targeted examples or adapter weights nudge an already-trained model toward future behavior.', pattern: 'fine', callouts: [{ heading: 'Pretrained base', body: 'Fine-tuning starts from broad learned weights.' }, { heading: 'Targeted data', body: 'Domain, task, style, or preference examples adapt behavior.' }, { heading: 'Durable contrast', body: 'Prompts and RAG steer current context; fine-tuning shapes future responses.' }], keyTakeaway: 'Fine-tuning is durable training, not one prompt and not retrieval.', accessibleDescription: 'A highlighted path crosses a pretrained landscape after examples enter the model path.', printNote: 'Future textless Image 2 asset: before-morning-finetuning-path.png. Use coded overlays and HTML callouts.' },
  { id: 'alignment', title: 'Alignment Landscape', subtitle: 'Shaping behavior, not conscience', caption: 'Alignment shapes behavior with durable training, runtime safeguards, policies, and evaluation; it does not create moral agency.', pattern: 'alignment', callouts: [{ heading: 'Durable shaping', body: 'Instruction tuning, human feedback, and preference optimization can shape future behavior.' }, { heading: 'Runtime steering', body: 'System prompts, policy filters, tool rules, and safeguards can steer the current run.' }, { heading: 'Evaluation', body: 'Safety tests and red-team reviews check behavior and reveal failures.' }, { heading: 'Limit', body: 'Alignment is not magic morality, conscience, or a guarantee of truth.' }], keyTakeaway: 'Alignment is layered behavior shaping, not moral agency.', accessibleDescription: 'A landscape has a preferred path, guardrail, policy marker, and evaluation marker shown with numbered callouts outside the art.', printNote: 'Future textless Image 2 asset: before-morning-alignment-garden.png. Keep labels outside the scene through callouts.' },
  { id: 'inference-pass', title: 'Forward Pass', caption: 'Inference creates temporary states while durable weights stay fixed.', pattern: 'inference', legend: ['Current context enters the model.', 'Fixed weights are used, not updated.', 'Temporary hidden states lead to next-token scores.'] },
  { id: 'prompt-response', title: 'Prompt vs Response', subtitle: 'Given context versus generated tokens', caption: 'A complete user prompt is given; response tokens are generated and appended.', pattern: 'promptResponse', objective: 'Separate the complete user prompt from the incomplete response-so-far and next generated token.', callouts: [{ heading: 'User prompt', body: `The complete request is: ${canonicalPromptResponse.userPrompt}` }, { heading: 'Response so far', body: `The model has already generated: ${canonicalPromptResponse.responseSoFar}.` }, { heading: 'Next token', body: `${canonicalPromptResponse.chosenNextToken} is appended, so the next context combines prompt plus response so far plus floor.` }], keyTakeaway: 'The response grows one token at a time inside the current context.', accessibleDescription: 'The visual separates a complete user prompt, response-so-far token chips, the next token floor, and the next context row.', printNote: 'Token chips wrap inside the visual frame; full example text stays in HTML callouts.' },
  { id: 'tokenization', title: 'Text to Tokens', caption: 'Generated response text is split into model-readable chunks before embedding lookup.', pattern: 'token', legend: [`Generated response: ${canonicalPromptResponse.generatedResponse}`, 'Simplified for learning. Real tokenizers may split differently.'] },
  { id: 'token-ids', title: 'Token IDs', caption: 'Each token gets a lookup number that points to an embedding row.', pattern: 'ids', legend: ['dog -> 421, cat -> 982, floor -> 1576.', 'The ID is a lookup key, not the meaning.', 'The ID points to an embedding row.'] },
  { id: 'embeddings', title: 'Embedding Lookup', caption: 'A token ID retrieves a learned starting vector.', pattern: 'vector', legend: ['The embedding table was learned during training.', 'Inference retrieves one row temporarily for the current context.', 'The retrieved embedding is a starting vector, not a definition.'] },
  { id: 'vectors', title: 'Feature Vector', caption: 'A vector is a list of numerical features, not a sentence.', pattern: 'bars', legend: ['Labels such as animal-ish, grammar role, tone, position, and context clue are simplified.', 'Real features are distributed across many dimensions.'] },
  { id: 'tensors', title: 'Tensor Block', caption: 'Tensors organize many token vectors for layer-by-layer processing.', pattern: 'tensor', legend: ['Token positions run down one axis.', 'Feature dimensions run across another axis.', 'Batch x tokens x features is an advanced shape note.'] },
  { id: 'attention', title: 'Attention Weave', caption: 'Attention is weighted relevance between token positions.', pattern: 'attention' },
  { id: 'mlp', title: 'MLP Reshape', caption: 'The MLP reshapes each token position feature vector.', pattern: 'mlp' },
  { id: 'layers', title: 'Layer Stack', caption: 'Repeated blocks refine hidden states while carrying useful signal forward.', pattern: 'layers' },
  { id: 'hidden-states', title: 'Temporary Hidden State', caption: 'Hidden states are context-shaped vectors created during a forward pass.', pattern: 'hidden' },
  { id: 'logits', title: 'Raw Scores', caption: 'Logits are raw next-token scores before probabilities.', pattern: 'logits' },
  { id: 'softmax', title: 'Softmax Funnel', caption: 'Softmax converts raw scores into probabilities that sum to one.', pattern: 'softmax' },
  { id: 'sampling', title: 'Sample One Token', caption: 'Sampling chooses one token from the probability cloud.', pattern: 'sampling' },
  { id: 'autoregression', title: 'Append and Repeat', caption: 'The chosen token is appended, then the model runs again.', pattern: 'loop' },
  { id: 'context-window', title: 'Temporary Context Window', caption: 'Only visible context can influence the next token.', pattern: 'window' },
  { id: 'rag-retrieval', title: 'Open-Book Retrieval', subtitle: 'Retrieval plus context, not training', caption: 'Retrieved notes enter the context before response tokens are generated.', pattern: 'rag', variant: 'retrieval-shelf', objective: 'Show that RAG retrieves outside information and places it into context; it does not train the model.', callouts: [{ heading: 'Ask', body: 'The user prompt starts the run.' }, { heading: 'Retrieve', body: 'A search system finds relevant outside material.' }, { heading: 'Add to context', body: 'Retrieved notes become temporary context tokens.' }, { heading: 'Generate', body: 'The model still generates response tokens one at a time.' }, { heading: 'Weights stay fixed', body: 'RAG does not normally update model weights.' }], keyTakeaway: 'RAG is retrieval plus context, not training.', accessibleDescription: 'The RAG diagram moves from Prompt to Retriever to Notes, then into a Context tray and Generated response, with a separate fixed-weights note.', printNote: 'v0.10 pilot visual: paper-layer nodes, subtle neon retrieval path, HTML callouts, and a one-sentence takeaway.' },
  { id: 'grounding-evidence', title: 'Evidence Anchor', subtitle: 'Tying answers to evidence', caption: 'Evidence enters context so the generated response can stay connected to sources.', pattern: 'groundingEvidence', variant: 'retrieval-shelf', objective: 'Show grounding as evidence plus generated response, not a truth guarantee.', callouts: [{ heading: 'Evidence', body: 'Retrieved documents, data, citations, or tool results can enter the current run.' }, { heading: 'Context', body: 'The evidence becomes visible input, not permanent model memory.' }, { heading: 'Answer', body: 'The response should stay connected to the evidence while still being reviewed.' }, { heading: 'Limit', body: 'Grounding helps, but it can fail when retrieval is poor or the model misuses evidence.' }], keyTakeaway: 'Grounding helps tie an answer to evidence; it does not guarantee truth.', accessibleDescription: 'Evidence cards are placed into a context tray, then an answer card is tied back to them with an anchor line.', printNote: 'Keep the diagram sparse; evidence and limitation detail stays in HTML callouts.' },
  { id: 'hallucination-bridge', title: 'Unsupported Bridge', subtitle: 'Fluent is not always grounded', caption: 'A response can look smooth while missing evidence supports.', pattern: 'hallucinationBridge', variant: 'zen-garden-map', objective: 'Show hallucination as fluent generated output without enough evidence support.', callouts: [{ heading: 'Fluent surface', body: 'The output may read smoothly and confidently.' }, { heading: 'Missing support', body: 'Some claims may lack evidence, citation, or retrieved context.' }, { heading: 'Generation', body: 'Likely-token generation is not the same as truth verification.' }, { heading: 'Review', body: 'Grounding, retrieval, uncertainty, and human review reduce risk but do not erase it.' }], keyTakeaway: 'Fluency is not evidence.', accessibleDescription: 'A smooth output bridge crosses the scene while several evidence pillars are missing underneath.', printNote: 'Use short labels only; the “not lying” distinction remains in lesson copy.' },
  { id: 'ai-learns', title: 'Learning Modes', caption: 'Durable training, retrieval, and temporary steering change different things.', pattern: 'learns' },
  { id: 'diffusion', title: 'Denoise, Not Append', caption: 'Diffusion refines noise step by step instead of generating text token by token.', pattern: 'diffusion' },
  { id: 'multimodal', title: 'Shared Media Hub', caption: 'Different media types can connect through learned representations.', pattern: 'multimodal' },
  { id: 'perfect-storm', title: 'Storm Front', subtitle: 'Why LLMs arrived now', caption: 'Data, compute, methods, labor, and incentives converged into modern LLM capability.', pattern: 'perfectStorm', variant: 'zen-garden-map', objective: 'Show convergence without implying one magic breakthrough.', callouts: [{ heading: 'Data', body: 'Human-created text, media, code, and documents supplied patterns.' }, { heading: 'Compute', body: 'Hardware, storage, and data centers made large-scale training possible.' }, { heading: 'Methods', body: 'Deep learning and transformer advances shaped the architecture.' }, { heading: 'Labor and incentives', body: 'Human evaluation work and market incentives pushed systems into products.' }], keyTakeaway: 'Modern LLMs came from a convergence, not a single spark.', accessibleDescription: 'Five streams labeled Data, Compute, Methods, Labor, and Incentives flow into a central model shape.', printNote: 'Keep labels short; detailed ingredients remain in HTML callouts.' },
  { id: 'collective-intelligence-lantern', title: 'Borrowed Flames', subtitle: 'No creators, no model', caption: 'Model usefulness depends on patterns from human-created language, art, code, research, and culture.', pattern: 'collectiveLantern', variant: 'zen-garden-map', objective: 'Make human-created source traces visible without treating the model as humanity’s mind.', callouts: [{ heading: 'Human expression', body: 'Books, sites, code, art, journalism, forums, documentation, and research leave learnable traces.' }, { heading: 'Collection questions', body: 'Consent, transparency, provenance, copyright, and compensation matter.' }, { heading: 'Model limit', body: 'The model absorbs patterns statistically; it does not understand gratitude or responsibility.' }], keyTakeaway: 'The model did not create its abilities alone.', accessibleDescription: 'Small source cards light a paper lantern that sends a glow toward a model cloud.', printNote: 'No dense source labels inside the lantern; callouts carry the explanation.' },
  { id: 'benefits-tool-garden', title: 'Tool Garden', subtitle: 'Benefits without utopia', caption: 'AI is most useful when it amplifies human judgment, access, search, drafting, translation, and research support.', pattern: 'benefitsGarden', variant: 'zen-garden-map', objective: 'Separate real bounded benefits from utopian claims.', callouts: [{ heading: 'Demonstrated', body: 'Accessibility, translation support, summarization, search/RAG, drafting, and coding assistance can help under review.' }, { heading: 'Plausible', body: 'Tutoring support, research triage, brainstorming, and workflow support need context and evidence.' }, { heading: 'Speculative', body: 'Broad utopia or replacement claims should not be stated as fact.' }], keyTakeaway: 'Benefits can be real and still bounded.', accessibleDescription: 'A central human node is surrounded by tool shapes for access, search, draft, translate, code, and research.', printNote: 'Evidence-tier chips stay in HTML callouts below the scene.' },
  { id: 'costs-invisible-factory', title: 'Invisible Factory', subtitle: 'The answer is not weightless', caption: 'AI systems can carry physical, labor, privacy, cultural, and power costs that need honest accounting.', pattern: 'costsFactory', variant: 'zen-garden-map', objective: 'Make hidden costs visible without inventing statistics or fear-heavy imagery.', callouts: [{ heading: 'Infrastructure', body: 'Energy, water, carbon, data centers, chips, and e-waste vary by system and workload.' }, { heading: 'Human systems', body: 'Labor disruption, deskilling, privacy, bias, and information pollution depend on deployment choices.' }, { heading: 'Power', body: 'Concentration of data, compute, and capital affects who benefits and who decides.' }], keyTakeaway: 'Costs vary, but they are real enough to count.', accessibleDescription: 'A bright answer card connects to factory, power, water, data, labor, and policy nodes.', printNote: 'No precise numbers in the visual; use cautious callouts.' },
  { id: 'human-centered-ai-garden', title: 'Human Center', subtitle: 'Tools should serve dignity', caption: 'AI should support human dignity, learning, responsibility, creativity, relationships, and the common good.', pattern: 'humanGarden', variant: 'zen-garden-map', objective: 'Center people and accountability rather than model power.', callouts: [{ heading: 'Human judgment', body: 'People remain accountable for high-stakes decisions and institutional use.' }, { heading: 'Dignity', body: 'Speed, profit, and automation should not outrank persons, learning, or relationships.' }, { heading: 'Model limit', body: 'A model can sound ethical without moral understanding.' }], keyTakeaway: 'Powerful tools still need human purpose.', accessibleDescription: 'A human-centered garden sits in the middle while AI tool orbits remain outside the human circle.', printNote: 'Avoid robot imagery; the human center is the visual anchor.' },
  { id: 'responsible-ai-forked-path', title: 'Forked Path', subtitle: 'Responsible AI is chosen', caption: 'AI outcomes are shaped by design, deployment, governance, incentives, and institutional choices.', pattern: 'responsiblePath', variant: 'zen-garden-map', objective: 'Show extractive and responsible paths without pretending governance is simple.', callouts: [{ heading: 'Technical choices', body: 'Smaller models, efficient inference, distillation, RAG, and better hardware use can fit some tasks.' }, { heading: 'Data choices', body: 'Provenance, consent, licensing, creator compensation, and privacy-preserving deployment matter.' }, { heading: 'Institutional choices', body: 'Human review, policy, labor transition planning, public-interest models, and independent evaluation shape outcomes.' }], keyTakeaway: 'Harms are shaped by choices, not destiny.', accessibleDescription: 'A path splits into extractive and responsible routes, with a human decision marker at the fork.', printNote: 'Keep the fork simple; mitigations stay in HTML callouts.' },
  { id: 'prompting-context-tray', title: 'Context Tray', subtitle: 'Prompting steers this run', caption: 'Good prompts pack task, context, constraints, examples, evidence needs, uncertainty, review, and format into the current run.', pattern: 'promptingTray', variant: 'retrieval-shelf', objective: 'Show prompting as context design, not permanent teaching.', callouts: [{ heading: 'Prompt parts', body: 'Task, context, constraints, examples, and format shape the current input.' }, { heading: 'Evidence and uncertainty', body: 'Source needs, retrieved context, and uncertainty requests can improve reviewability.' }, { heading: 'Boundary', body: 'Prompting usually changes context, not weights.' }], keyTakeaway: 'Prompting is context design for one run.', accessibleDescription: 'Prompt component cards drop into a transparent context tray before one generated response leaves it.', printNote: 'Use short component labels inside the tray.' },
  { id: 'synthesis-map-compass-lantern', title: 'Map, Compass, Lantern', subtitle: 'Mechanics plus judgment', caption: 'Model literacy connects training, inference, context, generation, RAG, grounding, benefits, costs, and responsibility.', pattern: 'synthesisMap', variant: 'zen-garden-map', objective: 'Close the Journey by connecting mechanics and human consequences.', callouts: [{ heading: 'Map', body: 'Training changes weights; inference uses weights; context steers the current run.' }, { heading: 'Compass', body: 'RAG and grounding can help, but humans still judge evidence and consequences.' }, { heading: 'Lantern', body: 'Benefits and costs are real; model-literate people ask better questions.' }], keyTakeaway: 'Mechanics matter, and humans remain responsible.', accessibleDescription: 'A learner uses a map, compass, and lantern to connect model mechanics with human responsibility.', printNote: 'This is the final synthesis visual; keep it calm and sparse.' },
  { id: 'risk', title: 'Risk or Myth', caption: 'Clear mechanisms help separate practical risk from magical stories.', pattern: 'risk' }
]

const aidById = Object.fromEntries(visualAidCatalog.map((aid) => [aid.id, aid]))
const lessonByVisualAidId = Object.fromEntries(lessons.map((lesson) => [lesson.visualAidId, lesson]))

function getCallouts(aid) {
  if (aid.callouts?.length) {
    return aid.callouts.map((callout, index) => ({
      number: callout.number ?? index + 1,
      heading: callout.heading ?? `Step ${index + 1}`,
      body: callout.body
    }))
  }

  return (aid.legend ?? []).map((body, index) => ({
    number: index + 1,
    heading: `Point ${index + 1}`,
    body
  }))
}

// Visual aids must use short in-diagram labels plus HTML callouts because mobile
// screens and PDF export cannot reliably preserve dense SVG text layouts.
export function VisualAid({ id, headingId = undefined, compact = false }) {
  const aid = aidById[id] ?? aidById['llm-overview']
  return <VisualAidCard aid={aid} headingId={headingId} compact={compact} />
}

function VisualAidCard({ aid, headingId = undefined, compact = false }) {
  const callouts = getCallouts(aid)
  const variant = getVisualAidVariant(aid)
  const className = [
    'visual-aid',
    'visual-aid-card',
    compact ? 'compact' : '',
    `variant-${variant}`,
    `visual-aid-${aid.id}`
  ].filter(Boolean).join(' ')
  return (
    <figure className={className} aria-labelledby={headingId}>
      <DiagramScene aid={aid} variant={variant} />
      <figcaption>
        <div className="aid-caption-copy">
          <strong>{aid.title}</strong>
          {aid.subtitle && <em>{aid.subtitle}</em>}
          <span>{aid.caption}</span>
        </div>
        <CalloutList callouts={callouts} />
        {aid.keyTakeaway && <KeyTakeaway text={aid.keyTakeaway} />}
        {aid.accessibleDescription && <p className="sr-only">Accessible description: {aid.accessibleDescription}</p>}
      </figcaption>
    </figure>
  )
}

function DiagramScene({ aid, variant }) {
  return (
    <div className={`aid-canvas aid-${aid.pattern} aid-variant-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 320 210" preserveAspectRatio="xMidYMid meet" focusable="false">
        <VisualPattern aid={aid} />
      </svg>
    </div>
  )
}

function CalloutList({ callouts }) {
  if (!callouts?.length) return null

  return (
    <ol className="aid-callout-list aid-legend">
      {callouts.map((callout) => (
        <li key={`${callout.number}-${callout.heading}`}>
          <span aria-hidden="true">{callout.number}</span>
          <p><strong>{callout.heading}</strong> {callout.body}</p>
        </li>
      ))}
    </ol>
  )
}

function KeyTakeaway({ text }) {
  return <p className="aid-key-takeaway"><strong>Key takeaway:</strong> {text}</p>
}

export function VisualAidGallery() {
  return (
    <div className="visual-aid-gallery">
      {visualAidCatalog.map((aid) => {
        const lesson = lessonByVisualAidId[aid.id]
        return (
          <section id={aid.id} className="review-card aid-review-card" key={aid.id} aria-labelledby={`${aid.id}-review-title`}>
            <p className="eyebrow">{aid.id}</p>
            <h2 id={`${aid.id}-review-title`}>{aid.title}</h2>
            <div className="aid-review-meta" aria-label={`Review metadata for ${aid.title}`}>
              <span>Lesson: {lesson?.title ?? 'Shared/support visual'}</span>
              <span>Pattern: {aid.pattern}</span>
              <span>Variant: {getVisualAidVariant(aid)}</span>
            </div>
            <VisualAid id={aid.id} compact />
            <dl className="aid-review-details">
              <div><dt>Learning objective</dt><dd>{aid.objective ?? aid.caption}</dd></div>
              <div><dt>Accessible description</dt><dd>{aid.accessibleDescription ?? aid.caption}</dd></div>
              <div><dt>Mobile preview</dt><dd>Review at 320px, 390px, and 430px; diagram labels must stay inside the canvas.</dd></div>
              <div><dt>Print/PDF notes</dt><dd>{aid.printNote ?? 'Use the same scene and HTML callouts in exported lesson-card PDFs.'}</dd></div>
            </dl>
          </section>
        )
      })}
    </div>
  )
}

function VisualPattern({ aid }) {
  switch (aid.pattern) {
    case 'llmOverview':
      return <LlmOverviewSvg />
    case 'traditions':
      return <TraditionsSvg />
    case 'training':
      return <TrainingSvg />
    case 'pretraining':
      return <PretrainingSvg />
    case 'overfitting':
      return <OverfittingSvg />
    case 'fine':
      return <FineTuneSvg />
    case 'alignment':
      return <AlignmentSvg />
    case 'inference':
      return <InferenceSvg />
    case 'promptResponse':
      return <PromptResponseSvg />
    case 'token':
      return <TokenSvg />
    case 'ids':
      return <IdsSvg />
    case 'vector':
      return <EmbeddingSvg />
    case 'bars':
      return <VectorSvg />
    case 'tensor':
      return <TensorSvg />
    case 'attention':
      return <AttentionSvg />
    case 'mlp':
      return <MlpSvg />
    case 'layers':
      return <LayersSvg />
    case 'hidden':
      return <HiddenSvg />
    case 'logits':
      return <LogitsSvg />
    case 'softmax':
      return <SoftmaxSvg />
    case 'sampling':
      return <SamplingSvg />
    case 'loop':
      return <LoopSvg />
    case 'window':
      return <WindowSvg />
    case 'rag':
      return <RagSvg />
    case 'groundingEvidence':
      return <GroundingEvidenceSvg />
    case 'hallucinationBridge':
      return <HallucinationBridgeSvg />
    case 'learns':
    case 'compare':
      return <LearnsSvg />
    case 'diffusion':
      return <DiffusionSvg />
    case 'multimodal':
      return <MultimodalSvg />
    case 'perfectStorm':
      return <PerfectStormSvg />
    case 'collectiveLantern':
      return <CollectiveLanternSvg />
    case 'benefitsGarden':
      return <BenefitsGardenSvg />
    case 'costsFactory':
      return <CostsFactorySvg />
    case 'humanGarden':
      return <HumanGardenSvg />
    case 'responsiblePath':
      return <ResponsiblePathSvg />
    case 'promptingTray':
      return <PromptingTraySvg />
    case 'synthesisMap':
      return <SynthesisMapSvg />
    case 'risk':
      return <RiskSvg />
    default:
      return <CloudSvg />
  }
}

function Label({ x, y, children, className = '' }) {
  return <text x={x} y={y} className={className}>{children}</text>
}

function Callout({ x, y, children }) {
  return (
    <g>
      <circle className="aid-callout" cx={x} cy={y} r="12" />
      <Label x={Number(x) - 4} y={Number(y) + 5} className="tiny dark">{children}</Label>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }) {
  const startX = Number(x1)
  const startY = Number(y1)
  const endX = Number(x2)
  const endY = Number(y2)
  const midX = (startX + endX) / 2
  return <path className="aid-arrow" d={`M${startX} ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`} />
}

function StepNode({ number, label, x, y, width = 76, output = false }: { number: string | number, label: string | number, x: string | number, y: string | number, width?: string | number, output?: boolean }) {
  return (
    <g>
      <rect className={output ? 'aid-box output' : 'aid-box'} x={x} y={y} width={width} height="38" rx="8" />
      <circle className="aid-callout" cx={Number(x) + 15} cy={Number(y) + 19} r="10" />
      <Label x={Number(x) + 11} y={Number(y) + 24} className="tiny dark">{number}</Label>
      <Label x={Number(x) + 28} y={Number(y) + 24} className={output ? 'tiny dark' : 'tiny'}>{label}</Label>
    </g>
  )
}

function TokenChip({ token, x, y, width = 34, kind = 'output' }: { token: string | number, x: string | number, y: string | number, width?: string | number, kind?: string }) {
  return (
    <g>
      <rect className={kind === 'prompt' ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width={width} height="24" rx="6" />
      <Label x={Number(x) + 6} y={Number(y) + 17} className="tiny dark">{token}</Label>
    </g>
  )
}

function LlmOverviewSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="66" width="74" height="48" rx="8" />
      <circle className="aid-core" cx="142" cy="90" r="36" />
      {[0, 1, 2, 3].map((index) => (
        <circle key={index} className={index === 1 ? 'aid-dot alt' : 'aid-dot'} cx={216 + index * 22} cy={70 + (index % 2) * 34} r={9 + index * 2} />
      ))}
      <rect className="aid-box output" x="246" y="140" width="58" height="34" rx="8" />
      <Arrow x1={90} y1={90} x2={106} y2={90} />
      <Arrow x1={178} y1={90} x2={204} y2={90} />
      <Arrow x1={248} y1={112} x2={266} y2={140} />
      <Label x="25" y="87" className="tiny dark">prompt/</Label>
      <Label x="25" y="103" className="tiny dark">context</Label>
      <Label x="112" y="84" className="tiny">learned</Label>
      <Label x="114" y="101" className="tiny">weights</Label>
      <Label x="202" y="42" className="tiny">next-token</Label>
      <Label x="202" y="57" className="tiny">probabilities</Label>
      <Label x="255" y="161" className="tiny dark">token</Label>
      <Label x="128" y="190" className="tiny">append</Label>
    </>
  )
}

function TraditionsSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="18" y="28" width="126" height="126" rx="10" />
      <rect className="aid-box" x="176" y="28" width="126" height="126" rx="10" />
      <Label x="56" y="52" className="tiny dark">Rules</Label>
      <Label x="206" y="52" className="tiny">Examples</Label>
      {['Rules', 'Symbols', 'If-then'].map((label, index) => (
        <g key={label}>
          <rect className="aid-chip prompt" x="34" y={72 + index * 25} width="94" height="18" rx="5" />
          <Label x="46" y={86 + index * 25} className="tiny dark">{label}</Label>
        </g>
      ))}
      {['Examples', 'Loss', 'Weights'].map((label, index) => (
        <g key={label}>
          <rect className={index === 2 ? 'aid-chip output' : 'aid-chip'} x="192" y={72 + index * 25} width="94" height="18" rx="5" />
          <Label x="204" y={86 + index * 25} className={index === 2 ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}
      <path className="aid-line" d="M144 91 H176" />
      <rect className="aid-box muted" x="70" y="170" width="180" height="24" rx="8" />
      <Label x="110" y="187" className="tiny">combine both</Label>
    </>
  )
}

function CloudSvg() {
  return (
    <>
      <circle className="aid-core" cx="160" cy="98" r="42" />
      <rect className="aid-box prompt" x="22" y="72" width="76" height="42" rx="8" />
      <rect className="aid-box output" x="226" y="72" width="72" height="42" rx="8" />
      <Arrow x1={98} y1={93} x2={122} y2={93} />
      <Arrow x1={202} y1={93} x2={226} y2={93} />
      {[
        ['grammar', 92, 154, 63],
        ['facts', 136, 170, 124],
        ['tone', 180, 154, 168],
        ['task', 224, 170, 214]
      ].map(([label, dotX, dotY, labelX]) => (
        <g key={label}>
          <circle className="aid-dot" cx={Number(dotX)} cy={Number(dotY)} r="9" />
          <Label x={Number(labelX)} y={194} className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="41" y="98" className="dark">prompt</Label>
      <Label x="242" y="98" className="dark">next</Label>
      <Label x="135" y="102">weights</Label>
    </>
  )
}

function TrainingSvg() {
  const steps = [
    ['1', 'Predict', 22, 38, 78],
    ['2', 'Compare', 120, 38, 88],
    ['3', 'Loss', 230, 38, 68],
    ['4', 'Update weights', 154, 132, 144],
    ['5', 'Repeat', 56, 132, 82]
  ]
  return (
    <>
      {steps.map(([number, label, x, y, width]) => (
        <StepNode key={label} number={number} label={label} x={x} y={y} width={width} output={String(label).startsWith('Update')} />
      ))}
      <path className="aid-line" d="M100 57 H120" />
      <path className="aid-line" d="M208 57 H230" />
      <path className="aid-line" d="M264 76 C264 100, 242 114, 220 132" />
      <path className="aid-line" d="M154 151 H138" />
      <path className="aid-line" d="M56 132 C32 110, 34 76, 54 76" />
      <rect className="aid-box prompt" x="106" y="92" width="108" height="24" rx="8" />
      <Label x="124" y="109" className="tiny dark">durable step</Label>
    </>
  )
}

function PretrainingSvg() {
  return (
    <>
      <path className="aid-land" d="M18 166 L76 102 L126 134 L178 78 L232 118 L302 58 L302 166 Z" />
      {[0, 1, 2, 3, 4, 5, 6].map((drop) => (
        <path key={drop} className="aid-line" d={`M${46 + drop * 34} 28 L${34 + drop * 32} ${80 + (drop % 2) * 18}`} />
      ))}
      <path className="aid-path" d="M34 154 C76 138, 110 128, 140 112 S206 84, 276 74" />
      <path className="aid-path thin" d="M54 168 C106 150, 146 150, 180 130 S238 106, 288 104" />
      <Label x="48" y="50" className="tiny">text/data stream</Label>
      <Label x="112" y="192" className="tiny">broad learning</Label>
    </>
  )
}

function OverfittingSvg() {
  const trainDots = [[42, 142], [84, 78], [126, 116], [168, 62], [210, 132]]
  const newDots = [[246, 96], [282, 82]]
  return (
    <>
      <path className="aid-line" d="M30 164 H300" />
      <path className="aid-line" d="M34 166 V34" />
      <path className="aid-arc alt" d="M40 142 C62 52, 92 50, 126 116 S156 24, 210 132 S250 182, 292 150" />
      <path className="aid-path thin" d="M40 148 C92 122, 150 102, 212 90 S260 82, 296 76" />
      {trainDots.map(([x, y]) => <circle key={`${x}-${y}`} className="aid-dot" cx={x} cy={y} r="7" />)}
      {newDots.map(([x, y]) => <rect key={`${x}-${y}`} className="aid-chip output" x={x - 8} y={y - 8} width="16" height="16" rx="4" />)}
      <circle className="aid-dot alt" cx="42" cy="26" r="5" />
      <Label x="55" y="30" className="tiny">training examples</Label>
      <rect className="aid-chip output" x="42" y="48" width="12" height="12" rx="3" />
      <Label x="62" y="59" className="tiny">held-out examples</Label>
      <path className="aid-arc alt" d="M40 76 H78" />
      <Label x="86" y="80" className="tiny">overfit curve</Label>
      <path className="aid-path thin" d="M40 100 H78" />
      <Label x="86" y="104" className="tiny">generalizing curve</Label>
    </>
  )
}

function FineTuneSvg() {
  return (
    <>
      <path className="aid-land" d="M20 162 L98 78 L145 126 L210 58 L300 162 Z" />
      <path className="aid-path" d="M42 154 C80 128, 105 122, 137 113 S201 83, 266 73" />
      <rect className="aid-chip prompt" x="92" y="32" width="74" height="28" rx="8" />
      <Label x="101" y="51" className="tiny dark">examples</Label>
      <circle className="aid-dot" cx="137" cy="113" r="10" />
      <circle className="aid-dot alt" cx="266" cy="73" r="10" />
      <Arrow x1="128" y1="60" x2="137" y2="103" />
      <Label x="36" y="184" className="tiny">pretrained base</Label>
      <Label x="174" y="39" className="tiny">fine-tuned path</Label>
      <Label x="190" y="184" className="tiny">future responses shaped</Label>
    </>
  )
}

function AlignmentSvg() {
  return (
    <>
      <path className="aid-land" d="M20 164 L82 96 L132 126 L196 60 L300 164 Z" />
      <rect className="aid-chip output" x="62" y="48" width="92" height="40" rx="10" opacity="0.82" />
      <path className="aid-path" d="M42 154 C84 128, 122 118, 154 106 S210 78, 272 68" />
      <path className="aid-line" d="M48 128 C98 104, 152 96, 230 92" />
      <rect className="aid-chip prompt" x="220" y="34" width="70" height="30" rx="8" />
      <circle className="aid-dot alt" cx="170" cy="104" r="10" />
      <Callout x="268" y="68">1</Callout>
      <Callout x="70" y="126">2</Callout>
      <Callout x="96" y="66">3</Callout>
      <Callout x="170" y="104">4</Callout>
    </>
  )
}

function InferenceSvg() {
  const steps = [
    ['context', 16, 66],
    ['states', 100, 66],
    ['scores', 184, 66],
    ['next', 252, 66]
  ]
  return (
    <>
      {steps.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={label === 'next' ? 'aid-box output' : 'aid-box'} x={Number(x)} y={Number(y)} width={label === 'next' ? 52 : 64} height="42" rx="8" />
          <Label x={Number(x) + 9} y={Number(y) + 26} className={label === 'next' ? 'tiny dark' : 'tiny'}>{label}</Label>
          {index < 3 && <path className="aid-line" d={`M${Number(x) + 64} ${Number(y) + 21} H${Number(steps[index + 1][1])}`} />}
        </g>
      ))}
      <rect className="aid-box prompt" x="86" y="146" width="142" height="32" rx="8" />
      <Label x="116" y="167" className="tiny dark">weights fixed</Label>
      <Callout x="42" y="48">1</Callout>
      <Callout x="160" y="132">2</Callout>
      <Callout x="220" y="46">3</Callout>
    </>
  )
}

function PromptResponseSvg() {
  const rowOne = [
    ['A', 22, 22],
    ['jealous', 46, 50],
    ['dog', 100, 34],
    ['chased', 138, 54],
    ['a', 196, 22],
    ['startled', 222, 60]
  ]
  const rowTwo = [
    ['cat', 46, 34],
    ['across', 84, 54],
    ['the', 142, 34],
    ['kitchen', 180, 60]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="16" y="14" width="288" height="40" rx="8" />
      <Label x="34" y="39" className="tiny dark">User prompt</Label>
      <Callout x="292" y="24">1</Callout>

      <rect className="aid-box muted" x="16" y="68" width="288" height="76" rx="8" />
      <Label x="24" y="88" className="tiny">response so far</Label>
      {rowOne.map(([token, x, width]) => <TokenChip key={`${token}-${x}`} token={token} x={x} y="98" width={width} />)}
      {rowTwo.map(([token, x, width]) => <TokenChip key={`${token}-${x}`} token={token} x={x} y="126" width={width} />)}
      <Callout x="292" y="80">2</Callout>

      <Label x="82" y="167" className="tiny">next token</Label>
      <TokenChip token="floor" x="158" y="150" width="48" />
      <Callout x="220" y="158">3</Callout>

      <rect className="aid-box prompt" x="38" y="182" width="244" height="22" rx="8" />
      <Label x="78" y="198" className="tiny dark">prompt + response + floor</Label>
    </>
  )
}

function TokenSvg() {
  const row1 = [
    ['A', 18, 22],
    ['jealous', 44, 52],
    ['dog', 100, 36],
    ['chased', 140, 56],
    ['a', 200, 22],
    ['startled', 226, 64]
  ]
  const row2 = [
    ['cat', 34, 34],
    ['across', 72, 56],
    ['the', 132, 34],
    ['kitchen', 170, 62],
    ['floor', 236, 46],
    ['.', 286, 20]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="26" y="34" width="260" height="34" rx="8" />
      <Label x="110" y="56" className="tiny dark">response text</Label>
      {[...row1, ...row2].map(([token, x, width], index) => (
        <g key={`${token}-${index}`}>
          <rect className={token === '.' ? 'aid-chip output' : 'aid-chip'} x={Number(x)} y={index < row1.length ? 104 : 142} width={Number(width)} height="26" rx="7" />
          <Label x={Number(x) + 6} y={index < row1.length ? 122 : 160} className={token === '.' ? 'tiny dark' : 'tiny'}>{token}</Label>
        </g>
      ))}
      <Arrow x1="160" y1="68" x2="160" y2="104" />
      <Callout x="286" y="86">1</Callout>
      <Callout x="286" y="184">2</Callout>
    </>
  )
}

function IdsSvg() {
  const rows = canonicalPromptResponse.tokenIds
  return (
    <>
      {rows.map((row, index) => (
        <g key={row.token}>
          <rect className="aid-chip prompt" x="28" y={38 + index * 44} width="62" height="28" rx="8" />
          <Label x="42" y={57 + index * 44} className="tiny dark">{row.token}</Label>
          <rect className="aid-box" x="128" y={36 + index * 44} width="66" height="32" rx="8" />
          <Label x="142" y={57 + index * 44} className="tiny">ID {row.id}</Label>
          <Arrow x1="90" y1={52 + index * 44} x2="128" y2={52 + index * 44} />
          <Arrow x1="194" y1={52 + index * 44} x2="232" y2={52 + index * 44} />
        </g>
      ))}
      <rect className="aid-box output" x="232" y="56" width="62" height="90" rx="8" />
      {[0, 1, 2, 3].map((bar) => (
        <rect key={bar} className="aid-bar dark-bar" x={244 + bar * 11} y={126 - bar * 10} width="7" height={18 + bar * 10} rx="3" />
      ))}
      <Label x="250" y="78" className="tiny dark">row</Label>
      <rect className="aid-box muted" x="76" y="170" width="170" height="26" rx="8" />
      <Label x="98" y="188" className="tiny">lookup key</Label>
    </>
  )
}

function EmbeddingSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="22" y="42" width="70" height="38" rx="8" />
      <Label x="36" y="66" className="tiny dark">ID 1576</Label>
      <rect className="aid-box muted" x="122" y="24" width="86" height="132" rx="8" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect className={row === 2 ? 'aid-chip output' : 'aid-chip'} x="136" y={42 + row * 26} width="58" height="18" rx="5" />
          <Label x="144" y={56 + row * 26} className={row === 2 ? 'tiny dark' : 'tiny'}>row {row + 1}</Label>
        </g>
      ))}
      <rect className="aid-box" x="236" y="72" width="78" height="54" rx="8" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} className="aid-bar" x={248 + bar * 12} y={112 - bar * 6} width="8" height={14 + bar * 6} rx="3" />
      ))}
      <Arrow x1="92" y1="61" x2="122" y2="94" />
      <Arrow x1="194" y1="94" x2="236" y2="98" />
      <Callout x="60" y="96">1</Callout>
      <Callout x="168" y="168">2</Callout>
      <Callout x="278" y="144">3</Callout>
    </>
  )
}

function VectorSvg() {
  const rows = [
    ['animal-ish', 78],
    ['grammar role', 48],
    ['tone', 36],
    ['position', 66],
    ['context clue', 88]
  ]
  return (
    <>
      <rect className="aid-box muted" x="28" y="24" width="264" height="158" rx="10" />
      <Label x="40" y="48" className="tiny">simplified</Label>
      {rows.map(([label, width], index) => (
        <g key={label}>
          <Label x="42" y={72 + index * 24} className="tiny">{label}</Label>
          <rect className="aid-box" x="132" y={58 + index * 24} width="132" height="14" rx="6" />
          <rect className="aid-bar horizontal" x="132" y={58 + index * 24} width={Number(width)} height="14" rx="6" />
        </g>
      ))}
      <Label x="82" y="198" className="tiny">distributed features</Label>
      <Callout x="278" y="44">1</Callout>
      <Callout x="278" y="158">2</Callout>
    </>
  )
}

function TensorSvg() {
  const tokens = ['dog', 'cat', 'floor']
  const features = [0, 1, 2, 3, 4]
  return (
    <>
      <rect className="aid-sheet" x="64" y="38" width="216" height="124" rx="10" />
      {tokens.map((token, row) => (
        <g key={token}>
          <Label x="22" y={72 + row * 34} className="tiny">{token}</Label>
          {features.map((feature) => (
            <rect key={`${token}-${feature}`} className="aid-cell" x={78 + feature * 38} y={56 + row * 34} width="24" height="22" rx="5" />
          ))}
        </g>
      ))}
      <path className="aid-line" d="M60 38 V162" />
      <path className="aid-line" d="M64 168 H280" />
      <Label x="12" y="32" className="tiny">tokens</Label>
      <Label x="138" y="194" className="tiny">features</Label>
      <rect className="aid-box muted" x="188" y="18" width="94" height="24" rx="8" />
      <Label x="200" y="35" className="tiny">batch note</Label>
      <Callout x="54" y="52">1</Callout>
      <Callout x="256" y="174">2</Callout>
      <Callout x="284" y="28">3</Callout>
    </>
  )
}

function AttentionSvg() {
  const points = [[52, 64], [122, 64], [192, 64], [262, 64], [122, 148], [222, 148]]
  return (
    <>
      <path className="aid-arc" d="M122 148 Q160 30 262 64" />
      <path className="aid-arc alt" d="M222 148 Q164 96 52 64" />
      {points.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle className="aid-node" cx={x} cy={y} r="22" />
          <Label x={x - 10} y={y + 5} className="tiny">t{index + 1}</Label>
        </g>
      ))}
      <Label x="104" y="190" className="tiny">relevance weights</Label>
    </>
  )
}

function MlpSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="28" y="82" width="70" height="44" rx="8" />
      <Gear x={134} y={72} r={30} />
      <Gear x={176} y={112} r={24} alt />
      <rect className="aid-box output" x="228" y="82" width="70" height="44" rx="8" />
      <Arrow x1="98" y1="104" x2="128" y2="104" />
      <Arrow x1="200" y1="104" x2="228" y2="104" />
      <Label x="38" y="108" className="tiny dark">token</Label>
      <Label x="236" y="108" className="tiny dark">features</Label>
    </>
  )
}

function Gear({ x, y, r, alt = false }) {
  return <circle className={alt ? 'aid-gear alt' : 'aid-gear'} cx={x} cy={y} r={r} />
}

function LayersSvg() {
  return (
    <>
      {[0, 1, 2, 3].map((layer) => (
        <g key={layer}>
          <rect className="aid-box" x={34 + layer * 62} y={56 + layer * 14} width="70" height="94" rx="8" />
          <Label x={53 + layer * 62} y={102 + layer * 14} className="tiny">layer</Label>
        </g>
      ))}
      <path className="aid-path thin" d="M22 170 C86 136, 136 138, 184 122 S260 90, 304 92" />
      <Label x="112" y="192" className="tiny">carry forward</Label>
    </>
  )
}

function HiddenSvg() {
  return (
    <>
      <rect className="aid-chip prompt" x="42" y="42" width="94" height="38" rx="8" />
      <rect className="aid-box muted" x="72" y="106" width="176" height="70" rx="10" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} className="aid-bar" x={96 + bar * 26} y={150 - bar * 8} width="16" height={26 + bar * 8} rx="4" />
      ))}
      <Arrow x1="89" y1="80" x2="120" y2="106" />
      <Label x="54" y="66" className="tiny">embedding</Label>
      <Label x="116" y="192" className="tiny">temp shape</Label>
    </>
  )
}

function LogitsSvg() {
  return (
    <>
      {[
        ['floor', 114],
        ['room', 72],
        ['quantum', 28]
      ].map(([label, width], index) => (
        <g key={label}>
          <Label x="38" y={64 + index * 42} className="tiny">{label}</Label>
          <rect className="aid-bar horizontal" x="106" y={48 + index * 42} width={width} height="22" rx="6" />
        </g>
      ))}
      <Label x="118" y="178" className="tiny">raw scores</Label>
    </>
  )
}

function SoftmaxSvg() {
  return (
    <>
      <path className="aid-funnel" d="M52 42 H268 L198 116 V166 H122 V116 Z" />
      <Label x="78" y="72" className="tiny">raw scores</Label>
      <Label x="128" y="148" className="tiny">probabilities</Label>
      <circle className="aid-dot" cx="104" cy="94" r="9" />
      <circle className="aid-dot alt" cx="168" cy="94" r="9" />
      <circle className="aid-dot" cx="230" cy="94" r="9" />
    </>
  )
}

function SamplingSvg() {
  return (
    <>
      {[
        ['floor', 52, 70, 32],
        ['room', 138, 58, 24],
        ['tiles', 220, 78, 20],
        ['quantum', 172, 132, 16]
      ].map(([label, x, y, r]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r={Number(r)} />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-select" d="M52 70 L100 172 L140 108" />
      <Label x="118" y="190" className="tiny">one token</Label>
    </>
  )
}

function LoopSvg() {
  return (
    <>
      {['next', 'append', 'run again'].map((label, index) => (
        <g key={label}>
          <rect className="aid-box" x={34 + index * 88} y="74" width="72" height="42" rx="8" />
          <Label x={43 + index * 88} y="99" className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-arc" d="M258 74 C298 28, 34 28, 34 74" />
      <Label x="112" y="160" className="tiny">append repeat</Label>
    </>
  )
}

function WindowSvg() {
  return (
    <>
      <rect className="aid-box muted" x="74" y="42" width="174" height="116" rx="10" />
      {['old', 'prompt', 'example', 'tone', 'next'].map((label, index) => (
        <g key={label}>
          <rect className={index === 0 ? 'aid-chip faded' : 'aid-chip'} x={22 + index * 58} y={86} width="48" height="34" rx="8" />
          <Label x={29 + index * 58} y="108" className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="112" y="178" className="tiny">visible input</Label>
    </>
  )
}

function RagSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M38 176 C84 142, 128 142, 174 176" />
      <path className="aid-zen-ring alt" d="M146 188 C194 152, 242 154, 288 188" />

      <g className="rag-paper-node">
        <path className="aid-paper-node prompt" d="M16 34 H74 L88 48 V74 H16 Z" />
        <path className="aid-fold-line" d="M74 34 V48 H88" />
        <Label x="31" y="58" className="tiny dark">Prompt</Label>
      </g>
      <Callout x="22" y="32">1</Callout>

      <g className="rag-paper-node">
        <path className="aid-paper-node retriever" d="M116 26 H190 L206 42 V78 H116 Z" />
        <path className="aid-fold-line" d="M190 26 V42 H206" />
        <Label x="133" y="57" className="tiny dark">Retriever</Label>
      </g>
      <Callout x="204" y="30">2</Callout>

      <g className="rag-doc-stack">
        <path className="aid-doc-card" d="M236 24 H290 L302 36 V57 H236 Z" />
        <path className="aid-doc-card alt" d="M246 43 H298 L306 53 V76 H246 Z" />
        <Label x="260" y="64" className="tiny dark">Notes</Label>
      </g>
      <Callout x="300" y="43">3</Callout>

      <path className="aid-context-tray" d="M74 116 H222 L236 130 V162 H74 Z" />
      <path className="aid-fold-line light" d="M222 116 V130 H236" />
      <Label x="121" y="143" className="tiny">Context tray</Label>

      <path className="aid-paper-node output" d="M246 122 H298 L306 132 V164 H246 Z" />
      <Label x="254" y="147" className="tiny dark">Response</Label>
      <Callout x="302" y="127">4</Callout>

      <path className="aid-fixed-note" d="M24 170 H118 L128 180 V196 H24 Z" />
      <path className="aid-fold-line" d="M118 170 V180 H128" />
      <Label x="38" y="187" className="tiny dark">weights fixed</Label>
      <Callout x="142" y="181">5</Callout>

      <path className="aid-neon-path" d="M88 54 C104 40, 105 40, 116 52" />
      <path className="aid-neon-path" d="M206 52 C218 35, 224 34, 236 42" />
      <path className="aid-neon-path" d="M278 76 C278 96, 218 100, 190 116" />
      <path className="aid-neon-path" d="M236 142 C240 142, 242 142, 246 142" />
    </>
  )
}

function GroundingEvidenceSvg() {
  const evidenceCards = [
    ['PDF', 28, 34],
    ['Data', 106, 24],
    ['Tool', 184, 34]
  ]

  return (
    <>
      <path className="aid-zen-ring" d="M48 184 C94 152, 218 152, 272 184" />
      {evidenceCards.map(([label, x, y], index) => (
        <g key={label}>
          <path className={index === 1 ? 'aid-paper-node retriever' : 'aid-doc-card'} d={`M${x} ${y} H${Number(x) + 58} L${Number(x) + 70} ${Number(y) + 12} V${Number(y) + 42} H${x} Z`} />
          <path className="aid-fold-line" d={`M${Number(x) + 58} ${y} V${Number(y) + 12} H${Number(x) + 70}`} />
          <Label x={Number(x) + 15} y={Number(y) + 27} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 34} ${Number(y) + 42} C116 96, 150 100, 154 122`} />
        </g>
      ))}
      <Callout x="22" y="54">1</Callout>

      <path className="aid-context-tray" d="M56 120 H206 L222 136 V166 H56 Z" />
      <path className="aid-fold-line light" d="M206 120 V136 H222" />
      <Label x="104" y="147" className="tiny">Context</Label>
      <Callout x="72" y="120">2</Callout>

      <path className="aid-paper-node output" d="M238 116 H294 L306 128 V166 H238 Z" />
      <path className="aid-fold-line" d="M294 116 V128 H306" />
      <Label x="250" y="143" className="tiny dark">Answer</Label>
      <Callout x="304" y="116">3</Callout>

      <path className="aid-select" d="M266 166 C240 194, 116 194, 94 166" />
      <circle className="aid-callout" cx="94" cy="166" r="11" />
      <Label x="90" y="171" className="tiny dark">4</Label>
      <path className="aid-neon-path" d="M222 144 C226 144, 232 144, 238 144" />
    </>
  )
}

function HallucinationBridgeSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M44 184 C106 150, 214 150, 276 184" />
      <path className="aid-arc" d="M38 118 C86 56, 234 56, 282 118" />
      <Label x="112" y="64" className="tiny">fluent output</Label>
      <Callout x="62" y="106">1</Callout>

      <rect className="aid-chip output" x="54" y="104" width="58" height="28" rx="8" />
      <Label x="66" y="123" className="tiny dark">claim</Label>
      <rect className="aid-chip output" x="132" y="84" width="58" height="28" rx="8" />
      <Label x="144" y="103" className="tiny dark">claim</Label>
      <rect className="aid-chip output" x="210" y="104" width="58" height="28" rx="8" />
      <Label x="222" y="123" className="tiny dark">claim</Label>

      <rect className="aid-paper-node retriever" x="42" y="150" width="64" height="28" rx="8" />
      <Label x="56" y="169" className="tiny dark">source</Label>
      <path className="aid-line" d="M74 150 V130" />
      <path className="aid-line dashed" d="M160 142 V116" />
      <path className="aid-line dashed" d="M238 142 V130" />
      <Callout x="160" y="148">2</Callout>

      <path className="aid-fixed-note" d="M190 22 H292 L304 34 V56 H190 Z" />
      <path className="aid-fold-line" d="M292 22 V34 H304" />
      <Label x="204" y="41" className="tiny dark">check source</Label>
      <Callout x="292" y="60">3</Callout>

      <circle className="aid-dot alt" cx="160" cy="172" r="10" />
      <Label x="178" y="176" className="tiny">review</Label>
    </>
  )
}

function LearnsSvg() {
  return (
    <>
      {[
        ['weights', 'durable', 26],
        ['context', 'temporary', 118],
        ['retrieval', 'open book', 210]
      ].map(([top, bottom, x]) => (
        <g key={top}>
          <rect className="aid-box" x={x} y="62" width="78" height="74" rx="8" />
          <Label x={Number(x) + 11} y="91" className="tiny">{top}</Label>
          <Label x={Number(x) + 8} y="115" className="tiny muted-text">{bottom}</Label>
        </g>
      ))}
      <Label x="98" y="178" className="tiny">change types</Label>
    </>
  )
}

function DiffusionSvg() {
  return (
    <>
      {[0, 1, 2].map((step) => (
        <g key={step} transform={`translate(${38 + step * 92}, 58)`}>
          <rect className="aid-box muted" width="62" height="62" rx="8" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
            <rect key={cell} className={`aid-noise n-${step}`} x={9 + (cell % 3) * 17} y={9 + Math.floor(cell / 3) * 17} width="11" height="11" rx="3" />
          ))}
        </g>
      ))}
      <Arrow x1="100" y1="89" x2="130" y2="89" />
      <Arrow x1="192" y1="89" x2="222" y2="89" />
      <Label x="112" y="166" className="tiny">denoise steps</Label>
    </>
  )
}

function MultimodalSvg() {
  const modes = [
    ['text', 70, 62],
    ['image', 232, 62],
    ['audio', 70, 150],
    ['video', 232, 150]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="106" r="32" />
      <Label x="137" y="111" className="tiny dark">shared</Label>
      {modes.map(([label, x, y]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r="24" />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
          <path className="aid-line" d={`M${x} ${y} L160 106`} />
        </g>
      ))}
    </>
  )
}

function PerfectStormSvg() {
  const streams = [
    ['Data', 18, 36, 112, 84],
    ['Compute', 18, 142, 112, 122],
    ['Methods', 220, 34, 192, 84],
    ['Labor', 228, 142, 198, 122],
    ['Incentives', 112, 20, 150, 70]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="104" r="34" />
      <Label x="145" y="110" className="tiny dark">LLM</Label>
      {streams.map(([label, x, y, endX, endY], index) => (
        <g key={label}>
          <rect className="aid-paper-node" x={x} y={y} width={label === 'Incentives' ? 96 : 78} height="32" rx="8" />
          <Label x={Number(x) + 10} y={Number(y) + 21} className="tiny dark">{label}</Label>
          <path className={index % 2 ? 'aid-neon-path alt-path' : 'aid-neon-path'} d={`M${Number(x) + 39} ${Number(y) + 32} C${endX} ${endY}, ${endX} ${endY}, 160 104`} />
        </g>
      ))}
      <path className="aid-zen-ring" d="M74 184 C118 158, 202 158, 248 184" />
    </>
  )
}

function CollectiveLanternSvg() {
  const sources = [
    ['Books', 24, 40],
    ['Code', 36, 136],
    ['Art', 238, 40],
    ['Research', 222, 136]
  ]
  return (
    <>
      <path className="aid-zen-ring" d="M68 178 C110 148, 206 148, 252 178" />
      {sources.map(([label, x, y]) => (
        <g key={label}>
          <path className="aid-doc-card" d={`M${x} ${y} H${Number(x) + 56} L${Number(x) + 66} ${Number(y) + 10} V${Number(y) + 38} H${x} Z`} />
          <Label x={Number(x) + 9} y={Number(y) + 25} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 32} ${Number(y) + 38} C122 96, 136 96, 160 106`} />
        </g>
      ))}
      <path className="aid-paper-node output" d="M126 72 H194 L210 94 L194 136 H126 L110 94 Z" />
      <Label x="134" y="101" className="tiny dark">Lantern</Label>
      <circle className="aid-dot alt" cx="160" cy="106" r="13" />
      <path className="aid-neon-path" d="M194 106 C224 100, 244 102, 278 116" />
      <rect className="aid-box muted" x="246" y="96" width="50" height="38" rx="8" />
      <Label x="258" y="120" className="tiny">Model</Label>
    </>
  )
}

function BenefitsGardenSvg() {
  const tools = [
    ['Access', 58, 56],
    ['Search', 150, 36],
    ['Draft', 242, 56],
    ['Translate', 62, 146],
    ['Code', 158, 166],
    ['Research', 238, 146]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="104" r="34" />
      <Label x="138" y="110" className="tiny dark">Human</Label>
      {tools.map(([label, x, y]) => (
        <g key={label}>
          <path className="aid-line" d={`M${x} ${y} L160 104`} />
          <rect className="aid-paper-node" x={Number(x) - 32} y={Number(y) - 16} width="64" height="32" rx="8" />
          <Label x={Number(x) - 22} y={Number(y) + 5} className="tiny dark">{label}</Label>
        </g>
      ))}
      <path className="aid-zen-ring alt" d="M44 184 C102 150, 220 150, 278 184" />
    </>
  )
}

function CostsFactorySvg() {
  const costs = [
    ['Power', 36, 48],
    ['Water', 38, 132],
    ['Data', 130, 34],
    ['Labor', 224, 48],
    ['Privacy', 218, 132],
    ['Power', 122, 166]
  ]
  return (
    <>
      <rect className="aid-box output" x="122" y="82" width="76" height="42" rx="8" />
      <Label x="140" y="109" className="tiny dark">Answer</Label>
      {costs.map(([label, x, y], index) => (
        <g key={`${label}-${index}`}>
          <path className="aid-line" d={`M160 104 L${x} ${y}`} />
          <rect className={index % 2 ? 'aid-paper-node retriever' : 'aid-paper-node'} x={Number(x) - 30} y={Number(y) - 15} width="60" height="30" rx="8" />
          <Label x={Number(x) - 22} y={Number(y) + 5} className="tiny dark">{label}</Label>
        </g>
      ))}
      <path className="aid-fixed-note" d="M104 18 H212 L224 30 V50 H104 Z" />
      <Label x="124" y="37" className="tiny dark">not weightless</Label>
    </>
  )
}

function HumanGardenSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M60 108 C94 58, 226 58, 260 108 C226 158, 94 158, 60 108" />
      <circle className="aid-core" cx="160" cy="106" r="34" />
      <Label x="139" y="112" className="tiny dark">Person</Label>
      {[
        ['Dignity', 82, 70],
        ['Learning', 238, 70],
        ['Review', 84, 146],
        ['Common', 236, 146]
      ].map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-paper-node" x={Number(x) - 34} y={Number(y) - 15} width="68" height="30" rx="8" />
          <Label x={Number(x) - 24} y={Number(y) + 5} className="tiny dark">{label}</Label>
          <path className="aid-line" d={`M${x} ${y} L160 106`} />
        </g>
      ))}
      <path className="aid-neon-path" d="M44 184 C116 160, 206 160, 276 184" />
    </>
  )
}

function ResponsiblePathSvg() {
  return (
    <>
      <circle className="aid-callout" cx="70" cy="106" r="16" />
      <Label x="64" y="112" className="tiny dark">?</Label>
      <path className="aid-path" d="M84 106 C120 88, 142 72, 176 58 C214 42, 246 40, 286 52" />
      <path className="aid-path thin" d="M84 106 C122 126, 146 144, 180 154 C218 166, 248 166, 288 154" />
      <rect className="aid-paper-node" x="194" y="28" width="86" height="34" rx="8" />
      <Label x="206" y="50" className="tiny dark">Extract</Label>
      <rect className="aid-paper-node retriever" x="190" y="142" width="98" height="34" rx="8" />
      <Label x="202" y="164" className="tiny dark">Responsible</Label>
      <rect className="aid-fixed-note" x="22" y="34" width="92" height="34" rx="8" />
      <Label x="36" y="56" className="tiny dark">Choices</Label>
    </>
  )
}

function PromptingTraySvg() {
  const parts = [
    ['Task', 28, 36],
    ['Context', 106, 28],
    ['Examples', 196, 36],
    ['Evidence', 44, 88],
    ['Format', 208, 88]
  ]
  return (
    <>
      {parts.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={index % 2 ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width="78" height="28" rx="8" />
          <Label x={Number(x) + 10} y={Number(y) + 19} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 39} ${Number(y) + 28} C132 116, 170 116, 160 130`} />
        </g>
      ))}
      <path className="aid-context-tray" d="M68 126 H218 L234 142 V172 H68 Z" />
      <path className="aid-fold-line light" d="M218 126 V142 H234" />
      <Label x="116" y="153" className="tiny">Context tray</Label>
      <path className="aid-paper-node output" d="M246 132 H298 L306 142 V170 H246 Z" />
      <Label x="254" y="154" className="tiny dark">Response</Label>
      <path className="aid-neon-path" d="M234 150 C238 150, 242 150, 246 150" />
    </>
  )
}

function SynthesisMapSvg() {
  return (
    <>
      <path className="aid-paper-node" d="M28 50 H124 L138 64 V142 H28 Z" />
      <path className="aid-fold-line" d="M124 50 V64 H138" />
      <Label x="54" y="94" className="tiny dark">Map</Label>
      <circle className="aid-core" cx="190" cy="96" r="32" />
      <circle className="aid-callout" cx="190" cy="96" r="17" />
      <path className="aid-select" d="M181 100 L198 88" />
      <Label x="164" y="140" className="tiny">Compass</Label>
      <path className="aid-paper-node output" d="M242 62 H292 L304 88 L292 132 H242 L230 88 Z" />
      <Label x="244" y="101" className="tiny dark">Lantern</Label>
      <path className="aid-neon-path" d="M138 96 C154 86, 162 86, 172 94" />
      <path className="aid-neon-path" d="M208 96 C220 92, 224 92, 230 96" />
      <rect className="aid-fixed-note" x="84" y="166" width="152" height="30" rx="8" />
      <Label x="102" y="186" className="tiny dark">Mechanics + judgment</Label>
    </>
  )
}

function RiskSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="30" y="52" width="122" height="52" rx="8" />
      <rect className="aid-box output" x="168" y="52" width="122" height="52" rx="8" />
      <Label x="58" y="82" className="dark">real risk</Label>
      <Label x="204" y="82" className="dark">myth</Label>
      {['privacy', 'over-trust', 'self-aware'].map((label, index) => (
        <g key={label}>
          <rect className={index === 2 ? 'aid-chip faded' : 'aid-chip'} x={44 + index * 82} y="138" width="72" height="34" rx="8" />
          <Label x={51 + index * 82} y="160" className="tiny">{label}</Label>
        </g>
      ))}
    </>
  )
}
