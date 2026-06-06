import type { GlossaryDojoProgress, GlossaryDojoTerm } from './types'

type GlossaryDojoSummaryProps = {
  progress: GlossaryDojoProgress
  termsById: Map<string, GlossaryDojoTerm>
  onStartRound: () => void
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
  onReset,
  onBack,
  onGlossary
}: GlossaryDojoSummaryProps) {
  const lastAnswers = progress.lastCompletedRound?.answers ?? []
  const strengthened = lastAnswers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.targetTermId)
  const reviewTerms = progress.recentMistakes
    .map((mistake) => mistake.termId)
    .filter((termId, index, list) => list.indexOf(termId) === index)
    .slice(0, 6)
  const masteredTerms = Object.entries(progress.terms)
    .filter(([, termProgress]) => termProgress.mastered)
    .map(([termId]) => termId)
    .slice(0, 6)

  return (
    <section className="dojo-panel dojo-summary" aria-labelledby="dojo-summary-title">
      <p className="eyebrow">Round reflection</p>
      <h2 id="dojo-summary-title">Practice map updated</h2>
      <div className="dojo-stat-grid" aria-label="Glossary Dojo practice totals">
        <span><strong>{progress.roundsCompleted}</strong> rounds</span>
        <span><strong>{progress.questionsAnswered}</strong> terms practiced</span>
        <span><strong>{masteredTerms.length}</strong> showing mastery</span>
      </div>

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
          <p>Fresh review list ready. Start another round when you want a calmer second pass.</p>
        )}
      </section>

      {reviewTerms.length > 0 && (
        <section className="dojo-term-panel" aria-labelledby="dojo-review-title">
          <h3 id="dojo-review-title">Needs another look</h3>
          <div className="dojo-term-chip-row">
            {reviewTerms.map((termId) => (
              <button key={termId} type="button" onClick={() => onGlossary(termId)}>
                {termLabel(termsById, termId)}
              </button>
            ))}
          </div>
        </section>
      )}

      {masteredTerms.length > 0 && (
        <section className="dojo-term-panel" aria-labelledby="dojo-mastered-title">
          <h3 id="dojo-mastered-title">Mastery signals</h3>
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
        <button className="primary-btn" type="button" onClick={onStartRound} data-testid="glossary-dojo-start">Start another round</button>
        <button className="secondary-btn" type="button" onClick={onBack}>Back to Play</button>
        <button className="secondary-btn danger" type="button" onClick={onReset}>Reset Dojo practice</button>
      </div>
    </section>
  )
}
