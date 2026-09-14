import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const directory = fileURLToPath(
  new URL("../public/illustrations/", import.meta.url),
);
mkdirSync(directory, { recursive: true });
const text = (x, y, value, size = 16, color = "#17283e") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${value}</text>`;
const box = (x, y, w, h, label, fill = "#fff", stroke = "#a8bad4") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>${text(x + w / 2, y + h / 2 + 6, label)}`;
const arrow = (d) =>
  `<path d="${d}" fill="none" stroke="#2254cf" stroke-width="2" marker-end="url(#arrow)"/>`;
const chain = (labels) =>
  labels
    .map(
      (label, i) =>
        box(44, 12 + i * 68, 272, 44, label, i === 1 ? "#e7efff" : "#fff") +
        (i < 2 ? arrow(`M180 ${56 + i * 68}v22`) : ""),
    )
    .join("");
const illustrations = {
  landscape: [
    "AI, machine learning, and deep learning",
    `<rect x="8" y="8" width="344" height="194" rx="14" fill="#fff" stroke="#8fabc9"/>${text(180, 36, "Artificial intelligence")}${text(180, 55, "Rules, search, planning, learning…", 13)}<rect x="32" y="70" width="296" height="120" rx="12" fill="#e7efff" stroke="#7296cc"/>${text(180, 96, "Machine learning")}${text(180, 115, "Models learned from data", 13)}<rect x="53" y="128" width="254" height="50" rx="9" fill="#2254cf"/>${text(180, 159, "Deep learning", 18, "#fff")}`,
  ],
  answer: [
    "The generation loop",
    chain(["Assembled context", "Model scores", "Select a token"]) +
      `<path d="M316 170H341V34H317" fill="none" stroke="#bd451f" stroke-width="2" marker-end="url(#arrow)"/>${text(180, 211, "Append the token and repeat", 14)}`,
  ],
  prediction: [
    "Probability across possible next tokens",
    ["floor", "room", "tiles", "elephant"]
      .map((v, i) => {
        const p = [0.6572, 0.2418, 0.0889, 0.0121][i];
        return (
          text(53, 41 + i * 44, v, 15) +
          `<rect x="103" y="24" width="0" height="0"/><rect x="104" y="${24 + i * 44}" width="190" height="23" rx="4" fill="#e5ebf4"/><rect x="104" y="${24 + i * 44}" width="${190 * p}" height="23" rx="4" fill="#2254cf"/>` +
          text(328, 41 + i * 44, `${Math.round(p * 100)}%`, 14)
        );
      })
      .join("") + text(180, 211, "One illustrative distribution", 14),
  ],
  training: [
    "A training update cycle",
    box(27, 17, 135, 55, "Predict") +
      box(198, 17, 135, 55, "Measure error") +
      box(71, 126, 218, 55, "Update the weights", "#e7efff") +
      arrow("M164 44h32") +
      arrow("M266 74v26H181v24") +
      arrow("M69 154H14V45h11") +
      text(180, 211, "Repeat with training examples", 14),
  ],
  transformer: [
    "Bank becomes a token ID, an embedding vector, and a context-sensitive hidden state",
    text(180, 23, "The river bank", 20) +
      box(24, 39, 134, 35, "Token ·bank", "#e7efff") +
      arrow("M160 57h33") +
      box(201, 39, 134, 35, "ID 42", "#e7efff") +
      arrow("M268 76v13H180v7") +
      box(24, 99, 311, 39, "[0.2, −0.4, 0.7, 0.1]") +
      text(180, 153, "Embedding: the starting vector", 13) +
      arrow("M180 158v15") +
      box(
        24,
        180,
        311,
        32,
        "Hidden state: the working vector",
        "#fff2e9",
        "#c98c6e",
      ),
  ],
  assistant: [
    "A finite context window",
    box(18, 16, 324, 155, "", "#fff") +
      text(180, 44, "Context window: 8 units", 17) +
      box(32, 62, 138, 40, "Instructions · 2", "#e7efff") +
      box(184, 62, 144, 40, "Question · 2", "#e7efff") +
      box(32, 114, 296, 40, "Source passage · 4", "#dceee8", "#72a398") +
      text(180, 197, "Earlier history stays outside", 15) +
      text(180, 216, "Illustrative capacity, not token counts", 12),
  ],
  evidence: [
    "Connect a claim to the right source",
    chain([
      "Question: Maya’s garden?",
      "Minutes: Maya · 2016",
      "Supported answer: 2016",
    ]) + text(180, 211, "Match the person, event, and date", 14),
  ],
  tools: [
    "A permission boundary before a tool executes",
    chain([
      "Model proposes a call",
      "Application checks permission",
      "Tool executes if allowed",
    ]) +
      `<path d="M12 111H348" stroke="#bd451f" stroke-dasharray="5 5" stroke-width="2"/>` +
      text(180, 211, "A proposal is not permission", 14),
  ],
  judgment: [
    "A generated claim differs from its supplied source",
    box(27, 19, 306, 56, "Source: 12 April 2016", "#dceee8", "#72a398") +
      box(27, 113, 306, 56, "Answer: 2018", "#fff0e8", "#bd451f") +
      arrow("M180 77v34") +
      text(180, 207, "Inspect the gap before choosing a fix", 14),
  ],
};
for (const [name, [title, body]] of Object.entries(illustrations)) {
  writeFileSync(
    `${directory}/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 228" role="img" aria-labelledby="title"><title id="title">${title}</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="#2254cf"/></marker></defs><rect width="360" height="228" rx="16" fill="#f1f5fc"/><g font-family="system-ui,sans-serif">${body}</g></svg>\n`,
  );
}
console.log(`Wrote ${Object.keys(illustrations).length} lesson SVGs.`);
