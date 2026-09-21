<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Leads</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New lead" />
    </div>

    <LeadsTable :leads="leads" />
  </q-page>
</template>

<script setup lang="ts">
import LeadsTable from '../components/LeadsTable.vue';
import { leads } from '../data/leads';
</script>
