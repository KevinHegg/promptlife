import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { acts, games, glossary, lessons } from './data/content'
import './styles/global.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const ASSET = `${BASE}/assets/promptlife`

function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => getStored(key, fallback))

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
  const [tab, setTab] = useStoredState('pl.tab', 'home')
  const [lessonId, setLessonId] = useStoredState('pl.lessonId', lessons[0].id)
  const [completed, setCompleted] = useStoredState('pl.completed', [])
  const [reflections, setReflections] = useStoredState('pl.reflections', {})
  const [gameInsights, setGameInsights] = useStoredState('pl.gameInsights', [])
  const [gameId, setGameId] = useState(null)
  const [drawerTerm, setDrawerTerm] = useState(null)

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

  function openLesson(id) {
    setLessonId(id)
    setTab('learn')
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
          />
        )}
        {tab === 'learn' && (
          <LessonScreen
            lesson={activeLesson}
            lessonIndex={activeLessonIndex}
            totalLessons={lessons.length}
            reflection={reflections[activeLesson.id] ?? ''}
            onComplete={completeLesson}
            onNext={nextLesson}
            onReflection={recordReflection}
            onGlossary={setDrawerTerm}
          />
        )}
        {tab === 'play' && (
          <PlayScreen
            gameId={gameId}
            gameInsights={gameInsights}
            setGameId={setGameId}
            onGlossary={setDrawerTerm}
            onInsight={recordGameInsight}
          />
        )}
        {tab === 'glossary' && <GlossaryScreen onOpen={setDrawerTerm} />}
        {tab === 'badge' && (
          <BadgeScreen
            completed={completed}
            progress={progress}
            gameInsights={gameInsights}
            reflections={reflections}
          />
        )}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
      <GlossaryDrawer termId={drawerTerm} onClose={() => setDrawerTerm(null)} />
    </div>
  )
}

function SkipLink() {
  return <a className="skip-link" href="#main">Skip to content</a>
}

function HomeScreen({ progress, nextLessonTitle, onStart, onJourney, onPlay }) {
  return (
    <section className="screen home-screen" aria-labelledby="home-title">
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

function JourneyScreen({ completed, currentLessonId, onOpenLesson }) {
  return (
    <section className="screen journey-screen" aria-labelledby="journey-title">
      <ScreenHeader
        kicker="Main path"
        title="Today in Prompt Life"
        subtitle="Follow one prompt from before training through inference, generation, and model literacy."
        titleId="journey-title"
      />
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

function LessonScreen({ lesson, lessonIndex, totalLessons, reflection, onComplete, onNext, onReflection, onGlossary }) {
  const [choice, setChoice] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const selectedAnswer = choice == null ? null : lesson.quiz.choices[choice]
  const isCorrect = selectedAnswer === lesson.quiz.answer

  useEffect(() => {
    setChoice(null)
    setRevealed(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [lesson.id])

  function saveAndContinue() {
    if (!isCorrect) return
    onComplete(lesson.id)
    onNext()
  }

  return (
    <section className="screen lesson-screen" aria-labelledby="lesson-title">
      <div className="lesson-progress" aria-label={`Lesson ${lessonIndex + 1} of ${totalLessons}`}>
        <span style={{ width: `${((lessonIndex + 1) / totalLessons) * 100}%` }} />
      </div>
      <p className="eyebrow">{lesson.actLabel}</p>
      <h1 id="lesson-title">{lesson.title}</h1>
      <p className="lede small">{lesson.subtitle}</p>
      <picture>
        <source media="(min-width: 700px)" srcSet={lesson.image.replace('@mobile', '')} />
        <img className="lesson-art" src={lesson.image} alt={lesson.alt} />
      </picture>

      <div className="lesson-kernel" aria-label="Lesson structure">
        <ConceptBlock label="Definition" text={lesson.definition} terms={lesson.terms} onGlossary={onGlossary} />
        <ConceptBlock label="Relationship" text={lesson.relationship} terms={lesson.terms} onGlossary={onGlossary} />
        <ConceptBlock label="Metaphor" text={lesson.metaphor} />
      </div>

      <section className="interaction-card" aria-labelledby="interaction-title">
        <p className="eyebrow">Tiny interaction</p>
        <h2 id="interaction-title">{lesson.interaction.title}</h2>
        <MicroInteraction type={lesson.interaction.type} />
        <p>{lesson.interaction.copy}</p>
      </section>

      <section className="quiz-card" aria-labelledby="quiz-title">
        <p className="eyebrow">Checkpoint</p>
        <h2 id="quiz-title">{lesson.quiz.question}</h2>
        <div className="answer-list" role="list">
          {lesson.quiz.choices.map((answer, index) => (
            <button
              key={answer}
              className={choice === index ? 'answer is-selected' : 'answer'}
              onClick={() => {
                setChoice(index)
                setRevealed(true)
              }}
              aria-pressed={choice === index}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              {answer}
            </button>
          ))}
        </div>
        {revealed && (
          <p className={isCorrect ? 'feedback good' : 'feedback'} role="status">
            <strong>{isCorrect ? 'Insight unlocked.' : 'Close. Try the precise distinction.'}</strong> {lesson.quiz.explain}
          </p>
        )}
      </section>

      <section className="reflection-card" aria-labelledby="reflection-title">
        <p className="eyebrow">Reflection</p>
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

      <button className="primary-btn sticky-action" onClick={saveAndContinue} disabled={!isCorrect}>
        {isCorrect ? 'Save insight and continue' : 'Choose the best answer to continue'}
      </button>
    </section>
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

function MicroInteraction({ type }) {
  if (type === 'training') return <TrainingLoopDemo />
  if (type === 'inference') return <InferenceDemo />
  if (type === 'tokens') return <TokenizeDemo />
  if (type === 'embeddings') return <EmbeddingDemo />
  if (type === 'attention') return <AttentionDemo />
  if (type === 'mlp') return <MlpDemo />
  if (type === 'softmax') return <SoftmaxDemo />
  if (type === 'context') return <ContextWindowDemo />
  if (type === 'diffusion') return <DiffusionDemo />
  if (type === 'risk') return <RiskSortDemo />
  return <FeatureCloudDemo />
}

function TrainingLoopDemo() {
  const [step, setStep] = useState(0)
  const labels = ['predict', 'compare', 'update weights', 'repeat']
  return (
    <button className="loop-demo" onClick={() => setStep((step + 1) % labels.length)} aria-label="Advance training loop demo">
      {labels.map((label, index) => (
        <span key={label} className={index === step ? 'active' : ''}>{label}</span>
      ))}
    </button>
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
    </div>
  )
}

function TokenizeDemo() {
  const [split, setSplit] = useState(false)
  const tokens = ['Explain', ' how', ' attention', ' works']
  return (
    <button className="token-demo" onClick={() => setSplit(!split)} aria-label="Toggle tokenization demo">
      {split ? tokens.map((token) => <span key={token}>{token}</span>) : <strong>Explain how attention works</strong>}
    </button>
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
      <p>That vector is the learned starting point. Context later reshapes it into hidden states.</p>
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
      <p>Logits become probabilities; sampling chooses one next token.</p>
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
      {nodes.map((node, index) => (
        <button
          key={node}
          className={active.includes(node) ? 'active' : ''}
          style={{ '--i': index } as React.CSSProperties}
          onClick={() => toggle(node)}
          aria-pressed={active.includes(node)}
        >
          {node}
        </button>
      ))}
      <p aria-live="polite">{active.length} pattern{active.length === 1 ? '' : 's'} active.</p>
    </div>
  )
}

function PlayScreen({ gameId, gameInsights, setGameId, onGlossary, onInsight }) {
  if (gameId === 'context-stack') return <ContextStack onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('context-stack')} />
  if (gameId === 'attention-weave') return <AttentionWeave onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('attention-weave')} />
  if (gameId === 'token-relay') return <TokenRelay onBack={() => setGameId(null)} onGlossary={onGlossary} onInsight={onInsight} saved={gameInsights.includes('token-relay')} />

  return (
    <section className="screen play-screen" aria-labelledby="play-title">
      <ScreenHeader
        kicker="Side tours"
        title="Play to understand"
        subtitle="No scores, timers, or leaderboards. Just small simulations that make invisible model mechanics easier to see."
        titleId="play-title"
      />
      <div className="game-list">
        {games.map((game) => {
          const saved = gameInsights.includes(game.id)
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
      <div className="context-window" aria-label="Visible context window">
        {visible.length ? visible.map((card, index) => <span key={`${card}-${index}`}>{card}</span>) : <em>Window is empty.</em>}
      </div>
      <div className="fallen-row" aria-live="polite">
        <strong>Fell out:</strong> {fallen.length ? fallen.join(' | ') : 'nothing yet'}
      </div>
      <InsightNotice active={hasTarget || saved} activeText="Insight saved: temporary context is not permanent memory." idleText="Goal: keep user request, examples, and tone in view together." />
      <div className="deck-grid" aria-label="Deck of context cards">
        {deck.map((card) => <button key={card} onClick={() => setStack((prev) => [...prev, card])}>{card}</button>)}
      </div>
      <div className="game-actions">
        <button className="secondary-btn" onClick={() => setStack((prev) => prev.slice(0, -1))}>Pop</button>
        <button className="secondary-btn" onClick={() => setStack([])}>Reset</button>
        <button className="text-btn" onClick={() => onGlossary('context window')}>What is a context window?</button>
      </div>
      <GameReflection prompt="What changed when an important card fell out of the visible window?" />
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
      <InsightNotice active={active || saved} activeText="Insight saved: attention is weighted relevance, not human awareness." idleText="Draw three arcs to unlock the attention insight." />
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
      <div className="token-lane" aria-label="Tokens moving through the relay">
        {['prompt', 'state', 'logits', 'next'].map((token) => <span key={token}>{token}</span>)}
      </div>
      <div className="relay-board" aria-label="Token relay operators">
        <span className="source">source</span>
        {modes.map((mode, index) => <button key={index} onClick={() => cycle(index)}>{mode}</button>)}
        <span className="sink">sink</span>
      </div>
      <div className="relay-output" aria-live="polite">
        Output path: {modes.join(' -> ')}
      </div>
      <InsightNotice active={allModes || saved} activeText="Insight saved: inference is a forward pass using existing weights." idleText="Use all three operators to unlock the inference insight." />
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
  const terms = glossary.filter((item) => `${item.term} ${item.definition} ${item.relationship}`.toLowerCase().includes(query.toLowerCase()))

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

function GlossaryDrawer({ termId, onClose }) {
  const item = glossary.find((term) => term.id === termId || term.term.toLowerCase() === String(termId).toLowerCase())
  const closeRef = useRef(null)

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
      </aside>
    </div>
  )
}

function BadgeScreen({ completed, progress, gameInsights, reflections }) {
  const [copied, setCopied] = useState(false)
  const reflectionCount = Object.values(reflections as Record<string, string>).filter((text) => text.trim().length > 0).length
  const unlocked = progress >= 80 && gameInsights.length >= 2

  async function copyShareText() {
    try {
      await navigator.clipboard?.writeText('I am Model Literate: I understand what an LLM is, what it is not, and how a prompt becomes a response.')
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="screen badge-screen" aria-labelledby="badge-title">
      <ScreenHeader kicker="Progress" title="Model Literate" subtitle="A confidence badge, not a leaderboard." titleId="badge-title" />
      <img className="badge-art" src={`${ASSET}/brand/model-literate-badge.svg`} alt="Model Literate badge" />
      <div className="progress-meter" aria-label={`${progress}% lesson progress`}><span style={{ width: `${progress}%` }} /></div>
      <div className="badge-stats">
        <span><strong>{completed.length}</strong> of {lessons.length} lessons</span>
        <span><strong>{gameInsights.length}</strong> of {games.length} game insights</span>
        <span><strong>{reflectionCount}</strong> reflections</span>
      </div>
      <section className="idea-panel">
        <h2>{unlocked ? 'Badge unlocked' : 'Badge criterion'}</h2>
        <p>Complete at least 80% of lesson checkpoints and save two mini-game insights. Then explain how text becomes tokens, tokens become vectors, vectors become hidden states, and a response emerges one token at a time.</p>
      </section>
      <button className="primary-btn" onClick={copyShareText}>Copy share text</button>
      {copied && <p className="feedback good" role="status">Share text copied.</p>}
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
    ['journey', 'Learn', 'icon-layers'],
    ['play', 'Play', 'icon-quiz'],
    ['glossary', 'Glossary', 'icon-glossary'],
    ['badge', 'Badge', 'icon-model-literate-badge']
  ]
  const activeTab = tab === 'learn' || tab === 'home' ? 'journey' : tab

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
