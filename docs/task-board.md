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

- [ ] Set up Tailwind (`tailwindcss` + `@tailwindcss/vite`)
- [ ] Configure global style foundation for Home page
- [ ] Build navbar + hero layout
- [ ] Match approved visual direction (full-screen landing)
- [ ] Responsive checks (mobile/tablet/desktop)
- [ ] Local review + revisions
- [ ] Commit and prepare PR

---

## Milestone 2 — Advisor Page (UI only)
Branch: `feat/m2-advisor-page`

**Goal**
- Build the advisor UI page with clear feature storytelling and chat-style interaction.

**Acceptance Criteria**
- Advisor page shows “What it does” + chat interface.
- Uses contract-compatible mock data shape.
- Shared UI parts extracted only when repeated.

- [ ] Build “What it does” section
- [ ] Build advisor interaction panel (chat-style UI)
- [ ] Render mock advisor data with contract-compatible shape
- [ ] Reuse/extract shared components when repeated
- [ ] Local review + revisions
- [ ] Commit and prepare PR

---

## Milestone 3 — Calculator Page (UI only)
Branch: `feat/m3-calculator-page`

**Goal**
- Deliver a reliable hydration calculator with immediate client-side feedback.

**Acceptance Criteria**
- Calculator inputs and outputs work correctly.
- Formula outputs update immediately with input changes.
- Page is responsive and ready for local review.

- [~] Build calculator layout and controls
- [~] Implement client-side formula calculations
- [~] Validate basic ranges and outputs
- [ ] Responsive checks
- [ ] Local review + revisions
- [ ] Commit and prepare PR

---

## Milestone 4 — Gallery Page (UI only)
Branch: `feat/m4-gallery-page`

**Goal**
- Build a clean static gallery layout ready for future real-photo replacement.

**Acceptance Criteria**
- Placeholder gallery cards render correctly.
- Metadata is visible and legible.
- Structure supports easy image swap later.

- [~] Build gallery grid with placeholder assets
- [~] Add metadata cards (hydration/flour/date/notes)
- [~] Ensure easy swap for real photos later
- [ ] Responsive checks
- [ ] Local review + revisions
- [ ] Commit and prepare PR

---

## Milestone 5 — API Backend (Express)
Branch: `feat/m5-api-backend`

**Goal**
- Provide a minimal Express backend with stable contracts for advisor/analyzer flows.

**Acceptance Criteria**
- All three API routes are implemented and callable.
- Validation and consistent error responses are in place.
- Local run instructions are documented.

- [ ] Scaffold Node + Express backend
- [ ] Add env setup (`.env.example`)
- [ ] Implement `POST /api/crumb-feedback`
- [ ] Implement `POST /api/formula-adjust`
- [ ] Implement `POST /api/advisor` (stub contract)
- [ ] Add validation and consistent error responses
- [ ] Add local run scripts/docs
- [ ] Commit and prepare PR

---

## Milestone 6 — UI/API Integration
Branch: `feat/m6-ui-api-integration`

**Goal**
- Connect frontend flows to backend endpoints with robust state handling.

**Acceptance Criteria**
- Crumb-feedback and formula-adjust flows work end-to-end.
- Loading/success/empty/error states are all visible and tested.
- Error payloads follow the agreed format.

- [ ] Connect crumb-feedback flow to `/api/crumb-feedback`
- [ ] Connect formula-adjust flow to `/api/formula-adjust`
- [ ] Add loading, success, empty, and error states
- [ ] Use consistent API error format:
  - [ ] `error.code`
  - [ ] `error.message`
  - [ ] optional `error.fieldErrors`
- [ ] Confirm contract alignment end-to-end
- [ ] Local review + revisions
- [ ] Commit and prepare PR

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
- [ ] Accessibility pass
- [ ] README final update
- [ ] Frontend deploy
- [ ] Backend deploy
- [ ] Demo script for product walkthrough
- [ ] Final release merge
