import { useApiRequest } from '@/composables/useApiRequest';
import { marketService, type VsCurrency } from '@/services/coingecko';

/** Global totals (market cap, volume, dominance), auto-refreshed every minute. */
export function useGlobalMarket(vsCurrency: VsCurrency = 'usd') {
  return useApiRequest((signal) => marketService.getGlobal(vsCurrency, { signal }), {
    pollIntervalMs: 60_000,
  });
}
