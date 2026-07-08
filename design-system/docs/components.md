# Component Library

30+ components across 15 files in `components/`. Every component is self‑contained,
theme‑agnostic and driven by classes / `data-*` attributes. Ink modifiers
(`.ink-blue`, `.green`, `.purple` …) carry semantic colour.

See `examples/gallery.html` (EN) and `examples/gallery.he.html` (Hebrew RTL) for every
component rendered live.

## Primitives — `primitives.css`
`.btn` (`.ghost`), `.chip`, `.tag`, `.eyebrow`, `.card` (`.fold-corner`), `.surface`,
`.badge` (`.ai .done .at-risk .on-track .blocked`), `.mark`, `.mono`.

## Annotations — `annotations.css`
Physical workshop affordances (workshop theme only): `.marker-circle`, `.sticky`
(`.green .blue .pink .purple`), `.pin`, `.tape`, `.fold-corner`, `.coffee-stain`,
`.annot`, `.board`, `.drop`. Non‑workshop themes suppress paper ornaments.

## Hero & titles — `hero.css`
`.hero`, `.hero__kicker`, `.hero__lead`, `.hero__meta`, `.slide-title` with animated
`.underline`.

## KPI — `kpi.css`
`.kpi` (`.green .orange .purple`), `.kpi__label`, `.kpi__value`, `.kpi__delta`
(`.up .down`). Animate values with `data-count` (see JS below). Progress: `.progress`
(`.p` variant) with inner `<span>` + `data-progress`.

## Executive summary — `summary.css`
`.exec-summary` grid, `.points` list, pairs with `.kpi` stack.

## Comparison — `comparison.css`
`.vs` with `.vs__col.now` / `.vs__col.future` and `.vs__arrow` (mirrors in RTL).

## Process & AI pipeline — `process.css`
`.flow` / `.flow__step` / `.flow__num`; `.pipeline` / `.pipeline__stage` with
`.badge.ai`.

## Roadmap & timeline — `roadmap.css`
`.roadmap` / `.roadmap__lane` / `.roadmap__bar` (`.p .g .o`); `.timeline` /
`.timeline__item` (`.done`) / `.timeline__date`.

## Journey — `journey.css`
`.journey` / `.journey__stage` / `.journey__line` / `.journey__pt` (`.mid .low`).

## Matrix — `matrix.css`
Risk / priority `.matrix` grid with `.cell` (`.hi .mid .lo`); `.swot` quadrants
(`.s .w .o .t`); `.decision` rows; axis labels `.lbl-x` / `.lbl-y`.

## Architecture & wireframe — `architecture.css`
`.arch` / `.arch__tier` / `.arch__box`; low‑fi `.wire` / `.wire__bar` / `.wire__block`;
`.ai-brain` with `.node` chips.

## Charts — `charts.css`
`.donut` (JS‑rendered from `data-donut`), `.bars` / `.bar` (`--h`), `.line-chart`,
`.chart-card`, `.legend`. Pure SVG + CSS, no chart library.

## Cards — `cards.css`
`.callout` (`.stop .warn .ai`), `.reco` / `.reco__rank`, `.action` (`.done`) with
`.box` / `.owner`, `.quote` blockquote, `.decision`.

## Dashboard — `dashboard.css`
Grid dashboards combining KPI, charts and tables. Tables: `.tbl` with `.tick` /
`.cross` cells and status `.badge`s.

## Navigation & footer — `navigation.css`
`.toolbar`, `.brand`, `.skip-link`, `.slide-footer`, `.page-num`; deck mode
`.deck-nav` / `.deck-nav__count`, `.deck-progress`.

---

## Layout helpers (`core/layout.css`)
`.container`, `.section`, `.section-head`, `.grid` (`.grid-2 .grid-3 .grid-4`),
`.cluster` (`.between`), `.stack`, `.slide` / `.slide__body` / `.deck` (deck mode),
`.cq` (container query context).

## JavaScript hooks
| Attribute | Module | Effect |
|-----------|--------|--------|
| `data-reveal="up\|in"` (+ `data-stagger`) | reveal.js | Scroll‑reveal, staggered children |
| `data-count` (`data-decimals/prefix/suffix`) | counters.js | Count‑up numbers |
| `data-progress="72"` | counters.js | Animate `.progress > span` width |
| `data-donut='[…]'` (`data-center`) | charts.js | Render SVG donut |
| `data-action="theme\|dir\|print\|set-theme"` | theme.js | Toolbar controls |
| `[data-deck]` + `initDeck()` | deck.js | Presentation navigation |

All animations collapse under `prefers-reduced-motion`.
