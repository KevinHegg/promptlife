/goal
Implement Prompt Life v0.27.13 — Full Checkpoint Bank Repair Pass from JSON/CSV Review Artifacts.

Context:
Prompt Life is under active development. The Journey checkpoint bank is active for development testing but is not badge-final. Badge issuance remains under construction and pending human review.

Use these review artifacts as inputs:
- prompt_life_v02712_checkpoint_bank.json
- prompt_life_v02712_checkpoint_bank_questions.csv
- prompt_life_v02712_checkpoint_bank_choices.csv
- prompt_life_v02713_repair_plan.json
- prompt_life_v02713_repair_plan.csv

Primary goal:
Improve the 136-question Journey checkpoint bank so the questions better support badge-worthy model literacy, not mere recall. Apply the repair plan, then regenerate implementation data and review reports.

Non-negotiable constraints:
1. Keep one badge only: Prompt Life: Model Literate.
2. Badge remains under construction / pending human review / not yet issued.
3. No debug, fallback, query-parameter, active-bank, or development notes in learner-facing UI.
4. Keep legacy checkpoint fallback available through existing query parameters, but document it only in docs/reports.
5. Every checkpoint question must have exactly 4 choices and exactly 1 correct answer.
6. Wrong answers must not reveal or style the correct answer.
7. Feedback must map by stable choiceId, not visible A/B/C/D position.
8. Preserve stable IDs when wording is clarified; create new stable IDs when a question or choice changes meaning.
9. Keep the established model-thinking standard: questions should test mechanism, boundary, causal consequence, applied scenario, human-use judgment, misconception repair, or synthesis.
10. Avoid vague stems such as “What is the best definition?”, “Which statement is most accurate?”, “According to this learning card…”, or “In this learning card…”.

Repair workflow:
1. Load the current source bank from the repo and compare it against prompt_life_v02712_checkpoint_bank.json.
2. Load prompt_life_v02713_repair_plan.json/csv.
3. Apply global repairs first:
   - remove learner-facing debug/development/fallback notes
   - audit question type balance
   - audit answer-length bias
   - audit jargon timing
   - audit absolute/obvious distractors
   - keep set-aside validation examples clearly defined
   - preserve scroll behavior for Next question and Next learning card
4. Review each flagged question in the repair plan.
   - If the issue is real, revise the stem, choices, or feedback.
   - If the issue is a false-positive heuristic, record “reviewed/no change” in the report.
5. Review unflagged questions quickly for obvious issues: two correct answers, weak distractors, punitive feedback, or hidden jargon.
6. Regenerate the full checkpoint bank data, CSV, Markdown, and PDF report.

Specific quality targets:
- Correct answer should not be obviously longest or most formal.
- Distractors should be plausible misconception-first alternatives, preferably glossary-near.
- Feedback should teach why the selected wrong answer is tempting but not right.
- Early-stage questions should not rely on later-stage jargon unless the feedback explains it clearly.
- Learners should repeatedly practice these core boundaries:
  - LLM vs AI vs product/app
  - model vs interface/tool wrapper
  - training vs inference
  - pretraining vs fine-tuning
  - prompt/context vs weight change
  - context vs memory
  - retrieval/RAG vs training
  - grounding vs truth guarantee
  - token vs word
  - token ID vs meaning
  - embedding vs hidden state
  - vector vs tensor
  - attention vs awareness
  - logits vs probabilities
  - softmax vs sampling
  - probability vs truth
  - autoregression vs diffusion
  - alignment vs conscience/morality
  - guardrail/policy vs model weights
  - hallucination vs lying
  - risk vs myth
  - human review vs blind trust

Required outputs:
Create or update:
- docs/journey/checkpoints/checkpoint-question-bank-v0-27-13.json
- docs/journey/checkpoints/checkpoint-question-bank-v0-27-13.csv
- docs/journey/checkpoints/checkpoint-question-bank-v0-27-13.md
- docs/journey/checkpoints/checkpoint-bank-v0-27-13-choice-level.csv
- docs/journey/checkpoints/checkpoint-bank-v0-27-13-repair-log.csv
- docs/journey/prompt-life-v0-27-13-checkpoint-bank-revision-report.html
- docs/journey/prompt-life-v0-27-13-checkpoint-bank-revision-report.pdf

The repair report must include:
1. Executive summary.
2. All cards and question counts.
3. Question type distribution by card and stage.
4. Questions revised.
5. Questions reviewed with no change.
6. Distractors revised.
7. Feedback revised.
8. Objectives revised, if any.
9. Answer-length bias audit results.
10. Jargon timing audit results.
11. Learner-copy audit results proving no debug/fallback notes in normal UI.
12. Any unresolved human-review concerns.
13. Final readiness judgment: ready for small human testing / revise before human testing / major rewrite needed.

Audits and QA:
Run:
- npm run typecheck
- npm run build
- npm run build:pages, if present
- npm run audit:answers
- npm run audit:checkpoints
- npm run audit:learner-copy

Add or extend audits as needed to check:
- stable question IDs and choice IDs
- exactly 4 choices per question
- exactly 1 correct answer per question
- wrong-answer feedback present for every distractor
- success feedback present for every correct answer
- no banned vague stems
- no learner-facing debug/fallback notes
- no unexplained held-out/holdout language
- correct answers are not systematically longer or styled differently
- question type distribution is reported

Manual QA:
- Test 320px and 390px mobile viewports.
- Test one 2-question, one 3-question, one 4-question, and one 5-question card.
- Verify wrong answers do not reveal the correct answer.
- Verify Next question scrolls to the checkpoint panel.
- Verify Next learning card scrolls to the top.
- Verify Badge page still says under construction / pending human review / not yet issued.
- Verify Home, Journey, Play, Glossary, and Badge contain no development notes.

Final response must include:
1. Summary of changes.
2. Number of questions revised.
3. Number of distractors revised.
4. Number of feedback items revised.
5. Number of objectives revised.
6. Question type distribution.
7. Any unresolved human-review concerns.
8. Verification commands and results.
9. Mobile QA results.
10. Files changed.
11. Reports and JSON/CSV/MD/PDF artifacts created.
