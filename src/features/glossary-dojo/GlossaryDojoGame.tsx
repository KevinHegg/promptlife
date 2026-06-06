import { useMemo } from 'react'
import { GlossaryDojoSummary } from './GlossaryDojoSummary'
import { useGlossaryDojo } from './useGlossaryDojo'

type GlossaryDojoGameProps = {
  onBack: () => void
  onGlossary: (termId: string) => void
}

export function GlossaryDojoGame({ onBack, onGlossary }: GlossaryDojoGameProps) {
  const dojo = useGlossaryDojo()
  const {
    progress,
    termsById,
    currentRound,
    currentQuestion,
    currentAnswer,
    currentResult,
    currentIndex,
    totalQuestions,
    startRound,
    answerQuestion,
    nextQuestion,
    reset,
    getFeedback
  } = dojo
  const feedback = useMemo(() => currentResult ? getFeedback(currentResult) : '', [currentResult, getFeedback])
  const progressPercent = currentRound ? Math.round(((currentIndex + (currentAnswer ? 1 : 0)) / totalQuestions) * 100) : 0
  const questionNumber = currentIndex + 1
  const correctTermId = currentQuestion?.correctTermId
  const targetTermId = currentQuestion?.targetTermId
  const correctTerm = correctTermId ? termsById.get(correctTermId) : null
  const targetTerm = targetTermId ? termsById.get(targetTermId) : null

  if (!currentRound || !currentQuestion) {
    return (
      <section className="screen glossary-dojo-screen" aria-labelledby="dojo-title" data-dojo-view="start">
        <button className="text-btn dojo-back" type="button" onClick={onBack}>Back to Play</button>
        <header className="dojo-hero">
          <p className="eyebrow">Glossary Dojo</p>
          <h1 id="dojo-title" tabIndex={-1}>Practice the model map</h1>
          <p className="lede small">Twelve calm prompts connect terms, definitions, relationships, and common mix-ups.</p>
        </header>

        {!progress.storageAvailable && (
          <p className="feedback" role="status">Storage is blocked, so Dojo practice will stay in this session only.</p>
        )}

        {progress.lastCompletedRound ? (
          <GlossaryDojoSummary
            progress={progress}
            termsById={termsById}
            onStartRound={startRound}
            onReset={reset}
            onBack={onBack}
            onGlossary={onGlossary}
          />
        ) : (
          <section className="dojo-panel" aria-labelledby="dojo-start-title">
            <h2 id="dojo-start-title">Ready for twelve terms?</h2>
            <p>Every choice is a real glossary term or definition. The work is sorting the neighbors, not chasing points.</p>
            <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
              <span><strong>{progress.roundsCompleted}</strong> rounds</span>
              <span><strong>{progress.questionsAnswered}</strong> terms practiced</span>
              <span><strong>{Object.values(progress.terms).filter((term) => term.mastered).length}</strong> mastered</span>
            </div>
            <button className="primary-btn" type="button" onClick={startRound} data-testid="glossary-dojo-start">
              Start 12-term round
            </button>
          </section>
        )}
      </section>
    )
  }

  return (
    <section
      className="screen glossary-dojo-screen"
      aria-labelledby="dojo-title"
      data-dojo-view="question"
      data-dojo-current={questionNumber}
      data-dojo-total={totalQuestions}
    >
      <button className="text-btn dojo-back" type="button" onClick={onBack}>Back to Play</button>
      <header className="dojo-hero compact">
        <p className="eyebrow">Glossary Dojo</p>
        <h1 id="dojo-title" tabIndex={-1}>Practice the model map</h1>
        <p className="dojo-roundline">Question {questionNumber} of {totalQuestions}</p>
        <div className="dojo-meter" aria-label={`${progressPercent}% of current Glossary Dojo round answered`}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </header>

      <section className="dojo-panel dojo-question-card" aria-labelledby="dojo-question-title">
        <span className="step-label">{currentQuestion.typeLabel}</span>
        <h2 id="dojo-question-title">{currentQuestion.prompt}</h2>
        {targetTerm && (
          <p className="dojo-question-hint">
            Map the term without treating nearby ideas as interchangeable.
          </p>
        )}

        <div className="dojo-answer-list" role="list" aria-label="Glossary Dojo answer choices">
          {currentQuestion.options.map((option, index) => {
            const selected = currentAnswer?.selectedOptionId === option.id
            const isCorrect = option.id === currentQuestion.correctOptionId
            const revealed = Boolean(currentAnswer)
            const className = [
              'dojo-answer',
              selected ? 'is-selected' : '',
              revealed && isCorrect ? 'is-correct' : '',
              revealed && selected && !isCorrect ? 'is-wrong' : ''
            ].filter(Boolean).join(' ')

            return (
              <button
                key={option.id}
                type="button"
                className={className}
                onClick={() => answerQuestion(option.id)}
                disabled={revealed}
                aria-pressed={selected}
                data-testid="glossary-dojo-answer"
                data-dojo-option-id={option.id}
                data-dojo-correct={isCorrect ? 'true' : 'false'}
              >
                <span className="dojo-option-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <span className="dojo-option-copy">
                  <strong>{option.label}</strong>
                  {option.detail && <small>{option.detail}</small>}
                  {revealed && isCorrect && <em>Correct match</em>}
                  {revealed && selected && !isCorrect && <em>Your choice</em>}
                </span>
              </button>
            )
          })}
        </div>

        {currentResult && (
          <div className={currentResult.answer.isCorrect ? 'feedback good dojo-feedback' : 'feedback dojo-feedback'} role="status">
            <p>{feedback}</p>
          </div>
        )}

        <div className="dojo-action-row">
          {correctTerm && (
            <button className="secondary-btn" type="button" onClick={() => onGlossary(correctTerm.id)}>
              Open {correctTerm.label}
            </button>
          )}
          <button className="primary-btn" type="button" onClick={nextQuestion} disabled={!currentAnswer} data-testid="glossary-dojo-next">
            {questionNumber >= totalQuestions ? 'Finish round' : 'Next question'}
          </button>
        </div>
      </section>
    </section>
  )
}
