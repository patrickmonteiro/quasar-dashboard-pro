<template>
  <q-page class="bg-secondary" padding>
    <cards-fintech />
    <!-- <div class="row q-pt-md q-col-gutter-lg">
      <card-map />
      <div class="col-md-4 col-sm-12 col-xs-12">
        <card-line-chart />
      </div>
    </div> -->
    <!-- <card-circular-progress-list/> -->
  </q-page>
</template>

<script>
import CardsFintech from 'components/active/cards/CardsFintech'
// import CardMap from 'components/cards/CardMap'
// import CardLineChart from 'components/cards/CardLineChart'
// import CardCircularProgressList from 'components/cards/CardCircularProgressList'
export default {
  name: 'PageFintech',
  components: {
    CardsFintech
    // CardMap,
    // CardLineChart,
    // CardCircularProgressList
  },
  data () {
    return {
      load: true
    }
  }
}
</script>
