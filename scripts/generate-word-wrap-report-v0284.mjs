import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const version = '0.28.4'
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-4-word-wrap')
const auditPath = path.join(outDir, 'word-wrap-audit-v0-28-4.json')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-4-word-wrap-guardrails-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-4-word-wrap-guardrails-report.pdf')

const screenshotIds = [
  ['prompt-response', 'Prompt vs Response'],
  ['tokenization', 'Text to Tokens'],
  ['before-morning-finetuning-path', 'Fine-Tuning'],
  ['inference-pass', 'Inference'],
  ['attention', 'Attention'],
  ['mlp', 'MLP'],
  ['layers', 'Layers'],
  ['hidden-states', 'Hidden States'],
  ['vectors', 'Vectors'],
  ['tensors', 'Tensors'],
  ['context-window', 'Context Window'],
  ['synthesis-map-compass-lantern', 'Model Literate Synthesis']
]

const shortenedLabels = [
  ['provided before generation', 'given first', 'Prompt vs Response internal panel subtitle'],
  ['what the next run sees', 'next run sees', 'Prompt vs Response internal panel subtitle'],
  ['human-readable sentence', 'sentence', 'Tokenization source panel subtitle'],
  ['model-readable chunks', 'token chunks', 'Tokenization stream panel subtitle'],
  ['tokens are not always words', 'not always words', 'Tokenization uneven-example panel subtitle'],
  ['A jealous dog chased a startled cat...', 'A jealous dog...', 'Tokenization source panel text'],
  ['Temporary activations', 'Activations', 'Inference mechanism-strip row'],
  ['Retrieve', 'Find', 'Fine-Tuning boundary-board label'],
  ['Embedding', 'Embed', 'Hidden States boundary-board label'],
  ['Model mechanics', 'Model', 'Model Literate Synthesis boundary-board label'],
  ['Evidence checking', 'Evidence', 'Model Literate Synthesis boundary-board label'],
  ['Human responsibility', 'Human role', 'Model Literate Synthesis boundary-board label'],
  ['chased / because / hissed', 'saw / as / ran', 'Attention token chips']
]

const movedToCallouts = [
  'Temporary activations remains fully explained in the Inference HTML callout.',
  'Human responsibility remains fully explained in the Model Literate Synthesis caption and callout.',
  'Full retrieval, embedding, mechanics, and evidence-checking terms remain in captions, callouts, glossary chips, and accessible descriptions.',
  'The full tokenization sentence stays in the lesson/callouts rather than inside a small diagram panel.',
  'Prompt/response timing detail stays in the callouts rather than long panel subtitles.'
]

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required to export the v0.28.4 word-wrap report PDF.')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch {
    return null
  }
}

function screenshotFigure(id, width) {
  const file = `${id}-${width}.png`
  const filePath = path.join(screenshotDir, file)
  if (!fs.existsSync(filePath)) {
    return `<div class="missing-shot">Missing screenshot: ${escapeHtml(file)}</div>`
  }
  return `
    <figure>
      <img src="../screenshots/v0-28-4-word-wrap/${escapeHtml(file)}" alt="${escapeHtml(`${id} at ${width}px`)}">
      <figcaption>${width}px</figcaption>
    </figure>
  `
}

function renderHtml(audit) {
  const auditStatus = audit?.status ?? 'not run'
  const counts = audit?.counts ?? {}
  const labelRows = shortenedLabels.map(([before, after, location]) => `
    <tr>
      <td>${escapeHtml(location)}</td>
      <td>${escapeHtml(before)}</td>
      <td>${escapeHtml(after)}</td>
    </tr>
  `).join('')
  const screenshots = screenshotIds.map(([id, label]) => `
    <section class="shot-card">
      <h2>${escapeHtml(label)}</h2>
      <div class="shot-grid">
        ${screenshotFigure(id, 320)}
        ${screenshotFigure(id, 390)}
      </div>
    </section>
  `).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v${version} Word-Wrap Guardrails Report</title>
  <style>
    :root {
      color: #07124a;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      word-break: normal;
      overflow-wrap: normal;
      hyphens: none;
    }
    body { margin: 0; padding: 32px; background: #f8fbff; }
    h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.05; }
    h2 { margin: 0 0 12px; font-size: 18px; }
    p, li { max-width: 780px; line-height: 1.5; }
    .summary, table, .shot-card {
      margin: 18px 0;
      padding: 18px;
      border: 1px solid #cfd8ef;
      border-radius: 12px;
      background: white;
      box-shadow: 0 10px 28px rgba(7, 18, 74, 0.08);
    }
    .summary ul { margin: 0; padding-left: 20px; line-height: 1.55; }
    table { width: 100%; border-collapse: collapse; }
    th, td { vertical-align: top; padding: 10px; border-bottom: 1px solid #e1e7f6; font-size: 12px; line-height: 1.35; }
    th { color: #009f9c; text-align: left; text-transform: uppercase; font-size: 10px; letter-spacing: 0.04em; }
    code { color: #121e72; }
    .shot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    figure { margin: 0; }
    img { display: block; width: 100%; border: 1px solid #cfd8ef; border-radius: 10px; background: #eef7ff; }
    figcaption, .missing-shot { margin-top: 6px; color: #4f5b7a; font-size: 12px; font-weight: 800; }
    .missing-shot { padding: 36px 12px; border: 1px dashed #9aa8ca; border-radius: 10px; text-align: center; }
    @media print {
      body { padding: 20px; background: white; }
      .shot-card { break-inside: avoid; page-break-inside: avoid; }
      tr { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v${version} Word-Wrap Guardrails Report</h1>
  <p>Generated ${new Date().toISOString()}. This packet documents the typography and visual-label repair pass for mobile Journey visuals.</p>

  <section class="summary">
    <h2>Audit Result</h2>
    <ul>
      <li>audit:word-wrap status: ${escapeHtml(auditStatus)}</li>
      <li>Unsafe wrapping CSS issues: ${escapeHtml(counts.unsafeCss ?? 'not run')}</li>
      <li>Known bad split strings: ${escapeHtml(counts.badSplits ?? 'not run')}</li>
      <li>Long internal labels: ${escapeHtml(counts.longLabels ?? 'not run')}</li>
      <li>Paragraphs inside diagram bodies: ${escapeHtml(counts.diagramParagraphs ?? 'not run')}</li>
    </ul>
  </section>

  <section class="summary">
    <h2>CSS Rules Changed</h2>
    <ul>
      <li>Replaced arbitrary overflow wrapping in current app CSS with natural wrapping.</li>
      <li>Added shared guardrail classes: <code>.visual-label</code>, <code>.visual-chip</code>, <code>.visual-node-label</code>, <code>.visual-callout-title</code>, and <code>.visual-callout-body</code>.</li>
      <li>Visual labels now use <code>word-break: normal</code>, <code>overflow-wrap: normal</code>, and <code>hyphens: none</code>.</li>
      <li>Four-column boundary boards collapse to a 2-by-2 layout at very narrow widths so labels have room to wrap at spaces.</li>
    </ul>
  </section>

  <section>
    <h2>Visual Labels Shortened</h2>
    <table>
      <thead><tr><th>Location</th><th>Before</th><th>After</th></tr></thead>
      <tbody>${labelRows}</tbody>
    </table>
  </section>

  <section class="summary">
    <h2>Moved To Callouts</h2>
    <ul>
      ${movedToCallouts.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  </section>

  <section>
    <h2>320px And 390px Screenshots</h2>
    ${screenshots}
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
      : undefined,
    args: ['--no-sandbox']
  })
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } })
    await page.goto(pathToFileURL(reportHtmlPath).href, { waitUntil: 'networkidle' })
    await page.pdf({
      path: reportPdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.45in', right: '0.35in', bottom: '0.45in', left: '0.35in' }
    })
  } finally {
    await browser.close()
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const audit = await readJsonIfExists(auditPath)
  await writeFile(reportHtmlPath, renderHtml(audit))
  await exportPdf()
  console.log(`Wrote ${reportHtmlPath}`)
  console.log(`Wrote ${reportPdfPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
