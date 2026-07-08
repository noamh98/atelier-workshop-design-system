# Themes

A theme is **one CSS file that remaps semantic tokens** — nothing else. The component
library is identical across all themes. Switch by changing a single attribute:

```html
<html data-theme="workshop">   <!-- flagship, default -->
<html data-theme="glass">
<html data-theme="scandi">
<html data-theme="ai">
```

At runtime use the toolbar buttons (`data-action="set-theme" data-theme="…"`) or the
JS API:

```js
import { setTheme, setScheme, setDir } from './js/index.js';
setTheme('glass');      // persisted to localStorage: atelier:prefs
setScheme('dark');      // orthogonal light/dark
setDir('rtl');          // logical-property mirroring
```

## The four themes

### Hand‑Drawn Strategy Workshop — `hand-drawn-workshop.css` (flagship, `:root` default)
Premium consulting notebook: paper texture, dot grid, marker highlights, sticky notes,
freehand arrows, folded corners, subtle coffee stains. Sketch stroke on SVGs.
Handwritten font on annotations only. The reference experience — active with no
`data-theme` attribute at all.

### Glass Executive — `glass-executive.css`
Frosted‑glass surfaces, soft elevation, restrained accent. Paper ornaments are
suppressed; sticky notes flatten into clean cards. For polished board‑level decks.

### Scandinavian Executive — `scandinavian.css`
Calm, high‑whitespace, muted palette, hairline borders, minimal shadow. Quiet and
typographic.

### Microsoft AI Premium — `microsoft-ai.css`
Fluent‑inspired: crisp neutrals, blue/purple accent, tighter radii, product‑grade
surfaces. Best for AI / Copilot narratives.

## Dark mode

`data-scheme="dark"` is independent of theme and works with all four. Each theme (and
`tokens/colors.css`) provides a dark remap of the semantic tokens.

## Building your own theme

1. Copy `themes/scandinavian.css` (the simplest) to `themes/my-theme.css`.
2. Under `[data-theme="my-theme"]` remap the semantic tokens — surfaces, text, lines,
   accent, and the six inks. **Do not** target component classes.
3. Add an `@import` for it in `atelier.css`.
4. Add a toolbar button: `<button data-action="set-theme" data-theme="my-theme">…</button>`.

Because components only read semantic tokens, your new theme instantly applies to all
30+ components with no further work.

## What themes may and may not do

| Allowed | Not allowed |
|---------|-------------|
| Remap `--color-*`, `--ink-*`, `--radius-*`, `--shadow-*` | Restyle component internals |
| Add a background texture on `body` / `.slide` | Change component markup contracts |
| Suppress ornaments (e.g. hide `.coffee-stain`) | Hard‑code hex inside components |
