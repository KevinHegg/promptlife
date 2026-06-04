import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise, ExerciseItem } from '../data/exercises'

type ExerciseProgress = {
  completed?: string[]
  attempts?: Record<string, number>
  lastAnswers?: Record<string, unknown>
  insights?: string[]
}

type AttemptPayload = {
  correct: boolean
  answer: unknown
  revealed?: boolean
}

type ExerciseShellProps = {
  exercise: Exercise
  progress?: ExerciseProgress
  onAttempt: (exerciseId: string, payload: AttemptPayload) => void
  onGlossary?: (termId: string) => void
}

type ResultState = {
  type: 'correct' | 'wrong' | 'revealed'
  detail: string
} | null

function isCorrectItem(exercise: Exercise, item: ExerciseItem) {
  const answer = exercise.correctAnswer
  if (Array.isArray(answer)) return answer.includes(item.id)
  if (typeof answer === 'string') return answer === item.id
  return Boolean(item.correct)
}

export function ExerciseShell({ exercise, progress, onAttempt, onGlossary }: ExerciseShellProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [bucketAssignments, setBucketAssignments] = useState<Record<string, string>>({})
  const [activeSortItem, setActiveSortItem] = useState<string | null>(null)
  const [labels, setLabels] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<string[]>(() => exercise.items.map((item) => item.id))
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [activeMatchItem, setActiveMatchItem] = useState<string | null>(null)
  const [toggleId, setToggleId] = useState(exercise.items[0]?.id ?? '')
  const [reflection, setReflection] = useState('')
  const [result, setResult] = useState<ResultState>(null)
  const feedbackRef = useRef<HTMLDivElement | null>(null)
  const itemById = useMemo(() => Object.fromEntries(exercise.items.map((item) => [item.id, item])) as Record<string, ExerciseItem>, [exercise.items])
  const completed = Boolean(progress?.completed?.includes(exercise.id))
  const attempts = progress?.attempts?.[exercise.id] ?? 0

  useEffect(() => {
    setSelectedId(null)
    setSelectedIds([])
    setBucketAssignments({})
    setActiveSortItem(null)
    setLabels({})
    setOrder(exercise.items.map((item) => item.id))
    setMatches({})
    setActiveMatchItem(null)
    setToggleId(exercise.items[0]?.id ?? '')
    setReflection('')
    setResult(null)
  }, [exercise])

  useEffect(() => {
    if (!result) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
    }, 0)
  }, [result])

  function snapshotAnswer() {
    if (exercise.inputType === 'tap-choice' || exercise.inputType === 'next-token-pick' || exercise.inputType === 'connect-nodes') return selectedId
    if (exercise.inputType === 'tap-multiple') return selectedIds
    if (exercise.inputType === 'sort-buckets') return bucketAssignments
    if (exercise.inputType === 'label-tokens') return labels
    if (exercise.inputType === 'drag-order') return order
    if (exercise.inputType === 'drag-match') return matches
    if (exercise.inputType === 'toggle-state') return toggleId
    if (exercise.inputType === 'type-reflection') return reflection
    return null
  }

  function getWrongDetail() {
    if (selectedId) {
      const selected = itemById[selectedId]
      if (selected?.feedback) return selected.feedback
    }

    if (exercise.inputType === 'label-tokens') {
      const wrongEntry = Object.entries(labels).find(([itemId, label]) => label && itemById[itemId]?.bucket !== label)
      if (wrongEntry) {
        const [itemId, label] = wrongEntry
        const specific = exercise.incorrectActions?.[`${itemId}:${label}`]
        if (specific) return specific
      }
    }

    if (exercise.inputType === 'toggle-state' && toggleId) {
      const selected = itemById[toggleId]
      if (selected?.feedback) return selected.feedback
    }

    if (exercise.inputType === 'drag-match') {
      const wrongMatch = exercise.items.find((item) => item.matchId && matches[item.id] && matches[item.id] !== item.matchId)
      if (wrongMatch) {
        const chosen = matches[wrongMatch.id]
        const specific = exercise.incorrectActions?.[`${wrongMatch.id}:${chosen}`]
        if (specific) return specific
        if (wrongMatch.feedback) return wrongMatch.feedback
      }
    }

    if (exercise.inputType === 'drag-order') {
      const at = (id: string) => order.indexOf(id)
      if (exercise.incorrectActions?.['single-number-first'] && order[0] === 'single-number') return exercise.incorrectActions['single-number-first']
      const appendContextIndex = order.findIndex((id) => id.endsWith('-context'))
      if (exercise.incorrectActions?.['whole-response-before-append'] && at('whole-response') > -1 && appendContextIndex > -1 && at('whole-response') < appendContextIndex) return exercise.incorrectActions['whole-response-before-append']
      if (exercise.incorrectActions?.['softmax-before-logits'] && at('softmax') > -1 && at('logits') > -1 && at('softmax') < at('logits')) return exercise.incorrectActions['softmax-before-logits']
      if (exercise.incorrectActions?.['sampling-before-softmax'] && at('sampling') > -1 && at('softmax') > -1 && at('sampling') < at('softmax')) return exercise.incorrectActions['sampling-before-softmax']
      if (exercise.incorrectActions?.['append-before-sampling'] && at('append') > -1 && at('sampling') > -1 && at('append') < at('sampling')) return exercise.incorrectActions['append-before-sampling']
    }

    return exercise.feedbackIncorrect
  }

  function isCorrect() {
    if (exercise.inputType === 'tap-choice' || exercise.inputType === 'next-token-pick') {
      if (!selectedId) return false
      return isCorrectItem(exercise, itemById[selectedId])
    }

    if (exercise.inputType === 'tap-multiple') {
      const requiredGroups = Array.isArray(exercise.correctActions) ? exercise.correctActions : []
      const selectedGroups = new Set(selectedIds.map((id) => itemById[id]?.group).filter(Boolean))
      return requiredGroups.length > 0 && requiredGroups.every((group) => selectedGroups.has(group))
    }

    if (exercise.inputType === 'sort-buckets') {
      return exercise.items.every((item) => item.bucket && bucketAssignments[item.id] === item.bucket)
    }

    if (exercise.inputType === 'label-tokens') {
      return exercise.items.every((item) => item.bucket && labels[item.id] === item.bucket)
    }

    if (exercise.inputType === 'connect-nodes') {
      return selectedId === exercise.correctAnswer
    }

    if (exercise.inputType === 'toggle-state') {
      if (typeof exercise.correctAnswer === 'string') return toggleId === exercise.correctAnswer
      return Boolean(itemById[toggleId]?.correct)
    }

    if (exercise.inputType === 'drag-order') {
      return Array.isArray(exercise.correctActions) && order.join('|') === exercise.correctActions.join('|')
    }

    if (exercise.inputType === 'drag-match') {
      return exercise.items.every((item) => !item.matchId || matches[item.id] === item.matchId)
    }

    if (exercise.inputType === 'type-reflection') {
      return reflection.trim().split(/\s+/).filter(Boolean).length >= 6
    }

    return false
  }

  function fillCorrectAnswer() {
    if (exercise.inputType === 'tap-choice' || exercise.inputType === 'next-token-pick') {
      const correct = exercise.items.find((item) => isCorrectItem(exercise, item))
      setSelectedId(correct?.id ?? null)
    }

    if (exercise.inputType === 'tap-multiple') {
      const requiredGroups = Array.isArray(exercise.correctActions) ? exercise.correctActions : []
      const ids = requiredGroups.map((group) => exercise.items.find((item) => item.group === group)?.id).filter(Boolean) as string[]
      setSelectedIds(ids)
    }

    if (exercise.inputType === 'sort-buckets') {
      setBucketAssignments(Object.fromEntries(exercise.items.map((item) => [item.id, item.bucket ?? ''])))
    }

    if (exercise.inputType === 'label-tokens') {
      setLabels(Object.fromEntries(exercise.items.map((item) => [item.id, item.bucket ?? ''])))
    }

    if (exercise.inputType === 'connect-nodes') {
      setSelectedId(typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : null)
    }

    if (exercise.inputType === 'toggle-state') {
      if (typeof exercise.correctAnswer === 'string') setToggleId(exercise.correctAnswer)
      else setToggleId(exercise.items.find((item) => item.correct)?.id ?? exercise.items[0]?.id ?? '')
    }

    if (exercise.inputType === 'drag-order' && Array.isArray(exercise.correctActions)) {
      setOrder(exercise.correctActions)
    }

    if (exercise.inputType === 'drag-match') {
      setMatches(Object.fromEntries(exercise.items.filter((item) => item.matchId).map((item) => [item.id, item.matchId])))
    }

    if (exercise.inputType === 'type-reflection') {
      setReflection(exercise.insight)
    }
  }

  function checkAnswer() {
    const correct = isCorrect()
    const detail = correct ? exercise.feedbackCorrect : getWrongDetail()
    setResult({ type: correct ? 'correct' : 'wrong', detail })
    onAttempt(exercise.id, { correct, answer: snapshotAnswer() })
  }

  function revealAnswer() {
    fillCorrectAnswer()
    setResult({ type: 'revealed', detail: exercise.feedbackCorrect })
    onAttempt(exercise.id, { correct: false, answer: snapshotAnswer(), revealed: true })
  }

  return (
    <section className="exercise-shell" aria-labelledby={`${exercise.id}-title`}>
      <ExerciseHeader exercise={exercise} completed={completed} attempts={attempts} />
      <ActionCue verb={exercise.actionVerb} instruction={exercise.actionInstruction} />
      <div className="exercise-try-area" aria-label="Try area">
        <strong className="try-area-label">Try area</strong>
        {exercise.inputType === 'tap-choice' && <TapChoiceExercise exercise={exercise} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setResult(null) }} />}
        {exercise.inputType === 'next-token-pick' && <NextTokenPickExercise exercise={exercise} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setResult(null) }} />}
        {exercise.inputType === 'tap-multiple' && <TapMultipleExercise exercise={exercise} selectedIds={selectedIds} onToggle={(id) => {
          setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
          setResult(null)
        }} />}
        {exercise.inputType === 'sort-buckets' && (
          <SortBucketsExercise
            exercise={exercise}
            assignments={bucketAssignments}
            activeItem={activeSortItem}
            onChooseItem={(id) => setActiveSortItem(id)}
            onChooseBucket={(bucket) => {
              if (!activeSortItem) return
              setBucketAssignments((prev) => ({ ...prev, [activeSortItem]: bucket }))
              setActiveSortItem(null)
              setResult(null)
            }}
          />
        )}
        {exercise.inputType === 'label-tokens' && <LabelTokensExercise exercise={exercise} labels={labels} onLabel={(itemId, label) => { setLabels((prev) => ({ ...prev, [itemId]: label })); setResult(null) }} />}
        {exercise.inputType === 'connect-nodes' && <ConnectNodesExercise exercise={exercise} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setResult(null) }} />}
        {exercise.inputType === 'toggle-state' && <ToggleStateExercise exercise={exercise} activeId={toggleId} onToggle={(id) => { setToggleId(id); setResult(null) }} />}
        {exercise.inputType === 'type-reflection' && <TypeReflectionExercise exercise={exercise} value={reflection} onChange={(value) => { setReflection(value); setResult(null) }} />}
        {exercise.inputType === 'drag-order' && <DragOrderExercise exercise={exercise} order={order} onOrder={(next) => { setOrder(next); setResult(null) }} />}
        {exercise.inputType === 'drag-match' && (
          <DragMatchExercise
            exercise={exercise}
            matches={matches}
            activeItem={activeMatchItem}
            onChooseItem={setActiveMatchItem}
            onChooseMatch={(matchId) => {
              if (!activeMatchItem) return
              setMatches((prev) => ({ ...prev, [activeMatchItem]: matchId }))
              setActiveMatchItem(null)
              setResult(null)
            }}
          />
        )}
      </div>
      <ExerciseControls onCheck={checkAnswer} onRetry={() => setResult(null)} onReveal={revealAnswer} result={result} />
      <div ref={feedbackRef} className="exercise-feedback-anchor">
        <ExerciseFeedback result={result} insight={exercise.insight} />
      </div>
      {(exercise.brainMetaphor || exercise.brainLimit) && (
        <div className="exercise-boundary">
          {exercise.brainMetaphor && <p><strong>Brain metaphor:</strong> {exercise.brainMetaphor}</p>}
          {exercise.brainLimit && <p><strong>Limit:</strong> {exercise.brainLimit}</p>}
        </div>
      )}
      <InsightUnlocked active={result?.type === 'correct' || completed} insight={exercise.insight} />
      <div className="exercise-why">
        <strong>Why this matters</strong>
        <p>{exercise.insight}</p>
      </div>
      {onGlossary && (
        <div className="exercise-terms" aria-label="Exercise glossary terms">
          {exercise.glossaryTerms.map((term) => (
            <button key={term} onClick={() => onGlossary(term)}>{term}</button>
          ))}
        </div>
      )}
    </section>
  )
}

export function ExerciseHeader({ exercise, completed, attempts }: { exercise: Exercise, completed: boolean, attempts: number }) {
  return (
    <header className="exercise-header">
      <span className="step-label">Exercise</span>
      <h2 id={`${exercise.id}-title`}>{exercise.title}</h2>
      <p className="exercise-concept">{exercise.concept}</p>
      <div className="exercise-meta" aria-label="Exercise progress">
        <span>{completed ? 'Insight unlocked' : 'Practice mode'}</span>
        <span>{attempts} attempt{attempts === 1 ? '' : 's'}</span>
      </div>
      <div className="exercise-goal">
        <strong>Goal</strong>
        <p>{exercise.goal}</p>
      </div>
      <p className="exercise-prompt">{exercise.prompt}</p>
    </header>
  )
}

export function ActionCue({ verb, instruction }: { verb: Exercise['actionVerb'], instruction: string }) {
  return (
    <div className="action-cue">
      <strong>Do this</strong>
      <span><b>{verb}:</b> {instruction}</span>
    </div>
  )
}

export function TapChoiceExercise({ exercise, selectedId, onSelect }: { exercise: Exercise, selectedId: string | null, onSelect: (id: string) => void }) {
  return (
    <div className="exercise-choice-grid">
      {exercise.sequence && (
        <ContextPreview sequence={exercise.sequence} windowSize={exercise.windowSize ?? exercise.sequence.length} />
      )}
      {exercise.items.map((item) => (
        <button key={item.id} className={selectedId === item.id ? 'exercise-option is-selected' : 'exercise-option'} onClick={() => onSelect(item.id)} aria-pressed={selectedId === item.id}>
          <strong>{item.label}</strong>
          {item.detail && <span>{item.detail}</span>}
        </button>
      ))}
    </div>
  )
}

export function NextTokenPickExercise(props: { exercise: Exercise, selectedId: string | null, onSelect: (id: string) => void }) {
  return (
    <>
      {props.exercise.context && <p className="exercise-context-line"><strong>Current context:</strong> {props.exercise.context}</p>}
      <TapChoiceExercise {...props} />
    </>
  )
}

export function TapMultipleExercise({ exercise, selectedIds, onToggle }: { exercise: Exercise, selectedIds: string[], onToggle: (id: string) => void }) {
  return (
    <div className="exercise-choice-grid multi">
      {exercise.items.map((item) => (
        <button key={item.id} className={selectedIds.includes(item.id) ? 'exercise-option is-selected' : 'exercise-option'} onClick={() => onToggle(item.id)} aria-pressed={selectedIds.includes(item.id)}>
          <strong>{item.label}</strong>
          {item.group && <span>{item.group === 'helpful' ? 'Helpful comparison' : 'Break point'}</span>}
        </button>
      ))}
    </div>
  )
}

export function SortBucketsExercise({
  exercise,
  assignments,
  activeItem,
  onChooseItem,
  onChooseBucket
}: {
  exercise: Exercise
  assignments: Record<string, string>
  activeItem: string | null
  onChooseItem: (id: string) => void
  onChooseBucket: (bucket: string) => void
}) {
  return (
    <div className="sort-exercise">
      <div className="sort-items" aria-label="Items to sort">
        {exercise.items.map((item) => (
          <button key={item.id} className={activeItem === item.id ? 'sort-chip is-active' : assignments[item.id] ? 'sort-chip is-assigned' : 'sort-chip'} onClick={() => onChooseItem(item.id)}>
            <strong>{item.label}</strong>
            {assignments[item.id] && <span>Placed: {assignments[item.id]}</span>}
          </button>
        ))}
      </div>
      <div className="bucket-grid" aria-label="Buckets">
        {(exercise.buckets ?? []).map((bucket) => (
          <button key={bucket} className="bucket-target" onClick={() => onChooseBucket(bucket)}>
            <strong>{bucket}</strong>
            <span>{exercise.items.filter((item) => assignments[item.id] === bucket).map((item) => item.label).join(', ') || 'Tap an item, then this bucket.'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function LabelTokensExercise({ exercise, labels, onLabel }: { exercise: Exercise, labels: Record<string, string>, onLabel: (itemId: string, label: string) => void }) {
  const buckets = exercise.buckets ?? []

  function cycle(itemId: string) {
    const current = labels[itemId]
    const next = buckets[(Math.max(-1, buckets.indexOf(current)) + 1) % buckets.length]
    onLabel(itemId, next)
  }

  return (
    <div className="label-token-exercise">
      <div className="token-label-legend">
        {buckets.map((bucket) => <span key={bucket}>{bucket}</span>)}
      </div>
      <div className="label-token-row" aria-label="Tokens to label">
        {exercise.items.map((item, index) => (
          <button key={item.id} className={`label-token ${labels[item.id] ? 'is-labeled' : ''}`} onClick={() => cycle(item.id)} aria-label={`Token ${index + 1}: ${item.label}. Current label ${labels[item.id] ?? 'none'}.`}>
            <strong>{item.label}</strong>
            <span>{labels[item.id] ?? 'Tap to label'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ConnectNodesExercise({ exercise, selectedId, onSelect }: { exercise: Exercise, selectedId: string | null, onSelect: (id: string) => void }) {
  const target = exercise.items.find((item) => item.id === exercise.targetId)
  return (
    <div className="connect-exercise">
      {target && <p className="exercise-context-line"><strong>Target:</strong> connect <span>{target.label}</span> to its likely referent.</p>}
      <div className="connect-node-grid">
        {exercise.items.map((item) => (
          <button
            key={item.id}
            className={[
              'connect-node',
              item.id === exercise.targetId ? 'is-target' : '',
              selectedId === item.id ? 'is-selected' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => onSelect(item.id)}
            aria-pressed={selectedId === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="connection-readout" aria-live="polite">
        {selectedId ? `Connection: ${target?.label ?? 'target'} -> ${exercise.items.find((item) => item.id === selectedId)?.label}` : 'Choose the token that the target depends on.'}
      </p>
    </div>
  )
}

export function ToggleStateExercise({ exercise, activeId, onToggle }: { exercise: Exercise, activeId: string, onToggle: (id: string) => void }) {
  const active = exercise.items.find((item) => item.id === activeId) ?? exercise.items[0]
  return (
    <div className="toggle-state-exercise">
      <div className="segmented-control wide" role="group" aria-label={exercise.title}>
        {exercise.items.map((item) => (
          <button key={item.id} className={activeId === item.id ? 'active' : ''} onClick={() => onToggle(item.id)} aria-pressed={activeId === item.id}>
            {item.label}
          </button>
        ))}
      </div>
      {active && (
        <div className="state-card" aria-live="polite">
          <strong>{active.label}</strong>
          <p>{active.detail}</p>
        </div>
      )}
    </div>
  )
}

export function TypeReflectionExercise({ exercise, value, onChange }: { exercise: Exercise, value: string, onChange: (value: string) => void }) {
  return (
    <label className="type-reflection-exercise">
      <span>{exercise.actionInstruction}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} placeholder="Type one sentence." />
    </label>
  )
}

export function DragOrderExercise({ exercise, order, onOrder }: { exercise: Exercise, order: string[], onOrder: (next: string[]) => void }) {
  function move(index: number, direction: -1 | 1) {
    const next = [...order]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onOrder(next)
  }

  return (
    <ol className="order-list" aria-label="Ordered items">
      {order.map((id, index) => (
        <li key={id}>
          <span>{exercise.items.find((item) => item.id === id)?.label ?? id}</span>
          <div>
            <button onClick={() => move(index, -1)} aria-label={`Move ${id} up`}>Up</button>
            <button onClick={() => move(index, 1)} aria-label={`Move ${id} down`}>Down</button>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function DragMatchExercise({
  exercise,
  matches,
  activeItem,
  onChooseItem,
  onChooseMatch
}: {
  exercise: Exercise
  matches: Record<string, string>
  activeItem: string | null
  onChooseItem: (id: string | null) => void
  onChooseMatch: (id: string) => void
}) {
  const leftItems = exercise.items.filter((item) => item.matchId)
  const rightItems = exercise.items.filter((item) => !item.matchId)
  return (
    <div className="match-exercise">
      <div>
        <strong>Items</strong>
        {leftItems.map((item) => (
          <button key={item.id} className={activeItem === item.id ? 'match-chip is-active' : 'match-chip'} onClick={() => onChooseItem(item.id)}>
            {item.label}
            {matches[item.id] && <span>{' -> '}{exercise.items.find((match) => match.id === matches[item.id])?.label}</span>}
          </button>
        ))}
      </div>
      <div>
        <strong>Matches</strong>
        {rightItems.map((item) => (
          <button key={item.id} className="match-chip" onClick={() => onChooseMatch(item.id)}>{item.label}</button>
        ))}
      </div>
    </div>
  )
}

function ContextPreview({ sequence, windowSize }: { sequence: string[], windowSize: number }) {
  const visibleStart = Math.max(0, sequence.length - windowSize)
  return (
    <div className="context-preview" aria-label="Context window preview">
      <strong>After all cards enter</strong>
      <div>
        {sequence.map((item, index) => (
          <span key={item} className={index < visibleStart ? 'fell-out' : 'visible'}>{item}</span>
        ))}
      </div>
      <small>Patterned cards fell out; solid cards remain visible.</small>
    </div>
  )
}

export function ExerciseControls({ onCheck, onRetry, onReveal, result }: { onCheck: () => void, onRetry: () => void, onReveal: () => void, result: ResultState }) {
  return (
    <div className="exercise-controls">
      <button className="primary-btn" onClick={onCheck}>Check</button>
      <button className="secondary-btn" onClick={onRetry}>Try again</button>
      <button className="text-btn" onClick={onReveal}>Show me</button>
      {result?.type === 'revealed' && <span className="mini-status">revealed</span>}
    </div>
  )
}

export function ExerciseFeedback({ result, insight }: { result: ResultState, insight: string }) {
  if (!result) {
    return (
      <div className="exercise-feedback idle" aria-live="polite">
        <strong>Feedback</strong>
        <p>Try the action, then check your answer.</p>
      </div>
    )
  }

  if (result.type === 'correct') {
    return (
      <div className="exercise-feedback good" aria-live="polite">
        <strong>Insight unlocked.</strong>
        <p>{result.detail}</p>
        <small>{insight}</small>
      </div>
    )
  }

  if (result.type === 'revealed') {
    return (
      <div className="exercise-feedback revealed" aria-live="polite">
        <strong>Show me.</strong>
        <p>{result.detail}</p>
      </div>
    )
  }

  return (
    <div className="exercise-feedback" aria-live="polite">
      <strong>Not quite.</strong>
      <p>{result.detail}</p>
      <small>Try again with the misconception in mind.</small>
    </div>
  )
}

export function InsightUnlocked({ active, insight }: { active: boolean, insight: string }) {
  return (
    <p className={active ? 'insight-unlocked is-active' : 'insight-unlocked'}>
      {active ? `Insight unlocked: ${insight}` : 'Insight locked: complete the exercise to save it.'}
    </p>
  )
}
