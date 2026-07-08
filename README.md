# ATELIER — Strategy Workshop Presentation Design System

An enterprise-grade, reusable component framework for building **executive
strategy-workshop presentations** that look like the notebook of a senior
consultant: paper texture, ink system, hand-drawn annotations, sticky notes —
handcrafted, never generic.

Built for decks across **AI · Digital Transformation · SAP · Power BI ·
Government · Insurance · Transportation · Banking · Healthcare · Cyber Security ·
Strategy · Executive Reports.**

> **Stack:** HTML · CSS · Vanilla JS. **No** Bootstrap, Tailwind, React, Vue or
> any UI library. SVG icons only. Zero dependencies (fonts optional via CDN).

---

## ✦ Highlights

- **Ink System** — semantic marker colours: black = titles, blue = ideas,
  red = problems, green = solutions, orange = risks, purple = AI.
- **Paper surfaces** — notebook, dot-grid, blueprint, whiteboard.
- **Physical annotations** — masking tape, push pins, paper clips, folded
  corners, marker circles, freehand arrows, highlighter, struck text,
  very-subtle coffee stains.
- **RTL / LTR** (Hebrew + English) via CSS logical properties.
- **Dark / Light** themes, remembered in `localStorage`.
- **Print / PDF ready** (`Export` button → `A4 landscape`).
- **Reveal-on-scroll**, count-up KPIs, stroke-draw SVG, `prefers-reduced-motion`
  respected.

## ✦ Structure

```
ds/
├── index.html                 # full component showcase & living documentation
├── css/
│   ├── tokens.css             # 01 design tokens (single source of truth)
│   ├── base.css               # 02 reset, typography, layout primitives
│   ├── paper.css              # 03 surfaces + physical annotations
│   ├── animations.css         # 04 reveal / draw / sticky-drop / hover
│   ├── components.css         # 05 the reusable component library
│   └── print.css              # 06 presentation / PDF export
├── js/
│   └── main.js                # theme, direction, reveal, count-up, donut charts
└── templates/
    └── executive-deck.html    # ready-to-fork 16:9 slide deck
```

## ✦ Quick start

```bash
# any static server works — no build step
python3 -m http.server 8080
# open http://localhost:8080/index.html
```

Or just open `index.html` in a browser.

## ✦ Component library

Headers · Hero · Executive Summary · KPI Cards · Progress · Current vs Future ·
Process Flow · AI Pipeline · Roadmap · Timeline · Milestones · Risk Matrix ·
Priority Matrix · SWOT · Decision Cards · Recommendation Cards · Action Items ·
Next Steps · Sticky Notes · Brainstorm Board · Callouts · Status Badges ·
Quote Blocks · Journey Map · Architecture Sketch · Wireframe Dashboard ·
Swimlanes · Value Stream · Comparison Table & Cards · AI Brain · Donut / Bar /
Line charts · Footer / Page numbers / Slide titles.

## ✦ Theming

Everything is driven by CSS custom properties in `css/tokens.css`.
`[data-theme="dark"]` re-maps the same tokens; components never hardcode values.
Toggle at runtime with `window.Atelier.toggleTheme()` / `toggleDir()`.

## ✦ Accessibility

Semantic HTML, visible focus rings, `prefers-reduced-motion`, and readable
contrast in both themes.

---

© Noam Hanimov — internal / confidential. For enterprise & air-gapped use the
CDN font link can be removed; system-font fallbacks are already defined.
