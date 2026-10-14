import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const version = '0.28.4'
const port = Number(process.env.PROMPTLIFE_CAPTURE_PORT ?? 5194)
const baseUrl = `http://127.0.0.1:${port}`
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-4-word-wrap')
const captureIds = [
  'prompt-response',
  'tokenization',
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
    if (fs.existsSync(candidate)) return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required to capture word-wrap screenshots.')
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

async function captureAtWidth(page, width) {
  await page.setViewportSize({ width, height: 980 })
  await page.goto(`${baseUrl}/review/visual-aids?debug=1&v=0284-word-wrap-${width}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)

  for (const id of captureIds) {
    const figure = page.locator(`section#${id} figure.visual-aid`).first()
    await figure.scrollIntoViewIfNeeded()
    await figure.screenshot({
      path: path.join(screenshotDir, `${id}-${width}.png`)
    })
  }
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
    await captureAtWidth(page, 320)
    await captureAtWidth(page, 390)
    console.log(`Captured v${version} word-wrap screenshots for ${captureIds.length} visual aids at 320px and 390px.`)
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
