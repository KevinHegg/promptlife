# Trace pipeline spike

**Status: done.** `scripts/trace/make_trace.py` writes `src/data/traces/hero-trace.json`
(124 KB, matches the `Trace` schema). Setup took about 5 minutes: pip install was 1m47s and
the 0.95 GB model download about 1 minute. A full run takes **~7 s on CPU**, with one
330-token forward pass in under 1 s and 3.3 GB peak RAM.

## Model: Qwen2.5-0.5B-Instruct (Apache-2.0)

Its chat template has native tool calling (`<tool_call>` JSON, with the result in
`<tool_response>`), so the tool step is the model's real format. Comparison on the same scenario:

| | Qwen2.5-0.5B | SmolLM2-360M | Qwen2.5-1.5B |
|---|---|---|---|
| scripted reply tokens that were top-1 | 14/19 | 14/19 | 14/19 |
| p(tool name), position where the tool is chosen | `calculator` 0.83 | `calcul` rank 4 | 0.999 |
| p(`<tool_call>`) at assistant start | 0.005 (rank 9) | rank 38 | 0.0008 (rank 16) |
| free greedy reply after the tool result | uses 93.75 correctly | calls the tool again | uses 93.75 correctly |

SmolLM2's template has no tool support, so the script falls back to a hand-written format.
The 1.5B model is no better at choosing the tool and needs 9.6 GB of RAM.

## How good are the numbers?

- **Reply: strong.** At the slot before `9`, the top-1 is `9` with p=0.998, and `3`, `.`, `7`,
  `5` each have p>=0.996. The misses are style: it prefers `To` 0.67 over the scripted `You`
  (rank 6), `to` 0.93 over `at` (p=0.0005), and `exam` 0.94 over `to` in "final to get" (0.043).
- **Tool call: the model would not choose it.** 29/36 tool-call tokens are top-1, but at the
  first assistant token `To` has p=0.72 and `<tool_call>` has p=0.005. Greedy decoding answers
  in prose. Adding "Use the calculator tool for any arithmetic." to the system prompt lifts
  `<tool_call>` to p=0.175 (rank 2), but greedy decoding still writes prose.
- **Logit lens: sharpens only in the last 4-5 layers.** For the first digit, `9` reaches p=0.09
  at layer 20, 0.70 at layer 21, 0.92 at layer 22 and 0.999 at layer 23. ` final` behaves the
  same way (layer 20: 0.20; layer 22: 0.96). Layer 0 echoes the input token, because the
  embeddings are tied. Layers 1-19 show low-probability junk (`/*****...` banners, CJK and
  Cyrillic fragments). That is normal for the logit lens on small models.
- **Attention: convincing heads were found.**
  - **L9H13 is an induction head.** The question's ` final` puts **98%** of its attention on
    ` exam`, the word after the earlier ` final` in "The final exam".
  - ` final` to ` syllabus` is weaker: the best head is L11H0, with 32%.
  - **L8H7 is a previous-token head**, with mean weight 0.84 on the token at i-1.
  - **L16H0 is a copy head.** While writing 93.75, it puts 0.99, 0.99, 0.18, 0.87 and 0.99
    on the matching tool-result digit.
- **Embeddings.** 88% of the 40 words have a same-group nearest neighbour in the full 896-D
  space. Plain 2-D PCA keeps only 42% of that, because PC1 is just "number word or not".
  Projecting onto the PCA plane of the group centroids keeps 92%.

## Surprises

1. The small model's instinct is to answer directly rather than call the tool.
2. **Tokenization artifact.** Re-tokenizing the scripted call merges ` "(` into one token
   (rank 8, p=6e-5). The model would write ` "` (p=0.998) and then `(`.
3. Qwen splits every digit, so ` 93.75` is ` `,`9`,`3`,`.`,`7`,`5`. Number words stand in for
   numbers in the embedding map.
4. **Attention sink.** 71% of heads put more than 20% of their attention on position 0
   (median 38%).

## Recommendation for production

- Keep **Qwen2.5-0.5B-Instruct, CPU, float32, one forced forward pass** as an offline build step
  that commits the JSON. It is fast, deterministic and Apache-2.0.
- Decide the tool-call story deliberately. Either show the truth ("its top choice was to answer
  in prose; `<tool_call>` was #9 at 0.5%"), which is a good teaching moment, or add the
  calculator sentence to the system prompt in `heroRun.ts` and regenerate.
- In the logit-lens view, show layers ~18-24 and label earlier ones "no word yet". Do not sample
  evenly from layer 0. In attention views, leave out or explain position 0.
- In the vote view, the `9` step is a foregone conclusion (p=0.998). Livelier steps are pos 313
  (` a` 0.41 vs ` ` 0.36), pos 323 (` exam` 0.94 vs scripted ` to` 0.04) and pos 249 (tool-call start).
