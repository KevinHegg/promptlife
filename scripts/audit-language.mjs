import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const bannedPattern = /\bmagic(?:al|ally)?\b/i

const targets = [
  'src',
  'public',
  'docs/REVIEW_NOTES.md',
  'docs/DEV_NOTES.md',
  'docs/badge'
]

const textExtensions = new Set([
  '.css',
  '.csv',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt'
])

function shouldSkip(relPath) {
  return [
    'node_modules/',
    'dist/',
    'docs/journey/visual-aids/prompt-life-v0-27',
    'docs/journey/visual-aids/visual-aid-',
    'docs/journey/screenshots/',
    'docs/badge/screenshots/'
  ].some((prefix) => relPath.startsWith(prefix))
}

function walk(relPath) {
  if (shouldSkip(relPath)) return []
  const absPath = path.join(root, relPath)
  if (!fs.existsSync(absPath)) return []
  const stat = fs.statSync(absPath)
  if (stat.isDirectory()) {
    return fs.readdirSync(absPath, { withFileTypes: true }).flatMap((entry) => walk(path.join(relPath, entry.name)))
  }
  if (!stat.isFile()) return []
  if (!textExtensions.has(path.extname(relPath))) return []
  return [relPath]
}

const files = [...new Set(targets.flatMap(walk))]
const issues = []

for (const file of files) {
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  text.split(/\r?\n/).forEach((line, index) => {
    if (bannedPattern.test(line)) {
      issues.push(`${file}:${index + 1}: ${line.trim()}`)
    }
  })
}

if (issues.length) {
  console.error('Language audit failed. Current learner-facing source still contains the banned word family.')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Language audit passed. Checked ${files.length} current source/docs files for banned wording.`)
