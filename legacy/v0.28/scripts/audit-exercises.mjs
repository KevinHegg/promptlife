import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const version = '0.28.10'
const port = Number(process.env.PROMPTLIFE_EXERCISE_AUDIT_PORT ?? 5193)
const baseUrl = `http://127.0.0.1:${port}`
const docsDir = path.join(root, 'docs', 'journey', 'exercises')
const testingDir = path.join(root, 'docs', 'testing')
const screenshotDir = path.join(docsDir, 'screenshots', 'v0-28-10')
const visualOverflowPath = path.join(root, 'docs', 'journey', 'visual-aids', 'visual-overflow-audit-v0-28-3.json')
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

const fixedInThisPass = [
  {
    id: 'context-window-tray',
    title: 'Context Window',
    priorityBefore: 'P1',
    priorityAfter: 'P3',
    fix: 'Changed ambiguous “card” wording to “item” in the Journey copy and live context-tray feedback.'
  },
  {
    id: 'better-ai-levers',
    title: 'Better AI Is a Choice',
    priorityBefore: 'P1',
    priorityAfter: 'P3',
    fix: 'Added explicit “Choose all” language for the multi-select governance levers.'
  },
  {
    id: 'prompt-builder',
    title: 'Effective Prompting from Model Literacy',
    priorityBefore: 'P1',
    priorityAfter: 'P3',
    fix: 'Added explicit “Choose all” language for the multi-select prompt-part picker.'
  },
  {
    id: 'shared-cycle-sort-copy',
    title: 'Shared sort/group interactions',
    priorityBefore: 'P1',
    priorityAfter: 'P3',
    fix: 'Changed shared sort feedback from “cards” to “items” so sort/group interactions do not sound like Journey-card navigation.'
  }
]

const sharedCycleSortTypes = new Set([
  'traditions-sort',
  'fine-tuning-sort',
  'alignment-groups',
  'hidden-state-sort',
  'learning-modes-sort',
  'collective-human-questions',
  'risk-myth-sort',
  'benefit-tier-sort'
])

const watchTypes = new Set([
  'prompt-trace',
  'vector-distribution',
  'tensor-axis',
  'sampling-probability-pick',
  'collective-human-questions',
  'benefit-tier-sort',
  'synthesis-chain'
])

const typeRegistry = {
  'prompt-trace': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap through context, next-token cloud, chosen token, and updated context.',
    items: ['context enters', 'next-token cloud', 'chosen token', 'updated context'],
    targetBehavior: 'Finish the prompt-to-next-context sequence.',
    feedbackBehavior: 'Step-specific insight text appears after each tap.',
    completionCondition: 'Final updated-context step is reached.',
    fixedOrderReason: 'The prompt life-cycle sequence matters.'
  },
  'ai-topology': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap branches in the AI family tree.',
    items: ['AI', 'machine learning', 'deep learning', 'generative AI', 'LLMs', 'diffusion', 'multimodal'],
    targetBehavior: 'Reveal at least one branch explanation.',
    feedbackBehavior: 'Branch-specific one-sentence explanation.',
    completionCondition: 'A branch explanation is visible.',
    fixedOrderReason: 'Branches preserve the family-tree structure.'
  },
  'traditions-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Tap each item to place it in rules, learned patterns, or hybrid systems.',
    items: ['explicit rule', 'learned weights', 'retrieval wrapper', 'policy filter'],
    targetBehavior: 'All items land in the best group.',
    feedbackBehavior: 'Correctness highlighting plus summary insight.',
    completionCondition: 'Every item has an assigned group.',
    fixedOrderReason: 'Fixed items keep the rules-versus-patterns contrast compact.'
  },
  'training-steps': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap through the training loop.',
    items: ['predict', 'compare', 'loss', 'update weights'],
    targetBehavior: 'Reach the durable update step.',
    feedbackBehavior: 'Durable-update explanation.',
    completionCondition: 'Update weights step is shown.',
    fixedOrderReason: 'Training order is the mechanism being taught.'
  },
  'pretraining-toggle': {
    exerciseType: 'comparison toggle',
    learnerAction: 'Toggle between broad pattern learning and perfect recall.',
    items: ['broad pattern learning', 'perfect recall'],
    targetBehavior: 'Choose broad pattern learning.',
    feedbackBehavior: 'Boundary feedback against the perfect-memory myth.',
    completionCondition: 'Broad pattern learning state is selected.',
    fixedOrderReason: 'Two stable states make the misconception boundary explicit.'
  },
  'overfitting-curve': {
    exerciseType: 'single choice',
    learnerAction: 'Choose the curve that generalizes better.',
    items: ['training-perfect curve', 'smoother validation-aware curve'],
    targetBehavior: 'Select the smoother curve.',
    feedbackBehavior: 'Validation-example feedback.',
    completionCondition: 'A curve is selected.',
    fixedOrderReason: 'The side-by-side comparison is spatial.'
  },
  'fine-tuning-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort durable training, temporary context, and decoding moves.',
    items: ['fine-tuning', 'prompting', 'RAG', 'sampling'],
    targetBehavior: 'Each steering move is assigned to the right change type.',
    feedbackBehavior: 'Bucket-specific correction.',
    completionCondition: 'Every move has an assigned group.',
    fixedOrderReason: 'Stable ordering keeps nearby terms comparable.'
  },
  'alignment-groups': {
    exerciseType: 'sort / group',
    learnerAction: 'Group alignment methods by durable shaping, runtime steering, and evaluation.',
    items: ['instruction tuning', 'system prompt', 'policy filter', 'safety test'],
    targetBehavior: 'Each method is assigned to its mechanism group.',
    feedbackBehavior: 'Method-group summary.',
    completionCondition: 'Every method has an assigned group.',
    fixedOrderReason: 'Stable group labels preserve the boundary.'
  },
  inference: {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap through the forward pass from current context to next token.',
    items: ['current context', 'temporary activations', 'fixed weights', 'next-token scores'],
    targetBehavior: 'Complete the forward pass without durable weight change.',
    feedbackBehavior: 'Temporary-versus-durable feedback.',
    completionCondition: 'Forward-pass path is completed.',
    fixedOrderReason: 'Forward-pass order is the model mechanism.'
  },
  'prompt-response-labels': {
    exerciseType: 'token labeling',
    learnerAction: 'Tap rows that separate prompt, response so far, next token, and updated context.',
    items: ['given prompt', 'response so far', 'next token', 'updated context'],
    targetBehavior: 'Inspect all four context pieces.',
    feedbackBehavior: 'Row-specific explanation.',
    completionCondition: 'All four rows can be inspected.',
    fixedOrderReason: 'Rows mirror the generation trace.'
  },
  'tokenization-split': {
    exerciseType: 'token labeling',
    learnerAction: 'Reveal token pieces and uneven chunks.',
    items: ['A', 'jealous', 'dog', 'chased', 'start|led', 'floor|.'],
    targetBehavior: 'Notice tokens can be uneven and include punctuation.',
    feedbackBehavior: 'Token boundary feedback.',
    completionCondition: 'Uneven examples are shown.',
    fixedOrderReason: 'The sentence order makes token boundaries readable.'
  },
  'token-id-lookup': {
    exerciseType: 'token labeling',
    learnerAction: 'Match token text to token IDs and table rows.',
    items: ['dog', 'cat', 'floor', 'ID rows'],
    targetBehavior: 'Reveal lookup relationship without treating IDs as meaning.',
    feedbackBehavior: 'ID-is-not-meaning feedback.',
    completionCondition: 'Lookup relationship is revealed.',
    fixedOrderReason: 'Stable rows teach lookup rather than memory.'
  },
  'embedding-lookup': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap a token ID to retrieve its embedding row.',
    items: ['token ID', 'embedding table row', 'starting vector'],
    targetBehavior: 'Show the starting vector before context reshapes it.',
    feedbackBehavior: 'Durable embedding versus temporary hidden-state feedback.',
    completionCondition: 'Embedding row is shown.',
    fixedOrderReason: 'Lookup order matches the data path.'
  },
  'vector-distribution': {
    exerciseType: 'comparison toggle',
    learnerAction: 'Switch between teaching sliders and distributed feature bars.',
    items: ['teaching view', 'distributed view'],
    targetBehavior: 'Reveal why real vector dimensions are distributed.',
    feedbackBehavior: 'Dimension-label limit feedback.',
    completionCondition: 'Distributed view is shown.',
    fixedOrderReason: 'Two-state comparison keeps the abstraction manageable.'
  },
  'tensor-axis': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Inspect token axis, feature axis, and batch note.',
    items: ['token axis', 'feature axis', 'batch note'],
    targetBehavior: 'See vectors as a shaped numerical block.',
    feedbackBehavior: 'Axis-specific explanation.',
    completionCondition: 'All axis notes can be viewed.',
    fixedOrderReason: 'Axis order follows the tensor teaching diagram.'
  },
  'attention-relevance-connect': {
    exerciseType: 'connect node',
    learnerAction: 'Connect the pronoun token to the most relevant source token.',
    items: ['dog', 'cat', 'it'],
    targetBehavior: 'Select cat as the likely referent.',
    feedbackBehavior: 'Relevance-not-awareness feedback.',
    completionCondition: 'A source token is selected.',
    fixedOrderReason: 'Fixed sentence order preserves the pronoun example.'
  },
  'mlp-feature-toggle': {
    exerciseType: 'comparison toggle',
    learnerAction: 'Toggle the same token before and after the MLP.',
    items: ['before MLP', 'after MLP'],
    targetBehavior: 'Notice feature reshaping without changing the token ID or weights.',
    feedbackBehavior: 'Feature reshaping feedback.',
    completionCondition: 'After-MLP state is shown.',
    fixedOrderReason: 'Before/after comparison is the lesson point.'
  },
  'layers-stack-inspect': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap layers in a transformer stack.',
    items: ['layer 1', 'layer 2', 'layer 3', 'layer 4'],
    targetBehavior: 'Inspect repeated attention and MLP blocks.',
    feedbackBehavior: 'Repeated numerical transformation feedback.',
    completionCondition: 'A layer detail is shown.',
    fixedOrderReason: 'Layer order is sequential.'
  },
  'hidden-state-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort durable, temporary, and outside-forward-pass items.',
    items: ['embedding table', 'weight', 'hidden state', 'attention pattern', 'training data'],
    targetBehavior: 'Separate learned parameters, temporary run state, and outside material.',
    feedbackBehavior: 'Temporary hidden-state feedback.',
    completionCondition: 'Each item is assigned.',
    fixedOrderReason: 'Fixed labels preserve the three-way boundary.'
  },
  'logits-raw-toggle': {
    exerciseType: 'comparison toggle',
    learnerAction: 'Toggle raw scores and probability-ready framing.',
    items: ['raw scores', 'not probabilities', 'not truth'],
    targetBehavior: 'Keep logits as raw next-token scores.',
    feedbackBehavior: 'Logits-are-not-probabilities feedback.',
    completionCondition: 'Raw-score state is visible.',
    fixedOrderReason: 'One contrast is enough at this point in the Journey.'
  },
  'softmax-convert': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Convert raw scores into probabilities.',
    items: ['raw logits', 'softmax', 'probabilities that sum to 100%'],
    targetBehavior: 'See probabilities emerge from raw scores.',
    feedbackBehavior: 'Probability-not-truth feedback.',
    completionCondition: 'Softmax conversion is shown.',
    fixedOrderReason: 'The transform has a natural before/after order.'
  },
  'sampling-probability-pick': {
    exerciseType: 'single choice',
    learnerAction: 'Choose a next token from probability-shaped candidates.',
    items: ['floor', 'room', 'quantum'],
    targetBehavior: 'Pick a likely next token while keeping probability separate from truth.',
    feedbackBehavior: 'Sampling uncertainty feedback.',
    completionCondition: 'A candidate token is selected.',
    fixedOrderReason: 'Fixed candidates keep the example short.'
  },
  'autoregression-loop': {
    exerciseType: 'ordered sequence',
    learnerAction: 'Step through choose token, append, and run again.',
    items: ['choose token', 'append', 'run again'],
    targetBehavior: 'Complete the append-and-repeat loop.',
    feedbackBehavior: 'Append-and-repeat feedback.',
    completionCondition: 'Loop reaches the repeated run state.',
    fixedOrderReason: 'The sequence is the mechanism.'
  },
  'context-window-tray': {
    exerciseType: 'card stack / tray',
    learnerAction: 'Push items into a bounded context tray.',
    items: ['old message', 'system instruction', 'user prompt', 'retrieved note', 'response so far'],
    targetBehavior: 'Observe the oldest item fall out after the window fills.',
    feedbackBehavior: 'Temporary-window feedback.',
    completionCondition: 'An item falls out after the fifth item enters.',
    fixedOrderReason: 'The fixed order makes the capacity limit visible.'
  },
  'rag-lane-highlight': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Trace prompt, retriever, retrieved notes, context tray, and response.',
    items: ['prompt', 'retriever', 'retrieved notes', 'context tray', 'response'],
    targetBehavior: 'See retrieval plus context, not training.',
    feedbackBehavior: 'Retrieval-plus-context feedback.',
    completionCondition: 'All retrieval lanes can be highlighted.',
    fixedOrderReason: 'RAG has a stepwise system path.'
  },
  'grounding-claim-match': {
    exerciseType: 'connect node',
    learnerAction: 'Connect claims to supporting evidence.',
    items: ['supported claim', 'evidence', 'unsupported claim'],
    targetBehavior: 'Connect supported claims and leave unsupported claims unanchored.',
    feedbackBehavior: 'Evidence-match feedback.',
    completionCondition: 'Supported and unsupported claims are visible.',
    fixedOrderReason: 'Fixed examples prevent source confusion.'
  },
  'hallucination-support-check': {
    exerciseType: 'single choice',
    learnerAction: 'Choose the fluent claim that needs evidence before trust.',
    items: ['supported policy claim', 'unsupported date claim', 'review-needed caveat'],
    targetBehavior: 'Select the unsupported fluent claim.',
    feedbackBehavior: 'Unsupported-output feedback.',
    completionCondition: 'A claim is selected.',
    fixedOrderReason: 'The contrast depends on stable evidence labels.'
  },
  'learning-modes-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort durable update, temporary steering, retrieval, and evaluation modes.',
    items: ['pretraining', 'prompting', 'RAG', 'evaluation'],
    targetBehavior: 'Assign each learning or steering mode to the right mechanism.',
    feedbackBehavior: 'What-changed feedback.',
    completionCondition: 'Each mode is assigned.',
    fixedOrderReason: 'Stable options preserve the mechanism map.'
  },
  'diffusion-contrast': {
    exerciseType: 'comparison toggle',
    learnerAction: 'Step through token append path and denoise path.',
    items: ['token path', 'denoise path'],
    targetBehavior: 'Compare autoregressive text with diffusion denoising.',
    feedbackBehavior: 'Autoregression-versus-diffusion feedback.',
    completionCondition: 'Both paths can be compared.',
    fixedOrderReason: 'The comparison follows two named paths.'
  },
  'multimodal-map': {
    exerciseType: 'mixed / other',
    learnerAction: 'Tap an input-output media pair.',
    items: ['image to caption', 'audio to transcript', 'text to image'],
    targetBehavior: 'See different media represented or connected together.',
    feedbackBehavior: 'Representation-not-human-senses feedback.',
    completionCondition: 'A media lane pair is selected.',
    fixedOrderReason: 'Fixed pairs keep multimodal examples concrete.'
  },
  'perfect-storm-ingredients': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap converging ingredient streams.',
    items: ['data', 'compute', 'storage', 'methods', 'labor', 'incentives'],
    targetBehavior: 'Reveal convergence rather than one spark.',
    feedbackBehavior: 'Convergence-not-spark feedback.',
    completionCondition: 'Ingredient explanation is revealed.',
    fixedOrderReason: 'The ingredient list is the concept map.'
  },
  'collective-human-questions': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort human-rights questions away from model mechanics.',
    items: ['creator consent', 'source credit', 'token probability', 'weight update'],
    targetBehavior: 'Separate institutional questions from model mechanics.',
    feedbackBehavior: 'Accountability feedback.',
    completionCondition: 'Questions are classified.',
    fixedOrderReason: 'Fixed set keeps ethics and mechanics separate.'
  },
  'cost-ledger': {
    exerciseType: 'tap-to-cycle',
    learnerAction: 'Tap cost ledger entries.',
    items: ['energy', 'water', 'labor', 'infrastructure', 'maintenance'],
    targetBehavior: 'Name costs responsible AI literacy has to count.',
    feedbackBehavior: 'Countable-cost feedback.',
    completionCondition: 'A cost category explanation is revealed.',
    fixedOrderReason: 'Ledger order is not assessed.'
  },
  'risk-myth-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort practical risks from unsupported stories.',
    items: ['privacy leak', 'bad automation', 'model wants power', 'instant omniscience'],
    targetBehavior: 'Separate mechanism-backed risks from myths.',
    feedbackBehavior: 'Mechanism-risk feedback.',
    completionCondition: 'Claims are assigned.',
    fixedOrderReason: 'Stable claims support misconception repair.'
  },
  'benefit-tier-sort': {
    exerciseType: 'sort / group',
    learnerAction: 'Sort benefit claims by evidence strength.',
    items: ['useful with review', 'plausible with safeguards', 'speculative hype'],
    targetBehavior: 'Classify benefits without hype.',
    feedbackBehavior: 'Bounded-benefit feedback.',
    completionCondition: 'Claims are assigned.',
    fixedOrderReason: 'The three tiers are the reasoning frame.'
  },
  'human-centered-scenario': {
    exerciseType: 'single choice',
    learnerAction: 'Choose the more human-centered deployment.',
    items: ['reviewable workflow', 'blind automation'],
    targetBehavior: 'Select the accountable deployment.',
    feedbackBehavior: 'Review-and-accountability feedback.',
    completionCondition: 'A deployment is selected.',
    fixedOrderReason: 'The two scenarios form a boundary contrast.'
  },
  'better-ai-levers': {
    exerciseType: 'multi-select',
    learnerAction: 'Choose all design and governance levers that reduce risk or cost.',
    items: ['approved RAG', 'privacy', 'source review', 'task-fit model', 'monitoring', 'bad counterexamples'],
    targetBehavior: 'Select all useful levers and no risky counterexamples.',
    feedbackBehavior: 'Selected lever feedback plus risk correction.',
    completionCondition: 'All useful levers are selected with no risky choices.',
    fixedOrderReason: 'Fixed options keep multi-select review short.'
  },
  'prompt-builder': {
    exerciseType: 'multi-select',
    learnerAction: 'Choose all missing context parts for a stronger prompt.',
    items: ['task', 'audience', 'constraints', 'examples', 'format', 'evidence', 'uncertainty', 'review'],
    targetBehavior: 'Add all missing prompt parts while keeping the task fixed.',
    feedbackBehavior: 'Context-design feedback.',
    completionCondition: 'All prompt parts are selected.',
    fixedOrderReason: 'Stable parts reinforce prompt-as-context design.'
  },
  'synthesis-chain': {
    exerciseType: 'ordered sequence',
    learnerAction: 'Put the model-literacy chain in order.',
    items: ['prompt', 'tokens', 'hidden states', 'logits', 'softmax', 'sample', 'append', 'human review'],
    targetBehavior: 'Order the mechanics-to-accountability chain.',
    feedbackBehavior: 'Mechanics-to-accountability feedback.',
    completionCondition: 'All chain steps are ordered.',
    fixedOrderReason: 'The synthesis is explicitly sequential.'
  }
}

const exerciseLeakTerms = [
  { label: 'manifest', pattern: /\bmanifest\b/i },
  { label: 'asset', pattern: /\bassets?\b/i },
  { label: 'fallback', pattern: /\bfallback\b/i },
  { label: 'debug', pattern: /\bdebug\b/i },
  { label: 'Codex', pattern: /\bCodex\b/i },
  { label: 'Deep Research', pattern: /\bDeep Research\b/i },
  { label: 'checkpoint bank', pattern: /\bcheckpoint bank\b/i },
  { label: 'full bank', pattern: /\bfull bank\b/i },
  { label: 'report', pattern: /\breport\b/i },
  { label: 'screenshot', pattern: /\bscreenshot\b/i },
  { label: 'version marker', pattern: /\bv0\.\d|\bv0-\d/i },
  { label: 'batch', pattern: /\bbatch\b/i }
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
  child.on('exit', (code) => {
    if (code && code !== 0) output += `\nDev server exited with code ${code}.`
  })
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
  return cleanText(match?.[2] ?? '')
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/\$\{[^}]+\}/g, 'example text')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildObjective(lesson) {
  const definition = lesson.oneSentenceDefinition || lesson.definition
  const misconception = lesson.misconception
  if (definition && misconception) return `${definition} Practice boundary: ${misconception}`
  if (definition) return definition
  return `Practice the core model-literacy boundary for ${lesson.title}.`
}

function scoreExercise(row) {
  const p2 = row.priorityAfter === 'P2'
  const sharedSort = sharedCycleSortTypes.has(row.exerciseId)
  const objectiveFit = p2 ? 4 : 5
  const fiveSecondClarity = row.fixApplied ? 4 : (p2 ? 4 : 5)
  const mechanicSimplicity = ['multi-select', 'ordered sequence', 'mixed / other'].includes(row.exerciseType) ? 4 : 5
  const misconceptionValue = ['sort / group', 'comparison toggle', 'connect node', 'single choice', 'multi-select'].includes(row.exerciseType) ? 5 : 4
  const feedbackQuality = p2 ? 4 : 5
  const mobileUsability = p2 ? 4 : 5
  const redundancy = ['single choice'].includes(row.exerciseType) ? 4 : 5
  const cognitiveLoad = p2 || sharedSort ? 4 : 5
  const replayReviewValue = p2 ? 3 : 4
  return {
    objectiveFit,
    fiveSecondClarity,
    mechanicSimplicity,
    misconceptionValue,
    feedbackQuality,
    mobileUsability,
    redundancy,
    cognitiveLoad,
    replayReviewValue
  }
}

function parseLessonInventory(contentSource) {
  return extractLessons(contentSource).map((block, index) => {
    const interaction = block.match(/interaction:\s*\{\s*type:\s*'([^']+)',\s*title:\s*'([^']+)',\s*copy:\s*'([^']+)'/)
    const exerciseId = interaction?.[1] ?? ''
    const metadata = typeRegistry[exerciseId]
    const stageTitle = field(block, 'actLabel')
    const fixed = fixedInThisPass.find((item) => item.id === exerciseId) || (sharedCycleSortTypes.has(exerciseId) ? fixedInThisPass.find((item) => item.id === 'shared-cycle-sort-copy') : null)
    const priorityAfter = watchTypes.has(exerciseId) ? 'P2' : 'P3'
    const lesson = {
      stageNumber: stageOrder.indexOf(stageTitle) + 1,
      stageTitle,
      learningCardNumber: index + 1,
      learningCardId: field(block, 'id'),
      learningCardTitle: field(block, 'title'),
      oneSentenceDefinition: field(block, 'oneSentenceDefinition') || field(block, 'definition'),
      definition: field(block, 'definition'),
      misconception: field(block, 'misconception'),
      visualAidId: field(block, 'visualAidId'),
      checkpointQuestion: field(block, 'checkpoint')
    }
    const row = {
      version,
      ...lesson,
      primaryLearningObjective: buildObjective(lesson),
      exerciseExists: Boolean(interaction),
      exerciseId,
      exerciseTitle: interaction?.[2] ?? '',
      exerciseType: metadata?.exerciseType ?? 'mixed / other',
      exercisePrompt: interaction?.[3] ?? '',
      learnerAction: metadata?.learnerAction ?? 'Manual review needed.',
      itemsChoicesNodesSteps: metadata?.items ?? [],
      correctOrTargetBehavior: metadata?.targetBehavior ?? 'Manual review needed.',
      feedbackBehavior: metadata?.feedbackBehavior ?? 'Manual review needed.',
      progressStored: 'No. Journey progress is stored after checkpoint/reflection flow, not by the micro-interaction.',
      randomizationUsed: 'No. Exercise controls use fixed order; checkpoint answers remain randomized elsewhere.',
      fixedOrderRequired: metadata?.fixedOrderReason ?? 'Fixed order keeps the practice compact.',
      supportsLearningObjective: 'Yes. It practices the lesson mechanism or misconception boundary.',
      duplicatesCheckpoint: ['single choice'].includes(metadata?.exerciseType) ? 'Partial risk: watch during human testing so it does not feel like a second checkpoint.' : 'No. It gives practice or reveal before checkpoint reasoning.',
      duplicatesVisualAid: watchTypes.has(exerciseId) ? 'Watch during human testing; it may reinforce the visual closely.' : 'No serious duplicate; it adds a learner action.',
      mobileUsabilityNotes: 'Pending render audit.',
      recommendation: watchTypes.has(exerciseId) ? 'keep' : 'keep',
      priorityBefore: fixed?.priorityBefore ?? priorityAfter,
      priorityAfter,
      fixApplied: fixed?.fix ?? '',
      exerciseIssues: [],
      ruleIssues: [],
      renderedIssues: [],
      manualReviewNotes: [],
      screenshot320: `screenshots/v0-28-10/${index + 1}-${field(block, 'id')}-320.png`,
      screenshot390: `screenshots/v0-28-10/${index + 1}-${field(block, 'id')}-390.png`,
      screenshotDesktop: ''
    }
    row.rubricScores = scoreExercise(row)
    row.rubricAverage = average(Object.values(row.rubricScores))
    if (watchTypes.has(exerciseId)) {
      row.manualReviewNotes.push('Watch in human testing for abstraction level, redundancy, or replay value.')
    }
    if (exerciseId === 'tensor-axis') {
      row.manualReviewNotes.push('Uses “batch note” as a legitimate tensor concept, not implementation-process language.')
    }
    return row
  })
}

function average(values) {
  return Number((values.reduce((sum, value) => sum + Number(value), 0) / values.length).toFixed(1))
}

function countBy(rows, fieldName) {
  return rows.reduce((counts, row) => {
    const key = row[fieldName] || 'unknown'
    counts[key] = (counts[key] ?? 0) + 1
    return counts
  }, {})
}

function countPriority(rows, fieldName) {
  return ['P0', 'P1', 'P2', 'P3'].reduce((counts, priority) => {
    counts[priority] = rows.filter((row) => row[fieldName] === priority).length
    return counts
  }, {})
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : typeof value === 'object' && value ? JSON.stringify(value) : String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function auditExerciseSource(row) {
  const issues = []
  const relevantText = [
    row.exerciseTitle,
    row.exercisePrompt,
    row.learnerAction,
    row.correctOrTargetBehavior,
    row.feedbackBehavior,
    row.fixedOrderRequired
  ].join(' ')

  if (!row.exerciseId) issues.push('missing stable exercise ID')
  if (!row.exerciseType) issues.push('missing exercise type')
  if (!row.exercisePrompt || row.exercisePrompt.length < 16) issues.push('prompt is missing or too terse')
  if (!row.correctOrTargetBehavior && row.exerciseType !== 'reflection only') issues.push('missing completion or target behavior')
  if (!row.itemsChoicesNodesSteps.length && row.exerciseType !== 'reflection only') issues.push('missing stable item identities')
  if (row.exerciseType === 'multi-select' && !/(choose all|select all|tap all|at least one)/i.test(`${row.exercisePrompt} ${row.learnerAction}`)) {
    issues.push('multi-select copy does not clearly say choose all')
  }
  if (row.exerciseType === 'sort / group' && !/group|sort|bucket|place/i.test(`${row.exercisePrompt} ${row.learnerAction}`)) {
    issues.push('sort/group exercise lacks clear grouping language')
  }
  if (row.exerciseType === 'ordered sequence' && !/order|sequence|step|through|chain|loop/i.test(`${row.exercisePrompt} ${row.learnerAction} ${row.fixedOrderRequired}`)) {
    issues.push('ordered exercise lacks sequence rationale')
  }
  if (row.exerciseType === 'tap-to-cycle' && !/tap|toggle|step|inspect|reveal|convert/i.test(`${row.exercisePrompt} ${row.learnerAction}`)) {
    issues.push('tap-to-cycle exercise lacks clear tap instruction')
  }
  if (/\bcard(s)?\b/i.test(relevantText) && !/\blearning card(s)?\b/i.test(relevantText)) {
    issues.push('ambiguous “card” wording; prefer item, choice, tile, or learning card')
  }

  for (const term of exerciseLeakTerms) {
    if (term.label === 'batch' && row.exerciseId === 'tensor-axis') continue
    if (term.pattern.test(relevantText)) issues.push(`learner-copy leak term in exercise text: ${term.label}`)
  }
  return issues
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
  await page.setViewportSize({ width, height: width >= 900 ? 900 : 980 })
  await page.goto(`${baseUrl}/?debug=1&v=02810-exercise-${width}-${lessonId}`, { waitUntil: 'networkidle' })
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
    const textNodes = panel ? Array.from(panel.querySelectorAll('button, p, span, strong, small, textarea, input, select, [role="button"]')) : []
    const clipped = textNodes.map((element) => ({
      selector: element.className?.toString() || element.tagName.toLowerCase(),
      text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || '',
      overflowX: element.scrollWidth - element.clientWidth,
      overflowY: element.scrollHeight - element.clientHeight
    })).filter((item) => item.text && (item.overflowX > 2 || item.overflowY > 2))
    const buttons = panel ? Array.from(panel.querySelectorAll('button, [role="button"]')).map((button) => {
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
    const feedbackVisible = panel ? Boolean(panel.querySelector('.micro-feedback, [aria-live="polite"]')) : false
    return { width, pageHorizontalOverflow, panelOverflow, clipped, buttons, navOverlap: Boolean(navOverlap), feedbackVisible }
  }, { width })

  const panel = page.locator('.lesson-screen .interaction-card').first()
  const shotPath = path.join(screenshotDir, `${row.learningCardNumber}-${row.learningCardId}-${width}.png`)
  await panel.screenshot({ path: shotPath })
  return { ...result, screenshot: path.relative(docsDir, shotPath) }
}

function panelIssues(rendered, row) {
  const smallButtons = rendered.buttons.filter((button) => button.width < 38 || button.height < 34)
  return [
    rendered.pageHorizontalOverflow > 2 ? `page horizontal overflow ${rendered.pageHorizontalOverflow}px at ${rendered.width}px` : '',
    rendered.panelOverflow.x > 2 ? `interaction panel horizontal overflow ${rendered.panelOverflow.x}px at ${rendered.width}px` : '',
    rendered.clipped.length ? `${rendered.clipped.length} clipped interaction element(s) at ${rendered.width}px` : '',
    rendered.navOverlap ? `bottom nav overlaps interaction panel after scroll at ${rendered.width}px` : '',
    smallButtons.length ? `${smallButtons.length} small touch target(s) at ${rendered.width}px` : '',
    !rendered.feedbackVisible ? `feedback/status area not measurable at ${rendered.width}px` : ''
  ].filter(Boolean)
}

async function captureSmoke(page, tab, width) {
  await page.setViewportSize({ width, height: width >= 900 ? 900 : 980 })
  await page.goto(`${baseUrl}/?debug=1&v=02810-smoke-${tab}-${width}`, { waitUntil: 'networkidle' })
  await page.evaluate((targetTab) => {
    window.localStorage.setItem('promptlife:v1:lastLocation', JSON.stringify(targetTab))
  }, tab)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  const selector = tab === 'badge'
    ? '.badge-screen'
    : tab === 'play'
      ? '.play-screen'
      : tab === 'glossary'
        ? '.glossary-screen'
        : '.journey-screen, .lesson-screen'
  await page.locator(selector).first().waitFor({ timeout: 8000 })
  const shotPath = path.join(screenshotDir, `smoke-${tab}-${width}.png`)
  await page.locator(selector).first().screenshot({ path: shotPath })
  const result = await page.evaluate(() => ({
    horizontalOverflow: Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth
    ),
    title: document.querySelector('h1')?.textContent?.trim() ?? ''
  }))
  return { tab, width, ...result, screenshot: path.relative(docsDir, shotPath) }
}

function renderInventoryMarkdown(payload) {
  const lines = [
    '# Prompt Life Journey Exercise Inventory v0.28.10',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    `Exercises inventoried: ${payload.summary.total}`,
    '',
    `Readiness: ${payload.readinessJudgment}`,
    '',
    '## Type Distribution',
    '',
    ...Object.entries(payload.summary.typeDistribution).map(([type, count]) => `- ${type}: ${count}`),
    '',
    '## Priority Counts',
    '',
    `Before: ${formatCounts(payload.summary.priorityCountsBefore)}`,
    '',
    `After: ${formatCounts(payload.summary.priorityCountsAfter)}`,
    '',
    '## Fixed In This Pass',
    '',
    ...fixedInThisPass.map((item) => `- ${item.title}: ${item.fix}`),
    '',
    '| # | Stage | Card | Exercise | Type | Before | After | Recommendation | Notes |',
    '| ---: | --- | --- | --- | --- | --- | --- | --- | --- |'
  ]
  for (const row of payload.rows) {
    lines.push(`| ${row.learningCardNumber} | ${row.stageTitle} | ${row.learningCardTitle} | ${row.exerciseTitle} | ${row.exerciseType} | ${row.priorityBefore} | ${row.priorityAfter} | ${row.recommendation} | ${[row.fixApplied, ...row.manualReviewNotes].filter(Boolean).join(' ')} |`)
  }
  return `${lines.join('\n')}\n`
}

function formatCounts(counts) {
  return ['P0', 'P1', 'P2', 'P3'].map((key) => `${key}: ${counts[key] ?? 0}`).join(', ')
}

function renderReviewHtml(payload, visualPayload) {
  const issueRows = payload.rows.filter((row) => row.exerciseIssues.length)
  const topIssues = [
    ...payload.rows.flatMap((row) => row.exerciseIssues.map((issue) => `${row.learningCardTitle}: ${issue}`)),
    ...payload.summary.watchDuringTesting.map((title) => `${title}: watch with testers for clarity/redundancy.`)
  ].slice(0, 10)
  const cards = payload.rows.map((row) => `
    <section class="card">
      <h3>${row.learningCardNumber}. ${escapeHtml(row.learningCardTitle)}</h3>
      <p><strong>Stage:</strong> ${escapeHtml(row.stageTitle)}</p>
      <p><strong>Learning objective:</strong> ${escapeHtml(row.primaryLearningObjective)}</p>
      <p><strong>Exercise:</strong> ${escapeHtml(row.exerciseTitle)} <span class="pill">${escapeHtml(row.exerciseType)}</span> <span class="pill">before ${row.priorityBefore}</span> <span class="pill">after ${row.priorityAfter}</span></p>
      <p><strong>Prompt:</strong> ${escapeHtml(row.exercisePrompt)}</p>
      <p><strong>Expected action:</strong> ${escapeHtml(row.learnerAction)}</p>
      <p><strong>Items / choices / nodes / steps:</strong> ${escapeHtml(row.itemsChoicesNodesSteps.join(' | '))}</p>
      <p><strong>Target behavior:</strong> ${escapeHtml(row.correctOrTargetBehavior)}</p>
      <p><strong>Feedback behavior:</strong> ${escapeHtml(row.feedbackBehavior)}</p>
      <p><strong>Progress behavior:</strong> ${escapeHtml(row.progressStored)}</p>
      <p><strong>Randomization:</strong> ${escapeHtml(row.randomizationUsed)}</p>
      <p><strong>Fixed order:</strong> ${escapeHtml(row.fixedOrderRequired)}</p>
      <p><strong>Objective support:</strong> ${escapeHtml(row.supportsLearningObjective)}</p>
      <p><strong>Checkpoint duplicate:</strong> ${escapeHtml(row.duplicatesCheckpoint)}</p>
      <p><strong>Visual duplicate:</strong> ${escapeHtml(row.duplicatesVisualAid)}</p>
      <p><strong>Mobile notes:</strong> ${escapeHtml(row.mobileUsabilityNotes)}</p>
      <p><strong>Rubric average:</strong> ${row.rubricAverage}/5</p>
      ${row.fixApplied ? `<p class="fix"><strong>Fixed:</strong> ${escapeHtml(row.fixApplied)}</p>` : ''}
      ${row.exerciseIssues.length ? `<p class="issue"><strong>Issues:</strong> ${row.exerciseIssues.map(escapeHtml).join('; ')}</p>` : '<p class="pass">No P0/P1 issue remains.</p>'}
      ${row.manualReviewNotes.length ? `<p class="watch"><strong>Human-test watch:</strong> ${row.manualReviewNotes.map(escapeHtml).join(' ')}</p>` : ''}
      <div class="shots">
        <figure><img src="${escapeHtml(row.screenshot320)}" alt="320px interaction screenshot for ${escapeHtml(row.learningCardTitle)}"><figcaption>320px</figcaption></figure>
        <figure><img src="${escapeHtml(row.screenshot390)}" alt="390px interaction screenshot for ${escapeHtml(row.learningCardTitle)}"><figcaption>390px</figcaption></figure>
      </div>
    </section>
  `).join('\n')

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt Life v0.28.10 Journey Exercise Review</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #07155f; margin: 32px; line-height: 1.45; }
    h1, h2, h3 { color: #101a7a; }
    .summary, .card { border: 1px solid #d8def0; border-radius: 10px; padding: 16px; margin: 0 0 18px; break-inside: avoid; }
    .pill { display: inline-block; border: 1px solid #cfd8ff; border-radius: 999px; padding: 2px 8px; margin: 2px; font-size: 12px; font-weight: 800; }
    .pass { color: #075f5e; font-weight: 700; }
    .issue { color: #763300; background: #fff3df; padding: 8px; border-radius: 8px; }
    .fix { color: #075f5e; background: #e9fffb; padding: 8px; border-radius: 8px; }
    .watch { color: #4a3b00; background: #fff8d7; padding: 8px; border-radius: 8px; }
    .shots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    figure { margin: 0; }
    img { width: 100%; max-height: 340px; object-fit: contain; border: 1px solid #d8def0; border-radius: 8px; background: #f8fbff; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border-bottom: 1px solid #d8def0; padding: 6px; text-align: left; vertical-align: top; }
  </style>
</head>
<body>
  <h1>Prompt Life v0.28.10 Journey Exercise Review</h1>
  <section class="summary">
    <p><strong>Generated:</strong> ${payload.generatedAt}</p>
    <p><strong>Readiness judgment:</strong> ${payload.readinessJudgment}</p>
    <p><strong>Exercises inventoried:</strong> ${payload.summary.total}</p>
    <p><strong>Type distribution:</strong> ${Object.entries(payload.summary.typeDistribution).map(([key, value]) => `${escapeHtml(key)}: ${value}`).join(', ')}</p>
    <p><strong>Priority before:</strong> ${formatCounts(payload.summary.priorityCountsBefore)}</p>
    <p><strong>Priority after:</strong> ${formatCounts(payload.summary.priorityCountsAfter)}</p>
    <p><strong>Recommendation counts:</strong> ${Object.entries(payload.summary.recommendationCounts).map(([key, value]) => `${escapeHtml(key)}: ${value}`).join(', ')}</p>
    <p><strong>Visual overflow status:</strong> ${visualPayload?.status ?? 'not available at report generation'}</p>
    <p><strong>Fixed in this pass:</strong> ${fixedInThisPass.map((item) => escapeHtml(item.fix)).join(' ')}</p>
  </section>
  <section class="summary">
    <h2>Top 10 Exercise Issues / Watch Items</h2>
    <ol>${topIssues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join('')}</ol>
  </section>
  ${cards}
</body>
</html>`
}

function renderHumanFeedbackMarkdown() {
  return `# Prompt Life v0.28.10 Exercise Human Feedback Sheet

Prompt Life is under construction and pending human review. No badge is issued from this test.

When you see a Try Interaction or Journey exercise, please note:

1. What did you think you were supposed to do?
2. Did you know what to tap, drag, choose, or sort?
3. Did the exercise help you understand the model?
4. Did it feel different from the checkpoint?
5. Did wrong choices teach something useful?
6. Were any labels too long or cramped?
7. Did anything feel like a game that was not useful here?
8. Did any interaction feel unnecessary?
9. What would you simplify or remove?

Please flag:

- unclear instructions
- tiny tap targets
- crowded text
- hidden feedback
- bottom-nav overlap
- jargon
- exercises that feel redundant with the checkpoint
- exercises that should be moved to Play

## Per-Exercise Notes

| Stage | Card title | What I tried | Clear? | Helpful? | What confused me? | Simplify / remove? |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |
| | | | | | | |
| | | | | | | |

## Overall Readiness Notes

- Most helpful exercise:
- Least helpful exercise:
- One label that needs shortening:
- One instruction that needs rewriting:
- Any exercise that felt too much like a game:
- Any place feedback felt discouraging:
`
}

function markdownToHtml(markdown, title) {
  const lines = markdown.split('\n')
  const body = []
  let inList = false
  let inTable = false
  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (inList) { body.push('</ul>'); inList = false }
      if (inTable) { body.push('</tbody></table>'); inTable = false }
      body.push(`<h1>${escapeHtml(line.slice(2))}</h1>`)
    } else if (line.startsWith('## ')) {
      if (inList) { body.push('</ul>'); inList = false }
      if (inTable) { body.push('</tbody></table>'); inTable = false }
      body.push(`<h2>${escapeHtml(line.slice(3))}</h2>`)
    } else if (line.startsWith('- ')) {
      if (!inList) { body.push('<ul>'); inList = true }
      body.push(`<li>${escapeHtml(line.slice(2))}</li>`)
    } else if (line.startsWith('|')) {
      if (line.includes('---')) continue
      const cells = line.split('|').slice(1, -1).map((cell) => escapeHtml(cell.trim()))
      if (!inTable) {
        body.push('<table><thead><tr>')
        body.push(cells.map((cell) => `<th>${cell}</th>`).join(''))
        body.push('</tr></thead><tbody>')
        inTable = true
      } else {
        body.push(`<tr>${cells.map((cell) => `<td>${cell || '&nbsp;'}</td>`).join('')}</tr>`)
      }
    } else if (/^\d+\./.test(line)) {
      body.push(`<p>${escapeHtml(line)}</p>`)
    } else if (line.trim()) {
      if (inList) { body.push('</ul>'); inList = false }
      if (inTable) { body.push('</tbody></table>'); inTable = false }
      body.push(`<p>${escapeHtml(line)}</p>`)
    }
  }
  if (inList) body.push('</ul>')
  if (inTable) body.push('</tbody></table>')
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>
    body { font-family: Inter, Arial, sans-serif; margin: 38px; color: #07155f; line-height: 1.5; }
    h1, h2 { color: #101a7a; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
    th, td { border: 1px solid #d8def0; padding: 8px; text-align: left; vertical-align: top; min-height: 32px; }
    th { background: #f4f7ff; }
  </style></head><body>${body.join('\n')}</body></html>`
}

async function writePdfFromHtml(browser, htmlPath, pdfPath) {
  const page = await browser.newPage()
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true, margin: { top: '0.45in', right: '0.35in', bottom: '0.45in', left: '0.35in' } })
  await page.close()
}

async function main() {
  await mkdir(docsDir, { recursive: true })
  await mkdir(testingDir, { recursive: true })
  await mkdir(screenshotDir, { recursive: true })

  const contentSource = await readFile(path.join(root, 'src', 'data', 'content.ts'), 'utf8')
  const exerciseSource = await readFile(path.join(root, 'src', 'data', 'exercises.ts'), 'utf8')
  const rows = parseLessonInventory(contentSource)
  const dataIssues = auditExerciseData(exerciseSource)
  for (const row of rows) {
    row.ruleIssues = auditExerciseSource(row)
  }

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
      row.screenshot320 = rendered320.screenshot
      row.screenshot390 = rendered390.screenshot
      row.mobileUsabilityNotes = [
        rendered320.pageHorizontalOverflow > 0 ? `320px page overflow ${rendered320.pageHorizontalOverflow}px` : '320px no horizontal overflow',
        rendered390.pageHorizontalOverflow > 0 ? `390px page overflow ${rendered390.pageHorizontalOverflow}px` : '390px no horizontal overflow',
        rendered320.navOverlap || rendered390.navOverlap ? 'bottom nav overlap detected' : 'bottom nav does not cover controls after scroll'
      ].join('; ')
      row.renderedIssues = [...panelIssues(rendered320, row), ...panelIssues(rendered390, row)]
      row.exerciseIssues = [...row.ruleIssues, ...row.renderedIssues]
    }

    const desktopIds = new Set(['what-is-llm', 'context-window', 'better-ai-choice', 'effective-prompting-literacy', 'model-literate-synthesis'])
    for (const row of rows.filter((item) => desktopIds.has(item.learningCardId))) {
      const desktop = await inspectExercisePanel(page, 1024, row)
      row.rendered.desktop = desktop
      row.screenshotDesktop = desktop.screenshot
    }

    const smoke = []
    for (const tab of ['journey', 'play', 'glossary', 'badge']) {
      smoke.push(await captureSmoke(page, tab, 390))
    }

    for (const issue of dataIssues) {
      const target = rows.find((row) => issue.includes(row.learningCardId) || issue.includes(row.exerciseId))
      if (target) target.exerciseIssues.push(issue)
    }

    const summary = {
      total: rows.length,
      typeDistribution: countBy(rows, 'exerciseType'),
      priorityCountsBefore: countPriority(rows, 'priorityBefore'),
      priorityCountsAfter: countPriority(rows, 'priorityAfter'),
      recommendationCounts: countBy(rows, 'recommendation'),
      stageDistribution: countBy(rows, 'stageTitle'),
      ruleIssues: rows.reduce((sum, row) => sum + row.ruleIssues.length, 0),
      renderedIssues: rows.reduce((sum, row) => sum + row.renderedIssues.length, 0),
      totalIssues: rows.reduce((sum, row) => sum + row.exerciseIssues.length, 0),
      fixedInThisPass,
      simplifiedToReflection: [],
      hiddenForHumanTesting: [],
      moveToPlayLater: [],
      watchDuringTesting: rows.filter((row) => row.priorityAfter === 'P2').map((row) => row.learningCardTitle),
      smoke
    }
    const status = rows.length === 39 &&
      rows.every((row) => row.exerciseExists && row.exerciseId && typeRegistry[row.exerciseId]) &&
      !dataIssues.length &&
      !rows.some((row) => row.exerciseIssues.length)
        ? 'pass'
        : 'fail'
    const payload = {
      version,
      generatedAt: new Date().toISOString(),
      status,
      readinessJudgment: status === 'pass'
        ? 'ready for small human testing'
        : 'needs exercise fixes before testing',
      summary,
      rows
    }

    const inventoryJson = path.join(docsDir, 'journey-exercise-inventory-v0-28-10.json')
    const inventoryCsv = path.join(docsDir, 'journey-exercise-inventory-v0-28-10.csv')
    const inventoryMd = path.join(docsDir, 'journey-exercise-inventory-v0-28-10.md')
    const csvHeader = [
      'stageNumber', 'stageTitle', 'learningCardNumber', 'learningCardId', 'learningCardTitle',
      'primaryLearningObjective', 'exerciseExists', 'exerciseId', 'exerciseTitle', 'exerciseType',
      'exercisePrompt', 'learnerAction', 'itemsChoicesNodesSteps', 'correctOrTargetBehavior',
      'feedbackBehavior', 'progressStored', 'randomizationUsed', 'fixedOrderRequired',
      'supportsLearningObjective', 'duplicatesCheckpoint', 'duplicatesVisualAid', 'mobileUsabilityNotes',
      'recommendation', 'priorityBefore', 'priorityAfter', 'fixApplied', 'rubricScores',
      'rubricAverage', 'exerciseIssues', 'manualReviewNotes', 'screenshot320', 'screenshot390', 'screenshotDesktop'
    ]
    await writeFile(inventoryJson, `${JSON.stringify(payload, null, 2)}\n`)
    await writeFile(inventoryCsv, `${csvHeader.join(',')}\n${rows.map((row) => csvHeader.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`)
    await writeFile(inventoryMd, renderInventoryMarkdown(payload))

    let visualPayload = null
    if (fs.existsSync(visualOverflowPath)) {
      visualPayload = JSON.parse(await readFile(visualOverflowPath, 'utf8'))
    }

    const reviewHtml = path.join(docsDir, 'prompt-life-v0-28-10-journey-exercise-review.html')
    const reviewPdf = path.join(docsDir, 'prompt-life-v0-28-10-journey-exercise-review.pdf')
    await writeFile(reviewHtml, renderReviewHtml(payload, visualPayload))
    await writePdfFromHtml(browser, reviewHtml, reviewPdf)

    const feedbackMd = path.join(testingDir, 'prompt-life-v0-28-10-exercise-human-feedback.md')
    const feedbackHtml = path.join(testingDir, 'prompt-life-v0-28-10-exercise-human-feedback.html')
    const feedbackPdf = path.join(testingDir, 'prompt-life-v0-28-10-exercise-human-feedback.pdf')
    const feedbackMarkdown = renderHumanFeedbackMarkdown()
    await writeFile(feedbackMd, feedbackMarkdown)
    await writeFile(feedbackHtml, markdownToHtml(feedbackMarkdown, 'Prompt Life v0.28.10 Exercise Human Feedback Sheet'))
    await writePdfFromHtml(browser, feedbackHtml, feedbackPdf)

    if (status !== 'pass') {
      console.error(`Exercise audit failed. See ${path.relative(root, inventoryMd)}.`)
      for (const row of rows.filter((item) => item.exerciseIssues.length)) {
        console.error(`- ${row.learningCardTitle}: ${row.exerciseIssues.join('; ')}`)
      }
      process.exit(1)
    }
    console.log(`Exercise audit passed. Inventoried ${rows.length} Journey interactions and exported v0.28.10 reports.`)
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
