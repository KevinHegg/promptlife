import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const versionSlug = 'v0-28-7-image2-batch-1'
const port = Number(process.env.PROMPTLIFE_CAPTURE_PORT ?? 5197)
const baseUrl = `http://127.0.0.1:${port}`
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', versionSlug)
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
  throw new Error('Playwright is required to capture v0.28.7 image replacement screenshots.')
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
  return { child, getOutput: () => output }
}

async function stopServer(child) {
  if (!child || child.killed) return
  child.kill('SIGTERM')
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (!child.killed) child.kill('SIGKILL')
}

async function setAppState(page, { tab, lessonId = null }) {
  await page.goto(`${baseUrl}/?v=0287-capture-state`, { waitUntil: 'networkidle' })
  await page.evaluate(({ nextTab, nextLessonId }) => {
    window.localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify(nextTab))
    if (nextLessonId) window.localStorage.setItem('promptlife:v1:lessonId', JSON.stringify(nextLessonId))
  }, { nextTab: tab, nextLessonId: lessonId })
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
}

async function waitForImages(locator) {
  await locator.evaluateAll((nodes) => Promise.all(nodes.map((node) => {
    if (!(node instanceof HTMLImageElement)) return Promise.resolve()
    if (node.complete && node.naturalWidth > 0) return Promise.resolve()
    return new Promise((resolve) => {
      node.addEventListener('load', resolve, { once: true })
      node.addEventListener('error', resolve, { once: true })
    })
  })))
}

async function captureLessonVisual(page, { width, height = 980, lessonId, name }) {
  await page.setViewportSize({ width, height })
  await setAppState(page, { tab: 'learn', lessonId })
  const panel = page.locator('section.visual-aid-panel').first()
  await panel.scrollIntoViewIfNeeded()
  await waitForImages(panel.locator('img'))
  await panel.screenshot({ path: path.join(screenshotDir, `${name}-${width}.png`) })
}

async function captureLessonFullPage(page, { width, height = 980, lessonId, name }) {
  await page.setViewportSize({ width, height })
  await setAppState(page, { tab: 'learn', lessonId })
  await waitForImages(page.locator('section.lesson-screen img'))
  await page.screenshot({ path: path.join(screenshotDir, `${name}-${width}-fullpage.png`), fullPage: true })
}

async function captureSmokeScreen(page, { tab, name, width = 390, height = 844 }) {
  await page.setViewportSize({ width, height })
  await setAppState(page, { tab })
  await waitForImages(page.locator('img'))
  await page.screenshot({ path: path.join(screenshotDir, `${name}-${width}.png`), fullPage: true })
}

async function main() {
  await mkdir(screenshotDir, { recursive: true })
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

    await captureLessonVisual(page, { width: 390, lessonId: 'collective-intelligence', name: 'collective-intelligence-image2' })
    await captureLessonVisual(page, { width: 320, lessonId: 'collective-intelligence', name: 'collective-intelligence-image2' })
    await captureLessonVisual(page, { width: 1024, height: 900, lessonId: 'collective-intelligence', name: 'collective-intelligence-image2-desktop' })
    await captureLessonFullPage(page, { width: 390, lessonId: 'collective-intelligence', name: 'journey-card-collective-intelligence' })
    await captureLessonVisual(page, { width: 390, lessonId: 'perfect-storm', name: 'missing-asset-current-visual-perfect-storm' })

    await captureSmokeScreen(page, { tab: 'badge', name: 'badge-smoke' })
    await captureSmokeScreen(page, { tab: 'play', name: 'play-smoke' })
    await captureSmokeScreen(page, { tab: 'glossary', name: 'glossary-smoke' })

    console.log(`Captured v0.28.7 Image 2 batch screenshots in ${path.relative(root, screenshotDir)}.`)
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
