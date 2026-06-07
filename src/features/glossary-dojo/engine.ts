import { glossaryDojoMeta, type GlossaryDojoTermMeta } from '../../data/glossaryDojoMeta'
import { hashString, shuffleChoicesForQuestion } from '../../utils/choiceOrder'
import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoOption,
  GlossaryDojoOptionKind,
  GlossaryDojoQuestion,
  GlossaryDojoQuestionType,
  GlossaryDojoRound,
  GlossaryDojoTerm,
  GlossarySourceTerm
} from './types'

const ROUND_SIZE = 12
const OPTION_COUNT = 4
const QUESTION_TYPES: GlossaryDojoQuestionType[] = [
  'term_to_definition',
  'definition_to_term',
  'relationship',
  'confusable_pair',
  'stage_location'
]

const TYPE_LABELS: Record<GlossaryDojoQuestionType, string> = {
  term_to_definition: 'Term to meaning',
  definition_to_term: 'Meaning to term',
  confusable_pair: 'Easy mix-up',
  relationship: 'Neighbor term',
  stage_location: 'Learning neighborhood'
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

function firstSentence(value = '') {
  const cleaned = cleanText(value)
  const match = cleaned.match(/^(.+?[.!?])(?:\s|$)/)
  return match?.[1] ?? cleaned
}

function truncate(value: string, max = 168) {
  if (value.length <= max) return value
  return `${value.slice(0, max - 1).trim()}...`
}

function lookupKey(value: string) {
  return cleanText(value).toLowerCase()
}

function compactId(value: string) {
  return hashString(value).toString(36)
}

function makeRoundId(roundNumber: number) {
  return `dojo-${roundNumber}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function termExplanation(term: GlossaryDojoTerm) {
  return term.shortExplanation ?? term.shortDefinition
}

function correctTermMeaning(term: GlossaryDojoTerm) {
  return `${term.label} means ${termExplanation(term)}`
}

function stableShuffle<T>(items: T[], seed: string, questionId: string) {
  return shuffleChoicesForQuestion(questionId, items, seed)
}

function findTerm(termsById: Map<string, GlossaryDojoTerm>, id: string) {
  return termsById.get(id) ?? null
}

export function normalizeGlossaryTerms(
  sourceTerms: GlossarySourceTerm[],
  meta: Record<string, GlossaryDojoTermMeta> = glossaryDojoMeta
): GlossaryDojoTerm[] {
  const lookup = new Map<string, string>()

  sourceTerms.forEach((term) => {
    lookup.set(lookupKey(term.id), term.id)
    lookup.set(lookupKey(term.term), term.id)
    term.aliases?.forEach((alias) => lookup.set(lookupKey(alias), term.id))
  })

  return sourceTerms
    .filter((term) => term.id && term.term && term.definition)
    .map((term) => {
      const relatedTermIds = (term.related ?? [])
        .map((related) => lookup.get(lookupKey(related)) ?? null)
        .filter((id): id is string => Boolean(id && id !== term.id))

      return {
        id: term.id,
        label: term.term,
        aliases: term.aliases ?? [],
        shortDefinition: truncate(firstSentence(term.definition)),
        longDefinition: cleanText(term.definition),
        relationship: cleanText(term.relationship ?? ''),
        metaphor: cleanText(term.metaphor ?? ''),
        relatedTermIds: [...new Set(relatedTermIds)],
        ...(meta[term.id] ?? {})
      }
    })
}

export function makeTermsById(terms: GlossaryDojoTerm[]) {
  return new Map(terms.map((term) => [term.id, term]))
}

function candidateDistractors(
  target: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  terms: GlossaryDojoTerm[],
  termsById: Map<string, GlossaryDojoTerm>,
  seed: string,
  questionId: string,
  preferredIds: string[] = [],
  allowSameStage = true
) {
  const excluded = new Set([target.id, correct.id])
  const preferred = preferredIds
    .map((id) => findTerm(termsById, id))
    .filter((term): term is GlossaryDojoTerm => Boolean(term && !excluded.has(term.id)))

  const sameFamily = terms.filter((term) => {
    if (excluded.has(term.id)) return false
    if (!target.familyTags?.length || !term.familyTags?.length) return false
    return target.familyTags.some((tag) => term.familyTags?.includes(tag))
  })

  const sameStage = allowSameStage
    ? terms.filter((term) =>
        !excluded.has(term.id) &&
        Boolean(target.curriculumStage) &&
        term.curriculumStage === target.curriculumStage
      )
    : []

  const global = terms.filter((term) => !excluded.has(term.id))
  const merged = [...preferred, ...sameFamily, ...sameStage, ...global]
  const unique = Array.from(new Map(merged.map((term) => [term.id, term])).values())
  return stableShuffle(unique, seed, `${questionId}:distractors`).slice(0, OPTION_COUNT - 1)
}

function makeOptions(
  questionId: string,
  correct: GlossaryDojoTerm,
  distractors: GlossaryDojoTerm[],
  kind: GlossaryDojoOptionKind,
  seed: string
) {
  const terms = [correct, ...distractors].slice(0, OPTION_COUNT)
  const rawOptions: GlossaryDojoOption[] = terms.map((term) => ({
    id: `${questionId}:option:${compactId(term.id)}`,
    termId: term.id,
    representedTermId: term.id,
    label: kind === 'definition' ? term.shortDefinition : term.label,
    displayedLabel: kind === 'definition' ? term.shortDefinition : term.label,
    displayedDefinition: term.shortDefinition,
    detail: kind === 'definition' ? term.label : term.shortDefinition,
    kind,
    isCorrect: term.id === correct.id,
    feedbackTermId: term.id
  }))

  return stableShuffle(rawOptions, seed, questionId)
}

function makeQuestion(
  type: GlossaryDojoQuestionType,
  target: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  terms: GlossaryDojoTerm[],
  termsById: Map<string, GlossaryDojoTerm>,
  seed: string,
  roundId: string,
  preferredDistractorIds: string[] = [],
  allowSameStageDistractors = true
): GlossaryDojoQuestion | null {
  const optionKind: GlossaryDojoOptionKind = type === 'term_to_definition' ? 'definition' : 'term'
  const questionBase = `${roundId}:${type}:${target.id}:${correct.id}`
  const questionId = `glossary-dojo:${compactId(questionBase)}`
  const distractors = candidateDistractors(
    target,
    correct,
    terms,
    termsById,
    seed,
    questionId,
    preferredDistractorIds,
    allowSameStageDistractors
  )
  if (distractors.length < OPTION_COUNT - 1) return null

  const options = makeOptions(questionId, correct, distractors, optionKind, seed)
  const correctOption = options.find((option) => option.termId === correct.id)
  if (!correctOption) return null

  const prompts: Record<GlossaryDojoQuestionType, string> = {
    term_to_definition: `Which definition best matches ${target.label}?`,
    definition_to_term: `Which term matches this definition: ${target.shortDefinition}`,
    confusable_pair: `Which real glossary term is easiest to confuse with ${target.label}?`,
    relationship: `Which term most directly connects to ${target.label}?`,
    stage_location: `Which term is a neighbor of ${target.label} in the same learning neighborhood?`
  }

  const explanations: Record<GlossaryDojoQuestionType, string> = {
    term_to_definition: `${target.label} means ${termExplanation(target)}`,
    definition_to_term: `${target.label} means ${termExplanation(target)}`,
    confusable_pair: `${target.label} is often mixed up with ${correct.label}; the contrast matters.`,
    relationship: `${target.label} connects to ${correct.label}: ${termExplanation(correct)}`,
    stage_location: `${target.label} and ${correct.label} both belong near ${target.curriculumStage ?? 'the same part of the learning path'}.`
  }

  return {
    id: questionId,
    type,
    typeLabel: TYPE_LABELS[type],
    prompt: prompts[type],
    targetTermId: target.id,
    correctTermId: correct.id,
    correctOptionId: correctOption.id,
    optionKind,
    options,
    explanation: explanations[type],
    contrast: type === 'confusable_pair'
      ? `${target.label}: ${termExplanation(target)} ${correct.label}: ${termExplanation(correct)}`
      : undefined,
    stageLabel: target.curriculumStage
  }
}

function makeQuestionCandidates(
  type: GlossaryDojoQuestionType,
  target: GlossaryDojoTerm,
  terms: GlossaryDojoTerm[],
  termsById: Map<string, GlossaryDojoTerm>,
  seed: string,
  roundId: string
) {
  if (type === 'term_to_definition' || type === 'definition_to_term') {
    return makeQuestion(type, target, target, terms, termsById, seed, roundId)
  }

  if (type === 'relationship') {
    const relationIds = [...(target.relationships ?? []), ...target.relatedTermIds]
    const related = relationIds
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && term.id !== target.id))
    const correct = stableShuffle(related, seed, `${roundId}:relationship:${target.id}`)[0]
    return correct ? makeQuestion(type, target, correct, terms, termsById, seed, roundId) : null
  }

  if (type === 'confusable_pair') {
    const confusable = (target.confusableWith ?? [])
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && term.id !== target.id))
    const correct = stableShuffle(confusable, seed, `${roundId}:confusable:${target.id}`)[0]
    return correct ? makeQuestion(type, target, correct, terms, termsById, seed, roundId) : null
  }

  if (type === 'stage_location') {
    if (!target.curriculumStage) return null
    const stageMates = terms.filter((term) =>
      term.id !== target.id &&
      term.curriculumStage === target.curriculumStage
    )
    const correct = stableShuffle(stageMates, seed, `${roundId}:stage:${target.id}`)[0]
    const otherStageIds = terms
      .filter((term) => term.curriculumStage && term.curriculumStage !== target.curriculumStage)
      .map((term) => term.id)
    return correct ? makeQuestion(type, target, correct, terms, termsById, seed, roundId, otherStageIds, false) : null
  }

  return null
}

export function buildGlossaryDojoRound({
  terms,
  seed,
  roundNumber
}: {
  terms: GlossaryDojoTerm[]
  seed: string
  roundNumber: number
}): GlossaryDojoRound {
  const roundId = makeRoundId(roundNumber)
  const termsById = makeTermsById(terms)
  const pools = QUESTION_TYPES.map((type) => ({
    type,
    questions: stableShuffle(
      terms
        .map((term) => makeQuestionCandidates(type, term, terms, termsById, seed, roundId))
        .filter((question): question is GlossaryDojoQuestion => Boolean(question)),
      seed,
      `${roundId}:pool:${type}`
    )
  }))

  const questions: GlossaryDojoQuestion[] = []
  const usedTargets = new Set<string>()
  const typeOrder = stableShuffle([...QUESTION_TYPES], seed, `${roundId}:type-order`)

  while (questions.length < ROUND_SIZE) {
    const before = questions.length
    typeOrder.forEach((type) => {
      if (questions.length >= ROUND_SIZE) return
      const pool = pools.find((item) => item.type === type)
      const next = pool?.questions.find((question) => !usedTargets.has(question.targetTermId))
      if (!next) return
      questions.push(next)
      usedTargets.add(next.targetTermId)
    })
    if (questions.length === before) break
  }

  return {
    id: roundId,
    roundNumber,
    createdAt: new Date().toISOString(),
    currentIndex: 0,
    questions,
    answers: []
  }
}

export function evaluateGlossaryDojoAnswer(
  question: GlossaryDojoQuestion,
  selectedOptionId: string
): GlossaryDojoAnswerResult | null {
  const selectedOption = question.options.find((option) => option.id === selectedOptionId)
  const correctOption = question.options.find((option) => option.id === question.correctOptionId)
  if (!selectedOption || !correctOption) return null
  const selectedTermId = selectedOption.representedTermId ?? selectedOption.termId

  return {
    selectedOption,
    correctOption,
    answer: {
      questionId: question.id,
      selectedOptionId,
      selectedTermId,
      correctTermId: question.correctTermId,
      targetTermId: question.targetTermId,
      isCorrect: selectedOption.id === question.correctOptionId,
      answeredAt: new Date().toISOString()
    }
  }
}

export function getGlossaryDojoFeedback(
  question: GlossaryDojoQuestion,
  result: GlossaryDojoAnswerResult,
  termsById: Map<string, GlossaryDojoTerm>
) {
  const correct = findTerm(termsById, question.correctTermId)
  const selectedFeedbackTermId = result.selectedOption.feedbackTermId ??
    result.selectedOption.representedTermId ??
    result.selectedOption.termId
  const selected = findTerm(termsById, selectedFeedbackTermId)

  if (!correct) return question.explanation

  if (result.answer.isCorrect) {
    return `Insight strengthened. ${correctTermMeaning(correct)}`
  }

  if (!selected) {
    return `Not quite. That answer describes a different glossary term. The correct term is ${correct.label}. ${correctTermMeaning(correct)}`
  }

  const correctionLabel = result.selectedOption.kind === 'definition' ? 'correct match' : 'correct term'
  return `Not quite. That definition is for ${selected.label}. The ${correctionLabel} is ${correct.label}. ${correctTermMeaning(correct)}`
}
