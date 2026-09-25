import { onScopeDispose, ref, shallowRef, type Ref } from 'vue';
import { toApiError, type ApiError } from '@/services/api-client';

export interface UseApiRequestOptions {
  /** Run once right away. Default: true. */
  immediate?: boolean;
  /** Re-run on this interval (ms). Paused while the browser tab is hidden. */
  pollIntervalMs?: number;
}

export interface UseApiRequestReturn<T> {
  data: Readonly<Ref<T | null>>;
  pending: Readonly<Ref<boolean>>;
  error: Readonly<Ref<ApiError | null>>;
  lastUpdated: Readonly<Ref<Date | null>>;
  /** (Re)runs the request, cancelling any one still in flight. */
  execute: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Generic async state for a service call — the building block every domain composable
 * (`useCoinMarkets`, `useCoinDetail`, ...) is made of:
 *
 *   const { data, pending, error, refresh } = useApiRequest(
 *     (signal) => marketService.getMarkets({ perPage: 100 }, { signal }),
 *     { pollIntervalMs: 60_000 },
 *   );
 *
 * - The fetcher receives an `AbortSignal`; a new call aborts the previous one and
 *   everything is aborted when the owning component unmounts.
 * - On failure the last good `data` is kept (so a flaky poll doesn't blank the UI).
 */
export function useApiRequest<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  options: UseApiRequestOptions = {},
): UseApiRequestReturn<T> {
  const { immediate = true, pollIntervalMs } = options;

  const data = shallowRef<T | null>(null);
  const pending = ref(false);
  const error = shallowRef<ApiError | null>(null);
  const lastUpdated = ref<Date | null>(null);

  let controller: AbortController | null = null;

  async function execute() {
    controller?.abort();
    const current = new AbortController();
    controller = current;

    pending.value = true;
    error.value = null;

    try {
      data.value = await fetcher(current.signal);
      lastUpdated.value = new Date();
    } catch (err) {
      const apiError = toApiError(err);
      if (apiError.code !== 'ABORTED') error.value = apiError;
    } finally {
      if (controller === current) pending.value = false;
    }
  }

  let timer: ReturnType<typeof setInterval> | undefined;

  function onVisibilityChange() {
    if (document.visibilityState !== 'visible' || !pollIntervalMs) return;
    const age = lastUpdated.value ? Date.now() - lastUpdated.value.getTime() : Infinity;
    if (age >= pollIntervalMs) void execute();
  }

  if (pollIntervalMs) {
    timer = setInterval(() => {
      if (document.visibilityState === 'visible') void execute();
    }, pollIntervalMs);
    document.addEventListener('visibilitychange', onVisibilityChange);
  }

  onScopeDispose(() => {
    controller?.abort();
    if (timer) clearInterval(timer);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  if (immediate) void execute();

  return { data, pending, error, lastUpdated, execute, refresh: execute };
}
