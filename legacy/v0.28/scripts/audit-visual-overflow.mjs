import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { visualAidReadinessBriefs } from './visual-aid-readiness-data-v0283.mjs'

const root = process.cwd()
const version = '0.28.3'
const port = Number(process.env.PROMPTLIFE_AUDIT_PORT ?? 5191)
const baseUrl = `http://127.0.0.1:${port}`
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const failureDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-3', 'overflow-failures')
const jsonPath = path.join(outDir, 'visual-overflow-audit-v0-28-3.json')
const mdPath = path.join(outDir, 'visual-overflow-audit-v0-28-3.md')
const widths = [320, 390]
const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
].filter(Boolean)

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue
    return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required for audit:visual-overflow. Install it locally or run in the Codex desktop runtime.')
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // keep polling
    }
    await new Promise((resolve) => setTimeout(resolve, 350))
  }
  throw new Error(`Timed out waiting for ${url}`)
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
    if (code && code !== 0) {
      output += `\nDev server exited with code ${code}.`
    }
  })
  return { child, getOutput: () => output }
}

async function stopServer(child) {
  if (!child || child.killed) return
  child.kill('SIGTERM')
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (!child.killed) child.kill('SIGKILL')
}

async function openLesson(page, width, brief) {
  await page.setViewportSize({ width, height: 980 })
  await page.goto(`${baseUrl}/?debug=1&v=0283-overflow-${width}-${brief.learningCardId}`, { waitUntil: 'networkidle' })
  await page.evaluate(({ lessonId }) => {
    window.localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify('learn'))
    window.localStorage.setItem('promptlife:v1:lessonId', JSON.stringify(lessonId))
  }, { lessonId: brief.learningCardId })
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  await page.locator('.lesson-screen .visual-aid').first().waitFor({ timeout: 8000 })
  await page.locator('.lesson-screen .visual-aid').first().evaluate((element) => {
    element.scrollIntoView({ block: 'center', inline: 'nearest' })
  })
}

async function inspectLesson(page, width, brief) {
  await openLesson(page, width, brief)
  return page.evaluate(({ width, expectedVisualId, learningCardId }) => {
    const pageHorizontalOverflow = Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth
    )
    const lessonTitle = document.querySelector('.lesson-screen h1')?.textContent?.trim() ?? ''
    const figure = document.querySelector('.lesson-screen .visual-aid')
    const canvas = figure?.querySelector('.aid-canvas')
    const actualVisualId = figure
      ? Array.from(figure.classList).find((className) => className.startsWith('visual-aid-') && className !== 'visual-aid-card')?.replace('visual-aid-', '') || ''
      : ''
	    const template = figure?.getAttribute('data-template') || ''
	    const freeFormFlowchartClass = figure ? Array.from(figure.querySelectorAll('[class*="flowchart"], [class*="flow-chart"]')).map((element) => element.className?.toString() || element.tagName.toLowerCase()) : []
	    const handSpecifiedTemplates = ['Vertical Mechanism Strip', 'Boundary Board', 'Tray / Stack / Bars']
	    const paragraphTextInsideVisualShapes = figure && handSpecifiedTemplates.includes(template)
	      ? Array.from(figure.querySelectorAll('.aid-canvas p')).map((element) => element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || '').filter(Boolean)
	      : []
    const figureOverflow = figure ? {
      x: figure.scrollWidth - figure.clientWidth,
      y: figure.scrollHeight - figure.clientHeight
    } : { x: 0, y: 0 }
    const canvasOverflow = canvas ? {
      x: canvas.scrollWidth - canvas.clientWidth,
      y: canvas.scrollHeight - canvas.clientHeight
    } : { x: 0, y: 0 }
    const clippedHtml = figure ? Array.from(figure.querySelectorAll([
      '.aid-canvas *:not(svg):not(path):not(circle):not(rect):not(line):not(polyline):not(polygon):not(g):not(defs):not(linearGradient):not(stop):not(text)',
      'figcaption',
      '.aid-legend li',
      '.generated-aid-fallback'
    ].join(','))).map((element) => ({
      selector: element.className?.toString() || element.tagName.toLowerCase(),
      overflowX: element.scrollWidth - element.clientWidth,
      overflowY: element.scrollHeight - element.clientHeight,
      text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || ''
    })).filter((item) => item.text && (item.overflowX > 2 || item.overflowY > 2)) : []

    const canvasRect = canvas?.getBoundingClientRect()
    const svgTexts = figure ? Array.from(figure.querySelectorAll('svg text')).map((element) => {
      const computed = getComputedStyle(element)
      const fontSize = Number.parseFloat(computed.fontSize || '0')
      const text = element.textContent?.trim() ?? ''
      const rect = element.getBoundingClientRect()
      const outsideCanvas = canvasRect ? (
        rect.left < canvasRect.left - 1 ||
        rect.right > canvasRect.right + 1 ||
        rect.top < canvasRect.top - 1 ||
        rect.bottom > canvasRect.bottom + 1
      ) : false
      return {
        text,
        fontSize,
        outsideCanvas,
        rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom }
      }
    }) : []

    const textBoxes = svgTexts.filter((item) => item.text && !/^\\d+$/.test(item.text))
    const overlappingSvgLabels = []
    for (let first = 0; first < textBoxes.length; first += 1) {
      for (let second = first + 1; second < textBoxes.length; second += 1) {
        const a = textBoxes[first].rect
        const b = textBoxes[second].rect
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
        if (overlapX > 2 && overlapY > 2) {
          overlappingSvgLabels.push(`${textBoxes[first].text} / ${textBoxes[second].text}`)
        }
      }
    }

    const nav = document.querySelector('.bottom-nav')
    const navOverlap = nav && figure ? (() => {
      const figureRect = figure.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      return figureRect.bottom > navRect.top && figureRect.top < navRect.bottom
    })() : false
    const generatedImage = figure?.querySelector('.generated-aid-image')

    return {
      width,
      route: 'learner',
      learningCardId,
      expectedVisualId,
      actualVisualId,
	      lessonTitle,
	      template,
	      missingTemplateType: !template,
	      freeFormFlowchartClass,
	      pageHorizontalOverflow,
	      figureOverflow,
	      canvasOverflow,
	      clippedHtml,
	      paragraphTextInsideVisualShapes,
      longSvgLabels: svgTexts.filter((item) => item.text.length > 18).map((item) => item.text),
      tinySvgLabels: svgTexts.filter((item) => item.text && item.fontSize < 12).map((item) => ({ text: item.text, fontSize: item.fontSize })),
      clippedSvgLabels: svgTexts.filter((item) => item.outsideCanvas).map((item) => item.text),
      overlappingSvgLabels,
      svgLabelCount: textBoxes.length,
      generatedImageHasAlt: generatedImage ? Boolean(generatedImage.getAttribute('alt')) : true,
      navPresent: Boolean(nav),
      navOverlap: Boolean(navOverlap)
    }
  }, { width, expectedVisualId: brief.currentVisualId, learningCardId: brief.learningCardId })
}

function rowIssues(row) {
  return [
	    row.actualVisualId && row.actualVisualId !== row.expectedVisualId ? `expected ${row.expectedVisualId}, rendered ${row.actualVisualId}` : '',
	    row.missingTemplateType ? 'visual missing template type' : '',
	    row.freeFormFlowchartClass.length ? `${row.freeFormFlowchartClass.length} free-form flowchart class hit(s)` : '',
	    row.pageHorizontalOverflow > 2 ? `page horizontal overflow ${row.pageHorizontalOverflow}px` : '',
    row.figureOverflow.x > 2 ? `figure horizontal overflow ${row.figureOverflow.x}px` : '',
    row.canvasOverflow.x > 2 ? `canvas horizontal overflow ${row.canvasOverflow.x}px` : '',
	    row.clippedHtml.length ? `${row.clippedHtml.length} clipped HTML element(s)` : '',
	    row.paragraphTextInsideVisualShapes.length ? `${row.paragraphTextInsideVisualShapes.length} paragraph text block(s) inside hand-specified diagram` : '',
    row.longSvgLabels.length ? `${row.longSvgLabels.length} SVG label(s) over 18 chars` : '',
    row.tinySvgLabels.length ? `${row.tinySvgLabels.length} SVG label(s) under 12px` : '',
    row.clippedSvgLabels.length ? `${row.clippedSvgLabels.length} SVG label(s) outside canvas` : '',
    row.overlappingSvgLabels.length ? `${row.overlappingSvgLabels.length} overlapping SVG label pair(s)` : '',
    row.svgLabelCount > 24 ? `${row.svgLabelCount} SVG labels; needs simplification review` : '',
    row.generatedImageHasAlt ? '' : 'generated image missing alt text',
    row.navOverlap ? 'bottom nav overlaps visual after learner-route scroll' : ''
  ].filter(Boolean)
}

function renderMarkdown(payload) {
  const lines = [
    '# Prompt Life Visual Overflow Audit v0.28.3',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    `Status: ${payload.status}`,
    `Route checked: ${payload.routeChecked}`,
    `Widths checked: ${payload.widths.join(', ')}px`,
    `Visual aids checked: ${payload.visualAidCount}`,
    '',
    '## Summary',
    '',
    `- Page horizontal overflow issues: ${payload.summary.pageOverflowIssues}`,
    `- Visual row issues: ${payload.summary.visualRowIssues}`,
    `- Long SVG label issues: ${payload.summary.longSvgLabelIssues}`,
    `- Tiny SVG label issues: ${payload.summary.tinySvgLabelIssues}`,
    `- Clipped HTML/SVG issues: ${payload.summary.clippingIssues}`,
    `- Overlapping SVG label issues: ${payload.summary.svgOverlapIssues}`,
    `- Bottom nav overlap issues: ${payload.summary.navOverlapIssues}`,
    '',
    '## Route Hardening',
    '',
    'This audit now opens the real learner route for every Journey card, sets the stored active lesson, reloads the app, scrolls the learner-facing visual aid into view, and checks the rendered visual at 320px and 390px. The review route is no longer the only overflow surface.',
    '',
    '## Results',
    ''
  ]

  for (const result of payload.results) {
    lines.push(`### ${result.width}px`, '')
    const rowsWithIssues = result.rows.filter((row) => row.issues.length)
    if (!rowsWithIssues.length) {
      lines.push('- All learner-route visual aids passed this viewport.', '')
      continue
    }
    for (const row of rowsWithIssues) {
      lines.push(`- ${row.learningCardTitle} (${row.expectedVisualId}): ${row.issues.join('; ')}`)
    }
    lines.push('')
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  await mkdir(outDir, { recursive: true })
  await mkdir(failureDir, { recursive: true })
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
    const page = await browser.newPage()
    const results = []
    for (const width of widths) {
      const rows = []
      for (const brief of visualAidReadinessBriefs) {
        const row = await inspectLesson(page, width, brief)
        row.learningCardTitle = brief.learningCardTitle
        row.currentVisualTitle = brief.currentVisualTitle
        row.issues = rowIssues(row)
        rows.push(row)
        if (row.issues.length) {
          await page.screenshot({
            path: path.join(failureDir, `${brief.currentVisualId}-${width}.png`),
            fullPage: true
          })
        }
      }
      results.push({ width, rows })
    }

    const allRows = results.flatMap((result) => result.rows)
    const summary = {
      pageOverflowIssues: allRows.filter((row) => row.pageHorizontalOverflow > 2).length,
      visualRowIssues: allRows.filter((row) => row.issues.length).length,
      longSvgLabelIssues: allRows.reduce((sum, row) => sum + row.longSvgLabels.length, 0),
      tinySvgLabelIssues: allRows.reduce((sum, row) => sum + row.tinySvgLabels.length, 0),
      clippingIssues: allRows.reduce((sum, row) => sum + row.clippedHtml.length + row.clippedSvgLabels.length, 0),
      svgOverlapIssues: allRows.reduce((sum, row) => sum + row.overlappingSvgLabels.length, 0),
      navOverlapIssues: allRows.filter((row) => row.navOverlap).length
    }
    const status = summary.visualRowIssues ? 'fail' : 'pass'
    const payload = {
      version,
      generatedAt: new Date().toISOString(),
      status,
      routeChecked: 'learner Journey lesson route',
      widths,
      visualAidCount: visualAidReadinessBriefs.length,
      summary,
      results
    }

    await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`)
    await writeFile(mdPath, renderMarkdown(payload))
    if (status !== 'pass') {
      console.error(`Visual overflow audit failed. See ${path.relative(root, mdPath)}.`)
      process.exit(1)
    }
    console.log(`Visual overflow audit passed. Checked ${payload.visualAidCount} learner-route visual aids at 320px and 390px.`)
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
