<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="row items-center justify-between q-mb-sm">
        <q-badge color="grey-3" text-color="grey-8" rounded>{{ account.type }}</q-badge>
        <q-badge :color="account.changePercent >= 0 ? 'positive' : 'negative'" rounded outline>
          {{ account.changePercent >= 0 ? '+' : '' }}{{ account.changePercent }}%
        </q-badge>
      </div>

      <div class="text-subtitle1 text-weight-medium">{{ account.accountName }}</div>
      <div class="text-caption text-grey-5">{{ account.account }} · {{ account.currency }}</div>

      <div class="text-h5 text-weight-bold q-mt-sm">{{ account.amount }}</div>
      <div class="text-caption text-grey-5">Opened {{ account.openedOn }}</div>
    </q-card-section>

    <apexchart type="area" height="70" :options="chartOptions" :series="series" />
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Account } from '../data/accounts';

const props = defineProps<{
  account: Account;
}>();

const series = computed(() => [{ name: props.account.currency, data: props.account.data }]);

const chartOptions = computed(() => ({
  chart: { sparkline: { enabled: true }, background: 'transparent' },
  stroke: { curve: 'smooth', width: 1.5 },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0 },
  },
  colors: [props.account.color],
  tooltip: { enabled: false },
}));
</script>
