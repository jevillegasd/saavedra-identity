/**
 * Saavedra Tailwind preset. Use with `presets: [require("@saavedra/identity/tailwind-preset")]` and import
 * `@saavedra/identity/tokens.css` once in your global stylesheet. Dark mode is class-based: put `dark` (or
 * data-theme="dark") on <html>.
 *
 * Colour roles:
 *   brand-green / brand-gold ...... ink colours (text, icons); they lighten in the dark theme for contrast
 *   brand-surface ................. the deep green surface (navbar, hero bands); the same in both themes
 *   brand-gold-ink ................ gold that is readable as small text on light backgrounds
 *   gain / loss / neutral / warn / info ...... data semantics; never brand colours
 *   series-1..8 ................... categorical series for charts
 *   verdict-strong|promising|weak|none ....... the honest verdict badges
 *   chart-* ....................... chart surfaces
 */
const hsl = (name) => `hsl(var(--${name}) / <alpha-value>)`;
const v = (name) => `var(--${name})`;

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: { green: v("brand-green"), gold: v("brand-gold"), surface: v("brand-green-surface"), "gold-ink": v("brand-gold-ink") },
        app: v("color-bg-app"),
        main: v("color-text-main"),
        up: v("gain"),
        down: v("loss"),
        gain: v("gain"),
        loss: v("loss"),
        neutral: v("neutral"),
        warn: v("warn"),
        info: v("info"),
        series: { 1: v("series-1"), 2: v("series-2"), 3: v("series-3"), 4: v("series-4"), 5: v("series-5"), 6: v("series-6"), 7: v("series-7"), 8: v("series-8") },
        verdict: { strong: v("verdict-strong"), promising: v("verdict-promising"), weak: v("verdict-weak"), none: v("verdict-none") },
        chart: { bg: v("chart-bg"), grid: v("chart-grid"), axis: v("chart-axis"), crosshair: v("chart-crosshair") },
        border: hsl("border"),
        input: hsl("input"),
        ring: hsl("ring"),
        background: hsl("background"),
        foreground: hsl("foreground"),
        primary: { DEFAULT: hsl("primary"), foreground: hsl("primary-foreground") },
        secondary: { DEFAULT: hsl("secondary"), foreground: hsl("secondary-foreground") },
        accent: { DEFAULT: hsl("accent"), foreground: hsl("accent-foreground") },
        muted: { DEFAULT: hsl("muted"), foreground: hsl("muted-foreground") },
        destructive: { DEFAULT: hsl("destructive"), foreground: hsl("destructive-foreground") },
        card: { DEFAULT: hsl("card"), foreground: hsl("card-foreground") },
        popover: { DEFAULT: hsl("popover"), foreground: hsl("popover-foreground") },
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // the identity's floor: nothing below 12px; sentences meant to be read are 14px or more
        "2xs": ["0.75rem", { lineHeight: "1rem" }],
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      typography: () => ({
        saavedra: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "var(--brand-green)",
            "--tw-prose-links": "var(--brand-green)",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-quotes": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "var(--brand-green)",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",
            "--tw-prose-invert-body": "hsl(var(--foreground))",
            "--tw-prose-invert-headings": "var(--brand-green)",
            "h1, h2, h3": { fontFamily: "Cinzel, serif", fontWeight: "600" },
            h1: { fontSize: "1.75rem", marginBottom: "0.5em" },
            h2: { fontSize: "1.2rem", marginTop: "2em", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.25em" },
            h3: { fontSize: "1.02rem" },
            a: { textDecoration: "none", borderBottom: "1px solid var(--brand-gold)" },
            "a:hover": { color: "var(--brand-gold-ink)" },
            code: { backgroundColor: "hsl(var(--secondary))", padding: "0.1em 0.35em", borderRadius: "4px", fontWeight: "500" },
            "code::before, code::after": { content: "none" },
            table: { fontSize: "0.875rem", lineHeight: "1.4" },
            th: { color: "hsl(var(--muted-foreground))", fontWeight: "500" },
            "ul > li::marker": { color: "var(--brand-gold)" },
            strong: { fontWeight: "600" },
          },
        },
      }),
    },
  },
};
