import { coingeckoClient } from './coingecko.client';
import type { CoinDetailDto, MarketChartDto } from './coingecko.dto';
import { toCoinDetail, toMarketChart } from './coingecko.mappers';
import type { VsCurrency } from './coingecko.models';

interface CallOptions {
  signal?: AbortSignal | undefined;
}

/** Chart ranges accepted by `/coins/{id}/market_chart` (days back from now). */
export type ChartDays = 1 | 7 | 30 | 90 | 365;

/** Single-coin data: profile/stats and price history. */
export const coinService = {
  async getById(id: string, vsCurrency: VsCurrency = 'usd', { signal }: CallOptions = {}) {
    const dto = await coingeckoClient.get<CoinDetailDto>(`/coins/${encodeURIComponent(id)}`, {
      query: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      cacheTtlMs: 30_000,
      signal,
    });
    return toCoinDetail(dto, vsCurrency);
  },

  async getMarketChart(
    id: string,
    days: ChartDays,
    vsCurrency: VsCurrency = 'usd',
    { signal }: CallOptions = {},
  ) {
    const dto = await coingeckoClient.get<MarketChartDto>(
      `/coins/${encodeURIComponent(id)}/market_chart`,
      {
        query: { vs_currency: vsCurrency, days },
        cacheTtlMs: 60_000,
        signal,
      },
    );
    return toMarketChart(dto);
  },
};
