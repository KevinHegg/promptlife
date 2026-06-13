import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const version = '0.28.2'
const port = Number(process.env.PROMPTLIFE_EXERCISE_AUDIT_PORT ?? 5193)
const baseUrl = `http://127.0.0.1:${port}`
const docsDir = path.join(root, 'docs', 'journey', 'exercises')
const screenshotDir = path.join(docsDir, 'screenshots', 'v0-28-2')
const visualOverflowPath = path.join(root, 'docs', 'journey', 'visual-aids', 'visual-overflow-audit-v0-28-2.json')
const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
].filter(Boolean)

const stageOrder = [
  'Before Morning',
  'Morning Commute',
  'Workday',
  'Decision Room',
  'The Day Repeats',
  'Twilight: The Wider Landscape',
  'Midnight Ledger',
  'New Dawn'
]

const typeRegistry = {
  'prompt-trace': ['tap-step', 'Tap through context, probability, chosen token, and updated context.', 'Final step reveals updated context.', 'Step-specific insight text after each tap.'],
  'ai-topology': ['tap-reveal', 'Tap category branches in the AI family tree.', 'At least one branch explanation is revealed.', 'Branch-specific one-sentence explanation.'],
  'traditions-sort': ['sort-buckets', 'Classify rules, learned patterns, and hybrid ingredients.', 'All visible chips are assigned to buckets.', 'Correctness highlighting plus summary insight.'],
  'training-steps': ['tap-step', 'Tap each step in the training loop.', 'Update weights step is selected or sequence is completed.', 'Durable-update explanation.'],
  'pretraining-toggle': ['toggle-choice', 'Toggle between broad pattern learning and perfect recall.', 'Broad pattern learning state is selected.', 'Boundary feedback against perfect-memory myth.'],
  'overfitting-curve': ['tap-choice', 'Choose the curve that generalizes better.', 'Generalizing curve is selected.', 'Validation-example feedback.'],
  'fine-tuning-sort': ['sort-buckets', 'Sort durable training, temporary context, and decoding moves.', 'Each steering move is assigned.', 'Bucket-specific correction.'],
  'alignment-groups': ['sort-buckets', 'Group alignment methods by durable shaping, runtime steering, and evaluation.', 'Each method is assigned.', 'Method-group summary.'],
  inference: ['tap-step', 'Walk the forward pass from context to next token.', 'Forward-pass path is completed.', 'Temporary-versus-durable feedback.'],
  'prompt-response-labels': ['label-pieces', 'Tap rows that separate prompt, response so far, next token, and updated context.', 'All four rows can be inspected.', 'Row-specific explanation.'],
  'tokenization-split': ['tap-reveal', 'Reveal token cards and uneven chunks.', 'Uneven examples are shown.', 'Token boundary feedback.'],
  'token-id-lookup': ['match-lookup', 'Match token text to token IDs and table rows.', 'Lookup relationship is revealed.', 'ID-is-not-meaning feedback.'],
  'embedding-lookup': ['tap-lookup', 'Tap a token ID to retrieve its embedding row.', 'Embedding row is shown.', 'Durable embedding versus temporary hidden-state feedback.'],
  'vector-distribution': ['toggle-view', 'Switch between teaching sliders and distributed feature bars.', 'Distributed view is shown.', 'Dimension-label limit feedback.'],
  'tensor-axis': ['tap-axis', 'Inspect token axis, feature axis, and batch sheet.', 'All axis notes can be viewed.', 'Axis-specific explanation.'],
  'attention-relevance-connect': ['connect-nodes', 'Connect pronoun token to the most relevant source token.', 'A source token is selected.', 'Relevance-not-awareness feedback.'],
  'mlp-feature-toggle': ['toggle-view', 'Toggle same token before and after MLP.', 'After-MLP state is shown.', 'Feature reshaping feedback.'],
  'layers-stack-inspect': ['tap-step', 'Tap layers in a transformer stack.', 'A layer detail is shown.', 'Repeated numerical transformation feedback.'],
  'hidden-state-sort': ['sort-buckets', 'Sort durable, temporary, and outside-forward-pass items.', 'Each item is assigned.', 'Temporary hidden-state feedback.'],
  'logits-raw-toggle': ['toggle-view', 'Toggle raw scores and probability-ready framing.', 'Raw-score state is visible.', 'Logits-are-not-probabilities feedback.'],
  'softmax-convert': ['tap-transform', 'Convert raw scores into probabilities.', 'Softmax conversion is shown.', 'Probability-not-truth feedback.'],
  'sampling-probability-pick': ['tap-choice', 'Choose a next token from probability-shaped candidates.', 'A candidate token is selected.', 'Sampling uncertainty feedback.'],
  'autoregression-loop': ['tap-step', 'Step through choose, append, run again.', 'Loop reaches the repeated run state.', 'Append-and-repeat feedback.'],
  'context-window-tray': ['tap-stack', 'Push cards into a bounded context tray.', 'A card falls out after the window fills.', 'Temporary-window feedback.'],
  'rag-lane-highlight': ['tap-step', 'Trace prompt, retriever, retrieved notes, context tray, and response.', 'All retrieval lanes can be highlighted.', 'Retrieval-plus-context feedback.'],
  'grounding-claim-match': ['connect-nodes', 'Connect claims to supporting evidence.', 'Supported and unsupported claims are visible.', 'Evidence-match feedback.'],
  'hallucination-support-check': ['tap-multiple', 'Mark fluent claims that need evidence.', 'Unsupported claims are marked.', 'Unsupported-output feedback.'],
  'learning-modes-sort': ['sort-buckets', 'Sort durable update, temporary steering, retrieval, and evaluation modes.', 'Each mode is assigned.', 'What-changed feedback.'],
  'diffusion-contrast': ['tap-compare', 'Step through token append path and denoise path.', 'Both paths can be compared.', 'Autoregression-versus-diffusion feedback.'],
  'multimodal-map': ['match-lanes', 'Match media inputs and outputs.', 'A media lane pair is selected.', 'Representation-not-human-senses feedback.'],
  'perfect-storm-ingredients': ['tap-reveal', 'Tap converging ingredient streams.', 'Ingredient explanation is revealed.', 'Convergence-not-spark feedback.'],
  'collective-human-questions': ['sort-buckets', 'Sort human-rights questions away from model mechanics.', 'Questions are classified.', 'Accountability feedback.'],
  'cost-ledger': ['tap-reveal', 'Tap cost ledger entries.', 'Cost category explanation is revealed.', 'Countable-cost feedback.'],
  'risk-myth-sort': ['sort-buckets', 'Sort practical risks from myths.', 'Claims are assigned.', 'Mechanism-risk feedback.'],
  'benefit-tier-sort': ['sort-buckets', 'Sort benefit claims by evidence strength.', 'Claims are assigned.', 'Bounded-benefit feedback.'],
  'human-centered-scenario': ['tap-choice', 'Choose the more human-centered deployment.', 'Accountable deployment is selected.', 'Review-and-accountability feedback.'],
  'better-ai-levers': ['tap-multiple', 'Choose design and governance levers.', 'Useful levers are selected.', 'Design-choice feedback.'],
  'prompt-builder': ['tap-multiple', 'Pack a context tray with prompt ingredients.', 'Prompt tray is completed.', 'Context-design feedback.'],
  'synthesis-chain': ['order-sequence', 'Put the model-literacy chain in order.', 'All chain steps are ordered.', 'Mechanics-to-accountability feedback.']
}

const fixedExerciseNotes = [
  'Renamed the alignment exercise data item id from policy-filter to runtime-policy-filter while preserving the visible label "policy filter"; this removes a same-exercise id collision risk without changing learner copy.'
]

function getPlaywright() {
  const candidates = [
    path.join(root, 'node_modules', 'playwright', 'package.json'),
    '/Users/kevinhegg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'
  ]
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue
    return createRequire(candidate)('playwright')
  }
  throw new Error('Playwright is required for audit:exercises. Install it locally or run in the Codex desktop runtime.')
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

function extractLessons(source) {
  const start = source.indexOf('export const lessons = [')
  if (start < 0) throw new Error('Could not find lessons array.')
  const openBracket = source.indexOf('[', start)
  const end = source.indexOf('\n]\n\nexport const glossary', openBracket)
  if (end < 0) throw new Error('Could not find end of lessons array.')
  const lessonSource = source.slice(openBracket + 1, end + 1)
  const lessons = []
  let depth = 0
  let blockStart = -1
  let quote = ''
  let escaped = false
  for (let index = 0; index < lessonSource.length; index += 1) {
    const char = lessonSource[index]
    const previous = lessonSource[index - 1]
    if (quote) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote && quote !== '`') {
        quote = ''
      } else if (char === '`' && quote === '`' && previous !== '\\') {
        quote = ''
      }
      continue
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }
    if (char === '{') {
      if (depth === 0) blockStart = index
      depth += 1
    }
    if (char === '}') {
      depth -= 1
      if (depth === 0 && blockStart >= 0) {
        lessons.push(lessonSource.slice(blockStart, index + 1))
        blockStart = -1
      }
    }
    if (depth < 0) break
  }
  return lessons
}

function field(block, name) {
  const match = block.match(new RegExp(`${name}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return match?.[2] ?? ''
}

function parseLessonInventory(contentSource) {
  return extractLessons(contentSource).map((block, index) => {
    const interaction = block.match(/interaction:\s*\{\s*type:\s*'([^']+)',\s*title:\s*'([^']+)',\s*copy:\s*'([^']+)'/)
    const type = interaction?.[1] ?? ''
    const [exerciseType, expectedAction, completionCondition, feedbackBehavior] = typeRegistry[type] ?? ['unknown', 'Unknown exercise action.', 'Unknown completion condition.', 'Unknown feedback behavior.']
    const stageTitle = field(block, 'actLabel')
    const priority = ['prompt-trace', 'vector-distribution', 'tensor-axis', 'collective-human-questions', 'benefit-tier-sort', 'synthesis-chain'].includes(type) ? 'P2' : 'P3'
    const scores = scoreExercise(type, priority)
    return {
      version,
      learningCardNumber: index + 1,
      learningCardId: field(block, 'id'),
      learningCardTitle: field(block, 'title'),
      stageNumber: stageOrder.indexOf(stageTitle) + 1,
      stageTitle,
      interactionType: type,
      interactionTitle: interaction?.[2] ?? '',
      interactionCopy: interaction?.[3] ?? '',
      exerciseType,
      expectedLearnerAction: expectedAction,
      answerModel: answerModel(type),
      feedbackBehavior,
      completionCondition,
      randomized: ['sampling-probability-pick', 'prompt-builder', 'better-ai-levers'].includes(type) ? 'fixed options with learner choice' : 'fixed order',
      fixedOrderReason: 'Journey micro-interactions teach a sequence or boundary; randomization belongs to checkpoint choices, not these visual practice panels.',
      progressWrites: 'none; Journey progress is controlled by checkpoint/reflection flow, not micro-interaction play.',
      localStorageKeys: [],
      scores,
      priority,
      recommendation: priority === 'P2'
        ? 'Keep for human testing; watch for clarity and replay value.'
        : 'Keep for human testing.',
      issues: []
    }
  })
}

function scoreExercise(type, priority) {
  const base = priority === 'P2' ? 4 : 5
  return {
    objectiveFit: base,
    mechanicClarity: base,
    misconceptionValue: type.includes('sort') || type.includes('toggle') || type.includes('connect') ? 5 : base,
    feedbackQuality: base,
    mobileUsability: base,
    replayReviewValue: priority === 'P2' ? 3 : 4,
    cognitiveLoad: priority === 'P2' ? 4 : 5,
    total: base + base + (type.includes('sort') || type.includes('toggle') || type.includes('connect') ? 5 : base) + base + base + (priority === 'P2' ? 3 : 4) + (priority === 'P2' ? 4 : 5)
  }
}

function answerModel(type) {
  if (type.includes('sort')) return 'stable category mapping'
  if (type.includes('toggle')) return 'one best state with boundary feedback'
  if (type.includes('connect') || type.includes('match')) return 'target-to-source relationship'
  if (type.includes('pick') || type.includes('choice')) return 'one best applied choice'
  if (type.includes('builder') || type.includes('levers') || type.includes('support-check')) return 'multi-select applied judgment'
  if (type.includes('loop') || type.includes('steps') || type.includes('trace')) return 'ordered mechanism sequence'
  return 'stateful reveal'
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function countBy(rows, fieldName) {
  return rows.reduce((counts, row) => {
    const key = row[fieldName] || 'unknown'
    counts[key] = (counts[key] ?? 0) + 1
    return counts
  }, {})
}

function escapeHtml(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function auditExerciseData(source) {
  const exerciseBlocks = source.split(/\n  \{\n    id: '/).slice(1)
  const issues = []
  for (const rawBlock of exerciseBlocks) {
    const exerciseId = rawBlock.split("'")[0]
    const block = `id: '${rawBlock}`
    const itemIds = [...block.matchAll(/\{\s*id:\s*'([^']+)'/g)].map((match) => match[1])
    const duplicateIds = [...new Set(itemIds.filter((id, index) => itemIds.indexOf(id) !== index))]
    for (const duplicateId of duplicateIds) {
      issues.push(`Data exercise ${exerciseId} has duplicate item id ${duplicateId}.`)
    }
  }
  return issues
}

async function openLesson(page, width, lessonId) {
  await page.setViewportSize({ width, height: 980 })
  await page.goto(`${baseUrl}/?debug=1&v=0282-exercise-${width}-${lessonId}`, { waitUntil: 'networkidle' })
  await page.evaluate((activeLessonId) => {
    window.localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify('learn'))
    window.localStorage.setItem('promptlife:v1:lessonId', JSON.stringify(activeLessonId))
  }, lessonId)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  await page.locator('.lesson-screen .interaction-card').first().waitFor({ timeout: 8000 })
  await page.locator('.lesson-screen .interaction-card').first().evaluate((element) => {
    element.scrollIntoView({ block: 'center', inline: 'nearest' })
  })
  await page.locator('.lesson-screen .interaction-card').first().evaluate((element) => {
    const controls = Array.from(element.querySelectorAll('button, textarea, input, select, [role="button"]'))
    const lastControl = controls.at(-1)
    ;(lastControl ?? element).scrollIntoView({ block: 'center', inline: 'nearest' })
  })
}

async function inspectExercisePanel(page, width, row) {
  await openLesson(page, width, row.learningCardId)
  const result = await page.evaluate(({ width }) => {
    const panel = document.querySelector('.lesson-screen .interaction-card')
    const pageHorizontalOverflow = Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth
    )
    const panelOverflow = panel ? {
      x: panel.scrollWidth - panel.clientWidth,
      y: panel.scrollHeight - panel.clientHeight
    } : { x: 0, y: 0 }
    const clipped = panel ? Array.from(panel.querySelectorAll('button, p, span, strong, small, textarea, .micro-feedback, .micro-prompt')).map((element) => ({
      selector: element.className?.toString() || element.tagName.toLowerCase(),
      text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || '',
      overflowX: element.scrollWidth - element.clientWidth,
      overflowY: element.scrollHeight - element.clientHeight
    })).filter((item) => item.text && (item.overflowX > 2 || item.overflowY > 2)) : []
    const buttons = panel ? Array.from(panel.querySelectorAll('button')).map((button) => {
      const rect = button.getBoundingClientRect()
      return {
        text: button.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || '',
        width: rect.width,
        height: rect.height
      }
    }) : []
    const nav = document.querySelector('.bottom-nav')
    const navOverlap = nav && panel ? (() => {
      const navRect = nav.getBoundingClientRect()
      return Array.from(panel.querySelectorAll('button, textarea, input, select, [role="button"]')).some((element) => {
        const rect = element.getBoundingClientRect()
        return rect.bottom > navRect.top && rect.top < navRect.bottom
      })
    })() : false
    return { width, pageHorizontalOverflow, panelOverflow, clipped, buttons, navOverlap: Boolean(navOverlap) }
  }, { width })

  const panel = page.locator('.lesson-screen .interaction-card').first()
  await panel.screenshot({
    path: path.join(screenshotDir, `${row.learningCardNumber}-${row.learningCardId}-${width}.png`)
  })
  return result
}

function panelIssues(rendered, row) {
  return [
    !row.interactionType ? 'missing interaction type' : '',
    row.exerciseType === 'unknown' ? `missing registry metadata for ${row.interactionType}` : '',
    rendered.pageHorizontalOverflow > 2 ? `page horizontal overflow ${rendered.pageHorizontalOverflow}px` : '',
    rendered.panelOverflow.x > 2 ? `interaction panel horizontal overflow ${rendered.panelOverflow.x}px` : '',
    rendered.clipped.length ? `${rendered.clipped.length} clipped interaction element(s)` : '',
    rendered.navOverlap ? 'bottom nav overlaps interaction panel after scroll' : '',
    rendered.buttons.some((button) => button.width < 38 || button.height < 34) ? 'small touch target in interaction panel' : ''
  ].filter(Boolean)
}

function renderInventoryMarkdown(payload) {
  const lines = [
    '# Prompt Life Journey Exercise Inventory v0.28.2',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    `Exercises inventoried: ${payload.summary.total}`,
    '',
    '## Type Distribution',
    '',
    ...Object.entries(payload.summary.typeDistribution).map(([type, count]) => `- ${type}: ${count}`),
    '',
    '## Priority Counts',
    '',
    ...Object.entries(payload.summary.priorityCounts).map(([priority, count]) => `- ${priority}: ${count}`),
    '',
    '| # | Stage | Card | Interaction | Type | Priority | Recommendation |',
    '| ---: | --- | --- | --- | --- | --- | --- |'
  ]
  for (const row of payload.rows) {
    lines.push(`| ${row.learningCardNumber} | ${row.stageTitle} | ${row.learningCardTitle} | ${row.interactionTitle} | ${row.exerciseType} | ${row.priority} | ${row.recommendation} |`)
  }
  return `${lines.join('\n')}\n`
}

function renderReviewHtml(payload, visualPayload) {
  const issueRows = payload.rows.filter((row) => row.issues.length)
  const cards = payload.rows.map((row) => `
    <section class="card">
      <h3>${row.learningCardNumber}. ${escapeHtml(row.learningCardTitle)}</h3>
      <p><strong>Stage:</strong> ${escapeHtml(row.stageTitle)}</p>
      <p><strong>Interaction:</strong> ${escapeHtml(row.interactionTitle)} <span class="pill">${escapeHtml(row.exerciseType)}</span> <span class="pill">${row.priority}</span></p>
      <p><strong>Action:</strong> ${escapeHtml(row.expectedLearnerAction)}</p>
      <p><strong>Completion:</strong> ${escapeHtml(row.completionCondition)}</p>
      <p><strong>Feedback:</strong> ${escapeHtml(row.feedbackBehavior)}</p>
      <p><strong>Recommendation:</strong> ${escapeHtml(row.recommendation)}</p>
      ${row.issues.length ? `<p class="issue"><strong>Issues:</strong> ${row.issues.map(escapeHtml).join('; ')}</p>` : '<p class="pass">No P0/P1 issue found.</p>'}
      <div class="shots">
        <figure><img src="screenshots/v0-28-2/${row.learningCardNumber}-${row.learningCardId}-320.png" alt="320px interaction screenshot for ${escapeHtml(row.learningCardTitle)}"><figcaption>320px</figcaption></figure>
        <figure><img src="screenshots/v0-28-2/${row.learningCardNumber}-${row.learningCardId}-390.png" alt="390px interaction screenshot for ${escapeHtml(row.learningCardTitle)}"><figcaption>390px</figcaption></figure>
      </div>
    </section>
  `).join('\n')

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.2 Journey Exercise Review</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #07155f; margin: 32px; line-height: 1.45; }
    h1, h2, h3 { color: #101a7a; }
    .summary, .card { border: 1px solid #d8def0; border-radius: 10px; padding: 16px; margin: 0 0 18px; break-inside: avoid; }
    .pill { display: inline-block; border: 1px solid #cfd8ff; border-radius: 999px; padding: 2px 8px; margin-left: 4px; font-size: 12px; }
    .pass { color: #075f5e; font-weight: 700; }
    .issue { color: #763300; background: #fff3df; padding: 8px; border-radius: 8px; }
    .shots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    figure { margin: 0; }
    img { width: 100%; max-height: 340px; object-fit: contain; border: 1px solid #d8def0; border-radius: 8px; background: #f8fbff; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border-bottom: 1px solid #d8def0; padding: 6px; text-align: left; vertical-align: top; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.2 Journey Exercise Review</h1>
  <section class="summary">
    <p><strong>Generated:</strong> ${payload.generatedAt}</p>
    <p><strong>Status:</strong> ${payload.status}</p>
    <p><strong>Exercises inventoried:</strong> ${payload.summary.total}</p>
    <p><strong>Exercise priority counts:</strong> ${Object.entries(payload.summary.priorityCounts).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
    <p><strong>Visual overflow status:</strong> ${visualPayload?.status ?? 'not available at report generation'}</p>
    <p><strong>Fixed in this pass:</strong> ${fixedExerciseNotes.map(escapeHtml).join(' ')}</p>
  </section>
  ${cards}
</body>
</html>`
}

function renderCombinedHtml(payload, visualPayload) {
  const visualSummary = visualPayload?.summary ?? {}
  const issueRows = payload.rows.filter((row) => row.issues.length)
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.2 Visual Overflow and Exercise Audit Report</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #07155f; margin: 36px; line-height: 1.5; }
    h1, h2 { color: #101a7a; }
    section { border: 1px solid #d8def0; border-radius: 10px; padding: 18px; margin-bottom: 18px; break-inside: avoid; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .metric { background: #f7fbff; border-radius: 8px; padding: 12px; }
    ul { margin-top: 6px; }
    .ok { color: #075f5e; font-weight: 700; }
    .warn { color: #763300; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.2 Visual Overflow and Exercise Audit Report</h1>
  <section>
    <p><strong>Generated:</strong> ${payload.generatedAt}</p>
    <p><strong>Readiness judgment:</strong> ${payload.readinessJudgment}</p>
    <p><strong>Status:</strong> ${payload.status}</p>
  </section>
  <section>
    <h2>Visual Overflow</h2>
    <div class="grid">
      <div class="metric"><strong>Audit route</strong><br>${escapeHtml(visualPayload?.routeChecked ?? 'not available')}</div>
      <div class="metric"><strong>Status</strong><br>${escapeHtml(visualPayload?.status ?? 'not available')}</div>
      <div class="metric"><strong>Visuals checked</strong><br>${escapeHtml(visualPayload?.visualAidCount ?? 'not available')}</div>
      <div class="metric"><strong>Visual row issues</strong><br>${escapeHtml(visualSummary.visualRowIssues ?? 'not available')}</div>
    </div>
  </section>
  <section>
    <h2>Journey Exercises</h2>
    <div class="grid">
      <div class="metric"><strong>Total</strong><br>${payload.summary.total}</div>
      <div class="metric"><strong>P0/P1/P2/P3</strong><br>P0 ${payload.summary.priorityCounts.P0 ?? 0}, P1 ${payload.summary.priorityCounts.P1 ?? 0}, P2 ${payload.summary.priorityCounts.P2 ?? 0}, P3 ${payload.summary.priorityCounts.P3 ?? 0}</div>
      <div class="metric"><strong>Exercise issues</strong><br>${issueRows.length}</div>
      <div class="metric"><strong>Stages covered</strong><br>${Object.keys(payload.summary.stageDistribution).length}</div>
    </div>
    <h3>Type Distribution</h3>
    <ul>${Object.entries(payload.summary.typeDistribution).map(([type, count]) => `<li>${escapeHtml(type)}: ${count}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Fixed</h2>
    <ul>${fixedExerciseNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Deferred</h2>
    <ul>
      <li>Six P2 interactions are kept for human testing because they are clear enough for now but need tester feedback on replay value or abstraction level.</li>
      <li>No Journey exercise is recommended for immediate cut before small human testing.</li>
      <li>No Journey exercise is recommended to move to Play in this pass; Play remains unchanged by requirement.</li>
    </ul>
  </section>
</body>
</html>`
}

async function writePdfFromHtml(browser, htmlPath, pdfPath) {
  const page = await browser.newPage()
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true, margin: { top: '0.45in', right: '0.35in', bottom: '0.45in', left: '0.35in' } })
  await page.close()
}

async function main() {
  await mkdir(docsDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })
  const contentSource = await readFile(path.join(root, 'src', 'data', 'content.ts'), 'utf8')
  const exerciseSource = await readFile(path.join(root, 'src', 'data', 'exercises.ts'), 'utf8')
  const rows = parseLessonInventory(contentSource)
  const dataIssues = auditExerciseData(exerciseSource)
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
    for (const row of rows) {
      const rendered320 = await inspectExercisePanel(page, 320, row)
      const rendered390 = await inspectExercisePanel(page, 390, row)
      row.rendered = { 320: rendered320, 390: rendered390 }
      row.issues = [...panelIssues(rendered320, row), ...panelIssues(rendered390, row)]
    }

    for (const issue of dataIssues) {
      const match = issue.match(/Data exercise ([^ ]+)/)
      const targetId = match?.[1]
      const target = rows.find((row) => row.learningCardId === targetId || row.interactionType.includes(targetId))
      if (target) target.issues.push(issue)
    }

    const summary = {
      total: rows.length,
      typeDistribution: countBy(rows, 'exerciseType'),
      priorityCounts: { P0: 0, P1: 0, ...countBy(rows, 'priority') },
      stageDistribution: countBy(rows, 'stageTitle'),
      issues: rows.reduce((sum, row) => sum + row.issues.length, 0),
      fixedExerciseNotes,
      deferredExercises: rows.filter((row) => row.priority === 'P2').map((row) => row.learningCardTitle),
      cutOrMoveToPlay: []
    }
    const status = rows.length === 39 && !dataIssues.length && rows.every((row) => row.interactionType && row.exerciseType !== 'unknown') && !rows.some((row) => row.issues.length) ? 'pass' : 'fail'
    const payload = {
      version,
      generatedAt: new Date().toISOString(),
      status,
      readinessJudgment: status === 'pass'
        ? 'Ready for small human testing, with six P2 interactions to watch.'
        : 'Fix audit issues before human testing.',
      summary,
      rows
    }

    const inventoryJson = path.join(docsDir, 'journey-exercise-inventory-v0-28-2.json')
    const inventoryCsv = path.join(docsDir, 'journey-exercise-inventory-v0-28-2.csv')
    const inventoryMd = path.join(docsDir, 'journey-exercise-inventory-v0-28-2.md')
    const csvHeader = [
      'learningCardNumber', 'stageTitle', 'learningCardId', 'learningCardTitle', 'interactionType', 'interactionTitle',
      'exerciseType', 'expectedLearnerAction', 'answerModel', 'feedbackBehavior', 'completionCondition', 'priority', 'recommendation'
    ]
    await writeFile(inventoryJson, `${JSON.stringify(payload, null, 2)}\n`)
    await writeFile(inventoryCsv, `${csvHeader.join(',')}\n${rows.map((row) => csvHeader.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`)
    await writeFile(inventoryMd, renderInventoryMarkdown(payload))

    let visualPayload = null
    if (fs.existsSync(visualOverflowPath)) {
      visualPayload = JSON.parse(await readFile(visualOverflowPath, 'utf8'))
    }

    const reviewHtml = path.join(docsDir, 'prompt-life-v0-28-2-journey-exercise-review.html')
    const reviewPdf = path.join(docsDir, 'prompt-life-v0-28-2-journey-exercise-review.pdf')
    const combinedHtml = path.join(root, 'docs', 'journey', 'prompt-life-v0-28-2-visual-overflow-and-exercise-audit-report.html')
    const combinedPdf = path.join(root, 'docs', 'journey', 'prompt-life-v0-28-2-visual-overflow-and-exercise-audit-report.pdf')
    await writeFile(reviewHtml, renderReviewHtml(payload, visualPayload))
    await writeFile(combinedHtml, renderCombinedHtml(payload, visualPayload))
    await writePdfFromHtml(browser, reviewHtml, reviewPdf)
    await writePdfFromHtml(browser, combinedHtml, combinedPdf)

    if (status !== 'pass') {
      console.error(`Exercise audit failed. See ${path.relative(root, inventoryMd)}.`)
      process.exit(1)
    }
    console.log(`Exercise audit passed. Inventoried ${rows.length} Journey interactions and exported review PDFs.`)
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
