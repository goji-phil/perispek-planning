---
phase: 02-dashboard
plan: "03"
subsystem: ui
tags: [react, next.js, server-components, phosphor-icons, tailwind, dashboard, layout]

# Dependency graph
requires:
  - phase: 02-dashboard
    plan: "02-01"
    provides: computeDashboardMetrics(), DashboardMetrics type, seed data
  - phase: 02-dashboard
    plan: "02-02"
    provides: MetricLargeCard, MetricStateCard, SectionTitle components
provides:
  - Full /dashboard route: assembled dashboard page with all sections
  - MapPlaceholder Server Component (left panel with Risk Score title + map chrome)
  - RightColumn Server Component (Blockage Predictions + Condition Changes + Today's Rainfall)
affects: [Phase 3 map integration, future dashboard iterations]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Border-based section separation instead of card wrappers (right column uses border-t per section)
    - Below-metrics area with no outer padding — map/right-column own their own p-5 and borders
    - MetricLargeCard icon right-aligned via justify-between, color via text-primary wrapper span
    - Phosphor filled icons via weight="fill" prop for section title icons

key-files:
  created:
    - src/app/dashboard/page.tsx (replaced stub)
    - src/components/dashboard/MapPlaceholder.tsx
    - src/components/dashboard/RightColumn.tsx
  modified:
    - src/app/globals.css (critical: wrapped reset in @layer base to fix cascade)
    - src/app/layout.tsx (removed TopBar)
    - src/components/dashboard/MetricLargeCard.tsx (icon right-aligned, text-primary)
    - src/components/dashboard/MetricStateCard.tsx (p-3, gap-2, items-start, icon optional)
    - src/components/dashboard/SectionTitle.tsx (gap-3, title flex-1)

key-decisions:
  - "Critical CSS fix: * { padding:0; margin:0; } was unlayered CSS overriding all @layer utilities — wrapped in @layer base to restore Tailwind spacing"
  - "Bars are h-[56px] (not 80px) matching --topbar-height design token and Figma spec"
  - "Below-metrics uses no outer padding — MapPlaceholder owns border-t border-r p-5, RightColumn sections own border-t p-5"
  - "RightColumn has no card wrapper — uses plain flex-col with border-t separators per section"
  - "MetricLargeCard icon right-aligned with text-primary; icons passed without color class to inherit from wrapper span"
  - "Filled icon variant (weight=fill) used for all section title icons per Figma spec"

patterns-established:
  - "Full-viewport no-scroll layout: flex flex-col h-full overflow-hidden on page root"
  - "shrink-0 bars + flex-1 min-h-0 below-metrics pattern for locked layout"
  - "Border-separated sections: each section div has border-t border-[#3f3f46] — no card chrome"

requirements-completed: [DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06]

# Metrics
duration: ~45min (including multiple visual fix rounds with user)
completed: 2026-02-20
---

# Phase 2 Plan 03: Dashboard Page Assembly Summary

**Complete /dashboard route: MapPlaceholder + RightColumn assembled into full-viewport no-scroll layout, with critical CSS cascade fix that restored all Tailwind spacing utilities**

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-02-20
- **Tasks:** 3 (2 auto + 1 human-verify)
- **Files created:** 3 / modified: 5
- **Commits:** 2353045, 0c3c2ae, 129328a, 766b3ff, c106fd0

## Accomplishments
- MapPlaceholder: left panel with Risk Score section title, WarningDiamond (filled) icon, dark placeholder card with map toolbar chrome (5 icon buttons), "Interactive map — Phase 3" placeholder, "Map feedback" pill
- RightColumn: three stacked sections (no card wrapper) — Blockage Predictions 2×2 grid, Condition Changes 2×2 grid, Today's Rainfall 3-cell row — all populated from computeDashboardMetrics()
- Dashboard page: no-scroll full-viewport layout with 2 bars (56px each) + metrics area (shrink-0) + below-metrics (flex-1)
- DASH-03: asset type strip (pipes / manholes / storm drains) rendered as compact inline row
- DASH-06: riskBandCounts visible in Avg. risk score card description ("X high, Y critical")
- Critical fix: wrapped global CSS reset in `@layer base` to prevent unlayered CSS from overriding all Tailwind layered utilities
- Removed TopBar from layout.tsx; bars are h-[56px] matching Figma spec
- MetricLargeCard refined: icon right-aligned, text-primary color, label left
- All section title icons use weight="fill" (Gauge, WarningDiamond, Prohibit, SecurityCamera, Umbrella)
- Button icons: Export (Share), Gear (Dashboard settings), Calendar (Year to date)
- Build passes, zero TypeScript errors

## Task Commits

1. **Task 1: MapPlaceholder + RightColumn** — `2353045`
2. **Task 2: Dashboard page assembly** — `0c3c2ae`
3. **Visual fixes (spacing/layout/CSS fix)** — `129328a`, `766b3ff`
4. **Visual polish (icons, alignment)** — `c106fd0`

## Files Created/Modified
- `src/app/dashboard/page.tsx` — Full dashboard layout, all metrics from computeDashboardMetrics()
- `src/components/dashboard/MapPlaceholder.tsx` — Left panel with map chrome and Risk Score title
- `src/components/dashboard/RightColumn.tsx` — Right panel with 3 stacked metric sections
- `src/app/globals.css` — Critical: @layer base wrapper on reset block
- `src/app/layout.tsx` — Removed TopBar component
- `src/components/dashboard/MetricLargeCard.tsx` — Icon right-aligned, text-primary
- `src/components/dashboard/MetricStateCard.tsx` — p-3, gap-2, icon optional
- `src/components/dashboard/SectionTitle.tsx` — gap-3, title flex-1

## Decisions Made
- **CSS cascade bug**: `* { padding: 0; margin: 0; }` was outside any `@layer`, making it unlayered CSS with higher cascade priority than all `@layer utilities`. Fix: wrap in `@layer base {}`.
- **Bar height**: 56px (not 80px per plan spec) — corrected to match `--topbar-height: 56px` design token and Figma node measurements.
- **Below-metrics structure**: No outer padding on the flex container. MapPlaceholder and RightColumn each own their own `border-t` and `p-5`. This matches the Figma node 520-19089 structure where map and right column are flush with edge.
- **RightColumn structure**: No card wrapper — border-t separators only, matching Figma node 520-19100.

## Deviations from Plan
- Bar heights corrected from 80px (plan spec) to 56px (actual Figma measurement)
- RightColumn built without card wrapper (plan spec had rounded card) — corrected to Figma border-based design
- MapPlaceholder given border-t border-r padding (plan spec had no border) — corrected to match Figma
- MetricStateCard made icon-optional (icon prop not required) — simpler than plan's `icon={<span />}` placeholder approach

## Issues Encountered
- **Critical CSS cascade bug**: `* { padding: 0; }` unlayered reset zeroed all Tailwind spacing. Diagnosed by inspecting generated CSS and finding the rule at line 906 (after all `@layer` blocks). Fixed by wrapping reset in `@layer base`.
- **Figma MCP**: `get_design_context` with specific nodeId requires the file to be the active desktop tab. Worked around by using nodeId from URL after user confirmed Figma was open.

## User Setup Required
None.

## Next Phase Readiness
- Phase 2 complete: all 6 requirements (DASH-01 through DASH-06) satisfied
- Dashboard is visually approved by user
- No blockers for Phase 3 (map integration)

---
## Self-Check: PASSED

- MapPlaceholder.tsx: FOUND
- RightColumn.tsx: FOUND
- dashboard/page.tsx: FOUND (full implementation, not stub)
- DASH-03 (pipeCount/manholeCount/stormDrainCount): RENDERED in asset strip
- DASH-06 (riskBandCounts): RENDERED in Avg. risk score description
- TypeScript: CLEAN (npx tsc --noEmit: 0 errors)
- Human verify: APPROVED by user
- Final commit: c106fd0

---
*Phase: 02-dashboard*
*Completed: 2026-02-20*
