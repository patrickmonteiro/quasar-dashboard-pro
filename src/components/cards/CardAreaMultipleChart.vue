<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">Quasar developers</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <apex-area-multiple />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardLineChart',
  components: {
    ApexAreaMultiple: () => import('components/active/apexcharts/AreaMultiple')
  }
}
</script>
