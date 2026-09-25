<template>
  <q-card flat bordered>
    <q-card-section class="row items-center q-col-gutter-sm">
      <div class="col">
        <div class="text-subtitle1 text-weight-medium">Cryptocurrency prices</div>
        <div class="text-caption text-grey-5">Top {{ coins.length || 100 }} by market cap</div>
      </div>
      <div class="col-12 col-sm-auto">
        <q-input
          v-model="search"
          dense
          outlined
          clearable
          placeholder="Search coin"
          class="market-search"
        >
          <template #prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-table
      v-model:pagination="pagination"
      flat
      :rows="filteredCoins"
      :columns="columns"
      row-key="id"
      :loading="loading && coins.length === 0"
      :rows-per-page-options="[10, 20, 50, 100]"
      class="row-clickable"
      @row-click="onRowClick"
    >
      <template #body-cell-name="cellProps">
        <q-td :props="cellProps">
          <div class="row items-center no-wrap">
            <q-avatar size="24px" class="q-mr-sm">
              <img :src="cellProps.row.image" :alt="cellProps.row.name" loading="lazy" />
            </q-avatar>
            <span class="text-weight-medium">{{ cellProps.row.name }}</span>
            <span class="text-caption text-grey-5 q-ml-xs">{{ cellProps.row.symbol }}</span>
          </div>
        </q-td>
      </template>

      <template #body-cell-change1h="cellProps">
        <q-td :props="cellProps"><PriceChange :value="cellProps.value" /></q-td>
      </template>
      <template #body-cell-change24h="cellProps">
        <q-td :props="cellProps"><PriceChange :value="cellProps.value" /></q-td>
      </template>
      <template #body-cell-change7d="cellProps">
        <q-td :props="cellProps"><PriceChange :value="cellProps.value" /></q-td>
      </template>

      <template #body-cell-sparkline="cellProps">
        <q-td :props="cellProps">
          <PriceSparkline :data="cellProps.row.sparkline7d" class="q-ml-auto" />
        </q-td>
      </template>

      <template #no-data>
        <div class="full-width text-center text-grey-5 q-pa-md">
          {{ search ? `No coins match "${search}".` : 'No market data available.' }}
        </div>
      </template>
    </q-table>
  </q-card>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="selected?.name ?? ''"
    :subtitle="selected ? `${selected.symbol} · Rank #${selected.rank ?? '—'}` : ''"
    :avatar-text="selected?.symbol.slice(0, 2) ?? ''"
    :fields="detailFields"
  >
    <template #actions>
      <q-btn
        v-if="selected"
        flat
        no-caps
        color="primary"
        label="View details"
        icon-right="arrow_forward"
        :to="`/crypto/coins/${selected.id}`"
      />
    </template>
  </RecordDetailDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';
import type { CoinMarket } from '@/services/coingecko';
import PriceChange from './PriceChange.vue';
import PriceSparkline from './PriceSparkline.vue';
import {
  changeColor,
  formatCompactNumber,
  formatCompactUsd,
  formatPercent,
  formatPrice,
} from '../format';

const props = defineProps<{
  coins: CoinMarket[];
  loading?: boolean;
}>();

const search = ref<string | null>('');
const pagination = ref({ page: 1, rowsPerPage: 20, sortBy: 'rank', descending: false });

const filteredCoins = computed(() => {
  const term = (search.value ?? '').trim().toLowerCase();
  if (!term) return props.coins;
  return props.coins.filter(
    (coin) => coin.name.toLowerCase().includes(term) || coin.symbol.toLowerCase().includes(term),
  );
});

const columns: QTableColumn<CoinMarket>[] = [
  { name: 'rank', label: '#', field: 'rank', align: 'left', sortable: true },
  { name: 'name', label: 'Coin', field: 'name', align: 'left', sortable: true },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'right',
    sortable: true,
    format: (val: number) => formatPrice(val),
  },
  { name: 'change1h', label: '1h', field: 'change1h', align: 'right', sortable: true },
  { name: 'change24h', label: '24h', field: 'change24h', align: 'right', sortable: true },
  { name: 'change7d', label: '7d', field: 'change7d', align: 'right', sortable: true },
  {
    name: 'volume24h',
    label: '24h Volume',
    field: 'volume24h',
    align: 'right',
    sortable: true,
    format: (val: number) => formatCompactUsd(val),
  },
  {
    name: 'marketCap',
    label: 'Market Cap',
    field: 'marketCap',
    align: 'right',
    sortable: true,
    format: (val: number) => formatCompactUsd(val),
  },
  { name: 'sparkline', label: 'Last 7 days', field: 'sparkline7d', align: 'right' },
];

const detailOpen = ref(false);
const selected = ref<CoinMarket | null>(null);

const detailFields = computed<DetailField[]>(() => {
  const coin = selected.value;
  if (!coin) return [];
  return [
    { label: 'Price', value: formatPrice(coin.price) },
    {
      label: '24h change',
      value: formatPercent(coin.change24h),
      color: changeColor(coin.change24h),
    },
    { label: '7d change', value: formatPercent(coin.change7d), color: changeColor(coin.change7d) },
    {
      label: '24h high / low',
      value: `${formatPrice(coin.high24h)} / ${formatPrice(coin.low24h)}`,
    },
    { label: 'Market cap', value: formatCompactUsd(coin.marketCap) },
    { label: '24h volume', value: formatCompactUsd(coin.volume24h) },
    {
      label: 'Circulating supply',
      value: `${formatCompactNumber(coin.circulatingSupply)} ${coin.symbol}`,
    },
    {
      label: 'All-time high',
      value: `${formatPrice(coin.ath)} (${formatPercent(coin.athChangePercent)})`,
    },
  ];
});

function onRowClick(evt: Event, row: CoinMarket) {
  selected.value = row;
  detailOpen.value = true;
}
</script>

<style scoped>
.row-clickable :deep(tbody tr) {
  cursor: pointer;
}

.row-clickable :deep(td) {
  font-variant-numeric: tabular-nums;
}

.market-search {
  min-width: 220px;
}
</style>
