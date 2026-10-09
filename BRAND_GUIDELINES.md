# Sovereign Brand Graphics Manifest

> **House mark:** the SCHOOL logo is the primary mark across the corporate site. The house moves as one — the flagship venture's mark is the house mark. Documented 9 October 2026, updated with the dual-register merge.

## 1. The house mark (primary)

- **Primary logo file:** `/assets/school-logo.jpeg` (1254×1254, the mark used across school.ditshego-ventures.co.za)
- **Nav / small rendering:** `/assets/nav-logo.webp` (72×72 webp, used in the site header at ~36px)
- **Social / OG:** `/assets/og-card.png` (1200×630, used for `og:image` and Twitter cards site-wide)
- **Archived marks:** the gold metallic sovereign seal (`assets/archive/mark.jpeg`, `assets/archive/mark.svg`) and the Face A `mark.jpeg` glyph are retained for reference but are not referenced from any page.

### Favicon set (generated from the school-logo.jpeg)
| File | Size | Use |
|---|---|---|
| `/favicon.ico` | 48×48 | Legacy favicon (`rel=icon`) |
| `/images/favicon/favicon-16.png` | 16×16 | `rel=icon` small |
| `/images/favicon/favicon-32.png` | 32×32 | `rel=icon` default |
| `/images/favicon/apple-touch-icon-180.png` | 180×180 | iOS home screen |
| `/images/favicon/icon-512.png` | 512×512 | Web app manifest (no longer `og:image`) |

Regenerate any of these from the source JPEG:
`convert assets/school-logo.jpeg -resize 32x32 images/favicon/favicon-32.png`

## 2. Dual-register theming

The site ships **two registers** behind one Netflix-style toggle (dark is the default):

- **Dark register (default, "command-centre"):** midnight onyx `#0a0a0a→#1a1a1a`, gold `#e8c15a`, Playfair/Archivo/JetBrains. This is the file as-live since the merge.
- **Light register ("editorial"):** warm ivory `#faf7f0→#e8dfd0`, antique gold `#b8862f` on ink `#14110f` — the Face A register.

Mechanics:
- Theme is set before first paint by an inline `data-theme` script in `<head>` (stored override > OS preference > dark default).
- `assets/house.js` runs the toggle button (`[data-theme-toggle]`) and syncs `theme-color` (`#0a0a0a` dark / `#faf7f0` light).
- **All colors are CSS variables.** Dark hexes live only in the `[data-theme="dark"]` token block; components consume tokens (`--gold`, `--ink-strong`, `--bg`, `--line`, …). Never hardcode a theme color in a component — add a token.

## 3. Fonts (self-hosted — no Google Fonts CDN)

The site no longer loads fonts from `fonts.googleapis.com`. All faces are self-hosted `woff2` in `/fonts/`:

| Family | Weights in repo | Use |
|---|---|---|
| Playfair Display | 500, 600, 700, 800 (normal + italic 500/600) | Display |
| Archivo | 300, 400, 500, 600, 700 | Sans / body |
| JetBrains Mono | 400, 500, 600 | Mono / command labels |

`Archivo Expanded` (Face A wordmark stack) is **not** present as woff2 — the font stack falls back to Archivo. Do not re-add Google Fonts `<link>` tags; extend the `@font-face` block in `styles.css` for new weights.

## 4. Usage table
- **Nav brand:** `assets/nav-logo.webp`, 36px, rounded corners via CSS (`border-radius`).
- **Hero seal:** `assets/school-logo.jpeg` at ~330px with drop-shadow glow.
- **Favicon / manifest:** the PNG set in `images/favicon/`. **og:image** → `/assets/og-card.png` (the sealed "house moves as one" card).
- **Alt text:** hero says `SCHOOL logo`; the brand image is decorative (`alt=""`).

## 5. Do not
- Do not reintroduce `images/logo.svg` / `favicon.svg` (retired gold seal, duplicate files).
- Do not reference `assets/ditshego-seal.svg` (retired).
- Do not link the 190KB JPEG directly as a favicon — use the PNG set.
- Do not add Google Fonts `<link>` preconnects back into any page head.
- Do not hardcode theme hexes in components — extend the token blocks instead.

## 6. Visual language
- **Dark:** deep radial gradients from `#1a1a1a` to `#0a0a0a`; 1px solid `#252525` borders; gold `#e8c15a` accents.
- **Light:** ivory `#faf7f0` paper, `#e8dfd0` hairlines, antique gold `#b8862f` on `#14110f`.
- **Acents:** `--gold`, `--ink-strong`, `--line`, `--bg` … defined once per register.

## 7. Site asset index
| Asset | Status |
|---|---|
| `assets/school-logo.jpeg` | Primary logo |
| `assets/nav-logo.webp` | Nav mark |
| `assets/og-card.png` | OG / social card |
| `assets/trading-heatwalls.png` | Cryptic SPHERE visual (venture-sphere.html) |
| `assets/v4ntag3.jpg` | V4NTAG3 visual (venture-v4ntag3.html) |
| `fonts/*.woff2` | Self-hosted font set (12 faces) |
| `images/economic-circuit-v3-overview.png` | Economic Circuit diorama (research.html) |
| `images/favicon/*` | Favicon/manifest set |
| `documents/economic-circuit-paper.{html,pdf}` | Open Work paper (research.html links both) |
| `assets/archive/*` | Retired marks + legacy lucide bundle (unreferenced) |
| `assets/house.js` | Shared reveal/tilt + theme toggle behaviour |
| `api/contact.js` | Serverless contact pipeline (POST /api/contact → Resend) |
| `styles.css` | Single stylesheet, dual-register |