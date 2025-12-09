# Incident Report: Gemini API 404 & Quota Errors
**Date:** December 9, 2025
**Status:** RESOLVED

## 1. The Symptoms
* **Error 1:** `[404 Not Found] models/gemini-1.5-flash is not found`
* **Error 2:** `API quota exceeded` (immediately after fixing Error 1)
* **Context:** Occurred even though the API Key was valid and "Generative Language API" was enabled in Google Cloud Console.

## 2. The Root Cause
**It was not a network error. It was a "Time Travel" error.**

1.  **The 404 Error:**
    * We were requesting `gemini-1.5-flash`.
    * For new API Keys created in late 2025, Google **retired** access to the old 1.5 models.
    * The API returned `404` literally because *that model does not exist* for your key. It only sees the new `gemini-2.0` and `gemini-2.5` models.

2.  **The Quota Error:**
    * Once we switched to `gemini-2.0-flash`, we hit a wall.
    * The generic "Flash 2.0" model has very strict rate limits (RPM) on the Free Tier.
    * The "Lite" or "Latest" alias models are optimized for high-volume free usage.

## 3. The Fix (Code Changes)

**File:** `src/app/api/grade-frq-text/route.ts`

### A. The Primary Model (Use the "Pointer" Alias)
Instead of hardcoding a specific version number (which eventually dies), use the `latest` alias. This automatically points to the current stable, high-quota model.

```typescript
// OLD (BROKEN):
// let model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// NEW (FIXED):
// Points to the most stable, high-limit production model automatically
let model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });