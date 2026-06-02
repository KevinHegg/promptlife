# Visual Aids v0.6

Date: 2026-06-02

## Approach

v0.6 adds reusable, lightweight SVG/CSS visual aids in `src/components/VisualAids.tsx`. They are not poster pages. They sit inside HTML lesson cards with accessible text around them.

## Design Rules

- Keep the explanation in HTML, not inside dense images.
- Use stable aspect ratios so mobile layout does not jump.
- Use short labels only when they help identify diagram parts.
- Treat brain metaphors as explicitly bounded by the Brain Bridge component, not as a visual theme.
- Reuse patterns when concepts are adjacent, but give every lesson its own visual aid ID and caption.

## Visual Aid IDs

| ID | Lesson | Pattern |
| --- | --- | --- |
| `llm-overview` | What Is an LLM? | Prompt to prediction |
| `traditions` | Two AI Traditions | Rules versus learned patterns |
| `training-loop` | Training | Predict, compare, update |
| `pretraining-rain` | Pretraining | Broad durable updates |
| `fine-tune-path` | Fine-Tuning | Targeted path |
| `inference-pass` | Inference | Forward pass |
| `prompt-response` | Prompt vs Response | Given tokens and generated tokens |
| `tokenization` | Tokenization | Text to chunks |
| `token-ids` | Token IDs | Lookup numbers |
| `embeddings` | Embeddings | Starting vector |
| `vectors` | Vectors | Feature bars |
| `tensors` | Tensors | Stacked numerical blocks |
| `attention` | Attention | Relevance arcs |
| `mlp` | MLP | Feature reshape |
| `layers` | Layers | Repeated refinement |
| `hidden-states` | Hidden States | Temporary context-shaped vector |
| `logits` | Logits | Raw scores |
| `softmax` | Softmax | Score-to-probability funnel |
| `sampling` | Sampling | Choose one token |
| `autoregression` | Autoregression | Append and repeat |
| `context-window` | Context Window | Temporary visible context |
| `ai-learns` | How AI Learns | Durable, temporary, retrieval |
| `diffusion` | Diffusion vs Autoregression | Denoising |
| `multimodal` | Multimodal AI | Shared media hub |
| `risk` | Risk vs Myth | Practical risk sorting |

## Review Route

Open `/review/visual-aids` locally to inspect the visual-aid gallery without the app chrome.
