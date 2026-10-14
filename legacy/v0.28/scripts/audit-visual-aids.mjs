import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VERSION, visualAidReadinessBriefs, visualAidTemplates } from './visual-aid-readiness-data-v0283.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-3')
const sourcePath = path.join(root, 'src', 'components', 'VisualAids.tsx')
const cssPath = path.join(root, 'src', 'styles', 'global.css')
const flowchartReplacementIds = [
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
const handSpecifiedTemplates = new Set(['Vertical Mechanism Strip', 'Boundary Board', 'Tray / Stack / Bars'])

const numberedVisualAidMarkers = {
  'training-loop': 5,
  'overfitting-generalization': 4,
  'before-morning-finetuning-path': 4,
  'inference-pass': 5,
  'prompt-response': 4,
  tokenization: 3,
  'token-ids': 4,
  embeddings: 4,
  vectors: 3,
  tensors: 3,
  autoregression: 4,
  'context-window': 3,
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
    '# Prompt Life Visual Aid Consistency Audit v0.28.3',
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
    '# Prompt Life Visual Aid Readiness Audit v0.28.3',
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

function renderFlowchartReplacementMarkdown(payload) {
  const lines = [
    '# Prompt Life Flowchart Replacement Audit v0.28.3',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    `Status: ${payload.status}`,
    `Target visuals: ${payload.summary.totalTargets}`,
    `Targets replaced: ${payload.summary.replacedTargets}`,
    `Issues: ${payload.summary.issueCount}`,
    '',
    '| Visual aid | New template | Type | Labels | Status | Issue |',
    '| --- | --- | --- | ---: | --- | --- |'
  ]

  for (const row of payload.rows) {
    lines.push(`| ${row.id} | ${row.template} | ${row.visualType} | ${row.internalLabelCount} | ${row.status} | ${row.issues.join('; ') || 'ok'} |`)
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

  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-3.json'), `${JSON.stringify(consistencyPayload, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-3.csv'), `${consistencyCsv}\n`)
  await writeFile(path.join(outDir, 'visual-aid-consistency-audit-v0-28-3.md'), renderConsistencyMarkdown(summary, consistencyRows))

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
    ...missingFromConfig.map((id) => `current catalog visual aid has no v0.28.3 readiness brief: ${id}`),
    ...missingFromSource.map((id) => `v0.28.3 readiness brief does not exist in current catalog: ${id}`),
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
    ...requiredScreenshots.filter((shot) => !shot.exists).map((shot) => `required v0.28.3 screenshot missing: ${shot.file}`)
  ]

  const flowchartRows = flowchartReplacementIds.map((id) => {
    const brief = visualAidReadinessBriefs.find((item) => item.currentVisualId === id)
    const issues = []
    if (!brief) {
      issues.push('missing readiness brief')
      return {
        id,
        title: '',
        template: '',
        visualType: '',
        internalLabelCount: 0,
        status: 'fix',
        issues
      }
    }
    if (!handSpecifiedTemplates.has(brief.selectedCanonicalTemplate)) issues.push(`not a v0.28.3 hand-specified template: ${brief.selectedCanonicalTemplate}`)
    if (brief.currentVisualType === 'generated-image') issues.push('target exact-mechanism visual uses generated image')
    if (brief.internalLabelCountEstimate > 5) issues.push(`${brief.internalLabelCountEstimate} internal labels`)
    if (!source.includes(`'${id}'`)) issues.push('target id missing from source')
    if (!source.includes('handSpecifiedTemplateVisualIds') || !source.includes(`'${id}'`)) issues.push('target not registered for hand-specified HTML renderer')
    return {
      id,
      title: brief.currentVisualTitle,
      template: brief.selectedCanonicalTemplate,
      visualType: brief.currentVisualType,
      internalLabelCount: brief.internalLabelCountEstimate,
      status: issues.length ? 'fix' : 'ok',
      issues
    }
  })
  const freeFormFlowchartClassHits = [...source.matchAll(/className=["'`][^"'`]*(?:flowchart|flow-chart)[^"'`]*/gi)].map((match) => match[0])
  const flowchartIssues = [
    ...flowchartRows.flatMap((row) => row.issues.map((issue) => `${row.id}: ${issue}`)),
    ...freeFormFlowchartClassHits.map((hit) => `free-form flowchart class remains: ${hit}`)
  ]
  const flowchartAudit = {
    version: VERSION,
    generatedAt: new Date().toISOString(),
    status: flowchartIssues.length ? 'fix' : 'ok',
    summary: {
      totalTargets: flowchartReplacementIds.length,
      replacedTargets: flowchartRows.filter((row) => row.status === 'ok').length,
      issueCount: flowchartIssues.length
    },
    checks: [
      'target visuals use Vertical Mechanism Strip, Boundary Board, or Tray / Stack / Bars',
      'target exact-mechanism visuals are not generated PNG only',
      'target internal label estimates stay at five or fewer',
      'target ids are registered for hand-specified HTML rendering',
      'no explicit free-form flowchart class remains in VisualAids.tsx'
    ],
    rows: flowchartRows,
    issues: flowchartIssues
  }

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
      'required v0.28.3 390px screenshots exist for all 39 visual aids'
    ],
    heuristicNotes: [
      'Internal label count is a curated estimate for explanatory labels. Repeated token examples are not counted as separate instructional labels.',
      'Generated-image and exact-mechanism checks use the v0.28.3 readiness registry rather than computer vision.',
      'Screenshot checks validate artifact presence; visual quality still requires human review.'
    ],
    issues: readinessIssues,
    requiredScreenshots
  }

  await writeFile(path.join(outDir, 'visual-aid-readiness-audit-v0-28-3.json'), `${JSON.stringify(readiness, null, 2)}\n`)
  await writeFile(path.join(outDir, 'visual-aid-readiness-audit-v0-28-3.md'), renderReadinessMarkdown(readiness))
  await writeFile(path.join(outDir, 'flowchart-replacement-audit-v0-28-3.json'), `${JSON.stringify(flowchartAudit, null, 2)}\n`)
  await writeFile(path.join(outDir, 'flowchart-replacement-audit-v0-28-3.md'), renderFlowchartReplacementMarkdown(flowchartAudit))

  if (summary.missingFromConfig.length || summary.missingFromSource.length || mismatches || readinessIssues.length || flowchartIssues.length) {
    console.error(JSON.stringify({ summary, readiness, flowchartAudit }, null, 2))
    process.exit(1)
  }

  console.log(`Visual aid audit passed: ${summary.total} aids, ${mismatches} mismatches, ${readinessIssues.length} readiness issues.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
