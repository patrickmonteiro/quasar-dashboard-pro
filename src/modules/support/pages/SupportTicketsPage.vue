<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Tickets</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New ticket" />
    </div>

    <TicketsTable :tickets="tickets" />
  </q-page>
</template>

<script setup lang="ts">
import TicketsTable from '../components/TicketsTable.vue';
import { tickets } from '../data/tickets';
</script>
