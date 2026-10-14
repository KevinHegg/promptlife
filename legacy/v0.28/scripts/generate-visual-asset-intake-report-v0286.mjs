import { createRequire } from 'node:module'
import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const manifestPath = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28', 'manifest.json')
const auditPath = path.join(outDir, 'visual-asset-audit-v0-28-6.json')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-6-visual-asset-intake-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-6-visual-asset-intake-report.pdf')

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

function renderHtml(manifest, audit) {
  const rows = manifest.assets.map((asset) => {
    const auditRow = audit.rows.find((row) => row.cardId === asset.cardId)
    return `
      <tr>
        <td>${escapeHtml(asset.stage)}</td>
        <td><strong>${escapeHtml(asset.title)}</strong><br><code>${escapeHtml(asset.cardId)}</code></td>
        <td>${escapeHtml(asset.status)}</td>
        <td><code>${escapeHtml(asset.assetPath)}</code><br><code>${escapeHtml(asset.thumbPath)}</code></td>
        <td>${escapeHtml(asset.alt)}</td>
        <td>${escapeHtml(asset.caption)}</td>
        <td>${escapeHtml(auditRow?.issues?.join('; ') || 'ok')}</td>
      </tr>
    `
  }).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.6 Visual Asset Intake Report</title>
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
    .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 18px 0; }
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
    code { color: #121e72; font-size: 10px; }
    @media print {
      body { padding: 20px; background: white; }
      .panel, tr { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.6 Visual Asset Intake Report</h1>
  <p class="lede">Generated ${new Date().toISOString()}. This pass creates a safe intake system for future Journey Image 2 assets. No new images were generated and no current Journey visuals were replaced.</p>

  <section class="metrics">
    <div class="metric"><strong>${manifest.assets.length}</strong><span>Manifest entries</span></div>
    <div class="metric"><strong>${audit.summary.pending}</strong><span>Pending assets</span></div>
    <div class="metric"><strong>${audit.summary.live}</strong><span>Live assets</span></div>
    <div class="metric"><strong>${audit.summary.issueCount}</strong><span>Audit issues</span></div>
  </section>

  <section class="panel">
    <h2>Intake System</h2>
    <ul>
      <li>Folder structure created under <code>public/assets/journey-visuals/v0-28/</code>.</li>
      <li>Manifest created with pending Image 2 concept-card entries.</li>
      <li>Renderer can keep coded visuals, render live manifest images, or show a clean pending placeholder.</li>
      <li>Pending manifest entries do not replace current coded visuals.</li>
      <li>Validation command: <code>npm run audit:visual-assets</code>.</li>
    </ul>
  </section>

  <section class="panel">
    <h2>Renderer Behavior</h2>
    <ul>
      <li><code>pending-asset</code>: current coded/generated visual remains active.</li>
      <li><code>pending-placeholder</code>: learner sees “Visual update pending” with normal callouts below.</li>
      <li><code>live</code>: manifest image renders from the optimized asset path and must pass thumbnail, text-verification, dimension, and file-size checks.</li>
    </ul>
  </section>

  <section>
    <h2>Manifest Entries</h2>
    <table>
      <thead>
        <tr><th>Stage</th><th>Card</th><th>Status</th><th>Paths</th><th>Alt</th><th>Caption</th><th>Audit</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
</body>
</html>`
}

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required to export the v0.28.6 visual asset intake PDF.')
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
  const manifest = await readJson(manifestPath)
  const audit = await readJson(auditPath)
  await writeFile(reportHtmlPath, renderHtml(manifest, audit))
  await exportPdf()
  console.log(`Wrote ${reportHtmlPath}`)
  console.log(`Wrote ${reportPdfPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
