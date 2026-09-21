<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Fulfillment</div>
      <div class="text-caption text-grey-5">Real-time order tracking</div>
    </q-card-section>

    <q-card-section>
      <div class="fulfillment-flow">
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
          :fit-view-options="{ padding: 0.3 }"
        >
          <template #node-step="{ data }">
            <div
              class="fulfillment-chip"
              :class="[
                data.state === 'done' && 'fulfillment-chip--done',
                data.state === 'active' && 'fulfillment-chip--active',
              ]"
            >
              <q-icon
                :name="data.state === 'done' ? 'check' : data.icon"
                size="14px"
                class="q-mr-xs"
              />
              {{ data.label }}
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
import { deliverySteps } from '../order-status';

const props = defineProps<{
  /** Index into `deliverySteps` — how far the order has progressed. */
  currentStep: number;
}>();

const stepIcons = ['inventory_2', 'settings', 'local_shipping', 'home'];

const nodes = computed<Node[]>(() =>
  deliverySteps.map((label, i) => ({
    id: label,
    type: 'step',
    position: { x: i * 170, y: 0 },
    draggable: false,
    data: {
      label,
      icon: stepIcons[i],
      state: i < props.currentStep ? 'done' : i === props.currentStep ? 'active' : 'pending',
    },
  })),
);

const edges = computed<Edge[]>(() =>
  deliverySteps.slice(0, -1).map((label, i) => {
    const done = i < props.currentStep;
    const active = i === props.currentStep;
    return {
      id: `e-${label}-${deliverySteps[i + 1]}`,
      source: label,
      target: deliverySteps[i + 1] as string,
      animated: active,
      ...(done ? { markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } } : {}),
      style: {
        stroke: done ? '#22c55e' : active ? '#4f46e5' : 'rgba(127, 127, 127, 0.35)',
        strokeWidth: 2,
        ...(done ? {} : { strokeDasharray: '5' }),
      },
    };
  }),
);
</script>

<style scoped>
.fulfillment-flow {
  height: 90px;
}
</style>

<style>
.fulfillment-chip {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  border: 1.5px solid rgba(127, 127, 127, 0.3);
  color: #9ca3af;
  background: transparent;
  white-space: nowrap;
}

.fulfillment-chip--done {
  border-color: #22c55e;
  color: #22c55e;
  background: color-mix(in srgb, #22c55e 10%, transparent);
}

.fulfillment-chip--active {
  border-color: var(--q-primary);
  color: var(--q-primary);
  background: color-mix(in srgb, var(--q-primary) 10%, transparent);
  animation: fulfillment-chip-pulse 1.6s ease-out infinite;
}

@keyframes fulfillment-chip-pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--q-primary) 45%, transparent);
  }
  70% {
    box-shadow: 0 0 0 7px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
