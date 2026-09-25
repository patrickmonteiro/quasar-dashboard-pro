<template>
  <q-page class="q-pa-md">
    <q-btn flat dense no-caps icon="arrow_back" label="Market" to="/crypto" class="q-mb-sm" />

    <ApiErrorBanner
      v-if="detail.error.value"
      :error="detail.error.value"
      title="Couldn't load this coin"
      :retrying="detail.pending.value"
      @retry="detail.refresh"
    />

    <!-- Header -->
    <div class="row items-center q-col-gutter-md q-mb-md">
      <div class="col-12 col-md row items-center no-wrap">
        <q-skeleton v-if="!coin" type="QAvatar" size="48px" />
        <q-avatar v-else size="48px">
          <img :src="coin.image" :alt="coin.name" />
        </q-avatar>
        <div class="q-ml-md">
          <q-skeleton v-if="!coin" type="text" width="160px" class="text-h5" />
          <div v-else class="row items-center q-gutter-x-sm">
            <span class="text-h5 text-weight-bold">{{ coin.name }}</span>
            <q-badge outline rounded color="grey-6">{{ coin.symbol }}</q-badge>
            <q-badge v-if="coin.rank" rounded color="primary">Rank #{{ coin.rank }}</q-badge>
          </div>
          <div class="text-caption text-grey-5">
            Live data from CoinGecko · refreshes every minute
          </div>
        </div>
      </div>

      <div class="col-12 col-md-auto text-md-right">
        <q-skeleton v-if="!coin" type="text" width="180px" class="text-h4" />
        <template v-else>
          <div class="text-h4 text-weight-bold price">{{ formatPrice(coin.price) }}</div>
          <PriceChange :value="coin.change24h" class="text-body1" />
          <span class="text-caption text-grey-5 q-ml-xs">24h</span>
        </template>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <PriceChartCard :coin-id="coinId" />
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Market stats</div>
          </q-card-section>

          <q-card-section v-if="coin" class="q-pt-none">
            <div class="text-caption text-grey-5 q-mb-xs">24h range</div>
            <q-linear-progress
              :value="rangePosition"
              rounded
              size="6px"
              color="primary"
              track-color="grey-4"
            />
            <div class="row justify-between text-caption q-mt-xs">
              <span>{{ formatPrice(coin.low24h) }}</span>
              <span>{{ formatPrice(coin.high24h) }}</span>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <template v-if="coin">
              <div
                v-for="field in statFields"
                :key="field.label"
                class="row justify-between items-center q-py-xs"
              >
                <div class="text-caption text-grey-5">{{ field.label }}</div>
                <div
                  class="text-weight-medium price"
                  :class="field.color ? `text-${field.color}` : ''"
                >
                  {{ field.value }}
                </div>
              </div>
            </template>
            <template v-else>
              <q-skeleton v-for="n in 8" :key="n" type="text" class="q-my-xs" />
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="coin" class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">About {{ coin.name }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p
              v-if="coin.description"
              class="description"
              :class="{ 'description--clamped': !showFullDescription }"
            >
              {{ coin.description }}
            </p>
            <p v-else class="text-grey-5">No description available.</p>
            <q-btn
              v-if="coin.description.length > 400"
              flat
              dense
              no-caps
              color="primary"
              :label="showFullDescription ? 'Show less' : 'Read more'"
              @click="showFullDescription = !showFullDescription"
            />
            <div v-if="coin.categories.length" class="q-mt-md">
              <q-chip
                v-for="category in coin.categories"
                :key="category"
                dense
                outline
                color="grey-7"
              >
                {{ category }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Performance</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-sm">
              <div v-for="period in performance" :key="period.label" class="col-6">
                <div class="perf-tile">
                  <div class="text-caption text-grey-5">{{ period.label }}</div>
                  <PriceChange :value="period.value" class="text-subtitle1" />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section v-if="coin.sentimentUpPercent !== null" class="q-pt-none">
            <div class="text-caption text-grey-5 q-mb-xs">Community sentiment</div>
            <q-linear-progress
              :value="coin.sentimentUpPercent / 100"
              rounded
              size="6px"
              color="positive"
              track-color="negative"
            />
            <div class="row justify-between text-caption q-mt-xs">
              <span class="text-positive">{{ coin.sentimentUpPercent.toFixed(0) }}% bullish</span>
              <span class="text-negative"
                >{{ (100 - coin.sentimentUpPercent).toFixed(0) }}% bearish</span
              >
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div v-if="coin.genesisDate" class="row justify-between q-py-xs">
              <div class="text-caption text-grey-5">Launched</div>
              <div class="text-weight-medium">{{ formatDate(coin.genesisDate) }}</div>
            </div>
            <div v-if="coin.hashingAlgorithm" class="row justify-between q-py-xs">
              <div class="text-caption text-grey-5">Algorithm</div>
              <div class="text-weight-medium">{{ coin.hashingAlgorithm }}</div>
            </div>
            <q-btn
              v-if="coin.homepage"
              flat
              dense
              no-caps
              color="primary"
              icon="open_in_new"
              label="Official website"
              :href="coin.homepage"
              target="_blank"
              rel="noopener noreferrer"
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { DetailField } from '@/components/RecordDetailDialog.vue';
import ApiErrorBanner from '../components/ApiErrorBanner.vue';
import PriceChange from '../components/PriceChange.vue';
import PriceChartCard from '../components/PriceChartCard.vue';
import { useCoinDetail } from '../composables/useCoinDetail';
import {
  changeColor,
  formatCompactNumber,
  formatCompactUsd,
  formatDate,
  formatPercent,
  formatPrice,
} from '../format';

const route = useRoute();
const coinId = computed(() => String(route.params.id));

const detail = useCoinDetail(coinId);
const coin = computed(() => detail.data.value);

const showFullDescription = ref(false);

const rangePosition = computed(() => {
  const c = coin.value;
  if (!c || c.high24h === c.low24h) return 0.5;
  return Math.min(1, Math.max(0, (c.price - c.low24h) / (c.high24h - c.low24h)));
});

const statFields = computed<DetailField[]>(() => {
  const c = coin.value;
  if (!c) return [];
  return [
    { label: 'Market cap', value: formatCompactUsd(c.marketCap) },
    { label: '24h volume', value: formatCompactUsd(c.volume24h) },
    {
      label: 'Circulating supply',
      value: `${formatCompactNumber(c.circulatingSupply)} ${c.symbol}`,
    },
    { label: 'Total supply', value: c.totalSupply ? formatCompactNumber(c.totalSupply) : '—' },
    { label: 'Max supply', value: c.maxSupply ? formatCompactNumber(c.maxSupply) : '∞' },
    { label: 'All-time high', value: formatPrice(c.ath) },
    { label: 'ATH date', value: formatDate(c.athDate) },
    {
      label: 'From ATH',
      value: formatPercent(c.athChangePercent),
      color: changeColor(c.athChangePercent),
    },
    { label: 'All-time low', value: formatPrice(c.atl) },
  ];
});

const performance = computed(() => {
  const c = coin.value;
  return [
    { label: '24 hours', value: c?.change24h ?? null },
    { label: '7 days', value: c?.change7d ?? null },
    { label: '30 days', value: c?.change30d ?? null },
    { label: '1 year', value: c?.change1y ?? null },
  ];
});
</script>

<style scoped>
.price {
  font-variant-numeric: tabular-nums;
}

.description {
  white-space: pre-line;
  line-height: 1.6;
}

.description--clamped {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.perf-tile {
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 12px;
  padding: 10px 12px;
}
</style>
