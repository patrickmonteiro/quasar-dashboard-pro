<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Threat Map</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered class="map-card">
          <LMap v-model:zoom="zoom" v-model:center="center" :use-global-leaflet="false">
            <LTileLayer :url="tileUrl" :attribution="tileAttribution" />
            <LTileLayer :url="referenceTileUrl" />

            <LMarker
              v-for="location in threatLocations"
              :key="location.id"
              :lat-lng="[location.lat, location.lng]"
              :icon="threatIcon(location)"
              @click="selectLocation(location)"
            >
              <LPopup>
                <div class="text-weight-medium">{{ location.country }}</div>
                <div class="text-caption">
                  {{ location.attackCount }} attacks · {{ location.severity }}
                </div>
              </LPopup>
            </LMarker>
          </LMap>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="row items-center justify-between threat-summary">
            <div class="threat-summary__item">
              <div class="text-caption text-grey-5">Sources</div>
              <div class="text-h6 text-weight-bold">{{ threatLocations.length }}</div>
            </div>
            <q-separator vertical inset />
            <div class="threat-summary__item">
              <div class="text-caption text-grey-5">Total attacks</div>
              <div class="text-h6 text-weight-bold text-negative">{{ totalAttacks }}</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Top threat sources</div>
          </q-card-section>

          <q-list separator>
            <q-item
              v-for="location in sortedLocations"
              :key="location.id"
              clickable
              @click="selectLocation(location)"
            >
              <q-item-section avatar>
                <q-avatar
                  :style="{ background: threatSeverityColor(location.severity) }"
                  text-color="white"
                >
                  <q-icon name="public" size="20px" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">{{ location.country }}</q-item-label>
                <q-item-label caption>{{ location.attackCount }} attacks</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge :color="severityBadgeColor(location.severity)" rounded outline>
                  {{ location.severity }}
                </q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  threatLocations,
  threatSeverityColor,
  type ThreatLocation,
} from '../data/threat-locations';

const $q = useQuasar();
const zoom = ref(2);
const center = ref<[number, number]>([20, 10]);

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

const totalAttacks = computed(() => threatLocations.reduce((sum, t) => sum + t.attackCount, 0));
const sortedLocations = computed(() =>
  [...threatLocations].sort((a, b) => b.attackCount - a.attackCount),
);

function severityBadgeColor(severity: ThreatLocation['severity']) {
  const map: Record<ThreatLocation['severity'], string> = {
    Critical: 'negative',
    High: 'warning',
    Medium: 'primary',
    Low: 'grey-6',
  };
  return map[severity];
}

function threatIcon(location: ThreatLocation) {
  const color = threatSeverityColor(location.severity);
  const size = 16 + Math.min(location.attackCount / 10, 14);
  const pulse =
    location.severity === 'Critical' || location.severity === 'High'
      ? `<span class="threat-marker__pulse" style="background:${color}"></span>`
      : '';
  return L.divIcon({
    className: 'threat-marker',
    html: `<div class="threat-marker__wrap" style="width:${size}px;height:${size}px">${pulse}<div class="threat-marker__dot" style="background:${color};width:${size}px;height:${size}px"></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  }) as unknown as L.Icon;
}

function selectLocation(location: ThreatLocation) {
  center.value = [location.lat, location.lng];
  zoom.value = 4;
}
</script>

<style scoped>
.threat-summary {
  gap: 4px;
}

.threat-summary__item {
  flex: 1;
  text-align: center;
}

.map-card {
  height: 560px;
  overflow: hidden;
}
</style>

<style>
.threat-marker {
  background: transparent;
  border: none;
}

.threat-marker__wrap {
  position: relative;
}

.threat-marker__dot {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  border: 2px solid white;
}

.threat-marker__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.55;
  animation: threat-radar-pulse 1.8s ease-out infinite;
}

@keyframes threat-radar-pulse {
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
