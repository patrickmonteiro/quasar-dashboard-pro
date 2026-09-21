<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Deals</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New deal" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Pipeline value</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ formatCurrency(pipelineValue) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Open deals</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ leads.length }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Avg. deal size</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ formatCurrency(avgDealSize) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Win rate</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ winRate.toFixed(0) }}%</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">Pipeline value by stage</div>
        <div class="text-caption text-grey-5">Deal value per stage, split by owner</div>
      </q-card-section>
      <q-card-section>
        <apexchart
          type="bar"
          height="260"
          :options="valueByOwnerChart.options"
          :series="valueByOwnerChart.series"
        />
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md deals-board no-wrap items-stretch">
      <div v-for="stage in stages" :key="stage" class="deal-column-wrap">
        <DealColumn :stage="stage" :leads="leadsByStage[stage] ?? []" @card-click="onDealClick" />
      </div>
    </div>
  </q-page>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="detailTitle"
    :subtitle="detailSubtitle"
    :fields="detailFields"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import DealColumn from '../components/DealColumn.vue';
import { leads } from '../data/leads';
import type { Lead } from '../components/LeadsTable.vue';
import { stageColor } from '../stage-color';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';

const $q = useQuasar();

const stages: Lead['stage'][] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

const leadsByStage = computed(() => {
  const grouped: Partial<Record<Lead['stage'], Lead[]>> = {};
  for (const lead of leads) {
    (grouped[lead.stage] ??= []).push(lead);
  }
  return grouped;
});

function parseValue(value: string) {
  return Number(value.replace(/[^0-9.]/g, ''));
}

const pipelineValue = computed(() => leads.reduce((sum, lead) => sum + parseValue(lead.value), 0));
const avgDealSize = computed(() => pipelineValue.value / leads.length);
const winRate = computed(
  () => (leads.filter((lead) => lead.stage === 'Won').length / leads.length) * 100,
);

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

const owners = computed(() => Array.from(new Set(leads.map((lead) => lead.owner))));
const ownerColors = ['#4f46e5', '#f59e0b', '#3b82f6', '#14b8a6'];

const valueByOwnerChart = computed(() => ({
  options: {
    chart: {
      stacked: true,
      toolbar: { show: false },
      background: $q.dark.isActive ? '#18181b' : '#ffffff',
    },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
    dataLabels: { enabled: false },
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    xaxis: { categories: stages },
    yaxis: { labels: { formatter: (v: number) => `$${Math.round(v / 1000)}k` } },
    colors: ownerColors,
    legend: { position: 'top', horizontalAlign: 'right' },
    grid: { strokeDashArray: 4, borderColor: $q.dark.isActive ? '#3f3f46' : '#e5e7eb' },
  },
  series: owners.value.map((owner) => ({
    name: owner,
    data: stages.map((stage) =>
      leads
        .filter((lead) => lead.stage === stage && lead.owner === owner)
        .reduce((sum, lead) => sum + parseValue(lead.value), 0),
    ),
  })),
}));

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onDealClick(lead: Lead) {
  detailTitle.value = lead.name;
  detailSubtitle.value = lead.company;
  detailFields.value = [
    { label: 'Company', value: lead.company },
    { label: 'Stage', value: lead.stage, color: stageColor(lead.stage) },
    { label: 'Value', value: lead.value },
    { label: 'Owner', value: lead.owner },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.deals-board {
  overflow-x: auto;
  padding-bottom: 8px;
}

.deal-column-wrap {
  flex: 1 1 220px;
  min-width: 220px;
}

/* Only shows up on narrow viewports where the board can't fit — keep it
   thin and unobtrusive instead of the bulky default OS scrollbar. */
.deals-board::-webkit-scrollbar {
  height: 6px;
}

.deals-board::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 999px;
}

.deals-board::-webkit-scrollbar-track {
  background: transparent;
}
</style>
