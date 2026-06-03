# Source Needs v0.9 Batch 2

Date: 2026-06-03

These notes flag claims that should receive source review before publication. They intentionally do not invent precise citations.

## Inference / Forward Pass

- SOURCE NEEDED: Inference is a forward pass that uses learned weights to compute temporary activations and output scores.
- SOURCE NEEDED: Ordinary inference normally does not durably update model weights.
- SOURCE NEEDED: Autoregressive text generation repeats next-token scoring and decoding.

## Prompt vs Response

- SOURCE NEEDED: Generated response tokens are appended to the context and can influence later token predictions.
- SOURCE NEEDED: Prompt/context tokens and response-so-far tokens are processed together during later forward passes.

## Tokenization

- SOURCE NEEDED: Modern language models use tokenizers that may split text into words, subwords, punctuation, spaces, or other chunks.
- SOURCE NEEDED: Tokenization maps visible text to token IDs before model computation.

## Token IDs

- SOURCE NEEDED: Token IDs are integer lookup keys defined by a tokenizer/model vocabulary.
- SOURCE NEEDED: Token IDs are used to retrieve embedding vectors.

## Embeddings

- SOURCE NEEDED: Embedding tables are learned parameters.
- SOURCE NEEDED: During inference, token IDs retrieve embedding vectors that serve as starting representations.
- SOURCE NEEDED: Hidden states differ from embeddings because they are context-shaped by later layers.

## Vectors / Distributed Representations

- SOURCE NEEDED: Embeddings and hidden states are represented as vectors.
- SOURCE NEEDED: Model features are often distributed across vector dimensions rather than cleanly named one-feature-one-dimension slots.
- SOURCE NEEDED: Attention, MLP transformations, and output scoring operate on vector/tensor representations.

## Tensors

- SOURCE NEEDED: Model activations and weights are stored and processed as tensors.
- SOURCE NEEDED: A common activation shape includes token positions and feature dimensions, with richer shapes for batches, heads, and layers.
- SOURCE NEEDED: Weight tensors are durable learned parameters, while activation tensors during inference are temporary.

## Transformer Layer Processing

- SOURCE NEEDED: Transformer layers typically combine attention, feed-forward/MLP blocks, residual connections, and normalization.
- SOURCE NEEDED: Later lessons should source the contrast between attention mixing across positions and MLP reshaping per token position.

## Hidden States

- SOURCE NEEDED: Hidden states are temporary internal vectors for token positions at a given layer.
- SOURCE NEEDED: Hidden states are not persistent memory unless a separate system stores information.

## Autoregressive Generation

- SOURCE NEEDED: Autoregressive language models generate text by selecting one next token, appending it, and repeating.
- SOURCE NEEDED: Decoding methods such as softmax and sampling shape the selected next token from raw scores.
