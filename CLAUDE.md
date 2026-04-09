# mentonbuilders.com — Project Context


## What This Is
Public marketing and demo site for Menton Builders — a design-build construction firm in Mendocino & Sonoma Counties, Northern California. 50+ years of experience, residential/commercial/agricultural.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: Yarn Berry (v4.x) via Corepack
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif headings) + Inter (sans body) via Google Fonts
- **Email**: Resend SDK → `aimee@mentonbuilders.com`
- **Database**: Supabase (`inquiries` table)
- **Deployment**: Vercel (auto-deploy from git push)
- **Domain**: mentonbuilders.com

## CRITICAL: Current Architecture (updated 2026-04-02)

The homepage **does NOT use `MentonBuilders.tsx`**. That file is a legacy monolith kept for reference only.

**Homepage is built from modular components:**

```
app/page.tsx → Nav + HeroSection + TestimonialCarousel + ContactSection + Footer
```

### Active Component Files (edit THESE for live site changes):
- `components/Nav.tsx` — shared nav, used on ALL pages (transparent mode on homepage, solid on sub-pages)
- `components/Footer.tsx` — shared footer, used on ALL pages
- `components/sections/HeroSection.tsx` — hero slideshow (hero-1/3/4.png) + gradient overlays + nav contrast scrim
- `components/sections/TestimonialCarousel.tsx` — horizontal auto-scrolling ticker (CSS animation)
- `components/sections/ContactSection.tsx` — full intake form with validation, Supabase insert, Resend dual-email

### DO NOT edit `components/MentonBuilders.tsx` expecting changes on the live site.

## Project Structure
```
mentonbuilders.com/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Homepage (4 sections: Hero → Ticker → Contact → Footer)
│   ├── globals.css             # Tailwind imports + animate-ticker keyframes
│   ├── about/page.tsx          # Coming Soon placeholder
│   ├── services/page.tsx       # Coming Soon placeholder
│   ├── gallery/page.tsx        # Full gallery: category/project views + lightbox
│   ├── upload/page.tsx         # Photo upload
│   └── api/quote/route.ts     # POST handler: Supabase insert + Resend dual email
├── components/
│   ├── Nav.tsx                 # Shared nav (transparent/solid modes)
│   ├── Footer.tsx              # Shared footer
│   ├── MentonBuilders.tsx      # LEGACY — not used on live site, kept for reference
│   └── sections/
│       ├── HeroSection.tsx     # Photo slideshow hero
│       ├── TestimonialCarousel.tsx  # Horizontal scrolling ticker
│       └── ContactSection.tsx  # Contact form + Supabase/Resend
├── lib/
│   └── supabase.ts             # Supabase client
├── public/                     # Static assets (hero photos, logos)
└── package.json
```

## Design System
- **Colors**: teal-* (primary), stone-* (neutrals), white
- **Fonts**: Playfair Display for headings (serif), Inter for body (sans)
- **Style**: Minimal, professional, construction/architecture aesthetic

## Nav Links
```typescript
{ name: 'About', href: '/about' }
{ name: 'Services', href: '/services' }
{ name: 'Portfolio', href: '/gallery' }
{ name: 'Contact', href: '#contact' }
// "Get a Quote" CTA → #contact
```

## Key References
- `HOMEPAGE_REDESIGN_BRIEF.md` — full implementation brief with checklist status
- `SITE_REFACTOR_PLAN.md` — earlier analysis (superseded by HOMEPAGE_REDESIGN_BRIEF)

## Placeholders (need real values from Joe/Aimee)
- Footer license number: `#XXXXXX` — needs real CA contractor license
- Footer address: `PO Box 1234` — needs real address
- Portfolio images: stock photos, need real Menton project photos

## Commands
- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn start` — start production server
- `yarn lint` — run ESLint

## App Building Dashboard
- **Route**: `/app-building-dashboard`
- **Purpose**: Internal review portal for app development deliverables
- **Auth**: Client-side password gate (case-insensitive)
- **NOT part of the public site** — standalone page, no Nav/Footer
- **Data**: Hardcoded session data in the component — add new sessions by pushing to the array
- **Desktop only**: Shows warning on mobile

## Related
- Internal ops app: `../menton_app/menton-builders/`
- Ecosystem reference: `SAMUEL_HOLLEY_REPO_ECOSYSTEM.md`
