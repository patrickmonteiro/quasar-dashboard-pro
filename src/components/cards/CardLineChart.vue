<template>
  <div class="col-md-4 col-sm-12 col-xs-12">
    <q-card bordered class="fit">
      <q-card-section class="q-pb-xs">
        <div class="text-h6">Quasar developers</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <apex-line-small />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardLineChart',
  components: {
    ApexLineSmall: () => import('components/active/apexcharts/LineSmall')
  }
}
</script>
