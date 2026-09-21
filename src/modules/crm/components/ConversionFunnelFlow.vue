<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Lead Conversion Funnel</div>
      <div class="text-caption text-grey-5">From first contact to won deal</div>
    </q-card-section>

    <q-card-section class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <div class="funnel-flow">
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
            :fit-view-options="{ padding: 0.15 }"
          >
            <template #node-funnel="{ data }">
              <div
                class="funnel-node"
                :style="{ width: `${data.widthPx}px`, background: data.color }"
              >
                {{ data.count }}
              </div>
            </template>
          </VueFlow>
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <q-list separator>
          <q-item v-for="(stage, i) in stageStats" :key="stage.label" dense class="q-px-none">
            <q-item-section avatar class="funnel-legend-dot-wrap">
              <span class="funnel-legend-dot" :style="{ background: stage.color }" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">{{ stage.label }}</q-item-label>
              <q-item-label caption>{{ stage.count }} leads</q-item-label>
            </q-item-section>
            <q-item-section side v-if="i > 0">
              <q-badge rounded outline color="grey-6"> -{{ stage.dropOffPercent }}% </q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VueFlow, Position, type Edge, type Node } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import type { Lead } from './LeadsTable.vue';
import { stageHexColor } from '../stage-color';

const props = defineProps<{
  /** Deal count per stage, in the same order as `stageOrder`. */
  stageCounts: number[];
}>();

const stageOrder: Lead['stage'][] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

const stageStats = computed(() => {
  const counts = props.stageCounts;
  const maxCount = Math.max(...counts, 1);
  return stageOrder.map((stage, i) => ({
    label: stage,
    count: counts[i] ?? 0,
    color: stageHexColor(stage),
    widthPx: Math.round(60 + ((counts[i] ?? 0) / maxCount) * 140),
    dropOffPercent:
      i === 0 || !counts[i - 1]
        ? 0
        : Math.round((1 - (counts[i] ?? 0) / (counts[i - 1] ?? 1)) * 100),
  }));
});

const nodes = computed<Node[]>(() =>
  stageStats.value.map((stage, i) => ({
    id: stage.label,
    type: 'funnel',
    position: { x: 70 - stage.widthPx / 2, y: i * 64 },
    data: stage,
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })),
);

const edges = computed<Edge[]>(() =>
  stageOrder.slice(0, -1).map((stage, i) => ({
    id: `e-${stage}-${stageOrder[i + 1]}`,
    source: stage,
    target: stageOrder[i + 1] as string,
    animated: true,
    style: { stroke: stageStats.value[i]?.color, strokeWidth: 2 },
  })),
);
</script>

<style scoped>
.funnel-flow {
  height: 320px;
}

.funnel-legend-dot-wrap {
  min-width: 24px;
}

.funnel-legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>

<style>
.funnel-node {
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
