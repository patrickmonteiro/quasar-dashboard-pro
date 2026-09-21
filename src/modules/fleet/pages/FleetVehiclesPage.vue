<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Vehicles</div>

    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center justify-between q-col-gutter-md">
          <div class="col-12 col-md-auto">
            <q-tabs
              v-model="filter"
              dense
              no-caps
              inline-label
              class="status-tabs"
              indicator-color="transparent"
            >
              <q-tab
                v-for="tab in tabs"
                :key="tab.value"
                :name="tab.value"
                :label="tab.label"
                class="status-tabs__tab"
              />
            </q-tabs>
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="search" dense outlined placeholder="Search plate or driver">
              <template #prepend>
                <q-icon name="search" size="18px" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-table
        flat
        :rows="filteredVehicles"
        :columns="columns"
        row-key="id"
        hide-pagination
        :rows-per-page-options="[0]"
        class="row-clickable"
        @row-click="onRowClick"
      >
        <template #body-cell-status="cellProps">
          <q-td :props="cellProps">
            <q-badge :color="vehicleStatusColor(cellProps.value)" rounded outline>
              {{ cellProps.value }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-fuel="cellProps">
          <q-td :props="cellProps" style="min-width: 120px">
            <q-linear-progress
              :value="cellProps.value / 100"
              size="8px"
              rounded
              :color="cellProps.value < 20 ? 'negative' : 'primary'"
              track-color="grey-3"
            />
            <div class="text-caption text-grey-6 q-mt-xs">{{ cellProps.value }}%</div>
          </q-td>
        </template>
      </q-table>
    </q-card>
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
import type { QTableColumn } from 'quasar';
import { vehicles, type Vehicle } from '../data/vehicles';
import { vehicleStatusColor, type VehicleStatus } from '../vehicle-status';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';

const tabs: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ignition On', value: 'Ignition On' },
  { label: 'Idle', value: 'Idle' },
  { label: 'Ignition Off', value: 'Ignition Off' },
];

const filter = ref('all');
const search = ref('');

const columns: QTableColumn[] = [
  { name: 'plate', label: 'Plate', field: 'plate', align: 'left' },
  { name: 'model', label: 'Model', field: 'model', align: 'left' },
  { name: 'driver', label: 'Driver', field: 'driver', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'speed', label: 'Speed', field: (row: Vehicle) => `${row.speed} km/h`, align: 'right' },
  { name: 'fuel', label: 'Fuel', field: 'fuel', align: 'left' },
  { name: 'location', label: 'Location', field: 'location', align: 'left' },
  { name: 'lastUpdate', label: 'Last update', field: 'lastUpdate', align: 'left' },
];

const filteredVehicles = computed(() =>
  vehicles.filter(
    (v) =>
      (filter.value === 'all' || v.status === (filter.value as VehicleStatus)) &&
      (v.plate.toLowerCase().includes(search.value.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.value.toLowerCase())),
  ),
);

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onRowClick(evt: Event, row: Vehicle) {
  detailTitle.value = `${row.plate} · ${row.model}`;
  detailSubtitle.value = row.driver;
  detailFields.value = [
    { label: 'Status', value: row.status, color: vehicleStatusColor(row.status) },
    { label: 'Speed', value: `${row.speed} km/h` },
    { label: 'Fuel', value: `${row.fuel}%` },
    { label: 'Location', value: row.location },
    { label: 'Last update', value: row.lastUpdate },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.status-tabs :deep(.q-tab) {
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 999px;
  margin-right: 8px;
  min-height: 36px;
  padding: 0 16px;
}

.status-tabs :deep(.q-tab--active) {
  background: var(--q-primary);
  color: white;
}

.row-clickable :deep(tbody tr) {
  cursor: pointer;
}
</style>
