import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const reportDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-27-16')
const auditPath = path.join(reportDir, 'visual-aid-consistency-audit-v0-27-16.json')

const screenshotRows = [
  ['Overfitting at 390px', '../screenshots/v0-27-16/v0-27-16-overfitting-390.png'],
  ['Fine-tuning generated PNG at 390px', '../screenshots/v0-27-16/v0-27-16-finetuning-png-390.png'],
  ['Tokenization at 390px', '../screenshots/v0-27-16/v0-27-16-tokenization-390.png'],
  ['Vectors at 390px', '../screenshots/v0-27-16/v0-27-16-vectors-390.png'],
  ['Generated PNG example at 390px', '../screenshots/v0-27-16/v0-27-16-generated-png-390.png'],
  ['Coded SVG example at 390px', '../screenshots/v0-27-16/v0-27-16-inference-coded-390.png'],
  ['Tokenization at 320px', '../screenshots/v0-27-16/v0-27-16-tokenization-320.png'],
  ['Overfitting desktop sample', '../screenshots/v0-27-16/v0-27-16-overfitting-desktop.png']
]

const fixedItems = [
  'Added shared visual aid frame, diagram shell, caption, and callout-list grammar.',
  'Added numbered-vs-bulleted callout rendering.',
  'Changed generated PNG-backed scenes to unnumbered HTML callouts.',
  'Added four chart markers to Overfitting vs Generalization.',
  'Rewrote Overfitting callouts to remove stray Point 2 wording.',
  'Added 1/2/3 badges to the Tokenization HTML diagram.',
  'Added the fourth Token IDs marker for the lookup-key boundary.',
  'Added the fourth Autoregression marker for run-again.',
  'Added four Context Window markers for visible/limited/temporary/next-token use.',
  'Added complete marker sets for Grounding and Hallucination evidence visuals.'
]

const backlog = [
  'Collective Intelligence, Benefits, Costs, and Human-Centered AI remain good atmospheric Image 2 candidates.',
  'Fine-Tuning Path can later receive coded overlay markers if learners need more explicit contrast with prompting/RAG.',
  'Attention, MLP, Layers, Hidden States, Logits, Softmax, and Sampling are readable but should remain candidates for future precision polish.',
  'No new PNGs were generated in this pass.'
]

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderTable(rows) {
  return rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.id)}</td>
      <td>${escapeHtml(row.title)}</td>
      <td>${escapeHtml(row.visualType)}</td>
      <td>${escapeHtml(row.calloutStyle)}</td>
      <td>${row.markerCount}</td>
      <td>${row.calloutCount}</td>
      <td>${escapeHtml(row.status)}</td>
      <td>${escapeHtml(row.note)}</td>
    </tr>
  `).join('')
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
}

function renderScreenshots() {
  return screenshotRows.map(([caption, src]) => `
    <figure>
      <img src="${src}" alt="${escapeHtml(caption)}" />
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `).join('')
}

async function main() {
  await mkdir(reportDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })
  const audit = JSON.parse(await readFile(auditPath, 'utf8'))
  const rows = audit.rows

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Prompt Life v0.27.16 Visual Aid Consistency Report</title>
  <style>
    :root { color: #081248; background: #f6fbff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; padding: 36px; }
    main { max-width: 980px; margin: 0 auto; }
    h1 { color: #111a7a; font-size: 34px; line-height: 1.05; margin: 0 0 10px; }
    h2 { color: #111a7a; margin-top: 32px; }
    p, li { color: #17214d; line-height: 1.45; }
    .lede { font-size: 18px; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 22px 0; }
    .metric { border: 1px solid #cfd8f1; border-radius: 10px; padding: 12px; background: white; }
    .metric strong { display: block; color: #00a9a7; font-size: 12px; text-transform: uppercase; }
    .metric span { display: block; color: #111a7a; font-size: 24px; font-weight: 900; }
    table { border-collapse: collapse; width: 100%; background: white; font-size: 12px; }
    th, td { border: 1px solid #d8def2; padding: 7px; text-align: left; vertical-align: top; }
    th { background: #edf8fa; color: #111a7a; }
    .screens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    figure { margin: 0; border: 1px solid #d8def2; border-radius: 10px; padding: 10px; background: white; break-inside: avoid; }
    img { display: block; width: 100%; height: auto; border-radius: 8px; }
    figcaption { margin-top: 8px; color: #17214d; font-size: 12px; font-weight: 800; }
    code { background: #eef3ff; padding: 1px 4px; border-radius: 4px; }
    @media print {
      body { padding: 18px; background: white; }
      h2 { break-after: avoid; }
      .summary { grid-template-columns: repeat(4, 1fr); }
      .screens { grid-template-columns: repeat(2, 1fr); }
      table { font-size: 10px; }
    }
  </style>
</head>
<body>
<main>
  <p><strong>Prompt Life</strong> · v0.27.16</p>
  <h1>Journey Visual Aid Consistency Report</h1>
  <p class="lede">This pass adds a reusable visual aid grammar and audits all 39 Journey visual aids for numbered marker/list consistency, mobile-safe callouts, and generated PNG boundaries.</p>

  <section class="summary" aria-label="Report summary">
    <div class="metric"><strong>Audited</strong><span>${audit.summary.total}</span></div>
    <div class="metric"><strong>Mismatches</strong><span>${audit.summary.mismatches}</span></div>
    <div class="metric"><strong>Generated PNGs</strong><span>${audit.summary.generatedImages}</span></div>
    <div class="metric"><strong>Coded aids</strong><span>${audit.summary.codedAids}</span></div>
  </section>

  <h2>Grammar Summary</h2>
  <p>Numbered callouts are now reserved for visuals with matching diagram markers. Generated PNG-backed and atmospheric/metaphorical visuals use unnumbered HTML callouts. Exact mechanism diagrams remain coded SVG/HTML.</p>

  <h2>Top 10 Fixed Items</h2>
  <ol>${renderList(fixedItems)}</ol>

  <h2>Remaining Backlog</h2>
  <ul>${renderList(backlog)}</ul>

  <h2>Image 2 Prompt Summary</h2>
  <p>The prompt sheet recommends future atmospheric PNGs for Collective Intelligence, Benefits, Costs, and Human-Centered AI. It explicitly keeps exact mechanism visuals such as tokenization, vectors, tensors, RAG, grounding, logits, softmax, sampling, and context windows as coded SVG/HTML.</p>

  <h2>39-Card Visual Aid Table</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Type</th>
        <th>Callouts</th>
        <th>Markers</th>
        <th>Items</th>
        <th>Status</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>${renderTable(rows)}</tbody>
  </table>

  <h2>Screenshot QA</h2>
  <div class="screens">${renderScreenshots()}</div>
</main>
</body>
</html>`

  await writeFile(path.join(reportDir, 'prompt-life-v0-27-16-visual-aid-consistency-report.html'), html)
  console.log('Generated visual aid consistency report HTML.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
