<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-subtitle1 text-weight-medium">Transactions history</div>
        <div class="text-caption text-grey-5">
          Track money coming in and going out from this area.
        </div>
      </div>
      <q-btn v-if="seeAllTo" flat dense no-caps color="primary" label="See all" :to="seeAllTo" />
    </q-card-section>

    <q-table
      v-model:selected="selected"
      v-model:pagination="pagination"
      flat
      :rows="transactions"
      :columns="columns"
      row-key="id"
      selection="multiple"
      hide-bottom
      :rows-per-page-options="[pageSize]"
      class="row-clickable"
      @row-click="onRowClick"
    >
      <template #body-cell-name="cellProps">
        <q-td :props="cellProps">
          <div class="row items-center no-wrap q-gutter-sm">
            <q-avatar
              size="32px"
              :color="cellProps.row.avatarColor"
              text-color="white"
              class="text-caption"
            >
              {{ cellProps.row.initials }}
            </q-avatar>
            <div>{{ cellProps.row.name }}</div>
          </div>
        </q-td>
      </template>

      <template #body-cell-amount="cellProps">
        <q-td :props="cellProps" class="text-right">
          <span
            class="text-weight-medium"
            :class="cellProps.row.amount >= 0 ? 'text-positive' : 'text-negative'"
          >
            {{ formatAmount(cellProps.row) }}
          </span>
        </q-td>
      </template>

      <template #body-cell-account="cellProps">
        <q-td :props="cellProps" class="text-grey-5">{{ cellProps.value }}</q-td>
      </template>
    </q-table>

    <q-separator />

    <div class="row items-center justify-center q-gutter-xs q-py-sm text-caption text-grey-5">
      <span class="q-mr-sm">Showing page {{ pagination.page }} of {{ totalPages }} pages</span>

      <q-btn
        flat
        dense
        round
        size="sm"
        icon="chevron_left"
        :disable="pagination.page <= 1"
        @click="pagination.page--"
      />
      <q-btn
        v-for="p in totalPages"
        :key="p"
        :flat="p !== pagination.page"
        :unelevated="p === pagination.page"
        dense
        round
        size="sm"
        :color="p === pagination.page ? 'primary' : undefined"
        :text-color="p === pagination.page ? 'white' : undefined"
        @click="pagination.page = p"
      >
        {{ p }}
      </q-btn>
      <q-btn
        flat
        dense
        round
        size="sm"
        icon="chevron_right"
        :disable="pagination.page >= totalPages"
        @click="pagination.page++"
      />
    </div>
  </q-card>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="detailTitle"
    :subtitle="detailSubtitle"
    :avatar-text="detailAvatarText"
    :avatar-color="detailAvatarColor"
    :fields="detailFields"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';

export interface Transaction {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  date: string;
  amount: number;
  currencySymbol: string;
  account: string;
}

const props = defineProps<{
  transactions: Transaction[];
  pageSize?: number;
  /** When set, shows a "See all" link to the given route (e.g. a dedicated transactions page). */
  seeAllTo?: string;
}>();

const pageSize = computed(() => props.pageSize ?? 5);
const selected = ref<Transaction[]>([]);
const pagination = ref({ page: 1, rowsPerPage: pageSize.value });

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.transactions.length / pageSize.value)),
);

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'date', label: 'Date', field: 'date', align: 'left' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'right' },
  { name: 'account', label: 'Account', field: 'account', align: 'left' },
];

function formatAmount(row: Transaction) {
  const sign = row.amount < 0 ? '-' : '+';
  return `${sign}${row.currencySymbol}${Math.abs(row.amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailAvatarText = ref('');
const detailAvatarColor = ref('');
const detailFields = ref<DetailField[]>([]);

function onRowClick(evt: Event, row: Transaction) {
  detailTitle.value = row.name;
  detailSubtitle.value = row.account;
  detailAvatarText.value = row.initials;
  detailAvatarColor.value = row.avatarColor;
  detailFields.value = [
    { label: 'Date', value: row.date },
    { label: 'Amount', value: formatAmount(row), color: row.amount >= 0 ? 'positive' : 'negative' },
    { label: 'Account', value: row.account },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.row-clickable :deep(tbody tr) {
  cursor: pointer;
}
</style>
