<template>
  <q-page class="bg-secondary" padding>
    <div v-if="load">
      <cards-skeleton />
    </div>
    <div v-else>
      <cards-dashboard
        @refresh="loadPage(true)"
      />
      <div class="row q-pt-md q-col-gutter-lg">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section class="">
              <map-leaflet-active
                :height="50"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  components: {
    CardsDashboard: () => import('components/active/cards/CardsDashboard'),
    CardsSkeleton: () => import('components/skeletons/Cards'),
    MapLeafletActive: () => import('components/active/map/MapLeaflet')
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
