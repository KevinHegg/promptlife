import { useCallback, useMemo, useState } from 'react'
import { glossary } from '../../data/content'
import { glossaryDojoMeta } from '../../data/glossaryDojoMeta'
import { getChoiceOrderSeed } from '../../utils/choiceOrder'
import {
  buildGlossaryDojoRound,
  evaluateGlossaryDojoAnswer,
  getGlossaryDojoFeedback,
  makeTermsById,
  normalizeGlossaryTerms
} from './engine'
import {
  clearGlossaryDojoProgress,
  completeGlossaryDojoRound,
  loadGlossaryDojoProgress,
  recordGlossaryDojoAnswer,
  saveGlossaryDojoProgress
} from './storage'
import type { GlossaryDojoAnswerResult, GlossaryDojoRound } from './types'

function answeredQuestion(round: GlossaryDojoRound | null, questionId?: string | null) {
  if (!round || !questionId) return null
  return round.answers.find((answer) => answer.questionId === questionId) ?? null
}

export function useGlossaryDojo() {
  const terms = useMemo(() => normalizeGlossaryTerms(glossary, glossaryDojoMeta), [])
  const termsById = useMemo(() => makeTermsById(terms), [terms])
  const choiceSeed = useMemo(() => getChoiceOrderSeed(), [])
  const [progress, setProgress] = useState(() => loadGlossaryDojoProgress())

  const currentRound = progress.currentRound
  const currentQuestion = currentRound?.questions[currentRound.currentIndex] ?? null
  const currentAnswer = answeredQuestion(currentRound, currentQuestion?.id)
  const totalQuestions = currentRound?.questions.length ?? 12

  const commit = useCallback((nextProgress) => {
    setProgress(saveGlossaryDojoProgress(nextProgress))
  }, [])

  const startRound = useCallback(() => {
    const latest = loadGlossaryDojoProgress()
    const roundNumber = latest.roundsCompleted + 1
    const round = buildGlossaryDojoRound({
      terms,
      seed: `${choiceSeed}:glossary-dojo:${roundNumber}:${Date.now()}`,
      roundNumber
    })
    commit({
      ...latest,
      currentRound: round,
      lastCompletedRound: null
    })
  }, [choiceSeed, commit, terms])

  const answerQuestion = useCallback((optionId: string): GlossaryDojoAnswerResult | null => {
    if (!currentRound || !currentQuestion || currentAnswer) return null
    const result = evaluateGlossaryDojoAnswer(currentQuestion, optionId)
    if (!result) return null

    const updatedRound = {
      ...currentRound,
      answers: [...currentRound.answers, result.answer]
    }

    const updatedProgress = recordGlossaryDojoAnswer(progress, updatedRound, currentQuestion, result)
    setProgress(updatedProgress)
    return result
  }, [currentAnswer, currentQuestion, currentRound, progress])

  const nextQuestion = useCallback(() => {
    if (!currentRound || !currentQuestion || !currentAnswer) return
    if (currentRound.currentIndex >= currentRound.questions.length - 1) {
      const completed = completeGlossaryDojoRound(progress, currentRound)
      setProgress(completed)
      return
    }

    const nextRound = {
      ...currentRound,
      currentIndex: currentRound.currentIndex + 1
    }
    commit({
      ...progress,
      currentRound: nextRound
    })
  }, [commit, currentAnswer, currentQuestion, currentRound, progress])

  const reset = useCallback(() => {
    setProgress(clearGlossaryDojoProgress())
  }, [])

  const getFeedback = useCallback((result: GlossaryDojoAnswerResult) => {
    if (!currentQuestion) return ''
    return getGlossaryDojoFeedback(currentQuestion, result, termsById)
  }, [currentQuestion, termsById])

  const currentResult = useMemo(() => {
    if (!currentQuestion || !currentAnswer) return null
    const selectedOption = currentQuestion.options.find((option) => option.id === currentAnswer.selectedOptionId)
    const correctOption = currentQuestion.options.find((option) => option.id === currentQuestion.correctOptionId)
    if (!selectedOption || !correctOption) return null
    return { answer: currentAnswer, selectedOption, correctOption }
  }, [currentAnswer, currentQuestion])

  return {
    progress,
    terms,
    termsById,
    currentRound,
    currentQuestion,
    currentAnswer,
    currentResult,
    currentIndex: currentRound?.currentIndex ?? 0,
    totalQuestions,
    startRound,
    answerQuestion,
    nextQuestion,
    reset,
    getFeedback
  }
}
