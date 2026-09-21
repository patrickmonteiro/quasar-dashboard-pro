<template>
  <q-card v-ripple flat bordered class="q-mb-sm deal-card" @click="emit('click', lead)">
    <q-card-section class="q-pa-sm">
      <div class="text-body2 text-weight-medium">{{ lead.company }}</div>
      <div class="text-caption text-grey-5 q-mb-xs">{{ lead.name }}</div>

      <div class="row items-center justify-between">
        <div class="text-weight-bold">{{ lead.value }}</div>
        <q-avatar size="22px" color="primary" text-color="white" class="text-caption">
          {{ ownerInitials }}
        </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Lead } from './LeadsTable.vue';

const props = defineProps<{
  lead: Lead;
}>();

const emit = defineEmits<{
  click: [lead: Lead];
}>();

const ownerInitials = computed(() =>
  props.lead.owner
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase(),
);
</script>

<style scoped>
.deal-card {
  cursor: pointer;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;
}

.deal-card:hover {
  border-color: var(--q-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}
</style>
