# Loaf Lab — Product Spec

## 1) Project Summary
Loaf Lab is a web app for sourdough bakers that helps users improve their next bake.

## 2) Build Strategy
We will follow this milestone pattern:

- **1 page = 1 milestone** (UI first)
- then **API milestone**
- then **UI/API integration milestone**

This keeps scope clear, improves review quality, and works well with AI-driven development.

## 3) Core Features
1. AI Advisor (chat interface)
2. Crumb Analyzer (analyze bake data + crumb photo)
3. Hydration Calculator (formula calculator)
4. Gallery (static sourdough photo gallery)

## 4) Tech Stack
- Frontend: React + Vite + Tailwind + TypeScript
- Backend: Node + Express

## 5) Constraints
- No database
- No authentication
- No persistent user data
- Keep architecture simple

## 6) Milestones

### Milestone 0 — Planning + Contracts
- Create/update spec and task board.
- Define minimal API contracts early (request/response JSON only).
- Keep contracts intentionally lightweight and refine later.

### Milestone 1 — Home Page (UI only)
- Full-screen hero + top nav
- Brand style and responsive behavior
- No API calls

### Milestone 2 — Advisor Page (UI only)
- “What it does” + advisor interaction UI
- Chat-style layout with mock data
- No backend wiring yet

### Milestone 3 — Calculator Page (UI only)
- Calculator UI + client-side formula logic
- Responsive controls and outputs

### Milestone 4 — Gallery Page (UI only)
- Gallery layout with placeholders
- Metadata cards and reusable structure
- Real photos integrated later

### Milestone 5 — Backend API (Express)
- Node + Express scaffold
- Implement endpoints:
  - `POST /api/crumb-feedback`
  - `POST /api/formula-adjust`
  - `POST /api/advisor` (stub contract)
- Input validation + typed responses + error handling

### Milestone 6 — Integration
- Connect crumb feedback flow to API
- Connect formula-adjust flow to API

### Milestone 7 — Polish + Deploy
- Responsive/accessibility pass
- README finalization
- Deploy frontend and backend
- Prepare final product demo flow

## 7) Minimal API Contracts (Draft)

### 7.1 `POST /api/crumb-feedback`
**Request**
```json
{
  "bake": {
    "totalDoughWeight": 900,
    "flourBlend": [
      { "flour": "hard red spring", "percent": 70 },
      { "flour": "spelt", "percent": 30 }
    ],
    "hydration": 78,
    "starter": {
      "type": "liquid",
      "hydrationPercent": 100,
      "inoculationPercent": 20
    },
    "saltPercent": 2,
    "bulkFermentationHours": 5,
    "doughTempC": 24.5,
    "bulkTempC": 24,
    "finalProof": {
      "method": "cold-retard",
      "durationHours": 12,
      "tempC": 4
    },
    "bakeProfile": {
      "ovenTempC": 250,
      "vessel": {
        "type": "dutch-oven",
        "material": "cast-iron"
      },
      "coveredMinutes": 20,
      "uncoveredMinutes": 22
    },
    "notes": "crumb tighter near base"
  },
  "image": {
    "type": "crumb",
    "dataUrl": "data:image/jpeg;base64,..."
  }
}
```

**Response**
```json
{
  "summary": "Slight underproofing indicated in center crumb.",
  "suggestions": [
    {
      "title": "Extend final proof by 20-30 minutes",
      "reason": "Gas distribution suggests mild underproofing.",
      "expectedImpact": "More even openness",
      "confidence": 0.78
    }
  ],
  "nextBakeChecklist": [
    "Target dough temp 24-25C",
    "Watch for 50-70% bulk rise",
    "Compare crumb after +25 min proof"
  ]
}
```

### 7.2 `POST /api/formula-adjust`
**Request**
```json
{
  "currentFormula": {
    "hydration": 76,
    "starterPercent": 18,
    "saltPercent": 2
  },
  "goal": "more open crumb without losing shape",
  "constraints": ["fresh milled flour", "home oven"]
}
```

**Response**
```json
{
  "proposedFormula": {
    "hydration": 78,
    "starterPercent": 17,
    "saltPercent": 2
  },
  "processChanges": [
    "Add 30 min autolyse",
    "Reduce aggressive degassing during pre-shape"
  ],
  "tradeoffs": [
    "Slightly stickier handling"
  ]
}
```

### 7.3 `POST /api/advisor`
**Request**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "My crumb is gummy at the base. What should I change next bake?"
    }
  ],
  "context": {
    "recentBake": {
      "hydration": 78,
      "starterPercent": 20,
      "bulkFermentationHours": 5,
      "finalProofHours": 12,
      "notes": "tight lower crumb"
    }
  }
}
```

**Response**
```json
{
  "reply": "The gummy base and tighter lower crumb usually point to slight underproofing or insufficient bake-out. For your next bake, keep dough temp steady, extend final proof by 20–30 minutes, and add 5–8 minutes uncovered bake time.",
  "quickActions": [
    "Extend final proof by 20-30 minutes",
    "Increase uncovered bake time by 5-8 minutes",
    "Recheck internal loaf temp before cooling"
  ],
  "disclaimer": "Advisory guidance only; adjust based on your flour, oven, and starter behavior."
}
```

## 8) Reusability Rule
We will build page-first and extract shared components when repetition appears.

- If used in 2+ places → extract component
- If used once → keep local to page

Expected early shared pieces: Navbar, Button variants, Section wrapper, Card base.

## 9) State Handling Requirements
All API-driven or interactive flows must include explicit states:
- loading
- success
- empty (when applicable)
- error

These states should be implemented consistently across pages and API-driven interactions.

## 10) API Error Format (Consistent)
All backend endpoints should return errors in this shape:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "fieldErrors": {}
  }
}
```

Notes:
- `fieldErrors` is optional and used for validation errors.
- `code` should be stable and machine-friendly.
- `message` should be human-readable.

## 11) Workflow Rules
- One milestone per branch and PR.
- Local review before commit when building UI.
- No scope creep across milestones.
- Keep docs updated when milestones or contracts change.
