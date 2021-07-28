<template>
  <q-page class="bg-secondary" padding>
    <div v-if="load">
      <cards-skeleton />
    </div>
    <div v-else>
      <cards-dashboard />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  components: {
    CardsDashboard: () => import('components/active/cards/CardsDashboard'),
    CardsSkeleton: () => import('components/skeletons/Cards')
  },
  data () {
    return {
      load: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.load = false
    }, 1200)
  }
}
</script>
