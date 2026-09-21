<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Recent tickets</div>
      <q-btn v-if="seeAllTo" flat dense no-caps color="primary" label="See all" :to="seeAllTo" />
    </q-card-section>

    <q-table
      flat
      :rows="visibleTickets"
      :columns="columns"
      row-key="id"
      hide-pagination
      :rows-per-page-options="[0]"
      class="row-clickable"
      @row-click="onRowClick"
    >
      <template #body-cell-channel="cellProps">
        <q-td :props="cellProps">
          <q-icon :name="channelIcon(cellProps.value)" size="18px" color="grey-6" />
        </q-td>
      </template>

      <template #body-cell-priority="cellProps">
        <q-td :props="cellProps">
          <q-badge :color="ticketPriorityColor(cellProps.value)" rounded outline>
            {{ cellProps.value }}
          </q-badge>
        </q-td>
      </template>

      <template #body-cell-status="cellProps">
        <q-td :props="cellProps">
          <q-badge :color="ticketStatusColor(cellProps.value)" rounded outline>
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
import { channelIcon, channelLabel } from '../data/conversations';
import { ticketPriorityColor, ticketStatusColor, type Ticket } from '../data/tickets';

const props = defineProps<{
  tickets: Ticket[];
  /** Cap the number of rows shown (e.g. a "recent tickets" preview on an overview page). */
  limit?: number;
  /** When set, shows a "See all" link to the given route (e.g. a dedicated tickets page). */
  seeAllTo?: string;
}>();

const visibleTickets = computed(() =>
  props.limit ? props.tickets.slice(0, props.limit) : props.tickets,
);

const columns: QTableColumn[] = [
  { name: 'id', label: 'Ticket', field: 'id', align: 'left' },
  { name: 'subject', label: 'Subject', field: 'subject', align: 'left' },
  { name: 'requester', label: 'Requester', field: 'requester', align: 'left' },
  { name: 'channel', label: 'Channel', field: 'channel', align: 'center' },
  { name: 'priority', label: 'Priority', field: 'priority', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'assignee', label: 'Assignee', field: 'assignee', align: 'left' },
  { name: 'updated', label: 'Updated', field: 'updated', align: 'right' },
];

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onRowClick(evt: Event, row: Ticket) {
  detailTitle.value = row.subject;
  detailSubtitle.value = row.id;
  detailFields.value = [
    { label: 'Requester', value: row.requester },
    { label: 'Channel', value: channelLabel(row.channel) },
    { label: 'Priority', value: row.priority, color: ticketPriorityColor(row.priority) },
    { label: 'Status', value: row.status, color: ticketStatusColor(row.status) },
    { label: 'Assignee', value: row.assignee },
    { label: 'Updated', value: row.updated },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.row-clickable :deep(tbody tr) {
  cursor: pointer;
}
</style>
