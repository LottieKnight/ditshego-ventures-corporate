# Sovereign Brand Graphics Manifest

> **House mark:** the SCHOOL logo is the primary mark across the corporate site. The house moves as one — the flagship venture's mark is the house mark. Documented 9 October 2026.

## 1. The house mark (primary)

- **Primary logo file:** `/assets/school-logo.jpeg` (1254×1254, the mark used across school.ditshego-ventures.co.za)
- **Nav / small rendering:** `/assets/nav-logo.webp` (72×72 webp, used in the site header at ~36px)
- **Decision note:** on 9 October 2026 the corporate site adopted the SCHOOL logo in place of the gold metallic sovereign seal. The seal (`assets/ditshego-seal.svg`) was retired; it remains in git history for reference.

### Favicon set (generated from the school-logo.jpeg)
| File | Size | Use |
|---|---|---|
| `/favicon.ico` | 48×48 | Legacy favicon (`rel=icon`) |
| `/images/favicon/favicon-16.png` | 16×16 | `rel=icon` small |
| `/images/favicon/favicon-32.png` | 32×32 | `rel=icon` default |
| `/images/favicon/apple-touch-icon-180.png` | 180×180 | iOS home screen |
| `/images/favicon/icon-512.png` | 512×512 | Web app manifest + `og:image` |

Regenerate any of these from the source JPEG:
`convert assets/school-logo.jpeg -resize 32x32 images/favicon/favicon-32.png`

## 2. Usage table
- **Nav brand:** `assets/nav-logo.webp`, 36px, rounded corners via CSS (`border-radius`).
- **Hero seal:** `assets/school-logo.jpeg` at ~330px with drop-shadow glow.
- **Favicon / manifest / og:image:** the PNG set in `images/favicon/`.
- **Alt text:** hero says `SCHOOL logo`; the brand image is decorative (`alt=""`).

## 3. Do not
- Do not reintroduce `images/logo.svg` / `favicon.svg` (retired gold seal, duplicate files).
- Do not reference `assets/ditshego-seal.svg` (retired).
- Do not link the 190KB JPEG directly as a favicon — use the PNG set.

## 4. Visual language
- **Backgrounds:** deep radial gradients from `#1a1a1a` to `#0a0a0a`.
- **Borders:** 1px solid `#333` with gold-accented hover states (`#e8c15a`).
- **Accents:** gold `#e8c15a`; onyx `#0a0a0a`.
- **Fonts:** Playfair Display (display), Archivo (sans), Archivo Expanded (wordmark), JetBrains Mono (mono) — loaded via `<link>` preconnect in each page head.

## 5. Site asset index
| Asset | Status |
|---|---|
| `assets/school-logo.jpeg` | Primary logo |
| `assets/nav-logo.webp` | Nav mark |
| `images/favicon/*` | Favicon/manifest set |
| `assets/house.js` | Shared reveal/tilt behaviour |
| `styles.css` | Single stylesheet (dark command-centre register + inner pages) |