/**
 * The hero run: one question about Grandma's recipe card, the passages the app fetches,
 * the model's calculator call, the result, and the reply. The recorded trace (scripts/trace)
 * supplies the real version; these o200k_base splits are the fallback and the frontier-tokenizer view.
 */
import { trace } from './trace'

export type Src = 'special' | 'sys' | 'rag' | 'user' | 'tool' | 'res' | 'rep'

export type Scenario = {
  system: string
  passages: string[]
  user: string
  toolExpression: string
  toolResult: string
  reply: string
}

const FALLBACK: Scenario = {
  system: 'You are a helpful assistant.',
  passages: [
    "Recipe card: Grandma's buttermilk biscuits. Serves 8. 2 1/4 cups flour, 1 tablespoon baking powder, 1/2 teaspoon salt, 6 tablespoons butter, 1 cup buttermilk.",
    'Back of the card: Two biscuits per person. Bake at 425°F for 12 minutes.'
  ],
  user: "Using my grandmother's recipe card, how much flour do I need to feed 30 people?",
  toolExpression: '2.25 * 30 / 8',
  toolResult: '8.4375',
  reply: 'You need about 8.4 cups of flour to feed 30 people.'
}

/** The recorded scenario when a trace exists (its reply may be the model's own wording). */
export const SCENARIO: Scenario = (trace as unknown as { scenario?: Scenario } | null)?.scenario ?? FALLBACK

/** How the calculator step reads in plain arithmetic. */
export const TOOL_IN_WORDS = '2¼ cups × 30 people ÷ 8 servings'

export type RunTokens = Record<Exclude<Src, 'special'>, string[]>

/** o200k_base splits of the fallback run. */
export const HERO_TOKENS: RunTokens = {
  sys: ['You', ' are', ' a', ' helpful', ' assistant', '.'],
  rag: [
    'Recipe', ' card', ':', ' Grandma', "'s", ' but', 'term', 'ilk', ' biscuits', '.', ' Serv', 'es', ' ', '8', '.', ' ', '2', ' ', '1', '/', '4', ' cups', ' flour', ',', ' ', '1', ' tablespoon', ' baking', ' powder', ',', ' ', '1', '/', '2', ' teaspoon', ' salt', ',', ' ', '6', ' tablespoons', ' butter', ',', ' ', '1', ' cup', ' but', 'term', 'ilk', '.',
    'Back', ' of', ' the', ' card', ':', ' Two', ' biscuits', ' per', ' person', '.', ' Bake', ' at', ' ', '425', '°F', ' for', ' ', '12', ' minutes', '.'
  ],
  user: ['Using', ' my', ' grandmother', "'s", ' recipe', ' card', ',', ' how', ' much', ' flour', ' do', ' I', ' need', ' to', ' feed', ' ', '30', ' people', '?'],
  tool: ['calculator', '("', '2', '.', '25', ' *', ' ', '30', ' /', ' ', '8', '")'],
  res: ['8', '.', '437', '5'],
  rep: ['You', ' need', ' about', ' ', '8', '.', '4', ' cups', ' of', ' flour', ' to', ' feed', ' ', '30', ' people', '.']
}

/** o200k_base IDs for the question, in order. */
export const USER_IDS = [24849, 922, 57468, 885, 14420, 4766, 11, 1495, 2009, 28420, 621, 357, 1309, 316, 7685, 220, 1130, 1665, 30]
