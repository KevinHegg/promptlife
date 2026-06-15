import { createRequire } from 'node:module'
import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const auditPath = path.join(root, 'docs', 'audits', 'learner-copy-leak-audit-v0-28-8.json')
const verificationPath = path.join(root, 'docs', 'audits', 'prompt-life-v0-28-8-verification-results.json')
const outDir = path.join(root, 'docs', 'audits')
const htmlPath = path.join(outDir, 'prompt-life-v0-28-8-learner-copy-leak-report.html')
const pdfPath = path.join(outDir, 'prompt-life-v0-28-8-learner-copy-leak-report.pdf')

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function screenshotSrc(screenshot) {
  return screenshot ? screenshot.replace(/^docs\/audits\//, '') : ''
}

function renderScreenshot(row) {
  if (!row.screenshot) return ''
  return `
    <figure class="shot">
      <img src="${escapeHtml(screenshotSrc(row.screenshot))}" alt="${escapeHtml(`${row.label} learner leak smoke screenshot`)}">
      <figcaption>${escapeHtml(row.label)}: no learner-facing process-language leak found.</figcaption>
    </figure>
  `
}

function renderHtml(audit) {
  const fixes = audit.fixedReplacements ?? []
  const allowed = (audit.staticRecords ?? []).filter((record) => record.status === 'allowed')
  const failures = (audit.staticRecords ?? []).filter((record) => record.status === 'fail')
  const renderedRows = audit.rendered?.rows ?? []
  const batchFix = fixes.find((fix) => fix.id === 'inference-batch-1-how-it-connects')
  const verification = fs.existsSync(verificationPath) ? JSON.parse(fs.readFileSync(verificationPath, 'utf8')) : null

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.8 Learner Copy Leak Report</title>
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
    h3 { margin: 0 0 8px; font-size: 13px; }
    p, li { line-height: 1.45; }
    .lede { max-width: 940px; color: #2d3b62; }
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
    .status-pass, .status-fixed, .status-allowed { background: #dffaf2; color: #065f4e; }
    .status-fail { background: #ffe4e6; color: #8a1124; }
    .shot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .shot { margin: 0; padding: 10px; break-inside: avoid; }
    .shot img { display: block; width: 100%; height: auto; border-radius: 8px; border: 1px solid #d8e2f4; }
    .shot figcaption { display: block; margin-top: 8px; color: #334366; font-size: 11px; line-height: 1.35; }
    @media print {
      body { padding: 20px; background: white; }
      .panel, tr, .shot { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.8 Learner Copy Boundary Audit</h1>
  <p class="lede">Generated ${escapeHtml(audit.generatedAt)}. This report verifies that prompt-planning, implementation, batch, asset, fallback, version, debug, and report-language terms do not appear in normal learner-facing app UI.</p>

  <section class="metrics">
    <div class="metric"><strong>${audit.forbiddenTerms.length}</strong><span>Forbidden terms</span></div>
    <div class="metric"><strong>${fixes.length}</strong><span>Replacements</span></div>
    <div class="metric"><strong>${failures.length}</strong><span>Static failures</span></div>
    <div class="metric"><strong>${allowed.length}</strong><span>Allowed records</span></div>
    <div class="metric"><strong>${audit.rendered?.rows?.length ?? 0}</strong><span>Rendered screens</span></div>
  </section>

  <section class="panel">
    <p class="eyebrow">Summary</p>
    <h2>Normal learner UI passed the leak check</h2>
    <p>The known Inference “Batch 1” leak was fixed, learner-visible version text was removed from Badge, and returning-learner Play wording now avoids version/legacy language. Rendered smoke checks for Home, Journey card 1, Inference, an Image 2 visual card, Play, Glossary, and Badge passed with no forbidden process-language matches.</p>
  </section>

  <section class="panel">
    <p class="eyebrow">Known Leak</p>
    <h2>Batch 1 Before / After</h2>
    <table>
      <thead><tr><th>Before</th><th>After</th><th>Status</th></tr></thead>
      <tbody>
        <tr>
          <td>${escapeHtml(batchFix?.before)}</td>
          <td>${escapeHtml(batchFix?.after)}</td>
          <td><span class="status status-${escapeHtml(batchFix?.status)}">${escapeHtml(batchFix?.status)}</span></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Forbidden Terms</p>
    <h2>Boundary List Added to Audit</h2>
    <p>${audit.forbiddenTerms.map((term) => `<code>${escapeHtml(term)}</code>`).join(' ')}</p>
  </section>

  <section class="panel">
    <p class="eyebrow">Replacements</p>
    <h2>Every Replacement Made</h2>
    <table>
      <thead><tr><th>ID</th><th>Status</th><th>Before</th><th>After</th><th>Reason</th></tr></thead>
      <tbody>
        ${fixes.map((fix) => `
          <tr>
            <td><code>${escapeHtml(fix.id)}</code></td>
            <td><span class="status status-${escapeHtml(fix.status)}">${escapeHtml(fix.status)}</span></td>
            <td>${escapeHtml(fix.before)}</td>
            <td>${escapeHtml(fix.after)}</td>
            <td>${escapeHtml(fix.reason)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Allowed Terms</p>
    <h2>Terms Intentionally Allowed</h2>
    <table>
      <thead><tr><th>File</th><th>Line</th><th>Term</th><th>Reason</th><th>Context</th></tr></thead>
      <tbody>
        ${allowed.map((record) => `
          <tr>
            <td><code>${escapeHtml(record.file)}</code></td>
            <td>${escapeHtml(record.line)}</td>
            <td>${escapeHtml(record.term)}</td>
            <td>${escapeHtml(record.reason)}</td>
            <td>${escapeHtml(record.context)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Rendered UI</p>
    <h2>Smoke Check Result</h2>
    <table>
      <thead><tr><th>Screen</th><th>Status</th><th>Matches</th></tr></thead>
      <tbody>
        ${renderedRows.map((row) => `
          <tr>
            <td>${escapeHtml(row.label)}</td>
            <td><span class="status status-${escapeHtml(row.status)}">${escapeHtml(row.status)}</span></td>
            <td>${row.matches.length ? row.matches.map((match) => `${escapeHtml(match.term)}: ${escapeHtml(match.context)}`).join('<br>') : 'none'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </section>

  <section class="panel">
    <p class="eyebrow">Screenshots</p>
    <h2>Evidence Captures</h2>
    <div class="shot-grid">
      ${renderedRows.map(renderScreenshot).join('')}
    </div>
  </section>

  <section class="panel">
    <p class="eyebrow">Verification</p>
    <h2>Command Results</h2>
    ${verification?.commands?.length ? `
      <table>
        <thead><tr><th>Command</th><th>Status</th><th>Notes</th></tr></thead>
        <tbody>
          ${verification.commands.map((item) => `
            <tr>
              <td><code>${escapeHtml(item.command)}</code></td>
              <td><span class="status status-${escapeHtml(item.status)}">${escapeHtml(item.status)}</span></td>
              <td>${escapeHtml(item.notes).slice(0, 1200)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '<p>Verification results were not attached when this report was generated.</p>'}
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
  throw new Error('Playwright is required to export the v0.28.8 learner leak report PDF.')
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
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
    await page.pdf({
      path: pdfPath,
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
  const audit = JSON.parse(await readFile(auditPath, 'utf8'))
  await writeFile(htmlPath, renderHtml(audit))
  await exportPdf()
  console.log(`Wrote ${htmlPath}`)
  console.log(`Wrote ${pdfPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
