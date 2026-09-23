# Fonts

This system uses **Open Sans** loaded from Google Fonts (CDN).

If you need self-hosted font files (e.g. offline / Claude Code use), download the families below and drop the `.woff2` files into this folder; then swap the `@import` line in `colors_and_type.css` for a local `@font-face` block.

- **Open Sans** — https://fonts.google.com/specimen/Open+Sans  (weights used: 400, 500, 600, 700, 800; italic 400)
- **JetBrains Mono** (for tabular / code) — https://fonts.google.com/specimen/JetBrains+Mono  (weights used: 400, 500)

⚠️ No custom font files were supplied. If iFutur has a licensed display face, swap `--font-display` in `colors_and_type.css`.
