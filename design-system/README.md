# Delta Force — iFutur Design System

> B2B payments & payouts platform for mid-market businesses.

iFutur is a fintech product company building payments and payouts infrastructure for mid-market businesses. The brand voice is **confident, clear, and capable** — institutional enough to be trusted with money, modern enough to feel like software built in this decade.

## Brand at a glance

- **Wordmark:** lime-chartreuse "FUTUR" with a circular "i" mark
- **Primary color:** `#BBCB44` (lime / chartreuse)
- **Type:** Open Sans (Google Fonts)
- **Audience:** finance, ops, founders at growing companies (50–2000 employees)
- **Posture:** light-first product UI; dark hero/marketing surfaces that let the lime green sing

## Sources

The materials available to this build:

- **Logo** — one PNG (lime + gray arc, designed for dark backgrounds — 366×139, 77% transparent). The working lockups live in `assets/logo-on-dark.png` and a programmatically-derived `assets/logo-on-light.png`.
- **Brief** — answers from the questionnaire: B2B payments/payouts, mid-market tone, Open Sans, Web dashboard + Mobile app, slides included.

No codebase, Figma, or full brand guideline was provided. Everything else in this system is a **principled extrapolation** from the logo and brief, and should be reviewed and corrected by anyone with the real source of truth. Specific extrapolations are flagged with **⚠️ extrapolated** throughout.

---

## Nuxt App

The implementation-ready app now lives in `nuxt-app/`. It ports the original static React/Babel design-system browser to Nuxt 3 + Vue 3 while preserving the same navigation groups, UI kits, mock data, tokens, logo assets, and client-side auth flow.

Run it locally (from `design-system/nuxt-app/`):

```bash
npm install
npm run dev
```

Serves on **http://localhost:4000** (pinned in `package.json`'s `dev` script) — deliberately not 3000, which is already used by this boilerplate's Rails backend.

Build it for production:

```bash
npm run build
```

The root npm scripts delegate into `nuxt-app/` so preview runners start the Nuxt server instead of opening the old static `index.html`. Archie builds and runs the Nuxt production server from `.archie/app.yaml`, which prevents Vite dev-only module URLs from leaking into the external app.

Archie serves previews through `/api/p/<port>/`, while forwarding requests to the Nuxt server without that prefix. `.archie/app.yaml` sets `NUXT_APP_CDN_URL=/api/p/$PORT/` before building and serving, so Nuxt emits assets as `/api/p/<port>/_nuxt/...` without redirecting the app route base away from `/`.

The original static files remain in place as reference material and can still be opened directly.

---

## Content Fundamentals

iFutur's voice is **confident, clear, and capable**. The reader is a finance, ops, or founder-type at a growing company who manages money for a living — they want to be respected, not delighted. Write like you're a senior colleague explaining something useful, not a marketer.

### Tone

- **Confident, never breathless.** Don't oversell. "Settle payouts in minutes" beats "Lightning-fast settlements that revolutionize your treasury workflow."
- **Plain over jargon, but use the real names.** Say *payout, settlement, ACH return, reconciliation* — your reader knows these words. Avoid "money moves" type euphemisms.
- **Specific over vague.** "Payouts settle in 90 minutes for domestic ACH, T+1 for international" beats "Fast payouts."
- **Calm in errors.** "We couldn't reach your bank. Try again in a minute." Not "Oh no! Something went wrong 😟"

### Casing & grammar

- **Sentence case** for headings, button labels, navigation. (`Add recipient`, not `Add Recipient`.)
- **Title Case** only for proper nouns and product names (Treasury, Payouts API, Card Program).
- **Oxford comma yes**, em dashes welcome, semicolons sparingly.
- **"You"** addresses the customer. **"We"** is iFutur. Avoid "users."

### Numbers & money

- **Currency is CFA** (suffixed, not prefixed): **48.210 CFA** — never `$48,210` or `48210 XOF`.
- **`.` is the thousand separator** (French / West African convention): `1.240.000 CFA`, not `1,240,000`.
- **No decimal values** — CFA has no subunit in product UI. Round to the nearest whole franc everywhere (tables, headlines, totals).
- **Tabular figures** everywhere a column might form (tables, ledgers, stat cards).
- For very large numbers in marketing headlines, keep the expanded form (`1.240.000 CFA`) rather than M/K shorthand — keeps decimals out of the language entirely.
- Dates are **Mon DD, YYYY** in app (`Nov 12, 2026`); relative ("2 hours ago") in feeds only.

### Examples

| Don't | Do |
|---|---|
| 🚀 Supercharge your payouts! | Move money faster — and know exactly where it is. |
| Your transfer has been initiated successfully! 🎉 | Transfer started. Settles by Fri, Nov 14. |
| Oops! Looks like that didn't work 😅 | We couldn't reach Chase Bank. Retry, or contact support. |
| Manage all your users in one place | Add teammates and set role-based permissions. |
| Click here to learn more about our features | Read the Payouts API docs. |

### Emoji

**No.** Not in product UI, not in error states, not in success states. Icons do the work emoji would do, and the brand reads more credible without them. The one exception: customer-facing marketing email subject lines may use a single contextual emoji if the campaign genuinely warrants it (very rare).

---

## Visual Foundations

The visual system is built on a single tension: **lime brand as energy** vs **warm-cool neutrals as composure**. Most of the canvas is calm — bone-white surfaces, dark warm ink for type, hairline borders. Lime appears with intent: primary CTAs, the wordmark, a hover state on a key chart, a sparkline that matters.

### Colors

- **`--brand-lime` #BBCB44** is the only true brand color. It does primary CTAs, the wordmark, the focus ring (at 35% alpha), and selection. It is **never** a status color.
- **Status uses semantic tokens** (success #2F8F4F, warning #C2841A, danger #C8362D, info #2C6DB5). Each has solid/bg/border variants; always pair them.
- **Neutrals are warm** (slight yellow undertone) so they sit harmoniously next to lime. Pure cool greys (#888888) fight the wordmark and are avoided.
- **Dark surfaces** use `--brand-ink` #0E1110 — never #000000. Black flattens the lime; ink lets it glow.

### Type

- **Open Sans throughout.** Weights 400/500/600/700/800. We do not mix display + body families.
- **Display = Open Sans 800 with tight tracking** (`-0.025em`). Used at 48px+ for hero headlines.
- **Headlines** use 600–700 weight with slight negative tracking. Body is 400. Buttons & labels are 600.
- **Tabular numerals on by default** in all data-dense surfaces — proportional only in prose.
- Body sizes: 17 (lg) / 15 (default) / 13.5 (sm) / 12 (caption) / 11.5 ALL-CAPS (eyebrow with `0.12em` tracking).

### Spacing & layout

- 4px base scale. Canonical steps: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80.
- Card inner padding `--space-4`; card outer padding `--space-8`. Sections separated by `--space-12` (app) or `--space-20` (marketing).
- **Use flex/grid with `gap`** for any row of siblings — never margin chains.
- App content max-width 1280px; marketing hero max 1200px with 80px gutter.

### Borders, radii, cards

- **Hairline borders** (`--border-default` #DDDDD6, 1px). Borders carry most of the structural weight — shadows are secondary.
- **Radii:** inputs/buttons 10px (md). Cards 14px (lg). Modals 20px (xl). Pills only for chips/badges.
- **Cards = bone (#FAFAF8 or #FFF) + hairline border + xs/sm shadow.** Never card with shadow alone (looks floaty); never card with thick colored border. Never colored left-accent stripes.

### Shadows & elevation

- Layered (ambient + key), warm-tinted with `rgba(14,17,16,*)` — never pure black.
- Most surfaces are `xs` or `sm`. `md` for menus. `lg` for modals/toasts. `xl` for marketing hero cards only.
- **Inputs have an inset shadow** (`--shadow-inset`) for that Stripe-like depth feel.
- Focus ring is the lime at 35% alpha, 3px halo (`--shadow-focus`).

### Backgrounds

- **No gradient hero backgrounds**, no bluish-purple washes, no hand-drawn illustrations.
- Marketing dark hero = flat `--brand-ink` with a single subtle radial of `rgba(187,203,68,0.10)` behind the headline if needed.
- Imagery (when used) is **photographic, slightly desaturated, warm-leaning** — never stock-vector illustration. Cool tones desaturated to read alongside the lime.
- No repeating texture / pattern backgrounds in product. Allowed on marketing only as a single tasteful element (e.g. a grid of dots in `--neutral-100` at 40% opacity).

### Motion

- **Fast, restrained.** Default `--dur-base` 200ms with `--ease-out` (`cubic-bezier(0.22, 0.61, 0.36, 1)`).
- Hovers: 120ms; modals/drawers: 200–320ms; numerical counters animate over 600ms with `ease-out`.
- **No bounce on UI** (no `--ease-spring` on buttons, modals). Spring is reserved for moments of celebration — payment confirmation toast, onboarding milestone.
- **No fade-only transitions.** Anything appearing also moves 4–8px in y. Anything dismissing fades AND drops 4px.
- `prefers-reduced-motion: reduce` → animations collapse to opacity 0/1, duration 80ms.

### Hover, focus, press states

- **Hover (filled button):** background shifts 1 step darker on the brand ramp (lime → lime-600).
- **Hover (ghost / secondary):** background fades in `--neutral-50` (no border change).
- **Hover (link):** color shifts to lime-600 *and* underline color goes from 40%-alpha to full. Underline already always present.
- **Focus:** 3px lime halo at 35% alpha (`--shadow-focus`). Never just a thin outline.
- **Press / active:** background shifts another step (lime → lime-700) **and** a 1px down-translate (`translateY(1px)`). No scale shrink — feels gimmicky for a money product.

### Transparency & blur

- Used sparingly. Sticky table headers use a 90% white with 6px backdrop-blur. Modal overlays are `rgba(14,17,16,0.45)` flat — no blur (blur is expensive and signals consumer app, not finance).
- Glass / frosted effects are **forbidden in product surfaces**. Allowed on a hero card on marketing only.

---

## Iconography

⚠️ **No icon library was supplied with the brand assets.** iFutur uses **[Lucide](https://lucide.dev)** as the standard icon library — a clean, consistent 24×24 stroke set with `stroke-width: 2`, square caps, and rounded joins. This matches the geometric, capable feel of the wordmark without imposing a personality of its own.

### Usage rules

- **Lucide only.** No mixing of icon sets (no Heroicons + Lucide, no Material). Consistency &gt; coverage.
- **Stroke icons everywhere.** No filled icons in product surfaces — they read as "selected" or "active" states.
  - Exception: filled status dots (the small ● in badges) are filled; they're shapes, not icons.
- **24px is the standard size.** Inline with body text: 16px. In hero / marketing: 32–48px.
- **Color from text color, not absolute.** `<svg color="currentColor">` so icons darken with the type around them. Brand-lime fills are reserved for actively brand moments — never decorative.
- **No emoji as icons.** Not in nav, not in empty states, not in error messages. See [Content Fundamentals](#content-fundamentals).
- **No unicode glyphs as icons** (✓ ★ → etc.) — use the Lucide equivalent (`check`, `star`, `arrow-right`).

### Loading Lucide

In HTML artifacts and prototypes, use the CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
```

In production React: `npm install lucide-react` and import individual icons (tree-shaken).

### Common icons by surface

| Surface | Icons |
|---|---|
| Dashboard nav | `home`, `arrow-up-right` (payouts), `arrow-down-left` (collections), `wallet`, `users`, `settings`, `bell` |
| Transactions | `arrow-up-right`, `arrow-down-left`, `clock`, `check`, `x`, `more-horizontal` |
| Empty states | `inbox`, `search`, `file-text` (large, muted) |
| Money / value | `coins`, `banknote`, `trending-up`, `trending-down`, `pie-chart` |
| Banking | `building-2`, `landmark`, `credit-card`, `wallet` |

### Brand mark vs icon

The **circular "i" mark** on the wordmark is brand-only. Never extract it and use it as an icon. The favicon is the "i" mark cropped to a square; the app sidebar collapsed-state is just the "i" + ink background.

---

## Index

| File / folder | Purpose |
|---|---|
| `nuxt-app/` | **Primary app.** Nuxt 3 + Vue 3 port of the design-system browser and UI kits. |
| `index.html` | Original static React app — retained as a direct-open reference build. |
| `pages/` | Original page-level React components — `foundations.jsx`, `components.jsx`, `brand.jsx`, `web-ui.jsx`, `mobile-ui.jsx`. |
| `colors_and_type.css` | **Source of truth for tokens. Import this from anywhere.** |
| `README.md` | This file — brand context, content rules, visual foundations, iconography. |
| `SKILL.md` | Agent Skill manifest — drop into Claude Code's `.skills/`. |
| `assets/` | `logo-on-light.png`, `logo-on-dark.png` — the working logo lockups. |
| `fonts/` | Notes on self-hosting fonts (currently using Google Fonts CDN). |
| `ui_kits/web_app/` | Web app kit JSX (Dashboard / Payouts / PayoutDetail / Collections / Recipients / Team / Settings) + `styles.css`. Mounted as the **Web UI** page. |
| `ui_kits/mobile/` | Mobile kit JSX (`Screens*.jsx`, `components.jsx`) + `styles.css`. Mounted as the **Mobile UI** page. |
| `slides/` | Five standalone branded slide templates at 1280×720. Open `slides/index.html`. |

## Caveats — please review

- **Only one logo file was provided.** I derived a light-bg variant programmatically (inverted whites to ink, darkened the gray arc). Reads well, but is **not** the official light-bg lockup. A vector (SVG) source would be ideal.
- **Open Sans via Google Fonts CDN.** No licensed brand font files were supplied. If iFutur has a custom display face, swap `--font-display` and drop the files into `fonts/`.
- **Icon library: Lucide** — flagged substitution. If you have a proprietary icon set, copy it into `assets/icons/` and update Iconography.
- **Everything beyond the logo is calibrated extrapolation** — voice/tone, neutrals warmth, motion rules, exact semantic colors — chosen to feel right for a confident, mid-market B2B payments brand. Tell me which calls don't match the real iFutur and I'll re-tune.
- **No reference screens or decks were provided**, so UI kit screens and slide templates are plausible-but-invented compositions. They prove the components compose; they are not recreations.
