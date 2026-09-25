/** Raw CoinGecko response shapes (snake_case, as returned by the API). Only fields we use. */

export interface CoinMarketDto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_percentage_24h: number | null;
  circulating_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  last_updated: string | null;
  sparkline_in_7d?: { price: number[] };
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
}

export interface GlobalMarketDto {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    volume_change_percentage_24h_usd?: number;
    updated_at: number;
  };
}

export interface TrendingDto {
  coins: {
    item: {
      id: string;
      name: string;
      symbol: string;
      thumb: string;
      market_cap_rank: number | null;
      score: number;
    };
  }[];
}

type CurrencyMap = Record<string, number | null | undefined>;

export interface CoinDetailDto {
  id: string;
  symbol: string;
  name: string;
  hashing_algorithm: string | null;
  categories: (string | null)[];
  description: { en?: string };
  links: { homepage: string[] };
  image: { large: string; small: string; thumb: string };
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  market_cap_rank: number | null;
  market_data: {
    current_price: CurrencyMap;
    market_cap: CurrencyMap;
    total_volume: CurrencyMap;
    high_24h: CurrencyMap;
    low_24h: CurrencyMap;
    ath: CurrencyMap;
    ath_date: Record<string, string>;
    ath_change_percentage: CurrencyMap;
    atl: CurrencyMap;
    atl_date: Record<string, string>;
    price_change_percentage_24h_in_currency: CurrencyMap;
    price_change_percentage_7d_in_currency: CurrencyMap;
    price_change_percentage_30d_in_currency: CurrencyMap;
    price_change_percentage_1y_in_currency: CurrencyMap;
    circulating_supply: number | null;
    total_supply: number | null;
    max_supply: number | null;
  };
}

/** Each entry is `[timestampMs, value]`. */
export interface MarketChartDto {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}
