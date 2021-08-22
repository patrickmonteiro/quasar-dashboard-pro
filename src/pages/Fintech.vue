<template>
  <q-page class="bg-secondary" padding>
    <cards-fintech />
    <div class="row q-pt-md q-px-sm q-col-gutter-lg">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <traffic-table />
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <card-list />
      </div>
    </div>
  </q-page>
</template>

<script>
import CardsFintech from 'components/active/cards/CardsFintech'
export default {
  name: 'PageFintech',
  components: {
    CardsFintech,
    TrafficTable: () => import('components/active/table/TrafficTable'),
    CardList: () => import('components/cards/CardList')
  },
  data () {
    return {
      load: true
    }
  }
}
</script>
