<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-col-gutter-sm q-mb-md">
      <div class="col">
        <div class="text-h5 text-weight-bold">Crypto Market</div>
        <div class="text-caption text-grey-5">Live prices and market data from CoinGecko</div>
      </div>
      <div class="col-auto row items-center no-wrap q-gutter-x-sm">
        <q-badge rounded color="positive" outline class="q-pa-sm">
          <span class="live-dot q-mr-xs" /> {{ updatedLabel }}
        </q-badge>
        <q-btn
          flat
          round
          dense
          icon="refresh"
          aria-label="Refresh"
          :loading="markets.pending.value || global.pending.value"
          @click="refreshAll"
        />
      </div>
    </div>

    <ApiErrorBanner
      v-if="firstError"
      :error="firstError"
      :retrying="markets.pending.value || global.pending.value"
      @retry="refreshAll"
    />

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-6 col-md-3">
        <CryptoStatCard v-bind="stat" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-4">
        <MarketMoversCard
          title="Top gainers · 24h"
          icon="trending_up"
          icon-color="positive"
          :coins="markets.topGainers.value"
          :loading="markets.pending.value"
        />
      </div>
      <div class="col-12 col-md-4">
        <MarketMoversCard
          title="Top losers · 24h"
          icon="trending_down"
          icon-color="negative"
          :coins="markets.topLosers.value"
          :loading="markets.pending.value"
        />
      </div>
      <div class="col-12 col-md-4">
        <TrendingCoinsCard :coins="trending.data.value ?? []" :loading="trending.pending.value" />
      </div>
    </div>

    <CoinMarketTable :coins="markets.coins.value" :loading="markets.pending.value" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import type { CoinMarket } from '@/services/coingecko';
import ApiErrorBanner from '../components/ApiErrorBanner.vue';
import CoinMarketTable from '../components/CoinMarketTable.vue';
import CryptoStatCard from '../components/CryptoStatCard.vue';
import MarketMoversCard from '../components/MarketMoversCard.vue';
import TrendingCoinsCard from '../components/TrendingCoinsCard.vue';
import { useCoinMarkets } from '../composables/useCoinMarkets';
import { useGlobalMarket } from '../composables/useGlobalMarket';
import { useTrendingCoins } from '../composables/useTrendingCoins';
import { formatCompactUsd } from '../format';

const markets = useCoinMarkets({ perPage: 100 });
const global = useGlobalMarket();
const trending = useTrendingCoins();

const firstError = computed(() => markets.error.value ?? global.error.value);

function refreshAll() {
  void markets.refresh();
  void global.refresh();
}

// "Updated 12s ago" ticker
const now = ref(Date.now());
const clock = setInterval(() => (now.value = Date.now()), 1000);
onBeforeUnmount(() => clearInterval(clock));

const updatedLabel = computed(() => {
  const last = markets.lastUpdated.value;
  if (!last) return 'Connecting…';
  const seconds = Math.max(0, Math.round((now.value - last.getTime()) / 1000));
  return seconds < 60 ? `Updated ${seconds}s ago` : `Updated ${Math.floor(seconds / 60)}m ago`;
});

/**
 * CoinGecko's free tier has no global market-cap history, so the 7d sparklines are
 * approximated from the top-100 coins' own 7d price sparklines × circulating supply.
 */
const SPARK_POINTS = 28;

function marketCapSeries(coins: CoinMarket[]): number[] {
  const length = Math.max(0, ...coins.map((c) => c.sparkline7d.length));
  const complete = coins.filter((c) => length > 0 && c.sparkline7d.length === length);
  const step = Math.max(1, Math.floor(length / SPARK_POINTS));
  const series: number[] = [];
  for (let i = step - 1; i < length; i += step) {
    series.push(
      complete.reduce((sum, c) => sum + (c.sparkline7d[i] ?? 0) * c.circulatingSupply, 0),
    );
  }
  return series;
}

const totalCapSeries = computed(() => marketCapSeries(markets.coins.value));

const btcDominanceSeries = computed(() => {
  const btc = markets.coins.value.find((c) => c.id === 'bitcoin');
  if (!btc) return [];
  const btcSeries = marketCapSeries([btc]);
  return totalCapSeries.value.map((total, i) => (total ? ((btcSeries[i] ?? 0) / total) * 100 : 0));
});

const stats = computed(() => {
  const g = global.data.value;
  const loading = !g && global.pending.value;
  return [
    {
      label: 'Market cap',
      value: g ? formatCompactUsd(g.totalMarketCap) : '—',
      trendPercent: g ? Number(g.marketCapChange24h.toFixed(2)) : null,
      color: '#4f46e5',
      data: totalCapSeries.value,
      loading,
    },
    {
      label: '24h volume',
      value: g ? formatCompactUsd(g.totalVolume) : '—',
      trendPercent: g?.volumeChange24h != null ? Number(g.volumeChange24h.toFixed(2)) : null,
      color: '#0ea5e9',
      icon: 'bar_chart',
      loading,
    },
    {
      label: 'BTC dominance',
      value: g ? `${g.btcDominance.toFixed(1)}%` : '—',
      caption: g ? `ETH ${g.ethDominance.toFixed(1)}%` : '',
      color: '#f59e0b',
      data: btcDominanceSeries.value,
      loading,
    },
    {
      label: 'Active cryptocurrencies',
      value: g ? g.activeCryptocurrencies.toLocaleString('en-US') : '—',
      caption: g ? `${g.markets.toLocaleString('en-US')} exchanges` : '',
      color: '#22c55e',
      icon: 'token',
      loading,
    },
  ];
});
</script>

<style scoped>
.live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: crypto-live-pulse 1.4s ease-in-out infinite;
}

@keyframes crypto-live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
</style>
