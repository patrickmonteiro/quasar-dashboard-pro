<template>
  <q-page class="bg-secondary" padding>
    <cards-dashboard />
    <div class="row q-pt-md q-col-gutter-lg">
      <card-map />
      <div class="col-md-4 col-sm-12 col-xs-12">
        <card-line-chart />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  components: {
    CardsDashboard: () => import('components/active/cards/CardsDashboard'),
    CardMap: () => import('components/cards/CardMap'),
    CardLineChart: () => import('components/cards/CardLineChart')
  },
  data () {
    return {
      load: true
    }
  }
}
</script>
