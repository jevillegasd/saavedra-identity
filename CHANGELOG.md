# Changelog

## 0.1.1 — 2026-10-26

- New: `verdict-*-foreground`, the text colour on each verdict badge (white on strong/none in light, ink elsewhere),
  with contrast pairs; white text failed on amber in light and on every verdict colour in dark.

## 0.1.0 — 2026-10-26

First release, extracted from the trading app (`trading.saavedra.com.co`) and the natillera app.

- Light tokens identical to both apps' `:root` (brand green `#143A32`, gold `#B69A56`, off-white `#FBFBF9`,
  ink `#1F2937`, shadcn roles).
- New: a dark theme on deep green-charcoal surfaces; ink colours lighten, the navbar surface stays green.
- New: data semantics (`gain`, `loss`, `neutral`, `warn`, `info`), eight chart series, verdict colours, chart
  surfaces, a colour-blind-safe gain/loss pair.
- New: `brand-gold-ink`, a gold that passes 4.5:1 as small text on the light background.
- Tailwind preset with class-based dark mode; React `Logo`; contrast checker; identity rules.
