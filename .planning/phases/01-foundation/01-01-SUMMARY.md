---
phase: 01-foundation
plan: "01"
subsystem: ui
tags: [nextjs, tailwind, tailwind-v4, typescript, design-tokens, cn-utility]

# Dependency graph
requires: []
provides:
  - Next.js 15 project at /Users/philipdavies/perispek with TypeScript, App Router, Turbopack
  - Tailwind v4 @theme design token system in globals.css (colors, typography, spacing, layout)
  - cn() class merge utility (clsx + tailwind-merge) at src/lib/utils/cn.ts
  - PostCSS configured for @tailwindcss/postcss (Tailwind v4)
  - All required npm dependencies installed (phosphor-icons, zustand, clsx, tailwind-merge)
  - TypeScript type definitions for Asset, WorkOrder, IoTData, InspectionCoverage in src/types/index.ts
  - IoT time-series generator in src/lib/data/time-series.ts
affects:
  - 01-02 (sidebar and navigation components use design tokens and cn() utility)
  - 01-03 (mock data layer imports types from src/types/index.ts)
  - All subsequent plans (design token system is foundation for all Tailwind classes)

# Tech tracking
tech-stack:
  added:
    - "Next.js 16.1.6 (Next.js 15 release line)"
    - "React 19"
    - "TypeScript 5"
    - "Tailwind CSS v4 with @tailwindcss/postcss"
    - "@phosphor-icons/react v2.1.10"
    - "zustand v5.0.11"
    - "clsx v2.1.1"
    - "tailwind-merge v3.5.0"
  patterns:
    - "Tailwind v4 CSS-first configuration: all tokens in @theme in globals.css, no tailwind.config.ts"
    - "cn() utility: clsx for conditional logic + tailwind-merge for conflict resolution"
    - "PostCSS plugin pattern: @tailwindcss/postcss in postcss.config.mjs"

key-files:
  created:
    - src/app/globals.css
    - src/lib/utils/cn.ts
    - postcss.config.mjs
    - src/types/index.ts
    - src/lib/data/time-series.ts
  modified:
    - package.json

key-decisions:
  - "Tailwind v4 CSS-first: @theme in globals.css replaces tailwind.config.ts entirely"
  - "Design token values approximated from RESEARCH.md (Figma login unavailable); TODO to refine after Figma access"
  - "Risk score scale: CoF and LoF on 0–5; risk = (CoF * LoF) / 2 giving 0–12.5 range; bands at [0-3] low, [3-6] medium, [6-9] high, [9-12.5] critical"
  - "IoT time-series generated procedurally in generateTimeSeries() rather than hardcoded"

patterns-established:
  - "Pattern: Import cn() from @/lib/utils/cn in all components using conditional Tailwind classes"
  - "Pattern: Use var(--color-*) CSS variables for semantic colors in base styles, Tailwind utilities for components"
  - "Pattern: No tailwind.config.ts — all design tokens belong in src/app/globals.css @theme block"

requirements-completed: [NAV-03]

# Metrics
duration: 4min
completed: 2026-02-19
---

# Phase 1 Plan 01: Bootstrap Next.js 15 with Tailwind v4 Design Token System

**Next.js 15 project bootstrapped with complete dark-theme design token system in Tailwind v4 @theme format — colors, typography, risk bands, sidebar dimensions, and cn() utility all ready for component development.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-19T23:21:30Z
- **Completed:** 2026-02-19T23:25:05Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Next.js 16.1.6 project created at `/Users/philipdavies/perispek` with TypeScript, App Router, Turbopack, src/ directory layout, and @/* import alias
- All dependencies installed: tailwindcss v4, @tailwindcss/postcss, @phosphor-icons/react, zustand, clsx, tailwind-merge
- Complete design token system defined in globals.css using Tailwind v4 @theme directive — covers brand colors, dark backgrounds (3 surface levels), text colors, border, risk band colors (low/medium/high/critical), IoT status colors, typography, border radius (sm/md/lg/xl), and sidebar layout dimensions
- cn() class merge utility combining clsx + tailwind-merge established as the standard class composition pattern
- TypeScript type definitions and IoT time-series generator pre-scaffolded by project template

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Next.js project and install dependencies** - `d0bc14b` (feat)
2. **Task 2: Define Figma design tokens and cn() utility** - `24afd9e` (feat)

## Files Created/Modified

- `src/app/globals.css` - Tailwind v4 @import + complete @theme design token block; base styles for dark dashboard
- `src/lib/utils/cn.ts` - cn() utility combining clsx conditional logic + tailwind-merge conflict resolution
- `postcss.config.mjs` - PostCSS configured for @tailwindcss/postcss (Tailwind v4 plugin)
- `package.json` - All project dependencies declared and installed
- `src/types/index.ts` - Complete TypeScript interfaces: Asset, WorkOrder, IoTData, InspectionCoverage, GeoPoint, etc.
- `src/lib/data/time-series.ts` - generateTimeSeries() procedural IoT reading generator (90 days, realistic variation)

## Decisions Made

- **Tailwind v4 CSS-first approach:** No `tailwind.config.ts` created — all design tokens live in `globals.css` under `@theme`. This is the v4 standard and avoids the double-source-of-truth problem.
- **Design token approximations:** Figma requires login (not available during execution). Used research-documented dark-theme dashboard approximations from RESEARCH.md. TODO comment added to refine exact values after Figma access.
- **Risk score scale resolved:** CoF and LoF on 0.0–5.0 NASSCO scale; risk = (CoF × LoF) / 2 giving 0–12.5 max. Band thresholds: [0-3) low, [3-6) medium, [6-9) high, [9-12.5] critical. (PROJECT.md "0.0–2.5" was inconsistent — 0–12.5 correctly reflects 0–5 scales per RESEARCH.md analysis.)
- **PostCSS as .mjs:** Used ES module format for postcss.config.mjs to match project's ESM configuration.

## Deviations from Plan

None — plan executed exactly as written. Figma access fallback was pre-documented in the plan itself ("use research-documented approximations and add a TODO comment to refine").

## Issues Encountered

None — build succeeded on first attempt for both tasks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Design token system complete: all component plans can reference `bg-surface`, `text-foreground-muted`, `text-primary`, `border-border`, `bg-surface-active`, etc. as Tailwind utilities
- cn() utility ready for import: `import { cn } from '@/lib/utils/cn'`
- TypeScript types ready for mock data in Plan 01-03
- Concern: Design token colors are approximations — a Figma review pass before final demo would refine exact hex values for pixel-perfect fidelity

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
