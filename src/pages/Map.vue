<template>
  <q-page class="bg-secondary" padding>
    <div v-if="load">
      <map-skeleton />
    </div>
    <div v-else>
      <l-map
        v-if="ready"
        style="height: calc(100vh - 100px)"
        :zoom="zoom"
        :center="center"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng" ></l-marker>
        <l-marker
          v-for="(picole, index) in picoleLatLng"
          :key="index"
          :lat-lng="[picole.lat, picole.log]"
          :icon="icon"
        >
          <l-popup>
            {{ picole.info }}
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </q-page>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'PageMap',
  components: {
    // CardsDashboard: () => import('components/active/cards/CardsDashboard'),
    MapSkeleton: () => import('components/skeletons/Map')
  },
  data () {
    return {
      load: true,
      latitude: '',
      longitude: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 20,
      center: [],
      markerLatLng: [],
      picoleLatLng: [],
      ready: false,
      icon: L.icon({
        iconUrl: 'icons/favicon-128x128.png',
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      })
    }
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    getGeolocation () {
      if (navigator.geolocation) {
        this.load = true
        navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition)
      } else {
        this.errorPosition()
      }
    },
    setPosition (position) {
      const coords = position.coords
      this.center = [coords.latitude, coords.longitude]
      this.markerLatLng = [coords.latitude, coords.longitude]
      this.picoleLatLng = [
        {
          lat: (coords.latitude + 0.0005),
          log: (coords.longitude + 0.0005),
          info: 'Quasar 1'
        },
        {
          lat: (coords.latitude + 0.0008),
          log: (coords.longitude + 0.0008),
          info: 'Quasar 2'
        },
        {
          lat: (coords.latitude + -0.0005),
          log: (coords.longitude + -0.0005),
          info: 'Quasar 3'
        },
        {
          lat: (coords.latitude + 0.0010),
          log: (coords.longitude + -0.0013),
          info: 'Quasar 4'
        }
      ]
      this.load = false
      this.$notifySuccess('Position successfully retrieved!')
      this.ready = true
    },
    errorPosition () {
      this.$notifyDanger('Unable to retrieve your position!')
      this.load = false
    }
  }
}
</script>
