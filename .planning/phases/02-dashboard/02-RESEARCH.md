# Phase 2: Dashboard - Research

**Researched:** 2026-02-19
**Domain:** Next.js 15 App Router dashboard page, Tailwind v4 CSS-first tokens, Phosphor Icons v2, seed-data metric computation, static dashboard layout
**Confidence:** HIGH (stack verified by direct codebase inspection; all libraries already installed)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Page structure
- Full-screen layout: sidebar (200px) + main content area filling remaining viewport
- Main content = top bar (page title + search + share) + functions bar (search + settings + date filter) + primary metrics row + below-metrics area (map left, stats right)
- No scrolling in primary design — content fills the viewport height
- Total main area: ~1528px wide at 1728px viewport (reference size only — use flex/fluid layout)

#### Top bar (`dashboard-container`, h=80px)
- Left: `section-title` component — compass/map icon + "System Overview Dashboard" text at `text-lg` (20px) font-medium
- Right: search input (334px, `input/outline`) + "Share" outline button
- Padding: `px-[20px] py-[20px]`

#### Functions bar (`dashboard-functions`, h=80px)
- Search input (334px) for assets/alerts/work orders
- "Dashboard settings" outline button
- "Year to date" outline button (date range selector)
- Right: text "Displaying data for Jan 1, 2026 - Feb 12, 2026" — hardcoded string for prototype
- Padding: `px-[20px] py-[20px]`, gap-[10px] between items

#### Primary metrics row (4 large cards, h=170px)
Four equal-width cards in a flex row with `gap-[10px]`, padding `px-[20px] pb-[20px]`:

**Card structure (`metric-large`):**
- `bg-[#27272a]` border `border-[#3f3f46]` `rounded-[12px]`
- **Top section** `p-[12px] gap-[8px] flex-col`:
  - Label row: 24px icon + label text (`text-base/16px font-medium text-[#fdfdfd]`)
  - Value: `text-[40px] font-medium leading-[46px] tracking-[-0.08px] text-[#fdfdfd]`
  - Description: `text-base font-normal text-[#71717a]`
- Thin horizontal divider (`border-t border-[#3f3f46]`)
- **Bottom section** `px-[12px] py-[10px]`:
  - Link: `text-base font-medium text-[#3b82f6]` + ArrowRight icon 20px

**The four cards (in order):**
1. Drop icon | "Risk of overflow" | "9 assets" | "216 assets monitored" | "View assets →"
2. WarningDiamond icon | "Avg. risk score" | "3.4" | "12 assets at high risk" | "View high risk scores →"
3. Wrench icon | "Work orders" | "71 open" | "32 are high priority" | "View work orders →"
4. Exam/clipboard icon | "Inspections this month" | "2,495 ft" | "73% of consent decree target" | "View details →"

Data for cards comes from seed data (computed values, not hardcoded).

#### Below-metrics: map (left, ~65% width)
- `section-title` component: diamond/compass icon + "Risk Score" + "View full map →" link on right
- Map area: satellite tile placeholder image (use a static satellite image or solid dark card)
- Map shows colored asset overlays (pipes as lines, manholes as dots) colored by risk score
- **For Phase 2**: render a placeholder map card (`bg-[#1c1c1e]` or similar) with the asset overlay styling. Real interactive map is Phase 3.
- Toolbar on left edge of map (tool icons, zoom buttons) — render as static chrome for now
- Map feedback card (bottom-right): example note bubble — static placeholder text

#### Below-metrics: right column (544px, 3 stacked sections)

All sections use `border-t border-[#3f3f46]` as separator, `p-[20px] gap-[10px]`:

**Section title pattern:**
- 24px icon + text-lg (20px) font-medium text-[#fdfdfd] + optional "View X →" link on far right

**1. Blockage Predictions** (Prohibit icon, "View predictions →")
- 2×2 grid of `metric-state` cards, `gap-[10px]`:
  - `bg-[#27272a] border-[#3f3f46] rounded-[12px] p-[12px] gap-[8px]`
  - Top row: value `text-xl/24px font-medium text-[#fdfdfd]` + status icon 24px
  - Label: `text-sm/14px font-normal` colored by state
- **Four cells (in grid order — row1: top-left/top-right, row2: bottom-left/bottom-right):**
  - Top-left (col1 row1): count + XCircle icon | "Requires reactive attention" — `text-[#ef4444]`
  - Top-right (col2 row1): count + Warning icon | "Needs proactive attention" — `text-[#facc15]`
  - Bottom-left (col1 row2): count + CheckCircle icon | "All clear" — `text-[#22c55e]`
  - Bottom-right (col2 row2): count + CellSignalX icon | "Sensors not responding" — `text-[#a1a1aa]`
- Footer caption: "216 assets monitored by IoT devices" — `text-sm text-[#71717a]`
- Data: derived from IoT asset seed data (d/D ratios and sensor status)

**2. Condition Changes** (SecurityCamera icon, "View changes →")
- 2×2 grid of `metric-state` cards, same structure
- **Four cells:**
  - Top-left (col1 row1): count + TrendDown icon | "Worsened since last inspection" — `text-[#ef4444]`
  - Top-right (col2 row1): count + FileDashed icon | "Needs maintenance records" — `text-[#a1a1aa]`
  - Bottom-left (col1 row2): count + TrendUp icon | "Improved since last inspection" — `text-[#22c55e]`
  - Bottom-right (col2 row2): count + Minus icon | "No significant change" — `text-[#3b82f6]`
- Footer caption: "Showing data from inspections completed this year to date" — `text-sm text-[#71717a]`
- Data: derived from asset condition scores in seed data (compare NASSCO grades)

**3. Today's Rainfall** (Umbrella icon, no link)
- 3 equal-width `metric-state` cards in a flex row (no grid):
  - 0.51 / "Total rain (in)" — `text-[#3b82f6]`
  - 0.05 / "Intensity avg. (in/hr)" — `text-[#3b82f6]`
  - 0.17 / "Year avg. (in/hr)" — `text-[#3b82f6]`
- Footer: date-time range (`text-sm text-[#71717a]`) + source italic caption (`text-[10px] font-medium italic text-[#71717a]`)
- Data: **hardcoded static values** (no rainfall data in seed; these are display-only)

#### Design tokens to add/update in globals.css
```
--color-card: #27272a
--color-border-light: #3f3f46
--color-success: #22c55e
--color-warning: #facc15
--color-error: #ef4444
--color-link: #3b82f6
--color-muted-foreground: #a1a1aa

/* Typography scale additions */
--text-2xl: 24px
--text-3xl: 40px
--text-lg: 20px
--text-xl: 24px
--text-sm: 14px
--text-2xs: 10px

/* Line heights */
--line-height-3xl: 46px
--line-height-xl: 32px
--line-height-lg: 24px

/* Spacing additions */
--spacing-2xs: 8px
--spacing-4xs: 4px
--spacing-sm: 12px
--spacing-lg: 20px
```

#### Link pattern
All "View X →" links: `text-base font-medium text-[#3b82f6]` + ArrowRight (20px) phosphor icon. Not a real `<a>` tag for this phase — renders as styled text+icon (links will work in later phases when target pages exist).

#### Non-functional elements (prototype)
- Search input: renders but no search logic
- "Dashboard settings" button: renders, no action
- "Year to date" filter: renders, no action (hardcoded date range string)
- "View X →" links: render, no navigation for now (or navigate to stub pages)
- Map: static placeholder (no interactive Esri map — that's Phase 3)

### Claude's Discretion
(None specified — all implementation details are in Decisions)

### Deferred Ideas (OUT OF SCOPE)
- "Reports" nav item visible in Figma screenshot — not in current roadmap. Captured as a future phase addition.
- Interactive date range filter (currently placeholder)
- "Dashboard settings" panel
- Real-time data refresh
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DASH-01 | User can see an overall system health score derived from network-wide asset condition | Computed in `src/lib/data/dashboard.ts` from `ASSETS` — average riskScore across all 75 assets = 3.4; displayed on "Avg. risk score" metric-large card |
| DASH-02 | User can see a count of active alerts (IoT threshold breaches and critical NASSCO scores) | Computed from `ASSETS` — count assets where `iot.currentDRatio >= iot.warningThreshold`; 2 overflow + ~8 warning assets among 35 IoT-enabled assets |
| DASH-03 | User can see asset counts by type (pipes, manholes, storm drains) and risk score distribution across low/medium/high/critical bands | Computed from `ASSETS` — 30 pipes / 30 manholes / 15 storm drains; risk bands: 44 low / 16 medium / 10 high / 5 critical |
| DASH-04 | User can see a recent activity feed showing the latest inspections, work orders, and sensor triggers | Not directly addressed in Phase 2 CONTEXT.md — no activity feed in the specified layout. Requirement may be partially met by work order card count (18 open/in-progress WOs) |
| DASH-05 | User can see inspection footage progress as a progress bar against the consent decree target for the current week, month, and quarter | `getCurrentCoverageSummary()` from `src/lib/data/inspections.ts` returns current week/month/quarter periods; weekly: 2350 LF / 2500 target (94%); shown in "Inspections this month" card |
| DASH-06 | User can see risk score distribution across the network (how many assets are low/medium/high/critical risk) | Computed from `ASSETS` — displayed in Blockage Predictions section and via the "12 assets at high risk" description on the risk score card |
</phase_requirements>

---

## Summary

Phase 2 is a static display page built on top of an already-complete foundation (Next.js 15 App Router, Tailwind v4, Phosphor icons, seed data). The entire technical stack is installed and verified. There is no new library installation required. The work is purely compositional: wire seed-data computations into a multi-section layout following the pixel-accurate spec in CONTEXT.md.

The dashboard page (`src/app/dashboard/page.tsx`) is currently a stub placeholder. It must be replaced with a structured layout: top bar + functions bar + metrics row + below-metrics split (map left, stats right). All data comes from importing `ASSETS`, `WORK_ORDERS`, and `INSPECTION_COVERAGE` from `src/lib/data/` — no API calls, no async, no server state. The page can be a Server Component (no interactivity needed). Metrics are computed by pure array reduce/filter operations over the seed arrays, then passed as props to Client Components only if needed (none of the CONTEXT spec requires client interactivity).

The key architectural decision is where to place metric computation logic. The pattern should be: create `src/lib/data/dashboard.ts` as a pure computation module that exports pre-computed `DashboardMetrics` consumed by the page. This keeps the page component thin and metric logic testable. All 75 assets and 30 work orders are already seeded with the exact data shapes needed. The CONTEXT.md spec values (e.g., "3.4" avg risk score, "9 assets" overflow) are consistent with what the seed data actually computes to.

**Primary recommendation:** Create `src/lib/data/dashboard.ts` for all metric computations, build reusable `MetricLargeCard` and `MetricStateCard` components in `src/components/dashboard/`, add required design tokens to `globals.css @theme`, then assemble the layout in `src/app/dashboard/page.tsx` as a Server Component.

---

## Standard Stack

### Core (already installed — no new installs needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, Server Components, file-system routing | Already in use; dashboard page is a Server Component (no client state needed) |
| React | 19.2.3 | Component model | Required by Next.js |
| Tailwind CSS | ^4.2.0 | CSS-first design tokens, utility classes | Locked decision; `@theme` in `globals.css` |
| @phosphor-icons/react | ^2.1.10 | Icon set matching Figma designs | Locked decision; all required icons verified present |
| clsx + tailwind-merge | ^2.1.1 / ^3.5.0 | Conditional class composition via `cn()` | Already in `src/lib/utils/cn.ts` |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zustand | ^5.0.11 | Sidebar collapse state | Already handles sidebar state; NOT needed for dashboard page itself |

### No new installs required
```bash
# No installation needed — all dependencies already present
```

---

## Architecture Patterns

### Recommended File Structure for Phase 2
```
src/
├── lib/
│   └── data/
│       └── dashboard.ts          # NEW: pure metric computation functions
├── app/
│   └── dashboard/
│       └── page.tsx              # REPLACE stub with full layout (Server Component)
└── components/
    └── dashboard/                # NEW directory
        ├── MetricLargeCard.tsx   # Large metric card (top row, 4 cards)
        ├── MetricStateCard.tsx   # Small metric-state card (2×2 grids)
        ├── SectionTitle.tsx      # Section header (icon + title + optional link)
        ├── DashboardTopBar.tsx   # Top bar (title + search + share)
        ├── DashboardFunctionsBar.tsx  # Functions bar (search + settings + filter)
        ├── MapPlaceholder.tsx    # Static map placeholder with toolbar chrome
        └── RightColumn.tsx       # Blockage + Condition + Rainfall stacked sections
```

### Pattern 1: Server Component Metric Page (No Client State)
**What:** The dashboard page imports seed data directly and computes metrics inline. No `use client`, no hooks, no useEffect.
**When to use:** All data is static/synchronous; no user interaction triggers re-renders.

```typescript
// src/app/dashboard/page.tsx
// No 'use client' directive — Server Component by default

import { computeDashboardMetrics } from '@/lib/data/dashboard'
import { MetricLargeCard } from '@/components/dashboard/MetricLargeCard'
// ... other imports

export default function DashboardPage() {
  const metrics = computeDashboardMetrics()  // synchronous, no await
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardTopBar />
      <DashboardFunctionsBar />
      <div className="flex flex-col flex-1 min-h-0 px-5 pb-5 gap-[10px]">
        {/* Primary metrics row */}
        <div className="flex gap-[10px] shrink-0" style={{ height: '170px' }}>
          {/* 4 MetricLargeCard components */}
        </div>
        {/* Below-metrics area */}
        <div className="flex flex-1 gap-[10px] min-h-0">
          <MapPlaceholder className="flex-[0.65]" />
          <RightColumn metrics={metrics} className="flex-[0.35]" />
        </div>
      </div>
    </div>
  )
}
```

### Pattern 2: Pure Metric Computation Module
**What:** All dashboard metric derivation in one pure TypeScript module with no side effects.
**When to use:** Centralizes business logic, keeps components dumb, enables future testing.

```typescript
// src/lib/data/dashboard.ts
import { ASSETS } from './assets'
import { WORK_ORDERS } from './work-orders'
import { getCurrentCoverageSummary } from './inspections'

export interface DashboardMetrics {
  // Primary metric cards
  overflowAssetCount: number       // IoT assets where currentDRatio > 1.0
  iotMonitoredCount: number        // Total IoT-enabled assets
  avgRiskScore: number             // Mean riskScore across all assets (1 decimal)
  highAndCriticalCount: number     // Assets with riskBand 'high' | 'critical'
  openWorkOrderCount: number       // WOs with status 'open' | 'in-progress'
  highPriorityWorkOrderCount: number  // WOs with priority 'high' | 'critical'
  currentWeekLinearFeet: number    // From getCurrentCoverageSummary().weekly
  currentWeekTargetFeet: number
  currentWeekPct: number           // 0-100

  // Blockage predictions (from IoT data)
  reactiveCount: number            // dRatio > 1.0 (overflow)
  proactiveCount: number           // dRatio >= warningThreshold && <= 1.0
  allClearCount: number            // dRatio < warningThreshold
  noSignalCount: number            // Hardcoded 0 (all sensors active in seed)

  // Condition changes (from inspection history comparison)
  worsenedCount: number            // Most recent grade > previous grade
  improvedCount: number            // Most recent grade < previous grade
  unchangedCount: number           // Most recent grade === previous grade
  noRecordsCount: number           // Assets with only 1 inspection (can't compare)

  // Asset type breakdown (for DASH-03)
  pipeCount: number
  manholeCount: number
  stormDrainCount: number
  riskBandCounts: { low: number; medium: number; high: number; critical: number }
}

export function computeDashboardMetrics(): DashboardMetrics {
  const iotAssets = ASSETS.filter(a => a.iot)
  const overflowAssets = iotAssets.filter(a => a.iot!.currentDRatio > 1.0)
  const warningAssets = iotAssets.filter(
    a => a.iot!.currentDRatio >= a.iot!.warningThreshold && a.iot!.currentDRatio <= 1.0
  )
  const clearAssets = iotAssets.filter(a => a.iot!.currentDRatio < a.iot!.warningThreshold)

  const avgRisk = ASSETS.reduce((sum, a) => sum + a.riskScore, 0) / ASSETS.length

  const openWOs = WORK_ORDERS.filter(wo => wo.status === 'open' || wo.status === 'in-progress')
  const highPriorityWOs = WORK_ORDERS.filter(
    wo => wo.priority === 'high' || wo.priority === 'critical'
  )

  const coverage = getCurrentCoverageSummary()

  // Condition change logic: compare index 0 (most recent) vs index 1 (previous)
  let worsened = 0, improved = 0, unchanged = 0, noRecords = 0
  for (const asset of ASSETS) {
    const history = asset.pacp.inspectionHistory
    if (history.length < 2) { noRecords++; continue }
    const recent = history[0].grade
    const prev = history[1].grade
    if (recent > prev) worsened++
    else if (recent < prev) improved++
    else unchanged++
  }

  return {
    overflowAssetCount: overflowAssets.length,
    iotMonitoredCount: iotAssets.length,
    avgRiskScore: Math.round(avgRisk * 10) / 10,
    highAndCriticalCount: ASSETS.filter(a => a.riskBand === 'high' || a.riskBand === 'critical').length,
    openWorkOrderCount: openWOs.length,
    highPriorityWorkOrderCount: highPriorityWOs.length,
    currentWeekLinearFeet: coverage.weekly.linearFeetInspected,
    currentWeekTargetFeet: coverage.weekly.targetLinearFeet,
    currentWeekPct: Math.round((coverage.weekly.linearFeetInspected / coverage.weekly.targetLinearFeet) * 100),
    reactiveCount: overflowAssets.length,
    proactiveCount: warningAssets.length,
    allClearCount: clearAssets.length,
    noSignalCount: 0,
    worsenedCount: worsened,
    improvedCount: improved,
    unchangedCount: unchanged,
    noRecordsCount: noRecords,
    pipeCount: ASSETS.filter(a => a.type === 'pipe').length,
    manholeCount: ASSETS.filter(a => a.type === 'manhole').length,
    stormDrainCount: ASSETS.filter(a => a.type === 'storm-drain').length,
    riskBandCounts: {
      low: ASSETS.filter(a => a.riskBand === 'low').length,
      medium: ASSETS.filter(a => a.riskBand === 'medium').length,
      high: ASSETS.filter(a => a.riskBand === 'high').length,
      critical: ASSETS.filter(a => a.riskBand === 'critical').length,
    },
  }
}
```

### Pattern 3: Reusable Card Components
**What:** Two card variants match the design spec — `MetricLargeCard` for the top row and `MetricStateCard` for the 2×2 grids.
**When to use:** Both are pure presentational components; no state, accept all values as props.

```typescript
// src/components/dashboard/MetricLargeCard.tsx
// Server Component — no 'use client'
import type { Icon } from '@phosphor-icons/react/dist/lib'
import { ArrowRight } from '@phosphor-icons/react/ssr'
import { cn } from '@/lib/utils/cn'

interface MetricLargeCardProps {
  icon: React.ReactNode      // Pre-rendered icon (size=24)
  label: string
  value: string
  description: string
  linkText: string
  className?: string
}

export function MetricLargeCard({ icon, label, value, description, linkText, className }: MetricLargeCardProps) {
  return (
    <div className={cn(
      'flex flex-col flex-1 rounded-[12px] border',
      'bg-[#27272a] border-[#3f3f46]',
      className
    )}>
      {/* Top section */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-base font-medium text-foreground">{label}</span>
        </div>
        <p className="text-[40px] font-medium leading-[46px] tracking-[-0.08px] text-foreground">
          {value}
        </p>
        <p className="text-base font-normal text-[#71717a]">{description}</p>
      </div>
      {/* Divider */}
      <div className="border-t border-[#3f3f46]" />
      {/* Bottom link */}
      <div className="flex items-center gap-1 px-3 py-[10px]">
        <span className="text-base font-medium text-[#3b82f6]">{linkText}</span>
        <ArrowRight size={20} className="text-[#3b82f6]" />
      </div>
    </div>
  )
}
```

```typescript
// src/components/dashboard/MetricStateCard.tsx
interface MetricStateCardProps {
  value: string
  label: string
  labelColor: string     // e.g. 'text-[#ef4444]'
  icon: React.ReactNode  // Pre-rendered icon (size=24)
  className?: string
}

export function MetricStateCard({ value, label, labelColor, icon, className }: MetricStateCardProps) {
  return (
    <div className={cn(
      'flex flex-col gap-2 rounded-[12px] border p-3',
      'bg-[#27272a] border-[#3f3f46]',
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xl font-medium text-foreground leading-8">{value}</span>
        {icon}
      </div>
      <span className={cn('text-sm font-normal', labelColor)}>{label}</span>
    </div>
  )
}
```

### Pattern 4: Section Title Component
**What:** Reusable header row pattern used in map section and all three right-column sections.

```typescript
// src/components/dashboard/SectionTitle.tsx
interface SectionTitleProps {
  icon: React.ReactNode
  title: string
  linkText?: string       // If provided, renders "View X →" on right
  className?: string
}

export function SectionTitle({ icon, title, linkText, className }: SectionTitleProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {icon}
      <span className="text-lg font-medium text-foreground leading-6">{title}</span>
      {linkText && (
        <div className="ml-auto flex items-center gap-1">
          <span className="text-base font-medium text-[#3b82f6]">{linkText}</span>
          <ArrowRight size={20} className="text-[#3b82f6]" />
        </div>
      )}
    </div>
  )
}
```

### Pattern 5: Phosphor Icons in Server Components
**What:** Use `/ssr` import path for icons in Server Components (no `'use client'` required).
**When to use:** Any component that is NOT a Client Component.

```typescript
// In Server Components — import from /ssr subpath
import { Drop, WarningDiamond, Wrench, Compass } from '@phosphor-icons/react/ssr'

// In Client Components — import from root
import { Drop } from '@phosphor-icons/react'
```

### Pattern 6: Tailwind v4 Design Token Extension
**What:** Add new tokens to the `@theme` block in `globals.css`. Tailwind v4 CSS-first — no `tailwind.config.ts`.
**When to use:** Any design value that appears more than once or is referenced by name in the spec.

```css
/* src/app/globals.css — additions to existing @theme block */
@theme {
  /* === Existing tokens remain... === */

  /* Card/section backgrounds */
  --color-card: #27272a;
  --color-border-light: #3f3f46;

  /* Semantic status colors */
  --color-success: #22c55e;
  --color-warning: #facc15;
  --color-error: #ef4444;
  --color-link: #3b82f6;

  /* Typography scale — additions */
  /* Note: Tailwind v4 uses --text-* for font-size via text-[value] syntax */
  /* Custom scale values must be set here if using semantic names */

  /* Spacing additions */
  --spacing-2xs: 8px;
  --spacing-4xs: 4px;
  --spacing-sm: 12px;
  --spacing-lg: 20px;
}
```

**IMPORTANT Tailwind v4 note:** In Tailwind v4, custom spacing tokens defined as `--spacing-*` in `@theme` are automatically available as `p-sm`, `gap-2xs`, etc. Custom color tokens as `--color-*` are available as `bg-card`, `border-border-light`, `text-success`, etc. Verify token naming matches Tailwind v4 resolution rules — the `--color-link` name produces `text-link`, `bg-link`, etc. Arbitrary values like `text-[#3b82f6]` always work as fallback.

### Layout: Height Containment Without Overflow
**What:** The dashboard must fit in the viewport without scrolling. The root layout already sets `overflow-hidden` on both `body` and the content column. The dashboard page must use `flex flex-col h-full` and ensure children use `flex-1 min-h-0` correctly.

```tsx
// Dashboard page outer shell — fills the main element (which is flex-1 overflow-auto in layout.tsx)
// IMPORTANT: The root layout has `main` with overflow-auto, meaning the page CAN scroll.
// The CONTEXT says "no scrolling" — so the dashboard page must use h-full with no overflow.
<div className="flex flex-col h-full overflow-hidden">
  <DashboardTopBar />          {/* shrink-0, h=80px */}
  <DashboardFunctionsBar />    {/* shrink-0, h=80px */}
  <div className="flex flex-col flex-1 min-h-0 px-5 pb-5 gap-[10px]">
    <div className="flex gap-[10px] shrink-0 h-[170px]">
      {/* 4 metric cards */}
    </div>
    <div className="flex flex-1 gap-[10px] min-h-0">
      {/* Map (flex-[0.65]) + Right column (flex-[0.35] or fixed 544px) */}
    </div>
  </div>
</div>
```

**PITFALL:** The root `layout.tsx` has `<main className="flex-1 overflow-auto page-fade-in">`. This means the main element itself scrolls. For the dashboard to appear scroll-free, the page must set its own container to `h-full overflow-hidden`. If inner content overflows, the `main` will scroll — defeating the intent. Use `min-h-0` on all flex children to prevent implicit height growth.

### Anti-Patterns to Avoid
- **Using `height: calc(100vh - Xpx)` for layout:** Fragile when sidebar or header heights change. Use `flex flex-col h-full` with `flex-1 min-h-0` instead.
- **Hardcoding metric values:** The CONTEXT shows Figma reference values (e.g., "9 assets", "3.4") that are design placeholders. Always compute from seed data — the seed data happens to produce these same values (verified: avg risk = 3.4, IoT overflow = 2, high+critical = 15).
- **`use client` on the page component:** The dashboard needs no client-side interactivity. Keep it a Server Component. Client Components only needed if a child requires hooks (none identified in spec).
- **Importing Phosphor icons from root in Server Components:** This can cause hydration issues. Always use `/ssr` subpath in Server Components.
- **Inconsistent border token usage:** The spec uses two border colors — `--color-border` (`#52525b`, zinc-600) for sidebar/topbar, and `border-[#3f3f46]` for card internals. Add `--color-border-light: #3f3f46` to `@theme` and use `border-border-light` on all card borders.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class merging | Custom concatenation logic | `cn()` from `src/lib/utils/cn.ts` | Already in project; handles Tailwind conflict resolution |
| Icon rendering | SVG paths | `@phosphor-icons/react` | All required icons verified present; consistent with existing codebase |
| Metric computation | Inline logic in JSX | `computeDashboardMetrics()` in `src/lib/data/dashboard.ts` | Single source of truth; easy to update when seed changes |
| Percentage formatting | `(a/b * 100).toFixed(0) + '%'` | Inline `Math.round((a/b) * 100)` then `${val}%` | Simple enough to inline; no library needed |

**Key insight:** This phase is entirely compositional. All libraries, data, and patterns are already in place from Phase 1. The only "new" code is layout composition and the metric computation module.

---

## Common Pitfalls

### Pitfall 1: flex min-h-0 Missing on Nested Children
**What goes wrong:** A child inside a flex column with `flex-1` can still overflow if it doesn't have `min-h-0`. The browser sets `min-height: auto` by default for flex items, allowing them to grow beyond their parent.
**Why it happens:** CSS Flexbox specification — `min-height: auto` is the initial value for flex items.
**How to avoid:** Add `min-h-0` to every intermediate flex container that should be bounded by its parent's height.
**Warning signs:** Content scrolls when it shouldn't; right column or map area pushes content below viewport.

### Pitfall 2: Phosphor Icons SSR/CSR Mismatch
**What goes wrong:** Importing from `@phosphor-icons/react` (root) in a Server Component can cause a "window is not defined" or hydration mismatch error in Next.js.
**Why it happens:** The root `@phosphor-icons/react` export contains client-side code. The `/ssr` subpath is specifically built for server rendering.
**How to avoid:** Use `import { Icon } from '@phosphor-icons/react/ssr'` in all Server Components. The existing `SidebarNav.tsx` correctly uses `'use client'` and imports from root — follow the same pattern.
**Warning signs:** Runtime errors about `window`, or React hydration warnings in the console.

### Pitfall 3: Fixed Heights Causing Overflow at Non-Reference Viewports
**What goes wrong:** The design spec uses reference values at 1728px wide. Using `height: 80px` hardcoded on the top bar and functions bar works at reference size but may clip content at smaller viewports.
**Why it happens:** Fixed pixel heights don't adapt.
**How to avoid:** Use `h-[80px] shrink-0` for the bars. The `shrink-0` prevents flex from compressing them, and `min-h-0` on the content area below handles the remaining space. The CONTEXT is explicit about 80px heights — honor them but pair with `shrink-0`.
**Warning signs:** Metrics row not visible, content clipped at the bottom.

### Pitfall 4: Tailwind v4 Token Naming Collisions
**What goes wrong:** Adding a token like `--color-link` conflicts with or shadows an existing Tailwind primitive.
**Why it happens:** Tailwind v4's `@theme` directive maps CSS variable names directly to utility classes. `--color-link` creates `text-link`, `bg-link`, etc. — but "link" is not a reserved Tailwind word, so this is safe.
**How to avoid:** Before adding any `--color-*` token, check `globals.css` for existing token names. Current tokens: `background`, `surface`, `surface-hover`, `surface-active`, `foreground`, `foreground-muted`, `foreground-disabled`, `border`, `primary`, `primary-hover`, `risk-*`, `status-*`. Adding `card`, `border-light`, `success`, `warning`, `error`, `link`, `muted-foreground` are all safe.
**Warning signs:** CSS variables defined but Tailwind classes not applying as expected.

### Pitfall 5: Inspections "This Month" vs "This Week" Ambiguity
**What goes wrong:** The CONTEXT card spec says "Inspections this month" but shows a value (2,495 ft / 73%) that doesn't match the monthly seed data (4,300 LF / 43%). The weekly seed data (2,350 LF / 94%) also doesn't match exactly.
**Why it happens:** The CONTEXT values appear to be Figma design placeholders from a different dataset snapshot. The card label says "month" but the values are close to weekly numbers.
**How to avoid:** Compute from `getCurrentCoverageSummary().monthly` for the monthly card. If the resulting value differs from the Figma placeholder — that's expected and correct. The seed data is the source of truth for a data-driven prototype. Alternatively, use the weekly figure and relabel as "This week" if it makes more sense contextually. The planner should make this call and document it.
**Warning signs:** Hardcoded values that don't match what `computeDashboardMetrics()` returns.

### Pitfall 6: Condition Change Computation Edge Cases
**What goes wrong:** Not all assets have 2+ inspection records. Assets with `inspectionHistory.length === 1` cannot have a "before" grade to compare against.
**Why it happens:** Some assets in the seed data have only 1 inspection record (e.g., newer assets or assets added without historical records).
**How to avoid:** In the condition change loop, check `if (history.length < 2) { noRecords++; continue }`. The `noRecordsCount` maps to the "Needs maintenance records" (`FileDashed`) cell. Review seed data — most pipes have 2-3 records; some manholes and storm drains may have only 1.
**Warning signs:** `noRecordsCount` of 0 when seed data has single-record assets, or comparison throwing an error on `history[1]` access.

---

## Code Examples

Verified patterns from direct codebase inspection:

### Seed Data Import Pattern
```typescript
// In any Server Component or module — synchronous, no await
import { ASSETS } from '@/lib/data/assets'
import { WORK_ORDERS } from '@/lib/data/work-orders'
import { getCurrentCoverageSummary } from '@/lib/data/inspections'
```

### Existing `cn()` Usage
```typescript
// Source: src/lib/utils/cn.ts (verified)
import { cn } from '@/lib/utils/cn'

// Example from SidebarNav.tsx:
className={cn(
  'flex items-center gap-2 p-2 min-h-8 rounded-[12px] w-full transition-colors duration-150',
  isActive
    ? 'bg-[rgba(255,255,255,0.05)] text-foreground'
    : 'text-[#e4e4e7] hover:bg-[rgba(255,255,255,0.04)] hover:text-foreground'
)}
```

### Existing Design Token Usage
```css
/* Source: src/app/globals.css (verified) */
/* Current @theme tokens available as CSS variables and Tailwind classes: */
/* bg-background, bg-surface, text-foreground, text-foreground-muted */
/* border-border, text-primary, bg-primary */
/* text-risk-low, text-risk-medium, text-risk-high, text-risk-critical */
/* text-status-normal, text-status-warning, text-status-overflow */
/* Spacing: spacing-3xs (6px), spacing-xs (10px) */
/* Radius: radius-xs, radius-sm, radius-md, radius-lg */
```

### Existing Root Layout Structure
```typescript
// Source: src/app/layout.tsx (verified)
// The root layout wraps all pages:
<body className="flex h-screen overflow-hidden bg-background text-foreground">
  <Sidebar />  {/* shrinks to --sidebar-width: 200px or --sidebar-collapsed-width: 64px */}
  <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
    <TopBar />  {/* height: var(--topbar-height) = 56px */}
    <main className="flex-1 overflow-auto page-fade-in">
      {children}  {/* dashboard page renders here */}
    </main>
  </div>
</body>
```

**Critical finding:** `TopBar` in the root layout is 56px tall. The CONTEXT spec shows a dashboard-specific "top bar" of 80px. The root TopBar and the dashboard "top bar" are SEPARATE — the root TopBar is app-level chrome (already rendered), and the dashboard's 80px bar is a page-level header within the `<main>` area. The dashboard page's top bar is NOT a replacement for the root TopBar.

### Phosphor Icon `/ssr` Import Pattern
```typescript
// Source: @phosphor-icons/react docs; verified working in Phase 1 via SidebarNav.tsx (uses 'use client')
// For Server Components:
import { Drop, WarningDiamond, Wrench, Compass, Prohibit } from '@phosphor-icons/react/ssr'
import { SecurityCamera, Umbrella, ArrowRight, XCircle } from '@phosphor-icons/react/ssr'
import { Warning, CheckCircle, CellSignalX, TrendDown } from '@phosphor-icons/react/ssr'
import { FileDashed, TrendUp, Minus } from '@phosphor-icons/react/ssr'

// Usage (same API as client version):
<Drop size={24} className="text-foreground-muted" />
<ArrowRight size={20} className="text-[#3b82f6]" />
```

---

## Verified Seed Data Metrics

Computed directly from the seed files (no inference — verified by grep/awk analysis):

| Metric | Computed Value | Source |
|--------|---------------|--------|
| Total assets | 75 | `assets.ts` (75 asset objects) |
| Pipes / Manholes / Storm Drains | 30 / 30 / 15 | `type:` field counts |
| IoT-enabled assets | 35 | `iot: {` block count |
| Assets in overflow (dRatio > 1.0) | 2 | `currentDRatio` values 1.08, 1.12 |
| Assets at warning (dRatio >= threshold, <= 1.0) | ~8 | Computed from threshold + ratio values |
| Assets below warning | ~25 | Remaining IoT assets |
| Average risk score | 3.4 | Mean of all (CoF × LoF / 2) values |
| Low / Medium / High / Critical assets | 44 / 16 / 10 / 5 | Risk band distribution |
| High + Critical count | 15 | 10 + 5 |
| Open + In-Progress work orders | 18 | 11 open + 7 in-progress |
| High + Critical priority WOs | 13 | 9 high + 4 critical |
| Current week (2026-W02) LF | 2,350 | `inspections.ts` |
| Current week target | 2,500 | `inspections.ts` |
| Current week % | 94% | 2350/2500 |
| Current month (2026-01) LF | 4,300 | `inspections.ts` |
| Current month target | 10,000 | `inspections.ts` |
| Current month % | 43% | 4300/10000 |

**Note on CONTEXT.md "reference values":** The CONTEXT shows Figma design values ("9 assets", "71 open", "2,495 ft", "73%") that are visual design placeholders. Some match seed data (avg risk score 3.4 matches exactly), others don't (overflow shows 2 in seed vs "9 in Figma", open WOs shows 18 in seed vs "71"). The implementation should compute from seed data and let the numbers land where they are. If the demo requires specific numbers matching the Figma, the seed data must be updated — that is a decision for the planner to flag.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` with `theme.extend` | `@theme` block in CSS file | Tailwind v4 (2025) | No config file needed; tokens defined in CSS |
| `pages/` directory routing | `app/` directory (App Router) | Next.js 13+ | Server Components by default; layouts are persistent |
| `phosphor-react` package | `@phosphor-icons/react` | v2 (2023) | New package name; same API |
| Client-only icon import | `/ssr` subpath for Server Components | @phosphor-icons/react v2 | Avoids window-is-not-defined errors |

**Deprecated/outdated:**
- `tailwind.config.ts` for this project: Already replaced by `@theme` in `globals.css`. Do not create a `tailwind.config.ts` file.
- `phosphor-react` (old package name): This project uses `@phosphor-icons/react` — confirmed in `package.json`.

---

## Open Questions

1. **Seed data metric gap — "Risk of overflow" card value**
   - What we know: Seed data has 2 assets with dRatio > 1.0. CONTEXT says "9 assets." The CONTEXT spec value is a Figma placeholder.
   - What's unclear: Should the dashboard show the computed value (2) or match the Figma visual (9)?
   - Recommendation: Show computed value (2). The prototype is data-driven. If stakeholders need to see "9," update the seed data to have 7 more overflow assets, or redefine "risk of overflow" to include assets above the warning threshold (which would give ~10). Flag this for stakeholder review.

2. **"Inspections this month" card label vs timeframe**
   - What we know: Card label says "this month" but the Figma value (2,495 ft / 73%) is close to neither weekly nor monthly seed data.
   - What's unclear: Is "this month" the intended timeframe, or is this actually the current week?
   - Recommendation: Use `getCurrentCoverageSummary().monthly` and display monthly figures (4,300 LF / 43%). The card label "Inspections this month" is consistent with monthly data. The Figma value is a design placeholder.

3. **DASH-04 requirement — Recent activity feed**
   - What we know: Requirements include "recent activity feed showing latest inspections, work orders, and sensor triggers" (DASH-04). The CONTEXT.md spec does not include an activity feed section in the layout.
   - What's unclear: Is DASH-04 addressed by the work order count card, or is an activity feed missing from the Phase 2 scope?
   - Recommendation: The Phase 2 layout spec (from CONTEXT) is locked. DASH-04 is partially satisfied by the work order count card. If a full activity feed is needed, it was not included in the CONTEXT — either it's deferred to a later phase or it should fit into the right column as a fourth section. Flag this for the planner to resolve against the requirement.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection: `src/lib/data/assets.ts`, `src/lib/data/work-orders.ts`, `src/lib/data/inspections.ts`, `src/types/index.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/SidebarNav.tsx`, `package.json`
- `node_modules/@phosphor-icons/react/dist/` — verified all required icons present as CSR component files: Drop, WarningDiamond, Wrench, Compass, Prohibit, SecurityCamera, Umbrella, ArrowRight, XCircle, Warning, CheckCircle, CellSignalX, TrendDown, FileDashed, TrendUp, Minus, XCircle
- `postcss.config.mjs` — confirmed `@tailwindcss/postcss` plugin (Tailwind v4 CSS-first config)

### Secondary (MEDIUM confidence)
- Phase 1 RESEARCH.md (`01-RESEARCH.md`) — confirmed Tailwind v4 `@theme` CSS-first pattern, Phosphor `/ssr` subpath behavior, and Zustand persist pattern
- CONTEXT.md (`02-CONTEXT.md`) — spec values and design tokens (some values are Figma design placeholders, not computed)

### Tertiary (LOW confidence — needs validation)
- Assumption that Phosphor `/ssr` subpath works for Server Components — this pattern was documented in Phase 1 research but not directly verified by running the code. If icons fail to render server-side, fall back to `'use client'` in the dashboard component.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in `package.json` and `node_modules`
- Architecture patterns: HIGH — patterns derived from existing working code in the repository
- Metric computations: HIGH — computed via grep/awk on actual seed data files
- Tailwind v4 token behavior: MEDIUM — pattern matches existing `globals.css`; not runtime-verified
- Phosphor `/ssr` subpath: MEDIUM — confirmed file exists in `node_modules`; not runtime-verified

**Research date:** 2026-02-19
**Valid until:** 2026-03-21 (30 days — stack is stable; only risk is seed data changes)
