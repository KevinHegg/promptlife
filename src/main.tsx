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
  TraceStepAnimation,
  TrainingLoopAnimation
} from './components/ConceptAnimations'
import { ExerciseShell } from './components/ExerciseSystem'
import { acts, games, glossary, learningModes, lessons } from './data/content'
import { emptyExerciseProgress, exerciseById, exercises, lessonExerciseIds } from './data/exercises'
import './styles/global.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const ASSET = `${BASE}/assets/promptlife`
const STORAGE_KEYS = {
  lastLocation: 'promptlife:v1:lastLocation',
  lessonId: 'promptlife:v1:lessonId',
  progress: 'promptlife:v1:progress',
  reflections: 'promptlife:v1:reflections',
  gameInsights: 'promptlife:v1:gameInsights',
  exerciseProgress: 'promptlife:v1:exerciseProgress',
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
  traceComplete: 'pl.traceComplete',
  learningTourComplete: 'pl.learningTourComplete'
}
const PROMPT_LIFE_STORAGE_KEYS = [...Object.values(STORAGE_KEYS), ...Object.values(LEGACY_STORAGE_KEYS)]
const PROMPT_RESPONSE_LESSON_IDS = new Set([
  'what-is-llm',
  'training',
  'fine-tuning',
  'inference',
  'tokens',
  'token-ids',
  'embeddings',
  'tensors',
  'attention',
  'mlp',
  'hidden-states',
  'logits',
  'softmax',
  'sampling',
  'autoregression',
  'context-window'
])

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
  const [tab, setTab] = useStoredState(STORAGE_KEYS.lastLocation, 'home', LEGACY_STORAGE_KEYS.lastLocation)
  const [lessonId, setLessonId] = useStoredState(STORAGE_KEYS.lessonId, lessons[0].id, LEGACY_STORAGE_KEYS.lessonId)
  const [completed, setCompleted] = useStoredState(STORAGE_KEYS.progress, [], LEGACY_STORAGE_KEYS.progress)
  const [reflections, setReflections] = useStoredState(STORAGE_KEYS.reflections, {}, LEGACY_STORAGE_KEYS.reflections)
  const [gameInsights, setGameInsights] = useStoredState(STORAGE_KEYS.gameInsights, [], LEGACY_STORAGE_KEYS.gameInsights)
  const [exerciseProgress, setExerciseProgress] = useStoredState(STORAGE_KEYS.exerciseProgress, emptyExerciseProgress(), LEGACY_STORAGE_KEYS.exerciseProgress)
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
    setTraceComplete(false)
    setLearningTourComplete(false)
    setGameId(null)
    setDrawerTerm(null)
    setStatusMessage('Progress reset. You can begin again.')
  }

  function markFirstLessonComplete() {
    setCompleted([lessons[0].id])
    setLessonId(lessons[1]?.id ?? lessons[0].id)
    setTab('journey')
    setStatusMessage('First lesson marked complete for testing.')
  }

  function markAllLessonsIncomplete() {
    setCompleted([])
    setLessonId(lessons[0].id)
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
    setTraceComplete(false)
    setLearningTourComplete(false)
    setGameId(null)
    setDrawerTerm(null)
    setStatusMessage('Prompt Life localStorage keys cleared. Reload or reset progress to begin from a blank state.')
  }

  function openLesson(id) {
    setLessonId(id)
    setTab('learn')
  }

  function openPlayFeature(id) {
    setGameId(id)
    setTab('play')
  }

  function nextLesson() {
    const next = lessons[activeLessonIndex + 1]
    if (next) {
      setLessonId(next.id)
      setTab('learn')
    } else {
      setTab('badge')
    }
  }

  return (
    <div className="pl-app">
      <SkipLink />
      <main id="main" className="pl-shell">
        {tab === 'home' && (
          <HomeScreen
            progress={progress}
            nextLessonTitle={nextOpenLesson.title}
            statusMessage={statusMessage}
            onStart={() => openLesson(nextOpenLesson.id)}
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
            lessonIndex={activeLessonIndex}
            totalLessons={lessons.length}
            reflection={reflections[activeLesson.id] ?? ''}
            exerciseProgress={exerciseProgress}
            onComplete={completeLesson}
            onNext={nextLesson}
            onReflection={recordReflection}
            onExerciseAttempt={recordExerciseAttempt}
            onGlossary={setDrawerTerm}
          />
        )}
        {tab === 'play' && (
          <PlayScreen
            gameId={gameId}
            gameInsights={gameInsights}
            traceComplete={traceComplete}
            learningTourComplete={learningTourComplete}
            exerciseProgress={exerciseProgress}
            setGameId={setGameId}
            onGlossary={setDrawerTerm}
            onInsight={recordGameInsight}
            onExerciseAttempt={recordExerciseAttempt}
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
      <GlossaryDrawer termId={drawerTerm} onOpen={setDrawerTerm} onClose={() => setDrawerTerm(null)} />
    </div>
  )
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
  return (
    <section className="screen journey-screen" aria-labelledby="journey-title">
      <ScreenHeader
        kicker="Main path"
        title="Today in Prompt Life"
        subtitle="Follow one prompt from before training through inference, generation, and model literacy."
        titleId="journey-title"
      />
      <section className="tour-feature-panel" aria-labelledby="guided-tours-title">
        <div>
          <p className="eyebrow">Guided side tours</p>
          <h2 id="guided-tours-title">Trace and compare</h2>
          <p>Use these when the map feels abstract: one follows a prompt through the model, the other compares how AI systems learn.</p>
        </div>
        <div className="tour-actions">
          <button className="secondary-btn" onClick={onTrace}>Trace One Prompt</button>
          <button className="secondary-btn" onClick={onLearningTour}>How AI Learns</button>
        </div>
      </section>
      <div className="journey-list">
        {acts.map((act) => {
          const actLessons = lessons.filter((lesson) => lesson.act === act.id)
          return (
            <section className="act-section" key={act.id} aria-labelledby={`${act.id}-title`}>
              <div className="act-heading">
                <span aria-hidden="true">{act.number}</span>
                <div>
                  <h2 id={`${act.id}-title`}>{act.name}</h2>
                  <p>{act.summary}</p>
                </div>
              </div>
              {actLessons.map((lesson) => {
                const done = completed.includes(lesson.id)
                const current = lesson.id === currentLessonId
                return (
                  <button
                    className={current ? 'lesson-row is-current' : 'lesson-row'}
                    key={lesson.id}
                    onClick={() => onOpenLesson(lesson.id)}
                    aria-label={`${lesson.title}. ${done ? 'Completed.' : current ? 'Recommended next.' : 'Not completed.'}`}
                  >
                    <img src={lesson.icon} alt="" aria-hidden="true" />
                    <span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.subtitle}</small>
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

function LessonScreen({ lesson, lessonIndex, totalLessons, reflection, exerciseProgress, onComplete, onNext, onReflection, onExerciseAttempt, onGlossary }) {
  const [choice, setChoice] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [continueHint, setContinueHint] = useState(false)
  const checkpointRef = useRef<HTMLElement | null>(null)
  const selectedAnswer = choice == null ? null : lesson.quiz.choices[choice]
  const isCorrect = selectedAnswer === lesson.quiz.answer
  const exercise = exerciseById[lesson.exerciseId ?? lessonExerciseIds[lesson.id]]
  const relatedTerms = useMemo(() => {
    return lesson.terms
      .map((term) => glossary.find((item) => item.id === term || item.term.toLowerCase() === term.toLowerCase()))
      .filter(Boolean)
  }, [lesson.terms])

  useEffect(() => {
    setChoice(null)
    setRevealed(false)
    setContinueHint(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [lesson.id])

  function saveAndContinue() {
    if (!isCorrect) {
      setContinueHint(true)
      checkpointRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
        <h1 id="lesson-title">{lesson.title}</h1>
        <p className="lede small">{lesson.subtitle}</p>
        <p className="lesson-definition">{lesson.definition}</p>
        <picture>
          <source media="(min-width: 700px)" srcSet={lesson.image.replace('@mobile', '')} />
          <img className="lesson-art compact" src={lesson.image} alt={lesson.alt} />
        </picture>
        {relatedTerms.length > 0 && (
          <div className="term-row compact" aria-label="Related glossary terms">
            {relatedTerms.map((term) => (
              <button key={term.id} onClick={() => onGlossary(term.id)}>{term.term}</button>
            ))}
          </div>
        )}
      </header>

      <section className="lesson-panel core-panel" aria-labelledby="core-idea-title">
        <span className="step-label">Learn</span>
        <h2 id="core-idea-title">Core idea</h2>
        <p>{lesson.definition}</p>
        <div className="metaphor-strip">
          <strong>Metaphor</strong>
          <span>{lesson.metaphor}</span>
        </div>
      </section>

      <section className="lesson-panel connection-panel" aria-labelledby="connect-title">
        <span className="step-label">How it connects</span>
        <h2 id="connect-title">One relationship</h2>
        <p>{lesson.relationship}</p>
      </section>

      {PROMPT_RESPONSE_LESSON_IDS.has(lesson.id) && (
        <PromptVsResponseBox includeDemo={['what-is-llm', 'inference', 'sampling', 'autoregression', 'context-window'].includes(lesson.id)} />
      )}

      {exercise ? (
        <section className="lesson-panel exercise-panel">
          <ExerciseShell
            exercise={exercise}
            progress={exerciseProgress}
            onAttempt={onExerciseAttempt}
            onGlossary={onGlossary}
          />
        </section>
      ) : (
        <section className="lesson-panel interaction-card" aria-labelledby="interaction-title">
          <span className="step-label">Try it</span>
          <h2 id="interaction-title">{lesson.interaction.title}</h2>
          <MicroInteraction type={lesson.interaction.type} />
          <p>{lesson.interaction.copy}</p>
        </section>
      )}

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
            value={reflection}
            onChange={(event) => onReflection(lesson.id, event.target.value)}
            placeholder="Example: Inference uses the model's weights but does not rewrite them."
            rows={3}
          />
        </label>
      </section>

      <button className={isCorrect ? 'primary-btn sticky-action is-ready' : 'primary-btn sticky-action'} onClick={saveAndContinue}>
        {isCorrect ? (lessonIndex + 1 === totalLessons ? 'Finish and view badge' : 'Next lesson') : choice == null ? 'Answer checkpoint to continue' : 'Retry checkpoint to continue'}
      </button>
    </section>
  )
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
      .map((term) => glossary.find((item) => item.id === term || item.term.toLowerCase() === term.toLowerCase()))
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
  const promptTokens = ['The', 'dog', 'chased', 'the', 'cat', 'across', 'the']
  const generated = ['yard', 'and', 'stopped']
  const [count, setCount] = useState(0)
  const responseTokens = generated.slice(0, count)
  const candidates = count === 0 ? ['yard', 'street', 'room', 'floor', 'road'] : ['and', 'then', 'quickly']

  return (
    <section className="prompt-response-demo" aria-labelledby="prompt-response-demo-title">
      <h3 id="prompt-response-demo-title">Prompt or Response?</h3>
      <TokenLegend />
      <div className="demo-row" aria-label="Prompt tokens">
        <strong>Prompt tokens</strong>
        <div>{promptTokens.map((token) => <TokenPill key={token} token={token} kind="prompt" />)}</div>
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
          {promptTokens.map((token) => <TokenPill key={token} token={token} kind="prompt" />)}
          {responseTokens.map((token) => <TokenPill key={token} token={token} kind="response" />)}
        </div>
      </div>
      <button className="secondary-btn" onClick={() => setCount((count + 1) % (generated.length + 1))}>Next token</button>
      <p>Once <strong>yard</strong> is generated, it becomes part of the context for the next step.</p>
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
  const tokens = ['Explain', ' how', ' attention', ' works']
  return (
    <div className="token-demo">
      <button onClick={() => setSplit(!split)} aria-label="Toggle tokenization demo">{split ? 'Join prompt' : 'Split prompt'}</button>
      <div>{split ? tokens.map((token) => <span key={token}>{token}</span>) : <strong>Explain how attention works</strong>}</div>
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
  const [target, setTarget] = useState(2)
  return (
    <div className="attention-demo" role="group" aria-label="Attention relevance demo">
      {['The', 'dog', 'chased', 'the', 'cat'].map((token, index) => (
        <button key={token + index} className={target === index ? 'active' : ''} onClick={() => setTarget(index)}>{token}</button>
      ))}
      <div className="spotlight-line" style={{ transform: `translateX(${target * 20}%)` }} />
      <p>Selected token: <strong>{['The', 'dog', 'chased', 'the', 'cat'][target]}</strong>. Attention is relevance, not awareness.</p>
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
    focused: ['cat 72%', 'yard 18%', 'ball 10%'],
    balanced: ['cat 48%', 'yard 30%', 'ball 22%'],
    wider: ['cat 32%', 'yard 25%', 'ball 20%', 'moon 13%', 'mailman 10%']
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
  const tokens = ['The', 'dog', 'chased', 'the', 'cat', 'across', 'the', 'yard']
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

function PlayScreen({ gameId, gameInsights, traceComplete, learningTourComplete, exerciseProgress, setGameId, onGlossary, onInsight, onExerciseAttempt, onTraceComplete, onLearningTourComplete }) {
  if (gameId === 'trace-one-prompt') return <TraceOnePromptScreen onBack={() => setGameId(null)} onComplete={onTraceComplete} saved={traceComplete} />
  if (gameId === 'how-ai-learns') return <HowAILearnsScreen onBack={() => setGameId(null)} onComplete={onLearningTourComplete} saved={learningTourComplete} exerciseProgress={exerciseProgress} onExerciseAttempt={onExerciseAttempt} onGlossary={onGlossary} />
  if (gameId === 'context-stack') return <ContextStack onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('context-stack')} />
  if (gameId === 'attention-weave') return <AttentionWeave onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('attention-weave')} />
  if (gameId === 'token-relay') return <TokenRelay onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('token-relay')} />

  const playItems = [
    { id: 'trace-one-prompt', title: 'Trace One Prompt', summary: 'Follow "Explain attention simply" from text to sampled next token.', image: `${ASSET}/illustrations/scene-token-pipeline-relay@mobile.png`, saved: traceComplete },
    { id: 'how-ai-learns', title: 'How AI Learns', summary: 'Compare training, feedback, retrieval, and temporary in-context steering.', image: `${ASSET}/illustrations/scene-training-rainstorm@mobile.png`, saved: learningTourComplete },
    ...games.map((game) => ({ ...game, saved: gameInsights.includes(game.id) }))
  ]

  return (
    <section className="screen play-screen" aria-labelledby="play-title">
      <ScreenHeader
        kicker="Side tours"
        title="Play to understand"
        subtitle="No scores, timers, or leaderboards. Just small simulations that make invisible model mechanics easier to see."
        titleId="play-title"
      />
      <div className="game-list">
        {playItems.map((game) => {
          const saved = game.saved
          return (
            <button className="game-card" key={game.id} onClick={() => setGameId(game.id)}>
              <img src={game.image} alt="" aria-hidden="true" />
              <span>
                <strong>{game.title}</strong>
                <small>{game.summary}</small>
              </span>
              {saved && <span className="mini-status">saved</span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}

const traceSteps = [
  { title: 'Text prompt appears', sentence: 'The prompt begins as accessible text in the temporary context window.', why: 'Why this matters: the model only works with the input it can currently see.' },
  { title: 'Tokenizer splits text', sentence: 'The tokenizer splits "Explain attention simply." into token cards.', why: '' },
  { title: 'Token IDs appear', sentence: 'Each token card maps to a token ID used for lookup.', why: '' },
  { title: 'Embeddings appear', sentence: 'Each token ID retrieves a learned starting vector.', why: 'Why this matters: embeddings are learned starting points, not final meanings.' },
  { title: 'Vectors stack', sentence: 'The prompt-token vectors stack into a tensor block for the model to process together.', why: '' },
  { title: 'Attention connects positions', sentence: 'Attention arcs weight relevance across token positions in the current context.', why: 'Why this matters: attention is relevance weighting, not consciousness.' },
  { title: 'MLPs reshape features', sentence: 'MLPs reshape each token position after attention has mixed context.', why: '' },
  { title: 'Hidden states glow', sentence: 'Hidden states are temporary context-shaped vectors for this forward pass over the prompt.', why: 'Why this matters: inference changes temporary states, not durable weights.' },
  { title: 'Vocabulary cloud appears', sentence: 'The final hidden state points toward possible next tokens.', why: '' },
  { title: 'Softmax makes probabilities', sentence: 'Logits become softmax probabilities over candidate tokens.', why: 'Why this matters: probabilities prepare the model to choose one next token.' },
  { title: 'One token is sampled', sentence: 'Sampling chooses one generated response token from the probability cloud.', why: '' },
  { title: 'The loop repeats', sentence: 'The chosen response token is appended to the context and the model predicts again once.', why: 'Why this matters: LLM text generation is autoregressive.' }
]

function TraceOnePromptScreen({ onBack, onComplete, saved }) {
  const [step, setStep] = useState(0)
  const current = traceSteps[step]
  const atStart = step === 0
  const atEnd = step === traceSteps.length - 1

  function goNext() {
    if (atEnd) {
      if (saved) setStep(0)
      else onComplete()
      return
    }
    setStep((prev) => prev + 1)
  }

  return (
    <section className="screen trace-screen" aria-labelledby="trace-title">
      <GameHeader title="Trace One Prompt" onBack={onBack}>
        <p className="seed-chip">{step + 1} of {traceSteps.length}</p>
      </GameHeader>
      <p className="lede small">Follow one prompt through the model: "Explain attention simply."</p>
      <PromptVsResponseBox includeDemo={false} />
      <div className="trace-progress" aria-label={`Trace step ${step + 1} of ${traceSteps.length}`}>
        <span style={{ width: `${((step + 1) / traceSteps.length) * 100}%` }} />
      </div>
      <section className="trace-card" aria-labelledby="trace-step-title">
        <h2 id="trace-step-title">{current.title}</h2>
        <p>{current.sentence}</p>
        <TraceStepAnimation step={step} />
        {current.why && <p className="why-note">{current.why}</p>}
      </section>
      <div className="trace-controls">
        <button className="secondary-btn" disabled={atStart} onClick={() => setStep((prev) => Math.max(0, prev - 1))}>Back</button>
        <button className="primary-btn" onClick={goNext}>{atEnd ? (saved ? 'Replay trace' : 'Save trace insight') : 'Next'}</button>
      </div>
      {saved && <p className="feedback good" role="status">Insight unlocked: you can trace how a prompt becomes the next token.</p>}
    </section>
  )
}

function HowAILearnsScreen({ onBack, onComplete, saved, exerciseProgress, onExerciseAttempt, onGlossary }) {
  const [index, setIndex] = useState(0)
  const mode = learningModes[index]
  const atStart = index === 0
  const atEnd = index === learningModes.length - 1

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
      <GameHeader title="How AI Learns" onBack={onBack}>
        <p className="seed-chip">{index + 1} of {learningModes.length}</p>
      </GameHeader>
      <p className="lede small">Compare durable learning, temporary steering, retrieval, inference, human feedback, and self-supervised pretraining.</p>
      <div className="trace-progress" aria-label={`Learning mode ${index + 1} of ${learningModes.length}`}>
        <span style={{ width: `${((index + 1) / learningModes.length) * 100}%` }} />
      </div>
      <section className="learning-mode-card" aria-labelledby="learning-mode-title">
        <h2 id="learning-mode-title">{mode.label}</h2>
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

function GameHeader({ title, onBack, children = null }) {
  return (
    <header className="game-header">
      <button className="text-btn" onClick={onBack}>Back to games</button>
      <h1>{title}</h1>
      {children}
    </header>
  )
}

function ContextStack({ onBack, onGlossary, onInsight, saved }) {
  const deck = ['System: helpful tutor', 'User: explain LLMs', 'Fact: tokens are chunks', 'Constraint: use examples', 'Tone: academic', 'Distractor: jokes', 'Output: three bullets']
  const target = ['User: explain LLMs', 'Constraint: use examples', 'Tone: academic']
  const [stack, setStack] = useState([])
  const windowSize = 4
  const visible = stack.slice(-windowSize)
  const fallen = stack.slice(0, Math.max(0, stack.length - windowSize))
  const hasTarget = target.every((card) => visible.includes(card))

  useEffect(() => {
    if (hasTarget) onInsight('context-stack')
  }, [hasTarget, onInsight])

  return (
    <section className="screen game-screen" aria-labelledby="context-title">
      <GameHeader title="Context Stack" onBack={onBack} />
      <img className="game-hero" src={`${ASSET}/illustrations/scene-context-stack@mobile.png`} alt="Cards entering a limited context window" />
      <p className="lede small">Push cards into a window that holds only the last {windowSize}. Older cards fall out of view.</p>
      <InfoCallout title="Goal">Keep the user request, examples, and tone visible at the same time.</InfoCallout>
      <div className="context-window" aria-label="Visible context window">
        {visible.length ? visible.map((card, index) => <span key={`${card}-${index}`}>{card}</span>) : <em>Window is empty.</em>}
      </div>
      <div className="fallen-row" aria-live="polite">
        <strong>Fell out:</strong> {fallen.length ? fallen.join(' | ') : 'nothing yet'}
        <small>{fallen.length ? 'The oldest card left because the window can only hold the newest visible context.' : 'Nothing has exceeded the context limit yet.'}</small>
      </div>
      <InsightNotice active={hasTarget || saved} activeText="Insight unlocked: the model cannot use what fell out of the window." idleText="Push cards until the most useful context fits together." />
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
  const nodes = ['The', 'dog', 'chased', 'the', 'cat', 'because', 'it', 'ran']
  const [selected, setSelected] = useState(null)
  const [links, setLinks] = useState([])
  const active = links.length >= 3

  useEffect(() => {
    if (active) onInsight('attention-weave')
  }, [active, onInsight])

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
      <GameHeader title="Attention Weave" onBack={onBack} />
      <img className="game-hero" src={`${ASSET}/illustrations/scene-attention-weave@mobile.png`} alt="Token nodes connected by glowing attention arcs" />
      <p className="lede small">Tap a source token, then a target token. Build arcs to represent relevance between positions.</p>
      <InfoCallout title="Status">
        {selected == null ? 'Choose a source token.' : `Source selected: ${nodes[selected]}. Now choose a target token.`}
      </InfoCallout>
      <div className="weave-board">
        <svg viewBox="0 0 320 190" aria-hidden="true">
          {links.map(([a, b], index) => {
            const ax = 34 + (a % 4) * 82
            const ay = a < 4 ? 52 : 134
            const bx = 34 + (b % 4) * 82
            const by = b < 4 ? 52 : 134
            const mx = (ax + bx) / 2
            return <path key={`${a}-${b}`} d={`M${ax} ${ay} Q${mx} ${22 + index * 8} ${bx} ${by}`} />
          })}
        </svg>
        {nodes.map((node, index) => <button key={node + index} className={selected === index ? 'weave-node active' : 'weave-node'} onClick={() => tap(index)}>{node}</button>)}
      </div>
      <div className="meter" aria-label={`${links.length} relevance arcs drawn`}><span style={{ width: `${Math.min(100, links.length * 34)}%` }} /></div>
      <InsightNotice active={active || saved} activeText="Insight unlocked: attention is not consciousness. It is a learned weighting of relevance between token positions." idleText="Draw three arcs to unlock the attention insight." />
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
  const [modes, setModes] = useState(['pass', 'transform', 'hold', 'pass'])
  const seed = '42'
  const allModes = choices.every((choice) => modes.includes(choice))

  useEffect(() => {
    if (allModes) onInsight('token-relay')
  }, [allModes, onInsight])

  function cycle(index) {
    setModes((prev) => prev.map((mode, i) => i === index ? choices[(choices.indexOf(mode) + 1) % choices.length] : mode))
  }

  return (
    <section className="screen game-screen" aria-labelledby="relay-title">
      <GameHeader title="Token Pipeline Relay" onBack={onBack}><p className="seed-chip">seed {seed}</p></GameHeader>
      <img className="game-hero" src={`${ASSET}/illustrations/scene-token-pipeline-relay@mobile.png`} alt="Tokens moving through pass, transform, and hold operators" />
      <p className="lede small">Tap each operator to cycle pass, transform, and hold. The run is replayable, but it is not training.</p>
      <InfoCallout title="Determinism">Same seed + same choices = same run.</InfoCallout>
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
      <InsightNotice active={allModes || saved} activeText="Insight unlocked: Same seed + same choices = same run." idleText="Use all three operators to unlock the inference insight." />
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
  const terms = glossary.filter((item) => `${item.term} ${item.definition} ${item.relationship} ${item.metaphor} ${item.confused ?? ''}`.toLowerCase().includes(query.toLowerCase()))

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
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="token, tensor, softmax..." />
      </label>
      <div className="glossary-list">
        {terms.map((item) => (
          <button className="glossary-card" key={item.id} onClick={() => onOpen(item.id)}>
            <strong>{item.term}</strong>
            <span>{item.definition}</span>
            <small>{item.relationship}</small>
          </button>
        ))}
      </div>
      {!terms.length && <p className="empty-note">No matching term yet. Try a shorter search.</p>}
    </section>
  )
}

function GlossaryDrawer({ termId, onOpen, onClose }) {
  const item = glossary.find((term) => term.id === termId || term.term.toLowerCase() === String(termId).toLowerCase())
  const closeRef = useRef(null)
  const relatedTerms = useMemo(() => {
    if (!item) return []
    const haystack = `${item.definition} ${item.relationship} ${item.metaphor} ${item.confused ?? ''}`.toLowerCase()
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
        {item.confused && <section className="concept-card compact"><span>Often confused with</span><p>{item.confused}</p></section>}
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
  const unlocked = progress >= 80 && gameInsights.length >= 2
  const lessonsNeeded = Math.max(0, Math.ceil(lessons.length * 0.8) - completed.length)
  const gameInsightsNeeded = Math.max(0, 2 - gameInsights.length)

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
      <ScreenHeader kicker="Progress" title="Prompt Life: Model Literate" subtitle="A confidence badge, not a leaderboard." titleId="badge-title" />
      <img className="badge-art" src={`${ASSET}/brand/model-literate-badge.svg`} alt="Model Literate badge" />
      <div className="progress-meter" aria-label={`${progress}% lesson progress`}><span style={{ width: `${progress}%` }} /></div>
      <div className="badge-stats">
        <span><strong>{completed.length}</strong> of {lessons.length} lessons</span>
        <span><strong>{gameInsights.length}</strong> of {games.length} game insights</span>
        <span><strong>{completedExerciseCount}</strong> of {exercises.length} exercises</span>
        <span><strong>{reflectionCount}</strong> reflections</span>
      </div>
      <section className="idea-panel">
        <h2>{unlocked ? 'Badge unlocked' : 'Badge criterion'}</h2>
        <p>This badge means you can explain what an LLM is, what it is not, and how a prompt becomes a response without treating the model as magic.</p>
        <p>{unlocked ? 'You met the learning threshold.' : `Remaining: ${lessonsNeeded} lesson checkpoint${lessonsNeeded === 1 ? '' : 's'} and ${gameInsightsNeeded} mini-game insight${gameInsightsNeeded === 1 ? '' : 's'}.`}</p>
      </section>
      <button className="primary-btn" onClick={copyShareText}>Copy share text</button>
      {copied && <p className="feedback good" role="status">Share text copied.</p>}
      <section className="settings-panel" aria-labelledby="reset-progress-title">
        <h2 id="reset-progress-title">Start over</h2>
        <p>Progress is stored only on this device. Resetting clears Prompt Life lesson progress, exercise attempts, reflections, mini-game insights, tour progress, and last location.</p>
        <button className="secondary-btn danger" onClick={onResetProgress}>Reset progress</button>
        {statusMessage && <p className="feedback good" role="status">{statusMessage}</p>}
      </section>
      {debugEnabled && (
        <section className="settings-panel debug-panel" aria-labelledby="debug-tools-title">
          <p className="eyebrow">Debug mode</p>
          <h2 id="debug-tools-title">Progress tools</h2>
          <p>Visible because the URL includes <code>?debug=1</code>. These tools only touch Prompt Life localStorage keys.</p>
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

function ScreenHeader({ kicker, title, subtitle, titleId }) {
  return (
    <header className="screen-header">
      <p className="eyebrow">{kicker}</p>
      <h1 id={titleId}>{title}</h1>
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
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(([id, label, icon]) => (
        <button key={id} data-tab={id} className={activeTab === id ? 'active' : ''} onClick={() => setTab(id)} aria-current={activeTab === id ? 'page' : undefined}>
          <img src={`${ASSET}/icons/png/${icon}@48.png`} alt="" aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
