

# Replace Keyword Tagger with AI-Powered Classification

## Problem
The current `autoTag()` function uses simple keyword matching, which causes frequent mistagging — especially for nuanced signals where context matters more than individual words.

## Solution
Replace the client-side keyword matcher with an AI-powered classifier via a backend function that calls Lovable AI. The existing keyword tagger remains as a fallback.

## Tag Definitions (used in the AI system prompt)

These are the 6 tag categories the AI will classify signals into:

| Tag | Definition |
|-----|-----------|
| **Recognition** | Your contribution was acknowledged publicly or privately — a shoutout in a meeting, positive feedback from a stakeholder, or a peer crediting your work. |
| **Missed Credit** | Your idea, work, or contribution was attributed to someone else, or went unacknowledged entirely. Can be subtle — worth noting even when you're not sure. |
| **Constructive Feedback** | Input you received about an area to develop or improve. Includes formal feedback, informal coaching, or repeated observations from others. |
| **Manager Signal** | A shift in your manager's behavior, tone, or attention toward you — shorter 1:1s, change in communication style, new visibility or reduced access. |
| **Org / Political Signal** | An organizational dynamic worth tracking — restructuring, budget signals, stakeholder shifts, or changes in team direction that affect your position. |
| **Personal Milestone** | A meaningful moment in your own career progression — first time leading something, a stretch assignment, a door that opened. |

## Architecture

```text
User submits signal text
        │
        ▼
  Edge Function (classify-signal)
        │
        ▼
  Lovable AI Gateway (gemini-2.5-flash-lite)
  — system prompt with tag definitions above
  — tool-calling for structured output
        │
        ▼
  Returns one of 6 valid SignalTag values
        │
        ▼
  Client uses returned tag (falls back to keyword tagger on error)
```

## Implementation Steps

### 1. Create edge function `supabase/functions/classify-signal/index.ts`
- Accepts `{ text: string }` in the request body
- System prompt includes the 6 tag definitions above plus classification guidance
- Uses tool calling to guarantee a valid tag is returned
- Falls back to keyword tagger if AI call fails

### 2. Update `src/lib/signalTagger.ts`
- Keep existing `autoTag()` as fallback
- Add async `classifySignal(text)` that calls the edge function

### 3. Update Dashboard and Onboarding
- Make signal submission async, calling `classifySignal()` instead of `autoTag()`
- Brief loading state on submit button during classification

### Files modified

| File | What changes |
|------|-------------|
| `supabase/functions/classify-signal/index.ts` | New edge function for AI classification |
| `src/lib/signalTagger.ts` | Add async `classifySignal()` wrapper |
| `src/pages/Dashboard.tsx` | Async submit with AI tagging |
| `src/pages/Onboarding.tsx` | Async submit with AI tagging |

