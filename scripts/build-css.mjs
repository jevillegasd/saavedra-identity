// Generates tokens.css from tokens.json so the two never drift. Run after editing tokens.json: `node scripts/build-css.mjs`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

const hex = (h) => h.replace("#", "").match(/.{2}/g).map((x) => parseInt(x, 16) / 255);
/** "h s% l%" triplet, the shadcn convention, so Tailwind opacity modifiers (bg-primary/90) keep working. */
function hsl(h) {
  const [r, g, b] = hex(h);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    hue = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    hue *= 60;
  }
  return `${Math.round(hue)} ${Math.round(sat * 100)}% ${Math.round(l * 100)}%`;
}

const SHADCN = ["background", "foreground", "card", "card-foreground", "popover", "popover-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring"];

function block(theme) {
  const t = tokens.themes[theme];
  const lines = [];
  lines.push(`  /* shadcn/ui tokens as HSL triplets */`);
  for (const k of SHADCN) lines.push(`  --${k}: ${hsl(t[k])}; /* ${t[k]} */`);
  lines.push(`  /* brand, as hex: ink colours change with the theme, the surface does not */`);
  for (const k of ["brand-green", "brand-green-surface", "brand-gold", "brand-gold-ink"]) lines.push(`  --${k}: ${t[k]};`);
  lines.push(`  /* data semantics: never reuse brand colours for meaning */`);
  for (const k of ["gain", "loss", "neutral", "warn", "info", "gain-alt", "loss-alt"]) lines.push(`  --${k}: ${t[k]};`);
  for (let i = 1; i <= 8; i++) lines.push(`  --series-${i}: ${t[`series-${i}`]};`);
  for (const v of ["strong", "promising", "weak", "none"]) for (const k of [`verdict-${v}`, `verdict-${v}-foreground`]) lines.push(`  --${k}: ${t[k]};`);
  lines.push(`  /* charts */`);
  for (const k of ["chart-bg", "chart-grid", "chart-axis", "chart-crosshair", "chart-label-bg", "chart-label-fg"]) lines.push(`  --${k}: ${t[k]};`);
  return lines.join("\n");
}

const css = `/* Saavedra identity ${tokens.version}: generated from tokens.json by scripts/build-css.mjs. Do not edit by hand. */

:root {
  color-scheme: light;
  --font-heading: ${tokens.typography.heading};
  --font-body: ${tokens.typography.body};
  --radius: ${tokens.radius};
  /* legacy names kept for the first consumers */
  --color-bg-app: ${tokens.themes.light.background};
  --color-text-main: ${tokens.themes.light.foreground};
  --color-up: var(--gain);
  --color-down: var(--loss);
${block("light")}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  --color-bg-app: ${tokens.themes.dark.background};
  --color-text-main: ${tokens.themes.dark.foreground};
${block("dark")}
}

/* Colour-blind-safe gain/loss: opt in with .palette-colorblind on <html> */
.palette-colorblind {
  --gain: var(--gain-alt);
  --loss: var(--loss-alt);
  --verdict-strong: var(--gain-alt);
}
`;
writeFileSync(join(root, "tokens.css"), css);
console.log("tokens.css written");
