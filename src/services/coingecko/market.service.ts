import { coingeckoClient } from './coingecko.client';
import type { CoinMarketDto, GlobalMarketDto, TrendingDto } from './coingecko.dto';
import { toCoinMarket, toGlobalMarket, toTrendingCoins } from './coingecko.mappers';
import type { VsCurrency } from './coingecko.models';

interface CallOptions {
  signal?: AbortSignal | undefined;
}

export interface GetMarketsParams {
  vsCurrency?: VsCurrency;
  perPage?: number;
  page?: number;
  /** Restrict to specific coin ids (e.g. a watchlist). */
  ids?: string[];
}

/** Market-wide data: coin rankings, global totals, trending searches. */
export const marketService = {
  async getMarkets(params: GetMarketsParams = {}, { signal }: CallOptions = {}) {
    const dto = await coingeckoClient.get<CoinMarketDto[]>('/coins/markets', {
      query: {
        vs_currency: params.vsCurrency ?? 'usd',
        order: 'market_cap_desc',
        per_page: params.perPage ?? 100,
        page: params.page ?? 1,
        ids: params.ids,
        sparkline: true,
        price_change_percentage: ['1h', '24h', '7d'],
      },
      cacheTtlMs: 30_000,
      signal,
    });
    return dto.map(toCoinMarket);
  },

  async getGlobal(vsCurrency: VsCurrency = 'usd', { signal }: CallOptions = {}) {
    const dto = await coingeckoClient.get<GlobalMarketDto>('/global', {
      cacheTtlMs: 30_000,
      signal,
    });
    return toGlobalMarket(dto, vsCurrency);
  },

  async getTrending({ signal }: CallOptions = {}) {
    const dto = await coingeckoClient.get<TrendingDto>('/search/trending', {
      cacheTtlMs: 5 * 60_000,
      signal,
    });
    return toTrendingCoins(dto);
  },
};
