import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  AttentionArcsAnimation,
  AutoregressiveLoopAnimation,
  ContextWindowSlideAnimation,
  DiffusionDenoiseAnimation,
  EmbeddingLookupAnimation,
  FeatureCloudAnimation,
  FineTuningPathAnimation,
  HiddenStateGlowAnimation,
  InferenceFlowAnimation,
  LearningModeAnimation,
  MlpGearsAnimation,
  MultimodalMixerAnimation,
  SamplingPickAnimation,
  SoftmaxFunnelAnimation,
  TensorBlockAnimation,
  TokenCardsAnimation,
  TrainingLoopAnimation
} from './components/ConceptAnimations'
import { ExerciseShell } from './components/ExerciseSystem'
import { VisualAid, VisualAidGallery, visualAidStyleVariants } from './components/VisualAids'
import { acts, games, glossary, learningModes, lessons } from './data/content'
import { buildLessonReviewProfile, reviewRubricCategories } from './data/contentReview'
import { emptyExerciseProgress, exerciseById, exercises, lessonExerciseIds } from './data/exercises'
import { PROMPT_RUN_FINAL_ID, PROMPT_RUN_SAMPLE, emptyPromptRunProgress, promptRunFinalChallenge, promptRunSteps } from './data/promptRun'
import { attentionExample, canonicalPromptResponse } from './data/canonicalExamples'
import './styles/global.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const ASSET = `${BASE}/assets/promptlife`
// Bump this for each shipped app change; the Badge screen displays it under Start over.
const APP_VERSION = '0.15.0'
const STORAGE_KEYS = {
  lastLocation: 'promptlife:v1:lastLocation',
  lessonId: 'promptlife:v1:lessonId',
  progress: 'promptlife:v1:progress',
  reflections: 'promptlife:v1:reflections',
  gameInsights: 'promptlife:v1:gameInsights',
  exerciseProgress: 'promptlife:v1:exerciseProgress',
  promptRunProgress: 'promptlife:v1:promptRunProgress',
  traceComplete: 'promptlife:v1:traceComplete',
  learningTourComplete: 'promptlife:v1:learningTourComplete'
}
const LEGACY_STORAGE_KEYS = {
  lastLocation: 'pl.tab',
  lessonId: 'pl.lessonId',
  progress: 'pl.completed',
  reflections: 'pl.reflections',
  gameInsights: 'pl.gameInsights',
  exerciseProgress: 'pl.exerciseProgress',
  promptRunProgress: 'pl.promptRunProgress',
  traceComplete: 'pl.traceComplete',
  learningTourComplete: 'pl.learningTourComplete'
}
const PROMPT_LIFE_STORAGE_KEYS = [...Object.values(STORAGE_KEYS), ...Object.values(LEGACY_STORAGE_KEYS)]
const GLOSSARY_RELATED_SECTION = 'Related AI literacy terms'
const GLOSSARY_SECTION_ORDER = [
  'Before Morning',
  'Morning Commute',
  'Workday',
  'Decision Room',
  'The Day Repeats',
  'Twilight: The Wider Landscape',
  'Midnight Ledger',
  'New Dawn',
  GLOSSARY_RELATED_SECTION
]
const GLOSSARY_LEARNING_GROUPS = [
  { firstLessonId: 'what-is-llm', termIds: ['llm'] },
  { firstLessonId: 'history', termIds: ['rationalism', 'empiricism', 'symbolic-ai', 'deep-learning'] },
  { firstLessonId: 'training', termIds: ['training', 'training-data', 'loss', 'weight', 'parameter', 'weight-update'] },
  { firstLessonId: 'pretraining', termIds: ['pretraining', 'next-token'] },
  { firstLessonId: 'overfitting-generalization', termIds: ['overfitting', 'generalization', 'validation-data'] },
  { firstLessonId: 'fine-tuning', termIds: ['fine-tuning', 'adapter'] },
  { firstLessonId: 'alignment', termIds: ['alignment', 'instruction-tuning', 'human-feedback-learning', 'rlhf', 'preference-optimization', 'policy', 'guardrail', 'evaluation'] },
  { firstLessonId: 'inference', termIds: ['inference', 'forward-pass'] },
  { firstLessonId: 'prompt-response', termIds: ['prompt', 'response', 'prompt-tokens', 'response-tokens', 'generated-token', 'completion', 'input-context', 'decoding-step', 'model-output'] },
  { firstLessonId: 'tokens', termIds: ['token', 'tokenizer', 'tokenization'] },
  { firstLessonId: 'token-ids', termIds: ['token-id'] },
  { firstLessonId: 'embeddings', termIds: ['embedding', 'embedding-table'] },
  { firstLessonId: 'vectors', termIds: ['vector', 'feature', 'distributed-representation'] },
  { firstLessonId: 'tensors', termIds: ['tensor', 'activation', 'weight-tensor'] },
  { firstLessonId: 'attention', termIds: ['attention'] },
  { firstLessonId: 'mlp', termIds: ['MLP'] },
  { firstLessonId: 'layers', termIds: ['layer'] },
  { firstLessonId: 'hidden-states', termIds: ['hidden state'] },
  { firstLessonId: 'logits', termIds: ['logits'] },
  { firstLessonId: 'softmax', termIds: ['softmax', 'probability'] },
  { firstLessonId: 'sampling', termIds: ['sampling', 'temperature', 'top-k', 'top-p'] },
  { firstLessonId: 'autoregression', termIds: ['autoregression'] },
  { firstLessonId: 'context-window', termIds: ['context window', 'memory'] },
  { firstLessonId: 'rag-retrieval', termIds: ['rag', 'retrieval'] },
  { firstLessonId: 'grounding', termIds: ['grounding', 'citation'] },
  { firstLessonId: 'hallucinations', termIds: ['hallucination', 'uncertainty'] },
  { firstLessonId: 'how-ai-learns', termIds: ['in-context learning'] },
  { firstLessonId: 'diffusion', termIds: ['diffusion'] },
  { firstLessonId: 'multimodal', termIds: ['multimodal'] },
  { firstLessonId: 'perfect-storm', termIds: ['perfect-storm-term', 'human-feedback-labor', 'compute', 'data-center'] },
  { firstLessonId: 'collective-intelligence', termIds: ['collective-intelligence-term', 'data-provenance', 'consent', 'compensation', 'copyright'] },
  { firstLessonId: 'costs-we-must-count', termIds: ['energy-use', 'water-use', 'carbon-emissions', 'labor-disruption', 'deskilling'] },
  { firstLessonId: 'risk-myth', termIds: ['prompt-injection', 'privacy'] },
  { firstLessonId: 'benefits-worth-taking-seriously', termIds: ['accessibility', 'translation', 'summarization'] },
  { firstLessonId: 'human-centered-ai', termIds: ['human-centered-ai-term', 'dignity', 'common-good'] },
  { firstLessonId: 'better-ai-choice', termIds: ['responsible-ai', 'model-distillation', 'efficient-inference', 'governance'] },
  { firstLessonId: 'effective-prompting-literacy', termIds: ['effective-prompting', 'human-review'] },
  { firstLessonId: 'model-literate-synthesis', termIds: ['model-literacy'] },
  { firstLessonId: null, termIds: ['neural network', 'model-checkpoint'] }
]
const GLOSSARY_LEARNING_HINTS = Object.fromEntries(
  GLOSSARY_LEARNING_GROUPS.flatMap((group, groupIndex) =>
    group.termIds.map((id, termIndex) => [id, {
      firstLessonId: group.firstLessonId,
      learningOrder: groupIndex * 100 + termIndex
    }])
  )
)
const JOURNEY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'essential', label: 'Essential' },
  { id: 'deep', label: 'Deep' },
  { id: 'ethics', label: 'Ethics' }
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReviewRoute() {
  const base = BASE || ''
  const path = base && window.location.pathname.startsWith(base)
    ? window.location.pathname.slice(base.length) || '/'
    : window.location.pathname
  if (path.startsWith('/review/lesson-cards')) return 'lesson-cards'
  if (path.startsWith('/review/visual-aids')) return 'visual-aids'
  if (path.startsWith('/review/style-guide')) return 'style-guide'
  return null
}

function getStored(key, fallback, legacyKey = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
    if (legacyKey) {
      const legacyRaw = localStorage.getItem(legacyKey)
      if (legacyRaw) return JSON.parse(legacyRaw)
    }
    return fallback
  } catch {
    return fallback
  }
}

function useStoredState(key, fallback, legacyKey = null) {
  const [value, setValue] = useState(() => getStored(key, fallback, legacyKey))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Local progress is a convenience. The app still works without storage.
    }
  }, [key, value])

  return [value, setValue]
}

function App() {
  const shellRef = useRef<HTMLElement | null>(null)
  const journeyReturnActRef = useRef(null)
  const reviewRoute = useMemo(() => getReviewRoute(), [])
  const [tab, setTab] = useStoredState(STORAGE_KEYS.lastLocation, 'home', LEGACY_STORAGE_KEYS.lastLocation)
  const [lessonId, setLessonId] = useStoredState(STORAGE_KEYS.lessonId, lessons[0].id, LEGACY_STORAGE_KEYS.lessonId)
  const [lessonMode, setLessonMode] = useState('learn')
  const [completed, setCompleted] = useStoredState(STORAGE_KEYS.progress, [], LEGACY_STORAGE_KEYS.progress)
  const [reflections, setReflections] = useStoredState(STORAGE_KEYS.reflections, {}, LEGACY_STORAGE_KEYS.reflections)
  const [gameInsights, setGameInsights] = useStoredState(STORAGE_KEYS.gameInsights, [], LEGACY_STORAGE_KEYS.gameInsights)
  const [exerciseProgress, setExerciseProgress] = useStoredState(STORAGE_KEYS.exerciseProgress, emptyExerciseProgress(), LEGACY_STORAGE_KEYS.exerciseProgress)
  const [promptRunProgress, setPromptRunProgress] = useStoredState(STORAGE_KEYS.promptRunProgress, emptyPromptRunProgress(), LEGACY_STORAGE_KEYS.promptRunProgress)
  const [traceComplete, setTraceComplete] = useStoredState(STORAGE_KEYS.traceComplete, false, LEGACY_STORAGE_KEYS.traceComplete)
  const [learningTourComplete, setLearningTourComplete] = useStoredState(STORAGE_KEYS.learningTourComplete, false, LEGACY_STORAGE_KEYS.learningTourComplete)
  const [gameId, setGameId] = useState(null)
  const [drawerTerm, setDrawerTerm] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const debugEnabled = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get('debug') === '1'
    } catch {
      return false
    }
  }, [])

  const activeLesson = lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0]
  const activeLessonIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === activeLesson.id))
  const progress = Math.round((completed.length / lessons.length) * 100)
  const nextOpenLesson = lessons.find((lesson) => !completed.includes(lesson.id)) ?? activeLesson
  const activeLessonMode = getLessonMode(activeLesson.id, lessonMode, completed, nextOpenLesson.id)

  useEffect(() => {
    requestAnimationFrame(() => {
      const journeyReturnActId = tab === 'journey' ? journeyReturnActRef.current : null
      if (journeyReturnActId) {
        scrollToJourneySection(journeyReturnActId, shellRef.current)
        journeyReturnActRef.current = null
      } else {
        shellRef.current?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
      const focusTarget = tab === 'learn'
        ? document.getElementById('lesson-title')
        : journeyReturnActId
          ? document.getElementById(`journey-section-title-${journeyReturnActId}`)
        : document.querySelector<HTMLElement>('.screen h1[id]')
      focusTarget?.focus?.({ preventScroll: true })
    })
  }, [tab, lessonId, lessonMode, gameId])

  const completeLesson = useCallback((id) => {
    setCompleted((prev) => prev.includes(id) ? prev : [...prev, id])
  }, [setCompleted])

  const recordReflection = useCallback((id, text) => {
    setReflections((prev) => ({ ...prev, [id]: text }))
  }, [setReflections])

  const recordGameInsight = useCallback((id) => {
    setGameInsights((prev) => prev.includes(id) ? prev : [...prev, id])
  }, [setGameInsights])

  const recordExerciseAttempt = useCallback((exerciseId, payload) => {
    setExerciseProgress((prev) => {
      const base = {
        ...emptyExerciseProgress(),
        ...prev,
        attempts: { ...(prev?.attempts ?? {}) },
        lastAnswers: { ...(prev?.lastAnswers ?? {}) },
        completed: [...(prev?.completed ?? [])],
        insights: [...(prev?.insights ?? [])]
      }
      base.attempts[exerciseId] = (base.attempts[exerciseId] ?? 0) + 1
      base.lastAnswers[exerciseId] = payload.answer
      if (payload.correct) {
        if (!base.completed.includes(exerciseId)) base.completed.push(exerciseId)
        if (!base.insights.includes(exerciseId)) base.insights.push(exerciseId)
      }
      return base
    })
  }, [setExerciseProgress])

  const recordPromptRunAttempt = useCallback((stepId, payload) => {
    setPromptRunProgress((prev) => {
      const base = {
        ...emptyPromptRunProgress(),
        ...prev,
        completedSteps: [...(prev?.completedSteps ?? [])],
        insights: [...(prev?.insights ?? [])],
        revealedSteps: [...(prev?.revealedSteps ?? [])],
        attempts: { ...(prev?.attempts ?? {}) },
        lastAnswers: { ...(prev?.lastAnswers ?? {}) }
      }
      const completesStep = payload.correct || payload.revealed
      base.attempts[stepId] = (base.attempts[stepId] ?? 0) + 1
      base.lastAnswers[stepId] = payload.answer
      if (completesStep && stepId !== PROMPT_RUN_FINAL_ID && !base.completedSteps.includes(stepId)) base.completedSteps.push(stepId)
      if (payload.correct && !base.insights.includes(stepId)) base.insights.push(stepId)
      if (payload.revealed && !base.revealedSteps.includes(stepId)) base.revealedSteps.push(stepId)
      if (completesStep && stepId === PROMPT_RUN_FINAL_ID) base.finalChallengeComplete = true
      return base
    })
  }, [setPromptRunProgress])

  function clearPromptLifeStorage() {
    try {
      PROMPT_LIFE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
    } catch {
      // Reset still updates in-memory state even when storage is unavailable.
    }
  }

  function resetProgress({ confirmReset = true } = {}) {
    if (confirmReset && !window.confirm('Start over? This will clear your Prompt Life progress on this device.')) return
    clearPromptLifeStorage()
    setTab('home')
    setLessonId(lessons[0].id)
    setCompleted([])
    setReflections({})
    setGameInsights([])
    setExerciseProgress(emptyExerciseProgress())
    setPromptRunProgress(emptyPromptRunProgress())
    setTraceComplete(false)
    setLearningTourComplete(false)
    setGameId(null)
    setLessonMode('learn')
    setDrawerTerm(null)
    setStatusMessage('Progress reset. You can begin again.')
  }

  function markFirstLessonComplete() {
    setCompleted([lessons[0].id])
    setLessonId(lessons[1]?.id ?? lessons[0].id)
    setLessonMode('learn')
    setTab('journey')
    setStatusMessage('First lesson marked complete for testing.')
  }

  function markAllLessonsIncomplete() {
    setCompleted([])
    setLessonId(lessons[0].id)
    setLessonMode('learn')
    setStatusMessage('All lessons marked incomplete.')
  }

  function unlockBadgeForTesting() {
    const exerciseIds = exercises.map((exercise) => exercise.id)
    setCompleted(lessons.map((lesson) => lesson.id))
    setGameInsights(games.map((game) => game.id))
    setExerciseProgress({
      completed: exerciseIds,
      attempts: Object.fromEntries(exerciseIds.map((id) => [id, 1])),
      lastAnswers: {},
      insights: exerciseIds
    })
    setPromptRunProgress({
      completedSteps: promptRunSteps.map((step) => step.id),
      finalChallengeComplete: true,
      insights: [...promptRunSteps.map((step) => step.id), PROMPT_RUN_FINAL_ID],
      revealedSteps: [],
      attempts: Object.fromEntries([...promptRunSteps.map((step) => step.id), PROMPT_RUN_FINAL_ID].map((id) => [id, 1])),
      lastAnswers: {}
    })
    setTraceComplete(true)
    setLearningTourComplete(true)
    setTab('badge')
    setStatusMessage('Badge unlocked for visual testing.')
  }

  function clearAllPromptLifeKeysForDebug() {
    if (!window.confirm('Start over? This will clear your Prompt Life progress on this device.')) return
    clearPromptLifeStorage()
    setTab('home')
    setLessonId(lessons[0].id)
    setCompleted([])
    setReflections({})
    setGameInsights([])
    setExerciseProgress(emptyExerciseProgress())
    setPromptRunProgress(emptyPromptRunProgress())
    setTraceComplete(false)
    setLearningTourComplete(false)
    setGameId(null)
    setLessonMode('learn')
    setDrawerTerm(null)
    setStatusMessage('Prompt Life saved progress keys cleared. Reload or reset progress to begin from a blank state.')
  }

  function openLesson(id, mode = 'learn') {
    setLessonId(id)
    setLessonMode(mode)
    setTab('learn')
  }

  function openLessonFromGlossary(id) {
    const mode = completed.includes(id) ? 'review' : 'preview'
    setDrawerTerm(null)
    openLesson(id, mode)
  }

  function openPlayFeature(id) {
    setGameId(id)
    setTab('play')
  }

  function nextLesson() {
    const next = lessons[activeLessonIndex + 1]
    if (next) {
      setLessonId(next.id)
      setLessonMode('learn')
      setTab('learn')
    } else {
      setTab('badge')
    }
  }

  function returnToJourney() {
    journeyReturnActRef.current = activeLesson.act
    setTab('journey')
  }

  if (reviewRoute === 'lesson-cards') {
    return <ReviewLessonCards />
  }

  if (reviewRoute === 'visual-aids') {
    return <VisualAidReviewPage />
  }

  if (reviewRoute === 'style-guide') {
    return <StyleGuideReviewPage />
  }

  return (
    <div className="pl-app">
      <SkipLink />
      <main id="main" className="pl-shell" ref={shellRef}>
        {tab === 'home' && (
          <HomeScreen
            progress={progress}
            nextLessonTitle={nextOpenLesson.title}
            statusMessage={statusMessage}
            onStart={() => openLesson(nextOpenLesson.id, 'learn')}
            onJourney={() => setTab('journey')}
            onPlay={() => setTab('play')}
          />
        )}
        {tab === 'journey' && (
          <JourneyScreen
            completed={completed}
            currentLessonId={nextOpenLesson.id}
            onOpenLesson={openLesson}
            onTrace={() => openPlayFeature('trace-one-prompt')}
            onLearningTour={() => openPlayFeature('how-ai-learns')}
          />
        )}
        {tab === 'learn' && (
          <LessonScreen
            lesson={activeLesson}
            mode={activeLessonMode}
            lessonIndex={activeLessonIndex}
            totalLessons={lessons.length}
            reflection={activeLessonMode === 'preview' ? '' : reflections[activeLesson.id] ?? ''}
            onComplete={completeLesson}
            onNext={nextLesson}
            onReturnToJourney={returnToJourney}
            onReflection={recordReflection}
            onGlossary={setDrawerTerm}
          />
        )}
        {tab === 'play' && (
          <PlayScreen
            gameId={gameId}
            gameInsights={gameInsights}
            traceComplete={traceComplete}
            promptRunProgress={promptRunProgress}
            learningTourComplete={learningTourComplete}
            exerciseProgress={exerciseProgress}
            setGameId={setGameId}
            onGlossary={setDrawerTerm}
            onInsight={recordGameInsight}
            onExerciseAttempt={recordExerciseAttempt}
            onPromptRunAttempt={recordPromptRunAttempt}
            onTraceComplete={() => setTraceComplete(true)}
            onLearningTourComplete={() => setLearningTourComplete(true)}
          />
        )}
        {tab === 'glossary' && <GlossaryScreen onOpen={setDrawerTerm} />}
        {tab === 'badge' && (
          <BadgeScreen
            completed={completed}
            progress={progress}
            gameInsights={gameInsights}
            reflections={reflections}
            exerciseProgress={exerciseProgress}
            promptRunProgress={promptRunProgress}
            statusMessage={statusMessage}
            debugEnabled={debugEnabled}
            onResetProgress={() => resetProgress()}
            onMarkFirstLessonComplete={markFirstLessonComplete}
            onMarkAllLessonsIncomplete={markAllLessonsIncomplete}
            onUnlockBadge={unlockBadgeForTesting}
            onClearAllPromptLifeKeys={clearAllPromptLifeKeysForDebug}
          />
        )}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
      <GlossaryDrawer
        termId={drawerTerm}
        onOpen={setDrawerTerm}
        onClose={() => setDrawerTerm(null)}
        onOpenLesson={openLessonFromGlossary}
      />
    </div>
  )
}

function getLessonMode(lessonId, requestedMode, completed, currentLessonId) {
  if (requestedMode === 'preview' || requestedMode === 'review') return requestedMode
  if (completed.includes(lessonId)) return 'review'
  if (lessonId !== currentLessonId) return 'preview'
  return 'learn'
}

function SkipLink() {
  return <a className="skip-link" href="#main">Skip to content</a>
}

function HomeScreen({ progress, nextLessonTitle, statusMessage, onStart, onJourney, onPlay }) {
  return (
    <section className="screen home-screen" aria-labelledby="home-title">
      {statusMessage && <p className="feedback good" role="status">{statusMessage}</p>}
      <div className="home-hero">
        <img className="brand-mark" src={`${ASSET}/brand/promptlife-mark.svg`} alt="Prompt Life logo" />
        <p className="eyebrow">A day in the life of a prompt</p>
        <h1 id="home-title">Prompt Life</h1>
        <p className="lede">Model literacy for the AI era: clear mechanics, useful metaphors, and a little play.</p>
        <picture>
          <source media="(min-width: 700px)" srcSet={`${ASSET}/illustrations/scene-hero-feature-cloud.png`} />
          <img className="hero-art" src={`${ASSET}/illustrations/scene-hero-feature-cloud@mobile.png`} alt="A prompt traveling through a glowing feature cloud" />
        </picture>
      </div>

      <section className="progress-panel" aria-labelledby="progress-title">
        <div>
          <p className="eyebrow">Current path</p>
          <h2 id="progress-title">{progress ? 'Continue learning' : 'Start at the beginning'}</h2>
          <p>{progress}% complete. Next stop: {nextLessonTitle}.</p>
        </div>
        <ProgressRing progress={progress} label={`${progress}% complete`} />
        <button className="primary-btn" onClick={onStart}>{progress ? 'Continue journey' : 'Start journey'}</button>
      </section>

      <section className="idea-panel" aria-labelledby="big-idea">
        <h2 id="big-idea">Big idea</h2>
        <p>An LLM is not a mind, not a database, and not magic. It is a learned prediction machine that turns context into next-token probabilities.</p>
      </section>

      <div className="quick-actions" aria-label="Quick actions">
        <button className="secondary-btn" onClick={onJourney}>View map</button>
        <button className="secondary-btn" onClick={onPlay}>Try mini-games</button>
      </div>

      <div className="chip-row" aria-label="Prompt Life pillars">
        <Pillar icon="icon-tokens" label="Definitions" />
        <Pillar icon="icon-attention" label="Relationships" />
        <Pillar icon="icon-vocabulary-cloud" label="Metaphors" />
      </div>
    </section>
  )
}

function ProgressRing({ progress, label }) {
  return (
    <div className="progress-ring" role="img" aria-label={label} style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}>
      <span>{progress}%</span>
    </div>
  )
}

function Pillar({ icon, label }) {
  return (
    <span className="pillar-chip">
      <img src={`${ASSET}/icons/png/${icon}@48.png`} alt="" aria-hidden="true" />
      {label}
    </span>
  )
}

function JourneyScreen({ completed, currentLessonId, onOpenLesson, onTrace, onLearningTour }) {
  const [pathFilter, setPathFilter] = useState('all')
  const currentActId = lessons.find((lesson) => lesson.id === currentLessonId)?.act ?? acts[0].id
  const visibleLessons = lessons.filter((lesson) => matchesJourneyPathFilter(lesson, pathFilter))
  const visibleActs = acts.filter((act) => visibleLessons.some((lesson) => lesson.act === act.id))
  const [activeStageId, setActiveStageId] = useState(currentActId)
  const activeFilter = JOURNEY_FILTERS.find((filter) => filter.id === pathFilter) ?? JOURNEY_FILTERS[0]
  const filterSummary = pathFilter === 'all'
    ? `Showing all ${visibleLessons.length} Journey cards across ${visibleActs.length} stages.`
    : `Showing ${visibleLessons.length} ${activeFilter.label} cards across ${visibleActs.length} stages.`

  useEffect(() => {
    setActiveStageId(visibleActs.some((act) => act.id === currentActId)
      ? currentActId
      : visibleActs[0]?.id ?? acts[0].id)
  }, [currentActId, pathFilter])

  function handleStageSelect(actId) {
    setActiveStageId(actId)
    scrollToJourneySection(actId)
  }

  return (
    <section className="screen journey-screen" aria-labelledby="journey-title">
      <ScreenHeader
        kicker="Main path"
        title="Today in Prompt Life"
        subtitle="Follow one prompt from before training through inference, generation, and model literacy."
        titleId="journey-title"
      />
      <p className="stage-jump-hint">Jump to a stage of the prompt’s day.</p>
      <StageTimeline
        currentActId={activeStageId}
        items={visibleActs}
        onStageSelect={handleStageSelect}
      />
      <section className="path-filter-panel" aria-labelledby="journey-filter-title">
        <div>
          <p className="eyebrow">Path view</p>
          <h2 id="journey-filter-title">Choose a path</h2>
          <p>All cards follow the full day. Essential is the shortest path. Deep adds mechanics. Ethics follows costs, choices, and human consequences.</p>
        </div>
        <div className="segmented-control path-filter-control" aria-label="Filter Journey cards by path">
          {JOURNEY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              className={pathFilter === filter.id ? 'active' : ''}
              onClick={() => setPathFilter(filter.id)}
              aria-pressed={pathFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="filter-summary" role="status">{filterSummary}</p>
      </section>
      <section className="tour-feature-panel" aria-labelledby="guided-tours-title">
        <div>
          <p className="eyebrow">Guided comparisons</p>
          <h2 id="guided-tours-title">Run and compare</h2>
          <p>Use these when the map feels abstract: one guides a prompt through the model, the other compares how AI systems learn.</p>
        </div>
        <div className="tour-actions">
          <button className="secondary-btn" onClick={onTrace}>Prompt Run</button>
          <button className="secondary-btn" onClick={onLearningTour}>How AI Learns</button>
        </div>
      </section>
      <div className="journey-list">
        {visibleActs.map((act) => {
          const actLessons = visibleLessons.filter((lesson) => lesson.act === act.id)
          return (
            <section
              id={`journey-section-${act.id}`}
              className={`act-section act-section-${act.id}`}
              key={act.id}
              aria-labelledby={`journey-section-title-${act.id}`}
            >
              <div className="act-heading">
                <span aria-hidden="true">{act.number}</span>
                <div>
                  <h2 id={`journey-section-title-${act.id}`} tabIndex={-1}>{act.name}</h2>
                  <p>{act.summary}</p>
                </div>
              </div>
              <SectionIntroCard act={act} />
              {actLessons.map((lesson) => {
                const done = completed.includes(lesson.id)
                const current = lesson.id === currentLessonId
                const lessonNumber = lessons.findIndex((item) => item.id === lesson.id) + 1
                const mode = done ? 'review' : current ? 'learn' : 'preview'
                const actionLabel = done ? 'Review' : current ? (completed.length ? 'Continue' : 'Start') : 'Preview'
                const pathLabel = getPathLabel(lesson.pathType)
                return (
                  <button
                    className={current ? 'lesson-row is-current' : 'lesson-row'}
                    key={lesson.id}
                    onClick={() => onOpenLesson(lesson.id, mode)}
                    aria-label={`${lessonNumber}. ${lesson.title}. ${actionLabel}. ${pathLabel}.`}
                  >
                    <span className="lesson-row-number" aria-hidden="true">{lessonNumber}</span>
                    <span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.subtitle}</small>
                      <span className="lesson-row-meta">
                        <em>{pathLabel}</em>
                        <b>{actionLabel}</b>
                      </span>
                    </span>
                    <span className={done ? 'complete-dot is-complete' : 'complete-dot'} aria-hidden="true">{done ? '✓' : current ? '•' : ''}</span>
                  </button>
                )
              })}
            </section>
          )
        })}
      </div>
    </section>
  )
}

function getPathLabel(pathType) {
  const labels = {
    essential: 'Essential',
    deep: 'Deep',
    ethics: 'Ethics',
    'side-tour': 'Deep'
  }
  return labels[pathType] ?? 'Essential'
}

function matchesJourneyPathFilter(lesson, filterId) {
  if (filterId === 'all') return true
  return getPathLabel(lesson.pathType).toLowerCase() === filterId
}

function getReviewAction(lesson) {
  if (['how-ai-learns', 'risk-myth'].includes(lesson.id)) return 'revise'
  if (['history', 'pretraining', 'overfitting-generalization', 'layers', 'diffusion', 'multimodal'].includes(lesson.id)) return 'defer'
  return 'keep'
}

function hasSourceNeeds(lesson) {
  return ['ethics', 'deep'].includes(lesson.pathType) ||
    ['rag-retrieval', 'grounding', 'hallucinations', 'alignment', 'perfect-storm', 'benefits-worth-taking-seriously', 'costs-we-must-count', 'human-centered-ai', 'better-ai-choice', 'risk-myth'].includes(lesson.id)
}

function hasVisualNeeds(lesson) {
  return ['perfect-storm', 'collective-intelligence', 'benefits-worth-taking-seriously', 'costs-we-must-count', 'human-centered-ai', 'better-ai-choice', 'effective-prompting-literacy', 'model-literate-synthesis'].includes(lesson.id)
}

function scrollToJourneySection(actId, shell = document.querySelector<HTMLElement>('.pl-shell')) {
  const target = document.getElementById(`journey-section-${actId}`)
  if (!shell || !target) return
  const shellRect = shell.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const top = shell.scrollTop + targetRect.top - shellRect.top - 12
  shell.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  document.getElementById(`journey-section-title-${actId}`)?.focus?.({ preventScroll: true })
}

function StageTimeline({ currentActId, items = acts, onStageSelect = null }) {
  return (
    <ol className="stage-timeline" aria-label="Prompt Life stages">
      {items.map((act) => (
        <li key={act.id} className={act.id === currentActId ? 'active' : ''}>
          {onStageSelect ? (
            <button
              className="stage-link"
              onClick={() => onStageSelect(act.id)}
              aria-current={act.id === currentActId ? 'step' : undefined}
              aria-label={`Jump to ${act.name}. ${act.navHint}`}
            >
              <span>{act.number}</span>
              <strong>{act.name}</strong>
              <small>{act.navHint}</small>
            </button>
          ) : (
            <>
              <span>{act.number}</span>
              <strong>{act.name}</strong>
            </>
          )}
        </li>
      ))}
    </ol>
  )
}

function SectionIntroCard({ act }) {
  return (
    <div className={`section-intro-card section-intro-${act.id}`} aria-label={`${act.name} focus`}>
      <span className="section-motif" aria-hidden="true" />
      <p>{act.promptMoment}</p>
      <dl>
        <div><dt>Focus</dt><dd>{act.focus}</dd></div>
        <div><dt>Keep clear</dt><dd>{act.keyDistinction}</dd></div>
      </dl>
    </div>
  )
}

function LessonScreen({ lesson, mode, lessonIndex, totalLessons, reflection, onComplete, onNext, onReturnToJourney, onReflection, onGlossary }) {
  const [choice, setChoice] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [continueHint, setContinueHint] = useState(false)
  const [draftReflection, setDraftReflection] = useState(reflection)
  const checkpointRef = useRef<HTMLElement | null>(null)
  const canUpdateProgress = mode === 'learn'
  const definition = lesson.oneSentenceDefinition ?? lesson.definition
  const coreExplanation = lesson.coreExplanation ?? lesson.definition
  const whereItHappens = lesson.whereItHappens ?? lesson.where
  const durableVsTemporary = lesson.durableVsTemporary
  const promptVsResponseNote = lesson.promptVsResponseNote
  const whyItMatters = lesson.whyItMatters ?? lesson.why
  const howItConnects = lesson.howItConnects ?? lesson.relationship
  const selectedAnswer = choice == null ? null : lesson.quiz.choices[choice]
  const isCorrect = selectedAnswer === lesson.quiz.answer
  const relatedTerms = useMemo(() => {
    return lesson.terms
      .map((term) => findGlossaryTerm(term))
      .filter(Boolean)
  }, [lesson.terms])

  useEffect(() => {
    setChoice(null)
    setRevealed(false)
    setContinueHint(false)
    setDraftReflection(mode === 'preview' ? '' : reflection)
  }, [lesson.id, mode, reflection])

  function saveAndContinue() {
    if (!canUpdateProgress) {
      onReturnToJourney()
      return
    }
    if (!isCorrect) {
      setContinueHint(true)
      checkpointRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
      return
    }
    onComplete(lesson.id)
    onNext()
  }

  return (
    <section className="screen lesson-screen" aria-labelledby="lesson-title">
      <header className="lesson-hero" aria-labelledby="lesson-title">
        <div className="lesson-progress-row">
          <span>{lesson.actLabel}</span>
          <span>{lessonIndex + 1} / {totalLessons}</span>
        </div>
        <div className="lesson-progress" aria-label={`Lesson ${lessonIndex + 1} of ${totalLessons}`}>
          <span style={{ width: `${((lessonIndex + 1) / totalLessons) * 100}%` }} />
        </div>
        <StageTimeline currentActId={lesson.act} />
        <h1 id="lesson-title" tabIndex={-1}>{lesson.title}</h1>
        <p className="lede small">{lesson.subtitle}</p>
        <p className="lesson-definition">{definition}</p>
        {mode === 'preview' && <p className="mode-note" role="status">Previewing this card. Progress will not change.</p>}
        {mode === 'review' && <p className="mode-note" role="status">Reviewing a completed card.</p>}
        {relatedTerms.length > 0 && (
          <div className="term-row compact" aria-label="Related glossary terms">
            {relatedTerms.map((term) => (
              <button key={term.id} onClick={() => onGlossary(term.id)}>{term.term}</button>
            ))}
          </div>
        )}
      </header>

      <section className="lesson-panel visual-aid-panel" aria-labelledby="visual-aid-title">
        <span className="step-label">Visual aid</span>
        <h2 id="visual-aid-title">What to picture</h2>
        <VisualAid id={lesson.visualAidId} headingId="visual-aid-title" />
      </section>

      <section className="lesson-panel core-panel" aria-labelledby="core-idea-title">
        <span className="step-label">Core idea</span>
        <h2 id="core-idea-title">Core idea</h2>
        <p>{coreExplanation}</p>
        <dl className="lesson-detail-grid">
          {lesson.stageType && <div><dt>Model lifecycle</dt><dd>{stageLabel(lesson.stageType)}</dd></div>}
          <div><dt>Where it happens</dt><dd>{whereItHappens}</dd></div>
          {durableVsTemporary && <div><dt>Durable or temporary</dt><dd>{durableVsTemporary}</dd></div>}
          {promptVsResponseNote && <div><dt>Prompt vs response</dt><dd>{promptVsResponseNote}</dd></div>}
          <div><dt>Why it matters</dt><dd>{whyItMatters}</dd></div>
          {lesson.misconception && <div><dt>Misconception corrected</dt><dd>{lesson.misconception}</dd></div>}
        </dl>
      </section>

      <section className="lesson-panel connection-panel" aria-labelledby="connect-title">
        <span className="step-label">How it connects</span>
        <h2 id="connect-title">One relationship</h2>
        <p>{howItConnects}</p>
      </section>

      <section className="lesson-panel metaphor-panel" aria-labelledby="metaphor-title">
        <span className="step-label">Metaphor</span>
        <h2 id="metaphor-title">Useful picture</h2>
        <p>{lesson.metaphor}</p>
      </section>

      <BrainBridge bridge={lesson.brainBridge} />

      {lesson.id === 'prompt-response' && (
        <PromptVsResponseBox includeDemo />
      )}

      <section className="lesson-panel interaction-card" aria-labelledby="interaction-title">
        <span className="step-label">Tiny interaction</span>
        <h2 id="interaction-title">{lesson.interaction.title}</h2>
        <MicroInteraction type={lesson.interaction.type} />
        <p>{lesson.interaction.copy}</p>
      </section>

      <section ref={checkpointRef} className="lesson-panel quiz-card" aria-labelledby="quiz-title">
        <span className="step-label">Checkpoint</span>
        <Checkpoint
          quiz={lesson.quiz}
          choice={choice}
          setChoice={(index) => {
            setChoice(index)
            setRevealed(true)
            setContinueHint(false)
          }}
          revealed={revealed}
        />
        {continueHint && (
          <p className="feedback" role="status">
            <strong>Try the checkpoint first.</strong> Choose the best answer, then the continue button will move you forward.
          </p>
        )}
      </section>

      <section className="lesson-panel reflection-card" aria-labelledby="reflection-title">
        <span className="step-label">Reflect</span>
        <h2 id="reflection-title">Teach it back in one sentence.</h2>
        <label>
          <span className="sr-only">Reflection for {lesson.title}</span>
          <textarea
            value={canUpdateProgress ? reflection : draftReflection}
            onChange={(event) => {
              if (canUpdateProgress) {
                onReflection(lesson.id, event.target.value)
              } else {
                setDraftReflection(event.target.value)
              }
            }}
            readOnly={!canUpdateProgress}
            placeholder={canUpdateProgress ? "Example: Inference uses the model's weights but does not rewrite them." : 'Reflection is available in Learn mode.'}
            rows={3}
          />
        </label>
      </section>

      <button className={isCorrect || !canUpdateProgress ? 'primary-btn sticky-action is-ready' : 'primary-btn sticky-action'} onClick={saveAndContinue}>
        {!canUpdateProgress ? 'Return to Journey' : isCorrect ? (lessonIndex + 1 === totalLessons ? 'Finish and view badge' : 'Next lesson') : choice == null ? 'Answer checkpoint to continue' : 'Retry checkpoint to continue'}
      </button>
    </section>
  )
}

function BrainBridge({ bridge }) {
  if (!bridge) return null
  return (
    <section className="lesson-panel brain-bridge" aria-labelledby="brain-bridge-title">
      <span className="step-label">Brain bridge</span>
      <h2 id="brain-bridge-title">Helpful, then limited</h2>
      <dl>
        <div>
          <dt>Helpful comparison</dt>
          <dd>{bridge.metaphor}</dd>
        </div>
        <div>
          <dt>Where it breaks</dt>
          <dd>{bridge.limit}</dd>
        </div>
      </dl>
    </section>
  )
}

function stageLabel(stageType) {
  const labels = {
    architecture: 'architecture / model background',
    pretraining: 'training before ordinary use',
    'fine-tuning': 'targeted training after pretraining',
    alignment: 'behavior shaping and system design',
    inference: 'ordinary model use',
    'prompt-processing': 'prompt processing',
    'response-generation': 'response generation',
    'retrieval-inference': 'retrieval during inference',
    'risk-ethics': 'risk and ethics',
    'social-ethics': 'social and ethical context',
    'responsible-use': 'responsible AI use',
    'model-literacy': 'model literacy synthesis',
    prompting: 'prompting and context'
  }
  return labels[stageType] ?? stageType
}

function matchesGlossaryTerm(item, value) {
  const normalized = String(value).toLowerCase()
  return item.id === value ||
    item.term.toLowerCase() === normalized ||
    item.aliases?.some((alias) => alias.toLowerCase() === normalized)
}

function findGlossaryTerm(value) {
  return glossary.find((item) => matchesGlossaryTerm(item, value))
}

function getGlossaryHint(item) {
  const aliasHint = item.aliases?.map((alias) => GLOSSARY_LEARNING_HINTS[alias]).find(Boolean)
  return GLOSSARY_LEARNING_HINTS[item.id] ||
    GLOSSARY_LEARNING_HINTS[item.term] ||
    GLOSSARY_LEARNING_HINTS[item.term.toLowerCase()] ||
    aliasHint ||
    null
}

function getGlossarySection(lesson) {
  if (!lesson) return GLOSSARY_RELATED_SECTION
  return acts.find((act) => act.id === lesson.act)?.name ?? GLOSSARY_RELATED_SECTION
}

function findFirstLessonForTerm(item) {
  return lessons.find((lesson) => lesson.terms?.some((term) => matchesGlossaryTerm(item, term)))
}

function getGlossaryLearningMetadata(item) {
  const hint = getGlossaryHint(item)
  const hintedLesson = hint?.firstLessonId
    ? lessons.find((lesson) => lesson.id === hint.firstLessonId)
    : null
  const firstLesson = hintedLesson ?? findFirstLessonForTerm(item)
  const lessonIndex = firstLesson ? lessons.findIndex((lesson) => lesson.id === firstLesson.id) : -1
  const hasMappedLesson = Boolean(firstLesson)
  const section = hasMappedLesson ? getGlossarySection(firstLesson) : GLOSSARY_RELATED_SECTION
  const sectionIndex = GLOSSARY_SECTION_ORDER.indexOf(section)
  const journeyOrder = hint?.learningOrder ?? (lessonIndex >= 0 ? lessonIndex * 100 : Number.MAX_SAFE_INTEGER)

  return {
    firstLessonId: firstLesson?.id ?? null,
    firstLessonTitle: firstLesson?.title ?? null,
    journeyOrder,
    pathLabel: firstLesson ? getPathLabel(firstLesson.pathType) : null,
    section,
    sectionIndex: sectionIndex >= 0 ? sectionIndex : GLOSSARY_SECTION_ORDER.length - 1
  }
}

function getGlossarySearchText(item) {
  const meta = getGlossaryLearningMetadata(item)
  return [
    item.term,
    ...(item.aliases ?? []),
    item.definition,
    item.relationship,
    item.metaphor,
    item.brainMetaphor,
    item.brainLimit,
    item.confused,
    ...(item.related ?? []),
    meta.firstLessonTitle,
    meta.section,
    meta.pathLabel
  ].filter(Boolean).join(' ').toLowerCase()
}

function sortGlossaryTerms(items, sortMode) {
  const sorted = [...items]
  if (sortMode === 'learning') {
    return sorted.sort((a, b) => {
      const metaA = getGlossaryLearningMetadata(a)
      const metaB = getGlossaryLearningMetadata(b)
      return metaA.sectionIndex - metaB.sectionIndex ||
        metaA.journeyOrder - metaB.journeyOrder ||
        a.term.localeCompare(b.term)
    })
  }
  return sorted.sort((a, b) => a.term.localeCompare(b.term))
}

function groupGlossaryTermsBySection(items) {
  return items.reduce((groups, item) => {
    const meta = getGlossaryLearningMetadata(item)
    const key = meta.firstLessonId ? meta.section : GLOSSARY_RELATED_SECTION
    const existing = groups.find((group) => group.section === key)
    if (existing) {
      existing.terms.push(item)
    } else {
      groups.push({ section: key, terms: [item] })
    }
    return groups
  }, [])
}

function Checkpoint({ quiz, choice, setChoice, revealed }) {
  const selectedAnswer = choice == null ? null : quiz.choices[choice]
  const isCorrect = selectedAnswer === quiz.answer
  const feedback = selectedAnswer && quiz.feedback?.[selectedAnswer] ? quiz.feedback[selectedAnswer] : quiz.explain
  const feedbackHasLead = !isCorrect && typeof feedback === 'string' && feedback.startsWith('Not quite.')

  return (
    <>
      <h2 id="quiz-title">{quiz.question}</h2>
      <div className="answer-list" role="list">
        {quiz.choices.map((answer, index) => {
          const selected = choice === index
          const answerIsCorrect = answer === quiz.answer
          const className = [
            'answer',
            selected ? 'is-selected' : '',
            revealed && selected && answerIsCorrect ? 'is-correct' : '',
            revealed && selected && !answerIsCorrect ? 'is-wrong' : ''
          ].filter(Boolean).join(' ')

          return (
            <button
              key={answer}
              className={className}
              onClick={() => setChoice(index)}
              aria-pressed={selected}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <strong>{answer}</strong>
            </button>
          )
        })}
      </div>
      {revealed && (
        <p className={isCorrect ? 'feedback good' : 'feedback'} role="status">
          {isCorrect && <strong>Insight unlocked.</strong>}
          {!isCorrect && !feedbackHasLead && <strong>Not quite.</strong>}
          {' '}{feedback}
          {!isCorrect && <span> Choose another answer to retry.</span>}
        </p>
      )}
    </>
  )
}

function ConceptBlock({ label, text, terms = [], onGlossary = null }) {
  const relatedTerms = useMemo(() => {
    return terms
      .map((term) => findGlossaryTerm(term))
      .filter(Boolean)
  }, [terms])

  return (
    <section className="concept-card">
      <span>{label}</span>
      <p>{text}</p>
      {relatedTerms.length > 0 && onGlossary && (
        <div className="term-row" aria-label="Related glossary terms">
          {relatedTerms.map((term) => (
            <button key={term.id} onClick={() => onGlossary(term.id)}>{term.term}</button>
          ))}
        </div>
      )}
    </section>
  )
}

function InfoCallout({ title, children }) {
  return (
    <div className="info-callout">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

function TokenPill({ token, kind }) {
  const labels = {
    prompt: 'Prompt token',
    response: 'Response token',
    context: 'Context token',
    system: 'Instruction token'
  }

  return <span className={`token-pill ${kind}`}>{labels[kind]}: {token}</span>
}

function TokenLegend() {
  return (
    <div className="token-legend" aria-label="Token color and label legend">
      <span><i className="prompt" />Prompt = given to the model.</span>
      <span><i className="response" />Response = generated by the model.</span>
      <span><i className="context" />Context = everything currently visible.</span>
    </div>
  )
}

function PromptOrResponseDemo() {
  const generated = [canonicalPromptResponse.chosenNextToken, '.']
  const [count, setCount] = useState(0)
  const responseTokens = generated.slice(0, count)
  const candidates = count === 0 ? canonicalPromptResponse.nextTokenCandidates : ['.', 'and', 'then']

  return (
    <section className="prompt-response-demo" aria-labelledby="prompt-response-demo-title">
      <h3 id="prompt-response-demo-title">Prompt or Response?</h3>
      <TokenLegend />
      <div className="demo-row" aria-label="Prompt tokens">
        <strong>User prompt</strong>
        <div><TokenPill token={canonicalPromptResponse.userPrompt} kind="prompt" /></div>
      </div>
      <div className="demo-row" aria-label="Response so far">
        <strong>Response so far</strong>
        <div>
          {canonicalPromptResponse.responseSoFarTokens.map((token, index) => <TokenPill key={`so-far-${index}-${token}`} token={token} kind="response" />)}
        </div>
      </div>
      <div className="demo-row" aria-label="Next-token candidates">
        <strong>Next-token candidates</strong>
        <div>{candidates.map((token) => <span className="candidate-pill" key={token}>{token}</span>)}</div>
      </div>
      <div className="demo-row" aria-label="Generated response token">
        <strong>Generated response token</strong>
        <div>{responseTokens.length ? responseTokens.map((token) => <TokenPill key={token} token={token} kind="response" />) : <span className="empty-note inline">None yet.</span>}</div>
      </div>
      <div className="demo-row" aria-label="Current context for the next forward pass">
        <strong>Current context for the next forward pass</strong>
        <div>
          <TokenPill token="User prompt" kind="prompt" />
          {canonicalPromptResponse.responseSoFarTokens.map((token, index) => <TokenPill key={`context-so-far-${index}-${token}`} token={token} kind="response" />)}
          {responseTokens.map((token, index) => <TokenPill key={`context-response-${index}-${token}`} token={token} kind="response" />)}
        </div>
      </div>
      <button className="secondary-btn" onClick={() => setCount((count + 1) % (generated.length + 1))}>Next token</button>
      <p>Once <strong>{canonicalPromptResponse.chosenNextToken}</strong> is generated, it becomes part of the context for the next step.</p>
    </section>
  )
}

function PromptVsResponseBox({ includeDemo = true }) {
  return (
    <section className="lesson-panel prompt-response-box" aria-labelledby="prompt-response-title">
      <span className="step-label">Prompt vs Response</span>
      <h2 id="prompt-response-title">The response grows one token at a time.</h2>
      <p>The model does not process the prompt once and then write a whole answer.</p>
      <ol>
        <li>The current context enters the model.</li>
        <li>The model predicts probabilities for the next token.</li>
        <li>One token is chosen.</li>
        <li>That token is appended to the context.</li>
        <li>The model runs again.</li>
        <li>The response grows one token at a time.</li>
      </ol>
      {includeDemo && <PromptOrResponseDemo />}
    </section>
  )
}

function MicroInteraction({ type }) {
  if (type === 'training') return <TrainingLoopAnimation />
  if (type === 'fine-tune') return <FineTuningPathAnimation />
  if (type === 'inference') return <InferenceFlowAnimation />
  if (type === 'tokens') return <TokenCardsAnimation />
  if (type === 'embeddings') return <EmbeddingLookupAnimation />
  if (type === 'tensor') return <TensorBlockAnimation />
  if (type === 'attention') return <AttentionArcsAnimation />
  if (type === 'mlp') return <MlpGearsAnimation />
  if (type === 'hidden') return <HiddenStateGlowAnimation />
  if (type === 'softmax') return <SoftmaxFunnelAnimation />
  if (type === 'sampling') return <SamplingPickAnimation />
  if (type === 'autoregressive') return <AutoregressiveLoopAnimation />
  if (type === 'context') return <ContextWindowSlideAnimation />
  if (type === 'diffusion') return <DiffusionDenoiseAnimation />
  if (type === 'multimodal') return <MultimodalMixerAnimation />
  if (type === 'risk') return <RiskSortDemo />
  return <FeatureCloudAnimation />
}

function TrainingLoopDemo() {
  const [step, setStep] = useState(0)
  const labels = ['predict', 'compare', 'update weights', 'repeat']
  return (
    <div className="loop-demo">
      <button onClick={() => setStep((step + 1) % labels.length)} aria-label="Advance training loop demo">Advance loop</button>
      <div>
        {labels.map((label, index) => (
          <span key={label} className={index === step ? 'active' : ''}>{label}</span>
        ))}
      </div>
      <p>{labels[step] === 'update weights' ? 'Insight unlocked: training is the durable weight-changing step.' : `Current step: ${labels[step]}.`}</p>
    </div>
  )
}

function InferenceDemo() {
  const [step, setStep] = useState(0)
  const stages = ['input tokens', 'forward pass', 'logits', 'sample token']
  return (
    <div className="inference-demo">
      <button onClick={() => setStep((step + 1) % stages.length)}>Advance forward pass</button>
      <ol aria-label="Inference stages">
        {stages.map((stage, index) => (
          <li key={stage} className={index === step ? 'active' : ''}>{stage}</li>
        ))}
      </ol>
      <p>No durable weight update happens in this path.</p>
      {step === stages.length - 1 && <p className="mini-insight">Insight unlocked: inference can choose a token without retraining the model.</p>}
    </div>
  )
}

function TokenizeDemo() {
  const [split, setSplit] = useState(false)
  const tokens = canonicalPromptResponse.responseTokens
  return (
    <div className="token-demo">
      <button onClick={() => setSplit(!split)} aria-label="Toggle tokenization demo">{split ? 'Join prompt' : 'Split prompt'}</button>
      <div>{split ? tokens.map((token, index) => <span key={`${token}-${index}`}>{token}</span>) : <strong>{canonicalPromptResponse.generatedResponse}</strong>}</div>
      <p>{split ? 'Insight unlocked: text becomes chunks before it becomes vectors.' : 'Tap to reveal the chunks the model sees.'}</p>
    </div>
  )
}

function EmbeddingDemo() {
  const [token, setToken] = useState('bank')
  const vectors = {
    bank: ['0.14', '-0.37', '0.82'],
    light: ['0.51', '0.09', '-0.22'],
    prompt: ['-0.06', '0.74', '0.33']
  }

  return (
    <div className="embedding-demo">
      <div className="segmented-control" aria-label="Choose token">
        {Object.keys(vectors).map((item) => (
          <button key={item} className={token === item ? 'active' : ''} onClick={() => setToken(item)}>{item}</button>
        ))}
      </div>
      <div className="vector-card" aria-live="polite">
        <span>{token}</span>
        <code>[{vectors[token].join(', ')}]</code>
      </div>
      <p>Insight unlocked: that vector is the learned starting point. Context later reshapes it into hidden states.</p>
    </div>
  )
}

function AttentionDemo() {
  const [target, setTarget] = useState(8)
  return (
    <div className="attention-demo" role="group" aria-label="Attention relevance demo">
      {attentionExample.tokens.map((token, index) => (
        <button key={token + index} className={target === index ? 'active' : ''} onClick={() => setTarget(index)}>{token}</button>
      ))}
      <div className="spotlight-line" style={{ transform: `translateX(${Math.min(4, target) * 20}%)` }} />
      <p>Selected token: <strong>{attentionExample.tokens[target]}</strong>. In this example, <strong>it</strong> most likely points to <strong>cat</strong>. Attention is relevance, not awareness.</p>
    </div>
  )
}

function MlpDemo() {
  const [feature, setFeature] = useState('task')
  const copy = {
    syntax: 'sentence role',
    tone: 'academic voice',
    task: 'explain simply'
  }

  return (
    <div className="mlp-demo">
      <div className="segmented-control" aria-label="Choose feature to reshape">
        {Object.keys(copy).map((item) => (
          <button key={item} className={feature === item ? 'active' : ''} onClick={() => setFeature(item)}>{item}</button>
        ))}
      </div>
      <div className="feature-transform" aria-live="polite">
        <span>token vector</span>
        <strong>{copy[feature]}</strong>
      </div>
      <p>Insight unlocked: the MLP reshapes each token position after attention mixes context.</p>
    </div>
  )
}

function SoftmaxDemo() {
  const [mode, setMode] = useState('balanced')
  const modes = {
    focused: ['floor 72%', 'room 18%', 'tiles 10%'],
    balanced: ['floor 48%', 'room 30%', 'tiles 22%'],
    wider: ['floor 32%', 'room 25%', 'tiles 20%', 'quantum 13%', 'elephant 10%']
  }

  return (
    <div className="softmax-demo">
      <div className="segmented-control" aria-label="Choose sampling shape">
        {Object.keys(modes).map((item) => (
          <button key={item} className={mode === item ? 'active' : ''} onClick={() => setMode(item)}>{item}</button>
        ))}
      </div>
      <div aria-live="polite">
        {modes[mode].map((word) => <span key={word}>{word}</span>)}
      </div>
      <p>{mode === 'wider' ? 'Insight unlocked: a wider candidate pool can make outputs more varied.' : 'Logits become probabilities; sampling chooses one next token.'}</p>
    </div>
  )
}

function ContextWindowDemo() {
  const tokens = canonicalPromptResponse.responseTokens
  const [windowSize, setWindowSize] = useState(5)
  return (
    <div className="context-demo">
      <label>
        <span>Window size: {windowSize} tokens</span>
        <input type="range" min="3" max="8" value={windowSize} onChange={(event) => setWindowSize(Number(event.target.value))} />
      </label>
      <div aria-live="polite">
        {tokens.map((token, index) => (
          <span key={index} className={index < tokens.length - windowSize ? 'faded' : ''}>{token}</span>
        ))}
      </div>
      <p>{tokens.length - windowSize > 0 ? 'Insight unlocked: faded tokens have fallen outside the visible working context.' : 'All tokens still fit in the current window.'}</p>
    </div>
  )
}

function DiffusionDemo() {
  const [step, setStep] = useState(0)
  const labels = ['noise', 'rough shape', 'cleaner image', 'final image']
  return (
    <div className="diffusion-demo">
      <button onClick={() => setStep((step + 1) % labels.length)}>Denoise one step</button>
      <div className={`diffusion-frame step-${step}`} aria-live="polite">
        <span>{labels[step]}</span>
      </div>
      <p>{step === labels.length - 1 ? 'Insight unlocked: diffusion refines noise instead of appending text tokens.' : 'Each step removes a little more noise.'}</p>
    </div>
  )
}

function RiskSortDemo() {
  const [answer, setAnswer] = useState(null)
  const correct = answer === 'real'
  return (
    <div className="risk-demo">
      <p>Claim: Uploading private student records to a public chatbot can expose sensitive data.</p>
      <div className="quick-actions">
        <button className={answer === 'real' ? 'secondary-btn active' : 'secondary-btn'} onClick={() => setAnswer('real')}>Real risk</button>
        <button className={answer === 'myth' ? 'secondary-btn active' : 'secondary-btn'} onClick={() => setAnswer('myth')}>Myth</button>
      </div>
      {answer && <p className={correct ? 'feedback good' : 'feedback'}>{correct ? 'Right: risk literacy is practical, not spooky.' : 'Try again: this one is real and institutional.'}</p>}
    </div>
  )
}

function FeatureCloudDemo() {
  const [active, setActive] = useState(['syntax'])
  const nodes = ['syntax', 'style', 'facts', 'tone', 'math', 'risk', 'meaning']

  function toggle(node) {
    setActive((prev) => prev.includes(node) ? prev.filter((item) => item !== node) : [...prev, node])
  }

  return (
    <div className="feature-cloud-demo" role="group" aria-label="Feature cloud">
      <div className="cloud-core" aria-hidden="true">
        {active.map((node, index) => <span key={node} style={{ '--i': index } as React.CSSProperties} />)}
      </div>
      <div className="cloud-chip-grid">
        {nodes.map((node) => (
          <button
            key={node}
            className={active.includes(node) ? 'active' : ''}
            onClick={() => toggle(node)}
            aria-pressed={active.includes(node)}
          >
            {node}
          </button>
        ))}
      </div>
      <p aria-live="polite">
        {active.length >= 3
          ? `Insight unlocked: one prompt can activate ${active.length} learned patterns at once.`
          : `${active.length} pattern${active.length === 1 ? '' : 's'} active. Tap more chips to light up the cloud.`}
      </p>
      <small>This is a metaphor for distributed activation, not a literal map of the model.</small>
    </div>
  )
}

function PlayScreen({ gameId, gameInsights, traceComplete, promptRunProgress, learningTourComplete, exerciseProgress, setGameId, onGlossary, onInsight, onExerciseAttempt, onPromptRunAttempt, onTraceComplete, onLearningTourComplete }) {
  if (gameId === 'trace-one-prompt') {
    return (
      <PromptRunScreen
        onBack={() => setGameId(null)}
        onComplete={onTraceComplete}
        saved={traceComplete}
        promptRunProgress={promptRunProgress}
        onPromptRunAttempt={onPromptRunAttempt}
        onGlossary={onGlossary}
      />
    )
  }
  if (gameId === 'how-ai-learns') return <HowAILearnsScreen onBack={() => setGameId(null)} onComplete={onLearningTourComplete} saved={learningTourComplete} exerciseProgress={exerciseProgress} onExerciseAttempt={onExerciseAttempt} onGlossary={onGlossary} />
  if (gameId === 'context-stack') return <ContextStack onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('context-stack')} />
  if (gameId === 'attention-weave') return <AttentionWeave onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('attention-weave')} />
  if (gameId === 'token-relay') return <TokenRelay onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('token-relay')} />

  const promptRunDone = Boolean(promptRunProgress?.finalChallengeComplete || traceComplete)
  const promptRunStarted = promptRunDone || (promptRunProgress?.completedSteps?.length ?? 0) > 0
  const promptRunCount = (promptRunProgress?.completedSteps?.length ?? 0) + (promptRunProgress?.finalChallengeComplete ? 1 : 0)
  const sideChallenges = games.map((game) => {
    const meta = {
      'context-stack': { action: 'Push and observe what falls out.', concept: 'Context windows.', time: '3 min' },
      'attention-weave': { action: 'Connect relevant tokens.', concept: 'Attention as relevance.', time: '3 min' },
      'token-relay': { action: 'Toggle operators.', concept: 'Sequence, state, and determinism.', time: '3 min' }
    }[game.id]
    return { ...game, ...meta, saved: gameInsights.includes(game.id) }
  })
  const tourItems = [
    {
      id: 'how-ai-learns',
      title: 'How AI Learns',
      summary: 'Compare training, feedback, retrieval, and temporary in-context steering.',
      image: `${ASSET}/illustrations/scene-training-rainstorm@mobile.png`,
      action: 'Sort learning types.',
      concept: 'Durable training vs temporary steering.',
      time: '5 min',
      saved: learningTourComplete
    }
  ]

  return (
    <section className="screen play-screen" aria-labelledby="play-title">
      <ScreenHeader
        kicker="Play lab"
        title="Play to understand"
        subtitle="Small, calm challenges that make model mechanics visible through action and reflection."
        titleId="play-title"
      />
      <section className="play-section featured" aria-labelledby="featured-play-title">
        <p className="eyebrow">Featured activity</p>
        <PlayCard
          featured
          item={{
            id: 'trace-one-prompt',
            title: 'Prompt Run',
            summary: 'Guide one prompt through the model.',
            image: `${ASSET}/illustrations/scene-token-pipeline-relay@mobile.png`,
            action: 'Label, connect, choose, append.',
            concept: 'The full inference loop.',
            time: '8-10 min',
            saved: promptRunDone,
            progressText: promptRunDone ? 'Complete' : promptRunStarted ? `${promptRunCount} of 13 steps` : 'Not started'
          }}
          onStart={() => setGameId('trace-one-prompt')}
        />
      </section>
      <section className="play-section" aria-labelledby="side-challenges-title">
        <h2 id="side-challenges-title">Practice challenges</h2>
        <div className="game-list">
          {sideChallenges.map((game) => <PlayCard key={game.id} item={game} onStart={() => setGameId(game.id)} />)}
        </div>
      </section>
      <section className="play-section" aria-labelledby="tours-title">
        <h2 id="tours-title">Guided comparisons</h2>
        <div className="game-list">
          {tourItems.map((game) => <PlayCard key={game.id} item={game} onStart={() => setGameId(game.id)} />)}
        </div>
      </section>
    </section>
  )
}

function PlayCard({ item, onStart, featured = false }) {
  const actionLabel = item.saved ? 'Continue' : 'Start'
  return (
    <button className={featured ? 'play-card is-featured' : 'play-card'} onClick={onStart}>
      <img src={item.image} alt="" aria-hidden="true" />
      <span className="play-card-copy">
        <strong>{item.title}</strong>
        <small>{item.summary}</small>
        <span className="play-card-meta"><b>Action:</b> {item.action}</span>
        <span className="play-card-meta"><b>Teaches:</b> {item.concept}</span>
        <span className="play-card-meta"><b>Time:</b> {item.time}</span>
      </span>
      <span className="play-card-status">
        <span className="mini-status">{item.progressText ?? (item.saved ? 'Complete' : 'Ready')}</span>
        <span>{actionLabel}</span>
      </span>
    </button>
  )
}

function makePromptRunExerciseProgress(promptRunProgress) {
  const completed = [...(promptRunProgress?.completedSteps ?? [])]
  if (promptRunProgress?.finalChallengeComplete) completed.push(PROMPT_RUN_FINAL_ID)
  return {
    completed,
    attempts: promptRunProgress?.attempts ?? {},
    lastAnswers: promptRunProgress?.lastAnswers ?? {},
    insights: promptRunProgress?.insights ?? []
  }
}

function PromptRunScreen({ onBack, onComplete, saved, promptRunProgress, onPromptRunAttempt, onGlossary }) {
  const firstIncomplete = promptRunSteps.findIndex((step) => !(promptRunProgress?.completedSteps ?? []).includes(step.id))
  const initialIndex = firstIncomplete === -1 ? promptRunSteps.length : firstIncomplete
  const [stepIndex, setStepIndex] = useState(initialIndex)
  const [hintLevel, setHintLevel] = useState(0)
  const [continueNudge, setContinueNudge] = useState(false)
  const [locallyUnlocked, setLocallyUnlocked] = useState([])
  const atFinal = stepIndex >= promptRunSteps.length
  const currentStep = atFinal ? null : promptRunSteps[stepIndex]
  const currentExercise = atFinal ? promptRunFinalChallenge : currentStep.exercise
  const currentId = atFinal ? PROMPT_RUN_FINAL_ID : currentStep.id
  const totalSteps = promptRunSteps.length + 1
  const displayIndex = atFinal ? totalSteps : stepIndex + 1
  const completedStepIds = promptRunProgress?.completedSteps ?? []
  const progressCount = completedStepIds.length + (promptRunProgress?.finalChallengeComplete ? 1 : 0)
  const currentSolved = locallyUnlocked.includes(currentId) || (atFinal ? promptRunProgress?.finalChallengeComplete : completedStepIds.includes(currentId))
  const runDone = Boolean(promptRunProgress?.finalChallengeComplete)
  const hints = atFinal
    ? ['Start with visible context, then tokenization and embedding lookup.', 'Decoding order is logits, softmax, sampling, append, repeat. No training step belongs inside inference.']
    : currentStep.hints
  const exerciseProgressForRun = useMemo(() => makePromptRunExerciseProgress(promptRunProgress), [promptRunProgress])

  useEffect(() => {
    setHintLevel(0)
    setContinueNudge(false)
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.pl-shell')?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      document.getElementById('prompt-run-step-title')?.focus?.({ preventScroll: true })
    })
  }, [currentId])

  function handleAttempt(exerciseId, payload) {
    onPromptRunAttempt(atFinal ? PROMPT_RUN_FINAL_ID : currentStep.id, payload)
    if (payload.correct || payload.revealed) {
      setLocallyUnlocked((prev) => prev.includes(currentId) ? prev : [...prev, currentId])
      setContinueNudge(false)
    }
  }

  function goNext() {
    if (!currentSolved) {
      setContinueNudge(true)
      return
    }
    if (atFinal) {
      if (saved && runDone) {
        setStepIndex(0)
      } else {
        onComplete()
      }
      return
    }
    setStepIndex((prev) => Math.min(promptRunSteps.length, prev + 1))
  }

  return (
    <section className="screen prompt-run-screen" aria-labelledby="prompt-run-title">
      <GameHeader title="Prompt Run" titleId="prompt-run-title" onBack={onBack}>
        <p className="seed-chip">{displayIndex} of {totalSteps}</p>
      </GameHeader>
      <p className="lede small">Guide one prompt through the model from visible context to one selected token.</p>
      <p className="prompt-run-sample"><strong>Sample prompt:</strong> {PROMPT_RUN_SAMPLE}</p>
      <div className="trace-progress" aria-label={`Prompt Run progress ${displayIndex} of ${totalSteps}`}>
        <span style={{ width: `${Math.max((displayIndex / totalSteps) * 100, (progressCount / totalSteps) * 100)}%` }} />
      </div>
      <section className="prompt-run-step-card" aria-labelledby="prompt-run-step-title">
        <span className="step-label">{atFinal ? 'Final challenge' : `Step ${stepIndex + 1}`}</span>
        <h2 id="prompt-run-step-title" tabIndex={-1}>{atFinal ? 'Full Run Challenge' : currentStep.title}</h2>
        <p>{atFinal ? 'Put the run in order and keep the inference loop distinct from training, memory, and consciousness myths.' : currentStep.goal}</p>
        <PromptRunHintPanel hintLevel={hintLevel} hints={hints} onHint={() => setHintLevel((level) => Math.min(hints.length, level + 1))} />
      </section>
      <ExerciseShell
        key={currentExercise.id}
        exercise={currentExercise}
        progress={exerciseProgressForRun}
        onAttempt={handleAttempt}
        onGlossary={onGlossary}
      />
      {continueNudge && (
        <p className="feedback" role="status">
          <strong>Try the step first.</strong> Continue unlocks after a correct action or Show me.
        </p>
      )}
      <div className="trace-controls prompt-run-controls">
        <button className="secondary-btn" disabled={stepIndex === 0} onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}>Back</button>
        <button className="primary-btn" disabled={!currentSolved} onClick={goNext}>
          {atFinal ? (saved && runDone ? 'Replay Prompt Run' : 'Save Prompt Run') : 'Continue'}
        </button>
      </div>
      <PromptRunCompletionSummary progressCount={progressCount} totalSteps={totalSteps} saved={saved || runDone} />
    </section>
  )
}

function PromptRunHintPanel({ hintLevel, hints, onHint }) {
  const visibleHint = hintLevel > 0 ? hints[Math.min(hintLevel, hints.length) - 1] : 'Hints are here when you want a nudge. No penalty, no shame.'
  return (
    <div className="prompt-run-hint">
      <strong>Hint</strong>
      <p>{visibleHint}</p>
      <button className="secondary-btn" onClick={onHint} disabled={hintLevel >= hints.length}>{hintLevel >= hints.length ? 'Hints shown' : hintLevel === 0 ? 'Get hint' : 'Next hint'}</button>
    </div>
  )
}

function PromptRunCompletionSummary({ progressCount, totalSteps, saved }) {
  return (
    <p className={saved ? 'feedback good prompt-run-summary' : 'feedback prompt-run-summary'} role="status">
      {saved ? 'Insight unlocked: Prompt Run is complete.' : `${progressCount} of ${totalSteps} Prompt Run steps complete.`}
    </p>
  )
}

function HowAILearnsScreen({ onBack, onComplete, saved, exerciseProgress, onExerciseAttempt, onGlossary }) {
  const [index, setIndex] = useState(0)
  const mode = learningModes[index]
  const atStart = index === 0
  const atEnd = index === learningModes.length - 1

  useEffect(() => {
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.pl-shell')?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      document.getElementById('learning-mode-title')?.focus?.({ preventScroll: true })
    })
  }, [index])

  function goNext() {
    if (atEnd) {
      if (saved) setIndex(0)
      else onComplete()
      return
    }
    setIndex((prev) => prev + 1)
  }

  return (
    <section className="screen learning-tour-screen" aria-labelledby="learning-tour-title">
      <GameHeader title="How AI Learns" titleId="learning-tour-title" onBack={onBack}>
        <p className="seed-chip">{index + 1} of {learningModes.length}</p>
      </GameHeader>
      <p className="lede small">Compare durable learning, temporary steering, retrieval, inference, human feedback, and self-supervised pretraining.</p>
      <div className="trace-progress" aria-label={`Learning mode ${index + 1} of ${learningModes.length}`}>
        <span style={{ width: `${((index + 1) / learningModes.length) * 100}%` }} />
      </div>
      <section className="learning-mode-card" aria-labelledby="learning-mode-title">
        <h2 id="learning-mode-title" tabIndex={-1}>{mode.label}</h2>
        <LearningModeAnimation mode={mode} />
        <dl className="mode-details">
          <div><dt>Plain meaning</dt><dd>{mode.plain}</dd></div>
          <div><dt>Metaphor</dt><dd>{mode.metaphor}</dd></div>
          <div><dt>Key distinction</dt><dd>{mode.distinction}</dd></div>
          {mode.technical && <div><dt>Technical note</dt><dd>{mode.technical}</dd></div>}
        </dl>
      </section>
      <section className="info-callout">
        <strong>Learning objective</strong>
        <p>Explain the difference between durable weight updates, temporary in-context steering, retrieval, normal inference, human feedback, and self-supervised pretraining.</p>
      </section>
      <ExerciseShell
        exercise={exerciseById['durable-or-temporary']}
        progress={exerciseProgress}
        onAttempt={onExerciseAttempt}
        onGlossary={onGlossary}
      />
      <div className="trace-controls">
        <button className="secondary-btn" disabled={atStart} onClick={() => setIndex((prev) => Math.max(0, prev - 1))}>Back</button>
        <button className="primary-btn" onClick={goNext}>{atEnd ? (saved ? 'Replay tour' : 'Save learning insight') : 'Next'}</button>
      </div>
      <div className="game-actions">
        <button className="text-btn" onClick={() => onGlossary('training')}>Training</button>
        <button className="text-btn" onClick={() => onGlossary('inference')}>Inference</button>
        <button className="text-btn" onClick={() => onGlossary('rag')}>RAG</button>
      </div>
      {saved && <p className="feedback good" role="status">Insight unlocked: not every AI improvement is the same kind of learning.</p>}
    </section>
  )
}

function GameHeader({ title, titleId = undefined, onBack, children = null }) {
  return (
    <header className="game-header">
      <button className="text-btn" onClick={onBack}>Back to games</button>
      <h1 id={titleId} tabIndex={-1}>{title}</h1>
      {children}
    </header>
  )
}

function ContextStack({ onBack, onGlossary, onInsight, saved }) {
  const deck = ['System: helpful tutor', 'User: explain LLMs', 'Example: pet-conflict sentence', 'Tone: academic', 'Distractor: jokes', 'Output: three bullets']
  const target = ['User: explain LLMs', 'Example: pet-conflict sentence', 'Tone: academic']
  const [stack, setStack] = useState([])
  const windowSize = 4
  const visible = stack.slice(-windowSize)
  const fallen = stack.slice(0, Math.max(0, stack.length - windowSize))
  const hasTarget = target.every((card) => visible.includes(card))
  const lostTarget = target.find((card) => fallen.includes(card))

  useEffect(() => {
    if (hasTarget) onInsight('context-stack')
  }, [hasTarget, onInsight])

  return (
    <section className="screen game-screen" aria-labelledby="context-title">
      <GameHeader title="Context Stack" titleId="context-title" onBack={onBack} />
      <img className="game-hero" src={`${ASSET}/illustrations/scene-context-stack@mobile.png`} alt="Cards entering a limited context window" />
      <p className="lede small">Push cards into a window that holds only the last {windowSize}. Older cards fall out of view.</p>
      <InfoCallout title="Goal">Keep request, example, and tone visible when the final output card arrives.</InfoCallout>
      <div className="context-window" aria-label="Visible context window">
        {visible.length ? visible.map((card, index) => <span key={`${card}-${index}`}>{card}</span>) : <em>Window is empty.</em>}
      </div>
      <div className="fallen-row" aria-live="polite">
        <strong>Fell out:</strong> {fallen.length ? fallen.join(' | ') : 'nothing yet'}
        <small>{fallen.length ? 'The oldest card left because the window can only hold the newest visible context.' : 'Nothing has exceeded the context limit yet.'}</small>
      </div>
      <InsightNotice
        active={hasTarget || saved}
        activeText="Insight unlocked: the model cannot use what is no longer in context."
        idleText={lostTarget ? `The model lost ${lostTarget} because it left the window.` : 'Push cards until request, example, and tone fit together.'}
      />
      <div className="deck-grid" aria-label="Deck of context cards">
        {deck.map((card) => <button key={card} onClick={() => setStack((prev) => [...prev, card])}>{card}</button>)}
      </div>
      <div className="game-actions">
        <button className="secondary-btn" onClick={() => setStack((prev) => prev.slice(0, -1))}>Pop</button>
        <button className="secondary-btn" onClick={() => setStack([])}>Reset</button>
        <button className="text-btn" onClick={() => onGlossary('context window')}>What is a context window?</button>
      </div>
      <GameReflection prompt="What did the model lose when the older card left the window?" />
    </section>
  )
}

function AttentionWeave({ onBack, onGlossary, onInsight, saved }) {
  const nodes = attentionExample.tokens
  const [selected, setSelected] = useState(null)
  const [links, setLinks] = useState([])
  const itIndex = attentionExample.tokens.indexOf(attentionExample.target)
  const catIndex = attentionExample.tokens.indexOf(attentionExample.referent)
  const correctLink = links.some(([a, b]) => (a === itIndex && b === catIndex) || (a === catIndex && b === itIndex))
  const wrongItLink = links.find(([a, b]) => (a === itIndex || b === itIndex) && a !== catIndex && b !== catIndex)

  useEffect(() => {
    if (correctLink) onInsight('attention-weave')
  }, [correctLink, onInsight])

  function tap(index) {
    if (selected == null) {
      setSelected(index)
    } else if (selected !== index) {
      setLinks((prev) => prev.some(([a, b]) => a === selected && b === index) ? prev : [...prev, [selected, index]])
      setSelected(null)
    } else {
      setSelected(null)
    }
  }

  return (
    <section className="screen game-screen" aria-labelledby="attention-title">
      <GameHeader title="Attention Weave" titleId="attention-title" onBack={onBack} />
      <img className="game-hero" src={`${ASSET}/illustrations/scene-attention-weave@mobile.png`} alt="Token nodes connected by glowing attention arcs" />
      <p className="lede small">Tap a source token, then a target token. In this sentence, connect <strong>it</strong> to the word it most likely depends on.</p>
      <InfoCallout title="Status">
        {selected == null ? 'Choose a source token.' : `Source selected: ${nodes[selected]}. Now choose a target token.`}
      </InfoCallout>
      <div className="weave-board">
        <svg viewBox="0 0 320 190" aria-hidden="true">
          {links.map(([a, b], index) => {
            const ax = 32 + (a % 5) * 64
            const ay = a < 5 ? 52 : 134
            const bx = 32 + (b % 5) * 64
            const by = b < 5 ? 52 : 134
            const mx = (ax + bx) / 2
            return <path key={`${a}-${b}`} d={`M${ax} ${ay} Q${mx} ${22 + index * 8} ${bx} ${by}`} />
          })}
        </svg>
        {nodes.map((node, index) => <button key={node + index} className={selected === index ? 'weave-node active' : 'weave-node'} onClick={() => tap(index)}>{node}</button>)}
      </div>
      <div className="meter" aria-label={`${links.length} relevance arcs drawn`}><span style={{ width: `${correctLink || saved ? 100 : Math.min(72, links.length * 24)}%` }} /></div>
      <InsightNotice
        active={correctLink || saved}
        activeText="Insight unlocked: attention-like relevance helps token positions use context. It is not consciousness."
        idleText={wrongItLink ? "In this sentence, 'it' most likely refers to the cat." : "Connect 'it' to the token it most likely refers to."}
      />
      <div className="game-actions">
        <button className="secondary-btn" onClick={() => { setLinks([]); setSelected(null) }}>Reset</button>
        <button className="text-btn" onClick={() => onGlossary('attention')}>Open attention in glossary</button>
      </div>
      <GameReflection prompt="Which two tokens did you connect, and why did that relation matter?" />
    </section>
  )
}

function TokenRelay({ onBack, onGlossary, onInsight, saved }) {
  const choices = ['pass', 'transform', 'hold']
  const targetPath = ['pass', 'transform', 'hold', 'pass']
  const [modes, setModes] = useState(['hold', 'pass', 'transform', 'pass'])
  const seed = '42'
  const correctPath = modes.join('|') === targetPath.join('|')

  useEffect(() => {
    if (correctPath) onInsight('token-relay')
  }, [correctPath, onInsight])

  function cycle(index) {
    setModes((prev) => prev.map((mode, i) => i === index ? choices[(choices.indexOf(mode) + 1) % choices.length] : mode))
  }

  return (
    <section className="screen game-screen" aria-labelledby="relay-title">
      <GameHeader title="Token Pipeline Relay" titleId="relay-title" onBack={onBack}><p className="seed-chip">seed {seed}</p></GameHeader>
      <img className="game-hero" src={`${ASSET}/illustrations/scene-token-pipeline-relay@mobile.png`} alt="Tokens moving through pass, transform, and hold operators" />
      <p className="lede small">Tap each operator to cycle pass, transform, and hold. The run is replayable, but it is not training.</p>
      <InfoCallout title="Target path">pass to transform to hold to pass</InfoCallout>
      <div className="token-lane" aria-label="Tokens moving through the relay">
        {['prompt', 'state', 'logits', 'next'].map((token) => <span key={token}>{token}</span>)}
      </div>
      <div className="relay-board" aria-label="Token relay operators">
        <span className="source">source</span>
        {modes.map((mode, index) => <button key={index} className={`mode-${mode}`} onClick={() => cycle(index)}>{mode}</button>)}
        <span className="sink">sink</span>
      </div>
      <div className="relay-output" aria-live="polite">
        Output path: {modes.join(' -> ')}
      </div>
      <InsightNotice
        active={correctPath || saved}
        activeText="Insight unlocked: deterministic systems can still produce complex outcomes."
        idleText="One operator changed the whole path. Same seed plus same choices means the same run."
      />
      <button className="text-btn" onClick={() => onGlossary('inference')}>Why this is not training</button>
      <GameReflection prompt="How did changing one operator alter the path without changing model weights?" />
    </section>
  )
}

function InsightNotice({ active, activeText, idleText }) {
  return <p className={active ? 'feedback good' : 'feedback'} role="status">{active ? activeText : idleText}</p>
}

function GameReflection({ prompt }) {
  const [text, setText] = useState('')

  return (
    <section className="game-reflection" aria-labelledby="game-reflection-title">
      <h2 id="game-reflection-title">Reflection</h2>
      <label>
        {prompt}
        <textarea value={text} onChange={(event) => setText(event.target.value)} rows={2} placeholder="One sentence is enough." />
      </label>
    </section>
  )
}

function GlossaryScreen({ onOpen }) {
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState('az')
  const normalizedQuery = query.trim().toLowerCase()
  const matchingTerms = glossary.filter((item) => getGlossarySearchText(item).includes(normalizedQuery))
  const terms = sortGlossaryTerms(matchingTerms, sortMode)
  const groupedTerms = sortMode === 'learning' ? groupGlossaryTermsBySection(terms) : [{ section: null, terms }]
  const helperText = sortMode === 'learning'
    ? 'Learning path shows how the vocabulary builds from prompt to response.'
    : 'Find terms alphabetically.'

  return (
    <section className="screen glossary-screen" aria-labelledby="glossary-title">
      <ScreenHeader
        kicker="Definitions plus relationships"
        title="Glossary"
        subtitle="Use each term with its neighbor. That is where the mental model gets stable."
        titleId="glossary-title"
      />
      <label className="search-box">
        Search terms
        <span className="search-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="token, tensor, softmax..." />
          {query && <button type="button" className="search-reset" onClick={() => setQuery('')}>Clear</button>}
        </span>
      </label>
      <section className="glossary-controls" aria-labelledby="glossary-sort-title">
        <h2 id="glossary-sort-title" className="sr-only">Sort glossary terms</h2>
        <div className="segmented-control glossary-sort-toggle" aria-label="Sort glossary terms">
          <button className={sortMode === 'az' ? 'active' : ''} onClick={() => setSortMode('az')} aria-pressed={sortMode === 'az'}>A-Z</button>
          <button className={sortMode === 'learning' ? 'active' : ''} onClick={() => setSortMode('learning')} aria-pressed={sortMode === 'learning'}>Learning path</button>
        </div>
        <p className="glossary-helper">{helperText}</p>
      </section>
      <div className="glossary-list">
        {groupedTerms.map((group) => (
          <section className="glossary-group" key={group.section ?? 'az'} aria-label={group.section ?? 'A-Z glossary terms'}>
            {group.section && <h2 className="glossary-section-heading">{group.section}</h2>}
            {group.terms.map((item) => {
              const meta = getGlossaryLearningMetadata(item)
              return (
                <button className="glossary-card" key={item.id} onClick={() => onOpen(item.id)}>
                  <strong>{item.term}</strong>
                  <span>{item.definition}</span>
                  <small>{item.relationship}</small>
                  {sortMode === 'learning' && (
                    <small className="intro-line">
                      {meta.firstLessonTitle ? `Introduced in: ${meta.firstLessonTitle}` : 'Related AI literacy term'}
                    </small>
                  )}
                </button>
              )
            })}
          </section>
        ))}
      </div>
      {!terms.length && <p className="empty-note">No glossary terms match that search.</p>}
    </section>
  )
}

function GlossaryDrawer({ termId, onOpen, onClose, onOpenLesson }) {
  const item = findGlossaryTerm(termId)
  const closeRef = useRef(null)
  const meta = item ? getGlossaryLearningMetadata(item) : null
  const relatedTerms = useMemo(() => {
    if (!item) return []
    if (item.related?.length) {
      return item.related
        .map((related) => findGlossaryTerm(related))
        .filter(Boolean)
        .slice(0, 6)
    }
    const haystack = `${item.definition} ${item.relationship} ${item.metaphor} ${item.brainMetaphor ?? ''} ${item.brainLimit ?? ''} ${item.confused ?? ''}`.toLowerCase()
    return glossary
      .filter((term) => term.id !== item.id && haystack.includes(term.term.toLowerCase()))
      .slice(0, 4)
  }, [item])

  useEffect(() => {
    if (!item) return undefined
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="glossary-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-definition"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="drawer-close" onClick={onClose} aria-label="Close glossary drawer">Close</button>
        <p className="eyebrow">Glossary</p>
        <h2 id="drawer-title">{item.term}</h2>
        <p id="drawer-definition">{item.definition}</p>
        <section className="concept-card compact"><span>Relationship</span><p>{item.relationship}</p></section>
        <section className="concept-card compact"><span>Metaphor</span><p>{item.metaphor}</p></section>
        {item.brainMetaphor && <section className="concept-card compact"><span>Brain bridge</span><p>{item.brainMetaphor}</p></section>}
        {item.brainLimit && <section className="concept-card compact"><span>Where it breaks</span><p>{item.brainLimit}</p></section>}
        {item.confused && <section className="concept-card compact"><span>Often confused with</span><p>{item.confused}</p></section>}
        {meta?.firstLessonId && (
          <section className="concept-card compact drawer-lesson-card">
            <span>First appears in</span>
            <p>{meta.firstLessonTitle}</p>
            <button
              className="secondary-btn drawer-lesson-action"
              onClick={() => onOpenLesson(meta.firstLessonId)}
            >
              Open lesson
            </button>
          </section>
        )}
        {relatedTerms.length > 0 && (
          <section className="concept-card compact">
            <span>Related terms</span>
            <div className="term-row" aria-label={`Related terms for ${item.term}`}>
              {relatedTerms.map((term) => (
                <button key={term.id} onClick={() => onOpen(term.id)}>{term.term}</button>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  )
}

function BadgeScreen({
  completed,
  progress,
  gameInsights,
  reflections,
  exerciseProgress,
  promptRunProgress,
  statusMessage,
  debugEnabled,
  onResetProgress,
  onMarkFirstLessonComplete,
  onMarkAllLessonsIncomplete,
  onUnlockBadge,
  onClearAllPromptLifeKeys
}) {
  const [copied, setCopied] = useState(false)
  const reflectionCount = Object.values(reflections as Record<string, string>).filter((text) => text.trim().length > 0).length
  const completedExerciseCount = exerciseProgress?.completed?.length ?? 0
  const promptRunDone = Boolean(promptRunProgress?.finalChallengeComplete)
  const promptRunStepCount = (promptRunProgress?.completedSteps?.length ?? 0) + (promptRunDone ? 1 : 0)
  const essentialLessons = lessons.filter((lesson) => getPathLabel(lesson.pathType) === 'Essential')
  const essentialCompleted = essentialLessons.filter((lesson) => completed.includes(lesson.id)).length
  const essentialTarget = Math.ceil(essentialLessons.length * 0.8)
  const synthesisDone = completed.includes('model-literate-synthesis')
  const unlocked = essentialCompleted >= essentialTarget && promptRunDone && synthesisDone
  const lessonsNeeded = Math.max(0, essentialTarget - essentialCompleted)
  const promptRunNeeded = promptRunDone ? 0 : 1
  const synthesisNeeded = synthesisDone ? 0 : 1

  async function copyShareText() {
    try {
      await navigator.clipboard?.writeText('Prompt Life: Model Literate. I can explain how a prompt becomes tokens, vectors, hidden states, probabilities, and one next token at a time.')
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="screen badge-screen" aria-labelledby="badge-title">
      <ScreenHeader kicker="Progress" title="Prompt Life: Model Literate" subtitle="Track your understanding of the prompt-to-response path." titleId="badge-title" />
      <img className="badge-art" src={`${ASSET}/brand/model-literate-badge.svg`} alt="Model Literate badge" />
      <div className="progress-meter" aria-label={`${progress}% lesson progress`}><span style={{ width: `${progress}%` }} /></div>
      <div className="badge-stats">
        <span><strong>{completed.length}</strong> of {lessons.length} lessons</span>
        <span><strong>{gameInsights.length}</strong> of {games.length} play insights</span>
        <span><strong>{completedExerciseCount}</strong> of {exercises.length} exercises</span>
        <span><strong>{promptRunStepCount}</strong> of 13 Prompt Run</span>
        <span><strong>{reflectionCount}</strong> reflections</span>
      </div>
      <section className="idea-panel">
        <h2>{unlocked ? 'Badge unlocked' : 'Badge criterion'}</h2>
        <p>This badge means you can explain what an LLM is, what it is not, and how a prompt becomes a response without treating the model as magic.</p>
        <p>{unlocked ? 'You met the learning threshold.' : `Remaining: ${lessonsNeeded} essential checkpoint${lessonsNeeded === 1 ? '' : 's'}, ${promptRunNeeded} Prompt Run completion${promptRunNeeded === 1 ? '' : 's'}, and ${synthesisNeeded} synthesis card completion${synthesisNeeded === 1 ? '' : 's'}.`}</p>
      </section>
      <button className="primary-btn" onClick={copyShareText}>Copy share text</button>
      {copied && <p className="feedback good" role="status">Share text copied.</p>}
      <section className="settings-panel" aria-labelledby="reset-progress-title">
        <h2 id="reset-progress-title">Start over</h2>
        <p>Progress is stored only on this device. Resetting clears Prompt Life lesson progress, exercise attempts, Prompt Run progress, reflections, mini-game insights, tour progress, and last location.</p>
        <button className="secondary-btn danger" onClick={onResetProgress}>Reset progress</button>
        {statusMessage && <p className="feedback good" role="status">{statusMessage}</p>}
      </section>
      <p className="app-version" aria-label={`Prompt Life version ${APP_VERSION}`}>v{APP_VERSION}</p>
      {debugEnabled && (
        <section className="settings-panel debug-panel" aria-labelledby="debug-tools-title">
          <p className="eyebrow">Debug mode</p>
          <h2 id="debug-tools-title">Progress tools</h2>
          <p>Visible in diagnostics mode. These tools only touch Prompt Life saved progress keys.</p>
          <div className="debug-actions">
            <button className="secondary-btn" onClick={onMarkFirstLessonComplete}>Mark first lesson complete</button>
            <button className="secondary-btn" onClick={onMarkAllLessonsIncomplete}>Mark all lessons incomplete</button>
            <button className="secondary-btn" onClick={onUnlockBadge}>Unlock badge for testing</button>
            <button className="secondary-btn danger" onClick={onClearAllPromptLifeKeys}>Clear all Prompt Life keys</button>
          </div>
        </section>
      )}
    </section>
  )
}

function ReviewLessonCards() {
  return (
    <main className="review-route lesson-review-route" aria-labelledby="review-title">
      <header className="review-cover">
        <p className="eyebrow">Prompt Life v{APP_VERSION}</p>
        <h1 id="review-title" tabIndex={-1}>Lesson Cards</h1>
        <p>One accessible curriculum-review card per lesson, built from current app data plus inventory notes and rubric scores.</p>
      </header>
      {lessons.map((lesson, index) => {
        const profile = buildLessonReviewProfile(lesson)
        const exerciseId = lessonExerciseIds[lesson.id]
        const exercise = exerciseId ? exerciseById[exerciseId] : null
        const incorrectAnswers = lesson.quiz.choices.filter((choice) => choice !== lesson.quiz.answer)
        const feedbackEntries = Object.entries(lesson.quiz.feedback ?? {})
        const definition = lesson.oneSentenceDefinition ?? lesson.definition
        const coreExplanation = lesson.coreExplanation ?? lesson.definition
        const whereItHappens = lesson.whereItHappens ?? lesson.where
        const durableVsTemporary = lesson.durableVsTemporary ?? 'Not listed in current app data.'
        const promptVsResponseNote = lesson.promptVsResponseNote ?? profile.promptResponseNote
        const whyItMatters = lesson.whyItMatters ?? lesson.why
        const howItConnects = lesson.howItConnects ?? lesson.relationship
        const pathLabel = getPathLabel(lesson.pathType)
        const reviewAction = getReviewAction(lesson)
        const sourceNeeded = hasSourceNeeds(lesson)
        const visualNeeded = hasVisualNeeds(lesson)

        return (
          <article id={lesson.id} className="review-card lesson-review-card" key={lesson.id} aria-labelledby={`${lesson.id}-review-title`}>
            <div className="lesson-progress-row">
              <span>{index + 1} / {lessons.length}</span>
              <span>{lesson.actLabel}</span>
            </div>
            <h2 id={`${lesson.id}-review-title`}>{lesson.title}</h2>
            <p className="lede small">{lesson.subtitle}</p>
            <div className="review-meta-row" aria-label={`Review status for ${lesson.title}`}>
              <span>Path: {pathLabel}</span>
              <span>Stage: {profile.stage}</span>
              <span>Recommendation: {reviewAction}</span>
              <span>Source needed: {sourceNeeded ? 'yes' : 'no'}</span>
              <span>Visual needed: {visualNeeded ? 'yes' : 'no'}</span>
              <span>Priority: {profile.rewritePriority}</span>
              <span>Rubric avg: {profile.rubricAverage}/5</span>
            </div>
            <VisualAid id={lesson.visualAidId} compact />
            <dl className="review-lesson-grid">
              <div><dt>Definition</dt><dd>{definition}</dd></div>
              <div><dt>Core objective</dt><dd>{whyItMatters}</dd></div>
              <div><dt>Core explanation</dt><dd>{coreExplanation}</dd></div>
              <div><dt>Where it happens</dt><dd>{whereItHappens}</dd></div>
              <div><dt>Durable vs temporary</dt><dd>{durableVsTemporary}</dd></div>
              <div><dt>Prompt vs response</dt><dd>{promptVsResponseNote}</dd></div>
              <div><dt>Why it matters</dt><dd>{whyItMatters}</dd></div>
              <div><dt>Relationship</dt><dd>{howItConnects}</dd></div>
              <div><dt>Metaphor</dt><dd>{lesson.metaphor}</dd></div>
              <div><dt>Brain metaphor</dt><dd>{lesson.brainBridge?.metaphor ?? 'None listed.'}</dd></div>
              <div><dt>Brain limit</dt><dd>{lesson.brainBridge?.limit ?? 'None listed.'}</dd></div>
              <div><dt>Misconception</dt><dd>{lesson.misconception ?? profile.confusionRisk}</dd></div>
              <div><dt>Review recommendation</dt><dd>{reviewAction}</dd></div>
              <div><dt>Source-needed flag</dt><dd>{sourceNeeded ? 'Yes. Add source review before v1 publication.' : 'No immediate external source need beyond existing mechanism review.'}</dd></div>
              <div><dt>Visual-needed flag</dt><dd>{visualNeeded ? 'Yes. Placeholder coded visual should be reviewed or refined before v1.' : 'No immediate visual gap identified.'}</dd></div>
              <div><dt>Visual aid</dt><dd><code>{lesson.visualAidId}</code></dd></div>
              <div><dt>Current exercise</dt><dd>{exercise ? <><code>{exercise.id}</code>: {exercise.title}</> : 'None rendered in Journey; no direct Play mapping.'}</dd></div>
              <div><dt>Checkpoint</dt><dd>{lesson.quiz.question} Correct: {lesson.quiz.answer}. Incorrect: {incorrectAnswers.join('; ')}.</dd></div>
              <div><dt>Feedback</dt><dd>{lesson.quiz.explain}{feedbackEntries.length > 0 ? ` Choice notes: ${feedbackEntries.map(([choice, note]) => `${choice}: ${note}`).join(' ')}` : ''}</dd></div>
              <div><dt>Rewrite notes</dt><dd><strong>Risk:</strong> {profile.confusionRisk} <strong>Missing:</strong> {profile.missingExplanation}</dd></div>
              <div><dt>Illustration needed</dt><dd>{profile.illustrationNeeded}</dd></div>
            </dl>
            <section className="review-rubric" aria-labelledby={`${lesson.id}-rubric-title`}>
              <h3 id={`${lesson.id}-rubric-title`}>Rubric Scores</h3>
              <div className="rubric-mini-grid">
                {reviewRubricCategories.map((category) => (
                  <span key={category.key}><strong>{category.label}</strong> {profile.rubric[category.key]}/5</span>
                ))}
              </div>
            </section>
            <div className="term-row compact" aria-label={`Glossary terms for ${lesson.title}`}>
              {lesson.terms.map((term) => <span key={term}>{term}</span>)}
            </div>
          </article>
        )
      })}
    </main>
  )
}

function VisualAidReviewPage() {
  return (
    <main className="review-route visual-aid-review-route" aria-labelledby="visual-review-title">
      <header className="review-cover">
        <p className="eyebrow">Prompt Life v{APP_VERSION}</p>
        <h1 id="visual-review-title" tabIndex={-1}>Visual Aid Gallery</h1>
        <p>Reusable SVG/CSS diagrams for the current lesson path, with mobile and PDF readability checks.</p>
      </header>
      <VisualAidGallery />
    </main>
  )
}

function StyleGuideReviewPage() {
  const colorSwatches = [
    ['Rice paper', '--pl-bg', '#F7F5EF'],
    ['Mist blue', '--pl-bg-mist', '#EAF3F4'],
    ['Paper surface', '--pl-surface-paper', '#FFFDF8'],
    ['Ink navy', '--pl-ink', '#07124A'],
    ['Deep indigo', '--pl-indigo', '#121E72'],
    ['Cyan glow', '--pl-cyan', '#35E6E2'],
    ['Soft teal', '--pl-teal', '#0FA8A4'],
    ['Violet glow', '--pl-violet', '#7A5CFF'],
    ['Warm amber', '--pl-amber', '#F2B85B'],
    ['Sakura', '--pl-sakura', '#F5A6C8'],
    ['Insight', '--pl-success', '#179A74'],
    ['Risk', '--pl-risk', '#B94A5A']
  ]
  const navItems = [
    ['home', 'Home', 'icon-seed-run'],
    ['journey', 'Journey', 'icon-layers'],
    ['play', 'Play', 'icon-quiz'],
    ['glossary', 'Glossary', 'icon-glossary'],
    ['badge', 'Badge', 'icon-model-literate-badge']
  ]

  return (
    <main className="review-route style-guide-route" aria-labelledby="style-guide-title">
      <header className="review-cover style-guide-cover">
        <p className="eyebrow">Prompt Life v{APP_VERSION}</p>
        <h1 id="style-guide-title" tabIndex={-1}>ZenTron Origami</h1>
        <p>Internal visual identity playground for the v0.10 calming futuristic learning garden.</p>
      </header>

      <section className="review-card style-guide-section" aria-labelledby="style-colors-title">
        <p className="eyebrow">1. Color swatches</p>
        <h2 id="style-colors-title">Rice paper, mist, ink, and glow</h2>
        <div className="style-swatch-grid">
          {colorSwatches.map(([label, token, value]) => (
            <article className="style-swatch" key={token}>
              <span style={{ background: value }} aria-hidden="true" />
              <strong>{label}</strong>
              <code>{token}</code>
              <small>{value}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-type-title">
        <p className="eyebrow">2. Typography examples</p>
        <h2 id="style-type-title">Readable, spacious, not shouty</h2>
        <div className="style-mobile-frame">
          <p className="eyebrow">Section eyebrow</p>
          <h1>Prompt Life</h1>
          <p className="lede">A day in the life of a prompt, from visible context to one next token at a time.</p>
          <p>Body copy keeps a calm line height so academic readers can move quickly without feeling pushed.</p>
          <small>Microcopy stays useful and legible at 320px.</small>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-cards-title">
        <p className="eyebrow">3-5. Cards, chips, and callouts</p>
        <h2 id="style-cards-title">Paper layers with computational edges</h2>
        <div className="style-mobile-frame style-card-stack">
          <article className="concept-card">
            <span>Concept card</span>
            <p>Paper panels should feel layered, quiet, and touchable.</p>
          </article>
          <div className="term-row">
            {['temporary context', 'durable weights', 'retrieved notes'].map((label) => <button key={label}>{label}</button>)}
          </div>
          <ol className="aid-legend">
            <li><span>1</span><p><strong>Prompt</strong> The visible input starts the run.</p></li>
            <li><span>2</span><p><strong>Glow path</strong> Neon marks information flow.</p></li>
          </ol>
        </div>
      </section>

      <section id="style-brain-bridge" className="review-card style-guide-section" aria-labelledby="style-brain-title">
        <p className="eyebrow">6. Brain Bridge card</p>
        <h2 id="style-brain-title">Helpful comparison, then the limit</h2>
        <div className="style-mobile-frame">
          <section className="lesson-panel brain-bridge" aria-label="Brain Bridge preview">
            <h2>Helpful, then limited</h2>
            <dl>
              <div>
                <dt>Helpful comparison</dt>
                <dd>Like looking something up in notes before answering a question.</dd>
              </div>
              <div>
                <dt>Where it breaks</dt>
                <dd>The model is not consciously judging the source. It is still generating likely tokens.</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-checkpoint-title">
        <p className="eyebrow">7. Checkpoint card</p>
        <h2 id="style-checkpoint-title">Dojo practice, not a trap</h2>
        <div className="style-mobile-frame">
          <section className="quiz-card style-checkpoint-card" aria-label="Checkpoint preview">
            <p className="step-label">Checkpoint</p>
            <h2>What does RAG usually do?</h2>
            <div className="answer-list">
              {['Retrieves outside information into the current context.', 'Permanently changes the model weights.'].map((answer, index) => (
                <button className="answer" key={answer}>
                  <span>{index + 1}</span>
                  <strong>{answer}</strong>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-aid-title">
        <p className="eyebrow">8. VisualAidCard shell</p>
        <h2 id="style-aid-title">Neon diagram inside a paper frame</h2>
        <div className="style-mobile-frame">
          <VisualAid id="rag-retrieval" compact />
        </div>
        <div className="style-variant-list" aria-label="Visual aid style variants">
          {visualAidStyleVariants.map((variant) => (
            <span key={variant.id}><strong>{variant.label}</strong> {variant.use}</span>
          ))}
        </div>
      </section>

      <section id="style-bottom-nav" className="review-card style-guide-section" aria-labelledby="style-nav-title">
        <p className="eyebrow">9. Bottom nav mock</p>
        <h2 id="style-nav-title">Floating paper-glass dock</h2>
        <div className="style-mobile-frame style-nav-preview">
          <div className="style-bottom-nav-layer">
            <nav className="style-bottom-nav-mock" aria-label="Bottom navigation preview">
              {navItems.map(([id, label, icon], index) => (
                <button key={id} className={index === 1 ? 'active' : ''} aria-current={index === 1 ? 'page' : undefined}>
                  <img src={`${ASSET}/icons/png/${icon}@48.png`} alt="" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-hero-title">
        <p className="eyebrow">10. Lesson hero mock</p>
        <h2 id="style-hero-title">One focal object, quiet support</h2>
        <div className="style-mobile-frame">
          <section className="lesson-hero style-lesson-hero" aria-label="Lesson hero preview">
            <p className="eyebrow">Morning Commute</p>
            <h1>RAG and Retrieval</h1>
            <p className="lede small">Open-book AI: retrieved notes enter the context before response tokens are generated.</p>
            <div className="lesson-definition">RAG is retrieval plus context, not training.</div>
          </section>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-drawer-title">
        <p className="eyebrow">11. Glossary drawer mock</p>
        <h2 id="style-drawer-title">Folded reference note</h2>
        <div className="style-mobile-frame">
          <aside className="style-glossary-drawer-mock" aria-label="Glossary drawer preview">
            <button className="drawer-close">Close</button>
            <p className="eyebrow">Glossary</p>
            <h2>Grounding</h2>
            <p>Grounding means connecting a model's response to available evidence, such as retrieved documents, cited sources, data, or tool results.</p>
            <section className="concept-card compact"><span>Relationship</span><p>RAG is one way to improve grounding, but grounding can still fail.</p></section>
          </aside>
        </div>
      </section>

      <section className="review-card style-guide-section" aria-labelledby="style-badge-title">
        <p className="eyebrow">12. Badge mock</p>
        <h2 id="style-badge-title">Enamel seal / academic crest</h2>
        <div className="style-mobile-frame style-badge-preview">
          <img className="badge-art" src={`${ASSET}/brand/model-literate-badge.svg`} alt="Model Literate badge" />
          <div className="badge-stats">
            <span><strong>21</strong> of 26 lessons</span>
            <span><strong>3</strong> play insights</span>
            <span><strong>v${APP_VERSION}</strong> visual pass</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function ScreenHeader({ kicker, title, subtitle, titleId }) {
  return (
    <header className="screen-header">
      <p className="eyebrow">{kicker}</p>
      <h1 id={titleId} tabIndex={-1}>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}

function BottomNav({ tab, setTab }) {
  const items = [
    ['home', 'Home', 'icon-seed-run'],
    ['journey', 'Journey', 'icon-layers'],
    ['play', 'Play', 'icon-quiz'],
    ['glossary', 'Glossary', 'icon-glossary'],
    ['badge', 'Badge', 'icon-model-literate-badge']
  ]
  const activeTab = tab === 'learn' ? 'journey' : tab

  return (
    <div className="bottom-nav-layer">
      <nav className="bottom-nav" aria-label="Primary navigation">
        {items.map(([id, label, icon]) => (
          <button key={id} data-tab={id} className={activeTab === id ? 'active' : ''} onClick={() => setTab(id)} aria-current={activeTab === id ? 'page' : undefined}>
            <img src={`${ASSET}/icons/png/${icon}@48.png`} alt="" aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
