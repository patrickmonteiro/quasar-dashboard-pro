<template>
  <q-page class="bg-secondary" padding>
    <div v-if="load">
      <cards-skeleton />
    </div>
    <div v-else>
      <cards-dashboard
        @refresh="loadPage(true)"
      />
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
