import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VERSION, visualAidReadinessBriefs, visualAidTemplates } from './visual-aid-readiness-data-v0282.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-2')
const sourcePath = path.join(root, 'src', 'components', 'VisualAids.tsx')
const cssPath = path.join(root, 'src', 'styles', 'global.css')

const numberedVisualAidMarkers = {
  'training-loop': 5,
  'overfitting-generalization': 4,
  'inference-pass': 4,
  'prompt-response': 4,
  tokenization: 3,
  'token-ids': 4,
  embeddings: 4,
  vectors: 3,
  tensors: 3,
  autoregression: 4,
  'context-window': 4,
  'rag-retrieval': 5,
  'grounding-evidence': 4,
  'hallucination-bridge': 4
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function readCatalogIds() {
  const source = await readFile(sourcePath, 'utf8')
  const match = source.match(/export const visualAidCatalog = \[([\s\S]*?)\n\]\n\nconst aidById/)
  if (!match) throw new Error('Could not locate visualAidCatalog in VisualAids.tsx.')
  return [...match[1].matchAll(/(?:generatedAid\('[^']+',\s*\{\s*id|id): '([^']+)'/g)].map((hit) => hit[1])
}

function renderConsistencyMarkdown(summary, rows) {
  const lines = [
    '# Prompt Life Visual Aid Consistency Audit v0.28.2',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Audited visual aids: ${summary.total}`,
    `Numbered callout mismatches: ${summary.mismatches}`,
    `Generated PNG-backed aids: ${summary.generatedImages}`,
    `Coded SVG/HTML aids: ${summary.codedAids}`,
    '',
    '| Visual aid | Template | Type | Callouts | Markers | Status | Note |',
    '| --- | --- | --- | --- | ---: | --- | --- |'
  ]
  for (const row of rows) {
    lines.push(`| ${row.id} | ${row.template} | ${row.visualType} | ${row.calloutCount} | ${row.markerCount} | ${row.status} | ${row.note} |`)
  }
  return `${lines.join('\n')}\n`
}

function renderReadinessMarkdown(readiness) {
  const lines = [
    '# Prompt Life Visual Aid Readiness Audit v0.28.2',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Status: ${readiness.status}`,
    `Issues: ${readiness.issues.length}`,
    '',
    '## Checks',
    '',
    ...readiness.checks.map((check) => `- ${check}`),
    '',
    '## Heuristic Notes',
    '',
    ...readiness.heuristicNotes.map((note) => `- ${note}`),
    '',
    '## Issues',
    ''
  ]

  if (!readiness.issues.length) {
    lines.push('No readiness-audit issues found.')
  } else {
    for (const issue of readiness.issues) {
      lines.push(`- ${issue}`)
    }
  }

  lines.push('', '## Required Screenshots', '')
  for (const screenshot of readiness.requiredScreenshots) {
    lines.push(`- ${screenshot.file}: ${screenshot.exists ? 'present' : 'missing'}`)
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const source = await readFile(sourcePath, 'utf8')
  const css = await readFile(cssPath, 'utf8')
  const catalogIds = await readCatalogIds()
  const briefIds = visualAidReadinessBriefs.map((brief) => brief.currentVisualId)
  const configuredIds = new Set(briefIds)
  const templateNames = new Set(visualAidTemplates.map((template) => template.name))

  const consistencyRows = visualAidReadinessBriefs.map((brief) => {
    const markerCount = numberedVisualAidMarkers[brief.currentVisualId] ?? 0
    const calloutCount = brief.calloutsBelowVisual.length
    const issue = markerCount > 0 && markerCount !== calloutCount
      ? 'numbered-marker-count-mismatch'
      : ''
    return {
      id: brief.currentVisualId,
      title: brief.currentVisualTitle,
      template: brief.selectedCanonicalTemplate,
      visualType: brief.currentVisualType,
      markerCount,
      calloutCount,
      status: issue ? 'fix' : 'ok',
      issue,
      note: issue || brief.currentIssueSummary
    }
  })

  const missingFromConfig = catalogIds.filter((id) => !configuredIds.has(id))
  const missingFromSource = briefIds.filter((id) => !catalogIds.includes(id))
  const mismatches = consistencyRows.filter((row) => row.issue).length

  const summary = {
    version: VERSION,
    total: visualAidReadinessBriefs.length,
    sourceCatalogCount: catalogIds.length,
    mismatches,
    generatedImages: visualAidReadinessBriefs.filter((brief) => brief.currentVisualType === 'generated-image').length,
    codedAids: visualAidReadinessBriefs.filter((brief) => brief.currentVisualType !== 'generated-image').length,
    missingFromConfig,
    missingFromSource,
    checks: [
      'all current catalog visual aids must have readiness briefs',
      'numbered explanation list must match marker count',
      'generated PNGs keep instructional text in HTML',
      'exact mechanism diagrams remain coded SVG/HTML'
    ]
  }

  const consistencyPayload = { summary, rows: consistencyRows }
  const consistencyCsvHeader = ['id', 'title', 'template', 'visualType', 'markerCount', 'calloutCount', 'status', 'issue', 'note']
  const consistencyCsv = [
    consistencyCsvHeader.join(','),
    ...consistencyRows.map((row) => consistencyCsvHeader.map((key) => csvEscape(row[key])).join(','))
  ].join('\n')

  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-2.json'), `${JSON.stringify(consistencyPayload, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-2.csv'), `${consistencyCsv}\n`)
  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-2.md'), renderConsistencyMarkdown(summary, consistencyRows))

  const metadataTerms = ['Pattern:', 'Variant:', 'Markers:', 'Callouts:', 'Renderer:', 'Implementation:', 'visual aid id']
  const metadataLeaks = metadataTerms.filter((term) => source.includes(term))
  const deprecatedCurrentTitles = visualAidReadinessBriefs
    .filter((brief) => brief.currentVisualTitle === 'Attention Weave')
    .map((brief) => brief.currentVisualId)
  const tinyCssMatches = [...css.matchAll(/(?:\\.visual-aid|\\.lesson-review-route[^{}]*\\.visual-aid)[^{]*\\{[^}]*font-size:\\s*([0-9.]+)px/gs)]
    .map((match) => Number(match[1]))
    .filter((size) => size < 12)
  const inlineTinyText = [...source.matchAll(/fontSize=\\{?['"]?([0-9.]+)['"]?\\}?/g)]
    .map((match) => Number(match[1]))
    .filter((size) => size < 12)
  const requiredScreenshots = []
  for (const id of briefIds) {
    const file = `${id}-390.png`
    requiredScreenshots.push({ file, exists: await fileExists(path.join(screenshotDir, file)) })
  }

  const readinessIssues = [
    ...missingFromConfig.map((id) => `current catalog visual aid has no v0.28.2 readiness brief: ${id}`),
    ...missingFromSource.map((id) => `v0.28.2 readiness brief does not exist in current catalog: ${id}`),
    ...visualAidReadinessBriefs.filter((brief) => !templateNames.has(brief.selectedCanonicalTemplate)).map((brief) => `missing or unknown template: ${brief.currentVisualId}`),
    ...visualAidReadinessBriefs.filter((brief) => !brief.calloutsBelowVisual?.length).map((brief) => `missing callouts: ${brief.currentVisualId}`),
    ...visualAidReadinessBriefs.filter((brief) => !brief.altText).map((brief) => `missing alt text: ${brief.currentVisualId}`),
    ...visualAidReadinessBriefs.filter((brief) => brief.internalLabelCountEstimate > 5).map((brief) => `more than 5 estimated internal instructional labels: ${brief.currentVisualId}`),
    ...visualAidReadinessBriefs.filter((brief) => ['P0', 'P1'].includes(brief.priority)).map((brief) => `P0/P1 visual remains: ${brief.currentVisualId} ${brief.priority}`),
    ...visualAidReadinessBriefs.filter((brief) => brief.currentVisualType === 'generated-image' && brief.mustRemainCodedSvgHtml).map((brief) => `exact mechanism visual is generated PNG only: ${brief.currentVisualId}`),
    ...visualAidReadinessBriefs.filter((brief) => brief.currentVisualType === 'generated-image' && brief.selectedCanonicalTemplate !== 'Atmospheric Scene').map((brief) => `generated PNG is not marked as Atmospheric Scene: ${brief.currentVisualId}`),
    ...metadataLeaks.map((term) => `metadata/debug label still appears in VisualAids.tsx: ${term}`),
    ...deprecatedCurrentTitles.map((id) => `deprecated Attention Weave title remains for current visual: ${id}`),
    ...tinyCssMatches.map((size) => `visual-aid CSS font-size below 12px: ${size}px`),
    ...inlineTinyText.map((size) => `inline SVG font size below 12px: ${size}px`),
    ...requiredScreenshots.filter((shot) => !shot.exists).map((shot) => `required v0.28.2 screenshot missing: ${shot.file}`)
  ]

  const readiness = {
    version: VERSION,
    status: readinessIssues.length ? 'fix' : 'ok',
    checks: [
      'every current visual aid has a canonical template',
      'every visual aid has callouts and alt text',
      'no visual has more than five estimated internal instructional labels',
      'no known visual-aid CSS or inline SVG font size below 12px',
      'no generated PNG is marked as an exact mechanism diagram',
      'no exact mechanism visual is generated PNG only',
      'no P0/P1 visual remains after readiness pass',
      'no renderer/debug metadata labels in VisualAids.tsx',
      'required v0.28.2 390px screenshots exist for all 39 visual aids'
    ],
    heuristicNotes: [
      'Internal label count is a curated estimate for explanatory labels. Repeated token examples are not counted as separate instructional labels.',
      'Generated-image and exact-mechanism checks use the v0.28.2 readiness registry rather than computer vision.',
      'Screenshot checks validate artifact presence; visual quality still requires human review.'
    ],
    issues: readinessIssues,
    requiredScreenshots
  }

  await writeFile(path.join(outDir, 'visual-aid-readiness-audit-v0-28-2.json'), `${JSON.stringify(readiness, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-aid-readiness-audit-v0-28-2.md'), renderReadinessMarkdown(readiness))

  if (summary.missingFromConfig.length || summary.missingFromSource.length || mismatches || readinessIssues.length) {
    console.error(JSON.stringify({ summary, readiness }, null, 2))
    process.exit(1)
  }

  console.log(`Visual aid audit passed: ${summary.total} aids, ${mismatches} mismatches, ${readinessIssues.length} readiness issues.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
