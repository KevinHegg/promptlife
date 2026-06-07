import React from 'react'
import { canonicalPromptResponse } from '../data/canonicalExamples'
import { lessons } from '../data/content'
import { generatedVisualAssetById } from '../data/visualAssets'
import {
  DiagramKitAiFamilyTreeExample,
  DiagramKitGallery,
  DiagramKitOverfittingPlotExample,
  DiagramKitTraditionsExample,
  DiagramKitTrainingLoopExample
} from './DiagramKit'

export const visualAidStyleVariants = [
  { id: 'paper-diagram', label: 'Paper diagram', use: 'Exact, calm diagrams.' },
  { id: 'generated-image', label: 'Generated image', use: 'Textless concept art with HTML callouts.' },
  { id: 'neon-flow', label: 'Neon flow', use: 'Prompt to model to token flows.' },
  { id: 'origami-object', label: 'Origami object', use: 'Tensors, layers, and transformations.' },
  { id: 'zen-garden-map', label: 'Zen garden map', use: 'Alignment, risk, hallucination, and ethics.' },
  { id: 'retrieval-shelf', label: 'Retrieval shelf', use: 'RAG, grounding, and evidence entering context.' }
]

function getVisualAidVariant(aid) {
  if (aid.generatedAssetId) return 'generated-image'
  if (aid.variant) return aid.variant
  if (['llmOverview', 'promptResponse', 'inference', 'softmax', 'sampling', 'loop'].includes(aid.pattern)) return 'neon-flow'
  if (['tensor', 'layers', 'mlp', 'bars', 'vector', 'hidden', 'aiTopology'].includes(aid.pattern)) return 'origami-object'
  if (['alignment', 'risk', 'overfitting', 'diffusion'].includes(aid.pattern)) return 'zen-garden-map'
  if (aid.pattern === 'rag') return 'retrieval-shelf'
  return 'paper-diagram'
}

function getGeneratedAsset(aid) {
  return aid.generatedAssetId ? generatedVisualAssetById[aid.generatedAssetId] : null
}

function generatedAid(assetId, fields) {
  const asset = generatedVisualAssetById[assetId]
  return {
    ...fields,
    pattern: 'generatedImage',
    variant: 'generated-image',
    generatedAssetId: asset.id,
    objective: asset.purpose,
    callouts: asset.callouts,
    keyTakeaway: asset.keyTakeaway,
    accessibleDescription: asset.accessibilityDescription,
    printNote: asset.sourceNote
  }
}

export const visualAidCatalog = [
  generatedAid('before-morning-llm-cloud', { id: 'before-morning-llm-cloud', title: 'Prompt to Prediction', subtitle: 'Score, choose, append, repeat', caption: 'Current context enters the model, learned weights shape next-token probabilities, one token is generated, and the response grows token by token.' }),
  { id: 'ai-family-tree', title: 'AI Family Tree', subtitle: 'Where LLMs fit', caption: 'A clean taxonomy tree shows AI as the broad field, machine learning as one branch inside AI, and LLMs as one branch inside generative AI.', pattern: 'aiTopology', objective: 'Give learners a simple topology of AI categories before the history card introduces rules-first and learned-pattern traditions.', callouts: [{ heading: 'AI', body: 'AI is the broad field.' }, { heading: 'Machine learning', body: 'Machine learning systems learn patterns from data.' }, { heading: 'Deep learning', body: 'Deep learning is a neural-network branch of machine learning.' }, { heading: 'Generative AI', body: 'Generative AI creates new media, such as text, images, audio, code, or video.' }, { heading: 'LLMs', body: 'LLMs generate language/code; diffusion and multimodal systems are neighboring generative AI branches.' }], keyTakeaway: 'An LLM is one kind of generative AI inside the broader AI family.', accessibleDescription: 'A taxonomy tree starts at AI. One branch is Rule-based AI. Another branch is Machine learning, which splits into Classical ML and Deep learning. Deep learning splits into Other deep learning and Generative AI. Generative AI branches into LLMs, Diffusion, and Multimodal systems.', printNote: 'Coded SVG only; no generated PNG asset. Keep the taxonomy labels in SVG and the definitions in HTML callouts below the diagram.' },
  { id: 'traditions', title: 'Rules and Learned Patterns', subtitle: 'Two traditions, one modern toolkit', caption: 'Rules-first AI uses symbols and if-then logic; deep learning learns from examples by predicting, measuring loss, and updating weights.', pattern: 'traditions', objective: 'Contrast explicit rules with learned patterns without turning the diagram into a poster.', callouts: [{ heading: 'Rules', body: 'Symbolic systems use explicit if/then logic and symbols.' }, { heading: 'Examples', body: 'Loss is the training signal: it measures prediction error so weights can be adjusted.' }, { heading: 'Bridge', body: 'Modern systems often combine learned models with rules, retrieval, tools, filters, and policies.' }], keyTakeaway: 'Modern AI often blends learned patterns with hand-built rules and tools.', accessibleDescription: 'Two side-by-side panels compare rules, symbols, and if-then logic with examples, loss as a prediction-error signal, and weights, joined by a bridge labeled combine both.', printNote: 'Short panel labels only; explanatory comparison stays in HTML callouts.' },
  { id: 'training-loop', title: 'Training Loop', subtitle: 'Durable change happens at weight update', caption: 'Predict, compare, loss, update weights, repeat. Training changes weights.', pattern: 'training', objective: 'Show the sequence of training and make the durable weight-update step visually distinct.', callouts: [{ heading: 'Predict', body: 'The model predicts a target.' }, { heading: 'Compare', body: 'The prediction is compared with the target.' }, { heading: 'Loss', body: 'Loss measures error.' }, { heading: 'Update weights', body: 'Weight updates are the durable-change step.' }, { heading: 'Repeat', body: 'The loop repeats many times.' }], keyTakeaway: 'Training changes weights; ordinary inference does not.', accessibleDescription: 'A five-step loop moves from Predict to Compare to Loss to Update weights to Repeat, with Update weights highlighted.', printNote: 'Five nodes stay aligned at 320px and in exported review PDFs.' },
  generatedAid('before-morning-pretraining-landscape', { id: 'before-morning-pretraining-landscape', title: 'Broad Pretraining', subtitle: 'Scale, not perfect recall', caption: 'Many examples flow through the training loop. Repeated updates shape weights into broad patterns the model can use later. This does not make the model a perfect memory of its sources.' }),
  { id: 'overfitting-generalization', title: 'Overfitting vs Generalization', caption: 'Memorizing training examples is not the same as learning patterns that transfer to held-out examples.', pattern: 'overfitting', legend: ['Training examples are old dots the model fit during training.', 'Held-out examples are new dots used to test transfer.', 'The overfit curve traces old dots too tightly.', 'The generalizing curve is smoother and reaches new examples.'] },
  generatedAid('before-morning-finetuning-path', { id: 'before-morning-finetuning-path', title: 'Fine-Tuning Path', subtitle: 'Durable adaptation after pretraining', caption: 'Fine-tuning starts from a pretrained base, adds targeted examples or preference data, and shapes future responses more durably than one prompt.' }),
  generatedAid('before-morning-alignment-garden', { id: 'before-morning-alignment-garden', title: 'Alignment Landscape', subtitle: 'Shaping behavior, not conscience', caption: 'Alignment encourages preferred behavior, uses guardrails to reduce risky paths, and relies on feedback and policies without giving the model a conscience.' }),
  { id: 'inference-pass', title: 'Forward Pass', subtitle: 'Fixed weights, temporary activations', caption: 'Inference uses fixed weights to create temporary activations, hidden states, and next-token scores.', pattern: 'inference', objective: 'Make temporary inference state central while keeping durable weights visibly fixed.', callouts: [{ heading: 'Context', body: 'The current prompt, retrieved text, conversation, and response-so-far enter the run.' }, { heading: 'Fixed weights', body: 'The learned weights are used but not normally updated.' }, { heading: 'Temporary activations', body: 'The run creates temporary internal states that lead to next-token scores.' }, { heading: 'Next token', body: 'Decoding chooses one response token, then the loop can repeat.' }], keyTakeaway: 'Inference is a forward pass, not durable training.', accessibleDescription: 'The diagram sends current context through fixed weights into a central temporary activation tray, then toward next-token scores and one generated token.', printNote: 'Keep temporary activations as the largest central label; no generated PNG needed.' },
  { id: 'prompt-response', title: 'Prompt vs Response', subtitle: 'Given context versus generated tokens', caption: 'A complete user prompt is given; response-so-far and the next token are generated pieces of context.', pattern: 'promptResponse', objective: 'Separate the complete user prompt from response-so-far, next token, and the current context for the next run.', callouts: [{ heading: 'User prompt', body: `The complete request is: ${canonicalPromptResponse.userPrompt}` }, { heading: 'Response so far', body: `The model has already generated: ${canonicalPromptResponse.responseSoFar}.` }, { heading: 'Next token', body: `${canonicalPromptResponse.chosenNextToken} is appended to the response.` }, { heading: 'Current context', body: 'The next run sees prompt plus response-so-far plus the appended token.' }], keyTakeaway: 'Prompt is given; response tokens are generated and appended.', accessibleDescription: 'A compact three-row visual shows User prompt, Response so far, Next token, and then a current-context tray below them.', printNote: 'Coded SVG/HTML only; do not bake long text into the visual.' },
  { id: 'tokenization', title: 'Text to Tokens', subtitle: 'Uneven chunks, punctuation included', caption: 'Text is split into model-readable chunks before token IDs and embedding lookup.', pattern: 'token', objective: 'Show that tokens can be words, word pieces, punctuation, or other chunks.', callouts: [{ heading: 'Simplified split', body: 'A | jealous | dog | chased | a | startled | cat | across | the | kitchen | floor | .' }, { heading: 'Uneven chunks', body: 'Some tokenizers may split words or punctuation, such as start | led or floor | .' }, { heading: 'Teaching note', body: 'This app uses a simplified split; real tokenizer output can differ.' }], keyTakeaway: 'Tokens are model-readable chunks, not always human words.', accessibleDescription: 'The visual starts with a sentence, then shows simplified token chips and uneven examples for startled and floor punctuation.', printNote: 'Keep token chips wrapping; avoid dense tokenizer internals.' },
  { id: 'token-ids', title: 'Token IDs', subtitle: 'Lookup keys, not meaning', caption: 'Each token gets a lookup number that points to an embedding-table row.', pattern: 'ids', objective: 'Separate the token string, its numeric ID, and the embedding row the ID selects.', callouts: [{ heading: 'Token', body: 'dog, cat, and floor are text chunks.' }, { heading: 'ID', body: '421, 982, and 1576 are lookup keys.' }, { heading: 'Embedding row', body: 'The ID points to the learned starting vector row.' }, { heading: 'Limit', body: 'The number itself is not the meaning.' }], keyTakeaway: 'Token IDs point; they do not understand.', accessibleDescription: 'Three token cards connect to ID cards, which connect to highlighted rows in an embedding table.', printNote: 'Coded visual only because the exact labels matter.' },
  { id: 'embeddings', title: 'Embedding Lookup', subtitle: 'Durable table, temporary vector', caption: 'A token ID retrieves a learned starting vector from a durable embedding table.', pattern: 'vector', objective: 'Distinguish the durable learned table from the temporary vector retrieved for the current run.', callouts: [{ heading: 'Durable table', body: 'The embedding table was learned during training.' }, { heading: 'Temporary retrieval', body: 'Inference retrieves one row for the current context.' }, { heading: 'Starting vector', body: 'The retrieved vector starts the token in numerical space.' }, { heading: 'Hidden state later', body: 'Transformer layers later reshape it into context-shaped hidden states.' }], keyTakeaway: 'Embedding means learned starting vector, not dictionary definition.', accessibleDescription: 'ID 1576 points into a durable table, retrieves one temporary vector, and then a later hidden-state note sits downstream.', printNote: 'Best future Image 2 candidate, but this pass keeps a coded visual.' },
  { id: 'vectors', title: 'Feature Vector', subtitle: 'Teaching labels versus distributed features', caption: 'A vector is a list of numbers; real features are distributed rather than neat English sliders.', pattern: 'bars', objective: 'Let learners compare a simplified slider view with unlabeled distributed numerical features.', callouts: [{ heading: 'Teaching sliders', body: 'Labels such as animal-ish or tone are simplified for learning.' }, { heading: 'Distributed features', body: 'Real model features are spread across many dimensions.' }, { heading: 'Why vectors', body: 'Vectors let the model compute with fuzzy numerical relationships.' }], keyTakeaway: 'Vectors are useful because many fuzzy features can vary at once.', accessibleDescription: 'The visual contrasts labeled teaching sliders with unlabeled distributed bars and dots.', printNote: 'Do not imply each dimension has a clean human label.' },
  { id: 'tensors', title: 'Tensor Block', subtitle: 'Token axis plus feature axis', caption: 'Tensors organize many token vectors so model layers can process them.', pattern: 'tensor', objective: 'Show token positions, feature dimensions, and an optional batch note without a heavy 3D library.', callouts: [{ heading: 'Token axis', body: 'Each row can represent one visible token position.' }, { heading: 'Feature axis', body: 'Each column can represent one vector dimension.' }, { heading: 'Batch note', body: 'Systems may process shapes like batch x tokens x features.' }], keyTakeaway: 'Tensors are shaped numerical blocks, not mystery objects.', accessibleDescription: 'A lightweight axis diagram shows token labels down the side, feature labels across the top, and a translucent batch sheet behind the grid.', printNote: 'Readable at 320px; no new dependency or generated PNG.' },
  { id: 'attention', title: 'Attention Weave', subtitle: 'Relevance, not awareness', caption: 'Attention assigns temporary relevance weights between token positions in the current context.', pattern: 'attention', objective: 'Use a concrete sentence to show that attention weights token relevance without implying awareness.', callouts: [{ heading: 'Current context', body: 'The visible tokens include dog, cat, because, it, and hissed.' }, { heading: 'Strong relation', body: 'In this sentence, it is most relevant to cat.' }, { heading: 'Weaker relation', body: 'dog is nearby and possible in other sentences, but it hissed points to cat here.' }, { heading: 'Limit', body: 'Attention computes relevance weights. It is not human awareness.' }], keyTakeaway: 'Attention is relevance between token positions, not consciousness.', accessibleDescription: 'The diagram shows token nodes dog, cat, because, it, and hissed. A strong arc connects it to cat, and a weaker arc connects it to dog, with a label saying relevance, not awareness.', printNote: 'Keep this coded SVG; token labels and exact relationships matter too much for a generated PNG.' },
  { id: 'mlp', title: 'MLP Feature Workshop', subtitle: 'Same token, reshaped features', caption: 'After attention mixes across tokens, the MLP reshapes features within each token position.', pattern: 'mlp', objective: 'Show the attention-versus-MLP distinction: attention mixes token positions; MLP reshapes each token vector independently.', callouts: [{ heading: 'Attention first', body: 'Token positions can exchange current-context information.' }, { heading: 'Same position', body: 'The example token cat stays in the same position.' }, { heading: 'MLP reshape', body: 'Feature bars change for that token position.' }, { heading: 'Temporary values', body: 'The MLP has durable weights, but the feature values during inference are temporary activations.' }], keyTakeaway: 'Attention mixes across positions; the MLP reshapes features within a position.', accessibleDescription: 'The diagram shows an attention step where token positions exchange context, then one cat token moves into an MLP panel where its feature bars change from before to after.', printNote: 'Coded SVG only; no generated PNG or heavy 3D library.' },
  { id: 'layers', title: 'Transformer Stack', subtitle: 'Repeated attention plus MLP', caption: 'Layers repeat attention and MLP transformations to refine temporary hidden states.', pattern: 'layers', objective: 'Show repeated transformer blocks without implying human thought steps.', callouts: [{ heading: 'Input states', body: 'Current-context hidden states enter the stack.' }, { heading: 'Repeated block', body: 'Each layer applies attention and an MLP, with residual paths and normalization helping signal flow.' }, { heading: 'Output states', body: 'Refined hidden states continue toward next-token scores.' }, { heading: 'Limit', body: 'Layers are repeated numerical transformations, not conscious reasoning steps.' }], keyTakeaway: 'Layers refine hidden states; they do not store permanent memory.', accessibleDescription: 'A vertical stack shows input hidden states moving through Layer 1, Layer 2, and Layer 3, each labeled attention plus MLP, then into output hidden states.', printNote: 'Light coded stack/inspector approach; no heavy 3D dependency.' },
  { id: 'hidden-states', title: 'Hidden State Flow', subtitle: 'Temporary during this forward pass', caption: 'A token starts with an embedding and becomes context-shaped hidden states as it moves through layers.', pattern: 'hidden', objective: 'Contrast embedding, hidden state, weight, memory, and visible text without making hidden states mysterious.', callouts: [{ heading: 'Embedding', body: 'A learned starting vector is retrieved for a token ID.' }, { heading: 'Hidden states', body: 'Layers reshape that vector into temporary context-shaped states.' }, { heading: 'Scores later', body: 'Final hidden states help produce next-token scores.' }, { heading: 'Not memory', body: 'A hidden state is not visible text, permanent memory, or a stored fact.' }], keyTakeaway: 'Hidden states are temporary internal vectors shaped by current context.', accessibleDescription: 'A flow moves from Token ID to Embedding, then Layer 1 hidden state, Layer 2 hidden state, Final hidden state, and next-token scores. A side note contrasts durable weights with temporary hidden states and says memory is not what this is.', printNote: 'Keep this as a coded contrast diagram because labels are essential.' },
  { id: 'logits', title: 'Raw Scoreboard', subtitle: 'Before probabilities', caption: 'The final hidden state feeds candidate next-token scores. These logits rank candidates, but they are raw scores, not probabilities or truth.', pattern: 'logits', objective: 'Show final hidden state becoming raw vocabulary scores before softmax.', callouts: [{ heading: 'Hidden state arrives', body: 'The final context-shaped vector reaches the output scoring step.' }, { heading: 'Candidates get scores', body: 'Possible next tokens such as floor, room, counter, and quantum receive raw logits.' }, { heading: 'Scores rank candidates', body: 'Higher score means stronger local candidate, not guaranteed truth.' }, { heading: 'Softmax comes next', body: 'Softmax converts raw scores into probabilities.' }], keyTakeaway: 'Logits are raw next-token scores, not probabilities and not truth.', accessibleDescription: 'The diagram starts with a final hidden state flowing into an output score panel. Candidate tokens floor, room, counter, and quantum have raw score bars from high to very low. A label says raw scores, not probabilities.', printNote: 'Coded SVG only; exact candidate labels and raw-score bars matter.' },
  { id: 'softmax', title: 'Score to Probability', subtitle: 'Normalize before choosing', caption: 'Softmax converts raw logits into probabilities that sum to 100%. High probability means likely under the model, not guaranteed true.', pattern: 'softmax', objective: 'Show raw-score values becoming rounded probabilities that sum to one.', callouts: [{ heading: 'Logits go in', body: 'Raw scores such as 8.2, 5.1, 2.0, and -1.0 enter softmax.' }, { heading: 'Softmax converts', body: 'The function turns score differences into a probability distribution.' }, { heading: 'Probabilities come out', body: 'The rounded teaching values sum to 100%.' }, { heading: 'Not truth', body: 'Probability is about model likelihood, not evidence or correctness.' }], keyTakeaway: 'Softmax turns raw scores into probabilities; it does not verify truth.', accessibleDescription: 'The diagram shows raw logits for floor, room, counter, and quantum on the left, a softmax arrow in the middle, and probabilities of 86 percent, 12 percent, 2 percent, and about zero percent on the right with a sum equals 100 percent note.', printNote: 'Coded SVG only; values are rounded teaching numbers and should remain visible at 320px.' },
  { id: 'sampling', title: 'Weighted Token Choice', subtitle: 'One token chosen', caption: 'Sampling chooses one next response token from probabilities. Probability is not truth: a low-probability token can still be possible, and a likely token can still be unsupported.', pattern: 'sampling', objective: 'Show probability weights and the single selected next token before autoregression repeats.', callouts: [{ heading: 'Probability candidates', body: 'floor is strongest, room is plausible, counter is weak, and quantum is barely likely in this context.' }, { heading: 'One token chosen', body: 'The decoding step chooses one next response token.' }, { heading: 'Append next', body: 'The chosen token is appended before the model runs again.' }, { heading: 'Not truth', body: 'A likely token can still be unsupported or wrong in a wider factual claim.' }], keyTakeaway: 'Sampling chooses one token from probabilities; probability is not truth.', accessibleDescription: 'The diagram shows weighted candidates floor at 86 percent, room at 12 percent, counter at 2 percent, and quantum at about zero percent. A highlighted selected-token card says floor and a note says one token chosen. Probability is not truth.', printNote: 'Coded SVG only; keep temperature/top-k/top-p out of the main visual.' },
  { id: 'autoregression', title: 'Append and Repeat', caption: 'The chosen token is appended, then the model runs again.', pattern: 'loop' },
  { id: 'context-window', title: 'Temporary Context Window', caption: 'Only visible context can influence the next token.', pattern: 'window' },
  { id: 'rag-retrieval', title: 'Open-Book Retrieval', subtitle: 'Retrieval plus context, not training', caption: 'Retrieved notes enter the context before response tokens are generated.', pattern: 'rag', variant: 'retrieval-shelf', objective: 'Show that RAG retrieves outside information and places it into context; it does not train the model.', callouts: [{ heading: 'Ask', body: 'The user prompt starts the run.' }, { heading: 'Retrieve', body: 'A search system finds relevant outside material.' }, { heading: 'Add to context', body: 'Retrieved notes become temporary context tokens.' }, { heading: 'Generate', body: 'The model still generates response tokens one at a time.' }, { heading: 'Weights stay fixed', body: 'RAG does not normally update model weights.' }], keyTakeaway: 'RAG is retrieval plus context, not training.', accessibleDescription: 'The RAG diagram moves from Prompt to Retriever to Notes, then into a Context tray and Generated response, with a separate fixed-weights note.', printNote: 'v0.10 pilot visual: paper-layer nodes, subtle neon retrieval path, HTML callouts, and a one-sentence takeaway.' },
  { id: 'grounding-evidence', title: 'Evidence Anchor', subtitle: 'Tying answers to evidence', caption: 'Evidence enters context so the generated response can stay connected to sources.', pattern: 'groundingEvidence', variant: 'retrieval-shelf', objective: 'Show grounding as evidence plus generated response, not a truth guarantee.', callouts: [{ heading: 'Evidence', body: 'Retrieved documents, data, citations, or tool results can enter the current run.' }, { heading: 'Context', body: 'The evidence becomes visible input, not permanent model memory.' }, { heading: 'Answer', body: 'The response should stay connected to the evidence while still being reviewed.' }, { heading: 'Limit', body: 'Grounding helps, but it can fail when retrieval is poor or the model misuses evidence.' }], keyTakeaway: 'Grounding helps tie an answer to evidence; it does not guarantee truth.', accessibleDescription: 'Evidence cards are placed into a context tray, then an answer card is tied back to them with an anchor line.', printNote: 'Keep the diagram sparse; evidence and limitation detail stays in HTML callouts.' },
  { id: 'hallucination-bridge', title: 'Unsupported Bridge', subtitle: 'Fluent is not always grounded', caption: 'A response can look smooth while missing evidence supports.', pattern: 'hallucinationBridge', variant: 'zen-garden-map', objective: 'Show hallucination as fluent generated output without enough evidence support.', callouts: [{ heading: 'Fluent surface', body: 'The output may read smoothly and confidently.' }, { heading: 'Missing support', body: 'Some claims may lack evidence, citation, or retrieved context.' }, { heading: 'Generation', body: 'Likely-token generation is not the same as truth verification.' }, { heading: 'Review', body: 'Grounding, retrieval, uncertainty, and human review reduce risk but do not erase it.' }], keyTakeaway: 'Fluency is not evidence.', accessibleDescription: 'A smooth output bridge crosses the scene while several evidence pillars are missing underneath.', printNote: 'Use short labels only; the “not lying” distinction remains in lesson copy.' },
  { id: 'ai-learns', title: 'Learning Modes', caption: 'Durable training, retrieval, and temporary steering change different things.', pattern: 'learns' },
  { id: 'diffusion', title: 'Denoise, Not Append', caption: 'Diffusion refines noise step by step instead of generating text token by token.', pattern: 'diffusion' },
  { id: 'multimodal', title: 'Shared Media Hub', caption: 'Different media types can connect through learned representations.', pattern: 'multimodal' },
  { id: 'perfect-storm', title: 'Storm Front', subtitle: 'Why LLMs arrived now', caption: 'Data, compute, methods, labor, and incentives converged into modern LLM capability.', pattern: 'perfectStorm', variant: 'zen-garden-map', objective: 'Show convergence without implying one magic breakthrough.', callouts: [{ heading: 'Data', body: 'Human-created text, media, code, and documents supplied patterns.' }, { heading: 'Compute', body: 'Hardware, storage, and data centers made large-scale training possible.' }, { heading: 'Methods', body: 'Deep learning and transformer advances shaped the architecture.' }, { heading: 'Labor and incentives', body: 'Human evaluation work and market incentives pushed systems into products.' }], keyTakeaway: 'Modern LLMs came from a convergence, not a single spark.', accessibleDescription: 'Five streams labeled Data, Compute, Methods, Labor, and Incentives flow into a central model shape.', printNote: 'Keep labels short; detailed ingredients remain in HTML callouts.' },
  { id: 'collective-intelligence-lantern', title: 'Borrowed Flames', subtitle: 'No creators, no model', caption: 'Model usefulness depends on patterns from human-created language, art, code, research, and culture.', pattern: 'collectiveLantern', variant: 'zen-garden-map', objective: 'Make human-created source traces visible without treating the model as humanity’s mind.', callouts: [{ heading: 'Human expression', body: 'Books, sites, code, art, journalism, forums, documentation, and research leave learnable traces.' }, { heading: 'Collection questions', body: 'Consent, transparency, provenance, copyright, and compensation matter.' }, { heading: 'Model limit', body: 'The model absorbs patterns statistically; it does not understand gratitude or responsibility.' }], keyTakeaway: 'The model did not create its abilities alone.', accessibleDescription: 'Small source cards light a paper lantern that sends a glow toward a model cloud.', printNote: 'No dense source labels inside the lantern; callouts carry the explanation.' },
  { id: 'benefits-tool-garden', title: 'Tool Garden', subtitle: 'Benefits without utopia', caption: 'AI is most useful when it amplifies human judgment, access, search, drafting, translation, and research support.', pattern: 'benefitsGarden', variant: 'zen-garden-map', objective: 'Separate real bounded benefits from utopian claims.', callouts: [{ heading: 'Demonstrated', body: 'Accessibility, translation support, summarization, search/RAG, drafting, and coding assistance can help under review.' }, { heading: 'Plausible', body: 'Tutoring support, research triage, brainstorming, and workflow support need context and evidence.' }, { heading: 'Speculative', body: 'Broad utopia or replacement claims should not be stated as fact.' }], keyTakeaway: 'Benefits can be real and still bounded.', accessibleDescription: 'A central human node is surrounded by tool shapes for access, search, draft, translate, code, and research.', printNote: 'Evidence-tier chips stay in HTML callouts below the scene.' },
  { id: 'costs-invisible-factory', title: 'Invisible Factory', subtitle: 'The answer is not weightless', caption: 'AI systems can carry physical, labor, privacy, cultural, and power costs that need honest accounting.', pattern: 'costsFactory', variant: 'zen-garden-map', objective: 'Make hidden costs visible without inventing statistics or fear-heavy imagery.', callouts: [{ heading: 'Infrastructure', body: 'Energy, water, carbon, data centers, chips, and e-waste vary by system and workload.' }, { heading: 'Human systems', body: 'Labor disruption, deskilling, privacy, bias, and information pollution depend on deployment choices.' }, { heading: 'Power', body: 'Concentration of data, compute, and capital affects who benefits and who decides.' }], keyTakeaway: 'Costs vary, but they are real enough to count.', accessibleDescription: 'A bright answer card connects to factory, power, water, data, labor, and policy nodes.', printNote: 'No precise numbers in the visual; use cautious callouts.' },
  { id: 'human-centered-ai-garden', title: 'Human Center', subtitle: 'Tools should serve dignity', caption: 'AI should support human dignity, learning, responsibility, creativity, relationships, and the common good.', pattern: 'humanGarden', variant: 'zen-garden-map', objective: 'Center people and accountability rather than model power.', callouts: [{ heading: 'Human judgment', body: 'People remain accountable for high-stakes decisions and institutional use.' }, { heading: 'Dignity', body: 'Speed, profit, and automation should not outrank persons, learning, or relationships.' }, { heading: 'Model limit', body: 'A model can sound ethical without moral understanding.' }], keyTakeaway: 'Powerful tools still need human purpose.', accessibleDescription: 'A human-centered garden sits in the middle while AI tool orbits remain outside the human circle.', printNote: 'Avoid robot imagery; the human center is the visual anchor.' },
  { id: 'responsible-ai-forked-path', title: 'Forked Path', subtitle: 'Responsible AI is chosen', caption: 'AI outcomes are shaped by design, deployment, governance, incentives, and institutional choices.', pattern: 'responsiblePath', variant: 'zen-garden-map', objective: 'Show extractive and responsible paths without pretending governance is simple.', callouts: [{ heading: 'Technical choices', body: 'Smaller models, efficient inference, distillation, RAG, and better hardware use can fit some tasks.' }, { heading: 'Data choices', body: 'Provenance, consent, licensing, creator compensation, and privacy-preserving deployment matter.' }, { heading: 'Institutional choices', body: 'Human review, policy, labor transition planning, public-interest models, and independent evaluation shape outcomes.' }], keyTakeaway: 'Harms are shaped by choices, not destiny.', accessibleDescription: 'A path splits into extractive and responsible routes, with a human decision marker at the fork.', printNote: 'Keep the fork simple; mitigations stay in HTML callouts.' },
  { id: 'prompting-context-tray', title: 'Context Tray', subtitle: 'Prompting steers this run', caption: 'Good prompts pack task, context, constraints, examples, evidence needs, uncertainty, review, and format into the current run.', pattern: 'promptingTray', variant: 'retrieval-shelf', objective: 'Show prompting as context design, not permanent teaching.', callouts: [{ heading: 'Prompt parts', body: 'Task, context, constraints, examples, and format shape the current input.' }, { heading: 'Evidence and uncertainty', body: 'Source needs, retrieved context, and uncertainty requests can improve reviewability.' }, { heading: 'Boundary', body: 'Prompting usually changes context, not weights.' }], keyTakeaway: 'Prompting is context design for one run.', accessibleDescription: 'Prompt component cards drop into a transparent context tray before one generated response leaves it.', printNote: 'Use short component labels inside the tray.' },
  { id: 'synthesis-map-compass-lantern', title: 'Map, Compass, Lantern', subtitle: 'Mechanics plus judgment', caption: 'Model literacy connects training, inference, context, generation, RAG, grounding, benefits, costs, and responsibility.', pattern: 'synthesisMap', variant: 'zen-garden-map', objective: 'Close the Journey by connecting mechanics and human consequences.', callouts: [{ heading: 'Map', body: 'Training changes weights; inference uses weights; context steers the current run.' }, { heading: 'Compass', body: 'RAG and grounding can help, but humans still judge evidence and consequences.' }, { heading: 'Lantern', body: 'Benefits and costs are real; model-literate people ask better questions.' }], keyTakeaway: 'Mechanics matter, and humans remain responsible.', accessibleDescription: 'A learner uses a map, compass, and lantern to connect model mechanics with human responsibility.', printNote: 'This is the final synthesis visual; keep it calm and sparse.' },
  { id: 'risk', title: 'Risk or Myth', caption: 'Clear mechanisms help separate practical risk from magical stories.', pattern: 'risk' }
]

const aidById = Object.fromEntries(visualAidCatalog.map((aid) => [aid.id, aid]))
const lessonByVisualAidId = Object.fromEntries(lessons.map((lesson) => [lesson.visualAidId, lesson]))

function getCallouts(aid) {
  if (aid.callouts?.length) {
    return aid.callouts.map((callout, index) => ({
      number: callout.number ?? index + 1,
      heading: callout.heading ?? `Step ${index + 1}`,
      body: callout.body
    }))
  }

  return (aid.legend ?? []).map((body, index) => ({
    number: index + 1,
    heading: `Point ${index + 1}`,
    body
  }))
}

// Visual aids must use short in-diagram labels plus HTML callouts because mobile
// screens and PDF export cannot reliably preserve dense SVG text layouts.
export function VisualAid({ id, headingId = undefined, compact = false }) {
  const aid = aidById[id] ?? aidById['before-morning-llm-cloud']
  return <VisualAidCard aid={aid} headingId={headingId} compact={compact} />
}

function VisualAidCard({ aid, headingId = undefined, compact = false }) {
  const callouts = getCallouts(aid)
  const variant = getVisualAidVariant(aid)
  const asset = getGeneratedAsset(aid)
  const className = [
    'visual-aid',
    'visual-aid-card',
    asset ? 'has-generated-asset' : '',
    compact ? 'compact' : '',
    `variant-${variant}`,
    `visual-aid-${aid.id}`
  ].filter(Boolean).join(' ')
  return (
    <figure className={className} aria-labelledby={headingId}>
      <DiagramScene aid={aid} variant={variant} />
      <figcaption>
        <div className="aid-caption-copy">
          <strong>{aid.title}</strong>
          {aid.subtitle && <em>{aid.subtitle}</em>}
          <span>{aid.caption}</span>
        </div>
        <CalloutList callouts={callouts} />
        {aid.keyTakeaway && <KeyTakeaway text={aid.keyTakeaway} />}
        {aid.accessibleDescription && <p className="sr-only">Accessible description: {aid.accessibleDescription}</p>}
      </figcaption>
    </figure>
  )
}

function DiagramScene({ aid, variant }) {
  const asset = getGeneratedAsset(aid)
  if (asset) return <GeneratedImageScene aid={aid} asset={asset} variant={variant} />

  return (
    <div className={`aid-canvas aid-${aid.pattern} aid-variant-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 320 210" preserveAspectRatio="xMidYMid meet" focusable="false">
        <VisualPattern aid={aid} />
      </svg>
    </div>
  )
}

function GeneratedImageScene({ aid, asset, variant }) {
  const [imageFailed, setImageFailed] = React.useState(false)

  return (
    <div className={`aid-canvas generated-aid-canvas aid-${aid.pattern} aid-variant-${variant}`}>
      {!imageFailed ? (
        <img
          className="generated-aid-image"
          src={asset.path}
          alt={asset.alt}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="generated-aid-fallback" role="note">
          <strong>Visual unavailable.</strong>
          <span>The callouts below still explain the concept.</span>
        </div>
      )}
    </div>
  )
}

function CalloutList({ callouts }) {
  if (!callouts?.length) return null

  return (
    <ol className="aid-callout-list aid-legend">
      {callouts.map((callout) => (
        <li key={`${callout.number}-${callout.heading}`}>
          <span aria-hidden="true">{callout.number}</span>
          <p><strong>{callout.heading}</strong> {callout.body}</p>
        </li>
      ))}
    </ol>
  )
}

function KeyTakeaway({ text }) {
  return <p className="aid-key-takeaway"><strong>Key takeaway:</strong> {text}</p>
}

export function VisualAidGallery() {
  return (
    <div className="visual-aid-gallery">
      <DiagramKitGallery />
      {visualAidCatalog.map((aid) => {
        const lesson = lessonByVisualAidId[aid.id]
        const asset = getGeneratedAsset(aid)
        return (
          <section id={aid.id} className="review-card aid-review-card" key={aid.id} aria-labelledby={`${aid.id}-review-title`}>
            <p className="eyebrow">{aid.id}</p>
            <h2 id={`${aid.id}-review-title`}>{aid.title}</h2>
            <div className="aid-review-meta" aria-label={`Review metadata for ${aid.title}`}>
              <span>Lesson: {lesson?.title ?? 'Shared/support visual'}</span>
              <span>Pattern: {aid.pattern}</span>
              <span>Variant: {getVisualAidVariant(aid)}</span>
              {asset && <span>Asset: {asset.filename}</span>}
              {asset && <span>Type: {asset.visualType}</span>}
            </div>
            <VisualAid id={aid.id} compact />
            <dl className="aid-review-details">
              <div><dt>Learning objective</dt><dd>{aid.objective ?? aid.caption}</dd></div>
              {asset && <div><dt>Asset path</dt><dd><code>{asset.path}</code></dd></div>}
              {asset && <div><dt>Alt text</dt><dd>{asset.alt}</dd></div>}
              <div><dt>Accessible description</dt><dd>{aid.accessibleDescription ?? aid.caption}</dd></div>
              <div><dt>Mobile preview</dt><dd>Review at 320px, 390px, and 430px; images must fit the paper frame and callouts must remain readable below the visual.</dd></div>
              {asset && <div><dt>Text handling</dt><dd>Instructional labels and callouts are HTML. The PNG remains textless concept art.</dd></div>}
              <div><dt>Print/PDF notes</dt><dd>{aid.printNote ?? 'Use the same scene and HTML callouts in exported lesson-card PDFs.'}</dd></div>
            </dl>
          </section>
        )
      })}
    </div>
  )
}

function VisualPattern({ aid }) {
  switch (aid.pattern) {
    case 'llmOverview':
      return <LlmOverviewSvg />
    case 'aiTopology':
      return <AiTopologySvg />
    case 'traditions':
      return <TraditionsSvg />
    case 'training':
      return <TrainingSvg />
    case 'pretraining':
      return <PretrainingSvg />
    case 'overfitting':
      return <OverfittingSvg />
    case 'fine':
      return <FineTuneSvg />
    case 'alignment':
      return <AlignmentSvg />
    case 'inference':
      return <InferenceSvg />
    case 'promptResponse':
      return <PromptResponseSvg />
    case 'token':
      return <TokenSvg />
    case 'ids':
      return <IdsSvg />
    case 'vector':
      return <EmbeddingSvg />
    case 'bars':
      return <VectorSvg />
    case 'tensor':
      return <TensorSvg />
    case 'attention':
      return <AttentionSvg />
    case 'mlp':
      return <MlpSvg />
    case 'layers':
      return <LayersSvg />
    case 'hidden':
      return <HiddenSvg />
    case 'logits':
      return <LogitsSvg />
    case 'softmax':
      return <SoftmaxSvg />
    case 'sampling':
      return <SamplingSvg />
    case 'loop':
      return <LoopSvg />
    case 'window':
      return <WindowSvg />
    case 'rag':
      return <RagSvg />
    case 'groundingEvidence':
      return <GroundingEvidenceSvg />
    case 'hallucinationBridge':
      return <HallucinationBridgeSvg />
    case 'learns':
    case 'compare':
      return <LearnsSvg />
    case 'diffusion':
      return <DiffusionSvg />
    case 'multimodal':
      return <MultimodalSvg />
    case 'perfectStorm':
      return <PerfectStormSvg />
    case 'collectiveLantern':
      return <CollectiveLanternSvg />
    case 'benefitsGarden':
      return <BenefitsGardenSvg />
    case 'costsFactory':
      return <CostsFactorySvg />
    case 'humanGarden':
      return <HumanGardenSvg />
    case 'responsiblePath':
      return <ResponsiblePathSvg />
    case 'promptingTray':
      return <PromptingTraySvg />
    case 'synthesisMap':
      return <SynthesisMapSvg />
    case 'risk':
      return <RiskSvg />
    default:
      return <CloudSvg />
  }
}

function Label({ x, y, children, className = '' }) {
  return <text x={x} y={y} className={className}>{children}</text>
}

function Callout({ x, y, children }) {
  return (
    <g>
      <circle className="aid-callout" cx={x} cy={y} r="12" />
      <Label x={Number(x) - 4} y={Number(y) + 5} className="tiny dark">{children}</Label>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }) {
  const startX = Number(x1)
  const startY = Number(y1)
  const endX = Number(x2)
  const endY = Number(y2)
  const midX = (startX + endX) / 2
  return <path className="aid-arrow" d={`M${startX} ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`} />
}

function StepNode({ number, label, x, y, width = 76, output = false }: { number: string | number, label: string | number, x: string | number, y: string | number, width?: string | number, output?: boolean }) {
  return (
    <g>
      <rect className={output ? 'aid-box output' : 'aid-box'} x={x} y={y} width={width} height="38" rx="8" />
      <circle className="aid-callout" cx={Number(x) + 15} cy={Number(y) + 19} r="10" />
      <Label x={Number(x) + 11} y={Number(y) + 24} className="tiny dark">{number}</Label>
      <Label x={Number(x) + 28} y={Number(y) + 24} className={output ? 'tiny dark' : 'tiny'}>{label}</Label>
    </g>
  )
}

function TokenChip({ token, x, y, width = 34, kind = 'output' }: { token: string | number, x: string | number, y: string | number, width?: string | number, kind?: string }) {
  return (
    <g>
      <rect className={kind === 'prompt' ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width={width} height="24" rx="6" />
      <Label x={Number(x) + 6} y={Number(y) + 17} className="tiny dark">{token}</Label>
    </g>
  )
}

function LlmOverviewSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="66" width="74" height="48" rx="8" />
      <circle className="aid-core" cx="142" cy="90" r="36" />
      {[0, 1, 2, 3].map((index) => (
        <circle key={index} className={index === 1 ? 'aid-dot alt' : 'aid-dot'} cx={216 + index * 22} cy={70 + (index % 2) * 34} r={9 + index * 2} />
      ))}
      <rect className="aid-box output" x="246" y="140" width="58" height="34" rx="8" />
      <Arrow x1={90} y1={90} x2={106} y2={90} />
      <Arrow x1={178} y1={90} x2={204} y2={90} />
      <Arrow x1={248} y1={112} x2={266} y2={140} />
      <Label x="25" y="87" className="tiny dark">prompt/</Label>
      <Label x="25" y="103" className="tiny dark">context</Label>
      <Label x="112" y="84" className="tiny">learned</Label>
      <Label x="114" y="101" className="tiny">weights</Label>
      <Label x="202" y="42" className="tiny">next-token</Label>
      <Label x="202" y="57" className="tiny">probabilities</Label>
      <Label x="255" y="161" className="tiny dark">token</Label>
      <Label x="128" y="190" className="tiny">append</Label>
    </>
  )
}

function AiTopologySvg() {
  return <DiagramKitAiFamilyTreeExample />
}

function TraditionsSvg() {
  return <DiagramKitTraditionsExample />
}

function CloudSvg() {
  return (
    <>
      <circle className="aid-core" cx="160" cy="98" r="42" />
      <rect className="aid-box prompt" x="22" y="72" width="76" height="42" rx="8" />
      <rect className="aid-box output" x="226" y="72" width="72" height="42" rx="8" />
      <Arrow x1={98} y1={93} x2={122} y2={93} />
      <Arrow x1={202} y1={93} x2={226} y2={93} />
      {[
        ['grammar', 92, 154, 63],
        ['facts', 136, 170, 124],
        ['tone', 180, 154, 168],
        ['task', 224, 170, 214]
      ].map(([label, dotX, dotY, labelX]) => (
        <g key={label}>
          <circle className="aid-dot" cx={Number(dotX)} cy={Number(dotY)} r="9" />
          <Label x={Number(labelX)} y={194} className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="41" y="98" className="dark">prompt</Label>
      <Label x="242" y="98" className="dark">next</Label>
      <Label x="135" y="102">weights</Label>
    </>
  )
}

function TrainingSvg() {
  return <DiagramKitTrainingLoopExample />
}

function PretrainingSvg() {
  return (
    <>
      <path className="aid-land" d="M18 166 L76 102 L126 134 L178 78 L232 118 L302 58 L302 166 Z" />
      {[0, 1, 2, 3, 4, 5, 6].map((drop) => (
        <path key={drop} className="aid-line" d={`M${46 + drop * 34} 28 L${34 + drop * 32} ${80 + (drop % 2) * 18}`} />
      ))}
      <path className="aid-path" d="M34 154 C76 138, 110 128, 140 112 S206 84, 276 74" />
      <path className="aid-path thin" d="M54 168 C106 150, 146 150, 180 130 S238 106, 288 104" />
      <Label x="48" y="50" className="tiny">text/data stream</Label>
      <Label x="112" y="192" className="tiny">broad learning</Label>
    </>
  )
}

function OverfittingSvg() {
  return <DiagramKitOverfittingPlotExample />
}

function FineTuneSvg() {
  return (
    <>
      <path className="aid-land" d="M20 162 L98 78 L145 126 L210 58 L300 162 Z" />
      <path className="aid-path" d="M42 154 C80 128, 105 122, 137 113 S201 83, 266 73" />
      <rect className="aid-chip prompt" x="92" y="32" width="74" height="28" rx="8" />
      <Label x="101" y="51" className="tiny dark">examples</Label>
      <circle className="aid-dot" cx="137" cy="113" r="10" />
      <circle className="aid-dot alt" cx="266" cy="73" r="10" />
      <Arrow x1="128" y1="60" x2="137" y2="103" />
      <Label x="36" y="184" className="tiny">pretrained base</Label>
      <Label x="174" y="39" className="tiny">fine-tuned path</Label>
      <Label x="190" y="184" className="tiny">future responses shaped</Label>
    </>
  )
}

function AlignmentSvg() {
  return (
    <>
      <path className="aid-land" d="M20 164 L82 96 L132 126 L196 60 L300 164 Z" />
      <rect className="aid-chip output" x="62" y="48" width="92" height="40" rx="10" opacity="0.82" />
      <path className="aid-path" d="M42 154 C84 128, 122 118, 154 106 S210 78, 272 68" />
      <path className="aid-line" d="M48 128 C98 104, 152 96, 230 92" />
      <rect className="aid-chip prompt" x="220" y="34" width="70" height="30" rx="8" />
      <circle className="aid-dot alt" cx="170" cy="104" r="10" />
      <Callout x="268" y="68">1</Callout>
      <Callout x="70" y="126">2</Callout>
      <Callout x="96" y="66">3</Callout>
      <Callout x="170" y="104">4</Callout>
    </>
  )
}

function InferenceSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="70" width="70" height="44" rx="8" />
      <Label x="27" y="96" className="tiny dark">context</Label>
      <rect className="aid-box output" x="122" y="40" width="94" height="82" rx="10" />
      <Label x="141" y="72" className="tiny dark">temporary</Label>
      <Label x="142" y="91" className="tiny dark">activations</Label>
      {[0, 1, 2, 3].map((dot) => <circle key={dot} className="aid-dot" cx={144 + dot * 16} cy={108 - (dot % 2) * 12} r="5" />)}
      <rect className="aid-box" x="238" y="52" width="66" height="34" rx="8" />
      <Label x="252" y="73" className="tiny">scores</Label>
      <rect className="aid-chip output" x="250" y="116" width="44" height="28" rx="7" />
      <Label x="259" y="135" className="tiny dark">floor</Label>
      <rect className="aid-box prompt" x="86" y="154" width="138" height="32" rx="8" />
      <Label x="112" y="175" className="tiny dark">fixed weights</Label>
      <Arrow x1="86" y1="92" x2="122" y2="82" />
      <Arrow x1="216" y1="78" x2="238" y2="69" />
      <Arrow x1="268" y1="86" x2="270" y2="116" />
      <path className="aid-line dashed" d="M155 154 V122" />
      <Callout x="42" y="52">1</Callout>
      <Callout x="160" y="26">2</Callout>
      <Callout x="156" y="196">3</Callout>
      <Callout x="296" y="108">4</Callout>
    </>
  )
}

function PromptResponseSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="16" y="18" width="288" height="32" rx="8" />
      <Label x="28" y="39" className="tiny dark">User prompt: complete request</Label>
      <rect className="aid-box muted" x="16" y="66" width="220" height="54" rx="8" />
      <Label x="28" y="86" className="tiny">Response so far</Label>
      {['A', 'jealous', 'dog', '...', 'kitchen'].map((token, index) => (
        <TokenChip key={token} token={token} x={28 + index * 40} y="94" width={index === 1 ? 50 : 34} />
      ))}
      <rect className="aid-box output" x="250" y="74" width="54" height="38" rx="8" />
      <Label x="260" y="98" className="tiny dark">floor</Label>
      <Arrow x1="236" y1="94" x2="250" y2="94" />
      <rect className="aid-box prompt" x="28" y="150" width="264" height="34" rx="8" />
      <Label x="52" y="172" className="tiny dark">current context = prompt + response + floor</Label>
      <Arrow x1="160" y1="50" x2="160" y2="66" />
      <Arrow x1="160" y1="120" x2="160" y2="150" />
      <Callout x="292" y="20">1</Callout>
      <Callout x="236" y="68">2</Callout>
      <Callout x="302" y="124">3</Callout>
      <Callout x="38" y="184">4</Callout>
    </>
  )
}

function TokenSvg() {
  const tokens = [
    ['A', 18, 22, 88],
    ['jealous', 44, 52, 88],
    ['dog', 100, 36, 88],
    ['chased', 140, 56, 88],
    ['a', 200, 22, 88],
    ['startled', 226, 64, 88],
    ['cat', 34, 34, 122],
    ['across', 72, 56, 122],
    ['the', 132, 34, 122],
    ['kitchen', 170, 62, 122],
    ['floor', 236, 46, 122],
    ['.', 286, 20, 122]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="18" y="24" width="284" height="34" rx="8" />
      <Label x="44" y="46" className="tiny dark">A jealous dog chased a startled cat...</Label>
      {tokens.map(([token, x, width, y], index) => (
        <g key={`${token}-${index}`}>
          <rect className={token === '.' ? 'aid-chip output' : 'aid-chip'} x={Number(x)} y={Number(y)} width={Number(width)} height="24" rx="7" />
          <Label x={Number(x) + 6} y={Number(y) + 17} className={token === '.' ? 'tiny dark' : 'tiny'}>{token}</Label>
        </g>
      ))}
      <rect className="aid-box muted" x="44" y="162" width="232" height="34" rx="8" />
      <Label x="56" y="183" className="tiny">start | led     floor | .</Label>
      <Arrow x1="160" y1="58" x2="160" y2="88" />
      <Callout x="294" y="70">1</Callout>
      <Callout x="294" y="136">2</Callout>
      <Callout x="282" y="178">3</Callout>
    </>
  )
}

function IdsSvg() {
  const rows = canonicalPromptResponse.tokenIds
  return (
    <>
      <Label x="32" y="24" className="tiny">token</Label>
      <Label x="132" y="24" className="tiny">ID</Label>
      <Label x="230" y="24" className="tiny">table row</Label>
      {rows.map((row, index) => (
        <g key={row.token}>
          <rect className="aid-chip prompt" x="24" y={40 + index * 42} width="58" height="28" rx="8" />
          <Label x="38" y={59 + index * 42} className="tiny dark">{row.token}</Label>
          <rect className="aid-box" x="122" y={38 + index * 42} width="68" height="32" rx="8" />
          <Label x="137" y={59 + index * 42} className="tiny">ID {row.id}</Label>
          <rect className={index === 2 ? 'aid-chip output' : 'aid-chip'} x="232" y={40 + index * 42} width="62" height="28" rx="8" />
          <Label x="244" y={59 + index * 42} className={index === 2 ? 'tiny dark' : 'tiny'}>row</Label>
          <Arrow x1="82" y1={54 + index * 42} x2="122" y2={54 + index * 42} />
          <Arrow x1="190" y1={54 + index * 42} x2="232" y2={54 + index * 42} />
        </g>
      ))}
      <rect className="aid-box muted" x="42" y="174" width="236" height="24" rx="8" />
      <Label x="58" y="191" className="tiny">ID is a lookup key, not meaning</Label>
      <Callout x="94" y="74">1</Callout>
      <Callout x="204" y="74">2</Callout>
      <Callout x="300" y="154">3</Callout>
    </>
  )
}

function EmbeddingSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="22" y="42" width="70" height="38" rx="8" />
      <Label x="36" y="66" className="tiny dark">ID 1576</Label>
      <rect className="aid-box muted" x="112" y="20" width="96" height="136" rx="8" />
      <Label x="126" y="39" className="tiny">durable</Label>
      <Label x="129" y="55" className="tiny">table</Label>
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect className={row === 2 ? 'aid-chip output' : 'aid-chip'} x="128" y={66 + row * 20} width="62" height="15" rx="5" />
          <Label x="136" y={78 + row * 20} className={row === 2 ? 'tiny dark' : 'tiny'}>row {row + 1}</Label>
        </g>
      ))}
      <rect className="aid-box" x="232" y="68" width="76" height="56" rx="8" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} className="aid-bar" x={244 + bar * 11} y={110 - bar * 6} width="8" height={14 + bar * 6} rx="3" />
      ))}
      <rect className="aid-box output" x="214" y="150" width="86" height="32" rx="8" />
      <Label x="228" y="171" className="tiny dark">hidden later</Label>
      <Arrow x1="92" y1="61" x2="112" y2="94" />
      <Arrow x1="190" y1="104" x2="232" y2="98" />
      <Arrow x1="270" y1="124" x2="260" y2="150" />
      <Callout x="60" y="96">1</Callout>
      <Callout x="164" y="168">2</Callout>
      <Callout x="282" y="142">3</Callout>
      <Callout x="212" y="182">4</Callout>
    </>
  )
}

function VectorSvg() {
  const rows = [
    ['animal-ish', 78],
    ['grammar', 48],
    ['tone', 36],
    ['position', 66]
  ]
  const distributed = [
    [198, 58, 18],
    [218, 52, 34],
    [238, 62, 24],
    [258, 48, 46],
    [278, 60, 30],
    [204, 118, 40],
    [224, 110, 22],
    [244, 122, 52],
    [264, 112, 28],
    [284, 120, 36]
  ]
  return (
    <>
      <rect className="aid-box muted" x="18" y="24" width="146" height="140" rx="10" />
      <Label x="36" y="48" className="tiny">teaching sliders</Label>
      {rows.map(([label, width], index) => (
        <g key={label}>
          <Label x="32" y={74 + index * 24} className="tiny">{label}</Label>
          <rect className="aid-box" x="94" y={60 + index * 24} width="54" height="14" rx="6" />
          <rect className="aid-bar horizontal" x="94" y={60 + index * 24} width={Number(width) * 0.55} height="14" rx="6" />
        </g>
      ))}
      <rect className="aid-box muted" x="182" y="24" width="120" height="140" rx="10" />
      <Label x="194" y="48" className="tiny">distributed</Label>
      {distributed.map(([x, y, h], index) => (
        <rect key={index} className={index % 3 === 0 ? 'aid-bar horizontal' : 'aid-bar'} x={x} y={150 - Number(h)} width="8" height={h} rx="3" />
      ))}
      <rect className="aid-box prompt" x="40" y="176" width="240" height="24" rx="8" />
      <Label x="52" y="193" className="tiny dark">real dimensions are usually unlabeled</Label>
      <Callout x="150" y="40">1</Callout>
      <Callout x="292" y="40">2</Callout>
      <Callout x="286" y="184">3</Callout>
    </>
  )
}

function TensorSvg() {
  const tokens = ['dog', 'cat', 'floor']
  const features = [0, 1, 2, 3, 4]
  return (
    <>
      <rect className="aid-sheet" x="76" y="30" width="206" height="116" rx="10" opacity="0.35" />
      <rect className="aid-sheet" x="62" y="44" width="206" height="116" rx="10" />
      {tokens.map((token, row) => (
        <g key={token}>
          <Label x="18" y={76 + row * 34} className="tiny">{token}</Label>
          {features.map((feature) => (
            <rect key={`${token}-${feature}`} className="aid-cell" x={78 + feature * 34} y={60 + row * 30} width="22" height="20" rx="5" />
          ))}
        </g>
      ))}
      <path className="aid-line" d="M60 44 V160" />
      <path className="aid-line" d="M62 166 H268" />
      <Label x="10" y="34" className="tiny">tokens</Label>
      <Label x="132" y="194" className="tiny">features</Label>
      <rect className="aid-box muted" x="192" y="18" width="98" height="24" rx="8" />
      <Label x="202" y="35" className="tiny">batch sheet</Label>
      <Callout x="52" y="58">1</Callout>
      <Callout x="248" y="170">2</Callout>
      <Callout x="292" y="28">3</Callout>
    </>
  )
}

function AttentionSvg() {
  const points = [
    ['dog', 48, 72],
    ['cat', 112, 132],
    ['because', 172, 76],
    ['it', 224, 132],
    ['hissed', 272, 76]
  ]
  return (
    <>
      <rect className="aid-box prompt" x="18" y="18" width="284" height="28" rx="8" />
      <Label x="38" y="37" className="tiny dark">dog chased cat because it hissed</Label>
      <path className="aid-arc" d="M224 118 Q178 78 112 118" />
      <path className="aid-arc alt" d="M224 118 Q140 24 48 58" opacity="0.44" />
      {points.map(([label, x, y]) => (
        <g key={label}>
          <circle className="aid-node" cx={x} cy={y} r="22" />
          <Label x={Number(x) - (String(label).length > 3 ? 20 : 10)} y={Number(y) + 5} className="tiny">{label}</Label>
        </g>
      ))}
      <rect className="aid-chip output" x="64" y="164" width="86" height="28" rx="8" />
      <Label x="82" y="183" className="tiny dark">strong</Label>
      <rect className="aid-chip prompt" x="166" y="164" width="90" height="28" rx="8" />
      <Label x="184" y="183" className="tiny dark">weaker</Label>
      <Label x="92" y="205" className="tiny">relevance, not awareness</Label>
    </>
  )
}

function MlpSvg() {
  const before = [26, 42, 56, 34]
  const after = [62, 28, 74, 48]
  return (
    <>
      <rect className="aid-box muted" x="18" y="24" width="124" height="54" rx="8" />
      <Label x="42" y="46" className="tiny">attention</Label>
      <Label x="34" y="64" className="tiny muted-text">tokens exchange</Label>
      <path className="aid-line" d="M34 92 C62 78, 92 78, 124 92" />
      <path className="aid-line" d="M34 114 C72 132, 96 132, 124 114" />
      <rect className="aid-chip output" x="34" y="132" width="48" height="26" rx="8" />
      <Label x="45" y="150" className="tiny dark">cat</Label>
      <rect className="aid-box" x="168" y="24" width="126" height="144" rx="10" />
      <Label x="198" y="47" className="tiny">MLP</Label>
      <Label x="180" y="65" className="tiny">same token</Label>
      {before.map((height, index) => (
        <rect key={`before-${index}`} className="aid-bar" x={184 + index * 12} y={118 - height} width="8" height={height} rx="3" opacity="0.55" />
      ))}
      {after.map((height, index) => (
        <rect key={`after-${index}`} className="aid-bar horizontal" x={242 + index * 12} y={118 - height} width="8" height={height} rx="3" />
      ))}
      <Arrow x1="82" y1="145" x2="168" y2="112" />
      <Arrow x1="224" y1="130" x2="242" y2="130" />
      <Label x="180" y="146" className="tiny">before</Label>
      <Label x="242" y="146" className="tiny">after</Label>
      <Label x="84" y="192" className="tiny">feature bars reshaped</Label>
    </>
  )
}

function Gear({ x, y, r, alt = false }) {
  return <circle className={alt ? 'aid-gear alt' : 'aid-gear'} cx={x} cy={y} r={r} />
}

function LayersSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="86" y="18" width="148" height="28" rx="8" />
      <Label x="111" y="37" className="tiny dark">input states</Label>
      {[0, 1, 2].map((layer) => (
        <g key={layer}>
          <rect className="aid-box" x="70" y={58 + layer * 42} width="180" height="34" rx="8" />
          <Label x="91" y={79 + layer * 42} className="tiny">Layer {layer + 1}: attn + MLP</Label>
        </g>
      ))}
      <rect className="aid-box output" x="86" y="184" width="148" height="24" rx="8" />
      <Label x="110" y="201" className="tiny dark">output states</Label>
      <path className="aid-path thin" d="M160 46 V184" />
    </>
  )
}

function HiddenSvg() {
  return (
    <>
      {[
        ['ID', 18, 60, 'prompt'],
        ['Embed', 82, 60, 'output'],
        ['L1', 170, 40, ''],
        ['L2', 170, 100, ''],
        ['Final', 238, 82, ''],
        ['Scores', 232, 146, 'output']
      ].map(([label, x, y, kind]) => (
        <g key={label}>
          <rect className={kind === 'prompt' ? 'aid-chip prompt' : kind === 'output' ? 'aid-chip output' : 'aid-box'} x={x} y={y} width={label === 'Embed' ? 62 : 58} height="30" rx="8" />
          <Label x={Number(x) + 8} y={Number(y) + 20} className={kind ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}
      <Arrow x1="76" y1="75" x2="82" y2="75" />
      <Arrow x1="144" y1="75" x2="170" y2="55" />
      <Arrow x1="198" y1="70" x2="198" y2="100" />
      <Arrow x1="228" y1="115" x2="238" y2="98" />
      <Arrow x1="266" y1="112" x2="260" y2="146" />
      <rect className="aid-box muted" x="18" y="132" width="166" height="54" rx="8" />
      <Label x="32" y="152" className="tiny">weight: durable</Label>
      <Label x="32" y="171" className="tiny">state: temporary</Label>
      <rect className="aid-chip prompt" x="190" y="18" width="104" height="24" rx="8" />
      <Label x="205" y="35" className="tiny dark">not memory</Label>
      <Label x="62" y="204" className="tiny">temporary during this forward pass</Label>
    </>
  )
}

function LogitsSvg() {
  const rows = [
    ['floor', '8.2', 124, 'high'],
    ['room', '5.1', 84, 'med'],
    ['counter', '2.0', 48, 'low'],
    ['quantum', '-1.0', 18, 'v low']
  ]

  return (
    <>
      <rect className="aid-box prompt" x="16" y="22" width="96" height="36" rx="8" />
      <Label x="28" y="45" className="tiny dark">hidden state</Label>
      <Arrow x1="112" y1="40" x2="142" y2="40" />
      <rect className="aid-box" x="144" y="20" width="78" height="40" rx="8" />
      <Label x="161" y="45" className="tiny">score</Label>
      <Arrow x1="222" y1="40" x2="252" y2="40" />
      <rect className="aid-chip output" x="252" y="22" width="52" height="36" rx="8" />
      <Label x="262" y="45" className="tiny dark">next?</Label>

      {rows.map(([label, score, width, rank], index) => (
        <g key={label}>
          <Label x="28" y={84 + index * 25} className="tiny">{label}</Label>
          <rect className="aid-box muted" x="96" y={70 + index * 25} width="154" height="15" rx="6" />
          <rect className="aid-bar horizontal" x="96" y={70 + index * 25} width={width} height="15" rx="6" />
          <text x="306" y={83 + index * 25} className="tiny" textAnchor="end">{score} {rank}</text>
        </g>
      ))}
      <rect className="aid-chip prompt" x="72" y="174" width="176" height="25" rx="8" />
      <Label x="90" y="191" className="tiny dark">raw scores, not probabilities</Label>
    </>
  )
}

function SoftmaxSvg() {
  const rows = [
    ['floor', '8.2', '86%', 86],
    ['room', '5.1', '12%', 34],
    ['counter', '2.0', '2%', 16],
    ['quantum', '-1.0', '~0%', 6]
  ]

  return (
    <>
      <Label x="28" y="26" className="tiny">logits</Label>
      <Label x="210" y="26" className="tiny">probabilities</Label>
      <path className="aid-funnel" d="M135 54 H184 L170 102 V152 H149 V102 Z" />
      <Label x="137" y="87" className="tiny">soft</Label>
      <Label x="139" y="106" className="tiny">max</Label>
      {rows.map(([label, raw, probability, width], index) => (
        <g key={label}>
          <Label x="20" y={55 + index * 31} className="tiny">{label}</Label>
          <rect className="aid-box muted" x="76" y={43 + index * 31} width="44" height="16" rx="5" />
          <Label x="85" y={56 + index * 31} className="tiny">{raw}</Label>
          <rect className="aid-box muted" x="204" y={43 + index * 31} width="86" height="16" rx="5" />
          <rect className="aid-bar horizontal" x="204" y={43 + index * 31} width={width} height="16" rx="5" />
          <Label x="294" y={56 + index * 31} className="tiny">{probability}</Label>
        </g>
      ))}
      <rect className="aid-chip output" x="188" y="174" width="116" height="24" rx="8" />
      <Label x="212" y="191" className="tiny dark">sum = 100%</Label>
      <rect className="aid-chip prompt" x="22" y="174" width="148" height="24" rx="8" />
      <Label x="40" y="191" className="tiny dark">probability != truth</Label>
    </>
  )
}

function SamplingSvg() {
  const tokens = [
    ['floor', '86%', 64, 58, 33, 'output'],
    ['room', '12%', 158, 66, 23, ''],
    ['counter', '2%', 234, 92, 17, ''],
    ['quantum', '~0%', 174, 144, 13, '']
  ]

  return (
    <>
      <rect className="aid-box prompt" x="18" y="16" width="284" height="42" rx="8" />
      <Label x="48" y="35" className="tiny dark">A jealous dog chased a startled cat</Label>
      <Label x="96" y="51" className="tiny dark">across the kitchen</Label>
      {tokens.map(([label, probability, x, y, r, kind]) => (
        <g key={label}>
          <circle className={kind === 'output' ? 'aid-node selected' : 'aid-node'} cx={Number(x)} cy={Number(y)} r={Number(r)} />
          <Label x={Number(x) - (String(label).length > 5 ? 26 : 18)} y={Number(y) + 3} className="tiny">{label}</Label>
          <Label x={Number(x) - 13} y={Number(y) + 18} className="tiny muted-text">{probability}</Label>
        </g>
      ))}
      <path className="aid-select" d="M64 91 C78 128, 98 154, 128 168" />
      <rect className="aid-chip output" x="128" y="154" width="72" height="34" rx="8" />
      <Label x="143" y="176" className="tiny dark">floor</Label>
      <Label x="212" y="176" className="tiny">chosen token</Label>
      <Label x="62" y="206" className="tiny">low probability is still possible</Label>
    </>
  )
}

function LoopSvg() {
  return (
    <>
      {['next', 'append', 'run again'].map((label, index) => (
        <g key={label}>
          <rect className="aid-box" x={34 + index * 88} y="74" width="72" height="42" rx="8" />
          <Label x={43 + index * 88} y="99" className="tiny">{label}</Label>
        </g>
      ))}
      <path className="aid-arc" d="M258 74 C298 28, 34 28, 34 74" />
      <Label x="112" y="160" className="tiny">append repeat</Label>
    </>
  )
}

function WindowSvg() {
  return (
    <>
      <rect className="aid-box muted" x="74" y="42" width="174" height="116" rx="10" />
      {['old', 'prompt', 'example', 'tone', 'next'].map((label, index) => (
        <g key={label}>
          <rect className={index === 0 ? 'aid-chip faded' : 'aid-chip'} x={22 + index * 58} y={86} width="48" height="34" rx="8" />
          <Label x={29 + index * 58} y="108" className="tiny">{label}</Label>
        </g>
      ))}
      <Label x="112" y="178" className="tiny">visible input</Label>
    </>
  )
}

function RagSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M38 176 C84 142, 128 142, 174 176" />
      <path className="aid-zen-ring alt" d="M146 188 C194 152, 242 154, 288 188" />

      <g className="rag-paper-node">
        <path className="aid-paper-node prompt" d="M16 34 H74 L88 48 V74 H16 Z" />
        <path className="aid-fold-line" d="M74 34 V48 H88" />
        <Label x="31" y="58" className="tiny dark">Prompt</Label>
      </g>
      <Callout x="22" y="32">1</Callout>

      <g className="rag-paper-node">
        <path className="aid-paper-node retriever" d="M116 26 H190 L206 42 V78 H116 Z" />
        <path className="aid-fold-line" d="M190 26 V42 H206" />
        <Label x="133" y="57" className="tiny dark">Retriever</Label>
      </g>
      <Callout x="204" y="30">2</Callout>

      <g className="rag-doc-stack">
        <path className="aid-doc-card" d="M236 24 H290 L302 36 V57 H236 Z" />
        <path className="aid-doc-card alt" d="M246 43 H298 L306 53 V76 H246 Z" />
        <Label x="260" y="64" className="tiny dark">Notes</Label>
      </g>
      <Callout x="300" y="43">3</Callout>

      <path className="aid-context-tray" d="M74 116 H222 L236 130 V162 H74 Z" />
      <path className="aid-fold-line light" d="M222 116 V130 H236" />
      <Label x="121" y="143" className="tiny">Context tray</Label>

      <path className="aid-paper-node output" d="M246 122 H298 L306 132 V164 H246 Z" />
      <Label x="254" y="147" className="tiny dark">Response</Label>
      <Callout x="302" y="127">4</Callout>

      <path className="aid-fixed-note" d="M24 170 H118 L128 180 V196 H24 Z" />
      <path className="aid-fold-line" d="M118 170 V180 H128" />
      <Label x="38" y="187" className="tiny dark">weights fixed</Label>
      <Callout x="142" y="181">5</Callout>

      <path className="aid-neon-path" d="M88 54 C104 40, 105 40, 116 52" />
      <path className="aid-neon-path" d="M206 52 C218 35, 224 34, 236 42" />
      <path className="aid-neon-path" d="M278 76 C278 96, 218 100, 190 116" />
      <path className="aid-neon-path" d="M236 142 C240 142, 242 142, 246 142" />
    </>
  )
}

function GroundingEvidenceSvg() {
  const evidenceCards = [
    ['PDF', 28, 34],
    ['Data', 106, 24],
    ['Tool', 184, 34]
  ]

  return (
    <>
      <path className="aid-zen-ring" d="M48 184 C94 152, 218 152, 272 184" />
      {evidenceCards.map(([label, x, y], index) => (
        <g key={label}>
          <path className={index === 1 ? 'aid-paper-node retriever' : 'aid-doc-card'} d={`M${x} ${y} H${Number(x) + 58} L${Number(x) + 70} ${Number(y) + 12} V${Number(y) + 42} H${x} Z`} />
          <path className="aid-fold-line" d={`M${Number(x) + 58} ${y} V${Number(y) + 12} H${Number(x) + 70}`} />
          <Label x={Number(x) + 15} y={Number(y) + 27} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 34} ${Number(y) + 42} C116 96, 150 100, 154 122`} />
        </g>
      ))}
      <Callout x="22" y="54">1</Callout>

      <path className="aid-context-tray" d="M56 120 H206 L222 136 V166 H56 Z" />
      <path className="aid-fold-line light" d="M206 120 V136 H222" />
      <Label x="104" y="147" className="tiny">Context</Label>
      <Callout x="72" y="120">2</Callout>

      <path className="aid-paper-node output" d="M238 116 H294 L306 128 V166 H238 Z" />
      <path className="aid-fold-line" d="M294 116 V128 H306" />
      <Label x="250" y="143" className="tiny dark">Answer</Label>
      <Callout x="304" y="116">3</Callout>

      <path className="aid-select" d="M266 166 C240 194, 116 194, 94 166" />
      <circle className="aid-callout" cx="94" cy="166" r="11" />
      <Label x="90" y="171" className="tiny dark">4</Label>
      <path className="aid-neon-path" d="M222 144 C226 144, 232 144, 238 144" />
    </>
  )
}

function HallucinationBridgeSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M44 184 C106 150, 214 150, 276 184" />
      <path className="aid-arc" d="M38 118 C86 56, 234 56, 282 118" />
      <Label x="112" y="64" className="tiny">fluent output</Label>
      <Callout x="62" y="106">1</Callout>

      <rect className="aid-chip output" x="54" y="104" width="58" height="28" rx="8" />
      <Label x="66" y="123" className="tiny dark">claim</Label>
      <rect className="aid-chip output" x="132" y="84" width="58" height="28" rx="8" />
      <Label x="144" y="103" className="tiny dark">claim</Label>
      <rect className="aid-chip output" x="210" y="104" width="58" height="28" rx="8" />
      <Label x="222" y="123" className="tiny dark">claim</Label>

      <rect className="aid-paper-node retriever" x="42" y="150" width="64" height="28" rx="8" />
      <Label x="56" y="169" className="tiny dark">source</Label>
      <path className="aid-line" d="M74 150 V130" />
      <path className="aid-line dashed" d="M160 142 V116" />
      <path className="aid-line dashed" d="M238 142 V130" />
      <Callout x="160" y="148">2</Callout>

      <path className="aid-fixed-note" d="M190 22 H292 L304 34 V56 H190 Z" />
      <path className="aid-fold-line" d="M292 22 V34 H304" />
      <Label x="204" y="41" className="tiny dark">check source</Label>
      <Callout x="292" y="60">3</Callout>

      <circle className="aid-dot alt" cx="160" cy="172" r="10" />
      <Label x="178" y="176" className="tiny">review</Label>
    </>
  )
}

function LearnsSvg() {
  return (
    <>
      {[
        ['weights', 'durable', 26],
        ['context', 'temporary', 118],
        ['retrieval', 'open book', 210]
      ].map(([top, bottom, x]) => (
        <g key={top}>
          <rect className="aid-box" x={x} y="62" width="78" height="74" rx="8" />
          <Label x={Number(x) + 11} y="91" className="tiny">{top}</Label>
          <Label x={Number(x) + 8} y="115" className="tiny muted-text">{bottom}</Label>
        </g>
      ))}
      <Label x="98" y="178" className="tiny">change types</Label>
    </>
  )
}

function DiffusionSvg() {
  return (
    <>
      {[0, 1, 2].map((step) => (
        <g key={step} transform={`translate(${38 + step * 92}, 58)`}>
          <rect className="aid-box muted" width="62" height="62" rx="8" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
            <rect key={cell} className={`aid-noise n-${step}`} x={9 + (cell % 3) * 17} y={9 + Math.floor(cell / 3) * 17} width="11" height="11" rx="3" />
          ))}
        </g>
      ))}
      <Arrow x1="100" y1="89" x2="130" y2="89" />
      <Arrow x1="192" y1="89" x2="222" y2="89" />
      <Label x="112" y="166" className="tiny">denoise steps</Label>
    </>
  )
}

function MultimodalSvg() {
  const modes = [
    ['text', 70, 62],
    ['image', 232, 62],
    ['audio', 70, 150],
    ['video', 232, 150]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="106" r="32" />
      <Label x="137" y="111" className="tiny dark">shared</Label>
      {modes.map(([label, x, y]) => (
        <g key={label}>
          <circle className="aid-node" cx={Number(x)} cy={Number(y)} r="24" />
          <Label x={Number(x) - 17} y={Number(y) + 5} className="tiny">{label}</Label>
          <path className="aid-line" d={`M${x} ${y} L160 106`} />
        </g>
      ))}
    </>
  )
}

function PerfectStormSvg() {
  const streams = [
    ['Data', 18, 36, 112, 84],
    ['Compute', 18, 142, 112, 122],
    ['Methods', 220, 34, 192, 84],
    ['Labor', 228, 142, 198, 122],
    ['Incentives', 112, 20, 150, 70]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="104" r="34" />
      <Label x="145" y="110" className="tiny dark">LLM</Label>
      {streams.map(([label, x, y, endX, endY], index) => (
        <g key={label}>
          <rect className="aid-paper-node" x={x} y={y} width={label === 'Incentives' ? 96 : 78} height="32" rx="8" />
          <Label x={Number(x) + 10} y={Number(y) + 21} className="tiny dark">{label}</Label>
          <path className={index % 2 ? 'aid-neon-path alt-path' : 'aid-neon-path'} d={`M${Number(x) + 39} ${Number(y) + 32} C${endX} ${endY}, ${endX} ${endY}, 160 104`} />
        </g>
      ))}
      <path className="aid-zen-ring" d="M74 184 C118 158, 202 158, 248 184" />
    </>
  )
}

function CollectiveLanternSvg() {
  const sources = [
    ['Books', 24, 40],
    ['Code', 36, 136],
    ['Art', 238, 40],
    ['Research', 222, 136]
  ]
  return (
    <>
      <path className="aid-zen-ring" d="M68 178 C110 148, 206 148, 252 178" />
      {sources.map(([label, x, y]) => (
        <g key={label}>
          <path className="aid-doc-card" d={`M${x} ${y} H${Number(x) + 56} L${Number(x) + 66} ${Number(y) + 10} V${Number(y) + 38} H${x} Z`} />
          <Label x={Number(x) + 9} y={Number(y) + 25} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 32} ${Number(y) + 38} C122 96, 136 96, 160 106`} />
        </g>
      ))}
      <path className="aid-paper-node output" d="M126 72 H194 L210 94 L194 136 H126 L110 94 Z" />
      <Label x="134" y="101" className="tiny dark">Lantern</Label>
      <circle className="aid-dot alt" cx="160" cy="106" r="13" />
      <path className="aid-neon-path" d="M194 106 C224 100, 244 102, 278 116" />
      <rect className="aid-box muted" x="246" y="96" width="50" height="38" rx="8" />
      <Label x="258" y="120" className="tiny">Model</Label>
    </>
  )
}

function BenefitsGardenSvg() {
  const tools = [
    ['Access', 58, 56],
    ['Search', 150, 36],
    ['Draft', 242, 56],
    ['Translate', 62, 146],
    ['Code', 158, 166],
    ['Research', 238, 146]
  ]
  return (
    <>
      <circle className="aid-core" cx="160" cy="104" r="34" />
      <Label x="138" y="110" className="tiny dark">Human</Label>
      {tools.map(([label, x, y]) => (
        <g key={label}>
          <path className="aid-line" d={`M${x} ${y} L160 104`} />
          <rect className="aid-paper-node" x={Number(x) - 32} y={Number(y) - 16} width="64" height="32" rx="8" />
          <Label x={Number(x) - 22} y={Number(y) + 5} className="tiny dark">{label}</Label>
        </g>
      ))}
      <path className="aid-zen-ring alt" d="M44 184 C102 150, 220 150, 278 184" />
    </>
  )
}

function CostsFactorySvg() {
  const costs = [
    ['Power', 36, 48],
    ['Water', 38, 132],
    ['Data', 130, 34],
    ['Labor', 224, 48],
    ['Privacy', 218, 132],
    ['Power', 122, 166]
  ]
  return (
    <>
      <rect className="aid-box output" x="122" y="82" width="76" height="42" rx="8" />
      <Label x="140" y="109" className="tiny dark">Answer</Label>
      {costs.map(([label, x, y], index) => (
        <g key={`${label}-${index}`}>
          <path className="aid-line" d={`M160 104 L${x} ${y}`} />
          <rect className={index % 2 ? 'aid-paper-node retriever' : 'aid-paper-node'} x={Number(x) - 30} y={Number(y) - 15} width="60" height="30" rx="8" />
          <Label x={Number(x) - 22} y={Number(y) + 5} className="tiny dark">{label}</Label>
        </g>
      ))}
      <path className="aid-fixed-note" d="M104 18 H212 L224 30 V50 H104 Z" />
      <Label x="124" y="37" className="tiny dark">not weightless</Label>
    </>
  )
}

function HumanGardenSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M60 108 C94 58, 226 58, 260 108 C226 158, 94 158, 60 108" />
      <circle className="aid-core" cx="160" cy="106" r="34" />
      <Label x="139" y="112" className="tiny dark">Person</Label>
      {[
        ['Dignity', 82, 70],
        ['Learning', 238, 70],
        ['Review', 84, 146],
        ['Common', 236, 146]
      ].map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-paper-node" x={Number(x) - 34} y={Number(y) - 15} width="68" height="30" rx="8" />
          <Label x={Number(x) - 24} y={Number(y) + 5} className="tiny dark">{label}</Label>
          <path className="aid-line" d={`M${x} ${y} L160 106`} />
        </g>
      ))}
      <path className="aid-neon-path" d="M44 184 C116 160, 206 160, 276 184" />
    </>
  )
}

function ResponsiblePathSvg() {
  return (
    <>
      <circle className="aid-callout" cx="70" cy="106" r="16" />
      <Label x="64" y="112" className="tiny dark">?</Label>
      <path className="aid-path" d="M84 106 C120 88, 142 72, 176 58 C214 42, 246 40, 286 52" />
      <path className="aid-path thin" d="M84 106 C122 126, 146 144, 180 154 C218 166, 248 166, 288 154" />
      <rect className="aid-paper-node" x="194" y="28" width="86" height="34" rx="8" />
      <Label x="206" y="50" className="tiny dark">Extract</Label>
      <rect className="aid-paper-node retriever" x="190" y="142" width="98" height="34" rx="8" />
      <Label x="202" y="164" className="tiny dark">Responsible</Label>
      <rect className="aid-fixed-note" x="22" y="34" width="92" height="34" rx="8" />
      <Label x="36" y="56" className="tiny dark">Choices</Label>
    </>
  )
}

function PromptingTraySvg() {
  const parts = [
    ['Task', 28, 36],
    ['Context', 106, 28],
    ['Examples', 196, 36],
    ['Evidence', 44, 88],
    ['Format', 208, 88]
  ]
  return (
    <>
      {parts.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={index % 2 ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width="78" height="28" rx="8" />
          <Label x={Number(x) + 10} y={Number(y) + 19} className="tiny dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 39} ${Number(y) + 28} C132 116, 170 116, 160 130`} />
        </g>
      ))}
      <path className="aid-context-tray" d="M68 126 H218 L234 142 V172 H68 Z" />
      <path className="aid-fold-line light" d="M218 126 V142 H234" />
      <Label x="116" y="153" className="tiny">Context tray</Label>
      <path className="aid-paper-node output" d="M246 132 H298 L306 142 V170 H246 Z" />
      <Label x="254" y="154" className="tiny dark">Response</Label>
      <path className="aid-neon-path" d="M234 150 C238 150, 242 150, 246 150" />
    </>
  )
}

function SynthesisMapSvg() {
  return (
    <>
      <path className="aid-paper-node" d="M28 50 H124 L138 64 V142 H28 Z" />
      <path className="aid-fold-line" d="M124 50 V64 H138" />
      <Label x="54" y="94" className="tiny dark">Map</Label>
      <circle className="aid-core" cx="190" cy="96" r="32" />
      <circle className="aid-callout" cx="190" cy="96" r="17" />
      <path className="aid-select" d="M181 100 L198 88" />
      <Label x="164" y="140" className="tiny">Compass</Label>
      <path className="aid-paper-node output" d="M242 62 H292 L304 88 L292 132 H242 L230 88 Z" />
      <Label x="244" y="101" className="tiny dark">Lantern</Label>
      <path className="aid-neon-path" d="M138 96 C154 86, 162 86, 172 94" />
      <path className="aid-neon-path" d="M208 96 C220 92, 224 92, 230 96" />
      <rect className="aid-fixed-note" x="84" y="166" width="152" height="30" rx="8" />
      <Label x="102" y="186" className="tiny dark">Mechanics + judgment</Label>
    </>
  )
}

function RiskSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="30" y="52" width="122" height="52" rx="8" />
      <rect className="aid-box output" x="168" y="52" width="122" height="52" rx="8" />
      <Label x="58" y="82" className="dark">real risk</Label>
      <Label x="204" y="82" className="dark">myth</Label>
      {['privacy', 'over-trust', 'self-aware'].map((label, index) => (
        <g key={label}>
          <rect className={index === 2 ? 'aid-chip faded' : 'aid-chip'} x={44 + index * 82} y="138" width="72" height="34" rx="8" />
          <Label x={51 + index * 82} y="160" className="tiny">{label}</Label>
        </g>
      ))}
    </>
  )
}
