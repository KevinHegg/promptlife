import {
  glossaryDojoConceptClusters,
  glossaryDojoMeta,
  type GlossaryDojoTermMeta
} from '../../data/glossaryDojoMeta'
import { hashString, shuffleChoicesForQuestion } from '../../utils/choiceOrder'
import { fingerprintTargetTermIds, isNormalSourceMode, modeFromSourceMode } from './rounds'
import type {
  GlossaryDojoAnswerResult,
  GlossaryDojoCompletedRound,
  GlossaryDojoDistractorDistance,
  GlossaryDojoDistractorSource,
  GlossaryDojoOption,
  GlossaryDojoOptionKind,
  GlossaryDojoProgress,
  GlossaryDojoQuestion,
  GlossaryDojoQuestionType,
  GlossaryDojoRound,
  GlossaryDojoTerm,
  GlossarySourceTerm
} from './types'

export const GLOSSARY_DOJO_ROUND_SIZE = 12
const ROUND_SIZE = GLOSSARY_DOJO_ROUND_SIZE
const OPTION_COUNT = 4
const ROUND_FINGERPRINT_RETRY_LIMIT = 20
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
  'term_to_definition',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term',
  'definition_to_term'
]

const TYPE_LABELS: Record<GlossaryDojoQuestionType, string> = {
  term_to_definition: 'TERM TO DESCRIPTION',
  definition_to_term: 'DESCRIPTION TO TERM',
  closest_concept: 'RELATED IDEAS',
  confusable_pair: 'Easy mix-up',
  relationship: 'RELATIONSHIP',
  stage_location: 'WHERE IT FITS'
}

const HELPER_TEXT: Record<GlossaryDojoQuestionType, string> = {
  term_to_definition: 'Choose the best description.',
  definition_to_term: 'Choose the matching term.',
  closest_concept: 'Choose the closest related term.',
  confusable_pair: 'Choose the closest related term.',
  relationship: 'Choose the best relationship.',
  stage_location: 'Choose the best location.'
}

const retiredPhrase = (...parts: string[]) => parts.join('')
const retiredNeighborhood = retiredPhrase('neigh', 'borhood')
const RETIRED_DOJO_COPY_PATTERNS = [
  retiredPhrase('learning ', retiredNeighborhood),
  retiredNeighborhood,
  retiredPhrase('neighbor ', 'of'),
  retiredPhrase('same learning ', retiredNeighborhood),
  retiredPhrase('map ', 'the term'),
  retiredPhrase('nearby ideas ', 'as interchangeable'),
  retiredPhrase('term ', 'to meaning'),
  retiredPhrase('meaning ', 'to term'),
  retiredPhrase('what ', 'does'),
  retiredPhrase('choose the best ', 'definition')
]

const warnedUnsafeQuestionCopy = new Set<string>()

type QuestionSpec = {
  type: GlossaryDojoQuestionType
  targetTermId: string
  correctTermId?: string
}

type DistractorChoice = {
  term: GlossaryDojoTerm
  source: GlossaryDojoDistractorSource
  distance: GlossaryDojoDistractorDistance
  learningPathDistance: number
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

function lowerInitial(value: string) {
  if (!value) return value
  if (/^A\s/.test(value)) return `a${value.slice(1)}`
  if (/^An\s/.test(value)) return `an${value.slice(2)}`
  if (/^The\s/.test(value)) return `the${value.slice(3)}`
  if (!/^[A-Z][a-z]/.test(value)) return value
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function descriptionBody(term: GlossaryDojoTerm) {
  const text = cleanText(term.shortDefinition || termExplanation(term))
  const names = [term.label, ...term.aliases]
    .map(cleanText)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)

  for (const name of names) {
    const pattern = new RegExp(`^(?:an?\\s+|the\\s+)?${escapeRegExp(name)}\\s+(?:is|means|refers to)\\s+`, 'i')
    if (pattern.test(text)) return lowerInitial(cleanText(text.replace(pattern, '')))
  }

  return lowerInitial(text)
}

function correctTermDescription(term: GlossaryDojoTerm) {
  return `${term.label} is ${descriptionBody(term)}`
}

function containsRetiredDojoCopy(value = '') {
  const lowered = lookupKey(value)
  return RETIRED_DOJO_COPY_PATTERNS.some((pattern) => lowered.includes(pattern))
}

function shouldWarnUnsafeQuestionCopy() {
  if (import.meta.env.DEV) return true
  if (typeof window === 'undefined') return false
  return window.location.search.includes('debug=1') || window.location.pathname.startsWith('/review')
}

function warnUnsafeQuestionCopy(questionId: string, type: GlossaryDojoQuestionType, field: string, value: string) {
  if (!shouldWarnUnsafeQuestionCopy()) return
  const warningKey = `${questionId}:${type}:${field}:${value}`
  if (warnedUnsafeQuestionCopy.has(warningKey)) return
  warnedUnsafeQuestionCopy.add(warningKey)
  console.warn('[Glossary Dojo] Replaced retired learner-facing question copy.', {
    questionId,
    type,
    field
  })
}

function fallbackPromptForType(type: GlossaryDojoQuestionType, targetLabel: string, correctLabel?: string) {
  if (type === 'term_to_definition') return `What is ${targetLabel}?`
  if (type === 'definition_to_term') return 'Which term matches this description?'
  if (type === 'relationship') return `How are ${targetLabel} and ${correctLabel ?? 'this idea'} related?`
  if (type === 'stage_location') return `Where does ${targetLabel} fit in the model story?`
  return `Which idea is closest to ${targetLabel}?`
}

function fallbackHelperForType(type: GlossaryDojoQuestionType) {
  return HELPER_TEXT[type]
}

export function getSafeGlossaryDojoQuestionCopy({
  type,
  targetLabel,
  correctLabel,
  questionId,
  typeLabel,
  prompt,
  helperText
}: {
  type: GlossaryDojoQuestionType
  targetLabel: string
  correctLabel?: string
  questionId?: string
  typeLabel: string
  prompt: string
  helperText: string
}) {
  const safeQuestionId = questionId ?? `${type}:${targetLabel}`
  const typeLabelUnsafe = containsRetiredDojoCopy(typeLabel)
  const promptUnsafe = containsRetiredDojoCopy(prompt)
  const helperUnsafe = containsRetiredDojoCopy(helperText)

  if (typeLabelUnsafe) warnUnsafeQuestionCopy(safeQuestionId, type, 'typeLabel', typeLabel)
  if (promptUnsafe) warnUnsafeQuestionCopy(safeQuestionId, type, 'prompt', prompt)
  if (helperUnsafe) warnUnsafeQuestionCopy(safeQuestionId, type, 'helperText', helperText)

  return {
    typeLabel: typeLabelUnsafe ? TYPE_LABELS[type] : typeLabel,
    prompt: promptUnsafe ? fallbackPromptForType(type, targetLabel, correctLabel) : prompt,
    helperText: helperUnsafe ? fallbackHelperForType(type) : helperText
  }
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

function termNameKeys(term: GlossaryDojoTerm) {
  return [term.label, term.id, ...term.aliases]
    .map(lookupKey)
    .filter((name) => name.length > 2)
}

function textRevealsTerm(text: string, term: GlossaryDojoTerm) {
  const cleaned = ` ${lookupKey(text)} `
  return termNameKeys(term).some((name) => {
    const escaped = escapeRegExp(name)
    return new RegExp(`(^|[^a-z0-9-])${escaped}([^a-z0-9-]|$)`, 'i').test(cleaned)
  })
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
  if (definitionKey(candidate) === definitionKey(correct)) return false
  if (textRevealsTerm(candidate.shortDefinition, correct)) return false
  return true
}

function distractorDistance(
  target: GlossaryDojoTerm,
  candidate: GlossaryDojoTerm
): { category: GlossaryDojoDistractorDistance, distance: number } {
  const distance = Math.abs(candidate.learningPathIndex - target.learningPathIndex)
  if (distance >= 2 && distance <= 5) return { category: 'near', distance }
  if (distance >= 6 && distance <= 12) return { category: 'medium', distance }
  return { category: 'far', distance }
}

function addDistractor(
  picked: DistractorChoice[],
  candidate: GlossaryDojoTerm | null | undefined,
  target: GlossaryDojoTerm,
  source: GlossaryDojoDistractorSource
) {
  if (!candidate) return false
  if (picked.some((item) => item.term.id === candidate.id)) return false
  const distance = distractorDistance(target, candidate)
  picked.push({
    term: candidate,
    source,
    distance: distance.category,
    learningPathDistance: distance.distance
  })
  return true
}

function clusterIdsForTerm(term: GlossaryDojoTerm) {
  const explicitClusters = term.conceptClusters ?? []
  const inferredClusters = Object.entries(glossaryDojoConceptClusters)
    .filter(([, ids]) => ids.includes(term.id))
    .map(([cluster]) => cluster)
  const clusters = [...new Set([...explicitClusters, ...inferredClusters])]
  return [...new Set(clusters.flatMap((cluster) => glossaryDojoConceptClusters[cluster] ?? []))]
    .filter((id) => id !== term.id)
}

function shuffledEligibleByIds(
  ids: string[],
  eligible: GlossaryDojoTerm[],
  termsById: Map<string, GlossaryDojoTerm>,
  seed: string,
  questionId: string
) {
  const eligibleIds = new Set(eligible.map((term) => term.id))
  return stableShuffle(
    ids
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term && eligibleIds.has(term.id))),
    seed,
    questionId
  )
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
  const confusable = shuffledEligibleByIds(
    [...(target.confusableWith ?? []), ...preferredIds],
    eligible,
    termsById,
    seed,
    `${questionId}:confusable`
  )
  const related = shuffledEligibleByIds(
    [...(target.relationships ?? []), ...target.relatedTermIds],
    eligible,
    termsById,
    seed,
    `${questionId}:related`
  )
  const cluster = shuffledEligibleByIds(
    clusterIdsForTerm(target),
    eligible,
    termsById,
    seed,
    `${questionId}:cluster`
  )
  const byDistance = (slot: GlossaryDojoDistractorDistance) => eligible.filter((term) => {
    if (term.id === target.id || term.id === correct.id) return false
    if (!allowSameStage && slot !== 'far' && stageLabel(term) === stageLabel(target)) return false
    return distractorDistance(target, term).category === slot
  })
  const sameStage = allowSameStage
    ? stableShuffle(
        eligible.filter((term) =>
          stageLabel(term) === stageLabel(target) &&
          term.id !== target.id &&
          term.id !== correct.id
        ),
        seed,
        `${questionId}:same-stage`
      )
    : []

  const picked: DistractorChoice[] = []
  const addFromPool = (pool: GlossaryDojoTerm[], source: GlossaryDojoDistractorSource) => {
    pool.forEach((term) => {
      if (picked.length >= OPTION_COUNT - 1) return
      addDistractor(picked, term, target, source)
    })
  }

  addFromPool(confusable, 'confusable')
  addFromPool(related, 'related')
  addFromPool(cluster, 'cluster')
  addFromPool(sameStage, 'same-stage')
  addFromPool(stableShuffle(byDistance('near'), seed, `${questionId}:near`), 'near')
  addFromPool(stableShuffle(byDistance('medium'), seed, `${questionId}:medium`), 'medium')
  addFromPool(stableShuffle(byDistance('far'), seed, `${questionId}:far`), 'far')

  const global = stableShuffle(eligible, seed, `${questionId}:global-fill`)
  addFromPool(global, 'global')

  return picked.slice(0, OPTION_COUNT - 1)
}

function makeOption(
  questionId: string,
  term: GlossaryDojoTerm,
  correct: GlossaryDojoTerm,
  kind: GlossaryDojoOptionKind,
  label: string,
  detail?: string,
  distractor?: Omit<DistractorChoice, 'term'>
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
    feedbackTermId: term.id,
    distractorSource: distractor?.source,
    distractorDistance: distractor?.distance,
    learningPathDistance: distractor?.learningPathDistance
  }
}

function makeTermOptions(
  questionId: string,
  correct: GlossaryDojoTerm,
  distractors: DistractorChoice[],
  seed: string
) {
  const rawOptions = [
    makeOption(questionId, correct, correct, 'term', correct.label),
    ...distractors
      .slice(0, OPTION_COUNT - 1)
      .map((distractor) => makeOption(questionId, distractor.term, correct, 'term', distractor.term.label, undefined, distractor))
  ]

  return stableShuffle(rawOptions, seed, questionId)
}

function makeDefinitionOptions(
  questionId: string,
  correct: GlossaryDojoTerm,
  distractors: DistractorChoice[],
  seed: string
) {
  const rawOptions = [
    makeOption(questionId, correct, correct, 'definition', correct.shortDefinition),
    ...distractors
      .slice(0, OPTION_COUNT - 1)
      .map((distractor) => makeOption(questionId, distractor.term, correct, 'definition', distractor.term.shortDefinition, undefined, distractor))
  ]

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
  distractors: DistractorChoice[],
  seed: string
) {
  const rawOptions = [
    makeOption(questionId, correct, correct, 'statement', relationshipStatement(target, correct)),
    ...distractors
      .slice(0, OPTION_COUNT - 1)
      .map((distractor) => makeOption(
        questionId,
        distractor.term,
        correct,
        'statement',
        relationshipStatement(target, distractor.term),
        undefined,
        distractor
      ))
  ]

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
    term_to_definition: `What is ${target.label}?`,
    definition_to_term: 'Which term matches this description?',
    closest_concept: `Which idea is closest to ${target.label}?`,
    confusable_pair: `Which term is easiest to confuse with ${target.label}?`,
    relationship: `How are ${target.label} and ${correct.label} related?`,
    stage_location: `Where does ${target.label} fit in the model story?`
  }

  const explanations: Record<GlossaryDojoQuestionType, string> = {
    term_to_definition: correctTermDescription(target),
    definition_to_term: correctTermDescription(target),
    closest_concept: `${correct.label} is closest here because ${termExplanation(correct)}`,
    confusable_pair: `${target.label} is often mixed up with ${correct.label}; the contrast matters.`,
    relationship: `${target.label} connects to ${correct.label}: ${termExplanation(correct)}`,
    stage_location: `${target.label} fits in ${stageLabel(target)}.`
  }

  const safeCopy = getSafeGlossaryDojoQuestionCopy({
    type,
    targetLabel: target.label,
    correctLabel: correct.label,
    questionId,
    typeLabel: TYPE_LABELS[type],
    prompt: prompts[type],
    helperText: HELPER_TEXT[type]
  })

  return {
    id: questionId,
    type,
    typeLabel: safeCopy.typeLabel,
    prompt: safeCopy.prompt,
    helperText: safeCopy.helperText,
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

function normalRoundFingerprintList(progress?: GlossaryDojoProgress | null) {
  return [
    ...(progress?.normalRoundFingerprints ?? []),
    ...(progress?.roundHistory ?? [])
      .filter((round) => round.mode === 'normal' || round.sourceMode === 'new_round')
      .map((round) => round.targetFingerprint),
    ...(progress?.perRound ?? [])
      .filter((round) => round.mode === 'normal' || round.sourceMode === 'new_round')
      .map((round) => round.targetFingerprint),
    progress?.lastCompletedRound?.sourceMode === 'new_round' ? progress.lastCompletedRound.targetFingerprint : '',
    progress?.currentRound?.sourceMode === 'new_round' ? progress.currentRound.targetFingerprint : ''
  ].filter(Boolean)
}

function normalRoundFingerprintSet(progress?: GlossaryDojoProgress | null) {
  return new Set(normalRoundFingerprintList(progress))
}

function replaceForFreshFingerprint(
  picked: GlossaryDojoTerm[],
  terms: GlossaryDojoTerm[],
  avoidedFingerprints: Set<string>
) {
  const pickedIds = new Set(picked.map((term) => term.id))
  const replacements = terms.filter((term) => !pickedIds.has(term.id))

  for (let replaceIndex = picked.length - 1; replaceIndex >= 0; replaceIndex -= 1) {
    for (const replacement of replacements) {
      const next = [...picked]
      next[replaceIndex] = replacement
      const fingerprint = fingerprintTargetTermIds(next.map((term) => term.id))
      if (!avoidedFingerprints.has(fingerprint)) return next
    }
  }

  return picked
}

function pickRoundTargets(
  terms: GlossaryDojoTerm[],
  seed: string,
  roundId: string,
  progress?: GlossaryDojoProgress | null,
  count = ROUND_SIZE
) {
  const sorted = [...terms].sort((a, b) => a.learningPathIndex - b.learningPathIndex)
  const firstUnpracticedIndex = sorted.findIndex((term) => practicedCount(progress, term.id) === 0)
  const frontierStart = Math.max(0, firstUnpracticedIndex === -1 ? 0 : firstUnpracticedIndex - 2)
  const frontier = sorted.slice(frontierStart, frontierStart + Math.max(count * 3, 30))
  const recentMissedIds = progress?.recentMistakes?.map((mistake) => mistake.termId) ?? []
  const termsById = makeTermsById(terms)
  const recentMissed = uniqueTerms(
    [
      ...recentMissedIds,
      ...sorted
        .filter((term) => progress?.terms?.[term.id]?.needsReview)
        .map((term) => term.id)
    ]
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term))
  )
  const practicedNotMastered = sorted.filter((term) => {
    const termProgress = progress?.terms?.[term.id]
    return Boolean(termProgress && termProgress.practiced > 0 && !termProgress.mastered)
  })
  const earlierReview = practicedNotMastered.filter((term) =>
    firstUnpracticedIndex === -1 || term.learningPathIndex < firstUnpracticedIndex
  )
  const unpracticedFrontier = frontier.filter((term) => practicedCount(progress, term.id) === 0)
  const unpracticed = sorted.filter((term) => practicedCount(progress, term.id) === 0)
  const nextUnpracticed = unpracticed.slice(0, Math.max(count * 3, 36))
  const masteredMaintenance = sorted.filter((term) => progress?.terms?.[term.id]?.mastered)
  const picked: GlossaryDojoTerm[] = []
  const hasReviewTerms = Boolean(recentMissed.length || earlierReview.length || practicedNotMastered.length)
  const frontierLimit = Math.min(hasReviewTerms ? 8 : 10, count)

  addUnique(picked, stableShuffle(unpracticedFrontier, seed, `${roundId}:frontier`), frontierLimit)
  addUnique(picked, stableShuffle(earlierReview, seed, `${roundId}:earlier-review`), Math.min(frontierLimit + 2, count))
  addUnique(picked, stableShuffle(recentMissed, seed, `${roundId}:missed`), Math.min(frontierLimit + 4, count))
  addUnique(picked, stableShuffle(practicedNotMastered, seed, `${roundId}:not-mastered`), count)
  addUnique(picked, stableShuffle(nextUnpracticed, seed, `${roundId}:next-unpracticed`), count)
  addUnique(picked, stableShuffle(unpracticed, seed, `${roundId}:unpracticed`), count)
  addUnique(picked, stableShuffle(masteredMaintenance, seed, `${roundId}:mastered`), count)
  addUnique(picked, stableShuffle(sorted, seed, `${roundId}:all`), count)

  return picked.slice(0, count)
}

function selectRoundTargets(
  terms: GlossaryDojoTerm[],
  seed: string,
  roundId: string,
  progress?: GlossaryDojoProgress | null,
  explicitTargetTermIds?: string[],
  count = ROUND_SIZE,
  sourceMode: GlossaryDojoRound['sourceMode'] = 'new_round'
) {
  const termsById = makeTermsById(terms)
  if (explicitTargetTermIds?.length) {
    return explicitTargetTermIds
      .map((id) => findTerm(termsById, id))
      .filter((term): term is GlossaryDojoTerm => Boolean(term))
      .slice(0, count)
  }

  if (!isNormalSourceMode(sourceMode)) {
    return pickRoundTargets(terms, seed, roundId, progress, count)
  }

  const avoidedFingerprints = normalRoundFingerprintSet(progress)
  let best = pickRoundTargets(terms, seed, roundId, progress, count)
  let bestFingerprint = fingerprintTargetTermIds(best.map((term) => term.id))
  if (!avoidedFingerprints.has(bestFingerprint)) return best

  for (let attempt = 1; attempt <= ROUND_FINGERPRINT_RETRY_LIMIT; attempt += 1) {
    const attemptSeed = `${seed}:round-attempt:${attempt}`
    const attemptTargets = pickRoundTargets(terms, attemptSeed, `${roundId}:attempt:${attempt}`, progress, count)
    const attemptFingerprint = fingerprintTargetTermIds(attemptTargets.map((term) => term.id))
    if (!avoidedFingerprints.has(attemptFingerprint)) return attemptTargets
    best = attemptTargets
    bestFingerprint = attemptFingerprint
  }

  return avoidedFingerprints.has(bestFingerprint)
    ? replaceForFreshFingerprint(best, terms, avoidedFingerprints).slice(0, count)
    : best
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
  const targets = selectRoundTargets(terms, seed, roundId, progress, targetTermIds, requestedCount, sourceMode)
  const specs = questionSpecs?.length
    ? questionSpecs
    : specsFromTargets(targets, sourceMode, seed, roundId)

  const questions = specs
    .map((spec, index) => makeQuestionFromSpec(spec, terms, termsById, seed, roundId, index))
    .filter((question): question is GlossaryDojoQuestion => Boolean(question))

  const orderedQuestions = questionSpecs?.length
    ? questions
    : stableShuffle(questions, seed, `${roundId}:question-order`)
  const targetIds = orderedQuestions.map((question) => question.targetTermId)
  const targetFingerprint = fingerprintTargetTermIds(targetIds)
  const startedAt = new Date().toISOString()
  const repeatedFromRoundId = repeatedFromRound?.id
  const reviewFromRoundId = reviewFromRound?.id

  return {
    id: roundId,
    roundId,
    roundNumber,
    createdAt: startedAt,
    startedAt,
    currentIndex: 0,
    targetTermIds: targetIds,
    targetFingerprint,
    sourceMode,
    mode: modeFromSourceMode(sourceMode),
    sourceRoundId: sourceMode === 'repeat_round'
      ? repeatedFromRoundId
      : sourceMode === 'review_missed'
        ? reviewFromRoundId
        : undefined,
    repeatCount: sourceMode === 'repeat_round' ? (repeatedFromRound?.repeatCount ?? 0) + 1 : 0,
    repeatedFromRoundId,
    reviewFromRoundId,
    questions: orderedQuestions,
    answers: []
  }
}

export function buildGlossaryDojoDebugReport(
  terms: GlossaryDojoTerm[],
  progress: GlossaryDojoProgress,
  round: GlossaryDojoRound | null = progress.currentRound
) {
  const normalFingerprints = normalRoundFingerprintList(progress)
  const currentFingerprint = round?.targetFingerprint ?? ''
  const currentDuplicate = Boolean(
    currentFingerprint &&
    round?.sourceMode === 'new_round' &&
    normalFingerprints.filter((fingerprint) => fingerprint === currentFingerprint).length > 1
  )
  const sampleQuestion = round?.questions.find((question) =>
    question.options.some((option) => !option.isCorrect && option.learningPathDistance !== undefined)
  )

  return {
    glossaryTermCount: terms.length,
    availableTermCount: terms.length,
    roundSize: ROUND_SIZE,
    approximateUniqueFullRounds: Math.floor(terms.length / ROUND_SIZE),
    lastFiveNormalRoundFingerprints: normalFingerprints.slice(-5),
    currentRoundIsDuplicate: currentDuplicate,
    sampleDistractors: sampleQuestion
      ? sampleQuestion.options
          .filter((option) => !option.isCorrect)
          .map((option) => ({
            optionId: option.id,
            representedTermId: option.representedTermId,
            distractorSource: option.distractorSource,
            distractorDistance: option.distractorDistance,
            learningPathDistance: option.learningPathDistance
          }))
      : []
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
    return `Insight strengthened. ${correctTermDescription(correct)}`
  }

  if (!selected) {
    return `Not quite. That answer belongs to a different glossary idea. The correct match is ${correct.label}. ${correctTermDescription(correct)}`
  }

  if (question.type === 'term_to_definition') {
    return `Not quite. That description is for ${selected.label}. ${correctTermDescription(correct)}`
  }

  if (question.type === 'definition_to_term') {
    return `Not quite. ${correctTermDescription(selected)} The correct match is ${correct.label}. ${correctTermDescription(correct)}`
  }

  if (question.type === 'confusable_pair' || question.type === 'closest_concept') {
    return `Not quite. ${selected.label} is related, but ${correct.label} is closer here because ${termExplanation(correct)}`
  }

  if (question.type === 'stage_location') {
    return `Not quite. That answer belongs to a different part of the model story. The correct match is ${correct.label}. ${question.explanation}`
  }

  return `Not quite. That answer belongs to a different glossary idea. The correct match is ${correct.label}. ${correctTermDescription(correct)}`
}
