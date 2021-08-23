
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/pages/Dashboard.vue') },
      { path: 'fintech', name: 'fintech', component: () => import('src/pages/Fintech.vue') },
      { path: 'pricing', name: 'pricing', component: () => import('src/pages/Pricing.vue') },
      { path: 'faqs', name: 'faqs', component: () => import('src/pages/Faqs.vue') },
      { path: 'map', name: 'map', component: () => import('src/pages/Map.vue') },
      { path: 'charts', name: 'charts', component: () => import('src/pages/Charts.vue') },
      { path: 'audioRecord', name: 'audioRecord', component: () => import('src/pages/AudioRecord.vue') },
      { path: 'audio', name: 'audio', component: () => import('src/pages/Audio.vue') },
      { path: 'video', name: 'video', component: () => import('src/pages/Video.vue') },
      { path: 'form', name: 'form', component: () => import('src/pages/Form.vue') },
      { path: 'basicTable', name: 'basicTable', component: () => import('src/pages/tables/BasicTable.vue') },
      { path: 'editTable', name: 'editTable', component: () => import('src/pages/tables/EditTable.vue') },
      { path: 'selectionTable', name: 'selectionTable', component: () => import('src/pages/tables/SelectionTable.vue') },
      { path: 'multiSelectionTable', name: 'multiSelectionTable', component: () => import('src/pages/tables/MultiSelectionTable.vue') },
      { path: 'serverDataTable', name: 'serverDataTable', component: () => import('src/pages/tables/ServerDataTable.vue') },
      { path: 'chat', name: 'chat', component: () => import('src/pages/Chat.vue') },
      { path: 'qrcodeReader', name: 'qrcodeReader', component: () => import('src/pages/Qrcode.vue') },
      { path: 'qrcodeGenarator', name: 'qrcodeGenarator', component: () => import('src/pages/QrcodeGenarator.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('src/pages/Login.vue') }
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
