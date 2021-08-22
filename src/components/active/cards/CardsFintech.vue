<template>
<transition-group
  enter-active-class="animated fadeIn"
>
  <!-- <div v-if="load" class="row" key="row">
    <cards-skeleton
      key="skeleton"
      :custom-class="'col-md-6 col-sm-12 col-xs-12'"
      :height="'112px'"
    />
  </div> -->

  <div class="row q-col-gutter-lg justify-center" key="row">
    <div class="col-md-6 col-sm-12 col-xs-12 row q-col-gutter-md">
      <div
        class="col-md-6 col-sm-6 col-xs-12"
        v-for="(card, index) in cards"
        :key="index"
      >
        <card-fintech
          :title="card.title"
          :sub-title="card.subtitle"
          :icon="card.icon"
          :color-icon="card.colorIcon"
          :percentage="card.percentage"
          :actionText="'Lets Go'"
          :action-icon="'mdi-arrow-right-bold-circle'"
        />
      </div>
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12">
      <card-area-multiple-chart />
    </div>
  </div>
</transition-group>
</template>

<script>
import CardFintech from 'components/cards/CardFintech'
import CardAreaMultipleChart from 'components/cards/CardAreaMultipleChart'
export default {
  name: 'CardsFintechActive',
  components: {
    CardFintech,
    CardAreaMultipleChart
  },
  data () {
    return {
      cards: [
        {
          title: '$ 125.8K',
          subtitle: 'Gross Profit',
          icon: 'mdi-database-plus-outline',
          colorIcon: 'positive',
          percentage: 0.9
        },
        {
          title: '$ 49.6K',
          subtitle: 'Net Profit',
          icon: 'mdi-progress-download',
          colorIcon: 'info',
          percentage: 0.6
        },
        {
          title: '$ 19.3K',
          subtitle: 'Fixed Expenses',
          icon: 'mdi-pulse',
          colorIcon: 'negative',
          percentage: 0.4
        },
        {
          title: '$ 10.4K',
          subtitle: 'Variable Expenses',
          icon: 'mdi-cash-multiple',
          colorIcon: 'green-5',
          percentage: 0.3
        }
      ]
    }
  },
  mounted () {
    this.loadPage()
  },
  methods: {
    loadPage (notify = false) {
      this.load = true
      setTimeout(() => {
        this.load = false
        if (notify) {
          this.$notifySuccess('Successfully Updated')
        }
      }, 1200)
    }
  }
}
</script>
