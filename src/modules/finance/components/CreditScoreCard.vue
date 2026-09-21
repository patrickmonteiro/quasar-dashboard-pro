<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Credit score</div>

      <apexchart type="radialBar" height="320" :options="chartOptions" :series="[percent]" />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Pre-approved loan</div>

      <div class="row justify-between items-center q-py-xs">
        <div class="text-grey-5">Loan amount</div>
        <div class="text-weight-bold">{{ formatCurrency(loanAmount) }}</div>
      </div>
      <q-separator />

      <div class="row justify-between items-center q-py-xs">
        <div class="text-grey-5">Interest rate</div>
        <q-badge color="positive" rounded outline>{{ interestRate }}%</q-badge>
      </div>
      <q-separator />

      <div class="row justify-between items-center q-py-xs">
        <div class="text-grey-5">Number of installments</div>
        <div class="text-weight-bold">{{ installments }}</div>
      </div>
      <q-separator />

      <div class="row justify-between items-center q-py-xs q-mb-md">
        <div class="text-grey-5">Amount to be repaid</div>
        <div class="text-weight-bold">{{ formatCurrency(repayAmount) }}</div>
      </div>

      <q-btn outline no-caps color="primary" label="View account detail" class="full-width" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = withDefaults(
  defineProps<{
    score: number;
    minScore?: number;
    maxScore?: number;
    loanAmount: number;
    interestRate: number;
    installments: number;
    repayAmount: number;
  }>(),
  { minScore: 300, maxScore: 850 },
);

const percent = computed(() =>
  Math.round(((props.score - props.minScore) / (props.maxScore - props.minScore)) * 100),
);

const chartOptions = computed(() => ({
  chart: {
    type: 'radialBar',
    offsetY: -10,
    background: $q.dark.isActive ? '#18181b' : '#ffffff',
  },
  theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '55%' },
      track: {
        background: $q.dark.isActive ? '#3f3f46' : '#e5e7eb',
        strokeWidth: '100%',
        margin: 4,
      },
      dataLabels: {
        name: {
          offsetY: 24,
          fontSize: '13px',
          color: $q.dark.isActive ? '#a1a1aa' : '#94a3b8',
          formatter: () => 'Credit Score',
        },
        value: {
          offsetY: -8,
          fontSize: '34px',
          fontWeight: 700,
          color: $q.dark.isActive ? '#fafafa' : '#18181b',
          formatter: () => String(props.score),
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100],
      colorStops: [
        { offset: 0, color: '#ef4444', opacity: 1 },
        { offset: 50, color: '#f59e0b', opacity: 1 },
        { offset: 100, color: '#22c55e', opacity: 1 },
      ],
    },
  },
  stroke: { lineCap: 'round' },
  labels: ['Credit Score'],
}));

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}
</script>
