---
phase: 01-foundation
plan: "03"
subsystem: data
tags: [typescript, mock-data, nassco, gis, iot, kansas-city, wastewater]

requires: []
provides:
  - "TypeScript type system for all wastewater asset data shapes (Asset, WorkOrder, InspectionRecord, IoTData, etc.)"
  - "75 seeded Asset objects with real KC GIS coordinates across 8 neighborhoods"
  - "generateTimeSeries() producing 90-day daily IoT sensor reading arrays"
  - "NASSCO PACP/MACP condition data with realistic defect codes and inspection history"
  - "Risk scoring system: CoF×LoF/2, range 0-12.5, four risk bands"
  - "IoT coverage: 35 assets with d/D ratio data, 2 overflow assets, ~8 in warning state"
affects:
  - "02-dashboard"
  - "03-map"
  - "04-asset-detail"
  - "05-work-orders"
  - "06-insights"

tech-stack:
  added: []
  patterns:
    - "Static TypeScript module pattern for mock data in src/lib/data/"
    - "Procedural time-series generator with fixed reference date for reproducibility"
    - "riskBand() helper function computing band from numeric score"
    - "Literal object array pattern for asset data (TypeScript validates each record)"

key-files:
  created:
    - "perispek/src/types/index.ts"
    - "perispek/src/lib/data/time-series.ts"
    - "perispek/src/lib/data/assets.ts"
  modified: []

key-decisions:
  - "Risk score scale: CoF and LoF on 0-5 per NASSCO convention; riskScore=(CoF*LoF)/2 giving 0-12.5 range; bands at 0-3/3-6/6-9/9-12.5 thresholds"
  - "IoTData.enabled typed as literal true (not boolean) to enable discriminated union pattern"
  - "Fixed reference date 2026-01-15T12:00:00Z for time-series generator ensures reproducible demo data"
  - "Write all 75 assets as explicit literal objects for TypeScript compile-time validation of each record"

patterns-established:
  - "Import type pattern: import type { Asset } from '@/types'"
  - "Risk band calculation: riskBand(riskScore) helper at top of assets.ts"
  - "IoT time series: generateTimeSeries(baselineDRatio, baselineFlowMGD) call inline in asset literal"

requirements-completed: [DATA-01, DATA-02, DATA-03, DATA-04, DATA-05]

duration: 12min
completed: 2026-02-19
---

# Phase 1 Plan 03: Type System and Asset Seed Data Summary

**TypeScript interfaces and 75 seeded KC wastewater assets with NASSCO grades, risk scores, and 35 IoT-enabled sensors generating 90 daily readings each**

## Performance

- **Duration:** 12 min
- **Started:** 2026-02-19T23:22:01Z
- **Completed:** 2026-02-19T23:34:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Defined complete TypeScript type system (15 exports): Asset, AssetType, ConditionGrade, RiskBand, WorkOrder, WorkOrderStatus, WorkOrderType, WorkOrderPriority, PACPData, InspectionRecord, IoTData, IoTReading, GeoPoint, InspectionCoverage, InspectionCoveragePeriod
- Seeded 75 assets across KC metro: 30 pipes, 30 manholes, 15 storm drains with real neighborhood coordinates (Downtown, River Market, Crossroads, Midtown, Westport, Penn Valley, Liberty Memorial, 18th & Vine)
- IoT sensor coverage on 35 assets with 90-day time series; 2 overflow states (dRatio >1.0), ~8 in warning state
- Risk distribution: 5 critical (score 9-12.5), 10 high (6-9), 16 medium (3-6), 44 low (0-3) — critical assets anchor the demo story

## Task Commits

Each task was committed atomically:

1. **Task 1: Define TypeScript type system** - `e9575e7` (feat)
2. **Task 2: Seed 75 assets with KC GIS coordinates and IoT time-series generator** - `1b851ce` (feat)

## Files Created/Modified

- `perispek/src/types/index.ts` - All TypeScript interfaces and union types for the data layer; JSDoc on risk score scale, d/D overflow semantics, and NASSCO grade meanings
- `perispek/src/lib/data/time-series.ts` - generateTimeSeries() producing 90-day daily readings with realistic noise, weekend uptick, and rain event spikes
- `perispek/src/lib/data/assets.ts` - 75 literal Asset objects; includes riskBand() helper and imports from @/types and ./time-series

## Decisions Made

- **Risk score scale resolved:** CoF and LoF on 0.0–5.0 per NASSCO convention. Risk score = (CoF × LoF) / 2, range 0–12.5. Bands: [0,3)=low, [3,6)=medium, [6,9)=high, [9,12.5]=critical. PROJECT.md listed "0–2.5" which was inconsistent; plan explicitly resolved this in favor of 0–5 scales.
- **IoTData.enabled typed as literal `true`:** Enables discriminated union — `iot?: IoTData` where `enabled: true` means TypeScript can narrow from Asset to IoT-enabled Asset cleanly.
- **Fixed reference date for time series:** 2026-01-15T12:00:00Z ensures the 90-day window is deterministic across runs, making demo data predictable.
- **Literal object array (not generated):** Each of the 75 assets is a fully explicit TypeScript object literal, giving compile-time type-checking per record rather than runtime validation.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All data types are defined and compile cleanly; any component or server function can `import { ASSETS } from '@/lib/data/assets'`
- The `generateTimeSeries()` function is importable by test utilities and future data expansion
- Risk band distribution is slightly skewed toward low (44 low vs plan's ~30) due to the many newer manholes and storm drains; the 5 critical and 10 high assets still anchor the demo story effectively
- Work order seed data (DATA-06) and inspection coverage data (DATA-07) are in scope for plan 04 or later

## Self-Check: PASSED

- FOUND: perispek/src/types/index.ts
- FOUND: perispek/src/lib/data/time-series.ts
- FOUND: perispek/src/lib/data/assets.ts
- FOUND: .planning/phases/01-foundation/01-03-SUMMARY.md
- FOUND commit e9575e7: feat(01-03): define TypeScript type system
- FOUND commit 1b851ce: feat(01-03): seed 75 KC wastewater assets

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
