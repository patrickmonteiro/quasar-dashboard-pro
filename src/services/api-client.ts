/**
 * Central HTTP layer — every API call in the app goes through a client created here.
 *
 * Built on native `fetch` (no axios dependency). It standardizes:
 *  - base URL + default query params/headers per API (e.g. an API key)
 *  - JSON request/response handling
 *  - timeouts and cancellation (`AbortSignal`)
 *  - retries with backoff for transient failures (network, 5xx, 429)
 *  - optional short-lived in-memory cache for GET requests
 *  - a single error type, `ApiError`, with a normalized `code`
 *
 * Usage:
 *   export const myApi = createApiClient({ baseURL: 'https://api.example.com/v1' });
 *   const users = await myApi.request<UserDto[]>('/users', { query: { page: 1 } });
 *
 * Services (`src/services/<api>/*.service.ts`) wrap these calls per resource and map
 * DTOs into app models; composables consume the services and hold UI state.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryPrimitive | QueryPrimitive[]>;
type HeadersInitRecord = Record<string, string>;

export interface RequestOptions {
  method?: HttpMethod | undefined;
  query?: QueryParams | undefined;
  /** Serialized as JSON. */
  body?: unknown;
  headers?: HeadersInitRecord | undefined;
  signal?: AbortSignal | undefined;
  timeoutMs?: number | undefined;
  /** GET only: reuse a successful response for this long (ms). Useful for rate-limited APIs. */
  cacheTtlMs?: number | undefined;
}

export interface ApiClientConfig {
  baseURL: string;
  /** Static headers, or a function for dynamic ones (e.g. an auth token read from a store). */
  headers?: HeadersInitRecord | (() => HeadersInitRecord);
  /** Query params added to every request (e.g. a public API key). */
  query?: QueryParams;
  /** Default: 15s. */
  timeoutMs?: number;
  /** Extra attempts for network errors, 5xx and 429 responses. Default: no retries. */
  retry?: { attempts: number; delayMs: number };
}

export type ApiErrorCode = 'HTTP' | 'RATE_LIMITED' | 'TIMEOUT' | 'NETWORK' | 'ABORTED' | 'PARSE';

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number | null;
  /** From the `Retry-After` header on 429 responses, when present. */
  readonly retryAfterMs: number | null;

  constructor(
    message: string,
    code: ApiErrorCode,
    extra: { status?: number; retryAfterMs?: number | null; cause?: unknown } = {},
  ) {
    super(message, { cause: extra.cause });
    this.name = 'ApiError';
    this.code = code;
    this.status = extra.status ?? null;
    this.retryAfterMs = extra.retryAfterMs ?? null;
  }
}

/** Normalizes anything thrown into an `ApiError` (useful in composables' catch blocks). */
export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  if (err instanceof DOMException && err.name === 'AbortError') {
    return new ApiError('Request was cancelled.', 'ABORTED', { cause: err });
  }
  const message = err instanceof Error ? err.message : 'Unexpected error.';
  return new ApiError(message, 'NETWORK', { cause: err });
}

const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_RETRY_WAIT_MS = 10_000;

export function createApiClient(config: ApiClientConfig) {
  const cache = new Map<string, { expiresAt: number; data: unknown }>();

  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const method = options.method ?? 'GET';
    const url = buildUrl(config.baseURL, path, { ...config.query, ...options.query });
    const cacheTtlMs = method === 'GET' ? (options.cacheTtlMs ?? 0) : 0;

    if (cacheTtlMs > 0) {
      const hit = cache.get(url);
      if (hit && hit.expiresAt > Date.now()) return hit.data as T;
    }

    const extraAttempts = config.retry?.attempts ?? 0;
    const baseDelayMs = config.retry?.delayMs ?? 1000;

    for (let attempt = 0; ; attempt++) {
      try {
        const data = await send<T>(url, method, options);
        if (cacheTtlMs > 0) cache.set(url, { expiresAt: Date.now() + cacheTtlMs, data });
        return data;
      } catch (err) {
        const apiError = toApiError(err);
        if (attempt >= extraAttempts || !isRetryable(apiError)) throw apiError;

        const backoffMs = apiError.retryAfterMs ?? baseDelayMs * 2 ** attempt;
        await wait(Math.min(backoffMs, MAX_RETRY_WAIT_MS), options.signal);
      }
    }
  }

  async function send<T>(url: string, method: HttpMethod, options: RequestOptions): Promise<T> {
    const timeoutMs = options.timeoutMs ?? config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const signal = options.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal;

    const baseHeaders = typeof config.headers === 'function' ? config.headers() : config.headers;
    const headers: HeadersInitRecord = {
      Accept: 'application/json',
      ...baseHeaders,
      ...options.headers,
    };

    const init: RequestInit = { method, headers, signal };
    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(options.body);
    }

    let response: Response;
    try {
      response = await fetch(url, init);
    } catch (err) {
      if (options.signal?.aborted) {
        throw new ApiError('Request was cancelled.', 'ABORTED', { cause: err });
      }
      if (timeoutSignal.aborted) {
        throw new ApiError(`Request timed out after ${timeoutMs / 1000}s.`, 'TIMEOUT', {
          cause: err,
        });
      }
      throw new ApiError('Network error — check your connection.', 'NETWORK', { cause: err });
    }

    if (!response.ok) throw await toHttpError(response);
    if (response.status === 204) return undefined as T;

    try {
      return (await response.json()) as T;
    } catch (err) {
      throw new ApiError('The server returned an invalid response.', 'PARSE', {
        status: response.status,
        cause: err,
      });
    }
  }

  return {
    request,
    get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(path, { ...options, method: 'POST', body }),
    put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(path, { ...options, method: 'PUT', body }),
    patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(path, { ...options, method: 'PATCH', body }),
    delete: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(path, { ...options, method: 'DELETE' }),
    clearCache: () => cache.clear(),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;

function buildUrl(baseURL: string, path: string, query: QueryParams): string {
  const url = new URL(baseURL.replace(/\/$/, '') + '/' + path.replace(/^\//, ''));
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    url.searchParams.set(
      key,
      Array.isArray(value) ? value.filter((v) => v != null).join(',') : String(value),
    );
  }
  return url.toString();
}

async function toHttpError(response: Response): Promise<ApiError> {
  const serverMessage = await readErrorMessage(response);

  if (response.status === 429) {
    const retryAfterSeconds = Number(response.headers.get('Retry-After'));
    return new ApiError(
      'Rate limit reached — please wait a moment and try again.',
      'RATE_LIMITED',
      {
        status: 429,
        retryAfterMs:
          Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
            ? retryAfterSeconds * 1000
            : null,
      },
    );
  }

  return new ApiError(serverMessage ?? `Request failed with status ${response.status}.`, 'HTTP', {
    status: response.status,
  });
}

/** Best effort: most APIs return `{ message }` or `{ error }` (CoinGecko: `{ status: { error_message } }`). */
async function readErrorMessage(response: Response): Promise<string | null> {
  try {
    const body = (await response.json()) as Record<string, unknown>;
    const status = body.status as Record<string, unknown> | undefined;
    const candidate = body.message ?? body.error ?? status?.error_message;
    return typeof candidate === 'string' ? candidate : null;
  } catch {
    return null;
  }
}

function isRetryable(error: ApiError): boolean {
  if (error.code === 'NETWORK' || error.code === 'RATE_LIMITED') return true;
  return error.code === 'HTTP' && error.status !== null && error.status >= 500;
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new ApiError('Request was cancelled.', 'ABORTED'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new ApiError('Request was cancelled.', 'ABORTED'));
      },
      { once: true },
    );
  });
}
