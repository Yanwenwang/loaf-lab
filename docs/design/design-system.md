# LOAF LAB — DESIGN SYSTEM SPECIFICATION
# This file is the single source of truth for all visual styling.
# AI coding tools: follow these values exactly when building components.

# ============================================================================
# TECH STACK CONTEXT
# ============================================================================
# Framework: React (Vite + React Router)
# Styling: Tailwind CSS
# Fonts: Google Fonts (loaded via <link> in index.html)
# All custom values below must be added to tailwind.config.js

# ============================================================================
# ROUTE STRUCTURE
# ============================================================================
# /              → Landing page (hero, features preview, footer)
# /advisor       → AI Sourdough Advisor chat interface
# /calculator    → Hydration Calculator tool
# /gallery       → Bake Log photo gallery
# /about         → About page (not yet designed)

# ============================================================================
# TAILWIND CONFIG — tailwind.config.js
# ============================================================================

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream:        "#F5F0E8",
        "warm-white": "#FAF7F2",
        crust:        "#C4813A",
        "crust-dark": "#8B5A2B",
        char:         "#1C1A17",
        ash:          "#6B6560",
        flour:        "#EDE8DF",
        crumb:        "#E8C98A",
        accent:       "#D45F3E",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        mono:    ['"DM Mono"', "monospace"],
        sans:    ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

# ============================================================================
# GOOGLE FONTS — add to index.html <head>
# ============================================================================

```html
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

# ============================================================================
# FONT USAGE RULES
# ============================================================================
# Playfair Display (font-display): h1, h2, feature titles, calc title, calc output values, gallery overlay h4
# DM Mono (font-mono):             eyebrow labels, section labels, feature numbers, tags, ai-label, calc labels, calc values, footer text
# DM Sans (font-sans):             body text, paragraphs, buttons, inputs (this is the base body font)

# ============================================================================
# CUSTOM CSS — create as src/styles/custom.css
# ============================================================================
# These styles CANNOT be expressed with Tailwind utilities alone.
# Import this file in your main entry point: import "./styles/custom.css"

```css
/* ── Global reset ── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ── Global body style ── */
/* All text inherits font-weight: 300 from body.
   Do NOT add font-light to individual elements unless overriding.
   Playfair Display headings naturally render at 400 (their default).
   DM Mono labels naturally render at their loaded weights (300/400/500). */
body {
  background: #F5F0E8;
  color: #1C1A17;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
}

/* ── Eyebrow: left dash (used on Landing hero) ── */
.eyebrow::before {
  content: "";
  display: block;
  width: 24px;
  height: 1px;
  background: #C4813A;
}

/* ── Section label: trailing line (light bg variant) ── */
.section-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(196, 129, 58, 0.2);
  max-width: 200px;
}

/* ── Section label: trailing line (dark bg variant) ── */
.section-label-dark::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(232, 201, 138, 0.2);
  max-width: 200px;
}

/* ── Hero left: right border gradient ── */
.hero-left-border::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(196, 129, 58, 0.3), transparent);
}

/* ── Feature card: left accent bar on hover ── */
.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 0;
  background: #C4813A;
  transition: height 0.3s;
}
.feature-card:hover::before {
  height: 100%;
}

/* ── Section divider: gradient line ── */
.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(196, 129, 58, 0.3), transparent);
}

/* ── H1 responsive clamp (used on Landing hero) ── */
.heading-hero {
  font-size: clamp(44px, 5vw, 72px);
}

/* ── Range slider (used on Calculator page) ── */
.calc-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: rgba(196, 129, 58, 0.3);
  outline: none;
  margin: 8px 0;
}
.calc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #C4813A;
  cursor: pointer;
  border-radius: 50%;
}
.calc-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #C4813A;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

/* ── Loaf shape: hero decorative element ── */
.loaf-shape {
  width: 260px;
  height: 160px;
  background: linear-gradient(135deg, #E8C98A 0%, #C4813A 60%, #8B5A2B 100%);
  border-radius: 50% 50% 20% 20% / 60% 60% 10% 10%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.loaf-score {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%) rotate(-15deg);
  width: 120px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}
.loaf-score::before,
.loaf-score::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  left: 20px;
}
.loaf-score::before { top: -12px; }
.loaf-score::after  { top: 12px; }

/* ── Advisor: info panel right border gradient ── */
.advisor-info-border::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(196, 129, 58, 0.15), transparent);
}

/* ── Advisor: chat messages custom scrollbar ── */
.chat-messages-scroll::-webkit-scrollbar {
  width: 4px;
}
.chat-messages-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.chat-messages-scroll::-webkit-scrollbar-thumb {
  background: rgba(196, 129, 58, 0.2);
  border-radius: 4px;
}
.chat-messages-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(196, 129, 58, 0.4);
}

/* ── Advisor: message fade-up animation ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.chat-fade-up {
  animation: fadeUp 0.3s ease-out;
}

/* ── Advisor: typing indicator bounce ── */
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}
.typing-dot-1 { animation: typingBounce 1.2s infinite; }
.typing-dot-2 { animation: typingBounce 1.2s infinite 0.2s; }
.typing-dot-3 { animation: typingBounce 1.2s infinite 0.4s; }

/* ── Advisor: quick action item hover arrow ── */
.quick-action-item::before {
  content: "→";
  font-size: 11px;
  color: #C4813A;
  opacity: 0;
  transition: opacity 0.15s;
}
.quick-action-item:hover::before {
  opacity: 1;
}

/* ── Gallery overlay gradient ── */
.gallery-overlay-gradient {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

/* ── Hero background text ── */
.hero-bg-text {
  position: absolute;
  font-family: "Playfair Display", serif;
  font-size: 180px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.03);
  white-space: nowrap;
  user-select: none;
  letter-spacing: -5px;
}
```

# ============================================================================
# SHARED COMPONENTS (used across multiple pages)
# ============================================================================
# These components appear on every page via the app layout.

# ----------------------------------------------------------------------------
# Nav — renders on all pages
# File: src/components/Nav.jsx
# ----------------------------------------------------------------------------
Nav > wrapper:          "flex justify-between items-center py-5 px-12 border-b border-crust/20 bg-warm-white sticky top-0 z-[100]"
Nav > logo:             "font-display text-[22px] italic text-crust-dark tracking-tight"
Nav > logo-bold:        "not-italic font-bold text-char"
Nav > nav-list:         "list-none flex gap-9"
Nav > nav-link:         "no-underline text-[13px] tracking-wider uppercase text-ash transition-colors duration-200 hover:text-crust"
Nav > nav-link-active:  "no-underline text-[13px] tracking-wider uppercase text-crust"
# Logo text: "loaf" in italic crust-dark, "lab" in bold char
# Nav links: Advisor, Calculator, Gallery, About
# Use React Router <NavLink> for active state

# ----------------------------------------------------------------------------
# Footer — renders on all pages
# File: src/components/Footer.jsx
# ----------------------------------------------------------------------------
Footer > wrapper:       "bg-char border-t border-white/5 py-8 px-16 flex justify-between items-center"
Footer > logo:          "font-display text-[22px] italic text-crumb tracking-tight"
Footer > logo-bold:     "not-italic font-bold text-crumb"
Footer > text:          "font-mono text-[11px] text-cream/30 tracking-wide"
# Footer text: "Built with React · Claude API · RAG · Made by a baker who codes"

# ----------------------------------------------------------------------------
# SectionLabel — reusable label component
# File: src/components/SectionLabel.jsx
# Props: text (string), variant ("light" | "dark")
# ----------------------------------------------------------------------------
SectionLabel > light:   "section-label font-mono text-[10px] tracking-[0.25em] uppercase text-crust mb-10 flex items-center gap-3"
SectionLabel > dark:    "section-label-dark font-mono text-[10px] tracking-[0.25em] uppercase text-crumb mb-10 flex items-center gap-3"

# ----------------------------------------------------------------------------
# SectionDivider — thin gradient line between sections
# File: src/components/SectionDivider.jsx
# ----------------------------------------------------------------------------
SectionDivider > wrapper: "section-divider"

# ----------------------------------------------------------------------------
# Buttons — reusable button styles
# File: src/components/Button.jsx
# Props: variant ("primary" | "ghost"), children, onClick, etc.
# ----------------------------------------------------------------------------
Button > primary:       "bg-crust-dark text-cream border-0 py-3.5 px-8 font-sans text-sm tracking-wide cursor-pointer transition-colors duration-200 hover:bg-char"
Button > ghost:         "bg-transparent text-crust-dark border border-crust py-[13px] px-7 font-sans text-sm tracking-wide cursor-pointer transition-all duration-200 hover:bg-flour"

# ============================================================================
# PAGE: LANDING (/)
# ============================================================================
# File: src/pages/Landing.jsx
# Sections: Hero, SectionDivider, Features Preview
# This is a single scrollable marketing page.

# ----------------------------------------------------------------------------
# Hero — top of landing page
# ----------------------------------------------------------------------------
Hero > wrapper:         "grid grid-cols-2 min-h-[88vh] overflow-hidden"
Hero > left:            "py-20 px-16 flex flex-col justify-center relative hero-left-border"
Hero > eyebrow:         "eyebrow font-mono text-[11px] tracking-[0.2em] uppercase text-crust mb-6 flex items-center gap-2.5"
Hero > h1:              "heading-hero font-display leading-[1.1] text-char mb-6 tracking-tighter"
Hero > h1-em:           "italic text-crust"
Hero > subtitle:        "text-base leading-relaxed text-ash max-w-[420px] mb-12"
Hero > cta-row:         "flex gap-4 items-center"
Hero > right:           "bg-char relative flex items-center justify-center overflow-hidden"
Hero > loaf-container:  "w-[280px] h-[200px] relative flex items-center justify-center"
# Eyebrow text: "AI-powered sourdough advisor"
# H1 text: "Bake with <em>intention,</em> not guesswork."
# Subtitle: "A personal sourdough advisor trained on real baking knowledge — fresh milled flour, wild fermentation, and the craft behind every loaf."
# CTA buttons: "Ask the Advisor →" (primary, links to /advisor), "See the Gallery" (ghost, links to /gallery)
# Right side: dark panel with decorative loaf shape (custom CSS classes: loaf-shape, loaf-score) and hero-bg-text "crumb"

# ----------------------------------------------------------------------------
# Features Preview — below hero on landing page
# Shows 3 feature cards that link to their respective pages
# ----------------------------------------------------------------------------
FeaturesPreview > section:      "py-20 px-16 bg-warm-white"
FeaturesPreview > grid:         "grid grid-cols-3 gap-[2px] bg-crust/15"
FeaturesPreview > card:         "feature-card bg-warm-white py-12 px-10 relative overflow-hidden"
FeaturesPreview > card-number:  "font-mono text-[11px] text-crust mb-5 opacity-60"
FeaturesPreview > card-icon:    "text-[28px] mb-4"
FeaturesPreview > card-title:   "font-display text-[22px] text-char mb-3 leading-snug"
FeaturesPreview > card-desc:    "text-sm leading-relaxed text-ash"
# Card 1: number "01", icon 🌾, title "AI Sourdough Advisor", desc "Ask anything — fresh milled flour ratios, starter troubleshooting, fermentation timing. Answers grounded in real baking knowledge, not generic web content.", links to /advisor
# Card 2: number "02", icon ⚖️, title "Hydration Calculator", desc "Input your flour type, total dough weight, and desired hydration. Get exact gram measurements for water, starter, and salt — adjusted for whole wheat absorption.", links to /calculator
# Card 3: number "03", icon 📸, title "Crumb Analyzer", desc "Upload a photo of your crumb. Get AI feedback on open crumb structure, fermentation level, and what to adjust next time.", links to /gallery
# The grid uses a gap-as-border trick: parent has bg-crust/15 with gap-[2px], children have bg-warm-white
# Each card has a left accent bar that animates on hover (see custom CSS: .feature-card)

# ============================================================================
# PAGE: ADVISOR (/advisor)
# ============================================================================
# File: src/pages/Advisor.jsx
# Layout: two-column split — info panel left, chat UI right
# Behavior: page has TWO states — empty state (before first message) and
#           active conversation (after first message). The chat panel switches
#           between them. The input row is always visible at the bottom.

Advisor > wrapper:              "grid grid-cols-2 h-[calc(100vh-73px)]"

# --- Left: Info Panel ---
# No tags here — they moved to the empty state as starter prompts.
Advisor > info-panel:           "py-20 px-16 bg-char text-cream flex flex-col justify-center relative"
Advisor > info-h2:              "font-display text-[40px] leading-tight mb-5 tracking-tight"
Advisor > info-h2-em:           "text-crumb italic"
Advisor > info-body:            "text-[15px] leading-loose text-cream/65"
# H2 text: "Real answers from <em>real knowledge</em>"
# Body text: "Not a generic chatbot. The advisor is built on a curated knowledge base from years of baking — fresh milled whole wheat, starter hydration, fermentation timing, and practical next-bake adjustments."
# The info panel has a right border gradient (use custom CSS: add ::after pseudo with vertical gradient line on right edge)

# --- Right: Chat Panel (container) ---
# This is the outer container. It holds either the empty state OR the messages area, plus the input row.
Advisor > chat-panel:           "bg-flour flex flex-col h-full"

# --- Right: Empty State (shown before first message) ---
# Centered vertically in the chat panel. Disappears once user sends first message.
Advisor > empty-state:          "flex-1 flex flex-col items-center justify-center p-10 gap-6"
Advisor > empty-icon:           "text-[56px] opacity-30 leading-none"
Advisor > empty-heading:        "font-display text-[24px] text-char opacity-45 text-center"
Advisor > empty-sub:            "text-sm text-ash text-center max-w-[300px] leading-relaxed mb-2"
Advisor > starter-prompts:      "flex flex-wrap gap-2.5 justify-center max-w-[440px]"
Advisor > starter-prompt:       "font-mono text-[11px] py-2.5 px-4 bg-warm-white border border-crust/20 text-ash cursor-pointer tracking-[0.02em] transition-all duration-200 hover:border-crust hover:text-crust-dark hover:bg-white"
# Empty icon: 🌾
# Empty heading: "What are you baking?"
# Empty sub: "Ask anything about your sourdough — or pick a topic to get started."
# Starter prompts (clicking one sends the associated question to the chat):
#   "Gummy crumb"          → "My crumb is gummy near the base. What should I change?"
#   "Starter health"       → "How do I know if my starter is ready to bake with?"
#   "Fresh milled flour"   → "What hydration should I use for 30% fresh milled flour?"
#   "Oven spring"          → "My loaf has no ear and flat oven spring. What went wrong?"
#   "Bulk fermentation"    → "How long should bulk fermentation be at 76°F?"
#   "Scoring & shaping"    → "What's the best scoring pattern for a batard?"

# --- Right: Messages Area (shown after first message, replaces empty state) ---
# Scrollable container for chat bubbles. Grows upward as messages are added.
# Auto-scrolls to bottom on new messages.
Advisor > messages-area:        "flex-1 overflow-y-auto px-10 pt-8 pb-5 flex flex-col gap-4"
Advisor > bubble-user:          "max-w-[85%] py-3.5 px-[18px] text-sm leading-relaxed bg-crust-dark text-cream self-end rounded-sm rounded-br-none"
Advisor > bubble-ai:            "max-w-[85%] py-3.5 px-[18px] text-sm leading-relaxed bg-warm-white text-char self-start border-l-[3px] border-crust rounded-sm rounded-tl-none"
Advisor > ai-label:             "font-mono text-[9px] tracking-[0.15em] uppercase text-crust mb-1.5"
# AI label text: "Loaf Lab Advisor"
# New messages animate in with a subtle fade-up (translateY(8px) → 0, opacity 0 → 1, 0.3s ease-out)

# --- Right: Quick Actions Card (appears inline after an AI response when relevant) ---
Advisor > quick-actions:        "self-start max-w-[85%] bg-warm-white border border-crust/15 py-[18px] px-[22px] rounded-sm"
Advisor > quick-actions-label:  "font-mono text-[9px] tracking-[0.15em] uppercase text-crust mb-3"
Advisor > quick-actions-list:   "flex flex-col"
Advisor > quick-actions-item:   "text-[13px] text-char py-2 border-b border-crust/10 cursor-pointer flex items-center gap-2.5 transition-colors duration-150 hover:text-crust-dark last:border-b-0"
Advisor > quick-actions-note:   "font-mono text-[10px] text-ash mt-3 opacity-70 leading-relaxed"
# Quick Actions label: "Quick Actions"
# Each item shows a "→" arrow on hover (use ::before pseudo, opacity 0 → 1 on hover)
# Note text: "Advisory guidance only; adjust based on your flour, oven, and starter behavior."

# --- Right: Typing Indicator (shown while waiting for AI response) ---
Advisor > typing-indicator:     "self-start flex gap-1 py-3.5 px-[18px] bg-warm-white border-l-[3px] border-crust rounded-sm rounded-tl-none"
Advisor > typing-dot:           "w-1.5 h-1.5 bg-crust rounded-full opacity-40"
# Three dots with staggered bounce animation (0s, 0.2s, 0.4s delay, 1.2s duration)

# --- Right: Input Row (always pinned at bottom, visible in both states) ---
Advisor > input-row:            "flex px-10 pb-8 bg-flour flex-shrink-0"
Advisor > input-field:          "flex-1 py-4 px-5 bg-warm-white border border-crust/25 border-r-0 font-sans text-sm text-char outline-none transition-colors duration-200 focus:border-crust"
Advisor > input-button:         "py-4 px-[22px] bg-crust-dark text-cream border-0 cursor-pointer text-base transition-colors duration-200 hover:bg-char"
# Input placeholder: "Ask about your bake..."
# Send button text: "→"

# ============================================================================
# PAGE: CALCULATOR (/calculator)
# ============================================================================
# File: src/pages/Calculator.jsx
# Layout: section label on top, then two-column grid — description left, interactive widget right

Calculator > section:            "py-20 px-16 bg-cream min-h-[calc(100vh-73px)]"
# Section label: use SectionLabel component with text "Hydration Calculator", variant "light"
Calculator > grid:               "grid grid-cols-2 gap-12 items-start"

# --- Left: Description ---
# These values must match the original mockup CSS exactly.
# The original mockup does NOT set font-weight on the heading or body text.
# Both inherit font-weight: 300 from the body. Do NOT add font-normal or font-light.
# Playfair Display at 300 still looks heavier than DM Sans at 300 due to serif contrast.
Calculator > desc:               "font-display text-[28px] leading-[1.4] text-char pr-5"
Calculator > desc-em:            "italic text-crust"
Calculator > desc-body:          "font-sans text-[14px] leading-[1.7] text-ash mt-4 not-italic"
# Desc text: "Precise ratios for <em>every flour,</em> every bake."
# Body text: "Fresh milled whole wheat behaves differently than bread flour. This calculator accounts for flour type, absorption rates, and starter hydration — so your math is always right."
# IMPORTANT: Use exact pixel and line-height values, not Tailwind named sizes.
# text-[28px] not text-2xl. text-[14px] not text-sm. leading-[1.4] not leading-snug.

# --- Right: Widget ---
Calculator > widget:             "bg-warm-white border border-crust/20 p-10"
Calculator > widget-title:       "font-display text-[26px] mb-7 text-char"
Calculator > row:                "flex justify-between items-center py-3.5"
Calculator > row-label:          "text-[13px] text-ash tracking-tight"
Calculator > row-value:          "flex items-baseline"
Calculator > row-value-number:   "font-sans text-[18px] font-light text-char tracking-tight"
Calculator > row-value-unit:     "font-sans text-[11px] font-light text-ash ml-1"
Calculator > slider:             "calc-slider"
# Widget title: "Dough Calculator"
# Slider rows: "Total dough weight" (400–2000g), "Target hydration" (60–95%), "Fresh milled %" (0–100%)
# Slider row values use the same DM Sans light style as output numbers, with separated units:
#   <div className={row-value}>
#     <span className={row-value-number}>900</span>
#     <span className={row-value-unit}>g</span>
#   </div>
# This keeps the number typography consistent across sliders and output.
# Sliders use custom CSS class "calc-slider"

# --- Right: Output (below sliders, still inside the widget) ---
# Style: minimal with divider lines. No dark boxes.
# A subtle thin divider separates inputs from outputs (NOT bold, NOT crust-colored).
# Flour is large and prominent, Water/Salt are side by side below a thin divider.
# An effective hydration note sits at the bottom.
# Numbers use DM Sans light (300) in char. Units ("g", "%") are separate spans
# in DM Mono light (300) in ash, with a small left margin for breathing room.
# IMPORTANT: number and unit MUST be inline on the same line (use inline or flex row).
Calculator > output-wrapper:           "mt-6 pt-6 border-t border-crust/20"
Calculator > output-main:              "pb-5"
Calculator > output-label:             "font-mono text-[10px] tracking-[0.2em] uppercase text-crust mb-1"
Calculator > output-value:             "flex items-baseline"
Calculator > output-value-number:      "font-sans text-[44px] font-light text-char tracking-tight"
Calculator > output-value-unit:        "font-mono text-sm font-light text-ash ml-1.5"
Calculator > output-pair:              "grid grid-cols-2 border-t border-crust/20"
Calculator > output-pair-cell-left:    "py-4 pr-5 border-r border-crust/20"
Calculator > output-pair-cell-right:   "py-4 pl-5"
Calculator > output-pair-value:        "flex items-baseline"
Calculator > output-pair-number:       "font-sans text-[28px] font-light text-char tracking-tight"
Calculator > output-pair-unit:         "font-mono text-xs font-light text-ash ml-1"
Calculator > output-note:              "font-mono text-[10px] text-ash mt-4 pt-3 border-t border-crust/10 opacity-70"
# Structure for each output value:
#   <div className={output-value}>        ← flex items-baseline container
#     <span className={output-value-number}>506</span>
#     <span className={output-value-unit}>g</span>
#   </div>
# This ensures number and unit sit on the same baseline, never stacking vertically.
#
# Flour label: "FLOUR", number: "506", unit: "g"
# Water label: "WATER", number: "395", unit: "g"  (left cell)
# Salt label: "SALT", number: "10", unit: "g"     (right cell)
# Note text: "Effective hydration: 79.8% (+1.8% absorption adjustment)"
# IMPORTANT: The output-wrapper top border is thin (1px) and muted (crust/20),
# NOT the same weight or color as the sliders. It should feel like a quiet separator.

# ============================================================================
# PAGE: GALLERY (/gallery)
# ============================================================================
# File: src/pages/Gallery.jsx
# Layout: dark background. Section label + heading/description on top, then full-width asymmetric photo grid below.

Gallery > section:               "bg-char py-20 px-16 min-h-[calc(100vh-73px)]"

# --- Top: Heading area ---
Gallery > heading:               "font-display text-[40px] leading-tight text-cream mb-5 tracking-tight"
Gallery > heading-em:            "text-crumb italic"
Gallery > description:           "text-[15px] leading-loose text-cream/65 max-w-[520px] mb-12"
# Section label: use SectionLabel component with text "The Bake Log", variant "dark"
# Heading text: "Baked with <em>love</em> by Yanwen"
# Description: "A visual journal of my sourdough journey — flour blends, hydration experiments, and lessons learned from every bake."

# --- Grid ---
Gallery > grid:                  "grid grid-cols-[2fr_1fr_1fr] grid-rows-[280px_280px] gap-[3px]"
Gallery > item:                  "bg-[#2A2620] relative overflow-hidden group"
Gallery > item-featured:         "bg-[#2A2620] relative overflow-hidden group row-span-2"
Gallery > thumb:                 "w-full h-full flex items-center justify-center text-[40px] relative"
Gallery > thumb-featured:        "w-full h-full flex items-center justify-center text-[72px] relative"
Gallery > overlay:               "gallery-overlay-gradient absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
Gallery > overlay-title:         "font-display text-base text-cream mb-1"
Gallery > overlay-meta:          "font-mono text-[11px] text-crumb"
# Grid layout: first item spans 2 rows (featured), remaining items fill 2x2 on the right
# Grid rows are fixed at 280px each, making the featured item 560px + 3px gap = 563px tall
# Each item has a hover overlay with title + metadata
# Thumb backgrounds use linear-gradient placeholders until real photos are added
# The overlay uses custom CSS class "gallery-overlay-gradient"
# Example data:
#   Featured: "Hard Red Wheat, 75% Hydration" / "Feb 2025 · Open crumb · 18hr cold retard"
#   Item 2: "Einkorn Blend" / "Jan 2025 · 65% hydration"
#   Item 3: "100% Whole Wheat" / "Dec 2024 · Dense crumb"
#   Item 4: "Hard White + Spelt" / "Nov 2024 · 80% hydration"
#   Item 5: "Discard Focaccia" / "Nov 2024 · Olive & rosemary"

# ============================================================================
# RECURRING PATTERNS SUMMARY
# ============================================================================
# Monospace label:   font-mono text-[10px] tracking-[0.2em] uppercase text-crust
# Serif heading:     font-display text-char tracking-tight leading-tight
# Body copy:         font-sans text-sm text-ash leading-relaxed
# Italic emphasis:   italic text-crust (on <em> tags)
# Dark panel:        bg-char text-cream
# Section padding:   py-20 px-16
# Subtle border:     border-crust/20
# Gap-as-border:     parent bg-crust/15 + gap-[2px], children bg-warm-white

# ============================================================================
# COLORS QUICK REFERENCE
# ============================================================================
# cream        #F5F0E8    page background
# warm-white   #FAF7F2    card/nav backgrounds
# crust        #C4813A    primary accent, links, labels
# crust-dark   #8B5A2B    buttons, strong accent
# char         #1C1A17    dark backgrounds, primary text
# ash          #6B6560    secondary/muted text
# flour        #EDE8DF    chat UI background, ghost button hover
# crumb        #E8C98A    gold accent on dark backgrounds
# accent       #D45F3E    not used in production (was for mockup annotations only)
