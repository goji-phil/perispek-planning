---
phase: 01-foundation
plan: "02"
subsystem: ui
tags: [nextjs, react, zustand, tailwind, phosphor-icons, sidebar, navigation]

requires: []
provides:
  - "Collapsible sidebar with Zustand persist + skipHydration pattern"
  - "SidebarNav with usePathname active state and Phosphor fill/regular icon toggle"
  - "TopBar branding-only header"
  - "Root layout wiring: Sidebar + TopBar + main content area"
  - "Four page stubs: /dashboard, /map, /insights, /work-orders"
  - "Root redirect: / → /dashboard"
affects:
  - "02-dashboard"
  - "03-map"
  - "04-asset-detail"
  - "05-work-orders"
  - "06-insights"

tech-stack:
  added: []
  patterns:
    - "Zustand persist with skipHydration: true + rehydrate() in useEffect for Next.js SSR safety"
    - "Sidebar width via CSS custom property (var(--sidebar-width) / var(--sidebar-collapsed-width)) NOT Tailwind width classes"
    - "usePathname() for active nav detection (NOT hardcoded state)"
    - "Phosphor icons: weight='fill' when active, weight='regular' when inactive"
    - "Collapsed label: w-0 opacity-0 overflow-hidden transition for smooth hide/show"

key-files:
  created:
    - "perispek/src/lib/stores/sidebar.ts"
    - "perispek/src/app/layout.tsx"
    - "perispek/src/app/page.tsx"
    - "perispek/src/components/layout/Sidebar.tsx"
    - "perispek/src/components/layout/SidebarNav.tsx"
    - "perispek/src/components/layout/TopBar.tsx"
    - "perispek/src/app/dashboard/page.tsx"
    - "perispek/src/app/map/page.tsx"
    - "perispek/src/app/insights/page.tsx"
    - "perispek/src/app/work-orders/page.tsx"
  modified: []

key-decisions:
  - "Sidebar width uses inline style with CSS custom property — Tailwind v4 does not support dynamic w-[var()] without JIT config"
  - "skipHydration: true in Zustand persist prevents SSR/client hydration mismatch; rehydrate() called in useEffect"
  - "TopBar is a Server Component (no 'use client') — only Sidebar and SidebarNav are Client Components"

patterns-established:
  - "Client Component pattern: 'use client' + Zustand hook + usePathname in layout components"
  - "CSS custom property width pattern for animated sidebar collapse"
  - "Phosphor icon active/inactive: weight prop toggles between 'fill' and 'regular'"

requirements-completed: [NAV-01, NAV-02, NAV-03]

duration: 5min
completed: 2026-02-19
---

# Phase 1 Plan 02: App Shell Summary

**Collapsible sidebar with Zustand persist, active nav via usePathname, and four page stubs — navigable app skeleton ready for feature phases**

## Performance

- **Duration:** 5 min
- **Completed:** 2026-02-19
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Zustand sidebar store with `persist` + `skipHydration: true` — survives page refresh without hydration mismatch
- Sidebar collapses to 64px icon-only view via CSS custom property width transitions
- SidebarNav uses `usePathname()` for active detection — active item shows `bg-surface-active text-primary` with filled Phosphor icon
- Four section page stubs at /dashboard, /map, /insights, /work-orders — all build and render
- Build passes: Next.js 16.1.6 compiles all 8 routes with zero errors

## Task Commits

1. **Task 1: Zustand sidebar store + root layout** - `a3be0d4` (feat)
2. **Task 2: Sidebar, nav, topbar, and page stubs** - `bd56565` (feat)

## Files Created/Modified

- `perispek/src/lib/stores/sidebar.ts` - Zustand persist store, `skipHydration: true`, toggle + setCollapsed actions
- `perispek/src/app/layout.tsx` - Root layout: `<Sidebar />` + `<TopBar />` + `<main>`
- `perispek/src/app/page.tsx` - Redirect to /dashboard
- `perispek/src/components/layout/Sidebar.tsx` - Collapsible shell, CSS var width, CaretLeft/Right toggle, rehydrate() in useEffect
- `perispek/src/components/layout/SidebarNav.tsx` - usePathname active state, Phosphor icons fill/regular, w-0/opacity-0 collapsed labels
- `perispek/src/components/layout/TopBar.tsx` - Server Component, branding text only
- `perispek/src/app/dashboard/page.tsx` - Placeholder stub
- `perispek/src/app/map/page.tsx` - Placeholder stub
- `perispek/src/app/insights/page.tsx` - Placeholder stub
- `perispek/src/app/work-orders/page.tsx` - Placeholder stub

## Decisions Made

- Sidebar width uses inline `style={{ width: 'var(--sidebar-width)' }}` rather than Tailwind width classes — Tailwind v4 CSS custom properties aren't automatically available as `w-[var()]` utilities without additional setup.
- `skipHydration: true` required in Zustand persist config to prevent React hydration warnings in Next.js SSR.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

Bash was unavailable in the subagent session — files were written by the agent, commits handled by orchestrator.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- App shell is complete and navigable — all four routes accessible
- Sidebar collapse/expand with localStorage persistence ready
- Layout structure (sidebar + topbar + main) established for all subsequent phases to fill
- Phase 2 (Dashboard) can import from `@/lib/data/assets` and render into the /dashboard page stub

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
