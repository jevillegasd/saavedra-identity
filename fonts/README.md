# Fonts

Cinzel (headings) and Inter (body) are both SIL Open Font License 1.1 and free for commercial use.

## Today: Google Fonts

Vite apps add to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Next.js apps use `next/font/google` with `variable: "--font-cinzel"` and `variable: "--font-inter"`; the Tailwind
preset reads those variables first and falls back to the family names.

## Before a public launch: self-host

Loading from Google sends every visitor's IP address to Google (Ley 1581 in Colombia, GDPR elsewhere). The plan is
to vendor the two families here as WOFF2 with their OFL licence files and an `@font-face` stylesheet
(`fonts/fonts.css`), and to serve them from each app's own origin. Until then, this folder holds only this note.

Weights used: Cinzel 400–700 (variable), Inter 400, 500, 600, 700.
