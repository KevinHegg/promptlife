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
import { getLessonSourceReview, sourceRegistry } from './data/sourceRegistry'
import { GlossaryDojoGame } from './features/glossary-dojo/GlossaryDojoGame'
import { GLOSSARY_DOJO_STORAGE_KEY, clearGlossaryDojoProgress, loadGlossaryDojoProgress } from './features/glossary-dojo/storage'
import {
  FINAL_PLAY_CHALLENGE_COUNT,
  buildPlayChallengeSummaries,
  finalPlayChallengeRegistry,
  findRetiredPlayChallenge,
  getCompletedFinalPlayCount
} from './features/play/challengeRegistry'
import {
  PlayActionRow,
  PlayChallengeBoard,
  PlayChallengeCard,
  PlayChallengeShell,
  PlayChoiceButton,
  PlayCompletionPanel,
  PlayFeedbackPanel,
  PlayProgressRail,
  PlayScrollHint,
  PlayStatusPill,
  PlayTokenChip
} from './features/play/PlayChallengeComponents'
import {
  PLAY_CHALLENGE_STORAGE_KEY,
  clearPlayChallengeProgress,
  getPlayChallengeSummary,
  loadPlayChallengeProgress,
  markPlayChallengeCompleted,
  recordPlayChallengeAttempt,
  updatePlayChallengeProgress
} from './features/play/storage'
import { CHOICE_ORDER_SEED_KEY, buildQuizChoices, getChoiceOrderSeed } from './utils/choiceOrder'
import './styles/global.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const ASSET = `${BASE}/assets/promptlife`
const GENERATED_ASSET = `${BASE}/assets/generated`
const HOME_ASSETS = {
  mark: `${GENERATED_ASSET}/home/promptlife-mark.png`,
  markFallback: `${ASSET}/brand/promptlife-mark.svg`,
  hero: `${GENERATED_ASSET}/home/home-hero-prompt-cloud.png`,
  heroFallback: `${ASSET}/illustrations/scene-hero-feature-cloud@mobile.png`
}
// Bump this for each shipped app change; the Badge screen displays it under Start over.
const APP_VERSION = '0.26.6'
const STORAGE_KEYS = {
  lastLocation: 'promptlife:v1:lastLocation',
  lessonId: 'promptlife:v1:lessonId',
  progress: 'promptlife:v1:progress',
  reflections: 'promptlife:v1:reflections',
  gameInsights: 'promptlife:v1:gameInsights',
  exerciseProgress: 'promptlife:v1:exerciseProgress',
  promptRunProgress: 'promptlife:v1:promptRunProgress',
  traceComplete: 'promptlife:v1:traceComplete',
  learningTourComplete: 'promptlife:v1:learningTourComplete',
  playChallenges: PLAY_CHALLENGE_STORAGE_KEY,
  choiceOrderSeed: CHOICE_ORDER_SEED_KEY,
  glossaryDojo: GLOSSARY_DOJO_STORAGE_KEY
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
  { firstLessonId: 'where-llms-fit', termIds: ['ai', 'machine-learning', 'classical-machine-learning', 'deep-learning', 'generative-ai', 'diffusion', 'multimodal', 'symbolic-ai', 'rule-based-ai', 'foundation-model'] },
  { firstLessonId: 'history', termIds: ['rationalism', 'empiricism', 'loss'] },
  { firstLessonId: 'training', termIds: ['training', 'training-data', 'weight', 'parameter', 'weight-update'] },
  { firstLessonId: 'pretraining', termIds: ['pretraining', 'next-token'] },
  { firstLessonId: 'overfitting-generalization', termIds: ['overfitting', 'generalization', 'validation-data'] },
  { firstLessonId: 'fine-tuning', termIds: ['fine-tuning', 'adapter'] },
  { firstLessonId: 'alignment', termIds: ['alignment', 'instruction-tuning', 'human-feedback-learning', 'rlhf', 'preference-optimization', 'policy', 'guardrail', 'evaluation'] },
  { firstLessonId: 'inference', termIds: ['inference', 'forward-pass'] },
  { firstLessonId: 'prompt-response', termIds: ['prompt', 'response', 'prompt-tokens', 'response-tokens', 'response-so-far', 'generated-token', 'completion', 'input-context', 'decoding-step', 'model-output'] },
  { firstLessonId: 'tokens', termIds: ['token', 'tokenizer', 'tokenization'] },
  { firstLessonId: 'token-ids', termIds: ['token-id'] },
  { firstLessonId: 'embeddings', termIds: ['embedding', 'embedding-table'] },
  { firstLessonId: 'vectors', termIds: ['vector', 'feature', 'distributed-representation'] },
  { firstLessonId: 'tensors', termIds: ['tensor', 'activation', 'weight-tensor'] },
  { firstLessonId: 'attention', termIds: ['attention', 'relevance-weight'] },
  { firstLessonId: 'mlp', termIds: ['MLP', 'multi-layer-perceptron', 'feed-forward-network'] },
  { firstLessonId: 'layers', termIds: ['layer', 'transformer-layer', 'residual-path', 'normalization'] },
  { firstLessonId: 'hidden-states', termIds: ['hidden state', 'temporary-activation'] },
  { firstLessonId: 'logits', termIds: ['logits'] },
  { firstLessonId: 'softmax', termIds: ['softmax', 'probability'] },
  { firstLessonId: 'sampling', termIds: ['sampling', 'temperature', 'top-k', 'top-p'] },
  { firstLessonId: 'autoregression', termIds: ['autoregression'] },
  { firstLessonId: 'context-window', termIds: ['context window', 'memory'] },
  { firstLessonId: 'rag-retrieval', termIds: ['rag', 'retrieval'] },
  { firstLessonId: 'grounding', termIds: ['grounding', 'citation'] },
  { firstLessonId: 'hallucinations', termIds: ['hallucination', 'uncertainty'] },
  { firstLessonId: 'how-ai-learns', termIds: ['in-context learning'] },
  { firstLessonId: 'diffusion', termIds: ['denoising'] },
  { firstLessonId: 'multimodal', termIds: ['representation'] },
  { firstLessonId: 'perfect-storm', termIds: ['perfect-storm-term', 'human-feedback-labor', 'compute', 'storage', 'economic-incentives', 'data-center'] },
  { firstLessonId: 'collective-intelligence', termIds: ['collective-intelligence-term', 'source-review', 'data-provenance', 'consent', 'compensation', 'copyright'] },
  { firstLessonId: 'costs-we-must-count', termIds: ['environmental-footprint', 'energy-use', 'water-use', 'carbon-emissions', 'e-waste', 'labor-disruption', 'deskilling', 'bias', 'information-pollution'] },
  { firstLessonId: 'risk-myth', termIds: ['risk-literacy', 'prompt-injection', 'privacy', 'tool-use', 'overreliance', 'vendor-lock-in', 'concentration-of-power'] },
  { firstLessonId: 'benefits-worth-taking-seriously', termIds: ['benefits', 'accessibility', 'translation', 'summarization'] },
  { firstLessonId: 'human-centered-ai', termIds: ['human-centered-ai-term', 'dignity', 'accountability', 'common-good'] },
  { firstLessonId: 'better-ai-choice', termIds: ['responsible-ai', 'model-distillation', 'efficient-inference', 'governance'] },
  { firstLessonId: 'effective-prompting-literacy', termIds: ['effective-prompting', 'uncertainty', 'source-review', 'human-review'] },
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
const LESSON_TERM_DISPLAY_PRIORITY = {
  history: [
    'rationalism',
    'empiricism',
    'loss',
    'deep-learning',
    'symbolic-ai',
    'training',
    'weight'
  ],
  'where-llms-fit': [
    'ai',
    'machine-learning',
    'deep-learning',
    'generative-ai',
    'llm',
    'diffusion',
    'multimodal',
    'symbolic-ai',
    'classical-machine-learning',
    'rule-based-ai',
    'foundation-model'
  ],
  attention: [
    'attention',
    'relevance-weight',
    'input-context',
    'prompt-tokens',
    'response-tokens',
    'hidden state',
    'layer'
  ],
  mlp: [
    'MLP',
    'multi-layer-perceptron',
    'feed-forward-network',
    'feature',
    'attention',
    'hidden state',
    'input-context'
  ],
  layers: [
    'layer',
    'transformer-layer',
    'attention',
    'MLP',
    'hidden state',
    'residual-path',
    'normalization'
  ],
  'hidden-states': [
    'hidden state',
    'temporary-activation',
    'embedding',
    'activation',
    'weight',
    'input-context',
    'forward-pass',
    'layer',
    'inference'
  ],
  logits: [
    'logits',
    'hidden state',
    'next-token',
    'generated-token',
    'softmax',
    'probability'
  ],
  softmax: [
    'softmax',
    'logits',
    'probability',
    'sampling',
    'decoding-step'
  ],
  sampling: [
    'sampling',
    'probability',
    'generated-token',
    'next-token',
    'decoding-step',
    'response-tokens',
    'temperature',
    'top-k',
    'top-p'
  ],
  'collective-intelligence': [
    'collective-intelligence-term',
    'training-data',
    'data-provenance',
    'consent',
    'copyright',
    'compensation',
    'human-feedback-labor',
    'accountability'
  ],
  'costs-we-must-count': [
    'environmental-footprint',
    'energy-use',
    'water-use',
    'carbon-emissions',
    'data-center',
    'e-waste',
    'labor-disruption',
    'deskilling',
    'privacy',
    'governance'
  ],
  'risk-myth': [
    'risk-literacy',
    'privacy',
    'hallucination',
    'prompt-injection',
    'tool-use',
    'overreliance',
    'vendor-lock-in',
    'concentration-of-power',
    'governance',
    'accountability'
  ],
  'benefits-worth-taking-seriously': [
    'benefits',
    'accessibility',
    'translation',
    'summarization',
    'rag',
    'human-review',
    'uncertainty',
    'effective-prompting'
  ],
  'human-centered-ai': [
    'human-centered-ai-term',
    'dignity',
    'accountability',
    'common-good',
    'human-review',
    'governance',
    'responsible-ai'
  ],
  'better-ai-choice': [
    'responsible-ai',
    'governance',
    'data-provenance',
    'privacy',
    'efficient-inference',
    'rag',
    'human-review',
    'accountability',
    'model-distillation'
  ],
  'effective-prompting-literacy': [
    'effective-prompting',
    'prompt',
    'input-context',
    'context window',
    'rag',
    'grounding',
    'uncertainty',
    'source-review',
    'human-review'
  ],
  'model-literate-synthesis': [
    'model-literacy',
    'prompt',
    'token',
    'token-id',
    'embedding',
    'hidden state',
    'logits',
    'softmax',
    'sampling',
    'response-tokens',
    'context window',
    'rag',
    'grounding',
    'human-review',
    'accountability'
  ]
}
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
  const handledJourneyTopRequestRef = useRef(0)
  const [journeyTopRequest, setJourneyTopRequest] = useState(0)
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
    const frameId = requestAnimationFrame(() => {
      const shouldScrollJourneyTop = tab === 'journey' && journeyTopRequest !== handledJourneyTopRequestRef.current
      const journeyReturnActId = tab === 'journey' && !shouldScrollJourneyTop ? journeyReturnActRef.current : null
      if (journeyReturnActId) {
        scrollToJourneySection(journeyReturnActId, shellRef.current)
        journeyReturnActRef.current = null
      } else if (shouldScrollJourneyTop) {
        handledJourneyTopRequestRef.current = journeyTopRequest
        journeyReturnActRef.current = null
        scrollJourneyToTop(shellRef.current)
      } else {
        scrollAppToTop(shellRef.current)
      }
      const focusTarget = shouldScrollJourneyTop
        ? document.getElementById('journey-title')
        : tab === 'learn'
        ? document.getElementById('lesson-title')
        : journeyReturnActId
          ? document.getElementById(`journey-section-title-${journeyReturnActId}`)
        : document.querySelector<HTMLElement>('.screen h1[id]')
      focusTarget?.focus?.({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frameId)
  }, [tab, lessonId, lessonMode, gameId, journeyTopRequest])

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
    clearGlossaryDojoProgress()
    clearPlayChallengeProgress()
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

  function openJourneyTop() {
    journeyReturnActRef.current = null
    setTab('journey')
    setJourneyTopRequest((request) => request + 1)
  }

  function navigatePrimaryTab(id) {
    if (id === 'journey') {
      openJourneyTop()
      return
    }
    setTab(id)
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
            onJourney={openJourneyTop}
            onPlay={() => setTab('play')}
          />
        )}
        {tab === 'journey' && (
          <JourneyScreen
            completed={completed}
            currentLessonId={nextOpenLesson.id}
            onOpenLesson={openLesson}
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
        {tab === 'glossary' && <GlossaryScreen onOpen={setDrawerTerm} onPractice={() => openPlayFeature('glossary-dojo')} />}
        {tab === 'badge' && (
          <BadgeScreen
            completed={completed}
            progress={progress}
            gameInsights={gameInsights}
            traceComplete={traceComplete}
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
      <BottomNav tab={tab} onNavigate={navigatePrimaryTab} />
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

function useReviewHashScroll() {
  useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (!targetId) return undefined

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])
}

function SkipLink() {
  return <a className="skip-link" href="#main">Skip to content</a>
}

function HomeScreen({ progress, nextLessonTitle, statusMessage, onStart, onJourney, onPlay }) {
  const [homeAssetFailures, setHomeAssetFailures] = useState({ mark: false, hero: false })
  const markSrc = homeAssetFailures.mark ? HOME_ASSETS.markFallback : HOME_ASSETS.mark
  const heroSrc = homeAssetFailures.hero ? HOME_ASSETS.heroFallback : HOME_ASSETS.hero

  function handleHomeAssetError(asset: 'mark' | 'hero') {
    setHomeAssetFailures((failures) => failures[asset] ? failures : { ...failures, [asset]: true })
  }

  return (
    <section className="screen home-screen" aria-labelledby="home-title">
      {statusMessage && <p className="feedback good" role="status">{statusMessage}</p>}
      <div className="home-hero">
        <div className="home-brand-row">
          <span className="home-logo-frame">
            <img
              className="brand-mark"
              src={markSrc}
              alt="Prompt Life mark: a prompt signal moving through a model cloud toward one response token"
              onError={() => handleHomeAssetError('mark')}
            />
          </span>
          <p className="eyebrow">A DAY IN THE LIFE OF A PROMPT</p>
        </div>
        <h1 id="home-title">Prompt Life</h1>
        <p className="lede home-tagline">Demystifying LLMs in the AI era through clear explanations, useful metaphors, and a little play.</p>
        <div className="home-visual-slot">
          <img
            className="hero-art"
            src={heroSrc}
            alt="A prompt traveling through a glowing model cloud and emerging as one response token"
            loading="eager"
            decoding="async"
            onError={() => handleHomeAssetError('hero')}
          />
        </div>
      </div>

      <section className="progress-panel" aria-labelledby="progress-title">
        <div>
          <p className="eyebrow">Current path</p>
          <h2 id="progress-title">{progress ? 'Continue learning' : 'Start at the beginning'}</h2>
          <p>{progress}% complete. Next stop: {nextLessonTitle}</p>
        </div>
        <ProgressRing progress={progress} label={`${progress}% complete`} />
        <button className="primary-btn" onClick={onStart}>{progress ? 'Continue journey' : 'Start journey'}</button>
      </section>

      <section className="idea-panel" aria-labelledby="big-idea">
        <h2 id="big-idea">Big idea</h2>
        <p>An LLM is not a mind, a database, or magic. It is a learned prediction system that turns context into likely next tokens.</p>
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
      <span className="pillar-chip-label">{label}</span>
    </span>
  )
}

function JourneyScreen({ completed, currentLessonId, onOpenLesson }) {
  const currentActId = lessons.find((lesson) => lesson.id === currentLessonId)?.act ?? acts[0].id
  const visibleLessons = lessons
  const visibleActs = acts
  const [activeStageId, setActiveStageId] = useState(currentActId)

  useEffect(() => {
    setActiveStageId(currentActId)
  }, [currentActId])

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
      <p className="journey-helper">All stages follow one prompt through the full day: before training, through inference, generation, evidence, risks, costs, and better human use.</p>
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
                return (
                  <button
                    className={current ? 'lesson-row is-current' : 'lesson-row'}
                    key={lesson.id}
                    onClick={() => onOpenLesson(lesson.id, mode)}
                    aria-label={`${lessonNumber}. ${lesson.title}. ${actionLabel}.`}
                  >
                    <span className="lesson-row-number" aria-hidden="true">{lessonNumber}</span>
                    <span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.subtitle}</small>
                      <span className="lesson-row-meta">
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

function scrollAppToTop(shell = document.querySelector<HTMLElement>('.pl-shell')) {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  if (shell) {
    shell.scrollTo({ top: 0, behavior })
    return
  }
  window.scrollTo({ top: 0, behavior })
}

function scrollJourneyToTop(shell = document.querySelector<HTMLElement>('.pl-shell')) {
  scrollAppToTop(shell)
  document.getElementById('journey-title')?.focus?.({ preventScroll: true })
}

function StageTimeline({ currentActId, items = acts, onStageSelect = null }) {
  const isJumpGrid = Boolean(onStageSelect)

  return (
    <ol className={isJumpGrid ? 'stage-timeline stage-timeline-jump' : 'stage-timeline'} aria-label="Prompt Life stages">
      {items.map((act) => {
        const gridTitle = act.shortTitle ?? act.name
        const gridSubtitle = act.gridSubtitle ?? act.navHint
        const ariaLabel = act.ariaLabel ?? `Jump to ${act.name}. ${act.navHint}`

        return (
          <li key={act.id} className={act.id === currentActId ? 'active' : ''}>
            {onStageSelect ? (
            <button
              className="stage-link"
              onClick={() => onStageSelect(act.id)}
              aria-current={act.id === currentActId ? 'step' : undefined}
              aria-label={ariaLabel}
            >
              <span>{act.number}</span>
              <strong>{gridTitle}</strong>
              <small>{gridSubtitle}</small>
            </button>
          ) : (
            <>
              <span>{act.number}</span>
              <strong>{act.name}</strong>
            </>
          )}
          </li>
        )
      })}
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
  const [checkpointIndex, setCheckpointIndex] = useState(0)
  const [checkpointSelections, setCheckpointSelections] = useState({})
  const [checkpointRevealed, setCheckpointRevealed] = useState({})
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
  const choiceOrderSeed = useMemo(() => getChoiceOrderSeed(), [])
  const checkpointItems = useMemo(() => {
    return Array.isArray(lesson.quiz?.questions) && lesson.quiz.questions.length ? lesson.quiz.questions : [lesson.quiz]
  }, [lesson.quiz])
  const activeCheckpointIndex = Math.min(checkpointIndex, checkpointItems.length - 1)
  const activeQuiz = checkpointItems[activeCheckpointIndex] ?? lesson.quiz
  const checkpointKey = activeQuiz?.id ?? `${activeCheckpointIndex}`
  const checkpointChoiceOrderKey = checkpointItems.length === 1
    ? `lesson:${lesson.id}:checkpoint`
    : `lesson:${lesson.id}:checkpoint:${checkpointKey}`
  const checkpointChoices = useMemo(
    () => buildQuizChoices(checkpointChoiceOrderKey, activeQuiz, choiceOrderSeed),
    [checkpointChoiceOrderKey, activeQuiz, choiceOrderSeed]
  )
  const choice = checkpointSelections[checkpointKey] ?? null
  const revealed = Boolean(checkpointRevealed[checkpointKey])
  const selectedChoice = choice == null ? null : checkpointChoices.find((item) => item.id === choice) ?? null
  const isCorrect = Boolean(selectedChoice?.isCorrect)
  const isLastCheckpointQuestion = activeCheckpointIndex >= checkpointItems.length - 1
  const relatedTerms = useMemo(() => {
    return lesson.terms
      .map((term) => findGlossaryTerm(term))
      .filter(Boolean)
  }, [lesson.terms])

  useEffect(() => {
    setCheckpointIndex(0)
    setCheckpointSelections({})
    setCheckpointRevealed({})
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
    if (!isLastCheckpointQuestion) {
      setCheckpointIndex((index) => Math.min(index + 1, checkpointItems.length - 1))
      setContinueHint(false)
      checkpointRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
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
      </header>

      <section className="lesson-panel visual-aid-panel" aria-labelledby="visual-aid-title">
        <span className="step-label">Visual aid</span>
        <h2 id="visual-aid-title">What to picture</h2>
        <VisualAid id={lesson.visualAidId} headingId="visual-aid-title" />
      </section>

      <KeyTermsChips lessonId={lesson.id} terms={relatedTerms} onOpen={onGlossary} />

      <section className="lesson-panel core-panel" aria-label="Core idea">
        <span className="step-label">Core idea</span>
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
        <Checkpoint
          quiz={activeQuiz}
          choices={checkpointChoices}
          selectedChoiceId={choice}
          setChoice={(choiceId) => {
            setCheckpointSelections((selections) => ({ ...selections, [checkpointKey]: choiceId }))
            setCheckpointRevealed((revealedMap) => ({ ...revealedMap, [checkpointKey]: true }))
            setContinueHint(false)
          }}
          revealed={revealed}
          progress={checkpointItems.length > 1 ? { current: activeCheckpointIndex + 1, total: checkpointItems.length } : null}
          onPrevious={activeCheckpointIndex > 0 ? () => setCheckpointIndex((index) => Math.max(0, index - 1)) : null}
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
        {!canUpdateProgress ? 'Return to Journey' : isCorrect ? (!isLastCheckpointQuestion ? 'Next checkpoint question' : lessonIndex + 1 === totalLessons ? 'Finish and view badge' : 'Next lesson') : choice == null ? 'Answer checkpoint to continue' : 'Retry checkpoint to continue'}
      </button>
    </section>
  )
}

function orderKeyTerms(lessonId, terms) {
  const priority = LESSON_TERM_DISPLAY_PRIORITY[lessonId]
  if (!priority) return terms
  const priorityIndex = new Map()
  priority.forEach((id, index) => priorityIndex.set(id, index))
  return [...terms].sort((a, b) => {
    const aIndex = priorityIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER
    const bIndex = priorityIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER
    if (aIndex !== bIndex) return aIndex - bIndex
    return a.term.localeCompare(b.term)
  })
}

function KeyTermsChips({ lessonId, terms, onOpen }) {
  const [expanded, setExpanded] = useState(false)
  const [canToggle, setCanToggle] = useState(terms.length > 8)
  const listRef = useRef(null)
  const orderedTerms = useMemo(() => orderKeyTerms(lessonId, terms), [lessonId, terms])
  const listId = `key-terms-${lessonId}`

  useEffect(() => {
    setExpanded(false)
  }, [lessonId])

  useEffect(() => {
    function measure() {
      const list = listRef.current
      if (!list) return
      if (!expanded) {
        setCanToggle(list.scrollHeight > list.clientHeight + 2)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [expanded, orderedTerms])

  if (!orderedTerms.length) return null

  return (
    <section className="lesson-panel key-terms" aria-labelledby={`${listId}-title`}>
      <div className="key-terms-header">
        <div>
          <h2 id={`${listId}-title`}>Key terms</h2>
          <p>Tap a term to open the glossary.</p>
        </div>
        {canToggle && (
          <button
            type="button"
            className="text-btn key-terms-toggle"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show fewer' : 'Show all terms'}
          </button>
        )}
      </div>
      <div
        ref={listRef}
        id={listId}
        className={[
          'term-row',
          'key-terms-list',
          expanded ? 'is-expanded' : 'is-collapsed',
          canToggle ? 'has-overflow' : ''
        ].filter(Boolean).join(' ')}
        aria-label="Key glossary terms"
      >
        {orderedTerms.map((term) => (
          <button key={term.id} type="button" onClick={() => onOpen(term.id)}>{term.term}</button>
        ))}
      </div>
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

function Checkpoint({ quiz, choices, selectedChoiceId, setChoice, revealed, progress = null, onPrevious = null }) {
  const selectedChoice = selectedChoiceId == null ? null : choices.find((item) => item.id === selectedChoiceId) ?? null
  const isCorrect = Boolean(selectedChoice?.isCorrect)
  const feedback = selectedChoice?.feedback ?? quiz.explain
  const feedbackHasLead = !isCorrect && typeof feedback === 'string' && feedback.startsWith('Not quite.')
  const feedbackHasCorrectLead = isCorrect && typeof feedback === 'string' && feedback.startsWith('Insight unlocked')
  const hasProgress = Boolean(progress && progress.total > 1)
  const isFinalQuestion = hasProgress && progress.current === progress.total

  return (
    <>
      {hasProgress ? (
        <div className="checkpoint-pager" aria-label={`Checkpoint question ${progress.current} of ${progress.total}`}>
          <div className="checkpoint-pager-row">
            <span className="step-label">Checkpoint</span>
            <span className="checkpoint-count">Question {progress.current} of {progress.total}</span>
          </div>
          <div className="checkpoint-dots" aria-hidden="true">
            {Array.from({ length: progress.total }, (_, index) => (
              <span key={index} className={index + 1 <= progress.current ? 'active' : ''} />
            ))}
          </div>
          <div className="checkpoint-pager-row">
            {onPrevious ? <button className="text-btn checkpoint-back" type="button" onClick={onPrevious}>Previous question</button> : <span />}
            {isFinalQuestion && <strong className="checkpoint-final">Final question</strong>}
          </div>
        </div>
      ) : (
        <span className="step-label">Checkpoint</span>
      )}
      <h2 id="quiz-title">{quiz.question}</h2>
      <div className="answer-list" role="list">
        {choices.map((answer, index) => {
          const selected = selectedChoiceId === answer.id
          const className = [
            'answer',
            selected ? 'is-selected' : '',
            revealed && answer.isCorrect ? 'is-correct' : '',
            revealed && selected && !answer.isCorrect ? 'is-wrong' : ''
          ].filter(Boolean).join(' ')
          const optionLabel = `Answer ${String.fromCharCode(65 + index)}: ${answer.label}${revealed && answer.isCorrect ? '. Correct answer.' : ''}`

          return (
            <button
              key={answer.id}
              className={className}
              onClick={() => setChoice(answer.id)}
              aria-pressed={selected}
              aria-label={optionLabel}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <strong>{answer.label}</strong>
            </button>
          )
        })}
      </div>
      {revealed && (
        <p className={isCorrect ? 'feedback good' : 'feedback'} role="status">
          {isCorrect && !feedbackHasCorrectLead && <strong>Insight unlocked.</strong>}
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
  if (type === 'prompt-trace') return <PromptTraceInteraction />
  if (type === 'ai-topology') return <AiTopologyInteraction />
  if (type === 'traditions-sort') return <TraditionsSortInteraction />
  if (type === 'training-steps') return <TrainingStepInteraction />
  if (type === 'pretraining-toggle') return <PretrainingToggleInteraction />
  if (type === 'overfitting-curve') return <OverfittingCurveInteraction />
  if (type === 'fine-tuning-sort') return <FineTuningSortInteraction />
  if (type === 'alignment-groups') return <AlignmentGroupingInteraction />
  if (type === 'learning-modes-sort') return <LearningModesSortInteraction />
  if (type === 'diffusion-contrast') return <DiffusionContrastInteraction />
  if (type === 'multimodal-map') return <MultimodalMapInteraction />
  if (type === 'perfect-storm-ingredients') return <PerfectStormIngredientsInteraction />
  if (type === 'collective-human-questions') return <CollectiveHumanQuestionsInteraction />
  if (type === 'cost-ledger') return <CostLedgerInteraction />
  if (type === 'risk-myth-sort') return <RiskMythSortInteraction />
  if (type === 'benefit-tier-sort') return <BenefitTierSortInteraction />
  if (type === 'human-centered-scenario') return <HumanCenteredScenarioInteraction />
  if (type === 'better-ai-levers') return <BetterAiLeversInteraction />
  if (type === 'prompt-builder') return <PromptBuilderInteraction />
  if (type === 'synthesis-chain') return <SynthesisChainInteraction />
  if (type === 'training') return <TrainingLoopAnimation />
  if (type === 'fine-tune') return <FineTuningPathAnimation />
  if (type === 'inference') return <InferenceTemporaryInteraction />
  if (type === 'prompt-response-labels') return <PromptResponseLabelsInteraction />
  if (type === 'tokenization-split') return <TokenizationSplitInteraction />
  if (type === 'token-id-lookup') return <TokenIdLookupInteraction />
  if (type === 'embedding-lookup') return <EmbeddingLookupInteraction />
  if (type === 'vector-distribution') return <VectorDistributionInteraction />
  if (type === 'tensor-axis') return <TensorAxisInteraction />
  if (type === 'attention-relevance-connect') return <AttentionRelevanceConnectInteraction />
  if (type === 'mlp-feature-toggle') return <MlpFeatureToggleInteraction />
  if (type === 'layers-stack-inspect') return <LayersStackInspectInteraction />
  if (type === 'hidden-state-sort') return <HiddenStateSortInteraction />
  if (type === 'logits-raw-toggle') return <LogitsRawToggleInteraction />
  if (type === 'softmax-convert') return <SoftmaxConvertInteraction />
  if (type === 'sampling-probability-pick') return <SamplingProbabilityPickInteraction />
  if (type === 'autoregression-loop') return <AutoregressionLoopInteraction />
  if (type === 'context-window-tray') return <ContextWindowTrayInteraction />
  if (type === 'rag-lane-highlight') return <RagLaneHighlightInteraction />
  if (type === 'grounding-claim-match') return <GroundingClaimMatchInteraction />
  if (type === 'hallucination-support-check') return <HallucinationSupportCheckInteraction />
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

function InferenceTemporaryInteraction() {
  const choices = [
    { id: 'activations', label: 'Temporary activations', correct: true },
    { id: 'weights', label: 'Model weights', correct: false },
    { id: 'dataset', label: 'Training dataset', correct: false }
  ]
  const [choice, setChoice] = useState(null)
  const selected = choices.find((item) => item.id === choice)

  return (
    <div className="morning-interaction inference-temporary-demo">
      <div className="inference-mini-flow" aria-hidden="true">
        <span>Context</span>
        <span className="is-fixed">Fixed weights</span>
        <span className="is-live">Temporary activations</span>
        <span>Scores</span>
      </div>
      <p className="micro-prompt">Which part is temporary during ordinary inference?</p>
      <div className="morning-choice-row" role="group" aria-label="Choose what is temporary during inference">
        {choices.map((item) => (
          <button
            key={item.id}
            className={choice === item.id ? 'active' : ''}
            onClick={() => setChoice(item.id)}
            aria-pressed={choice === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className={selected?.correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {selected
          ? selected.correct
            ? 'Insight strengthened. Inference uses fixed weights but creates temporary internal states for the current run.'
            : 'Not quite. Ordinary inference uses the learned weights without permanently rewriting them.'
          : 'Pick the part that appears for this run and then disappears.'}
      </p>
    </div>
  )
}

function PromptResponseLabelsInteraction() {
  const rows = [
    { id: 'prompt', label: 'Prompt', body: canonicalPromptResponse.userPrompt },
    { id: 'response', label: 'Response so far', body: canonicalPromptResponse.responseSoFar },
    { id: 'next', label: 'Next token', body: canonicalPromptResponse.chosenNextToken },
    { id: 'context', label: 'Current context', body: canonicalPromptResponse.promptContextLabel }
  ]
  const [active, setActive] = useState('prompt')
  const current = rows.find((row) => row.id === active) ?? rows[0]

  return (
    <div className="morning-interaction prompt-response-label-demo">
      <div className="prompt-response-lanes">
        {rows.map((row) => (
          <button key={row.id} className={active === row.id ? 'active' : ''} onClick={() => setActive(row.id)} aria-pressed={active === row.id}>
            <strong>{row.label}</strong>
            <span>{row.body}</span>
          </button>
        ))}
      </div>
      <p className="micro-feedback good" role="status">
        <strong>{current.label}:</strong> {active === 'context' ? 'The next run sees prompt plus response-so-far plus the appended token.' : 'This is one role inside the current context.'}
      </p>
    </div>
  )
}

function AutoregressionLoopInteraction() {
  const steps = [
    {
      id: 'start',
      label: 'So far',
      action: 'Choose token',
      body: 'The current context contains the user prompt plus the response-so-far.'
    },
    {
      id: 'chosen',
      label: 'Token chosen',
      action: 'Append token',
      body: `"${canonicalPromptResponse.chosenNextToken}" is one generated response token, not the whole answer.`
    },
    {
      id: 'appended',
      label: 'Appended',
      action: 'Run again',
      body: 'The chosen token is appended to the temporary context.'
    },
    {
      id: 'again',
      label: 'Run again',
      action: 'Reset loop',
      body: 'The next forward pass sees the longer response-so-far and can choose another token.'
    }
  ]
  const [step, setStep] = useState(0)
  const current = steps[step]
  const responseTokens = step >= 2
    ? [...canonicalPromptResponse.responseSoFarTokens, canonicalPromptResponse.chosenNextToken]
    : canonicalPromptResponse.responseSoFarTokens
  const candidates = ['.', 'while', 'before']

  return (
    <div className="morning-interaction day-repeat-demo autoregression-loop-demo">
      <div className="day-repeat-step-row" role="group" aria-label="Autoregression steps">
        {steps.map((item, index) => (
          <button
            key={item.id}
            className={step === index ? 'active' : ''}
            onClick={() => setStep(index)}
            aria-pressed={step === index}
          >
            {index + 1}. {item.label}
          </button>
        ))}
      </div>
      <div className="autoregression-board" aria-live="polite">
        <span className="context-label">User prompt</span>
        <p>{canonicalPromptResponse.userPrompt}</p>
        <span className="context-label">Response-so-far</span>
        <div className="response-token-strip">
          {responseTokens.map((token, index) => (
            <span key={`${token}-${index}`} className={token === canonicalPromptResponse.chosenNextToken ? 'chosen' : ''}>{token}</span>
          ))}
        </div>
        {step >= 1 && <strong className="chosen-token-card">chosen token: {canonicalPromptResponse.chosenNextToken}</strong>}
        {step >= 3 && (
          <div className="next-candidate-row" aria-label="Next-token candidates after running again">
            {candidates.map((candidate) => <span key={candidate}>{candidate}</span>)}
          </div>
        )}
      </div>
      <button className="morning-primary-action" onClick={() => setStep((step + 1) % steps.length)}>
        {current.action}
      </button>
      <p className={step === steps.length - 1 ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {step === steps.length - 1
          ? 'Insight strengthened. Autoregression means the response grows by choose, append, and repeat.'
          : current.body}
      </p>
    </div>
  )
}

function ContextWindowTrayInteraction() {
  const cards = [
    { id: 'old', label: 'Old message', shortLabel: 'Old msg', type: 'history' },
    { id: 'system', label: 'System instruction', shortLabel: 'System', type: 'system' },
    { id: 'prompt', label: 'User prompt', shortLabel: 'User', type: 'prompt' },
    { id: 'retrieved', label: 'Retrieved note', shortLabel: 'RAG note', type: 'retrieved' },
    { id: 'response', label: 'Response so far', shortLabel: 'So far', type: 'response' }
  ]
  const limit = 4
  const [count, setCount] = useState(0)
  const pushed = cards.slice(0, count)
  const visible = pushed.slice(-limit)
  const fallen = pushed.slice(0, Math.max(0, pushed.length - limit))
  const nextCard = cards[count]

  function pushNextCard() {
    setCount(count >= cards.length ? 0 : count + 1)
  }

  return (
    <div className="morning-interaction day-repeat-demo context-window-tray-demo">
      <div className="context-window-limit" aria-live="polite">
        <span>Four-slot context window</span>
        <div className="context-slot-grid">
          {Array.from({ length: limit }).map((_, index) => {
            const card = visible[index]
            return (
              <span key={index} className={card ? `context-card ${card.type}` : 'context-card empty'}>
                {card?.shortLabel ?? 'empty'}
              </span>
            )
          })}
        </div>
      </div>
      <div className="fell-out-shelf" aria-label="Cards outside the current context">
        <strong>Fell out</strong>
        <div>
          {fallen.length
            ? fallen.map((card) => <span key={card.id}>{card.label}</span>)
            : <span>nothing yet</span>}
        </div>
      </div>
      <button className="morning-primary-action" onClick={pushNextCard}>
        {nextCard ? `Push: ${nextCard.label}` : 'Reset tray'}
      </button>
      <p className={fallen.length ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {fallen.length
          ? 'Insight strengthened. The model can only use what remains visible in the current context.'
          : 'Push cards into the tray. When the fifth card enters, the oldest one falls out.'}
      </p>
    </div>
  )
}

function RagLaneHighlightInteraction() {
  const lanes = [
    { id: 'prompt', label: 'Prompt', body: 'The user question starts the run.' },
    { id: 'retriever', label: 'Retriever', body: 'A retrieval system searches outside documents or records.' },
    { id: 'notes', label: 'Notes', body: 'Relevant snippets are returned as retrieved context.' },
    { id: 'context', label: 'Context tray', body: 'Retrieved notes become temporary input context, not permanent memory.' },
    { id: 'response', label: 'Response', body: 'The LLM generates response tokens using fixed weights plus current context.' }
  ]
  const [activeId, setActiveId] = useState('prompt')
  const active = lanes.find((lane) => lane.id === activeId) ?? lanes[0]

  return (
    <div className="morning-interaction day-repeat-demo rag-lane-demo">
      <div className="rag-lane-row" role="group" aria-label="RAG retrieval lanes">
        {lanes.map((lane, index) => (
          <button key={lane.id} className={activeId === lane.id ? 'active' : ''} onClick={() => setActiveId(lane.id)} aria-pressed={activeId === lane.id}>
            <span>{index + 1}</span>
            {lane.label}
          </button>
        ))}
      </div>
      <p className="micro-feedback good" role="status">
        <strong>{active.label}:</strong> {active.body}
      </p>
      {activeId === 'response' && <p className="mini-insight">Insight strengthened. RAG adds temporary evidence to context; it does not rewrite model weights.</p>}
    </div>
  )
}

function GroundingClaimMatchInteraction() {
  const claims = [
    { id: 'policy', label: 'The policy allows X.', evidence: 'Retrieved policy passage', supported: true },
    { id: 'enrollment', label: 'Enrollment is 42.', evidence: 'Database result', supported: true },
    { id: 'free', label: 'The service is always free.', evidence: 'No matching evidence', supported: false }
  ]
  const [activeId, setActiveId] = useState('policy')
  const active = claims.find((claim) => claim.id === activeId) ?? claims[0]

  return (
    <div className="morning-interaction day-repeat-demo grounding-match-demo">
      <div className="claim-support-grid" role="group" aria-label="Choose a generated claim to inspect">
        {claims.map((claim) => (
          <button key={claim.id} className={activeId === claim.id ? 'active' : ''} onClick={() => setActiveId(claim.id)} aria-pressed={activeId === claim.id}>
            {claim.label}
          </button>
        ))}
      </div>
      <div className="evidence-map-card" aria-live="polite">
        <span className="generated-claim">{active.label}</span>
        <span className={active.supported ? 'support-line connected' : 'support-line missing'}>{active.supported ? 'connected to' : 'not supported by'}</span>
        <span className="evidence-chip">{active.evidence}</span>
      </div>
      <p className={active.supported ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {active.supported
          ? 'Insight strengthened. Grounding ties claims to evidence, but the evidence still needs review.'
          : 'Not quite. A citation-looking answer is not automatically grounded; the evidence must actually support the claim.'}
      </p>
    </div>
  )
}

function HallucinationSupportCheckInteraction() {
  const claims = [
    { id: 'supported', label: 'The retrieved policy mentions X.', note: 'Evidence pillar present', correct: false },
    { id: 'unsupported', label: 'The policy was updated in 2027.', note: 'No matching evidence', correct: true },
    { id: 'uncertain', label: 'Exceptions may exist.', note: 'Needs review, but not the missing-support claim here', correct: false }
  ]
  const [choice, setChoice] = useState(null)
  const selected = claims.find((claim) => claim.id === choice)

  return (
    <div className="morning-interaction day-repeat-demo hallucination-support-demo">
      <p className="micro-prompt">Which fluent claim needs evidence before you trust it?</p>
      <div className="support-check-list" role="group" aria-label="Mark the claim with missing support">
        {claims.map((claim) => (
          <button key={claim.id} className={choice === claim.id ? 'active' : ''} onClick={() => setChoice(claim.id)} aria-pressed={choice === claim.id}>
            <strong>{claim.label}</strong>
            <span>{claim.note}</span>
          </button>
        ))}
      </div>
      <p className={selected?.correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {selected
          ? selected.correct
            ? 'Insight strengthened. A fluent claim can still need grounding or review.'
            : 'Not quite. Hallucinations are not usually lies; they are unsupported or fabricated outputs from generation.'
          : 'Tap the claim whose fluent wording outruns the available support.'}
      </p>
    </div>
  )
}

function TokenizationSplitInteraction() {
  const [step, setStep] = useState(0)
  const tokens = canonicalPromptResponse.responseTokens
  const uneven = [
    ['kitchen', 'kitchen'],
    ['startled', 'start | led'],
    ['floor.', 'floor | .']
  ]
  const buttonLabel = step === 0 ? 'Show token cards' : step === 1 ? 'Show uneven chunks' : 'Reset sentence'

  return (
    <div className="morning-interaction tokenization-split-demo">
      <button className="morning-primary-action" onClick={() => setStep((step + 1) % 3)}>{buttonLabel}</button>
      <div className={step === 0 ? 'tokenization-sentence' : 'tokenization-token-grid'} aria-live="polite">
        {step === 0 ? (
          <strong>{canonicalPromptResponse.generatedResponse}</strong>
        ) : (
          tokens.map((token, index) => <span key={`${token}-${index}`}>{token}</span>)
        )}
      </div>
      {step === 2 && (
        <div className="uneven-token-examples" aria-label="Examples of uneven token chunks">
          {uneven.map(([word, split]) => (
            <span key={word}><strong>{word}</strong><em>{split}</em></span>
          ))}
        </div>
      )}
      <p className={step > 0 ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {step > 0
          ? 'Insight strengthened. Tokens are model-readable chunks, not always human words.'
          : 'Tap to split the sentence into simplified tokens.'}
      </p>
    </div>
  )
}

function TokenIdLookupInteraction() {
  const table = canonicalPromptResponse.tokenIds
  const [token, setToken] = useState(table[0].token)
  const [idChoice, setIdChoice] = useState(null)
  const row = table.find((item) => item.token === token) ?? table[0]
  const correct = idChoice === row.id

  function chooseToken(nextToken) {
    setToken(nextToken)
    setIdChoice(null)
  }

  return (
    <div className="morning-interaction token-id-lookup-demo">
      <div className="morning-choice-row compact" role="group" aria-label="Choose a token">
        {table.map((item) => (
          <button key={item.token} className={token === item.token ? 'active' : ''} onClick={() => chooseToken(item.token)} aria-pressed={token === item.token}>
            {item.token}
          </button>
        ))}
      </div>
      <div className="id-match-board">
        <span className="lookup-token-card">{row.token}</span>
        <span className="lookup-arrow" aria-hidden="true">to</span>
        <div className="id-choice-stack" role="group" aria-label={`Choose the ID for ${row.token}`}>
          {table.map((item) => (
            <button key={item.id} className={idChoice === item.id ? 'active' : ''} onClick={() => setIdChoice(item.id)} aria-pressed={idChoice === item.id}>
              ID {item.id}
            </button>
          ))}
        </div>
        <span className={correct ? 'lookup-table-row active' : 'lookup-table-row'}>embedding row {correct ? row.id : '?'}</span>
      </div>
      <p className={correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {idChoice
          ? correct
            ? 'Insight strengthened. The ID points to a learned embedding-table row.'
            : 'Not quite. The ID is just a lookup key; the meaning comes from learned numerical patterns, not the number itself.'
          : `Match ${row.token} to its lookup number.`}
      </p>
    </div>
  )
}

function EmbeddingLookupInteraction() {
  const rows = {
    dog: { id: '421', bars: [42, 70, 34, 82, 54] },
    cat: { id: '982', bars: [68, 38, 76, 44, 60] },
    floor: { id: '1576', bars: [28, 58, 86, 48, 72] }
  }
  const [token, setToken] = useState('floor')
  const current = rows[token]

  return (
    <div className="morning-interaction embedding-lookup-demo">
      <div className="morning-choice-row compact" role="group" aria-label="Choose token ID to look up">
        {Object.entries(rows).map(([label, row]) => (
          <button key={label} className={token === label ? 'active' : ''} onClick={() => setToken(label)} aria-pressed={token === label}>
            {label} to {row.id}
          </button>
        ))}
      </div>
      <div className="embedding-lookup-board" aria-live="polite">
        <span className="embedding-id-card">ID {current.id}</span>
        <div className="embedding-table-mini">
          {Object.entries(rows).map(([label, row]) => (
            <span key={label} className={token === label ? 'active' : ''}>row {row.id}</span>
          ))}
        </div>
        <div className="embedding-vector-bars" aria-label={`Temporary starting vector for ${token}`}>
          {current.bars.map((bar, index) => <span key={index} style={{ height: `${bar}%` }} />)}
        </div>
      </div>
      <div className="durable-temporary-notes">
        <span>Durable table</span>
        <span>Temporary retrieved vector</span>
        <span>Hidden state comes later</span>
      </div>
      <p className="micro-feedback good" role="status">Insight strengthened. An embedding starts the token in numerical space before context reshapes it.</p>
    </div>
  )
}

function VectorDistributionInteraction() {
  const [mode, setMode] = useState('simplified')
  const simpleRows = [
    ['animal-ish', 72],
    ['grammar role', 46],
    ['tone', 38],
    ['position', 64]
  ]
  const distributed = [20, 68, 44, 86, 36, 54, 72, 28, 62, 48, 78, 32]

  return (
    <div className="morning-interaction vector-distribution-demo">
      <div className="segmented-control mini" role="group" aria-label="Choose vector view">
        <button className={mode === 'simplified' ? 'active' : ''} onClick={() => setMode('simplified')} aria-pressed={mode === 'simplified'}>Teaching sliders</button>
        <button className={mode === 'distributed' ? 'active' : ''} onClick={() => setMode('distributed')} aria-pressed={mode === 'distributed'}>Real-ish pattern</button>
      </div>
      {mode === 'simplified' ? (
        <div className="vector-simple-bars" aria-label="Simplified vector feature sliders">
          {simpleRows.map(([label, value]) => (
            <span key={label}><strong>{label}</strong><i style={{ width: `${value}%` }} /></span>
          ))}
        </div>
      ) : (
        <div className="vector-distributed-grid" aria-label="Unlabeled distributed vector dimensions">
          {distributed.map((value, index) => <span key={index} style={{ '--level': value } as React.CSSProperties} />)}
        </div>
      )}
      <p className="micro-feedback good" role="status">Insight strengthened. Vectors let the model compute with many fuzzy numerical features at once.</p>
      <small>Teaching labels are simplified; real dimensions are distributed and usually unlabeled.</small>
    </div>
  )
}

function TensorAxisInteraction() {
  const [axis, setAxis] = useState('tokens')
  const copy = {
    tokens: 'Token axis: one row for each visible token position.',
    features: 'Feature axis: many numbers across each token vector.',
    batch: 'Batch note: systems often process more than one example at a time.'
  }
  const tokens = ['dog', 'cat', 'floor']
  const features = ['f1', 'f2', 'f3', 'f4']

  return (
    <div className="morning-interaction tensor-axis-demo">
      <div className="morning-choice-row compact" role="group" aria-label="Inspect tensor axes">
        {Object.keys(copy).map((item) => (
          <button key={item} className={axis === item ? 'active' : ''} onClick={() => setAxis(item)} aria-pressed={axis === item}>
            {item === 'tokens' ? 'Token axis' : item === 'features' ? 'Feature axis' : 'Batch note'}
          </button>
        ))}
      </div>
      <div className={`tensor-axis-board highlight-${axis}`} aria-label="Tensor axis inspector">
        <div className="tensor-token-labels">{tokens.map((token) => <span key={token}>{token}</span>)}</div>
        <div className="tensor-feature-labels">{features.map((feature) => <span key={feature}>{feature}</span>)}</div>
        <div className="tensor-cell-grid" aria-hidden="true">
          {tokens.flatMap((token) => features.map((feature) => <span key={`${token}-${feature}`} />))}
        </div>
      </div>
      <p className="micro-feedback good" role="status">Insight strengthened. {copy[axis]}</p>
    </div>
  )
}

function AttentionRelevanceConnectInteraction() {
  const choices = [
    { id: 'dog', label: 'dog', correct: false },
    { id: 'cat', label: 'cat', correct: true }
  ]
  const [choice, setChoice] = useState(null)
  const selected = choices.find((item) => item.id === choice)

  return (
    <div className="morning-interaction workday-interaction attention-connect-demo">
      <p className="micro-prompt">Which earlier token helps interpret “it”?</p>
      <div className="attention-sentence-strip" aria-label="Attention example sentence">
        {['dog', 'cat', 'because', 'it', 'hissed'].map((token) => (
          <span key={token} className={token === 'it' ? 'target' : token === selected?.id ? 'active' : ''}>{token}</span>
        ))}
      </div>
      <div className="attention-relevance-lines" aria-hidden="true">
        <span className={choice === 'cat' ? 'strong active' : 'strong'}>it to cat</span>
        <span className={choice === 'dog' ? 'weak active' : 'weak'}>it to dog</span>
      </div>
      <div className="morning-choice-row compact" role="group" aria-label="Choose the referent for it">
        {choices.map((item) => (
          <button key={item.id} className={choice === item.id ? 'active' : ''} onClick={() => setChoice(item.id)} aria-pressed={choice === item.id}>
            {item.label}
          </button>
        ))}
      </div>
      <p className={selected?.correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {selected
          ? selected.correct
            ? 'Insight strengthened. Attention can weight “cat” as more relevant to “it” in this context.'
            : 'Not quite. “dog” is nearby and possible in other sentences, but here “it hissed” points more strongly to “cat.”'
          : 'Tap the token that “it” most likely depends on.'}
      </p>
    </div>
  )
}

function MlpFeatureToggleInteraction() {
  const [mode, setMode] = useState('before')
  const [answer, setAnswer] = useState(null)
  const options = [
    { id: 'feature-vector', label: 'The token’s feature vector', correct: true },
    { id: 'memory', label: 'The model’s permanent memory', correct: false },
    { id: 'token-id', label: 'The token ID', correct: false }
  ]
  const bars = mode === 'before' ? [38, 62, 44, 70, 48] : [74, 34, 82, 52, 66]
  const selected = options.find((item) => item.id === answer)

  return (
    <div className="morning-interaction workday-interaction mlp-toggle-demo">
      <div className="segmented-control mini" role="group" aria-label="Toggle MLP state">
        <button className={mode === 'before' ? 'active' : ''} onClick={() => setMode('before')} aria-pressed={mode === 'before'}>Before MLP</button>
        <button className={mode === 'after' ? 'active' : ''} onClick={() => setMode('after')} aria-pressed={mode === 'after'}>After MLP</button>
      </div>
      <div className="mlp-feature-card" aria-live="polite">
        <strong>cat</strong>
        <div className="mlp-feature-bars" aria-label={`${mode} MLP feature bars`}>
          {bars.map((bar, index) => <span key={index} style={{ height: `${bar}%` }} />)}
        </div>
        <small>{mode === 'before' ? 'same token position' : 'reshaped features'}</small>
      </div>
      <p className="micro-prompt">What changed?</p>
      <div className="morning-choice-row" role="group" aria-label="Choose what changed after MLP">
        {options.map((item) => (
          <button key={item.id} className={answer === item.id ? 'active' : ''} onClick={() => setAnswer(item.id)} aria-pressed={answer === item.id}>
            {item.label}
          </button>
        ))}
      </div>
      <p className={selected?.correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {selected
          ? selected.correct
            ? 'Insight strengthened. The MLP reshapes features for a token position during the forward pass.'
            : 'Not quite. The token ID and durable weights stay put; the temporary feature vector changes.'
          : 'Toggle before and after, then choose what changed.'}
      </p>
    </div>
  )
}

function LayersStackInspectInteraction() {
  const steps = [
    { id: 'layer-1', label: 'Layer 1', note: 'Attention mixes visible token positions; the MLP reshapes each token.' },
    { id: 'layer-2', label: 'Layer 2', note: 'The refined hidden-state ribbon moves forward and is transformed again.' },
    { id: 'layer-3', label: 'Layer 3', note: 'Repeated blocks keep refining temporary hidden states.' },
    { id: 'final', label: 'Final', note: 'Final hidden states can be projected toward next-token scores.' }
  ]
  const [activeId, setActiveId] = useState('layer-1')
  const activeIndex = Math.max(0, steps.findIndex((step) => step.id === activeId))
  const active = steps[activeIndex]

  return (
    <div className="morning-interaction workday-interaction layers-inspect-demo">
      <div className="morning-choice-row compact" role="group" aria-label="Inspect transformer layers">
        {steps.map((step) => (
          <button key={step.id} className={activeId === step.id ? 'active' : ''} onClick={() => setActiveId(step.id)} aria-pressed={activeId === step.id}>
            {step.label}
          </button>
        ))}
      </div>
      <div className="layer-stack-mini" aria-label={`Inspecting ${active.label}`}>
        <span className="state-label input">input hidden states</span>
        {steps.slice(0, 3).map((step, index) => (
          <div key={step.id} className={index === activeIndex ? 'active' : ''}>
            <strong>{index + 1}</strong>
            <small>attention + MLP</small>
          </div>
        ))}
        <span className={activeId === 'final' ? 'state-label output active' : 'state-label output'}>output hidden states</span>
        <i style={{ '--progress': `${Math.min(activeIndex, 3)}` } as React.CSSProperties} aria-hidden="true" />
      </div>
      <p className="micro-feedback good" role="status">
        Insight strengthened. {active.note} Hidden states are refined, not permanently stored.
      </p>
    </div>
  )
}

function HiddenStateSortInteraction() {
  const buckets = ['Durable', 'Temporary', 'Not in this forward pass']
  const items = [
    { id: 'embedding-table', label: 'embedding table', bucket: 'Durable' },
    { id: 'weight', label: 'weight', bucket: 'Durable' },
    { id: 'hidden-state', label: 'hidden state', bucket: 'Temporary' },
    { id: 'attention-pattern', label: 'attention pattern', bucket: 'Temporary' },
    { id: 'current-context', label: 'current context', bucket: 'Temporary' },
    { id: 'training-data', label: 'training data', bucket: 'Not in this forward pass' }
  ]
  const [placements, setPlacements] = useState({})
  const placedCount = Object.keys(placements).length
  const allPlaced = placedCount === items.length
  const allCorrect = allPlaced && items.every((item) => placements[item.id] === item.bucket)

  function cyclePlacement(itemId) {
    setPlacements((current) => {
      const existing = current[itemId]
      const nextIndex = existing ? (buckets.indexOf(existing) + 1) % buckets.length : 0
      return { ...current, [itemId]: buckets[nextIndex] }
    })
  }

  return (
    <div className="morning-interaction workday-interaction hidden-sort-demo">
      <p className="micro-prompt">Tap each item to cycle its bucket.</p>
      <div className="hidden-sort-items" aria-label="Sort hidden state concepts">
        {items.map((item) => (
          <button key={item.id} onClick={() => cyclePlacement(item.id)}>
            <strong>{item.label}</strong>
            <span>{placements[item.id] ?? 'choose bucket'}</span>
          </button>
        ))}
      </div>
      <div className="hidden-sort-buckets" aria-hidden="true">
        {buckets.map((bucket) => (
          <span key={bucket}>{bucket}</span>
        ))}
      </div>
      <p className={allCorrect ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {allCorrect
          ? 'Insight strengthened. Hidden states are temporary internal vectors shaped by the current context.'
          : allPlaced
            ? 'Not quite. Embedding table and weight are durable; hidden state, attention pattern, and current context are temporary; training data is outside this forward pass.'
            : `${placedCount} of ${items.length} placed.`}
      </p>
    </div>
  )
}

const decisionCandidates = [
  { id: 'floor', label: 'floor', raw: '8.2', probability: '86%', level: 86, correct: true },
  { id: 'room', label: 'room', raw: '5.1', probability: '12%', level: 34, plausible: true },
  { id: 'counter', label: 'counter', raw: '2.0', probability: '2%', level: 18 },
  { id: 'quantum', label: 'quantum', raw: '-1.0', probability: '~0%', level: 6 }
]

function LogitsRawToggleInteraction() {
  const [mode, setMode] = useState('raw')
  const isRaw = mode === 'raw'

  return (
    <div className="morning-interaction decision-interaction logits-toggle-demo">
      <div className="segmented-control mini" role="group" aria-label="Toggle raw scores and probabilities">
        <button className={isRaw ? 'active' : ''} onClick={() => setMode('raw')} aria-pressed={isRaw}>Raw scores</button>
        <button className={!isRaw ? 'active' : ''} onClick={() => setMode('probabilities')} aria-pressed={!isRaw}>Probabilities?</button>
      </div>
      <div className="decision-score-list" aria-live="polite">
        {decisionCandidates.map((candidate) => (
          <span key={candidate.id}>
            <strong>{candidate.label}</strong>
            <i style={{ width: `${isRaw ? candidate.level : Math.max(8, Number.parseInt(candidate.probability, 10) || 4)}%` }} />
            <em>{isRaw ? candidate.raw : candidate.probability}</em>
          </span>
        ))}
      </div>
      <p className={isRaw ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {isRaw
          ? 'Insight strengthened. Logits are the before state: temporary raw scores for possible next tokens.'
          : 'Softmax comes next. Probabilities are easier to sample from, but still are not truth guarantees.'}
      </p>
    </div>
  )
}

function SoftmaxConvertInteraction() {
  const [converted, setConverted] = useState(false)

  return (
    <div className="morning-interaction decision-interaction softmax-convert-demo">
      <button className="morning-primary-action" onClick={() => setConverted((value) => !value)}>
        {converted ? 'Show raw scores' : 'Apply softmax'}
      </button>
      <div className={converted ? 'softmax-conversion-board converted' : 'softmax-conversion-board'} aria-live="polite">
        <div>
          <strong>Before</strong>
          {decisionCandidates.map((candidate) => (
            <span key={`raw-${candidate.id}`}>
              <b>{candidate.label}</b>
              <em>{candidate.raw}</em>
            </span>
          ))}
        </div>
        <i aria-hidden="true">softmax</i>
        <div>
          <strong>After</strong>
          {decisionCandidates.map((candidate) => (
            <span key={`prob-${candidate.id}`} className={converted ? 'active' : ''}>
              <b>{candidate.label}</b>
              <em>{converted ? candidate.probability : '?'}</em>
            </span>
          ))}
          <small>{converted ? 'sum = 100%' : 'tap to convert'}</small>
        </div>
      </div>
      <p className={converted ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {converted
          ? 'Insight strengthened. Softmax turns raw scores into probabilities that can be sampled. Probability is not truth.'
          : 'Raw logits are not ready-to-sample probabilities yet.'}
      </p>
    </div>
  )
}

function SamplingProbabilityPickInteraction() {
  const [choice, setChoice] = useState(null)
  const selected = decisionCandidates.find((candidate) => candidate.id === choice)

  let feedback = 'Which token is most likely in this local context?'
  let good = false
  if (selected?.correct) {
    good = true
    feedback = 'Insight strengthened. “floor” has the highest probability in this local context. Probability is not truth.'
  } else if (selected?.plausible) {
    feedback = 'Close. “room” is plausible, but “floor” is more likely in this sentence.'
  } else if (selected?.id === 'quantum') {
    feedback = 'Not quite. “quantum” is in the vocabulary, but it is very unlikely in this local context.'
  } else if (selected) {
    feedback = 'Not quite. “counter” can be a token, but the local context points much more strongly to “floor.”'
  }

  return (
    <div className="morning-interaction decision-interaction sampling-pick-demo">
      <p className="micro-prompt">A jealous dog chased a startled cat across the kitchen...</p>
      <div className="weighted-token-cloud" role="group" aria-label="Choose the most likely next token">
        {decisionCandidates.map((candidate) => (
          <button
            key={candidate.id}
            className={choice === candidate.id ? 'active' : ''}
            onClick={() => setChoice(candidate.id)}
            aria-pressed={choice === candidate.id}
          >
            <strong>{candidate.label}</strong>
            <span>{candidate.probability}</span>
          </button>
        ))}
      </div>
      <div className="temperature-simple-toggle" aria-label="Temperature note">
        <span>Focused: sharper probabilities</span>
        <span>More varied: wider possibilities</span>
      </div>
      <p className={good ? 'micro-feedback good' : 'micro-feedback'} role="status">{feedback}</p>
    </div>
  )
}

function AiTopologyInteraction() {
  const branches = [
    { id: 'ai', label: 'AI', level: 0, detail: 'The broad field of systems designed to perform tasks associated with intelligence.' },
    { id: 'rule-based-ai', label: 'Rule-based AI', level: 1, detail: 'Systems that use explicit rules, symbols, or if/then logic.' },
    { id: 'machine-learning', label: 'Machine learning', level: 1, detail: 'Systems that learn patterns from data.' },
    { id: 'classical-ml', label: 'Classical ML', level: 2, detail: 'Machine-learning methods that are usually smaller and less layered than deep learning.' },
    { id: 'deep-learning', label: 'Deep learning', level: 2, detail: 'Machine learning with large neural networks that learn layered representations.' },
    { id: 'generative-ai', label: 'Generative AI', level: 3, detail: 'Systems that create new text, images, audio, code, or other media.' },
    { id: 'llms', label: 'LLMs', level: 4, detail: 'Generative AI systems focused on language and code, producing response tokens one at a time.' },
    { id: 'diffusion', label: 'Diffusion', level: 4, detail: 'Generative systems that often create images or other media by denoising patterns.' },
    { id: 'multimodal', label: 'Multimodal', level: 4, detail: 'Systems that work across more than one media type, such as text and images.' },
    { id: 'other-deep-learning', label: 'Other deep learning', level: 3, detail: 'Deep-learning systems that may classify, rank, recommend, detect, or predict without generating media.' }
  ]
  const [activeId, setActiveId] = useState('ai')
  const active = branches.find((branch) => branch.id === activeId) ?? branches[0]
  const branchButton = (branch) => (
    <button
      key={branch.id}
      className={`level-${branch.level} ${active.id === branch.id ? 'active' : ''}`.trim()}
      onClick={() => setActiveId(branch.id)}
      aria-pressed={active.id === branch.id}
    >
      {branch.label}
    </button>
  )

  return (
    <div className="ai-topology-demo">
      <div className="ai-taxonomy-tree" role="group" aria-label="AI taxonomy branches">
        {branches.map(branchButton)}
      </div>
      <div className="ai-branch-card" aria-live="polite">
        <strong>{active.label}</strong>
        <p>{active.detail}</p>
      </div>
      {active.id === 'llms' && <p className="mini-insight">Insight unlocked: an LLM is one branch, not the whole AI family.</p>}
    </div>
  )
}

function PromptTraceInteraction() {
  const steps = [
    {
      label: 'Context',
      title: 'Current context',
      body: `Prompt: "${canonicalPromptResponse.userPrompt}" Response so far: "${canonicalPromptResponse.responseSoFar}".`
    },
    {
      label: 'Token cloud',
      title: 'Next-token cloud',
      body: 'floor, room, and tiles are plausible. quantum and elephant are much weaker in this local context.'
    },
    {
      label: 'Chosen',
      title: 'Chosen token',
      body: `${canonicalPromptResponse.chosenNextToken} is selected from the probability cloud.`
    },
    {
      label: 'Appended',
      title: 'Append and repeat',
      body: `"${canonicalPromptResponse.nextContextResponse}" becomes the response-so-far for the next run.`
    }
  ]
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className="prompt-trace-demo">
      <div className="micro-step-buttons" role="group" aria-label="Prompt trace steps">
        {steps.map((item, index) => (
          <button key={item.label} className={step === index ? 'active' : ''} onClick={() => setStep(index)} aria-pressed={step === index}>
            {index + 1}. {item.label}
          </button>
        ))}
      </div>
      <div className="prompt-trace-card" aria-live="polite">
        <strong>{current.title}</strong>
        <p>{current.body}</p>
        {step === 1 && (
          <div className="token-probability-cloud" aria-label="Simplified next-token candidates">
            {canonicalPromptResponse.nextTokenCandidates.map((token, index) => (
              <span key={token} className={token === canonicalPromptResponse.chosenNextToken ? 'chosen' : (canonicalPromptResponse.plausibleNextTokens as readonly string[]).includes(token) ? 'plausible' : 'unlikely'} style={{ '--size': `${1.08 - index * 0.06}rem` } as React.CSSProperties}>
                {token}
              </span>
            ))}
          </div>
        )}
      </div>
      {step === steps.length - 1 && <p className="mini-insight">Insight unlocked: generation is score, choose, append, repeat.</p>}
    </div>
  )
}

function TrainingStepInteraction() {
  const steps = [
    { label: 'Predict', detail: 'The model guesses the target next token.' },
    { label: 'Compare', detail: 'The guess is compared with the actual target.' },
    { label: 'Loss', detail: 'Loss measures how wrong the prediction was.' },
    { label: 'Update weights', detail: 'The optimizer changes weights. This is the durable step.' }
  ]
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className="micro-step-demo">
      <div className="training-step-row" aria-label="Training loop steps">
        {steps.map((item, index) => (
          <button
            key={item.label}
            className={[step === index ? 'active' : '', item.label === 'Update weights' ? 'durable' : ''].filter(Boolean).join(' ')}
            onClick={() => setStep(index)}
            aria-pressed={step === index}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p aria-live="polite"><strong>{current.label}:</strong> {current.detail}</p>
      {current.label === 'Update weights' && <p className="mini-insight">Insight unlocked: this is training, not ordinary inference.</p>}
    </div>
  )
}

function PretrainingToggleInteraction() {
  const [mode, setMode] = useState('pattern')
  const copy = mode === 'pattern'
    ? 'Broad pretraining repeats the training loop at huge scale, shaping grammar, style, facts, associations, task patterns, and reasoning-like behavior.'
    : 'Perfect recall is the myth. Seeing text during training does not mean the model stores every source as a searchable memory.'

  return (
    <div className="pretraining-toggle-demo">
      <div className="segmented-control wide" role="group" aria-label="Compare pretraining mental models">
        <button className={mode === 'pattern' ? 'active' : ''} onClick={() => setMode('pattern')} aria-pressed={mode === 'pattern'}>Broad pattern learning</button>
        <button className={mode === 'myth' ? 'active' : ''} onClick={() => setMode('myth')} aria-pressed={mode === 'myth'}>Perfect recall myth</button>
      </div>
      <div className="state-card" aria-live="polite">
        <strong>{mode === 'pattern' ? 'Better model' : 'Myth to drop'}</strong>
        <p>{copy}</p>
      </div>
      {mode === 'pattern' && <p className="mini-insight">Insight unlocked: pretraining builds broad durable patterns, not a file cabinet.</p>}
    </div>
  )
}

function OverfittingCurveInteraction() {
  const [choice, setChoice] = useState('overfit')
  const generalizing = choice === 'generalizing'
  return (
    <div className="overfit-curve-demo">
      <div className="segmented-control wide" role="group" aria-label="Choose which curve handles new examples">
        <button className={!generalizing ? 'active' : ''} onClick={() => setChoice('overfit')} aria-pressed={!generalizing}>Overfit curve</button>
        <button className={generalizing ? 'active' : ''} onClick={() => setChoice('generalizing')} aria-pressed={generalizing}>Generalizing curve</button>
      </div>
      <div className={generalizing ? 'curve-card is-generalizing' : 'curve-card'} aria-live="polite">
        <span>training dots</span>
        <span>held-out dots</span>
        <strong>{generalizing ? 'New examples handled better' : 'Old examples traced too tightly'}</strong>
      </div>
      <p>{generalizing ? 'Insight unlocked: evaluation needs held-out examples.' : 'This curve memorizes the answer key and misses the new cases.'}</p>
    </div>
  )
}

function TraditionsSortInteraction() {
  return (
    <CycleSortInteraction
      label="Sort AI-system ingredients"
      categories={['Rules', 'Learned patterns', 'Hybrid system']}
      items={[
        { id: 'if-then-policy', label: 'if/then policy', category: 'Rules' },
        { id: 'model-weights', label: 'model weights', category: 'Learned patterns' },
        { id: 'rag-search', label: 'RAG search', category: 'Hybrid system' },
        { id: 'safety-filter', label: 'safety filter', category: 'Hybrid system' },
        { id: 'grammar-pattern', label: 'grammar pattern', category: 'Learned patterns' },
        { id: 'tool-call-rule', label: 'tool call rule', category: 'Rules' }
      ]}
      insight="Modern AI systems often combine learned models with rules, retrieval, filters, tools, and policies."
    />
  )
}

function FineTuningSortInteraction() {
  return (
    <CycleSortInteraction
      label="Sort customization moves"
      categories={['Durable training', 'Temporary context steering', 'Decoding choice']}
      items={[
        { id: 'fine-tuning-examples', label: 'fine-tuning examples', category: 'Durable training' },
        { id: 'prompt-instructions', label: 'prompt instructions', category: 'Temporary context steering' },
        { id: 'retrieved-pdf', label: 'retrieved PDF', category: 'Temporary context steering' },
        { id: 'sampling-token', label: 'sampling next token', category: 'Decoding choice' },
        { id: 'adapter-weights', label: 'adapter weights', category: 'Durable training' }
      ]}
      insight="Fine-tuning shapes future behavior. Prompting and RAG steer the current context. Sampling chooses one next token."
    />
  )
}

function AlignmentGroupingInteraction() {
  return (
    <CycleSortInteraction
      label="Group alignment methods"
      categories={['Durable shaping', 'Runtime steering', 'Evaluation']}
      items={[
        { id: 'instruction-tuning', label: 'instruction tuning', category: 'Durable shaping' },
        { id: 'human-feedback', label: 'human feedback learning', category: 'Durable shaping' },
        { id: 'preference-optimization', label: 'preference optimization', category: 'Durable shaping' },
        { id: 'system-prompt', label: 'system prompt', category: 'Runtime steering' },
        { id: 'policy-filter', label: 'policy filter', category: 'Runtime steering' },
        { id: 'tool-rule', label: 'tool rule', category: 'Runtime steering' },
        { id: 'safety-test', label: 'safety test', category: 'Evaluation' },
        { id: 'red-team-review', label: 'red-team review', category: 'Evaluation' }
      ]}
      insight="Alignment is a layered effort: some methods train behavior, some steer a run, and some test the system."
    />
  )
}

function LearningModesSortInteraction() {
  return (
    <CycleSortInteraction
      label="Sort learning and steering methods"
      categories={['Durable weight change', 'Temporary context steering', 'Retrieval/context', 'Evaluation/feedback']}
      items={[
        { id: 'pretraining', label: 'pretraining', category: 'Durable weight change' },
        { id: 'fine-tuning', label: 'fine-tuning', category: 'Durable weight change' },
        { id: 'adapter-training', label: 'adapter training', category: 'Durable weight change' },
        { id: 'prompt-instruction', label: 'prompt instruction', category: 'Temporary context steering' },
        { id: 'in-context-example', label: 'in-context example', category: 'Temporary context steering' },
        { id: 'response-so-far', label: 'response-so-far', category: 'Temporary context steering' },
        { id: 'rag-note', label: 'RAG note', category: 'Retrieval/context' },
        { id: 'retrieved-document', label: 'retrieved document', category: 'Retrieval/context' },
        { id: 'human-rating', label: 'human rating', category: 'Evaluation/feedback' },
        { id: 'safety-test', label: 'safety test', category: 'Evaluation/feedback' }
      ]}
      insight="Not all useful AI behavior is durable learning; some of it is current-context steering."
    />
  )
}

function DiffusionContrastInteraction() {
  const paths = {
    token: {
      label: 'Token path',
      steps: ['score next token', 'choose token', 'append token', 'run again'],
      feedback: 'Autoregression adds tokens. The response grows one chosen token at a time.'
    },
    denoise: {
      label: 'Denoise path',
      steps: ['noise', 'rough shape', 'clearer pattern', 'final output'],
      feedback: 'Diffusion refines from noise. The output becomes clearer step by step.'
    }
  }
  const [path, setPath] = useState('token')
  const [step, setStep] = useState(0)
  const current = paths[path]
  const currentStep = current.steps[step]
  const complete = step === current.steps.length - 1

  function choosePath(nextPath) {
    setPath(nextPath)
    setStep(0)
  }

  return (
    <div className="twilight-interaction diffusion-contrast-demo">
      <div className="segmented-control wide" role="group" aria-label="Choose generation pattern">
        {Object.entries(paths).map(([id, item]) => (
          <button key={id} className={path === id ? 'active' : ''} onClick={() => choosePath(id)} aria-pressed={path === id}>
            {item.label}
          </button>
        ))}
      </div>
      <div className={`diffusion-contrast-board is-${path}`} aria-live="polite">
        {current.steps.map((item, index) => (
          <span key={item} className={index <= step ? 'active' : ''}>{item}</span>
        ))}
      </div>
      <button className="morning-primary-action" onClick={() => setStep((step + 1) % current.steps.length)}>
        {complete ? 'Reset path' : `Show ${current.steps[step + 1]}`}
      </button>
      <p className={complete ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {complete ? `Insight strengthened. ${current.feedback}` : `Current step: ${currentStep}.`}
      </p>
    </div>
  )
}

function MultimodalMapInteraction() {
  const pairs = [
    { id: 'image-caption', input: 'image', middle: 'visual representation', output: 'caption', detail: 'An image can be encoded, connected to language, and described in text.' },
    { id: 'audio-transcript', input: 'audio', middle: 'sound representation', output: 'transcript', detail: 'Audio can be represented as patterns and converted into text.' },
    { id: 'text-image', input: 'text prompt', middle: 'connected model space', output: 'generated image', detail: 'A prompt can steer a media generator toward an image output.' },
    { id: 'chart-answer', input: 'chart + question', middle: 'linked representations', output: 'answer', detail: 'A system can combine an image-like input and a language question.' }
  ]
  const [activeId, setActiveId] = useState(pairs[0].id)
  const active = pairs.find((pair) => pair.id === activeId) ?? pairs[0]

  return (
    <div className="twilight-interaction multimodal-map-demo">
      <div className="media-match-row" role="group" aria-label="Match media modes to possible outputs">
        {pairs.map((pair) => (
          <button key={pair.id} className={activeId === pair.id ? 'active' : ''} onClick={() => setActiveId(pair.id)} aria-pressed={activeId === pair.id}>
            <strong>{pair.input}</strong>
            <span>{pair.output}</span>
          </button>
        ))}
      </div>
      <div className="media-flow-board" aria-live="polite">
        <span>{active.input}</span>
        <span>{active.middle}</span>
        <span>{active.output}</span>
      </div>
      <p className="micro-feedback good" role="status">
        Insight strengthened. {active.detail}
      </p>
    </div>
  )
}

function PerfectStormIngredientsInteraction() {
  const ingredients = [
    { id: 'data', label: 'Data', detail: 'Human-created digital text, code, art, research, and conversation supplied patterns.' },
    { id: 'compute', label: 'Compute', detail: 'Powerful hardware made large-scale training and inference practical.' },
    { id: 'storage', label: 'Storage', detail: 'Large datasets, indexes, and model checkpoints require massive digital storage.' },
    { id: 'methods', label: 'Algorithms', detail: 'Deep-learning and transformer methods made the patterns usable.' },
    { id: 'labor', label: 'Human labor', detail: 'People created data, labeled outputs, evaluated responses, and shaped preferences.' },
    { id: 'incentives', label: 'Incentives', detail: 'Money, competition, institutional demand, and platform scale accelerated development.' }
  ]
  const [activeIds, setActiveIds] = useState(['data'])
  const lastActive = ingredients.find((item) => item.id === activeIds[activeIds.length - 1]) ?? ingredients[0]
  const allActive = ingredients.every((item) => activeIds.includes(item.id))

  function toggle(id) {
    setActiveIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  return (
    <div className="twilight-interaction perfect-storm-demo">
      <div className="storm-stream-board" aria-hidden="true">
        {ingredients.map((item, index) => (
          <span key={item.id} className={activeIds.includes(item.id) ? 'active' : ''} style={{ '--i': index } as React.CSSProperties} />
        ))}
        <strong>modern LLM capability</strong>
      </div>
      <div className="storm-ingredient-grid" role="group" aria-label="Tap storm ingredients">
        {ingredients.map((item) => (
          <button key={item.id} className={activeIds.includes(item.id) ? 'active' : ''} onClick={() => toggle(item.id)} aria-pressed={activeIds.includes(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className={allActive ? 'micro-feedback good' : 'micro-feedback'} role="status">
        <strong>{lastActive.label}:</strong> {lastActive.detail}
        {allActive && ' Insight strengthened. Modern LLMs came from convergence, not one magic breakthrough.'}
      </p>
    </div>
  )
}

function CollectiveHumanQuestionsInteraction() {
  return (
    <CycleSortInteraction
      label="Sort which items are human or institutional questions"
      categories={['Human question', 'Model mechanics']}
      successLabel="Insight strengthened"
      items={[
        { id: 'provenance', label: 'provenance', category: 'Human question' },
        { id: 'consent', label: 'consent', category: 'Human question' },
        { id: 'copyright', label: 'copyright', category: 'Human question' },
        { id: 'compensation', label: 'compensation', category: 'Human question' },
        { id: 'weights', label: 'model weights', category: 'Model mechanics' },
        { id: 'tokens', label: 'prompt tokens', category: 'Model mechanics' }
      ]}
      insight="Human-created traces can shape models, but rights, attribution, consent, and compensation remain human and institutional questions."
    />
  )
}

function CostLedgerInteraction() {
  const entries = [
    { id: 'energy', label: 'Energy', detail: 'Energy use depends on model size, workload, hardware, data center, and electricity source.' },
    { id: 'water', label: 'Water', detail: 'Water impact depends on cooling design, location, electricity generation, and workload.' },
    { id: 'hardware', label: 'Hardware', detail: 'Chips, servers, networking, and e-waste carry material supply-chain costs.' },
    { id: 'labor', label: 'Labor', detail: 'AI can reshape tasks, wages, working conditions, and skill development.' },
    { id: 'privacy', label: 'Privacy', detail: 'Sensitive data can be exposed through prompts, logs, tools, or integrations.' },
    { id: 'governance', label: 'Governance', detail: 'Institutions decide procurement, review, accountability, and acceptable use.' }
  ]
  const [active, setActive] = useState('energy')
  const current = entries.find((entry) => entry.id === active) ?? entries[0]

  return (
    <div className="morning-interaction cost-ledger-demo">
      <p className="micro-prompt">Tap a ledger entry to see what must be counted.</p>
      <div className="morning-choice-row compact" role="group" aria-label="Cost ledger entries">
        {entries.map((entry) => (
          <button
            key={entry.id}
            className={active === entry.id ? 'active' : ''}
            onClick={() => setActive(entry.id)}
            aria-pressed={active === entry.id}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <p className="micro-feedback good" role="status">
        <strong>{current.label}:</strong> {current.detail}
      </p>
    </div>
  )
}

function RiskMythSortInteraction() {
  return (
    <CycleSortInteraction
      label="Sort each claim as real risk or myth"
      categories={['Real risk', 'Myth']}
      successLabel="Insight strengthened"
      items={[
        { id: 'private-records', label: 'Private student records in a public chatbot', category: 'Real risk' },
        { id: 'conscious-chat', label: 'The model becomes conscious during the chat', category: 'Myth' },
        { id: 'retrieved-attack', label: 'Malicious retrieved text overrides intended instructions', category: 'Real risk' },
        { id: 'secret-training', label: 'The model permanently trains itself on every ordinary prompt', category: 'Myth' },
        { id: 'overreliance-review', label: 'Overreliance weakens human review', category: 'Real risk' },
        { id: 'softmax-files', label: 'Softmax steals files', category: 'Myth' }
      ]}
      insight="Real AI risks usually come from data, context, tools, institutions, and overreliance, not from model consciousness or magic."
    />
  )
}

function BenefitTierSortInteraction() {
  return (
    <CycleSortInteraction
      label="Sort benefit claims by confidence"
      categories={['Useful now with review', 'Plausible with safeguards', 'Speculative / hype']}
      successLabel="Insight strengthened"
      items={[
        { id: 'reviewed-assist', label: 'AI can assist drafts, search, translation, and access under human review.', category: 'Useful now with review' },
        { id: 'automatic-education', label: 'AI will automatically solve education.', category: 'Speculative / hype' },
        { id: 'human-judgment', label: 'AI has human judgment now.', category: 'Speculative / hype' },
        { id: 'no-costs', label: 'AI benefits mean no costs matter.', category: 'Speculative / hype' }
      ]}
      insight="Benefits can be real and bounded when humans review evidence and context."
    />
  )
}

function HumanCenteredScenarioInteraction() {
  const choices = [
    { id: 'draft-review', label: 'Use summary as a draft; human reviews before action.', correct: true },
    { id: 'auto-decide', label: 'Automatically decide support needs with no review.', correct: false },
    { id: 'hide-limits', label: 'Hide model limitations from staff.', correct: false },
    { id: 'fluency-proof', label: 'Treat fluent text as proof.', correct: false }
  ]
  const [choice, setChoice] = useState(null)
  const selected = choices.find((item) => item.id === choice)

  return (
    <div className="morning-interaction new-dawn-interaction human-centered-scenario-demo">
      <p className="micro-prompt">An AI tool helps summarize student support notes. Which deployment keeps people accountable?</p>
      <div className="new-dawn-scenario-board" aria-hidden="true">
        <span>AI summary</span>
        <span>student support context</span>
        <span>human review</span>
        <span>accountable action</span>
      </div>
      <div className="morning-choice-row" role="group" aria-label="Choose the human-centered deployment">
        {choices.map((item) => (
          <button key={item.id} className={choice === item.id ? 'active' : ''} onClick={() => setChoice(item.id)} aria-pressed={choice === item.id}>
            {item.label}
          </button>
        ))}
      </div>
      <p className={selected?.correct ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {selected
          ? selected.correct
            ? 'Insight strengthened. Human-centered AI keeps responsibility with people and institutions.'
            : 'Not quite. Human-centered AI keeps limits, review, and accountability visible.'
          : 'Choose the deployment pattern that treats the model output as support, not authority.'}
      </p>
    </div>
  )
}

function BetterAiLeversInteraction() {
  const levers = [
    { id: 'rag', label: 'Use RAG over approved documents', good: true },
    { id: 'privacy', label: 'Protect sensitive data', good: true },
    { id: 'sources', label: 'Require source links and review', good: true },
    { id: 'right-size', label: 'Choose a smaller task-fit model if adequate', good: true },
    { id: 'monitor', label: 'Monitor errors', good: true },
    { id: 'any-chatbot', label: 'Upload private data to any chatbot', good: false },
    { id: 'bigger', label: 'Assume bigger is always better', good: false },
    { id: 'no-accountability', label: 'Remove human accountability', good: false },
    { id: 'ignore-provenance', label: 'Ignore data provenance', good: false }
  ]
  const [selectedIds, setSelectedIds] = useState([])
  const selected = levers.filter((lever) => selectedIds.includes(lever.id))
  const selectedBad = selected.filter((lever) => !lever.good)
  const selectedGoodCount = selected.filter((lever) => lever.good).length
  const complete = selectedGoodCount === levers.filter((lever) => lever.good).length && selectedBad.length === 0

  function toggle(id) {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  return (
    <div className="morning-interaction new-dawn-interaction better-ai-levers-demo">
      <p className="micro-prompt">A department wants an AI assistant for internal policy questions. Tap the better-AI levers.</p>
      <div className="lever-panel" role="group" aria-label="Better AI design and governance levers">
        {levers.map((lever) => (
          <button
            key={lever.id}
            className={selectedIds.includes(lever.id) ? 'active' : ''}
            onClick={() => toggle(lever.id)}
            aria-pressed={selectedIds.includes(lever.id)}
          >
            {lever.label}
          </button>
        ))}
      </div>
      <p className={complete ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {complete
          ? 'Insight strengthened. Better AI is shaped by task-fit design, evidence, privacy, review, monitoring, and governance.'
          : selectedBad.length
            ? `Not quite. ${selectedBad[0].label} raises risk instead of reducing it.`
            : selectedGoodCount
              ? `${selectedGoodCount} useful lever${selectedGoodCount === 1 ? '' : 's'} selected. Keep looking for privacy, review, sources, task fit, and monitoring.`
              : 'Start with choices that protect data, use approved evidence, keep review, and fit the task.'}
      </p>
    </div>
  )
}

function PromptBuilderInteraction() {
  const parts = [
    { id: 'task', label: 'Task', add: 'Summarize this policy' },
    { id: 'audience', label: 'Audience', add: 'for first-year students' },
    { id: 'constraints', label: 'Constraints', add: 'using only the provided document' },
    { id: 'examples', label: 'Examples', add: 'include one policy example if available' },
    { id: 'format', label: 'Format', add: 'in five bullets' },
    { id: 'evidence', label: 'Evidence', add: 'name the evidence you used' },
    { id: 'uncertainty', label: 'Uncertainty', add: 'state uncertainty' },
    { id: 'review', label: 'Review', add: 'flag anything that needs human review' }
  ]
  const [selectedIds, setSelectedIds] = useState(['task'])
  const complete = parts.every((part) => selectedIds.includes(part.id))
  const prompt = complete
    ? 'Summarize this policy for first-year students in five bullets. Use only the provided document. Include one policy example if available. Name the evidence used. State uncertainty. Flag anything that needs human review.'
    : selectedIds.length === 1
      ? 'Summarize this.'
      : `${parts.filter((part) => selectedIds.includes(part.id)).map((part) => part.add).join(' ')}.`

  function toggle(id) {
    if (id === 'task') return
    setSelectedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  return (
    <div className="morning-interaction new-dawn-interaction prompt-builder-demo">
      <p className="micro-prompt">Build a better prompt by adding the missing context parts.</p>
      <div className="prompt-draft-card" aria-live="polite">
        <span>Current prompt</span>
        <p>{prompt}</p>
      </div>
      <div className="prompt-part-grid" role="group" aria-label="Prompt parts to include">
        {parts.map((part) => (
          <button
            key={part.id}
            className={selectedIds.includes(part.id) ? 'active' : ''}
            disabled={part.id === 'task'}
            onClick={() => toggle(part.id)}
            aria-pressed={selectedIds.includes(part.id)}
          >
            {part.label}
          </button>
        ))}
      </div>
      <p className={complete ? 'micro-feedback good' : 'micro-feedback'} role="status">
        {complete
          ? 'Insight strengthened. A good prompt builds useful context for this run; it does not rewrite model weights.'
          : 'Add audience, constraints, examples, format, evidence, uncertainty, and review so the current context is clearer.'}
      </p>
    </div>
  )
}

function SynthesisChainInteraction() {
  const steps = [
    { id: 'prompt', label: 'prompt enters context' },
    { id: 'tokens', label: 'text becomes tokens and IDs' },
    { id: 'states', label: 'embeddings become hidden states' },
    { id: 'probabilities', label: 'logits become probabilities' },
    { id: 'sample', label: 'one token is sampled' },
    { id: 'append', label: 'token is appended and the model runs again' },
    { id: 'evidence', label: 'RAG/grounding can add evidence' },
    { id: 'accountability', label: 'humans review and remain accountable' }
  ]
  const [orderedIds, setOrderedIds] = useState([])
  const [hint, setHint] = useState('Begin with what enters the model run.')
  const complete = orderedIds.length === steps.length
  const nextStep = steps[orderedIds.length]
  const ordered = orderedIds.map((id) => steps.find((step) => step.id === id)).filter(Boolean)

  function choose(id) {
    if (orderedIds.includes(id) || complete) return
    if (id !== nextStep.id) {
      setHint(`That belongs later. Next, choose "${nextStep.label}."`)
      return
    }
    setOrderedIds((current) => [...current, id])
    const nextIndex = orderedIds.length + 1
    setHint(nextIndex === steps.length
      ? 'Insight strengthened. Model literacy means understanding both the machine chain and the human consequences.'
      : `Good. Next comes "${steps[nextIndex].label}."`)
  }

  function reset() {
    setOrderedIds([])
    setHint('Begin with what enters the model run.')
  }

  return (
    <div className="morning-interaction new-dawn-interaction synthesis-chain-demo">
      <p className="micro-prompt">Put the model story in order.</p>
      <ol className="synthesis-order-list" aria-label="Chosen model story order" aria-live="polite">
        {steps.map((step, index) => (
          <li key={step.id} className={orderedIds[index] === step.id ? 'active' : ''}>
            <span>{index + 1}</span>
            <strong>{ordered[index]?.label ?? 'waiting'}</strong>
          </li>
        ))}
      </ol>
      <div className="synthesis-choice-grid" role="group" aria-label="Tap model story steps in order">
        {steps.map((step) => (
          <button
            key={step.id}
            className={orderedIds.includes(step.id) ? 'active' : ''}
            onClick={() => choose(step.id)}
            disabled={orderedIds.includes(step.id)}
            aria-pressed={orderedIds.includes(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>
      <button className="morning-primary-action" type="button" onClick={reset}>Reset chain</button>
      <p className={complete ? 'micro-feedback good' : 'micro-feedback'} role="status">{hint}</p>
    </div>
  )
}

function CycleSortInteraction({ label, categories, items, insight, successLabel = 'Insight unlocked' }) {
  const [assignments, setAssignments] = useState({})
  const allAssigned = items.every((item) => assignments[item.id])
  const allCorrect = items.every((item) => assignments[item.id] === item.category)

  function cycle(itemId) {
    setAssignments((prev) => {
      const current = prev[itemId]
      const currentIndex = categories.indexOf(current)
      const nextCategory = categories[(currentIndex + 1) % categories.length]
      return { ...prev, [itemId]: nextCategory }
    })
  }

  return (
    <div className="micro-sort-demo">
      <div className="micro-sort-items" aria-label={label}>
        {items.map((item) => {
          const assigned = assignments[item.id]
          const correct = assigned === item.category
          return (
            <button
              key={item.id}
              className={['micro-sort-chip', assigned ? 'is-assigned' : '', allAssigned && correct ? 'is-correct' : ''].filter(Boolean).join(' ')}
              onClick={() => cycle(item.id)}
              aria-pressed={Boolean(assigned)}
            >
              <strong>{item.label}</strong>
              <span>{assigned ?? 'Tap to sort'}</span>
            </button>
          )
        })}
      </div>
      <div className="micro-sort-buckets" aria-label="Current buckets">
        {categories.map((category) => (
          <div key={category}>
            <strong>{category}</strong>
            <span>{items.filter((item) => assignments[item.id] === category).map((item) => item.label).join(', ') || 'empty'}</span>
          </div>
        ))}
      </div>
      <p aria-live="polite">{allAssigned ? (allCorrect ? `${successLabel}. ${insight}` : 'A few cards are still in the wrong group. Keep cycling.') : 'Tap each card until it lands in the best group.'}</p>
    </div>
  )
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
  const [playProgress, setPlayProgress] = useState(() => loadPlayChallengeProgress())
  const refreshPlayProgress = useCallback(() => setPlayProgress(loadPlayChallengeProgress()), [])
  const dojoProgress = loadGlossaryDojoProgress()
  const legacySignals = {
    gameInsights,
    traceComplete,
    promptRunProgress,
    learningTourComplete,
    glossaryDojoProgress: dojoProgress
  }
  const challengeSummaries = buildPlayChallengeSummaries(playProgress, legacySignals, finalPlayChallengeRegistry)
    .map((item) => ({
      ...item,
      image: item.image?.startsWith('/') ? `${BASE}${item.image}` : item.image
    }))
  const completedFinalChallenges = getCompletedFinalPlayCount(challengeSummaries)

  const recordChallengeStart = useCallback((id, outcome = {}) => {
    setPlayProgress(recordPlayChallengeAttempt(id, outcome))
  }, [])

  const completeChallenge = useCallback((id, outcome = {}) => {
    setPlayProgress(markPlayChallengeCompleted(id, outcome))
  }, [])

  const updateChallenge = useCallback((id, outcome = {}) => {
    setPlayProgress(updatePlayChallengeProgress(id, outcome))
  }, [])

  const startChallenge = useCallback((item) => {
    if (item.disabled) return
    if (item.recordAttemptOnOpen !== false) {
      recordChallengeStart(item.id, {
        progressPct: item.progress.bestProgressPct,
        outcome: 'Practice started. Progress saved on this device.',
        misconceptionTags: item.misconceptionTags
      })
    }
    setGameId(item.routeId ?? item.id)
  }, [recordChallengeStart, setGameId])

  const recordAttentionInsight = useCallback((legacyId) => {
    onInsight(legacyId)
    completeChallenge('attention-match', {
      progressPct: 100,
      outcome: 'You found the main idea: attention is relevance between token positions.',
      misconceptionTags: ['attention-is-awareness']
    })
  }, [completeChallenge, onInsight])

  if (gameId === 'trace-one-prompt' || gameId === 'prompt-run') {
    return (
      <PromptRunScreen
        onBack={() => setGameId(null)}
        onComplete={() => {
          completeChallenge('prompt-run', {
            progressPct: 100,
            outcome: 'Completed without needing a score.',
            misconceptionTags: ['inference-is-training', 'next-token-magic']
          })
          onTraceComplete()
        }}
        saved={traceComplete}
        promptRunProgress={promptRunProgress}
        onPromptRunAttempt={onPromptRunAttempt}
        onGlossary={onGlossary}
      />
    )
  }
  if (gameId === 'context-stack') {
    return (
      <ContextStack
        onBack={() => { refreshPlayProgress(); setGameId(null) }}
        onGlossary={onGlossary}
        onAttempt={() => {
          recordChallengeStart('context-stack', {
            outcome: 'Context Stack attempt started. Progress saved on this device.',
            misconceptionTags: ['context-is-not-memory']
          })
        }}
        onProgress={(outcome) => updateChallenge('context-stack', outcome)}
        onComplete={(outcome) => {
          onInsight('context-stack')
          completeChallenge('context-stack', outcome)
        }}
        saved={gameInsights.includes('context-stack')}
      />
    )
  }
  if (gameId === 'attention-match' || gameId === 'attention-weave') {
    return <AttentionWeave title="Attention Match" onBack={() => { refreshPlayProgress(); setGameId(null) }} onGlossary={onGlossary} onInsight={recordAttentionInsight} saved={gameInsights.includes('attention-weave')} />
  }
  if (gameId === 'glossary-dojo') {
    return (
      <GlossaryDojoGame
        onBack={() => { refreshPlayProgress(); setGameId(null) }}
        onGlossary={onGlossary}
        onAttempt={() => {
          setPlayProgress(recordPlayChallengeAttempt('glossary-dojo', {
            outcome: 'Progress saved on this device. Glossary Dojo round started.',
            misconceptionTags: ['term-confusion']
          }))
        }}
        onComplete={(round) => {
          const reviewSuggested = Boolean(round?.missedCount && round.missedCount > 0)
          setPlayProgress(markPlayChallengeCompleted('glossary-dojo', {
            progressPct: 100,
            reviewSuggested,
            outcome: reviewSuggested
              ? 'Round completed. Review suggested.'
              : 'Round completed. Progress saved on this device.',
            misconceptionTags: ['term-confusion']
          }))
        }}
      />
    )
  }
  if (gameId === 'probability-picker') {
    return <FoundationReadyScreen onBack={() => setGameId(null)} onGlossary={onGlossary} />
  }
  const retiredChallenge = findRetiredPlayChallenge(gameId)
  if (retiredChallenge) {
    return (
      <RetiredPlayChallengeScreen
        challenge={retiredChallenge}
        onBack={() => setGameId(null)}
        onOpenReplacement={() => setGameId(retiredChallenge.routeId ?? null)}
      />
    )
  }

  return (
    <section className="screen play-screen play-lab-screen" aria-labelledby="play-title">
      <ScreenHeader
        kicker="ZenTron Paper Lab"
        title="Play to understand"
        subtitle="Short, calm challenges for tracing, placing, choosing, connecting, and naming model moves."
        titleId="play-title"
      />
      <PlayFeedbackPanel>
        <p><strong>Progress saved on this device.</strong> Play is practice, not a score. {completedFinalChallenges} of {FINAL_PLAY_CHALLENGE_COUNT} practice challenges show saved completion or review progress.</p>
        <div className="play-token-row" aria-label="Play action verbs">
          <PlayTokenChip tone="prompt">name</PlayTokenChip>
          <PlayTokenChip tone="context">place</PlayTokenChip>
          <PlayTokenChip tone="probability">choose</PlayTokenChip>
          <PlayTokenChip tone="response">trace</PlayTokenChip>
          <PlayTokenChip>connect</PlayTokenChip>
        </div>
      </PlayFeedbackPanel>
      <PlayProgressRail value={(completedFinalChallenges / FINAL_PLAY_CHALLENGE_COUNT) * 100} label={`${completedFinalChallenges} of ${FINAL_PLAY_CHALLENGE_COUNT} Play practice challenges complete or review suggested`} />
      <PlayScrollHint />
      <section className="play-section" aria-labelledby="practice-challenges-title">
        <div className="play-section-heading">
          <h2 id="practice-challenges-title">Practice challenges</h2>
          <PlayStatusPill status="in-progress" label="Practice set" />
        </div>
        <PlayChallengeBoard label="Play practice challenges" className="play-slate-board">
          {challengeSummaries.map((challenge) => (
            <PlayChallengeCard key={challenge.id} item={challenge} onStart={startChallenge} />
          ))}
        </PlayChallengeBoard>
      </section>
    </section>
  )
}

function FoundationReadyScreen({ onBack, onGlossary }) {
  return (
    <PlayChallengeShell
      title="Probability Picker"
      titleId="probability-picker-title"
      eyebrow="Coming soon"
      subtitle="This practice slot is reserved for a future calm decoding challenge. The full game is not implemented yet."
      onBack={onBack}
    >
      <PlayChallengeBoard label="Probability Picker coming soon board" className="probability-foundation-board">
        <PlayTokenChip tone="prompt">logits</PlayTokenChip>
        <PlayTokenChip tone="probability">softmax</PlayTokenChip>
        <PlayTokenChip tone="response">sample one token</PlayTokenChip>
      </PlayChallengeBoard>
      <PlayFeedbackPanel>
        <p>Next pass: let learners choose one next token from probabilities and explain why probability is not truth.</p>
      </PlayFeedbackPanel>
      <PlayActionRow>
        <button className="secondary-btn" type="button" onClick={() => onGlossary('logits')}>Logits</button>
        <button className="secondary-btn" type="button" onClick={() => onGlossary('softmax')}>Softmax</button>
        <button className="secondary-btn" type="button" onClick={() => onGlossary('sampling')}>Sampling</button>
      </PlayActionRow>
    </PlayChallengeShell>
  )
}

function RetiredPlayChallengeScreen({ challenge, onBack, onOpenReplacement }) {
  const hasReplacement = challenge.id === 'attention-weave'
  return (
    <PlayChallengeShell
      title={challenge.title}
      titleId="retired-play-title"
      eyebrow="Retired from final slate"
      subtitle={challenge.tenSecondExplanation}
      onBack={onBack}
    >
      <PlayCompletionPanel title="Preserved for compatibility">
        <p>{challenge.shortDescription}</p>
        <p>Existing saved progress remains on this device, but this item is not presented as a final Play challenge.</p>
      </PlayCompletionPanel>
      <PlayActionRow>
        {hasReplacement && <button className="primary-btn" type="button" onClick={onOpenReplacement}>Open Attention Match</button>}
        <button className="secondary-btn" type="button" onClick={onBack}>Back to Play</button>
      </PlayActionRow>
    </PlayChallengeShell>
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

const contextStackRounds = [
  {
    id: 'basic-window',
    title: 'Basic context window',
    shortTitle: 'Last few cards fit',
    objective: 'See that only the newest visible cards remain in the context window.',
    instruction: 'Tap all six cards in order. Watch the oldest cards fall out when the fifth and sixth enter.',
    checkLabel: 'Check visible cards',
    windowSize: 4,
    mode: 'add-all',
    success: 'Good stack. You saw the window keep only the most recent visible cards.',
    review: 'Add every card so the window has to make older context fall out.',
    cards: [
      { id: 'user-llm', label: 'User: explain LLMs', detail: 'original request', kind: 'prompt' },
      { id: 'audience', label: 'Audience: smart beginner', detail: 'helpful context', kind: 'context' },
      { id: 'tone-calm', label: 'Tone: calm', detail: 'style instruction', kind: 'context' },
      { id: 'format-bullets', label: 'Format: three bullets', detail: 'output shape', kind: 'context' },
      { id: 'picnic-note', label: 'Extra: picnic note', detail: 'irrelevant clutter', kind: 'distractor' },
      { id: 'output-now', label: 'Output request: answer now', detail: 'final trigger', kind: 'response' }
    ],
    tags: ['context-is-not-memory']
  },
  {
    id: 'detail-falls-out',
    title: 'Important detail falls out',
    shortTitle: 'Keep the key instruction',
    objective: 'Keep the user goal, constraint, and evidence visible before the answer happens.',
    instruction: 'Choose only the cards the model should still see. If clutter enters, a key instruction may fall out.',
    checkLabel: 'Check kept context',
    windowSize: 4,
    requiredVisible: ['user-policy', 'constraint-numbers', 'evidence-review', 'output-summary'],
    avoidVisible: ['snack-pref'],
    success: 'Good stack. The goal, constraint, and evidence are visible together.',
    review: 'Review suggested. A key instruction or evidence card fell out before the answer.',
    cards: [
      { id: 'user-policy', label: 'User: summarize policy', detail: 'task goal', kind: 'prompt' },
      { id: 'constraint-numbers', label: 'Constraint: do not invent numbers', detail: 'important instruction', kind: 'context' },
      { id: 'evidence-review', label: 'Evidence: review every year', detail: 'source detail', kind: 'context' },
      { id: 'tone-concise', label: 'Tone: concise', detail: 'style only', kind: 'context' },
      { id: 'snack-pref', label: 'Distractor: office snack preference', detail: 'crowds context', kind: 'distractor' },
      { id: 'output-summary', label: 'Output request: answer now', detail: 'final trigger', kind: 'response' }
    ],
    tags: ['context-is-not-memory', 'irrelevant-context-crowding']
  },
  {
    id: 'retrieval-enters-context',
    title: 'Retrieved evidence enters context',
    shortTitle: 'Open-book context',
    objective: 'Use retrieved evidence only after it enters the current context window.',
    instruction: 'Fit the user request and retrieved handbook facts into the window. Leave the rumor outside.',
    checkLabel: 'Check retrieved context',
    windowSize: 4,
    requiredVisible: ['user-handbook', 'retrieved-refunds', 'retrieved-appeals', 'output-handbook'],
    avoidVisible: ['forum-rumor'],
    success: 'Good stack. Retrieved evidence helps because it entered context before the answer.',
    review: 'Review suggested. Retrieved evidence helps only after it enters context, and clutter can crowd it out.',
    cards: [
      { id: 'user-handbook', label: 'User: answer using handbook', detail: 'task goal', kind: 'prompt' },
      { id: 'retrieved-refunds', label: 'Retrieved: refunds close after 30 days', detail: 'handbook evidence', kind: 'retrieved' },
      { id: 'retrieved-appeals', label: 'Retrieved: appeals use Form B', detail: 'handbook evidence', kind: 'retrieved' },
      { id: 'forum-rumor', label: 'Distractor: old forum rumor', detail: 'unsupported clutter', kind: 'distractor' },
      { id: 'format-one-sentence', label: 'Format: one sentence', detail: 'style instruction', kind: 'context' },
      { id: 'output-handbook', label: 'Output request: answer now', detail: 'final trigger', kind: 'response' }
    ],
    tags: ['retrieval-must-enter-context', 'irrelevant-context-crowding']
  }
]

function uniqueList(list) {
  return [...new Set(list.filter(Boolean))]
}

function getContextCard(round, cardId) {
  return round.cards.find((card) => card.id === cardId)
}

function contextCardTone(card) {
  if (card?.kind === 'prompt') return 'prompt'
  if (card?.kind === 'response') return 'response'
  if (card?.kind === 'retrieved') return 'context'
  if (card?.kind === 'distractor') return 'probability'
  return 'default'
}

function evaluateContextRound(round, visibleIds, fallenIds, stackIds) {
  if (round.mode === 'add-all') {
    if (stackIds.length < round.cards.length) {
      return {
        complete: false,
        ok: false,
        tone: 'neutral',
        message: `Add ${round.cards.length - stackIds.length} more card${round.cards.length - stackIds.length === 1 ? '' : 's'} to make the window overflow.`
      }
    }
    return {
      complete: true,
      ok: fallenIds.length > 0,
      tone: 'good',
      message: round.success,
      tags: round.tags
    }
  }

  const missing = (round.requiredVisible ?? []).filter((cardId) => !visibleIds.includes(cardId))
  const clutter = (round.avoidVisible ?? []).filter((cardId) => visibleIds.includes(cardId))
  const ok = missing.length === 0 && clutter.length === 0
  const missingLabels = missing.map((cardId) => getContextCard(round, cardId)?.label ?? cardId)
  const clutterLabels = clutter.map((cardId) => getContextCard(round, cardId)?.label ?? cardId)
  const detail = ok
    ? round.success
    : `${round.review}${missingLabels.length ? ` Missing: ${missingLabels.join(', ')}.` : ''}${clutterLabels.length ? ` Clutter still visible: ${clutterLabels.join(', ')}.` : ''}`

  return {
    complete: true,
    ok,
    tone: ok ? 'good' : 'review',
    message: detail,
    tags: ok ? round.tags : uniqueList([...(round.tags ?? []), ...(missing.length ? ['context-is-not-memory'] : []), ...(clutter.length ? ['irrelevant-context-crowding'] : [])])
  }
}

function ContextStack({ onBack, onGlossary, onAttempt, onProgress, onComplete, saved }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [stackIds, setStackIds] = useState([])
  const [roundResults, setRoundResults] = useState([])
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState({
    tone: 'neutral',
    message: saved
      ? 'Progress saved from an earlier Context Stack round. Try the new three-round version whenever you like.'
      : 'Tap a card to place it into the current context window.'
  })
  const round = contextStackRounds[roundIndex]
  const windowSize = round.windowSize
  const visibleIds = stackIds.slice(-windowSize)
  const fallenIds = stackIds.slice(0, Math.max(0, stackIds.length - windowSize))
  const visibleCards = visibleIds.map((cardId) => getContextCard(round, cardId)).filter(Boolean)
  const fallenCards = fallenIds.map((cardId) => getContextCard(round, cardId)).filter(Boolean)
  const availableCards = round.cards.filter((card) => !stackIds.includes(card.id))
  const incomingCards = availableCards.filter((card) => card.kind !== 'retrieved')
  const retrievedCards = availableCards.filter((card) => card.kind === 'retrieved')
  const currentProgress = completed
    ? 100
    : Math.min(99, Math.round(((roundIndex + Math.min(0.85, stackIds.length / Math.max(1, round.cards.length))) / contextStackRounds.length) * 100))
  const status = completed
    ? roundResults.some((result) => !result.ok) ? 'review-suggested' : 'completed'
    : 'in-progress'
  const statusLabel = completed
    ? roundResults.some((result) => !result.ok) ? 'Review suggested' : 'Completed'
    : `Round ${roundIndex + 1} of ${contextStackRounds.length}`

  function resetRound(nextRoundIndex = roundIndex) {
    setRoundIndex(nextRoundIndex)
    setStackIds([])
    setFeedback({
      tone: 'neutral',
      message: nextRoundIndex === 2
        ? 'Retrieved evidence helps only after it enters the current context.'
        : 'Tap a card to place it into the current context window.'
    })
  }

  function addCard(cardId) {
    const card = getContextCard(round, cardId)
    if (!card || stackIds.includes(cardId) || completed) return
    const nextStack = [...stackIds, cardId]
    const nextFallenId = nextStack.length > windowSize ? nextStack[nextStack.length - windowSize - 1] : null
    setStackIds(nextStack)
    setFeedback({
      tone: 'neutral',
      message: nextFallenId
        ? `${card.label} is visible to the model now. ${getContextCard(round, nextFallenId)?.label ?? 'An earlier card'} fell out of the window.`
        : `${card.label} is visible to the model now.`
    })
  }

  function checkRound() {
    const result = evaluateContextRound(round, visibleIds, fallenIds, stackIds)
    setFeedback({ tone: result.tone, message: result.message })
    if (!result.complete) return

    const nextResults = [...roundResults.filter((item) => item.roundId !== round.id), { roundId: round.id, ok: result.ok, tags: result.tags ?? [] }]
    setRoundResults(nextResults)
    const nextProgress = Math.round(((roundIndex + 1) / contextStackRounds.length) * 100)
    const tags = uniqueList(nextResults.flatMap((item) => item.tags ?? []))

    if (roundIndex === contextStackRounds.length - 1) {
      const reviewSuggested = nextResults.some((item) => !item.ok)
      setCompleted(true)
      onComplete({
        progressPct: 100,
        reviewSuggested,
        outcome: reviewSuggested
          ? 'Completed. Review suggested. A key instruction or retrieved evidence was missing at least once.'
          : 'Completed. You saw how context can grow and expire.',
        misconceptionTags: tags.length ? tags : ['context-is-not-memory', 'retrieval-must-enter-context']
      })
      return
    }

    onProgress({
      status: 'in-progress',
      progressPct: nextProgress,
      outcome: result.ok
        ? `Round ${roundIndex + 1} complete. Context Stack progress saved.`
        : `Round ${roundIndex + 1} complete with review suggested.`,
      misconceptionTags: result.tags ?? round.tags
    })
    resetRound(roundIndex + 1)
  }

  function restartChallenge() {
    onAttempt()
    setRoundIndex(0)
    setStackIds([])
    setRoundResults([])
    setCompleted(false)
    setFeedback({ tone: 'neutral', message: 'New Context Stack attempt started. Tap a card to place it into context.' })
  }

  return (
    <PlayChallengeShell
      title="Context Stack"
      titleId="context-title"
      eyebrow="Play challenge"
      subtitle="Visible now is not the same as remembered forever."
      onBack={onBack}
      className="context-stack-screen"
      data-context-round={round.id}
      headerChildren={
        <>
          <div className="context-stack-status-row">
            <PlayStatusPill status={status} label={statusLabel} />
            <span>{windowSize} context slots</span>
          </div>
          <PlayProgressRail value={currentProgress} label={`${currentProgress}% Context Stack progress`} />
        </>
      }
    >
      {completed ? (
        <PlayCompletionPanel
          title={roundResults.some((result) => !result.ok) ? 'Review suggested' : 'Insight unlocked'}
          titleId="context-completion-title"
          className="context-stack-completion"
        >
          <p><strong>Completed.</strong> You saw context grow, expire, and accept retrieved evidence only when it is placed into the current window.</p>
          {roundResults.some((result) => !result.ok) ? (
            <p>Review suggested. One or more rounds let key context fall out or left clutter visible.</p>
          ) : (
            <p>Good stack. The goal, constraint, and retrieved evidence were visible when they mattered.</p>
          )}
          <PlayActionRow>
            <button className="primary-btn" type="button" onClick={restartChallenge}>Try another stack</button>
            <button className="secondary-btn" type="button" onClick={onBack}>Back to Play</button>
            <button className="text-btn" type="button" onClick={() => onGlossary('context window')}>Context window</button>
          </PlayActionRow>
        </PlayCompletionPanel>
      ) : (
        <>
          <PlayChallengeBoard label="Context Stack board" className="context-stack-board">
            <section className="context-stack-brief" aria-labelledby="context-round-title">
              <span className="step-label">Round {roundIndex + 1}</span>
              <h2 id="context-round-title">{round.title}</h2>
              <p>{round.objective}</p>
              <p>{round.instruction}</p>
              <div className="play-token-row" aria-label="Context Stack concepts">
                <PlayTokenChip tone="context">current context</PlayTokenChip>
                <PlayTokenChip tone="prompt">user goal</PlayTokenChip>
                <PlayTokenChip tone="response">answer trigger</PlayTokenChip>
              </div>
            </section>

            <section className="context-stack-zone" aria-labelledby="context-incoming-title">
              <h3 id="context-incoming-title">Incoming cards</h3>
              <div className="context-card-grid">
                {incomingCards.length ? incomingCards.map((card) => (
                  <PlayChoiceButton
                    key={card.id}
                    className={`context-stack-card is-${card.kind}`}
                    onClick={() => addCard(card.id)}
                    selected={stackIds.includes(card.id)}
                    data-testid="context-stack-card"
                    data-context-card-id={card.id}
                  >
                    <strong>{card.label}</strong>
                    <small>{card.detail}</small>
                  </PlayChoiceButton>
                )) : <p className="context-stack-empty">All incoming cards have been placed.</p>}
              </div>
            </section>

            {retrievedCards.length > 0 && (
              <section className="context-stack-zone is-retrieval" aria-labelledby="context-retrieval-title">
                <h3 id="context-retrieval-title">Retrieved evidence tray</h3>
                <p>Retrieved evidence helps only after it enters context.</p>
                <div className="context-card-grid">
                  {retrievedCards.map((card) => (
                    <PlayChoiceButton
                      key={card.id}
                      className="context-stack-card is-retrieved"
                      onClick={() => addCard(card.id)}
                      selected={stackIds.includes(card.id)}
                      data-testid="context-stack-card"
                      data-context-card-id={card.id}
                    >
                      <strong>{card.label}</strong>
                      <small>{card.detail}</small>
                    </PlayChoiceButton>
                  ))}
                </div>
              </section>
            )}

            <section className="context-window-zone" aria-labelledby="context-window-title">
              <div>
                <h3 id="context-window-title">Current context window</h3>
                <p>The model can use what is visible here right now.</p>
              </div>
              <div className="context-stack-slot-grid" aria-label="Current context window slots">
                {Array.from({ length: windowSize }).map((_, index) => {
                  const card = visibleCards[index]
                  return card ? (
                    <span key={card.id} className={`context-stack-slot is-${card.kind}`}>
                      <small>Slot {index + 1}</small>
                      <strong>{card.label}</strong>
                    </span>
                  ) : (
                    <span key={`empty-${index}`} className="context-stack-slot is-empty">
                      <small>Slot {index + 1}</small>
                      <em>empty</em>
                    </span>
                  )
                })}
              </div>
            </section>

            <section className="context-fell-zone" aria-labelledby="context-fell-title" aria-live="polite">
              <h3 id="context-fell-title">Fell out / no longer visible</h3>
              {fallenCards.length ? (
                <div className="context-fell-list">
                  {fallenCards.map((card) => (
                    <span key={card.id}>{card.label}</span>
                  ))}
                </div>
              ) : (
                <p>No cards have fallen out yet.</p>
              )}
            </section>
          </PlayChallengeBoard>

          <PlayFeedbackPanel tone={feedback.tone === 'good' ? 'good' : feedback.tone === 'review' ? 'review' : 'neutral'} className="context-stack-feedback">
            <p>{feedback.message}</p>
          </PlayFeedbackPanel>

          <PlayActionRow className="context-stack-actions">
            <button className="primary-btn" type="button" onClick={checkRound}>{round.checkLabel}</button>
            <button className="secondary-btn" type="button" onClick={() => resetRound()}>Reset round</button>
            <button className="text-btn" type="button" onClick={() => onGlossary(roundIndex === 2 ? 'rag' : 'context window')}>
              {roundIndex === 2 ? 'RAG in glossary' : 'Context window'}
            </button>
          </PlayActionRow>
          <PlayScrollHint>More context below</PlayScrollHint>
        </>
      )}
    </PlayChallengeShell>
  )
}

function AttentionWeave({ title = 'Attention Weave', onBack, onGlossary, onInsight, saved }) {
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
      <GameHeader title={title} titleId="attention-title" onBack={onBack} />
      <img className="game-hero" src={`${ASSET}/illustrations/scene-attention-weave@mobile.png`} alt="Token nodes connected by glowing attention arcs" />
      <p className="lede small">Tap a source token, then a target token. This preview asks which token <strong>it</strong> depends on.</p>
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

function GlossaryScreen({ onOpen, onPractice }) {
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
      <section className="glossary-practice-panel" aria-labelledby="glossary-practice-heading">
        <div>
          <p className="eyebrow">Practice mode</p>
          <h2 id="glossary-practice-heading">Glossary Dojo</h2>
          <p>Practice twelve terms through definitions, relationships, and common mix-ups.</p>
        </div>
        <button className="secondary-btn" type="button" onClick={onPractice}>Practice 12 terms</button>
      </section>
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
  traceComplete,
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
  const promptRunDone = Boolean(promptRunProgress?.finalChallengeComplete || traceComplete)
  const promptRunStepCount = (promptRunProgress?.completedSteps?.length ?? 0) + (promptRunDone ? 1 : 0)
  const playChallengeSummaries = buildPlayChallengeSummaries(getPlayChallengeSummary(), {
    gameInsights,
    traceComplete,
    promptRunProgress,
    glossaryDojoProgress: loadGlossaryDojoProgress()
  })
  const completedPlayChallenges = getCompletedFinalPlayCount(playChallengeSummaries)
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
        <span><strong>{completedPlayChallenges}</strong> of {FINAL_PLAY_CHALLENGE_COUNT} play challenges</span>
        <span><strong>{completedExerciseCount}</strong> of {exercises.length} exercises</span>
        <span><strong>{promptRunStepCount}</strong> of 13 Prompt Run</span>
        <span><strong>{reflectionCount}</strong> reflections</span>
      </div>
      <section className="idea-panel">
        <h2>{unlocked ? 'Badge unlocked' : 'Badge criterion'}</h2>
        <p>Complete the required Journey path, Prompt Run, and the synthesis card to earn one confidence badge: Prompt Life: Model Literate. The other Play challenges are practice support.</p>
        <p>This badge means you can explain what an LLM is, what it is not, and how a prompt becomes a response without treating the model as magic.</p>
        <p>{unlocked ? 'You met the learning threshold.' : `Remaining: ${lessonsNeeded} Journey checkpoint${lessonsNeeded === 1 ? '' : 's'}, ${promptRunNeeded} Prompt Run completion${promptRunNeeded === 1 ? '' : 's'}, and ${synthesisNeeded} synthesis card completion${synthesisNeeded === 1 ? '' : 's'}.`}</p>
      </section>
      <button className="primary-btn" onClick={copyShareText}>Copy share text</button>
      {copied && <p className="feedback good" role="status">Share text copied.</p>}
      <section className="settings-panel" aria-labelledby="reset-progress-title">
        <h2 id="reset-progress-title">Start over</h2>
        <p>Progress is stored only on this device. Resetting clears Prompt Life lesson progress, exercise attempts, Prompt Run progress, Play challenge progress, Glossary Dojo practice, reflections, mini-game insights, tour progress, last location, and checkpoint answer order seed.</p>
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
  useReviewHashScroll()

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
        const sourceReview = getLessonSourceReview(lesson.id)
        const sourceTitles = sourceReview.sourceIds.map((sourceId) => sourceRegistry.find((source) => source.id === sourceId)?.title ?? sourceId)
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
              <span>Source status: {sourceReview.status}</span>
              <span>Source needed: {sourceReview.status === 'needs source' || sourceNeeded ? 'yes' : 'no'}</span>
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
              <div><dt>Source status</dt><dd>{sourceReview.status}</dd></div>
              <div><dt>Source ids</dt><dd>{sourceReview.sourceIds.length ? sourceReview.sourceIds.join(', ') : 'None listed for v0.16.'}</dd></div>
              <div><dt>Source titles</dt><dd>{sourceTitles.length ? sourceTitles.join('; ') : 'None listed for v0.16.'}</dd></div>
              <div><dt>Source caveat</dt><dd>{sourceReview.caveat}</dd></div>
              <div><dt>Source-needed flag</dt><dd>{sourceReview.status === 'needs source' || sourceNeeded ? 'Yes. Add or maintain source review before v1 publication.' : 'No immediate external source need beyond current v0.16 review.'}</dd></div>
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
  useReviewHashScroll()

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
  useReviewHashScroll()

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

function BottomNav({ tab, onNavigate }) {
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
          <button key={id} data-tab={id} className={activeTab === id ? 'active' : ''} onClick={() => onNavigate(id)} aria-current={activeTab === id ? 'page' : undefined}>
            <img src={`${ASSET}/icons/png/${icon}@48.png`} alt="" aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Prompt Life root element missing')
}

const promptLifeRootElement = rootElement as HTMLElement & { _promptLifeRoot?: ReturnType<typeof createRoot> }
const promptLifeRoot = promptLifeRootElement._promptLifeRoot ?? createRoot(rootElement)
promptLifeRootElement._promptLifeRoot = promptLifeRoot

promptLifeRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
