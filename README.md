# 🍞 Loaf Lab

A lightweight AI-powered web app for sourdough bakers who want clearer feedback and practical tools to improve each bake.

## Core Features

1. **AI Advisor** — chat-style guidance for fermentation, flour choices, and troubleshooting.
2. **Crumb Analyzer** — analyze bake data + crumb photo to suggest next-bake adjustments.
3. **Hydration Calculator** — quick baker's-percentage to grams conversion.
4. **Gallery** — static sourdough photo gallery.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express

## Architecture Decisions

- No database — all state is ephemeral and session-based.
- No authentication — single-user tool, no accounts needed.
- No persistent user data — keeps the stack simple and deployable anywhere.
- Stateless backend — Express handles request validation/orchestration without long-term storage.

## Project Planning Docs

- `docs/product-spec.md`
- `docs/task-board.md`

## Local Development

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).
