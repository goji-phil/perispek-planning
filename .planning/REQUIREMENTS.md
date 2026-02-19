# Requirements: WasteWater Insights Platform

**Defined:** 2026-02-19
**Core Value:** Operations managers can understand the health of their entire pipe network at a glance and drill into any asset to see condition scores, live sensor readings, and scheduled work — in one place.

---

## v1 Requirements

### Navigation & App Shell

- [ ] **NAV-01**: User can navigate between Dashboard, Map, System Insights, and Work Orders via sidebar/nav
- [ ] **NAV-02**: Active section is clearly indicated in navigation
- [x] **NAV-03**: App layout is pixel-perfect to Figma (global chrome, typography, color system)

### Dashboard

- [ ] **DASH-01**: User can see an overall system health score representing network-wide asset condition
- [ ] **DASH-02**: User can see a count of active alerts/anomalies (IoT threshold breaches and critical NASSCO scores)
- [ ] **DASH-03**: User can see total asset counts by type (pipes, manholes, storm drains)
- [ ] **DASH-04**: User can see a recent activity feed (latest inspections, work orders, sensor triggers)
- [ ] **DASH-05**: User can see inspection footage progress vs. consent decree target (linear feet inspected this week/month/quarter as a progress bar)
- [ ] **DASH-06**: User can see risk score distribution across the network (how many assets are low/medium/high/critical risk)

### Map View

- [ ] **MAP-01**: User can view all assets (pipes, manholes, storm drains) plotted on a GIS map using the Esri ArcGIS Maps SDK
- [ ] **MAP-02**: Assets are color-coded by NASSCO condition grade (green = good, yellow = fair, red = poor/critical)
- [ ] **MAP-03**: IoT sensor assets display a status overlay icon reflecting current d/D alert state (normal / warning / overflow)
- [ ] **MAP-04**: User can click any asset to see a quick-preview popup/panel (name, type, condition score, risk score, d/D if applicable)
- [ ] **MAP-05**: User can filter/toggle asset layers by type and condition range

### Hybrid Map + Data View

- [ ] **HYBRID-01**: User can view the map alongside a data panel (asset list or table) simultaneously
- [ ] **HYBRID-02**: Selecting an asset in the data panel highlights it on the map, and vice versa
- [ ] **HYBRID-03**: Data panel is sortable/filterable by condition, risk score, and asset type

### Asset Detail

- [ ] **ASSET-01**: User can view NASSCO condition scores (PACP grade for pipes, MACP grade for manholes) and defect codes
- [ ] **ASSET-02**: User can view inspection history (list of past CCTV inspection dates, scores, and inspector notes)
- [ ] **ASSET-03**: User can view current IoT sensor readings — depth, flow rate, and d/D ratio with status indicator
- [ ] **ASSET-04**: User can view a time-series chart of d/D ratio and flow rate over past 7/30/90 days
- [ ] **ASSET-05**: User can view asset metadata — pipe material, diameter, install year, GPS location, upstream/downstream connections
- [ ] **ASSET-06**: User can view the asset's risk score (CoF × LoF / 2) displayed as a numeric value and color band (low/medium/high/critical)
- [ ] **ASSET-07**: User can see the d/D warning threshold configured for this asset
- [ ] **ASSET-08**: User can create a work order directly from the asset detail view

### Work Orders

- [ ] **WO-01**: User can create a work order from any asset, with fields for type, priority, description, and due date
- [ ] **WO-02**: User can view a list of all work orders filterable by status (open/in-progress/complete), priority, and asset type
- [ ] **WO-03**: User can view a work order detail page showing linked asset, description, status history, and notes

### System Insights

- [ ] **INSIGHT-01**: User can see a condition trend chart showing network health score over time (is the network improving or degrading?)
- [ ] **INSIGHT-02**: User can see a ranked list of top at-risk assets sorted by risk score (CoF × LoF / 2)
- [ ] **INSIGHT-03**: User can see an IoT anomaly summary — which sensors have triggered d/D warnings or overflows recently
- [ ] **INSIGHT-04**: User can see inspection coverage metrics — % of assets inspected within the past 1, 3, and 5 years
- [ ] **INSIGHT-05**: User can see inspection footage totals per week/month/quarter against consent decree targets

### Mock Data

- [ ] **DATA-01**: Seeded dataset of ~50–100 assets (mix of pipes, manholes, storm drains) with realistic GIS coordinates
- [ ] **DATA-02**: Each asset has NASSCO condition data — PACP/MACP grade (1–5), defect codes, 2–3 historical inspection records
- [ ] **DATA-03**: Each asset has a CoF score, LoF score, and derived risk score (CoF × LoF / 2)
- [ ] **DATA-04**: IoT-enabled assets have seeded sensor readings — current d/D ratio, flow rate, and 90 days of historical time-series data
- [ ] **DATA-05**: d/D warning thresholds are set per asset (varying between 0.6–0.85 to demonstrate customization)
- [ ] **DATA-06**: Work order seed data — mix of open, in-progress, and completed orders across asset types
- [ ] **DATA-07**: Inspection footage seed data aligned to consent decree targets (some periods on-track, some lagging — realistic demo)

---

## v2 Requirements

### Authentication

- **AUTH-01**: User can log in with email/password
- **AUTH-02**: Role-based access (operations manager vs. engineer/analyst views)
- **AUTH-03**: Multi-tenant support (different utility customers)

### Engineer / Analyst Views

- **ENG-01**: Engineer can view detailed NASSCO defect code breakdown with severity analysis
- **ENG-02**: Engineer can compare assets across inspection cycles
- **ENG-03**: Engineer can export condition data to CSV/PDF for reporting

### Work Order Enhancements

- **WO-04**: Assign work order to a specific crew member or team
- **WO-05**: Field crew can update work order status from mobile

### Real Data Integration

- **INT-01**: ESRI GIS data import via onboarding flow
- **INT-02**: Live IoT sensor feed integration
- **INT-03**: NASSCO inspection software API integration

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time data ingestion | Prototype uses mock data; live integrations are post-MVP |
| Authentication / login | Demo prototype; auth adds complexity without demo value |
| Mobile app | Web-first; mobile is a future phase |
| PDF / report exports | Post-MVP for engineer/analyst users |
| Field crew workflows | Separate user persona, post-MVP |
| Video playback of CCTV footage | High complexity, storage-intensive; post-MVP |
| Billing / subscription management | Not relevant to prototype |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Complete |
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| DATA-04 | Phase 1 | Pending |
| DATA-05 | Phase 1 | Pending |
| DATA-06 | Phase 1 | Pending |
| DATA-07 | Phase 1 | Pending |
| DASH-01 | Phase 2 | Pending |
| DASH-02 | Phase 2 | Pending |
| DASH-03 | Phase 2 | Pending |
| DASH-04 | Phase 2 | Pending |
| DASH-05 | Phase 2 | Pending |
| DASH-06 | Phase 2 | Pending |
| MAP-01 | Phase 3 | Pending |
| MAP-02 | Phase 3 | Pending |
| MAP-03 | Phase 3 | Pending |
| MAP-04 | Phase 3 | Pending |
| MAP-05 | Phase 3 | Pending |
| HYBRID-01 | Phase 4 | Pending |
| HYBRID-02 | Phase 4 | Pending |
| HYBRID-03 | Phase 4 | Pending |
| ASSET-01 | Phase 4 | Pending |
| ASSET-02 | Phase 4 | Pending |
| ASSET-03 | Phase 4 | Pending |
| ASSET-04 | Phase 4 | Pending |
| ASSET-05 | Phase 4 | Pending |
| ASSET-06 | Phase 4 | Pending |
| ASSET-07 | Phase 4 | Pending |
| ASSET-08 | Phase 4 | Pending |
| WO-01 | Phase 5 | Pending |
| WO-02 | Phase 5 | Pending |
| WO-03 | Phase 5 | Pending |
| INSIGHT-01 | Phase 6 | Pending |
| INSIGHT-02 | Phase 6 | Pending |
| INSIGHT-03 | Phase 6 | Pending |
| INSIGHT-04 | Phase 6 | Pending |
| INSIGHT-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 39
- Unmapped: 0

---
*Requirements defined: 2026-02-19*
*Last updated: 2026-02-19 after roadmap creation*
