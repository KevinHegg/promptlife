import React, { useMemo, useState } from "react";
import { encode, decode } from "gpt-tokenizer/encoding/cl100k_base";

export default function Tokenizer() {
  const [text, setText] = useState("A jealous dog chased a startled cat.");
  const ids = useMemo(
    () => encode(text, { disallowedSpecial: new Set() }),
    [text],
  );
  return (
    <section className="tokenizer">
      <h3>First, inspect the pieces</h3>
      <label htmlFor="token-text">Your text · up to 400 characters</label>
      <textarea
        id="token-text"
        rows={2}
        value={text}
        maxLength={400}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button-row">
        {[
          "Hello, world!",
          "unbelievable",
          "こんにちは世界",
          "A dog. A  dog.",
        ].map((x) => (
          <button className="subtle" key={x} onClick={() => setText(x)}>
            {x}
          </button>
        ))}
      </div>
      <div className="token-output" aria-label="Encoded tokens">
        {ids.map((id, i) => (
          <span className="token-piece" key={i}>
            <code>
              {decode([id]).replaceAll(" ", "·").replaceAll("\n", "↵") || "∅"}
            </code>
            <small>{id}</small>
          </span>
        ))}
      </div>
      <p className="lab-caption">
        <strong>{ids.length} tokens</strong> · Real cl100k_base encoding,
        calculated on this device. Spaces appear as ·. Some tokens contain
        partial character bytes and display as � alone. The complete sequence
        decodes to: <q>{decode(ids)}</q>
      </p>
    </section>
  );
}
