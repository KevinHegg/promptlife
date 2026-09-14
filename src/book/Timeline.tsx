const milestones = [
  {
    date: "1955–1956",
    era: "A field takes shape",
    title: "AI gets a name",
    text: "The Dartmouth proposal names artificial intelligence and proposes a summer research project. Its questions already include language, abstraction, reasoning, and learning. Conversation is one ambition among many.",
    meaning:
      "AI begins as a broad research agenda, not as a synonym for chatbots.",
    source: "Read the Dartmouth proposal",
    url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
  },
  {
    date: "1959",
    era: "Learning from experience",
    title: "A checkers program improves through play",
    text: "Arthur Samuel’s work explores how a program can improve its play through experience. Machine learning offers a way to build behavior from examples and feedback, alongside explicit rules and search.",
    meaning:
      "A learning system can make decisions without generating language or images.",
    source: "IBM’s account of machine learning",
    url: "https://research.ibm.com/topics/machine-learning",
  },
  {
    date: "1986",
    era: "Learning representations",
    title: "Errors guide changes inside a network",
    text: "Rumelhart, Hinton, and Williams describe learning internal representations by backpropagating errors. Gradients connect the error at the output to the parameters throughout a network.",
    meaning:
      "The features a system uses can be learned, as well as the final decision rule.",
    source: "Backpropagation research",
    url: "https://www.cs.toronto.edu/~hinton/backprop.html",
  },
  {
    date: "2012",
    era: "Deep learning at scale",
    title: "AlexNet advances image recognition",
    text: "A deep convolutional network trained on ImageNet demonstrates the impact of learned representations, a large dataset, and GPU computation on image classification.",
    meaning:
      "Recognizing the contents of an image and generating an image are different tasks.",
    source: "Read the AlexNet paper",
    url: "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks",
  },
  {
    date: "2013–2014",
    era: "Learning to generate",
    title: "VAEs learn a space to sample from",
    text: "Variational autoencoders connect an encoder, a decoder, and a structured distribution of latent representations. Sampling from that space and decoding a representation provides a route to generating new examples.",
    meaning:
      "Generation can start with a hidden numerical representation rather than a first word.",
    source: "Auto-Encoding Variational Bayes",
    url: "https://arxiv.org/abs/1312.6114",
  },
  {
    date: "2014",
    era: "Learning to generate",
    title: "GANs learn through an adversarial objective",
    text: "A generator produces samples while a discriminator learns to distinguish them from training examples. Their competing objectives provide a different training approach to generation.",
    meaning:
      "Two systems can produce pictures while learning through very different objectives.",
    source: "Generative Adversarial Networks",
    url: "https://arxiv.org/abs/1406.2661",
  },
  {
    date: "2017",
    era: "An architecture with reach",
    title: "The transformer organizes computation around attention",
    text: "Attention Is All You Need introduces the transformer for machine translation. Attention helps positions exchange information, and the architecture becomes a foundation for later language and multimodal models.",
    meaning:
      "An architecture does not determine whether generation must proceed one token at a time.",
    source: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    date: "2020",
    era: "Generation through denoising",
    title: "Diffusion produces high-quality images",
    text: "Denoising Diffusion Probabilistic Models demonstrates image synthesis by reversing a gradual corruption process. Generation begins with noise and applies learned denoising updates.",
    meaning: "A model can generate by repeatedly refining a representation.",
    source: "Denoising Diffusion Probabilistic Models",
    url: "https://arxiv.org/abs/2006.11239",
  },
  {
    date: "2022",
    era: "New paths for language",
    title: "Diffusion-LM explores controllable text",
    text: "Diffusion-LM generates through denoising continuous vectors and connects the process to controllable text generation. Discrete words make language diffusion different from simply cleaning up noisy pixels.",
    meaning:
      "Text generation has alternatives to committing to one next token at a time.",
    source: "Diffusion-LM",
    url: "https://arxiv.org/abs/2205.14217",
  },
  {
    date: "May 2025",
    era: "Text and code diffusion",
    title: "Google introduces Gemini Diffusion",
    text: "Google presents an experimental model that generates text and code through iterative refinement. Its demonstration brings text diffusion to a wider audience and highlights the possibility of correcting a response during generation.",
    meaning: "A fluent sentence can emerge through a revisable working area.",
    source: "Google’s Gemini Diffusion announcement",
    url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-diffusion/",
  },
  {
    date: "June 2026",
    era: "Refinement within blocks",
    title: "DiffusionGemma describes parallel denoising",
    text: "Google’s model overview describes denoising multiple positions within a canvas, with blocks generated in sequence. Parallel work within a block and sequential work between blocks can coexist.",
    meaning:
      "“The whole response resolves at once” is a useful starting image, but not a universal rule.",
    source: "DiffusionGemma model overview",
    url: "https://ai.google.dev/gemma/docs/diffusiongemma",
  },
];
export default function Timeline() {
  return (
    <details
      className="timeline-section"
      id="chapter-timeline"
      tabIndex={-1}
      open
    >
      <summary>
        <span>
          <span className="eyebrow">THE LONGER STORY</span>
          <span className="detail-title">
            From rules and learning to generative models
          </span>
        </span>
        <span className="detail-toggle" aria-hidden="true" />
      </summary>
      <p className="timeline-intro">
        Eleven selected milestones, with the idea each one adds. This is a
        branching history: rules, search, prediction, and generation continue to
        coexist.
      </p>
      <ol className="timeline">
        {milestones.map((m, i) => (
          <li key={m.date}>
            <div className="timeline-date">
              <span
                aria-hidden="true"
                className={`timeline-node era-${Math.floor(i / 4)}`}
              />
              {m.date}
            </div>
            <article>
              <p className="eyebrow">{m.era}</p>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <p className="timeline-meaning">
                <strong>What this adds</strong> {m.meaning}
              </p>
              <a href={m.url} target="_blank" rel="noreferrer">
                {m.source} ↗
              </a>
            </article>
          </li>
        ))}
      </ol>
    </details>
  );
}
