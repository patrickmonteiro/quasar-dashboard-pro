<template>
  <div class="row q-pt-md q-col-gutter-lg">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="q-pb-xs">
          <div class="text-h6">Quasar developers</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <map-leaflet-active
            :height="50"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMap',
  components: {
    MapLeafletActive: () => import('components/active/map/MapLeaflet')
  }
}
</script>
