<template>
<transition-group
  enter-active-class="animated fadeIn"
>
  <cards-skeleton v-if="load" key="skeleton" />
  <div v-else class="row q-col-gutter-lg" key="row">
    <div
      class="col-md-3 col-sm-12 col-xs-12"
      v-for="(card, index) in cards"
      :key="index"
    >
      <card-dashboard
        :title="card.title"
        :sub-title="card.subtitle"
        :icon="card.icon"
        :color-icon="card.colorIcon"
        @refresh="loadPage"
      />
    </div>
  </div>
</transition-group>
</template>

<script>
import CardDashboard from 'components/cards/CardDashboard'
import CardsSkeleton from 'components/skeletons/Cards'
export default {
  name: 'CardsDashboardActive',
  components: {
    CardDashboard,
    CardsSkeleton
  },
  data () {
    return {
      load: true,
      cards: [
        {
          title: 'DataBase',
          subtitle: '150GB',
          icon: 'mdi-database-plus-outline',
          colorIcon: 'positive'
        },
        {
          title: 'Download',
          subtitle: '50mbps',
          icon: 'mdi-progress-download',
          colorIcon: 'info'
        },
        {
          title: 'Errors',
          subtitle: '45',
          icon: 'mdi-pulse',
          colorIcon: 'negative'
        },
        {
          title: 'Cashback',
          subtitle: '$ 800,00',
          icon: 'mdi-cash-multiple',
          colorIcon: 'green-5'
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
