import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const visualRoot = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28')
const sourceDir = path.join(visualRoot, 'source')
const optimizedDir = path.join(visualRoot, 'optimized')
const thumbnailDir = path.join(visualRoot, 'thumbnails')

const targets = [
  'what-is-an-llm.png',
  'pretraining.png',
  'alignment.png',
  'multimodal-ai.png',
  'benefits-worth-taking-seriously.png',
  'better-ai-choice.png'
]

const optimizedMaxWidth = 1448
const thumbnailMaxWidth = 480

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function runSips(source, maxWidth, out) {
  execFileSync('sips', ['-s', 'format', 'png', '-Z', String(maxWidth), source, '--out', out], {
    stdio: ['ignore', 'pipe', 'pipe']
  })
}

function main() {
  ensureDir(optimizedDir)
  ensureDir(thumbnailDir)

  const processed = []
  const missing = []

  for (const filename of targets) {
    const source = path.join(sourceDir, filename)
    const optimized = path.join(optimizedDir, filename)
    const thumbnail = path.join(thumbnailDir, filename)

    if (!fs.existsSync(source)) {
      missing.push(filename)
      continue
    }

    runSips(source, optimizedMaxWidth, optimized)
    runSips(source, thumbnailMaxWidth, thumbnail)
    processed.push({
      filename,
      source: path.relative(root, source),
      optimized: path.relative(root, optimized),
      thumbnail: path.relative(root, thumbnail)
    })
  }

  for (const item of processed) {
    console.log(`Processed ${item.filename}`)
    console.log(`  source: ${item.source}`)
    console.log(`  optimized: ${item.optimized}`)
    console.log(`  thumbnail: ${item.thumbnail}`)
  }

  if (missing.length) {
    console.warn(`Missing source files: ${missing.join(', ')}`)
  }
}

main()
