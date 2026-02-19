# Roadmap: WasteWater Insights Platform

## Overview

Six phases that build from a working scaffold with all mock data through each major view of the platform. Phase 1 establishes the app shell, navigation, and the full seeded dataset so every subsequent phase has real data to render. Phases 2-6 deliver the five primary views — Dashboard, Map, Hybrid+Asset, Work Orders, and System Insights — each as a complete, verifiable capability before the next begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - App shell, navigation, and complete mock dataset seeded
- [ ] **Phase 2: Dashboard** - System-wide KPI landing view with health, alerts, and consent decree tracking
- [ ] **Phase 3: Map View** - GIS asset map with NASSCO condition overlays, IoT status, and filters
- [ ] **Phase 4: Hybrid View + Asset Detail** - Linked map+data panel and full asset drill-down with sensor history
- [ ] **Phase 5: Work Orders** - Work order creation, listing, and detail view
- [ ] **Phase 6: System Insights** - Analytics view with trends, anomalies, and inspection coverage metrics

## Phase Details

### Phase 1: Foundation
**Goal**: The application runs, navigation works, and the full mock dataset is in place so every subsequent phase can render real data
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07
**Success Criteria** (what must be TRUE):
  1. User can open the app and see the global layout matching Figma (chrome, typography, color system)
  2. User can click each nav item (Dashboard, Map, System Insights, Work Orders) and be taken to the correct section, with the active item clearly highlighted
  3. The seeded dataset contains 50-100 assets with GIS coordinates, NASSCO grades, defect codes, risk scores, IoT readings, and 90 days of time-series data — queryable by the frontend
  4. Work order seed data and inspection footage seed data are present and accessible
**Plans**: TBD

### Phase 2: Dashboard
**Goal**: Operations managers land on a single view that communicates the health of the entire network at a glance
**Depends on**: Phase 1
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06
**Success Criteria** (what must be TRUE):
  1. User can see an overall system health score derived from network-wide asset condition
  2. User can see a count of active alerts (IoT threshold breaches and critical NASSCO scores)
  3. User can see asset counts by type (pipes, manholes, storm drains) and risk score distribution across low/medium/high/critical bands
  4. User can see a recent activity feed showing the latest inspections, work orders, and sensor triggers
  5. User can see inspection footage progress as a progress bar against the consent decree target for the current week, month, and quarter
**Plans**: TBD

### Phase 3: Map View
**Goal**: Users can spatially explore the entire asset network, see condition and sensor status at a glance, and click into any asset for a quick preview
**Depends on**: Phase 1
**Requirements**: MAP-01, MAP-02, MAP-03, MAP-04, MAP-05
**Success Criteria** (what must be TRUE):
  1. User can see all assets (pipes, manholes, storm drains) plotted on an interactive Esri ArcGIS map
  2. Assets are color-coded by NASSCO condition grade (green/yellow/red) and IoT-enabled assets show a d/D status icon (normal/warning/overflow)
  3. User can click any asset and see a popup with name, type, condition score, risk score, and d/D ratio (where applicable)
  4. User can filter/toggle asset layers by type and condition range, updating the map accordingly
**Plans**: TBD

### Phase 4: Hybrid View + Asset Detail
**Goal**: Users can cross-reference spatial and tabular data simultaneously and drill into any asset to see its complete condition, sensor, and metadata record
**Depends on**: Phase 3
**Requirements**: HYBRID-01, HYBRID-02, HYBRID-03, ASSET-01, ASSET-02, ASSET-03, ASSET-04, ASSET-05, ASSET-06, ASSET-07, ASSET-08
**Success Criteria** (what must be TRUE):
  1. User can view the map and an asset data panel side by side; selecting an asset in either highlights it in the other
  2. User can sort and filter the data panel by condition score, risk score, and asset type
  3. User can open an asset detail view showing NASSCO grades, defect codes, and 2-3 historical inspection records with dates and scores
  4. User can see current IoT readings (depth, flow, d/D ratio with status) and a time-series chart of d/D and flow for 7, 30, and 90-day windows
  5. User can see asset metadata (material, diameter, install year, GPS, upstream/downstream connections) and the risk score displayed as a numeric value with color band
**Plans**: TBD

### Phase 5: Work Orders
**Goal**: Users can create, view, and track work orders linked to specific assets from any entry point
**Depends on**: Phase 4
**Requirements**: WO-01, WO-02, WO-03
**Success Criteria** (what must be TRUE):
  1. User can create a work order from any asset (map popup, asset detail, or hybrid panel) specifying type, priority, description, and due date
  2. User can view the full work order list filtered by status (open/in-progress/complete), priority, and asset type
  3. User can open a work order detail page showing the linked asset, full description, status history, and notes
**Plans**: TBD

### Phase 6: System Insights
**Goal**: Users can understand how the network is trending over time, identify the most at-risk assets, and track inspection progress against regulatory obligations
**Depends on**: Phase 2
**Requirements**: INSIGHT-01, INSIGHT-02, INSIGHT-03, INSIGHT-04, INSIGHT-05
**Success Criteria** (what must be TRUE):
  1. User can see a condition trend chart showing the network health score over time (improving or degrading)
  2. User can see a ranked list of the most at-risk assets sorted by risk score (CoF x LoF / 2)
  3. User can see an IoT anomaly summary showing which sensors have recently triggered d/D warnings or overflow events
  4. User can see inspection coverage metrics — percentage of assets inspected within 1, 3, and 5 years — and footage totals per period against consent decree targets
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/TBD | Not started | - |
| 2. Dashboard | 0/TBD | Not started | - |
| 3. Map View | 0/TBD | Not started | - |
| 4. Hybrid View + Asset Detail | 0/TBD | Not started | - |
| 5. Work Orders | 0/TBD | Not started | - |
| 6. System Insights | 0/TBD | Not started | - |
