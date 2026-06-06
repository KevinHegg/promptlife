# Morning Commute Recommendations v0.19

Date: 2026-06-06

## Top Five Findings

1. The stage order is sound. Keep Inference first, then Prompt vs Response, then the representation sequence from Tokenization through Tensors.
2. Vectors and Tensors need the most instructional support. Their copy is accurate, but the visuals and interactions are less concrete than the surrounding cards.
3. Prompt vs Response is distinct from Autoregression, but the next pass should protect that distinction. Prompt vs Response should teach roles in the context; Autoregression should teach the repeated loop.
4. Tokenization, Token IDs, and Embeddings should be visually separated as consecutive mechanisms: chunk text, assign lookup number, retrieve learned starting vector.
5. The stage should keep using coded SVG/HTML for label-heavy diagrams. Generated PNGs should be textless atmosphere/props only, and Morning Commute does not need them before the core coded visuals are clearer.

## Explicit Morning Commute Answers

- Does Inference belong here? Yes. It is the correct bridge from Before Morning weight shaping to live model use.
- Does Inference belong before Prompt vs Response? Yes. Learners first need to know that ordinary use is a forward pass with fixed weights.
- Is Prompt vs Response redundant with Autoregression? No. Prompt vs Response explains given input and generated output roles. Autoregression later explains next-token, append, repeat as a loop.
- Is Tokenization clear enough? Mostly. Improve by showing uneven chunks, punctuation, spaces, and word pieces.
- Are Token IDs separated from meaning? The copy says yes. The next visual should make ID-as-lookup-key unmistakable.
- Are Embeddings separated from hidden states? The copy says yes. The visual should more strongly contrast learned starting vector with later context-shaped hidden state.
- Are Vectors too abstract? Somewhat. Keep the card, but add a more active vector manipulation exercise and repeat that real features are distributed.
- Does Tensors need a 3D visual? Yes, but use lightweight CSS 3D or coded SVG/HTML, not a heavy 3D library.
- Which card most needs a textless Image 2 asset? Embeddings is the best candidate if one is made. Inference is an optional second candidate. Prompt vs Response, Tokenization, Token IDs, Vectors, and Tensors should remain coded because they need precise labels.
- Are any cards out of order? No.

## Visual Strategy

- Inference: coded SVG or hybrid. Show current context entering fixed weights, temporary activation states, logits/scores, and one next token.
- Prompt vs Response: coded SVG/HTML only. Keep labels exact and text accessible.
- Tokenization: coded SVG/HTML only. Show uneven chunks and tokenizer rules.
- Token IDs: coded SVG/HTML only. Show tokenizer output -> ID lookup -> embedding row.
- Embeddings: hybrid or generated textless asset plus HTML callouts. A glowing lookup-table/meaning-cloud image could help if it avoids baked-in text.
- Vectors: coded SVG/HTML only. Feature labels are simplified, so the warning must remain in controlled text.
- Tensors: coded SVG/HTML or CSS 3D. A rotatable tensor block can teach axes without adding a library.

## Tiny Interaction Recommendations

- Inference: toggle "temporary state" versus "durable weight update" and show only the temporary path changing during inference.
- Prompt vs Response: tap tokens to classify user prompt, response-so-far, next token, and next context.
- Tokenization: tap a sentence to split it into uneven token chunks; include punctuation and word pieces.
- Token IDs: match token chunks to numeric IDs, then pull the matching row from an embedding table.
- Embeddings: drag a token ID into the table and reveal the starting vector; then show that the hidden state changes later.
- Vectors: adjust simplified slider bars and immediately show a note that real dimensions are distributed rather than neatly named.
- Tensors: rotate or inspect a compact tensor object and identify token axis, feature axis, and optional batch note.

## Card-Level Recommendations

| Card | Recommendation | Priority | Suggested visual |
| --- | --- | --- | --- |
| Inference | Revise lightly. Make fixed weights and temporary activations more tangible. | Medium | Coded SVG / hybrid |
| Prompt vs Response | Revise lightly. Keep as a separate role-distinction card. | Medium | Coded SVG/HTML |
| Tokenization | Revise. Make uneven token boundaries more explicit. | Medium | Coded SVG/HTML |
| Token IDs | Revise. Separate tokenizer, ID mapping, and embedding table. | Medium | Coded SVG/HTML |
| Embeddings | Revise. Emphasize durable table versus temporary retrieved vector. | Medium-high | Hybrid or textless Image 2 candidate |
| Vectors | Revise strongly. Improve the interaction and reduce reliance on neat English feature labels. | High | Coded SVG/HTML |
| Tensors | Revise strongly. Use axis inspection or lightweight CSS 3D. | High | CSS 3D / coded SVG |

## Machine-Readable Recommendation Summary

```json
{
  "stage": "morning-commute",
  "version": "v0.19",
  "status": "audit-only",
  "cardsToKeep": ["inference", "prompt-response", "tokens", "token-ids", "embeddings", "vectors", "tensors"],
  "cardsToMerge": [],
  "cardsToCut": [],
  "cardsOutOfOrder": [],
  "highestPriorityCards": ["vectors", "tensors", "embeddings"],
  "image2Candidates": [
    {
      "lessonId": "embeddings",
      "priority": "best candidate",
      "reason": "A textless lookup-table or meaning-cloud image could make learned starting vectors feel less abstract while HTML handles labels."
    },
    {
      "lessonId": "inference",
      "priority": "optional",
      "reason": "A textless forward-pass asset could provide atmosphere, but the key labels still need coded HTML/SVG."
    }
  ],
  "mustRemainCoded": ["prompt-response", "tokens", "token-ids", "vectors", "tensors"],
  "css3dCandidate": "tensors",
  "doNotChange": ["progress rules", "checkpoint randomization", "one badge model"]
}
```

## Next Implementation Prompt

Implement a v0.19.1 Morning Commute visual/interaction repair pass. Do not add new cards, games, heavy 3D libraries, or generated PNGs. Keep progress logic, checkpoint randomization, and the single badge model unchanged. Focus on: Inference forward-pass visual clarity, Prompt vs Response role labels, Tokenization uneven chunks, Token IDs lookup-key separation, Embeddings durable table versus temporary retrieved vector, Vectors distributed-feature interaction, and a lightweight CSS 3D or coded tensor-axis inspector. Run `npm run typecheck`, `npm run build`, `npm run build:pages`, and `npm run audit:answers`.

