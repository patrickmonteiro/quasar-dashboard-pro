import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Pages module, mounted under MainLayout ('/pages/*').
 * A grab-bag of simple, common utility pages (CRUD example, invoice, FAQ,
 * contact form, empty state) — modeled after the "Pages" section of most
 * admin dashboard templates. Copy this whole `modules/pages` folder into
 * another project and register `routes`/`navSection` in `src/modules/index.ts`
 * to reuse it.
 */
export const routes: RouteRecordRaw[] = [
  { path: 'pages/crud', name: 'pages-crud', component: () => import('./pages/CrudPage.vue') },
  {
    path: 'pages/invoice',
    name: 'pages-invoice',
    component: () => import('./pages/InvoicePage.vue'),
  },
  { path: 'pages/faq', name: 'pages-faq', component: () => import('./pages/FaqPage.vue') },
  {
    path: 'pages/contact',
    name: 'pages-contact',
    component: () => import('./pages/ContactUsPage.vue'),
  },
  { path: 'pages/empty', name: 'pages-empty', component: () => import('./pages/EmptyPage.vue') },
];
