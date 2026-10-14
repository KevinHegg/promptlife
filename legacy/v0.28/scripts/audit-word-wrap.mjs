import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const version = '0.28.4'
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const reportJsonPath = path.join(outDir, 'word-wrap-audit-v0-28-4.json')
const reportMdPath = path.join(outDir, 'word-wrap-audit-v0-28-4.md')
const maxInternalLabelLength = 18
const approvedLongInternalLabels = new Set([
  'Visual update pending'
])

const sourceRoots = [
  path.join(root, 'src'),
  path.join(root, 'scripts')
]

const generatedReviewPages = [
  path.join(outDir, 'prompt-life-v0-28-4-word-wrap-guardrails-report.html')
]

const unsafeCssPatterns = [
  { name: 'word-break break-all', pattern: /word-break\s*:\s*break-all\s*;/gi },
  { name: 'word-break break-word', pattern: /word-break\s*:\s*break-word\s*;/gi },
  { name: 'overflow-wrap anywhere', pattern: /overflow-wrap\s*:\s*anywhere\s*;/gi },
  { name: 'forced hyphenation', pattern: /hyphens\s*:\s*(auto|manual)\s*;/gi }
]

const badSplitPatterns = [
  { name: 'temporary bad split', pattern: /temp\s*[/|]\s*orary/gi },
  { name: 'adapters bad split', pattern: /adapt\s*[/|]\s*ers/gi },
  { name: 'prompting bad split', pattern: /promp\s*[/|]\s*ting/gi },
  { name: 'context bad split', pattern: /con\s*[/|]\s*text/gi },
  { name: 'representation bad split', pattern: /represen\s*[/|]\s*tation/gi }
]

const requiredVisualClasses = [
  '.visual-label',
  '.visual-chip',
  '.visual-node-label',
  '.visual-callout-title',
  '.visual-callout-body'
]

function walkFiles(dir, extensions, results = []) {
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(entry.name)) continue
      walkFiles(filePath, extensions, results)
      continue
    }
    if (extensions.some((extension) => filePath.endsWith(extension))) results.push(filePath)
  }
  return results
}

function lineNumberForIndex(text, index) {
  return text.slice(0, index).split('\n').length
}

function pushMatches({ issues, filePath, text, checks, type }) {
  for (const check of checks) {
    let match
    check.pattern.lastIndex = 0
    while ((match = check.pattern.exec(text))) {
      issues.push({
        type,
        file: path.relative(root, filePath),
        line: lineNumberForIndex(text, match.index),
        pattern: check.name,
        match: match[0]
      })
    }
  }
}

function getSlice(text, startNeedle, endNeedle) {
  const start = text.indexOf(startNeedle)
  if (start < 0) return ''
  const end = endNeedle ? text.indexOf(endNeedle, start) : -1
  return text.slice(start, end > start ? end : undefined)
}

function visibleLength(label) {
  return label.replace(/\s+/g, ' ').trim().length
}

function scanLiteralLabels(filePath, text, issues) {
  const literalPatterns = [
    /<(?:Label|text)\b[^>]*>([^<{]+)<\/(?:Label|text)>/g,
    /<(?:strong|em)\b[^>]*>([^<{]+)<\/(?:strong|em)>/g,
    /<span\b[^>]*className=["'][^"']*visual-(?:label|chip|node-label)[^"']*["'][^>]*>([^<{]+)<\/span>/g,
    /<VisualMiniLabel\b[^>]*>([^<{]+)<\/VisualMiniLabel>/g
  ]

  for (const pattern of literalPatterns) {
    let match
    while ((match = pattern.exec(text))) {
      const label = match[1].replace(/\s+/g, ' ').trim()
      if (!label || /^\d+$/.test(label)) continue
      if (approvedLongInternalLabels.has(label)) continue
      if (visibleLength(label) > maxInternalLabelLength) {
        issues.push({
          type: 'long internal label',
          file: path.relative(root, filePath),
          line: lineNumberForIndex(text, match.index),
          label,
          length: visibleLength(label),
          limit: maxInternalLabelLength
        })
      }
    }
  }
}

function scanHandSpecifiedLabels(filePath, text, issues) {
  const slices = [
    getSlice(text, 'function PromptResponseDiagram', 'function VisualStepBadge'),
    getSlice(text, 'function HandSpecifiedVisual', 'function GeneratedImageScene')
  ].join('\n')
  const labelPattern = /\b(?:title|label|enteringCard|outsideCard)\s*[:=]\s*['"]([^'"]+)['"]/g
  let match
  while ((match = labelPattern.exec(slices))) {
    const label = match[1].replace(/\s+/g, ' ').trim()
    if (approvedLongInternalLabels.has(label)) continue
    if (visibleLength(label) > maxInternalLabelLength) {
      issues.push({
        type: 'long internal label',
        file: path.relative(root, filePath),
        line: lineNumberForIndex(text, text.indexOf(match[0])),
        label,
        length: visibleLength(label),
        limit: maxInternalLabelLength
      })
    }
  }

  const diagramBody = getSlice(text, 'function PromptResponseDiagram', 'function VisualStepBadge')
  const paragraphPattern = /<p\b/gi
  let paragraphMatch
  while ((paragraphMatch = paragraphPattern.exec(diagramBody))) {
    issues.push({
      type: 'paragraph in diagram body',
      file: path.relative(root, filePath),
      line: lineNumberForIndex(text, text.indexOf(paragraphMatch[0], text.indexOf('function PromptResponseDiagram'))),
      match: '<p>'
    })
  }
}

function scanRequiredClasses(cssText, issues) {
  for (const className of requiredVisualClasses) {
    if (!cssText.includes(className)) {
      issues.push({
        type: 'missing visual label class',
        file: 'src/styles/global.css',
        line: 1,
        className
      })
    }
  }
}

function renderMarkdown(result) {
  const lines = [
    `# Prompt Life v${version} Word-Wrap Audit`,
    '',
    `Status: ${result.status}`,
    '',
    `Unsafe CSS patterns: ${result.counts.unsafeCss}`,
    `Known bad split strings: ${result.counts.badSplits}`,
    `Long internal labels: ${result.counts.longLabels}`,
    `Paragraphs inside diagram bodies: ${result.counts.diagramParagraphs}`,
    `Required visual label classes present: ${result.counts.requiredClassesPresent}/${requiredVisualClasses.length}`,
    '',
    '## Issues'
  ]

  if (!result.issues.length) {
    lines.push('', 'No word-wrap guardrail issues found.')
  } else {
    for (const issue of result.issues) {
      lines.push('', `- ${issue.type} in \`${issue.file}:${issue.line}\`${issue.label ? `: "${issue.label}" (${issue.length}/${issue.limit})` : issue.pattern ? `: ${issue.pattern}` : ''}`)
    }
  }

  return `${lines.join('\n')}\n`
}

function main() {
  const sourceFiles = sourceRoots.flatMap((dir) => walkFiles(dir, ['.css', '.tsx', '.ts', '.jsx', '.js', '.mjs']))
  const existingGeneratedPages = generatedReviewPages.filter((filePath) => fs.existsSync(filePath))
  const files = [...sourceFiles, ...existingGeneratedPages]
  const issues = []

  for (const filePath of files) {
    const text = fs.readFileSync(filePath, 'utf8')
    pushMatches({ issues, filePath, text, checks: unsafeCssPatterns, type: 'unsafe wrapping CSS' })
    pushMatches({ issues, filePath, text, checks: badSplitPatterns, type: 'known bad split string' })
    if (filePath.endsWith('VisualAids.tsx') || filePath.endsWith('DiagramKit.tsx')) {
      scanLiteralLabels(filePath, text, issues)
    }
    if (filePath.endsWith('VisualAids.tsx')) {
      scanHandSpecifiedLabels(filePath, text, issues)
    }
  }

  const cssPath = path.join(root, 'src', 'styles', 'global.css')
  const cssText = fs.readFileSync(cssPath, 'utf8')
  scanRequiredClasses(cssText, issues)

  const counts = {
    unsafeCss: issues.filter((issue) => issue.type === 'unsafe wrapping CSS').length,
    badSplits: issues.filter((issue) => issue.type === 'known bad split string').length,
    longLabels: issues.filter((issue) => issue.type === 'long internal label').length,
    diagramParagraphs: issues.filter((issue) => issue.type === 'paragraph in diagram body').length,
    requiredClassesPresent: requiredVisualClasses.filter((className) => cssText.includes(className)).length
  }
  const result = {
    version,
    status: issues.length ? 'fail' : 'pass',
    checkedFiles: files.map((filePath) => path.relative(root, filePath)),
    counts,
    issues
  }

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(result, null, 2)}\n`)
  fs.writeFileSync(reportMdPath, renderMarkdown(result))

  if (!process.argv.includes('--silent')) {
    console.log(`Word-wrap audit ${result.status}.`)
    console.log(`Checked ${files.length} files.`)
    console.log(`Unsafe CSS: ${counts.unsafeCss}`)
    console.log(`Known bad splits: ${counts.badSplits}`)
    console.log(`Long internal labels: ${counts.longLabels}`)
    console.log(`Diagram paragraphs: ${counts.diagramParagraphs}`)
  }

  if (issues.length) process.exit(1)
}

main()
