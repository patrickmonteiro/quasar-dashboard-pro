<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-subtitle1 text-weight-medium">Live Observability Pipeline</div>
        <div class="text-caption text-grey-5">How vehicle data flows through the platform</div>
      </div>
      <q-badge rounded color="positive" outline class="q-pa-sm">
        <span class="live-dot q-mr-xs" /> Live
      </q-badge>
    </q-card-section>

    <q-card-section>
      <div class="obs-flow">
        <VueFlow
          :nodes="nodes"
          :edges="edges"
          :nodes-draggable="false"
          :nodes-connectable="false"
          :elements-selectable="false"
          :pan-on-drag="false"
          :zoom-on-scroll="false"
          :zoom-on-pinch="false"
          :zoom-on-double-click="false"
          fit-view-on-init
          :fit-view-options="{ padding: 0.2 }"
        >
          <template #node-step="{ data }">
            <div class="obs-node" :class="{ 'obs-node--accent': data.accent }">
              <div class="obs-node__icon" :class="{ 'obs-node__icon--accent': data.accent }">
                <q-icon :name="data.icon" size="20px" color="white" />
              </div>
              <div class="obs-node__label">{{ data.label }}</div>
              <div class="obs-node__caption">{{ data.caption }}</div>
            </div>
          </template>
        </VueFlow>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VueFlow, type Edge, type Node } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';

interface FlowStep {
  id: string;
  icon: string;
  label: string;
  caption: string;
  // Marks the node currently "hot" in the pipeline — highlighted in orange
  // and pulsing, so the eye is drawn to where alerts are actively firing.
  accent?: boolean;
}

const steps: FlowStep[] = [
  { id: 'gps', icon: 'satellite_alt', label: 'GPS Signal', caption: 'Live telemetry' },
  { id: 'processing', icon: 'dns', label: 'Processing', caption: 'Stream ingestion' },
  { id: 'risk', icon: 'shield', label: 'Risk Analysis', caption: 'Geofence check' },
  {
    id: 'alert',
    icon: 'notifications_active',
    label: 'Alert Dispatch',
    caption: 'Threshold triggers',
    accent: true,
  },
  { id: 'dashboard', icon: 'monitor_heart', label: 'Dashboard', caption: 'Real-time view' },
];

const nodes = computed<Node[]>(() =>
  steps.map((step, i) => ({
    id: step.id,
    type: 'step',
    position: { x: i * 230, y: 20 },
    data: step,
    draggable: false,
  })),
);

const edges = computed<Edge[]>(() =>
  steps.slice(0, -1).map((step, i) => ({
    id: `e-${step.id}-${steps[i + 1]!.id}`,
    source: step.id,
    target: steps[i + 1]!.id,
    animated: true,
    style: { stroke: '#4f46e5', strokeWidth: 2 },
  })),
);
</script>

<style scoped>
.obs-flow {
  height: 170px;
}

.live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: obs-live-pulse 1.4s ease-in-out infinite;
}

@keyframes obs-live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
</style>

<style>
.obs-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 140px;
  padding: 10px 8px;
  border-radius: 12px;
  background: var(--q-primary);
  background: color-mix(in srgb, var(--q-primary) 8%, transparent);
  border: 1px solid rgba(127, 127, 127, 0.2);
  text-align: center;
}

.obs-node__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.obs-node--accent {
  border-color: color-mix(in srgb, #f59e0b 40%, transparent);
  background: color-mix(in srgb, #f59e0b 10%, transparent);
}

.obs-node__icon--accent {
  background: #f59e0b;
  animation: obs-node-pulse 1.8s ease-out infinite;
}

@keyframes obs-node-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.55);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
  }
}

.obs-node__label {
  font-size: 12.5px;
  font-weight: 600;
}

.obs-node__caption {
  font-size: 11px;
  color: #9ca3af;
}

.vue-flow__edge-path {
  stroke-dasharray: 5;
}
</style>
