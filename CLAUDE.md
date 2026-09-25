# Quasar Dashboard PRO — Claude Code guide

Open source admin dashboard template: Vue 3 (`<script setup>`), Quasar 2 (`@quasar/app-vite`), TypeScript, Pinia, Vue Router (history mode). Full context and feature list live in [`README.md`](./README.md) (EN) / [`README.pt-BR.md`](./README.pt-BR.md) (PT-BR) — read those for the "what/why", this file is the "how to work in this repo".

## Documentation is not optional

**Whenever a change adds a new module, page, dependency, or user-facing feature, update both `README.md` and `README.pt-BR.md` in the same piece of work** — not as a follow-up, not only when asked. Keep the two files symmetric (same sections, same order); if you edit one, edit the other. This applies to:

- A new business module or page → add it to the modules table/list in both files.
- A new dependency that's part of the stack (chart lib, map lib, etc.) → add it to the "Tech stack" section.
- A new deploy/config requirement (like the Netlify SPA redirect) → document it under "Getting started"/"Deploying".

If a change is purely internal (refactor, bugfix, styling tweak with no new capability), the README doesn't need touching — use judgment, but default to updating it.

## Visual direction — do not deviate

The UI follows the PrimeNG **"Diamond"** template (https://diamond.primeng.dev) as its single reference: neutral/dark sidebar, subtle borders, 12px rounded corners (`$generic-border-radius` / `$button-border-radius` in `src/css/quasar.variables.scss`), sparkline stat cards, restrained indigo accent (`$primary: #4f46e5`), Material Symbols Outlined icons. When building a new page, find the closest matching Diamond page and mirror its layout/density rather than introducing a different design language.

## Architecture: business-segment modules

Pages are organized **by business segment** under `src/modules/<segment>/`, each self-contained: `pages/`, `components/`, `data/`, `routes.ts`, `nav.ts`. A module is registered with two lines in [`src/modules/index.ts`](./src/modules/index.ts) (`moduleRoutes`, `moduleNavSections`) — the whole point is that a module folder can be copied into another project largely as-is. Current modules: `finance`, `crm` (includes a Calendar page), `ecommerce`, `fleet`, `support`, `security`, `crypto` (live CoinGecko data), `pages` (generic utility pages: Auth — a nav link to the existing `/login` route, not its own page/route — Crud, Invoice, FAQ, Contact Us, Empty).

When adding a new module, follow this same shape — don't scatter pages outside `src/modules/`.

## Data layer for real APIs

Pages never call `fetch` directly: **page → composable → service → api-client**.

- [`src/services/api-client.ts`](./src/services/api-client.ts) is the single central HTTP layer (native `fetch`, no axios): `createApiClient({ baseURL, headers, query, timeoutMs, retry })`, typed `ApiError` with a normalized `code`, timeouts/abort, retries on network/5xx/429, optional GET `cacheTtlMs`.
- One folder per external API under `src/services/<api>/` (see `coingecko/`): client instance, `*.dto.ts` (raw snake_case), `*.models.ts` (camelCase, what the UI sees), mappers, and service objects per resource (`marketService.getMarkets(...)`). Services take `{ signal }` and return mapped models.
- [`src/composables/useApiRequest.ts`](./src/composables/useApiRequest.ts) is the generic async-state building block (`data`/`pending`/`error`/`lastUpdated`/`refresh`, polling paused while the tab is hidden, abort on unmount); modules wrap it in domain composables under `src/modules/<segment>/composables/`.
- Client-side env vars must be `QCLI_`-prefixed (Quasar app-vite's default client prefix), read via `import.meta.env.QCLI_*`; document new ones in `.env.example` (un-ignored in `.gitignore`).
- CoinGecko: keyless works but is heavily rate-limited; the optional Demo key goes in the `x_cg_demo_api_key` **query param** (its CORS preflight rejects the custom header).

## UI conventions

- **Row/card click → detail dialog.** Lists/tables of records open a small dialog via the shared [`src/components/RecordDetailDialog.vue`](./src/components/RecordDetailDialog.vue): pass `title`, optional `subtitle`/avatar, and `fields: {label, value, color?}[]`. Reuse this instead of building a one-off dialog.
- **Animated Vue Flow diagrams, one distinct look per module** — not the same widget reskinned. Existing examples, each intentionally different: Fleet's `ObservabilityFlow` (horizontal icon-pill pipeline with one accent/pulsing node), Finance's `MoneyFlowDiagram` (branching Sankey-style pill nodes), CRM's `ConversionFunnelFlow` (vertical narrowing bars), E-commerce's `FulfillmentFlow` (horizontal status chips with done/active/pending states). When adding another one, design a new visual treatment rather than copying an existing component's node/edge styling.
- Charts (ApexCharts) need an explicit hex `background` in `chart.background` (`$q.dark.isActive ? '#18181b' : '#ffffff'`) — `'transparent'` does not fully suppress a stray background rect in dark mode.

## Dev workflow

- The user typically already has `pnpm dev` running with hot reload at `http://localhost:9000`. Don't run `pnpm build` or start another dev server to verify a change — check `pnpm typecheck` + `pnpm lint:check`, then look at the live page yourself via the browser tools, unless told otherwise.
- Both must pass clean before considering a change done: `pnpm typecheck` and `pnpm lint:check` (or `pnpm lint` to auto-fix).
- Vue Flow edges: with `exactOptionalPropertyTypes: true`, don't set an optional prop like `markerEnd`/`strokeDasharray` to `undefined` in a ternary — conditionally spread it in (`...(cond ? { markerEnd: {...} } : {})`) instead.
- QCalendar (`@quasar/quasar-ui-qcalendar` v5, see CRM's `CrmCalendarPage.vue`): the `@change` event payload's `start`/`end` are plain `'YYYY-MM-DD'` **strings**, not `Timestamp` objects — only `days`/`calendarDays` are `Timestamp[]`. Don't assume `.date` exists on `start`/`end` (it doesn't; verify against the actual emitted payload, not just example code, since the docs site's fetched examples can be stale/misleading vs. the installed version). On first navigation to a page using it, the dev server needs a few seconds to pre-bundle the new dependency and the calendar grid can render blank for a couple of seconds before it — not a real bug, don't "fix" it.

## SEO files — the domain is the live demo's, not a fixed constant

[`index.html`](./index.html)'s `og:url`, `<link rel="canonical">`, and `og:image`/`twitter:image`, plus every `<loc>` in [`public/sitemap.xml`](./public/sitemap.xml), are set to the live demo's actual domain: `https://quasar-dashboard-pro.netlify.app`. [`public/og-image.png`](./public/og-image.png) is the OG/Twitter banner (1672×941), also used as the README hero image in both READMEs. This is still a template other people deploy under their own domain — if you're working on a fork with a different deployed domain, update those fields (and swap the banner if rebranding) rather than assuming this domain is generic/fixed. Don't guess a different URL for the _original_ repo's own fields without being told to.

## Stack reference

Vue 3, Quasar 2, TypeScript, Pinia, Vue Router, ApexCharts, Leaflet + `@vue-leaflet/vue-leaflet`, `@vue-flow/core`, `@quasar/quasar-ui-qcalendar` + `@timestamp-js/core`, Material Symbols Outlined, Inter (`@fontsource-variable/inter`). Full list with rationale in the README "Tech stack" section — keep that section in sync when dependencies change.

## License

Apache-2.0 (see [`LICENSE`](./LICENSE)). Free for personal/commercial use, no attribution required.
