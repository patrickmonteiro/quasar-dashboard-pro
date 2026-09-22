<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Incidents</div>

    <IncidentsTable :incidents="incidents" />
  </q-page>
</template>

<script setup lang="ts">
import IncidentsTable from '../components/IncidentsTable.vue';
import { incidents } from '../data/incidents';
</script>
