import type { RouteRecordRaw } from 'vue-router';

/**
 * Route children for the Crypto module, mounted under MainLayout ('/crypto/*').
 * Data comes from the CoinGecko services in `src/services/coingecko` — copy that
 * folder plus `src/services/api-client.ts` and `src/composables/useApiRequest.ts`
 * along with this module when reusing it in another project.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'crypto',
    name: 'crypto-market',
    component: () => import('./pages/CryptoMarketPage.vue'),
  },
  {
    path: 'crypto/coins/:id',
    name: 'crypto-coin-detail',
    component: () => import('./pages/CoinDetailPage.vue'),
  },
];
