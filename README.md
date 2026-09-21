<div align="center">
  <img src=".github/logo.png" alt="Quasar Dashboard PRO" width="360" />
</div>

# Quasar Dashboard PRO

An open source, modern admin dashboard template built with **Vue 3**, **Quasar 2** and **TypeScript**. Free to use as a starting point for your own projects.

> This is a from-scratch rebuild of a template that had been around for years on Quasar v1 / Vue 2. It now follows current Vue and Quasar conventions: Composition API with `<script setup>`, Vite, Pinia, and TypeScript.

## Tech stack

- [Vue 3](https://vuejs.org) (Composition API, `<script setup>`)
- [Quasar 2](https://quasar.dev) with the Vite-based CLI (`@quasar/app-vite`)
- [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org) for state management
- [Vue Router](https://router.vuejs.org) (history mode) with a navigation guard for authenticated routes
- [ApexCharts](https://apexcharts.com) for dashboard charts
- [Material Symbols Outlined](https://fonts.google.com/icons) for icons (thin/elegant vs. the default Material Icons — remapped globally in [`src/boot/icon-map.ts`](./src/boot/icon-map.ts), no per-component changes needed)
- [Inter](https://rsms.me/inter/) (self-hosted via `@fontsource-variable/inter`) as the default typeface
- ESLint (flat config) + Prettier

## Business modules

Instead of one generic dashboard, pages are organized **by business segment** under `src/modules/<segment>/`, each self-contained (`pages/`, `components/`, `data/`, `routes.ts`, `nav.ts`). Registering a module is two lines in [`src/modules/index.ts`](./src/modules/index.ts) — so a module can be copied into another project without dragging the rest of the app along.

Each module contributes its own labeled group to the sidebar (e.g. **Finance** → Overview / Transactions / Accounts), the same "section + sub-pages" pattern used by most admin dashboard templates.

Currently included:

- **Finance** (`src/modules/finance`, `/finance/*`) — Overview (currency cards with sparklines, income/expenditure chart, budget breakdown, credit score gauge), Transactions (full history table), Accounts
- **CRM** (`src/modules/crm`, `/crm/*`) — Overview (pipeline-by-stage chart, lead stat cards, upcoming activities), Leads (full table), Deals (kanban board by stage), Mail (inbox with folders, reading pane and compose, built with `QSplitter`)
- **E-Commerce** (`src/modules/ecommerce`, `/ecommerce/*`) — a full product-to-order flow: Products (search/filter/sort grid) → product detail (gallery, quantity, wishlist, related products) → Shopping Cart → Checkout (`QStepper`: shipping/payment/review) → Order Summary receipt, plus Order History (expandable rows with a delivery-status stepper). Cart state lives in a small Pinia store ([`cart-store.ts`](./src/modules/ecommerce/cart-store.ts)) local to the module. Images are mocked with [Lorem Picsum](https://picsum.photos).

Plus the shared "core": auth (demo login, route guard, persisted session), the dashboard shell (header, collapsible grouped drawer, dark mode toggle, account menu), and Pinia stores.

More segments (ERP, etc.) and pages will be added over time — contributions welcome.

## UI conventions

- **Row/card click → detail dialog.** Every list or table of records (transactions, leads, ...) opens a small dialog with that record's details on click, via the shared [`src/components/RecordDetailDialog.vue`](./src/components/RecordDetailDialog.vue) — give it a `title`, optional `subtitle`/avatar, and a `fields: {label, value, color?}[]` array. New lists should follow the same pattern rather than inventing a one-off dialog. See `TransactionsTable.vue` / `LeadsTable.vue` for reference usage.
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

## AI-assisted development (MCP)

This repo ships a [Quasar MCP server](https://quasar.dev/start/ai-agents#setup) configuration for AI coding agents (Claude Code, VS Code, etc.) at [`.mcp.json`](./.mcp.json) / [`.vscode/mcp.json`](./.vscode/mcp.json). It gives the agent offline access to the exact Quasar docs and component APIs matching the versions installed in `node_modules` — no extra setup needed, it's picked up automatically once you open the project.

## Contributing

Issues and PRs are welcome. This is a community template — the goal is to keep it aligned with current Vue/Quasar best practices, not to accumulate one-off features.

## License

[Apache License 2.0](./LICENSE)
