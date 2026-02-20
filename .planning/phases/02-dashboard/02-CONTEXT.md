# Phase 2: Dashboard - Context

**Gathered:** 2026-02-19
**Status:** Ready for planning

<domain>
## Phase Boundary

The dashboard is the landing view at `/dashboard`. It shows the system-wide state of the wastewater network at a glance — overflow risk, average risk score, open work orders, and inspection progress — plus a live risk-score map, blockage prediction counts, condition change counts, and today's rainfall metrics. This is a read-only display view driven entirely by seed data. No user input beyond the date filter placeholder.

</domain>

<decisions>
## Implementation Decisions

### Page structure
- Full-screen layout: sidebar (200px) + main content area filling remaining viewport
- Main content = top bar (page title + search + share) + functions bar (search + settings + date filter) + primary metrics row + below-metrics area (map left, stats right)
- No scrolling in primary design — content fills the viewport height
- Total main area: ~1528px wide at 1728px viewport (reference size only — use flex/fluid layout)

### Top bar (`dashboard-container`, h=80px)
- Left: `section-title` component — compass/map icon + "System Overview Dashboard" text at `text-lg` (20px) font-medium
- Right: search input (334px, `input/outline`) + "Share" outline button
- Padding: `px-[20px] py-[20px]`

### Functions bar (`dashboard-functions`, h=80px)
- Search input (334px) for assets/alerts/work orders
- "Dashboard settings" outline button
- "Year to date" outline button (date range selector)
- Right: text "Displaying data for Jan 1, 2026 - Feb 12, 2026" — hardcoded string for prototype
- Padding: `px-[20px] py-[20px]`, gap-[10px] between items

### Primary metrics row (4 large cards, h=170px)
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

### Below-metrics: map (left, ~65% width)
- `section-title` component: diamond/compass icon + "Risk Score" + "View full map →" link on right
- Map area: satellite tile placeholder image (use a static satellite image or solid dark card)
- Map shows colored asset overlays (pipes as lines, manholes as dots) colored by risk score
- **For Phase 2**: render a placeholder map card (`bg-[#1c1c1e]` or similar) with the asset overlay styling. Real interactive map is Phase 3.
- Toolbar on left edge of map (tool icons, zoom buttons) — render as static chrome for now
- Map feedback card (bottom-right): example note bubble — static placeholder text

### Below-metrics: right column (544px, 3 stacked sections)

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

### Design tokens to add/update in globals.css

The following are needed for Phase 2 and not yet in `@theme`:
```
--color-card: #27272a            /* card background, distinct from surface */
--color-border-light: #3f3f46   /* card/section borders (lighter than main --color-border) */
--color-success: #22c55e
--color-warning: #facc15
--color-error: #ef4444
--color-link: #3b82f6            /* same as primary */
--color-muted-foreground: #a1a1aa

/* Typography scale additions */
--text-2xl: 24px   /* (check if exists, used for metric-state values) */
--text-3xl: 40px   /* metric-large values */
--text-lg: 20px    /* section titles */
--text-xl: 24px    /* metric-state values */
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

### Link pattern
All "View X →" links: `text-base font-medium text-[#3b82f6]` + ArrowRight (20px) phosphor icon. Not a real `<a>` tag for this phase — renders as styled text+icon (links will work in later phases when target pages exist).

### Non-functional elements (prototype)
- Search input: renders but no search logic
- "Dashboard settings" button: renders, no action
- "Year to date" filter: renders, no action (hardcoded date range string)
- "View X →" links: render, no navigation for now (or navigate to stub pages)
- Map: static placeholder (no interactive Esri map — that's Phase 3)

</decisions>

<specifics>
## Specific Ideas

- The map shows satellite aerial imagery with colored pipe/manhole overlays. For Phase 2, a high-quality static satellite image crop (or a dark placeholder) is acceptable — the key is that the section title, toolbar chrome, and map container are correctly sized.
- The "Risk Score" map section title has a diamond icon (different from the page title's compass icon)
- The primary metrics row cards are equal width (flex-1), not fixed
- The 2×2 grids use CSS grid (`grid-cols-2`) with `gap-[10px]`
- Rainfall values are static for demo purposes — no data source needed

</specifics>

<deferred>
## Deferred Ideas

- "Reports" nav item visible in Figma screenshot — not in current roadmap. Captured as a future phase addition.
- Interactive date range filter (currently placeholder)
- "Dashboard settings" panel
- Real-time data refresh

</deferred>

---

*Phase: 02-dashboard*
*Context gathered: 2026-02-19*
*Figma source: https://www.figma.com/design/ZZRoLzpoTNy4kpT1NPLrOS/IDEX-x-Goji----Hi-Fi-for-Perispek?node-id=520-19070*
