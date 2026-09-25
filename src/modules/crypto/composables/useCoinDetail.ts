import { toValue, watch, type MaybeRefOrGetter } from 'vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { coinService, type VsCurrency } from '@/services/coingecko';

/** One coin's profile and stats; refetches when `id` changes, refreshes every minute. */
export function useCoinDetail(id: MaybeRefOrGetter<string>, vsCurrency: VsCurrency = 'usd') {
  const request = useApiRequest(
    (signal) => coinService.getById(toValue(id), vsCurrency, { signal }),
    { immediate: false, pollIntervalMs: 60_000 },
  );

  watch(
    () => toValue(id),
    () => void request.execute(),
    { immediate: true },
  );

  return request;
}
