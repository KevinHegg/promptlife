# Canonical Examples v0.9.2

Date: 2026-06-03

This pass centralizes the example used across Prompt Life so learners do not confuse an incomplete response-so-far with a user prompt.

## Canonical Prompt And Response

User prompt:

```text
Give me one sentence with two household pets in conflict.
```

Generated response:

```text
A jealous dog chased a startled cat across the kitchen floor.
```

Response so far:

```text
A jealous dog chased a startled cat across the kitchen
```

Next-token candidates:

```text
floor
room
tiles
counter
quantum
elephant
```

Chosen token:

```text
floor
```

Next context:

```text
User prompt + response so far + floor
```

## Teaching Rule

- The user prompt is a complete instruction or question supplied by the user.
- The response-so-far may be incomplete because generation happens one token at a time.
- The next token is one newly chosen response token.
- The next context contains the user prompt, the response-so-far, and the newly appended response token.

## Attention-Specific Variant

Use this only when a pronoun relationship is needed:

```text
A jealous dog chased a startled cat because it hissed.
```

Teaching target:

```text
it -> cat
```

Attention is weighted relevance between token positions in the current context. It is not awareness.

## Shared Token And ID Examples

- `dog -> 421`
- `cat -> 982`
- `floor -> 1576`

These IDs are lookup keys, not meanings.

## Where This Example Is Used

- Prompt vs Response Journey lesson and visual aid.
- Tokenization, Token IDs, Embeddings, Vectors, Tensors, and Autoregression lesson copy.
- Prompt or Response exercise.
- Pick the Next Token exercise.
- Prompt Run prompt, tokenization, token ID, sampling, and append/repeat steps.
- Glossary entries for prompt, response, prompt token, response token, generated token, input context, completion, decoding step, tokenization, token ID, embedding, vector, tensor, and autoregression.
- `/review/lesson-cards` and exported lesson-card PDFs.

## Avoid

- Do not present `A jealous dog chased...` as the user prompt.
- Do not imply the response is generated all at once.
- Do not imply prompt or response tokens durably update weights during ordinary inference.
- Do not imply token IDs contain semantic meaning by themselves.
