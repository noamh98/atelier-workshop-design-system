# AI Usage — Composing Slides Automatically

Atelier is built so an AI agent (e.g. a Microsoft Copilot Studio agent) can generate
executive decks by **emitting HTML fragments and concatenating them**. Every component
is predictable, self‑contained and named consistently.

## The generation contract

1. **Boilerplate once.** Emit the document shell with the stylesheet and script, plus
   the three state attributes:

   ```html
   <html lang="{lang}" dir="{ltr|rtl}" data-theme="{workshop|glass|scandi|ai}" data-scheme="light">
     <head><meta charset="utf-8"><link rel="stylesheet" href="design-system/atelier.css"></head>
     <body>{SLIDES}<script type="module" src="design-system/js/index.js"></script></body>
   </html>
   ```

2. **One section per idea.** Each slide/block is a `<section class="section container" data-reveal="up">`
   with a `.tag` eyebrow, a `.slide-title`, then one component.

3. **Pick a component by intent** (see the recipe table) and fill its slots.

4. **Concatenate.** Blocks never depend on siblings, so any order is valid.

## Intent → component recipe

| The user wants… | Emit |
|-----------------|------|
| One‑slide overview | `.exec-summary` + `.points` + `.kpi` stack |
| Headline metrics | `.grid.grid-4` of `.kpi` with `data-count` |
| Before/after | `.vs` with `.vs__col.now` / `.vs__col.future` |
| Steps in a process | `.flow` of `.flow__step` |
| AI/data pipeline | `.pipeline` of `.pipeline__stage` |
| Plan over quarters | `.roadmap` lanes / `.timeline` items |
| Experience over time | `.journey` stages |
| Risk / prioritisation | `.matrix` cells or `.swot` quadrants |
| System design | `.arch` tiers of `.arch__box` |
| Proportions / trend | `.donut` / `.bars` / `.line-chart` |
| Warnings / advice | `.callout` (`.stop .warn .ai`) / `.reco` |
| Decisions & tasks | `.decision` rows / `.action` items |
| Compare options | `.tbl` with `.tick` / `.cross` + status `.badge` |
| Workshop capture | `.board` of `.sticky` notes |

## Rules the agent must follow

- **Colour = meaning.** Apply inks by semantics: blue=idea, red=problem, green=solution,
  orange=risk, purple=AI, black=title. Do not colour decoratively.
- **Handwriting only on annotations.** Never put `--font-hand` on body text.
- **Numbers animate via data.** Output `data-count`, `data-decimals`, `data-prefix`,
  `data-suffix` instead of pre‑formatted values.
- **Charts via data attributes.** Donuts: `data-donut='[{"value":62,"color":"#7b5cd6"}]'`.
  Never inline chart SVG paths by hand.
- **Direction & language.** For Hebrew set `dir="rtl"` and `lang="he"` on `<html>`;
  layout mirrors automatically (logical properties). Use the Assistant font stack.
- **Icons from the sprite only.** `<svg class="icon"><use href="design-system/icons/icons.svg#i-NAME"/></svg>`.
  No emoji, no external icon packs.
- **Accessibility.** One `<h1>` per deck, sequential headings, `alt`/`aria-label` on
  meaningful graphics, keep `.skip-link`.

## Minimal generatable unit

```html
<section class="section container" data-reveal="up">
  <span class="tag">{index} · {kicker}</span>
  <h2 class="slide-title">{title}</h2>
  {ONE_COMPONENT}
</section>
```

If the agent can produce that unit for each point in an outline, it can produce a full,
on‑brand executive deck — in English or Hebrew, in any of the four themes — with no
framework‑specific reasoning.

## Deck vs. scroll output

- **Scroll/report:** stack `.section` blocks (see `examples/gallery.html`).
- **Presentation:** wrap each idea in `<section class="slide"><div class="slide__body">…</div></section>`,
  add `.deck-nav` + `.deck-progress`, and call `initDeck()` (see `examples/executive-deck.html`).
