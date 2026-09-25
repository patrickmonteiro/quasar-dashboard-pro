import { createApiClient } from '../api-client';

/**
 * CoinGecko public API (https://docs.coingecko.com) — works without a key, but the
 * keyless tier is heavily rate-limited. For a steadier quota, create a free "Demo" key
 * and set `QCLI_COINGECKO_API_KEY` in a `.env` file (see `.env.example`), then restart
 * the dev server. The key is sent as a query param rather than a header because
 * CoinGecko's CORS preflight doesn't allow the custom `x-cg-demo-api-key` header.
 *
 * Note: anything in a frontend bundle is public — only use a Demo key here, never a Pro key.
 */
const apiKey = (import.meta.env.QCLI_COINGECKO_API_KEY as string | undefined)?.trim();

export const coingeckoClient = createApiClient({
  baseURL: 'https://api.coingecko.com/api/v3',
  query: apiKey ? { x_cg_demo_api_key: apiKey } : {},
  timeoutMs: 15_000,
  retry: { attempts: 1, delayMs: 2_000 },
});
