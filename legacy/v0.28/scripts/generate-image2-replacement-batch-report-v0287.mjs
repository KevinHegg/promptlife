import { createRequire } from 'node:module'
import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const manifestPath = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28', 'manifest.json')
const auditPath = path.join(outDir, 'visual-asset-audit-v0-28-7.json')
const verificationPath = path.join(outDir, 'prompt-life-v0-28-7-verification-results.json')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-7-image2-replacement-batch-1-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-7-image2-replacement-batch-1-report.pdf')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-7-image2-batch-1')

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(await readFile(filePath, 'utf8'))
}

function screenshotSrc(fileName) {
  return `../screenshots/v0-28-7-image2-batch-1/${fileName}`
}

function existingScreenshot(fileName) {
  return fs.existsSync(path.join(screenshotDir, fileName))
}

function renderAssetRows(manifest, audit) {
  return manifest.assets.map((asset) => {
    const auditRow = audit?.rows?.find((row) => row.cardId === asset.cardId)
    const dimensions = asset.dimensions ? `${asset.dimensions.width}x${asset.dimensions.height}` : 'n/a'
    const fileSize = asset.fileSizeBytes ? `${Math.round(asset.fileSizeBytes / 1024)} KB` : 'n/a'
    return `
      <tr>
        <td>${escapeHtml(asset.stage)}</td>
        <td><strong>${escapeHtml(asset.title)}</strong><br><code>${escapeHtml(asset.cardId)}</code></td>
        <td><span class="status status-${escapeHtml(asset.status)}">${escapeHtml(asset.status)}</span></td>
        <td>${escapeHtml(dimensions)}<br>${escapeHtml(fileSize)}</td>
        <td>${escapeHtml(asset.imageTextVerified ? 'verified' : asset.containsEmbeddedText ? 'needs review' : 'textless / not live')}</td>
        <td>${escapeHtml(asset.missingReason ?? asset.rejectionReason ?? asset.notes)}</td>
        <td>${escapeHtml(auditRow?.issues?.join('; ') || 'ok')}</td>
      </tr>
    `
  }).join('')
}

function renderVerification(verification) {
  if (!verification?.commands?.length) {
    return '<p>Verification command results were not attached when this report was generated.</p>'
  }
  return `
    <table>
      <thead><tr><th>Command</th><th>Status</th><th>Notes</th></tr></thead>
      <tbody>
        ${verification.commands.map((item) => `
          <tr>
            <td><code>${escapeHtml(item.command)}</code></td>
            <td>${item.status === 'pass' ? 'pass' : 'fail'}</td>
            <td>${escapeHtml(item.notes ?? '')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

function renderScreenshotFigure(fileName, caption) {
  if (!existingScreenshot(fileName)) return `<div class="shot missing"><strong>${escapeHtml(caption)}</strong><span>Screenshot not captured.</span></div>`
  return `
    <figure class="shot">
      <img src="${escapeHtml(screenshotSrc(fileName))}" alt="${escapeHtml(caption)}">
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `
}

function renderHtml(manifest, audit, verification) {
  const assets = manifest.assets ?? []
  const liveAssets = assets.filter((asset) => asset.status === 'live')
  const missingAssets = assets.filter((asset) => asset.status === 'missing')
  const rejectedAssets = assets.filter((asset) => asset.status === 'rejected')
  const pendingAssets = assets.filter((asset) => asset.status === 'pending-asset' || asset.status === 'pending-placeholder')
  const foundAssets = assets.filter((asset) => fs.existsSync(path.join(root, 'public', asset.assetPath.replace(/^\//, ''))) && fs.existsSync(path.join(root, 'public', asset.thumbPath.replace(/^\//, ''))))
  const changedLabels = [
    'Fine-Tuning boundary board label changed from Find to Retrieve.',
    'Hidden States boundary board uses Embedding. The legacy SVG fallback was also updated from Embed to Embedding.',
    'Attention token sentence now reads dog | saw | cat | because | it | hissed.'
  ]

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.7 Image 2 Replacement Batch 1 Report</title>
  <style>
    :root {
      color: #07124a;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      word-break: normal;
      overflow-wrap: normal;
      hyphens: none;
    }
    body { margin: 0; padding: 32px; background: #f6fbff; }
    h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.08; }
    h2 { margin: 0 0 12px; font-size: 18px; }
    h3 { margin: 0 0 8px; font-size: 14px; }
    p, li { line-height: 1.45; }
    .lede { max-width: 900px; color: #2d3b62; }
    .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 18px 0; }
    .metric, .panel, table, .shot {
      background: white;
      border: 1px solid #cdd7ef;
      border-radius: 12px;
      box-shadow: 0 10px 26px rgba(7, 18, 74, 0.08);
    }
    .metric { padding: 14px; }
    .metric strong { display: block; font-size: 26px; line-height: 1; }
    .metric span, th, .eyebrow { color: #009f9c; font-size: 10px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; }
    .panel { padding: 18px; margin: 18px 0; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; overflow: hidden; }
    th, td { vertical-align: top; padding: 9px; border-bottom: 1px solid #e1e7f6; font-size: 10.5px; line-height: 1.35; }
    th { text-align: left; }
    code { color: #121e72; font-size: 10px; }
    .status { display: inline-flex; padding: 4px 7px; border-radius: 999px; font-weight: 900; background: #eef7ff; }
    .status-live { background: #dffaf2; color: #065f4e; }
    .status-missing { background: #fff4de; color: #704800; }
    .status-rejected { background: #ffe4e6; color: #8a1124; }
    .shot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .shot { margin: 0; padding: 10px; break-inside: avoid; }
    .shot img { display: block; width: 100%; height: auto; border-radius: 8px; border: 1px solid #d8e2f4; }
    .shot figcaption, .shot span { display: block; margin-top: 8px; color: #334366; font-size: 11px; line-height: 1.35; }
    .missing { min-height: 120px; display: grid; place-content: center; text-align: center; }
    @media print {
      body { padding: 20px; background: white; }
      .panel, tr, .shot { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.7 Image 2 Replacement Batch 1</h1>
  <p class="lede">Generated ${new Date().toISOString()}. This pass integrates verified Image 2 concept-card assets only when optimized and thumbnail files exist and the asset passes manifest/audit checks. Missing or unverified entries keep their current coded/generated visuals in normal learner mode.</p>

  <section class="metrics">
    <div class="metric"><strong>${assets.length}</strong><span>Manifest entries</span></div>
    <div class="metric"><strong>${foundAssets.length}</strong><span>Assets found</span></div>
    <div class="metric"><strong>${liveAssets.length}</strong><span>Live</span></div>
    <div class="metric"><strong>${missingAssets.length}</strong><span>Missing</span></div>
    <div class="metric"><strong>${rejectedAssets.length}</strong><span>Rejected</span></div>
  </section>

  <section class="panel">
    <p class="eyebrow">Summary</p>
    <h2>One Image 2 asset went live</h2>
    <p><strong>Collective Intelligence, Extracted</strong> now renders the verified Image 2 concept card from the v0-28 optimized asset folder. Eleven manifest candidates remain marked <code>missing</code>, so their current visuals stay active. No normal learner-facing pending placeholder is rendered in this pass.</p>
  </section>

  <section class="panel">
    <p class="eyebrow">Preflight</p>
    <h2>Label Corrections</h2>
    <ul>${changedLabels.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
  </section>

  <section class="panel">
    <p class="eyebrow">Manifest</p>
    <h2>Batch 1 Asset Status</h2>
    <table>
      <thead><tr><th>Stage</th><th>Card</th><th>Status</th><th>Size</th><th>Text Check</th><th>Notes</th><th>Audit</th></tr></thead>
      <tbody>${renderAssetRows(manifest, audit)}</tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Screenshots</p>
    <h2>Before / After and Mobile QA</h2>
    <div class="shot-grid">
      <figure class="shot">
        <img src="../screenshots/v0-28-3/collective-intelligence-lantern-390.png" alt="Before screenshot of the coded Collective Intelligence visual at 390px">
        <figcaption>Before: coded Collective Intelligence visual from v0.28.3 at 390px.</figcaption>
      </figure>
      ${renderScreenshotFigure('collective-intelligence-image2-390.png', 'After: Image 2 Collective Intelligence visual at 390px.')}
      ${renderScreenshotFigure('collective-intelligence-image2-320.png', 'After: Image 2 Collective Intelligence visual at 320px.')}
      ${renderScreenshotFigure('collective-intelligence-image2-desktop-1024.png', 'After: Image 2 Collective Intelligence visual on desktop.')}
      ${renderScreenshotFigure('journey-card-collective-intelligence-390-fullpage.png', 'Journey card smoke: Collective Intelligence live asset.')}
      ${renderScreenshotFigure('missing-asset-current-visual-perfect-storm-390.png', 'Missing asset smoke: Perfect Storm keeps the current visual.')}
      ${renderScreenshotFigure('badge-smoke-390.png', 'Badge smoke screenshot.')}
      ${renderScreenshotFigure('play-smoke-390.png', 'Play smoke screenshot.')}
      ${renderScreenshotFigure('glossary-smoke-390.png', 'Glossary smoke screenshot.')}
    </div>
  </section>

  <section class="panel">
    <p class="eyebrow">Verification</p>
    <h2>Command Results</h2>
    ${renderVerification(verification)}
  </section>

  <section class="panel">
    <p class="eyebrow">Backlog</p>
    <h2>Remaining Visual Strategy Backlog</h2>
    <p>P0 before human testing remains: Multimodal AI, The Perfect Storm, Costs We Must Count, Risk vs Myth, and Model Literate Synthesis. P1 remains: What Is an LLM?, Pretraining, Alignment, Benefits Worth Taking Seriously, Human-Centered AI, and Better AI Is a Choice. Collective Intelligence is now live and should be reviewed with learners for concept clarity.</p>
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
  throw new Error('Playwright is required to export the v0.28.7 Image 2 batch PDF.')
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
  const manifest = await readJson(manifestPath, { assets: [] })
  const audit = await readJson(auditPath, { rows: [], summary: {} })
  const verification = await readJson(verificationPath, null)
  await writeFile(reportHtmlPath, renderHtml(manifest, audit, verification))
  await exportPdf()
  console.log(`Wrote ${reportHtmlPath}`)
  console.log(`Wrote ${reportPdfPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
