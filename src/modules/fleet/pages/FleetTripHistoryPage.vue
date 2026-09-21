<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Trip History</div>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section class="row q-col-gutter-md items-center">
        <div class="col-12 col-sm-5">
          <q-select
            v-model="selectedTripId"
            dense
            outlined
            emit-value
            map-options
            :options="tripOptions"
            label="Trip"
          />
        </div>
      </q-card-section>
    </q-card>

    <div v-if="selectedTrip" class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered class="map-card">
          <LMap :zoom="13" :center="routeCenter" :use-global-leaflet="false">
            <LTileLayer :url="tileUrl" :attribution="tileAttribution" />
            <LTileLayer :url="referenceTileUrl" />

            <LPolyline :lat-lngs="selectedTrip.route" color="#4f46e5" :weight="4" />

            <LMarker
              v-for="(stop, i) in selectedTrip.stops"
              :key="stop.label"
              :lat-lng="[stop.lat, stop.lng]"
              :icon="stopIcon(i, selectedTrip.stops.length)"
            >
              <LPopup>
                <div class="text-weight-medium">{{ stop.label }}</div>
                <div class="text-caption">{{ stop.time }}</div>
              </LPopup>
            </LMarker>
          </LMap>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="row items-center justify-between fleet-summary">
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Distance</div>
              <div class="text-h6 text-weight-bold">{{ selectedTrip.distanceKm }} km</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Duration</div>
              <div class="text-h6 text-weight-bold">{{ selectedTrip.durationMin }} min</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Avg speed</div>
              <div class="text-h6 text-weight-bold">{{ selectedTrip.avgSpeed }} km/h</div>
            </div>
            <q-separator vertical inset />
            <div class="fleet-summary__item">
              <div class="text-caption text-grey-5">Max speed</div>
              <div class="text-h6 text-weight-bold text-warning">
                {{ selectedTrip.maxSpeed }} km/h
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Route timeline</div>
          </q-card-section>

          <q-card-section>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="stop in selectedTrip.stops"
                :key="stop.label"
                :title="stop.label"
                :subtitle="stop.time"
                icon="place"
              />
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { trips } from '../data/trips';
import { vehicles } from '../data/vehicles';

const $q = useQuasar();

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
const tileAttribution = 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS';

function vehicleLabel(vehicleId: string) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  return vehicle ? `${vehicle.plate} · ${vehicle.model}` : vehicleId;
}

const tripOptions = computed(() =>
  trips.map((trip) => ({
    label: `${vehicleLabel(trip.vehicleId)} — ${trip.date}`,
    value: trip.id,
  })),
);

const selectedTripId = ref(trips[0]?.id ?? '');
const selectedTrip = computed(() => trips.find((t) => t.id === selectedTripId.value));

const routeCenter = computed<[number, number]>(() => {
  const route = selectedTrip.value?.route ?? [[-23.5613, -46.6565]];
  const lat = route.reduce((sum, p) => sum + p[0], 0) / route.length;
  const lng = route.reduce((sum, p) => sum + p[1], 0) / route.length;
  return [lat, lng];
});

function stopIcon(index: number, total: number) {
  const isStart = index === 0;
  const isEnd = index === total - 1;
  const color = isStart ? '#22c55e' : isEnd ? '#ef4444' : '#4f46e5';
  const label = isStart ? 'A' : isEnd ? 'B' : String(index + 1);
  return L.divIcon({
    className: 'trip-stop-marker',
    html: `<div class="trip-stop-marker__dot" style="background:${color}">${label}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  }) as unknown as L.Icon;
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
.trip-stop-marker {
  background: transparent;
  border: none;
}

.trip-stop-marker__dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  border: 2px solid white;
}
</style>
