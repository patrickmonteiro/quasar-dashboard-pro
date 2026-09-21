import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the CRM module, mounted under MainLayout ('/crm/*').
 * Copy this whole `modules/crm` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'crm',
    name: 'crm-overview',
    component: () => import('./pages/CrmDashboardPage.vue'),
  },
  {
    path: 'crm/leads',
    name: 'crm-leads',
    component: () => import('./pages/CrmLeadsPage.vue'),
  },
  {
    path: 'crm/deals',
    name: 'crm-deals',
    component: () => import('./pages/CrmDealsPage.vue'),
  },
  {
    path: 'crm/mail',
    name: 'crm-mail',
    component: () => import('./pages/CrmMailPage.vue'),
  },
  {
    path: 'crm/calendar',
    name: 'crm-calendar',
    component: () => import('./pages/CrmCalendarPage.vue'),
  },
];
