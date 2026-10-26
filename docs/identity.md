# Saavedra identity

The one place that says what a Saavedra app looks like. Every app imports this package; none keeps its own copy
of a colour, a font rule or a logo. Changes land here first, with a version, and the apps bump the version.

## Where it came from

The colours come from the family crest: a deep green and an antique gold on an off-white ground. The natillera
app's development guide (§6) fixed them as `#143A32` (green, primary), `#B69A56` (gold, accent), `#FBFBF9`
(off-white background) and `#1F2937` (text), with Cinzel for headings ("classic, heritage") and Inter for body
text and numbers ("legibility"). Version 0.1.0 keeps those four values exactly and adds what two apps learned
they also need: a dark theme, colour semantics for money and data, and rules for sizes.

## Colour roles

| Role | Light | Dark | Use |
|---|---|---|---|
| `brand-green` (ink) | `#143A32` | `#8FCBB8` | headings, logo on light, links, "this is ours" text |
| `brand-surface` | `#143A32` | `#143A32` | the navbar and hero bands; the same in both themes so the bar is always the deep green |
| `brand-gold` | `#B69A56` | `#D6BE7E` | accents on the green surface, active links, badges, the Promising verdict |
| `brand-gold-ink` | `#7F6A2E` | `#D6BE7E` | gold that is readable as small text on the light background (plain gold is not: 2.6:1) |
| `background` / `card` | `#FBFBF9` / `#FFFFFF` | `#121413` / `#1A1D1C` | page and card surfaces |
| `primary` | `#143A32` | `#2E6F5E` | buttons; the dark theme lightens it so off-white text still passes |
| `accent` | `#B69A56` | `#D6BE7E` | gold buttons and highlights, dark text on them |
| `muted-foreground` | `#5F6B7A` | `#A6B2AC` | explanations, labels; 4.5:1 or better on page and card |

Gold means **brand** or **Promising**. It never means "warning" or "risk": that is `warn`.

### Data semantics

Money and data have their own colours so that meaning is never confused with branding:

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `gain` / `loss` | `#15803D` / `#B91C1C` | `#3DCB84` / `#F26D6A` | positive and negative P&L, rising and falling candles |
| `neutral` | `#64748B` | `#94A3B8` | zero, unknown, baseline |
| `warn` | `#B45309` | `#E3A431` | attention: high-volatility regime, a breached band |
| `info` | `#0E7490` | `#4FB3D1` | explanations, informational chips |
| `series-1..8` | see tokens.json | | categorical chart series, in this order |
| `verdict-strong/promising/weak/none` | green / gold / amber / grey | | the honest verdict badges, the same everywhere |
| `verdict-*-foreground` | white or ink per verdict | ink | text on a verdict badge; white fails on amber and on every dark-theme verdict, so always pair the two |
| `gain-alt` / `loss-alt` | blue / orange | | the colour-blind-safe pair; `.palette-colorblind` on `<html>` swaps them in |

Rules: a gain and a loss never share a hue with a brand colour; correlation and other diverging scales run
blue–grey–orange, never green–gold; a sign (+/−) always accompanies a coloured number.

## Typography

- **Cinzel** for page titles and the logo wordmark only, 24 px and up. It is a display face and tires the eye in
  a page full of card titles.
- **Inter** for everything else, including card titles (semibold) and numbers (tabular figures).
- Floors: nothing below **12 px**; sentences meant to be read are **14 px** or more; muted explanations are
  `muted-foreground` at 14 px, not 12 px grey.
- Both faces are SIL Open Font License 1.1. Self-host them before a public launch (`fonts/README.md`).

## Logo

`logo/logo.svg` (viewBox 2240 × 1194) is the master. Paint it through a CSS mask (`react/` does this) so one file
takes any colour: gold on the green surface, green on light backgrounds, off-white on dark cards. PNG variants
are for places that cannot mask (e-mail, favicons, print): `logo-green.png`, `logo-gold.png`, `logo-black.png`.
Keep clear space of at least half the logo's height around it; never stretch, outline or add effects.

## Controls and spacing

- Icons: Lucide, one weight. Icon-only buttons have a 32 px hit area and an `aria-label`.
- Radius `0.5rem` for cards and inputs; buttons `md`.
- Focus is visible on every control: a 2 px `ring` (gold) with offset.
- Motion is short and optional (`prefers-reduced-motion` turns it off).

## Dark theme

Class `dark` or `data-theme="dark"` on `<html>`; `color-scheme` follows. Surfaces go deep green-charcoal rather
than neutral grey so the brand survives; the navbar keeps the same deep green. Ink colours lighten; the data
colours get brighter variants that pass 3:1 on cards. The contrast script (`npm test`) checks every text pair
at 4.5:1 and every graphic pair at 3:1 in both themes; a token change that fails does not ship.

## Versioning

Semantic versions, tagged in git. Apps pin a tag. A change to a token value is a minor bump; renaming or removing
a token is a major bump with a note in CHANGELOG.md about what the apps must change.
