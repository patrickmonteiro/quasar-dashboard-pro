import type {
  CoinDetailDto,
  CoinMarketDto,
  GlobalMarketDto,
  MarketChartDto,
  TrendingDto,
} from './coingecko.dto';
import type {
  CoinDetail,
  CoinMarket,
  GlobalMarket,
  MarketChart,
  TrendingCoin,
  VsCurrency,
} from './coingecko.models';

export function toCoinMarket(dto: CoinMarketDto): CoinMarket {
  return {
    id: dto.id,
    symbol: dto.symbol.toUpperCase(),
    name: dto.name,
    image: dto.image,
    rank: dto.market_cap_rank,
    price: dto.current_price ?? 0,
    marketCap: dto.market_cap ?? 0,
    volume24h: dto.total_volume ?? 0,
    high24h: dto.high_24h ?? 0,
    low24h: dto.low_24h ?? 0,
    change1h: dto.price_change_percentage_1h_in_currency ?? null,
    change24h: dto.price_change_percentage_24h_in_currency ?? dto.price_change_percentage_24h,
    change7d: dto.price_change_percentage_7d_in_currency ?? null,
    circulatingSupply: dto.circulating_supply ?? 0,
    maxSupply: dto.max_supply,
    ath: dto.ath ?? 0,
    athChangePercent: dto.ath_change_percentage,
    sparkline7d: dto.sparkline_in_7d?.price ?? [],
  };
}

export function toGlobalMarket(dto: GlobalMarketDto, vs: VsCurrency): GlobalMarket {
  const { data } = dto;
  return {
    totalMarketCap: data.total_market_cap[vs] ?? 0,
    totalVolume: data.total_volume[vs] ?? 0,
    marketCapChange24h: data.market_cap_change_percentage_24h_usd,
    volumeChange24h: data.volume_change_percentage_24h_usd ?? null,
    btcDominance: data.market_cap_percentage.btc ?? 0,
    ethDominance: data.market_cap_percentage.eth ?? 0,
    activeCryptocurrencies: data.active_cryptocurrencies,
    markets: data.markets,
  };
}

export function toTrendingCoins(dto: TrendingDto): TrendingCoin[] {
  return dto.coins.map(({ item }) => ({
    id: item.id,
    name: item.name,
    symbol: item.symbol.toUpperCase(),
    thumb: item.thumb,
    rank: item.market_cap_rank,
  }));
}

export function toCoinDetail(dto: CoinDetailDto, vs: VsCurrency): CoinDetail {
  const m = dto.market_data;
  return {
    id: dto.id,
    symbol: dto.symbol.toUpperCase(),
    name: dto.name,
    image: dto.image.large,
    rank: dto.market_cap_rank,
    description: stripHtml(dto.description.en ?? ''),
    homepage: dto.links.homepage.find((url) => url.length > 0) ?? null,
    categories: dto.categories.filter((c): c is string => !!c),
    genesisDate: dto.genesis_date,
    hashingAlgorithm: dto.hashing_algorithm,
    sentimentUpPercent: dto.sentiment_votes_up_percentage,
    price: m.current_price[vs] ?? 0,
    marketCap: m.market_cap[vs] ?? 0,
    volume24h: m.total_volume[vs] ?? 0,
    high24h: m.high_24h[vs] ?? 0,
    low24h: m.low_24h[vs] ?? 0,
    change24h: m.price_change_percentage_24h_in_currency[vs] ?? null,
    change7d: m.price_change_percentage_7d_in_currency[vs] ?? null,
    change30d: m.price_change_percentage_30d_in_currency[vs] ?? null,
    change1y: m.price_change_percentage_1y_in_currency[vs] ?? null,
    ath: m.ath[vs] ?? 0,
    athDate: m.ath_date[vs] ?? null,
    athChangePercent: m.ath_change_percentage[vs] ?? null,
    atl: m.atl[vs] ?? 0,
    atlDate: m.atl_date[vs] ?? null,
    circulatingSupply: m.circulating_supply ?? 0,
    totalSupply: m.total_supply,
    maxSupply: m.max_supply,
  };
}

export function toMarketChart(dto: MarketChartDto): MarketChart {
  return { prices: dto.prices, volumes: dto.total_volumes };
}

/** CoinGecko descriptions contain `<a>` tags — keep only the text (rendered with `{{ }}`, never `v-html`). */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
}
