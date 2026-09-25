<template>
  <q-card flat bordered class="full-height">
    <q-card-section class="row items-center q-col-gutter-sm">
      <div class="col">
        <div class="text-subtitle1 text-weight-medium">Price chart</div>
        <div class="text-caption text-grey-5">
          <template v-if="periodChange !== null">
            <PriceChange :value="periodChange" /> over the selected period
          </template>
          <template v-else>USD</template>
        </div>
      </div>
      <div class="col-auto">
        <q-btn-toggle
          v-model="days"
          dense
          no-caps
          unelevated
          toggle-color="primary"
          class="range-toggle"
          :options="rangeOptions"
        />
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div v-if="chart.error.value" class="chart-placeholder text-grey-5">
        <q-icon name="cloud_off" size="28px" />
        <div class="q-mt-sm">{{ chart.error.value.message }}</div>
        <q-btn
          flat
          no-caps
          color="primary"
          label="Try again"
          class="q-mt-xs"
          @click="chart.refresh"
        />
      </div>
      <q-skeleton v-else-if="!chart.data.value" height="320px" />
      <!-- Keyed remount: ApexCharts' in-place updateOptions drops the y-axis formatter functions. -->
      <apexchart
        v-else
        :key="`${$q.dark.isActive}-${chart.lastUpdated.value?.getTime()}`"
        type="area"
        height="320"
        :options="chartOptions"
        :series="series"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { ChartDays } from '@/services/coingecko';
import PriceChange from './PriceChange.vue';
import { useMarketChart } from '../composables/useMarketChart';
import { changeHex, formatPrice } from '../format';

const props = defineProps<{ coinId: string }>();

const $q = useQuasar();

const days = ref<ChartDays>(7);
const rangeOptions: { label: string; value: ChartDays }[] = [
  { label: '24H', value: 1 },
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '90D', value: 90 },
  { label: '1Y', value: 365 },
];

const chart = useMarketChart(() => props.coinId, days);

const prices = computed(() => chart.data.value?.prices ?? []);

const periodChange = computed(() => {
  const first = prices.value[0]?.[1];
  const last = prices.value[prices.value.length - 1]?.[1];
  if (first === undefined || last === undefined || first === 0) return null;
  return ((last - first) / first) * 100;
});

const series = computed(() => [{ name: 'Price', data: prices.value }]);

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    // Up to ~2k points on long ranges — the draw-in animation gets sluggish.
    animations: { enabled: false },
    background: $q.dark.isActive ? '#18181b' : '#ffffff',
  },
  theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
  colors: [changeHex(periodChange.value)],
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0 },
  },
  dataLabels: { enabled: false },
  grid: { borderColor: $q.dark.isActive ? '#27272a' : '#f1f5f9', strokeDashArray: 4 },
  xaxis: {
    type: 'datetime',
    labels: { datetimeUTC: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { formatter: (value: number) => formatPrice(value) },
  },
  tooltip: {
    x: { format: days.value === 1 ? 'HH:mm' : 'dd MMM yyyy HH:mm' },
    y: { formatter: (value: number) => formatPrice(value) },
  },
}));
</script>

<style scoped>
.chart-placeholder {
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.range-toggle {
  border: 1px solid rgba(128, 128, 128, 0.25);
}
</style>
