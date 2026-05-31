You are Codex working in my GitHub repo:

https://github.com/KevinHegg/promptlife

My local folder is named `promptlife`. Use the files from `promptlife_codex_seed_v1` as the starting point. Build **Prompt Life**, a mobile-first web app that teaches how large language models work from A to Z for a non-technical but academic audience: smart high-schoolers, first-year college students, faculty, higher-ed IT leaders, and PhDs outside computer science.

Important context from the product conversation:

- The through-line is **“a day in the life of a prompt.”**
- The app teaches LLMs from pretraining and fine-tuning through inference, tokenization, embeddings, tensors, attention, MLPs, hidden states, logits, softmax, vocabulary cloud, sampling, autoregression, context windows, diffusion, multimodal AI, and real-vs-myth risk literacy.
- The app should reduce fear by making the model less mysterious.
- It should be fun and visually rich but not childish.
- It is not a competitive game. Use “insight unlocked,” reflection, and progress instead of leaderboards.
- Dense poster images are reference only. Do not use them as app pages. Keep app text in HTML for accessibility.

First inspect the repo. If empty or minimal, install this seed as the initial app. If the repo already has a stack, adapt to it rather than overwriting important existing work.

MVP requirements:

1. Use Vite + React. TypeScript is optional for v0.1, but convert to TypeScript if easy.
2. Make the app excellent at 390px width first; desktop can simply center the mobile shell.
3. Keep the navigation simple: Home, Journey, Play, Glossary, Badge.
4. Lesson structure must be consistent:
   - concept title,
   - one-sentence definition,
   - relationship line,
   - metaphor,
   - tiny interaction,
   - checkpoint quiz/reflection.
5. Implement localStorage progress.
6. Preserve and improve the glossary drawer.
7. Keep mini-games simple and non-competitive:
   - Context Stack: push cards into a limited context window; old cards fall out.
   - Attention Weave: tap token nodes to draw relevance arcs.
   - Token Pipeline Relay: tap operators to cycle pass / transform / hold.
8. Add accessibility basics:
   - semantic HTML,
   - visible focus states,
   - image alt text,
   - buttons not divs,
   - respect `prefers-reduced-motion`.
9. Run `npm install`, then `npm run build`, and fix any errors.
10. Update README with exact local dev instructions.

Core teaching distinctions that must remain clear:

- Training and fine-tuning can durably change weights.
- Inference is a forward pass only; it does not durably update weights.
- Embedding = a token’s learned starting vector.
- Hidden state = temporary context-shaped internal vector.
- Attention = weighted relevance between token positions, not human attention.
- MLP = per-token feature reshaping.
- Logits = raw scores; softmax = probabilities; sampling = choosing one next token.
- LLM generation is autoregressive: next token, append, repeat.
- Context window = temporary visible input, not permanent memory.
- Diffusion is denoising, different from autoregressive text generation.
- Multimodal means multiple media types represented or processed together.
- Brain/neuron metaphors are useful only when their limits are explicit.

Tone:

Smart, warm, concise, slightly playful. “Model literacy for the AI era.” Avoid fearmongering and avoid hype.

After implementation, summarize:

- files changed,
- how to run locally,
- what is done,
- the next three best v0.2 improvements.
