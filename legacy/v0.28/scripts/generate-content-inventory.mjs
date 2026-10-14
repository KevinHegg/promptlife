import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildLessonReviewProfile,
  reviewRubricCategories
} from '../src/data/contentReview.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs', 'content-inventory')

const stageOptions = [
  'pretraining',
  'fine-tuning',
  'inference',
  'prompt processing',
  'response generation',
  'current context',
  'architecture',
  'risk/policy'
]

let acts
let lessons
let exercises
let lessonExerciseIds
let visualAidCatalog
let actById
let exerciseById
let visualAidById
let inventoryRows

async function loadContentData() {
  let source = await readFile(path.join(root, 'src', 'data', 'content.ts'), 'utf8')
  source = source.replace(/const BASE = import\.meta\.env\.BASE_URL\.replace\([^)]*\)/, "const BASE = ''")
  source = source.replace(/export const /g, 'const ')
  return new Function(`${source}\nreturn { acts, lessons, glossary, learningModes, games }`)()
}

async function loadExerciseData() {
  const source = await readFile(path.join(root, 'src', 'data', 'exercises.ts'), 'utf8')
  const exercisesMatch = source.match(/export const exercises: Exercise\[] = ([\s\S]*?)\n\nexport const exerciseById/)
  const mapMatch = source.match(/export const lessonExerciseIds: Record<string, string> = ([\s\S]*?)\n\nexport function/)
  if (!exercisesMatch || !mapMatch) throw new Error('Could not parse exercise data.')
  const exercisesLiteral = exercisesMatch[1].replace(/ as ExerciseItem/g, '')
  const mapLiteral = mapMatch[1]
  return new Function(`const exercises = ${exercisesLiteral}\nconst lessonExerciseIds = ${mapLiteral}\nreturn { exercises, lessonExerciseIds }`)()
}

async function loadVisualAidCatalog() {
  const source = await readFile(path.join(root, 'src', 'components', 'VisualAids.tsx'), 'utf8')
  const match = source.match(/export const visualAidCatalog = ([\s\S]*?)\n\nconst aidById/)
  if (!match) throw new Error('Could not parse visual aid catalog.')
  return new Function(`return ${match[1]}`)()
}

function buildInventoryRow(lesson, index) {
  const profile = buildLessonReviewProfile(lesson)
  const act = actById[lesson.act]
  const exerciseId = lessonExerciseIds[lesson.id] ?? null
  const exercise = exerciseId ? exerciseById[exerciseId] : null
  const visualAid = visualAidById[lesson.visualAidId]
  const incorrectAnswers = lesson.quiz.choices.filter((choice) => choice !== lesson.quiz.answer)
  const feedbackEntries = Object.entries(lesson.quiz.feedback ?? {})
  const definitionQuality = `${profile.rubric.accuracy}/5`
  const relationshipQuality = `${profile.rubric.relationship}/5`
  const exerciseClarity = `${profile.rubric.exercise}/5`
  const promptResponseClarity = `${profile.rubric.promptResponse}/5`
  const durableTemporaryClarity = `${profile.rubric.durableTemporary}/5`

  return {
    number: index + 1,
    lessonId: lesson.id,
    section: act?.name ?? lesson.actLabel,
    sectionSummary: act?.summary ?? '',
    title: lesson.title,
    currentSubtitle: lesson.subtitle,
    currentDefinition: lesson.definition,
    currentCoreExplanation: `Where: ${lesson.where} Why: ${lesson.why}`,
    where: lesson.where,
    why: lesson.why,
    currentRelationship: lesson.relationship,
    currentMetaphor: lesson.metaphor,
    currentBrainMetaphor: lesson.brainBridge?.metaphor ?? '',
    currentBrainLimitation: lesson.brainBridge?.limit ?? '',
    promptResponseNote: profile.promptResponseNote,
    currentVisualAid: visualAid ? `${visualAid.id}: ${visualAid.title} - ${visualAid.caption}` : `${lesson.visualAidId}: missing from catalog`,
    visualAidId: lesson.visualAidId,
    visualAidTitle: visualAid?.title ?? '',
    visualAidCaption: visualAid?.caption ?? '',
    currentExercise: exercise ? `Journey: none rendered. Play/legacy mapping: ${exercise.id} - ${exercise.title}. Goal: ${exercise.goal}` : 'Journey: none rendered. No direct Play/legacy mapping.',
    exerciseId,
    exerciseTitle: exercise?.title ?? '',
    exerciseGoal: exercise?.goal ?? '',
    currentCheckpointQuestion: lesson.quiz.question,
    correctAnswer: lesson.quiz.answer,
    incorrectAnswers,
    feedbackText: [
      `Correct feedback: ${lesson.quiz.explain}`,
      feedbackEntries.length ? `Incorrect feedback: ${feedbackEntries.map(([choice, note]) => `${choice}: ${note}`).join(' ')}` : 'Incorrect feedback: uses the general correct explanation only.'
    ].join(' '),
    glossaryTermsUsed: lesson.terms,
    stage: profile.stage,
    knownConfusionRisk: profile.confusionRisk,
    missingExplanation: profile.missingExplanation,
    illustrationNeeded: profile.illustrationNeeded,
    rewritePriority: profile.rewritePriority,
    rubric: profile.rubric,
    rubricAverage: profile.rubricAverage,
    definitionQuality,
    relationshipQuality,
    exerciseClarity,
    promptResponseClarity,
    durableTemporaryClarity,
    metaphorPresent: Boolean(lesson.metaphor),
    brainMetaphorPresent: Boolean(lesson.brainBridge?.metaphor),
    limitationPresent: Boolean(lesson.brainBridge?.limit),
    visualAidPresent: Boolean(visualAid)
  }
}

function renderContentInventory(rows) {
  const parts = [
    '# Prompt Life Content Inventory v0.6',
    '',
    `Generated: 2026-06-02`,
    '',
    `Scope: ${rows.length} Journey lessons. Stage options used: ${stageOptions.join(', ')}.`,
    '',
    'Note: Journey currently renders tiny lesson interactions and checkpoint/reflection flows. Reusable exercises remain in Play, Prompt Run, and How AI Learns rather than being embedded in Journey cards.',
    ''
  ]

  for (const row of rows) {
    parts.push(
      `## ${row.number}. ${row.title} (${row.lessonId})`,
      '',
      `- Lesson id: ${row.lessonId}`,
      `- Section: ${row.section}`,
      `- Title: ${row.title}`,
      `- Current subtitle: ${row.currentSubtitle}`,
      `- Current definition: ${row.currentDefinition}`,
      `- Current core explanation: ${row.currentCoreExplanation}`,
      `- Current relationship/how-it-connects text: ${row.currentRelationship}`,
      `- Current metaphor: ${row.currentMetaphor}`,
      `- Current brain metaphor: ${row.currentBrainMetaphor || 'None.'}`,
      `- Current brain metaphor limitation: ${row.currentBrainLimitation || 'None.'}`,
      `- Prompt/response clarity note: ${row.promptResponseNote}`,
      `- Current visual aid: ${row.currentVisualAid}`,
      `- Current exercise: ${row.currentExercise}`,
      `- Current checkpoint question: ${row.currentCheckpointQuestion}`,
      `- Correct answer: ${row.correctAnswer}`,
      `- Incorrect answers: ${row.incorrectAnswers.join('; ') || 'None listed.'}`,
      `- Feedback text: ${row.feedbackText}`,
      `- Glossary terms used: ${row.glossaryTermsUsed.join(', ')}`,
      `- Stage of model process: ${row.stage}`,
      `- Known confusion risk: ${row.knownConfusionRisk}`,
      `- Missing explanation: ${row.missingExplanation}`,
      `- Illustration needed: ${row.illustrationNeeded}`,
      `- Rewrite priority: ${row.rewritePriority}`,
      ''
    )
  }

  return `${parts.join('\n')}\n`
}

function renderRubric(rows) {
  const parts = [
    '# Content Quality Rubric v0.6',
    '',
    'Scores use 1 to 5, where 1 means missing or actively confusing, 3 means usable but incomplete, and 5 means strong enough for the current audience.',
    ''
  ]

  reviewRubricCategories.forEach((category, index) => {
    parts.push(`## ${index + 1}. ${category.label}`, '', category.description, '')
  })

  parts.push(
    '## Lesson Scores',
    '',
    `| # | Lesson | Avg | ${reviewRubricCategories.map((category) => tableCell(category.label)).join(' | ')} |`,
    `|---|---|---:|${reviewRubricCategories.map(() => '---:').join('|')}|`
  )

  for (const row of rows) {
    parts.push(`| ${row.number} | ${tableCell(row.title)} | ${row.rubricAverage} | ${reviewRubricCategories.map((category) => row.rubric[category.key]).join(' | ')} |`)
  }

  parts.push(
    '',
    '## Reading the Scores',
    '',
    '- The lowest recurring category is exercise quality because Journey intentionally no longer embeds the reusable exercise system; many lessons need a clearer Play placement rather than a Journey widget.',
    '- Vectors, tensors, attention, MLP, hidden states, context window, How AI Learns, and Risk vs Myth deserve the earliest rewrite attention because they carry the most misconception risk.',
    '- Prompt/response clarity is strongest in the decoding lessons and weakest in broad architecture side tours, where the bridge back to the day-in-the-life through-line needs to be made more explicit.',
    ''
  )

  return `${parts.join('\n')}\n`
}

function renderMatrix(rows) {
  const parts = [
    '# Lesson Content Matrix v0.6',
    '',
    '| # | Section | Lesson | Stage | Definition quality | Relationship quality | Metaphor present? | Brain metaphor present? | Limitation present? | Visual aid present? | Exercise clarity | Prompt/response clarity | Durable/temporary clarity | Rewrite priority | Notes |',
    '|---:|---|---|---|---:|---:|---|---|---|---|---:|---:|---:|---|---|'
  ]

  for (const row of rows) {
    parts.push([
      row.number,
      tableCell(row.section),
      tableCell(row.title),
      tableCell(row.stage),
      row.definitionQuality,
      row.relationshipQuality,
      yesNo(row.metaphorPresent),
      yesNo(row.brainMetaphorPresent),
      yesNo(row.limitationPresent),
      yesNo(row.visualAidPresent),
      row.exerciseClarity,
      row.promptResponseClarity,
      row.durableTemporaryClarity,
      row.rewritePriority,
      tableCell(row.knownConfusionRisk)
    ].join(' | ').replace(/^/, '| ').replace(/$/, ' |'))
  }

  return `${parts.join('\n')}\n`
}

function renderMisconceptionMap(rows) {
  const parts = [
    '# Misconception Map v0.6',
    '',
    'Use this map while rewriting checkpoints, feedback, glossary entries, and Play exercises. Each misconception should point back to the mechanism that resolves it.',
    '',
    '| Lesson | Stage | Misconception risk | Correct mental model | Practice or checkpoint hook |',
    '|---|---|---|---|---|'
  ]

  for (const row of rows) {
    const mentalModel = row.lessonId === 'rag-retrieval'
      ? 'RAG gives the model better temporary context. It does not make the model omniscient, trained on the document, or automatically truthful.'
      : row.missingExplanation
    const hook = row.exerciseTitle
      ? `${row.currentCheckpointQuestion} Play: ${row.exerciseTitle}.`
      : row.currentCheckpointQuestion
    parts.push(`| ${tableCell(row.title)} | ${tableCell(row.stage)} | ${tableCell(row.knownConfusionRisk)} | ${tableCell(mentalModel)} | ${tableCell(hook)} |`)
  }

  parts.push(
    '',
    '## RAG-Specific Misconceptions',
    '',
    '- RAG means the model permanently learned the document.',
    '- RAG means the model has access to all files.',
    '- RAG means answers are automatically true.',
    '- RAG is the same as fine-tuning.',
    '- RAG eliminates hallucinations.',
    '- RAG means the model searched the web by itself.',
    '',
    'Better mental model: RAG gives the model better temporary context. It does not make the model omniscient.',
    ''
  )

  return `${parts.join('\n')}\n`
}

function renderCurriculumGaps(rows) {
  const byPriority = (priority) => rows.filter((row) => row.rewritePriority === priority).map((row) => row.title)
  const noExercise = rows.filter((row) => !row.exerciseId).map((row) => row.title)
  const weakPrompt = rows.filter((row) => row.rubric.promptResponse <= 3).map((row) => row.title)
  const weakDurable = rows.filter((row) => row.rubric.durableTemporary <= 3).map((row) => row.title)
  const dogCatTargets = ['Prompt vs Response', 'Tokenization', 'Attention', 'Logits', 'Softmax', 'Sampling', 'Autoregression', 'Context Window']

  return `# Curriculum Gaps v0.6

## 1. Which lessons are confusing?

Highest risk: ${listSentence(byPriority('high'))}. These concepts are abstract, easy to anthropomorphize, or central to the durable-versus-temporary distinction.

## 2. Which lessons are redundant?

Tokenization, Token IDs, Embeddings, Vectors, and Tensors are all necessary, but they need cleaner handoffs so they feel like one pipeline rather than repeated "numbers" lessons. Logits, Softmax, and Sampling also belong together as a tight decoding sequence.

## 3. Which lessons are missing brain metaphors?

None in the current Journey. Every lesson includes a Brain Bridge.

## 4. Which lessons are missing metaphor limitations?

None in the current Journey. Every Brain Bridge includes an explicit limitation.

## 5. Which lessons lack visual aids?

None. Every current Journey lesson points to a visualAidId in the catalog.

## 6. Which exercises are embedded in Journey but should move to Play?

No reusable ExerciseShell exercises are currently embedded in Journey. Journey uses tiny interactions and checkpoints; reusable exercises belong in Play/Prompt Run/How AI Learns. Lessons without direct Play mappings today: ${listSentence(noExercise)}.

## 7. Where does the app confuse prompt processing with response generation?

The app mostly separates them, but the architecture lessons need stronger return lines to the prompt lifecycle. Weakest prompt/response scores: ${listSentence(weakPrompt)}.

## 8. Where does the app confuse inference with training?

The core distinction is stated well in Training, Pretraining, Fine-Tuning, Inference, Context Window, and How AI Learns. Weaker durable/temporary scores are mainly in mechanism or side-tour lessons where the distinction is not the focus: ${listSentence(weakDurable)}.

## 9. Where does the app imply too much human-like cognition?

Attention, Hidden States, Sampling, Multimodal AI, and Risk vs Myth are the main places to watch. They already include limits, but the rewrite should keep "attention," "choosing," "working memory," and "sensory" language visibly bounded.

## 10. Which glossary terms are missing or weak?

Add or strengthen terms for vocabulary projection, vocabulary cloud, residual connection, normalization, adapter, policy layer, tool use, retrieval corpus, online learning, and evaluation. Existing terms for embedding, hidden state, inference, context window, RAG, and in-context learning are strong.

## 11. Which section order changes would improve learning?

Move Context Window before Attention in the proposed architecture so learners know the visible working set before learning cross-token relevance. RAG and Retrieval is now a current Journey lesson after Context Window; add Brain Metaphor and Its Limits and Model Literate Synthesis as future explicit lessons.

## 12. Which lessons should be split?

Layers should eventually split into Layers and Residuals/Normalization. RAG and Retrieval has now been split out of How AI Learns; keep How AI Learns focused on durable training, temporary steering, retrieval, and online learning. Risk vs Myth may benefit from a short synthesis after the risk card.

## 13. Which lessons should be merged?

Do not merge the current token pipeline lessons yet. Instead, tighten transitions. Diffusion vs Autoregression and Multimodal AI should remain side tours, not replacements for core LLM mechanics.

## 14. Which lessons need better illustrations?

Highest illustration need: ${listSentence(byPriority('high'))}. Tensors, hidden states, context windows, RAG, and How AI Learns especially need visual systems that teach, not just decorate.

## 15. Which lessons should use the dog/cat example?

Use the dog/cat sentence across: ${listSentence(dogCatTargets)}. It gives one shared sentence for prompt tokens, generated response token, attention reference, logits, softmax, sampling, autoregression, and what falls out of context.
`
}

function renderArchitectureProposal() {
  const parts = [
    '# Journey Architecture Proposal v0.6',
    '',
    'Goal: keep the day-in-the-life through-line while making the curriculum more explicit about what changes weights, what happens during inference, and where prompt tokens become response tokens.',
    ''
  ]

  targetArchitecture.forEach((lesson, index) => {
    parts.push(
      `## ${index + 1}. ${lesson.title}`,
      '',
      `- One-sentence definition: ${lesson.definition}`,
      `- Core explanation: ${lesson.core}`,
      `- How it connects: ${lesson.connects}`,
      `- Metaphor: ${lesson.metaphor}`,
      `- Brain metaphor: ${lesson.brain}`,
      `- Where brain metaphor breaks: ${lesson.brainLimit}`,
      `- Visual aid idea: ${lesson.visual}`,
      `- Checkpoint misconception: ${lesson.misconception}`,
      `- Exercise placement: ${lesson.exercise}`,
      ''
    )
  })

  return `${parts.join('\n')}\n`
}

function renderVisualAidInventory(rows) {
  const parts = [
    '# Visual Aid Inventory v0.6',
    '',
    'Preferred style: mobile-readable SVG diagrams, CSS 3D only when it clarifies structure, text in HTML where possible, and reduced-motion fallbacks for all movement.',
    ''
  ]

  for (const row of rows) {
    const threeD = threeDByLessonId[row.lessonId] ?? 'None recommended for v0.6.'
    parts.push(
      `## ${row.number}. ${row.title}`,
      '',
      `- visualAidId: ${row.visualAidId}`,
      `- Lesson: ${row.title}`,
      `- What it teaches: ${row.visualAidCaption || row.currentDefinition}`,
      `- Static description: ${row.illustrationNeeded}`,
      `- Animation idea: ${animationIdea(row)}`,
      `- 3D idea: ${threeD}`,
      `- Why 3D helps or does not help: ${threeDReason(row)}`,
      `- Accessibility description: Provide an HTML caption that states the mechanism in one sentence: ${row.visualAidCaption || row.currentDefinition}`,
      `- Reduced-motion fallback: Show the final static diagram with arrows or numbered steps; avoid relying on motion to communicate order.`,
      `- Implementation complexity: ${visualComplexity(row.lessonId)}`,
      ''
    )
  }

  return `${parts.join('\n')}\n`
}

function renderRewriteDraft() {
  const parts = [
    '# Journey Rewrite Draft v0.6',
    '',
    'Scope: first five lessons plus the RAG addendum draft requested during this pass. These are draft content blocks for later refinement.',
    ''
  ]

  firstFiveRewriteDrafts.forEach((lesson, index) => {
    parts.push(
      `## ${index + 1}. ${lesson.title}`,
      '',
      `- Title: ${lesson.title}`,
      `- One-sentence definition: ${lesson.definition}`,
      `- Where it happens: ${lesson.where}`,
      `- Core explanation: ${lesson.core}`,
      `- Why it matters: ${lesson.why}`,
      `- How it connects: ${lesson.connects}`,
      `- Metaphor: ${lesson.metaphor}`,
      `- Brain metaphor: ${lesson.brain}`,
      `- Where the brain metaphor breaks: ${lesson.brainLimit}`,
      `- Visual aid description: ${lesson.visual}`,
      `- Checkpoint question: ${lesson.question}`,
      `- Correct answer: ${lesson.correct}`,
      `- Two incorrect answers: ${lesson.incorrect.join('; ')}`,
      `- Misconception addressed: ${lesson.misconception}`,
      `- Glossary terms: ${lesson.terms.join(', ')}`,
      ''
    )
  })

  parts.push(
    '## Addendum. RAG and Retrieval',
    '',
    `- Title: ${ragRewriteDraft.title}`,
    `- One-sentence definition: ${ragRewriteDraft.definition}`,
    `- Where it happens: ${ragRewriteDraft.where}`,
    `- Core explanation: ${ragRewriteDraft.core}`,
    `- Why it matters: ${ragRewriteDraft.why}`,
    `- How it connects: ${ragRewriteDraft.connects}`,
    `- Metaphor: ${ragRewriteDraft.metaphor}`,
    `- Brain metaphor: ${ragRewriteDraft.brain}`,
    `- Where the brain metaphor breaks: ${ragRewriteDraft.brainLimit}`,
    `- Visual aid description: ${ragRewriteDraft.visual}`,
    `- Checkpoint question: ${ragRewriteDraft.question}`,
    `- Correct answer: ${ragRewriteDraft.correct}`,
    `- Two incorrect answers: ${ragRewriteDraft.incorrect.slice(0, 2).join('; ')}`,
    `- Additional incorrect answer: ${ragRewriteDraft.incorrect[2]}`,
    `- Misconception addressed: ${ragRewriteDraft.misconception}`,
    `- Glossary terms: ${ragRewriteDraft.terms.join(', ')}`,
    ''
  )

  return `${parts.join('\n')}\n`
}

function renderUiCopyCleanup() {
  return `# UI Copy Cleanup List v0.6

Scope: learner-visible copy that exposes implementation or design decisions. Debug-only copy behind ?debug=1 is inventoried but should remain available for diagnostics.

| Location | Current copy or pattern | Issue | Replacement direction |
|---|---|---|---|
| Badge > Start over | "Progress is stored only on this device." | Accurate, but implementation-facing if repeated too often. | "Your progress stays on this device." |
| Badge > Debug mode | "Visible in diagnostics mode. These tools only touch Prompt Life saved progress keys." | Debug-only. Keep behind ?debug=1. | No learner-facing replacement needed. |
| README | "localStorage" | Developer documentation, not learner UI. | Keep in docs; use "this browser" in app copy. |
| Docs and reports | "MVP" | Product-process language, not learner language. | Use "current version" or "first release." |
| Docs and reports | "noncompetitive" / "no leaderboard" / "no scores" | Design rationale, not a needed learner instruction. | Use "insight-based practice" or "progress and reflection." |
| Docs and reports | "exercise system" | Internal architecture language. | Use "practice activities." |
| Review routes | "rubric" and "rewrite priority" | Acceptable because review routes are authoring/audit tools, not learner screens. | Keep on /review routes only. |
| Mini-game insight language | "Insight unlocked" | Learner-facing and aligned with product tone. | Keep. |

Search result: the production learner UI does not currently show leaderboard, score, MVP, or no-score language. The main cleanup item is to keep implementation terms confined to README, docs, review routes, and ?debug=1 diagnostics.
`
}

function renderReviewCardHowTo() {
  return `# How to Review Lesson Cards

## Route

Open:

\`\`\`text
/review/lesson-cards
\`\`\`

For print/export mode:

\`\`\`text
/review/lesson-cards?print=1
\`\`\`

The route renders one curriculum-review card per Journey lesson using current app data plus the inventory profile and rubric scores.

## Automated Export

Run:

\`\`\`bash
npm run export:lesson-cards
\`\`\`

Output:

\`\`\`text
docs/content-inventory/prompt-life-lesson-cards-v0-6.pdf
\`\`\`

This uses the existing Chrome-based PDF export script. No Playwright dependency was added.

## Manual Fallback

If Chrome is unavailable, run:

\`\`\`bash
npm run dev
\`\`\`

Then open the review route, use the browser print dialog, choose landscape orientation, and save as PDF. The print CSS is tuned for one cover page plus one page per lesson.

## QA Checklist

- The route loads without the mobile app shell or bottom navigation.
- One lesson begins per printed page.
- Each card includes stage, definition, explanation, relationship, metaphor, brain limit, prompt/response note, visual aid, current exercise, checkpoint, glossary terms, rewrite notes, and rubric scores.
- The PDF has a cover page plus one page for each Journey lesson.
`
}

function toMatrixJson(row) {
  return {
    number: row.number,
    lessonId: row.lessonId,
    section: row.section,
    lesson: row.title,
    stage: row.stage,
    definitionQuality: row.definitionQuality,
    relationshipQuality: row.relationshipQuality,
    metaphorPresent: row.metaphorPresent,
    brainMetaphorPresent: row.brainMetaphorPresent,
    limitationPresent: row.limitationPresent,
    visualAidPresent: row.visualAidPresent,
    exerciseId: row.exerciseId,
    exerciseClarity: row.exerciseClarity,
    promptResponseClarity: row.promptResponseClarity,
    durableTemporaryClarity: row.durableTemporaryClarity,
    rewritePriority: row.rewritePriority,
    notes: row.knownConfusionRisk
  }
}

function animationIdea(row) {
  const byStage = {
    pretraining: 'Loop predict, compare, update; pause on the durable weight change.',
    'fine-tuning': 'Animate a targeted trail over an existing model landscape.',
    inference: 'Move context through fixed weights and show temporary states fading after the pass.',
    'prompt processing': 'Animate text becoming tokens, IDs, embeddings, then a tensor.',
    'response generation': 'Animate raw scores becoming probabilities, one token selected, then appended.',
    'current context': 'Slide cards into a limited window and let older cards fall out.',
    architecture: 'Use gentle step highlighting across the mechanism without decorative motion.',
    'risk/policy': 'Sort cards into mechanism-backed risks and myths.'
  }
  return byStage[row.stage] ?? 'Optional step-by-step highlight.'
}

function visualComplexity(lessonId) {
  if (['tensors', 'layers', 'context-window', 'rag-retrieval', 'how-ai-learns'].includes(lessonId)) return 'medium'
  if (['vectors', 'attention', 'hidden-states', 'sampling', 'multimodal'].includes(lessonId)) return 'medium'
  return 'low'
}

function threeDReason(row) {
  if (threeDByLessonId[row.lessonId]) return 'A light CSS 3D treatment can clarify depth or bounded space, but labels and captions must carry the meaning.'
  return 'A flat SVG is clearer on mobile because the concept is sequential or categorical rather than spatial.'
}

function tableCell(value) {
  return String(value ?? '').replace(/\n/g, ' ').replace(/\|/g, '\\|')
}

function yesNo(value) {
  return value ? 'Yes' : 'No'
}

function listSentence(items) {
  if (items.length === 0) return 'none'
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`
}

const threeDByLessonId = {
  'what-is-llm': 'Optional CSS feature cloud with shallow depth.',
  vectors: 'Optional feature cloud or vector-space plane.',
  tensors: 'CSS 3D tensor cube with token and feature axes.',
  layers: 'Transparent layer stack with repeated blocks.',
  'hidden-states': 'Layered vector stack showing temporary state changes.',
  sampling: 'Vocabulary cloud with depth only if labels remain readable.',
  'context-window': 'CSS 3D card stack showing bounded visible context.',
  'rag-retrieval': 'Transparent context tray; search pulls document cards from a library shelf and drops them into the tray before the model runs.',
  multimodal: 'Shallow hub diagram; avoid complex 3D media objects.'
}

const targetArchitecture = [
  {
    title: 'What Is an LLM?',
    definition: 'A large language model is a learned system that predicts likely next tokens from the context it can see.',
    core: 'Start with the simplest full loop: context enters, fixed weights compute scores, one token is selected, and the response grows.',
    connects: 'Sets up why training matters before the prompt arrives and why inference matters once it does.',
    metaphor: 'A very large autocomplete engine with learned structure, not a mind or a database.',
    brain: 'Many small signals combine into useful patterns.',
    brainLimit: 'No lived body, feelings, awareness, or personal goals.',
    visual: 'Prompt lifecycle overview with weights, logits, sampling, and append-repeat.',
    misconception: 'An LLM is conscious or simply a database lookup.',
    exercise: 'Journey checkpoint; Play can use Pick the Next Token.'
  },
  {
    title: 'Two AI Traditions',
    definition: 'Symbolic AI uses explicit rules; deep learning learns patterns by adjusting weights.',
    core: 'LLMs mainly come from learned deep-learning systems, though useful products may still wrap them with rules.',
    connects: 'Explains why the model can be flexible before showing how training shapes that flexibility.',
    metaphor: 'A rulebook beside a weather system of learned relationships.',
    brain: 'Practice can shape future behavior in a loose analogy.',
    brainLimit: 'The model is optimized mathematically, not practicing with intention.',
    visual: 'Split panel: rule path and learned landscape.',
    misconception: 'LLMs are hand-coded rulebooks.',
    exercise: 'Journey checkpoint only.'
  },
  {
    title: 'Training',
    definition: 'Training updates weights by predicting, measuring error, and adjusting parameters.',
    core: 'A training loop uses many examples and a loss signal to make durable changes to the model.',
    connects: 'Creates the durable weights that inference later uses without rewriting.',
    metaphor: 'Tuning an instrument before a performance.',
    brain: 'Repeated experience can shape later behavior.',
    brainLimit: 'No reflection or personal memory; weights are changed by optimization.',
    visual: 'Predict, compare, loss, update weights, repeat.',
    misconception: 'Every chat message trains the model.',
    exercise: 'Play exercise: Training Nudge.'
  },
  {
    title: 'Pretraining',
    definition: 'Pretraining is broad early training that builds general language capability through durable weight updates.',
    core: 'The model predicts tokens across vast data, so many tiny updates carve broad patterns into its parameters.',
    connects: 'Gives the base model its broad starting capability before targeted fine-tuning.',
    metaphor: 'Carving roads through a huge landscape.',
    brain: 'Like broad education only in the sense that earlier exposure affects later performance.',
    brainLimit: 'Not human understanding and not a perfect memory of all sources.',
    visual: 'Broad data rain shaping a terrain.',
    misconception: 'Pretraining stores an exact copy of every document.',
    exercise: 'Journey checkpoint; Play can reuse Durable or Temporary.'
  },
  {
    title: 'Fine-Tuning',
    definition: 'Fine-tuning is targeted additional training after pretraining.',
    core: 'Examples, preferences, or domain data nudge future behavior toward a task or style.',
    connects: 'Narrows or aligns broad pretrained capability before deployment or between releases.',
    metaphor: 'Adding trails to an existing terrain.',
    brain: 'A coach shaping performance style.',
    brainLimit: 'The model is not adopting values or intentions.',
    visual: 'Targeted path over pretrained landscape.',
    misconception: 'Fine-tuning is the same thing as a better prompt.',
    exercise: 'Journey checkpoint; Play can reuse Durable or Temporary.'
  },
  {
    title: 'Inference',
    definition: 'Inference is normal model use: fixed weights process current context without durable updates.',
    core: 'The prompt enters a forward pass; temporary activations change, but model weights normally stay fixed.',
    connects: 'Begins the live day in the life of a prompt.',
    metaphor: 'Using a map, not redrawing it.',
    brain: 'It can feel like thinking because internal states change temporarily.',
    brainLimit: 'Temporary hidden states are not beliefs or memories.',
    visual: 'Forward pass with fixed weights underneath.',
    misconception: 'Inference secretly trains the model.',
    exercise: 'Play exercise: Training Nudge.'
  },
  {
    title: 'Prompt vs Response',
    definition: 'The prompt is supplied context; the response is generated tokens added afterward.',
    core: 'The response grows one token at a time, and the response-so-far becomes part of the next context.',
    connects: 'Prepares learners to track prompt tokens and response tokens through tokenization and decoding.',
    metaphor: 'Given cards on a table, then new cards added one by one.',
    brain: 'Like continuing a sentence after reading a prompt.',
    brainLimit: 'The model samples from probabilities rather than deciding what it means to say.',
    visual: 'Prompt cards plus generated response cards in one current context.',
    misconception: 'The full response appears all at once.',
    exercise: 'Play exercise: Prompt or Response?'
  },
  {
    title: 'Tokenization',
    definition: 'Tokenization splits text into chunks the model can process.',
    core: 'Both prompt text and response-so-far become token chunks before numerical lookup.',
    connects: 'Turns visible language into token IDs.',
    metaphor: 'Parcels entering a conveyor.',
    brain: 'Like hearing parts of a sentence before interpretation.',
    brainLimit: 'Tokenizer chunks are not human concepts or phonemes.',
    visual: 'Dog/cat sentence split into uneven token chunks.',
    misconception: 'A token is always a whole word.',
    exercise: 'Play exercise: Prompt or Response?'
  },
  {
    title: 'Token IDs',
    definition: 'A token ID is a number used to look up a token starting vector.',
    core: 'The ID is a key, not a meaning; it points to a row in the embedding table.',
    connects: 'Bridges tokens to embeddings.',
    metaphor: 'A library call number.',
    brain: 'Like recognizing a familiar symbol only very loosely.',
    brainLimit: 'The number itself is not understanding.',
    visual: 'Token chunk to ID to embedding row.',
    misconception: 'The ID contains the token meaning.',
    exercise: 'Play exercise: Prompt or Response?'
  },
  {
    title: 'Embeddings',
    definition: "An embedding is a token ID's learned starting vector.",
    core: 'The token starts as a learned vector before the current context reshapes it.',
    connects: 'Introduces vectors and hidden states as different moments in the same path.',
    metaphor: 'A starting address in a meaning cloud.',
    brain: 'Like a starting association with a word.',
    brainLimit: 'Not a definition, memory, or thought.',
    visual: 'Embedding table row pulled into the current context tensor.',
    misconception: 'Embeddings are the same as hidden states.',
    exercise: 'Play exercise: Prompt or Response?'
  },
  {
    title: 'Vectors',
    definition: 'A vector is a list of numbers carrying learned features.',
    core: 'Vectors let many fuzzy features be computed at once.',
    connects: 'Embeddings and hidden states are vectors; tensors organize many vectors.',
    metaphor: 'A coordinate in many-dimensional space.',
    brain: 'Like a bundle of associations.',
    brainLimit: 'It is a numerical representation, not a conscious concept.',
    visual: 'Feature bars with simplified labels.',
    misconception: 'Each vector dimension has a neat English meaning.',
    exercise: 'Play placement recommended.'
  },
  {
    title: 'Tensors',
    definition: 'A tensor is an organized block of numbers.',
    core: 'The model carries many token vectors together through layers as shaped numerical arrays.',
    connects: 'Sets up the transformer layer stack.',
    metaphor: 'A stack of spreadsheets.',
    brain: 'Like organizing many signals at once.',
    brainLimit: 'Not a mental image or private thought.',
    visual: 'Token-by-feature tensor block.',
    misconception: 'Tensors are just advanced vocabulary with no practical role.',
    exercise: 'Journey checkpoint; optional Play sorting later.'
  },
  {
    title: 'Context Window',
    definition: 'The context window is the limited visible input the model can currently use.',
    core: 'Prompt, retrieved material, conversation history, and response-so-far matter only while they remain in context.',
    connects: 'Before attention, learners need to know what positions attention can see.',
    metaphor: 'A moving spotlight over a growing train.',
    brain: 'Loosely like working memory.',
    brainLimit: 'Not permanent memory; what falls out cannot be directly attended to.',
    visual: 'Bounded stack of cards with older cards falling out.',
    misconception: 'Context is the same as durable memory.',
    exercise: 'Play exercise: Context Window: What Fell Out?'
  },
  {
    title: 'RAG and Retrieval',
    definition: 'Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model context before generating a response.',
    core: 'A RAG system adds a search step: it looks up documents, passages, or records, then gives retrieved snippets to the model as part of the prompt/context. The model then generates using both learned weights and retrieved context.',
    connects: 'RAG depends on the context window. Retrieved text becomes input context; attention, hidden states, logits, softmax, sampling, and autoregression still do the response generation.',
    metaphor: 'Open-book exam: the model gets notes before answering.',
    brain: 'Like looking something up in a book or notes before answering.',
    brainLimit: 'A human can judge sources, remember what was read, and understand trust in richer ways. The model still generates likely tokens from retrieved context and learned weights.',
    visual: 'Three lanes: user question, retriever searches a document shelf, retrieved cards enter a transparent context tray, then the model generates response tokens.',
    misconception: 'RAG permanently learned the document, has access to all files, searched the web by itself, is fine-tuning, eliminates hallucinations, or guarantees truth.',
    exercise: 'Play exercise: Open Book or Learned?'
  },
  {
    title: 'Attention',
    definition: 'Attention assigns weighted relevance between token positions.',
    core: 'Each token position can use information from other visible positions in the current context.',
    connects: 'Uses the context window and feeds reshaped information into layer computations.',
    metaphor: 'Spotlights over useful tokens.',
    brain: 'Some context matters more than other context.',
    brainLimit: 'Not human attention, awareness, or desire.',
    visual: 'Weighted arcs between dog/cat sentence tokens.',
    misconception: 'Attention means the model is conscious or focused like a person.',
    exercise: 'Play exercise: Attention Is Relevance.'
  },
  {
    title: 'MLP',
    definition: "An MLP reshapes each token position's feature vector.",
    core: 'After attention mixes information across positions, the MLP transforms features within each position.',
    connects: 'Pairs with attention inside a transformer layer.',
    metaphor: 'A feature forge.',
    brain: 'Like a processing step after using relevant context.',
    brainLimit: 'A learned function over vectors, not a believing neuron.',
    visual: 'Attention arrows feeding per-token feature forge.',
    misconception: 'The MLP does the same job as attention.',
    exercise: 'Play exercise: MLP Feature Reshape.'
  },
  {
    title: 'Layers',
    definition: 'Layers are repeated blocks that refine hidden states.',
    core: 'Layer after layer, attention and MLP operations update temporary token representations.',
    connects: 'Shows how embeddings become richer hidden states.',
    metaphor: 'Editing passes over a draft.',
    brain: 'Like stages of processing.',
    brainLimit: 'Not a human chain of thought.',
    visual: 'Transparent stack with repeated attention and MLP blocks.',
    misconception: 'Layers are a visible reasoning transcript.',
    exercise: 'Journey checkpoint; Play placement later.'
  },
  {
    title: 'Hidden States',
    definition: 'A hidden state is a temporary context-shaped vector for a token at a layer.',
    core: 'It begins from an embedding and changes as layers process the current context.',
    connects: 'Final hidden states lead to logits.',
    metaphor: 'A scratchpad of numbers.',
    brain: 'Like temporary working memory.',
    brainLimit: 'Not permanent memory or private English text.',
    visual: 'Same token changing across contexts and layers.',
    misconception: 'Hidden states are secret saved memories.',
    exercise: 'Play exercise: MLP Feature Reshape.'
  },
  {
    title: 'Logits',
    definition: 'Logits are raw next-token scores.',
    core: 'The final hidden state is projected into one raw score per candidate token.',
    connects: 'Softmax turns these raw scores into probabilities.',
    metaphor: 'A scoreboard before odds.',
    brain: 'Like considering options only metaphorically.',
    brainLimit: 'No intent; just numerical scores.',
    visual: 'Raw candidate score board.',
    misconception: 'Logits are already probabilities.',
    exercise: 'Play exercise: Softmax Funnel.'
  },
  {
    title: 'Softmax',
    definition: 'Softmax converts raw scores into probabilities that sum to one.',
    core: 'It makes the candidate token scores comparable as a distribution.',
    connects: 'Sampling chooses one token from this distribution.',
    metaphor: 'A funnel from points to odds.',
    brain: 'Like relative chances, not confidence.',
    brainLimit: 'Probabilities are not truth or desire.',
    visual: 'Score funnel into probability bars.',
    misconception: 'High probability means factual truth.',
    exercise: 'Play exercise: Softmax Funnel.'
  },
  {
    title: 'Sampling',
    definition: 'Sampling chooses one next token from the probability distribution.',
    core: 'Decoding settings shape how narrow or varied the choice can be.',
    connects: 'The chosen token is appended for autoregression.',
    metaphor: 'A weighted bowl of token tiles.',
    brain: 'Like choosing a word only loosely.',
    brainLimit: 'Selection follows a decoding rule, not intention.',
    visual: 'Vocabulary cloud with one token selected.',
    misconception: 'Sampling is random in a meaningless way.',
    exercise: 'Play exercise: Pick the Next Token.'
  },
  {
    title: 'Autoregression',
    definition: 'Autoregression generates text by next token, append, repeat.',
    core: 'Every generated token becomes part of the next input context.',
    connects: 'Completes the response-generation loop.',
    metaphor: 'A train adding one car at a time.',
    brain: 'Like continuing a thought step by step.',
    brainLimit: 'No hidden full plan is required.',
    visual: 'Loop: score, sample, append, run again.',
    misconception: 'The model writes the whole answer internally all at once.',
    exercise: 'Play exercise: Prompt or Response?'
  },
  {
    title: 'How AI Learns',
    definition: 'AI behavior can change through durable training, retrieval, or temporary steering.',
    core: 'Different mechanisms change weights, context, or instructions, and those differences matter for privacy and trust.',
    connects: 'Reviews the durable-versus-temporary line after the full inference loop.',
    metaphor: 'Revising the textbook versus bringing notes to an open-book exam.',
    brain: 'Learning means prior experience changes later behavior.',
    brainLimit: 'In-context examples are not personal learning.',
    visual: 'Three-column mechanism matrix.',
    misconception: 'Any changed behavior means the model learned permanently.',
    exercise: 'Journey checkpoint plus Play sorting.'
  },
  {
    title: 'Diffusion vs Autoregression',
    definition: 'Diffusion denoises representations step by step instead of appending text tokens.',
    core: 'Many image models start from noise and refine; text LLMs usually append next tokens.',
    connects: 'Prevents overgeneralizing one generative mechanism to all AI.',
    metaphor: 'Developing a photo from static versus writing the next word.',
    brain: 'Both can produce new outputs.',
    brainLimit: 'The mechanisms are different mathematical processes.',
    visual: 'Side-by-side denoise sequence and token loop.',
    misconception: 'All generative AI works like ChatGPT text generation.',
    exercise: 'Journey checkpoint.'
  },
  {
    title: 'Multimodal AI',
    definition: 'Multimodal AI represents or processes multiple media types together.',
    core: 'Text, images, audio, and video can be encoded into connected representations or coordinated model components.',
    connects: 'Shows that the vector idea extends beyond text while mechanisms still differ.',
    metaphor: 'A transit hub for media types.',
    brain: 'People combine senses naturally.',
    brainLimit: 'Machine modalities are engineered representations, not human sensory experience.',
    visual: 'Media paths meeting in a shared representation hub.',
    misconception: 'Multimodal means the model has human senses.',
    exercise: 'Journey checkpoint.'
  },
  {
    title: 'Brain Metaphor and Its Limits',
    definition: 'Brain metaphors help only when the boundaries are explicit.',
    core: 'Neurons, attention, learning, and memory are useful metaphors but can mislead when treated literally.',
    connects: 'Prepares learners for risk literacy without fear or hype.',
    metaphor: 'A map with warning labels.',
    brain: 'The lesson is about using brain metaphors responsibly.',
    brainLimit: 'No consciousness, feelings, lived body, or personal goals.',
    visual: 'Helpful comparison cards paired with break-point cards.',
    misconception: 'Brain-like words imply human-like mind.',
    exercise: 'Play exercise: Brain Metaphor Boundary.'
  },
  {
    title: 'Risk vs Myth',
    definition: 'Risk literacy separates practical harms from magical stories about models.',
    core: 'Real risks come from data exposure, unreliable outputs, bias, integrations, incentives, and over-reliance.',
    connects: 'Applies the whole mechanism model to institutional choices.',
    metaphor: 'A campus safety map.',
    brain: 'Brain metaphors can make risks memorable.',
    brainLimit: 'Do not infer intent or secret self-training from fluent text.',
    visual: 'Risk cards sorted by mechanism.',
    misconception: 'The main risk is that the chat model becomes conscious.',
    exercise: 'Play exercise: Open Book or Learned?'
  },
  {
    title: 'Model Literate Synthesis',
    definition: 'Model literacy means explaining what the system does, what it does not do, and where risk actually lives.',
    core: 'Learners practice the full path from durable training to temporary inference and real-world decision making.',
    connects: 'Closes the day in the life of a prompt with a shareable mental model.',
    metaphor: 'A field guide for the AI era.',
    brain: 'People use models of systems to act wisely.',
    brainLimit: 'Understanding mechanisms does not make the model human.',
    visual: 'Prompt lifecycle map with real-versus-myth overlays.',
    misconception: 'Either fear or hype is enough to understand AI.',
    exercise: 'Journey synthesis reflection; no competitive game.'
  }
]

const firstFiveRewriteDrafts = [
  {
    title: 'What Is an LLM?',
    definition: 'A large language model is a learned system that predicts likely next tokens from the context it can see.',
    where: 'At ordinary use time, it sits between the current context and the next generated response token.',
    core: 'When you send a prompt, the model does not look up a finished answer. It turns the visible context into numbers, runs those numbers through fixed learned weights, scores possible next tokens, selects one, appends it, and repeats.',
    why: 'This lowers the mystery without shrinking the power: the system is not magic, but it is the result of enormous training that shaped many useful patterns.',
    connects: 'Before the prompt arrives, training shapes the weights. Once the prompt arrives, inference uses those weights without normally changing them.',
    metaphor: 'A very large autocomplete engine with learned structure, not a mind or a database.',
    brain: 'Like a brain, many small signals can combine into useful patterns.',
    brainLimit: 'Unlike a brain, an LLM has no lived body, feelings, awareness, personal goals, or human understanding.',
    visual: 'A single prompt card enters a model cloud. Arrows show fixed weights producing logits, softmax probabilities, one sampled token, and a loop back into context.',
    question: 'Which statement best describes an LLM during ordinary use?',
    correct: 'It uses learned weights to predict and generate next tokens.',
    incorrect: ['It becomes conscious while reading', 'It searches a private database for a complete answer'],
    misconception: 'Fluent text does not imply consciousness or database lookup.',
    terms: ['prompt', 'response', 'token', 'weight', 'inference']
  },
  {
    title: 'Two AI Traditions',
    definition: 'Symbolic AI uses explicit rules and symbols; deep learning learns patterns by adjusting many numerical weights.',
    where: 'This distinction sits before the model path so learners know what kind of system an LLM mostly is.',
    core: 'Some AI systems follow rules written by people. LLMs mostly come from deep learning: examples shape weights so the model can produce flexible language behavior without a hand-written rule for every sentence.',
    why: 'It explains why LLMs can be fluent and adaptable but also hard to inspect with simple if-then rules.',
    connects: 'The next lessons show how training creates the learned weights that replace many explicit rules.',
    metaphor: 'A rulebook beside a weather system of learned relationships.',
    brain: 'It is loosely like practice shaping future performance.',
    brainLimit: 'The model is not practicing with intention; optimization changes weights from data.',
    visual: 'A split screen: one path follows rule cards, the other shows many small updates shaping a landscape.',
    question: 'Which tradition best describes modern LLMs?',
    correct: 'Deep learning with learned weights.',
    incorrect: ['A fixed handwritten rulebook', 'A spreadsheet macro'],
    misconception: 'LLMs are not programmed with one explicit rule for every answer.',
    terms: ['symbolic AI', 'deep learning', 'training', 'weight']
  },
  {
    title: 'Training',
    definition: 'Training is the durable process of updating weights from prediction error or another training signal.',
    where: 'It happens before or outside ordinary prompting, usually on specialized infrastructure.',
    core: 'During training, the model predicts a target, gets compared with the target, receives an error signal, and updates weights. Repeating this many times installs durable patterns into the model.',
    why: 'Training is where capability gets built. It is different from a normal chat because the model itself changes.',
    connects: 'Pretraining is broad training; fine-tuning is targeted training; inference uses the trained weights.',
    metaphor: 'Tuning an instrument before a performance.',
    brain: 'Repeated experience can shape later behavior.',
    brainLimit: 'The model is not reflecting on lessons; weights are adjusted by math.',
    visual: 'A loop labeled predict, compare, loss, update weights, repeat, with the weight update highlighted.',
    question: 'What makes training different from ordinary inference?',
    correct: 'Training can durably update model weights.',
    incorrect: ['Training only reads the current context window', 'Training samples the final response token'],
    misconception: 'Normal inference is not the same as training.',
    terms: ['training', 'weight', 'parameter', 'loss', 'inference']
  },
  {
    title: 'Pretraining',
    definition: 'Pretraining is broad early training that durably shapes a model across large datasets.',
    where: 'It happens before a general model is released for everyday prompting.',
    core: 'A pretrained language model has practiced next-token prediction across massive text mixtures. The point is not to save a perfect copy of every source; it is to adjust weights so useful language, factual, stylistic, and task patterns become available later.',
    why: 'Pretraining explains why a model can respond across many topics before any specific campus or course customization.',
    connects: 'Fine-tuning can later adapt this broad base toward particular response styles or domains.',
    metaphor: 'Billions of tiny nudges carving roads through a vast landscape.',
    brain: 'Like broad education only in the loose sense that earlier exposure affects later performance.',
    brainLimit: 'The model does not understand lessons like a person and does not reliably remember sources verbatim.',
    visual: 'Data rain falls over a landscape, slowly carving durable paths labeled grammar, facts, style, tasks.',
    question: 'During pretraining, what changes?',
    correct: 'Model weights change durably.',
    incorrect: ['Only one chat context changes', 'The model writes a final response'],
    misconception: 'Pretraining is durable model shaping, not a live response.',
    terms: ['pretraining', 'training', 'weight', 'inference']
  },
  {
    title: 'Fine-Tuning',
    definition: 'Fine-tuning is targeted additional training after broad pretraining.',
    where: 'It happens after pretraining and before or between deployment cycles.',
    core: 'Fine-tuning uses examples, preferences, or domain data to make future responses more helpful, specialized, or aligned with a task. It may update many weights or add smaller adapter weights, but either way it is more durable than a prompt.',
    why: 'This distinction helps institutions separate model customization from one-time prompting or retrieval.',
    connects: 'After fine-tuning, ordinary inference uses the resulting model to process prompts without normally updating weights.',
    metaphor: 'Adding useful trails through an already huge terrain.',
    brain: 'A bit like coaching someone toward a style of performance.',
    brainLimit: 'The model is not adopting values or intentions; output patterns are being optimized.',
    visual: 'A pretrained landscape with a highlighted trail labeled policy examples, domain examples, preference data.',
    question: 'Which action is most like fine-tuning?',
    correct: 'Additional targeted training that changes future model behavior.',
    incorrect: ['Adding one example to a prompt', 'Retrieving a PDF into context'],
    misconception: 'Fine-tuning is not the same as prompting or RAG.',
    terms: ['fine-tuning', 'pretraining', 'weight', 'prompt', 'response']
  }
]

const ragRewriteDraft = {
  title: 'RAG and Retrieval',
  definition: 'Retrieval-augmented generation, or RAG, retrieves outside information and places it into the model context before generating a response.',
  where: 'During inference, before or during response generation. RAG usually does not change model weights.',
  core: 'A plain LLM answers from learned weights and current context. A RAG system adds a retrieval step: it looks up relevant documents, passages, or database records, then gives those snippets to the model as part of the prompt/context. The response is still generated token by token.',
  why: 'RAG helps explain many institutional AI systems without making the model sound magical. It can improve grounding, but it does not guarantee truth.',
  connects: 'RAG depends on the context window. Retrieved text becomes input context, and the model still uses attention, hidden states, logits, softmax, sampling, and autoregression.',
  metaphor: 'Open-book exam. The model gets notes before answering.',
  brain: 'Like looking something up in a book or notes before answering a question.',
  brainLimit: 'A human can judge sources, remember what was read, and understand trust in richer ways. The model still generates likely response tokens from retrieved context and learned weights.',
  visual: 'Three lanes: User prompt, retriever searches a document shelf, retrieved context cards enter a transparent context tray, and generated response tokens leave the model.',
  question: 'What does RAG usually do?',
  correct: 'Retrieves outside information and places it into the current context.',
  incorrect: [
    'Permanently updates the model weights.',
    'Makes the model conscious of documents.',
    'Guarantees that every answer is true.'
  ],
  misconception: 'RAG is retrieval plus context. It is not training, fine-tuning, permanent memory, omniscient file access, or a hallucination cure.',
  terms: ['RAG', 'retrieval', 'context window', 'input context', 'prompt token', 'response token', 'grounding', 'citation', 'hallucination', 'inference', 'fine-tuning', 'training']
}

await run()

async function run() {
  await mkdir(outDir, { recursive: true })

  const contentData = await loadContentData()
  acts = contentData.acts
  lessons = contentData.lessons

  const exerciseData = await loadExerciseData()
  exercises = exerciseData.exercises
  lessonExerciseIds = exerciseData.lessonExerciseIds

  visualAidCatalog = await loadVisualAidCatalog()

  actById = Object.fromEntries(acts.map((act) => [act.id, act]))
  exerciseById = Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise]))
  visualAidById = Object.fromEntries(visualAidCatalog.map((aid) => [aid.id, aid]))
  inventoryRows = lessons.map((lesson, index) => buildInventoryRow(lesson, index))

  await writeFile(path.join(outDir, 'CONTENT_INVENTORY_V0_6.md'), renderContentInventory(inventoryRows))
  await writeFile(path.join(outDir, 'CONTENT_QUALITY_RUBRIC.md'), renderRubric(inventoryRows))
  await writeFile(path.join(outDir, 'LESSON_CONTENT_MATRIX.md'), renderMatrix(inventoryRows))
  await writeFile(path.join(outDir, 'lesson-content-matrix.json'), `${JSON.stringify(inventoryRows.map(toMatrixJson), null, 2)}\n`)
  await writeFile(path.join(outDir, 'MISCONCEPTION_MAP_V0_6.md'), renderMisconceptionMap(inventoryRows))
  await writeFile(path.join(outDir, 'CURRICULUM_GAPS_V0_6.md'), renderCurriculumGaps(inventoryRows))
  await writeFile(path.join(outDir, 'JOURNEY_ARCHITECTURE_PROPOSAL_V0_6.md'), renderArchitectureProposal())
  await writeFile(path.join(outDir, 'VISUAL_AID_INVENTORY_V0_6.md'), renderVisualAidInventory(inventoryRows))
  await writeFile(path.join(outDir, 'JOURNEY_REWRITE_DRAFT_V0_6.md'), renderRewriteDraft())
  await writeFile(path.join(outDir, 'UI_COPY_CLEANUP_LIST.md'), renderUiCopyCleanup())
  await writeFile(path.join(outDir, 'HOW_TO_REVIEW_LESSON_CARDS.md'), renderReviewCardHowTo())

  console.log(`Content inventory written to ${path.relative(root, outDir)}`)
}
