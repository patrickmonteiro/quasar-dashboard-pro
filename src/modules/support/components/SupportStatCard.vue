<template>
  <q-card flat bordered class="stat-card">
    <q-card-section class="row items-center no-wrap">
      <div>
        <div class="text-caption text-grey-5">{{ label }}</div>
        <div class="text-h6 text-weight-bold q-mt-xs">{{ value }}</div>
        <q-badge
          :color="trendPercent >= 0 ? 'positive' : 'negative'"
          rounded
          outline
          class="q-mt-xs"
        >
          {{ trendPercent >= 0 ? '+' : '' }}{{ trendPercent }}%
        </q-badge>
      </div>
      <q-space />
      <apexchart type="area" height="48" width="90" :options="chartOptions" :series="series" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: string;
  trendPercent: number;
  color: string;
  data: number[];
}>();

const series = computed(() => [{ name: props.label, data: props.data }]);

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
.stat-card {
  overflow: hidden;
}
</style>
