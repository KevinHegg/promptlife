import type { GlossaryDojoProgress, GlossaryDojoTerm } from './types'
import {
  PlayActionRow,
  PlayCompletionPanel,
  PlayFeedbackPanel
} from '../play/PlayChallengeComponents'

type GlossaryDojoSummaryProps = {
  progress: GlossaryDojoProgress
  termsById: Map<string, GlossaryDojoTerm>
  onStartRound: () => void
  onRepeatRound: () => void
  onReviewMissed: () => void
  onReset: () => void
  onBack: () => void
  onGlossary: (termId: string) => void
}

function termLabel(termsById: Map<string, GlossaryDojoTerm>, termId: string) {
  return termsById.get(termId)?.label ?? termId
}

export function GlossaryDojoSummary({
  progress,
  termsById,
  onStartRound,
  onRepeatRound,
  onReviewMissed,
  onReset,
  onBack,
  onGlossary
}: GlossaryDojoSummaryProps) {
  const completedRound = progress.lastCompletedRound
  const lastAnswers = completedRound?.answers ?? []
  const questionCount = lastAnswers.length
  const correctCount = completedRound?.correctCount ?? lastAnswers.filter((answer) => answer.isCorrect).length
  const missedCount = completedRound?.missedCount ?? lastAnswers.filter((answer) => !answer.isCorrect).length
  const strengthened = lastAnswers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.targetTermId)
    .filter((termId, index, list) => list.indexOf(termId) === index)
  const reviewTerms = lastAnswers
    .filter((answer) => !answer.isCorrect)
    .map((answer) => answer.targetTermId)
    .filter((termId, index, list) => list.indexOf(termId) === index)
  const masteredCount = Object.values(progress.terms).filter((termProgress) => termProgress.mastered).length
  const masteredTerms = Object.entries(progress.terms)
    .filter(([, termProgress]) => termProgress.mastered)
    .map(([termId]) => termId)
    .slice(0, 6)
  const completionTitle = missedCount > 0 ? 'Review suggested' : 'Round completed'

  return (
    <section
      className="dojo-panel dojo-summary"
      aria-labelledby="dojo-summary-title"
      data-dojo-last-source-mode={completedRound?.sourceMode ?? ''}
      data-dojo-last-repeat-count={completedRound?.repeatCount ?? 0}
      data-dojo-last-round-fingerprint={completedRound?.targetFingerprint ?? ''}
      data-dojo-last-target-count={completedRound?.targetTermIds.length ?? 0}
    >
      <PlayCompletionPanel title={completionTitle} titleId="dojo-summary-title" className="dojo-completion-panel">
        <p><strong>Progress saved on this device.</strong> Round completed. {missedCount > 0 ? 'Review suggested for the concepts below.' : 'Good distinctions strengthened across this round.'}</p>
      </PlayCompletionPanel>

      <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
        <span><strong>{questionCount}</strong> {questionCount === 1 ? 'question' : 'questions'}</span>
        <span><strong>{correctCount}</strong> correct</span>
        <span><strong>{missedCount}</strong> to review</span>
        <span><strong>{progress.roundsAttempted}</strong> round attempted</span>
        <span><strong>{completedRound?.repeatCount ?? 0}</strong> repeated</span>
        <span><strong>{masteredCount}</strong> mastered over time</span>
      </div>
      <PlayFeedbackPanel tone={missedCount > 0 ? 'review' : 'good'}>
        <p>Mastery grows across rounds. A term is mastered after repeated correct practice across rounds.</p>
      </PlayFeedbackPanel>

      <section className="dojo-term-panel" aria-labelledby="dojo-strengthened-title">
        <h3 id="dojo-strengthened-title">Strengthened this round</h3>
        {strengthened.length ? (
          <div className="dojo-term-chip-row">
            {strengthened.slice(0, 8).map((termId) => (
              <button key={termId} type="button" onClick={() => onGlossary(termId)}>
                {termLabel(termsById, termId)}
              </button>
            ))}
          </div>
        ) : (
          <p>No terms strengthened yet. A short review round can help them settle.</p>
        )}
      </section>

      <section className="dojo-term-panel" aria-labelledby="dojo-review-title">
        <h3 id="dojo-review-title">Needs another look</h3>
        {reviewTerms.length ? (
          <div className="dojo-term-chip-row">
            {reviewTerms.map((termId) => (
              <button key={termId} type="button" onClick={() => onGlossary(termId)}>
                {termLabel(termsById, termId)}
              </button>
            ))}
          </div>
        ) : (
          <p>Everything in this round strengthened. Start the next round when ready.</p>
        )}
      </section>

      {masteredTerms.length > 0 && (
        <section className="dojo-term-panel" aria-labelledby="dojo-mastered-title">
          <h3 id="dojo-mastered-title">Mastered over time</h3>
          <div className="dojo-term-chip-row">
            {masteredTerms.map((termId) => (
              <button key={termId} type="button" onClick={() => onGlossary(termId)}>
                {termLabel(termsById, termId)}
              </button>
            ))}
          </div>
        </section>
      )}

      <PlayActionRow className="dojo-action-row">
        <div className="dojo-action-note">
          <button className="primary-btn" type="button" onClick={onStartRound} data-testid="glossary-dojo-start">Try another round</button>
          <span>Practice a fresh set of terms when possible.</span>
        </div>
        <div className="dojo-action-note">
          <button className="secondary-btn" type="button" onClick={onRepeatRound} data-testid="glossary-dojo-repeat-round">Repeat this round</button>
          <span>Use the same 12 terms again.</span>
        </div>
        <div className="dojo-action-note">
          <button className="secondary-btn" type="button" onClick={onReviewMissed} disabled={!reviewTerms.length} data-testid="glossary-dojo-review-missed">
            {reviewTerms.length ? 'Review missed terms' : 'No missed terms this round'}
          </button>
          <span>Focus only on terms that need another look.</span>
        </div>
        <button className="secondary-btn" type="button" onClick={onBack}>Back to Play</button>
        <button className="secondary-btn danger" type="button" onClick={onReset}>Reset Dojo practice</button>
      </PlayActionRow>
    </section>
  )
}
