import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()

const explicitFiles = [
  'src/main.tsx',
  'src/data/content.ts',
  'src/data/checkpointBankV02715.ts',
  'src/styles/global.css'
]

const recursiveDirs = [
  'src/components',
  'src/features'
]

const forbiddenPatterns = [
  ['Developer checkpoint bank', /Developer checkpoint bank/i],
  ['active-dev', /active-dev/i],
  ['development testing', /development testing/i],
  ['legacy checkpoint query instruction', /\?legacyCheckpoints/i],
  ['checkpoint bank query instruction', /\?checkpointBank/i],
  ['fallback instructions', /fallback instructions/i],
  ['debug note', /debug note/i],
  ['Debug mode', /Debug mode/i],
  ['Debug only', /Debug only/i],
  ['Preview progress note', /Previewing this learning card\. Progress will not change\./i],
  ['implementation note', /implementation note/i],
  ['active bank', /active bank/i],
  ['bank indicator', /bank indicator/i],
  ['Play progress inspector', /Play progress inspector/i],
  ['visible debug-mode explanation', /Visible because debug mode/i],
  ['Badge unlocked', /Badge unlocked/i],
  ['Badge criterion', /Badge criterion/i],
  ['Unlock badge for testing', /Unlock badge for testing/i],
  ['banned model-mystery wording', /\bmagic(?:al|ally)?\b/i]
]

function walk(dir) {
  const abs = path.join(root, dir)
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(rel)
    if (!/\.(tsx?|css)$/.test(entry.name)) return []
    return [rel]
  })
}

const files = [...new Set([
  ...explicitFiles,
  ...recursiveDirs.flatMap(walk)
])].filter((file) => fs.existsSync(path.join(root, file)))

const issues = []

for (const file of files) {
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  const lines = text.split(/\r?\n/)
  for (const [label, pattern] of forbiddenPatterns) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        issues.push(`${file}:${index + 1} contains learner-facing ${label}: ${line.trim()}`)
      }
    })
  }
}

if (issues.length) {
  console.error('Learner-copy audit failed.')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Learner-copy audit passed. Checked ${files.length} learner-facing source files.`)
