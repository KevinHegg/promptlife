import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { visualAidReadinessBriefs } from './visual-aid-readiness-data-v0282.mjs'

const root = process.cwd()
const version = '0.28.2'
const port = Number(process.env.PROMPTLIFE_CAPTURE_PORT ?? 5192)
const baseUrl = `http://127.0.0.1:${port}`
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-2')
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
  throw new Error('Playwright is required to capture visual-aid screenshots.')
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

async function captureVisuals(page, width) {
  await page.setViewportSize({ width, height: 980 })
  await page.goto(`${baseUrl}/review/visual-aids?debug=1&v=0282-capture-${width}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)

  for (const brief of visualAidReadinessBriefs) {
    const visual = page.locator(`section#${brief.currentVisualId} figure.visual-aid`).first()
    await visual.scrollIntoViewIfNeeded()
    await visual.screenshot({
      path: path.join(screenshotDir, `${brief.currentVisualId}-${width}.png`)
    })
  }
}

async function setStoredTab(page, tab) {
  await page.goto(`${baseUrl}/?debug=1&v=0282-smoke-${tab}`, { waitUntil: 'networkidle' })
  await page.evaluate((nextTab) => {
    window.localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify(nextTab))
    if (nextTab === 'learn') {
      window.localStorage.setItem('promptlife:v1:lessonId', JSON.stringify('what-is-llm'))
    }
  }, tab)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
}

async function captureSmokeScreens(page) {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const tab of ['home', 'journey', 'play', 'glossary', 'badge']) {
    await setStoredTab(page, tab)
    await page.screenshot({
      path: path.join(screenshotDir, `${tab}-smoke-390.png`),
      fullPage: true
    })
  }

  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto(`${baseUrl}/review/visual-aids?debug=1&v=0282-desktop`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  await page.screenshot({
    path: path.join(screenshotDir, 'visual-aids-desktop-1024.png'),
    fullPage: true
  })
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
    await captureVisuals(page, 390)
    await captureVisuals(page, 320)
    await captureSmokeScreens(page)
    console.log(`Captured v${version} screenshots for ${visualAidReadinessBriefs.length} visual aids at 390px and 320px.`)
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
