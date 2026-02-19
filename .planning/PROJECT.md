# WasteWater Insights Platform

## What This Is

A pixel-perfect working prototype of a wastewater infrastructure management platform, built from Figma designs. It gives operations managers a unified view of their sewer and stormwater assets — combining NASSCO condition assessment data (from CCTV inspections) and real-time IoT sensor data (depth and flow) into actionable insights. Powered by seeded mock data for demo purposes.

## Core Value

Operations managers can understand the health of their entire pipe network at a glance and drill into any asset to see condition scores, live sensor readings, and scheduled work — in one place.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Dashboard showing system-wide KPIs and asset health summary
- [ ] GIS map view of all assets (pipes, manholes, storm drains) with NASSCO condition overlays
- [ ] Hybrid map + data view for cross-referencing spatial and tabular data
- [ ] System insights view with trends, anomalies, and performance metrics
- [ ] Asset detail view with NASSCO scores, IoT sensor readings (current + historical), and inspection history
- [ ] Work order creation and assignment from any asset
- [ ] Seeded mock data for NASSCO condition assessments and IoT sensor readings (depth/flow)
- [ ] Pixel-perfect implementation faithful to Figma designs

### Out of Scope

- Real data ingestion pipeline — ESRI GIS data loaded via white glove onboarding (not in prototype)
- Field crew / inspector workflows — post-MVP
- Engineer/analyst views — post-MVP
- Authentication / multi-tenant — post-MVP
- PDF/data exports — post-MVP
- Mobile app — post-MVP

## Context

- Figma designs exist and will be shared via link — prototype must match them closely
- NASSCO standards: PACP (pipe) and MACP (manhole) condition grading (1–5 scale, defect codes)
- IoT data: water depth and flow rate sensors installed in manholes and key pipe junctions
- ESRI GIS data is the source of asset geometries and attributes; will be seeded as mock data for prototype
- Primary demo audience: operations managers at wastewater utilities
- Engineers/analysts are a secondary audience considered post-MVP

## Constraints

- **Tech Stack**: React / Next.js — chosen for ecosystem fit
- **Map Library**: Esri ArcGIS Maps SDK for JavaScript — native fit for ESRI data format
- **Data**: Mock/seeded only — no live backend integrations in prototype
- **Fidelity**: Pixel-perfect to Figma — designs are the source of truth for UI
- **Figma Access**: Designs shared via Figma link (to be provided before phase planning begins)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Esri ArcGIS JS SDK for maps | Assets originate from ESRI GIS; native SDK avoids data translation | — Pending |
| Mock data over live backend | Prototype is for demos; no infrastructure needed to stand up | — Pending |
| Next.js as framework | SSR/routing/ecosystem — standard fit for dashboard-heavy apps | — Pending |
| Operations manager as primary user | Broadest value, drives the core KPI/map/insight views | — Pending |

---
*Last updated: 2026-02-19 after initialization*
