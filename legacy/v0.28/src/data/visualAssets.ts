import { publicAssetPath } from '../utils/assetPath'

const generatedAssetPath = (filename: string) => publicAssetPath(`assets/generated/before-morning/${filename}`)
const generatedHomeAssetPath = (filename: string) => publicAssetPath(`assets/generated/home/${filename}`)

export type GeneratedVisualAsset = {
  id: string
  filename: string
  path: string
  stage: string
  lessonId: string
  visualType: 'generated-image'
  purpose: string
  alt: string
  accessibilityDescription: string
  callouts: Array<{
    heading: string
    body: string
  }>
  keyTakeaway: string
  sourceNote: string
}

export type HomeVisualAsset = {
  id: string
  filename: string
  path: string
  status: 'integrated'
  purpose: string
  alt: string
  sourceNote: string
}

const sourceNote = 'Provided textless generated PNG. Instructional labels, callouts, captions, accessibility text, and key takeaways live in HTML/SVG/app code, not inside the image file.'
const homeSourceNote = 'Provided textless generated Home PNG. The Home page uses this asset as the primary image while keeping instructional labels, copy, alt text, and fallback behavior in app code.'

export const homeVisualAssets: Record<'hero' | 'mark', HomeVisualAsset> = {
  hero: {
    id: 'home-hero-prompt-cloud',
    filename: 'home-hero-prompt-cloud.png',
    path: generatedHomeAssetPath('home-hero-prompt-cloud.png'),
    status: 'integrated',
    purpose: 'Show a prompt entering a glowing feature cloud and one response token emerging.',
    alt: 'A prompt flows through a glowing model cloud and emerges as one response token.',
    sourceNote: homeSourceNote
  },
  mark: {
    id: 'promptlife-mark-generated',
    filename: 'promptlife-mark.png',
    path: generatedHomeAssetPath('promptlife-mark.png'),
    status: 'integrated',
    purpose: 'Provide a simple square Prompt Life logo mark that can also work as an app icon or favicon.',
    alt: 'A compact Prompt Life mark showing a prompt signal, model cloud, and emerging token.',
    sourceNote: homeSourceNote
  }
}

export const plannedHomeVisualAssets = homeVisualAssets

export const generatedVisualAssets: GeneratedVisualAsset[] = [
  {
    id: 'before-morning-llm-cloud',
    filename: 'before-morning-llm-cloud.png',
    path: generatedAssetPath('before-morning-llm-cloud.png'),
    stage: 'Before Morning',
    lessonId: 'what-is-llm',
    visualType: 'generated-image',
    purpose: 'Show current context flowing through learned weights into one generated token.',
    alt: 'An abstract folded-paper prompt ribbon flows into a glowing model cloud, and one token-like bead exits.',
    accessibilityDescription: 'A prompt ribbon enters a folded-paper model cloud and one token-like bead leaves it. The explanation emphasizes that context enters, learned weights shape probabilities, one token is generated, and the response grows one token at a time.',
    callouts: [
      { heading: 'Context enters', body: 'The current prompt and response-so-far become the visible input for this run.' },
      { heading: 'Weights shape probabilities', body: 'Learned weights, built earlier during training, shape next-token scores.' },
      { heading: 'One token is generated', body: 'The model chooses one response token from the probability cloud.' },
      { heading: 'Response grows', body: 'That token is appended, then the model runs again.' }
    ],
    keyTakeaway: 'An LLM turns context into next-token probabilities.',
    sourceNote
  },
  {
    id: 'before-morning-pretraining-landscape',
    filename: 'before-morning-pretraining-landscape.png',
    path: generatedAssetPath('before-morning-pretraining-landscape.png'),
    stage: 'Before Morning',
    lessonId: 'pretraining',
    visualType: 'generated-image',
    purpose: 'Show broad data exposure shaping durable model weights before ordinary use.',
    alt: 'Streams of abstract paper fragments and light rain carve glowing paths into a folded-paper landscape.',
    accessibilityDescription: 'Many abstract paper fragments and light streams shape a folded-paper landscape. The explanation emphasizes that many examples flow through training, repeated updates shape weights, broad patterns form, and pretraining is not perfect source memory.',
    callouts: [
      { heading: 'Many examples flow', body: 'Pretraining repeats the training loop across enormous collections of examples.' },
      { heading: 'Updates shape weights', body: 'Prediction errors drive repeated weight updates during training.' },
      { heading: 'Broad patterns form', body: 'The model learns statistical patterns that can help later prompts.' },
      { heading: 'Not perfect recall', body: 'Pretraining does not store every source as a searchable memory.' }
    ],
    keyTakeaway: 'Pretraining builds broad capability, not perfect source recall.',
    sourceNote
  },
  {
    id: 'before-morning-finetuning-path',
    filename: 'before-morning-finetuning-path.png',
    path: generatedAssetPath('before-morning-finetuning-path.png'),
    stage: 'Before Morning',
    lessonId: 'fine-tuning',
    visualType: 'generated-image',
    purpose: 'Show targeted training carving a more specific path through a pretrained model landscape.',
    alt: 'A glowing path is carved through a folded-paper terrain, guided by small blank example cards.',
    accessibilityDescription: 'A glowing path crosses a folded-paper terrain with small example cards nearby. The explanation emphasizes that fine-tuning starts from a pretrained base, adds targeted examples or preference data, shapes future responses, and is more durable than one prompt.',
    callouts: [
      { heading: 'Pretrained base', body: 'Fine-tuning begins with a model already shaped by broad pretraining.' },
      { heading: 'Targeted data', body: 'Examples, domain data, or preference data guide the additional training step.' },
      { heading: 'Future responses', body: 'The training changes how the model is likely to behave later.' },
      { heading: 'More than a prompt', body: 'Fine-tuning is durable adaptation, unlike one temporary prompt or retrieved document.' }
    ],
    keyTakeaway: 'Fine-tuning adapts future behavior through additional training.',
    sourceNote
  },
  {
    id: 'before-morning-alignment-garden',
    filename: 'before-morning-alignment-garden.png',
    path: generatedAssetPath('before-morning-alignment-garden.png'),
    stage: 'Before Morning',
    lessonId: 'alignment',
    visualType: 'generated-image',
    purpose: 'Show alignment as guided behavior shaping, not moral understanding.',
    alt: 'A calm folded-paper zen garden contains a glowing path, soft guardrails, a compass-like light, and muted warning zones.',
    accessibilityDescription: 'A calm folded-paper garden contains a glowing path, soft guardrails, compass-like light, and muted warning zones. The explanation emphasizes that preferred behavior is encouraged, guardrails reduce risky paths, feedback and policies shape behavior, and the model does not gain conscience.',
    callouts: [
      { heading: 'Preferred behavior', body: 'Training and system design can encourage more useful response patterns.' },
      { heading: 'Guardrails', body: 'Runtime safeguards can reduce risky paths during use.' },
      { heading: 'Feedback and policies', body: 'Human feedback, evaluations, policies, and filters can shape behavior.' },
      { heading: 'No conscience', body: 'Alignment does not give the model moral understanding or a truth guarantee.' }
    ],
    keyTakeaway: 'Alignment shapes behavior, but it is not built-in morality.',
    sourceNote
  }
]

export const generatedVisualAssetById = Object.fromEntries(
  generatedVisualAssets.map((asset) => [asset.id, asset])
) as Record<string, GeneratedVisualAsset>
