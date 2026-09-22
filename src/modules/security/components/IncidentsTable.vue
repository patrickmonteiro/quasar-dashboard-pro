<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Recent incidents</div>
      <q-btn v-if="seeAllTo" flat dense no-caps color="primary" label="See all" :to="seeAllTo" />
    </q-card-section>

    <q-table
      flat
      :rows="visibleIncidents"
      :columns="columns"
      row-key="id"
      hide-pagination
      :rows-per-page-options="[0]"
      class="row-clickable"
      @row-click="onRowClick"
    >
      <template #body-cell-type="cellProps">
        <q-td :props="cellProps">
          <q-icon :name="incidentTypeIcon(cellProps.value)" size="18px" class="q-mr-xs" />
          {{ cellProps.value }}
        </q-td>
      </template>

      <template #body-cell-severity="cellProps">
        <q-td :props="cellProps">
          <q-badge :color="incidentSeverityColor(cellProps.value)" rounded outline>
            {{ cellProps.value }}
          </q-badge>
        </q-td>
      </template>

      <template #body-cell-status="cellProps">
        <q-td :props="cellProps">
          <q-badge :color="incidentStatusColor(cellProps.value)" rounded outline>
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
import {
  incidentSeverityColor,
  incidentStatusColor,
  incidentTypeIcon,
  type SecurityIncident,
} from '../data/incidents';

const props = defineProps<{
  incidents: SecurityIncident[];
  /** Cap the number of rows shown (e.g. a "recent incidents" preview on the overview page). */
  limit?: number;
  /** When set, shows a "See all" link to the given route (e.g. a dedicated incidents page). */
  seeAllTo?: string;
}>();

const visibleIncidents = computed(() =>
  props.limit ? props.incidents.slice(0, props.limit) : props.incidents,
);

const columns: QTableColumn[] = [
  { name: 'id', label: 'Incident', field: 'id', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'sourceCountry', label: 'Source', field: 'sourceCountry', align: 'left' },
  { name: 'target', label: 'Target', field: 'target', align: 'left' },
  { name: 'severity', label: 'Severity', field: 'severity', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'analyst', label: 'Analyst', field: 'analyst', align: 'left' },
  { name: 'timestamp', label: 'Reported', field: 'timestamp', align: 'right' },
];

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onRowClick(evt: Event, row: SecurityIncident) {
  detailTitle.value = row.type;
  detailSubtitle.value = row.id;
  detailFields.value = [
    { label: 'Source IP', value: row.sourceIp },
    { label: 'Source country', value: row.sourceCountry },
    { label: 'Target', value: row.target },
    { label: 'Severity', value: row.severity, color: incidentSeverityColor(row.severity) },
    { label: 'Status', value: row.status, color: incidentStatusColor(row.status) },
    { label: 'Analyst', value: row.analyst },
    { label: 'Reported', value: row.timestamp },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.row-clickable :deep(tbody tr) {
  cursor: pointer;
}
</style>
