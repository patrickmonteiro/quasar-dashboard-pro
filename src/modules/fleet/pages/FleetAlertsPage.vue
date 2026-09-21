<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Alerts & Maintenance</div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Open alerts</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ openCount }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Critical</div>
            <div class="text-h5 text-weight-bold text-negative q-mt-xs">{{ criticalCount }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Warning</div>
            <div class="text-h5 text-weight-bold text-warning q-mt-xs">{{ warningCount }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-sm-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Resolved</div>
            <div class="text-h5 text-weight-bold text-positive q-mt-xs">{{ resolvedCount }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered>
      <q-card-section>
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
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item
          v-for="alert in filteredAlerts"
          :key="alert.id"
          clickable
          @click="onAlertClick(alert)"
        >
          <q-item-section avatar>
            <q-avatar :color="alertSeverityColor(alert.severity)" text-color="white">
              <q-icon :name="alertTypeIcon(alert.type)" size="20px" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-medium">{{ alert.message }}</q-item-label>
            <q-item-label caption>{{ alert.vehiclePlate }} · {{ alert.type }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center q-gutter-xs">
              <q-badge :color="alertSeverityColor(alert.severity)" rounded outline>
                {{ alert.severity }}
              </q-badge>
              <q-badge v-if="alert.resolved" color="positive" rounded outline>Resolved</q-badge>
            </div>
            <div class="text-caption text-grey-5 q-mt-xs text-right">{{ alert.timestamp }}</div>
          </q-item-section>
        </q-item>

        <q-item v-if="filteredAlerts.length === 0">
          <q-item-section class="text-grey-5 text-center q-py-lg">
            No alerts in this category.
          </q-item-section>
        </q-item>
      </q-list>
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
import {
  fleetAlerts,
  alertSeverityColor,
  alertTypeIcon,
  type FleetAlert,
  type AlertSeverity,
} from '../data/alerts';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';

const tabs: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Critical', value: 'Critical' },
  { label: 'Warning', value: 'Warning' },
  { label: 'Info', value: 'Info' },
];

const filter = ref('all');

const filteredAlerts = computed(() =>
  fleetAlerts.filter(
    (a) => filter.value === 'all' || a.severity === (filter.value as AlertSeverity),
  ),
);

const openCount = computed(() => fleetAlerts.filter((a) => !a.resolved).length);
const criticalCount = computed(
  () => fleetAlerts.filter((a) => a.severity === 'Critical' && !a.resolved).length,
);
const warningCount = computed(
  () => fleetAlerts.filter((a) => a.severity === 'Warning' && !a.resolved).length,
);
const resolvedCount = computed(() => fleetAlerts.filter((a) => a.resolved).length);

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function onAlertClick(alert: FleetAlert) {
  detailTitle.value = alert.type;
  detailSubtitle.value = alert.vehiclePlate;
  detailFields.value = [
    { label: 'Message', value: alert.message },
    { label: 'Severity', value: alert.severity, color: alertSeverityColor(alert.severity) },
    { label: 'Status', value: alert.resolved ? 'Resolved' : 'Open' },
    { label: 'Reported', value: alert.timestamp },
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
</style>
