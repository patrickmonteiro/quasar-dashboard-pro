<template>
  <span class="price-change" :class="`text-${changeColor(value)}`">
    <q-icon
      v-if="value !== null && !isFlat(value)"
      :name="value > 0 ? 'arrow_drop_up' : 'arrow_drop_down'"
      size="18px"
    />
    {{ formatPercent(value, { signed: false }) }}
  </span>
</template>

<script setup lang="ts">
import { changeColor, formatPercent, isFlat } from '../format';

defineProps<{ value: number | null }>();
</script>

<style scoped>
.price-change {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
</style>
