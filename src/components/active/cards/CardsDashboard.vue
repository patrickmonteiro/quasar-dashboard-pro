<template>
<div class="row q-col-gutter-md">
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
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'CardsDashboardActive',
  components: {
    CardDashboard: () => import('components/cards/CardDashboard')
  },
  data () {
    return {
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
  }
}
</script>
