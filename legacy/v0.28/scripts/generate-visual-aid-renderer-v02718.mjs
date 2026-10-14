import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-27-18')

const strategyInventory = [
  {
    id: 'generated-png-html-callouts',
    strategy: 'Generated PNG image asset with HTML callouts',
    usedBy: ['Prompt to Prediction', 'Broad Pretraining', 'Fine-Tuning Path', 'Alignment Landscape'],
    strengths: 'Good for atmosphere, concept setting, and fear-reducing metaphor where exact labels are not required.',
    weaknesses: 'Cannot safely carry exact instructional text, token positions, or mechanism boundaries.',
    recommendation: 'Keep for atmospheric aids only. Do not use for exact mechanism diagrams.',
    status: 'keep-with-limits'
  },
  {
    id: 'inline-coded-svg',
    strategy: 'Inline coded SVG',
    usedBy: ['Forward Pass', 'Token IDs', 'Embeddings', 'Vectors', 'Tensors', 'Relevance Between Tokens', 'MLP', 'Layers', 'Hidden States', 'Logits', 'Softmax', 'Sampling', 'Autoregression', 'Context Window', 'RAG', 'Grounding', 'Hallucination', 'Diffusion', 'Multimodal', 'Perfect Storm', 'Twilight ethics/risk visuals'],
    strengths: 'Best for exact relationships, arrows, token order, bars, boundaries, and accessibility-controlled labels.',
    weaknesses: 'Can become cluttered quickly if too many labels are placed inside the SVG.',
    recommendation: 'Preferred for model-mechanism diagrams, with strict label limits and HTML callouts for nuance.',
    status: 'preferred-for-mechanisms'
  },
  {
    id: 'html-css-diagram-card',
    strategy: 'HTML/CSS diagram card',
    usedBy: ['Prompt vs Response', 'Text to Tokens'],
    strengths: 'Handles wrapping token chips and multi-row mobile layouts better than cramped SVG text.',
    weaknesses: 'Needs careful fixed dimensions so rows do not drift or overflow.',
    recommendation: 'Keep for text-heavy token/card layouts. Consider for future token-stream visuals.',
    status: 'keep'
  },
  {
    id: 'diagramkit-react-svg',
    strategy: 'DiagramKit React SVG examples',
    usedBy: ['AI Family Tree', 'Rules and Learned Patterns', 'Training Loop', 'Overfitting vs Generalization'],
    strengths: 'Reusable coded primitives for taxonomy, loop, and comparison diagrams.',
    weaknesses: 'Some early labels were smaller than the new readability standard and need continued mobile checks.',
    recommendation: 'Keep, but follow the v0.27.18 minimum label-size rules.',
    status: 'keep'
  },
  {
    id: 'visual-aid-frame-html-callouts',
    strategy: 'Shared visual aid frame with HTML caption, callouts, key takeaway, and accessible description',
    usedBy: ['All 39 Journey visual aids'],
    strengths: 'Strong shared grammar; keeps nuanced explanation accessible and readable below the diagram.',
    weaknesses: 'Can feel repetitive if visual titles/captions are not specific.',
    recommendation: 'Preferred wrapper for all Journey visual aids.',
    status: 'preferred-wrapper'
  },
  {
    id: 'metadata-chip-wrapper',
    strategy: 'Renderer metadata chip wrapper',
    usedBy: ['Former review-route visual aid cards'],
    strengths: 'Useful for developers during audits.',
    weaknesses: 'Clutters learner review and exposes implementation details like pattern, variant, callouts, and marker counts.',
    recommendation: 'Deprecated from learner-facing UI. Keep renderer metadata in docs, JSON, and reports only.',
    status: 'deprecated-for-ui'
  },
  {
    id: 'custom-svg-primitives',
    strategy: 'Custom SVG primitives',
    usedBy: ['Label', 'Arrow', 'Callout', 'TokenChip', 'StepNode', 'diagram-specific bars/arcs/cards'],
    strengths: 'Lightweight, dependency-free, and easy to tune for mobile.',
    weaknesses: 'Inconsistent use can produce tiny text or unclear endpoint geometry.',
    recommendation: 'Keep and consolidate into shared styles; avoid new one-off tiny labels.',
    status: 'keep-and-standardize'
  },
  {
    id: 'third-party-visualization',
    strategy: 'Third-party visualization helper',
    usedBy: [],
    strengths: 'None currently needed.',
    weaknesses: 'Would add dependency weight and may reduce design control.',
    recommendation: 'Do not introduce for current Journey visual aids.',
    status: 'not-used'
  }
]

const clusterStatus = [
  {
    visual: 'Attention',
    title: 'Relevance Between Tokens',
    action: 'Rebuilt coded SVG and replaced legacy Attention Weave title.',
    status: 'changed',
    screenshot: 'attention-390.png'
  },
  {
    visual: 'MLP',
    title: 'MLP Feature Workshop',
    action: 'Kept structure; larger label standard and metadata removal improve readability.',
    status: 'kept-with-readability-repair',
    screenshot: 'mlp-390.png'
  },
  {
    visual: 'Layers',
    title: 'Transformer Stack',
    action: 'Kept repeated-block layout; larger labels and no metadata chips.',
    status: 'kept-with-readability-repair',
    screenshot: 'layers-390.png'
  },
  {
    visual: 'Hidden States',
    title: 'Hidden State Flow',
    action: 'Kept temporary-state flow; larger labels and no metadata chips.',
    status: 'kept-with-readability-repair',
    screenshot: 'hidden-states-390.png'
  },
  {
    visual: 'Logits',
    title: 'Raw Scoreboard',
    action: 'Updated caption and token set; simplified raw-score labels.',
    status: 'changed',
    screenshot: 'logits-390.png'
  },
  {
    visual: 'Softmax',
    title: 'Score to Probability',
    action: 'Updated caption and token set; kept softmax separate from sampling.',
    status: 'changed',
    screenshot: 'softmax-390.png'
  },
  {
    visual: 'Sampling',
    title: 'Weighted Token Choice',
    action: 'Replaced bubble cluster with readable probability bars and selected-token card.',
    status: 'changed',
    screenshot: 'sampling-390.png'
  }
]

const backlog = [
  { visual: 'Collective Intelligence, Extracted', type: 'future Image 2 atmospheric replacement', priority: 'medium' },
  { visual: 'Benefits Worth Taking Seriously', type: 'future Image 2 atmospheric replacement', priority: 'medium' },
  { visual: 'Costs We Must Count', type: 'future Image 2 atmospheric replacement', priority: 'medium' },
  { visual: 'Human-Centered AI', type: 'future Image 2 atmospheric replacement', priority: 'medium' },
  { visual: 'Responsible AI Control Panel', type: 'coded simplification/backlog from v0.27.15', priority: 'low' }
]

const changedVisuals = ['Relevance Between Tokens', 'Raw Scoreboard', 'Score to Probability', 'Weighted Token Choice']

function mdList(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function renderStrategyMarkdown() {
  const sections = strategyInventory.map((item) => `## ${item.strategy}

- Status: ${item.status}
- Used by: ${item.usedBy.length ? item.usedBy.join(', ') : 'None'}
- Strengths: ${item.strengths}
- Weaknesses: ${item.weaknesses}
- Recommendation: ${item.recommendation}
`).join('\n')

  return `# Prompt Life Visual Renderer Strategy v0.27.18

This inventory records how Journey visual aids are rendered after the v0.27.18 readability repair. The preferred long-term strategy is a shared visual-aid frame with exact coded SVG/HTML for mechanisms and textless generated PNGs only for atmosphere.

${sections}
`
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch {
    return null
  }
}

function renderReportHtml({ consistencyAudit, readabilityAudit }) {
  const strategyRows = strategyInventory.map((item) => `
    <tr>
      <td>${item.strategy}</td>
      <td>${item.status}</td>
      <td>${item.usedBy.join(', ') || 'None'}</td>
      <td>${item.recommendation}</td>
    </tr>
  `).join('')

  const clusterRows = clusterStatus.map((item) => `
    <tr>
      <td>${item.visual}</td>
      <td>${item.title}</td>
      <td>${item.status}</td>
      <td>${item.action}</td>
    </tr>
  `).join('')

  const shot = (file, alt) => `<figure><img src="../screenshots/v0-27-18/${file}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prompt Life v0.27.18 Visual Renderer Readability Report</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #101a52; background: #f8fbff; }
    body { margin: 0; padding: 32px; }
    main { max-width: 1080px; margin: 0 auto; }
    h1, h2, h3 { color: #101783; line-height: 1.08; }
    h1 { font-size: 2.2rem; }
    p, li { line-height: 1.52; }
    table { width: 100%; border-collapse: collapse; background: #fff; font-size: 0.86rem; }
    th, td { border: 1px solid #d9e3f7; padding: 10px; vertical-align: top; }
    th { background: #eaf5ff; text-align: left; }
    .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 20px 0; }
    .metric, .note, figure { background: #fff; border: 1px solid #d9e3f7; border-radius: 14px; padding: 14px; box-shadow: 0 10px 28px rgba(20,30,88,.06); }
    .metric strong { display: block; font-size: 1.8rem; color: #0a7d87; }
    .shots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    figure { margin: 0; break-inside: avoid; }
    img { width: 100%; display: block; border: 1px solid #edf1fb; border-radius: 10px; }
    figcaption { margin-top: 8px; font-weight: 800; font-size: 0.84rem; }
    code { background: #eef4ff; padding: 2px 5px; border-radius: 5px; }
    @media print { body { padding: 18px; } .metrics { grid-template-columns: repeat(4, 1fr); } .shots { grid-template-columns: repeat(2, 1fr); } table { font-size: 0.72rem; } }
  </style>
</head>
<body>
<main>
  <h1>Prompt Life v0.27.18 Visual Renderer Readability Report</h1>
  <p>Generated ${new Date().toISOString()}. This pass removes learner-facing renderer metadata, raises label readability standards, rebuilds the Attention visual, and repairs the Decision Room mechanism sequence while preserving Journey, Play, checkpoints, progress, and the one-badge model.</p>

  <section class="metrics">
    <div class="metric"><strong>${strategyInventory.length}</strong><span>renderer strategies found</span></div>
    <div class="metric"><strong>${changedVisuals.length}</strong><span>visual aids structurally changed</span></div>
    <div class="metric"><strong>39</strong><span>visual aids affected by metadata cleanup</span></div>
    <div class="metric"><strong>${backlog.length}</strong><span>remaining backlog items</span></div>
  </section>

  <h2>Executive Summary</h2>
  <ul>
    <li>Renderer strategies kept: generated PNG with HTML callouts, inline coded SVG, HTML/CSS diagram cards, DiagramKit SVG examples, shared visual-aid frame, and custom SVG primitives.</li>
    <li>Deprecated for learner UI: renderer metadata chip wrapper.</li>
    <li>Metadata UI removed from visual aid review cards: no Pattern, Variant, Callouts, Markers, renderer, or implementation chips.</li>
    <li>Attention was renamed from Attention Weave to Relevance Between Tokens and rebuilt as a clean coded SVG.</li>
    <li>Workday cluster status: MLP, Layers, and Hidden States were kept structurally but benefit from larger label standards and metadata removal.</li>
    <li>Decision Room cluster status: Logits, Softmax, and Sampling now share floor, mat, kitchen, banana as candidate tokens and clearer captions.</li>
  </ul>

  <h2>Renderer Strategy Inventory</h2>
  <table><thead><tr><th>Strategy</th><th>Status</th><th>Used by</th><th>Recommendation</th></tr></thead><tbody>${strategyRows}</tbody></table>

  <h2>Attention Before / After</h2>
  <div class="note">
    <p><strong>Old issue summary:</strong> Attention Weave used legacy wording, visible renderer metadata cluttered the review screen, and the diagram carried too many competing labels.</p>
    <p><strong>New diagram summary:</strong> Relevance Between Tokens uses six sentence chips, a highlighted target token, a highlighted source clue, one stronger arc, one weaker arc, and four HTML callouts below the visual.</p>
  </div>
  <section class="shots">
    ${shot('attention-390.png', 'Attention visual at 390px')}
    ${shot('attention-320.png', 'Attention visual at 320px')}
  </section>

  <h2>Cluster Status</h2>
  <table><thead><tr><th>Visual</th><th>Current title</th><th>Status</th><th>Action</th></tr></thead><tbody>${clusterRows}</tbody></table>

  <h2>Mechanism Screenshots</h2>
  <section class="shots">
    ${shot('mlp-390.png', 'MLP at 390px')}
    ${shot('layers-390.png', 'Layers at 390px')}
    ${shot('hidden-states-390.png', 'Hidden States at 390px')}
    ${shot('logits-390.png', 'Logits at 390px')}
    ${shot('softmax-390.png', 'Softmax at 390px')}
    ${shot('sampling-390.png', 'Sampling at 390px')}
    ${shot('atmospheric-sample-390.png', 'Atmospheric PNG sample at 390px')}
    ${shot('visual-aids-desktop.png', 'Desktop visual aid sample')}
  </section>

  <h2>Remaining Backlog</h2>
  <ul>${backlog.map((item) => `<li><strong>${item.visual}</strong>: ${item.type} (${item.priority})</li>`).join('')}</ul>

  <h2>Audit Results</h2>
  <ul>
    <li>Visual aid consistency: ${consistencyAudit?.summary?.mismatches ?? 'pending'} numbered marker/list mismatches.</li>
    <li>Visual aid readability: ${readabilityAudit?.issues?.length ?? 'pending'} readability issues.</li>
    <li>Learner-copy audit: run in verification; no normal learner UI debug/developer labels expected.</li>
    <li>Stage-link regression: verified by browser QA in this pass.</li>
    <li>Mobile QA: 320px and 390px screenshots captured.</li>
  </ul>
</main>
</body>
</html>`
}

async function main() {
  await mkdir(outDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })
  const strategyPayload = {
    version: '0.27.18',
    generatedAt: new Date().toISOString(),
    strategies: strategyInventory,
    preferredGoingForward: ['visual-aid-frame-html-callouts', 'inline-coded-svg', 'html-css-diagram-card'],
    deprecated: ['metadata-chip-wrapper']
  }
  await writeFile(path.join(outDir, 'visual-renderer-strategy-v0-27-18.json'), `${JSON.stringify(strategyPayload, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-renderer-strategy-v0-27-18.md'), renderStrategyMarkdown())

  const consistencyAudit = await readJsonIfExists(path.join(outDir, 'visual-aid-consistency-audit-v0-27-18.json'))
  const readabilityAudit = await readJsonIfExists(path.join(outDir, 'visual-aid-readability-audit-v0-27-18.json'))
  await writeFile(path.join(outDir, 'prompt-life-v0-27-18-visual-renderer-readability-report.html'), renderReportHtml({ consistencyAudit, readabilityAudit }))
  console.log(`Wrote v0.27.18 renderer strategy and report HTML to ${outDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
