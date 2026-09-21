<template>
  <q-page class="q-pa-md column inbox-page">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Inbox</div>
      <q-badge rounded color="positive" outline class="q-pa-sm">
        <span class="live-dot q-mr-xs" /> 3 agents online
      </q-badge>
    </div>

    <q-card flat bordered class="inbox-shell col">
      <q-splitter v-model="split" :limits="[28, 45]" class="fit">
        <template #before>
          <div class="column fit">
            <div class="q-pa-md">
              <q-input v-model="search" dense outlined placeholder="Search conversations">
                <template #prepend>
                  <q-icon name="search" size="18px" />
                </template>
              </q-input>
            </div>

            <q-scroll-area class="col">
              <q-list separator>
                <q-item
                  v-for="conv in filteredConversations"
                  :key="conv.id"
                  clickable
                  :active="selected?.id === conv.id"
                  active-class="conv-item--active"
                  @click="selectConversation(conv)"
                >
                  <q-item-section avatar>
                    <div class="avatar-wrap">
                      <q-avatar :color="conv.avatarColor" text-color="white">
                        {{ conv.initials }}
                      </q-avatar>
                      <span v-if="conv.online" class="presence-dot" />
                    </div>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="conv.unread ? 'text-weight-bold' : ''">
                      {{ conv.customerName }}
                    </q-item-label>
                    <q-item-label caption lines="1">{{ conv.lastMessage }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-icon :name="channelIcon(conv.channel)" size="16px" color="grey-5" />
                    <q-item-label caption class="q-mt-xs">{{ conv.time }}</q-item-label>
                  </q-item-section>
                </q-item>

                <div
                  v-if="filteredConversations.length === 0"
                  class="text-center text-grey-5 q-pa-lg"
                >
                  No conversations found.
                </div>
              </q-list>
            </q-scroll-area>
          </div>
        </template>

        <template #after>
          <div v-if="selected" class="column fit">
            <div class="row items-center q-pa-md">
              <q-avatar :color="selected.avatarColor" text-color="white">
                {{ selected.initials }}
              </q-avatar>
              <div class="q-ml-sm">
                <div class="text-weight-medium">{{ selected.customerName }}</div>
                <div class="text-caption text-grey-5">
                  {{ selected.online ? 'Online' : 'Offline' }} · via
                  {{ channelLabel(selected.channel) }}
                </div>
              </div>
              <q-space />
              <q-icon :name="channelIcon(selected.channel)" size="20px" color="grey-5" />
            </div>

            <q-separator />

            <q-scroll-area class="col q-pa-md">
              <div
                v-for="msg in selected.messages"
                :key="msg.id"
                class="row"
                :class="msg.from === 'agent' ? 'justify-end' : 'justify-start'"
              >
                <div
                  class="bubble"
                  :class="msg.from === 'agent' ? 'bubble--agent' : 'bubble--customer'"
                >
                  {{ msg.text }}
                  <div class="bubble__time">{{ msg.time }}</div>
                </div>
              </div>
            </q-scroll-area>

            <q-separator />

            <div class="row items-center q-pa-sm q-gutter-sm">
              <q-input
                v-model="draft"
                dense
                outlined
                placeholder="Type a message"
                class="col"
                @keyup.enter="send"
              />
              <q-btn round unelevated color="primary" icon="send" @click="send" />
            </div>
          </div>

          <div v-else class="column fit items-center justify-center text-grey-5">
            <q-icon name="forum" size="48px" class="q-mb-sm" />
            Select a conversation to start chatting
          </div>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  channelIcon,
  channelLabel,
  conversations as seedConversations,
  type Conversation,
} from '../data/conversations';

const conversations = ref<Conversation[]>(structuredClone(seedConversations));
const search = ref('');
const split = ref(32);
const selected = ref<Conversation | null>(conversations.value[0] ?? null);
const draft = ref('');

const filteredConversations = computed(() =>
  conversations.value.filter(
    (c) => !search.value || c.customerName.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function selectConversation(conv: Conversation) {
  conv.unread = false;
  selected.value = conv;
}

function send() {
  if (!draft.value.trim() || !selected.value) return;
  selected.value.messages.push({
    id: `${selected.value.id}-${selected.value.messages.length + 1}`,
    from: 'agent',
    text: draft.value.trim(),
    time: 'Now',
  });
  draft.value = '';
}
</script>

<style scoped>
.inbox-page {
  height: calc(100vh - 130px);
  min-height: 500px;
}

.inbox-shell {
  min-height: 0;
}

.avatar-wrap {
  position: relative;
}

.presence-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
}

.live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: inbox-live-pulse 1.4s ease-in-out infinite;
}

@keyframes inbox-live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}

.conv-item--active {
  background: rgba(79, 70, 229, 0.06);
}

.bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 14px;
  margin-bottom: 10px;
  font-size: 13.5px;
  line-height: 1.5;
}

.bubble--customer {
  background: rgba(127, 127, 127, 0.14);
  border-bottom-left-radius: 4px;
}

.bubble--agent {
  background: var(--q-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.bubble__time {
  font-size: 10.5px;
  opacity: 0.6;
  margin-top: 4px;
  text-align: right;
}
</style>
