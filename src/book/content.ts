export type LabId =
  | "generators"
  | "trace"
  | "probability"
  | "training"
  | "attention"
  | "context"
  | "evidence"
  | "tools"
  | "evaluation";
export type Section = { title: string; paragraphs: string[] };
export type Chapter = {
  id: string;
  title: string;
  headline: string;
  emphasis: string;
  description: string;
  question: string;
  before: Section[];
  after: Section[];
  deeper: Section;
  lab: LabId;
  takeaway: string;
  reflection: string;
  challenge: {
    question: string;
    options: { text: string; feedback: string; correct?: boolean }[];
  };
  sources: { title: string; url: string }[];
};
const transformer = {
  title: "Vaswani et al. · Attention Is All You Need (2017)",
  url: "https://arxiv.org/abs/1706.03762",
};
const visual = {
  title: "3Blue1Brown · Transformers, the technology behind LLMs",
  url: "https://www.3blue1brown.com/lessons/gpt/",
};
const rag = {
  title: "Lewis et al. · Retrieval-Augmented Generation (2020)",
  url: "https://arxiv.org/abs/2005.11401",
};
const instructions = {
  title:
    "Ouyang et al. · Training language models to follow instructions with human feedback (2022)",
  url: "https://arxiv.org/abs/2203.02155",
};
const risk = {
  title: "NIST · AI Risk Management Framework (2023)",
  url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
};

export const chapters: Chapter[] = [
  {
    id: "landscape",
    title: "The bigger picture",
    headline: "AI is a landscape.",
    emphasis: "Language models are one part.",
    description:
      "Place generative AI within a longer history. Compare systems that classify, predict, and create—and two very different ways to generate text.",
    question:
      "Before you begin: does every AI system learn from data, and does every system that learns generate new content?",
    before: [
      {
        title: "Four terms that answer different questions",
        paragraphs: [
          "Artificial intelligence is the broad field of building systems that perform tasks such as reasoning, planning, perception, and language use. Some approaches work with explicit rules and search. A program can search through possible chess moves without being a language model or learning from examples.",
          "Machine learning is an approach within AI: fit a model from data or experience rather than write every decision rule by hand. A spam classifier, a demand forecast, and a recommendation model can all use machine learning. None needs to write a paragraph or make a picture. Deep learning is a family of machine-learning methods that uses neural networks with multiple layers to learn representations.",
          "Generative AI describes systems used to produce content: text, images, speech, music, video, or other structured outputs. Today many use deep learning, but generative modeling predates modern deep networks. These labels answer different questions: AI names the broad field, machine learning names a way of building models, deep learning names a family of methods, and generative describes a capability. They are not four successive products that replaced one another.",
        ],
      },
      {
        title: "Where an LLM belongs",
        paragraphs: [
          "A large language model is a model of language trained at scale. Many familiar assistants use a transformer that generates text autoregressively: each selected token extends the sequence used for the next prediction. That is the main mechanism this course will unpack, not the definition of all AI or even all language modeling.",
          "Keep three questions separate. What can the system produce: text, pictures, sound? What network processes the information: a transformer or another architecture? How does generation proceed: one piece after another, iterative denoising, or another method? A diffusion model can use a transformer. A system can accept images and still produce only text. The modality, architecture, and generation procedure do not determine one another.",
        ],
      },
    ],
    after: [
      {
        title: "Several ways to make something new",
        paragraphs: [
          "Autoregressive models build an output by conditioning each new piece on earlier pieces. Those pieces can represent text, audio, or other data. In ordinary token-by-token decoding, a committed token stays in the sequence; the application can separately ask for a rewrite or use more elaborate decoding procedures.",
          "Variational autoencoders, or VAEs, learn an encoder and a decoder with a structured distribution of hidden representations. Sampling a representation and decoding it can produce a new example. Generative adversarial networks, or GANs, train a generator alongside a discriminator that distinguishes training examples from generated samples. Their training objectives differ, even when both produce pictures.",
          "Diffusion models learn to reverse a process that corrupts data. For images, a common approach progressively adds noise during training and learns denoising updates. Generation begins with noise and applies learned updates, often guided by a text prompt. Some systems work in a compressed latent representation rather than directly in pixels. The result is synthesized; the model is not uncovering an original picture hidden in the starting noise.",
          "These are important families, not an exhaustive catalog. Systems can combine them—for example, using an autoencoder to compress an image and diffusion to generate in that compressed space. Image, audio, and video generation deserve their own explanations; knowing next-token text generation is a useful beginning, not a universal recipe.",
        ],
      },
      {
        title: "Can a whole passage resolve together?",
        paragraphs: [
          "Yes, text diffusion can refine multiple positions together over successive passes. But text consists of discrete symbols, so it is not always literally a blurry sentence becoming sharper. Some approaches denoise continuous vectors and decode them into words. Others operate on token sequences using masks or other discrete corruption. The comparison above uses masks and provisional words to make the idea visible.",
          "Google announced Gemini Diffusion as an experimental text-and-code model on May 20, 2025. It describes generation as refining noise into an output and allows correction during generation. This shows why 'a language model' need not mean 'a model that commits to one next token at a time.' It does not establish that diffusion is always more accurate, or that every Google language model uses it.",
          "The size of the working area matters. A model may refine a whole fixed-length sequence, or refine a block and then move on to another block. Google's DiffusionGemma documentation, updated June 10, 2026, describes block-autoregressive generation with parallel denoising within a canvas. So 'the entire response slowly resolves as a whole' is a useful first image for some demonstrations, but not a universal description. Many positions can change together within the current working area; later blocks may still be generated in order.",
          "Iterative does not necessarily mean slow. Parallel work can reduce latency, while extra denoising passes add computation. Hardware, sequence length, batch size, and implementation affect the result. Nor does revision guarantee truth: a model can refine an unsupported answer into a fluent unsupported answer. Watch the procedure, then evaluate the output separately.",
        ],
      },
    ],
    deeper: {
      title: "Training corruption is not generation",
      paragraphs: [
        "During diffusion training, a specified corruption process creates noisy versions of examples. The model learns a reverse prediction task at different noise levels. During generation, the sampler starts from an appropriate noisy state and uses the learned model through a sequence of updates. The training schedule and generation schedule need not use the same number of steps.",
        "In masked text diffusion, several unknown positions can be predicted from the visible context. Whether filled positions are later remasked or revised depends on the method and sampler. Continuous text diffusion instead works with noisy numerical representations. Neither should be illustrated as an autoregressive model writing a complete draft and then merely proofreading it.",
        "Causal attention in later chapters describes the usual autoregressive decoder. Denoising models can allow bidirectional attention within their current canvas. That permits positions to inform one another; it does not give the system access to evidence absent from the prompt or its learned parameters.",
      ],
    },
    lab: "generators",
    takeaway:
      "AI is broader than machine learning, and generative AI is broader than next-token language models. Separate the output type, architecture, and generation procedure.",
    reflection:
      "Explain how a spam classifier, an autoregressive text model, and an image diffusion model differ. Which labels do they share?",
    challenge: {
      question:
        "A model uses transformer layers to refine many masked text positions in a block. What can you conclude?",
      options: [
        {
          text: "It cannot be a diffusion model because transformers only generate left to right.",
          feedback:
            "Transformer is an architecture. The attention pattern, training objective, and generation procedure determine how it is used.",
        },
        {
          text: "It combines a transformer architecture with a denoising procedure; this alone does not prove its answers are correct.",
          correct: true,
          feedback:
            "Exactly. Architecture, generation procedure, and factual reliability are separate questions. Blocks can also be generated sequentially even when positions within a block are refined together.",
        },
        {
          text: "It must resolve an unlimited response in one pass.",
          feedback:
            "Parallel updates within a block do not remove block boundaries, denoising steps, or output limits.",
        },
      ],
    },
    sources: [
      {
        title: "Goodfellow, Bengio & Courville · Deep Learning, introduction",
        url: "https://www.deeplearningbook.org/contents/intro.html",
      },
      {
        title: "McCarthy et al. · Dartmouth research proposal (1955)",
        url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
      },
      {
        title: "Kingma & Welling · Auto-Encoding Variational Bayes (2013)",
        url: "https://arxiv.org/abs/1312.6114",
      },
      {
        title: "Goodfellow et al. · Generative Adversarial Networks (2014)",
        url: "https://arxiv.org/abs/1406.2661",
      },
      {
        title: "Ho et al. · Denoising Diffusion Probabilistic Models (2020)",
        url: "https://arxiv.org/abs/2006.11239",
      },
      {
        title: "Rombach et al. · Latent Diffusion Models (2021/2022)",
        url: "https://arxiv.org/abs/2112.10752",
      },
      {
        title: "Li et al. · Diffusion-LM (2022)",
        url: "https://arxiv.org/abs/2205.14217",
      },
      {
        title: "Google · Gemini Diffusion announcement (May 2025)",
        url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-diffusion/",
      },
      {
        title: "Google · DiffusionGemma model overview (June 2026)",
        url: "https://ai.google.dev/gemma/docs/diffusiongemma",
      },
    ],
  },
  {
    id: "answer",
    title: "An answer appears",
    headline: "What happens after",
    emphasis: "you press Send?",
    description:
      "Follow a question into the machine. See what belongs to the model, what belongs to the app, and where an answer begins.",
    question:
      "Before you begin: when an assistant answers, what information do you think it can actually see?",
    before: [
      {
        title: "Begin with something ordinary",
        paragraphs: [
          "You ask for a sentence about a dog chasing a cat. A response appears, one piece after another. The interface makes this look like a single act: you ask, it answers. Underneath, several different processes are doing different jobs.",
          "The application gathers information for the request. That can include your message, instructions written by the application’s developer, selected conversation history, and sometimes passages returned by search. Together, this material forms the context made available to the model. Your visible message may be only one part of it.",
          "The language model transforms that context into scores for possible next tokens. A token is a small piece of text, not necessarily a whole word. A generation procedure chooses a token, adds it to the sequence, and continues. Many repeated steps produce a response that reads as a whole.",
        ],
      },
    ],
    after: [
      {
        title: "A model is one part of the system",
        paragraphs: [
          "The model’s learned parameters, often called weights, shape its predictions. They were adjusted during training. Ordinary generation uses those parameters without rewriting them every time you send a message. This distinction explains why telling an assistant a fact can affect the present conversation without permanently teaching the underlying model.",
          "The application can still save your message outside the model. It may store a conversation, retrieve an earlier note, or use data in a separate training process, depending on the product. “The weights did not change during this answer” and “the product does not store my data” are different statements.",
          "A search tool, calculator, database, or document archive is also separate software. A model does not gain access to those resources just because you name them. The surrounding application must provide access and supply the results.",
        ],
      },
      {
        title: "How can this simple loop do so much?",
        paragraphs: [
          "Predicting the next piece of language is a demanding task. To predict many kinds of text well, a model can learn useful representations of grammar, facts, styles, relationships, and patterns of reasoning. The training objective is simple to state; the learned computation can be complicated.",
          "That does not make every answer reliable. The model is generating a continuation shaped by its training and available context. It can produce a fluent explanation even when important evidence is missing. We will return to that gap repeatedly, because it is central to using these systems well.",
        ],
      },
    ],
    deeper: {
      title: "The scope of this field guide",
      paragraphs: [
        "The central mechanism from this chapter onward is a typical autoregressive text-generating transformer. The opening chapter places it alongside diffusion and other generative methods. It is an important family of language models, not a definition of every possible AI system.",
        "The diagrams show a conceptual generation loop. Real systems use optimizations, including cached intermediate information, so “repeat” does not mean that every previous computation is naively performed again. A fast implementation can preserve the same causal relationships.",
      ],
    },
    lab: "trace",
    takeaway:
      "An assistant is a system around a model. Inspect the context, the generation, and any external tools separately.",
    reflection:
      "Explain to a friend why an assistant might know a fact in this conversation without having learned it permanently.",
    challenge: {
      question:
        "An assistant correctly quotes a private document uploaded moments ago. What can you conclude from that alone?",
      options: [
        {
          text: "The model’s training data now includes the entire document.",
          feedback:
            "A correct quotation does not show that any training happened. The application could have supplied the relevant passage as context.",
        },
        {
          text: "The system had access to enough information to produce the quote; the mechanism needs inspection.",
          correct: true,
          feedback:
            "Exactly. Context, retrieval, and training are different possible mechanisms. The answer alone does not establish which one occurred.",
        },
        {
          text: "The model will remember the quotation in every future conversation.",
          feedback:
            "Present access does not establish future access. That depends on storage, retrieval, and how later requests are constructed.",
        },
      ],
    },
    sources: [visual, transformer],
  },
  {
    id: "prediction",
    title: "Predicting the next piece",
    headline: "One piece at a time.",
    emphasis: "A whole new sentence.",
    description:
      "Turn text into tokens, turn scores into probabilities, and discover why the same prompt can lead to different answers.",
    question:
      "Predict: if one token has a 70% probability, must it be the next token selected?",
    before: [
      {
        title: "Language arrives as pieces",
        paragraphs: [
          "A tokenizer converts text into a sequence of integer IDs. Its vocabulary may contain whole words, fragments, punctuation, and pieces that include spaces. It uses a particular encoding scheme, so the same text can be split differently by different tokenizers.",
          "A token ID is an address in a vocabulary. Its numerical size does not measure importance or meaning. An embedding lookup uses that ID to retrieve a learned vector: a list of numbers that starts the model’s representation of this token.",
          "Try the tokenizer below. Add a space, change capitalization, or enter a word in another language. Small changes can alter the pieces. The full sequence decodes back to your text, even when an individual token contains only part of a character’s encoded bytes.",
        ],
      },
    ],
    after: [
      {
        title: "A score is not yet a probability",
        paragraphs: [
          "At a generation step, the model produces a score, or logit, for each token in its vocabulary. Logits can be positive or negative and do not need to add up to anything. Softmax converts them into nonnegative probabilities whose total is one.",
          "Temperature changes the shape of that distribution before selection. Dividing the logits by a smaller positive temperature increases the separation between stronger and weaker candidates. A larger temperature makes the distribution flatter. This changes variation; it is not a dial for factual accuracy.",
          "Sampling draws from the distribution. A less likely token can still be selected. Greedy selection is different: it selects a highest-scoring token. The experiment deliberately keeps the context fixed when drawing 100 times, so you can compare frequencies with probabilities. Generating a paragraph changes the context after each token, and therefore changes later probabilities.",
        ],
      },
      {
        title: "The response becomes part of the input",
        paragraphs: [
          "Once a token is selected, it becomes part of the sequence for the next step. The model conditions later output on earlier output. That is why an early choice can take a story in a different direction, and why an invented premise can be elaborated into a convincing but unsupported explanation.",
          "A stop token or application limit can end generation. Other decoding settings, such as top-k and top-p, restrict the candidate set before sampling. You do not need every setting to understand the essential distinction: scoring possibilities, choosing one, and repeating are separate operations.",
        ],
      },
    ],
    deeper: {
      title: "Try the calculation",
      paragraphs: [
        "For each logit z, compute exp(z / T), then divide by the sum of those values over all candidates. Here T is a positive temperature. To avoid very large intermediate numbers, an implementation can subtract the largest scaled logit before exponentiating; the resulting probabilities are unchanged.",
        "The lab uses only four candidates so every number is inspectable. A real vocabulary is much larger. Its percentages describe selection within this toy vocabulary, not measurements from a deployed model and not confidence that a statement is true.",
      ],
    },
    lab: "probability",
    takeaway:
      "Tokens are encoded pieces. Probabilities govern selection; they do not certify truth.",
    reflection:
      "Why could lowering temperature make an incorrect answer more consistently incorrect?",
    challenge: {
      question:
        "A fixed next-token distribution gives “yard” 60% and “street” 40%. A sampled output selects “street.” What happened?",
      options: [
        {
          text: "The sampler failed because it did not pick the highest probability.",
          feedback:
            "That would be unexpected under greedy selection. Sampling permits any candidate with nonzero probability.",
        },
        {
          text: "The model must have changed its weights.",
          feedback:
            "No weight update is needed. Different draws from the same distribution can produce different outcomes.",
        },
        {
          text: "A permitted, less likely outcome was sampled.",
          correct: true,
          feedback:
            "Yes. Over many independent draws the proportions tend toward the distribution, but individual draws need not select the most likely candidate.",
        },
      ],
    },
    sources: [
      visual,
      {
        title: "gpt-tokenizer · Implementation used in the token lab",
        url: "https://github.com/niieani/gpt-tokenizer",
      },
    ],
  },
  {
    id: "training",
    title: "Where the ability comes from",
    headline: "Before your question,",
    emphasis: "a long apprenticeship.",
    description:
      "Make a prediction, measure the error, change a weight. Repeat—and then ask whether the improvement travels to new examples.",
    question:
      "Predict: can performance improve on the training examples while getting worse on a different set?",
    before: [
      {
        title: "Learning is a change in the parameters",
        paragraphs: [
          "Imagine a model encountering the beginning of a sentence and assigning probabilities to possible continuations. During training, the actual continuation is available as a target. A loss function measures how poorly the prediction matches that target. Giving a low probability to the observed token produces a larger loss.",
          "Training adjusts parameters to reduce loss. In a neural network, backpropagation calculates how parameter changes would affect the loss, and an optimizer uses that information to update them. An individual update is small. Many updates across many examples can change the model’s behavior substantially.",
          "The laboratory uses one adjustable weight and just two possible next words. That is far smaller than an LLM, but the calculation is real. The training set has three “tea” examples for every “coffee” example. Watch how the model’s prediction shifts toward that pattern.",
        ],
      },
    ],
    after: [
      {
        title: "Fitting examples is not the same as generalizing",
        paragraphs: [
          "If we judge a model only on the examples used to change its parameters, we can mistake familiarity for useful ability. Held-out examples let us ask a different question: does the learned behavior work on material that did not drive those updates?",
          "The toy lab intentionally gives the held-out set a different balance: half tea, half coffee. Better fitting the training balance can make held-out performance worse. This is a simple distribution mismatch, not a complete demonstration of neural-network overfitting. In real work, both mismatch and overfitting can damage performance on new data.",
          "Dataset quality, coverage, repetition, and evaluation design matter. A model can learn broad regularities and also memorize particular sequences. Neither a low training loss nor a persuasive example proves reliable performance on every task.",
        ],
      },
      {
        title: "Training has several stages",
        paragraphs: [
          "Pretraining develops broad capabilities from large amounts of data. For a common text-training objective, the next tokens in the data supply the targets; people do not have to hand-label every sentence. This is a form of self-supervised learning.",
          "Later training can shape the model toward desired tasks and behavior. Supervised fine-tuning uses examples of desired responses. Other post-training methods use preferences or rewards to change which responses the model favors. These approaches can improve instruction following without making the system infallible.",
          "Once weights are frozen for an ordinary inference run, providing a new example in the prompt changes the input, not those weights. That temporary adaptation is often called in-context learning. The word “learning” is being used for two different mechanisms, which is why it pays to ask what actually changed.",
        ],
      },
    ],
    deeper: {
      title: "Inside the one-weight model",
      paragraphs: [
        "The model uses p(tea) = 1 / (1 + exp(−w)). Its initial weight is zero, giving each word probability 0.5. For an average training target of 0.75, the gradient of binary cross-entropy with respect to w is p − 0.75. Each step subtracts half that gradient from w.",
        "The loss shown is the average negative log probability of the observed outcomes. Training and held-out losses use the same formula with different target frequencies. This simple setup makes the change in the weight visible; it has no transformer, context representation, or language understanding.",
      ],
    },
    lab: "training",
    takeaway:
      "Training changes parameters to fit an objective. Evaluation asks whether that improvement transfers.",
    reflection:
      "What would you want to know about a model’s evaluation examples before trusting a claim that it improved?",
    challenge: {
      question:
        "An assistant follows a formatting example pasted into a prompt. In a fresh conversation without that example, it returns to its usual format. Which explanation best fits?",
      options: [
        {
          text: "The example changed its current context, without establishing a durable parameter update.",
          correct: true,
          feedback:
            "That fits in-context learning. The supplied example can steer one request without changing the underlying model.",
        },
        {
          text: "The model was fine-tuned and then automatically untrained.",
          feedback:
            "The behavior does not require training or untraining. First inspect whether the example was included in the new request.",
        },
        {
          text: "Training cannot teach formats, so the first response was accidental.",
          feedback:
            "Training can shape formatting behavior. But this observation is better explained by a change in supplied context.",
        },
      ],
    },
    sources: [instructions, visual],
  },
  {
    id: "transformer",
    title: "Inside a transformer",
    headline: "How a piece of text",
    emphasis: "acquires context.",
    description:
      "Follow the numbers through attention and transformation. Learn what can be seen, what gets mixed, and what changes.",
    question:
      "Predict: can the representation of an earlier token use a word that appears later in a causal decoder?",
    before: [
      {
        title: "The same token, a different role",
        paragraphs: [
          "Consider “river bank” and “bank loan.” The token corresponding to “bank” can start with the same learned embedding, yet it plays different roles. The model needs representations that depend on the surrounding sequence, not just on vocabulary entries.",
          "A vector is a list of numbers. A matrix arranges numbers in rows and columns; a tensor generalizes these arrays to more axes. These are ways to organize computation, not little containers holding dictionary definitions. A model’s internal features need not correspond to neat concepts that a person can name.",
          "Position information matters too. “The dog chased the cat” differs from “The cat chased the dog” even though the words overlap. Transformer architectures incorporate position in different ways. Without an appropriate account of order, simply collecting token embeddings would lose something essential.",
        ],
      },
    ],
    after: [
      {
        title: "Attention routes information between positions",
        paragraphs: [
          "Attention computes a weighted combination of information from permitted token positions. In a common formulation, learned projections produce queries, keys, and values. Matching queries with keys produces scores; normalized scores weight the values that get combined.",
          "The words “query” and “key” may sound like a database search, but here they are vectors inside a calculation. Several attention heads can compute different patterns in parallel. Later layers work on representations already transformed by earlier layers.",
          "In a causal text decoder, a position can use itself and earlier permitted positions. It cannot use later positions. The attention bench above enforces this restriction. The sentence is deliberately split into word-like positions for readability; these are not outputs from a real tokenizer.",
        ],
      },
      {
        title: "Attention is only part of a layer",
        paragraphs: [
          "A feed-forward network, often called an MLP, applies learned transformations and nonlinearities separately to each position. Attention mixes information across positions; the MLP transforms the representation at each position. Residual connections retain and add information, and normalization helps keep the numerical computation well behaved.",
          "After repeated layers, each position has a temporary hidden state shaped by the permitted context. A final projection maps the relevant hidden state into vocabulary scores. This connects the machinery here to the probabilities you explored earlier.",
          "An attention heatmap is evidence about one computation. It is not a complete account of why the model made a claim. Many heads, layers, MLP operations, and decoding choices contribute. Attractive diagrams should not imply more interpretability than we actually have.",
        ],
      },
    ],
    deeper: {
      title: "From three scores to a mixed value",
      paragraphs: [
        "The attention lab fixes a row of illustrative query–key scores and scalar values. It masks future positions, applies softmax to allowed scores, and sums each value multiplied by its attention weight. A real attention head uses vectors rather than one scalar, but the weighted-sum relationship is the same.",
        "Change a score and observe both the attention weight and the mixed value. Notice that attending strongly to a position is not the same as copying its visible word. It contributes a learned numerical representation to a further calculation.",
      ],
    },
    lab: "attention",
    takeaway:
      "Representations change through layers. Causal attention mixes information only from permitted positions.",
    reflection:
      "What does an attention visualization reveal, and what would it be a mistake to infer from it?",
    challenge: {
      question:
        "A causal decoder processes “Maya opened the garden.” At the position for “opened,” which information is available through ordinary causal self-attention?",
      options: [
        {
          text: "All five positions, because the entire sentence was supplied at once.",
          feedback:
            "Processing positions in parallel does not remove the causal mask. Later positions remain unavailable to the earlier position.",
        },
        {
          text: "Only “opened,” because attention never crosses token positions.",
          feedback:
            "Attention can combine information across permitted positions. It is not restricted to the current position.",
        },
        {
          text: "“Maya” and “opened,” including position information, but not the later words.",
          correct: true,
          feedback:
            "Yes. The causal restriction applies even when training processes many positions in parallel.",
        },
      ],
    },
    sources: [
      transformer,
      {
        title: "Jain & Wallace · Attention is not Explanation (2019)",
        url: "https://arxiv.org/abs/1902.10186",
      },
    ],
  },
  {
    id: "assistant",
    title: "A model becomes an assistant",
    headline: "The conversation you see.",
    emphasis: "The context it receives.",
    description:
      "Instructions, examples, memory, and limits: discover the application decisions hidden behind a familiar chat window.",
    question:
      "Predict: does a message still visible in the chat necessarily reach the model on the next request?",
    before: [
      {
        title: "Continuing text is not yet being helpful",
        paragraphs: [
          "A model trained to continue varied text is not automatically a dependable assistant. A question can be followed by an answer, another question, a transcript, or many other forms of text. Post-training can shift behavior toward following instructions and producing responses people prefer.",
          "At runtime, an application can also supply instructions about role, format, or boundaries. These instructions are part of the request’s context. They are different from the earlier training that shaped how the model responds to instructions.",
          "A useful prompt makes the task and available evidence clear. Specify what you need, provide relevant context, and describe a useful output. Examples can clarify an ambiguous format. Elaborate wording cannot provide a missing document or grant access to a tool that the application does not have.",
        ],
      },
    ],
    after: [
      {
        title: "A chat history is not an unlimited memory",
        paragraphs: [
          "A model has a finite context capacity. The application must decide what fits in the current request, often reserving room for the response. It might include recent messages, summarize older exchanges, retrieve saved facts, or refuse a request that is too large.",
          "The lab uses a transparent packing rule with made-up unit costs. Real systems count tokens and use more complex policies. The point is that a selected item can still be omitted when it does not fit. Seeing a fact on your screen is not proof that the model received it.",
          "Persistent memory is usually a product capability: information is stored outside the model and inserted into later requests when relevant. Inspecting that mechanism is more useful than assuming that every apparent recollection reflects a changed weight.",
        ],
      },
      {
        title: "Instructions compete with other text",
        paragraphs: [
          "A request can contain the user’s task, application instructions, quoted text, and retrieved documents. Those pieces have different roles. A document that says “ignore the user” is material to analyze, not an instruction the application should authorize.",
          "Instruction hierarchies and model training can help, but prompting alone is not an access-control system. Permission to read a record or send an email should also be enforced by the surrounding software. We will explore that distinction in the tools chapter.",
          "Some systems spend additional computation generating intermediate tokens before giving a final response. More computation can improve performance on some tasks, but it is not a guarantee. A displayed explanation is not a faithful readout of every internal operation.",
        ],
      },
    ],
    deeper: {
      title: "Three ways behavior changes",
      paragraphs: [
        "Fine-tuning changes learned parameters. In-context examples change information supplied in a request. Application memory changes what external information can be retrieved later. All three may affect an answer; they have different costs, persistence, and failure modes.",
        "When a system behaves unexpectedly, ask which layer changed. A missing instruction suggests context assembly. A repeated formatting tendency may involve training or a persistent instruction. A fact appearing across conversations may involve external storage. Test hypotheses instead of inferring architecture from a single response.",
      ],
    },
    lab: "context",
    takeaway:
      "The visible conversation and the actual model context can differ. Memory and permissions also belong to the application.",
    reflection:
      "Write a useful prompt for a task you do, then name one failure that improving the prompt would not fix.",
    challenge: {
      question:
        "The assistant ignores an old requirement that is still visible in the chat. What is the most useful first investigation?",
      options: [
        {
          text: "Inspect whether the requirement was included in the actual request.",
          correct: true,
          feedback:
            "Yes. Establish what the model received before drawing conclusions about its ability to follow the requirement.",
        },
        {
          text: "Assume the context window always deletes exactly the oldest message.",
          feedback:
            "Different applications use different policies. You need to inspect this request, not assume one universal truncation rule.",
        },
        {
          text: "Immediately fine-tune the model on the entire conversation.",
          feedback:
            "That is a much larger intervention. It may not address an application that omits the relevant instruction.",
        },
      ],
    },
    sources: [instructions, risk],
  },
  {
    id: "evidence",
    title: "Answers from evidence",
    headline: "Why did the assistant",
    emphasis: "get this wrong?",
    description:
      "A confident answer. A real citation. And the wrong person. Follow the evidence to find out where the answer went astray.",
    question:
      "Before revealing the explanation, decide whether the supplied passage supports the answer.",
    before: [
      {
        title: "A citation is a place to look",
        paragraphs: [
          "You ask an assistant when a community garden opened. It answers immediately and gives you a source. That feels reassuring. But a citation tells you where to look; it does not tell you whether the answer is supported.",
          "In this small fictional archive, two people share a surname. One opened a plant nursery; the other opened a community garden. A search result can match several words in your question while describing the wrong event.",
          "Change which passage reaches the assistant. Then try the answer with a deliberately wrong date, even when the correct source is supplied. These are two distinct failure points. Diagnosing them requires examining more than the final sentence.",
        ],
      },
    ],
    after: [
      {
        title: "The model sees a selection, not the archive",
        paragraphs: [
          "Retrieval-augmented generation, usually shortened to RAG, combines retrieval with generation. A search system selects potentially useful material. The application places it into the model’s context. The model then generates a response using that context and its learned parameters.",
          "The surrounding system often divides documents into passages or chunks. Very short passages may omit a qualification or the identity of the person being discussed. Very long passages can bury the needed detail among irrelevant material. The passage boundary is a design decision that can change the answer.",
          "Search may use keywords, embeddings, or a combination. A retrieval embedding represents a passage or query for comparison. That differs from the token embedding lookup inside a transformer. Similarity is useful for finding candidates; it does not establish that a candidate entails the answer.",
        ],
      },
      {
        title: "Locate the failure before choosing a repair",
        paragraphs: [
          "If the right passage was not retrieved, investigate search terms, filters, indexing, and passage boundaries. If the right passage was retrieved but omitted from the context, investigate packing and limits. If it was supplied and the answer still changed the date, investigate generation and claim checking.",
          "A grounded answer connects its claims to supporting evidence. Even then, the source might be mistaken, outdated, or contested. Support within a document and truth about the world are related but distinct questions.",
          "Good systems make uncertainty useful. An answer can identify conflicting dates, say that the collection does not establish a fact, or point to the missing evidence. Refusing to invent is a capability worth evaluating, not simply an absence of output.",
        ],
      },
    ],
    deeper: {
      title: "Turn a case into an evaluation",
      paragraphs: [
        "Construct a small set of questions with known evidence: a direct answer, an ambiguous name, a conflicting record, an unanswerable question, and a claim that requires more than one passage. Record which sources should be supplied and which claims an acceptable answer may make.",
        "Evaluate retrieval separately from the answer. Did the system retrieve the required evidence? Did the answer use it correctly? Did the citation point to the supporting location? This makes a failed result informative, because you can test a specific repair instead of changing every part at once.",
      ],
    },
    lab: "evidence",
    takeaway:
      "A retrieved passage can be irrelevant. A generated claim can be unsupported. A citation alone fixes neither.",
    reflection:
      "Describe one retrieval failure and one generation failure in your own words. What evidence would distinguish them?",
    challenge: {
      question:
        "A supplied record states that a bridge opened in 1932. The answer cites that record but says 1938. Where is the demonstrated failure?",
      options: [
        {
          text: "The retrieval system failed to supply the date.",
          feedback:
            "The date was in the supplied record. Retrieval may have other weaknesses, but missing evidence is not the demonstrated failure here.",
        },
        {
          text: "The generated claim does not match the evidence it cites.",
          correct: true,
          feedback:
            "Exactly. Inspecting the passage lets you locate the failure after evidence was supplied. A citation is not an automatic claim check.",
        },
        {
          text: "The model needs permanent training on every archive document.",
          feedback:
            "This example does not establish that need. The correct information was already present in the current context.",
        },
      ],
    },
    sources: [rag, risk],
  },
  {
    id: "tools",
    title: "From answers to actions",
    headline: "A sentence can become",
    emphasis: "an action.",
    description:
      "Trace a tool request through the surrounding software. See why access, approval, and stopping rules matter.",
    question:
      "Predict: if a model asks to send an email, what actually sends it?",
    before: [
      {
        title: "The model proposes; software executes",
        paragraphs: [
          "A tool-enabled application exposes operations the model can request: search documents, calculate a result, inspect a calendar, or send a message. The model generates a structured request. Application code validates it and, if permitted, executes the operation.",
          "The tool result can then enter the next context. The model may use it to answer or request another tool. Repeating this cycle creates an agent-like workflow. It is a sequence of model calls and software operations, not a new kind of magic inside the weights.",
          "The distinction has practical consequences. A correct calculation can come from a calculator tool even if the model would have made an arithmetic mistake unaided. A failed tool call can leave the model with no result, and the application should not treat a plausible invented result as successful execution.",
        ],
      },
    ],
    after: [
      {
        title: "Untrusted text can imitate instructions",
        paragraphs: [
          "Imagine a retrieved document containing a sentence that asks the assistant to email an archive to an outside address. That sentence is part of a source, not authorization from the user. A prompt-injection attempt tries to cross this boundary by making source material behave like instructions.",
          "The lab is a small, authored decision exercise. Nothing is sent and no real tools are invoked. Its purpose is to distinguish the model’s proposal from the application’s authority. Even a model that usually rejects malicious text should operate behind enforceable access boundaries.",
          "Useful safeguards include restricted tool capabilities, validated arguments, limits on repeated actions, visible outcomes, and human approval where consequences warrant it. The appropriate boundary depends on the action. Reading an already authorized source and sending it elsewhere are different operations.",
        ],
      },
      {
        title: "Define success before running the loop",
        paragraphs: [
          "An agent needs a way to know when to stop. Without a clear stopping condition, retries can waste resources or repeat an unwanted action. An application should distinguish pending, failed, completed, and uncertain outcomes.",
          "Reliability comes from the whole workflow: good context, capable models, narrow tools, dependable validation, and checks on results. Increasing the model’s capability does not remove the need to design the surrounding software carefully.",
        ],
      },
    ],
    deeper: {
      title: "A minimal tool contract",
      paragraphs: [
        "A useful tool interface specifies the operation, accepted inputs, output structure, permissions, and error behavior. Application code should enforce those requirements independently of prose instructions. A request that looks valid to a reader can still contain an unauthorized destination or resource.",
        "For actions that may be retried, the application must also consider duplicate execution. If a response is lost after an email was sent, blindly repeating the request can send it twice. Tracking an operation’s identity and outcome is an application responsibility.",
      ],
    },
    lab: "tools",
    takeaway:
      "A model can request an action. The application must decide whether that action is permitted and whether it succeeded.",
    reflection:
      "Choose a tool an assistant could use in your work. What should it be allowed to do without asking, and where should it stop?",
    challenge: {
      question:
        "A retrieved PDF tells the assistant to upload the user’s files to a new service. The user only asked for a summary. What should happen?",
      options: [
        {
          text: "Treat the PDF as evidence to analyze; do not treat it as permission to upload.",
          correct: true,
          feedback:
            "Yes. The source can contain instructions as text, but it cannot authorize a new external action on the user’s behalf.",
        },
        {
          text: "Upload because the PDF is now part of the model context.",
          feedback:
            "Being present in context does not make text authoritative. Context membership and permission are different.",
        },
        {
          text: "Ask the model to lower its temperature before uploading.",
          feedback:
            "Decoding settings do not establish authorization. This needs an application-level boundary.",
        },
      ],
    },
    sources: [
      {
        title: "Schick et al. · Toolformer (2023)",
        url: "https://arxiv.org/abs/2302.04761",
      },
      risk,
    ],
  },
  {
    id: "judgment",
    title: "Judging the system",
    headline: "Fluent is easy to notice.",
    emphasis: "Reliable takes work.",
    description:
      "Bring the pieces together. Evaluate unfamiliar answers, weigh consequences, and choose an intervention that fits the failure.",
    question:
      "Predict: can two systems with the same average accuracy still differ greatly in whether you should use them?",
    before: [
      {
        title: "Evaluate the task, not the impression",
        paragraphs: [
          "A convincing demonstration shows that something can work. An evaluation asks when it works, when it fails, and what those failures cost. Start with a specific task: locating an archival passage, drafting an explanation, extracting dates, or carrying out a bounded action.",
          "Define acceptable behavior before inspecting results. A document assistant may need to cite supporting passages and decline questions the collection cannot answer. A drafting assistant may allow imaginative suggestions but require a human to verify factual claims. The same output can be useful in one setting and unacceptable in another.",
          "Test cases should include ordinary requests, ambiguity, missing evidence, contradictory sources, and unfamiliar phrasing. Separate retrieval quality, claim support, and action safety. A single aggregate number can conceal a serious weakness in a particular group or situation.",
        ],
      },
    ],
    after: [
      {
        title: "Benefits and costs are specific",
        paragraphs: [
          "Language models can help people draft, translate, explore ideas, or navigate information. Whether that help is valuable depends on the task, the user, accessibility, and the cost of checking. Measure what improves rather than assuming that faster generation always means better work.",
          "The infrastructure also uses energy, hardware, water in some cooling and power systems, and human labor. Impacts vary with workload, location, equipment, and accounting boundaries. A universal footprint per prompt is usually an inadequate description. Ask what is measured, what is excluded, and what alternative the use replaces.",
          "Training data and generated output raise questions about provenance, consent, attribution, and compensation. Legal answers depend on jurisdiction and circumstance. Ethical judgments also involve values that a technical benchmark cannot settle. A responsible decision makes those values and uncertainties explicit.",
        ],
      },
      {
        title: "Keep human capability in the loop",
        paragraphs: [
          "An assistant can extend what a person can do, but it can also encourage overreliance. If someone can no longer judge the work they delegate, a fluent error becomes harder to notice. Use the system in ways that preserve opportunities to practice, check, and disagree.",
          "The skills from this course form a diagnostic habit: inspect the context, understand what the model is doing, locate external tools and storage, check claims against evidence, and choose a repair at the appropriate layer.",
          "You do not need to understand every parameter to ask good questions. You do need to know which observations justify a conclusion. “It answered correctly once,” “it provided a citation,” and “it ran without an error” are useful observations. None alone establishes that the whole system is dependable.",
        ],
      },
    ],
    deeper: {
      title: "A small evaluation you can run yourself",
      paragraphs: [
        "Write ten representative tasks before trying the system. For each, define the necessary evidence and unacceptable outcomes. Keep a few cases aside while improving prompts or retrieval, then use them to check whether the improvement generalizes.",
        "Record the system version, date, inputs, relevant settings, and outputs. Test important cases more than once when output varies. Report categories of failure alongside aggregate results. For consequential decisions, include people with the domain expertise and authority to judge the outcome.",
      ],
    },
    lab: "evaluation",
    takeaway:
      "Choose a use case, define success, inspect failures, and account for their consequences. Confidence should follow evidence.",
    reflection:
      "Design a three-case evaluation for a task you care about: an ordinary case, a missing-evidence case, and a consequential failure.",
    challenge: {
      question:
        "A document assistant gets nine questions right and invents a source for the tenth. What should the next evaluation report include?",
      options: [
        {
          text: "Only 90% accuracy, because all mistakes are equivalent.",
          feedback:
            "An aggregate is useful, but it hides the type and consequences of this failure. Fabricated support deserves its own category.",
        },
        {
          text: "Only the successful examples, because the remaining case is unusual.",
          feedback:
            "The difficult case may be exactly where the system needs an explicit boundary or an improved check.",
        },
        {
          text: "The overall result, the unsupported-source failure, and tests of when it recurs.",
          correct: true,
          feedback:
            "Yes. A useful evaluation makes the failure actionable and helps decide whether the system is suitable for the intended task.",
        },
      ],
    },
    sources: [
      risk,
      {
        title: "IEA · Energy and AI (2025)",
        url: "https://www.iea.org/reports/energy-and-ai/",
      },
    ],
  },
];

export const labNames: Record<LabId, string> = {
  generators: "Compare two generation procedures",
  trace: "Inspect a model request",
  probability: "Tokens & probability",
  training: "Train one weight",
  attention: "The causal attention bench",
  context: "Pack the context",
  evidence: "Follow the evidence",
  tools: "Inspect the tool boundary",
  evaluation: "Diagnose an unfamiliar answer",
};
export const glossary = [
  {
    term: "Artificial intelligence (AI)",
    chapter: "landscape",
    definition:
      "The broad field of building systems for tasks such as reasoning, planning, perception, and language use. It includes approaches based on rules and search as well as learning.",
  },
  {
    term: "Machine learning (ML)",
    chapter: "landscape",
    definition:
      "Methods that fit models from data or experience. They can support classification, prediction, generation, and other tasks.",
  },
  {
    term: "Deep learning",
    chapter: "landscape",
    definition:
      "Machine-learning methods using neural networks with multiple layers to learn representations. Deep models can be generative or serve other tasks.",
  },
  {
    term: "Generative AI",
    chapter: "landscape",
    definition:
      "Systems used to synthesize content such as text, images, speech, or video. This describes a capability, not one particular architecture or generation procedure.",
  },
  {
    term: "Diffusion model",
    chapter: "landscape",
    definition:
      "A generative model trained to reverse a data-corruption process. Generation uses learned denoising updates; text variants can refine multiple positions within a sequence or block.",
  },
  {
    term: "Large language model (LLM)",
    chapter: "landscape",
    definition:
      "A language model trained at scale. Familiar generative LLMs often use autoregressive transformers, but text diffusion illustrates a different generation procedure.",
  },
  {
    term: "Generative adversarial network (GAN)",
    chapter: "landscape",
    definition:
      "A generative approach that trains a generator against a discriminator distinguishing generated samples from training examples.",
  },
  {
    term: "Variational autoencoder (VAE)",
    chapter: "landscape",
    definition:
      "A model with an encoder and decoder that learns a structured distribution of latent representations from which new samples can be decoded.",
  },
  {
    term: "Activation",
    chapter: "transformer",
    definition:
      "A temporary numerical value produced during a model computation. Hidden states contain activations; they differ from the learned parameters used to compute them.",
  },
  {
    term: "Agent",
    chapter: "tools",
    definition:
      "A system that uses a model in a loop to pursue a task, often by selecting tools and incorporating their results. Its capabilities depend on the surrounding software and permissions.",
  },
  {
    term: "Attention",
    chapter: "transformer",
    definition:
      "A mechanism that computes weighted combinations of information from permitted positions. It is one operation in a transformer, not a complete explanation of its output.",
  },
  {
    term: "Autoregression",
    chapter: "prediction",
    definition:
      "Generation in which each new token is conditioned on the preceding sequence, including previously generated tokens.",
  },
  {
    term: "Causal mask",
    chapter: "transformer",
    definition:
      "A restriction that prevents a position from attending to later positions in a causal decoder. Parallel computation does not remove this restriction.",
  },
  {
    term: "Context",
    chapter: "assistant",
    definition:
      "The input available for a particular model computation: instructions, messages, selected external information, and the generated sequence so far, as applicable.",
  },
  {
    term: "Context window",
    chapter: "assistant",
    definition:
      "The model’s finite capacity for a sequence of tokens. The application decides how to assemble requests within its limits.",
  },
  {
    term: "Embedding",
    chapter: "transformer",
    definition:
      "A numerical representation. Token embeddings begin the representation of vocabulary items; retrieval embeddings represent passages or queries for comparison. They serve different roles.",
  },
  {
    term: "Evaluation",
    chapter: "judgment",
    definition:
      "A structured way to test behavior against defined criteria on appropriate examples, including failures and their consequences.",
  },
  {
    term: "Fine-tuning",
    chapter: "training",
    definition:
      "Additional training that changes learned parameters, often to specialize behavior. Providing an example in a prompt is not by itself fine-tuning.",
  },
  {
    term: "Grounding",
    chapter: "evidence",
    definition:
      "Connecting claims to relevant supporting evidence. A claim can be supported by a source whose own accuracy still needs evaluation.",
  },
  {
    term: "Hallucination",
    chapter: "evidence",
    definition:
      "Generated content that is false or unsupported in the relevant context, often presented fluently. Diagnose the specific failure rather than treating the label as an explanation.",
  },
  {
    term: "Hidden state",
    chapter: "transformer",
    definition:
      "A temporary numerical representation at a position and stage in the model. It changes as layers transform the available information.",
  },
  {
    term: "In-context learning",
    chapter: "training",
    definition:
      "Adaptation through examples or instructions supplied in the current context, without an ordinary inference-time update to the model’s weights.",
  },
  {
    term: "Inference",
    chapter: "answer",
    definition:
      "Using a trained model to compute outputs. In ordinary inference, learned parameters stay fixed while temporary internal states change.",
  },
  {
    term: "Logit",
    chapter: "prediction",
    definition:
      "An unnormalized score. In text generation, final logits assign scores to candidate next tokens before conversion to probabilities.",
  },
  {
    term: "Loss",
    chapter: "training",
    definition:
      "A numerical measure of prediction error used as a training objective. A lower value on training examples does not establish better performance on every new task.",
  },
  {
    term: "MLP",
    chapter: "transformer",
    definition:
      "A multilayer perceptron: a feed-forward network applying learned transformations and nonlinearities. In a typical transformer block, it transforms each position separately.",
  },
  {
    term: "Parameter / weight",
    chapter: "training",
    definition:
      "A learned numerical value used in a model’s computation. Training adjusts parameters; ordinary generation uses them.",
  },
  {
    term: "Post-training",
    chapter: "assistant",
    definition:
      "Training after broad pretraining that shapes capabilities or behavior, including instruction following and responses favored by feedback or reward signals.",
  },
  {
    term: "Prompt injection",
    chapter: "tools",
    definition:
      "An attempt to make untrusted content, such as a retrieved document, act as instructions that redirect the system beyond the intended task.",
  },
  {
    term: "RAG",
    chapter: "evidence",
    definition:
      "Retrieval-augmented generation: a system combines retrieved external information with model generation. Supplying retrieved information does not normally update the generator’s weights.",
  },
  {
    term: "Sampling",
    chapter: "prediction",
    definition:
      "Drawing an outcome according to a probability distribution. It can select a lower-probability candidate; greedy selection chooses a highest-scoring candidate.",
  },
  {
    term: "Softmax",
    chapter: "prediction",
    definition:
      "A calculation that turns scores into nonnegative probabilities adding to one by exponentiating and normalizing them.",
  },
  {
    term: "Temperature",
    chapter: "prediction",
    definition:
      "A positive scaling factor applied to logits before sampling. Lower values sharpen the distribution; higher values flatten it. It does not measure truth.",
  },
  {
    term: "Tensor",
    chapter: "transformer",
    definition:
      "An array of numbers organized along one or more axes, such as positions and features. Vectors and matrices are familiar special cases.",
  },
  {
    term: "Token",
    chapter: "prediction",
    definition:
      "An encoded piece of text or other input/output representation. For text, token boundaries may not match word or character boundaries.",
  },
  {
    term: "Tool",
    chapter: "tools",
    definition:
      "An operation provided by application software that a model can request. The application controls permissions, execution, and reporting of results.",
  },
  {
    term: "Transformer",
    chapter: "transformer",
    definition:
      "A neural-network architecture built around attention and other transformations of representations. This guide focuses on a typical causal decoder for text generation.",
  },
  {
    term: "Vector",
    chapter: "transformer",
    definition:
      "A list of numbers that can represent features or be transformed by a model. Its dimensions need not correspond to individual human-named concepts.",
  },
];
