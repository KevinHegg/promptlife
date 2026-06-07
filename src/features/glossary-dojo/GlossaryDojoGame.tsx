import { useMemo } from 'react'
import { GlossaryDojoSummary } from './GlossaryDojoSummary'
import { getSafeGlossaryDojoQuestionCopy } from './engine'
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
    repeatRound,
    reviewMissedRound,
    getFeedback
  } = dojo
  const feedback = useMemo(() => currentResult ? getFeedback(currentResult) : '', [currentResult, getFeedback])
  const progressPercent = currentRound ? Math.round(((currentIndex + (currentAnswer ? 1 : 0)) / totalQuestions) * 100) : 0
  const questionNumber = currentIndex + 1
  const correctTermId = currentQuestion?.correctTermId
  const targetTermId = currentQuestion?.targetTermId
  const correctTerm = correctTermId ? termsById.get(correctTermId) : null
  const targetTerm = targetTermId ? termsById.get(targetTermId) : null
  const safeQuestionCopy = useMemo(() => {
    if (!currentQuestion) return null
    return getSafeGlossaryDojoQuestionCopy({
      type: currentQuestion.type,
      targetLabel: targetTerm?.label ?? currentQuestion.targetTermId,
      correctLabel: correctTerm?.label,
      questionId: currentQuestion.id,
      typeLabel: currentQuestion.typeLabel,
      prompt: currentQuestion.prompt,
      helperText: currentQuestion.helperText
    })
  }, [correctTerm?.label, currentQuestion, targetTerm?.label])

  if (!currentRound || !currentQuestion) {
    return (
      <section className="screen glossary-dojo-screen" aria-labelledby="dojo-title" data-dojo-view="start">
        <button className="text-btn dojo-back" type="button" onClick={onBack}>Back to Play</button>
        <header className="dojo-hero">
          <p className="eyebrow">Glossary Dojo</p>
          <h1 id="dojo-title" tabIndex={-1}>Practice glossary terms</h1>
          <p className="lede small">Twelve calm prompts build vocabulary for the model story.</p>
        </header>

        {!progress.storageAvailable && (
          <p className="feedback" role="status">Storage is blocked, so Dojo practice will stay in this session only.</p>
        )}

        {progress.lastCompletedRound ? (
          <GlossaryDojoSummary
            progress={progress}
            termsById={termsById}
            onStartRound={startRound}
            onRepeatRound={repeatRound}
            onReviewMissed={reviewMissedRound}
            onReset={reset}
            onBack={onBack}
            onGlossary={onGlossary}
          />
        ) : (
          <section className="dojo-panel" aria-labelledby="dojo-start-title">
            <h2 id="dojo-start-title">Ready for twelve terms?</h2>
            <p>Every choice comes from the glossary. There are no points, timers, leaderboards, or failure states.</p>
            <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
              <span><strong>{progress.roundsAttempted}</strong> rounds</span>
              <span><strong>{progress.totalQuestionsAnswered}</strong> questions</span>
              <span><strong>{Object.values(progress.terms).filter((term) => term.mastered).length}</strong> mastered over time</span>
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
      data-dojo-source-mode={currentRound.sourceMode}
      data-dojo-repeat-count={currentRound.repeatCount}
      data-dojo-round-fingerprint={currentRound.targetFingerprint}
      data-dojo-target-count={currentRound.targetTermIds.length}
    >
      <button className="text-btn dojo-back" type="button" onClick={onBack}>Back to Play</button>
      <header className="dojo-hero compact">
        <p className="eyebrow">Glossary Dojo</p>
        <h1 id="dojo-title" tabIndex={-1}>Practice glossary terms</h1>
        <p className="dojo-roundline">Question {questionNumber} of {totalQuestions}</p>
        <div className="dojo-meter" aria-label={`${progressPercent}% of current Glossary Dojo round answered`}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </header>

      <section className="dojo-panel dojo-question-card" aria-labelledby="dojo-question-title">
        <span className="step-label">{safeQuestionCopy?.typeLabel ?? currentQuestion.typeLabel}</span>
        <h2 id="dojo-question-title">{safeQuestionCopy?.prompt ?? currentQuestion.prompt}</h2>
        {currentQuestion.definitionText && (
          <p className="dojo-definition-card" data-testid="glossary-dojo-definition">
            {currentQuestion.definitionText}
          </p>
        )}
        {targetTerm && currentQuestion.helperText && (
          <p className="dojo-question-hint">{safeQuestionCopy?.helperText ?? currentQuestion.helperText}</p>
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
                data-dojo-option-kind={option.kind}
                data-dojo-represented-term-id={option.representedTermId ?? option.termId}
                data-dojo-distractor-source={option.distractorSource ?? ''}
                data-dojo-distractor-distance={option.distractorDistance ?? ''}
                data-dojo-learning-path-distance={option.learningPathDistance ?? ''}
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
          <div
            className={currentResult.answer.isCorrect ? 'feedback good dojo-feedback' : 'feedback dojo-feedback'}
            role="status"
            data-testid="glossary-dojo-feedback"
          >
            <p>{feedback}</p>
          </div>
        )}

        <div className="dojo-action-row">
          {correctTerm && currentAnswer && (
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
