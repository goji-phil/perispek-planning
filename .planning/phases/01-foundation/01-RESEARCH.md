# Phase 1: Foundation - Research

**Researched:** 2026-02-19
**Domain:** Next.js 15 App Router dashboard shell, Tailwind CSS v4 design tokens, Phosphor Icons, collapsible sidebar state, mock data architecture for wastewater asset data
**Confidence:** HIGH (stack verified via official docs and Context7)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Styling approach
- Tailwind CSS with custom CSS variables as the primary styling strategy
- Design tokens (colors, spacing, typography, border radius) extracted from Figma and defined in `tailwind.config.ts` as theme extensions — use semantic Tailwind class names everywhere
- UI primitives (buttons, badges, cards, inputs, status indicators) built from scratch against Figma designs — no component library base
- Icons: **Phosphor icons** (`phosphor-react` or `@phosphor-icons/react`) — this is the icon set used in the Figma designs

#### Mock data layer
- Storage and access pattern: **Claude's Discretion** — use whatever best balances simplicity for a demo prototype with the ability to filter/sort in later phases (static TypeScript modules, API routes, or in-memory store are all acceptable)
- Data must use **real Kansas City, MO GIS coordinates** — assets spread across the KC municipal grid to look authentic on the Esri map
- Condition distribution must tell a story: mix of NASSCO grades and risk scores across the 50–100 assets — some critical (driving urgency), some healthy, realistic spread across low/medium/high/critical risk bands
- Both realism dimensions are equally important: geographic authenticity AND meaningful condition narrative

#### Nav shell behavior
- **Collapsible sidebar**: sidebar can collapse to icon-only view to maximize horizontal space for map/data content — user can toggle
- **Desktop-first layout**, minimum viewport 768px (graceful tablet fallback), no mobile optimization
- Header area: **Branding only** in Phase 1 — logo + app name, no interactive elements, no user avatar/profile
- Section transitions: **Claude's Discretion** — pick what feels polished for a professional dashboard (subtle fade or instant are both acceptable)

### Claude's Discretion
- Mock data storage/access pattern (TypeScript modules vs API routes vs in-memory store)
- Section transition animation style
- Exact spacing and typographic scale within Figma token system
- Sidebar collapse toggle placement and animation

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | User can navigate between Dashboard, Map, System Insights, and Work Orders via sidebar/nav | Next.js App Router nested layout + Link component with route segments per section |
| NAV-02 | Active section is clearly indicated in navigation | `usePathname()` hook + clsx conditional class pattern (verified, official docs) |
| NAV-03 | App layout is pixel-perfect to Figma (global chrome, typography, color system) | Tailwind v4 `@theme` directive for design token extraction from Figma; `cn()` utility for class composition |
| DATA-01 | Seeded dataset of ~50–100 assets (mix of pipes, manholes, storm drains) with realistic GIS coordinates | Static TypeScript module pattern in `src/lib/data/`; KC metro bounding box coordinates documented |
| DATA-02 | Each asset has NASSCO condition data — PACP/MACP grade (1–5), defect codes, 2–3 historical inspection records | NASSCO PACP/MACP grade system (1=minor, 5=critical) documented; defect code categories identified |
| DATA-03 | Each asset has a CoF score, LoF score, and derived risk score (CoF × LoF / 2) | Risk score formula confirmed: CoF × LoF / 2, range 0.0–2.5; LoF derived from PACP quick rating |
| DATA-04 | IoT-enabled assets have seeded sensor readings — current d/D ratio, flow rate, and 90 days of time-series data | d/D ratio structure (0.0–1.0+, >1.0 = overflow); 90-day array generation pattern documented |
| DATA-05 | d/D warning thresholds are set per asset (varying between 0.6–0.85) | Per-asset threshold field in TypeScript interface; range 0.6–0.85 aligns with industry standards |
| DATA-06 | Work order seed data — mix of open, in-progress, and completed orders across asset types | WorkOrder TypeScript type with status enum; linked to assetId |
| DATA-07 | Inspection footage seed data aligned to consent decree targets (some periods on-track, some lagging) | InspectionCoverage type with linear feet per period vs. target; weekly/monthly/quarterly breakdown |
</phase_requirements>

---

## Summary

Phase 1 establishes the application shell and complete mock dataset. The technical foundation is well-understood: Next.js 15 App Router with nested layouts handles the persistent sidebar + content area pattern natively, and partial rendering means only page content re-renders on navigation while the sidebar preserves state. Tailwind CSS v4 (released stable) introduces a CSS-first configuration model where the old `tailwind.config.ts` is replaced by `@theme` directives in a CSS file — this is a significant change from v3 that affects how Figma tokens are defined.

The locked icon library (`@phosphor-icons/react`) has an active v2 package with tree-shaking support, SSR-safe imports, and an `IconContext` for setting default props. The collapsible sidebar should use Zustand with the `persist` middleware for localStorage persistence, with a `skipHydration` flag to avoid Next.js SSR/client hydration mismatches — this is a well-documented pattern. The mock data layer recommendation is static TypeScript modules in `src/lib/data/` — they satisfy all filter/sort requirements in later phases, require no server infrastructure, and are trivially importable by any Server or Client Component.

The Kansas City metro GIS bounding box gives approximately `39.05–39.15°N, -94.52–-94.65°W`, encompassing downtown, Westport, Midtown, and urban neighborhoods where aging sewer infrastructure would plausibly exist. The NASSCO PACP/MACP grading system (1=minor to 5=critical structural failure), defect code categories, LoF/CoF risk model, and d/D ratio data structures are all clearly defined and directly usable in TypeScript interfaces.

**Primary recommendation:** Build the App Router shell with Zustand sidebar state, define all Figma design tokens using Tailwind v4 `@theme` in `globals.css`, seed 75 assets across KC neighborhoods in static TypeScript modules, and generate time-series data procedurally at module load time.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | Framework, file-system routing, App Router layouts | Locked decision; App Router layout pattern is exactly right for persistent sidebar |
| React | 19.x | UI rendering | Ships with Next.js 15; App Router uses React 19 |
| Tailwind CSS | v4.x | Utility-first styling + design tokens | Locked decision; v4 is stable as of early 2025 |
| @phosphor-icons/react | 2.x | Icon set | Locked decision (Figma uses Phosphor); replaces deprecated `phosphor-react` |
| zustand | 5.x | Sidebar collapsed state | Lightest option for client state; persist middleware for localStorage |
| clsx | 2.x | Conditional class names | Official Next.js tutorial pattern for active nav states |
| tailwind-merge | 3.x | Class deduplication in `cn()` utility | Required when composing Tailwind classes in component variants |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| TypeScript | 5.x | Type safety for mock data schemas | Already included in Next.js; defines Asset, WorkOrder, InspectionRecord interfaces |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zustand for sidebar state | React Context + useState | Context fine for simple toggle; Zustand persist middleware gives localStorage for free |
| Static TypeScript modules | Next.js Route Handlers (API) | API routes add network round-trips and caching complexity; static modules are faster for demo |
| Tailwind v4 @theme | tailwind.config.ts (v3 style) | v4 is the current standard; v3 config still works but is legacy path |

**Installation:**
```bash
# Create app (Tailwind v4 flag includes @tailwindcss/postcss setup)
npx create-next-app@latest perispek --typescript --eslint --app --src-dir --turbopack

# Icons + state + utilities
npm install @phosphor-icons/react zustand clsx tailwind-merge

# Tailwind v4 dependencies (if not included by create-next-app)
npm install tailwindcss @tailwindcss/postcss postcss
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx            # Root layout: <html>, <body>, global providers
│   ├── globals.css           # @import "tailwindcss" + @theme tokens
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard placeholder (Phase 2 fills this)
│   ├── map/
│   │   └── page.tsx          # Map placeholder (Phase 3)
│   ├── insights/
│   │   └── page.tsx          # System Insights placeholder (Phase 6)
│   └── work-orders/
│       └── page.tsx          # Work Orders placeholder (Phase 5)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx       # Collapsible sidebar (client component)
│   │   ├── SidebarNav.tsx    # Nav links with active state (client component)
│   │   └── TopBar.tsx        # Branding header (server component)
│   └── ui/                   # Figma-derived primitives (badge, card, etc.)
├── lib/
│   ├── data/
│   │   ├── assets.ts         # 75 seeded Asset records
│   │   ├── work-orders.ts    # Seeded WorkOrder records
│   │   ├── inspections.ts    # Inspection records + footage data
│   │   └── time-series.ts    # 90-day IoT sensor data generator
│   ├── stores/
│   │   └── sidebar.ts        # Zustand sidebar collapse store
│   └── utils/
│       └── cn.ts             # clsx + tailwind-merge cn() utility
└── types/
    └── index.ts              # Asset, WorkOrder, InspectionRecord, IoTReading types
```

### Pattern 1: Nested Layout for Persistent Shell
**What:** Root layout wraps all pages with sidebar + topbar; page segments render in `{children}`
**When to use:** Always — this is the App Router's native pattern for dashboard shells

```tsx
// Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages
// src/app/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-background text-foreground overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <TopBar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
```

### Pattern 2: Active Nav Links with usePathname
**What:** Client component reads current route, applies active styles conditionally
**When to use:** Sidebar navigation items

```tsx
// Source: https://nextjs.org/learn/dashboard-app/navigating-between-pages
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { House, MapTrifold, ChartBar, Wrench } from '@phosphor-icons/react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: House },
  { href: '/map', label: 'Map', icon: MapTrifold },
  { href: '/insights', label: 'System Insights', icon: ChartBar },
  { href: '/work-orders', label: 'Work Orders', icon: Wrench },
]

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'hover:bg-surface-hover hover:text-foreground',
            pathname === href
              ? 'bg-surface-active text-primary'
              : 'text-foreground-muted'
          )}
        >
          <Icon size={20} weight={pathname === href ? 'fill' : 'regular'} />
          {!collapsed && <span>{label}</span>}
        </Link>
      ))}
    </nav>
  )
}
```

### Pattern 3: Tailwind v4 Design Token Definition
**What:** Design tokens from Figma defined in `globals.css` using `@theme` directive; Tailwind generates utility classes automatically
**When to use:** Replaces `tailwind.config.ts` theme extensions in v4

```css
/* Source: https://tailwindcss.com/docs/theme */
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — extract exact hex/oklch from Figma */
  --color-primary: oklch(0.58 0.19 240);       /* Brand blue */
  --color-surface: #0f1117;                     /* Dark panel background */
  --color-surface-hover: #1a1d26;
  --color-surface-active: #1e2235;
  --color-background: #080b12;                  /* App background */
  --color-foreground: #e8eaf0;
  --color-foreground-muted: #8b90a0;
  --color-border: #2a2d3a;

  /* Risk band colors */
  --color-risk-low: oklch(0.72 0.18 145);      /* Green */
  --color-risk-medium: oklch(0.78 0.18 75);    /* Amber */
  --color-risk-high: oklch(0.68 0.22 35);      /* Orange */
  --color-risk-critical: oklch(0.60 0.25 25);  /* Red */

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;

  /* Spacing/radius — from Figma specs */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Sidebar widths */
  --sidebar-width: 240px;
  --sidebar-collapsed-width: 64px;
}
```

### Pattern 4: Zustand Sidebar Store with localStorage Persistence
**What:** Zustand store for sidebar collapse state; persist middleware saves to localStorage; skipHydration avoids SSR mismatch
**When to use:** Any client-side UI state that should survive page refreshes

```tsx
// Source: https://zustand.docs.pmnd.rs/integrations/persisting-store-data
// src/lib/stores/sidebar.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (collapsed: boolean) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: 'sidebar-state',
      skipHydration: true, // Required: avoids Next.js SSR/client mismatch
    }
  )
)
```

```tsx
// Sidebar.tsx — rehydrate on mount
'use client'
import { useEffect } from 'react'
import { useSidebarStore } from '@/lib/stores/sidebar'

export function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()

  useEffect(() => {
    // Rehydrate after mount to avoid hydration mismatch
    useSidebarStore.persist.rehydrate()
  }, [])

  return (
    <aside
      className="flex flex-col shrink-0 transition-all duration-200 ease-in-out bg-surface border-r border-border"
      style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
    >
      {/* ... */}
    </aside>
  )
}
```

### Pattern 5: Static TypeScript Mock Data Module
**What:** Typed seed data defined as exported const arrays; importable by Server Components directly; no API layer needed
**When to use:** Demo prototype with no backend; later phases import and filter in-memory

```ts
// src/lib/data/assets.ts
import type { Asset } from '@/types'

export const ASSETS: Asset[] = [
  {
    id: 'pipe-001',
    type: 'pipe',
    name: 'Main St Trunk Line',
    // Real KC coordinates — downtown area
    coordinates: { lat: 39.0997, lng: -94.5786 },
    material: 'Concrete',
    diameter: 24,            // inches
    installYear: 1978,
    pacp: {
      grade: 4,              // 1=best, 5=worst
      defectCodes: ['BC', 'CC', 'FB'], // B-crack, C-crack, Fracture Break
      lastInspected: '2023-08-15',
    },
    cof: 3.8,                // Consequence of Failure (0–5)
    lof: 4.1,                // Likelihood of Failure (0–5); derived from PACP grade
    riskScore: (3.8 * 4.1) / 2, // = 7.79... wait — normalize to 0–2.5 scale
    iot: {
      enabled: true,
      currentDepth: 0.71,    // d/D ratio
      flowRate: 2.4,         // MGD
      warningThreshold: 0.75,
    },
  },
  // ... 74 more assets
]
```

**Note on risk score range:** The PROJECT.md defines `Risk Score = (CoF × LoF) / 2` with CoF and LoF on `0.0–5.0` scale, giving a range of `0.0–12.5`. The displayed "color band" (low/medium/high/critical) maps bands within that range. Clarify with CONTEXT.md — the formula is confirmed; thresholds for band classification need to be decided in implementation.

### Pattern 6: cn() Utility
**What:** Combines clsx conditional logic with tailwind-merge conflict resolution
**When to use:** Every component that conditionally applies Tailwind classes

```ts
// Source: standard community pattern verified by multiple sources
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Anti-Patterns to Avoid
- **Putting `usePathname()` in a Server Component:** It's a React hook — requires `'use client'`. Any nav component using it must be a Client Component. Keep the parent layout as a Server Component; import the nav island.
- **CSS width transitions with arbitrary values in Tailwind v4:** Use CSS custom properties (`var(--sidebar-width)`) in inline styles for dynamic width values that Tailwind can't know at build time. Don't try `w-[var(--sidebar-width)]` — use `style={{ width: ... }}` instead.
- **Importing all Phosphor icons from root:** `import { ... } from '@phosphor-icons/react'` works fine with bundlers that tree-shake. For Server Components, use the `/ssr` submodule: `import { House } from '@phosphor-icons/react/ssr'`
- **Using `tailwind.config.ts` for new v4 project:** Tailwind v4 uses CSS-first `@theme`; creating a `tailwind.config.ts` is unnecessary for new projects (and confusing). Put all tokens in `globals.css`.
- **Hardcoding sidebar width in JS:** Define width as CSS custom properties in `@theme`; this makes it accessible in both Tailwind utilities and inline CSS.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Active nav state styling | Custom pathname comparison logic | `usePathname()` + clsx | Official Next.js pattern; handles nested routes correctly |
| Class name merging | Custom class string concatenation | `cn()` (clsx + tailwind-merge) | tailwind-merge handles specificity conflicts that string concat cannot |
| Sidebar persistence | Custom localStorage read/write | Zustand `persist` middleware | Handles SSR rehydration, serialization, and storage errors |
| CSS variable access in JS | `getComputedStyle()` calls | Direct CSS variables via `@theme` (or inline style with var()) | @theme makes tokens available as both CSS vars and Tailwind utilities |
| 90-day time series generation | Manual date loop | Procedural generator function in `time-series.ts` | Single source of truth; easy to adjust data shape |

**Key insight:** The hardest problems in this phase (active state tracking, class composition, state persistence across renders) all have 5-line solutions using the established patterns. Do not invent custom solutions.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 @theme vs tailwind.config.ts Confusion
**What goes wrong:** Developer creates `tailwind.config.ts` (v3 habit) instead of using `@theme` in CSS; tokens defined in config don't interact with CSS variable system correctly; causes double-source-of-truth confusion.
**Why it happens:** All Tailwind v3 tutorials show `tailwind.config.ts`; v4 changed this fundamentally.
**How to avoid:** For new projects, put ALL design tokens in `globals.css` under `@theme`. Do not create `tailwind.config.ts` unless you need a specific v4-supported config option.
**Warning signs:** If you're writing `theme: { extend: { colors: { ... } } }` in a config file, you're using v3 patterns in a v4 project.

### Pitfall 2: Zustand Hydration Mismatch in Next.js
**What goes wrong:** Sidebar renders expanded on server, then collapses (or vice versa) after hydration if localStorage has a different value; causes visible layout flash or React hydration error.
**Why it happens:** Next.js renders server HTML before client JS runs; Zustand persist reads localStorage only on client.
**How to avoid:** Set `skipHydration: true` in persist config; call `useSidebarStore.persist.rehydrate()` inside a `useEffect()` in the Sidebar component.
**Warning signs:** Console shows "Hydration mismatch" or sidebar flickers on first load.

### Pitfall 3: Phosphor Icons in Server Components
**What goes wrong:** Importing `@phosphor-icons/react` in a Server Component throws because IconContext uses React Context (client-only API).
**Why it happens:** Default import uses React Context internally; Server Components can't use Context.
**How to avoid:** Use `import { IconName } from '@phosphor-icons/react/ssr'` in Server Components. For client components, the regular import works fine.
**Warning signs:** Build error mentioning "React Context" or "useState" in a Server Component.

### Pitfall 4: Risk Score Range Ambiguity
**What goes wrong:** CoF and LoF are 0–5 scales; formula is `(CoF × LoF) / 2` giving range 0–12.5, but PROJECT.md says "0.0–2.5". This inconsistency needs to be resolved before seeding data.
**Why it happens:** Two different conventions — possibly CoF/LoF were intended as 0–1 scales (giving 0–0.5 range) or the divide-by-2 was meant to normalize against a 5×5=25 max. PROJECT.md says "0.0–2.5" which implies CoF and LoF are 0–1.
**How to avoid:** Verify in CONTEXT.md/PROJECT.md whether CoF and LoF are 0–5 or 0–1. If 0–5, the max risk score is 12.5 and band thresholds scale accordingly. If 0–1, max is 0.5. Design the TypeScript interface to enforce the correct range with JSDoc comments.
**Warning signs:** Risk scores in mock data don't fall within the "color band" thresholds used in later phases.

### Pitfall 5: d/D Ratio > 1.0 Edge Case
**What goes wrong:** IoT data includes overflow events (d/D > 1.0); code that normalizes or clamps d/D to [0, 1] silently drops overflow signals.
**Why it happens:** d/D as a ratio suggests [0, 1] range, but overflow exceeds pipe capacity.
**How to avoid:** Type `dRatio` as `number` (not a percentage), document that values > 1.0 indicate overflow, and use `> threshold` comparisons in alert logic rather than percentage math.
**Warning signs:** No assets ever show "overflow" status despite claiming critical conditions.

### Pitfall 6: Sidebar Width Transition in Tailwind v4
**What goes wrong:** Using `w-60` vs `w-16` class toggle for sidebar collapse causes layout jump rather than smooth transition because Tailwind's JIT generates static classes and the transition works, but the content inside reflowing causes jank.
**Why it happens:** Width transitions with `overflow: hidden` inside the sidebar clip icon labels incorrectly.
**How to avoid:** Use CSS custom property-driven width (`style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}`) with `transition: width 200ms ease-in-out` in CSS. Hide labels with `opacity-0` fade independently of width.
**Warning signs:** Icons disappear before sidebar finishes collapsing, or text wraps awkwardly mid-animation.

---

## Code Examples

### Kansas City GIS Bounding Box for Asset Placement
```ts
// Verified coordinates from GIS sources
// KC metro bounding box for realistic asset distribution:
const KC_BOUNDS = {
  lat: { min: 39.050, max: 39.150 },  // ~7 miles N/S
  lng: { min: -94.650, max: -94.520 }, // ~8 miles E/W
}

// Key KC neighborhood anchor points for named assets:
const KC_ANCHORS = {
  downtown:        { lat: 39.0997, lng: -94.5786 },
  riverMarket:     { lat: 39.1110, lng: -94.5740 },
  crossroads:      { lat: 39.0870, lng: -94.5810 },
  westport:        { lat: 39.0410, lng: -94.5950 }, // Note: south of downtown
  midtown:         { lat: 39.0620, lng: -94.5890 },
  eighthStreet:    { lat: 39.1020, lng: -94.5800 },
  libertyMemorial: { lat: 39.0850, lng: -94.5820 },
  pennValley:      { lat: 39.0730, lng: -94.5870 },
}
```

### NASSCO PACP Defect Code Reference for Seeding
```ts
// Source: NASSCO PACP standards (verified via industry documentation)
// Structural defect codes (most relevant for risk score):
const STRUCTURAL_DEFECTS = {
  'BC': 'Broken/Cracked - Circumferential',
  'BL': 'Broken/Cracked - Longitudinal',
  'BM': 'Broken/Cracked - Multiple',
  'CC': 'Crack - Circumferential',
  'CL': 'CrackLongitudinal',
  'FB': 'Fracture Break',
  'H':  'Hole',
  'DS': 'Deformation - Spiral',
  'DV': 'Deformation - Vertical',
}

// Operations & Maintenance defect codes:
const OM_DEFECTS = {
  'RJ': 'Roots - Joint',
  'RM': 'Roots - Masses',
  'DA': 'Deposits - Attached',
  'DG': 'Deposits - Grease',
  'I':  'Infiltration',
}

// Condition grade interpretation:
// Grade 1: Minor defect — no immediate action
// Grade 2: Moderate defect — monitor
// Grade 3: Significant defect — plan rehabilitation
// Grade 4: Severe defect — prioritize rehabilitation
// Grade 5: Critical defect — immediate action required
```

### TypeScript Interfaces for Mock Data
```ts
// src/types/index.ts
export type AssetType = 'pipe' | 'manhole' | 'storm-drain'
export type ConditionGrade = 1 | 2 | 3 | 4 | 5
export type RiskBand = 'low' | 'medium' | 'high' | 'critical'
export type WorkOrderStatus = 'open' | 'in-progress' | 'completed'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface InspectionRecord {
  id: string
  date: string             // ISO date string
  grade: ConditionGrade
  defectCodes: string[]
  notes: string
  linearFeetInspected: number
}

export interface PACPData {
  grade: ConditionGrade
  defectCodes: string[]
  inspectionHistory: InspectionRecord[]
}

export interface IoTData {
  enabled: boolean
  currentDRatio: number      // depth/diameter; >1.0 = overflow
  flowRateMGD: number        // millions gallons per day
  warningThreshold: number   // 0.6–0.85; varies per asset
  timeSeries: IoTReading[]   // 90 days of readings
}

export interface IoTReading {
  timestamp: string          // ISO datetime
  dRatio: number
  flowRateMGD: number
}

export interface Asset {
  id: string
  type: AssetType
  name: string
  coordinates: GeoPoint
  material: string           // 'Concrete', 'Clay', 'PVC', 'Cast Iron'
  diameterInches: number
  installYear: number
  // NASSCO condition
  pacp: PACPData             // pipes
  macp?: PACPData            // manholes (uses MACP variant)
  // Risk scoring
  cof: number                // Consequence of Failure; verify scale with PROJECT.md
  lof: number                // Likelihood of Failure
  riskScore: number          // (cof * lof) / 2
  riskBand: RiskBand
  // IoT
  iot?: IoTData
}

export interface WorkOrder {
  id: string
  assetId: string
  type: 'inspection' | 'repair' | 'rehabilitation' | 'emergency'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: WorkOrderStatus
  title: string
  description: string
  createdAt: string
  dueDate: string
  completedAt?: string
}

export interface InspectionCoveragePeriod {
  period: string             // e.g. '2024-W01', '2024-01', '2024-Q1'
  linearFeetInspected: number
  targetLinearFeet: number
  onTrack: boolean
}
```

### Section Transition (CSS fade — recommended approach)
```css
/* globals.css — subtle opacity fade for page transitions */
/* Applied via layout wrapper around {children} */
@layer components {
  .page-transition-enter {
    animation: fadeIn 150ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

```tsx
// In layout.tsx — wrap children to trigger animation on route change
// Use Next.js built-in: each page.tsx is a new component mount, so CSS animation
// on the <main> wrapper fires automatically on navigation.
<main className="flex-1 overflow-auto page-transition-enter">
  {children}
</main>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` for tokens | `@theme` directive in CSS (`globals.css`) | Tailwind v4.0 (Jan 2025) | All token definitions move to CSS; v3 config is legacy path |
| `phosphor-react` package | `@phosphor-icons/react` package | ~2023 (v2 rewrite) | Old package is deprecated; new package has SSR submodule |
| `pages/` directory routing | `app/` directory (App Router) | Next.js 13+, stable 14+ | Layouts, Server Components, and partial rendering all require App Router |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Single import replaces three directives |
| `tailwind.config.ts content: []` | Auto content detection | Tailwind v4 | No content array needed; scans automatically |

**Deprecated/outdated:**
- `phosphor-react`: deprecated; use `@phosphor-icons/react` — the old package is no longer maintained
- Tailwind `@tailwind base; @tailwind components; @tailwind utilities;` directives: replaced by `@import "tailwindcss";` in v4
- Next.js `pages/` router for new apps: functional but App Router is the recommended default

---

## Open Questions

1. **Risk Score Scale**
   - What we know: Formula is `(CoF × LoF) / 2`; PROJECT.md says range is `0.0–2.5` which implies CoF/LoF are 0–1 scales
   - What's unclear: Are CoF and LoF 0–1 or 0–5? The NASSCO LoF derivation from PACP grade is 1–5; if LoF = PACP grade / 5, then LoF is 0–1, giving risk score 0–0.5 (not 0–2.5 either). The PROJECT.md number may be a typo or use a different formula.
   - Recommendation: Implement CoF and LoF as 0.0–5.0 per NASSCO convention; compute risk as `(cof * lof) / 2` giving range 0–12.5; define band thresholds at [0–3]=low, [3–6]=medium, [6–9]=high, [9–12.5]=critical. Document this in TypeScript interface with JSDoc. If later phases show different expectations, adjust thresholds only.

2. **Figma Design Token Extraction**
   - What we know: Figma URL requires login; exact hex values, font sizes, and spacing values not directly accessible without Figma access
   - What's unclear: Exact color palette, border radii, and spacing scale used in the design
   - Recommendation: The implementer must open the Figma file and extract: primary brand color, background colors (surface levels), typography scale, and border radius values. Stub placeholders in `@theme` first; refine during implementation.

3. **Number of IoT-Enabled Assets**
   - What we know: Dataset is 50–100 assets; IoT is optional per asset
   - What's unclear: What percentage should have IoT sensors?
   - Recommendation: Make approximately 40–50% IoT-enabled (30–40 of 75 assets); concentrate on pipes (not manholes); vary the d/D ratios so ~5 assets are in warning state and ~2 are in overflow for realistic urgency.

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/getting-started/layouts-and-pages` — App Router layout pattern, nested layouts, `children` prop; doc version 16.1.6 (2026-02-16)
- `https://nextjs.org/learn/dashboard-app/navigating-between-pages` — `usePathname()` active nav pattern, clsx usage; official tutorial
- `https://nextjs.org/blog/next-15` — Next.js 15 feature set, React 19 support, caching changes; published Oct 2024
- `https://tailwindcss.com/docs/theme` — `@theme` directive, CSS variable naming conventions, namespace patterns; official v4 docs
- `https://tailwindcss.com/blog/tailwindcss-v4` — v4 release notes, breaking changes, `@import "tailwindcss"` migration; official
- `https://tailwindcss.com/docs/guides/nextjs` — Exact installation steps for Tailwind v4 + Next.js; official

### Secondary (MEDIUM confidence)
- WebSearch: `@phosphor-icons/react` v2 API — weight/size/color props, IconContext, SSR submodule pattern; cross-referenced with npm package page structure
- WebSearch: Zustand `persist` middleware + `skipHydration` pattern for Next.js — multiple GitHub discussions from Zustand repo confirm this is the documented solution
- WebSearch: Kansas City coordinates — lat 39.0997, lng -94.5786 (downtown center); confirmed across multiple GIS coordinate sources
- WebSearch: NASSCO PACP/MACP grades 1–5, defect codes, LoF/CoF framework — confirmed from NASSCO.org documentation references and industry sources

### Tertiary (LOW confidence)
- d/D ratio industry thresholds (0.6–0.85 warning range) — search results cite design standards but specific threshold values vary by jurisdiction; the CONTEXT.md specifies this range is required, so use it as given
- CSS sidebar collapse animation approach — community patterns; not from an official source, but technically straightforward

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Next.js 15 + Tailwind v4 + Phosphor Icons verified via official docs and npm
- Architecture: HIGH — App Router layout pattern is official Next.js documentation with code examples
- Mock data structure: HIGH — TypeScript interfaces derived directly from requirements; NASSCO schema from industry docs
- GIS coordinates: MEDIUM — KC coordinates confirmed from multiple lat/lng sources; authenticity for demo purposes confirmed
- Pitfalls: HIGH — Zustand hydration issue and Phosphor SSR issue are well-documented community patterns

**Research date:** 2026-02-19
**Valid until:** 2026-03-21 (30 days — stack is stable; Tailwind v4 minor updates possible but breaking changes unlikely)
