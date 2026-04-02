# Menton Builders — Claude Code Brief: Homepage Redesign

## Executive Summary

This brief defines a focused homepage restructure for `Joementon/mentonbuilders.com`. The goal is to reduce the current 10-section single-page design to a tight 4-section layout: **Hero (photo slideshow) → Testimonial Carousel → Contact Form → Footer**. All supporting content (Services, Portfolio, About, Approach) moves to dedicated sub-pages accessible via the nav bar. The backend infrastructure — Resend email, Supabase inquiries table, and Vercel deployment — stays completely intact.

***

## Current State Audit

### Tech Stack (Do Not Change)

| Item | Value |
|---|---|
| Framework | Next.js 15.1, App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"` in globals.css) |
| Fonts | Playfair Display (serif headings) + Inter (sans body) via Google Fonts |
| Icons | Lucide React |
| Email | Resend SDK — sends to `aimee@mentonbuilders.com` on every submission |
| Database | Supabase — `inquiries` table, client in `lib/supabase.ts` |
| Deployment | Vercel, auto-deploy on `git push` |
| Package manager | Yarn Berry 4.x (use `yarn`, not `npm`) |

### File Map

```
mentonbuilders.com/
├── app/
│   ├── layout.tsx              # Root layout — Playfair + Inter fonts, metadata
│   ├── page.tsx                # Home — renders <MentonBuilders />
│   ├── globals.css             # Tailwind import + .animate-ticker keyframes
│   ├── gallery/page.tsx        # Full gallery: category/project views + lightbox
│   └── api/quote/route.ts      # POST handler: Supabase insert + Resend dual email
├── components/
│   └── MentonBuilders.tsx      # ALL current homepage sections (~53KB monolith)
├── lib/
│   └── supabase.ts             # Supabase client
├── public/
│   ├── hero-1.png              # Contemporary interior (575KB)
│   ├── hero-2.png              # Vaulted timber beam (1.5MB — needs optimization)
│   ├── hero-3.png              # Straw bale + venetian plaster (2.7MB — needs optimization)
│   ├── hero-4.png              # Rammed earth estate (2.8MB — needs optimization)
│   ├── menton_only_logo_transparent.png   # Nav logo (260KB)
│   ├── full_menton_logo_transparent.png   # Email header logo (430KB)
│   ├── logo-white.png          # White logo for dark backgrounds (25KB)
│   └── spain_commercial_ag.jpeg # Commercial/ag image (3.9MB — not yet used)
└── package.json
```

### Current Homepage Sections (MentonBuilders.tsx)

The entire site is a single `'use client'` component with the following 10 sections:

1. **Navigation** — fixed, scroll-aware (transparent → white/shadow), mobile hamburger, logo
2. **Hero** — `h-screen`, auto-rotating slideshow (hero-1/3/4.png, 5s interval), gradient overlay, headline + CTA
3. **Testimonials Ticker** — horizontal CSS marquee (`animate-ticker`, 35s), 4 testimonials
4. **Trust/Stats Bar** — dark teal (`bg-teal-900`), 4 stat blocks (50+ years, counties served, etc.)
5. **About** — split image + text + 5 feature bullets
6. **Services** — 3-tab UI (Residential / Renovations / Commercial & Ag), icons, bullet lists
7. **Portfolio** — 3-column card grid, 3 cards with Unsplash images, "View Full Portfolio" dead link
8. **Regional Focus** — centered pull-quote section (standalone section)
9. **Our Approach** — 4-step numbered process + regional locations list + CTA button
10. **Contact Form** — full intake form with 7 fields, validation, Supabase + Resend on submit
11. **Footer** — dark teal, 4-column, placeholder license number (`#XXXXXX`) and address (`PO Box 1234`)
12. **Floating Quick-Contact Widget** — fixed bottom-right `MessageCircle` button, inline mini-form

### Existing Nav Links

```typescript
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Approach', href: '#approach' },
  { name: 'Gallery', href: '/gallery' },
]
```

### Existing Testimonial Data

Four testimonials already exist in the file and should be reused in the new carousel:

```
1. Karen & David L. — Healdsburg — "Custom Estate Home"
2. Mark T. — Ukiah — "Full Home Renovation"
3. Sarah & James R. — Gualala — "Coastal New Construction"
4. Linda P. — Cloverdale — "Accessory Dwelling Unit"
```

### Known Issues (Fix During Refactor)

- `hero-2.png` (1.5MB), `hero-3.png` (2.7MB), `hero-4.png` (2.8MB) are unoptimized — add `priority` to first hero image only, use Next.js `<Image>` with proper `sizes`
- "View Full Portfolio" button in portfolio section: `href="#"` — dead link, should go to `/gallery`
- Footer license number: `#XXXXXX` — placeholder, needs real CA contractor license
- Footer address: `PO Box 1234` — placeholder
- `CLAUDE.md` says primary color is `emerald-900` but actual code uses `teal-*` throughout — `teal-*` is correct, ignore the CLAUDE.md discrepancy

***

## Redesign Specification

### Goal

Strip the homepage down to the single conversion funnel the user approved:

```
Hero (photo slideshow) → Testimonial Carousel → Contact Form → Footer
```

Everything else becomes its own route or is removed.

### New Nav Links

```typescript
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/gallery' },
  { name: 'Contact', href: '#contact' },
]
```

The "Get a Quote" CTA button in the nav should anchor-scroll to `#contact` on the homepage. Remove the "Approach" nav link — that content moves to `/about`.

***

## Section-by-Section Implementation

### Section 1: Hero (Keep, Simplify)

**Retain**: full-screen `h-screen`, photo slideshow (hero-1/3/4.png, 5s interval), gradient overlay, logo, headline, subhead, CTA buttons.

**Remove from Hero section**:
- The Stats Bar that currently lives directly below the hero
- Any inline "50+ years" stat chips inside the hero itself

**Headline copy** (keep as-is):
> "Builders Building What Matters"

**Subhead copy** (keep as-is):
> "Design-build rooted in experience. Serving Mendocino & Sonoma Counties for 50+ years."

**CTA buttons** (keep as-is):
- Primary: "Start Your Project" → `#contact`
- Secondary: "View Our Work" → `/gallery`

**Image performance fix**: Add `priority` prop to the first hero image (`hero-1.png`). For images 2 and 3, use standard `<Image>` without `priority`.

***

### Section 2: Testimonial Carousel (Replace Ticker with Carousel)

**Remove**: The horizontal marquee ticker (`animate-ticker` CSS) — it auto-scrolls and can't be read easily.

**Replace with**: A static carousel/slider with manual navigation (prev/next arrows + dot indicators). 

**Requirements**:
- Show one testimonial at a time, centered
- Auto-advance every 6 seconds
- Pause on hover
- Show prev/next arrow buttons
- Show dot indicators (4 dots for 4 testimonials)
- No external carousel library — implement with React `useState` + CSS transitions
- Background: `bg-stone-50` or `bg-white` (light, contrasts with dark hero above)
- Quote text: `font-serif` (Playfair Display), large, centered
- Attribution: name, location, project type below the quote
- Star row (5 stars, `text-teal-600`) above each quote

**Data**: Reuse the existing `testimonials` array from `MentonBuilders.tsx` — do not change the copy.

**Section padding**: `py-20 md:py-28`

***

### Section 3: Contact Form (Keep, Promote to Primary CTA)

**Keep entirely**: The existing contact form is production-ready — it has full validation, Supabase insert, and Resend dual-email (customer confirmation + internal alert to `aimee@mentonbuilders.com`).

**Changes**:
- Add `id="contact"` to the section wrapper so nav anchor links work
- Add a stronger section header: `"Start Your Project"` as H2 (`font-serif text-4xl`)
- Add a subhead: `"Tell us about what you're building. We'll follow up within 2 business days."`
- Remove the background pattern/decoration if any — keep background `bg-stone-50`
- Keep all 7 form fields: name, email, phone, location, project type (dropdown), budget (dropdown), details (textarea)
- Keep the existing validation logic and error display
- Keep the `formStatus` states: idle / sending / sent / error

**Remove the floating Quick-Contact Widget**: With the contact form now just one scroll below the hero, the floating widget becomes redundant. Remove it.

***

### Section 4: Footer (Keep, Fix Placeholders)

**Keep structure**: 4-column dark teal footer with logo, nav links, contact info, service area.

**Fix**:
- Replace `#XXXXXX` with real CA contractor license number (**ask Joe/Aimee for the number before deploying**)
- Replace `PO Box 1234` with real address
- Phone number `(707) 468-8814` is already correct
- Email `aimee@mentonbuilders.com` is already correct
- Update footer nav links to match new nav structure (remove `#about`, `#services`, `#approach` anchor links; replace with `/about`, `/services`, `/gallery`)

***

## Sections to Remove from Homepage

Delete these sections entirely from `MentonBuilders.tsx`. They will be re-added later as separate pages:

| Section | Disposition |
|---|---|
| Stats/Trust Bar | Move key stats into Hero subhead or a 2-line strip between Hero and Testimonials |
| About section | Move to new `/about` page |
| Services tabbed section | Move to new `/services` page |
| Portfolio card grid | Already exists at `/gallery` — just link there |
| Regional Focus quote | Fold into `/about` page |
| Our Approach 4-step | Fold into `/about` page |
| Floating Quick-Contact widget | Delete entirely |

***

## New Component Architecture

Break `MentonBuilders.tsx` (currently a ~53KB monolith) into separate components:

```
components/
├── Nav.tsx                  # Shared nav — used on homepage AND gallery page
├── Footer.tsx               # Shared footer — used on homepage AND gallery page
├── sections/
│   ├── HeroSection.tsx      # Photo slideshow hero
│   ├── TestimonialCarousel.tsx   # New carousel (replaces ticker)
│   └── ContactSection.tsx   # Contact form + Supabase/Resend logic
```

Update `app/gallery/page.tsx` to import the shared `<Nav>` and `<Footer>` components (currently gallery has its own inline nav copy — this creates duplication).

***

## Future Pages (Out of Scope for This Task — Note Only)

These pages do not need to be built now. Just make sure the nav links point to the correct future routes:

| Route | Content |
|---|---|
| `/about` | Company story, 50+ years history, team, Our Approach steps, Regional Focus |
| `/services` | Tabbed services: Residential / Renovations / Commercial & Ag |

For now, these routes can 404 or show a simple "Coming Soon" placeholder — the critical thing is the homepage is clean and live.

***

## Performance Notes

- `hero-3.png` and `hero-4.png` are ~2.7MB and ~2.8MB respectively — Next.js `<Image>` will auto-optimize to WebP on the fly via Vercel, but add explicit `sizes` attribute: `sizes="100vw"` for full-screen hero images
- `spain_commercial_ag.jpeg` (3.9MB) is in `/public` but not used anywhere yet — leave it for now
- The `animate-ticker` CSS in `globals.css` can be removed once the ticker section is deleted

***

## Environment Variables Required

The API route at `app/api/quote/route.ts` requires these env vars set in Vercel:

```
RESEND_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Do not touch these. They are already configured in the Vercel project dashboard.

***

## Summary Checklist for Claude Code

- [x] Refactor `MentonBuilders.tsx` → split into `Nav.tsx`, `Footer.tsx`, `HeroSection.tsx`, `TestimonialCarousel.tsx`, `ContactSection.tsx` *(done — commit 30e6950)*
- [x] New homepage (`app/page.tsx`) renders: `<Nav>` + `<HeroSection>` + `<TestimonialCarousel>` + `<ContactSection id="contact">` + `<Footer>` *(done — commit 30e6950)*
- [x] ~~Replace horizontal marquee ticker with carousel~~ → **Owner chose to keep the scrolling ticker** — ticker restored in `TestimonialCarousel.tsx` *(commit bf943c4)*
- [x] Update nav links (remove `#about`, `#services`, `#approach`; add `/about`, `/services`; keep `/gallery`) *(done — Nav.tsx)*
- [x] Remove floating Quick-Contact widget *(done — not in new components)*
- [x] Remove Stats Bar, About, Services, Portfolio grid, Regional Focus, and Approach sections from homepage *(done — those sections only remain in old MentonBuilders.tsx which is no longer imported by page.tsx)*
- [x] Add `id="contact"` to contact section wrapper *(done — ContactSection.tsx)*
- [x] Update gallery page (`app/gallery/page.tsx`) to use shared `<Nav>` and `<Footer>` components *(done — commit 30e6950)*
- [x] Add `priority` prop to first hero image only *(done — HeroSection.tsx)*
- [x] Add `sizes="100vw"` to all hero slideshow images *(done — HeroSection.tsx)*
- [x] ~~Remove `.animate-ticker` from `globals.css`~~ → **Ticker kept per owner request** — CSS restored *(commit bf943c4)*
- [x] Fix "View Full Portfolio" dead link → `/gallery` *(done — old monolith; new homepage links to /gallery in nav)*
- [x] Add top-down gradient scrim for nav contrast on all hero photos *(commit 123aa4c — not in original brief but needed)*
- [x] Create placeholder `/about` and `/services` pages (Coming Soon) *(done — commit 30e6950)*
- [ ] **Hold**: Footer license number + address (get real values from Joe/Aimee before final deploy)
- [ ] Run `yarn lint` before pushing — zero ESLint errors
- [ ] Test on mobile (375px) and desktop (1280px)

## Implementation Notes (for other Claude instances)

**Current architecture (as of 2026-04-02):**

The homepage NO LONGER uses `MentonBuilders.tsx`. That file still exists but is not imported anywhere. The new homepage is composed of:

```
app/page.tsx → Nav + HeroSection + TestimonialCarousel + ContactSection + Footer
```

New component files:
- `components/Nav.tsx` — shared nav, used on all pages (transparent mode on homepage)
- `components/Footer.tsx` — shared footer, used on all pages
- `components/sections/HeroSection.tsx` — hero slideshow with nav contrast scrim
- `components/sections/TestimonialCarousel.tsx` — horizontal scrolling ticker (NOT a prev/next carousel)
- `components/sections/ContactSection.tsx` — full contact form with validation + Supabase/Resend

**Do NOT edit `MentonBuilders.tsx` expecting changes to appear on the live site.** Edit the component files above instead.

Gallery page (`app/gallery/page.tsx`) also uses shared `Nav` and `Footer`.