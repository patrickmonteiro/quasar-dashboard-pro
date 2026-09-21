import type { RouteRecordRaw } from 'vue-router';
import type { NavSection } from './nav-item';

import { routes as financeRoutes } from './finance/routes';
import { navSection as financeNav } from './finance/nav';

import { routes as crmRoutes } from './crm/routes';
import { navSection as crmNav } from './crm/nav';

import { routes as ecommerceRoutes } from './ecommerce/routes';
import { navSection as ecommerceNav } from './ecommerce/nav';

import { routes as fleetRoutes } from './fleet/routes';
import { navSection as fleetNav } from './fleet/nav';

import { routes as pagesRoutes } from './pages/routes';
import { navSection as pagesNav } from './pages/nav';

/**
 * Registry of business-segment modules (finance, crm, ecommerce, fleet, erp, ...).
 *
 * Each module lives entirely under `src/modules/<name>` (pages, components,
 * routes, nav) and is wired into the app only here — so a module can be
 * copied into another project by bringing its folder plus the two lines
 * added below.
 */
export const moduleRoutes: RouteRecordRaw[] = [
  ...financeRoutes,
  ...crmRoutes,
  ...ecommerceRoutes,
  ...fleetRoutes,
  ...pagesRoutes,
];

export const moduleNavSections: NavSection[] = [
  financeNav,
  crmNav,
  ecommerceNav,
  fleetNav,
  pagesNav,
];
