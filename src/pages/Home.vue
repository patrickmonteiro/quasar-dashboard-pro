<template>
  <q-page class="bg-secondary" padding>
    <cards-dashboard />
    <card-map />
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  components: {
    CardsDashboard: () => import('components/active/cards/CardsDashboard'),
    CardMap: () => import('components/cards/CardMap')
  },
  data () {
    return {
      load: true
    }
  }
}
</script>
