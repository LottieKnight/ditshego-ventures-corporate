# ditshego-ventures-corporate

Corporate site for Ditshego Ventures (Pty) Ltd — live at https://ditshego-ventures.co.za.

## What this is

The merged face of two earlier site generations: the light "editorial" register (Face A) and the dark "command-centre" brand system (Face B, gone live Sep 2026). Every page ships both registers behind a **light/dark theme toggle** (dark is the default), with all colors driven by CSS variables.

**Scope of the merge (retained from both faces):**
- Self-hosted fonts (`fonts/*.woff2`) — no Google Fonts CDN
- Contact pipeline: `contact.html` form → `POST /api/contact` → Resend (`api/contact.js`, pure Node, no deps)
- Open Work / Research page (`research.html`) + Economic Circuit paper (`documents/economic-circuit-paper.html` and `.pdf`)
- POPIA privacy policy and Terms of Use (last updated 30 August 2026)
- PAIA manual, per-venture pages, JSON-LD organization schema, OG card (`assets/og-card.png`)

## Structure

- `index.html` — command centre
- `about.html` — house doctrine
- `research.html` — Open Work papers
- `contact.html` — form + direct line to the founder
- `privacy.html`, `terms.html`, `paia.html` — legal
- `venture-*.html` — the eight live coordinates
- `404.html` — coordinate lost
- `api/contact.js` — serverless enquiry function
- `styles.css` — single dual-register stylesheet
- `assets/house.js` — reveal/tilt + theme toggle

## Contact pipeline

The form posts JSON to `/api/contact`. Required Vercel env vars (set in the project → Settings → Environment Variables):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (`re_...`) |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `"Ditshego Ventures <noreply@ditshego-ventures.co.za>"` |
| `CONTACT_TO_EMAIL` | Destination inbox; defaults to `moloti@ditshego-ventures.co.za` |

## Theming

Dark is the default. A script in each `<head>` sets `data-theme` before first paint (stored choice > OS preference > dark). Toggle lives in the nav. See `BRAND_GUIDELINES.md` for the token system — never hardcode theme hexes in components.

## Deploy

Vercel project `ditshego-house` auto-deploys from `main`. The `api/` directory is picked up automatically as serverless functions.