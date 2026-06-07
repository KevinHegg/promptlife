import type { GlossaryDojoProgress, GlossaryDojoTerm } from './types'

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

  return (
    <section className="dojo-panel dojo-summary" aria-labelledby="dojo-summary-title">
      <p className="eyebrow">Glossary Dojo</p>
      <h2 id="dojo-summary-title">Results from this round</h2>
      <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
        <span><strong>{questionCount}</strong> questions</span>
        <span><strong>{correctCount}</strong> correct</span>
        <span><strong>{missedCount}</strong> to review</span>
        <span><strong>{progress.roundsAttempted}</strong> round attempted</span>
        <span><strong>{completedRound?.repeatCount ?? 0}</strong> repeated</span>
        <span><strong>{masteredCount}</strong> mastered over time</span>
      </div>
      <p className="dojo-practice-note">
        Mastery grows across rounds. One round is practice, not a final judgment.
      </p>
      <p className="dojo-practice-note">
        A term is mastered after repeated correct practice across rounds.
      </p>

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
          <p>All twelve strengthened. Start the next round when ready.</p>
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

      <div className="dojo-action-row">
        <button className="secondary-btn" type="button" onClick={onReviewMissed} disabled={!reviewTerms.length} data-testid="glossary-dojo-review-missed">
          {reviewTerms.length ? 'Review missed questions' : 'No missed terms this round'}
        </button>
        <button className="secondary-btn" type="button" onClick={onRepeatRound} data-testid="glossary-dojo-repeat-round">Repeat this round</button>
        <button className="primary-btn" type="button" onClick={onStartRound} data-testid="glossary-dojo-start">Start next round</button>
        <button className="secondary-btn" type="button" onClick={onBack}>Back to Play</button>
        <button className="secondary-btn danger" type="button" onClick={onReset}>Reset Dojo practice</button>
      </div>
    </section>
  )
}
