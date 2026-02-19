# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Operations managers can understand the health of their entire pipe network at a glance and drill into any asset to see condition scores, live sensor readings, and scheduled work — in one place.
**Current focus:** Phase 1 - Foundation

## Current Position

Phase: 1 of 6 (Foundation)
Plan: 3 of 5 in current phase
Status: In progress
Last activity: 2026-02-19 — Completed 01-foundation/01-03-PLAN.md (TypeScript types + 75 asset seed data)

Progress: [######░░░░] 30% (3/5 plans in Phase 1 complete, skipping 01-02 per orchestrator)

## Performance Metrics

**Velocity:**
- Total plans completed: 2 (01-01 and 01-03)
- Average duration: 8 min
- Total execution time: 16 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 of 5 | 16 min | 8 min |

**Recent Trend:**
- Last 5 plans: 4 min, 12 min
- Trend: Data-heavy plans take longer than scaffold plans

*Updated after each plan completion*

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

### Pending Todos

- Refine globals.css color tokens after Figma login (exact hex values for pixel-perfect fidelity)

### Blockers/Concerns

- Figma access requires login — Claude will need design specs shared as screenshots or exported assets before pixel-perfect implementation can begin

## Session Continuity

Last session: 2026-02-19
Stopped at: Completed 01-foundation/01-03-PLAN.md (TypeScript types + 75 KC asset seed data).
Resume file: None
