import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { request } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = Number(process.env.PROMPTLIFE_PDF_PORT || 4186)
const route = process.env.PROMPTLIFE_PDF_ROUTE || '/review/lesson-cards?print=1'
const defaultOut = path.join('docs', 'review', 'prompt-life-lesson-cards-v0-9-3.pdf')
const requestedOut = process.env.PROMPTLIFE_PDF_OUT || defaultOut
const outPath = path.isAbsolute(requestedOut) ? requestedOut : path.join(root, requestedOut)
const outDir = path.dirname(outPath)

await mkdir(outDir, { recursive: true })

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const server = spawn(
  npmCmd,
  ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    cwd: root,
    env: { ...process.env, BROWSER: 'none' },
    stdio: ['ignore', 'pipe', 'pipe']
  }
)

server.stdout.on('data', (chunk) => process.stdout.write(chunk))
server.stderr.on('data', (chunk) => process.stderr.write(chunk))

try {
  const url = `http://127.0.0.1:${port}${route}`
  await waitForUrl(url)
  const chrome = findChrome()
  await runChrome(chrome, url, outPath)
  console.log(`Lesson PDF written to ${path.relative(root, outPath)}`)
} finally {
  server.kill('SIGTERM')
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
  ].filter(Boolean)

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('Could not find Chrome. Set CHROME_PATH to a Chromium-based browser executable and rerun npm run export:lesson-pdf.')
  }
  return found
}

function waitForUrl(url, timeoutMs = 20000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      request(url, (res) => {
        res.resume()
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve()
          return
        }
        retry()
      }).on('error', retry).end()
    }

    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`))
        return
      }
      setTimeout(tick, 250)
    }

    tick()
  })
}

function runChrome(chrome, url, output) {
  return new Promise((resolve, reject) => {
    const proc = spawn(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--virtual-time-budget=1000',
      `--print-to-pdf=${output}`,
      url
    ], { stdio: 'inherit' })

    proc.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Chrome PDF export exited with code ${code}`))
    })
  })
}
