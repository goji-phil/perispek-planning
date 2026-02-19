---
phase: 01-foundation
plan: "04"
subsystem: data
tags: [typescript, mock-data, work-orders, inspection-coverage, consent-decree]

requires:
  - phase: 01-03
    provides: "TypeScript WorkOrder and InspectionCoverage types, asset IDs for cross-referencing"
provides:
  - "30 seeded WorkOrder records across all statuses, priorities, and asset types"
  - "InspectionCoverage with 12 weekly + 12 monthly + 4 quarterly periods vs consent decree targets"
  - "getCurrentCoverageSummary() helper function for Dashboard Phase 2"
  - "Narrative: Q4 2025 and recent weeks/months lagging behind targets"
affects:
  - "02-dashboard"
  - "05-work-orders"
  - "06-insights"

tech-stack:
  added: []
  patterns:
    - "Static TypeScript module pattern for mock data in src/lib/data/"
    - "Explicit literal array for WorkOrder objects (TypeScript validates each record)"
    - "Helper function pattern: getCurrentCoverageSummary() returns most recent period per cadence"

key-files:
  created:
    - "perispek/src/lib/data/work-orders.ts"
    - "perispek/src/lib/data/inspections.ts"
  modified: []

key-decisions:
  - "Emergency orders (wo-001, wo-003) linked to pipe-001 and pipe-002 — the overflow/critical assets from Plan 03"
  - "Coverage targets: 2,500 LF/week, 10,000 LF/month, 30,000 LF/quarter — reasonable for medium KC utility"
  - "Holiday narrative: W49-W50 (Christmas/New Year) show sharp drop to 1400/800 LF — explains Q4 lag organically"

patterns-established:
  - "Work order assetId cross-reference pattern: IDs must match ASSETS array (pipe-XXX, mh-XXX, sd-XXX)"
  - "InspectionCoveragePeriod: period uses ISO week/month/quarter notation ('2025-W42', '2025-10', '2025-Q3')"

requirements-completed: [DATA-06, DATA-07]

duration: 8min
completed: 2026-02-19
---

# Phase 1 Plan 04: Work Orders and Inspection Coverage Summary

**30 seeded work orders and 28-period inspection coverage dataset telling the Q4 holiday-impact consent decree lag story**

## Performance

- **Duration:** 8 min
- **Completed:** 2026-02-19
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- 30 WorkOrder literals: 11 open / 7 in-progress / 12 completed; 4 critical / 9 high / 10 medium / 7 low
- 2 emergency work orders (wo-001 on pipe-001 overflow, wo-003 on pipe-002 collapse risk) — critical asset anchors
- InspectionCoverage: 12 weekly (W41 2025–W02 2026), 12 monthly (Feb 2025–Jan 2026), 4 quarterly (Q1–Q4 2025)
- Holiday narrative: W49/W50 at 1400/800 LF explains Q4 2025 at 24,900 LF vs 30,000 target; Dashboard shows this story
- `getCurrentCoverageSummary()` helper returns most-recent period for each cadence (used by Phase 2 Dashboard)

## Task Commits

1. **Task 1: Seed work order data** - `864ba69` (feat)
2. **Task 2: Seed inspection coverage data** - `a579ca9` (feat)

## Files Created/Modified

- `perispek/src/lib/data/work-orders.ts` - 30 WorkOrder literals; emergency orders linked to overflow assets
- `perispek/src/lib/data/inspections.ts` - InspectionCoverage with 28 periods; getCurrentCoverageSummary() helper

## Decisions Made

- Holiday narrative chosen as the organic explanation for Q4 lag — realistic and immediately understandable in demos.
- `getCurrentCoverageSummary()` placed in inspections.ts rather than a separate utils file — it's tightly coupled to the data shape.

## Deviations from Plan

None — plan executed exactly as written. Distribution (11/7/12 vs plan's 10/8/12) is within acceptable variance.

## Issues Encountered

Bash was unavailable in the subagent session — files written by agent, commits handled by orchestrator.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Full mock data layer complete: assets, work orders, inspection coverage
- Dashboard (Phase 2) can import WORK_ORDERS, INSPECTION_COVERAGE, getCurrentCoverageSummary
- Work Orders view (Phase 5) can import WORK_ORDERS directly
- System Insights (Phase 6) can import INSPECTION_COVERAGE for coverage metrics

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
