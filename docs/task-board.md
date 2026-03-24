# Loaf Lab — Task Board

Status legend: [ ] TODO · [~] IN PROGRESS · [x] DONE

## Milestone 0 — Planning + Contracts
Branch: `docs/m0-planning`

**Goal**
- Lock the product direction, constraints, and API contract drafts.

**Acceptance Criteria**
- Product spec and task board exist in `docs/`.
- Core stack and constraints are explicitly documented.
- API contract drafts are ready for UI mock integration.

- [x] Confirm build pattern: 1 page = 1 milestone
- [x] Decide sequence: UI pages → API → integration
- [x] Confirm stack: React + Vite + Tailwind + TypeScript, Node + Express
- [x] Confirm constraints: no DB, no auth, no persistent user data
- [x] Draft product spec (`docs/product-spec.md`)
- [x] Draft task board (`docs/task-board.md`)
- [x] Add minimal API contracts (draft)

---

## Milestone 1 — Home Page (UI only)
Branch: `feat/m1-home-page`

**Goal**
- Build a polished full-screen landing experience that matches the approved visual direction.

**Acceptance Criteria**
- Home page includes navbar + hero.
- Layout feels full-screen and responsive on mobile/tablet/desktop.
- Page is ready for local review before commit.

- [x] Set up Tailwind (`tailwindcss` + `@tailwindcss/vite`)
- [x] Configure global style foundation for Home page
- [x] Build navbar + hero layout
- [x] Match approved visual direction (full-screen landing)
- [x] Responsive checks (mobile/tablet/desktop)
- [x] Local review + revisions
- [x] Commit and prepare PR

---

## Milestone 2 — Advisor Page (UI only)
Branch: `feat/m2-advisor-page`

**Goal**
- Build the advisor UI page with clear feature storytelling and chat-style interaction.

**Acceptance Criteria**
- Advisor page shows “What it does” + chat interface.
- Uses contract-compatible mock data shape.
- Shared UI parts extracted only when repeated.

- [x] Build “What it does” section
- [x] Build advisor interaction panel (chat-style UI)
- [x] Render mock advisor data with contract-compatible shape
- [x] Reuse/extract shared components when repeated
- [x] Local review + revisions
- [x] Commit and prepare PR

---

## Milestone 3 — Calculator Page (UI only)
Branch: `feat/m3-calculator-page`

**Goal**
- Deliver a reliable hydration calculator with immediate client-side feedback.

**Acceptance Criteria**
- Calculator inputs and outputs work correctly.
- Formula outputs update immediately with input changes.
- Page is responsive and ready for local review.

- [x] Build calculator layout and controls
- [x] Implement client-side formula calculations
- [x] Validate basic ranges and outputs
- [x] Responsive checks
- [x] Local review + revisions
- [x] Commit and prepare PR

---

## Milestone 4 — Gallery Page (UI only)
Branch: `feat/m4-gallery-page`

**Goal**
- Build a clean static gallery layout ready for future real-photo replacement.

**Acceptance Criteria**
- Placeholder gallery cards render correctly.
- Metadata is visible and legible.
- Structure supports easy image swap later.

- [x] Build gallery grid with placeholder assets
- [x] Add metadata cards (hydration/flour/date/notes)
- [x] Ensure easy swap for real photos later
- [x] Responsive checks
- [x] Local review + revisions
- [x] Commit and prepare PR

---

## Milestone 5 — API Backend (Express)
Branch: `feat/m5-api-backend`

**Goal**
- Provide a minimal Express backend with a stable contract for the advisor chat flow.

**Acceptance Criteria**
- Advisor chat API route is implemented and callable (`/api/chat`).
- Validation and consistent error responses are in place.
- Local run instructions are documented.

- [x] Scaffold Node + Express backend
- [x] Add env setup (`.env.example`)
- [x] Implement `POST /api/chat` (streaming advisor contract)
- [x] Add validation and consistent error responses
- [x] Add local run scripts/docs
- [x] Commit and prepare PR

---

## Milestone 6 — UI/API Integration (Advisor)
Branch: `feat/m6-ui-api-integration`

**Goal**
- Connect the advisor frontend flow to the backend chat endpoint with robust state handling.

**Acceptance Criteria**
- Advisor chat flow works end-to-end with `/api/chat`.
- Loading/success/empty/error states are visible and tested.
- Contract behavior is consistent between frontend and backend.

- [x] Connect advisor flow to `/api/chat`
- [x] Add loading, success, empty, and error states (advisor flow)
- [x] Confirm contract alignment end-to-end (advisor flow)
- [x] Local review + revisions
- [x] Commit and prepare PR

---

## Milestone 7 — Polish + Deploy
Branch: `chore/m7-polish-deploy`

**Goal**
- Finalize quality and make the app shareable through deployment.

**Acceptance Criteria**
- Responsive/accessibility pass complete.
- Frontend and backend deployments are live.
- README and demo script are up to date.

- [ ] Final responsive polish
- [x] Accessibility pass (Lighthouse: 95)
- [x] README final update
- [x] Frontend deploy (live: https://loaf-lab.vercel.app/)
- [x] Backend deploy (Render)
- [x] Demo script for product walkthrough (`docs/demo-script.md`)
- [ ] Final release merge

---

## Future Features (Deferred)

Moved out of current milestones due to timeline constraints.

- [ ] Implement `POST /api/crumb-feedback`
- [ ] Implement `POST /api/formula-adjust`
- [ ] Connect crumb-feedback flow to `/api/crumb-feedback`
- [ ] Connect formula-adjust flow to `/api/formula-adjust`
- [ ] Standardize API error format across new endpoints:
  - [ ] `error.code`
  - [ ] `error.message`
  - [ ] optional `error.fieldErrors`
- [ ] Calculator UX enhancement: add numeric input boxes next to slider controls so users can type values directly (without dragging)
