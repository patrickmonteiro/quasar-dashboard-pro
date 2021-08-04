<template>
  <q-page class="bg-secondary" padding>
    <cards-dashboard />
    <div class="row q-pt-md q-col-gutter-lg">
      <card-map />
      <div class="col-md-4 col-sm-12 col-xs-12">
        <card-line-chart />
      </div>
    </div>
    <card-circular-progress-list/>
  </q-page>
</template>

<script>
import CardsDashboard from 'components/active/cards/CardsDashboard'
import CardMap from 'components/cards/CardMap'
import CardLineChart from 'components/cards/CardLineChart'
import CardCircularProgressList from 'components/cards/CardCircularProgressList'
export default {
  name: 'PageHome',
  components: {
    CardsDashboard,
    CardMap,
    CardLineChart,
    CardCircularProgressList
  },
  data () {
    return {
      load: true
    }
  }
}
</script>
