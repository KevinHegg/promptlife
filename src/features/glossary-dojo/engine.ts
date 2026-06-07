import { glossaryDojoMeta, type GlossaryDojoTermMeta } from '../../data/glossaryDojoMeta'
import { hashString, shuffleChoicesForQuestion } from '../../utils/choiceOrder'
import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoCompletedRound,
  GlossaryDojoOption,
  GlossaryDojoOptionKind,
  GlossaryDojoProgress,
  GlossaryDojoQuestion,
  GlossaryDojoQuestionType,
  GlossaryDojoRound,
  GlossaryDojoTerm,
  GlossarySourceTerm
} from './types'

const ROUND_SIZE = 12
const OPTION_COUNT = 4
const BASIC_QUESTION_TYPES: GlossaryDojoQuestionType[] = [
  'term_to_definition',
  'definition_to_term'
]

const DEFAULT_ROUND_PATTERN: GlossaryDojoQuestionType[] = [
  'term_to_definition',
  'term_to_definition',
  'term_to_definition',
  'term_to_definition',
  'term_to_definition',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'confusable_pair',
  'stage_location'
]

const TYPE_LABELS: Record<GlossaryDojoQuestionType, string> = {
  term_to_definition: 'Term to meaning',
  definition_to_term: 'Meaning to term',
  closest_concept: 'Closest idea',
  confusable_pair: 'Easy mix-up',
  relationship: 'Relationship',
  stage_location: 'Model story'
}

const HELPER_TEXT: Record<GlossaryDojoQuestionType, string> = {
  term_to_definition: 'Choose the best definition.',
  definition_to_term: 'Choose the matching term.',
  closest_concept: 'Choose the closest related term.',
  confusable_pair: 'Choose the closest related term.',
  relationship: 'Choose the relationship that best fits.',
  stage_location: 'Choose where this idea fits in the journey.'
}

type QuestionSpec = {
  type: GlossaryDojoQuestionType
  targetTermId: string
  correctTermId?: string
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

function findTerm(termsById: Map<string, GlossaryDojoTerm>, id?: string) {
  return id ? termsById.get(id) ?? null : null
}

function uniqueTerms(terms: GlossaryDojoTerm[]) {
  return Array.from(new Map(terms.map((term) => [term.id, term])).values())
}

function definitionKey(term: GlossaryDojoTerm) {
  return lookupKey(term.longDefinition || term.shortDefinition)
}

function stageLabel(term: GlossaryDojoTerm) {
  return cleanText(term.curriculumStage ?? term.lifecycleStage ?? 'The model story')
}

function addUnique<T extends { id: string }>(target: T[], candidates: T[], limit: number) {
  candidates.forEach((candidate) => {
    if (target.length >= limit) return
    if (!target.some((item) => item.id === candidate.id)) target.push(candidate)
  })
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
    .map((term, index) => {
      const relatedTermIds = (term.related ?? [])
        .map((related) => lookup.get(lookupKey(related)) ?? null)
        .filter((id): id is string => Boolean(id && id !== term.id))

      return {
        id: term.id,
        label: term.term,
        aliases: term.aliases ?? [],
        learningPathIndex: index,
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

function distractorEligible(
  target: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  candidate: GlossaryDojoTerm,
  preferredIds: string[]
) {
  if (candidate.id === target.id || candidate.id === correct.id) return false
  if (preferredIds.includes(candidate.id)) return true
  return definitionKey(candidate) !== definitionKey(correct)
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
  const eligible = terms.filter((term) => distractorEligible(target, correct, term, preferredIds))
  const preferred = preferredIds
    .map((id) => findTerm(termsById, id))
    .filter((term): term is GlossaryDojoTerm => Boolean(term && eligible.some((item) => item.id === term.id)))

  const byDistance = (min: number, max: number) => eligible.filter((term) => {
    const distance = Math.abs(term.learningPathIndex - target.learningPathIndex)
    return distance >= min && distance <= max
  })

  const near = stableShuffle(byDistance(2, 5), seed, `${questionId}:near`)
  const medium = stableShuffle(byDistance(6, 12), seed, `${questionId}:medium`)
  const related = stableShuffle(
    [...(target.relationships ?? []), ...target.relatedTermIds, ...(target.confusableWith ?? [])]
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && eligible.some((item) => item.id === term.id))),
    seed,
    `${questionId}:related`
  )
  const sameFamily = stableShuffle(
    eligible.filter((term) =>
      Boolean(target.familyTags?.length) &&
      Boolean(term.familyTags?.length) &&
      target.familyTags?.some((tag) => term.familyTags?.includes(tag))
    ),
    seed,
    `${questionId}:family`
  )
  const sameStage = allowSameStage
    ? stableShuffle(
        eligible.filter((term) =>
          Boolean(target.curriculumStage) &&
          term.curriculumStage === target.curriculumStage
        ),
        seed,
        `${questionId}:stage`
      )
    : []
  const far = stableShuffle(
    eligible.filter((term) => Math.abs(term.learningPathIndex - target.learningPathIndex) > 12),
    seed,
    `${questionId}:far`
  )
  const global = stableShuffle(eligible, seed, `${questionId}:global`)

  const picked: GlossaryDojoTerm[] = []
  addUnique(picked, stableShuffle(preferred, seed, `${questionId}:preferred`), OPTION_COUNT - 1)
  addUnique(picked, near, Math.min(1, OPTION_COUNT - 1))
  addUnique(picked, medium, Math.min(2, OPTION_COUNT - 1))
  addUnique(picked, related, OPTION_COUNT - 1)
  addUnique(picked, sameFamily, OPTION_COUNT - 1)
  addUnique(picked, sameStage, OPTION_COUNT - 1)
  addUnique(picked, far, OPTION_COUNT - 1)
  addUnique(picked, global, OPTION_COUNT - 1)

  return picked.slice(0, OPTION_COUNT - 1)
}

function makeOption(
  questionId: string,
  term: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  kind: GlossaryDojoOptionKind,
  label: string,
  detail?: string
): GlossaryDojoOption {
  return {
    id: `${questionId}:option:${compactId(`${kind}:${term.id}:${label}`)}`,
    termId: term.id,
    representedTermId: term.id,
    label,
    displayedLabel: label,
    displayedDefinition: term.shortDefinition,
    detail,
    kind,
    isCorrect: term.id === correct.id,
    feedbackTermId: term.id
  }
}

function makeTermOptions(
  questionId: string,
  correct: GlossaryDojoTerm,
  distractors: GlossaryDojoTerm[],
  seed: string
) {
  const rawOptions = [correct, ...distractors]
    .slice(0, OPTION_COUNT)
    .map((term) => makeOption(questionId, term, correct, 'term', term.label))

  return stableShuffle(rawOptions, seed, questionId)
}

function makeDefinitionOptions(
  questionId: string,
  correct: GlossaryDojoTerm,
  distractors: GlossaryDojoTerm[],
  seed: string
) {
  const rawOptions = [correct, ...distractors]
    .slice(0, OPTION_COUNT)
    .map((term) => makeOption(questionId, term, correct, 'definition', term.shortDefinition))

  return stableShuffle(rawOptions, seed, questionId)
}

function makeStageOptions(
  questionId: string,
  target: GlossaryDojoTerm,
  terms: GlossaryDojoTerm[],
  seed: string
) {
  const correctStage = stageLabel(target)
  const distractorTerms = stableShuffle(
    terms.filter((term) => term.id !== target.id && stageLabel(term) !== correctStage),
    seed,
    `${questionId}:stage-options`
  )
  const stageOptions: GlossaryDojoOption[] = [
    makeOption(questionId, target, target, 'stage', correctStage)
  ]

  distractorTerms.forEach((term) => {
    if (stageOptions.length >= OPTION_COUNT) return
    const label = stageLabel(term)
    if (!stageOptions.some((option) => option.label === label)) {
      stageOptions.push(makeOption(questionId, term, target, 'stage', label))
    }
  })

  if (stageOptions.length < OPTION_COUNT) return null
  return stableShuffle(stageOptions, seed, questionId)
}

function relationshipStatement(target: GlossaryDojoTerm, related: GlossaryDojoTerm) {
  if (target.relatedTermIds.includes(related.id) || target.relationships?.includes(related.id)) {
    return `${related.label} is directly connected to ${target.label}.`
  }
  return `${related.label} belongs near ${target.label} in this part of the model story.`
}

function makeRelationshipOptions(
  questionId: string,
  target: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  distractors: GlossaryDojoTerm[],
  seed: string
) {
  const rawOptions = [correct, ...distractors]
    .slice(0, OPTION_COUNT)
    .map((term) => makeOption(questionId, term, correct, 'statement', relationshipStatement(target, term)))

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
  const questionBase = `${roundId}:${type}:${target.id}:${correct.id}`
  const questionId = `glossary-dojo:${compactId(questionBase)}`
  const optionKind: GlossaryDojoOptionKind =
    type === 'term_to_definition' ? 'definition' :
    type === 'stage_location' ? 'stage' :
    type === 'relationship' ? 'statement' :
    'term'

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
  if (type !== 'stage_location' && distractors.length < OPTION_COUNT - 1) return null

  const options = type === 'term_to_definition'
    ? makeDefinitionOptions(questionId, correct, distractors, seed)
    : type === 'relationship'
      ? makeRelationshipOptions(questionId, target, correct, distractors, seed)
      : type === 'stage_location'
        ? makeStageOptions(questionId, target, terms, seed)
        : makeTermOptions(questionId, correct, distractors, seed)
  if (!options) return null

  const correctOption = options.find((option) => option.isCorrect)
  if (!correctOption) return null

  const prompts: Record<GlossaryDojoQuestionType, string> = {
    term_to_definition: `What does ${target.label} mean?`,
    definition_to_term: 'Which term matches this definition?',
    closest_concept: `Which idea is closest to ${target.label}?`,
    confusable_pair: `Which term is easiest to confuse with ${target.label}?`,
    relationship: `How does ${target.label} relate to ${correct.label}?`,
    stage_location: `Where does ${target.label} fit in the model story?`
  }

  const explanations: Record<GlossaryDojoQuestionType, string> = {
    term_to_definition: `${target.label} means ${termExplanation(target)}`,
    definition_to_term: `${target.label} means ${termExplanation(target)}`,
    closest_concept: `${correct.label} is closest here because ${termExplanation(correct)}`,
    confusable_pair: `${target.label} is often mixed up with ${correct.label}; the contrast matters.`,
    relationship: `${target.label} connects to ${correct.label}: ${termExplanation(correct)}`,
    stage_location: `${target.label} fits in ${stageLabel(target)}.`
  }

  return {
    id: questionId,
    type,
    typeLabel: TYPE_LABELS[type],
    prompt: prompts[type],
    helperText: HELPER_TEXT[type],
    definitionText: type === 'definition_to_term' ? target.shortDefinition : undefined,
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
  roundId: string,
  forcedCorrectTermId?: string
) {
  if (type === 'term_to_definition' || type === 'definition_to_term') {
    return makeQuestion(type, target, target, terms, termsById, seed, roundId)
  }

  if (type === 'relationship') {
    const forced = findTerm(termsById, forcedCorrectTermId)
    const relationIds = [...(target.relationships ?? []), ...target.relatedTermIds]
    const related = relationIds
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && term.id !== target.id))
    const correct = forced ?? stableShuffle(related, seed, `${roundId}:relationship:${target.id}`)[0]
    return correct ? makeQuestion(type, target, correct, terms, termsById, seed, roundId) : null
  }

  if (type === 'confusable_pair' || type === 'closest_concept') {
    const forced = findTerm(termsById, forcedCorrectTermId)
    const ids = type === 'confusable_pair'
      ? [...(target.confusableWith ?? []), ...(target.relationships ?? []), ...target.relatedTermIds]
      : [...(target.relationships ?? []), ...target.relatedTermIds, ...(target.confusableWith ?? [])]
    const related = ids
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && term.id !== target.id))
    const correct = forced ?? stableShuffle(uniqueTerms(related), seed, `${roundId}:${type}:${target.id}`)[0]
    return correct ? makeQuestion(type, target, correct, terms, termsById, seed, roundId, ids) : null
  }

  if (type === 'stage_location') {
    if (!target.curriculumStage && !target.lifecycleStage) return null
    return makeQuestion(type, target, target, terms, termsById, seed, roundId, [], false)
  }

  return null
}

function practicedCount(progress: GlossaryDojoProgress | null | undefined, termId: string) {
  return progress?.terms?.[termId]?.practiced ?? 0
}

function selectRoundTargets(
  terms: GlossaryDojoTerm[],
  seed: string,
  roundId: string,
  progress?: GlossaryDojoProgress | null,
  explicitTargetTermIds?: string[],
  count = ROUND_SIZE
) {
  const termsById = makeTermsById(terms)
  if (explicitTargetTermIds?.length) {
    return explicitTargetTermIds
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term))
      .slice(0, count)
  }

  const sorted = [...terms].sort((a, b) => a.learningPathIndex - b.learningPathIndex)
  const firstUnpracticedIndex = sorted.findIndex((term) => practicedCount(progress, term.id) === 0)
  const frontierStart = Math.max(0, firstUnpracticedIndex === -1 ? 0 : firstUnpracticedIndex - 2)
  const frontier = sorted.slice(frontierStart, frontierStart + Math.max(count * 2, 18))
  const recentMissedIds = progress?.recentMistakes?.map((mistake) => mistake.termId) ?? []
  const recentMissed = recentMissedIds
    .map((id) => findTerm(termsById, id))
    .filter((term): term is GlossaryDojoTerm => Boolean(term))
  const practicedNotMastered = sorted.filter((term) => {
    const termProgress = progress?.terms?.[term.id]
    return Boolean(termProgress && termProgress.practiced > 0 && !termProgress.mastered)
  })
  const unpracticedFrontier = frontier.filter((term) => practicedCount(progress, term.id) === 0)
  const unpracticed = sorted.filter((term) => practicedCount(progress, term.id) === 0)
  const nextUnpracticed = unpracticed.slice(0, Math.max(count * 2, 24))
  const masteredMaintenance = sorted.filter((term) => progress?.terms?.[term.id]?.mastered)
  const picked: GlossaryDojoTerm[] = []

  addUnique(picked, stableShuffle(unpracticedFrontier, seed, `${roundId}:frontier`), Math.min(8, count))
  addUnique(picked, stableShuffle(recentMissed, seed, `${roundId}:missed`), Math.min(10, count))
  addUnique(picked, stableShuffle(practicedNotMastered, seed, `${roundId}:not-mastered`), count)
  addUnique(picked, stableShuffle(nextUnpracticed, seed, `${roundId}:next-unpracticed`), count)
  addUnique(picked, stableShuffle(unpracticed, seed, `${roundId}:unpracticed`), count)
  addUnique(picked, stableShuffle(masteredMaintenance, seed, `${roundId}:mastered`), count)
  addUnique(picked, stableShuffle(sorted, seed, `${roundId}:all`), count)

  const lastTargetSet = new Set(progress?.lastCompletedRound?.targetTermIds ?? [])
  const sameAsLast = picked.length === lastTargetSet.size && picked.every((term) => lastTargetSet.has(term.id))
  if (sameAsLast) {
    const replacement = sorted.find((term) => !lastTargetSet.has(term.id))
    if (replacement && picked.length) picked[picked.length - 1] = replacement
  }

  return picked.slice(0, count)
}

function specsFromTargets(
  targets: GlossaryDojoTerm[],
  sourceMode: GlossaryDojoRound['sourceMode'],
  seed: string,
  roundId: string
): QuestionSpec[] {
  if (sourceMode === 'review_missed') {
    return targets.map((target, index) => ({
      targetTermId: target.id,
      type: BASIC_QUESTION_TYPES[index % BASIC_QUESTION_TYPES.length]
    }))
  }

  const pattern = DEFAULT_ROUND_PATTERN.slice(0, targets.length)
  return targets.map((target, index) => ({
    targetTermId: target.id,
    type: pattern[index] ?? BASIC_QUESTION_TYPES[index % BASIC_QUESTION_TYPES.length]
  }))
}

function makeQuestionFromSpec(
  spec: QuestionSpec,
  terms: GlossaryDojoTerm[],
  termsById: Map<string, GlossaryDojoTerm>,
  seed: string,
  roundId: string,
  fallbackIndex: number
) {
  const target = findTerm(termsById, spec.targetTermId)
  if (!target) return null
  const preferredTypes: GlossaryDojoQuestionType[] = [
    spec.type,
    ...BASIC_QUESTION_TYPES.filter((type) => type !== spec.type),
    'closest_concept',
    'stage_location'
  ]

  for (const type of preferredTypes) {
    const question = makeQuestionCandidates(
      type,
      target,
      terms,
      termsById,
      seed,
      roundId,
      type === spec.type ? spec.correctTermId : undefined
    )
    if (question) return question
  }

  const fallbackTarget = terms[fallbackIndex % terms.length]
  return fallbackTarget
    ? makeQuestionCandidates('term_to_definition', fallbackTarget, terms, termsById, seed, roundId)
    : null
}

export function buildGlossaryDojoRound({
  terms,
  seed,
  roundNumber,
  progress = null,
  sourceMode = 'new_round',
  targetTermIds,
  questionSpecs,
  repeatedFromRound,
  reviewFromRound
}: {
  terms: GlossaryDojoTerm[]
  seed: string
  roundNumber: number
  progress?: GlossaryDojoProgress | null
  sourceMode?: GlossaryDojoRound['sourceMode']
  targetTermIds?: string[]
  questionSpecs?: QuestionSpec[]
  repeatedFromRound?: GlossaryDojoCompletedRound | null
  reviewFromRound?: GlossaryDojoCompletedRound | null
}): GlossaryDojoRound {
  const roundId = makeRoundId(roundNumber)
  const termsById = makeTermsById(terms)
  const requestedCount = sourceMode === 'review_missed'
    ? Math.max(1, Math.min(targetTermIds?.length ?? ROUND_SIZE, ROUND_SIZE))
    : ROUND_SIZE
  const targets = selectRoundTargets(terms, seed, roundId, progress, targetTermIds, requestedCount)
  const specs = questionSpecs?.length
    ? questionSpecs
    : specsFromTargets(targets, sourceMode, seed, roundId)

  const questions = specs
    .map((spec, index) => makeQuestionFromSpec(spec, terms, termsById, seed, roundId, index))
    .filter((question): question is GlossaryDojoQuestion => Boolean(question))

  const orderedQuestions = questionSpecs?.length
    ? questions
    : stableShuffle(questions, seed, `${roundId}:question-order`)

  return {
    id: roundId,
    roundId,
    roundNumber,
    createdAt: new Date().toISOString(),
    currentIndex: 0,
    targetTermIds: orderedQuestions.map((question) => question.targetTermId),
    sourceMode,
    repeatCount: sourceMode === 'repeat_round' ? (repeatedFromRound?.repeatCount ?? 0) + 1 : 0,
    repeatedFromRoundId: repeatedFromRound?.id,
    reviewFromRoundId: reviewFromRound?.id,
    questions: orderedQuestions,
    answers: []
  }
}

export function getQuestionSpecsFromRound(round: GlossaryDojoCompletedRound): QuestionSpec[] {
  return round.questions.map((question) => ({
    type: question.type,
    targetTermId: question.targetTermId,
    correctTermId: question.correctTermId
  }))
}

export function getMissedQuestionSpecsFromRound(round: GlossaryDojoCompletedRound): QuestionSpec[] {
  const missedIds = new Set(round.answers.filter((answer) => !answer.isCorrect).map((answer) => answer.questionId))
  return round.questions
    .filter((question) => missedIds.has(question.id))
    .map((question) => ({
      type: question.type === 'stage_location' || question.type === 'relationship' ? 'term_to_definition' : question.type,
      targetTermId: question.targetTermId,
      correctTermId: question.correctTermId
    }))
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
    return `Not quite. That answer belongs to a different glossary idea. The correct match is ${correct.label}. ${correctTermMeaning(correct)}`
  }

  if (question.type === 'term_to_definition') {
    return `Not quite. That definition is for ${selected.label}. ${correctTermMeaning(correct)}`
  }

  if (question.type === 'definition_to_term') {
    return `Not quite. ${selected.label} means ${termExplanation(selected)} The correct match is ${correct.label}. ${correctTermMeaning(correct)}`
  }

  if (question.type === 'confusable_pair' || question.type === 'closest_concept') {
    return `Not quite. ${selected.label} is related, but ${correct.label} is closer here because ${termExplanation(correct)}`
  }

  if (question.type === 'stage_location') {
    return `Not quite. That answer belongs to a different part of the model story. The correct match is ${correct.label}. ${question.explanation}`
  }

  return `Not quite. That answer belongs to a different glossary idea. The correct match is ${correct.label}. ${correctTermMeaning(correct)}`
}
