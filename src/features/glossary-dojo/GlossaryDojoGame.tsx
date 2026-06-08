import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  PlayActionRow,
  PlayChallengeShell,
  PlayFeedbackPanel,
  PlayProgressRail,
  PlayStatusPill
} from '../play/PlayChallengeComponents'
import { GlossaryDojoSummary } from './GlossaryDojoSummary'
import { getSafeGlossaryDojoQuestionCopy } from './engine'
import { useGlossaryDojo } from './useGlossaryDojo'

type GlossaryDojoGameProps = {
  onBack: () => void
  onGlossary: (termId: string) => void
  onAttempt?: () => void
  onComplete?: (round: { missedCount?: number } | null) => void
}

function cleanFeedbackLead(copy: string) {
  return copy
    .replace(/^Insight strengthened\.\s*/i, '')
    .replace(/^Not quite\.\s*/i, '')
}

function sourceModeLabel(sourceMode?: string) {
  if (sourceMode === 'review_missed') return 'Review missed terms'
  if (sourceMode === 'repeat_round') return 'Repeat round'
  return 'New round'
}

export function GlossaryDojoGame({ onBack, onGlossary, onAttempt, onComplete }: GlossaryDojoGameProps) {
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
  const seenCompletedRoundRef = useRef(progress.lastCompletedRound?.id ?? null)
  const feedback = useMemo(() => currentResult ? getFeedback(currentResult) : '', [currentResult, getFeedback])
  const progressPercent = currentRound ? Math.round(((currentIndex + (currentAnswer ? 1 : 0)) / totalQuestions) * 100) : 0
  const questionNumber = currentIndex + 1
  const masteredCount = Object.values(progress.terms).filter((term) => term.mastered).length
  const lastMissedCount = progress.lastCompletedRound?.missedCount ?? 0
  const startStatus: 'not-started' | 'completed' | 'review-suggested' = progress.lastCompletedRound
    ? lastMissedCount > 0 ? 'review-suggested' : 'completed'
    : 'not-started'
  const startStatusLabel = progress.lastCompletedRound
    ? lastMissedCount > 0 ? 'Review suggested' : 'Round completed'
    : 'Ready'
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
  const feedbackDetail = currentResult ? cleanFeedbackLead(feedback) : ''
  const startPracticeRound = useCallback(() => {
    onAttempt?.()
    startRound()
  }, [onAttempt, startRound])
  const repeatPracticeRound = useCallback(() => {
    onAttempt?.()
    repeatRound()
  }, [onAttempt, repeatRound])
  const reviewPracticeRound = useCallback(() => {
    onAttempt?.()
    reviewMissedRound()
  }, [onAttempt, reviewMissedRound])

  useEffect(() => {
    const completed = progress.lastCompletedRound
    if (!completed || completed.id === seenCompletedRoundRef.current) return
    seenCompletedRoundRef.current = completed.id
    onComplete?.(completed)
  }, [onComplete, progress.lastCompletedRound])

  if (!currentRound || !currentQuestion) {
    return (
      <PlayChallengeShell
        title="Practice glossary terms"
        titleId="dojo-title"
        eyebrow="Glossary Dojo"
        subtitle="Twelve calm prompts build vocabulary for the model story."
        onBack={onBack}
        className="glossary-dojo-screen"
        data-dojo-view="start"
        headerChildren={
          <>
            <div className="dojo-foundation-status-row">
              <PlayStatusPill status={startStatus} label={startStatusLabel} />
              <span>Progress saved on this device.</span>
            </div>
            <PlayProgressRail
              value={progress.lastCompletedRound ? 100 : 0}
              label={progress.lastCompletedRound ? 'Last Glossary Dojo round completed' : 'Glossary Dojo ready to start'}
            />
          </>
        }
      >

        {!progress.storageAvailable && (
          <PlayFeedbackPanel tone="review">
            <p>Storage is blocked, so Dojo practice will stay in this session only.</p>
          </PlayFeedbackPanel>
        )}

        {progress.lastCompletedRound ? (
          <GlossaryDojoSummary
            progress={progress}
            termsById={termsById}
            onStartRound={startPracticeRound}
            onRepeatRound={repeatPracticeRound}
            onReviewMissed={reviewPracticeRound}
            onReset={reset}
            onBack={onBack}
            onGlossary={onGlossary}
          />
        ) : (
          <section className="dojo-panel" aria-labelledby="dojo-start-title">
            <h2 id="dojo-start-title">Ready for twelve terms?</h2>
            <p>Every choice comes from the glossary. Take a calm round, compare terms, and review what needs another look.</p>
            <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
              <span><strong>{progress.roundsAttempted}</strong> rounds</span>
              <span><strong>{progress.totalQuestionsAnswered}</strong> questions</span>
              <span><strong>{masteredCount}</strong> mastered over time</span>
            </div>
            <PlayFeedbackPanel>
              <p>Progress saved on this device. Repeat a round whenever another look would help.</p>
            </PlayFeedbackPanel>
            <PlayActionRow className="dojo-action-row">
              <button className="primary-btn" type="button" onClick={startPracticeRound} data-testid="glossary-dojo-start">
                Start 12-term round
              </button>
            </PlayActionRow>
          </section>
        )}
      </PlayChallengeShell>
    )
  }

  return (
    <PlayChallengeShell
      title="Practice glossary terms"
      titleId="dojo-title"
      eyebrow="Glossary Dojo"
      subtitle={`${sourceModeLabel(currentRound.sourceMode)}. Choose the best glossary match, then use the feedback to sharpen the distinction.`}
      onBack={onBack}
      className="glossary-dojo-screen"
      data-dojo-view="question"
      data-dojo-current={questionNumber}
      data-dojo-total={totalQuestions}
      data-dojo-source-mode={currentRound.sourceMode}
      data-dojo-repeat-count={currentRound.repeatCount}
      data-dojo-round-fingerprint={currentRound.targetFingerprint}
      data-dojo-target-count={currentRound.targetTermIds.length}
      headerChildren={
        <>
          <div className="dojo-foundation-status-row">
            <PlayStatusPill status="in-progress" label={`Question ${questionNumber} of ${totalQuestions}`} />
            <span>{currentRound.answers.length} answered</span>
          </div>
          <PlayProgressRail
            value={progressPercent}
            label={`${progressPercent}% of current Glossary Dojo round answered`}
          />
        </>
      }
    >
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
          <PlayFeedbackPanel
            tone={currentResult.answer.isCorrect ? 'good' : 'review'}
            className="dojo-feedback"
            data-testid="glossary-dojo-feedback"
          >
            <p>
              <strong>{currentResult.answer.isCorrect ? 'Good distinction.' : 'This choice reveals a common mix-up.'}</strong>
              {' '}
              {feedbackDetail}
            </p>
          </PlayFeedbackPanel>
        )}

        <PlayActionRow className="dojo-action-row">
          {correctTerm && currentAnswer && (
            <button className="secondary-btn" type="button" onClick={() => onGlossary(correctTerm.id)}>
              Open {correctTerm.label}
            </button>
          )}
          <button className="primary-btn" type="button" onClick={nextQuestion} disabled={!currentAnswer} data-testid="glossary-dojo-next">
            {questionNumber >= totalQuestions ? 'Finish round' : 'Next question'}
          </button>
        </PlayActionRow>
      </section>
    </PlayChallengeShell>
  )
}
