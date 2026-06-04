export const canonicalPromptResponse = {
  userPrompt: 'Give me one sentence with two household pets in conflict.',
  generatedResponse: 'A jealous dog chased a startled cat across the kitchen floor.',
  responseSoFar: 'A jealous dog chased a startled cat across the kitchen',
  chosenNextToken: 'floor',
  nextContextResponse: 'A jealous dog chased a startled cat across the kitchen floor.',
  responseTokens: ['A', 'jealous', 'dog', 'chased', 'a', 'startled', 'cat', 'across', 'the', 'kitchen', 'floor', '.'],
  responseSoFarTokens: ['A', 'jealous', 'dog', 'chased', 'a', 'startled', 'cat', 'across', 'the', 'kitchen'],
  nextTokenCandidates: ['floor', 'room', 'tiles', 'counter', 'quantum', 'elephant'],
  plausibleNextTokens: ['floor', 'room', 'tiles'],
  unlikelyNextTokens: ['quantum', 'elephant'],
  tokenIds: [
    { token: 'dog', id: '421' },
    { token: 'cat', id: '982' },
    { token: 'floor', id: '1576' }
  ],
  promptContextLabel: 'User prompt + response so far + floor'
} as const

export const attentionExample = {
  sentence: 'A jealous dog chased a startled cat because it hissed.',
  tokens: ['A', 'jealous', 'dog', 'chased', 'a', 'startled', 'cat', 'because', 'it', 'hissed'],
  target: 'it',
  referent: 'cat'
} as const
