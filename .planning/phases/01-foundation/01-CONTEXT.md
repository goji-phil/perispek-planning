# Phase 1: Foundation - Context

**Gathered:** 2026-02-19
**Status:** Ready for planning

<domain>
## Phase Boundary

App shell with working navigation (sidebar, active states, global chrome pixel-perfect to Figma) plus the complete mock dataset powering all future phases. This phase does NOT render any dashboard content, map, or data views — it only establishes the structure they will live in and seeds the data they will display.

</domain>

<decisions>
## Implementation Decisions

### Styling approach
- Tailwind CSS with custom CSS variables as the primary styling strategy
- Design tokens (colors, spacing, typography, border radius) extracted from Figma and defined in `tailwind.config.ts` as theme extensions — use semantic Tailwind class names everywhere
- UI primitives (buttons, badges, cards, inputs, status indicators) built from scratch against Figma designs — no component library base
- Icons: **Phosphor icons** (`phosphor-react` or `@phosphor-icons/react`) — this is the icon set used in the Figma designs

### Mock data layer
- Storage and access pattern: **Claude's Discretion** — use whatever best balances simplicity for a demo prototype with the ability to filter/sort in later phases (static TypeScript modules, API routes, or in-memory store are all acceptable)
- Data must use **real Kansas City, MO GIS coordinates** — assets spread across the KC municipal grid to look authentic on the Esri map
- Condition distribution must tell a story: mix of NASSCO grades and risk scores across the 50–100 assets — some critical (driving urgency), some healthy, realistic spread across low/medium/high/critical risk bands
- Both realism dimensions are equally important: geographic authenticity AND meaningful condition narrative

### Nav shell behavior
- **Collapsible sidebar**: sidebar can collapse to icon-only view to maximize horizontal space for map/data content — user can toggle
- **Desktop-first layout**, minimum viewport 768px (graceful tablet fallback), no mobile optimization
- Header area: **Branding only** in Phase 1 — logo + app name, no interactive elements, no user avatar/profile
- Section transitions: **Claude's Discretion** — pick what feels polished for a professional dashboard (subtle fade or instant are both acceptable)

### Claude's Discretion
- Mock data storage/access pattern (TypeScript modules vs API routes vs in-memory store)
- Section transition animation style
- Exact spacing and typographic scale within Figma token system
- Sidebar collapse toggle placement and animation

</decisions>

<specifics>
## Specific Ideas

- The Figma design file is the source of truth for all visual details: https://www.figma.com/design/ZZRoLzpoTNy4kpT1NPLrOS/IDEX-x-Goji----Hi-Fi-for-Perispek?node-id=0-1 — researcher/planner should reference this for exact values
- Kansas City, MO chosen as the demo city — use real street grid coordinates in the KC metro area so assets plot correctly on the Esri map
- The sidebar collapse behavior is a specific UX requirement — not just a "nice to have"; it affects how much room map and data views have

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-19*
