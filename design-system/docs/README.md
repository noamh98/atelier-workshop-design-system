# Atelier — Enterprise Presentation Framework

Atelier is a dependency‑free design system for building **executive presentations**:
strategy workshops, AI & digital‑transformation decks, SAP / Power BI reviews,
government, insurance, banking, healthcare and cyber briefings.

Built with **HTML · CSS · Vanilla JS** only. No Bootstrap, Tailwind, React, Vue or
build step. It is designed to be composed automatically by an AI agent (e.g. inside
Microsoft Copilot Studio) as well as by hand.

```
Single token layer  →  4 themes  →  30+ components  →  Slides & galleries
```

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

That is the whole contract:

- One stylesheet — `atelier.css` (imports tokens → core → themes → icons → components → utilities).
- One script — `js/index.js` (ES module, self‑initialising).
- Three attributes on `<html>` — `data-theme`, `data-scheme`, `dir`.

## Folder structure

```
design-system/
├── atelier.css              Master bundle (single <link> entry point)
├── tokens/                  Design tokens — the single source of truth
│   ├── colors.css           Primitive palette + semantic aliases + dark remap
│   ├── typography.css       Font families, type scale, weights, leading
│   ├── spacing.css          Modular spacing scale + slide metrics
│   ├── radius.css  shadows.css  motion.css  z-index.css  borders.css  paper.css
├── core/                    reset.css · base.css · layout.css (grid, container, slide)
├── themes/                  One file per theme — remaps tokens only
│   ├── hand-drawn-workshop.css   (flagship, also :root default)
│   ├── glass-executive.css  scandinavian.css  microsoft-ai.css
├── components/              15 files, 30+ components (see components.md)
├── utilities/               animations.css · rtl.css · print.css · utilities.css
├── icons/                   icons.svg (sprite) · icons.css — thin sketch icons
├── js/                      ES modules: theme, reveal, counters, charts, deck, index
├── examples/                gallery.html · gallery.he.html · executive-deck.html
└── docs/                    You are here
```

## Documentation

| Doc | Contents |
|-----|----------|
| [tokens.md](tokens.md) | Every design token and how to override it |
| [components.md](components.md) | Every component, its markup and modifiers |
| [themes.md](themes.md) | The four themes and how to build your own |
| [ai-usage.md](ai-usage.md) | How an AI agent composes slides predictably |

## Principles

1. **Tokens are the only source of truth.** Components read *semantic* tokens
   (`--color-surface`, `--ink-blue`), never raw hex. Themes remap tokens; components
   never change.
2. **Theme = one attribute.** `data-theme` swaps the whole look. `data-scheme="dark"`
   is orthogonal. `dir="rtl"` flips direction via logical properties.
3. **RTL / Hebrew first‑class.** Layout uses logical properties; only directional
   visuals (arrows) mirror. See `examples/gallery.he.html`.
4. **Composable for AI.** Components are self‑contained, predictably named and driven
   by `data-*` attributes so they can be generated and concatenated safely.
5. **Zero dependencies, print‑ready.** Works from `file://`, degrades gracefully,
   and has a dedicated print / PDF stylesheet.

## Ink system

Semantic colours that carry meaning in every component:

| Ink | Meaning | Token |
|-----|---------|-------|
| Black | Titles / structure | `--ink-black` |
| Blue | Ideas / hypotheses | `--ink-blue` |
| Red | Problems / pain | `--ink-red` |
| Green | Solutions / wins | `--ink-green` |
| Orange | Risks / watch‑items | `--ink-orange` |
| Purple | Artificial Intelligence | `--ink-purple` |
