import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Security module, mounted under MainLayout ('/security/*').
 * Copy this whole `modules/security` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'security',
    name: 'security-overview',
    component: () => import('./pages/SecurityOverviewPage.vue'),
  },
  {
    path: 'security/incidents',
    name: 'security-incidents',
    component: () => import('./pages/SecurityIncidentsPage.vue'),
  },
  {
    path: 'security/threat-map',
    name: 'security-threat-map',
    component: () => import('./pages/SecurityThreatMapPage.vue'),
  },
];
