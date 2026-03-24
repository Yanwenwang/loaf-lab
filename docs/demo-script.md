# Loaf Lab — Product Walkthrough Demo Script

## Demo Length
- 3–5 minutes

## Goal
Show Loaf Lab’s core user value:
- fast sourdough guidance,
- practical dough calculation,
- clean bake journal experience,
- live deployed app.

## Environment
- Frontend: https://loaf-lab.vercel.app/
- Backend: Render-hosted API

## Suggested Talk Track

### 1) Home Page (30–45s)
- Open `/`.
- Say: “Loaf Lab helps sourdough bakers get clearer feedback and better outcomes each bake.”
- Point out navigation and full-screen hero design.

### 2) Advisor (90–120s)
- Go to `/advisor`.
- Start with a starter prompt (or type a real question).
  - Example: “My crumb is gummy near the base. What should I change?”
- Explain states naturally while interacting:
  - Empty: starter prompt view before chat starts
  - Loading: send button shows `…` and is temporarily disabled
  - Success: assistant response appears in chat thread
  - Error: user sees a fallback error message if API fails
- Emphasize practical, next-bake recommendations.

### 3) Calculator (60–90s)
- Go to `/calculator`.
- Adjust sliders:
  - total dough weight
  - target hydration
  - fresh milled percentage
- Call out instant updates to flour/water/salt outputs.
- Mention the fresh-milled absorption adjustment behavior.

### 4) Gallery (30–45s)
- Go to `/gallery`.
- Say: “This is a visual bake log for documenting flour blends, hydration, and outcomes.”
- Point out metadata + structure for future real-photo updates.

### 5) Close (20–30s)
- Summarize:
  - “Advisor for guidance, Calculator for reliable ratios, Gallery for bake tracking.”
- Mention deployment stack:
  - Frontend on Vercel
  - Backend on Render

## Quick Backup Plan (if live API fails)
- Refresh once, then continue demo using Calculator + Gallery.
- State clearly: “Frontend remains functional; advisor depends on backend/API availability.”
