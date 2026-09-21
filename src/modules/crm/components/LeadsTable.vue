<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Recent leads</div>
      <q-btn v-if="seeAllTo" flat dense no-caps color="primary" label="See all" :to="seeAllTo" />
    </q-card-section>

    <q-table
      flat
      :rows="visibleLeads"
      :columns="columns"
      row-key="id"
      hide-pagination
      :rows-per-page-options="[0]"
      class="row-clickable"
      @row-click="onRowClick"
    >
      <template #body-cell-stage="cellProps">
        <q-td :props="cellProps">
          <q-badge :color="stageColor(cellProps.value)" rounded outline>
            {{ cellProps.value }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </q-card>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="detailTitle"
    :subtitle="detailSubtitle"
    :fields="detailFields"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';
import { stageColor } from '../stage-color';

export interface Lead {
  id: string;
  name: string;
  company: string;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won';
  value: string;
  owner: string;
}

const props = defineProps<{
  leads: Lead[];
  /** Cap the number of rows shown (e.g. a "recent leads" preview on an overview page). */
  limit?: number;
  /** When set, shows a "See all" link to the given route (e.g. a dedicated leads page). */
  seeAllTo?: string;
}>();

const visibleLeads = computed(() =>
  props.limit ? props.leads.slice(0, props.limit) : props.leads,
);

const columns: QTableColumn[] = [
  { name: 'name', label: 'Lead', field: 'name', align: 'left' },
  { name: 'company', label: 'Company', field: 'company', align: 'left' },
  { name: 'stage', label: 'Stage', field: 'stage', align: 'left' },
  { name: 'value', label: 'Value', field: 'value', align: 'right' },
  { name: 'owner', label: 'Owner', field: 'owner', align: 'left' },
];

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onRowClick(evt: Event, row: Lead) {
  detailTitle.value = row.name;
  detailSubtitle.value = row.company;
  detailFields.value = [
    { label: 'Company', value: row.company },
    { label: 'Stage', value: row.stage, color: stageColor(row.stage) },
    { label: 'Value', value: row.value },
    { label: 'Owner', value: row.owner },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.row-clickable :deep(tbody tr) {
  cursor: pointer;
}
</style>
