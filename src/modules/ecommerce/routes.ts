import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the E-Commerce module, mounted under MainLayout ('/ecommerce/*').
 * Copy this whole `modules/ecommerce` folder into another project and
 * register `routes`/`navSection` in `src/modules/index.ts` to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'ecommerce/products',
    name: 'ecommerce-products',
    component: () => import('./pages/EcommerceProductListPage.vue'),
  },
  {
    path: 'ecommerce/products/:id',
    name: 'ecommerce-product-overview',
    component: () => import('./pages/EcommerceProductOverviewPage.vue'),
  },
  {
    path: 'ecommerce/cart',
    name: 'ecommerce-cart',
    component: () => import('./pages/EcommerceShoppingCartPage.vue'),
  },
  {
    path: 'ecommerce/checkout',
    name: 'ecommerce-checkout',
    component: () => import('./pages/EcommerceCheckoutPage.vue'),
  },
  {
    path: 'ecommerce/orders',
    name: 'ecommerce-order-history',
    component: () => import('./pages/EcommerceOrderHistoryPage.vue'),
  },
  {
    path: 'ecommerce/order-summary',
    name: 'ecommerce-order-summary',
    component: () => import('./pages/EcommerceOrderSummaryPage.vue'),
  },
];
