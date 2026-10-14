export const CHOICE_ORDER_SEED_KEY = 'promptlife:v1:choiceOrderSeed'

const FALLBACK_CHOICE_ORDER_SEED = 'promptlife:choice-order:fallback'

export type NormalizedChoice = {
  id: string
  label: string
  isCorrect: boolean
  feedback?: string
}

type QuizChoiceInput = string | {
  choiceId?: string
  id?: string
  text?: string
  label?: string
}

function getChoiceLabel(choice: QuizChoiceInput) {
  return typeof choice === 'string'
    ? choice
    : choice.text ?? choice.label ?? ''
}

function getChoiceId(questionId: string, choice: QuizChoiceInput, index: number, label: string) {
  if (typeof choice !== 'string') return choice.choiceId ?? choice.id ?? `${questionId}:${hashString(`${index}:${label}`).toString(36)}`
  return `${questionId}:${hashString(`${index}:${label}`).toString(36)}`
}

function makeSeed() {
  return `choice-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function getBrowserStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

export function getChoiceOrderSeed(storage = getBrowserStorage()) {
  if (!storage) return FALLBACK_CHOICE_ORDER_SEED

  try {
    const existing = storage.getItem(CHOICE_ORDER_SEED_KEY)
    if (existing) return existing

    const seed = makeSeed()
    storage.setItem(CHOICE_ORDER_SEED_KEY, seed)
    return seed
  } catch {
    return FALLBACK_CHOICE_ORDER_SEED
  }
}

export function hashString(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededRandom(seed: string, questionId: string) {
  let state = hashString(`${seed}:${questionId}`) || 0x6d2b79f5

  return () => {
    state += 0x6d2b79f5
    let next = state
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffleChoicesForQuestion<T>(questionId: string, choices: T[], seed: string) {
  const shuffled = [...choices]
  const random = seededRandom(seed, questionId)

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

export function buildQuizChoices(
  questionId: string,
  quiz: { choices: readonly QuizChoiceInput[], answer: string, correctChoiceId?: string, feedback?: Readonly<Record<string, string>> },
  seed: string
): NormalizedChoice[] {
  const choices = quiz.choices.map((choice, index) => {
    const label = getChoiceLabel(choice)
    const id = getChoiceId(questionId, choice, index, label)
    return {
      id,
      label,
      isCorrect: quiz.correctChoiceId ? id === quiz.correctChoiceId : label === quiz.answer,
      feedback: quiz.feedback?.[id] ?? quiz.feedback?.[label]
    }
  })

  return shuffleChoicesForQuestion(questionId, choices, seed)
}
