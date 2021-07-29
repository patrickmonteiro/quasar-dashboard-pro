<template>
  <q-page class="bg-secondary" padding>
    <map-leaflet-active
      :height="50"
    />
  </q-page>
</template>

<script>

export default {
  name: 'PageMap',
  components: {
    MapLeafletActive: () => import('components/active/map/MapLeaflet')
  }
}
</script>
