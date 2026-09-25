import { useApiRequest } from '@/composables/useApiRequest';
import { marketService } from '@/services/coingecko';

/** Most-searched coins on CoinGecko in the last 24h. */
export function useTrendingCoins() {
  return useApiRequest((signal) => marketService.getTrending({ signal }));
}
