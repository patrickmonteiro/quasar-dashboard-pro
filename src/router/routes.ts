import type { RouteRecordRaw } from 'vue-router';
import { moduleRoutes } from '@/modules';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('@/pages/auth/LoginPage.vue') }],
  },

  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', redirect: 'finance' }, ...moduleRoutes],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
