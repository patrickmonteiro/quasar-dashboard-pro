<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">Quasar developers</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <apex-line-column />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardLineColumnChart',
  components: {
    ApexLineColumn: () => import('components/active/apexcharts/LineColumn')
  }
}
</script>
