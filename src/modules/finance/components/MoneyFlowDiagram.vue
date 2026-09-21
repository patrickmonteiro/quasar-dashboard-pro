<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Money Flow</div>
      <div class="text-caption text-grey-5">Where this month's income went</div>
    </q-card-section>

    <q-card-section>
      <div class="money-flow">
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
          <template #node-source="{ data }">
            <div class="money-node money-node--source">
              <div class="money-node__label">{{ data.label }}</div>
              <div class="money-node__amount">${{ data.amount.toLocaleString('en-US') }}</div>
            </div>
          </template>

          <template #node-target="{ data }">
            <div class="money-node money-node--target" :style="{ '--branch-color': data.color }">
              <div class="money-node__icon">
                <q-icon :name="data.icon" size="16px" color="white" />
              </div>
              <div>
                <div class="money-node__label">{{ data.label }}</div>
                <div class="money-node__amount">${{ data.amount.toLocaleString('en-US') }}</div>
              </div>
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

interface FlowBranch {
  id: string;
  label: string;
  amount: number;
  color: string;
  icon: string;
}

const branches: FlowBranch[] = [
  { id: 'food', label: 'Food', amount: 3243, color: '#4f46e5', icon: 'restaurant' },
  { id: 'clothing', label: 'Clothing', amount: 2111, color: '#f59e0b', icon: 'checkroom' },
  { id: 'other', label: 'Other', amount: 2485, color: '#3b82f6', icon: 'more_horiz' },
  { id: 'savings', label: 'Savings', amount: 2757, color: '#22c55e', icon: 'savings' },
];

const totalIncome = branches.reduce((sum, b) => sum + b.amount, 0);

const nodes = computed<Node[]>(() => [
  {
    id: 'income',
    type: 'source',
    position: { x: ((branches.length - 1) * 180) / 2, y: 0 },
    data: { label: 'Income', amount: totalIncome },
    draggable: false,
  },
  ...branches.map((branch, i) => ({
    id: branch.id,
    type: 'target',
    position: { x: i * 180, y: 150 },
    data: branch,
    draggable: false,
  })),
]);

const edges = computed<Edge[]>(() =>
  branches.map((branch) => ({
    id: `e-income-${branch.id}`,
    source: 'income',
    target: branch.id,
    animated: true,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: branch.color },
    style: { stroke: branch.color, strokeWidth: 1.5 + (branch.amount / totalIncome) * 6 },
  })),
);
</script>

<style scoped>
.money-flow {
  height: 220px;
}
</style>

<style>
.money-node {
  border-radius: 999px;
  text-align: center;
  white-space: nowrap;
}

.money-node--source {
  padding: 12px 24px;
  background: var(--q-primary);
  color: white;
}

.money-node--source .money-node__label {
  font-size: 11px;
  opacity: 0.85;
}

.money-node--source .money-node__amount {
  font-size: 16px;
  font-weight: 700;
}

.money-node--target {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 6px;
  background: color-mix(in srgb, var(--branch-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--branch-color) 35%, transparent);
  text-align: left;
}

.money-node--target .money-node__icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--branch-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.money-node--target .money-node__label {
  font-size: 11px;
  color: #9ca3af;
}

.money-node--target .money-node__amount {
  font-size: 13px;
  font-weight: 600;
}
</style>
