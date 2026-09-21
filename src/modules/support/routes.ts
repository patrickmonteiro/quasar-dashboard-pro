import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Support module, mounted under MainLayout ('/support/*').
 * Copy this whole `modules/support` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'support',
    name: 'support-overview',
    component: () => import('./pages/SupportDashboardPage.vue'),
  },
  {
    path: 'support/inbox',
    name: 'support-inbox',
    component: () => import('./pages/SupportInboxPage.vue'),
  },
  {
    path: 'support/tickets',
    name: 'support-tickets',
    component: () => import('./pages/SupportTicketsPage.vue'),
  },
];
