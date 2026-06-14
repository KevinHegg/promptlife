import React from 'react'
import { canonicalPromptResponse } from '../data/canonicalExamples'
import { lessons } from '../data/content'
import { generatedVisualAssetById } from '../data/visualAssets'
import { publicAssetPath } from '../utils/assetPath'
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

const numberedVisualAidMarkers = {
  'training-loop': 5,
  'overfitting-generalization': 4,
  'before-morning-finetuning-path': 4,
  'inference-pass': 5,
  'prompt-response': 4,
  'tokenization': 3,
  'token-ids': 4,
  embeddings: 4,
  vectors: 3,
  tensors: 3,
  autoregression: 4,
  'context-window': 3,
  'rag-retrieval': 5,
  'grounding-evidence': 4,
  'hallucination-bridge': 4,
  'ai-learns': 4
}

const visualAidTemplateById = {
  'before-morning-llm-cloud': 'Atmospheric Scene',
  'ai-family-tree': 'Taxonomy Map',
  traditions: 'Comparison Board',
  'training-loop': 'Mechanism Flow',
  'before-morning-pretraining-landscape': 'Atmospheric Scene',
  'overfitting-generalization': 'Comparison Board',
  'before-morning-finetuning-path': 'Boundary Board',
  'before-morning-alignment-garden': 'Atmospheric Scene',
  'inference-pass': 'Vertical Mechanism Strip',
  'prompt-response': 'Mechanism Flow',
  tokenization: 'Mechanism Flow',
  'token-ids': 'Mechanism Flow',
  embeddings: 'Mechanism Flow',
  vectors: 'Tray / Stack / Bars',
  tensors: 'Tray / Stack / Bars',
  attention: 'Boundary Board',
  mlp: 'Boundary Board',
  layers: 'Vertical Mechanism Strip',
  'hidden-states': 'Boundary Board',
  logits: 'Probability Bars',
  softmax: 'Probability Bars',
  sampling: 'Probability Bars',
  autoregression: 'Mechanism Flow',
  'context-window': 'Tray / Stack / Bars',
  'rag-retrieval': 'Context Tray / Stack',
  'grounding-evidence': 'Context Tray / Stack',
  'hallucination-bridge': 'Comparison Board',
  'ai-learns': 'Comparison Board',
  diffusion: 'Comparison Board',
  multimodal: 'Taxonomy Map',
  'perfect-storm': 'Taxonomy Map',
  'collective-intelligence-lantern': 'Taxonomy Map',
  'benefits-tool-garden': 'Taxonomy Map',
  'costs-invisible-factory': 'Taxonomy Map',
  'human-centered-ai-garden': 'Taxonomy Map',
  'responsible-ai-forked-path': 'Taxonomy Map',
  'prompting-context-tray': 'Context Tray / Stack',
  'synthesis-map-compass-lantern': 'Boundary Board',
  risk: 'Taxonomy Map'
}

const handSpecifiedTemplateVisualIds = new Set([
  'before-morning-finetuning-path',
  'inference-pass',
  'attention',
  'mlp',
  'layers',
  'hidden-states',
  'vectors',
  'tensors',
  'context-window',
  'synthesis-map-compass-lantern'
])

function getVisualAidTemplate(aid) {
  return visualAidTemplateById[aid.id] ?? 'Mechanism Flow'
}

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

const journeyVisualAssetManifestUrl = publicAssetPath('assets/journey-visuals/v0-28/manifest.json')
let journeyVisualAssetManifestCache = undefined
let journeyVisualAssetManifestPromise = null

function loadJourneyVisualAssetManifest() {
  if (journeyVisualAssetManifestCache !== undefined) return Promise.resolve(journeyVisualAssetManifestCache)
  if (journeyVisualAssetManifestPromise) return journeyVisualAssetManifestPromise
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    journeyVisualAssetManifestCache = null
    return Promise.resolve(null)
  }

  journeyVisualAssetManifestPromise = window.fetch(journeyVisualAssetManifestUrl)
    .then((response) => (response.ok ? response.json() : null))
    .then((manifest) => {
      journeyVisualAssetManifestCache = manifest
      return manifest
    })
    .catch(() => {
      journeyVisualAssetManifestCache = null
      return null
    })

  return journeyVisualAssetManifestPromise
}

function useJourneyVisualAsset(cardId) {
  const [manifest, setManifest] = React.useState(journeyVisualAssetManifestCache)

  React.useEffect(() => {
    let cancelled = false
    loadJourneyVisualAssetManifest().then((nextManifest) => {
      if (!cancelled) setManifest(nextManifest)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!cardId || !manifest?.assets?.length) return null
  return manifest.assets.find((asset) => asset.cardId === cardId) ?? null
}

function manifestAssetPath(assetPath) {
  return publicAssetPath(String(assetPath ?? '').replace(/^\//, ''))
}

function shouldRenderJourneyVisualAsset(asset) {
  return asset?.status === 'live'
}

function getJourneyVisualAssetCallouts(asset) {
  return (asset?.callouts ?? []).map((callout, index) => ({
    number: index + 1,
    heading: callout.label ?? `Detail ${index + 1}`,
    body: callout.text
  }))
}

function getJourneyVisualDisplayAid(aid, asset) {
  return {
    ...aid,
    title: asset.title ?? aid.title,
    caption: asset.caption ?? aid.caption,
    accessibleDescription: asset.alt ?? aid.accessibleDescription,
    printNote: asset.notes ?? aid.printNote
  }
}

function generatedAid(assetId, fields) {
  const asset = generatedVisualAssetById[assetId]
  return {
    ...fields,
    pattern: 'generatedImage',
    variant: 'generated-image',
    generatedAssetId: asset.id,
    objective: fields.objective ?? asset.purpose,
    callouts: fields.callouts ?? asset.callouts,
    calloutStyle: fields.calloutStyle ?? 'bullets',
    markerCount: fields.markerCount ?? 0,
    keyTakeaway: fields.keyTakeaway ?? asset.keyTakeaway,
    accessibleDescription: fields.accessibleDescription ?? asset.accessibilityDescription,
    printNote: fields.printNote ?? asset.sourceNote
  }
}

export const visualAidCatalog = [
  generatedAid('before-morning-llm-cloud', { id: 'before-morning-llm-cloud', title: 'Prompt to Prediction', subtitle: 'Score, choose, append, repeat', caption: 'Current context enters the model, learned weights shape next-token probabilities, one token is generated, and the response grows token by token.' }),
  { id: 'ai-family-tree', title: 'AI Family Tree', subtitle: 'Where LLMs fit', caption: 'A clean taxonomy tree shows AI as the broad field, machine learning as one branch inside AI, and LLMs as one branch inside generative AI.', pattern: 'aiTopology', objective: 'Give learners a simple topology of AI categories before the history card introduces rules-first and learned-pattern traditions.', callouts: [{ heading: 'AI', body: 'AI is the broad field.' }, { heading: 'Machine learning', body: 'Machine learning systems learn patterns from data.' }, { heading: 'Deep learning', body: 'Deep learning is a neural-network branch of machine learning.' }, { heading: 'Generative AI', body: 'Generative AI creates new media, such as text, images, audio, code, or video.' }, { heading: 'LLMs', body: 'LLMs generate language/code; diffusion and multimodal systems are neighboring generative AI branches.' }], keyTakeaway: 'An LLM is one kind of generative AI inside the broader AI family.', accessibleDescription: 'A taxonomy tree starts at AI. One branch is Rule-based AI. Another branch is Machine learning, which splits into Classical ML and Deep learning. Deep learning splits into Other deep learning and Generative AI. Generative AI branches into LLMs, Diffusion, and Multimodal systems.', printNote: 'Coded SVG only; no generated PNG asset. Keep the taxonomy labels in SVG and the definitions in HTML callouts below the diagram.' },
  { id: 'traditions', title: 'Rules and Learned Patterns', subtitle: 'Two traditions, one modern toolkit', caption: 'Rules-first AI uses symbols and if-then logic; deep learning learns from examples by predicting, measuring loss, and updating weights.', pattern: 'traditions', objective: 'Contrast explicit rules with learned patterns without turning the diagram into a poster.', callouts: [{ heading: 'Rules', body: 'Symbolic systems use explicit if/then logic and symbols.' }, { heading: 'Examples', body: 'Loss is the training signal: it measures prediction error so weights can be adjusted.' }, { heading: 'Bridge', body: 'Modern systems often combine learned models with rules, retrieval, tools, filters, and policies.' }], keyTakeaway: 'Modern AI often blends learned patterns with hand-built rules and tools.', accessibleDescription: 'Two side-by-side panels compare rules, symbols, and if-then logic with examples, loss as a prediction-error signal, and weights, joined by a bridge labeled combine both.', printNote: 'Short panel labels only; explanatory comparison stays in HTML callouts.' },
  { id: 'training-loop', title: 'Training Loop', subtitle: 'Durable change happens at weight update', caption: 'Predict, compare, loss, update weights, repeat. Training changes weights.', pattern: 'training', objective: 'Show the sequence of training and make the durable weight-update step visually distinct.', callouts: [{ heading: 'Predict', body: 'The model predicts a target.' }, { heading: 'Compare', body: 'The prediction is compared with the target.' }, { heading: 'Loss', body: 'Loss measures error.' }, { heading: 'Update weights', body: 'Weight updates are the durable-change step.' }, { heading: 'Repeat', body: 'The loop repeats many times.' }], keyTakeaway: 'Training changes weights; ordinary inference does not.', accessibleDescription: 'A five-step loop moves from Predict to Compare to Loss to Update weights to Repeat, with Update weights highlighted.', printNote: 'Five nodes stay aligned at 320px and in exported review PDFs.' },
  generatedAid('before-morning-pretraining-landscape', { id: 'before-morning-pretraining-landscape', title: 'Broad Pretraining', subtitle: 'Scale, not perfect recall', caption: 'Many examples flow through the training loop. Repeated updates shape weights into broad patterns the model can use later. This does not make the model a perfect memory of its sources.' }),
  { id: 'overfitting-generalization', title: 'Overfitting vs Generalization', caption: 'Memorizing training examples is not the same as learning patterns that transfer to set-aside validation examples.', pattern: 'overfitting', callouts: [{ heading: 'Training examples', body: 'Old dots are examples the model fit during training.' }, { heading: 'Validation examples', body: 'Set-aside examples are kept out of training to test transfer.' }, { heading: 'Overfit curve', body: 'The overfit curve traces old dots too tightly.' }, { heading: 'Generalizing curve', body: 'The smoother curve reaches new examples better.' }], keyTakeaway: 'A model should learn transferable patterns, not just memorize the training dots.', accessibleDescription: 'A plot shows training dots, set-aside validation squares, a jagged overfit curve, and a smoother generalizing curve with numbered markers one through four.', printNote: 'Coded SVG only; the marker numbers must match the four HTML callouts.' },
  { id: 'before-morning-finetuning-path', title: 'Durable vs Temporary Steering', subtitle: 'Fine-tuning is not prompting', caption: 'Fine-tuning or adapters can shape future responses. Prompting, retrieval, and sampling shape the current run.', pattern: 'fineTuningCompare', objective: 'Separate durable fine-tuning or adapters from prompt, retrieval, and sampling behavior during one run.', callouts: [{ heading: 'Durable adaptation', body: 'Additional training or adapters can carry a pattern into later runs.' }, { heading: 'Prompting', body: 'A prompt steers the current context.' }, { heading: 'Retrieval', body: 'Outside material helps only after it enters context.' }, { heading: 'Sampling', body: 'Sampling chooses one next token; it does not train the model.' }], keyTakeaway: 'Fine-tuning can shape future behavior; prompting, retrieval, and sampling shape this run.', accessibleDescription: 'A four-column boundary board separates train or adapt, prompt, retrieve, and sample. The board distinguishes future patterns, current context, outside evidence, and next-token choice.', printNote: 'Coded Boundary Board; all durable-versus-temporary details stay in HTML callouts.' },
  generatedAid('before-morning-alignment-garden', { id: 'before-morning-alignment-garden', title: 'Alignment Landscape', subtitle: 'Shaping behavior, not conscience', caption: 'Alignment encourages preferred behavior, uses guardrails to reduce risky paths, and relies on feedback and policies without giving the model a conscience.' }),
  { id: 'inference-pass', title: 'Forward Pass', subtitle: 'Fixed weights, temporary activations', caption: 'Inference uses fixed learned weights and current context to produce next-token scores.', pattern: 'inference', objective: 'Trace inference as a forward pass using fixed learned weights and temporary internal values.', callouts: [{ heading: 'Context', body: 'What the model can currently use.' }, { heading: 'Fixed weights', body: 'Learned numbers from training.' }, { heading: 'Temporary activations', body: 'Internal values created for this run.' }, { heading: 'Scores', body: 'Raw next-token scores.' }, { heading: 'Next token', body: 'One token is selected and appended.' }], keyTakeaway: 'Inference uses weights without normally updating them.', accessibleDescription: 'A five-row vertical mechanism strip moves from context to fixed weights, temporary activations, scores, and next token.', printNote: 'Coded Vertical Mechanism Strip; fixed and temporary states are separated by row labels and HTML callouts.' },
  { id: 'prompt-response', title: 'Prompt vs Response', subtitle: 'Given context versus generated tokens', caption: 'Prompt tokens are given to the model; response tokens are generated one at a time and appended to the next context.', pattern: 'promptResponse', objective: 'Separate the complete user prompt from response-so-far, next token, and the current context for the next run.', callouts: [{ heading: 'Given prompt', body: 'The request "Describe two pets in conflict" is already provided input.' }, { heading: 'Generated response', body: 'The response-so-far "A jealous dog" was generated by the model.' }, { heading: 'Next token', body: 'The newly selected token "chased" is appended to the response.' }, { heading: 'Updated context', body: 'The next run sees prompt plus response so far plus the new token.' }], keyTakeaway: 'Prompt is given; response tokens are generated and appended.', accessibleDescription: 'A roomier stacked visual shows given prompt tokens, generated response-so-far tokens, a separate newly selected next token, and an updated-context tray that combines them for the next run.', printNote: 'Coded SVG/HTML only; do not bake long text into the visual.' },
  { id: 'tokenization', title: 'Text to Tokens', subtitle: 'Uneven chunks, punctuation included', caption: 'Text is split into model-readable chunks before token IDs and embedding lookup.', pattern: 'token', objective: 'Show that tokens can be words, word pieces, punctuation, or other chunks.', callouts: [{ heading: 'Simplified split', body: 'A | jealous | dog | chased | a | startled | cat | across | the | kitchen | floor | .' }, { heading: 'Uneven chunks', body: 'Some tokenizers may split words or punctuation, such as start | led or floor | .' }, { heading: 'Teaching note', body: 'This app uses a simplified split; real tokenizer output can differ.' }], keyTakeaway: 'Tokens are model-readable chunks, not always human words.', accessibleDescription: 'The visual starts with a sentence, then shows simplified token chips and uneven examples for startled and floor punctuation.', printNote: 'Keep token chips wrapping; avoid dense tokenizer internals.' },
  { id: 'token-ids', title: 'Token IDs', subtitle: 'Lookup keys, not meaning', caption: 'Each token gets a lookup number that points to an embedding-table row.', pattern: 'ids', objective: 'Separate the token string, its numeric ID, and the embedding row the ID selects.', callouts: [{ heading: 'Token', body: 'dog, cat, and floor are text chunks.' }, { heading: 'ID', body: '421, 982, and 1576 are lookup keys.' }, { heading: 'Embedding row', body: 'The ID points to the learned starting vector row.' }, { heading: 'Limit', body: 'The number itself is not the meaning.' }], keyTakeaway: 'Token IDs point; they do not understand.', accessibleDescription: 'Three token cards connect to ID cards, which connect to highlighted rows in an embedding table.', printNote: 'Coded visual only because the exact labels matter.' },
  { id: 'embeddings', title: 'Embedding Lookup', subtitle: 'Durable table, temporary vector', caption: 'A token ID retrieves a learned starting vector from a durable embedding table.', pattern: 'vector', objective: 'Distinguish the durable learned table from the temporary vector retrieved for the current run.', callouts: [{ heading: 'Durable table', body: 'The embedding table was learned during training.' }, { heading: 'Temporary retrieval', body: 'Inference retrieves one row for the current context.' }, { heading: 'Starting vector', body: 'The retrieved vector starts the token in numerical space.' }, { heading: 'Hidden state later', body: 'Transformer layers later reshape it into context-shaped hidden states.' }], keyTakeaway: 'Embedding means learned starting vector, not dictionary definition.', accessibleDescription: 'ID 1576 points into a durable table, retrieves one temporary vector, and then a later hidden-state note sits downstream.', printNote: 'Best future Image 2 candidate, but this pass keeps a coded visual.' },
  { id: 'vectors', title: 'Feature Vector', subtitle: 'Many numbers at once', caption: 'A vector represents something with many numbers at once.', pattern: 'bars', objective: 'Show a vector as a distributed list of numerical features, not one neat meaning slot.', callouts: [{ heading: 'Not one slot', body: 'Meaning is not stored in one neat dimension.' }, { heading: 'Distributed features', body: 'Useful patterns are spread across many values.' }, { heading: 'Model-readable', body: 'Vectors let the model compute with text-like inputs.' }], keyTakeaway: 'A vector carries distributed numerical features.', accessibleDescription: 'A horizontal vector strip contains shaded cells with a short label that says features are spread out.', printNote: 'Coded Tray / Stack / Bars visual; do not imply each dimension has a clean human label.' },
  { id: 'tensors', title: 'Tensor Block', subtitle: 'Rows, columns, and batches', caption: 'A tensor is a shaped block of numbers, often holding many token vectors at once.', pattern: 'tensor', objective: 'Show tensors as shaped numerical blocks that organize many vectors for computation.', callouts: [{ heading: 'Vector', body: 'One list of numbers.' }, { heading: 'Tensor', body: 'Many vectors arranged in a shape.' }, { heading: 'Shape matters', body: 'Rows, columns, and batches organize computation.' }], keyTakeaway: 'Tensors are shaped blocks of numbers.', accessibleDescription: 'A small stacked grid labels tokens, features, and batch as the three organizing directions of a tensor.', printNote: 'Coded Tray / Stack / Bars visual; keep the grid readable at 320px.' },
  { id: 'attention', title: 'Relevance Between Tokens', subtitle: 'Weighted relevance, not awareness', caption: 'Attention weights relevance between token positions. It is not awareness.', pattern: 'attention', objective: 'Use a concrete sentence to show that attention weights token relevance without implying awareness.', callouts: [{ heading: 'Target token', body: '"it" is the token being updated.' }, { heading: 'Strong clue', body: '"cat" fits the local sentence relationship.' }, { heading: 'Weaker clue', body: '"dog" is nearby context but less useful here.' }, { heading: 'Limit', body: 'Attention is calculation over positions, not consciousness.' }], keyTakeaway: 'Attention is weighted relevance between token positions, not consciousness.', accessibleDescription: 'Sentence chips show dog, saw, cat, because, it, and hissed. The target token it connects strongly to cat and faintly to dog.', printNote: 'Coded Boundary Board with SVG arcs only; token labels remain HTML.' },
  { id: 'mlp', title: 'Attention vs MLP', subtitle: 'Mix positions or reshape features', caption: 'Attention mixes information across token positions. The MLP reshapes each token position’s features.', pattern: 'mlp', objective: 'Show the attention-versus-MLP distinction: attention mixes token positions; MLP reshapes each token vector independently.', callouts: [{ heading: 'Attention', body: 'Asks which positions matter to this token.' }, { heading: 'MLP', body: 'Transforms the token’s feature vector at that position.' }, { heading: 'Together', body: 'Both help update hidden states inside a layer.' }], keyTakeaway: 'Attention mixes positions; MLP reshapes features.', accessibleDescription: 'A two-column boundary board compares attention, which mixes positions, with MLP, which reshapes features.', printNote: 'Coded Boundary Board; no generated PNG or heavy 3D library.' },
  { id: 'layers', title: 'Transformer Layer Strip', subtitle: 'Refine, then repeat', caption: 'A transformer layer refines hidden states; many layers repeat the same kind of update.', pattern: 'layers', objective: 'Show a transformer layer as repeated hidden-state refinement without implying human thought steps.', callouts: [{ heading: 'Hidden states', body: 'Temporary internal vectors.' }, { heading: 'Attention', body: 'Mixes relevant token-position information.' }, { heading: 'MLP', body: 'Reshapes features.' }, { heading: 'Repeat', body: 'Later layers refine the representation again.' }], keyTakeaway: 'Layers refine hidden states during the run; they do not store permanent memory.', accessibleDescription: 'A five-row vertical mechanism strip moves from hidden states to attention, MLP, updated states, and repeat layer.', printNote: 'Coded Vertical Mechanism Strip; no heavy 3D dependency.' },
  { id: 'hidden-states', title: 'Embedding, Hidden State, Weight', subtitle: 'Temporary is not durable', caption: 'A hidden state is temporary and context-shaped. It is not the same as an embedding or a durable weight.', pattern: 'hidden', objective: 'Contrast embedding, hidden state, and weight without making hidden states mysterious.', callouts: [{ heading: 'Embedding', body: 'The learned starting vector for a token ID.' }, { heading: 'Hidden state', body: 'The token’s temporary representation after context processing.' }, { heading: 'Weight', body: 'Learned model parameter reused across runs.' }], keyTakeaway: 'Hidden states are temporary internal vectors shaped by current context.', accessibleDescription: 'A three-column comparison board separates embedding as a starting vector, hidden state as context-shaped, and weight as a durable parameter.', printNote: 'Coded Boundary Board; keep the temporary-versus-durable distinction in the callouts.' },
  { id: 'logits', title: 'Raw Scoreboard', subtitle: 'Before probabilities', caption: 'Logits are raw next-token scores before probabilities.', pattern: 'logits', objective: 'Show final hidden state becoming raw vocabulary scores before softmax.', callouts: [{ heading: 'Hidden state arrives', body: 'The final context-shaped vector reaches the output scoring step.' }, { heading: 'Candidates get scores', body: 'Possible next tokens such as floor, mat, kitchen, and banana receive raw logits.' }, { heading: 'Scores rank candidates', body: 'Higher score means a stronger local candidate in this context.' }, { heading: 'Softmax comes next', body: 'Softmax converts raw scores into probabilities.' }], keyTakeaway: 'Logits are raw next-token scores, not probabilities.', accessibleDescription: 'The diagram starts with a final hidden state flowing into raw score bars for floor, mat, kitchen, and banana. The bars show candidate scores before probability conversion.', printNote: 'Coded SVG only; exact candidate labels and raw-score bars matter.' },
  { id: 'softmax', title: 'Score to Probability', subtitle: 'Normalize before choosing', caption: 'Softmax turns raw scores into probabilities that sum to one.', pattern: 'softmax', objective: 'Show raw-score values becoming rounded probabilities that sum to one.', callouts: [{ heading: 'Logits go in', body: 'Raw scores for floor, mat, kitchen, and banana enter softmax.' }, { heading: 'Softmax converts', body: 'The function turns score differences into a probability distribution; it does not pick the next token.' }, { heading: 'Probabilities come out', body: 'The rounded teaching values sum to 100%.' }, { heading: 'Sampling comes next', body: 'The probability distribution is ready for a separate choice step.' }], keyTakeaway: 'Softmax normalizes raw scores; sampling chooses later.', accessibleDescription: 'The diagram shows raw score bars for floor, mat, kitchen, and banana on the left, a softmax step in the middle, and probabilities on the right that sum to 100 percent.', printNote: 'Coded SVG only; values are rounded teaching numbers and should remain visible at 320px.' },
  { id: 'sampling', title: 'Weighted Token Choice', subtitle: 'One token chosen', caption: 'Sampling chooses one next token from the probability-shaped options. Likely is not the same as true.', pattern: 'sampling', objective: 'Show probability weights and the single selected next token before autoregression repeats.', callouts: [{ heading: 'Probability candidates', body: 'floor is strongest, mat is plausible, kitchen is weaker, and banana is unlikely in this context.' }, { heading: 'One token chosen', body: 'The decoding step chooses one next response token.' }, { heading: 'Append next', body: 'The chosen token is appended before the model runs again.' }, { heading: 'Fit is not proof', body: 'A likely token can fit the model pattern and still need evidence in a factual claim.' }], keyTakeaway: 'Sampling chooses one token from probabilities; likely is not the same as true.', accessibleDescription: 'The diagram shows weighted candidates floor, mat, kitchen, and banana. One selected-token card says floor, showing that sampling chooses a single next token from probability-shaped options.', printNote: 'Coded SVG only; keep temperature/top-k/top-p out of the main visual.' },
  { id: 'autoregression', title: 'Append and Repeat', subtitle: 'One token, append, run again', caption: `The chosen token "${canonicalPromptResponse.chosenNextToken}" is appended to the response-so-far, then the model runs again.`, pattern: 'loop', objective: 'Make the autoregressive loop concrete: choose one token, append it, run the model again, and grow the response.', callouts: [{ heading: 'Response so far', body: `The model has generated: ${canonicalPromptResponse.responseSoFar}.` }, { heading: 'Choose token', body: `Sampling chooses one next token, here "${canonicalPromptResponse.chosenNextToken}".` }, { heading: 'Append', body: 'The chosen token becomes part of the temporary current context.' }, { heading: 'Run again', body: 'The next forward pass sees the longer response-so-far and chooses again.' }], keyTakeaway: 'Autoregression is choose, append, repeat; it is not permanent learning.', accessibleDescription: 'A concrete loop shows the user prompt, response so far, the chosen token floor, the updated context, and the steps choose token, append, run again, and response grows.', printNote: 'Coded SVG only; keep the token example and step labels readable at 320px.' },
  { id: 'context-window', title: 'Temporary Context Window', subtitle: 'Limited visible input', caption: 'The context window is the limited visible workspace for the current run.', pattern: 'window', objective: 'Show the context window as temporary capacity: current cards can shape the next token, old context can fall out, and retrieved material helps only after entering context.', callouts: [{ heading: 'Visible now', body: 'Only current context can shape the next token.' }, { heading: 'Falls out', body: 'Old content can stop being visible.' }, { heading: 'Retrieved material', body: 'Outside evidence helps only after it enters context.' }], keyTakeaway: 'Context is temporary visible input, not durable memory.', accessibleDescription: 'A bounded context tray holds four visible cards, an old card sits outside as fallen-out context, and a retrieved card is entering the tray.', printNote: 'Coded Tray / Stack / Bars visual; use short card labels and put the fuller explanation in HTML callouts.' },
  { id: 'rag-retrieval', title: 'Open-Book Retrieval', subtitle: 'Retrieval plus context, not training', caption: 'Retrieved notes enter the context before response tokens are generated.', pattern: 'rag', variant: 'retrieval-shelf', objective: 'Show that RAG retrieves outside information and places it into context; it does not train the model.', callouts: [{ heading: 'Ask', body: 'The user prompt starts the run.' }, { heading: 'Retrieve', body: 'A search system finds relevant outside material.' }, { heading: 'Add to context', body: 'Retrieved notes become temporary context tokens.' }, { heading: 'Generate', body: 'The model still generates response tokens one at a time.' }, { heading: 'Weights stay fixed', body: 'RAG does not normally update model weights.' }], keyTakeaway: 'RAG is retrieval plus context, not training.', accessibleDescription: 'The RAG diagram moves from Prompt to Retriever to Notes, then into a Context tray and Generated response, with a separate fixed-weights note.', printNote: 'v0.10 pilot visual: paper-layer nodes, subtle neon retrieval path, HTML callouts, and a one-sentence takeaway.' },
  { id: 'grounding-evidence', title: 'Claim Support Map', subtitle: 'Tying answers to evidence', caption: 'Grounding asks whether generated claims are actually connected to available evidence.', pattern: 'groundingEvidence', variant: 'retrieval-shelf', objective: 'Show grounding as a claim-to-evidence support relationship, not a truth guarantee.', callouts: [{ heading: 'Claim', body: 'A generated answer can contain several claims.' }, { heading: 'Evidence', body: 'Retrieved passages, data, citations, or tool results can support some claims.' }, { heading: 'Support check', body: 'A citation-looking answer is not grounded unless the evidence actually matches the claim.' }, { heading: 'Limit', body: 'Grounding helps, but the evidence and its use still need review.' }], keyTakeaway: 'Grounding ties claims to evidence; it does not make every claim true.', accessibleDescription: 'Two generated claims are shown. One claim connects to a retrieved policy passage and data result. A second claim has a missing support line and is marked needs review.', printNote: 'Keep the claim/evidence labels short; detailed source review stays in HTML callouts.' },
  { id: 'hallucination-bridge', title: 'Unsupported Bridge', subtitle: 'Fluent is not always grounded', caption: 'A response can look smooth while one claim has support, another is uncertain, and another lacks evidence.', pattern: 'hallucinationBridge', variant: 'zen-garden-map', objective: 'Show hallucination as fluent generated output without enough evidence support, without implying lying or intent.', callouts: [{ heading: 'Fluent surface', body: 'The output may read smoothly and confidently.' }, { heading: 'Supported claim', body: 'One claim can be tied to evidence.' }, { heading: 'Missing support', body: 'Another claim may lack evidence, citation, or retrieved context.' }, { heading: 'Review', body: 'Grounding, uncertainty, and human review reduce risk but do not erase it.' }], keyTakeaway: 'Fluency is not evidence.', accessibleDescription: 'A smooth output bridge crosses the scene. One evidence pillar supports a claim, one support is marked uncertain, and one is missing, with a review note below.', printNote: 'Use short labels only; the not-lying distinction remains in lesson copy.' },
  { id: 'ai-learns', title: 'Learning Modes Matrix', subtitle: 'Durable change or current-run steering', caption: 'Training, fine-tuning, feedback, prompting, RAG, and evaluation affect different parts of an AI system.', pattern: 'learns', objective: 'Compare ways systems change, retrieve, or are steered without implying every useful response updates model weights.', callouts: [{ heading: 'Training', body: 'Pretraining and fine-tuning can durably update weights or adapter weights.' }, { heading: 'Prompting', body: 'Prompts and in-context examples steer the current run.' }, { heading: 'RAG', body: 'Retrieval adds outside material to context; it does not normally train the model.' }, { heading: 'Evaluation', body: 'Review and tests can help future systems when results feed development or training.' }], keyTakeaway: 'Not all useful AI behavior is durable learning.', accessibleDescription: 'A compact matrix compares training, fine-tuning, human feedback, prompting, RAG, and evaluation across weight changes, current context, future behavior, and timing.', printNote: 'Coded SVG only. Keep matrix labels short and put distinctions in HTML callouts.' },
  { id: 'diffusion', title: 'Append Or Denoise', subtitle: 'Two generation patterns', caption: 'Autoregressive text generation appends tokens; diffusion-style generation refines noisy patterns.', pattern: 'diffusion', objective: 'Make LLM token-by-token generation visibly different from diffusion denoising.', callouts: [{ heading: 'Autoregression', body: 'The text response grows by choosing and appending one token at a time.' }, { heading: 'Diffusion', body: 'A noisy representation is refined step by step toward an output.' }, { heading: 'Both generative', body: 'Both can create new outputs, but the generation patterns differ.' }], keyTakeaway: 'Generative AI is not one mechanism.', accessibleDescription: 'A split diagram shows an autoregressive lane with token, append, token, append and a diffusion lane with noise, rough shape, clearer image, final.', printNote: 'Coded SVG only; no generated PNG yet because exact contrast labels matter.' },
  { id: 'multimodal', title: 'Media Lane Map', subtitle: 'Input, representation, output', caption: 'Multimodal systems connect text, images, audio, video, and code through learned representations or linked components.', pattern: 'multimodal', objective: 'Show multiple media inputs and outputs without implying human-like perception.', callouts: [{ heading: 'Inputs', body: 'Text, image, audio, video, or code can enter the system.' }, { heading: 'Representation', body: 'The system encodes media into model-usable representations or linked spaces.' }, { heading: 'Outputs', body: 'Depending on the system, outputs may be answers, captions, images, audio, or code.' }, { heading: 'Limit', body: 'Multimodal processing is not human sensation or experience.' }], keyTakeaway: 'Multimodal means more than one media type, not human-like perception.', accessibleDescription: 'Inputs for text, image, audio, video, and code flow into a connected representation space, then to outputs such as caption, answer, image, audio, and code.', printNote: 'Short labels only; callouts explain the system boundary and metaphor limit.' },
  { id: 'perfect-storm', title: 'Storm Front', subtitle: 'Why LLMs arrived now', diagramCaption: 'Convergence, not one spark.', caption: 'Data, compute, storage, methods, labor, and incentives converged into modern LLM capability.', pattern: 'perfectStorm', variant: 'zen-garden-map', objective: 'Show convergence without implying one event.', callouts: [{ heading: 'Data', body: 'Human-created text, media, code, and documents supplied patterns.' }, { heading: 'Compute and storage', body: 'Hardware, data centers, datasets, and checkpoints made large-scale training practical.' }, { heading: 'Methods', body: 'Deep learning and transformer advances made the patterns usable.' }, { heading: 'Labor and incentives', body: 'Human evaluation work and market demand pushed systems into products.' }], keyTakeaway: 'Modern LLMs came from a convergence, not a single spark.', accessibleDescription: 'Six short ingredient chips labeled Data, Compute, Storage, Methods, Labor, and Incentives flow into a centered Modern LLM capability node.', printNote: 'Keep labels short and place the convergence takeaway in HTML below the diagram. Future PNG should be textless.' },
  { id: 'collective-intelligence-lantern', title: 'Borrowed Flames', subtitle: 'No creators, no model', caption: 'Human-created traces can become training data and model patterns, while rights and responsibility remain human questions.', pattern: 'collectiveLantern', variant: 'zen-garden-map', objective: 'Make human-created source traces visible without treating the model as humanity’s mind.', callouts: [{ heading: 'Human expression', body: 'Books, sites, code, art, journalism, forums, documentation, and research leave learnable traces.' }, { heading: 'Collection questions', body: 'Provenance, consent, copyright, attribution, and compensation matter.' }, { heading: 'Model limit', body: 'The model absorbs statistical patterns; it does not understand gratitude or responsibility.' }], keyTakeaway: 'The model did not create its abilities alone.', accessibleDescription: 'Human-created writing, code, art, research, forums, and documentation flow into training data, while a rights-question note stays outside the model mechanics.', printNote: 'Keep source labels short; callouts carry provenance, consent, copyright, attribution, and compensation details.' },
  { id: 'benefits-tool-garden', title: 'Benefit Tiers', subtitle: 'Benefits without utopia', caption: 'AI benefits are easiest to trust when claims are tiered by evidence, context, safeguards, and human review.', pattern: 'benefitsGarden', variant: 'zen-garden-map', objective: 'Separate useful reviewed benefits, plausible guarded benefits, and speculative hype.', callouts: [{ heading: 'Useful now with review', body: 'Accessibility, translation support, summarization, search/RAG, drafting, and coding assistance can help under human review.' }, { heading: 'Plausible with safeguards', body: 'Tutoring support, research triage, brainstorming, and workflow support should be evaluated in context.' }, { heading: 'Speculative / hype', body: 'Broad utopia, replacement, or no-cost claims should not be stated as fact.' }], keyTakeaway: 'Benefits can be real and still bounded.', accessibleDescription: 'Three benefit buckets sort claims into useful now with review, plausible with safeguards, and speculative or hype.', printNote: 'Evidence-tier chips stay in HTML callouts below the coded visual. No generated PNG in this pass.' },
  { id: 'costs-invisible-factory', title: 'Cost Ledger', subtitle: 'The answer is not weightless', caption: 'AI systems depend on infrastructure, human systems, and governance choices that need honest accounting.', pattern: 'costsFactory', variant: 'zen-garden-map', objective: 'Make AI costs visible as a ledger without inventing statistics or fear-heavy imagery.', callouts: [{ heading: 'Infrastructure', body: 'Energy, water, carbon, data centers, chips, and e-waste vary by system and workload.' }, { heading: 'Human systems', body: 'Labor disruption, deskilling, privacy, bias, and information pollution depend on deployment choices.' }, { heading: 'Power', body: 'Concentration of data, compute, and capital affects who benefits and who decides.' }], keyTakeaway: 'Costs vary, but they are real enough to count.', accessibleDescription: 'An AI answer points into a ledger with infrastructure, human systems, and power or governance categories.', printNote: 'No precise numbers in the visual; use cautious callouts.' },
  { id: 'human-centered-ai-garden', title: 'Accountability Flow', subtitle: 'Tools should serve dignity', caption: 'A human-centered deployment treats AI output as support inside a decision context, then keeps review, governance, and accountable action with people.', pattern: 'humanGarden', variant: 'zen-garden-map', objective: 'Make human-centered AI concrete through a support-note accountability scenario.', callouts: [{ heading: 'Human judgment', body: 'People remain accountable for high-stakes decisions and institutional use.' }, { heading: 'Dignity', body: 'Speed, profit, and automation should not outrank persons, learning, or relationships.' }, { heading: 'Model limit', body: 'A model can sound ethical without moral understanding.' }], keyTakeaway: 'Powerful tools still need human purpose.', accessibleDescription: 'An AI summary moves into a decision context affecting people, then flows through human review and governance before accountable action.', printNote: 'Avoid robot imagery; accountability flow is the visual anchor.' },
  { id: 'responsible-ai-forked-path', title: 'Better-AI Control Panel', subtitle: 'Responsible AI is chosen', caption: 'AI outcomes are shaped by design, deployment, governance, incentives, and institutional choices.', pattern: 'responsiblePath', variant: 'zen-garden-map', objective: 'Show practical design and governance levers without pretending governance is simple.', callouts: [{ heading: 'Technical choices', body: 'Smaller models, efficient inference, distillation, RAG, and better hardware use can fit some tasks.' }, { heading: 'Data choices', body: 'Provenance, consent, licensing, creator compensation, and privacy-preserving deployment matter.' }, { heading: 'Institutional choices', body: 'Human review, policy, labor transition planning, public-interest models, and independent evaluation shape outcomes.' }], keyTakeaway: 'Harms are shaped by choices, not destiny.', accessibleDescription: 'A compact control panel shows levers for provenance, privacy, efficient inference, RAG, review, evaluation, labor, sustainability, governance, and task fit.', printNote: 'Keep lever labels short; mitigations stay in HTML callouts.' },
  { id: 'prompting-context-tray', title: 'Context Tray', subtitle: 'Prompting steers this run', caption: 'Good prompts pack task, context, constraints, examples, evidence needs, uncertainty, review, and format into the current run.', pattern: 'promptingTray', variant: 'retrieval-shelf', objective: 'Show prompting as context design, not permanent teaching.', callouts: [{ heading: 'Prompt parts', body: 'Task, context, constraints, examples, evidence needs, uncertainty, review, and format shape the current input.' }, { heading: 'Evidence and uncertainty', body: 'Source needs, retrieved context, and uncertainty requests can improve reviewability.' }, { heading: 'Boundary', body: 'Prompting usually changes context, not weights.' }], keyTakeaway: 'Prompting is context design for one run.', accessibleDescription: 'Prompt component cards drop into a transparent current context tray before one generated response leaves it.', printNote: 'Use short component labels inside the tray.' },
  { id: 'synthesis-map-compass-lantern', title: 'Model Literacy Board', subtitle: 'Mechanics plus judgment', caption: 'Model literacy connects how the system works with how humans should use it.', pattern: 'synthesisMap', variant: 'zen-garden-map', objective: 'Connect mechanics, evidence checking, and human accountability into a durable mental model.', callouts: [{ heading: 'Mechanics', body: 'Prompts become tokens, scores, probabilities, and generated tokens.' }, { heading: 'Evidence', body: 'Fluent output still needs checking.' }, { heading: 'Responsibility', body: 'Humans remain accountable for use, review, and decisions.' }], keyTakeaway: 'Mechanics matter, and humans remain responsible.', accessibleDescription: 'A three-lane synthesis board groups model mechanics, evidence checking, and human responsibility.', printNote: 'Coded Boundary Board; keep the final synthesis simple enough for phone review.' },
  { id: 'risk', title: 'Risk Ledger', subtitle: 'Mechanisms, not myth', caption: 'Risk literacy separates practical, mechanism-based risks from myths about what models are.', pattern: 'risk', variant: 'zen-garden-map', objective: 'Separate concrete institutional risks from unsupported claims without doom or hype.', callouts: [{ heading: 'Real mechanisms', body: 'Privacy exposure, hallucinations, prompt injection, insecure tools, overreliance, and bias can cause practical harm.' }, { heading: 'Myths', body: 'Conscious chatbots, omniscient databases, secret self-training during every chat, and softmax stealing files are unsupported claims.' }, { heading: 'Human accountability', body: 'Institutions, vendors, policies, and affected communities shape how risks are prevented and reviewed.' }], keyTakeaway: 'Real AI risks usually come from data, context, tools, institutions, and overreliance, not model consciousness or an unexplained shortcut.', accessibleDescription: 'A two-column ledger sorts real mechanism risks from myths or unsupported claims.', printNote: 'Keep column labels short; detailed claims stay in the lesson and interaction.' }
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
    heading: `Detail ${index + 1}`,
    body
  }))
}

function getMarkerCount(aid) {
  return aid.markerCount ?? numberedVisualAidMarkers[aid.id] ?? 0
}

function getCalloutStyle(aid, callouts) {
  if (aid.calloutStyle) return aid.calloutStyle
  const markerCount = getMarkerCount(aid)
  return markerCount > 0 && markerCount === callouts.length ? 'numbered' : 'bullets'
}

// Visual aids must use short in-diagram labels plus HTML callouts because mobile
// screens and PDF export cannot reliably preserve dense SVG text layouts.
export function VisualAid({ id, headingId = undefined, compact = false }) {
  const aid = aidById[id] ?? aidById['before-morning-llm-cloud']
  return <VisualAidCard aid={aid} headingId={headingId} compact={compact} />
}

function VisualAidCard({ aid, headingId = undefined, compact = false }) {
  const lesson = lessonByVisualAidId[aid.id]
  const journeyAsset = useJourneyVisualAsset(lesson?.id)
  const useJourneyAsset = shouldRenderJourneyVisualAsset(journeyAsset)
  const displayAid = useJourneyAsset ? getJourneyVisualDisplayAid(aid, journeyAsset) : aid
  const callouts = useJourneyAsset ? getJourneyVisualAssetCallouts(journeyAsset) : getCallouts(aid)
  const variant = useJourneyAsset ? 'generated-image' : getVisualAidVariant(aid)
  const calloutStyle = useJourneyAsset ? 'bullets' : getCalloutStyle(aid, callouts)
  const markerCount = useJourneyAsset ? 0 : getMarkerCount(aid)
  return (
    <VisualAidFrame aid={displayAid} headingId={headingId} compact={compact} variant={variant} calloutStyle={calloutStyle} markerCount={markerCount} hasJourneyAsset={useJourneyAsset}>
      <DiagramScene aid={aid} variant={variant} journeyAsset={useJourneyAsset ? journeyAsset : null} />
      {!useJourneyAsset && aid.diagramCaption && <p className="aid-diagram-caption">{aid.diagramCaption}</p>}
      <VisualAidCaption aid={displayAid} callouts={callouts} calloutStyle={calloutStyle} />
    </VisualAidFrame>
  )
}

function VisualAidFrame({ aid, headingId = undefined, compact = false, variant, calloutStyle, markerCount, hasJourneyAsset = false, children }) {
  const asset = getGeneratedAsset(aid)
  const className = [
    'visual-aid',
    'visual-aid-card',
    asset || hasJourneyAsset ? 'has-generated-asset' : '',
    hasJourneyAsset ? 'has-journey-visual-asset' : '',
    compact ? 'compact' : '',
    `variant-${variant}`,
    `visual-aid-${aid.id}`
  ].filter(Boolean).join(' ')
  return (
    <figure
      className={className}
      aria-labelledby={headingId}
      data-callout-style={calloutStyle}
      data-callout-markers={markerCount}
      data-template={getVisualAidTemplate(aid)}
    >
      {children}
    </figure>
  )
}

function VisualAidCaption({ aid, callouts, calloutStyle }) {
  return (
    <figcaption>
      <div className="aid-caption-copy">
        <strong>{aid.title}</strong>
        {aid.subtitle && <em>{aid.subtitle}</em>}
        <span>{aid.caption}</span>
      </div>
      <VisualAidCallouts callouts={callouts} style={calloutStyle} />
      {aid.keyTakeaway && <KeyTakeaway text={aid.keyTakeaway} />}
      {aid.accessibleDescription && <p className="sr-only">Accessible description: {aid.accessibleDescription}</p>}
    </figcaption>
  )
}

function VisualAidCanvas({ aid, variant, className = '', children }) {
  return (
    <div className={`aid-canvas aid-${aid.pattern} aid-variant-${variant} ${className}`.trim()} aria-hidden="true">
      {children}
    </div>
  )
}

function DiagramScene({ aid, variant, journeyAsset = null }) {
  if (journeyAsset) return <JourneyVisualAssetScene aid={aid} asset={journeyAsset} variant={variant} />
  return <CodedDiagramScene aid={aid} variant={variant} />
}

function CodedDiagramScene({ aid, variant }) {
  const asset = getGeneratedAsset(aid)
  if (asset) return <GeneratedImageScene aid={aid} asset={asset} variant={variant} />
  if (aid.id === 'prompt-response') {
    return (
      <VisualAidCanvas aid={aid} variant={variant} className="aid-html-canvas">
        <PromptResponseDiagram />
      </VisualAidCanvas>
    )
  }
  if (aid.id === 'tokenization') {
    return (
      <VisualAidCanvas aid={aid} variant={variant} className="aid-html-canvas tokenization-html-canvas">
        <TokenizationDiagram />
      </VisualAidCanvas>
    )
  }
  if (handSpecifiedTemplateVisualIds.has(aid.id)) {
    return (
      <VisualAidCanvas aid={aid} variant={variant} className="aid-html-canvas aid-template-canvas">
        <HandSpecifiedVisual aid={aid} />
      </VisualAidCanvas>
    )
  }

  return (
    <VisualAidCanvas aid={aid} variant={variant}>
      <svg viewBox={aid.id === 'prompt-response' ? '0 0 320 330' : '0 0 320 210'} preserveAspectRatio="xMidYMid meet" focusable="false">
        <VisualPattern aid={aid} />
      </svg>
    </VisualAidCanvas>
  )
}

function PromptResponseDiagram() {
  return (
    <div className="prompt-response-diagram">
      <div className="pr-card pr-card-prompt">
        <div className="pr-card-header">
          <span className="pr-step-badge">1</span>
          <span className="visual-label visual-node-label pr-card-title">
            <strong>Given prompt</strong>
            <em>given first</em>
          </span>
        </div>
        <div className="pr-token-row">
          <span className="visual-label visual-chip pr-token prompt">Describe</span>
          <span className="visual-label visual-chip pr-token prompt">two pets</span>
          <span className="visual-label visual-chip pr-token prompt">conflict</span>
        </div>
      </div>

      <div className="pr-card pr-card-response">
        <div className="pr-card-header">
          <span className="pr-step-badge">2</span>
          <span className="visual-label visual-node-label pr-card-title">
            <strong>Response so far</strong>
            <em>generated tokens</em>
          </span>
        </div>
        <div className="pr-token-row">
          <span className="visual-label visual-chip pr-token response">A</span>
          <span className="visual-label visual-chip pr-token response">jealous</span>
          <span className="visual-label visual-chip pr-token response">dog</span>
        </div>
      </div>

      <div className="pr-card pr-card-next">
        <div className="pr-card-header">
          <span className="pr-step-badge">3</span>
          <span className="visual-label visual-node-label pr-card-title">
            <strong>Next token</strong>
            <em>newly selected</em>
          </span>
        </div>
        <div className="pr-token-row">
          <span className="visual-label visual-chip pr-token response">chased</span>
        </div>
      </div>

      <div className="pr-card pr-card-context">
        <div className="pr-card-header">
          <span className="pr-step-badge">4</span>
          <span className="visual-label visual-node-label pr-card-title">
            <strong>Updated context</strong>
            <em>next run sees</em>
          </span>
        </div>
        <div className="pr-token-row">
          <span className="visual-label visual-chip pr-token prompt">prompt</span>
          <span className="visual-label visual-chip pr-token response">A</span>
          <span className="visual-label visual-chip pr-token response">jealous</span>
          <span className="visual-label visual-chip pr-token response">dog</span>
          <span className="visual-label visual-chip pr-token response">chased</span>
        </div>
      </div>
    </div>
  )
}

function TokenizationDiagram() {
  const simpleTokens = ['A', 'jealous', 'dog', 'chased', 'a', 'startled', 'cat', 'across', 'the', 'kitchen', 'floor', '.']

  return (
    <div className="tokenization-diagram">
      <div className="tkn-card tkn-source">
        <div className="tkn-card-header">
          <span className="tkn-step-badge">1</span>
          <span className="visual-label visual-node-label">
            <strong>Source text</strong>
            <em>sentence</em>
          </span>
        </div>
        <div className="tkn-source-row">
          <span className="visual-label visual-chip tkn-source-phrase">A jealous dog...</span>
        </div>
      </div>

      <div className="tkn-card tkn-stream">
        <div className="tkn-card-header">
          <span className="tkn-step-badge">2</span>
          <span className="visual-label visual-node-label">
            <strong>Token stream</strong>
            <em>token chunks</em>
          </span>
        </div>
        <div className="tkn-token-grid">
          {simpleTokens.map((token, index) => (
            <span className={token === '.' ? 'visual-label visual-chip tkn-token punctuation' : 'visual-label visual-chip tkn-token'} key={`${token}-${index}`}>{token}</span>
          ))}
        </div>
      </div>

      <div className="tkn-card tkn-uneven">
        <div className="tkn-card-header">
          <span className="tkn-step-badge">3</span>
          <span className="visual-label visual-node-label">
            <strong>Uneven examples</strong>
            <em>not always words</em>
          </span>
        </div>
        <div className="tkn-split-list">
          <span className="visual-label tkn-split-label">startled</span>
          <span className="visual-label tkn-split-arrow">becomes</span>
          <span className="tkn-split-row">
            <span className="visual-label visual-chip tkn-token">start</span>
            <span className="visual-label visual-chip tkn-token">led</span>
          </span>
          <span className="visual-label tkn-split-label">floor.</span>
          <span className="visual-label tkn-split-arrow">becomes</span>
          <span className="tkn-split-row">
            <span className="visual-label visual-chip tkn-token">floor</span>
            <span className="visual-label visual-chip tkn-token punctuation">.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function VisualStepBadge({ children, tone = 'default' }) {
  return <span className={`visual-step-badge tone-${tone}`}>{children}</span>
}

function VisualMiniLabel({ children, tone = 'paper' }) {
  return <span className={`visual-label visual-node-label visual-mini-label tone-${tone}`}>{children}</span>
}

function VisualMechanismStrip({ rows }) {
  return (
    <div className="visual-mechanism-strip">
      {rows.map((row, index) => (
        <div className={`visual-strip-row tone-${row.tone ?? 'paper'}`} key={row.label}>
          <VisualStepBadge tone={row.tone ?? 'default'}>{index + 1}</VisualStepBadge>
          <VisualMiniLabel tone={row.tone ?? 'paper'}>{row.label}</VisualMiniLabel>
        </div>
      ))}
    </div>
  )
}

function VisualBoundaryBoard({ columns, className = '', numbered = false }) {
  return (
    <div className={`visual-boundary-board columns-${columns.length} ${className}`.trim()} style={{ '--column-count': columns.length } as React.CSSProperties}>
      {columns.map((column, index) => (
        <div className={`visual-boundary-column tone-${column.tone ?? 'paper'}`} key={column.title}>
          <div className="visual-boundary-heading">
            {numbered && <VisualStepBadge tone={column.tone ?? 'default'}>{index + 1}</VisualStepBadge>}
            <VisualMiniLabel tone={column.tone ?? 'paper'}>{column.title}</VisualMiniLabel>
          </div>
          {column.label && <span className="visual-label visual-chip visual-boundary-value">{column.label}</span>}
        </div>
      ))}
    </div>
  )
}

function VisualTray({ cards, outsideCard, enteringCard }) {
  return (
    <div className="visual-tray-board">
      <div className="visual-tray-entry">
        {enteringCard && <span className="visual-label visual-chip visual-tray-card entering">{enteringCard}</span>}
      </div>
      <div className="visual-tray-shell">
        <span className="visual-label visual-node-label visual-tray-title">Current context</span>
        <div className="visual-tray-card-grid">
          {cards.map((card) => (
            <span className={`visual-label visual-chip visual-tray-card ${card.tone ?? ''}`.trim()} key={card.label}>{card.label}</span>
          ))}
        </div>
      </div>
      {outsideCard && (
        <div className="visual-tray-outside">
          <span className="visual-label visual-chip visual-tray-card outside">{outsideCard}</span>
          <span className="visual-label visual-tray-note">fell out</span>
        </div>
      )}
    </div>
  )
}

function VisualProbabilityBars({ rows }) {
  return (
    <div className="visual-probability-bars">
      {rows.map((row) => (
        <div className="visual-probability-row" key={row.label}>
          <span className="visual-label visual-node-label">{row.label}</span>
          <span className="visual-probability-track"><i style={{ width: `${row.value}%` }} /></span>
        </div>
      ))}
    </div>
  )
}

function HandSpecifiedVisual({ aid }) {
  switch (aid.id) {
    case 'before-morning-finetuning-path':
      return <FineTuneBoundaryBoard />
    case 'inference-pass':
      return <InferenceStrip />
    case 'attention':
      return <AttentionRelevanceBoard />
    case 'mlp':
      return <MlpBoundaryBoard />
    case 'layers':
      return <LayersStrip />
    case 'hidden-states':
      return <HiddenStateBoundaryBoard />
    case 'vectors':
      return <VectorBarsBoard />
    case 'tensors':
      return <TensorStackBoard />
    case 'context-window':
      return <ContextWindowTray />
    case 'synthesis-map-compass-lantern':
      return <SynthesisBoundaryBoard />
    default:
      return <VisualMechanismStrip rows={[{ label: aid.title }]} />
  }
}

function FineTuneBoundaryBoard() {
  return (
    <VisualBoundaryBoard
      numbered
      columns={[
        { title: 'Train / adapt', label: 'future pattern', tone: 'output' },
        { title: 'Prompt', label: 'current context', tone: 'prompt' },
        { title: 'Retrieve', label: 'outside evidence', tone: 'mint' },
        { title: 'Sample', label: 'next token', tone: 'amber' }
      ]}
    />
  )
}

function InferenceStrip() {
  return (
    <VisualMechanismStrip
      rows={[
        { label: 'Context', tone: 'prompt' },
        { label: 'Fixed weights', tone: 'paper' },
        { label: 'Activations', tone: 'mint' },
        { label: 'Scores', tone: 'violet' },
        { label: 'Next token', tone: 'output' }
      ]}
    />
  )
}

function AttentionRelevanceBoard() {
  const tokens = [
    { label: 'dog', role: 'weak' },
    { label: 'saw' },
    { label: 'cat', role: 'source' },
    { label: 'because' },
    { label: 'it', role: 'target' },
    { label: 'hissed' }
  ]
  return (
    <div className="visual-attention-board">
      <svg viewBox="0 0 320 128" preserveAspectRatio="none" focusable="false" aria-hidden="true">
        <path className="visual-attention-arc strong" d="M236 54 C210 12, 138 12, 126 54" />
        <path className="visual-attention-arc weak" d="M236 72 C202 124, 50 124, 36 72" />
      </svg>
      <div className="visual-attention-token-row">
        {tokens.map((token) => (
          <span className={`visual-token-chip role-${token.role ?? 'plain'}`} key={token.label}>{token.label}</span>
        ))}
      </div>
      <div className="visual-attention-legend">
        <span><i className="legend-line strong" /> cat clue</span>
        <span><i className="legend-line weak" /> dog context</span>
      </div>
    </div>
  )
}

function MlpBoundaryBoard() {
  return (
    <VisualBoundaryBoard
      className="two-column"
      columns={[
        { title: 'Attention', label: 'mixes positions', tone: 'prompt' },
        { title: 'MLP', label: 'reshapes features', tone: 'output' }
      ]}
    />
  )
}

function LayersStrip() {
  return (
    <VisualMechanismStrip
      rows={[
        { label: 'Hidden states', tone: 'paper' },
        { label: 'Attention', tone: 'prompt' },
        { label: 'MLP', tone: 'output' },
        { label: 'Updated states', tone: 'mint' },
        { label: 'Repeat layer', tone: 'violet' }
      ]}
    />
  )
}

function HiddenStateBoundaryBoard() {
  return (
    <VisualBoundaryBoard
      className="hidden-state-board"
      columns={[
        { title: 'Embedding', label: 'starting vector', tone: 'prompt' },
        { title: 'Hidden state', label: 'context-shaped', tone: 'mint' },
        { title: 'Weight', label: 'durable', tone: 'amber' }
      ]}
    />
  )
}

function VectorBarsBoard() {
  const cells = [28, 58, 42, 76, 35, 64, 48, 70]
  return (
    <div className="visual-vector-board">
      <div className="visual-vector-cells" aria-hidden="true">
        {cells.map((height, index) => (
          <span key={index} style={{ '--cell-height': `${height}%` } as React.CSSProperties} />
        ))}
      </div>
      <VisualMiniLabel tone="mint">
        <span>features</span>
        <span>spread out</span>
      </VisualMiniLabel>
    </div>
  )
}

function TensorStackBoard() {
  return (
    <div className="visual-tensor-board">
      <div className="visual-tensor-stack" aria-hidden="true">
        <span className="tensor-sheet back" />
        <span className="tensor-sheet mid" />
        <span className="tensor-sheet front">
          {Array.from({ length: 20 }, (_, index) => <i key={index} />)}
        </span>
      </div>
      <div className="visual-tensor-labels">
        <VisualMiniLabel tone="prompt">tokens</VisualMiniLabel>
        <VisualMiniLabel tone="mint">features</VisualMiniLabel>
        <VisualMiniLabel tone="amber">batch</VisualMiniLabel>
      </div>
    </div>
  )
}

function ContextWindowTray() {
  return (
    <VisualTray
      enteringCard="Retrieved"
      outsideCard="Old card"
      cards={[
        { label: 'System', tone: 'prompt' },
        { label: 'User', tone: 'output' },
        { label: 'Evidence', tone: 'mint' },
        { label: 'So far', tone: 'amber' }
      ]}
    />
  )
}

function SynthesisBoundaryBoard() {
  return (
    <VisualBoundaryBoard
      columns={[
        { title: 'Model', label: 'how it works', tone: 'prompt' },
        { title: 'Evidence', label: 'what supports it', tone: 'mint' },
        { title: 'Human role', label: 'who decides', tone: 'amber' }
      ]}
    />
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
        <div className="generated-aid-quiet-frame" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  )
}

function JourneyVisualAssetScene({ aid, asset, variant }) {
  const [imageFailed, setImageFailed] = React.useState(false)
  if (imageFailed) return <CodedDiagramScene aid={aid} variant={getVisualAidVariant(aid)} />

  return (
    <div className={`aid-canvas generated-aid-canvas journey-visual-asset-canvas aid-${aid.pattern} aid-variant-${variant}`}>
      <img
        className="generated-aid-image journey-visual-asset-image"
        src={manifestAssetPath(asset.assetPath)}
        alt={asset.alt}
        loading="lazy"
        decoding="async"
        onError={() => setImageFailed(true)}
      />
    </div>
  )
}

function VisualAidCallouts({ callouts, style }) {
  return <VisualCalloutList callouts={callouts} style={style} />
}

function VisualCalloutList({ callouts, style }) {
  if (!callouts?.length) return null
  const ListTag = style === 'numbered' ? 'ol' : 'ul'

  return (
    <ListTag className={`aid-callout-list aid-legend is-${style}`}>
      {callouts.map((callout) => (
        <li key={`${callout.number}-${callout.heading}`}>
          <span aria-hidden="true">{style === 'numbered' ? callout.number : ''}</span>
          <p className="visual-callout-body"><strong className="visual-callout-title">{callout.heading}</strong> {callout.body}</p>
        </li>
      ))}
    </ListTag>
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
            <p className="eyebrow">{lesson?.title ?? 'Visual Aid'}</p>
            <h2 id={`${aid.id}-review-title`}>{aid.title}</h2>
            <VisualAid id={aid.id} compact />
            <dl className="aid-review-details">
              <div><dt>Learning objective</dt><dd>{aid.objective ?? aid.caption}</dd></div>
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
    case 'fineTuningCompare':
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

function VisualAidCalloutMarker({ x, y, children }) {
  return (
    <g>
      <circle className="aid-callout" cx={x} cy={y} r="12" />
      <Label x={Number(x) - 4} y={Number(y) + 5} className="tiny dark">{children}</Label>
    </g>
  )
}

function Callout({ x, y, children }) {
  return <VisualAidCalloutMarker x={x} y={y}>{children}</VisualAidCalloutMarker>
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
  const modes = [
    ['Fine-tune', 'future', 16, 'output'],
    ['Prompt', 'this run', 92, 'prompt'],
    ['RAG', 'context', 168, 'prompt'],
    ['Sampling', 'choose', 244, '']
  ]
  return (
    <>
      <rect className="aid-box muted" x="12" y="24" width="296" height="162" rx="12" />
      <Label x="74" y="46" className="tiny">What changes?</Label>
      <Label x="205" y="46" className="tiny">When?</Label>
      {modes.map(([mode, effect, x, tone], index) => (
        <g key={mode}>
          <rect className={tone ? `aid-box ${tone}` : 'aid-box'} x={x} y="68" width="62" height="82" rx="10" />
          <Label x={Number(x) + 8} y="93" className={tone ? 'micro dark' : 'micro'}>{mode}</Label>
          <Label x={Number(x) + 8} y="122" className={tone ? 'micro dark' : 'micro'}>{effect}</Label>
          <Callout x={Number(x) + 31} y="166">{index + 1}</Callout>
        </g>
      ))}
      <path className="aid-neon-path" d="M47 68 V56 H276 V68" />
      <Label x="114" y="198" className="tiny">durable/current</Label>
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
      <Label x="259" y="135" className="tiny dark">token</Label>
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
  const promptTokens: Array<{ token: string, x: number, width: number }> = [
    { token: 'Describe', x: 48, width: 68 },
    { token: 'two pets', x: 124, width: 62 },
    { token: 'conflict', x: 194, width: 70 }
  ]
  const responseTokens: Array<{ token: string, x: number, width: number }> = [
    { token: 'A', x: 44, width: 26 },
    { token: 'jealous', x: 78, width: 56 },
    { token: 'dog', x: 142, width: 38 }
  ]
  const updatedTokens: Array<{ token: string, x: number, width: number, kind: string }> = [
    { token: 'prompt', x: 42, width: 56, kind: 'prompt' },
    { token: 'A', x: 106, width: 26, kind: 'output' },
    { token: 'jealous', x: 140, width: 56, kind: 'output' },
    { token: 'dog', x: 204, width: 38, kind: 'output' },
    { token: 'chased', x: 250, width: 58, kind: 'output' }
  ]

  return (
    <>
      <rect className="aid-box prompt" x="16" y="18" width="288" height="72" rx="12" />
      <Label x="34" y="43" className="micro dark">1 GIVEN PROMPT</Label>
      <Label x="34" y="62" className="tiny dark">given first</Label>
      {promptTokens.map(({ token, x, width }) => (
        <TokenChip key={`prompt-${token}`} token={token} x={x} y="62" width={width} kind="prompt" />
      ))}

      <rect className="aid-box muted" x="16" y="116" width="184" height="78" rx="12" />
      <Label x="34" y="141" className="micro">2 RESPONSE SO FAR</Label>
      <Label x="34" y="160" className="tiny">generated tokens</Label>
      {responseTokens.map(({ token, x, width }) => (
        <TokenChip key={`response-${token}`} token={token} x={x} y="164" width={width} />
      ))}

      <rect className="aid-box output" x="222" y="122" width="82" height="66" rx="12" />
      <Label x="240" y="148" className="micro dark">3 NEXT</Label>
      <TokenChip token="chased" x="237" y="158" width="56" />
      <Arrow x1="200" y1="154" x2="222" y2="154" />

      <rect className="aid-box prompt" x="16" y="236" width="288" height="76" rx="12" />
      <Label x="34" y="261" className="micro dark">4 UPDATED CONTEXT</Label>
      <Label x="34" y="280" className="tiny dark">next run sees</Label>
      {updatedTokens.map(({ token, x, width, kind }) => (
        <TokenChip key={`updated-${token}`} token={token} x={x} y="286" width={width} kind={kind} />
      ))}

      <Arrow x1="160" y1="90" x2="160" y2="116" />
      <Arrow x1="160" y1="194" x2="160" y2="236" />
      <Arrow x1="264" y1="188" x2="264" y2="236" />
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
      <Label x="98" y="46" className="tiny dark">sample sentence</Label>
      {tokens.map(([token, x, width, y], index) => (
        <g key={`${token}-${index}`}>
          <rect className={token === '.' ? 'aid-chip output' : 'aid-chip'} x={Number(x)} y={Number(y)} width={Number(width)} height="24" rx="7" />
          <Label x={Number(x) + 6} y={Number(y) + 17} className={token === '.' ? 'tiny dark' : 'tiny'}>{token}</Label>
        </g>
      ))}
      <rect className="aid-box muted" x="44" y="162" width="232" height="34" rx="8" />
      <Label x="82" y="183" className="tiny">start|led floor|.</Label>
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
      <rect className="aid-box muted" x="86" y="174" width="148" height="24" rx="8" />
      <Label x="122" y="191" className="tiny">lookup key</Label>
      <Callout x="94" y="74">1</Callout>
      <Callout x="204" y="74">2</Callout>
      <Callout x="300" y="154">3</Callout>
      <Callout x="282" y="188">4</Callout>
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
      <rect className="aid-box prompt" x="76" y="176" width="168" height="24" rx="8" />
      <Label x="114" y="193" className="tiny dark">unlabeled dims</Label>
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
  const tokens = [
    ['dog', 18, 34, 'weak'],
    ['chased', 58, 60, ''],
    ['cat', 124, 34, 'source'],
    ['because', 164, 66, ''],
    ['it', 236, 26, 'target'],
    ['hissed', 268, 50, '']
  ]
  return (
    <>
      {tokens.map(([label, x, width, role]) => (
        <g key={label}>
          <rect className={role === 'target' ? 'aid-chip output selected' : role === 'source' ? 'aid-chip output' : 'aid-box muted'} x={x} y="78" width={width} height="30" rx="8" />
          <Label x={Number(x) + 7} y="98" className={role ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}

      <path className="aid-arc" d="M249 76 C226 32, 156 32, 141 76" />
      <path className="aid-arc alt" d="M249 109 C218 158, 60 158, 35 109" opacity="0.30" />

      <rect className="aid-chip output" x="78" y="28" width="108" height="28" rx="8" />
      <Label x="91" y="47" className="tiny dark">Stronger clue</Label>
      <rect className="aid-chip prompt" x="200" y="28" width="100" height="28" rx="8" />
      <Label x="214" y="47" className="tiny dark">Target token</Label>
      <rect className="aid-box muted" x="22" y="150" width="88" height="30" rx="8" />
      <Label x="34" y="170" className="tiny">Weaker clue</Label>
    </>
  )
}

function MlpSvg() {
  const before = [26, 42, 56, 34]
  const after = [62, 28, 74, 48]
  return (
    <>
      <rect className="aid-box muted" x="18" y="24" width="112" height="78" rx="10" />
      <Label x="42" y="46" className="tiny">attention</Label>
      <Label x="32" y="65" className="tiny muted-text">mix positions</Label>
      {['dog', 'cat', 'it'].map((token, index) => (
        <g key={token}>
          <rect className={token === 'cat' ? 'aid-chip output' : 'aid-box'} x={30 + index * 30} y="76" width="28" height="20" rx="6" />
          <Label x={token === 'cat' ? 36 + index * 30 : 35 + index * 30} y="91" className={token === 'cat' ? 'tiny dark' : 'tiny'}>{token}</Label>
        </g>
      ))}
      <path className="aid-arc alt" d="M42 74 C58 52, 82 52, 104 74" opacity="0.38" />

      <Arrow x1="130" y1="76" x2="154" y2="76" />
      <rect className="aid-chip output selected" x="154" y="58" width="50" height="36" rx="9" />
      <Label x="167" y="81" className="tiny dark">cat</Label>
      <Label x="140" y="114" className="tiny">same position</Label>

      <rect className="aid-box" x="218" y="24" width="84" height="144" rx="10" />
      <Label x="248" y="45" className="tiny">MLP</Label>
      {before.map((height, index) => (
        <rect key={`before-${index}`} className="aid-bar" x={234 + index * 10} y={106 - height} width="7" height={height} rx="3" opacity="0.52" />
      ))}
      {after.map((height, index) => (
        <rect key={`after-${index}`} className="aid-bar horizontal" x={262 + index * 10} y={106 - height} width="7" height={height} rx="3" />
      ))}
      <Arrow x1="204" y1="76" x2="218" y2="76" />
      <Label x="235" y="134" className="tiny">in</Label>
      <Label x="267" y="134" className="tiny">out</Label>
      <rect className="aid-chip prompt" x="84" y="178" width="152" height="24" rx="8" />
      <Label x="112" y="195" className="tiny dark">per-token reshape</Label>
    </>
  )
}

function Gear({ x, y, r, alt = false }) {
  return <circle className={alt ? 'aid-gear alt' : 'aid-gear'} cx={x} cy={y} r={r} />
}

function LayersSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="82" y="18" width="156" height="28" rx="8" />
      <Label x="118" y="37" className="tiny dark">hidden states</Label>
      {[0, 1, 2].map((layer) => (
        <g key={layer}>
          <rect className="aid-box" x="58" y={58 + layer * 40} width="204" height="32" rx="8" />
          <Label x="78" y={78 + layer * 40} className="tiny">Layer {layer + 1}</Label>
          <rect className="aid-chip prompt" x="137" y={64 + layer * 40} width="44" height="20" rx="6" />
          <Label x="147" y={79 + layer * 40} className="tiny dark">attn</Label>
          <rect className="aid-chip output" x="190" y={64 + layer * 40} width="42" height="20" rx="6" />
          <Label x="201" y={79 + layer * 40} className="tiny dark">MLP</Label>
        </g>
      ))}
      <rect className="aid-box output" x="86" y="182" width="148" height="26" rx="8" />
      <Label x="122" y="200" className="tiny dark">refined states</Label>
      <path className="aid-path thin" d="M160 46 V182" />
    </>
  )
}

function HiddenSvg() {
  return (
    <>
      {[
        ['ID', 18, 40, 44, 'prompt'],
        ['Embedding', 70, 40, 86, 'output'],
        ['Hidden 1', 178, 28, 72, ''],
        ['Hidden 2', 178, 88, 72, ''],
        ['Scores', 234, 150, 64, 'output']
      ].map(([label, x, y, width, kind]) => (
        <g key={label}>
          <rect className={kind === 'prompt' ? 'aid-chip prompt' : kind === 'output' ? 'aid-chip output' : 'aid-box'} x={x} y={y} width={width} height="30" rx="8" />
          <Label x={Number(x) + 8} y={Number(y) + 20} className={kind ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}
      <Arrow x1="62" y1="55" x2="70" y2="55" />
      <Arrow x1="156" y1="55" x2="178" y2="43" />
      <Arrow x1="214" y1="58" x2="214" y2="88" />
      <Arrow x1="232" y1="118" x2="248" y2="150" />
      <rect className="aid-box muted" x="18" y="130" width="172" height="58" rx="9" />
      <Label x="32" y="151" className="tiny">weights: durable</Label>
      <Label x="32" y="171" className="tiny">states: temporary</Label>
      <rect className="aid-chip prompt" x="202" y="116" width="86" height="24" rx="8" />
      <Label x="218" y="133" className="tiny dark">not memory</Label>
    </>
  )
}

function LogitsSvg() {
  const rows = [
    ['floor', '7.8', 132],
    ['mat', '6.4', 94],
    ['kitchen', '5.8', 76],
    ['banana', '1.2', 22]
  ]

  return (
    <>
      <rect className="aid-box prompt" x="16" y="18" width="94" height="34" rx="8" />
      <Label x="28" y="40" className="tiny dark">final state</Label>
      <Arrow x1="110" y1="35" x2="142" y2="35" />
      <rect className="aid-box" x="144" y="16" width="76" height="38" rx="8" />
      <Label x="158" y="40" className="tiny">raw scores</Label>
      <Arrow x1="220" y1="35" x2="250" y2="35" />
      <rect className="aid-chip output" x="250" y="18" width="54" height="34" rx="8" />
      <Label x="261" y="40" className="tiny dark">rank</Label>

      {rows.map(([label, score, width], index) => (
        <g key={label}>
          <Label x="28" y={84 + index * 25} className="tiny">{label}</Label>
          <rect className="aid-box muted" x="96" y={70 + index * 25} width="154" height="15" rx="6" />
          <rect className="aid-bar horizontal" x="96" y={70 + index * 25} width={width} height="15" rx="6" />
          <text x="300" y={83 + index * 25} className="tiny" textAnchor="end">{score}</text>
        </g>
      ))}
      <rect className="aid-chip prompt" x="84" y="174" width="152" height="25" rx="8" />
      <Label x="120" y="191" className="tiny dark">raw scores only</Label>
    </>
  )
}

function SoftmaxSvg() {
  const rows = [
    ['floor', '7.8', '68%', 68],
    ['mat', '6.4', '19%', 34],
    ['kitchen', '5.8', '11%', 24],
    ['banana', '1.2', '2%', 10]
  ]

  return (
    <>
      <Label x="28" y="26" className="tiny">logits</Label>
      <Label x="210" y="26" className="tiny">probabilities</Label>
      <path className="aid-funnel" d="M135 54 H184 L170 102 V152 H149 V102 Z" />
      <Label x="136" y="96" className="tiny">softmax</Label>
      {rows.map(([label, raw, probability, width], index) => (
        <g key={label}>
          <Label x="20" y={55 + index * 31} className="tiny">{label}</Label>
          <rect className="aid-box muted" x="76" y={43 + index * 31} width="44" height="16" rx="5" />
          <Label x="85" y={56 + index * 31} className="tiny">{raw}</Label>
          <rect className="aid-box muted" x="204" y={43 + index * 31} width="86" height="16" rx="5" />
          <rect className="aid-bar horizontal" x="204" y={43 + index * 31} width={width} height="16" rx="5" />
          <text x="288" y={56 + index * 31} className="tiny" textAnchor="end">{probability}</text>
        </g>
      ))}
      <rect className="aid-chip output" x="190" y="174" width="114" height="24" rx="8" />
      <Label x="213" y="191" className="tiny dark">sum = 100%</Label>
      <rect className="aid-chip prompt" x="18" y="174" width="154" height="24" rx="8" />
      <Label x="40" y="191" className="tiny dark">not the chooser</Label>
    </>
  )
}

function SamplingSvg() {
  const tokens = [
    ['floor', '68%', 118, 'output'],
    ['mat', '19%', 70, ''],
    ['kitchen', '11%', 44, ''],
    ['banana', '2%', 12, '']
  ]

  return (
    <>
      <rect className="aid-box prompt" x="48" y="16" width="224" height="30" rx="8" />
      <Label x="124" y="36" className="tiny dark">context so far</Label>
      {tokens.map(([label, probability, width, kind], index) => (
        <g key={label}>
          <Label x="34" y={76 + index * 28} className="tiny">{label}</Label>
          <rect className="aid-box muted" x="104" y={61 + index * 28} width="138" height="18" rx="7" />
          <rect className={kind === 'output' ? 'aid-bar horizontal selected' : 'aid-bar horizontal'} x="104" y={61 + index * 28} width={width} height="18" rx="7" />
          <Label x="260" y={76 + index * 28} className="tiny">{probability}</Label>
        </g>
      ))}
      <path className="aid-select" d="M222 70 C250 96, 242 142, 200 174" />
      <rect className="aid-chip output selected" x="128" y="172" width="72" height="30" rx="8" />
      <Label x="143" y="192" className="tiny dark">floor</Label>
      <rect className="aid-box muted" x="210" y="173" width="86" height="28" rx="8" />
      <Label x="226" y="192" className="tiny">one token</Label>
    </>
  )
}

function LoopSvg() {
  return (
    <>
      <rect className="aid-box prompt" x="18" y="16" width="284" height="30" rx="8" />
      <Label x="106" y="36" className="tiny dark">user prompt</Label>

      <path className="aid-context-tray" d="M28 66 H218 L232 80 V118 H28 Z" />
      <path className="aid-fold-line light" d="M218 66 V80 H232" />
      <Label x="44" y="86" className="tiny">response so far</Label>
      <Label x="56" y="104" className="tiny">...kitchen</Label>
      <Callout x="18" y="70">1</Callout>

      <rect className="aid-chip output selected" x="242" y="74" width="58" height="34" rx="8" />
      <Label x="255" y="96" className="tiny dark">floor</Label>
      <Callout x="288" y="72">2</Callout>

      <path className="aid-neon-path" d="M232 92 C236 92, 238 92, 242 92" />
      <path className="aid-context-tray alt" d="M46 142 H266 L280 156 V192 H46 Z" />
      <path className="aid-fold-line light" d="M266 142 V156 H280" />
      <Label x="64" y="160" className="tiny">next context</Label>
      <Label x="84" y="178" className="tiny">prompt + response</Label>
      <Callout x="274" y="158">3</Callout>

      <path className="aid-arc" d="M282 174 C314 92, 280 38, 190 32" />
      <Callout x="292" y="40">4</Callout>
      <path className="aid-select" d="M80 142 C50 126, 42 114, 48 100" />
      <Label x="126" y="204" className="tiny">append, repeat</Label>
    </>
  )
}

function WindowSvg() {
  const cards = [
    ['Sys', 52, 82, 'aid-chip'],
    ['User', 104, 82, 'aid-chip output'],
    ['RAG', 156, 82, 'aid-chip'],
    ['So far', 208, 82, 'aid-chip output'],
    ['Old', 20, 154, 'aid-chip faded']
  ]

  return (
    <>
      <path className="aid-context-tray" d="M44 46 H268 L286 64 V132 H44 Z" />
      <path className="aid-fold-line light" d="M268 46 V64 H286" />
      <Label x="112" y="68" className="tiny">context tray</Label>
      <Callout x="168" y="116">1</Callout>
      <Callout x="274" y="52">2</Callout>

      {cards.map(([label, x, y, className], index) => (
        <g key={label}>
          <rect className={String(className)} x={Number(x)} y={Number(y)} width="48" height="32" rx="8" />
          <Label x={Number(x) + (String(label).length > 6 ? 4 : 8)} y={Number(y) + 20} className={index === 4 ? 'tiny muted-text' : 'tiny dark'}>{label}</Label>
        </g>
      ))}

      <path className="aid-line dashed" d="M44 170 C86 148, 72 128, 72 116" />
      <Callout x="84" y="172">3</Callout>
      <Callout x="276" y="130">4</Callout>
      <Label x="16" y="194" className="tiny">fell out</Label>
      <Label x="106" y="158" className="tiny">visible now</Label>
      <Label x="118" y="196" className="tiny">temporary input</Label>
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
  return (
    <>
      <path className="aid-zen-ring" d="M48 184 C94 152, 218 152, 272 184" />
      <path className="aid-paper-node output" d="M24 28 H132 L146 42 V78 H24 Z" />
      <path className="aid-fold-line" d="M132 28 V42 H146" />
      <Label x="56" y="51" className="tiny dark">Claim A</Label>
      <Callout x="18" y="28">1</Callout>

      <path className="aid-paper-node output" d="M188 28 H286 L300 42 V78 H188 Z" />
      <path className="aid-fold-line" d="M286 28 V42 H300" />
      <Label x="220" y="51" className="tiny dark">Claim B</Label>

      <path className="aid-doc-card" d="M32 126 H134 L148 140 V174 H32 Z" />
      <path className="aid-fold-line" d="M134 126 V140 H148" />
      <Label x="64" y="151" className="tiny dark">Policy</Label>
      <Callout x="82" y="126">2</Callout>
      <path className="aid-doc-card alt" d="M172 126 H274 L288 140 V174 H172 Z" />
      <path className="aid-fold-line" d="M274 126 V140 H288" />
      <Label x="194" y="151" className="tiny dark">Data result</Label>
      <Callout x="238" y="98">3</Callout>

      <path className="aid-neon-path" d="M82 78 C74 96, 74 110, 82 126" />
      <path className="aid-neon-path" d="M96 78 C130 98, 184 106, 224 126" />
      <path className="aid-line dashed" d="M238 78 C244 100, 244 112, 236 126" />
      <Callout x="304" y="190">4</Callout>
      <Label x="78" y="206" className="tiny">supported</Label>
      <Label x="210" y="206" className="tiny">needs review</Label>
    </>
  )
}

function HallucinationBridgeSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M44 184 C106 150, 214 150, 276 184" />
      <path className="aid-arc" d="M38 118 C86 56, 234 56, 282 118" />
      <Label x="112" y="64" className="tiny">fluent output</Label>
      <Callout x="28" y="106">1</Callout>

      <rect className="aid-chip output" x="48" y="104" width="62" height="28" rx="8" />
      <Label x="59" y="123" className="tiny dark">supported</Label>
      <rect className="aid-chip output" x="128" y="84" width="64" height="28" rx="8" />
      <Label x="143" y="103" className="tiny dark">uncertain</Label>
      <rect className="aid-chip output" x="212" y="104" width="60" height="28" rx="8" />
      <Label x="223" y="123" className="tiny dark">missing</Label>

      <rect className="aid-paper-node retriever" x="42" y="150" width="64" height="28" rx="8" />
      <Label x="56" y="169" className="tiny dark">evidence</Label>
      <path className="aid-line" d="M74 150 V130" />
      <path className="aid-line dashed" d="M160 142 V116" />
      <path className="aid-line dashed" d="M242 142 V130" />
      <Callout x="74" y="148">2</Callout>
      <Callout x="238" y="148">3</Callout>

      <path className="aid-fixed-note" d="M190 22 H292 L304 34 V56 H190 Z" />
      <path className="aid-fold-line" d="M292 22 V34 H304" />
      <Label x="204" y="41" className="tiny dark">check source</Label>
      <Callout x="292" y="60">4</Callout>

      <circle className="aid-dot alt" cx="160" cy="172" r="10" />
      <Label x="182" y="176" className="tiny">not evidence</Label>
    </>
  )
}

function LearnsSvg() {
  const modes = [
    ['Training', 'weights', 32, 52, 'output'],
    ['Fine-tune', 'future', 32, 118, 'output'],
    ['RAG', 'context', 176, 52, 'prompt'],
    ['Prompt', 'this run', 176, 118, 'prompt']
  ]

  return (
    <>
      <rect className="aid-box muted" x="12" y="18" width="296" height="174" rx="12" />
      <path className="aid-line" d="M160 32 V178" opacity="0.35" />
      <Label x="70" y="38" className="tiny">durable</Label>
      <Label x="202" y="38" className="tiny">current-run</Label>
      {modes.map(([mode, effect, x, y, tone], index) => (
        <g key={mode}>
          <rect className={`aid-box ${tone}`} x={x} y={y} width="124" height="54" rx="10" />
          <Label x={Number(x) + 14} y={Number(y) + 22} className="tiny dark">{mode}</Label>
          <Label x={Number(x) + 14} y={Number(y) + 40} className="tiny dark">{effect}</Label>
          <Callout x={Number(x) + 108} y={Number(y) + 12}>{index + 1}</Callout>
        </g>
      ))}
    </>
  )
}

function DiffusionSvg() {
  return (
    <>
      <rect className="aid-box muted" x="14" y="22" width="292" height="72" rx="10" />
      <Label x="24" y="43" className="tiny">Autoregression</Label>
      {['A jealous', 'dog', 'floor'].map((token, index) => (
        <g key={token}>
          <rect className={index === 2 ? 'aid-chip output' : 'aid-chip'} x={36 + index * 78} y="58" width={index === 0 ? 66 : 48} height="24" rx="7" />
          <Label x={44 + index * 78} y="75" className={index === 2 ? 'tiny dark' : 'tiny'}>{token}</Label>
          {index < 2 && <Arrow x1={88 + index * 78} y1="70" x2={112 + index * 78} y2="70" />}
        </g>
      ))}
      <Label x="238" y="75" className="tiny">append</Label>

      <rect className="aid-box muted" x="14" y="116" width="292" height="72" rx="10" />
      <Label x="24" y="137" className="tiny">Diffusion</Label>
      {['noise', 'rough', 'clear', 'final'].map((label, index) => (
        <g key={label}>
          <circle className={index < 2 ? 'aid-node' : 'aid-node selected'} cx={58 + index * 64} cy="158" r={18 - index * 2} opacity={0.95 - index * 0.12} />
          <Label x={42 + index * 64} y="187" className="tiny">{label}</Label>
          {index < 3 && <Arrow x1={76 + index * 64} y1="158" x2={96 + index * 64} y2="158" />}
        </g>
      ))}
      <Label x="112" y="206" className="tiny">denoise and refine</Label>
    </>
  )
}

function MultimodalSvg() {
  const modes = [
    ['Text', 24, 46],
    ['Image', 24, 92],
    ['Audio', 24, 138]
  ]
  return (
    <>
      {modes.map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-chip prompt" x={x} y={y} width="66" height="28" rx="8" />
          <Label x={Number(x) + 12} y={Number(y) + 17} className="tiny dark">{label}</Label>
          <path className="aid-line" d={`M90 ${Number(y) + 14} C112 ${Number(y) + 14}, 118 105, 134 105`} />
        </g>
      ))}
      <rect className="aid-box output" x="134" y="72" width="80" height="66" rx="10" />
      <Label x="152" y="98" className="tiny dark">shared</Label>
      <Label x="158" y="116" className="tiny dark">space</Label>
      <path className="aid-line" d="M214 105 C232 105, 236 105, 250 105" />
      <rect className="aid-chip output" x="250" y="87" width="52" height="36" rx="9" />
      <Label x="260" y="110" className="tiny dark">Output</Label>
      <Label x="96" y="194" className="tiny">media lanes</Label>
    </>
  )
}

function PerfectStormSvg() {
  const ingredients = [
    ['Data', 26, 18],
    ['Compute', 212, 18],
    ['Storage', 26, 56],
    ['Methods', 212, 56],
    ['Labor', 26, 94],
    ['Incentives', 212, 94]
  ]
  return (
    <>
      <path className="aid-zen-ring" d="M46 186 C96 154, 224 154, 274 186" />
      <path className="aid-zen-ring alt" d="M76 172 C118 150, 202 150, 244 172" />
      <path className="aid-line" d="M112 31 H150" />
      <path className="aid-line" d="M208 31 H170" />
      <path className="aid-line" d="M112 69 H150" />
      <path className="aid-line" d="M208 69 H170" />
      <path className="aid-line" d="M112 107 H150" />
      <path className="aid-line" d="M208 107 H170" />
      <path className="aid-neon-path" d="M160 30 V126" />
      <path className="aid-neon-path alt-path" d="M160 126 C160 134, 160 134, 160 142" />
      {ingredients.map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-paper-node" x={x} y={y} width="82" height="26" rx="8" />
          <Label x={Number(x) + (label === 'Incentives' ? 9 : 14)} y={Number(y) + 18} className="tiny dark">{label}</Label>
        </g>
      ))}
      <rect className="aid-box output" x="82" y="142" width="156" height="46" rx="12" />
      <Label x="106" y="161" className="tiny dark">Modern LLM</Label>
      <Label x="122" y="178" className="tiny dark">capability</Label>
    </>
  )
}

function CollectiveLanternSvg() {
  const nodes = [
    ['Human', 20, 64, 'prompt'],
    ['Training', 96, 64, 'output'],
    ['Patterns', 186, 64, ''],
    ['Provenance', 116, 144, 'prompt']
  ]
  return (
    <>
      <path className="aid-zen-ring" d="M52 188 C94 154, 226 154, 268 188" />
      {nodes.slice(0, 3).map(([label, x, y, tone], index) => (
        <g key={label}>
          <rect className={tone ? `aid-box ${tone}` : 'aid-box'} x={x} y={y} width="78" height="48" rx="10" />
          <Label x={Number(x) + 12} y={Number(y) + 29} className={tone ? 'tiny dark' : 'tiny'}>{label}</Label>
          {index < 2 && <path className="aid-neon-path" d={`M${Number(x) + 78} 88 H${Number(x) + 96}`} />}
        </g>
      ))}
      <path className="aid-line dashed" d="M225 112 C220 132, 198 144, 194 144" />
      <rect className="aid-box prompt" x="112" y="144" width="96" height="34" rx="9" />
      <Label x="124" y="166" className="tiny dark">Provenance</Label>
    </>
  )
}

function BenefitsGardenSvg() {
  const chips = [
    ['Draft', 24, 52],
    ['Translate', 98, 52],
    ['Summarize', 190, 52],
    ['Access', 58, 112],
    ['Review', 174, 112]
  ]
  return (
    <>
      <path className="aid-zen-ring alt" d="M36 184 C104 164, 216 164, 284 184" />
      <rect className="aid-box muted" x="16" y="28" width="288" height="132" rx="12" />
      <Label x="92" y="28" className="tiny">bounded benefits</Label>
      {chips.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={index === 4 ? 'aid-chip output' : 'aid-chip prompt'} x={x} y={y} width={index === 2 ? 86 : 70} height="28" rx="8" />
          <Label x={Number(x) + 10} y={Number(y) + 19} className="tiny dark">{label}</Label>
        </g>
      ))}
      <path className="aid-neon-path" d="M93 126 H174" />
      <rect className="aid-fixed-note" x="94" y="168" width="132" height="28" rx="9" />
      <Label x="126" y="187" className="tiny dark">with review</Label>
    </>
  )
}

function CostsFactorySvg() {
  const costs = [
    ['Compute', 36, 72, 'prompt'],
    ['Energy/water', 174, 72, 'prompt'],
    ['Labor', 36, 122, 'output'],
    ['Privacy', 174, 122, 'output'],
    ['Institutional', 92, 166, '']
  ]
  return (
    <>
      <path className="aid-zen-ring" d="M42 188 C96 162, 224 162, 278 188" />
      <rect className="aid-box output" x="106" y="20" width="108" height="34" rx="9" />
      <Label x="130" y="42" className="tiny dark">AI answer</Label>
      <path className="aid-neon-path" d="M160 54 V68" />
      {costs.map(([label, x, y, tone]) => (
        <g key={label}>
          <rect className={tone ? `aid-box ${tone}` : 'aid-box'} x={x} y={y} width={label === 'Institutional' ? 136 : 110} height="34" rx="9" />
          <Label x={Number(x) + 12} y={Number(y) + 22} className={tone ? 'tiny dark' : 'tiny'}>{label}</Label>
        </g>
      ))}
      <path className="aid-line" d="M160 68 C118 70, 94 72, 91 72 M160 68 C202 70, 226 72, 229 72 M160 106 C118 116, 94 122, 91 122 M160 106 C202 116, 226 122, 229 122 M160 106 V166" />
    </>
  )
}

function HumanGardenSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M42 188 C94 164, 226 164, 278 188" />
      <rect className="aid-box output" x="102" y="70" width="116" height="54" rx="12" />
      <Label x="128" y="94" className="tiny dark">Human</Label>
      <Label x="126" y="112" className="tiny dark">judgment</Label>
      <rect className="aid-box prompt" x="22" y="32" width="82" height="38" rx="9" />
      <Label x="42" y="55" className="tiny dark">AI tool</Label>
      <rect className="aid-paper-node" x="216" y="32" width="82" height="38" rx="9" />
      <Label x="236" y="55" className="tiny dark">People</Label>
      <rect className="aid-fixed-note" x="26" y="142" width="86" height="36" rx="9" />
      <Label x="46" y="165" className="tiny dark">Review</Label>
      <rect className="aid-paper-node retriever" x="122" y="142" width="76" height="36" rx="9" />
      <Label x="140" y="165" className="tiny dark">Appeal</Label>
      <rect className="aid-fixed-note" x="208" y="142" width="86" height="36" rx="9" />
      <Label x="222" y="165" className="tiny dark">Governance</Label>
      <path className="aid-neon-path" d="M104 52 C124 54, 134 66, 144 70" />
      <path className="aid-neon-path" d="M218 96 C238 90, 248 74, 256 70" />
      <path className="aid-line" d="M160 124 V142 M112 160 H122 M198 160 H208" />
    </>
  )
}

function ResponsiblePathSvg() {
  const levers = [
    ['Data', 42, 68, 58],
    ['Evaluation', 112, 68, 86],
    ['Policy', 210, 68, 68],
    ['Review', 72, 124, 72],
    ['Incentives', 162, 124, 92]
  ]
  return (
    <>
      <rect className="aid-paper-node" x="18" y="24" width="284" height="154" rx="12" />
      <Label x="104" y="48" className="tiny dark">Better-AI levers</Label>
      {levers.map(([label, x, y, width]) => (
        <g key={label}>
          <rect className="aid-chip output" x={x} y={y} width={width} height="22" rx="7" />
          <Label x={Number(x) + 7} y={Number(y) + 15} className="micro dark">{label}</Label>
        </g>
      ))}
      <path className="aid-neon-path" d="M160 94 C160 112, 160 118, 160 124" />
      <Label x="118" y="166" className="micro dark">human choices</Label>
    </>
  )
}

function PromptingTraySvg() {
  const parts = [
    ['Task', 22, 32],
    ['Context', 88, 26],
    ['Limits', 164, 32],
    ['Example', 236, 26],
    ['Evidence', 28, 86],
    ['Uncertain', 104, 92],
    ['Format', 190, 92],
    ['Review', 252, 86]
  ]
  return (
    <>
      {parts.map(([label, x, y], index) => (
        <g key={label}>
          <rect className={index % 2 ? 'aid-chip prompt' : 'aid-chip output'} x={x} y={y} width={label === 'Uncertain' ? 70 : 58} height="22" rx="7" />
          <Label x={Number(x) + 7} y={Number(y) + 15} className="micro dark">{label}</Label>
          <path className="aid-neon-path" d={`M${Number(x) + 28} ${Number(y) + 22} C132 120, 184 120, 160 134`} />
        </g>
      ))}
      <path className="aid-context-tray" d="M58 132 H214 L232 148 V178 H58 Z" />
      <path className="aid-fold-line light" d="M214 132 V148 H232" />
      <Label x="104" y="154" className="tiny">Current context</Label>
      <Label x="122" y="170" className="micro muted-text">this run</Label>
      <path className="aid-paper-node output" d="M246 138 H298 L306 148 V176 H246 Z" />
      <Label x="254" y="160" className="tiny dark">Response</Label>
      <path className="aid-neon-path" d="M232 154 C238 154, 242 154, 246 154" />
    </>
  )
}

function SynthesisMapSvg() {
  const lanes: Array<[string, string[], number, string]> = [
    ['Mechanics', ['Prompt', 'States', 'Token'], 22, 'prompt'],
    ['Evidence', ['Context', 'RAG', 'Grounding'], 116, 'output'],
    ['Responsibility', ['Review', 'Costs', 'People'], 210, '']
  ]
  return (
    <>
      <path className="aid-zen-ring alt" d="M34 200 C102 184, 218 184, 286 200" />
      {lanes.map(([title, items, x, tone]) => (
        <g key={title}>
          <rect className={tone ? `aid-box ${tone}` : 'aid-paper-node'} x={x} y="24" width="88" height="154" rx="12" />
          <Label x={Number(x) + 12} y="50" className="micro dark">{title}</Label>
          {items.map((item, index) => (
            <g key={item}>
              <rect className="aid-chip" x={Number(x) + 12} y={70 + index * 31} width="64" height="22" rx="7" />
              <Label x={Number(x) + 19} y={85 + index * 31} className="micro dark">{item}</Label>
            </g>
          ))}
        </g>
      ))}
      <path className="aid-neon-path" d="M110 101 H116 M204 101 H210" />
      <Label x="114" y="198" className="micro muted-text">model literacy</Label>
    </>
  )
}

function RiskSvg() {
  return (
    <>
      <path className="aid-zen-ring" d="M54 188 C102 158, 218 158, 266 188" />
      <rect className="aid-box prompt" x="16" y="26" width="136" height="160" rx="10" />
      <rect className="aid-box output" x="168" y="26" width="136" height="160" rx="10" />
      <Label x="44" y="48" className="tiny dark">Real risk</Label>
      <Label x="190" y="48" className="tiny dark">Myths</Label>
      {[
        ['Privacy', 32, 64],
        ['Halluc.', 32, 92],
        ['Prompt inj.', 32, 120],
        ['Tool risk', 32, 148],
        ['Overrely', 88, 92],
        ['Bias', 88, 148]
      ].map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-chip" x={x} y={y} width={label === 'Prompt inj.' ? 82 : 54} height="22" rx="7" />
          <Label x={Number(x) + 6} y={Number(y) + 15} className="micro dark">{label}</Label>
        </g>
      ))}
      {[
        ['Conscious', 182, 64],
        ['Self-trains', 182, 92],
        ['Omniscient', 182, 120],
        ['Softmax files', 182, 148]
      ].map(([label, x, y]) => (
        <g key={label}>
          <rect className="aid-chip faded" x={x} y={y} width="104" height="22" rx="7" />
          <Label x={Number(x) + 7} y={Number(y) + 15} className="micro dark">{label}</Label>
        </g>
      ))}
    </>
  )
}
