# BHC ANNUAL REPORT
> **Owner:** Luke Alvarez | **Organization:** Black Hills Consortium
> **Created:** February 18, 2026 (Sprint 230)
> **Purpose:** Interactive annual report web application for investor presentations

---

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4 (inline @theme)
- **Animation:** Framer Motion 12.34.2
- **Icons:** Lucide React 0.563.0
- **Charts:** Recharts 3.7.0
- **Utilities:** clsx + tailwind-merge

---

## Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage — executive summary with animated metrics |
| `/entity/[slug]` | Entity detail page (13 entities via generateStaticParams) |
| `/compare` | BHC vs Elevate Rapid City comparison |
| `/compare/bhb` | BHC vs Black Hills & Badlands comparison |
| `/financials` | Financial breakdown (V5 floor + V4 ceiling) |
| `/investors` | Investor tiers and capital raise |
| `/team` | Team roster and AI-equivalent output |
| `/goals` | Five year goals with progress bars |
| `/flywheel` | Interactive flywheel visualization |
| `/print` | Print-optimized version |

---

## Design System

### Colors (CSS Variables in globals.css)
- **Navy:** #0a1628 (backgrounds)
- **Navy Light:** #1a2a4a (cards)
- **Emerald:** #22c55e (primary accent)
- **Gold:** #f59e0b (secondary accent)
- **White/Gray:** Standard text hierarchy

### Motion Components (src/components/motion.tsx)
- FadeIn, StaggerContainer, StaggerItem
- CountUp (animated numbers)
- ParallaxSection (scroll-linked parallax)
- NavyGlow, EmeraldShimmer, PulseGlow, ScaleReveal

---

## Entity Slugs (13)

```
growwise, outpost-media, seed-foundation, seed-academy, the-cult,
the-op, pass-creek, settle-the-west, auric-labs, bhc,
delegate-iq, adventurecap, grow-campus
```

---

## Verified Numbers

| Metric | V5 Floor | V4 Ceiling |
|--------|----------|------------|
| Revenue Y1 | $66.92M | $439.5M |
| Revenue Y5 | $262.84M | $1.65B |
| Valuation Y1 | $523M-$783M | -- |
| Valuation Y5 | $1.92B-$2.89B | -- |

**V4 Pricing:** Starter $699 | Solo $1,299 | Growth $1,799/loc | Enterprise $2,499/loc | MSO $2,499/loc
**Capital Raise:** $52M | **Entities:** 13 | **CRM:** 18,786 accounts

---

## Key File References

| Purpose | Path |
|---------|------|
| Types | `src/types/entity.ts`, `src/types/metrics.ts`, `src/types/comparison.ts` |
| Utilities | `src/lib/utils.ts` (cn), `src/lib/format.ts` (formatCurrency, formatNumber) |
| Entity Data | `data/entities.json` |
| Metrics Data | `data/metrics.json` |
| Financials | `data/financials.json` |
| Comparison | `data/comparison/elevate.json` |
| Flywheel | `data/flywheel.json` |
| Motion | `src/components/motion.tsx` |

---

## DO NOT

- Use numbers without verifying against the Verified Numbers table above
- Modify financial projections without updating `data/financials.json` and `data/metrics.json`
- Add dependencies without checking `package.json` first
- Create files that duplicate existing data layer (`data/` directory)
- Skip V5 floor + V4 ceiling when showing revenue ranges
