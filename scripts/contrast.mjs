// WCAG 2.x contrast check over tokens.json: text pairs need 4.5:1, graphics and large text 3:1.
// Run with `npm test`. Exits non-zero when a pair fails, printing every ratio so a change is reviewed by eye too.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, "..", "tokens.json"), "utf8"));

const hex = (h) => h.replace("#", "").match(/.{2}/g).map((x) => parseInt(x, 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

let failed = 0;
for (const [theme, t] of Object.entries(tokens.themes)) {
  for (const [group, min] of [["text", 4.5], ["graphics", 3]]) {
    for (const [fg, bg] of tokens.contrast_pairs[group]) {
      if (!(fg in t) || !(bg in t)) { console.log(`${theme} ${group}: unknown token ${fg}/${bg}`); failed++; continue; }
      const r = ratio(t[fg], t[bg]);
      const ok = r >= min;
      if (!ok) failed++;
      console.log(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(5)} ${group.padEnd(8)} ${fg.padEnd(22)} on ${bg.padEnd(16)} ${r.toFixed(2)}:1 (min ${min})`);
    }
  }
}
console.log(failed ? `\n${failed} pair(s) below the minimum` : "\nall pairs pass");
process.exit(failed ? 1 : 0);
