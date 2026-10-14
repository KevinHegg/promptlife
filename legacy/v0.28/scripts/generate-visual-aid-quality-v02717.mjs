import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-27-17')

const priorityRows = [
  {
    learningCard: 'Collective Intelligence, Extracted',
    visualId: 'collective-intelligence-lantern',
    currentType: 'coded SVG/HTML',
    concept: 'Human-created traces can enter training data; rights questions remain human and institutional.',
    issue: 'Social/provenance idea can feel too chart-like if overdiagrammed.',
    actionTaken: 'Left learner UI unchanged and created a production Image 2 prompt with HTML callouts.',
    remainingConcern: 'Needs a future textless PNG before replacing the coded scene.',
    nextRecommendation: 'Generate Image 2 asset in a dedicated asset pass.',
    changed: false,
    recommendedImage2: true,
    keepCoded: false
  },
  {
    learningCard: 'Benefits Worth Taking Seriously',
    visualId: 'benefits-tool-garden',
    currentType: 'coded SVG/HTML',
    concept: 'Benefits can be useful while still bounded by evidence, context, safeguards, and review.',
    issue: 'Tier concept is more judgment landscape than exact mechanism.',
    actionTaken: 'Left learner UI unchanged and created a production Image 2 prompt with outside callouts.',
    remainingConcern: 'Future PNG must avoid hype, miracle imagery, and baked-in labels.',
    nextRecommendation: 'Generate Image 2 asset after visual tone review.',
    changed: false,
    recommendedImage2: true,
    keepCoded: false
  },
  {
    learningCard: 'Costs We Must Count',
    visualId: 'costs-invisible-factory',
    currentType: 'coded SVG/HTML',
    concept: 'AI outputs depend on infrastructure, human systems, power, and governance choices.',
    issue: 'Invisible costs benefit from atmosphere, but numbers and claims must stay out of the image.',
    actionTaken: 'Left learner UI unchanged and created a production Image 2 prompt.',
    remainingConcern: 'Generated asset must avoid fake statistics and disaster imagery.',
    nextRecommendation: 'Generate Image 2 asset with strict negative prompt.',
    changed: false,
    recommendedImage2: true,
    keepCoded: false
  },
  {
    learningCard: 'Human-Centered AI',
    visualId: 'human-centered-ai-garden',
    currentType: 'coded SVG/HTML',
    concept: 'AI can support decisions, but review, governance, dignity, and accountability remain human.',
    issue: 'Accountability concept needs warmth without robot judges or moral-halo metaphors.',
    actionTaken: 'Left learner UI unchanged and created a production Image 2 prompt.',
    remainingConcern: 'Future image must stay textless and avoid faces, halos, and automation fantasy.',
    nextRecommendation: 'Generate Image 2 asset after the social concept art set is approved.',
    changed: false,
    recommendedImage2: true,
    keepCoded: false
  },
  {
    learningCard: 'Fine-Tuning',
    visualId: 'before-morning-finetuning-path',
    currentType: 'generated PNG plus HTML callouts',
    concept: 'Fine-tuning can durably adapt behavior; prompts, RAG/context, and sampling steer the current run.',
    issue: 'The previous caption emphasized durable adaptation but did not make the neighboring boundaries explicit enough.',
    actionTaken: 'Updated caption, subtitle, callouts, key takeaway, accessible description, and print note.',
    remainingConcern: 'Future coded overlay markers may help if the generated art is reused in a high-stakes review packet.',
    nextRecommendation: 'Keep current PNG and improved HTML callouts for v0.27.17.',
    changed: true,
    recommendedImage2: false,
    keepCoded: false
  },
  {
    learningCard: 'Attention',
    visualId: 'attention',
    currentType: 'coded SVG/HTML',
    concept: 'Attention computes weighted relevance between token positions, not awareness.',
    issue: 'A web-like scene can accidentally imply broad awareness or mind-like noticing.',
    actionTaken: 'Redrew the diagram around a target token, source tokens, one strong link, one weak link, and a not-awareness note.',
    remainingConcern: 'No major concern after mobile QA; keep labels short.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'MLP',
    visualId: 'mlp',
    currentType: 'coded SVG/HTML',
    concept: 'Attention mixes across positions; the MLP reshapes features within one token position.',
    issue: 'The visual needed a cleaner contrast between cross-position mixing and same-position reshaping.',
    actionTaken: 'Redrew with a compact attention panel, same-position cat token, MLP panel, and before/after feature bars.',
    remainingConcern: 'Feature bars are still simplified teaching symbols.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'Layers',
    visualId: 'layers',
    currentType: 'coded SVG/HTML',
    concept: 'Repeated transformer blocks refine temporary hidden states.',
    issue: 'The stack needed stronger "repeated block" structure without implying thought steps.',
    actionTaken: 'Redrew each layer as Layer N plus attention and MLP chips, with refined output states and temporary-this-run note.',
    remainingConcern: 'Residual paths and normalization remain in callouts, not the diagram.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'Hidden States',
    visualId: 'hidden-states',
    currentType: 'coded SVG/HTML',
    concept: 'Hidden states are temporary context-shaped vectors, distinct from embeddings and durable weights.',
    issue: 'Needed a simpler contrast among ID, embedding, hidden states, scores, weights, and memory.',
    actionTaken: 'Redrew the flow and added durable weights versus temporary states language inside the diagram.',
    remainingConcern: 'Still simplified; details stay in the HTML callouts.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'Logits',
    visualId: 'logits',
    currentType: 'coded SVG/HTML',
    concept: 'Logits are raw next-token scores before probabilities, not confidence or truth.',
    issue: 'Needed stronger "raw score" and "not probability/truth" framing.',
    actionTaken: 'Adjusted top labels and bottom boundary chip while preserving the candidate-score bars.',
    remainingConcern: 'Scores are teaching values, not actual model internals.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'Softmax',
    visualId: 'softmax',
    currentType: 'coded SVG/HTML',
    concept: 'Softmax turns raw scores into probabilities that sum to one; it does not choose the token.',
    issue: 'Previous language risked letting learners merge softmax and sampling.',
    actionTaken: 'Updated caption/callouts and diagram note to say softmax is not the chooser.',
    remainingConcern: 'Rounded probabilities are teaching values.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  },
  {
    learningCard: 'Sampling',
    visualId: 'sampling',
    currentType: 'coded SVG/HTML',
    concept: 'Sampling chooses one next token from probability-shaped options; fit is not proof.',
    issue: 'Needed the truth boundary in callouts, not squeezed into the diagram.',
    actionTaken: 'Updated callout/key takeaway and simplified the chosen-token label area.',
    remainingConcern: 'Keep temperature/top-k/top-p out of this intro visual.',
    nextRecommendation: 'Keep coded.',
    changed: true,
    recommendedImage2: false,
    keepCoded: true
  }
]

const imagePromptRefs = [
  'Collective Intelligence, Extracted',
  'Benefits Worth Taking Seriously',
  'Costs We Must Count',
  'Human-Centered AI'
]

const codedKeep = [
  'Attention',
  'MLP',
  'Layers',
  'Hidden States',
  'Logits',
  'Softmax',
  'Sampling',
  'Tokenization',
  'Token IDs',
  'Embeddings',
  'Vectors',
  'Tensors',
  'RAG and Retrieval',
  'Grounding',
  'Context Window'
]

const screenshotRefs = [
  ['Collective Intelligence 390px', 'collective-intelligence-lantern-390.png'],
  ['Benefits 390px', 'benefits-tool-garden-390.png'],
  ['Costs 390px', 'costs-invisible-factory-390.png'],
  ['Human-Centered AI 390px', 'human-centered-ai-garden-390.png'],
  ['Fine-Tuning 390px', 'before-morning-finetuning-path-390.png'],
  ['Attention 390px', 'attention-390.png'],
  ['MLP 390px', 'mlp-390.png'],
  ['Layers 390px', 'layers-390.png'],
  ['Hidden States 390px', 'hidden-states-390.png'],
  ['Logits 390px', 'logits-390.png'],
  ['Softmax 390px', 'softmax-390.png'],
  ['Sampling 390px', 'sampling-390.png'],
  ['Attention 320px', 'attention-320.png'],
  ['Visual aid desktop sample', 'visual-aids-desktop.png']
]

function csvEscape(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function renderHtml() {
  const changed = priorityRows.filter((row) => row.changed)
  const unchanged = priorityRows.filter((row) => !row.changed)
  const imageRows = priorityRows.filter((row) => row.recommendedImage2)
  const rowsHtml = priorityRows.map((row) => `
    <tr>
      <td>${row.learningCard}</td>
      <td>${row.currentType}</td>
      <td>${row.concept}</td>
      <td>${row.issue}</td>
      <td>${row.actionTaken}</td>
      <td>${row.remainingConcern}</td>
      <td>${row.nextRecommendation}</td>
    </tr>`).join('')

  const beforeAfter = changed.map((row) => `
    <section class="note">
      <h3>${row.learningCard}</h3>
      <p><strong>Before:</strong> ${row.issue}</p>
      <p><strong>After:</strong> ${row.actionTaken}</p>
      <p><strong>Remaining concern:</strong> ${row.remainingConcern}</p>
    </section>`).join('')

  const screenshotHtml = screenshotRefs.map(([label, file]) => `
    <figure>
      <img src="../screenshots/v0-27-17/${file}" alt="${label} screenshot" />
      <figcaption>${label}</figcaption>
    </figure>`).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prompt Life v0.27.17 Visual Aid Quality Pass 1</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #101a52; background: #f8fbff; }
    body { margin: 0; padding: 32px; }
    main { max-width: 1080px; margin: 0 auto; }
    h1, h2, h3 { color: #0f1678; line-height: 1.05; }
    h1 { font-size: 2.2rem; margin-bottom: 0.35rem; }
    h2 { margin-top: 2rem; border-top: 2px solid #dbe7ff; padding-top: 1.1rem; }
    p, li { line-height: 1.55; }
    .summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 24px 0; }
    .metric { background: #fff; border: 1px solid #d9e3f7; border-radius: 14px; padding: 16px; box-shadow: 0 12px 30px rgba(26, 38, 89, 0.06); }
    .metric strong { display: block; font-size: 1.85rem; color: #0a7d87; }
    table { width: 100%; border-collapse: collapse; font-size: 0.86rem; background: #fff; }
    th, td { border: 1px solid #d9e3f7; padding: 10px; vertical-align: top; }
    th { background: #eaf5ff; color: #0f1678; text-align: left; }
    .note { background: #fff; border: 1px solid #d9e3f7; border-radius: 14px; padding: 14px 16px; margin: 12px 0; }
    .tag-list { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; list-style: none; }
    .tag-list li { border: 1px solid #bfe9ea; background: #efffff; border-radius: 999px; padding: 6px 10px; font-weight: 800; font-size: 0.82rem; }
    .screens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    figure { margin: 0; background: #fff; border: 1px solid #d9e3f7; border-radius: 14px; padding: 10px; break-inside: avoid; }
    img { width: 100%; height: auto; display: block; border-radius: 10px; border: 1px solid #edf1fb; }
    figcaption { margin-top: 8px; font-weight: 800; font-size: 0.84rem; }
    code { background: #eef3ff; padding: 2px 5px; border-radius: 5px; }
    @media print {
      body { padding: 18px; }
      .summary { grid-template-columns: repeat(4, 1fr); }
      .screens { grid-template-columns: repeat(2, 1fr); }
      h2 { break-after: avoid; }
      table { font-size: 0.72rem; }
    }
  </style>
</head>
<body>
<main>
  <h1>Prompt Life v0.27.17 Visual Aid Quality Pass 1</h1>
  <p>Generated ${new Date().toISOString()}. This pass inspected all 39 visual-aid catalog entries, reviewed the 12 priority visuals deeply, repaired the coded mechanism visuals that needed clearer model boundaries, and prepared Image 2 prompts for the four social/ethical candidates. No generated PNG assets were added.</p>

  <section class="summary">
    <div class="metric"><strong>39</strong><span>catalog aids inspected</span></div>
    <div class="metric"><strong>${changed.length}</strong><span>priority visuals changed</span></div>
    <div class="metric"><strong>${unchanged.length}</strong><span>priority visuals left stable</span></div>
    <div class="metric"><strong>${imageRows.length}</strong><span>Image 2 candidates</span></div>
  </section>

  <h2>Executive Summary</h2>
  <p>The pass keeps exact mechanisms coded and moves atmospheric social concepts into a future Image 2 queue. Fine-Tuning received stronger durable-versus-temporary callouts. Attention, MLP, Layers, Hidden States, Logits, Softmax, and Sampling were refined as coded SVGs/HTML so learners see source-target relevance, per-token feature reshaping, repeated transformer blocks, temporary hidden-state flow, raw-score boundaries, softmax normalization, and one-token sampling more clearly.</p>

  <h2>Priority Visual Table</h2>
  <table>
    <thead>
      <tr>
        <th>Learning card</th>
        <th>Current type</th>
        <th>Concept</th>
        <th>Issue</th>
        <th>Action taken</th>
        <th>Remaining concern</th>
        <th>Next recommendation</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>

  <h2>Image 2 Prompt Section</h2>
  <p>The production prompt sheet is <code>image-2-visual-prompts-v0-27-17.md</code>. Recommended Image 2 candidates:</p>
  <ul class="tag-list">${imagePromptRefs.map((label) => `<li>${label}</li>`).join('')}</ul>
  <p>All four prompts require textless ZenTron Origami imagery and keep essential explanations in HTML callouts outside the image.</p>

  <h2>Cards Kept Coded</h2>
  <p>These are explicitly kept as coded SVG/HTML because their labels, positions, and arrows teach exact model mechanics or category relationships:</p>
  <ul class="tag-list">${codedKeep.map((label) => `<li>${label}</li>`).join('')}</ul>

  <h2>Before / After Notes</h2>
  ${beforeAfter}

  <h2>Screenshots</h2>
  <p>Screenshots are captured from the review route after the repairs. They are intentionally mobile-heavy because Prompt Life is mobile-first.</p>
  <section class="screens">${screenshotHtml}</section>

  <h2>Backlog</h2>
  <p>The machine-readable backlog is available as <code>visual-aid-quality-backlog-v0-27-17.json</code> and <code>visual-aid-quality-backlog-v0-27-17.csv</code>. It preserves the decision for every priority visual: change now, keep coded, or prepare future Image 2 generation.</p>
</main>
</body>
</html>`
}

async function main() {
  await mkdir(outDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })

  const summary = {
    version: '0.27.17',
    generatedAt: new Date().toISOString(),
    visualAidsInspected: 39,
    priorityVisualsReviewed: priorityRows.length,
    priorityVisualsChanged: priorityRows.filter((row) => row.changed).length,
    priorityVisualsUnchanged: priorityRows.filter((row) => !row.changed).length,
    image2Candidates: priorityRows.filter((row) => row.recommendedImage2).map((row) => row.learningCard),
    codedMechanismVisualsKept: codedKeep,
    numberedCalloutConsistencyExpected: true
  }

  const payload = { summary, priorityRows }
  const csvHeader = ['learningCard', 'visualId', 'currentType', 'concept', 'issue', 'actionTaken', 'remainingConcern', 'nextRecommendation', 'changed', 'recommendedImage2', 'keepCoded']
  const csv = [
    csvHeader.join(','),
    ...priorityRows.map((row) => csvHeader.map((key) => csvEscape(row[key])).join(','))
  ].join('\n')

  await writeFile(path.join(outDir, 'visual-aid-quality-backlog-v0-27-17.json'), `${JSON.stringify(payload, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-aid-quality-backlog-v0-27-17.csv'), `${csv}\n`)
  await writeFile(path.join(outDir, 'prompt-life-v0-27-17-visual-aid-quality-pass-1-report.html'), renderHtml())
  console.log(`Wrote v0.27.17 visual aid quality artifacts to ${outDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
