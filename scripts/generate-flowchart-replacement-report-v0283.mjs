import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { visualAidReadinessBriefs } from './visual-aid-readiness-data-v0283.mjs'

const root = process.cwd()
const version = '0.28.3'
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-3')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-3-flowchart-replacement-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-3-flowchart-replacement-report.pdf')
const auditPath = path.join(outDir, 'flowchart-replacement-audit-v0-28-3.json')
const overflowPath = path.join(outDir, 'visual-overflow-audit-v0-28-3.json')
const targetIds = [
  'before-morning-finetuning-path',
  'inference-pass',
  'attention',
  'mlp',
  'layers',
  'hidden-states',
  'vectors',
  'tensors',
  'context-window',
  'synthesis-map-compass-lantern'
]

const beforeAfter = {
  'before-morning-finetuning-path': {
    oldIssue: 'Dense durable/current-run comparison risked reading like a flowchart.',
    caption: 'Fine-tuning or adapters can shape future responses. Prompting, retrieval, and sampling shape the current run.'
  },
  'inference-pass': {
    oldIssue: 'Multiple boxes and arrows made fixed weights versus temporary activations feel cramped.',
    caption: 'Inference uses fixed learned weights and current context to produce next-token scores.'
  },
  attention: {
    oldIssue: 'SVG labels and arcs were vulnerable to endpoint drift on narrow screens.',
    caption: 'Attention weights relevance between token positions. It is not awareness.'
  },
  mlp: {
    oldIssue: 'Workshop-style visual tried to show too much mechanism inside one small panel.',
    caption: 'Attention mixes information across token positions. The MLP reshapes each token position’s features.'
  },
  layers: {
    oldIssue: 'Stack flow compressed repeated layer behavior into small labels.',
    caption: 'A transformer layer refines hidden states; many layers repeat the same kind of update.'
  },
  'hidden-states': {
    oldIssue: 'State-flow diagram blurred embedding, hidden state, and durable weight boundaries.',
    caption: 'A hidden state is temporary and context-shaped. It is not the same as an embedding or a durable weight.'
  },
  vectors: {
    oldIssue: 'Teaching-slider comparison risked implying each vector dimension has a neat human label.',
    caption: 'A vector represents something with many numbers at once.'
  },
  tensors: {
    oldIssue: 'Axis-heavy grid carried more labels than the mobile diagram needed.',
    caption: 'A tensor is a shaped block of numbers, often holding many token vectors at once.'
  },
  'context-window': {
    oldIssue: 'Tray metaphor worked, but SVG labels and markers added avoidable density.',
    caption: 'The context window is the limited visible workspace for the current run.'
  },
  'synthesis-map-compass-lantern': {
    oldIssue: 'Full-chain map tried to recap too many mechanisms at once.',
    caption: 'Model literacy connects how the system works with how humans should use it.'
  }
}

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue
    return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required to export the v0.28.3 flowchart replacement report PDF.')
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch {
    return null
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function imageTag(id, width) {
  const file = `${id}-${width}.png`
  const filePath = path.join(screenshotDir, file)
  if (!fs.existsSync(filePath)) {
    return `<div class="missing-shot">Missing screenshot: ${escapeHtml(file)}</div>`
  }
  return `<figure><img src="../screenshots/v0-28-3/${file}" alt="${escapeHtml(`${id} at ${width}px`)}"><figcaption>${width}px</figcaption></figure>`
}

function renderHtml({ audit, overflow }) {
  const briefs = targetIds.map((id) => visualAidReadinessBriefs.find((brief) => brief.currentVisualId === id)).filter(Boolean)
  const auditStatus = audit?.status ?? 'not run'
  const overflowStatus = overflow?.status ?? 'not run'
  const rows = briefs.map((brief) => {
    const detail = beforeAfter[brief.currentVisualId]
    return `
      <tr>
        <td>${escapeHtml(brief.learningCardTitle)}</td>
        <td>${escapeHtml(detail?.oldIssue)}</td>
        <td>${escapeHtml(brief.selectedCanonicalTemplate)}</td>
        <td>${escapeHtml(brief.currentVisualTitle)}</td>
        <td>${escapeHtml(detail?.caption)}</td>
        <td>${brief.calloutsBelowVisual.map((callout) => `<span>${escapeHtml(callout)}</span>`).join('')}</td>
      </tr>
    `
  }).join('')

  const screenshots = briefs.map((brief) => `
    <section class="shot-card">
      <h2>${escapeHtml(brief.learningCardTitle)}: ${escapeHtml(brief.currentVisualTitle)}</h2>
      <div class="shot-grid">
        ${imageTag(brief.currentVisualId, 320)}
        ${imageTag(brief.currentVisualId, 390)}
      </div>
    </section>
  `).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v${version} Flowchart Replacement Report</title>
  <style>
    :root { color: #07124a; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; padding: 32px; background: #f8fbff; }
    h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.05; }
    h2 { margin: 0 0 12px; font-size: 18px; }
    p { max-width: 760px; line-height: 1.48; }
    .summary, table, .shot-card { margin: 18px 0; padding: 18px; border: 1px solid #cfd8ef; border-radius: 12px; background: white; box-shadow: 0 10px 28px rgba(7, 18, 74, 0.08); }
    .summary ul { margin: 0; padding-left: 20px; line-height: 1.55; }
    table { width: 100%; border-collapse: collapse; }
    th, td { vertical-align: top; padding: 10px; border-bottom: 1px solid #e1e7f6; font-size: 12px; line-height: 1.35; }
    th { color: #009f9c; text-align: left; text-transform: uppercase; font-size: 10px; letter-spacing: 0.04em; }
    td span { display: block; margin-bottom: 4px; }
    .shot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    figure { margin: 0; }
    img { display: block; width: 100%; border: 1px solid #cfd8ef; border-radius: 10px; background: #eef7ff; }
    figcaption, .missing-shot { margin-top: 6px; color: #4f5b7a; font-size: 12px; font-weight: 800; }
    .missing-shot { padding: 36px 12px; border: 1px dashed #9aa8ca; border-radius: 10px; text-align: center; }
    @media print {
      body { padding: 20px; background: white; }
      .shot-card { break-inside: avoid; page-break-inside: avoid; }
      table { break-inside: auto; }
      tr { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v${version} Flowchart Replacement Report</h1>
  <p>Generated ${new Date().toISOString()}. This packet documents the hand-specified mobile diagrams that replaced the target flowchart-like Journey visuals.</p>
  <section class="summary">
    <h2>Summary</h2>
    <ul>
      <li>Visuals changed: ${briefs.length}</li>
      <li>Flowchart-like target visuals replaced: ${briefs.length}</li>
      <li>Templates used: ${[...new Set(briefs.map((brief) => brief.selectedCanonicalTemplate))].join(', ')}</li>
      <li>Flowchart replacement audit: ${escapeHtml(auditStatus)}</li>
      <li>Visual overflow audit: ${escapeHtml(overflowStatus)}</li>
    </ul>
  </section>
  <section>
    <h2>Before / After Table</h2>
    <table>
      <thead>
        <tr>
          <th>Visual</th>
          <th>Old issue</th>
          <th>New template</th>
          <th>New title</th>
          <th>New caption</th>
          <th>New callouts</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <section>
    <h2>Screenshots</h2>
    ${screenshots}
  </section>
  <section class="summary">
    <h2>Remaining Concerns</h2>
    <p>The ten target visuals now use hand-specified mobile templates. Remaining acceptable-for-testing concerns are pedagogical rather than overflow related: testers should still report whether the vector and tensor visuals feel too abstract, and whether the final synthesis board is memorable enough after simplification.</p>
  </section>
</body>
</html>`
}

async function exportPdf() {
  const { chromium } = getPlaywright()
  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : undefined
  })
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } })
    await page.goto(pathToFileURL(reportHtmlPath).href, { waitUntil: 'networkidle' })
    await page.pdf({ path: reportPdfPath, format: 'Letter', printBackground: true, margin: { top: '0.45in', right: '0.35in', bottom: '0.45in', left: '0.35in' } })
  } finally {
    await browser.close()
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const audit = await readJsonIfExists(auditPath)
  const overflow = await readJsonIfExists(overflowPath)
  await writeFile(reportHtmlPath, renderHtml({ audit, overflow }))
  await exportPdf()
  console.log(`Wrote ${reportHtmlPath}`)
  console.log(`Wrote ${reportPdfPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
