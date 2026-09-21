<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Support</div>
      <q-btn
        color="primary"
        unelevated
        no-caps
        icon="add"
        label="New ticket"
        to="/support/tickets"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-6 col-md-3">
        <SupportStatCard v-bind="stat" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <AgentRoutingFlow />
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Tickets by channel</div>
            <div class="text-caption text-grey-5">Open + pending, this week</div>
          </q-card-section>
          <q-card-section>
            <apexchart
              type="donut"
              height="220"
              :options="channelChart.options"
              :series="channelChart.series"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <TicketsTable :tickets="tickets" :limit="5" see-all-to="/support/tickets" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import SupportStatCard from '../components/SupportStatCard.vue';
import AgentRoutingFlow from '../components/AgentRoutingFlow.vue';
import TicketsTable from '../components/TicketsTable.vue';
import { tickets } from '../data/tickets';

const $q = useQuasar();

// Placeholder data — wire this up to a real helpdesk API when available.
const stats = [
  {
    label: 'Open conversations',
    value: '18',
    trendPercent: 12.5,
    color: '#4f46e5',
    data: [8, 11, 9, 14, 12, 16, 18],
  },
  {
    label: 'Avg. first response',
    value: '2m 40s',
    trendPercent: -8.2,
    color: '#22c55e',
    data: [5, 4.5, 4, 3.6, 3.2, 2.9, 2.7],
  },
  {
    label: 'CSAT score',
    value: '96%',
    trendPercent: 2.1,
    color: '#0ea5e9',
    data: [90, 91, 93, 92, 94, 95, 96],
  },
  {
    label: 'Resolved today',
    value: '42',
    trendPercent: 6.4,
    color: '#f59e0b',
    data: [22, 28, 25, 30, 34, 38, 42],
  },
];

const channelChart = computed(() => ({
  options: {
    chart: { toolbar: { show: false }, background: $q.dark.isActive ? '#18181b' : '#ffffff' },
    labels: ['Website chat', 'WhatsApp', 'Email'],
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    colors: ['#4f46e5', '#22c55e', '#0ea5e9'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  },
  series: [9, 6, 3],
}));
</script>
