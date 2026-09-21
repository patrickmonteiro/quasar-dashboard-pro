<template>
  <q-card flat bordered class="currency-card">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-subtitle2 text-weight-medium">{{ currency }}</div>
        <q-badge :color="changePercent >= 0 ? 'positive' : 'negative'" rounded outline>
          {{ changePercent >= 0 ? '+' : '' }}{{ changePercent }}%
        </q-badge>
      </div>
      <div class="text-caption text-grey-5">{{ account }}</div>
      <div class="text-h6 text-weight-bold q-mt-xs">{{ amount }}</div>
    </q-card-section>

    <apexchart type="area" height="60" :options="chartOptions" :series="series" />
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currency: string;
  account: string;
  amount: string;
  changePercent: number;
  color: string;
  data: number[];
}>();

const series = computed(() => [{ name: props.currency, data: props.data }]);

const chartOptions = computed(() => ({
  chart: { sparkline: { enabled: true }, background: 'transparent' },
  stroke: { curve: 'smooth', width: 1.5 },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0 },
  },
  colors: [props.color],
  tooltip: { enabled: false },
}));
</script>

<style scoped>
.currency-card {
  overflow: hidden;
}
</style>
