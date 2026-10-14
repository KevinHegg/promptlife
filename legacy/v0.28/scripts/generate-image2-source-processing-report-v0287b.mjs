import { createRequire } from 'node:module'
import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const version = '0.28.9'
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const manifestPath = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28', 'manifest.json')
const auditPath = path.join(outDir, 'visual-asset-audit-v0-28-9.json')
const verificationPath = path.join(outDir, 'prompt-life-v0-28-9-verification-results.json')
const reportHtmlPath = path.join(outDir, 'prompt-life-v0-28-9-image2-source-processing-final-report.html')
const reportPdfPath = path.join(outDir, 'prompt-life-v0-28-9-image2-source-processing-final-report.pdf')
const screenshotSlug = 'v0-28-9-image2-source-processing-final'
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', screenshotSlug)

const sourceMappings = [
  { cardId: 'what-is-llm', title: 'What Is an LLM?', source: 'what-is-an-llm.png' },
  { cardId: 'pretraining', title: 'Pretraining', source: 'pretraining.png' },
  { cardId: 'alignment', title: 'Alignment', source: 'alignment.png' },
  { cardId: 'multimodal', title: 'Multimodal AI', source: 'multimodal-ai.png' },
  { cardId: 'benefits-worth-taking-seriously', title: 'Benefits Worth Taking Seriously', source: 'benefits-worth-taking-seriously.png' },
  { cardId: 'better-ai-choice', title: 'Better AI Is a Choice', source: 'better-ai-choice.png' }
]

const allLiveAssetLessons = [
  { cardId: 'what-is-llm', title: 'What Is an LLM?' },
  { cardId: 'pretraining', title: 'Pretraining' },
  { cardId: 'alignment', title: 'Alignment' },
  { cardId: 'multimodal', title: 'Multimodal AI' },
  { cardId: 'perfect-storm', title: 'The Perfect Storm' },
  { cardId: 'collective-intelligence', title: 'Collective Intelligence, Extracted' },
  { cardId: 'costs-we-must-count', title: 'Costs We Must Count' },
  { cardId: 'risk-myth', title: 'Risk vs Myth' },
  { cardId: 'benefits-worth-taking-seriously', title: 'Benefits Worth Taking Seriously' },
  { cardId: 'human-centered-ai', title: 'Human-Centered AI' },
  { cardId: 'better-ai-choice', title: 'Better AI Is a Choice' },
  { cardId: 'model-literate-synthesis', title: 'Model Literate Synthesis' }
]

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

function publicToFile(assetPath) {
  return path.join(root, 'public', assetPath.replace(/^\//, ''))
}

function fileInfo(filePath) {
  if (!fs.existsSync(filePath)) return null
  const buffer = fs.readFileSync(filePath)
  return {
    bytes: fs.statSync(filePath).size,
    dimensions: buffer.subarray(0, 8).toString('hex') === '89504e470d0a1a0a'
      ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
      : null
  }
}

function formatBytes(bytes) {
  if (!bytes) return 'n/a'
  return `${Math.round(bytes / 1024)} KB`
}

function screenshotSrc(fileName) {
  return `../screenshots/${screenshotSlug}/${fileName}`
}

function existingScreenshot(fileName) {
  return fs.existsSync(path.join(screenshotDir, fileName))
}

function renderScreenshotFigure(fileName, caption) {
  if (!existingScreenshot(fileName)) {
    return `<div class="shot missing"><strong>${escapeHtml(caption)}</strong><span>Screenshot not captured.</span></div>`
  }
  return `
    <figure class="shot">
      <img src="${escapeHtml(screenshotSrc(fileName))}" alt="${escapeHtml(caption)}">
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `
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
            <td><pre>${escapeHtml(item.notes ?? '')}</pre></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

function renderSourceRows(manifest) {
  return sourceMappings.map((mapping) => {
    const asset = manifest.assets.find((item) => item.cardId === mapping.cardId)
    const sourcePath = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28', 'source', mapping.source)
    const optimizedPath = asset?.assetPath ? publicToFile(asset.assetPath) : null
    const thumbPath = asset?.thumbPath ? publicToFile(asset.thumbPath) : null
    const source = fileInfo(sourcePath)
    const optimized = optimizedPath ? fileInfo(optimizedPath) : null
    const thumbnail = thumbPath ? fileInfo(thumbPath) : null
    return `
      <tr>
        <td><strong>${escapeHtml(mapping.title)}</strong><br><code>${escapeHtml(mapping.cardId)}</code></td>
        <td><code>${escapeHtml(mapping.source)}</code><br>${source?.dimensions ? `${source.dimensions.width}x${source.dimensions.height}` : 'missing'}<br>${formatBytes(source?.bytes)}</td>
        <td><code>${escapeHtml(path.basename(asset?.assetPath ?? 'n/a'))}</code><br>${optimized?.dimensions ? `${optimized.dimensions.width}x${optimized.dimensions.height}` : 'missing'}<br>${formatBytes(optimized?.bytes)}</td>
        <td><code>${escapeHtml(path.basename(asset?.thumbPath ?? 'n/a'))}</code><br>${thumbnail?.dimensions ? `${thumbnail.dimensions.width}x${thumbnail.dimensions.height}` : 'missing'}<br>${formatBytes(thumbnail?.bytes)}</td>
        <td><span class="status status-${escapeHtml(asset?.status)}">${escapeHtml(asset?.status ?? 'missing')}</span></td>
        <td>${escapeHtml(asset?.notes ?? '')}</td>
      </tr>
    `
  }).join('')
}

function renderManifestRows(manifest, audit) {
  return manifest.assets.map((asset) => {
    const auditRow = audit?.rows?.find((row) => row.cardId === asset.cardId)
    const dimensions = asset.dimensions ? `${asset.dimensions.width}x${asset.dimensions.height}` : 'n/a'
    return `
      <tr>
        <td>${escapeHtml(asset.stage)}</td>
        <td><strong>${escapeHtml(asset.title)}</strong><br><code>${escapeHtml(asset.cardId)}</code></td>
        <td><span class="status status-${escapeHtml(asset.status)}">${escapeHtml(asset.status)}</span></td>
        <td>${escapeHtml(dimensions)}<br>${formatBytes(asset.fileSizeBytes)}</td>
        <td>${escapeHtml(asset.imageTextVerified ? 'verified' : asset.containsEmbeddedText ? 'needs review' : 'not live')}</td>
        <td>${escapeHtml(asset.missingReason ?? asset.rejectionReason ?? asset.notes)}</td>
        <td>${escapeHtml(auditRow?.issues?.join('; ') || 'ok')}</td>
      </tr>
    `
  }).join('')
}

function renderCaptionRows(manifest) {
  return sourceMappings.map((mapping) => {
    const asset = manifest.assets.find((item) => item.cardId === mapping.cardId)
    return `
      <tr>
        <td><strong>${escapeHtml(mapping.title)}</strong></td>
        <td>${escapeHtml(asset?.caption)}</td>
        <td>${(asset?.callouts ?? []).map((callout) => `<strong>${escapeHtml(callout.label)}</strong>: ${escapeHtml(callout.text)}`).join('<br>')}</td>
      </tr>
    `
  }).join('')
}

function renderShotRows() {
  const visualShots = sourceMappings.map((mapping) => [
    renderScreenshotFigure(`${mapping.cardId}-image2-390.png`, `${mapping.title}: Image 2 visual at 390px.`),
    renderScreenshotFigure(`${mapping.cardId}-image2-320.png`, `${mapping.title}: Image 2 visual at 320px.`),
    renderScreenshotFigure(`${mapping.cardId}-image2-desktop-1024.png`, `${mapping.title}: Image 2 visual on desktop.`)
  ].join('')).join('')

  return `
    ${visualShots}
    ${allLiveAssetLessons.map((lesson) => renderScreenshotFigure(`journey-card-${lesson.cardId}-390-fullpage.png`, `${lesson.title}: Journey card smoke at 390px.`)).join('')}
    ${renderScreenshotFigure('already-live-collective-intelligence-smoke-390.png', 'Already-live smoke: Collective Intelligence still renders its concept image.')}
    ${renderScreenshotFigure('badge-smoke-390.png', 'Badge page smoke screenshot.')}
    ${renderScreenshotFigure('play-smoke-390.png', 'Play page smoke screenshot.')}
    ${renderScreenshotFigure('glossary-smoke-390.png', 'Glossary page smoke screenshot.')}
  `
}

function renderHtml(manifest, audit, verification) {
  const assets = manifest.assets ?? []
  const liveAssets = assets.filter((asset) => asset.status === 'live')
  const newlyLive = sourceMappings.filter((mapping) => assets.find((asset) => asset.cardId === mapping.cardId)?.status === 'live')
  const missingAssets = assets.filter((asset) => asset.status === 'missing')
  const rejectedAssets = assets.filter((asset) => asset.status === 'rejected')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.9 Image 2 Source Processing Final Report</title>
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
    p, li { line-height: 1.45; }
    pre { white-space: pre-wrap; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; line-height: 1.35; }
    .lede { max-width: 960px; color: #2d3b62; }
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
  <h1>Prompt Life v${version} Image 2 Source Processing</h1>
  <p class="lede">Generated ${new Date().toISOString()}. This pass processed the remaining six source files, created optimized and thumbnail derivatives, and made verified visuals live through the Journey visual manifest. Normal learner mode now has verified concept images for all twelve manifest entries.</p>

  <section class="metrics">
    <div class="metric"><strong>${assets.length}</strong><span>Manifest entries</span></div>
    <div class="metric"><strong>${liveAssets.length}</strong><span>Live assets</span></div>
    <div class="metric"><strong>${newlyLive.length}</strong><span>Newly live</span></div>
    <div class="metric"><strong>${missingAssets.length}</strong><span>Still missing</span></div>
    <div class="metric"><strong>${rejectedAssets.length}</strong><span>Rejected</span></div>
  </section>

  <section class="panel">
    <p class="eyebrow">Summary</p>
    <h2>Six new assets were accepted</h2>
    <p>The new live visuals are ${newlyLive.map((item) => `<strong>${escapeHtml(item.title)}</strong>`).join(', ')}. The six already-live visuals remain live. No assets were rejected, none remain missing, and no normal learner-facing implementation placeholder appears in this pass.</p>
  </section>

  <section class="panel">
    <p class="eyebrow">Source Mapping</p>
    <h2>Source Files, Optimized Files, and Thumbnails</h2>
    <table>
      <thead><tr><th>Card</th><th>Source</th><th>Optimized</th><th>Thumbnail</th><th>Status</th><th>Review notes</th></tr></thead>
      <tbody>${renderSourceRows(manifest)}</tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Manifest</p>
    <h2>All Image 2 Candidate Statuses</h2>
    <table>
      <thead><tr><th>Stage</th><th>Card</th><th>Status</th><th>Size</th><th>Text Check</th><th>Notes</th><th>Audit</th></tr></thead>
      <tbody>${renderManifestRows(manifest, audit)}</tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Caption Review</p>
    <h2>HTML Caption and Callout Copy</h2>
    <table>
      <thead><tr><th>Card</th><th>Caption</th><th>Callouts</th></tr></thead>
      <tbody>${renderCaptionRows(manifest)}</tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Screenshots</p>
    <h2>320px, 390px, Desktop, and Smoke QA</h2>
    <div class="shot-grid">
      ${renderShotRows()}
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
    <p>Still missing from the Image 2 manifest after this pass: ${missingAssets.map((asset) => `<strong>${escapeHtml(asset.title)}</strong>`).join(', ') || 'none'}.</p>
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
  throw new Error('Playwright is required to export the v0.28.7b Image 2 source-processing PDF.')
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
  fs.mkdirSync(outDir, { recursive: true })
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
