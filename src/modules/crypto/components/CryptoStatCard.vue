<template>
  <q-card flat bordered class="stat-card">
    <q-card-section class="row items-center no-wrap">
      <div>
        <div class="text-caption text-grey-5">{{ label }}</div>
        <q-skeleton v-if="loading" type="text" width="110px" class="text-h6 q-mt-xs" />
        <div v-else class="text-h6 text-weight-bold q-mt-xs">{{ value }}</div>
        <div class="q-mt-xs">
          <q-badge
            v-if="trendPercent !== undefined && trendPercent !== null"
            :color="trendPercent >= 0 ? 'positive' : 'negative'"
            rounded
            outline
          >
            {{ formatPercent(trendPercent) }}
          </q-badge>
          <span
            v-if="caption"
            class="text-caption text-grey-5"
            :class="{ 'q-ml-xs': trendPercent != null }"
          >
            {{ caption }}
          </span>
        </div>
      </div>
      <q-space />
      <apexchart
        v-if="data && data.length > 1"
        type="area"
        height="48"
        width="90"
        :options="chartOptions"
        :series="series"
      />
      <q-avatar v-else-if="icon" size="42px" class="stat-card__icon" :style="{ color }">
        <q-icon :name="icon" size="22px" />
      </q-avatar>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
/**
 * Stat card for live API data: sparkline and trend are optional (not every
 * CoinGecko metric comes with history), falling back to an icon badge.
 */
import { computed } from 'vue';
import { formatPercent } from '../format';

const props = defineProps<{
  label: string;
  value: string;
  color: string;
  loading?: boolean;
  trendPercent?: number | null;
  caption?: string;
  data?: number[];
  icon?: string;
}>();

const series = computed(() => [{ name: props.label, data: props.data ?? [] }]);

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

.stat-card__icon {
  background: color-mix(in srgb, currentColor 12%, transparent);
}
</style>
