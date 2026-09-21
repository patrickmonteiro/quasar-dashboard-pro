import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Finance module, mounted under MainLayout ('/finance/*').
 * Copy this whole `modules/finance` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'finance',
    name: 'finance-overview',
    component: () => import('./pages/FinanceDashboardPage.vue'),
  },
  {
    path: 'finance/transactions',
    name: 'finance-transactions',
    component: () => import('./pages/FinanceTransactionsPage.vue'),
  },
  {
    path: 'finance/accounts',
    name: 'finance-accounts',
    component: () => import('./pages/FinanceAccountsPage.vue'),
  },
];
