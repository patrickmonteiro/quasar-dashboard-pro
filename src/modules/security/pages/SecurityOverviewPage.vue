<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Security Operations</div>
      <q-badge rounded color="positive" outline class="q-pa-sm">
        <span class="live-dot q-mr-xs" /> SOC monitoring
      </q-badge>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-6 col-md-3">
        <SecurityStatCard v-bind="stat" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <ThreatResponseFlow />
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Incidents by severity</div>
            <div class="text-caption text-grey-5">Last 7 days</div>
          </q-card-section>
          <q-card-section>
            <apexchart
              type="donut"
              height="220"
              :options="severityChart.options"
              :series="severityChart.series"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <IncidentsTable :incidents="incidents" :limit="5" see-all-to="/security/incidents" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import SecurityStatCard from '../components/SecurityStatCard.vue';
import ThreatResponseFlow from '../components/ThreatResponseFlow.vue';
import IncidentsTable from '../components/IncidentsTable.vue';
import { incidents } from '../data/incidents';

const $q = useQuasar();

// Placeholder data — wire this up to a real SIEM/EDR API when available.
const stats = [
  {
    label: 'Active threats',
    value: '6',
    trendPercent: -14.3,
    color: '#ef4444',
    data: [12, 10, 11, 9, 8, 7, 6],
  },
  {
    label: 'Blocked today',
    value: '312',
    trendPercent: 9.8,
    color: '#22c55e',
    data: [180, 210, 195, 240, 260, 290, 312],
  },
  {
    label: 'Open incidents',
    value: '4',
    trendPercent: 33.3,
    color: '#f59e0b',
    data: [1, 2, 2, 3, 2, 3, 4],
  },
  {
    label: 'Mean time to contain',
    value: '6m 40s',
    trendPercent: -18.5,
    color: '#0ea5e9',
    data: [12, 11, 10, 9, 8, 7, 6.7],
  },
];

const severityChart = computed(() => ({
  options: {
    chart: { toolbar: { show: false }, background: $q.dark.isActive ? '#18181b' : '#ffffff' },
    labels: ['Critical', 'High', 'Medium', 'Low'],
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    colors: ['#ef4444', '#f59e0b', '#4f46e5', '#64748b'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  },
  series: [3, 2, 2, 1],
}));
</script>

<style scoped>
.live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: security-live-pulse 1.4s ease-in-out infinite;
}

@keyframes security-live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
</style>
