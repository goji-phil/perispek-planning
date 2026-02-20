# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Operations managers can understand the health of their entire pipe network at a glance and drill into any asset to see condition scores, live sensor readings, and scheduled work — in one place.
**Current focus:** Phase 2 - Dashboard

## Current Position

Phase: 2 of 6 (Dashboard) — IN PROGRESS
Plan: 2 of 3 in Phase 2 (02-02 complete)
Status: Phase 2 in progress — 02-02 done, ready for 02-03 (dashboard page assembly)
Last activity: 2026-02-20 — Completed 02-dashboard/02-02-PLAN.md (MetricLargeCard, MetricStateCard, SectionTitle Server Components)

Progress: [##########░░░░░░░░░░] 17% (Phase 1 of 6 complete, Phase 2 started)

## Performance Metrics

**Velocity:**
- Total plans completed: 2 (01-01 and 01-03)
- Average duration: 8 min
- Total execution time: 16 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 5 of 5 ✓ | ~40 min | ~8 min |

**Recent Trend:**
- Last 5 plans: 4 min, 12 min
- Trend: Data-heavy plans take longer than scaffold plans

*Updated after each plan completion*

| Phase 02-dashboard P01 | 7 min | 2 tasks | 2 files |
| Phase 02-dashboard P02 | 6 min | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Esri ArcGIS JS SDK for maps — native fit for ESRI-origin asset data
- [Init]: Mock data only — no live backend; prototype is for demos
- [Init]: Next.js as framework — SSR/routing/ecosystem fit for dashboard-heavy app
- [Init]: Operations manager as primary user — drives KPI/map/insight views
- [Phase 01-foundation]: Tailwind v4 CSS-first: all design tokens in globals.css @theme, no tailwind.config.ts
- [Phase 01-foundation]: Tailwind v4 CSS-first: all design tokens in globals.css @theme, no tailwind.config.ts
- [Phase 01-foundation/01-03]: Risk score scale confirmed: CoF/LoF on 0-5 NASSCO scale; (CoF x LoF)/2 = 0-12.5 range; bands at [0-3) low, [3-6) medium, [6-9) high, [9-12.5] critical
- [Phase 01-foundation/01-03]: IoTData.enabled typed as literal true for discriminated union narrowing
- [Phase 01-foundation/01-03]: Fixed reference date 2026-01-15T12:00:00Z for time-series reproducibility
- [Phase 01-foundation/01-03]: Design token colors approximated from research (Figma login unavailable); TODO to refine for pixel-perfect fidelity
- [Phase 01-foundation/01-05]: Connected Figma MCP (IDEX x Goji Design System); corrected all tokens — Switzer font, zinc-900 bg, 12px radius, 200px sidebar width
- [Phase 01-foundation/01-05]: PerispekLogo built from actual SVG assets; sidebar matches nav-drawer/open + nav-drawer/closed specs
- [Phase 02-dashboard/02-01]: Typography tokens omitted from @theme — Tailwind v4 owns --text-* namespace; use arbitrary values (text-[40px]) to avoid shadowing built-in scale
- [Phase 02-dashboard/02-01]: noSignalCount hardcoded 0 — all seed IoT sensors active; documented in DashboardMetrics interface comment
- [Phase 02-dashboard/02-01]: Centralised KPI computation pattern — computeDashboardMetrics() computes all metrics once; page component stays thin
- [Phase 02-dashboard/02-02]: Icons passed as React.ReactNode props (pre-rendered by caller) — keeps card components icon-library agnostic
- [Phase 02-dashboard/02-02]: All three dashboard card components are Server Components — no client bundle cost for presentational UI
- [Phase 02-dashboard/02-02]: Dashboard card style: bg-[#27272a] border-[#3f3f46] rounded-[12px] — zinc-800/zinc-700 with 12px radius

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-20
Stopped at: Completed 02-dashboard/02-02-PLAN.md (MetricLargeCard, MetricStateCard, SectionTitle Server Components). Ready for 02-03 (dashboard page assembly).
Resume file: None
