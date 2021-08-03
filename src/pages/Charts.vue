<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-lg">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <card-line-chart />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <card-column />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <card-donut />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <card-line-column />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageCharts',
  components: {
    CardLineChart: () => import('components/cards/CardLineChart'),
    CardLineColumn: () => import('components/cards/CardLineColumnChart'),
    CardColumn: () => import('components/cards/CardColumnChart'),
    CardDonut: () => import('components/cards/CardDonutChart')
  }
}
</script>
