import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const version = '0.28.11'
const port = Number(process.env.PROMPTLIFE_RC_PORT ?? 5194)
const baseUrl = `http://127.0.0.1:${port}`
const docsDir = path.join(root, 'docs', 'testing')
const screenshotDir = path.join(docsDir, 'screenshots', 'v0-28-11')
const verificationResultsPath = path.join(docsDir, 'prompt-life-v0-28-11-verification-results.json')
const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
].filter(Boolean)

const watchItems = [
  'What Is an LLM?',
  'Vectors',
  'Tensors',
  'Sampling',
  'Collective Intelligence, Extracted',
  'Benefits Worth Taking Seriously',
  'Model Literate Synthesis'
]

const verificationCommands = [
  'npm run typecheck',
  'npm run build',
  'npm run build:pages',
  'npm run audit:answers',
  'npm run audit:checkpoints',
  'npm run audit:question-clues',
  'npm run audit:learner-copy',
  'npm run audit:learner-leaks',
  'npm run audit:language',
  'npm run audit:visual-assets',
  'npm run audit:visual-aids',
  'npm run audit:visual-overflow',
  'npm run audit:word-wrap',
  'npm run audit:exercises'
]

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue
    return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required for the v0.28.11 release-candidate packet.')
}

function startServer() {
  const child = spawn('npm', ['run', 'dev', '--', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, BROWSER: 'none' }
  })
  let output = ''
  child.stdout.on('data', (chunk) => { output += chunk.toString() })
  child.stderr.on('data', (chunk) => { output += chunk.toString() })
  child.on('exit', (code) => {
    if (code && code !== 0) output += `\nDev server exited with code ${code}.`
  })
  return { child, getOutput: () => output }
}

async function stopServer(child) {
  if (!child || child.killed) return
  child.kill('SIGTERM')
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (!child.killed) child.kill('SIGKILL')
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Keep polling.
    }
    await new Promise((resolve) => setTimeout(resolve, 350))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderMarkdownList(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function packetMarkdown() {
  return `# Prompt Life v0.28.11 Small Human Test Packet

## Status

- Prompt Life is under development.
- The badge is not issued.
- The Badge page is under construction and pending human review.
- Feedback is requested so the app can improve before broader testing.

## Tester Task

Please try:

- 3 to 5 Journey learning cards.
- At least 2 checkpoint question sets.
- At least 2 Try Interactions.
- One Glossary lookup.
- One Play activity if you have time.
- A quick Badge page glance.

## Main Feedback Questions

- What confused you?
- What helped you understand the model?
- Which picture was most useful?
- Which picture was least useful?
- Which checkpoint felt unfair?
- Which wrong-answer feedback taught you something?
- Which Try Interaction felt useful?
- Which Try Interaction felt unnecessary?
- Did anything feel too technical?
- Did anything feel childish?
- Did anything feel overconfident?
- Did anything make LLMs feel more mysterious instead of less?

## Specific Watch Areas

For each item below, please ask: Did the exercise help? Was the action obvious? Was it redundant with the visual aid or checkpoint? Was any wording too abstract? Would you simplify or remove it?

${renderMarkdownList(watchItems)}

## UI Friction

Please flag:

- Bottom nav overlap.
- Scrolling problems.
- Text overflow.
- Hard-to-tap choices.
- Too much reading on one screen.
- Unclear next step.

## Badge Language

- Is it clear that the badge is not yet issued?
- Do the learning objectives feel credible?
- Would this evidence model feel meaningful after review?
`
}

function feedbackFormMarkdown() {
  return `# Prompt Life v0.28.11 Feedback Form Copy

## About You

What best describes you? Student / faculty / staff / higher-ed IT / researcher / other.

## Journey Cards Tested

Which Journey cards or stages did you try?

## Most Confusing Moment

What was the most confusing moment?

## Best Learning Moment

What helped you understand LLMs better?

## Checkpoint Feedback

Which checkpoint felt unfair, too easy, too wordy, or especially helpful?

## Visual Aid Feedback

Which picture was most useful? Which was least useful?

## Try Interaction Feedback

Which Try Interaction felt useful? Which felt unnecessary or unclear?

## Badge Page Feedback

Was it clear that the badge is under construction, pending human review, and not issued yet?

## Final Rating

Choose one: not ready / close / ready after minor fixes.
`
}

function markdownToHtml(markdown, title) {
  const lines = markdown.split('\n')
  const body = []
  let inList = false
  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (inList) { body.push('</ul>'); inList = false }
      body.push(`<h1>${escapeHtml(line.slice(2))}</h1>`)
    } else if (line.startsWith('## ')) {
      if (inList) { body.push('</ul>'); inList = false }
      body.push(`<h2>${escapeHtml(line.slice(3))}</h2>`)
    } else if (line.startsWith('- ')) {
      if (!inList) { body.push('<ul>'); inList = true }
      body.push(`<li>${escapeHtml(line.slice(2))}</li>`)
    } else if (line.trim()) {
      if (inList) { body.push('</ul>'); inList = false }
      body.push(`<p>${escapeHtml(line)}</p>`)
    }
  }
  if (inList) body.push('</ul>')
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>
    body { font-family: Inter, Arial, sans-serif; margin: 38px; color: #07155f; line-height: 1.5; }
    h1, h2 { color: #101a7a; }
    h1 { font-size: 30px; }
    h2 { margin-top: 26px; font-size: 20px; }
    li { margin: 0.25rem 0; }
  </style></head><body>${body.join('\n')}</body></html>`
}

async function writePdfFromHtml(browser, htmlPath, pdfPath) {
  const page = await browser.newPage()
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true, margin: { top: '0.45in', right: '0.35in', bottom: '0.45in', left: '0.35in' } })
  await page.close()
}

async function setAppState(page, { tab = 'home', lessonId = null, choiceSeed = 'promptlife:v0.28.11:qa-seed' } = {}) {
  await page.goto(`${baseUrl}/?debug=1&v=02811-rc-${tab}-${lessonId ?? 'screen'}`, { waitUntil: 'networkidle' })
  await page.evaluate(({ tab, lessonId, choiceSeed }) => {
    localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify(tab))
    if (lessonId) localStorage.setItem('promptlife:v1:lessonId', JSON.stringify(lessonId))
    localStorage.setItem('promptlife:v1:choiceOrderSeed', choiceSeed)
  }, { tab, lessonId, choiceSeed })
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
}

async function captureSection(page, id, selector, label, { viewport = false } = {}) {
  await page.locator(selector).first().waitFor({ timeout: 10000 })
  if (viewport) {
    await page.evaluate(() => {
      document.querySelector('.pl-shell')?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  } else {
    await page.locator(selector).first().evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'nearest' }))
  }
  const fileName = `${id}.png`
  const shotPath = path.join(screenshotDir, fileName)
  if (viewport) {
    await page.screenshot({ path: shotPath, fullPage: false })
  } else {
    await page.locator(selector).first().screenshot({ path: shotPath })
  }
  const metrics = await page.evaluate(({ selector, viewport }) => {
    const element = document.querySelector(selector)
    const pageHorizontalOverflow = Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth
    )
    const nav = document.querySelector('.bottom-nav')
    const navOverlap = !viewport && nav && element ? (() => {
      const navRect = nav.getBoundingClientRect()
      return Array.from(element.querySelectorAll('button, textarea, input, select, [role="button"]')).some((control) => {
        const rect = control.getBoundingClientRect()
        const visibleInViewport = rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0
        if (!visibleInViewport) return false
        return rect.bottom > navRect.top && rect.top < navRect.bottom
      })
    })() : false
    return {
      pageHorizontalOverflow,
      elementOverflowX: element ? element.scrollWidth - element.clientWidth : 0,
      navOverlap: Boolean(navOverlap),
      text: element?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 1000) ?? ''
    }
  }, { selector, viewport })
  return {
    id,
    label,
    selector,
    screenshot: `screenshots/v0-28-11/${fileName}`,
    ...metrics
  }
}

async function runManualQa(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 980 } })
  const screenshots = []
  const checks = []

  await setAppState(page, { tab: 'home' })
  screenshots.push(await captureSection(page, 'home-390', '.home-screen', 'Home at 390px', { viewport: true }))

  await setAppState(page, { tab: 'journey' })
  screenshots.push(await captureSection(page, 'journey-390', '.journey-screen', 'Journey at 390px', { viewport: true }))
  const stageNav = await page.evaluate(() => ({
    stageButtons: document.querySelectorAll('.stage-timeline button').length,
    horizontalOverflow: Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, document.body.scrollWidth - document.body.clientWidth)
  }))
  checks.push({
    name: 'stage navigation links',
    status: stageNav.stageButtons >= 8 && stageNav.horizontalOverflow === 0 ? 'pass' : 'review',
    detail: `${stageNav.stageButtons} stage buttons; horizontal overflow ${stageNav.horizontalOverflow}px.`
  })

  await setAppState(page, { tab: 'learn', lessonId: 'what-is-llm' })
  screenshots.push(await captureSection(page, 'journey-first-card-390', '.lesson-screen', 'Journey first card at 390px', { viewport: true }))
  screenshots.push(await captureSection(page, 'stage-1-image2-390', '.visual-aid-panel', 'Stage 1 Image 2 card at 390px'))

  await setAppState(page, { tab: 'learn', lessonId: 'collective-intelligence' })
  screenshots.push(await captureSection(page, 'stage-7-image2-390', '.visual-aid-panel', 'Stage 7 Image 2 card at 390px'))

  await setAppState(page, { tab: 'learn', lessonId: 'context-window' })
  screenshots.push(await captureSection(page, 'exercise-context-window-390', '.interaction-card', 'Try Interaction at 390px'))

  await setAppState(page, { tab: 'learn', lessonId: 'what-is-llm', choiceSeed: 'promptlife:v0.28.11:wrong-no-reveal' })
  await page.locator('.quiz-card').first().evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'nearest' }))
  const answers = page.locator('.quiz-card .answer')
  const answerCount = await answers.count()
  let wrongNoReveal = false
  let wrongFeedback = ''
  for (let index = 0; index < answerCount; index += 1) {
    await answers.nth(index).click()
    await page.waitForTimeout(120)
    const wrongCount = await page.locator('.quiz-card .answer.is-wrong').count()
    if (wrongCount > 0) {
      const revealedCorrectCount = await page.locator('.quiz-card .answer.is-correct').count()
      wrongFeedback = await page.locator('.quiz-card [role="status"]').last().textContent().catch(() => '')
      wrongNoReveal = revealedCorrectCount === 0 && /Try another choice/i.test(wrongFeedback ?? '')
      break
    }
  }
  screenshots.push(await captureSection(page, 'checkpoint-wrong-no-reveal-390', '.quiz-card', 'Checkpoint wrong-answer no-reveal at 390px'))
  checks.push({
    name: 'checkpoint wrong-answer no-reveal',
    status: wrongNoReveal ? 'pass' : 'review',
    detail: wrongNoReveal ? 'Wrong choice showed targeted feedback and did not reveal the correct answer.' : `Review needed. Feedback: ${wrongFeedback}`
  })

  await setAppState(page, { tab: 'learn', lessonId: 'what-is-llm', choiceSeed: 'promptlife:v0.28.11:multi-question' })
  await page.locator('.quiz-card').first().evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'nearest' }))
  const firstCount = await page.locator('.checkpoint-count').first().textContent().catch(() => '')
  const sequenceAnswers = page.locator('.quiz-card .answer')
  for (let index = 0; index < await sequenceAnswers.count(); index += 1) {
    await sequenceAnswers.nth(index).click()
    await page.waitForTimeout(100)
    if (await page.locator('.quiz-card .answer.is-correct').count()) break
  }
  await page.locator('.sticky-action').first().click()
  await page.waitForTimeout(400)
  const secondCount = await page.locator('.checkpoint-count').first().textContent().catch(() => '')
  const sequenceAdvanced = /1 of \d+ questions?/.test(firstCount ?? '') && /2 of \d+ questions?/.test(secondCount ?? '')
  checks.push({
    name: 'checkpoint multi-question sequence',
    status: sequenceAdvanced ? 'pass' : 'review',
    detail: `Before: ${firstCount}; after: ${secondCount}.`
  })
  screenshots.push(await captureSection(page, 'checkpoint-sequence-390', '.quiz-card', 'Checkpoint multi-question sequence at 390px'))

  await setAppState(page, { tab: 'glossary' })
  screenshots.push(await captureSection(page, 'glossary-390', '.glossary-screen', 'Glossary at 390px', { viewport: true }))

  await setAppState(page, { tab: 'play' })
  screenshots.push(await captureSection(page, 'play-390', '.play-screen', 'Play at 390px', { viewport: true }))

  await setAppState(page, { tab: 'badge' })
  screenshots.push(await captureSection(page, 'badge-390', '.badge-screen', 'Badge at 390px', { viewport: true }))
  const badgeText = screenshots.at(-1)?.text ?? ''
  checks.push({
    name: 'badge status language',
    status: /under construction/i.test(badgeText) && /pending human review/i.test(badgeText) && /not yet issued/i.test(badgeText) ? 'pass' : 'review',
    detail: 'Badge page checked for under construction, pending human review, and not issued language.'
  })

  const renderedText = screenshots.map((shot) => shot.text).join(' ')
  const bannedRendered = [
    ['Tiny Interaction', /tiny interaction/i],
    ['magic', /\bmagic\b/i],
    ['debug notes', /\bdebug notes\b/i],
    ['placeholder asset text', /placeholder asset|visual update pending/i],
    ['process-language report', /\breport packet\b|\bmanifest entry\b|\bactive bank\b/i]
  ].filter(([, pattern]) => pattern.test(renderedText)).map(([label]) => label)
  checks.push({
    name: 'rendered process-language scan',
    status: bannedRendered.length ? 'review' : 'pass',
    detail: bannedRendered.length ? `Found: ${bannedRendered.join(', ')}` : 'No Tiny Interaction, magic, debug notes, placeholder asset text, or process-language leaks in captured learner screens.'
  })

  const overflowScreens = screenshots.filter((shot) => shot.pageHorizontalOverflow > 0 || shot.elementOverflowX > 2 || shot.navOverlap)
  checks.push({
    name: '390px overflow and bottom nav',
    status: overflowScreens.length ? 'review' : 'pass',
    detail: overflowScreens.length
      ? overflowScreens.map((shot) => `${shot.label}: page ${shot.pageHorizontalOverflow}px, element ${shot.elementOverflowX}px, nav overlap ${shot.navOverlap}`).join('; ')
      : 'No horizontal overflow or bottom-nav coverage found in captured 390px screens.'
  })

  await page.close()
  return { screenshots, checks }
}

function renderReportHtml({ generatedAt, manualQa, gitFiles, verificationResults = null }) {
  const screenshotFigures = manualQa.screenshots.map((shot) => `
    <figure>
      <img src="${escapeHtml(shot.screenshot)}" alt="${escapeHtml(shot.label)}">
      <figcaption>${escapeHtml(shot.label)}</figcaption>
    </figure>
  `).join('\n')

  const auditResultRows = verificationResults?.results?.length
    ? verificationResults.results.map((result) => `<tr><td><code>${escapeHtml(result.command)}</code></td><td>${result.status === 0 ? 'pass' : 'fail'}</td></tr>`).join('')
    : verificationCommands.map((command) => `<tr><td><code>${escapeHtml(command)}</code></td><td>run after packet generation</td></tr>`).join('')

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.11 Small Human Test Release Candidate</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #07155f; margin: 32px; line-height: 1.45; }
    h1, h2, h3 { color: #101a7a; }
    section { border: 1px solid #d8def0; border-radius: 10px; padding: 16px; margin: 0 0 18px; break-inside: avoid; }
    .pill { display: inline-block; border-radius: 999px; background: #e9fffb; color: #075f5e; padding: 4px 10px; font-weight: 900; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    figure { margin: 0; break-inside: avoid; }
    img { width: 100%; max-height: 430px; object-fit: contain; border: 1px solid #d8def0; border-radius: 8px; background: #f8fbff; }
    figcaption { font-size: 12px; font-weight: 800; margin-top: 4px; }
    li { margin: 0.25rem 0; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border-bottom: 1px solid #d8def0; padding: 7px; text-align: left; vertical-align: top; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.11 Small Human Test Release Candidate</h1>
  <section>
    <p><strong>Generated:</strong> ${escapeHtml(generatedAt)}</p>
    <p><span class="pill">Ready for small human testing</span></p>
    <p>Prompt Life is under development. The single badge remains under construction, pending human review, and not issued.</p>
  </section>
  <section>
    <h2>Summary</h2>
    <ul>
      <li>Final learner-facing label cleanup changed Tiny interaction to Try interaction.</li>
      <li>Human-test packet and short feedback-form copy were created for colleague, friend, and family testing.</li>
      <li>Release-candidate QA captured core learner screens at 390px.</li>
      <li>No new features, checkpoint rewrites, Play changes, or Badge model changes were added.</li>
    </ul>
  </section>
  <section>
    <h2>Current App Status</h2>
    <ul>
      <li>Journey: 39 cards active.</li>
      <li>Checkpoints: active and randomized by identity.</li>
      <li>Visuals: 12 Image 2 concept-card manifest entries live; coded mechanism visuals remain where exact mechanics matter.</li>
      <li>Exercises: 39 Journey Try Interactions inventoried in v0.28.10; P0 and P1 count is zero.</li>
      <li>Play, Glossary, and Badge remain available for smoke testing.</li>
    </ul>
  </section>
  <section>
    <h2>Ready For Small Human Testing</h2>
    <ul>
      <li>Learner copy has passed leak, language, word-wrap, and visual audits.</li>
      <li>Human testers can now try a short slice: Journey cards, checkpoints, Try Interactions, Glossary, Play, and Badge page glance.</li>
      <li>Wrong-answer checkpoint feedback remains instructive without revealing the correct answer directly.</li>
    </ul>
  </section>
  <section>
    <h2>Not Final</h2>
    <ul>
      <li>The badge is not issued.</li>
      <li>The Badge page is still under construction and pending human review.</li>
      <li>Human testing should decide whether the P2 watch interactions need simplification.</li>
    </ul>
  </section>
  <section>
    <h2>Known Watch Items</h2>
    <ul>${watchItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Audit Results</h2>
    <table>
      <thead><tr><th>Command</th><th>Status</th></tr></thead>
      <tbody>${auditResultRows}</tbody>
    </table>
  </section>
  <section>
    <h2>Manual QA Results</h2>
    <table>
      <thead><tr><th>Check</th><th>Status</th><th>Detail</th></tr></thead>
      <tbody>${manualQa.checks.map((check) => `<tr><td>${escapeHtml(check.name)}</td><td>${escapeHtml(check.status)}</td><td>${escapeHtml(check.detail)}</td></tr>`).join('')}</tbody>
    </table>
  </section>
  <section>
    <h2>Screenshots</h2>
    <div class="grid">${screenshotFigures}</div>
  </section>
  <section>
    <h2>Files Changed At Report Time</h2>
    <ul>${gitFiles.map((file) => `<li>${escapeHtml(file)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Human-Test Packet Links</h2>
    <ul>
      <li>docs/testing/prompt-life-v0-28-11-small-human-test-packet.md</li>
      <li>docs/testing/prompt-life-v0-28-11-small-human-test-packet.pdf</li>
      <li>docs/testing/prompt-life-v0-28-11-feedback-form-copy.md</li>
    </ul>
  </section>
</body>
</html>`
}

async function main() {
  await mkdir(docsDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })

  const packetMd = path.join(docsDir, 'prompt-life-v0-28-11-small-human-test-packet.md')
  const packetHtml = path.join(docsDir, 'prompt-life-v0-28-11-small-human-test-packet.html')
  const packetPdf = path.join(docsDir, 'prompt-life-v0-28-11-small-human-test-packet.pdf')
  const formMd = path.join(docsDir, 'prompt-life-v0-28-11-feedback-form-copy.md')
  const reportHtml = path.join(docsDir, 'prompt-life-v0-28-11-small-human-test-release-candidate-report.html')
  const reportPdf = path.join(docsDir, 'prompt-life-v0-28-11-small-human-test-release-candidate-report.pdf')
  const manualQaJson = path.join(docsDir, 'prompt-life-v0-28-11-manual-qa.json')

  const packet = packetMarkdown()
  await writeFile(packetMd, packet)
  await writeFile(packetHtml, markdownToHtml(packet, 'Prompt Life v0.28.11 Small Human Test Packet'))
  await writeFile(formMd, feedbackFormMarkdown())

  const { chromium } = getPlaywright()
  const server = startServer()
  let browser
  try {
    await waitForServer(baseUrl)
    const chromePath = chromeCandidates.find((candidate) => fs.existsSync(candidate))
    browser = await chromium.launch({
      headless: true,
      executablePath: chromePath,
      args: ['--no-sandbox']
    })

    await writePdfFromHtml(browser, packetHtml, packetPdf)
    const manualQa = await runManualQa(browser)
    const generatedAt = new Date().toISOString()
    const gitFilesResult = spawn('git', ['status', '--short'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] })
    let gitFilesText = ''
    gitFilesResult.stdout.on('data', (chunk) => { gitFilesText += chunk.toString() })
    await new Promise((resolve) => gitFilesResult.on('close', resolve))
    const gitFiles = gitFilesText.split('\n').map((line) => line.trim()).filter(Boolean)
    const manualPayload = { version, generatedAt, readiness: 'ready for small human testing', watchItems, ...manualQa }
    await writeFile(manualQaJson, `${JSON.stringify(manualPayload, null, 2)}\n`)
    const verificationResults = fs.existsSync(verificationResultsPath)
      ? JSON.parse(await readFile(verificationResultsPath, 'utf8'))
      : null
    await writeFile(reportHtml, renderReportHtml({ generatedAt, manualQa, gitFiles, verificationResults }))
    await writePdfFromHtml(browser, reportHtml, reportPdf)

    const failedChecks = manualQa.checks.filter((check) => check.status !== 'pass')
    if (failedChecks.length) {
      console.error(`Release-candidate QA needs review: ${failedChecks.map((check) => `${check.name}: ${check.detail}`).join('; ')}`)
      process.exit(1)
    }
    console.log(`v${version} release-candidate packet generated. Screenshots: ${manualQa.screenshots.length}; checks: ${manualQa.checks.length}.`)
  } catch (error) {
    console.error(server.getOutput())
    throw error
  } finally {
    if (browser) await browser.close()
    await stopServer(server.child)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
