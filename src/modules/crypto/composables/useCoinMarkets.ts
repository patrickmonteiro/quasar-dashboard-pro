import { computed } from 'vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { marketService, type GetMarketsParams } from '@/services/coingecko';

/** Top coins by market cap (with 7d sparklines), auto-refreshed every minute. */
export function useCoinMarkets(params: GetMarketsParams = {}) {
  const request = useApiRequest((signal) => marketService.getMarkets(params, { signal }), {
    pollIntervalMs: 60_000,
  });

  const coins = computed(() => request.data.value ?? []);

  const byChange24h = computed(() =>
    coins.value
      .filter((coin) => coin.change24h !== null)
      .toSorted((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0)),
  );
  const topGainers = computed(() => byChange24h.value.slice(0, 5));
  const topLosers = computed(() => byChange24h.value.slice(-5).reverse());

  return { ...request, coins, topGainers, topLosers };
}
