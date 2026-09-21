import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Fleet module, mounted under MainLayout ('/fleet/*').
 * Copy this whole `modules/fleet` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'fleet',
    name: 'fleet-map',
    component: () => import('./pages/FleetMapPage.vue'),
  },
  {
    path: 'fleet/vehicles',
    name: 'fleet-vehicles',
    component: () => import('./pages/FleetVehiclesPage.vue'),
  },
  {
    path: 'fleet/trips',
    name: 'fleet-trips',
    component: () => import('./pages/FleetTripHistoryPage.vue'),
  },
  {
    path: 'fleet/alerts',
    name: 'fleet-alerts',
    component: () => import('./pages/FleetAlertsPage.vue'),
  },
];
