
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('src/pages/Home.vue') },
      { path: 'map', name: 'map', component: () => import('src/pages/Map.vue') },
      { path: 'charts', name: 'charts', component: () => import('src/pages/Charts.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
