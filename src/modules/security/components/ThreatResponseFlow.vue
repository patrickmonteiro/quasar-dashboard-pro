<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-subtitle1 text-weight-medium">Threat Response Timeline</div>
        <div class="text-caption text-grey-5">How the last critical incident was contained</div>
      </div>
      <q-badge rounded color="positive" outline class="q-pa-sm">
        <q-icon name="gpp_good" size="12px" class="q-mr-xs" /> Contained in 4m 12s
      </q-badge>
    </q-card-section>

    <q-card-section>
      <div class="threat-flow">
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
          :fit-view-options="{ padding: 0.25 }"
        >
          <template #node-step="{ data }">
            <div class="threat-node" :style="{ '--node-color': data.color }">
              <div class="threat-node__icon" :class="{ 'threat-node__icon--final': data.final }">
                <q-icon :name="data.icon" size="20px" color="white" />
              </div>
              <div class="threat-node__label">{{ data.label }}</div>
              <div class="threat-node__caption">{{ data.caption }}</div>
            </div>
          </template>
        </VueFlow>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VueFlow, MarkerType, type Edge, type Node } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';

interface Step {
  id: string;
  icon: string;
  label: string;
  caption: string;
  color: string;
  y: number;
  final?: boolean;
}

// A "V"-shaped escalation-then-containment path — severity rises through the
// middle steps and drops back down once the threat is blocked, unlike the
// other modules' straight pipelines/branches/bars.
const steps: Step[] = [
  {
    id: 'recon',
    icon: 'travel_explore',
    label: 'Recon',
    caption: 'Port scan detected',
    color: '#9ca3af',
    y: 0,
  },
  {
    id: 'intrusion',
    icon: 'bug_report',
    label: 'Intrusion attempt',
    caption: 'Exploit payload seen',
    color: '#f59e0b',
    y: 55,
  },
  {
    id: 'lateral',
    icon: 'device_hub',
    label: 'Lateral movement',
    caption: 'Internal probe flagged',
    color: '#ef4444',
    y: 100,
  },
  {
    id: 'exfil',
    icon: 'cloud_upload',
    label: 'Exfiltration attempt',
    caption: 'Outbound transfer stopped',
    color: '#f59e0b',
    y: 55,
  },
  {
    id: 'blocked',
    icon: 'gpp_good',
    label: 'Blocked',
    caption: 'Incident contained',
    color: '#22c55e',
    y: 0,
    final: true,
  },
];

const nodes = computed<Node[]>(() =>
  steps.map((step, i) => ({
    id: step.id,
    type: 'step',
    position: { x: i * 165, y: step.y },
    data: step,
    draggable: false,
  })),
);

const edges = computed<Edge[]>(() =>
  steps.slice(0, -1).map((step, i) => {
    const next = steps[i + 1]!;
    const color = next.final ? '#22c55e' : '#ef4444';
    return {
      id: `e-${step.id}-${next.id}`,
      source: step.id,
      target: next.id,
      animated: true,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed, color },
      style: { stroke: color, strokeWidth: next.final ? 2.5 : 2 },
    };
  }),
);
</script>

<style scoped>
.threat-flow {
  height: 220px;
}
</style>

<style>
.threat-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 140px;
  text-align: center;
}

.threat-node__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--node-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.threat-node__icon--final {
  animation: threat-blocked-pulse 1.8s ease-out infinite;
}

@keyframes threat-blocked-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.threat-node__label {
  font-size: 11.5px;
  font-weight: 600;
}

.threat-node__caption {
  font-size: 10.5px;
  color: #9ca3af;
}
</style>
