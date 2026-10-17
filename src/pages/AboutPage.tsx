import { academyRuns } from '../data/academy'
import { thinkRuns } from '../data/scratchpad'
import { gatehouse, gatehouseBig } from '../data/gatehouse'
import { library } from '../data/library'
import { phase1 } from '../data/phase1'
import { phase2 } from '../data/phase2'
import { runCounts } from '../data/run'
import { trace } from '../data/trace'

/** How many real model runs the lessons replay, counted from the recordings themselves. */
function recordedRuns() {
  return (
    1 +
    phase1.temperatureRuns.length +
    (phase2?.breaks.length ?? 0) +
    (library?.runs.length ?? 0) +
    (gatehouse?.heist.runs.length ?? 0) +
    (gatehouseBig?.heist.runs.length ?? 0) +
    academyRuns.length +
    ['off', 'budget-64', 'budget-256', 'on'].reduce((n, c) => n + thinkRuns(c).length, 0)
  )
}

const steered = trace ? trace.steps.filter((s) => (s.chosen.rank ?? 1) > 1).length : 11
const fmt = (n: number) => n.toLocaleString('en-US')

const STEPS: { title: string; body: string }[] = [
  {
    title: 'Pick a real model small enough to open up',
    body: 'Qwen2.5-0.5B-Instruct is a real chatbot model, free for anyone to download, with 494 million numbers. It’s small enough to run on a laptop, so we could look inside every floor of it.'
  },
  {
    title: 'Ask it the real question, and record everything',
    body: 'We gave it Grandma’s card and your question, exactly as a chatbot app would, and saved every token, every score, the attention, and every floor’s guess, on every trip.'
  },
  {
    title: 'Change one thing, and run it again',
    body: 'Each Break it is a real experiment: hide the card, skip floors, scramble the numbers, turn up the temperature. The model ran again, and we kept what it actually wrote.'
  },
  {
    title: 'Write the lesson from what came back',
    body: 'Every verdict on screen was written after reading the real output, and automatic tests check the lessons’ numbers against the recordings. When the model did something surprising, the lesson says so.'
  }
]

const MODELS: { name: string; href: string; size: string; license: string; role: string }[] = [
  { name: 'Qwen2.5-0.5B-Instruct', href: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct', size: '494 million numbers', license: 'Apache 2.0', role: 'The model on our ride. Every main-line station, the Library, the Workshop, the Gatehouse and the Academy.' },
  { name: 'Qwen2.5-0.5B', href: 'https://huggingface.co/Qwen/Qwen2.5-0.5B', size: '494 million numbers', license: 'Apache 2.0', role: 'The same model before fine-tuning, in the Academy.' },
  { name: 'Qwen2.5-1.5B-Instruct', href: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct', size: '1.5 billion numbers', license: 'Apache 2.0', role: 'Three times bigger, same family. It reran the Gatehouse heist for comparison.' },
  { name: 'Qwen3-0.6B', href: 'https://huggingface.co/Qwen/Qwen3-0.6B', size: '0.6 billion numbers', license: 'Apache 2.0', role: 'A newer small model with a thinking switch. It answered our question 40 times in the Scratchpad, thinking off, cut short, and on.' },
  { name: 'all-MiniLM-L6-v2', href: 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2', size: '23 million numbers', license: 'Apache 2.0', role: 'A small model that only measures how alike two texts are. It scored Grandma’s recipe box in the Library.' },
  { name: 'o200k_base tokenizer', href: 'https://github.com/niieani/gpt-tokenizer', size: 'about 200,000 tokens', license: 'MIT', role: 'The tokenizer used by OpenAI’s GPT-4o models. It runs live in your browser at the Tokenizer.' },
  { name: 'The Academy’s tiny model', href: 'https://github.com/KevinHegg/promptlife/blob/main/src/lib/tinyLM.ts', size: '8,109 numbers', license: 'MIT', role: 'Written for Prompt Life. It trains live on your device, on Grandma’s 13 recipe cards.' }
]

export function AboutPage() {
  return (
    <article className="about">
      <header className="about-head">
        <p className="kicker">About Prompt Life</p>
        <h1>Real models. Real answers.</h1>
        <p className="lede">Every number on the ride comes from a real model answering a real question. Nothing was made up to make a point.</p>
        <div className="about-tiles">
          <div className="break-tile"><span className="kicker">Real model runs recorded</span><b>{fmt(recordedRuns())}</b></div>
          <div className="break-tile"><span className="kicker">Trips on the ride</span><b>{runCounts.trips}</b></div>
          <div className="break-tile"><span className="kicker">Model numbers changed by answering</span><b>0</b></div>
        </div>
      </header>

      <section className="about-sec">
        <h2>How the data was made</h2>
        <ol className="method-line">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="ml-dot" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-sec">
        <h2>The models</h2>
        <p>All open: anyone can download them, run the same questions, and check our numbers.</p>
        <ul className="model-cards">
          {MODELS.map((m) => (
            <li key={m.name}>
              <a href={m.href} target="_blank" rel="noreferrer" className="mc-name">{m.name}</a>
              <span className="mc-meta">{m.size} · {m.license}</span>
              <p>{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-sec">
        <h2>Recorded, and live</h2>
        <div className="two-col">
          <div>
            <h3>Recorded</h3>
            <p>Everything the Qwen models did was run ahead of time, on a laptop, in October 2026. The lessons replay those recordings exactly, so everyone sees the same real answers, and a phone never has to download a model.</p>
          </div>
          <div>
            <h3>Live on your device</h3>
            <p>The Tokenizer cuts your own sentences with a real tokenizer. The Academy’s tiny model really trains while you watch. The Vote’s “Draw 20” draws from the model’s recorded odds, fresh each time.</p>
          </div>
        </div>
      </section>

      <section className="about-sec">
        <h2>Honest about the edges</h2>
        <ul className="fact-list">
          <li>The ride replays one fixed answer. On {steered} of its {runCounts.trips} trips, that answer wasn’t the model’s own first choice: we steered it, for example to ask the calculator the right sum. Those trips are marked wherever they appear.</li>
          <li>Most runs take the likeliest token every time, so they come out the same on every run. Runs that draw by chance, like the Gatehouse heist and the temperature samples, used fixed seeds and were repeated, and the lessons give the counts.</li>
          <li>Small models make mistakes that big chatbots often don’t. That’s useful here: you can see them happen. The Gatehouse shows where a bigger model behaves differently.</li>
          <li>Every model-written text was screened for offensive words before it went on screen.</li>
          <li>Facts about costs, energy, people and policy come from published sources, linked where they appear. Where a company reports a number about itself, the lesson says so.</li>
        </ul>
        <p>
          The recording scripts and every recording are public in the <a href="https://github.com/KevinHegg/promptlife" target="_blank" rel="noreferrer">project’s repository</a>, under <code>scripts/trace</code> and <code>src/data/traces</code>. Run them and you should get the same numbers.
        </p>
      </section>

      <section className="about-sec">
        <h2>Who made it</h2>
        <div className="two-col">
          <div>
            <h3>Kevin Hegg</h3>
            <p>Created Prompt Life. He chose who it’s for and what it should feel like, picked the question and the subway map, decided what every lesson must teach, tested every step on his phone, and decides what ships.</p>
          </div>
          <div>
            <h3>Claude</h3>
            <p>Anthropic’s AI model (Claude Opus 5.5, in Claude Code), working under Kevin’s direction and review. It wrote the code and the recording scripts, ran the models, drafted lesson text, and gathered and checked sources. Some sources at the end of the line are Anthropic’s own reports; they’re marked.</p>
          </div>
        </div>
      </section>

      <section className="about-sec">
        <h2>Thanks</h2>
        <ul className="fact-list">
          <li>The Qwen team at Alibaba Cloud, for releasing their models openly, and Hugging Face for hosting them and for the <i>transformers</i> library.</li>
          <li>The makers of MiniLM and <i>sentence-transformers</i>, and Bazyli Brzóska for <i>gpt-tokenizer</i>.</li>
          <li>PyTorch, React and Vite, which everything here runs on.</li>
          <li>The researchers, journalists and institutions whose work the lessons cite, from the International AI Safety Report to the Vatican.</li>
          <li>Tokyo’s subway map, and Chip Kidd’s cover for Haruki Murakami’s <i>Colorless Tsukuru Tazaki and His Years of Pilgrimage</i>, for the look.</li>
          <li>The fonts: Overpass, Source Serif 4 and DotGothic16. The calm sounds come from Kevin’s game Hungry Wolf.</li>
        </ul>
      </section>

      <section className="about-sec">
        <h2>Privacy</h2>
        <p>No accounts and no tracking. Your progress is saved only in this browser, and what you type into the Tokenizer never leaves your device. “Start over” erases it all.</p>
      </section>
    </article>
  )
}
