<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">Quasar developers</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <apex-donut />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardDonutChart',
  components: {
    ApexDonut: () => import('components/active/apexcharts/Donut')
  }
}
</script>
