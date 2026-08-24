# SCOTUS FRQ — Full Grade Path

Formal AP-style scoring for FRQ #3 (SCOTUS Comparison). This is separate from AI Sensei chat coaching and from **Check My Work** (`part_check`).

## Model

| Intent | Model constant | Model ID |
|--------|----------------|----------|
| `full_grade` | `GEMINI_REASONING_MODEL` | **`gemini-3.5-flash`** |
| `coach` / `part_check` | `GEMINI_TUTOR_CHAT_MODEL` | `gemini-2.5-flash-lite` |

Defined in `src/lib/geminiModels.ts`. Routed by `geminiModelForCheatSheetChat()` when:

- `mode === 'scotus_essay'`
- `scotusEssayIntent === 'full_grade'`

Generation settings (in `src/app/api/cheat-sheet-chat/route.ts`):

- Temperature: `0.35`
- `maxOutputTokens`: `2048`

Do **not** use `gemini-2.5-flash` for this path (unavailable to new API keys → 404).

## Request shape

Client: `src/app/scotus-essay-practice/[caseName]/ScotusEssayPracticeClient.tsx` → `submitFullResponseForGrading()`.

```http
POST /api/cheat-sheet-chat
```

```json
{
  "subject": "gov",
  "unitNumber": 1,
  "unitTitle": "<prompt topic>",
  "mode": "scotus_essay",
  "scotusEssayIntent": "full_grade",
  "scotusPrompt": {
    "requiredCase": "...",
    "nonRequiredCase": "...",
    "topic": "...",
    "scenario": "...",
    "tasks": ["A", "B", "C"],
    "caseFacts": "...",
    "constitutionalClause": "...",
    "comparisonPoints": "...",
    "rubricChecklist": ["..."],
    "gradingKey": { "...": "optional; see below" }
  },
  "messages": [
    {
      "role": "user",
      "content": "[FULL FRQ SUBMISSION — GRADE THIS]\n..."
    }
  ]
}
```

Results render in the **main panel** (`fullGradeResult`), not the Sensei chat thread.

## System prompt (source of truth)

Built by `scotusSenseiSystemPrompt(ctx, 'full_grade')` in `src/lib/chatPersonas.ts`.

### Role

Dojo Sensei as an expert AP U.S. Government grader for FRQ #3. Absolute rigor and knowledge-grounding.

### Rubric mapping (4 points)

| Student part | Rubric points |
|--------------|---------------|
| Part A | Point A — clause / civil liberty identification |
| Part B | Point B Facts **and** Point B Bridge (two separate 0/1 awards) |
| Part C | Point C — application of the comparison case to the principle (definition alone fails) |

### Grading rules

- Strict and point-based; no near-miss points.
- Wrong Point A → missed, even if surrounding prose is strong.
- Point B Bridge requires explicit transfer language (`just as` / `similarly` / `likewise`). Two case summaries without legal comparison do not earn the bridge.
- Point C must connect the non-required case holding/reasoning to the named principle.

### Required feedback format

1. Start with **`Total Score: X/4 Points`** on its own line.
2. For Point A, Point B Facts, Point B Bridge, and Point C: clear heading + **`[EARNED]`** or **`[MISSED]`** (Part B shown as two 0/1 or 1/1 lines).
3. For every missed point:
   - **Sensei's Critique:** what legal DNA was missing
   - **Path to the 5:** one concrete rewrite instruction
4. Do not dump a full model essay unless a part is blank; then say what to add.
5. End with one short supportive line (no required follow-up question).
6. Plain markdown only (no JSON wrappers).

### Context injected into the prompt

Always:

- Topic, required case, comparison case, scenario, tasks A–C
- Tutor notes: clause anchor, required-case facts, comparison bridge, rubric checklist

When a grading key exists for the prompt id (`src/data/gov/scotusGradingKeys.ts`):

- Ground truth (clause, facts, bridge, application principle)
- Per-point award rules (`pointA`, `pointBFacts`, `pointBBridge`, `pointC`)

**Current coverage:** only `mcculloch-v-maryland` has a grading key. Other cases grade from tutor notes alone until keys are added.

## Related intents (not full grade)

| Intent | UI | Scores? | Model |
|--------|-----|---------|-------|
| `coach` | Sensei chat | No | `gemini-2.5-flash-lite` |
| `part_check` | Check My Work → chat | No (coaching only) | `gemini-2.5-flash-lite` |
| `full_grade` | Submit & grade → main panel | Yes, X/4 | **`gemini-3.5-flash`** |
