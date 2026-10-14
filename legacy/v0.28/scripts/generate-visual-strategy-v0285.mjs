import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { visualAidReadinessBriefs, VERSION as sourceBriefVersion } from './visual-aid-readiness-data-v0283.mjs'

const root = process.cwd()
const version = '0.28.5'
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const strategyJsonPath = path.join(outDir, 'visual-aid-strategy-v0-28-5.json')
const strategyCsvPath = path.join(outDir, 'visual-aid-strategy-v0-28-5.csv')
const strategyMdPath = path.join(outDir, 'visual-aid-strategy-v0-28-5.md')
const promptPacketPath = path.join(outDir, 'image-2-production-prompts-v0-28-5.md')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-5-visual-strategy-reset-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-5-visual-strategy-reset-report.pdf')

const CATEGORIES = {
  image2: 'Image 2 Concept Card',
  coded: 'Coded Mechanism Mini-Diagram',
  board: 'HTML Comparison Board',
  remove: 'No Visual Needed / Text Callout Only'
}

const style = 'ZenTron Origami: calm, futuristic, humane, mobile-first. Anime clarity, Tron-like indigo/cyan/violet glow, Japanese paper-cut/origami influence. Avoid clutter.'
const negativePromptBase = 'tiny text, pseudo-text, fake dashboards, complex flowcharts, fragile axes, exact probabilities, photorealistic identifiable people, horror AI imagery, conscious robots, robot faces, generic corporate clipart, clutter, unreadable labels, logos, charts, UI chrome'
const aspectRatio = '16:9 wide landscape, mobile-safe center composition'

const strategy = {
  'what-is-llm': {
    category: CATEGORIES.image2,
    currentProblem: 'Opening visual is useful, but it should be treated as a polished conceptual image, not a mechanics diagram.',
    reason: 'This card needs to reduce mystery and set tone; exact next-token mechanics are better handled by HTML callouts.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep or regenerate as a textless Image 2 concept card showing prompt input, learned model cloud, and one token emerging.',
    topTenRank: 8
  },
  'where-llms-fit': {
    category: CATEGORIES.coded,
    currentProblem: 'The family-tree relationship is exact enough that a generated image could blur category boundaries.',
    reason: 'Learners must see nested/related categories clearly: AI, machine learning, deep learning, generative AI, LLMs, diffusion, and multimodal.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep as a coded minimal branch/taxonomy visual with short labels and tap-to-reveal explanations.'
  },
  history: {
    category: CATEGORIES.board,
    currentProblem: 'The concept is a boundary between rules-first AI, learned patterns, and hybrids.',
    reason: 'A simple board teaches the distinction better than a decorative image or flowchart.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep as an HTML comparison board; keep loss explanation in callouts/glossary, not inside the board.'
  },
  training: {
    category: CATEGORIES.coded,
    currentProblem: 'Training depends on exact step order and the durable weight-update distinction.',
    reason: 'Prediction, loss, optimizer, and weight update must remain mechanically controlled.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep a coded 4-5 step loop with one highlighted durable weight-update step.'
  },
  pretraining: {
    category: CATEGORIES.image2,
    currentProblem: 'Scale and broad pattern learning are conceptual; exact mechanics belong in callouts.',
    reason: 'A polished static image can show many examples shaping a model without implying perfect memory.',
    priority: 'P1 before human testing',
    exactNextAction: 'Use a textless Image 2 concept card showing many blank paper streams shaping a model horizon.'
  },
  'overfitting-generalization': {
    category: CATEGORIES.board,
    currentProblem: 'The current plot is readable but still risks feeling like a math chart before learners need one.',
    reason: 'The key boundary is training-fit versus validation transfer; a board with one small curve example is enough.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep or convert to an HTML comparison board: memorizes old examples versus transfers to set-aside examples.'
  },
  'fine-tuning': {
    category: CATEGORIES.board,
    currentProblem: 'This card is a durable-versus-temporary boundary, not an atmospheric concept.',
    reason: 'Fine-tuning must be separated from prompting, retrieval, and sampling with high precision.',
    priority: 'P1 before human testing',
    exactNextAction: 'Lock as an HTML comparison board with durable update on one side and current-run steering on the other.'
  },
  alignment: {
    category: CATEGORIES.image2,
    currentProblem: 'Behavior shaping is conceptual and social; a coded mechanism can imply false precision.',
    reason: 'Image 2 can carry the calm behavior-shaping metaphor while HTML callouts state the conscience boundary.',
    priority: 'P1 before human testing',
    exactNextAction: 'Use a textless Image 2 concept card; keep alignment-versus-conscience language in HTML callouts.'
  },
  inference: {
    category: CATEGORIES.coded,
    currentProblem: 'Inference requires the fixed-weights versus temporary-activation distinction.',
    reason: 'Exact flow matters: context enters, fixed weights are used, temporary values form, scores emerge, next token is selected.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep as a coded vertical mechanism strip with no paragraph text in the diagram.'
  },
  'prompt-response': {
    category: CATEGORIES.coded,
    currentProblem: 'Prompt/response must show generated tokens being appended to context.',
    reason: 'This is one of the core mental models; static art would blur given input versus generated output.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep the crisp stacked coded layout: prompt, response so far, next token, updated context.'
  },
  tokens: {
    category: CATEGORIES.coded,
    currentProblem: 'Tokenization needs exact chips and uneven splits without awkward wrapping.',
    reason: 'Learners must see tokens are not always words.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep as coded token chips with short labels and wrapped rows.'
  },
  'token-ids': {
    category: CATEGORIES.coded,
    currentProblem: 'Token ID lookup is an exact mapping, not a metaphor.',
    reason: 'The visual must separate surface text, token chunk, ID, and later vector lookup.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep a coded lookup mini-diagram with chips and IDs only.'
  },
  embeddings: {
    category: CATEGORIES.coded,
    currentProblem: 'Embedding is often confused with hidden state, so the lookup boundary must stay explicit.',
    reason: 'A coded table/tray can show learned starting vector without implying current-context shaping.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded lookup: token ID enters a learned table and returns a starting vector.'
  },
  vectors: {
    category: CATEGORIES.remove,
    currentProblem: 'The current feature-vector visual risks fake precision and may add little beyond the text.',
    reason: 'For this audience, a concise callout can say vector equals ordered numbers carrying learned features without requiring a diagram.',
    priority: 'P0 before human testing',
    exactNextAction: 'Remove or replace with a text callout only; if retained later, use one simple row of numbered chips with no axes.',
    topTenRank: 1
  },
  tensors: {
    category: CATEGORIES.remove,
    currentProblem: 'The tensor block can look like an arbitrary grid and may create more confusion than clarity.',
    reason: 'The minimum learning objective is that tensors are shaped arrays; callouts can do that without a fake geometry.',
    priority: 'P0 before human testing',
    exactNextAction: 'Remove or replace with a callout-only explanation; defer any coded tensor shape until after learner feedback.',
    topTenRank: 2
  },
  attention: {
    category: CATEGORIES.coded,
    currentProblem: 'Attention must remain weighted token-to-token relevance, not human awareness.',
    reason: 'Exact token arcs and weights should be controlled in code.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep a coded token-arc mini-diagram with 1-3 word labels and no long text.',
    topTenRank: 9
  },
  mlp: {
    category: CATEGORIES.board,
    currentProblem: 'The lesson depends on distinguishing attention from MLP behavior.',
    reason: 'A board can compare across-token relevance with per-token feature reshaping.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep as an HTML comparison board: Attention connects positions; MLP reshapes each token.'
  },
  layers: {
    category: CATEGORIES.coded,
    currentProblem: 'Layer order and carry-forward behavior are exact enough to keep coded.',
    reason: 'A minimal strip can show repeated transformations without dense wiring.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded vertical strip; do not add internal layer math.'
  },
  'hidden-states': {
    category: CATEGORIES.board,
    currentProblem: 'The card teaches a three-way distinction: embedding, hidden state, and weight.',
    reason: 'A comparison board is clearer than a flowchart.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep as HTML comparison board with short headings and detailed callouts below.'
  },
  logits: {
    category: CATEGORIES.coded,
    currentProblem: 'Raw scores need visual precision and must not look like probabilities or truth.',
    reason: 'Probability bars/scores require controlled values.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded raw-score bars with HTML callout saying scores are not probabilities.'
  },
  softmax: {
    category: CATEGORIES.coded,
    currentProblem: 'Softmax is a precise conversion from raw scores to probabilities.',
    reason: 'Exact score-to-probability relationship should stay coded.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded transformation visual with the same token set as logits/sampling.'
  },
  sampling: {
    category: CATEGORIES.coded,
    currentProblem: 'Sampling must separate probability from truth and from the final choice.',
    reason: 'The learner needs controlled probability bars and one selected next token.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded probability bars plus one selected token; no exact tiny numbers required.'
  },
  autoregression: {
    category: CATEGORIES.coded,
    currentProblem: 'Append-and-repeat is core process mechanics.',
    reason: 'A coded mini-diagram can show next token, append, run again, context grows.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded repeat loop with four short steps.'
  },
  'context-window': {
    category: CATEGORIES.coded,
    currentProblem: 'Context window is a temporary boundary; it must not look like permanent memory.',
    reason: 'A coded tray/stack can show what fits and what falls out.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep coded tray with visible limit and fall-out area.'
  },
  'rag-retrieval': {
    category: CATEGORIES.coded,
    currentProblem: 'RAG is retrieval plus context, not model learning.',
    reason: 'The outside-document search step and current-context insertion need exact control.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep coded retrieval shelf/tray: user prompt, retriever, retrieved cards, context tray, generated response.'
  },
  grounding: {
    category: CATEGORIES.coded,
    currentProblem: 'Grounding must show claim-to-evidence support without guaranteeing truth.',
    reason: 'Support lines, missing support, and review markers need careful control.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep coded claim/evidence support map with sparse labels.',
    topTenRank: 10
  },
  hallucinations: {
    category: CATEGORIES.board,
    currentProblem: 'The key distinction is fluent supported output versus fluent unsupported output.',
    reason: 'A comparison board can teach hallucination versus lying without spooky imagery.',
    priority: 'P1 before human testing',
    exactNextAction: 'Use/keep HTML comparison board: supported claim, unsupported claim, review.'
  },
  'how-ai-learns': {
    category: CATEGORIES.board,
    currentProblem: 'This card compares modes; a flowchart invites false sequence thinking.',
    reason: 'Training, fine-tuning, RAG, prompting, and evaluation should be shown as categories, not steps in one process.',
    priority: 'P1 before human testing',
    exactNextAction: 'Use/keep HTML comparison board with durable change versus current-run support.'
  },
  diffusion: {
    category: CATEGORIES.board,
    currentProblem: 'The lesson is a boundary between autoregressive text and diffusion denoising.',
    reason: 'A two-lane comparison board is clearer than a generative art scene.',
    priority: 'P1 before human testing',
    exactNextAction: 'Keep HTML comparison board: append tokens versus denoise pattern.'
  },
  multimodal: {
    category: CATEGORIES.image2,
    currentProblem: 'The current media-lane map is serviceable but still feels diagrammatic and may not need exact wiring.',
    reason: 'Multimodal is a conceptual family idea; Image 2 can show multiple media streams represented together while HTML explains boundaries.',
    priority: 'P0 before human testing',
    exactNextAction: 'Replace with textless Image 2 concept card showing text, image, audio, and video-like paper forms entering one shared representation field.',
    topTenRank: 3
  },
  'perfect-storm': {
    category: CATEGORIES.image2,
    currentProblem: 'Convergence diagrams have repeatedly created label/alignment pressure on mobile.',
    reason: 'A conceptual storm-front image can show convergence while callouts name data, compute, storage, methods, labor, and incentives.',
    priority: 'P0 before human testing',
    exactNextAction: 'Replace with Image 2 concept card; keep all ingredient labels in HTML callouts.',
    topTenRank: 4
  },
  'collective-intelligence': {
    category: CATEGORIES.image2,
    currentProblem: 'The concept is cultural and provenance-focused; coded nodes feel thin.',
    reason: 'Image 2 can make human-created traces and rights/provenance questions feel concrete without fake mechanics.',
    priority: 'P1 before human testing',
    exactNextAction: 'Replace or supplement with a textless Image 2 lantern/source-traces concept card.'
  },
  'costs-we-must-count': {
    category: CATEGORIES.image2,
    currentProblem: 'Cost ledgers risk fake dashboard language and false precision.',
    reason: 'A static concept image can show hidden infrastructure and institutional costs without invented metrics.',
    priority: 'P0 before human testing',
    exactNextAction: 'Replace with a textless Image 2 infrastructure/ledger scene; keep cost categories in HTML.',
    topTenRank: 5
  },
  'risk-myth': {
    category: CATEGORIES.image2,
    currentProblem: 'Risk visuals can easily become spooky or too ledger-like.',
    reason: 'A polished concept image can separate real-world grounded risk from myth while callouts do the exact sorting.',
    priority: 'P0 before human testing',
    exactNextAction: 'Replace with textless Image 2 concept card showing a grounded path beside misty myth shapes; keep labels outside.',
    topTenRank: 6
  },
  'benefits-worth-taking-seriously': {
    category: CATEGORIES.image2,
    currentProblem: 'Benefit chips are readable but feel utilitarian for a hope/bounds lesson.',
    reason: 'A calm tool-garden image can convey useful bounded benefit without hype.',
    priority: 'P1 before human testing',
    exactNextAction: 'Replace with textless Image 2 tool-garden concept card and keep benefit tiers in HTML.'
  },
  'human-centered-ai': {
    category: CATEGORIES.image2,
    currentProblem: 'Accountability flow is accurate but visually administrative.',
    reason: 'A humane concept image can put dignity, review, and accountable action at the center.',
    priority: 'P1 before human testing',
    exactNextAction: 'Replace with textless Image 2 human-centered decision-support scene; callouts carry governance specifics.'
  },
  'better-ai-choice': {
    category: CATEGORIES.image2,
    currentProblem: 'Lever panels can feel like a fake control dashboard.',
    reason: 'The lesson is about human choices and governance, so a concept image plus callouts is stronger.',
    priority: 'P1 before human testing',
    exactNextAction: 'Replace with Image 2 forked-path/control-choice scene; keep data, evaluation, policy, review, and incentives in HTML.'
  },
  'effective-prompting-literacy': {
    category: CATEGORIES.coded,
    currentProblem: 'Prompting depends on context packing, evidence, format, and review in one run.',
    reason: 'The context tray is exact and should remain coded.',
    priority: 'P2 keep through testing',
    exactNextAction: 'Keep coded tray/stack visual with short prompt-part chips.'
  },
  'model-literate-synthesis': {
    category: CATEGORIES.image2,
    currentProblem: 'The capstone board remains abstract and can feel like a summary dashboard.',
    reason: 'A final concept image can integrate mechanics, evidence, and human responsibility while HTML callouts stay precise.',
    priority: 'P0 before human testing',
    exactNextAction: 'Replace with textless Image 2 compass/lantern/map concept card; keep three synthesis callouts below.',
    topTenRank: 7
  }
}

const imagePromptDetails = {
  'what-is-llm': {
    purpose: 'Reduce mystery by showing a prompt entering a learned model space and one token emerging, without implying consciousness.',
    prompt: 'Textless ZenTron Origami concept image. A luminous prompt ribbon enters a folded-paper crystalline model cloud, passes through calm layered facets, and one small response-token glow emerges on the other side. Deep navy background, cyan and violet neon edges, humane academic tone, clear mobile composition, no words, no letters, no numbers, no UI, no robot, no brain.',
    altText: 'A prompt ribbon enters a folded-paper model cloud and one response-token glow emerges.'
  },
  pretraining: {
    purpose: 'Show broad pattern learning from many examples without implying perfect source memory.',
    prompt: 'Textless ZenTron Origami scene. Many blank folded-paper streams suggest books, code, articles, and examples without readable text. The streams move toward a calm model horizon where durable glowing pattern layers form. Wide spacious composition, deep indigo/cyan/violet glow, no words, no letters, no numbers, no readable documents, no data-hoarding monster, no dashboard.',
    altText: 'Many blank paper streams shape glowing model pattern layers before use.'
  },
  alignment: {
    purpose: 'Show behavior shaping and guardrails while keeping the conscience boundary explicit in HTML.',
    prompt: 'Textless ZenTron Origami behavior-shaping garden. Folded paths are gently guided by soft cyan guardrails and feedback lanterns toward safer response areas. Calm scholarly mood, humane but not utopian, no words, no letters, no numbers, no robot judge, no moral halo, no conscious face, no courtroom.',
    altText: 'Folded paths and light guardrails suggest behavior shaping without a conscious model.'
  },
  multimodal: {
    purpose: 'Show multiple media types represented together without implying human sensation.',
    prompt: 'Textless ZenTron Origami concept image. Abstract folded-paper forms representing text strips, image tiles, audio waves, and video frames flow into a shared glowing representation field, then emerge as a simple output ribbon. Mobile-safe, clear grouping, deep navy with cyan/violet light, no words, no letters, no numbers, no camera UI, no face, no robot senses.',
    altText: 'Text, image, audio, and video-like paper forms flow into a shared representation field.'
  },
  'perfect-storm': {
    purpose: 'Show convergence of conditions behind modern LLMs without a cramped ingredient diagram.',
    prompt: 'Textless ZenTron Origami storm-front scene. Six distinct folded-paper streams converge gently into one bright modern capability cloud: data-like pages, compute facets, storage layers, method folds, human-work traces, and market/institution currents. No labels, no words, no numbers, no dashboard, no lightning miracle, no single spark, no scary storm.',
    altText: 'Several folded-paper streams converge into one modern capability cloud.'
  },
  'collective-intelligence': {
    purpose: 'Show human-created traces powering model patterns while provenance questions remain human.',
    prompt: 'Textless ZenTron Origami lantern scene. Many blank human-created traces, including paper pages, code-like blank strips, art-like folded fragments, research notes, and forum-like cards, softly light a central lantern of learned patterns. A separate folded note shape sits beside the lantern for provenance questions. No readable text, no faces, no robot, no surveillance, no copyrighted-looking page layouts.',
    altText: 'Many blank human-created traces light a folded-paper lantern of learned patterns.'
  },
  'costs-we-must-count': {
    purpose: 'Make hidden infrastructure and social costs visible without inventing metrics.',
    prompt: 'Textless ZenTron Origami ledger-and-infrastructure scene. A small glowing answer card rests above layered folded infrastructure: cooling channels, chip facets, energy lines, labor traces, privacy veil, and governance ledger shapes. Serious but calm, deep navy/cyan/violet with restrained amber, no words, no numbers, no charts, no invoices, no disaster scene, no villain robot.',
    altText: 'A glowing answer card is connected to hidden infrastructure, labor, privacy, and governance shapes.'
  },
  'risk-myth': {
    purpose: 'Separate practical risk literacy from spooky myths without fearmongering.',
    prompt: 'Textless ZenTron Origami risk-literacy scene. One grounded path has clear evidence stones, privacy veil, review lantern, and tool boundary rails. Beside it, misty abstract myth shapes fade without faces or monsters. Calm academic tone, deep indigo/cyan/violet, no words, no labels, no skulls, no horror AI, no apocalypse, no robot pretending to be conscious.',
    altText: 'A grounded review path sits beside fading myth shapes, suggesting practical risk literacy.'
  },
  'benefits-worth-taking-seriously': {
    purpose: 'Show bounded, reviewed benefits without hype.',
    prompt: 'Textless ZenTron Origami tool garden. Practical folded tools for access, translation, summarizing, drafting, and search sit in tidy garden beds with review lanterns and modest guardrails. Hopeful but bounded, calm academic style, no utopian city, no miracle glow, no money rain, no words, no numbers, no labels, no robot replacing people.',
    altText: 'A calm folded-paper tool garden shows useful AI supports with review lanterns.'
  },
  'human-centered-ai': {
    purpose: 'Put dignity, human judgment, review, and governance ahead of automation.',
    prompt: 'Textless ZenTron Origami human-centered decision-support scene. Abstract folded-paper people silhouettes surround a warm decision table. A small AI output card supports the table but does not sit at the center. Review, appeal, and governance are suggested by gentle light rails. No faces, no robot judge, no courtroom, no moral halo, no words, no labels.',
    altText: 'Human-centered decision shapes surround a support card, with review and governance rails visible.'
  },
  'better-ai-choice': {
    purpose: 'Show better AI as a set of human design and governance choices, not destiny.',
    prompt: 'Textless ZenTron Origami forked-path scene. Folded paths branch around abstract choice levers for data care, evaluation, policy, human review, and incentives, but without readable labels. The better path is calm, accountable, and well-lit; the neglected path is dim but not frightening. No dashboard, no UI, no words, no numbers, no robot, no corporate clipart.',
    altText: 'Folded paths and abstract levers suggest better AI as a human choice.'
  },
  'model-literate-synthesis': {
    purpose: 'Close the Journey with an integrated mental model: mechanics, evidence, and human responsibility.',
    prompt: 'Textless ZenTron Origami capstone scene. A compass, lantern, and folded map sit together: one area suggests model mechanics with token chips and probability glow, one area suggests evidence checking with source cards, and one area suggests human responsibility with a steady review path. Unified, calm, mobile-first, no words, no letters, no numbers, no dashboard, no robot, no brain.',
    altText: 'A compass, lantern, and folded map integrate model mechanics, evidence checking, and human responsibility.'
  }
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function mdEscape(value) {
  return String(value ?? '').replaceAll('|', '\\|').replace(/\n/g, ' ')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function categoryId(category) {
  if (category === CATEGORIES.image2) return 'image2'
  if (category === CATEGORIES.coded) return 'coded'
  if (category === CATEGORIES.board) return 'board'
  if (category === CATEGORIES.remove) return 'remove'
  return 'unknown'
}

function buildRows() {
  return visualAidReadinessBriefs.map((brief) => {
    const decision = strategy[brief.learningCardId]
    if (!decision) {
      throw new Error(`Missing v0.28.5 strategy decision for ${brief.learningCardId}`)
    }
    return {
      stage: brief.stageTitle,
      stageNumber: brief.stageNumber,
      cardId: brief.learningCardId,
      cardTitle: brief.learningCardTitle,
      currentVisualId: brief.currentVisualId,
      currentVisualTitle: brief.currentVisualTitle,
      currentVisualType: brief.currentVisualType,
      currentProblem: decision.currentProblem,
      newRecommendedCategory: decision.category,
      reason: decision.reason,
      image2Allowed: decision.category === CATEGORIES.image2,
      codedVisualRequired: decision.category === CATEGORIES.coded,
      removeVisual: decision.category === CATEGORIES.remove,
      priority: decision.priority,
      exactNextAction: decision.exactNextAction,
      topTenRank: decision.topTenRank ?? null,
      existingTemplate: brief.selectedCanonicalTemplate,
      sourceBriefVersion
    }
  })
}

function summarize(rows) {
  const count = (category) => rows.filter((row) => row.newRecommendedCategory === category).length
  return {
    version,
    totalCards: rows.length,
    image2ConceptCards: count(CATEGORIES.image2),
    codedMechanicMiniDiagrams: count(CATEGORIES.coded),
    htmlComparisonBoards: count(CATEGORIES.board),
    noVisualTextCalloutOnly: count(CATEGORIES.remove),
    p0BeforeHumanTesting: rows.filter((row) => row.priority.startsWith('P0')).length,
    p1BeforeHumanTesting: rows.filter((row) => row.priority.startsWith('P1')).length
  }
}

function renderStrategyMd(rows, summary) {
  const lines = [
    '# Prompt Life Visual Aid Strategy v0.28.5',
    '',
    'This strategy resets the Journey visual-aid plan without redesigning the visuals in this pass. It chooses one recommended path for each of the 39 Journey learning cards.',
    '',
    '## Category Rules',
    '',
    `- ${CATEGORIES.image2}: polished static conceptual visuals; short embedded text only if human-verified; HTML callouts below.`,
    `- ${CATEGORIES.coded}: exact token, context, probability, arrow, or mechanism relationships controlled in HTML/SVG/CSS.`,
    `- ${CATEGORIES.board}: 2-4 HTML cards or columns for boundary distinctions; short headings; no SVG text.`,
    `- ${CATEGORIES.remove}: no visual unless later testing proves one is needed; use text callouts and glossary support.`,
    '',
    '## Counts',
    '',
    `- Image 2 Concept Card: ${summary.image2ConceptCards}`,
    `- Coded Mechanism Mini-Diagram: ${summary.codedMechanicMiniDiagrams}`,
    `- HTML Comparison Board: ${summary.htmlComparisonBoards}`,
    `- No Visual Needed / Text Callout Only: ${summary.noVisualTextCalloutOnly}`,
    '',
    '## Triage Table',
    '',
    '| Stage | Card ID | Card title | Current visual | Type | Problem | Recommendation | Image 2 | Coded required | Remove | Priority | Exact next action |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |'
  ]

  for (const row of rows) {
    lines.push([
      row.stage,
      row.cardId,
      row.cardTitle,
      row.currentVisualTitle,
      row.currentVisualType,
      row.currentProblem,
      row.newRecommendedCategory,
      row.image2Allowed ? 'yes' : 'no',
      row.codedVisualRequired ? 'yes' : 'no',
      row.removeVisual ? 'yes' : 'no',
      row.priority,
      row.exactNextAction
    ].map(mdEscape).join(' | ').replace(/^/, '| ').replace(/$/, ' |'))
  }

  return `${lines.join('\n')}\n`
}

function renderPromptPacket(rows) {
  const imageRows = rows.filter((row) => row.image2Allowed)
  const lines = [
    '# Prompt Life Image 2 Production Prompts v0.28.5',
    '',
    'Do not generate images from this packet automatically. It is a production prompt sheet for future Image 2 asset generation and human verification.',
    '',
    '## Production Rules',
    '',
    '- Use Image 2 for polished static conceptual visuals, not exact model mechanics.',
    '- Keep instructional text, labels, captions, alt text, and callouts in HTML.',
    '- Avoid dense small text, fake dashboards, exact probabilities, fragile axes, complex flowcharts, and pseudo-text.',
    '- Use short embedded titles or 1-3 word labels only if a human verifies the generated asset.',
    `- Desired style: ${style}`,
    `- Hard avoid: ${negativePromptBase}.`,
    '',
    '## Candidates',
    ''
  ]

  for (const row of imageRows) {
    const brief = visualAidReadinessBriefs.find((item) => item.learningCardId === row.cardId)
    const detail = imagePromptDetails[row.cardId]
    if (!detail) throw new Error(`Missing Image 2 prompt detail for ${row.cardId}`)
    lines.push(
      `### ${row.cardTitle}`,
      '',
      `- Card ID: \`${row.cardId}\``,
      `- Purpose: ${detail.purpose}`,
      `- Aspect ratio: ${aspectRatio}`,
      `- Desired style: ${style}`,
      '- Embedded text allowed: no',
      '- Exact embedded text: none',
      `- Exact prompt: ${detail.prompt}`,
      `- Negative prompt: ${negativePromptBase}.`,
      '- HTML callouts:',
      ...brief.calloutsBelowVisual.map((callout) => `  - ${callout}`),
      `- Alt text: ${detail.altText}`,
      '- Acceptance criteria:',
      '  - Mobile-readable at 320px and 390px.',
      '  - No tiny or pseudo text.',
      '  - No fake dashboard, chart, or exact mechanism claim.',
      '  - Supports the card metaphor without replacing HTML instruction.',
      '  - Does not imply consciousness, permanent memory, hidden search, or moral agency.',
      ''
    )
  }

  return `${lines.join('\n')}\n`
}

function renderReportHtml(rows, summary) {
  const byCategory = (category) => rows.filter((row) => row.newRecommendedCategory === category)
  const topTen = rows
    .filter((row) => row.topTenRank)
    .sort((a, b) => a.topTenRank - b.topTenRank)

  const tableRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.stage)}</td>
      <td>${escapeHtml(row.cardTitle)}</td>
      <td>${escapeHtml(row.currentVisualTitle)}<br><span>${escapeHtml(row.currentVisualType)}</span></td>
      <td>${escapeHtml(row.currentProblem)}</td>
      <td><strong>${escapeHtml(row.newRecommendedCategory)}</strong><br>${escapeHtml(row.reason)}</td>
      <td>${escapeHtml(row.priority)}</td>
      <td>${escapeHtml(row.exactNextAction)}</td>
    </tr>
  `).join('')

  const list = (title, items) => `
    <section class="panel">
      <h2>${escapeHtml(title)}</h2>
      <ol>
        ${items.map((row) => `<li><strong>${escapeHtml(row.cardTitle)}</strong>: ${escapeHtml(row.exactNextAction)}</li>`).join('')}
      </ol>
    </section>
  `

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v${version} Visual Strategy Reset Report</title>
  <style>
    :root {
      color: #07124a;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      word-break: normal;
      overflow-wrap: normal;
      hyphens: none;
    }
    body { margin: 0; padding: 32px; background: #f7fbff; }
    h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.05; }
    h2 { margin: 0 0 12px; font-size: 18px; }
    p, li { line-height: 1.45; }
    .lede { max-width: 840px; color: #29385f; }
    .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 18px 0; }
    .metric, .panel, table {
      background: white;
      border: 1px solid #cfd8ef;
      border-radius: 12px;
      box-shadow: 0 10px 28px rgba(7, 18, 74, 0.08);
    }
    .metric { padding: 14px; }
    .metric strong { display: block; font-size: 26px; }
    .metric span { color: #009f9c; font-size: 11px; font-weight: 900; text-transform: uppercase; }
    .panel { padding: 18px; margin: 18px 0; }
    table { width: 100%; border-collapse: collapse; margin: 18px 0; overflow: hidden; }
    th, td { vertical-align: top; padding: 10px; border-bottom: 1px solid #e1e7f6; font-size: 11px; line-height: 1.35; }
    th { text-align: left; color: #009f9c; text-transform: uppercase; font-size: 9px; letter-spacing: 0.04em; }
    td span { color: #4f5b7a; font-size: 10px; font-weight: 800; }
    code { color: #121e72; }
    @media print {
      body { padding: 20px; background: white; }
      .panel, tr { break-inside: avoid; page-break-inside: avoid; }
      .metrics { grid-template-columns: repeat(5, 1fr); }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v${version} Visual Strategy Reset Report</h1>
  <p class="lede">Generated ${new Date().toISOString()}. This pass does not redesign Journey visuals. It assigns each of the 39 visual aids to a final strategy lane: Image 2 concept card, coded mechanism mini-diagram, HTML comparison board, or callout-only removal/simplification.</p>

  <section class="metrics">
    <div class="metric"><strong>${summary.totalCards}</strong><span>Cards triaged</span></div>
    <div class="metric"><strong>${summary.image2ConceptCards}</strong><span>Image 2</span></div>
    <div class="metric"><strong>${summary.codedMechanicMiniDiagrams}</strong><span>Coded</span></div>
    <div class="metric"><strong>${summary.htmlComparisonBoards}</strong><span>HTML boards</span></div>
    <div class="metric"><strong>${summary.noVisualTextCalloutOnly}</strong><span>Remove/simplify</span></div>
  </section>

  <section class="panel">
    <h2>Strategy Summary</h2>
    <p>Use Image 2 where beauty, atmosphere, and metaphor carry the teaching. Use coded mini-diagrams only where exact relationships matter. Use HTML comparison boards for boundary distinctions. Remove visuals when the diagram adds clutter, fake precision, or more labels than insight.</p>
  </section>

  <section>
    <h2>39-Card Triage Table</h2>
    <table>
      <thead>
        <tr><th>Stage</th><th>Card</th><th>Current visual</th><th>Current problem</th><th>Recommendation</th><th>Priority</th><th>Next action</th></tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  </section>

  ${list('Image 2 Candidate List', byCategory(CATEGORIES.image2))}
  ${list('Coded Mechanic List', byCategory(CATEGORIES.coded))}
  ${list('HTML Comparison Board List', byCategory(CATEGORIES.board))}
  ${list('Removal / Simplification Candidates', byCategory(CATEGORIES.remove))}
  ${list('Top 10 Visuals To Change Before Human Testing', topTen)}

  <section class="panel">
    <h2>Image 2 Prompt Packet Summary</h2>
    <p>The companion prompt packet includes ${summary.image2ConceptCards} production prompts with purpose, negative prompt, aspect ratio, style, embedded-text decision, HTML callouts, alt text, and acceptance criteria. Embedded text is disallowed for this batch unless a later human verification step approves a specific generated asset.</p>
  </section>
</body>
</html>`
}

function renderCsv(rows) {
  const headers = [
    'stage',
    'cardId',
    'cardTitle',
    'currentVisualTitle',
    'currentVisualType',
    'currentProblem',
    'newRecommendedCategory',
    'reason',
    'image2Allowed',
    'codedVisualRequired',
    'removeVisual',
    'priority',
    'exactNextAction'
  ]
  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(','))
  ].join('\n')
}

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required to export the v0.28.5 visual strategy PDF.')
}

async function exportPdf() {
  const { chromium } = getPlaywright()
  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : undefined,
    args: ['--no-sandbox']
  })
  try {
    const page = await browser.newPage({ viewport: { width: 1180, height: 1500 } })
    await page.goto(pathToFileURL(reportHtmlPath).href, { waitUntil: 'networkidle' })
    await page.pdf({
      path: reportPdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.35in', right: '0.35in', bottom: '0.35in', left: '0.35in' }
    })
  } finally {
    await browser.close()
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const rows = buildRows()
  const summary = summarize(rows)
  const payload = {
    version,
    generatedAt: new Date().toISOString(),
    sourceBriefVersion,
    categories: Object.values(CATEGORIES),
    summary,
    rows
  }

  await writeFile(strategyJsonPath, `${JSON.stringify(payload, null, 2)}\n`)
  await writeFile(strategyCsvPath, `${renderCsv(rows)}\n`)
  await writeFile(strategyMdPath, renderStrategyMd(rows, summary))
  await writeFile(promptPacketPath, renderPromptPacket(rows))
  await writeFile(reportHtmlPath, renderReportHtml(rows, summary))
  await exportPdf()

  console.log(`Wrote ${strategyJsonPath}`)
  console.log(`Wrote ${strategyCsvPath}`)
  console.log(`Wrote ${strategyMdPath}`)
  console.log(`Wrote ${promptPacketPath}`)
  console.log(`Wrote ${reportHtmlPath}`)
  console.log(`Wrote ${reportPdfPath}`)
  console.log(JSON.stringify(summary))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
