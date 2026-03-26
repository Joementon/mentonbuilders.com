# mentonbuilders.com — Project Context


## What This Is
Public marketing and demo site for Menton Builders — a design-build construction firm in Mendocino & Sonoma Counties, Northern California. 50+ years of experience, residential/commercial/agricultural.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: Yarn Berry (v4.x) via Corepack
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif headings) + Inter (sans body) via Google Fonts
- **Deployment**: Vercel (auto-deploy from git push)
- **Domain**: mentonbuilders.com

## Project Structure
```
mentonbuilders.com/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page (imports MentonBuilders component)
│   └── globals.css         # Tailwind imports + custom font styles
├── components/
│   └── MentonBuilders.tsx  # Main site component (all sections)
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Design System
- **Colors**: emerald-900 (primary), stone-* (neutrals), white
- **Fonts**: Playfair Display for headings (serif), Inter for body (sans)
- **Style**: Minimal, professional, construction/architecture aesthetic
- **Images**: Unsplash stock photos (replace with real project photos later)

## Key Sections
1. Navigation (fixed, scroll-aware)
2. Hero (full-screen with gradient overlay)
3. Trust/Stats Bar (emerald dark background)
4. About (image + text + features)
5. Services (tabbed: residential, renovations, commercial/ag)
6. Portfolio/Case Studies (3-column grid)
7. Regional Focus (quote section)
8. Our Approach (4-step process + regional map)
9. Contact Form (intake form)
10. Footer

## Commands
- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn start` — start production server
- `yarn lint` — run ESLint

## Related
- Internal ops app: `../menton_app/menton-builders/`
- Ecosystem reference: `SAMUEL_HOLLEY_REPO_ECOSYSTEM.md`
