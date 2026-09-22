<div align="center">
  <img src="public/og-image.png" alt="Quasar Dashboard PRO" width="900" />

# Quasar Dashboard PRO

**A free, open source admin dashboard template built with Vue 3, Quasar 2 and TypeScript.**
Polished, business-ready UI you can drop straight into a real product — not another empty starter kit.

**[🔗 Live demo](https://quasar-dashboard-pro.netlify.app)**

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vuedotjs&logoColor=white)
![Quasar 2](https://img.shields.io/badge/Quasar-2.x-1976D2?logo=quasar&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

🇧🇷 [Leia em Português](./README.pt-BR.md) · 🇺🇸 English (this file)
</div>

---

## Why this template

Most free admin dashboards are a pile of unrelated demo pages. Quasar Dashboard PRO is organized as **ready-to-use business modules** — Finance, CRM, E-Commerce, Fleet Tracking, Support, Security Ops — each with real, connected flows (not just isolated screens), so you can delete what you don't need and ship the rest.

- **Business modules, not demo pages** — Finance, CRM, E-Commerce, Fleet Tracking, Support and Security Ops, each a self-contained, copy-pasteable folder.
- **Real UI flows** — a full checkout funnel, a kanban you can drag deals across, an inbox with a reading pane, a live map with animated vehicle tracking, a live chat inbox with conversation routing, a world threat map — not just static tables.
- **Common utility pages included** — CRUD example, file manager, invoice, FAQ, contact form — so you're not building the boring-but-necessary pages from scratch either.
- **Modern stack, done right** — Vue 3 `<script setup>`, Quasar 2, TypeScript everywhere, Pinia, Vite. No Options API, no JavaScript-only leftovers.
- **A design system, not just components** — one accent color, one corner radius, one detail-dialog pattern, applied consistently across every module.
- **Dark mode** that actually looks finished, not an inverted afterthought.
- **100% free, Apache-2.0 licensed** — use it in personal or commercial projects, no attribution required.

## Features

- Responsive dashboard shell: collapsible grouped sidebar, header with dark-mode toggle, notifications and account menu
- The dashboard is open by default — no forced login. A demo authentication flow (persisted session, route guard) is included and easy to re-enable, at `/login`
- Charts (ApexCharts) tuned to look correct in both light and dark mode
- A shared `RecordDetailDialog` pattern so every list/table in the app opens details the same way
- Animated Vue Flow diagrams across modules, each with its own distinct look — a real-time observability pipeline, a branching money-flow diagram, a narrowing conversion funnel, a fulfillment status tracker, a hub-and-spoke conversation routing diagram, a V-shaped threat-response timeline — plus a pulsing "radar" effect on live map markers
- A Google Calendar-style scheduler (Day/Week views, drag-free click-to-create, color-coded events) built with [QCalendar](https://qcalendar.netlify.app)
- Leaflet-powered map with custom markers and geofenced risk zones — no API key required
- A generic CRUD example (search, create/edit dialog, bulk delete with confirmation) to copy for your own entities
- Fully typed end to end, with strict ESLint + Prettier setup

## Modules included

| Module             | Routes         | What's inside                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Finance**        | `/finance/*`   | Overview (currency cards with sparklines, income/expenditure chart, budget breakdown, credit score gauge), Transactions (full history table), Accounts                                                                                                                                                                                                            |
| **CRM**            | `/crm/*`       | Overview (pipeline-by-stage chart, lead stats, upcoming activities), Leads (full table), Deals (kanban board by stage, pipeline-value chart by owner), Mail (inbox with folders, reading pane and compose), Calendar (Google Calendar-style Day/Week scheduler)                                                                                                   |
| **E-Commerce**     | `/ecommerce/*` | Full product-to-order flow: Products (search/filter/sort grid) → product detail (gallery, quantity, wishlist, related products) → Shopping Cart → Checkout (shipping/payment/review stepper) → Order Summary receipt, plus Order History with a delivery-status stepper                                                                                           |
| **Fleet Tracking** | `/fleet/*`     | Live Map (animated vehicle markers, geofenced risk zones, animated observability pipeline), Vehicles (status/fuel/driver table), Trip History (route replay with stop timeline), Alerts & Maintenance (severity-filtered alert feed)                                                                                                                              |
| **Support**        | `/support/*`   | Overview (conversation/CSAT stats, animated hub-and-spoke conversation-routing diagram, tickets-by-channel chart), Inbox (live chat with conversation list, message bubbles and composer), Tickets (full helpdesk ticket table)                                                                                                                                   |
| **Security Ops**   | `/security/*`  | Overview (threat stats, animated V-shaped threat-response timeline, incidents-by-severity chart), Incidents (full incident table with source/target/severity), Threat Map (world map of attack sources with severity-coded pulsing markers)                                                                                                                       |
| **Pages**          | `/pages/*`     | Common utility pages: Auth (links to the demo login screen at `/login`), Crud (searchable table with create/edit dialog and bulk delete), File Manager (folder tree, storage-usage gauge, starred/shared/trash views), Invoice (printable document view), FAQ (searchable, categorized accordion), Contact Us (form + contact info), Empty (blank-state template) |

Plus the shared "core": auth (demo login, route guard, persisted session), the dashboard shell, and Pinia stores.

More segments and pages will be added over time — contributions welcome.

## Tech stack

- [Vue 3](https://vuejs.org) (Composition API, `<script setup>`)
- [Quasar 2](https://quasar.dev) with the Vite-based CLI (`@quasar/app-vite`)
- [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org) for state management
- [Vue Router](https://router.vuejs.org) (history mode) with a navigation guard for authenticated routes
- [ApexCharts](https://apexcharts.com) for dashboard charts
- [Leaflet](https://leafletjs.com) + [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) for the Fleet Tracking and Security Ops threat maps
- [Vue Flow](https://vueflow.dev) for the animated observability pipeline
- [QCalendar](https://qcalendar.netlify.app) (`@quasar/quasar-ui-qcalendar`) for the CRM Calendar's Day/Week scheduler
- [Material Symbols Outlined](https://fonts.google.com/icons) for icons (remapped globally in [`src/boot/icon-map.ts`](./src/boot/icon-map.ts), no per-component changes needed)
- [Inter](https://rsms.me/inter/) (self-hosted via `@fontsource-variable/inter`) as the default typeface
- ESLint (flat config) + Prettier

## Architecture: business-segment modules

Instead of one generic dashboard, pages are organized **by business segment** under `src/modules/<segment>/`, each self-contained (`pages/`, `components/`, `data/`, `routes.ts`, `nav.ts`). Registering a module is two lines in [`src/modules/index.ts`](./src/modules/index.ts) — so a module can be copied into another project without dragging the rest of the app along.

Each module contributes its own labeled group to the sidebar (e.g. **Finance** → Overview / Transactions / Accounts), the same "section + sub-pages" pattern used by most admin dashboard templates.

## UI conventions

- **Row/card click → detail dialog.** Every list or table of records (transactions, leads, vehicles...) opens a small dialog with that record's details on click, via the shared [`src/components/RecordDetailDialog.vue`](./src/components/RecordDetailDialog.vue) — give it a `title`, optional `subtitle`/avatar, and a `fields: {label, value, color?}[]` array. New lists should follow the same pattern rather than inventing a one-off dialog.
- **Rounded everything.** Cards, buttons and dialogs all share one corner radius (`$generic-border-radius` / `$button-border-radius`, both 12px, in [`quasar.variables.scss`](./src/css/quasar.variables.scss)) — don't override radius per component, change the token instead.

## Getting started

Requires Node.js `^22.12 || ^24 || >=26` and [pnpm](https://pnpm.io).

```bash
pnpm install
```

### Development server

```bash
pnpm dev
```

### Lint & format

```bash
pnpm lint        # fixes issues
pnpm lint:check  # check only
```

### Type-check

```bash
pnpm typecheck
```

### Production build

```bash
pnpm build
```

Configuration lives in [`quasar.config.ts`](./quasar.config.ts) — see the [Quasar CLI docs](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file).

### Deploying (Netlify)

The router runs in [history mode](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework-vuerouter-mode) (no `#` in URLs), so a hard refresh on a deep link like `/fleet/vehicles` needs the host to fall back to `index.html` instead of 404ing. This repo already ships that config for Netlify:

- [`netlify.toml`](./netlify.toml) — build command, publish directory (`dist/spa`) and the SPA redirect rule, used when you connect the repo directly to Netlify
- [`public/_redirects`](./public/_redirects) — the same fallback rule, copied into the build output, used if you instead drag-and-drop `dist/spa` or deploy it from another CI

Deploying to another static host (Vercel, Cloudflare Pages, S3, etc.)? Look for the equivalent "SPA fallback" / rewrite-all-to-`index.html` setting.

### After deploying: a few SEO loose ends

This repo ships with SEO basics already in place — Open Graph/Twitter meta tags (including a banner image at [`public/og-image.png`](./public/og-image.png)), `<meta name="description">`/`keywords`, `robots.txt` and `sitemap.xml`, currently pointed at the live demo's domain (`quasar-dashboard-pro.netlify.app`). If you fork this and deploy it elsewhere, a few things are domain-specific and need updating to **your** domain instead:

- [`index.html`](./index.html) — `og:url`, `<link rel="canonical">`, and the `og:image`/`twitter:image` URLs.
- [`public/sitemap.xml`](./public/sitemap.xml) — every `<loc>` (the sitemap spec requires absolute URLs, so this can't be relative).
- Swap [`public/og-image.png`](./public/og-image.png) for your own banner if you rebrand the template.
- On GitHub itself, set the repo's **Topics** (`quasar`, `vue3`, `admin-dashboard`, `dashboard-template`, ...) and a **Social preview image** (Settings → General) — this matters more for GitHub/Google discoverability of the template itself than any meta tag.

## AI-assisted development (MCP)

This repo ships a [Quasar MCP server](https://quasar.dev/start/ai-agents#setup) configuration for AI coding agents (Claude Code, VS Code, etc.) at [`.mcp.json`](./.mcp.json) / [`.vscode/mcp.json`](./.vscode/mcp.json). It gives the agent offline access to the exact Quasar docs and component APIs matching the versions installed in `node_modules` — no extra setup needed, it's picked up automatically once you open the project.

## Contributing

Issues and PRs are welcome. This is a community template — the goal is to keep it aligned with current Vue/Quasar best practices, not to accumulate one-off features.

## License

Released under the [Apache License 2.0](./LICENSE) — free for personal and commercial use, with no attribution required.
