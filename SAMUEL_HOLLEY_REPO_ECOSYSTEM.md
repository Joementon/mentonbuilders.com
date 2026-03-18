# Samuel Holley (samuelmholley1) — Repo Ecosystem & Tech Stack Reference

> **Purpose:** This document maps Samuel Holley's entire GitHub repo ecosystem so that when we need new features, we know exactly where to look, what to duplicate, and what foundation to build on. We never start from scratch.
>
> **AI Consultant:** Samuel Holley — Mendo AI Consulting
> **GitHub:** github.com/samuelmholley1
> **Total Repos:** 37

---

## Core Tech Stack (Default for New Projects)

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 14–16 (App Router) | 34 of 37 repos use Next.js |
| **Language** | TypeScript | Universal across all web apps |
| **Styling** | Tailwind CSS 3.4–4 | Every web app uses Tailwind |
| **Package Manager** | Yarn Berry (v4.x) | Most repos; some use npm |
| **Deployment** | Vercel | Universal deployment target |
| **Testing** | Playwright (E2E) | Standard across most apps |
| **Email** | Nodemailer | 10+ repos use this |
| **PDF/Image Export** | jsPDF, pdf-lib, html2canvas, html-to-image | Heavy pattern across 10+ repos |
| **Validation** | Zod | Standard schema validation |
| **State Management** | Zustand | Used in apps needing client state |
| **Icons** | Lucide React, Heroicons | Standard icon libraries |
| **Git Hooks** | Husky | On production-grade repos |

---

## Database & Backend Patterns

| Backend | Repos Using It | Best Reference Repo |
|---------|---------------|---------------------|
| **Airtable** | tickets, admin, senior_center_timesheets, soulcultivationnow, ticket_numberer, memberships, ethan-work-logs, gather-kitchen-nutrition-labels, signups.ukiahumc.org, livestream.ukiahumc.org | `admin.ukiahseniorcenter.org` (18 tables, most complex) |
| **Supabase** | HolleyPfotzerLifeCommand, HolleyPfotzerLifeCommand_Monorepo, Life-Command-Rebuild | `Life-Command-Rebuild` (production, RLS, clean architecture) |
| **Firebase/Firestore** | Holley-Pfotzer-Command-Center | `Holley-Pfotzer-Command-Center` |
| **Google Sheets API** | samuelholley.com, mendoaiconsulting.com, affairtoremember.ukiahseniorcenter.org | `affairtoremember.ukiahseniorcenter.org` |
| **Contentful CMS** | samuelholley.com, mendoaiconsulting.com, reclaim-diagnostic-app | `samuelholley.com` |
| **Offline-First (Dexie/IndexedDB)** | senior_center_timesheets, ethan-work-logs | `senior_center_timesheets` (sync queue, exponential backoff) |
| **No Backend (Static)** | Marketing sites, donate portal, bulletin | Various |

---

## Payment & Commerce Patterns

| Provider | Repos | Best Reference |
|----------|-------|---------------|
| **Stripe** | samuelholley.com, mendoaiconsulting.com, spreading-light | `samuelholley.com` (full react-stripe-js + server SDK) |
| **Zeffy** | tickets, memberships, donate.ukiahseniorcenter.org | `donate.ukiahseniorcenter.org` (cleanest embed pattern) |
| **Shopify CSV** | josie-shopify-csv-normalizer | `josie-shopify-csv-normalizer` (CSV normalization pipeline) |
| **PayPal** | donate.ukiahseniorcenter.org | Fallback via PayPal.me link |

---

## Repo-by-Repo Reference

### Senior Center Ecosystem (Ukiah Senior Center)

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **admin.ukiahseniorcenter.org** | Staff admin dashboard — Airtable CRUD, QuickBooks, reports | Next.js 15, Auth0, Radix UI, Recharts, QuickBooks OAuth2, cmdk palette | You need an admin dashboard with Airtable, auth, reporting, or accounting integration |
| **tickets.ukiahseniorcenter.org** | Event ticketing + meal program + See's Candy fundraiser | Next.js 15, Airtable (18 tables), Zeffy, Nodemailer | You need event ticketing, inventory tracking, or Zeffy integration |
| **memberships.ukiahseniorcenter.org** | Membership portal — signups, staff search, mailing labels | Next.js 15, Airtable, Zeffy, xlsx export | You need membership management or mailing label generation |
| **donate.ukiahseniorcenter.org** | Donation page | Next.js 15, Zeffy embed, PayPal fallback | You need a simple donation/payment page |
| **affairtoremember.ukiahseniorcenter.org** | Annual fundraiser — auction donations + table sponsorships | Next.js 16, Google Sheets API, QR codes, Puppeteer PDF | You need form submissions to Google Sheets or QR code generation |
| **senior_center_timesheets** | Employee time clock — offline-first with Airtable sync | Next.js 14, Dexie.js, Zustand, Airtable, FLSA rounding | You need offline-first time tracking or PWA with sync queue |

### Church Ecosystem (Ukiah UMC)

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **bulletin.ukiahumc.org** | Interactive mobile-first church bulletin | Next.js 15, JSON-driven content, scroll-spy, dark mode, print CSS | You need a mobile-first content display with print optimization |
| **signups.ukiahumc.org** | Liturgist volunteer signup calendar | Next.js 16, Airtable, pinned calendar UI | You need volunteer scheduling or calendar-based signups |
| **livestream.ukiahumc.org** | YouTube livestream with time-gated prayer comments | Next.js 15, Airtable, YouTube embed, date-fns-tz | You need livestream embedding with timed interactive features |
| **bewell.ukiahumc.org** | Be Well Center adult day memory care site + PDF flyers | Next.js 15, jsPDF, pdf-lib, dom-to-image-more | You need PDF/flyer generation from web content |
| **mendolaborcoop.ukiahumc.org** | Worker cooperative organizing site | Next.js 15 (Pages Router), GA4, Nodemailer | Basic marketing site with contact form (note: Pages Router) |

### Client Websites (Marketing / Business Sites)

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **mendograss.com** | Organic microgreens farm — subscriptions, markets | Next.js 15, Tailwind 4, Farmhand, GA4 + GTM, security headers | You need a marketing site with subscription checkout and SEO |
| **hospiceofukiah.org** | Hospice care provider site | Next.js 15, Tailwind 4, accessibility-focused | You need an accessibility-first informational site |
| **soulcultivationnow.com** | Shamanic wisdom platform — Medicine Wheel calculator | Next.js 15, Airtable CRM, interactive SVG, numerology engine | You need interactive calculators or spiritual/wellness platforms |
| **dctbstudio.com** | Interior design company site | Next.js 15, Tailwind 4 | You need a clean minimal marketing site (good starter template) |
| **prepwright.com** | SAT/ACT test prep coaching | Next.js 15, Tailwind 4 | Minimal marketing site template |
| **horizonvalleycleaning.com** | Exterior cleaning company landing page | Next.js 15, Tailwind 3 | Single-page business landing page |
| **michaelapitts-tax-resolution** | Tax resolution services (multi-page) | Next.js 15, Calendly integration | Multi-page business site with Calendly scheduling |
| **rauls-healing-hands** | Healing arts practitioner site | Next.js 15, Airtable, Nodemailer | Practitioner/wellness site with lead capture |
| **spreading-light** | Bleach art t-shirt e-commerce | Next.js 15, Stripe (hosted checkout), GA4, next-seo | E-commerce with Stripe checkout and SEO |

### Consulting & Portfolio

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **samuelholley.com** | AI consulting portfolio — Stripe commerce, blog, agreements | Next.js 16, Stripe, Contentful, Three.js, Storybook, Zustand, Framer Motion | Full-featured portfolio with payments, CMS blog, and 3D effects |
| **mendoaiconsulting.com** | Mendo AI Consulting business site | Next.js 16, Stripe, Contentful, Google Sheets | Same stack as samuelholley.com (shared codebase) |
| **SH_AI_landingPage** | Original AI consulting multi-page static site | Static HTML/CSS/JS, Calendly, chatbot | Simple static multi-page sites (no framework needed) |
| **reclaim-diagnostic-app** | Reclaim framework diagnostic/intake tool | Next.js 14, Contentful, Google APIs | Assessment/diagnostic web tools with CMS |

### Tools & Utilities

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **ticket_numberer** | WYSIWYG ticket builder with batch export | Next.js 14, Airtable, html-to-image, JSZip, jsPDF | You need batch image/PDF generation with numbering |
| **scoop_newsletter_generator** | Document-to-newsletter converter (PDF/DOCX input) | Next.js 16, @react-pdf/renderer, mammoth, Google Cloud Vision OCR | You need document parsing, OCR, or newsletter generation |
| **josie-shopify-csv-normalizer** | Vendor CSV → Shopify product import | Next.js 15, Yarn monorepo, PapaParse, Zod, JSZip | You need CSV processing, data normalization, or Shopify integration |
| **gather-kitchen-nutrition-labels** | FDA nutrition label calculator | Next.js 14, USDA FoodData Central API, Airtable | You need nutrition calculation or FDA-compliant label generation |
| **ethan-work-logs** | Caregiver time tracking + behavioral data logging | Next.js 14, Airtable, Dexie.js, Zustand, @react-pdf/renderer | Offline-first logging app with behavioral data capture |

### Life Command Platform (Personal Project)

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **Life-Command-Rebuild** | Production task management with AI API | Next.js 15, Supabase (RLS), TanStack Query, Zod, Yarn monorepo | You need Supabase with RLS, monorepo architecture, or AI-accessible APIs |
| **Holley-Pfotzer-Command-Center** | Family command center dashboard | Next.js 15, Firebase/Firestore, @dnd-kit, @tiptap, react-big-calendar, Recharts | You need drag-and-drop, rich text editing, calendar, or charts |
| **HolleyPfotzerLifeCommand** | Original Life Command (web + mobile) | Next.js 14, Expo/React Native, Supabase, WatermelonDB, Signal Protocol | You need cross-platform (web + mobile) or encrypted comms |
| **HolleyPfotzerLifeCommand_Monorepo** | Clean monorepo restructure attempt | Same as above | Monorepo reference |

### Infrastructure & Config

| Repo | What It Does | Key Tech | Duplicate When... |
|------|-------------|----------|-------------------|
| **claude-config** | Shared Claude Code configuration for all repos | Shell, JSON, Markdown | Setting up Claude Code in any new project |
| **rbd-delivery-engine** | Governed autonomous AI delivery framework | Markdown + JSON + Bash (zero deps) | You want AI-governed software delivery via Claude Code slash commands |
| **custom-gpt-backend** | Express API proxying to OpenAI | Express.js, OpenAI API, EJS views | You need a quick backend API or GPT chatbot proxy |
| **spark-protocol-app** | Interactive Spark Protocol web app | Static HTML/CSS/JS | Simple interactive single-page apps (no framework) |

---

## Quick-Reference: "I Need To Build X" Lookup

| I need to build... | Start from this repo |
|--------------------|---------------------|
| A marketing/business website | `dctbstudio.com` (minimal) or `mendograss.com` (full-featured) |
| An admin dashboard | `admin.ukiahseniorcenter.org` |
| A membership/ticketing system | `memberships.ukiahseniorcenter.org` or `tickets.ukiahseniorcenter.org` |
| A donation page | `donate.ukiahseniorcenter.org` |
| An e-commerce store | `spreading-light` (Stripe) |
| A portfolio with payments | `samuelholley.com` |
| An offline-first PWA | `senior_center_timesheets` or `ethan-work-logs` |
| PDF/image batch generation | `ticket_numberer` or `bewell.ukiahumc.org` |
| A Supabase app with RLS | `Life-Command-Rebuild` |
| A Firebase app | `Holley-Pfotzer-Command-Center` |
| Airtable integration | `admin.ukiahseniorcenter.org` (complex) or `signups.ukiahumc.org` (simple) |
| Google Sheets integration | `affairtoremember.ukiahseniorcenter.org` |
| Stripe payments | `samuelholley.com` |
| Zeffy payments | `donate.ukiahseniorcenter.org` |
| Shopify integration | `josie-shopify-csv-normalizer` |
| A monorepo | `Life-Command-Rebuild` or `josie-shopify-csv-normalizer` |
| Cross-platform (web + mobile) | `HolleyPfotzerLifeCommand` |
| A livestream page | `livestream.ukiahumc.org` |
| Volunteer scheduling | `signups.ukiahumc.org` |
| Newsletter generation | `scoop_newsletter_generator` |
| Document parsing / OCR | `scoop_newsletter_generator` |
| Nutrition/FDA compliance | `gather-kitchen-nutrition-labels` |
| Claude Code AI delivery | `rbd-delivery-engine` |
| Calendar / drag-and-drop | `Holley-Pfotzer-Command-Center` |
| Rich text editing | `Holley-Pfotzer-Command-Center` (@tiptap) |
| Charts / data viz | `Holley-Pfotzer-Command-Center` (Recharts) or `admin.ukiahseniorcenter.org` |
| Contact form with email | Any repo with Nodemailer (10+ options) |

---

## Integration Accounts & Services

| Service | Used For | Referenced In |
|---------|---------|--------------|
| Vercel | Deployment | All repos |
| Airtable | Database/CRM | 10 repos |
| Stripe | Payments | 3 repos |
| Zeffy | Nonprofit payments | 3 repos |
| Google Sheets/APIs | Data storage | 3 repos |
| Contentful | Headless CMS | 3 repos |
| Supabase | Database + Auth | 3 repos |
| Firebase | Database + Hosting | 1 repo |
| Auth0 | Authentication | 1 repo |
| QuickBooks Online | Accounting | 1 repo |
| Google Cloud Vision | OCR | 1 repo |
| USDA FoodData Central | Nutrition data | 1 repo |
| YouTube | Livestream | 1 repo |
| Calendly | Scheduling | 2 repos |
| OpenAI API | Chatbot | 1 repo |
| Nodemailer | Email (Gmail/Zoho/M365 SMTP) | 10+ repos |

---

*Last updated: 2026-03-18*
*Generated by reviewing all 37 samuelmholley1 GitHub repositories*
