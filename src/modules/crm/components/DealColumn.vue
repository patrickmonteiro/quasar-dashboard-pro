<template>
  <q-card flat bordered class="deal-column">
    <q-card-section class="q-pb-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle2 text-weight-medium">{{ stage }}</div>
        <q-badge color="grey-3" text-color="grey-8" rounded>{{ leads.length }}</q-badge>
      </div>
      <div class="text-caption text-grey-5">{{ totalValueLabel }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <DealCard
        v-for="lead in leads"
        :key="lead.id"
        :lead="lead"
        @click="emit('cardClick', $event)"
      />
      <div v-if="leads.length === 0" class="text-caption text-grey-5 text-center q-py-md">
        No deals in this stage.
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Lead } from './LeadsTable.vue';
import DealCard from './DealCard.vue';

const props = defineProps<{
  stage: string;
  leads: Lead[];
}>();

const emit = defineEmits<{
  cardClick: [lead: Lead];
}>();

const totalValueLabel = computed(() => {
  const total = props.leads.reduce(
    (sum, lead) => sum + Number(lead.value.replace(/[^0-9.]/g, '')),
    0,
  );
  return `$${total.toLocaleString('en-US')} total`;
});
</script>

<style scoped>
.deal-column {
  width: 100%;
  height: 100%;
}
</style>
