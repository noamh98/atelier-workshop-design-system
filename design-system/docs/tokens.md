# Design Tokens

Tokens live in `tokens/` and are the **single source of truth**. Components read
*semantic* tokens only; themes remap those semantics. To restyle the whole system you
change tokens — never component files.

## How the layers relate

```
primitive  →  semantic  →  theme override  →  component
--blue-600     --ink-blue     [data-theme=…] remap     .callout .badge …
```

Primitives (raw palette) live in `colors.css`. Semantics alias them. Each theme file
re‑points the semantic tokens; dark mode (`data-scheme="dark"`) re‑points them again.

## Colour — `tokens/colors.css`

Semantic surface & text tokens (used by every component):

| Token | Purpose |
|-------|---------|
| `--color-bg` | Page background |
| `--color-surface` | Card / panel background |
| `--color-surface-sunken` | Insets, wells, hover fills |
| `--color-text` | Primary text |
| `--color-text-soft` | Secondary text |
| `--color-text-muted` | Tertiary / captions |
| `--color-text-invert` | Text on dark accents |
| `--color-line` | Hairline borders |
| `--color-line-strong` | Emphasised borders / axes |
| `--color-accent` | Theme accent |
| `--color-accent-quiet` | Accent tint (fills) |
| `--color-focus` | Focus ring |

Ink system (semantic meaning, stable across themes):

`--ink-black` `--ink-blue` `--ink-red` `--ink-green` `--ink-orange` `--ink-purple`

Use the helper classes `.ink-black … .ink-purple` to apply them to text.

## Typography — `tokens/typography.css`

- Families: `--font-sans` (Inter / Assistant for Hebrew), `--font-hand` (Caveat —
  **annotations only**), `--font-mono` (JetBrains Mono).
- Scale: `--fs-2xs … --fs-4xl`.
- Weights: `--fw-regular … --fw-black`.
- Leading: `--lh-tight … --lh-relaxed`.

> The handwritten font is restricted to sticky notes, callouts, marker circles and
> annotations. Never use it for body paragraphs.

## Spacing & slide — `tokens/spacing.css`

- Modular scale `--s-0 … --s-32` (used via utilities like `.mt-6`, `.gap-8`).
- Slide metrics: `--slide-w`, `--slide-h`, `--slide-pad` (drive deck mode / 16:9).

## Other token files

| File | Provides |
|------|----------|
| `radius.css` | `--radius-*`, `--radius-surface` |
| `shadows.css` | `--shadow-*`, `--elev-1…5`, `--shadow-paper` |
| `motion.css` | `--dur-*`, `--ease-*` (respects reduced‑motion) |
| `z-index.css` | Named stacking levels |
| `borders.css` | Border widths & sketch stroke styles |
| `paper.css` | Paper / dot‑grid / blueprint texture variables |

## Overriding tokens

Scope any override with a selector — no rebuild needed:

```css
/* brand accent for one deck */
:root{ --color-accent: #0a5; }

/* a single section on a darker well */
.section--sunken{ --color-surface: var(--color-surface-sunken); }
```
