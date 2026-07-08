<div align="center">

# Atelier

**A dependency‑free, AI‑ready design system for enterprise presentations.**

Strategy workshops · AI & digital transformation · SAP · Power BI · government ·
insurance · banking · healthcare · cyber · executive reports.

HTML · CSS · Vanilla JS — no Bootstrap, Tailwind, React, Vue, or build step.

</div>

---

## Why

Executive decks are usually rebuilt from scratch every time. Atelier turns them into a
**component system**: one token layer, four interchangeable themes, and 30+ composable
components that read like a senior consultant's workshop notebook — and that an AI agent
can assemble automatically.

## Features

- **One token layer → four themes.** Switch the entire look with a single
  `data-theme` attribute: *Hand‑Drawn Strategy Workshop* (flagship), *Glass Executive*,
  *Scandinavian Executive*, *Microsoft AI Premium*.
- **30+ components.** KPIs, executive summary, current‑vs‑future, process flows, AI
  pipelines, roadmaps, timelines, journey maps, risk/priority/SWOT matrices,
  architecture sketches, charts, decision & recommendation cards, sticky‑note boards,
  comparison tables, and more.
- **RTL / Hebrew first‑class.** Logical‑property layout; a full Hebrew showcase ships in
  `examples/gallery.he.html`.
- **Dark mode, print & PDF ready.** Orthogonal `data-scheme="dark"` and a dedicated
  print stylesheet.
- **Presentation mode.** Opt‑in deck navigation with keyboard shortcuts
  (`←/→/Space/Home/End/F/P`).
- **AI‑composable.** Predictable, self‑contained, `data-*`‑driven components — see
  [`design-system/docs/ai-usage.md`](design-system/docs/ai-usage.md).
- **Zero dependencies.** Runs from `file://`; SVG sketch icons only, no emoji.

## Quick start

```html
<!doctype html>
<html lang="en" dir="ltr" data-theme="workshop" data-scheme="light">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="design-system/atelier.css">
</head>
<body>
  <section class="section container" data-reveal="up">
    <span class="tag">01 · Summary</span>
    <h2 class="slide-title">Executive summary</h2>
    <div class="kpi green">
      <span class="kpi__label">Annual saving</span>
      <div class="kpi__value" data-count="11.4" data-decimals="1" data-prefix="$" data-suffix="M">$0M</div>
    </div>
  </section>
  <script type="module" src="design-system/js/index.js"></script>
</body>
</html>
```

## Examples

| File | What |
|------|------|
| [`design-system/examples/gallery.html`](design-system/examples/gallery.html) | Every component (English) |
| [`design-system/examples/gallery.he.html`](design-system/examples/gallery.he.html) | Every component (Hebrew, RTL) |
| [`design-system/examples/executive-deck.html`](design-system/examples/executive-deck.html) | Presentation / deck mode |

> Tip: open via a static server (`python3 -m http.server`) so ES modules and the icon
> sprite load — some browsers block them on `file://`.

## Documentation

- [Overview & folder structure](design-system/docs/README.md)
- [Design tokens](design-system/docs/tokens.md)
- [Components](design-system/docs/components.md)
- [Themes](design-system/docs/themes.md)
- [AI usage guide](design-system/docs/ai-usage.md)

## Project layout

```
design-system/
├── atelier.css          Single stylesheet entry point
├── tokens/              Source of truth (colors, type, spacing, motion, …)
├── core/                reset · base · layout (grid, container, slide)
├── themes/              4 themes — remap tokens only
├── components/          15 files, 30+ components
├── utilities/           animations · rtl · print · helpers
├── icons/               SVG sketch sprite
├── js/                  ES modules (theme, reveal, counters, charts, deck)
├── examples/            gallery.html · gallery.he.html · executive-deck.html
└── docs/                Full documentation
```

## License

MIT.
