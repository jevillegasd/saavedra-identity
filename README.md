# @saavedra/identity

The Saavedra family identity, shared by every Saavedra app: colour tokens in light and dark, typography rules,
logos, a Tailwind preset and a React logo component. The rules and the reasoning are in
[docs/identity.md](docs/identity.md).

## Use it

```sh
# until the package is published: pack it and vendor the tarball in the app
npm pack ../saavedra/identity --pack-destination vendor
npm install ./vendor/saavedra-identity-0.1.0.tgz
# once a tag exists on GitHub
npm install github:jevillegasd/saavedra-identity#v0.1.0
```

```css
/* global stylesheet */
@import "@saavedra/identity/tokens.css";
```

```js
// tailwind.config.js
module.exports = { presets: [require("@saavedra/identity/tailwind-preset")], content: [...] };
```

```tsx
import { Logo } from "@saavedra/identity/react";
<Logo size={34} className="text-brand-gold" label="" />
```

Copy `logo/logo.svg` into the app's public folder (the component masks it from `/logo.svg` by default).

Dark theme: add `class="dark"` (or `data-theme="dark"`) to `<html>`. Colour-blind gain/loss pair: add
`palette-colorblind`.

## Maintain it

- `tokens.json` is the source of truth. After editing it run `node scripts/build-css.mjs` (regenerates
  `tokens.css`) and `npm test` (contrast check: 4.5:1 for text pairs, 3:1 for graphics, both themes).
- Bump the version in `package.json`, note the change in `CHANGELOG.md`, tag the commit.

## Licence

The logo, the crest-derived palette and the name are the Saavedra family's and are not licensed for use outside
Saavedra apps. The code in this repository (scripts, preset, React component) is MIT. Fonts are SIL OFL 1.1 and
are not vendored yet (see `fonts/README.md`).
