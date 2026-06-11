# Prompt Life v0.27.13 checkpoint repair starter artifacts
Source: prompt-life-v0-27-12-full-checkpoint-bank-review.pdf
Extracted: 39 cards, 136 questions, 544 choices, 408 distractors.
## Question type counts
- boundary: 37
- model-trace: 25
- mechanism: 17
- human-use-judgment: 16
- application: 16
- misconception-check: 14
- causal-consequence: 11

## Files
- `prompt_life_v02712_checkpoint_bank.json`
- `prompt_life_v02712_checkpoint_bank_questions.csv`
- `prompt_life_v02712_checkpoint_bank_choices.csv`
- `prompt_life_v02713_repair_plan.json`
- `prompt_life_v02713_repair_plan.csv`

## Main repair themes
- **critical** No debug/development/fallback notes in learner UI. Confirm no learner-facing UI contains legacyCheckpoints, checkpointBank=legacy, active-dev, development testing, debug, or fallback instructions. Keep reminders only in docs/DEV_NOTES.md, reports, or source comments.
- **critical** Question bank needs implementation-ready review artifacts. Generate JSON, CSV, and PDF review packets with full question bank, repairs applied, question type distribution, and open review concerns.
- **high** Question type balance should support badge validity. Maintain a mixture of mechanism, boundary, causal-consequence, applied scenario, human-use-judgment, misconception-check, and synthesis. Avoid too many same-type questions in a single card.
- **high** Correct answer should not be obvious by length/style. Run an answer-length bias audit. Review high-ratio items and balance answer choice length and specificity.
- **high** Jargon timing and definitions. Review early use of RAG, retrieval, softmax, logits, diffusion, grounding, hallucination, and context window. Either explain or replace future-stage terms before they are taught.
- **medium** Distractors should be tempting but fair. Review distractors using absolute words such as must, every, always, guaranteed, definitely. Keep when they represent a real myth; otherwise make them less cartoonish.
- **medium** Set-aside validation examples must stay clear. Keep learner-facing wording: “set-aside validation examples are kept out of training and saved for testing.” Avoid unexplained held-out/holdout wording.
- **high** Scroll behavior is part of assessment usability. Preserve reliable scroll-to-checkpoint and scroll-to-top behavior when advancing questions/cards; include mobile Safari QA.
