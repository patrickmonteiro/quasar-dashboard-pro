import { toValue, watch, type MaybeRefOrGetter } from 'vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { coinService, type ChartDays, type VsCurrency } from '@/services/coingecko';

/** Price/volume history for a coin; refetches when `id` or `days` change. */
export function useMarketChart(
  id: MaybeRefOrGetter<string>,
  days: MaybeRefOrGetter<ChartDays>,
  vsCurrency: VsCurrency = 'usd',
) {
  const request = useApiRequest(
    (signal) => coinService.getMarketChart(toValue(id), toValue(days), vsCurrency, { signal }),
    { immediate: false },
  );

  watch([() => toValue(id), () => toValue(days)], () => void request.execute(), {
    immediate: true,
  });

  return request;
}
