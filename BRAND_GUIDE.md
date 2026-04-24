# Menton Builders — Brand Guide (Source of Truth)

**Status:** Active. Supersedes all prior brand references.
**Source documents:**
- Joe's Brand Specification Sheet (wins on any contradiction)
- `public/brand/Menton_Builders_Brand_System_v3.pdf` (everything else)

**Core idea:** Contained. Simple. Strong.
**Feel:** Quiet confidence. Long-standing capability. Regional sophistication without flash.
**Avoid:** Generic contractor tropes, loud sales language, bright trendy colors, clutter, heavy shadows, luxury theater.

---

## 1. Logo System (Joe's spec — authoritative)

| Element | HEX | Usage |
|---|---|---|
| **MENTON** (primary wordmark) | `#2D2D2D` | Bold authoritative serif. Classic/grounded. |
| **Icon + BUILDERS** | `#928E85` | Icon glyph and the "BUILDERS" word both use this warm mineral gray. |

### Typography inside the logo
- **MENTON** — bold serif (Playfair Display 700 or equivalent classical serif).
- **BUILDERS** — medium-weight sans-serif with tightened tracking/kerning (the "plinth").

### Badge rule
- For hats, small stamps, social media icons: use **Icon + MENTON only** (drop BUILDERS).
- **No boxes, frames, or borders.** The logo exists in open space. Ever.

### Clear space
- Protect generous white space around the logo. Treat the bounding box of the icon as the minimum margin on all sides.

---

## 2. Color System — Mineral Palette

Backgrounds come first. Taupe/olive are restrained anchors, not decoration.

| Name | HEX | RGB | Role |
|---|---|---|---|
| **Warm Ivory** | `#F8F4ED` | 248, 244, 237 | Primary light background. Open, calm page space. |
| **Soft Sand** | `#EDE4D8` | 237, 228, 216 | Secondary background behind cards and groupings. |
| **Warm Taupe** | `#5C5347` | 92, 83, 71 | Primary anchor — headers, primary buttons, nav emphasis, logo lockup on light bg. |
| **Warm Gray** | `#8C7E6E` | 140, 126, 110 | Subheads, rules, labels, icons, secondary text. |
| **Mineral Olive** | `#8A8572` | 138, 133, 114 | Restrained accent. Use sparingly. |
| **Charcoal Earth** | `#2F2C28` | 47, 44, 40 | Dark text on light surfaces. Near-identical to logo MENTON `#2D2D2D`. |

### Behavior rules
- Light mineral backgrounds carry most surfaces.
- Warm Taupe is the anchor for hierarchy — logo, headers, primary CTAs, nav emphasis.
- Mineral Olive is a supporting note, never dominant.
- **Do not** use bright blues, saturated greens, bright reds, glossy metallics, neon, or gradients. These break the brand language.
- **Retire** the current teal-* palette — it is inconsistent with the new system.

---

## 3. Typography — Web & App

| Use case | Font | Notes |
|---|---|---|
| Primary UI / body | **Inter** (regular) | Clean, precise, calm. Generous line spacing. |
| Headings (web) | **Inter** medium–bold | Let spacing and scale create authority, not weight alone. |
| Logo wordmark "MENTON" | **Playfair Display 700** (serif) | Only inside the logo lockup. Do not use for body headings. |
| Logo wordmark "BUILDERS" | Medium sans, tight tracking | Only inside the logo lockup. |
| Fallback | Arial, Helvetica, sans-serif | Keep neutral and widely available. |

### Rules
- Breathing room around headers. Never cramped.
- Do not overcapitalize. Use sentence case or title case, not ALL CAPS except in the logo "BUILDERS" plinth and short UI labels.
- Spacing, alignment, and proportion create elegance — not decorative fonts.

**Important nuance:** The PDF recommends Inter for all web/app typography. The existing site uses Playfair Display for section headings. Default direction going forward: **Inter for UI and body; Playfair reserved for the logo wordmark only.** If a serif display accent is desired anywhere on the site, it must be approved case-by-case.

---

## 4. Voice & Messaging

| Do | Do not |
|---|---|
| Clear language, measured confidence, practical precision. | Hype, exaggerated claims, trendy marketing speak. |
| Speak from experience and responsibility. | Sound slick, overly clever, self-congratulatory. |
| Emphasize trust, coordination, craft. | Lean on generic slogans or loud sales copy. |

Keep: **"Builders Building What Matters"** — direct and anchored in responsibility.

Website keywords: craft, stewardship, precision, coordination, longevity, regional depth, quiet confidence.

---

## 5. Photography & Art Direction

- **Mood:** Dusk, long shadows, morning softness, real atmospheric light. Not flat midday.
- **Subjects:** Structure, framing, materials, craftsmanship, site discipline, completed exteriors with architectural presence.
- **Avoid:** Over-staged lifestyle, generic stock, shiny corporate office imagery.
- **Principle:** Work should feel observed, not advertised.

---

## 6. Website Translation

- **Layout:** Minimal, high-space. Strong margins. Clean vertical rhythm. Disciplined section spacing.
- **Buttons:** Simple rectangular or softly rounded. Warm Taupe primary with light text. Soft Sand secondary with Charcoal Earth text and subtle border. No gradients, no neon, no glow.
- **Navigation:** Calm, sparse, readable. Stable the moment it loads.
- **Cards:** Light surfaces, soft separation, no heavy shadows. Use thin rules and spacing instead of dramatic effects.
- **Forms:** Clean labels, enough padding, simple states, clear hierarchy. Functional and calm.
- **Icons:** Line or restrained solid. Lucide React default set is acceptable. No cartoonish/playful icon sets.
- **Case studies:** Let project imagery carry authority. Do not overload with promotional text.

---

## 7. UI Component Tokens (Tailwind mapping)

Intended Tailwind extension (see implementation):

```
colors: {
  ivory:    '#F8F4ED',  // Warm Ivory — primary bg
  sand:     '#EDE4D8',  // Soft Sand — secondary bg
  taupe:    '#5C5347',  // Warm Taupe — anchor
  stone-mb: '#8C7E6E',  // Warm Gray — supporting
  olive:    '#8A8572',  // Mineral Olive — restrained accent
  charcoal: '#2F2C28',  // Charcoal Earth — dark text
  ink:      '#2D2D2D',  // Logo MENTON (near-identical to charcoal)
}
```

---

## 8. Guardrails

**Do**
- Protect white space around the logo.
- Use light, mineral backgrounds and controlled contrast.
- Keep typography clean, readable, proportionate.
- Let the identity feel mature and under control.

**Do not**
- Add busy textures, bevels, harsh shadows, or trendy effects.
- Swap in bright or saturated accent colors.
- Crowd the logo with supporting information.
- Turn the brand into luxury theater. It should feel premium, not performative.

---

## 9. Priority Order for Implementation

1. Keep the logo clean and proportional (wait on final SVG from Joe).
2. Apply the mineral palette with restraint — retire the teal system.
3. Use Inter + spacing to create the premium feel.
4. Keep UI readable, calm, and highly functional.
5. Avoid anything that feels loud, trendy, or generic-contractor.

**End state:** Menton Builders has quietly grown into a higher level of company without pretending to be something it is not.
