/** App-facing crypto models (camelCase, null-safe). UI code only ever sees these, never DTOs. */

export type VsCurrency = 'usd' | 'brl' | 'eur';

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  rank: number | null;
  price: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  change1h: number | null;
  change24h: number | null;
  change7d: number | null;
  circulatingSupply: number;
  maxSupply: number | null;
  ath: number;
  athChangePercent: number | null;
  /** Hourly prices for the last 7 days (oldest → newest). */
  sparkline7d: number[];
}

export interface GlobalMarket {
  totalMarketCap: number;
  totalVolume: number;
  marketCapChange24h: number;
  volumeChange24h: number | null;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
  markets: number;
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  rank: number | null;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: string;
  rank: number | null;
  /** Plain text (HTML tags stripped). */
  description: string;
  homepage: string | null;
  categories: string[];
  genesisDate: string | null;
  hashingAlgorithm: string | null;
  sentimentUpPercent: number | null;
  price: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  change24h: number | null;
  change7d: number | null;
  change30d: number | null;
  change1y: number | null;
  ath: number;
  athDate: string | null;
  athChangePercent: number | null;
  atl: number;
  atlDate: string | null;
  circulatingSupply: number;
  totalSupply: number | null;
  maxSupply: number | null;
}

/** `[timestampMs, value]` pairs, ready for a datetime ApexCharts series. */
export type TimeSeries = [number, number][];

export interface MarketChart {
  prices: TimeSeries;
  volumes: TimeSeries;
}
