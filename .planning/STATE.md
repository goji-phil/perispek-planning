# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Operations managers can understand the health of their entire pipe network at a glance and drill into any asset to see condition scores, live sensor readings, and scheduled work — in one place.
**Current focus:** Phase 3 - Map View

## Current Position

Phase: 2 of 6 (Dashboard) — COMPLETE ✓
Plan: All 3 plans in Phase 2 complete
Status: Phase 2 done — ready for Phase 3 planning

Progress: [####################░░░░░░░░░░] 33% (Phases 1–2 of 6 complete)

## Performance Metrics

**Velocity:**
- Total plans completed: 8 (01-01 through 01-05, 02-01 through 02-03)
- Average duration: ~12 min
- Total execution time: ~90 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 5 of 5 ✓ | ~40 min | ~8 min |
| 02-dashboard | 3 of 3 ✓ | ~50 min | ~17 min |

**Recent Trend:**
- Dashboard plans longer due to Figma review cycles and CSS debugging

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
- [Phase 01-foundation/01-03]: Risk score scale confirmed: CoF/LoF on 0-5 NASSCO scale; (CoF x LoF)/2 = 0-12.5 range; bands at [0-3) low, [3-6) medium, [6-9) high, [9-12.5] critical
- [Phase 01-foundation/01-05]: Connected Figma MCP (IDEX x Goji Design System); corrected all tokens — Switzer font, zinc-900 bg, 12px radius, 200px sidebar width
- [Phase 02-dashboard/02-01]: Typography tokens omitted from @theme — Tailwind v4 owns --text-* namespace; use arbitrary values (text-[40px]) to avoid shadowing built-in scale
- [Phase 02-dashboard/02-02]: Icons passed as React.ReactNode props (pre-rendered by caller) — keeps card components icon-library agnostic
- [Phase 02-dashboard/02-03]: Critical CSS fix: * { padding:0; margin:0; } was unlayered CSS overriding all @layer utilities — wrapped in @layer base
- [Phase 02-dashboard/02-03]: Bar heights are h-[56px] (not 80px) matching --topbar-height token and Figma spec
- [Phase 02-dashboard/02-03]: Below-metrics uses no outer padding — each panel owns its own border-t and p-5
- [Phase 02-dashboard/02-03]: Filled icon variant (weight="fill") used for all section title icons

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-20
Stopped at: Phase 2 complete — all 3 plans done, human verification approved
Resume file: None
