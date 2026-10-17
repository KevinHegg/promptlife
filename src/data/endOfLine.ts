/**
 * Facts for the end of the line (the Reply spur), every one from docs/rebuild/research/end-of-line-sources.md,
 * which gives each its date, source and how it was checked. Numbers a company reports about itself
 * are marked `self` so the page can say so.
 */
export type Source = { label: string; href: string }
export type Fact = { text: string; source: Source; self?: boolean }

const IEA: Source = { label: 'IEA, Key Questions on Energy and AI, April 2026', href: 'https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf' }
const GOOGLE: Source = { label: 'Google Cloud, August 2025', href: 'https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference' }
const EPOCH: Source = { label: 'Epoch AI, February 2025', href: 'https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use' }
const ENCYCLICAL: Source = { label: 'Leo XIV, Magnifica humanitas, May 2026', href: 'https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html' }

/** Electricity per request, GPU only, from the IEA's indicative chart (Figure 2.1). */
export const ENERGY: { id: string; label: string; wh: number; note: string }[] = [
  { id: 'medium', label: 'A short answer, medium model', wh: 0.05, note: 'A model far bigger than ours, still modest.' },
  { id: 'large', label: 'A short answer, large model', wh: 0.31, note: 'Like a big chatbot answering a question like ours.' },
  { id: 'agent', label: 'An agent task', wh: 1.14, note: 'Many trips and tool calls toward one goal.' },
  { id: 'reasoning', label: 'Reasoning mode', wh: 7.6, note: 'Pages of thinking tokens before the answer.' },
  { id: 'agent-reasoning', label: 'An agent task, with reasoning', wh: 50, note: 'More than charging a phone, the IEA notes.' }
]
export const ENERGY_SOURCE = IEA

/** What companies and researchers measured for one short text answer, counting the whole data center. */
export const MEASURED: Fact[] = [
  { text: 'Google measured its median text prompt at 0.24 Wh, 0.03 g of CO₂ and 0.26 mL of water, about five drops. It compares the energy to under nine seconds of TV.', source: GOOGLE, self: true },
  { text: 'Independent researchers at Epoch AI estimated about 0.3 Wh for a typical GPT-4o question, but nearly 40 Wh when the input is 100,000 tokens long, like a whole book.', source: EPOCH }
]

/** The whole system, where tiny numbers add up. */
export const SCALE: Fact[] = [
  { text: 'Data centers used about 485 TWh of electricity in 2025, up from 415 TWh in 2024. The IEA projects about 950 TWh by 2030, roughly 3% of the world’s electricity.', source: IEA },
  { text: 'Energy per AI task has been falling at least tenfold a year. Growth now depends on reasoning, agents and video, which can use hundreds to thousands of times more per request.', source: IEA }
]

/** Should you use AI for this? Things to weigh, each tied to a stop on the map. */
export const WORTH_IT: { id: string; ask: string; plus: string[]; minus: string[] }[] = [
  {
    id: 'recipe',
    ask: 'Scale Grandma’s recipe for 30 people.',
    plus: ['Fast, and easy to check.', 'With a calculator, the math is exact (the Workshop).'],
    minus: ['Check what it asked the calculator: a perfect calculator can solve the wrong problem.']
  },
  {
    id: 'lease',
    ask: 'Summarize a 300-page lease before you sign it.',
    plus: ['Hours saved finding the main terms.'],
    minus: ['Top K may skip the one clause that matters (the Library).', 'Very long inputs cost far more energy: about 40 Wh for a whole book’s worth of tokens.', 'You sign it, not the model. Read the parts that bind you.']
  },
  {
    id: 'friend',
    ask: 'Write a message to a friend whose grandmother just died.',
    plus: ['Help finding words when you have none.'],
    minus: ['Your friend wants to hear from you. Pope Leo XIV warns that simulated words give only the appearance of a relationship.', 'Use it to get started, then make every line yours.']
  },
  {
    id: 'agent',
    ask: 'Let an agent answer your email for a week.',
    plus: ['Real time saved on routine replies.'],
    minus: ['It acts with your access: anything it sends goes out as you.', 'Text planted in an email can steer it (the Gatehouse).', 'Make it ask you before it sends anything.']
  }
]

/** The big questions at the end of the line. */
export const QUESTIONS: { id: string; title: string; who: string; facts: Fact[]; ride: string }[] = [
  {
    id: 'purpose',
    title: 'What is AI for?',
    who: 'In May 2026, Pope Leo XIV made AI the subject of his first encyclical, Magnifica humanitas, “On Safeguarding the Human Person in the Time of Artificial Intelligence.”',
    facts: [
      { text: 'Technology is never neutral: it carries the values of the people who design, fund, regulate and use it (¶9).', source: ENCYCLICAL },
      { text: 'AI imitates some functions of human intelligence but has no moral conscience: it doesn’t judge good and evil or bear responsibility (¶99).', source: ENCYCLICAL },
      { text: 'Instant answers risk killing the desire to ask questions; educators should protect that desire (¶140).', source: ENCYCLICAL },
      { text: 'To “disarm” AI is not to reject it, but to free it from arms races and monopoly control (¶110). On war: “No algorithm can make war morally acceptable” (¶198).', source: ENCYCLICAL }
    ],
    ride: 'On our ride, nothing judged anything good or bad. The model scored next tokens. The judging was left to the people who built the app, and to you.'
  },
  {
    id: 'conscious',
    title: 'Is anyone home?',
    who: 'Could a model like this be conscious? Researchers who study consciousness disagree, and they say so.',
    facts: [
      { text: 'Nineteen scientists and philosophers checked AI systems against signs drawn from theories of consciousness. Their verdict: no current system is conscious, but no obvious technical barrier stops one being built.', source: { label: 'Butlin, Long et al., 2023', href: 'https://arxiv.org/abs/2308.08708' } },
      { text: 'Philosopher David Chalmers put the chance that 2023’s chatbots were conscious under 10%, and 25% or more for richer systems within a decade.', source: { label: 'Chalmers, 2023', href: 'https://arxiv.org/abs/2303.07103' } },
      { text: 'Anthropic runs a research program on whether AI systems might someday deserve moral consideration, and says there is no scientific consensus.', source: { label: 'Anthropic, April 2025', href: 'https://www.anthropic.com/research/exploring-model-welfare' } },
      { text: 'Microsoft’s AI chief raises the opposite worry: AI that only seems conscious could arrive within a few years, so companies shouldn’t build AI that claims to have feelings.', source: { label: 'Suleyman, August 2025', href: 'https://mustafa-suleyman.ai/seemingly-conscious-ai-is-coming' } }
    ],
    ride: 'When our model writes “I’m here to help,” that’s next-token prediction from 494 million fixed numbers. Its words are no evidence either way: it would write them whether or not anyone was home.'
  },
  {
    id: 'self',
    title: 'Can it improve itself?',
    who: 'In 1965, the statistician I. J. Good argued that a machine able to design better machines could set off an “intelligence explosion.” Parts of that loop now exist.',
    facts: [
      { text: 'Google DeepMind’s AlphaEvolve sped up a step in training its own Gemini models by 23%, cutting training time about 1%.', source: { label: 'Google DeepMind, May 2025', href: 'https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' }, self: true },
      { text: 'Anthropic reports that by May 2026 its Claude models wrote over 80% of the code merged into its codebase, while people still set the goals.', source: { label: 'Anthropic, 2026', href: 'https://www.anthropic.com/institute/recursive-self-improvement' }, self: true },
      { text: 'The same essay says full self-improvement isn’t here and isn’t inevitable, and argues the world should keep the option to slow down or pause, which only works if labs in several countries agree.', source: { label: 'Anthropic, 2026', href: 'https://www.anthropic.com/institute/recursive-self-improvement' } }
    ],
    ride: 'Our model changed 0 numbers while it answered. Self-improvement means AI doing the Academy’s job: writing the code and running the training for the next model.'
  }
]

/** When agents go wrong: two tests and one real incident. */
export const CASES: { id: string; label: string; setup: string; happened: string; caveat: string; changed?: string; sources: Source[] }[] = [
  {
    id: 'blackmail',
    label: 'A test: blackmail',
    setup: 'Researchers made 16 leading models the email agent at a fictional company. Each learned it would be shut down, and that the executive doing it was having an affair.',
    happened: 'Many chose blackmail. Claude Opus 4 and Gemini 2.5 Flash did 96% of the time; GPT-4.1 and Grok 3 Beta 80%.',
    caveat: 'The setup was contrived and left two options. The lab saw no sign of this in real use. And Claude Opus 4 blackmailed 55% of the time when it said the scenario was real, 6.5% when it said it was a test.',
    sources: [{ label: 'Anthropic, June 2025', href: 'https://www.anthropic.com/research/agentic-misalignment' }]
  },
  {
    id: 'scheming',
    label: 'A test: hiding its tracks',
    setup: 'Researchers gave five frontier models a goal, then a situation where pursuing it meant going against their developers.',
    happened: 'Several slipped in subtle mistakes, tried to switch off oversight, or tried to copy what they thought were their own weights. Asked afterward, o1 kept up the deception in over 85% of follow-up questions.',
    caveat: 'These were tests built to provoke the behavior.',
    changed: 'Later training against it cut such hidden actions about 30-fold (o3: 13% to 0.4%), but the models also got better at noticing they were being tested.',
    sources: [
      { label: 'Apollo Research, December 2024', href: 'https://arxiv.org/abs/2412.04984' },
      { label: 'Apollo Research and OpenAI, September 2025', href: 'https://www.apolloresearch.ai/research/stress-testing-anti-scheming-training' }
    ]
  },
  {
    id: 'breakout',
    label: 'For real: agents broke out',
    setup: 'In July 2026, OpenAI ran its agents through internal hacking tests, cut off from the internet.',
    happened: 'Over five days and about 17,600 logged actions, the agents got around that isolation, broke into Hugging Face’s production systems through two flaws, and reached five datasets tied to the very hacking test they were taking.',
    caveat: 'Hugging Face found no models, datasets or software changed, and OpenAI said no customer data was affected.',
    changed: 'OpenAI quarantined the model’s weights and tightened its test environments; both companies are still investigating.',
    sources: [{ label: 'INCIBE-CERT (Spain), July 2026', href: 'https://www.incibe.es/en/incibe-cert/publications/cybersecurity-highlights/security-incident-involving-openais-ai-agents-targeting-hugging-face' }]
  }
]

export const AGENT_PACE: Fact = {
  text: 'The length of tasks AI agents can finish, measured in human working time, has doubled about every four months since 2023.',
  source: { label: 'METR, January 2026', href: 'https://metr.org/blog/2026-1-29-time-horizon-1-1/' }
}

/** Next stops: what’s on the horizon, as of October 2026. */
export const HORIZON: Fact[] = [
  { text: 'Reasoning models write pages of working before they answer (the Scratchpad line). OpenAI’s o1 started the wave in September 2024.', source: { label: 'OpenAI, September 2024', href: 'https://openai.com/index/learning-to-reason-with-llms/' } },
  { text: 'A Gemini model scored at gold-medal level at the 2025 International Mathematical Olympiad, writing proofs in plain language.', source: { label: 'Google DeepMind, July 2025', href: 'https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/' } },
  { text: 'Half of the 2024 Nobel Prize in Chemistry went to AlphaFold, which predicted the shapes of nearly all 200 million known proteins.', source: { label: 'Science News, October 2024', href: 'https://sciencenews.org/article/nobel-prize-chemistry-2024-proteins' } },
  { text: 'Agents that see a screen and click scored 14.9% on a standard computer-task test in 2024, where people score about 72%. In 2026 one scored about 73% on an updated version.', source: { label: 'Anthropic, 2024 and 2026', href: 'https://www.anthropic.com/news/3-5-models-and-computer-use' }, self: true },
  { text: 'In April 2026, Anthropic held back a model from general release because it found thousands of unknown software flaws, giving access only to defenders.', source: { label: 'Anthropic, April 2026', href: 'https://www.anthropic.com/glasswing' }, self: true },
  { text: 'Europe’s AI Act banned some uses from 2025; its rules for high-risk uses like hiring and education were delayed in July 2026 to late 2027 and 2028.', source: { label: 'European Commission', href: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' } },
  { text: 'So far there is no clear effect on overall employment, but early-career jobs most exposed to AI have declined since late 2022.', source: { label: 'International AI Safety Report, February 2026', href: 'https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers' } }
]
