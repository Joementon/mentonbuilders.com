# Menton Builders — Site Architecture & Refactor Plan

> Prepared 2026-04-02. Analysis by Claude Sonnet 4.6 Thinking + Claude Opus 4.6.

---

## Landing Page Strategy: Short Scroll + Anchor Nav

For a regional contractor serving Mendocino/North Bay California, a **short-scroll landing page with anchor navigation** is the right answer — not a no-scroll tab-based layout, and not an endless scroll either.

### Why This Middle Path Wins

**Audience & Regional Context:**
Menton Builders serves homeowners and landowners in rural/semi-rural Mendocino, Sonoma, Napa, and Lake Counties — often 45-70 years old, viewing on both desktop and mobile, making a high-trust, high-cost ($500K-$3M+) decision.

- Construction/contractor websites convert better with a clear **one-page narrative flow** rather than tab-based navigation, because the hire decision requires trust-building across multiple signals (credibility, portfolio, story, contact) in sequence
- "Infinite scroll" is for discovery platforms (Instagram, news feeds) — not service businesses where the user has specific intent
- Tab-based navigation works for apps and complex tools but feels sterile for a family-run craft builder — it kills the narrative pacing

### Recommended Section Structure (6 sections, ~5-6 screens)

| # | Section | Purpose | Scroll Depth |
|---|---------|---------|-------------|
| 1 | **Hero** | Big image, tagline, phone + contact CTA above fold | Screen 1 (no scroll) |
| 2 | **About / Story** | Consolidate current Stats Bar + About into one section | ~1 screen |
| 3 | **Services** | What they build — tabbed UI (Residential, Renovations, Commercial & Ag) | ~1.5 screens |
| 4 | **Portfolio** | Photo grid / featured projects | ~1.5 screens |
| 5 | **Approach** | 4-step process, regional locations, CTA | ~1 screen |
| 6 | **Contact** | Phone, service area, intake form | ~1 screen |

### Key UX Principles for This Demographic

- **Hero CTA above the fold** — phone number and "Get In Touch" visible without any scrolling; many North Bay homeowners will call immediately
- **Sticky nav** — keep nav fixed so users can jump to any section without scrolling back up (already implemented)
- **No parallax or heavy scroll animations** — this audience prioritizes clarity and speed; subtle fade-in reveals are fine
- **Mobile-first** — significant portion of rural North Bay users browse on mobile, often on slower connections
- **Floating quick contact widget** — exactly right for this demographic; lets users reach out immediately without scrolling to the contact section

---

## Current Site Audit

The entire site lives in a single `components/MentonBuilders.tsx` file. The current section structure:

| Section | Anchor | Status |
|---------|--------|--------|
| Navigation | sticky, scroll-aware | Good — transparent to white on scroll, mobile hamburger |
| Hero | `<header>` (full-screen) | Good — auto-rotating images, teal gradient overlay |
| Testimonials Ticker | `#testimonials` | **Remove or absorb** — fold a testimonial quote near Contact instead |
| Trust / Stats Bar | (no anchor) | **Merge into About** — consolidate with About section |
| About | `#about` | Keep — but absorb stats bar content |
| Services Tabs | `#services` | Good — 3-tab UI works well |
| Portfolio Grid | `#portfolio` | Good — 3-column card grid |
| Regional Focus Quote | (no anchor) | **Remove** — fold regional copy into About |
| Our Approach | `#approach` | Good — 4-step process is valuable |
| Contact Form | `#contact` | Good — full intake form with Resend integration |
| Footer | — | Good — dark teal, 4-column |
| Floating Contact Widget | fixed bottom-right | Good — quick contact popup |

**Current: 10 sections. Target: 6 sections.** Remove 4 by consolidating/absorbing.

---

## Pre-Launch Issues to Fix

### Placeholder Content (must replace before going live)

- [ ] Portfolio images are all Unsplash stock photos — need real Menton project photos
- [ ] About section uses stock architecture photo — need actual Menton photo
- [ ] Footer license number shows `#XXXXXX` — needs real CA contractor license
- [ ] Footer PO Box is placeholder (`PO Box 1234`) — needs real address
- [ ] Hero images (`hero-1.png`, `hero-3.png`, `hero-4.png`) — verify these are real project photos
- [ ] Footer phone number `(707) 555-0199` — needs real number (email template already uses `(707) 468-8814`)

### Dead Links & Navigation

- [ ] "View Full Portfolio" link points to `href="#"` — needs to go to `/gallery`
- [ ] Verify `/gallery` route has real content built out
- [ ] Nav link for Gallery goes to `/gallery` (separate page) — confirm it works and has content

### Minor Code Issues

- [ ] Services tab icons use `bg-teal-50 rounded-full` pattern — consider refining to plain icon treatment
- [ ] Component is 1000+ lines in a single file — consider breaking into section components during refactor

---

## Refactor Plan

### Phase 1: Section Consolidation (structure changes)

1. **Remove Testimonials Ticker section** — move one testimonial quote to just above the Contact form as social proof
2. **Merge Stats Bar into About** — combine the 4 stat blocks (50+ Years, etc.) into the About section layout
3. **Remove Regional Focus Quote section** — fold the regional messaging into the About section copy
4. **Update nav links** — ensure anchors point to the 6 remaining sections
5. **Fix "View Full Portfolio" link** — point to `/gallery`

### Phase 2: Content Replacement (requires assets from Joe)

1. Replace all stock photography with real Menton project photos
2. Fill in real license number, address, phone number in footer
3. Update portfolio cards with real project data
4. Review and finalize testimonial quotes (confirm they're real or remove)

### Phase 3: Code Cleanup (optional, low priority)

1. Break `MentonBuilders.tsx` into section components (`Hero.tsx`, `Services.tsx`, etc.)
2. Move data arrays (testimonials, navLinks, heroImages) to a separate data file
3. Extract shared styles/patterns

---

## Decision Required

**Approve Phase 1 (section consolidation)?** This is the structural refactor — trimming from 10 sections to 6, merging content, fixing dead links. No visual redesign, just tightening the page flow.

Phase 2 depends on Joe providing real assets. Phase 3 is housekeeping that can happen anytime.
