/**
 * The hero run: one student question, the passages the app retrieves, the model's tool call,
 * the tool result, and the reply. Token splits come from the o200k_base tokenizer.
 * The trace pipeline (scripts/trace) will replace these with a recorded run of a small open model.
 */
export type Src = 'special' | 'sys' | 'rag' | 'user' | 'tool' | 'res' | 'rep'

export const SCENARIO = {
  system: 'You are a helpful study assistant.',
  passages: [
    'Syllabus: The final exam is 40% of your course grade. An A- starts at 90%.',
    'Gradebook: Your coursework average is 87.5% (60% of the grade).'
  ],
  user: 'Using my syllabus, what do I need on the final to get an A-?',
  toolExpression: '(90 - 0.6 * 87.5) / 0.4',
  toolResult: '93.75',
  reply: 'You need at least 93.75% on the final to get an A-.'
}

export type RunTokens = Record<Exclude<Src, 'special'>, string[]>

export const HERO_TOKENS: RunTokens = {
  sys: ['You', ' are', ' a', ' helpful', ' study', ' assistant', '.'],
  rag: [
    'S', 'yllabus', ':', ' The', ' final', ' exam', ' is', ' ', '40', '%', ' of', ' your', ' course', ' grade', '.', ' An', ' A', '-', ' starts', ' at', ' ', '90', '%.',
    'Grade', 'book', ':', ' Your', ' coursework', ' average', ' is', ' ', '87', '.', '5', '%', ' (', '60', '%', ' of', ' the', ' grade', ').'
  ],
  user: ['Using', ' my', ' syllabus', ',', ' what', ' do', ' I', ' need', ' on', ' the', ' final', ' to', ' get', ' an', ' A', '-', '?'],
  tool: ['calculator', '("(', '90', ' -', ' ', '0', '.', '6', ' *', ' ', '87', '.', '5', ')', ' /', ' ', '0', '.', '4', '")'],
  res: ['93', '.', '75'],
  rep: ['You', ' need', ' at', ' least', ' ', '93', '.', '75', '%', ' on', ' the', ' final', ' to', ' get', ' an', ' A', '-.']
}

/** o200k_base IDs for the student's question, in order. */
export const USER_IDS = [24849, 922, 127031, 11, 1412, 621, 357, 1309, 402, 290, 1721, 316, 717, 448, 355, 12, 30]
