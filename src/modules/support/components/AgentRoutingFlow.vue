<template>
  <q-card flat bordered>
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-subtitle1 text-weight-medium">Conversation Routing</div>
        <div class="text-caption text-grey-5">How incoming chats reach the right agent</div>
      </div>
      <q-badge rounded color="primary" outline class="q-pa-sm">
        <q-icon name="bolt" size="12px" class="q-mr-xs" /> Auto-routed
      </q-badge>
    </q-card-section>

    <q-card-section>
      <div class="route-flow">
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
          <template #node-channel="{ data }">
            <div class="route-node">
              <div class="route-node__channel">
                <q-icon :name="data.icon" size="18px" color="white" />
              </div>
              <div class="route-node__label">{{ data.label }}</div>
            </div>
          </template>

          <template #node-hub="{ data }">
            <div class="route-node">
              <div class="route-node__hub">
                <span class="route-node__ring" />
                <span class="route-node__ring route-node__ring--delay" />
                <q-icon name="support_agent" size="24px" color="white" />
              </div>
              <div class="route-node__label">{{ data.label }}</div>
              <div class="route-node__caption">{{ data.caption }}</div>
            </div>
          </template>

          <template #node-agent="{ data }">
            <div class="route-node" :style="{ '--agent-color': data.color }">
              <div class="route-node__avatar">
                {{ data.initials }}
                <span
                  class="route-node__status"
                  :class="data.busy ? 'route-node__status--busy' : ''"
                />
              </div>
              <div class="route-node__label">{{ data.name }}</div>
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

interface ChannelSource {
  id: string;
  icon: string;
  label: string;
}

interface Agent {
  id: string;
  name: string;
  initials: string;
  color: string;
  busy?: boolean;
}

const channels: ChannelSource[] = [
  { id: 'chat', icon: 'forum', label: 'Website chat' },
  { id: 'whatsapp', icon: 'sms', label: 'WhatsApp' },
  { id: 'email', icon: 'mail', label: 'Email' },
];

const agents: Agent[] = [
  { id: 'you', name: 'You', initials: 'Y', color: '#4f46e5', busy: true },
  { id: 'sara', name: 'Sara', initials: 'S', color: '#0ea5e9' },
  { id: 'bot', name: 'AI Bot', initials: 'AI', color: '#22c55e' },
];

const nodes = computed<Node[]>(() => [
  ...channels.map((channel, i) => ({
    id: channel.id,
    type: 'channel',
    position: { x: 0, y: i * 90 },
    data: channel,
    draggable: false,
  })),
  {
    id: 'hub',
    type: 'hub',
    position: { x: 260, y: 90 },
    data: { label: 'Support Queue', caption: '3 waiting' },
    draggable: false,
  },
  ...agents.map((agent, i) => ({
    id: agent.id,
    type: 'agent',
    position: { x: 520, y: i * 90 },
    data: agent,
    draggable: false,
  })),
]);

const edges = computed<Edge[]>(() => [
  ...channels.map((channel) => ({
    id: `e-${channel.id}-hub`,
    source: channel.id,
    target: 'hub',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4 4' },
  })),
  ...agents.map((agent) => ({
    id: `e-hub-${agent.id}`,
    source: 'hub',
    target: agent.id,
    animated: true,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: agent.color },
    style: { stroke: agent.color, strokeWidth: 2 },
  })),
]);
</script>

<style scoped>
.route-flow {
  height: 260px;
}
</style>

<style>
.route-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 110px;
  text-align: center;
}

.route-node__channel {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
}

.route-node__hub {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.route-node__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--q-primary);
  animation: route-hub-radar 2.4s ease-out infinite;
}

.route-node__ring--delay {
  animation-delay: 1.2s;
}

@keyframes route-hub-radar {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.route-node__avatar {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--agent-color);
  color: white;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.route-node__status {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
}

.route-node__status--busy {
  background: #f59e0b;
  animation: route-status-pulse 1.6s ease-in-out infinite;
}

@keyframes route-status-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.route-node__label {
  font-size: 11.5px;
  font-weight: 600;
}

.route-node__caption {
  font-size: 10.5px;
  color: #9ca3af;
  margin-top: -4px;
}
</style>
