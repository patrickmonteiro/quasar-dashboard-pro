<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" class="price-sparkline">
    <polyline
      :points="points"
      fill="none"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
/**
 * Lightweight inline-SVG sparkline — used for the 100 rows of the market table,
 * where one ApexCharts instance per row would be far too heavy.
 */
import { computed } from 'vue';
import { changeHex } from '../format';

const props = withDefaults(defineProps<{ data: number[]; width?: number; height?: number }>(), {
  width: 120,
  height: 36,
});

const color = computed(() => {
  const first = props.data[0] ?? 0;
  const last = props.data[props.data.length - 1] ?? 0;
  return changeHex(first ? ((last - first) / first) * 100 : null);
});

const points = computed(() => {
  const values = props.data;
  if (values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 2;
  const stepX = props.width / (values.length - 1);
  return values
    .map((value, i) => {
      const x = i * stepX;
      const y = pad + (1 - (value - min) / range) * (props.height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
});
</script>

<style scoped>
.price-sparkline {
  display: block;
}
</style>
