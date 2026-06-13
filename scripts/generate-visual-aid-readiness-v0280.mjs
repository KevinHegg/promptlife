import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VERSION, summarizeReadiness, visualAidReadinessBriefs, visualAidTemplates } from './visual-aid-readiness-data-v0280.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const testingDir = path.join(root, 'docs', 'testing')
const screenshotDir = path.join(root, 'docs', 'journey', 'screenshots', 'v0-28-0')

const rubricJsonPath = path.join(outDir, 'visual-aid-readiness-rubric-v0-28-0.json')
const rubricCsvPath = path.join(outDir, 'visual-aid-readiness-rubric-v0-28-0.csv')
const rubricMdPath = path.join(outDir, 'visual-aid-readiness-rubric-v0-28-0.md')
const reviewHtmlPath = path.join(outDir, 'prompt-life-v0-28-0-visual-aid-human-test-review.html')
const readinessHtmlPath = path.join(outDir, 'prompt-life-v0-28-0-visual-aid-readiness-report.html')
const feedbackMdPath = path.join(testingDir, 'prompt-life-v0-28-0-visual-aid-human-feedback.md')
const feedbackHtmlPath = path.join(testingDir, 'prompt-life-v0-28-0-visual-aid-human-feedback.html')

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function mdList(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function priorityLabel(priority) {
  return {
    P0: 'P0 unusable or misleading',
    P1: 'P1 hard to read or unclear',
    P2: 'P2 acceptable but improvable',
    P3: 'P3 keep'
  }[priority] ?? priority
}

function imagePath(brief) {
  return `../screenshots/v0-28-0/${brief.currentVisualId}-390.png`
}

function screenshotExistsRelative(brief) {
  return `docs/journey/screenshots/v0-28-0/${brief.currentVisualId}-390.png`
}

function renderRubricMarkdown(payload) {
  const lines = [
    '# Prompt Life Visual Aid Readiness Rubric v0.28.0',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    'This rubric classifies all 39 Journey visual aids for small human testing. It does not claim final visual polish; it asks whether each visual is testable, readable, non-misleading, and aligned with the model-literacy objective.',
    '',
    '## Seven Human-Readability Scores',
    '',
    '- Five-second clarity',
    '- Mobile readability',
    '- Single-idea focus',
    '- Mechanism accuracy',
    '- Caption/callout support',
    '- Style consistency',
    '- Misconception repair',
    '',
    '## Priority Scale',
    '',
    '- P0: unusable or misleading; must fix before human testing',
    '- P1: hard to read or unclear; fix before human testing if feasible',
    '- P2: acceptable but improvable',
    '- P3: keep',
    '',
    '## Summary',
    '',
    `- Visual aids scored: ${payload.summary.total}`,
    `- P0/P1 before: ${(payload.summary.priorityBeforeCounts.P0 ?? 0) + (payload.summary.priorityBeforeCounts.P1 ?? 0)}`,
    `- P0/P1 after: ${(payload.summary.priorityAfterCounts.P0 ?? 0) + (payload.summary.priorityAfterCounts.P1 ?? 0)}`,
    `- Human testing recommendation: ${payload.humanTestingRecommendation}`,
    '',
    '## Template Distribution',
    ''
  ]

  for (const [template, count] of Object.entries(payload.summary.templateDistribution)) {
    lines.push(`- ${template}: ${count}`)
  }

  lines.push('', '## Card-by-Card Rubric', '')
  lines.push('| # | Stage | Card | Visual | Template | Score | Before | After | Status | Watch note |')
  lines.push('| ---: | --- | --- | --- | --- | ---: | --- | --- | --- | --- |')
  for (const brief of payload.briefs) {
    lines.push(`| ${brief.learningCardNumber} | ${brief.stageTitle} | ${brief.learningCardTitle} | ${brief.currentVisualTitle} | ${brief.selectedCanonicalTemplate} | ${brief.scores.total}/35 | ${brief.priorityBefore} | ${brief.priority} | ${brief.status} | ${brief.mobileRiskNotes} |`)
  }

  lines.push('', '## Top 10 Visuals To Watch During Human Testing', '')
  for (const item of payload.summary.topWatchList) {
    lines.push(`- ${item.visual} (${item.card}, ${item.score}/35): ${item.whyWatch}`)
  }

  return `${lines.join('\n')}\n`
}

function renderFullReviewHtml(payload) {
  const templateRows = visualAidTemplates.map((template) => `
    <tr>
      <td>${template.name}</td>
      <td>${template.purpose}</td>
      <td>${template.allowed.join('; ')}</td>
      <td>${template.notAllowed.join('; ')}</td>
    </tr>
  `).join('')

  const cards = payload.briefs.map((brief) => `
    <article class="brief-card" id="${brief.currentVisualId}">
      <div class="brief-head">
        <span>Stage ${brief.stageNumber}: ${brief.stageTitle}</span>
        <strong>${brief.learningCardNumber}. ${brief.learningCardTitle}</strong>
        <em>${brief.selectedCanonicalTemplate} · ${brief.scores.total}/35 · ${priorityLabel(brief.priority)} · ${brief.status}</em>
      </div>
      <figure>
        <img src="${imagePath(brief)}" alt="390px screenshot of ${brief.currentVisualTitle}" />
        <figcaption>${brief.currentVisualTitle}: ${brief.currentIssueSummary}</figcaption>
      </figure>
      <dl>
        <div><dt>Learning objective</dt><dd>${brief.oneSentenceLearningObjective}</dd></div>
        <div><dt>One concept</dt><dd>${brief.oneConceptVisualMustConvey}</dd></div>
        <div><dt>Misconception corrected</dt><dd>${brief.misconceptionVisualMustCorrect}</dd></div>
        <div><dt>Caption/callouts</dt><dd>${brief.calloutsBelowVisual.join(' ')}</dd></div>
        <div><dt>Allowed in-visual labels</dt><dd>${brief.exactLabelsAllowedInsideVisual.join(', ') || 'None; keep text in HTML.'}</dd></div>
        <div><dt>Alt text</dt><dd>${brief.altText}</dd></div>
        <div><dt>Tester note</dt><dd>${brief.notesForHumanTesters}</dd></div>
      </dl>
    </article>
  `).join('')

  return renderHtmlShell({
    title: 'Prompt Life v0.28.0 Visual Aid Human-Test Review',
    body: `
      <p class="lede">This packet lets reviewers inspect all 39 Journey visual aids without clicking through the app. It includes each card's 390px screenshot, template, concept, misconception, caption/callouts, score, priority, and tester note.</p>
      ${renderMetricGrid(payload)}
      <h2>Six Canonical Templates</h2>
      <table><thead><tr><th>Template</th><th>Purpose</th><th>Allowed</th><th>Not allowed</th></tr></thead><tbody>${templateRows}</tbody></table>
      <h2>Top 10 Visuals To Watch</h2>
      <ol>${payload.summary.topWatchList.map((item) => `<li><strong>${item.visual}</strong> (${item.card}, ${item.score}/35): ${item.whyWatch}</li>`).join('')}</ol>
      <h2>All Journey Visual Aids</h2>
      <section class="brief-grid">${cards}</section>
    `
  })
}

function renderReadinessReportHtml(payload) {
  const image2 = payload.summary.laterImage2.map((title) => `<li>${title}</li>`).join('')
  const coded = payload.summary.mustRemainCoded.map((title) => `<li>${title}</li>`).join('')
  const temporary = payload.summary.temporaryVisuals.map((title) => `<li>${title}</li>`).join('')
  const fixed = payload.summary.fixedVisuals.map((title) => `<li>${title}</li>`).join('')
  const screenshotFigures = payload.briefs.slice(0, 12).map((brief) => `
    <figure><img src="${imagePath(brief)}" alt="${brief.currentVisualTitle} screenshot" /><figcaption>${brief.currentVisualTitle}</figcaption></figure>
  `).join('')

  return renderHtmlShell({
    title: 'Prompt Life v0.28.0 Visual Aid Readiness Report',
    body: `
      <p class="lede">This readiness pass reclassifies all Journey visual aids against a human-readability rubric, applies the six-template strategy, and verifies that no P0/P1 visual remains for small human testing.</p>
      ${renderMetricGrid(payload)}
      <h2>Summary Of Changes</h2>
      <ul>
        <li>Added six canonical visual-aid templates to the style guide.</li>
        <li>Scored all 39 Journey visual aids with a seven-part human-readability rubric.</li>
        <li>Created a full human-test review packet and tester feedback sheet.</li>
        <li>Strengthened <code>audit:visual-aids</code> to check templates, captions, alt text, label estimates, generated/mechanism boundaries, P0/P1 status, metadata strings, and screenshot coverage.</li>
        <li>Bumped app/package version to ${VERSION}.</li>
      </ul>
      <h2>P0/P1 Before And After</h2>
      <table><thead><tr><th>Priority</th><th>Before</th><th>After</th></tr></thead><tbody>
        ${['P0', 'P1', 'P2', 'P3'].map((priority) => `<tr><td>${priority}</td><td>${payload.summary.priorityBeforeCounts[priority] ?? 0}</td><td>${payload.summary.priorityAfterCounts[priority] ?? 0}</td></tr>`).join('')}
      </tbody></table>
      <h2>Template Distribution</h2>
      <ul>${Object.entries(payload.summary.templateDistribution).map(([template, count]) => `<li><strong>${template}</strong>: ${count}</li>`).join('')}</ul>
      <h2>Visuals Fixed For Testing</h2>
      <ul>${fixed}</ul>
      <h2>Temporary But Acceptable For Testing</h2>
      <ul>${temporary}</ul>
      <h2>Recommended Later Image 2 Replacements</h2>
      <ul>${image2}</ul>
      <h2>Must Remain Coded SVG/HTML</h2>
      <ul>${coded}</ul>
      <h2>Screenshots</h2>
      <section class="shots">${screenshotFigures}</section>
      <h2>Human Testing Recommendation</h2>
      <p><strong>${payload.humanTestingRecommendation}</strong>. No P0/P1 visual remains after the readiness classification. Several visuals remain intentionally temporary and should be watched closely during testing.</p>
    `
  })
}

function renderMetricGrid(payload) {
  const beforeP0P1 = (payload.summary.priorityBeforeCounts.P0 ?? 0) + (payload.summary.priorityBeforeCounts.P1 ?? 0)
  const afterP0P1 = (payload.summary.priorityAfterCounts.P0 ?? 0) + (payload.summary.priorityAfterCounts.P1 ?? 0)
  return `
    <section class="metrics">
      <div><strong>${payload.summary.total}</strong><span>visual aids scored</span></div>
      <div><strong>${beforeP0P1}</strong><span>P0/P1 before</span></div>
      <div><strong>${afterP0P1}</strong><span>P0/P1 after</span></div>
      <div><strong>${Object.keys(payload.summary.templateDistribution).length}</strong><span>templates used</span></div>
    </section>
  `
}

function renderHtmlShell({ title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #101a52; background: #f7fbff; }
    body { margin: 0; padding: 28px; }
    main { max-width: 1120px; margin: 0 auto; }
    h1, h2, h3 { color: #101783; line-height: 1.08; }
    h1 { font-size: 2.15rem; margin-bottom: 6px; }
    p, li, dd, dt { line-height: 1.48; }
    .lede { font-size: 1.04rem; color: #33446f; }
    .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 18px 0 28px; }
    .metrics div, .brief-card, figure, table, .panel { background: #fff; border: 1px solid #d9e3f7; border-radius: 14px; box-shadow: 0 10px 28px rgba(20,30,88,.06); }
    .metrics div { padding: 14px; }
    .metrics strong { display: block; font-size: 1.75rem; color: #087f8c; }
    table { width: 100%; border-collapse: collapse; overflow: hidden; }
    th, td { border: 1px solid #d9e3f7; padding: 9px; text-align: left; vertical-align: top; font-size: .84rem; }
    th { background: #eaf5ff; }
    .brief-grid { display: grid; gap: 16px; }
    .brief-card { padding: 16px; break-inside: avoid; }
    .brief-head { display: grid; gap: 4px; margin-bottom: 12px; }
    .brief-head span { color: #009a9a; font-weight: 900; text-transform: uppercase; font-size: .78rem; }
    .brief-head strong { font-size: 1.2rem; color: #101783; }
    .brief-head em { color: #455578; font-style: normal; font-weight: 800; }
    figure { margin: 0 0 12px; padding: 12px; break-inside: avoid; }
    figure img { width: 100%; display: block; border-radius: 10px; border: 1px solid #edf1fb; }
    figcaption { margin-top: 8px; font-size: .82rem; font-weight: 800; color: #28385f; }
    dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 0; }
    dl div { background: #f7fbff; border: 1px solid #e1eaf8; border-radius: 10px; padding: 8px; }
    dt { color: #009a9a; font-size: .72rem; font-weight: 900; text-transform: uppercase; }
    dd { margin: 3px 0 0; font-size: .86rem; }
    .shots { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    code { background: #eef4ff; padding: 2px 5px; border-radius: 5px; }
    @media print {
      body { padding: 16px; }
      .metrics { grid-template-columns: repeat(4, 1fr); }
      .shots { grid-template-columns: repeat(3, 1fr); }
      table { font-size: .72rem; }
      dl { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p class="lede">Generated ${new Date().toISOString()} for Prompt Life v${VERSION}.</p>
    ${body}
  </main>
</body>
</html>`
}

function renderFeedbackMarkdown() {
  return `# Prompt Life v0.28.0 Visual Aid Human Feedback Sheet

Prompt Life is under construction and preparing for small human testing. The badge is not issued yet. Please look for visual clarity, not perfection.

## For Each Visual Aid You Notice

1. What do you think the picture is trying to show?
2. What part helped?
3. What part confused you?
4. Could you read the labels?
5. Did the caption explain the picture?
6. Did the visual feel necessary or decorative?
7. Did it help you understand the model?
8. What would you remove or simplify?

## Please Flag

- Tiny text
- Unclear arrows
- Too many objects
- Unexplained jargon
- Decorative but unhelpful art
- A visual that contradicts the lesson
- A visual that feels like a generic AI picture

## Visuals To Watch Closely

${mdList(summarizeReadiness().topWatchList.map((item) => `${item.visual}: ${item.whyWatch}`))}

## How To Report

For each confusing visual, note the card title, what you thought it meant, and where your attention went first. It is especially useful to say whether the caption fixed the confusion or whether the picture itself needs to be simpler.
`
}

function renderFeedbackHtml(markdown) {
  const sections = markdown
    .replace(/^# (.+)$/m, '<h1>$1</h1>')
    .replaceAll(/^## (.+)$/gm, '<h2>$1</h2>')
    .replaceAll(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replaceAll(/^- (.+)$/gm, '<li>$1</li>')
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('<h')) return block
      if (block.startsWith('<li>')) return `<ul>${block}</ul>`
      return `<p>${block}</p>`
    })
    .join('\n')
  return renderHtmlShell({ title: 'Prompt Life v0.28.0 Visual Aid Human Feedback Sheet', body: sections.replace('<h1>Prompt Life v0.28.0 Visual Aid Human Feedback Sheet</h1>', '') })
}

async function main() {
  await mkdir(outDir, { recursive: true })
  await mkdir(testingDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })

  const summary = summarizeReadiness()
  const payload = {
    version: VERSION,
    generatedAt: new Date().toISOString(),
    humanTestingRecommendation: summary.p0p1Remaining.length ? 'needs visual fixes before human testing' : 'ready for small human testing',
    heuristicNotes: [
      'Internal label count is a curated estimate for instructional labels. Repeated token chips are treated as examples, not separate explanatory labels.',
      'Generated-image checks rely on the current visual type and selected template from this readiness registry.',
      'Screenshot presence is checked by audit:visual-aids after screenshots are captured.'
    ],
    templates: visualAidTemplates,
    summary,
    briefs: visualAidReadinessBriefs
  }

  const csvHeader = [
    'learningCardNumber',
    'stageTitle',
    'learningCardId',
    'learningCardTitle',
    'currentVisualId',
    'currentVisualTitle',
    'currentVisualType',
    'selectedCanonicalTemplate',
    'currentVisualQualityRating',
    'priorityBefore',
    'priority',
    'status',
    'scoreTotal',
    'image2Allowed',
    'mustRemainCodedSvgHtml',
    'mobileRiskNotes',
    'notesForHumanTesters'
  ]
  const csv = [
    csvHeader.join(','),
    ...visualAidReadinessBriefs.map((brief) => csvHeader.map((key) => csvEscape(key === 'scoreTotal' ? brief.scores.total : brief[key])).join(','))
  ].join('\n')

  await writeFile(rubricJsonPath, `${JSON.stringify(payload, null, 2)}\n`)
  await writeFile(rubricCsvPath, `${csv}\n`)
  await writeFile(rubricMdPath, renderRubricMarkdown(payload))
  await writeFile(reviewHtmlPath, renderFullReviewHtml(payload))
  await writeFile(readinessHtmlPath, renderReadinessReportHtml(payload))

  const feedbackMarkdown = renderFeedbackMarkdown()
  await writeFile(feedbackMdPath, feedbackMarkdown)
  await writeFile(feedbackHtmlPath, renderFeedbackHtml(feedbackMarkdown))

  console.log(`Wrote v${VERSION} visual-aid readiness artifacts to ${outDir}`)
  console.log(`Wrote v${VERSION} visual feedback sheet to ${testingDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
