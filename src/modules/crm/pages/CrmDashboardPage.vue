<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">CRM</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New lead" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-6 col-md-3">
        <CrmStatCard v-bind="stat" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Pipeline by stage</div>
            <div class="text-caption text-grey-5">Open deals per stage, this quarter</div>
          </q-card-section>
          <q-card-section>
            <apexchart
              type="bar"
              height="260"
              :options="pipelineChart.options"
              :series="pipelineChart.series"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <ActivitiesList :activities="activities" />
      </div>
    </div>

    <LeadsTable :leads="leads" :limit="5" see-all-to="/crm/leads" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import CrmStatCard from '../components/CrmStatCard.vue';
import LeadsTable from '../components/LeadsTable.vue';
import ActivitiesList from '../components/ActivitiesList.vue';
import { leads } from '../data/leads';

const $q = useQuasar();

// Placeholder data — wire this up to a real API when available.
const stats = [
  {
    label: 'Total leads',
    value: '1,284',
    trendPercent: 9.4,
    color: '#4f46e5',
    data: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    label: 'Open deals',
    value: '186',
    trendPercent: 4.1,
    color: '#3b82f6',
    data: [20, 34, 28, 38, 32, 41, 45],
  },
  {
    label: 'Win rate',
    value: '32%',
    trendPercent: -1.8,
    color: '#ef4444',
    data: [40, 38, 36, 34, 35, 30, 28],
  },
  {
    label: 'Avg. deal size',
    value: '$8,450',
    trendPercent: 6.2,
    color: '#14b8a6',
    data: [22, 28, 26, 32, 30, 36, 40],
  },
];

const activities = [
  {
    id: '1',
    icon: 'call',
    title: 'Call with Marina Costa',
    with: 'Acme Co.',
    when: 'Today, 2:00 PM',
  },
  {
    id: '2',
    icon: 'groups',
    title: 'Demo with Nimbus Ltd.',
    with: 'John Pierce',
    when: 'Tomorrow, 10:00 AM',
  },
  { id: '3', icon: 'mail', title: 'Follow-up email', with: 'Bluewave', when: 'Fri, 9:00 AM' },
];

const pipelineChart = computed(() => ({
  options: {
    chart: { toolbar: { show: false }, background: $q.dark.isActive ? '#18181b' : '#ffffff' },
    plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: '55%' } },
    dataLabels: { enabled: false },
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    xaxis: { categories: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'] },
    colors: ['#4f46e5'],
    grid: { strokeDashArray: 4, borderColor: $q.dark.isActive ? '#3f3f46' : '#e5e7eb' },
  },
  series: [{ name: 'Deals', data: [42, 31, 22, 14, 9] }],
}));
</script>
