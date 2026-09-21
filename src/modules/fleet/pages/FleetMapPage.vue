<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Fleet Tracking</div>
      <div class="row q-gutter-sm">
        <q-badge rounded color="positive" outline class="q-pa-sm">
          <q-icon name="circle" size="8px" class="q-mr-xs" /> Ignition On
        </q-badge>
        <q-badge rounded color="warning" outline class="q-pa-sm">
          <q-icon name="circle" size="8px" class="q-mr-xs" /> Idle
        </q-badge>
        <q-badge rounded color="grey-6" outline class="q-pa-sm">
          <q-icon name="circle" size="8px" class="q-mr-xs" /> Ignition Off
        </q-badge>
      </div>
    </div>

    <ObservabilityFlow class="q-mb-md" />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered class="map-card">
          <LMap v-model:zoom="zoom" v-model:center="center" :use-global-leaflet="false">
            <LTileLayer :url="tileUrl" :attribution="tileAttribution" />
            <LTileLayer :url="referenceTileUrl" />

            <LCircle
              v-for="zone in riskZones"
              :key="zone.id"
              :lat-lng="[zone.lat, zone.lng]"
              :radius="zone.radius"
              :color="riskZoneColor(zone.level)"
              :fill-color="riskZoneColor(zone.level)"
              :fill-opacity="0.12"
              :weight="1.5"
            >
              <LPopup>
                <div class="text-weight-medium">{{ zone.name }}</div>
                <div class="text-caption">{{ zone.level }} risk</div>
              </LPopup>
            </LCircle>

            <LMarker
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              :lat-lng="[vehicle.lat, vehicle.lng]"
              :icon="vehicleIcon(vehicle)"
              @click="selectVehicle(vehicle)"
            >
              <LPopup>
                <div class="text-weight-medium">{{ vehicle.plate }} · {{ vehicle.model }}</div>
                <div class="text-caption">{{ vehicle.status }} · {{ vehicle.speed }} km/h</div>
              </LPopup>
            </LMarker>
          </LMap>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="row items-center justify-between fleet-summary">
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Total</div>
              <div class="text-h6 text-weight-bold">{{ vehicles.length }}</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Active</div>
              <div class="text-h6 text-weight-bold text-positive">{{ activeCount }}</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Idle</div>
              <div class="text-h6 text-weight-bold text-warning">{{ idleCount }}</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Risk zones</div>
              <div class="text-h6 text-weight-bold text-negative">{{ riskZones.length }}</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Vehicles</div>
          </q-card-section>

          <q-list separator>
            <q-item
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              clickable
              @click="selectVehicle(vehicle)"
            >
              <q-item-section avatar>
                <q-avatar :color="vehicleStatusColor(vehicle.status)" text-color="white">
                  <q-icon :name="vehicleStatusIcon(vehicle.status)" size="20px" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">{{ vehicle.plate }}</q-item-label>
                <q-item-label caption>{{ vehicle.model }} · {{ vehicle.driver }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge :color="vehicleStatusColor(vehicle.status)" rounded outline>
                  {{ vehicle.status }}
                </q-badge>
                <div class="text-caption text-grey-5 q-mt-xs">{{ vehicle.lastUpdate }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
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
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { vehicles, type Vehicle } from '../data/vehicles';
import { riskZones, riskZoneColor } from '../data/risk-zones';
import { vehicleStatusColor, vehicleStatusIcon } from '../vehicle-status';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';
import ObservabilityFlow from '../components/ObservabilityFlow.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const zoom = ref(12);
const center = ref<[number, number]>([-23.5613, -46.6565]);

// Esri "Light/Dark Gray Canvas" — a free, no-API-key basemap that's far
// less cluttered than the default OSM tiles, with a matching dark variant.
// It ships as two stacked layers: a plain base + a labels/roads overlay.
const tileUrl = computed(() =>
  $q.dark.isActive
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
);
const referenceTileUrl = computed(() =>
  $q.dark.isActive
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
);
const tileAttribution =
  'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS';

const activeCount = computed(() => vehicles.filter((v) => v.status === 'Ignition On').length);
const idleCount = computed(() => vehicles.filter((v) => v.status === 'Idle').length);

function vehicleIcon(vehicle: Vehicle) {
  const hex: Record<string, string> = {
    'Ignition On': '#22c55e',
    Idle: '#f59e0b',
    'Ignition Off': '#64748b',
  };
  const color = hex[vehicle.status];
  // Only moving vehicles get the radar pulse — it reads as "live", which
  // wouldn't be true for a parked/off vehicle.
  const pulse =
    vehicle.status === 'Ignition On'
      ? `<span class="fleet-marker__pulse" style="background:${color}"></span>`
      : '';
  return L.divIcon({
    className: 'fleet-marker',
    html: `<div class="fleet-marker__wrap">${pulse}<div class="fleet-marker__dot" style="background:${color}"><span class="material-symbols-outlined">${vehicleStatusIcon(vehicle.status)}</span></div></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }) as unknown as L.Icon;
}

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function selectVehicle(vehicle: Vehicle) {
  center.value = [vehicle.lat, vehicle.lng];
  zoom.value = 15;

  detailTitle.value = `${vehicle.plate} · ${vehicle.model}`;
  detailSubtitle.value = vehicle.driver;
  detailFields.value = [
    { label: 'Status', value: vehicle.status, color: vehicleStatusColor(vehicle.status) },
    { label: 'Speed', value: `${vehicle.speed} km/h` },
    { label: 'Fuel', value: `${vehicle.fuel}%` },
    { label: 'Location', value: vehicle.location },
    { label: 'Last update', value: vehicle.lastUpdate },
  ];
  detailOpen.value = true;
}
</script>

<style scoped>
.fleet-summary {
  gap: 4px;
}

.fleet-summary__item {
  flex: 1;
  text-align: center;
}

.map-card {
  height: 560px;
  overflow: hidden;
}
</style>

<style>
.fleet-marker {
  background: transparent;
  border: none;
}

.fleet-marker__wrap {
  position: relative;
  width: 30px;
  height: 30px;
}

.fleet-marker__dot {
  position: relative;
  z-index: 1;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  border: 2px solid white;
}

.fleet-marker__dot .material-symbols-outlined {
  font-size: 16px;
}

/* Radar pulse — only rendered for moving ("Ignition On") vehicles. */
.fleet-marker__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.55;
  animation: fleet-radar-pulse 1.8s ease-out infinite;
}

@keyframes fleet-radar-pulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
</style>
